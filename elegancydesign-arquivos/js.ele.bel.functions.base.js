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
			Common.applySmartPrice();
			// Common.modalNewsLetter();
		},
		ajaxStop: function() {
			Common.applySmartPrice();			
		},
		windowOnload: function() {},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
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
					pagination: false,
					itemsDesktop: [1000, 4], //5 items between 1000px and 901px
					itemsDesktopSmall: [900, 3], // betweem 900px and 601px
					itemsTablet: [600, 2], //2 items between 600 and 0
					itemsMobile: [600, 1] // itemsMobile disabled - inherit from itemsTablet option
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
			Product.openShipping();
			Product.applySmartPrice();
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
		applySmartPrice: function () {
			if ($('.product-stamps .flag[class*="boleto"]').length) {
				
				$(".productPrice").append('<div class="qd-sp-wrap"> <p class="qd_displayPrice shelf-qd-v1-sp-best-price">R$ </p> <span>com</span> <span class="qd-sp-display-discount shelf-qd-v1-sp-discount"> 0% de desconto</span> </div>');

				$(".product-stamps .flag").QD_SmartPrice({
					filterFlagBy: "[class*='boleto']",
					productPage: {
						wrapperElement: ".sku-selection-box",
						changeNativePrice: false,
						isProductPage: true
					}
				});
			}
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
			console.log("oie");
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
			Institutional.formContact();
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
		},
		formContact: function () {
			if (!$(document.body).is(".atendimento"))
				return;

			var form = $(".institutional-contact form");
			form.find("#qd_form_phone").mask('(00) 0000-00009');

			form.validate({
				rules: { email: { email: true } },
				submitHandler: function (form) {
					var $form = $(form);

					if (!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function () {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#qd_form_email").val() || "";
						if (!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function (userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length ? "+55" + phone : null;

							$.ajax({ url: "//api.ipify.org?format=jsonp", dataType: "jsonp", success: function (data) { sendData(data.ip); }, error: function () { $.ajax({ url: "//www.telize.com/jsonip", dataType: "jsonp", success: function (data) { sendData(data.ip); }, error: function (data) { sendData(null); } }); } });

							var sendData = function (ip) {
								$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AT/documents",
									type: "POST",
									dataType: "json",
									headers: { "Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
									data: JSON.stringify({
										ip: ip,
										userId: userId,
										phone: phone,
										email: email,
										fullName: $form.find("#qd_form_name").val() || null,
										message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
										subject: $form.find("#qd_form_subject").val() || null
									}),
									success: function (data) { $form.find(".form-succes").removeClass("hide"); },
									error: function () { alert("Desculpe, não foi possível enviar seu formulário!"); },
									complete: function () { submitWrapper.removeClass("qd-loading"); }
								});
							}
						};
						$.ajax({ url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email, dataType: "json", headers: { Accept: "application/vnd.vtex.ds.v10+json" }, success: function (data) { if (data.length) saveContact(data[0].id); else saveContact(null); }, error: function () { saveContact(null); if (typeof console == "object" && typeof console.warn == 'function') console.warn('Houve um erro ao tentar buscar os dados do usuário na entidade CL'); } });
					})();

					return false;
				},
				errorPlacement: function (error, element) { }
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
var _0x7c7f=['getParent','closest','object','undefined','error','info','warn','unshift','alerta','toLowerCase','apply','join','qdAmAddNdx','addClass','first','qd-am-first','last','qd-am-last','QD_amazingMenu','yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','each','img[alt=\x27','attr','data-qdam-value','clone','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada',':not(ul)','qd-am-elem-','replaceSpecialChars','replace','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','-li','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto'];(function(_0x231833,_0x520d88){var _0x362cfc=function(_0x4d57f2){while(--_0x4d57f2){_0x231833['push'](_0x231833['shift']());}};_0x362cfc(++_0x520d88);}(_0x7c7f,0x120));var _0xf7c7=function(_0x48a41d,_0x188ee1){_0x48a41d=_0x48a41d-0x0;var _0x3d1c80=_0x7c7f[_0x48a41d];return _0x3d1c80;};(function(_0x3ffd15){_0x3ffd15['fn'][_0xf7c7('0x0')]=_0x3ffd15['fn'][_0xf7c7('0x1')];}(jQuery));(function(_0x493516){var _0x2911be;var _0x1e7319=jQuery;if('function'!==typeof _0x1e7319['fn']['QD_amazingMenu']){var _0x3fff1b={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x487ff5=function(_0x3cd3ca,_0x34ac02){if(_0xf7c7('0x2')===typeof console&&_0xf7c7('0x3')!==typeof console[_0xf7c7('0x4')]&&'undefined'!==typeof console[_0xf7c7('0x5')]&&'undefined'!==typeof console[_0xf7c7('0x6')]){var _0x1f53e0;_0xf7c7('0x2')===typeof _0x3cd3ca?(_0x3cd3ca[_0xf7c7('0x7')]('[QD\x20Amazing\x20Menu]\x0a'),_0x1f53e0=_0x3cd3ca):_0x1f53e0=['[QD\x20Amazing\x20Menu]\x0a'+_0x3cd3ca];if('undefined'===typeof _0x34ac02||_0xf7c7('0x8')!==_0x34ac02[_0xf7c7('0x9')]()&&'aviso'!==_0x34ac02['toLowerCase']())if(_0xf7c7('0x3')!==typeof _0x34ac02&&_0xf7c7('0x5')===_0x34ac02[_0xf7c7('0x9')]())try{console[_0xf7c7('0x5')]['apply'](console,_0x1f53e0);}catch(_0x571e83){try{console[_0xf7c7('0x5')](_0x1f53e0['join']('\x0a'));}catch(_0x7cc94b){}}else try{console[_0xf7c7('0x4')][_0xf7c7('0xa')](console,_0x1f53e0);}catch(_0x52fc80){try{console[_0xf7c7('0x4')](_0x1f53e0[_0xf7c7('0xb')]('\x0a'));}catch(_0x8b893f){}}else try{console['warn'][_0xf7c7('0xa')](console,_0x1f53e0);}catch(_0x4a783e){try{console[_0xf7c7('0x6')](_0x1f53e0[_0xf7c7('0xb')]('\x0a'));}catch(_0x553ac2){}}}};_0x1e7319['fn'][_0xf7c7('0xc')]=function(){var _0x51b3f3=_0x1e7319(this);_0x51b3f3['each'](function(_0x2d54fe){_0x1e7319(this)[_0xf7c7('0xd')]('qd-am-li-'+_0x2d54fe);});_0x51b3f3[_0xf7c7('0xe')]()[_0xf7c7('0xd')](_0xf7c7('0xf'));_0x51b3f3[_0xf7c7('0x10')]()[_0xf7c7('0xd')](_0xf7c7('0x11'));return _0x51b3f3;};_0x1e7319['fn'][_0xf7c7('0x12')]=function(){};_0x493516=function(_0x3b6c6c){var _0x3e7839={'r':_0xf7c7('0x13')};return function(_0xcf6819){var _0x675424=function(_0x233dcb){return _0x233dcb;};var _0x2a6b87=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xcf6819=_0xcf6819['d'+_0x2a6b87[0x10]+'c'+_0x2a6b87[0x11]+'m'+_0x675424(_0x2a6b87[0x1])+'n'+_0x2a6b87[0xd]]['l'+_0x2a6b87[0x12]+'c'+_0x2a6b87[0x0]+'ti'+_0x675424('o')+'n'];var _0x3b02a9=function(_0x4638d8){return escape(encodeURIComponent(_0x4638d8['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x5cfed5){return String['fromCharCode'](('Z'>=_0x5cfed5?0x5a:0x7a)>=(_0x5cfed5=_0x5cfed5[_0xf7c7('0x14')](0x0)+0xd)?_0x5cfed5:_0x5cfed5-0x1a);})));};var _0x5ea166=_0x3b02a9(_0xcf6819[[_0x2a6b87[0x9],_0x675424('o'),_0x2a6b87[0xc],_0x2a6b87[_0x675424(0xd)]][_0xf7c7('0xb')]('')]);_0x3b02a9=_0x3b02a9((window[['js',_0x675424('no'),'m',_0x2a6b87[0x1],_0x2a6b87[0x4][_0xf7c7('0x15')](),_0xf7c7('0x16')][_0xf7c7('0xb')]('')]||_0xf7c7('0x17'))+['.v',_0x2a6b87[0xd],'e',_0x675424('x'),'co',_0x675424('mm'),'erc',_0x2a6b87[0x1],'.c',_0x675424('o'),'m.',_0x2a6b87[0x13],'r'][_0xf7c7('0xb')](''));for(var _0x3370f0 in _0x3e7839){if(_0x3b02a9===_0x3370f0+_0x3e7839[_0x3370f0]||_0x5ea166===_0x3370f0+_0x3e7839[_0x3370f0]){var _0x687dca='tr'+_0x2a6b87[0x11]+'e';break;}_0x687dca='f'+_0x2a6b87[0x0]+'ls'+_0x675424(_0x2a6b87[0x1])+'';}_0x675424=!0x1;-0x1<_0xcf6819[[_0x2a6b87[0xc],'e',_0x2a6b87[0x0],'rc',_0x2a6b87[0x9]][_0xf7c7('0xb')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x675424=!0x0);return[_0x687dca,_0x675424];}(_0x3b6c6c);}(window);if(!eval(_0x493516[0x0]))return _0x493516[0x1]?_0x487ff5(_0xf7c7('0x18')):!0x1;var _0x435d6e=function(_0x5793d6){var _0x212fae=_0x5793d6[_0xf7c7('0x19')](_0xf7c7('0x1a'));var _0x32fcef=_0x212fae[_0xf7c7('0x1b')](_0xf7c7('0x1c'));var _0x3e18b0=_0x212fae[_0xf7c7('0x1b')](_0xf7c7('0x1d'));if(_0x32fcef['length']||_0x3e18b0[_0xf7c7('0x1e')])_0x32fcef[_0xf7c7('0x1f')]()['addClass'](_0xf7c7('0x20')),_0x3e18b0[_0xf7c7('0x1f')]()['addClass'](_0xf7c7('0x21')),_0x1e7319[_0xf7c7('0x22')]({'url':_0x2911be[_0xf7c7('0x23')],'dataType':'html','success':function(_0xdd0375){var _0x2a83a8=_0x1e7319(_0xdd0375);_0x32fcef[_0xf7c7('0x24')](function(){var _0xdd0375=_0x1e7319(this);var _0x35d3ab=_0x2a83a8['find'](_0xf7c7('0x25')+_0xdd0375[_0xf7c7('0x26')](_0xf7c7('0x27'))+'\x27]');_0x35d3ab[_0xf7c7('0x1e')]&&(_0x35d3ab[_0xf7c7('0x24')](function(){_0x1e7319(this)[_0xf7c7('0x0')]('.box-banner')[_0xf7c7('0x28')]()[_0xf7c7('0x29')](_0xdd0375);}),_0xdd0375[_0xf7c7('0x2a')]());})[_0xf7c7('0xd')](_0xf7c7('0x2b'));_0x3e18b0['each'](function(){var _0xdd0375={};var _0x5082a3=_0x1e7319(this);_0x2a83a8[_0xf7c7('0x19')]('h2')[_0xf7c7('0x24')](function(){if(_0x1e7319(this)[_0xf7c7('0x2c')]()[_0xf7c7('0x2d')]()[_0xf7c7('0x9')]()==_0x5082a3[_0xf7c7('0x26')]('data-qdam-value')[_0xf7c7('0x2d')]()[_0xf7c7('0x9')]())return _0xdd0375=_0x1e7319(this),!0x1;});_0xdd0375[_0xf7c7('0x1e')]&&(_0xdd0375[_0xf7c7('0x24')](function(){_0x1e7319(this)[_0xf7c7('0x0')](_0xf7c7('0x2e'))['clone']()[_0xf7c7('0x29')](_0x5082a3);}),_0x5082a3[_0xf7c7('0x2a')]());})[_0xf7c7('0xd')]('qd-am-content-loaded');},'error':function(){_0x487ff5(_0xf7c7('0x2f')+_0x2911be[_0xf7c7('0x23')]+_0xf7c7('0x30'));},'complete':function(){_0x2911be[_0xf7c7('0x31')][_0xf7c7('0x32')](this);_0x1e7319(window)[_0xf7c7('0x33')]('QuatroDigital.am.ajaxCallback',_0x5793d6);},'clearQueueDelay':0xbb8});};_0x1e7319['QD_amazingMenu']=function(_0x5c18aa){var _0x467b50=_0x5c18aa['find'](_0xf7c7('0x34'))[_0xf7c7('0x24')](function(){var _0x103213=_0x1e7319(this);if(!_0x103213[_0xf7c7('0x1e')])return _0x487ff5([_0xf7c7('0x35'),_0x5c18aa],_0xf7c7('0x8'));_0x103213[_0xf7c7('0x19')]('li\x20>ul')[_0xf7c7('0x1f')]()[_0xf7c7('0xd')]('qd-am-has-ul');_0x103213[_0xf7c7('0x19')]('li')[_0xf7c7('0x24')](function(){var _0x2b65c8=_0x1e7319(this);var _0x8919dd=_0x2b65c8['children'](_0xf7c7('0x36'));_0x8919dd['length']&&_0x2b65c8[_0xf7c7('0xd')](_0xf7c7('0x37')+_0x8919dd[_0xf7c7('0xe')]()['text']()['trim']()[_0xf7c7('0x38')]()['replace'](/\./g,'')[_0xf7c7('0x39')](/\s/g,'-')[_0xf7c7('0x9')]());});var _0x3ff641=_0x103213[_0xf7c7('0x19')](_0xf7c7('0x3a'))['qdAmAddNdx']();_0x103213[_0xf7c7('0xd')](_0xf7c7('0x3b'));_0x3ff641=_0x3ff641[_0xf7c7('0x19')](_0xf7c7('0x3c'));_0x3ff641[_0xf7c7('0x24')](function(){var _0x4925d5=_0x1e7319(this);_0x4925d5[_0xf7c7('0x19')]('>li')[_0xf7c7('0xc')]()['addClass'](_0xf7c7('0x3d'));_0x4925d5[_0xf7c7('0xd')](_0xf7c7('0x3e'));_0x4925d5[_0xf7c7('0x1f')]()[_0xf7c7('0xd')](_0xf7c7('0x3f'));});_0x3ff641[_0xf7c7('0xd')](_0xf7c7('0x3f'));var _0x1a900c=0x0,_0x493516=function(_0x2fb6b9){_0x1a900c+=0x1;_0x2fb6b9=_0x2fb6b9['children']('li')['children']('*');_0x2fb6b9[_0xf7c7('0x1e')]&&(_0x2fb6b9[_0xf7c7('0xd')](_0xf7c7('0x40')+_0x1a900c),_0x493516(_0x2fb6b9));};_0x493516(_0x103213);_0x103213[_0xf7c7('0x41')](_0x103213[_0xf7c7('0x19')]('ul'))['each'](function(){var _0x1ff624=_0x1e7319(this);_0x1ff624[_0xf7c7('0xd')]('qd-am-'+_0x1ff624['children']('li')['length']+_0xf7c7('0x42'));});});_0x435d6e(_0x467b50);_0x2911be[_0xf7c7('0x43')]['call'](this);_0x1e7319(window)[_0xf7c7('0x33')](_0xf7c7('0x44'),_0x5c18aa);};_0x1e7319['fn'][_0xf7c7('0x12')]=function(_0x5c46d3){var _0x245fd3=_0x1e7319(this);if(!_0x245fd3['length'])return _0x245fd3;_0x2911be=_0x1e7319[_0xf7c7('0x45')]({},_0x3fff1b,_0x5c46d3);_0x245fd3[_0xf7c7('0x46')]=new _0x1e7319[(_0xf7c7('0x12'))](_0x1e7319(this));return _0x245fd3;};_0x1e7319(function(){_0x1e7319(_0xf7c7('0x47'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0xfee4=['continueShopping','.qd-ddc-checkout','html','linkCheckout','.qd-ddc-emptyCart\x20p','emptyCart','each','call','add','.qd-ddc-infoTotalValue','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','getOrderForm','function','_QuatroDigital_AmountProduct','exec','qd-ddc-prodLoaded','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','addClass','renderProductsList','.qd-ddc-prodWrapper2','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','content','.qd-ddc-quantity','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','shippingData','address','postalCode','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','preventDefault','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','done','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','totalizers','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','remove','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','closest','replace','undefined','pow','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','Oooops!\x20','message','object','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','info','apply','error','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','body','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','shippingCalculate','simpleCart','cartIsEmpty','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','.qd-ddc-viewCart','.qd_ddc_continueShopping'];(function(_0x7a2668,_0x40e85f){var _0x453f99=function(_0x205d29){while(--_0x205d29){_0x7a2668['push'](_0x7a2668['shift']());}};_0x453f99(++_0x40e85f);}(_0xfee4,0x15e));var _0x4fee=function(_0x31f9b0,_0x293b10){_0x31f9b0=_0x31f9b0-0x0;var _0x7eb058=_0xfee4[_0x31f9b0];return _0x7eb058;};(function(_0x3077ad){_0x3077ad['fn'][_0x4fee('0x0')]=_0x3077ad['fn'][_0x4fee('0x1')];}(jQuery));function qd_number_format(_0x1047a5,_0xd799c,_0x38529c,_0x448672){_0x1047a5=(_0x1047a5+'')[_0x4fee('0x2')](/[^0-9+\-Ee.]/g,'');_0x1047a5=isFinite(+_0x1047a5)?+_0x1047a5:0x0;_0xd799c=isFinite(+_0xd799c)?Math['abs'](_0xd799c):0x0;_0x448672=_0x4fee('0x3')===typeof _0x448672?',':_0x448672;_0x38529c=_0x4fee('0x3')===typeof _0x38529c?'.':_0x38529c;var _0x1a779a='',_0x1a779a=function(_0x373766,_0x46b3ff){var _0xd799c=Math[_0x4fee('0x4')](0xa,_0x46b3ff);return''+(Math[_0x4fee('0x5')](_0x373766*_0xd799c)/_0xd799c)['toFixed'](_0x46b3ff);},_0x1a779a=(_0xd799c?_0x1a779a(_0x1047a5,_0xd799c):''+Math[_0x4fee('0x5')](_0x1047a5))[_0x4fee('0x6')]('.');0x3<_0x1a779a[0x0]['length']&&(_0x1a779a[0x0]=_0x1a779a[0x0][_0x4fee('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x448672));(_0x1a779a[0x1]||'')['length']<_0xd799c&&(_0x1a779a[0x1]=_0x1a779a[0x1]||'',_0x1a779a[0x1]+=Array(_0xd799c-_0x1a779a[0x1][_0x4fee('0x7')]+0x1)[_0x4fee('0x8')]('0'));return _0x1a779a[_0x4fee('0x8')](_0x38529c);};(function(){try{window[_0x4fee('0x9')]=window[_0x4fee('0x9')]||{},window[_0x4fee('0x9')][_0x4fee('0xa')]=window[_0x4fee('0x9')][_0x4fee('0xa')]||$[_0x4fee('0xb')]();}catch(_0x676cf1){_0x4fee('0x3')!==typeof console&&'function'===typeof console['error']&&console['error'](_0x4fee('0xc'),_0x676cf1[_0x4fee('0xd')]);}}());(function(_0x271abc){try{var _0x5462b3=jQuery,_0x37d4c7=function(_0x4157a2,_0x1e15e7){if(_0x4fee('0xe')===typeof console&&_0x4fee('0x3')!==typeof console['error']&&'undefined'!==typeof console['info']&&_0x4fee('0x3')!==typeof console[_0x4fee('0xf')]){var _0x49d550;_0x4fee('0xe')===typeof _0x4157a2?(_0x4157a2[_0x4fee('0x10')](_0x4fee('0x11')),_0x49d550=_0x4157a2):_0x49d550=[_0x4fee('0x11')+_0x4157a2];if(_0x4fee('0x3')===typeof _0x1e15e7||_0x4fee('0x12')!==_0x1e15e7[_0x4fee('0x13')]()&&_0x4fee('0x14')!==_0x1e15e7[_0x4fee('0x13')]())if(_0x4fee('0x3')!==typeof _0x1e15e7&&_0x4fee('0x15')===_0x1e15e7['toLowerCase']())try{console[_0x4fee('0x15')][_0x4fee('0x16')](console,_0x49d550);}catch(_0x2569ff){try{console[_0x4fee('0x15')](_0x49d550['join']('\x0a'));}catch(_0x56d36f){}}else try{console[_0x4fee('0x17')][_0x4fee('0x16')](console,_0x49d550);}catch(_0x5046b8){try{console['error'](_0x49d550[_0x4fee('0x8')]('\x0a'));}catch(_0x4d761d){}}else try{console['warn'][_0x4fee('0x16')](console,_0x49d550);}catch(_0x568013){try{console[_0x4fee('0xf')](_0x49d550[_0x4fee('0x8')]('\x0a'));}catch(_0x320bba){}}}};window[_0x4fee('0x18')]=window[_0x4fee('0x18')]||{};window[_0x4fee('0x18')][_0x4fee('0x19')]=!0x0;_0x5462b3[_0x4fee('0x1a')]=function(){};_0x5462b3['fn'][_0x4fee('0x1a')]=function(){return{'fn':new _0x5462b3()};};var _0x4a6751=function(_0xa10c14){var _0x9cc6d3={'r':_0x4fee('0x1b')};return function(_0xe6e81d){var _0x3104fb=function(_0x387f75){return _0x387f75;};var _0x45dd11=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xe6e81d=_0xe6e81d['d'+_0x45dd11[0x10]+'c'+_0x45dd11[0x11]+'m'+_0x3104fb(_0x45dd11[0x1])+'n'+_0x45dd11[0xd]]['l'+_0x45dd11[0x12]+'c'+_0x45dd11[0x0]+'ti'+_0x3104fb('o')+'n'];var _0x4e54ee=function(_0x3350c5){return escape(encodeURIComponent(_0x3350c5[_0x4fee('0x2')](/\./g,'¨')[_0x4fee('0x2')](/[a-zA-Z]/g,function(_0x49fe4d){return String[_0x4fee('0x1c')](('Z'>=_0x49fe4d?0x5a:0x7a)>=(_0x49fe4d=_0x49fe4d[_0x4fee('0x1d')](0x0)+0xd)?_0x49fe4d:_0x49fe4d-0x1a);})));};var _0x3ac11e=_0x4e54ee(_0xe6e81d[[_0x45dd11[0x9],_0x3104fb('o'),_0x45dd11[0xc],_0x45dd11[_0x3104fb(0xd)]][_0x4fee('0x8')]('')]);_0x4e54ee=_0x4e54ee((window[['js',_0x3104fb('no'),'m',_0x45dd11[0x1],_0x45dd11[0x4][_0x4fee('0x1e')](),_0x4fee('0x1f')][_0x4fee('0x8')]('')]||_0x4fee('0x20'))+['.v',_0x45dd11[0xd],'e',_0x3104fb('x'),'co',_0x3104fb('mm'),_0x4fee('0x21'),_0x45dd11[0x1],'.c',_0x3104fb('o'),'m.',_0x45dd11[0x13],'r'][_0x4fee('0x8')](''));for(var _0x28a8ef in _0x9cc6d3){if(_0x4e54ee===_0x28a8ef+_0x9cc6d3[_0x28a8ef]||_0x3ac11e===_0x28a8ef+_0x9cc6d3[_0x28a8ef]){var _0x28037e='tr'+_0x45dd11[0x11]+'e';break;}_0x28037e='f'+_0x45dd11[0x0]+'ls'+_0x3104fb(_0x45dd11[0x1])+'';}_0x3104fb=!0x1;-0x1<_0xe6e81d[[_0x45dd11[0xc],'e',_0x45dd11[0x0],'rc',_0x45dd11[0x9]]['join']('')][_0x4fee('0x22')](_0x4fee('0x23'))&&(_0x3104fb=!0x0);return[_0x28037e,_0x3104fb];}(_0xa10c14);}(window);if(!eval(_0x4a6751[0x0]))return _0x4a6751[0x1]?_0x37d4c7(_0x4fee('0x24')):!0x1;_0x5462b3[_0x4fee('0x1a')]=function(_0x25f29d,_0x74236d){var _0x216807=_0x5462b3(_0x25f29d);if(!_0x216807['length'])return _0x216807;var _0x2cd518=_0x5462b3[_0x4fee('0x25')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x4fee('0x26'),'linkCheckout':_0x4fee('0x27'),'cartTotal':_0x4fee('0x28'),'emptyCart':_0x4fee('0x29'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x4fee('0x2a')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x2b4bf4){return _0x2b4bf4['skuName']||_0x2b4bf4[_0x4fee('0x2b')];},'callback':function(){},'callbackProductsList':function(){}},_0x74236d);_0x5462b3('');var _0xcc0c6b=this;if(_0x2cd518[_0x4fee('0x2c')]){var _0x3b9877=!0x1;'undefined'===typeof window[_0x4fee('0x2d')]&&(_0x37d4c7(_0x4fee('0x2e')),_0x5462b3[_0x4fee('0x2f')]({'url':_0x4fee('0x30'),'async':!0x1,'dataType':_0x4fee('0x31'),'error':function(){_0x37d4c7(_0x4fee('0x32'));_0x3b9877=!0x0;}}));if(_0x3b9877)return _0x37d4c7(_0x4fee('0x33'));}if(_0x4fee('0xe')===typeof window[_0x4fee('0x2d')]&&_0x4fee('0x3')!==typeof window[_0x4fee('0x2d')]['checkout'])var _0x271abc=window[_0x4fee('0x2d')][_0x4fee('0x34')];else if('object'===typeof vtex&&_0x4fee('0xe')===typeof vtex[_0x4fee('0x34')]&&_0x4fee('0x3')!==typeof vtex[_0x4fee('0x34')][_0x4fee('0x35')])_0x271abc=new vtex[(_0x4fee('0x34'))][(_0x4fee('0x35'))]();else return _0x37d4c7(_0x4fee('0x36'));_0xcc0c6b[_0x4fee('0x37')]=_0x4fee('0x38');var _0x49fa0b=function(_0x5a80d7){_0x5462b3(this)[_0x4fee('0x39')](_0x5a80d7);_0x5a80d7[_0x4fee('0x3a')](_0x4fee('0x3b'))['add'](_0x5462b3('.qd_ddc_lightBoxOverlay'))['on'](_0x4fee('0x3c'),function(){_0x216807[_0x4fee('0x3d')](_0x4fee('0x3e'));_0x5462b3(document['body'])[_0x4fee('0x3d')](_0x4fee('0x3f'));});_0x5462b3(document)[_0x4fee('0x40')](_0x4fee('0x41'))['on']('keyup.qd_ddc_closeFn',function(_0x5844a7){0x1b==_0x5844a7['keyCode']&&(_0x216807[_0x4fee('0x3d')]('qd-bb-lightBoxProdAdd'),_0x5462b3(document[_0x4fee('0x42')])[_0x4fee('0x3d')](_0x4fee('0x3f')));});var _0x3f60d2=_0x5a80d7[_0x4fee('0x3a')](_0x4fee('0x43'));_0x5a80d7[_0x4fee('0x3a')](_0x4fee('0x44'))['on'](_0x4fee('0x45'),function(){_0xcc0c6b['scrollCart']('-',void 0x0,void 0x0,_0x3f60d2);return!0x1;});_0x5a80d7['find'](_0x4fee('0x46'))['on'](_0x4fee('0x47'),function(){_0xcc0c6b[_0x4fee('0x48')](void 0x0,void 0x0,void 0x0,_0x3f60d2);return!0x1;});_0x5a80d7[_0x4fee('0x3a')](_0x4fee('0x49'))['val']('')['on']('keyup.qd_ddc_cep',function(){_0xcc0c6b[_0x4fee('0x4a')](_0x5462b3(this));});if(_0x2cd518['updateOnlyHover']){var _0x74236d=0x0;_0x5462b3(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x5a80d7=function(){window[_0x4fee('0x18')][_0x4fee('0x19')]&&(_0xcc0c6b['getCartInfoByUrl'](),window['_QuatroDigital_DropDown'][_0x4fee('0x19')]=!0x1,_0x5462b3['fn'][_0x4fee('0x4b')](!0x0),_0xcc0c6b[_0x4fee('0x4c')]());};_0x74236d=setInterval(function(){_0x5a80d7();},0x258);_0x5a80d7();});_0x5462b3(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x74236d);});}};var _0x94d8d4=function(_0x4ef09e){_0x4ef09e=_0x5462b3(_0x4ef09e);_0x2cd518[_0x4fee('0x4d')][_0x4fee('0x4e')]=_0x2cd518[_0x4fee('0x4d')][_0x4fee('0x4e')][_0x4fee('0x2')](_0x4fee('0x4f'),_0x4fee('0x50'));_0x2cd518['texts']['cartTotal']=_0x2cd518[_0x4fee('0x4d')]['cartTotal']['replace']('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x2cd518[_0x4fee('0x4d')][_0x4fee('0x4e')]=_0x2cd518[_0x4fee('0x4d')][_0x4fee('0x4e')]['replace']('#shipping',_0x4fee('0x51'));_0x2cd518['texts'][_0x4fee('0x4e')]=_0x2cd518[_0x4fee('0x4d')][_0x4fee('0x4e')][_0x4fee('0x2')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x4ef09e[_0x4fee('0x3a')](_0x4fee('0x52'))['html'](_0x2cd518[_0x4fee('0x4d')]['linkCart']);_0x4ef09e[_0x4fee('0x3a')](_0x4fee('0x53'))['html'](_0x2cd518['texts'][_0x4fee('0x54')]);_0x4ef09e[_0x4fee('0x3a')](_0x4fee('0x55'))[_0x4fee('0x56')](_0x2cd518['texts'][_0x4fee('0x57')]);_0x4ef09e[_0x4fee('0x3a')]('.qd-ddc-infoTotal')[_0x4fee('0x56')](_0x2cd518[_0x4fee('0x4d')][_0x4fee('0x4e')]);_0x4ef09e[_0x4fee('0x3a')]('.qd-ddc-shipping')[_0x4fee('0x56')](_0x2cd518['texts']['shippingForm']);_0x4ef09e[_0x4fee('0x3a')](_0x4fee('0x58'))['html'](_0x2cd518[_0x4fee('0x4d')][_0x4fee('0x59')]);return _0x4ef09e;}(this[_0x4fee('0x37')]);var _0x233481=0x0;_0x216807[_0x4fee('0x5a')](function(){0x0<_0x233481?_0x49fa0b[_0x4fee('0x5b')](this,_0x94d8d4['clone']()):_0x49fa0b[_0x4fee('0x5b')](this,_0x94d8d4);_0x233481++;});window[_0x4fee('0x9')][_0x4fee('0xa')][_0x4fee('0x5c')](function(){_0x5462b3(_0x4fee('0x5d'))[_0x4fee('0x56')](window[_0x4fee('0x9')]['total']||'--');_0x5462b3('.qd-ddc-infoTotalItems')[_0x4fee('0x56')](window[_0x4fee('0x9')][_0x4fee('0x5e')]||'0');_0x5462b3(_0x4fee('0x5f'))['html'](window[_0x4fee('0x9')][_0x4fee('0x60')]||'--');_0x5462b3(_0x4fee('0x61'))[_0x4fee('0x56')](window[_0x4fee('0x9')][_0x4fee('0x62')]||'--');});var _0x1e97e6=function(_0x42a183,_0x3dd701){if(_0x4fee('0x3')===typeof _0x42a183[_0x4fee('0x63')])return _0x37d4c7(_0x4fee('0x64'));_0xcc0c6b['renderProductsList']['call'](this,_0x3dd701);};_0xcc0c6b[_0x4fee('0x65')]=function(_0x12b814,_0x52540c){'undefined'!=typeof _0x52540c?window['_QuatroDigital_DropDown'][_0x4fee('0x66')]=_0x52540c:window[_0x4fee('0x18')][_0x4fee('0x66')]&&(_0x52540c=window['_QuatroDigital_DropDown'][_0x4fee('0x66')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x4fee('0x66')]=void 0x0;},_0x2cd518[_0x4fee('0x67')]);_0x5462b3(_0x4fee('0x68'))[_0x4fee('0x3d')]('qd-ddc-prodLoaded');if(_0x2cd518[_0x4fee('0x2c')]){var _0x74236d=function(_0x37638b){window[_0x4fee('0x18')][_0x4fee('0x69')]=_0x37638b;_0x1e97e6(_0x37638b,_0x52540c);_0x4fee('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x4fee('0x6a')===typeof window[_0x4fee('0x6b')][_0x4fee('0x6c')]&&window[_0x4fee('0x6b')]['exec'][_0x4fee('0x5b')](this);_0x5462b3(_0x4fee('0x68'))['addClass'](_0x4fee('0x6d'));};_0x4fee('0x3')!==typeof window[_0x4fee('0x18')][_0x4fee('0x69')]?(_0x74236d(window['_QuatroDigital_DropDown']['getOrderForm']),'function'===typeof _0x12b814&&_0x12b814(window[_0x4fee('0x18')][_0x4fee('0x69')])):_0x5462b3[_0x4fee('0x6e')]([_0x4fee('0x63'),'totalizers','shippingData'],{'done':function(_0x170470){_0x74236d[_0x4fee('0x5b')](this,_0x170470);_0x4fee('0x6a')===typeof _0x12b814&&_0x12b814(_0x170470);},'fail':function(_0x50b361){_0x37d4c7([_0x4fee('0x6f'),_0x50b361]);}});}else alert(_0x4fee('0x70'));};_0xcc0c6b[_0x4fee('0x4c')]=function(){var _0x1b055a=_0x5462b3(_0x4fee('0x68'));_0x1b055a['find'](_0x4fee('0x71'))[_0x4fee('0x7')]?_0x1b055a[_0x4fee('0x3d')](_0x4fee('0x72')):_0x1b055a[_0x4fee('0x73')](_0x4fee('0x72'));};_0xcc0c6b[_0x4fee('0x74')]=function(_0xe55fdd){var _0x74236d=_0x5462b3(_0x4fee('0x75'));_0x74236d[_0x4fee('0x76')]();_0x74236d[_0x4fee('0x5a')](function(){var _0x74236d=_0x5462b3(this),_0x3ba781,_0x25f29d,_0x51c8ba=_0x5462b3(''),_0x35dfac;for(_0x35dfac in window['_QuatroDigital_DropDown'][_0x4fee('0x69')][_0x4fee('0x63')])if('object'===typeof window['_QuatroDigital_DropDown'][_0x4fee('0x69')][_0x4fee('0x63')][_0x35dfac]){var _0x2a6eff=window[_0x4fee('0x18')][_0x4fee('0x69')][_0x4fee('0x63')][_0x35dfac];var _0x4ce6dd=_0x2a6eff['productCategoryIds']['replace'](/^\/|\/$/g,'')[_0x4fee('0x6')]('/');var _0x162d68=_0x5462b3(_0x4fee('0x77'));_0x162d68[_0x4fee('0x78')]({'data-sku':_0x2a6eff['id'],'data-sku-index':_0x35dfac,'data-qd-departament':_0x4ce6dd[0x0],'data-qd-category':_0x4ce6dd[_0x4ce6dd[_0x4fee('0x7')]-0x1]});_0x162d68[_0x4fee('0x73')](_0x4fee('0x79')+_0x2a6eff[_0x4fee('0x7a')]);_0x162d68[_0x4fee('0x3a')](_0x4fee('0x7b'))[_0x4fee('0x39')](_0x2cd518[_0x4fee('0x7c')](_0x2a6eff));_0x162d68[_0x4fee('0x3a')](_0x4fee('0x7d'))[_0x4fee('0x39')](isNaN(_0x2a6eff[_0x4fee('0x7e')])?_0x2a6eff[_0x4fee('0x7e')]:0x0==_0x2a6eff['sellingPrice']?'Grátis':(_0x5462b3('meta[name=currency]')[_0x4fee('0x78')](_0x4fee('0x7f'))||'R$')+'\x20'+qd_number_format(_0x2a6eff[_0x4fee('0x7e')]/0x64,0x2,',','.'));_0x162d68[_0x4fee('0x3a')](_0x4fee('0x80'))[_0x4fee('0x78')]({'data-sku':_0x2a6eff['id'],'data-sku-index':_0x35dfac})[_0x4fee('0x81')](_0x2a6eff[_0x4fee('0x82')]);_0x162d68['find'](_0x4fee('0x83'))['attr']({'data-sku':_0x2a6eff['id'],'data-sku-index':_0x35dfac});_0xcc0c6b[_0x4fee('0x84')](_0x2a6eff['id'],_0x162d68[_0x4fee('0x3a')](_0x4fee('0x85')),_0x2a6eff[_0x4fee('0x86')]);_0x162d68[_0x4fee('0x3a')](_0x4fee('0x87'))[_0x4fee('0x78')]({'data-sku':_0x2a6eff['id'],'data-sku-index':_0x35dfac});_0x162d68[_0x4fee('0x88')](_0x74236d);_0x51c8ba=_0x51c8ba['add'](_0x162d68);}try{var _0x271abc=_0x74236d[_0x4fee('0x0')](_0x4fee('0x68'))[_0x4fee('0x3a')](_0x4fee('0x49'));_0x271abc[_0x4fee('0x7')]&&''==_0x271abc['val']()&&window[_0x4fee('0x18')]['getOrderForm'][_0x4fee('0x89')][_0x4fee('0x8a')]&&_0x271abc[_0x4fee('0x81')](window['_QuatroDigital_DropDown'][_0x4fee('0x69')][_0x4fee('0x89')]['address'][_0x4fee('0x8b')]);}catch(_0x449161){_0x37d4c7('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x449161['message'],_0x4fee('0x14'));}_0xcc0c6b[_0x4fee('0x8c')](_0x74236d);_0xcc0c6b[_0x4fee('0x4c')]();_0xe55fdd&&_0xe55fdd[_0x4fee('0x8d')]&&function(){_0x25f29d=_0x51c8ba['filter'](_0x4fee('0x8e')+_0xe55fdd[_0x4fee('0x8d')]+'\x27]');_0x25f29d[_0x4fee('0x7')]&&(_0x3ba781=0x0,_0x51c8ba[_0x4fee('0x5a')](function(){var _0xe55fdd=_0x5462b3(this);if(_0xe55fdd['is'](_0x25f29d))return!0x1;_0x3ba781+=_0xe55fdd[_0x4fee('0x8f')]();}),_0xcc0c6b[_0x4fee('0x48')](void 0x0,void 0x0,_0x3ba781,_0x74236d[_0x4fee('0x5c')](_0x74236d['parent']())),_0x51c8ba[_0x4fee('0x3d')](_0x4fee('0x90')),function(_0xe8860f){_0xe8860f['addClass'](_0x4fee('0x91'));_0xe8860f['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0xe8860f[_0x4fee('0x3d')](_0x4fee('0x91'));},_0x2cd518['timeRemoveNewItemClass']);}(_0x25f29d),_0x5462b3(document[_0x4fee('0x42')])[_0x4fee('0x73')](_0x4fee('0x92')),setTimeout(function(){_0x5462b3(document[_0x4fee('0x42')])[_0x4fee('0x3d')](_0x4fee('0x92'));},_0x2cd518[_0x4fee('0x67')]));}();});(function(){_QuatroDigital_DropDown[_0x4fee('0x69')][_0x4fee('0x63')][_0x4fee('0x7')]?(_0x5462b3(_0x4fee('0x42'))[_0x4fee('0x3d')](_0x4fee('0x93'))[_0x4fee('0x73')](_0x4fee('0x94')),setTimeout(function(){_0x5462b3('body')[_0x4fee('0x3d')](_0x4fee('0x95'));},_0x2cd518[_0x4fee('0x67')])):_0x5462b3('body')['removeClass'](_0x4fee('0x96'))['addClass'](_0x4fee('0x93'));}());'function'===typeof _0x2cd518[_0x4fee('0x97')]?_0x2cd518[_0x4fee('0x97')][_0x4fee('0x5b')](this):_0x37d4c7(_0x4fee('0x98'));};_0xcc0c6b['insertProdImg']=function(_0x5097a4,_0xd37858,_0x48c581){function _0x3d13a6(){_0xd37858[_0x4fee('0x3d')](_0x4fee('0x99'))[_0x4fee('0x9a')](function(){_0x5462b3(this)[_0x4fee('0x73')]('qd-loaded');})[_0x4fee('0x78')](_0x4fee('0x9b'),_0x48c581);}_0x48c581?_0x3d13a6():isNaN(_0x5097a4)?_0x37d4c7(_0x4fee('0x9c'),'alerta'):alert(_0x4fee('0x9d'));};_0xcc0c6b[_0x4fee('0x8c')]=function(_0x1a6c9f){var _0x74236d=function(_0x413600,_0xe42c0c){var _0x3f65b5=_0x5462b3(_0x413600);var _0x321ac3=_0x3f65b5['attr'](_0x4fee('0x9e'));var _0x25f29d=_0x3f65b5[_0x4fee('0x78')](_0x4fee('0x9f'));if(_0x321ac3){var _0x5502ac=parseInt(_0x3f65b5[_0x4fee('0x81')]())||0x1;_0xcc0c6b[_0x4fee('0xa0')]([_0x321ac3,_0x25f29d],_0x5502ac,_0x5502ac+0x1,function(_0x11c7df){_0x3f65b5[_0x4fee('0x81')](_0x11c7df);_0x4fee('0x6a')===typeof _0xe42c0c&&_0xe42c0c();});}};var _0x5902b1=function(_0x26bc7b,_0x267fd4){var _0x3d9a3b=_0x5462b3(_0x26bc7b);var _0x25f29d=_0x3d9a3b['attr'](_0x4fee('0x9e'));var _0x2280d3=_0x3d9a3b[_0x4fee('0x78')]('data-sku-index');if(_0x25f29d){var _0x32dc36=parseInt(_0x3d9a3b[_0x4fee('0x81')]())||0x2;_0xcc0c6b['changeQantity']([_0x25f29d,_0x2280d3],_0x32dc36,_0x32dc36-0x1,function(_0x5881a8){_0x3d9a3b[_0x4fee('0x81')](_0x5881a8);_0x4fee('0x6a')===typeof _0x267fd4&&_0x267fd4();});}};var _0x300b51=function(_0x4dd70b,_0x9e5b82){var _0x74236d=_0x5462b3(_0x4dd70b);var _0x25f29d=_0x74236d[_0x4fee('0x78')](_0x4fee('0x9e'));var _0x33a18f=_0x74236d[_0x4fee('0x78')](_0x4fee('0x9f'));if(_0x25f29d){var _0x4117aa=parseInt(_0x74236d[_0x4fee('0x81')]())||0x1;_0xcc0c6b[_0x4fee('0xa0')]([_0x25f29d,_0x33a18f],0x1,_0x4117aa,function(_0x5da607){_0x74236d[_0x4fee('0x81')](_0x5da607);_0x4fee('0x6a')===typeof _0x9e5b82&&_0x9e5b82();});}};var _0x25f29d=_0x1a6c9f[_0x4fee('0x3a')](_0x4fee('0xa1'));_0x25f29d['addClass'](_0x4fee('0xa2'))[_0x4fee('0x5a')](function(){var _0x1a6c9f=_0x5462b3(this);_0x1a6c9f[_0x4fee('0x3a')](_0x4fee('0xa3'))['on']('click.qd_ddc_more',function(_0x466d56){_0x466d56[_0x4fee('0xa4')]();_0x25f29d['addClass'](_0x4fee('0xa5'));_0x74236d(_0x1a6c9f[_0x4fee('0x3a')]('.qd-ddc-quantity'),function(){_0x25f29d['removeClass'](_0x4fee('0xa5'));});});_0x1a6c9f[_0x4fee('0x3a')]('.qd-ddc-quantityMinus')['on'](_0x4fee('0xa6'),function(_0x3d7016){_0x3d7016[_0x4fee('0xa4')]();_0x25f29d[_0x4fee('0x73')]('qd-loading');_0x5902b1(_0x1a6c9f[_0x4fee('0x3a')]('.qd-ddc-quantity'),function(){_0x25f29d[_0x4fee('0x3d')]('qd-loading');});});_0x1a6c9f['find'](_0x4fee('0x80'))['on'](_0x4fee('0xa7'),function(){_0x25f29d['addClass'](_0x4fee('0xa5'));_0x300b51(this,function(){_0x25f29d['removeClass'](_0x4fee('0xa5'));});});_0x1a6c9f[_0x4fee('0x3a')](_0x4fee('0x80'))['on'](_0x4fee('0xa8'),function(_0x31dc4e){0xd==_0x31dc4e['keyCode']&&(_0x25f29d[_0x4fee('0x73')]('qd-loading'),_0x300b51(this,function(){_0x25f29d[_0x4fee('0x3d')](_0x4fee('0xa5'));}));});});_0x1a6c9f['find'](_0x4fee('0x71'))[_0x4fee('0x5a')](function(){var _0x1a6c9f=_0x5462b3(this);_0x1a6c9f['find'](_0x4fee('0x83'))['on'](_0x4fee('0xa9'),function(){_0x1a6c9f['addClass'](_0x4fee('0xa5'));_0xcc0c6b[_0x4fee('0xaa')](_0x5462b3(this),function(_0x3a78b4){_0x3a78b4?_0x1a6c9f[_0x4fee('0xab')](!0x0)['slideUp'](function(){_0x1a6c9f['remove']();_0xcc0c6b[_0x4fee('0x4c')]();}):_0x1a6c9f[_0x4fee('0x3d')](_0x4fee('0xa5'));});return!0x1;});});};_0xcc0c6b['shippingCalculate']=function(_0x267bff){var _0x370dfd=_0x267bff[_0x4fee('0x81')]();_0x370dfd=_0x370dfd[_0x4fee('0x2')](/[^0-9\-]/g,'');_0x370dfd=_0x370dfd['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x4fee('0xac'));_0x370dfd=_0x370dfd[_0x4fee('0x2')](/(.{9}).*/g,'$1');_0x267bff['val'](_0x370dfd);0x9<=_0x370dfd[_0x4fee('0x7')]&&(_0x267bff[_0x4fee('0xad')](_0x4fee('0xae'))!=_0x370dfd&&_0x271abc[_0x4fee('0xaf')]({'postalCode':_0x370dfd,'country':_0x4fee('0xb0')})[_0x4fee('0xb1')](function(_0x4f6f7e){window[_0x4fee('0x18')]['getOrderForm']=_0x4f6f7e;_0xcc0c6b['getCartInfoByUrl']();})['fail'](function(_0x14bbd6){_0x37d4c7([_0x4fee('0xb2'),_0x14bbd6]);updateCartData();}),_0x267bff[_0x4fee('0xad')](_0x4fee('0xae'),_0x370dfd));};_0xcc0c6b[_0x4fee('0xa0')]=function(_0x224251,_0x2603a0,_0x469756,_0x3c7f39){function _0x1a141c(_0x19b4d6){_0x19b4d6=_0x4fee('0xb3')!==typeof _0x19b4d6?!0x1:_0x19b4d6;_0xcc0c6b[_0x4fee('0x65')]();window[_0x4fee('0x18')][_0x4fee('0x19')]=!0x1;_0xcc0c6b['cartIsEmpty']();_0x4fee('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x4fee('0x6a')===typeof window[_0x4fee('0x6b')][_0x4fee('0x6c')]&&window['_QuatroDigital_AmountProduct'][_0x4fee('0x6c')]['call'](this);_0x4fee('0x6a')===typeof adminCart&&adminCart();_0x5462b3['fn']['simpleCart'](!0x0,void 0x0,_0x19b4d6);_0x4fee('0x6a')===typeof _0x3c7f39&&_0x3c7f39(_0x2603a0);}_0x469756=_0x469756||0x1;if(0x1>_0x469756)return _0x2603a0;if(_0x2cd518[_0x4fee('0x2c')]){if(_0x4fee('0x3')===typeof window['_QuatroDigital_DropDown'][_0x4fee('0x69')]['items'][_0x224251[0x1]])return _0x37d4c7(_0x4fee('0xb4')+_0x224251[0x1]+']'),_0x2603a0;window[_0x4fee('0x18')]['getOrderForm'][_0x4fee('0x63')][_0x224251[0x1]][_0x4fee('0x82')]=_0x469756;window['_QuatroDigital_DropDown']['getOrderForm'][_0x4fee('0x63')][_0x224251[0x1]][_0x4fee('0xb5')]=_0x224251[0x1];_0x271abc[_0x4fee('0xb6')]([window[_0x4fee('0x18')]['getOrderForm']['items'][_0x224251[0x1]]],[_0x4fee('0x63'),_0x4fee('0xb7'),'shippingData'])[_0x4fee('0xb1')](function(_0x6b6de8){window['_QuatroDigital_DropDown'][_0x4fee('0x69')]=_0x6b6de8;_0x1a141c(!0x0);})[_0x4fee('0xb8')](function(_0x4df47b){_0x37d4c7([_0x4fee('0xb9'),_0x4df47b]);_0x1a141c();});}else _0x37d4c7('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0xcc0c6b[_0x4fee('0xaa')]=function(_0x17de80,_0x215b43){function _0x1d9a3c(_0x567d1e){_0x567d1e=_0x4fee('0xb3')!==typeof _0x567d1e?!0x1:_0x567d1e;_0x4fee('0x3')!==typeof window[_0x4fee('0x6b')]&&_0x4fee('0x6a')===typeof window[_0x4fee('0x6b')][_0x4fee('0x6c')]&&window[_0x4fee('0x6b')]['exec'][_0x4fee('0x5b')](this);_0x4fee('0x6a')===typeof adminCart&&adminCart();_0x5462b3['fn']['simpleCart'](!0x0,void 0x0,_0x567d1e);_0x4fee('0x6a')===typeof _0x215b43&&_0x215b43(_0x25f29d);}var _0x25f29d=!0x1,_0x4bc733=_0x5462b3(_0x17de80)[_0x4fee('0x78')](_0x4fee('0x9f'));if(_0x2cd518[_0x4fee('0x2c')]){if(_0x4fee('0x3')===typeof window[_0x4fee('0x18')]['getOrderForm']['items'][_0x4bc733])return _0x37d4c7(_0x4fee('0xb4')+_0x4bc733+']'),_0x25f29d;window['_QuatroDigital_DropDown'][_0x4fee('0x69')][_0x4fee('0x63')][_0x4bc733][_0x4fee('0xb5')]=_0x4bc733;_0x271abc[_0x4fee('0xba')]([window[_0x4fee('0x18')][_0x4fee('0x69')][_0x4fee('0x63')][_0x4bc733]],[_0x4fee('0x63'),_0x4fee('0xb7'),'shippingData'])[_0x4fee('0xb1')](function(_0x1e8c47){_0x25f29d=!0x0;window['_QuatroDigital_DropDown'][_0x4fee('0x69')]=_0x1e8c47;_0x1e97e6(_0x1e8c47);_0x1d9a3c(!0x0);})[_0x4fee('0xb8')](function(_0x40df54){_0x37d4c7([_0x4fee('0xbb'),_0x40df54]);_0x1d9a3c();});}else alert(_0x4fee('0xbc'));};_0xcc0c6b[_0x4fee('0x48')]=function(_0x297cf5,_0x3b63bb,_0x541e91,_0xbeb847){_0xbeb847=_0xbeb847||_0x5462b3('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x297cf5=_0x297cf5||'+';_0x3b63bb=_0x3b63bb||0.9*_0xbeb847[_0x4fee('0xbd')]();_0xbeb847['stop'](!0x0,!0x0)[_0x4fee('0xbe')]({'scrollTop':isNaN(_0x541e91)?_0x297cf5+'='+_0x3b63bb+'px':_0x541e91});};_0x2cd518[_0x4fee('0xbf')]||(_0xcc0c6b['getCartInfoByUrl'](),_0x5462b3['fn'][_0x4fee('0x4b')](!0x0));_0x5462b3(window)['on'](_0x4fee('0xc0'),function(){try{window[_0x4fee('0x18')][_0x4fee('0x69')]=void 0x0,_0xcc0c6b[_0x4fee('0x65')]();}catch(_0x1446f0){_0x37d4c7('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x1446f0[_0x4fee('0xd')],_0x4fee('0xc1'));}});_0x4fee('0x6a')===typeof _0x2cd518[_0x4fee('0xa')]?_0x2cd518[_0x4fee('0xa')][_0x4fee('0x5b')](this):_0x37d4c7(_0x4fee('0xc2'));};_0x5462b3['fn'][_0x4fee('0x1a')]=function(_0x3ac41b){var _0x385c4b=_0x5462b3(this);_0x385c4b['fn']=new _0x5462b3[(_0x4fee('0x1a'))](this,_0x3ac41b);return _0x385c4b;};}catch(_0x793b0e){_0x4fee('0x3')!==typeof console&&_0x4fee('0x6a')===typeof console[_0x4fee('0x17')]&&console[_0x4fee('0x17')](_0x4fee('0xc'),_0x793b0e);}}(this));(function(_0x174d14){try{var _0x2e5c9c=jQuery;window[_0x4fee('0x6b')]=window[_0x4fee('0x6b')]||{};window[_0x4fee('0x6b')][_0x4fee('0x63')]={};window['_QuatroDigital_AmountProduct'][_0x4fee('0xc3')]=!0x1;window[_0x4fee('0x6b')][_0x4fee('0xc4')]=!0x1;window[_0x4fee('0x6b')][_0x4fee('0xc5')]=!0x1;var _0x154c42=function(){if(window[_0x4fee('0x6b')]['allowRecalculate']){var _0x22537a=!0x1;var _0x27a893={};window[_0x4fee('0x6b')][_0x4fee('0x63')]={};for(_0x3533cd in window['_QuatroDigital_DropDown'][_0x4fee('0x69')]['items'])if(_0x4fee('0xe')===typeof window[_0x4fee('0x18')][_0x4fee('0x69')][_0x4fee('0x63')][_0x3533cd]){var _0x4380a7=window[_0x4fee('0x18')]['getOrderForm'][_0x4fee('0x63')][_0x3533cd];'undefined'!==typeof _0x4380a7[_0x4fee('0xc6')]&&null!==_0x4380a7[_0x4fee('0xc6')]&&''!==_0x4380a7[_0x4fee('0xc6')]&&(window[_0x4fee('0x6b')][_0x4fee('0x63')][_0x4fee('0xc7')+_0x4380a7[_0x4fee('0xc6')]]=window['_QuatroDigital_AmountProduct'][_0x4fee('0x63')][_0x4fee('0xc7')+_0x4380a7[_0x4fee('0xc6')]]||{},window[_0x4fee('0x6b')][_0x4fee('0x63')][_0x4fee('0xc7')+_0x4380a7['productId']][_0x4fee('0xc8')]=_0x4380a7[_0x4fee('0xc6')],_0x27a893['prod_'+_0x4380a7[_0x4fee('0xc6')]]||(window[_0x4fee('0x6b')][_0x4fee('0x63')]['prod_'+_0x4380a7['productId']]['qtt']=0x0),window[_0x4fee('0x6b')][_0x4fee('0x63')]['prod_'+_0x4380a7[_0x4fee('0xc6')]]['qtt']+=_0x4380a7[_0x4fee('0x82')],_0x22537a=!0x0,_0x27a893[_0x4fee('0xc7')+_0x4380a7[_0x4fee('0xc6')]]=!0x0);}var _0x3533cd=_0x22537a;}else _0x3533cd=void 0x0;window[_0x4fee('0x6b')][_0x4fee('0xc3')]&&(_0x2e5c9c(_0x4fee('0xc9'))[_0x4fee('0xca')](),_0x2e5c9c(_0x4fee('0xcb'))[_0x4fee('0x3d')](_0x4fee('0xcc')));for(var _0x28eb7b in window[_0x4fee('0x6b')][_0x4fee('0x63')]){_0x4380a7=window[_0x4fee('0x6b')][_0x4fee('0x63')][_0x28eb7b];if(_0x4fee('0xe')!==typeof _0x4380a7)return;_0x27a893=_0x2e5c9c(_0x4fee('0xcd')+_0x4380a7['prodId']+']')[_0x4fee('0x0')]('li');if(window[_0x4fee('0x6b')][_0x4fee('0xc3')]||!_0x27a893[_0x4fee('0x3a')](_0x4fee('0xc9'))[_0x4fee('0x7')])_0x22537a=_0x2e5c9c(_0x4fee('0xce')),_0x22537a[_0x4fee('0x3a')]('.qd-bap-qtt')[_0x4fee('0x56')](_0x4380a7[_0x4fee('0x5e')]),_0x4380a7=_0x27a893[_0x4fee('0x3a')](_0x4fee('0xcf')),_0x4380a7[_0x4fee('0x7')]?_0x4380a7[_0x4fee('0xd0')](_0x22537a)['addClass']('qd-bap-item-added'):_0x27a893[_0x4fee('0xd0')](_0x22537a);}_0x3533cd&&(window[_0x4fee('0x6b')][_0x4fee('0xc3')]=!0x1);};window['_QuatroDigital_AmountProduct']['exec']=function(){window['_QuatroDigital_AmountProduct'][_0x4fee('0xc3')]=!0x0;_0x154c42[_0x4fee('0x5b')](this);};_0x2e5c9c(document)[_0x4fee('0xd1')](function(){_0x154c42[_0x4fee('0x5b')](this);});}catch(_0x46a5ab){_0x4fee('0x3')!==typeof console&&_0x4fee('0x6a')===typeof console[_0x4fee('0x17')]&&console['error'](_0x4fee('0xc'),_0x46a5ab);}}(this));(function(){try{var _0x16a7e5=jQuery,_0x551e56,_0x3f6f49={'selector':_0x4fee('0xd2'),'dropDown':{},'buyButton':{}};_0x16a7e5[_0x4fee('0xd3')]=function(_0x436b14){var _0x11b375={};_0x551e56=_0x16a7e5['extend'](!0x0,{},_0x3f6f49,_0x436b14);_0x436b14=_0x16a7e5(_0x551e56[_0x4fee('0xd4')])[_0x4fee('0x1a')](_0x551e56[_0x4fee('0xd5')]);_0x11b375[_0x4fee('0xd6')]=_0x4fee('0x3')!==typeof _0x551e56[_0x4fee('0xd5')][_0x4fee('0xbf')]&&!0x1===_0x551e56['dropDown'][_0x4fee('0xbf')]?_0x16a7e5(_0x551e56[_0x4fee('0xd4')])[_0x4fee('0xd7')](_0x436b14['fn'],_0x551e56[_0x4fee('0xd6')]):_0x16a7e5(_0x551e56['selector'])[_0x4fee('0xd7')](_0x551e56[_0x4fee('0xd6')]);_0x11b375[_0x4fee('0xd5')]=_0x436b14;return _0x11b375;};_0x16a7e5['fn'][_0x4fee('0xd8')]=function(){_0x4fee('0xe')===typeof console&&_0x4fee('0x6a')===typeof console[_0x4fee('0x15')]&&console[_0x4fee('0x15')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x16a7e5['smartCart']=_0x16a7e5['fn'][_0x4fee('0xd8')];}catch(_0x36078f){'undefined'!==typeof console&&_0x4fee('0x6a')===typeof console[_0x4fee('0x17')]&&console[_0x4fee('0x17')](_0x4fee('0xc'),_0x36078f);}}());

var _0x0829=['.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','strong.skuPrice','yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','---','indexOf','productPage','isProductPage','wrapperElement','closest','filterFlagBy','skuBestPrice','addClass','qd-active','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','find','.qd_active','removeClass','oneFlagByItem','siblings','qd_sp_on','isDiscountFlag','div[skuCorrente]:first','attr','skuCorrente','skus','sku','bestPrice','isSmartCheckout','available','qd-sp-product-unavailable','alerta','appliedDiscount','getDiscountValue','.qd_productOldPrice','val','changeNativePrice','.qd_displayPrice','html','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_installments','append','.qd_saveAmountPercent','prepend','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','forcePromotion','string','not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','style','after','call','.produto','function','prototype','trim','replace','abs','undefined','pow','round','toFixed','split','length','join','QD_SmartPrice','object','error','info','unshift','toLowerCase','aviso','apply','warn','search','text','match','[class*=\x27desconto\x27]','auto'];(function(_0x38a892,_0x4f117c){var _0x576ff0=function(_0x1a3e25){while(--_0x1a3e25){_0x38a892['push'](_0x38a892['shift']());}};_0x576ff0(++_0x4f117c);}(_0x0829,0x15a));var _0x9082=function(_0x146b44,_0xe8198e){_0x146b44=_0x146b44-0x0;var _0x497d3f=_0x0829[_0x146b44];return _0x497d3f;};_0x9082('0x0')!==typeof String[_0x9082('0x1')][_0x9082('0x2')]&&(String[_0x9082('0x1')]['trim']=function(){return this[_0x9082('0x3')](/^\s+|\s+$/g,'');});function qd_number_format(_0x547441,_0x543514,_0x42cfba,_0x442e0e){_0x547441=(_0x547441+'')[_0x9082('0x3')](/[^0-9+\-Ee.]/g,'');_0x547441=isFinite(+_0x547441)?+_0x547441:0x0;_0x543514=isFinite(+_0x543514)?Math[_0x9082('0x4')](_0x543514):0x0;_0x442e0e=_0x9082('0x5')===typeof _0x442e0e?',':_0x442e0e;_0x42cfba=_0x9082('0x5')===typeof _0x42cfba?'.':_0x42cfba;var _0x2a7caa='',_0x2a7caa=function(_0x5c892c,_0x35c33f){var _0x543514=Math[_0x9082('0x6')](0xa,_0x35c33f);return''+(Math[_0x9082('0x7')](_0x5c892c*_0x543514)/_0x543514)[_0x9082('0x8')](_0x35c33f);},_0x2a7caa=(_0x543514?_0x2a7caa(_0x547441,_0x543514):''+Math[_0x9082('0x7')](_0x547441))[_0x9082('0x9')]('.');0x3<_0x2a7caa[0x0][_0x9082('0xa')]&&(_0x2a7caa[0x0]=_0x2a7caa[0x0][_0x9082('0x3')](/\B(?=(?:\d{3})+(?!\d))/g,_0x442e0e));(_0x2a7caa[0x1]||'')[_0x9082('0xa')]<_0x543514&&(_0x2a7caa[0x1]=_0x2a7caa[0x1]||'',_0x2a7caa[0x1]+=Array(_0x543514-_0x2a7caa[0x1]['length']+0x1)[_0x9082('0xb')]('0'));return _0x2a7caa[_0x9082('0xb')](_0x42cfba);};(function(_0x28f79f){'use strict';var _0x24b0c9=jQuery;if(typeof _0x24b0c9['fn'][_0x9082('0xc')]===_0x9082('0x0'))return;var _0x158b2f='Smart\x20Price';var _0x468f6a=function(_0x5e8c52,_0x23f576){if(_0x9082('0xd')===typeof console&&_0x9082('0x0')===typeof console[_0x9082('0xe')]&&_0x9082('0x0')===typeof console[_0x9082('0xf')]&&_0x9082('0x0')===typeof console['warn']){var _0x5db804;_0x9082('0xd')===typeof _0x5e8c52?(_0x5e8c52[_0x9082('0x10')]('['+_0x158b2f+']\x0a'),_0x5db804=_0x5e8c52):_0x5db804=['['+_0x158b2f+']\x0a'+_0x5e8c52];if(_0x9082('0x5')===typeof _0x23f576||'alerta'!==_0x23f576[_0x9082('0x11')]()&&_0x9082('0x12')!==_0x23f576[_0x9082('0x11')]())if(_0x9082('0x5')!==typeof _0x23f576&&_0x9082('0xf')===_0x23f576[_0x9082('0x11')]())try{console[_0x9082('0xf')][_0x9082('0x13')](console,_0x5db804);}catch(_0x24f067){console['info'](_0x5db804[_0x9082('0xb')]('\x0a'));}else try{console[_0x9082('0xe')]['apply'](console,_0x5db804);}catch(_0x5ec7f4){console['error'](_0x5db804[_0x9082('0xb')]('\x0a'));}else try{console[_0x9082('0x14')][_0x9082('0x13')](console,_0x5db804);}catch(_0x4cca51){console['warn'](_0x5db804[_0x9082('0xb')]('\x0a'));}}};var _0x3b279b=/[0-9]+\%/i;var _0x58653e=/[0-9\.]+(?=\%)/i;var _0x421a35={'isDiscountFlag':function(_0x104856){if(_0x104856['text']()[_0x9082('0x15')](_0x3b279b)>-0x1)return!![];return![];},'getDiscountValue':function(_0x48371e){return _0x48371e[_0x9082('0x16')]()[_0x9082('0x17')](_0x58653e);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':_0x9082('0x18'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x9082('0x19'),'wrapperElement':_0x9082('0x1a'),'skuBestPrice':_0x9082('0x1b'),'installments':_0x9082('0x1c'),'installmentValue':_0x9082('0x1d'),'skuPrice':_0x9082('0x1e')}};_0x24b0c9['fn'][_0x9082('0xc')]=function(){};var _0x5ccc04=function(_0x4cb1fe){var _0xcf5957={'r':_0x9082('0x1f')};return function(_0x13c63d){var _0x304340,_0x4d7a80,_0x427763,_0x545c0e;_0x4d7a80=function(_0x1bf830){return _0x1bf830;};_0x427763=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x13c63d=_0x13c63d['d'+_0x427763[0x10]+'c'+_0x427763[0x11]+'m'+_0x4d7a80(_0x427763[0x1])+'n'+_0x427763[0xd]]['l'+_0x427763[0x12]+'c'+_0x427763[0x0]+'ti'+_0x4d7a80('o')+'n'];_0x304340=function(_0xab8d0c){return escape(encodeURIComponent(_0xab8d0c['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4e7852){return String[_0x9082('0x20')](('Z'>=_0x4e7852?0x5a:0x7a)>=(_0x4e7852=_0x4e7852['charCodeAt'](0x0)+0xd)?_0x4e7852:_0x4e7852-0x1a);})));};var _0x4c89fa=_0x304340(_0x13c63d[[_0x427763[0x9],_0x4d7a80('o'),_0x427763[0xc],_0x427763[_0x4d7a80(0xd)]][_0x9082('0xb')]('')]);_0x304340=_0x304340((window[['js',_0x4d7a80('no'),'m',_0x427763[0x1],_0x427763[0x4]['toUpperCase'](),_0x9082('0x21')]['join']('')]||_0x9082('0x22'))+['.v',_0x427763[0xd],'e',_0x4d7a80('x'),'co',_0x4d7a80('mm'),'erc',_0x427763[0x1],'.c',_0x4d7a80('o'),'m.',_0x427763[0x13],'r'][_0x9082('0xb')](''));for(var _0x815566 in _0xcf5957){if(_0x304340===_0x815566+_0xcf5957[_0x815566]||_0x4c89fa===_0x815566+_0xcf5957[_0x815566]){_0x545c0e='tr'+_0x427763[0x11]+'e';break;}_0x545c0e='f'+_0x427763[0x0]+'ls'+_0x4d7a80(_0x427763[0x1])+'';}_0x4d7a80=!0x1;-0x1<_0x13c63d[[_0x427763[0xc],'e',_0x427763[0x0],'rc',_0x427763[0x9]][_0x9082('0xb')]('')][_0x9082('0x23')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x4d7a80=!0x0);return[_0x545c0e,_0x4d7a80];}(_0x4cb1fe);}(window);if(!eval(_0x5ccc04[0x0]))return _0x5ccc04[0x1]?_0x468f6a('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x358041=function(_0x3bc39c,_0x34808b){'use strict';var _0x17cba1=function(_0x14b24d){'use strict';var _0x29670c,_0x107e6a,_0x5c08ec,_0x4668f3,_0x17f247,_0x51ad90,_0x466690,_0x245ef8,_0x54304d,_0x2d061a,_0x3d6e6f,_0x9c4cf6,_0x2d14aa,_0x4d6d74,_0x3413e9,_0x5f0dfd,_0x4a1ce6,_0x53eff9,_0x131536;var _0x3977b1=_0x24b0c9(this);_0x14b24d=typeof _0x14b24d===_0x9082('0x5')?![]:_0x14b24d;if(_0x34808b[_0x9082('0x24')][_0x9082('0x25')])var _0x13ab7c=_0x3977b1['closest'](_0x34808b[_0x9082('0x24')][_0x9082('0x26')]);else var _0x13ab7c=_0x3977b1[_0x9082('0x27')](_0x34808b[_0x9082('0x26')]);if(!_0x14b24d&&!_0x3977b1['is'](_0x34808b[_0x9082('0x28')])){if(_0x34808b['productPage']['isProductPage']&&_0x13ab7c['is'](_0x34808b[_0x9082('0x24')][_0x9082('0x26')])){_0x13ab7c['find'](_0x34808b['productPage'][_0x9082('0x29')])[_0x9082('0x2a')](_0x9082('0x2b'));_0x13ab7c[_0x9082('0x2a')](_0x9082('0x2c'));}return;}var _0x4dd5f1=_0x34808b['productPage']['isProductPage'];if(_0x3977b1['is'](_0x9082('0x2d'))&&!_0x4dd5f1)return;if(_0x4dd5f1){_0x245ef8=_0x13ab7c[_0x9082('0x2e')](_0x34808b[_0x9082('0x24')][_0x9082('0x29')]);if(_0x245ef8[_0x9082('0x2e')](_0x9082('0x2f'))[_0x9082('0xa')])return;_0x245ef8['removeClass'](_0x9082('0x2b'));_0x13ab7c[_0x9082('0x30')](_0x9082('0x2c'));}if(_0x34808b[_0x9082('0x31')]&&_0x3977b1[_0x9082('0x32')]('.qd_sp_on')[_0x9082('0xa')]){_0x3977b1[_0x9082('0x2a')]('qd_sp_ignored');return;}_0x3977b1[_0x9082('0x2a')](_0x9082('0x33'));if(!_0x34808b[_0x9082('0x34')](_0x3977b1))return;if(_0x4dd5f1){_0x5c08ec={};var _0x440194=parseInt(_0x24b0c9(_0x9082('0x35'))[_0x9082('0x36')](_0x9082('0x37')),0xa);if(_0x440194){for(var _0x2d28f8=0x0;_0x2d28f8<skuJson[_0x9082('0x38')]['length'];_0x2d28f8++){if(skuJson['skus'][_0x2d28f8][_0x9082('0x39')]==_0x440194){_0x5c08ec=skuJson[_0x9082('0x38')][_0x2d28f8];break;}}}else{var _0x5ae824=0x5af3107a3fff;for(var _0x209b46 in skuJson[_0x9082('0x38')]){if(typeof skuJson[_0x9082('0x38')][_0x209b46]===_0x9082('0x0'))continue;if(!skuJson[_0x9082('0x38')][_0x209b46]['available'])continue;if(skuJson[_0x9082('0x38')][_0x209b46][_0x9082('0x3a')]<_0x5ae824){_0x5ae824=skuJson['skus'][_0x209b46][_0x9082('0x3a')];_0x5c08ec=skuJson[_0x9082('0x38')][_0x209b46];}}}}_0x5f0dfd=!![];_0x4a1ce6=0x0;if(_0x34808b[_0x9082('0x3b')]&&_0x53eff9){_0x5f0dfd=skuJson[_0x9082('0x3c')];if(!_0x5f0dfd)return _0x13ab7c['addClass'](_0x9082('0x3d'));}_0x107e6a=_0x34808b['getDiscountValue'](_0x3977b1);_0x29670c=parseFloat(_0x107e6a,0xa);if(isNaN(_0x29670c))return _0x468f6a(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x3977b1],_0x9082('0x3e'));var _0x10969a=function(_0x8d7346){if(_0x4dd5f1)_0x4668f3=(_0x8d7346['bestPrice']||0x0)/0x64;else{_0x2d14aa=_0x13ab7c[_0x9082('0x2e')]('.qd_productPrice');_0x4668f3=parseFloat((_0x2d14aa['val']()||'')[_0x9082('0x3')](/[^0-9\.\,]+/i,'')[_0x9082('0x3')]('.','')[_0x9082('0x3')](',','.'),0xa);}if(isNaN(_0x4668f3))return _0x468f6a(['Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(',_0x3977b1,_0x13ab7c]);if(_0x34808b[_0x9082('0x3f')]!==null){_0x4d6d74=0x0;if(!isNaN(_0x34808b[_0x9082('0x3f')]))_0x4d6d74=_0x34808b['appliedDiscount'];else{_0x3413e9=_0x13ab7c[_0x9082('0x2e')](_0x34808b['appliedDiscount']);if(_0x3413e9[_0x9082('0xa')])_0x4d6d74=_0x34808b[_0x9082('0x40')](_0x3413e9);}_0x4d6d74=parseFloat(_0x4d6d74,0xa);if(isNaN(_0x4d6d74))_0x4d6d74=0x0;if(_0x4d6d74!==0x0)_0x4668f3=_0x4668f3*0x64/(0x64-_0x4d6d74);}if(_0x4dd5f1)_0x17f247=(_0x8d7346['listPrice']||0x0)/0x64;else _0x17f247=parseFloat((_0x13ab7c[_0x9082('0x2e')](_0x9082('0x41'))[_0x9082('0x42')]()||'')[_0x9082('0x3')](/[^0-9\.\,]+/i,'')[_0x9082('0x3')]('.','')['replace'](',','.'),0xa);if(isNaN(_0x17f247))_0x17f247=0.001;_0x51ad90=_0x4668f3*((0x64-_0x29670c)/0x64);if(_0x4dd5f1&&_0x34808b['productPage'][_0x9082('0x43')]){_0x245ef8[_0x9082('0x16')](_0x245ef8[_0x9082('0x16')]()[_0x9082('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x51ad90,0x2,',','.')))[_0x9082('0x2a')](_0x9082('0x2b'));_0x13ab7c[_0x9082('0x2a')]('qd-sp-active');}else{_0x131536=_0x13ab7c[_0x9082('0x2e')](_0x9082('0x44'));_0x131536['text'](_0x131536[_0x9082('0x16')]()['replace'](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x51ad90,0x2,',','.'));}if(_0x4dd5f1){_0x466690=_0x13ab7c[_0x9082('0x2e')](_0x34808b['productPage']['skuPrice']);if(_0x466690[_0x9082('0xa')])_0x466690[_0x9082('0x16')](_0x466690['text']()['trim']()[_0x9082('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x51ad90,0x2,',','.')));}var _0x46d16c=_0x13ab7c[_0x9082('0x2e')]('.qd-sp-display-discount');_0x46d16c[_0x9082('0x16')](_0x46d16c[_0x9082('0x16')]()[_0x9082('0x3')](/[0-9]+\%/i,_0x29670c+'%'));var _0x2b4486=function(_0x2895d3,_0x3d1508,_0x1caa9c){var _0x71d290=_0x13ab7c[_0x9082('0x2e')](_0x2895d3);if(_0x71d290['length'])_0x71d290['html'](_0x71d290[_0x9082('0x45')]()[_0x9082('0x2')]()[_0x9082('0x3')](/[0-9]{1,2}/,_0x1caa9c?_0x1caa9c:_0x8d7346['installments']||0x0));var _0x5e84d4=_0x13ab7c[_0x9082('0x2e')](_0x3d1508);if(_0x5e84d4[_0x9082('0xa')])_0x5e84d4[_0x9082('0x45')](_0x5e84d4['html']()[_0x9082('0x2')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x51ad90/(_0x1caa9c?_0x1caa9c:_0x8d7346['installments']||0x1),0x2,',','.')));};if(_0x4dd5f1&&_0x34808b[_0x9082('0x24')][_0x9082('0x46')])_0x2b4486(_0x34808b[_0x9082('0x24')]['installments'],_0x34808b[_0x9082('0x24')][_0x9082('0x47')]);else if(_0x34808b[_0x9082('0x46')])_0x2b4486(_0x9082('0x48'),'.qd_sp_display_installmentValue',parseInt(_0x13ab7c[_0x9082('0x2e')](_0x9082('0x49'))[_0x9082('0x42')]()||0x1)||0x1);_0x13ab7c[_0x9082('0x2e')]('.qd_saveAmount')[_0x9082('0x4a')](qd_number_format(_0x17f247-_0x51ad90,0x2,',','.'));_0x13ab7c[_0x9082('0x2e')](_0x9082('0x4b'))[_0x9082('0x4c')](qd_number_format((_0x17f247-_0x51ad90)*0x64/_0x17f247,0x2,',','.'));if(_0x4dd5f1&&_0x34808b[_0x9082('0x24')][_0x9082('0x4d')]){_0x24b0c9(_0x9082('0x4e'))[_0x9082('0x4f')](function(){_0x3d6e6f=_0x24b0c9(this);_0x3d6e6f[_0x9082('0x16')](_0x3d6e6f[_0x9082('0x16')]()['trim']()[_0x9082('0x3')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x17f247-_0x51ad90,0x2,',','.')));_0x3d6e6f['addClass']('qd-active');});}};_0x10969a(_0x5c08ec);if(_0x4dd5f1)_0x24b0c9(window)['on'](_0x9082('0x50'),function(_0x193e51,_0x1c6851,_0x2c5016){_0x10969a(_0x2c5016);});_0x13ab7c[_0x9082('0x2a')]('qd_sp_processedItem');if(!_0x4dd5f1)_0x2d14aa['addClass'](_0x9082('0x51'));};(_0x34808b[_0x9082('0x52')]?_0x3bc39c[_0x9082('0x2e')](_0x34808b[_0x9082('0x53')]):_0x3bc39c)['each'](function(){_0x17cba1['call'](this,![]);});if(typeof _0x34808b[_0x9082('0x54')]==_0x9082('0x55')){var _0x5508f0=_0x34808b[_0x9082('0x52')]?_0x3bc39c:_0x3bc39c['closest'](_0x34808b[_0x9082('0x26')]);if(_0x34808b[_0x9082('0x24')]['isProductPage'])_0x5508f0=_0x5508f0['closest'](_0x34808b[_0x9082('0x24')][_0x9082('0x26')])[_0x9082('0x56')](_0x9082('0x57'));else _0x5508f0=_0x5508f0[_0x9082('0x2e')](_0x9082('0x58'));_0x5508f0[_0x9082('0x4f')](function(){var _0x3483e9=_0x24b0c9(_0x34808b[_0x9082('0x54')]);_0x3483e9[_0x9082('0x36')](_0x9082('0x59'),'display:none\x20!important;');if(_0x34808b[_0x9082('0x24')]['isProductPage'])_0x24b0c9(this)[_0x9082('0x4a')](_0x3483e9);else _0x24b0c9(this)[_0x9082('0x5a')](_0x3483e9);_0x17cba1[_0x9082('0x5b')](_0x3483e9,!![]);});}};_0x24b0c9['fn']['QD_SmartPrice']=function(_0x25ab4c){var _0x396f31=_0x24b0c9(this);if(!_0x396f31['length'])return _0x396f31;var _0x399363=_0x24b0c9['extend'](!![],{},_0x421a35,_0x25ab4c);if(typeof _0x399363[_0x9082('0x24')][_0x9082('0x25')]!='boolean')_0x399363['productPage'][_0x9082('0x25')]=_0x24b0c9(document['body'])['is'](_0x9082('0x5c'));_0x358041(_0x396f31,_0x399363);return _0x396f31;};}(this));