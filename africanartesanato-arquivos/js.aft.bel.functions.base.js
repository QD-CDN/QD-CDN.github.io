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
			$(".side-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});
			$(".qd-am-overlay, .search-menu-close").click(function(){
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
			$(".qd-am-overlay, .search-menu-close").click(function(){
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
var _0x2d07=['round','length','prototype','trim','capitalize','charAt','toUpperCase','slice','toLowerCase','function','qdAjaxQueue','jquery','000','error','extend','GET','object','stringify','url','jqXHR','ajax','success','fail','always','complete','clearQueueDelay','message','qdAjax','version','4.0','closest','simpleCart','checkout','getOrderForm','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_items_text','meta[name=currency]','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','shipping','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','hide','.singular','show','filter','.plural','addClass','qd-emptyCart','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','cartQttE','itemsTextE','data','$this','find','cartTotalE','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','call','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','join','done','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','---','qd-bb-itemAddBuyButtonWrapper','removeClass','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','função\x20descontinuada','getCartInfoByUrl','allowUpdate','unbind','click','mouseenter.qd_bb_buy_sc','attr','href','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=true','buyIfQuantityZeroed','test','productPageCallback','split','pop','shift','productAddedToCart','cartProductAdded.vtex','fakeRequest','buyButtonClickCallback','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','prodAdd','ajaxSend','/checkout/cart/add','match','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','Oooops!\x20','pow','toFixed','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','sevpnanegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','ite','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','shippingCalculate','updateOnlyHover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','.qd-ddc-remove','.qd-ddc-image','imageUrl','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','insertProdImg','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-quantityMore','preventDefault','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','$1-$2$3','qdDdcLastPostalCode','calculateShipping','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','index','removeItems','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','remove','.qd-bap-item-added','prodId','.qd-bap-qtt','.qd_bap_wrapper_content','qd-bap-item-added','.qdDdcContainer','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','replace','abs','undefined'];(function(_0x1d27a1,_0xe280d2){var _0x34ead5=function(_0x34301a){while(--_0x34301a){_0x1d27a1['push'](_0x1d27a1['shift']());}};_0x34ead5(++_0xe280d2);}(_0x2d07,0x13a));var _0x72d0=function(_0x152136,_0x4f14f1){_0x152136=_0x152136-0x0;var _0x20df44=_0x2d07[_0x152136];return _0x20df44;};(function(_0x1ebbcd){_0x1ebbcd['fn'][_0x72d0('0x0')]=_0x1ebbcd['fn']['closest'];}(jQuery));function qd_number_format(_0x31c196,_0x231dc2,_0x52799f,_0x26a7ae){_0x31c196=(_0x31c196+'')[_0x72d0('0x1')](/[^0-9+\-Ee.]/g,'');_0x31c196=isFinite(+_0x31c196)?+_0x31c196:0x0;_0x231dc2=isFinite(+_0x231dc2)?Math[_0x72d0('0x2')](_0x231dc2):0x0;_0x26a7ae=_0x72d0('0x3')===typeof _0x26a7ae?',':_0x26a7ae;_0x52799f=_0x72d0('0x3')===typeof _0x52799f?'.':_0x52799f;var _0x180424='',_0x180424=function(_0xdad2db,_0x2a4100){var _0x231dc2=Math['pow'](0xa,_0x2a4100);return''+(Math[_0x72d0('0x4')](_0xdad2db*_0x231dc2)/_0x231dc2)['toFixed'](_0x2a4100);},_0x180424=(_0x231dc2?_0x180424(_0x31c196,_0x231dc2):''+Math['round'](_0x31c196))['split']('.');0x3<_0x180424[0x0][_0x72d0('0x5')]&&(_0x180424[0x0]=_0x180424[0x0][_0x72d0('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x26a7ae));(_0x180424[0x1]||'')[_0x72d0('0x5')]<_0x231dc2&&(_0x180424[0x1]=_0x180424[0x1]||'',_0x180424[0x1]+=Array(_0x231dc2-_0x180424[0x1][_0x72d0('0x5')]+0x1)['join']('0'));return _0x180424['join'](_0x52799f);};'function'!==typeof String[_0x72d0('0x6')][_0x72d0('0x7')]&&(String[_0x72d0('0x6')][_0x72d0('0x7')]=function(){return this[_0x72d0('0x1')](/^\s+|\s+$/g,'');});'function'!=typeof String[_0x72d0('0x6')][_0x72d0('0x8')]&&(String[_0x72d0('0x6')]['capitalize']=function(){return this[_0x72d0('0x9')](0x0)[_0x72d0('0xa')]()+this[_0x72d0('0xb')](0x1)[_0x72d0('0xc')]();});(function(_0x19b3e7){if(_0x72d0('0xd')!==typeof _0x19b3e7['qdAjax']){var _0x1e2089={};_0x19b3e7[_0x72d0('0xe')]=_0x1e2089;0x96>parseInt((_0x19b3e7['fn'][_0x72d0('0xf')][_0x72d0('0x1')](/[^0-9]+/g,'')+_0x72d0('0x10'))[_0x72d0('0xb')](0x0,0x3),0xa)&&console&&_0x72d0('0xd')==typeof console[_0x72d0('0x11')]&&console[_0x72d0('0x11')]();_0x19b3e7['qdAjax']=function(_0x440f9c){try{var _0x357553=_0x19b3e7[_0x72d0('0x12')]({},{'url':'','type':_0x72d0('0x13'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x440f9c);var _0xf9d806=_0x72d0('0x14')===typeof _0x357553['data']?JSON[_0x72d0('0x15')](_0x357553['data']):_0x357553['data']['toString']();var _0xfa481b=encodeURIComponent(_0x357553[_0x72d0('0x16')]+'|'+_0x357553['type']+'|'+_0xf9d806);_0x1e2089[_0xfa481b]=_0x1e2089[_0xfa481b]||{};_0x72d0('0x3')==typeof _0x1e2089[_0xfa481b][_0x72d0('0x17')]?_0x1e2089[_0xfa481b]['jqXHR']=_0x19b3e7[_0x72d0('0x18')](_0x357553):(_0x1e2089[_0xfa481b][_0x72d0('0x17')]['done'](_0x357553[_0x72d0('0x19')]),_0x1e2089[_0xfa481b][_0x72d0('0x17')][_0x72d0('0x1a')](_0x357553['error']),_0x1e2089[_0xfa481b][_0x72d0('0x17')][_0x72d0('0x1b')](_0x357553[_0x72d0('0x1c')]));_0x1e2089[_0xfa481b][_0x72d0('0x17')]['always'](function(){isNaN(parseInt(_0x357553[_0x72d0('0x1d')]))||setTimeout(function(){_0x1e2089[_0xfa481b][_0x72d0('0x17')]=void 0x0;},_0x357553[_0x72d0('0x1d')]);});return _0x1e2089[_0xfa481b][_0x72d0('0x17')];}catch(_0x160e8f){_0x72d0('0x3')!==typeof console&&_0x72d0('0xd')===typeof console['error']&&console[_0x72d0('0x11')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x160e8f[_0x72d0('0x1e')]);}};_0x19b3e7[_0x72d0('0x1f')][_0x72d0('0x20')]=_0x72d0('0x21');}}(jQuery));(function(_0xf53e37){_0xf53e37['fn']['getParent']=_0xf53e37['fn'][_0x72d0('0x22')];}(jQuery));(function(){var _0x174cd0=jQuery;if('function'!==typeof _0x174cd0['fn'][_0x72d0('0x23')]){_0x174cd0(function(){var _0x357686=vtexjs[_0x72d0('0x24')]['getOrderForm'];vtexjs[_0x72d0('0x24')][_0x72d0('0x25')]=function(){return _0x357686['call']();};});try{window[_0x72d0('0x26')]=window['QuatroDigital_simpleCart']||{};window[_0x72d0('0x26')][_0x72d0('0x27')]=!0x1;_0x174cd0['fn'][_0x72d0('0x23')]=function(_0x1759fa,_0x2e596f,_0x293a3e){var _0x3b4459=function(_0x3021a7,_0xee2823){if(_0x72d0('0x14')===typeof console){var _0x175401=_0x72d0('0x14')===typeof _0x3021a7;'undefined'!==typeof _0xee2823&&_0x72d0('0x28')===_0xee2823[_0x72d0('0xc')]()?_0x175401?console[_0x72d0('0x29')](_0x72d0('0x2a'),_0x3021a7[0x0],_0x3021a7[0x1],_0x3021a7[0x2],_0x3021a7[0x3],_0x3021a7[0x4],_0x3021a7[0x5],_0x3021a7[0x6],_0x3021a7[0x7]):console[_0x72d0('0x29')](_0x72d0('0x2a')+_0x3021a7):_0x72d0('0x3')!==typeof _0xee2823&&_0x72d0('0x2b')===_0xee2823['toLowerCase']()?_0x175401?console[_0x72d0('0x2b')](_0x72d0('0x2a'),_0x3021a7[0x0],_0x3021a7[0x1],_0x3021a7[0x2],_0x3021a7[0x3],_0x3021a7[0x4],_0x3021a7[0x5],_0x3021a7[0x6],_0x3021a7[0x7]):console['info']('[Simple\x20Cart]\x0a'+_0x3021a7):_0x175401?console[_0x72d0('0x11')](_0x72d0('0x2a'),_0x3021a7[0x0],_0x3021a7[0x1],_0x3021a7[0x2],_0x3021a7[0x3],_0x3021a7[0x4],_0x3021a7[0x5],_0x3021a7[0x6],_0x3021a7[0x7]):console[_0x72d0('0x11')](_0x72d0('0x2a')+_0x3021a7);}};var _0x1ffd9a=_0x174cd0(this);_0x72d0('0x14')===typeof _0x1759fa?_0x2e596f=_0x1759fa:(_0x1759fa=_0x1759fa||!0x1,_0x1ffd9a=_0x1ffd9a[_0x72d0('0x2c')](_0x174cd0[_0x72d0('0x2d')][_0x72d0('0x2e')]));if(!_0x1ffd9a[_0x72d0('0x5')])return _0x1ffd9a;_0x174cd0[_0x72d0('0x2d')][_0x72d0('0x2e')]=_0x174cd0[_0x72d0('0x2d')][_0x72d0('0x2e')]['add'](_0x1ffd9a);_0x293a3e='undefined'===typeof _0x293a3e?!0x1:_0x293a3e;var _0x37fa7f={'cartQtt':_0x72d0('0x2f'),'cartTotal':'.qd_cart_total','itemsText':_0x72d0('0x30'),'currencySymbol':(_0x174cd0(_0x72d0('0x31'))['attr'](_0x72d0('0x32'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x2c10c7=_0x174cd0[_0x72d0('0x12')]({},_0x37fa7f,_0x2e596f);var _0x500196=_0x174cd0('');_0x1ffd9a[_0x72d0('0x33')](function(){var _0x5b8ceb=_0x174cd0(this);_0x5b8ceb['data'](_0x72d0('0x34'))||_0x5b8ceb['data'](_0x72d0('0x34'),_0x2c10c7);});var _0x335ebb=function(_0x45690b){window[_0x72d0('0x35')]=window[_0x72d0('0x35')]||{};for(var _0x1759fa=0x0,_0x24c880=0x0,_0x4db51c=0x0;_0x4db51c<_0x45690b[_0x72d0('0x36')][_0x72d0('0x5')];_0x4db51c++)_0x72d0('0x37')==_0x45690b[_0x72d0('0x36')][_0x4db51c]['id']&&(_0x24c880+=_0x45690b['totalizers'][_0x4db51c][_0x72d0('0x38')]),_0x1759fa+=_0x45690b[_0x72d0('0x36')][_0x4db51c][_0x72d0('0x38')];window[_0x72d0('0x35')][_0x72d0('0x39')]=_0x2c10c7['currencySymbol']+qd_number_format(_0x1759fa/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x72d0('0x3a')]=_0x2c10c7[_0x72d0('0x3b')]+qd_number_format(_0x24c880/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x72d0('0x3c')]=_0x2c10c7[_0x72d0('0x3b')]+qd_number_format((_0x1759fa+_0x24c880)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x72d0('0x3d')]=0x0;if(_0x2c10c7[_0x72d0('0x3e')])for(_0x4db51c=0x0;_0x4db51c<_0x45690b[_0x72d0('0x3f')][_0x72d0('0x5')];_0x4db51c++)window[_0x72d0('0x35')][_0x72d0('0x3d')]+=_0x45690b[_0x72d0('0x3f')][_0x4db51c][_0x72d0('0x40')];else window[_0x72d0('0x35')][_0x72d0('0x3d')]=_0x45690b['items']['length']||0x0;try{window[_0x72d0('0x35')]['callback']&&window['_QuatroDigital_CartData'][_0x72d0('0x41')][_0x72d0('0x42')]&&window['_QuatroDigital_CartData'][_0x72d0('0x41')][_0x72d0('0x42')]();}catch(_0x44a5f6){_0x3b4459('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x26fa43(_0x500196);};var _0x511651=function(_0x36873e,_0x56a4c4){0x1===_0x36873e?_0x56a4c4[_0x72d0('0x43')]()['filter'](_0x72d0('0x44'))[_0x72d0('0x45')]():_0x56a4c4[_0x72d0('0x43')]()[_0x72d0('0x46')](_0x72d0('0x47'))[_0x72d0('0x45')]();};var _0xcfeb4c=function(_0x197455){0x1>_0x197455?_0x1ffd9a[_0x72d0('0x48')](_0x72d0('0x49')):_0x1ffd9a['removeClass'](_0x72d0('0x49'));};var _0x45008b=function(_0x5749fb,_0x4315ac){var _0x4ab2bd=parseInt(window[_0x72d0('0x35')]['qtt'],0xa);_0x4315ac['$this'][_0x72d0('0x45')]();isNaN(_0x4ab2bd)&&(_0x3b4459(_0x72d0('0x4a'),_0x72d0('0x28')),_0x4ab2bd=0x0);_0x4315ac['cartTotalE'][_0x72d0('0x4b')](window[_0x72d0('0x35')]['total']);_0x4315ac[_0x72d0('0x4c')][_0x72d0('0x4b')](_0x4ab2bd);_0x511651(_0x4ab2bd,_0x4315ac[_0x72d0('0x4d')]);_0xcfeb4c(_0x4ab2bd);};var _0x26fa43=function(_0x1fc221){_0x1ffd9a[_0x72d0('0x33')](function(){var _0x393ed7={};var _0x365f9b=_0x174cd0(this);_0x1759fa&&_0x365f9b[_0x72d0('0x4e')]('qd_simpleCartOpts')&&_0x174cd0[_0x72d0('0x12')](_0x2c10c7,_0x365f9b['data']('qd_simpleCartOpts'));_0x393ed7[_0x72d0('0x4f')]=_0x365f9b;_0x393ed7[_0x72d0('0x4c')]=_0x365f9b[_0x72d0('0x50')](_0x2c10c7['cartQtt'])||_0x500196;_0x393ed7[_0x72d0('0x51')]=_0x365f9b[_0x72d0('0x50')](_0x2c10c7[_0x72d0('0x52')])||_0x500196;_0x393ed7[_0x72d0('0x4d')]=_0x365f9b[_0x72d0('0x50')](_0x2c10c7[_0x72d0('0x53')])||_0x500196;_0x393ed7[_0x72d0('0x54')]=_0x365f9b[_0x72d0('0x50')](_0x2c10c7[_0x72d0('0x55')])||_0x500196;_0x45008b(_0x1fc221,_0x393ed7);_0x365f9b[_0x72d0('0x48')](_0x72d0('0x56'));});};(function(){if(_0x2c10c7[_0x72d0('0x57')]){window[_0x72d0('0x58')]=window[_0x72d0('0x58')]||{};if(_0x72d0('0x3')!==typeof window['_QuatroDigital_DropDown'][_0x72d0('0x25')]&&(_0x293a3e||!_0x1759fa))return _0x335ebb(window[_0x72d0('0x58')][_0x72d0('0x25')]);if(_0x72d0('0x14')!==typeof window[_0x72d0('0x59')]||_0x72d0('0x3')===typeof window[_0x72d0('0x59')][_0x72d0('0x24')])if(_0x72d0('0x14')===typeof vtex&&_0x72d0('0x14')===typeof vtex[_0x72d0('0x24')]&&'undefined'!==typeof vtex[_0x72d0('0x24')][_0x72d0('0x5a')])new vtex['checkout'][(_0x72d0('0x5a'))]();else return _0x3b4459(_0x72d0('0x5b'));_0x174cd0['QD_checkoutQueue'](['items',_0x72d0('0x36'),'shippingData'],{'done':function(_0x281f70){_0x335ebb(_0x281f70);window[_0x72d0('0x58')][_0x72d0('0x25')]=_0x281f70;},'fail':function(_0x10c1be){_0x3b4459([_0x72d0('0x5c'),_0x10c1be]);}});}else alert(_0x72d0('0x5d'));}());_0x2c10c7[_0x72d0('0x41')]();_0x174cd0(window)[_0x72d0('0x5e')](_0x72d0('0x5f'));return _0x1ffd9a;};_0x174cd0[_0x72d0('0x2d')]={'elements':_0x174cd0('')};_0x174cd0(function(){var _0x28ad38;'function'===typeof window[_0x72d0('0x60')]&&(_0x28ad38=window[_0x72d0('0x60')],window[_0x72d0('0x60')]=function(_0x1761ed,_0x12d5fe,_0xa390db,_0x5291dd,_0x102579){_0x28ad38[_0x72d0('0x61')](this,_0x1761ed,_0x12d5fe,_0xa390db,_0x5291dd,function(){_0x72d0('0xd')===typeof _0x102579&&_0x102579();_0x174cd0[_0x72d0('0x2d')]['elements']['each'](function(){var _0x182670=_0x174cd0(this);_0x182670[_0x72d0('0x23')](_0x182670[_0x72d0('0x4e')]('qd_simpleCartOpts'));});});});});var _0x448839=window[_0x72d0('0x62')]||void 0x0;window['ReloadItemsCart']=function(_0x4b1197){_0x174cd0['fn']['simpleCart'](!0x0);_0x72d0('0xd')===typeof _0x448839?_0x448839[_0x72d0('0x61')](this,_0x4b1197):alert(_0x4b1197);};_0x174cd0(function(){var _0x536dad=_0x174cd0(_0x72d0('0x63'));_0x536dad[_0x72d0('0x5')]&&_0x536dad[_0x72d0('0x23')]();});_0x174cd0(function(){_0x174cd0(window)[_0x72d0('0x64')](_0x72d0('0x65'),function(){_0x174cd0['fn'][_0x72d0('0x23')](!0x0);});});}catch(_0x17d892){_0x72d0('0x3')!==typeof console&&_0x72d0('0xd')===typeof console['error']&&console['error']('Oooops!\x20',_0x17d892);}}}());(function(){var _0x346947=function(_0x5bcea1,_0x4f166a){if(_0x72d0('0x14')===typeof console){var _0x2753a0=_0x72d0('0x14')===typeof _0x5bcea1;_0x72d0('0x3')!==typeof _0x4f166a&&_0x72d0('0x28')===_0x4f166a['toLowerCase']()?_0x2753a0?console[_0x72d0('0x29')](_0x72d0('0x66'),_0x5bcea1[0x0],_0x5bcea1[0x1],_0x5bcea1[0x2],_0x5bcea1[0x3],_0x5bcea1[0x4],_0x5bcea1[0x5],_0x5bcea1[0x6],_0x5bcea1[0x7]):console['warn'](_0x72d0('0x66')+_0x5bcea1):'undefined'!==typeof _0x4f166a&&_0x72d0('0x2b')===_0x4f166a['toLowerCase']()?_0x2753a0?console[_0x72d0('0x2b')](_0x72d0('0x66'),_0x5bcea1[0x0],_0x5bcea1[0x1],_0x5bcea1[0x2],_0x5bcea1[0x3],_0x5bcea1[0x4],_0x5bcea1[0x5],_0x5bcea1[0x6],_0x5bcea1[0x7]):console[_0x72d0('0x2b')](_0x72d0('0x66')+_0x5bcea1):_0x2753a0?console[_0x72d0('0x11')](_0x72d0('0x66'),_0x5bcea1[0x0],_0x5bcea1[0x1],_0x5bcea1[0x2],_0x5bcea1[0x3],_0x5bcea1[0x4],_0x5bcea1[0x5],_0x5bcea1[0x6],_0x5bcea1[0x7]):console[_0x72d0('0x11')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x5bcea1);}},_0xa147a1=null,_0x7e985d={},_0x2dbe0b={},_0x561db4={};$['QD_checkoutQueue']=function(_0x32a155,_0x2ed327){if(null===_0xa147a1)if(_0x72d0('0x14')===typeof window[_0x72d0('0x59')]&&_0x72d0('0x3')!==typeof window[_0x72d0('0x59')][_0x72d0('0x24')])_0xa147a1=window[_0x72d0('0x59')]['checkout'];else return _0x346947(_0x72d0('0x67'));var _0x561989=$['extend']({'done':function(){},'fail':function(){}},_0x2ed327),_0x1b6b66=_0x32a155[_0x72d0('0x68')](';'),_0x218cec=function(){_0x7e985d[_0x1b6b66]['add'](_0x561989[_0x72d0('0x69')]);_0x2dbe0b[_0x1b6b66]['add'](_0x561989[_0x72d0('0x1a')]);};_0x561db4[_0x1b6b66]?_0x218cec():(_0x7e985d[_0x1b6b66]=$[_0x72d0('0x6a')](),_0x2dbe0b[_0x1b6b66]=$['Callbacks'](),_0x218cec(),_0x561db4[_0x1b6b66]=!0x0,_0xa147a1[_0x72d0('0x25')](_0x32a155)[_0x72d0('0x69')](function(_0x59700c){_0x561db4[_0x1b6b66]=!0x1;_0x7e985d[_0x1b6b66][_0x72d0('0x42')](_0x59700c);})[_0x72d0('0x1a')](function(_0x331788){_0x561db4[_0x1b6b66]=!0x1;_0x2dbe0b[_0x1b6b66]['fire'](_0x331788);}));};}());(function(_0x1af28e){try{var _0x1d83b9=jQuery,_0x4b3cd7,_0x18b1e7=_0x1d83b9({}),_0x5dd2f5=function(_0x24fd6d,_0x19cc5d){if('object'===typeof console&&_0x72d0('0x3')!==typeof console[_0x72d0('0x11')]&&_0x72d0('0x3')!==typeof console['info']&&_0x72d0('0x3')!==typeof console[_0x72d0('0x29')]){var _0x3ceb79;_0x72d0('0x14')===typeof _0x24fd6d?(_0x24fd6d[_0x72d0('0x6b')]('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x3ceb79=_0x24fd6d):_0x3ceb79=[_0x72d0('0x6c')+_0x24fd6d];if(_0x72d0('0x3')===typeof _0x19cc5d||_0x72d0('0x28')!==_0x19cc5d['toLowerCase']()&&_0x72d0('0x6d')!==_0x19cc5d[_0x72d0('0xc')]())if(_0x72d0('0x3')!==typeof _0x19cc5d&&_0x72d0('0x2b')===_0x19cc5d['toLowerCase']())try{console['info'][_0x72d0('0x6e')](console,_0x3ceb79);}catch(_0x21e86b){try{console[_0x72d0('0x2b')](_0x3ceb79['join']('\x0a'));}catch(_0x2b5e7d){}}else try{console[_0x72d0('0x11')][_0x72d0('0x6e')](console,_0x3ceb79);}catch(_0x4cf62a){try{console[_0x72d0('0x11')](_0x3ceb79[_0x72d0('0x68')]('\x0a'));}catch(_0x44548a){}}else try{console[_0x72d0('0x29')]['apply'](console,_0x3ceb79);}catch(_0x2c1cee){try{console[_0x72d0('0x29')](_0x3ceb79[_0x72d0('0x68')]('\x0a'));}catch(_0x54d509){}}}},_0x4e35ee={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':'input.buy-in-page-quantity','selectSkuMsg':_0x72d0('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x19cc23,_0x36d307,_0x90aa04){_0x1d83b9(_0x72d0('0x70'))['is'](_0x72d0('0x71'))&&(_0x72d0('0x19')===_0x36d307?alert(_0x72d0('0x72')):(alert(_0x72d0('0x73')),(_0x72d0('0x14')===typeof parent?parent:document)['location']['href']=_0x90aa04));},'isProductPage':function(){return _0x1d83b9(_0x72d0('0x70'))['is'](_0x72d0('0x74'));},'execDefaultAction':function(_0xb0a54b){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x1d83b9[_0x72d0('0x75')]=function(_0x417fa7,_0xaf2173){function _0xb1ec74(_0x29762b){_0x4b3cd7[_0x72d0('0x76')]?_0x29762b['data'](_0x72d0('0x77'))||(_0x29762b[_0x72d0('0x4e')]('qd-bb-click-active',0x1),_0x29762b['on'](_0x72d0('0x78'),function(_0x3a420f){if(!_0x4b3cd7[_0x72d0('0x79')]())return!0x0;if(!0x0!==_0x1de4c[_0x72d0('0x7a')][_0x72d0('0x61')](this))return _0x3a420f['preventDefault'](),!0x1;})):alert(_0x72d0('0x7b'));}function _0x2b4bd2(_0x5490b8){_0x5490b8=_0x5490b8||_0x1d83b9(_0x4b3cd7[_0x72d0('0x7c')]);_0x5490b8['each'](function(){var _0x5490b8=_0x1d83b9(this);_0x5490b8['is'](_0x72d0('0x7d'))||(_0x5490b8[_0x72d0('0x48')]('qd-sbb-on'),_0x5490b8['is'](_0x72d0('0x7e'))&&!_0x5490b8['is'](_0x72d0('0x7f'))||_0x5490b8[_0x72d0('0x4e')]('qd-bb-active')||(_0x5490b8[_0x72d0('0x4e')]('qd-bb-active',0x1),_0x5490b8[_0x72d0('0x80')](_0x72d0('0x81'))[_0x72d0('0x5')]||_0x5490b8[_0x72d0('0x82')](_0x72d0('0x83')),_0x5490b8['is'](_0x72d0('0x84'))&&_0x4b3cd7['isProductPage']()&&_0x745ff8[_0x72d0('0x61')](_0x5490b8),_0xb1ec74(_0x5490b8)));});_0x4b3cd7[_0x72d0('0x85')]()&&!_0x5490b8[_0x72d0('0x5')]&&_0x5dd2f5(_0x72d0('0x86')+_0x5490b8[_0x72d0('0x87')]+'\x27.',_0x72d0('0x2b'));}var _0x6bc45c=_0x1d83b9(_0x417fa7);var _0x1de4c=this;window[_0x72d0('0x88')]=window[_0x72d0('0x88')]||{};window[_0x72d0('0x35')]=window[_0x72d0('0x35')]||{};_0x1de4c['prodAdd']=function(_0x176dc4,_0x1c08d7){_0x6bc45c[_0x72d0('0x48')](_0x72d0('0x89'));_0x1d83b9('body')[_0x72d0('0x48')](_0x72d0('0x8a'));var _0x4def01=_0x1d83b9(_0x4b3cd7[_0x72d0('0x7c')])['filter']('[href=\x27'+(_0x176dc4['attr']('href')||_0x72d0('0x8b'))+'\x27]')[_0x72d0('0x2c')](_0x176dc4);_0x4def01[_0x72d0('0x48')](_0x72d0('0x8c'));setTimeout(function(){_0x6bc45c[_0x72d0('0x8d')](_0x72d0('0x8e'));_0x4def01['removeClass'](_0x72d0('0x8c'));},_0x4b3cd7[_0x72d0('0x8f')]);window[_0x72d0('0x88')][_0x72d0('0x25')]=void 0x0;if('undefined'!==typeof _0xaf2173&&_0x72d0('0xd')===typeof _0xaf2173['getCartInfoByUrl'])return _0x4b3cd7[_0x72d0('0x76')]||(_0x5dd2f5(_0x72d0('0x90')),_0xaf2173[_0x72d0('0x91')]()),window[_0x72d0('0x58')][_0x72d0('0x25')]=void 0x0,_0xaf2173[_0x72d0('0x91')](function(_0x4c2d4c){window[_0x72d0('0x88')][_0x72d0('0x25')]=_0x4c2d4c;_0x1d83b9['fn']['simpleCart'](!0x0,void 0x0,!0x0);},{'lastSku':_0x1c08d7});window[_0x72d0('0x88')][_0x72d0('0x92')]=!0x0;_0x1d83b9['fn'][_0x72d0('0x23')](!0x0);};(function(){if(_0x4b3cd7['isSmartCheckout']&&_0x4b3cd7['autoWatchBuyButton']){var _0x5cfab2=_0x1d83b9(_0x72d0('0x7e'));_0x5cfab2[_0x72d0('0x5')]&&_0x2b4bd2(_0x5cfab2);}}());var _0x745ff8=function(){var _0x4f8e08=_0x1d83b9(this);_0x72d0('0x3')!==typeof _0x4f8e08[_0x72d0('0x4e')](_0x72d0('0x7c'))?(_0x4f8e08[_0x72d0('0x93')](_0x72d0('0x94')),_0xb1ec74(_0x4f8e08)):(_0x4f8e08['bind'](_0x72d0('0x95'),function(_0x42e15b){_0x4f8e08['unbind'](_0x72d0('0x94'));_0xb1ec74(_0x4f8e08);_0x1d83b9(this)[_0x72d0('0x93')](_0x42e15b);}),_0x1d83b9(window)['load'](function(){_0x4f8e08[_0x72d0('0x93')](_0x72d0('0x94'));_0xb1ec74(_0x4f8e08);_0x4f8e08['unbind'](_0x72d0('0x95'));}));};_0x1de4c[_0x72d0('0x7a')]=function(){var _0xeea447=_0x1d83b9(this),_0x417fa7=_0xeea447[_0x72d0('0x96')](_0x72d0('0x97'))||'';if(-0x1<_0x417fa7[_0x72d0('0x98')](_0x4b3cd7[_0x72d0('0x99')]))return!0x0;_0x417fa7=_0x417fa7[_0x72d0('0x1')](/redirect\=(false|true)/gi,'')[_0x72d0('0x1')]('?',_0x72d0('0x9a'))[_0x72d0('0x1')](/\&\&/gi,'&');if(_0x4b3cd7[_0x72d0('0x9b')](_0xeea447))return _0xeea447[_0x72d0('0x96')](_0x72d0('0x97'),_0x417fa7[_0x72d0('0x1')]('redirect=false',_0x72d0('0x9c'))),!0x0;_0x417fa7=_0x417fa7['replace'](/http.?:/i,'');_0x18b1e7['queue'](function(_0x3a6762){if(!_0x4b3cd7[_0x72d0('0x9d')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x72d0('0x9e')](_0x417fa7))return _0x3a6762();var _0xf937ea=function(_0x1441f4,_0x19b20f){var _0x2b4bd2=_0x417fa7['match'](/sku\=([0-9]+)/gi),_0x47b834=[];if(_0x72d0('0x14')===typeof _0x2b4bd2&&null!==_0x2b4bd2)for(var _0x5114df=_0x2b4bd2['length']-0x1;0x0<=_0x5114df;_0x5114df--){var _0x391e75=parseInt(_0x2b4bd2[_0x5114df][_0x72d0('0x1')](/sku\=/gi,''));isNaN(_0x391e75)||_0x47b834['push'](_0x391e75);}_0x4b3cd7[_0x72d0('0x9f')][_0x72d0('0x61')](this,_0x1441f4,_0x19b20f,_0x417fa7);_0x1de4c['buyButtonClickCallback'][_0x72d0('0x61')](this,_0x1441f4,_0x19b20f,_0x417fa7,_0x47b834);_0x1de4c['prodAdd'](_0xeea447,_0x417fa7[_0x72d0('0xa0')]('ku=')[_0x72d0('0xa1')]()[_0x72d0('0xa0')]('&')[_0x72d0('0xa2')]());_0x72d0('0xd')===typeof _0x4b3cd7['asyncCallback']&&_0x4b3cd7['asyncCallback']['call'](this);_0x1d83b9(window)[_0x72d0('0x5e')](_0x72d0('0xa3'));_0x1d83b9(window)[_0x72d0('0x5e')](_0x72d0('0xa4'));};_0x4b3cd7[_0x72d0('0xa5')]?(_0xf937ea(null,_0x72d0('0x19')),_0x3a6762()):_0x1d83b9['ajax']({'url':_0x417fa7,'complete':_0xf937ea})['always'](function(){_0x3a6762();});});};_0x1de4c[_0x72d0('0xa6')]=function(_0x8ae3a9,_0x595679,_0x5f362e,_0x126b6d){try{'success'===_0x595679&&_0x72d0('0x14')===typeof window[_0x72d0('0xa7')]&&_0x72d0('0xd')===typeof window['parent'][_0x72d0('0xa8')]&&window[_0x72d0('0xa7')]['_QuatroDigital_prodBuyCallback'](_0x8ae3a9,_0x595679,_0x5f362e,_0x126b6d);}catch(_0x181da1){_0x5dd2f5(_0x72d0('0xa9'));}};_0x2b4bd2();_0x72d0('0xd')===typeof _0x4b3cd7[_0x72d0('0x41')]?_0x4b3cd7[_0x72d0('0x41')][_0x72d0('0x61')](this):_0x5dd2f5(_0x72d0('0xaa'));};var _0x2373af=_0x1d83b9['Callbacks']();_0x1d83b9['fn'][_0x72d0('0x75')]=function(_0x2cc94b,_0x209ac7){var _0x1af28e=_0x1d83b9(this);'undefined'!==typeof _0x209ac7||'object'!==typeof _0x2cc94b||_0x2cc94b instanceof _0x1d83b9||(_0x209ac7=_0x2cc94b,_0x2cc94b=void 0x0);_0x4b3cd7=_0x1d83b9[_0x72d0('0x12')]({},_0x4e35ee,_0x209ac7);var _0x8a314a;_0x2373af[_0x72d0('0x2c')](function(){_0x1af28e['children'](_0x72d0('0xab'))[_0x72d0('0x5')]||_0x1af28e[_0x72d0('0xac')](_0x72d0('0xad'));_0x8a314a=new _0x1d83b9[(_0x72d0('0x75'))](_0x1af28e,_0x2cc94b);});_0x2373af[_0x72d0('0x42')]();_0x1d83b9(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x3243b2,_0x299fb4,_0xba2faf){_0x8a314a[_0x72d0('0xae')](_0x299fb4,_0xba2faf);});return _0x1d83b9[_0x72d0('0x12')](_0x1af28e,_0x8a314a);};var _0x5515a0=0x0;_0x1d83b9(document)[_0x72d0('0xaf')](function(_0x4c91ea,_0xf3c9ff,_0x375176){-0x1<_0x375176[_0x72d0('0x16')][_0x72d0('0xc')]()[_0x72d0('0x98')](_0x72d0('0xb0'))&&(_0x5515a0=(_0x375176[_0x72d0('0x16')][_0x72d0('0xb1')](/sku\=([0-9]+)/i)||[''])['pop']());});_0x1d83b9(window)[_0x72d0('0x64')](_0x72d0('0xb2'),function(){_0x1d83b9(window)[_0x72d0('0x5e')](_0x72d0('0xb3'),[new _0x1d83b9(),_0x5515a0]);});_0x1d83b9(document)[_0x72d0('0xb4')](function(){_0x2373af[_0x72d0('0x42')]();});}catch(_0x250b22){_0x72d0('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x72d0('0x11')](_0x72d0('0xb5'),_0x250b22);}}(this));function qd_number_format(_0x5886f1,_0x5bea32,_0x596a8d,_0x2dd51c){_0x5886f1=(_0x5886f1+'')[_0x72d0('0x1')](/[^0-9+\-Ee.]/g,'');_0x5886f1=isFinite(+_0x5886f1)?+_0x5886f1:0x0;_0x5bea32=isFinite(+_0x5bea32)?Math[_0x72d0('0x2')](_0x5bea32):0x0;_0x2dd51c=_0x72d0('0x3')===typeof _0x2dd51c?',':_0x2dd51c;_0x596a8d=_0x72d0('0x3')===typeof _0x596a8d?'.':_0x596a8d;var _0x3ce444='',_0x3ce444=function(_0x425698,_0x32c280){var _0x5450c7=Math[_0x72d0('0xb6')](0xa,_0x32c280);return''+(Math[_0x72d0('0x4')](_0x425698*_0x5450c7)/_0x5450c7)[_0x72d0('0xb7')](_0x32c280);},_0x3ce444=(_0x5bea32?_0x3ce444(_0x5886f1,_0x5bea32):''+Math[_0x72d0('0x4')](_0x5886f1))[_0x72d0('0xa0')]('.');0x3<_0x3ce444[0x0][_0x72d0('0x5')]&&(_0x3ce444[0x0]=_0x3ce444[0x0][_0x72d0('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2dd51c));(_0x3ce444[0x1]||'')['length']<_0x5bea32&&(_0x3ce444[0x1]=_0x3ce444[0x1]||'',_0x3ce444[0x1]+=Array(_0x5bea32-_0x3ce444[0x1][_0x72d0('0x5')]+0x1)[_0x72d0('0x68')]('0'));return _0x3ce444[_0x72d0('0x68')](_0x596a8d);}(function(){try{window[_0x72d0('0x35')]=window[_0x72d0('0x35')]||{},window[_0x72d0('0x35')][_0x72d0('0x41')]=window[_0x72d0('0x35')]['callback']||$[_0x72d0('0x6a')]();}catch(_0x423bf5){_0x72d0('0x3')!==typeof console&&'function'===typeof console['error']&&console['error'](_0x72d0('0xb5'),_0x423bf5[_0x72d0('0x1e')]);}}());(function(_0x40ce29){try{var _0x37b25d=jQuery,_0x33f5df=function(_0x415139,_0x33d29a){if(_0x72d0('0x14')===typeof console&&_0x72d0('0x3')!==typeof console[_0x72d0('0x11')]&&_0x72d0('0x3')!==typeof console['info']&&_0x72d0('0x3')!==typeof console[_0x72d0('0x29')]){var _0x490d8f;_0x72d0('0x14')===typeof _0x415139?(_0x415139['unshift'](_0x72d0('0xb8')),_0x490d8f=_0x415139):_0x490d8f=[_0x72d0('0xb8')+_0x415139];if(_0x72d0('0x3')===typeof _0x33d29a||_0x72d0('0x28')!==_0x33d29a[_0x72d0('0xc')]()&&_0x72d0('0x6d')!==_0x33d29a[_0x72d0('0xc')]())if(_0x72d0('0x3')!==typeof _0x33d29a&&'info'===_0x33d29a[_0x72d0('0xc')]())try{console[_0x72d0('0x2b')][_0x72d0('0x6e')](console,_0x490d8f);}catch(_0x1609c7){try{console[_0x72d0('0x2b')](_0x490d8f['join']('\x0a'));}catch(_0x4d93a5){}}else try{console['error'][_0x72d0('0x6e')](console,_0x490d8f);}catch(_0x14ba89){try{console[_0x72d0('0x11')](_0x490d8f[_0x72d0('0x68')]('\x0a'));}catch(_0x2abe64){}}else try{console[_0x72d0('0x29')][_0x72d0('0x6e')](console,_0x490d8f);}catch(_0x35b935){try{console[_0x72d0('0x29')](_0x490d8f[_0x72d0('0x68')]('\x0a'));}catch(_0x1bca0f){}}}};window[_0x72d0('0x58')]=window[_0x72d0('0x58')]||{};window[_0x72d0('0x58')][_0x72d0('0x92')]=!0x0;_0x37b25d[_0x72d0('0xb9')]=function(){};_0x37b25d['fn']['QD_dropDownCart']=function(){return{'fn':new _0x37b25d()};};var _0xc2d199=function(_0x363f23){var _0x293f21={'n':_0x72d0('0xba')};return function(_0x11f0b2){var _0x5398f0=function(_0x444b67){return _0x444b67;};var _0x190cd1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x11f0b2=_0x11f0b2['d'+_0x190cd1[0x10]+'c'+_0x190cd1[0x11]+'m'+_0x5398f0(_0x190cd1[0x1])+'n'+_0x190cd1[0xd]]['l'+_0x190cd1[0x12]+'c'+_0x190cd1[0x0]+'ti'+_0x5398f0('o')+'n'];var _0x1f5ed6=function(_0xb09f8c){return escape(encodeURIComponent(_0xb09f8c[_0x72d0('0x1')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x2b97bd){return String['fromCharCode'](('Z'>=_0x2b97bd?0x5a:0x7a)>=(_0x2b97bd=_0x2b97bd['charCodeAt'](0x0)+0xd)?_0x2b97bd:_0x2b97bd-0x1a);})));};var _0x40ce29=_0x1f5ed6(_0x11f0b2[[_0x190cd1[0x9],_0x5398f0('o'),_0x190cd1[0xc],_0x190cd1[_0x5398f0(0xd)]][_0x72d0('0x68')]('')]);_0x1f5ed6=_0x1f5ed6((window[['js',_0x5398f0('no'),'m',_0x190cd1[0x1],_0x190cd1[0x4]['toUpperCase'](),_0x72d0('0xbb')][_0x72d0('0x68')]('')]||_0x72d0('0x8b'))+['.v',_0x190cd1[0xd],'e',_0x5398f0('x'),'co',_0x5398f0('mm'),'erc',_0x190cd1[0x1],'.c',_0x5398f0('o'),'m.',_0x190cd1[0x13],'r'][_0x72d0('0x68')](''));for(var _0x25d6d7 in _0x293f21){if(_0x1f5ed6===_0x25d6d7+_0x293f21[_0x25d6d7]||_0x40ce29===_0x25d6d7+_0x293f21[_0x25d6d7]){var _0x5e66d9='tr'+_0x190cd1[0x11]+'e';break;}_0x5e66d9='f'+_0x190cd1[0x0]+'ls'+_0x5398f0(_0x190cd1[0x1])+'';}_0x5398f0=!0x1;-0x1<_0x11f0b2[[_0x190cd1[0xc],'e',_0x190cd1[0x0],'rc',_0x190cd1[0x9]][_0x72d0('0x68')]('')]['indexOf'](_0x72d0('0xbc'))&&(_0x5398f0=!0x0);return[_0x5e66d9,_0x5398f0];}(_0x363f23);}(window);if(!eval(_0xc2d199[0x0]))return _0xc2d199[0x1]?_0x33f5df(_0x72d0('0xbd')):!0x1;_0x37b25d['QD_dropDownCart']=function(_0x21708a,_0x303675){var _0x339855=_0x37b25d(_0x21708a);if(!_0x339855[_0x72d0('0x5')])return _0x339855;var _0x2b6b68=_0x37b25d[_0x72d0('0x12')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x72d0('0xbe'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x72d0('0xbf'),'shippingForm':_0x72d0('0xc0')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x4d4bd3){return _0x4d4bd3[_0x72d0('0xc1')]||_0x4d4bd3[_0x72d0('0xc2')];},'callback':function(){},'callbackProductsList':function(){}},_0x303675);_0x37b25d('');var _0x4eddc0=this;if(_0x2b6b68[_0x72d0('0x57')]){var _0x25e2c1=!0x1;_0x72d0('0x3')===typeof window[_0x72d0('0x59')]&&(_0x33f5df(_0x72d0('0xc3')),_0x37b25d[_0x72d0('0x18')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x72d0('0xc4'),'error':function(){_0x33f5df(_0x72d0('0xc5'));_0x25e2c1=!0x0;}}));if(_0x25e2c1)return _0x33f5df(_0x72d0('0xc6'));}if(_0x72d0('0x14')===typeof window[_0x72d0('0x59')]&&_0x72d0('0x3')!==typeof window[_0x72d0('0x59')]['checkout'])var _0x1124d7=window['vtexjs'][_0x72d0('0x24')];else if(_0x72d0('0x14')===typeof vtex&&_0x72d0('0x14')===typeof vtex['checkout']&&_0x72d0('0x3')!==typeof vtex[_0x72d0('0x24')][_0x72d0('0x5a')])_0x1124d7=new vtex[(_0x72d0('0x24'))][(_0x72d0('0x5a'))]();else return _0x33f5df('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x4eddc0[_0x72d0('0xc7')]=_0x72d0('0xc8');var _0xb25c45=function(_0x5ce20e){_0x37b25d(this)[_0x72d0('0x82')](_0x5ce20e);_0x5ce20e[_0x72d0('0x50')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')['add'](_0x37b25d(_0x72d0('0xc9')))['on']('click.qd_ddc_closeFn',function(){_0x339855[_0x72d0('0x8d')](_0x72d0('0xca'));_0x37b25d(document[_0x72d0('0x70')])['removeClass'](_0x72d0('0x8a'));});_0x37b25d(document)[_0x72d0('0xcb')](_0x72d0('0xcc'))['on']('keyup.qd_ddc_closeFn',function(_0x1bc9e7){0x1b==_0x1bc9e7[_0x72d0('0xcd')]&&(_0x339855[_0x72d0('0x8d')](_0x72d0('0xca')),_0x37b25d(document[_0x72d0('0x70')])[_0x72d0('0x8d')]('qd-bb-lightBoxBodyProdAdd'));});var _0xb22914=_0x5ce20e[_0x72d0('0x50')](_0x72d0('0xce'));_0x5ce20e[_0x72d0('0x50')](_0x72d0('0xcf'))['on'](_0x72d0('0xd0'),function(){_0x4eddc0[_0x72d0('0xd1')]('-',void 0x0,void 0x0,_0xb22914);return!0x1;});_0x5ce20e['find'](_0x72d0('0xd2'))['on'](_0x72d0('0xd3'),function(){_0x4eddc0[_0x72d0('0xd1')](void 0x0,void 0x0,void 0x0,_0xb22914);return!0x1;});_0x5ce20e[_0x72d0('0x50')](_0x72d0('0xd4'))[_0x72d0('0xd5')]('')['on']('keyup.qd_ddc_cep',function(){_0x4eddc0[_0x72d0('0xd6')](_0x37b25d(this));});if(_0x2b6b68[_0x72d0('0xd7')]){var _0x303675=0x0;_0x37b25d(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x5ce20e=function(){window[_0x72d0('0x58')][_0x72d0('0x92')]&&(_0x4eddc0['getCartInfoByUrl'](),window['_QuatroDigital_DropDown'][_0x72d0('0x92')]=!0x1,_0x37b25d['fn']['simpleCart'](!0x0),_0x4eddc0[_0x72d0('0xd8')]());};_0x303675=setInterval(function(){_0x5ce20e();},0x258);_0x5ce20e();});_0x37b25d(this)['on'](_0x72d0('0xd9'),function(){clearInterval(_0x303675);});}};var _0x26a647=function(_0x3fd666){_0x3fd666=_0x37b25d(_0x3fd666);_0x2b6b68[_0x72d0('0xda')][_0x72d0('0x52')]=_0x2b6b68[_0x72d0('0xda')][_0x72d0('0x52')][_0x72d0('0x1')](_0x72d0('0xdb'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x2b6b68[_0x72d0('0xda')][_0x72d0('0x52')]=_0x2b6b68[_0x72d0('0xda')][_0x72d0('0x52')][_0x72d0('0x1')]('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x2b6b68[_0x72d0('0xda')][_0x72d0('0x52')]=_0x2b6b68[_0x72d0('0xda')][_0x72d0('0x52')][_0x72d0('0x1')](_0x72d0('0xdc'),_0x72d0('0xdd'));_0x2b6b68[_0x72d0('0xda')]['cartTotal']=_0x2b6b68[_0x72d0('0xda')][_0x72d0('0x52')]['replace'](_0x72d0('0xde'),_0x72d0('0xdf'));_0x3fd666[_0x72d0('0x50')](_0x72d0('0xe0'))['html'](_0x2b6b68[_0x72d0('0xda')][_0x72d0('0xe1')]);_0x3fd666[_0x72d0('0x50')](_0x72d0('0xe2'))[_0x72d0('0x4b')](_0x2b6b68[_0x72d0('0xda')][_0x72d0('0xe3')]);_0x3fd666[_0x72d0('0x50')](_0x72d0('0xe4'))[_0x72d0('0x4b')](_0x2b6b68['texts'][_0x72d0('0xe5')]);_0x3fd666['find'](_0x72d0('0xe6'))[_0x72d0('0x4b')](_0x2b6b68[_0x72d0('0xda')]['cartTotal']);_0x3fd666[_0x72d0('0x50')](_0x72d0('0xe7'))[_0x72d0('0x4b')](_0x2b6b68[_0x72d0('0xda')][_0x72d0('0xe8')]);_0x3fd666['find']('.qd-ddc-emptyCart\x20p')[_0x72d0('0x4b')](_0x2b6b68[_0x72d0('0xda')][_0x72d0('0x55')]);return _0x3fd666;}(this[_0x72d0('0xc7')]);var _0x12ef9c=0x0;_0x339855['each'](function(){0x0<_0x12ef9c?_0xb25c45[_0x72d0('0x61')](this,_0x26a647['clone']()):_0xb25c45['call'](this,_0x26a647);_0x12ef9c++;});window[_0x72d0('0x35')][_0x72d0('0x41')][_0x72d0('0x2c')](function(){_0x37b25d(_0x72d0('0xe9'))['html'](window['_QuatroDigital_CartData']['total']||'--');_0x37b25d('.qd-ddc-infoTotalItems')[_0x72d0('0x4b')](window[_0x72d0('0x35')][_0x72d0('0x3d')]||'0');_0x37b25d(_0x72d0('0xea'))[_0x72d0('0x4b')](window['_QuatroDigital_CartData'][_0x72d0('0x3a')]||'--');_0x37b25d(_0x72d0('0xeb'))[_0x72d0('0x4b')](window[_0x72d0('0x35')][_0x72d0('0x3c')]||'--');});var _0x158489=function(_0x3142c4,_0x4b7898){if('undefined'===typeof _0x3142c4[_0x72d0('0x3f')])return _0x33f5df(_0x72d0('0xec'));_0x4eddc0[_0x72d0('0xed')][_0x72d0('0x61')](this,_0x4b7898);};_0x4eddc0['getCartInfoByUrl']=function(_0x1c016a,_0x68001d){_0x72d0('0x3')!=typeof _0x68001d?window[_0x72d0('0x58')][_0x72d0('0xee')]=_0x68001d:window[_0x72d0('0x58')]['dataOptionsCache']&&(_0x68001d=window['_QuatroDigital_DropDown'][_0x72d0('0xee')]);setTimeout(function(){window[_0x72d0('0x58')][_0x72d0('0xee')]=void 0x0;},_0x2b6b68[_0x72d0('0x8f')]);_0x37b25d(_0x72d0('0xef'))['removeClass'](_0x72d0('0xf0'));if(_0x2b6b68['smartCheckout']){var _0x303675=function(_0x30ab24){window[_0x72d0('0x58')][_0x72d0('0x25')]=_0x30ab24;_0x158489(_0x30ab24,_0x68001d);_0x72d0('0x3')!==typeof window[_0x72d0('0xf1')]&&_0x72d0('0xd')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window['_QuatroDigital_AmountProduct'][_0x72d0('0xf2')][_0x72d0('0x61')](this);_0x37b25d(_0x72d0('0xef'))['addClass'](_0x72d0('0xf0'));};_0x72d0('0x3')!==typeof window[_0x72d0('0x58')][_0x72d0('0x25')]?(_0x303675(window['_QuatroDigital_DropDown']['getOrderForm']),'function'===typeof _0x1c016a&&_0x1c016a(window['_QuatroDigital_DropDown'][_0x72d0('0x25')])):_0x37b25d[_0x72d0('0xf3')]([_0x72d0('0x3f'),_0x72d0('0x36'),_0x72d0('0xf4')],{'done':function(_0x165b43){_0x303675['call'](this,_0x165b43);'function'===typeof _0x1c016a&&_0x1c016a(_0x165b43);},'fail':function(_0x319546){_0x33f5df([_0x72d0('0xf5'),_0x319546]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x4eddc0[_0x72d0('0xd8')]=function(){var _0x3e6a51=_0x37b25d(_0x72d0('0xef'));_0x3e6a51[_0x72d0('0x50')](_0x72d0('0xf6'))[_0x72d0('0x5')]?_0x3e6a51['removeClass'](_0x72d0('0xf7')):_0x3e6a51[_0x72d0('0x48')](_0x72d0('0xf7'));};_0x4eddc0[_0x72d0('0xed')]=function(_0x372504){var _0x303675=_0x37b25d(_0x72d0('0xf8'));_0x303675['empty']();_0x303675['each'](function(){var _0x303675=_0x37b25d(this),_0x21708a,_0x13471f,_0x2753d0=_0x37b25d(''),_0x132a41;for(_0x132a41 in window[_0x72d0('0x58')][_0x72d0('0x25')][_0x72d0('0x3f')])if(_0x72d0('0x14')===typeof window[_0x72d0('0x58')]['getOrderForm'][_0x72d0('0x3f')][_0x132a41]){var _0x3f2eb5=window[_0x72d0('0x58')]['getOrderForm'][_0x72d0('0x3f')][_0x132a41];var _0x3cfae6=_0x3f2eb5[_0x72d0('0xf9')][_0x72d0('0x1')](/^\/|\/$/g,'')[_0x72d0('0xa0')]('/');var _0x21e146=_0x37b25d('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x21e146[_0x72d0('0x96')]({'data-sku':_0x3f2eb5['id'],'data-sku-index':_0x132a41,'data-qd-departament':_0x3cfae6[0x0],'data-qd-category':_0x3cfae6[_0x3cfae6[_0x72d0('0x5')]-0x1]});_0x21e146[_0x72d0('0x48')]('qd-ddc-'+_0x3f2eb5[_0x72d0('0xfa')]);_0x21e146[_0x72d0('0x50')](_0x72d0('0xfb'))['append'](_0x2b6b68[_0x72d0('0xc1')](_0x3f2eb5));_0x21e146['find'](_0x72d0('0xfc'))['append'](isNaN(_0x3f2eb5[_0x72d0('0xfd')])?_0x3f2eb5[_0x72d0('0xfd')]:0x0==_0x3f2eb5[_0x72d0('0xfd')]?_0x72d0('0xfe'):(_0x37b25d(_0x72d0('0x31'))[_0x72d0('0x96')](_0x72d0('0x32'))||'R$')+'\x20'+qd_number_format(_0x3f2eb5[_0x72d0('0xfd')]/0x64,0x2,',','.'));_0x21e146[_0x72d0('0x50')](_0x72d0('0xff'))[_0x72d0('0x96')]({'data-sku':_0x3f2eb5['id'],'data-sku-index':_0x132a41})[_0x72d0('0xd5')](_0x3f2eb5[_0x72d0('0x40')]);_0x21e146['find'](_0x72d0('0x100'))[_0x72d0('0x96')]({'data-sku':_0x3f2eb5['id'],'data-sku-index':_0x132a41});_0x4eddc0['insertProdImg'](_0x3f2eb5['id'],_0x21e146[_0x72d0('0x50')](_0x72d0('0x101')),_0x3f2eb5[_0x72d0('0x102')]);_0x21e146[_0x72d0('0x50')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x72d0('0x96')]({'data-sku':_0x3f2eb5['id'],'data-sku-index':_0x132a41});_0x21e146[_0x72d0('0x103')](_0x303675);_0x2753d0=_0x2753d0['add'](_0x21e146);}try{var _0x184840=_0x303675[_0x72d0('0x0')](_0x72d0('0xef'))[_0x72d0('0x50')](_0x72d0('0xd4'));_0x184840[_0x72d0('0x5')]&&''==_0x184840[_0x72d0('0xd5')]()&&window['_QuatroDigital_DropDown'][_0x72d0('0x25')][_0x72d0('0xf4')][_0x72d0('0x104')]&&_0x184840[_0x72d0('0xd5')](window[_0x72d0('0x58')][_0x72d0('0x25')][_0x72d0('0xf4')][_0x72d0('0x104')]['postalCode']);}catch(_0x1eff48){_0x33f5df(_0x72d0('0x105')+_0x1eff48[_0x72d0('0x1e')],'aviso');}_0x4eddc0[_0x72d0('0x106')](_0x303675);_0x4eddc0['cartIsEmpty']();_0x372504&&_0x372504[_0x72d0('0x107')]&&function(){_0x13471f=_0x2753d0['filter']('[data-sku=\x27'+_0x372504[_0x72d0('0x107')]+'\x27]');_0x13471f[_0x72d0('0x5')]&&(_0x21708a=0x0,_0x2753d0['each'](function(){var _0x372504=_0x37b25d(this);if(_0x372504['is'](_0x13471f))return!0x1;_0x21708a+=_0x372504[_0x72d0('0x108')]();}),_0x4eddc0[_0x72d0('0xd1')](void 0x0,void 0x0,_0x21708a,_0x303675[_0x72d0('0x2c')](_0x303675[_0x72d0('0xa7')]())),_0x2753d0['removeClass'](_0x72d0('0x109')),function(_0x28b623){_0x28b623[_0x72d0('0x48')](_0x72d0('0x10a'));_0x28b623[_0x72d0('0x48')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x28b623[_0x72d0('0x8d')]('qd-ddc-lastAdded');},_0x2b6b68[_0x72d0('0x8f')]);}(_0x13471f));}();});(function(){_QuatroDigital_DropDown[_0x72d0('0x25')][_0x72d0('0x3f')][_0x72d0('0x5')]?(_0x37b25d('body')[_0x72d0('0x8d')](_0x72d0('0x10b'))['addClass'](_0x72d0('0x10c')),setTimeout(function(){_0x37b25d('body')[_0x72d0('0x8d')]('qd-ddc-product-add-time');},_0x2b6b68[_0x72d0('0x8f')])):_0x37b25d(_0x72d0('0x70'))[_0x72d0('0x8d')](_0x72d0('0x10d'))[_0x72d0('0x48')](_0x72d0('0x10b'));}());'function'===typeof _0x2b6b68[_0x72d0('0x10e')]?_0x2b6b68[_0x72d0('0x10e')][_0x72d0('0x61')](this):_0x33f5df('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x4eddc0[_0x72d0('0x10f')]=function(_0x680ee8,_0x383080,_0x584f95){function _0x153f2b(){_0x383080[_0x72d0('0x8d')](_0x72d0('0x110'))[_0x72d0('0x111')](function(){_0x37b25d(this)['addClass'](_0x72d0('0x110'));})['attr'](_0x72d0('0x112'),_0x584f95);}_0x584f95?_0x153f2b():isNaN(_0x680ee8)?_0x33f5df(_0x72d0('0x113'),_0x72d0('0x28')):alert(_0x72d0('0x114'));};_0x4eddc0[_0x72d0('0x106')]=function(_0x11bab4){var _0x44bf11=function(_0x4886e4,_0xf7dbff){var _0x303675=_0x37b25d(_0x4886e4);var _0x61b419=_0x303675[_0x72d0('0x96')](_0x72d0('0x115'));var _0x21708a=_0x303675[_0x72d0('0x96')](_0x72d0('0x116'));if(_0x61b419){var _0x366ef3=parseInt(_0x303675[_0x72d0('0xd5')]())||0x1;_0x4eddc0[_0x72d0('0x117')]([_0x61b419,_0x21708a],_0x366ef3,_0x366ef3+0x1,function(_0x1632c9){_0x303675[_0x72d0('0xd5')](_0x1632c9);'function'===typeof _0xf7dbff&&_0xf7dbff();});}};var _0x303675=function(_0x22acdf,_0x4d0ca9){var _0x303675=_0x37b25d(_0x22acdf);var _0x1918a7=_0x303675['attr'](_0x72d0('0x115'));var _0x21708a=_0x303675[_0x72d0('0x96')](_0x72d0('0x116'));if(_0x1918a7){var _0x2daa8d=parseInt(_0x303675[_0x72d0('0xd5')]())||0x2;_0x4eddc0['changeQantity']([_0x1918a7,_0x21708a],_0x2daa8d,_0x2daa8d-0x1,function(_0x44acdd){_0x303675['val'](_0x44acdd);_0x72d0('0xd')===typeof _0x4d0ca9&&_0x4d0ca9();});}};var _0x394440=function(_0x50d0f7,_0x5b7514){var _0x303675=_0x37b25d(_0x50d0f7);var _0x4ab3eb=_0x303675[_0x72d0('0x96')](_0x72d0('0x115'));var _0x21708a=_0x303675[_0x72d0('0x96')]('data-sku-index');if(_0x4ab3eb){var _0x5078f8=parseInt(_0x303675[_0x72d0('0xd5')]())||0x1;_0x4eddc0['changeQantity']([_0x4ab3eb,_0x21708a],0x1,_0x5078f8,function(_0x239fb8){_0x303675[_0x72d0('0xd5')](_0x239fb8);_0x72d0('0xd')===typeof _0x5b7514&&_0x5b7514();});}};var _0x21708a=_0x11bab4['find']('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x21708a[_0x72d0('0x48')]('qd_on')[_0x72d0('0x33')](function(){var _0x11bab4=_0x37b25d(this);_0x11bab4[_0x72d0('0x50')](_0x72d0('0x118'))['on']('click.qd_ddc_more',function(_0x433e41){_0x433e41[_0x72d0('0x119')]();_0x21708a[_0x72d0('0x48')](_0x72d0('0x11a'));_0x44bf11(_0x11bab4[_0x72d0('0x50')]('.qd-ddc-quantity'),function(){_0x21708a[_0x72d0('0x8d')]('qd-loading');});});_0x11bab4['find']('.qd-ddc-quantityMinus')['on'](_0x72d0('0x11b'),function(_0xa283ab){_0xa283ab[_0x72d0('0x119')]();_0x21708a[_0x72d0('0x48')]('qd-loading');_0x303675(_0x11bab4['find'](_0x72d0('0xff')),function(){_0x21708a[_0x72d0('0x8d')]('qd-loading');});});_0x11bab4[_0x72d0('0x50')](_0x72d0('0xff'))['on'](_0x72d0('0x11c'),function(){_0x21708a[_0x72d0('0x48')](_0x72d0('0x11a'));_0x394440(this,function(){_0x21708a['removeClass'](_0x72d0('0x11a'));});});_0x11bab4[_0x72d0('0x50')](_0x72d0('0xff'))['on'](_0x72d0('0x11d'),function(_0x927d3f){0xd==_0x927d3f[_0x72d0('0xcd')]&&(_0x21708a[_0x72d0('0x48')](_0x72d0('0x11a')),_0x394440(this,function(){_0x21708a[_0x72d0('0x8d')](_0x72d0('0x11a'));}));});});_0x11bab4[_0x72d0('0x50')]('.qd-ddc-prodRow')[_0x72d0('0x33')](function(){var _0x11bab4=_0x37b25d(this);_0x11bab4['find'](_0x72d0('0x100'))['on'](_0x72d0('0x11e'),function(){_0x11bab4[_0x72d0('0x48')](_0x72d0('0x11a'));_0x4eddc0[_0x72d0('0x11f')](_0x37b25d(this),function(_0x2b92a6){_0x2b92a6?_0x11bab4[_0x72d0('0x120')](!0x0)[_0x72d0('0x121')](function(){_0x11bab4['remove']();_0x4eddc0[_0x72d0('0xd8')]();}):_0x11bab4['removeClass'](_0x72d0('0x11a'));});return!0x1;});});};_0x4eddc0['shippingCalculate']=function(_0x32cb73){var _0x4abf59=_0x32cb73['val'](),_0x4abf59=_0x4abf59['replace'](/[^0-9\-]/g,''),_0x4abf59=_0x4abf59[_0x72d0('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x72d0('0x122')),_0x4abf59=_0x4abf59[_0x72d0('0x1')](/(.{9}).*/g,'$1');_0x32cb73[_0x72d0('0xd5')](_0x4abf59);0x9<=_0x4abf59[_0x72d0('0x5')]&&(_0x32cb73[_0x72d0('0x4e')](_0x72d0('0x123'))!=_0x4abf59&&_0x1124d7[_0x72d0('0x124')]({'postalCode':_0x4abf59,'country':'BRA'})[_0x72d0('0x69')](function(_0x3e2f68){window[_0x72d0('0x58')][_0x72d0('0x25')]=_0x3e2f68;_0x4eddc0[_0x72d0('0x91')]();})[_0x72d0('0x1a')](function(_0x581ef0){_0x33f5df([_0x72d0('0x125'),_0x581ef0]);updateCartData();}),_0x32cb73[_0x72d0('0x4e')](_0x72d0('0x123'),_0x4abf59));};_0x4eddc0[_0x72d0('0x117')]=function(_0x4ae555,_0x4a7eed,_0x59bf52,_0x32e162){function _0x114dbb(_0x3dc320){_0x3dc320='boolean'!==typeof _0x3dc320?!0x1:_0x3dc320;_0x4eddc0[_0x72d0('0x91')]();window[_0x72d0('0x58')][_0x72d0('0x92')]=!0x1;_0x4eddc0['cartIsEmpty']();_0x72d0('0x3')!==typeof window[_0x72d0('0xf1')]&&'function'===typeof window[_0x72d0('0xf1')][_0x72d0('0xf2')]&&window['_QuatroDigital_AmountProduct'][_0x72d0('0xf2')][_0x72d0('0x61')](this);_0x72d0('0xd')===typeof adminCart&&adminCart();_0x37b25d['fn'][_0x72d0('0x23')](!0x0,void 0x0,_0x3dc320);_0x72d0('0xd')===typeof _0x32e162&&_0x32e162(_0x4a7eed);}_0x59bf52=_0x59bf52||0x1;if(0x1>_0x59bf52)return _0x4a7eed;if(_0x2b6b68[_0x72d0('0x57')]){if('undefined'===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x72d0('0x3f')][_0x4ae555[0x1]])return _0x33f5df(_0x72d0('0x126')+_0x4ae555[0x1]+']'),_0x4a7eed;window[_0x72d0('0x58')]['getOrderForm'][_0x72d0('0x3f')][_0x4ae555[0x1]][_0x72d0('0x40')]=_0x59bf52;window[_0x72d0('0x58')][_0x72d0('0x25')][_0x72d0('0x3f')][_0x4ae555[0x1]]['index']=_0x4ae555[0x1];_0x1124d7[_0x72d0('0x127')]([window[_0x72d0('0x58')]['getOrderForm'][_0x72d0('0x3f')][_0x4ae555[0x1]]],[_0x72d0('0x3f'),_0x72d0('0x36'),'shippingData'])[_0x72d0('0x69')](function(_0x3c7bae){window['_QuatroDigital_DropDown'][_0x72d0('0x25')]=_0x3c7bae;_0x114dbb(!0x0);})[_0x72d0('0x1a')](function(_0x23824f){_0x33f5df(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x23824f]);_0x114dbb();});}else _0x33f5df('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x4eddc0[_0x72d0('0x11f')]=function(_0x4640cd,_0x53859a){function _0x22834c(_0x57b90f){_0x57b90f='boolean'!==typeof _0x57b90f?!0x1:_0x57b90f;'undefined'!==typeof window[_0x72d0('0xf1')]&&_0x72d0('0xd')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x72d0('0xf1')][_0x72d0('0xf2')][_0x72d0('0x61')](this);_0x72d0('0xd')===typeof adminCart&&adminCart();_0x37b25d['fn'][_0x72d0('0x23')](!0x0,void 0x0,_0x57b90f);_0x72d0('0xd')===typeof _0x53859a&&_0x53859a(_0x21708a);}var _0x21708a=!0x1,_0x4bc821=_0x37b25d(_0x4640cd)[_0x72d0('0x96')](_0x72d0('0x116'));if(_0x2b6b68[_0x72d0('0x57')]){if('undefined'===typeof window[_0x72d0('0x58')]['getOrderForm'][_0x72d0('0x3f')][_0x4bc821])return _0x33f5df(_0x72d0('0x126')+_0x4bc821+']'),_0x21708a;window[_0x72d0('0x58')][_0x72d0('0x25')][_0x72d0('0x3f')][_0x4bc821][_0x72d0('0x128')]=_0x4bc821;_0x1124d7[_0x72d0('0x129')]([window[_0x72d0('0x58')]['getOrderForm'][_0x72d0('0x3f')][_0x4bc821]],[_0x72d0('0x3f'),_0x72d0('0x36'),_0x72d0('0xf4')])[_0x72d0('0x69')](function(_0x13d4f0){_0x21708a=!0x0;window[_0x72d0('0x58')][_0x72d0('0x25')]=_0x13d4f0;_0x158489(_0x13d4f0);_0x22834c(!0x0);})['fail'](function(_0x2a86ca){_0x33f5df(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x2a86ca]);_0x22834c();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x4eddc0[_0x72d0('0xd1')]=function(_0x4acb01,_0x12863f,_0x4f65a2,_0x4924ad){_0x4924ad=_0x4924ad||_0x37b25d('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x4acb01=_0x4acb01||'+';_0x12863f=_0x12863f||0.9*_0x4924ad['height']();_0x4924ad[_0x72d0('0x120')](!0x0,!0x0)[_0x72d0('0x12a')]({'scrollTop':isNaN(_0x4f65a2)?_0x4acb01+'='+_0x12863f+'px':_0x4f65a2});};_0x2b6b68[_0x72d0('0xd7')]||(_0x4eddc0[_0x72d0('0x91')](),_0x37b25d['fn'][_0x72d0('0x23')](!0x0));_0x37b25d(window)['on'](_0x72d0('0x12b'),function(){try{window['_QuatroDigital_DropDown'][_0x72d0('0x25')]=void 0x0,_0x4eddc0[_0x72d0('0x91')]();}catch(_0x8c7670){_0x33f5df(_0x72d0('0x12c')+_0x8c7670['message'],_0x72d0('0x12d'));}});_0x72d0('0xd')===typeof _0x2b6b68[_0x72d0('0x41')]?_0x2b6b68[_0x72d0('0x41')][_0x72d0('0x61')](this):_0x33f5df(_0x72d0('0xaa'));};_0x37b25d['fn'][_0x72d0('0xb9')]=function(_0xb780aa){var _0x111d8a=_0x37b25d(this);_0x111d8a['fn']=new _0x37b25d[(_0x72d0('0xb9'))](this,_0xb780aa);return _0x111d8a;};}catch(_0x233be1){'undefined'!==typeof console&&_0x72d0('0xd')===typeof console[_0x72d0('0x11')]&&console[_0x72d0('0x11')](_0x72d0('0xb5'),_0x233be1);}}(this));(function(_0x4ba80d){try{var _0x144d8a=jQuery;window[_0x72d0('0xf1')]=window[_0x72d0('0xf1')]||{};window[_0x72d0('0xf1')][_0x72d0('0x3f')]={};window[_0x72d0('0xf1')][_0x72d0('0x12e')]=!0x1;window[_0x72d0('0xf1')][_0x72d0('0x12f')]=!0x1;window[_0x72d0('0xf1')][_0x72d0('0x130')]=!0x1;var _0x5dbea7=function(){if(window['_QuatroDigital_AmountProduct'][_0x72d0('0x12e')]){var _0x55efcc=!0x1;var _0x4ba80d={};window[_0x72d0('0xf1')][_0x72d0('0x3f')]={};for(_0x3ba539 in window['_QuatroDigital_DropDown'][_0x72d0('0x25')][_0x72d0('0x3f')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x72d0('0x25')][_0x72d0('0x3f')][_0x3ba539]){var _0x3418eb=window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x3ba539];'undefined'!==typeof _0x3418eb[_0x72d0('0x131')]&&null!==_0x3418eb[_0x72d0('0x131')]&&''!==_0x3418eb[_0x72d0('0x131')]&&(window[_0x72d0('0xf1')]['items']['prod_'+_0x3418eb[_0x72d0('0x131')]]=window[_0x72d0('0xf1')]['items']['prod_'+_0x3418eb['productId']]||{},window[_0x72d0('0xf1')][_0x72d0('0x3f')][_0x72d0('0x132')+_0x3418eb['productId']]['prodId']=_0x3418eb['productId'],_0x4ba80d[_0x72d0('0x132')+_0x3418eb[_0x72d0('0x131')]]||(window['_QuatroDigital_AmountProduct'][_0x72d0('0x3f')]['prod_'+_0x3418eb['productId']]['qtt']=0x0),window[_0x72d0('0xf1')][_0x72d0('0x3f')][_0x72d0('0x132')+_0x3418eb[_0x72d0('0x131')]]['qtt']+=_0x3418eb[_0x72d0('0x40')],_0x55efcc=!0x0,_0x4ba80d[_0x72d0('0x132')+_0x3418eb[_0x72d0('0x131')]]=!0x0);}var _0x3ba539=_0x55efcc;}else _0x3ba539=void 0x0;window[_0x72d0('0xf1')][_0x72d0('0x12e')]&&(_0x144d8a(_0x72d0('0x133'))[_0x72d0('0x134')](),_0x144d8a(_0x72d0('0x135'))['removeClass']('qd-bap-item-added'));for(var _0xca6031 in window[_0x72d0('0xf1')][_0x72d0('0x3f')]){_0x3418eb=window['_QuatroDigital_AmountProduct'][_0x72d0('0x3f')][_0xca6031];if('object'!==typeof _0x3418eb)return;_0x4ba80d=_0x144d8a('input.qd-productId[value='+_0x3418eb[_0x72d0('0x136')]+']')[_0x72d0('0x0')]('li');if(window['_QuatroDigital_AmountProduct'][_0x72d0('0x12e')]||!_0x4ba80d[_0x72d0('0x50')](_0x72d0('0x133'))[_0x72d0('0x5')])_0x55efcc=_0x144d8a('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x55efcc['find'](_0x72d0('0x137'))[_0x72d0('0x4b')](_0x3418eb[_0x72d0('0x3d')]),_0x3418eb=_0x4ba80d[_0x72d0('0x50')](_0x72d0('0x138')),_0x3418eb[_0x72d0('0x5')]?_0x3418eb['prepend'](_0x55efcc)[_0x72d0('0x48')](_0x72d0('0x139')):_0x4ba80d[_0x72d0('0xac')](_0x55efcc);}_0x3ba539&&(window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1);};window[_0x72d0('0xf1')][_0x72d0('0xf2')]=function(){window[_0x72d0('0xf1')][_0x72d0('0x12e')]=!0x0;_0x5dbea7['call'](this);};_0x144d8a(document)[_0x72d0('0xb4')](function(){_0x5dbea7[_0x72d0('0x61')](this);});}catch(_0x14e77c){'undefined'!==typeof console&&_0x72d0('0xd')===typeof console[_0x72d0('0x11')]&&console[_0x72d0('0x11')](_0x72d0('0xb5'),_0x14e77c);}}(this));(function(){try{var _0x4a0fa7=jQuery,_0x347d46,_0x58b4cd={'selector':_0x72d0('0x13a'),'dropDown':{},'buyButton':{}};_0x4a0fa7['QD_smartCart']=function(_0x4d7f5c){var _0xa34631={};_0x347d46=_0x4a0fa7['extend'](!0x0,{},_0x58b4cd,_0x4d7f5c);_0x4d7f5c=_0x4a0fa7(_0x347d46[_0x72d0('0x87')])[_0x72d0('0xb9')](_0x347d46[_0x72d0('0x13b')]);_0xa34631[_0x72d0('0x7c')]=_0x72d0('0x3')!==typeof _0x347d46[_0x72d0('0x13b')][_0x72d0('0xd7')]&&!0x1===_0x347d46[_0x72d0('0x13b')][_0x72d0('0xd7')]?_0x4a0fa7(_0x347d46[_0x72d0('0x87')])['QD_buyButton'](_0x4d7f5c['fn'],_0x347d46[_0x72d0('0x7c')]):_0x4a0fa7(_0x347d46['selector'])[_0x72d0('0x75')](_0x347d46[_0x72d0('0x7c')]);_0xa34631[_0x72d0('0x13b')]=_0x4d7f5c;return _0xa34631;};_0x4a0fa7['fn'][_0x72d0('0x13c')]=function(){_0x72d0('0x14')===typeof console&&'function'===typeof console[_0x72d0('0x2b')]&&console[_0x72d0('0x2b')](_0x72d0('0x13d'));};_0x4a0fa7[_0x72d0('0x13c')]=_0x4a0fa7['fn'][_0x72d0('0x13c')];}catch(_0x181005){'undefined'!==typeof console&&_0x72d0('0xd')===typeof console[_0x72d0('0x11')]&&console[_0x72d0('0x11')](_0x72d0('0xb5'),_0x181005);}}());
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
var _0x6a95=['img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','text','trim','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','>li','qdAmAddNdx','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-','-li','callback','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','closest','function','/qd-amazing-menu','object','undefined','error','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','info','apply','join','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','QD_amazingMenu','replace','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','length','qd-am-banner-wrapper','parent','qdAjax','url','html'];(function(_0x42f3ff,_0xe68b19){var _0x28f6fc=function(_0x3bf839){while(--_0x3bf839){_0x42f3ff['push'](_0x42f3ff['shift']());}};_0x28f6fc(++_0xe68b19);}(_0x6a95,0x1db));var _0x56a9=function(_0x34021d,_0x753aa6){_0x34021d=_0x34021d-0x0;var _0x16597b=_0x6a95[_0x34021d];return _0x16597b;};(function(_0x344400){_0x344400['fn'][_0x56a9('0x0')]=_0x344400['fn'][_0x56a9('0x1')];}(jQuery));(function(_0xce37aa){var _0x36f87a;var _0x26e006=jQuery;if(_0x56a9('0x2')!==typeof _0x26e006['fn']['QD_amazingMenu']){var _0x512f52={'url':_0x56a9('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x83f534=function(_0x1b42ac,_0x2eb132){if(_0x56a9('0x4')===typeof console&&_0x56a9('0x5')!==typeof console[_0x56a9('0x6')]&&'undefined'!==typeof console['info']&&_0x56a9('0x5')!==typeof console[_0x56a9('0x7')]){var _0x58caab;_0x56a9('0x4')===typeof _0x1b42ac?(_0x1b42ac[_0x56a9('0x8')](_0x56a9('0x9')),_0x58caab=_0x1b42ac):_0x58caab=[_0x56a9('0x9')+_0x1b42ac];if(_0x56a9('0x5')===typeof _0x2eb132||_0x56a9('0xa')!==_0x2eb132[_0x56a9('0xb')]()&&_0x56a9('0xc')!==_0x2eb132[_0x56a9('0xb')]())if('undefined'!==typeof _0x2eb132&&_0x56a9('0xd')===_0x2eb132['toLowerCase']())try{console[_0x56a9('0xd')][_0x56a9('0xe')](console,_0x58caab);}catch(_0x420667){try{console[_0x56a9('0xd')](_0x58caab[_0x56a9('0xf')]('\x0a'));}catch(_0x194069){}}else try{console[_0x56a9('0x6')][_0x56a9('0xe')](console,_0x58caab);}catch(_0x40b2cb){try{console['error'](_0x58caab['join']('\x0a'));}catch(_0x2e0dfd){}}else try{console[_0x56a9('0x7')][_0x56a9('0xe')](console,_0x58caab);}catch(_0x46f854){try{console['warn'](_0x58caab[_0x56a9('0xf')]('\x0a'));}catch(_0x4853a3){}}}};_0x26e006['fn']['qdAmAddNdx']=function(){var _0x4e292f=_0x26e006(this);_0x4e292f[_0x56a9('0x10')](function(_0x576bdf){_0x26e006(this)[_0x56a9('0x11')](_0x56a9('0x12')+_0x576bdf);});_0x4e292f[_0x56a9('0x13')]()[_0x56a9('0x11')](_0x56a9('0x14'));_0x4e292f[_0x56a9('0x15')]()[_0x56a9('0x11')](_0x56a9('0x16'));return _0x4e292f;};_0x26e006['fn'][_0x56a9('0x17')]=function(){};_0xce37aa=function(_0x62f79f){var _0x5f145f={'n':'sevpnanegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3a2e5e){var _0x16f9de=function(_0x64d4a7){return _0x64d4a7;};var _0x13c118=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3a2e5e=_0x3a2e5e['d'+_0x13c118[0x10]+'c'+_0x13c118[0x11]+'m'+_0x16f9de(_0x13c118[0x1])+'n'+_0x13c118[0xd]]['l'+_0x13c118[0x12]+'c'+_0x13c118[0x0]+'ti'+_0x16f9de('o')+'n'];var _0x4a09e5=function(_0x6100fe){return escape(encodeURIComponent(_0x6100fe[_0x56a9('0x18')](/\./g,'¨')[_0x56a9('0x18')](/[a-zA-Z]/g,function(_0x3e00d2){return String['fromCharCode'](('Z'>=_0x3e00d2?0x5a:0x7a)>=(_0x3e00d2=_0x3e00d2[_0x56a9('0x19')](0x0)+0xd)?_0x3e00d2:_0x3e00d2-0x1a);})));};var _0x32839b=_0x4a09e5(_0x3a2e5e[[_0x13c118[0x9],_0x16f9de('o'),_0x13c118[0xc],_0x13c118[_0x16f9de(0xd)]][_0x56a9('0xf')]('')]);_0x4a09e5=_0x4a09e5((window[['js',_0x16f9de('no'),'m',_0x13c118[0x1],_0x13c118[0x4][_0x56a9('0x1a')](),_0x56a9('0x1b')]['join']('')]||_0x56a9('0x1c'))+['.v',_0x13c118[0xd],'e',_0x16f9de('x'),'co',_0x16f9de('mm'),_0x56a9('0x1d'),_0x13c118[0x1],'.c',_0x16f9de('o'),'m.',_0x13c118[0x13],'r'][_0x56a9('0xf')](''));for(var _0x5e3052 in _0x5f145f){if(_0x4a09e5===_0x5e3052+_0x5f145f[_0x5e3052]||_0x32839b===_0x5e3052+_0x5f145f[_0x5e3052]){var _0x1099ba='tr'+_0x13c118[0x11]+'e';break;}_0x1099ba='f'+_0x13c118[0x0]+'ls'+_0x16f9de(_0x13c118[0x1])+'';}_0x16f9de=!0x1;-0x1<_0x3a2e5e[[_0x13c118[0xc],'e',_0x13c118[0x0],'rc',_0x13c118[0x9]]['join']('')][_0x56a9('0x1e')](_0x56a9('0x1f'))&&(_0x16f9de=!0x0);return[_0x1099ba,_0x16f9de];}(_0x62f79f);}(window);if(!eval(_0xce37aa[0x0]))return _0xce37aa[0x1]?_0x83f534(_0x56a9('0x20')):!0x1;var _0x20432a=function(_0x45f38c){var _0x1afe8a=_0x45f38c[_0x56a9('0x21')](_0x56a9('0x22'));var _0x51fd64=_0x1afe8a[_0x56a9('0x23')](_0x56a9('0x24'));var _0x5f23e1=_0x1afe8a[_0x56a9('0x23')]('.qd-am-collection');if(_0x51fd64['length']||_0x5f23e1[_0x56a9('0x25')])_0x51fd64['parent']()[_0x56a9('0x11')](_0x56a9('0x26')),_0x5f23e1[_0x56a9('0x27')]()[_0x56a9('0x11')]('qd-am-collection-wrapper'),_0x26e006[_0x56a9('0x28')]({'url':_0x36f87a[_0x56a9('0x29')],'dataType':_0x56a9('0x2a'),'success':function(_0xeabd82){var _0xbbb47d=_0x26e006(_0xeabd82);_0x51fd64[_0x56a9('0x10')](function(){var _0xeabd82=_0x26e006(this);var _0x2b5447=_0xbbb47d[_0x56a9('0x21')](_0x56a9('0x2b')+_0xeabd82[_0x56a9('0x2c')](_0x56a9('0x2d'))+'\x27]');_0x2b5447['length']&&(_0x2b5447[_0x56a9('0x10')](function(){_0x26e006(this)[_0x56a9('0x0')](_0x56a9('0x2e'))['clone']()[_0x56a9('0x2f')](_0xeabd82);}),_0xeabd82['hide']());})['addClass']('qd-am-content-loaded');_0x5f23e1[_0x56a9('0x10')](function(){var _0xeabd82={};var _0x5914b5=_0x26e006(this);_0xbbb47d['find']('h2')[_0x56a9('0x10')](function(){if(_0x26e006(this)[_0x56a9('0x30')]()[_0x56a9('0x31')]()[_0x56a9('0xb')]()==_0x5914b5[_0x56a9('0x2c')](_0x56a9('0x2d'))[_0x56a9('0x31')]()[_0x56a9('0xb')]())return _0xeabd82=_0x26e006(this),!0x1;});_0xeabd82[_0x56a9('0x25')]&&(_0xeabd82[_0x56a9('0x10')](function(){_0x26e006(this)['getParent']('[class*=\x27colunas\x27]')['clone']()['insertBefore'](_0x5914b5);}),_0x5914b5[_0x56a9('0x32')]());})[_0x56a9('0x11')]('qd-am-content-loaded');},'error':function(){_0x83f534(_0x56a9('0x33')+_0x36f87a[_0x56a9('0x29')]+_0x56a9('0x34'));},'complete':function(){_0x36f87a[_0x56a9('0x35')][_0x56a9('0x36')](this);_0x26e006(window)[_0x56a9('0x37')](_0x56a9('0x38'),_0x45f38c);},'clearQueueDelay':0xbb8});};_0x26e006['QD_amazingMenu']=function(_0x4630c7){var _0x3a796c=_0x4630c7['find']('ul[itemscope]')[_0x56a9('0x10')](function(){var _0x1180c6=_0x26e006(this);if(!_0x1180c6[_0x56a9('0x25')])return _0x83f534([_0x56a9('0x39'),_0x4630c7],_0x56a9('0xa'));_0x1180c6[_0x56a9('0x21')](_0x56a9('0x3a'))[_0x56a9('0x27')]()[_0x56a9('0x11')](_0x56a9('0x3b'));_0x1180c6[_0x56a9('0x21')]('li')[_0x56a9('0x10')](function(){var _0xf2347a=_0x26e006(this);var _0x3b9b21=_0xf2347a[_0x56a9('0x3c')](_0x56a9('0x3d'));_0x3b9b21[_0x56a9('0x25')]&&_0xf2347a[_0x56a9('0x11')]('qd-am-elem-'+_0x3b9b21[_0x56a9('0x13')]()[_0x56a9('0x30')]()[_0x56a9('0x31')]()['replaceSpecialChars']()[_0x56a9('0x18')](/\./g,'')['replace'](/\s/g,'-')[_0x56a9('0xb')]());});var _0x54ddf4=_0x1180c6[_0x56a9('0x21')](_0x56a9('0x3e'))[_0x56a9('0x3f')]();_0x1180c6[_0x56a9('0x11')]('qd-amazing-menu');_0x54ddf4=_0x54ddf4['find']('>ul');_0x54ddf4[_0x56a9('0x10')](function(){var _0x1dc6e9=_0x26e006(this);_0x1dc6e9[_0x56a9('0x21')](_0x56a9('0x3e'))[_0x56a9('0x3f')]()[_0x56a9('0x11')](_0x56a9('0x40'));_0x1dc6e9[_0x56a9('0x11')](_0x56a9('0x41'));_0x1dc6e9[_0x56a9('0x27')]()[_0x56a9('0x11')](_0x56a9('0x42'));});_0x54ddf4[_0x56a9('0x11')](_0x56a9('0x42'));var _0x5b513e=0x0,_0xce37aa=function(_0x6c36ff){_0x5b513e+=0x1;_0x6c36ff=_0x6c36ff[_0x56a9('0x3c')]('li')['children']('*');_0x6c36ff[_0x56a9('0x25')]&&(_0x6c36ff[_0x56a9('0x11')]('qd-am-level-'+_0x5b513e),_0xce37aa(_0x6c36ff));};_0xce37aa(_0x1180c6);_0x1180c6[_0x56a9('0x43')](_0x1180c6[_0x56a9('0x21')]('ul'))[_0x56a9('0x10')](function(){var _0x208452=_0x26e006(this);_0x208452['addClass'](_0x56a9('0x44')+_0x208452[_0x56a9('0x3c')]('li')[_0x56a9('0x25')]+_0x56a9('0x45'));});});_0x20432a(_0x3a796c);_0x36f87a[_0x56a9('0x46')][_0x56a9('0x36')](this);_0x26e006(window)[_0x56a9('0x37')](_0x56a9('0x47'),_0x4630c7);};_0x26e006['fn'][_0x56a9('0x17')]=function(_0x2c3794){var _0x2284ba=_0x26e006(this);if(!_0x2284ba['length'])return _0x2284ba;_0x36f87a=_0x26e006['extend']({},_0x512f52,_0x2c3794);_0x2284ba[_0x56a9('0x48')]=new _0x26e006[(_0x56a9('0x17'))](_0x26e006(this));return _0x2284ba;};_0x26e006(function(){_0x26e006(_0x56a9('0x49'))[_0x56a9('0x17')]();});}}(this));
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