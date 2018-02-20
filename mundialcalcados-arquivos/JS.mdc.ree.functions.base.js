/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});"function"!=typeof String.prototype.capitalize&&(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase()});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E",
"\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) { var a; if (null == this) throw new TypeError('"this" is null or not defined'); var c = Object(this), b = c.length >>> 0; if (0 === b) return -1; a = +e || 0; Infinity === Math.abs(a) && (a = 0); if (a >= b) return -1; for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) { if (a in c && c[a] === d) return a; a++ } return -1 });

try {
	var Common = {
		run: function () {},
		init: function () {
			Common.vtexBindQuickViewDestroy();
			Common.qdOverlay();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.toggleSearch();
			Common.openSearchModal();
			Common.applySmartCart();
			Common.setDataScrollToggle();
			Common.openModalVideoInstitutional();
			Common.applyCarouselShelf();
			Common.showHideMenuFloat();	
			Search.applyPrateleiraCores();		
			Common.applyTipBarCarousel();			
			Common.footerMobileActions();			
		},
		ajaxStop: function () {},
		windowOnload: function () { },
		footerMobileActions:function () {
			$('.footer-qd-v1-hide-content p.qd-am-level-1, .footer-qd-v1-hide-content a.qd-am-level-1,  .footer-qd-v1-hide-content >.footer-qd-v1-title').click(function () {
				$(this).parent().toggleClass('qd-on-links');
			});
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		showHideMenuFloat: function(){
			$('.header-qd-v1-float-menu-trigger').click(function(){
				$('.header-qd-v1-amazing-menu').toggleClass('qd-nav-float-on');
			});
		},
		vtexBindQuickViewDestroy: function () {
			window.bindQuickView = function () { };
		},
		applySmartCart: function () {
			$('.header-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown: {
					texts: {
						linkCart: "Finalizar Compra",
						cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function () {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>');
						wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
					},
					skuName: function (data) {
						return data.name + ' - ' + data.skuName.replace(data.name, '');
					},
					callbackProductsList: function () {
						wrapper.find(".qd-ddc-prodQtt").each(function () {
							var $t = $(this);
							$t.add($t.next('.qd-ddc-prodRemove')).wrapAll('<div class="qd-ddc-prodAction"></div>');
						});
					}
				},
				buyButton: {
					buyButton: ".product-qd-v1-buy-button .buy-button"
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function (jqXHR, textStatus, prodLink, skus) {
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$('.header-qd-v1-cart-link').click(function (evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list, .footer-qd-v1-institutional-text').QD_amazingMenu();

			$('.header-qd-v1-floating-amazing-menu').click(function (e) {
				$('.header-qd-v1-amazing-menu-wrapper').toggleClass('qd-is-active');
				e.preventDefault();
			});
		},
		applyAmazingMenuMobile: function () {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function () { return $(this).prev().clone().wrap('<li></li>').parent() });

			wrapper.QD_amazingMenu({
				callback: function () {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function () {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function () { return !$(this).closest('ul').is('.qd-amazing-menu'); }).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function () {
						$('.header-qd-v1-amazing-menu-mobile-wrapper').addClass('qd-am-is-active');
						$('.header-qd-v1-amazing-menu-mobile-wrapper').animate({
							scrollTop: 0
						}, 200);
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
		},
		setDataScrollToggle: function () {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		toggleSearch: function () {
			$('.header-qd-v1-search-trigger').click(function (e) {

				if ($(this).parent().is('.header-qd-v1-floating-bar')) {
					$('.header-qd-v1-search-box').toggleClass('qd-active-floating-bar');
				}
				else {
					$('.header-qd-v1-search-box').toggleClass('qd-active');
				}

				e.preventDefault();
			});

			$('.header-qd-v1-search-box-close').click(function () {
				$('.header-qd-v1-search-box').removeClass('qd-active qd-active-floating-bar');
			});
		},
		openSearchModal: function () {
			$('.header-qd-v1-search-trigger-fixed-bar').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		openModalVideoInstitutional: function () {
			var modal = $('.modal-qd-v1-home-video');
			var video = $('.modal-qd-v1-home-video-wrapper').html();

			$('a[href*="#youtube"]').click(function (e) {
				e.preventDefault(); modal.find('iframe').attr('src', $(this).attr('href').replace('#youtube', ''));
				modal.modal('show');
				// modal.find('.modal-header').append('<h2 class="modal-title">' + $(this).children('img').attr('alt') + '</h2>');
				return false;
			});

			$('body').on('hidden.bs.modal', '.modal', function () {
				modal.remove();
				modal.find('.modal-title').remove();
				$('.modal-qd-v1-home-video-wrapper').append(video);
			});
		},
		applyCarouselShelf: function () {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function () {
				var $t = $(this);
				$t.find('h2').prependTo($t.parent());
			});

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

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
		},
		applyTipBarCarousel: function() {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				draggable: false,
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

			wrapper.slick($.extend(true, options, (function() {
				// Se estiver dentro do product-qd-v1-tip-bar, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if(wrapper.closest('.product-qd-v1-tip-bar').length)
					return { slidesToShow: 2 };
				return {};
			})()));
		}
	};

	var Home = {
		init: function () {
			Home.categoriesQdV1Banners();
			Home.sliderFull();
			Home.applyCarouselShelf();
			Home.sendNewsletter();
		},
		ajaxStop: function () { },
		windowOnload: function () { },
		categoriesQdV1Banners: function () {
			$(".box-banner").parent().each(function () {
				console.log("categoriesQdV1Banners");
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		sliderFull: function () {
			var wrapper = $('.slider-qd-v1-full');

			wrapper.slick({
				autoplay: true,
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});

			wrapper.each(function () {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		sendNewsletter: function() {
			// Formulário
			var form = $('#form-newsletter');
			var jsnomeLoja = 'mundialcalcados';
			var entity = 'NL';
			var emailInput = form.find("[name=qd_email]");

			// Não alterar aqui
			form.validate({
				rules: {
					email: {
						email: true
					}
				},
				submitHandler: function (form) {
					var $form = $(form);
					if (!$form.valid()) return;
					var inputs = $form.find('[name]');
					emailInput = emailInput.filter(inputs);
					$form.addClass("qd-loading");
					var saveContact = function (userId) {
						$.ajax({
							url: "//api.ipify.org?format=jsonp",
							dataType: "jsonp",
							success: function (data) {
								sendData(data.ip);
							},
							error: function () {
								$.ajax({
									url: "//www.telize.com/jsonip",
									dataType: "jsonp",
									success: function (data) {
										sendData(data.ip);
									},
									error: function (data) {
										sendData(null);
									}
								});
							}
						});
						var formData = $form.serializeObject();
						var sendData = function (ip) {
							formData['userId'] = userId;
							formData['ip'] = ip;
							formData['id'] = (emailInput.val() || '').toLowerCase().replace(/[^a-z0-9]/ig, function (v) {
								return '-' + v.charCodeAt(0) + '-'
							});
							$.ajax({
								url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/" + entity + "/documents",
								type: "PATCH",
								dataType: "json",
								headers: {
									"Accept": "application/vnd.vtex.ds.v10+json",
									"Content-Type": "application/json; charset=utf-8"
								},
								data: JSON.stringify(formData),
								success: function (data) {
									$form.addClass("qd-form-success");
									$form.trigger('QD.crmSuccess', [data]);
								},
								error: function () {
									alert("Desculpe, não foi possível enviar seu formulário!");
								},
								complete: function () {
									$form.removeClass("qd-loading");
								}
							});
						}
					};
					$.ajax({
						url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + (emailInput.val() || '---'),
						type: "GET",
						dataType: "json",
						headers: {
							Accept: "application/vnd.vtex.ds.v10+json"
						},
						success: function (data) {
							if (data.length) saveContact(data[0].id);
							else saveContact(null);
						},
						error: function () {
							saveContact(null);
						}
					});
					return false;
				},
				errorPlacement: function (error, element) { }
			});

			$(window).on('QD.crmSuccess', function(e, data) {
				var newsletter = $('.home-qd-v1-newsletter');
				// newsletter.find('.form-row').hide();
				newsletter.find('.form-row-success').fadeIn('fast');
				// msg = 'success';
				// alert("Obrigado! Em breve, você receberá ofertas e descontos exclusivos em seu e-mail.");
			});
		},
		applyCarouselShelf: function () {
			var wrapper = $('.home-qd-v1-links-shelfs .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function () {
				var $t = $(this);
				$t.find('h2').prependTo($t.parent());
			});

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

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

	var Search = {
		init: function () {
			Home.sliderFull();
			Search.smartResearchInit();
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.changeFilterPosition();
			Search.callSliderFilterPlice();
			Search.showOrderBy();
			Search.shelfLineFix();
			Search.applyPrateleiraCores(); $(window).on('QuatroDigital.sr_shelfCallback', Search.applyPrateleiraCores);
			Search.hideNumberShelf();
			Search.seoTextCollapse();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
			Search.applyPrateleiraCores();
		},
		windowOnload: function () {
			Search.shelfLineFix();
		},
		seoTextCollapse: function() {
			$(".search-qd-v1-seo-collapse > div > h2").click(function () {
				$(this).parent().toggleClass("qd-on");
			});
		},
		applyPrateleiraCores: function() {
			$('.prateleira:not([id*="ResultItems"])').QD_coresPrateleira({
				checkDuplicateUri: false,
				thumbsQuantity: 3,
				thumbSize: {
					width: 40,
					height: 70
				}
			});

			// Remove click na skuList em dispositivos de touch
			if('ontouchstart' in window || navigator.maxTouchPoints) {
				$('.qd-cpInnerLink').on('click', function(e) {
					e.preventDefault();
				});
			}
		},
		hideExtendedMenu: function () {
			$(".search-qd-v1-navigator ul").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				li = t.find(">li");
				qtt = 10;

				if (li.length <= qtt) return;

				liHide = li.filter(":gt(" + (qtt - 1) + ")").stop(true, true).hide();
				moreLink = $('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi = $('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais filtros</a></li>');
				t.append(moreLi);

				click = function () {
					liHide.stop(true, true).slideToggle(0, function () {
						if (li.filter(":visible").length > qtt) {
							moreLink.addClass("minus").text("Mostrar menos filtros");
							moreLi.addClass("minus").find("a").text("Mostrar menos filtros");
						}
						else {
							moreLink.removeClass("minus").text("Mostrar mais filtros");
							moreLi.removeClass("minus").find("a").text("Mostrar mais filtros");
						}
					});
				};
				moreLi.bind("click.qd_viewMore", click);
				moreLink.bind("click.qd_viewMore", click);
			});

			var wrapper = $(".search-single-navigator, .search-multiple-navigator");

			wrapper.find('h3, h4, h5').click(function (evt) {
				var $t = $(this);

				if ($(evt.target).is(wrapper.find('h3')) || $(evt.target).is(wrapper.find('h4')) || $(evt.target).is(wrapper.find('h5'))) {
					$t.find("+ ul").stop(true, true).slideToggle(0, function () {
						$t.toggleClass('qd-seach-active-menu');
					});
					$t.find("+ div").stop(true, true).slideToggle(0, function () {
						$t.toggleClass('qd-seach-active-menu');
					});
				}
			});
		},
		changeFilterPosition: function () {
			$(".search-multiple-navigator fieldset").first().before($(".filtro_numero").first());
		},
		smartResearchInit: function () {
			// $('.search-qd-v1-navigator').css('display', 'none')
			$(".search-qd-v1-navigator input[type='checkbox']").QD_SmartResearch({
				filterScrollTop: function (shelfOffset) {
					return (shelfOffset.top - 80);
				}
			});
			$('.search-qd-v1-navigator').css('display', 'block');
		},
		callSliderFilterPlice: function () {
			// Filters slide
			var filterPriceSlide = $('<div class="search-filters-qd-v1-price"></div>');
			var filterPrice = $('.search-qd-v1-navigator input[rel*="fq=P:"]').last();
			var pricesInterval = (filterPrice.val() || '').match(/([0-9\.]+)[^0-9]+([0-9\.]+)/) || ['', ''];
			var maxPrice = Math.ceil(pricesInterval.pop() / 10) * 10;
			var minPrice = 0;
			var filterTitleMin = $('<span class="search-filters-qd-v1-title">R$ ' + minPrice + '</span>');
			var filterTitleMax = $('<span class="search-filters-qd-v1-title" id="search-filters-qd-v1-title-max">R$' + maxPrice + '</span>');

			filterPrice.parent().hide(); // Foi feito aqui e não por css, para que o cliente veja que possui um erro, caso tenha mais de um filtro por preço.
			filterPriceSlide.insertAfter(filterPrice.parent()).slider({
				range: true,
				min: minPrice,
				max: maxPrice,
				step: 10,
				values: [minPrice, maxPrice],
				slide: function (event, ui) {
					filterTitleMin.text("R$ " + ui.values[0]);
					filterTitleMax.text("R$ " + ui.values[1]);
				},
				change: function (event, ui) {
					filterPrice.removeAttr('checked').change();
					filterPrice.attr('rel', 'fq=P:%5b' + ui.values[0] + '+TO+' + ui.values[1] + '%5d');
					filterPrice.parent().click();
				}
			});

			filterPriceSlide.before(filterTitleMin);
			filterPriceSlide.before(filterTitleMax);
		},
		openFiltersMenu: function () {
			$('.search-qd-v1-navigator-trigger').click(function (e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
			});
		},
		showOrderBy: function () {
			var orderBy = $(".orderBy:first select");
			orderBy.appendTo(".search-qd-v1-orderby");
			orderBy.first().clone().appendTo('.fixed-buttons-qd-v1-search-navigator .search-qd-v1-orderby-fixed');
		},
		shelfLineFix: function () {
			try {
				var exec = function () {
					var curTop;
					var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

					var shelf = wrapper.children("ul").removeClass('qd-first-line');
					shelf.first().addClass("qd-first-line");

					var setFirst = function () {
						shelf.each(function () {
							var $t = $(this);

							if ($t.is(".qd-first-line")) {
								curTop = $t.offset().top;
								shelf = shelf.not($t);
								return;
							}

							var offsetTop = $t.offset().top;
							if (offsetTop >= curTop - 10 && offsetTop <= curTop + 10)
								shelf = shelf.not($t);
							else {
								$t.addClass("qd-first-line");
								return false;
							}
						});

						if (shelf.length)
							setFirst();
					};
					setFirst();
				};
				exec();

				// Olhando para o Smart Research
				if (!window.qd_shelf_line_fix_) {
					$(window).on("QuatroDigital.sr_shelfCallback", exec);
					window.qd_shelf_line_fix_ = true;
				}

				// Olhando para o evento window resize
				var resize = $._data(window).events.resize;
				var allowResize = true;
				if (resize)
					for (var i = 0; i < resize.length; i++) {
						if (resize[i].namespace == "qd") {
							allowResize = false;
							break;
						}
					}
				if (allowResize) {
					var timeOut = 0;
					$(window).on("resize.qd", function () {
						clearTimeout(timeOut);
						timeOut = setTimeout(function () {
							$(".qd-first-line").removeClass(".qd-first-line");
							exec();
						}, 20);
					});
				}
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		},
		hideNumberShelf: function () {
			var isUnique = true;

			$('.search-multiple-navigator .filtro_numero label').each(function() {
				if (!$(this).is('.sr_unico'))
					isUnique = false;
			});
			
			if (isUnique)
				$('.search-multiple-navigator .filtro_numero').hide();
		}
	};

	var Product = {
		run: function () {
			$(window).on('skuSelectable.vtex', function() {
				$(function(){
					Product.applyCarouselThumb();
					Product.forceImageZoom();
					Product.checkItemUnavailable();
				});
			});

			$(window).on('skuSelected.vtex', function() {
				$(function(){
					Product.applyCarouselThumb();
					Product.forceImageZoom(); 
					Product.checkItemUnavailable();
				});
			});
		},
		init: function () {
			Product.applyColorImages();
			Product.setAvailableBodyClass();
			Product.openShipping();
			Product.applyCarouselThumb(); 
			Product.forceImageZoom(); 
			Product.productDescriptionCollapse();
			Product.shippingTableFormat();
			Product.applyMosaicCategoriesBanners();
			Product.productBuyTogether();
			Product.hideUniqueSkuOption();
			Product.showPopupPurchaseConfirmation();
			Product.checkItemUnavailable();
			Product.activatePricePlugin();
			Search.applyPrateleiraCores();
		},
		ajaxStop: function () { 
			Product.toggleNotifyModal();
			Product.shippingSubmitOnEnter();
			Product.checkItemUnavailable();
			Search.applyPrateleiraCores();
		},
		windowOnload: function () { },
		productBuyTogether: function () {
			// $('.buy-together-content').append('<table> <tbody><tr> <td class="itemA"> <a href="http://www.bulking.com.br/t-shirt-new-level/p"><img src="http://bulking.vteximg.com.br/arquivos/ids/157287-255-400/new-level1.jpg" width="255" height="400" alt="new-level1" id=""></a> <h3><a href="http://www.bulking.com.br/t-shirt-new-level/p" id="lnkProdAtualPai">T-SHIRT NEW LEVEL P</a></h3> </td> <td class="plus"> + </td> <td class="itemB"> <a href="http://www.bulking.com.br/bermuda-thunder-silver/p"><img src="http://bulking.vteximg.com.br/arquivos/ids/157511-255-400/thunder-silver-1.jpg" width="255" height="400" alt="thunder-silver-1" id=""></a> <h3><a href="http://www.bulking.com.br/bermuda-thunder-silver/p" id="lnkProdAtualFilho">BERMUDA THUNDER SILVER 38</a></h3> </td> <td class="equal"> = </td> <td class="buy"> <span> R$ 228,95</span> ou <strong>3x</strong> de <strong> R$ 76,31</strong> <strong>Comprando junto você economiza:  R$ 12,05</strong> <p class="comprar-junto"><a href="https://www.bulking.com.br/checkout/cart/add?sku=773&amp;sku=151093092&amp;qty=1&amp;qty=1&amp;seller=1&amp;seller=1&amp;price=11600&amp;price=12500&amp;cv=0577d73bf33eae24b058c6d4e018b9a0_geral:B45FA76B0ADFA58E899C6DEB9AC3B5E2&amp;cv=dd3766083c809933224d0eb2f9f2c8d4_geral:B45FA76B0ADFA58E899C6DEB9AC3B5E2&amp;sc=1" id="lnkComprar">Comprar</a></p> <p class="more"><a href="http://www.bulking.com.br/camiseta" id="lnkVejaMais">Veja mais Camiseta</a></p> </td> </tr> <tr> <td class="itemA"> <a href="http://www.bulking.com.br/t-shirt-new-level/p"><img src="http://bulking.vteximg.com.br/arquivos/ids/157287-255-400/new-level1.jpg" width="255" height="400" alt="new-level1" id=""></a> <h3><a href="http://www.bulking.com.br/t-shirt-new-level/p" id="lnkProdAtualPai">T-SHIRT NEW LEVEL P</a></h3> </td> <td class="plus"> + </td> <td class="itemB"> <a href="http://www.bulking.com.br/bermuda-thunder-silver/p"><img src="http://bulking.vteximg.com.br/arquivos/ids/157514-255-400/thunder-silver-1.jpg" width="255" height="400" alt="thunder-silver-1" id=""></a> <h3><a href="http://www.bulking.com.br/bermuda-thunder-silver/p" id="lnkProdAtualFilho">BERMUDA THUNDER SILVER 40</a></h3> </td> <td class="equal"> = </td> <td class="buy"> <span> R$ 228,95</span> ou <strong>3x</strong> de <strong> R$ 76,31</strong> <strong>Comprando junto você economiza:  R$ 12,05</strong> <p class="comprar-junto"><a href="https://www.bulking.com.br/checkout/cart/add?sku=773&amp;sku=151093095&amp;qty=1&amp;qty=1&amp;seller=1&amp;seller=1&amp;price=11600&amp;price=12500&amp;cv=0577d73bf33eae24b058c6d4e018b9a0_geral:B45FA76B0ADFA58E899C6DEB9AC3B5E2&amp;cv=dd3766083c809933224d0eb2f9f2c8d4_geral:B45FA76B0ADFA58E899C6DEB9AC3B5E2&amp;sc=1" id="lnkComprar">Comprar</a></p> <p class="more"><a href="http://www.bulking.com.br/camiseta" id="lnkVejaMais">Veja mais Camiseta</a></p> </td> </tr> </tbody></table>');
			if ($(".product-qd-v1-buy-together-wrap .buy-together-content table").length) {
				$(".product-qd-v1-buy-together-wrap").show();
			}
		},
		hideUniqueSkuOption: function () {
			$(".sku-selector-container [class*='group_']").each(function () {
				var $t = $(this);
				var input = $t.find("input");

				if (input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
			});
		},
		applyMosaicCategoriesBanners: function () {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				containerWidth: 1000,
				classFourColumn: "col-xs-6 col-sm-6 col-md-3"
			});
		},
		productDescriptionCollapse: function () {
			$('.product-qd-v1-collpse-title').click(function () {
				$(this).toggleClass('qd-is-active');
				$(this).next().toggleClass('qd-is-active');
			});
		},
		shippingTableFormat: function() {
			window.ajaxShippin = function(method, url, postData, target, callback) {
				$.ajax({
					type: method,
					url: url,
					data: postData,
					success: function (dataResult) {
						var data = $(dataResult.replace(/R\$/ig, 'R$ '));

						data.find('tbody tr').each(function () {
							var $t = $(this);
							var tr = $t.find('td:eq(1)');
							var text = tr.text().split(', entrega em');
							tr.clone().insertAfter(tr).text(text[1].split(' para o')[0].toUpperCase() || '');
							tr.text(text[0].replace("Frete ", "").toUpperCase() || '');
							$t.find('td:eq(0)').insertAfter(tr);
						});

						$(target).html(data).show();
					},
					error: function (xhr, status, error) {
						$(target).html(status).show();
					}
				});
			}
		},
		openShipping: function () {
			if (typeof window.ShippingValue === "function")
				window.ShippingValue();
		},
		shippingSubmitOnEnter: function () {
			$("#txtCep").on('keyup', function (e) {
				if (e.keyCode == 13) {
					$('#btnFreteSimulacao').click();
				}
			});
		},
		setAvailableBodyClass: function () {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
			}

			$(document).on("skuSelected.vtex", function (e, id, sku) {
				checkVisibleNotify(sku.available);
			});

			checkVisibleNotify(skuJson.available);
		},
		forceImageZoom: function () {
			try {
				if ($(window).width() < 993) return;

				$('.product-qd-v1-image-carrousel').find('.slick-slide img').each(function() {
					var image = $(this);

					if (!image.parent().is('.product-qd-v1-zoom-wrapper'))
						image.wrap('<span class="product-qd-v1-zoom-wrapper" style="display:inline-block"></span>')
							.css('display', 'block')
							.parent()
							.zoom({ url: image.attr("src").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1200-1804"), on: 'mouseover', touch: false });
					else 
						image.zoom({ url: image.attr("src").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1200-1804"), on: 'mouseover', touch: false });
				});
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado com o zoom :( . Detalhes: " + e.message)); }
		},
		applyCarouselThumb: function () {
			var sliderWrapper = $('.product-qd-v1-image-carrousel'); // Wrapper que será inserido o carousel
			var vtexThumbs = $('.thumbs').last(); // Wrapper onde foi inserido as thumbs
			var thumbsWrapper = $('.product-qd-v1-image-thumbs'); // Wrapper onde foi inserido as thumbs

			sliderWrapper.filter('.slick-initialized').slick('unslick');
			thumbsWrapper.filter('.slick-initialized').slick('unslick');

			thumbsWrapper.html(vtexThumbs.html());

			thumbsWrapper.find('img').each(function () {
				$t = $(this);
				$t.attr('src', $t.attr('src').replace('-55-55', '-150-150'));
			});

			sliderWrapper.empty();
			vtexThumbs.find('a').each(function (index) {
				$t = $(this);
				$('<div class="qd-slide qd-product-image-' + index + '"><a href="' + $t.attr('rel').replace('-292-292', '-640-640') + '"><img src="' + $t.attr('rel').replace('-292-292', '-640-640') + '"/></a></div>').appendTo(sliderWrapper);
			});

			var options = {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				dots: true,
				focusOnSelect: true
			};
			sliderWrapper.slick(options, {
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				asNavFor: '.product-qd-v1-image-thumbs',
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							centerPadding: '100px'
						}
					},
					{
						breakpoint: 767,
						settings: {
							slidesToShow: 1,
							centerPadding: 0
						}
					},
				]
			});

			var thumb = thumbsWrapper.find('li >a');

			sliderWrapper.slick('getSlick').slickGoTo(0);

			thumb.each(function (index) {
				$(this).click(function () {
					// $('.zoomContainer').remove();
					sliderWrapper.slick('getSlick').slickGoTo(index);
				});
			});

			sliderWrapper.on('afterChange', function (event, slick, slide) {

				sliderWrapper.find('qd-slide').attr('data-slick-index');

				var selectedSlide = sliderWrapper.find('.slick-active').attr('data-slick-index');
				thumb.removeClass('ON');
				thumbsWrapper.find('li >a:eq(' + selectedSlide + ')').addClass('ON');

			});

			sliderWrapper.find('a').click(function (e) { e.preventDefault() });
		},
		selectSku: function () {
			var wrapper = $('.skuList');

			wrapper.on('selectSku.qd_click', function () {
				try {
					var $t = $(this);

					var buyButton = $t.find('.buy-button');
					if (buyButton.length)
						var skuId = buyButton.attr('href').match(/sku\=([0-9]+)/i)[1];
					else
						var skuId = $t.find('.sku-notifyme-skuid').val();

					var selectedSku;
					for (var i = 0; i < skuJson.skus.length; i++) {
						if (skuJson.skus[i].sku == skuId) {
							selectedSku = skuJson.skus[i];
							break;
						}
					}

					if (selectedSku)
						$(document).trigger('skuSelected.vtex', [skuId, selectedSku]);

					wrapper.removeClass('qd-sku-list-selected qd-sku-list-selected-by-click');
					$t.addClass('qd-sku-list-selected');
				}
				catch (e) { if (typeof console !== 'undefined' && typeof console.info === 'function') console.info('Problemas ao selecionar o SKU', e.message); };
			});

			wrapper.click(function () {
				var $t = $(this);

				$t.trigger('selectSku.qd_click');
				$t.addClass('qd-sku-list-selected-by-click');
			});
		},
		toggleNotifyModal: function () {
			// var selector = $('.Cor:visible').length == 0 ? '' : '.Cor';

			// $(selector + ' .item_unavaliable').click(function() {
			// 	$('.portal-notify-me-ref').fadeIn();

			if($('.notifyme-modal-close').length == 0)
				$('.<div class="notifyme-modal-close">Fechar <span>X</span></div>').appendTo('.notifyme');

			$('.notifyme-modal-close').click(function() {
				$('.portal-notify-me-ref').fadeOut();
			});
			
			$('.portal-notify-me-ref').css('display', $('.notifyme').css('display'));
		},
		showPopupPurchaseConfirmation: function() {
			$('.qd-bb-productAdded').hide();
			$('.buy-button').click(function() {
				scrollTo(0,0);
				var buyButton = $(this);
				if (buyButton.length)
					var skuId = buyButton.attr('href').match(/sku\=([0-9]+)/i)[1];
				else
					var skuId = $t.find('.sku-notifyme-skuid').val();

				var selectedSku;
				for (var i = 0; i < skuJson.skus.length; i++) {
					if (skuJson.skus[i].sku == skuId) {
						selectedSku = skuJson.skus[i];
						break;
					}
				}

				if(selectedSku) {
					var skuData = getSkuData(selectedSku.sku);
					var wrapper = '<div class="product-qd-v1-purchase-confirmation"> <div class="purchase-confirmation-close"></div> <div class="row"> <div class="col-md-5 col-xs-12"> <div class="purchase-confirmation-image"> <img src="{{image}}" alt="Imagem do Produto"> </div> </div> <div class="col-md-7 col-xs-12"> <div class="purchase-confirmation-brand"> {{brand}} </div> <div class="purchase-confirmation-product-name"> {{productName}} </div> <div class="purchase-confirmation-product-ref"> Ref. {{reference}} </div> <br> <div class="purchase-confirmation-price"> <p>{{price}}</p> <span>ou {{numberDiscount}}x de R$ {{discount}}</span> </div> <br> <div class="purchase-confirmation-color"> <p>Cor</p> <span>{{color}}</span> </div> <br> <div class="purchase-confirmation-number"> <p>Número</p> <span>{{number}}</span> </div> </div> </div> <hr> <div class="purchase-confirmation-buttons"> <div class="row"> <div class="col-md-6 col-xs-12"> <a class="purchase-confirmation-button purchase-confirmation-buy-more" href="#">Comprar Mais</a> </div> <div class="col-md-6 col-xs-12"> <a class="purchase-confirmation-button purchase-confirmation-checkout" href="/checkout/#/cart">Fechar Pedido</a> </div> </div> </div> </div>';

					wrapper = wrapper.replace('{{brand}}', selectedSku.seller);
					wrapper = wrapper.replace('{{productName}}', skuData.name);
					wrapper = wrapper.replace('{{image}}',selectedSku.image);
					wrapper = wrapper.replace('{{reference}}',skuData.reference);
					wrapper = wrapper.replace('{{price}}',selectedSku.bestPriceFormated);
					wrapper = wrapper.replace('{{numberDiscount}}',skuData.bestInstallmentNumber);
					wrapper = wrapper.replace('{{discount}}',skuData.bestInstallmentValue);
					wrapper = wrapper.replace('{{image}}',selectedSku.image);
					wrapper = wrapper.replace('{{number}}',selectedSku.values[0]);
					wrapper = wrapper.replace('{{color}}',selectedSku.values[1]);

					if ($('.product-qd-v1-purchase-confirmation').length > 0)
						$('.product-qd-v1-purchase-confirmation').html(wrapper);
					else 
						$(wrapper).appendTo('.product-qd-v1-sku-information');
						
					// $('.product-qd-v1-sku-information > div:first-child').hide();
					$('.product-qd-v1-purchase-confirmation').fadeIn();

					$('.purchase-confirmation-close, .purchase-confirmation-buy-more').click(function(){
						// $('.product-qd-v1-sku-information > div:first-child').show();
						$('.product-qd-v1-purchase-confirmation').fadeOut();
					});
				}
			});
		},
		applyColorImages: function () {
			// var colorSkus = [];			
			// $('.sku-selector-container-0 .Cor').find('.sku-selector +label').each(function() {
			// 	colorSkus.push($(this).attr('for'));
			// });
			// var cs = colorSkus.join(' - ');
			// for (var i = 0; i < skuJson.skus.length; i++) {
			// 	if(cs.indexOf(skuJson.skus[i].skuname)) {
			// 		$(this).wrapInner('<span class="product-qd-v1-sku-text"></span>').prepend('<span class="product-qd-v1-sku-img"><img src="' + skuJson.skus[i].image.replace(/(ids\/[0-9]+)\-[0-9]+\-[0-9]+/, '$1-50-50') + '" /></span>');
			// 	}
			// }
			try {
				$('.sku-selector-container-0 .Cor').find('.dimension-Cor').each(function() {
					i = 0;
					var cor = $(this).attr('class').split('skuespec_Cor_opcao_')[1].replace(/ /g, '');
					for (var i = 0; i < skuJson.skus.length; i++) {
						if (skuJson.skus[i].dimensions.Cor == cor) {
							$(this).wrapInner('<span class="product-qd-v1-sku-text"></span>').prepend('<span class="product-qd-v1-sku-img"><img src="' + skuJson.skus[i].image.replace(/(ids\/[0-9]+)\-[0-9]+\-[0-9]+/, '$1-100-150') + '" /></span>');
							break;
						}
					}
				});
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado ao aplicar as imagens das cores :( . Detalhes: " + e.message)); }
		},
		checkItemUnavailable: function () {
			try {
				var cor = $('.dimension-Cor.sku-picked').text();
				$('.sku-selector-container-0 .Numero').find('.dimension-Numero').each(function(i) {
					var $t = $(this);
					var numero = $t.text();
					var d = 0;

					for (var i = 0; i < skuJson.skus.length; i++) {
						if (skuJson.skus[i].dimensions["Número"] == numero && skuJson.skus[i].dimensions.Cor == cor && skuJson.skus[i].availablequantity == 0) {
							$t.addClass('item_unavailable');
							break;
						}
						d++;
					}
				});
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado ao checar a disponibilidade dos items do produto :( . Detalhes: " + e.message)); }
		},
        activatePricePlugin: function () {
            var wrapper = $('.product-qd-v1-price');
            if (!wrapper.find('.plugin-preco').length)
				$('<div class="plugin-preco"></div>').appendTo(wrapper).price(skuJson.productId);
        }
	};

	var List = {
		run: function () { },
		init: function () { },
		ajaxStop: function () { },
		windowOnload: function () { }

	};

	var Institutional = {
		init: function () {
			Institutional.sidemenuToggle();
			if($('body').is('.marcas')) {
				Institutional.menuPersonalization();
				Institutional.brandSearch();
			}

		},
		ajaxStop: function () { },
		windowOnload: function () { },
		sidemenuToggle: function () {
			// Amazing Menu Responsivo
			$('.institucional-qd-v1-menu-toggle').click(function (evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});
			$('.institucional-qd-v1-side-menu-wrap-close').click(function () {
				$(document.body).removeClass('qd-sn-on');
			});
		},
		brandSearch: function() {
			var letterWrappers = $('.marcas-qd-v1-results > div');
			var searchBtn = $('.marcas-qd-v1-search-box a');
			var searchInput = $('.marcas-qd-v1-search-box input');

			$(window).on('QuatroDigital.hideEmpty', function() {
				letterWrappers.each(function() {
					if($(this).find('> ul:visible').length)
						$(this).show();
					else
						$(this).hide();
				});
			});

			searchBtn.on('click', function(){
				var query = searchInput.val();
				letterWrappers.find('> ul').each(function(){
					if($(this).text().indexOf(query) < 0)
						$(this).hide();
					else
						$(this).show();
				});
				
				letterWrappers.show();
				$(window).trigger('QuatroDigital.hideEmpty');
			});

			searchInput.on('keyup', function(){
				var queryLength = searchInput.val().length;
				if(queryLength == 0 || queryLength > 2)
					searchBtn.click();	
			});

			$(window).trigger('QuatroDigital.hideEmpty');
		},
		menuPersonalization: function() {
			var liArray = $('.Numero li').sort(function(a, b) {
				var intA = parseInt($(a).text());
				var intB = parseInt($(b).text());

				if(isNaN(intA) && isNaN(intB)) {
					if($(a).text() > $(b).text())
						return 1;
					return -1;
				}

				if(isNaN(intA))
					return 1;

				if(isNaN(intB))
					return -1;

				if(intA > intB)
					return 1;
					
				return -1;

			});
			$('.Numero ul').empty().append(liArray);
		}
	};

	var Orders = {
		init: function () {
			Orders.bootstrapCssFix();
		},
		ajaxStop: function () { },
		windowOnload: function () { },
		bootstrapCssFix: function () {
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
catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message)); }

try {
	(function () {
		var body, ajaxStop, windowLoad;

		windowLoad = function () {
			Common.windowOnload();
			if (body.is(".home")) Home.windowOnload();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.windowOnload();
			else if (body.is(".produto")) Product.windowOnload();
			else if (body.is(".listas")) List.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function () {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".listas")) List.ajaxStop();
			else if (body.is(".institucional")) Institutional.ajaxStop();
			else if (body.is(".orders")) Orders.ajaxStop();
		};

		$(function () {
			body = $(document.body);
			Common.init();
			if (body.is(".home")) Home.init();
			else if (body.is(".resultado-busca, .departamento, .categoria")) {
				Search.isSearch = $(document.body).is('.resultado-busca');
				Search.isDepartament = $(document.body).is('.departamento');
				Search.isCategory = $(document.body).is('.categoria');
				Search.init();
			}
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
catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }

/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function () {
	"function" !== typeof $.cookie && function (c) { "function" === typeof define && define.amd ? define(["jquery"], c) : "object" === typeof exports ? c(require("jquery")) : c(jQuery) }(function (c) {
		function p(a) { a = e.json ? JSON.stringify(a) : String(a); return e.raw ? a : encodeURIComponent(a) } function n(a, g) {
			var b; if (e.raw) b = a; else a: { var d = a; 0 === d.indexOf('"') && (d = d.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")); try { d = decodeURIComponent(d.replace(l, " ")); b = e.json ? JSON.parse(d) : d; break a } catch (h) { } b = void 0 } return c.isFunction(g) ?
				g(b) : b
		} var l = /\+/g, e = c.cookie = function (a, g, b) {
			if (1 < arguments.length && !c.isFunction(g)) { b = c.extend({}, e.defaults, b); if ("number" === typeof b.expires) { var d = b.expires, h = b.expires = new Date; h.setTime(+h + 864E5 * d) } return document.cookie = [e.raw ? a : encodeURIComponent(a), "=", p(g), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join("") } for (var d = a ? void 0 : {}, h = document.cookie ? document.cookie.split("; ") : [], m = 0, l = h.length; m < l; m++) {
				var f =
					h[m].split("="), k; k = f.shift(); k = e.raw ? k : decodeURIComponent(k); f = f.join("="); if (a && a === k) { d = n(f, g); break } a || void 0 === (f = n(f)) || (d[k] = f)
			} return d
		}; e.defaults = {}; c.removeCookie = function (a, e) { if (void 0 === c.cookie(a)) return !1; c.cookie(a, "", c.extend({}, e, { expires: -1 })); return !c.cookie(a) }
	})
})();

/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b, c, d, e) { b = (b + "").replace(/[^0-9+\-Ee.]/g, ""); b = isFinite(+b) ? +b : 0; c = isFinite(+c) ? Math.abs(c) : 0; e = "undefined" === typeof e ? "," : e; d = "undefined" === typeof d ? "." : d; var a = "", a = function (a, b) { var c = Math.pow(10, b); return "" + (Math.round(a * c) / c).toFixed(b) }, a = (c ? a(b, c) : "" + Math.round(b)).split("."); 3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e)); (a[1] || "").length < c && (a[1] = a[1] || "", a[1] += Array(c - a[1].length + 1).join("0")); return a.join(d) };

/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function (a) { a.fn.getParent = a.fn.closest })(jQuery);

"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(){var d=jQuery;if("function"!==typeof d.fn.QD_news){var w={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",originField:".qd_news_origin",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,
animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",timeHideSuccessMsg:3E3,platform:"vtexcrm",vtexStore:jsnomeLoja,entity:"NL",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(d,g){}};d.fn.QD_news=function(t){var g=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var e;"object"===typeof a?(a.unshift("[QD News]\n"),e=a):e=["[QD News]\n"+a];if("undefined"===
typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,e)}catch(c){console.info(e.join("\n"))}else try{console.error.apply(console,e)}catch(c){console.error(e.join("\n"))}else try{console.warn.apply(console,e)}catch(c){console.warn(e.join("\n"))}}},k=d(this);if(!k.length)return k;var a=d.extend({},w,t);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==
a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof d.fn.vtexPopUp2)return g("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),k;var v=function(d){var g=0;var e=function(){d.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){d.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&e();g++})})};var c=function(){d.fadeTo(a.animateSpeed,.2,function(){d.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&
c();g++})})};d.stop(!0,!0);"leftRight"==a.animation?e():"blink"==a.animation&&c()};k.each(function(){function k(b,q){l.attr("disabled","disabled");var f={postData:{newsletterClientEmail:b,newsletterClientName:a.defaultName==q?"-":q,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:l,wrapper:c};"linx"==a.platform&&(f.postData.nome=f.postData.newsletterClientName,f.postData.email=f.postData.newsletterClientEmail);
"vtexcrm"==a.platform?t(function(x){e(f,d.ajax({url:"//api.vtexcrm.com.br/"+a.vtexStore+"/dataentities/"+a.entity+"/documents",type:"PATCH",dataType:"json",headers:{Accept:"application/vnd.vtex.ds.v10+json","Content-Type":"application/json; charset=utf-8"},data:JSON.stringify({id:b.toLowerCase().replace(/[^a-z0-9]/ig,function(a){return"-"+a.charCodeAt(0)+"-"}),ip:x,origin:c.find(a.originField).val()||"---",qd_email:b,qd_name:q,URI:location.href})}))}):e(f,d.ajax({url:"linx"==a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"==a.platform?"GET":"POST",data:f.postData}));a.submitCallback(b,q)}function t(a){d.ajax({url:"//api.ipify.org?format=jsonp",dataType:"jsonp",success:function(b){a(b.ip)},error:function(){d.ajax({url:"//freegeoip.net/json/",dataType:"json",success:function(b){a(b.ip)},error:function(b){a(null)}})}})}function e(b,e){e.fail(function(){alert("Desculpe. N\u00e3o foi poss\u00edvel cadastrar seu e-mail, por favor tente novamente.")});e.done(function(e){l.removeAttr("disabled");
if("linx"==a.platform&&!(-1<e.indexOf(" com sucesso.")||-1<e.indexOf(" cadastrado.")))return alert(e);"popup"==a.validationMethod?r.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&r.slideDown().bind("click",function(){d(this).slideUp()});var f=c.find(a.emailField);a.setDefaultName&&c.find(a.nameField).is("input:text, textarea")&&c.find(a.nameField).val(a.defaultName);if("animateField"==a.validationMethod){f.val(c.find(a.animateFieldSuccess).val()||
"Obrigado!!!");f.addClass("vtexNewsSuccess");var g=setTimeout(function(){f.removeClass("vtexNewsSuccess");f.val(a.defaultEmail);f.unbind("focus.vtexNews")},a.timeHideSuccessMsg);f.bind("focus.vtexNews",function(){f.removeClass("vtexNewsSuccess");clearTimeout(g);d(this).val("");d(this).unbind("focus.vtexNews")})}else f.val(a.defaultEmail);a.successCallback(b);d(c).trigger("qdNewsSuccessCallback",b)})}var c=d(this),m=c.find(a.nameField),h=c.find(a.emailField),l=c.find(a.btn);if("animateField"!=a.validationMethod){var n=
c.find(a.elementError);var r=c.find(a.elementSuccess)}1>m.length&&a.checkNameExist&&g("Campo de nome, n\u00e3o encontrado ("+m.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>h.length)return g("Campo de e-mail, n\u00e3o encontrado ("+h.selector+")"),c;if(1>l.length)return g("Bot\u00e3o de envio, n\u00e3o encontrado ("+l.selector+")"),c;if("animateField"!=a.validationMethod&&(1>r.length||1>n.length))return g("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+r.selector+
", "+n.selector+")"),c;a.setDefaultName&&m.is("input[type=text], textarea")&&m.val(a.defaultName);h.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var b=m.filter(":visible");if(!b.length)return}else b=m;var c=b.val();b.is("input:text, textarea")&&b.bind({focus:function(){b.val()!=c||0!==b.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||b.val("")},blur:function(){""===b.val()&&b.val(c)}})}})();(function(){var b=h.val();h.bind({focus:function(){h.val()==
b&&0===h.val().search(a.defaultEmail.substr(0,6))&&h.val("")},blur:function(){""===h.val()&&h.val(b)}})})();var u=function(){var b;var e=(b=c.find(a.nameField).filter("input[type=text],select,textarea").val())?b:c.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?c.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(b=c.find(a.nameField).attr(a.getAttr))?b:(b=c.find(a.nameField).text())?b:(b=c.find(a.nameField).find(".box-banner img:first").attr("alt"))?
b:"Nome_Padrao";b=(c.find(a.emailField).val()||"").trim();var f=c.find(a.nameField).is(":visible");f=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||f?f:!0):!1;var h=0>b.search(/^[a-z0-9_\-\.\+]+@[a-z0-9_\-]+(\.[a-z0-9_\-]{2,})+$/i);f||h?"animateField"==a.validationMethod?(f&&v(c.find(a.nameField)),h&&v(c.find(a.emailField))):"popup"==a.validationMethod?n.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(n.slideDown().bind("click",function(){d(this).slideUp()}),
setTimeout(function(){n.slideUp()},1800)):a.allowSubmit()?k(b,e):g("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),u())};m.filter("input:text, textarea").bind("keydown",p);h.bind("keydown",p);p=l.getParent("form");p.length?p.submit(function(a){a.preventDefault();u()}):l.bind("click.qd_news",function(){u()})});return k};d(function(){d(".qd_news_auto").QD_news()})}})();
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
/* Quatro Digital Amazing Menu */
var _0xa63f=['info','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-first','last','qd-am-last','haqvnypnypnqbf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','html','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','\x27\x20falho.','ajaxCallback','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','alerta','li\x20>ul','qd-am-has-ul','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','-li','callback','call','trigger','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','warn','[QD\x20Amazing\x20Menu]\x0a','toLowerCase','aviso'];(function(_0x109f62,_0x2a1093){var _0x2ac0cc=function(_0x2cf0da){while(--_0x2cf0da){_0x109f62['push'](_0x109f62['shift']());}};_0x2ac0cc(++_0x2a1093);}(_0xa63f,0x1b6));var _0xfa63=function(_0x3358ba,_0x24c5fc){_0x3358ba=_0x3358ba-0x0;var _0x296e73=_0xa63f[_0x3358ba];return _0x296e73;};(function(_0xa59e5){_0xa59e5['fn'][_0xfa63('0x0')]=_0xa59e5['fn'][_0xfa63('0x1')];}(jQuery));(function(_0x243aaf){var _0x3103ba;var _0x2bbc5a=jQuery;if(_0xfa63('0x2')!==typeof _0x2bbc5a['fn'][_0xfa63('0x3')]){var _0x37e644={'url':_0xfa63('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x581d1f=function(_0x5a2eca,_0x20d4f6){if(_0xfa63('0x5')===typeof console&&_0xfa63('0x6')!==typeof console[_0xfa63('0x7')]&&'undefined'!==typeof console['info']&&'undefined'!==typeof console[_0xfa63('0x8')]){var _0x149a67;_0xfa63('0x5')===typeof _0x5a2eca?(_0x5a2eca['unshift'](_0xfa63('0x9')),_0x149a67=_0x5a2eca):_0x149a67=['[QD\x20Amazing\x20Menu]\x0a'+_0x5a2eca];if(_0xfa63('0x6')===typeof _0x20d4f6||'alerta'!==_0x20d4f6[_0xfa63('0xa')]()&&_0xfa63('0xb')!==_0x20d4f6[_0xfa63('0xa')]())if(_0xfa63('0x6')!==typeof _0x20d4f6&&_0xfa63('0xc')===_0x20d4f6[_0xfa63('0xa')]())try{console[_0xfa63('0xc')][_0xfa63('0xd')](console,_0x149a67);}catch(_0x4b1037){try{console['info'](_0x149a67[_0xfa63('0xe')]('\x0a'));}catch(_0x451359){}}else try{console[_0xfa63('0x7')]['apply'](console,_0x149a67);}catch(_0x146801){try{console['error'](_0x149a67[_0xfa63('0xe')]('\x0a'));}catch(_0x1093da){}}else try{console['warn'][_0xfa63('0xd')](console,_0x149a67);}catch(_0xca0a31){try{console[_0xfa63('0x8')](_0x149a67[_0xfa63('0xe')]('\x0a'));}catch(_0x7d2ef5){}}}};_0x2bbc5a['fn'][_0xfa63('0xf')]=function(){var _0x53aec2=_0x2bbc5a(this);_0x53aec2[_0xfa63('0x10')](function(_0x381d7a){_0x2bbc5a(this)[_0xfa63('0x11')](_0xfa63('0x12')+_0x381d7a);});_0x53aec2['first']()['addClass'](_0xfa63('0x13'));_0x53aec2[_0xfa63('0x14')]()[_0xfa63('0x11')](_0xfa63('0x15'));return _0x53aec2;};_0x2bbc5a['fn']['QD_amazingMenu']=function(){};_0x243aaf=function(_0x591c35){var _0x17e929={'z':_0xfa63('0x16')};return function(_0x931bf0){var _0xa83c1d=function(_0x3811a3){return _0x3811a3;};var _0x1bc5e2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x931bf0=_0x931bf0['d'+_0x1bc5e2[0x10]+'c'+_0x1bc5e2[0x11]+'m'+_0xa83c1d(_0x1bc5e2[0x1])+'n'+_0x1bc5e2[0xd]]['l'+_0x1bc5e2[0x12]+'c'+_0x1bc5e2[0x0]+'ti'+_0xa83c1d('o')+'n'];var _0x4e5a54=function(_0x293520){return escape(encodeURIComponent(_0x293520[_0xfa63('0x17')](/\./g,'¨')[_0xfa63('0x17')](/[a-zA-Z]/g,function(_0x1697a3){return String['fromCharCode'](('Z'>=_0x1697a3?0x5a:0x7a)>=(_0x1697a3=_0x1697a3[_0xfa63('0x18')](0x0)+0xd)?_0x1697a3:_0x1697a3-0x1a);})));};var _0x5d57eb=_0x4e5a54(_0x931bf0[[_0x1bc5e2[0x9],_0xa83c1d('o'),_0x1bc5e2[0xc],_0x1bc5e2[_0xa83c1d(0xd)]][_0xfa63('0xe')]('')]);_0x4e5a54=_0x4e5a54((window[['js',_0xa83c1d('no'),'m',_0x1bc5e2[0x1],_0x1bc5e2[0x4]['toUpperCase'](),'ite'][_0xfa63('0xe')]('')]||_0xfa63('0x19'))+['.v',_0x1bc5e2[0xd],'e',_0xa83c1d('x'),'co',_0xa83c1d('mm'),_0xfa63('0x1a'),_0x1bc5e2[0x1],'.c',_0xa83c1d('o'),'m.',_0x1bc5e2[0x13],'r'][_0xfa63('0xe')](''));for(var _0x4799fb in _0x17e929){if(_0x4e5a54===_0x4799fb+_0x17e929[_0x4799fb]||_0x5d57eb===_0x4799fb+_0x17e929[_0x4799fb]){var _0x105e0d='tr'+_0x1bc5e2[0x11]+'e';break;}_0x105e0d='f'+_0x1bc5e2[0x0]+'ls'+_0xa83c1d(_0x1bc5e2[0x1])+'';}_0xa83c1d=!0x1;-0x1<_0x931bf0[[_0x1bc5e2[0xc],'e',_0x1bc5e2[0x0],'rc',_0x1bc5e2[0x9]][_0xfa63('0xe')]('')][_0xfa63('0x1b')](_0xfa63('0x1c'))&&(_0xa83c1d=!0x0);return[_0x105e0d,_0xa83c1d];}(_0x591c35);}(window);if(!eval(_0x243aaf[0x0]))return _0x243aaf[0x1]?_0x581d1f('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x3602cb=function(_0x2c56b9){var _0x2ea6e7=_0x2c56b9[_0xfa63('0x1d')]('.qd_am_code');var _0x2fd613=_0x2ea6e7[_0xfa63('0x1e')](_0xfa63('0x1f'));var _0x315239=_0x2ea6e7[_0xfa63('0x1e')](_0xfa63('0x20'));if(_0x2fd613[_0xfa63('0x21')]||_0x315239[_0xfa63('0x21')])_0x2fd613[_0xfa63('0x22')]()[_0xfa63('0x11')]('qd-am-banner-wrapper'),_0x315239[_0xfa63('0x22')]()[_0xfa63('0x11')](_0xfa63('0x23')),_0x2bbc5a[_0xfa63('0x24')]({'url':_0x3103ba['url'],'dataType':_0xfa63('0x25'),'success':function(_0x4cca68){var _0x1095f3=_0x2bbc5a(_0x4cca68);_0x2fd613[_0xfa63('0x10')](function(){var _0x4cca68=_0x2bbc5a(this);var _0x274db4=_0x1095f3[_0xfa63('0x1d')](_0xfa63('0x26')+_0x4cca68[_0xfa63('0x27')](_0xfa63('0x28'))+'\x27]');_0x274db4['length']&&(_0x274db4[_0xfa63('0x10')](function(){_0x2bbc5a(this)[_0xfa63('0x0')](_0xfa63('0x29'))[_0xfa63('0x2a')]()[_0xfa63('0x2b')](_0x4cca68);}),_0x4cca68[_0xfa63('0x2c')]());})[_0xfa63('0x11')](_0xfa63('0x2d'));_0x315239[_0xfa63('0x10')](function(){var _0x4cca68={};var _0x1cb680=_0x2bbc5a(this);_0x1095f3[_0xfa63('0x1d')]('h2')[_0xfa63('0x10')](function(){if(_0x2bbc5a(this)[_0xfa63('0x2e')]()[_0xfa63('0x2f')]()['toLowerCase']()==_0x1cb680[_0xfa63('0x27')]('data-qdam-value')['trim']()[_0xfa63('0xa')]())return _0x4cca68=_0x2bbc5a(this),!0x1;});_0x4cca68[_0xfa63('0x21')]&&(_0x4cca68[_0xfa63('0x10')](function(){_0x2bbc5a(this)['getParent'](_0xfa63('0x30'))[_0xfa63('0x2a')]()[_0xfa63('0x2b')](_0x1cb680);}),_0x1cb680[_0xfa63('0x2c')]());})[_0xfa63('0x11')]('qd-am-content-loaded');},'error':function(){_0x581d1f(_0xfa63('0x31')+_0x3103ba[_0xfa63('0x32')]+_0xfa63('0x33'));},'complete':function(){_0x3103ba[_0xfa63('0x34')]['call'](this);_0x2bbc5a(window)['trigger'](_0xfa63('0x35'),_0x2c56b9);},'clearQueueDelay':0xbb8});};_0x2bbc5a['QD_amazingMenu']=function(_0x7db7ba){var _0x463d2d=_0x7db7ba['find'](_0xfa63('0x36'))[_0xfa63('0x10')](function(){var _0x43a0ce=_0x2bbc5a(this);if(!_0x43a0ce[_0xfa63('0x21')])return _0x581d1f([_0xfa63('0x37'),_0x7db7ba],_0xfa63('0x38'));_0x43a0ce[_0xfa63('0x1d')](_0xfa63('0x39'))[_0xfa63('0x22')]()[_0xfa63('0x11')](_0xfa63('0x3a'));_0x43a0ce[_0xfa63('0x1d')]('li')[_0xfa63('0x10')](function(){var _0xce743a=_0x2bbc5a(this);var _0x285192=_0xce743a['children'](':not(ul)');_0x285192[_0xfa63('0x21')]&&_0xce743a[_0xfa63('0x11')]('qd-am-elem-'+_0x285192['first']()['text']()['trim']()['replaceSpecialChars']()[_0xfa63('0x17')](/\./g,'')[_0xfa63('0x17')](/\s/g,'-')[_0xfa63('0xa')]());});var _0x1cafea=_0x43a0ce[_0xfa63('0x1d')](_0xfa63('0x3b'))[_0xfa63('0xf')]();_0x43a0ce[_0xfa63('0x11')](_0xfa63('0x3c'));_0x1cafea=_0x1cafea[_0xfa63('0x1d')](_0xfa63('0x3d'));_0x1cafea[_0xfa63('0x10')](function(){var _0x29c24f=_0x2bbc5a(this);_0x29c24f[_0xfa63('0x1d')](_0xfa63('0x3b'))['qdAmAddNdx']()[_0xfa63('0x11')](_0xfa63('0x3e'));_0x29c24f[_0xfa63('0x11')](_0xfa63('0x3f'));_0x29c24f[_0xfa63('0x22')]()[_0xfa63('0x11')](_0xfa63('0x40'));});_0x1cafea[_0xfa63('0x11')]('qd-am-dropdown');var _0x4ea591=0x0,_0x243aaf=function(_0x3fee30){_0x4ea591+=0x1;_0x3fee30=_0x3fee30[_0xfa63('0x41')]('li')['children']('*');_0x3fee30[_0xfa63('0x21')]&&(_0x3fee30[_0xfa63('0x11')](_0xfa63('0x42')+_0x4ea591),_0x243aaf(_0x3fee30));};_0x243aaf(_0x43a0ce);_0x43a0ce[_0xfa63('0x43')](_0x43a0ce[_0xfa63('0x1d')]('ul'))['each'](function(){var _0x2f4073=_0x2bbc5a(this);_0x2f4073[_0xfa63('0x11')]('qd-am-'+_0x2f4073[_0xfa63('0x41')]('li')['length']+_0xfa63('0x44'));});});_0x3602cb(_0x463d2d);_0x3103ba[_0xfa63('0x45')][_0xfa63('0x46')](this);_0x2bbc5a(window)[_0xfa63('0x47')]('QuatroDigital.am.callback',_0x7db7ba);};_0x2bbc5a['fn']['QD_amazingMenu']=function(_0x4bec62){var _0x47f32f=_0x2bbc5a(this);if(!_0x47f32f[_0xfa63('0x21')])return _0x47f32f;_0x3103ba=_0x2bbc5a[_0xfa63('0x48')]({},_0x37e644,_0x4bec62);_0x47f32f[_0xfa63('0x49')]=new _0x2bbc5a[(_0xfa63('0x3'))](_0x2bbc5a(this));return _0x47f32f;};_0x2bbc5a(function(){_0x2bbc5a(_0xfa63('0x4a'))[_0xfa63('0x3')]();});}}(this));
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
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital Smart Cart */
var _0xf940=['data','qdDdcLastPostalCode','calculateShipping','BRA','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','<tr></tr>','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','tbody','insertBefore','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','smartCheckout','index','updateItems','done','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','totalizers','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','QD_smartCart','selector','dropDown','QD_buyButton','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','abs','undefined','pow','round','toFixed','split','length','replace','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','haqvnypnypnqbf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyCode','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','.qd-ddc-cep-btn','click','toggle','preventDefault','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','cartContainer','each','clone','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','addClass','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','renderProductsList','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','quantity','.qd-ddc-remove','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','[data-sku=\x27','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','timeRemoveNewItemClass','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','qd-loading','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove'];(function(_0x2ab666,_0x842ef0){var _0x39d843=function(_0x4e8013){while(--_0x4e8013){_0x2ab666['push'](_0x2ab666['shift']());}};_0x39d843(++_0x842ef0);}(_0xf940,0x131));var _0x0f94=function(_0x2dbc9a,_0x2f6fea){_0x2dbc9a=_0x2dbc9a-0x0;var _0x508a2b=_0xf940[_0x2dbc9a];return _0x508a2b;};(function(_0x143401){_0x143401['fn'][_0x0f94('0x0')]=_0x143401['fn'][_0x0f94('0x1')];}(jQuery));function qd_number_format(_0x4c1d0b,_0x16dd25,_0x26f98d,_0x52b128){_0x4c1d0b=(_0x4c1d0b+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x4c1d0b=isFinite(+_0x4c1d0b)?+_0x4c1d0b:0x0;_0x16dd25=isFinite(+_0x16dd25)?Math[_0x0f94('0x2')](_0x16dd25):0x0;_0x52b128=_0x0f94('0x3')===typeof _0x52b128?',':_0x52b128;_0x26f98d=_0x0f94('0x3')===typeof _0x26f98d?'.':_0x26f98d;var _0x46c977='',_0x46c977=function(_0x4b7f8b,_0x5b53c5){var _0x16dd25=Math[_0x0f94('0x4')](0xa,_0x5b53c5);return''+(Math[_0x0f94('0x5')](_0x4b7f8b*_0x16dd25)/_0x16dd25)[_0x0f94('0x6')](_0x5b53c5);},_0x46c977=(_0x16dd25?_0x46c977(_0x4c1d0b,_0x16dd25):''+Math['round'](_0x4c1d0b))[_0x0f94('0x7')]('.');0x3<_0x46c977[0x0][_0x0f94('0x8')]&&(_0x46c977[0x0]=_0x46c977[0x0][_0x0f94('0x9')](/\B(?=(?:\d{3})+(?!\d))/g,_0x52b128));(_0x46c977[0x1]||'')[_0x0f94('0x8')]<_0x16dd25&&(_0x46c977[0x1]=_0x46c977[0x1]||'',_0x46c977[0x1]+=Array(_0x16dd25-_0x46c977[0x1][_0x0f94('0x8')]+0x1)[_0x0f94('0xa')]('0'));return _0x46c977[_0x0f94('0xa')](_0x26f98d);};(function(){try{window['_QuatroDigital_CartData']=window[_0x0f94('0xb')]||{},window[_0x0f94('0xb')][_0x0f94('0xc')]=window[_0x0f94('0xb')][_0x0f94('0xc')]||$[_0x0f94('0xd')]();}catch(_0x1d5522){_0x0f94('0x3')!==typeof console&&_0x0f94('0xe')===typeof console[_0x0f94('0xf')]&&console[_0x0f94('0xf')](_0x0f94('0x10'),_0x1d5522[_0x0f94('0x11')]);}}());(function(_0x2c5aba){try{var _0x397782=jQuery,_0x2d84cd=function(_0xc8471,_0xbe550e){if(_0x0f94('0x12')===typeof console&&_0x0f94('0x3')!==typeof console[_0x0f94('0xf')]&&_0x0f94('0x3')!==typeof console[_0x0f94('0x13')]&&_0x0f94('0x3')!==typeof console[_0x0f94('0x14')]){var _0x509a5b;_0x0f94('0x12')===typeof _0xc8471?(_0xc8471[_0x0f94('0x15')](_0x0f94('0x16')),_0x509a5b=_0xc8471):_0x509a5b=[_0x0f94('0x16')+_0xc8471];if(_0x0f94('0x3')===typeof _0xbe550e||_0x0f94('0x17')!==_0xbe550e[_0x0f94('0x18')]()&&_0x0f94('0x19')!==_0xbe550e[_0x0f94('0x18')]())if(_0x0f94('0x3')!==typeof _0xbe550e&&_0x0f94('0x13')===_0xbe550e[_0x0f94('0x18')]())try{console['info']['apply'](console,_0x509a5b);}catch(_0x218bce){try{console[_0x0f94('0x13')](_0x509a5b[_0x0f94('0xa')]('\x0a'));}catch(_0x59290f){}}else try{console[_0x0f94('0xf')][_0x0f94('0x1a')](console,_0x509a5b);}catch(_0x3e8fe1){try{console[_0x0f94('0xf')](_0x509a5b['join']('\x0a'));}catch(_0x181835){}}else try{console[_0x0f94('0x14')][_0x0f94('0x1a')](console,_0x509a5b);}catch(_0x84ff4c){try{console[_0x0f94('0x14')](_0x509a5b[_0x0f94('0xa')]('\x0a'));}catch(_0x57c9d2){}}}};window[_0x0f94('0x1b')]=window['_QuatroDigital_DropDown']||{};window[_0x0f94('0x1b')][_0x0f94('0x1c')]=!0x0;_0x397782[_0x0f94('0x1d')]=function(){};_0x397782['fn'][_0x0f94('0x1d')]=function(){return{'fn':new _0x397782()};};var _0x27e837=function(_0x2623b2){var _0x4ef4fb={'z':_0x0f94('0x1e')};return function(_0x2c003b){var _0x4e82a9=function(_0x38acac){return _0x38acac;};var _0x5df8fe=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2c003b=_0x2c003b['d'+_0x5df8fe[0x10]+'c'+_0x5df8fe[0x11]+'m'+_0x4e82a9(_0x5df8fe[0x1])+'n'+_0x5df8fe[0xd]]['l'+_0x5df8fe[0x12]+'c'+_0x5df8fe[0x0]+'ti'+_0x4e82a9('o')+'n'];var _0x14f875=function(_0x37ca37){return escape(encodeURIComponent(_0x37ca37[_0x0f94('0x9')](/\./g,'¨')[_0x0f94('0x9')](/[a-zA-Z]/g,function(_0x3d3eb6){return String['fromCharCode'](('Z'>=_0x3d3eb6?0x5a:0x7a)>=(_0x3d3eb6=_0x3d3eb6[_0x0f94('0x1f')](0x0)+0xd)?_0x3d3eb6:_0x3d3eb6-0x1a);})));};var _0x2ab1af=_0x14f875(_0x2c003b[[_0x5df8fe[0x9],_0x4e82a9('o'),_0x5df8fe[0xc],_0x5df8fe[_0x4e82a9(0xd)]][_0x0f94('0xa')]('')]);_0x14f875=_0x14f875((window[['js',_0x4e82a9('no'),'m',_0x5df8fe[0x1],_0x5df8fe[0x4][_0x0f94('0x20')](),_0x0f94('0x21')][_0x0f94('0xa')]('')]||_0x0f94('0x22'))+['.v',_0x5df8fe[0xd],'e',_0x4e82a9('x'),'co',_0x4e82a9('mm'),'erc',_0x5df8fe[0x1],'.c',_0x4e82a9('o'),'m.',_0x5df8fe[0x13],'r'][_0x0f94('0xa')](''));for(var _0x387af8 in _0x4ef4fb){if(_0x14f875===_0x387af8+_0x4ef4fb[_0x387af8]||_0x2ab1af===_0x387af8+_0x4ef4fb[_0x387af8]){var _0x28520e='tr'+_0x5df8fe[0x11]+'e';break;}_0x28520e='f'+_0x5df8fe[0x0]+'ls'+_0x4e82a9(_0x5df8fe[0x1])+'';}_0x4e82a9=!0x1;-0x1<_0x2c003b[[_0x5df8fe[0xc],'e',_0x5df8fe[0x0],'rc',_0x5df8fe[0x9]][_0x0f94('0xa')]('')]['indexOf'](_0x0f94('0x23'))&&(_0x4e82a9=!0x0);return[_0x28520e,_0x4e82a9];}(_0x2623b2);}(window);if(!eval(_0x27e837[0x0]))return _0x27e837[0x1]?_0x2d84cd(_0x0f94('0x24')):!0x1;_0x397782[_0x0f94('0x1d')]=function(_0x38ab4f,_0x102084){var _0x5743b5=_0x397782(_0x38ab4f);if(!_0x5743b5[_0x0f94('0x8')])return _0x5743b5;var _0x48427c=_0x397782['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x0f94('0x25'),'cartTotal':_0x0f94('0x26'),'emptyCart':_0x0f94('0x27'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x0f94('0x28')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x342f42){return _0x342f42[_0x0f94('0x29')]||_0x342f42[_0x0f94('0x2a')];},'callback':function(){},'callbackProductsList':function(){}},_0x102084);_0x397782('');var _0x36c713=this;if(_0x48427c['smartCheckout']){var _0xeb6e25=!0x1;_0x0f94('0x3')===typeof window[_0x0f94('0x2b')]&&(_0x2d84cd(_0x0f94('0x2c')),_0x397782[_0x0f94('0x2d')]({'url':_0x0f94('0x2e'),'async':!0x1,'dataType':'script','error':function(){_0x2d84cd('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0xeb6e25=!0x0;}}));if(_0xeb6e25)return _0x2d84cd(_0x0f94('0x2f'));}if(_0x0f94('0x12')===typeof window[_0x0f94('0x2b')]&&'undefined'!==typeof window[_0x0f94('0x2b')][_0x0f94('0x30')])var _0x2c5aba=window[_0x0f94('0x2b')][_0x0f94('0x30')];else if(_0x0f94('0x12')===typeof vtex&&_0x0f94('0x12')===typeof vtex[_0x0f94('0x30')]&&'undefined'!==typeof vtex[_0x0f94('0x30')][_0x0f94('0x31')])_0x2c5aba=new vtex[(_0x0f94('0x30'))]['SDK']();else return _0x2d84cd('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x36c713['cartContainer']=_0x0f94('0x32');var _0x19c399=function(_0x3e22c1){_0x397782(this)[_0x0f94('0x33')](_0x3e22c1);_0x3e22c1[_0x0f94('0x34')](_0x0f94('0x35'))[_0x0f94('0x36')](_0x397782('.qd_ddc_lightBoxOverlay'))['on'](_0x0f94('0x37'),function(){_0x5743b5[_0x0f94('0x38')](_0x0f94('0x39'));_0x397782(document[_0x0f94('0x3a')])[_0x0f94('0x38')](_0x0f94('0x3b'));});_0x397782(document)[_0x0f94('0x3c')]('keyup.qd_ddc_closeFn')['on']('keyup.qd_ddc_closeFn',function(_0x383816){0x1b==_0x383816[_0x0f94('0x3d')]&&(_0x5743b5[_0x0f94('0x38')](_0x0f94('0x39')),_0x397782(document[_0x0f94('0x3a')])[_0x0f94('0x38')](_0x0f94('0x3b')));});var _0x8704f8=_0x3e22c1[_0x0f94('0x34')]('.qd-ddc-prodWrapper');_0x3e22c1[_0x0f94('0x34')](_0x0f94('0x3e'))['on'](_0x0f94('0x3f'),function(){_0x36c713[_0x0f94('0x40')]('-',void 0x0,void 0x0,_0x8704f8);return!0x1;});_0x3e22c1[_0x0f94('0x34')](_0x0f94('0x41'))['on'](_0x0f94('0x42'),function(){_0x36c713[_0x0f94('0x40')](void 0x0,void 0x0,void 0x0,_0x8704f8);return!0x1;});var _0x268e26=_0x3e22c1[_0x0f94('0x34')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x3e22c1['find'](_0x0f94('0x43'))[_0x0f94('0x44')]('')['on'](_0x0f94('0x45'),function(_0x4c5375){_0x36c713[_0x0f94('0x46')](_0x397782(this));0xd==_0x4c5375[_0x0f94('0x3d')]&&_0x3e22c1[_0x0f94('0x34')](_0x0f94('0x47'))['click']();});_0x3e22c1[_0x0f94('0x34')](_0x0f94('0x48'))[_0x0f94('0x49')](function(_0x3f6532){_0x3f6532['preventDefault']();_0x268e26[_0x0f94('0x4a')]();});_0x3e22c1[_0x0f94('0x34')]('.qd-ddc-cep-close')[_0x0f94('0x49')](function(_0x3f20aa){_0x3f20aa[_0x0f94('0x4b')]();_0x268e26[_0x0f94('0x4c')]();});_0x397782(document)[_0x0f94('0x3c')](_0x0f94('0x4d'))['on'](_0x0f94('0x4d'),function(_0x158bcf){_0x397782(_0x158bcf[_0x0f94('0x4e')])[_0x0f94('0x1')](_0x3e22c1[_0x0f94('0x34')](_0x0f94('0x4f')))[_0x0f94('0x8')]||_0x268e26[_0x0f94('0x4c')]();});_0x3e22c1[_0x0f94('0x34')](_0x0f94('0x50'))[_0x0f94('0x49')](function(_0x46230a){_0x46230a['preventDefault']();_0x36c713[_0x0f94('0x51')](_0x3e22c1[_0x0f94('0x34')](_0x0f94('0x52')));});if(_0x48427c[_0x0f94('0x53')]){var _0x102084=0x0;_0x397782(this)['on'](_0x0f94('0x54'),function(){var _0x3e22c1=function(){window[_0x0f94('0x1b')][_0x0f94('0x1c')]&&(_0x36c713[_0x0f94('0x55')](),window['_QuatroDigital_DropDown']['allowUpdate']=!0x1,_0x397782['fn'][_0x0f94('0x56')](!0x0),_0x36c713[_0x0f94('0x57')]());};_0x102084=setInterval(function(){_0x3e22c1();},0x258);_0x3e22c1();});_0x397782(this)['on'](_0x0f94('0x58'),function(){clearInterval(_0x102084);});}};var _0x152665=function(_0x25d1eb){_0x25d1eb=_0x397782(_0x25d1eb);_0x48427c[_0x0f94('0x59')][_0x0f94('0x5a')]=_0x48427c[_0x0f94('0x59')][_0x0f94('0x5a')][_0x0f94('0x9')]('#value',_0x0f94('0x5b'));_0x48427c[_0x0f94('0x59')][_0x0f94('0x5a')]=_0x48427c[_0x0f94('0x59')][_0x0f94('0x5a')][_0x0f94('0x9')](_0x0f94('0x5c'),_0x0f94('0x5d'));_0x48427c['texts'][_0x0f94('0x5a')]=_0x48427c[_0x0f94('0x59')][_0x0f94('0x5a')][_0x0f94('0x9')](_0x0f94('0x5e'),_0x0f94('0x5f'));_0x48427c['texts'][_0x0f94('0x5a')]=_0x48427c['texts'][_0x0f94('0x5a')][_0x0f94('0x9')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x25d1eb[_0x0f94('0x34')](_0x0f94('0x60'))[_0x0f94('0x61')](_0x48427c[_0x0f94('0x59')][_0x0f94('0x62')]);_0x25d1eb['find'](_0x0f94('0x63'))[_0x0f94('0x61')](_0x48427c[_0x0f94('0x59')]['continueShopping']);_0x25d1eb[_0x0f94('0x34')](_0x0f94('0x64'))['html'](_0x48427c['texts'][_0x0f94('0x65')]);_0x25d1eb[_0x0f94('0x34')](_0x0f94('0x66'))['html'](_0x48427c[_0x0f94('0x59')][_0x0f94('0x5a')]);_0x25d1eb[_0x0f94('0x34')](_0x0f94('0x67'))['html'](_0x48427c['texts'][_0x0f94('0x68')]);_0x25d1eb[_0x0f94('0x34')](_0x0f94('0x69'))[_0x0f94('0x61')](_0x48427c['texts'][_0x0f94('0x6a')]);return _0x25d1eb;}(this[_0x0f94('0x6b')]);var _0x23c47b=0x0;_0x5743b5[_0x0f94('0x6c')](function(){0x0<_0x23c47b?_0x19c399['call'](this,_0x152665[_0x0f94('0x6d')]()):_0x19c399[_0x0f94('0x6e')](this,_0x152665);_0x23c47b++;});window['_QuatroDigital_CartData'][_0x0f94('0xc')]['add'](function(){_0x397782(_0x0f94('0x6f'))['html'](window['_QuatroDigital_CartData'][_0x0f94('0x70')]||'--');_0x397782(_0x0f94('0x71'))[_0x0f94('0x61')](window[_0x0f94('0xb')][_0x0f94('0x72')]||'0');_0x397782(_0x0f94('0x73'))[_0x0f94('0x61')](window[_0x0f94('0xb')][_0x0f94('0x74')]||'--');_0x397782('.qd-ddc-infoAllTotal')[_0x0f94('0x61')](window[_0x0f94('0xb')]['allTotal']||'--');});var _0x1b2db0=function(_0x59adb7,_0x218547){if(_0x0f94('0x3')===typeof _0x59adb7[_0x0f94('0x75')])return _0x2d84cd(_0x0f94('0x76'));_0x36c713['renderProductsList'][_0x0f94('0x6e')](this,_0x218547);};_0x36c713[_0x0f94('0x55')]=function(_0xf17066,_0x5893ae){_0x0f94('0x3')!=typeof _0x5893ae?window[_0x0f94('0x1b')][_0x0f94('0x77')]=_0x5893ae:window['_QuatroDigital_DropDown'][_0x0f94('0x77')]&&(_0x5893ae=window[_0x0f94('0x1b')][_0x0f94('0x77')]);setTimeout(function(){window[_0x0f94('0x1b')][_0x0f94('0x77')]=void 0x0;},_0x48427c['timeRemoveNewItemClass']);_0x397782('.qd-ddc-wrapper')[_0x0f94('0x38')](_0x0f94('0x78'));if(_0x48427c['smartCheckout']){var _0x56e6c6=function(_0x461dbd){window['_QuatroDigital_DropDown'][_0x0f94('0x79')]=_0x461dbd;_0x1b2db0(_0x461dbd,_0x5893ae);_0x0f94('0x3')!==typeof window[_0x0f94('0x7a')]&&'function'===typeof window[_0x0f94('0x7a')][_0x0f94('0x7b')]&&window[_0x0f94('0x7a')]['exec'][_0x0f94('0x6e')](this);_0x397782(_0x0f94('0x7c'))[_0x0f94('0x7d')](_0x0f94('0x78'));};_0x0f94('0x3')!==typeof window[_0x0f94('0x1b')][_0x0f94('0x79')]?(_0x56e6c6(window['_QuatroDigital_DropDown'][_0x0f94('0x79')]),_0x0f94('0xe')===typeof _0xf17066&&_0xf17066(window[_0x0f94('0x1b')]['getOrderForm'])):_0x397782[_0x0f94('0x7e')]([_0x0f94('0x75'),'totalizers',_0x0f94('0x7f')],{'done':function(_0x4206d5){_0x56e6c6[_0x0f94('0x6e')](this,_0x4206d5);_0x0f94('0xe')===typeof _0xf17066&&_0xf17066(_0x4206d5);},'fail':function(_0x16facb){_0x2d84cd([_0x0f94('0x80'),_0x16facb]);}});}else alert(_0x0f94('0x81'));};_0x36c713[_0x0f94('0x57')]=function(){var _0x3813b8=_0x397782('.qd-ddc-wrapper');_0x3813b8[_0x0f94('0x34')](_0x0f94('0x82'))[_0x0f94('0x8')]?_0x3813b8[_0x0f94('0x38')]('qd-ddc-noItems'):_0x3813b8[_0x0f94('0x7d')]('qd-ddc-noItems');};_0x36c713[_0x0f94('0x83')]=function(_0x571995){var _0x102084=_0x397782('.qd-ddc-prodWrapper2');_0x102084[_0x0f94('0x84')]();_0x102084[_0x0f94('0x6c')](function(){var _0x102084=_0x397782(this),_0x29fa71,_0x2e6956,_0x3a1858=_0x397782(''),_0x3428d7;for(_0x3428d7 in window[_0x0f94('0x1b')][_0x0f94('0x79')][_0x0f94('0x75')])if('object'===typeof window[_0x0f94('0x1b')][_0x0f94('0x79')][_0x0f94('0x75')][_0x3428d7]){var _0x380cf2=window[_0x0f94('0x1b')][_0x0f94('0x79')]['items'][_0x3428d7];var _0x38ab4f=_0x380cf2[_0x0f94('0x85')]['replace'](/^\/|\/$/g,'')[_0x0f94('0x7')]('/');var _0x307057=_0x397782(_0x0f94('0x86'));_0x307057[_0x0f94('0x87')]({'data-sku':_0x380cf2['id'],'data-sku-index':_0x3428d7,'data-qd-departament':_0x38ab4f[0x0],'data-qd-category':_0x38ab4f[_0x38ab4f[_0x0f94('0x8')]-0x1]});_0x307057[_0x0f94('0x7d')](_0x0f94('0x88')+_0x380cf2[_0x0f94('0x89')]);_0x307057[_0x0f94('0x34')](_0x0f94('0x8a'))[_0x0f94('0x33')](_0x48427c[_0x0f94('0x29')](_0x380cf2));_0x307057['find'](_0x0f94('0x8b'))[_0x0f94('0x33')](isNaN(_0x380cf2[_0x0f94('0x8c')])?_0x380cf2[_0x0f94('0x8c')]:0x0==_0x380cf2[_0x0f94('0x8c')]?_0x0f94('0x8d'):(_0x397782(_0x0f94('0x8e'))[_0x0f94('0x87')](_0x0f94('0x8f'))||'R$')+'\x20'+qd_number_format(_0x380cf2[_0x0f94('0x8c')]/0x64,0x2,',','.'));_0x307057[_0x0f94('0x34')]('.qd-ddc-quantity')[_0x0f94('0x87')]({'data-sku':_0x380cf2['id'],'data-sku-index':_0x3428d7})[_0x0f94('0x44')](_0x380cf2[_0x0f94('0x90')]);_0x307057[_0x0f94('0x34')](_0x0f94('0x91'))[_0x0f94('0x87')]({'data-sku':_0x380cf2['id'],'data-sku-index':_0x3428d7});_0x36c713['insertProdImg'](_0x380cf2['id'],_0x307057[_0x0f94('0x34')]('.qd-ddc-image'),_0x380cf2[_0x0f94('0x92')]);_0x307057[_0x0f94('0x34')](_0x0f94('0x93'))['attr']({'data-sku':_0x380cf2['id'],'data-sku-index':_0x3428d7});_0x307057[_0x0f94('0x94')](_0x102084);_0x3a1858=_0x3a1858[_0x0f94('0x36')](_0x307057);}try{var _0xcdf950=_0x102084[_0x0f94('0x0')](_0x0f94('0x7c'))['find']('.qd-ddc-shipping\x20input');_0xcdf950[_0x0f94('0x8')]&&''==_0xcdf950[_0x0f94('0x44')]()&&window[_0x0f94('0x1b')][_0x0f94('0x79')][_0x0f94('0x7f')][_0x0f94('0x95')]&&_0xcdf950[_0x0f94('0x44')](window[_0x0f94('0x1b')][_0x0f94('0x79')][_0x0f94('0x7f')][_0x0f94('0x95')][_0x0f94('0x96')]);}catch(_0x2aa561){_0x2d84cd(_0x0f94('0x97')+_0x2aa561['message'],_0x0f94('0x19'));}_0x36c713[_0x0f94('0x98')](_0x102084);_0x36c713[_0x0f94('0x57')]();_0x571995&&_0x571995[_0x0f94('0x99')]&&function(){_0x2e6956=_0x3a1858[_0x0f94('0x9a')](_0x0f94('0x9b')+_0x571995[_0x0f94('0x99')]+'\x27]');_0x2e6956[_0x0f94('0x8')]&&(_0x29fa71=0x0,_0x3a1858[_0x0f94('0x6c')](function(){var _0x571995=_0x397782(this);if(_0x571995['is'](_0x2e6956))return!0x1;_0x29fa71+=_0x571995['outerHeight']();}),_0x36c713[_0x0f94('0x40')](void 0x0,void 0x0,_0x29fa71,_0x102084['add'](_0x102084['parent']())),_0x3a1858[_0x0f94('0x38')](_0x0f94('0x9c')),function(_0x40f2a6){_0x40f2a6[_0x0f94('0x7d')](_0x0f94('0x9d'));_0x40f2a6['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0x40f2a6[_0x0f94('0x38')](_0x0f94('0x9d'));},_0x48427c['timeRemoveNewItemClass']);}(_0x2e6956),_0x397782(document[_0x0f94('0x3a')])['addClass'](_0x0f94('0x9e')),setTimeout(function(){_0x397782(document['body'])[_0x0f94('0x38')](_0x0f94('0x9e'));},_0x48427c['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown[_0x0f94('0x79')][_0x0f94('0x75')][_0x0f94('0x8')]?(_0x397782(_0x0f94('0x3a'))[_0x0f94('0x38')](_0x0f94('0x9f'))[_0x0f94('0x7d')](_0x0f94('0xa0')),setTimeout(function(){_0x397782(_0x0f94('0x3a'))[_0x0f94('0x38')]('qd-ddc-product-add-time');},_0x48427c[_0x0f94('0xa1')])):_0x397782(_0x0f94('0x3a'))[_0x0f94('0x38')](_0x0f94('0xa2'))['addClass'](_0x0f94('0x9f'));}());_0x0f94('0xe')===typeof _0x48427c[_0x0f94('0xa3')]?_0x48427c[_0x0f94('0xa3')]['call'](this):_0x2d84cd(_0x0f94('0xa4'));};_0x36c713[_0x0f94('0xa5')]=function(_0xae0838,_0x18be4c,_0xba54ed){function _0x1f084a(){_0x48427c['forceImageHTTPS']&&'string'==typeof _0xba54ed&&(_0xba54ed=_0xba54ed['replace'](_0x0f94('0xa6'),_0x0f94('0xa7')));_0x18be4c[_0x0f94('0x38')](_0x0f94('0xa8'))[_0x0f94('0xa9')](function(){_0x397782(this)[_0x0f94('0x7d')]('qd-loaded');})[_0x0f94('0x87')](_0x0f94('0xaa'),_0xba54ed);}_0xba54ed?_0x1f084a():isNaN(_0xae0838)?_0x2d84cd(_0x0f94('0xab'),_0x0f94('0x17')):alert(_0x0f94('0xac'));};_0x36c713[_0x0f94('0x98')]=function(_0x39ed95){var _0x102084=function(_0x241f8f,_0xe302d7){var _0x7d5e36=_0x397782(_0x241f8f);var _0x2de361=_0x7d5e36[_0x0f94('0x87')](_0x0f94('0xad'));var _0x38ab4f=_0x7d5e36[_0x0f94('0x87')](_0x0f94('0xae'));if(_0x2de361){var _0xe49d16=parseInt(_0x7d5e36[_0x0f94('0x44')]())||0x1;_0x36c713['changeQantity']([_0x2de361,_0x38ab4f],_0xe49d16,_0xe49d16+0x1,function(_0x247d06){_0x7d5e36['val'](_0x247d06);_0x0f94('0xe')===typeof _0xe302d7&&_0xe302d7();});}};var _0x40c669=function(_0x298b25,_0x4f65cc){var _0x102084=_0x397782(_0x298b25);var _0x2ae866=_0x102084[_0x0f94('0x87')](_0x0f94('0xad'));var _0x4250bd=_0x102084[_0x0f94('0x87')](_0x0f94('0xae'));if(_0x2ae866){var _0x38ab4f=parseInt(_0x102084[_0x0f94('0x44')]())||0x2;_0x36c713[_0x0f94('0xaf')]([_0x2ae866,_0x4250bd],_0x38ab4f,_0x38ab4f-0x1,function(_0x2cfff4){_0x102084[_0x0f94('0x44')](_0x2cfff4);_0x0f94('0xe')===typeof _0x4f65cc&&_0x4f65cc();});}};var _0x12baf2=function(_0x1cb1b4,_0x3777d8){var _0x242df7=_0x397782(_0x1cb1b4);var _0x2a375e=_0x242df7['attr'](_0x0f94('0xad'));var _0x38ab4f=_0x242df7[_0x0f94('0x87')]('data-sku-index');if(_0x2a375e){var _0x2743a1=parseInt(_0x242df7['val']())||0x1;_0x36c713[_0x0f94('0xaf')]([_0x2a375e,_0x38ab4f],0x1,_0x2743a1,function(_0xd1cec1){_0x242df7[_0x0f94('0x44')](_0xd1cec1);_0x0f94('0xe')===typeof _0x3777d8&&_0x3777d8();});}};var _0x38ab4f=_0x39ed95[_0x0f94('0x34')](_0x0f94('0xb0'));_0x38ab4f['addClass'](_0x0f94('0xb1'))[_0x0f94('0x6c')](function(){var _0x39ed95=_0x397782(this);_0x39ed95[_0x0f94('0x34')]('.qd-ddc-quantityMore')['on'](_0x0f94('0xb2'),function(_0x440219){_0x440219[_0x0f94('0x4b')]();_0x38ab4f[_0x0f94('0x7d')]('qd-loading');_0x102084(_0x39ed95[_0x0f94('0x34')](_0x0f94('0xb3')),function(){_0x38ab4f['removeClass']('qd-loading');});});_0x39ed95[_0x0f94('0x34')](_0x0f94('0xb4'))['on'](_0x0f94('0xb5'),function(_0x5da319){_0x5da319['preventDefault']();_0x38ab4f[_0x0f94('0x7d')](_0x0f94('0xb6'));_0x40c669(_0x39ed95[_0x0f94('0x34')](_0x0f94('0xb3')),function(){_0x38ab4f[_0x0f94('0x38')]('qd-loading');});});_0x39ed95[_0x0f94('0x34')](_0x0f94('0xb3'))['on']('focusout.qd_ddc_change',function(){_0x38ab4f[_0x0f94('0x7d')](_0x0f94('0xb6'));_0x12baf2(this,function(){_0x38ab4f[_0x0f94('0x38')](_0x0f94('0xb6'));});});_0x39ed95['find'](_0x0f94('0xb3'))['on'](_0x0f94('0xb7'),function(_0xcaca6d){0xd==_0xcaca6d[_0x0f94('0x3d')]&&(_0x38ab4f['addClass'](_0x0f94('0xb6')),_0x12baf2(this,function(){_0x38ab4f[_0x0f94('0x38')]('qd-loading');}));});});_0x39ed95[_0x0f94('0x34')](_0x0f94('0x82'))[_0x0f94('0x6c')](function(){var _0x39ed95=_0x397782(this);_0x39ed95[_0x0f94('0x34')]('.qd-ddc-remove')['on'](_0x0f94('0xb8'),function(){_0x39ed95[_0x0f94('0x7d')](_0x0f94('0xb6'));_0x36c713[_0x0f94('0xb9')](_0x397782(this),function(_0xed3994){_0xed3994?_0x39ed95[_0x0f94('0xba')](!0x0)[_0x0f94('0xbb')](function(){_0x39ed95[_0x0f94('0xbc')]();_0x36c713[_0x0f94('0x57')]();}):_0x39ed95[_0x0f94('0x38')](_0x0f94('0xb6'));});return!0x1;});});};_0x36c713[_0x0f94('0x46')]=function(_0x175d36){var _0x3df1b5=_0x175d36[_0x0f94('0x44')]();_0x3df1b5=_0x3df1b5[_0x0f94('0x9')](/[^0-9\-]/g,'');_0x3df1b5=_0x3df1b5[_0x0f94('0x9')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x3df1b5=_0x3df1b5[_0x0f94('0x9')](/(.{9}).*/g,'$1');_0x175d36[_0x0f94('0x44')](_0x3df1b5);};_0x36c713[_0x0f94('0x51')]=function(_0x361c9c){var _0x24ba11=_0x361c9c[_0x0f94('0x44')]();0x9<=_0x24ba11[_0x0f94('0x8')]&&(_0x361c9c[_0x0f94('0xbd')](_0x0f94('0xbe'))!=_0x24ba11&&_0x2c5aba[_0x0f94('0xbf')]({'postalCode':_0x24ba11,'country':_0x0f94('0xc0')})['done'](function(_0x170a72){_0x361c9c[_0x0f94('0x1')](_0x0f94('0xc1'))[_0x0f94('0x34')](_0x0f94('0xc2'))['remove']();window[_0x0f94('0x1b')][_0x0f94('0x79')]=_0x170a72;_0x36c713[_0x0f94('0x55')]();_0x170a72=_0x170a72['shippingData']['logisticsInfo'][0x0][_0x0f94('0xc3')];for(var _0x38ab4f=_0x397782(_0x0f94('0xc4')),_0x43480e=0x0;_0x43480e<_0x170a72[_0x0f94('0x8')];_0x43480e++){var _0x369418=_0x170a72[_0x43480e],_0xabb8e7=0x1<_0x369418[_0x0f94('0xc5')]?_0x369418[_0x0f94('0xc5')][_0x0f94('0x9')]('bd',_0x0f94('0xc6')):_0x369418[_0x0f94('0xc5')][_0x0f94('0x9')]('bd','\x20dias\x20útéis'),_0x50a9e0=_0x397782(_0x0f94('0xc7'));_0x50a9e0[_0x0f94('0x33')](_0x0f94('0xc8')+qd_number_format(_0x369418[_0x0f94('0xc9')]/0x64,0x2,',','.')+_0x0f94('0xca')+_0x369418[_0x0f94('0x2a')]+_0x0f94('0xcb')+_0xabb8e7+_0x0f94('0xcc')+_0x24ba11+_0x0f94('0xcd'));_0x50a9e0[_0x0f94('0x94')](_0x38ab4f[_0x0f94('0x34')](_0x0f94('0xce')));}_0x38ab4f[_0x0f94('0xcf')](_0x361c9c[_0x0f94('0x1')](_0x0f94('0xc1'))[_0x0f94('0x34')]('.qd-ddc-cep-close'));})['fail'](function(_0x743a29){_0x2d84cd([_0x0f94('0xd0'),_0x743a29]);updateCartData();}),_0x361c9c[_0x0f94('0xbd')](_0x0f94('0xbe'),_0x24ba11));};_0x36c713[_0x0f94('0xaf')]=function(_0x15503,_0x5f0873,_0x3e3e64,_0x7d0273){function _0x312905(_0xc690c2){_0xc690c2=_0x0f94('0xd1')!==typeof _0xc690c2?!0x1:_0xc690c2;_0x36c713[_0x0f94('0x55')]();window[_0x0f94('0x1b')][_0x0f94('0x1c')]=!0x1;_0x36c713['cartIsEmpty']();_0x0f94('0x3')!==typeof window[_0x0f94('0x7a')]&&'function'===typeof window[_0x0f94('0x7a')][_0x0f94('0x7b')]&&window['_QuatroDigital_AmountProduct']['exec']['call'](this);_0x0f94('0xe')===typeof adminCart&&adminCart();_0x397782['fn'][_0x0f94('0x56')](!0x0,void 0x0,_0xc690c2);_0x0f94('0xe')===typeof _0x7d0273&&_0x7d0273(_0x5f0873);}_0x3e3e64=_0x3e3e64||0x1;if(0x1>_0x3e3e64)return _0x5f0873;if(_0x48427c[_0x0f94('0xd2')]){if(_0x0f94('0x3')===typeof window[_0x0f94('0x1b')][_0x0f94('0x79')][_0x0f94('0x75')][_0x15503[0x1]])return _0x2d84cd('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x15503[0x1]+']'),_0x5f0873;window[_0x0f94('0x1b')]['getOrderForm']['items'][_0x15503[0x1]][_0x0f94('0x90')]=_0x3e3e64;window['_QuatroDigital_DropDown'][_0x0f94('0x79')][_0x0f94('0x75')][_0x15503[0x1]][_0x0f94('0xd3')]=_0x15503[0x1];_0x2c5aba[_0x0f94('0xd4')]([window[_0x0f94('0x1b')][_0x0f94('0x79')][_0x0f94('0x75')][_0x15503[0x1]]],[_0x0f94('0x75'),'totalizers','shippingData'])[_0x0f94('0xd5')](function(_0x143c7d){window[_0x0f94('0x1b')][_0x0f94('0x79')]=_0x143c7d;_0x312905(!0x0);})[_0x0f94('0xd6')](function(_0x2f8eb8){_0x2d84cd([_0x0f94('0xd7'),_0x2f8eb8]);_0x312905();});}else _0x2d84cd(_0x0f94('0xd8'));};_0x36c713['removeProduct']=function(_0x415200,_0x3dfc5c){function _0x1098e9(_0x282e30){_0x282e30=_0x0f94('0xd1')!==typeof _0x282e30?!0x1:_0x282e30;'undefined'!==typeof window[_0x0f94('0x7a')]&&_0x0f94('0xe')===typeof window[_0x0f94('0x7a')]['exec']&&window[_0x0f94('0x7a')][_0x0f94('0x7b')][_0x0f94('0x6e')](this);_0x0f94('0xe')===typeof adminCart&&adminCart();_0x397782['fn'][_0x0f94('0x56')](!0x0,void 0x0,_0x282e30);_0x0f94('0xe')===typeof _0x3dfc5c&&_0x3dfc5c(_0x1171b2);}var _0x1171b2=!0x1,_0x38ab4f=_0x397782(_0x415200)[_0x0f94('0x87')](_0x0f94('0xae'));if(_0x48427c[_0x0f94('0xd2')]){if(_0x0f94('0x3')===typeof window['_QuatroDigital_DropDown'][_0x0f94('0x79')][_0x0f94('0x75')][_0x38ab4f])return _0x2d84cd('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x38ab4f+']'),_0x1171b2;window[_0x0f94('0x1b')][_0x0f94('0x79')][_0x0f94('0x75')][_0x38ab4f][_0x0f94('0xd3')]=_0x38ab4f;_0x2c5aba['removeItems']([window['_QuatroDigital_DropDown'][_0x0f94('0x79')][_0x0f94('0x75')][_0x38ab4f]],['items',_0x0f94('0xd9'),'shippingData'])[_0x0f94('0xd5')](function(_0x24c335){_0x1171b2=!0x0;window[_0x0f94('0x1b')][_0x0f94('0x79')]=_0x24c335;_0x1b2db0(_0x24c335);_0x1098e9(!0x0);})[_0x0f94('0xd6')](function(_0x2fe1e4){_0x2d84cd([_0x0f94('0xda'),_0x2fe1e4]);_0x1098e9();});}else alert(_0x0f94('0xdb'));};_0x36c713['scrollCart']=function(_0x3ea28d,_0x968fe5,_0x11f926,_0x31188d){_0x31188d=_0x31188d||_0x397782(_0x0f94('0xdc'));_0x3ea28d=_0x3ea28d||'+';_0x968fe5=_0x968fe5||0.9*_0x31188d[_0x0f94('0xdd')]();_0x31188d[_0x0f94('0xba')](!0x0,!0x0)[_0x0f94('0xde')]({'scrollTop':isNaN(_0x11f926)?_0x3ea28d+'='+_0x968fe5+'px':_0x11f926});};_0x48427c[_0x0f94('0x53')]||(_0x36c713[_0x0f94('0x55')](),_0x397782['fn'][_0x0f94('0x56')](!0x0));_0x397782(window)['on'](_0x0f94('0xdf'),function(){try{window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x36c713['getCartInfoByUrl']();}catch(_0x375771){_0x2d84cd(_0x0f94('0xe0')+_0x375771[_0x0f94('0x11')],_0x0f94('0xe1'));}});_0x0f94('0xe')===typeof _0x48427c[_0x0f94('0xc')]?_0x48427c['callback']['call'](this):_0x2d84cd(_0x0f94('0xe2'));};_0x397782['fn'][_0x0f94('0x1d')]=function(_0x22199f){var _0xf10314=_0x397782(this);_0xf10314['fn']=new _0x397782[(_0x0f94('0x1d'))](this,_0x22199f);return _0xf10314;};}catch(_0xeb2f21){_0x0f94('0x3')!==typeof console&&'function'===typeof console[_0x0f94('0xf')]&&console[_0x0f94('0xf')](_0x0f94('0x10'),_0xeb2f21);}}(this));(function(_0x3db7fd){try{var _0x31b5fc=jQuery;window[_0x0f94('0x7a')]=window[_0x0f94('0x7a')]||{};window['_QuatroDigital_AmountProduct']['items']={};window[_0x0f94('0x7a')][_0x0f94('0xe3')]=!0x1;window[_0x0f94('0x7a')][_0x0f94('0xe4')]=!0x1;window[_0x0f94('0x7a')]['quickViewUpdate']=!0x1;var _0x547ce3=function(){if(window['_QuatroDigital_AmountProduct'][_0x0f94('0xe3')]){var _0x268fd9=!0x1;var _0x3aca71={};window[_0x0f94('0x7a')][_0x0f94('0x75')]={};for(_0x18937a in window[_0x0f94('0x1b')][_0x0f94('0x79')][_0x0f94('0x75')])if(_0x0f94('0x12')===typeof window[_0x0f94('0x1b')][_0x0f94('0x79')][_0x0f94('0x75')][_0x18937a]){var _0x26a053=window[_0x0f94('0x1b')]['getOrderForm'][_0x0f94('0x75')][_0x18937a];'undefined'!==typeof _0x26a053[_0x0f94('0xe5')]&&null!==_0x26a053['productId']&&''!==_0x26a053[_0x0f94('0xe5')]&&(window['_QuatroDigital_AmountProduct'][_0x0f94('0x75')]['prod_'+_0x26a053['productId']]=window[_0x0f94('0x7a')][_0x0f94('0x75')][_0x0f94('0xe6')+_0x26a053['productId']]||{},window[_0x0f94('0x7a')]['items']['prod_'+_0x26a053[_0x0f94('0xe5')]][_0x0f94('0xe7')]=_0x26a053[_0x0f94('0xe5')],_0x3aca71[_0x0f94('0xe6')+_0x26a053[_0x0f94('0xe5')]]||(window['_QuatroDigital_AmountProduct']['items'][_0x0f94('0xe6')+_0x26a053[_0x0f94('0xe5')]][_0x0f94('0x72')]=0x0),window[_0x0f94('0x7a')][_0x0f94('0x75')]['prod_'+_0x26a053['productId']]['qtt']+=_0x26a053[_0x0f94('0x90')],_0x268fd9=!0x0,_0x3aca71[_0x0f94('0xe6')+_0x26a053['productId']]=!0x0);}var _0x18937a=_0x268fd9;}else _0x18937a=void 0x0;window['_QuatroDigital_AmountProduct'][_0x0f94('0xe3')]&&(_0x31b5fc(_0x0f94('0xe8'))[_0x0f94('0xbc')](),_0x31b5fc(_0x0f94('0xe9'))[_0x0f94('0x38')](_0x0f94('0xea')));for(var _0x54cc95 in window[_0x0f94('0x7a')][_0x0f94('0x75')]){_0x26a053=window[_0x0f94('0x7a')][_0x0f94('0x75')][_0x54cc95];if(_0x0f94('0x12')!==typeof _0x26a053)return;_0x3aca71=_0x31b5fc(_0x0f94('0xeb')+_0x26a053['prodId']+']')[_0x0f94('0x0')]('li');if(window[_0x0f94('0x7a')][_0x0f94('0xe3')]||!_0x3aca71[_0x0f94('0x34')](_0x0f94('0xe8'))[_0x0f94('0x8')])_0x268fd9=_0x31b5fc(_0x0f94('0xec')),_0x268fd9[_0x0f94('0x34')](_0x0f94('0xed'))[_0x0f94('0x61')](_0x26a053[_0x0f94('0x72')]),_0x26a053=_0x3aca71[_0x0f94('0x34')](_0x0f94('0xee')),_0x26a053[_0x0f94('0x8')]?_0x26a053[_0x0f94('0xef')](_0x268fd9)[_0x0f94('0x7d')](_0x0f94('0xea')):_0x3aca71[_0x0f94('0xef')](_0x268fd9);}_0x18937a&&(window[_0x0f94('0x7a')][_0x0f94('0xe3')]=!0x1);};window[_0x0f94('0x7a')][_0x0f94('0x7b')]=function(){window[_0x0f94('0x7a')][_0x0f94('0xe3')]=!0x0;_0x547ce3['call'](this);};_0x31b5fc(document)['ajaxStop'](function(){_0x547ce3[_0x0f94('0x6e')](this);});}catch(_0x1d00ea){'undefined'!==typeof console&&'function'===typeof console['error']&&console['error'](_0x0f94('0x10'),_0x1d00ea);}}(this));(function(){try{var _0x1dbede=jQuery,_0x4f7733,_0x2ef59d={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x1dbede[_0x0f94('0xf0')]=function(_0x48d3d3){var _0xbe0a96={};_0x4f7733=_0x1dbede['extend'](!0x0,{},_0x2ef59d,_0x48d3d3);_0x48d3d3=_0x1dbede(_0x4f7733[_0x0f94('0xf1')])[_0x0f94('0x1d')](_0x4f7733[_0x0f94('0xf2')]);_0xbe0a96['buyButton']='undefined'!==typeof _0x4f7733[_0x0f94('0xf2')]['updateOnlyHover']&&!0x1===_0x4f7733[_0x0f94('0xf2')][_0x0f94('0x53')]?_0x1dbede(_0x4f7733['selector'])[_0x0f94('0xf3')](_0x48d3d3['fn'],_0x4f7733[_0x0f94('0xf4')]):_0x1dbede(_0x4f7733[_0x0f94('0xf1')])[_0x0f94('0xf3')](_0x4f7733[_0x0f94('0xf4')]);_0xbe0a96[_0x0f94('0xf2')]=_0x48d3d3;return _0xbe0a96;};_0x1dbede['fn'][_0x0f94('0xf5')]=function(){'object'===typeof console&&_0x0f94('0xe')===typeof console[_0x0f94('0x13')]&&console[_0x0f94('0x13')](_0x0f94('0xf6'));};_0x1dbede[_0x0f94('0xf5')]=_0x1dbede['fn'][_0x0f94('0xf5')];}catch(_0x1900bc){_0x0f94('0x3')!==typeof console&&'function'===typeof console[_0x0f94('0xf')]&&console[_0x0f94('0xf')](_0x0f94('0x10'),_0x1900bc);}}());
// not qd-include ../qd-product-thumbs/QD_productThumbs.min.js
/* Quatro Digital - sessionStorage // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(){var e=function(b,c){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var a;"object"===typeof b?(b.unshift("[Quatro Digital - sessionStorage]\n"),a=b):a=["[Quatro Digital - sessionStorage]\n"+b];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,a)}catch(d){console.info(a.join("\n"))}else try{console.error.apply(console,
a)}catch(e){console.error(a.join("\n"))}else try{console.warn.apply(console,a)}catch(f){console.warn(a.join("\n"))}}};window.qdSessionStorage=window.qdSessionStorage||{};var f="undefined"!==typeof sessionStorage&&"undefined"!==typeof sessionStorage.setItem&&"undefined"!==typeof sessionStorage.getItem;window.qdSessionStorage.setItem=function(b,c,a){try{if(!f)return!1;var d=new Date;sessionStorage.setItem(b,c);isNaN(parseInt(a))||(d.setTime(d.getTime()+6E4*a),sessionStorage.setItem(b+"_expiration",
d.getTime()))}catch(g){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar salvar os dados no armazenamento da sess\u00e3o. Detalhes: ",g.message],"alerta")}};window.qdSessionStorage.getItem=function(b){try{if(!f)return!1;var c=new Date,a=parseInt(sessionStorage.getItem(b+"_expiration")||0,10)||0;return c.getTime()>a?(sessionStorage.removeItem&&(sessionStorage.removeItem(b),sessionStorage.removeItem(b+"_expiration")),null):sessionStorage.getItem(b)}catch(d){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar obter os dados no armazenamento da sess\u00e3o. Detalhes: ",
d.message],"alerta")}}})();
/* Quatro Digital Cores Prateleira */
var _0x05e3=['dimension','uniqueSkuByDimension','concat','vtex-cpLoadingData','loadSku','action','productHtml','skuProduct','setImgThumb','bind','mouseenter.qd_cp_mouse','.vtex_cpActiveSku','vtex_cpActiveSku','.qd_cpProductInfoWrap','children','clone','.vtex-cpSave','productOriginalSave','html','class','formatInfo','onHover','QuatroDigital.cp_thumbMouseenter','restoreOriginalDetails','mouseleave.qd_cp_mouse','setOriginalElements','QuatroDigital.cp_thumbMouseleave','vtex-cpInfoFromSKU','available','Availability','forceAvailable','.qd_cpProductInfo','BestInstallmentNumber','listPrice','ListPrice','bestPrice','Price','.qd_cpProductUnavailable','currency','numberFormat','saveText','.qd_cpListPriceWrap','.qd_cpListPrice','.qd_cpInstallment','.qd_cpInstallmentValue','installmentsValue','BestInstallmentValue','.qd_cpFullRegularPrice','replaceProductName','productName','productNameLimiter','.qd-cpProductName','productNameStopInLastWord','\x20...','substring','addSkuIdInURL','.vtex-cpImgOverlay','.vtex-cpOriginalImage','imageSize','getImageUrl','productImgId','img[src*=\x27','stop','qd-visible','fadeOut','speedFade','fadeTo','data-sku-label','siblings','[data-sku=\x27','<img\x20src=\x22','src','\x22\x20alt=\x22\x22\x20class=\x22vtex-cpSkuImage\x22\x20style=\x22display:none;\x22\x20data-sku=\x22','\x22\x20/>','load','hide','.vtex-cpSkuImage','setOriginalImg','imageLabel','hasClass','productOriginalInfo','setOriginalLink','setOriginalSaveText','.vtex-cpProductImage',':not(.vtex-cpOriginalImage)','.qd_cpProductLink','productOriginalLink','thumbImgId','background-image','url(\x27','.qd-cpInnerLink','\x22\x20alt=\x22\x22\x20class=\x22vtex-cpImgsThumb\x20vtex-cpThumb_','\x22\x20alt=\x22\x22/>','thumbByLabel','call','substr','image','Images','Não\x20foram\x20encontradas\x20imagens\x20para\x20o\x20SKU:\x20','IsMain','Não\x20foi\x20possível\x20obter\x20a\x20imagem\x20padrão\x20do\x20SKU\x20pois\x20o\x20objeto\x20fornecido\x20no\x20ambiente\x20SmartCheckout\x20é\x20inexistente\x20ou\x20esta\x20em\x20um\x20formato\x20não\x20esperado.\x20SKU:','Não\x20foi\x20possível\x20obter\x20a\x20imagem\x20da\x20thumb\x20por\x20label.\x20SKU:','height','imageUrl','thumbSize','width','vtex-cp_','qd_cpProductLink','img','before','<div\x20class=\x22vtex-cpImgOverlay\x22></div>','vtex-cpProductImage','<span\x20class=\x22vtex-cpProductTextWrap\x22><div\x20class=\x22vtex-cpOverlay\x22></div></span>','<span\x20class=\x22qd_cpProductInfoWrap\x22></span>','appendTo','saveCount','\x20R$\x20#value','Problemas\x20ao\x20executar\x20o\x20auto\x20setup.\x20Detalhes:\x20','prod','skus','ajaxCallback','QuatroDigital.cp_ajaxCallback','Ocorreu\x20um\x20problema\x20após\x20o\x20retorno\x20da\x20requisição\x20a\x20api\x20de\x20produto\x20da\x20VTEX.\x20Detalhes:\x20','QD_cp_prod_info_','Problemas\x20ao\x20usar\x20o\x20cache.\x20','/api/catalog_system/pub/products/variations/','json','Erro\x20ao\x20tentar\x20obter\x20os\x20dados\x20de\x20SKU\x20do\x20produto','limitRequestSimilarProducts','fullData','Erro\x20ao\x20tentar\x20obter\x20todos\x20os\x20dados\x20do\x20SKU.','init','QuatroDigital.cp_callback','Problemas\x20ao\x20executar\x20o\x20QD\x20Cores\x20Prateleira,\x20detalhes:\x20','function','qdAjax','jquery','replace','slice','error','extend','GET','object','stringify','data','toString','url','type','undefined','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','message','version','4.0','warn','unshift','[Quatro\x20Digital\x20-\x20sessionStorage]\x0a','toLowerCase','aviso','info','apply','join','qdSessionStorage','getItem','setItem','setTime','getTime','_expiration','alerta','removeItem','Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20obter\x20os\x20dados\x20no\x20armazenamento\x20da\x20sessão.\x20Detalhes:\x20','QD_coresPrateleira','location','href','indexOf','debugcp','[Cores\x20Prateleira]\x0a','parse','Este\x20navegador\x20não\x20tem\x20suporte\x20a\x20JSON\x20functions','li[layout]','Não\x20foi\x20posssível\x20obter\x20as\x20informações\x20deste\x20item.','R$\x20','skuname','Name','auto','Cor','Erro\x20no\x20callback\x20\x27imageUrl\x27.\x20','/cores-prateleira','haqvnypnypnqbf%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','toUpperCase','ite','---','erc','productShelf','parent','div[id*=\x22ResultItems_\x22]','selector','each','vtex-cpIsActivated','not','.helperComplement','length','Prateleira\x20não\x20encontrada\x20\x0a\x20(','autoSetup','find','.qd_cpSkuList','.vtex-cpProductField','groupSku','groupSkuByDimension2','groupSkuByDimension','O\x20produto\x20id\x20','\x20possui\x20','\x20SKUs\x20ao\x20total\x20mas\x20após\x20o\x20agrupamento\x20por\x20especificação\x20não\x20restou\x20nenhum\x20SKU\x20para\x20este\x20produto.\x20Certifique-se\x20de\x20ter\x20passado\x20o\x20parametro\x20correto\x20para\x20a\x20opçõão\x20\x22dimensions\x22.','addClass','vtex-cpOriginalImage','forceImgList','qd_cpShow','removeClass','qd_cpHide','primarySkuThumb','string','number','minSkuQttShow','thumbsQuantity','text','trim','SkuDataCache','sku','O\x20sku\x20“','”\x20foi\x20ignorado\x20pois\x20não\x20possui\x20estoque.\x20Wrapper:\x20','checkLinkEquals','attr','”\x20foi\x20ignorado\x20pois\x20tem\x20o\x20mesmo\x20link\x20que\x20o\x20produto\x20existente\x20na\x20vitrine.\x0a\x20URI:\x20','checkDuplicateUri','”\x20foi\x20ignorado\x20pois\x20já\x20existe\x20uma\x20thumb\x20na\x20vitrine\x20com\x20o\x20mesmo\x20link.\x0a\x20URI:\x20','qd-cp-sku-count','.qd_cpViewMore','qd-cp-show-sku-availables','<a\x20href=\x22','\x22></a>','search','idsku=','<span\x20class=\x27vtex-cpSkuIds\x20vtex-cpIndex_','\x20vtex-cpSkuId_','\x20qd_cpHide\x27\x20','data-primary-sku=\x221\x22','append','setThumbs','qd-cp-thumbs-count-','.vtex-cpSkuIds','first','vtex-cpFirst','trigger','QuatroDigital.cp_thumbsWrapperAdd','useProductField','split','.qd_cpProductLink[title]:first','title','[Título\x20não\x20encontrado]','.qd_cpProdId','val','Não\x20foi\x20possível\x20obter\x20o\x20ID\x20do\x20produto\x20no\x20campo\x20“qd_cpProdId”.','Não\x20foi\x20possível\x20obter\x20a\x20URL\x20do\x20produto\x20no\x20campo\x20“qd_cpUri”.','QuatroDigital.cp_liAjaxCallback','isSmartCheckout','.qd_cpUri','pop','shift','push','dimension2','dimensions','productId','checkIsAvaliable','O\x20Cores\x20ainda\x20não\x20tem\x20as\x20funcionalidades\x20necessárias\x20para\x20usar\x20o\x20parametro\x20“checkIsAvaliable”\x20em\x20conjunto\x20com\x20“groupSkuByDimension2”,\x20necessário\x20desenvolver\x20o\x20código\x20para\x20dar\x20suporte\x20a\x20isso.'];(function(_0x3dd15e,_0x1f0015){var _0x231fd0=function(_0x4f680a){while(--_0x4f680a){_0x3dd15e['push'](_0x3dd15e['shift']());}};_0x231fd0(++_0x1f0015);}(_0x05e3,0x86));var _0x305e=function(_0x9388c8,_0x2cdf84){_0x9388c8=_0x9388c8-0x0;var _0x6f1d3a=_0x05e3[_0x9388c8];return _0x6f1d3a;};(function(_0xffee6c){if(_0x305e('0x0')!==typeof _0xffee6c[_0x305e('0x1')]){var _0x4acf56={};_0xffee6c['qdAjaxQueue']=_0x4acf56;0x96>parseInt((_0xffee6c['fn'][_0x305e('0x2')][_0x305e('0x3')](/[^0-9]+/g,'')+'000')[_0x305e('0x4')](0x0,0x3),0xa)&&console&&_0x305e('0x0')==typeof console['error']&&console[_0x305e('0x5')]();_0xffee6c[_0x305e('0x1')]=function(_0xfadd27){try{var _0x143428=_0xffee6c[_0x305e('0x6')]({},{'url':'','type':_0x305e('0x7'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0xfadd27),_0x72ac4b;_0x72ac4b=_0x305e('0x8')===typeof _0x143428['data']?JSON[_0x305e('0x9')](_0x143428['data']):_0x143428[_0x305e('0xa')][_0x305e('0xb')]();var _0x557e21=encodeURIComponent(_0x143428[_0x305e('0xc')]+'|'+_0x143428[_0x305e('0xd')]+'|'+_0x72ac4b);_0x4acf56[_0x557e21]=_0x4acf56[_0x557e21]||{};_0x305e('0xe')==typeof _0x4acf56[_0x557e21][_0x305e('0xf')]?_0x4acf56[_0x557e21][_0x305e('0xf')]=_0xffee6c[_0x305e('0x10')](_0x143428):(_0x4acf56[_0x557e21][_0x305e('0xf')][_0x305e('0x11')](_0x143428[_0x305e('0x12')]),_0x4acf56[_0x557e21][_0x305e('0xf')][_0x305e('0x13')](_0x143428[_0x305e('0x5')]),_0x4acf56[_0x557e21]['jqXHR'][_0x305e('0x14')](_0x143428[_0x305e('0x15')]));_0x4acf56[_0x557e21]['jqXHR'][_0x305e('0x14')](function(){isNaN(parseInt(_0x143428[_0x305e('0x16')]))||setTimeout(function(){_0x4acf56[_0x557e21][_0x305e('0xf')]=void 0x0;},_0x143428[_0x305e('0x16')]);});return _0x4acf56[_0x557e21][_0x305e('0xf')];}catch(_0xc5b3dc){_0x305e('0xe')!==typeof console&&'function'===typeof console[_0x305e('0x5')]&&console[_0x305e('0x5')]('Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20'+_0xc5b3dc[_0x305e('0x17')]);}};_0xffee6c[_0x305e('0x1')][_0x305e('0x18')]=_0x305e('0x19');}}(jQuery));(function(){var _0x45ede9=function(_0x577b0e,_0x55f0fb){if('object'===typeof console&&'function'===typeof console['error']&&'function'===typeof console['info']&&_0x305e('0x0')===typeof console[_0x305e('0x1a')]){var _0x3b15be;_0x305e('0x8')===typeof _0x577b0e?(_0x577b0e[_0x305e('0x1b')](_0x305e('0x1c')),_0x3b15be=_0x577b0e):_0x3b15be=['[Quatro\x20Digital\x20-\x20sessionStorage]\x0a'+_0x577b0e];if(_0x305e('0xe')===typeof _0x55f0fb||'alerta'!==_0x55f0fb[_0x305e('0x1d')]()&&_0x305e('0x1e')!==_0x55f0fb['toLowerCase']())if(_0x305e('0xe')!==typeof _0x55f0fb&&_0x305e('0x1f')===_0x55f0fb[_0x305e('0x1d')]())try{console[_0x305e('0x1f')][_0x305e('0x20')](console,_0x3b15be);}catch(_0x4519ae){console[_0x305e('0x1f')](_0x3b15be[_0x305e('0x21')]('\x0a'));}else try{console[_0x305e('0x5')]['apply'](console,_0x3b15be);}catch(_0x5e9aea){console[_0x305e('0x5')](_0x3b15be[_0x305e('0x21')]('\x0a'));}else try{console[_0x305e('0x1a')][_0x305e('0x20')](console,_0x3b15be);}catch(_0x2f5a4d){console['warn'](_0x3b15be['join']('\x0a'));}}};window[_0x305e('0x22')]=window[_0x305e('0x22')]||{};var _0x10b398=_0x305e('0xe')!==typeof sessionStorage&&_0x305e('0xe')!==typeof sessionStorage['setItem']&&'undefined'!==typeof sessionStorage[_0x305e('0x23')];window[_0x305e('0x22')][_0x305e('0x24')]=function(_0x3de37c,_0x55a25e,_0xb59b8b){try{if(!_0x10b398)return!0x1;var _0x3a6c0e=new Date();sessionStorage['setItem'](_0x3de37c,_0x55a25e);isNaN(parseInt(_0xb59b8b))||(_0x3a6c0e[_0x305e('0x25')](_0x3a6c0e[_0x305e('0x26')]()+0xea60*_0xb59b8b),sessionStorage[_0x305e('0x24')](_0x3de37c+_0x305e('0x27'),_0x3a6c0e[_0x305e('0x26')]()));}catch(_0x517ccb){_0x45ede9(['Aeeee\x20irmão!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20salvar\x20os\x20dados\x20no\x20armazenamento\x20da\x20sessão.\x20Detalhes:\x20',_0x517ccb[_0x305e('0x17')]],_0x305e('0x28'));}};window['qdSessionStorage']['getItem']=function(_0x411f4d){try{if(!_0x10b398)return!0x1;var _0xff7921=new Date(),_0x68bcb6=parseInt(sessionStorage['getItem'](_0x411f4d+_0x305e('0x27'))||0x0,0xa)||0x0;return _0xff7921['getTime']()>_0x68bcb6?(sessionStorage[_0x305e('0x29')]&&(sessionStorage[_0x305e('0x29')](_0x411f4d),sessionStorage[_0x305e('0x29')](_0x411f4d+_0x305e('0x27'))),null):sessionStorage[_0x305e('0x23')](_0x411f4d);}catch(_0x3d2afb){_0x45ede9([_0x305e('0x2a'),_0x3d2afb['message']],_0x305e('0x28'));}};}());(function(_0x3f6b95,_0x8fdb93){if(_0x305e('0x0')!==typeof _0x8fdb93['fn'][_0x305e('0x2b')]){_0x8fdb93['fn']['QD_coresPrateleira']=function(){};_0x8fdb93[_0x305e('0x2b')]={};var _0x543a0a,_0xcf559c,_0x35a8c0,_0x1d8694=-0x1<document[_0x305e('0x2c')][_0x305e('0x2d')][_0x305e('0x1d')]()[_0x305e('0x2e')](_0x305e('0x2f')),_0x22e194=function(_0x5c454a,_0x3bab21){if(_0x305e('0x8')===typeof console){var _0x39de39;_0x305e('0x8')===typeof _0x5c454a?(_0x5c454a[_0x305e('0x1b')](_0x305e('0x30')),_0x39de39=_0x5c454a):_0x39de39=[_0x305e('0x30')+_0x5c454a];_0x305e('0xe')===typeof _0x3bab21||_0x305e('0x28')!==_0x3bab21[_0x305e('0x1d')]()&&_0x305e('0x1e')!==_0x3bab21[_0x305e('0x1d')]()?'undefined'!==typeof _0x3bab21&&'info'===_0x3bab21[_0x305e('0x1d')]()?console['info'][_0x305e('0x20')](console,_0x39de39):console[_0x305e('0x5')][_0x305e('0x20')](console,_0x39de39):console[_0x305e('0x1a')]['apply'](console,_0x39de39);}},_0x376998=function(_0xc93a9b,_0x34de07){if(_0x305e('0x8')===typeof console&&_0x1d8694){var _0x2da6bd;_0x305e('0x8')===typeof _0xc93a9b?(_0xc93a9b['unshift'](_0x305e('0x30')),_0x2da6bd=_0xc93a9b):_0x2da6bd=[_0x305e('0x30')+_0xc93a9b];'undefined'===typeof _0x34de07||'alerta'!==_0x34de07[_0x305e('0x1d')]()&&'aviso'!==_0x34de07['toLowerCase']()?_0x305e('0xe')!==typeof _0x34de07&&_0x305e('0x1f')===_0x34de07['toLowerCase']()?console[_0x305e('0x1f')][_0x305e('0x20')](console,_0x2da6bd):console[_0x305e('0x5')][_0x305e('0x20')](console,_0x2da6bd):console[_0x305e('0x1a')][_0x305e('0x20')](console,_0x2da6bd);}},_0x378250=!0x1;try{JSON[_0x305e('0x31')](JSON[_0x305e('0x9')]({'a':'b'})),_0x378250=!0x0;}catch(_0x15dbf1){_0x22e194(_0x305e('0x32'),_0x305e('0x28'));}var _0x2eac23={'productsLi':_0x305e('0x33'),'messageRequestFail':_0x305e('0x34'),'saveText':'Economize:\x20R$\x20#value','currency':_0x305e('0x35'),'skuGroupSelector':'.sku-selector[name=\x27espec_0\x27]','restoreOriginalDetails':!0x1,'checkLinkEquals':!0x1,'forceAvailable':!0x1,'forceImgList':!0x1,'autoSetup':!0x0,'checkIsAvaliable':!0x1,'useProductField':!0x1,'checkDuplicateUri':!0x0,'replaceProductName':!0x1,'productNameLimiter':null,'productNameStopInLastWord':!0x1,'productName':function(_0x3e6df4,_0x3c5b26){return _0x3e6df4[_0x305e('0x36')]||_0x3e6df4[_0x305e('0x37')];},'checkDuplicateSKUByDimenion':!0x0,'addSkuIdInURL':!0x0,'speedFade':0xc8,'thumbsQuantity':0x4,'minSkuQttShow':0x2,'thumbByLabel':null,'thumbSize':{'width':0x24,'height':0x24},'imageSize':_0x305e('0x38'),'groupSkuByDimension':!0x0,'groupSkuByDimension2':!0x0,'dimensions':[_0x305e('0x39')],'imageLabel':[null],'primarySkuThumb':null,'limitRequestSimilarProducts':!0x0,'ajaxCallback':function(){},'callback':function(){},'thumbRendered':function(_0x45027e,_0xea932d,_0x1c19f9,_0xd2d844,_0x2de86b){},'imageUrl':function(_0x9d63f0,_0x37b089,_0x24982c){try{return _0x9d63f0[_0x305e('0x3')](/(ids\/[0-9]+\-)([0-9]+\-[0-9]+)/i,'$1'+_0x37b089+'-'+_0x24982c);}catch(_0x4a2095){return _0x22e194([_0x305e('0x3a'),_0x4a2095[_0x305e('0x17')]],'alerta'),'';}},'similarProducts':function(_0x3a2c7a,_0x102d8e,_0x2c0c1d,_0x3abf32){_0x3abf32(!0x1);},'isSmartCheckout':!0x0,'action':0x2,'productImgId':0x1e,'thumbImgId':0x3,'productPageUrl':_0x305e('0x3b')},_0x2e5a0e=function(_0x2441b0){var _0x2192b8={'z':_0x305e('0x3c')};return function(_0x168bdb){var _0x2441b0=function(_0x5dbece){return _0x5dbece;};var _0x3349b2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x168bdb=_0x168bdb['d'+_0x3349b2[0x10]+'c'+_0x3349b2[0x11]+'m'+_0x2441b0(_0x3349b2[0x1])+'n'+_0x3349b2[0xd]]['l'+_0x3349b2[0x12]+'c'+_0x3349b2[0x0]+'ti'+_0x2441b0('o')+'n'];var _0x587640=function(_0x4d6ef2){return escape(encodeURIComponent(_0x4d6ef2[_0x305e('0x3')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x5e7c80){return String['fromCharCode'](('Z'>=_0x5e7c80?0x5a:0x7a)>=(_0x5e7c80=_0x5e7c80['charCodeAt'](0x0)+0xd)?_0x5e7c80:_0x5e7c80-0x1a);})));};var _0x103ddf=_0x587640(_0x168bdb[[_0x3349b2[0x9],_0x2441b0('o'),_0x3349b2[0xc],_0x3349b2[_0x2441b0(0xd)]][_0x305e('0x21')]('')]);_0x587640=_0x587640((window[['js',_0x2441b0('no'),'m',_0x3349b2[0x1],_0x3349b2[0x4][_0x305e('0x3d')](),_0x305e('0x3e')]['join']('')]||_0x305e('0x3f'))+['.v',_0x3349b2[0xd],'e',_0x2441b0('x'),'co',_0x2441b0('mm'),_0x305e('0x40'),_0x3349b2[0x1],'.c',_0x2441b0('o'),'m.',_0x3349b2[0x13],'r'][_0x305e('0x21')](''));for(var _0x5216eb in _0x2192b8){if(_0x587640===_0x5216eb+_0x2192b8[_0x5216eb]||_0x103ddf===_0x5216eb+_0x2192b8[_0x5216eb]){var _0x6543f3='tr'+_0x3349b2[0x11]+'e';break;}_0x6543f3='f'+_0x3349b2[0x0]+'ls'+_0x2441b0(_0x3349b2[0x1])+'';}_0x2441b0=!0x1;-0x1<_0x168bdb[[_0x3349b2[0xc],'e',_0x3349b2[0x0],'rc',_0x3349b2[0x9]][_0x305e('0x21')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2441b0=!0x0);return[_0x6543f3,_0x2441b0];}(_0x2441b0);}(window);if(!eval(_0x2e5a0e[0x0]))return _0x2e5a0e[0x1]?_0x22e194('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x8fdb93['fn'][_0x305e('0x2b')]=function(_0x7a9c22){try{_0x8fdb93('');var _0x36376b=/https?\:\/\/[^\/\?#]+/i,_0x498c26=_0x8fdb93[_0x305e('0x6')](!0x0,{},_0x2eac23,_0x7a9c22),_0x2b56cc={'loadSkuJqxhr':null,'productOriginalInfo':null,'productOriginalLink':null,'productOriginalSave':null,'saveCount':0x0,'onHover':!0x1,'skuList':[],'skuQueue':[],'skuProduct':{},'productHtml':{},'productShelf':null,'productSkus':{},'init':function(){_0x2b56cc[_0x305e('0x41')][_0x305e('0x42')]()['is'](_0x305e('0x43'))&&0x0>_0x2b56cc['productShelf'][_0x305e('0x44')][_0x305e('0x2e')]('ResultItems')&&_0x22e194('Ei\x20Psiuu!\x20Você\x20esta\x20selecionando\x20um\x20elemento\x20que\x20é\x20filho\x20de\x20“div[id*=ResultItems_]”,\x20tem\x20certeza\x20que\x20este\x20seletor\x20esta\x20correto?\x20Selecionar\x20um\x20filho\x20direto\x20desta\x20div\x20(ResultItems)\x20sem\x20especifica-la\x20no\x20seletor\x20pode\x20causar\x20comportamentos\x20bizarrooooos\x20do\x20Cores.\x20#fkdica',_0x305e('0x28'));_0x2b56cc[_0x305e('0x41')][_0x305e('0x45')](function(_0x218aa9){var _0x5c3330=_0x8fdb93(this);_0x5c3330['hasClass'](_0x305e('0x46'))||_0x2b56cc['exec'](_0x5c3330,_0x218aa9);});},'exec':function(_0x56116a,_0x250e7f){var _0x32ed04=_0x56116a['find'](_0x498c26['productsLi'])[_0x305e('0x47')](_0x305e('0x48'));if(0x1>_0x32ed04[_0x305e('0x49')])return _0x22e194(_0x305e('0x4a')+_0x32ed04[_0x305e('0x44')]+')'),!0x1;_0x56116a['addClass'](_0x305e('0x46'));_0x32ed04['each'](function(_0x36968c){var _0x1c3218,_0x3b700f,_0x361f92,_0x39b2b1;var _0x481052=_0x8fdb93(this);!0x0===_0x498c26[_0x305e('0x4b')]&&_0x2b56cc['shelfSetup'](_0x481052);var _0x454ebb=_0x481052[_0x305e('0x4c')](_0x305e('0x4d'));var _0x5e4720=_0x481052['find'](_0x305e('0x4e'));var _0x38730a=_0x250e7f[_0x305e('0xb')]()+'_'+_0x36968c[_0x305e('0xb')]();var _0x39a782=function(_0x2d5e65,_0x4deb57){_0x3b700f=_0x2b56cc[_0x305e('0x4f')](_0x2d5e65,_0x38730a);_0x1c3218=_0x498c26[_0x305e('0x50')]?_0x2b56cc[_0x305e('0x50')](_0x3b700f,_0x4deb57):_0x498c26['groupSkuByDimension']?_0x2b56cc[_0x305e('0x51')](_0x3b700f,_0x4deb57):_0x3b700f;0x0<_0x3b700f['length']&&0x0===_0x1c3218[_0x305e('0x49')]&&_0x376998(_0x305e('0x52')+_0x4deb57+_0x305e('0x53')+_0x2d5e65[_0x305e('0x49')]+_0x305e('0x54'),'alerta');_0x481052[_0x305e('0x4c')]('.vtex-cpProductImage\x20img')[_0x305e('0x55')](_0x305e('0x56'));(_0x498c26['forceAvailable']||_0x498c26[_0x305e('0x57')])&&_0x454ebb['addClass'](_0x305e('0x58'))[_0x305e('0x59')](_0x305e('0x5a'));var _0x129c15=null;if(_0x305e('0x0')===typeof _0x498c26[_0x305e('0x5b')]&&(_0x129c15=_0x498c26[_0x305e('0x5b')](_0x481052),_0x305e('0x5c')===typeof _0x129c15&&''!==_0x129c15||_0x305e('0x5d')===typeof _0x129c15))for(var _0x1f93d8=0x0;_0x1f93d8<_0x1c3218[_0x305e('0x49')];_0x1f93d8++)if(_0x1c3218[_0x1f93d8][0x1]==_0x129c15){var _0x4c0cd6=_0x1c3218[_0x1f93d8];_0x1c3218[_0x1f93d8]=_0x1c3218[0x0];_0x1c3218[0x0]=_0x4c0cd6;break;}_0x39b2b1=_0x1c3218[_0x305e('0x49')];if(_0x39b2b1>=_0x498c26[_0x305e('0x5e')])for(_0x39b2b1>_0x498c26[_0x305e('0x5f')]&&(_0x481052[_0x305e('0x4c')]('.qd_cpViewMore')[_0x305e('0x55')]('qd_cpShow')[_0x305e('0x59')](_0x305e('0x5a')),_0x481052[_0x305e('0x4c')]('.qd-cp-sku-qtt')[_0x305e('0x60')](_0x39b2b1)),_0x1f93d8=0x0;_0x1f93d8<_0x39b2b1;_0x1f93d8++){_0x4c0cd6=_0x1c3218[_0x1f93d8][0x1];var _0x2abfe3=_0x1c3218[_0x1f93d8][0x0][_0x305e('0x61')]();var _0x2589ba=_0x2abfe3['replace'](_0x36376b,'');if(_0x498c26['checkIsAvaliable']&&!_0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')][_0x305e('0x63')][_0x4c0cd6]['available'])_0x376998([_0x305e('0x64')+_0x4c0cd6+_0x305e('0x65'),_0x481052],_0x305e('0x1f'));else if(_0x498c26[_0x305e('0x66')]&&_0x2589ba==(_0x481052[_0x305e('0x4c')]('.qd_cpProductLink:first')[_0x305e('0x67')](_0x305e('0x2d'))||'')[_0x305e('0x61')]()[_0x305e('0x3')](_0x36376b,''))_0x376998('O\x20sku\x20“'+_0x4c0cd6+_0x305e('0x68')+_0x2589ba,_0x305e('0x1f'));else if(_0x498c26[_0x305e('0x69')]&&0x0<_0x481052[_0x305e('0x4c')]('.vtex-cpSkuIds[ref=\x27'+_0x2589ba+'\x27]')[_0x305e('0x49')])_0x376998('O\x20sku\x20“'+_0x4c0cd6+_0x305e('0x6a')+_0x2589ba,_0x305e('0x1f'));else{var _0x19c9b6=_0x481052[_0x305e('0xa')](_0x305e('0x6b'))||0x0;_0x481052[_0x305e('0xa')](_0x305e('0x6b'),_0x19c9b6+0x1);if(_0x19c9b6>=_0x498c26[_0x305e('0x5f')]-0x1){_0x481052[_0x305e('0x4c')](_0x305e('0x6c'))[_0x305e('0x55')](_0x305e('0x6d'));break;}else if(''!==_0x4c0cd6){var _0x55c540=_0x2abfe3;_0x498c26['addSkuIdInURL']&&(_0x55c540=_0x8fdb93(_0x305e('0x6e')+_0x2abfe3+_0x305e('0x6f'))[0x0],_0x55c540[_0x305e('0x70')]+=(_0x55c540[_0x305e('0x70')][_0x305e('0x49')]?'&':'')+_0x305e('0x71')+_0x4c0cd6,_0x55c540=_0x55c540['href']);_0x19c9b6=_0x8fdb93(_0x305e('0x72')+(_0x19c9b6-0x1)+_0x305e('0x73')+_0x4c0cd6+_0x305e('0x74')+(_0x129c15==_0x4c0cd6?_0x305e('0x75'):'')+'><span\x20class=\x27vtex-cpInner\x27><a\x20href=\x27'+_0x55c540+'\x27\x20class=\x27qd-cpInnerLink\x27></a></span><span\x20class=\x27vtex-cpInner2\x27></span></span>');_0x19c9b6[_0x305e('0x67')]({'ref':_0x2589ba,'id':_0x4c0cd6});_0x454ebb[_0x305e('0x76')](_0x2b56cc[_0x305e('0x77')](_0x481052,_0x4c0cd6,_0x19c9b6,_0x2abfe3,_0x38730a));}}}_0x454ebb[_0x305e('0x55')](_0x305e('0x78')+_0x454ebb['find'](_0x305e('0x79'))[_0x305e('0x49')]);_0x361f92=_0x481052[_0x305e('0x4c')](_0x305e('0x79'));_0x361f92[_0x305e('0x49')]>=_0x498c26['minSkuQttShow']&&_0x361f92[_0x305e('0x59')]('qd_cpHide');_0x361f92[_0x305e('0x7a')]()[_0x305e('0x55')](_0x305e('0x7b'));_0x8fdb93(window)[_0x305e('0x7c')](_0x305e('0x7d'),{'li':_0x481052,'wrapper':_0x454ebb,'data':_0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')]});};if(_0x498c26[_0x305e('0x7e')])_0x36968c=_0x5e4720[_0x305e('0x4c')]('li')[_0x305e('0x60')]()[_0x305e('0x61')]()[_0x305e('0x7f')]('|'),_0x1d8694&&''===_0x5e4720[_0x305e('0x4c')]('li')[_0x305e('0x60')]()[_0x305e('0x61')]()&&_0x376998('O\x20campo\x20produto\x20não\x20esta\x20retornando\x20nenhum\x20valor.\x0a\x20Produto:\x20'+(_0x481052[_0x305e('0x4c')](_0x305e('0x80'))[_0x305e('0x67')](_0x305e('0x81'))||_0x305e('0x82')),_0x305e('0x1f')),_0x39a782(_0x36968c);else{var _0x49a65a=_0x481052[_0x305e('0x4c')](_0x305e('0x83'))['val']();_0x5e4720=_0x481052[_0x305e('0x4c')]('.qd_cpUri')[_0x305e('0x84')]();_0x305e('0xe')===typeof _0x49a65a&&_0x22e194([_0x305e('0x85'),_0x481052]);_0x305e('0xe')===typeof _0x5e4720&&_0x22e194(_0x305e('0x86'));_0x2b56cc['getProductInfo'](function(_0x26abed,_0x1d0bc4){_0x39a782(_0x26abed,_0x49a65a);_0x8fdb93(window)[_0x305e('0x7c')](_0x305e('0x87'),{'li':_0x481052,'wrapper':_0x454ebb});},_0x49a65a,_0x5e4720,_0x481052);}});},'getProductInfo':function(_0x371be9,_0x5f1065,_0x5ca89f,_0x2108d6){_0x498c26[_0x305e('0x88')]&&_0x543a0a['call'](this,_0x371be9,_0x5f1065,_0x5ca89f,_0x2108d6);},'getRelatedProductInfo':function(_0x2a5615){var _0x50ee49=[_0x2a5615];var _0x8fdb93=_0x2a5615[_0x305e('0x4c')]('.qd_cpProdId')[_0x305e('0x84')]();var _0x242cac=_0x2a5615['find'](_0x305e('0x89'))[_0x305e('0x84')]();'undefined'!==typeof _0x8fdb93&&_0x305e('0xe')!==typeof _0x242cac&&(_0x50ee49=[_0x8fdb93,_0x242cac,_0x2a5615]);return _0x50ee49;},'groupSku':function(_0x5ecb6d,_0x5701c3){var _0x8fdb93={},_0x378d50=[];var _0xa775ec=_0x5ecb6d[_0x305e('0x49')];if(0x2>_0xa775ec&&''===_0x5ecb6d[0x0])return _0x378d50;for(var _0x3abbfe=0x0;_0x3abbfe<_0xa775ec;_0x3abbfe++){var _0x7b8d2e=_0x5ecb6d[_0x3abbfe][_0x305e('0x7f')](';');var _0x2f89d4=_0x7b8d2e[_0x305e('0x8a')]();_0x7b8d2e=_0x7b8d2e[_0x305e('0x8b')]();_0x305e('0xe')!=typeof _0x2f89d4&&(_0x305e('0xe')==typeof _0x8fdb93[_0x7b8d2e]?_0x8fdb93[_0x7b8d2e]=[_0x2f89d4]:_0x8fdb93[_0x7b8d2e][_0x305e('0x8c')](_0x2f89d4));}for(var _0x31333a in _0x8fdb93){_0xa775ec=_0x8fdb93[_0x31333a]['length'];_0x2f89d4=[];if(0x3<_0xa775ec){_0x7b8d2e=parseInt(_0xa775ec/0x3,0xa);var _0x1e0662=_0xa775ec%0x3;var _0x88196a=0x2*_0x7b8d2e;for(_0x3abbfe=0x0;_0x3abbfe<_0x7b8d2e;_0x3abbfe++)_0x2f89d4[_0x305e('0x8c')](_0x8fdb93[_0x31333a][_0x3abbfe]),_0x2f89d4[_0x305e('0x8c')](_0x8fdb93[_0x31333a][_0x3abbfe+_0x7b8d2e]),_0x2f89d4[_0x305e('0x8c')](_0x8fdb93[_0x31333a][_0x3abbfe+_0x88196a]);0x1==_0x1e0662?_0x2f89d4[_0x305e('0x8c')](_0x8fdb93[_0x31333a][_0xa775ec-0x1]):0x2==_0x1e0662&&(_0x2f89d4[_0x305e('0x8c')](_0x8fdb93[_0x31333a][_0xa775ec-0x1]),_0x2f89d4[_0x305e('0x8c')](_0x8fdb93[_0x31333a][_0xa775ec-0x2]));}else _0x2f89d4=_0x8fdb93[_0x31333a];_0x378d50[_0x305e('0x8c')]([_0x2f89d4[_0x305e('0x8b')](),_0x31333a]);}return _0x378d50;},'groupSkuByDimension2':function(_0x80e67d,_0x1bd837){_0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')][_0x305e('0x8d')]=_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')]['dimension2']||{};for(var _0x447449=0x0;_0x447449<_0x80e67d[_0x305e('0x49')];_0x447449++){var _0x213139=_0x80e67d[_0x447449][0x1];_0x213139=_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x63')][_0x213139];var _0x518856=[];for(var _0x5105cf=0x0;_0x5105cf<_0x498c26[_0x305e('0x8e')]['length'];_0x5105cf++)'string'===typeof _0x213139[_0x305e('0x8e')][_0x498c26['dimensions'][_0x5105cf]]&&_0x518856[_0x305e('0x8c')](_0x498c26['dimensions'][_0x5105cf]);_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x8d')][_0x213139[_0x305e('0x8f')]]=_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x8d')][_0x213139[_0x305e('0x8f')]]||{};for(_0x5105cf=0x0;_0x5105cf<_0x518856[_0x305e('0x49')];_0x5105cf++)_0x498c26[_0x305e('0x90')]&&_0x22e194(_0x305e('0x91')),_0x305e('0xe')!=typeof _0x213139[_0x305e('0x8e')][_0x518856[_0x5105cf]]&&_0x305e('0xe')==typeof _0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x8d')][_0x213139[_0x305e('0x8f')]][_0x213139[_0x305e('0x8e')][_0x518856[_0x5105cf]]]&&(_0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')][_0x305e('0x8d')][_0x213139[_0x305e('0x8f')]][_0x213139['dimensions'][_0x518856[_0x5105cf]]]=_0x80e67d[_0x447449]);}_0x447449=[];for(var _0x2d883e in _0x8fdb93['QD_coresPrateleira']['SkuDataCache'][_0x305e('0x8d')][_0x213139[_0x305e('0x8f')]])_0x447449['push'](_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')]['dimension2'][_0x213139[_0x305e('0x8f')]][_0x2d883e]);return _0x447449;},'groupSkuByDimension':function(_0x48ab15,_0x288b5a){if(!_0x498c26[_0x305e('0x88')]||!_0x498c26['checkDuplicateSKUByDimenion'])return _0x48ab15;var _0x44ee15=[];_0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')][_0x305e('0x92')]=_0x8fdb93[_0x305e('0x2b')]['SkuDataCache']['dimension']||{};if(_0x305e('0xe')!==typeof _0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')][_0x305e('0x92')][_0x288b5a]&&_0x305e('0x8')===typeof _0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x92')][_0x288b5a][_0x305e('0x93')]&&0x0<_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x92')][_0x288b5a]['uniqueSkuByDimension'][_0x305e('0x49')])return _0x44ee15[_0x305e('0x94')](_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')]['dimension'][_0x288b5a]['uniqueSkuByDimension']);for(var _0x133866=0x0;_0x133866<_0x48ab15['length'];_0x133866++){var _0x3d82f2=_0x48ab15[_0x133866][0x1];var _0x294259=_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x63')][_0x3d82f2];var _0x270aa8=[];for(var _0x38e9a1=0x0;_0x38e9a1<_0x498c26['dimensions'][_0x305e('0x49')];_0x38e9a1++)'string'===typeof _0x294259['dimensions'][_0x498c26[_0x305e('0x8e')][_0x38e9a1]]&&_0x270aa8[_0x305e('0x8c')](_0x498c26[_0x305e('0x8e')][_0x38e9a1]);_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x92')][_0x294259[_0x305e('0x8f')]]=_0x8fdb93[_0x305e('0x2b')]['SkuDataCache'][_0x305e('0x92')][_0x294259[_0x305e('0x8f')]]||{};for(_0x38e9a1=0x0;_0x38e9a1<_0x270aa8['length'];_0x38e9a1++)_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')]['dimension'][_0x294259['productId']][_0x294259[_0x305e('0x8e')][_0x270aa8[_0x38e9a1]]]=_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x92')][_0x294259[_0x305e('0x8f')]][_0x294259['dimensions'][_0x270aa8[_0x38e9a1]]]||[],_0x8fdb93[_0x305e('0x2b')]['SkuDataCache'][_0x305e('0x92')][_0x294259[_0x305e('0x8f')]][_0x305e('0x93')]=_0x8fdb93['QD_coresPrateleira']['SkuDataCache'][_0x305e('0x92')][_0x294259[_0x305e('0x8f')]][_0x305e('0x93')]||[],_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x92')][_0x294259[_0x305e('0x8f')]][_0x294259[_0x305e('0x8e')][_0x270aa8[_0x38e9a1]]][_0x305e('0x49')]||(_0x44ee15['push'](_0x48ab15[_0x133866]),_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')]['dimension'][_0x294259['productId']][_0x305e('0x93')][_0x305e('0x8c')](_0x48ab15[_0x133866])),_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')]['dimension'][_0x294259[_0x305e('0x8f')]][_0x294259[_0x305e('0x8e')][_0x270aa8[_0x38e9a1]]][_0x305e('0x8c')](_0x3d82f2);}return _0x44ee15;},'setThumbs':function(_0x4e10bb,_0x4e4bcb,_0x1b0c75,_0x485140,_0x2d2a83){_0x1b0c75['addClass'](_0x305e('0x95'));_0x2b56cc[_0x305e('0x96')](_0x4e10bb,_0x4e4bcb,_0x4e10bb[_0x305e('0x4c')]('.vtex-cpOverlay'),_0x498c26[_0x305e('0x97')],_0x1b0c75,_0x485140,_0x2d2a83);_0x498c26['thumbRendered'](_0x4e10bb,_0x1b0c75,_0x2b56cc[_0x305e('0x98')],_0x2b56cc[_0x305e('0x99')],_0x4e4bcb);return _0x1b0c75;},'checkIsAvaliable':function(_0x5e0465,_0x279073,_0x121cb6,_0x4c1fc9,_0x45dcdd,_0x441b65){_0x2b56cc['mouseActions2'](_0x5e0465,_0x279073,_0x121cb6,_0x4c1fc9,_0x45dcdd);},'mouseActions2':function(_0x48490a,_0x388e4c,_0x23a60d,_0xfdd634,_0x4f7bb5){_0x2b56cc[_0x305e('0x9a')](_0x23a60d,_0xfdd634);_0x2b56cc['setClass'](_0x23a60d,_0xfdd634,_0x388e4c);_0x23a60d[_0x305e('0x9b')](_0x305e('0x9c'),function(){try{_0x48490a['find'](_0x305e('0x9d'))[_0x305e('0x59')]('vtex_cpActiveSku');_0x23a60d[_0x305e('0x55')](_0x305e('0x9e'));if(_0x498c26['restoreOriginalDetails']){_0x2b56cc['productOriginalInfo']=_0x48490a['find'](_0x305e('0x9f'))[_0x305e('0xa0')]()[_0x305e('0xa1')]();_0x2b56cc['productOriginalLink']=_0x48490a[_0x305e('0x4c')]('.qd_cpProductLink:first')['attr'](_0x305e('0x2d'))||'';var _0x388e4c=_0x48490a[_0x305e('0x4c')](_0x305e('0xa2'));_0x2b56cc[_0x305e('0xa3')]=[_0x388e4c[_0x305e('0xa4')]()||'',_0x388e4c[_0x305e('0x67')](_0x305e('0xa5'))||''];}_0x2b56cc[_0x305e('0xa6')](_0xfdd634,_0x48490a,_0x4f7bb5);_0x2b56cc[_0x305e('0xa7')]=!0x0;_0x8fdb93(window)[_0x305e('0x7c')](_0x305e('0xa8'),{'data':_0xfdd634[0x0],'li':_0x48490a,'link':_0x4f7bb5});}catch(_0x5dcea8){_0x22e194(_0x5dcea8['message']);}});_0x498c26[_0x305e('0xa9')]&&_0x23a60d[_0x305e('0x9b')](_0x305e('0xaa'),function(){try{_0x48490a[_0x305e('0x4c')]('.vtex_cpActiveSku')[_0x305e('0x59')](_0x305e('0x9e')),_0x2b56cc[_0x305e('0xab')](_0x48490a),_0x2b56cc[_0x305e('0xa7')]=!0x1,_0x8fdb93(window)['trigger'](_0x305e('0xac'),{'data':_0xfdd634[0x0],'li':_0x48490a,'link':_0x4f7bb5});}catch(_0x571df6){_0x22e194(_0x571df6[_0x305e('0x17')]);}});return _0x23a60d;},'formatInfo':function(_0x9ce5f1,_0x16a9cf,_0x4aa541){var _0xa6598,_0x38936b,_0x2a02d9,_0x5b9c70;_0x16a9cf[_0x305e('0x55')](_0x305e('0xad'));_0x9ce5f1=_0x9ce5f1[0x0];if(_0x9ce5f1[_0x305e('0xae')]||_0x9ce5f1[_0x305e('0xaf')]||_0x498c26[_0x305e('0xb0')]){var _0x4dd60d=_0x16a9cf['find'](_0x305e('0xb1'));var _0x2f28cb=_0x9ce5f1['installments']||_0x9ce5f1[_0x305e('0xb2')];var _0x1a1ed9=_0x498c26[_0x305e('0x88')]?_0x9ce5f1[_0x305e('0xb3')]/0x64:_0x9ce5f1[_0x305e('0xb4')];var _0x5b9756=_0x498c26[_0x305e('0x88')]?_0x9ce5f1[_0x305e('0xb5')]/0x64:_0x9ce5f1[_0x305e('0xb6')];_0x4dd60d['addClass']('qd_cpShow')[_0x305e('0x59')](_0x305e('0x5a'));_0x16a9cf[_0x305e('0x4c')](_0x305e('0xb7'))[_0x305e('0x55')](_0x305e('0x5a'))[_0x305e('0x59')](_0x305e('0x58'));_0x4dd60d[_0x305e('0x4c')]('.qd_cpBestPrice')[_0x305e('0x60')](_0x498c26[_0x305e('0xb8')]+_0x2b56cc[_0x305e('0xb9')](_0x498c26['isSmartCheckout']?_0x9ce5f1['bestPrice']/0x64:_0x9ce5f1[_0x305e('0xb6')]));_0x16a9cf['find'](_0x305e('0xa2'))[_0x305e('0xa4')](_0x498c26[_0x305e('0xba')][_0x305e('0x3')]('#value',_0x2b56cc[_0x305e('0xb9')](_0x1a1ed9-_0x5b9756)));_0x5b9756<_0x1a1ed9?(_0x4dd60d[_0x305e('0x4c')](_0x305e('0xbb'))[_0x305e('0x55')]('qd_cpShow')[_0x305e('0x59')](_0x305e('0x5a'))['find'](_0x305e('0xbc'))[_0x305e('0x60')](_0x498c26[_0x305e('0xb8')]+_0x2b56cc['numberFormat'](_0x1a1ed9)),_0x16a9cf[_0x305e('0x4c')](_0x305e('0xa2'))[_0x305e('0x55')](_0x305e('0x58'))[_0x305e('0x59')](_0x305e('0x5a'))):(_0x4dd60d[_0x305e('0x4c')]('.qd_cpListPriceWrap')[_0x305e('0x55')](_0x305e('0x5a'))['removeClass'](_0x305e('0x58')),_0x16a9cf[_0x305e('0x4c')](_0x305e('0xa2'))[_0x305e('0x55')](_0x305e('0x5a'))['removeClass']('qd_cpShow'));0x1<_0x2f28cb?(_0x1a1ed9=_0x4dd60d[_0x305e('0x4c')](_0x305e('0xbd'))[_0x305e('0x55')](_0x305e('0x58'))[_0x305e('0x59')](_0x305e('0x5a')),_0x1a1ed9[_0x305e('0x4c')]('.qd_cpNumbersOfInstallment')[_0x305e('0x60')](_0x2f28cb),_0x1a1ed9[_0x305e('0x4c')](_0x305e('0xbe'))['text'](_0x498c26[_0x305e('0xb8')]+_0x2b56cc[_0x305e('0xb9')](_0x498c26[_0x305e('0x88')]?_0x9ce5f1[_0x305e('0xbf')]/0x64:_0x9ce5f1[_0x305e('0xc0')])),_0x4dd60d[_0x305e('0x4c')](_0x305e('0xc1'))[_0x305e('0x55')](_0x305e('0x5a'))[_0x305e('0x59')](_0x305e('0x58'))):(_0x4dd60d[_0x305e('0x4c')](_0x305e('0xbd'))[_0x305e('0x55')](_0x305e('0x5a'))[_0x305e('0x59')]('qd_cpShow'),_0x4dd60d[_0x305e('0x4c')](_0x305e('0xc1'))[_0x305e('0x55')]('qd_cpShow')[_0x305e('0x59')](_0x305e('0x5a')));}else _0x16a9cf[_0x305e('0x4c')](_0x305e('0xb1'))['addClass'](_0x305e('0x5a'))[_0x305e('0x59')](_0x305e('0x58')),_0x16a9cf[_0x305e('0x4c')](_0x305e('0xb7'))[_0x305e('0x55')](_0x305e('0x58'))['removeClass']('qd_cpHide');_0x498c26[_0x305e('0xc2')]&&(_0x4dd60d=_0x498c26[_0x305e('0xc3')](_0x9ce5f1,_0x16a9cf),isNaN(_0x498c26[_0x305e('0xc4')])||null===_0x498c26[_0x305e('0xc4')]?_0x16a9cf[_0x305e('0x4c')](_0x305e('0xc5'))[_0x305e('0xa4')](_0x4dd60d):_0x498c26[_0x305e('0xc6')]&&(_0x4dd60d||'')[_0x305e('0x49')]>_0x498c26[_0x305e('0xc4')]?(_0x4dd60d=(_0x4dd60d||'')['substring'](0x0,_0x498c26[_0x305e('0xc4')]+0x1)['split']('\x20'),_0x4dd60d[_0x305e('0x8a')](),_0x16a9cf[_0x305e('0x4c')]('.qd-cpProductName')[_0x305e('0xa4')](_0x4dd60d[_0x305e('0x21')]('\x20')+_0x305e('0xc7'))):(_0x4dd60d||'')[_0x305e('0x49')]>_0x498c26[_0x305e('0xc4')]?_0x16a9cf[_0x305e('0x4c')](_0x305e('0xc5'))['html']((_0x4dd60d||'')[_0x305e('0xc8')](0x0,_0x498c26[_0x305e('0xc4')])+_0x305e('0xc7')):_0x16a9cf['find'](_0x305e('0xc5'))[_0x305e('0xa4')](_0x4dd60d||''));_0x4dd60d=_0x16a9cf[_0x305e('0x4c')]('.qd_cpProductLink');''!==_0x4aa541&&_0x4dd60d[_0x305e('0x67')](_0x305e('0x2d'),_0x4aa541[_0x305e('0x3')](_0x36376b,''));_0x498c26[_0x305e('0xc9')]&&(_0x4dd60d[0x0]['search']+=(_0x4dd60d[0x0][_0x305e('0x70')]['length']?'&':'')+_0x305e('0x71')+(_0x9ce5f1['sku']||_0x9ce5f1['Id']));var _0x4e576a=_0x16a9cf[_0x305e('0x4c')]('.vtex-cpProductImage');var _0x41e4e6=_0x16a9cf['find'](_0x305e('0xca'));var _0x4a4aed=_0x4e576a[_0x305e('0x4c')](_0x305e('0xcb'));_0x4dd60d=_0x4a4aed[0x0];_0x4aa541=_0x4a4aed[_0x305e('0x67')]('width')||_0x4dd60d['naturalWidth'];_0x4dd60d=_0x4a4aed['attr']('height')||_0x4dd60d['naturalHeight'];_0x498c26['isSmartCheckout']&&'auto'==_0x498c26[_0x305e('0xcc')]&&(_0x498c26[_0x305e('0xcc')]={'width':_0x4aa541,'height':_0x4dd60d});var _0x1f56d9=function(_0x46ba4f,_0x49b48c){var _0x4aa541=_0x46ba4f['sku']||_0x46ba4f['Id'];_0xa6598=_0x2b56cc[_0x305e('0xcd')](_0x46ba4f,_0x498c26[_0x305e('0xce')],_0x498c26[_0x305e('0x88')],_0x49b48c);if(_0x305e('0x5c')!==typeof _0x49b48c||''!==_0xa6598[0x0])_0x38936b=_0x16a9cf[_0x305e('0x4c')](_0x305e('0xcf')+(_0xa6598[0x0][_0x305e('0x7f')]('?')[_0x305e('0x8b')]()||_0x4a4aed[_0x305e('0x67')]('src'))+'\x27]:not(\x27.vtex-cpImgsThumb\x27)'),_0x2a02d9=0x0<_0x38936b[_0x305e('0x49')]?!0x0:!0x1,_0x41e4e6['show'](),_0x2a02d9?(_0x4a4aed[_0x305e('0xd0')](!0x0)[_0x305e('0x59')](_0x305e('0xd1'))[_0x305e('0xd2')](_0x498c26[_0x305e('0xd3')]),_0x41e4e6['hide'](),_0x16a9cf[_0x305e('0x4c')]('.vtex-cpSkuImage')[_0x305e('0xd0')](!0x0)[_0x305e('0x59')](_0x305e('0xd1'))[_0x305e('0xd2')](_0x498c26['speedFade']),_0x38936b[_0x305e('0xd0')](!0x0)[_0x305e('0x55')](_0x305e('0xd1'))[_0x305e('0xd4')](_0x498c26['speedFade'],0x1),_0x38936b[_0x305e('0x67')]('data-sku',_0x4aa541),_0x305e('0x5c')===typeof _0x49b48c&''!==_0x49b48c&&_0x38936b[_0x305e('0x67')](_0x305e('0xd5'),_0x49b48c),_0x38936b[_0x305e('0xd6')](_0x305e('0xd7')+_0x4aa541+'\x27]')[_0x305e('0xd0')](!0x0)['addClass']('qd-visible')[_0x305e('0xd4')](_0x498c26['speedFade'],0x1)):(_0x5b9c70=_0x8fdb93(_0x305e('0xd8')+(_0xa6598[0x0]||_0x4a4aed[_0x305e('0x67')](_0x305e('0xd9')))+_0x305e('0xda')+_0x4aa541+_0x305e('0xdb')),'string'===typeof _0x49b48c&''!==_0x49b48c&&_0x5b9c70['attr'](_0x305e('0xd5'),_0x49b48c),_0x5b9c70[_0x305e('0xdc')](function(){_0x2b56cc[_0x305e('0xa7')]?(_0x4a4aed[_0x305e('0xd0')](!0x0)[_0x305e('0x59')](_0x305e('0xd1'))[_0x305e('0xd2')](_0x498c26[_0x305e('0xd3')]),_0x41e4e6[_0x305e('0xdd')](),_0x16a9cf[_0x305e('0x4c')](_0x305e('0xde'))[_0x305e('0xd0')](!0x0)[_0x305e('0x59')](_0x305e('0xd1'))[_0x305e('0xd2')](_0x498c26[_0x305e('0xd3')]),_0x5b9c70[_0x305e('0xd0')](!0x0)['addClass'](_0x305e('0xd1'))[_0x305e('0xd4')](_0x498c26['speedFade'],0x1),_0x16a9cf[_0x305e('0x4c')]('.vtex-cpSkuImage[data-sku=\x27'+_0x4aa541+'\x27]')[_0x305e('0xd0')](!0x0)['addClass']('qd-visible')[_0x305e('0xd4')](_0x498c26[_0x305e('0xd3')],0x1)):(_0x41e4e6[_0x305e('0xdd')](),_0x2b56cc[_0x305e('0xdf')](_0x16a9cf));}),_0x4e576a[_0x305e('0x76')](_0x5b9c70));};for(var _0x7a9c22 in _0x498c26[_0x305e('0xe0')])'function'!==typeof _0x498c26[_0x305e('0xe0')][_0x7a9c22]&&_0x35a8c0(_0x9ce5f1[_0x305e('0x63')],function(_0x25aaf7){_0x1f56d9(_0x25aaf7[0x0],_0x498c26[_0x305e('0xe0')][_0x7a9c22]);},!0x0);},'setOriginalElements':function(_0x2d4aa4){null!==_0x2b56cc['productOriginalInfo']&&_0x2d4aa4[_0x305e('0xe1')](_0x305e('0xad'))&&(_0x2d4aa4['removeClass'](_0x305e('0xad'))[_0x305e('0x4c')](_0x305e('0x9f'))[_0x305e('0xa4')](_0x2b56cc[_0x305e('0xe2')]),_0x2b56cc[_0x305e('0xdf')](_0x2d4aa4),_0x2b56cc[_0x305e('0xe3')](_0x2d4aa4),_0x2b56cc[_0x305e('0xe4')](_0x2d4aa4));},'setOriginalImg':function(_0x5da416){_0x5da416=_0x5da416[_0x305e('0x4c')](_0x305e('0xe5'));_0x5da416[_0x305e('0x4c')](_0x305e('0xe6'))[_0x305e('0xd0')](!0x0)['fadeOut'](_0x498c26['speedFade']);_0x5da416[_0x305e('0x4c')]('.vtex-cpOriginalImage')[_0x305e('0xd0')](!0x0)[_0x305e('0xd4')](_0x498c26[_0x305e('0xd3')],0x1);},'setOriginalLink':function(_0x2b143d){_0x2b143d[_0x305e('0x4c')](_0x305e('0xe7'))[_0x305e('0x67')]('href',_0x2b56cc[_0x305e('0xe8')]);},'setOriginalSaveText':function(_0x458ffd){_0x458ffd[_0x305e('0x4c')]('.vtex-cpSave')[_0x305e('0xa4')](_0x2b56cc['productOriginalSave'][0x0])[_0x305e('0x67')](_0x305e('0xa5'),_0x2b56cc[_0x305e('0xa3')][0x1]);},'setImgThumb':function(_0x18b76b,_0x2fb5db){var _0x53c0e2=function(_0x164677,_0x1f4448,_0x10d68c){_0x1f4448=_0x2b56cc[_0x305e('0xcd')](_0x164677[0x0],_0x498c26[_0x305e('0xe9')],!0x1,_0x1f4448,_0x10d68c);_0x18b76b[_0x305e('0x59')](_0x305e('0x95'));0x0<_0x1f4448[_0x305e('0x49')]&&(_0x18b76b['css'](_0x305e('0xea'),_0x305e('0xeb')+_0x1f4448[0x0]+'\x27)'),_0x18b76b[_0x305e('0x4c')](_0x305e('0xec'))['append'](_0x305e('0xd8')+_0x1f4448[0x0]+_0x305e('0xed')+(_0x164677[0x0][_0x305e('0x63')]||_0x164677[0x0]['Id'])+_0x305e('0xee')));};_0x498c26[_0x305e('0x88')]&&null!==_0x498c26['thumbByLabel']?_0x35a8c0(_0x2fb5db[0x0][_0x305e('0x63')]||_0x2fb5db[0x0]['Id'],function(_0x3382dc){_0x53c0e2(_0x3382dc,_0x498c26[_0x305e('0xef')],_0x2fb5db[0x0]);},!0x0):_0x53c0e2(_0x2fb5db);},'loadSku':function(_0x348dee,_0x5163dd,_0x49e75f,_0x300444,_0x9d720c,_0x38da0,_0x5e1c9a){_0x498c26[_0x305e('0x88')]?_0xcf559c[_0x305e('0xf0')](this,_0x348dee,_0x5163dd,_0x49e75f,_0x300444,_0x9d720c,_0x38da0,_0x5e1c9a):_0x22e194('Esse\x20método\x20foi\x20descontinuado\x20=/');},'numberFormat':function(_0x57e5e6){for(var _0x8fdb93='',_0x2e1be6=_0x57e5e6['toFixed'](0x2)[_0x305e('0x7f')]('.'),_0x1f75ff=0x0,_0x538e79=_0x2e1be6[0x0][_0x305e('0x7f')]('')[_0x305e('0x49')],_0x4ef322=_0x2e1be6[0x0][_0x305e('0x49')];0x0<_0x4ef322;_0x4ef322--)_0x57e5e6=_0x2e1be6[0x0][_0x305e('0xf1')](_0x4ef322-0x1,0x1),_0x1f75ff++,0x0===_0x1f75ff%0x3&&_0x538e79>_0x1f75ff&&(_0x57e5e6='.'+_0x57e5e6),_0x8fdb93=_0x57e5e6+_0x8fdb93;return _0x8fdb93+','+_0x2e1be6[0x1];},'getImageUrl':function(_0x2277b9,_0x1ec0a,_0x8b1e94,_0x5ecd05,_0x3d51ec){_0x1ec0a=[];var _0x365c05=_0x2277b9[_0x305e('0xf2')]||_0x2277b9[_0x305e('0xf3')];var _0x136cdd=function(_0x225930,_0x3bdb2e){var _0x1b4715=[];if(0x1>_0x225930[_0x305e('0x49')])return _0x22e194(_0x305e('0xf4')+_0x3bdb2e['Id']),_0x1b4715;for(var _0xba82e4 in _0x225930)for(var _0x388366 in _0x225930[_0xba82e4])if(null!==_0x5ecd05&&_0x305e('0x5c')===typeof _0x5ecd05?_0x225930[_0xba82e4][_0x388366]['Name']&&_0x5ecd05[_0x305e('0x1d')]()==_0x225930[_0xba82e4][_0x388366][_0x305e('0x37')]['toLowerCase']():_0x225930[_0xba82e4][_0x388366][_0x305e('0xf5')]){_0x1b4715[_0x305e('0x8c')](_0x225930[_0xba82e4][_0x388366]['Path']);break;}return _0x1b4715;};_0x305e('0x5c')===typeof _0x5ecd05&&(_0x365c05=_0x136cdd(_0x365c05,_0x2277b9),_0x365c05[_0x305e('0x49')]?_0x365c05=_0x365c05[0x0]:(_0x305e('0xe')!==typeof _0x3d51ec&&'undefined'!==typeof _0x3d51ec[_0x305e('0xf2')]?_0x365c05=_0x3d51ec[_0x305e('0xf2')]:(_0x365c05='',_0x376998(_0x305e('0xf6')+_0x2277b9['Id'],_0x305e('0x28'))),_0x376998(_0x305e('0xf7')+_0x2277b9['Id'],_0x305e('0x28'))));_0x8b1e94?_0x1ec0a[_0x305e('0x8c')](_0x498c26['imageUrl'](_0x305e('0x5c')===typeof _0x365c05?_0x365c05:_0x136cdd(_0x365c05,_0x2277b9)[0x0],_0x498c26['imageSize']['width'],_0x498c26[_0x305e('0xcc')][_0x305e('0xf8')]),_0x365c05):_0x1ec0a[_0x305e('0x8c')](_0x498c26[_0x305e('0xf9')](_0x365c05,_0x498c26[_0x305e('0xfa')][_0x305e('0xfb')],_0x498c26[_0x305e('0xfa')][_0x305e('0xf8')]),_0x365c05);return _0x1ec0a;},'setClass':function(_0x2bb662,_0x26e3f9,_0x5d785f){_0x498c26['isSmartCheckout']?_0x2bb662[_0x305e('0x55')](_0x305e('0xfc')+_0x26e3f9[0x0]['skuname'][_0x305e('0x3')](/[^a-zA-Z0-9\-\_]/g,'')):_0x2bb662[_0x305e('0x55')](_0x305e('0xfc')+_0x26e3f9[0x0][_0x305e('0x37')]['replace'](/[^a-zA-Z0-9\-\_]/g,''));},'shelfSetup':function(_0x2b2072){try{_0x2b2072[_0x305e('0x4c')]('a[href=\x27'+_0x2b2072[_0x305e('0x4c')](_0x305e('0x89'))['val']()+'\x27]')['addClass'](_0x305e('0xfd'));var _0x4a1925=null;_0x2b2072['find'](_0x305e('0xfe'))['each'](function(){var _0x2b2072=_0x8fdb93(this);_0x4a1925=null===_0x4a1925?_0x2b2072:_0x4a1925;parseInt(_0x4a1925['attr'](_0x305e('0xfb'))||0x0,0xa)<parseInt(_0x2b2072[_0x305e('0x67')](_0x305e('0xfb'))||0x0,0xa)&&(_0x4a1925=_0x2b2072);});_0x4a1925[_0x305e('0xff')](_0x305e('0x100'));_0x4a1925[_0x305e('0x42')]()[_0x305e('0x55')](_0x305e('0x101'));var _0x27db3e=jQuery(_0x305e('0x102')),_0x55702e=jQuery(_0x305e('0x103')),_0x13924a=_0x2b2072['find'](_0x305e('0xb1'));_0x13924a[_0x305e('0xff')](_0x27db3e);_0x13924a[_0x305e('0x104')](_0x55702e);_0x2b2072[_0x305e('0x4c')]('.qd_cpProductUnavailable')['appendTo'](_0x55702e);_0x55702e[_0x305e('0x104')](_0x27db3e);if(0x1>_0x2b56cc[_0x305e('0x105')]){_0x27db3e=/\sR\$\s[0-9]+,[0-9]{1,2}/i;var _0x13fd88=_0x2b2072[_0x305e('0x4c')]('.vtex-cpSave')['text']();-0x1<_0x13fd88[_0x305e('0x70')](_0x27db3e)&&(_0x498c26['saveText']=_0x13fd88[_0x305e('0x3')](_0x27db3e,_0x305e('0x106')));_0x2b56cc[_0x305e('0x105')]++;}}catch(_0x41e37e){_0x22e194([_0x305e('0x107'),_0x41e37e[_0x305e('0x17')]],_0x305e('0x28'));}}};_0x543a0a=function(_0x5cef75,_0x4fccfb,_0x501651,_0xc86cae){function _0x23be68(_0x298b9e,_0x2e5d56,_0x4d14c5,_0x329727){try{_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')]=_0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')]||{'prod':{},'sku':{}};_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x108')][_0x4d14c5]=_0x298b9e;for(var _0x2f0413 in _0x298b9e[_0x305e('0x109')])_0x305e('0x0')!==typeof _0x298b9e[_0x305e('0x109')][_0x2f0413]&&(_0x374ab7[_0x305e('0x8c')](_0x298b9e[_0x305e('0x109')][_0x2f0413]['sku']+';'+_0x329727),_0x2b56cc[_0x305e('0x99')][_0x298b9e[_0x305e('0x109')][_0x2f0413][_0x305e('0x63')]]=_0x4d14c5,_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')]['sku'][_0x298b9e[_0x305e('0x109')][_0x2f0413][_0x305e('0x63')]]=_0x298b9e['skus'][_0x2f0413],_0x8fdb93[_0x305e('0x2b')]['SkuDataCache'][_0x305e('0x63')][_0x298b9e[_0x305e('0x109')][_0x2f0413][_0x305e('0x63')]][_0x305e('0x8f')]=_0x4d14c5);_0x2e5d56(_0x374ab7);_0x498c26[_0x305e('0x10a')]();_0x8fdb93(window)[_0x305e('0x7c')](_0x305e('0x10b'),this);}catch(_0x58b950){_0x22e194([_0x305e('0x10c'),_0x58b950[_0x305e('0x17')]]);}}function _0x4377b9(_0x10824b,_0x901f5d,_0x1ad9cb){var _0x4b4648=!0x1;if(_0x378250)try{(_0x4b4648=JSON[_0x305e('0x31')](window['qdSessionStorage'][_0x305e('0x23')](_0x305e('0x10d')+_0x901f5d)))&&_0x23be68(_0x4b4648,_0x10824b,_0x901f5d,_0x1ad9cb);}catch(_0x2485ca){_0x22e194(_0x305e('0x10e')+_0x2485ca[_0x305e('0x17')],_0x305e('0x28'));}_0x4b4648||_0x8fdb93['qdAjax']({'url':_0x305e('0x10f')+_0x901f5d,'dataType':_0x305e('0x110'),'success':function(_0x4dc2f2){_0x23be68(_0x4dc2f2,_0x10824b,_0x901f5d,_0x1ad9cb);_0x378250&&window[_0x305e('0x22')]['setItem'](_0x305e('0x10d')+_0x901f5d,JSON[_0x305e('0x9')](_0x4dc2f2),0x78);},'error':function(){_0x22e194(_0x305e('0x111'));},'clearQueueDelay':null});}var _0x374ab7=[];_0x498c26['similarProducts'](_0xc86cae,_0x4fccfb,_0x501651,function(_0x473fa7){if(_0x473fa7)try{var _0x118d61=0x1,_0x2ed5ef=0x0;_0x4377b9(function(_0x543b7a){_0x2ed5ef+=0x1;_0x118d61===_0x2ed5ef&&_0x5cef75(_0x543b7a);},_0x4fccfb,_0x501651);for(var _0xc86cae=0x0;_0xc86cae<_0x473fa7['length']&&(!_0x498c26[_0x305e('0x112')]||_0xc86cae!==_0x498c26[_0x305e('0x5f')]);_0xc86cae++)_0x118d61+=0x1,_0x4377b9(function(_0x2dcbb9){_0x2ed5ef+=0x1;_0x118d61===_0x2ed5ef&&_0x5cef75(_0x2dcbb9);},_0x473fa7[_0xc86cae]['id'],_0x473fa7[_0xc86cae]['url']);}catch(_0x4cd5c5){_0x22e194(_0x4cd5c5['message']);}else _0x4377b9(function(_0x33d6a9){_0x5cef75(_0x33d6a9);},_0x4fccfb,_0x501651);});};_0xcf559c=function(_0x541fc4,_0x14d011,_0x173426,_0x80f73d,_0x200039,_0x47e869,_0x3671f9){_0x2b56cc[_0x305e('0x90')](_0x541fc4,_0x14d011,_0x200039,[_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')][_0x305e('0x63')][_0x14d011]],_0x47e869,_0x3671f9);};_0x35a8c0=function(_0x38278b,_0x37ca63,_0x111633){if(_0x305e('0xe')!==typeof _0x8fdb93[_0x305e('0x2b')]['SkuDataCache'][_0x305e('0x63')][_0x38278b]&&_0x305e('0xe')!==typeof _0x8fdb93[_0x305e('0x2b')]['SkuDataCache'][_0x305e('0x63')][_0x38278b][_0x305e('0x113')])return _0x305e('0x0')===typeof _0x37ca63&&_0x37ca63(_0x8fdb93[_0x305e('0x2b')][_0x305e('0x62')]['sku'][_0x38278b][_0x305e('0x113')]),_0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')][_0x305e('0x63')][_0x38278b]['fullData'];_0x8fdb93['qdAjax']({'url':'/produto/sku/'+_0x38278b,'data':_0x305e('0x110'),'success':function(_0x3201fd){_0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')][_0x305e('0x63')][_0x38278b][_0x305e('0x113')]=_0x3201fd;_0x305e('0x0')===typeof _0x37ca63&&_0x37ca63(_0x8fdb93['QD_coresPrateleira'][_0x305e('0x62')][_0x305e('0x63')][_0x38278b][_0x305e('0x113')]);},'error':function(){_0x22e194(_0x305e('0x114'));},'async':_0x305e('0xe')!==typeof _0x111633?_0x111633:!0x1,'clearQueueDelay':null});return _0x8fdb93['QD_coresPrateleira']['SkuDataCache'][_0x305e('0x63')][_0x38278b]['fullData'];};_0x2b56cc[_0x305e('0x41')]=jQuery(this);_0x2b56cc[_0x305e('0x115')]();_0x498c26['callback']();_0x8fdb93(window)[_0x305e('0x7c')](_0x305e('0x116'),this);return _0x2b56cc[_0x305e('0x41')];}catch(_0x4a087d){_0x22e194([_0x305e('0x117'),_0x4a087d[_0x305e('0x17')]],_0x305e('0x28'));}};}}(this,jQuery));

/*! jQuery UI - v1.12.1 - 2016-10-03 * http://jqueryui.com * Includes: widget.js, keycode.js, widgets/mouse.js, widgets/slider.js * Copyright jQuery Foundation and other contributors; Licensed MIT */
(function (t) { "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery) })(function (t) { t.ui = t.ui || {}, t.ui.version = "1.12.1"; var e = 0, i = Array.prototype.slice; t.cleanData = function (e) { return function (i) { var s, n, o; for (o = 0; null != (n = i[o]); o++)try { s = t._data(n, "events"), s && s.remove && t(n).triggerHandler("remove") } catch (a) { } e(i) } }(t.cleanData), t.widget = function (e, i, s) { var n, o, a, r = {}, l = e.split(".")[0]; e = e.split(".")[1]; var h = l + "-" + e; return s || (s = i, i = t.Widget), t.isArray(s) && (s = t.extend.apply(null, [{}].concat(s))), t.expr[":"][h.toLowerCase()] = function (e) { return !!t.data(e, h) }, t[l] = t[l] || {}, n = t[l][e], o = t[l][e] = function (t, e) { return this._createWidget ? (arguments.length && this._createWidget(t, e), void 0) : new o(t, e) }, t.extend(o, n, { version: s.version, _proto: t.extend({}, s), _childConstructors: [] }), a = new i, a.options = t.widget.extend({}, a.options), t.each(s, function (e, s) { return t.isFunction(s) ? (r[e] = function () { function t() { return i.prototype[e].apply(this, arguments) } function n(t) { return i.prototype[e].apply(this, t) } return function () { var e, i = this._super, o = this._superApply; return this._super = t, this._superApply = n, e = s.apply(this, arguments), this._super = i, this._superApply = o, e } }(), void 0) : (r[e] = s, void 0) }), o.prototype = t.widget.extend(a, { widgetEventPrefix: n ? a.widgetEventPrefix || e : e }, r, { constructor: o, namespace: l, widgetName: e, widgetFullName: h }), n ? (t.each(n._childConstructors, function (e, i) { var s = i.prototype; t.widget(s.namespace + "." + s.widgetName, o, i._proto) }), delete n._childConstructors) : i._childConstructors.push(o), t.widget.bridge(e, o), o }, t.widget.extend = function (e) { for (var s, n, o = i.call(arguments, 1), a = 0, r = o.length; r > a; a++)for (s in o[a]) n = o[a][s], o[a].hasOwnProperty(s) && void 0 !== n && (e[s] = t.isPlainObject(n) ? t.isPlainObject(e[s]) ? t.widget.extend({}, e[s], n) : t.widget.extend({}, n) : n); return e }, t.widget.bridge = function (e, s) { var n = s.prototype.widgetFullName || e; t.fn[e] = function (o) { var a = "string" == typeof o, r = i.call(arguments, 1), l = this; return a ? this.length || "instance" !== o ? this.each(function () { var i, s = t.data(this, n); return "instance" === o ? (l = s, !1) : s ? t.isFunction(s[o]) && "_" !== o.charAt(0) ? (i = s[o].apply(s, r), i !== s && void 0 !== i ? (l = i && i.jquery ? l.pushStack(i.get()) : i, !1) : void 0) : t.error("no such method '" + o + "' for " + e + " widget instance") : t.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + o + "'") }) : l = void 0 : (r.length && (o = t.widget.extend.apply(null, [o].concat(r))), this.each(function () { var e = t.data(this, n); e ? (e.option(o || {}), e._init && e._init()) : t.data(this, n, new s(o, this)) })), l } }, t.Widget = function () { }, t.Widget._childConstructors = [], t.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { classes: {}, disabled: !1, create: null }, _createWidget: function (i, s) { s = t(s || this.defaultElement || this)[0], this.element = t(s), this.uuid = e++ , this.eventNamespace = "." + this.widgetName + this.uuid, this.bindings = t(), this.hoverable = t(), this.focusable = t(), this.classesElementLookup = {}, s !== this && (t.data(s, this.widgetFullName, this), this._on(!0, this.element, { remove: function (t) { t.target === s && this.destroy() } }), this.document = t(s.style ? s.ownerDocument : s.document || s), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this.options = t.widget.extend({}, this.options, this._getCreateOptions(), i), this._create(), this.options.disabled && this._setOptionDisabled(this.options.disabled), this._trigger("create", null, this._getCreateEventData()), this._init() }, _getCreateOptions: function () { return {} }, _getCreateEventData: t.noop, _create: t.noop, _init: t.noop, destroy: function () { var e = this; this._destroy(), t.each(this.classesElementLookup, function (t, i) { e._removeClass(i, t) }), this.element.off(this.eventNamespace).removeData(this.widgetFullName), this.widget().off(this.eventNamespace).removeAttr("aria-disabled"), this.bindings.off(this.eventNamespace) }, _destroy: t.noop, widget: function () { return this.element }, option: function (e, i) { var s, n, o, a = e; if (0 === arguments.length) return t.widget.extend({}, this.options); if ("string" == typeof e) if (a = {}, s = e.split("."), e = s.shift(), s.length) { for (n = a[e] = t.widget.extend({}, this.options[e]), o = 0; s.length - 1 > o; o++)n[s[o]] = n[s[o]] || {}, n = n[s[o]]; if (e = s.pop(), 1 === arguments.length) return void 0 === n[e] ? null : n[e]; n[e] = i } else { if (1 === arguments.length) return void 0 === this.options[e] ? null : this.options[e]; a[e] = i } return this._setOptions(a), this }, _setOptions: function (t) { var e; for (e in t) this._setOption(e, t[e]); return this }, _setOption: function (t, e) { return "classes" === t && this._setOptionClasses(e), this.options[t] = e, "disabled" === t && this._setOptionDisabled(e), this }, _setOptionClasses: function (e) { var i, s, n; for (i in e) n = this.classesElementLookup[i], e[i] !== this.options.classes[i] && n && n.length && (s = t(n.get()), this._removeClass(n, i), s.addClass(this._classes({ element: s, keys: i, classes: e, add: !0 }))) }, _setOptionDisabled: function (t) { this._toggleClass(this.widget(), this.widgetFullName + "-disabled", null, !!t), t && (this._removeClass(this.hoverable, null, "ui-state-hover"), this._removeClass(this.focusable, null, "ui-state-focus")) }, enable: function () { return this._setOptions({ disabled: !1 }) }, disable: function () { return this._setOptions({ disabled: !0 }) }, _classes: function (e) { function i(i, o) { var a, r; for (r = 0; i.length > r; r++)a = n.classesElementLookup[i[r]] || t(), a = e.add ? t(t.unique(a.get().concat(e.element.get()))) : t(a.not(e.element).get()), n.classesElementLookup[i[r]] = a, s.push(i[r]), o && e.classes[i[r]] && s.push(e.classes[i[r]]) } var s = [], n = this; return e = t.extend({ element: this.element, classes: this.options.classes || {} }, e), this._on(e.element, { remove: "_untrackClassesElement" }), e.keys && i(e.keys.match(/\S+/g) || [], !0), e.extra && i(e.extra.match(/\S+/g) || []), s.join(" ") }, _untrackClassesElement: function (e) { var i = this; t.each(i.classesElementLookup, function (s, n) { -1 !== t.inArray(e.target, n) && (i.classesElementLookup[s] = t(n.not(e.target).get())) }) }, _removeClass: function (t, e, i) { return this._toggleClass(t, e, i, !1) }, _addClass: function (t, e, i) { return this._toggleClass(t, e, i, !0) }, _toggleClass: function (t, e, i, s) { s = "boolean" == typeof s ? s : i; var n = "string" == typeof t || null === t, o = { extra: n ? e : i, keys: n ? t : e, element: n ? this.element : t, add: s }; return o.element.toggleClass(this._classes(o), s), this }, _on: function (e, i, s) { var n, o = this; "boolean" != typeof e && (s = i, i = e, e = !1), s ? (i = n = t(i), this.bindings = this.bindings.add(i)) : (s = i, i = this.element, n = this.widget()), t.each(s, function (s, a) { function r() { return e || o.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? o[a] : a).apply(o, arguments) : void 0 } "string" != typeof a && (r.guid = a.guid = a.guid || r.guid || t.guid++); var l = s.match(/^([\w:-]*)\s*(.*)$/), h = l[1] + o.eventNamespace, c = l[2]; c ? n.on(h, c, r) : i.on(h, r) }) }, _off: function (e, i) { i = (i || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, e.off(i).off(i), this.bindings = t(this.bindings.not(e).get()), this.focusable = t(this.focusable.not(e).get()), this.hoverable = t(this.hoverable.not(e).get()) }, _delay: function (t, e) { function i() { return ("string" == typeof t ? s[t] : t).apply(s, arguments) } var s = this; return setTimeout(i, e || 0) }, _hoverable: function (e) { this.hoverable = this.hoverable.add(e), this._on(e, { mouseenter: function (e) { this._addClass(t(e.currentTarget), null, "ui-state-hover") }, mouseleave: function (e) { this._removeClass(t(e.currentTarget), null, "ui-state-hover") } }) }, _focusable: function (e) { this.focusable = this.focusable.add(e), this._on(e, { focusin: function (e) { this._addClass(t(e.currentTarget), null, "ui-state-focus") }, focusout: function (e) { this._removeClass(t(e.currentTarget), null, "ui-state-focus") } }) }, _trigger: function (e, i, s) { var n, o, a = this.options[e]; if (s = s || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], o = i.originalEvent) for (n in o) n in i || (i[n] = o[n]); return this.element.trigger(i, s), !(t.isFunction(a) && a.apply(this.element[0], [i].concat(s)) === !1 || i.isDefaultPrevented()) } }, t.each({ show: "fadeIn", hide: "fadeOut" }, function (e, i) { t.Widget.prototype["_" + e] = function (s, n, o) { "string" == typeof n && (n = { effect: n }); var a, r = n ? n === !0 || "number" == typeof n ? i : n.effect || i : e; n = n || {}, "number" == typeof n && (n = { duration: n }), a = !t.isEmptyObject(n), n.complete = o, n.delay && s.delay(n.delay), a && t.effects && t.effects.effect[r] ? s[e](n) : r !== e && s[r] ? s[r](n.duration, n.easing, o) : s.queue(function (i) { t(this)[e](), o && o.call(s[0]), i() }) } }), t.widget, t.ui.keyCode = { BACKSPACE: 8, COMMA: 188, DELETE: 46, DOWN: 40, END: 35, ENTER: 13, ESCAPE: 27, HOME: 36, LEFT: 37, PAGE_DOWN: 34, PAGE_UP: 33, PERIOD: 190, RIGHT: 39, SPACE: 32, TAB: 9, UP: 38 }, t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()); var s = !1; t(document).on("mouseup", function () { s = !1 }), t.widget("ui.mouse", { version: "1.12.1", options: { cancel: "input, textarea, button, select, option", distance: 1, delay: 0 }, _mouseInit: function () { var e = this; this.element.on("mousedown." + this.widgetName, function (t) { return e._mouseDown(t) }).on("click." + this.widgetName, function (i) { return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0 }), this.started = !1 }, _mouseDestroy: function () { this.element.off("." + this.widgetName), this._mouseMoveDelegate && this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate) }, _mouseDown: function (e) { if (!s) { this._mouseMoved = !1, this._mouseStarted && this._mouseUp(e), this._mouseDownEvent = e; var i = this, n = 1 === e.which, o = "string" == typeof this.options.cancel && e.target.nodeName ? t(e.target).closest(this.options.cancel).length : !1; return n && !o && this._mouseCapture(e) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function () { i.mouseDelayMet = !0 }, this.options.delay)), this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(e) !== !1, !this._mouseStarted) ? (e.preventDefault(), !0) : (!0 === t.data(e.target, this.widgetName + ".preventClickEvent") && t.removeData(e.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function (t) { return i._mouseMove(t) }, this._mouseUpDelegate = function (t) { return i._mouseUp(t) }, this.document.on("mousemove." + this.widgetName, this._mouseMoveDelegate).on("mouseup." + this.widgetName, this._mouseUpDelegate), e.preventDefault(), s = !0, !0)) : !0 } }, _mouseMove: function (e) { if (this._mouseMoved) { if (t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button) return this._mouseUp(e); if (!e.which) if (e.originalEvent.altKey || e.originalEvent.ctrlKey || e.originalEvent.metaKey || e.originalEvent.shiftKey) this.ignoreMissingWhich = !0; else if (!this.ignoreMissingWhich) return this._mouseUp(e) } return (e.which || e.button) && (this._mouseMoved = !0), this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted) }, _mouseUp: function (e) { this.document.off("mousemove." + this.widgetName, this._mouseMoveDelegate).off("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), this._mouseDelayTimer && (clearTimeout(this._mouseDelayTimer), delete this._mouseDelayTimer), this.ignoreMissingWhich = !1, s = !1, e.preventDefault() }, _mouseDistanceMet: function (t) { return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance }, _mouseDelayMet: function () { return this.mouseDelayMet }, _mouseStart: function () { }, _mouseDrag: function () { }, _mouseStop: function () { }, _mouseCapture: function () { return !0 } }), t.widget("ui.slider", t.ui.mouse, { version: "1.12.1", widgetEventPrefix: "slide", options: { animate: !1, classes: { "ui-slider": "ui-corner-all", "ui-slider-handle": "ui-corner-all", "ui-slider-range": "ui-corner-all ui-widget-header" }, distance: 0, max: 100, min: 0, orientation: "horizontal", range: !1, step: 1, value: 0, values: null, change: null, slide: null, start: null, stop: null }, numPages: 5, _create: function () { this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this._calculateNewMax(), this._addClass("ui-slider ui-slider-" + this.orientation, "ui-widget ui-widget-content"), this._refresh(), this._animateOff = !1 }, _refresh: function () { this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue() }, _createHandles: function () { var e, i, s = this.options, n = this.element.find(".ui-slider-handle"), o = "<span tabindex='0'></span>", a = []; for (i = s.values && s.values.length || 1, n.length > i && (n.slice(i).remove(), n = n.slice(0, i)), e = n.length; i > e; e++)a.push(o); this.handles = n.add(t(a.join("")).appendTo(this.element)), this._addClass(this.handles, "ui-slider-handle", "ui-state-default"), this.handle = this.handles.eq(0), this.handles.each(function (e) { t(this).data("ui-slider-handle-index", e).attr("tabIndex", 0) }) }, _createRange: function () { var e = this.options; e.range ? (e.range === !0 && (e.values ? e.values.length && 2 !== e.values.length ? e.values = [e.values[0], e.values[0]] : t.isArray(e.values) && (e.values = e.values.slice(0)) : e.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? (this._removeClass(this.range, "ui-slider-range-min ui-slider-range-max"), this.range.css({ left: "", bottom: "" })) : (this.range = t("<div>").appendTo(this.element), this._addClass(this.range, "ui-slider-range")), ("min" === e.range || "max" === e.range) && this._addClass(this.range, "ui-slider-range-" + e.range)) : (this.range && this.range.remove(), this.range = null) }, _setupEvents: function () { this._off(this.handles), this._on(this.handles, this._handleEvents), this._hoverable(this.handles), this._focusable(this.handles) }, _destroy: function () { this.handles.remove(), this.range && this.range.remove(), this._mouseDestroy() }, _mouseCapture: function (e) { var i, s, n, o, a, r, l, h, c = this, u = this.options; return u.disabled ? !1 : (this.elementSize = { width: this.element.outerWidth(), height: this.element.outerHeight() }, this.elementOffset = this.element.offset(), i = { x: e.pageX, y: e.pageY }, s = this._normValueFromMouse(i), n = this._valueMax() - this._valueMin() + 1, this.handles.each(function (e) { var i = Math.abs(s - c.values(e)); (n > i || n === i && (e === c._lastChangedValue || c.values(e) === u.min)) && (n = i, o = t(this), a = e) }), r = this._start(e, a), r === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = a, this._addClass(o, null, "ui-state-active"), o.trigger("focus"), l = o.offset(), h = !t(e.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = h ? { left: 0, top: 0 } : { left: e.pageX - l.left - o.width() / 2, top: e.pageY - l.top - o.height() / 2 - (parseInt(o.css("borderTopWidth"), 10) || 0) - (parseInt(o.css("borderBottomWidth"), 10) || 0) + (parseInt(o.css("marginTop"), 10) || 0) }, this.handles.hasClass("ui-state-hover") || this._slide(e, a, s), this._animateOff = !0, !0)) }, _mouseStart: function () { return !0 }, _mouseDrag: function (t) { var e = { x: t.pageX, y: t.pageY }, i = this._normValueFromMouse(e); return this._slide(t, this._handleIndex, i), !1 }, _mouseStop: function (t) { return this._removeClass(this.handles, null, "ui-state-active"), this._mouseSliding = !1, this._stop(t, this._handleIndex), this._change(t, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1 }, _detectOrientation: function () { this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal" }, _normValueFromMouse: function (t) { var e, i, s, n, o; return "horizontal" === this.orientation ? (e = this.elementSize.width, i = t.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (e = this.elementSize.height, i = t.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), s = i / e, s > 1 && (s = 1), 0 > s && (s = 0), "vertical" === this.orientation && (s = 1 - s), n = this._valueMax() - this._valueMin(), o = this._valueMin() + s * n, this._trimAlignValue(o) }, _uiHash: function (t, e, i) { var s = { handle: this.handles[t], handleIndex: t, value: void 0 !== e ? e : this.value() }; return this._hasMultipleValues() && (s.value = void 0 !== e ? e : this.values(t), s.values = i || this.values()), s }, _hasMultipleValues: function () { return this.options.values && this.options.values.length }, _start: function (t, e) { return this._trigger("start", t, this._uiHash(e)) }, _slide: function (t, e, i) { var s, n, o = this.value(), a = this.values(); this._hasMultipleValues() && (n = this.values(e ? 0 : 1), o = this.values(e), 2 === this.options.values.length && this.options.range === !0 && (i = 0 === e ? Math.min(n, i) : Math.max(n, i)), a[e] = i), i !== o && (s = this._trigger("slide", t, this._uiHash(e, i, a)), s !== !1 && (this._hasMultipleValues() ? this.values(e, i) : this.value(i))) }, _stop: function (t, e) { this._trigger("stop", t, this._uiHash(e)) }, _change: function (t, e) { this._keySliding || this._mouseSliding || (this._lastChangedValue = e, this._trigger("change", t, this._uiHash(e))) }, value: function (t) { return arguments.length ? (this.options.value = this._trimAlignValue(t), this._refreshValue(), this._change(null, 0), void 0) : this._value() }, values: function (e, i) { var s, n, o; if (arguments.length > 1) return this.options.values[e] = this._trimAlignValue(i), this._refreshValue(), this._change(null, e), void 0; if (!arguments.length) return this._values(); if (!t.isArray(arguments[0])) return this._hasMultipleValues() ? this._values(e) : this.value(); for (s = this.options.values, n = arguments[0], o = 0; s.length > o; o += 1)s[o] = this._trimAlignValue(n[o]), this._change(null, o); this._refreshValue() }, _setOption: function (e, i) { var s, n = 0; switch ("range" === e && this.options.range === !0 && ("min" === i ? (this.options.value = this._values(0), this.options.values = null) : "max" === i && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), t.isArray(this.options.values) && (n = this.options.values.length), this._super(e, i), e) { case "orientation": this._detectOrientation(), this._removeClass("ui-slider-horizontal ui-slider-vertical")._addClass("ui-slider-" + this.orientation), this._refreshValue(), this.options.range && this._refreshRange(i), this.handles.css("horizontal" === i ? "bottom" : "left", ""); break; case "value": this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1; break; case "values": for (this._animateOff = !0, this._refreshValue(), s = n - 1; s >= 0; s--)this._change(null, s); this._animateOff = !1; break; case "step": case "min": case "max": this._animateOff = !0, this._calculateNewMax(), this._refreshValue(), this._animateOff = !1; break; case "range": this._animateOff = !0, this._refresh(), this._animateOff = !1 } }, _setOptionDisabled: function (t) { this._super(t), this._toggleClass(null, "ui-state-disabled", !!t) }, _value: function () { var t = this.options.value; return t = this._trimAlignValue(t) }, _values: function (t) { var e, i, s; if (arguments.length) return e = this.options.values[t], e = this._trimAlignValue(e); if (this._hasMultipleValues()) { for (i = this.options.values.slice(), s = 0; i.length > s; s += 1)i[s] = this._trimAlignValue(i[s]); return i } return [] }, _trimAlignValue: function (t) { if (this._valueMin() >= t) return this._valueMin(); if (t >= this._valueMax()) return this._valueMax(); var e = this.options.step > 0 ? this.options.step : 1, i = (t - this._valueMin()) % e, s = t - i; return 2 * Math.abs(i) >= e && (s += i > 0 ? e : -e), parseFloat(s.toFixed(5)) }, _calculateNewMax: function () { var t = this.options.max, e = this._valueMin(), i = this.options.step, s = Math.round((t - e) / i) * i; t = s + e, t > this.options.max && (t -= i), this.max = parseFloat(t.toFixed(this._precision())) }, _precision: function () { var t = this._precisionOf(this.options.step); return null !== this.options.min && (t = Math.max(t, this._precisionOf(this.options.min))), t }, _precisionOf: function (t) { var e = "" + t, i = e.indexOf("."); return -1 === i ? 0 : e.length - i - 1 }, _valueMin: function () { return this.options.min }, _valueMax: function () { return this.max }, _refreshRange: function (t) { "vertical" === t && this.range.css({ width: "", left: "" }), "horizontal" === t && this.range.css({ height: "", bottom: "" }) }, _refreshValue: function () { var e, i, s, n, o, a = this.options.range, r = this.options, l = this, h = this._animateOff ? !1 : r.animate, c = {}; this._hasMultipleValues() ? this.handles.each(function (s) { i = 100 * ((l.values(s) - l._valueMin()) / (l._valueMax() - l._valueMin())), c["horizontal" === l.orientation ? "left" : "bottom"] = i + "%", t(this).stop(1, 1)[h ? "animate" : "css"](c, r.animate), l.options.range === !0 && ("horizontal" === l.orientation ? (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({ left: i + "%" }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({ width: i - e + "%" }, { queue: !1, duration: r.animate })) : (0 === s && l.range.stop(1, 1)[h ? "animate" : "css"]({ bottom: i + "%" }, r.animate), 1 === s && l.range[h ? "animate" : "css"]({ height: i - e + "%" }, { queue: !1, duration: r.animate }))), e = i }) : (s = this.value(), n = this._valueMin(), o = this._valueMax(), i = o !== n ? 100 * ((s - n) / (o - n)) : 0, c["horizontal" === this.orientation ? "left" : "bottom"] = i + "%", this.handle.stop(1, 1)[h ? "animate" : "css"](c, r.animate), "min" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ width: i + "%" }, r.animate), "max" === a && "horizontal" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ width: 100 - i + "%" }, r.animate), "min" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ height: i + "%" }, r.animate), "max" === a && "vertical" === this.orientation && this.range.stop(1, 1)[h ? "animate" : "css"]({ height: 100 - i + "%" }, r.animate)) }, _handleEvents: { keydown: function (e) { var i, s, n, o, a = t(e.target).data("ui-slider-handle-index"); switch (e.keyCode) { case t.ui.keyCode.HOME: case t.ui.keyCode.END: case t.ui.keyCode.PAGE_UP: case t.ui.keyCode.PAGE_DOWN: case t.ui.keyCode.UP: case t.ui.keyCode.RIGHT: case t.ui.keyCode.DOWN: case t.ui.keyCode.LEFT: if (e.preventDefault(), !this._keySliding && (this._keySliding = !0, this._addClass(t(e.target), null, "ui-state-active"), i = this._start(e, a), i === !1)) return }switch (o = this.options.step, s = n = this._hasMultipleValues() ? this.values(a) : this.value(), e.keyCode) { case t.ui.keyCode.HOME: n = this._valueMin(); break; case t.ui.keyCode.END: n = this._valueMax(); break; case t.ui.keyCode.PAGE_UP: n = this._trimAlignValue(s + (this._valueMax() - this._valueMin()) / this.numPages); break; case t.ui.keyCode.PAGE_DOWN: n = this._trimAlignValue(s - (this._valueMax() - this._valueMin()) / this.numPages); break; case t.ui.keyCode.UP: case t.ui.keyCode.RIGHT: if (s === this._valueMax()) return; n = this._trimAlignValue(s + o); break; case t.ui.keyCode.DOWN: case t.ui.keyCode.LEFT: if (s === this._valueMin()) return; n = this._trimAlignValue(s - o) }this._slide(e, a, n) }, keyup: function (e) { var i = t(e.target).data("ui-slider-handle-index"); this._keySliding && (this._keySliding = !1, this._stop(e, i), this._change(e, i), this._removeClass(t(e.target), null, "ui-state-active")) } } }) });

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function (q) { var e = jQuery; if ("function" !== typeof e.fn.QD_mosaicBanners) { var k = function (c, b) { if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) { var a; "object" === typeof c ? (c.unshift("[Quatro Digital - Mosaic Banners]\n"), a = c) : a = ["[Quatro Digital - Mosaic Banners]\n" + c]; if ("undefined" === typeof b || "alerta" !== b.toLowerCase() && "aviso" !== b.toLowerCase()) if ("undefined" !== typeof b && "info" === b.toLowerCase()) try { console.info.apply(console, a) } catch (f) { try { console.info(a.join("\n")) } catch (d) { } } else try { console.error.apply(console, a) } catch (f) { try { console.error(a.join("\n")) } catch (d) { } } else try { console.warn.apply(console, a) } catch (f) { try { console.warn(a.join("\n")) } catch (d) { } } } }, l = { bannerRowSecurityMargin: 10, containerWidth: 1170, bannerColSecurityMargin: 15, classOneColumn: "col-xs-12", classTwoColumn: "col-xs-12 col-sm-6", classThreeColumn: "col-xs-12 col-sm-4", classFourColumn: "col-xs-6 col-sm-3" }, m = function (c, b) { function a(f) { var d, g = new e; f.length && (f.each(function () { var f = e(this), a = f.offset().top; d || (d = a); if (a >= d - b.bannerRowSecurityMargin && a <= d + b.bannerRowSecurityMargin) g = g.add(f); else return !1 }), g.wrapAll('<div class="row qd-mb-row"></div>'), a(c.find(">div:not(.row)"))) } a(c.find(">div:not(.row)")) }, n = /width\=.?([0-9]+)/i, p = function (c, b) { var a = e(c); a.each(function () { var a = e(this); if (a.is(".qd-mb-banner")) k(["Este banner j\u00e1 esta processado!", a], "info"); else { a.addClass("qd-mb-banner"); var d = a.find("img").first(); if (d.length) { var c = parseInt, d = d.wrap("<span></span>"), h = d.parent().html(); d.unwrap("span"); d = h.replace(/\n/g, " "); c = c((d.match(n) || [1]).pop(), 10) || 1; d = b.containerWidth / 2 * (1 - b.bannerColSecurityMargin / 2 / 100); h = b.containerWidth / 3 * (1 - b.bannerColSecurityMargin / 3 / 100); c > b.containerWidth * (1 - b.bannerColSecurityMargin / 100) ? a.addClass(b.classOneColumn) : c > d ? a.addClass(b.classTwoColumn) : c > h ? a.addClass(b.classThreeColumn) : a.addClass(b.classFourColumn) } else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!", a], "info") } }); a.parent().each(function () { m(e(this), b) }) }; e.fn.QD_mosaicBanners = function (c) { var b = e(this); if (!b.length) return b; c = e.extend({}, l, c); b.qdPlugin = new p(b, c); return b }; e(function () { e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners() }) } })(this);
/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function (a) { "use strict"; "function" == typeof define && define.amd ? define(["jquery"], a) : "undefined" != typeof exports ? module.exports = a(require("jquery")) : a(jQuery) }(function (a) {
	"use strict"; var b = window.Slick || {}; b = function () { function c(c, d) { var f, e = this; e.defaults = { accessibility: !0, adaptiveHeight: !1, appendArrows: a(c), appendDots: a(c), arrows: !0, asNavFor: null, prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>', nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>', autoplay: !1, autoplaySpeed: 3e3, centerMode: !1, centerPadding: "50px", cssEase: "ease", customPaging: function (b, c) { return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c + 1) }, dots: !1, dotsClass: "slick-dots", draggable: !0, easing: "linear", edgeFriction: .35, fade: !1, focusOnSelect: !1, infinite: !0, initialSlide: 0, lazyLoad: "ondemand", mobileFirst: !1, pauseOnHover: !0, pauseOnFocus: !0, pauseOnDotsHover: !1, respondTo: "window", responsive: null, rows: 1, rtl: !1, slide: "", slidesPerRow: 1, slidesToShow: 1, slidesToScroll: 1, speed: 500, swipe: !0, swipeToSlide: !1, touchMove: !0, touchThreshold: 5, useCSS: !0, useTransform: !0, variableWidth: !1, vertical: !1, verticalSwiping: !1, waitForAnimate: !0, zIndex: 1e3 }, e.initials = { animating: !1, dragging: !1, autoPlayTimer: null, currentDirection: 0, currentLeft: null, currentSlide: 0, direction: 1, $dots: null, listWidth: null, listHeight: null, loadIndex: 0, $nextArrow: null, $prevArrow: null, slideCount: null, slideWidth: null, $slideTrack: null, $slides: null, sliding: !1, slideOffset: 0, swipeLeft: null, $list: null, touchObject: {}, transformsEnabled: !1, unslicked: !1 }, a.extend(e, e.initials), e.activeBreakpoint = null, e.animType = null, e.animProp = null, e.breakpoints = [], e.breakpointSettings = [], e.cssTransitions = !1, e.focussed = !1, e.interrupted = !1, e.hidden = "hidden", e.paused = !0, e.positionProp = null, e.respondTo = null, e.rowCount = 1, e.shouldClick = !0, e.$slider = a(c), e.$slidesCache = null, e.transformType = null, e.transitionType = null, e.visibilityChange = "visibilitychange", e.windowWidth = 0, e.windowTimer = null, f = a(c).data("slick") || {}, e.options = a.extend({}, e.defaults, d, f), e.currentSlide = e.options.initialSlide, e.originalSettings = e.options, "undefined" != typeof document.mozHidden ? (e.hidden = "mozHidden", e.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (e.hidden = "webkitHidden", e.visibilityChange = "webkitvisibilitychange"), e.autoPlay = a.proxy(e.autoPlay, e), e.autoPlayClear = a.proxy(e.autoPlayClear, e), e.autoPlayIterator = a.proxy(e.autoPlayIterator, e), e.changeSlide = a.proxy(e.changeSlide, e), e.clickHandler = a.proxy(e.clickHandler, e), e.selectHandler = a.proxy(e.selectHandler, e), e.setPosition = a.proxy(e.setPosition, e), e.swipeHandler = a.proxy(e.swipeHandler, e), e.dragHandler = a.proxy(e.dragHandler, e), e.keyHandler = a.proxy(e.keyHandler, e), e.instanceUid = b++ , e.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, e.registerBreakpoints(), e.init(!0) } var b = 0; return c }(), b.prototype.activateADA = function () { var a = this; a.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" }) }, b.prototype.addSlide = b.prototype.slickAdd = function (b, c, d) { var e = this; if ("boolean" == typeof c) d = c, c = null; else if (0 > c || c >= e.slideCount) return !1; e.unload(), "number" == typeof c ? 0 === c && 0 === e.$slides.length ? a(b).appendTo(e.$slideTrack) : d ? a(b).insertBefore(e.$slides.eq(c)) : a(b).insertAfter(e.$slides.eq(c)) : d === !0 ? a(b).prependTo(e.$slideTrack) : a(b).appendTo(e.$slideTrack), e.$slides = e.$slideTrack.children(this.options.slide), e.$slideTrack.children(this.options.slide).detach(), e.$slideTrack.append(e.$slides), e.$slides.each(function (b, c) { a(c).attr("data-slick-index", b) }), e.$slidesCache = e.$slides, e.reinit() }, b.prototype.animateHeight = function () { var a = this; if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) { var b = a.$slides.eq(a.currentSlide).outerHeight(!0); a.$list.animate({ height: b }, a.options.speed) } }, b.prototype.animateSlide = function (b, c) { var d = {}, e = this; e.animateHeight(), e.options.rtl === !0 && e.options.vertical === !1 && (b = -b), e.transformsEnabled === !1 ? e.options.vertical === !1 ? e.$slideTrack.animate({ left: b }, e.options.speed, e.options.easing, c) : e.$slideTrack.animate({ top: b }, e.options.speed, e.options.easing, c) : e.cssTransitions === !1 ? (e.options.rtl === !0 && (e.currentLeft = -e.currentLeft), a({ animStart: e.currentLeft }).animate({ animStart: b }, { duration: e.options.speed, easing: e.options.easing, step: function (a) { a = Math.ceil(a), e.options.vertical === !1 ? (d[e.animType] = "translate(" + a + "px, 0px)", e.$slideTrack.css(d)) : (d[e.animType] = "translate(0px," + a + "px)", e.$slideTrack.css(d)) }, complete: function () { c && c.call() } })) : (e.applyTransition(), b = Math.ceil(b), e.options.vertical === !1 ? d[e.animType] = "translate3d(" + b + "px, 0px, 0px)" : d[e.animType] = "translate3d(0px," + b + "px, 0px)", e.$slideTrack.css(d), c && setTimeout(function () { e.disableTransition(), c.call() }, e.options.speed)) }, b.prototype.getNavTarget = function () { var b = this, c = b.options.asNavFor; return c && null !== c && (c = a(c).not(b.$slider)), c }, b.prototype.asNavFor = function (b) { var c = this, d = c.getNavTarget(); null !== d && "object" == typeof d && d.each(function () { var c = a(this).slick("getSlick"); c.unslicked || c.slideHandler(b, !0) }) }, b.prototype.applyTransition = function (a) { var b = this, c = {}; b.options.fade === !1 ? c[b.transitionType] = b.transformType + " " + b.options.speed + "ms " + b.options.cssEase : c[b.transitionType] = "opacity " + b.options.speed + "ms " + b.options.cssEase, b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.autoPlay = function () { var a = this; a.autoPlayClear(), a.slideCount > a.options.slidesToShow && (a.autoPlayTimer = setInterval(a.autoPlayIterator, a.options.autoplaySpeed)) }, b.prototype.autoPlayClear = function () { var a = this; a.autoPlayTimer && clearInterval(a.autoPlayTimer) }, b.prototype.autoPlayIterator = function () { var a = this, b = a.currentSlide + a.options.slidesToScroll; a.paused || a.interrupted || a.focussed || (a.options.infinite === !1 && (1 === a.direction && a.currentSlide + 1 === a.slideCount - 1 ? a.direction = 0 : 0 === a.direction && (b = a.currentSlide - a.options.slidesToScroll, a.currentSlide - 1 === 0 && (a.direction = 1))), a.slideHandler(b)) }, b.prototype.buildArrows = function () { var b = this; b.options.arrows === !0 && (b.$prevArrow = a(b.options.prevArrow).addClass("slick-arrow"), b.$nextArrow = a(b.options.nextArrow).addClass("slick-arrow"), b.slideCount > b.options.slidesToShow ? (b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.prependTo(b.options.appendArrows), b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.appendTo(b.options.appendArrows), b.options.infinite !== !0 && b.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" })) }, b.prototype.buildDots = function () { var c, d, b = this; if (b.options.dots === !0 && b.slideCount > b.options.slidesToShow) { for (b.$slider.addClass("slick-dotted"), d = a("<ul />").addClass(b.options.dotsClass), c = 0; c <= b.getDotCount(); c += 1)d.append(a("<li />").append(b.options.customPaging.call(this, b, c))); b.$dots = d.appendTo(b.options.appendDots), b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false") } }, b.prototype.buildOut = function () { var b = this; b.$slides = b.$slider.children(b.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), b.slideCount = b.$slides.length, b.$slides.each(function (b, c) { a(c).attr("data-slick-index", b).data("originalStyling", a(c).attr("style") || "") }), b.$slider.addClass("slick-slider"), b.$slideTrack = 0 === b.slideCount ? a('<div class="slick-track"/>').appendTo(b.$slider) : b.$slides.wrapAll('<div class="slick-track"/>').parent(), b.$list = b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(), b.$slideTrack.css("opacity", 0), (b.options.centerMode === !0 || b.options.swipeToSlide === !0) && (b.options.slidesToScroll = 1), a("img[data-lazy]", b.$slider).not("[src]").addClass("slick-loading"), b.setupInfinite(), b.buildArrows(), b.buildDots(), b.updateDots(), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.options.draggable === !0 && b.$list.addClass("draggable") }, b.prototype.buildRows = function () { var b, c, d, e, f, g, h, a = this; if (e = document.createDocumentFragment(), g = a.$slider.children(), a.options.rows > 1) { for (h = a.options.slidesPerRow * a.options.rows, f = Math.ceil(g.length / h), b = 0; f > b; b++) { var i = document.createElement("div"); for (c = 0; c < a.options.rows; c++) { var j = document.createElement("div"); for (d = 0; d < a.options.slidesPerRow; d++) { var k = b * h + (c * a.options.slidesPerRow + d); g.get(k) && j.appendChild(g.get(k)) } i.appendChild(j) } e.appendChild(i) } a.$slider.empty().append(e), a.$slider.children().children().children().css({ width: 100 / a.options.slidesPerRow + "%", display: "inline-block" }) } }, b.prototype.checkResponsive = function (b, c) { var e, f, g, d = this, h = !1, i = d.$slider.width(), j = window.innerWidth || a(window).width(); if ("window" === d.respondTo ? g = j : "slider" === d.respondTo ? g = i : "min" === d.respondTo && (g = Math.min(j, i)), d.options.responsive && d.options.responsive.length && null !== d.options.responsive) { f = null; for (e in d.breakpoints) d.breakpoints.hasOwnProperty(e) && (d.originalSettings.mobileFirst === !1 ? g < d.breakpoints[e] && (f = d.breakpoints[e]) : g > d.breakpoints[e] && (f = d.breakpoints[e])); null !== f ? null !== d.activeBreakpoint ? (f !== d.activeBreakpoint || c) && (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : (d.activeBreakpoint = f, "unslick" === d.breakpointSettings[f] ? d.unslick(f) : (d.options = a.extend({}, d.originalSettings, d.breakpointSettings[f]), b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b)), h = f) : null !== d.activeBreakpoint && (d.activeBreakpoint = null, d.options = d.originalSettings, b === !0 && (d.currentSlide = d.options.initialSlide), d.refresh(b), h = f), b || h === !1 || d.$slider.trigger("breakpoint", [d, h]) } }, b.prototype.changeSlide = function (b, c) { var f, g, h, d = this, e = a(b.currentTarget); switch (e.is("a") && b.preventDefault(), e.is("li") || (e = e.closest("li")), h = d.slideCount % d.options.slidesToScroll !== 0, f = h ? 0 : (d.slideCount - d.currentSlide) % d.options.slidesToScroll, b.data.message) { case "previous": g = 0 === f ? d.options.slidesToScroll : d.options.slidesToShow - f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide - g, !1, c); break; case "next": g = 0 === f ? d.options.slidesToScroll : f, d.slideCount > d.options.slidesToShow && d.slideHandler(d.currentSlide + g, !1, c); break; case "index": var i = 0 === b.data.index ? 0 : b.data.index || e.index() * d.options.slidesToScroll; d.slideHandler(d.checkNavigable(i), !1, c), e.children().trigger("focus"); break; default: return } }, b.prototype.checkNavigable = function (a) { var c, d, b = this; if (c = b.getNavigableIndexes(), d = 0, a > c[c.length - 1]) a = c[c.length - 1]; else for (var e in c) { if (a < c[e]) { a = d; break } d = c[e] } return a }, b.prototype.cleanUpEvents = function () { var b = this; b.options.dots && null !== b.$dots && a("li", b.$dots).off("click.slick", b.changeSlide).off("mouseenter.slick", a.proxy(b.interrupt, b, !0)).off("mouseleave.slick", a.proxy(b.interrupt, b, !1)), b.$slider.off("focus.slick blur.slick"), b.options.arrows === !0 && b.slideCount > b.options.slidesToShow && (b.$prevArrow && b.$prevArrow.off("click.slick", b.changeSlide), b.$nextArrow && b.$nextArrow.off("click.slick", b.changeSlide)), b.$list.off("touchstart.slick mousedown.slick", b.swipeHandler), b.$list.off("touchmove.slick mousemove.slick", b.swipeHandler), b.$list.off("touchend.slick mouseup.slick", b.swipeHandler), b.$list.off("touchcancel.slick mouseleave.slick", b.swipeHandler), b.$list.off("click.slick", b.clickHandler), a(document).off(b.visibilityChange, b.visibility), b.cleanUpSlideEvents(), b.options.accessibility === !0 && b.$list.off("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().off("click.slick", b.selectHandler), a(window).off("orientationchange.slick.slick-" + b.instanceUid, b.orientationChange), a(window).off("resize.slick.slick-" + b.instanceUid, b.resize), a("[draggable!=true]", b.$slideTrack).off("dragstart", b.preventDefault), a(window).off("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).off("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.cleanUpSlideEvents = function () { var b = this; b.$list.off("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.off("mouseleave.slick", a.proxy(b.interrupt, b, !1)) }, b.prototype.cleanUpRows = function () { var b, a = this; a.options.rows > 1 && (b = a.$slides.children().children(), b.removeAttr("style"), a.$slider.empty().append(b)) }, b.prototype.clickHandler = function (a) { var b = this; b.shouldClick === !1 && (a.stopImmediatePropagation(), a.stopPropagation(), a.preventDefault()) }, b.prototype.destroy = function (b) { var c = this; c.autoPlayClear(), c.touchObject = {}, c.cleanUpEvents(), a(".slick-cloned", c.$slider).detach(), c.$dots && c.$dots.remove(), c.$prevArrow && c.$prevArrow.length && (c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.prevArrow) && c.$prevArrow.remove()), c.$nextArrow && c.$nextArrow.length && (c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), c.htmlExpr.test(c.options.nextArrow) && c.$nextArrow.remove()), c.$slides && (c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () { a(this).attr("style", a(this).data("originalStyling")) }), c.$slideTrack.children(this.options.slide).detach(), c.$slideTrack.detach(), c.$list.detach(), c.$slider.append(c.$slides)), c.cleanUpRows(), c.$slider.removeClass("slick-slider"), c.$slider.removeClass("slick-initialized"), c.$slider.removeClass("slick-dotted"), c.unslicked = !0, b || c.$slider.trigger("destroy", [c]) }, b.prototype.disableTransition = function (a) { var b = this, c = {}; c[b.transitionType] = "", b.options.fade === !1 ? b.$slideTrack.css(c) : b.$slides.eq(a).css(c) }, b.prototype.fadeSlide = function (a, b) { var c = this; c.cssTransitions === !1 ? (c.$slides.eq(a).css({ zIndex: c.options.zIndex }), c.$slides.eq(a).animate({ opacity: 1 }, c.options.speed, c.options.easing, b)) : (c.applyTransition(a), c.$slides.eq(a).css({ opacity: 1, zIndex: c.options.zIndex }), b && setTimeout(function () { c.disableTransition(a), b.call() }, c.options.speed)) }, b.prototype.fadeSlideOut = function (a) { var b = this; b.cssTransitions === !1 ? b.$slides.eq(a).animate({ opacity: 0, zIndex: b.options.zIndex - 2 }, b.options.speed, b.options.easing) : (b.applyTransition(a), b.$slides.eq(a).css({ opacity: 0, zIndex: b.options.zIndex - 2 })) }, b.prototype.filterSlides = b.prototype.slickFilter = function (a) { var b = this; null !== a && (b.$slidesCache = b.$slides, b.unload(), b.$slideTrack.children(this.options.slide).detach(), b.$slidesCache.filter(a).appendTo(b.$slideTrack), b.reinit()) }, b.prototype.focusHandler = function () { var b = this; b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (c) { c.stopImmediatePropagation(); var d = a(this); setTimeout(function () { b.options.pauseOnFocus && (b.focussed = d.is(":focus"), b.autoPlay()) }, 0) }) }, b.prototype.getCurrent = b.prototype.slickCurrentSlide = function () { var a = this; return a.currentSlide }, b.prototype.getDotCount = function () { var a = this, b = 0, c = 0, d = 0; if (a.options.infinite === !0) for (; b < a.slideCount;)++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else if (a.options.centerMode === !0) d = a.slideCount; else if (a.options.asNavFor) for (; b < a.slideCount;)++d, b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; else d = 1 + Math.ceil((a.slideCount - a.options.slidesToShow) / a.options.slidesToScroll); return d - 1 }, b.prototype.getLeft = function (a) { var c, d, f, b = this, e = 0; return b.slideOffset = 0, d = b.$slides.first().outerHeight(!0), b.options.infinite === !0 ? (b.slideCount > b.options.slidesToShow && (b.slideOffset = b.slideWidth * b.options.slidesToShow * -1, e = d * b.options.slidesToShow * -1), b.slideCount % b.options.slidesToScroll !== 0 && a + b.options.slidesToScroll > b.slideCount && b.slideCount > b.options.slidesToShow && (a > b.slideCount ? (b.slideOffset = (b.options.slidesToShow - (a - b.slideCount)) * b.slideWidth * -1, e = (b.options.slidesToShow - (a - b.slideCount)) * d * -1) : (b.slideOffset = b.slideCount % b.options.slidesToScroll * b.slideWidth * -1, e = b.slideCount % b.options.slidesToScroll * d * -1))) : a + b.options.slidesToShow > b.slideCount && (b.slideOffset = (a + b.options.slidesToShow - b.slideCount) * b.slideWidth, e = (a + b.options.slidesToShow - b.slideCount) * d), b.slideCount <= b.options.slidesToShow && (b.slideOffset = 0, e = 0), b.options.centerMode === !0 && b.options.infinite === !0 ? b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2) - b.slideWidth : b.options.centerMode === !0 && (b.slideOffset = 0, b.slideOffset += b.slideWidth * Math.floor(b.options.slidesToShow / 2)), c = b.options.vertical === !1 ? a * b.slideWidth * -1 + b.slideOffset : a * d * -1 + e, b.options.variableWidth === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, b.options.centerMode === !0 && (f = b.slideCount <= b.options.slidesToShow || b.options.infinite === !1 ? b.$slideTrack.children(".slick-slide").eq(a) : b.$slideTrack.children(".slick-slide").eq(a + b.options.slidesToShow + 1), c = b.options.rtl === !0 ? f[0] ? -1 * (b.$slideTrack.width() - f[0].offsetLeft - f.width()) : 0 : f[0] ? -1 * f[0].offsetLeft : 0, c += (b.$list.width() - f.outerWidth()) / 2)), c }, b.prototype.getOption = b.prototype.slickGetOption = function (a) { var b = this; return b.options[a] }, b.prototype.getNavigableIndexes = function () { var e, a = this, b = 0, c = 0, d = []; for (a.options.infinite === !1 ? e = a.slideCount : (b = -1 * a.options.slidesToScroll, c = -1 * a.options.slidesToScroll, e = 2 * a.slideCount); e > b;)d.push(b), b = c + a.options.slidesToScroll, c += a.options.slidesToScroll <= a.options.slidesToShow ? a.options.slidesToScroll : a.options.slidesToShow; return d }, b.prototype.getSlick = function () { return this }, b.prototype.getSlideCount = function () { var c, d, e, b = this; return e = b.options.centerMode === !0 ? b.slideWidth * Math.floor(b.options.slidesToShow / 2) : 0, b.options.swipeToSlide === !0 ? (b.$slideTrack.find(".slick-slide").each(function (c, f) { return f.offsetLeft - e + a(f).outerWidth() / 2 > -1 * b.swipeLeft ? (d = f, !1) : void 0 }), c = Math.abs(a(d).attr("data-slick-index") - b.currentSlide) || 1) : b.options.slidesToScroll }, b.prototype.goTo = b.prototype.slickGoTo = function (a, b) { var c = this; c.changeSlide({ data: { message: "index", index: parseInt(a) } }, b) }, b.prototype.init = function (b) { var c = this; a(c.$slider).hasClass("slick-initialized") || (a(c.$slider).addClass("slick-initialized"), c.buildRows(), c.buildOut(), c.setProps(), c.startLoad(), c.loadSlider(), c.initializeEvents(), c.updateArrows(), c.updateDots(), c.checkResponsive(!0), c.focusHandler()), b && c.$slider.trigger("init", [c]), c.options.accessibility === !0 && c.initADA(), c.options.autoplay && (c.paused = !1, c.autoPlay()) }, b.prototype.initADA = function () { var b = this; b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }), b.$slideTrack.attr("role", "listbox"), b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function (c) { a(this).attr({ role: "option", "aria-describedby": "slick-slide" + b.instanceUid + c }) }), null !== b.$dots && b.$dots.attr("role", "tablist").find("li").each(function (c) { a(this).attr({ role: "presentation", "aria-selected": "false", "aria-controls": "navigation" + b.instanceUid + c, id: "slick-slide" + b.instanceUid + c }) }).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar"), b.activateADA() }, b.prototype.initArrowEvents = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, a.changeSlide), a.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, a.changeSlide)) }, b.prototype.initDotEvents = function () { var b = this; b.options.dots === !0 && b.slideCount > b.options.slidesToShow && a("li", b.$dots).on("click.slick", { message: "index" }, b.changeSlide), b.options.dots === !0 && b.options.pauseOnDotsHover === !0 && a("li", b.$dots).on("mouseenter.slick", a.proxy(b.interrupt, b, !0)).on("mouseleave.slick", a.proxy(b.interrupt, b, !1)) }, b.prototype.initSlideEvents = function () { var b = this; b.options.pauseOnHover && (b.$list.on("mouseenter.slick", a.proxy(b.interrupt, b, !0)), b.$list.on("mouseleave.slick", a.proxy(b.interrupt, b, !1))) }, b.prototype.initializeEvents = function () { var b = this; b.initArrowEvents(), b.initDotEvents(), b.initSlideEvents(), b.$list.on("touchstart.slick mousedown.slick", { action: "start" }, b.swipeHandler), b.$list.on("touchmove.slick mousemove.slick", { action: "move" }, b.swipeHandler), b.$list.on("touchend.slick mouseup.slick", { action: "end" }, b.swipeHandler), b.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, b.swipeHandler), b.$list.on("click.slick", b.clickHandler), a(document).on(b.visibilityChange, a.proxy(b.visibility, b)), b.options.accessibility === !0 && b.$list.on("keydown.slick", b.keyHandler), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), a(window).on("orientationchange.slick.slick-" + b.instanceUid, a.proxy(b.orientationChange, b)), a(window).on("resize.slick.slick-" + b.instanceUid, a.proxy(b.resize, b)), a("[draggable!=true]", b.$slideTrack).on("dragstart", b.preventDefault), a(window).on("load.slick.slick-" + b.instanceUid, b.setPosition), a(document).on("ready.slick.slick-" + b.instanceUid, b.setPosition) }, b.prototype.initUI = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.show(), a.$nextArrow.show()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.show() }, b.prototype.keyHandler = function (a) { var b = this; a.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === a.keyCode && b.options.accessibility === !0 ? b.changeSlide({ data: { message: b.options.rtl === !0 ? "next" : "previous" } }) : 39 === a.keyCode && b.options.accessibility === !0 && b.changeSlide({ data: { message: b.options.rtl === !0 ? "previous" : "next" } })) }, b.prototype.lazyLoad = function () { function g(c) { a("img[data-lazy]", c).each(function () { var c = a(this), d = a(this).attr("data-lazy"), e = document.createElement("img"); e.onload = function () { c.animate({ opacity: 0 }, 100, function () { c.attr("src", d).animate({ opacity: 1 }, 200, function () { c.removeAttr("data-lazy").removeClass("slick-loading") }), b.$slider.trigger("lazyLoaded", [b, c, d]) }) }, e.onerror = function () { c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), b.$slider.trigger("lazyLoadError", [b, c, d]) }, e.src = d }) } var c, d, e, f, b = this; b.options.centerMode === !0 ? b.options.infinite === !0 ? (e = b.currentSlide + (b.options.slidesToShow / 2 + 1), f = e + b.options.slidesToShow + 2) : (e = Math.max(0, b.currentSlide - (b.options.slidesToShow / 2 + 1)), f = 2 + (b.options.slidesToShow / 2 + 1) + b.currentSlide) : (e = b.options.infinite ? b.options.slidesToShow + b.currentSlide : b.currentSlide, f = Math.ceil(e + b.options.slidesToShow), b.options.fade === !0 && (e > 0 && e-- , f <= b.slideCount && f++)), c = b.$slider.find(".slick-slide").slice(e, f), g(c), b.slideCount <= b.options.slidesToShow ? (d = b.$slider.find(".slick-slide"), g(d)) : b.currentSlide >= b.slideCount - b.options.slidesToShow ? (d = b.$slider.find(".slick-cloned").slice(0, b.options.slidesToShow), g(d)) : 0 === b.currentSlide && (d = b.$slider.find(".slick-cloned").slice(-1 * b.options.slidesToShow), g(d)) }, b.prototype.loadSlider = function () { var a = this; a.setPosition(), a.$slideTrack.css({ opacity: 1 }), a.$slider.removeClass("slick-loading"), a.initUI(), "progressive" === a.options.lazyLoad && a.progressiveLazyLoad() }, b.prototype.next = b.prototype.slickNext = function () { var a = this; a.changeSlide({ data: { message: "next" } }) }, b.prototype.orientationChange = function () { var a = this; a.checkResponsive(), a.setPosition() }, b.prototype.pause = b.prototype.slickPause = function () { var a = this; a.autoPlayClear(), a.paused = !0 }, b.prototype.play = b.prototype.slickPlay = function () { var a = this; a.autoPlay(), a.options.autoplay = !0, a.paused = !1, a.focussed = !1, a.interrupted = !1 }, b.prototype.postSlide = function (a) { var b = this; b.unslicked || (b.$slider.trigger("afterChange", [b, a]), b.animating = !1, b.setPosition(), b.swipeLeft = null, b.options.autoplay && b.autoPlay(), b.options.accessibility === !0 && b.initADA()) }, b.prototype.prev = b.prototype.slickPrev = function () { var a = this; a.changeSlide({ data: { message: "previous" } }) }, b.prototype.preventDefault = function (a) { a.preventDefault() }, b.prototype.progressiveLazyLoad = function (b) { b = b || 1; var e, f, g, c = this, d = a("img[data-lazy]", c.$slider); d.length ? (e = d.first(), f = e.attr("data-lazy"), g = document.createElement("img"), g.onload = function () { e.attr("src", f).removeAttr("data-lazy").removeClass("slick-loading"), c.options.adaptiveHeight === !0 && c.setPosition(), c.$slider.trigger("lazyLoaded", [c, e, f]), c.progressiveLazyLoad() }, g.onerror = function () { 3 > b ? setTimeout(function () { c.progressiveLazyLoad(b + 1) }, 500) : (e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), c.$slider.trigger("lazyLoadError", [c, e, f]), c.progressiveLazyLoad()) }, g.src = f) : c.$slider.trigger("allImagesLoaded", [c]) }, b.prototype.refresh = function (b) { var d, e, c = this; e = c.slideCount - c.options.slidesToShow, !c.options.infinite && c.currentSlide > e && (c.currentSlide = e), c.slideCount <= c.options.slidesToShow && (c.currentSlide = 0), d = c.currentSlide, c.destroy(!0), a.extend(c, c.initials, { currentSlide: d }), c.init(), b || c.changeSlide({ data: { message: "index", index: d } }, !1) }, b.prototype.registerBreakpoints = function () { var c, d, e, b = this, f = b.options.responsive || null; if ("array" === a.type(f) && f.length) { b.respondTo = b.options.respondTo || "window"; for (c in f) if (e = b.breakpoints.length - 1, d = f[c].breakpoint, f.hasOwnProperty(c)) { for (; e >= 0;)b.breakpoints[e] && b.breakpoints[e] === d && b.breakpoints.splice(e, 1), e--; b.breakpoints.push(d), b.breakpointSettings[d] = f[c].settings } b.breakpoints.sort(function (a, c) { return b.options.mobileFirst ? a - c : c - a }) } }, b.prototype.reinit = function () { var b = this; b.$slides = b.$slideTrack.children(b.options.slide).addClass("slick-slide"), b.slideCount = b.$slides.length, b.currentSlide >= b.slideCount && 0 !== b.currentSlide && (b.currentSlide = b.currentSlide - b.options.slidesToScroll), b.slideCount <= b.options.slidesToShow && (b.currentSlide = 0), b.registerBreakpoints(), b.setProps(), b.setupInfinite(), b.buildArrows(), b.updateArrows(), b.initArrowEvents(), b.buildDots(), b.updateDots(), b.initDotEvents(), b.cleanUpSlideEvents(), b.initSlideEvents(), b.checkResponsive(!1, !0), b.options.focusOnSelect === !0 && a(b.$slideTrack).children().on("click.slick", b.selectHandler), b.setSlideClasses("number" == typeof b.currentSlide ? b.currentSlide : 0), b.setPosition(), b.focusHandler(), b.paused = !b.options.autoplay, b.autoPlay(), b.$slider.trigger("reInit", [b]) }, b.prototype.resize = function () { var b = this; a(window).width() !== b.windowWidth && (clearTimeout(b.windowDelay), b.windowDelay = window.setTimeout(function () { b.windowWidth = a(window).width(), b.checkResponsive(), b.unslicked || b.setPosition() }, 50)) }, b.prototype.removeSlide = b.prototype.slickRemove = function (a, b, c) { var d = this; return "boolean" == typeof a ? (b = a, a = b === !0 ? 0 : d.slideCount - 1) : a = b === !0 ? --a : a, d.slideCount < 1 || 0 > a || a > d.slideCount - 1 ? !1 : (d.unload(), c === !0 ? d.$slideTrack.children().remove() : d.$slideTrack.children(this.options.slide).eq(a).remove(), d.$slides = d.$slideTrack.children(this.options.slide), d.$slideTrack.children(this.options.slide).detach(), d.$slideTrack.append(d.$slides), d.$slidesCache = d.$slides, void d.reinit()) }, b.prototype.setCSS = function (a) { var d, e, b = this, c = {}; b.options.rtl === !0 && (a = -a), d = "left" == b.positionProp ? Math.ceil(a) + "px" : "0px", e = "top" == b.positionProp ? Math.ceil(a) + "px" : "0px", c[b.positionProp] = a, b.transformsEnabled === !1 ? b.$slideTrack.css(c) : (c = {}, b.cssTransitions === !1 ? (c[b.animType] = "translate(" + d + ", " + e + ")", b.$slideTrack.css(c)) : (c[b.animType] = "translate3d(" + d + ", " + e + ", 0px)", b.$slideTrack.css(c))) }, b.prototype.setDimensions = function () { var a = this; a.options.vertical === !1 ? a.options.centerMode === !0 && a.$list.css({ padding: "0px " + a.options.centerPadding }) : (a.$list.height(a.$slides.first().outerHeight(!0) * a.options.slidesToShow), a.options.centerMode === !0 && a.$list.css({ padding: a.options.centerPadding + " 0px" })), a.listWidth = a.$list.width(), a.listHeight = a.$list.height(), a.options.vertical === !1 && a.options.variableWidth === !1 ? (a.slideWidth = Math.ceil(a.listWidth / a.options.slidesToShow), a.$slideTrack.width(Math.ceil(a.slideWidth * a.$slideTrack.children(".slick-slide").length))) : a.options.variableWidth === !0 ? a.$slideTrack.width(5e3 * a.slideCount) : (a.slideWidth = Math.ceil(a.listWidth), a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0) * a.$slideTrack.children(".slick-slide").length))); var b = a.$slides.first().outerWidth(!0) - a.$slides.first().width(); a.options.variableWidth === !1 && a.$slideTrack.children(".slick-slide").width(a.slideWidth - b) }, b.prototype.setFade = function () { var c, b = this; b.$slides.each(function (d, e) { c = b.slideWidth * d * -1, b.options.rtl === !0 ? a(e).css({ position: "relative", right: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) : a(e).css({ position: "relative", left: c, top: 0, zIndex: b.options.zIndex - 2, opacity: 0 }) }), b.$slides.eq(b.currentSlide).css({ zIndex: b.options.zIndex - 1, opacity: 1 }) }, b.prototype.setHeight = function () { var a = this; if (1 === a.options.slidesToShow && a.options.adaptiveHeight === !0 && a.options.vertical === !1) { var b = a.$slides.eq(a.currentSlide).outerHeight(!0); a.$list.css("height", b) } }, b.prototype.setOption = b.prototype.slickSetOption = function () { var c, d, e, f, h, b = this, g = !1; if ("object" === a.type(arguments[0]) ? (e = arguments[0], g = arguments[1], h = "multiple") : "string" === a.type(arguments[0]) && (e = arguments[0], f = arguments[1], g = arguments[2], "responsive" === arguments[0] && "array" === a.type(arguments[1]) ? h = "responsive" : "undefined" != typeof arguments[1] && (h = "single")), "single" === h) b.options[e] = f; else if ("multiple" === h) a.each(e, function (a, c) { b.options[a] = c }); else if ("responsive" === h) for (d in f) if ("array" !== a.type(b.options.responsive)) b.options.responsive = [f[d]]; else { for (c = b.options.responsive.length - 1; c >= 0;)b.options.responsive[c].breakpoint === f[d].breakpoint && b.options.responsive.splice(c, 1), c--; b.options.responsive.push(f[d]) } g && (b.unload(), b.reinit()) }, b.prototype.setPosition = function () { var a = this; a.setDimensions(), a.setHeight(), a.options.fade === !1 ? a.setCSS(a.getLeft(a.currentSlide)) : a.setFade(), a.$slider.trigger("setPosition", [a]) }, b.prototype.setProps = function () { var a = this, b = document.body.style; a.positionProp = a.options.vertical === !0 ? "top" : "left", "top" === a.positionProp ? a.$slider.addClass("slick-vertical") : a.$slider.removeClass("slick-vertical"), (void 0 !== b.WebkitTransition || void 0 !== b.MozTransition || void 0 !== b.msTransition) && a.options.useCSS === !0 && (a.cssTransitions = !0), a.options.fade && ("number" == typeof a.options.zIndex ? a.options.zIndex < 3 && (a.options.zIndex = 3) : a.options.zIndex = a.defaults.zIndex), void 0 !== b.OTransform && (a.animType = "OTransform", a.transformType = "-o-transform", a.transitionType = "OTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.MozTransform && (a.animType = "MozTransform", a.transformType = "-moz-transform", a.transitionType = "MozTransition", void 0 === b.perspectiveProperty && void 0 === b.MozPerspective && (a.animType = !1)), void 0 !== b.webkitTransform && (a.animType = "webkitTransform", a.transformType = "-webkit-transform", a.transitionType = "webkitTransition", void 0 === b.perspectiveProperty && void 0 === b.webkitPerspective && (a.animType = !1)), void 0 !== b.msTransform && (a.animType = "msTransform", a.transformType = "-ms-transform", a.transitionType = "msTransition", void 0 === b.msTransform && (a.animType = !1)), void 0 !== b.transform && a.animType !== !1 && (a.animType = "transform", a.transformType = "transform", a.transitionType = "transition"), a.transformsEnabled = a.options.useTransform && null !== a.animType && a.animType !== !1 }, b.prototype.setSlideClasses = function (a) {
		var c, d, e, f, b = this; d = b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), b.$slides.eq(a).addClass("slick-current"), b.options.centerMode === !0 ? (c = Math.floor(b.options.slidesToShow / 2), b.options.infinite === !0 && (a >= c && a <= b.slideCount - 1 - c ? b.$slides.slice(a - c, a + c + 1).addClass("slick-active").attr("aria-hidden", "false") : (e = b.options.slidesToShow + a,
			d.slice(e - c + 1, e + c + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === a ? d.eq(d.length - 1 - b.options.slidesToShow).addClass("slick-center") : a === b.slideCount - 1 && d.eq(b.options.slidesToShow).addClass("slick-center")), b.$slides.eq(a).addClass("slick-center")) : a >= 0 && a <= b.slideCount - b.options.slidesToShow ? b.$slides.slice(a, a + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : d.length <= b.options.slidesToShow ? d.addClass("slick-active").attr("aria-hidden", "false") : (f = b.slideCount % b.options.slidesToShow, e = b.options.infinite === !0 ? b.options.slidesToShow + a : a, b.options.slidesToShow == b.options.slidesToScroll && b.slideCount - a < b.options.slidesToShow ? d.slice(e - (b.options.slidesToShow - f), e + f).addClass("slick-active").attr("aria-hidden", "false") : d.slice(e, e + b.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false")), "ondemand" === b.options.lazyLoad && b.lazyLoad()
	}, b.prototype.setupInfinite = function () { var c, d, e, b = this; if (b.options.fade === !0 && (b.options.centerMode = !1), b.options.infinite === !0 && b.options.fade === !1 && (d = null, b.slideCount > b.options.slidesToShow)) { for (e = b.options.centerMode === !0 ? b.options.slidesToShow + 1 : b.options.slidesToShow, c = b.slideCount; c > b.slideCount - e; c -= 1)d = c - 1, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d - b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned"); for (c = 0; e > c; c += 1)d = c, a(b.$slides[d]).clone(!0).attr("id", "").attr("data-slick-index", d + b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned"); b.$slideTrack.find(".slick-cloned").find("[id]").each(function () { a(this).attr("id", "") }) } }, b.prototype.interrupt = function (a) { var b = this; a || b.autoPlay(), b.interrupted = a }, b.prototype.selectHandler = function (b) { var c = this, d = a(b.target).is(".slick-slide") ? a(b.target) : a(b.target).parents(".slick-slide"), e = parseInt(d.attr("data-slick-index")); return e || (e = 0), c.slideCount <= c.options.slidesToShow ? (c.setSlideClasses(e), void c.asNavFor(e)) : void c.slideHandler(e) }, b.prototype.slideHandler = function (a, b, c) { var d, e, f, g, j, h = null, i = this; return b = b || !1, i.animating === !0 && i.options.waitForAnimate === !0 || i.options.fade === !0 && i.currentSlide === a || i.slideCount <= i.options.slidesToShow ? void 0 : (b === !1 && i.asNavFor(a), d = a, h = i.getLeft(d), g = i.getLeft(i.currentSlide), i.currentLeft = null === i.swipeLeft ? g : i.swipeLeft, i.options.infinite === !1 && i.options.centerMode === !1 && (0 > a || a > i.getDotCount() * i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () { i.postSlide(d) }) : i.postSlide(d))) : i.options.infinite === !1 && i.options.centerMode === !0 && (0 > a || a > i.slideCount - i.options.slidesToScroll) ? void (i.options.fade === !1 && (d = i.currentSlide, c !== !0 ? i.animateSlide(g, function () { i.postSlide(d) }) : i.postSlide(d))) : (i.options.autoplay && clearInterval(i.autoPlayTimer), e = 0 > d ? i.slideCount % i.options.slidesToScroll !== 0 ? i.slideCount - i.slideCount % i.options.slidesToScroll : i.slideCount + d : d >= i.slideCount ? i.slideCount % i.options.slidesToScroll !== 0 ? 0 : d - i.slideCount : d, i.animating = !0, i.$slider.trigger("beforeChange", [i, i.currentSlide, e]), f = i.currentSlide, i.currentSlide = e, i.setSlideClasses(i.currentSlide), i.options.asNavFor && (j = i.getNavTarget(), j = j.slick("getSlick"), j.slideCount <= j.options.slidesToShow && j.setSlideClasses(i.currentSlide)), i.updateDots(), i.updateArrows(), i.options.fade === !0 ? (c !== !0 ? (i.fadeSlideOut(f), i.fadeSlide(e, function () { i.postSlide(e) })) : i.postSlide(e), void i.animateHeight()) : void (c !== !0 ? i.animateSlide(h, function () { i.postSlide(e) }) : i.postSlide(e)))) }, b.prototype.startLoad = function () { var a = this; a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && (a.$prevArrow.hide(), a.$nextArrow.hide()), a.options.dots === !0 && a.slideCount > a.options.slidesToShow && a.$dots.hide(), a.$slider.addClass("slick-loading") }, b.prototype.swipeDirection = function () { var a, b, c, d, e = this; return a = e.touchObject.startX - e.touchObject.curX, b = e.touchObject.startY - e.touchObject.curY, c = Math.atan2(b, a), d = Math.round(180 * c / Math.PI), 0 > d && (d = 360 - Math.abs(d)), 45 >= d && d >= 0 ? e.options.rtl === !1 ? "left" : "right" : 360 >= d && d >= 315 ? e.options.rtl === !1 ? "left" : "right" : d >= 135 && 225 >= d ? e.options.rtl === !1 ? "right" : "left" : e.options.verticalSwiping === !0 ? d >= 35 && 135 >= d ? "down" : "up" : "vertical" }, b.prototype.swipeEnd = function (a) { var c, d, b = this; if (b.dragging = !1, b.interrupted = !1, b.shouldClick = b.touchObject.swipeLength > 10 ? !1 : !0, void 0 === b.touchObject.curX) return !1; if (b.touchObject.edgeHit === !0 && b.$slider.trigger("edge", [b, b.swipeDirection()]), b.touchObject.swipeLength >= b.touchObject.minSwipe) { switch (d = b.swipeDirection()) { case "left": case "down": c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide + b.getSlideCount()) : b.currentSlide + b.getSlideCount(), b.currentDirection = 0; break; case "right": case "up": c = b.options.swipeToSlide ? b.checkNavigable(b.currentSlide - b.getSlideCount()) : b.currentSlide - b.getSlideCount(), b.currentDirection = 1 }"vertical" != d && (b.slideHandler(c), b.touchObject = {}, b.$slider.trigger("swipe", [b, d])) } else b.touchObject.startX !== b.touchObject.curX && (b.slideHandler(b.currentSlide), b.touchObject = {}) }, b.prototype.swipeHandler = function (a) { var b = this; if (!(b.options.swipe === !1 || "ontouchend" in document && b.options.swipe === !1 || b.options.draggable === !1 && -1 !== a.type.indexOf("mouse"))) switch (b.touchObject.fingerCount = a.originalEvent && void 0 !== a.originalEvent.touches ? a.originalEvent.touches.length : 1, b.touchObject.minSwipe = b.listWidth / b.options.touchThreshold, b.options.verticalSwiping === !0 && (b.touchObject.minSwipe = b.listHeight / b.options.touchThreshold), a.data.action) { case "start": b.swipeStart(a); break; case "move": b.swipeMove(a); break; case "end": b.swipeEnd(a) } }, b.prototype.swipeMove = function (a) { var d, e, f, g, h, b = this; return h = void 0 !== a.originalEvent ? a.originalEvent.touches : null, !b.dragging || h && 1 !== h.length ? !1 : (d = b.getLeft(b.currentSlide), b.touchObject.curX = void 0 !== h ? h[0].pageX : a.clientX, b.touchObject.curY = void 0 !== h ? h[0].pageY : a.clientY, b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curX - b.touchObject.startX, 2))), b.options.verticalSwiping === !0 && (b.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(b.touchObject.curY - b.touchObject.startY, 2)))), e = b.swipeDirection(), "vertical" !== e ? (void 0 !== a.originalEvent && b.touchObject.swipeLength > 4 && a.preventDefault(), g = (b.options.rtl === !1 ? 1 : -1) * (b.touchObject.curX > b.touchObject.startX ? 1 : -1), b.options.verticalSwiping === !0 && (g = b.touchObject.curY > b.touchObject.startY ? 1 : -1), f = b.touchObject.swipeLength, b.touchObject.edgeHit = !1, b.options.infinite === !1 && (0 === b.currentSlide && "right" === e || b.currentSlide >= b.getDotCount() && "left" === e) && (f = b.touchObject.swipeLength * b.options.edgeFriction, b.touchObject.edgeHit = !0), b.options.vertical === !1 ? b.swipeLeft = d + f * g : b.swipeLeft = d + f * (b.$list.height() / b.listWidth) * g, b.options.verticalSwiping === !0 && (b.swipeLeft = d + f * g), b.options.fade === !0 || b.options.touchMove === !1 ? !1 : b.animating === !0 ? (b.swipeLeft = null, !1) : void b.setCSS(b.swipeLeft)) : void 0) }, b.prototype.swipeStart = function (a) { var c, b = this; return b.interrupted = !0, 1 !== b.touchObject.fingerCount || b.slideCount <= b.options.slidesToShow ? (b.touchObject = {}, !1) : (void 0 !== a.originalEvent && void 0 !== a.originalEvent.touches && (c = a.originalEvent.touches[0]), b.touchObject.startX = b.touchObject.curX = void 0 !== c ? c.pageX : a.clientX, b.touchObject.startY = b.touchObject.curY = void 0 !== c ? c.pageY : a.clientY, void (b.dragging = !0)) }, b.prototype.unfilterSlides = b.prototype.slickUnfilter = function () { var a = this; null !== a.$slidesCache && (a.unload(), a.$slideTrack.children(this.options.slide).detach(), a.$slidesCache.appendTo(a.$slideTrack), a.reinit()) }, b.prototype.unload = function () { var b = this; a(".slick-cloned", b.$slider).remove(), b.$dots && b.$dots.remove(), b.$prevArrow && b.htmlExpr.test(b.options.prevArrow) && b.$prevArrow.remove(), b.$nextArrow && b.htmlExpr.test(b.options.nextArrow) && b.$nextArrow.remove(), b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "") }, b.prototype.unslick = function (a) { var b = this; b.$slider.trigger("unslick", [b, a]), b.destroy() }, b.prototype.updateArrows = function () { var b, a = this; b = Math.floor(a.options.slidesToShow / 2), a.options.arrows === !0 && a.slideCount > a.options.slidesToShow && !a.options.infinite && (a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === a.currentSlide ? (a.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - a.options.slidesToShow && a.options.centerMode === !1 ? (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : a.currentSlide >= a.slideCount - 1 && a.options.centerMode === !0 && (a.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))) }, b.prototype.updateDots = function () { var a = this; null !== a.$dots && (a.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), a.$dots.find("li").eq(Math.floor(a.currentSlide / a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false")) }, b.prototype.visibility = function () { var a = this; a.options.autoplay && (document[a.hidden] ? a.interrupted = !0 : a.interrupted = !1) }, a.fn.slick = function () { var f, g, a = this, c = arguments[0], d = Array.prototype.slice.call(arguments, 1), e = a.length; for (f = 0; e > f; f++)if ("object" == typeof c || "undefined" == typeof c ? a[f].slick = new b(a[f], c) : g = a[f].slick[c].apply(a[f].slick, d), "undefined" != typeof g) return g; return a }
});
/* jQuery Serialize Object */
!function(e){function n(e){var n=e.value||"";return n.length||(n=null),n}e.fn.serializeObject=function(){"use strict";var a={},t=function(t,i){var o=a[i.name];"undefined"!=typeof o&&null!==o?e.isArray(o)?o.push(n(i)):a[i.name]=[o,n(i)]:a[i.name]=n(i)};return e.each(this.serializeArray(),t),a}}(jQuery);
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
// jQuery Mask Plugin v1.6.5
// github.com/igorescobar/jQuery-Mask-Plugin
(function(g){"function"===typeof define&&define.amd?define(["jquery"],g):g(window.jQuery||window.Zepto)})(function(g){var z=function(b,f,d){var l=this,x,y;b=g(b);f="function"===typeof f?f(b.val(),void 0,b,d):f;l.init=function(){d=d||{};l.byPassKeys=[9,16,17,18,36,37,38,39,40,91];l.translation={0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}};l.translation=g.extend({},l.translation,d.translation);l=g.extend(!0,{},l,d);y= c.getRegexMask();b.each(function(){!1!==d.maxlength&&b.attr("maxlength",f.length);d.placeholder&&b.attr("placeholder",d.placeholder);b.attr("autocomplete","off");c.destroyEvents();c.events();var a=c.getCaret();c.val(c.getMasked());c.setCaret(a+c.getMaskCharactersBeforeCount(a,!0))})};var c={getCaret:function(){var a;a=0;var e=b.get(0),c=document.selection,e=e.selectionStart;if(c&&!~navigator.appVersion.indexOf("MSIE 10"))a=c.createRange(),a.moveStart("character",b.is("input")?-b.val().length:-b.text().length), a=a.text.length;else if(e||"0"===e)a=e;return a},setCaret:function(a){if(b.is(":focus")){var e;e=b.get(0);e.setSelectionRange?e.setSelectionRange(a,a):e.createTextRange&&(e=e.createTextRange(),e.collapse(!0),e.moveEnd("character",a),e.moveStart("character",a),e.select())}},events:function(){b.on("keydown.mask",function(){x=c.val()});b.on("keyup.mask",c.behaviour);b.on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},100)});b.on("change.mask",function(){b.data("changeCalled", !0)});b.on("blur.mask",function(a){a=g(a.target);a.prop("defaultValue")!==a.val()&&(a.prop("defaultValue",a.val()),a.data("changeCalled")||a.trigger("change"));a.data("changeCalled",!1)});b.on("focusout.mask",function(){d.clearIfNotMatch&&!y.test(c.val())&&c.val("")})},getRegexMask:function(){var a=[],e,b,c,d,k;for(k in f)(e=l.translation[f[k]])?(b=e.pattern.toString().replace(/.{1}$|^.{1}/g,""),c=e.optional,(e=e.recursive)?(a.push(f[k]),d={digit:f[k],pattern:b}):a.push(c||e?b+"?":b)):a.push("\\"+ f[k]);a=a.join("");d&&(a=a.replace(RegExp("("+d.digit+"(.*"+d.digit+")?)"),"($1)?").replace(RegExp(d.digit,"g"),d.pattern));return RegExp(a)},destroyEvents:function(){b.off("keydown.mask keyup.mask paste.mask drop.mask change.mask blur.mask focusout.mask").removeData("changeCalled")},val:function(a){var e=b.is("input");return 0<arguments.length?e?b.val(a):b.text(a):e?b.val():b.text()},getMaskCharactersBeforeCount:function(a,e){for(var b=0,c=0,d=f.length;c<d&&c<a;c++)l.translation[f.charAt(c)]||(a= e?a+1:a,b++);return b},determineCaretPos:function(a,b,d,h){return l.translation[f.charAt(Math.min(a-1,f.length-1))]?Math.min(a+d-b-h,d):c.determineCaretPos(a+1,b,d,h)},behaviour:function(a){a=a||window.event;var b=a.keyCode||a.which;if(-1===g.inArray(b,l.byPassKeys)){var d=c.getCaret(),f=c.val(),n=f.length,k=d<n,p=c.getMasked(),m=p.length,q=c.getMaskCharactersBeforeCount(m-1)-c.getMaskCharactersBeforeCount(n-1);p!==f&&c.val(p);!k||65===b&&a.ctrlKey||(8!==b&&46!==b&&(d=c.determineCaretPos(d,n,m,q)), c.setCaret(d));return c.callbacks(a)}},getMasked:function(a){var b=[],g=c.val(),h=0,n=f.length,k=0,p=g.length,m=1,q="push",s=-1,r,u;d.reverse?(q="unshift",m=-1,r=0,h=n-1,k=p-1,u=function(){return-1<h&&-1<k}):(r=n-1,u=function(){return h<n&&k<p});for(;u();){var v=f.charAt(h),w=g.charAt(k),t=l.translation[v];if(t)w.match(t.pattern)?(b[q](w),t.recursive&&(-1===s?s=h:h===r&&(h=s-m),r===s&&(h-=m)),h+=m):t.optional&&(h+=m,k-=m),k+=m;else{if(!a)b[q](v);w===v&&(k+=m);h+=m}}a=f.charAt(r);n!==p+1||l.translation[a]|| b.push(a);return b.join("")},callbacks:function(a){var e=c.val(),g=c.val()!==x;if(!0===g&&"function"===typeof d.onChange)d.onChange(e,a,b,d);if(!0===g&&"function"===typeof d.onKeyPress)d.onKeyPress(e,a,b,d);if("function"===typeof d.onComplete&&e.length===f.length)d.onComplete(e,a,b,d)}};l.remove=function(){var a=c.getCaret(),b=c.getMaskCharactersBeforeCount(a);c.destroyEvents();c.val(l.getCleanVal()).removeAttr("maxlength");c.setCaret(a-b)};l.getCleanVal=function(){return c.getMasked(!0)};l.init()}; g.fn.mask=function(b,f){this.unmask();return this.each(function(){g(this).data("mask",new z(this,b,f))})};g.fn.unmask=function(){return this.each(function(){try{g(this).data("mask").remove()}catch(b){}})};g.fn.cleanVal=function(){return g(this).data("mask").getCleanVal()};g("*[data-mask]").each(function(){var b=g(this),f={};"true"===b.attr("data-mask-reverse")&&(f.reverse=!0);"false"===b.attr("data-mask-maxlength")&&(f.maxlength=!1);"true"===b.attr("data-mask-clearifnotmatch")&&(f.clearIfNotMatch= !0);b.mask(b.attr("data-mask"),f)})});

// jQuery Zoom 3.0.8
// github.com/jackmoore/zoom
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,r,a,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(a=c,r=u):(a=d.outerWidth(),r=d.outerHeight()),m=(e.width-c)/a,l=(e.height-u)/r,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,r),0),t=Math.max(Math.min(t,a),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),r=document.createElement("img"),a=o(r),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,r.onload=null,a.remove()}.bind(this,i.style.position,i.style.overflow)),r.onload=function(){function t(t){f.init(),f.move(t),a.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(r):!1)}function n(){a.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(r):!1)}var f=o.zoom(i,u,r,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(r)},r.setAttribute("role","presentation"),r.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);