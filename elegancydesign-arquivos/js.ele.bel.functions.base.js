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
			// Product.testVideo();
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
		testVideo: function() {
			$('table.Especificacoes tbody').append('<tr><th class="name-field Video">Videos</th><td class="value-field Videos">https://www.youtube.com/watch?v=YvIe5tgo4Ag</td></tr>');
		},
		applySmartPrice: function() {
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
var _0x4c02=['warn','each','addClass','last','yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','first','text','replaceSpecialChars','>li','qdAmAddNdx','qd-amazing-menu','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','extend','exec','.qd_amazing_menu_auto','getParent','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','info','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','join','error','apply'];(function(_0x53312b,_0x364aa6){var _0x40eae0=function(_0x456ceb){while(--_0x456ceb){_0x53312b['push'](_0x53312b['shift']());}};_0x40eae0(++_0x364aa6);}(_0x4c02,0x8a));var _0x24c0=function(_0x447e44,_0x5dc95b){_0x447e44=_0x447e44-0x0;var _0x37438e=_0x4c02[_0x447e44];return _0x37438e;};(function(_0x4371b2){_0x4371b2['fn'][_0x24c0('0x0')]=_0x4371b2['fn']['closest'];}(jQuery));(function(_0xae2a7e){var _0x2178c4;var _0x185add=jQuery;if(_0x24c0('0x1')!==typeof _0x185add['fn'][_0x24c0('0x2')]){var _0x35351d={'url':_0x24c0('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x55db65=function(_0xadaa3f,_0x4b7723){if(_0x24c0('0x4')===typeof console&&_0x24c0('0x5')!==typeof console['error']&&_0x24c0('0x5')!==typeof console[_0x24c0('0x6')]&&_0x24c0('0x5')!==typeof console['warn']){var _0x38a274;'object'===typeof _0xadaa3f?(_0xadaa3f[_0x24c0('0x7')](_0x24c0('0x8')),_0x38a274=_0xadaa3f):_0x38a274=[_0x24c0('0x8')+_0xadaa3f];if('undefined'===typeof _0x4b7723||_0x24c0('0x9')!==_0x4b7723['toLowerCase']()&&'aviso'!==_0x4b7723[_0x24c0('0xa')]())if('undefined'!==typeof _0x4b7723&&'info'===_0x4b7723['toLowerCase']())try{console[_0x24c0('0x6')]['apply'](console,_0x38a274);}catch(_0x55a429){try{console[_0x24c0('0x6')](_0x38a274[_0x24c0('0xb')]('\x0a'));}catch(_0x50ef16){}}else try{console[_0x24c0('0xc')]['apply'](console,_0x38a274);}catch(_0x149fd8){try{console[_0x24c0('0xc')](_0x38a274[_0x24c0('0xb')]('\x0a'));}catch(_0x348cd9){}}else try{console['warn'][_0x24c0('0xd')](console,_0x38a274);}catch(_0x54e400){try{console[_0x24c0('0xe')](_0x38a274[_0x24c0('0xb')]('\x0a'));}catch(_0x1d18c8){}}}};_0x185add['fn']['qdAmAddNdx']=function(){var _0x5b5c01=_0x185add(this);_0x5b5c01[_0x24c0('0xf')](function(_0x3b9d4f){_0x185add(this)[_0x24c0('0x10')]('qd-am-li-'+_0x3b9d4f);});_0x5b5c01['first']()['addClass']('qd-am-first');_0x5b5c01[_0x24c0('0x11')]()[_0x24c0('0x10')]('qd-am-last');return _0x5b5c01;};_0x185add['fn']['QD_amazingMenu']=function(){};_0xae2a7e=function(_0x3b09e1){var _0x47b561={'r':_0x24c0('0x12')};return function(_0x12372e){var _0x52e091=function(_0x5ec8f7){return _0x5ec8f7;};var _0x870081=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x12372e=_0x12372e['d'+_0x870081[0x10]+'c'+_0x870081[0x11]+'m'+_0x52e091(_0x870081[0x1])+'n'+_0x870081[0xd]]['l'+_0x870081[0x12]+'c'+_0x870081[0x0]+'ti'+_0x52e091('o')+'n'];var _0x5e0e54=function(_0x90e84){return escape(encodeURIComponent(_0x90e84[_0x24c0('0x13')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x8b16b){return String[_0x24c0('0x14')](('Z'>=_0x8b16b?0x5a:0x7a)>=(_0x8b16b=_0x8b16b[_0x24c0('0x15')](0x0)+0xd)?_0x8b16b:_0x8b16b-0x1a);})));};var _0x20df1c=_0x5e0e54(_0x12372e[[_0x870081[0x9],_0x52e091('o'),_0x870081[0xc],_0x870081[_0x52e091(0xd)]]['join']('')]);_0x5e0e54=_0x5e0e54((window[['js',_0x52e091('no'),'m',_0x870081[0x1],_0x870081[0x4]['toUpperCase'](),_0x24c0('0x16')][_0x24c0('0xb')]('')]||_0x24c0('0x17'))+['.v',_0x870081[0xd],'e',_0x52e091('x'),'co',_0x52e091('mm'),_0x24c0('0x18'),_0x870081[0x1],'.c',_0x52e091('o'),'m.',_0x870081[0x13],'r'][_0x24c0('0xb')](''));for(var _0x102c93 in _0x47b561){if(_0x5e0e54===_0x102c93+_0x47b561[_0x102c93]||_0x20df1c===_0x102c93+_0x47b561[_0x102c93]){var _0x599582='tr'+_0x870081[0x11]+'e';break;}_0x599582='f'+_0x870081[0x0]+'ls'+_0x52e091(_0x870081[0x1])+'';}_0x52e091=!0x1;-0x1<_0x12372e[[_0x870081[0xc],'e',_0x870081[0x0],'rc',_0x870081[0x9]][_0x24c0('0xb')]('')][_0x24c0('0x19')](_0x24c0('0x1a'))&&(_0x52e091=!0x0);return[_0x599582,_0x52e091];}(_0x3b09e1);}(window);if(!eval(_0xae2a7e[0x0]))return _0xae2a7e[0x1]?_0x55db65(_0x24c0('0x1b')):!0x1;var _0x26a69d=function(_0x4d4d48){var _0x1c5ff7=_0x4d4d48[_0x24c0('0x1c')](_0x24c0('0x1d'));var _0x1514f6=_0x1c5ff7[_0x24c0('0x1e')](_0x24c0('0x1f'));var _0x11a139=_0x1c5ff7['filter'](_0x24c0('0x20'));if(_0x1514f6[_0x24c0('0x21')]||_0x11a139[_0x24c0('0x21')])_0x1514f6[_0x24c0('0x22')]()['addClass'](_0x24c0('0x23')),_0x11a139[_0x24c0('0x22')]()[_0x24c0('0x10')](_0x24c0('0x24')),_0x185add['qdAjax']({'url':_0x2178c4[_0x24c0('0x25')],'dataType':_0x24c0('0x26'),'success':function(_0x5ace8b){var _0x3c6598=_0x185add(_0x5ace8b);_0x1514f6[_0x24c0('0xf')](function(){var _0x5ace8b=_0x185add(this);var _0x369503=_0x3c6598['find'](_0x24c0('0x27')+_0x5ace8b[_0x24c0('0x28')](_0x24c0('0x29'))+'\x27]');_0x369503[_0x24c0('0x21')]&&(_0x369503[_0x24c0('0xf')](function(){_0x185add(this)['getParent'](_0x24c0('0x2a'))['clone']()[_0x24c0('0x2b')](_0x5ace8b);}),_0x5ace8b[_0x24c0('0x2c')]());})[_0x24c0('0x10')](_0x24c0('0x2d'));_0x11a139[_0x24c0('0xf')](function(){var _0x5ace8b={};var _0x18c9c6=_0x185add(this);_0x3c6598[_0x24c0('0x1c')]('h2')[_0x24c0('0xf')](function(){if(_0x185add(this)['text']()[_0x24c0('0x2e')]()[_0x24c0('0xa')]()==_0x18c9c6[_0x24c0('0x28')](_0x24c0('0x29'))[_0x24c0('0x2e')]()[_0x24c0('0xa')]())return _0x5ace8b=_0x185add(this),!0x1;});_0x5ace8b[_0x24c0('0x21')]&&(_0x5ace8b[_0x24c0('0xf')](function(){_0x185add(this)['getParent'](_0x24c0('0x2f'))[_0x24c0('0x30')]()[_0x24c0('0x2b')](_0x18c9c6);}),_0x18c9c6['hide']());})[_0x24c0('0x10')](_0x24c0('0x2d'));},'error':function(){_0x55db65(_0x24c0('0x31')+_0x2178c4[_0x24c0('0x25')]+_0x24c0('0x32'));},'complete':function(){_0x2178c4[_0x24c0('0x33')][_0x24c0('0x34')](this);_0x185add(window)[_0x24c0('0x35')]('QuatroDigital.am.ajaxCallback',_0x4d4d48);},'clearQueueDelay':0xbb8});};_0x185add[_0x24c0('0x2')]=function(_0x439217){var _0x4a2472=_0x439217[_0x24c0('0x1c')](_0x24c0('0x36'))[_0x24c0('0xf')](function(){var _0x1c8908=_0x185add(this);if(!_0x1c8908[_0x24c0('0x21')])return _0x55db65([_0x24c0('0x37'),_0x439217],_0x24c0('0x9'));_0x1c8908[_0x24c0('0x1c')](_0x24c0('0x38'))['parent']()[_0x24c0('0x10')](_0x24c0('0x39'));_0x1c8908[_0x24c0('0x1c')]('li')[_0x24c0('0xf')](function(){var _0x552d19=_0x185add(this);var _0x2f6b18=_0x552d19[_0x24c0('0x3a')](_0x24c0('0x3b'));_0x2f6b18[_0x24c0('0x21')]&&_0x552d19[_0x24c0('0x10')](_0x24c0('0x3c')+_0x2f6b18[_0x24c0('0x3d')]()[_0x24c0('0x3e')]()['trim']()[_0x24c0('0x3f')]()[_0x24c0('0x13')](/\./g,'')[_0x24c0('0x13')](/\s/g,'-')['toLowerCase']());});var _0x35df40=_0x1c8908[_0x24c0('0x1c')](_0x24c0('0x40'))[_0x24c0('0x41')]();_0x1c8908[_0x24c0('0x10')](_0x24c0('0x42'));_0x35df40=_0x35df40[_0x24c0('0x1c')]('>ul');_0x35df40['each'](function(){var _0x3c717a=_0x185add(this);_0x3c717a['find'](_0x24c0('0x40'))['qdAmAddNdx']()['addClass'](_0x24c0('0x43'));_0x3c717a[_0x24c0('0x10')]('qd-am-dropdown-menu');_0x3c717a['parent']()[_0x24c0('0x10')](_0x24c0('0x44'));});_0x35df40[_0x24c0('0x10')](_0x24c0('0x44'));var _0x1fd4af=0x0,_0xae2a7e=function(_0x1c9ef1){_0x1fd4af+=0x1;_0x1c9ef1=_0x1c9ef1[_0x24c0('0x3a')]('li')[_0x24c0('0x3a')]('*');_0x1c9ef1[_0x24c0('0x21')]&&(_0x1c9ef1['addClass'](_0x24c0('0x45')+_0x1fd4af),_0xae2a7e(_0x1c9ef1));};_0xae2a7e(_0x1c8908);_0x1c8908[_0x24c0('0x46')](_0x1c8908[_0x24c0('0x1c')]('ul'))[_0x24c0('0xf')](function(){var _0x52de07=_0x185add(this);_0x52de07['addClass'](_0x24c0('0x47')+_0x52de07[_0x24c0('0x3a')]('li')['length']+'-li');});});_0x26a69d(_0x4a2472);_0x2178c4[_0x24c0('0x48')][_0x24c0('0x34')](this);_0x185add(window)[_0x24c0('0x35')]('QuatroDigital.am.callback',_0x439217);};_0x185add['fn']['QD_amazingMenu']=function(_0x2f0301){var _0x56e483=_0x185add(this);if(!_0x56e483[_0x24c0('0x21')])return _0x56e483;_0x2178c4=_0x185add[_0x24c0('0x49')]({},_0x35351d,_0x2f0301);_0x56e483[_0x24c0('0x4a')]=new _0x185add[(_0x24c0('0x2'))](_0x185add(this));return _0x56e483;};_0x185add(function(){_0x185add(_0x24c0('0x4b'))['QD_amazingMenu']();});}}(this));

/* Quatro Digital Smart Cart */
var _0x908f=['.qd-ddc-quantity','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyCode','click.qd_ddc_remove','stop','slideUp','remove','shippingCalculate','$1-$2$3','qdDdcLastPostalCode','calculateShipping','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','productId','prod_','prodId','qd-bap-item-added','input.qd-productId[value=','.qd-bap-wrapper','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','ajaxStop','.qdDdcContainer','QD_smartCart','extend','selector','dropDown','buyButton','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','replace','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','warn','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','find','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollDown','scrollCart','val','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','getOrderForm','_QuatroDigital_AmountProduct','exec','qd-ddc-prodLoaded','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','each','productCategoryIds','attr','addClass','qd-ddc-','.qd-ddc-prodName','append','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','quantity','.qd-ddc-remove','appendTo','.qd-ddc-shipping\x20input','address','postalCode','actionButtons','lastSku','filter','[data-sku=\x27','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','body','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault'];(function(_0x553936,_0x27f697){var _0x3d218b=function(_0xb92ffa){while(--_0xb92ffa){_0x553936['push'](_0x553936['shift']());}};_0x3d218b(++_0x27f697);}(_0x908f,0x108));var _0xf908=function(_0x163de5,_0x274e4b){_0x163de5=_0x163de5-0x0;var _0x18d10b=_0x908f[_0x163de5];return _0x18d10b;};(function(_0x236cd0){_0x236cd0['fn'][_0xf908('0x0')]=_0x236cd0['fn'][_0xf908('0x1')];}(jQuery));function qd_number_format(_0x846ae4,_0x3a9811,_0x38e559,_0x4e3ed0){_0x846ae4=(_0x846ae4+'')[_0xf908('0x2')](/[^0-9+\-Ee.]/g,'');_0x846ae4=isFinite(+_0x846ae4)?+_0x846ae4:0x0;_0x3a9811=isFinite(+_0x3a9811)?Math['abs'](_0x3a9811):0x0;_0x4e3ed0=_0xf908('0x3')===typeof _0x4e3ed0?',':_0x4e3ed0;_0x38e559='undefined'===typeof _0x38e559?'.':_0x38e559;var _0x4b5b6f='',_0x4b5b6f=function(_0x44ffc7,_0x20e61b){var _0x3a9811=Math[_0xf908('0x4')](0xa,_0x20e61b);return''+(Math[_0xf908('0x5')](_0x44ffc7*_0x3a9811)/_0x3a9811)[_0xf908('0x6')](_0x20e61b);},_0x4b5b6f=(_0x3a9811?_0x4b5b6f(_0x846ae4,_0x3a9811):''+Math['round'](_0x846ae4))[_0xf908('0x7')]('.');0x3<_0x4b5b6f[0x0][_0xf908('0x8')]&&(_0x4b5b6f[0x0]=_0x4b5b6f[0x0][_0xf908('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4e3ed0));(_0x4b5b6f[0x1]||'')[_0xf908('0x8')]<_0x3a9811&&(_0x4b5b6f[0x1]=_0x4b5b6f[0x1]||'',_0x4b5b6f[0x1]+=Array(_0x3a9811-_0x4b5b6f[0x1]['length']+0x1)[_0xf908('0x9')]('0'));return _0x4b5b6f['join'](_0x38e559);};(function(){try{window[_0xf908('0xa')]=window[_0xf908('0xa')]||{},window['_QuatroDigital_CartData'][_0xf908('0xb')]=window[_0xf908('0xa')][_0xf908('0xb')]||$[_0xf908('0xc')]();}catch(_0x4213e0){_0xf908('0x3')!==typeof console&&_0xf908('0xd')===typeof console[_0xf908('0xe')]&&console[_0xf908('0xe')](_0xf908('0xf'),_0x4213e0[_0xf908('0x10')]);}}());(function(_0x6099e5){try{var _0x592a36=jQuery,_0x2f1505=function(_0x5a4c2c,_0x26fc18){if(_0xf908('0x11')===typeof console&&_0xf908('0x3')!==typeof console['error']&&'undefined'!==typeof console[_0xf908('0x12')]&&_0xf908('0x3')!==typeof console['warn']){var _0x24605c;_0xf908('0x11')===typeof _0x5a4c2c?(_0x5a4c2c[_0xf908('0x13')](_0xf908('0x14')),_0x24605c=_0x5a4c2c):_0x24605c=[_0xf908('0x14')+_0x5a4c2c];if(_0xf908('0x3')===typeof _0x26fc18||_0xf908('0x15')!==_0x26fc18[_0xf908('0x16')]()&&_0xf908('0x17')!==_0x26fc18[_0xf908('0x16')]())if(_0xf908('0x3')!==typeof _0x26fc18&&'info'===_0x26fc18[_0xf908('0x16')]())try{console[_0xf908('0x12')]['apply'](console,_0x24605c);}catch(_0x24f85a){try{console['info'](_0x24605c[_0xf908('0x9')]('\x0a'));}catch(_0x41f1e1){}}else try{console[_0xf908('0xe')]['apply'](console,_0x24605c);}catch(_0xd4448d){try{console[_0xf908('0xe')](_0x24605c[_0xf908('0x9')]('\x0a'));}catch(_0x1f42d7){}}else try{console['warn']['apply'](console,_0x24605c);}catch(_0x948fec){try{console[_0xf908('0x18')](_0x24605c[_0xf908('0x9')]('\x0a'));}catch(_0x12c823){}}}};window[_0xf908('0x19')]=window['_QuatroDigital_DropDown']||{};window[_0xf908('0x19')][_0xf908('0x1a')]=!0x0;_0x592a36[_0xf908('0x1b')]=function(){};_0x592a36['fn'][_0xf908('0x1b')]=function(){return{'fn':new _0x592a36()};};var _0xde494=function(_0x5a3316){var _0x5be33f={'r':_0xf908('0x1c')};return function(_0x38a8e2){var _0x321711=function(_0x59b81e){return _0x59b81e;};var _0x39e1b1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x38a8e2=_0x38a8e2['d'+_0x39e1b1[0x10]+'c'+_0x39e1b1[0x11]+'m'+_0x321711(_0x39e1b1[0x1])+'n'+_0x39e1b1[0xd]]['l'+_0x39e1b1[0x12]+'c'+_0x39e1b1[0x0]+'ti'+_0x321711('o')+'n'];var _0x51f88f=function(_0xad9faa){return escape(encodeURIComponent(_0xad9faa[_0xf908('0x2')](/\./g,'¨')[_0xf908('0x2')](/[a-zA-Z]/g,function(_0x1e004d){return String[_0xf908('0x1d')](('Z'>=_0x1e004d?0x5a:0x7a)>=(_0x1e004d=_0x1e004d[_0xf908('0x1e')](0x0)+0xd)?_0x1e004d:_0x1e004d-0x1a);})));};var _0x39fe90=_0x51f88f(_0x38a8e2[[_0x39e1b1[0x9],_0x321711('o'),_0x39e1b1[0xc],_0x39e1b1[_0x321711(0xd)]]['join']('')]);_0x51f88f=_0x51f88f((window[['js',_0x321711('no'),'m',_0x39e1b1[0x1],_0x39e1b1[0x4][_0xf908('0x1f')](),'ite'][_0xf908('0x9')]('')]||_0xf908('0x20'))+['.v',_0x39e1b1[0xd],'e',_0x321711('x'),'co',_0x321711('mm'),_0xf908('0x21'),_0x39e1b1[0x1],'.c',_0x321711('o'),'m.',_0x39e1b1[0x13],'r'][_0xf908('0x9')](''));for(var _0x38249b in _0x5be33f){if(_0x51f88f===_0x38249b+_0x5be33f[_0x38249b]||_0x39fe90===_0x38249b+_0x5be33f[_0x38249b]){var _0x50c2d6='tr'+_0x39e1b1[0x11]+'e';break;}_0x50c2d6='f'+_0x39e1b1[0x0]+'ls'+_0x321711(_0x39e1b1[0x1])+'';}_0x321711=!0x1;-0x1<_0x38a8e2[[_0x39e1b1[0xc],'e',_0x39e1b1[0x0],'rc',_0x39e1b1[0x9]]['join']('')][_0xf908('0x22')](_0xf908('0x23'))&&(_0x321711=!0x0);return[_0x50c2d6,_0x321711];}(_0x5a3316);}(window);if(!eval(_0xde494[0x0]))return _0xde494[0x1]?_0x2f1505('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x592a36[_0xf908('0x1b')]=function(_0x2071d6,_0x469bf3){var _0x4753f2=_0x592a36(_0x2071d6);if(!_0x4753f2[_0xf908('0x8')])return _0x4753f2;var _0x3284ee=_0x592a36['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xf908('0x24'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0xf908('0x25'),'emptyCart':_0xf908('0x26'),'continueShopping':_0xf908('0x27'),'shippingForm':_0xf908('0x28')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x4fb4f3){return _0x4fb4f3['skuName']||_0x4fb4f3[_0xf908('0x29')];},'callback':function(){},'callbackProductsList':function(){}},_0x469bf3);_0x592a36('');var _0x258617=this;if(_0x3284ee[_0xf908('0x2a')]){var _0x520130=!0x1;'undefined'===typeof window[_0xf908('0x2b')]&&(_0x2f1505(_0xf908('0x2c')),_0x592a36['ajax']({'url':_0xf908('0x2d'),'async':!0x1,'dataType':_0xf908('0x2e'),'error':function(){_0x2f1505(_0xf908('0x2f'));_0x520130=!0x0;}}));if(_0x520130)return _0x2f1505('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if('object'===typeof window[_0xf908('0x2b')]&&'undefined'!==typeof window[_0xf908('0x2b')]['checkout'])var _0x6099e5=window[_0xf908('0x2b')][_0xf908('0x30')];else if(_0xf908('0x11')===typeof vtex&&_0xf908('0x11')===typeof vtex['checkout']&&_0xf908('0x3')!==typeof vtex[_0xf908('0x30')][_0xf908('0x31')])_0x6099e5=new vtex[(_0xf908('0x30'))][(_0xf908('0x31'))]();else return _0x2f1505(_0xf908('0x32'));_0x258617[_0xf908('0x33')]=_0xf908('0x34');var _0x4cb8d4=function(_0x35d776){_0x592a36(this)['append'](_0x35d776);_0x35d776[_0xf908('0x35')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xf908('0x36')](_0x592a36(_0xf908('0x37')))['on'](_0xf908('0x38'),function(){_0x4753f2[_0xf908('0x39')](_0xf908('0x3a'));_0x592a36(document['body'])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0x592a36(document)[_0xf908('0x3b')](_0xf908('0x3c'))['on'](_0xf908('0x3c'),function(_0x39c732){0x1b==_0x39c732['keyCode']&&(_0x4753f2[_0xf908('0x39')](_0xf908('0x3a')),_0x592a36(document['body'])[_0xf908('0x39')](_0xf908('0x3d')));});var _0x4dfa36=_0x35d776[_0xf908('0x35')](_0xf908('0x3e'));_0x35d776[_0xf908('0x35')]('.qd-ddc-scrollUp')['on']('click.qd_ddc_scrollUp',function(){_0x258617['scrollCart']('-',void 0x0,void 0x0,_0x4dfa36);return!0x1;});_0x35d776[_0xf908('0x35')](_0xf908('0x3f'))['on']('click.qd_ddc_scrollDown',function(){_0x258617[_0xf908('0x40')](void 0x0,void 0x0,void 0x0,_0x4dfa36);return!0x1;});_0x35d776[_0xf908('0x35')]('.qd-ddc-shipping\x20input')[_0xf908('0x41')]('')['on']('keyup.qd_ddc_cep',function(){_0x258617['shippingCalculate'](_0x592a36(this));});if(_0x3284ee[_0xf908('0x42')]){var _0x469bf3=0x0;_0x592a36(this)['on'](_0xf908('0x43'),function(){var _0x35d776=function(){window[_0xf908('0x19')][_0xf908('0x1a')]&&(_0x258617[_0xf908('0x44')](),window['_QuatroDigital_DropDown']['allowUpdate']=!0x1,_0x592a36['fn'][_0xf908('0x45')](!0x0),_0x258617[_0xf908('0x46')]());};_0x469bf3=setInterval(function(){_0x35d776();},0x258);_0x35d776();});_0x592a36(this)['on'](_0xf908('0x47'),function(){clearInterval(_0x469bf3);});}};var _0x31e2c7=function(_0x487b44){_0x487b44=_0x592a36(_0x487b44);_0x3284ee[_0xf908('0x48')][_0xf908('0x49')]=_0x3284ee[_0xf908('0x48')][_0xf908('0x49')][_0xf908('0x2')](_0xf908('0x4a'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x3284ee[_0xf908('0x48')][_0xf908('0x49')]=_0x3284ee[_0xf908('0x48')]['cartTotal'][_0xf908('0x2')]('#items',_0xf908('0x4b'));_0x3284ee[_0xf908('0x48')][_0xf908('0x49')]=_0x3284ee[_0xf908('0x48')][_0xf908('0x49')][_0xf908('0x2')]('#shipping',_0xf908('0x4c'));_0x3284ee['texts']['cartTotal']=_0x3284ee['texts'][_0xf908('0x49')]['replace'](_0xf908('0x4d'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x487b44['find'](_0xf908('0x4e'))[_0xf908('0x4f')](_0x3284ee[_0xf908('0x48')][_0xf908('0x50')]);_0x487b44['find'](_0xf908('0x51'))['html'](_0x3284ee['texts'][_0xf908('0x52')]);_0x487b44[_0xf908('0x35')](_0xf908('0x53'))[_0xf908('0x4f')](_0x3284ee[_0xf908('0x48')][_0xf908('0x54')]);_0x487b44[_0xf908('0x35')](_0xf908('0x55'))[_0xf908('0x4f')](_0x3284ee[_0xf908('0x48')][_0xf908('0x49')]);_0x487b44[_0xf908('0x35')](_0xf908('0x56'))[_0xf908('0x4f')](_0x3284ee[_0xf908('0x48')]['shippingForm']);_0x487b44['find']('.qd-ddc-emptyCart\x20p')['html'](_0x3284ee[_0xf908('0x48')]['emptyCart']);return _0x487b44;}(this[_0xf908('0x33')]);var _0x520b47=0x0;_0x4753f2['each'](function(){0x0<_0x520b47?_0x4cb8d4['call'](this,_0x31e2c7['clone']()):_0x4cb8d4[_0xf908('0x57')](this,_0x31e2c7);_0x520b47++;});window[_0xf908('0xa')][_0xf908('0xb')][_0xf908('0x36')](function(){_0x592a36(_0xf908('0x58'))[_0xf908('0x4f')](window[_0xf908('0xa')][_0xf908('0x59')]||'--');_0x592a36(_0xf908('0x5a'))[_0xf908('0x4f')](window['_QuatroDigital_CartData'][_0xf908('0x5b')]||'0');_0x592a36(_0xf908('0x5c'))[_0xf908('0x4f')](window[_0xf908('0xa')][_0xf908('0x5d')]||'--');_0x592a36(_0xf908('0x5e'))[_0xf908('0x4f')](window['_QuatroDigital_CartData'][_0xf908('0x5f')]||'--');});var _0x33bb86=function(_0x40487e,_0x59deda){if('undefined'===typeof _0x40487e[_0xf908('0x60')])return _0x2f1505(_0xf908('0x61'));_0x258617[_0xf908('0x62')]['call'](this,_0x59deda);};_0x258617['getCartInfoByUrl']=function(_0x273d6c,_0xb4ff07){_0xf908('0x3')!=typeof _0xb4ff07?window['_QuatroDigital_DropDown'][_0xf908('0x63')]=_0xb4ff07:window[_0xf908('0x19')][_0xf908('0x63')]&&(_0xb4ff07=window[_0xf908('0x19')]['dataOptionsCache']);setTimeout(function(){window[_0xf908('0x19')][_0xf908('0x63')]=void 0x0;},_0x3284ee[_0xf908('0x64')]);_0x592a36(_0xf908('0x65'))[_0xf908('0x39')]('qd-ddc-prodLoaded');if(_0x3284ee[_0xf908('0x2a')]){var _0x469bf3=function(_0x5104c7){window['_QuatroDigital_DropDown'][_0xf908('0x66')]=_0x5104c7;_0x33bb86(_0x5104c7,_0xb4ff07);'undefined'!==typeof window[_0xf908('0x67')]&&_0xf908('0xd')===typeof window[_0xf908('0x67')][_0xf908('0x68')]&&window[_0xf908('0x67')]['exec'][_0xf908('0x57')](this);_0x592a36(_0xf908('0x65'))['addClass'](_0xf908('0x69'));};_0xf908('0x3')!==typeof window[_0xf908('0x19')][_0xf908('0x66')]?(_0x469bf3(window[_0xf908('0x19')][_0xf908('0x66')]),'function'===typeof _0x273d6c&&_0x273d6c(window[_0xf908('0x19')][_0xf908('0x66')])):_0x592a36[_0xf908('0x6a')]([_0xf908('0x60'),'totalizers',_0xf908('0x6b')],{'done':function(_0x766d64){_0x469bf3['call'](this,_0x766d64);_0xf908('0xd')===typeof _0x273d6c&&_0x273d6c(_0x766d64);},'fail':function(_0x623954){_0x2f1505([_0xf908('0x6c'),_0x623954]);}});}else alert(_0xf908('0x6d'));};_0x258617[_0xf908('0x46')]=function(){var _0xf891d4=_0x592a36(_0xf908('0x65'));_0xf891d4['find'](_0xf908('0x6e'))['length']?_0xf891d4[_0xf908('0x39')](_0xf908('0x6f')):_0xf891d4['addClass'](_0xf908('0x6f'));};_0x258617[_0xf908('0x62')]=function(_0x581854){var _0x469bf3=_0x592a36(_0xf908('0x70'));_0x469bf3['empty']();_0x469bf3[_0xf908('0x71')](function(){var _0x469bf3=_0x592a36(this),_0x536f1d,_0x2071d6,_0xa9eece=_0x592a36(''),_0x19a649;for(_0x19a649 in window['_QuatroDigital_DropDown'][_0xf908('0x66')]['items'])if(_0xf908('0x11')===typeof window[_0xf908('0x19')][_0xf908('0x66')][_0xf908('0x60')][_0x19a649]){var _0x35366c=window[_0xf908('0x19')][_0xf908('0x66')][_0xf908('0x60')][_0x19a649];var _0x1e13be=_0x35366c[_0xf908('0x72')][_0xf908('0x2')](/^\/|\/$/g,'')[_0xf908('0x7')]('/');var _0x1d0632=_0x592a36('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x1d0632[_0xf908('0x73')]({'data-sku':_0x35366c['id'],'data-sku-index':_0x19a649,'data-qd-departament':_0x1e13be[0x0],'data-qd-category':_0x1e13be[_0x1e13be['length']-0x1]});_0x1d0632[_0xf908('0x74')](_0xf908('0x75')+_0x35366c['availability']);_0x1d0632[_0xf908('0x35')](_0xf908('0x76'))[_0xf908('0x77')](_0x3284ee['skuName'](_0x35366c));_0x1d0632[_0xf908('0x35')](_0xf908('0x78'))[_0xf908('0x77')](isNaN(_0x35366c['sellingPrice'])?_0x35366c['sellingPrice']:0x0==_0x35366c[_0xf908('0x79')]?_0xf908('0x7a'):(_0x592a36(_0xf908('0x7b'))[_0xf908('0x73')](_0xf908('0x7c'))||'R$')+'\x20'+qd_number_format(_0x35366c[_0xf908('0x79')]/0x64,0x2,',','.'));_0x1d0632[_0xf908('0x35')]('.qd-ddc-quantity')[_0xf908('0x73')]({'data-sku':_0x35366c['id'],'data-sku-index':_0x19a649})[_0xf908('0x41')](_0x35366c[_0xf908('0x7d')]);_0x1d0632[_0xf908('0x35')](_0xf908('0x7e'))['attr']({'data-sku':_0x35366c['id'],'data-sku-index':_0x19a649});_0x258617['insertProdImg'](_0x35366c['id'],_0x1d0632['find']('.qd-ddc-image'),_0x35366c['imageUrl']);_0x1d0632['find']('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0xf908('0x73')]({'data-sku':_0x35366c['id'],'data-sku-index':_0x19a649});_0x1d0632[_0xf908('0x7f')](_0x469bf3);_0xa9eece=_0xa9eece[_0xf908('0x36')](_0x1d0632);}try{var _0x6099e5=_0x469bf3[_0xf908('0x0')]('.qd-ddc-wrapper')[_0xf908('0x35')](_0xf908('0x80'));_0x6099e5[_0xf908('0x8')]&&''==_0x6099e5['val']()&&window[_0xf908('0x19')][_0xf908('0x66')]['shippingData'][_0xf908('0x81')]&&_0x6099e5['val'](window[_0xf908('0x19')][_0xf908('0x66')][_0xf908('0x6b')]['address'][_0xf908('0x82')]);}catch(_0x4f4728){_0x2f1505('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x4f4728['message'],_0xf908('0x17'));}_0x258617[_0xf908('0x83')](_0x469bf3);_0x258617[_0xf908('0x46')]();_0x581854&&_0x581854[_0xf908('0x84')]&&function(){_0x2071d6=_0xa9eece[_0xf908('0x85')](_0xf908('0x86')+_0x581854['lastSku']+'\x27]');_0x2071d6[_0xf908('0x8')]&&(_0x536f1d=0x0,_0xa9eece['each'](function(){var _0x581854=_0x592a36(this);if(_0x581854['is'](_0x2071d6))return!0x1;_0x536f1d+=_0x581854['outerHeight']();}),_0x258617['scrollCart'](void 0x0,void 0x0,_0x536f1d,_0x469bf3[_0xf908('0x36')](_0x469bf3[_0xf908('0x87')]())),_0xa9eece[_0xf908('0x39')](_0xf908('0x88')),function(_0x1f7736){_0x1f7736['addClass'](_0xf908('0x89'));_0x1f7736[_0xf908('0x74')](_0xf908('0x88'));setTimeout(function(){_0x1f7736[_0xf908('0x39')](_0xf908('0x89'));},_0x3284ee[_0xf908('0x64')]);}(_0x2071d6),_0x592a36(document['body'])['addClass'](_0xf908('0x8a')),setTimeout(function(){_0x592a36(document[_0xf908('0x8b')])[_0xf908('0x39')](_0xf908('0x8a'));},_0x3284ee['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown[_0xf908('0x66')][_0xf908('0x60')][_0xf908('0x8')]?(_0x592a36(_0xf908('0x8b'))['removeClass'](_0xf908('0x8c'))[_0xf908('0x74')](_0xf908('0x8d')),setTimeout(function(){_0x592a36(_0xf908('0x8b'))[_0xf908('0x39')](_0xf908('0x8e'));},_0x3284ee[_0xf908('0x64')])):_0x592a36(_0xf908('0x8b'))[_0xf908('0x39')](_0xf908('0x8f'))[_0xf908('0x74')](_0xf908('0x8c'));}());_0xf908('0xd')===typeof _0x3284ee[_0xf908('0x90')]?_0x3284ee[_0xf908('0x90')][_0xf908('0x57')](this):_0x2f1505(_0xf908('0x91'));};_0x258617[_0xf908('0x92')]=function(_0x4f551b,_0x16c30c,_0x1fd698){function _0x2d3aba(){_0x16c30c[_0xf908('0x39')]('qd-loaded')[_0xf908('0x93')](function(){_0x592a36(this)[_0xf908('0x74')]('qd-loaded');})['attr'](_0xf908('0x94'),_0x1fd698);}_0x1fd698?_0x2d3aba():isNaN(_0x4f551b)?_0x2f1505('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta'):alert(_0xf908('0x95'));};_0x258617[_0xf908('0x83')]=function(_0x30ae0e){var _0x469bf3=function(_0x10ebac,_0x1c74d8){var _0x238345=_0x592a36(_0x10ebac);var _0xdd4d1f=_0x238345[_0xf908('0x73')](_0xf908('0x96'));var _0x2071d6=_0x238345[_0xf908('0x73')](_0xf908('0x97'));if(_0xdd4d1f){var _0x191c66=parseInt(_0x238345[_0xf908('0x41')]())||0x1;_0x258617['changeQantity']([_0xdd4d1f,_0x2071d6],_0x191c66,_0x191c66+0x1,function(_0x1569b0){_0x238345[_0xf908('0x41')](_0x1569b0);'function'===typeof _0x1c74d8&&_0x1c74d8();});}};var _0xb3e506=function(_0xbddee1,_0x38ef90){var _0x19ccf9=_0x592a36(_0xbddee1);var _0x2071d6=_0x19ccf9[_0xf908('0x73')]('data-sku');var _0xf22019=_0x19ccf9[_0xf908('0x73')](_0xf908('0x97'));if(_0x2071d6){var _0x121eb4=parseInt(_0x19ccf9['val']())||0x2;_0x258617[_0xf908('0x98')]([_0x2071d6,_0xf22019],_0x121eb4,_0x121eb4-0x1,function(_0x1f8482){_0x19ccf9[_0xf908('0x41')](_0x1f8482);_0xf908('0xd')===typeof _0x38ef90&&_0x38ef90();});}};var _0x50ffa1=function(_0x3c267d,_0xa4df8f){var _0x469bf3=_0x592a36(_0x3c267d);var _0x2071d6=_0x469bf3[_0xf908('0x73')](_0xf908('0x96'));var _0x31d967=_0x469bf3[_0xf908('0x73')](_0xf908('0x97'));if(_0x2071d6){var _0x918e26=parseInt(_0x469bf3[_0xf908('0x41')]())||0x1;_0x258617[_0xf908('0x98')]([_0x2071d6,_0x31d967],0x1,_0x918e26,function(_0x3da927){_0x469bf3[_0xf908('0x41')](_0x3da927);_0xf908('0xd')===typeof _0xa4df8f&&_0xa4df8f();});}};var _0x2071d6=_0x30ae0e[_0xf908('0x35')](_0xf908('0x99'));_0x2071d6[_0xf908('0x74')](_0xf908('0x9a'))[_0xf908('0x71')](function(){var _0x30ae0e=_0x592a36(this);_0x30ae0e[_0xf908('0x35')](_0xf908('0x9b'))['on'](_0xf908('0x9c'),function(_0xd525f4){_0xd525f4[_0xf908('0x9d')]();_0x2071d6[_0xf908('0x74')]('qd-loading');_0x469bf3(_0x30ae0e[_0xf908('0x35')](_0xf908('0x9e')),function(){_0x2071d6[_0xf908('0x39')](_0xf908('0x9f'));});});_0x30ae0e[_0xf908('0x35')](_0xf908('0xa0'))['on'](_0xf908('0xa1'),function(_0x542aaf){_0x542aaf[_0xf908('0x9d')]();_0x2071d6[_0xf908('0x74')]('qd-loading');_0xb3e506(_0x30ae0e[_0xf908('0x35')]('.qd-ddc-quantity'),function(){_0x2071d6[_0xf908('0x39')](_0xf908('0x9f'));});});_0x30ae0e['find']('.qd-ddc-quantity')['on'](_0xf908('0xa2'),function(){_0x2071d6[_0xf908('0x74')](_0xf908('0x9f'));_0x50ffa1(this,function(){_0x2071d6[_0xf908('0x39')](_0xf908('0x9f'));});});_0x30ae0e[_0xf908('0x35')](_0xf908('0x9e'))['on']('keyup.qd_ddc_change',function(_0x2ed8e2){0xd==_0x2ed8e2[_0xf908('0xa3')]&&(_0x2071d6[_0xf908('0x74')](_0xf908('0x9f')),_0x50ffa1(this,function(){_0x2071d6[_0xf908('0x39')](_0xf908('0x9f'));}));});});_0x30ae0e['find']('.qd-ddc-prodRow')['each'](function(){var _0x30ae0e=_0x592a36(this);_0x30ae0e['find'](_0xf908('0x7e'))['on'](_0xf908('0xa4'),function(){_0x30ae0e[_0xf908('0x74')]('qd-loading');_0x258617['removeProduct'](_0x592a36(this),function(_0xad0088){_0xad0088?_0x30ae0e[_0xf908('0xa5')](!0x0)[_0xf908('0xa6')](function(){_0x30ae0e[_0xf908('0xa7')]();_0x258617[_0xf908('0x46')]();}):_0x30ae0e['removeClass']('qd-loading');});return!0x1;});});};_0x258617[_0xf908('0xa8')]=function(_0x4e2893){var _0x583816=_0x4e2893[_0xf908('0x41')]();_0x583816=_0x583816[_0xf908('0x2')](/[^0-9\-]/g,'');_0x583816=_0x583816[_0xf908('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xf908('0xa9'));_0x583816=_0x583816[_0xf908('0x2')](/(.{9}).*/g,'$1');_0x4e2893['val'](_0x583816);0x9<=_0x583816[_0xf908('0x8')]&&(_0x4e2893['data'](_0xf908('0xaa'))!=_0x583816&&_0x6099e5[_0xf908('0xab')]({'postalCode':_0x583816,'country':'BRA'})[_0xf908('0xac')](function(_0x28481b){window['_QuatroDigital_DropDown'][_0xf908('0x66')]=_0x28481b;_0x258617[_0xf908('0x44')]();})[_0xf908('0xad')](function(_0x174ab6){_0x2f1505([_0xf908('0xae'),_0x174ab6]);updateCartData();}),_0x4e2893[_0xf908('0xaf')](_0xf908('0xaa'),_0x583816));};_0x258617['changeQantity']=function(_0x2fc314,_0x1bf0a5,_0xc91a20,_0x5272ca){function _0x5c5f9a(_0x129d52){_0x129d52='boolean'!==typeof _0x129d52?!0x1:_0x129d52;_0x258617[_0xf908('0x44')]();window[_0xf908('0x19')]['allowUpdate']=!0x1;_0x258617[_0xf908('0x46')]();_0xf908('0x3')!==typeof window[_0xf908('0x67')]&&_0xf908('0xd')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0xf908('0x67')][_0xf908('0x68')][_0xf908('0x57')](this);_0xf908('0xd')===typeof adminCart&&adminCart();_0x592a36['fn'][_0xf908('0x45')](!0x0,void 0x0,_0x129d52);'function'===typeof _0x5272ca&&_0x5272ca(_0x1bf0a5);}_0xc91a20=_0xc91a20||0x1;if(0x1>_0xc91a20)return _0x1bf0a5;if(_0x3284ee[_0xf908('0x2a')]){if(_0xf908('0x3')===typeof window[_0xf908('0x19')][_0xf908('0x66')][_0xf908('0x60')][_0x2fc314[0x1]])return _0x2f1505(_0xf908('0xb0')+_0x2fc314[0x1]+']'),_0x1bf0a5;window[_0xf908('0x19')][_0xf908('0x66')][_0xf908('0x60')][_0x2fc314[0x1]][_0xf908('0x7d')]=_0xc91a20;window['_QuatroDigital_DropDown']['getOrderForm'][_0xf908('0x60')][_0x2fc314[0x1]][_0xf908('0xb1')]=_0x2fc314[0x1];_0x6099e5[_0xf908('0xb2')]([window[_0xf908('0x19')][_0xf908('0x66')]['items'][_0x2fc314[0x1]]],[_0xf908('0x60'),_0xf908('0xb3'),_0xf908('0x6b')])[_0xf908('0xac')](function(_0x1793fb){window[_0xf908('0x19')][_0xf908('0x66')]=_0x1793fb;_0x5c5f9a(!0x0);})['fail'](function(_0xc596e9){_0x2f1505([_0xf908('0xb4'),_0xc596e9]);_0x5c5f9a();});}else _0x2f1505(_0xf908('0xb5'));};_0x258617['removeProduct']=function(_0x720245,_0xfa52db){function _0x33e1d1(_0x440c38){_0x440c38=_0xf908('0xb6')!==typeof _0x440c38?!0x1:_0x440c38;'undefined'!==typeof window[_0xf908('0x67')]&&_0xf908('0xd')===typeof window[_0xf908('0x67')][_0xf908('0x68')]&&window[_0xf908('0x67')]['exec'][_0xf908('0x57')](this);_0xf908('0xd')===typeof adminCart&&adminCart();_0x592a36['fn'][_0xf908('0x45')](!0x0,void 0x0,_0x440c38);_0xf908('0xd')===typeof _0xfa52db&&_0xfa52db(_0x2071d6);}var _0x2071d6=!0x1,_0x5ca749=_0x592a36(_0x720245)[_0xf908('0x73')](_0xf908('0x97'));if(_0x3284ee[_0xf908('0x2a')]){if(_0xf908('0x3')===typeof window[_0xf908('0x19')]['getOrderForm'][_0xf908('0x60')][_0x5ca749])return _0x2f1505('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x5ca749+']'),_0x2071d6;window[_0xf908('0x19')][_0xf908('0x66')][_0xf908('0x60')][_0x5ca749][_0xf908('0xb1')]=_0x5ca749;_0x6099e5[_0xf908('0xb7')]([window['_QuatroDigital_DropDown'][_0xf908('0x66')]['items'][_0x5ca749]],[_0xf908('0x60'),'totalizers',_0xf908('0x6b')])[_0xf908('0xac')](function(_0x1c62a0){_0x2071d6=!0x0;window[_0xf908('0x19')][_0xf908('0x66')]=_0x1c62a0;_0x33bb86(_0x1c62a0);_0x33e1d1(!0x0);})[_0xf908('0xad')](function(_0x426cff){_0x2f1505(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x426cff]);_0x33e1d1();});}else alert(_0xf908('0xb8'));};_0x258617[_0xf908('0x40')]=function(_0x1eff77,_0x536ee0,_0x35c1a4,_0x5b0a7d){_0x5b0a7d=_0x5b0a7d||_0x592a36(_0xf908('0xb9'));_0x1eff77=_0x1eff77||'+';_0x536ee0=_0x536ee0||0.9*_0x5b0a7d[_0xf908('0xba')]();_0x5b0a7d[_0xf908('0xa5')](!0x0,!0x0)[_0xf908('0xbb')]({'scrollTop':isNaN(_0x35c1a4)?_0x1eff77+'='+_0x536ee0+'px':_0x35c1a4});};_0x3284ee['updateOnlyHover']||(_0x258617['getCartInfoByUrl'](),_0x592a36['fn'][_0xf908('0x45')](!0x0));_0x592a36(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0xf908('0x19')][_0xf908('0x66')]=void 0x0,_0x258617[_0xf908('0x44')]();}catch(_0x480160){_0x2f1505(_0xf908('0xbc')+_0x480160[_0xf908('0x10')],_0xf908('0xbd'));}});_0xf908('0xd')===typeof _0x3284ee[_0xf908('0xb')]?_0x3284ee[_0xf908('0xb')][_0xf908('0x57')](this):_0x2f1505('Callback\x20não\x20é\x20uma\x20função');};_0x592a36['fn'][_0xf908('0x1b')]=function(_0x4b9ea0){var _0x145877=_0x592a36(this);_0x145877['fn']=new _0x592a36[(_0xf908('0x1b'))](this,_0x4b9ea0);return _0x145877;};}catch(_0x1cb4ad){_0xf908('0x3')!==typeof console&&'function'===typeof console[_0xf908('0xe')]&&console[_0xf908('0xe')]('Oooops!\x20',_0x1cb4ad);}}(this));(function(_0x14f6ab){try{var _0x1eb695=jQuery;window[_0xf908('0x67')]=window[_0xf908('0x67')]||{};window['_QuatroDigital_AmountProduct'][_0xf908('0x60')]={};window[_0xf908('0x67')][_0xf908('0xbe')]=!0x1;window[_0xf908('0x67')][_0xf908('0xbf')]=!0x1;window[_0xf908('0x67')]['quickViewUpdate']=!0x1;var _0x36d252=function(){if(window[_0xf908('0x67')][_0xf908('0xbe')]){var _0x24934a=!0x1;var _0x7e9167={};window[_0xf908('0x67')]['items']={};for(_0x1be874 in window[_0xf908('0x19')][_0xf908('0x66')]['items'])if('object'===typeof window[_0xf908('0x19')][_0xf908('0x66')][_0xf908('0x60')][_0x1be874]){var _0x1455a6=window['_QuatroDigital_DropDown']['getOrderForm'][_0xf908('0x60')][_0x1be874];_0xf908('0x3')!==typeof _0x1455a6[_0xf908('0xc0')]&&null!==_0x1455a6[_0xf908('0xc0')]&&''!==_0x1455a6[_0xf908('0xc0')]&&(window[_0xf908('0x67')][_0xf908('0x60')]['prod_'+_0x1455a6[_0xf908('0xc0')]]=window[_0xf908('0x67')][_0xf908('0x60')][_0xf908('0xc1')+_0x1455a6[_0xf908('0xc0')]]||{},window[_0xf908('0x67')][_0xf908('0x60')][_0xf908('0xc1')+_0x1455a6['productId']][_0xf908('0xc2')]=_0x1455a6[_0xf908('0xc0')],_0x7e9167[_0xf908('0xc1')+_0x1455a6[_0xf908('0xc0')]]||(window['_QuatroDigital_AmountProduct'][_0xf908('0x60')][_0xf908('0xc1')+_0x1455a6[_0xf908('0xc0')]]['qtt']=0x0),window[_0xf908('0x67')][_0xf908('0x60')]['prod_'+_0x1455a6[_0xf908('0xc0')]][_0xf908('0x5b')]+=_0x1455a6[_0xf908('0x7d')],_0x24934a=!0x0,_0x7e9167[_0xf908('0xc1')+_0x1455a6['productId']]=!0x0);}var _0x1be874=_0x24934a;}else _0x1be874=void 0x0;window[_0xf908('0x67')][_0xf908('0xbe')]&&(_0x1eb695('.qd-bap-wrapper')[_0xf908('0xa7')](),_0x1eb695('.qd-bap-item-added')[_0xf908('0x39')](_0xf908('0xc3')));for(var _0xdef744 in window[_0xf908('0x67')]['items']){_0x1455a6=window[_0xf908('0x67')][_0xf908('0x60')][_0xdef744];if(_0xf908('0x11')!==typeof _0x1455a6)return;_0x7e9167=_0x1eb695(_0xf908('0xc4')+_0x1455a6['prodId']+']')['getParent']('li');if(window['_QuatroDigital_AmountProduct']['allowRecalculate']||!_0x7e9167[_0xf908('0x35')](_0xf908('0xc5'))[_0xf908('0x8')])_0x24934a=_0x1eb695(_0xf908('0xc6')),_0x24934a[_0xf908('0x35')](_0xf908('0xc7'))[_0xf908('0x4f')](_0x1455a6['qtt']),_0x1455a6=_0x7e9167[_0xf908('0x35')](_0xf908('0xc8')),_0x1455a6[_0xf908('0x8')]?_0x1455a6['prepend'](_0x24934a)[_0xf908('0x74')]('qd-bap-item-added'):_0x7e9167['prepend'](_0x24934a);}_0x1be874&&(window['_QuatroDigital_AmountProduct'][_0xf908('0xbe')]=!0x1);};window[_0xf908('0x67')]['exec']=function(){window[_0xf908('0x67')][_0xf908('0xbe')]=!0x0;_0x36d252[_0xf908('0x57')](this);};_0x1eb695(document)[_0xf908('0xc9')](function(){_0x36d252[_0xf908('0x57')](this);});}catch(_0x163e34){_0xf908('0x3')!==typeof console&&_0xf908('0xd')===typeof console[_0xf908('0xe')]&&console['error'](_0xf908('0xf'),_0x163e34);}}(this));(function(){try{var _0x39d114=jQuery,_0x3628cb,_0x1f8375={'selector':_0xf908('0xca'),'dropDown':{},'buyButton':{}};_0x39d114[_0xf908('0xcb')]=function(_0x410425){var _0x216b5f={};_0x3628cb=_0x39d114[_0xf908('0xcc')](!0x0,{},_0x1f8375,_0x410425);_0x410425=_0x39d114(_0x3628cb[_0xf908('0xcd')])[_0xf908('0x1b')](_0x3628cb[_0xf908('0xce')]);_0x216b5f[_0xf908('0xcf')]=_0xf908('0x3')!==typeof _0x3628cb[_0xf908('0xce')][_0xf908('0x42')]&&!0x1===_0x3628cb[_0xf908('0xce')][_0xf908('0x42')]?_0x39d114(_0x3628cb[_0xf908('0xcd')])[_0xf908('0xd0')](_0x410425['fn'],_0x3628cb[_0xf908('0xcf')]):_0x39d114(_0x3628cb['selector'])[_0xf908('0xd0')](_0x3628cb[_0xf908('0xcf')]);_0x216b5f[_0xf908('0xce')]=_0x410425;return _0x216b5f;};_0x39d114['fn']['smartCart']=function(){_0xf908('0x11')===typeof console&&_0xf908('0xd')===typeof console[_0xf908('0x12')]&&console['info'](_0xf908('0xd1'));};_0x39d114[_0xf908('0xd2')]=_0x39d114['fn']['smartCart'];}catch(_0x182102){_0xf908('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0xf908('0xe')](_0xf908('0xf'),_0x182102);}}());

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

var _0x202d=['string','closest','not','.qd_sp_processedItem','style','display:none\x20!important;','after','extend','boolean','body','.produto','prototype','trim','replace','abs','undefined','pow','round','split','length','join','function','Smart\x20Price','object','error','info','toLowerCase','aviso','apply','warn','text','search','match','[class*=\x27desconto\x27]','auto','strong.skuBestPrice','label.skuBestInstallmentNumber','label.skuBestInstallmentValue','QD_SmartPrice','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','productPage','wrapperElement','find','addClass','qd-sp-active','isProductPage','skuBestPrice','qd-active','removeClass','oneFlagByItem','.qd_sp_on','qd_sp_ignored','qd_sp_on','div[skuCorrente]:first','attr','skuCorrente','skus','sku','available','bestPrice','isSmartCheckout','qd-sp-product-unavailable','getDiscountValue','alerta','val','appliedDiscount','listPrice','.qd_productOldPrice','changeNativePrice','.qd_displayPrice','skuPrice','.qd-sp-display-discount','html','installments','changeInstallments','installmentValue','.qd_sp_display_installments','.qd_sp_display_installmentValue','.qd_sp_installments','.qd_saveAmount','append','changeNativeSaveAmount','em.economia-de','each','skuSelected.vtex','qd_sp_processedItem','startedByWrapper','flagElement','call','forcePromotion'];(function(_0x49c21e,_0x247eb8){var _0x48fcb0=function(_0x52945c){while(--_0x52945c){_0x49c21e['push'](_0x49c21e['shift']());}};_0x48fcb0(++_0x247eb8);}(_0x202d,0x12e));var _0xd202=function(_0x2cd1d7,_0x56a8fc){_0x2cd1d7=_0x2cd1d7-0x0;var _0x4b8ec3=_0x202d[_0x2cd1d7];return _0x4b8ec3;};'function'!==typeof String[_0xd202('0x0')][_0xd202('0x1')]&&(String[_0xd202('0x0')][_0xd202('0x1')]=function(){return this[_0xd202('0x2')](/^\s+|\s+$/g,'');});function qd_number_format(_0x33f116,_0x301fe1,_0x2a6378,_0x433af0){_0x33f116=(_0x33f116+'')[_0xd202('0x2')](/[^0-9+\-Ee.]/g,'');_0x33f116=isFinite(+_0x33f116)?+_0x33f116:0x0;_0x301fe1=isFinite(+_0x301fe1)?Math[_0xd202('0x3')](_0x301fe1):0x0;_0x433af0=_0xd202('0x4')===typeof _0x433af0?',':_0x433af0;_0x2a6378=_0xd202('0x4')===typeof _0x2a6378?'.':_0x2a6378;var _0x3803ba='',_0x3803ba=function(_0x50ac70,_0x287054){var _0x301fe1=Math[_0xd202('0x5')](0xa,_0x287054);return''+(Math[_0xd202('0x6')](_0x50ac70*_0x301fe1)/_0x301fe1)['toFixed'](_0x287054);},_0x3803ba=(_0x301fe1?_0x3803ba(_0x33f116,_0x301fe1):''+Math[_0xd202('0x6')](_0x33f116))[_0xd202('0x7')]('.');0x3<_0x3803ba[0x0][_0xd202('0x8')]&&(_0x3803ba[0x0]=_0x3803ba[0x0][_0xd202('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x433af0));(_0x3803ba[0x1]||'')['length']<_0x301fe1&&(_0x3803ba[0x1]=_0x3803ba[0x1]||'',_0x3803ba[0x1]+=Array(_0x301fe1-_0x3803ba[0x1][_0xd202('0x8')]+0x1)[_0xd202('0x9')]('0'));return _0x3803ba[_0xd202('0x9')](_0x2a6378);};(function(_0x4d7a5a){'use strict';var _0x321574=jQuery;if(typeof _0x321574['fn']['QD_SmartPrice']===_0xd202('0xa'))return;var _0x4f1a90=_0xd202('0xb');var _0x514d36=function(_0x2d4667,_0x3bd5d4){if(_0xd202('0xc')===typeof console&&_0xd202('0xa')===typeof console[_0xd202('0xd')]&&'function'===typeof console[_0xd202('0xe')]&&'function'===typeof console['warn']){var _0x5dac85;_0xd202('0xc')===typeof _0x2d4667?(_0x2d4667['unshift']('['+_0x4f1a90+']\x0a'),_0x5dac85=_0x2d4667):_0x5dac85=['['+_0x4f1a90+']\x0a'+_0x2d4667];if(_0xd202('0x4')===typeof _0x3bd5d4||'alerta'!==_0x3bd5d4[_0xd202('0xf')]()&&_0xd202('0x10')!==_0x3bd5d4[_0xd202('0xf')]())if(_0xd202('0x4')!==typeof _0x3bd5d4&&'info'===_0x3bd5d4[_0xd202('0xf')]())try{console[_0xd202('0xe')][_0xd202('0x11')](console,_0x5dac85);}catch(_0x3a9db8){console['info'](_0x5dac85[_0xd202('0x9')]('\x0a'));}else try{console['error'][_0xd202('0x11')](console,_0x5dac85);}catch(_0x5f56df){console['error'](_0x5dac85[_0xd202('0x9')]('\x0a'));}else try{console[_0xd202('0x12')][_0xd202('0x11')](console,_0x5dac85);}catch(_0x3cdc56){console[_0xd202('0x12')](_0x5dac85[_0xd202('0x9')]('\x0a'));}}};var _0x44c1f6=/[0-9]+\%/i;var _0x19c220=/[0-9\.]+(?=\%)/i;var _0x5d0144={'isDiscountFlag':function(_0x3545bb){if(_0x3545bb[_0xd202('0x13')]()[_0xd202('0x14')](_0x44c1f6)>-0x1)return!![];return![];},'getDiscountValue':function(_0x4222d2){return _0x4222d2[_0xd202('0x13')]()[_0xd202('0x15')](_0x19c220);},'startedByWrapper':![],'flagElement':'.flag','wrapperElement':'li','filterFlagBy':_0xd202('0x16'),'forcePromotion':null,'appliedDiscount':null,'oneFlagByItem':!![],'isSmartCheckout':!![],'changeInstallments':![],'productPage':{'changeNativeSaveAmount':!![],'changeNativePrice':!![],'changeInstallments':![],'isProductPage':_0xd202('0x17'),'wrapperElement':'.productRightColumn','skuBestPrice':_0xd202('0x18'),'installments':_0xd202('0x19'),'installmentValue':_0xd202('0x1a'),'skuPrice':'strong.skuPrice'}};_0x321574['fn'][_0xd202('0x1b')]=function(){};var _0x165ce8=function(_0xe3e08){var _0x5aec4f={'r':'yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x113a43){var _0x497d2f,_0x3fe1d9,_0xe6d1,_0x5f1446;_0x3fe1d9=function(_0x587f21){return _0x587f21;};_0xe6d1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x113a43=_0x113a43['d'+_0xe6d1[0x10]+'c'+_0xe6d1[0x11]+'m'+_0x3fe1d9(_0xe6d1[0x1])+'n'+_0xe6d1[0xd]]['l'+_0xe6d1[0x12]+'c'+_0xe6d1[0x0]+'ti'+_0x3fe1d9('o')+'n'];_0x497d2f=function(_0x463db1){return escape(encodeURIComponent(_0x463db1[_0xd202('0x2')](/\./g,'¨')[_0xd202('0x2')](/[a-zA-Z]/g,function(_0x42cb36){return String[_0xd202('0x1c')](('Z'>=_0x42cb36?0x5a:0x7a)>=(_0x42cb36=_0x42cb36[_0xd202('0x1d')](0x0)+0xd)?_0x42cb36:_0x42cb36-0x1a);})));};var _0x23c539=_0x497d2f(_0x113a43[[_0xe6d1[0x9],_0x3fe1d9('o'),_0xe6d1[0xc],_0xe6d1[_0x3fe1d9(0xd)]]['join']('')]);_0x497d2f=_0x497d2f((window[['js',_0x3fe1d9('no'),'m',_0xe6d1[0x1],_0xe6d1[0x4][_0xd202('0x1e')](),_0xd202('0x1f')]['join']('')]||_0xd202('0x20'))+['.v',_0xe6d1[0xd],'e',_0x3fe1d9('x'),'co',_0x3fe1d9('mm'),_0xd202('0x21'),_0xe6d1[0x1],'.c',_0x3fe1d9('o'),'m.',_0xe6d1[0x13],'r'][_0xd202('0x9')](''));for(var _0x5aac1b in _0x5aec4f){if(_0x497d2f===_0x5aac1b+_0x5aec4f[_0x5aac1b]||_0x23c539===_0x5aac1b+_0x5aec4f[_0x5aac1b]){_0x5f1446='tr'+_0xe6d1[0x11]+'e';break;}_0x5f1446='f'+_0xe6d1[0x0]+'ls'+_0x3fe1d9(_0xe6d1[0x1])+'';}_0x3fe1d9=!0x1;-0x1<_0x113a43[[_0xe6d1[0xc],'e',_0xe6d1[0x0],'rc',_0xe6d1[0x9]][_0xd202('0x9')]('')]['indexOf'](_0xd202('0x22'))&&(_0x3fe1d9=!0x0);return[_0x5f1446,_0x3fe1d9];}(_0xe3e08);}(window);if(!eval(_0x165ce8[0x0]))return _0x165ce8[0x1]?_0x514d36(_0xd202('0x23')):!0x1;var _0x9f82cd=function(_0x41d3d9,_0x232895){'use strict';var _0x37cf4b=function(_0x32f0d2){'use strict';var _0x3abd30,_0x2636d9,_0x48b1f5,_0x45d303,_0x504525,_0x15ef58,_0x4921dc,_0x37d50f,_0x2f153b,_0x531459,_0x33dcd8,_0x543150,_0x30ee03,_0x4daed5,_0x50d008,_0x287057,_0x6873e6,_0x455de1,_0x52c6e7;var _0x22d8ef=_0x321574(this);_0x32f0d2=typeof _0x32f0d2==='undefined'?![]:_0x32f0d2;if(_0x232895['productPage']['isProductPage'])var _0x2f728d=_0x22d8ef['closest'](_0x232895[_0xd202('0x24')]['wrapperElement']);else var _0x2f728d=_0x22d8ef['closest'](_0x232895[_0xd202('0x25')]);if(!_0x32f0d2&&!_0x22d8ef['is'](_0x232895['filterFlagBy'])){if(_0x232895[_0xd202('0x24')]['isProductPage']&&_0x2f728d['is'](_0x232895[_0xd202('0x24')]['wrapperElement'])){_0x2f728d[_0xd202('0x26')](_0x232895[_0xd202('0x24')]['skuBestPrice'])[_0xd202('0x27')]('qd-active');_0x2f728d[_0xd202('0x27')](_0xd202('0x28'));}return;}var _0x195fdb=_0x232895[_0xd202('0x24')][_0xd202('0x29')];if(_0x22d8ef['is']('.qd_sp_on,\x20.qd_sp_ignored')&&!_0x195fdb)return;if(_0x195fdb){_0x37d50f=_0x2f728d['find'](_0x232895[_0xd202('0x24')][_0xd202('0x2a')]);if(_0x37d50f[_0xd202('0x26')]('.qd_active')['length'])return;_0x37d50f['removeClass'](_0xd202('0x2b'));_0x2f728d[_0xd202('0x2c')]('qd-sp-active');}if(_0x232895[_0xd202('0x2d')]&&_0x22d8ef['siblings'](_0xd202('0x2e'))['length']){_0x22d8ef[_0xd202('0x27')](_0xd202('0x2f'));return;}_0x22d8ef[_0xd202('0x27')](_0xd202('0x30'));if(!_0x232895['isDiscountFlag'](_0x22d8ef))return;if(_0x195fdb){_0x48b1f5={};var _0x1c2f80=parseInt(_0x321574(_0xd202('0x31'))[_0xd202('0x32')](_0xd202('0x33')),0xa);if(_0x1c2f80){for(var _0x358100=0x0;_0x358100<skuJson[_0xd202('0x34')]['length'];_0x358100++){if(skuJson[_0xd202('0x34')][_0x358100][_0xd202('0x35')]==_0x1c2f80){_0x48b1f5=skuJson[_0xd202('0x34')][_0x358100];break;}}}else{var _0x114b5b=0x5af3107a3fff;for(var _0x5e61db in skuJson[_0xd202('0x34')]){if(typeof skuJson[_0xd202('0x34')][_0x5e61db]===_0xd202('0xa'))continue;if(!skuJson[_0xd202('0x34')][_0x5e61db][_0xd202('0x36')])continue;if(skuJson[_0xd202('0x34')][_0x5e61db][_0xd202('0x37')]<_0x114b5b){_0x114b5b=skuJson[_0xd202('0x34')][_0x5e61db][_0xd202('0x37')];_0x48b1f5=skuJson[_0xd202('0x34')][_0x5e61db];}}}}_0x287057=!![];_0x6873e6=0x0;if(_0x232895[_0xd202('0x38')]&&_0x455de1){_0x287057=skuJson[_0xd202('0x36')];if(!_0x287057)return _0x2f728d[_0xd202('0x27')](_0xd202('0x39'));}_0x2636d9=_0x232895[_0xd202('0x3a')](_0x22d8ef);_0x3abd30=parseFloat(_0x2636d9,0xa);if(isNaN(_0x3abd30))return _0x514d36(['O\x20valor\x20informado\x20p/\x20o\x20desconto\x20não\x20é\x20um\x20número.',_0x22d8ef],_0xd202('0x3b'));var _0x43aa5e=function(_0x5059a2){if(_0x195fdb)_0x45d303=(_0x5059a2[_0xd202('0x37')]||0x0)/0x64;else{_0x30ee03=_0x2f728d[_0xd202('0x26')]('.qd_productPrice');_0x45d303=parseFloat((_0x30ee03[_0xd202('0x3c')]()||'')[_0xd202('0x2')](/[^0-9\.\,]+/i,'')[_0xd202('0x2')]('.','')[_0xd202('0x2')](',','.'),0xa);}if(isNaN(_0x45d303))return _0x514d36(['Por\x20alguma\x20razão\x20não\x20consegui\x20obter\x20o\x20preço\x20deste\x20produto\x20:(',_0x22d8ef,_0x2f728d]);if(_0x232895[_0xd202('0x3d')]!==null){_0x4daed5=0x0;if(!isNaN(_0x232895[_0xd202('0x3d')]))_0x4daed5=_0x232895['appliedDiscount'];else{_0x50d008=_0x2f728d['find'](_0x232895['appliedDiscount']);if(_0x50d008['length'])_0x4daed5=_0x232895[_0xd202('0x3a')](_0x50d008);}_0x4daed5=parseFloat(_0x4daed5,0xa);if(isNaN(_0x4daed5))_0x4daed5=0x0;if(_0x4daed5!==0x0)_0x45d303=_0x45d303*0x64/(0x64-_0x4daed5);}if(_0x195fdb)_0x504525=(_0x5059a2[_0xd202('0x3e')]||0x0)/0x64;else _0x504525=parseFloat((_0x2f728d[_0xd202('0x26')](_0xd202('0x3f'))['val']()||'')[_0xd202('0x2')](/[^0-9\.\,]+/i,'')[_0xd202('0x2')]('.','')[_0xd202('0x2')](',','.'),0xa);if(isNaN(_0x504525))_0x504525=0.001;_0x15ef58=_0x45d303*((0x64-_0x3abd30)/0x64);if(_0x195fdb&&_0x232895[_0xd202('0x24')][_0xd202('0x40')]){_0x37d50f[_0xd202('0x13')](_0x37d50f[_0xd202('0x13')]()[_0xd202('0x1')]()[_0xd202('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x15ef58,0x2,',','.')))['addClass'](_0xd202('0x2b'));_0x2f728d[_0xd202('0x27')]('qd-sp-active');}else{_0x52c6e7=_0x2f728d[_0xd202('0x26')](_0xd202('0x41'));_0x52c6e7[_0xd202('0x13')](_0x52c6e7[_0xd202('0x13')]()[_0xd202('0x2')](/[0-9\.]+,[0-9]+/i,'')+qd_number_format(_0x15ef58,0x2,',','.'));}if(_0x195fdb){_0x4921dc=_0x2f728d['find'](_0x232895['productPage'][_0xd202('0x42')]);if(_0x4921dc[_0xd202('0x8')])_0x4921dc['text'](_0x4921dc['text']()['trim']()[_0xd202('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x15ef58,0x2,',','.')));}var _0x1471b2=_0x2f728d[_0xd202('0x26')](_0xd202('0x43'));_0x1471b2[_0xd202('0x13')](_0x1471b2['text']()[_0xd202('0x2')](/[0-9]+\%/i,_0x3abd30+'%'));var _0x3e19da=function(_0x1024de,_0x2f25b8,_0x37d948){var _0x32464e=_0x2f728d['find'](_0x1024de);if(_0x32464e[_0xd202('0x8')])_0x32464e[_0xd202('0x44')](_0x32464e['html']()[_0xd202('0x1')]()[_0xd202('0x2')](/[0-9]{1,2}/,_0x37d948?_0x37d948:_0x5059a2['installments']||0x0));var _0x7a479a=_0x2f728d['find'](_0x2f25b8);if(_0x7a479a[_0xd202('0x8')])_0x7a479a['html'](_0x7a479a['html']()[_0xd202('0x1')]()[_0xd202('0x2')](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x15ef58/(_0x37d948?_0x37d948:_0x5059a2[_0xd202('0x45')]||0x1),0x2,',','.')));};if(_0x195fdb&&_0x232895['productPage'][_0xd202('0x46')])_0x3e19da(_0x232895['productPage'][_0xd202('0x45')],_0x232895[_0xd202('0x24')][_0xd202('0x47')]);else if(_0x232895[_0xd202('0x46')])_0x3e19da(_0xd202('0x48'),_0xd202('0x49'),parseInt(_0x2f728d['find'](_0xd202('0x4a'))[_0xd202('0x3c')]()||0x1)||0x1);_0x2f728d[_0xd202('0x26')](_0xd202('0x4b'))[_0xd202('0x4c')](qd_number_format(_0x504525-_0x15ef58,0x2,',','.'));_0x2f728d[_0xd202('0x26')]('.qd_saveAmountPercent')['prepend'](qd_number_format((_0x504525-_0x15ef58)*0x64/_0x504525,0x2,',','.'));if(_0x195fdb&&_0x232895[_0xd202('0x24')][_0xd202('0x4d')]){_0x321574(_0xd202('0x4e'))[_0xd202('0x4f')](function(){_0x33dcd8=_0x321574(this);_0x33dcd8[_0xd202('0x13')](_0x33dcd8['text']()[_0xd202('0x1')]()['replace'](/[0-9\.]+\,[0-9]+/,qd_number_format(_0x504525-_0x15ef58,0x2,',','.')));_0x33dcd8[_0xd202('0x27')](_0xd202('0x2b'));});}};_0x43aa5e(_0x48b1f5);if(_0x195fdb)_0x321574(window)['on'](_0xd202('0x50'),function(_0x1fbeb5,_0x4c0b8b,_0x57e742){_0x43aa5e(_0x57e742);});_0x2f728d[_0xd202('0x27')](_0xd202('0x51'));if(!_0x195fdb)_0x30ee03[_0xd202('0x27')](_0xd202('0x51'));};(_0x232895[_0xd202('0x52')]?_0x41d3d9[_0xd202('0x26')](_0x232895[_0xd202('0x53')]):_0x41d3d9)[_0xd202('0x4f')](function(){_0x37cf4b[_0xd202('0x54')](this,![]);});if(typeof _0x232895[_0xd202('0x55')]==_0xd202('0x56')){var _0x16efdd=_0x232895[_0xd202('0x52')]?_0x41d3d9:_0x41d3d9[_0xd202('0x57')](_0x232895['wrapperElement']);if(_0x232895[_0xd202('0x24')]['isProductPage'])_0x16efdd=_0x16efdd[_0xd202('0x57')](_0x232895[_0xd202('0x24')][_0xd202('0x25')])[_0xd202('0x58')](_0xd202('0x59'));else _0x16efdd=_0x16efdd[_0xd202('0x26')]('.qd_productPrice:not(.qd_sp_processedItem)');_0x16efdd[_0xd202('0x4f')](function(){var _0x152cb2=_0x321574(_0x232895[_0xd202('0x55')]);_0x152cb2[_0xd202('0x32')](_0xd202('0x5a'),_0xd202('0x5b'));if(_0x232895[_0xd202('0x24')][_0xd202('0x29')])_0x321574(this)['append'](_0x152cb2);else _0x321574(this)[_0xd202('0x5c')](_0x152cb2);_0x37cf4b['call'](_0x152cb2,!![]);});}};_0x321574['fn'][_0xd202('0x1b')]=function(_0x2ced7b){var _0x477af8=_0x321574(this);if(!_0x477af8['length'])return _0x477af8;var _0x3250cd=_0x321574[_0xd202('0x5d')](!![],{},_0x5d0144,_0x2ced7b);if(typeof _0x3250cd[_0xd202('0x24')][_0xd202('0x29')]!=_0xd202('0x5e'))_0x3250cd[_0xd202('0x24')]['isProductPage']=_0x321574(document[_0xd202('0x5f')])['is'](_0xd202('0x60'));_0x9f82cd(_0x477af8,_0x3250cd);return _0x477af8;};}(this));

var _0x80d9=['a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','appendTo','trigger','ajaxStop','load','ImageControl','.qd-videoLink','.produto','alerta','[Video\x20in\x20product]\x20','undefined','info','toLowerCase','error','extend','td.value-field.Videos:first','qdVideoInProduct','ul.thumbs','div#image','videoFieldSelector','text','replace','split','length','indexOf','youtube','push','pop','shift','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','fromCharCode','join','ite','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','body','addClass','qdpv-video-on','add','find','iframe','bind','animate','.qd-videoItem','call','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','click.playVideo','removeClass','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr'];(function(_0x371a55,_0x5f366e){var _0x575903=function(_0x574f4e){while(--_0x574f4e){_0x371a55['push'](_0x371a55['shift']());}};_0x575903(++_0x5f366e);}(_0x80d9,0x92));var _0x980d=function(_0x2ad869,_0x37c818){_0x2ad869=_0x2ad869-0x0;var _0x2b93cd=_0x80d9[_0x2ad869];return _0x2b93cd;};(function(_0x1febf5){$(function(){if($(document['body'])['is'](_0x980d('0x0'))){var _0x3a9d1e=[];var _0x38d1b9=function(_0x279d93,_0x290800){'object'===typeof console&&('undefined'!==typeof _0x290800&&_0x980d('0x1')===_0x290800['toLowerCase']()?console['warn'](_0x980d('0x2')+_0x279d93):_0x980d('0x3')!==typeof _0x290800&&_0x980d('0x4')===_0x290800[_0x980d('0x5')]()?console[_0x980d('0x4')](_0x980d('0x2')+_0x279d93):console[_0x980d('0x6')]('[Video\x20in\x20product]\x20'+_0x279d93));};window['qdVideoInProduct']=window['qdVideoInProduct']||{};var _0x43a0d8=$[_0x980d('0x7')](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x980d('0x8'),'controlVideo':!0x0,'urlProtocol':'http'},window[_0x980d('0x9')]);var _0x52cd18=$(_0x980d('0xa'));var _0x19cb9b=$(_0x980d('0xb'));var _0x2d6e19=$(_0x43a0d8[_0x980d('0xc')])[_0x980d('0xd')]()[_0x980d('0xe')](/\;\s*/,';')[_0x980d('0xf')](';');for(var _0x5f524e=0x0;_0x5f524e<_0x2d6e19[_0x980d('0x10')];_0x5f524e++)-0x1<_0x2d6e19[_0x5f524e][_0x980d('0x11')](_0x980d('0x12'))?_0x3a9d1e[_0x980d('0x13')](_0x2d6e19[_0x5f524e][_0x980d('0xf')]('v=')[_0x980d('0x14')]()['split'](/[&#]/)[_0x980d('0x15')]()):-0x1<_0x2d6e19[_0x5f524e][_0x980d('0x11')]('youtu.be')&&_0x3a9d1e[_0x980d('0x13')](_0x2d6e19[_0x5f524e]['split'](_0x980d('0x16'))[_0x980d('0x14')]()[_0x980d('0xf')](/[\?&#]/)[_0x980d('0x15')]());var _0x2a9ce4=$(_0x980d('0x17'));_0x2a9ce4[_0x980d('0x18')](_0x980d('0x19'));_0x2a9ce4[_0x980d('0x1a')](_0x980d('0x1b'));_0x2d6e19=function(_0x2f234f){var _0x550741={'r':'yrtnaplqrfvta%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x3cb470){var _0x551339=function(_0x4e37c8){return _0x4e37c8;};var _0x124c3f=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3cb470=_0x3cb470['d'+_0x124c3f[0x10]+'c'+_0x124c3f[0x11]+'m'+_0x551339(_0x124c3f[0x1])+'n'+_0x124c3f[0xd]]['l'+_0x124c3f[0x12]+'c'+_0x124c3f[0x0]+'ti'+_0x551339('o')+'n'];var _0x1d6286=function(_0x45d698){return escape(encodeURIComponent(_0x45d698[_0x980d('0xe')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x595cf0){return String[_0x980d('0x1c')](('Z'>=_0x595cf0?0x5a:0x7a)>=(_0x595cf0=_0x595cf0['charCodeAt'](0x0)+0xd)?_0x595cf0:_0x595cf0-0x1a);})));};var _0x4de252=_0x1d6286(_0x3cb470[[_0x124c3f[0x9],_0x551339('o'),_0x124c3f[0xc],_0x124c3f[_0x551339(0xd)]][_0x980d('0x1d')]('')]);_0x1d6286=_0x1d6286((window[['js',_0x551339('no'),'m',_0x124c3f[0x1],_0x124c3f[0x4]['toUpperCase'](),_0x980d('0x1e')]['join']('')]||'---')+['.v',_0x124c3f[0xd],'e',_0x551339('x'),'co',_0x551339('mm'),'erc',_0x124c3f[0x1],'.c',_0x551339('o'),'m.',_0x124c3f[0x13],'r'][_0x980d('0x1d')](''));for(var _0x43f278 in _0x550741){if(_0x1d6286===_0x43f278+_0x550741[_0x43f278]||_0x4de252===_0x43f278+_0x550741[_0x43f278]){var _0x117053='tr'+_0x124c3f[0x11]+'e';break;}_0x117053='f'+_0x124c3f[0x0]+'ls'+_0x551339(_0x124c3f[0x1])+'';}_0x551339=!0x1;-0x1<_0x3cb470[[_0x124c3f[0xc],'e',_0x124c3f[0x0],'rc',_0x124c3f[0x9]][_0x980d('0x1d')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x551339=!0x0);return[_0x117053,_0x551339];}(_0x2f234f);}(window);if(!eval(_0x2d6e19[0x0]))return _0x2d6e19[0x1]?_0x38d1b9(_0x980d('0x1f')):!0x1;var _0x1d5dad=function(_0x97ca70,_0x1da8ea){_0x980d('0x12')===_0x1da8ea&&_0x2a9ce4['html']('<iframe\x20src=\x22'+_0x43a0d8[_0x980d('0x20')]+_0x980d('0x21')+_0x97ca70+_0x980d('0x22'));_0x19cb9b[_0x980d('0x23')](_0x980d('0x24'),_0x19cb9b[_0x980d('0x23')]('height')||_0x19cb9b[_0x980d('0x24')]());_0x19cb9b[_0x980d('0x25')](!0x0,!0x0)[_0x980d('0x26')](0x1f4,0x0,function(){$(_0x980d('0x27'))[_0x980d('0x28')](_0x980d('0x29'));});_0x2a9ce4[_0x980d('0x25')](!0x0,!0x0)[_0x980d('0x26')](0x1f4,0x1,function(){_0x19cb9b[_0x980d('0x2a')](_0x2a9ce4)['animate']({'height':_0x2a9ce4[_0x980d('0x2b')](_0x980d('0x2c'))[_0x980d('0x24')]()},0x2bc);});};removePlayer=function(){_0x52cd18['find']('a:not(\x27.qd-videoLink\x27)')[_0x980d('0x2d')]('click.removeVideo',function(){_0x2a9ce4[_0x980d('0x25')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)['hide']()['removeAttr']('style');$('body')['removeClass']('qdpv-video-on');});_0x19cb9b[_0x980d('0x25')](!0x0,!0x0)[_0x980d('0x26')](0x1f4,0x1,function(){var _0x12530d=_0x19cb9b['data'](_0x980d('0x24'));_0x12530d&&_0x19cb9b[_0x980d('0x2e')]({'height':_0x12530d},0x2bc);});});};var _0x6b6a40=function(){if(!_0x52cd18[_0x980d('0x2b')](_0x980d('0x2f'))[_0x980d('0x10')])for(vId in removePlayer[_0x980d('0x30')](this),_0x3a9d1e)if('string'===typeof _0x3a9d1e[vId]&&''!==_0x3a9d1e[vId]){var _0x43c2e2=$(_0x980d('0x31')+_0x3a9d1e[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x3a9d1e[vId]+_0x980d('0x32')+_0x3a9d1e[vId]+'/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>');_0x43c2e2[_0x980d('0x2b')]('a')[_0x980d('0x2d')](_0x980d('0x33'),function(){var _0x53b5f2=$(this);_0x52cd18['find']('.ON')[_0x980d('0x34')]('ON');_0x53b5f2['addClass']('ON');0x1==_0x43a0d8['controlVideo']?$(_0x980d('0x35'))[_0x980d('0x10')]?(_0x1d5dad[_0x980d('0x30')](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0][_0x980d('0x36')][_0x980d('0x37')](_0x980d('0x38'),'*')):_0x1d5dad[_0x980d('0x30')](this,_0x53b5f2[_0x980d('0x39')]('rel'),'youtube'):_0x1d5dad[_0x980d('0x30')](this,_0x53b5f2['attr']('rel'),'youtube');return!0x1;});0x1==_0x43a0d8['controlVideo']&&_0x52cd18[_0x980d('0x2b')](_0x980d('0x3a'))[_0x980d('0x3b')](function(_0x47a4ac){$(_0x980d('0x35'))[_0x980d('0x10')]&&$(_0x980d('0x35'))[0x0][_0x980d('0x36')][_0x980d('0x37')](_0x980d('0x3c'),'*');});_0x980d('0x3d')===_0x43a0d8['insertThumbsIn']?_0x43c2e2[_0x980d('0x18')](_0x52cd18):_0x43c2e2[_0x980d('0x3e')](_0x52cd18);_0x43c2e2[_0x980d('0x3f')]('QuatroDigital.pv_video_added',[_0x3a9d1e[vId],_0x43c2e2]);}};$(document)[_0x980d('0x40')](_0x6b6a40);$(window)[_0x980d('0x41')](_0x6b6a40);(function(){var _0x41cbe4=this;var _0x35f106=window[_0x980d('0x42')]||function(){};window[_0x980d('0x42')]=function(_0x1ad432,_0x4d0220){$(_0x1ad432||'')['is'](_0x980d('0x43'))||(_0x35f106['call'](this,_0x1ad432,_0x4d0220),_0x6b6a40[_0x980d('0x30')](_0x41cbe4));};}());}});}(this));
