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
		qdShowSmartCart: function() {
			var wrapper = $(".smart-cart-qd-v1-wrapper");

			$(".tpl-cart-dropdown a, .header-qd-v1-cart a").click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-on');

				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
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
			$('.store-header .navbar-default').QD_amazingMenu();

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
			$(".qd-am-overlay").click(function(){
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
/* Quatro Digital Smart Cart*/
var _0xa138=['boolean','simpleCart','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Oooops!\x20','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','ajaxStop','.qdDdcContainer','selector','dropDown','QD_buyButton','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','undefined','pow','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','aviso','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','naghnevbanpvbany%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','smartCheckout','vtexjs','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','val','keyup.qd_ddc_cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','cartIsEmpty','cartTotal','texts','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','call','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','items','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','skuName','.qd-ddc-prodPrice','sellingPrice','meta[name=currency]','attr','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','.qd-ddc-image','imageUrl','appendTo','getParent','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','message','lastSku','filter','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','body','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','insertProdImg','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','removeProduct','stop','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','done','fail'];(function(_0x431b8b,_0x45379e){var _0x3d8f93=function(_0x4b7741){while(--_0x4b7741){_0x431b8b['push'](_0x431b8b['shift']());}};_0x3d8f93(++_0x45379e);}(_0xa138,0x100));var _0x8a13=function(_0x1db1a6,_0x4ca526){_0x1db1a6=_0x1db1a6-0x0;var _0x8d2d86=_0xa138[_0x1db1a6];return _0x8d2d86;};(function(_0x34a782){_0x34a782['fn']['getParent']=_0x34a782['fn'][_0x8a13('0x0')];}(jQuery));function qd_number_format(_0x275ca6,_0x1ad80d,_0x5a1f52,_0x16a9c3){_0x275ca6=(_0x275ca6+'')[_0x8a13('0x1')](/[^0-9+\-Ee.]/g,'');_0x275ca6=isFinite(+_0x275ca6)?+_0x275ca6:0x0;_0x1ad80d=isFinite(+_0x1ad80d)?Math['abs'](_0x1ad80d):0x0;_0x16a9c3=_0x8a13('0x2')===typeof _0x16a9c3?',':_0x16a9c3;_0x5a1f52=_0x8a13('0x2')===typeof _0x5a1f52?'.':_0x5a1f52;var _0x41c6cf='',_0x41c6cf=function(_0x5eaa13,_0x1ee585){var _0x1ad80d=Math[_0x8a13('0x3')](0xa,_0x1ee585);return''+(Math[_0x8a13('0x4')](_0x5eaa13*_0x1ad80d)/_0x1ad80d)['toFixed'](_0x1ee585);},_0x41c6cf=(_0x1ad80d?_0x41c6cf(_0x275ca6,_0x1ad80d):''+Math[_0x8a13('0x4')](_0x275ca6))[_0x8a13('0x5')]('.');0x3<_0x41c6cf[0x0]['length']&&(_0x41c6cf[0x0]=_0x41c6cf[0x0][_0x8a13('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x16a9c3));(_0x41c6cf[0x1]||'')[_0x8a13('0x6')]<_0x1ad80d&&(_0x41c6cf[0x1]=_0x41c6cf[0x1]||'',_0x41c6cf[0x1]+=Array(_0x1ad80d-_0x41c6cf[0x1]['length']+0x1)['join']('0'));return _0x41c6cf[_0x8a13('0x7')](_0x5a1f52);};(function(){try{window[_0x8a13('0x8')]=window['_QuatroDigital_CartData']||{},window[_0x8a13('0x8')][_0x8a13('0x9')]=window[_0x8a13('0x8')]['callback']||$[_0x8a13('0xa')]();}catch(_0x28d033){_0x8a13('0x2')!==typeof console&&_0x8a13('0xb')===typeof console[_0x8a13('0xc')]&&console['error']('Oooops!\x20',_0x28d033['message']);}}());(function(_0x66c23c){try{var _0x3dc278=jQuery,_0x3806ac=function(_0x4c7abc,_0x1d25db){if(_0x8a13('0xd')===typeof console&&_0x8a13('0x2')!==typeof console[_0x8a13('0xc')]&&_0x8a13('0x2')!==typeof console[_0x8a13('0xe')]&&_0x8a13('0x2')!==typeof console[_0x8a13('0xf')]){var _0x505b0a;'object'===typeof _0x4c7abc?(_0x4c7abc['unshift']('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x505b0a=_0x4c7abc):_0x505b0a=[_0x8a13('0x10')+_0x4c7abc];if('undefined'===typeof _0x1d25db||_0x8a13('0x11')!==_0x1d25db['toLowerCase']()&&_0x8a13('0x12')!==_0x1d25db['toLowerCase']())if(_0x8a13('0x2')!==typeof _0x1d25db&&_0x8a13('0xe')===_0x1d25db[_0x8a13('0x13')]())try{console[_0x8a13('0xe')][_0x8a13('0x14')](console,_0x505b0a);}catch(_0x1e8b58){try{console['info'](_0x505b0a[_0x8a13('0x7')]('\x0a'));}catch(_0x5082d2){}}else try{console[_0x8a13('0xc')]['apply'](console,_0x505b0a);}catch(_0x40cd11){try{console['error'](_0x505b0a['join']('\x0a'));}catch(_0x4a4547){}}else try{console['warn'][_0x8a13('0x14')](console,_0x505b0a);}catch(_0x32fd67){try{console['warn'](_0x505b0a[_0x8a13('0x7')]('\x0a'));}catch(_0x49d432){}}}};window['_QuatroDigital_DropDown']=window[_0x8a13('0x15')]||{};window[_0x8a13('0x15')][_0x8a13('0x16')]=!0x0;_0x3dc278[_0x8a13('0x17')]=function(){};_0x3dc278['fn'][_0x8a13('0x17')]=function(){return{'fn':new _0x3dc278()};};var _0x5b276c=function(_0x2f5b26){var _0x38a585={'f':_0x8a13('0x18')};return function(_0x30e634){var _0x4000f1=function(_0x141897){return _0x141897;};var _0x41e2ee=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x30e634=_0x30e634['d'+_0x41e2ee[0x10]+'c'+_0x41e2ee[0x11]+'m'+_0x4000f1(_0x41e2ee[0x1])+'n'+_0x41e2ee[0xd]]['l'+_0x41e2ee[0x12]+'c'+_0x41e2ee[0x0]+'ti'+_0x4000f1('o')+'n'];var _0x4baa30=function(_0xa1b328){return escape(encodeURIComponent(_0xa1b328[_0x8a13('0x1')](/\./g,'¨')[_0x8a13('0x1')](/[a-zA-Z]/g,function(_0x2f4138){return String[_0x8a13('0x19')](('Z'>=_0x2f4138?0x5a:0x7a)>=(_0x2f4138=_0x2f4138['charCodeAt'](0x0)+0xd)?_0x2f4138:_0x2f4138-0x1a);})));};var _0x882350=_0x4baa30(_0x30e634[[_0x41e2ee[0x9],_0x4000f1('o'),_0x41e2ee[0xc],_0x41e2ee[_0x4000f1(0xd)]][_0x8a13('0x7')]('')]);_0x4baa30=_0x4baa30((window[['js',_0x4000f1('no'),'m',_0x41e2ee[0x1],_0x41e2ee[0x4][_0x8a13('0x1a')](),_0x8a13('0x1b')][_0x8a13('0x7')]('')]||_0x8a13('0x1c'))+['.v',_0x41e2ee[0xd],'e',_0x4000f1('x'),'co',_0x4000f1('mm'),_0x8a13('0x1d'),_0x41e2ee[0x1],'.c',_0x4000f1('o'),'m.',_0x41e2ee[0x13],'r'][_0x8a13('0x7')](''));for(var _0x4abac6 in _0x38a585){if(_0x4baa30===_0x4abac6+_0x38a585[_0x4abac6]||_0x882350===_0x4abac6+_0x38a585[_0x4abac6]){var _0x46670e='tr'+_0x41e2ee[0x11]+'e';break;}_0x46670e='f'+_0x41e2ee[0x0]+'ls'+_0x4000f1(_0x41e2ee[0x1])+'';}_0x4000f1=!0x1;-0x1<_0x30e634[[_0x41e2ee[0xc],'e',_0x41e2ee[0x0],'rc',_0x41e2ee[0x9]][_0x8a13('0x7')]('')][_0x8a13('0x1e')](_0x8a13('0x1f'))&&(_0x4000f1=!0x0);return[_0x46670e,_0x4000f1];}(_0x2f5b26);}(window);if(!eval(_0x5b276c[0x0]))return _0x5b276c[0x1]?_0x3806ac(_0x8a13('0x20')):!0x1;_0x3dc278[_0x8a13('0x17')]=function(_0x4dd691,_0x3fe3b0){var _0x120f59=_0x3dc278(_0x4dd691);if(!_0x120f59[_0x8a13('0x6')])return _0x120f59;var _0x33e652=_0x3dc278[_0x8a13('0x21')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x8a13('0x22'),'linkCheckout':_0x8a13('0x23'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x8a13('0x24'),'continueShopping':_0x8a13('0x25'),'shippingForm':_0x8a13('0x26')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x398373){return _0x398373['skuName']||_0x398373[_0x8a13('0x27')];},'callback':function(){},'callbackProductsList':function(){}},_0x3fe3b0);_0x3dc278('');var _0x20f6be=this;if(_0x33e652[_0x8a13('0x28')]){var _0x3cc441=!0x1;_0x8a13('0x2')===typeof window[_0x8a13('0x29')]&&(_0x3806ac('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x3dc278['ajax']({'url':_0x8a13('0x2a'),'async':!0x1,'dataType':'script','error':function(){_0x3806ac(_0x8a13('0x2b'));_0x3cc441=!0x0;}}));if(_0x3cc441)return _0x3806ac(_0x8a13('0x2c'));}if('object'===typeof window[_0x8a13('0x29')]&&_0x8a13('0x2')!==typeof window[_0x8a13('0x29')][_0x8a13('0x2d')])var _0x66c23c=window['vtexjs'][_0x8a13('0x2d')];else if(_0x8a13('0xd')===typeof vtex&&_0x8a13('0xd')===typeof vtex[_0x8a13('0x2d')]&&'undefined'!==typeof vtex[_0x8a13('0x2d')][_0x8a13('0x2e')])_0x66c23c=new vtex['checkout'][(_0x8a13('0x2e'))]();else return _0x3806ac(_0x8a13('0x2f'));_0x20f6be[_0x8a13('0x30')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x4e726f=function(_0x4fa325){_0x3dc278(this)[_0x8a13('0x31')](_0x4fa325);_0x4fa325[_0x8a13('0x32')](_0x8a13('0x33'))[_0x8a13('0x34')](_0x3dc278(_0x8a13('0x35')))['on'](_0x8a13('0x36'),function(){_0x120f59[_0x8a13('0x37')](_0x8a13('0x38'));_0x3dc278(document['body'])['removeClass'](_0x8a13('0x39'));});_0x3dc278(document)[_0x8a13('0x3a')]('keyup.qd_ddc_closeFn')['on'](_0x8a13('0x3b'),function(_0x233ce5){0x1b==_0x233ce5[_0x8a13('0x3c')]&&(_0x120f59[_0x8a13('0x37')](_0x8a13('0x38')),_0x3dc278(document['body'])[_0x8a13('0x37')]('qd-bb-lightBoxBodyProdAdd'));});var _0xfbc343=_0x4fa325[_0x8a13('0x32')](_0x8a13('0x3d'));_0x4fa325[_0x8a13('0x32')](_0x8a13('0x3e'))['on']('click.qd_ddc_scrollUp',function(){_0x20f6be[_0x8a13('0x3f')]('-',void 0x0,void 0x0,_0xfbc343);return!0x1;});_0x4fa325[_0x8a13('0x32')](_0x8a13('0x40'))['on'](_0x8a13('0x41'),function(){_0x20f6be['scrollCart'](void 0x0,void 0x0,void 0x0,_0xfbc343);return!0x1;});_0x4fa325[_0x8a13('0x32')]('.qd-ddc-shipping\x20input')[_0x8a13('0x42')]('')['on'](_0x8a13('0x43'),function(){_0x20f6be['shippingCalculate'](_0x3dc278(this));});if(_0x33e652[_0x8a13('0x44')]){var _0x3fe3b0=0x0;_0x3dc278(this)['on'](_0x8a13('0x45'),function(){var _0x4fa325=function(){window[_0x8a13('0x15')][_0x8a13('0x16')]&&(_0x20f6be[_0x8a13('0x46')](),window[_0x8a13('0x15')][_0x8a13('0x16')]=!0x1,_0x3dc278['fn']['simpleCart'](!0x0),_0x20f6be[_0x8a13('0x47')]());};_0x3fe3b0=setInterval(function(){_0x4fa325();},0x258);_0x4fa325();});_0x3dc278(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x3fe3b0);});}};var _0x4c29e2=function(_0x4939c3){_0x4939c3=_0x3dc278(_0x4939c3);_0x33e652['texts'][_0x8a13('0x48')]=_0x33e652[_0x8a13('0x49')][_0x8a13('0x48')][_0x8a13('0x1')]('#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x33e652[_0x8a13('0x49')][_0x8a13('0x48')]=_0x33e652[_0x8a13('0x49')][_0x8a13('0x48')]['replace']('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x33e652['texts'][_0x8a13('0x48')]=_0x33e652[_0x8a13('0x49')][_0x8a13('0x48')][_0x8a13('0x1')](_0x8a13('0x4a'),_0x8a13('0x4b'));_0x33e652[_0x8a13('0x49')]['cartTotal']=_0x33e652[_0x8a13('0x49')][_0x8a13('0x48')]['replace'](_0x8a13('0x4c'),_0x8a13('0x4d'));_0x4939c3[_0x8a13('0x32')](_0x8a13('0x4e'))[_0x8a13('0x4f')](_0x33e652[_0x8a13('0x49')][_0x8a13('0x50')]);_0x4939c3[_0x8a13('0x32')](_0x8a13('0x51'))['html'](_0x33e652['texts'][_0x8a13('0x52')]);_0x4939c3[_0x8a13('0x32')](_0x8a13('0x53'))['html'](_0x33e652[_0x8a13('0x49')][_0x8a13('0x54')]);_0x4939c3[_0x8a13('0x32')](_0x8a13('0x55'))[_0x8a13('0x4f')](_0x33e652[_0x8a13('0x49')][_0x8a13('0x48')]);_0x4939c3['find'](_0x8a13('0x56'))['html'](_0x33e652[_0x8a13('0x49')][_0x8a13('0x57')]);_0x4939c3[_0x8a13('0x32')](_0x8a13('0x58'))[_0x8a13('0x4f')](_0x33e652[_0x8a13('0x49')][_0x8a13('0x59')]);return _0x4939c3;}(this[_0x8a13('0x30')]);var _0x2d3c1b=0x0;_0x120f59[_0x8a13('0x5a')](function(){0x0<_0x2d3c1b?_0x4e726f[_0x8a13('0x5b')](this,_0x4c29e2[_0x8a13('0x5c')]()):_0x4e726f['call'](this,_0x4c29e2);_0x2d3c1b++;});window['_QuatroDigital_CartData']['callback'][_0x8a13('0x34')](function(){_0x3dc278(_0x8a13('0x5d'))[_0x8a13('0x4f')](window[_0x8a13('0x8')]['total']||'--');_0x3dc278(_0x8a13('0x5e'))[_0x8a13('0x4f')](window[_0x8a13('0x8')][_0x8a13('0x5f')]||'0');_0x3dc278(_0x8a13('0x60'))[_0x8a13('0x4f')](window['_QuatroDigital_CartData']['shipping']||'--');_0x3dc278(_0x8a13('0x61'))[_0x8a13('0x4f')](window[_0x8a13('0x8')]['allTotal']||'--');});var _0x4ccde1=function(_0x8e1c0a,_0x5a85a7){if('undefined'===typeof _0x8e1c0a[_0x8a13('0x62')])return _0x3806ac('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x20f6be['renderProductsList'][_0x8a13('0x5b')](this,_0x5a85a7);};_0x20f6be['getCartInfoByUrl']=function(_0x19dbe5,_0x4a26ee){_0x8a13('0x2')!=typeof _0x4a26ee?window[_0x8a13('0x15')][_0x8a13('0x63')]=_0x4a26ee:window[_0x8a13('0x15')][_0x8a13('0x63')]&&(_0x4a26ee=window[_0x8a13('0x15')]['dataOptionsCache']);setTimeout(function(){window[_0x8a13('0x15')][_0x8a13('0x63')]=void 0x0;},_0x33e652[_0x8a13('0x64')]);_0x3dc278(_0x8a13('0x65'))[_0x8a13('0x37')](_0x8a13('0x66'));if(_0x33e652[_0x8a13('0x28')]){var _0x3fe3b0=function(_0x5799f0){window['_QuatroDigital_DropDown'][_0x8a13('0x67')]=_0x5799f0;_0x4ccde1(_0x5799f0,_0x4a26ee);'undefined'!==typeof window[_0x8a13('0x68')]&&_0x8a13('0xb')===typeof window[_0x8a13('0x68')][_0x8a13('0x69')]&&window[_0x8a13('0x68')][_0x8a13('0x69')][_0x8a13('0x5b')](this);_0x3dc278(_0x8a13('0x65'))[_0x8a13('0x6a')](_0x8a13('0x66'));};_0x8a13('0x2')!==typeof window[_0x8a13('0x15')][_0x8a13('0x67')]?(_0x3fe3b0(window[_0x8a13('0x15')][_0x8a13('0x67')]),_0x8a13('0xb')===typeof _0x19dbe5&&_0x19dbe5(window[_0x8a13('0x15')][_0x8a13('0x67')])):_0x3dc278['QD_checkoutQueue'](['items','totalizers',_0x8a13('0x6b')],{'done':function(_0x43d93){_0x3fe3b0[_0x8a13('0x5b')](this,_0x43d93);'function'===typeof _0x19dbe5&&_0x19dbe5(_0x43d93);},'fail':function(_0x1fe84c){_0x3806ac([_0x8a13('0x6c'),_0x1fe84c]);}});}else alert(_0x8a13('0x6d'));};_0x20f6be[_0x8a13('0x47')]=function(){var _0x4c2c78=_0x3dc278(_0x8a13('0x65'));_0x4c2c78[_0x8a13('0x32')](_0x8a13('0x6e'))[_0x8a13('0x6')]?_0x4c2c78[_0x8a13('0x37')](_0x8a13('0x6f')):_0x4c2c78[_0x8a13('0x6a')](_0x8a13('0x6f'));};_0x20f6be[_0x8a13('0x70')]=function(_0x322bcf){var _0x3fe3b0=_0x3dc278(_0x8a13('0x71'));_0x3fe3b0[_0x8a13('0x72')]();_0x3fe3b0['each'](function(){var _0x3fe3b0=_0x3dc278(this),_0x541038,_0x4dd691,_0x7bc73b=_0x3dc278(''),_0x259a1d;for(_0x259a1d in window[_0x8a13('0x15')][_0x8a13('0x67')][_0x8a13('0x62')])if(_0x8a13('0xd')===typeof window['_QuatroDigital_DropDown'][_0x8a13('0x67')]['items'][_0x259a1d]){var _0x53f651=window[_0x8a13('0x15')][_0x8a13('0x67')][_0x8a13('0x62')][_0x259a1d];var _0x1145ca=_0x53f651[_0x8a13('0x73')][_0x8a13('0x1')](/^\/|\/$/g,'')[_0x8a13('0x5')]('/');var _0xd5f0cf=_0x3dc278(_0x8a13('0x74'));_0xd5f0cf['attr']({'data-sku':_0x53f651['id'],'data-sku-index':_0x259a1d,'data-qd-departament':_0x1145ca[0x0],'data-qd-category':_0x1145ca[_0x1145ca[_0x8a13('0x6')]-0x1]});_0xd5f0cf[_0x8a13('0x6a')](_0x8a13('0x75')+_0x53f651['availability']);_0xd5f0cf[_0x8a13('0x32')]('.qd-ddc-prodName')['append'](_0x33e652[_0x8a13('0x76')](_0x53f651));_0xd5f0cf[_0x8a13('0x32')](_0x8a13('0x77'))[_0x8a13('0x31')](isNaN(_0x53f651[_0x8a13('0x78')])?_0x53f651[_0x8a13('0x78')]:0x0==_0x53f651[_0x8a13('0x78')]?'Grátis':(_0x3dc278(_0x8a13('0x79'))[_0x8a13('0x7a')](_0x8a13('0x7b'))||'R$')+'\x20'+qd_number_format(_0x53f651['sellingPrice']/0x64,0x2,',','.'));_0xd5f0cf[_0x8a13('0x32')](_0x8a13('0x7c'))[_0x8a13('0x7a')]({'data-sku':_0x53f651['id'],'data-sku-index':_0x259a1d})[_0x8a13('0x42')](_0x53f651[_0x8a13('0x7d')]);_0xd5f0cf[_0x8a13('0x32')](_0x8a13('0x7e'))[_0x8a13('0x7a')]({'data-sku':_0x53f651['id'],'data-sku-index':_0x259a1d});_0x20f6be['insertProdImg'](_0x53f651['id'],_0xd5f0cf[_0x8a13('0x32')](_0x8a13('0x7f')),_0x53f651[_0x8a13('0x80')]);_0xd5f0cf[_0x8a13('0x32')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x8a13('0x7a')]({'data-sku':_0x53f651['id'],'data-sku-index':_0x259a1d});_0xd5f0cf[_0x8a13('0x81')](_0x3fe3b0);_0x7bc73b=_0x7bc73b[_0x8a13('0x34')](_0xd5f0cf);}try{var _0x66c23c=_0x3fe3b0[_0x8a13('0x82')](_0x8a13('0x65'))[_0x8a13('0x32')](_0x8a13('0x83'));_0x66c23c['length']&&''==_0x66c23c[_0x8a13('0x42')]()&&window[_0x8a13('0x15')][_0x8a13('0x67')][_0x8a13('0x6b')][_0x8a13('0x84')]&&_0x66c23c[_0x8a13('0x42')](window[_0x8a13('0x15')][_0x8a13('0x67')][_0x8a13('0x6b')][_0x8a13('0x84')][_0x8a13('0x85')]);}catch(_0x4f5e79){_0x3806ac(_0x8a13('0x86')+_0x4f5e79[_0x8a13('0x87')],_0x8a13('0x12'));}_0x20f6be['actionButtons'](_0x3fe3b0);_0x20f6be[_0x8a13('0x47')]();_0x322bcf&&_0x322bcf[_0x8a13('0x88')]&&function(){_0x4dd691=_0x7bc73b[_0x8a13('0x89')](_0x8a13('0x8a')+_0x322bcf['lastSku']+'\x27]');_0x4dd691[_0x8a13('0x6')]&&(_0x541038=0x0,_0x7bc73b[_0x8a13('0x5a')](function(){var _0x322bcf=_0x3dc278(this);if(_0x322bcf['is'](_0x4dd691))return!0x1;_0x541038+=_0x322bcf[_0x8a13('0x8b')]();}),_0x20f6be[_0x8a13('0x3f')](void 0x0,void 0x0,_0x541038,_0x3fe3b0['add'](_0x3fe3b0['parent']())),_0x7bc73b[_0x8a13('0x37')](_0x8a13('0x8c')),function(_0x100637){_0x100637[_0x8a13('0x6a')](_0x8a13('0x8d'));_0x100637[_0x8a13('0x6a')](_0x8a13('0x8c'));setTimeout(function(){_0x100637['removeClass'](_0x8a13('0x8d'));},_0x33e652[_0x8a13('0x64')]);}(_0x4dd691),_0x3dc278(document['body'])[_0x8a13('0x6a')](_0x8a13('0x8e')),setTimeout(function(){_0x3dc278(document[_0x8a13('0x8f')])['removeClass'](_0x8a13('0x8e'));},_0x33e652['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown[_0x8a13('0x67')][_0x8a13('0x62')][_0x8a13('0x6')]?(_0x3dc278(_0x8a13('0x8f'))['removeClass'](_0x8a13('0x90'))['addClass'](_0x8a13('0x91')),setTimeout(function(){_0x3dc278(_0x8a13('0x8f'))[_0x8a13('0x37')](_0x8a13('0x92'));},_0x33e652[_0x8a13('0x64')])):_0x3dc278(_0x8a13('0x8f'))[_0x8a13('0x37')](_0x8a13('0x93'))[_0x8a13('0x6a')](_0x8a13('0x90'));}());_0x8a13('0xb')===typeof _0x33e652['callbackProductsList']?_0x33e652[_0x8a13('0x94')][_0x8a13('0x5b')](this):_0x3806ac('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x20f6be[_0x8a13('0x95')]=function(_0x178fc3,_0x359e68,_0x46ff57){function _0x5f44c4(){_0x359e68[_0x8a13('0x37')](_0x8a13('0x96'))[_0x8a13('0x97')](function(){_0x3dc278(this)[_0x8a13('0x6a')]('qd-loaded');})[_0x8a13('0x7a')](_0x8a13('0x98'),_0x46ff57);}_0x46ff57?_0x5f44c4():isNaN(_0x178fc3)?_0x3806ac(_0x8a13('0x99'),_0x8a13('0x11')):alert(_0x8a13('0x9a'));};_0x20f6be[_0x8a13('0x9b')]=function(_0x2a4ec4){var _0x3fe3b0=function(_0x31ea0e,_0x1b5c83){var _0x1b0fb3=_0x3dc278(_0x31ea0e);var _0xfceba7=_0x1b0fb3[_0x8a13('0x7a')](_0x8a13('0x9c'));var _0x4dd691=_0x1b0fb3[_0x8a13('0x7a')]('data-sku-index');if(_0xfceba7){var _0x59d0f6=parseInt(_0x1b0fb3[_0x8a13('0x42')]())||0x1;_0x20f6be[_0x8a13('0x9d')]([_0xfceba7,_0x4dd691],_0x59d0f6,_0x59d0f6+0x1,function(_0x1ec697){_0x1b0fb3[_0x8a13('0x42')](_0x1ec697);'function'===typeof _0x1b5c83&&_0x1b5c83();});}};var _0x38aba4=function(_0x1e789b,_0x124625){var _0x19b21e=_0x3dc278(_0x1e789b);var _0x4dd691=_0x19b21e['attr']('data-sku');var _0x453212=_0x19b21e['attr']('data-sku-index');if(_0x4dd691){var _0x440c29=parseInt(_0x19b21e['val']())||0x2;_0x20f6be[_0x8a13('0x9d')]([_0x4dd691,_0x453212],_0x440c29,_0x440c29-0x1,function(_0x16ec2a){_0x19b21e[_0x8a13('0x42')](_0x16ec2a);_0x8a13('0xb')===typeof _0x124625&&_0x124625();});}};var _0x17be71=function(_0x4ee3bd,_0xa6d214){var _0x3fe3b0=_0x3dc278(_0x4ee3bd);var _0x4dd691=_0x3fe3b0[_0x8a13('0x7a')]('data-sku');var _0x40a3cb=_0x3fe3b0[_0x8a13('0x7a')](_0x8a13('0x9e'));if(_0x4dd691){var _0x246dff=parseInt(_0x3fe3b0[_0x8a13('0x42')]())||0x1;_0x20f6be['changeQantity']([_0x4dd691,_0x40a3cb],0x1,_0x246dff,function(_0x47a84b){_0x3fe3b0[_0x8a13('0x42')](_0x47a84b);'function'===typeof _0xa6d214&&_0xa6d214();});}};var _0x4dd691=_0x2a4ec4['find'](_0x8a13('0x9f'));_0x4dd691[_0x8a13('0x6a')](_0x8a13('0xa0'))['each'](function(){var _0x2a4ec4=_0x3dc278(this);_0x2a4ec4[_0x8a13('0x32')]('.qd-ddc-quantityMore')['on'](_0x8a13('0xa1'),function(_0x1adf9f){_0x1adf9f[_0x8a13('0xa2')]();_0x4dd691[_0x8a13('0x6a')](_0x8a13('0xa3'));_0x3fe3b0(_0x2a4ec4['find'](_0x8a13('0x7c')),function(){_0x4dd691['removeClass'](_0x8a13('0xa3'));});});_0x2a4ec4[_0x8a13('0x32')](_0x8a13('0xa4'))['on'](_0x8a13('0xa5'),function(_0xfa9e52){_0xfa9e52['preventDefault']();_0x4dd691[_0x8a13('0x6a')](_0x8a13('0xa3'));_0x38aba4(_0x2a4ec4[_0x8a13('0x32')](_0x8a13('0x7c')),function(){_0x4dd691[_0x8a13('0x37')]('qd-loading');});});_0x2a4ec4[_0x8a13('0x32')](_0x8a13('0x7c'))['on'](_0x8a13('0xa6'),function(){_0x4dd691[_0x8a13('0x6a')]('qd-loading');_0x17be71(this,function(){_0x4dd691[_0x8a13('0x37')](_0x8a13('0xa3'));});});_0x2a4ec4[_0x8a13('0x32')](_0x8a13('0x7c'))['on'](_0x8a13('0xa7'),function(_0x9aea5a){0xd==_0x9aea5a[_0x8a13('0x3c')]&&(_0x4dd691['addClass'](_0x8a13('0xa3')),_0x17be71(this,function(){_0x4dd691['removeClass'](_0x8a13('0xa3'));}));});});_0x2a4ec4[_0x8a13('0x32')](_0x8a13('0x6e'))[_0x8a13('0x5a')](function(){var _0x2a4ec4=_0x3dc278(this);_0x2a4ec4['find'](_0x8a13('0x7e'))['on']('click.qd_ddc_remove',function(){_0x2a4ec4[_0x8a13('0x6a')]('qd-loading');_0x20f6be[_0x8a13('0xa8')](_0x3dc278(this),function(_0x2a6c79){_0x2a6c79?_0x2a4ec4[_0x8a13('0xa9')](!0x0)[_0x8a13('0xaa')](function(){_0x2a4ec4[_0x8a13('0xab')]();_0x20f6be[_0x8a13('0x47')]();}):_0x2a4ec4['removeClass'](_0x8a13('0xa3'));});return!0x1;});});};_0x20f6be['shippingCalculate']=function(_0x3337a1){var _0x44d80f=_0x3337a1[_0x8a13('0x42')]();_0x44d80f=_0x44d80f['replace'](/[^0-9\-]/g,'');_0x44d80f=_0x44d80f[_0x8a13('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x8a13('0xac'));_0x44d80f=_0x44d80f['replace'](/(.{9}).*/g,'$1');_0x3337a1['val'](_0x44d80f);0x9<=_0x44d80f[_0x8a13('0x6')]&&(_0x3337a1[_0x8a13('0xad')](_0x8a13('0xae'))!=_0x44d80f&&_0x66c23c[_0x8a13('0xaf')]({'postalCode':_0x44d80f,'country':'BRA'})[_0x8a13('0xb0')](function(_0xe50ecc){window[_0x8a13('0x15')][_0x8a13('0x67')]=_0xe50ecc;_0x20f6be['getCartInfoByUrl']();})[_0x8a13('0xb1')](function(_0x39f241){_0x3806ac(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x39f241]);updateCartData();}),_0x3337a1[_0x8a13('0xad')](_0x8a13('0xae'),_0x44d80f));};_0x20f6be[_0x8a13('0x9d')]=function(_0x12e679,_0x4688de,_0x49e098,_0x50e8c9){function _0x342b69(_0x3c125c){_0x3c125c=_0x8a13('0xb2')!==typeof _0x3c125c?!0x1:_0x3c125c;_0x20f6be[_0x8a13('0x46')]();window[_0x8a13('0x15')][_0x8a13('0x16')]=!0x1;_0x20f6be[_0x8a13('0x47')]();_0x8a13('0x2')!==typeof window['_QuatroDigital_AmountProduct']&&_0x8a13('0xb')===typeof window[_0x8a13('0x68')]['exec']&&window['_QuatroDigital_AmountProduct']['exec']['call'](this);_0x8a13('0xb')===typeof adminCart&&adminCart();_0x3dc278['fn'][_0x8a13('0xb3')](!0x0,void 0x0,_0x3c125c);'function'===typeof _0x50e8c9&&_0x50e8c9(_0x4688de);}_0x49e098=_0x49e098||0x1;if(0x1>_0x49e098)return _0x4688de;if(_0x33e652[_0x8a13('0x28')]){if(_0x8a13('0x2')===typeof window['_QuatroDigital_DropDown'][_0x8a13('0x67')][_0x8a13('0x62')][_0x12e679[0x1]])return _0x3806ac(_0x8a13('0xb4')+_0x12e679[0x1]+']'),_0x4688de;window[_0x8a13('0x15')][_0x8a13('0x67')][_0x8a13('0x62')][_0x12e679[0x1]][_0x8a13('0x7d')]=_0x49e098;window[_0x8a13('0x15')]['getOrderForm'][_0x8a13('0x62')][_0x12e679[0x1]][_0x8a13('0xb5')]=_0x12e679[0x1];_0x66c23c[_0x8a13('0xb6')]([window[_0x8a13('0x15')][_0x8a13('0x67')][_0x8a13('0x62')][_0x12e679[0x1]]],[_0x8a13('0x62'),_0x8a13('0xb7'),'shippingData'])[_0x8a13('0xb0')](function(_0x58abbb){window['_QuatroDigital_DropDown'][_0x8a13('0x67')]=_0x58abbb;_0x342b69(!0x0);})[_0x8a13('0xb1')](function(_0x3843af){_0x3806ac([_0x8a13('0xb8'),_0x3843af]);_0x342b69();});}else _0x3806ac(_0x8a13('0xb9'));};_0x20f6be[_0x8a13('0xa8')]=function(_0x3c3320,_0x4c18fd){function _0x51ac08(_0x5607a4){_0x5607a4=_0x8a13('0xb2')!==typeof _0x5607a4?!0x1:_0x5607a4;_0x8a13('0x2')!==typeof window[_0x8a13('0x68')]&&_0x8a13('0xb')===typeof window[_0x8a13('0x68')][_0x8a13('0x69')]&&window[_0x8a13('0x68')][_0x8a13('0x69')][_0x8a13('0x5b')](this);_0x8a13('0xb')===typeof adminCart&&adminCart();_0x3dc278['fn'][_0x8a13('0xb3')](!0x0,void 0x0,_0x5607a4);_0x8a13('0xb')===typeof _0x4c18fd&&_0x4c18fd(_0x4dd691);}var _0x4dd691=!0x1,_0x2f0040=_0x3dc278(_0x3c3320)[_0x8a13('0x7a')]('data-sku-index');if(_0x33e652[_0x8a13('0x28')]){if(_0x8a13('0x2')===typeof window[_0x8a13('0x15')][_0x8a13('0x67')][_0x8a13('0x62')][_0x2f0040])return _0x3806ac(_0x8a13('0xb4')+_0x2f0040+']'),_0x4dd691;window[_0x8a13('0x15')][_0x8a13('0x67')][_0x8a13('0x62')][_0x2f0040][_0x8a13('0xb5')]=_0x2f0040;_0x66c23c[_0x8a13('0xba')]([window[_0x8a13('0x15')][_0x8a13('0x67')][_0x8a13('0x62')][_0x2f0040]],[_0x8a13('0x62'),_0x8a13('0xb7'),_0x8a13('0x6b')])[_0x8a13('0xb0')](function(_0x55bbf7){_0x4dd691=!0x0;window['_QuatroDigital_DropDown'][_0x8a13('0x67')]=_0x55bbf7;_0x4ccde1(_0x55bbf7);_0x51ac08(!0x0);})[_0x8a13('0xb1')](function(_0x4efed0){_0x3806ac([_0x8a13('0xbb'),_0x4efed0]);_0x51ac08();});}else alert(_0x8a13('0xbc'));};_0x20f6be['scrollCart']=function(_0x39ebe4,_0x55e571,_0x53cce,_0x4dbd0f){_0x4dbd0f=_0x4dbd0f||_0x3dc278(_0x8a13('0xbd'));_0x39ebe4=_0x39ebe4||'+';_0x55e571=_0x55e571||0.9*_0x4dbd0f[_0x8a13('0xbe')]();_0x4dbd0f[_0x8a13('0xa9')](!0x0,!0x0)[_0x8a13('0xbf')]({'scrollTop':isNaN(_0x53cce)?_0x39ebe4+'='+_0x55e571+'px':_0x53cce});};_0x33e652[_0x8a13('0x44')]||(_0x20f6be[_0x8a13('0x46')](),_0x3dc278['fn'][_0x8a13('0xb3')](!0x0));_0x3dc278(window)['on'](_0x8a13('0xc0'),function(){try{window[_0x8a13('0x15')][_0x8a13('0x67')]=void 0x0,_0x20f6be[_0x8a13('0x46')]();}catch(_0xd29398){_0x3806ac(_0x8a13('0xc1')+_0xd29398['message'],_0x8a13('0xc2'));}});'function'===typeof _0x33e652[_0x8a13('0x9')]?_0x33e652[_0x8a13('0x9')][_0x8a13('0x5b')](this):_0x3806ac(_0x8a13('0xc3'));};_0x3dc278['fn'][_0x8a13('0x17')]=function(_0x52005d){var _0x129a93=_0x3dc278(this);_0x129a93['fn']=new _0x3dc278[(_0x8a13('0x17'))](this,_0x52005d);return _0x129a93;};}catch(_0x1778f3){_0x8a13('0x2')!==typeof console&&_0x8a13('0xb')===typeof console['error']&&console[_0x8a13('0xc')](_0x8a13('0xc4'),_0x1778f3);}}(this));(function(_0x2e1197){try{var _0x13c190=jQuery;window[_0x8a13('0x68')]=window[_0x8a13('0x68')]||{};window['_QuatroDigital_AmountProduct'][_0x8a13('0x62')]={};window[_0x8a13('0x68')][_0x8a13('0xc5')]=!0x1;window[_0x8a13('0x68')][_0x8a13('0xc6')]=!0x1;window[_0x8a13('0x68')][_0x8a13('0xc7')]=!0x1;var _0x34e6a8=function(){if(window['_QuatroDigital_AmountProduct']['allowRecalculate']){var _0x13e277=!0x1;var _0x4345a7={};window[_0x8a13('0x68')][_0x8a13('0x62')]={};for(_0x50142b in window[_0x8a13('0x15')][_0x8a13('0x67')]['items'])if(_0x8a13('0xd')===typeof window['_QuatroDigital_DropDown'][_0x8a13('0x67')]['items'][_0x50142b]){var _0x5182f1=window[_0x8a13('0x15')]['getOrderForm'][_0x8a13('0x62')][_0x50142b];_0x8a13('0x2')!==typeof _0x5182f1[_0x8a13('0xc8')]&&null!==_0x5182f1[_0x8a13('0xc8')]&&''!==_0x5182f1[_0x8a13('0xc8')]&&(window[_0x8a13('0x68')][_0x8a13('0x62')][_0x8a13('0xc9')+_0x5182f1[_0x8a13('0xc8')]]=window[_0x8a13('0x68')][_0x8a13('0x62')][_0x8a13('0xc9')+_0x5182f1[_0x8a13('0xc8')]]||{},window['_QuatroDigital_AmountProduct'][_0x8a13('0x62')][_0x8a13('0xc9')+_0x5182f1[_0x8a13('0xc8')]][_0x8a13('0xca')]=_0x5182f1[_0x8a13('0xc8')],_0x4345a7[_0x8a13('0xc9')+_0x5182f1[_0x8a13('0xc8')]]||(window['_QuatroDigital_AmountProduct'][_0x8a13('0x62')][_0x8a13('0xc9')+_0x5182f1['productId']][_0x8a13('0x5f')]=0x0),window[_0x8a13('0x68')]['items'][_0x8a13('0xc9')+_0x5182f1[_0x8a13('0xc8')]]['qtt']+=_0x5182f1['quantity'],_0x13e277=!0x0,_0x4345a7['prod_'+_0x5182f1[_0x8a13('0xc8')]]=!0x0);}var _0x50142b=_0x13e277;}else _0x50142b=void 0x0;window['_QuatroDigital_AmountProduct'][_0x8a13('0xc5')]&&(_0x13c190(_0x8a13('0xcb'))['remove'](),_0x13c190(_0x8a13('0xcc'))['removeClass'](_0x8a13('0xcd')));for(var _0x32ccb9 in window[_0x8a13('0x68')][_0x8a13('0x62')]){_0x5182f1=window['_QuatroDigital_AmountProduct']['items'][_0x32ccb9];if(_0x8a13('0xd')!==typeof _0x5182f1)return;_0x4345a7=_0x13c190(_0x8a13('0xce')+_0x5182f1[_0x8a13('0xca')]+']')[_0x8a13('0x82')]('li');if(window[_0x8a13('0x68')][_0x8a13('0xc5')]||!_0x4345a7[_0x8a13('0x32')](_0x8a13('0xcb'))[_0x8a13('0x6')])_0x13e277=_0x13c190(_0x8a13('0xcf')),_0x13e277[_0x8a13('0x32')]('.qd-bap-qtt')[_0x8a13('0x4f')](_0x5182f1['qtt']),_0x5182f1=_0x4345a7[_0x8a13('0x32')](_0x8a13('0xd0')),_0x5182f1[_0x8a13('0x6')]?_0x5182f1['prepend'](_0x13e277)[_0x8a13('0x6a')](_0x8a13('0xcd')):_0x4345a7['prepend'](_0x13e277);}_0x50142b&&(window[_0x8a13('0x68')][_0x8a13('0xc5')]=!0x1);};window[_0x8a13('0x68')][_0x8a13('0x69')]=function(){window[_0x8a13('0x68')][_0x8a13('0xc5')]=!0x0;_0x34e6a8['call'](this);};_0x13c190(document)[_0x8a13('0xd1')](function(){_0x34e6a8[_0x8a13('0x5b')](this);});}catch(_0x557309){_0x8a13('0x2')!==typeof console&&_0x8a13('0xb')===typeof console[_0x8a13('0xc')]&&console['error']('Oooops!\x20',_0x557309);}}(this));(function(){try{var _0x16f802=jQuery,_0x14670d,_0x1215ce={'selector':_0x8a13('0xd2'),'dropDown':{},'buyButton':{}};_0x16f802['QD_smartCart']=function(_0x4a4c54){var _0x2eea36={};_0x14670d=_0x16f802[_0x8a13('0x21')](!0x0,{},_0x1215ce,_0x4a4c54);_0x4a4c54=_0x16f802(_0x14670d[_0x8a13('0xd3')])[_0x8a13('0x17')](_0x14670d['dropDown']);_0x2eea36['buyButton']=_0x8a13('0x2')!==typeof _0x14670d[_0x8a13('0xd4')][_0x8a13('0x44')]&&!0x1===_0x14670d[_0x8a13('0xd4')][_0x8a13('0x44')]?_0x16f802(_0x14670d[_0x8a13('0xd3')])[_0x8a13('0xd5')](_0x4a4c54['fn'],_0x14670d[_0x8a13('0xd6')]):_0x16f802(_0x14670d[_0x8a13('0xd3')])[_0x8a13('0xd5')](_0x14670d[_0x8a13('0xd6')]);_0x2eea36[_0x8a13('0xd4')]=_0x4a4c54;return _0x2eea36;};_0x16f802['fn'][_0x8a13('0xd7')]=function(){_0x8a13('0xd')===typeof console&&_0x8a13('0xb')===typeof console['info']&&console[_0x8a13('0xe')](_0x8a13('0xd8'));};_0x16f802[_0x8a13('0xd7')]=_0x16f802['fn']['smartCart'];}catch(_0x296c08){_0x8a13('0x2')!==typeof console&&_0x8a13('0xb')===typeof console[_0x8a13('0xc')]&&console[_0x8a13('0xc')](_0x8a13('0xc4'),_0x296c08);}}());
var _0xd8fb=['split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','skus','SkuSellersInformation','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','naghnevbanpvbany%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','join','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','QD_smartStockAvailable','QuatroDigital.ssa.skuSelected','initialSkuSelected','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','qdAjaxQueue','opts','push','success','call','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','extend','object','error','clearQueueDelay','jqXHR','undefined','readyState','textStatus','errorThrown','qdAjax','version','2.1','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','info','apply','warn','removeClass','qd-ssa-sku-no-selected','AvailableQuantity','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','addClass','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-skus-'];(function(_0x55f52f,_0xd29421){var _0xe9886a=function(_0x4df710){while(--_0x4df710){_0x55f52f['push'](_0x55f52f['shift']());}};_0xe9886a(++_0xd29421);}(_0xd8fb,0x1c0));var _0xbd8f=function(_0x5bb95f,_0x566c33){_0x5bb95f=_0x5bb95f-0x0;var _0x34934c=_0xd8fb[_0x5bb95f];return _0x34934c;};(function(_0x2e06df){if('function'!==typeof _0x2e06df['qdAjax']){var _0x455a12={};_0x2e06df[_0xbd8f('0x0')]=_0x455a12;_0x2e06df['qdAjax']=function(_0x400dfb){var _0x2343bf=_0x2e06df['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x400dfb);var _0x33d541=escape(encodeURIComponent(_0x2343bf['url']));_0x455a12[_0x33d541]=_0x455a12[_0x33d541]||{};_0x455a12[_0x33d541][_0xbd8f('0x1')]=_0x455a12[_0x33d541]['opts']||[];_0x455a12[_0x33d541][_0xbd8f('0x1')][_0xbd8f('0x2')]({'success':function(_0x493298,_0x5697bd,_0x3caa93){_0x2343bf[_0xbd8f('0x3')][_0xbd8f('0x4')](this,_0x493298,_0x5697bd,_0x3caa93);},'error':function(_0x53a2c6,_0x255af3,_0x42ae20){_0x2343bf['error']['call'](this,_0x53a2c6,_0x255af3,_0x42ae20);},'complete':function(_0x342bcb,_0x40a5bc){_0x2343bf[_0xbd8f('0x5')]['call'](this,_0x342bcb,_0x40a5bc);}});_0x455a12[_0x33d541][_0xbd8f('0x6')]=_0x455a12[_0x33d541][_0xbd8f('0x6')]||{'success':{},'error':{},'complete':{}};_0x455a12[_0x33d541][_0xbd8f('0x7')]=_0x455a12[_0x33d541][_0xbd8f('0x7')]||{};_0x455a12[_0x33d541][_0xbd8f('0x7')][_0xbd8f('0x8')]=_0xbd8f('0x9')===typeof _0x455a12[_0x33d541][_0xbd8f('0x7')][_0xbd8f('0x8')]?_0x455a12[_0x33d541]['callbackFns'][_0xbd8f('0x8')]:!0x1;_0x455a12[_0x33d541][_0xbd8f('0x7')][_0xbd8f('0xa')]=_0xbd8f('0x9')===typeof _0x455a12[_0x33d541]['callbackFns'][_0xbd8f('0xa')]?_0x455a12[_0x33d541][_0xbd8f('0x7')]['errorPopulated']:!0x1;_0x455a12[_0x33d541][_0xbd8f('0x7')][_0xbd8f('0xb')]='boolean'===typeof _0x455a12[_0x33d541][_0xbd8f('0x7')][_0xbd8f('0xb')]?_0x455a12[_0x33d541]['callbackFns']['completePopulated']:!0x1;_0x400dfb=_0x2e06df[_0xbd8f('0xc')]({},_0x2343bf,{'success':function(_0x5d2fdb,_0x5705c5,_0x159c7b){_0x455a12[_0x33d541]['parameters'][_0xbd8f('0x3')]={'data':_0x5d2fdb,'textStatus':_0x5705c5,'jqXHR':_0x159c7b};_0x455a12[_0x33d541][_0xbd8f('0x7')][_0xbd8f('0x8')]=!0x0;for(var _0x897f25 in _0x455a12[_0x33d541][_0xbd8f('0x1')])_0xbd8f('0xd')===typeof _0x455a12[_0x33d541][_0xbd8f('0x1')][_0x897f25]&&(_0x455a12[_0x33d541][_0xbd8f('0x1')][_0x897f25][_0xbd8f('0x3')][_0xbd8f('0x4')](this,_0x5d2fdb,_0x5705c5,_0x159c7b),_0x455a12[_0x33d541][_0xbd8f('0x1')][_0x897f25][_0xbd8f('0x3')]=function(){});},'error':function(_0x2f7c45,_0x15c4a9,_0x320ede){_0x455a12[_0x33d541][_0xbd8f('0x6')][_0xbd8f('0xe')]={'errorThrown':_0x320ede,'textStatus':_0x15c4a9,'jqXHR':_0x2f7c45};_0x455a12[_0x33d541]['callbackFns'][_0xbd8f('0xa')]=!0x0;for(var _0x9fa3b1 in _0x455a12[_0x33d541][_0xbd8f('0x1')])_0xbd8f('0xd')===typeof _0x455a12[_0x33d541][_0xbd8f('0x1')][_0x9fa3b1]&&(_0x455a12[_0x33d541][_0xbd8f('0x1')][_0x9fa3b1][_0xbd8f('0xe')][_0xbd8f('0x4')](this,_0x2f7c45,_0x15c4a9,_0x320ede),_0x455a12[_0x33d541]['opts'][_0x9fa3b1][_0xbd8f('0xe')]=function(){});},'complete':function(_0x421f3e,_0x5a3a8c){_0x455a12[_0x33d541][_0xbd8f('0x6')]['complete']={'textStatus':_0x5a3a8c,'jqXHR':_0x421f3e};_0x455a12[_0x33d541][_0xbd8f('0x7')][_0xbd8f('0xb')]=!0x0;for(var _0x991401 in _0x455a12[_0x33d541][_0xbd8f('0x1')])_0xbd8f('0xd')===typeof _0x455a12[_0x33d541][_0xbd8f('0x1')][_0x991401]&&(_0x455a12[_0x33d541]['opts'][_0x991401][_0xbd8f('0x5')][_0xbd8f('0x4')](this,_0x421f3e,_0x5a3a8c),_0x455a12[_0x33d541][_0xbd8f('0x1')][_0x991401][_0xbd8f('0x5')]=function(){});isNaN(parseInt(_0x2343bf[_0xbd8f('0xf')]))||setTimeout(function(){_0x455a12[_0x33d541][_0xbd8f('0x10')]=void 0x0;_0x455a12[_0x33d541][_0xbd8f('0x1')]=void 0x0;_0x455a12[_0x33d541]['parameters']=void 0x0;_0x455a12[_0x33d541][_0xbd8f('0x7')]=void 0x0;},_0x2343bf[_0xbd8f('0xf')]);}});_0xbd8f('0x11')===typeof _0x455a12[_0x33d541][_0xbd8f('0x10')]?_0x455a12[_0x33d541]['jqXHR']=_0x2e06df['ajax'](_0x400dfb):_0x455a12[_0x33d541][_0xbd8f('0x10')]&&_0x455a12[_0x33d541][_0xbd8f('0x10')][_0xbd8f('0x12')]&&0x4==_0x455a12[_0x33d541][_0xbd8f('0x10')]['readyState']&&(_0x455a12[_0x33d541][_0xbd8f('0x7')][_0xbd8f('0x8')]&&_0x400dfb[_0xbd8f('0x3')](_0x455a12[_0x33d541][_0xbd8f('0x6')][_0xbd8f('0x3')]['data'],_0x455a12[_0x33d541][_0xbd8f('0x6')][_0xbd8f('0x3')][_0xbd8f('0x13')],_0x455a12[_0x33d541][_0xbd8f('0x6')][_0xbd8f('0x3')]['jqXHR']),_0x455a12[_0x33d541][_0xbd8f('0x7')]['errorPopulated']&&_0x400dfb[_0xbd8f('0xe')](_0x455a12[_0x33d541][_0xbd8f('0x6')][_0xbd8f('0xe')][_0xbd8f('0x10')],_0x455a12[_0x33d541][_0xbd8f('0x6')][_0xbd8f('0xe')]['textStatus'],_0x455a12[_0x33d541]['parameters']['error'][_0xbd8f('0x14')]),_0x455a12[_0x33d541][_0xbd8f('0x7')][_0xbd8f('0xb')]&&_0x400dfb[_0xbd8f('0x5')](_0x455a12[_0x33d541][_0xbd8f('0x6')][_0xbd8f('0x5')][_0xbd8f('0x10')],_0x455a12[_0x33d541][_0xbd8f('0x6')][_0xbd8f('0x5')][_0xbd8f('0x13')]));};_0x2e06df[_0xbd8f('0x15')][_0xbd8f('0x16')]=_0xbd8f('0x17');}}(jQuery));(function(_0x331cdc){function _0x391d45(_0x50e081,_0x2f22e1){_0x40204a[_0xbd8f('0x15')]({'url':'/produto/sku/'+_0x50e081,'clearQueueDelay':null,'success':_0x2f22e1,'error':function(){_0x21da54(_0xbd8f('0x18'));}});}var _0x40204a=jQuery;if(_0xbd8f('0x19')!==typeof _0x40204a['fn']['QD_smartStockAvailable']){var _0x21da54=function(_0x32f7d5,_0x298952){if('object'===typeof console){var _0x25031d;_0xbd8f('0xd')===typeof _0x32f7d5?(_0x32f7d5[_0xbd8f('0x1a')]('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x25031d=_0x32f7d5):_0x25031d=[_0xbd8f('0x1b')+_0x32f7d5];_0xbd8f('0x11')===typeof _0x298952||_0xbd8f('0x1c')!==_0x298952[_0xbd8f('0x1d')]()&&_0xbd8f('0x1e')!==_0x298952[_0xbd8f('0x1d')]()?_0xbd8f('0x11')!==typeof _0x298952&&_0xbd8f('0x1f')===_0x298952[_0xbd8f('0x1d')]()?console['info']['apply'](console,_0x25031d):console[_0xbd8f('0xe')][_0xbd8f('0x20')](console,_0x25031d):console[_0xbd8f('0x21')][_0xbd8f('0x20')](console,_0x25031d);}},_0x5d4151={},_0x467e0c=function(_0x5e9f71,_0x23e678){function _0x32549c(_0x111f4b){try{_0x5e9f71[_0xbd8f('0x22')](_0xbd8f('0x23'))['addClass']('qd-ssa-sku-selected');var _0x44776c=_0x111f4b[0x0]['SkuSellersInformation'][0x0][_0xbd8f('0x24')];_0x5e9f71[_0xbd8f('0x25')](_0xbd8f('0x26'),_0x44776c);_0x5e9f71[_0xbd8f('0x27')](function(){var _0x5e9f71=_0x40204a(this)[_0xbd8f('0x28')](_0xbd8f('0x29'));if(0x1>_0x44776c)return _0x5e9f71[_0xbd8f('0x2a')]()['addClass'](_0xbd8f('0x2b'))[_0xbd8f('0x22')](_0xbd8f('0x2c'));var _0x111f4b=_0x5e9f71[_0xbd8f('0x2d')](_0xbd8f('0x2e')+_0x44776c+'\x22]');_0x111f4b=_0x111f4b[_0xbd8f('0x2f')]?_0x111f4b:_0x5e9f71[_0xbd8f('0x2d')]('[data-qd-ssa-text=\x22default\x22]');_0x5e9f71[_0xbd8f('0x2a')]()[_0xbd8f('0x30')](_0xbd8f('0x2b'))[_0xbd8f('0x22')](_0xbd8f('0x2c'));_0x111f4b[_0xbd8f('0x31')]((_0x111f4b[_0xbd8f('0x31')]()||'')[_0xbd8f('0x32')](_0xbd8f('0x33'),_0x44776c));_0x111f4b[_0xbd8f('0x34')]()[_0xbd8f('0x30')](_0xbd8f('0x2c'))[_0xbd8f('0x22')](_0xbd8f('0x2b'));});}catch(_0x467566){_0x21da54([_0xbd8f('0x35'),_0x467566[_0xbd8f('0x36')]]);}}if(_0x5e9f71[_0xbd8f('0x2f')]){_0x5e9f71[_0xbd8f('0x30')]('qd-ssa-on');_0x5e9f71[_0xbd8f('0x30')](_0xbd8f('0x23'));try{_0x5e9f71[_0xbd8f('0x30')](_0xbd8f('0x37')+vtxctx['skus'][_0xbd8f('0x38')](';')['length']);}catch(_0x9bfe93){_0x21da54([_0xbd8f('0x39'),_0x9bfe93[_0xbd8f('0x36')]]);}_0x40204a(window)['on'](_0xbd8f('0x3a'),function(_0x5434e8,_0x3964f5,_0x35b814){try{_0x391d45(_0x35b814[_0xbd8f('0x3b')],function(_0x3da96f){_0x32549c(_0x3da96f);0x1===vtxctx[_0xbd8f('0x3c')][_0xbd8f('0x38')](';')['length']&&0x0==_0x3da96f[0x0][_0xbd8f('0x3d')][0x0]['AvailableQuantity']&&_0x40204a(window)[_0xbd8f('0x3e')](_0xbd8f('0x3f'));});}catch(_0x405764){_0x21da54([_0xbd8f('0x40'),_0x405764[_0xbd8f('0x36')]]);}});_0x40204a(window)[_0xbd8f('0x41')](_0xbd8f('0x42'));_0x40204a(window)['on'](_0xbd8f('0x3f'),function(){_0x5e9f71[_0xbd8f('0x30')]('qd-ssa-sku-prod-unavailable')[_0xbd8f('0x2a')]();});}};_0x331cdc=function(_0x56687e){var _0xd09e5={'f':_0xbd8f('0x43')};return function(_0x594e8c){var _0x309677=function(_0x517c01){return _0x517c01;};var _0x58d891=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x594e8c=_0x594e8c['d'+_0x58d891[0x10]+'c'+_0x58d891[0x11]+'m'+_0x309677(_0x58d891[0x1])+'n'+_0x58d891[0xd]]['l'+_0x58d891[0x12]+'c'+_0x58d891[0x0]+'ti'+_0x309677('o')+'n'];var _0x5e924c=function(_0x55de68){return escape(encodeURIComponent(_0x55de68[_0xbd8f('0x32')](/\./g,'¨')[_0xbd8f('0x32')](/[a-zA-Z]/g,function(_0xc78753){return String[_0xbd8f('0x44')](('Z'>=_0xc78753?0x5a:0x7a)>=(_0xc78753=_0xc78753[_0xbd8f('0x45')](0x0)+0xd)?_0xc78753:_0xc78753-0x1a);})));};var _0x531f2b=_0x5e924c(_0x594e8c[[_0x58d891[0x9],_0x309677('o'),_0x58d891[0xc],_0x58d891[_0x309677(0xd)]]['join']('')]);_0x5e924c=_0x5e924c((window[['js',_0x309677('no'),'m',_0x58d891[0x1],_0x58d891[0x4][_0xbd8f('0x46')](),_0xbd8f('0x47')][_0xbd8f('0x48')]('')]||_0xbd8f('0x49'))+['.v',_0x58d891[0xd],'e',_0x309677('x'),'co',_0x309677('mm'),_0xbd8f('0x4a'),_0x58d891[0x1],'.c',_0x309677('o'),'m.',_0x58d891[0x13],'r']['join'](''));for(var _0x4d2b28 in _0xd09e5){if(_0x5e924c===_0x4d2b28+_0xd09e5[_0x4d2b28]||_0x531f2b===_0x4d2b28+_0xd09e5[_0x4d2b28]){var _0x55a99b='tr'+_0x58d891[0x11]+'e';break;}_0x55a99b='f'+_0x58d891[0x0]+'ls'+_0x309677(_0x58d891[0x1])+'';}_0x309677=!0x1;-0x1<_0x594e8c[[_0x58d891[0xc],'e',_0x58d891[0x0],'rc',_0x58d891[0x9]][_0xbd8f('0x48')]('')][_0xbd8f('0x4b')](_0xbd8f('0x4c'))&&(_0x309677=!0x0);return[_0x55a99b,_0x309677];}(_0x56687e);}(window);if(!eval(_0x331cdc[0x0]))return _0x331cdc[0x1]?_0x21da54('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x40204a['fn'][_0xbd8f('0x4d')]=function(_0x1d1757){var _0xef9b36=_0x40204a(this);_0x1d1757=_0x40204a[_0xbd8f('0xc')](!0x0,{},_0x5d4151,_0x1d1757);_0xef9b36['qdPlugin']=new _0x467e0c(_0xef9b36,_0x1d1757);try{'object'===typeof _0x40204a['fn'][_0xbd8f('0x4d')]['initialSkuSelected']&&_0x40204a(window)[_0xbd8f('0x3e')](_0xbd8f('0x4e'),[_0x40204a['fn'][_0xbd8f('0x4d')][_0xbd8f('0x4f')]['prod'],_0x40204a['fn']['QD_smartStockAvailable'][_0xbd8f('0x4f')][_0xbd8f('0x3b')]]);}catch(_0x240acd){_0x21da54([_0xbd8f('0x50'),_0x240acd[_0xbd8f('0x36')]]);}_0x40204a['fn'][_0xbd8f('0x4d')][_0xbd8f('0x51')]&&_0x40204a(window)[_0xbd8f('0x3e')](_0xbd8f('0x3f'));return _0xef9b36;};_0x40204a(window)['on'](_0xbd8f('0x42'),function(_0x2a9c4e,_0x5c69c6,_0x3ebdcb){try{_0x40204a['fn'][_0xbd8f('0x4d')][_0xbd8f('0x4f')]={'prod':_0x5c69c6,'sku':_0x3ebdcb},_0x40204a(this)[_0xbd8f('0x41')](_0x2a9c4e);}catch(_0x3b43f7){_0x21da54([_0xbd8f('0x52'),_0x3b43f7['message']]);}});_0x40204a(window)['on'](_0xbd8f('0x53'),function(_0x469c83,_0x538fd7,_0x5e18fc){try{for(var _0x44a891=_0x5e18fc[_0xbd8f('0x2f')],_0x6db322=_0x538fd7=0x0;_0x6db322<_0x44a891&&!_0x5e18fc[_0x6db322]['available'];_0x6db322++)_0x538fd7+=0x1;_0x44a891<=_0x538fd7&&(_0x40204a['fn']['QD_smartStockAvailable'][_0xbd8f('0x51')]=!0x0);_0x40204a(this)['off'](_0x469c83);}catch(_0x565e63){_0x21da54(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x565e63['message']]);}});_0x40204a(function(){_0x40204a('.qd_smart_stock_available_auto')[_0xbd8f('0x4d')]();});}}(window));
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);