/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
// (function(){"undefined"===typeof window.console&&(window.console=window.console||{});"object"===typeof window.console&&"function"!==typeof window.console.error&&(window.console.error=function(){});"object"===typeof window.console&&"function"!==typeof window.console.info&&(window.console.info=function(){});"object"===typeof window.console&&"function"!==typeof window.console.warn&&(window.console.warn=function(){});"object"===typeof window.console&&"function"!==typeof window.console.debug&& (window.console.debug=function(){});"object"===typeof window.console&&"function"!==typeof window.console.log&&(window.console.log=function(){})})();

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.bannersCount();
			Common.userAuth();
			// Common.bannerResponsive();
			Common.productCaroussel();
			Common.productOwlCarousel();
			// Common.modalNewsLetter();
			Common.callSmartCart();
			Common.cartAddProduct();
			Common.amazingMenu();
			Common.applyMosaicBanners();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		cartAddProduct: function() {
			var modal = $('.modal').clone().appendTo(document.body).addClass('qd-v1-modal-add-product-cart');

			modal.find('.modal-body').append('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Produto adicionado com sucesso!</p>');

			$(window).on("cartProductAdded.vtex", function() {
				modal.modal();

				setTimeout(function() {
					modal.modal('hide');
				}, 3000);
			});
		},
		applyMosaicBanners: function() {
			$('.qd-mosaic-banners > .box-banner').QD_mosaicBanners({
				// bannerColSecurityMargin: -30,
				containerWidth: 1142,
				classTwoColumn: "col-xs-24 col-sm-12", // Classe do bootstrap para 2 banner por linha
				classThreeColumn: "col-xs-12 col-sm-8", // Classe do bootstrap para 3 banner por linha
				classFourColumn: "col-xs-12 col-sm-6" // Classe do bootstrap para 4 banner por linha				
			});
		},		
		callSmartCart: function() {
			// Adiciona Carrinho e Backdrop
			$(document.body).append('<div class="components-qd-v1-overlay"></div>');
			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"> <div class="qd-sc-wrapper"></div> </div>');

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

			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$(".v2-cart-wrapper a.cartLink").click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-show');
			});
		},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		amazingMenu:function(){
			var amazingMenuMobile = $('.header-qd-v3-amazing-menu-mobile');

			$('[class*=main-amazing-menu]').QD_amazingMenu();

			$('.header-qd-v3-amazing-menu-mobile-content').append('<span class="header-qd-v1-mobile-amazing-menu-close"></span>');

			// Amazing Menu Responsivo
			$(".header-qd-v3-amazing-menu-mobile-btn").click(function(){
				$("body").toggleClass('qd-am-on');
			});

			$(".components-qd-v1-overlay, .header-qd-v1-mobile-amazing-menu-close").click(function(){
				$("body").removeClass('qd-am-on');
			});

			amazingMenuMobile.find('> ul > li > a, > ul > li > p').each(function() {
				var $t = $(this);

				if ($t.find('+ ul').length > 0)
					$t.addClass('link-dropdown');
			});

			amazingMenuMobile.find('.link-dropdown').click(function(evt) {
				evt.preventDefault();
				var $t = $(this);

				$t.find('+ ul').stop(true, true).slideToggle('slow');
				$t.toggleClass('active');
			});
		},
		userAuth:function(){
			$.qdAjax({
				url: "/no-cache/profileSystem/getProfile",
				dataType: "json",
				clearQueueDelay: null,
				success: function(data){
					try{
						if(data.IsUserDefined){
							// logado
							$(".qd-header-auth").text("(Sair)").attr({"href":"/no-cache/user/logout", "title": (data.FirstName ? data.FirstName + " " + (data.LastName || ""): data.Email), "data-placement":"bottom" }).tooltip();
						}
						else{
							// Deslogado
							$(".qd-header-auth").text("(Entrar)").click(function(e) {
								e.preventDefault();
								vtexid.start();
							});
						}
					}catch (e) {
						if (typeof console !== "undefined" && typeof console.info === "function")
							console.info("Ops, algo saiu errado com o login.", e.message);
					}
				}
			});
		},
		bannerResponsive:function(){
			$(".qd-banner-responsive .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr( "href", href.replace(/(col-)?(xs|sm|md|lg)-[0-9]{1,2},?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : "col-" + str );
					return "";
				}) );

				$t.parent().addClass( cols.length ? cols.join(" ") : "col-xs-12 col-sm-12" );
			});
		},
		productOwlCarousel:function(){
			if (!$.fn.owlCarousel)
				return;

			$('body.produto .prateleira fieldset').parent().addClass('qd-accessories');

			$(".qd-shelf-carousel .prateleira:not(.qd-accessories)").each(function() {
				$(this).owlCarousel({
					items: 4,
					navigation: true,
					pagination: false
				});
			});
		},
		productCaroussel: function(){
			$(".qd-porduct-collections-accessories .prateleira, .qd-shelf-carousel .prateleira, .shelf-qd-v1-carousel .prateleira").each(function(){
				var wrap = $(this);

				wrap.find("> h2").addClass('heading-2').insertBefore(wrap);
				wrap.find(".prateleira >ul").addClass("item");
			});
		},
		modalNewsLetter: function () {
			var modal = $(".modal");
			var html = $('<form novalidate="1"> <div class="row"> <div class="col-xs-15 col-xs-offset-9"> <div class="qd_news"> <div class="row form-row"> <input type="text" name="nome" class="qd_news_name input-type-text-ghost form-control" /> </div> <div class="row form-row"> <input type="email" name="email" class="qd_news_email input-type-text-ghost form-control" /> </div> <div class="row form-row"> <button class="qd_news_button">Gerar cupom</button> </div> </div> <span class="btn-close ico-close" data-dismiss="modal"></span> </div> </div> </form>');
			var inputSuccess = $('<div class="row form-row"><input type="text" name="name" class="qd_success input-type-text-ghost form-control" /><button class="qd_news_button_ok" data-dismiss="modal">OK!</button></div>');

			// Ações
			modal.on("hidden.bs.modal", function(){
				modal.removeClass("newsletter-modal");
				html.trigger("QuatroDigital.cf_close");
			});

			html.QD_cookieFn({
				cookieName: "newsletter",
				close: "",
				expireDays: 31,
				show: function($elem){
					modal.find(".modal-body").empty().append(html);
					modal.addClass("newsletter-modal");
					modal.modal();

					html.QD_news({
						defaultName: "Nome",
						defaultEmail: "E-mail",
						checkNameFieldIsVisible: false,
						successCallback: function () {
							$(".newsletter-modal").addClass("newsletterFinish");
							$(".qd_news").append(inputSuccess);
							$(".newsletter-modal .qd_success").val("PROMO1COMP");
						}
					});
				},
				hide: function($elem){}
			});
		}
	};

	var Home = {
		init: function() {
			Home.brandOwlCarousel();
			Home.cycle2();
			Home.cycle2Mobile();
			Home.organizeSideMenuCollection();
			Home.homeSliderFull();
			// Home.mosaicAdjustment();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		brandOwlCarousel:function(){
			var owl = $(".qd-banner-carousel");

			owl.owlCarousel({
				items: 5,
				navigation: true,
				pagination: false,
				navigationText: ["",""]
			});

			// Custom Navigation Events
			$(".owl-next").click(function(){
				owl.trigger('owl.next');
			});
			$(".owl-prev").click(function(){
				owl.trigger('owl.prev');
			});
		},
		cycle2: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".main-slider");

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".responsive-pager",
				prev: ".cycle-prev",
				next: ".cycle-next"
			});
		},
		cycle2Mobile: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".main-slider-mobile");

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".responsive-pager",
				prev: ".cycle-prev",
				next: ".cycle-next"
			});
		},
		organizeSideMenuCollection: function() {
			var wrapper = $(".qd-category-collections");
			var htmlItem = '<div class="col-xs-24 item"><div class="row"></div></div>';
			var htmlSideMenuWrapper = '<div class="col-xs-24 col-sm-24 col-md-6 htmlSideMenuWrapper"></div>';
			var htmlCollectionWrapper = '<div class="col-xs-24 col-sm-24 col-md-18 htmlCollectionWrapper"></div>';
			var itemSideMenuCollection = '<div class="row itemSideMenuCollection"><div></div></div>';

			wrapper.find('[itemscope="itemscope"]:not(".qd-on")').addClass("qd-on").each(function() {
				$t = $(this);

				$t.after(htmlSideMenuWrapper);

				$('.htmlSideMenuWrapper:not(".qd-on")').addClass("qd-on").append(wrapper.find($t));

				var collectionTitle = $t.getParent(".htmlSideMenuWrapper").find("+ .heading-2");
				var collection = $t.getParent(".htmlSideMenuWrapper").find("+ .heading-2 + .prateleira") || $t.getParent(".htmlSideMenuWrapper").find("+ .prateleira");

				$t.getParent('.htmlSideMenuWrapper').after(htmlCollectionWrapper);

				$('.htmlCollectionWrapper:not(".qd-on")').addClass("qd-on").append(collectionTitle, collection);

				$t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper").after(itemSideMenuCollection);

				$('.itemSideMenuCollection:not(".qd-on")').addClass("qd-on").find("> div").append($t.getParent(".htmlSideMenuWrapper"), $t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper"));
			});

			// APLCIANDO CAROUSEL
			if (!$.fn.owlCarousel)
				return;

			$(".shelf-qd-v1-carousel .prateleira").each(function() {
				$(this).owlCarousel({
					items: 3,
					navigation: true,
					pagination: false
				});
			});
		},
		homeSliderFull: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".home-slider");

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".responsive-pager-2",
				prev: ".cycle-prev-home-slider",
				next: ".cycle-next-home-slider"
			});
		},
		mosaicAdjustment: function() {
			mosaicAddRow($(".qd-banner-responsive >div:not(.row)"));

			function mosaicAddRow(wrapper) {
				var firstTop;
				var items = new $;

				if(!wrapper.length)
					return;

				wrapper.each(function(){
					var $t = $(this);
					var offsetTop = $t.offset().top;

					if (!firstTop)
						firstTop = offsetTop;

					if (offsetTop >= firstTop - 10 && offsetTop <= firstTop + 10)
						items = items.add($t);
					else
						return false;
				});

				items.wrapAll('<div class="row"></div>');
				mosaicAddRow($(".qd-banner-responsive > div:not(.row)"));
			}
		}
	};

	var Departament = {
		init: function () {
			Departament.showDisclaimerBanners();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {},
		showDisclaimerBanners: function () {
			if ($(".disclaimer .box-banner").length)
				$(".disclaimer").show();
		},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			console.log("fiddler on");
			$(".side-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});
			$(".qd-am-overlay, .search-menu-close, .components-qd-v1-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		},
		hideExtendedMenu:function(){
			$(".search-navigator ul").each(function(){
				var t,li,qtt,moreLink,moreLi,click,liHide;

				t=$(this);
				li=t.find(">li");
				qtt=5;

				if(li.length<=qtt) return;

				liHide=li.filter(":gt("+(qtt-1)+")").stop(true,true).hide();
				moreLink=$('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi=$('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">ver mais</a></li>');
				t.append(moreLi);

				click=function(){
					liHide.stop(true,true).slideToggle(function(){
						if(li.filter(":visible").length>qtt){
							moreLink.addClass("minus").text("ver menos");
							moreLi.addClass("minus").find("a").text("ver menos");
						}
						else{
							moreLink.removeClass("minus").text("ver mais");
							moreLi.removeClass("minus").find("a").text("ver mais");
						}
					});
				};
				moreLi.bind("click.qd_viewMore",click);
				moreLink.bind("click.qd_viewMore",click);
			});
		}
	};

	var Search = {
		init: function () {
			Departament.showDisclaimerBanners();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {},
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
		}
	};

	var Product = {
		init: function () {
			Product.seeDescription();
			Product.organizeDescription();
			Product.videoIframe();
			Product.accessoriesFix();
			Product.openShipping();
			Product.hideUniqueSkuOption();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		seeDescription: function() {
			$(".btn-see-description").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".product-description").offset().top - 100
				}, 900, 'swing');
			});
		},
		organizeDescription: function() {
			var wrapper = $('#caracteristicas');

			wrapper.prepend(wrapper.find(".group.Curriculo + table"));
			wrapper.prepend(wrapper.find(".group.Curriculo"));
			wrapper.prepend(wrapper.find(".group.Sinopse + table"));
			wrapper.prepend(wrapper.find(".group.Sinopse"));
		},
		hideUniqueSkuOption: function() {
			$(".sku-selection-box [class*='group_']").each(function(){
				var $t = $(this);
				var input =  $t.find("input");

				if(input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
		},
		videoIframe: function() {
			var wrapper = $('.video-iframe .video-iframe-content');

			wrapper.prepend($(".group.Video + table iframe"));

			if (!$('.group.Video').length > 0)
				return;

			$('.product-image-thumbs').prepend('<li class="thumb-product-video"><a href="#video-iframe"></a></li>');


			$(".thumb-product-video a").click(function(e){
				e.preventDefault();

				var target = this.hash;

				$target = $(target);

				$('html, body').stop().animate({
					'scrollTop': $target.offset().top - 60
				}, 900, 'swing');
			});
		},
		accessoriesFix: function() {
			$("fieldset >.buy-product-checkbox").parent().each(function() {
				var $t  = $(this);
				$t.add($t.prev("ul")).wrapAll('<div class="qd-accessories-wrapper col-xs-24 col-sm-8 col-md-6"/>');
			});
		},
		openShipping: function() {
			ShippingValue();
		}
	};

	var List = {
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
			$(".side-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});
			$(".qd-am-overlay, .search-menu-close, .components-qd-v1-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		}
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
} catch (err) {
	if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
		console.info("Houve um erro nos objetos, informações abaixo.");
		console.error(err.message);
	}
}

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
			body = $("body");
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
	})();
} catch (err) {
	if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
		$("body").addClass('jsFullLoaded jsFullLoadedError');
		console.info("Houve um erro ao iniciar os objetos, informações abaixo.");
		console.error(err);
	}
}

/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
var _0x974c=['javascript:','body','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','.btn-add-buy-button-asynchronous','.remove-href','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddCartWrapper','qd-bb-itemAddBuyButtonWrapper','timeRemoveNewItemClass','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','match','productPageCallback','buyButtonClickCallback','prodAdd','pop','shift','asyncCallback','fakeRequest','ajax','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','QD_buyButton','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','/checkout/cart/add','productAddedToCart.qdSbbVtex','ajaxStop','abs','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','cartTotal','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','exec','QD_checkoutQueue','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','val','.qd-ddc-remove','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','cartIsEmpty','lastSku','[data-sku=\x27','scrollCart','qd-ddc-lastAdded','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','stop','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','_QuatroDigital_AmountProduct','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','productId','prod_','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qdDdcContainer','QD_smartCart','dropDown','buyButton','smartCart','getParent','closest','replace','undefined','pow','round','toFixed','split','length','join','function','trim','prototype','capitalize','charAt','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','stringify','toString','url','type','jqXHR','done','success','fail','always','complete','clearQueueDelay','message','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','warn','[Simple\x20Cart]\x0a','info','add','elements','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','content','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','filter','.singular','show','hide','.plural','addClass','qd-emptyCart','removeClass','$this','alerta','cartTotalE','html','total','cartQttE','itemsTextE','find','cartQtt','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','QD_simpleCart','ajaxRequestbuyButtonAsynchronous','each','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply'];(function(_0x346f62,_0x5079bc){var _0x1783a8=function(_0x3dca5e){while(--_0x3dca5e){_0x346f62['push'](_0x346f62['shift']());}};_0x1783a8(++_0x5079bc);}(_0x974c,0xd4));var _0xc974=function(_0x1b2769,_0x3a8f71){_0x1b2769=_0x1b2769-0x0;var _0x3d45d1=_0x974c[_0x1b2769];return _0x3d45d1;};(function(_0x39410f){_0x39410f['fn'][_0xc974('0x0')]=_0x39410f['fn'][_0xc974('0x1')];}(jQuery));function qd_number_format(_0x1c0669,_0x4ef2b6,_0xafd055,_0x183aad){_0x1c0669=(_0x1c0669+'')[_0xc974('0x2')](/[^0-9+\-Ee.]/g,'');_0x1c0669=isFinite(+_0x1c0669)?+_0x1c0669:0x0;_0x4ef2b6=isFinite(+_0x4ef2b6)?Math['abs'](_0x4ef2b6):0x0;_0x183aad=_0xc974('0x3')===typeof _0x183aad?',':_0x183aad;_0xafd055=_0xc974('0x3')===typeof _0xafd055?'.':_0xafd055;var _0x1629ac='',_0x1629ac=function(_0x3babbb,_0x2df8ad){var _0x4ef2b6=Math[_0xc974('0x4')](0xa,_0x2df8ad);return''+(Math[_0xc974('0x5')](_0x3babbb*_0x4ef2b6)/_0x4ef2b6)[_0xc974('0x6')](_0x2df8ad);},_0x1629ac=(_0x4ef2b6?_0x1629ac(_0x1c0669,_0x4ef2b6):''+Math['round'](_0x1c0669))[_0xc974('0x7')]('.');0x3<_0x1629ac[0x0][_0xc974('0x8')]&&(_0x1629ac[0x0]=_0x1629ac[0x0][_0xc974('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x183aad));(_0x1629ac[0x1]||'')[_0xc974('0x8')]<_0x4ef2b6&&(_0x1629ac[0x1]=_0x1629ac[0x1]||'',_0x1629ac[0x1]+=Array(_0x4ef2b6-_0x1629ac[0x1][_0xc974('0x8')]+0x1)[_0xc974('0x9')]('0'));return _0x1629ac[_0xc974('0x9')](_0xafd055);};_0xc974('0xa')!==typeof String['prototype'][_0xc974('0xb')]&&(String[_0xc974('0xc')]['trim']=function(){return this['replace'](/^\s+|\s+$/g,'');});_0xc974('0xa')!=typeof String['prototype'][_0xc974('0xd')]&&(String[_0xc974('0xc')][_0xc974('0xd')]=function(){return this[_0xc974('0xe')](0x0)['toUpperCase']()+this[_0xc974('0xf')](0x1)[_0xc974('0x10')]();});(function(_0x59df03){if(_0xc974('0xa')!==typeof _0x59df03[_0xc974('0x11')]){var _0x1bc364={};_0x59df03[_0xc974('0x12')]=_0x1bc364;0x96>parseInt((_0x59df03['fn'][_0xc974('0x13')][_0xc974('0x2')](/[^0-9]+/g,'')+_0xc974('0x14'))[_0xc974('0xf')](0x0,0x3),0xa)&&console&&_0xc974('0xa')==typeof console[_0xc974('0x15')]&&console[_0xc974('0x15')]();_0x59df03[_0xc974('0x11')]=function(_0x4ae78c){try{var _0x28d2a7=_0x59df03[_0xc974('0x16')]({},{'url':'','type':_0xc974('0x17'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x4ae78c);var _0x53e4f5=_0xc974('0x18')===typeof _0x28d2a7[_0xc974('0x19')]?JSON[_0xc974('0x1a')](_0x28d2a7[_0xc974('0x19')]):_0x28d2a7[_0xc974('0x19')][_0xc974('0x1b')]();var _0xdf28bf=encodeURIComponent(_0x28d2a7[_0xc974('0x1c')]+'|'+_0x28d2a7[_0xc974('0x1d')]+'|'+_0x53e4f5);_0x1bc364[_0xdf28bf]=_0x1bc364[_0xdf28bf]||{};_0xc974('0x3')==typeof _0x1bc364[_0xdf28bf][_0xc974('0x1e')]?_0x1bc364[_0xdf28bf][_0xc974('0x1e')]=_0x59df03['ajax'](_0x28d2a7):(_0x1bc364[_0xdf28bf][_0xc974('0x1e')][_0xc974('0x1f')](_0x28d2a7[_0xc974('0x20')]),_0x1bc364[_0xdf28bf][_0xc974('0x1e')][_0xc974('0x21')](_0x28d2a7[_0xc974('0x15')]),_0x1bc364[_0xdf28bf][_0xc974('0x1e')][_0xc974('0x22')](_0x28d2a7[_0xc974('0x23')]));_0x1bc364[_0xdf28bf][_0xc974('0x1e')][_0xc974('0x22')](function(){isNaN(parseInt(_0x28d2a7[_0xc974('0x24')]))||setTimeout(function(){_0x1bc364[_0xdf28bf]['jqXHR']=void 0x0;},_0x28d2a7['clearQueueDelay']);});return _0x1bc364[_0xdf28bf]['jqXHR'];}catch(_0x4ae691){_0xc974('0x3')!==typeof console&&_0xc974('0xa')===typeof console[_0xc974('0x15')]&&console[_0xc974('0x15')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x4ae691[_0xc974('0x25')]);}};_0x59df03[_0xc974('0x11')][_0xc974('0x26')]=_0xc974('0x27');}}(jQuery));(function(_0x107eec){_0x107eec['fn'][_0xc974('0x0')]=_0x107eec['fn'][_0xc974('0x1')];}(jQuery));(function(){var _0x3977ff=jQuery;if(_0xc974('0xa')!==typeof _0x3977ff['fn'][_0xc974('0x28')]){_0x3977ff(function(){var _0xcaa7ff=vtexjs[_0xc974('0x29')][_0xc974('0x2a')];vtexjs[_0xc974('0x29')][_0xc974('0x2a')]=function(){return _0xcaa7ff[_0xc974('0x2b')]();};});try{window['QuatroDigital_simpleCart']=window['QuatroDigital_simpleCart']||{};window[_0xc974('0x2c')][_0xc974('0x2d')]=!0x1;_0x3977ff['fn'][_0xc974('0x28')]=function(_0x5319ef,_0x1d488b,_0x4ff837){var _0x30bbc0=function(_0x65a177,_0x3c925f){if(_0xc974('0x18')===typeof console){var _0x5dee43=_0xc974('0x18')===typeof _0x65a177;_0xc974('0x3')!==typeof _0x3c925f&&'alerta'===_0x3c925f[_0xc974('0x10')]()?_0x5dee43?console[_0xc974('0x2e')](_0xc974('0x2f'),_0x65a177[0x0],_0x65a177[0x1],_0x65a177[0x2],_0x65a177[0x3],_0x65a177[0x4],_0x65a177[0x5],_0x65a177[0x6],_0x65a177[0x7]):console[_0xc974('0x2e')](_0xc974('0x2f')+_0x65a177):_0xc974('0x3')!==typeof _0x3c925f&&_0xc974('0x30')===_0x3c925f[_0xc974('0x10')]()?_0x5dee43?console[_0xc974('0x30')](_0xc974('0x2f'),_0x65a177[0x0],_0x65a177[0x1],_0x65a177[0x2],_0x65a177[0x3],_0x65a177[0x4],_0x65a177[0x5],_0x65a177[0x6],_0x65a177[0x7]):console[_0xc974('0x30')](_0xc974('0x2f')+_0x65a177):_0x5dee43?console[_0xc974('0x15')](_0xc974('0x2f'),_0x65a177[0x0],_0x65a177[0x1],_0x65a177[0x2],_0x65a177[0x3],_0x65a177[0x4],_0x65a177[0x5],_0x65a177[0x6],_0x65a177[0x7]):console[_0xc974('0x15')](_0xc974('0x2f')+_0x65a177);}};var _0x3546d6=_0x3977ff(this);_0xc974('0x18')===typeof _0x5319ef?_0x1d488b=_0x5319ef:(_0x5319ef=_0x5319ef||!0x1,_0x3546d6=_0x3546d6[_0xc974('0x31')](_0x3977ff['QD_simpleCart'][_0xc974('0x32')]));if(!_0x3546d6[_0xc974('0x8')])return _0x3546d6;_0x3977ff['QD_simpleCart'][_0xc974('0x32')]=_0x3977ff['QD_simpleCart'][_0xc974('0x32')][_0xc974('0x31')](_0x3546d6);_0x4ff837=_0xc974('0x3')===typeof _0x4ff837?!0x1:_0x4ff837;var _0x1ebe8d={'cartQtt':'.qd_cart_qtt','cartTotal':_0xc974('0x33'),'itemsText':_0xc974('0x34'),'currencySymbol':(_0x3977ff(_0xc974('0x35'))[_0xc974('0x36')](_0xc974('0x37'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x3bc392=_0x3977ff[_0xc974('0x16')]({},_0x1ebe8d,_0x1d488b);var _0x4bd9ef=_0x3977ff('');_0x3546d6['each'](function(){var _0x18c5e1=_0x3977ff(this);_0x18c5e1['data'](_0xc974('0x38'))||_0x18c5e1[_0xc974('0x19')](_0xc974('0x38'),_0x3bc392);});var _0xfe574c=function(_0x9f0797){window['_QuatroDigital_CartData']=window[_0xc974('0x39')]||{};for(var _0x5319ef=0x0,_0x304462=0x0,_0x471fbb=0x0;_0x471fbb<_0x9f0797[_0xc974('0x3a')][_0xc974('0x8')];_0x471fbb++)_0xc974('0x3b')==_0x9f0797[_0xc974('0x3a')][_0x471fbb]['id']&&(_0x304462+=_0x9f0797['totalizers'][_0x471fbb][_0xc974('0x3c')]),_0x5319ef+=_0x9f0797[_0xc974('0x3a')][_0x471fbb]['value'];window[_0xc974('0x39')]['total']=_0x3bc392[_0xc974('0x3d')]+qd_number_format(_0x5319ef/0x64,0x2,',','.');window[_0xc974('0x39')][_0xc974('0x3e')]=_0x3bc392['currencySymbol']+qd_number_format(_0x304462/0x64,0x2,',','.');window[_0xc974('0x39')][_0xc974('0x3f')]=_0x3bc392[_0xc974('0x3d')]+qd_number_format((_0x5319ef+_0x304462)/0x64,0x2,',','.');window[_0xc974('0x39')][_0xc974('0x40')]=0x0;if(_0x3bc392[_0xc974('0x41')])for(_0x471fbb=0x0;_0x471fbb<_0x9f0797[_0xc974('0x42')][_0xc974('0x8')];_0x471fbb++)window[_0xc974('0x39')]['qtt']+=_0x9f0797['items'][_0x471fbb][_0xc974('0x43')];else window[_0xc974('0x39')][_0xc974('0x40')]=_0x9f0797[_0xc974('0x42')][_0xc974('0x8')]||0x0;try{window['_QuatroDigital_CartData']['callback']&&window[_0xc974('0x39')]['callback']['fire']&&window[_0xc974('0x39')][_0xc974('0x44')][_0xc974('0x45')]();}catch(_0x458138){_0x30bbc0(_0xc974('0x46'));}_0x1e1948(_0x4bd9ef);};var _0x2a5306=function(_0x39df65,_0x36cbd4){0x1===_0x39df65?_0x36cbd4['hide']()[_0xc974('0x47')](_0xc974('0x48'))[_0xc974('0x49')]():_0x36cbd4[_0xc974('0x4a')]()[_0xc974('0x47')](_0xc974('0x4b'))[_0xc974('0x49')]();};var _0x593f10=function(_0x52082){0x1>_0x52082?_0x3546d6[_0xc974('0x4c')](_0xc974('0x4d')):_0x3546d6[_0xc974('0x4e')]('qd-emptyCart');};var _0x5aa6d1=function(_0x4fc498,_0x594647){var _0x2e4cd3=parseInt(window['_QuatroDigital_CartData']['qtt'],0xa);_0x594647[_0xc974('0x4f')]['show']();isNaN(_0x2e4cd3)&&(_0x30bbc0('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0xc974('0x50')),_0x2e4cd3=0x0);_0x594647[_0xc974('0x51')][_0xc974('0x52')](window[_0xc974('0x39')][_0xc974('0x53')]);_0x594647[_0xc974('0x54')][_0xc974('0x52')](_0x2e4cd3);_0x2a5306(_0x2e4cd3,_0x594647[_0xc974('0x55')]);_0x593f10(_0x2e4cd3);};var _0x1e1948=function(_0x11a460){_0x3546d6['each'](function(){var _0x5f581a={};var _0x523605=_0x3977ff(this);_0x5319ef&&_0x523605[_0xc974('0x19')](_0xc974('0x38'))&&_0x3977ff['extend'](_0x3bc392,_0x523605[_0xc974('0x19')]('qd_simpleCartOpts'));_0x5f581a[_0xc974('0x4f')]=_0x523605;_0x5f581a[_0xc974('0x54')]=_0x523605[_0xc974('0x56')](_0x3bc392[_0xc974('0x57')])||_0x4bd9ef;_0x5f581a[_0xc974('0x51')]=_0x523605[_0xc974('0x56')](_0x3bc392['cartTotal'])||_0x4bd9ef;_0x5f581a[_0xc974('0x55')]=_0x523605[_0xc974('0x56')](_0x3bc392[_0xc974('0x58')])||_0x4bd9ef;_0x5f581a[_0xc974('0x59')]=_0x523605[_0xc974('0x56')](_0x3bc392[_0xc974('0x5a')])||_0x4bd9ef;_0x5aa6d1(_0x11a460,_0x5f581a);_0x523605[_0xc974('0x4c')](_0xc974('0x5b'));});};(function(){if(_0x3bc392[_0xc974('0x5c')]){window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};if('undefined'!==typeof window[_0xc974('0x5d')][_0xc974('0x2a')]&&(_0x4ff837||!_0x5319ef))return _0xfe574c(window[_0xc974('0x5d')]['getOrderForm']);if(_0xc974('0x18')!==typeof window['vtexjs']||'undefined'===typeof window[_0xc974('0x5e')][_0xc974('0x29')])if('object'===typeof vtex&&_0xc974('0x18')===typeof vtex[_0xc974('0x29')]&&'undefined'!==typeof vtex[_0xc974('0x29')]['SDK'])new vtex[(_0xc974('0x29'))]['SDK']();else return _0x30bbc0(_0xc974('0x5f'));_0x3977ff['QD_checkoutQueue']([_0xc974('0x42'),'totalizers',_0xc974('0x60')],{'done':function(_0x25fadb){_0xfe574c(_0x25fadb);window['_QuatroDigital_DropDown'][_0xc974('0x2a')]=_0x25fadb;},'fail':function(_0xef7ff2){_0x30bbc0(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0xef7ff2]);}});}else alert(_0xc974('0x61'));}());_0x3bc392[_0xc974('0x44')]();_0x3977ff(window)[_0xc974('0x62')](_0xc974('0x63'));return _0x3546d6;};_0x3977ff[_0xc974('0x64')]={'elements':_0x3977ff('')};_0x3977ff(function(){var _0x443659;_0xc974('0xa')===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x443659=window[_0xc974('0x65')],window['ajaxRequestbuyButtonAsynchronous']=function(_0xb65c09,_0x5e5bc9,_0x448ced,_0x2901e4,_0x480c22){_0x443659['call'](this,_0xb65c09,_0x5e5bc9,_0x448ced,_0x2901e4,function(){_0xc974('0xa')===typeof _0x480c22&&_0x480c22();_0x3977ff['QD_simpleCart']['elements'][_0xc974('0x66')](function(){var _0xda3f67=_0x3977ff(this);_0xda3f67[_0xc974('0x28')](_0xda3f67[_0xc974('0x19')]('qd_simpleCartOpts'));});});});});var _0x5cd04e=window[_0xc974('0x67')]||void 0x0;window[_0xc974('0x67')]=function(_0x3e2104){_0x3977ff['fn']['simpleCart'](!0x0);_0xc974('0xa')===typeof _0x5cd04e?_0x5cd04e[_0xc974('0x2b')](this,_0x3e2104):alert(_0x3e2104);};_0x3977ff(function(){var _0x1cbbdd=_0x3977ff(_0xc974('0x68'));_0x1cbbdd[_0xc974('0x8')]&&_0x1cbbdd['simpleCart']();});_0x3977ff(function(){_0x3977ff(window)[_0xc974('0x69')](_0xc974('0x6a'),function(){_0x3977ff['fn'][_0xc974('0x28')](!0x0);});});}catch(_0x2098a8){_0xc974('0x3')!==typeof console&&_0xc974('0xa')===typeof console[_0xc974('0x15')]&&console[_0xc974('0x15')](_0xc974('0x6b'),_0x2098a8);}}}());(function(){var _0x59ea79=function(_0x167f50,_0x270feb){if(_0xc974('0x18')===typeof console){var _0x108b38=_0xc974('0x18')===typeof _0x167f50;_0xc974('0x3')!==typeof _0x270feb&&'alerta'===_0x270feb['toLowerCase']()?_0x108b38?console[_0xc974('0x2e')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x167f50[0x0],_0x167f50[0x1],_0x167f50[0x2],_0x167f50[0x3],_0x167f50[0x4],_0x167f50[0x5],_0x167f50[0x6],_0x167f50[0x7]):console[_0xc974('0x2e')](_0xc974('0x6c')+_0x167f50):'undefined'!==typeof _0x270feb&&'info'===_0x270feb[_0xc974('0x10')]()?_0x108b38?console['info'](_0xc974('0x6c'),_0x167f50[0x0],_0x167f50[0x1],_0x167f50[0x2],_0x167f50[0x3],_0x167f50[0x4],_0x167f50[0x5],_0x167f50[0x6],_0x167f50[0x7]):console[_0xc974('0x30')](_0xc974('0x6c')+_0x167f50):_0x108b38?console[_0xc974('0x15')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x167f50[0x0],_0x167f50[0x1],_0x167f50[0x2],_0x167f50[0x3],_0x167f50[0x4],_0x167f50[0x5],_0x167f50[0x6],_0x167f50[0x7]):console[_0xc974('0x15')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x167f50);}},_0x97188f=null,_0x58734c={},_0x48aff5={},_0x213af9={};$['QD_checkoutQueue']=function(_0x59ecb9,_0x5c2c45){if(null===_0x97188f)if(_0xc974('0x18')===typeof window[_0xc974('0x5e')]&&_0xc974('0x3')!==typeof window['vtexjs'][_0xc974('0x29')])_0x97188f=window['vtexjs']['checkout'];else return _0x59ea79('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x3cfd82=$[_0xc974('0x16')]({'done':function(){},'fail':function(){}},_0x5c2c45),_0x3c5157=_0x59ecb9[_0xc974('0x9')](';'),_0x2696f8=function(){_0x58734c[_0x3c5157][_0xc974('0x31')](_0x3cfd82[_0xc974('0x1f')]);_0x48aff5[_0x3c5157][_0xc974('0x31')](_0x3cfd82[_0xc974('0x21')]);};_0x213af9[_0x3c5157]?_0x2696f8():(_0x58734c[_0x3c5157]=$[_0xc974('0x6d')](),_0x48aff5[_0x3c5157]=$[_0xc974('0x6d')](),_0x2696f8(),_0x213af9[_0x3c5157]=!0x0,_0x97188f[_0xc974('0x2a')](_0x59ecb9)[_0xc974('0x1f')](function(_0x1abe81){_0x213af9[_0x3c5157]=!0x1;_0x58734c[_0x3c5157][_0xc974('0x45')](_0x1abe81);})['fail'](function(_0x27211b){_0x213af9[_0x3c5157]=!0x1;_0x48aff5[_0x3c5157][_0xc974('0x45')](_0x27211b);}));};}());(function(_0x38fbde){try{var _0x7544e=jQuery,_0x712a0e,_0x22bff8=_0x7544e({}),_0x426eb7=function(_0x3b7e08,_0x25ba4a){if('object'===typeof console&&_0xc974('0x3')!==typeof console['error']&&_0xc974('0x3')!==typeof console[_0xc974('0x30')]&&'undefined'!==typeof console['warn']){var _0x31836e;_0xc974('0x18')===typeof _0x3b7e08?(_0x3b7e08['unshift'](_0xc974('0x6e')),_0x31836e=_0x3b7e08):_0x31836e=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x3b7e08];if(_0xc974('0x3')===typeof _0x25ba4a||_0xc974('0x50')!==_0x25ba4a[_0xc974('0x10')]()&&_0xc974('0x6f')!==_0x25ba4a['toLowerCase']())if(_0xc974('0x3')!==typeof _0x25ba4a&&_0xc974('0x30')===_0x25ba4a[_0xc974('0x10')]())try{console['info'][_0xc974('0x70')](console,_0x31836e);}catch(_0x32a415){try{console['info'](_0x31836e[_0xc974('0x9')]('\x0a'));}catch(_0x14fcf7){}}else try{console[_0xc974('0x15')][_0xc974('0x70')](console,_0x31836e);}catch(_0x433940){try{console[_0xc974('0x15')](_0x31836e[_0xc974('0x9')]('\x0a'));}catch(_0x40fe36){}}else try{console[_0xc974('0x2e')][_0xc974('0x70')](console,_0x31836e);}catch(_0x17836b){try{console[_0xc974('0x2e')](_0x31836e['join']('\x0a'));}catch(_0x6e1d54){}}}},_0x5689d5={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0xc974('0x71'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x3cfc3b,_0x3406f0,_0x38bf06){_0x7544e(_0xc974('0x72'))['is']('.productQuickView')&&(_0xc974('0x20')===_0x3406f0?alert(_0xc974('0x73')):(alert(_0xc974('0x74')),(_0xc974('0x18')===typeof parent?parent:document)['location'][_0xc974('0x75')]=_0x38bf06));},'isProductPage':function(){return _0x7544e(_0xc974('0x72'))['is']('#produto,\x20.produto');},'execDefaultAction':function(_0x2494f7){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x7544e['QD_buyButton']=function(_0x27ed8e,_0x2223ee){function _0x16f927(_0x1d7e86){_0x712a0e[_0xc974('0x76')]?_0x1d7e86[_0xc974('0x19')](_0xc974('0x77'))||(_0x1d7e86[_0xc974('0x19')]('qd-bb-click-active',0x1),_0x1d7e86['on'](_0xc974('0x78'),function(_0x267e36){if(!_0x712a0e[_0xc974('0x79')]())return!0x0;if(!0x0!==_0x37a917[_0xc974('0x7a')][_0xc974('0x2b')](this))return _0x267e36[_0xc974('0x7b')](),!0x1;})):alert(_0xc974('0x7c'));}function _0x4e40ca(_0x4b5e75){_0x4b5e75=_0x4b5e75||_0x7544e(_0x712a0e['buyButton']);_0x4b5e75[_0xc974('0x66')](function(){var _0x4b5e75=_0x7544e(this);_0x4b5e75['is']('.qd-sbb-on')||(_0x4b5e75[_0xc974('0x4c')]('qd-sbb-on'),_0x4b5e75['is'](_0xc974('0x7d'))&&!_0x4b5e75['is'](_0xc974('0x7e'))||_0x4b5e75['data']('qd-bb-active')||(_0x4b5e75[_0xc974('0x19')]('qd-bb-active',0x1),_0x4b5e75[_0xc974('0x7f')](_0xc974('0x80'))[_0xc974('0x8')]||_0x4b5e75[_0xc974('0x81')](_0xc974('0x82')),_0x4b5e75['is']('.buy-in-page-button')&&_0x712a0e[_0xc974('0x83')]()&&_0x58d272[_0xc974('0x2b')](_0x4b5e75),_0x16f927(_0x4b5e75)));});_0x712a0e[_0xc974('0x83')]()&&!_0x4b5e75['length']&&_0x426eb7(_0xc974('0x84')+_0x4b5e75[_0xc974('0x85')]+'\x27.','info');}var _0x446075=_0x7544e(_0x27ed8e);var _0x37a917=this;window[_0xc974('0x86')]=window[_0xc974('0x86')]||{};window[_0xc974('0x39')]=window[_0xc974('0x39')]||{};_0x37a917['prodAdd']=function(_0x4b753d,_0x4b2f38){_0x446075[_0xc974('0x4c')](_0xc974('0x87'));_0x7544e(_0xc974('0x72'))[_0xc974('0x4c')](_0xc974('0x88'));var _0x38bf40=_0x7544e(_0x712a0e['buyButton'])[_0xc974('0x47')](_0xc974('0x89')+(_0x4b753d[_0xc974('0x36')]('href')||_0xc974('0x8a'))+'\x27]')[_0xc974('0x31')](_0x4b753d);_0x38bf40[_0xc974('0x4c')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x446075['removeClass'](_0xc974('0x8b'));_0x38bf40[_0xc974('0x4e')](_0xc974('0x8c'));},_0x712a0e[_0xc974('0x8d')]);window[_0xc974('0x86')][_0xc974('0x2a')]=void 0x0;if(_0xc974('0x3')!==typeof _0x2223ee&&_0xc974('0xa')===typeof _0x2223ee[_0xc974('0x8e')])return _0x712a0e[_0xc974('0x76')]||(_0x426eb7('função\x20descontinuada'),_0x2223ee[_0xc974('0x8e')]()),window['_QuatroDigital_DropDown'][_0xc974('0x2a')]=void 0x0,_0x2223ee[_0xc974('0x8e')](function(_0x43541e){window[_0xc974('0x86')][_0xc974('0x2a')]=_0x43541e;_0x7544e['fn'][_0xc974('0x28')](!0x0,void 0x0,!0x0);},{'lastSku':_0x4b2f38});window[_0xc974('0x86')][_0xc974('0x8f')]=!0x0;_0x7544e['fn'][_0xc974('0x28')](!0x0);};(function(){if(_0x712a0e['isSmartCheckout']&&_0x712a0e[_0xc974('0x90')]){var _0x471ae3=_0x7544e(_0xc974('0x7d'));_0x471ae3[_0xc974('0x8')]&&_0x4e40ca(_0x471ae3);}}());var _0x58d272=function(){var _0x3d215f=_0x7544e(this);'undefined'!==typeof _0x3d215f[_0xc974('0x19')]('buyButton')?(_0x3d215f[_0xc974('0x91')](_0xc974('0x92')),_0x16f927(_0x3d215f)):(_0x3d215f[_0xc974('0x69')](_0xc974('0x93'),function(_0x378392){_0x3d215f[_0xc974('0x91')](_0xc974('0x92'));_0x16f927(_0x3d215f);_0x7544e(this)[_0xc974('0x91')](_0x378392);}),_0x7544e(window)[_0xc974('0x94')](function(){_0x3d215f[_0xc974('0x91')]('click');_0x16f927(_0x3d215f);_0x3d215f[_0xc974('0x91')](_0xc974('0x93'));}));};_0x37a917[_0xc974('0x7a')]=function(){var _0x3b3347=_0x7544e(this),_0x27ed8e=_0x3b3347[_0xc974('0x36')](_0xc974('0x75'))||'';if(-0x1<_0x27ed8e[_0xc974('0x95')](_0x712a0e[_0xc974('0x96')]))return!0x0;_0x27ed8e=_0x27ed8e['replace'](/redirect\=(false|true)/gi,'')[_0xc974('0x2')]('?',_0xc974('0x97'))[_0xc974('0x2')](/\&\&/gi,'&');if(_0x712a0e[_0xc974('0x98')](_0x3b3347))return _0x3b3347[_0xc974('0x36')]('href',_0x27ed8e[_0xc974('0x2')](_0xc974('0x99'),_0xc974('0x9a'))),!0x0;_0x27ed8e=_0x27ed8e[_0xc974('0x2')](/http.?:/i,'');_0x22bff8[_0xc974('0x9b')](function(_0x29fbdf){if(!_0x712a0e[_0xc974('0x9c')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xc974('0x9d')](_0x27ed8e))return _0x29fbdf();var _0x3e32ba=function(_0x889679,_0x1ec01f){var _0x4e40ca=_0x27ed8e[_0xc974('0x9e')](/sku\=([0-9]+)/gi),_0x4d8bc4=[];if(_0xc974('0x18')===typeof _0x4e40ca&&null!==_0x4e40ca)for(var _0x2bde10=_0x4e40ca[_0xc974('0x8')]-0x1;0x0<=_0x2bde10;_0x2bde10--){var _0x908a26=parseInt(_0x4e40ca[_0x2bde10]['replace'](/sku\=/gi,''));isNaN(_0x908a26)||_0x4d8bc4['push'](_0x908a26);}_0x712a0e[_0xc974('0x9f')][_0xc974('0x2b')](this,_0x889679,_0x1ec01f,_0x27ed8e);_0x37a917[_0xc974('0xa0')]['call'](this,_0x889679,_0x1ec01f,_0x27ed8e,_0x4d8bc4);_0x37a917[_0xc974('0xa1')](_0x3b3347,_0x27ed8e[_0xc974('0x7')]('ku=')[_0xc974('0xa2')]()[_0xc974('0x7')]('&')[_0xc974('0xa3')]());'function'===typeof _0x712a0e[_0xc974('0xa4')]&&_0x712a0e[_0xc974('0xa4')][_0xc974('0x2b')](this);_0x7544e(window)[_0xc974('0x62')]('productAddedToCart');_0x7544e(window)[_0xc974('0x62')]('cartProductAdded.vtex');};_0x712a0e[_0xc974('0xa5')]?(_0x3e32ba(null,_0xc974('0x20')),_0x29fbdf()):_0x7544e[_0xc974('0xa6')]({'url':_0x27ed8e,'complete':_0x3e32ba})[_0xc974('0x22')](function(){_0x29fbdf();});});};_0x37a917[_0xc974('0xa0')]=function(_0x2f3886,_0x2f948a,_0x1620bd,_0x72d2f6){try{_0xc974('0x20')===_0x2f948a&&'object'===typeof window[_0xc974('0xa7')]&&_0xc974('0xa')===typeof window[_0xc974('0xa7')][_0xc974('0xa8')]&&window['parent'][_0xc974('0xa8')](_0x2f3886,_0x2f948a,_0x1620bd,_0x72d2f6);}catch(_0x549a79){_0x426eb7(_0xc974('0xa9'));}};_0x4e40ca();_0xc974('0xa')===typeof _0x712a0e['callback']?_0x712a0e[_0xc974('0x44')][_0xc974('0x2b')](this):_0x426eb7(_0xc974('0xaa'));};var _0x3e2cc0=_0x7544e['Callbacks']();_0x7544e['fn'][_0xc974('0xab')]=function(_0x5727b2,_0x55b68e){var _0x38fbde=_0x7544e(this);_0xc974('0x3')!==typeof _0x55b68e||'object'!==typeof _0x5727b2||_0x5727b2 instanceof _0x7544e||(_0x55b68e=_0x5727b2,_0x5727b2=void 0x0);_0x712a0e=_0x7544e[_0xc974('0x16')]({},_0x5689d5,_0x55b68e);var _0x1e4746;_0x3e2cc0[_0xc974('0x31')](function(){_0x38fbde[_0xc974('0x7f')](_0xc974('0xac'))[_0xc974('0x8')]||_0x38fbde[_0xc974('0xad')](_0xc974('0xae'));_0x1e4746=new _0x7544e[(_0xc974('0xab'))](_0x38fbde,_0x5727b2);});_0x3e2cc0[_0xc974('0x45')]();_0x7544e(window)['on'](_0xc974('0xaf'),function(_0x4cb3c1,_0x51f99a,_0x171b08){_0x1e4746['prodAdd'](_0x51f99a,_0x171b08);});return _0x7544e['extend'](_0x38fbde,_0x1e4746);};var _0x13bfde=0x0;_0x7544e(document)['ajaxSend'](function(_0x5290e4,_0x34370e,_0x347c4c){-0x1<_0x347c4c['url']['toLowerCase']()['indexOf'](_0xc974('0xb0'))&&(_0x13bfde=(_0x347c4c[_0xc974('0x1c')][_0xc974('0x9e')](/sku\=([0-9]+)/i)||[''])[_0xc974('0xa2')]());});_0x7544e(window)[_0xc974('0x69')](_0xc974('0xb1'),function(){_0x7544e(window)[_0xc974('0x62')](_0xc974('0xaf'),[new _0x7544e(),_0x13bfde]);});_0x7544e(document)[_0xc974('0xb2')](function(){_0x3e2cc0[_0xc974('0x45')]();});}catch(_0x244411){_0xc974('0x3')!==typeof console&&_0xc974('0xa')===typeof console[_0xc974('0x15')]&&console['error']('Oooops!\x20',_0x244411);}}(this));function qd_number_format(_0x46fb3a,_0x11303a,_0x2d966d,_0x2a8227){_0x46fb3a=(_0x46fb3a+'')[_0xc974('0x2')](/[^0-9+\-Ee.]/g,'');_0x46fb3a=isFinite(+_0x46fb3a)?+_0x46fb3a:0x0;_0x11303a=isFinite(+_0x11303a)?Math[_0xc974('0xb3')](_0x11303a):0x0;_0x2a8227=_0xc974('0x3')===typeof _0x2a8227?',':_0x2a8227;_0x2d966d='undefined'===typeof _0x2d966d?'.':_0x2d966d;var _0x32e749='',_0x32e749=function(_0x20706e,_0x1ea948){var _0x2221f3=Math['pow'](0xa,_0x1ea948);return''+(Math[_0xc974('0x5')](_0x20706e*_0x2221f3)/_0x2221f3)['toFixed'](_0x1ea948);},_0x32e749=(_0x11303a?_0x32e749(_0x46fb3a,_0x11303a):''+Math[_0xc974('0x5')](_0x46fb3a))[_0xc974('0x7')]('.');0x3<_0x32e749[0x0][_0xc974('0x8')]&&(_0x32e749[0x0]=_0x32e749[0x0][_0xc974('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2a8227));(_0x32e749[0x1]||'')[_0xc974('0x8')]<_0x11303a&&(_0x32e749[0x1]=_0x32e749[0x1]||'',_0x32e749[0x1]+=Array(_0x11303a-_0x32e749[0x1][_0xc974('0x8')]+0x1)[_0xc974('0x9')]('0'));return _0x32e749['join'](_0x2d966d);}(function(){try{window['_QuatroDigital_CartData']=window[_0xc974('0x39')]||{},window[_0xc974('0x39')]['callback']=window[_0xc974('0x39')][_0xc974('0x44')]||$['Callbacks']();}catch(_0x3ff960){_0xc974('0x3')!==typeof console&&_0xc974('0xa')===typeof console[_0xc974('0x15')]&&console[_0xc974('0x15')](_0xc974('0x6b'),_0x3ff960['message']);}}());(function(_0x537432){try{var _0x488ee1=jQuery,_0x201893=function(_0x420343,_0x14fc05){if(_0xc974('0x18')===typeof console&&'undefined'!==typeof console[_0xc974('0x15')]&&'undefined'!==typeof console['info']&&_0xc974('0x3')!==typeof console[_0xc974('0x2e')]){var _0x55f9a9;'object'===typeof _0x420343?(_0x420343[_0xc974('0xb4')](_0xc974('0xb5')),_0x55f9a9=_0x420343):_0x55f9a9=[_0xc974('0xb5')+_0x420343];if(_0xc974('0x3')===typeof _0x14fc05||_0xc974('0x50')!==_0x14fc05[_0xc974('0x10')]()&&_0xc974('0x6f')!==_0x14fc05[_0xc974('0x10')]())if('undefined'!==typeof _0x14fc05&&_0xc974('0x30')===_0x14fc05['toLowerCase']())try{console[_0xc974('0x30')][_0xc974('0x70')](console,_0x55f9a9);}catch(_0x4178f2){try{console[_0xc974('0x30')](_0x55f9a9[_0xc974('0x9')]('\x0a'));}catch(_0x1eb99a){}}else try{console[_0xc974('0x15')]['apply'](console,_0x55f9a9);}catch(_0x3a0339){try{console[_0xc974('0x15')](_0x55f9a9['join']('\x0a'));}catch(_0xb672ce){}}else try{console[_0xc974('0x2e')]['apply'](console,_0x55f9a9);}catch(_0x2b93df){try{console[_0xc974('0x2e')](_0x55f9a9['join']('\x0a'));}catch(_0xd9038){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window['_QuatroDigital_DropDown'][_0xc974('0x8f')]=!0x0;_0x488ee1[_0xc974('0xb6')]=function(){};_0x488ee1['fn'][_0xc974('0xb6')]=function(){return{'fn':new _0x488ee1()};};var _0x24fdaa=function(_0x1a4c42){var _0x232cce={'n':'sevpnanegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x582025){var _0x3c55f4=function(_0x21d5ec){return _0x21d5ec;};var _0x1251ce=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x582025=_0x582025['d'+_0x1251ce[0x10]+'c'+_0x1251ce[0x11]+'m'+_0x3c55f4(_0x1251ce[0x1])+'n'+_0x1251ce[0xd]]['l'+_0x1251ce[0x12]+'c'+_0x1251ce[0x0]+'ti'+_0x3c55f4('o')+'n'];var _0x2ba7c2=function(_0x20cfd1){return escape(encodeURIComponent(_0x20cfd1[_0xc974('0x2')](/\./g,'¨')[_0xc974('0x2')](/[a-zA-Z]/g,function(_0x4f6cc5){return String[_0xc974('0xb7')](('Z'>=_0x4f6cc5?0x5a:0x7a)>=(_0x4f6cc5=_0x4f6cc5[_0xc974('0xb8')](0x0)+0xd)?_0x4f6cc5:_0x4f6cc5-0x1a);})));};var _0x537432=_0x2ba7c2(_0x582025[[_0x1251ce[0x9],_0x3c55f4('o'),_0x1251ce[0xc],_0x1251ce[_0x3c55f4(0xd)]]['join']('')]);_0x2ba7c2=_0x2ba7c2((window[['js',_0x3c55f4('no'),'m',_0x1251ce[0x1],_0x1251ce[0x4][_0xc974('0xb9')](),'ite']['join']('')]||_0xc974('0x8a'))+['.v',_0x1251ce[0xd],'e',_0x3c55f4('x'),'co',_0x3c55f4('mm'),_0xc974('0xba'),_0x1251ce[0x1],'.c',_0x3c55f4('o'),'m.',_0x1251ce[0x13],'r'][_0xc974('0x9')](''));for(var _0x45d501 in _0x232cce){if(_0x2ba7c2===_0x45d501+_0x232cce[_0x45d501]||_0x537432===_0x45d501+_0x232cce[_0x45d501]){var _0x5afdf0='tr'+_0x1251ce[0x11]+'e';break;}_0x5afdf0='f'+_0x1251ce[0x0]+'ls'+_0x3c55f4(_0x1251ce[0x1])+'';}_0x3c55f4=!0x1;-0x1<_0x582025[[_0x1251ce[0xc],'e',_0x1251ce[0x0],'rc',_0x1251ce[0x9]]['join']('')][_0xc974('0x95')](_0xc974('0xbb'))&&(_0x3c55f4=!0x0);return[_0x5afdf0,_0x3c55f4];}(_0x1a4c42);}(window);if(!eval(_0x24fdaa[0x0]))return _0x24fdaa[0x1]?_0x201893('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x488ee1[_0xc974('0xb6')]=function(_0x4a3452,_0x70eb6e){var _0x3b4616=_0x488ee1(_0x4a3452);if(!_0x3b4616[_0xc974('0x8')])return _0x3b4616;var _0x580d2b=_0x488ee1[_0xc974('0x16')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0xc974('0xbc'),'cartTotal':_0xc974('0xbd'),'emptyCart':_0xc974('0xbe'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0xc974('0xbf')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x2f5fef){return _0x2f5fef[_0xc974('0xc0')]||_0x2f5fef[_0xc974('0xc1')];},'callback':function(){},'callbackProductsList':function(){}},_0x70eb6e);_0x488ee1('');var _0x5f3ee7=this;if(_0x580d2b[_0xc974('0x5c')]){var _0x1d54a2=!0x1;'undefined'===typeof window[_0xc974('0x5e')]&&(_0x201893('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x488ee1['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0xc974('0xc2'),'error':function(){_0x201893(_0xc974('0xc3'));_0x1d54a2=!0x0;}}));if(_0x1d54a2)return _0x201893(_0xc974('0xc4'));}if('object'===typeof window[_0xc974('0x5e')]&&_0xc974('0x3')!==typeof window[_0xc974('0x5e')][_0xc974('0x29')])var _0x440743=window[_0xc974('0x5e')][_0xc974('0x29')];else if('object'===typeof vtex&&_0xc974('0x18')===typeof vtex[_0xc974('0x29')]&&'undefined'!==typeof vtex[_0xc974('0x29')][_0xc974('0xc5')])_0x440743=new vtex[(_0xc974('0x29'))][(_0xc974('0xc5'))]();else return _0x201893(_0xc974('0x5f'));_0x5f3ee7[_0xc974('0xc6')]=_0xc974('0xc7');var _0x16009e=function(_0x431253){_0x488ee1(this)[_0xc974('0x81')](_0x431253);_0x431253[_0xc974('0x56')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xc974('0x31')](_0x488ee1(_0xc974('0xc8')))['on'](_0xc974('0xc9'),function(){_0x3b4616[_0xc974('0x4e')]('qd-bb-lightBoxProdAdd');_0x488ee1(document['body'])[_0xc974('0x4e')](_0xc974('0x88'));});_0x488ee1(document)[_0xc974('0xca')]('keyup.qd_ddc_closeFn')['on'](_0xc974('0xcb'),function(_0x1624db){0x1b==_0x1624db[_0xc974('0xcc')]&&(_0x3b4616[_0xc974('0x4e')](_0xc974('0xcd')),_0x488ee1(document[_0xc974('0x72')])[_0xc974('0x4e')](_0xc974('0x88')));});var _0x51a21b=_0x431253[_0xc974('0x56')](_0xc974('0xce'));_0x431253['find'](_0xc974('0xcf'))['on'](_0xc974('0xd0'),function(){_0x5f3ee7['scrollCart']('-',void 0x0,void 0x0,_0x51a21b);return!0x1;});_0x431253[_0xc974('0x56')](_0xc974('0xd1'))['on'](_0xc974('0xd2'),function(){_0x5f3ee7['scrollCart'](void 0x0,void 0x0,void 0x0,_0x51a21b);return!0x1;});_0x431253['find'](_0xc974('0xd3'))['val']('')['on'](_0xc974('0xd4'),function(){_0x5f3ee7['shippingCalculate'](_0x488ee1(this));});if(_0x580d2b[_0xc974('0xd5')]){var _0x70eb6e=0x0;_0x488ee1(this)['on'](_0xc974('0xd6'),function(){var _0x431253=function(){window['_QuatroDigital_DropDown'][_0xc974('0x8f')]&&(_0x5f3ee7['getCartInfoByUrl'](),window[_0xc974('0x5d')]['allowUpdate']=!0x1,_0x488ee1['fn'][_0xc974('0x28')](!0x0),_0x5f3ee7['cartIsEmpty']());};_0x70eb6e=setInterval(function(){_0x431253();},0x258);_0x431253();});_0x488ee1(this)['on'](_0xc974('0xd7'),function(){clearInterval(_0x70eb6e);});}};var _0x25ee67=function(_0x1d0102){_0x1d0102=_0x488ee1(_0x1d0102);_0x580d2b[_0xc974('0xd8')]['cartTotal']=_0x580d2b[_0xc974('0xd8')]['cartTotal'][_0xc974('0x2')]('#value',_0xc974('0xd9'));_0x580d2b[_0xc974('0xd8')]['cartTotal']=_0x580d2b[_0xc974('0xd8')][_0xc974('0xda')][_0xc974('0x2')](_0xc974('0xdb'),_0xc974('0xdc'));_0x580d2b[_0xc974('0xd8')]['cartTotal']=_0x580d2b[_0xc974('0xd8')][_0xc974('0xda')][_0xc974('0x2')](_0xc974('0xdd'),_0xc974('0xde'));_0x580d2b[_0xc974('0xd8')][_0xc974('0xda')]=_0x580d2b[_0xc974('0xd8')][_0xc974('0xda')][_0xc974('0x2')](_0xc974('0xdf'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x1d0102[_0xc974('0x56')](_0xc974('0xe0'))[_0xc974('0x52')](_0x580d2b[_0xc974('0xd8')][_0xc974('0xe1')]);_0x1d0102['find'](_0xc974('0xe2'))[_0xc974('0x52')](_0x580d2b[_0xc974('0xd8')][_0xc974('0xe3')]);_0x1d0102[_0xc974('0x56')](_0xc974('0xe4'))[_0xc974('0x52')](_0x580d2b[_0xc974('0xd8')]['linkCheckout']);_0x1d0102[_0xc974('0x56')](_0xc974('0xe5'))[_0xc974('0x52')](_0x580d2b[_0xc974('0xd8')]['cartTotal']);_0x1d0102[_0xc974('0x56')]('.qd-ddc-shipping')['html'](_0x580d2b['texts'][_0xc974('0xe6')]);_0x1d0102[_0xc974('0x56')](_0xc974('0xe7'))[_0xc974('0x52')](_0x580d2b[_0xc974('0xd8')][_0xc974('0x5a')]);return _0x1d0102;}(this['cartContainer']);var _0x29c5c6=0x0;_0x3b4616[_0xc974('0x66')](function(){0x0<_0x29c5c6?_0x16009e[_0xc974('0x2b')](this,_0x25ee67[_0xc974('0xe8')]()):_0x16009e[_0xc974('0x2b')](this,_0x25ee67);_0x29c5c6++;});window[_0xc974('0x39')][_0xc974('0x44')][_0xc974('0x31')](function(){_0x488ee1(_0xc974('0xe9'))['html'](window[_0xc974('0x39')]['total']||'--');_0x488ee1(_0xc974('0xea'))[_0xc974('0x52')](window[_0xc974('0x39')]['qtt']||'0');_0x488ee1('.qd-ddc-infoTotalShipping')[_0xc974('0x52')](window['_QuatroDigital_CartData'][_0xc974('0x3e')]||'--');_0x488ee1(_0xc974('0xeb'))['html'](window[_0xc974('0x39')]['allTotal']||'--');});var _0x4e3e03=function(_0x2286af,_0x563a40){if(_0xc974('0x3')===typeof _0x2286af[_0xc974('0x42')])return _0x201893(_0xc974('0xec'));_0x5f3ee7['renderProductsList'][_0xc974('0x2b')](this,_0x563a40);};_0x5f3ee7[_0xc974('0x8e')]=function(_0x35dc8f,_0x2e5a82){_0xc974('0x3')!=typeof _0x2e5a82?window[_0xc974('0x5d')]['dataOptionsCache']=_0x2e5a82:window['_QuatroDigital_DropDown'][_0xc974('0xed')]&&(_0x2e5a82=window['_QuatroDigital_DropDown'][_0xc974('0xed')]);setTimeout(function(){window[_0xc974('0x5d')][_0xc974('0xed')]=void 0x0;},_0x580d2b[_0xc974('0x8d')]);_0x488ee1(_0xc974('0xee'))[_0xc974('0x4e')](_0xc974('0xef'));if(_0x580d2b['smartCheckout']){var _0x70eb6e=function(_0x4b0fe2){window[_0xc974('0x5d')][_0xc974('0x2a')]=_0x4b0fe2;_0x4e3e03(_0x4b0fe2,_0x2e5a82);_0xc974('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0xc974('0xa')===typeof window['_QuatroDigital_AmountProduct'][_0xc974('0xf0')]&&window['_QuatroDigital_AmountProduct'][_0xc974('0xf0')][_0xc974('0x2b')](this);_0x488ee1(_0xc974('0xee'))[_0xc974('0x4c')](_0xc974('0xef'));};'undefined'!==typeof window[_0xc974('0x5d')][_0xc974('0x2a')]?(_0x70eb6e(window[_0xc974('0x5d')][_0xc974('0x2a')]),'function'===typeof _0x35dc8f&&_0x35dc8f(window[_0xc974('0x5d')][_0xc974('0x2a')])):_0x488ee1[_0xc974('0xf1')]([_0xc974('0x42'),_0xc974('0x3a'),'shippingData'],{'done':function(_0x1e28d3){_0x70eb6e[_0xc974('0x2b')](this,_0x1e28d3);_0xc974('0xa')===typeof _0x35dc8f&&_0x35dc8f(_0x1e28d3);},'fail':function(_0x42e3e5){_0x201893(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x42e3e5]);}});}else alert(_0xc974('0xf2'));};_0x5f3ee7['cartIsEmpty']=function(){var _0x35be4d=_0x488ee1('.qd-ddc-wrapper');_0x35be4d['find'](_0xc974('0xf3'))[_0xc974('0x8')]?_0x35be4d[_0xc974('0x4e')](_0xc974('0xf4')):_0x35be4d['addClass']('qd-ddc-noItems');};_0x5f3ee7[_0xc974('0xf5')]=function(_0x43a468){var _0x70eb6e=_0x488ee1(_0xc974('0xf6'));_0x70eb6e[_0xc974('0xf7')]();_0x70eb6e[_0xc974('0x66')](function(){var _0x70eb6e=_0x488ee1(this),_0x4a3452,_0x2072c6,_0x5ca155=_0x488ee1(''),_0x359a61;for(_0x359a61 in window[_0xc974('0x5d')]['getOrderForm'][_0xc974('0x42')])if(_0xc974('0x18')===typeof window[_0xc974('0x5d')][_0xc974('0x2a')][_0xc974('0x42')][_0x359a61]){var _0x2f740a=window[_0xc974('0x5d')]['getOrderForm'][_0xc974('0x42')][_0x359a61];var _0x253469=_0x2f740a[_0xc974('0xf8')][_0xc974('0x2')](/^\/|\/$/g,'')['split']('/');var _0x1c2617=_0x488ee1('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x1c2617[_0xc974('0x36')]({'data-sku':_0x2f740a['id'],'data-sku-index':_0x359a61,'data-qd-departament':_0x253469[0x0],'data-qd-category':_0x253469[_0x253469[_0xc974('0x8')]-0x1]});_0x1c2617[_0xc974('0x4c')](_0xc974('0xf9')+_0x2f740a[_0xc974('0xfa')]);_0x1c2617[_0xc974('0x56')](_0xc974('0xfb'))[_0xc974('0x81')](_0x580d2b[_0xc974('0xc0')](_0x2f740a));_0x1c2617[_0xc974('0x56')](_0xc974('0xfc'))['append'](isNaN(_0x2f740a[_0xc974('0xfd')])?_0x2f740a[_0xc974('0xfd')]:0x0==_0x2f740a['sellingPrice']?_0xc974('0xfe'):(_0x488ee1(_0xc974('0x35'))[_0xc974('0x36')](_0xc974('0x37'))||'R$')+'\x20'+qd_number_format(_0x2f740a['sellingPrice']/0x64,0x2,',','.'));_0x1c2617[_0xc974('0x56')](_0xc974('0xff'))[_0xc974('0x36')]({'data-sku':_0x2f740a['id'],'data-sku-index':_0x359a61})[_0xc974('0x100')](_0x2f740a[_0xc974('0x43')]);_0x1c2617[_0xc974('0x56')](_0xc974('0x101'))['attr']({'data-sku':_0x2f740a['id'],'data-sku-index':_0x359a61});_0x5f3ee7['insertProdImg'](_0x2f740a['id'],_0x1c2617[_0xc974('0x56')](_0xc974('0x102')),_0x2f740a[_0xc974('0x103')]);_0x1c2617['find'](_0xc974('0x104'))['attr']({'data-sku':_0x2f740a['id'],'data-sku-index':_0x359a61});_0x1c2617[_0xc974('0x105')](_0x70eb6e);_0x5ca155=_0x5ca155[_0xc974('0x31')](_0x1c2617);}try{var _0x58fd84=_0x70eb6e[_0xc974('0x0')]('.qd-ddc-wrapper')[_0xc974('0x56')]('.qd-ddc-shipping\x20input');_0x58fd84['length']&&''==_0x58fd84[_0xc974('0x100')]()&&window[_0xc974('0x5d')][_0xc974('0x2a')]['shippingData'][_0xc974('0x106')]&&_0x58fd84['val'](window[_0xc974('0x5d')]['getOrderForm']['shippingData'][_0xc974('0x106')][_0xc974('0x107')]);}catch(_0x3e5dc1){_0x201893(_0xc974('0x108')+_0x3e5dc1['message'],_0xc974('0x6f'));}_0x5f3ee7[_0xc974('0x109')](_0x70eb6e);_0x5f3ee7[_0xc974('0x10a')]();_0x43a468&&_0x43a468[_0xc974('0x10b')]&&function(){_0x2072c6=_0x5ca155[_0xc974('0x47')](_0xc974('0x10c')+_0x43a468[_0xc974('0x10b')]+'\x27]');_0x2072c6[_0xc974('0x8')]&&(_0x4a3452=0x0,_0x5ca155[_0xc974('0x66')](function(){var _0x43a468=_0x488ee1(this);if(_0x43a468['is'](_0x2072c6))return!0x1;_0x4a3452+=_0x43a468['outerHeight']();}),_0x5f3ee7[_0xc974('0x10d')](void 0x0,void 0x0,_0x4a3452,_0x70eb6e[_0xc974('0x31')](_0x70eb6e[_0xc974('0xa7')]())),_0x5ca155[_0xc974('0x4e')]('qd-ddc-lastAddedFixed'),function(_0x5c9210){_0x5c9210['addClass'](_0xc974('0x10e'));_0x5c9210['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0x5c9210['removeClass']('qd-ddc-lastAdded');},_0x580d2b[_0xc974('0x8d')]);}(_0x2072c6));}();});(function(){_QuatroDigital_DropDown['getOrderForm']['items'][_0xc974('0x8')]?(_0x488ee1(_0xc974('0x72'))[_0xc974('0x4e')]('qd-ddc-cart-empty')[_0xc974('0x4c')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x488ee1(_0xc974('0x72'))[_0xc974('0x4e')]('qd-ddc-product-add-time');},_0x580d2b['timeRemoveNewItemClass'])):_0x488ee1('body')['removeClass'](_0xc974('0x10f'))[_0xc974('0x4c')]('qd-ddc-cart-empty');}());_0xc974('0xa')===typeof _0x580d2b[_0xc974('0x110')]?_0x580d2b[_0xc974('0x110')][_0xc974('0x2b')](this):_0x201893(_0xc974('0x111'));};_0x5f3ee7['insertProdImg']=function(_0x11be30,_0x1ae066,_0x47d78c){function _0xaf1fb7(){_0x1ae066[_0xc974('0x4e')](_0xc974('0x112'))[_0xc974('0x94')](function(){_0x488ee1(this)[_0xc974('0x4c')](_0xc974('0x112'));})[_0xc974('0x36')](_0xc974('0x113'),_0x47d78c);}_0x47d78c?_0xaf1fb7():isNaN(_0x11be30)?_0x201893(_0xc974('0x114'),_0xc974('0x50')):alert(_0xc974('0x115'));};_0x5f3ee7[_0xc974('0x109')]=function(_0x1780eb){var _0x44a377=function(_0x4227d3,_0x47406f){var _0x70eb6e=_0x488ee1(_0x4227d3);var _0x5676c9=_0x70eb6e['attr'](_0xc974('0x116'));var _0x4a3452=_0x70eb6e[_0xc974('0x36')](_0xc974('0x117'));if(_0x5676c9){var _0x3fc55e=parseInt(_0x70eb6e['val']())||0x1;_0x5f3ee7['changeQantity']([_0x5676c9,_0x4a3452],_0x3fc55e,_0x3fc55e+0x1,function(_0x153a59){_0x70eb6e[_0xc974('0x100')](_0x153a59);_0xc974('0xa')===typeof _0x47406f&&_0x47406f();});}};var _0x70eb6e=function(_0x354571,_0x3e5569){var _0x70eb6e=_0x488ee1(_0x354571);var _0x2e78f4=_0x70eb6e[_0xc974('0x36')]('data-sku');var _0x4a3452=_0x70eb6e[_0xc974('0x36')](_0xc974('0x117'));if(_0x2e78f4){var _0x5b2824=parseInt(_0x70eb6e[_0xc974('0x100')]())||0x2;_0x5f3ee7['changeQantity']([_0x2e78f4,_0x4a3452],_0x5b2824,_0x5b2824-0x1,function(_0x23c4df){_0x70eb6e[_0xc974('0x100')](_0x23c4df);'function'===typeof _0x3e5569&&_0x3e5569();});}};var _0x375813=function(_0x42d19a,_0x28411a){var _0x70eb6e=_0x488ee1(_0x42d19a);var _0x2770ad=_0x70eb6e[_0xc974('0x36')](_0xc974('0x116'));var _0x4a3452=_0x70eb6e[_0xc974('0x36')](_0xc974('0x117'));if(_0x2770ad){var _0x5ce2f1=parseInt(_0x70eb6e[_0xc974('0x100')]())||0x1;_0x5f3ee7[_0xc974('0x118')]([_0x2770ad,_0x4a3452],0x1,_0x5ce2f1,function(_0x1ebb7c){_0x70eb6e['val'](_0x1ebb7c);_0xc974('0xa')===typeof _0x28411a&&_0x28411a();});}};var _0x4a3452=_0x1780eb[_0xc974('0x56')](_0xc974('0x119'));_0x4a3452['addClass'](_0xc974('0x11a'))['each'](function(){var _0x1780eb=_0x488ee1(this);_0x1780eb[_0xc974('0x56')]('.qd-ddc-quantityMore')['on'](_0xc974('0x11b'),function(_0x99df4b){_0x99df4b[_0xc974('0x7b')]();_0x4a3452[_0xc974('0x4c')](_0xc974('0x11c'));_0x44a377(_0x1780eb[_0xc974('0x56')](_0xc974('0xff')),function(){_0x4a3452[_0xc974('0x4e')]('qd-loading');});});_0x1780eb[_0xc974('0x56')](_0xc974('0x11d'))['on']('click.qd_ddc_minus',function(_0x44a49e){_0x44a49e[_0xc974('0x7b')]();_0x4a3452[_0xc974('0x4c')](_0xc974('0x11c'));_0x70eb6e(_0x1780eb[_0xc974('0x56')](_0xc974('0xff')),function(){_0x4a3452[_0xc974('0x4e')](_0xc974('0x11c'));});});_0x1780eb[_0xc974('0x56')](_0xc974('0xff'))['on'](_0xc974('0x11e'),function(){_0x4a3452['addClass'](_0xc974('0x11c'));_0x375813(this,function(){_0x4a3452[_0xc974('0x4e')](_0xc974('0x11c'));});});_0x1780eb[_0xc974('0x56')]('.qd-ddc-quantity')['on'](_0xc974('0x11f'),function(_0x881f6e){0xd==_0x881f6e[_0xc974('0xcc')]&&(_0x4a3452[_0xc974('0x4c')](_0xc974('0x11c')),_0x375813(this,function(){_0x4a3452[_0xc974('0x4e')](_0xc974('0x11c'));}));});});_0x1780eb['find'](_0xc974('0xf3'))[_0xc974('0x66')](function(){var _0x1780eb=_0x488ee1(this);_0x1780eb[_0xc974('0x56')](_0xc974('0x101'))['on'](_0xc974('0x120'),function(){_0x1780eb[_0xc974('0x4c')](_0xc974('0x11c'));_0x5f3ee7['removeProduct'](_0x488ee1(this),function(_0x594692){_0x594692?_0x1780eb[_0xc974('0x121')](!0x0)[_0xc974('0x122')](function(){_0x1780eb[_0xc974('0x123')]();_0x5f3ee7['cartIsEmpty']();}):_0x1780eb[_0xc974('0x4e')](_0xc974('0x11c'));});return!0x1;});});};_0x5f3ee7['shippingCalculate']=function(_0x1d43bd){var _0x1c0e7e=_0x1d43bd[_0xc974('0x100')](),_0x1c0e7e=_0x1c0e7e['replace'](/[^0-9\-]/g,''),_0x1c0e7e=_0x1c0e7e['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xc974('0x124')),_0x1c0e7e=_0x1c0e7e[_0xc974('0x2')](/(.{9}).*/g,'$1');_0x1d43bd['val'](_0x1c0e7e);0x9<=_0x1c0e7e[_0xc974('0x8')]&&(_0x1d43bd[_0xc974('0x19')](_0xc974('0x125'))!=_0x1c0e7e&&_0x440743[_0xc974('0x126')]({'postalCode':_0x1c0e7e,'country':_0xc974('0x127')})[_0xc974('0x1f')](function(_0x1e1050){window['_QuatroDigital_DropDown'][_0xc974('0x2a')]=_0x1e1050;_0x5f3ee7[_0xc974('0x8e')]();})[_0xc974('0x21')](function(_0x155d32){_0x201893([_0xc974('0x128'),_0x155d32]);updateCartData();}),_0x1d43bd[_0xc974('0x19')](_0xc974('0x125'),_0x1c0e7e));};_0x5f3ee7['changeQantity']=function(_0x2f0fb5,_0x5345ec,_0x24b737,_0x1e67df){function _0x2cc47c(_0x2d726e){_0x2d726e='boolean'!==typeof _0x2d726e?!0x1:_0x2d726e;_0x5f3ee7[_0xc974('0x8e')]();window[_0xc974('0x5d')][_0xc974('0x8f')]=!0x1;_0x5f3ee7['cartIsEmpty']();_0xc974('0x3')!==typeof window[_0xc974('0x129')]&&_0xc974('0xa')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0xc974('0x129')]['exec'][_0xc974('0x2b')](this);_0xc974('0xa')===typeof adminCart&&adminCart();_0x488ee1['fn'][_0xc974('0x28')](!0x0,void 0x0,_0x2d726e);_0xc974('0xa')===typeof _0x1e67df&&_0x1e67df(_0x5345ec);}_0x24b737=_0x24b737||0x1;if(0x1>_0x24b737)return _0x5345ec;if(_0x580d2b['smartCheckout']){if('undefined'===typeof window[_0xc974('0x5d')][_0xc974('0x2a')][_0xc974('0x42')][_0x2f0fb5[0x1]])return _0x201893(_0xc974('0x12a')+_0x2f0fb5[0x1]+']'),_0x5345ec;window[_0xc974('0x5d')]['getOrderForm'][_0xc974('0x42')][_0x2f0fb5[0x1]][_0xc974('0x43')]=_0x24b737;window[_0xc974('0x5d')][_0xc974('0x2a')][_0xc974('0x42')][_0x2f0fb5[0x1]][_0xc974('0x12b')]=_0x2f0fb5[0x1];_0x440743[_0xc974('0x12c')]([window[_0xc974('0x5d')][_0xc974('0x2a')][_0xc974('0x42')][_0x2f0fb5[0x1]]],['items','totalizers','shippingData'])[_0xc974('0x1f')](function(_0x22c2f4){window[_0xc974('0x5d')][_0xc974('0x2a')]=_0x22c2f4;_0x2cc47c(!0x0);})[_0xc974('0x21')](function(_0x1978c5){_0x201893(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x1978c5]);_0x2cc47c();});}else _0x201893(_0xc974('0x12d'));};_0x5f3ee7[_0xc974('0x12e')]=function(_0x57310b,_0x1fe222){function _0x462558(_0x4ecbb0){_0x4ecbb0=_0xc974('0x12f')!==typeof _0x4ecbb0?!0x1:_0x4ecbb0;_0xc974('0x3')!==typeof window[_0xc974('0x129')]&&_0xc974('0xa')===typeof window[_0xc974('0x129')][_0xc974('0xf0')]&&window[_0xc974('0x129')][_0xc974('0xf0')][_0xc974('0x2b')](this);'function'===typeof adminCart&&adminCart();_0x488ee1['fn'][_0xc974('0x28')](!0x0,void 0x0,_0x4ecbb0);'function'===typeof _0x1fe222&&_0x1fe222(_0x4a3452);}var _0x4a3452=!0x1,_0x28643f=_0x488ee1(_0x57310b)[_0xc974('0x36')](_0xc974('0x117'));if(_0x580d2b['smartCheckout']){if(_0xc974('0x3')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0xc974('0x42')][_0x28643f])return _0x201893(_0xc974('0x12a')+_0x28643f+']'),_0x4a3452;window[_0xc974('0x5d')][_0xc974('0x2a')][_0xc974('0x42')][_0x28643f][_0xc974('0x12b')]=_0x28643f;_0x440743[_0xc974('0x130')]([window['_QuatroDigital_DropDown'][_0xc974('0x2a')]['items'][_0x28643f]],['items',_0xc974('0x3a'),'shippingData'])[_0xc974('0x1f')](function(_0x191716){_0x4a3452=!0x0;window[_0xc974('0x5d')][_0xc974('0x2a')]=_0x191716;_0x4e3e03(_0x191716);_0x462558(!0x0);})[_0xc974('0x21')](function(_0x109553){_0x201893([_0xc974('0x131'),_0x109553]);_0x462558();});}else alert(_0xc974('0x132'));};_0x5f3ee7[_0xc974('0x10d')]=function(_0x137ef0,_0x5c193,_0x229b50,_0x295871){_0x295871=_0x295871||_0x488ee1('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x137ef0=_0x137ef0||'+';_0x5c193=_0x5c193||0.9*_0x295871[_0xc974('0x133')]();_0x295871[_0xc974('0x121')](!0x0,!0x0)[_0xc974('0x134')]({'scrollTop':isNaN(_0x229b50)?_0x137ef0+'='+_0x5c193+'px':_0x229b50});};_0x580d2b['updateOnlyHover']||(_0x5f3ee7[_0xc974('0x8e')](),_0x488ee1['fn']['simpleCart'](!0x0));_0x488ee1(window)['on'](_0xc974('0x135'),function(){try{window[_0xc974('0x5d')]['getOrderForm']=void 0x0,_0x5f3ee7[_0xc974('0x8e')]();}catch(_0x5a54a0){_0x201893(_0xc974('0x136')+_0x5a54a0[_0xc974('0x25')],_0xc974('0x137'));}});'function'===typeof _0x580d2b[_0xc974('0x44')]?_0x580d2b['callback'][_0xc974('0x2b')](this):_0x201893('Callback\x20não\x20é\x20uma\x20função');};_0x488ee1['fn'][_0xc974('0xb6')]=function(_0x22cff7){var _0x525264=_0x488ee1(this);_0x525264['fn']=new _0x488ee1['QD_dropDownCart'](this,_0x22cff7);return _0x525264;};}catch(_0x13c1ba){'undefined'!==typeof console&&_0xc974('0xa')===typeof console['error']&&console['error'](_0xc974('0x6b'),_0x13c1ba);}}(this));(function(_0x51ecd3){try{var _0x57ceaf=jQuery;window['_QuatroDigital_AmountProduct']=window[_0xc974('0x129')]||{};window['_QuatroDigital_AmountProduct'][_0xc974('0x42')]={};window[_0xc974('0x129')][_0xc974('0x138')]=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window[_0xc974('0x129')]['quickViewUpdate']=!0x1;var _0x7905da=function(){if(window[_0xc974('0x129')]['allowRecalculate']){var _0x56d72f=!0x1;var _0x51ecd3={};window[_0xc974('0x129')]['items']={};for(_0x3f6a18 in window['_QuatroDigital_DropDown'][_0xc974('0x2a')]['items'])if(_0xc974('0x18')===typeof window[_0xc974('0x5d')][_0xc974('0x2a')][_0xc974('0x42')][_0x3f6a18]){var _0x4e2a09=window['_QuatroDigital_DropDown'][_0xc974('0x2a')][_0xc974('0x42')][_0x3f6a18];_0xc974('0x3')!==typeof _0x4e2a09[_0xc974('0x139')]&&null!==_0x4e2a09['productId']&&''!==_0x4e2a09[_0xc974('0x139')]&&(window[_0xc974('0x129')]['items'][_0xc974('0x13a')+_0x4e2a09[_0xc974('0x139')]]=window[_0xc974('0x129')][_0xc974('0x42')][_0xc974('0x13a')+_0x4e2a09[_0xc974('0x139')]]||{},window[_0xc974('0x129')][_0xc974('0x42')]['prod_'+_0x4e2a09['productId']]['prodId']=_0x4e2a09[_0xc974('0x139')],_0x51ecd3[_0xc974('0x13a')+_0x4e2a09[_0xc974('0x139')]]||(window['_QuatroDigital_AmountProduct'][_0xc974('0x42')][_0xc974('0x13a')+_0x4e2a09['productId']][_0xc974('0x40')]=0x0),window['_QuatroDigital_AmountProduct'][_0xc974('0x42')]['prod_'+_0x4e2a09[_0xc974('0x139')]][_0xc974('0x40')]+=_0x4e2a09[_0xc974('0x43')],_0x56d72f=!0x0,_0x51ecd3['prod_'+_0x4e2a09['productId']]=!0x0);}var _0x3f6a18=_0x56d72f;}else _0x3f6a18=void 0x0;window[_0xc974('0x129')][_0xc974('0x138')]&&(_0x57ceaf(_0xc974('0x13b'))[_0xc974('0x123')](),_0x57ceaf(_0xc974('0x13c'))[_0xc974('0x4e')](_0xc974('0x13d')));for(var _0x3be950 in window[_0xc974('0x129')][_0xc974('0x42')]){_0x4e2a09=window[_0xc974('0x129')][_0xc974('0x42')][_0x3be950];if(_0xc974('0x18')!==typeof _0x4e2a09)return;_0x51ecd3=_0x57ceaf('input.qd-productId[value='+_0x4e2a09['prodId']+']')['getParent']('li');if(window['_QuatroDigital_AmountProduct'][_0xc974('0x138')]||!_0x51ecd3['find'](_0xc974('0x13b'))[_0xc974('0x8')])_0x56d72f=_0x57ceaf(_0xc974('0x13e')),_0x56d72f[_0xc974('0x56')](_0xc974('0x13f'))[_0xc974('0x52')](_0x4e2a09[_0xc974('0x40')]),_0x4e2a09=_0x51ecd3[_0xc974('0x56')]('.qd_bap_wrapper_content'),_0x4e2a09[_0xc974('0x8')]?_0x4e2a09[_0xc974('0xad')](_0x56d72f)['addClass'](_0xc974('0x13d')):_0x51ecd3[_0xc974('0xad')](_0x56d72f);}_0x3f6a18&&(window[_0xc974('0x129')]['allowRecalculate']=!0x1);};window[_0xc974('0x129')][_0xc974('0xf0')]=function(){window[_0xc974('0x129')][_0xc974('0x138')]=!0x0;_0x7905da[_0xc974('0x2b')](this);};_0x57ceaf(document)['ajaxStop'](function(){_0x7905da[_0xc974('0x2b')](this);});}catch(_0x25c40d){'undefined'!==typeof console&&_0xc974('0xa')===typeof console['error']&&console[_0xc974('0x15')](_0xc974('0x6b'),_0x25c40d);}}(this));(function(){try{var _0x5a5e55=jQuery,_0x5f453b,_0x23d427={'selector':_0xc974('0x140'),'dropDown':{},'buyButton':{}};_0x5a5e55[_0xc974('0x141')]=function(_0x21f47a){var _0xd4fbe={};_0x5f453b=_0x5a5e55[_0xc974('0x16')](!0x0,{},_0x23d427,_0x21f47a);_0x21f47a=_0x5a5e55(_0x5f453b[_0xc974('0x85')])[_0xc974('0xb6')](_0x5f453b[_0xc974('0x142')]);_0xd4fbe['buyButton']=_0xc974('0x3')!==typeof _0x5f453b[_0xc974('0x142')][_0xc974('0xd5')]&&!0x1===_0x5f453b[_0xc974('0x142')][_0xc974('0xd5')]?_0x5a5e55(_0x5f453b[_0xc974('0x85')])[_0xc974('0xab')](_0x21f47a['fn'],_0x5f453b[_0xc974('0x143')]):_0x5a5e55(_0x5f453b[_0xc974('0x85')])['QD_buyButton'](_0x5f453b[_0xc974('0x143')]);_0xd4fbe[_0xc974('0x142')]=_0x21f47a;return _0xd4fbe;};_0x5a5e55['fn'][_0xc974('0x144')]=function(){_0xc974('0x18')===typeof console&&'function'===typeof console['info']&&console['info']('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x5a5e55['smartCart']=_0x5a5e55['fn']['smartCart'];}catch(_0x5e10e8){'undefined'!==typeof console&&'function'===typeof console[_0xc974('0x15')]&&console[_0xc974('0x15')](_0xc974('0x6b'),_0x5e10e8);}}());
/* Quatro Digital Newsletter // 5.1 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(b){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(b){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var b;b=e.val();e.bind({focus:function(){e.val()==
b&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(b)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(b).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();

/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
var _0x056b=['ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','first','trim','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','warn','qdAmAddNdx','each','qd-am-li-','addClass','qd-am-first','sevpnanegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','url','html','find','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','qd-am-content-loaded','text','[class*=\x27colunas\x27]','clone','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger'];(function(_0x2cdcda,_0x51abca){var _0x14edd4=function(_0x134a1d){while(--_0x134a1d){_0x2cdcda['push'](_0x2cdcda['shift']());}};_0x14edd4(++_0x51abca);}(_0x056b,0xb6));var _0xb056=function(_0x236023,_0xa7f6b6){_0x236023=_0x236023-0x0;var _0x5ef19f=_0x056b[_0x236023];return _0x5ef19f;};(function(_0x4c8b41){_0x4c8b41['fn'][_0xb056('0x0')]=_0x4c8b41['fn'][_0xb056('0x1')];}(jQuery));(function(_0xed6810){var _0x230e63;var _0x2cb43d=jQuery;if(_0xb056('0x2')!==typeof _0x2cb43d['fn'][_0xb056('0x3')]){var _0x4157e0={'url':_0xb056('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x2ff09d=function(_0x15a545,_0x515612){if(_0xb056('0x5')===typeof console&&_0xb056('0x6')!==typeof console[_0xb056('0x7')]&&_0xb056('0x6')!==typeof console[_0xb056('0x8')]&&_0xb056('0x6')!==typeof console['warn']){var _0x483b47;_0xb056('0x5')===typeof _0x15a545?(_0x15a545[_0xb056('0x9')](_0xb056('0xa')),_0x483b47=_0x15a545):_0x483b47=[_0xb056('0xa')+_0x15a545];if('undefined'===typeof _0x515612||_0xb056('0xb')!==_0x515612['toLowerCase']()&&_0xb056('0xc')!==_0x515612[_0xb056('0xd')]())if(_0xb056('0x6')!==typeof _0x515612&&_0xb056('0x8')===_0x515612[_0xb056('0xd')]())try{console['info']['apply'](console,_0x483b47);}catch(_0xf3e80f){try{console[_0xb056('0x8')](_0x483b47['join']('\x0a'));}catch(_0x81c9fc){}}else try{console[_0xb056('0x7')][_0xb056('0xe')](console,_0x483b47);}catch(_0x1197e5){try{console[_0xb056('0x7')](_0x483b47[_0xb056('0xf')]('\x0a'));}catch(_0x179e49){}}else try{console['warn'][_0xb056('0xe')](console,_0x483b47);}catch(_0x43565e){try{console[_0xb056('0x10')](_0x483b47[_0xb056('0xf')]('\x0a'));}catch(_0x5a4ef1){}}}};_0x2cb43d['fn'][_0xb056('0x11')]=function(){var _0x4e501a=_0x2cb43d(this);_0x4e501a[_0xb056('0x12')](function(_0x311eb9){_0x2cb43d(this)['addClass'](_0xb056('0x13')+_0x311eb9);});_0x4e501a['first']()[_0xb056('0x14')](_0xb056('0x15'));_0x4e501a['last']()[_0xb056('0x14')]('qd-am-last');return _0x4e501a;};_0x2cb43d['fn'][_0xb056('0x3')]=function(){};_0xed6810=function(_0x225081){var _0x457b54={'n':_0xb056('0x16')};return function(_0x4b254f){var _0x1db585=function(_0x5b481c){return _0x5b481c;};var _0x1565d8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4b254f=_0x4b254f['d'+_0x1565d8[0x10]+'c'+_0x1565d8[0x11]+'m'+_0x1db585(_0x1565d8[0x1])+'n'+_0x1565d8[0xd]]['l'+_0x1565d8[0x12]+'c'+_0x1565d8[0x0]+'ti'+_0x1db585('o')+'n'];var _0x5dea90=function(_0x324ce6){return escape(encodeURIComponent(_0x324ce6[_0xb056('0x17')](/\./g,'¨')[_0xb056('0x17')](/[a-zA-Z]/g,function(_0x3e0298){return String[_0xb056('0x18')](('Z'>=_0x3e0298?0x5a:0x7a)>=(_0x3e0298=_0x3e0298[_0xb056('0x19')](0x0)+0xd)?_0x3e0298:_0x3e0298-0x1a);})));};var _0x4e66c3=_0x5dea90(_0x4b254f[[_0x1565d8[0x9],_0x1db585('o'),_0x1565d8[0xc],_0x1565d8[_0x1db585(0xd)]][_0xb056('0xf')]('')]);_0x5dea90=_0x5dea90((window[['js',_0x1db585('no'),'m',_0x1565d8[0x1],_0x1565d8[0x4][_0xb056('0x1a')](),_0xb056('0x1b')][_0xb056('0xf')]('')]||'---')+['.v',_0x1565d8[0xd],'e',_0x1db585('x'),'co',_0x1db585('mm'),_0xb056('0x1c'),_0x1565d8[0x1],'.c',_0x1db585('o'),'m.',_0x1565d8[0x13],'r'][_0xb056('0xf')](''));for(var _0x5c39db in _0x457b54){if(_0x5dea90===_0x5c39db+_0x457b54[_0x5c39db]||_0x4e66c3===_0x5c39db+_0x457b54[_0x5c39db]){var _0x6d0483='tr'+_0x1565d8[0x11]+'e';break;}_0x6d0483='f'+_0x1565d8[0x0]+'ls'+_0x1db585(_0x1565d8[0x1])+'';}_0x1db585=!0x1;-0x1<_0x4b254f[[_0x1565d8[0xc],'e',_0x1565d8[0x0],'rc',_0x1565d8[0x9]][_0xb056('0xf')]('')][_0xb056('0x1d')](_0xb056('0x1e'))&&(_0x1db585=!0x0);return[_0x6d0483,_0x1db585];}(_0x225081);}(window);if(!eval(_0xed6810[0x0]))return _0xed6810[0x1]?_0x2ff09d(_0xb056('0x1f')):!0x1;var _0x4024d7=function(_0x211898){var _0x2042f1=_0x211898['find'](_0xb056('0x20'));var _0x51b06b=_0x2042f1[_0xb056('0x21')](_0xb056('0x22'));var _0x294874=_0x2042f1['filter'](_0xb056('0x23'));if(_0x51b06b[_0xb056('0x24')]||_0x294874['length'])_0x51b06b[_0xb056('0x25')]()[_0xb056('0x14')](_0xb056('0x26')),_0x294874[_0xb056('0x25')]()[_0xb056('0x14')]('qd-am-collection-wrapper'),_0x2cb43d[_0xb056('0x27')]({'url':_0x230e63[_0xb056('0x28')],'dataType':_0xb056('0x29'),'success':function(_0x248473){var _0x103482=_0x2cb43d(_0x248473);_0x51b06b['each'](function(){var _0x248473=_0x2cb43d(this);var _0x290807=_0x103482[_0xb056('0x2a')](_0xb056('0x2b')+_0x248473[_0xb056('0x2c')](_0xb056('0x2d'))+'\x27]');_0x290807[_0xb056('0x24')]&&(_0x290807[_0xb056('0x12')](function(){_0x2cb43d(this)['getParent'](_0xb056('0x2e'))['clone']()[_0xb056('0x2f')](_0x248473);}),_0x248473['hide']());})['addClass'](_0xb056('0x30'));_0x294874[_0xb056('0x12')](function(){var _0x248473={};var _0x1b7934=_0x2cb43d(this);_0x103482[_0xb056('0x2a')]('h2')[_0xb056('0x12')](function(){if(_0x2cb43d(this)[_0xb056('0x31')]()['trim']()[_0xb056('0xd')]()==_0x1b7934[_0xb056('0x2c')]('data-qdam-value')['trim']()[_0xb056('0xd')]())return _0x248473=_0x2cb43d(this),!0x1;});_0x248473[_0xb056('0x24')]&&(_0x248473[_0xb056('0x12')](function(){_0x2cb43d(this)['getParent'](_0xb056('0x32'))[_0xb056('0x33')]()[_0xb056('0x2f')](_0x1b7934);}),_0x1b7934[_0xb056('0x34')]());})[_0xb056('0x14')](_0xb056('0x30'));},'error':function(){_0x2ff09d(_0xb056('0x35')+_0x230e63[_0xb056('0x28')]+_0xb056('0x36'));},'complete':function(){_0x230e63[_0xb056('0x37')][_0xb056('0x38')](this);_0x2cb43d(window)[_0xb056('0x39')]('QuatroDigital.am.ajaxCallback',_0x211898);},'clearQueueDelay':0xbb8});};_0x2cb43d[_0xb056('0x3')]=function(_0x4acc94){var _0x321333=_0x4acc94[_0xb056('0x2a')](_0xb056('0x3a'))[_0xb056('0x12')](function(){var _0x460f28=_0x2cb43d(this);if(!_0x460f28[_0xb056('0x24')])return _0x2ff09d([_0xb056('0x3b'),_0x4acc94],_0xb056('0xb'));_0x460f28['find'](_0xb056('0x3c'))[_0xb056('0x25')]()[_0xb056('0x14')](_0xb056('0x3d'));_0x460f28[_0xb056('0x2a')]('li')['each'](function(){var _0x39b861=_0x2cb43d(this);var _0x3c2249=_0x39b861[_0xb056('0x3e')](_0xb056('0x3f'));_0x3c2249[_0xb056('0x24')]&&_0x39b861[_0xb056('0x14')]('qd-am-elem-'+_0x3c2249[_0xb056('0x40')]()['text']()[_0xb056('0x41')]()[_0xb056('0x42')]()[_0xb056('0x17')](/\./g,'')[_0xb056('0x17')](/\s/g,'-')[_0xb056('0xd')]());});var _0x9aa65d=_0x460f28[_0xb056('0x2a')](_0xb056('0x43'))[_0xb056('0x11')]();_0x460f28[_0xb056('0x14')]('qd-amazing-menu');_0x9aa65d=_0x9aa65d[_0xb056('0x2a')](_0xb056('0x44'));_0x9aa65d[_0xb056('0x12')](function(){var _0x4b0059=_0x2cb43d(this);_0x4b0059[_0xb056('0x2a')](_0xb056('0x43'))['qdAmAddNdx']()['addClass'](_0xb056('0x45'));_0x4b0059[_0xb056('0x14')](_0xb056('0x46'));_0x4b0059[_0xb056('0x25')]()['addClass']('qd-am-dropdown');});_0x9aa65d['addClass']('qd-am-dropdown');var _0x49df4d=0x0,_0xed6810=function(_0x11c085){_0x49df4d+=0x1;_0x11c085=_0x11c085['children']('li')[_0xb056('0x3e')]('*');_0x11c085[_0xb056('0x24')]&&(_0x11c085[_0xb056('0x14')](_0xb056('0x47')+_0x49df4d),_0xed6810(_0x11c085));};_0xed6810(_0x460f28);_0x460f28[_0xb056('0x48')](_0x460f28[_0xb056('0x2a')]('ul'))[_0xb056('0x12')](function(){var _0x1d3f86=_0x2cb43d(this);_0x1d3f86['addClass'](_0xb056('0x49')+_0x1d3f86[_0xb056('0x3e')]('li')['length']+_0xb056('0x4a'));});});_0x4024d7(_0x321333);_0x230e63[_0xb056('0x4b')][_0xb056('0x38')](this);_0x2cb43d(window)[_0xb056('0x39')](_0xb056('0x4c'),_0x4acc94);};_0x2cb43d['fn'][_0xb056('0x3')]=function(_0x5ba227){var _0x119c5c=_0x2cb43d(this);if(!_0x119c5c['length'])return _0x119c5c;_0x230e63=_0x2cb43d[_0xb056('0x4d')]({},_0x4157e0,_0x5ba227);_0x119c5c[_0xb056('0x4e')]=new _0x2cb43d[(_0xb056('0x3'))](_0x2cb43d(this));return _0x119c5c;};_0x2cb43d(function(){_0x2cb43d(_0xb056('0x4f'))[_0xb056('0x3')]();});}}(this));
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
// not qd-include ../qd-product-thumbs/QD_productThumbs.min.js

/* Automatizador de comments box do Facebook // 1.2 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a;a=$(".fb-comments");if(a.length)if($("#fb-root").length||$("body").append('<div id="fb-root"></div>'),a.attr("data-href",document.location.href.split("#").shift().split("?").shift()),$("script[src*='connect.facebook.net']").filter("[src*='all.js']").length)"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse();else{var b=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(a=document.createElement("script"),a.id="facebook-jssdk",a.src="//connect.facebook.net/pt_BR/all.js#xfbml=1&appId="+($("meta[property='fb:app_id']").attr("content")||""),b.parentNode.insertBefore(a,b))}});
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();
/* Quatro Digital Cookie Functions // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,c){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?
"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var c=function(d,b){var c=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof c&&c>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(d);d.trigger("QuatroDigital.cf_show");a(window).on("qdNewsSuccessCallback",function(a,c){d.trigger("QuatroDigital.qdcf_applyComplete");b.show(d);d.trigger("QuatroDigital.cf_hide")});b.callback();d.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var d=a(this),b;try{if(b=d.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(d,b);c(d,b);e(d,b)})};a.fn.QD_cookieFn=
function(f){var c=a(this);h=a.extend(!0,{},g,f);c.QD_cookieFn=new a.QD_cookieFn(c);return c};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs()}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return $.extend({},a,new b(a))},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);