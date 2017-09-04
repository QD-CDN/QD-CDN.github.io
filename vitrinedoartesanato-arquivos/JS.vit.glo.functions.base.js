/**
* Funções base
*/
String.prototype.trim || (String.prototype.trim = function () { return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "") });
"function" != typeof String.prototype.capitalize && (String.prototype.capitalize = function () { return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase() });
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function () { var b = { "\u00e7": "c", "\u00e6": "ae", "\u0153": "oe", "\u00e1": "a", "\u00e9": "e", "\u00ed": "i", "\u00f3": "o", "\u00fa": "u", "\u00e0": "a", "\u00e8": "e", "\u00ec": "i", "\u00f2": "o", "\u00f9": "u", "\u00e4": "a", "\u00eb": "e", "\u00ef": "i", "\u00f6": "o", "\u00fc": "u", "\u00ff": "y", "\u00e2": "a", "\u00ea": "e", "\u00ee": "i", "\u00f4": "o", "\u00fb": "u", "\u00e5": "a", "\u00e3": "a", "\u00f8": "o", "\u00f5": "o", u: "u", "\u00c1": "A", "\u00c9": "E", "\u00cd": "I", "\u00d3": "O", "\u00da": "U", "\u00ca": "E", "\u00d4": "O", "\u00dc": "U", "\u00c3": "A", "\u00d5": "O", "\u00c0": "A", "\u00c7": "C" }; return this.replace(/[\u00e0-\u00fa]/ig, function (a) { return "undefined" != typeof b[a] ? b[a] : a }) });
Array.prototype.indexOf || (Array.prototype.indexOf = function (d, e) { var a; if (null == this) throw new TypeError('"this" is null or not defined'); var c = Object(this), b = c.length >>> 0; if (0 === b) return -1; a = +e || 0; Infinity === Math.abs(a) && (a = 0); if (a >= b) return -1; for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) { if (a in c && c[a] === d) return a; a++ } return -1 });

try {
	var Common = {
		run: function () { },
		init: function () {
			Common.qdOverlay();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.dropDownOverlay();
			Common.applySmartCart();
			Common.applyCarouselShelf();
			Common.openSearchModal();
			Common.setDataScrollToggle();
			Common.saveAmountFix();
			Common.vtexBindQuickViewDestroy();
			Common.showFooterLinks();
			Common.applyTipBarCarousel();
			Common.callcenterBodyClass();
			Common.openModalVideoInstitutional();
			Common.sendFooterNewsletter();
		},
		ajaxStop: function () {
			Common.appendSkuPopUpCloseBtn();
			Common.saveAmountFix();
		},
		windowOnload: function () {
			Common.facebookLikebox();
		},
		openModalVideoInstitutional: function() {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('component-qd-v1-video-modal');
				var $t = $(this);
				var videoId = ($t.attr('href').match(videoRegex) || ['']).pop();

				modal.find('.modal-header').append('<h2 class="modal-title">' + $t.find('img').attr('alt') + '</h2>');
				$('<iframe src="' + 'https://www.youtube.com/embed/' + videoId + '?wmode=transparent&rel=0" frameborder="0"></iframe>').appendTo(modal.find('.modal-body'));
				modal.modal();

				modal.on('hidden.bs.modal', function() {
					modal.remove();
				});
			});
		},
		sendFooterNewsletter: function () {
			// Formulário
			var form = $('#form-newsletter');
			var jsnomeLoja = 'vitrinedoartesanato';
			var entity = 'NL';
			var emailInput = form.find("[name=qd_email]");

			form.validate({
				rules: {
					email: {
						email: true
					}
				},
				submitHandler: function(form) {
					var $form = $(form);
					if (!$form.valid()) return;
					var inputs = $form.find('[name]');
					emailInput = emailInput.filter(inputs);
					$form.addClass("qd-loading");
					var saveContact = function(userId) {
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
						var formData = $form.serializeObject();
						var sendData = function(ip) {
							formData['userId'] = userId;
							formData['ip'] = ip;
							formData['id'] = (emailInput.val() || '').toLowerCase().replace(/[^a-z0-9]/ig, function(v) {
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
								success: function(data) {
									$form.addClass("qd-form-success");
									$form.trigger('QD.crmSuccess', [data]);
								},
								error: function() {
									alert("Desculpe, não foi possível enviar seu formulário!");
								},
								complete: function() {
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
						success: function(data) {
							if (data.length) saveContact(data[0].id);
							else saveContact(null);
						},
						error: function() {
							saveContact(null);
						}
					});
					return false;
				},
				errorPlacement: function(error, element) {}
			});

			$(window).on('QD.crmSuccess', function (e, data) {

				var msg = 'Obrigado, em breve você receberá muitas novidades!';
				if ($(window).width() < 768)
					msg = 'Obrigado!'

				emailInput.val(msg);
				window.setTimeout(function() {
					emailInput.val('');
				}, 6000);
			});
		},
		callcenterBodyClass: function() {
			vtexjs.checkout.getOrderForm().done(function() {
				if(vtexjs.checkout.orderForm && vtexjs.checkout.orderForm.userType && vtexjs.checkout.orderForm.userType == 'callCenterOperator')
					$(document.body).addClass('qd-callcenter-operator');
			});
		},
		vtexBindQuickViewDestroy: function () {
			window.bindQuickView = function () { };
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function () {
			$('.components-qd-v1-overlay').click(function () {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		appendSkuPopUpCloseBtn: function () {
			var wrapper = $('.boxPopUp2 .selectSkuTitle:not(.qd-on)');
			wrapper.addClass('qd-on').append($('<span class="modal-qd-v1-box-popup-close">Fechar</span>').click(function () {
				$(window).trigger('vtex.modal.hide');
				wrapper.removeClass('.qd-on');
				return false;
			}));
		},
		facebookLikebox: function () {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/vitrinedoartesanato/" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/vitrinedoartesanato/">Vitrine do Artesanato</a></blockquote></div></div>');
		},
		applyAmazingMenu: function () {
			$('.header-qd-v1-amazing-menu, .footer-qd-v1-menu-list').QD_amazingMenu();

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

			$('.header-qd-v1-close-amazing-menu-mobile').click(function (evt) {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
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
					buyButton: "body .prateleira:not(.qd-am) .buy-button"
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
		openSearchModal: function () {
			$('.header-qd-v1-action-search').click(function () {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		saveAmountFix: function () {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function () {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		setDataScrollToggle: function () {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-links-wrapper > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applyCarouselShelf: function () {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});

			wrapper.addClass('qd-slick-loading').slick({
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
			}).removeClass('qd-slick-loading');
		},
		applyTipBarCarousel: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: true,
				draggable: false,
				responsive: [
					{
						breakpoint: 1366,
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
					return { slidesToShow: 2 };
				return {};
			})()));
		},
		dropDownOverlay: function () {
			$('.qd-am-dropdown').hover(
				function () {
					$('.dropdown-overlay').first().addClass("ol-on");
				},
				function () {
					$('.dropdown-overlay').first().removeClass("ol-on");
				}
			);
		}
	};

	var Home = {
		init: function () {
			// Home.openModalVideoInstitutional();
			Home.sliderFull();
			Home.applyBrandCarousel();
			Home.applyMosaicCategorieBanners();
			Home.applySpecialShelfCarousel();
			Home.tabShelfCarousel();
			Home.applyMosaicHighlightBanners();
		},
		ajaxStop: function () { },
		windowOnload: function () { },
		openModalVideoInstitutional: function () {
			var modal = $('.modal-qd-v1-home-video');
			var video = $('.modal-qd-v1-home-video-wrapper').html();

			$('.banner-qd-v1-video, .institucional-qd-v1-modal-video-link').click(function (e) {
				modal.modal('show');
				return false;
			});

			$('body').on('hidden.bs.modal', '.modal', function () {
				modal.remove();
				$('.modal-qd-v1-home-video-wrapper').append(video);
			});
		},
		sliderFull: function () {
			var wrapper = $('.slider-qd-v1-full');

			if (wrapper.find('.box-banner').length < 1)
				return;

			wrapper.slick({
				autoplay: true,
				dots: true,
				fade: true,
				arrows: false,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});

			wrapper.each(function () {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyBrandCarousel: function () {
			var wrapper = $('.brand-carousel-qd-v1-carousel');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: true,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

					{
						breakpoint: 550,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		applyMosaicCategorieBanners: function () {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: -30,
				containerWidth: 1336,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		applySpecialShelfCarousel: function () {
			var wrapper = $('.home-qd-v1-special-carousel-banner');

			if (!wrapper.length)
				return false;


			var hasBanner = wrapper.find('.box-banner').length;
			if (!hasBanner)
				wrapper.find('[class*="col-md-"]').removeClass().addClass('col-xs-12');

			wrapper.find('.slick-initialized').slick('unslick');
			var shelves = wrapper.find('.prateleira');
			shelves.each(function () {
				var $t = $(this);
				$t.find('h2').prependTo(wrapper);
			});

			var slideQtd = hasBanner ? 2 : 4;

			shelves.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slideQtd,
				slidesToScroll: slideQtd,
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
		tabShelfCarousel: function () {
			var wrapper = $('.tabs-qd-v1-carousel-wrapper');
			var shelves = wrapper.find('.prateleira');

			wrapper.find('h2').each(function () {
				var $t = $(this);
				var text = $t.text().toLowerCase().replace(/ /g, '-');
				$t.wrap('<a class="qd-tab-item" href="#' + text + '" />');
				$t.parent().nextAll('.prateleira').first().attr('id', text).addClass('tab-pane');
			}).parent().appendTo(wrapper.find('.tabs-qd-v1-links')).click(function (e) {
				e.preventDefault();
				var $t = $(this).addClass('active');
				$t.siblings('a').removeClass('active');
				shelves.filter('.slick-initialized').slick('unslick');
				$t.tab('show');
				Common.applyCarouselShelf();
			}).first().click();

			wrapper.find('.carousel-qd-v1-shelf').addClass('tab-content');
		},
		applyMosaicHighlightBanners: function () {
			$('.home-highlight-banner-qd-v1-wrapper .mosaic-qd-v1-banners .box-banner').QD_mosaicBanners({
				containerWidth: 690
			});
		}
	};

	var Search = {
		init: function () {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
			// Search.showSearchNavigatorFilters();
			Search.smartResearchInit();
			Search.hideEmptyH();
			Home.sliderFull();

		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {
			Search.shelfLineFix();
		},
		openFiltersMenu: function () {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').appendTo('.navigation-tabs');
			});

			$('.navigation').prepend('<span class="search-qd-v1-navigator-close visible-xs visible-sm">'+
				'<i class="fa fa-times-circle" aria-hidden="true"></i>'+
				'</span>');

			$('.navigation-tabs').prepend('<span class="search-qd-v1-navigator-close visible-xs visible-sm">'+
				'<i class="fa fa-times-circle" aria-hidden="true"></i>'+
				'</span>');

			$('.search-qd-v1-navigator-close').click(function() {
				$(document.body).removeClass('qd-sn-on');
			});
		},
		showSearchNavigatorFilters: function () {
			$('.search-qd-v1-navigator h3, .search-qd-v1-navigator h4, .search-qd-v1-navigator h5').each(function () {
				var $t = $(this);

				if (!$t.next('div, ul').children().length)
					return;

				$('<span class="arrow"><i class="fa fa-caret-up"></i></span>').click(function (e) {
					e.preventDefault();
					$t.toggleClass('qd-is-visible').next('div, ul').stop(true, true).slideToggle();
				}).appendTo($t);
			});
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
				// Olhando tbm para o Infinity Scroll
				if(!window.qd_shelf_line_fix_is){
					$(window).on("QuatroDigital.is_Callback", exec);
					window.qd_shelf_line_fix_is = true;
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
		smartResearchInit: function () {
			$('.search-qd-v1-navigator').css('display', 'none');
			$(".search-qd-v1-navigator input[type='checkbox']").QD_SmartResearch({
				insertMenuAfter: ".search-multiple-navigator",
				filterScrollTop: function (shelfOffset) {
					return (shelfOffset.top - 200);
				}
			});
			$('.search-qd-v1-navigator').css('display', 'block');
		},
		hideExtendedMenu: function () {
			$(".search-qd-v1-navigator ul").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				li = t.find(">li");
				qtt = 5;

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
			var wrapperSingle = $(".search-single-navigator");
			// wrapperSingle.find('h3, h4, h5').toggleClass('qd-seach-active-menu');
			wrapperSingle.find('h3, h4, h5').find("+ div").stop(true, true).slideToggle();

			var wrapper = $(".search-single-navigator, .search-multiple-navigator");

			wrapper.find('h3, h4, h5').toggleClass('qd-seach-active-menu');
			// wrapper.find('h3, h4, h5').find("+ ul").stop(true, true).slideToggle();

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

			$(".menu-departamento div").each(function () {
				var t, label, qtt, moreLinkFilter, moreLabel, click, labelHide;

				t = $(this);
				label = t.find(">label");
				qtt = 5;

				if (label.length <= qtt) return;

				labelHide = label.filter(":gt(" + (qtt - 1) + ")").stop(true, true).hide();
				moreLink = $('<a class="qd-viewMoreMenu">Mostrar mais</a>');
				t.after(moreLink);
				moreLi = $('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais filtros</a></li>');
				t.append(moreLi);

				click = function () {
					labelHide.stop(true, true).slideToggle(0, function () {
						if (label.filter(":visible").length > qtt) {
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

		},
		hideEmptyH: function(){
			var h = $(".qd-seach-active-menu");

			h.each(function () {
				var emptyH = $(this).find("+ ul");
				console.log(emptyH.length);
				if (emptyH.length > 0 && emptyH.text().trim() == "") {
					$(this).hide();
				}
			});
		}
	};

	var Product = {
		run: function () {
			$(window).on('skuSelectable.vtex', function() {
				$(function(){
					Product.applyCarouselThumb();
					Product.forceImageZoom();
				});
			});

			$(window).on('skuSelected.vtex', function() {
				$(function(){
					Product.applyCarouselThumb();
					Product.forceImageZoom();
				});
			});
			$(window).on('QuatroDigital.ssa.skuSelected', function() {
				$(function(){
					Product.applyCarouselThumb();
					Product.forceImageZoom();
				});
			});
		},
		init: function () {
			// Product.qdForceRadioSkuSelector();
			Product.setAvailableBodyClass();
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
			Product.openShipping();
			Product.doublePrice();
			Product.showFloatingBuyBar();
			Product.saveAmountFlag();
			Product.scrollToDescription();
			Product.seeInstalments();
			Product.applyCarouselCategories();
			Product.applyCarouselShelfV2();
			Product.smartStockInit();
			Product.applyCarouselThumb(); 
			Product.forceImageZoom();
		},
		ajaxStop: function () { },
		windowOnload: function () {
			Product.tooltipActivate();

		},
		smartStockInit: function(){
			$('.qd_smart_stock_available').QD_smartStockAvailable();
		},

		setAvailableBodyClass: function () {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
					$(".descontoswestpress").hide();
			}

			/* Esconde Div de especificação caso ela esteja vazia */
			if ($("div#caracteristicas").is(":empty")) { $('.product-qd-v1-specification').addClass("hidden"); }


			$(document).on("skuSelected.vtex", function (e, id, sku) {
				checkVisibleNotify(sku.available);
			});

			checkVisibleNotify(skuJson.available);
		},
		tooltipActivate: function () {
			$('[data-toggle="tooltip"]').tooltip();
		},
		qdForceRadioSkuSelector: function () {
			try {
				if (skuJson.dimensions.length)
					return;

				window.skuJson_0.displayMode = 'especificacao';

				var variations = [];
				for (var l = 0; l < skuJson_0.skus.length; l++) {
					window.skuJson_0.skus[l].dimensions = { 'Variação': window.skuJson_0.skus[l].skuname };
					variations.push(window.skuJson_0.skus[l].skuname);
				}
				window.skuJson_0.dimensions = ['Variação'];
				window.skuJson_0.dimensionsMap = { 'Variação': variations };

				var skuWrapper = $('.product-qd-v1-sku-selection').prepend('<div class="sku-selector-container-0"></div>');
				$('.sku-selector-container-0').skuSelector(skuJson_0, { forceInputType: 'radio', selectSingleDimensionsOnOpening: 'true' });

				var buyButtonWrapper = $('.product-qd-v1-buy-button');
				$('<a href="" class="buy-button buy-button-ref">Comprar</a>').prependTo(buyButtonWrapper).buyButton(skuJson.productId, { salesChannel: jssalesChannel }, {});
				$('<div class="product-qd-v1-notify-me"></div>').appendTo(buyButtonWrapper).notifyMe(skuJson.productId, ((window.notifyMeOptions || {}).sku = null));

				skuWrapper.find('.sku-selector +label').each(function (index, el) {
					$(this).wrapInner('<span class="product-qd-v1-sku-text"></span>').prepend('<span class="product-qd-v1-sku-img"><img src="' + skuJson.skus[index].image.replace(/(ids\/[0-9]+)\-[0-9]+\-[0-9]+/, '$1-50-50') + '" /></span>');
				});

				$('<div class="plugin-preco"></div>').appendTo('.product-qd-v1-price').price(skuJson.productId);

				skuWrapper.find('.sku-selector:not(.item_unavailable):first()').click();

				window.skuJson = window.skuJson_0;
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
		},
		saveAmountFlag: function () {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function (e, sku, data) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (data.listPrice > data.bestPrice)
					flag.text(parseInt(100 - data.bestPrice / data.listPrice * 100) + "%").show();
				else
					flag.hide();
			});

			if (skuJson.skus.length >= 1) {
				if (!flag.length)
					flag = $('<div class="product-qd-v1-stamps-highlight-discount"></div>').prependTo('.product-qd-v1-stamps');

				if (skuJson.skus[0].listPrice > skuJson.skus[0].bestPrice)
					flag.text(parseInt(100 - skuJson.skus[0].bestPrice / skuJson.skus[0].listPrice * 100) + "%").show();
			}
		},
		scrollToDescription: function () {
			$('.product-qd-v1-link-description').click(function (e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top - 100
				}, 900, 'swing');
			});
		},
		doublePrice: function () {
			var row = $('.product-qd-v1-box-quantity').clone().addClass('product-qd-v1-double-size qd-show');
			row.find('script').remove();
			row.insertBefore($('.product-floating-bar-smart-qtt'));

			Product.applySmartQuantity();
		},
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 30;
			var elem = $(".product-floating-bar-buy");

			var $w = $(window).scroll(function () {

				if ($w.scrollTop() > targetOffset) {
					elem.addClass("active");
				}
				else {
					elem.removeClass("active");
				}

			});
		},
		accessoriesFix: function () {
			$('fieldset >.buy-product-checkbox').parent().each(function () {
				var $t = $(this);
				$t.add($t.prev('ul')).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
			});
		},
		accessoriesApplyCarousel: function () {
			var item = $('.accessories-qd-v1-item');

			if (!item.length)
				return;

			item.wrapAll('<div class="accessories-qd-v1-carousel"></div>');

			$('.accessories-qd-v1-carousel').slick({
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
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		applyCarouselCategories: function () {
			var wrapper = $('.carousel-qd-v1-categories').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});

			wrapper.addClass('qd-slick-loading').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1520,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
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
							centerMode: true,
							centerPadding: '50px'
						}
					}
				]
			}).removeClass('qd-slick-loading');
		},
		applyCarouselShelfV2: function () {
			var wrapper = $('.carousel-qd-v2-shelf .prateleira').not('.slick-initialized');

			if (!wrapper.length)
				return false;

			wrapper.has('h2').each(function () {
				var $t = $(this);
				$t.find('h2').insertBefore($t);
			});

			wrapper.addClass('qd-slick-loading').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: true,
				draggable: false,
				speed: 700,
				responsive: [
					{
						breakpoint: 1200,
						settings: {
							slidesToShow: 4,
							slidesToScroll: 4
						}
					},

					{
						breakpoint: 991,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},

					{
						breakpoint: 550,
						settings: {
							slidesToShow: 1,
							centerMode: true,
							centerPadding: '50px'
						}
					}
				]
			}).removeClass('qd-slick-loading');
		},
		applySmartQuantity: function () {
			$('.product-qd-v1-sku-selection-box, .product-floating-bar-buy').QD_smartQuantity();

			$(window).on("skuSelected.vtex", function (e, id, data) {
				$('.qd-sq-more, .qd-sq-minus').click();
			});
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
		seeInstalments: function () {
			$('.product-qd-v1-see-installments').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-installments-method').toggleClass('qd-is-visible');
			});
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
				$t.attr('src', $t.attr('src').replace('-60-60', '-155-155'));
			});

			sliderWrapper.empty();
			vtexThumbs.find('a').each(function (index) {
				$t = $(this);
				$('<div class="qd-slide qd-product-image-' + index + '"><a href="' + $t.attr('rel').replace('-292-292', '-640-640') + '"><img src="' + $t.attr('rel').replace('-292-292', '-640-640') + '"/></a></div>').appendTo(sliderWrapper);
			});

			var options = {
				slidesToShow: 1,
				slidesToScroll: 1
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
			if (!thumbsWrapper.find('.ON').length) thumbsWrapper.find('li >a:eq(0)').addClass('ON');

			thumb.each(function (index) {
				$(this).click(function () {
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
		openShipping: function () {
			if (typeof window.ShippingValue === "function")
				window.ShippingValue();
		},
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


/* Quatro Digital Newsletter // 5.1 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
// (function(){var d=jQuery;if("function"!==typeof d.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
// timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(d,k){}};d.fn.QD_news=function(r){var k=function(a,f){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD News]\n"),b=a):b=["[QD News]\n"+a];if("undefined"===typeof f||"alerta"!==f.toLowerCase()&&"aviso"!==f.toLowerCase())if("undefined"!==typeof f&&"info"===
// f.toLowerCase())try{console.info.apply(console,b)}catch(e){console.info(b.join("\n"))}else try{console.error.apply(console,b)}catch(e){console.error(b.join("\n"))}else try{console.warn.apply(console,b)}catch(e){console.warn(b.join("\n"))}}},g=d(this);if(!g.length)return g;var a=d.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof d.fn.vtexPopUp2)return k("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
// g;var q=function(d){var f=0;var b=function(){d.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){d.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){f<a.animateRepeat&&b();f++})})};var e=function(){d.fadeTo(a.animateSpeed,.2,function(){d.fadeTo(a.animateSpeed,1,function(){f<a.animateRepeat&&e();f++})})};d.stop(!0,!0);"leftRight"==a.animation?b():"blink"==a.animation&&e()};g.each(function(){var n,f,b=d(this),e=b.find(a.nameField),c=b.find(a.emailField),l=b.find(a.btn);"animateField"!=
// a.validationMethod&&(n=b.find(a.elementError),f=b.find(a.elementSuccess));1>e.length&&a.checkNameExist&&k("Campo de nome, n\u00e3o encontrado ("+e.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>c.length)return k("Campo de e-mail, n\u00e3o encontrado ("+c.selector+")"),b;if(1>l.length)return k("Bot\u00e3o de envio, n\u00e3o encontrado ("+l.selector+")"),b;if("animateField"!=a.validationMethod&&(1>f.length||1>n.length))return k("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
// f.selector+", "+n.selector+")"),b;a.setDefaultName&&e.is("input[type=text], textarea")&&e.val(a.defaultName);c.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var b=e.filter(":visible");if(!b.length)return}else b=e;var d=b.val();b.is("input:text, textarea")&&b.bind({focus:function(){b.val()!=d||0!==b.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||b.val("")},blur:function(){""===b.val()&&b.val(d)}})}})();(function(){var b=c.val();c.bind({focus:function(){c.val()==
// b&&0===c.val().search(a.defaultEmail.substr(0,6))&&c.val("")},blur:function(){""===c.val()&&c.val(b)}})})();var g=function(){var h;var e=(h=b.find(a.nameField).filter("input[type=text],select,textarea").val())?h:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(h=b.find(a.nameField).attr(a.getAttr))?h:(h=b.find(a.nameField).text())?h:(h=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
// h:"Nome_Padrao";h=(b.find(a.emailField).val()||"").trim();var c=b.find(a.nameField).is(":visible");c=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||c?c:!0):!1;var g=0>h.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(c||g)"animateField"==a.validationMethod?(c&&q(b.find(a.nameField)),g&&q(b.find(a.emailField))):"popup"==a.validationMethod?n.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(n.slideDown().bind("click",
// function(){d(this).slideUp()}),setTimeout(function(){n.slideUp()},1800));else if(a.allowSubmit()){l.attr("disabled","disabled");var m={postData:{newsletterClientEmail:h,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:l,wrapper:b};"linx"===a.platform&&(m.postData.nome=m.postData.newsletterClientName,m.postData.email=m.postData.newsletterClientEmail);d.ajax({url:"linx"===
// a.platform?"/newsletter.aspx":"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:m.postData,success:function(e){var h;l.removeAttr("disabled");if("linx"===a.platform&&!(-1<e.indexOf(" com sucesso.")||-1<e.indexOf(" cadastrado.")))return alert(e);"popup"==a.validationMethod?f.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&f.slideDown().bind("click",function(){d(this).slideUp()});var c=b.find(a.emailField);a.setDefaultName&&
// b.find(a.nameField).is("input:text, textarea")&&b.find(a.nameField).val(a.defaultName);var g=function(){c.val(a.defaultEmail)};"animateField"==a.validationMethod?(c.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),c.addClass("vtexNewsSuccess"),h=setTimeout(function(){c.removeClass("vtexNewsSuccess");g();c.unbind("focus.vtexNews")},a.timeHideSuccessMsg),c.bind("focus.vtexNews",function(){c.removeClass("vtexNewsSuccess");clearTimeout(h);d(this).val("");d(this).unbind("focus.vtexNews")})):g();
// a.successCallback(m);d(b).trigger("qdNewsSuccessCallback",m)}});a.submitCallback(h,e)}else k("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),g())};e.filter("input:text, textarea").bind("keydown",p);c.bind("keydown",p);p=l.getParent("form");p.length?p.submit(function(a){a.preventDefault();g()}):l.bind("click.qd_news",function(){g()})});return g};d(function(){d(".qd_news_auto").QD_news()})}})();
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(e){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},e);var f="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+f);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var d=jQuery,e=function(a,c){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,b)}catch(f){try{console.info(b.join("\n"))}catch(g){}}else try{console.error.apply(console,
b)}catch(f){try{console.error(b.join("\n"))}catch(g){}}else try{console.warn.apply(console,b)}catch(f){try{console.warn(b.join("\n"))}catch(g){}}}};"function"!==typeof d.QD_scrollToggle&&(d.QD_scrollToggle=function(a){var c=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)c.push(d(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||c.push(a))}if(!c.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!d(window).scrollTop||isNaN(parseInt(d(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}d(window).scroll(function(){for(var a=0;a<c.length;a++)d(window).scrollTop()>c[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},d(function(){var a=d("body[data-qd-scroll-limit]");a.length&&d.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){if(e.raw)var b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires;var h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}d=a?void 0:{};h=document.cookie?document.cookie.split("; "):[];for(var m=0,l=h.length;m<
l;m++){var f=h[m].split("=");var k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b, c, d, e) { b = (b + "").replace(/[^0-9+\-Ee.]/g, ""); b = isFinite(+b) ? +b : 0; c = isFinite(+c) ? Math.abs(c) : 0; e = "undefined" === typeof e ? "," : e; d = "undefined" === typeof d ? "." : d; var a = "", a = function (a, b) { var c = Math.pow(10, b); return "" + (Math.round(a * c) / c).toFixed(b) }, a = (c ? a(b, c) : "" + Math.round(b)).split("."); 3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e)); (a[1] || "").length < c && (a[1] = a[1] || "", a[1] += Array(c - a[1].length + 1).join("0")); return a.join(d) };
/* Quatro Digital Simple Cart // 4.15 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],a[1],a[2],a[3],
a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};var d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);h="undefined"===
typeof h?!1:h;var m={cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:(b("meta[name=currency]").attr("content")||"R$")+" ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}};var f=b.extend({},m,n);var l=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});var g=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&
(e+=a.totalizers[c].value),b+=a.totalizers[c].value;window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=
a.items.length||0;try{window._QuatroDigital_CartData.callback&&window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(u){k("Problemas com o callback do Smart Cart")}p(l)};var q=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};var r=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};var t=function(a,b){var c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);q(c,b.itemsTextE);r(c)};var p=function(a){d.each(function(){var d={};var e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||l;d.cartTotalE=e.find(f.cartTotal)||l;d.itemsTextE=e.find(f.itemsText)||l;d.emptyElem=e.find(f.emptyCart)||l;t(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h||!c))return g(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){g(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(g,h,k,d,m){c.call(this,g,h,k,d,function(){"function"===typeof m&&
m();b.QD_simpleCart.elements.each(function(){var c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var g=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof g?g.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function (a) { a.fn.getParent = a.fn.closest })(jQuery);
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){var a=$("meta[property='fb:app_id']").attr("content")||!1,b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt;
d=d.wrap("<span></span>");var h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Quatro Digital - Smart Quantity // 1.12 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");e.not(":first").each(function(){this.href=e[0].href});var d=((e.first().attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,
q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);
null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);
/* Bootstrap: tab.js v3.3.7 */
(function(c){function g(a){return this.each(function(){var f=c(this),b=f.data("bs.tab");b||f.data("bs.tab",b=new d(this));if("string"==typeof a)b[a]()})}var d=function(a){this.element=c(a)};d.VERSION="3.3.7";d.TRANSITION_DURATION=150;d.prototype.show=function(){var a=this.element,f=a.closest("ul:not(.dropdown-menu)"),b=a.data("target");b||(b=(b=a.attr("href"))&&b.replace(/.*(?=#[^\s]*$)/,""));if(!a.parent("li").hasClass("active")){var d=f.find(".active:last a"),e=c.Event("hide.bs.tab",{relatedTarget:a[0]}),
h=c.Event("show.bs.tab",{relatedTarget:d[0]});d.trigger(e);a.trigger(h);h.isDefaultPrevented()||e.isDefaultPrevented()||(b=c(b),this.activate(a.closest("li"),f),this.activate(b,b.parent(),function(){d.trigger({type:"hidden.bs.tab",relatedTarget:a[0]});a.trigger({type:"shown.bs.tab",relatedTarget:d[0]})}))}};d.prototype.activate=function(a,f,b){function g(){e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1);a.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",
!0);h?(a[0].offsetWidth,a.addClass("in")):a.removeClass("fade");a.parent(".dropdown-menu").length&&a.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0);b&&b()}var e=f.find("> .active"),h=b&&c.support.transition&&(e.length&&e.hasClass("fade")||!!f.find("> .fade").length);e.length&&h?e.one("bsTransitionEnd",g).emulateTransitionEnd(d.TRANSITION_DURATION):g();e.removeClass("in")};var l=c.fn.tab;c.fn.tab=g;c.fn.tab.Constructor=d;c.fn.tab.noConflict=function(){c.fn.tab=
l;return this};var k=function(a){a.preventDefault();g.call(c(this),"show")};c(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',k).on("click.bs.tab.data-api",'[data-toggle="pill"]',k)})(jQuery);
/* Bootstrap: tooltip.js v3.3.7 */
(function(e){var d=function(b,a){this.inState=this.$element=this.hoverState=this.timeout=this.enabled=this.options=this.type=null;this.init("tooltip",b,a)};d.VERSION="3.3.7";d.TRANSITION_DURATION=150;d.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0}};d.prototype.init=function(b,a,
c){this.enabled=!0;this.type=b;this.$element=e(a);this.options=this.getOptions(c);this.$viewport=this.options.viewport&&e(e.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport);this.inState={click:!1,hover:!1,focus:!1};if(this.$element[0]instanceof document.constructor&&!this.options.selector)throw Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");b=this.options.trigger.split(" ");
for(a=b.length;a--;)if(c=b[a],"click"==c)this.$element.on("click."+this.type,this.options.selector,e.proxy(this.toggle,this));else if("manual"!=c){var f="hover"==c?"mouseleave":"focusout";this.$element.on(("hover"==c?"mouseenter":"focusin")+"."+this.type,this.options.selector,e.proxy(this.enter,this));this.$element.on(f+"."+this.type,this.options.selector,e.proxy(this.leave,this))}this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()};d.prototype.getDefaults=
function(){return d.DEFAULTS};d.prototype.getOptions=function(b){b=e.extend({},this.getDefaults(),this.$element.data(),b);b.delay&&"number"==typeof b.delay&&(b.delay={show:b.delay,hide:b.delay});return b};d.prototype.getDelegateOptions=function(){var b={},a=this.getDefaults();this._options&&e.each(this._options,function(c,f){a[c]!=f&&(b[c]=f)});return b};d.prototype.enter=function(b){var a=b instanceof this.constructor?b:e(b.currentTarget).data("bs."+this.type);a||(a=new this.constructor(b.currentTarget,
this.getDelegateOptions()),e(b.currentTarget).data("bs."+this.type,a));b instanceof e.Event&&(a.inState["focusin"==b.type?"focus":"hover"]=!0);if(a.tip().hasClass("in")||"in"==a.hoverState)a.hoverState="in";else{clearTimeout(a.timeout);a.hoverState="in";if(!a.options.delay||!a.options.delay.show)return a.show();a.timeout=setTimeout(function(){"in"==a.hoverState&&a.show()},a.options.delay.show)}};d.prototype.isInStateTrue=function(){for(var b in this.inState)if(this.inState[b])return!0;return!1};d.prototype.leave=
function(b){var a=b instanceof this.constructor?b:e(b.currentTarget).data("bs."+this.type);a||(a=new this.constructor(b.currentTarget,this.getDelegateOptions()),e(b.currentTarget).data("bs."+this.type,a));b instanceof e.Event&&(a.inState["focusout"==b.type?"focus":"hover"]=!1);if(!a.isInStateTrue()){clearTimeout(a.timeout);a.hoverState="out";if(!a.options.delay||!a.options.delay.hide)return a.hide();a.timeout=setTimeout(function(){"out"==a.hoverState&&a.hide()},a.options.delay.hide)}};d.prototype.show=
function(){var b;var a=e.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(a);var c=e.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(!a.isDefaultPrevented()&&c){var f=this;a=this.tip();c=this.getUID(this.type);this.setContent();a.attr("id",c);this.$element.attr("aria-describedby",c);this.options.animation&&a.addClass("fade");c="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement;
var h=/\s?auto?\s?/i;(b=h.test(c))&&(c=c.replace(h,"")||"top");a.detach().css({top:0,left:0,display:"block"}).addClass(c).data("bs."+this.type,this);this.options.container?a.appendTo(this.options.container):a.insertAfter(this.$element);this.$element.trigger("inserted.bs."+this.type);var h=this.getPosition(),k=a[0].offsetWidth,g=a[0].offsetHeight;if(b){b=c;var l=this.getPosition(this.$viewport);c="bottom"==c&&h.bottom+g>l.bottom?"top":"top"==c&&h.top-g<l.top?"bottom":"right"==c&&h.right+k>l.width?
"left":"left"==c&&h.left-k<l.left?"right":c;a.removeClass(b).addClass(c)}h=this.getCalculatedOffset(c,h,k,g);this.applyPlacement(h,c);c=function(){var a=f.hoverState;f.$element.trigger("shown.bs."+f.type);f.hoverState=null;"out"==a&&f.leave(f)};e.support.transition&&this.$tip.hasClass("fade")?a.one("bsTransitionEnd",c).emulateTransitionEnd(d.TRANSITION_DURATION):c()}}};d.prototype.applyPlacement=function(b,a){var c=this.tip(),f=c[0].offsetWidth,d=c[0].offsetHeight,k=parseInt(c.css("margin-top"),10),
g=parseInt(c.css("margin-left"),10);isNaN(k)&&(k=0);isNaN(g)&&(g=0);b.top+=k;b.left+=g;e.offset.setOffset(c[0],e.extend({using:function(a){c.css({top:Math.round(a.top),left:Math.round(a.left)})}},b),0);c.addClass("in");var g=c[0].offsetWidth,l=c[0].offsetHeight;"top"==a&&l!=d&&(b.top=b.top+d-l);var m=this.getViewportAdjustedDelta(a,b,g,l);m.left?b.left+=m.left:b.top+=m.top;f=(k=/top|bottom/.test(a))?2*m.left-f+g:2*m.top-d+l;d=k?"offsetWidth":"offsetHeight";c.offset(b);this.replaceArrow(f,c[0][d],
k)};d.prototype.replaceArrow=function(b,a,c){this.arrow().css(c?"left":"top",50*(1-b/a)+"%").css(c?"top":"left","")};d.prototype.setContent=function(){var b=this.tip(),a=this.getTitle();b.find(".tooltip-inner")[this.options.html?"html":"text"](a);b.removeClass("fade in top bottom left right")};d.prototype.hide=function(b){function a(){"in"!=c.hoverState&&f.detach();c.$element&&c.$element.removeAttr("aria-describedby").trigger("hidden.bs."+c.type);b&&b()}var c=this,f=e(this.$tip),h=e.Event("hide.bs."+
this.type);this.$element.trigger(h);if(!h.isDefaultPrevented())return f.removeClass("in"),e.support.transition&&f.hasClass("fade")?f.one("bsTransitionEnd",a).emulateTransitionEnd(d.TRANSITION_DURATION):a(),this.hoverState=null,this};d.prototype.fixTitle=function(){var b=this.$element;(b.attr("title")||"string"!=typeof b.attr("data-original-title"))&&b.attr("data-original-title",b.attr("title")||"").attr("title","")};d.prototype.hasContent=function(){return this.getTitle()};d.prototype.getPosition=
function(b){b=b||this.$element;var a=b[0],c="BODY"==a.tagName,d=a.getBoundingClientRect();null==d.width&&(d=e.extend({},d,{width:d.right-d.left,height:d.bottom-d.top}));a=window.SVGElement&&a instanceof window.SVGElement;a=c?{top:0,left:0}:a?null:b.offset();b={scroll:c?document.documentElement.scrollTop||document.body.scrollTop:b.scrollTop()};c=c?{width:e(window).width(),height:e(window).height()}:null;return e.extend({},d,b,c,a)};d.prototype.getCalculatedOffset=function(b,a,c,d){return"bottom"==
b?{top:a.top+a.height,left:a.left+a.width/2-c/2}:"top"==b?{top:a.top-d,left:a.left+a.width/2-c/2}:"left"==b?{top:a.top+a.height/2-d/2,left:a.left-c}:{top:a.top+a.height/2-d/2,left:a.left+a.width}};d.prototype.getViewportAdjustedDelta=function(b,a,c,d){var e={top:0,left:0};if(!this.$viewport)return e;var f=this.options.viewport&&this.options.viewport.padding||0,g=this.getPosition(this.$viewport);/right|left/.test(b)?(c=a.top-f-g.scroll,a=a.top+f-g.scroll+d,c<g.top?e.top=g.top-c:a>g.top+g.height&&(e.top=
g.top+g.height-a)):(d=a.left-f,a=a.left+f+c,d<g.left?e.left=g.left-d:a>g.right&&(e.left=g.left+g.width-a));return e};d.prototype.getTitle=function(){var b=this.$element,a=this.options;return b.attr("data-original-title")||("function"==typeof a.title?a.title.call(b[0]):a.title)};d.prototype.getUID=function(b){do b+=~~(1E6*Math.random());while(document.getElementById(b));return b};d.prototype.tip=function(){if(!this.$tip&&(this.$tip=e(this.options.template),1!=this.$tip.length))throw Error(this.type+
" `template` option must consist of exactly 1 top-level element!");return this.$tip};d.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")};d.prototype.enable=function(){this.enabled=!0};d.prototype.disable=function(){this.enabled=!1};d.prototype.toggleEnabled=function(){this.enabled=!this.enabled};d.prototype.toggle=function(b){var a=this;b&&(a=e(b.currentTarget).data("bs."+this.type),a||(a=new this.constructor(b.currentTarget,this.getDelegateOptions()),e(b.currentTarget).data("bs."+
this.type,a)));b?(a.inState.click=!a.inState.click,a.isInStateTrue()?a.enter(a):a.leave(a)):a.tip().hasClass("in")?a.leave(a):a.enter(a)};d.prototype.destroy=function(){var b=this;clearTimeout(this.timeout);this.hide(function(){b.$element.off("."+b.type).removeData("bs."+b.type);b.$tip&&b.$tip.detach();b.$tip=null;b.$arrow=null;b.$viewport=null;b.$element=null})};var n=e.fn.tooltip;e.fn.tooltip=function(b){return this.each(function(){var a=e(this),c=a.data("bs.tooltip"),f="object"==typeof b&&b;if(c||
!/destroy|hide/.test(b))if(c||a.data("bs.tooltip",c=new d(this,f)),"string"==typeof b)c[b]()})};e.fn.tooltip.Constructor=d;e.fn.tooltip.noConflict=function(){e.fn.tooltip=n;return this}})(jQuery);

/*! jQuery Validation Plugin - v1.12.0 - 4/1/2014
 * http://jqueryvalidation.org/
 * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.addWrapper(this.errorsFor(a)).hide())},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",b).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=d.attr("type");return"radio"===e||"checkbox"===e?a("input[name='"+d.attr("name")+"']:checked").val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c[0].toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d=this.errorsFor(b);d.length?(d.removeClass(this.settings.validClass).addClass(this.settings.errorClass),d.html(c)):(d=a("<"+this.settings.errorElement+">").attr("for",this.idOrName(b)).addClass(this.settings.errorClass).html(c||""),this.settings.wrapper&&(d=d.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.append(d).length||(this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b))),!c&&this.settings.success&&(d.text(""),"string"==typeof this.settings.success?d.addClass(this.settings.success):this.settings.success(d,b)),this.toShow=this.toShow.add(d)},errorsFor:function(b){var c=this.idOrName(b);return this.errors().filter(function(){return a(this).attr("for")===c})},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(a){return this.checkable(a)&&(a=this.findByName(a.name).not(this.settings.ignore)[0]),a},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c[0].toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(b.min&&b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),b.minlength&&b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(a.trim(b),c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."}}(jQuery),function(a){var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)})}(jQuery),function(a){a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})}(jQuery);

// jQuery Zoom 3.0.8
// github.com/jackmoore/zoom
(function(o){var t={url:!1,callback:!1,target:!1,duration:120,on:"mouseover",touch:!0,onZoomIn:!1,onZoomOut:!1,magnify:1};o.zoom=function(t,n,e,i){var u,c,r,a,m,l,s,f=o(t),h=f.css("position"),d=o(n);return t.style.position=/(absolute|fixed)/.test(h)?h:"relative",t.style.overflow="hidden",e.style.width=e.style.height="",o(e).addClass("zoomImg").css({position:"absolute",top:0,left:0,opacity:0,width:e.width*i,height:e.height*i,border:"none",maxWidth:"none",maxHeight:"none"}).appendTo(t),{init:function(){c=f.outerWidth(),u=f.outerHeight(),n===t?(a=c,r=u):(a=d.outerWidth(),r=d.outerHeight()),m=(e.width-c)/a,l=(e.height-u)/r,s=d.offset()},move:function(o){var t=o.pageX-s.left,n=o.pageY-s.top;n=Math.max(Math.min(n,r),0),t=Math.max(Math.min(t,a),0),e.style.left=t*-m+"px",e.style.top=n*-l+"px"}}},o.fn.zoom=function(n){return this.each(function(){var e=o.extend({},t,n||{}),i=e.target&&o(e.target)[0]||this,u=this,c=o(u),r=document.createElement("img"),a=o(r),m="mousemove.zoom",l=!1,s=!1;if(!e.url){var f=u.querySelector("img");if(f&&(e.url=f.getAttribute("data-src")||f.currentSrc||f.src),!e.url)return}c.one("zoom.destroy",function(o,t){c.off(".zoom"),i.style.position=o,i.style.overflow=t,r.onload=null,a.remove()}.bind(this,i.style.position,i.style.overflow)),r.onload=function(){function t(t){f.init(),f.move(t),a.stop().fadeTo(o.support.opacity?e.duration:0,1,o.isFunction(e.onZoomIn)?e.onZoomIn.call(r):!1)}function n(){a.stop().fadeTo(e.duration,0,o.isFunction(e.onZoomOut)?e.onZoomOut.call(r):!1)}var f=o.zoom(i,u,r,e.magnify);"grab"===e.on?c.on("mousedown.zoom",function(e){1===e.which&&(o(document).one("mouseup.zoom",function(){n(),o(document).off(m,f.move)}),t(e),o(document).on(m,f.move),e.preventDefault())}):"click"===e.on?c.on("click.zoom",function(e){return l?void 0:(l=!0,t(e),o(document).on(m,f.move),o(document).one("click.zoom",function(){n(),l=!1,o(document).off(m,f.move)}),!1)}):"toggle"===e.on?c.on("click.zoom",function(o){l?n():t(o),l=!l}):"mouseover"===e.on&&(f.init(),c.on("mouseenter.zoom",t).on("mouseleave.zoom",n).on(m,f.move)),e.touch&&c.on("touchstart.zoom",function(o){o.preventDefault(),s?(s=!1,n()):(s=!0,t(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0]))}).on("touchmove.zoom",function(o){o.preventDefault(),f.move(o.originalEvent.touches[0]||o.originalEvent.changedTouches[0])}).on("touchend.zoom",function(o){o.preventDefault(),s&&(s=!1,n())}),o.isFunction(e.callback)&&e.callback.call(r)},r.setAttribute("role","presentation"),r.src=e.url})},o.fn.zoom.defaults=t})(window.jQuery);

/* Quatro Digital Amazing Menu */
var _0x47c0=['warn','object','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','QD_amazingMenu','replace','fromCharCode','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','html','img[alt=\x27','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','attr','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','li\x20>ul','children',':not(ul)','qd-am-elem-','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','callback','call','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','getParent','function','/qd-amazing-menu','undefined','error','info'];(function(_0x2e93ab,_0x5bb320){var _0x4f9b8b=function(_0x4637ae){while(--_0x4637ae){_0x2e93ab['push'](_0x2e93ab['shift']());}};_0x4f9b8b(++_0x5bb320);}(_0x47c0,0x10e));var _0x047c=function(_0x46de5d,_0x183ff4){_0x46de5d=_0x46de5d-0x0;var _0x30a856=_0x47c0[_0x46de5d];return _0x30a856;};(function(_0xdb221d){_0xdb221d['fn'][_0x047c('0x0')]=_0xdb221d['fn']['closest'];}(jQuery));(function(_0x54bf3f){var _0x2c835b;var _0x362c1d=jQuery;if(_0x047c('0x1')!==typeof _0x362c1d['fn']['QD_amazingMenu']){var _0x19ca21={'url':_0x047c('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x3e4c9b=function(_0x1e35a9,_0xc99d5b){if('object'===typeof console&&_0x047c('0x3')!==typeof console[_0x047c('0x4')]&&_0x047c('0x3')!==typeof console[_0x047c('0x5')]&&_0x047c('0x3')!==typeof console[_0x047c('0x6')]){var _0x104a77;_0x047c('0x7')===typeof _0x1e35a9?(_0x1e35a9['unshift'](_0x047c('0x8')),_0x104a77=_0x1e35a9):_0x104a77=[_0x047c('0x8')+_0x1e35a9];if(_0x047c('0x3')===typeof _0xc99d5b||_0x047c('0x9')!==_0xc99d5b[_0x047c('0xa')]()&&_0x047c('0xb')!==_0xc99d5b[_0x047c('0xa')]())if(_0x047c('0x3')!==typeof _0xc99d5b&&_0x047c('0x5')===_0xc99d5b[_0x047c('0xa')]())try{console[_0x047c('0x5')][_0x047c('0xc')](console,_0x104a77);}catch(_0x388779){try{console[_0x047c('0x5')](_0x104a77[_0x047c('0xd')]('\x0a'));}catch(_0x4b848d){}}else try{console['error']['apply'](console,_0x104a77);}catch(_0xd3f084){try{console[_0x047c('0x4')](_0x104a77[_0x047c('0xd')]('\x0a'));}catch(_0x48ab2a){}}else try{console[_0x047c('0x6')]['apply'](console,_0x104a77);}catch(_0x40d5c8){try{console[_0x047c('0x6')](_0x104a77[_0x047c('0xd')]('\x0a'));}catch(_0x25328b){}}}};_0x362c1d['fn'][_0x047c('0xe')]=function(){var _0x512f73=_0x362c1d(this);_0x512f73[_0x047c('0xf')](function(_0x2447ab){_0x362c1d(this)[_0x047c('0x10')](_0x047c('0x11')+_0x2447ab);});_0x512f73[_0x047c('0x12')]()[_0x047c('0x10')](_0x047c('0x13'));_0x512f73[_0x047c('0x14')]()[_0x047c('0x10')]('qd-am-last');return _0x512f73;};_0x362c1d['fn'][_0x047c('0x15')]=function(){};_0x54bf3f=function(_0x4cd515){var _0x59a005={'i':'vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x4bdb8){var _0xb80494=function(_0x5149ad){return _0x5149ad;};var _0x27654c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4bdb8=_0x4bdb8['d'+_0x27654c[0x10]+'c'+_0x27654c[0x11]+'m'+_0xb80494(_0x27654c[0x1])+'n'+_0x27654c[0xd]]['l'+_0x27654c[0x12]+'c'+_0x27654c[0x0]+'ti'+_0xb80494('o')+'n'];var _0x1aeaad=function(_0x37a4ad){return escape(encodeURIComponent(_0x37a4ad[_0x047c('0x16')](/\./g,'¨')[_0x047c('0x16')](/[a-zA-Z]/g,function(_0x34f15d){return String[_0x047c('0x17')](('Z'>=_0x34f15d?0x5a:0x7a)>=(_0x34f15d=_0x34f15d['charCodeAt'](0x0)+0xd)?_0x34f15d:_0x34f15d-0x1a);})));};var _0xe722a6=_0x1aeaad(_0x4bdb8[[_0x27654c[0x9],_0xb80494('o'),_0x27654c[0xc],_0x27654c[_0xb80494(0xd)]][_0x047c('0xd')]('')]);_0x1aeaad=_0x1aeaad((window[['js',_0xb80494('no'),'m',_0x27654c[0x1],_0x27654c[0x4][_0x047c('0x18')](),_0x047c('0x19')][_0x047c('0xd')]('')]||'---')+['.v',_0x27654c[0xd],'e',_0xb80494('x'),'co',_0xb80494('mm'),'erc',_0x27654c[0x1],'.c',_0xb80494('o'),'m.',_0x27654c[0x13],'r'][_0x047c('0xd')](''));for(var _0x4f57d7 in _0x59a005){if(_0x1aeaad===_0x4f57d7+_0x59a005[_0x4f57d7]||_0xe722a6===_0x4f57d7+_0x59a005[_0x4f57d7]){var _0x1ff784='tr'+_0x27654c[0x11]+'e';break;}_0x1ff784='f'+_0x27654c[0x0]+'ls'+_0xb80494(_0x27654c[0x1])+'';}_0xb80494=!0x1;-0x1<_0x4bdb8[[_0x27654c[0xc],'e',_0x27654c[0x0],'rc',_0x27654c[0x9]][_0x047c('0xd')]('')][_0x047c('0x1a')](_0x047c('0x1b'))&&(_0xb80494=!0x0);return[_0x1ff784,_0xb80494];}(_0x4cd515);}(window);if(!eval(_0x54bf3f[0x0]))return _0x54bf3f[0x1]?_0x3e4c9b('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x274b55=function(_0xab18d6){var _0x551869=_0xab18d6[_0x047c('0x1c')](_0x047c('0x1d'));var _0x20ad48=_0x551869[_0x047c('0x1e')]('.qd-am-banner');var _0x41053a=_0x551869[_0x047c('0x1e')](_0x047c('0x1f'));if(_0x20ad48[_0x047c('0x20')]||_0x41053a[_0x047c('0x20')])_0x20ad48[_0x047c('0x21')]()[_0x047c('0x10')](_0x047c('0x22')),_0x41053a[_0x047c('0x21')]()[_0x047c('0x10')](_0x047c('0x23')),_0x362c1d['qdAjax']({'url':_0x2c835b['url'],'dataType':_0x047c('0x24'),'success':function(_0x51f399){var _0x49db93=_0x362c1d(_0x51f399);_0x20ad48[_0x047c('0xf')](function(){var _0x51f399=_0x362c1d(this);var _0x3fb6ae=_0x49db93[_0x047c('0x1c')](_0x047c('0x25')+_0x51f399['attr'](_0x047c('0x26'))+'\x27]');_0x3fb6ae[_0x047c('0x20')]&&(_0x3fb6ae[_0x047c('0xf')](function(){_0x362c1d(this)[_0x047c('0x0')](_0x047c('0x27'))[_0x047c('0x28')]()[_0x047c('0x29')](_0x51f399);}),_0x51f399[_0x047c('0x2a')]());})['addClass'](_0x047c('0x2b'));_0x41053a['each'](function(){var _0x51f399={};var _0x3dacf4=_0x362c1d(this);_0x49db93[_0x047c('0x1c')]('h2')[_0x047c('0xf')](function(){if(_0x362c1d(this)[_0x047c('0x2c')]()[_0x047c('0x2d')]()[_0x047c('0xa')]()==_0x3dacf4[_0x047c('0x2e')](_0x047c('0x26'))[_0x047c('0x2d')]()[_0x047c('0xa')]())return _0x51f399=_0x362c1d(this),!0x1;});_0x51f399[_0x047c('0x20')]&&(_0x51f399[_0x047c('0xf')](function(){_0x362c1d(this)[_0x047c('0x0')](_0x047c('0x2f'))[_0x047c('0x28')]()[_0x047c('0x29')](_0x3dacf4);}),_0x3dacf4[_0x047c('0x2a')]());})['addClass'](_0x047c('0x2b'));},'error':function(){_0x3e4c9b(_0x047c('0x30')+_0x2c835b['url']+'\x27\x20falho.');},'complete':function(){_0x2c835b[_0x047c('0x31')]['call'](this);_0x362c1d(window)[_0x047c('0x32')](_0x047c('0x33'),_0xab18d6);},'clearQueueDelay':0xbb8});};_0x362c1d[_0x047c('0x15')]=function(_0x5eaf92){var _0x1a3643=_0x5eaf92[_0x047c('0x1c')](_0x047c('0x34'))[_0x047c('0xf')](function(){var _0x11d79f=_0x362c1d(this);if(!_0x11d79f['length'])return _0x3e4c9b(['UL\x20do\x20menu\x20não\x20encontrada',_0x5eaf92],_0x047c('0x9'));_0x11d79f[_0x047c('0x1c')](_0x047c('0x35'))['parent']()[_0x047c('0x10')]('qd-am-has-ul');_0x11d79f[_0x047c('0x1c')]('li')[_0x047c('0xf')](function(){var _0x5635e8=_0x362c1d(this);var _0x3ceaff=_0x5635e8[_0x047c('0x36')](_0x047c('0x37'));_0x3ceaff[_0x047c('0x20')]&&_0x5635e8[_0x047c('0x10')](_0x047c('0x38')+_0x3ceaff[_0x047c('0x12')]()['text']()['trim']()['replaceSpecialChars']()[_0x047c('0x16')](/\./g,'')[_0x047c('0x16')](/\s/g,'-')[_0x047c('0xa')]());});var _0x474174=_0x11d79f[_0x047c('0x1c')]('>li')[_0x047c('0xe')]();_0x11d79f['addClass'](_0x047c('0x39'));_0x474174=_0x474174[_0x047c('0x1c')](_0x047c('0x3a'));_0x474174[_0x047c('0xf')](function(){var _0x460905=_0x362c1d(this);_0x460905['find']('>li')[_0x047c('0xe')]()[_0x047c('0x10')](_0x047c('0x3b'));_0x460905[_0x047c('0x10')](_0x047c('0x3c'));_0x460905[_0x047c('0x21')]()[_0x047c('0x10')](_0x047c('0x3d'));});_0x474174['addClass'](_0x047c('0x3d'));var _0x213edf=0x0,_0x54bf3f=function(_0x477667){_0x213edf+=0x1;_0x477667=_0x477667[_0x047c('0x36')]('li')[_0x047c('0x36')]('*');_0x477667['length']&&(_0x477667[_0x047c('0x10')](_0x047c('0x3e')+_0x213edf),_0x54bf3f(_0x477667));};_0x54bf3f(_0x11d79f);_0x11d79f[_0x047c('0x3f')](_0x11d79f[_0x047c('0x1c')]('ul'))[_0x047c('0xf')](function(){var _0x2d9810=_0x362c1d(this);_0x2d9810[_0x047c('0x10')]('qd-am-'+_0x2d9810[_0x047c('0x36')]('li')[_0x047c('0x20')]+'-li');});});_0x274b55(_0x1a3643);_0x2c835b[_0x047c('0x40')][_0x047c('0x41')](this);_0x362c1d(window)['trigger'](_0x047c('0x42'),_0x5eaf92);};_0x362c1d['fn'][_0x047c('0x15')]=function(_0x5b2bed){var _0x5b8d23=_0x362c1d(this);if(!_0x5b8d23['length'])return _0x5b8d23;_0x2c835b=_0x362c1d['extend']({},_0x19ca21,_0x5b2bed);_0x5b8d23[_0x047c('0x43')]=new _0x362c1d['QD_amazingMenu'](_0x362c1d(this));return _0x5b8d23;};_0x362c1d(function(){_0x362c1d(_0x047c('0x44'))['QD_amazingMenu']();});}}(this));

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

/* Quatro Digital Smart Cart */
var _0x065a=['.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','#shipping','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-wrapper','.qd-ddc-prodRow','qd-ddc-noItems','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-remove','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','callbackProductsList','qd-loaded','src','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','qd-loading','focusout.qd_ddc_change','keyup.qd_ddc_change','removeProduct','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','ajaxStop','.qdDdcContainer','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','undefined','pow','round','toFixed','length','join','function','prototype','trim','capitalize','toUpperCase','slice','toLowerCase','qdAjaxQueue','jquery','000','qdAjax','extend','GET','data','stringify','toString','url','type','jqXHR','ajax','done','success','fail','error','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','4.0','simpleCart','getOrderForm','checkout','call','QuatroDigital_simpleCart','object','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','shipping','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','filter','.singular','show','hide','.plural','addClass','removeClass','qd-emptyCart','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','each','$this','cartQttE','find','cartTotal','itemsTextE','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','#produto,\x20.produto','QD_buyButton','qd-bb-click-active','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','href','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','isSmartCheckout','função\x20descontinuada','allowUpdate','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','match','productPageCallback','buyButtonClickCallback','split','ku=','pop','shift','asyncCallback','cartProductAdded.vtex','fakeRequest','parent','_QuatroDigital_prodBuyCallback','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add','productAddedToCart.qdSbbVtex','Oooops!\x20','abs','message','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','name','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode'];(function(_0x4d1a6a,_0x359f67){var _0x2f157c=function(_0x56377c){while(--_0x56377c){_0x4d1a6a['push'](_0x4d1a6a['shift']());}};_0x2f157c(++_0x359f67);}(_0x065a,0x1bf));var _0xa065=function(_0x7dd60,_0xa5ce9c){_0x7dd60=_0x7dd60-0x0;var _0x262e05=_0x065a[_0x7dd60];return _0x262e05;};(function(_0xfaf3e3){_0xfaf3e3['fn'][_0xa065('0x0')]=_0xfaf3e3['fn'][_0xa065('0x1')];}(jQuery));function qd_number_format(_0x3ed80e,_0x5d8cde,_0x2cd21f,_0x26f94d){_0x3ed80e=(_0x3ed80e+'')[_0xa065('0x2')](/[^0-9+\-Ee.]/g,'');_0x3ed80e=isFinite(+_0x3ed80e)?+_0x3ed80e:0x0;_0x5d8cde=isFinite(+_0x5d8cde)?Math['abs'](_0x5d8cde):0x0;_0x26f94d=_0xa065('0x3')===typeof _0x26f94d?',':_0x26f94d;_0x2cd21f='undefined'===typeof _0x2cd21f?'.':_0x2cd21f;var _0x3e1373='',_0x3e1373=function(_0x51aeee,_0x12d401){var _0x5d8cde=Math[_0xa065('0x4')](0xa,_0x12d401);return''+(Math[_0xa065('0x5')](_0x51aeee*_0x5d8cde)/_0x5d8cde)[_0xa065('0x6')](_0x12d401);},_0x3e1373=(_0x5d8cde?_0x3e1373(_0x3ed80e,_0x5d8cde):''+Math[_0xa065('0x5')](_0x3ed80e))['split']('.');0x3<_0x3e1373[0x0]['length']&&(_0x3e1373[0x0]=_0x3e1373[0x0][_0xa065('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x26f94d));(_0x3e1373[0x1]||'')[_0xa065('0x7')]<_0x5d8cde&&(_0x3e1373[0x1]=_0x3e1373[0x1]||'',_0x3e1373[0x1]+=Array(_0x5d8cde-_0x3e1373[0x1][_0xa065('0x7')]+0x1)[_0xa065('0x8')]('0'));return _0x3e1373[_0xa065('0x8')](_0x2cd21f);};_0xa065('0x9')!==typeof String[_0xa065('0xa')][_0xa065('0xb')]&&(String[_0xa065('0xa')]['trim']=function(){return this[_0xa065('0x2')](/^\s+|\s+$/g,'');});'function'!=typeof String['prototype'][_0xa065('0xc')]&&(String[_0xa065('0xa')][_0xa065('0xc')]=function(){return this['charAt'](0x0)[_0xa065('0xd')]()+this[_0xa065('0xe')](0x1)[_0xa065('0xf')]();});(function(_0x37a4fb){if(_0xa065('0x9')!==typeof _0x37a4fb['qdAjax']){var _0x1b7f72={};_0x37a4fb[_0xa065('0x10')]=_0x1b7f72;0x96>parseInt((_0x37a4fb['fn'][_0xa065('0x11')][_0xa065('0x2')](/[^0-9]+/g,'')+_0xa065('0x12'))[_0xa065('0xe')](0x0,0x3),0xa)&&console&&_0xa065('0x9')==typeof console['error']&&console['error']();_0x37a4fb[_0xa065('0x13')]=function(_0x4c0600){try{var _0x547e48=_0x37a4fb[_0xa065('0x14')]({},{'url':'','type':_0xa065('0x15'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x4c0600);var _0x122774='object'===typeof _0x547e48[_0xa065('0x16')]?JSON[_0xa065('0x17')](_0x547e48[_0xa065('0x16')]):_0x547e48[_0xa065('0x16')][_0xa065('0x18')]();var _0x67cda4=encodeURIComponent(_0x547e48[_0xa065('0x19')]+'|'+_0x547e48[_0xa065('0x1a')]+'|'+_0x122774);_0x1b7f72[_0x67cda4]=_0x1b7f72[_0x67cda4]||{};_0xa065('0x3')==typeof _0x1b7f72[_0x67cda4][_0xa065('0x1b')]?_0x1b7f72[_0x67cda4][_0xa065('0x1b')]=_0x37a4fb[_0xa065('0x1c')](_0x547e48):(_0x1b7f72[_0x67cda4]['jqXHR'][_0xa065('0x1d')](_0x547e48[_0xa065('0x1e')]),_0x1b7f72[_0x67cda4][_0xa065('0x1b')][_0xa065('0x1f')](_0x547e48[_0xa065('0x20')]),_0x1b7f72[_0x67cda4][_0xa065('0x1b')][_0xa065('0x21')](_0x547e48[_0xa065('0x22')]));_0x1b7f72[_0x67cda4][_0xa065('0x1b')][_0xa065('0x21')](function(){isNaN(parseInt(_0x547e48[_0xa065('0x23')]))||setTimeout(function(){_0x1b7f72[_0x67cda4][_0xa065('0x1b')]=void 0x0;},_0x547e48[_0xa065('0x23')]);});return _0x1b7f72[_0x67cda4][_0xa065('0x1b')];}catch(_0x58c9a0){'undefined'!==typeof console&&_0xa065('0x9')===typeof console['error']&&console[_0xa065('0x20')](_0xa065('0x24')+_0x58c9a0['message']);}};_0x37a4fb['qdAjax']['version']=_0xa065('0x25');}}(jQuery));(function(_0x1224b8){_0x1224b8['fn'][_0xa065('0x0')]=_0x1224b8['fn']['closest'];}(jQuery));(function(){var _0x5983e7=jQuery;if('function'!==typeof _0x5983e7['fn'][_0xa065('0x26')]){_0x5983e7(function(){var _0x4d171b=vtexjs['checkout'][_0xa065('0x27')];vtexjs[_0xa065('0x28')][_0xa065('0x27')]=function(){return _0x4d171b[_0xa065('0x29')]();};});try{window[_0xa065('0x2a')]=window[_0xa065('0x2a')]||{};window[_0xa065('0x2a')]['ajaxStopOn']=!0x1;_0x5983e7['fn'][_0xa065('0x26')]=function(_0x47b600,_0xa84a8e,_0x53f0af){var _0x2b1669=function(_0x303e35,_0x4eee0a){if(_0xa065('0x2b')===typeof console){var _0x3a300b='object'===typeof _0x303e35;_0xa065('0x3')!==typeof _0x4eee0a&&_0xa065('0x2c')===_0x4eee0a[_0xa065('0xf')]()?_0x3a300b?console[_0xa065('0x2d')](_0xa065('0x2e'),_0x303e35[0x0],_0x303e35[0x1],_0x303e35[0x2],_0x303e35[0x3],_0x303e35[0x4],_0x303e35[0x5],_0x303e35[0x6],_0x303e35[0x7]):console['warn']('[Simple\x20Cart]\x0a'+_0x303e35):'undefined'!==typeof _0x4eee0a&&_0xa065('0x2f')===_0x4eee0a[_0xa065('0xf')]()?_0x3a300b?console['info'](_0xa065('0x2e'),_0x303e35[0x0],_0x303e35[0x1],_0x303e35[0x2],_0x303e35[0x3],_0x303e35[0x4],_0x303e35[0x5],_0x303e35[0x6],_0x303e35[0x7]):console[_0xa065('0x2f')](_0xa065('0x2e')+_0x303e35):_0x3a300b?console['error'](_0xa065('0x2e'),_0x303e35[0x0],_0x303e35[0x1],_0x303e35[0x2],_0x303e35[0x3],_0x303e35[0x4],_0x303e35[0x5],_0x303e35[0x6],_0x303e35[0x7]):console[_0xa065('0x20')](_0xa065('0x2e')+_0x303e35);}};var _0x30950e=_0x5983e7(this);_0xa065('0x2b')===typeof _0x47b600?_0xa84a8e=_0x47b600:(_0x47b600=_0x47b600||!0x1,_0x30950e=_0x30950e[_0xa065('0x30')](_0x5983e7[_0xa065('0x31')][_0xa065('0x32')]));if(!_0x30950e['length'])return _0x30950e;_0x5983e7[_0xa065('0x31')][_0xa065('0x32')]=_0x5983e7[_0xa065('0x31')]['elements']['add'](_0x30950e);_0x53f0af='undefined'===typeof _0x53f0af?!0x1:_0x53f0af;var _0xebcdbc={'cartQtt':'.qd_cart_qtt','cartTotal':_0xa065('0x33'),'itemsText':_0xa065('0x34'),'currencySymbol':(_0x5983e7(_0xa065('0x35'))[_0xa065('0x36')]('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x5add2a=_0x5983e7[_0xa065('0x14')]({},_0xebcdbc,_0xa84a8e);var _0x30c679=_0x5983e7('');_0x30950e['each'](function(){var _0x43e194=_0x5983e7(this);_0x43e194['data'](_0xa065('0x37'))||_0x43e194[_0xa065('0x16')](_0xa065('0x37'),_0x5add2a);});var _0x197481=function(_0x53ef3d){window[_0xa065('0x38')]=window[_0xa065('0x38')]||{};for(var _0x47b600=0x0,_0x5b2f9d=0x0,_0x15a973=0x0;_0x15a973<_0x53ef3d[_0xa065('0x39')][_0xa065('0x7')];_0x15a973++)_0xa065('0x3a')==_0x53ef3d[_0xa065('0x39')][_0x15a973]['id']&&(_0x5b2f9d+=_0x53ef3d[_0xa065('0x39')][_0x15a973]['value']),_0x47b600+=_0x53ef3d[_0xa065('0x39')][_0x15a973][_0xa065('0x3b')];window[_0xa065('0x38')][_0xa065('0x3c')]=_0x5add2a['currencySymbol']+qd_number_format(_0x47b600/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xa065('0x3d')]=_0x5add2a[_0xa065('0x3e')]+qd_number_format(_0x5b2f9d/0x64,0x2,',','.');window[_0xa065('0x38')][_0xa065('0x3f')]=_0x5add2a[_0xa065('0x3e')]+qd_number_format((_0x47b600+_0x5b2f9d)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xa065('0x40')]=0x0;if(_0x5add2a[_0xa065('0x41')])for(_0x15a973=0x0;_0x15a973<_0x53ef3d[_0xa065('0x42')]['length'];_0x15a973++)window[_0xa065('0x38')][_0xa065('0x40')]+=_0x53ef3d['items'][_0x15a973][_0xa065('0x43')];else window[_0xa065('0x38')][_0xa065('0x40')]=_0x53ef3d['items'][_0xa065('0x7')]||0x0;try{window['_QuatroDigital_CartData'][_0xa065('0x44')]&&window[_0xa065('0x38')][_0xa065('0x44')][_0xa065('0x45')]&&window[_0xa065('0x38')][_0xa065('0x44')][_0xa065('0x45')]();}catch(_0x3c0f87){_0x2b1669('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x18d323(_0x30c679);};var _0x4a24af=function(_0x2f6d9e,_0x3327da){0x1===_0x2f6d9e?_0x3327da['hide']()[_0xa065('0x46')](_0xa065('0x47'))[_0xa065('0x48')]():_0x3327da[_0xa065('0x49')]()[_0xa065('0x46')](_0xa065('0x4a'))[_0xa065('0x48')]();};var _0xf3f473=function(_0x37fb97){0x1>_0x37fb97?_0x30950e[_0xa065('0x4b')]('qd-emptyCart'):_0x30950e[_0xa065('0x4c')](_0xa065('0x4d'));};var _0xed67c2=function(_0x401bab,_0x1c7c3d){var _0x29e5ed=parseInt(window[_0xa065('0x38')]['qtt'],0xa);_0x1c7c3d['$this'][_0xa065('0x48')]();isNaN(_0x29e5ed)&&(_0x2b1669(_0xa065('0x4e'),'alerta'),_0x29e5ed=0x0);_0x1c7c3d[_0xa065('0x4f')][_0xa065('0x50')](window[_0xa065('0x38')]['total']);_0x1c7c3d['cartQttE'][_0xa065('0x50')](_0x29e5ed);_0x4a24af(_0x29e5ed,_0x1c7c3d['itemsTextE']);_0xf3f473(_0x29e5ed);};var _0x18d323=function(_0x229e3c){_0x30950e[_0xa065('0x51')](function(){var _0x5eb0b2={};var _0x19b392=_0x5983e7(this);_0x47b600&&_0x19b392[_0xa065('0x16')](_0xa065('0x37'))&&_0x5983e7[_0xa065('0x14')](_0x5add2a,_0x19b392[_0xa065('0x16')](_0xa065('0x37')));_0x5eb0b2[_0xa065('0x52')]=_0x19b392;_0x5eb0b2[_0xa065('0x53')]=_0x19b392[_0xa065('0x54')](_0x5add2a['cartQtt'])||_0x30c679;_0x5eb0b2[_0xa065('0x4f')]=_0x19b392['find'](_0x5add2a[_0xa065('0x55')])||_0x30c679;_0x5eb0b2[_0xa065('0x56')]=_0x19b392[_0xa065('0x54')](_0x5add2a['itemsText'])||_0x30c679;_0x5eb0b2[_0xa065('0x57')]=_0x19b392[_0xa065('0x54')](_0x5add2a[_0xa065('0x58')])||_0x30c679;_0xed67c2(_0x229e3c,_0x5eb0b2);_0x19b392[_0xa065('0x4b')](_0xa065('0x59'));});};(function(){if(_0x5add2a[_0xa065('0x5a')]){window[_0xa065('0x5b')]=window[_0xa065('0x5b')]||{};if(_0xa065('0x3')!==typeof window[_0xa065('0x5b')]['getOrderForm']&&(_0x53f0af||!_0x47b600))return _0x197481(window[_0xa065('0x5b')][_0xa065('0x27')]);if(_0xa065('0x2b')!==typeof window[_0xa065('0x5c')]||_0xa065('0x3')===typeof window[_0xa065('0x5c')][_0xa065('0x28')])if(_0xa065('0x2b')===typeof vtex&&_0xa065('0x2b')===typeof vtex[_0xa065('0x28')]&&_0xa065('0x3')!==typeof vtex[_0xa065('0x28')][_0xa065('0x5d')])new vtex['checkout'][(_0xa065('0x5d'))]();else return _0x2b1669('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x5983e7[_0xa065('0x5e')]([_0xa065('0x42'),_0xa065('0x39'),'shippingData'],{'done':function(_0x347d84){_0x197481(_0x347d84);window[_0xa065('0x5b')][_0xa065('0x27')]=_0x347d84;},'fail':function(_0x1ddc9d){_0x2b1669([_0xa065('0x5f'),_0x1ddc9d]);}});}else alert(_0xa065('0x60'));}());_0x5add2a['callback']();_0x5983e7(window)[_0xa065('0x61')]('simpleCartCallback.quatro_digital');return _0x30950e;};_0x5983e7[_0xa065('0x31')]={'elements':_0x5983e7('')};_0x5983e7(function(){var _0x38ee65;'function'===typeof window[_0xa065('0x62')]&&(_0x38ee65=window['ajaxRequestbuyButtonAsynchronous'],window['ajaxRequestbuyButtonAsynchronous']=function(_0x2b35d4,_0x51f824,_0x5109c8,_0x3bc6d7,_0x184b80){_0x38ee65[_0xa065('0x29')](this,_0x2b35d4,_0x51f824,_0x5109c8,_0x3bc6d7,function(){_0xa065('0x9')===typeof _0x184b80&&_0x184b80();_0x5983e7[_0xa065('0x31')]['elements'][_0xa065('0x51')](function(){var _0x28aa3f=_0x5983e7(this);_0x28aa3f[_0xa065('0x26')](_0x28aa3f[_0xa065('0x16')](_0xa065('0x37')));});});});});var _0x36464e=window[_0xa065('0x63')]||void 0x0;window['ReloadItemsCart']=function(_0x2efb61){_0x5983e7['fn']['simpleCart'](!0x0);'function'===typeof _0x36464e?_0x36464e[_0xa065('0x29')](this,_0x2efb61):alert(_0x2efb61);};_0x5983e7(function(){var _0x1270c5=_0x5983e7(_0xa065('0x64'));_0x1270c5[_0xa065('0x7')]&&_0x1270c5[_0xa065('0x26')]();});_0x5983e7(function(){_0x5983e7(window)[_0xa065('0x65')](_0xa065('0x66'),function(){_0x5983e7['fn'][_0xa065('0x26')](!0x0);});});}catch(_0x3fcf2a){_0xa065('0x3')!==typeof console&&'function'===typeof console[_0xa065('0x20')]&&console[_0xa065('0x20')]('Oooops!\x20',_0x3fcf2a);}}}());(function(){var _0x43fa07=function(_0x56b85e,_0x365e02){if(_0xa065('0x2b')===typeof console){var _0x3e9969=_0xa065('0x2b')===typeof _0x56b85e;_0xa065('0x3')!==typeof _0x365e02&&_0xa065('0x2c')===_0x365e02[_0xa065('0xf')]()?_0x3e9969?console['warn'](_0xa065('0x67'),_0x56b85e[0x0],_0x56b85e[0x1],_0x56b85e[0x2],_0x56b85e[0x3],_0x56b85e[0x4],_0x56b85e[0x5],_0x56b85e[0x6],_0x56b85e[0x7]):console[_0xa065('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x56b85e):_0xa065('0x3')!==typeof _0x365e02&&_0xa065('0x2f')===_0x365e02['toLowerCase']()?_0x3e9969?console['info'](_0xa065('0x67'),_0x56b85e[0x0],_0x56b85e[0x1],_0x56b85e[0x2],_0x56b85e[0x3],_0x56b85e[0x4],_0x56b85e[0x5],_0x56b85e[0x6],_0x56b85e[0x7]):console[_0xa065('0x2f')](_0xa065('0x67')+_0x56b85e):_0x3e9969?console['error'](_0xa065('0x67'),_0x56b85e[0x0],_0x56b85e[0x1],_0x56b85e[0x2],_0x56b85e[0x3],_0x56b85e[0x4],_0x56b85e[0x5],_0x56b85e[0x6],_0x56b85e[0x7]):console[_0xa065('0x20')](_0xa065('0x67')+_0x56b85e);}},_0x8170d3=null,_0x5d2762={},_0x257a22={},_0xdcec17={};$[_0xa065('0x5e')]=function(_0x1f559c,_0x4e997c){if(null===_0x8170d3)if('object'===typeof window[_0xa065('0x5c')]&&'undefined'!==typeof window[_0xa065('0x5c')][_0xa065('0x28')])_0x8170d3=window[_0xa065('0x5c')][_0xa065('0x28')];else return _0x43fa07(_0xa065('0x68'));var _0x308762=$[_0xa065('0x14')]({'done':function(){},'fail':function(){}},_0x4e997c),_0x371323=_0x1f559c[_0xa065('0x8')](';'),_0x234b16=function(){_0x5d2762[_0x371323][_0xa065('0x30')](_0x308762[_0xa065('0x1d')]);_0x257a22[_0x371323][_0xa065('0x30')](_0x308762[_0xa065('0x1f')]);};_0xdcec17[_0x371323]?_0x234b16():(_0x5d2762[_0x371323]=$[_0xa065('0x69')](),_0x257a22[_0x371323]=$[_0xa065('0x69')](),_0x234b16(),_0xdcec17[_0x371323]=!0x0,_0x8170d3['getOrderForm'](_0x1f559c)[_0xa065('0x1d')](function(_0x5e5a97){_0xdcec17[_0x371323]=!0x1;_0x5d2762[_0x371323][_0xa065('0x45')](_0x5e5a97);})[_0xa065('0x1f')](function(_0x1d706a){_0xdcec17[_0x371323]=!0x1;_0x257a22[_0x371323][_0xa065('0x45')](_0x1d706a);}));};}());(function(_0x4a86e7){try{var _0x2a62c5=jQuery,_0x2e66cb,_0x597cef=_0x2a62c5({}),_0x251052=function(_0x5a3dab,_0x5d425a){if(_0xa065('0x2b')===typeof console&&_0xa065('0x3')!==typeof console[_0xa065('0x20')]&&'undefined'!==typeof console[_0xa065('0x2f')]&&_0xa065('0x3')!==typeof console[_0xa065('0x2d')]){var _0x10e93c;_0xa065('0x2b')===typeof _0x5a3dab?(_0x5a3dab['unshift']('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x10e93c=_0x5a3dab):_0x10e93c=[_0xa065('0x6a')+_0x5a3dab];if(_0xa065('0x3')===typeof _0x5d425a||'alerta'!==_0x5d425a['toLowerCase']()&&_0xa065('0x6b')!==_0x5d425a[_0xa065('0xf')]())if(_0xa065('0x3')!==typeof _0x5d425a&&_0xa065('0x2f')===_0x5d425a['toLowerCase']())try{console[_0xa065('0x2f')][_0xa065('0x6c')](console,_0x10e93c);}catch(_0x40eabb){try{console[_0xa065('0x2f')](_0x10e93c[_0xa065('0x8')]('\x0a'));}catch(_0x14746c){}}else try{console[_0xa065('0x20')]['apply'](console,_0x10e93c);}catch(_0x159d27){try{console['error'](_0x10e93c[_0xa065('0x8')]('\x0a'));}catch(_0x457e79){}}else try{console[_0xa065('0x2d')]['apply'](console,_0x10e93c);}catch(_0x3d3ae3){try{console[_0xa065('0x2d')](_0x10e93c[_0xa065('0x8')]('\x0a'));}catch(_0x1075f4){}}}},_0x1748d4={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xa065('0x6d'),'buyQtt':_0xa065('0x6e'),'selectSkuMsg':_0xa065('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0xf93ea5,_0x52e7d9,_0x11c3fe){_0x2a62c5(_0xa065('0x70'))['is']('.productQuickView')&&(_0xa065('0x1e')===_0x52e7d9?alert(_0xa065('0x71')):(alert(_0xa065('0x72')),(_0xa065('0x2b')===typeof parent?parent:document)[_0xa065('0x73')]['href']=_0x11c3fe));},'isProductPage':function(){return _0x2a62c5(_0xa065('0x70'))['is'](_0xa065('0x74'));},'execDefaultAction':function(_0x9beb85){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x2a62c5[_0xa065('0x75')]=function(_0x1222ad,_0x7d6e0f){function _0x4c985d(_0x22a8f4){_0x2e66cb['isSmartCheckout']?_0x22a8f4[_0xa065('0x16')](_0xa065('0x76'))||(_0x22a8f4[_0xa065('0x16')](_0xa065('0x76'),0x1),_0x22a8f4['on']('click.qd_bb_buy_sc',function(_0x5d689a){if(!_0x2e66cb[_0xa065('0x77')]())return!0x0;if(!0x0!==_0x58da3f[_0xa065('0x78')]['call'](this))return _0x5d689a[_0xa065('0x79')](),!0x1;})):alert(_0xa065('0x7a'));}function _0x117ce0(_0x49d2cf){_0x49d2cf=_0x49d2cf||_0x2a62c5(_0x2e66cb[_0xa065('0x7b')]);_0x49d2cf['each'](function(){var _0x49d2cf=_0x2a62c5(this);_0x49d2cf['is'](_0xa065('0x7c'))||(_0x49d2cf[_0xa065('0x4b')]('qd-sbb-on'),_0x49d2cf['is'](_0xa065('0x7d'))&&!_0x49d2cf['is'](_0xa065('0x7e'))||_0x49d2cf[_0xa065('0x16')](_0xa065('0x7f'))||(_0x49d2cf[_0xa065('0x16')]('qd-bb-active',0x1),_0x49d2cf[_0xa065('0x80')](_0xa065('0x81'))[_0xa065('0x7')]||_0x49d2cf[_0xa065('0x82')](_0xa065('0x83')),_0x49d2cf['is'](_0xa065('0x84'))&&_0x2e66cb['isProductPage']()&&_0x3bf01e[_0xa065('0x29')](_0x49d2cf),_0x4c985d(_0x49d2cf)));});_0x2e66cb[_0xa065('0x85')]()&&!_0x49d2cf[_0xa065('0x7')]&&_0x251052(_0xa065('0x86')+_0x49d2cf[_0xa065('0x87')]+'\x27.','info');}var _0x56fcad=_0x2a62c5(_0x1222ad);var _0x58da3f=this;window[_0xa065('0x88')]=window[_0xa065('0x88')]||{};window[_0xa065('0x38')]=window[_0xa065('0x38')]||{};_0x58da3f[_0xa065('0x89')]=function(_0x92772,_0x2a350c){_0x56fcad[_0xa065('0x4b')](_0xa065('0x8a'));_0x2a62c5(_0xa065('0x70'))[_0xa065('0x4b')](_0xa065('0x8b'));var _0x11f227=_0x2a62c5(_0x2e66cb[_0xa065('0x7b')])['filter']('[href=\x27'+(_0x92772[_0xa065('0x36')](_0xa065('0x8c'))||_0xa065('0x8d'))+'\x27]')[_0xa065('0x30')](_0x92772);_0x11f227[_0xa065('0x4b')](_0xa065('0x8e'));setTimeout(function(){_0x56fcad[_0xa065('0x4c')](_0xa065('0x8f'));_0x11f227['removeClass'](_0xa065('0x8e'));},_0x2e66cb[_0xa065('0x90')]);window[_0xa065('0x88')][_0xa065('0x27')]=void 0x0;if(_0xa065('0x3')!==typeof _0x7d6e0f&&_0xa065('0x9')===typeof _0x7d6e0f[_0xa065('0x91')])return _0x2e66cb[_0xa065('0x92')]||(_0x251052(_0xa065('0x93')),_0x7d6e0f[_0xa065('0x91')]()),window[_0xa065('0x5b')][_0xa065('0x27')]=void 0x0,_0x7d6e0f[_0xa065('0x91')](function(_0x207d78){window['_Quatro_Digital_dropDown']['getOrderForm']=_0x207d78;_0x2a62c5['fn'][_0xa065('0x26')](!0x0,void 0x0,!0x0);},{'lastSku':_0x2a350c});window[_0xa065('0x88')][_0xa065('0x94')]=!0x0;_0x2a62c5['fn'][_0xa065('0x26')](!0x0);};(function(){if(_0x2e66cb[_0xa065('0x92')]&&_0x2e66cb['autoWatchBuyButton']){var _0x4a4a3d=_0x2a62c5(_0xa065('0x7d'));_0x4a4a3d[_0xa065('0x7')]&&_0x117ce0(_0x4a4a3d);}}());var _0x3bf01e=function(){var _0x250df6=_0x2a62c5(this);_0xa065('0x3')!==typeof _0x250df6[_0xa065('0x16')](_0xa065('0x7b'))?(_0x250df6[_0xa065('0x95')](_0xa065('0x96')),_0x4c985d(_0x250df6)):(_0x250df6['bind'](_0xa065('0x97'),function(_0x72224f){_0x250df6[_0xa065('0x95')]('click');_0x4c985d(_0x250df6);_0x2a62c5(this)[_0xa065('0x95')](_0x72224f);}),_0x2a62c5(window)[_0xa065('0x98')](function(){_0x250df6[_0xa065('0x95')]('click');_0x4c985d(_0x250df6);_0x250df6[_0xa065('0x95')](_0xa065('0x97'));}));};_0x58da3f[_0xa065('0x78')]=function(){var _0x4aadaa=_0x2a62c5(this),_0x1222ad=_0x4aadaa[_0xa065('0x36')](_0xa065('0x8c'))||'';if(-0x1<_0x1222ad[_0xa065('0x99')](_0x2e66cb[_0xa065('0x9a')]))return!0x0;_0x1222ad=_0x1222ad['replace'](/redirect\=(false|true)/gi,'')[_0xa065('0x2')]('?',_0xa065('0x9b'))[_0xa065('0x2')](/\&\&/gi,'&');if(_0x2e66cb[_0xa065('0x9c')](_0x4aadaa))return _0x4aadaa[_0xa065('0x36')](_0xa065('0x8c'),_0x1222ad[_0xa065('0x2')](_0xa065('0x9d'),_0xa065('0x9e'))),!0x0;_0x1222ad=_0x1222ad[_0xa065('0x2')](/http.?:/i,'');_0x597cef[_0xa065('0x9f')](function(_0x112c9b){if(!_0x2e66cb[_0xa065('0xa0')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x1222ad))return _0x112c9b();var _0x27e5ba=function(_0x1cda42,_0x59cb85){var _0x117ce0=_0x1222ad[_0xa065('0xa1')](/sku\=([0-9]+)/gi),_0x2b82d7=[];if('object'===typeof _0x117ce0&&null!==_0x117ce0)for(var _0x4c71f9=_0x117ce0[_0xa065('0x7')]-0x1;0x0<=_0x4c71f9;_0x4c71f9--){var _0x3d0469=parseInt(_0x117ce0[_0x4c71f9][_0xa065('0x2')](/sku\=/gi,''));isNaN(_0x3d0469)||_0x2b82d7['push'](_0x3d0469);}_0x2e66cb[_0xa065('0xa2')][_0xa065('0x29')](this,_0x1cda42,_0x59cb85,_0x1222ad);_0x58da3f[_0xa065('0xa3')][_0xa065('0x29')](this,_0x1cda42,_0x59cb85,_0x1222ad,_0x2b82d7);_0x58da3f['prodAdd'](_0x4aadaa,_0x1222ad[_0xa065('0xa4')](_0xa065('0xa5'))[_0xa065('0xa6')]()['split']('&')[_0xa065('0xa7')]());_0xa065('0x9')===typeof _0x2e66cb[_0xa065('0xa8')]&&_0x2e66cb[_0xa065('0xa8')][_0xa065('0x29')](this);_0x2a62c5(window)[_0xa065('0x61')]('productAddedToCart');_0x2a62c5(window)[_0xa065('0x61')](_0xa065('0xa9'));};_0x2e66cb[_0xa065('0xaa')]?(_0x27e5ba(null,_0xa065('0x1e')),_0x112c9b()):_0x2a62c5[_0xa065('0x1c')]({'url':_0x1222ad,'complete':_0x27e5ba})[_0xa065('0x21')](function(){_0x112c9b();});});};_0x58da3f[_0xa065('0xa3')]=function(_0x30becc,_0x49895b,_0x46007f,_0x13ce8b){try{_0xa065('0x1e')===_0x49895b&&_0xa065('0x2b')===typeof window[_0xa065('0xab')]&&_0xa065('0x9')===typeof window[_0xa065('0xab')][_0xa065('0xac')]&&window['parent'][_0xa065('0xac')](_0x30becc,_0x49895b,_0x46007f,_0x13ce8b);}catch(_0x5cb7b1){_0x251052('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x117ce0();_0xa065('0x9')===typeof _0x2e66cb[_0xa065('0x44')]?_0x2e66cb['callback'][_0xa065('0x29')](this):_0x251052(_0xa065('0xad'));};var _0x182a28=_0x2a62c5[_0xa065('0x69')]();_0x2a62c5['fn'][_0xa065('0x75')]=function(_0x1998fc,_0x48cc8f){var _0x4a86e7=_0x2a62c5(this);_0xa065('0x3')!==typeof _0x48cc8f||_0xa065('0x2b')!==typeof _0x1998fc||_0x1998fc instanceof _0x2a62c5||(_0x48cc8f=_0x1998fc,_0x1998fc=void 0x0);_0x2e66cb=_0x2a62c5[_0xa065('0x14')]({},_0x1748d4,_0x48cc8f);var _0x2b800e;_0x182a28['add'](function(){_0x4a86e7[_0xa065('0x80')](_0xa065('0xae'))['length']||_0x4a86e7[_0xa065('0xaf')](_0xa065('0xb0'));_0x2b800e=new _0x2a62c5[(_0xa065('0x75'))](_0x4a86e7,_0x1998fc);});_0x182a28[_0xa065('0x45')]();_0x2a62c5(window)['on'](_0xa065('0xb1'),function(_0x2ef1a1,_0x5e9ba5,_0x5019e8){_0x2b800e[_0xa065('0x89')](_0x5e9ba5,_0x5019e8);});return _0x2a62c5[_0xa065('0x14')](_0x4a86e7,_0x2b800e);};var _0x1572ca=0x0;_0x2a62c5(document)[_0xa065('0xb2')](function(_0x38ec02,_0x4907a6,_0x452cac){-0x1<_0x452cac['url'][_0xa065('0xf')]()['indexOf'](_0xa065('0xb3'))&&(_0x1572ca=(_0x452cac['url'][_0xa065('0xa1')](/sku\=([0-9]+)/i)||[''])[_0xa065('0xa6')]());});_0x2a62c5(window)[_0xa065('0x65')](_0xa065('0xb4'),function(){_0x2a62c5(window)['trigger'](_0xa065('0xb1'),[new _0x2a62c5(),_0x1572ca]);});_0x2a62c5(document)['ajaxStop'](function(){_0x182a28[_0xa065('0x45')]();});}catch(_0x5b261e){_0xa065('0x3')!==typeof console&&_0xa065('0x9')===typeof console['error']&&console[_0xa065('0x20')](_0xa065('0xb5'),_0x5b261e);}}(this));function qd_number_format(_0x1cb676,_0x2b0646,_0x885394,_0x5465ae){_0x1cb676=(_0x1cb676+'')['replace'](/[^0-9+\-Ee.]/g,'');_0x1cb676=isFinite(+_0x1cb676)?+_0x1cb676:0x0;_0x2b0646=isFinite(+_0x2b0646)?Math[_0xa065('0xb6')](_0x2b0646):0x0;_0x5465ae='undefined'===typeof _0x5465ae?',':_0x5465ae;_0x885394='undefined'===typeof _0x885394?'.':_0x885394;var _0x5ef068='',_0x5ef068=function(_0x487301,_0x268deb){var _0x1c06a9=Math['pow'](0xa,_0x268deb);return''+(Math[_0xa065('0x5')](_0x487301*_0x1c06a9)/_0x1c06a9)['toFixed'](_0x268deb);},_0x5ef068=(_0x2b0646?_0x5ef068(_0x1cb676,_0x2b0646):''+Math[_0xa065('0x5')](_0x1cb676))[_0xa065('0xa4')]('.');0x3<_0x5ef068[0x0][_0xa065('0x7')]&&(_0x5ef068[0x0]=_0x5ef068[0x0][_0xa065('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5465ae));(_0x5ef068[0x1]||'')[_0xa065('0x7')]<_0x2b0646&&(_0x5ef068[0x1]=_0x5ef068[0x1]||'',_0x5ef068[0x1]+=Array(_0x2b0646-_0x5ef068[0x1]['length']+0x1)['join']('0'));return _0x5ef068[_0xa065('0x8')](_0x885394);}(function(){try{window['_QuatroDigital_CartData']=window[_0xa065('0x38')]||{},window[_0xa065('0x38')][_0xa065('0x44')]=window[_0xa065('0x38')]['callback']||$['Callbacks']();}catch(_0x1f56b5){_0xa065('0x3')!==typeof console&&_0xa065('0x9')===typeof console[_0xa065('0x20')]&&console[_0xa065('0x20')]('Oooops!\x20',_0x1f56b5[_0xa065('0xb7')]);}}());(function(_0x45f495){try{var _0x14e7a2=jQuery,_0x5329be=function(_0x3a805d,_0x2ae1c6){if(_0xa065('0x2b')===typeof console&&'undefined'!==typeof console['error']&&_0xa065('0x3')!==typeof console[_0xa065('0x2f')]&&'undefined'!==typeof console[_0xa065('0x2d')]){var _0x5f5414;_0xa065('0x2b')===typeof _0x3a805d?(_0x3a805d[_0xa065('0xb8')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x5f5414=_0x3a805d):_0x5f5414=[_0xa065('0xb9')+_0x3a805d];if(_0xa065('0x3')===typeof _0x2ae1c6||_0xa065('0x2c')!==_0x2ae1c6['toLowerCase']()&&_0xa065('0x6b')!==_0x2ae1c6[_0xa065('0xf')]())if('undefined'!==typeof _0x2ae1c6&&'info'===_0x2ae1c6[_0xa065('0xf')]())try{console['info'][_0xa065('0x6c')](console,_0x5f5414);}catch(_0x218c17){try{console[_0xa065('0x2f')](_0x5f5414['join']('\x0a'));}catch(_0x1aa7cd){}}else try{console[_0xa065('0x20')][_0xa065('0x6c')](console,_0x5f5414);}catch(_0x41cb02){try{console['error'](_0x5f5414[_0xa065('0x8')]('\x0a'));}catch(_0x132e7a){}}else try{console[_0xa065('0x2d')][_0xa065('0x6c')](console,_0x5f5414);}catch(_0x51c7d9){try{console[_0xa065('0x2d')](_0x5f5414[_0xa065('0x8')]('\x0a'));}catch(_0x5de622){}}}};window['_QuatroDigital_DropDown']=window[_0xa065('0x5b')]||{};window[_0xa065('0x5b')][_0xa065('0x94')]=!0x0;_0x14e7a2[_0xa065('0xba')]=function(){};_0x14e7a2['fn'][_0xa065('0xba')]=function(){return{'fn':new _0x14e7a2()};};var _0x4bb268=function(_0x44234f){var _0x2990f0={'i':_0xa065('0xbb')};return function(_0xe3aaca){var _0x45feb4=function(_0x7128a6){return _0x7128a6;};var _0x1834ac=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0xe3aaca=_0xe3aaca['d'+_0x1834ac[0x10]+'c'+_0x1834ac[0x11]+'m'+_0x45feb4(_0x1834ac[0x1])+'n'+_0x1834ac[0xd]]['l'+_0x1834ac[0x12]+'c'+_0x1834ac[0x0]+'ti'+_0x45feb4('o')+'n'];var _0x1360b1=function(_0x44c0d6){return escape(encodeURIComponent(_0x44c0d6['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x2089f8){return String['fromCharCode'](('Z'>=_0x2089f8?0x5a:0x7a)>=(_0x2089f8=_0x2089f8[_0xa065('0xbc')](0x0)+0xd)?_0x2089f8:_0x2089f8-0x1a);})));};var _0x45f495=_0x1360b1(_0xe3aaca[[_0x1834ac[0x9],_0x45feb4('o'),_0x1834ac[0xc],_0x1834ac[_0x45feb4(0xd)]][_0xa065('0x8')]('')]);_0x1360b1=_0x1360b1((window[['js',_0x45feb4('no'),'m',_0x1834ac[0x1],_0x1834ac[0x4][_0xa065('0xd')](),_0xa065('0xbd')][_0xa065('0x8')]('')]||_0xa065('0x8d'))+['.v',_0x1834ac[0xd],'e',_0x45feb4('x'),'co',_0x45feb4('mm'),_0xa065('0xbe'),_0x1834ac[0x1],'.c',_0x45feb4('o'),'m.',_0x1834ac[0x13],'r'][_0xa065('0x8')](''));for(var _0x5002d1 in _0x2990f0){if(_0x1360b1===_0x5002d1+_0x2990f0[_0x5002d1]||_0x45f495===_0x5002d1+_0x2990f0[_0x5002d1]){var _0x5bc0a6='tr'+_0x1834ac[0x11]+'e';break;}_0x5bc0a6='f'+_0x1834ac[0x0]+'ls'+_0x45feb4(_0x1834ac[0x1])+'';}_0x45feb4=!0x1;-0x1<_0xe3aaca[[_0x1834ac[0xc],'e',_0x1834ac[0x0],'rc',_0x1834ac[0x9]][_0xa065('0x8')]('')]['indexOf'](_0xa065('0xbf'))&&(_0x45feb4=!0x0);return[_0x5bc0a6,_0x45feb4];}(_0x44234f);}(window);if(!eval(_0x4bb268[0x0]))return _0x4bb268[0x1]?_0x5329be('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x14e7a2[_0xa065('0xba')]=function(_0x54f114,_0x4e7dc1){var _0x4a16c2=_0x14e7a2(_0x54f114);if(!_0x4a16c2[_0xa065('0x7')])return _0x4a16c2;var _0x2ce1e7=_0x14e7a2[_0xa065('0x14')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xa065('0xc0'),'linkCheckout':_0xa065('0xc1'),'cartTotal':_0xa065('0xc2'),'emptyCart':_0xa065('0xc3'),'continueShopping':_0xa065('0xc4'),'shippingForm':_0xa065('0xc5')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x5e1703){return _0x5e1703['skuName']||_0x5e1703[_0xa065('0xc6')];},'callback':function(){},'callbackProductsList':function(){}},_0x4e7dc1);_0x14e7a2('');var _0x20e6d9=this;if(_0x2ce1e7[_0xa065('0x5a')]){var _0x1e4731=!0x1;_0xa065('0x3')===typeof window[_0xa065('0x5c')]&&(_0x5329be('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x14e7a2[_0xa065('0x1c')]({'url':_0xa065('0xc7'),'async':!0x1,'dataType':'script','error':function(){_0x5329be(_0xa065('0xc8'));_0x1e4731=!0x0;}}));if(_0x1e4731)return _0x5329be(_0xa065('0xc9'));}if(_0xa065('0x2b')===typeof window[_0xa065('0x5c')]&&_0xa065('0x3')!==typeof window['vtexjs'][_0xa065('0x28')])var _0x289343=window[_0xa065('0x5c')][_0xa065('0x28')];else if(_0xa065('0x2b')===typeof vtex&&_0xa065('0x2b')===typeof vtex[_0xa065('0x28')]&&_0xa065('0x3')!==typeof vtex['checkout'][_0xa065('0x5d')])_0x289343=new vtex['checkout'][(_0xa065('0x5d'))]();else return _0x5329be(_0xa065('0xca'));_0x20e6d9[_0xa065('0xcb')]=_0xa065('0xcc');var _0x1e9cd0=function(_0x1e5ed2){_0x14e7a2(this)[_0xa065('0x82')](_0x1e5ed2);_0x1e5ed2['find']('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0xa065('0x30')](_0x14e7a2(_0xa065('0xcd')))['on'](_0xa065('0xce'),function(){_0x4a16c2['removeClass'](_0xa065('0xcf'));_0x14e7a2(document[_0xa065('0x70')])['removeClass'](_0xa065('0x8b'));});_0x14e7a2(document)[_0xa065('0xd0')](_0xa065('0xd1'))['on'](_0xa065('0xd1'),function(_0x24947a){0x1b==_0x24947a[_0xa065('0xd2')]&&(_0x4a16c2[_0xa065('0x4c')]('qd-bb-lightBoxProdAdd'),_0x14e7a2(document[_0xa065('0x70')])[_0xa065('0x4c')](_0xa065('0x8b')));});var _0x260342=_0x1e5ed2[_0xa065('0x54')](_0xa065('0xd3'));_0x1e5ed2[_0xa065('0x54')](_0xa065('0xd4'))['on'](_0xa065('0xd5'),function(){_0x20e6d9['scrollCart']('-',void 0x0,void 0x0,_0x260342);return!0x1;});_0x1e5ed2[_0xa065('0x54')]('.qd-ddc-scrollDown')['on'](_0xa065('0xd6'),function(){_0x20e6d9[_0xa065('0xd7')](void 0x0,void 0x0,void 0x0,_0x260342);return!0x1;});_0x1e5ed2['find'](_0xa065('0xd8'))[_0xa065('0xd9')]('')['on'](_0xa065('0xda'),function(){_0x20e6d9['shippingCalculate'](_0x14e7a2(this));});if(_0x2ce1e7['updateOnlyHover']){var _0x4e7dc1=0x0;_0x14e7a2(this)['on'](_0xa065('0xdb'),function(){var _0x1e5ed2=function(){window['_QuatroDigital_DropDown'][_0xa065('0x94')]&&(_0x20e6d9[_0xa065('0x91')](),window[_0xa065('0x5b')][_0xa065('0x94')]=!0x1,_0x14e7a2['fn'][_0xa065('0x26')](!0x0),_0x20e6d9[_0xa065('0xdc')]());};_0x4e7dc1=setInterval(function(){_0x1e5ed2();},0x258);_0x1e5ed2();});_0x14e7a2(this)['on'](_0xa065('0xdd'),function(){clearInterval(_0x4e7dc1);});}};var _0x4f199e=function(_0x52742a){_0x52742a=_0x14e7a2(_0x52742a);_0x2ce1e7[_0xa065('0xde')][_0xa065('0x55')]=_0x2ce1e7['texts'][_0xa065('0x55')]['replace']('#value',_0xa065('0xdf'));_0x2ce1e7[_0xa065('0xde')]['cartTotal']=_0x2ce1e7['texts'][_0xa065('0x55')][_0xa065('0x2')](_0xa065('0xe0'),'<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x2ce1e7[_0xa065('0xde')][_0xa065('0x55')]=_0x2ce1e7[_0xa065('0xde')]['cartTotal'][_0xa065('0x2')](_0xa065('0xe1'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x2ce1e7[_0xa065('0xde')]['cartTotal']=_0x2ce1e7['texts'][_0xa065('0x55')][_0xa065('0x2')](_0xa065('0xe2'),_0xa065('0xe3'));_0x52742a['find'](_0xa065('0xe4'))[_0xa065('0x50')](_0x2ce1e7[_0xa065('0xde')][_0xa065('0xe5')]);_0x52742a['find'](_0xa065('0xe6'))[_0xa065('0x50')](_0x2ce1e7[_0xa065('0xde')][_0xa065('0xe7')]);_0x52742a['find'](_0xa065('0xe8'))[_0xa065('0x50')](_0x2ce1e7[_0xa065('0xde')]['linkCheckout']);_0x52742a[_0xa065('0x54')](_0xa065('0xe9'))[_0xa065('0x50')](_0x2ce1e7['texts'][_0xa065('0x55')]);_0x52742a[_0xa065('0x54')]('.qd-ddc-shipping')['html'](_0x2ce1e7[_0xa065('0xde')]['shippingForm']);_0x52742a[_0xa065('0x54')]('.qd-ddc-emptyCart\x20p')[_0xa065('0x50')](_0x2ce1e7[_0xa065('0xde')]['emptyCart']);return _0x52742a;}(this['cartContainer']);var _0x23026f=0x0;_0x4a16c2[_0xa065('0x51')](function(){0x0<_0x23026f?_0x1e9cd0[_0xa065('0x29')](this,_0x4f199e[_0xa065('0xea')]()):_0x1e9cd0[_0xa065('0x29')](this,_0x4f199e);_0x23026f++;});window[_0xa065('0x38')][_0xa065('0x44')][_0xa065('0x30')](function(){_0x14e7a2(_0xa065('0xeb'))[_0xa065('0x50')](window[_0xa065('0x38')][_0xa065('0x3c')]||'--');_0x14e7a2(_0xa065('0xec'))[_0xa065('0x50')](window[_0xa065('0x38')][_0xa065('0x40')]||'0');_0x14e7a2('.qd-ddc-infoTotalShipping')['html'](window['_QuatroDigital_CartData']['shipping']||'--');_0x14e7a2(_0xa065('0xed'))[_0xa065('0x50')](window['_QuatroDigital_CartData'][_0xa065('0x3f')]||'--');});var _0x135412=function(_0x57b191,_0x113df0){if('undefined'===typeof _0x57b191[_0xa065('0x42')])return _0x5329be(_0xa065('0xee'));_0x20e6d9['renderProductsList'][_0xa065('0x29')](this,_0x113df0);};_0x20e6d9[_0xa065('0x91')]=function(_0x2ccc9f,_0x108c5b){'undefined'!=typeof _0x108c5b?window[_0xa065('0x5b')]['dataOptionsCache']=_0x108c5b:window['_QuatroDigital_DropDown']['dataOptionsCache']&&(_0x108c5b=window['_QuatroDigital_DropDown']['dataOptionsCache']);setTimeout(function(){window[_0xa065('0x5b')][_0xa065('0xef')]=void 0x0;},_0x2ce1e7[_0xa065('0x90')]);_0x14e7a2('.qd-ddc-wrapper')['removeClass'](_0xa065('0xf0'));if(_0x2ce1e7[_0xa065('0x5a')]){var _0x4e7dc1=function(_0x4745a5){window[_0xa065('0x5b')]['getOrderForm']=_0x4745a5;_0x135412(_0x4745a5,_0x108c5b);'undefined'!==typeof window[_0xa065('0xf1')]&&_0xa065('0x9')===typeof window['_QuatroDigital_AmountProduct'][_0xa065('0xf2')]&&window[_0xa065('0xf1')][_0xa065('0xf2')][_0xa065('0x29')](this);_0x14e7a2('.qd-ddc-wrapper')[_0xa065('0x4b')](_0xa065('0xf0'));};_0xa065('0x3')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']?(_0x4e7dc1(window[_0xa065('0x5b')][_0xa065('0x27')]),_0xa065('0x9')===typeof _0x2ccc9f&&_0x2ccc9f(window[_0xa065('0x5b')][_0xa065('0x27')])):_0x14e7a2['QD_checkoutQueue']([_0xa065('0x42'),_0xa065('0x39'),_0xa065('0xf3')],{'done':function(_0x49c2e7){_0x4e7dc1[_0xa065('0x29')](this,_0x49c2e7);_0xa065('0x9')===typeof _0x2ccc9f&&_0x2ccc9f(_0x49c2e7);},'fail':function(_0x453131){_0x5329be([_0xa065('0xf4'),_0x453131]);}});}else alert(_0xa065('0xf5'));};_0x20e6d9[_0xa065('0xdc')]=function(){var _0x236419=_0x14e7a2(_0xa065('0xf6'));_0x236419['find'](_0xa065('0xf7'))[_0xa065('0x7')]?_0x236419['removeClass'](_0xa065('0xf8')):_0x236419[_0xa065('0x4b')](_0xa065('0xf8'));};_0x20e6d9['renderProductsList']=function(_0x23f7e8){var _0x4e7dc1=_0x14e7a2('.qd-ddc-prodWrapper2');_0x4e7dc1[_0xa065('0xf9')]();_0x4e7dc1['each'](function(){var _0x4e7dc1=_0x14e7a2(this),_0x54f114,_0xc84507,_0x5b021e=_0x14e7a2(''),_0x19b8cb;for(_0x19b8cb in window[_0xa065('0x5b')][_0xa065('0x27')][_0xa065('0x42')])if(_0xa065('0x2b')===typeof window[_0xa065('0x5b')][_0xa065('0x27')][_0xa065('0x42')][_0x19b8cb]){var _0x5a6431=window[_0xa065('0x5b')][_0xa065('0x27')]['items'][_0x19b8cb];var _0x5b3c53=_0x5a6431[_0xa065('0xfa')][_0xa065('0x2')](/^\/|\/$/g,'')['split']('/');var _0x7ea87e=_0x14e7a2(_0xa065('0xfb'));_0x7ea87e[_0xa065('0x36')]({'data-sku':_0x5a6431['id'],'data-sku-index':_0x19b8cb,'data-qd-departament':_0x5b3c53[0x0],'data-qd-category':_0x5b3c53[_0x5b3c53['length']-0x1]});_0x7ea87e['addClass']('qd-ddc-'+_0x5a6431['availability']);_0x7ea87e['find'](_0xa065('0xfc'))[_0xa065('0x82')](_0x2ce1e7[_0xa065('0xfd')](_0x5a6431));_0x7ea87e[_0xa065('0x54')](_0xa065('0xfe'))['append'](isNaN(_0x5a6431['sellingPrice'])?_0x5a6431[_0xa065('0xff')]:0x0==_0x5a6431['sellingPrice']?_0xa065('0x100'):(_0x14e7a2(_0xa065('0x35'))['attr'](_0xa065('0x101'))||'R$')+'\x20'+qd_number_format(_0x5a6431['sellingPrice']/0x64,0x2,',','.'));_0x7ea87e[_0xa065('0x54')]('.qd-ddc-quantity')[_0xa065('0x36')]({'data-sku':_0x5a6431['id'],'data-sku-index':_0x19b8cb})['val'](_0x5a6431['quantity']);_0x7ea87e[_0xa065('0x54')](_0xa065('0x102'))[_0xa065('0x36')]({'data-sku':_0x5a6431['id'],'data-sku-index':_0x19b8cb});_0x20e6d9[_0xa065('0x103')](_0x5a6431['id'],_0x7ea87e[_0xa065('0x54')](_0xa065('0x104')),_0x5a6431['imageUrl']);_0x7ea87e[_0xa065('0x54')](_0xa065('0x105'))['attr']({'data-sku':_0x5a6431['id'],'data-sku-index':_0x19b8cb});_0x7ea87e[_0xa065('0x106')](_0x4e7dc1);_0x5b021e=_0x5b021e[_0xa065('0x30')](_0x7ea87e);}try{var _0x5c5fa0=_0x4e7dc1[_0xa065('0x0')](_0xa065('0xf6'))['find'](_0xa065('0xd8'));_0x5c5fa0['length']&&''==_0x5c5fa0[_0xa065('0xd9')]()&&window[_0xa065('0x5b')][_0xa065('0x27')]['shippingData'][_0xa065('0x107')]&&_0x5c5fa0[_0xa065('0xd9')](window[_0xa065('0x5b')][_0xa065('0x27')]['shippingData'][_0xa065('0x107')][_0xa065('0x108')]);}catch(_0x2cae47){_0x5329be(_0xa065('0x109')+_0x2cae47[_0xa065('0xb7')],_0xa065('0x6b'));}_0x20e6d9[_0xa065('0x10a')](_0x4e7dc1);_0x20e6d9[_0xa065('0xdc')]();_0x23f7e8&&_0x23f7e8[_0xa065('0x10b')]&&function(){_0xc84507=_0x5b021e[_0xa065('0x46')]('[data-sku=\x27'+_0x23f7e8[_0xa065('0x10b')]+'\x27]');_0xc84507[_0xa065('0x7')]&&(_0x54f114=0x0,_0x5b021e['each'](function(){var _0x23f7e8=_0x14e7a2(this);if(_0x23f7e8['is'](_0xc84507))return!0x1;_0x54f114+=_0x23f7e8[_0xa065('0x10c')]();}),_0x20e6d9['scrollCart'](void 0x0,void 0x0,_0x54f114,_0x4e7dc1['add'](_0x4e7dc1[_0xa065('0xab')]())),_0x5b021e[_0xa065('0x4c')](_0xa065('0x10d')),function(_0x285ca2){_0x285ca2[_0xa065('0x4b')](_0xa065('0x10e'));_0x285ca2['addClass']('qd-ddc-lastAddedFixed');setTimeout(function(){_0x285ca2[_0xa065('0x4c')]('qd-ddc-lastAdded');},_0x2ce1e7[_0xa065('0x90')]);}(_0xc84507));}();});(function(){_QuatroDigital_DropDown[_0xa065('0x27')][_0xa065('0x42')][_0xa065('0x7')]?(_0x14e7a2(_0xa065('0x70'))[_0xa065('0x4c')]('qd-ddc-cart-empty')[_0xa065('0x4b')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x14e7a2(_0xa065('0x70'))['removeClass'](_0xa065('0x10f'));},_0x2ce1e7[_0xa065('0x90')])):_0x14e7a2(_0xa065('0x70'))[_0xa065('0x4c')](_0xa065('0x110'))[_0xa065('0x4b')](_0xa065('0x111'));}());_0xa065('0x9')===typeof _0x2ce1e7[_0xa065('0x112')]?_0x2ce1e7['callbackProductsList'][_0xa065('0x29')](this):_0x5329be('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x20e6d9[_0xa065('0x103')]=function(_0x32e38e,_0x45866b,_0x275416){function _0x461b59(){_0x45866b['removeClass']('qd-loaded')['load'](function(){_0x14e7a2(this)[_0xa065('0x4b')](_0xa065('0x113'));})[_0xa065('0x36')](_0xa065('0x114'),_0x275416);}_0x275416?_0x461b59():isNaN(_0x32e38e)?_0x5329be('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xa065('0x2c')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x20e6d9['actionButtons']=function(_0x295b1d){var _0x3a59c9=function(_0x58799a,_0x5b1a10){var _0x4e7dc1=_0x14e7a2(_0x58799a);var _0x1b9f1e=_0x4e7dc1[_0xa065('0x36')](_0xa065('0x115'));var _0x54f114=_0x4e7dc1['attr'](_0xa065('0x116'));if(_0x1b9f1e){var _0x3260fa=parseInt(_0x4e7dc1[_0xa065('0xd9')]())||0x1;_0x20e6d9['changeQantity']([_0x1b9f1e,_0x54f114],_0x3260fa,_0x3260fa+0x1,function(_0x41abda){_0x4e7dc1[_0xa065('0xd9')](_0x41abda);_0xa065('0x9')===typeof _0x5b1a10&&_0x5b1a10();});}};var _0x4e7dc1=function(_0x2f5998,_0x40e751){var _0x4e7dc1=_0x14e7a2(_0x2f5998);var _0x12faab=_0x4e7dc1[_0xa065('0x36')](_0xa065('0x115'));var _0x54f114=_0x4e7dc1[_0xa065('0x36')](_0xa065('0x116'));if(_0x12faab){var _0x334301=parseInt(_0x4e7dc1[_0xa065('0xd9')]())||0x2;_0x20e6d9[_0xa065('0x117')]([_0x12faab,_0x54f114],_0x334301,_0x334301-0x1,function(_0xee2a47){_0x4e7dc1[_0xa065('0xd9')](_0xee2a47);_0xa065('0x9')===typeof _0x40e751&&_0x40e751();});}};var _0x5ee587=function(_0x5c6699,_0x5c4d6a){var _0x4e7dc1=_0x14e7a2(_0x5c6699);var _0x38fc08=_0x4e7dc1[_0xa065('0x36')]('data-sku');var _0x54f114=_0x4e7dc1[_0xa065('0x36')](_0xa065('0x116'));if(_0x38fc08){var _0x4ac2a6=parseInt(_0x4e7dc1[_0xa065('0xd9')]())||0x1;_0x20e6d9['changeQantity']([_0x38fc08,_0x54f114],0x1,_0x4ac2a6,function(_0x53ec37){_0x4e7dc1[_0xa065('0xd9')](_0x53ec37);'function'===typeof _0x5c4d6a&&_0x5c4d6a();});}};var _0x54f114=_0x295b1d[_0xa065('0x54')](_0xa065('0x118'));_0x54f114[_0xa065('0x4b')](_0xa065('0x119'))[_0xa065('0x51')](function(){var _0x295b1d=_0x14e7a2(this);_0x295b1d[_0xa065('0x54')](_0xa065('0x11a'))['on'](_0xa065('0x11b'),function(_0x235d16){_0x235d16[_0xa065('0x79')]();_0x54f114[_0xa065('0x4b')]('qd-loading');_0x3a59c9(_0x295b1d['find'](_0xa065('0x11c')),function(){_0x54f114['removeClass']('qd-loading');});});_0x295b1d[_0xa065('0x54')](_0xa065('0x11d'))['on'](_0xa065('0x11e'),function(_0x2b8042){_0x2b8042[_0xa065('0x79')]();_0x54f114[_0xa065('0x4b')](_0xa065('0x11f'));_0x4e7dc1(_0x295b1d[_0xa065('0x54')]('.qd-ddc-quantity'),function(){_0x54f114[_0xa065('0x4c')]('qd-loading');});});_0x295b1d[_0xa065('0x54')](_0xa065('0x11c'))['on'](_0xa065('0x120'),function(){_0x54f114[_0xa065('0x4b')](_0xa065('0x11f'));_0x5ee587(this,function(){_0x54f114['removeClass']('qd-loading');});});_0x295b1d[_0xa065('0x54')](_0xa065('0x11c'))['on'](_0xa065('0x121'),function(_0x5a2ad5){0xd==_0x5a2ad5['keyCode']&&(_0x54f114['addClass'](_0xa065('0x11f')),_0x5ee587(this,function(){_0x54f114[_0xa065('0x4c')]('qd-loading');}));});});_0x295b1d['find'](_0xa065('0xf7'))[_0xa065('0x51')](function(){var _0x295b1d=_0x14e7a2(this);_0x295b1d[_0xa065('0x54')](_0xa065('0x102'))['on']('click.qd_ddc_remove',function(){_0x295b1d[_0xa065('0x4b')]('qd-loading');_0x20e6d9[_0xa065('0x122')](_0x14e7a2(this),function(_0x1120fb){_0x1120fb?_0x295b1d['stop'](!0x0)[_0xa065('0x123')](function(){_0x295b1d[_0xa065('0x124')]();_0x20e6d9['cartIsEmpty']();}):_0x295b1d[_0xa065('0x4c')](_0xa065('0x11f'));});return!0x1;});});};_0x20e6d9['shippingCalculate']=function(_0x27901f){var _0x4dad8a=_0x27901f['val'](),_0x4dad8a=_0x4dad8a[_0xa065('0x2')](/[^0-9\-]/g,''),_0x4dad8a=_0x4dad8a[_0xa065('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xa065('0x125')),_0x4dad8a=_0x4dad8a[_0xa065('0x2')](/(.{9}).*/g,'$1');_0x27901f[_0xa065('0xd9')](_0x4dad8a);0x9<=_0x4dad8a[_0xa065('0x7')]&&(_0x27901f[_0xa065('0x16')](_0xa065('0x126'))!=_0x4dad8a&&_0x289343[_0xa065('0x127')]({'postalCode':_0x4dad8a,'country':_0xa065('0x128')})[_0xa065('0x1d')](function(_0x17601a){window['_QuatroDigital_DropDown']['getOrderForm']=_0x17601a;_0x20e6d9[_0xa065('0x91')]();})['fail'](function(_0x474f63){_0x5329be([_0xa065('0x129'),_0x474f63]);updateCartData();}),_0x27901f[_0xa065('0x16')](_0xa065('0x126'),_0x4dad8a));};_0x20e6d9['changeQantity']=function(_0x11e9a7,_0xbc8b92,_0x47b8f6,_0x224b20){function _0x504b21(_0x14e0fa){_0x14e0fa=_0xa065('0x12a')!==typeof _0x14e0fa?!0x1:_0x14e0fa;_0x20e6d9[_0xa065('0x91')]();window[_0xa065('0x5b')]['allowUpdate']=!0x1;_0x20e6d9[_0xa065('0xdc')]();_0xa065('0x3')!==typeof window[_0xa065('0xf1')]&&_0xa065('0x9')===typeof window[_0xa065('0xf1')][_0xa065('0xf2')]&&window['_QuatroDigital_AmountProduct'][_0xa065('0xf2')][_0xa065('0x29')](this);'function'===typeof adminCart&&adminCart();_0x14e7a2['fn'][_0xa065('0x26')](!0x0,void 0x0,_0x14e0fa);_0xa065('0x9')===typeof _0x224b20&&_0x224b20(_0xbc8b92);}_0x47b8f6=_0x47b8f6||0x1;if(0x1>_0x47b8f6)return _0xbc8b92;if(_0x2ce1e7[_0xa065('0x5a')]){if(_0xa065('0x3')===typeof window['_QuatroDigital_DropDown'][_0xa065('0x27')][_0xa065('0x42')][_0x11e9a7[0x1]])return _0x5329be(_0xa065('0x12b')+_0x11e9a7[0x1]+']'),_0xbc8b92;window[_0xa065('0x5b')][_0xa065('0x27')][_0xa065('0x42')][_0x11e9a7[0x1]][_0xa065('0x43')]=_0x47b8f6;window['_QuatroDigital_DropDown'][_0xa065('0x27')][_0xa065('0x42')][_0x11e9a7[0x1]][_0xa065('0x12c')]=_0x11e9a7[0x1];_0x289343[_0xa065('0x12d')]([window[_0xa065('0x5b')][_0xa065('0x27')][_0xa065('0x42')][_0x11e9a7[0x1]]],['items',_0xa065('0x39'),_0xa065('0xf3')])['done'](function(_0x239113){window[_0xa065('0x5b')][_0xa065('0x27')]=_0x239113;_0x504b21(!0x0);})[_0xa065('0x1f')](function(_0x532175){_0x5329be([_0xa065('0x12e'),_0x532175]);_0x504b21();});}else _0x5329be(_0xa065('0x12f'));};_0x20e6d9[_0xa065('0x122')]=function(_0xc6aa2f,_0x52f8f5){function _0x279122(_0x271e56){_0x271e56='boolean'!==typeof _0x271e56?!0x1:_0x271e56;_0xa065('0x3')!==typeof window[_0xa065('0xf1')]&&_0xa065('0x9')===typeof window[_0xa065('0xf1')][_0xa065('0xf2')]&&window[_0xa065('0xf1')][_0xa065('0xf2')][_0xa065('0x29')](this);_0xa065('0x9')===typeof adminCart&&adminCart();_0x14e7a2['fn']['simpleCart'](!0x0,void 0x0,_0x271e56);'function'===typeof _0x52f8f5&&_0x52f8f5(_0x54f114);}var _0x54f114=!0x1,_0x63c3=_0x14e7a2(_0xc6aa2f)['attr']('data-sku-index');if(_0x2ce1e7[_0xa065('0x5a')]){if('undefined'===typeof window[_0xa065('0x5b')][_0xa065('0x27')][_0xa065('0x42')][_0x63c3])return _0x5329be(_0xa065('0x12b')+_0x63c3+']'),_0x54f114;window['_QuatroDigital_DropDown'][_0xa065('0x27')][_0xa065('0x42')][_0x63c3][_0xa065('0x12c')]=_0x63c3;_0x289343['removeItems']([window['_QuatroDigital_DropDown'][_0xa065('0x27')][_0xa065('0x42')][_0x63c3]],['items',_0xa065('0x39'),_0xa065('0xf3')])['done'](function(_0x428cda){_0x54f114=!0x0;window[_0xa065('0x5b')][_0xa065('0x27')]=_0x428cda;_0x135412(_0x428cda);_0x279122(!0x0);})[_0xa065('0x1f')](function(_0x4eca11){_0x5329be([_0xa065('0x130'),_0x4eca11]);_0x279122();});}else alert(_0xa065('0x131'));};_0x20e6d9[_0xa065('0xd7')]=function(_0x6ea671,_0xe2b5,_0x413bfc,_0x177d82){_0x177d82=_0x177d82||_0x14e7a2(_0xa065('0x132'));_0x6ea671=_0x6ea671||'+';_0xe2b5=_0xe2b5||0.9*_0x177d82['height']();_0x177d82['stop'](!0x0,!0x0)[_0xa065('0x133')]({'scrollTop':isNaN(_0x413bfc)?_0x6ea671+'='+_0xe2b5+'px':_0x413bfc});};_0x2ce1e7[_0xa065('0x134')]||(_0x20e6d9[_0xa065('0x91')](),_0x14e7a2['fn'][_0xa065('0x26')](!0x0));_0x14e7a2(window)['on'](_0xa065('0x135'),function(){try{window[_0xa065('0x5b')]['getOrderForm']=void 0x0,_0x20e6d9[_0xa065('0x91')]();}catch(_0x37e75a){_0x5329be(_0xa065('0x136')+_0x37e75a[_0xa065('0xb7')],_0xa065('0x137'));}});_0xa065('0x9')===typeof _0x2ce1e7[_0xa065('0x44')]?_0x2ce1e7[_0xa065('0x44')][_0xa065('0x29')](this):_0x5329be(_0xa065('0xad'));};_0x14e7a2['fn']['QD_dropDownCart']=function(_0x4c382f){var _0x543d61=_0x14e7a2(this);_0x543d61['fn']=new _0x14e7a2[(_0xa065('0xba'))](this,_0x4c382f);return _0x543d61;};}catch(_0x51ef56){_0xa065('0x3')!==typeof console&&_0xa065('0x9')===typeof console['error']&&console[_0xa065('0x20')](_0xa065('0xb5'),_0x51ef56);}}(this));(function(_0xe7855a){try{var _0x2f1ef7=jQuery;window['_QuatroDigital_AmountProduct']=window['_QuatroDigital_AmountProduct']||{};window[_0xa065('0xf1')][_0xa065('0x42')]={};window[_0xa065('0xf1')][_0xa065('0x138')]=!0x1;window[_0xa065('0xf1')][_0xa065('0x139')]=!0x1;window[_0xa065('0xf1')][_0xa065('0x13a')]=!0x1;var _0x23c676=function(){if(window['_QuatroDigital_AmountProduct'][_0xa065('0x138')]){var _0x2f016f=!0x1;var _0xe7855a={};window['_QuatroDigital_AmountProduct'][_0xa065('0x42')]={};for(_0x1426e0 in window[_0xa065('0x5b')][_0xa065('0x27')]['items'])if(_0xa065('0x2b')===typeof window[_0xa065('0x5b')][_0xa065('0x27')]['items'][_0x1426e0]){var _0x299b4c=window[_0xa065('0x5b')][_0xa065('0x27')]['items'][_0x1426e0];_0xa065('0x3')!==typeof _0x299b4c['productId']&&null!==_0x299b4c[_0xa065('0x13b')]&&''!==_0x299b4c['productId']&&(window[_0xa065('0xf1')]['items']['prod_'+_0x299b4c[_0xa065('0x13b')]]=window[_0xa065('0xf1')][_0xa065('0x42')][_0xa065('0x13c')+_0x299b4c[_0xa065('0x13b')]]||{},window[_0xa065('0xf1')][_0xa065('0x42')][_0xa065('0x13c')+_0x299b4c[_0xa065('0x13b')]][_0xa065('0x13d')]=_0x299b4c[_0xa065('0x13b')],_0xe7855a[_0xa065('0x13c')+_0x299b4c[_0xa065('0x13b')]]||(window[_0xa065('0xf1')][_0xa065('0x42')][_0xa065('0x13c')+_0x299b4c[_0xa065('0x13b')]]['qtt']=0x0),window[_0xa065('0xf1')][_0xa065('0x42')][_0xa065('0x13c')+_0x299b4c[_0xa065('0x13b')]][_0xa065('0x40')]+=_0x299b4c['quantity'],_0x2f016f=!0x0,_0xe7855a['prod_'+_0x299b4c[_0xa065('0x13b')]]=!0x0);}var _0x1426e0=_0x2f016f;}else _0x1426e0=void 0x0;window['_QuatroDigital_AmountProduct'][_0xa065('0x138')]&&(_0x2f1ef7(_0xa065('0x13e'))[_0xa065('0x124')](),_0x2f1ef7(_0xa065('0x13f'))[_0xa065('0x4c')](_0xa065('0x140')));for(var _0x3f854b in window[_0xa065('0xf1')]['items']){_0x299b4c=window['_QuatroDigital_AmountProduct'][_0xa065('0x42')][_0x3f854b];if(_0xa065('0x2b')!==typeof _0x299b4c)return;_0xe7855a=_0x2f1ef7(_0xa065('0x141')+_0x299b4c[_0xa065('0x13d')]+']')[_0xa065('0x0')]('li');if(window[_0xa065('0xf1')][_0xa065('0x138')]||!_0xe7855a[_0xa065('0x54')](_0xa065('0x13e'))[_0xa065('0x7')])_0x2f016f=_0x2f1ef7(_0xa065('0x142')),_0x2f016f['find']('.qd-bap-qtt')[_0xa065('0x50')](_0x299b4c['qtt']),_0x299b4c=_0xe7855a[_0xa065('0x54')]('.qd_bap_wrapper_content'),_0x299b4c['length']?_0x299b4c[_0xa065('0xaf')](_0x2f016f)['addClass'](_0xa065('0x140')):_0xe7855a['prepend'](_0x2f016f);}_0x1426e0&&(window[_0xa065('0xf1')][_0xa065('0x138')]=!0x1);};window[_0xa065('0xf1')][_0xa065('0xf2')]=function(){window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x0;_0x23c676[_0xa065('0x29')](this);};_0x2f1ef7(document)[_0xa065('0x143')](function(){_0x23c676['call'](this);});}catch(_0x38ca5e){_0xa065('0x3')!==typeof console&&_0xa065('0x9')===typeof console[_0xa065('0x20')]&&console['error'](_0xa065('0xb5'),_0x38ca5e);}}(this));(function(){try{var _0x458b08=jQuery,_0x55cfcc,_0x1c6633={'selector':_0xa065('0x144'),'dropDown':{},'buyButton':{}};_0x458b08[_0xa065('0x145')]=function(_0x1d12ef){var _0x1ab624={};_0x55cfcc=_0x458b08[_0xa065('0x14')](!0x0,{},_0x1c6633,_0x1d12ef);_0x1d12ef=_0x458b08(_0x55cfcc[_0xa065('0x87')])[_0xa065('0xba')](_0x55cfcc['dropDown']);_0x1ab624[_0xa065('0x7b')]=_0xa065('0x3')!==typeof _0x55cfcc['dropDown'][_0xa065('0x134')]&&!0x1===_0x55cfcc[_0xa065('0x146')][_0xa065('0x134')]?_0x458b08(_0x55cfcc[_0xa065('0x87')])['QD_buyButton'](_0x1d12ef['fn'],_0x55cfcc['buyButton']):_0x458b08(_0x55cfcc['selector'])['QD_buyButton'](_0x55cfcc[_0xa065('0x7b')]);_0x1ab624['dropDown']=_0x1d12ef;return _0x1ab624;};_0x458b08['fn'][_0xa065('0x147')]=function(){_0xa065('0x2b')===typeof console&&_0xa065('0x9')===typeof console[_0xa065('0x2f')]&&console[_0xa065('0x2f')](_0xa065('0x148'));};_0x458b08[_0xa065('0x147')]=_0x458b08['fn']['smartCart'];}catch(_0x4b80a5){'undefined'!==typeof console&&'function'===typeof console['error']&&console[_0xa065('0x20')](_0xa065('0xb5'),_0x4b80a5);}}());

/* Quatro Digital - Smart Stock Available */
var _0xa062=['charCodeAt','ite','join','erc','indexOf','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','qdPlugin','initialSkuSelected','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selectable','available','function','qdAjax','qdAjaxQueue','extend','opts','push','call','error','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','success','object','complete','clearQueueDelay','undefined','jqXHR','ajax','data','textStatus','errorThrown','version','2.1','Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available','unshift','alerta','toLowerCase','aviso','info','apply','warn','length','addClass','qd-ssa-on','qd-ssa-sku-no-selected','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','message','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','hide','removeClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','find','[data-qd-ssa-text]','qd-ssa-hide','filter','[data-qd-ssa-text=\x22default\x22]','html','#qtt','qd-ssa-show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','trigger','QuatroDigital.ssa.prodUnavailable','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace'];(function(_0x3f3f40,_0x4e745f){var _0x32c366=function(_0x343f6a){while(--_0x343f6a){_0x3f3f40['push'](_0x3f3f40['shift']());}};_0x32c366(++_0x4e745f);}(_0xa062,0x101));var _0x2a06=function(_0x16e459,_0x48e6f3){_0x16e459=_0x16e459-0x0;var _0x5e80ad=_0xa062[_0x16e459];return _0x5e80ad;};(function(_0x1413a9){if(_0x2a06('0x0')!==typeof _0x1413a9[_0x2a06('0x1')]){var _0x5f2dc4={};_0x1413a9[_0x2a06('0x2')]=_0x5f2dc4;_0x1413a9[_0x2a06('0x1')]=function(_0x3b8326){var _0x2f7177,_0x5e6e85;_0x2f7177=_0x1413a9[_0x2a06('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x3b8326);_0x5e6e85=escape(encodeURIComponent(_0x2f7177['url']));_0x5f2dc4[_0x5e6e85]=_0x5f2dc4[_0x5e6e85]||{};_0x5f2dc4[_0x5e6e85]['opts']=_0x5f2dc4[_0x5e6e85][_0x2a06('0x4')]||[];_0x5f2dc4[_0x5e6e85][_0x2a06('0x4')][_0x2a06('0x5')]({'success':function(_0x3e8a5b,_0x49ad9b,_0x448892){_0x2f7177['success'][_0x2a06('0x6')](this,_0x3e8a5b,_0x49ad9b,_0x448892);},'error':function(_0x30e8c5,_0x4ed6fc,_0x2bcc82){_0x2f7177[_0x2a06('0x7')][_0x2a06('0x6')](this,_0x30e8c5,_0x4ed6fc,_0x2bcc82);},'complete':function(_0x533012,_0x528c65){_0x2f7177['complete']['call'](this,_0x533012,_0x528c65);}});_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')]=_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')]||{'success':{},'error':{},'complete':{}};_0x5f2dc4[_0x5e6e85]['callbackFns']=_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')]||{};_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')][_0x2a06('0xa')]=_0x2a06('0xb')===typeof _0x5f2dc4[_0x5e6e85][_0x2a06('0x9')][_0x2a06('0xa')]?_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')]['successPopulated']:!0x1;_0x5f2dc4[_0x5e6e85]['callbackFns'][_0x2a06('0xc')]=_0x2a06('0xb')===typeof _0x5f2dc4[_0x5e6e85]['callbackFns'][_0x2a06('0xc')]?_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')][_0x2a06('0xc')]:!0x1;_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')][_0x2a06('0xd')]=_0x2a06('0xb')===typeof _0x5f2dc4[_0x5e6e85][_0x2a06('0x9')][_0x2a06('0xd')]?_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')][_0x2a06('0xd')]:!0x1;_0x3b8326=_0x1413a9['extend']({},_0x2f7177,{'success':function(_0x182817,_0x23b665,_0x460944){_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')][_0x2a06('0xe')]={'data':_0x182817,'textStatus':_0x23b665,'jqXHR':_0x460944};_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')][_0x2a06('0xa')]=!0x0;for(var _0x1413a9 in _0x5f2dc4[_0x5e6e85][_0x2a06('0x4')])_0x2a06('0xf')===typeof _0x5f2dc4[_0x5e6e85][_0x2a06('0x4')][_0x1413a9]&&(_0x5f2dc4[_0x5e6e85][_0x2a06('0x4')][_0x1413a9]['success'][_0x2a06('0x6')](this,_0x182817,_0x23b665,_0x460944),_0x5f2dc4[_0x5e6e85][_0x2a06('0x4')][_0x1413a9][_0x2a06('0xe')]=function(){});},'error':function(_0x393cc4,_0x1c7e4e,_0x382b4a){_0x5f2dc4[_0x5e6e85]['parameters']['error']={'errorThrown':_0x382b4a,'textStatus':_0x1c7e4e,'jqXHR':_0x393cc4};_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')]['errorPopulated']=!0x0;for(var _0x3b8326 in _0x5f2dc4[_0x5e6e85][_0x2a06('0x4')])_0x2a06('0xf')===typeof _0x5f2dc4[_0x5e6e85][_0x2a06('0x4')][_0x3b8326]&&(_0x5f2dc4[_0x5e6e85][_0x2a06('0x4')][_0x3b8326][_0x2a06('0x7')][_0x2a06('0x6')](this,_0x393cc4,_0x1c7e4e,_0x382b4a),_0x5f2dc4[_0x5e6e85]['opts'][_0x3b8326]['error']=function(){});},'complete':function(_0x371b56,_0x2e997e){_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')][_0x2a06('0x10')]={'textStatus':_0x2e997e,'jqXHR':_0x371b56};_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')]['completePopulated']=!0x0;for(var _0xa72125 in _0x5f2dc4[_0x5e6e85][_0x2a06('0x4')])'object'===typeof _0x5f2dc4[_0x5e6e85][_0x2a06('0x4')][_0xa72125]&&(_0x5f2dc4[_0x5e6e85][_0x2a06('0x4')][_0xa72125][_0x2a06('0x10')][_0x2a06('0x6')](this,_0x371b56,_0x2e997e),_0x5f2dc4[_0x5e6e85][_0x2a06('0x4')][_0xa72125]['complete']=function(){});isNaN(parseInt(_0x2f7177[_0x2a06('0x11')]))||setTimeout(function(){_0x5f2dc4[_0x5e6e85]['jqXHR']=void 0x0;_0x5f2dc4[_0x5e6e85][_0x2a06('0x4')]=void 0x0;_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')]=void 0x0;_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')]=void 0x0;},_0x2f7177[_0x2a06('0x11')]);}});_0x2a06('0x12')===typeof _0x5f2dc4[_0x5e6e85]['jqXHR']?_0x5f2dc4[_0x5e6e85][_0x2a06('0x13')]=_0x1413a9[_0x2a06('0x14')](_0x3b8326):_0x5f2dc4[_0x5e6e85]['jqXHR']&&_0x5f2dc4[_0x5e6e85]['jqXHR']['readyState']&&0x4==_0x5f2dc4[_0x5e6e85][_0x2a06('0x13')]['readyState']&&(_0x5f2dc4[_0x5e6e85]['callbackFns'][_0x2a06('0xa')]&&_0x3b8326[_0x2a06('0xe')](_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')][_0x2a06('0xe')][_0x2a06('0x15')],_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')][_0x2a06('0xe')][_0x2a06('0x16')],_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')]['success'][_0x2a06('0x13')]),_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')][_0x2a06('0xc')]&&_0x3b8326['error'](_0x5f2dc4[_0x5e6e85]['parameters'][_0x2a06('0x7')][_0x2a06('0x13')],_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')]['error']['textStatus'],_0x5f2dc4[_0x5e6e85][_0x2a06('0x8')][_0x2a06('0x7')][_0x2a06('0x17')]),_0x5f2dc4[_0x5e6e85][_0x2a06('0x9')]['completePopulated']&&_0x3b8326[_0x2a06('0x10')](_0x5f2dc4[_0x5e6e85]['parameters'][_0x2a06('0x10')][_0x2a06('0x13')],_0x5f2dc4[_0x5e6e85]['parameters']['complete'][_0x2a06('0x16')]));};_0x1413a9[_0x2a06('0x1')][_0x2a06('0x18')]=_0x2a06('0x19');}}(jQuery));(function(_0x5ee097){'use strict';var _0x549707=jQuery;if(typeof _0x549707['fn']['QD_smartStockAvailable']===_0x2a06('0x0'))return;var _0x2eda92=_0x2a06('0x1a');var _0x10201b=function(_0x169b22,_0x29485a){if(_0x2a06('0xf')===typeof console){var _0x4da349;'object'===typeof _0x169b22?(_0x169b22[_0x2a06('0x1b')]('['+_0x2eda92+']\x0a'),_0x4da349=_0x169b22):_0x4da349=['['+_0x2eda92+']\x0a'+_0x169b22];_0x2a06('0x12')===typeof _0x29485a||_0x2a06('0x1c')!==_0x29485a[_0x2a06('0x1d')]()&&_0x2a06('0x1e')!==_0x29485a[_0x2a06('0x1d')]()?_0x2a06('0x12')!==typeof _0x29485a&&_0x2a06('0x1f')===_0x29485a[_0x2a06('0x1d')]()?console[_0x2a06('0x1f')][_0x2a06('0x20')](console,_0x4da349):console[_0x2a06('0x7')][_0x2a06('0x20')](console,_0x4da349):console[_0x2a06('0x21')][_0x2a06('0x20')](console,_0x4da349);}};var _0x349685={};var _0x262766=function(_0x2b34e8,_0x4ccb9d){if(!_0x2b34e8[_0x2a06('0x22')])return;_0x2b34e8[_0x2a06('0x23')](_0x2a06('0x24'));_0x2b34e8[_0x2a06('0x23')](_0x2a06('0x25'));try{_0x2b34e8[_0x2a06('0x23')](_0x2a06('0x26')+vtxctx[_0x2a06('0x27')][_0x2a06('0x28')](';')[_0x2a06('0x22')]);}catch(_0x5fe992){_0x10201b([_0x2a06('0x29'),_0x5fe992[_0x2a06('0x2a')]]);}_0x549707(window)['on'](_0x2a06('0x2b'),function(_0x2156db,_0x280d25,_0x2909f8){try{_0x5854aa(_0x2909f8[_0x2a06('0x2c')],function(_0x24b86f){_0x5f1842(_0x24b86f);_0x1cb815(_0x24b86f);});}catch(_0x38d6cc){_0x10201b([_0x2a06('0x2d'),_0x38d6cc['message']]);}});_0x549707(window)[_0x2a06('0x2e')]('vtex.sku.selected.QD');_0x549707(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x2b34e8[_0x2a06('0x23')]('qd-ssa-sku-prod-unavailable')[_0x2a06('0x2f')]();});function _0x5f1842(_0x58ed6a){try{_0x2b34e8[_0x2a06('0x30')](_0x2a06('0x25'))[_0x2a06('0x23')](_0x2a06('0x31'));var _0x5911da=_0x58ed6a[0x0][_0x2a06('0x32')][0x0][_0x2a06('0x33')];_0x2b34e8[_0x2a06('0x34')](_0x2a06('0x35'),_0x5911da);_0x2b34e8['each'](function(){var _0x35a800=_0x549707(this)[_0x2a06('0x36')](_0x2a06('0x37'));if(_0x5911da<0x1)return _0x35a800[_0x2a06('0x2f')]()['addClass'](_0x2a06('0x38'))[_0x2a06('0x30')]('qd-ssa-show');var _0xcebf33=_0x35a800[_0x2a06('0x39')]('[data-qd-ssa-text=\x22'+_0x5911da+'\x22]');var _0x452ec8=_0xcebf33[_0x2a06('0x22')]?_0xcebf33:_0x35a800[_0x2a06('0x39')](_0x2a06('0x3a'));_0x35a800[_0x2a06('0x2f')]()['addClass']('qd-ssa-hide')[_0x2a06('0x30')]('qd-ssa-show');_0x452ec8[_0x2a06('0x3b')](_0x452ec8['html']()['replace'](_0x2a06('0x3c'),_0x5911da));_0x452ec8['show']()[_0x2a06('0x23')](_0x2a06('0x3d'))['removeClass'](_0x2a06('0x38'));});}catch(_0x1b67fc){_0x10201b([_0x2a06('0x3e'),_0x1b67fc[_0x2a06('0x2a')]]);}};function _0x1cb815(_0xcb8b6b){if(vtxctx['skus'][_0x2a06('0x28')](';')['length']===0x1&&_0xcb8b6b[0x0][_0x2a06('0x32')][0x0][_0x2a06('0x33')]==0x0)_0x549707(window)[_0x2a06('0x3f')](_0x2a06('0x40'));};};var _0xe3cd8c=function(_0x15c646){var _0x588ec7={'i':_0x2a06('0x41')};return function(_0x153a06){var _0x312883,_0xbae561,_0x32b61d,_0x27bb6c;_0xbae561=function(_0x306669){return _0x306669;};_0x32b61d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x153a06=_0x153a06['d'+_0x32b61d[0x10]+'c'+_0x32b61d[0x11]+'m'+_0xbae561(_0x32b61d[0x1])+'n'+_0x32b61d[0xd]]['l'+_0x32b61d[0x12]+'c'+_0x32b61d[0x0]+'ti'+_0xbae561('o')+'n'];_0x312883=function(_0x5e204c){return escape(encodeURIComponent(_0x5e204c[_0x2a06('0x42')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x5a78e6){return String['fromCharCode'](('Z'>=_0x5a78e6?0x5a:0x7a)>=(_0x5a78e6=_0x5a78e6[_0x2a06('0x43')](0x0)+0xd)?_0x5a78e6:_0x5a78e6-0x1a);})));};var _0x44366d=_0x312883(_0x153a06[[_0x32b61d[0x9],_0xbae561('o'),_0x32b61d[0xc],_0x32b61d[_0xbae561(0xd)]]['join']('')]);_0x312883=_0x312883((window[['js',_0xbae561('no'),'m',_0x32b61d[0x1],_0x32b61d[0x4]['toUpperCase'](),_0x2a06('0x44')][_0x2a06('0x45')]('')]||'---')+['.v',_0x32b61d[0xd],'e',_0xbae561('x'),'co',_0xbae561('mm'),_0x2a06('0x46'),_0x32b61d[0x1],'.c',_0xbae561('o'),'m.',_0x32b61d[0x13],'r'][_0x2a06('0x45')](''));for(var _0x338b28 in _0x588ec7){if(_0x312883===_0x338b28+_0x588ec7[_0x338b28]||_0x44366d===_0x338b28+_0x588ec7[_0x338b28]){_0x27bb6c='tr'+_0x32b61d[0x11]+'e';break;}_0x27bb6c='f'+_0x32b61d[0x0]+'ls'+_0xbae561(_0x32b61d[0x1])+'';}_0xbae561=!0x1;-0x1<_0x153a06[[_0x32b61d[0xc],'e',_0x32b61d[0x0],'rc',_0x32b61d[0x9]][_0x2a06('0x45')]('')][_0x2a06('0x47')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xbae561=!0x0);return[_0x27bb6c,_0xbae561];}(_0x15c646);}(window);if(!eval(_0xe3cd8c[0x0]))return _0xe3cd8c[0x1]?_0x10201b('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;function _0x5854aa(_0x30e529,_0x28c2fd){_0x549707[_0x2a06('0x1')]({'url':_0x2a06('0x48')+_0x30e529,'clearQueueDelay':null,'success':_0x28c2fd,'error':function(){_0x10201b(_0x2a06('0x49'));}});};_0x549707['fn'][_0x2a06('0x4a')]=function(_0x240d28){var _0x34d141=_0x549707(this);var _0x3e2ab7=_0x549707[_0x2a06('0x3')](!![],{},_0x349685,_0x240d28);_0x34d141[_0x2a06('0x4b')]=new _0x262766(_0x34d141,_0x3e2ab7);try{if(typeof _0x549707['fn'][_0x2a06('0x4a')][_0x2a06('0x4c')]===_0x2a06('0xf'))_0x549707(window)[_0x2a06('0x3f')]('QuatroDigital.ssa.skuSelected',[_0x549707['fn']['QD_smartStockAvailable'][_0x2a06('0x4c')]['prod'],_0x549707['fn'][_0x2a06('0x4a')][_0x2a06('0x4c')][_0x2a06('0x2c')]]);}catch(_0x3c8059){_0x10201b([_0x2a06('0x4d'),_0x3c8059[_0x2a06('0x2a')]]);}if(_0x549707['fn']['QD_smartStockAvailable'][_0x2a06('0x4e')])_0x549707(window)['trigger'](_0x2a06('0x40'));return _0x34d141;};_0x549707(window)['on']('vtex.sku.selected.QD',function(_0x1d160e,_0x51050d,_0x5794b6){try{_0x549707['fn']['QD_smartStockAvailable']['initialSkuSelected']={'prod':_0x51050d,'sku':_0x5794b6};_0x549707(this)[_0x2a06('0x2e')](_0x1d160e);}catch(_0x625991){_0x10201b(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x625991[_0x2a06('0x2a')]]);}});_0x549707(window)['on'](_0x2a06('0x4f'),function(_0x3e6a2d,_0x5f3d1e,_0x800976){try{var _0x41aa7e=_0x800976[_0x2a06('0x22')];var _0x44f94c=0x0;for(var _0x18d260=0x0;_0x18d260<_0x41aa7e;_0x18d260++){if(!_0x800976[_0x18d260][_0x2a06('0x50')])_0x44f94c=_0x44f94c+0x1;else break;}if(_0x41aa7e<=_0x44f94c)_0x549707['fn'][_0x2a06('0x4a')]['unavailable']=!![];_0x549707(this)[_0x2a06('0x2e')](_0x3e6a2d);}catch(_0x42090b){_0x10201b(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x42090b[_0x2a06('0x2a')]]);}});_0x549707(function(){_0x549707('.qd_smart_stock_available_auto')['QD_smartStockAvailable']();});}(window));

// not-qd-include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js

/*Quatro Digital - Mobile Adjust // 1.3 // Carlos Vinicius // Todos os direitos reservados*/
(function(){"function"!==typeof window.QD_mobileAdjust&&(window.QD_mobileAdjust=function(){$("#qdMibileCheckResolution").length||$("body").append('<style id="qdMibileCheckResolution" type="text/css">@media (max-width: 767px) { .qd-mibile-check-resolution{display: block !important;} }</style>');var b=$('<div class="qd-mibile-check-resolution"></div>').hide();b.appendTo("body");b.css({position:"fixed",bottom:-100,left:-9999,height:5,width:10});var a=$("body").attr("class").match(/[a-z0-9]{4,12}\-[a-z0-9]{4,12}\-[a-z0-9]{4,12}\-[a-z0-9]{4,12}\-[a-z0-9]{4,12}/i),
f=null!=a&&"object"===typeof a&&a.length,c=function(){b.is(":visible")?(f&&($.cookie("qd-mobile",1,{path:"/"}),$.cookie("qd-mobile-lid",1,{path:"/"}),0>document.location.search.indexOf(a[0])&&(document.location.search=document.location.search.replace(/\&?lid\=([a-z0-9]{4,12}\-)+[a-z0-9]{4,12}/ig,"")+(document.location.search.length?"&":"")+"lid="+a[0])),$.cookie("qd-mobile")||($.cookie("qd-mobile",1,{path:"/"}),document.location.search+=(document.location.search.length?"&":"")+"qd-mobile=true")):
($.removeCookie("qd-mobile"),$.removeCookie("qd-mobile-lid"),/\&?lid\=([a-z0-9]{4,12}\-)+[a-z0-9]{4,12}/ig.test(document.location.search)&&$("body").is(".qd-remove-lid")&&(document.location.search=document.location.search.replace(/\&?lid\=([a-z0-9]{4,12}\-)+[a-z0-9]{4,12}/ig,"")),-1<document.location.search.indexOf("qd-mobile=true")&&(document.location.search=document.location.search.replace(/\&?qd\-mobile\=true/ig,"")))};c();var d=0,e=function(){$(window).resize(function(){clearTimeout(d);d=setTimeout(c,
50)})};e();$(window).load(function(){e()});$("body").is(".qd-h-page")&&window.QD_mobileAdjust.removeCSS()},window.QD_mobileAdjust.removeCSS=function(){window.QD_isMobile()&&$("link[href*='arquivos/'][type='text/css']").not("[href*='arquivos/qd-mobile-config.css']").remove()},$(window.QD_mobileAdjust))})();
/*Quatro Digital - Mobile Check // 1.2 // Carlos Vinicius // Todos os direitos reservados*/
(function(){window.QD_isMobile=window.QD_isMobile||function(){return-1<document.location.search.indexOf("qd-mobile=true")||-1<document.cookie.indexOf("qd-mobile=1")?!0:!1}})();
/*Quatro Digital - Mobile Link Adjust // 1.1 // Carlos Vinicius // Todos os direitos reservados*/
(function(){$(function(){if(window.QD_isMobile()){var d=function(a,c){var b=a.split("#");b[0]=b[0]+(-1<b[0].indexOf("?")?"&":"?")+"lid="+c;return b.join("#")};$("a[data-qd-lid]").each(function(){var a=$(this);a.attr("href",d(a.attr("href"),a.attr("data-qd-lid")))});$("div[data-qd-lid]").each(function(){var a=$(this),c=a.attr("data-qd-lid");a.find("a").each(function(){var a=$(this);a.attr("href",d(a.attr("href"),c))})})}})})();