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
			Common.bannerResponsive();
			Common.amazingMenu();
			Common.productCaroussel();
			Common.productOwlCarousel();
			Common.applyAmazingMenuMobile();
			Common.qdOverlay();
			Common.applySmartCart();
			// Common.modalNewsLetter();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		applySmartCart: function() {
			$('.v2-cart-wrapper').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');
		
			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');
		
			var wrapper = $(".qd-sc-wrapper");
			console.log(wrapper);
		
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
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>');
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
				},
				buyButton: {
					buyButton: "body .prateleira .buy-button"
				}
			});
		
			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};
		
			$('.v2-cart-wrapper .cartLink').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');
		
				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});
		
			$('.qd_ddc_lightBoxClose').click(function(evt){
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		amazingMenu:function(){
			$('[class*=main-amazing-menu]').QD_amazingMenu();
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');
		
			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-caret-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);
						$t.parent().toggleClass('qd-am-is-active');
		
						$t.siblings('ul').stop(true, true).slideToggle();
					});
				}
			});
		
			$('.header-qd-v1-amazing-menu-trigger').click(function(evt) {
				evt.preventDefault();
				evt.stopPropagation();
				$(document.body).toggleClass('qd-am-on');
			});
		
			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function() {
				$(document.body).removeClass('qd-am-on');
			});
		},		
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
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
			$(".qd-banner-responsive:not(.banner-qd-v1-mosaic) .box-banner a").each(function(){
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

			$(".qd-shelf-carousel .prateleira").each(function() {
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
			Home.mosaicBanners();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		mosaicBanners: function() {
			$(".banner-qd-v1-mosaic .box-banner").QD_mosaicBanners();
		},
		brandOwlCarousel:function(){
			$(".qd-banner-carousel").each(function() {
				$(this).owlCarousel({
					items: 4,
					navigation: true,
					pagination: false,
					navigationText: ["",""]
				});
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

			console.log(wrapper.find('[itemscope="itemscope"]:not(".qd-on")').length);

			wrapper.find('[itemscope="itemscope"]:not(".qd-on")').addClass("qd-on").each(function() {
				$t = $(this);
				console.log($t);

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
				prev: ".cycle-prev-2",
				next: ".cycle-next-2"
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
			Search.emptySearch();
			Departament.hideExtendedMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {},
		emptySearch:function () {
			if ($('.busca-vazio').length>0) {
				$('.no-search-result').show();
				$('.searchTitle').hide();
			};
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
		}
	};


	var Product = {
		init: function () {
			Product.seeDescription();
			Product.organizeDescription();
			Product.videoIframe();
			Product.accessoriesFix();
			// Product.openShipping();
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

/* Automatizador de comments box do Facebook // 1.2 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a;a=$(".fb-comments");if(a.length)if($("#fb-root").length||$("body").append('<div id="fb-root"></div>'),a.attr("data-href",document.location.href.split("#").shift().split("?").shift()),$("script[src*='connect.facebook.net']").filter("[src*='all.js']").length)"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse();else{var b=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(a=document.createElement("script"),a.id="facebook-jssdk",a.src="//connect.facebook.net/pt_BR/all.js#xfbml=1&appId="+($("meta[property='fb:app_id']").attr("content")||""),b.parentNode.insertBefore(a,b))}});
/* Newslleter customizada para a plataforma VTEX // 5 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
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
/* $("a").getParent("ul"); // 2.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(b){b.fn.getParent=function(c){var a;a=b(this);if(1>a.length)return a;a=a.parent();return a.is("html")?b(""):a.is(c)?a.filter(c):a.length?a.getParent(c):a}})(jQuery);
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Quatro Digital jQuery Scroll // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(a){"function"!==typeof a.fn.QD_scroll&&(a.fn.QD_scroll=function(d,b){var c;b=b||100;window.QuatroDigital_scroll=window.QuatroDigital_scroll||{};window.QuatroDigital_scroll.scrollTop=null;window.QuatroDigital_scroll.lastScrollTop=null;a(this).scroll(function(){c=this;window.QuatroDigital_scroll.scrollTop=a(window).scrollTop()});(function(){window.QuatroDigital_scroll.interval=setInterval(function(){window.QuatroDigital_scroll.lastScrollTop!==window.QuatroDigital_scroll.scrollTop&&(null!==
window.QuatroDigital_scroll.scrollTop&&d.call(c,window.QuatroDigital_scroll.scrollTop),window.QuatroDigital_scroll.lastScrollTop=window.QuatroDigital_scroll.scrollTop)},b)})()})})(jQuery);
/* Quatro Digital - Scroll Toggle // 1.1 // Carlos Vinicius // Todos os direitos reservados */
(function(){var b=jQuery,d=function(a,c){if("object"===typeof console){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,b):console.error.apply(console,b):console.warn.apply(console,b)}};"function"!==typeof b.QD_scrollToggle&&(b.QD_scrollToggle=function(a){var c=[];if("string"!==typeof a&&"number"!==typeof a||
"auto"===a)if("auto"===a)c.push(b(window).height());else return d("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var e=a.split(","),f;for(f in e)"function"!==typeof e[f]&&(a=parseInt(e[f].trim()),isNaN(a)||c.push(a))}if(!c.length)return d("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"function"!==typeof document.body.setAttribute)return d('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');
if(!document||!document.body||"function"!==typeof document.body.removeAttribute)return d('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"function"!==typeof document.body.getAttribute)return d('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!b(window).scrollTop||isNaN(parseInt(b(window).scrollTop())))return d('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",
1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){d("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",g.message)}b(window).scroll(function(){for(var a=0;a<c.length;a++)b(window).scrollTop()>c[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+
a)})},b(function(){var a=b("body[data-qd-scroll-limit]");a.length&&b.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();
/* Quatro Digital Simple Cart // 4.15 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
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
/* Quatro Digital Cookie Functions // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,c){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?
"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var c=function(d,b){var c=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof c&&c>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(d);d.trigger("QuatroDigital.cf_show");a(window).on("qdNewsSuccessCallback",function(a,c){d.trigger("QuatroDigital.qdcf_applyComplete");b.show(d);d.trigger("QuatroDigital.cf_hide")});b.callback();d.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var d=a(this),b;try{if(b=d.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(d,b);c(d,b);e(d,b)})};a.fn.QD_cookieFn=
function(f){var c=a(this);h=a.extend(!0,{},g,f);c.QD_cookieFn=new a.QD_cookieFn(c);return c};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs()}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return $.extend({},a,new b(a))},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-24",classTwoColumn:"col-xs-24 col-sm-12",classThreeColumn:"col-xs-24 col-sm-8",classFourColumn:"col-xs-12 col-sm-6"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
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
/* Quatro Digital Plus Smart Cart // 6.10 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(7(){1c{i.1s=i.1s||{},i.1s.1W=i.1s.1W||$.6X()}1e(l){"U"!==B M&&"7"===B M.1f&&M.1f("2g! ",l.3d)}})();(7(l){1c{F a=2S,e=7(a,b){V("1u"===B M&&"U"!==B M.1f&&"U"!==B M.1E&&"U"!==B M.3e){F c;"1u"===B a?(a.6T("[2Q 36 - 2i 37]\\n"),c=a):c=["[2Q 36 - 2i 37]\\n"+a];V("U"===B b||"3p"!==b.34()&&"3h"!==b.34())V("U"!==B b&&"1E"===b.34())1c{M.1E.2G(M,c)}1e(w){1c{M.1E(c.1G("\\n"))}1e(x){}}1J 1c{M.1f.2G(M,c)}1e(w){1c{M.1f(c.1G("\\n"))}1e(x){}}1J 1c{M.3e.2G(M,c)}1e(w){1c{M.3e(c.1G("\\n"))}1e(x){}}}};i.E=i.E||{};i.E.2r=!0;a.1V=7(){};a.1j.1V=7(){T{1j:33 a}};F b=7(a){F b={j:"6x%Q%2B%Q%1y%Q%1A",6m:"6q%Q%1y%Q%1A",6I:"6G%Q%6C%Q%1y%Q%1A",6E:"7M%Q%3L%Q%1y%Q%1A",7E:"7n%Q%3J%Q%1y%Q%1A",7d:"7p%Q%7q%Q%5m%Q%1y%Q%1A","3K%4U":"2%2B%Q%3L%Q%1y%Q%1A","3K%Q":"%2B%Q%3J%Q%1y%Q%1A"};T 7(a){F c,e,d,g;e=7(a){T a};d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+d[16]+"c"+d[17]+"m"+e(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"5u"+e("o")+"n"];c=7(a){T 5E(5P(a.1n(/\\./g,"\\5K").1n(/[a-5G-Z]/g,7(a){T 5J.7C(("Z">=a?5I:5H)>=(a=a.5F(0)+13)?a:a-26)})))};F k=c(a[[d[9],e("o"),d[12],d[e(13)]].1G("")]);c=c((i[["1D",e("2n"),"m",d[1],d[4].5L(),"5Q"].1G("")]||"---")+[".v",d[13],"e",e("x"),"5O",e("5M"),"5N",d[1],".c",e("o"),"m.",d[19],"r"].1G(""));22(F m 2z b){V(c===m+b[m]||k===m+b[m]){g="5D"+d[17]+"e";5v}g="f"+d[0]+"5t"+e(d[1])+""}e=!1;-1<a[[d[12],"e",d[0],"5s",d[9]].1G("")].5r("5w%3M%3N%3Q%2L%2H%2L%5x%5C%5B%3I%5A%3I%5z%2L%2H%3M%3N%3Q%6b%2H")&&(e=!0);T[g,e]}(a)}(i);V(!68(b[0]))T b[1]?e("\\69\\6d\\3O \\6e\\1M\\6j\\6i\\3P\\1M\\3P\\3O \\6g\\1M\\67\\1M \\66\\5X\\5Y\\1M L\\5W\\1M!"):!1;a.1V=7(b,m){F c,k,l,d,g,p,t;p=a(b);V(!p.1q)T p;c=a.4x(!0,{},{2c:!0,11:{47:"5T 38 5U",48:"5Z 5p",1l:"<C><I>4E: #G</I><I>65: #32</I></C><C><I>64: #1H</I><I>63: #35</I></C>",2j:"61 1U 62 n\\S 4o 6k 4B.",3w:"55 4X",4a:\'<3H 22="6-8-3G">4W 4l: </3H><20 3X="4Z" 1N="6-8-3G" 51="3f" />\'},2d:50,24:!0,2O:7(a){T a.2O||a.3Z},1W:7(){},2y:7(){}},m);a("");g=K;V(c.24){F y=!1;"U"===B i.2q&&(e("A 3C 3a.1D n\\S 1i 3B. o 4T 3g\\2V 4R 2n 4M"),a.4K({4L:"//3A.1h.2E.3z/1h.1D/1.0.0/1h.3y.1D",4N:!1,4S:"4O",1f:7(){e("N\\S 1i 1B\\1w 2C \'//3A.1h.2E.3z/1h.1D/1.0.0/1h.3y.1D\' o 2i n\\S 5i\\2V 5g.");y=!0}}));V(y)T e("A 5n\\1F\\S 1x 2i 5f\\2V 58 57!")}F r;V("1u"===B i.2q&&"U"!==B i.2q.1p)r=i.2q.1p;1J V("1u"===B 1h&&"1u"===B 1h.1p&&"U"!==B 1h.1p.3x)r=33 1h.1p.3x;1J T e("N\\S 1i 3B a 3C 3a.1D");g.49=\'<C D="6-8-1z 6-8-2J"><C D="6-8-4y"><C D="3E"></C><C D="6-8-59"><C D="6-8-2j"><p></p></C><C D="6-8-3F 6-8-5h"><a 1v="#" D="6-8-3S"></a><C D="6-8-2P"> <C D="6-8-2M"></C> </C><I D="6-8-54"></I><a 1v="#" D="6-8-46"></a></C><C D="6-8-3F 6-8-1E"><C D="6-8-1H"></C><C D="6-8-4b"></C><C D="6-8-5j"><a 1v="/1p/#/2b" D="6-8-44"></a><a 1v="#" D="31"></a><a 1v="/1p/#/4V" D="6-8-1p"></a></C></C></C></C></C>\';k=7(f){a(K).3c(f);f.H(".31, .3E").1P(a(".5l")).14("1O.2X",7(){p.X("6-2w-3D");a(2A.25).X("6-2w-3R")});a(2A).5b("2v.2X").14("2v.2X",7(f){27==f.4H&&(p.X("6-2w-3D"),a(2A.25).X("6-2w-3R"))});F b=f.H(".6-8-2P");f.H(".6-8-3S").14("1O.4Y",7(){g.2t("-",1a 0,1a 0,b);T!1});f.H(".6-8-46").14("1O.60",7(){g.2t(1a 0,1a 0,1a 0,b);T!1});f.H(".6-8-1H 20").1b("").14("2v.6D",7(){g.4G(a(K))});V(c.2c){F q=0;a(K).14("7v.45",7(){F f=7(){i.E.2r&&(g.1Q(),i.E.2r=!1,a.1j.2p(!0),g.1X())};q=7u(7(){f()},7t);f()});a(K).14("7r.45",7(){7w(q)})}};l=7(f){f=a(f);c.11.1l=c.11.1l.1n("#32",\'<I D="6-8-43"></I>\');c.11.1l=c.11.1l.1n("#G",\'<I D="6-8-42"></I>\');c.11.1l=c.11.1l.1n("#1H",\'<I D="6-8-3W"></I>\');c.11.1l=c.11.1l.1n("#35",\'<I D="6-8-3V"></I>\');f.H(".6-8-44").1k(c.11.47);f.H(".31").1k(c.11.3w);f.H(".6-8-1p").1k(c.11.48);f.H(".6-8-4b").1k(c.11.1l);f.H(".6-8-1H").1k(c.11.4a);f.H(".6-8-2j p").1k(c.11.2j);T f}(K.49);d=0;p.2a(7(){0<d?k.1g(K,l.7h()):k.1g(K,l);d++});i.1s.1W.1P(7(){a(".6-8-43").1k(i.1s.35||"--");a(".6-8-42").1k(i.1s.1K||"0");a(".6-8-3W").1k(i.1s.1H||"--");a(".6-8-3V").1k(i.1s.7e||"--")});t=7(a,c){V("U"===B a.G)T e("N\\S 1i 1B\\1w 2C 1S G 4k 7i\\1F\\S");g.3T.1g(K,c)};g.1Q=7(f,b){F q;"U"!=B b?i.E.2l=b:i.E.2l&&(b=i.E.2l);2R(7(){i.E.2l=1a 0},c.2d);a(".6-8-1z").X("6-8-3U");c.24?(q=7(f){i.E.P=f;t(f,b);"U"!==B i.J&&"7"===B i.J.1C&&i.J.1C.1g(K);a(".6-8-1z").10("6-8-3U")},"U"!==B i.E.P?(q(i.E.P),"7"===B f&&f(i.E.P)):a.7o(["G","39","21"],{2o:7(a){q.1g(K,a);"7"===B f&&f(a)},2m:7(a){e(["N\\S 1i 1B\\1w 2C 1S 1Z 1x 1U",a])}})):2F("7k m\\2u 28 2s!")};g.1X=7(){F f=a(".6-8-1z");f.H(".6-8-2D").1q?f.X("6-8-2J"):f.10("6-8-2J")};g.3T=7(f){F b=a(".6-8-2M");b.2T();b.2a(7(){F b=a(K),u,d,h,k,m=a(""),l,n;22(n 2z i.E.P.G)"1u"===B i.E.P.G[n]&&(h=i.E.P.G[n],l=h.7X.1n(/^\\/|\\/$/g,"").7W("/"),d=a(\'<C D="6-8-2D 7V"><C D="6-8-1Y 6-8-7T 6-8-7U"><C D="6-8-7Y"><7Z 3j="" D="6-8-4c" /><I D="6-8-81"></I></C></C><C D="6-8-1Y 6-8-80 6-8-41"></C><C D="6-8-1Y 6-8-7S 6-8-40"></C><C D="6-8-1Y 6-8-7R 6-8-7J"><C D="6-8-3r 3Y"><a 1v="#" D="6-8-2W"></a><20 3X="7H" D="6-8-1r" /><a 1v="#" D="6-8-2I"></a><I D="6-8-7F"></I></C></C><C D="6-8-1Y 6-8-7K 6-8-7L"><C D="6-8-7Q 3Y"><a 1v="#" D="6-8-23"></a><I D="6-8-7O"></I></C></C></C>\'),d.15({"W-Y":h.1N,"W-Y-1m":n,"W-6-7N":l[0],"W-6-7l":l[l.1q-1]}),d.10("6-8-"+h.7b),d.H(".6-8-41").3c(c.2O(h)),d.H(".6-8-40").3c(2N(h.2e)?h.2e:0==h.2e?"6A\\6B":(a("6F[3Z=6K]").15("6J")||"R$")+" "+6H(h.2e/6y,2,",",".")),d.H(".6-8-1r").15({"W-Y":h.1N,"W-Y-1m":n}).1b(h.1r),d.H(".6-8-23").15({"W-Y":h.1N,"W-Y-1m":n}),g.3l(h.1N,d.H(".6-8-4c"),h.6p),d.H(".6-8-2I,.6-8-2W").15({"W-Y":h.1N,"W-Y-1m":n}),d.6o(b),m=m.1P(d));1c{F v=b.4z(".6-8-1z").H(".6-8-1H 20");v.1q&&""==v.1b()&&i.E.P.21.3t&&v.1b(i.E.P.21.3t.4j)}1e(z){e("4e 38 3g 6n o 3f 2E 6r 6s 1Z 1x 1p. 4w: "+z.3d,"3h")}g.3q(b);g.1X();f&&f.3u&&7(){k=m.6v("[W-Y=\'"+f.3u+"\']");k.1q&&(u=0,m.2a(7(){F b=a(K);V(b.6u(k))T!1;u+=b.6L()}),g.2t(1a 0,1a 0,u,b.1P(b.6M())),m.X("6-8-3o"),7(a){a.10("6-8-4d");a.10("6-8-3o");2R(7(){a.X("6-8-4d")},c.2d)}(k))}()});(7(){E.P.G.1q?(a("25").X("6-8-2b-2T").10("6-8-2b-3n 6-8-3i-1P-3m"),2R(7(){a("25").X("6-8-3i-1P-3m")},c.2d)):a("25").X("6-8-2b-3n").10("6-8-2b-2T")})();"7"===B c.2y?c.2y.1g(K):e("2y n\\S \\1L 3b 4I\\1F\\S")};g.3l=7(b,c,d){7 f(){c.X("6-3k").78(7(){a(K).10("6-3k")}).15("3j",d)}d?f():2N(b)?e("N\\S 1i 6Z 3b 6Y 4C a 6R e 6Q 3s 2U","3p"):2F("4p\\1F\\S 2Z \\1L 3s m\\2u 2s. 6N o 6O.")};g.3q=7(b){F f,c,d,e;f=7(b,c){F f,h,d,e;d=a(b);f=d.15("W-Y");e=d.15("W-Y-1m");f&&(h=2K(d.1b())||1,g.2x([f,e],h,h+1,7(a){d.1b(a);"7"===B c&&c()}))};d=7(b,c){F f,h,d,e;d=a(b);f=d.15("W-Y");e=d.15("W-Y-1m");f&&(h=2K(d.1b())||2,g.2x([f,e],h,h-1,7(a){d.1b(a);"7"===B c&&c()}))};e=7(b,c){F f,d,h,e;h=a(b);f=h.15("W-Y");e=h.15("W-Y-1m");f&&(d=2K(h.1b())||1,g.2x([f,e],1,d,7(a){h.1b(a);"7"===B c&&c()}))};c=b.H(".6-8-3r:6W(.3v)");c.10("3v").2a(7(){F b=a(K);b.H(".6-8-2I").14("1O.6U",7(a){a.4D();c.10("6-1o");f(b.H(".6-8-1r"),7(){c.X("6-1o")})});b.H(".6-8-2W").14("1O.5o",7(a){a.4D();c.10("6-1o");d(b.H(".6-8-1r"),7(){c.X("6-1o")})});b.H(".6-8-1r").14("6V.4F",7(){c.10("6-1o");e(K,7(){c.X("6-1o")})});b.H(".6-8-1r").14("2v.4F",7(a){13==a.4H&&(c.10("6-1o"),e(K,7(){c.X("6-1o")}))})});b.H(".6-8-2D").2a(7(){F b=a(K);b.H(".6-8-23").14("1O.6S",7(){b.10("6-1o");g.4g(a(K),7(a){a?b.4q(!0).6P(7(){b.23();g.1X()}):b.X("6-1o")});T!1})})};g.4G=7(a){F b=a.1b(),b=b.1n(/[^0-9\\-]/g,""),b=b.1n(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1n(/(.{9}).*/g,"$1");a.1b(b);9<=b.1q&&(a.W("4i")!=b&&r.79({4j:b,7a:"76"}).2o(7(a){i.E.P=a;g.1Q()}).2m(7(a){e(["N\\S 1i 1B\\1w 75 o 4l",a]);71()}),a.W("4i",b))};g.2x=7(b,d,k,m){7 f(b){b="4n"!==B b?!1:b;g.1Q();i.E.2r=!1;g.1X();"U"!==B i.J&&"7"===B i.J.1C&&i.J.1C.1g(K);"7"===B 2k&&2k();a.1j.2p(!0,1a 0,b);"7"===B m&&m(d)}k=k||1;V(1>k)T d;V(c.24){V("U"===B i.E.P.G[b[1]])T e("N\\S 1i 1B\\1w 4t 1S 1Z 1x 1T. A 4u 4v \\1L 4s 4r 2U: i.E.P.G["+b[1]+"]"),d;i.E.P.G[b[1]].1r=k;i.E.P.G[b[1]].1m=b[1];r.70([i.E.P.G[b[1]]],["G","39","21"]).2o(7(a){i.E.P=a;f(!0)}).2m(7(a){e(["N\\S 1i 1B\\1w 4h a 72 74 6t 2n 1U",a]);f()})}1J e("6w\\1F\\S 28 m\\2u 28 2s")};g.4g=7(b,d){7 f(b){b="4n"!==B b?!1:b;"U"!==B i.J&&"7"===B i.J.1C&&i.J.1C.1g(K);"7"===B 2k&&2k();a.1j.2p(!0,1a 0,b);"7"===B d&&d(g)}F g=!1,k=a(b).15("W-Y-1m");V(c.24){V("U"===B i.E.P.G[k])T e("N\\S 1i 1B\\1w 4t 1S 1Z 1x 1T. A 4u 4v \\1L 4s 4r 2U: i.E.P.G["+k+"]"),g;i.E.P.G[k].1m=k;r.6z([i.E.P.G[k]],["G","39","21"]).2o(7(a){g=!0;i.E.P=a;t(a);f(!0)}).2m(7(a){e(["N\\S 1i 1B\\1w 7c o 1T 1x 1U",a]);f()})}1J 2F("4p\\1F\\S, 2Z m\\2u 28 2s.")};g.2t=7(b,c,d,e){e=e||a(".6-8-2P, .6-8-2M");b=b||"+";c=c||.9*e.7P();e.4q(!0,!0).7G({7I:2N(d)?b+"="+c+"7D":d})};c.2c||(g.1Q(),a.1j.2p(!0));a(i).14("7m.4f 7j.1h.4f",7(){1c{i.E.P=1a 0,g.1Q()}1e(f){e("4e 38 4h 1S 1Z 1x 1U a 7f 1x 7g 4k 3a. 4w: "+f.3d,"7z")}});"7"===B c.1W?c.1W.1g(K):e("7y n\\S \\1L 3b 4I\\1F\\S")};a.1j.1V=7(b){F e;e=a(K);e.1j=33 a.1V(K,b);T e}}1e(k){"U"!==B M&&"7"===B M.1f&&M.1f("2g! ",k)}})(K);(7(l){1c{F a=2S;i.J=i.J||{};i.J.G={};i.J.1R=!1;i.J.7A=!1;i.J.7B=!1;F e=7(){F b,e,m,c;V(i.J.1R){e=!1;m={};i.J.G={};22(c 2z i.E.P.G)"1u"===B i.E.P.G[c]&&(b=i.E.P.G[c],"U"!==B b.1d&&6l!==b.1d&&""!==b.1d&&(i.J.G["1I"+b.1d]=i.J.G["1I"+b.1d]||{},i.J.G["1I"+b.1d].4A=b.1d,m["1I"+b.1d]||(i.J.G["1I"+b.1d].1K=0),i.J.G["1I"+b.1d].1K+=b.1r,e=!0,m["1I"+b.1d]=!0));c=e}1J c=1a 0;i.J.1R&&(a(".6-1t-1z").23(),a(".6-1t-1T-2Y").X("6-1t-1T-2Y"));22(F l 2z i.J.G){b=i.J.G[l];V("1u"!==B b)T;m=a("20.6-1d[32="+b.4A+"]").4z("7x");V(i.J.1R||!m.H(".6-1t-1z").1q)e=a(\'<I D="6-1t-1z" 7s="4E 2n 1U 4C 2Z 4B."><I D="6-1t-4y"><I D="6-1t-1K"></I></I></I>\'),e.H(".6-1t-1K").1k(b.1K),b=m.H(".5k"),b.1q?b.4J(e).10("6-1t-1T-2Y"):m.4J(e)}c&&(i.J.1R=!1)};i.J.1C=7(){i.J.1R=!0;e.1g(K)};a(2A).5c(7(){e.1g(K)})}1e(b){"U"!==B M&&"7"===B M.1f&&M.1f("2g! ",b)}})(K);(7(){1c{F l=2S,a,e={2h:".5d",29:{},2f:{}};l.5a=7(b){F k={};a=l.4x(!0,{},e,b);b=l(a.2h).1V(a.29);k.2f="U"!==B a.29.2c&&!1===a.29.2c?l(a.2h).4m(b.1j,a.2f):l(a.2h).4m(a.2f);k.29=b;T k};l.1j.30=7(){"1u"===B M&&"7"===B M.1E&&M.1E("O 52 37 n\\S \\1L 5V 6f 6h 6a. A 6c\\S 5S 5R\\5y 28 5q 4o 4Q\\4P 53 e 5e 1S 56 73 \\77 2Q 36.")};l.30=l.1j.30}1e(b){"U"!==B M&&"7"===B M.1f&&M.1f("2g! ",b)}})();',62,498,'||||||qd|function|ddc||||||||||window|||||||||||||||||||typeof|div|class|_QuatroDigital_DropDown|var|items|find|span|_QuatroDigital_AmountProduct|this||console|||getOrderForm|25C2||u00e3o|return|undefined|if|data|removeClass|sku||addClass|texts|||on|attr|||||void|val|try|productId|catch|error|call|vtex|foi|fn|html|cartTotal|index|replace|loading|checkout|length|quantity|_QuatroDigital_CartData|bap|object|href|u00edvel|do|25A8pbz|wrapper|25A8oe|poss|exec|js|info|u00e7|join|shipping|prod_|else|qtt|u00e9|u0391|id|click|add|getCartInfoByUrl|allowRecalculate|os|item|carrinho|QD_dropDownCart|callback|cartIsEmpty|prodCell|dados|input|shippingData|for|remove|smartCheckout|body|||esta|dropDown|each|cart|updateOnlyHover|timeRemoveNewItemClass|sellingPrice|buyButton|Oooops|selector|DropDown|emptyCart|adminCart|dataOptionsCache|fail|no|done|simpleCart|vtexjs|allowUpdate|descontinuado|scrollCart|u00e9todo|keyup|bb|changeQantity|callbackProductsList|in|document|25A8rubetnavpb|obter|prodRow|com|alert|apply|82|quantityMore|noItems|parseInt|D1|prodWrapper2|isNaN|skuName|prodWrapper|Quatro|setTimeout|jQuery|empty|SKU|u00e1|quantityMinus|qd_ddc_closeFn|added|este|smartCart|qd_ddc_continueShopping|value|new|toLowerCase|total|Digital|Cart|ao|totalizers|VTEX|uma|append|message|warn|CEP|tentar|aviso|product|src|loaded|insertProdImg|time|rendered|lastAddedFixed|alerta|actionButtons|prodQttWrapper|um|address|lastSku|qd_on|continueShopping|SDK|min|br|io|encontrada|biblioteca|lightBoxProdAdd|qd_ddc_lightBoxClose|row|cep|label|C2|25A8igrkpbzzreprfgnoyr|jjj|25A8igrkpbzzreprorgn|E0|B8|u0472|u2202|84|lightBoxBodyProdAdd|scrollUp|renderProductsList|prodLoaded|infoAllTotal|infoTotalShipping|type|clearfix|name|prodPrice|prodName|infoTotalItems|infoTotalValue|viewCart|qd_ddc_hover|scrollDown|linkCart|linkCheckout|cartContainer|shippingForm|infoTotal|image|lastAdded|Problemas|qdDdcVtex|removeProduct|atualizar|qdDdcLastPostalCode|postalCode|da|frete|QD_buyButton|boolean|tem|Aten|stop|pelo|composta|localizar|chave|buscada|Detalhes|extend|wrapper2|getParent|prodId|produto|para|preventDefault|Itens|qd_ddc_change|shippingCalculate|keyCode|fun|prepend|ajax|url|CDN|async|script|u00e7a|licen|buscar|dataType|Script|25C|orderform|Calcular|Comprando|qd_ddc_scrollUp|tel|5E3|placeholder|Smart|restrita|prodLoading|Continuar|direitos|aqui|por|wrapper3|QD_smartCart|off|ajaxStop|qdDdcContainer|todos|par|executado|products|ser|infoBts|qd_bap_wrapper_content|qd_ddc_lightBoxOverlay|25A8dhngebqvtvgny|execu|qd_ddc_minus|Compra|executando|indexOf|rc|ls|ti|break|qu|8F|u00ea|A1|A1g|83d|CF|tr|escape|charCodeAt|zA|122|90|String|u00a8|toUpperCase|mm|erc|co|encodeURIComponent|ite|voc|que|Ir|Carrinho|mais|u0472J|u0abd|u01ac|Finalizar|qd_ddc_scrollDown|Seu|ainda|Total|Frete|Subtotal|u0aef|u0ae8|eval|u0e17|forma|C5|vers|u00c3|u221a|iniciado|u03a1|desta|u00a1|u2113|nenhum|null|ru|definir|appendTo|imageUrl|betnavpb|base|nos|itens|is|filter|aten|jj|100|removeItems|Gr|u00e1tis|25A8igrkpbzzrepr|qd_ddc_cep|rube|meta|etnavpb|qd_number_format|rub|content|currency|outerHeight|parent|Contacte|SAC|slideUp|nem|imagem|qd_ddc_remove|unshift|qd_ddc_more|focusout|not|Callbacks|URL|informada|updateItems|updateCartData|quantidade|reservados|de|calcular|BRA|u00e0|load|calculateShipping|country|availability|remover|rubetn|allTotal|partir|eveento|clone|requisi|minicartUpdated|Este|category|productAddedToCart|navpb|QD_checkoutQueue|avpb|25A8igrk|mouseleave|title|600|setInterval|mouseenter|clearInterval|li|Callback|avisso|buyButtonClicked|quickViewUpdate|fromCharCode|px|rubet|qttLoading|animate|text|scrollTop|prodQtt|column5|prodRemove|tnavpb|departament|prodRowLoading|height|removeWrapper|column4|column3|column1|prodImg|qd_ddc_prodRow|split|productCategoryIds|prodImgWrapper|img|column2|imgLoading'.split('|'),0,{}));

/* Quatro Digital Amazing Menu */
var _0xfd2e=['hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul',':not(ul)','qd-am-elem-','text','replaceSpecialChars','>li','>ul','qdAmAddNdx','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','add','-li','callback','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','info','error','apply','join','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','getParent','.box-banner','clone','insertBefore'];(function(_0x58861b,_0x2fa9f1){var _0x3d29d1=function(_0x374332){while(--_0x374332){_0x58861b['push'](_0x58861b['shift']());}};_0x3d29d1(++_0x2fa9f1);}(_0xfd2e,0x6e));var _0xefd2=function(_0x540c5c,_0x4831cd){_0x540c5c=_0x540c5c-0x0;var _0x1fd60e=_0xfd2e[_0x540c5c];return _0x1fd60e;};(function(_0x439c3e){_0x439c3e['fn']['getParent']=_0x439c3e['fn'][_0xefd2('0x0')];}(jQuery));(function(_0x4e6de0){var _0x38035b;var _0x59c84e=jQuery;if(_0xefd2('0x1')!==typeof _0x59c84e['fn'][_0xefd2('0x2')]){var _0x2b6511={'url':_0xefd2('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x2e095c=function(_0x578538,_0x5124c6){if(_0xefd2('0x4')===typeof console&&'undefined'!==typeof console['error']&&_0xefd2('0x5')!==typeof console['info']&&_0xefd2('0x5')!==typeof console[_0xefd2('0x6')]){var _0x4483e5;_0xefd2('0x4')===typeof _0x578538?(_0x578538[_0xefd2('0x7')](_0xefd2('0x8')),_0x4483e5=_0x578538):_0x4483e5=[_0xefd2('0x8')+_0x578538];if('undefined'===typeof _0x5124c6||_0xefd2('0x9')!==_0x5124c6[_0xefd2('0xa')]()&&_0xefd2('0xb')!==_0x5124c6[_0xefd2('0xa')]())if(_0xefd2('0x5')!==typeof _0x5124c6&&_0xefd2('0xc')===_0x5124c6[_0xefd2('0xa')]())try{console[_0xefd2('0xc')]['apply'](console,_0x4483e5);}catch(_0x5b6df5){try{console[_0xefd2('0xc')](_0x4483e5['join']('\x0a'));}catch(_0x58effd){}}else try{console[_0xefd2('0xd')][_0xefd2('0xe')](console,_0x4483e5);}catch(_0x1150ec){try{console[_0xefd2('0xd')](_0x4483e5[_0xefd2('0xf')]('\x0a'));}catch(_0x518354){}}else try{console[_0xefd2('0x6')][_0xefd2('0xe')](console,_0x4483e5);}catch(_0x2e706a){try{console[_0xefd2('0x6')](_0x4483e5[_0xefd2('0xf')]('\x0a'));}catch(_0x471e3b){}}}};_0x59c84e['fn']['qdAmAddNdx']=function(){var _0x48ef07=_0x59c84e(this);_0x48ef07[_0xefd2('0x10')](function(_0x111d7b){_0x59c84e(this)[_0xefd2('0x11')](_0xefd2('0x12')+_0x111d7b);});_0x48ef07[_0xefd2('0x13')]()['addClass'](_0xefd2('0x14'));_0x48ef07[_0xefd2('0x15')]()[_0xefd2('0x11')](_0xefd2('0x16'));return _0x48ef07;};_0x59c84e['fn']['QD_amazingMenu']=function(){};_0x4e6de0=function(_0x115ad8){var _0x387398={'r':_0xefd2('0x17')};return function(_0x13a640){var _0x570473=function(_0x292b2d){return _0x292b2d;};var _0xb5b076=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x13a640=_0x13a640['d'+_0xb5b076[0x10]+'c'+_0xb5b076[0x11]+'m'+_0x570473(_0xb5b076[0x1])+'n'+_0xb5b076[0xd]]['l'+_0xb5b076[0x12]+'c'+_0xb5b076[0x0]+'ti'+_0x570473('o')+'n'];var _0xfd1d0f=function(_0x25196e){return escape(encodeURIComponent(_0x25196e[_0xefd2('0x18')](/\./g,'¨')[_0xefd2('0x18')](/[a-zA-Z]/g,function(_0x41918a){return String['fromCharCode'](('Z'>=_0x41918a?0x5a:0x7a)>=(_0x41918a=_0x41918a['charCodeAt'](0x0)+0xd)?_0x41918a:_0x41918a-0x1a);})));};var _0x31180b=_0xfd1d0f(_0x13a640[[_0xb5b076[0x9],_0x570473('o'),_0xb5b076[0xc],_0xb5b076[_0x570473(0xd)]][_0xefd2('0xf')]('')]);_0xfd1d0f=_0xfd1d0f((window[['js',_0x570473('no'),'m',_0xb5b076[0x1],_0xb5b076[0x4][_0xefd2('0x19')](),_0xefd2('0x1a')][_0xefd2('0xf')]('')]||_0xefd2('0x1b'))+['.v',_0xb5b076[0xd],'e',_0x570473('x'),'co',_0x570473('mm'),_0xefd2('0x1c'),_0xb5b076[0x1],'.c',_0x570473('o'),'m.',_0xb5b076[0x13],'r'][_0xefd2('0xf')](''));for(var _0x159a53 in _0x387398){if(_0xfd1d0f===_0x159a53+_0x387398[_0x159a53]||_0x31180b===_0x159a53+_0x387398[_0x159a53]){var _0x519d9='tr'+_0xb5b076[0x11]+'e';break;}_0x519d9='f'+_0xb5b076[0x0]+'ls'+_0x570473(_0xb5b076[0x1])+'';}_0x570473=!0x1;-0x1<_0x13a640[[_0xb5b076[0xc],'e',_0xb5b076[0x0],'rc',_0xb5b076[0x9]][_0xefd2('0xf')]('')]['indexOf'](_0xefd2('0x1d'))&&(_0x570473=!0x0);return[_0x519d9,_0x570473];}(_0x115ad8);}(window);if(!eval(_0x4e6de0[0x0]))return _0x4e6de0[0x1]?_0x2e095c(_0xefd2('0x1e')):!0x1;var _0x127e4f=function(_0x398ce2){var _0x10ec88=_0x398ce2[_0xefd2('0x1f')](_0xefd2('0x20'));var _0x5955a4=_0x10ec88[_0xefd2('0x21')](_0xefd2('0x22'));var _0x25f25a=_0x10ec88[_0xefd2('0x21')](_0xefd2('0x23'));if(_0x5955a4['length']||_0x25f25a[_0xefd2('0x24')])_0x5955a4[_0xefd2('0x25')]()['addClass'](_0xefd2('0x26')),_0x25f25a[_0xefd2('0x25')]()[_0xefd2('0x11')](_0xefd2('0x27')),_0x59c84e[_0xefd2('0x28')]({'url':_0x38035b[_0xefd2('0x29')],'dataType':_0xefd2('0x2a'),'success':function(_0x1202a2){var _0xe3f882=_0x59c84e(_0x1202a2);_0x5955a4[_0xefd2('0x10')](function(){var _0x1202a2=_0x59c84e(this);var _0x5a90d7=_0xe3f882[_0xefd2('0x1f')](_0xefd2('0x2b')+_0x1202a2[_0xefd2('0x2c')](_0xefd2('0x2d'))+'\x27]');_0x5a90d7[_0xefd2('0x24')]&&(_0x5a90d7[_0xefd2('0x10')](function(){_0x59c84e(this)[_0xefd2('0x2e')](_0xefd2('0x2f'))[_0xefd2('0x30')]()[_0xefd2('0x31')](_0x1202a2);}),_0x1202a2[_0xefd2('0x32')]());})['addClass'](_0xefd2('0x33'));_0x25f25a[_0xefd2('0x10')](function(){var _0x1202a2={};var _0x38ed70=_0x59c84e(this);_0xe3f882[_0xefd2('0x1f')]('h2')['each'](function(){if(_0x59c84e(this)['text']()[_0xefd2('0x34')]()['toLowerCase']()==_0x38ed70[_0xefd2('0x2c')](_0xefd2('0x2d'))[_0xefd2('0x34')]()[_0xefd2('0xa')]())return _0x1202a2=_0x59c84e(this),!0x1;});_0x1202a2[_0xefd2('0x24')]&&(_0x1202a2['each'](function(){_0x59c84e(this)[_0xefd2('0x2e')](_0xefd2('0x35'))[_0xefd2('0x30')]()[_0xefd2('0x31')](_0x38ed70);}),_0x38ed70[_0xefd2('0x32')]());})[_0xefd2('0x11')](_0xefd2('0x33'));},'error':function(){_0x2e095c(_0xefd2('0x36')+_0x38035b[_0xefd2('0x29')]+_0xefd2('0x37'));},'complete':function(){_0x38035b[_0xefd2('0x38')][_0xefd2('0x39')](this);_0x59c84e(window)[_0xefd2('0x3a')](_0xefd2('0x3b'),_0x398ce2);},'clearQueueDelay':0xbb8});};_0x59c84e[_0xefd2('0x2')]=function(_0x40f773){var _0x2f0ba9=_0x40f773[_0xefd2('0x1f')](_0xefd2('0x3c'))[_0xefd2('0x10')](function(){var _0x3b61bd=_0x59c84e(this);if(!_0x3b61bd['length'])return _0x2e095c([_0xefd2('0x3d'),_0x40f773],'alerta');_0x3b61bd[_0xefd2('0x1f')]('li\x20>ul')['parent']()[_0xefd2('0x11')](_0xefd2('0x3e'));_0x3b61bd[_0xefd2('0x1f')]('li')[_0xefd2('0x10')](function(){var _0x246403=_0x59c84e(this);var _0x54a2b0=_0x246403['children'](_0xefd2('0x3f'));_0x54a2b0['length']&&_0x246403[_0xefd2('0x11')](_0xefd2('0x40')+_0x54a2b0['first']()[_0xefd2('0x41')]()[_0xefd2('0x34')]()[_0xefd2('0x42')]()[_0xefd2('0x18')](/\./g,'')['replace'](/\s/g,'-')[_0xefd2('0xa')]());});var _0x25edec=_0x3b61bd['find'](_0xefd2('0x43'))['qdAmAddNdx']();_0x3b61bd[_0xefd2('0x11')]('qd-amazing-menu');_0x25edec=_0x25edec['find'](_0xefd2('0x44'));_0x25edec[_0xefd2('0x10')](function(){var _0x54e2c5=_0x59c84e(this);_0x54e2c5[_0xefd2('0x1f')]('>li')[_0xefd2('0x45')]()['addClass'](_0xefd2('0x46'));_0x54e2c5[_0xefd2('0x11')](_0xefd2('0x47'));_0x54e2c5['parent']()[_0xefd2('0x11')](_0xefd2('0x48'));});_0x25edec['addClass']('qd-am-dropdown');var _0x269f58=0x0,_0x4e6de0=function(_0x4fad61){_0x269f58+=0x1;_0x4fad61=_0x4fad61[_0xefd2('0x49')]('li')[_0xefd2('0x49')]('*');_0x4fad61[_0xefd2('0x24')]&&(_0x4fad61[_0xefd2('0x11')]('qd-am-level-'+_0x269f58),_0x4e6de0(_0x4fad61));};_0x4e6de0(_0x3b61bd);_0x3b61bd[_0xefd2('0x4a')](_0x3b61bd[_0xefd2('0x1f')]('ul'))[_0xefd2('0x10')](function(){var _0x5222a4=_0x59c84e(this);_0x5222a4[_0xefd2('0x11')]('qd-am-'+_0x5222a4[_0xefd2('0x49')]('li')['length']+_0xefd2('0x4b'));});});_0x127e4f(_0x2f0ba9);_0x38035b[_0xefd2('0x4c')]['call'](this);_0x59c84e(window)[_0xefd2('0x3a')](_0xefd2('0x4d'),_0x40f773);};_0x59c84e['fn'][_0xefd2('0x2')]=function(_0x56be05){var _0x50a54d=_0x59c84e(this);if(!_0x50a54d[_0xefd2('0x24')])return _0x50a54d;_0x38035b=_0x59c84e['extend']({},_0x2b6511,_0x56be05);_0x50a54d[_0xefd2('0x4e')]=new _0x59c84e[(_0xefd2('0x2'))](_0x59c84e(this));return _0x50a54d;};_0x59c84e(function(){_0x59c84e(_0xefd2('0x4f'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0xa321=['_QuatroDigital_DropDown','vtexjs','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','.productQuickView','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','preventDefault','buyButton','qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','body','[href=\x27','qd-bb-itemAddBuyButtonWrapper','removeClass','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','execDefaultAction','redirect=false','queue','buyIfQuantityZeroed','test','match','push','productPageCallback','buyButtonClickCallback','ku=','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','QD_buyButton','.qd-bb-itemAddWrapper','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','productAddedToCart.qdSbbVtex','ajaxStop','abs','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','QD_dropDownCart','yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','SDK','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','allowUpdate','mouseleave.qd_ddc_hover','texts','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','empty','qd-ddc-','availability','sellingPrice','Grátis','.qd-ddc-quantity','.qd-ddc-remove','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','cartIsEmpty','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','qd_on','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','$1-$2$3','calculateShipping','BRA','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','remove','.qd-bap-item-added','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','qd-bap-item-added','QD_smartCart','dropDown','smartCart','getParent','undefined','pow','round','toFixed','split','length','replace','join','function','prototype','trim','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','stringify','url','type','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','message','version','4.0','closest','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','Shipping','totalizers','total','currencySymbol','allTotal','qtt','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','.plural','addClass','qd-emptyCart','$this','show','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','cartQttE','itemsTextE','cartQtt','cartTotalE','cartTotal','find','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout'];(function(_0x18ac4a,_0x3970f0){var _0x48cb7a=function(_0x48ad44){while(--_0x48ad44){_0x18ac4a['push'](_0x18ac4a['shift']());}};_0x48cb7a(++_0x3970f0);}(_0xa321,0xec));var _0x1a32=function(_0x2a0738,_0x3c0bc5){_0x2a0738=_0x2a0738-0x0;var _0x159679=_0xa321[_0x2a0738];return _0x159679;};(function(_0x38e9f4){_0x38e9f4['fn'][_0x1a32('0x0')]=_0x38e9f4['fn']['closest'];}(jQuery));function qd_number_format(_0x351dd2,_0xb0b36f,_0x1869f5,_0x3af897){_0x351dd2=(_0x351dd2+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x351dd2=isFinite(+_0x351dd2)?+_0x351dd2:0x0;_0xb0b36f=isFinite(+_0xb0b36f)?Math['abs'](_0xb0b36f):0x0;_0x3af897=_0x1a32('0x1')===typeof _0x3af897?',':_0x3af897;_0x1869f5=_0x1a32('0x1')===typeof _0x1869f5?'.':_0x1869f5;var _0x3da449='',_0x3da449=function(_0xb5cf69,_0x1192cc){var _0xb0b36f=Math[_0x1a32('0x2')](0xa,_0x1192cc);return''+(Math[_0x1a32('0x3')](_0xb5cf69*_0xb0b36f)/_0xb0b36f)[_0x1a32('0x4')](_0x1192cc);},_0x3da449=(_0xb0b36f?_0x3da449(_0x351dd2,_0xb0b36f):''+Math[_0x1a32('0x3')](_0x351dd2))[_0x1a32('0x5')]('.');0x3<_0x3da449[0x0][_0x1a32('0x6')]&&(_0x3da449[0x0]=_0x3da449[0x0][_0x1a32('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x3af897));(_0x3da449[0x1]||'')[_0x1a32('0x6')]<_0xb0b36f&&(_0x3da449[0x1]=_0x3da449[0x1]||'',_0x3da449[0x1]+=Array(_0xb0b36f-_0x3da449[0x1][_0x1a32('0x6')]+0x1)[_0x1a32('0x8')]('0'));return _0x3da449['join'](_0x1869f5);};_0x1a32('0x9')!==typeof String[_0x1a32('0xa')][_0x1a32('0xb')]&&(String[_0x1a32('0xa')][_0x1a32('0xb')]=function(){return this['replace'](/^\s+|\s+$/g,'');});_0x1a32('0x9')!=typeof String['prototype'][_0x1a32('0xc')]&&(String[_0x1a32('0xa')][_0x1a32('0xc')]=function(){return this[_0x1a32('0xd')](0x0)[_0x1a32('0xe')]()+this[_0x1a32('0xf')](0x1)[_0x1a32('0x10')]();});(function(_0xb8fd7f){if('function'!==typeof _0xb8fd7f[_0x1a32('0x11')]){var _0x2834a4={};_0xb8fd7f[_0x1a32('0x12')]=_0x2834a4;0x96>parseInt((_0xb8fd7f['fn'][_0x1a32('0x13')][_0x1a32('0x7')](/[^0-9]+/g,'')+_0x1a32('0x14'))[_0x1a32('0xf')](0x0,0x3),0xa)&&console&&_0x1a32('0x9')==typeof console[_0x1a32('0x15')]&&console['error']();_0xb8fd7f[_0x1a32('0x11')]=function(_0x11d445){try{var _0xb262d6=_0xb8fd7f[_0x1a32('0x16')]({},{'url':'','type':_0x1a32('0x17'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x11d445);var _0x16d840=_0x1a32('0x18')===typeof _0xb262d6[_0x1a32('0x19')]?JSON[_0x1a32('0x1a')](_0xb262d6[_0x1a32('0x19')]):_0xb262d6[_0x1a32('0x19')]['toString']();var _0x42d879=encodeURIComponent(_0xb262d6[_0x1a32('0x1b')]+'|'+_0xb262d6[_0x1a32('0x1c')]+'|'+_0x16d840);_0x2834a4[_0x42d879]=_0x2834a4[_0x42d879]||{};_0x1a32('0x1')==typeof _0x2834a4[_0x42d879][_0x1a32('0x1d')]?_0x2834a4[_0x42d879]['jqXHR']=_0xb8fd7f[_0x1a32('0x1e')](_0xb262d6):(_0x2834a4[_0x42d879]['jqXHR'][_0x1a32('0x1f')](_0xb262d6[_0x1a32('0x20')]),_0x2834a4[_0x42d879]['jqXHR'][_0x1a32('0x21')](_0xb262d6[_0x1a32('0x15')]),_0x2834a4[_0x42d879]['jqXHR'][_0x1a32('0x22')](_0xb262d6[_0x1a32('0x23')]));_0x2834a4[_0x42d879][_0x1a32('0x1d')]['always'](function(){isNaN(parseInt(_0xb262d6[_0x1a32('0x24')]))||setTimeout(function(){_0x2834a4[_0x42d879]['jqXHR']=void 0x0;},_0xb262d6[_0x1a32('0x24')]);});return _0x2834a4[_0x42d879][_0x1a32('0x1d')];}catch(_0x13ed9c){_0x1a32('0x1')!==typeof console&&_0x1a32('0x9')===typeof console[_0x1a32('0x15')]&&console[_0x1a32('0x15')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0x13ed9c[_0x1a32('0x25')]);}};_0xb8fd7f[_0x1a32('0x11')][_0x1a32('0x26')]=_0x1a32('0x27');}}(jQuery));(function(_0x3de77b){_0x3de77b['fn'][_0x1a32('0x0')]=_0x3de77b['fn'][_0x1a32('0x28')];}(jQuery));(function(){var _0xec504a=jQuery;if(_0x1a32('0x9')!==typeof _0xec504a['fn'][_0x1a32('0x29')]){_0xec504a(function(){var _0x5428a7=vtexjs[_0x1a32('0x2a')]['getOrderForm'];vtexjs[_0x1a32('0x2a')][_0x1a32('0x2b')]=function(){return _0x5428a7[_0x1a32('0x2c')]();};});try{window[_0x1a32('0x2d')]=window[_0x1a32('0x2d')]||{};window[_0x1a32('0x2d')][_0x1a32('0x2e')]=!0x1;_0xec504a['fn'][_0x1a32('0x29')]=function(_0x589823,_0x34a30f,_0x506893){var _0x31e221=function(_0xe8b4fa,_0x1bc039){if(_0x1a32('0x18')===typeof console){var _0x53d667=_0x1a32('0x18')===typeof _0xe8b4fa;_0x1a32('0x1')!==typeof _0x1bc039&&_0x1a32('0x2f')===_0x1bc039[_0x1a32('0x10')]()?_0x53d667?console[_0x1a32('0x30')](_0x1a32('0x31'),_0xe8b4fa[0x0],_0xe8b4fa[0x1],_0xe8b4fa[0x2],_0xe8b4fa[0x3],_0xe8b4fa[0x4],_0xe8b4fa[0x5],_0xe8b4fa[0x6],_0xe8b4fa[0x7]):console[_0x1a32('0x30')](_0x1a32('0x31')+_0xe8b4fa):_0x1a32('0x1')!==typeof _0x1bc039&&_0x1a32('0x32')===_0x1bc039['toLowerCase']()?_0x53d667?console[_0x1a32('0x32')]('[Simple\x20Cart]\x0a',_0xe8b4fa[0x0],_0xe8b4fa[0x1],_0xe8b4fa[0x2],_0xe8b4fa[0x3],_0xe8b4fa[0x4],_0xe8b4fa[0x5],_0xe8b4fa[0x6],_0xe8b4fa[0x7]):console['info']('[Simple\x20Cart]\x0a'+_0xe8b4fa):_0x53d667?console['error'](_0x1a32('0x31'),_0xe8b4fa[0x0],_0xe8b4fa[0x1],_0xe8b4fa[0x2],_0xe8b4fa[0x3],_0xe8b4fa[0x4],_0xe8b4fa[0x5],_0xe8b4fa[0x6],_0xe8b4fa[0x7]):console[_0x1a32('0x15')]('[Simple\x20Cart]\x0a'+_0xe8b4fa);}};var _0x32f505=_0xec504a(this);_0x1a32('0x18')===typeof _0x589823?_0x34a30f=_0x589823:(_0x589823=_0x589823||!0x1,_0x32f505=_0x32f505[_0x1a32('0x33')](_0xec504a[_0x1a32('0x34')]['elements']));if(!_0x32f505[_0x1a32('0x6')])return _0x32f505;_0xec504a[_0x1a32('0x34')]['elements']=_0xec504a[_0x1a32('0x34')][_0x1a32('0x35')][_0x1a32('0x33')](_0x32f505);_0x506893=_0x1a32('0x1')===typeof _0x506893?!0x1:_0x506893;var _0x1ce126={'cartQtt':_0x1a32('0x36'),'cartTotal':_0x1a32('0x37'),'itemsText':'.qd_items_text','currencySymbol':(_0xec504a(_0x1a32('0x38'))[_0x1a32('0x39')](_0x1a32('0x3a'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x1deafc=_0xec504a[_0x1a32('0x16')]({},_0x1ce126,_0x34a30f);var _0x209947=_0xec504a('');_0x32f505[_0x1a32('0x3b')](function(){var _0x51ef0c=_0xec504a(this);_0x51ef0c['data'](_0x1a32('0x3c'))||_0x51ef0c[_0x1a32('0x19')](_0x1a32('0x3c'),_0x1deafc);});var _0x2f9638=function(_0x4f6d9f){window[_0x1a32('0x3d')]=window['_QuatroDigital_CartData']||{};for(var _0x589823=0x0,_0x4b0dca=0x0,_0x140fe2=0x0;_0x140fe2<_0x4f6d9f['totalizers'][_0x1a32('0x6')];_0x140fe2++)_0x1a32('0x3e')==_0x4f6d9f['totalizers'][_0x140fe2]['id']&&(_0x4b0dca+=_0x4f6d9f[_0x1a32('0x3f')][_0x140fe2]['value']),_0x589823+=_0x4f6d9f[_0x1a32('0x3f')][_0x140fe2]['value'];window[_0x1a32('0x3d')][_0x1a32('0x40')]=_0x1deafc['currencySymbol']+qd_number_format(_0x589823/0x64,0x2,',','.');window[_0x1a32('0x3d')]['shipping']=_0x1deafc[_0x1a32('0x41')]+qd_number_format(_0x4b0dca/0x64,0x2,',','.');window[_0x1a32('0x3d')][_0x1a32('0x42')]=_0x1deafc[_0x1a32('0x41')]+qd_number_format((_0x589823+_0x4b0dca)/0x64,0x2,',','.');window[_0x1a32('0x3d')][_0x1a32('0x43')]=0x0;if(_0x1deafc['showQuantityByItems'])for(_0x140fe2=0x0;_0x140fe2<_0x4f6d9f[_0x1a32('0x44')][_0x1a32('0x6')];_0x140fe2++)window['_QuatroDigital_CartData'][_0x1a32('0x43')]+=_0x4f6d9f['items'][_0x140fe2][_0x1a32('0x45')];else window[_0x1a32('0x3d')]['qtt']=_0x4f6d9f['items'][_0x1a32('0x6')]||0x0;try{window[_0x1a32('0x3d')][_0x1a32('0x46')]&&window[_0x1a32('0x3d')]['callback'][_0x1a32('0x47')]&&window[_0x1a32('0x3d')]['callback']['fire']();}catch(_0x3a48bc){_0x31e221(_0x1a32('0x48'));}_0x440671(_0x209947);};var _0xa36c60=function(_0x57c5b1,_0x2046d8){0x1===_0x57c5b1?_0x2046d8[_0x1a32('0x49')]()[_0x1a32('0x4a')](_0x1a32('0x4b'))['show']():_0x2046d8[_0x1a32('0x49')]()[_0x1a32('0x4a')](_0x1a32('0x4c'))['show']();};var _0xad61c5=function(_0x4d42f0){0x1>_0x4d42f0?_0x32f505[_0x1a32('0x4d')](_0x1a32('0x4e')):_0x32f505['removeClass']('qd-emptyCart');};var _0x49d60b=function(_0x1fe1c4,_0x469b60){var _0x4f9679=parseInt(window[_0x1a32('0x3d')][_0x1a32('0x43')],0xa);_0x469b60[_0x1a32('0x4f')][_0x1a32('0x50')]();isNaN(_0x4f9679)&&(_0x31e221(_0x1a32('0x51'),_0x1a32('0x2f')),_0x4f9679=0x0);_0x469b60['cartTotalE'][_0x1a32('0x52')](window[_0x1a32('0x3d')][_0x1a32('0x40')]);_0x469b60[_0x1a32('0x53')][_0x1a32('0x52')](_0x4f9679);_0xa36c60(_0x4f9679,_0x469b60[_0x1a32('0x54')]);_0xad61c5(_0x4f9679);};var _0x440671=function(_0x1f16dc){_0x32f505[_0x1a32('0x3b')](function(){var _0x3350ca={};var _0x5bac9a=_0xec504a(this);_0x589823&&_0x5bac9a[_0x1a32('0x19')]('qd_simpleCartOpts')&&_0xec504a[_0x1a32('0x16')](_0x1deafc,_0x5bac9a['data'](_0x1a32('0x3c')));_0x3350ca[_0x1a32('0x4f')]=_0x5bac9a;_0x3350ca[_0x1a32('0x53')]=_0x5bac9a['find'](_0x1deafc[_0x1a32('0x55')])||_0x209947;_0x3350ca[_0x1a32('0x56')]=_0x5bac9a['find'](_0x1deafc[_0x1a32('0x57')])||_0x209947;_0x3350ca['itemsTextE']=_0x5bac9a[_0x1a32('0x58')](_0x1deafc[_0x1a32('0x59')])||_0x209947;_0x3350ca[_0x1a32('0x5a')]=_0x5bac9a[_0x1a32('0x58')](_0x1deafc[_0x1a32('0x5b')])||_0x209947;_0x49d60b(_0x1f16dc,_0x3350ca);_0x5bac9a[_0x1a32('0x4d')](_0x1a32('0x5c'));});};(function(){if(_0x1deafc[_0x1a32('0x5d')]){window[_0x1a32('0x5e')]=window[_0x1a32('0x5e')]||{};if('undefined'!==typeof window[_0x1a32('0x5e')][_0x1a32('0x2b')]&&(_0x506893||!_0x589823))return _0x2f9638(window[_0x1a32('0x5e')][_0x1a32('0x2b')]);if(_0x1a32('0x18')!==typeof window[_0x1a32('0x5f')]||'undefined'===typeof window['vtexjs'][_0x1a32('0x2a')])if(_0x1a32('0x18')===typeof vtex&&'object'===typeof vtex['checkout']&&_0x1a32('0x1')!==typeof vtex[_0x1a32('0x2a')]['SDK'])new vtex[(_0x1a32('0x2a'))]['SDK']();else return _0x31e221(_0x1a32('0x60'));_0xec504a[_0x1a32('0x61')]([_0x1a32('0x44'),'totalizers',_0x1a32('0x62')],{'done':function(_0x53f3c5){_0x2f9638(_0x53f3c5);window[_0x1a32('0x5e')]['getOrderForm']=_0x53f3c5;},'fail':function(_0x2e65b0){_0x31e221([_0x1a32('0x63'),_0x2e65b0]);}});}else alert(_0x1a32('0x64'));}());_0x1deafc['callback']();_0xec504a(window)[_0x1a32('0x65')](_0x1a32('0x66'));return _0x32f505;};_0xec504a['QD_simpleCart']={'elements':_0xec504a('')};_0xec504a(function(){var _0x971340;_0x1a32('0x9')===typeof window[_0x1a32('0x67')]&&(_0x971340=window['ajaxRequestbuyButtonAsynchronous'],window[_0x1a32('0x67')]=function(_0x2e9a04,_0x1aa0e5,_0x17e668,_0x253b19,_0x31f7d7){_0x971340[_0x1a32('0x2c')](this,_0x2e9a04,_0x1aa0e5,_0x17e668,_0x253b19,function(){_0x1a32('0x9')===typeof _0x31f7d7&&_0x31f7d7();_0xec504a[_0x1a32('0x34')]['elements']['each'](function(){var _0x45bba5=_0xec504a(this);_0x45bba5[_0x1a32('0x29')](_0x45bba5[_0x1a32('0x19')](_0x1a32('0x3c')));});});});});var _0x50d4fe=window[_0x1a32('0x68')]||void 0x0;window[_0x1a32('0x68')]=function(_0x4538ba){_0xec504a['fn'][_0x1a32('0x29')](!0x0);_0x1a32('0x9')===typeof _0x50d4fe?_0x50d4fe[_0x1a32('0x2c')](this,_0x4538ba):alert(_0x4538ba);};_0xec504a(function(){var _0x468004=_0xec504a(_0x1a32('0x69'));_0x468004[_0x1a32('0x6')]&&_0x468004[_0x1a32('0x29')]();});_0xec504a(function(){_0xec504a(window)[_0x1a32('0x6a')](_0x1a32('0x6b'),function(){_0xec504a['fn'][_0x1a32('0x29')](!0x0);});});}catch(_0x3c2db3){_0x1a32('0x1')!==typeof console&&_0x1a32('0x9')===typeof console[_0x1a32('0x15')]&&console['error'](_0x1a32('0x6c'),_0x3c2db3);}}}());(function(){var _0x35db9e=function(_0x12072d,_0x131a12){if(_0x1a32('0x18')===typeof console){var _0x42048e=_0x1a32('0x18')===typeof _0x12072d;_0x1a32('0x1')!==typeof _0x131a12&&'alerta'===_0x131a12[_0x1a32('0x10')]()?_0x42048e?console[_0x1a32('0x30')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x12072d[0x0],_0x12072d[0x1],_0x12072d[0x2],_0x12072d[0x3],_0x12072d[0x4],_0x12072d[0x5],_0x12072d[0x6],_0x12072d[0x7]):console[_0x1a32('0x30')](_0x1a32('0x6d')+_0x12072d):_0x1a32('0x1')!==typeof _0x131a12&&_0x1a32('0x32')===_0x131a12['toLowerCase']()?_0x42048e?console['info']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x12072d[0x0],_0x12072d[0x1],_0x12072d[0x2],_0x12072d[0x3],_0x12072d[0x4],_0x12072d[0x5],_0x12072d[0x6],_0x12072d[0x7]):console['info'](_0x1a32('0x6d')+_0x12072d):_0x42048e?console[_0x1a32('0x15')](_0x1a32('0x6d'),_0x12072d[0x0],_0x12072d[0x1],_0x12072d[0x2],_0x12072d[0x3],_0x12072d[0x4],_0x12072d[0x5],_0x12072d[0x6],_0x12072d[0x7]):console['error']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x12072d);}},_0x559bf3=null,_0x5e2735={},_0x2b97db={},_0x2625db={};$[_0x1a32('0x61')]=function(_0x1a5abc,_0x5da5a7){if(null===_0x559bf3)if(_0x1a32('0x18')===typeof window[_0x1a32('0x5f')]&&_0x1a32('0x1')!==typeof window[_0x1a32('0x5f')][_0x1a32('0x2a')])_0x559bf3=window[_0x1a32('0x5f')][_0x1a32('0x2a')];else return _0x35db9e(_0x1a32('0x6e'));var _0x1ee6ae=$[_0x1a32('0x16')]({'done':function(){},'fail':function(){}},_0x5da5a7),_0x376c11=_0x1a5abc[_0x1a32('0x8')](';'),_0x32e97c=function(){_0x5e2735[_0x376c11][_0x1a32('0x33')](_0x1ee6ae[_0x1a32('0x1f')]);_0x2b97db[_0x376c11][_0x1a32('0x33')](_0x1ee6ae[_0x1a32('0x21')]);};_0x2625db[_0x376c11]?_0x32e97c():(_0x5e2735[_0x376c11]=$[_0x1a32('0x6f')](),_0x2b97db[_0x376c11]=$[_0x1a32('0x6f')](),_0x32e97c(),_0x2625db[_0x376c11]=!0x0,_0x559bf3[_0x1a32('0x2b')](_0x1a5abc)[_0x1a32('0x1f')](function(_0x266449){_0x2625db[_0x376c11]=!0x1;_0x5e2735[_0x376c11][_0x1a32('0x47')](_0x266449);})['fail'](function(_0x2e3c9a){_0x2625db[_0x376c11]=!0x1;_0x2b97db[_0x376c11][_0x1a32('0x47')](_0x2e3c9a);}));};}());(function(_0xc09b20){try{var _0x51a36e=jQuery,_0xa67249,_0x5c3765=_0x51a36e({}),_0x3bd079=function(_0x57bedf,_0x3b36ca){if(_0x1a32('0x18')===typeof console&&_0x1a32('0x1')!==typeof console[_0x1a32('0x15')]&&_0x1a32('0x1')!==typeof console['info']&&_0x1a32('0x1')!==typeof console[_0x1a32('0x30')]){var _0x406786;_0x1a32('0x18')===typeof _0x57bedf?(_0x57bedf[_0x1a32('0x70')](_0x1a32('0x71')),_0x406786=_0x57bedf):_0x406786=[_0x1a32('0x71')+_0x57bedf];if(_0x1a32('0x1')===typeof _0x3b36ca||_0x1a32('0x2f')!==_0x3b36ca[_0x1a32('0x10')]()&&'aviso'!==_0x3b36ca[_0x1a32('0x10')]())if('undefined'!==typeof _0x3b36ca&&_0x1a32('0x32')===_0x3b36ca[_0x1a32('0x10')]())try{console[_0x1a32('0x32')]['apply'](console,_0x406786);}catch(_0x2351e6){try{console[_0x1a32('0x32')](_0x406786[_0x1a32('0x8')]('\x0a'));}catch(_0x6537d3){}}else try{console[_0x1a32('0x15')][_0x1a32('0x72')](console,_0x406786);}catch(_0x4b5cfb){try{console[_0x1a32('0x15')](_0x406786['join']('\x0a'));}catch(_0x27b62a){}}else try{console[_0x1a32('0x30')][_0x1a32('0x72')](console,_0x406786);}catch(_0xa33390){try{console['warn'](_0x406786[_0x1a32('0x8')]('\x0a'));}catch(_0x125c93){}}}},_0x41628e={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x1a32('0x73'),'buyQtt':_0x1a32('0x74'),'selectSkuMsg':'javascript:','autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x4b8917,_0x3f7f54,_0x3a0e35){_0x51a36e('body')['is'](_0x1a32('0x75'))&&(_0x1a32('0x20')===_0x3f7f54?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x1a32('0x76')),(_0x1a32('0x18')===typeof parent?parent:document)[_0x1a32('0x77')][_0x1a32('0x78')]=_0x3a0e35));},'isProductPage':function(){return _0x51a36e('body')['is'](_0x1a32('0x79'));},'execDefaultAction':function(_0x1df41f){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x51a36e['QD_buyButton']=function(_0x5cf207,_0x16ce4c){function _0x230802(_0x1b35d9){_0xa67249[_0x1a32('0x7a')]?_0x1b35d9[_0x1a32('0x19')](_0x1a32('0x7b'))||(_0x1b35d9[_0x1a32('0x19')]('qd-bb-click-active',0x1),_0x1b35d9['on'](_0x1a32('0x7c'),function(_0x31ee20){if(!_0xa67249['allowBuyClick']())return!0x0;if(!0x0!==_0x20eaf0[_0x1a32('0x7d')][_0x1a32('0x2c')](this))return _0x31ee20[_0x1a32('0x7e')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x1085ac(_0x21ffb0){_0x21ffb0=_0x21ffb0||_0x51a36e(_0xa67249[_0x1a32('0x7f')]);_0x21ffb0[_0x1a32('0x3b')](function(){var _0x21ffb0=_0x51a36e(this);_0x21ffb0['is']('.qd-sbb-on')||(_0x21ffb0[_0x1a32('0x4d')](_0x1a32('0x80')),_0x21ffb0['is'](_0x1a32('0x81'))&&!_0x21ffb0['is'](_0x1a32('0x82'))||_0x21ffb0[_0x1a32('0x19')]('qd-bb-active')||(_0x21ffb0['data'](_0x1a32('0x83'),0x1),_0x21ffb0[_0x1a32('0x84')](_0x1a32('0x85'))[_0x1a32('0x6')]||_0x21ffb0[_0x1a32('0x86')](_0x1a32('0x87')),_0x21ffb0['is']('.buy-in-page-button')&&_0xa67249[_0x1a32('0x88')]()&&_0x5a476a[_0x1a32('0x2c')](_0x21ffb0),_0x230802(_0x21ffb0)));});_0xa67249[_0x1a32('0x88')]()&&!_0x21ffb0[_0x1a32('0x6')]&&_0x3bd079(_0x1a32('0x89')+_0x21ffb0[_0x1a32('0x8a')]+'\x27.','info');}var _0x25a8d6=_0x51a36e(_0x5cf207);var _0x20eaf0=this;window['_Quatro_Digital_dropDown']=window[_0x1a32('0x8b')]||{};window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};_0x20eaf0[_0x1a32('0x8c')]=function(_0x372648,_0x130d98){_0x25a8d6['addClass'](_0x1a32('0x8d'));_0x51a36e(_0x1a32('0x8e'))[_0x1a32('0x4d')]('qd-bb-lightBoxBodyProdAdd');var _0x25293e=_0x51a36e(_0xa67249[_0x1a32('0x7f')])[_0x1a32('0x4a')](_0x1a32('0x8f')+(_0x372648[_0x1a32('0x39')]('href')||'---')+'\x27]')['add'](_0x372648);_0x25293e[_0x1a32('0x4d')](_0x1a32('0x90'));setTimeout(function(){_0x25a8d6[_0x1a32('0x91')](_0x1a32('0x92'));_0x25293e[_0x1a32('0x91')]('qd-bb-itemAddBuyButtonWrapper');},_0xa67249['timeRemoveNewItemClass']);window[_0x1a32('0x8b')][_0x1a32('0x2b')]=void 0x0;if(_0x1a32('0x1')!==typeof _0x16ce4c&&'function'===typeof _0x16ce4c[_0x1a32('0x93')])return _0xa67249['isSmartCheckout']||(_0x3bd079(_0x1a32('0x94')),_0x16ce4c[_0x1a32('0x93')]()),window[_0x1a32('0x5e')][_0x1a32('0x2b')]=void 0x0,_0x16ce4c[_0x1a32('0x93')](function(_0x21a33e){window[_0x1a32('0x8b')][_0x1a32('0x2b')]=_0x21a33e;_0x51a36e['fn'][_0x1a32('0x29')](!0x0,void 0x0,!0x0);},{'lastSku':_0x130d98});window[_0x1a32('0x8b')]['allowUpdate']=!0x0;_0x51a36e['fn'][_0x1a32('0x29')](!0x0);};(function(){if(_0xa67249[_0x1a32('0x7a')]&&_0xa67249[_0x1a32('0x95')]){var _0x2fee81=_0x51a36e(_0x1a32('0x81'));_0x2fee81[_0x1a32('0x6')]&&_0x1085ac(_0x2fee81);}}());var _0x5a476a=function(){var _0x537bd8=_0x51a36e(this);_0x1a32('0x1')!==typeof _0x537bd8[_0x1a32('0x19')](_0x1a32('0x7f'))?(_0x537bd8[_0x1a32('0x96')](_0x1a32('0x97')),_0x230802(_0x537bd8)):(_0x537bd8[_0x1a32('0x6a')](_0x1a32('0x98'),function(_0x23efa4){_0x537bd8[_0x1a32('0x96')](_0x1a32('0x97'));_0x230802(_0x537bd8);_0x51a36e(this)[_0x1a32('0x96')](_0x23efa4);}),_0x51a36e(window)[_0x1a32('0x99')](function(){_0x537bd8[_0x1a32('0x96')](_0x1a32('0x97'));_0x230802(_0x537bd8);_0x537bd8[_0x1a32('0x96')](_0x1a32('0x98'));}));};_0x20eaf0[_0x1a32('0x7d')]=function(){var _0x254c29=_0x51a36e(this),_0x5cf207=_0x254c29['attr'](_0x1a32('0x78'))||'';if(-0x1<_0x5cf207[_0x1a32('0x9a')](_0xa67249['selectSkuMsg']))return!0x0;_0x5cf207=_0x5cf207[_0x1a32('0x7')](/redirect\=(false|true)/gi,'')[_0x1a32('0x7')]('?','?redirect=false&')[_0x1a32('0x7')](/\&\&/gi,'&');if(_0xa67249[_0x1a32('0x9b')](_0x254c29))return _0x254c29['attr'](_0x1a32('0x78'),_0x5cf207[_0x1a32('0x7')](_0x1a32('0x9c'),'redirect=true')),!0x0;_0x5cf207=_0x5cf207[_0x1a32('0x7')](/http.?:/i,'');_0x5c3765[_0x1a32('0x9d')](function(_0x223cad){if(!_0xa67249[_0x1a32('0x9e')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x1a32('0x9f')](_0x5cf207))return _0x223cad();var _0x461df9=function(_0x4b6d1f,_0x1d7d73){var _0x1085ac=_0x5cf207[_0x1a32('0xa0')](/sku\=([0-9]+)/gi),_0xc7e9b4=[];if(_0x1a32('0x18')===typeof _0x1085ac&&null!==_0x1085ac)for(var _0x5da309=_0x1085ac['length']-0x1;0x0<=_0x5da309;_0x5da309--){var _0x21a623=parseInt(_0x1085ac[_0x5da309][_0x1a32('0x7')](/sku\=/gi,''));isNaN(_0x21a623)||_0xc7e9b4[_0x1a32('0xa1')](_0x21a623);}_0xa67249[_0x1a32('0xa2')][_0x1a32('0x2c')](this,_0x4b6d1f,_0x1d7d73,_0x5cf207);_0x20eaf0[_0x1a32('0xa3')]['call'](this,_0x4b6d1f,_0x1d7d73,_0x5cf207,_0xc7e9b4);_0x20eaf0[_0x1a32('0x8c')](_0x254c29,_0x5cf207[_0x1a32('0x5')](_0x1a32('0xa4'))[_0x1a32('0xa5')]()[_0x1a32('0x5')]('&')[_0x1a32('0xa6')]());'function'===typeof _0xa67249[_0x1a32('0xa7')]&&_0xa67249[_0x1a32('0xa7')]['call'](this);_0x51a36e(window)[_0x1a32('0x65')](_0x1a32('0xa8'));_0x51a36e(window)[_0x1a32('0x65')](_0x1a32('0xa9'));};_0xa67249[_0x1a32('0xaa')]?(_0x461df9(null,_0x1a32('0x20')),_0x223cad()):_0x51a36e[_0x1a32('0x1e')]({'url':_0x5cf207,'complete':_0x461df9})[_0x1a32('0x22')](function(){_0x223cad();});});};_0x20eaf0[_0x1a32('0xa3')]=function(_0xaa428f,_0x463c2f,_0x27bae6,_0x2807d1){try{_0x1a32('0x20')===_0x463c2f&&_0x1a32('0x18')===typeof window[_0x1a32('0xab')]&&_0x1a32('0x9')===typeof window[_0x1a32('0xab')][_0x1a32('0xac')]&&window[_0x1a32('0xab')][_0x1a32('0xac')](_0xaa428f,_0x463c2f,_0x27bae6,_0x2807d1);}catch(_0x37338a){_0x3bd079('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x1085ac();_0x1a32('0x9')===typeof _0xa67249[_0x1a32('0x46')]?_0xa67249[_0x1a32('0x46')]['call'](this):_0x3bd079(_0x1a32('0xad'));};var _0x56c47b=_0x51a36e[_0x1a32('0x6f')]();_0x51a36e['fn'][_0x1a32('0xae')]=function(_0x6574d3,_0x49d3fc){var _0xc09b20=_0x51a36e(this);'undefined'!==typeof _0x49d3fc||_0x1a32('0x18')!==typeof _0x6574d3||_0x6574d3 instanceof _0x51a36e||(_0x49d3fc=_0x6574d3,_0x6574d3=void 0x0);_0xa67249=_0x51a36e['extend']({},_0x41628e,_0x49d3fc);var _0x1d850d;_0x56c47b[_0x1a32('0x33')](function(){_0xc09b20['children'](_0x1a32('0xaf'))[_0x1a32('0x6')]||_0xc09b20['prepend']('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x1d850d=new _0x51a36e[(_0x1a32('0xae'))](_0xc09b20,_0x6574d3);});_0x56c47b[_0x1a32('0x47')]();_0x51a36e(window)['on'](_0x1a32('0xb0'),function(_0x37cf4c,_0x25dd22,_0x1f7656){_0x1d850d['prodAdd'](_0x25dd22,_0x1f7656);});return _0x51a36e[_0x1a32('0x16')](_0xc09b20,_0x1d850d);};var _0x1f9864=0x0;_0x51a36e(document)[_0x1a32('0xb1')](function(_0x19ad5f,_0x5f2ff8,_0x73bd0e){-0x1<_0x73bd0e[_0x1a32('0x1b')][_0x1a32('0x10')]()['indexOf'](_0x1a32('0xb2'))&&(_0x1f9864=(_0x73bd0e['url'][_0x1a32('0xa0')](/sku\=([0-9]+)/i)||[''])[_0x1a32('0xa5')]());});_0x51a36e(window)[_0x1a32('0x6a')](_0x1a32('0xb3'),function(){_0x51a36e(window)[_0x1a32('0x65')](_0x1a32('0xb0'),[new _0x51a36e(),_0x1f9864]);});_0x51a36e(document)[_0x1a32('0xb4')](function(){_0x56c47b[_0x1a32('0x47')]();});}catch(_0x5dda76){_0x1a32('0x1')!==typeof console&&_0x1a32('0x9')===typeof console[_0x1a32('0x15')]&&console[_0x1a32('0x15')]('Oooops!\x20',_0x5dda76);}}(this));function qd_number_format(_0x565015,_0x4d6520,_0x26099b,_0x2ebcdb){_0x565015=(_0x565015+'')[_0x1a32('0x7')](/[^0-9+\-Ee.]/g,'');_0x565015=isFinite(+_0x565015)?+_0x565015:0x0;_0x4d6520=isFinite(+_0x4d6520)?Math[_0x1a32('0xb5')](_0x4d6520):0x0;_0x2ebcdb=_0x1a32('0x1')===typeof _0x2ebcdb?',':_0x2ebcdb;_0x26099b=_0x1a32('0x1')===typeof _0x26099b?'.':_0x26099b;var _0x1f5f43='',_0x1f5f43=function(_0x1da008,_0x36307d){var _0x31a701=Math[_0x1a32('0x2')](0xa,_0x36307d);return''+(Math[_0x1a32('0x3')](_0x1da008*_0x31a701)/_0x31a701)['toFixed'](_0x36307d);},_0x1f5f43=(_0x4d6520?_0x1f5f43(_0x565015,_0x4d6520):''+Math['round'](_0x565015))[_0x1a32('0x5')]('.');0x3<_0x1f5f43[0x0][_0x1a32('0x6')]&&(_0x1f5f43[0x0]=_0x1f5f43[0x0][_0x1a32('0x7')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2ebcdb));(_0x1f5f43[0x1]||'')['length']<_0x4d6520&&(_0x1f5f43[0x1]=_0x1f5f43[0x1]||'',_0x1f5f43[0x1]+=Array(_0x4d6520-_0x1f5f43[0x1][_0x1a32('0x6')]+0x1)[_0x1a32('0x8')]('0'));return _0x1f5f43[_0x1a32('0x8')](_0x26099b);}(function(){try{window[_0x1a32('0x3d')]=window[_0x1a32('0x3d')]||{},window['_QuatroDigital_CartData'][_0x1a32('0x46')]=window[_0x1a32('0x3d')][_0x1a32('0x46')]||$[_0x1a32('0x6f')]();}catch(_0x49bef8){_0x1a32('0x1')!==typeof console&&_0x1a32('0x9')===typeof console[_0x1a32('0x15')]&&console['error'](_0x1a32('0x6c'),_0x49bef8[_0x1a32('0x25')]);}}());(function(_0x1a15d5){try{var _0x322f86=jQuery,_0x5423f9=function(_0x45faaf,_0x4393bd){if('object'===typeof console&&_0x1a32('0x1')!==typeof console[_0x1a32('0x15')]&&_0x1a32('0x1')!==typeof console['info']&&'undefined'!==typeof console[_0x1a32('0x30')]){var _0x2f974c;_0x1a32('0x18')===typeof _0x45faaf?(_0x45faaf[_0x1a32('0x70')](_0x1a32('0xb6')),_0x2f974c=_0x45faaf):_0x2f974c=[_0x1a32('0xb6')+_0x45faaf];if(_0x1a32('0x1')===typeof _0x4393bd||_0x1a32('0x2f')!==_0x4393bd[_0x1a32('0x10')]()&&_0x1a32('0xb7')!==_0x4393bd[_0x1a32('0x10')]())if('undefined'!==typeof _0x4393bd&&'info'===_0x4393bd[_0x1a32('0x10')]())try{console[_0x1a32('0x32')][_0x1a32('0x72')](console,_0x2f974c);}catch(_0x556d32){try{console[_0x1a32('0x32')](_0x2f974c['join']('\x0a'));}catch(_0x270260){}}else try{console[_0x1a32('0x15')][_0x1a32('0x72')](console,_0x2f974c);}catch(_0xb85071){try{console[_0x1a32('0x15')](_0x2f974c[_0x1a32('0x8')]('\x0a'));}catch(_0x5c3fc9){}}else try{console[_0x1a32('0x30')]['apply'](console,_0x2f974c);}catch(_0x540aa8){try{console[_0x1a32('0x30')](_0x2f974c[_0x1a32('0x8')]('\x0a'));}catch(_0x4f1096){}}}};window[_0x1a32('0x5e')]=window[_0x1a32('0x5e')]||{};window[_0x1a32('0x5e')]['allowUpdate']=!0x0;_0x322f86['QD_dropDownCart']=function(){};_0x322f86['fn'][_0x1a32('0xb8')]=function(){return{'fn':new _0x322f86()};};var _0x395b86=function(_0x4b0756){var _0x358dfd={'r':_0x1a32('0xb9')};return function(_0x1c9c86){var _0x19fdfa=function(_0x4ab72d){return _0x4ab72d;};var _0x3d62b1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1c9c86=_0x1c9c86['d'+_0x3d62b1[0x10]+'c'+_0x3d62b1[0x11]+'m'+_0x19fdfa(_0x3d62b1[0x1])+'n'+_0x3d62b1[0xd]]['l'+_0x3d62b1[0x12]+'c'+_0x3d62b1[0x0]+'ti'+_0x19fdfa('o')+'n'];var _0x4a31bb=function(_0xbe1b6e){return escape(encodeURIComponent(_0xbe1b6e[_0x1a32('0x7')](/\./g,'¨')[_0x1a32('0x7')](/[a-zA-Z]/g,function(_0xd9a71a){return String[_0x1a32('0xba')](('Z'>=_0xd9a71a?0x5a:0x7a)>=(_0xd9a71a=_0xd9a71a[_0x1a32('0xbb')](0x0)+0xd)?_0xd9a71a:_0xd9a71a-0x1a);})));};var _0x1a15d5=_0x4a31bb(_0x1c9c86[[_0x3d62b1[0x9],_0x19fdfa('o'),_0x3d62b1[0xc],_0x3d62b1[_0x19fdfa(0xd)]]['join']('')]);_0x4a31bb=_0x4a31bb((window[['js',_0x19fdfa('no'),'m',_0x3d62b1[0x1],_0x3d62b1[0x4][_0x1a32('0xe')](),_0x1a32('0xbc')][_0x1a32('0x8')]('')]||'---')+['.v',_0x3d62b1[0xd],'e',_0x19fdfa('x'),'co',_0x19fdfa('mm'),_0x1a32('0xbd'),_0x3d62b1[0x1],'.c',_0x19fdfa('o'),'m.',_0x3d62b1[0x13],'r'][_0x1a32('0x8')](''));for(var _0x37652e in _0x358dfd){if(_0x4a31bb===_0x37652e+_0x358dfd[_0x37652e]||_0x1a15d5===_0x37652e+_0x358dfd[_0x37652e]){var _0x3c541e='tr'+_0x3d62b1[0x11]+'e';break;}_0x3c541e='f'+_0x3d62b1[0x0]+'ls'+_0x19fdfa(_0x3d62b1[0x1])+'';}_0x19fdfa=!0x1;-0x1<_0x1c9c86[[_0x3d62b1[0xc],'e',_0x3d62b1[0x0],'rc',_0x3d62b1[0x9]][_0x1a32('0x8')]('')][_0x1a32('0x9a')](_0x1a32('0xbe'))&&(_0x19fdfa=!0x0);return[_0x3c541e,_0x19fdfa];}(_0x4b0756);}(window);if(!eval(_0x395b86[0x0]))return _0x395b86[0x1]?_0x5423f9(_0x1a32('0xbf')):!0x1;_0x322f86[_0x1a32('0xb8')]=function(_0x3d398a,_0x408b77){var _0x1f3ab7=_0x322f86(_0x3d398a);if(!_0x1f3ab7['length'])return _0x1f3ab7;var _0x4a4f76=_0x322f86[_0x1a32('0x16')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x1a32('0xc0'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x1a32('0xc1'),'emptyCart':_0x1a32('0xc2'),'continueShopping':_0x1a32('0xc3'),'shippingForm':_0x1a32('0xc4')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x1dff87){return _0x1dff87[_0x1a32('0xc5')]||_0x1dff87[_0x1a32('0xc6')];},'callback':function(){},'callbackProductsList':function(){}},_0x408b77);_0x322f86('');var _0x1234ef=this;if(_0x4a4f76[_0x1a32('0x5d')]){var _0x31ea4f=!0x1;'undefined'===typeof window[_0x1a32('0x5f')]&&(_0x5423f9(_0x1a32('0xc7')),_0x322f86[_0x1a32('0x1e')]({'url':_0x1a32('0xc8'),'async':!0x1,'dataType':_0x1a32('0xc9'),'error':function(){_0x5423f9(_0x1a32('0xca'));_0x31ea4f=!0x0;}}));if(_0x31ea4f)return _0x5423f9(_0x1a32('0xcb'));}if(_0x1a32('0x18')===typeof window[_0x1a32('0x5f')]&&'undefined'!==typeof window['vtexjs'][_0x1a32('0x2a')])var _0x109ce2=window['vtexjs'][_0x1a32('0x2a')];else if('object'===typeof vtex&&_0x1a32('0x18')===typeof vtex['checkout']&&_0x1a32('0x1')!==typeof vtex[_0x1a32('0x2a')][_0x1a32('0xcc')])_0x109ce2=new vtex[(_0x1a32('0x2a'))][(_0x1a32('0xcc'))]();else return _0x5423f9(_0x1a32('0x60'));_0x1234ef['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x31b8ec=function(_0x3444e1){_0x322f86(this)[_0x1a32('0x86')](_0x3444e1);_0x3444e1['find'](_0x1a32('0xcd'))[_0x1a32('0x33')](_0x322f86(_0x1a32('0xce')))['on'](_0x1a32('0xcf'),function(){_0x1f3ab7[_0x1a32('0x91')](_0x1a32('0xd0'));_0x322f86(document[_0x1a32('0x8e')])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0x322f86(document)[_0x1a32('0xd1')]('keyup.qd_ddc_closeFn')['on'](_0x1a32('0xd2'),function(_0x183886){0x1b==_0x183886[_0x1a32('0xd3')]&&(_0x1f3ab7['removeClass'](_0x1a32('0xd0')),_0x322f86(document[_0x1a32('0x8e')])[_0x1a32('0x91')](_0x1a32('0xd4')));});var _0x563007=_0x3444e1[_0x1a32('0x58')](_0x1a32('0xd5'));_0x3444e1[_0x1a32('0x58')](_0x1a32('0xd6'))['on']('click.qd_ddc_scrollUp',function(){_0x1234ef[_0x1a32('0xd7')]('-',void 0x0,void 0x0,_0x563007);return!0x1;});_0x3444e1['find'](_0x1a32('0xd8'))['on'](_0x1a32('0xd9'),function(){_0x1234ef[_0x1a32('0xd7')](void 0x0,void 0x0,void 0x0,_0x563007);return!0x1;});_0x3444e1[_0x1a32('0x58')](_0x1a32('0xda'))[_0x1a32('0xdb')]('')['on'](_0x1a32('0xdc'),function(){_0x1234ef[_0x1a32('0xdd')](_0x322f86(this));});if(_0x4a4f76[_0x1a32('0xde')]){var _0x408b77=0x0;_0x322f86(this)['on'](_0x1a32('0xdf'),function(){var _0x3444e1=function(){window[_0x1a32('0x5e')][_0x1a32('0xe0')]&&(_0x1234ef[_0x1a32('0x93')](),window['_QuatroDigital_DropDown'][_0x1a32('0xe0')]=!0x1,_0x322f86['fn'][_0x1a32('0x29')](!0x0),_0x1234ef['cartIsEmpty']());};_0x408b77=setInterval(function(){_0x3444e1();},0x258);_0x3444e1();});_0x322f86(this)['on'](_0x1a32('0xe1'),function(){clearInterval(_0x408b77);});}};var _0x11d77a=function(_0x4522f9){_0x4522f9=_0x322f86(_0x4522f9);_0x4a4f76[_0x1a32('0xe2')]['cartTotal']=_0x4a4f76[_0x1a32('0xe2')][_0x1a32('0x57')][_0x1a32('0x7')](_0x1a32('0xe3'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x4a4f76[_0x1a32('0xe2')][_0x1a32('0x57')]=_0x4a4f76[_0x1a32('0xe2')][_0x1a32('0x57')][_0x1a32('0x7')](_0x1a32('0xe4'),_0x1a32('0xe5'));_0x4a4f76['texts'][_0x1a32('0x57')]=_0x4a4f76[_0x1a32('0xe2')][_0x1a32('0x57')][_0x1a32('0x7')](_0x1a32('0xe6'),_0x1a32('0xe7'));_0x4a4f76[_0x1a32('0xe2')][_0x1a32('0x57')]=_0x4a4f76['texts']['cartTotal'][_0x1a32('0x7')]('#total',_0x1a32('0xe8'));_0x4522f9[_0x1a32('0x58')]('.qd-ddc-viewCart')[_0x1a32('0x52')](_0x4a4f76[_0x1a32('0xe2')]['linkCart']);_0x4522f9[_0x1a32('0x58')](_0x1a32('0xe9'))[_0x1a32('0x52')](_0x4a4f76[_0x1a32('0xe2')][_0x1a32('0xea')]);_0x4522f9[_0x1a32('0x58')](_0x1a32('0xeb'))[_0x1a32('0x52')](_0x4a4f76[_0x1a32('0xe2')]['linkCheckout']);_0x4522f9[_0x1a32('0x58')](_0x1a32('0xec'))[_0x1a32('0x52')](_0x4a4f76[_0x1a32('0xe2')][_0x1a32('0x57')]);_0x4522f9[_0x1a32('0x58')](_0x1a32('0xed'))['html'](_0x4a4f76[_0x1a32('0xe2')][_0x1a32('0xee')]);_0x4522f9[_0x1a32('0x58')](_0x1a32('0xef'))[_0x1a32('0x52')](_0x4a4f76[_0x1a32('0xe2')]['emptyCart']);return _0x4522f9;}(this['cartContainer']);var _0x1d8a6f=0x0;_0x1f3ab7[_0x1a32('0x3b')](function(){0x0<_0x1d8a6f?_0x31b8ec['call'](this,_0x11d77a[_0x1a32('0xf0')]()):_0x31b8ec[_0x1a32('0x2c')](this,_0x11d77a);_0x1d8a6f++;});window[_0x1a32('0x3d')][_0x1a32('0x46')]['add'](function(){_0x322f86(_0x1a32('0xf1'))[_0x1a32('0x52')](window[_0x1a32('0x3d')][_0x1a32('0x40')]||'--');_0x322f86(_0x1a32('0xf2'))[_0x1a32('0x52')](window['_QuatroDigital_CartData'][_0x1a32('0x43')]||'0');_0x322f86(_0x1a32('0xf3'))[_0x1a32('0x52')](window['_QuatroDigital_CartData'][_0x1a32('0xf4')]||'--');_0x322f86('.qd-ddc-infoAllTotal')['html'](window['_QuatroDigital_CartData']['allTotal']||'--');});var _0x1a192c=function(_0x5423e4,_0x1576ed){if(_0x1a32('0x1')===typeof _0x5423e4[_0x1a32('0x44')])return _0x5423f9(_0x1a32('0xf5'));_0x1234ef['renderProductsList'][_0x1a32('0x2c')](this,_0x1576ed);};_0x1234ef[_0x1a32('0x93')]=function(_0x3e5fc0,_0x216091){_0x1a32('0x1')!=typeof _0x216091?window[_0x1a32('0x5e')][_0x1a32('0xf6')]=_0x216091:window[_0x1a32('0x5e')][_0x1a32('0xf6')]&&(_0x216091=window[_0x1a32('0x5e')]['dataOptionsCache']);setTimeout(function(){window[_0x1a32('0x5e')]['dataOptionsCache']=void 0x0;},_0x4a4f76[_0x1a32('0xf7')]);_0x322f86(_0x1a32('0xf8'))[_0x1a32('0x91')]('qd-ddc-prodLoaded');if(_0x4a4f76[_0x1a32('0x5d')]){var _0x408b77=function(_0x4541fd){window[_0x1a32('0x5e')]['getOrderForm']=_0x4541fd;_0x1a192c(_0x4541fd,_0x216091);'undefined'!==typeof window[_0x1a32('0xf9')]&&'function'===typeof window[_0x1a32('0xf9')][_0x1a32('0xfa')]&&window[_0x1a32('0xf9')][_0x1a32('0xfa')]['call'](this);_0x322f86('.qd-ddc-wrapper')[_0x1a32('0x4d')]('qd-ddc-prodLoaded');};_0x1a32('0x1')!==typeof window[_0x1a32('0x5e')][_0x1a32('0x2b')]?(_0x408b77(window['_QuatroDigital_DropDown']['getOrderForm']),_0x1a32('0x9')===typeof _0x3e5fc0&&_0x3e5fc0(window['_QuatroDigital_DropDown']['getOrderForm'])):_0x322f86[_0x1a32('0x61')]([_0x1a32('0x44'),'totalizers',_0x1a32('0x62')],{'done':function(_0x482824){_0x408b77[_0x1a32('0x2c')](this,_0x482824);_0x1a32('0x9')===typeof _0x3e5fc0&&_0x3e5fc0(_0x482824);},'fail':function(_0x27e3d4){_0x5423f9([_0x1a32('0xfb'),_0x27e3d4]);}});}else alert(_0x1a32('0xfc'));};_0x1234ef['cartIsEmpty']=function(){var _0x23c770=_0x322f86(_0x1a32('0xf8'));_0x23c770[_0x1a32('0x58')](_0x1a32('0xfd'))[_0x1a32('0x6')]?_0x23c770[_0x1a32('0x91')]('qd-ddc-noItems'):_0x23c770['addClass'](_0x1a32('0xfe'));};_0x1234ef[_0x1a32('0xff')]=function(_0x3b1498){var _0x408b77=_0x322f86(_0x1a32('0x100'));_0x408b77[_0x1a32('0x101')]();_0x408b77[_0x1a32('0x3b')](function(){var _0x408b77=_0x322f86(this),_0x3d398a,_0x18928d,_0x3c5dd0=_0x322f86(''),_0xb70398;for(_0xb70398 in window[_0x1a32('0x5e')][_0x1a32('0x2b')][_0x1a32('0x44')])if(_0x1a32('0x18')===typeof window[_0x1a32('0x5e')][_0x1a32('0x2b')][_0x1a32('0x44')][_0xb70398]){var _0x208af3=window['_QuatroDigital_DropDown'][_0x1a32('0x2b')]['items'][_0xb70398];var _0x10355d=_0x208af3['productCategoryIds'][_0x1a32('0x7')](/^\/|\/$/g,'')[_0x1a32('0x5')]('/');var _0x18a9d1=_0x322f86('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x18a9d1[_0x1a32('0x39')]({'data-sku':_0x208af3['id'],'data-sku-index':_0xb70398,'data-qd-departament':_0x10355d[0x0],'data-qd-category':_0x10355d[_0x10355d[_0x1a32('0x6')]-0x1]});_0x18a9d1[_0x1a32('0x4d')](_0x1a32('0x102')+_0x208af3[_0x1a32('0x103')]);_0x18a9d1[_0x1a32('0x58')]('.qd-ddc-prodName')[_0x1a32('0x86')](_0x4a4f76[_0x1a32('0xc5')](_0x208af3));_0x18a9d1[_0x1a32('0x58')]('.qd-ddc-prodPrice')[_0x1a32('0x86')](isNaN(_0x208af3[_0x1a32('0x104')])?_0x208af3[_0x1a32('0x104')]:0x0==_0x208af3[_0x1a32('0x104')]?_0x1a32('0x105'):(_0x322f86(_0x1a32('0x38'))[_0x1a32('0x39')](_0x1a32('0x3a'))||'R$')+'\x20'+qd_number_format(_0x208af3[_0x1a32('0x104')]/0x64,0x2,',','.'));_0x18a9d1['find'](_0x1a32('0x106'))[_0x1a32('0x39')]({'data-sku':_0x208af3['id'],'data-sku-index':_0xb70398})[_0x1a32('0xdb')](_0x208af3[_0x1a32('0x45')]);_0x18a9d1['find'](_0x1a32('0x107'))[_0x1a32('0x39')]({'data-sku':_0x208af3['id'],'data-sku-index':_0xb70398});_0x1234ef['insertProdImg'](_0x208af3['id'],_0x18a9d1[_0x1a32('0x58')]('.qd-ddc-image'),_0x208af3[_0x1a32('0x108')]);_0x18a9d1[_0x1a32('0x58')](_0x1a32('0x109'))[_0x1a32('0x39')]({'data-sku':_0x208af3['id'],'data-sku-index':_0xb70398});_0x18a9d1[_0x1a32('0x10a')](_0x408b77);_0x3c5dd0=_0x3c5dd0[_0x1a32('0x33')](_0x18a9d1);}try{var _0x186eca=_0x408b77[_0x1a32('0x0')](_0x1a32('0xf8'))[_0x1a32('0x58')]('.qd-ddc-shipping\x20input');_0x186eca[_0x1a32('0x6')]&&''==_0x186eca[_0x1a32('0xdb')]()&&window['_QuatroDigital_DropDown'][_0x1a32('0x2b')]['shippingData'][_0x1a32('0x10b')]&&_0x186eca[_0x1a32('0xdb')](window['_QuatroDigital_DropDown'][_0x1a32('0x2b')][_0x1a32('0x62')][_0x1a32('0x10b')][_0x1a32('0x10c')]);}catch(_0x177240){_0x5423f9(_0x1a32('0x10d')+_0x177240[_0x1a32('0x25')],'aviso');}_0x1234ef[_0x1a32('0x10e')](_0x408b77);_0x1234ef[_0x1a32('0x10f')]();_0x3b1498&&_0x3b1498[_0x1a32('0x110')]&&function(){_0x18928d=_0x3c5dd0[_0x1a32('0x4a')](_0x1a32('0x111')+_0x3b1498[_0x1a32('0x110')]+'\x27]');_0x18928d[_0x1a32('0x6')]&&(_0x3d398a=0x0,_0x3c5dd0['each'](function(){var _0x3b1498=_0x322f86(this);if(_0x3b1498['is'](_0x18928d))return!0x1;_0x3d398a+=_0x3b1498[_0x1a32('0x112')]();}),_0x1234ef[_0x1a32('0xd7')](void 0x0,void 0x0,_0x3d398a,_0x408b77[_0x1a32('0x33')](_0x408b77[_0x1a32('0xab')]())),_0x3c5dd0[_0x1a32('0x91')](_0x1a32('0x113')),function(_0x347f58){_0x347f58['addClass'](_0x1a32('0x114'));_0x347f58['addClass'](_0x1a32('0x113'));setTimeout(function(){_0x347f58['removeClass'](_0x1a32('0x114'));},_0x4a4f76[_0x1a32('0xf7')]);}(_0x18928d));}();});(function(){_QuatroDigital_DropDown[_0x1a32('0x2b')][_0x1a32('0x44')]['length']?(_0x322f86(_0x1a32('0x8e'))[_0x1a32('0x91')](_0x1a32('0x115'))[_0x1a32('0x4d')](_0x1a32('0x116')),setTimeout(function(){_0x322f86(_0x1a32('0x8e'))[_0x1a32('0x91')]('qd-ddc-product-add-time');},_0x4a4f76[_0x1a32('0xf7')])):_0x322f86(_0x1a32('0x8e'))[_0x1a32('0x91')](_0x1a32('0x117'))['addClass'](_0x1a32('0x115'));}());_0x1a32('0x9')===typeof _0x4a4f76[_0x1a32('0x118')]?_0x4a4f76[_0x1a32('0x118')]['call'](this):_0x5423f9(_0x1a32('0x119'));};_0x1234ef[_0x1a32('0x11a')]=function(_0x2d8b56,_0x48f01e,_0x13f2f8){function _0x20f412(){_0x48f01e[_0x1a32('0x91')](_0x1a32('0x11b'))['load'](function(){_0x322f86(this)[_0x1a32('0x4d')](_0x1a32('0x11b'));})[_0x1a32('0x39')](_0x1a32('0x11c'),_0x13f2f8);}_0x13f2f8?_0x20f412():isNaN(_0x2d8b56)?_0x5423f9(_0x1a32('0x11d'),_0x1a32('0x2f')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x1234ef[_0x1a32('0x10e')]=function(_0x5b9037){var _0x464790=function(_0x469276,_0x130759){var _0x408b77=_0x322f86(_0x469276);var _0x47eaae=_0x408b77[_0x1a32('0x39')](_0x1a32('0x11e'));var _0x3d398a=_0x408b77[_0x1a32('0x39')](_0x1a32('0x11f'));if(_0x47eaae){var _0x56bff1=parseInt(_0x408b77['val']())||0x1;_0x1234ef[_0x1a32('0x120')]([_0x47eaae,_0x3d398a],_0x56bff1,_0x56bff1+0x1,function(_0x4ba63f){_0x408b77[_0x1a32('0xdb')](_0x4ba63f);_0x1a32('0x9')===typeof _0x130759&&_0x130759();});}};var _0x408b77=function(_0x203d36,_0x29ff22){var _0x408b77=_0x322f86(_0x203d36);var _0x55d218=_0x408b77[_0x1a32('0x39')](_0x1a32('0x11e'));var _0x3d398a=_0x408b77[_0x1a32('0x39')](_0x1a32('0x11f'));if(_0x55d218){var _0x4fdb49=parseInt(_0x408b77[_0x1a32('0xdb')]())||0x2;_0x1234ef[_0x1a32('0x120')]([_0x55d218,_0x3d398a],_0x4fdb49,_0x4fdb49-0x1,function(_0x5eeb71){_0x408b77[_0x1a32('0xdb')](_0x5eeb71);_0x1a32('0x9')===typeof _0x29ff22&&_0x29ff22();});}};var _0x428997=function(_0x40af54,_0x93003b){var _0x408b77=_0x322f86(_0x40af54);var _0x152ab4=_0x408b77['attr'](_0x1a32('0x11e'));var _0x3d398a=_0x408b77['attr'](_0x1a32('0x11f'));if(_0x152ab4){var _0x335a66=parseInt(_0x408b77[_0x1a32('0xdb')]())||0x1;_0x1234ef['changeQantity']([_0x152ab4,_0x3d398a],0x1,_0x335a66,function(_0x30a0a7){_0x408b77['val'](_0x30a0a7);_0x1a32('0x9')===typeof _0x93003b&&_0x93003b();});}};var _0x3d398a=_0x5b9037[_0x1a32('0x58')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x3d398a[_0x1a32('0x4d')](_0x1a32('0x121'))[_0x1a32('0x3b')](function(){var _0x5b9037=_0x322f86(this);_0x5b9037[_0x1a32('0x58')]('.qd-ddc-quantityMore')['on']('click.qd_ddc_more',function(_0x3d1a58){_0x3d1a58[_0x1a32('0x7e')]();_0x3d398a['addClass'](_0x1a32('0x122'));_0x464790(_0x5b9037[_0x1a32('0x58')](_0x1a32('0x106')),function(){_0x3d398a['removeClass'](_0x1a32('0x122'));});});_0x5b9037[_0x1a32('0x58')](_0x1a32('0x123'))['on'](_0x1a32('0x124'),function(_0x5183f9){_0x5183f9['preventDefault']();_0x3d398a[_0x1a32('0x4d')]('qd-loading');_0x408b77(_0x5b9037[_0x1a32('0x58')](_0x1a32('0x106')),function(){_0x3d398a[_0x1a32('0x91')](_0x1a32('0x122'));});});_0x5b9037[_0x1a32('0x58')](_0x1a32('0x106'))['on'](_0x1a32('0x125'),function(){_0x3d398a[_0x1a32('0x4d')]('qd-loading');_0x428997(this,function(){_0x3d398a[_0x1a32('0x91')](_0x1a32('0x122'));});});_0x5b9037['find'](_0x1a32('0x106'))['on'](_0x1a32('0x126'),function(_0x2e7a30){0xd==_0x2e7a30[_0x1a32('0xd3')]&&(_0x3d398a[_0x1a32('0x4d')](_0x1a32('0x122')),_0x428997(this,function(){_0x3d398a[_0x1a32('0x91')](_0x1a32('0x122'));}));});});_0x5b9037[_0x1a32('0x58')](_0x1a32('0xfd'))['each'](function(){var _0x5b9037=_0x322f86(this);_0x5b9037[_0x1a32('0x58')](_0x1a32('0x107'))['on'](_0x1a32('0x127'),function(){_0x5b9037[_0x1a32('0x4d')](_0x1a32('0x122'));_0x1234ef[_0x1a32('0x128')](_0x322f86(this),function(_0xf860a8){_0xf860a8?_0x5b9037[_0x1a32('0x129')](!0x0)['slideUp'](function(){_0x5b9037['remove']();_0x1234ef[_0x1a32('0x10f')]();}):_0x5b9037[_0x1a32('0x91')]('qd-loading');});return!0x1;});});};_0x1234ef[_0x1a32('0xdd')]=function(_0x153792){var _0x5a7be8=_0x153792['val'](),_0x5a7be8=_0x5a7be8[_0x1a32('0x7')](/[^0-9\-]/g,''),_0x5a7be8=_0x5a7be8['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x1a32('0x12a')),_0x5a7be8=_0x5a7be8['replace'](/(.{9}).*/g,'$1');_0x153792[_0x1a32('0xdb')](_0x5a7be8);0x9<=_0x5a7be8['length']&&(_0x153792[_0x1a32('0x19')]('qdDdcLastPostalCode')!=_0x5a7be8&&_0x109ce2[_0x1a32('0x12b')]({'postalCode':_0x5a7be8,'country':_0x1a32('0x12c')})[_0x1a32('0x1f')](function(_0xaa3a8c){window[_0x1a32('0x5e')][_0x1a32('0x2b')]=_0xaa3a8c;_0x1234ef[_0x1a32('0x93')]();})[_0x1a32('0x21')](function(_0xe9990c){_0x5423f9(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0xe9990c]);updateCartData();}),_0x153792[_0x1a32('0x19')]('qdDdcLastPostalCode',_0x5a7be8));};_0x1234ef[_0x1a32('0x120')]=function(_0x291762,_0x3c7a00,_0x159f85,_0x3e73f6){function _0x402b03(_0x542fe0){_0x542fe0=_0x1a32('0x12d')!==typeof _0x542fe0?!0x1:_0x542fe0;_0x1234ef[_0x1a32('0x93')]();window['_QuatroDigital_DropDown'][_0x1a32('0xe0')]=!0x1;_0x1234ef['cartIsEmpty']();_0x1a32('0x1')!==typeof window[_0x1a32('0xf9')]&&_0x1a32('0x9')===typeof window[_0x1a32('0xf9')][_0x1a32('0xfa')]&&window[_0x1a32('0xf9')][_0x1a32('0xfa')][_0x1a32('0x2c')](this);_0x1a32('0x9')===typeof adminCart&&adminCart();_0x322f86['fn'][_0x1a32('0x29')](!0x0,void 0x0,_0x542fe0);_0x1a32('0x9')===typeof _0x3e73f6&&_0x3e73f6(_0x3c7a00);}_0x159f85=_0x159f85||0x1;if(0x1>_0x159f85)return _0x3c7a00;if(_0x4a4f76[_0x1a32('0x5d')]){if(_0x1a32('0x1')===typeof window[_0x1a32('0x5e')][_0x1a32('0x2b')][_0x1a32('0x44')][_0x291762[0x1]])return _0x5423f9(_0x1a32('0x12e')+_0x291762[0x1]+']'),_0x3c7a00;window[_0x1a32('0x5e')][_0x1a32('0x2b')][_0x1a32('0x44')][_0x291762[0x1]][_0x1a32('0x45')]=_0x159f85;window[_0x1a32('0x5e')][_0x1a32('0x2b')][_0x1a32('0x44')][_0x291762[0x1]][_0x1a32('0x12f')]=_0x291762[0x1];_0x109ce2[_0x1a32('0x130')]([window['_QuatroDigital_DropDown'][_0x1a32('0x2b')][_0x1a32('0x44')][_0x291762[0x1]]],[_0x1a32('0x44'),'totalizers',_0x1a32('0x62')])['done'](function(_0x47a267){window[_0x1a32('0x5e')][_0x1a32('0x2b')]=_0x47a267;_0x402b03(!0x0);})[_0x1a32('0x21')](function(_0x5036c7){_0x5423f9([_0x1a32('0x131'),_0x5036c7]);_0x402b03();});}else _0x5423f9(_0x1a32('0x132'));};_0x1234ef[_0x1a32('0x128')]=function(_0x1a5b15,_0x55745f){function _0x3f04c9(_0x152909){_0x152909=_0x1a32('0x12d')!==typeof _0x152909?!0x1:_0x152909;_0x1a32('0x1')!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x1a32('0xf9')]['exec'][_0x1a32('0x2c')](this);'function'===typeof adminCart&&adminCart();_0x322f86['fn'][_0x1a32('0x29')](!0x0,void 0x0,_0x152909);'function'===typeof _0x55745f&&_0x55745f(_0x3d398a);}var _0x3d398a=!0x1,_0xb1662f=_0x322f86(_0x1a5b15)[_0x1a32('0x39')]('data-sku-index');if(_0x4a4f76[_0x1a32('0x5d')]){if('undefined'===typeof window[_0x1a32('0x5e')][_0x1a32('0x2b')]['items'][_0xb1662f])return _0x5423f9(_0x1a32('0x12e')+_0xb1662f+']'),_0x3d398a;window[_0x1a32('0x5e')][_0x1a32('0x2b')][_0x1a32('0x44')][_0xb1662f]['index']=_0xb1662f;_0x109ce2[_0x1a32('0x133')]([window[_0x1a32('0x5e')]['getOrderForm'][_0x1a32('0x44')][_0xb1662f]],[_0x1a32('0x44'),_0x1a32('0x3f'),_0x1a32('0x62')])[_0x1a32('0x1f')](function(_0x43c1cc){_0x3d398a=!0x0;window[_0x1a32('0x5e')][_0x1a32('0x2b')]=_0x43c1cc;_0x1a192c(_0x43c1cc);_0x3f04c9(!0x0);})[_0x1a32('0x21')](function(_0x4135db){_0x5423f9([_0x1a32('0x134'),_0x4135db]);_0x3f04c9();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x1234ef[_0x1a32('0xd7')]=function(_0x2cfacd,_0x5c4e43,_0x461043,_0x58f4a1){_0x58f4a1=_0x58f4a1||_0x322f86(_0x1a32('0x135'));_0x2cfacd=_0x2cfacd||'+';_0x5c4e43=_0x5c4e43||0.9*_0x58f4a1['height']();_0x58f4a1[_0x1a32('0x129')](!0x0,!0x0)[_0x1a32('0x136')]({'scrollTop':isNaN(_0x461043)?_0x2cfacd+'='+_0x5c4e43+'px':_0x461043});};_0x4a4f76[_0x1a32('0xde')]||(_0x1234ef['getCartInfoByUrl'](),_0x322f86['fn'][_0x1a32('0x29')](!0x0));_0x322f86(window)['on'](_0x1a32('0x137'),function(){try{window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x1234ef['getCartInfoByUrl']();}catch(_0x3103e8){_0x5423f9(_0x1a32('0x138')+_0x3103e8[_0x1a32('0x25')],_0x1a32('0x139'));}});_0x1a32('0x9')===typeof _0x4a4f76[_0x1a32('0x46')]?_0x4a4f76['callback']['call'](this):_0x5423f9(_0x1a32('0xad'));};_0x322f86['fn'][_0x1a32('0xb8')]=function(_0x26726d){var _0x5cf6b1=_0x322f86(this);_0x5cf6b1['fn']=new _0x322f86[(_0x1a32('0xb8'))](this,_0x26726d);return _0x5cf6b1;};}catch(_0x37bd41){'undefined'!==typeof console&&_0x1a32('0x9')===typeof console[_0x1a32('0x15')]&&console['error'](_0x1a32('0x6c'),_0x37bd41);}}(this));(function(_0x14f131){try{var _0x2d92bf=jQuery;window[_0x1a32('0xf9')]=window['_QuatroDigital_AmountProduct']||{};window[_0x1a32('0xf9')]['items']={};window[_0x1a32('0xf9')][_0x1a32('0x13a')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x1a32('0x13b')]=!0x1;window[_0x1a32('0xf9')][_0x1a32('0x13c')]=!0x1;var _0x4984d9=function(){if(window[_0x1a32('0xf9')][_0x1a32('0x13a')]){var _0x62ad83=!0x1;var _0x14f131={};window['_QuatroDigital_AmountProduct'][_0x1a32('0x44')]={};for(_0xc464f6 in window[_0x1a32('0x5e')][_0x1a32('0x2b')]['items'])if('object'===typeof window[_0x1a32('0x5e')][_0x1a32('0x2b')][_0x1a32('0x44')][_0xc464f6]){var _0x2336f0=window[_0x1a32('0x5e')]['getOrderForm'][_0x1a32('0x44')][_0xc464f6];_0x1a32('0x1')!==typeof _0x2336f0['productId']&&null!==_0x2336f0['productId']&&''!==_0x2336f0[_0x1a32('0x13d')]&&(window['_QuatroDigital_AmountProduct'][_0x1a32('0x44')]['prod_'+_0x2336f0[_0x1a32('0x13d')]]=window[_0x1a32('0xf9')]['items'][_0x1a32('0x13e')+_0x2336f0[_0x1a32('0x13d')]]||{},window['_QuatroDigital_AmountProduct'][_0x1a32('0x44')][_0x1a32('0x13e')+_0x2336f0[_0x1a32('0x13d')]]['prodId']=_0x2336f0[_0x1a32('0x13d')],_0x14f131['prod_'+_0x2336f0[_0x1a32('0x13d')]]||(window[_0x1a32('0xf9')][_0x1a32('0x44')][_0x1a32('0x13e')+_0x2336f0[_0x1a32('0x13d')]][_0x1a32('0x43')]=0x0),window[_0x1a32('0xf9')][_0x1a32('0x44')][_0x1a32('0x13e')+_0x2336f0[_0x1a32('0x13d')]]['qtt']+=_0x2336f0['quantity'],_0x62ad83=!0x0,_0x14f131[_0x1a32('0x13e')+_0x2336f0[_0x1a32('0x13d')]]=!0x0);}var _0xc464f6=_0x62ad83;}else _0xc464f6=void 0x0;window[_0x1a32('0xf9')][_0x1a32('0x13a')]&&(_0x2d92bf(_0x1a32('0x13f'))[_0x1a32('0x140')](),_0x2d92bf(_0x1a32('0x141'))['removeClass']('qd-bap-item-added'));for(var _0x56776a in window[_0x1a32('0xf9')]['items']){_0x2336f0=window[_0x1a32('0xf9')][_0x1a32('0x44')][_0x56776a];if(_0x1a32('0x18')!==typeof _0x2336f0)return;_0x14f131=_0x2d92bf('input.qd-productId[value='+_0x2336f0[_0x1a32('0x142')]+']')[_0x1a32('0x0')]('li');if(window[_0x1a32('0xf9')][_0x1a32('0x13a')]||!_0x14f131[_0x1a32('0x58')](_0x1a32('0x13f'))[_0x1a32('0x6')])_0x62ad83=_0x2d92bf(_0x1a32('0x143')),_0x62ad83['find'](_0x1a32('0x144'))[_0x1a32('0x52')](_0x2336f0[_0x1a32('0x43')]),_0x2336f0=_0x14f131[_0x1a32('0x58')]('.qd_bap_wrapper_content'),_0x2336f0[_0x1a32('0x6')]?_0x2336f0[_0x1a32('0x145')](_0x62ad83)[_0x1a32('0x4d')](_0x1a32('0x146')):_0x14f131['prepend'](_0x62ad83);}_0xc464f6&&(window[_0x1a32('0xf9')][_0x1a32('0x13a')]=!0x1);};window[_0x1a32('0xf9')][_0x1a32('0xfa')]=function(){window[_0x1a32('0xf9')][_0x1a32('0x13a')]=!0x0;_0x4984d9['call'](this);};_0x2d92bf(document)['ajaxStop'](function(){_0x4984d9[_0x1a32('0x2c')](this);});}catch(_0x364fbd){_0x1a32('0x1')!==typeof console&&_0x1a32('0x9')===typeof console['error']&&console[_0x1a32('0x15')](_0x1a32('0x6c'),_0x364fbd);}}(this));(function(){try{var _0x163920=jQuery,_0x52b5b9,_0x30c109={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x163920[_0x1a32('0x147')]=function(_0x1a4fe6){var _0x57914c={};_0x52b5b9=_0x163920[_0x1a32('0x16')](!0x0,{},_0x30c109,_0x1a4fe6);_0x1a4fe6=_0x163920(_0x52b5b9[_0x1a32('0x8a')])['QD_dropDownCart'](_0x52b5b9[_0x1a32('0x148')]);_0x57914c[_0x1a32('0x7f')]=_0x1a32('0x1')!==typeof _0x52b5b9[_0x1a32('0x148')][_0x1a32('0xde')]&&!0x1===_0x52b5b9['dropDown']['updateOnlyHover']?_0x163920(_0x52b5b9[_0x1a32('0x8a')])[_0x1a32('0xae')](_0x1a4fe6['fn'],_0x52b5b9['buyButton']):_0x163920(_0x52b5b9['selector'])[_0x1a32('0xae')](_0x52b5b9['buyButton']);_0x57914c['dropDown']=_0x1a4fe6;return _0x57914c;};_0x163920['fn'][_0x1a32('0x149')]=function(){'object'===typeof console&&'function'===typeof console[_0x1a32('0x32')]&&console[_0x1a32('0x32')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x163920[_0x1a32('0x149')]=_0x163920['fn'][_0x1a32('0x149')];}catch(_0x3f6aa9){_0x1a32('0x1')!==typeof console&&'function'===typeof console['error']&&console[_0x1a32('0x15')](_0x1a32('0x6c'),_0x3f6aa9);}}());