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
			Common.facebookLikebox();
			Common.bannerResponsive();
			Common.callCartLinkShow();
			Common.callShelfSmartPrice();
			Common.callQdNews();
			Common.linkToCartMiniCart();
			Common.buyInShelf();
			Common.callbackQuickView();
			Common.applyBuyButton();
		},
		ajaxStop: function() {
			Common.callShelfSmartPrice();
			Common.linkToCartMiniCart();
			Common.buyInShelf();
			Common.applyBuyButton();
		},
		windowOnload: function() {},
		linkToCartMiniCart: function(){
			$(".v2-vtexsc-cart a.cartCheckout").attr('href', '/checkout/#/cart');
		},
		applyBuyButton: function() {
			$(document.body).QD_buyButton({
				buyButton: ".shelf-qd-v2-buy-button a"
			});
		},
		callbackQuickView: function(){
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$(".shelf-buy-button-modal").modal("hide");
				$(window).trigger("productAddedToCart");
			};
		},
		buyInShelf: function(){
			var modal = $(".modal");

			var fn = function(){
				$(".qd-buy-button:not('.qd-on-bb')").addClass("show qd-on-bb").click(function(e) {
					e.preventDefault();

					modal.removeClass('newsletter-modal').addClass("shelf-buy-button-modal");

					var header = modal.find(".modal-header");
					header.children(":not(.close)").remove();

					this.search = this.search + "&bodyclass=shelf-of-page";
					var iframe = $('<iframe src="' + this.href + '" frameborder="0"></iframe>');
					modal.find(".modal-body").empty().append(iframe);
					modal.modal();
				});
			};

			fn();

			// Ações
			modal.on("hidden.bs.modal", function(){
				var $t = $(this);
				$t.removeClass("shelf-buy-button-modal");
			});
		},
		amazingMenu:function(){
			$('.header-qd-v1-main-amazing-menu-mobile, .header-qd-v1-main-amazing-menu').QD_amazingMenu();

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

			$('.header-qd-v1-main-amazing-menu-mobile ul[itemscope="itemscope"] > li + li .qd-am-level-2:not(ul)').click(function(){
				var $t = $(this);
				$t.toggleClass('qd-on');
				$t.next('ul').slideToggle();
			});
		},
		facebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/Palaciodaarte.com.br" data-width="100%" data-height="290px" data-hide-cover="false" data-show-facepile="true" data-show-posts="false"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/agenciaquatrodigital"><a href="https://www.facebook.com/agenciaquatrodigital">Quatro Digital</a></blockquote></div></div>');
		},
		bannerResponsive : function(){
			$(".banner-qd-v1-responsive .box-banner a, .qd-placeholder .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.each(function() {
					var hash = (this.hash || '').replace('#', '');
					if(!hash.length)
						return;

					this.hash = hash.replace(/(col-)?(xs|sm|md|lg|hidden-xs|hidden-sm|hidden-md|hidden-lg)(-([0-9]{1,2}))?,?/ig, function(match){
						var str = match.replace(",", "").toLowerCase();
						cols.push( str.substr(0,4) === "col-" ? str : str );
						return "";
					});
				});

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
		callShelfSmartPrice: function(){
			var wrapper = $("li[layout]");

			wrapper.find(".flag").QD_SmartPrice({
				filterFlagBy: "[class*='desconto']",
				wrapperElement: wrapper,
				productPage:{
					isProductPage: false
				}
			});
		},
		callQdNews: function() {
			var wrapper = $(".footer-qd-v1-newsletter-form");
			var html = '<div class="content-news"> <div class="row"> <form novalidate="1"> <div class="col-xs-6 col-xs-offset-6"> <div class="qd_news_content"> <div class="form-row"> <input type="text" name="name" class="qd_success input-type-text-ghost form-control" /> </div> <span class="content-close"> <i class="btn-close ico-close" data-dismiss="modal"></i> </span> </div> </div> </form> </div> </div>';

			wrapper.QD_news({
				defaultEmail: "Digite seu e-mail",
				checkNameFieldIsVisible: false
			});

			var modal = $(".modal");
			wrapper.QD_cookieFn({
				cookieName: "newsletter",
				close: "",
				expireDays: 30,
				show: function($elem) {
					modal.on("hidden.bs.modal", function(){
						wrapper.trigger("QuatroDigital.cf_close");
						modal.removeClass('newsletter-modal');
					});

					wrapper.QD_news({
						successCallback: function () {
							modal.addClass("newsletter-modal");
							modal.find(".modal-body").html(html);
							modal.find(".qd_success").val("MEUPALACIO");

							modal.modal();
						}
					});
				},
				hide: function($elem){}
			});
		}
	};

	var Home = {
		init: function() {
			Home.cycle2();
			Home.bannerCarouselHome();
			Home.shelfCarouselHome();
			Home.organizeSideMenuCollection();
			Home.carouselVideoAndCollection();
			Departament.selectSmartResearch2();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		cycle2: function() {
			if ($('.slider-qd-v1-full .box-banner').length <= 1)
				$('.slider-qd-v1-full').addClass("qd-1");

			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".slider-qd-v1-full");

			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<div class='cycle-pager-item'><span class='slider-pager-content'>" + $t.find("img").attr("alt") + "</span></div>");
			});

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".slider-qd-v1-responsive-pager",
				prev: ".slider-qd-v1-cycle-prev",
				next: ".slider-qd-v1-cycle-next"
			});
		},
		bannerCarouselHome:function(){
			var wrapper = $('.carousel-qd-v1-banner');

			// Titulo
			wrapper.each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-1').insertBefore(wrap);
			});


			wrapper.owlCarousel({
				items: 7,
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
			var htmlSideMenuWrapper = '<div class="col-xs-12 col-sm-12 col-md-3 htmlSideMenuWrapper"></div>';
			var htmlCollectionWrapper = '<div class="col-xs-12 col-sm-12 col-md-9 htmlCollectionWrapper"></div>';
			var itemSideMenuCollection = '<div class="row itemSideMenuCollection"><div></div></div>';

			wrapper.find('.box-banner:not(".qd-on")').addClass("qd-on").each(function() {
				$t = $(this);


				$t.after(htmlSideMenuWrapper);

				$('.htmlSideMenuWrapper:not(".qd-on")').addClass("qd-on").append(wrapper.find($t));

				var collectionTitle = $t.getParent(".htmlSideMenuWrapper").find("+ .heading-2");
				var collection = $t.getParent(".htmlSideMenuWrapper").find("+ .heading-2 + .prateleira") && $t.getParent(".htmlSideMenuWrapper").find("+ .prateleira");

				$t.getParent('.htmlSideMenuWrapper').after(htmlCollectionWrapper);

				$('.htmlCollectionWrapper:not(".qd-on")').addClass("qd-on").append(collectionTitle, collection);

				$t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper").after(itemSideMenuCollection);

				$('.itemSideMenuCollection:not(".qd-on")').addClass("qd-on").find("> div").append($t.getParent(".htmlSideMenuWrapper"), $t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper"));
			});
		},
		carouselVideoAndCollection: function() {
			var wrapper = $('.banner-qd-v1-video-and-collection .prateleira');
			var html = $('<div class="col-xs-12 col-sm-6"></div>');

			$('.banner-qd-v1-video-and-collection .col-xs-12').after(html);
			html.append(wrapper);

			// Titulo
			wrapper.each(function(){
				var wrap = $(this);

				wrap.find("h2").insertBefore(wrap);
			});


			wrapper.owlCarousel({
				items: 2,
				navigation: true,
				pagination: false
			});
		}
	};

	var Departament = {
		init: function() {
			Departament.removeCounter();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Departament.selectSmartResearch2();
			Search.shelfLineFix();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		removeCounter: function() {
			$(".menu-departamento a").each(function() {
				var $t = $(this);

				$t.text($t.text().replace(/\([0-9]+\)/ig, ""));
			});
		},
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
				var t,li,qtt,moreLink,moreLi,click,liHide;

				t=$(this);
				li=t.find(">li");
				qtt=7;

				if(li.length<=qtt) return;

				liHide=li.filter(":gt("+(qtt-1)+")").stop(true,true).hide();
				moreLink=$('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi=$('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais filtros</a></li>');
				t.append(moreLi);

				click=function(){
					liHide.stop(true,true).slideToggle(function(){
						if(li.filter(":visible").length>qtt){
							moreLink.addClass("minus").text("Mostrar menos filtros");
							moreLi.addClass("minus").find("a").text("Mostrar menos filtros");
						}
						else{
							moreLink.removeClass("minus").text("Mostrar mais filtros");
							moreLi.removeClass("minus").find("a").text("Mostrar mais filtros");
						}
					});
				};
				moreLi.bind("click.qd_viewMore",click);
				moreLink.bind("click.qd_viewMore",click);
			});
		},
		selectSmartResearch2: function() {
			// Pegando os anos
			var qttRegex = /\s+\([0-9]+\)$/;
			var htmlClassRegex = /[^a-z0-9]/ig;
			var values = [];
			var titles = ["por Arte", "por Produto", "por Marca"];

			$(".departmentNavigator").find("h3 a").each(function() {
				var $t = $(this);
				values.push([$t.text().trim().replace(qttRegex, ""), $t.attr("href") || ""])
			});;

			$(".qd-search-filters").QD_SelectSmartResearch2({
				options: [values, "lid=ab1617fb-bb60-43ca-bf8e-e784b12f482c", "lid=ab1617fb-bb60-43ca-bf8e-e784b12f482c"],
				optionsPlaceHolder: ["Departamento", "Modelo / Tipo", "Marca"],
				labelMessage: function(index, options, optionsPlaceHolder) {return "Buscar " + titles[index]},
				optionIsChecked: function(optionPlaceHolder) {
					if (typeof optionPlaceHolder === "undefined")
						return null;

					var value = optionPlaceHolder === "Departamento"? $(".search-single-navigator h3:first").text().trim(): $("h5." + optionPlaceHolder.replace(htmlClassRegex, "-") + " +ul .filtro-ativo:first").text().trim().replace(qttRegex, "");
					return value.length ? value : null;
				},
				getAjaxOptions: function(requestData, $select) {
					var values = [];
					$(requestData).find(".search-single-navigator ul[class*='" + $select.attr("data-qdssr-title") + "']").find("a").each(function() {
						var $t = $(this);
						values.push([$t.text().trim().replace(qttRegex, ""), $t.attr("href") || ""])
					});
					return values;
				}
			});

			$(".qd-ssr2-option-wrapper").each(function() {
				var $t = $(this);
				var htmlCols = '<div class="col-xs-12 col-sm-4"></div>';

				$t.parent().addClass('row').append(htmlCols);

				$(".qd-search-filters .col-xs-12.col-sm-4:not(.qd-on)").addClass('qd-on').append($t);
			});

		}
	};

	var Search = {
		init: function () {
			Departament.removeCounter();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Search.organizeSearchV2();
			Departament.selectSmartResearch2();
			Search.shelfLineFix();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
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
			try {
				var exec = function() {
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
				};
				exec();

				// Olhando para o Smart Research
				if(!window.qd_shelf_line_fix_){
					$(window).on("QuatroDigital.sr_shelfCallback", exec);
					window.qd_shelf_line_fix_ = true;
				}

				// Olhando para o evento window resize
				var resize = $._data(window).events.resize;
				var allowResize = true;
				if(resize)
					for(var i = 0; i < resize.length; i++){
						if(resize[i].namespace == "qd"){
							allowResize = false;
							break;
						}
					}
				if(allowResize){
					var timeOut = 0;
					$(window).on("resize.qd", function(){
						clearTimeout(timeOut);
						timeOut = setTimeout(function() {
							$(".qd-first-line").removeClass(".qd-first-line");
							exec();
						}, 20);
					});
				}
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		}
	};


	var Product = {
		run: function() {
		},
		init: function () {
			Product.setAvailableBodyClass();
			Product.shelfOfPage();
			Product.zoomFix();
			Product.shelfCarouselProduct();
			Product.openShipping();
			Product.seeDescription();
			Product.skuUrlHash();
			Product.callBuyButton();
			Product.callSmartQuantity();
			Product.checkBuyTogether();
			Product.callproductSmartPrice();
			Product.productReturnToTop();

			if ($(document.body).is('.prodColor')) {
				Product.skuListTinta();
				Product.clickViewSkuListTinta();
			};
		},
		ajaxStop: function () {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function () {},
		setAvailableBodyClass: function() {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
			}

			$(document).on("skuSelected.vtex", function(e, id, sku) {
				console.log(sku.available);
			});

			checkVisibleNotify(skuJson.available);
		},
		shelfOfPage: function() {
			$(document.body).addClass((location.search.match(/bodyclass\=[^&]+/i) || [""]).pop().split("=").pop());
		},
		callproductSmartPrice: function() {
			if (!$("body").is('.product-sku-in-list')) {
				$(".product-qd-v1-price").append('<div class="qd-sp-best-price">ou <span class="qd_displayPrice"> R$ </span> no boleto com </div> <div class="qd-sp-best-discount"> <span class="qd-sp-display-discount">0% de desconto</span> </div>')

				$(".product-qd-v1-sku-selection-box .product-qd-v1-stamps .flag").QD_SmartPrice({
					filterFlagBy: "[class*='desconto']",
					productPage:{
						wrapperElement: ".product-qd-v1-sku-selection-box",
						changeNativePrice: false,
						isProductPage: true
					}
				});
			};
		},
		zoomFix: function(){
			var overlay = $("<div class='qdZoomInvisibleOverlay' />");
			$("#image").prepend(overlay).on("mouseout", ".zoomPad", function(){ overlay.hide(); }).on("mouseover", ".zoomPad", function(){ overlay.show(); });
		},
		callSmartQuantity: function() {
			$(".product-qd-v1-sku-selection-box").addClass("qd-smart-quantity-on").QD_smartQuantity({
				buyButton: ".buy-button",
				qttInput: ".qd-sq-quantity",
				btnMore: ".qd-sq-more",
				btnMinus: ".qd-sq-minus"
			});
		},
		callBuyButton: function(){
			$(".product-qd-v1-sku-selection-box").QD_buyButton({
				buyButton: ".buy-button"
			});

			// COMPRE JUNTO
			$(".buy-together-content a#lnkComprar").each(function() {
				var $t = $(this);

				$(".buy-together-content").QD_buyButton({
					buyButton: $t
				});
			});
		},
		shelfCarouselProduct: function() {
			var wrapper = $('.qd-collections-wrap ');

			// Titulo
			wrapper.find('.prateleira').each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-2').insertBefore(wrap);
			});

			if (!$.fn.owlCarousel)
				return;

			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
		},
		openShipping: function() {
			if (!$.fn.ShippingValue)
				return;

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
		skuListTinta: function() {
			// Lista de SKUs como cores
			var listWrapper;
			listWrapper=$(".product-qd-v1-sku-selection");

			$(".skuList").each(function(){
				var t,wrapper,pos,colorBox;

				t=$(this);
				wrapper=$('<div class="qdSkuWrapper"></div>');
				colorBox=$('<div class="qdColorBox"><div class="qdImg" style="background-image:url('+t.find("img").attr("src")+')"></div><div class="qdColor '+ t.find(".nomeSku").text().replace(/[0-9]+\s*\-/,"").trim().replaceSpecialChars().replace(" ","-") +'"></div></div>');

				t.children().appendTo(wrapper);
				t.append(wrapper);
				t.prepend(colorBox);
				t.prepend('<div class="qdArrowSku"></div>');

				if(t.find(".notifyme").length)
					t.addClass("unavailable");

				if($("body").is(".prodSize"))
					colorBox.append('<div class="qdBoxSize"><span><label>'+t.find(".nomeSku").text().split(" ").pop()+'</label></span></div>');

				var buy,buyWrapper,buyQtt,qttInput;

				buy=t.find(".buy-button");
				buy.text('Adicionar');
				buyWrapper=$('<div class="qdBuyWrapper"></div>');
				buyQtt=$('<span class="qdBuyQttWrapper"><span class="qdBuyQttMinus">-</span><input type="text" value="1" class="qdBuyQtt" /><span class="qdBuyQttMore">+</span></span>');

				buy.after(buyWrapper);
				if(!buyWrapper.is(buy))
					buy.appendTo(buyWrapper);
				buyQtt.prependTo(buyWrapper);

				listWrapper.addClass("product-qd-v1-sku-in-list");
				pos=listWrapper.width()-(t.position().left+251);
				if(pos<0)
					wrapper.css("margin-left",pos);

				qttInput=buyQtt.find("input");
				qttInput.bind("keyup",function(){
					var t=$(this);
					t.val(t.val().replace(/[^0-9]/g,""));
					buy.attr("href", buy.attr("href").replace(/qty\=[0-9]*/i, "qty=" + t.val()));
				});
				buyQtt.find(".qdBuyQttMinus").bind("click",function(){
					if(parseInt((qttInput.val()||0),10)<2) return;
					qttInput.val(parseInt((qttInput.val()||2),10)-1).trigger("keyup");
				});
				buyQtt.find(".qdBuyQttMore").bind("click",function(){
					qttInput.val(parseInt((qttInput.val()||1),10)+1).trigger("keyup");
				});
			});

			if ($(".product-qd-v1-sku-selection .skuList").length > 0)
				$("body").addClass('product-sku-in-list');

			listWrapper.find('.skuList .qdSkuWrapper').append('<span class="btn-close-sku-info"> Fechar</span>');

			$(".btn-close-sku-info").click(function() {
				$(".skuList").removeClass('active');
			});
		},
		clickViewSkuListTinta: function() {
			$(".qdColorBox").click(function() {
				var $t = $(this);
				var position = $t.position();

				$(".skuList").removeClass('active');

				if ($t.parent().is('active'))
					$t.parent().removeClass('active');
				else
					$t.parent().addClass('active');

				$t.parent().find('.qdSkuWrapper').css({
					top: position.top + 37,
				});
			});
		},
		checkBuyTogether: function() {
			if ($(".product-qd-v1-buy-together .buy-together-content > *").length <= 0)
				$(".product-qd-v1-buy-together").addClass('hide');
		},
		productReturnToTop: function() {
			var html = '<div id="returnToTop"> <a href="#"> <span class="text">voltar ao</span> <span class="text2">TOPO</span> <span class="arrowToTop"></span> </a> </div>';
			var _window = jQuery(window);
			_html = jQuery("html,body");

			$(document.body).append(html);

			var elem=$(document.body).find("#returnToTop");

			var windowH=_window.height();
			_window.bind("resize",function(){
				windowH=_window.height();
			});
			_window.bind("scroll",function(){
				if(_window.scrollTop()>(windowH))
					elem.stop(true).fadeTo(300,1,function(){elem.show();});
				else
					elem.stop(true).fadeTo(300,0,function(){elem.hide();});
			});
			elem.bind("click",function(){
				_html.animate({scrollTop:0},"slow");
				return false;
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
			Institutional.contactForm();
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
		contactForm: function(){
			if(!$(document.body).is(".atendimento"))
				return;

			var form = $(".form-contact");
			form.find("#qd_form_phone").mask('(00) 0000-00009');
			form.find("#qd_form_cellPhone").mask('(00) 0000-00009');

			form.validate({
				rules: {
					email: {
						email: true
					}
				},
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function() {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#qd_form_email").val() || "";
						if(!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function(userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length? "+55" + phone: null;

							var cellPhone = ($form.find("#qd_form_cellPhone").val() || "").replace(/[^0-9]+/ig, "");
							cellPhone = cellPhone.length? "+55" + cellPhone: null;

							$.ajax({url: "//api.ipify.org?format=jsonp", dataType: "jsonp", success: function(data) { sendData(data.ip); }, error: function() {$.ajax({url: "//www.telize.com/jsonip", dataType: "jsonp", success: function(data) { sendData(data.ip); }, error: function(data) { sendData(null); } }); } });

							var sendData = function(ip) {
								$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AT/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify({
										ip: ip,
										userId: userId,
										phone: phone,
										cellPhone: cellPhone,
										email: email,
										fullName: $form.find("#qd_form_name").val() || null,
										message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
										subject: $form.find("#qd_form_subject").val() || null
									}),
									success: function(data){
										$form.find(".form-succes").removeClass("hide");
										$form.find(".btn-default").addClass("hide");
									},
									error: function() { alert("Desculpe, não foi possível enviar seu formulário!"); },
									complete: function(){ submitWrapper.removeClass("qd-loading"); }
								});
							}
						};
						$.ajax({url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email, type: "GET", dataType: "json", headers: {Accept: "application/vnd.vtex.ds.v10+json"}, success: function(data){if(data.length) saveContact(data[0].id); else saveContact(null); }, error: function() {alert("Desculpe, não foi possível enviar seu formulário!");} });
					})();

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		}
	}

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

/* Quatro Digital - jQuery Ajax Queue // 2.1 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(c){if("function"!==typeof c.qdAjax){var a={};c.qdAjaxQueue=a;c.qdAjax=function(e){var d,b;d=c.extend({},{success:function(){},error:function(){},complete:function(){},clearQueueDelay:0},e);b=escape(encodeURIComponent(d.url));a[b]=a[b]||{};a[b].opts=a[b].opts||[];a[b].opts.push({success:function(a,b,f){d.success.call(this,a,b,f)},error:function(a,b,f){d.error.call(this,a,b,f)},complete:function(a,b){d.complete.call(this,a,b)}});a[b].parameters=a[b].parameters||{success:{},error:{},complete:{}};
a[b].callbackFns=a[b].callbackFns||{};a[b].callbackFns.successPopulated="boolean"===typeof a[b].callbackFns.successPopulated?a[b].callbackFns.successPopulated:!1;a[b].callbackFns.errorPopulated="boolean"===typeof a[b].callbackFns.errorPopulated?a[b].callbackFns.errorPopulated:!1;a[b].callbackFns.completePopulated="boolean"===typeof a[b].callbackFns.completePopulated?a[b].callbackFns.completePopulated:!1;e=c.extend({},d,{success:function(d,g,f){a[b].parameters.success={data:d,textStatus:g,jqXHR:f};
a[b].callbackFns.successPopulated=!0;for(var c in a[b].opts)"object"===typeof a[b].opts[c]&&(a[b].opts[c].success.call(this,d,g,f),a[b].opts[c].success=function(){})},error:function(c,d,f){a[b].parameters.error={errorThrown:f,textStatus:d,jqXHR:c};a[b].callbackFns.errorPopulated=!0;for(var e in a[b].opts)"object"===typeof a[b].opts[e]&&(a[b].opts[e].error.call(this,c,d,f),a[b].opts[e].error=function(){})},complete:function(c,e){a[b].parameters.complete={textStatus:e,jqXHR:c};a[b].callbackFns.completePopulated=
!0;for(var f in a[b].opts)"object"===typeof a[b].opts[f]&&(a[b].opts[f].complete.call(this,c,e),a[b].opts[f].complete=function(){});isNaN(parseInt(d.clearQueueDelay))||setTimeout(function(){a[b].jqXHR=void 0;a[b].opts=void 0;a[b].parameters=void 0;a[b].callbackFns=void 0},d.clearQueueDelay)}});"undefined"===typeof a[b].jqXHR?a[b].jqXHR=c.ajax(e):a[b].jqXHR&&a[b].jqXHR.readyState&&4==a[b].jqXHR.readyState&&(a[b].callbackFns.successPopulated&&e.success(a[b].parameters.success.data,a[b].parameters.success.textStatus,
a[b].parameters.success.jqXHR),a[b].callbackFns.errorPopulated&&e.error(a[b].parameters.error.jqXHR,a[b].parameters.error.textStatus,a[b].parameters.error.errorThrown),a[b].callbackFns.completePopulated&&e.complete(a[b].parameters.complete.jqXHR,a[b].parameters.complete.textStatus))};c.qdAjax.version="2.1"}})(jQuery);
/* $("a").getParent("ul"); // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(b){b.fn.getParent=function(c){var a;a=b(this);if(1>a.length)return a;a=a.parent();return a.is("html")?b(""):a.is(c)?a:a.length?a.getParent(c):a}})(jQuery);
/* Automatizador de comments box do Facebook // 1.4 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if($("script[src*='connect.facebook.net/pt_BR/sdk.js']").filter("[src*='sdk.js']").length)"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse();else{a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||
(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}});
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs()}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return $.extend({},a,new b(a))},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010 * http://benalman.com/projects/jquery-bbq-plugin/ * * Copyright (c) 2010 "Cowboy" Ben Alman * Dual licensed under the MIT and GPL licenses. * http://benalman.com/about/license/ */
(function($,p){var i,m=Array.prototype.slice,r=decodeURIComponent,a=$.param,c,l,v,b=$.bbq=$.bbq||{},q,u,j,e=$.event.special,d="hashchange",A="querystring",D="fragment",y="elemUrlAttr",g="location",k="href",t="src",x=/^.*\?|#.*$/g,w=/^.*\#/,h,C={};function E(F){return typeof F==="string"}function B(G){var F=m.call(arguments,1);return function(){return G.apply(this,F.concat(m.call(arguments)))}}function n(F){return F.replace(/^[^#]*#?(.*)$/,"$1")}function o(F){return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/,"$1")}function f(H,M,F,I,G){var O,L,K,N,J;if(I!==i){K=F.match(H?/^([^#]*)\#?(.*)$/:/^([^#?]*)\??([^#]*)(#?.*)/);J=K[3]||"";if(G===2&&E(I)){L=I.replace(H?w:x,"")}else{N=l(K[2]);I=E(I)?l[H?D:A](I):I;L=G===2?I:G===1?$.extend({},I,N):$.extend({},N,I);L=a(L);if(H){L=L.replace(h,r)}}O=K[1]+(H?"#":L||!K[1]?"?":"")+L+J}else{O=M(F!==i?F:p[g][k])}return O}a[A]=B(f,0,o);a[D]=c=B(f,1,n);c.noEscape=function(G){G=G||"";var F=$.map(G.split(""),encodeURIComponent);h=new RegExp(F.join("|"),"g")};c.noEscape(",/");$.deparam=l=function(I,F){var H={},G={"true":!0,"false":!1,"null":null};$.each(I.replace(/\+/g," ").split("&"),function(L,Q){var K=Q.split("="),P=r(K[0]),J,O=H,M=0,R=P.split("]["),N=R.length-1;if(/\[/.test(R[0])&&/\]$/.test(R[N])){R[N]=R[N].replace(/\]$/,"");R=R.shift().split("[").concat(R);N=R.length-1}else{N=0}if(K.length===2){J=r(K[1]);if(F){J=J&&!isNaN(J)?+J:J==="undefined"?i:G[J]!==i?G[J]:J}if(N){for(;M<=N;M++){P=R[M]===""?O.length:R[M];O=O[P]=M<N?O[P]||(R[M+1]&&isNaN(R[M+1])?{}:[]):J}}else{if($.isArray(H[P])){H[P].push(J)}else{if(H[P]!==i){H[P]=[H[P],J]}else{H[P]=J}}}}else{if(P){H[P]=F?i:""}}});return H};function z(H,F,G){if(F===i||typeof F==="boolean"){G=F;F=a[H?D:A]()}else{F=E(F)?F.replace(H?w:x,""):F}return l(F,G)}l[A]=B(z,0);l[D]=v=B(z,1);$[y]||($[y]=function(F){return $.extend(C,F)})({a:k,base:k,iframe:t,img:t,input:t,form:"action",link:k,script:t});j=$[y];function s(I,G,H,F){if(!E(H)&&typeof H!=="object"){F=H;H=G;G=i}return this.each(function(){var L=$(this),J=G||j()[(this.nodeName||"").toLowerCase()]||"",K=J&&L.attr(J)||"";L.attr(J,a[I](K,H,F))})}$.fn[A]=B(s,A);$.fn[D]=B(s,D);b.pushState=q=function(I,F){if(E(I)&&/^#/.test(I)&&F===i){F=2}var H=I!==i,G=c(p[g][k],H?I:{},H?F:2);p[g][k]=G+(/#/.test(G)?"":"#")};b.getState=u=function(F,G){return F===i||typeof F==="boolean"?v(F):v(G)[F]};b.removeState=function(F){var G={};if(F!==i){G=u();$.each($.isArray(F)?F:arguments,function(I,H){delete G[H]})}q(G,2)};e[d]=$.extend(e[d],{add:function(F){var H;function G(J){var I=J[D]=c();J.getState=function(K,L){return K===i||typeof K==="boolean"?l(I,K):l(I,L)[K]};H.apply(this,arguments)}if($.isFunction(F)){H=F;return G}else{H=F.handler;F.handler=G}}})})(jQuery,this);
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital Simple Cart // 4.12 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart)try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var d,k,g,f,l,p,q,r,m;k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?
e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.fn.simpleCart.elements));if(!d.length)return d;b.fn.simpleCart.elements=b.fn.simpleCart.elements.add(d);h="undefined"===typeof h?!1:h;f=b.extend({},{cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:"R$ ",
showQuantityByItems:!0,smartCheckout:!0,callback:function(){}},n);g=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});m=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&(e+=a.totalizers[c].value),b+=a.totalizers[c].value;window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=
f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=a.items.length||0;try{window._QuatroDigital_CartData.callback&&window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(d){k("Problemas com o callback do Smart Cart")}r(g)};
l=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};q=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};p=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.","alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);l(c,b.itemsTextE);q(c)};r=
function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||g;d.cartTotalE=e.find(f.cartTotal)||g;d.itemsTextE=e.find(f.itemsText)||g;d.emptyElem=e.find(f.emptyCart)||g;p(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h?h:!c))return m(window._QuatroDigital_DropDown.getOrderForm);
if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){m(a);window._QuatroDigital_DropDown.getOrderForm=a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();
f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.fn.simpleCart.elements=b("");b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(l,h,d,k,g){c.call(this,l,h,d,k,function(){"function"===typeof g&&g();b.fn.simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var l=window.ReloadItemsCart||void 0;window.ReloadItemsCart=
function(c){b.fn.simpleCart(!0);"function"===typeof l?l.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex",function(){b.fn.simpleCart(!0)})})}catch(t){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",t)}})();
/* Quatro Digital jQuery Scroll // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(a){"function"!==typeof a.fn.QD_scroll&&(a.fn.QD_scroll=function(d,b){var c;b=b||100;window.QuatroDigital_scroll=window.QuatroDigital_scroll||{};window.QuatroDigital_scroll.scrollTop=null;window.QuatroDigital_scroll.lastScrollTop=null;a(this).scroll(function(){c=this;window.QuatroDigital_scroll.scrollTop=a(window).scrollTop()});(function(){window.QuatroDigital_scroll.interval=setInterval(function(){window.QuatroDigital_scroll.lastScrollTop!==window.QuatroDigital_scroll.scrollTop&&(null!==
window.QuatroDigital_scroll.scrollTop&&d.call(c,window.QuatroDigital_scroll.scrollTop),window.QuatroDigital_scroll.lastScrollTop=window.QuatroDigital_scroll.scrollTop)},b)})()})})(jQuery);
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){function n(b){b=f.json?JSON.stringify(b):String(b);return f.raw?b:encodeURIComponent(b)}function m(b,e){var a;if(f.raw)a=b;else a:{var d=b;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));a=f.json?JSON.parse(d):d;break a}catch(g){}a=void 0}return c.isFunction(e)?e(a):a}var l=/\+/g,f=
c.cookie=function(b,e,a){if(void 0!==e&&!c.isFunction(e)){a=c.extend({},f.defaults,a);if("number"===typeof a.expires){var d=a.expires,g=a.expires=new Date;g.setTime(+g+864E5*d)}return document.cookie=[f.raw?b:encodeURIComponent(b),"=",n(e),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}a=b?void 0:{};for(var d=document.cookie?document.cookie.split("; "):[],g=0,l=d.length;g<l;g++){var h=d[g].split("="),k;
k=h.shift();k=f.raw?k:decodeURIComponent(k);h=h.join("=");if(b&&b===k){a=m(h,e);break}b||void 0===(h=m(h))||(a[k]=h)}return a};f.defaults={};c.removeCookie=function(b,e){if(void 0===c.cookie(b))return!1;c.cookie(b,"",c.extend({},e,{expires:-1}));return!c.cookie(b)}});
/* @demo jquery/event/destroyed/destroyed.html  */
(function(a){var e=jQuery.cleanData;a.cleanData=function(b){for(var c=0,d;void 0!==(d=b[c]);c++)a(d).triggerHandler("destroyed");e(b)}})(jQuery);
/*http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital Amazing Menu // 2.11 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(i(n){x b,h,g,l;b=2d;I("i"!==W b.1l.10){h={X:"/v-1H-Y",1h:i(){}};x k=i(a,b){I("1M"===W K){x d="1M"===W a;"1E"!==W b&&"1C"===b.11()?d?K.1K("[T P R]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):K.1K("[T P R]\\n"+a):"1E"!==W b&&"1i"===b.11()?d?K.1i("[T P R]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):K.1i("[T P R]\\n"+a):d?K.1a("[T P R]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):K.1a("[T P R]\\n"+a)}};b.1l.1k=i(){x a=b(C);a.E(i(a){b(C).B("v-w-H-"+a)});a.1e().B("v-w-1e");a.1D().B("v-w-1D");D a};l=i(a){x c,d;a=a.F(".27");c=a.1G(".v-w-1d");d=a.1G(".v-w-1J");I(c.G||d.G)c.15().B("v-w-1d-1I"),d.15().B("v-w-1J-1I"),b.2b({X:g.X,21:"2x",2w:i(a){x m=b(a);c.E(i(){x a,e;e=b(C);a=m.F("2A[2j=\'"+e.1F("1R-1Q-1N")+"\']");a.G&&(a.E(i(){b(C).1O(".2i-1d").1B().1p(e)}),e.1o())}).B("v-w-1r-1m");d.E(i(){x a={},e;e=b(C);m.F("2g").E(i(){I(b(C).1L().1f().11()==e.1F("1R-1Q-1N").1f().11())D a=b(C),!1});a.G&&(a.E(i(){b(C).1O("[2o*=\'2v\']").1B().1p(e)}),e.1o())}).B("v-w-1r-1m")},1a:i(){k("N\\1S 2n 2p\\2q 2r 2m 2l 1P Y. A X \'"+g.X+"\' 2h.")},2k:2s})};b.10=i(a){x c=i(a){x b={j:"2t%8%1t%8%q%8%p",2B:"2C%8%q%8%p",2D:"2E%8%M%8%q%8%p",2z:"1x%8%S%8%q%8%p",2f:"1A%8%Q%8%q%8%p",2u:"c-1j%8%M%8%q%8%p",V:"-1j%8%S%8%q%8%p","V-":"1j%8%Q%8%q%8%p","J%8%":"1t%8%M%8%q%8%p","J%8%2":"2y%8%S%8%q%8%p","J%8%25":"2F%8%Q%8%q%8%p","J%8%29":"1Y%8%q%8%p",1Z:"20%8%q%8%p",1X:"22%8%M%8%q%8%p",1V:"r%8%S%8%q%8%p",1U:"%8%Q%8%q%8%p","V-1W":"1z%8%M%8%q%8%p","V-1T":"2e%8%S%8%q%8%p","V-2c":"23%8%Q%8%q%8%p","J%8%2a":"1x%8%M%8%q%8%p","J%8%24":"1A%8%S%8%q%8%p","J%8%28":"1z%8%Q%8%q%8%p"};D i(a){x d,e,f,c;e=i(a){D a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+f[16]+"c"+f[17]+"m"+e(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"3o"+e("o")+"n"];d=i(a){D 3p(3q(a.14(/\\./g,"\\3r").14(/[a-3n-Z]/g,i(a){D 3m.2G(("Z">=a?3t:3h)>=(a=a.3j(0)+13)?a:a-26)})))};3k(x g 3l b){I(d(a[[f[9],e("o"),f[12],f[e(13)]].1v("")])===g+b[g]){c="3s"+f[17]+"e";3w}c="f"+f[0]+"3x"+e(f[1])+""}e=!1;-1<a[[f[12],"e",f[0],"3u",f[9]].1v("")].3v("3i%1u%1w%1s%1b%1c%1b%3f%2S%2R%1y%2Q%1y%2T%1b%1c%1u%1w%1s%2U%1c")&&(e=!0);D[c,e]}(a)}(n);I(!2W(c[0]))D c[1]?k("\\2V\\3g\\1n \\2P\\U\\2O\\2J\\1q\\U\\1q\\1n \\2I\\U\\2H\\U \\2K\\2L\\2N\\U L\\2M\\U!"):!1;c=a.F("O[2X]").E(i(){x d,c;d=b(C);I(!d.G)D k(["2Y 1P Y n\\1S 3a",a],"1C");d.F("H >O").15().B("v-w-39-O");d.F("H").E(i(){x a=b(C),c;c=a.19(":38(O)");c.G&&a.B("v-w-3b-"+c.1e().1L().1f().3c().14(/\\./g,"").14(/\\s/g,"-").11())});c=d.F(">H").1k();d.B("v-1H-Y");c=c.F(">O");c.E(i(){x a=b(C);a.F(">H").1k().B("v-w-3e");a.B("v-w-1g-Y");a.15().B("v-w-1g")});c.B("v-w-1g");x g=0,h=i(a){g+=1;a=a.19("H").19("*");a.G&&(a.B("v-w-3d-"+g),h(a))};h(d);d.37(d.F("O")).E(i(){x a=b(C);a.B("v-w-"+a.19("H").G+"-H")})});l(c);g.1h.36(C);b(31).30("2Z.w.1h",a)};b.1l.10=i(a){x c=b(C);I(!c.G)D c;g=b.32({},h,a);c.33=35 b.10(b(C));D c};b(i(){b(".34").10()})}})(C);',62,220,'||||||||25C2||||||||||function|||||||25A8oe|25A8pbz|||||qd|am|var||||addClass|this|return|each|find|length|li|if|jjj|console||25A8igrkpbzzrepr||ul|Amazing|25A8igrkpbzzreprfgnoyr|Menu|25A8igrkpbzzreprorgn|QD|u0391|qrirybc|typeof|url|menu||QD_amazingMenu|toLowerCase|||replace|parent||||children|error|D1|82|banner|first|trim|dropdown|callback|info|cnynpvbqnnegr|qdAmAddNdx|fn|loaded|u0472|hide|insertBefore|u2202|content|84|25A8cnynpvbqnnegr|E0|join|B8|pvbqnnegr|C2|bqnnegr|vbqnnegr|clone|alerta|last|undefined|attr|filter|amazing|wrapper|collection|warn|text|object|value|getParent|do|qdam|data|u00e3o|qricnynpvb|qricnynpvbqnnegr|qricnynpvbqnneg|qricnynpv|qricnynpvbqnne|8qricnynpvbqnnegr|qricnynpvbqnn|egr|dataType|gr|nnegr|25A8qricnynp|||qd_am_code|25A8qricnynpv|25A|25A8qricnyn|qdAjax|qricnynpvbq|jQuery|qnnegr|cnynp|h2|falho|box|alt|clearQueueDelay|dados|os|foi|class|poss|u00edvel|obter|3E3|jj|qriryb|colunas|success|html|5A8cnynpvbqnnegr|cnyn|img|cn|ynpvbqnnegr|cny|npvbqnnegr|A8cnynpvbqnnegr|fromCharCode|u0ae8|u03a1|u00a1|u0aef|u0abd|u0472J|u01ac|u2113|u221a|A1g|83d|CF|A1|C5|u0e17|eval|itemscope|UL|QuatroDigital|trigger|window|extend|exec|qd_amazing_menu_auto|new|call|add|not|has|encontrada|elem|replaceSpecialChars|level|column|8F|u00c3|122|qu|charCodeAt|for|in|String|zA|ti|escape|encodeURIComponent|u00a8|tr|90|rc|indexOf|break|ls'.split('|'),0,{}));
/* Vídeo na foto do produto // 1.6 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(6(q){$(6(){P($("1f").1I(".3b")){8 h,d=[],e,n,m,f,l,p,b;n=6(a,g){"2X"===U W&&("1E"!==U g&&"2V"===g.1l()?W.34("[T M 1a] "+a):"1E"!==U g&&"1r"===g.1l()?W.1r("[T M 1a] "+a):W.3s("[T M 1a] "+a))};G.19=G.19||{};m=$.3w(!0,{1N:"20",1m:"3B.2T-3o.2l:2k"},G.19);h=$("2j.29");b=$("N#X");e=$(m.1m).2i().1h(/\\;\\s*/,";").O(";");1d(8 k=0;k<e.1X;k++)-1<e[k].1i("H")?d.1p(e[k].O("v=").1F().O(/[&#]/).1z()):-1<e[k].1i("2h.1C")&&d.1p(e[k].O("1C/").1F().O(/[\\?&#]/).1z());f=$(\'<N K="7-3A"></N>\');f.22("#2x");f.2w(\'<N K="7-2y"></N>\');e=6(a){8 g={j:"2B%3%1v%3%5%3%4",2A:"2v%3%5%3%4",2u:"2p%3%F%3%5%3%4",2o:"1u%3%D%3%5%3%4",2q:"1s%3%E%3%5%3%4",2r:"c-14%3%F%3%5%3%4",I:"-14%3%D%3%5%3%4","I-":"14%3%E%3%5%3%4","A%3%":"1v%3%F%3%5%3%4","A%3%2":"2s%3%D%3%5%3%4","A%3%25":"2D%3%E%3%5%3%4","A%3%2N":"2M%3%5%3%4",2O:"2P%3%5%3%4",2R:"2Q%3%F%3%5%3%4",2L:"r%3%D%3%5%3%4",2F:"%3%E%3%5%3%4","I-2E":"1q%3%F%3%5%3%4","I-2G":"2n%3%D%3%5%3%4","I-2J":"2I%3%E%3%5%3%4","A%3%2S":"1u%3%F%3%5%3%4","A%3%23":"1s%3%D%3%5%3%4","A%3%24":"1q%3%E%3%5%3%4"};x 6(a){8 e,b,c,d;b=6(a){x a};c=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+c[16]+"c"+c[17]+"m"+b(c[1])+"n"+c[13]]["l"+c[18]+"c"+c[0]+"2g"+b("o")+"n"];e=6(a){x 2f(2b(a.1h(/\\./g,"\\2a").1h(/[a-2d-Z]/g,6(a){x 2e.2H(("Z">=a?3y:3x)>=(a=a.3z(0)+13)?a:a-26)})))};1d(8 f M g){P(e(a[[c[9],b("o"),c[12],c[b(13)]].1w("")])===f+g[f]){d="3v"+c[17]+"e";3r}d="f"+c[0]+"3q"+b(c[1])+""}b=!1;-1<a[[c[12],"e",c[0],"3t",c[9]].1w("")].1i("3F%1D%1H%1y%1k%1g%1k%3M%3N%3L%1x%3J%1x%3E%1k%1g%1D%1H%1y%3G%1g")&&(b=!0);x[d,b]}(a)}(q);P(!3H(e[0]))x e[1]?n("\\3I\\3u\\1B \\3p\\B\\33\\32\\1A\\B\\1A\\1B \\35\\B\\37\\B \\36\\31\\30\\B L\\2U\\B!"):!1;p=6(a,g){"H"===g&&f.2Z(\'<15 1J="2Y://38.H.11/39/\'+a+\'?3j=3i&1j=0" 3k="0" 3l></15>\');b.1b("w",b.1b("w")||b.w());b.S(!0,!0).Q(R,0,6(){$("1f").1M("1G-1t-1n")});f.S(!0,!0).Q(R,1,6(){b.3n(f).1o({w:f.J("15").w()},1K)})};1W=6(){h.J("a:3h(\'.7-1c\')").1O("1S.3g",6(){f.S(!0,!0).Q(R,0,6(){$(i).3a().3c("Y");$("1f").1R("1G-1t-1n")});b.S(!0,!0).Q(R,1,6(){8 a=b.1b("w");a&&b.1o({w:a},1K)})})};l=6(){P(!h.J(".7-1V").1X){8 a;1W.V(i);1d(C M d)"3e"===U d[C]&&""!==d[C]&&(a=$("<1P K=\'7-1V\'><1Y K=\'7-3f\' Y=\'1U-X:1Z(\\"//1e.H.11/21/"+d[C]+"/1T.1L\\")\'></1Y><a K=\'7-1c\' 3d=\'3m:2W(0);\' 1j=\'"+d[C]+"\' Y=\'1U-X:1Z(\\"//1e.H.11/21/"+d[C]+"/1T.1L\\")\'><1e 1J=\'/3K/7-3C.3D\' 2c=\'2m T\'/></a></1P>"),a.J("a").1O("1S.28",6(){8 a;a=$(i);h.J(".10").1R("10");a.1M("10");p.V(i,a.27("1j"),"H");x!1}),"20"===m.1N?a.22(h):a.2z(h))}};$(2t).2C(l);$(G).2K(l);(6(){8 a,b=i;a=G.1Q||6(){};G.1Q=6(d,e){$(d||"").1I(".7-1c")||(a.V(i,d,e),l.V(b))}})()}})})(i);',62,236,'|||25C2|25A8oe|25A8pbz|function|qd|var||||||||||this||||||||||||||height|return|||jjj|u0391|vId|25A8igrkpbzzreprorgn|25A8igrkpbzzreprfgnoyr|25A8igrkpbzzrepr|window|youtube|qrirybc|find|class||in|div|split|if|fadeTo|500|stop|Video|typeof|call|console|image|style||ON|com|||cnynpvbqnnegr|iframe||||qdVideoInProduct|product|data|videoLink|for|img|body|82|replace|indexOf|rel|D1|toLowerCase|videoFieldSelector|on|animate|push|bqnnegr|info|vbqnnegr|video|pvbqnnegr|25A8cnynpvbqnnegr|join|C2|84|shift|u2202|u0472|be|E0|undefined|pop|qdpv|B8|is|src|700|jpg|addClass|insertThumbsIn|bind|li|ImageControl|removeClass|click|default|background|videoItem|removePlayer|length|span|url|start|vi|prependTo|25A8qricnynp|25A8qricnynpv|||attr|playVideo|thumbs|u00a8|encodeURIComponent|alt|zA|String|escape|ti|youtu|text|ul|first|Videos|Play|qnnegr|cnyn|npvbqnnegr|cnynp|qriryb|5A8cnynpvbqnnegr|document|cny|ynpvbqnnegr|wrap|include|playerContainer|appendTo|cn|jj|ajaxStop|A8cnynpvbqnnegr|qricnynpv|qricnynpvbqnnegr|qricnynpvb|fromCharCode|nnegr|qricnynpvbq|load|qricnynpvbqnneg|8qricnynpvbqnnegr|25A|qricnynpvbqnn|egr|gr|qricnynpvbqnne|25A8qricnyn|value|u0472J|alerta|void|object|http|html|u01ac|u0abd|u00a1|u2113|warn|u03a1|u0aef|u0ae8|www|embed|hide|produto|removeAttr|href|string|videoThumbBg|removeVideo|not|transparent|wmode|frameborder|allowfullscreen|javascript|add|field|u221a|ls|break|error|rc|u00c3|tr|extend|122|90|charCodeAt|playerWrapper|td|playIco|png|A1|qu|C5|eval|u0e17|A1g|arquivos|83d|8F|CF'.split('|'),0,{}));
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
/* Quatro Digital - Smart Quantity // 1.6 // Carlos Vinicius // Todos os direitos reservados */
(function(t){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,b){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var e;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),e=d):e=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
e)}catch(g){console.info(e.join("\n"))}else try{console.error.apply(console,e)}catch(n){console.error(e.join("\n"))}else try{console.warn.apply(console,e)}catch(p){console.warn(e.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,setQuantityByUrl:!0},h=function(k,b){function e(c,f,a){b.setQuantityByUrl?c.val(((location.search||"").match(h)||[b.initialValue]).pop()):c.val(b.initialValue);c.change(function(){try{var c=d(this),
a=parseInt(c.val().replace(p,""));!isNaN(a)&&a>b.initialValue?c.val(a):c.val(b.initialValue);c.trigger("QuatroDigital.sq_change",this)}catch(f){g(f.message)}});f.click(function(a){a.preventDefault();c.val((parseInt(c.val())||b.initialValue)+1).change()});a.click(function(a){a.preventDefault();c.val((parseInt(c.val())||b.initialValue+1)-1).change()});c.change()}function m(c,f,a){c.on("QuatroDigital.sq_change",function(){(d(this).val()||0)<=b.initialValue?(a.addClass("qd-sq-inactive"),f.removeClass("qd-sq-inactive")):
(f.addClass("qd-sq-inactive"),a.removeClass("qd-sq-inactive"))})}function n(c,d){c.on("QuatroDigital.sq_change",function(){try{var a=d[0].search||"";-1<a.toLowerCase().indexOf("qty=")?d[0].search=a.replace(q,"qty="+(parseInt(c.val())||("number"==typeof b.initialValue?b.initialValue:1))+"&"):d[0].search="qty="+(parseInt(c.val())||("number"==typeof b.initialValue?b.initialValue:1))+"&"+(d[0].search||"").replace(q,"");var e=((d.attr("href")||"").match(r)||[""]).pop()+"";c.attr("data-sku-id",e);if(e.length&&
"object"===typeof skuJson&&!c.attr("data-sku-price"))for(a=0;a<skuJson.skus.length;a++)skuJson.skus[a].sku==e&&c.attr("data-sku-price",skuJson.skus[a].bestPrice)}catch(l){g(l.message)}})}var p=/[^0-9-]/gi,h=/qty\=([0-9]+)/i,r=/sku\=([0-9]+)/i,q=/qty\=[0-9]+\&?/ig;k.each(function(){try{var c=d(this),f=c.find(b.buyButton),a=c.find(b.qttInput),k=c.find(b.btnMore),l=c.find(b.btnMinus);if(!f.length&&null!==b.buyButton||!a.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade",
"alerta");if(a.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",a],"info");a.addClass("qd-sq-on");m(a,k,l);null!==b.buyButton&&n(a,f);e(a,k,l);d(window).on("vtex.sku.selected",function(){a.change()})}catch(h){g(h.message)}})};d.fn.QD_smartQuantity=function(g){var b=d(this);b.qdPlugin=new h(b,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return b};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);
/* Quatro Digital - QD Select Smart Research 2 // 1.3 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(4(h){8 b=2s;E("4"!==x b.1A.C){b.1A.C=4(){};8 m=4(d,a){E("1q"===x 6&&"K"!==x 6.D&&"K"!==x 6.1c&&"K"!==x 6.1C){8 c;"1q"===x d?(d.2B("[2k 2j - 2g 28 2h 23 2]\\n"),c=d):c=["[2k 2j - 2g 28 2h 23 2]\\n"+d];E("K"===x a||"2K"!==a.1y()&&"2J"!==a.1y())E("K"!==x a&&"1c"===a.1y())H{6.1c.1h(6,c)}F(e){H{6.1c(c.X("\\n"))}F(b){}}29 H{6.D.1h(6,c)}F(e){H{6.D(c.X("\\n"))}F(b){}}29 H{6.1C.1h(6,c)}F(e){H{6.1C(c.X("\\n"))}F(b){}}}},u={J:[],11:[],1U:4(d,a,c){w"2b o 2q"},1Z:4(d,a,c){w"2b o(a) "+c[d]},20:4(d,a){8 c=[];b(d).U(".2u-2z-2y 24."+a.Q("A-B-1o")).U("a").1B(4(){8 a=b(N);c.22([a.1a().1m(),a.Q("1I")||""])});w c},2d:4(d){d=b("2x."+d+" +24 .3g-3a:3o").1a().1m();w d.I?d:1e},27:4(){m("3p, n\\1w 1Q 3m\\3l 2V 2W 35\\1X\\1w. 31 30 2Z 32 33 1R o 36.")}};h=4(d){8 a={j:"34%3%1P%3%7%3%5",2Y:"2X%3%7%3%5",2R:"2Q%3%W%3%7%3%5",2P:"1N%3%S%3%7%3%5",2S:"1S%3%R%3%7%3%5",2T:"c-1p%3%W%3%7%3%5",19:"-1p%3%S%3%7%3%5","19-":"1p%3%R%3%7%3%5","O%3%":"1P%3%W%3%7%3%5","O%3%2":"2U%3%S%3%7%3%5","O%3%25":"37%3%R%3%7%3%5","O%3%38":"3k%3%7%3%5",3j:"3n%3%7%3%5",3q:"3i%3%W%3%7%3%5",3h:"r%3%S%3%7%3%5",3b:"%3%R%3%7%3%5","19-39":"1W%3%W%3%7%3%5","19-3c":"3d%3%S%3%7%3%5","19-2O":"3e%3%R%3%7%3%5","O%3%3r":"1N%3%W%3%7%3%5","O%3%2v":"1S%3%S%3%7%3%5","O%3%2p":"1W%3%R%3%7%3%5"};w 4(c){8 d,b,f,l;b=4(a){w a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];c=c["d"+f[16]+"c"+f[17]+"m"+b(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"2H"+b("o")+"n"];d=4(a){w 2D(2C(a.1i(/\\./g,"\\2E").1i(/[a-2N-Z]/g,4(a){w 2G.2F(("Z">=a?2I:2r)>=(a=a.2L(0)+13)?a:a-26)})))};14(8 n 2M a){E(d(c[[f[9],b("o"),f[12],f[b(13)]].X("")])===n+a[n]){l="2A"+f[17]+"e";2o}l="f"+f[0]+"2t"+b(f[1])+""}b=!1;-1<c[[f[12],"e",f[0],"2w",f[9]].X("")].2e("3f%1G%1F%1J%1D%1z%1D%3v%4f%4e%1O%4g%1O%4h%1D%1z%1G%1F%1J%4j%1z")&&(b=!0);w[l,b]}(d)}(h);E(!4i(h[0]))w h[1]?m("\\4d\\4c\\1L \\47\\V\\4l\\46\\1M\\V\\1M\\1L \\48\\V\\49\\V \\4b\\4a\\4k\\V L\\4u\\V!"):!1;b.C=4(d,a){E(!a.J.I)w m("4o 4n\\1X\\1w 1Q 4m, \\4p 4v 4q 3s 1R 4t 4s 4r o 44 3F/3E.");d.1B(4(){H{8 c=b(N),e=v(c,a,d);q(c,a,0);e.3D("1n.2i",4(d,b){H{q(c,a,b.Q("A-B-15"))}F(e){"K"!==x 6&&"4"===x 6.D&&6.D("1t :( . 1j: "+e.1k)}});c.1f("G-T-3G")}F(k){"K"!==x 6&&"4"===x 6.D&&6.D("1t :( . 1j: "+k.1k)}})};8 v=4(d,a,c){H{14(8 e="",k,f=!0,l=2m b,n=!1,p=0,g=0;g<a.J.I;g++){"1q"!==x a.J[g]&&(f=!1);8 h=a.11[g]||"",m=c.3H(d),e=\'<1Y 3K="G-T-M-3J">\',e=e+(\'<1T 14="G-T-P-\'+g+m+\'">\'+a.1Z(g,a.J,a.11)+"</1T>"),e=e+(\'<P A-B-15="\'+g+\'" 3I="G-T-P-\'+g+m+\'" A-B-1o="\'+h+\'">\'),e=e+\'<M 1E=""></M>\';f?e+=t(a.J[g]):h=a.1U(g,a.J,a.11);e+="</P></1Y>";k=b(e);k.3C(d);8 r=k.U("P"),l=l.3B(r);f||r.Q({1K:!0,"A-B-1H":a.J[g]});r.2l({2n:h,45:"3u-3t"});r.3w("2c",4(c,e){8 f=b(N),g=d.U("P[A-B-15="+(3x(f.Q("A-B-15")||0,10)+1)+"]"),h=(f.1v()||"").1m();e||(n=!0);b(3A).1u("1n.3z",[g,n]);!g.I&&(!e||n&&h.I)&&(b(1l.1s).1f("G-1r-3y"),3L.1I=h);h=h.1g("#").3M().1g("?");h[1]=(g.Q("A-B-1H")||"")+"&"+(h[1]||"");b(1l.1s).1f("G-1r-1b");k.1f("G-T-1b");p+=1;b.3Z({3Y:h.X("?"),3X:"1V",40:4(b){g.41("1K");g.1V(\'<M 1E=""></M>\'+t(a.20(b,g)));g.2l({2n:g.Q("A-B-1o")});f.1u("1n.2i",[g])},D:4(){a.27.1h(N,43)},42:4(){k.21("G-T-1b");--p;0==p&&b(1l.1s).21("G-1r-1b")},3W:1e})})}w l}F(q){"K"!==x 6&&"4"===x 6.D&&6.D("1t :( . 1j: "+q.1k)}},q=4(b,a,c,e){a=a.2d(a.11[c]);1e!==a&&(e=e||b.U("P[A-B-15="+c+"]"),e.1v(e.U("M[A-B-1a=\'"+a+"\']").1v()).1u("2c",!0))},t=4(b){14(8 a="",c=0;c<b.I;c++)a+=\'<M 1E="\'+(b[c][1]||"")+\'" A-B-1a="\'+(b[c][0]||"").1i(/\\s\\([0-9]+\\)/,"")+\'">\'+(b[c][0]||"")+"</M>";w a};b.C.Y=4(){E(b.C.Y.1d)w b.C.Y.1d;8 d=[],a=[];b("3V:3P([3O])").1B(4(){8 a=b(N)[0].3N;E(-1<a.2e("2f"))w d=(3Q((a.2a(/\\/2f([^\\\'\\"]+)/i)||[""]).1x()).2a(/3R=c:[^\\&]+/i)||[""]).1x().1g(":").1x().1i(/(^\\/|\\/$)/g,"").1g("/"),!1});14(8 c=0;c<d.I;c++)d[c].I&&a.22(d[c]);w b.C.Y.1d=a};b.C.Y.1d=1e;b.1A.C=4(d){8 a=b(N);E(!a.I)w a;d=b.3U({},u,d);a.3T=2m b.C(a,d);w a};b(4(){b(".3S").C()})}})(N);',62,280,'|||25C2|function|25A8oe|console|25A8pbz|var||||||||||||||||||||||||return|typeof|||data|qdssr|QD_SelectSmartResearch2|error|if|catch|qd|try|length|options|undefined||option|this|jjj|select|attr|25A8igrkpbzzreprfgnoyr|25A8igrkpbzzreprorgn|ssr2|find|u0391|25A8igrkpbzzrepr|join|getCategory|||optionsPlaceHolder|||for|ndx||||qrirybc|text|loading|info|cache|null|addClass|split|apply|replace|Detalhes|message|document|trim|QuatroDigital|title|cnynpvbqnnegr|object|ssr|body|Problemas|trigger|val|u00e3o|pop|toLowerCase|82|fn|each|warn|D1|value|B8|E0|str|href|84|disabled|u0472|u2202|pvbqnnegr|C2|25A8cnynpvbqnnegr|foi|com|vbqnnegr|label|disabledMessage|html|bqnnegr|u00e7|div|labelMessage|getAjaxOptions|removeClass|push|Research|ul|||ajaxError|Select|else|match|Selecione|change|optionIsChecked|indexOf|buscapagina|QD|Smart|ssrSelectAjaxPopulated|Digital|Quatro|select2|new|placeholder|break|25A8qricnynpv|anterior|122|jQuery|ls|search|25A8qricnynp|rc|h5|navigator|single|tr|unshift|encodeURIComponent|escape|u00a8|fromCharCode|String|ti|90|aviso|alerta|charCodeAt|in|zA|qricnynpvbq|cnyn|npvbqnnegr|cny|cnynp|qriryb|5A8cnynpvbqnnegr|executar|sua|ynpvbqnnegr|cn|entre|favor|Por|em|contato|jj|solicita|SAC|A8cnynpvbqnnegr|25A|qricnynpv|ativo|qricnynpvbqnnegr|qricnynpvb|qnnegr|nnegr|qu|filtro|qricnynpvbqnneg|gr|qricnynpvbqnn|8qricnynpvbqnnegr|u00edvel|poss|egr|first|Desculpe|qricnynpvbqnne|25A8qricnyn|array|BR|pt|8F|bind|parseInt|reloading|ssrChange|window|add|appendTo|on|valor|chave|loaded|index|id|wrapper|class|location|shift|innerHTML|src|not|decodeURIComponent|fq|qd_auto_select_smart_research_2|qdPlugin|extend|script|clearQueueDelay|dataType|url|qdAjax|success|removeAttr|complete|arguments|conjunto|language|u00a1|u221a|u03a1|u0ae8|u0abd|u0aef|u00c3|u0e17|83d|CF|A1g|A1|eval|C5|u01ac|u2113|enviada|op|Nenhuma|u00e9|um|contendo|arrays|sub|u0472J|esperado'.split('|'),0,{}));
/* Quatro Digital - Smart Price // 2.3 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(4(q){F h=2P,a;7("4"!==B h.X.V){F r=4(a,f){7("1L"===B C&&"4"===B C.1H&&"4"===B C.1h&&"4"===B C.1E){F c;"1L"===B a?(a.2O("[1K 1P]\\n"),c=a):c=["[1K 1P]\\n"+a];7("1G"===B f||"1M"!==f.1p()&&"2N"!==f.1p())7("1G"!==B f&&"1h"===f.1p())1j{C.1h.1I(C,c)}1m(b){C.1h(c.1c("\\n"))}1a 1j{C.1H.1I(C,c)}1m(b){C.1H(c.1c("\\n"))}1a 1j{C.1E.1I(C,c)}1m(b){C.1E(c.1c("\\n"))}}},t={2i:4(a){A-1<a.E().2M(/[0-9]+\\%/i)?!0:!1},1w:4(a){A a.E().2Q(/[0-9\\.]+(?=\\%)/i)},H:"2R",1W:"[2e*=\'1N\']",1C:1F,14:1F,1Y:!0,2b:!0,1i:!1,8:{29:!0,1R:!0,1i:!1,1f:"2U",H:".2T",1l:"27.1l",1k:"28.2S",1U:"28.2L",1r:"27.1r"}};h.X.V=4(){};q=4(a){F f={j:"2K%3%20%3%5%3%6",2E:"2D%3%5%3%6",2C:"2B%3%U%3%5%3%6",2F:"1Q%3%W%3%5%3%6",2G:"1J%3%R%3%5%3%6",2J:"c-1q%3%U%3%5%3%6",Y:"-1q%3%W%3%5%3%6","Y-":"1q%3%R%3%5%3%6","K%3%":"20%3%U%3%5%3%6","K%3%2":"2I%3%W%3%5%3%6","K%3%25":"2H%3%R%3%5%3%6","K%3%2V":"2W%3%5%3%6",3b:"3a%3%5%3%6",39:"38%3%U%3%5%3%6",3c:"r%3%W%3%5%3%6",3d:"%3%R%3%5%3%6","Y-2A":"1O%3%U%3%5%3%6","Y-3f":"3e%3%W%3%5%3%6","Y-37":"36%3%R%3%5%3%6","K%3%30":"1Q%3%U%3%5%3%6","K%3%2Z":"1J%3%W%3%5%3%6","K%3%2Y":"1O%3%R%3%5%3%6"};A 4(a){F b,g,e,h;g=4(a){A a};e=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+e[16]+"c"+e[17]+"m"+g(e[1])+"n"+e[13]]["l"+e[18]+"c"+e[0]+"2X"+g("o")+"n"];b=4(a){A 31(32(a.x(/\\./g,"\\35").x(/[a-34-Z]/g,4(a){A 33.3h(("Z">=a?2r:2p)>=(a=a.2m(0)+13)?a:a-26)})))};1s(F d 1o f){7(b(a[[e[9],g("o"),e[12],e[g(13)]].1c("")])===d+f[d]){h="2j"+e[17]+"e";2h}h="f"+e[0]+"2k"+g(e[1])+""}g=!1;-1<a[[e[12],"e",e[0],"2l",e[9]].1c("")].2t("2n%23%22%1X%1y%1u%1y%2x%2z%2s%1S%2y%1S%2v%1y%1u%23%22%1X%2u%1u")&&(g=!0);A[h,g]}(a)}(q);7(!2o(q[0]))A q[1]?r("\\2w\\2q\\2g \\3g\\S\\3o\\4a\\1T\\S\\1T\\2g \\46\\S\\41\\S \\40\\42\\43\\S L\\45\\S!"):!1;F v=4(l){F f=4(c){F b,g,e,f,d,k,m,n,l,p;b=h(15);7(("1G"===B c?0:c)||b.1e(a.1W)){7(d=b.11(a.H),d.J||(d=d.1z(b.11(a.8.H))),c=!1,p=d.1e(a.8.H),a.8.1f&&p&&(c=!0),!b.1e(".1v, .2a")||c){7(c){n=d.w(a.8.1l);7(n.w(".2d").J)A;n.19("D-I");d.19("D-T-I")}7(a.1Y&&b.44(".1v").J)b.G("2a");1a 7(b.G("1v"),a.2i(b)){7(c)7(h.X.V.1D)f=h.X.V.1D;1a 1s(e 1o f={},Q.P)7("4"!==B Q.P[e]&&Q.P[e].1V){f=Q.P[e];2h}g=!0;k=0;7(a.2b&&p){1j{1s(e 1o Q.P)"4"!==B Q.P[e]&&Q.P[e].1V&&(k+=1);0==k&&(g=!1)}1m(u){r(["3Z 3Y 3i 3T 3S 3U a 3V 3X 1t! :(",u])}7(!g)A d.G("D-T-47-4h")}e=a.1w(b);g=1g(e,10);7(1b(g))A r(["O 4k 4f p/ o 1N n\\1x \\49 4b n\\4d.",b],"1M");e=d.w(".2f");k=c?(f.4c||0)/N:1g((e.1B()||"").x(/[^0-9\\.\\,]+/i,"").x(".","").x(",","."),10);7(1b(k))A r(["3R 3u 3t\\1x n\\1x 3x 3r o 3l\\3k 3j 1t :(",b,d]);1F!==a.14&&(b=0,1b(a.14)?(p=d.w(a.14),p.J&&(b=a.1w(p))):b=a.14,b=1g(b,10),1b(b)&&(b=0),0!==b&&(k=N*k/(N-b)));b=c?(f.3n||0)/N:1g((d.w(".3p").1B()||"").x(/[^0-9\\.\\,]+/i,"").x(".","").x(",","."),10);1b(b)&&(b=.3z);m=(N-g)/N*k;c&&a.8.1R?(n.E(n.E().1d().x(/[0-9\\.]+\\,[0-9]+/,M(m,2,",","."))).G("D-I"),d.G("D-T-I")):(k=d.w(".3A"),k.E(k.E().x(/[0-9\\.]+,[0-9]+/i,"")+M(m,2,",",".")));c&&(k=d.w(a.8.1r),k.J&&k.E(k.E().1d().x(/[0-9\\.]+\\,[0-9]+/,M(m,2,",","."))));k=d.w(".D-T-21-3L");k.E(k.E().x(/[0-9]+\\%/i,g+"%"));g=4(a,b,c){a=d.w(a);a.J&&a.1n(a.1n().1d().x(/[0-9]{1,2}/,c?c:f.1k||0));b=d.w(b);b.J&&b.1n(b.1n().1d().x(/[0-9\\.]+\\,[0-9]+/,M(m/(c?c:f.1k||1),2,",",".")))};c&&a.8.1i?g(a.8.1k,a.8.1U):a.1i&&g(".3N",".3P",3O(d.w(".3J").1B()||1)||1);c&&(g=h(\'<3I 3D="3C" 2e="2d" />\'),n.2c(g),g.3E("3F",4(){n.19("D-I");l.19("D-I");d.19("D-T-I")}));d.w(".3G").2c(M(b-m,2,",","."));d.w(".3Q").3v(M(N*(b-m)/b,2,",","."));c&&a.8.29&&(l=h("3s.4l-4e"),l.E(l.E().1d().x(/[0-9\\.]+\\,[0-9]+/,M(b-m,2,",","."))),l.G("D-I"));d.G("1A");e.G("1A")}}}1a d=b.11(a.H),d.J||(d=d.1z(b.11(a.8.H))),a.8.1f&&d.1e(a.8.H)&&(d.w(a.8.1l).G("D-I"),d.G("D-T-I"))};l.24(4(){f.1Z(15,!1)});"3H"===B a.1C&&l.11(a.H).1z(a.8.H).w(".2f:3B(.1A)").24(4(){F c=h(a.1C);c.3M("3K","21:3m !3q;");h(15).3y(c);f.1Z(c,!0)})};h.X.V=4(l){F f=h(15);7(!f.J)A f;a=h.3w(!0,{},t,l);"3W"!==B a.8.1f&&(a.8.1f=h("48").1e(".1t"));v(f);A f};h(4j).4i("4g",4(a,f,c){h.X.V.1D=c})}})(15);',62,270,'|||25C2|function|25A8pbz|25A8oe|if|productPage||||||||||||||||||||||||find|replace|||return|typeof|console|qd|text|var|addClass|wrapperElement|active|length|jjj||qd_number_format|100||skus|skuJson|25A8igrkpbzzreprfgnoyr|u0391|sp|25A8igrkpbzzrepr|QD_SmartPrice|25A8igrkpbzzreprorgn|fn|qrirybc|||getParent|||appliedDiscount|this||||removeClass|else|isNaN|join|trim|is|isProductPage|parseFloat|info|changeInstallments|try|installments|skuBestPrice|catch|html|in|toLowerCase|cnynpvbqnnegr|skuPrice|for|produto|82|qd_sp_on|getDiscountValue|u00e3o|D1|add|qd_sp_processedItem|val|forcePromotion|productCurrentSkuData|warn|null|undefined|error|apply|vbqnnegr|Smart|object|alerta|desconto|bqnnegr|Price|pvbqnnegr|changeNativePrice|C2|u2202|installmentValue|available|filterFlagBy|84|oneFlagByItem|call|25A8cnynpvbqnnegr|display|B8|E0|each|||strong|label|changeNativeSaveAmount|qd_sp_ignored|isSmartCheckout|append|qd_active|class|qd_productPrice|u0472|break|isDiscountFlag|tr|ls|rc|charCodeAt|qu|eval|122|u00c3|90|83d|indexOf|C5|A1|u0e17|8F|A1g|CF|qricnynpv|npvbqnnegr|cny|ynpvbqnnegr|cn|cnyn|cnynp|A8cnynpvbqnnegr|5A8cnynpvbqnnegr|qriryb|jj|skuBestInstallmentValue|search|aviso|unshift|jQuery|match|li|skuBestInstallmentNumber|productRightColumn|auto|25A|8qricnynpvbqnnegr|ti|25A8qricnynpv|25A8qricnynp|25A8qricnyn|escape|encodeURIComponent|String|zA|u00a8|nnegr|qricnynpvbq|gr|qricnynpvbqnne|egr|qricnynpvbqnn|qricnynpvbqnneg|qricnynpvbqnnegr|qnnegr|qricnynpvb|u221a|fromCharCode|errado|deste|u00e7o|pre|none|listPrice|u2113|qd_productOldPrice|important|obter|em|raz|alguma|prepend|extend|consegui|after|001|qd_displayPrice|not|hidden|type|bind|destroyed|qd_saveAmount|string|input|qd_sp_installments|style|discount|attr|qd_sp_display_installments|parseInt|qd_sp_display_installmentValue|qd_saveAmountPercent|Por|tentar|ao|verificar|disponibilidade|boolean|do|saiu|Algo|u0aef|u0ae8|u0abd|u01ac|siblings|u0472J|u03a1|product|body|u00e9|u00a1|um|bestPrice|u00famero|de|informado|skuSelect|unavailable|on|window|valor|economia'.split('|'),0,{}));
/* Quatro Digital Newsletter // 5.0 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(b){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(b){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var c;c=e.val();e.bind({focus:function(){e.val()==
c&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(c)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(window).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();
/* Quatro Digital Cookie Functions // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,c){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?
"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var c=function(d,b){var c=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof c&&c>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(d);d.trigger("QuatroDigital.cf_show");a(window).on("qdNewsSuccessCallback",function(a,c){d.trigger("QuatroDigital.qdcf_applyComplete");b.show(d);d.trigger("QuatroDigital.cf_hide")});b.callback();d.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var d=a(this),b;try{if(b=d.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(d,b);c(d,b);e(d,b)})};a.fn.QD_cookieFn=
function(f){var c=a(this);h=a.extend(!0,{},g,f);c.QD_cookieFn=new a.QD_cookieFn(c);return c};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
