/*
* Funções base v1
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});

try {
	var Common = {
		init: function () {
			// Common.discountInformation();
			Common.loginDealer();
			Common.amazingMenu();
			Common.productBuildCaroussel();
			Common.productOwlCarousel();
			Common.shelfLogin();
			Common.smartCart();
			Common.shelfQuickview();
			Common.callSmartPrice();
			Common.salesChannelBodyClass();
			Common.resellerTopBar();
		},
		ajaxStop: function () {
			Common.callSmartPrice();
		},
		windowOnload: function () {},
		loginDealer: function() {
			var fn = function() {
				var modal = $('<div class="modal modal-qd-v1-login fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">×</span><span class="sr-only">Close</span></button></div><div class="modal-body"><div class="login-qd-v1-step"><img src="/arquivos/milon.all.logo.png" alt="" /><div class="login-qd-v1-step-1"><form novalidate="1"><p>Para continuar, informe seu e-mail abaixo.</p><div class="form-row"><input type="text" name="qd_email" class="qd_email form-control required" placeholder="Ex:jose@email.com" /></div><button class="login-qd-v1-btn-submit">CONFIRMAR</button></form></div><div class="login-qd-v1-step-2"><p>Olá! Identificamos que você possui acesso à área de revendedor. O que você gostaria de fazer agora ?</p><div class="link-row"><span class="login-qd-v1-btn-wholesale" data-qd-sc="2">Acessar preços em atacado</span><span class="login-qd-v1-btn-retail" data-qd-sc="1">Acessar preços em varejo</span></div><span class="login-qd-v1-btn-back">Voltar</span></div></div></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button></div></div></div></div>').appendTo(document.body);
				var step1 = modal.find('.login-qd-v1-step-1');
				var step2 = modal.find('.login-qd-v1-step-2');

				$('.login-reseller a, .wholesale-qd-v1-login').click(function(evt) {
					evt.preventDefault();

					modal.modal({backdrop: 'static'});
					$(document.body).addClass('qd-v1-login');
				});

				modal.on('hidden.bs.modal', function (e) {
					$(document.body).removeClass('qd-v1-login');
				});

				var form = modal.find('form');

				form.validate({
					rules: {
						email: {
							email: true
						}
					},
					submitHandler: function(form){
						var $form = $(form);
						var email = $form.find('.qd_email').val();

						if(!$form.valid())
							return;

						$.ajax({
							url: "//api.vtexcrm.com.br/" + jsnomeSite + "/dataentities/CL/search",
							data: {"_fields": "id,approvedDealer", "email": email},
							type: "GET",
							dataType: "json",
							headers: {Accept: "application/vnd.vtex.ds.v10+json"},
							success: function(data) {
								if(data.length && data[0].approvedDealer && data[0].approvedDealer == true) {
									step1.removeClass('active-l').addClass('inative');
									step2.removeClass('inative').addClass('active');
								} else {
									modal.modal('hide');
									vtexid.setEmail(email);
									vtexid.start();
								}

								step2.find('.login-qd-v1-btn-wholesale, .login-qd-v1-btn-retail').click(function() {
									var code = $(this).attr('data-qd-sc');
									var a = $('<a></a>');
									a[0].href= (vtexid.getReturnUrl() || '');
									a[0].search += '&sc=' + code;

									vtexid.start({
										email: email,
										returnUrl: a[0].href.replace('?&', '?')
									});

									modal.modal('hide');
								});
							}
						});
					},
					errorPlacement: function(error, element) {}
				});

				step2.find('.login-qd-v1-btn-back').click(function() {
					step1.removeClass('inative').addClass('active-l');
					step2.addClass('inative');
				});
			}

			$.qdAjax({
				url: "/no-cache/profileSystem/getProfile",
				dataType: "json",
				clearQueueDelay: null,
				success: function(data){
					try{
						if(data.IsUserDefined) {
							$(".login-reseller").html('Olá! ' + data.FirstName + '. <a href="/no-cache/user/logout">Sair</a>');
						} else {
							fn();
						}
					}
					catch (e) {if (typeof console !== "undefined" && typeof console.info === "function") console.info("Ops, algo saiu errado com o login.", e.message); }
				}
			});
		},
		resellerTopBar: function() {
			if($(document.body).is('.qd-sc-2'))
				return

			var wrapper = $('.reseller-info-topbar-qd-v1');

			$('.reseller-info-topbar-qd-v1-close i').click(function(){
				wrapper.slideUp().trigger("QuatroDigital.cf_close");
			});

			wrapper.QD_cookieFn({
				cookieName: "reseller-topbar",
				close: "",
				expireDays: 2,
				show: function() {
					$('.reseller-info-topbar-qd-v1').removeClass('hide');
				}
			});
		},
		amazingMenu:function(){
			$('.store-header .navbar-default').QD_amazingMenu();

			$('.qd-amazing-menu em').each(function(){
				$(this).click(function(){
					$(this).toggleClass('qd-on');
					$(this).next('ul').slideToggle();
				});
			});
			// Amazing Menu Responsivo
			$(".amazing-menu-toggle").click(function(){
				$("body").toggleClass('qd-am-on');
			});
			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-am-on');
			});
		},
		productOwlCarousel:function(){
			if (!$.fn.owlCarousel || $(document.body).is(".black-friday"))
				return;

			$(".qd-shelf-carousel .prateleira").each(function() {
				$(this).owlCarousel({
					items: 4,
					navigation: true,
					pagination: false
				});
			});
		},
		productBuildCaroussel: function(){
			$(".qd-shelf-carousel .prateleira").each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-1').insertBefore(wrap);
				wrap.find(".prateleira >ul").addClass("item");
			});
		},
		shelfLogin:function(){
			$("body").on("click",".shelf-login-btn",function(){
				vtexid.start();
			});
		},
		smartCart: function() {
			var smartCart = $.QD_smartCart({
				selector:".nav-cart",
				dropDown:{
					callback : function(){
						$(".qd-ddc-scrollDown").html('<i class="fa fa-angle-down"></i>');
						$(".qd-ddc-scrollUp").html('<i class="fa fa-angle-up"></i>');
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Produtos no seu carrinho</h3></div>');
					},
					callbackProductsList : function(){
						$(".qd-ddc-remove").html('<i class="fa fa-times-circle"></i>');
						$(".qd-ddc-quantityMinus").html('<i class="fa fa-minus-circle"></i>');
						$(".qd-ddc-quantityMore").html('<i class="fa fa-plus-circle"></i>');
					},
					texts: {
						cartTotal: "<span>Itens: #items</span>Total: #value"
					}
				},
				buyButton: {
					buyButton : ".buy-button",
					selectSkuMsg: "javascript:"
				}
			});
			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				// $(".quickview-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};
		},
		shelfQuickview:function(){
			var modal = $(".modal");

			$(".quickview-btn").click(function(){
				var $t = $(this);

				modal.on("hidden.bs.modal",function(){
					modal.removeClass("quickview-modal");
				});

				modal.on("show.bs.modal",function(){
					modal.addClass("quickview-modal");
					modal.find(".modal-body").html('<iframe src="'+($t.attr("href")||"error")+'" frameborder="0"></iframe>');
				});

				modal.modal();

				return false;
			});
		},
		discountInformation: function() {
			var modal = $(".modal");

			modal.find(".modal-content").prepend('<img src="/arquivos/ajax-loader.gif" class="loader" alt="" />');
			$("body").addClass("modal-information");

			modal.QD_cookieFn({
				cookieName: "newsletter",
				closeLimit: 1,
				show: function($elem){
					modal.find(".modal-body").prepend('<img src="/arquivos/05_15reais.jpg" alt="Desconto de R$ 15 na sua primeira compra*" data-dismiss="modal" />');
					modal.modal();
					modal.addClass("discount-information");

					$(".modal-body img").click(function() {
						modal.trigger("QuatroDigital.cf_close");
						$("body").removeClass("modal-information");
						modal.removeClass("discount-information");
						modal.modal("hide");
					});
				}
			});

			setTimeout(function(){
				$(".discount-information").modal("hide");
			},15000);
		},
		callSmartPrice: function() {
			var wrapper = $("li[layout]");

			wrapper.find(".flag").QD_SmartPrice({
				filterFlagBy: "[class*='desconto']",
				wrapperElement: wrapper,
				productPage:{
					isProductPage: false
				}
			});
		},
		salesChannelBodyClass: function() {
			$(document.body).addClass('qd-sc-' + jssalesChannel);
		}
	};

	var Home = {
		init: function () {
			Home.bannerResponsive();
			Home.brandOwlCarousel();
			Home.cycle2();
			Home.cycle2Footer();
			Home.mosaicImageShelf();

			// if($(document.body).is('.mosaico'))
				// Home.mosaicSetCol();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		bannerResponsive : function(){
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
		mosaicSetCol: function() {
			$(".vtx-collections-wrap .box-banner").QD_mosaicBanners();
		},
		brandOwlCarousel:function(){
			$(".qd-banner-carousel").owlCarousel({
				items: 6,
				navigation: true,
				pagination: false
			});
		},
		cycle2: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".home-qd-v2-full-slider");

			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<div class='cycle-pager-item'><span class='slider-pager-content'>" + $t.find("img").attr("alt") + "</span></div>");
			});

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".cycle-pager-wrap",
				prev: ".cycle-prev",
				next: ".cycle-next"
			});
		},
		cycle2Footer: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".home-qd-v2-full-slider-footer");

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				prev: ".cycle-prev",
				next: ".cycle-next"
			});
		},
		mosaicImageShelf: function() {
			mosaic = $(".vtx-mosaic");
			htmlImageBack = '<div class="qd-shelf-size-img"><div class="img-reponsive"><img src="/arquivos/mosaic-banner-whiter.jpg"></div></div>'

			mosaic.find(".prateleira").addClass("col-sm-6 col-xs-12 col-md-3");

			mosaic.find(".prateleira ul li").prepend(htmlImageBack);
			mosaic.find(".prateleira ul li.helperComplement .qd-shelf-size-img").remove();
		}
	};

	var Departament = {
		init: function () {
			Departament.showDisclaimerBanners();
			Departament.sidemenuToggle();
			Search.hideExtendedMenu();
			Search.infinityScroll();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {
			Search.shelfLineFix();
		},
		showDisclaimerBanners: function () {
			if ($(".disclaimer .box-banner").length)
				$(".disclaimer").show();
		},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			$(".side-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});
			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		}
	};

	var Search = {
		init: function () {
			Departament.showDisclaimerBanners();
			Departament.sidemenuToggle();
			Search.emptySearch();
			Search.hideExtendedMenu();
			Search.infinityScroll();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {
			Search.shelfLineFix();
		},
		emptySearch:function () {
			if ($('.busca-vazio').length>0) {
				$('.no-search-result').show();
				$('.searchTitle').hide();
			};
		},
		hideExtendedMenu:function(){
			$(".search-navigator ul").each(function(){
				var t,li,qtt,moreLink,moreLi,click,liHide;

				t=$(this);
				li=t.find(">li");
				qtt=7;

				if(li.length<=qtt) return;

				liHide=li.filter(":gt("+(qtt-1)+")").stop(true,true).hide();
				moreLink=$('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi=$('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais</a></li>');
				t.append(moreLi);

				click=function(){
					liHide.stop(true,true).slideToggle(function(){
						if(li.filter(":visible").length>qtt){
							moreLink.addClass("minus").text("Mostrar menos");
							moreLi.addClass("minus").find("a").text("Mostrar menos");
						}
						else{
							moreLink.removeClass("minus").text("Mostrar mais");
							moreLi.removeClass("minus").find("a").text("Mostrar mais");
						}
					});
				};
				moreLi.bind("click.qd_viewMore",click);
				moreLink.bind("click.qd_viewMore",click);
			});
		},
		infinityScroll: function() {
			$(".prateleira[id*=ResultItems]").QD_infinityScroll({
				callback: function () {
					Common.shelfQuickview();
				}
			});
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
		run: function() {},
		init: function () {
			Product.uniqueSkuNameFix();
			Product.sizeTableLink();
			Product.skuGridChangeImage();
			Product.productShowDescription();
			Product.setSkuExibition();
			Product.imageDownload();
			Product.singleSkuNotifyMe();
			Product.callProductSmartPrice();
			Product.qdCallThumbVideo();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		callScripYoutubeVideo: function() {
		},
		qdCallThumbVideo: function() {
			var iframe = $(".product-qd-v1-specification td.value-field.Video");

			if (!iframe.length)
				return;

			window.qdVideoInProduct = {videoFieldSelector: iframe};

			$(window).on('QuatroDigital.pt_callback', function() {
				$('.product-image-thumbs a:not(.qd-videoLink)').click(function() {
					$('.qd-playerWrapper iframe').remove();
				});
			});
		},
		callProductSmartPrice: function () {
			$(".product-price").prepend('<div class="qd-sp-best-price">à vista <span class="qd_displayPrice"> R$ </span> </div>');

			$(".product-sku-structure .flag").QD_SmartPrice({
				filterFlagBy: "[class*='desconto']",
				productPage:{
					wrapperElement: ".product-sku-structure",
					changeNativePrice: false,
					isProductPage: true
				}
			});

			$(document.body).addClass('qd-smart-price-on-test');
		},
		sizeTableLink:function(){
			if ($(".product-size-table .box-banner").length) {
				$(".size-table-link").show()
			};
		},
		buyingProductSumarry:function(){
			$(".qd-sq-quantity").on("QuatroDigital.sq_change",function(){
				var value = $(this).val()
				$('.qd-selected-qtt-sku').text(value);
				$('.qd-selected-sku-total').text(qd_number_format(value * skuJson.skus[0].bestPrice / 100, 2, ",", "."));
			});
		},
		singleSkuNotifyMe: function() {
			if(!$(document.body).is(".qd-sku-single-layout"))
				return;

			$(".portal-notify-me-ref button").attr("data-sku", skuJson.productId);
		},
		skuGridChangeImage:function(){
			$(window).on("QuatroDigital.ssg_callback", function(){
				$(".qd-sku-img,.qd-sku-name").click(function(){
					$(this).siblings(".qd-sku-qtt-wrap[id]:first").attr("id");
					try {
						var skuId = $(this).siblings(".qd-sku-qtt-wrap[id]:first").attr("id");

						var selectedSku;
						for (var i = 0; i < skuJson.skus.length; i++) {
							if (skuJson.skus[i].sku == skuId) {
								selectedSku = skuJson.skus[i];
								break;
							}
						}
						if (selectedSku)
							$(document).trigger("skuSelected.vtex", [skuId, selectedSku]);
					} catch (e) {
						if (typeof console !== "undefined" && typeof console.info === "function")
							console.info("Problemas ao selecionar o SKU", e.message);
					};
				});
			});
		},
		productShowDescription:function(){
			var btnShowDescription = $(".product-show-description");

			if ($('.product-description-wrap .productDescription').height() < 120)
				btnShowDescription.hide();
			else
				btnShowDescription.click(function(){
					$(".product-description-wrap").toggleClass('qd-on');
				});
		},
		setSkuExibition: function() {
			if(skuJson.skus.length == 1){
				Product.buyingProductSumarry();
				return $("body").addClass("qd-sku-single-layout");
			}

			skuJson.dimensionsMap[$('.qd-smart-sku-grid').attr('data-qd-smart-sku-grid')].sort(function(a, b){
				if (a.toUpperCase() == 'PP')
					a = -100
				else if  (a.toUpperCase() == 'P')
					a = -99;
				else if (a.toUpperCase() == 'P/M')
					a = -98;
				else if (a.toUpperCase() == 'M')
					a = -97;
				else if (a.toUpperCase() == 'G')
					a = -96;
				else if (a.toUpperCase() == 'GG')
					a = -95;
				else if (a.toUpperCase() == 'EG')
					a = -94;
				else if (a.toUpperCase() == 'EX')
					a = -93;

				if (b.toUpperCase() == 'PP')
					b = -100
				else if (b.toUpperCase() == 'P')
					b = -99;
				else if (b.toUpperCase() == 'P/M')
					b = -98;
				else if (b.toUpperCase() == 'M')
					b = -97;
				else if (b.toUpperCase() == 'G')
					b = -96;
				else if (b.toUpperCase() == 'GG')
					b = -95;
				else if (b.toUpperCase() == 'EG')
					b = -94;
				else if (b.toUpperCase() == 'EX')
					b = -93;

				return a-b;
			});

			if(skuJson.dimensionsMap.TAMANHO && skuJson.dimensionsMap.TAMANHO.length == 1){
				$(".qd-smart-sku-grid-list").QD_smartSkuGrid();
				$("body").addClass("qd-sku-list-layout");
				return;
			}

			$(".qd-smart-sku-grid").QD_smartSkuGrid();
			$("body").addClass("qd-sku-grid-layout");
		},
		imageDownload: function() {
			$(".qd-image-download").attr({
				target: "_blank",
				href: "http://millionline.com.br/download_imgs/?ref=" + $(".productReference").text().trim()
			}).show();
		},
		uniqueSkuNameFix:function(){
			if(!(typeof skuJson !== "undefined" && typeof skuJson.name === "string" && typeof skuJson.skus === "object" && skuJson.skus.length === 1 && skuJson.name !== ""))
				return;

			var elem = $(".fn.productName");
			// Substituindo o nome do produto com sku por apenas o nome do produto
			elem.text(skuJson.name);
		}
	};

	var List = {
		init: function () {
		},
		ajaxStop: function () {},
		windowOnload: function () {}
	};

	var Institutional = {
		init: function () {
			Institutional.institucionalQuemSomosLinkNext();
			Institutional.zendeskFormat();
			Institutional.institucionalQuemSomosParalaxSlider();
			Institutional.formSubmit();
			Institutional.dealerFormChangeCheckboxVal();
			Institutional.dealerFormShowCompanyInfo();
			Institutional.dealerFormSubmit();
			Institutional.blackFridayCarousel();
			Home.bannerResponsive();
			Institutional.resellerKitProductPrice();
			Institutional.resellerModalKit();
			Institutional.resellerSmartCart();
			Institutional.resellerCheckStep();
			Institutional.resellerExitStep();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		resellerExitStep: function() {
			$('.reseller-qd-v1-starter-kit-product-exit').click(function(evt){
				evt.preventDefault();

				$(document.body).removeClass('step-2').removeClass('step-3').addClass('step-4');
				$('.reseller-qd-v1-without-kit').slideDown(500);
				$('.reseller-qd-v1-starter-kit').slideUp(1000);
				$('html, body').stop().animate({'scrollTop': 0 }, 900, 'swing');
			});
		},
		resellerCheckStep: function() {
			if(!$(document.body).is('.atacado.step-1'))
				return;

			if (location.search.indexOf('idproduto') == -1) {
				window.location.href = window.location.pathname + '?idproduto=102239425';
			}

			if ($.cookie('sellerForm') == 'true' && location.search.indexOf('idproduto') >= 1) {
				$(document.body).removeClass('step-1').addClass('step-2');

				$('.wholesale-qd-v1-wrapper').hide();
				$('.reseller-qd-v1-starter-kit').show();
			} else {
				$(document.body).removeClass('step-2').removeClass('step-3').addClass('step-1');
				$('.wholesale-qd-v1-wrapper').show();
			}

			$(window).on("cartProductAdded.vtex", function() {
				$(document.body).removeClass('step-2').addClass('step-3');
				$('.reseller-qd-v1-cart').slideDown(500);
				$('.reseller-qd-v1-starter-kit').slideUp(1000);
				$('html, body').stop().animate({'scrollTop': 0 }, 900, 'swing');
			});
		},
		resellerSmartCart: function() {
			$.QD_smartCart({
				selector: ".reseller-qd-v1-cart-content .qd-sc-wrapper",
				dropDown:{
					texts: {
						linkCart: 'FINALIZAR',
						cartTotal: "<span>Itens: #items</span>Total: #value"
					}
				},
				buyButton: {
					buyButton : ".buy-button"
				}
			});
		},
		resellerModalKit: function() {
			if (!$('.reseller-qd-v1-starter-kit-product-description').find('table').length) {
				$('.reseller-qd-v1-starter-kit-product-btn-kit').hide();
				return;
			}

			var modal = $('.modal:first').clone().appendTo(document.body).addClass('qd-v1-modal-kit-item-view');
			var table = $('.reseller-qd-v1-starter-kit-product-description').find('table');

			modal.find('.modal-body').append(table);
			modal.find('.modal-header').find('button').remove();
			modal.find('.modal-header').append('<span class="close" data-dismiss="modal"><i class="fa fa-times" aria-hidden="true"></</span>');
			modal.find('.modal-footer').append('<p>*Sujeito a alteração sem aviso prévio.</p>');

			$('.reseller-qd-v1-starter-kit-product-btn-kit span').click(function() {
				modal.modal();
			});
		},
		resellerKitProductPrice: function() {
			var wrapper = $('.reseller-qd-v1-starter-kit-product-price');

			wrapper.prepend('<div class="qd-sp-best-price">à vista <span class="qd_displayPrice"> R$ </span> </div>');

			wrapper.find('.flag').QD_SmartPrice({
				filterFlagBy: "[class*='desconto']",
				productPage:{
					wrapperElement: ".reseller-qd-v1-starter-kit-product-price",
					changeNativePrice: false,
					isProductPage: true
				}
			});
		},
		dealerFormCheckEmail: function(email) {
			window.QD_checkEmailExist_request = window.QD_checkEmailExist_request || $.ajax({
				url: "//api.vtexcrm.com.br/" + jsnomeSite + "/dataentities/CL/search",
				data: {"_fields": "id", "email": email},
				type: "GET",
				dataType: "json",
				headers: {Accept: "application/vnd.vtex.ds.v10+json"},
				success: function(data) {
					if(data.length)
						alert("Este e-mail já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
				},
				complete: function(){
					window.QD_checkEmailExist_request = undefined;
				}
			});

			return window.QD_checkEmailExist_request;
		},
		blackFridayCarousel:function(){
			if (!$(document.body).is(".black-friday"))
				return;

			$(".qd-shelf-carousel").find("h2").remove();

			$(".qd-shelf-carousel .prateleira").each(function() {
				$(this).owlCarousel({
					items: 3,
					navigation: true,
					pagination: false
				});
			});
		},
		dealerFormChangeCheckboxVal: function() {
			if(!$(document.body).is('.atacado'))
				return;

			var changeCheckboxVal = function(item) {
				item.change(function() {
					if (item.is(':checked')) {
						item.val('True')
					} else {
						item.val('False');
					}
				});
			}

			changeCheckboxVal($('#wholesale-qd-v1-form-newsletter'));
			changeCheckboxVal($('#wholesale-qd-v1-form-cellphone-news'));
		},
		dealerFormInputMask: function() {
			var form = $('.wholesale-qd-v1-form');

			form.find('[name=wholesaleBirthDate]').mask('00/00/0000');
			form.find('[name=wholesaleCpf]').mask('000.000.000-00');
			form.find('[name=wholesaleCep]').mask('00000-000');
			form.find('[name=wholesaleState]').mask('SS');
			form.find('[name=wholesaleTelephone]').mask('(00) 0000-0000');
			form.find('[name=wholesaleCnpj]').mask('00.000.000/0000-00');
			form.find('[name=wholesaleStateRegistration]').mask('###.###.###.###.###');

			var maskBehavior = function (val) {
					return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
				},
				options = {onKeyPress: function(val, e, field, options) {
					field.mask(maskBehavior.apply({}, arguments), options);
				}
			};

			form.find('[name=wholesaleCellphone]').mask(maskBehavior, options);
		},
		dealerFormShowCompanyInfo: function() {
			if(!$(document.body).is('.atacado'))
				return;

			$('.wholesale-qd-v1-form-company-trigger').click(function() {
				$(this).toggleClass('qd-is-active');
				$('.wholesale-qd-v1-form-company-data').slideToggle();
			});
		},
		dealerFormSubmit: function() {
			if(!$(document.body).is('.atacado'))
				return;

			Institutional.dealerFormInputMask();

			var form = $('.wholesale-qd-v1-form');
			var modal = $('.modal').clone().appendTo(document.body).addClass('qd-v1-modal-form-message');

			var checkCnpjLength = function() {
				if (form.find('[name="wholesaleCnpj"]').val() != '') {
					return true;
				} else {
					return false;
				}
			}

			var email = form.find('[name="wholesaleEmail"]');

			// Preenchendo o endereço a partir do CEP
			var cepInputs = form.find('input[name=wholesaleAddress], input[name=wholesaleAddressNumber], input[name=wholesaleAdjunct], input[name=wholesaleNeighborhood], input[name=wholesaleCity], input[name=wholesaleState]').attr('disabled', 'disabled');
			var cep = form.find('input[name=wholesaleCep]');
			cep.keyup(function(e) {
				if((cep.val() || '').length < 9)
					return;

				$.ajax({
					url: '/api/checkout/pub/postal-code/BRA/' + cep.val(),
					dataType: "json",
					success: function(data) {
						form.find('input[name=wholesaleAddress]').val(data.street || '');
						form.find('input[name=wholesaleNeighborhood]').val(data.neighborhood || '');
						form.find('input[name=wholesaleCity]').val(data.city || '');
						form.find('input[name=wholesaleState]').val(data.state || '');
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
					}
				});
			});

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

					var inputs = $form.find('input, select');

					// Adicionando classe de carregando
					var submitWrapper = $form.find('[type=submit]').parent().addClass('qd-loading');

					// Obtendo o e-mail
					var email = $form.find('#wholesale-qd-v1-form-email').val() || '';
					if(!email.length)
						return alert('Preencha seu e-mail');

					var saveContact = function(userId) {
						var phone = ($form.find('#wholesale-qd-v1-form-telephone').val() || '').replace(/[^0-9]+/ig, '');
						phone = phone.length? '+55' + phone: null;

						var stateRegistration = (inputs.filter('[name="wholesaleStateRegistration"]').val() || 'Isento').trim();
						stateRegistration = stateRegistration.length? stateRegistration: 'Isento';
						stateRegistration = stateRegistration.replace(/i.+ento/g, 'Isento');

						$.ajax({url: '//api.ipify.org?format=jsonp', dataType: 'jsonp', success: function(data) { sendData(data.ip); }, error: function() {$.ajax({url: '//www.telize.com/jsonip', dataType: 'jsonp', success: function(data) { sendData(data.ip); }, error: function(data) { sendData(null); } }); } });

						var sendData = function(ip) {
							$.ajax({
								url: '//api.vtexcrm.com.br/' + jsnomeSite + '/dataentities/CL/documents',
								type: 'PATCH',
								dataType: 'json',
								headers: {'Accept': 'application/vnd.vtex.ds.v10+json', 'Content-Type': 'application/json; charset=utf-8'},
								data: JSON.stringify({
									ip: 							ip,
									firstName: 						inputs.filter('[name="wholesaleName"]').val() || '',
									lastName: 						inputs.filter('[name="wholesaleLastName"]').val() || '',
									email: 							email,
									isNewsletterOptIn: 				inputs.filter('[name="wholesaleNewsletter"]').val() || '',
									birthDate: 						(inputs.filter('[name="wholesaleBirthDate"]').val() || '').split('/').reverse().join('-'),
									gender: 						inputs.filter('[name="wholesaleGender"]').val() || '',
									interestingProducts: 			inputs.filter('[name="wholesaleInterestingProducts"]').val() || '',
									'document': 					(inputs.filter('[name="wholesaleCpf"]').val() || '').replace(/[^0-9]/ig, ''),
									documentType: 					'cpf',
									homePhone: 						phone,
									phone: 							'+55' + (inputs.filter('[name="wholesaleCellphone"]').val() || '').replace(/[^0-9]/ig, ''),
									isNewsletterSmsOptIn: 			inputs.filter('[name="wholesaleCellphoneNews"]').val() || '',
									tradeName: 						inputs.filter('[name="wholesaleFantasyName"]').val() || '',
									corporateName: 					inputs.filter('[name="wholesaleCompanyName"]').val() || '',
									corporateDocument: 				(inputs.filter('[name="wholesaleCnpj"]').val() || '').replace(/[^0-9]/ig, ''),
									stateRegistration: 				stateRegistration,
									isCorporate: 					checkCnpjLength(),
									localeDefault:					'pt-BR',
									newDealerInserted: 				true
								}),
								success: function(data) {
									$.ajax({
										url: '//api.vtexcrm.com.br/' + jsnomeSite + '/dataentities/AD/documents',
										type: 'PATCH',
										dataType: 'json',
										headers: {'Accept': 'application/vnd.vtex.ds.v10+json', 'Content-Type': 'application/json; charset=utf-8'},
										data: JSON.stringify({
											addressName: 	'Principal',
											userId:			(data.Id || '').replace(/^[a-z]{2}\-/i, ''),
											postalCode: 	inputs.filter('[name="wholesaleCep"]').val() || '',
											street: 		inputs.filter('[name="wholesaleAddress"]').val() || '',
											complement: 	inputs.filter('[name="wholesaleAdjunct"]').val() || '',
											neighborhood: 	inputs.filter('[name="wholesaleNeighborhood"]').val() || '',
											city: 			inputs.filter('[name="wholesaleCity"]').val() || '',
											state: 			inputs.filter('[name="wholesaleState"]').val() || '',
											country: 		'BRA',
											number: 		inputs.filter('[name="wholesaleAddressNumber"]').val() || '',
											addressType:	'residential',
											receiverName: 	inputs.filter('[name="wholesaleName"]').val() || '',
											geoCoordinate: 	[]
										}),
										success: function() {
											$form[0].reset();

											if($(document.body).is('.atacado.step-1')) {
												if ($('.wholesale-qd-v1-form-company-data').is(':visible')) {
													$form.find('.form-success').removeClass('hide form-error');
													$form.find('.form-alert-message').text('Seu cadastro foi realizado com sucesso! Aguarde nossa confirmação por e-mail');

													modal.removeClass('error').addClass('success').find('.modal-body').html('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Seu cadastro foi realizado com sucesso! Aguarde nossa confirmação por e-mail</p> <span data-dismiss="modal" class="qd-exit-modal">OK</span>');
													modal.modal();

													$('.wholesale-qd-v1-form-submit').hide();
												} else {
													$.cookie('sellerForm', 'true', {path: '/'});

													$(document.body).removeClass('step-1').addClass('step-2');
													$('html, body').stop().animate({'scrollTop': 0 }, 900, 'swing');
													$('.wholesale-qd-v1-wrapper').slideUp(500);
													$('.reseller-qd-v1-starter-kit').slideDown(1000);
												}
											} else {
												$form.find('.form-success').removeClass('hide form-error');
												$form.find('.form-alert-message').text('Seu cadastro foi realizado com sucesso! Aguarde nossa confirmação por e-mail');

												modal.removeClass('error').addClass('success').find('.modal-body').html('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Seu cadastro foi realizado com sucesso! Aguarde nossa confirmação por e-mail</p> <span data-dismiss="modal" class="qd-exit-modal">OK</span>');
												modal.modal();
												setTimeout(function() {
													modal.modal('hide');
												}, 20000);

												$form[0].reset();
											}
										},
										error: function() {
											$form.find('.form-success').removeClass('hide').addClass('form-error');
											$form.find('.form-alert-message').text('Ocorreu um erro no envio do formulário. Por favor, tente se cadastrar novamente.');

											modal.removeClass('success').addClass('error').find('.modal-body').html('<p><i class="fa fa-check-circle" aria-hidden="true"></i> Ocorreu um erro no envio do formulário. Por favor, tente se cadastrar novamente.</p> <span data-dismiss="modal" class="qd-exit-modal">OK</span>');
											modal.modal();
											setTimeout(function() {
												modal.modal('hide');
											}, 20000);
										},
										complete: function() {
											submitWrapper.removeClass('qd-loading');
										},
									});
								},
								error: function() {
									alert('Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.');
								}
							});
						};
					};
					$.ajax({url: '//api.vtexcrm.com.br/' + jsnomeSite + '/dataentities/CL/search?_fields=id&email=' + email, dataType: 'json', headers: {Accept: 'application/vnd.vtex.ds.v10+json'}, success: function(data) {if (data.length) saveContact(data[0].id); else saveContact(null); }, error: function() {saveContact(null); if(typeof console == 'object' && typeof console.warn == 'function') console.warn('Houve um erro ao tentar buscar os dados do usuário na entidade CL'); } });
					// Enviando os dados para o CRM

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		zendeskFormat: function() {
			if ($(document.body).is('.institucional.quem-somos'))
				Satisfaction.show({
					element: "institucional-quem-somos-satisfaction",
				});
		},
		toggleClick:function(){},
		institucionalQuemSomosLinkNext: function() {
			$(".institucional-quem-somos-link-next:not(.cartao-fidelidade)").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".institucional-quem-somos-block-2").offset().top - 75
				}, 900, 'swing');
			});

			$(".institucional-quem-somos-link-next2:eq(.cartao-fidelidade)").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".institucional-quem-somos-block-3").offset().top - 75
				}, 900, 'swing');
			});

		},
		institucionalQuemSomosParalaxSlider: function() {
			if ($(document.body).is('.institucional.quem-somos')){
				var wrapper = $('.institucional-quem-somos-paralax-slider');

				wrapper.owlCarousel({
					items: 1,
					navigation: true,
					pagination: true
				});
			}
		},
		formSubmit: function() {
			if (!$(document.body).is('.seja-um-revendedor'))
				return;

			var form = $(".institucional-seja-um-revendedor-form form");
			var jsnomeLoja = "millionline";

			$("#qd_form_msg").keyup(function(event){
				var target = $("#content-countdown");
				var len = $(this).val().length;
				var max = 0;
				var remain = len; //para limitar adicionar a variavel max com - na frente.

				// if(len > max)
				// {
				// 	var val = $(this).val();
				// 	$(this).val(val.substr(0, max));
				// 	remain = 0;
				// }

				$(".count-characte").html(remain);
			});


			form.find('[name=qd_form_tel]').mask('(00) 0000-00009');
			form.find('[name=qd_form_telCel]').mask('(00) 0000-00009');

		    form.validate({
		        rules: {
		            email: {
		                email: true
		            }
		        },
		        submitHandler: function(form) {
		            var $form = $(form);

		            if (!$form.valid())
		                return;

		            // Enviando os dados para o CRM
		            (function() {
		                // Adicionando classe de carregando
		                var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

		                // Obtendo o e-mail
		                var email = $form.find("#qd_form_email").val() || "";

		                if (!email.length)
		                    return alert("Preencha seu e-mail");

		                var saveContact = function(userId) {
		                    var phone = ($form.find("#qd_form_tel").val() || "").replace(/[^0-9]+/ig, "");
		                    var cellPhone = ($form.find("#qd_form_telCel").val() || "").replace(/[^0-9]+/ig, "");
		                    phone = phone.length ? "+55" + phone : null;
		                    cellPhone = cellPhone.length ? "+55" + cellPhone : null;

		                    $.ajax({
		                        url: "//api.ipify.org?format=jsonp",
		                        dataType: "jsonp",
		                        success: function(data) {
		                            sendData(data.ip);
		                        },
		                        error: function() {
		                            $.ajax({
		                                url: "//www.telize.com/jsonip",
		                                dataType: "jsonp",
		                                success: function(data) {
		                                    sendData(data.ip);
		                                },
		                                error: function(data) {
		                                    sendData(null);
		                                }
		                            });
		                        }
		                    });

		                    var sendData = function(ip) {
		                        $.ajax({
		                            url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AT/documents",
		                            type: "POST",
		                            dataType: "json",
		                            headers: {
		                                "Accept": "application/vnd.vtex.ds.v10+json",
		                                "Content-Type": "application/json; charset=utf-8"
		                            },
		                            data: JSON.stringify({
		                            	fullName: $form.find("#qd_form_fullName").val() || null,
		                            	email: email,
		                            	ip: ip,
		                            	message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
		                            	phone: phone,
		                            	cellPhone: cellPhone,
		                            	subject: $form.find("#qd_form_receiveEmail").val() || null,
		                            	userId: userId
		                            }),
		                            success: function(data) {
		                                $form.find(".form-succes").removeClass("hide");
		                            },
		                            error: function() {
		                                alert("Desculpe, não foi possível enviar seu formulário!");
		                            },
		                            complete: function() {
		                                submitWrapper.removeClass("qd-loading");
		                            }
		                        });
		                    }
		                };
		                $.ajax({
		                    url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
		                    type: "GET",
		                    dataType: "json",
		                    headers: {
		                        Accept: "application/vnd.vtex.ds.v10+json"
		                    },
		                    success: function(data) {
		                        if (data.length)
		                            saveContact(data[0].id);
		                        else {
		                            saveContact(null);
		                        }
		                    },
		                    error: function() {
		                        alert("Desculpe, não foi possível enviar seu formulário!");
		                    }
		                });
		            })();

		            return false;
		        },
		        errorPlacement: function(error, element) {}
		    });
		}
	};

	var Orders = {
		init: function () {
			Orders.bootstrapCssFix();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		bootstrapCssFix : function(){
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
	(function () {
		var body, ajaxStop, windowLoad;

		windowLoad = function () {
			Common.windowOnload();
			if (body.filter(".home").length > 0) Home.windowOnload();
			else if (body.filter(".departamento, .categoria").length > 0) Departament.windowOnload();
			else if (body.filter(".resultado-busca").length > 0) Search.windowOnload();
			else if (body.filter(".produto").length > 0) Product.windowOnload();
			else if (body.filter(".listas").length > 0) List.windowOnload();
			else if (body.filter(".institucional").length > 0) Institutional.windowOnload();
			else if(body.filter(".orders").length>0)Orders.windowOnload();
		};

		ajaxStop = function () {
			Common.ajaxStop();
			if (body.filter(".home").length > 0) Home.ajaxStop();
			else if (body.filter(".departamento, .categoria").length > 0) Departament.ajaxStop();
			else if (body.filter(".resultado-busca").length > 0) Search.ajaxStop();
			else if (body.filter(".produto").length > 0) Product.ajaxStop();
			else if (body.filter(".listas").length > 0) List.ajaxStop();
			else if (body.filter(".institucional").length > 0) Institutional.ajaxStop();
			else if(body.filter(".orders").length>0)Orders.ajaxStop();
		};

		$(function () {
			body = $("body");
			Common.init();
			if (body.filter(".home").length > 0) Home.init();
			else if (body.filter(".departamento, .categoria").length > 0) Departament.init();
			else if (body.filter(".resultado-busca").length > 0) Search.init();
			else if (body.filter(".produto").length > 0) Product.init();
			else if (body.filter(".listas").length > 0) List.init();
			else if (body.filter(".institucional").length > 0) Institutional.init();
			else if(body.filter(".orders").length>0)Orders.init();
			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass('jsFullLoaded');
		});

		if (location.pathname.substr(location.pathname.length - 2, 2).toLowerCase() == "/p")
			Product.run();
	})();
} catch (err) {
	if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
		$("body").addClass('jsFullLoaded jsFullLoadedError');
		console.info("Houve um erro ao iniciar os objetos, informações abaixo.");
		console.error(err);
	}
}
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Automatizador de comments box do Facebook // 1.2 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a;a=$(".fb-comments");if(a.length)if($("#fb-root").length||$("body").append('<div id="fb-root"></div>'),a.attr("data-href",document.location.href.split("#").shift().split("?").shift()),$("script[src*='connect.facebook.net']").filter("[src*='all.js']").length)"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse();else{var b=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(a=document.createElement("script"),a.id="facebook-jssdk",a.src="//connect.facebook.net/pt_BR/all.js#xfbml=1&appId="+($("meta[property='fb:app_id']").attr("content")||""),b.parentNode.insertBefore(a,b))}});
/* Newslleter customizada para a plataforma VTEX // 4.7 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(h){"function"!==typeof h.fn.QD_news&&(h.fn.QD_news=function(p){var g,a,m,e;e=function(a,b){"object"===typeof console&&("undefined"!==typeof b&&"alerta"===b.toLowerCase()?console.warn("[VtexNews] "+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?console.info("[VtexNews] "+a):console.error("[VtexNews] "+a))};g=jQuery(this);if(1>g.length)return g;a=jQuery.extend({defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",emailField:".qd_news_email",btn:".qd_news_button",
elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",timeHideSuccessMsg:3E3,successCallback:function(){},submitCallback:function(a,b){}},p);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&
(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof jQuery.fn.vtexPopUp2)return e("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),g;m=function(f){var b,d,c;d=0;b=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){d<a.animateRepeat&&b();d++})})};c=function(){f.fadeTo(a.animateSpeed,0.2,function(){f.fadeTo(a.animateSpeed,1,function(){d<a.animateRepeat&&c();d++})})};
f.stop(!0,!0);"leftRight"==a.animation?b():"blink"==a.animation&&c()};g.each(function(){var f,b,d,c,g,k,l;b=jQuery(this);d=b.find(a.nameField);c=b.find(a.emailField);g=b.find(a.btn);k=b.find(a.elementError);l=b.find(a.elementSuccess);1>d.length&&a.checkNameExist&&e("Campo de nome, n\u00e3o encontrado ("+d.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>c.length)return e("Campo de e-mail, n\u00e3o encontrado ("+c.selector+")"),b;if(1>g.length)return e("Bot\u00e3o de envio, n\u00e3o encontrado ("+
g.selector+")"),b;if("animateField"!=a.validationMethod&&(1>l.length||1>k.length))return e("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+l.selector+", "+k.selector+")"),b;a.setDefaultName&&d.is("input[type=text], textarea")&&d.val(a.defaultName);c.val(a.defaultEmail);(function(){var b,c;a.checkNameExist&&(b=d.filter(":visible"),b.length&&(c=b.val(),d.is("input:text, textarea")&&b.bind({focus:function(){b.val()!=c||0!==b.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||
b.val("")},blur:function(){""===b.val()&&b.val(c)}})))})();(function(){var b;b=c.val();c.bind({focus:function(){c.val()==b&&0===c.val().search(a.defaultEmail.substr(0,6))&&c.val("")},blur:function(){""===c.val()&&c.val(b)}})})();f=function(){var c,d,f,e;d=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||
"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();f=b.find(a.nameField).is(":visible");f=a.validateName?(1>d.length||0===d.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||f?f:!0):!1;e=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);f||e?"animateField"==a.validationMethod?(f&&m(b.find(a.nameField)),e&&m(b.find(a.emailField))):
"popup"==a.validationMethod?k.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(k.slideDown().bind("click",function(){h(this).slideUp()}),setTimeout(function(){k.slideUp()},1800)):(g.attr("disabled","disabled"),jQuery.ajax({url:"/no-cache/Newsletter.aspx",type:"POST",data:{newsletterClientEmail:c,newsletterClientName:a.defaultName==d?"-":d,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},
success:function(c){var d,f,e;g.removeAttr("disabled");"popup"==a.validationMethod?l.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&l.slideDown().bind("click",function(){h(this).slideUp()});e=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&b.find(a.nameField).val(a.defaultName);d=function(){e.val(a.defaultEmail)};"animateField"==a.validationMethod?(e.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),
e.addClass("vtexNewsSuccess"),f=setTimeout(function(){e.removeClass("vtexNewsSuccess");d();e.unbind("focus.vtexNews")},a.timeHideSuccessMsg),e.bind("focus.vtexNews",function(){e.removeClass("vtexNewsSuccess");clearTimeout(f);h(this).val("");h(this).unbind("focus.vtexNews")})):d();a.successCallback()}}),a.submitCallback(c,d))};g.bind("click",function(){f()});var n=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),f())};d.filter("input:text, textarea").bind("keydown",n);c.bind("keydown",
n)});return g},h(function(){h(".qd_news_auto").QD_news()}))})(jQuery);
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital jQuery Scroll // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(a){"function"!==typeof a.fn.QD_scroll&&(a.fn.QD_scroll=function(d,b){var c;b=b||100;window.QuatroDigital_scroll=window.QuatroDigital_scroll||{};window.QuatroDigital_scroll.scrollTop=null;window.QuatroDigital_scroll.lastScrollTop=null;a(this).scroll(function(){c=this;window.QuatroDigital_scroll.scrollTop=a(window).scrollTop()});(function(){window.QuatroDigital_scroll.interval=setInterval(function(){window.QuatroDigital_scroll.lastScrollTop!==window.QuatroDigital_scroll.scrollTop&&(null!==
window.QuatroDigital_scroll.scrollTop&&d.call(c,window.QuatroDigital_scroll.scrollTop),window.QuatroDigital_scroll.lastScrollTop=window.QuatroDigital_scroll.scrollTop)},b)})()})})(jQuery);
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){function n(b){b=f.json?JSON.stringify(b):String(b);return f.raw?b:encodeURIComponent(b)}function m(b,e){var a;if(f.raw)a=b;else a:{var d=b;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));a=f.json?JSON.parse(d):d;break a}catch(g){}a=void 0}return c.isFunction(e)?e(a):a}var l=/\+/g,f=
c.cookie=function(b,e,a){if(void 0!==e&&!c.isFunction(e)){a=c.extend({},f.defaults,a);if("number"===typeof a.expires){var d=a.expires,g=a.expires=new Date;g.setTime(+g+864E5*d)}return document.cookie=[f.raw?b:encodeURIComponent(b),"=",n(e),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}a=b?void 0:{};for(var d=document.cookie?document.cookie.split("; "):[],g=0,l=d.length;g<l;g++){var h=d[g].split("="),k;
k=h.shift();k=f.raw?k:decodeURIComponent(k);h=h.join("=");if(b&&b===k){a=m(h,e);break}b||void 0===(h=m(h))||(a[k]=h)}return a};f.defaults={};c.removeCookie=function(b,e){if(void 0===c.cookie(b))return!1;c.cookie(b,"",c.extend({},e,{expires:-1}));return!c.cookie(b)}});
/* Quatro Digital Amazing Menu // 2.9 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(v(m){w b,g,f,h;b=24;S("v"!==Y b.1h.W){g={11:"/x-1H-V",1L:v(){}};w k=v(a,b){S("1p"===Y L){w c="1p"===Y a;"1r"!==Y b&&"1M"===b.10()?c?L.1q("[R U T]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):L.1q("[R U T]\\n"+a):"1r"!==Y b&&"1g"===b.10()?c?L.1g("[R U T]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):L.1g("[R U T]\\n"+a):c?L.19("[R U T]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):L.19("[R U T]\\n"+a)}};b.1h.1j=v(){w a=b(C);a.G(v(a){b(C).D("x-B-I-"+a)});a.1a().D("x-B-1a");a.1o().D("x-B-1o");H a};h=v(a){w e,c;a=a.F(".2l");e=a.1n(".x-B-1i");c=a.1n(".x-B-1k");S(e.K||c.K)e.15().D("x-B-1i-1l"),c.15().D("x-B-1k-1l"),b.2n({11:f.11,2o:"2k",2j:v(a){w l=b(a);e.G(v(){w a,d;d=b(C);a=l.F("2f[2e=\'"+d.1s("1C-1E-1A")+"\']");a.K&&(a.G(v(){b(C).1B(".2g-1i").1y().1x(d)}),d.1u())}).D("x-B-1v-1z");c.G(v(){w a={},d;d=b(C);l.F("2i").G(v(){S(b(C).1I().1w().10()==d.1s("1C-1E-1A").1w().10())H a=b(C),!1});a.K&&(a.G(v(){b(C).1B("[2y*=\'2z\']").1y().1x(d)}),d.1u())}).D("x-B-1v-1z")},19:v(){k("N\\1J 2t 2u\\2d 2c 1U 1V 1K V. A 11 \'"+f.11+"\' 1X.")},1T:1S})};b.W=v(a){w e=v(a){w b={j:"1O%8%1D%8%q%8%i",1N:"1P%8%q%8%i",1Q:"1R%8%P%8%q%8%i",1Y:"1t%8%M%8%q%8%i",1Z:"1F%8%Q%8%q%8%i",28:"c-1e%8%P%8%q%8%i",J:"-1e%8%M%8%q%8%i","J-":"1e%8%Q%8%q%8%i","E%8%":"1D%8%P%8%q%8%i","E%8%2":"2C%8%M%8%q%8%i","E%8%25":"2a%8%Q%8%q%8%i","E%8%1G":"2b%8%q%8%i",27:"r%8%q%8%i",1d:"%8%P%8%q%8%i","1d%":"8%M%8%q%8%i","1d%2":"20%Q%8%q%8%i","J-21":"1m%8%P%8%q%8%i","J-22":"23%8%M%8%q%8%i","J-2s":"w%8%Q%8%q%8%i","E%8%2O":"1t%8%P%8%q%8%i","E%8%32":"1F%8%M%8%q%8%i","E%8%2Z":"1m%8%Q%8%q%8%i","E%8%34":"3c%8%q%8%i","O%8%3a":"35%8%i","O%8%36":"37%8%q%8%i","O%8%38":"33%8%q%8%i","O%8%2U":"2V%8%q%8%i","J-O%8%2":"2K%8%q%8%i","J-O%8%25":"2G%8%q%8%i","J-O%8%1G":"2M%8%q%8%i","E%8%1b%8":"%P%8%q%8%i","E%8%1b%8%":"M%8%q%8%i","E%8%1b%8%2":"2N%8%q%8%i"};H v(a){w c,d,e,f;c=v(a){H a};d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];e=a["d"+d[16]+"c"+d[17]+"m"+c(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"2D"+c("o")+"n"];a=v(a){H 39(3b(a.1c(/\\./g,"\\2J").1c(/[a-2E-Z]/g,v(a){H 2F.2Q(("Z">=a?2I:2P)>=(a=a.2H(0)+13)?a:a-26)})))};2W(w g 30 b){S(a(e[[d[9],c("o"),d[12],d[c(13)]].2R("")])===g+b[g]){f="2T"+d[17]+"e";2S}f="f"+d[0]+"2L"+c(d[1])+""}H f}(a)}(m);2Y(e)&&(e=a.F("X[2X]").G(v(){w c,e;c=b(C);S(!c.K)H k(["31 1K V n\\1J 1W",a],"1M");c.F("I >X").15().D("x-B-2r-X");c.F("I").G(v(){w a=b(C),c;c=a.14("a, p");c.K&&a.D("x-B-2v-"+c.1a().1I().2A().1c(/\\s/g,"-").10())});e=c.F(">I").1j();c.D("x-1H-V");e=e.F(">X");e.G(v(){w a=b(C);a.F(">I").1j().D("x-B-2q");a.D("x-B-1f-V");a.15().D("x-B-1f")});e.D("x-B-1f");w f=0,g=v(a){f+=1;a=a.14("I").14("*");a.K&&(a.D("x-B-2p-"+f),g(a))};g(c);c.2h(c.F("X")).G(v(){w a=b(C);a.D("x-B-"+a.14("I").K+"-I")})}),h(e),f.1L.2B(C))};b.1h.W=v(a){w e=b(C);f=b.2m({},g,a);e.2x=2w b.W(b(C));H e};b(v(){b(".29").W()})}})(C);',62,199,'||||||||25C2||||||||||25A8oe||||||||25A8pbz|||||function|var|qd||||am|this|addClass|jjj|find|each|return|li|qrirybc|length|console|25A8igrkpbzzreprorgn||dhngebqvtvgny|25A8igrkpbzzrepr|25A8igrkpbzzreprfgnoyr|QD|if|Menu|Amazing|menu|QD_amazingMenu|ul|typeof||toLowerCase|url|||children|parent||||error|first|25A8dhngebqvtvgny|replace|qrizvyyvbayvar|zvyyvbayvar|dropdown|info|fn|banner|qdAmAddNdx|collection|wrapper|ayvar|filter|last|object|warn|undefined|attr|vbayvar|hide|content|trim|insertBefore|clone|loaded|value|getParent|data|25A8zvyyvbayvar|qdam|bayvar|25A|amazing|text|u00e3o|do|callback|alerta|zv|jj|yyvbayvar|zvy|yvbayvar|3E3|clearQueueDelay|os|dados|encontrada|falho|zvyy|zvyyv|5C2|qrizvyyvb|qrizvyyvba|yvar|jQuery|||qrizvyyvbayva|qriryb|qd_amazing_menu_auto|A8zvyyvbayvar|8qrizvyyvbayvar|obter|u00edvel|alt|img|box|add|h2|success|html|qd_am_code|extend|qdAjax|dataType|level|column|has|qrizvyyvbay|foi|poss|elem|new|exec|class|colunas|replaceSpecialChars|call|5A8zvyyvbayvar|ti|zA|String|A8igrkpbzzreprorgn|charCodeAt|90|u00a8|5A8igrkpbzzrepr|ls|8igrkpbzzreprfgnoyr|5A8igrkpbzzreprfgnoyr|25A8qrizvyy|122|fromCharCode|join|break|tr|25A8igrk|pbzzreprfgnoyr|for|itemscope|eval|25A8qrizvyyvb|in|UL|25A8qrizvyyv|kpbzzreprorgn|25A8dhngebqvtv|bz|25A8ig|rkpbzzrepr|25A8igr|escape|25A8p|encodeURIComponent|gny'.split('|'),0,{}));
/* Quatro Digital - Smart Login // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(h){var a=jQuery;if("function"!==typeof a.fn.QD_smartLogin){var e=function(a,b){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var c;"object"===typeof a?(a.unshift("[Quatro Digital - Smart Login]\n"),c=a):c=["[Quatro Digital - Smart Login]\n"+a];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
c)}catch(e){console.info(c.join("\n"))}else try{console.error.apply(console,c)}catch(f){console.error(c.join("\n"))}else try{console.warn.apply(console,c)}catch(g){console.warn(c.join("\n"))}}},f={},g=function(a,b){a.find("a[href='#login']").click(function(a){a.preventDefault();vtexid.start()})};a.fn.QD_smartLogin=function(d){var b=a(this);d=a.extend({},f,d);b.qdPlugin=new g(b,d);return b};a(function(){a(".qd-sl-login-auto").QD_smartLogin()});(function(d){window.QuatroDigital=window.QuatroDigital||
{};try{a(function(){a("body").addClass("qd-sl-user-loading")}),a.qdAjax({url:"/no-cache/profileSystem/getProfile",dataType:"json",clearQueueDelay:null,success:function(b){try{a(function(){b.IsUserDefined?(window.QuatroDigital.profileSystem=b,a("body").addClass("qd-sl-user-logged").removeClass("qd-sl-user-loading")):a("body").addClass("qd-sl-user-not-logged").removeClass("qd-sl-user-loading")})}catch(d){e(d.message)}},error:function(){alert(d.checkLoginErrorMsg)}})}catch(b){e(b.message)}})()}})(this);
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
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* Quatro Digital Cookie Functions // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,c){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?
"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var c=function(d,b){var c=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof c&&c>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(d);d.trigger("QuatroDigital.cf_show");a(window).on("qdNewsSuccessCallback",function(a,c){d.trigger("QuatroDigital.qdcf_applyComplete");b.show(d);d.trigger("QuatroDigital.cf_hide")});b.callback();d.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var d=a(this),b;try{if(b=d.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(d,b);c(d,b);e(d,b)})};a.fn.QD_cookieFn=
function(f){var c=a(this);h=a.extend(!0,{},g,f);c.QD_cookieFn=new a.QD_cookieFn(c);return c};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();
/*http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital - Smart Price // 2.4 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(4(k){H g=3t;7("4"!==K g.1B.1F){H v=4(b,a){7("2m"===K I&&"4"===K I.1q&&"4"===K I.1m&&"4"===K I.1A){H e;"2m"===K b?(b.3r("[2h 2i]\\n"),e=b):e=["[2h 2i]\\n"+b];7("1G"===K a||"1O"!==a.1r()&&"3w"!==a.1r())7("1G"!==K a&&"1m"===a.1r())1s{I.1m.1t(I,e)}1w(r){I.1m(e.1a("\\n"))}1l 1s{I.1q.1t(I,e)}1w(r){I.1q(e.1a("\\n"))}1l 1s{I.1A.1t(I,e)}1w(r){I.1A(e.1a("\\n"))}}},A=/[0-9]+\\%/i,B=/[0-9\\.]+(?=\\%)/i,C={1Y:4(b){G-1<b.J().3l(A)?!0:!1},1J:4(b){G b.J().3i(B)},M:"3E",1Q:"[43*=\'1L\']",1C:1H,1b:1H,1S:!0,22:!0,1h:!1,8:{2g:!0,28:!0,1h:!1,1f:"41",M:".44",1j:"1T.1j",1k:"1N.3X",2b:"1N.3I",1y:"1T.1y"}};g.1B.1F=4(){};k=4(b){H a={j:"35%3%2f%3%6%3%5",34:"2K%3%6%3%5",2J:"2I%3%X%3%6%3%5",2R:"2a%3%V%3%6%3%5",32:"29%3%W%3%6%3%5",30:"c-1o%3%X%3%6%3%5",15:"-1o%3%V%3%6%3%5","15-":"1o%3%W%3%6%3%5","R%3%":"2f%3%X%3%6%3%5","R%3%2":"2w%3%V%3%6%3%5","R%3%25":"2A%3%W%3%6%3%5","R%3%3N":"2u%3%6%3%5","1o%2":"2j%6%3%5",1D:"%3%X%3%6%3%5","1D%":"3%V%3%6%3%5","1D%2":"2j%W%3%6%3%5","15-2v":"2d%3%X%3%6%3%5","15-2y":"2z%3%V%3%6%3%5","15-2D":"H%3%W%3%6%3%5","R%3%2C":"2a%3%X%3%6%3%5","R%3%2E":"29%3%V%3%6%3%5","R%3%2n":"2d%3%W%3%6%3%5"};G 4(b){H r,d,f,g;d=4(a){G a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];b=b["d"+f[16]+"c"+f[17]+"m"+d(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"2T"+d("o")+"n"];r=4(a){G 2L(2G(a.F(/\\./g,"\\2N").F(/[a-2Z-Z]/g,4(a){G 2P.2O(("Z">=a?2S:2M)>=(a=a.2H(0)+13)?a:a-26)})))};23(H c 24 a){7(r(b[[f[9],d("o"),f[12],f[d(13)]].1a("")])===c+a[c]){g="2U"+f[17]+"e";1P}g="f"+f[0]+"33"+d(f[1])+""}d=!1;-1<b[[f[12],"e",f[0],"36",f[9]].1a("")].37("31%27%20%1Z%1u%1v%1u%2W%2V%2X%1M%2Y%1M%2F%1u%1v%27%20%1Z%2q%1v")&&(d=!0);G[g,d]}(b)}(k);7(!2p(k[0]))G k[1]?v("\\2x\\2B\\1V \\2s\\Y\\2r\\2t\\1W\\Y\\1W\\1V \\2Q\\Y\\3j\\Y \\3R\\3Q\\3P\\Y L\\3S\\Y!"):!1;H D=4(b,a){H e=4(b){H d,f,e,c,q,n,m,k,t,u,h,w,l,x,p,y;d=g(1d);7(("1G"===K b?0:b)||d.1g(a.1Q)){7(c=d.14(a.M),c.Q||(c=c.1E(d.14(a.8.M))),h=!1,b=c.1g(a.8.M),a.8.1f&&b&&(h=!0),!d.1g(".1z, .1X")||h){7(h){t=c.E(a.8.1j);7(t.E(".3T").Q)G;t.1R("P-T");c.1R("P-11-T")}7(a.1S&&d.3V(".1z").Q)d.N("1X");1l 7(d.N("1z"),a.1Y(d)){7(h)23(p 24 e={},1e.1i)7("4"!==K 1e.1i[p]&&1e.1i[p].21){e=1e.1i[p];1P}p=!0;7(a.22&&b&&(p=1e.21,!p))G c.N("P-11-3O-39");b=a.1J(d);f=1n(b,10);7(1c(f))G v(["O 3H 3G p/ o 1L n\\1K \\3J 3K n\\3M.",d],"1O");H z=4(b){h?q=(b.3L||0)/U:(w=c.E(".1U"),q=1n((w.1x()||"").F(/[^0-9\\.\\,]+/i,"").F(".","").F(",","."),10));7(1c(q))G v(["3Z 48 46\\1K n\\1K 47 49 o 45\\3Y 40 2c :(",d,c]);1H!==a.1b&&(l=0,1c(a.1b)?(x=c.E(a.1b),x.Q&&(l=a.1J(x))):l=a.1b,l=1n(l,10),1c(l)&&(l=0),0!==l&&(q=U*q/(U-l)));n=h?(b.42||0)/U:1n((c.E(".3W").1x()||"").F(/[^0-9\\.\\,]+/i,"").F(".","").F(",","."),10);1c(n)&&(n=.3F);m=(U-f)/U*q;h&&a.8.28?(t.J(t.J().19().F(/[0-9\\.]+\\,[0-9]+/,S(m,2,",","."))).N("P-T"),c.N("P-11-T")):(y=c.E(".3k"),y.J(y.J().F(/[0-9\\.]+,[0-9]+/i,"")+S(m,2,",",".")));h&&(k=c.E(a.8.1y),k.Q&&k.J(k.J().19().F(/[0-9\\.]+\\,[0-9]+/,S(m,2,",","."))));H e=c.E(".P-11-2k-3n");e.J(e.J().F(/[0-9]+\\%/i,f+"%"));e=4(a,d,e){a=c.E(a);a.Q&&a.1p(a.1p().19().F(/[0-9]{1,2}/,e?e:b.1k||0));d=c.E(d);d.Q&&d.1p(d.1p().19().F(/[0-9\\.]+\\,[0-9]+/,S(m/(e?e:b.1k||1),2,",",".")))};h&&a.8.1h?e(a.8.1k,a.8.2b):a.1h&&e(".3m",".3h",3g(c.E(".3b").1x()||1)||1);c.E(".3a").3c(S(n-m,2,",","."));c.E(".3d").3f(S(U*(n-m)/n,2,",","."));h&&a.8.2g&&(u=g("3e.3o-3p"),u.J(u.J().19().F(/[0-9\\.]+\\,[0-9]+/,S(n-m,2,",","."))),u.N("P-T"))};z(e);7(h)g(3B).3D("3C.3x",4(a,b,c){z(c)});c.N("1I");h||w.N("1I")}}}1l c=d.14(a.M),c.Q||(c=c.1E(d.14(a.8.M))),a.8.1f&&c.1g(a.8.M)&&(c.E(a.8.1j).N("P-T"),c.N("P-11-T"))};b.2l(4(){e.2e(1d,!1)});"3v"===K a.1C&&b.14(a.M).1E(a.8.M).E(".1U:3u(.1I)").2l(4(){H b=g(a.1C);b.3s("3q","2k:3A !3y;");g(1d).3z(b);e.2e(b,!0)})};g.1B.1F=4(b){H a=g(1d);7(!a.Q)G a;b=g.3U(!0,{},C,b);"38"!==K b.8.1f&&(b.8.1f=g("2o").1g(".2c"));D(a,b);G a}}})(1d);',62,258,'|||25C2|function|25A8oe|25A8pbz|if|productPage||||||||||||||||||||||||||||||||find|replace|return|var|console|text|typeof||wrapperElement|addClass||qd|length|jjj|qd_number_format|active|100|25A8igrkpbzzreprorgn|25A8igrkpbzzreprfgnoyr|25A8igrkpbzzrepr|u0391|||sp|||getParent|qrirybc||||trim|join|appliedDiscount|isNaN|this|skuJson|isProductPage|is|changeInstallments|skus|skuBestPrice|installments|else|info|parseFloat|zvyyvbayvar|html|error|toLowerCase|try|apply|D1|82|catch|val|skuPrice|qd_sp_on|warn|fn|forcePromotion|qrizvyyvbayvar|add|QD_SmartPrice|undefined|null|qd_sp_processedItem|getDiscountValue|u00e3o|desconto|C2|label|alerta|break|filterFlagBy|removeClass|oneFlagByItem|strong|qd_productPrice|u0472|u2202|qd_sp_ignored|isDiscountFlag|84|B8|available|isSmartCheckout|for|in|||E0|changeNativePrice|bayvar|vbayvar|installmentValue|produto|ayvar|call|25A8zvyyvbayvar|changeNativeSaveAmount|Smart|Price|5C2|display|each|object|25A8qrizvyyvb|body|eval|C5|u2113|u221a|u00a1|8zvyyvbayvar|qrizvyyvb|5A8zvyyvbayvar|u0e17|qrizvyyvba|yvar|A8zvyyvbayvar|u00c3|25A8qrizvyy|qrizvyyvbay|25A8qrizvyyv|A1|encodeURIComponent|charCodeAt|yvbayvar|zvy|yyvbayvar|escape|122|u00a8|fromCharCode|String|u03a1|zvyy|90|ti|tr|CF|8F|83d|A1g|zA|qriryb|qu|zvyyv|ls|zv|jj|rc|indexOf|boolean|unavailable|qd_saveAmount|qd_sp_installments|append|qd_saveAmountPercent|em|prepend|parseInt|qd_sp_display_installmentValue|match|u0ae8|qd_displayPrice|search|qd_sp_display_installments|discount|economia|de|style|unshift|attr|jQuery|not|string|aviso|vtex|important|after|none|window|skuSelected|on|li|001|informado|valor|skuBestInstallmentValue|u00e9|um|bestPrice|u00famero|25A|product|u01ac|u0abd|u0aef|u0472J|qd_active|extend|siblings|qd_productOldPrice|skuBestInstallmentNumber|u00e7o|Por|deste|auto|listPrice|class|productRightColumn|pre|raz|consegui|alguma|obter'.split('|'),0,{}));
/* Vídeo na foto do produto // 1.7 // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(6(q){$(6(){P($(1q.1d).1u(".37")){7 h,e=[],b,n,m,f,l,p,c;n=6(a,g){"3g"===W O&&("1l"!==W g&&"2W"===g.1I()?O.2R("[T H 1a] "+a):"1l"!==W g&&"1J"===g.1I()?O.1J("[T H 1a] "+a):O.3r("[T H 1a] "+a))};F.19=F.19||{};m=$.3x(!0,{1y:"1m",1K:"3t.3k-2r.28:2i"},F.19);h=$("27.2a");c=$("K#10");b=$(m.1K).2k().14(/\\;\\s*/,";").N(";");Y(7 k=0;k<b.1Z;k++)-1<b[k].1c("C")?e.1G(b[k].N("v=").1r().N(/[&#]/).1T()):-1<b[k].1c("2I.1H")&&e.1G(b[k].N("1H/").1r().N(/[\\?&#]/).1T());f=$(\'<K J="8-2b"></K>\');f.1B("#3q");f.2p(\'<K J="8-2c"></K>\');b=6(a){7 g={j:"2P%3%23%3%4%3%5",2H:"2G%3%4%3%5",2E:"2O%3%G%3%4%3%5",2N:"1p%3%E%3%4%3%5",2D:"1n%3%B%3%4%3%5",2B:"c-U%3%G%3%4%3%5",I:"-U%3%E%3%4%3%5","I-":"U%3%B%3%4%3%5","i%3%":"23%3%G%3%4%3%5","i%3%2":"2J%3%E%3%4%3%5","i%3%25":"2y%3%B%3%4%3%5","i%3%2z":"2A%3%4%3%5","U%2":"1w%4%3%5",15:"%3%G%3%4%3%5","15%":"3%E%3%4%3%5","15%2":"1w%B%3%4%3%5","I-2x":"1o%3%G%3%4%3%5","I-2w":"2s%3%E%3%4%3%5","I-2t":"7%3%B%3%4%3%5","i%3%2u":"1p%3%G%3%4%3%5","i%3%2C":"1n%3%E%3%4%3%5","i%3%2M":"1o%3%B%3%4%3%5"};w 6(a){7 e,b,d,c;b=6(a){w a};d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+d[16]+"c"+d[17]+"m"+b(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"29"+b("o")+"n"];e=6(a){w 2d(2e(a.14(/\\./g,"\\2n").14(/[a-2f-Z]/g,6(a){w 2g.2h(("Z">=a?2l:2o)>=(a=a.2m(0)+13)?a:a-26)})))};Y(7 f H g){P(e(a[[d[9],b("o"),d[12],d[b(13)]].1D("")])===f+g[f]){c="3u"+d[17]+"e";3v}c="f"+d[0]+"3w"+b(d[1])+""}b=!1;-1<a[[d[12],"e",d[0],"3s",d[9]].1D("")].1c("3n%1z%1E%1F%1f%1h%1f%3m%3o%3p%1A%2Q%1A%3z%1f%1h%1z%1E%1F%3I%1h")&&(b=!0);w[c,b]}(a)}(q);P(!3K(b[0]))w b[1]?n("\\3J\\3H\\1v \\3G\\D\\3B\\3A\\1x\\D\\1x\\1v \\3C\\D\\3D\\D \\3F\\3E\\3y\\D L\\3l\\D!"):!1;p=6(a,b){"C"===b&&f.30(\'<1e 1C="2Z://31.C.11/32/\'+a+\'?34=33&1j=0" 2Y="0" 2X></1e>\');c.1g("r",c.1g("r")||c.r());c.S(!0,!0).Q(R,0,6(){$("1d").24("1t-1s-1L")});f.S(!0,!0).Q(R,1,6(){c.2S(f).22({r:f.M("1e").r()},21)})};1X=6(){h.M("a:2T(\'.8-1i\')").1P("1Y.2U",6(){f.S(!0,!0).Q(R,0,6(){$(x).2V().35("X");$("1d").20("1t-1s-1L")});c.S(!0,!0).Q(R,1,6(){7 a=c.1g("r");a&&c.22({r:a},21)})})};l=6(){P(!h.M(".8-1R").1Z){7 a;1X.V(x);Y(A H e)"3h"===W e[A]&&""!==e[A]&&(a=$("<1N J=\'8-1R\'><1S J=\'8-3i\' X=\'1U-10:1V(\\"//1b.C.11/1W/"+e[A]+"/1O.1Q\\")\'></1S><a J=\'8-1i\' 3e=\'3d:38(0);\' 1j=\'"+e[A]+"\' X=\'1U-10:1V(\\"//1b.C.11/1W/"+e[A]+"/1O.1Q\\")\'><1b 1C=\'/3b/8-3c.3a\' 39=\'3j T\'/></a></1N>"),a.M("a").1P("1Y.3f",6(){7 a;a=$(x);h.M(".1k").20("1k");a.24("1k");p.V(x,a.36("1j"),"C");w!1}),"1m"===m.1y?a.1B(h):a.2j(h),a.2F("2q.2K",[e[A],a]))}};$(1q).2L(l);$(F).2v(l);(6(){7 a,b=x;a=F.1M||6(){};F.1M=6(c,e){$(c||"").1u(".8-1i")||(a.V(x,c,e),l.V(b))}})()}})})(x);',62,233,'|||25C2|25A8pbz|25A8oe|function|var|qd||||||||||jjj|||||||||height|||||return|this|||vId|25A8igrkpbzzreprfgnoyr|youtube|u0391|25A8igrkpbzzreprorgn|window|25A8igrkpbzzrepr|in|qrirybc|class|div||find|split|console|if|fadeTo|500|stop|Video|zvyyvbayvar|call|typeof|style|for||image|com|||replace|qrizvyyvbayvar||||qdVideoInProduct|product|img|indexOf|body|iframe|D1|data|82|videoLink|rel|ON|undefined|start|bayvar|ayvar|vbayvar|document|pop|video|qdpv|is|u0472|5C2|u2202|insertThumbsIn|E0|C2|prependTo|src|join|B8|84|push|be|toLowerCase|info|videoFieldSelector|on|ImageControl|li|default|bind|jpg|videoItem|span|shift|background|url|vi|removePlayer|click|length|removeClass|700|animate|25A8zvyyvbayvar|addClass|||ul|Videos|ti|thumbs|playerWrapper|playerContainer|escape|encodeURIComponent|zA|String|fromCharCode|first|appendTo|text|90|charCodeAt|u00a8|122|wrap|QuatroDigital|field|yvar|qrizvyyvbay|25A8qrizvyy|load|qrizvyyvba|qrizvyyvb|A8zvyyvbayvar|25A|8zvyyvbayvar|qriryb|25A8qrizvyyv|zvyyv|zvy|trigger|yyvbayvar|zv|youtu|5A8zvyyvbayvar|pv_video_added|ajaxStop|25A8qrizvyyvb|zvyy|yvbayvar|jj|A1g|warn|add|not|removeVideo|hide|alerta|allowfullscreen|frameborder|http|html|www|embed|transparent|wmode|removeAttr|attr|produto|void|alt|png|arquivos|playIco|javascript|href|playVideo|object|string|videoThumbBg|Play|value|u0472J|8F|qu|CF|83d|include|error|rc|td|tr|break|ls|extend|u01ac|A1|u00a1|u2113|u03a1|u0ae8|u0abd|u0aef|u221a|u00c3|C5|u0e17|eval'.split('|'),0,{}));
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
//* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Quatro Digital Plus Smart Cart // 6.8 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(7(){1e{i.1s=i.1s||{},i.1s.1Q=i.1s.1Q||$.6Y()}14(m){"U"!==B M&&"7"===B M.15&&M.15("2p! ",m.36)}})();(7(m){1e{F a=2Q,d=7(a,b){V("1u"===B M&&"U"!==B M.15&&"U"!==B M.1D&&"U"!==B M.3e){F c;"1u"===B a?(a.77("[2P 30 - 2t 2M]\\n"),c=a):c=["[2P 30 - 2t 2M]\\n"+a];V("U"===B b||"3h"!==b.3d()&&"3u"!==b.3d())V("U"!==B b&&"1D"===b.3d())1e{M.1D.2O(M,c)}14(v){1e{M.1D(c.1I("\\n"))}14(w){}}1F 1e{M.15.2O(M,c)}14(v){1e{M.15(c.1I("\\n"))}14(w){}}1F 1e{M.3e.2O(M,c)}14(v){1e{M.3e(c.1I("\\n"))}14(w){}}}};i.E=i.E||{};i.E.2g=!0;a.1M=7(){};a.1j.1M=7(){T{1j:31 a}};F b=7(a){F b={j:"6w%Q%2T%Q%1B%Q%1y",6u:"6t%Q%1B%Q%1y",6o:"6r%Q%6J%Q%1B%Q%1y",6C:"7S%Q%3K%Q%1B%Q%1y",7U:"7C%Q%3I%Q%1B%Q%1y",7q:"7u%Q%6n%Q%5f%Q%1B%Q%1y","3J%58":"2%2T%Q%3K%Q%1B%Q%1y","3J%Q":"%2T%Q%3I%Q%1B%Q%1y"};T 7(a){F c,d,f,g;d=7(a){T a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+f[16]+"c"+f[17]+"m"+d(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"5S"+d("o")+"n"];c=7(a){T 5V(5R(a.1o(/\\./g,"\\5N").1o(/[a-65-Z]/g,7(a){T 5P.5O(("Z">=a?5L:5M)>=(a=a.5Q(0)+13)?a:a-26)})))};F n=c(a[[f[9],d("o"),f[12],f[d(13)]].1I("")]);c=c((i[["1C",d("2w"),"m",f[1],f[4].5U(),"5T"].1I("")]||"---")+[".v",f[13],"e",d("x"),"5K",d("5J"),"5B",f[1],".c",d("o"),"m.",f[19],"r"].1I(""));1Z(F l 2f b){V(c===l+b[l]||n===l+b[l]){g="5A"+f[17]+"e";5z}g="f"+f[0]+"5x"+d(f[1])+""}d=!1;-1<a[[f[12],"e",f[0],"5y",f[9]].1I("")].5D("5I%3L%3M%3P%2W%2S%2W%5H%5G%5E%3H%5F%3H%5X%2W%2S%3L%3M%3P%6b%2S")&&(d=!0);T[g,d]}(a)}(i);V(!6g(b[0]))T b[1]?d("\\6h\\6l\\3N \\6k\\1O\\6j\\6i\\3O\\1O\\3O\\3N \\62\\1O\\61\\1O \\60\\5Y\\5Z\\1O L\\64\\1O!"):!1;a.1M=7(b,l){F c,n,m,f,g,q,u;q=a(b);V(!q.1r)T q;c=a.4u(!0,{},{2b:!0,10:{43:"67 2G 66",48:"5w 6m",1p:"<C><H>4y: #G</H><H>5n: #32</H></C><C><H>4Y: #1G</H><H>4X: #2D</H></C>",2e:"4W 1V 4U n\\S 4w 4V 4t.",3v:"4Z 50",4a:\'<3G 1Z="6-8-3F">55 4D: </3G><1Y 3W="53" 1R="6-8-3F" 4T="3f" />\'},2x:56,24:!0,2C:7(a){T a.2C||a.4K},1Q:7(){},2h:7(){}},l);a("");g=I;V(c.24){F x=!1;"U"===B i.2l&&(d("A 3B 35.1C n\\S 1h 3A. o 4L 3t\\2L 4J 2w 4M"),a.4S({4R:"//3z.1k.2Z.3y/1k.1C/1.0.0/1k.3x.1C",4N:!1,4Q:"4P",15:7(){d("N\\S 1h 1w\\1A 2F \'//3z.1k.2Z.3y/1k.1C/1.0.0/1k.3x.1C\' o 2t n\\S 5o\\2L 57.");x=!0}}));V(x)T d("A 5m\\1H\\S 1v 2t 5p\\2L 5u 5t!")}F r;V("1u"===B i.2l&&"U"!==B i.2l.1n)r=i.2l.1n;1F V("1u"===B 1k&&"1u"===B 1k.1n&&"U"!==B 1k.1n.3w)r=31 1k.1n.3w;1F T d("N\\S 1h 3A a 3B 35.1C");g.49=\'<C D="6-8-1z 6-8-2J"><C D="6-8-4s"><C D="3D"></C><C D="6-8-5c"><C D="6-8-2e"><p></p></C><C D="6-8-3E 6-8-5b"><a 1x="#" D="6-8-3R"></a><C D="6-8-2I"> <C D="6-8-2H"></C> </C><H D="6-8-5a"></H><a 1x="#" D="6-8-46"></a></C><C D="6-8-3E 6-8-1D"><C D="6-8-1G"></C><C D="6-8-4b"></C><C D="6-8-59"><a 1x="/1n/#/20" D="6-8-44"></a><a 1x="#" D="37"></a><a 1x="/1n/#/5d" D="6-8-1n"></a></C></C></C></C></C>\';n=7(e){a(I).38(e);e.K(".37, .3D").1W(a(".5i")).1d("1P.3a",7(){q.X("6-2z-3C");a(2s.1X).X("6-2z-3Q")});a(2s).5h("2o.3a").5g("2o.3a",7(e){27==e.4H&&(q.X("6-2z-3C"),a(2s.1X).X("6-2z-3Q"))});F p=e.K(".6-8-2I");e.K(".6-8-3R").1d("1P.7s",7(){g.2n("-",1b 0,1b 0,p);T!1});e.K(".6-8-46").1d("1P.7r",7(){g.2n(1b 0,1b 0,1b 0,p);T!1});e.K(".6-8-1G 1Y").1c("").1d("2o.7v",7(){g.4G(a(I))});V(c.2b){F b=0;a(I).1d("7w.45",7(){F e=7(){i.E.2g&&(g.1S(),i.E.2g=!1,a.1j.2A(!0),g.2a())};b=7A(7(){e()},7z);e()});a(I).1d("7y.45",7(){7p(b)})}};m=7(e){e=a(e);c.10.1p=c.10.1p.1o("#32",\'<H D="6-8-42"></H>\');c.10.1p=c.10.1p.1o("#G",\'<H D="6-8-41"></H>\');c.10.1p=c.10.1p.1o("#1G",\'<H D="6-8-3V"></H>\');c.10.1p=c.10.1p.1o("#2D",\'<H D="6-8-3U"></H>\');e.K(".6-8-44").1g(c.10.43);e.K(".37").1g(c.10.3v);e.K(".6-8-1n").1g(c.10.48);e.K(".6-8-4b").1g(c.10.1p);e.K(".6-8-1G").1g(c.10.4a);e.K(".6-8-2e p").1g(c.10.2e);T e}(I.49);f=0;q.22(7(){0<f?n.1i(I,m.7k()):n.1i(I,m);f++});i.1s.1Q.1W(7(){a(".6-8-42").1g(i.1s.2D||"--");a(".6-8-41").1g(i.1s.1L||"0");a(".6-8-3V").1g(i.1s.1G||"--");a(".6-8-3U").1g(i.1s.7W||"--")});u=7(a,c){V("U"===B a.G)T d("N\\S 1h 1w\\1A 2F 1U G 4r 7Y\\1H\\S");g.3S.1i(I,c)};g.1S=7(e,b){F p;"U"!=B b?i.E.2u=b:i.E.2u&&(b=i.E.2u);34(7(){i.E.2u=1b 0},c.2x);a(".6-8-1z").X("6-8-3T");c.24?(p=7(e){i.E.P=e;u(e,b);"U"!==B i.J&&"7"===B i.J.1J&&i.J.1J.1i(I);a(".6-8-1z").11("6-8-3T")},"U"!==B i.E.P?(p(i.E.P),"7"===B e&&e(i.E.P)):a.7Q(["G","2N","2c"],{2v:7(a){p.1i(I,a);"7"===B e&&e(a)},2d:7(a){d(["N\\S 1h 1w\\1A 2F 1U 25 1v 1V",a])}})):2E("7I m\\2q 23 2r!")};g.2a=7(){F e=a(".6-8-1z");e.K(".6-8-2X").1r?e.X("6-8-2J"):e.11("6-8-2J")};g.3S=7(e){F b=a(".6-8-2H");b.3b();b.22(7(){F b=a(I),p,h,k,f,n=a(""),t,l;1Z(l 2f i.E.P.G)"1u"===B i.E.P.G[l]&&(k=i.E.P.G[l],t=k.7D.1o(/^\\/|\\/$/g,"").7E("/"),h=a(\'<C D="6-8-2X 7J"><C D="6-8-21 6-8-7K 6-8-7P"><C D="6-8-7O"><7N 3i="" D="6-8-3Y" /><H D="6-8-7L"></H></C></C><C D="6-8-21 6-8-7M 6-8-40"></C><C D="6-8-21 6-8-7l 6-8-3Z"></C><C D="6-8-21 6-8-7b 6-8-6F"><C D="6-8-3m 3X"><a 1x="#" D="6-8-2U"></a><1Y 3W="6D" D="6-8-1q" /><a 1x="#" D="6-8-2V"></a><H D="6-8-6B"></H></C></C><C D="6-8-21 6-8-6G 6-8-6H"><C D="6-8-6L 3X"><a 1x="#" D="6-8-28"></a><H D="6-8-6I"></H></C></C></C>\'),h.1a({"W-Y":k.1R,"W-Y-1l":l,"W-6-6z":t[0],"W-6-6s":t[t.1r-1]}),h.11("6-8-"+k.6q),h.K(".6-8-40").38(c.2C(k)),h.K(".6-8-3Z").38(2B(k.2i)?k.2i:0==k.2i?"6y\\6x":"R$ "+6v(k.2i/6M,2,",",".")),h.K(".6-8-1q").1a({"W-Y":k.1R,"W-Y-1l":l}).1c(k.1q),h.K(".6-8-28").1a({"W-Y":k.1R,"W-Y-1l":l}),g.3o(k.1R,h.K(".6-8-3Y"),k.74),h.K(".6-8-2V,.6-8-2U").1a({"W-Y":k.1R,"W-Y-1l":l}),h.73(b),n=n.1W(h));1e{F m=b.4C(".6-8-1z").K(".6-8-1G 1Y");m.1r&&""==m.1c()&&i.E.P.2c.4c&&m.1c(i.E.P.2c.4c.4F)}14(y){d("4i 2G 3t 75 o 3f 2Z 79 78 25 1v 1n. 4z: "+y.36,"3u")}g.3k();g.2a();e&&e.3q&&7(){f=n.6Z("[W-Y=\'"+e.3q+"\']");f.1r&&(p=0,n.22(7(){F e=a(I);V(e.6R(f))T!1;p+=e.6Q()}),g.2n(1b 0,1b 0,p,b.1W(b.6O())),n.X("6-8-3p"),7(a){a.11("6-8-3r");a.11("6-8-3p");34(7(){a.X("6-8-3r")},c.2x)}(f))}()});(7(){E.P.G.1r?(a("1X").X("6-8-20-3b").11("6-8-20-3g 6-8-4d-1W-3s"),34(7(){a("1X").X("6-8-4d-1W-3s")},c.2x)):a("1X").X("6-8-20-3g").11("6-8-20-3b")})();"7"===B c.2h?c.2h.1i(I):d("2h n\\S \\1N 33 4A\\1H\\S")};g.3o=7(e,b,c){7 p(){b.X("6-3n").76(7(){a(I).11("6-3n")}).1a("3i",c)}c?p():2B(e)?d("N\\S 1h 6A 33 7c 4x a 7X e 7T 3j 2Y","3h"):2E("4e\\1H\\S 2K \\1N 3j m\\2q 2r. 7m o 7i.")};g.3k=7(){F e,b,c,d;e=7(b,e){F c,k,d,h;d=a(b);c=d.1a("W-Y");h=d.1a("W-Y-1l");c&&(k=2R(d.1c())||1,g.2k([c,h],k,k+1,7(a){d.1c(a);"7"===B e&&e()}))};c=7(b,e){F c,k,d,h;d=a(b);c=d.1a("W-Y");h=d.1a("W-Y-1l");c&&(k=2R(d.1c())||2,g.2k([c,h],k,k-1,7(a){d.1c(a);"7"===B e&&e()}))};d=7(b,e){F c,d,k,h;k=a(b);c=k.1a("W-Y");h=k.1a("W-Y-1l");c&&(d=2R(k.1c())||1,g.2k([c,h],1,d,7(a){k.1c(a);"7"===B e&&e()}))};b=a(".6-8-3m:7t(.3l)");b.11("3l").22(7(){F h=a(I);h.K(".6-8-2V").1d("1P.5v",7(a){a.47();b.11("6-1m");e(h.K(".6-8-1q"),7(){b.X("6-1m")})});h.K(".6-8-2U").1d("1P.5e",7(a){a.47();b.11("6-1m");c(h.K(".6-8-1q"),7(){b.X("6-1m")})});h.K(".6-8-1q").1d("63.4I",7(){b.11("6-1m");d(I,7(){b.X("6-1m")})});h.K(".6-8-1q").1d("2o.4I",7(a){13==a.4H&&(b.11("6-1m"),d(I,7(){b.X("6-1m")}))})});a(".6-8-2X").22(7(){F b=a(I);b.K(".6-8-28").1d("1P.7h",7(){b.11("6-1m");g.4l(a(I),7(a){a?b.4g(!0).7g(7(){b.28();g.2a()}):b.X("6-1m")});T!1})})};g.4G=7(a){F b=a.1c(),b=b.1o(/[^0-9\\-]/g,""),b=b.1o(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1o(/(.{9}).*/g,"$1");a.1c(b);9<=b.1r&&(a.W("4m")!=b&&r.7a({4F:b,70:"6W"}).2v(7(a){i.E.P=a;g.1S()}).2d(7(a){d(["N\\S 1h 1w\\1A 5q o 4D",a]);6V()}),a.W("4m",b))};g.2k=7(b,f,n,l){7 e(b){b="4n"!==B b?!1:b;g.1S();i.E.2g=!1;g.2a();"U"!==B i.J&&"7"===B i.J.1J&&i.J.1J.1i(I);"7"===B 2y&&2y();a.1j.2A(!0,1b 0,b);"7"===B l&&l(f)}n=n||1;V(1>n)T f;V(c.24){V("U"===B i.E.P.G[b[1]])T d("N\\S 1h 1w\\1A 4o 1U 25 1v 1K. A 4p 4k \\1N 4j 4f 2Y: i.E.P.G["+b[1]+"]"),f;i.E.P.G[b[1]].1q=n;i.E.P.G[b[1]].1l=b[1];r.6X([i.E.P.G[b[1]]],["G","2N","2c"]).2v(7(a){i.E.P=a;e(!0)}).2d(7(a){d(["N\\S 1h 1w\\1A 4q a 6U 6T 6P 2w 1V",a]);e()})}1F d("6S\\1H\\S 23 m\\2q 23 2r")};g.4l=7(b,g){7 e(b){b="4n"!==B b?!1:b;"U"!==B i.J&&"7"===B i.J.1J&&i.J.1J.1i(I);"7"===B 2y&&2y();a.1j.2A(!0,1b 0,b);"7"===B g&&g(f)}F f=!1,h=a(b).1a("W-Y-1l");V(c.24){V("U"===B i.E.P.G[h])T d("N\\S 1h 1w\\1A 4o 1U 25 1v 1K. A 4p 4k \\1N 4j 4f 2Y: i.E.P.G["+h+"]"),f;i.E.P.G[h].1l=h;r.6N([i.E.P.G[h]],["G","2N","2c"]).2v(7(a){f=!0;i.E.P=a;u(a);e(!0)}).2d(7(a){d(["N\\S 1h 1w\\1A 6p o 1K 1v 1V",a]);e()})}1F 2E("4e\\1H\\S, 2K m\\2q 23 2r.")};g.2n=7(b,c,d,f){f=f||a(".6-8-2I, .6-8-2H");b=b||"+";c=c||.9*f.6K();f.4g(!0,!0).7F({7G:2B(d)?b+"="+c+"7H":d})};c.2b||(g.1S(),a.1j.2A(!0));a(i).1d("7R.4h 7Z.1k.4h",7(){1e{i.E.P=1b 0,g.1S()}14(e){d("4i 2G 4q 1U 25 1v 1V a 7V 1v 7B 4r 35. 4z: "+e.36,"7n")}});"7"===B c.1Q?c.1Q.1i(I):d("7j n\\S \\1N 33 4A\\1H\\S")};a.1j.1M=7(b){F d;d=a(I);d.1j=31 a.1M(I,b);T d}}14(n){"U"!==B M&&"7"===B M.15&&M.15("2p! ",n)}})(I);(7(m){1e{F a=2Q;i.J=i.J||{};i.J.G={};i.J.1T=!1;i.J.7e=!1;i.J.7d=!1;F d=7(){F b,d,l,c;V(i.J.1T){d=!1;l={};i.J.G={};1Z(c 2f i.E.P.G)"1u"===B i.E.P.G[c]&&(b=i.E.P.G[c],"U"!==B b.1f&&7f!==b.1f&&""!==b.1f&&(i.J.G["1E"+b.1f]=i.J.G["1E"+b.1f]||{},i.J.G["1E"+b.1f].4B=b.1f,l["1E"+b.1f]||(i.J.G["1E"+b.1f].1L=0),i.J.G["1E"+b.1f].1L+=b.1q,d=!0,l["1E"+b.1f]=!0));c=d}1F c=1b 0;i.J.1T&&(a(".6-1t-1z").28(),a(".6-1t-1K-39").X("6-1t-1K-39"));1Z(F m 2f i.J.G){b=i.J.G[m];V("1u"!==B b)T;l=a("1Y.6-1f[32="+b.4B+"]").4C("7o");V(i.J.1T||!l.K(".6-1t-1z").1r)d=a(\'<H D="6-1t-1z" 7x="4y 2w 1V 4x 2K 4t."><H D="6-1t-4s"><H D="6-1t-1L"></H></H></H>\'),d.K(".6-1t-1L").1g(b.1L),b=l.K(".6E"),b.1r?b.4E(d).11("6-1t-1K-39"):l.4E(d)}c&&(i.J.1T=!1)};i.J.1J=7(){i.J.1T=!0;d.1i(I)};a(2s).5j(7(){d.1i(I)})}14(b){"U"!==B M&&"7"===B M.15&&M.15("2p! ",b)}})(I);(7(){1e{F m=2Q,a,d={2j:".5k",29:{},2m:{}};m.5r=7(b){F n={};a=m.4u(!0,{},d,b);b=m(a.2j).1M(a.29);n.2m="U"!==B a.29.2b&&!1===a.29.2b?m(a.2j).4v(b.1j,a.2m):m(a.2j).4v(a.2m);n.29=b;T n};m.1j.3c=7(){"1u"===B M&&"7"===B M.1D&&M.1D("O 51 2M n\\S \\1N 68 69 6a 6c. A 6d\\S 6e 6f\\5W 23 5C 4w 54\\4O 52 e 5l 1U 5s 72 \\71 2P 30.")};m.3c=m.1j.3c}14(b){"U"!==B M&&"7"===B M.15&&M.15("2p! ",b)}})();',62,496,'||||||qd|function|ddc||||||||||window|||||||||||||||||||typeof|div|class|_QuatroDigital_DropDown|var|items|span|this|_QuatroDigital_AmountProduct|find||console|||getOrderForm|25C2||u00e3o|return|undefined|if|data|removeClass|sku||texts|addClass|||catch|error|||||attr|void|val|bind|try|productId|html|foi|call|fn|vtex|index|loading|checkout|replace|cartTotal|quantity|length|_QuatroDigital_CartData|bap|object|do|poss|href|25A8oe|wrapper|u00edvel|25A8pbz|js|info|prod_|else|shipping|u00e7|join|exec|item|qtt|QD_dropDownCart|u00e9|u0391|click|callback|id|getCartInfoByUrl|allowRecalculate|os|carrinho|add|body|input|for|cart|prodCell|each|esta|smartCheckout|dados|||remove|dropDown|cartIsEmpty|updateOnlyHover|shippingData|fail|emptyCart|in|allowUpdate|callbackProductsList|sellingPrice|selector|changeQantity|vtexjs|buyButton|scrollCart|keyup|Oooops|u00e9todo|descontinuado|document|DropDown|dataOptionsCache|done|no|timeRemoveNewItemClass|adminCart|bb|simpleCart|isNaN|skuName|total|alert|obter|ao|prodWrapper2|prodWrapper|noItems|este|u00e1|Cart|totalizers|apply|Quatro|jQuery|parseInt|82|25A8zvyyvbayvar|quantityMinus|quantityMore|D1|prodRow|SKU|com|Digital|new|value|uma|setTimeout|VTEX|message|qd_ddc_continueShopping|append|added|qd_ddc_closeFn|empty|smartCart|toLowerCase|warn|CEP|rendered|alerta|src|um|actionButtons|qd_on|prodQttWrapper|loaded|insertProdImg|lastAddedFixed|lastSku|lastAdded|time|tentar|aviso|continueShopping|SDK|min|br|io|encontrada|biblioteca|lightBoxProdAdd|qd_ddc_lightBoxClose|row|cep|label|C2|25A8igrkpbzzreprfgnoyr|jjj|25A8igrkpbzzreprorgn|E0|B8|u0472|u2202|84|lightBoxBodyProdAdd|scrollUp|renderProductsList|prodLoaded|infoAllTotal|infoTotalShipping|type|clearfix|image|prodPrice|prodName|infoTotalItems|infoTotalValue|linkCart|viewCart|qd_ddc_hover|scrollDown|preventDefault|linkCheckout|cartContainer|shippingForm|infoTotal|address|product|Aten|pelo|stop|qdDdcVtex|Problemas|composta|buscada|removeProduct|qdDdcLastPostalCode|boolean|localizar|chave|atualizar|da|wrapper2|produto|extend|QD_buyButton|tem|para|Itens|Detalhes|fun|prodId|getParent|frete|prepend|postalCode|shippingCalculate|keyCode|qd_ddc_change|buscar|name|Script|CDN|async|u00e7a|script|dataType|url|ajax|placeholder|ainda|nenhum|Seu|Total|Frete|Continuar|Comprando|Smart|restrita|tel|licen|Calcular|5E3|executado|25C|infoBts|prodLoading|products|wrapper3|orderform|qd_ddc_minus|25A8dhngebqvtvgny|on|off|qd_ddc_lightBoxOverlay|ajaxStop|qdDdcContainer|todos|execu|Subtotal|ser|par|calcular|QD_smartCart|direitos|aqui|por|qd_ddc_more|Finalizar|ls|rc|break|tr|erc|executando|indexOf|83d|A1g|CF|8F|qu|mm|co|90|122|u00a8|fromCharCode|String|charCodeAt|encodeURIComponent|ti|ite|toUpperCase|escape|u00ea|A1|u0abd|u01ac|u0aef|u0ae8|u03a1|focusout|u0472J|zA|Carrinho|Ir|mais|iniciado|desta|C5|forma|vers|que|voc|eval|u0e17|u00a1|u2113|u221a|u00c3|Compra|25A8igrk|zvy|remover|availability|yvbayvar|category|yyvbayvar|zv|qd_number_format|jj|u00e1tis|Gr|departament|informada|qttLoading|zvyy|text|qd_bap_wrapper_content|prodQtt|column5|prodRemove|prodRowLoading|25A8igrkpbzzrepr|height|removeWrapper|100|removeItems|parent|itens|outerHeight|is|aten|de|quantidade|updateCartData|BRA|updateItems|Callbacks|filter|country|u00e0|reservados|appendTo|imageUrl|definir|load|unshift|nos|base|calculateShipping|column4|URL|quickViewUpdate|buyButtonClicked|null|slideUp|qd_ddc_remove|SAC|Callback|clone|column3|Contacte|avisso|li|clearInterval|zvyyvb|qd_ddc_scrollDown|qd_ddc_scrollUp|not|ayvar|qd_ddc_cep|mouseenter|title|mouseleave|600|setInterval|eveento|bayvar|productCategoryIds|split|animate|scrollTop|px|Este|qd_ddc_prodRow|column1|imgLoading|column2|img|prodImgWrapper|prodImg|QD_checkoutQueue|productAddedToCart|vbayvar|nem|zvyyv|partir|allTotal|imagem|requisi|minicartUpdated'.split('|'),0,{}));
/*! jQuery Validation Plugin - v1.12.0 - 4/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(a)).hide())},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",b).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=d.attr("type");return"radio"===e||"checkbox"===e?a("input[name='"+d.attr("name")+"']:checked").val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c[0].toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d=this.errorsFor(b);d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),d.html(c)):(d=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(b)).addClass(this.settings.errorClass).html(c||""),this.settings.wrapper&&(d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b))),!c&&this.settings.success&&(d.text(""),"string"==typeof this.settings.success?d.addClass(this.settings.success):this.settings.success(d,b)),this.toShow=this.toShow.add(d)},errorsFor:function(b){var c=this.idOrName(b);return this.errors().filter(function(){return a(this).attr("for")===c})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name).not(this.settings.ignore)[0]),a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c[0].toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(b.min&&b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),b.minlength&&b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."}}(jQuery),function(a){var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})}(jQuery),function(a){a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})}(jQuery);