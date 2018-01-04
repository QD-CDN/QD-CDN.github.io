/*
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});

try {
	var Common = {
		init: function () {
			if($(document.body).is('.qd-black-friday'))
				Common.blackFridayCarousel();

			// Common.newsletterToCrm();
			Common.amazingMenu();
			Common.qdCallSmartCart();
			Common.qdShowSmartCart();
			Common.productCaroussel();
			Common.productOwlCarousel();
			Common.bannerResponsive();
			Common.facebookLikebox();
			Common.boxTelevendasSlider();
			Common.setModalDefaultState();
			Common.saveAmountFix();
			Common.openSearchModal();
			Common.applyAmazingMenuMobile();
			Common.applyTipBarCarousel();

			Common.loginTutorialLink();
			//Common.callDontGoCloseSite();

		},
		ajaxStop: function () {
			Common.saveAmountFix();
		},
		windowOnload: function () {},
		saveAmountFix: function() {
			$(".saveAmountStamp:not(.qd-on,.qdAuto0)").addClass("qd-on").each(function() {
				var $t = $(this);
				$t.text('-' + ($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%').show();
			});
		},
		applyTipBarCarousel: function () {
			var wrapper = $('.tip-bar-qd-v2-carousel >ul');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				draggable: true,
				speed: 1000,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			};

			wrapper.slick($.extend(true, options, (function () {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if (wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 3 };
				return {};
			})()));
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function () { return $(this).prev().clone().wrap('<li></li>').parent() });

			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function () {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function () { return !$(this).closest('ul').is('.qd-amazing-menu'); }).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function () {
						var w = $('.header-qd-v1-amazing-menu-mobile-wrapper');
						w.addClass('qd-am-is-active');
						w.animate({ scrollTop: 0 }, 200);
					});

					wrapper.find('> ul > li > ul > li:first-child').click(function (e) {
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-amazing-menu-trigger').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function () {
				$(document.body).removeClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').append('<div class="header-qd-v1-close-amazing-menu-mobile"></div>');

			$('.header-qd-v1-close-amazing-menu-mobile').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});

			$(".components-qd-v1-overlay").click(function(){
				$("body").removeClass('qd-am-on');
			});
		},
		openSearchModal: function() {
			$('.header-qd-v1-action-search').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		qdShowSmartCart: function() {
			var wrapper = $(".smart-cart-qd-v1-wrapper");

			$(".tpl-cart-dropdown a, .header-qd-v1-cart a, .header-qd-v1-cart-link").click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-on');

				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 245);
			});

			$(".components-qd-v1-overlay, .qd_ddc_lightBoxClose").click(function(evt){
				$(document.body).removeClass('qd-cart-on');
			});
		},
		qdCallSmartCart: function() {
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
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu Carrinho</h3></div>');
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
					buyButton: "body.qd-modal-sku .buy-button"
				}
			});

			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};
		},
		setModalDefaultState: function() {
			var modal = $('.qd-v1-modal');
			modal.on("hidden.bs.modal", function(){
				modal.attr("class", "qd-v1-modal fade");
				modal.find(".modal-body").empty();
				modal.find(".modal-header *:not(.close)").remove();
				modal.find(".modal-header .close").empty();
				modal.find(".modal-footer").empty();
			});
		},
		newsletterToCrm: function() {
			$(window).on("qdNewsSuccessCallback", function(e, data) {
				try {
					$.ajax({
						url: "http://dados.lojasantuarionacional.com.br/vtex-master-data-connect/",
						type: "POST",
						dataType: "json",
						data: {
							e: "CL",
							data: JSON.stringify({
								email: data.postData.newsletterClientEmail,
								isNewsletterOptIn: true
							})
						},
						success: function() {}
					});
				}
				catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
			});
		},
		bannerResponsive: function(){
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
		facebookLikebox: function() {
			$(".facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/lojasantuarionacional" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/lojasantuarionacional"><a href="https://www.facebook.com/lojasantuarionacional">Loja Santuário Nacional</a></blockquote></div></div>');
		},
		amazingMenu:function(){
			$('.navbar-default').QD_amazingMenu();
			// $('.header-qd-v2 .navbar-default').QD_amazingMenu();

			$('.qd-amazing-menu strong').each(function(){
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
			if (!$.fn.owlCarousel)
				return;

			$(".qd-shelf-carousel .prateleira, body.produto .cards-qd-v1-carousel").each(function() {
				$(this).owlCarousel({
					items: 4,
					navigation: true,
					pagination: false
				});
			});
		},
		productCaroussel: function(){
			$(".qd-shelf-carousel .prateleira, .qd-category-collections .prateleira").each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-1').insertBefore(wrap);
				wrap.find(".prateleira >ul").addClass("item");
			});
		},
		boxTelevendasSlider: function() {
			if ($('.store-header-v4 .boxTelevendas').length) {
				$('.store-header-v4 .boxTelevendas').bxSlider({
					minSlides: 1,
					maxSlides: 1,
					mode: 'vertical',
					pager:false,
					useCSS:true,
					infiniteLoop:true
				});
			};
		},
		blackFridayCarousel: function() {
			if (!$.fn.owlCarousel)
				return;

			$(".qd-shelf-carousel .prateleira").each(function() {
				var wrap = $(this);
				wrap.find("h2").hide();

				$(this).owlCarousel({
					items: 3,
					navigation: true,
					pagination: false
				});
			});
		},
		callDontGoCloseSite: function(){
			var floating = $('.qd-v1-modal').clone()
				.removeClass('qd-v1-modal')
				.addClass('floating-qd-v1-dontgo');
			var modalOpen = false;
			
			var lastMouseY = 0;

			$(window).mousemove(function(event) {
				lastMouseY = event.screenY;
			});

			$(document).mouseleave(function() {
				$('iframe[src*=qd-newsletter]').remove();
				if(modalOpen || lastMouseY > 200)
					return;

				$('<div class="common-dontgo-close"><span class="close-modal" data-dismiss="modal">X</span></div>').QD_cookieFn({
					cookieName: "dontgo-close",
					close: "",
					expireDays: 7,
					show: function($elem) {
						if(modalOpen)
							return;

						floating.addClass('modal common-dontgo-close-modal').appendTo(document.body);

						// Ações
						floating.on("hidden.bs.modal", function(){
							$elem.trigger("QuatroDigital.cf_close");
							if(!$('.modal').is(':visible'))
								$(document.body).removeClass('modal-open');
							modalOpen = false;
							floating.hide();
						});

						modalOpen = true;
						floating.find(".modal-body").html($elem);
						floating.modal();

						$('.common-dontgo-close-modal .modal-body').append('<div class="additional-dontgo-wrapper"></div>');
					},
					hide: function($elem){}
				});
			});
		},
		loginTutorialLink: function() {
			var body = $(document.body);
			var videoModal = $('.qd-v1-modal').clone()
				.removeClass('qd-v1-modal')
				.addClass('video-qd-v1-modal modal');
			videoModal.find('.modal-body').html('<div class="embed-responsive embed-responsive-16by9"> <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/hltejO2SkLw" frameborder="0" allowtransparency="true"></iframe> </div>');
			videoModal.appendTo(body);

			var el = $('<div class="video-qd-v1-tutorial-text"><p>Dúvidas de como acessar sua conta?<a href="https://www.youtube.com/watch?v=hltejO2SkLw" target="_blank">Assista o vídeo</a></p></div>');
			el.find('a').click(function(e) {
				if (!body.is('.login')) {
					e.preventDefault();
				}
				videoModal.modal('show');
			});

			$(window).on('rendered.vtexid', function() {
				$('#vtexIdContainer .modal-body').append(el);
			});
		}
	};

	var Home = {
		init: function () {
			Home.brandOwlCarousel();
			Home.cycle2();
			// Home.modalNewsLetter();
			Home.organizeSideMenuCollection();
			Home.mosaicBanners();
			// Home.productOwlCarousel();
			Home.applyHotsiteShelfCarousel();
			Home.scrollBottomHotsite();		
			if($(document.body).is('.black-friday-qd-v1-skin')) {
				Home.sendEmail();			
			}	
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		sendEmail:function() {			
			var form = $(".black-friday-qd-v1-form");
		
			form.validate({
				rules: {email: {email: true } },
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
		
							$.ajax({url: "//api.ipify.org?format=jsonp", dataType: "jsonp", success: function(data) { sendData(data.ip); }, error: function() {$.ajax({url: "//www.telize.com/jsonip", dataType: "jsonp", success: function(data) { sendData(data.ip); }, error: function(data) { sendData(null); } }); } });
		
							var sendData = function(ip) {
								$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/NL/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify({
										qd_email: email,
										blackFriday: true
									}),
									success: function(data){ $("#qd_form_email").parent().addClass("qd-form-success"); },
									error: function() { alert("Desculpe, não foi possível enviar seu formulário!"); },
									complete: function(){ submitWrapper.removeClass("qd-loading"); }
								});
							}
						};
						$.ajax({url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email, dataType: "json", headers: {Accept: "application/vnd.vtex.ds.v10+json"}, success: function(data) {if (data.length) saveContact(data[0].id); else saveContact(null); }, error: function() {saveContact(null); if(typeof console == "object" && typeof console.warn == 'function') console.warn('Houve um erro ao tentar buscar os dados do usuário na entidade CL'); } });
					})();
		
					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},		
		productOwlCarousel:function(item, numberOfItems){
			item.each(function() {
				$(this).owlCarousel({
					items: numberOfItems,
					navigation: true,
					pagination: false
				});
			})
		},
		scrollBottomHotsite: function() {
			$('.hotsite-full-banner-qd-v1-scroll-btn').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.hotsite-banner-shelf-qd-v1').offset().top -100
				}, 900, 'swing');
			});
		},
		applyHotsiteShelfCarousel: function(){
			if (!$.fn.owlCarousel)
				return;

			$(".hotsite-banner-shelf-qd-v1-carousel .prateleira").each(function() {
				$(this).owlCarousel({
					items: 1,
					navigation: true,
					pagination: false,
					itemsDesktop: 1,
					itemsDesktopSmall: 1,
					itemsTablet: 1
				});
			});
		},
		modalNewsLetter: function() {
			var modal = $(".qd-v1-modal");
			var html = $('<div><div class="content-news"><div class="row"><div class="col-xs-12"><img class="img-responsive" src="/arquivos/banner-captador-newsletter-701x371.jpg" alt=""></div></div><div class="row"><div class="col-xs-12"><div class="modal-qd-v1-newsletter-field"><div class="row"><div class="col-xs-12 col-md-6"><p>Fique por dentro das novidades!</p></div><div class="col-xs-12 col-md-6"><form novalidate="1"><div class="qd_news"><input type="text" name="name" class="qd_news_name form-control"/><input type="text" name="email" class="qd_news_email form-control"/> </div><button class="qd_news_button">OK</button></div></form></div></div></div></div></div></div></div>');
			var htmlFinish = $('<div><div class="content-news content-news-finish hide"><div class="row"><div class="col-xs-12"><img class="img-responsive" src="/arquivos/banner-captador-newsletter-701x371.jpg" alt=""></div></div><div class="row"><div class="col-xs-12"><div class="modal-qd-v1-newsletter-field"><div class="row"><div class="col-xs-12"><h3>Obrigado!</h3><p>Em breve você receberá nosso e-mail de boas vindas e muitas outras novidades!</p></div></div></div></div></div></div></div>');

			modal.on("hide.bs.modal", function(){
				html.trigger("QuatroDigital.cf_close");
			});

			html.QD_cookieFn({
				cookieName: "newsletter",
				close: "",
				expireDays: 7,
				show: function($elem){
					modal.addClass("qd-v1-newsletter-modal");
					modal.find('.modal-header span:not(.qd-on)').addClass('qd-on').append('<i class="fa fa-times-circle"></i>');
					modal.find(".modal-body").empty().append(html);
					modal.modal();

					html.QD_news({
						defaultEmail: "Digite seu e-mail",
						checkNameFieldIsVisible: false,
						successCallback: function () {
							html.append(htmlFinish);
							$(".qd-v1-newsletter-modal").addClass("qd-v1-newsletter-modal-finish");
							htmlFinish.removeClass('hide');

							setTimeout(function() {
								modal.modal('hide');
							}, 4000);
						}
					});
				},
				hide: function($elem){}
			});
		},
		mosaicBanners: function() {
			$(".banner-mosaic-qd-v1 .box-banner").QD_mosaicBanners({
				containerWidth: 1090,
				classFourColumn: "col-xs-6 col-sm-2"
			});
		},
		organizeSideMenuCollection: function() {
			var wrapper = $(".qd-category-collections");
			var htmlItem = '<div class="col-xs-12 item"><div class="row"></div></div>';
			var htmlSideMenuWrapper = '<div class="col-xs-12 col-sm-5 col-md-3 htmlSideMenuWrapper"></div>';
			var htmlCollectionWrapper = '<div class="col-xs-12 col-sm-7 col-md-9 htmlCollectionWrapper"></div>';
			var itemSideMenuCollection = '<div class="row itemSideMenuCollection"><div></div></div>';

			var threeItemShelves = wrapper.find('.box-banner + .heading-1 + .prateleira').addClass('qd-on');
			var fourItemShelves = wrapper.find('.prateleira:not(.qd-on)');

			wrapper.find('.box-banner + .heading-1:not(".qd-on")').addClass("qd-on").prev().each(function() {
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

			Home.productOwlCarousel(threeItemShelves, 3);
			Home.productOwlCarousel(fourItemShelves, 4);
		},
		brandOwlCarousel:function(){
			$(".qd-banner-carousel").owlCarousel({
				items: 6,
				navigation: true,
				pagination: false,
				scrollPerPage: true
			});
		},
		cycle2: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".main-slider");

			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<div class='cycle-pager-item'><span class='slider-pager-content'>" + $t.find("img").attr("alt") + "</span></div>");
			});

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".cycle-pager-wrap",
				prev: ".cycle-prev",
				next: ".cycle-next",
				timeout: 9000
			});
		}
	};

	var Departament = {
		init: function () {
			Departament.showDisclaimerBanners();
			Departament.sidemenuToggle();
			Departament.hideExtendedMenu();
		},
		ajaxStop: function () {},
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
			$(".components-qd-v1-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
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
		}
	};

	var Search = {
		init: function () {
			Departament.showDisclaimerBanners();
			Departament.sidemenuToggle();
			Search.emptySearch();
			Departament.hideExtendedMenu();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		emptySearch:function () {
			if ($('.busca-vazio').length>0) {
				$('.no-search-result').show();
				$('.searchTitle').hide();
			};
		}
	};

	var Product = {
		init: function () {
			Product.zoomFix();
			Product.saveAmountFlag();
			Product.shippingFillingForm();
			Product.shippingFormPlaceholder();
			Product.showShipping();
			Product.uniqueSkuNameFix();
			Product.hideUniqueSkuOption();
			Product.showBuyTogether();
			Product.accessoriesFix();
			Product.CustomAccessoriesFix();
			Product.facebookSaveButton();
			Product.setAvailableBodyClass();
		},
		ajaxStop: function () {
			// Ajax Stop
			Product.addCloseBtnFreightTable();
			Product.startBootstrapTooltip();
		},
		windowOnload: function () {
			// Window Onload
			Product.addThis();
		},
		saveAmountFlag: function() {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function(e, sku, data) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-image');

				if (data.listPrice > data.bestPrice)
					flag.text(parseInt(100 - data.bestPrice / data.listPrice * 100) + "%").show();
				else
					flag.hide();
			});

			if (skuJson.skus.length >= 1 && skuJson.skus[0].listPrice >= 1) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-image');

				if (skuJson.skus[0].listPrice > skuJson.skus[0].bestPrice)
					flag.text(parseInt(100 - skuJson.skus[0].bestPrice / skuJson.skus[0].listPrice * 100) + "%").show();
			}
		},
		startBootstrapTooltip: function() {
			$('[data-toggle="tooltip"]').tooltip({
				trigger: 'hover focus'
			});
		},
		facebookSaveButton: function() {
			window.fbAsyncInit = function() {
				FB.init({
					appId      : '276352649390548',
					xfbml      : true,
					version    : 'v2.5'
				});
			}

			$('.product-price').prepend('<div class="fb-save" data-uri="'+ window.location.href +'" data-size="small"></div>');
		},
		addThis:function(){
			var html,userId,elem;
			window.addthis_config = window.addthis_config || {};

			// Configurações
			userId="ra-537ca76b7f873600";
			window.addthis_config.data_track_addressbar=false;
			elem=$(".add-this");


			if(!elem.length) return;

			html=$('<div class="addthis_toolbox addthis_default_style addthis_16x16_style">\
				<a class="addthis_button_facebook"></a>\
				<a class="addthis_button_twitter"></a>\
				<a class="addthis_button_pinterest_share"></a>\
				<a class="addthis_button_email"></a>\
				<a class="addthis_button_compact"></a><a class="addthis_counter addthis_bubble_style"></a>\
				</div>');
			elem.append(html);

			var addthis_config = {"data_track_addressbar":true};

			$.getScript("//s7.addthis.com/js/300/addthis_widget.js#pubid="+userId);
		},
		shippingFillingForm:function(){
			var title, msg;
			title=$("#txtTituloResenha");
			if(!title.length) return;
			msg=$("#txtTextoResenha");
			if(!msg.length) return; // os ifs estão separados propositalmente, por questões de performance

			title.val(title.val().trim());
			msg.val(msg.val().trim());

			title.filter(":empty").val("titulo automatico");
			msg.filter(":empty").val("Mensagem automatica");
		},
		shippingFormPlaceholder:function(){
			var input;
			// Place holder
			input=$(".shippingWrapTpl #txtCep");
			if(typeof input.attr("href") != "undefined")
					return;
			input.attr("placeholder","CEP");
		},
		showShipping:function(){
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		zoomFix: function(){
			var overlay = $("<div class='qdZoomInvisibleOverlay' />");
			$("#image").prepend(overlay).on("mouseout", ".zoomPad", function(){ overlay.hide(); }).on("mouseover", ".zoomPad", function(){ overlay.show(); });
		},
		uniqueSkuNameFix:function(){
			if(!(typeof skuJson !== "undefined" && typeof skuJson.name === "string" && typeof skuJson.skus === "object" && skuJson.skus.length === 1 && skuJson.name !== ""))
				return;

			var elem = $(".fn.productName");
			// Substituindo o nome do produto com sku por apenas o nome do produto
			elem.text(skuJson.name);
			// Adicionando o nome do SKU logo abaixo
			// try{
			// 	elem.after('<div class="qdSkuName">' + skuJson.skus[0].skuname + '</div>');
			// }
			// catch(e){
			// 	if(typeof console !== "undefined" && typeof console.error === "function")
			// 		console.error("Erro previnido.", e);
			// }
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
		showBuyTogether:function(){
			if ($('.vtx-buy-together table').length) {
				$('.vtx-buy-together').show();
			};
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
		accessoriesFix: function() {
			$(".vtx-placeholder fieldset >.buy-product-checkbox").parent().each(function() {
				var $t  = $(this);
				$t.add($t.prev("ul")).wrapAll('<div class="qd-accessories-wrapper col-xs-12 col-sm-4 col-md-3"/>');
			});
		},
		CustomAccessoriesFix: function() {
			$(".product-qd-v1-acessories fieldset >.buy-product-checkbox").parent().each(function() {
				var $t  = $(this);
				$t.add($t.prev("ul")).wrapAll('<div class="qd-accessories-wrapper col-xs-12"/>');
			});
		},
		setAvailableBodyClass: function() {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
			}

			$(document).on("skuSelected.vtex", function(e, id, sku) {
				checkVisibleNotify(sku.available);
			});

			checkVisibleNotify(skuJson.available);
		}
	};

	var List = {
		init: function () {},
		ajaxStop: function () {},
		windowOnload: function () {}
	};

	var Institutional = {
		init: function () {
			Departament.sidemenuToggle();
			Institutional.sendEmail();
			if($(document.body).is('.audiovisual-cards')) {
				Institutional.shelfCarousel();
				Institutional.mobileMenu();
				Institutional.openModalVideoInstitutional();
				Institutional.menuLinksAnchor();
			}
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		mobileMenu: function() {
			$('.header-qd-v1-menu-trigger').click(function() {
				$(document.body).toggleClass('qd-am-on');
			});
		},
		menuLinksAnchor: function() {
			$('.header-qd-v1-cards-menu ul a').click(function(e) {
				e.preventDefault();
				$(document.body).removeClass('qd-am-on');

				$('html, body').stop().animate({
					'scrollTop': $($(this).attr('href')).offset().top - 62
				}, 900, 'swing');
			});
		},
		openModalVideoInstitutional: function() {
			$('.home-qd-v1-video-poster, .cards-qd-v1-video-text .cards-qd-v1-button').click(function(e) {
				$('.modal-qd-v1-home-video').modal('show');
				return false;
			});
		},
		shelfCarousel: function() {
			if(typeof $.fn.slick !== "function")
				return;

			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').prependTo($t.parent());
			});

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-chevron-right" aria-hidden="true"></i></button>',
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 550,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
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
			else if (body.filter(".institucional, .Institucional").length > 0) Institutional.windowOnload();
			else if(body.filter(".orders").length>0)Orders.windowOnload();
		};

		ajaxStop = function () {
			Common.ajaxStop();
			if (body.filter(".home").length > 0) Home.ajaxStop();
			else if (body.filter(".departamento, .categoria").length > 0) Departament.ajaxStop();
			else if (body.filter(".resultado-busca").length > 0) Search.ajaxStop();
			else if (body.filter(".produto").length > 0) Product.ajaxStop();
			else if (body.filter(".listas").length > 0) List.ajaxStop();
			else if (body.filter(".institucional, .Institucional").length > 0) Institutional.ajaxStop();
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
			else if (body.filter(".institucional, .Institucional").length > 0) Institutional.init();
			else if(body.filter(".orders").length>0)Orders.init();
			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass('jsFullLoaded');
		});
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
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
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
/* Quatro Digital jQuery Scroll // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(a){"function"!==typeof a.fn.QD_scroll&&(a.fn.QD_scroll=function(d,b){var c;b=b||100;window.QuatroDigital_scroll=window.QuatroDigital_scroll||{};window.QuatroDigital_scroll.scrollTop=null;window.QuatroDigital_scroll.lastScrollTop=null;a(this).scroll(function(){c=this;window.QuatroDigital_scroll.scrollTop=a(window).scrollTop()});(function(){window.QuatroDigital_scroll.interval=setInterval(function(){window.QuatroDigital_scroll.lastScrollTop!==window.QuatroDigital_scroll.scrollTop&&(null!==
window.QuatroDigital_scroll.scrollTop&&d.call(c,window.QuatroDigital_scroll.scrollTop),window.QuatroDigital_scroll.lastScrollTop=window.QuatroDigital_scroll.scrollTop)},b)})()})})(jQuery);
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)})(function(c){function n(b){b=f.json?JSON.stringify(b):String(b);return f.raw?b:encodeURIComponent(b)}function m(b,e){var a;if(f.raw)a=b;else a:{var d=b;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));a=f.json?JSON.parse(d):d;break a}catch(g){}a=void 0}return c.isFunction(e)?e(a):a}var l=/\+/g,f=
c.cookie=function(b,e,a){if(void 0!==e&&!c.isFunction(e)){a=c.extend({},f.defaults,a);if("number"===typeof a.expires){var d=a.expires,g=a.expires=new Date;g.setTime(+g+864E5*d)}return document.cookie=[f.raw?b:encodeURIComponent(b),"=",n(e),a.expires?"; expires="+a.expires.toUTCString():"",a.path?"; path="+a.path:"",a.domain?"; domain="+a.domain:"",a.secure?"; secure":""].join("")}a=b?void 0:{};for(var d=document.cookie?document.cookie.split("; "):[],g=0,l=d.length;g<l;g++){var h=d[g].split("="),k;
k=h.shift();k=f.raw?k:decodeURIComponent(k);h=h.join("=");if(b&&b===k){a=m(h,e);break}b||void 0===(h=m(h))||(a[k]=h)}return a};f.defaults={};c.removeCookie=function(b,e){if(void 0===c.cookie(b))return!1;c.cookie(b,"",c.extend({},e,{expires:-1}));return!c.cookie(b)}});
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs()}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return $.extend({},a,new b(a))},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Quatro Digital - Scroll Toggle // 1.1 // Carlos Vinicius // Todos os direitos reservados */
(function(){var b=jQuery,d=function(a,c){if("object"===typeof console){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,b):console.error.apply(console,b):console.warn.apply(console,b)}};"function"!==typeof b.QD_scrollToggle&&(b.QD_scrollToggle=function(a){var c=[];if("string"!==typeof a&&"number"!==typeof a||
"auto"===a)if("auto"===a)c.push(b(window).height());else return d("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var e=a.split(","),f;for(f in e)"function"!==typeof e[f]&&(a=parseInt(e[f].trim()),isNaN(a)||c.push(a))}if(!c.length)return d("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"function"!==typeof document.body.setAttribute)return d('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');
if(!document||!document.body||"function"!==typeof document.body.removeAttribute)return d('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"function"!==typeof document.body.getAttribute)return d('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!b(window).scrollTop||isNaN(parseInt(b(window).scrollTop())))return d('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",
1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){d("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",g.message)}b(window).scroll(function(){for(var a=0;a<c.length;a++)b(window).scrollTop()>c[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+
a)})},b(function(){var a=b("body[data-qd-scroll-limit]");a.length&&b.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital Amazing Menu // 2.12 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(4(h){i a,m,k,n;a=27;D("4"!==F a.15.R){m={W:"/7-1F-T",1h:4(){}};i l=4(a,b){D("1q"===F w&&"X"!==F w.11&&"X"!==F w.19&&"X"!==F w.1g){i d;"1q"===F a?(a.1S("[1O 1Q 1l]\\n"),d=a):d=["[1O 1Q 1l]\\n"+a];D("X"===F b||"1D"!==b.M()&&"2x"!==b.M())D("X"!==F b&&"19"===b.M())I{w.19.1i(w,d)}J(p){I{w.19(d.V("\\n"))}J(f){}}1J I{w.11.1i(w,d)}J(p){I{w.11(d.V("\\n"))}J(f){}}1J I{w.1g.1i(w,d)}J(p){I{w.1g(d.V("\\n"))}J(f){}}}};a.15.1k=4(){i e=a(r);e.B(4(b){a(r).v("7-8-G-"+b)});e.1c().v("7-8-1c");e.1N().v("7-8-1N");x e};a.15.R=4(){};h=4(a){i b={j:"2a%3%1E%3%5%3%6",2y:"2t%3%5%3%6",2c:"2f%3%O%3%5%3%6",2m:"2A%3%Q%3%5%3%6",2l:"2n%3%S%3%5%3%6",2o:"c-1b%3%O%3%5%3%6",U:"-1b%3%Q%3%5%3%6","U-":"1b%3%S%3%5%3%6","H%3%":"1E%3%O%3%5%3%6","H%3%2":"2q%3%Q%3%5%3%6","H%3%25":"2p%3%S%3%5%3%6","H%3%2k":"2j%3%5%3%6",2e:"2d%3%5%3%6",2g:"2i%3%O%3%5%3%6",2h:"2r%3%Q%3%5%3%6",2s:"y%3%S%3%5%3%6","U-2C":"1H%3%O%3%5%3%6","U-2B":"2D%3%Q%3%5%3%6","U-2E":"2F%3%S%3%5%3%6","H%3%2z":"2u%3%O%3%5%3%6","H%3%2v":"2w%3%Q%3%5%3%6","H%3%2G":"1H%3%S%3%5%3%6"};x 4(a){i e,f,c,g;f=4(a){x a};c=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+c[16]+"c"+c[17]+"m"+f(c[1])+"n"+c[13]]["l"+c[18]+"c"+c[0]+"1T"+f("o")+"n"];e=4(a){x 1U(1R(a.Y(/\\./g,"\\2b").Y(/[a-1V-Z]/g,4(a){x 24.28(("Z">=a?29:23)>=(a=a.22(0)+13)?a:a-26)})))};1X(i q 1W b){D(e(a[[c[9],f("o"),c[12],c[f(13)]].V("")])===q+b[q]){g="1Y"+c[17]+"e";1Z}g="f"+c[0]+"21"+f(c[1])+""}f=!1;-1<a[[c[12],"e",c[0],"20",c[9]].V("")].3v("3C%1M%1A%1p%1e%1f%1e%3r%3l%3o%1P%3p%1P%3k%1e%1f%1M%1A%1p%3j%1f")&&(f=!0);x[g,f]}(a)}(h);D(!3f(h[0]))x h[1]?l("\\3h\\3i\\1o \\2H\\K\\3q\\3z\\1n\\K\\1n\\1o \\3y\\K\\3B\\K \\3u\\3e\\3c\\K L\\3d\\K!"):!1;n=4(e){i b,d;e=e.C(".2R");b=e.1I(".7-8-1d");d=e.1I(".7-8-1B");D(b.E||d.E)b.10().v("7-8-1d-1C"),d.10().v("7-8-1B-1C"),a.2Q({W:k.W,2S:"2T",2V:4(e){i f=a(e);b.B(4(){i c,g;g=a(r);c=f.C("2U[2P=\'"+g.1u("1y-1m-1t")+"\']");c.E&&(c.B(4(){a(r).1z(".2O-1d").1v().1w(g)}),g.1x())}).v("7-8-1s-1r");d.B(4(){i c={},g;g=a(r);f.C("2J").B(4(){D(a(r).1G().1a().M()==g.1u("1y-1m-1t").1a().M())x c=a(r),!1});c.E&&(c.B(4(){a(r).1z("[2I*=\'2K\']").1v().1w(g)}),g.1x())}).v("7-8-1s-1r")},11:4(){l("N\\1K 2L 2N\\2M 2W 2X 37 1L T. A W \'"+k.W+"\' 38.")},39:3b})};a.R=4(e){i b=e.C("P[3a]").B(4(){i d,b;d=a(r);D(!d.E)x l(["35 1L T n\\1K 34",e],"1D");d.C("G >P").10().v("7-8-2Z-P");d.C("G").B(4(){i g=a(r),b;b=g.14(":2Y(P)");b.E&&g.v("7-8-30-"+b.1c().1G().1a().31().Y(/\\./g,"").Y(/\\s/g,"-").M())});b=d.C(">G").1k();d.v("7-1F-T");b=b.C(">P");b.B(4(){i b=a(r);b.C(">G").1k().v("7-8-32");b.v("7-8-1j-T");b.10().v("7-8-1j")});b.v("7-8-1j");i f=0,c=4(a){f+=1;a=a.14("G").14("*");a.E&&(a.v("7-8-33-"+f),c(a))};c(d);d.36(d.C("P")).B(4(){i b=a(r);b.v("7-8-"+b.14("G").E+"-G")})});n(b);k.1h.3t(r);a(3x).3w("3A.8.1h",e)};a.15.R=4(e){i b=a(r);D(!b.E)x b;k=a.3g({},m,e);b.3n=3m a.R(a(r));x b};a(4(){a(".3s").R()})}})(r);',62,225,'|||25C2|function|25A8pbz|25A8oe|qd|am||||||||||var|||||||||this||||addClass|console|return||||each|find|if|length|typeof|li|jjj|try|catch|u0391||toLowerCase||25A8igrkpbzzrepr|ul|25A8igrkpbzzreprorgn|QD_amazingMenu|25A8igrkpbzzreprfgnoyr|menu|qrirybc|join|url|undefined|replace||parent|error|||children|fn||||info|trim|ybwnfnaghnevbanpvbany|first|banner|D1|82|warn|callback|apply|dropdown|qdAmAddNdx|Menu|qdam|u2202|u0472|84|object|loaded|content|value|attr|clone|insertBefore|hide|data|getParent|B8|collection|wrapper|alerta|25A8ybwnfnaghnevbanpvbany|amazing|text|anpvbany|filter|else|u00e3o|do|E0|last|QD|C2|Amazing|encodeURIComponent|unshift|ti|escape|zA|in|for|tr|break|rc|ls|charCodeAt|122|String|||jQuery|fromCharCode|90|jj|u00a8|ybw|bany|fnaghnevbanpv|nfnaghnevbanpvbany|fnaghnevbanpvb|fnaghnevbanpvba|any|8fnaghnevbanpvbany|25A|ybwnf|ybwn|naghnevbanpvbany|qriryb|A8ybwnfnaghnevbanpvbany|5A8ybwnfnaghnevbanpvbany|ny|fnaghnevbanpvban|wnfnaghnevbanpvbany|vbanpvbany|25A8fnaghnev|banpvbany|aviso|yb|25A8fnaghne|fnaghnevbanpvbany|fnaghnevba|fnaghnevb|npvbany|fnaghnevban|pvbany|25A8fnaghnevb|u221a|class|h2|colunas|foi|u00edvel|poss|box|alt|qdAjax|qd_am_code|dataType|html|img|success|obter|os|not|has|elem|replaceSpecialChars|column|level|encontrada|UL|add|dados|falho|clearQueueDelay|itemscope|3E3|u01ac|u0472J|u0abd|eval|extend|u0e17|u00c3|C5|A1|CF|new|exec|83d|A1g|u2113|8F|qd_amazing_menu_auto|call|u0aef|indexOf|trigger|window|u03a1|u00a1|QuatroDigital|u0ae8|qu'.split('|'),0,{}));
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital Cookie Functions // 1.5 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,d){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase()?
"undefined"!==typeof d&&"info"===d.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var d=function(c,b){var d=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof d&&d>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(c);c.trigger("QuatroDigital.cf_show");a(c).on("qdNewsSuccessCallback",function(a,d){c.trigger("QuatroDigital.qdcf_applyComplete");b.show(c);c.trigger("QuatroDigital.cf_hide")});b.callback();c.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var c=a(this),b;try{if(b=c.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(c,b);d(c,b);e(c,b)})};a.fn.QD_cookieFn=
function(f){var d=a(this);h=a.extend(!0,{},g,f);d.QD_cookieFn=new a.QD_cookieFn(d);return d};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();


/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
	d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
	

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
/* Quatro Digital Smart Cart BETA */
// not-qd-include ../qd-smart-cart/QD_smartCart.js
/* Quatro Digital Smart Cart 7.0 */
var _0x3951=['qd-bap-item-added','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','replace','abs','undefined','pow','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','info','warn','object','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','naghnevbanpvbany%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','off','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-scrollUp','scrollCart','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','closest','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','total','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','call','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','addClass','.qd-ddc-prodWrapper2','productCategoryIds','attr','qd-ddc-','availability','.qd-ddc-prodName','skuName','sellingPrice','Grátis','content','.qd-ddc-quantity','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','forceImageHTTPS','string','http','https','qd-loaded','src','actionButtons','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','.qd-ddc-remove','click.qd_ddc_remove','stop','remove','$1-$2$3','data','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','getCartInfoByUrl','logisticsInfo','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','</td><td>',',\x20entrega\x20em\x20','</td>','tbody','insertBefore','fail','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper'];(function(_0x5d007e,_0x49acc8){var _0x1a2297=function(_0x125b0b){while(--_0x125b0b){_0x5d007e['push'](_0x5d007e['shift']());}};_0x1a2297(++_0x49acc8);}(_0x3951,0x1ef));var _0x4a9a=function(_0x40bd46,_0x2fd142){_0x40bd46=_0x40bd46-0x0;var _0x30486c=_0x3951[_0x40bd46];return _0x30486c;};(function(_0x4d96c2){_0x4d96c2['fn'][_0x4a9a('0x0')]=_0x4d96c2['fn']['closest'];}(jQuery));function qd_number_format(_0x5c0b77,_0xd1c7c,_0x574a1c,_0xe9198a){_0x5c0b77=(_0x5c0b77+'')[_0x4a9a('0x1')](/[^0-9+\-Ee.]/g,'');_0x5c0b77=isFinite(+_0x5c0b77)?+_0x5c0b77:0x0;_0xd1c7c=isFinite(+_0xd1c7c)?Math[_0x4a9a('0x2')](_0xd1c7c):0x0;_0xe9198a='undefined'===typeof _0xe9198a?',':_0xe9198a;_0x574a1c=_0x4a9a('0x3')===typeof _0x574a1c?'.':_0x574a1c;var _0x2eaa15='',_0x2eaa15=function(_0x47e654,_0x552b07){var _0xd1c7c=Math[_0x4a9a('0x4')](0xa,_0x552b07);return''+(Math[_0x4a9a('0x5')](_0x47e654*_0xd1c7c)/_0xd1c7c)['toFixed'](_0x552b07);},_0x2eaa15=(_0xd1c7c?_0x2eaa15(_0x5c0b77,_0xd1c7c):''+Math['round'](_0x5c0b77))[_0x4a9a('0x6')]('.');0x3<_0x2eaa15[0x0][_0x4a9a('0x7')]&&(_0x2eaa15[0x0]=_0x2eaa15[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0xe9198a));(_0x2eaa15[0x1]||'')['length']<_0xd1c7c&&(_0x2eaa15[0x1]=_0x2eaa15[0x1]||'',_0x2eaa15[0x1]+=Array(_0xd1c7c-_0x2eaa15[0x1][_0x4a9a('0x7')]+0x1)[_0x4a9a('0x8')]('0'));return _0x2eaa15['join'](_0x574a1c);};(function(){try{window[_0x4a9a('0x9')]=window['_QuatroDigital_CartData']||{},window[_0x4a9a('0x9')][_0x4a9a('0xa')]=window[_0x4a9a('0x9')][_0x4a9a('0xa')]||$[_0x4a9a('0xb')]();}catch(_0x1b8d0a){_0x4a9a('0x3')!==typeof console&&_0x4a9a('0xc')===typeof console['error']&&console[_0x4a9a('0xd')](_0x4a9a('0xe'),_0x1b8d0a[_0x4a9a('0xf')]);}}());(function(_0x207f6f){try{var _0x1ea535=jQuery,_0x34fb3b=function(_0x1ff008,_0x44436d){if('object'===typeof console&&_0x4a9a('0x3')!==typeof console[_0x4a9a('0xd')]&&_0x4a9a('0x3')!==typeof console[_0x4a9a('0x10')]&&_0x4a9a('0x3')!==typeof console[_0x4a9a('0x11')]){var _0x33e459;_0x4a9a('0x12')===typeof _0x1ff008?(_0x1ff008[_0x4a9a('0x13')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x33e459=_0x1ff008):_0x33e459=[_0x4a9a('0x14')+_0x1ff008];if('undefined'===typeof _0x44436d||_0x4a9a('0x15')!==_0x44436d['toLowerCase']()&&'aviso'!==_0x44436d[_0x4a9a('0x16')]())if(_0x4a9a('0x3')!==typeof _0x44436d&&_0x4a9a('0x10')===_0x44436d[_0x4a9a('0x16')]())try{console['info'][_0x4a9a('0x17')](console,_0x33e459);}catch(_0x55e1c3){try{console[_0x4a9a('0x10')](_0x33e459[_0x4a9a('0x8')]('\x0a'));}catch(_0x1ce849){}}else try{console['error'][_0x4a9a('0x17')](console,_0x33e459);}catch(_0x72b3d4){try{console[_0x4a9a('0xd')](_0x33e459['join']('\x0a'));}catch(_0x58ba51){}}else try{console[_0x4a9a('0x11')]['apply'](console,_0x33e459);}catch(_0x3c93d3){try{console[_0x4a9a('0x11')](_0x33e459[_0x4a9a('0x8')]('\x0a'));}catch(_0x3c5fe4){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window[_0x4a9a('0x18')][_0x4a9a('0x19')]=!0x0;_0x1ea535['QD_dropDownCart']=function(){};_0x1ea535['fn'][_0x4a9a('0x1a')]=function(){return{'fn':new _0x1ea535()};};var _0x5b126e=function(_0x42413c){var _0x41e2f0={'f':_0x4a9a('0x1b')};return function(_0x763bdb){var _0x11a6fd=function(_0x14c9ff){return _0x14c9ff;};var _0x1f203e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x763bdb=_0x763bdb['d'+_0x1f203e[0x10]+'c'+_0x1f203e[0x11]+'m'+_0x11a6fd(_0x1f203e[0x1])+'n'+_0x1f203e[0xd]]['l'+_0x1f203e[0x12]+'c'+_0x1f203e[0x0]+'ti'+_0x11a6fd('o')+'n'];var _0x35d708=function(_0x303f13){return escape(encodeURIComponent(_0x303f13[_0x4a9a('0x1')](/\./g,'¨')[_0x4a9a('0x1')](/[a-zA-Z]/g,function(_0x1666af){return String[_0x4a9a('0x1c')](('Z'>=_0x1666af?0x5a:0x7a)>=(_0x1666af=_0x1666af[_0x4a9a('0x1d')](0x0)+0xd)?_0x1666af:_0x1666af-0x1a);})));};var _0x5b09f6=_0x35d708(_0x763bdb[[_0x1f203e[0x9],_0x11a6fd('o'),_0x1f203e[0xc],_0x1f203e[_0x11a6fd(0xd)]][_0x4a9a('0x8')]('')]);_0x35d708=_0x35d708((window[['js',_0x11a6fd('no'),'m',_0x1f203e[0x1],_0x1f203e[0x4][_0x4a9a('0x1e')](),_0x4a9a('0x1f')][_0x4a9a('0x8')]('')]||_0x4a9a('0x20'))+['.v',_0x1f203e[0xd],'e',_0x11a6fd('x'),'co',_0x11a6fd('mm'),_0x4a9a('0x21'),_0x1f203e[0x1],'.c',_0x11a6fd('o'),'m.',_0x1f203e[0x13],'r']['join'](''));for(var _0xba2f49 in _0x41e2f0){if(_0x35d708===_0xba2f49+_0x41e2f0[_0xba2f49]||_0x5b09f6===_0xba2f49+_0x41e2f0[_0xba2f49]){var _0x5c71df='tr'+_0x1f203e[0x11]+'e';break;}_0x5c71df='f'+_0x1f203e[0x0]+'ls'+_0x11a6fd(_0x1f203e[0x1])+'';}_0x11a6fd=!0x1;-0x1<_0x763bdb[[_0x1f203e[0xc],'e',_0x1f203e[0x0],'rc',_0x1f203e[0x9]]['join']('')][_0x4a9a('0x22')](_0x4a9a('0x23'))&&(_0x11a6fd=!0x0);return[_0x5c71df,_0x11a6fd];}(_0x42413c);}(window);if(!eval(_0x5b126e[0x0]))return _0x5b126e[0x1]?_0x34fb3b(_0x4a9a('0x24')):!0x1;_0x1ea535['QD_dropDownCart']=function(_0x3866b8,_0x458802){var _0x5b8fdd=_0x1ea535(_0x3866b8);if(!_0x5b8fdd[_0x4a9a('0x7')])return _0x5b8fdd;var _0x375264=_0x1ea535[_0x4a9a('0x25')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x4a9a('0x26'),'linkCheckout':_0x4a9a('0x27'),'cartTotal':_0x4a9a('0x28'),'emptyCart':_0x4a9a('0x29'),'continueShopping':_0x4a9a('0x2a'),'shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x4cdf45){return _0x4cdf45['skuName']||_0x4cdf45[_0x4a9a('0x2b')];},'callback':function(){},'callbackProductsList':function(){}},_0x458802);_0x1ea535('');var _0x5990eb=this;if(_0x375264[_0x4a9a('0x2c')]){var _0x4d5f5b=!0x1;_0x4a9a('0x3')===typeof window[_0x4a9a('0x2d')]&&(_0x34fb3b(_0x4a9a('0x2e')),_0x1ea535[_0x4a9a('0x2f')]({'url':_0x4a9a('0x30'),'async':!0x1,'dataType':_0x4a9a('0x31'),'error':function(){_0x34fb3b(_0x4a9a('0x32'));_0x4d5f5b=!0x0;}}));if(_0x4d5f5b)return _0x34fb3b('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x4a9a('0x12')===typeof window[_0x4a9a('0x2d')]&&'undefined'!==typeof window[_0x4a9a('0x2d')][_0x4a9a('0x33')])var _0x207f6f=window[_0x4a9a('0x2d')]['checkout'];else if(_0x4a9a('0x12')===typeof vtex&&_0x4a9a('0x12')===typeof vtex[_0x4a9a('0x33')]&&'undefined'!==typeof vtex[_0x4a9a('0x33')][_0x4a9a('0x34')])_0x207f6f=new vtex[(_0x4a9a('0x33'))][(_0x4a9a('0x34'))]();else return _0x34fb3b(_0x4a9a('0x35'));_0x5990eb[_0x4a9a('0x36')]=_0x4a9a('0x37');var _0x436065=function(_0x4c6116){_0x1ea535(this)[_0x4a9a('0x38')](_0x4c6116);_0x4c6116[_0x4a9a('0x39')](_0x4a9a('0x3a'))[_0x4a9a('0x3b')](_0x1ea535('.qd_ddc_lightBoxOverlay'))['on'](_0x4a9a('0x3c'),function(){_0x5b8fdd[_0x4a9a('0x3d')](_0x4a9a('0x3e'));_0x1ea535(document[_0x4a9a('0x3f')])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0x1ea535(document)[_0x4a9a('0x40')]('keyup.qd_ddc_closeFn')['on']('keyup.qd_ddc_closeFn',function(_0x385f78){0x1b==_0x385f78[_0x4a9a('0x41')]&&(_0x5b8fdd[_0x4a9a('0x3d')](_0x4a9a('0x3e')),_0x1ea535(document[_0x4a9a('0x3f')])['removeClass'](_0x4a9a('0x42')));});var _0x3f265d=_0x4c6116[_0x4a9a('0x39')]('.qd-ddc-prodWrapper');_0x4c6116[_0x4a9a('0x39')](_0x4a9a('0x43'))['on']('click.qd_ddc_scrollUp',function(){_0x5990eb[_0x4a9a('0x44')]('-',void 0x0,void 0x0,_0x3f265d);return!0x1;});_0x4c6116[_0x4a9a('0x39')]('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x5990eb['scrollCart'](void 0x0,void 0x0,void 0x0,_0x3f265d);return!0x1;});var _0x26bc3b=_0x4c6116[_0x4a9a('0x39')](_0x4a9a('0x45'));_0x4c6116[_0x4a9a('0x39')](_0x4a9a('0x46'))[_0x4a9a('0x47')]('')['on']('keyup.qd_ddc_cep',function(_0x37ead6){_0x5990eb[_0x4a9a('0x48')](_0x1ea535(this));0xd==_0x37ead6['keyCode']&&_0x4c6116[_0x4a9a('0x39')](_0x4a9a('0x49'))[_0x4a9a('0x4a')]();});_0x4c6116[_0x4a9a('0x39')](_0x4a9a('0x4b'))[_0x4a9a('0x4a')](function(_0x4e2cf6){_0x4e2cf6[_0x4a9a('0x4c')]();_0x26bc3b[_0x4a9a('0x4d')]();});_0x4c6116['find'](_0x4a9a('0x4e'))[_0x4a9a('0x4a')](function(_0xd20863){_0xd20863[_0x4a9a('0x4c')]();_0x26bc3b[_0x4a9a('0x4f')]();});_0x1ea535(document)['off'](_0x4a9a('0x50'))['on'](_0x4a9a('0x50'),function(_0x3226b5){_0x1ea535(_0x3226b5[_0x4a9a('0x51')])[_0x4a9a('0x52')](_0x4c6116[_0x4a9a('0x39')](_0x4a9a('0x53')))[_0x4a9a('0x7')]||_0x26bc3b[_0x4a9a('0x4f')]();});_0x4c6116[_0x4a9a('0x39')](_0x4a9a('0x54'))[_0x4a9a('0x4a')](function(_0x4ea940){_0x4ea940[_0x4a9a('0x4c')]();_0x5990eb[_0x4a9a('0x55')](_0x4c6116['find'](_0x4a9a('0x56')));});if(_0x375264[_0x4a9a('0x57')]){var _0x458802=0x0;_0x1ea535(this)['on'](_0x4a9a('0x58'),function(){var _0x4c6116=function(){window[_0x4a9a('0x18')]['allowUpdate']&&(_0x5990eb['getCartInfoByUrl'](),window['_QuatroDigital_DropDown']['allowUpdate']=!0x1,_0x1ea535['fn'][_0x4a9a('0x59')](!0x0),_0x5990eb[_0x4a9a('0x5a')]());};_0x458802=setInterval(function(){_0x4c6116();},0x258);_0x4c6116();});_0x1ea535(this)['on'](_0x4a9a('0x5b'),function(){clearInterval(_0x458802);});}};var _0x123a8e=function(_0x13d6af){_0x13d6af=_0x1ea535(_0x13d6af);_0x375264[_0x4a9a('0x5c')][_0x4a9a('0x5d')]=_0x375264['texts'][_0x4a9a('0x5d')][_0x4a9a('0x1')](_0x4a9a('0x5e'),_0x4a9a('0x5f'));_0x375264[_0x4a9a('0x5c')][_0x4a9a('0x5d')]=_0x375264[_0x4a9a('0x5c')]['cartTotal'][_0x4a9a('0x1')]('#items',_0x4a9a('0x60'));_0x375264[_0x4a9a('0x5c')][_0x4a9a('0x5d')]=_0x375264[_0x4a9a('0x5c')][_0x4a9a('0x5d')]['replace'](_0x4a9a('0x61'),_0x4a9a('0x62'));_0x375264[_0x4a9a('0x5c')]['cartTotal']=_0x375264['texts']['cartTotal'][_0x4a9a('0x1')]('#total',_0x4a9a('0x63'));_0x13d6af[_0x4a9a('0x39')](_0x4a9a('0x64'))[_0x4a9a('0x65')](_0x375264['texts']['linkCart']);_0x13d6af['find'](_0x4a9a('0x66'))[_0x4a9a('0x65')](_0x375264['texts'][_0x4a9a('0x67')]);_0x13d6af[_0x4a9a('0x39')](_0x4a9a('0x68'))[_0x4a9a('0x65')](_0x375264[_0x4a9a('0x5c')]['linkCheckout']);_0x13d6af[_0x4a9a('0x39')](_0x4a9a('0x69'))[_0x4a9a('0x65')](_0x375264[_0x4a9a('0x5c')]['cartTotal']);_0x13d6af[_0x4a9a('0x39')](_0x4a9a('0x6a'))['html'](_0x375264[_0x4a9a('0x5c')][_0x4a9a('0x6b')]);_0x13d6af[_0x4a9a('0x39')](_0x4a9a('0x6c'))[_0x4a9a('0x65')](_0x375264[_0x4a9a('0x5c')][_0x4a9a('0x6d')]);return _0x13d6af;}(this['cartContainer']);var _0x52d0c8=0x0;_0x5b8fdd[_0x4a9a('0x6e')](function(){0x0<_0x52d0c8?_0x436065['call'](this,_0x123a8e['clone']()):_0x436065['call'](this,_0x123a8e);_0x52d0c8++;});window[_0x4a9a('0x9')]['callback'][_0x4a9a('0x3b')](function(){_0x1ea535('.qd-ddc-infoTotalValue')[_0x4a9a('0x65')](window[_0x4a9a('0x9')][_0x4a9a('0x6f')]||'--');_0x1ea535('.qd-ddc-infoTotalItems')['html'](window[_0x4a9a('0x9')][_0x4a9a('0x70')]||'0');_0x1ea535(_0x4a9a('0x71'))[_0x4a9a('0x65')](window[_0x4a9a('0x9')][_0x4a9a('0x72')]||'--');_0x1ea535(_0x4a9a('0x73'))[_0x4a9a('0x65')](window[_0x4a9a('0x9')][_0x4a9a('0x74')]||'--');});var _0x1e3479=function(_0x265beb,_0xfaf168){if(_0x4a9a('0x3')===typeof _0x265beb[_0x4a9a('0x75')])return _0x34fb3b(_0x4a9a('0x76'));_0x5990eb[_0x4a9a('0x77')][_0x4a9a('0x78')](this,_0xfaf168);};_0x5990eb['getCartInfoByUrl']=function(_0x1d9561,_0x365802){_0x4a9a('0x3')!=typeof _0x365802?window['_QuatroDigital_DropDown'][_0x4a9a('0x79')]=_0x365802:window[_0x4a9a('0x18')][_0x4a9a('0x79')]&&(_0x365802=window[_0x4a9a('0x18')]['dataOptionsCache']);setTimeout(function(){window[_0x4a9a('0x18')]['dataOptionsCache']=void 0x0;},_0x375264[_0x4a9a('0x7a')]);_0x1ea535(_0x4a9a('0x7b'))[_0x4a9a('0x3d')](_0x4a9a('0x7c'));if(_0x375264[_0x4a9a('0x2c')]){var _0x56fd96=function(_0x3cc1d8){window['_QuatroDigital_DropDown'][_0x4a9a('0x7d')]=_0x3cc1d8;_0x1e3479(_0x3cc1d8,_0x365802);_0x4a9a('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x4a9a('0xc')===typeof window[_0x4a9a('0x7e')][_0x4a9a('0x7f')]&&window[_0x4a9a('0x7e')][_0x4a9a('0x7f')][_0x4a9a('0x78')](this);_0x1ea535(_0x4a9a('0x7b'))['addClass'](_0x4a9a('0x7c'));};_0x4a9a('0x3')!==typeof window[_0x4a9a('0x18')][_0x4a9a('0x7d')]?(_0x56fd96(window[_0x4a9a('0x18')]['getOrderForm']),_0x4a9a('0xc')===typeof _0x1d9561&&_0x1d9561(window[_0x4a9a('0x18')]['getOrderForm'])):_0x1ea535[_0x4a9a('0x80')]([_0x4a9a('0x75'),_0x4a9a('0x81'),_0x4a9a('0x82')],{'done':function(_0x1d1921){_0x56fd96[_0x4a9a('0x78')](this,_0x1d1921);_0x4a9a('0xc')===typeof _0x1d9561&&_0x1d9561(_0x1d1921);},'fail':function(_0x447ae6){_0x34fb3b([_0x4a9a('0x83'),_0x447ae6]);}});}else alert(_0x4a9a('0x84'));};_0x5990eb[_0x4a9a('0x5a')]=function(){var _0x3850c3=_0x1ea535(_0x4a9a('0x7b'));_0x3850c3[_0x4a9a('0x39')]('.qd-ddc-prodRow')[_0x4a9a('0x7')]?_0x3850c3[_0x4a9a('0x3d')](_0x4a9a('0x85')):_0x3850c3[_0x4a9a('0x86')]('qd-ddc-noItems');};_0x5990eb[_0x4a9a('0x77')]=function(_0x242f1b){var _0x458802=_0x1ea535(_0x4a9a('0x87'));_0x458802['empty']();_0x458802['each'](function(){var _0x458802=_0x1ea535(this),_0x5d09a2,_0x1869c5,_0x50b6ad=_0x1ea535(''),_0x4d280a;for(_0x4d280a in window[_0x4a9a('0x18')][_0x4a9a('0x7d')][_0x4a9a('0x75')])if(_0x4a9a('0x12')===typeof window[_0x4a9a('0x18')]['getOrderForm'][_0x4a9a('0x75')][_0x4d280a]){var _0x3a3e01=window['_QuatroDigital_DropDown'][_0x4a9a('0x7d')][_0x4a9a('0x75')][_0x4d280a];var _0x3866b8=_0x3a3e01[_0x4a9a('0x88')]['replace'](/^\/|\/$/g,'')[_0x4a9a('0x6')]('/');var _0x5f584a=_0x1ea535('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x5f584a[_0x4a9a('0x89')]({'data-sku':_0x3a3e01['id'],'data-sku-index':_0x4d280a,'data-qd-departament':_0x3866b8[0x0],'data-qd-category':_0x3866b8[_0x3866b8['length']-0x1]});_0x5f584a[_0x4a9a('0x86')](_0x4a9a('0x8a')+_0x3a3e01[_0x4a9a('0x8b')]);_0x5f584a[_0x4a9a('0x39')](_0x4a9a('0x8c'))[_0x4a9a('0x38')](_0x375264[_0x4a9a('0x8d')](_0x3a3e01));_0x5f584a[_0x4a9a('0x39')]('.qd-ddc-prodPrice')[_0x4a9a('0x38')](isNaN(_0x3a3e01[_0x4a9a('0x8e')])?_0x3a3e01[_0x4a9a('0x8e')]:0x0==_0x3a3e01[_0x4a9a('0x8e')]?_0x4a9a('0x8f'):(_0x1ea535('meta[name=currency]')[_0x4a9a('0x89')](_0x4a9a('0x90'))||'R$')+'\x20'+qd_number_format(_0x3a3e01[_0x4a9a('0x8e')]/0x64,0x2,',','.'));_0x5f584a[_0x4a9a('0x39')](_0x4a9a('0x91'))[_0x4a9a('0x89')]({'data-sku':_0x3a3e01['id'],'data-sku-index':_0x4d280a})[_0x4a9a('0x47')](_0x3a3e01['quantity']);_0x5f584a[_0x4a9a('0x39')]('.qd-ddc-remove')[_0x4a9a('0x89')]({'data-sku':_0x3a3e01['id'],'data-sku-index':_0x4d280a});_0x5990eb['insertProdImg'](_0x3a3e01['id'],_0x5f584a['find'](_0x4a9a('0x92')),_0x3a3e01[_0x4a9a('0x93')]);_0x5f584a['find'](_0x4a9a('0x94'))[_0x4a9a('0x89')]({'data-sku':_0x3a3e01['id'],'data-sku-index':_0x4d280a});_0x5f584a[_0x4a9a('0x95')](_0x458802);_0x50b6ad=_0x50b6ad[_0x4a9a('0x3b')](_0x5f584a);}try{var _0x205acd=_0x458802[_0x4a9a('0x0')](_0x4a9a('0x7b'))['find']('.qd-ddc-shipping\x20input');_0x205acd[_0x4a9a('0x7')]&&''==_0x205acd[_0x4a9a('0x47')]()&&window[_0x4a9a('0x18')][_0x4a9a('0x7d')][_0x4a9a('0x82')][_0x4a9a('0x96')]&&_0x205acd['val'](window[_0x4a9a('0x18')][_0x4a9a('0x7d')][_0x4a9a('0x82')][_0x4a9a('0x96')][_0x4a9a('0x97')]);}catch(_0x4870b4){_0x34fb3b(_0x4a9a('0x98')+_0x4870b4[_0x4a9a('0xf')],_0x4a9a('0x99'));}_0x5990eb['actionButtons'](_0x458802);_0x5990eb[_0x4a9a('0x5a')]();_0x242f1b&&_0x242f1b[_0x4a9a('0x9a')]&&function(){_0x1869c5=_0x50b6ad['filter']('[data-sku=\x27'+_0x242f1b[_0x4a9a('0x9a')]+'\x27]');_0x1869c5[_0x4a9a('0x7')]&&(_0x5d09a2=0x0,_0x50b6ad[_0x4a9a('0x6e')](function(){var _0x242f1b=_0x1ea535(this);if(_0x242f1b['is'](_0x1869c5))return!0x1;_0x5d09a2+=_0x242f1b[_0x4a9a('0x9b')]();}),_0x5990eb[_0x4a9a('0x44')](void 0x0,void 0x0,_0x5d09a2,_0x458802[_0x4a9a('0x3b')](_0x458802[_0x4a9a('0x9c')]())),_0x50b6ad[_0x4a9a('0x3d')]('qd-ddc-lastAddedFixed'),function(_0x432d1c){_0x432d1c[_0x4a9a('0x86')]('qd-ddc-lastAdded');_0x432d1c[_0x4a9a('0x86')](_0x4a9a('0x9d'));setTimeout(function(){_0x432d1c[_0x4a9a('0x3d')](_0x4a9a('0x9e'));},_0x375264['timeRemoveNewItemClass']);}(_0x1869c5),_0x1ea535(document[_0x4a9a('0x3f')])[_0x4a9a('0x86')](_0x4a9a('0x9f')),setTimeout(function(){_0x1ea535(document[_0x4a9a('0x3f')])[_0x4a9a('0x3d')]('qd-ddc-product-add-time-v2');},_0x375264[_0x4a9a('0x7a')]));}();});(function(){_QuatroDigital_DropDown[_0x4a9a('0x7d')][_0x4a9a('0x75')][_0x4a9a('0x7')]?(_0x1ea535(_0x4a9a('0x3f'))[_0x4a9a('0x3d')](_0x4a9a('0xa0'))[_0x4a9a('0x86')](_0x4a9a('0xa1')),setTimeout(function(){_0x1ea535(_0x4a9a('0x3f'))['removeClass']('qd-ddc-product-add-time');},_0x375264[_0x4a9a('0x7a')])):_0x1ea535(_0x4a9a('0x3f'))['removeClass'](_0x4a9a('0xa2'))[_0x4a9a('0x86')](_0x4a9a('0xa0'));}());_0x4a9a('0xc')===typeof _0x375264[_0x4a9a('0xa3')]?_0x375264[_0x4a9a('0xa3')][_0x4a9a('0x78')](this):_0x34fb3b(_0x4a9a('0xa4'));};_0x5990eb[_0x4a9a('0xa5')]=function(_0x49e8bc,_0x4c2d40,_0x48a6d7){function _0x5b583e(){_0x375264[_0x4a9a('0xa6')]&&_0x4a9a('0xa7')==typeof _0x48a6d7&&(_0x48a6d7=_0x48a6d7[_0x4a9a('0x1')](_0x4a9a('0xa8'),_0x4a9a('0xa9')));_0x4c2d40[_0x4a9a('0x3d')](_0x4a9a('0xaa'))['load'](function(){_0x1ea535(this)[_0x4a9a('0x86')](_0x4a9a('0xaa'));})[_0x4a9a('0x89')](_0x4a9a('0xab'),_0x48a6d7);}_0x48a6d7?_0x5b583e():isNaN(_0x49e8bc)?_0x34fb3b('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0x4a9a('0x15')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x5990eb[_0x4a9a('0xac')]=function(_0x151486){var _0x458802=function(_0x23de37,_0x27eadf){var _0x52a734=_0x1ea535(_0x23de37);var _0x559130=_0x52a734[_0x4a9a('0x89')]('data-sku');var _0x3866b8=_0x52a734['attr'](_0x4a9a('0xad'));if(_0x559130){var _0x4b20c0=parseInt(_0x52a734['val']())||0x1;_0x5990eb[_0x4a9a('0xae')]([_0x559130,_0x3866b8],_0x4b20c0,_0x4b20c0+0x1,function(_0x3b7e15){_0x52a734[_0x4a9a('0x47')](_0x3b7e15);_0x4a9a('0xc')===typeof _0x27eadf&&_0x27eadf();});}};var _0x1fba81=function(_0x441ff6,_0x14ebae){var _0x458802=_0x1ea535(_0x441ff6);var _0x3c6eca=_0x458802[_0x4a9a('0x89')](_0x4a9a('0xaf'));var _0x195b94=_0x458802[_0x4a9a('0x89')](_0x4a9a('0xad'));if(_0x3c6eca){var _0x3866b8=parseInt(_0x458802['val']())||0x2;_0x5990eb['changeQantity']([_0x3c6eca,_0x195b94],_0x3866b8,_0x3866b8-0x1,function(_0x4f79b7){_0x458802[_0x4a9a('0x47')](_0x4f79b7);_0x4a9a('0xc')===typeof _0x14ebae&&_0x14ebae();});}};var _0x30ce77=function(_0xe51723,_0x41f006){var _0x32efe6=_0x1ea535(_0xe51723);var _0xa60ac0=_0x32efe6[_0x4a9a('0x89')](_0x4a9a('0xaf'));var _0x3866b8=_0x32efe6[_0x4a9a('0x89')]('data-sku-index');if(_0xa60ac0){var _0x4672af=parseInt(_0x32efe6['val']())||0x1;_0x5990eb[_0x4a9a('0xae')]([_0xa60ac0,_0x3866b8],0x1,_0x4672af,function(_0x161ce6){_0x32efe6[_0x4a9a('0x47')](_0x161ce6);_0x4a9a('0xc')===typeof _0x41f006&&_0x41f006();});}};var _0x3866b8=_0x151486[_0x4a9a('0x39')](_0x4a9a('0xb0'));_0x3866b8[_0x4a9a('0x86')](_0x4a9a('0xb1'))[_0x4a9a('0x6e')](function(){var _0x151486=_0x1ea535(this);_0x151486[_0x4a9a('0x39')](_0x4a9a('0xb2'))['on'](_0x4a9a('0xb3'),function(_0x69cef7){_0x69cef7[_0x4a9a('0x4c')]();_0x3866b8[_0x4a9a('0x86')](_0x4a9a('0xb4'));_0x458802(_0x151486[_0x4a9a('0x39')](_0x4a9a('0x91')),function(){_0x3866b8[_0x4a9a('0x3d')](_0x4a9a('0xb4'));});});_0x151486['find'](_0x4a9a('0xb5'))['on'](_0x4a9a('0xb6'),function(_0x1fff3d){_0x1fff3d[_0x4a9a('0x4c')]();_0x3866b8['addClass'](_0x4a9a('0xb4'));_0x1fba81(_0x151486['find']('.qd-ddc-quantity'),function(){_0x3866b8[_0x4a9a('0x3d')](_0x4a9a('0xb4'));});});_0x151486[_0x4a9a('0x39')](_0x4a9a('0x91'))['on'](_0x4a9a('0xb7'),function(){_0x3866b8[_0x4a9a('0x86')](_0x4a9a('0xb4'));_0x30ce77(this,function(){_0x3866b8[_0x4a9a('0x3d')]('qd-loading');});});_0x151486['find']('.qd-ddc-quantity')['on'](_0x4a9a('0xb8'),function(_0x14c617){0xd==_0x14c617[_0x4a9a('0x41')]&&(_0x3866b8['addClass'](_0x4a9a('0xb4')),_0x30ce77(this,function(){_0x3866b8['removeClass'](_0x4a9a('0xb4'));}));});});_0x151486[_0x4a9a('0x39')](_0x4a9a('0xb9'))[_0x4a9a('0x6e')](function(){var _0x151486=_0x1ea535(this);_0x151486[_0x4a9a('0x39')](_0x4a9a('0xba'))['on'](_0x4a9a('0xbb'),function(){_0x151486['addClass']('qd-loading');_0x5990eb['removeProduct'](_0x1ea535(this),function(_0x458997){_0x458997?_0x151486[_0x4a9a('0xbc')](!0x0)['slideUp'](function(){_0x151486[_0x4a9a('0xbd')]();_0x5990eb['cartIsEmpty']();}):_0x151486[_0x4a9a('0x3d')](_0x4a9a('0xb4'));});return!0x1;});});};_0x5990eb[_0x4a9a('0x48')]=function(_0x56ff91){var _0x2366a8=_0x56ff91[_0x4a9a('0x47')]();_0x2366a8=_0x2366a8[_0x4a9a('0x1')](/[^0-9\-]/g,'');_0x2366a8=_0x2366a8[_0x4a9a('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x4a9a('0xbe'));_0x2366a8=_0x2366a8['replace'](/(.{9}).*/g,'$1');_0x56ff91[_0x4a9a('0x47')](_0x2366a8);};_0x5990eb[_0x4a9a('0x55')]=function(_0x560024){var _0x1f347e=_0x560024[_0x4a9a('0x47')]();0x9<=_0x1f347e['length']&&(_0x560024[_0x4a9a('0xbf')]('qdDdcLastPostalCode')!=_0x1f347e&&_0x207f6f['calculateShipping']({'postalCode':_0x1f347e,'country':_0x4a9a('0xc0')})[_0x4a9a('0xc1')](function(_0x17120b){_0x560024[_0x4a9a('0x52')](_0x4a9a('0xc2'))[_0x4a9a('0x39')](_0x4a9a('0xc3'))[_0x4a9a('0xbd')]();window[_0x4a9a('0x18')][_0x4a9a('0x7d')]=_0x17120b;_0x5990eb[_0x4a9a('0xc4')]();_0x17120b=_0x17120b[_0x4a9a('0x82')][_0x4a9a('0xc5')][0x0]['slas'];for(var _0x3866b8=_0x1ea535(_0x4a9a('0xc6')),_0x45d2fd=0x0;_0x45d2fd<_0x17120b[_0x4a9a('0x7')];_0x45d2fd++){var _0x3c46aa=_0x17120b[_0x45d2fd],_0x4584a1=0x1<_0x3c46aa[_0x4a9a('0xc7')]?_0x3c46aa['shippingEstimate'][_0x4a9a('0x1')]('bd',_0x4a9a('0xc8')):_0x3c46aa['shippingEstimate']['replace']('bd',_0x4a9a('0xc9')),_0x5dfc29=_0x1ea535(_0x4a9a('0xca'));_0x5dfc29[_0x4a9a('0x38')]('<td>\x20R$\x20'+qd_number_format(_0x3c46aa['price']/0x64,0x2,',','.')+_0x4a9a('0xcb')+_0x3c46aa[_0x4a9a('0x2b')]+_0x4a9a('0xcc')+_0x4584a1+'\x20para\x20o\x20CEP\x20'+_0x1f347e+_0x4a9a('0xcd'));_0x5dfc29[_0x4a9a('0x95')](_0x3866b8[_0x4a9a('0x39')](_0x4a9a('0xce')));}_0x3866b8[_0x4a9a('0xcf')](_0x560024[_0x4a9a('0x52')](_0x4a9a('0xc2'))[_0x4a9a('0x39')](_0x4a9a('0x4e')));})[_0x4a9a('0xd0')](function(_0x6870e3){_0x34fb3b(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x6870e3]);updateCartData();}),_0x560024[_0x4a9a('0xbf')]('qdDdcLastPostalCode',_0x1f347e));};_0x5990eb['changeQantity']=function(_0x1d7e83,_0x414d77,_0x5d9385,_0x49a499){function _0x97a33d(_0xc5163){_0xc5163=_0x4a9a('0xd1')!==typeof _0xc5163?!0x1:_0xc5163;_0x5990eb[_0x4a9a('0xc4')]();window['_QuatroDigital_DropDown'][_0x4a9a('0x19')]=!0x1;_0x5990eb[_0x4a9a('0x5a')]();_0x4a9a('0x3')!==typeof window[_0x4a9a('0x7e')]&&_0x4a9a('0xc')===typeof window['_QuatroDigital_AmountProduct'][_0x4a9a('0x7f')]&&window[_0x4a9a('0x7e')][_0x4a9a('0x7f')]['call'](this);_0x4a9a('0xc')===typeof adminCart&&adminCart();_0x1ea535['fn']['simpleCart'](!0x0,void 0x0,_0xc5163);_0x4a9a('0xc')===typeof _0x49a499&&_0x49a499(_0x414d77);}_0x5d9385=_0x5d9385||0x1;if(0x1>_0x5d9385)return _0x414d77;if(_0x375264[_0x4a9a('0x2c')]){if('undefined'===typeof window[_0x4a9a('0x18')][_0x4a9a('0x7d')][_0x4a9a('0x75')][_0x1d7e83[0x1]])return _0x34fb3b(_0x4a9a('0xd2')+_0x1d7e83[0x1]+']'),_0x414d77;window[_0x4a9a('0x18')][_0x4a9a('0x7d')]['items'][_0x1d7e83[0x1]][_0x4a9a('0xd3')]=_0x5d9385;window['_QuatroDigital_DropDown'][_0x4a9a('0x7d')][_0x4a9a('0x75')][_0x1d7e83[0x1]][_0x4a9a('0xd4')]=_0x1d7e83[0x1];_0x207f6f[_0x4a9a('0xd5')]([window['_QuatroDigital_DropDown'][_0x4a9a('0x7d')][_0x4a9a('0x75')][_0x1d7e83[0x1]]],[_0x4a9a('0x75'),_0x4a9a('0x81'),_0x4a9a('0x82')])[_0x4a9a('0xc1')](function(_0x538dfb){window[_0x4a9a('0x18')][_0x4a9a('0x7d')]=_0x538dfb;_0x97a33d(!0x0);})['fail'](function(_0x5748ad){_0x34fb3b([_0x4a9a('0xd6'),_0x5748ad]);_0x97a33d();});}else _0x34fb3b('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x5990eb['removeProduct']=function(_0xeb0ac9,_0x983367){function _0x2eac64(_0x5165a1){_0x5165a1=_0x4a9a('0xd1')!==typeof _0x5165a1?!0x1:_0x5165a1;_0x4a9a('0x3')!==typeof window[_0x4a9a('0x7e')]&&_0x4a9a('0xc')===typeof window[_0x4a9a('0x7e')]['exec']&&window[_0x4a9a('0x7e')][_0x4a9a('0x7f')]['call'](this);'function'===typeof adminCart&&adminCart();_0x1ea535['fn']['simpleCart'](!0x0,void 0x0,_0x5165a1);_0x4a9a('0xc')===typeof _0x983367&&_0x983367(_0x4f0b74);}var _0x4f0b74=!0x1,_0x3866b8=_0x1ea535(_0xeb0ac9)[_0x4a9a('0x89')](_0x4a9a('0xad'));if(_0x375264['smartCheckout']){if('undefined'===typeof window[_0x4a9a('0x18')][_0x4a9a('0x7d')][_0x4a9a('0x75')][_0x3866b8])return _0x34fb3b('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3866b8+']'),_0x4f0b74;window[_0x4a9a('0x18')][_0x4a9a('0x7d')][_0x4a9a('0x75')][_0x3866b8][_0x4a9a('0xd4')]=_0x3866b8;_0x207f6f[_0x4a9a('0xd7')]([window[_0x4a9a('0x18')]['getOrderForm'][_0x4a9a('0x75')][_0x3866b8]],[_0x4a9a('0x75'),_0x4a9a('0x81'),'shippingData'])[_0x4a9a('0xc1')](function(_0x5b5cf9){_0x4f0b74=!0x0;window[_0x4a9a('0x18')][_0x4a9a('0x7d')]=_0x5b5cf9;_0x1e3479(_0x5b5cf9);_0x2eac64(!0x0);})[_0x4a9a('0xd0')](function(_0x2b55fc){_0x34fb3b(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x2b55fc]);_0x2eac64();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x5990eb[_0x4a9a('0x44')]=function(_0x41b2e3,_0x153f28,_0x46fe46,_0x35f797){_0x35f797=_0x35f797||_0x1ea535(_0x4a9a('0xd8'));_0x41b2e3=_0x41b2e3||'+';_0x153f28=_0x153f28||0.9*_0x35f797[_0x4a9a('0xd9')]();_0x35f797['stop'](!0x0,!0x0)[_0x4a9a('0xda')]({'scrollTop':isNaN(_0x46fe46)?_0x41b2e3+'='+_0x153f28+'px':_0x46fe46});};_0x375264[_0x4a9a('0x57')]||(_0x5990eb[_0x4a9a('0xc4')](),_0x1ea535['fn'][_0x4a9a('0x59')](!0x0));_0x1ea535(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x4a9a('0x18')]['getOrderForm']=void 0x0,_0x5990eb[_0x4a9a('0xc4')]();}catch(_0x636a84){_0x34fb3b(_0x4a9a('0xdb')+_0x636a84['message'],_0x4a9a('0xdc'));}});_0x4a9a('0xc')===typeof _0x375264[_0x4a9a('0xa')]?_0x375264['callback']['call'](this):_0x34fb3b(_0x4a9a('0xdd'));};_0x1ea535['fn']['QD_dropDownCart']=function(_0x3d6872){var _0x206b54=_0x1ea535(this);_0x206b54['fn']=new _0x1ea535['QD_dropDownCart'](this,_0x3d6872);return _0x206b54;};}catch(_0x1c7274){_0x4a9a('0x3')!==typeof console&&_0x4a9a('0xc')===typeof console['error']&&console[_0x4a9a('0xd')](_0x4a9a('0xe'),_0x1c7274);}}(this));(function(_0x1f09ea){try{var _0x224bb6=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x4a9a('0x7e')]||{};window[_0x4a9a('0x7e')]['items']={};window[_0x4a9a('0x7e')][_0x4a9a('0xde')]=!0x1;window[_0x4a9a('0x7e')][_0x4a9a('0xdf')]=!0x1;window[_0x4a9a('0x7e')][_0x4a9a('0xe0')]=!0x1;var _0x1724c5=function(){if(window[_0x4a9a('0x7e')]['allowRecalculate']){var _0xbcb959=!0x1;var _0xf1d0ab={};window[_0x4a9a('0x7e')]['items']={};for(_0x2261f2 in window[_0x4a9a('0x18')][_0x4a9a('0x7d')]['items'])if(_0x4a9a('0x12')===typeof window[_0x4a9a('0x18')][_0x4a9a('0x7d')][_0x4a9a('0x75')][_0x2261f2]){var _0x186d3d=window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x2261f2];'undefined'!==typeof _0x186d3d['productId']&&null!==_0x186d3d[_0x4a9a('0xe1')]&&''!==_0x186d3d[_0x4a9a('0xe1')]&&(window[_0x4a9a('0x7e')]['items'][_0x4a9a('0xe2')+_0x186d3d[_0x4a9a('0xe1')]]=window[_0x4a9a('0x7e')][_0x4a9a('0x75')]['prod_'+_0x186d3d[_0x4a9a('0xe1')]]||{},window['_QuatroDigital_AmountProduct'][_0x4a9a('0x75')][_0x4a9a('0xe2')+_0x186d3d[_0x4a9a('0xe1')]]['prodId']=_0x186d3d['productId'],_0xf1d0ab[_0x4a9a('0xe2')+_0x186d3d['productId']]||(window[_0x4a9a('0x7e')][_0x4a9a('0x75')][_0x4a9a('0xe2')+_0x186d3d['productId']][_0x4a9a('0x70')]=0x0),window['_QuatroDigital_AmountProduct'][_0x4a9a('0x75')][_0x4a9a('0xe2')+_0x186d3d[_0x4a9a('0xe1')]][_0x4a9a('0x70')]+=_0x186d3d['quantity'],_0xbcb959=!0x0,_0xf1d0ab['prod_'+_0x186d3d['productId']]=!0x0);}var _0x2261f2=_0xbcb959;}else _0x2261f2=void 0x0;window['_QuatroDigital_AmountProduct']['allowRecalculate']&&(_0x224bb6(_0x4a9a('0xe3'))[_0x4a9a('0xbd')](),_0x224bb6('.qd-bap-item-added')[_0x4a9a('0x3d')](_0x4a9a('0xe4')));for(var _0x4993a2 in window[_0x4a9a('0x7e')][_0x4a9a('0x75')]){_0x186d3d=window[_0x4a9a('0x7e')][_0x4a9a('0x75')][_0x4993a2];if(_0x4a9a('0x12')!==typeof _0x186d3d)return;_0xf1d0ab=_0x224bb6('input.qd-productId[value='+_0x186d3d[_0x4a9a('0xe5')]+']')['getParent']('li');if(window[_0x4a9a('0x7e')]['allowRecalculate']||!_0xf1d0ab[_0x4a9a('0x39')](_0x4a9a('0xe3'))[_0x4a9a('0x7')])_0xbcb959=_0x224bb6(_0x4a9a('0xe6')),_0xbcb959['find'](_0x4a9a('0xe7'))[_0x4a9a('0x65')](_0x186d3d[_0x4a9a('0x70')]),_0x186d3d=_0xf1d0ab[_0x4a9a('0x39')](_0x4a9a('0xe8')),_0x186d3d['length']?_0x186d3d[_0x4a9a('0xe9')](_0xbcb959)[_0x4a9a('0x86')]('qd-bap-item-added'):_0xf1d0ab[_0x4a9a('0xe9')](_0xbcb959);}_0x2261f2&&(window[_0x4a9a('0x7e')][_0x4a9a('0xde')]=!0x1);};window[_0x4a9a('0x7e')][_0x4a9a('0x7f')]=function(){window[_0x4a9a('0x7e')][_0x4a9a('0xde')]=!0x0;_0x1724c5[_0x4a9a('0x78')](this);};_0x224bb6(document)[_0x4a9a('0xea')](function(){_0x1724c5[_0x4a9a('0x78')](this);});}catch(_0x20f282){'undefined'!==typeof console&&_0x4a9a('0xc')===typeof console['error']&&console[_0x4a9a('0xd')](_0x4a9a('0xe'),_0x20f282);}}(this));(function(){try{var _0x3842e5=jQuery,_0x447d85,_0x119b01={'selector':_0x4a9a('0xeb'),'dropDown':{},'buyButton':{}};_0x3842e5['QD_smartCart']=function(_0x2c53fd){var _0x2886ea={};_0x447d85=_0x3842e5[_0x4a9a('0x25')](!0x0,{},_0x119b01,_0x2c53fd);_0x2c53fd=_0x3842e5(_0x447d85[_0x4a9a('0xec')])[_0x4a9a('0x1a')](_0x447d85[_0x4a9a('0xed')]);_0x2886ea[_0x4a9a('0xee')]=_0x4a9a('0x3')!==typeof _0x447d85['dropDown'][_0x4a9a('0x57')]&&!0x1===_0x447d85['dropDown'][_0x4a9a('0x57')]?_0x3842e5(_0x447d85[_0x4a9a('0xec')])[_0x4a9a('0xef')](_0x2c53fd['fn'],_0x447d85[_0x4a9a('0xee')]):_0x3842e5(_0x447d85['selector'])['QD_buyButton'](_0x447d85['buyButton']);_0x2886ea[_0x4a9a('0xed')]=_0x2c53fd;return _0x2886ea;};_0x3842e5['fn'][_0x4a9a('0xf0')]=function(){_0x4a9a('0x12')===typeof console&&_0x4a9a('0xc')===typeof console[_0x4a9a('0x10')]&&console['info']('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x3842e5[_0x4a9a('0xf0')]=_0x3842e5['fn']['smartCart'];}catch(_0x4a44e6){_0x4a9a('0x3')!==typeof console&&_0x4a9a('0xc')===typeof console[_0x4a9a('0xd')]&&console[_0x4a9a('0xd')](_0x4a9a('0xe'),_0x4a44e6);}}());
var _0x6829=['toLowerCase','aviso','info','apply','qd-ssa-sku-no-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','qd-ssa-hide','qd-ssa-show','length','filter','[data-qd-ssa-text=\x22default\x22]','addClass','html','replace','show','removeClass','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','sku','trigger','vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','naghnevbanpvbany%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','unavailable','off','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','qdAjaxQueue','qdAjax','extend','url','opts','success','error','call','parameters','callbackFns','boolean','successPopulated','errorPopulated','completePopulated','object','complete','clearQueueDelay','undefined','jqXHR','readyState','textStatus','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta'];(function(_0x56e5b9,_0x4c1b06){var _0x3e1ada=function(_0x351bfa){while(--_0x351bfa){_0x56e5b9['push'](_0x56e5b9['shift']());}};_0x3e1ada(++_0x4c1b06);}(_0x6829,0x1d5));var _0x541a=function(_0x1d95df,_0x4f7f06){_0x1d95df=_0x1d95df-0x0;var _0x595eb1=_0x6829[_0x1d95df];return _0x595eb1;};(function(_0x528b6d){if('function'!==typeof _0x528b6d['qdAjax']){var _0x62d9fc={};_0x528b6d[_0x541a('0x0')]=_0x62d9fc;_0x528b6d[_0x541a('0x1')]=function(_0x5566e5){var _0x44c18e=_0x528b6d[_0x541a('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x5566e5);var _0x1f2032=escape(encodeURIComponent(_0x44c18e[_0x541a('0x3')]));_0x62d9fc[_0x1f2032]=_0x62d9fc[_0x1f2032]||{};_0x62d9fc[_0x1f2032]['opts']=_0x62d9fc[_0x1f2032][_0x541a('0x4')]||[];_0x62d9fc[_0x1f2032][_0x541a('0x4')]['push']({'success':function(_0x5b5f22,_0x1750e2,_0x3fac39){_0x44c18e[_0x541a('0x5')]['call'](this,_0x5b5f22,_0x1750e2,_0x3fac39);},'error':function(_0x4f0228,_0x3e3770,_0x4ff60b){_0x44c18e[_0x541a('0x6')][_0x541a('0x7')](this,_0x4f0228,_0x3e3770,_0x4ff60b);},'complete':function(_0x2ac84d,_0x8a573c){_0x44c18e['complete']['call'](this,_0x2ac84d,_0x8a573c);}});_0x62d9fc[_0x1f2032][_0x541a('0x8')]=_0x62d9fc[_0x1f2032][_0x541a('0x8')]||{'success':{},'error':{},'complete':{}};_0x62d9fc[_0x1f2032][_0x541a('0x9')]=_0x62d9fc[_0x1f2032]['callbackFns']||{};_0x62d9fc[_0x1f2032][_0x541a('0x9')]['successPopulated']=_0x541a('0xa')===typeof _0x62d9fc[_0x1f2032]['callbackFns'][_0x541a('0xb')]?_0x62d9fc[_0x1f2032][_0x541a('0x9')][_0x541a('0xb')]:!0x1;_0x62d9fc[_0x1f2032][_0x541a('0x9')][_0x541a('0xc')]=_0x541a('0xa')===typeof _0x62d9fc[_0x1f2032]['callbackFns'][_0x541a('0xc')]?_0x62d9fc[_0x1f2032][_0x541a('0x9')][_0x541a('0xc')]:!0x1;_0x62d9fc[_0x1f2032][_0x541a('0x9')][_0x541a('0xd')]=_0x541a('0xa')===typeof _0x62d9fc[_0x1f2032]['callbackFns'][_0x541a('0xd')]?_0x62d9fc[_0x1f2032][_0x541a('0x9')][_0x541a('0xd')]:!0x1;_0x5566e5=_0x528b6d[_0x541a('0x2')]({},_0x44c18e,{'success':function(_0x5b03fd,_0x22e608,_0x24a0ce){_0x62d9fc[_0x1f2032]['parameters'][_0x541a('0x5')]={'data':_0x5b03fd,'textStatus':_0x22e608,'jqXHR':_0x24a0ce};_0x62d9fc[_0x1f2032]['callbackFns'][_0x541a('0xb')]=!0x0;for(var _0x11836c in _0x62d9fc[_0x1f2032][_0x541a('0x4')])_0x541a('0xe')===typeof _0x62d9fc[_0x1f2032][_0x541a('0x4')][_0x11836c]&&(_0x62d9fc[_0x1f2032]['opts'][_0x11836c]['success']['call'](this,_0x5b03fd,_0x22e608,_0x24a0ce),_0x62d9fc[_0x1f2032][_0x541a('0x4')][_0x11836c][_0x541a('0x5')]=function(){});},'error':function(_0x3adfe3,_0x27b8a0,_0x2ec29f){_0x62d9fc[_0x1f2032][_0x541a('0x8')][_0x541a('0x6')]={'errorThrown':_0x2ec29f,'textStatus':_0x27b8a0,'jqXHR':_0x3adfe3};_0x62d9fc[_0x1f2032][_0x541a('0x9')][_0x541a('0xc')]=!0x0;for(var _0x397ae3 in _0x62d9fc[_0x1f2032][_0x541a('0x4')])_0x541a('0xe')===typeof _0x62d9fc[_0x1f2032][_0x541a('0x4')][_0x397ae3]&&(_0x62d9fc[_0x1f2032][_0x541a('0x4')][_0x397ae3][_0x541a('0x6')][_0x541a('0x7')](this,_0x3adfe3,_0x27b8a0,_0x2ec29f),_0x62d9fc[_0x1f2032]['opts'][_0x397ae3][_0x541a('0x6')]=function(){});},'complete':function(_0x5705a7,_0x5f8d64){_0x62d9fc[_0x1f2032]['parameters']['complete']={'textStatus':_0x5f8d64,'jqXHR':_0x5705a7};_0x62d9fc[_0x1f2032][_0x541a('0x9')][_0x541a('0xd')]=!0x0;for(var _0x17e8f3 in _0x62d9fc[_0x1f2032][_0x541a('0x4')])'object'===typeof _0x62d9fc[_0x1f2032][_0x541a('0x4')][_0x17e8f3]&&(_0x62d9fc[_0x1f2032][_0x541a('0x4')][_0x17e8f3][_0x541a('0xf')][_0x541a('0x7')](this,_0x5705a7,_0x5f8d64),_0x62d9fc[_0x1f2032][_0x541a('0x4')][_0x17e8f3][_0x541a('0xf')]=function(){});isNaN(parseInt(_0x44c18e[_0x541a('0x10')]))||setTimeout(function(){_0x62d9fc[_0x1f2032]['jqXHR']=void 0x0;_0x62d9fc[_0x1f2032][_0x541a('0x4')]=void 0x0;_0x62d9fc[_0x1f2032][_0x541a('0x8')]=void 0x0;_0x62d9fc[_0x1f2032][_0x541a('0x9')]=void 0x0;},_0x44c18e['clearQueueDelay']);}});_0x541a('0x11')===typeof _0x62d9fc[_0x1f2032][_0x541a('0x12')]?_0x62d9fc[_0x1f2032][_0x541a('0x12')]=_0x528b6d['ajax'](_0x5566e5):_0x62d9fc[_0x1f2032][_0x541a('0x12')]&&_0x62d9fc[_0x1f2032]['jqXHR']['readyState']&&0x4==_0x62d9fc[_0x1f2032][_0x541a('0x12')][_0x541a('0x13')]&&(_0x62d9fc[_0x1f2032][_0x541a('0x9')]['successPopulated']&&_0x5566e5[_0x541a('0x5')](_0x62d9fc[_0x1f2032]['parameters'][_0x541a('0x5')]['data'],_0x62d9fc[_0x1f2032]['parameters']['success'][_0x541a('0x14')],_0x62d9fc[_0x1f2032][_0x541a('0x8')]['success'][_0x541a('0x12')]),_0x62d9fc[_0x1f2032]['callbackFns']['errorPopulated']&&_0x5566e5[_0x541a('0x6')](_0x62d9fc[_0x1f2032]['parameters'][_0x541a('0x6')][_0x541a('0x12')],_0x62d9fc[_0x1f2032][_0x541a('0x8')]['error']['textStatus'],_0x62d9fc[_0x1f2032][_0x541a('0x8')][_0x541a('0x6')]['errorThrown']),_0x62d9fc[_0x1f2032][_0x541a('0x9')][_0x541a('0xd')]&&_0x5566e5[_0x541a('0xf')](_0x62d9fc[_0x1f2032]['parameters'][_0x541a('0xf')][_0x541a('0x12')],_0x62d9fc[_0x1f2032]['parameters'][_0x541a('0xf')][_0x541a('0x14')]));};_0x528b6d[_0x541a('0x1')][_0x541a('0x15')]=_0x541a('0x16');}}(jQuery));(function(_0x5c4d94){function _0x5cdd91(_0x2f3652,_0x373f33){_0x580d5f['qdAjax']({'url':_0x541a('0x17')+_0x2f3652,'clearQueueDelay':null,'success':_0x373f33,'error':function(){_0x360ce5(_0x541a('0x18'));}});}var _0x580d5f=jQuery;if(_0x541a('0x19')!==typeof _0x580d5f['fn'][_0x541a('0x1a')]){var _0x360ce5=function(_0x42c6bf,_0x120d84){if(_0x541a('0xe')===typeof console){var _0x4415a6;_0x541a('0xe')===typeof _0x42c6bf?(_0x42c6bf['unshift'](_0x541a('0x1b')),_0x4415a6=_0x42c6bf):_0x4415a6=[_0x541a('0x1b')+_0x42c6bf];_0x541a('0x11')===typeof _0x120d84||_0x541a('0x1c')!==_0x120d84[_0x541a('0x1d')]()&&_0x541a('0x1e')!==_0x120d84[_0x541a('0x1d')]()?_0x541a('0x11')!==typeof _0x120d84&&_0x541a('0x1f')===_0x120d84[_0x541a('0x1d')]()?console[_0x541a('0x1f')][_0x541a('0x20')](console,_0x4415a6):console['error'][_0x541a('0x20')](console,_0x4415a6):console['warn']['apply'](console,_0x4415a6);}},_0x4781f8={},_0x3b258b=function(_0x451860,_0x12cdb4){function _0x23be3f(_0x26aefb){try{_0x451860['removeClass'](_0x541a('0x21'))['addClass']('qd-ssa-sku-selected');var _0x33614b=_0x26aefb[0x0][_0x541a('0x22')][0x0][_0x541a('0x23')];_0x451860[_0x541a('0x24')](_0x541a('0x25'),_0x33614b);_0x451860[_0x541a('0x26')](function(){var _0x451860=_0x580d5f(this)[_0x541a('0x27')](_0x541a('0x28'));if(0x1>_0x33614b)return _0x451860['hide']()['addClass'](_0x541a('0x29'))['removeClass'](_0x541a('0x2a'));var _0x26aefb=_0x451860['filter']('[data-qd-ssa-text=\x22'+_0x33614b+'\x22]');_0x26aefb=_0x26aefb[_0x541a('0x2b')]?_0x26aefb:_0x451860[_0x541a('0x2c')](_0x541a('0x2d'));_0x451860['hide']()[_0x541a('0x2e')](_0x541a('0x29'))['removeClass'](_0x541a('0x2a'));_0x26aefb[_0x541a('0x2f')]((_0x26aefb[_0x541a('0x2f')]()||'')[_0x541a('0x30')]('#qtt',_0x33614b));_0x26aefb[_0x541a('0x31')]()['addClass'](_0x541a('0x2a'))[_0x541a('0x32')](_0x541a('0x29'));});}catch(_0x5731f0){_0x360ce5([_0x541a('0x33'),_0x5731f0[_0x541a('0x34')]]);}}if(_0x451860[_0x541a('0x2b')]){_0x451860[_0x541a('0x2e')](_0x541a('0x35'));_0x451860[_0x541a('0x2e')](_0x541a('0x21'));try{_0x451860[_0x541a('0x2e')](_0x541a('0x36')+vtxctx[_0x541a('0x37')][_0x541a('0x38')](';')[_0x541a('0x2b')]);}catch(_0x4cae41){_0x360ce5([_0x541a('0x39'),_0x4cae41[_0x541a('0x34')]]);}_0x580d5f(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0xd301be,_0x43c7a6,_0x5ae525){try{_0x5cdd91(_0x5ae525[_0x541a('0x3a')],function(_0x5e58bf){_0x23be3f(_0x5e58bf);0x1===vtxctx[_0x541a('0x37')][_0x541a('0x38')](';')[_0x541a('0x2b')]&&0x0==_0x5e58bf[0x0]['SkuSellersInformation'][0x0][_0x541a('0x23')]&&_0x580d5f(window)[_0x541a('0x3b')]('QuatroDigital.ssa.prodUnavailable');});}catch(_0x365419){_0x360ce5(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x365419[_0x541a('0x34')]]);}});_0x580d5f(window)['off'](_0x541a('0x3c'));_0x580d5f(window)['on'](_0x541a('0x3d'),function(){_0x451860['addClass'](_0x541a('0x3e'))['hide']();});}};_0x5c4d94=function(_0x561a18){var _0x3ae5d7={'f':_0x541a('0x3f')};return function(_0x283cf2){var _0x538b19=function(_0xff1d9b){return _0xff1d9b;};var _0x5bc583=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x283cf2=_0x283cf2['d'+_0x5bc583[0x10]+'c'+_0x5bc583[0x11]+'m'+_0x538b19(_0x5bc583[0x1])+'n'+_0x5bc583[0xd]]['l'+_0x5bc583[0x12]+'c'+_0x5bc583[0x0]+'ti'+_0x538b19('o')+'n'];var _0x26363a=function(_0x520cb5){return escape(encodeURIComponent(_0x520cb5['replace'](/\./g,'¨')[_0x541a('0x30')](/[a-zA-Z]/g,function(_0x270580){return String[_0x541a('0x40')](('Z'>=_0x270580?0x5a:0x7a)>=(_0x270580=_0x270580[_0x541a('0x41')](0x0)+0xd)?_0x270580:_0x270580-0x1a);})));};var _0x4db437=_0x26363a(_0x283cf2[[_0x5bc583[0x9],_0x538b19('o'),_0x5bc583[0xc],_0x5bc583[_0x538b19(0xd)]][_0x541a('0x42')]('')]);_0x26363a=_0x26363a((window[['js',_0x538b19('no'),'m',_0x5bc583[0x1],_0x5bc583[0x4][_0x541a('0x43')](),_0x541a('0x44')][_0x541a('0x42')]('')]||_0x541a('0x45'))+['.v',_0x5bc583[0xd],'e',_0x538b19('x'),'co',_0x538b19('mm'),'erc',_0x5bc583[0x1],'.c',_0x538b19('o'),'m.',_0x5bc583[0x13],'r'][_0x541a('0x42')](''));for(var _0x202f8e in _0x3ae5d7){if(_0x26363a===_0x202f8e+_0x3ae5d7[_0x202f8e]||_0x4db437===_0x202f8e+_0x3ae5d7[_0x202f8e]){var _0x46fc54='tr'+_0x5bc583[0x11]+'e';break;}_0x46fc54='f'+_0x5bc583[0x0]+'ls'+_0x538b19(_0x5bc583[0x1])+'';}_0x538b19=!0x1;-0x1<_0x283cf2[[_0x5bc583[0xc],'e',_0x5bc583[0x0],'rc',_0x5bc583[0x9]][_0x541a('0x42')]('')][_0x541a('0x46')](_0x541a('0x47'))&&(_0x538b19=!0x0);return[_0x46fc54,_0x538b19];}(_0x561a18);}(window);if(!eval(_0x5c4d94[0x0]))return _0x5c4d94[0x1]?_0x360ce5(_0x541a('0x48')):!0x1;_0x580d5f['fn'][_0x541a('0x1a')]=function(_0x23e73e){var _0xf25569=_0x580d5f(this);_0x23e73e=_0x580d5f[_0x541a('0x2')](!0x0,{},_0x4781f8,_0x23e73e);_0xf25569[_0x541a('0x49')]=new _0x3b258b(_0xf25569,_0x23e73e);try{'object'===typeof _0x580d5f['fn'][_0x541a('0x1a')][_0x541a('0x4a')]&&_0x580d5f(window)[_0x541a('0x3b')](_0x541a('0x4b'),[_0x580d5f['fn'][_0x541a('0x1a')]['initialSkuSelected'][_0x541a('0x4c')],_0x580d5f['fn']['QD_smartStockAvailable']['initialSkuSelected'][_0x541a('0x3a')]]);}catch(_0x1d5be4){_0x360ce5(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x1d5be4[_0x541a('0x34')]]);}_0x580d5f['fn'][_0x541a('0x1a')][_0x541a('0x4d')]&&_0x580d5f(window)[_0x541a('0x3b')]('QuatroDigital.ssa.prodUnavailable');return _0xf25569;};_0x580d5f(window)['on'](_0x541a('0x3c'),function(_0x1f8bb4,_0x1a73f8,_0x1a8147){try{_0x580d5f['fn']['QD_smartStockAvailable'][_0x541a('0x4a')]={'prod':_0x1a73f8,'sku':_0x1a8147},_0x580d5f(this)[_0x541a('0x4e')](_0x1f8bb4);}catch(_0x1e1731){_0x360ce5(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x1e1731['message']]);}});_0x580d5f(window)['on'](_0x541a('0x4f'),function(_0x3bf7b0,_0x51ed8c,_0x3a23c1){try{for(var _0x3d2a41=_0x3a23c1[_0x541a('0x2b')],_0x39ce59=_0x51ed8c=0x0;_0x39ce59<_0x3d2a41&&!_0x3a23c1[_0x39ce59][_0x541a('0x50')];_0x39ce59++)_0x51ed8c+=0x1;_0x3d2a41<=_0x51ed8c&&(_0x580d5f['fn']['QD_smartStockAvailable'][_0x541a('0x4d')]=!0x0);_0x580d5f(this)[_0x541a('0x4e')](_0x3bf7b0);}catch(_0x16f4db){_0x360ce5([_0x541a('0x51'),_0x16f4db['message']]);}});_0x580d5f(function(){_0x580d5f(_0x541a('0x52'))[_0x541a('0x1a')]();});}}(window));
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);