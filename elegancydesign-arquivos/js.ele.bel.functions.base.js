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

			var jsnomeLoja = "elegancydesign";

			var form = $(".institutional-contact");
			//form.find("#qd_form_phone").mask('(00) 0000-00009');

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
									success: function (data) { $('.institutional-contact').addClass("hide");
										$('.form-succes').removeClass('hide');   },
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
var _0xb235=['---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','img[alt=\x27','attr','getParent','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul',':not(ul)','qd-am-elem-','text','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-dropdown','children','qd-am-level-','add','-li','QuatroDigital.am.callback','extend','exec','function','QD_amazingMenu','/qd-amazing-menu','object','error','undefined','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','info','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','first','last','yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite'];(function(_0x1db5b3,_0x38e353){var _0x5579e0=function(_0x28f08f){while(--_0x28f08f){_0x1db5b3['push'](_0x1db5b3['shift']());}};_0x5579e0(++_0x38e353);}(_0xb235,0x10d));var _0x5b23=function(_0x141908,_0x4e61dc){_0x141908=_0x141908-0x0;var _0x37e9c9=_0xb235[_0x141908];return _0x37e9c9;};(function(_0x9e463b){_0x9e463b['fn']['getParent']=_0x9e463b['fn']['closest'];}(jQuery));(function(_0x1fa435){var _0xec07db;var _0x6b7af6=jQuery;if(_0x5b23('0x0')!==typeof _0x6b7af6['fn'][_0x5b23('0x1')]){var _0x359a6c={'url':_0x5b23('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x5d8378=function(_0x3882d9,_0x166c9f){if(_0x5b23('0x3')===typeof console&&'undefined'!==typeof console[_0x5b23('0x4')]&&'undefined'!==typeof console['info']&&_0x5b23('0x5')!==typeof console[_0x5b23('0x6')]){var _0x49b00f;_0x5b23('0x3')===typeof _0x3882d9?(_0x3882d9[_0x5b23('0x7')](_0x5b23('0x8')),_0x49b00f=_0x3882d9):_0x49b00f=[_0x5b23('0x8')+_0x3882d9];if(_0x5b23('0x5')===typeof _0x166c9f||_0x5b23('0x9')!==_0x166c9f[_0x5b23('0xa')]()&&_0x5b23('0xb')!==_0x166c9f[_0x5b23('0xa')]())if(_0x5b23('0x5')!==typeof _0x166c9f&&_0x5b23('0xc')===_0x166c9f['toLowerCase']())try{console[_0x5b23('0xc')][_0x5b23('0xd')](console,_0x49b00f);}catch(_0x108156){try{console[_0x5b23('0xc')](_0x49b00f[_0x5b23('0xe')]('\x0a'));}catch(_0xda27ec){}}else try{console['error'][_0x5b23('0xd')](console,_0x49b00f);}catch(_0xae2f4d){try{console[_0x5b23('0x4')](_0x49b00f['join']('\x0a'));}catch(_0xb84240){}}else try{console['warn']['apply'](console,_0x49b00f);}catch(_0x3c9db5){try{console[_0x5b23('0x6')](_0x49b00f[_0x5b23('0xe')]('\x0a'));}catch(_0x113022){}}}};_0x6b7af6['fn'][_0x5b23('0xf')]=function(){var _0x44a8d3=_0x6b7af6(this);_0x44a8d3[_0x5b23('0x10')](function(_0x549911){_0x6b7af6(this)[_0x5b23('0x11')](_0x5b23('0x12')+_0x549911);});_0x44a8d3[_0x5b23('0x13')]()[_0x5b23('0x11')]('qd-am-first');_0x44a8d3[_0x5b23('0x14')]()[_0x5b23('0x11')]('qd-am-last');return _0x44a8d3;};_0x6b7af6['fn']['QD_amazingMenu']=function(){};_0x1fa435=function(_0x2709a8){var _0xddc560={'r':_0x5b23('0x15')};return function(_0x2a670a){var _0x4413a3=function(_0x1a2ca6){return _0x1a2ca6;};var _0x5b5ead=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2a670a=_0x2a670a['d'+_0x5b5ead[0x10]+'c'+_0x5b5ead[0x11]+'m'+_0x4413a3(_0x5b5ead[0x1])+'n'+_0x5b5ead[0xd]]['l'+_0x5b5ead[0x12]+'c'+_0x5b5ead[0x0]+'ti'+_0x4413a3('o')+'n'];var _0x1e004a=function(_0x920f7b){return escape(encodeURIComponent(_0x920f7b[_0x5b23('0x16')](/\./g,'¨')[_0x5b23('0x16')](/[a-zA-Z]/g,function(_0xaa4a3b){return String[_0x5b23('0x17')](('Z'>=_0xaa4a3b?0x5a:0x7a)>=(_0xaa4a3b=_0xaa4a3b[_0x5b23('0x18')](0x0)+0xd)?_0xaa4a3b:_0xaa4a3b-0x1a);})));};var _0x53a9e=_0x1e004a(_0x2a670a[[_0x5b5ead[0x9],_0x4413a3('o'),_0x5b5ead[0xc],_0x5b5ead[_0x4413a3(0xd)]]['join']('')]);_0x1e004a=_0x1e004a((window[['js',_0x4413a3('no'),'m',_0x5b5ead[0x1],_0x5b5ead[0x4][_0x5b23('0x19')](),_0x5b23('0x1a')][_0x5b23('0xe')]('')]||_0x5b23('0x1b'))+['.v',_0x5b5ead[0xd],'e',_0x4413a3('x'),'co',_0x4413a3('mm'),_0x5b23('0x1c'),_0x5b5ead[0x1],'.c',_0x4413a3('o'),'m.',_0x5b5ead[0x13],'r']['join'](''));for(var _0x2c8a80 in _0xddc560){if(_0x1e004a===_0x2c8a80+_0xddc560[_0x2c8a80]||_0x53a9e===_0x2c8a80+_0xddc560[_0x2c8a80]){var _0x5e8d24='tr'+_0x5b5ead[0x11]+'e';break;}_0x5e8d24='f'+_0x5b5ead[0x0]+'ls'+_0x4413a3(_0x5b5ead[0x1])+'';}_0x4413a3=!0x1;-0x1<_0x2a670a[[_0x5b5ead[0xc],'e',_0x5b5ead[0x0],'rc',_0x5b5ead[0x9]][_0x5b23('0xe')]('')][_0x5b23('0x1d')](_0x5b23('0x1e'))&&(_0x4413a3=!0x0);return[_0x5e8d24,_0x4413a3];}(_0x2709a8);}(window);if(!eval(_0x1fa435[0x0]))return _0x1fa435[0x1]?_0x5d8378(_0x5b23('0x1f')):!0x1;var _0x5228f7=function(_0x4092c3){var _0x5e71c2=_0x4092c3[_0x5b23('0x20')]('.qd_am_code');var _0x2b1143=_0x5e71c2[_0x5b23('0x21')](_0x5b23('0x22'));var _0x3511f3=_0x5e71c2[_0x5b23('0x21')](_0x5b23('0x23'));if(_0x2b1143['length']||_0x3511f3[_0x5b23('0x24')])_0x2b1143[_0x5b23('0x25')]()[_0x5b23('0x11')](_0x5b23('0x26')),_0x3511f3[_0x5b23('0x25')]()[_0x5b23('0x11')](_0x5b23('0x27')),_0x6b7af6['qdAjax']({'url':_0xec07db[_0x5b23('0x28')],'dataType':'html','success':function(_0x481218){var _0xd98be=_0x6b7af6(_0x481218);_0x2b1143['each'](function(){var _0x481218=_0x6b7af6(this);var _0x4bb818=_0xd98be[_0x5b23('0x20')](_0x5b23('0x29')+_0x481218[_0x5b23('0x2a')]('data-qdam-value')+'\x27]');_0x4bb818[_0x5b23('0x24')]&&(_0x4bb818[_0x5b23('0x10')](function(){_0x6b7af6(this)[_0x5b23('0x2b')](_0x5b23('0x2c'))[_0x5b23('0x2d')]()[_0x5b23('0x2e')](_0x481218);}),_0x481218[_0x5b23('0x2f')]());})[_0x5b23('0x11')](_0x5b23('0x30'));_0x3511f3[_0x5b23('0x10')](function(){var _0x481218={};var _0x26c1fa=_0x6b7af6(this);_0xd98be[_0x5b23('0x20')]('h2')[_0x5b23('0x10')](function(){if(_0x6b7af6(this)['text']()[_0x5b23('0x31')]()['toLowerCase']()==_0x26c1fa[_0x5b23('0x2a')]('data-qdam-value')[_0x5b23('0x31')]()[_0x5b23('0xa')]())return _0x481218=_0x6b7af6(this),!0x1;});_0x481218[_0x5b23('0x24')]&&(_0x481218[_0x5b23('0x10')](function(){_0x6b7af6(this)[_0x5b23('0x2b')](_0x5b23('0x32'))['clone']()[_0x5b23('0x2e')](_0x26c1fa);}),_0x26c1fa[_0x5b23('0x2f')]());})['addClass'](_0x5b23('0x30'));},'error':function(){_0x5d8378('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0xec07db[_0x5b23('0x28')]+'\x27\x20falho.');},'complete':function(){_0xec07db[_0x5b23('0x33')][_0x5b23('0x34')](this);_0x6b7af6(window)[_0x5b23('0x35')](_0x5b23('0x36'),_0x4092c3);},'clearQueueDelay':0xbb8});};_0x6b7af6[_0x5b23('0x1')]=function(_0x20c4e8){var _0x14781c=_0x20c4e8[_0x5b23('0x20')](_0x5b23('0x37'))[_0x5b23('0x10')](function(){var _0x4c2984=_0x6b7af6(this);if(!_0x4c2984['length'])return _0x5d8378([_0x5b23('0x38'),_0x20c4e8],_0x5b23('0x9'));_0x4c2984[_0x5b23('0x20')](_0x5b23('0x39'))[_0x5b23('0x25')]()[_0x5b23('0x11')](_0x5b23('0x3a'));_0x4c2984['find']('li')[_0x5b23('0x10')](function(){var _0x5da008=_0x6b7af6(this);var _0x4fbda8=_0x5da008['children'](_0x5b23('0x3b'));_0x4fbda8[_0x5b23('0x24')]&&_0x5da008[_0x5b23('0x11')](_0x5b23('0x3c')+_0x4fbda8[_0x5b23('0x13')]()[_0x5b23('0x3d')]()['trim']()[_0x5b23('0x3e')]()['replace'](/\./g,'')[_0x5b23('0x16')](/\s/g,'-')[_0x5b23('0xa')]());});var _0x41b4b0=_0x4c2984[_0x5b23('0x20')](_0x5b23('0x3f'))[_0x5b23('0xf')]();_0x4c2984['addClass'](_0x5b23('0x40'));_0x41b4b0=_0x41b4b0[_0x5b23('0x20')](_0x5b23('0x41'));_0x41b4b0[_0x5b23('0x10')](function(){var _0x5b966c=_0x6b7af6(this);_0x5b966c[_0x5b23('0x20')]('>li')['qdAmAddNdx']()[_0x5b23('0x11')]('qd-am-column');_0x5b966c[_0x5b23('0x11')]('qd-am-dropdown-menu');_0x5b966c[_0x5b23('0x25')]()['addClass']('qd-am-dropdown');});_0x41b4b0[_0x5b23('0x11')](_0x5b23('0x42'));var _0x1f8615=0x0,_0x1fa435=function(_0x210e7a){_0x1f8615+=0x1;_0x210e7a=_0x210e7a['children']('li')[_0x5b23('0x43')]('*');_0x210e7a[_0x5b23('0x24')]&&(_0x210e7a['addClass'](_0x5b23('0x44')+_0x1f8615),_0x1fa435(_0x210e7a));};_0x1fa435(_0x4c2984);_0x4c2984[_0x5b23('0x45')](_0x4c2984[_0x5b23('0x20')]('ul'))[_0x5b23('0x10')](function(){var _0x598a0a=_0x6b7af6(this);_0x598a0a[_0x5b23('0x11')]('qd-am-'+_0x598a0a['children']('li')[_0x5b23('0x24')]+_0x5b23('0x46'));});});_0x5228f7(_0x14781c);_0xec07db['callback'][_0x5b23('0x34')](this);_0x6b7af6(window)[_0x5b23('0x35')](_0x5b23('0x47'),_0x20c4e8);};_0x6b7af6['fn']['QD_amazingMenu']=function(_0x15bf50){var _0x53b36d=_0x6b7af6(this);if(!_0x53b36d[_0x5b23('0x24')])return _0x53b36d;_0xec07db=_0x6b7af6[_0x5b23('0x48')]({},_0x359a6c,_0x15bf50);_0x53b36d[_0x5b23('0x49')]=new _0x6b7af6[(_0x5b23('0x1'))](_0x6b7af6(this));return _0x53b36d;};_0x6b7af6(function(){_0x6b7af6('.qd_amazing_menu_auto')[_0x5b23('0x1')]();});}}(this));

/* Quatro Digital Smart Cart */
var _0xad4e=['find','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','allowUpdate','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','shippingData','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','each','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','attr','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','message','aviso','actionButtons','lastSku','filter','outerHeight','parent','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-product-add-time','callbackProductsList','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','preventDefault','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','slideUp','remove','$1-$2$3','calculateShipping','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','qdDdcLastPostalCode','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','scrollCart','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','quickViewUpdate','productId','prod_','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','getParent','.qd-bap-wrapper','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','ajaxStop','QD_smartCart','selector','dropDown','QD_buyButton','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','abs','undefined','pow','toFixed','round','split','length','join','_QuatroDigital_CartData','callback','function','error','Oooops!\x20','object','info','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','apply','warn','_QuatroDigital_DropDown','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode'];(function(_0x515c95,_0x18930f){var _0x55ad4b=function(_0x2c706c){while(--_0x2c706c){_0x515c95['push'](_0x515c95['shift']());}};_0x55ad4b(++_0x18930f);}(_0xad4e,0x173));var _0xead4=function(_0x4412a1,_0xb5c2b5){_0x4412a1=_0x4412a1-0x0;var _0x10ea50=_0xad4e[_0x4412a1];return _0x10ea50;};(function(_0x407232){_0x407232['fn']['getParent']=_0x407232['fn'][_0xead4('0x0')];}(jQuery));function qd_number_format(_0x5060d2,_0x18febc,_0x4edf8a,_0x26f173){_0x5060d2=(_0x5060d2+'')[_0xead4('0x1')](/[^0-9+\-Ee.]/g,'');_0x5060d2=isFinite(+_0x5060d2)?+_0x5060d2:0x0;_0x18febc=isFinite(+_0x18febc)?Math[_0xead4('0x2')](_0x18febc):0x0;_0x26f173=_0xead4('0x3')===typeof _0x26f173?',':_0x26f173;_0x4edf8a=_0xead4('0x3')===typeof _0x4edf8a?'.':_0x4edf8a;var _0x4635cf='',_0x4635cf=function(_0x8f4d26,_0x11c8aa){var _0x18febc=Math[_0xead4('0x4')](0xa,_0x11c8aa);return''+(Math['round'](_0x8f4d26*_0x18febc)/_0x18febc)[_0xead4('0x5')](_0x11c8aa);},_0x4635cf=(_0x18febc?_0x4635cf(_0x5060d2,_0x18febc):''+Math[_0xead4('0x6')](_0x5060d2))[_0xead4('0x7')]('.');0x3<_0x4635cf[0x0]['length']&&(_0x4635cf[0x0]=_0x4635cf[0x0][_0xead4('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x26f173));(_0x4635cf[0x1]||'')[_0xead4('0x8')]<_0x18febc&&(_0x4635cf[0x1]=_0x4635cf[0x1]||'',_0x4635cf[0x1]+=Array(_0x18febc-_0x4635cf[0x1]['length']+0x1)[_0xead4('0x9')]('0'));return _0x4635cf[_0xead4('0x9')](_0x4edf8a);};(function(){try{window[_0xead4('0xa')]=window[_0xead4('0xa')]||{},window[_0xead4('0xa')][_0xead4('0xb')]=window['_QuatroDigital_CartData'][_0xead4('0xb')]||$['Callbacks']();}catch(_0x521bae){_0xead4('0x3')!==typeof console&&_0xead4('0xc')===typeof console['error']&&console[_0xead4('0xd')](_0xead4('0xe'),_0x521bae['message']);}}());(function(_0x17aa60){try{var _0x58167f=jQuery,_0x1e1bb5=function(_0x2a4bd2,_0x3de4c7){if(_0xead4('0xf')===typeof console&&_0xead4('0x3')!==typeof console[_0xead4('0xd')]&&'undefined'!==typeof console[_0xead4('0x10')]&&'undefined'!==typeof console['warn']){var _0x2025b2;_0xead4('0xf')===typeof _0x2a4bd2?(_0x2a4bd2[_0xead4('0x11')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x2025b2=_0x2a4bd2):_0x2025b2=[_0xead4('0x12')+_0x2a4bd2];if(_0xead4('0x3')===typeof _0x3de4c7||_0xead4('0x13')!==_0x3de4c7[_0xead4('0x14')]()&&'aviso'!==_0x3de4c7[_0xead4('0x14')]())if(_0xead4('0x3')!==typeof _0x3de4c7&&_0xead4('0x10')===_0x3de4c7[_0xead4('0x14')]())try{console[_0xead4('0x10')][_0xead4('0x15')](console,_0x2025b2);}catch(_0x1a0238){try{console[_0xead4('0x10')](_0x2025b2['join']('\x0a'));}catch(_0x31e263){}}else try{console['error'][_0xead4('0x15')](console,_0x2025b2);}catch(_0x23b0d3){try{console[_0xead4('0xd')](_0x2025b2[_0xead4('0x9')]('\x0a'));}catch(_0x1435ea){}}else try{console[_0xead4('0x16')][_0xead4('0x15')](console,_0x2025b2);}catch(_0x25e177){try{console['warn'](_0x2025b2[_0xead4('0x9')]('\x0a'));}catch(_0x399b58){}}}};window[_0xead4('0x17')]=window[_0xead4('0x17')]||{};window[_0xead4('0x17')]['allowUpdate']=!0x0;_0x58167f[_0xead4('0x18')]=function(){};_0x58167f['fn'][_0xead4('0x18')]=function(){return{'fn':new _0x58167f()};};var _0x17845c=function(_0x51cc32){var _0x481958={'r':'yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x8f194a){var _0x27c878=function(_0x388250){return _0x388250;};var _0xe3dd4e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x8f194a=_0x8f194a['d'+_0xe3dd4e[0x10]+'c'+_0xe3dd4e[0x11]+'m'+_0x27c878(_0xe3dd4e[0x1])+'n'+_0xe3dd4e[0xd]]['l'+_0xe3dd4e[0x12]+'c'+_0xe3dd4e[0x0]+'ti'+_0x27c878('o')+'n'];var _0x4682bd=function(_0x1dfdad){return escape(encodeURIComponent(_0x1dfdad[_0xead4('0x1')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0xb0c06b){return String[_0xead4('0x19')](('Z'>=_0xb0c06b?0x5a:0x7a)>=(_0xb0c06b=_0xb0c06b[_0xead4('0x1a')](0x0)+0xd)?_0xb0c06b:_0xb0c06b-0x1a);})));};var _0x2d5e41=_0x4682bd(_0x8f194a[[_0xe3dd4e[0x9],_0x27c878('o'),_0xe3dd4e[0xc],_0xe3dd4e[_0x27c878(0xd)]][_0xead4('0x9')]('')]);_0x4682bd=_0x4682bd((window[['js',_0x27c878('no'),'m',_0xe3dd4e[0x1],_0xe3dd4e[0x4][_0xead4('0x1b')](),_0xead4('0x1c')]['join']('')]||_0xead4('0x1d'))+['.v',_0xe3dd4e[0xd],'e',_0x27c878('x'),'co',_0x27c878('mm'),_0xead4('0x1e'),_0xe3dd4e[0x1],'.c',_0x27c878('o'),'m.',_0xe3dd4e[0x13],'r'][_0xead4('0x9')](''));for(var _0xfa8e3d in _0x481958){if(_0x4682bd===_0xfa8e3d+_0x481958[_0xfa8e3d]||_0x2d5e41===_0xfa8e3d+_0x481958[_0xfa8e3d]){var _0x1ad9b3='tr'+_0xe3dd4e[0x11]+'e';break;}_0x1ad9b3='f'+_0xe3dd4e[0x0]+'ls'+_0x27c878(_0xe3dd4e[0x1])+'';}_0x27c878=!0x1;-0x1<_0x8f194a[[_0xe3dd4e[0xc],'e',_0xe3dd4e[0x0],'rc',_0xe3dd4e[0x9]]['join']('')]['indexOf'](_0xead4('0x1f'))&&(_0x27c878=!0x0);return[_0x1ad9b3,_0x27c878];}(_0x51cc32);}(window);if(!eval(_0x17845c[0x0]))return _0x17845c[0x1]?_0x1e1bb5(_0xead4('0x20')):!0x1;_0x58167f['QD_dropDownCart']=function(_0x287afb,_0x3bd94b){var _0x43a3cb=_0x58167f(_0x287afb);if(!_0x43a3cb[_0xead4('0x8')])return _0x43a3cb;var _0x5c956a=_0x58167f[_0xead4('0x21')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0xead4('0x22'),'cartTotal':_0xead4('0x23'),'emptyCart':_0xead4('0x24'),'continueShopping':_0xead4('0x25'),'shippingForm':_0xead4('0x26')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x77cc33){return _0x77cc33[_0xead4('0x27')]||_0x77cc33[_0xead4('0x28')];},'callback':function(){},'callbackProductsList':function(){}},_0x3bd94b);_0x58167f('');var _0x576dd6=this;if(_0x5c956a[_0xead4('0x29')]){var _0x5a02db=!0x1;_0xead4('0x3')===typeof window[_0xead4('0x2a')]&&(_0x1e1bb5(_0xead4('0x2b')),_0x58167f['ajax']({'url':_0xead4('0x2c'),'async':!0x1,'dataType':'script','error':function(){_0x1e1bb5(_0xead4('0x2d'));_0x5a02db=!0x0;}}));if(_0x5a02db)return _0x1e1bb5(_0xead4('0x2e'));}if('object'===typeof window[_0xead4('0x2a')]&&'undefined'!==typeof window[_0xead4('0x2a')][_0xead4('0x2f')])var _0x17aa60=window[_0xead4('0x2a')][_0xead4('0x2f')];else if(_0xead4('0xf')===typeof vtex&&_0xead4('0xf')===typeof vtex[_0xead4('0x2f')]&&_0xead4('0x3')!==typeof vtex[_0xead4('0x2f')][_0xead4('0x30')])_0x17aa60=new vtex[(_0xead4('0x2f'))][(_0xead4('0x30'))]();else return _0x1e1bb5(_0xead4('0x31'));_0x576dd6[_0xead4('0x32')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x5d2370=function(_0x463257){_0x58167f(this)['append'](_0x463257);_0x463257['find'](_0xead4('0x33'))[_0xead4('0x34')](_0x58167f(_0xead4('0x35')))['on']('click.qd_ddc_closeFn',function(){_0x43a3cb[_0xead4('0x36')](_0xead4('0x37'));_0x58167f(document[_0xead4('0x38')])[_0xead4('0x36')](_0xead4('0x39'));});_0x58167f(document)[_0xead4('0x3a')](_0xead4('0x3b'))['on'](_0xead4('0x3b'),function(_0x4def42){0x1b==_0x4def42[_0xead4('0x3c')]&&(_0x43a3cb[_0xead4('0x36')]('qd-bb-lightBoxProdAdd'),_0x58167f(document[_0xead4('0x38')])['removeClass'](_0xead4('0x39')));});var _0x1b4110=_0x463257[_0xead4('0x3d')]('.qd-ddc-prodWrapper');_0x463257[_0xead4('0x3d')](_0xead4('0x3e'))['on'](_0xead4('0x3f'),function(){_0x576dd6['scrollCart']('-',void 0x0,void 0x0,_0x1b4110);return!0x1;});_0x463257[_0xead4('0x3d')](_0xead4('0x40'))['on'](_0xead4('0x41'),function(){_0x576dd6['scrollCart'](void 0x0,void 0x0,void 0x0,_0x1b4110);return!0x1;});_0x463257[_0xead4('0x3d')](_0xead4('0x42'))[_0xead4('0x43')]('')['on'](_0xead4('0x44'),function(){_0x576dd6[_0xead4('0x45')](_0x58167f(this));});if(_0x5c956a[_0xead4('0x46')]){var _0x3bd94b=0x0;_0x58167f(this)['on'](_0xead4('0x47'),function(){var _0x463257=function(){window[_0xead4('0x17')]['allowUpdate']&&(_0x576dd6[_0xead4('0x48')](),window['_QuatroDigital_DropDown'][_0xead4('0x49')]=!0x1,_0x58167f['fn'][_0xead4('0x4a')](!0x0),_0x576dd6[_0xead4('0x4b')]());};_0x3bd94b=setInterval(function(){_0x463257();},0x258);_0x463257();});_0x58167f(this)['on'](_0xead4('0x4c'),function(){clearInterval(_0x3bd94b);});}};var _0x54150f=function(_0x26a48b){_0x26a48b=_0x58167f(_0x26a48b);_0x5c956a[_0xead4('0x4d')]['cartTotal']=_0x5c956a[_0xead4('0x4d')][_0xead4('0x4e')][_0xead4('0x1')]('#value',_0xead4('0x4f'));_0x5c956a[_0xead4('0x4d')]['cartTotal']=_0x5c956a[_0xead4('0x4d')][_0xead4('0x4e')][_0xead4('0x1')]('#items',_0xead4('0x50'));_0x5c956a[_0xead4('0x4d')][_0xead4('0x4e')]=_0x5c956a[_0xead4('0x4d')][_0xead4('0x4e')][_0xead4('0x1')]('#shipping',_0xead4('0x51'));_0x5c956a['texts']['cartTotal']=_0x5c956a[_0xead4('0x4d')][_0xead4('0x4e')][_0xead4('0x1')](_0xead4('0x52'),_0xead4('0x53'));_0x26a48b['find'](_0xead4('0x54'))[_0xead4('0x55')](_0x5c956a[_0xead4('0x4d')][_0xead4('0x56')]);_0x26a48b[_0xead4('0x3d')](_0xead4('0x57'))['html'](_0x5c956a[_0xead4('0x4d')][_0xead4('0x58')]);_0x26a48b[_0xead4('0x3d')](_0xead4('0x59'))['html'](_0x5c956a[_0xead4('0x4d')]['linkCheckout']);_0x26a48b[_0xead4('0x3d')](_0xead4('0x5a'))[_0xead4('0x55')](_0x5c956a['texts'][_0xead4('0x4e')]);_0x26a48b[_0xead4('0x3d')](_0xead4('0x5b'))[_0xead4('0x55')](_0x5c956a[_0xead4('0x4d')][_0xead4('0x5c')]);_0x26a48b[_0xead4('0x3d')](_0xead4('0x5d'))['html'](_0x5c956a[_0xead4('0x4d')][_0xead4('0x5e')]);return _0x26a48b;}(this[_0xead4('0x32')]);var _0x3139cc=0x0;_0x43a3cb['each'](function(){0x0<_0x3139cc?_0x5d2370['call'](this,_0x54150f['clone']()):_0x5d2370[_0xead4('0x5f')](this,_0x54150f);_0x3139cc++;});window[_0xead4('0xa')][_0xead4('0xb')]['add'](function(){_0x58167f(_0xead4('0x60'))[_0xead4('0x55')](window[_0xead4('0xa')][_0xead4('0x61')]||'--');_0x58167f(_0xead4('0x62'))[_0xead4('0x55')](window[_0xead4('0xa')][_0xead4('0x63')]||'0');_0x58167f(_0xead4('0x64'))['html'](window[_0xead4('0xa')][_0xead4('0x65')]||'--');_0x58167f(_0xead4('0x66'))[_0xead4('0x55')](window['_QuatroDigital_CartData'][_0xead4('0x67')]||'--');});var _0x561d52=function(_0x2c0015,_0x3882f9){if(_0xead4('0x3')===typeof _0x2c0015[_0xead4('0x68')])return _0x1e1bb5('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x576dd6[_0xead4('0x69')][_0xead4('0x5f')](this,_0x3882f9);};_0x576dd6[_0xead4('0x48')]=function(_0xe9362f,_0x55f8f0){_0xead4('0x3')!=typeof _0x55f8f0?window[_0xead4('0x17')][_0xead4('0x6a')]=_0x55f8f0:window[_0xead4('0x17')]['dataOptionsCache']&&(_0x55f8f0=window[_0xead4('0x17')]['dataOptionsCache']);setTimeout(function(){window[_0xead4('0x17')][_0xead4('0x6a')]=void 0x0;},_0x5c956a[_0xead4('0x6b')]);_0x58167f(_0xead4('0x6c'))[_0xead4('0x36')](_0xead4('0x6d'));if(_0x5c956a[_0xead4('0x29')]){var _0x3bd94b=function(_0x544527){window[_0xead4('0x17')][_0xead4('0x6e')]=_0x544527;_0x561d52(_0x544527,_0x55f8f0);_0xead4('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0xead4('0xc')===typeof window[_0xead4('0x6f')][_0xead4('0x70')]&&window[_0xead4('0x6f')][_0xead4('0x70')]['call'](this);_0x58167f(_0xead4('0x6c'))[_0xead4('0x71')]('qd-ddc-prodLoaded');};'undefined'!==typeof window[_0xead4('0x17')][_0xead4('0x6e')]?(_0x3bd94b(window[_0xead4('0x17')][_0xead4('0x6e')]),_0xead4('0xc')===typeof _0xe9362f&&_0xe9362f(window[_0xead4('0x17')]['getOrderForm'])):_0x58167f[_0xead4('0x72')]([_0xead4('0x68'),_0xead4('0x73'),_0xead4('0x74')],{'done':function(_0x231608){_0x3bd94b[_0xead4('0x5f')](this,_0x231608);'function'===typeof _0xe9362f&&_0xe9362f(_0x231608);},'fail':function(_0xaabb97){_0x1e1bb5(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0xaabb97]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x576dd6['cartIsEmpty']=function(){var _0x482b51=_0x58167f(_0xead4('0x6c'));_0x482b51[_0xead4('0x3d')]('.qd-ddc-prodRow')[_0xead4('0x8')]?_0x482b51[_0xead4('0x36')](_0xead4('0x75')):_0x482b51[_0xead4('0x71')]('qd-ddc-noItems');};_0x576dd6[_0xead4('0x69')]=function(_0x1a887d){var _0x3bd94b=_0x58167f(_0xead4('0x76'));_0x3bd94b[_0xead4('0x77')]();_0x3bd94b[_0xead4('0x78')](function(){var _0x3bd94b=_0x58167f(this),_0x109e43,_0x287afb,_0x374fac=_0x58167f(''),_0x46de84;for(_0x46de84 in window[_0xead4('0x17')]['getOrderForm']['items'])if(_0xead4('0xf')===typeof window[_0xead4('0x17')][_0xead4('0x6e')][_0xead4('0x68')][_0x46de84]){var _0x103ee4=window[_0xead4('0x17')][_0xead4('0x6e')][_0xead4('0x68')][_0x46de84];var _0x52f3c6=_0x103ee4[_0xead4('0x79')]['replace'](/^\/|\/$/g,'')['split']('/');var _0x128d54=_0x58167f(_0xead4('0x7a'));_0x128d54['attr']({'data-sku':_0x103ee4['id'],'data-sku-index':_0x46de84,'data-qd-departament':_0x52f3c6[0x0],'data-qd-category':_0x52f3c6[_0x52f3c6[_0xead4('0x8')]-0x1]});_0x128d54[_0xead4('0x71')](_0xead4('0x7b')+_0x103ee4[_0xead4('0x7c')]);_0x128d54[_0xead4('0x3d')]('.qd-ddc-prodName')['append'](_0x5c956a[_0xead4('0x27')](_0x103ee4));_0x128d54['find'](_0xead4('0x7d'))['append'](isNaN(_0x103ee4[_0xead4('0x7e')])?_0x103ee4['sellingPrice']:0x0==_0x103ee4[_0xead4('0x7e')]?_0xead4('0x7f'):(_0x58167f(_0xead4('0x80'))[_0xead4('0x81')](_0xead4('0x82'))||'R$')+'\x20'+qd_number_format(_0x103ee4[_0xead4('0x7e')]/0x64,0x2,',','.'));_0x128d54[_0xead4('0x3d')](_0xead4('0x83'))[_0xead4('0x81')]({'data-sku':_0x103ee4['id'],'data-sku-index':_0x46de84})['val'](_0x103ee4[_0xead4('0x84')]);_0x128d54['find'](_0xead4('0x85'))[_0xead4('0x81')]({'data-sku':_0x103ee4['id'],'data-sku-index':_0x46de84});_0x576dd6[_0xead4('0x86')](_0x103ee4['id'],_0x128d54['find']('.qd-ddc-image'),_0x103ee4[_0xead4('0x87')]);_0x128d54[_0xead4('0x3d')](_0xead4('0x88'))[_0xead4('0x81')]({'data-sku':_0x103ee4['id'],'data-sku-index':_0x46de84});_0x128d54[_0xead4('0x89')](_0x3bd94b);_0x374fac=_0x374fac[_0xead4('0x34')](_0x128d54);}try{var _0x17aa60=_0x3bd94b['getParent'](_0xead4('0x6c'))[_0xead4('0x3d')](_0xead4('0x42'));_0x17aa60['length']&&''==_0x17aa60[_0xead4('0x43')]()&&window[_0xead4('0x17')]['getOrderForm'][_0xead4('0x74')]['address']&&_0x17aa60[_0xead4('0x43')](window[_0xead4('0x17')][_0xead4('0x6e')][_0xead4('0x74')][_0xead4('0x8a')][_0xead4('0x8b')]);}catch(_0x1a9f93){_0x1e1bb5('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x1a9f93[_0xead4('0x8c')],_0xead4('0x8d'));}_0x576dd6[_0xead4('0x8e')](_0x3bd94b);_0x576dd6[_0xead4('0x4b')]();_0x1a887d&&_0x1a887d[_0xead4('0x8f')]&&function(){_0x287afb=_0x374fac[_0xead4('0x90')]('[data-sku=\x27'+_0x1a887d[_0xead4('0x8f')]+'\x27]');_0x287afb[_0xead4('0x8')]&&(_0x109e43=0x0,_0x374fac['each'](function(){var _0x1a887d=_0x58167f(this);if(_0x1a887d['is'](_0x287afb))return!0x1;_0x109e43+=_0x1a887d[_0xead4('0x91')]();}),_0x576dd6['scrollCart'](void 0x0,void 0x0,_0x109e43,_0x3bd94b[_0xead4('0x34')](_0x3bd94b[_0xead4('0x92')]())),_0x374fac[_0xead4('0x36')]('qd-ddc-lastAddedFixed'),function(_0xa61f29){_0xa61f29['addClass'](_0xead4('0x93'));_0xa61f29['addClass'](_0xead4('0x94'));setTimeout(function(){_0xa61f29[_0xead4('0x36')](_0xead4('0x93'));},_0x5c956a['timeRemoveNewItemClass']);}(_0x287afb),_0x58167f(document[_0xead4('0x38')])[_0xead4('0x71')](_0xead4('0x95')),setTimeout(function(){_0x58167f(document[_0xead4('0x38')])[_0xead4('0x36')](_0xead4('0x95'));},_0x5c956a[_0xead4('0x6b')]));}();});(function(){_QuatroDigital_DropDown[_0xead4('0x6e')][_0xead4('0x68')][_0xead4('0x8')]?(_0x58167f('body')[_0xead4('0x36')](_0xead4('0x96'))['addClass']('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x58167f('body')[_0xead4('0x36')](_0xead4('0x97'));},_0x5c956a[_0xead4('0x6b')])):_0x58167f(_0xead4('0x38'))[_0xead4('0x36')]('qd-ddc-cart-rendered')['addClass'](_0xead4('0x96'));}());_0xead4('0xc')===typeof _0x5c956a[_0xead4('0x98')]?_0x5c956a[_0xead4('0x98')][_0xead4('0x5f')](this):_0x1e1bb5('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x576dd6['insertProdImg']=function(_0x3af25e,_0xb5f60,_0x2c95f7){function _0x95d38a(){_0xb5f60['removeClass'](_0xead4('0x99'))['load'](function(){_0x58167f(this)[_0xead4('0x71')]('qd-loaded');})[_0xead4('0x81')](_0xead4('0x9a'),_0x2c95f7);}_0x2c95f7?_0x95d38a():isNaN(_0x3af25e)?_0x1e1bb5(_0xead4('0x9b'),_0xead4('0x13')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x576dd6[_0xead4('0x8e')]=function(_0x399516){var _0x3bd94b=function(_0x562c03,_0x2c9553){var _0x1bf5ae=_0x58167f(_0x562c03);var _0x44b17b=_0x1bf5ae[_0xead4('0x81')]('data-sku');var _0x287afb=_0x1bf5ae[_0xead4('0x81')](_0xead4('0x9c'));if(_0x44b17b){var _0x2e9ea1=parseInt(_0x1bf5ae[_0xead4('0x43')]())||0x1;_0x576dd6[_0xead4('0x9d')]([_0x44b17b,_0x287afb],_0x2e9ea1,_0x2e9ea1+0x1,function(_0x21512d){_0x1bf5ae[_0xead4('0x43')](_0x21512d);_0xead4('0xc')===typeof _0x2c9553&&_0x2c9553();});}};var _0x53bebc=function(_0x3630fc,_0x51b574){var _0x12054b=_0x58167f(_0x3630fc);var _0x287afb=_0x12054b[_0xead4('0x81')](_0xead4('0x9e'));var _0x18d1ba=_0x12054b[_0xead4('0x81')](_0xead4('0x9c'));if(_0x287afb){var _0x1e3dde=parseInt(_0x12054b[_0xead4('0x43')]())||0x2;_0x576dd6['changeQantity']([_0x287afb,_0x18d1ba],_0x1e3dde,_0x1e3dde-0x1,function(_0x358ddc){_0x12054b['val'](_0x358ddc);'function'===typeof _0x51b574&&_0x51b574();});}};var _0x171929=function(_0x5c538b,_0x16bf55){var _0x3bd94b=_0x58167f(_0x5c538b);var _0x287afb=_0x3bd94b[_0xead4('0x81')](_0xead4('0x9e'));var _0x4885f=_0x3bd94b[_0xead4('0x81')](_0xead4('0x9c'));if(_0x287afb){var _0x504269=parseInt(_0x3bd94b['val']())||0x1;_0x576dd6[_0xead4('0x9d')]([_0x287afb,_0x4885f],0x1,_0x504269,function(_0x262f8d){_0x3bd94b[_0xead4('0x43')](_0x262f8d);_0xead4('0xc')===typeof _0x16bf55&&_0x16bf55();});}};var _0x287afb=_0x399516[_0xead4('0x3d')](_0xead4('0x9f'));_0x287afb[_0xead4('0x71')]('qd_on')[_0xead4('0x78')](function(){var _0x399516=_0x58167f(this);_0x399516['find'](_0xead4('0xa0'))['on'](_0xead4('0xa1'),function(_0x160579){_0x160579['preventDefault']();_0x287afb[_0xead4('0x71')](_0xead4('0xa2'));_0x3bd94b(_0x399516[_0xead4('0x3d')]('.qd-ddc-quantity'),function(){_0x287afb[_0xead4('0x36')]('qd-loading');});});_0x399516[_0xead4('0x3d')]('.qd-ddc-quantityMinus')['on'](_0xead4('0xa3'),function(_0x3e05d6){_0x3e05d6[_0xead4('0xa4')]();_0x287afb['addClass']('qd-loading');_0x53bebc(_0x399516[_0xead4('0x3d')](_0xead4('0x83')),function(){_0x287afb[_0xead4('0x36')](_0xead4('0xa2'));});});_0x399516[_0xead4('0x3d')](_0xead4('0x83'))['on'](_0xead4('0xa5'),function(){_0x287afb[_0xead4('0x71')]('qd-loading');_0x171929(this,function(){_0x287afb[_0xead4('0x36')](_0xead4('0xa2'));});});_0x399516[_0xead4('0x3d')](_0xead4('0x83'))['on'](_0xead4('0xa6'),function(_0xb063e){0xd==_0xb063e[_0xead4('0x3c')]&&(_0x287afb[_0xead4('0x71')](_0xead4('0xa2')),_0x171929(this,function(){_0x287afb[_0xead4('0x36')]('qd-loading');}));});});_0x399516[_0xead4('0x3d')]('.qd-ddc-prodRow')[_0xead4('0x78')](function(){var _0x399516=_0x58167f(this);_0x399516[_0xead4('0x3d')](_0xead4('0x85'))['on'](_0xead4('0xa7'),function(){_0x399516['addClass'](_0xead4('0xa2'));_0x576dd6[_0xead4('0xa8')](_0x58167f(this),function(_0x380aad){_0x380aad?_0x399516['stop'](!0x0)[_0xead4('0xa9')](function(){_0x399516[_0xead4('0xaa')]();_0x576dd6[_0xead4('0x4b')]();}):_0x399516[_0xead4('0x36')](_0xead4('0xa2'));});return!0x1;});});};_0x576dd6[_0xead4('0x45')]=function(_0x58475c){var _0x858f4d=_0x58475c[_0xead4('0x43')]();_0x858f4d=_0x858f4d[_0xead4('0x1')](/[^0-9\-]/g,'');_0x858f4d=_0x858f4d[_0xead4('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xead4('0xab'));_0x858f4d=_0x858f4d[_0xead4('0x1')](/(.{9}).*/g,'$1');_0x58475c['val'](_0x858f4d);0x9<=_0x858f4d['length']&&(_0x58475c['data']('qdDdcLastPostalCode')!=_0x858f4d&&_0x17aa60[_0xead4('0xac')]({'postalCode':_0x858f4d,'country':'BRA'})[_0xead4('0xad')](function(_0x2c43e0){window[_0xead4('0x17')][_0xead4('0x6e')]=_0x2c43e0;_0x576dd6['getCartInfoByUrl']();})[_0xead4('0xae')](function(_0x3a8987){_0x1e1bb5([_0xead4('0xaf'),_0x3a8987]);updateCartData();}),_0x58475c[_0xead4('0xb0')](_0xead4('0xb1'),_0x858f4d));};_0x576dd6[_0xead4('0x9d')]=function(_0x51072b,_0x35375e,_0x152f84,_0x32dd91){function _0x316455(_0x1f229f){_0x1f229f=_0xead4('0xb2')!==typeof _0x1f229f?!0x1:_0x1f229f;_0x576dd6[_0xead4('0x48')]();window['_QuatroDigital_DropDown'][_0xead4('0x49')]=!0x1;_0x576dd6['cartIsEmpty']();_0xead4('0x3')!==typeof window[_0xead4('0x6f')]&&_0xead4('0xc')===typeof window['_QuatroDigital_AmountProduct'][_0xead4('0x70')]&&window['_QuatroDigital_AmountProduct'][_0xead4('0x70')][_0xead4('0x5f')](this);_0xead4('0xc')===typeof adminCart&&adminCart();_0x58167f['fn']['simpleCart'](!0x0,void 0x0,_0x1f229f);_0xead4('0xc')===typeof _0x32dd91&&_0x32dd91(_0x35375e);}_0x152f84=_0x152f84||0x1;if(0x1>_0x152f84)return _0x35375e;if(_0x5c956a[_0xead4('0x29')]){if(_0xead4('0x3')===typeof window[_0xead4('0x17')][_0xead4('0x6e')][_0xead4('0x68')][_0x51072b[0x1]])return _0x1e1bb5(_0xead4('0xb3')+_0x51072b[0x1]+']'),_0x35375e;window[_0xead4('0x17')]['getOrderForm'][_0xead4('0x68')][_0x51072b[0x1]][_0xead4('0x84')]=_0x152f84;window[_0xead4('0x17')][_0xead4('0x6e')]['items'][_0x51072b[0x1]][_0xead4('0xb4')]=_0x51072b[0x1];_0x17aa60[_0xead4('0xb5')]([window[_0xead4('0x17')][_0xead4('0x6e')][_0xead4('0x68')][_0x51072b[0x1]]],[_0xead4('0x68'),_0xead4('0x73'),'shippingData'])[_0xead4('0xad')](function(_0x313b5a){window['_QuatroDigital_DropDown']['getOrderForm']=_0x313b5a;_0x316455(!0x0);})[_0xead4('0xae')](function(_0x26baee){_0x1e1bb5([_0xead4('0xb6'),_0x26baee]);_0x316455();});}else _0x1e1bb5(_0xead4('0xb7'));};_0x576dd6[_0xead4('0xa8')]=function(_0x5b5d84,_0x5dd00c){function _0x26f9a0(_0x40c910){_0x40c910='boolean'!==typeof _0x40c910?!0x1:_0x40c910;'undefined'!==typeof window[_0xead4('0x6f')]&&_0xead4('0xc')===typeof window[_0xead4('0x6f')]['exec']&&window[_0xead4('0x6f')][_0xead4('0x70')]['call'](this);'function'===typeof adminCart&&adminCart();_0x58167f['fn'][_0xead4('0x4a')](!0x0,void 0x0,_0x40c910);_0xead4('0xc')===typeof _0x5dd00c&&_0x5dd00c(_0x287afb);}var _0x287afb=!0x1,_0x23abb3=_0x58167f(_0x5b5d84)[_0xead4('0x81')]('data-sku-index');if(_0x5c956a['smartCheckout']){if(_0xead4('0x3')===typeof window[_0xead4('0x17')][_0xead4('0x6e')][_0xead4('0x68')][_0x23abb3])return _0x1e1bb5(_0xead4('0xb3')+_0x23abb3+']'),_0x287afb;window[_0xead4('0x17')][_0xead4('0x6e')]['items'][_0x23abb3]['index']=_0x23abb3;_0x17aa60[_0xead4('0xb8')]([window['_QuatroDigital_DropDown']['getOrderForm'][_0xead4('0x68')][_0x23abb3]],[_0xead4('0x68'),_0xead4('0x73'),'shippingData'])[_0xead4('0xad')](function(_0x6b5707){_0x287afb=!0x0;window['_QuatroDigital_DropDown']['getOrderForm']=_0x6b5707;_0x561d52(_0x6b5707);_0x26f9a0(!0x0);})['fail'](function(_0x44adc2){_0x1e1bb5([_0xead4('0xb9'),_0x44adc2]);_0x26f9a0();});}else alert(_0xead4('0xba'));};_0x576dd6[_0xead4('0xbb')]=function(_0x4ce662,_0x11e68c,_0x391bbf,_0x44c781){_0x44c781=_0x44c781||_0x58167f(_0xead4('0xbc'));_0x4ce662=_0x4ce662||'+';_0x11e68c=_0x11e68c||0.9*_0x44c781[_0xead4('0xbd')]();_0x44c781['stop'](!0x0,!0x0)[_0xead4('0xbe')]({'scrollTop':isNaN(_0x391bbf)?_0x4ce662+'='+_0x11e68c+'px':_0x391bbf});};_0x5c956a['updateOnlyHover']||(_0x576dd6[_0xead4('0x48')](),_0x58167f['fn'][_0xead4('0x4a')](!0x0));_0x58167f(window)['on'](_0xead4('0xbf'),function(){try{window[_0xead4('0x17')][_0xead4('0x6e')]=void 0x0,_0x576dd6['getCartInfoByUrl']();}catch(_0x2abbbb){_0x1e1bb5('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x2abbbb[_0xead4('0x8c')],_0xead4('0xc0'));}});_0xead4('0xc')===typeof _0x5c956a[_0xead4('0xb')]?_0x5c956a[_0xead4('0xb')][_0xead4('0x5f')](this):_0x1e1bb5(_0xead4('0xc1'));};_0x58167f['fn'][_0xead4('0x18')]=function(_0x2ec576){var _0x767d96=_0x58167f(this);_0x767d96['fn']=new _0x58167f[(_0xead4('0x18'))](this,_0x2ec576);return _0x767d96;};}catch(_0xd34e62){'undefined'!==typeof console&&_0xead4('0xc')===typeof console['error']&&console[_0xead4('0xd')](_0xead4('0xe'),_0xd34e62);}}(this));(function(_0x14ec9e){try{var _0x19f6ae=jQuery;window['_QuatroDigital_AmountProduct']=window[_0xead4('0x6f')]||{};window[_0xead4('0x6f')][_0xead4('0x68')]={};window['_QuatroDigital_AmountProduct'][_0xead4('0xc2')]=!0x1;window[_0xead4('0x6f')]['buyButtonClicked']=!0x1;window[_0xead4('0x6f')][_0xead4('0xc3')]=!0x1;var _0x28092e=function(){if(window[_0xead4('0x6f')]['allowRecalculate']){var _0x245aef=!0x1;var _0x40637a={};window[_0xead4('0x6f')][_0xead4('0x68')]={};for(_0x2bb403 in window[_0xead4('0x17')][_0xead4('0x6e')][_0xead4('0x68')])if('object'===typeof window[_0xead4('0x17')]['getOrderForm'][_0xead4('0x68')][_0x2bb403]){var _0xf1f86=window[_0xead4('0x17')][_0xead4('0x6e')]['items'][_0x2bb403];'undefined'!==typeof _0xf1f86['productId']&&null!==_0xf1f86[_0xead4('0xc4')]&&''!==_0xf1f86[_0xead4('0xc4')]&&(window[_0xead4('0x6f')]['items']['prod_'+_0xf1f86[_0xead4('0xc4')]]=window[_0xead4('0x6f')]['items'][_0xead4('0xc5')+_0xf1f86[_0xead4('0xc4')]]||{},window[_0xead4('0x6f')]['items'][_0xead4('0xc5')+_0xf1f86[_0xead4('0xc4')]]['prodId']=_0xf1f86[_0xead4('0xc4')],_0x40637a['prod_'+_0xf1f86[_0xead4('0xc4')]]||(window[_0xead4('0x6f')][_0xead4('0x68')][_0xead4('0xc5')+_0xf1f86[_0xead4('0xc4')]][_0xead4('0x63')]=0x0),window[_0xead4('0x6f')]['items']['prod_'+_0xf1f86['productId']]['qtt']+=_0xf1f86[_0xead4('0x84')],_0x245aef=!0x0,_0x40637a[_0xead4('0xc5')+_0xf1f86[_0xead4('0xc4')]]=!0x0);}var _0x2bb403=_0x245aef;}else _0x2bb403=void 0x0;window[_0xead4('0x6f')][_0xead4('0xc2')]&&(_0x19f6ae('.qd-bap-wrapper')[_0xead4('0xaa')](),_0x19f6ae(_0xead4('0xc6'))[_0xead4('0x36')](_0xead4('0xc7')));for(var _0x39e005 in window[_0xead4('0x6f')]['items']){_0xf1f86=window[_0xead4('0x6f')]['items'][_0x39e005];if(_0xead4('0xf')!==typeof _0xf1f86)return;_0x40637a=_0x19f6ae(_0xead4('0xc8')+_0xf1f86[_0xead4('0xc9')]+']')[_0xead4('0xca')]('li');if(window[_0xead4('0x6f')]['allowRecalculate']||!_0x40637a[_0xead4('0x3d')](_0xead4('0xcb'))[_0xead4('0x8')])_0x245aef=_0x19f6ae(_0xead4('0xcc')),_0x245aef[_0xead4('0x3d')](_0xead4('0xcd'))[_0xead4('0x55')](_0xf1f86[_0xead4('0x63')]),_0xf1f86=_0x40637a['find'](_0xead4('0xce')),_0xf1f86['length']?_0xf1f86[_0xead4('0xcf')](_0x245aef)['addClass']('qd-bap-item-added'):_0x40637a['prepend'](_0x245aef);}_0x2bb403&&(window['_QuatroDigital_AmountProduct'][_0xead4('0xc2')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0xead4('0x70')]=function(){window[_0xead4('0x6f')][_0xead4('0xc2')]=!0x0;_0x28092e[_0xead4('0x5f')](this);};_0x19f6ae(document)[_0xead4('0xd0')](function(){_0x28092e['call'](this);});}catch(_0x5860b3){_0xead4('0x3')!==typeof console&&'function'===typeof console[_0xead4('0xd')]&&console[_0xead4('0xd')](_0xead4('0xe'),_0x5860b3);}}(this));(function(){try{var _0x1a3d13=jQuery,_0x17ebe8,_0xf2f526={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x1a3d13[_0xead4('0xd1')]=function(_0x4cb83){var _0x19285d={};_0x17ebe8=_0x1a3d13[_0xead4('0x21')](!0x0,{},_0xf2f526,_0x4cb83);_0x4cb83=_0x1a3d13(_0x17ebe8[_0xead4('0xd2')])['QD_dropDownCart'](_0x17ebe8[_0xead4('0xd3')]);_0x19285d['buyButton']=_0xead4('0x3')!==typeof _0x17ebe8['dropDown'][_0xead4('0x46')]&&!0x1===_0x17ebe8['dropDown'][_0xead4('0x46')]?_0x1a3d13(_0x17ebe8[_0xead4('0xd2')])[_0xead4('0xd4')](_0x4cb83['fn'],_0x17ebe8[_0xead4('0xd5')]):_0x1a3d13(_0x17ebe8[_0xead4('0xd2')])[_0xead4('0xd4')](_0x17ebe8['buyButton']);_0x19285d['dropDown']=_0x4cb83;return _0x19285d;};_0x1a3d13['fn'][_0xead4('0xd6')]=function(){_0xead4('0xf')===typeof console&&_0xead4('0xc')===typeof console['info']&&console[_0xead4('0x10')](_0xead4('0xd7'));};_0x1a3d13[_0xead4('0xd6')]=_0x1a3d13['fn'][_0xead4('0xd6')];}catch(_0x1bd767){_0xead4('0x3')!==typeof console&&_0xead4('0xc')===typeof console[_0xead4('0xd')]&&console[_0xead4('0xd')]('Oooops!\x20',_0x1bd767);}}());

/* Quatro Digital Smart Cart */
/*! jQuery Validation Plugin - v1.12.0 - 4/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(a)).hide())},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",b).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=d.attr("type");return"radio"===e||"checkbox"===e?a("input[name='"+d.attr("name")+"']:checked").val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c[0].toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d=this.errorsFor(b);d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),d.html(c)):(d=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(b)).addClass(this.settings.errorClass).html(c||""),this.settings.wrapper&&(d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b))),!c&&this.settings.success&&(d.text(""),"string"==typeof this.settings.success?d.addClass(this.settings.success):this.settings.success(d,b)),this.toShow=this.toShow.add(d)},errorsFor:function(b){var c=this.idOrName(b);return this.errors().filter(function(){return a(this).attr("for")===c})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name).not(this.settings.ignore)[0]),a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c[0].toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(b.min&&b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),b.minlength&&b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."}}(jQuery),function(a){var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})}(jQuery),function(a){a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})}(jQuery);

// Customização do jQUery validate
$.validator.addMethod("cpf", function(value, element) {
	function valida_cpf(cpf){
		if(cpf.length < 11)
			return false;

		var numeros, digitos, soma, i, resultado;
		numeros = cpf.substring(0,9);
		digitos = cpf.substring(9);
		soma = 0;
		for (i = 10; i > 1; i--)
			soma += numeros.charAt(10 - i) * i;
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0))
			return false;
		numeros = cpf.substring(0,10);
		soma = 0;
		for (i = 11; i > 1; i--)
			soma += numeros.charAt(11 - i) * i;
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(1))
			return false;
		return true;
	};
    return valida_cpf(value.replace(/[^0-9]/gi, ""));
}, "Informe um CPF válido.");

var _0xaba0=['not','.qd_sp_processedItem','.qd_productPrice:not(.qd_sp_processedItem)','style','display:none\x20!important;','after','extend','boolean','body','prototype','trim','replace','abs','undefined','toFixed','round','split','length','join','QD_SmartPrice','Smart\x20Price','object','error','info','function','warn','unshift','alerta','toLowerCase','apply','text','match','.flag','[class*=\x27desconto\x27]','auto','.productRightColumn','strong.skuBestPrice','label.skuBestInstallmentValue','strong.skuPrice','yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','closest','wrapperElement','filterFlagBy','isProductPage','find','qd-active','addClass','qd-sp-active','.qd_sp_on,\x20.qd_sp_ignored','skuBestPrice','removeClass','siblings','qd_sp_ignored','isDiscountFlag','attr','skus','sku','bestPrice','isSmartCheckout','available','getDiscountValue','.qd_productPrice','val','Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(','appliedDiscount','listPrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','append','.qd_saveAmountPercent','prepend','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','call','forcePromotion'];(function(_0x244e85,_0x9a8dd7){var _0x55b122=function(_0x26543c){while(--_0x26543c){_0x244e85['push'](_0x244e85['shift']());}};_0x55b122(++_0x9a8dd7);}(_0xaba0,0x65));var _0x0aba=function(_0x4cf98e,_0xba4b79){_0x4cf98e=_0x4cf98e-0x0;var _0x1623ac=_0xaba0[_0x4cf98e];return _0x1623ac;};'function'!==typeof String[_0x0aba('0x0')][_0x0aba('0x1')]&&(String[_0x0aba('0x0')][_0x0aba('0x1')]=function(){return this[_0x0aba('0x2')](/^\s+|\s+$/g,'');});function qd_number_format(_0x35fd39,_0x52aea9,_0xd83c8c,_0x33232f){_0x35fd39=(_0x35fd39+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x35fd39=isFinite(+_0x35fd39)?+_0x35fd39:0x0;_0x52aea9=isFinite(+_0x52aea9)?Math[_0x0aba('0x3')](_0x52aea9):0x0;_0x33232f=_0x0aba('0x4')===typeof _0x33232f?',':_0x33232f;_0xd83c8c=_0x0aba('0x4')===typeof _0xd83c8c?'.':_0xd83c8c;var _0x1bfb38='',_0x1bfb38=function(_0x2bdabf,_0x47035a){var _0x52aea9=Math['pow'](0xa,_0x47035a);return''+(Math['round'](_0x2bdabf*_0x52aea9)/_0x52aea9)[_0x0aba('0x5')](_0x47035a);},_0x1bfb38=(_0x52aea9?_0x1bfb38(_0x35fd39,_0x52aea9):''+Math[_0x0aba('0x6')](_0x35fd39))[_0x0aba('0x7')]('.');0x3<_0x1bfb38[0x0][_0x0aba('0x8')]&&(_0x1bfb38[0x0]=_0x1bfb38[0x0][_0x0aba('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x33232f));(_0x1bfb38[0x1]||'')[_0x0aba('0x8')]<_0x52aea9&&(_0x1bfb38[0x1]=_0x1bfb38[0x1]||'',_0x1bfb38[0x1]+=Array(_0x52aea9-_0x1bfb38[0x1]['length']+0x1)[_0x0aba('0x9')]('0'));return _0x1bfb38[_0x0aba('0x9')](_0xd83c8c);};(function(_0x808e03){'use strict';var _0x47f1a0=jQuery;if(typeof _0x47f1a0['fn'][_0x0aba('0xa')]==='function')return;var _0x387961=_0x0aba('0xb');var _0x14b612=function(_0x57b6df,_0x28dcf3){if(_0x0aba('0xc')===typeof console&&'function'===typeof console[_0x0aba('0xd')]&&'function'===typeof console[_0x0aba('0xe')]&&_0x0aba('0xf')===typeof console[_0x0aba('0x10')]){var _0x303614;_0x0aba('0xc')===typeof _0x57b6df?(_0x57b6df[_0x0aba('0x11')]('['+_0x387961+']\x0a'),_0x303614=_0x57b6df):_0x303614=['['+_0x387961+']\x0a'+_0x57b6df];if('undefined'===typeof _0x28dcf3||_0x0aba('0x12')!==_0x28dcf3[_0x0aba('0x13')]()&&'aviso'!==_0x28dcf3['toLowerCase']())if('undefined'!==typeof _0x28dcf3&&'info'===_0x28dcf3[_0x0aba('0x13')]())try{console[_0x0aba('0xe')]['apply'](console,_0x303614);}catch(_0x2113db){console['info'](_0x303614['join']('\x0a'));}else try{console['error'][_0x0aba('0x14')](console,_0x303614);}catch(_0x81fe76){console[_0x0aba('0xd')](_0x303614[_0x0aba('0x9')]('\x0a'));}else try{console[_0x0aba('0x10')][_0x0aba('0x14')](console,_0x303614);}catch(_0x88e8e1){console['warn'](_0x303614[_0x0aba('0x9')]('\x0a'));}}};var _0x1bfd5f=/[0-9]+\%/i;var _0x448e13=/[0-9\.]+(?=\%)/i;var _0x4071f5={'isDiscountFlag':function(_0x8bd47){if(_0x8bd47['text']()['search'](_0x1bfd5f)>-0x1)return!![];return![];},'getDiscountValue':function(_0x448181){return _0x448181[_0x0aba('0x15')]()[_0x0aba('0x16')](_0x448e13);},'startedByWrapper':![],'flagElement':_0x0aba('0x17'),'wrapperElement':'li','filterFlagBy':_0x0aba('0x18'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0x0aba('0x19'),'wrapperElement':_0x0aba('0x1a'),'skuBestPrice':_0x0aba('0x1b'),'installments':'label.skuBestInstallmentNumber','installmentValue':_0x0aba('0x1c'),'skuPrice':_0x0aba('0x1d')}};_0x47f1a0['fn']['QD_SmartPrice']=function(){};var _0x41716f=function(_0x14cc7e){var _0x527244={'r':_0x0aba('0x1e')};return function(_0xe20801){var _0x27c639,_0x284d94,_0x5d4423,_0x2bba7e;_0x284d94=function(_0x23b1fd){return _0x23b1fd;};_0x5d4423=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xe20801=_0xe20801['d'+_0x5d4423[0x10]+'c'+_0x5d4423[0x11]+'m'+_0x284d94(_0x5d4423[0x1])+'n'+_0x5d4423[0xd]]['l'+_0x5d4423[0x12]+'c'+_0x5d4423[0x0]+'ti'+_0x284d94('o')+'n'];_0x27c639=function(_0x45c307){return escape(encodeURIComponent(_0x45c307['replace'](/\./g,'¨')[_0x0aba('0x2')](/[a-zA-Z]/g,function(_0x58691f){return String[_0x0aba('0x1f')](('Z'>=_0x58691f?0x5a:0x7a)>=(_0x58691f=_0x58691f[_0x0aba('0x20')](0x0)+0xd)?_0x58691f:_0x58691f-0x1a);})));};var _0xa5592a=_0x27c639(_0xe20801[[_0x5d4423[0x9],_0x284d94('o'),_0x5d4423[0xc],_0x5d4423[_0x284d94(0xd)]][_0x0aba('0x9')]('')]);_0x27c639=_0x27c639((window[['js',_0x284d94('no'),'m',_0x5d4423[0x1],_0x5d4423[0x4][_0x0aba('0x21')](),'ite'][_0x0aba('0x9')]('')]||'---')+['.v',_0x5d4423[0xd],'e',_0x284d94('x'),'co',_0x284d94('mm'),'erc',_0x5d4423[0x1],'.c',_0x284d94('o'),'m.',_0x5d4423[0x13],'r'][_0x0aba('0x9')](''));for(var _0x560bd7 in _0x527244){if(_0x27c639===_0x560bd7+_0x527244[_0x560bd7]||_0xa5592a===_0x560bd7+_0x527244[_0x560bd7]){_0x2bba7e='tr'+_0x5d4423[0x11]+'e';break;}_0x2bba7e='f'+_0x5d4423[0x0]+'ls'+_0x284d94(_0x5d4423[0x1])+'';}_0x284d94=!0x1;-0x1<_0xe20801[[_0x5d4423[0xc],'e',_0x5d4423[0x0],'rc',_0x5d4423[0x9]][_0x0aba('0x9')]('')][_0x0aba('0x22')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x284d94=!0x0);return[_0x2bba7e,_0x284d94];}(_0x14cc7e);}(window);if(!eval(_0x41716f[0x0]))return _0x41716f[0x1]?_0x14b612(_0x0aba('0x23')):!0x1;var _0x566b7c=function(_0x4d2d9d,_0x15e66c){'use strict';var _0xafb816=function(_0x157236){'use strict';var _0x1bbbd1,_0x10b365,_0x293610,_0x233ed5,_0x1d2937,_0x4f5665,_0x2a7399,_0x28f68a,_0x90bdf5,_0x2dcbd7,_0x49a88b,_0x1ccaf9,_0x34d260,_0x31ef36,_0x9d2e3c,_0x33d13c,_0x3da4d8,_0x591c93,_0x3b9075;var _0x18ac6b=_0x47f1a0(this);_0x157236=typeof _0x157236===_0x0aba('0x4')?![]:_0x157236;if(_0x15e66c[_0x0aba('0x24')]['isProductPage'])var _0x44388c=_0x18ac6b[_0x0aba('0x25')](_0x15e66c[_0x0aba('0x24')][_0x0aba('0x26')]);else var _0x44388c=_0x18ac6b[_0x0aba('0x25')](_0x15e66c[_0x0aba('0x26')]);if(!_0x157236&&!_0x18ac6b['is'](_0x15e66c[_0x0aba('0x27')])){if(_0x15e66c['productPage'][_0x0aba('0x28')]&&_0x44388c['is'](_0x15e66c[_0x0aba('0x24')][_0x0aba('0x26')])){_0x44388c[_0x0aba('0x29')](_0x15e66c[_0x0aba('0x24')]['skuBestPrice'])['addClass'](_0x0aba('0x2a'));_0x44388c[_0x0aba('0x2b')](_0x0aba('0x2c'));}return;}var _0x5ba2af=_0x15e66c[_0x0aba('0x24')][_0x0aba('0x28')];if(_0x18ac6b['is'](_0x0aba('0x2d'))&&!_0x5ba2af)return;if(_0x5ba2af){_0x28f68a=_0x44388c[_0x0aba('0x29')](_0x15e66c[_0x0aba('0x24')][_0x0aba('0x2e')]);if(_0x28f68a['find']('.qd_active')[_0x0aba('0x8')])return;_0x28f68a['removeClass'](_0x0aba('0x2a'));_0x44388c[_0x0aba('0x2f')](_0x0aba('0x2c'));}if(_0x15e66c['oneFlagByItem']&&_0x18ac6b[_0x0aba('0x30')]('.qd_sp_on')['length']){_0x18ac6b['addClass'](_0x0aba('0x31'));return;}_0x18ac6b[_0x0aba('0x2b')]('qd_sp_on');if(!_0x15e66c[_0x0aba('0x32')](_0x18ac6b))return;if(_0x5ba2af){_0x293610={};var _0x105ae3=parseInt(_0x47f1a0('div[skuCorrente]:first')[_0x0aba('0x33')]('skuCorrente'),0xa);if(_0x105ae3){for(var _0x378d73=0x0;_0x378d73<skuJson[_0x0aba('0x34')][_0x0aba('0x8')];_0x378d73++){if(skuJson[_0x0aba('0x34')][_0x378d73][_0x0aba('0x35')]==_0x105ae3){_0x293610=skuJson[_0x0aba('0x34')][_0x378d73];break;}}}else{var _0x1b0c35=0x5af3107a3fff;for(var _0x5ce434 in skuJson[_0x0aba('0x34')]){if(typeof skuJson[_0x0aba('0x34')][_0x5ce434]===_0x0aba('0xf'))continue;if(!skuJson[_0x0aba('0x34')][_0x5ce434]['available'])continue;if(skuJson['skus'][_0x5ce434][_0x0aba('0x36')]<_0x1b0c35){_0x1b0c35=skuJson[_0x0aba('0x34')][_0x5ce434]['bestPrice'];_0x293610=skuJson[_0x0aba('0x34')][_0x5ce434];}}}}_0x33d13c=!![];_0x3da4d8=0x0;if(_0x15e66c[_0x0aba('0x37')]&&_0x591c93){_0x33d13c=skuJson[_0x0aba('0x38')];if(!_0x33d13c)return _0x44388c['addClass']('qd-sp-product-unavailable');}_0x10b365=_0x15e66c[_0x0aba('0x39')](_0x18ac6b);_0x1bbbd1=parseFloat(_0x10b365,0xa);if(isNaN(_0x1bbbd1))return _0x14b612(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x18ac6b],'alerta');var _0x5db805=function(_0x5ad60a){if(_0x5ba2af)_0x233ed5=(_0x5ad60a[_0x0aba('0x36')]||0x0)/0x64;else{_0x34d260=_0x44388c[_0x0aba('0x29')](_0x0aba('0x3a'));_0x233ed5=parseFloat((_0x34d260[_0x0aba('0x3b')]()||'')[_0x0aba('0x2')](/[^0-9\.\,]+/i,'')[_0x0aba('0x2')]('.','')['replace'](',','.'),0xa);}if(isNaN(_0x233ed5))return _0x14b612([_0x0aba('0x3c'),_0x18ac6b,_0x44388c]);if(_0x15e66c[_0x0aba('0x3d')]!==null){_0x31ef36=0x0;if(!isNaN(_0x15e66c[_0x0aba('0x3d')]))_0x31ef36=_0x15e66c[_0x0aba('0x3d')];else{_0x9d2e3c=_0x44388c[_0x0aba('0x29')](_0x15e66c[_0x0aba('0x3d')]);if(_0x9d2e3c[_0x0aba('0x8')])_0x31ef36=_0x15e66c['getDiscountValue'](_0x9d2e3c);}_0x31ef36=parseFloat(_0x31ef36,0xa);if(isNaN(_0x31ef36))_0x31ef36=0x0;if(_0x31ef36!==0x0)_0x233ed5=_0x233ed5*0x64/(0x64-_0x31ef36);}if(_0x5ba2af)_0x1d2937=(_0x5ad60a[_0x0aba('0x3e')]||0x0)/0x64;else _0x1d2937=parseFloat((_0x44388c[_0x0aba('0x29')]('.qd_productOldPrice')['val']()||'')[_0x0aba('0x2')](/[^0-9\.\,]+/i,'')[_0x0aba('0x2')]('.','')[_0x0aba('0x2')](',','.'),0xa);if(isNaN(_0x1d2937))_0x1d2937=0.001;_0x4f5665=_0x233ed5*((0x64-_0x1bbbd1)/0x64);if(_0x5ba2af&&_0x15e66c[_0x0aba('0x24')]['changeNativePrice']){_0x28f68a[_0x0aba('0x15')](_0x28f68a[_0x0aba('0x15')]()['trim']()[_0x0aba('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x4f5665,0x2,',','.')))['addClass'](_0x0aba('0x2a'));_0x44388c[_0x0aba('0x2b')](_0x0aba('0x2c'));}else{_0x3b9075=_0x44388c[_0x0aba('0x29')](_0x0aba('0x3f'));_0x3b9075[_0x0aba('0x15')](_0x3b9075['text']()[_0x0aba('0x2')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x4f5665,0x2,',','.'));}if(_0x5ba2af){_0x2a7399=_0x44388c[_0x0aba('0x29')](_0x15e66c[_0x0aba('0x24')][_0x0aba('0x40')]);if(_0x2a7399[_0x0aba('0x8')])_0x2a7399['text'](_0x2a7399['text']()[_0x0aba('0x1')]()[_0x0aba('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x4f5665,0x2,',','.')));}var _0x1c2f1c=_0x44388c[_0x0aba('0x29')](_0x0aba('0x41'));_0x1c2f1c[_0x0aba('0x15')](_0x1c2f1c[_0x0aba('0x15')]()[_0x0aba('0x2')](/[0-9]+\%/i,_0x1bbbd1+'%'));var _0x1ca11c=function(_0x476474,_0x56235b,_0x314c07){var _0xace039=_0x44388c[_0x0aba('0x29')](_0x476474);if(_0xace039[_0x0aba('0x8')])_0xace039[_0x0aba('0x42')](_0xace039[_0x0aba('0x42')]()['trim']()[_0x0aba('0x2')](/[0-9]{1,2}/,_0x314c07?_0x314c07:_0x5ad60a[_0x0aba('0x43')]||0x0));var _0x22b882=_0x44388c[_0x0aba('0x29')](_0x56235b);if(_0x22b882[_0x0aba('0x8')])_0x22b882['html'](_0x22b882[_0x0aba('0x42')]()['trim']()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x4f5665/(_0x314c07?_0x314c07:_0x5ad60a['installments']||0x1),0x2,',','.')));};if(_0x5ba2af&&_0x15e66c[_0x0aba('0x24')][_0x0aba('0x44')])_0x1ca11c(_0x15e66c['productPage'][_0x0aba('0x43')],_0x15e66c[_0x0aba('0x24')]['installmentValue']);else if(_0x15e66c[_0x0aba('0x44')])_0x1ca11c(_0x0aba('0x45'),_0x0aba('0x46'),parseInt(_0x44388c['find'](_0x0aba('0x47'))[_0x0aba('0x3b')]()||0x1)||0x1);_0x44388c[_0x0aba('0x29')](_0x0aba('0x48'))[_0x0aba('0x49')](qd_number_format(_0x1d2937-_0x4f5665,0x2,',','.'));_0x44388c['find'](_0x0aba('0x4a'))[_0x0aba('0x4b')](qd_number_format((_0x1d2937-_0x4f5665)*0x64/_0x1d2937,0x2,',','.'));if(_0x5ba2af&&_0x15e66c[_0x0aba('0x24')]['changeNativeSaveAmount']){_0x47f1a0('em.economia-de')[_0x0aba('0x4c')](function(){_0x49a88b=_0x47f1a0(this);_0x49a88b['text'](_0x49a88b[_0x0aba('0x15')]()[_0x0aba('0x1')]()[_0x0aba('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x1d2937-_0x4f5665,0x2,',','.')));_0x49a88b[_0x0aba('0x2b')](_0x0aba('0x2a'));});}};_0x5db805(_0x293610);if(_0x5ba2af)_0x47f1a0(window)['on'](_0x0aba('0x4d'),function(_0x285949,_0x26ea80,_0x1135fa){_0x5db805(_0x1135fa);});_0x44388c['addClass']('qd_sp_processedItem');if(!_0x5ba2af)_0x34d260['addClass'](_0x0aba('0x4e'));};(_0x15e66c[_0x0aba('0x4f')]?_0x4d2d9d[_0x0aba('0x29')](_0x15e66c[_0x0aba('0x50')]):_0x4d2d9d)[_0x0aba('0x4c')](function(){_0xafb816[_0x0aba('0x51')](this,![]);});if(typeof _0x15e66c[_0x0aba('0x52')]=='string'){var _0x2bb949=_0x15e66c['startedByWrapper']?_0x4d2d9d:_0x4d2d9d[_0x0aba('0x25')](_0x15e66c[_0x0aba('0x26')]);if(_0x15e66c['productPage'][_0x0aba('0x28')])_0x2bb949=_0x2bb949[_0x0aba('0x25')](_0x15e66c[_0x0aba('0x24')][_0x0aba('0x26')])[_0x0aba('0x53')](_0x0aba('0x54'));else _0x2bb949=_0x2bb949[_0x0aba('0x29')](_0x0aba('0x55'));_0x2bb949[_0x0aba('0x4c')](function(){var _0x162322=_0x47f1a0(_0x15e66c[_0x0aba('0x52')]);_0x162322['attr'](_0x0aba('0x56'),_0x0aba('0x57'));if(_0x15e66c[_0x0aba('0x24')][_0x0aba('0x28')])_0x47f1a0(this)[_0x0aba('0x49')](_0x162322);else _0x47f1a0(this)[_0x0aba('0x58')](_0x162322);_0xafb816['call'](_0x162322,!![]);});}};_0x47f1a0['fn'][_0x0aba('0xa')]=function(_0x2f760e){var _0x34dabc=_0x47f1a0(this);if(!_0x34dabc[_0x0aba('0x8')])return _0x34dabc;var _0x3b8923=_0x47f1a0[_0x0aba('0x59')](!![],{},_0x4071f5,_0x2f760e);if(typeof _0x3b8923['productPage'][_0x0aba('0x28')]!=_0x0aba('0x5a'))_0x3b8923['productPage'][_0x0aba('0x28')]=_0x47f1a0(document[_0x0aba('0x5b')])['is']('.produto');_0x566b7c(_0x34dabc,_0x3b8923);return _0x34dabc;};}(this));
