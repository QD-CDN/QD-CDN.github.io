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
					return { slidesToShow: 2, slidesToScroll: 2 };
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
				autoplaySpeed: 11000,
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
			Product.applySKUListBodyClass();
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
		applySKUListBodyClass: function() {
			if ($('[class="skuList"]').length > 0)
				$(document.body).addClass('qd-sku-in-list');
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
			$('.product-qd-v1-sku-selection-box, .product-floating-bar-buy').QD_smartQuantity({
				buyButton: ".product-qd-v1-buy-button >.buy-button"
			});

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
var _0xa5f0=['.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper','url','html','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','hide','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','li\x20>ul','qd-am-elem-','first','text','replaceSpecialChars','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','qd-am-','-li','callback','QuatroDigital.am.callback','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','/qd-amazing-menu','error','undefined','info','warn','object','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','each','addClass','qd-am-li-','qd-am-first','last','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase','ite','erc','indexOf','find'];(function(_0x479606,_0x526a4d){var _0x5ac915=function(_0x4c9017){while(--_0x4c9017){_0x479606['push'](_0x479606['shift']());}};_0x5ac915(++_0x526a4d);}(_0xa5f0,0x1cd));var _0x0a5f=function(_0x2112d4,_0x3c863c){_0x2112d4=_0x2112d4-0x0;var _0x434972=_0xa5f0[_0x2112d4];return _0x434972;};(function(_0xecdb9d){_0xecdb9d['fn'][_0x0a5f('0x0')]=_0xecdb9d['fn'][_0x0a5f('0x1')];}(jQuery));(function(_0x24c7b8){var _0x225374;var _0x1c3522=jQuery;if('function'!==typeof _0x1c3522['fn'][_0x0a5f('0x2')]){var _0x213e1a={'url':_0x0a5f('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x593236=function(_0x4a9179,_0x15c360){if('object'===typeof console&&'undefined'!==typeof console[_0x0a5f('0x4')]&&_0x0a5f('0x5')!==typeof console[_0x0a5f('0x6')]&&'undefined'!==typeof console[_0x0a5f('0x7')]){var _0x195a4e;_0x0a5f('0x8')===typeof _0x4a9179?(_0x4a9179['unshift'](_0x0a5f('0x9')),_0x195a4e=_0x4a9179):_0x195a4e=[_0x0a5f('0x9')+_0x4a9179];if(_0x0a5f('0x5')===typeof _0x15c360||_0x0a5f('0xa')!==_0x15c360[_0x0a5f('0xb')]()&&_0x0a5f('0xc')!==_0x15c360[_0x0a5f('0xb')]())if(_0x0a5f('0x5')!==typeof _0x15c360&&_0x0a5f('0x6')===_0x15c360[_0x0a5f('0xb')]())try{console[_0x0a5f('0x6')][_0x0a5f('0xd')](console,_0x195a4e);}catch(_0x5987f5){try{console['info'](_0x195a4e[_0x0a5f('0xe')]('\x0a'));}catch(_0x36b5d5){}}else try{console[_0x0a5f('0x4')]['apply'](console,_0x195a4e);}catch(_0x5a1fed){try{console[_0x0a5f('0x4')](_0x195a4e['join']('\x0a'));}catch(_0x35b9e7){}}else try{console[_0x0a5f('0x7')][_0x0a5f('0xd')](console,_0x195a4e);}catch(_0x3d0210){try{console[_0x0a5f('0x7')](_0x195a4e[_0x0a5f('0xe')]('\x0a'));}catch(_0x329a99){}}}};_0x1c3522['fn'][_0x0a5f('0xf')]=function(){var _0x5cfab7=_0x1c3522(this);_0x5cfab7[_0x0a5f('0x10')](function(_0x1f9a44){_0x1c3522(this)[_0x0a5f('0x11')](_0x0a5f('0x12')+_0x1f9a44);});_0x5cfab7['first']()['addClass'](_0x0a5f('0x13'));_0x5cfab7[_0x0a5f('0x14')]()['addClass']('qd-am-last');return _0x5cfab7;};_0x1c3522['fn'][_0x0a5f('0x2')]=function(){};_0x24c7b8=function(_0x589dff){var _0x3c254e={'i':_0x0a5f('0x15')};return function(_0x2aa738){var _0x5306e2=function(_0x110b96){return _0x110b96;};var _0x2e8fc6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2aa738=_0x2aa738['d'+_0x2e8fc6[0x10]+'c'+_0x2e8fc6[0x11]+'m'+_0x5306e2(_0x2e8fc6[0x1])+'n'+_0x2e8fc6[0xd]]['l'+_0x2e8fc6[0x12]+'c'+_0x2e8fc6[0x0]+'ti'+_0x5306e2('o')+'n'];var _0x2a99a0=function(_0xde2762){return escape(encodeURIComponent(_0xde2762[_0x0a5f('0x16')](/\./g,'¨')[_0x0a5f('0x16')](/[a-zA-Z]/g,function(_0x162722){return String[_0x0a5f('0x17')](('Z'>=_0x162722?0x5a:0x7a)>=(_0x162722=_0x162722['charCodeAt'](0x0)+0xd)?_0x162722:_0x162722-0x1a);})));};var _0x1ad8d6=_0x2a99a0(_0x2aa738[[_0x2e8fc6[0x9],_0x5306e2('o'),_0x2e8fc6[0xc],_0x2e8fc6[_0x5306e2(0xd)]][_0x0a5f('0xe')]('')]);_0x2a99a0=_0x2a99a0((window[['js',_0x5306e2('no'),'m',_0x2e8fc6[0x1],_0x2e8fc6[0x4][_0x0a5f('0x18')](),_0x0a5f('0x19')][_0x0a5f('0xe')]('')]||'---')+['.v',_0x2e8fc6[0xd],'e',_0x5306e2('x'),'co',_0x5306e2('mm'),_0x0a5f('0x1a'),_0x2e8fc6[0x1],'.c',_0x5306e2('o'),'m.',_0x2e8fc6[0x13],'r'][_0x0a5f('0xe')](''));for(var _0x2e188f in _0x3c254e){if(_0x2a99a0===_0x2e188f+_0x3c254e[_0x2e188f]||_0x1ad8d6===_0x2e188f+_0x3c254e[_0x2e188f]){var _0x4bc467='tr'+_0x2e8fc6[0x11]+'e';break;}_0x4bc467='f'+_0x2e8fc6[0x0]+'ls'+_0x5306e2(_0x2e8fc6[0x1])+'';}_0x5306e2=!0x1;-0x1<_0x2aa738[[_0x2e8fc6[0xc],'e',_0x2e8fc6[0x0],'rc',_0x2e8fc6[0x9]][_0x0a5f('0xe')]('')][_0x0a5f('0x1b')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x5306e2=!0x0);return[_0x4bc467,_0x5306e2];}(_0x589dff);}(window);if(!eval(_0x24c7b8[0x0]))return _0x24c7b8[0x1]?_0x593236('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x5b4144=function(_0x1508df){var _0x645207=_0x1508df[_0x0a5f('0x1c')](_0x0a5f('0x1d'));var _0x12e125=_0x645207[_0x0a5f('0x1e')](_0x0a5f('0x1f'));var _0x2ae34b=_0x645207[_0x0a5f('0x1e')](_0x0a5f('0x20'));if(_0x12e125[_0x0a5f('0x21')]||_0x2ae34b[_0x0a5f('0x21')])_0x12e125[_0x0a5f('0x22')]()[_0x0a5f('0x11')]('qd-am-banner-wrapper'),_0x2ae34b[_0x0a5f('0x22')]()['addClass'](_0x0a5f('0x23')),_0x1c3522['qdAjax']({'url':_0x225374[_0x0a5f('0x24')],'dataType':_0x0a5f('0x25'),'success':function(_0x3d2b19){var _0x396518=_0x1c3522(_0x3d2b19);_0x12e125[_0x0a5f('0x10')](function(){var _0x3d2b19=_0x1c3522(this);var _0x3cf411=_0x396518[_0x0a5f('0x1c')](_0x0a5f('0x26')+_0x3d2b19[_0x0a5f('0x27')](_0x0a5f('0x28'))+'\x27]');_0x3cf411[_0x0a5f('0x21')]&&(_0x3cf411['each'](function(){_0x1c3522(this)[_0x0a5f('0x0')](_0x0a5f('0x29'))[_0x0a5f('0x2a')]()[_0x0a5f('0x2b')](_0x3d2b19);}),_0x3d2b19['hide']());})[_0x0a5f('0x11')](_0x0a5f('0x2c'));_0x2ae34b['each'](function(){var _0x3d2b19={};var _0x6042f0=_0x1c3522(this);_0x396518[_0x0a5f('0x1c')]('h2')[_0x0a5f('0x10')](function(){if(_0x1c3522(this)['text']()['trim']()['toLowerCase']()==_0x6042f0['attr']('data-qdam-value')[_0x0a5f('0x2d')]()[_0x0a5f('0xb')]())return _0x3d2b19=_0x1c3522(this),!0x1;});_0x3d2b19[_0x0a5f('0x21')]&&(_0x3d2b19[_0x0a5f('0x10')](function(){_0x1c3522(this)['getParent'](_0x0a5f('0x2e'))[_0x0a5f('0x2a')]()[_0x0a5f('0x2b')](_0x6042f0);}),_0x6042f0[_0x0a5f('0x2f')]());})[_0x0a5f('0x11')](_0x0a5f('0x2c'));},'error':function(){_0x593236('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x225374['url']+_0x0a5f('0x30'));},'complete':function(){_0x225374[_0x0a5f('0x31')][_0x0a5f('0x32')](this);_0x1c3522(window)[_0x0a5f('0x33')](_0x0a5f('0x34'),_0x1508df);},'clearQueueDelay':0xbb8});};_0x1c3522[_0x0a5f('0x2')]=function(_0x4528a0){var _0x97c2bc=_0x4528a0['find'](_0x0a5f('0x35'))[_0x0a5f('0x10')](function(){var _0x11291a=_0x1c3522(this);if(!_0x11291a[_0x0a5f('0x21')])return _0x593236(['UL\x20do\x20menu\x20não\x20encontrada',_0x4528a0],_0x0a5f('0xa'));_0x11291a[_0x0a5f('0x1c')](_0x0a5f('0x36'))[_0x0a5f('0x22')]()[_0x0a5f('0x11')]('qd-am-has-ul');_0x11291a['find']('li')['each'](function(){var _0x5141ca=_0x1c3522(this);var _0x4585e3=_0x5141ca['children'](':not(ul)');_0x4585e3[_0x0a5f('0x21')]&&_0x5141ca[_0x0a5f('0x11')](_0x0a5f('0x37')+_0x4585e3[_0x0a5f('0x38')]()[_0x0a5f('0x39')]()[_0x0a5f('0x2d')]()[_0x0a5f('0x3a')]()[_0x0a5f('0x16')](/\./g,'')[_0x0a5f('0x16')](/\s/g,'-')['toLowerCase']());});var _0x1d0f4a=_0x11291a['find'](_0x0a5f('0x3b'))[_0x0a5f('0xf')]();_0x11291a[_0x0a5f('0x11')](_0x0a5f('0x3c'));_0x1d0f4a=_0x1d0f4a[_0x0a5f('0x1c')]('>ul');_0x1d0f4a[_0x0a5f('0x10')](function(){var _0x23d45d=_0x1c3522(this);_0x23d45d[_0x0a5f('0x1c')]('>li')[_0x0a5f('0xf')]()['addClass'](_0x0a5f('0x3d'));_0x23d45d[_0x0a5f('0x11')](_0x0a5f('0x3e'));_0x23d45d[_0x0a5f('0x22')]()[_0x0a5f('0x11')](_0x0a5f('0x3f'));});_0x1d0f4a['addClass'](_0x0a5f('0x3f'));var _0x388206=0x0,_0x24c7b8=function(_0x51aaac){_0x388206+=0x1;_0x51aaac=_0x51aaac['children']('li')['children']('*');_0x51aaac['length']&&(_0x51aaac[_0x0a5f('0x11')](_0x0a5f('0x40')+_0x388206),_0x24c7b8(_0x51aaac));};_0x24c7b8(_0x11291a);_0x11291a['add'](_0x11291a[_0x0a5f('0x1c')]('ul'))['each'](function(){var _0x1628f4=_0x1c3522(this);_0x1628f4[_0x0a5f('0x11')](_0x0a5f('0x41')+_0x1628f4['children']('li')[_0x0a5f('0x21')]+_0x0a5f('0x42'));});});_0x5b4144(_0x97c2bc);_0x225374[_0x0a5f('0x43')]['call'](this);_0x1c3522(window)[_0x0a5f('0x33')](_0x0a5f('0x44'),_0x4528a0);};_0x1c3522['fn']['QD_amazingMenu']=function(_0x1ae6b1){var _0x23d247=_0x1c3522(this);if(!_0x23d247[_0x0a5f('0x21')])return _0x23d247;_0x225374=_0x1c3522['extend']({},_0x213e1a,_0x1ae6b1);_0x23d247['exec']=new _0x1c3522['QD_amazingMenu'](_0x1c3522(this));return _0x23d247;};_0x1c3522(function(){_0x1c3522(_0x0a5f('0x45'))[_0x0a5f('0x2')]();});}}(this));

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
var _0x2b66=['skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','content','.qd-ddc-quantity','val','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','[data-sku=\x27','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','qdDdcLastPostalCode','calculateShipping','BRA','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','ajaxStop','.qdDdcContainer','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','undefined','pow','round','toFixed','length','join','function','prototype','trim','capitalize','toUpperCase','qdAjaxQueue','jquery','slice','qdAjax','GET','data','stringify','toString','url','type','jqXHR','ajax','success','fail','error','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','object','toLowerCase','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','meta[name=currency]','extend','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','currencySymbol','shipping','allTotal','qtt','items','quantity','callback','fire','hide','filter','.singular','show','.plural','addClass','qd-emptyCart','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','cartTotalE','html','total','cartQttE','itemsTextE','cartTotal','find','emptyElem','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','done','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','input.buy-in-page-quantity','javascript:','body','.productQuickView','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','buyButton','.qd-sbb-on','qd-sbb-on','.remove-href','qd-bb-active','children','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','selector','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','attr','---','removeClass','qd-bb-itemAddCartWrapper','getCartInfoByUrl','função\x20descontinuada','allowUpdate','autoWatchBuyButton','.btn-add-buy-button-asynchronous','click','bind','mouseenter.qd_bb_buy_sc','unbind','load','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=true','buyIfQuantityZeroed','productPageCallback','buyButtonClickCallback','prodAdd','split','ku=','pop','asyncCallback','productAddedToCart','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','ajaxSend','/checkout/cart/add','match','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','abs','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Continuar\x20Comprando','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','continueShopping','linkCheckout','.qd-ddc-infoTotal','shippingForm','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodName','append'];(function(_0x270768,_0x1360b1){var _0x164cc6=function(_0x2a6414){while(--_0x2a6414){_0x270768['push'](_0x270768['shift']());}};_0x164cc6(++_0x1360b1);}(_0x2b66,0x183));var _0x62b6=function(_0x59d085,_0x29768d){_0x59d085=_0x59d085-0x0;var _0x26d2b2=_0x2b66[_0x59d085];return _0x26d2b2;};(function(_0x452531){_0x452531['fn'][_0x62b6('0x0')]=_0x452531['fn'][_0x62b6('0x1')];}(jQuery));function qd_number_format(_0x418ac3,_0x2f1cb6,_0x441c43,_0x48798e){_0x418ac3=(_0x418ac3+'')[_0x62b6('0x2')](/[^0-9+\-Ee.]/g,'');_0x418ac3=isFinite(+_0x418ac3)?+_0x418ac3:0x0;_0x2f1cb6=isFinite(+_0x2f1cb6)?Math['abs'](_0x2f1cb6):0x0;_0x48798e=_0x62b6('0x3')===typeof _0x48798e?',':_0x48798e;_0x441c43=_0x62b6('0x3')===typeof _0x441c43?'.':_0x441c43;var _0x3b9041='',_0x3b9041=function(_0x452c8e,_0x548526){var _0x2f1cb6=Math[_0x62b6('0x4')](0xa,_0x548526);return''+(Math[_0x62b6('0x5')](_0x452c8e*_0x2f1cb6)/_0x2f1cb6)[_0x62b6('0x6')](_0x548526);},_0x3b9041=(_0x2f1cb6?_0x3b9041(_0x418ac3,_0x2f1cb6):''+Math[_0x62b6('0x5')](_0x418ac3))['split']('.');0x3<_0x3b9041[0x0]['length']&&(_0x3b9041[0x0]=_0x3b9041[0x0][_0x62b6('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x48798e));(_0x3b9041[0x1]||'')[_0x62b6('0x7')]<_0x2f1cb6&&(_0x3b9041[0x1]=_0x3b9041[0x1]||'',_0x3b9041[0x1]+=Array(_0x2f1cb6-_0x3b9041[0x1][_0x62b6('0x7')]+0x1)[_0x62b6('0x8')]('0'));return _0x3b9041[_0x62b6('0x8')](_0x441c43);};_0x62b6('0x9')!==typeof String[_0x62b6('0xa')][_0x62b6('0xb')]&&(String[_0x62b6('0xa')][_0x62b6('0xb')]=function(){return this['replace'](/^\s+|\s+$/g,'');});_0x62b6('0x9')!=typeof String['prototype'][_0x62b6('0xc')]&&(String[_0x62b6('0xa')][_0x62b6('0xc')]=function(){return this['charAt'](0x0)[_0x62b6('0xd')]()+this['slice'](0x1)['toLowerCase']();});(function(_0x20f690){if('function'!==typeof _0x20f690['qdAjax']){var _0x308e0c={};_0x20f690[_0x62b6('0xe')]=_0x308e0c;0x96>parseInt((_0x20f690['fn'][_0x62b6('0xf')]['replace'](/[^0-9]+/g,'')+'000')[_0x62b6('0x10')](0x0,0x3),0xa)&&console&&_0x62b6('0x9')==typeof console['error']&&console['error']();_0x20f690[_0x62b6('0x11')]=function(_0x1e7a78){try{var _0x114d7b=_0x20f690['extend']({},{'url':'','type':_0x62b6('0x12'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x1e7a78);var _0x2d3ca4='object'===typeof _0x114d7b[_0x62b6('0x13')]?JSON[_0x62b6('0x14')](_0x114d7b['data']):_0x114d7b[_0x62b6('0x13')][_0x62b6('0x15')]();var _0x50d12f=encodeURIComponent(_0x114d7b[_0x62b6('0x16')]+'|'+_0x114d7b[_0x62b6('0x17')]+'|'+_0x2d3ca4);_0x308e0c[_0x50d12f]=_0x308e0c[_0x50d12f]||{};'undefined'==typeof _0x308e0c[_0x50d12f][_0x62b6('0x18')]?_0x308e0c[_0x50d12f][_0x62b6('0x18')]=_0x20f690[_0x62b6('0x19')](_0x114d7b):(_0x308e0c[_0x50d12f][_0x62b6('0x18')]['done'](_0x114d7b[_0x62b6('0x1a')]),_0x308e0c[_0x50d12f]['jqXHR'][_0x62b6('0x1b')](_0x114d7b[_0x62b6('0x1c')]),_0x308e0c[_0x50d12f][_0x62b6('0x18')][_0x62b6('0x1d')](_0x114d7b[_0x62b6('0x1e')]));_0x308e0c[_0x50d12f][_0x62b6('0x18')][_0x62b6('0x1d')](function(){isNaN(parseInt(_0x114d7b['clearQueueDelay']))||setTimeout(function(){_0x308e0c[_0x50d12f][_0x62b6('0x18')]=void 0x0;},_0x114d7b[_0x62b6('0x1f')]);});return _0x308e0c[_0x50d12f][_0x62b6('0x18')];}catch(_0x55b467){_0x62b6('0x3')!==typeof console&&_0x62b6('0x9')===typeof console[_0x62b6('0x1c')]&&console[_0x62b6('0x1c')](_0x62b6('0x20')+_0x55b467[_0x62b6('0x21')]);}};_0x20f690[_0x62b6('0x11')]['version']=_0x62b6('0x22');}}(jQuery));(function(_0x2936f6){_0x2936f6['fn'][_0x62b6('0x0')]=_0x2936f6['fn'][_0x62b6('0x1')];}(jQuery));(function(){var _0x392b9e=jQuery;if(_0x62b6('0x9')!==typeof _0x392b9e['fn'][_0x62b6('0x23')]){_0x392b9e(function(){var _0x564d0c=vtexjs[_0x62b6('0x24')][_0x62b6('0x25')];vtexjs[_0x62b6('0x24')][_0x62b6('0x25')]=function(){return _0x564d0c[_0x62b6('0x26')]();};});try{window['QuatroDigital_simpleCart']=window[_0x62b6('0x27')]||{};window[_0x62b6('0x27')]['ajaxStopOn']=!0x1;_0x392b9e['fn'][_0x62b6('0x23')]=function(_0x3b6302,_0x5dca60,_0x58620c){var _0x1b508e=function(_0x1836a5,_0x2c4f12){if(_0x62b6('0x28')===typeof console){var _0x203641=_0x62b6('0x28')===typeof _0x1836a5;_0x62b6('0x3')!==typeof _0x2c4f12&&'alerta'===_0x2c4f12[_0x62b6('0x29')]()?_0x203641?console[_0x62b6('0x2a')](_0x62b6('0x2b'),_0x1836a5[0x0],_0x1836a5[0x1],_0x1836a5[0x2],_0x1836a5[0x3],_0x1836a5[0x4],_0x1836a5[0x5],_0x1836a5[0x6],_0x1836a5[0x7]):console['warn'](_0x62b6('0x2b')+_0x1836a5):'undefined'!==typeof _0x2c4f12&&_0x62b6('0x2c')===_0x2c4f12[_0x62b6('0x29')]()?_0x203641?console['info'](_0x62b6('0x2b'),_0x1836a5[0x0],_0x1836a5[0x1],_0x1836a5[0x2],_0x1836a5[0x3],_0x1836a5[0x4],_0x1836a5[0x5],_0x1836a5[0x6],_0x1836a5[0x7]):console[_0x62b6('0x2c')]('[Simple\x20Cart]\x0a'+_0x1836a5):_0x203641?console[_0x62b6('0x1c')](_0x62b6('0x2b'),_0x1836a5[0x0],_0x1836a5[0x1],_0x1836a5[0x2],_0x1836a5[0x3],_0x1836a5[0x4],_0x1836a5[0x5],_0x1836a5[0x6],_0x1836a5[0x7]):console[_0x62b6('0x1c')](_0x62b6('0x2b')+_0x1836a5);}};var _0x1cb6b6=_0x392b9e(this);_0x62b6('0x28')===typeof _0x3b6302?_0x5dca60=_0x3b6302:(_0x3b6302=_0x3b6302||!0x1,_0x1cb6b6=_0x1cb6b6[_0x62b6('0x2d')](_0x392b9e[_0x62b6('0x2e')][_0x62b6('0x2f')]));if(!_0x1cb6b6[_0x62b6('0x7')])return _0x1cb6b6;_0x392b9e[_0x62b6('0x2e')]['elements']=_0x392b9e['QD_simpleCart'][_0x62b6('0x2f')][_0x62b6('0x2d')](_0x1cb6b6);_0x58620c='undefined'===typeof _0x58620c?!0x1:_0x58620c;var _0xa846ad={'cartQtt':_0x62b6('0x30'),'cartTotal':_0x62b6('0x31'),'itemsText':_0x62b6('0x32'),'currencySymbol':(_0x392b9e(_0x62b6('0x33'))['attr']('content')||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x137652=_0x392b9e[_0x62b6('0x34')]({},_0xa846ad,_0x5dca60);var _0x587981=_0x392b9e('');_0x1cb6b6[_0x62b6('0x35')](function(){var _0x4bd533=_0x392b9e(this);_0x4bd533[_0x62b6('0x13')](_0x62b6('0x36'))||_0x4bd533['data'](_0x62b6('0x36'),_0x137652);});var _0x5d7972=function(_0x3740f7){window[_0x62b6('0x37')]=window[_0x62b6('0x37')]||{};for(var _0x3b6302=0x0,_0x925ebe=0x0,_0x5ba678=0x0;_0x5ba678<_0x3740f7[_0x62b6('0x38')][_0x62b6('0x7')];_0x5ba678++)_0x62b6('0x39')==_0x3740f7[_0x62b6('0x38')][_0x5ba678]['id']&&(_0x925ebe+=_0x3740f7[_0x62b6('0x38')][_0x5ba678][_0x62b6('0x3a')]),_0x3b6302+=_0x3740f7['totalizers'][_0x5ba678]['value'];window[_0x62b6('0x37')]['total']=_0x137652[_0x62b6('0x3b')]+qd_number_format(_0x3b6302/0x64,0x2,',','.');window[_0x62b6('0x37')][_0x62b6('0x3c')]=_0x137652[_0x62b6('0x3b')]+qd_number_format(_0x925ebe/0x64,0x2,',','.');window[_0x62b6('0x37')][_0x62b6('0x3d')]=_0x137652[_0x62b6('0x3b')]+qd_number_format((_0x3b6302+_0x925ebe)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x62b6('0x3e')]=0x0;if(_0x137652['showQuantityByItems'])for(_0x5ba678=0x0;_0x5ba678<_0x3740f7[_0x62b6('0x3f')][_0x62b6('0x7')];_0x5ba678++)window['_QuatroDigital_CartData']['qtt']+=_0x3740f7['items'][_0x5ba678][_0x62b6('0x40')];else window[_0x62b6('0x37')][_0x62b6('0x3e')]=_0x3740f7[_0x62b6('0x3f')][_0x62b6('0x7')]||0x0;try{window[_0x62b6('0x37')][_0x62b6('0x41')]&&window['_QuatroDigital_CartData'][_0x62b6('0x41')][_0x62b6('0x42')]&&window[_0x62b6('0x37')][_0x62b6('0x41')][_0x62b6('0x42')]();}catch(_0x2ec05e){_0x1b508e('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x5c80d6(_0x587981);};var _0x24bafd=function(_0x447253,_0x52bf62){0x1===_0x447253?_0x52bf62[_0x62b6('0x43')]()[_0x62b6('0x44')](_0x62b6('0x45'))[_0x62b6('0x46')]():_0x52bf62[_0x62b6('0x43')]()[_0x62b6('0x44')](_0x62b6('0x47'))[_0x62b6('0x46')]();};var _0x222200=function(_0x33108f){0x1>_0x33108f?_0x1cb6b6[_0x62b6('0x48')](_0x62b6('0x49')):_0x1cb6b6['removeClass'](_0x62b6('0x49'));};var _0x4ecf5a=function(_0x4c4d8e,_0x2e2916){var _0x2da0d1=parseInt(window[_0x62b6('0x37')]['qtt'],0xa);_0x2e2916[_0x62b6('0x4a')][_0x62b6('0x46')]();isNaN(_0x2da0d1)&&(_0x1b508e(_0x62b6('0x4b'),_0x62b6('0x4c')),_0x2da0d1=0x0);_0x2e2916[_0x62b6('0x4d')][_0x62b6('0x4e')](window['_QuatroDigital_CartData'][_0x62b6('0x4f')]);_0x2e2916[_0x62b6('0x50')][_0x62b6('0x4e')](_0x2da0d1);_0x24bafd(_0x2da0d1,_0x2e2916[_0x62b6('0x51')]);_0x222200(_0x2da0d1);};var _0x5c80d6=function(_0x5dfdf1){_0x1cb6b6[_0x62b6('0x35')](function(){var _0x2a96f9={};var _0x20339a=_0x392b9e(this);_0x3b6302&&_0x20339a['data'](_0x62b6('0x36'))&&_0x392b9e[_0x62b6('0x34')](_0x137652,_0x20339a['data'](_0x62b6('0x36')));_0x2a96f9['$this']=_0x20339a;_0x2a96f9[_0x62b6('0x50')]=_0x20339a['find'](_0x137652['cartQtt'])||_0x587981;_0x2a96f9[_0x62b6('0x4d')]=_0x20339a['find'](_0x137652[_0x62b6('0x52')])||_0x587981;_0x2a96f9[_0x62b6('0x51')]=_0x20339a[_0x62b6('0x53')](_0x137652['itemsText'])||_0x587981;_0x2a96f9[_0x62b6('0x54')]=_0x20339a[_0x62b6('0x53')](_0x137652['emptyCart'])||_0x587981;_0x4ecf5a(_0x5dfdf1,_0x2a96f9);_0x20339a[_0x62b6('0x48')]('qd-sc-populated');});};(function(){if(_0x137652[_0x62b6('0x55')]){window[_0x62b6('0x56')]=window[_0x62b6('0x56')]||{};if(_0x62b6('0x3')!==typeof window['_QuatroDigital_DropDown'][_0x62b6('0x25')]&&(_0x58620c||!_0x3b6302))return _0x5d7972(window[_0x62b6('0x56')][_0x62b6('0x25')]);if(_0x62b6('0x28')!==typeof window[_0x62b6('0x57')]||_0x62b6('0x3')===typeof window['vtexjs'][_0x62b6('0x24')])if(_0x62b6('0x28')===typeof vtex&&_0x62b6('0x28')===typeof vtex[_0x62b6('0x24')]&&_0x62b6('0x3')!==typeof vtex[_0x62b6('0x24')][_0x62b6('0x58')])new vtex[(_0x62b6('0x24'))][(_0x62b6('0x58'))]();else return _0x1b508e(_0x62b6('0x59'));_0x392b9e[_0x62b6('0x5a')]([_0x62b6('0x3f'),_0x62b6('0x38'),_0x62b6('0x5b')],{'done':function(_0x4220a8){_0x5d7972(_0x4220a8);window[_0x62b6('0x56')][_0x62b6('0x25')]=_0x4220a8;},'fail':function(_0x2afa77){_0x1b508e([_0x62b6('0x5c'),_0x2afa77]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x137652[_0x62b6('0x41')]();_0x392b9e(window)[_0x62b6('0x5d')](_0x62b6('0x5e'));return _0x1cb6b6;};_0x392b9e[_0x62b6('0x2e')]={'elements':_0x392b9e('')};_0x392b9e(function(){var _0x4f6ea9;_0x62b6('0x9')===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x4f6ea9=window['ajaxRequestbuyButtonAsynchronous'],window[_0x62b6('0x5f')]=function(_0x357d5f,_0x52b65d,_0x8e9c85,_0x230959,_0x34b973){_0x4f6ea9[_0x62b6('0x26')](this,_0x357d5f,_0x52b65d,_0x8e9c85,_0x230959,function(){_0x62b6('0x9')===typeof _0x34b973&&_0x34b973();_0x392b9e[_0x62b6('0x2e')][_0x62b6('0x2f')][_0x62b6('0x35')](function(){var _0x23e6a5=_0x392b9e(this);_0x23e6a5[_0x62b6('0x23')](_0x23e6a5['data'](_0x62b6('0x36')));});});});});var _0xeff7d2=window['ReloadItemsCart']||void 0x0;window[_0x62b6('0x60')]=function(_0x384eed){_0x392b9e['fn'][_0x62b6('0x23')](!0x0);_0x62b6('0x9')===typeof _0xeff7d2?_0xeff7d2['call'](this,_0x384eed):alert(_0x384eed);};_0x392b9e(function(){var _0x38cc4a=_0x392b9e(_0x62b6('0x61'));_0x38cc4a[_0x62b6('0x7')]&&_0x38cc4a[_0x62b6('0x23')]();});_0x392b9e(function(){_0x392b9e(window)['bind'](_0x62b6('0x62'),function(){_0x392b9e['fn']['simpleCart'](!0x0);});});}catch(_0x2e49e4){'undefined'!==typeof console&&_0x62b6('0x9')===typeof console[_0x62b6('0x1c')]&&console[_0x62b6('0x1c')](_0x62b6('0x63'),_0x2e49e4);}}}());(function(){var _0x2d680f=function(_0x2eee3d,_0xb061a7){if(_0x62b6('0x28')===typeof console){var _0x4534dc=_0x62b6('0x28')===typeof _0x2eee3d;_0x62b6('0x3')!==typeof _0xb061a7&&_0x62b6('0x4c')===_0xb061a7[_0x62b6('0x29')]()?_0x4534dc?console[_0x62b6('0x2a')](_0x62b6('0x64'),_0x2eee3d[0x0],_0x2eee3d[0x1],_0x2eee3d[0x2],_0x2eee3d[0x3],_0x2eee3d[0x4],_0x2eee3d[0x5],_0x2eee3d[0x6],_0x2eee3d[0x7]):console[_0x62b6('0x2a')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x2eee3d):_0x62b6('0x3')!==typeof _0xb061a7&&_0x62b6('0x2c')===_0xb061a7[_0x62b6('0x29')]()?_0x4534dc?console[_0x62b6('0x2c')](_0x62b6('0x64'),_0x2eee3d[0x0],_0x2eee3d[0x1],_0x2eee3d[0x2],_0x2eee3d[0x3],_0x2eee3d[0x4],_0x2eee3d[0x5],_0x2eee3d[0x6],_0x2eee3d[0x7]):console[_0x62b6('0x2c')](_0x62b6('0x64')+_0x2eee3d):_0x4534dc?console[_0x62b6('0x1c')](_0x62b6('0x64'),_0x2eee3d[0x0],_0x2eee3d[0x1],_0x2eee3d[0x2],_0x2eee3d[0x3],_0x2eee3d[0x4],_0x2eee3d[0x5],_0x2eee3d[0x6],_0x2eee3d[0x7]):console[_0x62b6('0x1c')](_0x62b6('0x64')+_0x2eee3d);}},_0x4d7e95=null,_0x54e14d={},_0x4d5a37={},_0x52a953={};$[_0x62b6('0x5a')]=function(_0x49d957,_0x256d60){if(null===_0x4d7e95)if(_0x62b6('0x28')===typeof window[_0x62b6('0x57')]&&_0x62b6('0x3')!==typeof window[_0x62b6('0x57')][_0x62b6('0x24')])_0x4d7e95=window[_0x62b6('0x57')][_0x62b6('0x24')];else return _0x2d680f(_0x62b6('0x65'));var _0x595d62=$[_0x62b6('0x34')]({'done':function(){},'fail':function(){}},_0x256d60),_0x37df14=_0x49d957[_0x62b6('0x8')](';'),_0x1f216b=function(){_0x54e14d[_0x37df14][_0x62b6('0x2d')](_0x595d62[_0x62b6('0x66')]);_0x4d5a37[_0x37df14][_0x62b6('0x2d')](_0x595d62[_0x62b6('0x1b')]);};_0x52a953[_0x37df14]?_0x1f216b():(_0x54e14d[_0x37df14]=$['Callbacks'](),_0x4d5a37[_0x37df14]=$[_0x62b6('0x67')](),_0x1f216b(),_0x52a953[_0x37df14]=!0x0,_0x4d7e95[_0x62b6('0x25')](_0x49d957)['done'](function(_0x4b2e14){_0x52a953[_0x37df14]=!0x1;_0x54e14d[_0x37df14][_0x62b6('0x42')](_0x4b2e14);})['fail'](function(_0x11e036){_0x52a953[_0x37df14]=!0x1;_0x4d5a37[_0x37df14][_0x62b6('0x42')](_0x11e036);}));};}());(function(_0x1505f6){try{var _0xfd4cf2=jQuery,_0x2712d8,_0x3ab00c=_0xfd4cf2({}),_0x5895c4=function(_0xf03c73,_0x53d9f4){if(_0x62b6('0x28')===typeof console&&_0x62b6('0x3')!==typeof console[_0x62b6('0x1c')]&&_0x62b6('0x3')!==typeof console[_0x62b6('0x2c')]&&_0x62b6('0x3')!==typeof console[_0x62b6('0x2a')]){var _0x31dc8a;_0x62b6('0x28')===typeof _0xf03c73?(_0xf03c73['unshift'](_0x62b6('0x68')),_0x31dc8a=_0xf03c73):_0x31dc8a=[_0x62b6('0x68')+_0xf03c73];if('undefined'===typeof _0x53d9f4||_0x62b6('0x4c')!==_0x53d9f4[_0x62b6('0x29')]()&&_0x62b6('0x69')!==_0x53d9f4[_0x62b6('0x29')]())if(_0x62b6('0x3')!==typeof _0x53d9f4&&'info'===_0x53d9f4['toLowerCase']())try{console['info']['apply'](console,_0x31dc8a);}catch(_0x243d4a){try{console['info'](_0x31dc8a[_0x62b6('0x8')]('\x0a'));}catch(_0x1ed48f){}}else try{console[_0x62b6('0x1c')][_0x62b6('0x6a')](console,_0x31dc8a);}catch(_0x37cabe){try{console[_0x62b6('0x1c')](_0x31dc8a['join']('\x0a'));}catch(_0x26d494){}}else try{console[_0x62b6('0x2a')]['apply'](console,_0x31dc8a);}catch(_0x107ef1){try{console['warn'](_0x31dc8a[_0x62b6('0x8')]('\x0a'));}catch(_0xc69636){}}}},_0x4fe62a={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':'.productInformationWrapper\x20\x20a.buy-button','buyQtt':_0x62b6('0x6b'),'selectSkuMsg':_0x62b6('0x6c'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x2a03eb,_0x4bc08c,_0x17e8a0){_0xfd4cf2(_0x62b6('0x6d'))['is'](_0x62b6('0x6e'))&&(_0x62b6('0x1a')===_0x4bc08c?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x62b6('0x6f')),(_0x62b6('0x28')===typeof parent?parent:document)[_0x62b6('0x70')][_0x62b6('0x71')]=_0x17e8a0));},'isProductPage':function(){return _0xfd4cf2(_0x62b6('0x6d'))['is'](_0x62b6('0x72'));},'execDefaultAction':function(_0x1391a4){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0xfd4cf2[_0x62b6('0x73')]=function(_0x3ab7c9,_0x2eba1a){function _0x5b96c1(_0x2c425e){_0x2712d8[_0x62b6('0x74')]?_0x2c425e[_0x62b6('0x13')]('qd-bb-click-active')||(_0x2c425e[_0x62b6('0x13')](_0x62b6('0x75'),0x1),_0x2c425e['on'](_0x62b6('0x76'),function(_0x147322){if(!_0x2712d8[_0x62b6('0x77')]())return!0x0;if(!0x0!==_0x2bdfe3[_0x62b6('0x78')][_0x62b6('0x26')](this))return _0x147322[_0x62b6('0x79')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x5e5fe1(_0x4ef184){_0x4ef184=_0x4ef184||_0xfd4cf2(_0x2712d8[_0x62b6('0x7a')]);_0x4ef184[_0x62b6('0x35')](function(){var _0x4ef184=_0xfd4cf2(this);_0x4ef184['is'](_0x62b6('0x7b'))||(_0x4ef184[_0x62b6('0x48')](_0x62b6('0x7c')),_0x4ef184['is']('.btn-add-buy-button-asynchronous')&&!_0x4ef184['is'](_0x62b6('0x7d'))||_0x4ef184[_0x62b6('0x13')](_0x62b6('0x7e'))||(_0x4ef184[_0x62b6('0x13')]('qd-bb-active',0x1),_0x4ef184[_0x62b6('0x7f')]('.qd-bb-productAdded')['length']||_0x4ef184['append'](_0x62b6('0x80')),_0x4ef184['is'](_0x62b6('0x81'))&&_0x2712d8[_0x62b6('0x82')]()&&_0x2e33b1[_0x62b6('0x26')](_0x4ef184),_0x5b96c1(_0x4ef184)));});_0x2712d8[_0x62b6('0x82')]()&&!_0x4ef184['length']&&_0x5895c4('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x4ef184[_0x62b6('0x83')]+'\x27.',_0x62b6('0x2c'));}var _0x19de64=_0xfd4cf2(_0x3ab7c9);var _0x2bdfe3=this;window['_Quatro_Digital_dropDown']=window[_0x62b6('0x84')]||{};window['_QuatroDigital_CartData']=window[_0x62b6('0x37')]||{};_0x2bdfe3['prodAdd']=function(_0x223e74,_0x2cb267){_0x19de64['addClass'](_0x62b6('0x85'));_0xfd4cf2(_0x62b6('0x6d'))[_0x62b6('0x48')](_0x62b6('0x86'));var _0x16b1a1=_0xfd4cf2(_0x2712d8[_0x62b6('0x7a')])[_0x62b6('0x44')](_0x62b6('0x87')+(_0x223e74[_0x62b6('0x88')](_0x62b6('0x71'))||_0x62b6('0x89'))+'\x27]')[_0x62b6('0x2d')](_0x223e74);_0x16b1a1[_0x62b6('0x48')]('qd-bb-itemAddBuyButtonWrapper');setTimeout(function(){_0x19de64[_0x62b6('0x8a')](_0x62b6('0x8b'));_0x16b1a1[_0x62b6('0x8a')]('qd-bb-itemAddBuyButtonWrapper');},_0x2712d8['timeRemoveNewItemClass']);window['_Quatro_Digital_dropDown'][_0x62b6('0x25')]=void 0x0;if(_0x62b6('0x3')!==typeof _0x2eba1a&&_0x62b6('0x9')===typeof _0x2eba1a[_0x62b6('0x8c')])return _0x2712d8[_0x62b6('0x74')]||(_0x5895c4(_0x62b6('0x8d')),_0x2eba1a[_0x62b6('0x8c')]()),window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x2eba1a[_0x62b6('0x8c')](function(_0x4e75b2){window[_0x62b6('0x84')]['getOrderForm']=_0x4e75b2;_0xfd4cf2['fn'][_0x62b6('0x23')](!0x0,void 0x0,!0x0);},{'lastSku':_0x2cb267});window[_0x62b6('0x84')][_0x62b6('0x8e')]=!0x0;_0xfd4cf2['fn']['simpleCart'](!0x0);};(function(){if(_0x2712d8['isSmartCheckout']&&_0x2712d8[_0x62b6('0x8f')]){var _0x3d0901=_0xfd4cf2(_0x62b6('0x90'));_0x3d0901['length']&&_0x5e5fe1(_0x3d0901);}}());var _0x2e33b1=function(){var _0x4621a1=_0xfd4cf2(this);_0x62b6('0x3')!==typeof _0x4621a1['data']('buyButton')?(_0x4621a1['unbind'](_0x62b6('0x91')),_0x5b96c1(_0x4621a1)):(_0x4621a1[_0x62b6('0x92')](_0x62b6('0x93'),function(_0x4e9fd3){_0x4621a1[_0x62b6('0x94')](_0x62b6('0x91'));_0x5b96c1(_0x4621a1);_0xfd4cf2(this)[_0x62b6('0x94')](_0x4e9fd3);}),_0xfd4cf2(window)[_0x62b6('0x95')](function(){_0x4621a1[_0x62b6('0x94')](_0x62b6('0x91'));_0x5b96c1(_0x4621a1);_0x4621a1[_0x62b6('0x94')](_0x62b6('0x93'));}));};_0x2bdfe3['clickBuySmartCheckout']=function(){var _0x1df675=_0xfd4cf2(this),_0x3ab7c9=_0x1df675['attr'](_0x62b6('0x71'))||'';if(-0x1<_0x3ab7c9[_0x62b6('0x96')](_0x2712d8[_0x62b6('0x97')]))return!0x0;_0x3ab7c9=_0x3ab7c9[_0x62b6('0x2')](/redirect\=(false|true)/gi,'')[_0x62b6('0x2')]('?',_0x62b6('0x98'))['replace'](/\&\&/gi,'&');if(_0x2712d8[_0x62b6('0x99')](_0x1df675))return _0x1df675[_0x62b6('0x88')](_0x62b6('0x71'),_0x3ab7c9[_0x62b6('0x2')]('redirect=false',_0x62b6('0x9a'))),!0x0;_0x3ab7c9=_0x3ab7c9[_0x62b6('0x2')](/http.?:/i,'');_0x3ab00c['queue'](function(_0x27fc44){if(!_0x2712d8[_0x62b6('0x9b')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x3ab7c9))return _0x27fc44();var _0x16f40a=function(_0x3b6679,_0x8b1a13){var _0x5e5fe1=_0x3ab7c9['match'](/sku\=([0-9]+)/gi),_0x500931=[];if(_0x62b6('0x28')===typeof _0x5e5fe1&&null!==_0x5e5fe1)for(var _0x364a4e=_0x5e5fe1[_0x62b6('0x7')]-0x1;0x0<=_0x364a4e;_0x364a4e--){var _0x57aa30=parseInt(_0x5e5fe1[_0x364a4e]['replace'](/sku\=/gi,''));isNaN(_0x57aa30)||_0x500931['push'](_0x57aa30);}_0x2712d8[_0x62b6('0x9c')][_0x62b6('0x26')](this,_0x3b6679,_0x8b1a13,_0x3ab7c9);_0x2bdfe3[_0x62b6('0x9d')][_0x62b6('0x26')](this,_0x3b6679,_0x8b1a13,_0x3ab7c9,_0x500931);_0x2bdfe3[_0x62b6('0x9e')](_0x1df675,_0x3ab7c9[_0x62b6('0x9f')](_0x62b6('0xa0'))[_0x62b6('0xa1')]()['split']('&')['shift']());_0x62b6('0x9')===typeof _0x2712d8[_0x62b6('0xa2')]&&_0x2712d8['asyncCallback'][_0x62b6('0x26')](this);_0xfd4cf2(window)['trigger'](_0x62b6('0xa3'));_0xfd4cf2(window)[_0x62b6('0x5d')]('cartProductAdded.vtex');};_0x2712d8['fakeRequest']?(_0x16f40a(null,'success'),_0x27fc44()):_0xfd4cf2['ajax']({'url':_0x3ab7c9,'complete':_0x16f40a})[_0x62b6('0x1d')](function(){_0x27fc44();});});};_0x2bdfe3[_0x62b6('0x9d')]=function(_0x11844b,_0x2c3518,_0x4a03bf,_0x1c0ffa){try{'success'===_0x2c3518&&_0x62b6('0x28')===typeof window['parent']&&_0x62b6('0x9')===typeof window[_0x62b6('0xa4')][_0x62b6('0xa5')]&&window[_0x62b6('0xa4')][_0x62b6('0xa5')](_0x11844b,_0x2c3518,_0x4a03bf,_0x1c0ffa);}catch(_0x2554ed){_0x5895c4(_0x62b6('0xa6'));}};_0x5e5fe1();'function'===typeof _0x2712d8[_0x62b6('0x41')]?_0x2712d8[_0x62b6('0x41')][_0x62b6('0x26')](this):_0x5895c4(_0x62b6('0xa7'));};var _0xf65fd7=_0xfd4cf2[_0x62b6('0x67')]();_0xfd4cf2['fn']['QD_buyButton']=function(_0xe35588,_0x5e352d){var _0x1505f6=_0xfd4cf2(this);_0x62b6('0x3')!==typeof _0x5e352d||'object'!==typeof _0xe35588||_0xe35588 instanceof _0xfd4cf2||(_0x5e352d=_0xe35588,_0xe35588=void 0x0);_0x2712d8=_0xfd4cf2[_0x62b6('0x34')]({},_0x4fe62a,_0x5e352d);var _0x50bc07;_0xf65fd7[_0x62b6('0x2d')](function(){_0x1505f6[_0x62b6('0x7f')](_0x62b6('0xa8'))['length']||_0x1505f6[_0x62b6('0xa9')](_0x62b6('0xaa'));_0x50bc07=new _0xfd4cf2['QD_buyButton'](_0x1505f6,_0xe35588);});_0xf65fd7[_0x62b6('0x42')]();_0xfd4cf2(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x186967,_0x1ece30,_0x7eae8b){_0x50bc07[_0x62b6('0x9e')](_0x1ece30,_0x7eae8b);});return _0xfd4cf2[_0x62b6('0x34')](_0x1505f6,_0x50bc07);};var _0x4f1511=0x0;_0xfd4cf2(document)[_0x62b6('0xab')](function(_0x1a953c,_0x410749,_0x5d1825){-0x1<_0x5d1825['url']['toLowerCase']()['indexOf'](_0x62b6('0xac'))&&(_0x4f1511=(_0x5d1825['url'][_0x62b6('0xad')](/sku\=([0-9]+)/i)||[''])[_0x62b6('0xa1')]());});_0xfd4cf2(window)[_0x62b6('0x92')](_0x62b6('0xae'),function(){_0xfd4cf2(window)[_0x62b6('0x5d')](_0x62b6('0xaf'),[new _0xfd4cf2(),_0x4f1511]);});_0xfd4cf2(document)['ajaxStop'](function(){_0xf65fd7[_0x62b6('0x42')]();});}catch(_0x4a8c31){_0x62b6('0x3')!==typeof console&&_0x62b6('0x9')===typeof console[_0x62b6('0x1c')]&&console['error'](_0x62b6('0x63'),_0x4a8c31);}}(this));function qd_number_format(_0x7b5de4,_0x355905,_0x49e1bd,_0x5aeca5){_0x7b5de4=(_0x7b5de4+'')[_0x62b6('0x2')](/[^0-9+\-Ee.]/g,'');_0x7b5de4=isFinite(+_0x7b5de4)?+_0x7b5de4:0x0;_0x355905=isFinite(+_0x355905)?Math[_0x62b6('0xb0')](_0x355905):0x0;_0x5aeca5=_0x62b6('0x3')===typeof _0x5aeca5?',':_0x5aeca5;_0x49e1bd=_0x62b6('0x3')===typeof _0x49e1bd?'.':_0x49e1bd;var _0x13324f='',_0x13324f=function(_0x390f94,_0x239128){var _0x27cdd0=Math[_0x62b6('0x4')](0xa,_0x239128);return''+(Math[_0x62b6('0x5')](_0x390f94*_0x27cdd0)/_0x27cdd0)[_0x62b6('0x6')](_0x239128);},_0x13324f=(_0x355905?_0x13324f(_0x7b5de4,_0x355905):''+Math[_0x62b6('0x5')](_0x7b5de4))[_0x62b6('0x9f')]('.');0x3<_0x13324f[0x0][_0x62b6('0x7')]&&(_0x13324f[0x0]=_0x13324f[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x5aeca5));(_0x13324f[0x1]||'')[_0x62b6('0x7')]<_0x355905&&(_0x13324f[0x1]=_0x13324f[0x1]||'',_0x13324f[0x1]+=Array(_0x355905-_0x13324f[0x1][_0x62b6('0x7')]+0x1)[_0x62b6('0x8')]('0'));return _0x13324f['join'](_0x49e1bd);}(function(){try{window[_0x62b6('0x37')]=window[_0x62b6('0x37')]||{},window[_0x62b6('0x37')][_0x62b6('0x41')]=window[_0x62b6('0x37')]['callback']||$['Callbacks']();}catch(_0xc05467){_0x62b6('0x3')!==typeof console&&_0x62b6('0x9')===typeof console[_0x62b6('0x1c')]&&console[_0x62b6('0x1c')]('Oooops!\x20',_0xc05467['message']);}}());(function(_0x21a959){try{var _0xcbaf38=jQuery,_0x31cb0b=function(_0x3b8f99,_0x2f4ad3){if(_0x62b6('0x28')===typeof console&&_0x62b6('0x3')!==typeof console[_0x62b6('0x1c')]&&'undefined'!==typeof console['info']&&'undefined'!==typeof console['warn']){var _0x3c9d66;_0x62b6('0x28')===typeof _0x3b8f99?(_0x3b8f99[_0x62b6('0xb1')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x3c9d66=_0x3b8f99):_0x3c9d66=[_0x62b6('0xb2')+_0x3b8f99];if(_0x62b6('0x3')===typeof _0x2f4ad3||_0x62b6('0x4c')!==_0x2f4ad3[_0x62b6('0x29')]()&&_0x62b6('0x69')!==_0x2f4ad3[_0x62b6('0x29')]())if('undefined'!==typeof _0x2f4ad3&&_0x62b6('0x2c')===_0x2f4ad3[_0x62b6('0x29')]())try{console[_0x62b6('0x2c')][_0x62b6('0x6a')](console,_0x3c9d66);}catch(_0x2eb824){try{console[_0x62b6('0x2c')](_0x3c9d66[_0x62b6('0x8')]('\x0a'));}catch(_0x4df32c){}}else try{console[_0x62b6('0x1c')][_0x62b6('0x6a')](console,_0x3c9d66);}catch(_0x51bf31){try{console['error'](_0x3c9d66[_0x62b6('0x8')]('\x0a'));}catch(_0x22e38d){}}else try{console['warn']['apply'](console,_0x3c9d66);}catch(_0x2f23b0){try{console[_0x62b6('0x2a')](_0x3c9d66[_0x62b6('0x8')]('\x0a'));}catch(_0x4c1d85){}}}};window[_0x62b6('0x56')]=window[_0x62b6('0x56')]||{};window[_0x62b6('0x56')][_0x62b6('0x8e')]=!0x0;_0xcbaf38['QD_dropDownCart']=function(){};_0xcbaf38['fn'][_0x62b6('0xb3')]=function(){return{'fn':new _0xcbaf38()};};var _0xa881bb=function(_0x3b81f7){var _0xfbe374={'i':_0x62b6('0xb4')};return function(_0x41d251){var _0x1c0786=function(_0x4a18e7){return _0x4a18e7;};var _0x6dd440=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x41d251=_0x41d251['d'+_0x6dd440[0x10]+'c'+_0x6dd440[0x11]+'m'+_0x1c0786(_0x6dd440[0x1])+'n'+_0x6dd440[0xd]]['l'+_0x6dd440[0x12]+'c'+_0x6dd440[0x0]+'ti'+_0x1c0786('o')+'n'];var _0x5c845e=function(_0x412236){return escape(encodeURIComponent(_0x412236['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1917b4){return String[_0x62b6('0xb5')](('Z'>=_0x1917b4?0x5a:0x7a)>=(_0x1917b4=_0x1917b4[_0x62b6('0xb6')](0x0)+0xd)?_0x1917b4:_0x1917b4-0x1a);})));};var _0x21a959=_0x5c845e(_0x41d251[[_0x6dd440[0x9],_0x1c0786('o'),_0x6dd440[0xc],_0x6dd440[_0x1c0786(0xd)]]['join']('')]);_0x5c845e=_0x5c845e((window[['js',_0x1c0786('no'),'m',_0x6dd440[0x1],_0x6dd440[0x4][_0x62b6('0xd')](),'ite'][_0x62b6('0x8')]('')]||_0x62b6('0x89'))+['.v',_0x6dd440[0xd],'e',_0x1c0786('x'),'co',_0x1c0786('mm'),'erc',_0x6dd440[0x1],'.c',_0x1c0786('o'),'m.',_0x6dd440[0x13],'r'][_0x62b6('0x8')](''));for(var _0x5a6777 in _0xfbe374){if(_0x5c845e===_0x5a6777+_0xfbe374[_0x5a6777]||_0x21a959===_0x5a6777+_0xfbe374[_0x5a6777]){var _0x1705d6='tr'+_0x6dd440[0x11]+'e';break;}_0x1705d6='f'+_0x6dd440[0x0]+'ls'+_0x1c0786(_0x6dd440[0x1])+'';}_0x1c0786=!0x1;-0x1<_0x41d251[[_0x6dd440[0xc],'e',_0x6dd440[0x0],'rc',_0x6dd440[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x1c0786=!0x0);return[_0x1705d6,_0x1c0786];}(_0x3b81f7);}(window);if(!eval(_0xa881bb[0x0]))return _0xa881bb[0x1]?_0x31cb0b(_0x62b6('0xb7')):!0x1;_0xcbaf38[_0x62b6('0xb3')]=function(_0x38e5c0,_0x5ce8d5){var _0x53aa6b=_0xcbaf38(_0x38e5c0);if(!_0x53aa6b[_0x62b6('0x7')])return _0x53aa6b;var _0x337fbf=_0xcbaf38[_0x62b6('0x34')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x62b6('0xb8'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x62b6('0xb9'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x176846){return _0x176846['skuName']||_0x176846[_0x62b6('0xba')];},'callback':function(){},'callbackProductsList':function(){}},_0x5ce8d5);_0xcbaf38('');var _0xfb78b3=this;if(_0x337fbf[_0x62b6('0x55')]){var _0x139e08=!0x1;_0x62b6('0x3')===typeof window[_0x62b6('0x57')]&&(_0x31cb0b(_0x62b6('0xbb')),_0xcbaf38[_0x62b6('0x19')]({'url':_0x62b6('0xbc'),'async':!0x1,'dataType':_0x62b6('0xbd'),'error':function(){_0x31cb0b('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x139e08=!0x0;}}));if(_0x139e08)return _0x31cb0b('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x62b6('0x28')===typeof window['vtexjs']&&_0x62b6('0x3')!==typeof window[_0x62b6('0x57')]['checkout'])var _0xa50dda=window['vtexjs'][_0x62b6('0x24')];else if(_0x62b6('0x28')===typeof vtex&&_0x62b6('0x28')===typeof vtex['checkout']&&'undefined'!==typeof vtex[_0x62b6('0x24')][_0x62b6('0x58')])_0xa50dda=new vtex[(_0x62b6('0x24'))][(_0x62b6('0x58'))]();else return _0x31cb0b(_0x62b6('0x59'));_0xfb78b3[_0x62b6('0xbe')]=_0x62b6('0xbf');var _0x4556da=function(_0x323f25){_0xcbaf38(this)['append'](_0x323f25);_0x323f25[_0x62b6('0x53')](_0x62b6('0xc0'))[_0x62b6('0x2d')](_0xcbaf38(_0x62b6('0xc1')))['on'](_0x62b6('0xc2'),function(){_0x53aa6b[_0x62b6('0x8a')](_0x62b6('0xc3'));_0xcbaf38(document[_0x62b6('0x6d')])[_0x62b6('0x8a')]('qd-bb-lightBoxBodyProdAdd');});_0xcbaf38(document)['off'](_0x62b6('0xc4'))['on']('keyup.qd_ddc_closeFn',function(_0x458a2d){0x1b==_0x458a2d[_0x62b6('0xc5')]&&(_0x53aa6b['removeClass'](_0x62b6('0xc3')),_0xcbaf38(document['body'])['removeClass'](_0x62b6('0x86')));});var _0x1fc26b=_0x323f25[_0x62b6('0x53')]('.qd-ddc-prodWrapper');_0x323f25[_0x62b6('0x53')](_0x62b6('0xc6'))['on'](_0x62b6('0xc7'),function(){_0xfb78b3[_0x62b6('0xc8')]('-',void 0x0,void 0x0,_0x1fc26b);return!0x1;});_0x323f25[_0x62b6('0x53')](_0x62b6('0xc9'))['on'](_0x62b6('0xca'),function(){_0xfb78b3[_0x62b6('0xc8')](void 0x0,void 0x0,void 0x0,_0x1fc26b);return!0x1;});_0x323f25[_0x62b6('0x53')]('.qd-ddc-shipping\x20input')['val']('')['on'](_0x62b6('0xcb'),function(){_0xfb78b3[_0x62b6('0xcc')](_0xcbaf38(this));});if(_0x337fbf[_0x62b6('0xcd')]){var _0x5ce8d5=0x0;_0xcbaf38(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x323f25=function(){window['_QuatroDigital_DropDown'][_0x62b6('0x8e')]&&(_0xfb78b3[_0x62b6('0x8c')](),window[_0x62b6('0x56')][_0x62b6('0x8e')]=!0x1,_0xcbaf38['fn'][_0x62b6('0x23')](!0x0),_0xfb78b3[_0x62b6('0xce')]());};_0x5ce8d5=setInterval(function(){_0x323f25();},0x258);_0x323f25();});_0xcbaf38(this)['on'](_0x62b6('0xcf'),function(){clearInterval(_0x5ce8d5);});}};var _0x3bdf90=function(_0xebcc17){_0xebcc17=_0xcbaf38(_0xebcc17);_0x337fbf['texts'][_0x62b6('0x52')]=_0x337fbf[_0x62b6('0xd0')]['cartTotal'][_0x62b6('0x2')](_0x62b6('0xd1'),_0x62b6('0xd2'));_0x337fbf[_0x62b6('0xd0')][_0x62b6('0x52')]=_0x337fbf[_0x62b6('0xd0')][_0x62b6('0x52')][_0x62b6('0x2')]('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>');_0x337fbf[_0x62b6('0xd0')][_0x62b6('0x52')]=_0x337fbf[_0x62b6('0xd0')][_0x62b6('0x52')][_0x62b6('0x2')](_0x62b6('0xd3'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x337fbf[_0x62b6('0xd0')][_0x62b6('0x52')]=_0x337fbf[_0x62b6('0xd0')]['cartTotal'][_0x62b6('0x2')]('#total',_0x62b6('0xd4'));_0xebcc17[_0x62b6('0x53')]('.qd-ddc-viewCart')['html'](_0x337fbf[_0x62b6('0xd0')]['linkCart']);_0xebcc17['find']('.qd_ddc_continueShopping')[_0x62b6('0x4e')](_0x337fbf[_0x62b6('0xd0')][_0x62b6('0xd5')]);_0xebcc17[_0x62b6('0x53')]('.qd-ddc-checkout')[_0x62b6('0x4e')](_0x337fbf[_0x62b6('0xd0')][_0x62b6('0xd6')]);_0xebcc17[_0x62b6('0x53')](_0x62b6('0xd7'))[_0x62b6('0x4e')](_0x337fbf[_0x62b6('0xd0')][_0x62b6('0x52')]);_0xebcc17[_0x62b6('0x53')]('.qd-ddc-shipping')[_0x62b6('0x4e')](_0x337fbf[_0x62b6('0xd0')][_0x62b6('0xd8')]);_0xebcc17[_0x62b6('0x53')]('.qd-ddc-emptyCart\x20p')[_0x62b6('0x4e')](_0x337fbf[_0x62b6('0xd0')]['emptyCart']);return _0xebcc17;}(this[_0x62b6('0xbe')]);var _0x23cb6e=0x0;_0x53aa6b[_0x62b6('0x35')](function(){0x0<_0x23cb6e?_0x4556da[_0x62b6('0x26')](this,_0x3bdf90[_0x62b6('0xd9')]()):_0x4556da['call'](this,_0x3bdf90);_0x23cb6e++;});window[_0x62b6('0x37')]['callback'][_0x62b6('0x2d')](function(){_0xcbaf38(_0x62b6('0xda'))[_0x62b6('0x4e')](window['_QuatroDigital_CartData'][_0x62b6('0x4f')]||'--');_0xcbaf38(_0x62b6('0xdb'))[_0x62b6('0x4e')](window[_0x62b6('0x37')][_0x62b6('0x3e')]||'0');_0xcbaf38(_0x62b6('0xdc'))['html'](window[_0x62b6('0x37')][_0x62b6('0x3c')]||'--');_0xcbaf38(_0x62b6('0xdd'))[_0x62b6('0x4e')](window[_0x62b6('0x37')][_0x62b6('0x3d')]||'--');});var _0x368a62=function(_0x3accac,_0x497b98){if(_0x62b6('0x3')===typeof _0x3accac[_0x62b6('0x3f')])return _0x31cb0b('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0xfb78b3[_0x62b6('0xde')]['call'](this,_0x497b98);};_0xfb78b3[_0x62b6('0x8c')]=function(_0x5af016,_0x2a2f3f){_0x62b6('0x3')!=typeof _0x2a2f3f?window[_0x62b6('0x56')][_0x62b6('0xdf')]=_0x2a2f3f:window[_0x62b6('0x56')][_0x62b6('0xdf')]&&(_0x2a2f3f=window[_0x62b6('0x56')][_0x62b6('0xdf')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x62b6('0xdf')]=void 0x0;},_0x337fbf[_0x62b6('0xe0')]);_0xcbaf38(_0x62b6('0xe1'))[_0x62b6('0x8a')](_0x62b6('0xe2'));if(_0x337fbf[_0x62b6('0x55')]){var _0x5ce8d5=function(_0x5d1eca){window[_0x62b6('0x56')][_0x62b6('0x25')]=_0x5d1eca;_0x368a62(_0x5d1eca,_0x2a2f3f);_0x62b6('0x3')!==typeof window[_0x62b6('0xe3')]&&_0x62b6('0x9')===typeof window[_0x62b6('0xe3')][_0x62b6('0xe4')]&&window[_0x62b6('0xe3')][_0x62b6('0xe4')]['call'](this);_0xcbaf38(_0x62b6('0xe1'))[_0x62b6('0x48')](_0x62b6('0xe2'));};_0x62b6('0x3')!==typeof window[_0x62b6('0x56')][_0x62b6('0x25')]?(_0x5ce8d5(window[_0x62b6('0x56')]['getOrderForm']),_0x62b6('0x9')===typeof _0x5af016&&_0x5af016(window[_0x62b6('0x56')][_0x62b6('0x25')])):_0xcbaf38[_0x62b6('0x5a')]([_0x62b6('0x3f'),_0x62b6('0x38'),'shippingData'],{'done':function(_0x235716){_0x5ce8d5[_0x62b6('0x26')](this,_0x235716);'function'===typeof _0x5af016&&_0x5af016(_0x235716);},'fail':function(_0x24cd7a){_0x31cb0b([_0x62b6('0xe5'),_0x24cd7a]);}});}else alert(_0x62b6('0xe6'));};_0xfb78b3['cartIsEmpty']=function(){var _0x250640=_0xcbaf38(_0x62b6('0xe1'));_0x250640[_0x62b6('0x53')](_0x62b6('0xe7'))[_0x62b6('0x7')]?_0x250640[_0x62b6('0x8a')](_0x62b6('0xe8')):_0x250640[_0x62b6('0x48')](_0x62b6('0xe8'));};_0xfb78b3[_0x62b6('0xde')]=function(_0x4437be){var _0x5ce8d5=_0xcbaf38(_0x62b6('0xe9'));_0x5ce8d5['empty']();_0x5ce8d5['each'](function(){var _0x5ce8d5=_0xcbaf38(this),_0x38e5c0,_0x3ebcef,_0x55d9f2=_0xcbaf38(''),_0x54fcc2;for(_0x54fcc2 in window[_0x62b6('0x56')]['getOrderForm']['items'])if(_0x62b6('0x28')===typeof window['_QuatroDigital_DropDown'][_0x62b6('0x25')][_0x62b6('0x3f')][_0x54fcc2]){var _0x13d204=window[_0x62b6('0x56')][_0x62b6('0x25')][_0x62b6('0x3f')][_0x54fcc2];var _0x28cc7e=_0x13d204[_0x62b6('0xea')][_0x62b6('0x2')](/^\/|\/$/g,'')[_0x62b6('0x9f')]('/');var _0x25560a=_0xcbaf38('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x25560a[_0x62b6('0x88')]({'data-sku':_0x13d204['id'],'data-sku-index':_0x54fcc2,'data-qd-departament':_0x28cc7e[0x0],'data-qd-category':_0x28cc7e[_0x28cc7e['length']-0x1]});_0x25560a[_0x62b6('0x48')](_0x62b6('0xeb')+_0x13d204[_0x62b6('0xec')]);_0x25560a[_0x62b6('0x53')](_0x62b6('0xed'))[_0x62b6('0xee')](_0x337fbf[_0x62b6('0xef')](_0x13d204));_0x25560a['find'](_0x62b6('0xf0'))[_0x62b6('0xee')](isNaN(_0x13d204[_0x62b6('0xf1')])?_0x13d204[_0x62b6('0xf1')]:0x0==_0x13d204['sellingPrice']?_0x62b6('0xf2'):(_0xcbaf38(_0x62b6('0x33'))[_0x62b6('0x88')](_0x62b6('0xf3'))||'R$')+'\x20'+qd_number_format(_0x13d204[_0x62b6('0xf1')]/0x64,0x2,',','.'));_0x25560a[_0x62b6('0x53')](_0x62b6('0xf4'))[_0x62b6('0x88')]({'data-sku':_0x13d204['id'],'data-sku-index':_0x54fcc2})[_0x62b6('0xf5')](_0x13d204['quantity']);_0x25560a[_0x62b6('0x53')]('.qd-ddc-remove')[_0x62b6('0x88')]({'data-sku':_0x13d204['id'],'data-sku-index':_0x54fcc2});_0xfb78b3[_0x62b6('0xf6')](_0x13d204['id'],_0x25560a['find'](_0x62b6('0xf7')),_0x13d204['imageUrl']);_0x25560a['find'](_0x62b6('0xf8'))[_0x62b6('0x88')]({'data-sku':_0x13d204['id'],'data-sku-index':_0x54fcc2});_0x25560a[_0x62b6('0xf9')](_0x5ce8d5);_0x55d9f2=_0x55d9f2[_0x62b6('0x2d')](_0x25560a);}try{var _0x1b2ca6=_0x5ce8d5['getParent'](_0x62b6('0xe1'))[_0x62b6('0x53')](_0x62b6('0xfa'));_0x1b2ca6[_0x62b6('0x7')]&&''==_0x1b2ca6[_0x62b6('0xf5')]()&&window[_0x62b6('0x56')][_0x62b6('0x25')][_0x62b6('0x5b')][_0x62b6('0xfb')]&&_0x1b2ca6[_0x62b6('0xf5')](window[_0x62b6('0x56')][_0x62b6('0x25')][_0x62b6('0x5b')]['address'][_0x62b6('0xfc')]);}catch(_0x1de9f0){_0x31cb0b(_0x62b6('0xfd')+_0x1de9f0[_0x62b6('0x21')],'aviso');}_0xfb78b3['actionButtons'](_0x5ce8d5);_0xfb78b3[_0x62b6('0xce')]();_0x4437be&&_0x4437be[_0x62b6('0xfe')]&&function(){_0x3ebcef=_0x55d9f2[_0x62b6('0x44')](_0x62b6('0xff')+_0x4437be['lastSku']+'\x27]');_0x3ebcef['length']&&(_0x38e5c0=0x0,_0x55d9f2[_0x62b6('0x35')](function(){var _0x4437be=_0xcbaf38(this);if(_0x4437be['is'](_0x3ebcef))return!0x1;_0x38e5c0+=_0x4437be['outerHeight']();}),_0xfb78b3[_0x62b6('0xc8')](void 0x0,void 0x0,_0x38e5c0,_0x5ce8d5[_0x62b6('0x2d')](_0x5ce8d5['parent']())),_0x55d9f2[_0x62b6('0x8a')](_0x62b6('0x100')),function(_0x36d121){_0x36d121[_0x62b6('0x48')](_0x62b6('0x101'));_0x36d121[_0x62b6('0x48')](_0x62b6('0x100'));setTimeout(function(){_0x36d121['removeClass'](_0x62b6('0x101'));},_0x337fbf['timeRemoveNewItemClass']);}(_0x3ebcef));}();});(function(){_QuatroDigital_DropDown[_0x62b6('0x25')][_0x62b6('0x3f')]['length']?(_0xcbaf38(_0x62b6('0x6d'))[_0x62b6('0x8a')](_0x62b6('0x102'))[_0x62b6('0x48')](_0x62b6('0x103')),setTimeout(function(){_0xcbaf38(_0x62b6('0x6d'))[_0x62b6('0x8a')](_0x62b6('0x104'));},_0x337fbf['timeRemoveNewItemClass'])):_0xcbaf38(_0x62b6('0x6d'))['removeClass'](_0x62b6('0x105'))[_0x62b6('0x48')]('qd-ddc-cart-empty');}());_0x62b6('0x9')===typeof _0x337fbf[_0x62b6('0x106')]?_0x337fbf[_0x62b6('0x106')][_0x62b6('0x26')](this):_0x31cb0b(_0x62b6('0x107'));};_0xfb78b3[_0x62b6('0xf6')]=function(_0x316332,_0x49932a,_0x25cbd8){function _0x43a5b5(){_0x49932a[_0x62b6('0x8a')](_0x62b6('0x108'))['load'](function(){_0xcbaf38(this)['addClass']('qd-loaded');})[_0x62b6('0x88')]('src',_0x25cbd8);}_0x25cbd8?_0x43a5b5():isNaN(_0x316332)?_0x31cb0b(_0x62b6('0x109'),'alerta'):alert(_0x62b6('0x10a'));};_0xfb78b3['actionButtons']=function(_0x4f4bc0){var _0x4ab189=function(_0x260cd9,_0x1f245a){var _0x5ce8d5=_0xcbaf38(_0x260cd9);var _0x53c0c0=_0x5ce8d5[_0x62b6('0x88')](_0x62b6('0x10b'));var _0x38e5c0=_0x5ce8d5[_0x62b6('0x88')](_0x62b6('0x10c'));if(_0x53c0c0){var _0x5270f4=parseInt(_0x5ce8d5[_0x62b6('0xf5')]())||0x1;_0xfb78b3[_0x62b6('0x10d')]([_0x53c0c0,_0x38e5c0],_0x5270f4,_0x5270f4+0x1,function(_0x193cac){_0x5ce8d5[_0x62b6('0xf5')](_0x193cac);_0x62b6('0x9')===typeof _0x1f245a&&_0x1f245a();});}};var _0x5ce8d5=function(_0x299f54,_0x5b4b49){var _0x5ce8d5=_0xcbaf38(_0x299f54);var _0x25cff1=_0x5ce8d5[_0x62b6('0x88')](_0x62b6('0x10b'));var _0x38e5c0=_0x5ce8d5['attr'](_0x62b6('0x10c'));if(_0x25cff1){var _0xa7c15b=parseInt(_0x5ce8d5['val']())||0x2;_0xfb78b3[_0x62b6('0x10d')]([_0x25cff1,_0x38e5c0],_0xa7c15b,_0xa7c15b-0x1,function(_0x22f7a0){_0x5ce8d5[_0x62b6('0xf5')](_0x22f7a0);'function'===typeof _0x5b4b49&&_0x5b4b49();});}};var _0x40b1e0=function(_0x55221c,_0x1ab63d){var _0x5ce8d5=_0xcbaf38(_0x55221c);var _0x2e8a4f=_0x5ce8d5['attr'](_0x62b6('0x10b'));var _0x38e5c0=_0x5ce8d5['attr'](_0x62b6('0x10c'));if(_0x2e8a4f){var _0x28a310=parseInt(_0x5ce8d5[_0x62b6('0xf5')]())||0x1;_0xfb78b3[_0x62b6('0x10d')]([_0x2e8a4f,_0x38e5c0],0x1,_0x28a310,function(_0x457943){_0x5ce8d5[_0x62b6('0xf5')](_0x457943);_0x62b6('0x9')===typeof _0x1ab63d&&_0x1ab63d();});}};var _0x38e5c0=_0x4f4bc0[_0x62b6('0x53')](_0x62b6('0x10e'));_0x38e5c0['addClass']('qd_on')[_0x62b6('0x35')](function(){var _0x4f4bc0=_0xcbaf38(this);_0x4f4bc0['find']('.qd-ddc-quantityMore')['on']('click.qd_ddc_more',function(_0xc38402){_0xc38402[_0x62b6('0x79')]();_0x38e5c0[_0x62b6('0x48')](_0x62b6('0x10f'));_0x4ab189(_0x4f4bc0['find'](_0x62b6('0xf4')),function(){_0x38e5c0[_0x62b6('0x8a')](_0x62b6('0x10f'));});});_0x4f4bc0['find'](_0x62b6('0x110'))['on'](_0x62b6('0x111'),function(_0x737d2d){_0x737d2d[_0x62b6('0x79')]();_0x38e5c0['addClass'](_0x62b6('0x10f'));_0x5ce8d5(_0x4f4bc0['find'](_0x62b6('0xf4')),function(){_0x38e5c0[_0x62b6('0x8a')](_0x62b6('0x10f'));});});_0x4f4bc0[_0x62b6('0x53')]('.qd-ddc-quantity')['on'](_0x62b6('0x112'),function(){_0x38e5c0[_0x62b6('0x48')](_0x62b6('0x10f'));_0x40b1e0(this,function(){_0x38e5c0[_0x62b6('0x8a')](_0x62b6('0x10f'));});});_0x4f4bc0[_0x62b6('0x53')](_0x62b6('0xf4'))['on']('keyup.qd_ddc_change',function(_0x53b5dc){0xd==_0x53b5dc[_0x62b6('0xc5')]&&(_0x38e5c0['addClass'](_0x62b6('0x10f')),_0x40b1e0(this,function(){_0x38e5c0['removeClass'](_0x62b6('0x10f'));}));});});_0x4f4bc0[_0x62b6('0x53')](_0x62b6('0xe7'))[_0x62b6('0x35')](function(){var _0x4f4bc0=_0xcbaf38(this);_0x4f4bc0[_0x62b6('0x53')](_0x62b6('0x113'))['on'](_0x62b6('0x114'),function(){_0x4f4bc0[_0x62b6('0x48')](_0x62b6('0x10f'));_0xfb78b3[_0x62b6('0x115')](_0xcbaf38(this),function(_0x2d410f){_0x2d410f?_0x4f4bc0[_0x62b6('0x116')](!0x0)[_0x62b6('0x117')](function(){_0x4f4bc0[_0x62b6('0x118')]();_0xfb78b3[_0x62b6('0xce')]();}):_0x4f4bc0['removeClass'](_0x62b6('0x10f'));});return!0x1;});});};_0xfb78b3[_0x62b6('0xcc')]=function(_0x5c4d9c){var _0x328701=_0x5c4d9c[_0x62b6('0xf5')](),_0x328701=_0x328701[_0x62b6('0x2')](/[^0-9\-]/g,''),_0x328701=_0x328701[_0x62b6('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3'),_0x328701=_0x328701[_0x62b6('0x2')](/(.{9}).*/g,'$1');_0x5c4d9c[_0x62b6('0xf5')](_0x328701);0x9<=_0x328701[_0x62b6('0x7')]&&(_0x5c4d9c[_0x62b6('0x13')](_0x62b6('0x119'))!=_0x328701&&_0xa50dda[_0x62b6('0x11a')]({'postalCode':_0x328701,'country':_0x62b6('0x11b')})[_0x62b6('0x66')](function(_0x4d2c0d){window[_0x62b6('0x56')]['getOrderForm']=_0x4d2c0d;_0xfb78b3[_0x62b6('0x8c')]();})[_0x62b6('0x1b')](function(_0x14f73d){_0x31cb0b(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x14f73d]);updateCartData();}),_0x5c4d9c[_0x62b6('0x13')](_0x62b6('0x119'),_0x328701));};_0xfb78b3[_0x62b6('0x10d')]=function(_0x4782f5,_0x56f290,_0x3221d7,_0x5cd86e){function _0x3ff111(_0x4c3965){_0x4c3965=_0x62b6('0x11c')!==typeof _0x4c3965?!0x1:_0x4c3965;_0xfb78b3['getCartInfoByUrl']();window[_0x62b6('0x56')][_0x62b6('0x8e')]=!0x1;_0xfb78b3['cartIsEmpty']();_0x62b6('0x3')!==typeof window[_0x62b6('0xe3')]&&_0x62b6('0x9')===typeof window[_0x62b6('0xe3')]['exec']&&window[_0x62b6('0xe3')]['exec'][_0x62b6('0x26')](this);_0x62b6('0x9')===typeof adminCart&&adminCart();_0xcbaf38['fn'][_0x62b6('0x23')](!0x0,void 0x0,_0x4c3965);_0x62b6('0x9')===typeof _0x5cd86e&&_0x5cd86e(_0x56f290);}_0x3221d7=_0x3221d7||0x1;if(0x1>_0x3221d7)return _0x56f290;if(_0x337fbf[_0x62b6('0x55')]){if('undefined'===typeof window[_0x62b6('0x56')]['getOrderForm'][_0x62b6('0x3f')][_0x4782f5[0x1]])return _0x31cb0b(_0x62b6('0x11d')+_0x4782f5[0x1]+']'),_0x56f290;window[_0x62b6('0x56')][_0x62b6('0x25')][_0x62b6('0x3f')][_0x4782f5[0x1]][_0x62b6('0x40')]=_0x3221d7;window[_0x62b6('0x56')][_0x62b6('0x25')][_0x62b6('0x3f')][_0x4782f5[0x1]]['index']=_0x4782f5[0x1];_0xa50dda['updateItems']([window[_0x62b6('0x56')]['getOrderForm'][_0x62b6('0x3f')][_0x4782f5[0x1]]],[_0x62b6('0x3f'),'totalizers',_0x62b6('0x5b')])[_0x62b6('0x66')](function(_0x51371e){window[_0x62b6('0x56')][_0x62b6('0x25')]=_0x51371e;_0x3ff111(!0x0);})[_0x62b6('0x1b')](function(_0xd4c0af){_0x31cb0b([_0x62b6('0x11e'),_0xd4c0af]);_0x3ff111();});}else _0x31cb0b(_0x62b6('0x11f'));};_0xfb78b3['removeProduct']=function(_0x3a2f8b,_0x40c96c){function _0x4ee994(_0x27b7e6){_0x27b7e6='boolean'!==typeof _0x27b7e6?!0x1:_0x27b7e6;_0x62b6('0x3')!==typeof window[_0x62b6('0xe3')]&&_0x62b6('0x9')===typeof window[_0x62b6('0xe3')]['exec']&&window[_0x62b6('0xe3')][_0x62b6('0xe4')][_0x62b6('0x26')](this);_0x62b6('0x9')===typeof adminCart&&adminCart();_0xcbaf38['fn'][_0x62b6('0x23')](!0x0,void 0x0,_0x27b7e6);_0x62b6('0x9')===typeof _0x40c96c&&_0x40c96c(_0x38e5c0);}var _0x38e5c0=!0x1,_0xc5ecd=_0xcbaf38(_0x3a2f8b)[_0x62b6('0x88')](_0x62b6('0x10c'));if(_0x337fbf[_0x62b6('0x55')]){if(_0x62b6('0x3')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x62b6('0x3f')][_0xc5ecd])return _0x31cb0b('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0xc5ecd+']'),_0x38e5c0;window[_0x62b6('0x56')][_0x62b6('0x25')]['items'][_0xc5ecd][_0x62b6('0x120')]=_0xc5ecd;_0xa50dda[_0x62b6('0x121')]([window['_QuatroDigital_DropDown'][_0x62b6('0x25')]['items'][_0xc5ecd]],[_0x62b6('0x3f'),_0x62b6('0x38'),_0x62b6('0x5b')])[_0x62b6('0x66')](function(_0x179916){_0x38e5c0=!0x0;window[_0x62b6('0x56')][_0x62b6('0x25')]=_0x179916;_0x368a62(_0x179916);_0x4ee994(!0x0);})[_0x62b6('0x1b')](function(_0x49ff37){_0x31cb0b([_0x62b6('0x122'),_0x49ff37]);_0x4ee994();});}else alert(_0x62b6('0x123'));};_0xfb78b3[_0x62b6('0xc8')]=function(_0x2b3877,_0x39a0ce,_0x54129d,_0x222553){_0x222553=_0x222553||_0xcbaf38('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x2b3877=_0x2b3877||'+';_0x39a0ce=_0x39a0ce||0.9*_0x222553[_0x62b6('0x124')]();_0x222553['stop'](!0x0,!0x0)[_0x62b6('0x125')]({'scrollTop':isNaN(_0x54129d)?_0x2b3877+'='+_0x39a0ce+'px':_0x54129d});};_0x337fbf[_0x62b6('0xcd')]||(_0xfb78b3[_0x62b6('0x8c')](),_0xcbaf38['fn'][_0x62b6('0x23')](!0x0));_0xcbaf38(window)['on'](_0x62b6('0x126'),function(){try{window[_0x62b6('0x56')]['getOrderForm']=void 0x0,_0xfb78b3['getCartInfoByUrl']();}catch(_0x26fe8d){_0x31cb0b(_0x62b6('0x127')+_0x26fe8d['message'],'avisso');}});_0x62b6('0x9')===typeof _0x337fbf[_0x62b6('0x41')]?_0x337fbf['callback'][_0x62b6('0x26')](this):_0x31cb0b('Callback\x20não\x20é\x20uma\x20função');};_0xcbaf38['fn']['QD_dropDownCart']=function(_0x27e468){var _0x47c5ef=_0xcbaf38(this);_0x47c5ef['fn']=new _0xcbaf38[(_0x62b6('0xb3'))](this,_0x27e468);return _0x47c5ef;};}catch(_0x7c15e0){'undefined'!==typeof console&&_0x62b6('0x9')===typeof console['error']&&console[_0x62b6('0x1c')](_0x62b6('0x63'),_0x7c15e0);}}(this));(function(_0x4d2b04){try{var _0x5b1fcd=jQuery;window[_0x62b6('0xe3')]=window[_0x62b6('0xe3')]||{};window['_QuatroDigital_AmountProduct'][_0x62b6('0x3f')]={};window[_0x62b6('0xe3')][_0x62b6('0x128')]=!0x1;window['_QuatroDigital_AmountProduct'][_0x62b6('0x129')]=!0x1;window[_0x62b6('0xe3')][_0x62b6('0x12a')]=!0x1;var _0x4d6b18=function(){if(window[_0x62b6('0xe3')][_0x62b6('0x128')]){var _0x53cbbd=!0x1;var _0x4d2b04={};window[_0x62b6('0xe3')][_0x62b6('0x3f')]={};for(_0x141c50 in window[_0x62b6('0x56')]['getOrderForm'][_0x62b6('0x3f')])if('object'===typeof window[_0x62b6('0x56')][_0x62b6('0x25')][_0x62b6('0x3f')][_0x141c50]){var _0xdbe57d=window[_0x62b6('0x56')][_0x62b6('0x25')][_0x62b6('0x3f')][_0x141c50];_0x62b6('0x3')!==typeof _0xdbe57d[_0x62b6('0x12b')]&&null!==_0xdbe57d[_0x62b6('0x12b')]&&''!==_0xdbe57d[_0x62b6('0x12b')]&&(window[_0x62b6('0xe3')][_0x62b6('0x3f')][_0x62b6('0x12c')+_0xdbe57d['productId']]=window[_0x62b6('0xe3')]['items'][_0x62b6('0x12c')+_0xdbe57d[_0x62b6('0x12b')]]||{},window[_0x62b6('0xe3')][_0x62b6('0x3f')]['prod_'+_0xdbe57d[_0x62b6('0x12b')]][_0x62b6('0x12d')]=_0xdbe57d[_0x62b6('0x12b')],_0x4d2b04[_0x62b6('0x12c')+_0xdbe57d[_0x62b6('0x12b')]]||(window[_0x62b6('0xe3')][_0x62b6('0x3f')][_0x62b6('0x12c')+_0xdbe57d['productId']]['qtt']=0x0),window[_0x62b6('0xe3')][_0x62b6('0x3f')]['prod_'+_0xdbe57d[_0x62b6('0x12b')]][_0x62b6('0x3e')]+=_0xdbe57d['quantity'],_0x53cbbd=!0x0,_0x4d2b04[_0x62b6('0x12c')+_0xdbe57d[_0x62b6('0x12b')]]=!0x0);}var _0x141c50=_0x53cbbd;}else _0x141c50=void 0x0;window[_0x62b6('0xe3')][_0x62b6('0x128')]&&(_0x5b1fcd(_0x62b6('0x12e'))[_0x62b6('0x118')](),_0x5b1fcd(_0x62b6('0x12f'))[_0x62b6('0x8a')](_0x62b6('0x130')));for(var _0x88d91b in window['_QuatroDigital_AmountProduct'][_0x62b6('0x3f')]){_0xdbe57d=window['_QuatroDigital_AmountProduct'][_0x62b6('0x3f')][_0x88d91b];if('object'!==typeof _0xdbe57d)return;_0x4d2b04=_0x5b1fcd(_0x62b6('0x131')+_0xdbe57d[_0x62b6('0x12d')]+']')['getParent']('li');if(window[_0x62b6('0xe3')]['allowRecalculate']||!_0x4d2b04[_0x62b6('0x53')]('.qd-bap-wrapper')['length'])_0x53cbbd=_0x5b1fcd(_0x62b6('0x132')),_0x53cbbd[_0x62b6('0x53')](_0x62b6('0x133'))[_0x62b6('0x4e')](_0xdbe57d[_0x62b6('0x3e')]),_0xdbe57d=_0x4d2b04[_0x62b6('0x53')]('.qd_bap_wrapper_content'),_0xdbe57d[_0x62b6('0x7')]?_0xdbe57d[_0x62b6('0xa9')](_0x53cbbd)['addClass'](_0x62b6('0x130')):_0x4d2b04[_0x62b6('0xa9')](_0x53cbbd);}_0x141c50&&(window[_0x62b6('0xe3')][_0x62b6('0x128')]=!0x1);};window['_QuatroDigital_AmountProduct'][_0x62b6('0xe4')]=function(){window['_QuatroDigital_AmountProduct'][_0x62b6('0x128')]=!0x0;_0x4d6b18[_0x62b6('0x26')](this);};_0x5b1fcd(document)[_0x62b6('0x134')](function(){_0x4d6b18['call'](this);});}catch(_0x565c75){_0x62b6('0x3')!==typeof console&&_0x62b6('0x9')===typeof console[_0x62b6('0x1c')]&&console['error'](_0x62b6('0x63'),_0x565c75);}}(this));(function(){try{var _0x235f6b=jQuery,_0x54ce34,_0x14f74a={'selector':_0x62b6('0x135'),'dropDown':{},'buyButton':{}};_0x235f6b['QD_smartCart']=function(_0x1faae7){var _0x3808f8={};_0x54ce34=_0x235f6b['extend'](!0x0,{},_0x14f74a,_0x1faae7);_0x1faae7=_0x235f6b(_0x54ce34[_0x62b6('0x83')])['QD_dropDownCart'](_0x54ce34[_0x62b6('0x136')]);_0x3808f8[_0x62b6('0x7a')]=_0x62b6('0x3')!==typeof _0x54ce34[_0x62b6('0x136')][_0x62b6('0xcd')]&&!0x1===_0x54ce34[_0x62b6('0x136')]['updateOnlyHover']?_0x235f6b(_0x54ce34['selector'])['QD_buyButton'](_0x1faae7['fn'],_0x54ce34[_0x62b6('0x7a')]):_0x235f6b(_0x54ce34['selector'])[_0x62b6('0x73')](_0x54ce34[_0x62b6('0x7a')]);_0x3808f8[_0x62b6('0x136')]=_0x1faae7;return _0x3808f8;};_0x235f6b['fn'][_0x62b6('0x137')]=function(){_0x62b6('0x28')===typeof console&&_0x62b6('0x9')===typeof console[_0x62b6('0x2c')]&&console[_0x62b6('0x2c')](_0x62b6('0x138'));};_0x235f6b['smartCart']=_0x235f6b['fn'][_0x62b6('0x137')];}catch(_0x171ff3){_0x62b6('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x62b6('0x1c')]('Oooops!\x20',_0x171ff3);}}());

/* Quatro Digital - Smart Stock Available */
var _0xc16a=['---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','/produto/sku/','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','sku','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','vtex.sku.selected.QD','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','opts','call','error','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','extend','success','object','complete','clearQueueDelay','jqXHR','undefined','readyState','data','textStatus','version','2.1','QD_smartStockAvailable','Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available','unshift','toLowerCase','aviso','info','apply','warn','length','addClass','qd-ssa-skus-','skus','split','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','message','off','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','hide','removeClass','qd-ssa-sku-no-selected','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','qd-ssa-show','filter','[data-qd-ssa-text=\x22default\x22]','qd-ssa-hide','html','replace','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','trigger','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase'];(function(_0x50334d,_0x5d5d60){var _0xd75b11=function(_0x2f0ec4){while(--_0x2f0ec4){_0x50334d['push'](_0x50334d['shift']());}};_0xd75b11(++_0x5d5d60);}(_0xc16a,0x160));var _0xac16=function(_0xee47bc,_0x16841a){_0xee47bc=_0xee47bc-0x0;var _0xd8fd07=_0xc16a[_0xee47bc];return _0xd8fd07;};(function(_0x17b567){if(_0xac16('0x0')!==typeof _0x17b567[_0xac16('0x1')]){var _0x1d43ab={};_0x17b567[_0xac16('0x2')]=_0x1d43ab;_0x17b567['qdAjax']=function(_0x37b514){var _0x404aa7,_0x445c77;_0x404aa7=_0x17b567['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x37b514);_0x445c77=escape(encodeURIComponent(_0x404aa7['url']));_0x1d43ab[_0x445c77]=_0x1d43ab[_0x445c77]||{};_0x1d43ab[_0x445c77]['opts']=_0x1d43ab[_0x445c77][_0xac16('0x3')]||[];_0x1d43ab[_0x445c77][_0xac16('0x3')]['push']({'success':function(_0x36cd59,_0x2778ec,_0x14d622){_0x404aa7['success'][_0xac16('0x4')](this,_0x36cd59,_0x2778ec,_0x14d622);},'error':function(_0x616faf,_0x4f677c,_0x19155b){_0x404aa7[_0xac16('0x5')]['call'](this,_0x616faf,_0x4f677c,_0x19155b);},'complete':function(_0x66310c,_0x2f23ed){_0x404aa7['complete']['call'](this,_0x66310c,_0x2f23ed);}});_0x1d43ab[_0x445c77][_0xac16('0x6')]=_0x1d43ab[_0x445c77][_0xac16('0x6')]||{'success':{},'error':{},'complete':{}};_0x1d43ab[_0x445c77][_0xac16('0x7')]=_0x1d43ab[_0x445c77][_0xac16('0x7')]||{};_0x1d43ab[_0x445c77]['callbackFns'][_0xac16('0x8')]=_0xac16('0x9')===typeof _0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0x8')]?_0x1d43ab[_0x445c77][_0xac16('0x7')]['successPopulated']:!0x1;_0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0xa')]=_0xac16('0x9')===typeof _0x1d43ab[_0x445c77]['callbackFns'][_0xac16('0xa')]?_0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0xa')]:!0x1;_0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0xb')]='boolean'===typeof _0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0xb')]?_0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0xb')]:!0x1;_0x37b514=_0x17b567[_0xac16('0xc')]({},_0x404aa7,{'success':function(_0x410d75,_0x4cd874,_0x300362){_0x1d43ab[_0x445c77][_0xac16('0x6')][_0xac16('0xd')]={'data':_0x410d75,'textStatus':_0x4cd874,'jqXHR':_0x300362};_0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0x8')]=!0x0;for(var _0x17b567 in _0x1d43ab[_0x445c77][_0xac16('0x3')])_0xac16('0xe')===typeof _0x1d43ab[_0x445c77][_0xac16('0x3')][_0x17b567]&&(_0x1d43ab[_0x445c77]['opts'][_0x17b567][_0xac16('0xd')][_0xac16('0x4')](this,_0x410d75,_0x4cd874,_0x300362),_0x1d43ab[_0x445c77][_0xac16('0x3')][_0x17b567][_0xac16('0xd')]=function(){});},'error':function(_0x34e33d,_0x14ece6,_0x295f89){_0x1d43ab[_0x445c77][_0xac16('0x6')]['error']={'errorThrown':_0x295f89,'textStatus':_0x14ece6,'jqXHR':_0x34e33d};_0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0xa')]=!0x0;for(var _0x37b514 in _0x1d43ab[_0x445c77][_0xac16('0x3')])_0xac16('0xe')===typeof _0x1d43ab[_0x445c77]['opts'][_0x37b514]&&(_0x1d43ab[_0x445c77][_0xac16('0x3')][_0x37b514]['error'][_0xac16('0x4')](this,_0x34e33d,_0x14ece6,_0x295f89),_0x1d43ab[_0x445c77]['opts'][_0x37b514][_0xac16('0x5')]=function(){});},'complete':function(_0x10670d,_0x3a701e){_0x1d43ab[_0x445c77][_0xac16('0x6')]['complete']={'textStatus':_0x3a701e,'jqXHR':_0x10670d};_0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0xb')]=!0x0;for(var _0x52d880 in _0x1d43ab[_0x445c77][_0xac16('0x3')])'object'===typeof _0x1d43ab[_0x445c77][_0xac16('0x3')][_0x52d880]&&(_0x1d43ab[_0x445c77][_0xac16('0x3')][_0x52d880][_0xac16('0xf')][_0xac16('0x4')](this,_0x10670d,_0x3a701e),_0x1d43ab[_0x445c77][_0xac16('0x3')][_0x52d880]['complete']=function(){});isNaN(parseInt(_0x404aa7[_0xac16('0x10')]))||setTimeout(function(){_0x1d43ab[_0x445c77][_0xac16('0x11')]=void 0x0;_0x1d43ab[_0x445c77][_0xac16('0x3')]=void 0x0;_0x1d43ab[_0x445c77][_0xac16('0x6')]=void 0x0;_0x1d43ab[_0x445c77][_0xac16('0x7')]=void 0x0;},_0x404aa7[_0xac16('0x10')]);}});_0xac16('0x12')===typeof _0x1d43ab[_0x445c77][_0xac16('0x11')]?_0x1d43ab[_0x445c77]['jqXHR']=_0x17b567['ajax'](_0x37b514):_0x1d43ab[_0x445c77][_0xac16('0x11')]&&_0x1d43ab[_0x445c77]['jqXHR']['readyState']&&0x4==_0x1d43ab[_0x445c77][_0xac16('0x11')][_0xac16('0x13')]&&(_0x1d43ab[_0x445c77][_0xac16('0x7')][_0xac16('0x8')]&&_0x37b514[_0xac16('0xd')](_0x1d43ab[_0x445c77]['parameters']['success'][_0xac16('0x14')],_0x1d43ab[_0x445c77][_0xac16('0x6')][_0xac16('0xd')][_0xac16('0x15')],_0x1d43ab[_0x445c77]['parameters'][_0xac16('0xd')]['jqXHR']),_0x1d43ab[_0x445c77]['callbackFns'][_0xac16('0xa')]&&_0x37b514[_0xac16('0x5')](_0x1d43ab[_0x445c77][_0xac16('0x6')][_0xac16('0x5')][_0xac16('0x11')],_0x1d43ab[_0x445c77][_0xac16('0x6')][_0xac16('0x5')][_0xac16('0x15')],_0x1d43ab[_0x445c77]['parameters'][_0xac16('0x5')]['errorThrown']),_0x1d43ab[_0x445c77]['callbackFns']['completePopulated']&&_0x37b514[_0xac16('0xf')](_0x1d43ab[_0x445c77][_0xac16('0x6')][_0xac16('0xf')]['jqXHR'],_0x1d43ab[_0x445c77][_0xac16('0x6')]['complete']['textStatus']));};_0x17b567[_0xac16('0x1')][_0xac16('0x16')]=_0xac16('0x17');}}(jQuery));(function(_0x3eef35){'use strict';var _0x5f220d=jQuery;if(typeof _0x5f220d['fn'][_0xac16('0x18')]===_0xac16('0x0'))return;var _0x41baaa=_0xac16('0x19');var _0x49f279=function(_0xf3f17b,_0x70bfcc){if('object'===typeof console){var _0x388cb9;_0xac16('0xe')===typeof _0xf3f17b?(_0xf3f17b[_0xac16('0x1a')]('['+_0x41baaa+']\x0a'),_0x388cb9=_0xf3f17b):_0x388cb9=['['+_0x41baaa+']\x0a'+_0xf3f17b];'undefined'===typeof _0x70bfcc||'alerta'!==_0x70bfcc[_0xac16('0x1b')]()&&_0xac16('0x1c')!==_0x70bfcc[_0xac16('0x1b')]()?'undefined'!==typeof _0x70bfcc&&_0xac16('0x1d')===_0x70bfcc[_0xac16('0x1b')]()?console[_0xac16('0x1d')][_0xac16('0x1e')](console,_0x388cb9):console[_0xac16('0x5')]['apply'](console,_0x388cb9):console[_0xac16('0x1f')][_0xac16('0x1e')](console,_0x388cb9);}};var _0x3156eb={};var _0x357e5a=function(_0x3edc6e,_0x14d2a6){if(!_0x3edc6e[_0xac16('0x20')])return;_0x3edc6e[_0xac16('0x21')]('qd-ssa-on');_0x3edc6e[_0xac16('0x21')]('qd-ssa-sku-no-selected');try{_0x3edc6e[_0xac16('0x21')](_0xac16('0x22')+vtxctx[_0xac16('0x23')][_0xac16('0x24')](';')[_0xac16('0x20')]);}catch(_0x14926e){_0x49f279(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x14926e['message']]);}_0x5f220d(window)['on'](_0xac16('0x25'),function(_0x3f6e64,_0x36a05f,_0x15dc7b){try{_0x441f0c(_0x15dc7b['sku'],function(_0x541e6b){_0x438174(_0x541e6b);_0x243be8(_0x541e6b);});}catch(_0x2d5f96){_0x49f279([_0xac16('0x26'),_0x2d5f96[_0xac16('0x27')]]);}});_0x5f220d(window)[_0xac16('0x28')]('vtex.sku.selected.QD');_0x5f220d(window)['on'](_0xac16('0x29'),function(){_0x3edc6e[_0xac16('0x21')](_0xac16('0x2a'))[_0xac16('0x2b')]();});function _0x438174(_0x45551e){try{_0x3edc6e[_0xac16('0x2c')](_0xac16('0x2d'))[_0xac16('0x21')](_0xac16('0x2e'));var _0x5dda0c=_0x45551e[0x0][_0xac16('0x2f')][0x0][_0xac16('0x30')];_0x3edc6e[_0xac16('0x31')](_0xac16('0x32'),_0x5dda0c);_0x3edc6e[_0xac16('0x33')](function(){var _0x4c0afe=_0x5f220d(this)[_0xac16('0x34')](_0xac16('0x35'));if(_0x5dda0c<0x1)return _0x4c0afe['hide']()[_0xac16('0x21')]('qd-ssa-hide')[_0xac16('0x2c')](_0xac16('0x36'));var _0xc442b4=_0x4c0afe[_0xac16('0x37')]('[data-qd-ssa-text=\x22'+_0x5dda0c+'\x22]');var _0x2b2f9d=_0xc442b4[_0xac16('0x20')]?_0xc442b4:_0x4c0afe[_0xac16('0x37')](_0xac16('0x38'));_0x4c0afe[_0xac16('0x2b')]()[_0xac16('0x21')](_0xac16('0x39'))[_0xac16('0x2c')]('qd-ssa-show');_0x2b2f9d['html'](_0x2b2f9d[_0xac16('0x3a')]()[_0xac16('0x3b')]('#qtt',_0x5dda0c));_0x2b2f9d[_0xac16('0x3c')]()[_0xac16('0x21')](_0xac16('0x36'))[_0xac16('0x2c')]('qd-ssa-hide');});}catch(_0x2868e0){_0x49f279([_0xac16('0x3d'),_0x2868e0[_0xac16('0x27')]]);}};function _0x243be8(_0x1f8d41){if(vtxctx['skus'][_0xac16('0x24')](';')[_0xac16('0x20')]===0x1&&_0x1f8d41[0x0][_0xac16('0x2f')][0x0][_0xac16('0x30')]==0x0)_0x5f220d(window)[_0xac16('0x3e')](_0xac16('0x29'));};};var _0x27be4f=function(_0x201265){var _0x57cc53={'i':_0xac16('0x3f')};return function(_0x3064f1){var _0x2eb392,_0x39ccae,_0x3b8d80,_0x5aaf7d;_0x39ccae=function(_0x34774d){return _0x34774d;};_0x3b8d80=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3064f1=_0x3064f1['d'+_0x3b8d80[0x10]+'c'+_0x3b8d80[0x11]+'m'+_0x39ccae(_0x3b8d80[0x1])+'n'+_0x3b8d80[0xd]]['l'+_0x3b8d80[0x12]+'c'+_0x3b8d80[0x0]+'ti'+_0x39ccae('o')+'n'];_0x2eb392=function(_0x1ce11e){return escape(encodeURIComponent(_0x1ce11e[_0xac16('0x3b')](/\./g,'¨')[_0xac16('0x3b')](/[a-zA-Z]/g,function(_0xee14d5){return String[_0xac16('0x40')](('Z'>=_0xee14d5?0x5a:0x7a)>=(_0xee14d5=_0xee14d5[_0xac16('0x41')](0x0)+0xd)?_0xee14d5:_0xee14d5-0x1a);})));};var _0x48bf79=_0x2eb392(_0x3064f1[[_0x3b8d80[0x9],_0x39ccae('o'),_0x3b8d80[0xc],_0x3b8d80[_0x39ccae(0xd)]][_0xac16('0x42')]('')]);_0x2eb392=_0x2eb392((window[['js',_0x39ccae('no'),'m',_0x3b8d80[0x1],_0x3b8d80[0x4][_0xac16('0x43')](),'ite'][_0xac16('0x42')]('')]||_0xac16('0x44'))+['.v',_0x3b8d80[0xd],'e',_0x39ccae('x'),'co',_0x39ccae('mm'),_0xac16('0x45'),_0x3b8d80[0x1],'.c',_0x39ccae('o'),'m.',_0x3b8d80[0x13],'r']['join'](''));for(var _0xf44d93 in _0x57cc53){if(_0x2eb392===_0xf44d93+_0x57cc53[_0xf44d93]||_0x48bf79===_0xf44d93+_0x57cc53[_0xf44d93]){_0x5aaf7d='tr'+_0x3b8d80[0x11]+'e';break;}_0x5aaf7d='f'+_0x3b8d80[0x0]+'ls'+_0x39ccae(_0x3b8d80[0x1])+'';}_0x39ccae=!0x1;-0x1<_0x3064f1[[_0x3b8d80[0xc],'e',_0x3b8d80[0x0],'rc',_0x3b8d80[0x9]][_0xac16('0x42')]('')]['indexOf'](_0xac16('0x46'))&&(_0x39ccae=!0x0);return[_0x5aaf7d,_0x39ccae];}(_0x201265);}(window);if(!eval(_0x27be4f[0x0]))return _0x27be4f[0x1]?_0x49f279(_0xac16('0x47')):!0x1;function _0x441f0c(_0x1a8d42,_0x24d16a){_0x5f220d[_0xac16('0x1')]({'url':_0xac16('0x48')+_0x1a8d42,'clearQueueDelay':null,'success':_0x24d16a,'error':function(){_0x49f279('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});};_0x5f220d['fn']['QD_smartStockAvailable']=function(_0x4e5fc0){var _0x30bad6=_0x5f220d(this);var _0x4db2bb=_0x5f220d[_0xac16('0xc')](!![],{},_0x3156eb,_0x4e5fc0);_0x30bad6[_0xac16('0x49')]=new _0x357e5a(_0x30bad6,_0x4db2bb);try{if(typeof _0x5f220d['fn'][_0xac16('0x18')][_0xac16('0x4a')]===_0xac16('0xe'))_0x5f220d(window)[_0xac16('0x3e')](_0xac16('0x4b'),[_0x5f220d['fn'][_0xac16('0x18')][_0xac16('0x4a')]['prod'],_0x5f220d['fn']['QD_smartStockAvailable'][_0xac16('0x4a')][_0xac16('0x4c')]]);}catch(_0x2834ce){_0x49f279([_0xac16('0x4d'),_0x2834ce['message']]);}if(_0x5f220d['fn']['QD_smartStockAvailable'][_0xac16('0x4e')])_0x5f220d(window)[_0xac16('0x3e')]('QuatroDigital.ssa.prodUnavailable');return _0x30bad6;};_0x5f220d(window)['on'](_0xac16('0x4f'),function(_0x1d2001,_0x596e15,_0x64e558){try{_0x5f220d['fn'][_0xac16('0x18')][_0xac16('0x4a')]={'prod':_0x596e15,'sku':_0x64e558};_0x5f220d(this)[_0xac16('0x28')](_0x1d2001);}catch(_0x5ad197){_0x49f279([_0xac16('0x50'),_0x5ad197[_0xac16('0x27')]]);}});_0x5f220d(window)['on'](_0xac16('0x51'),function(_0x655811,_0x5ecd79,_0xc03708){try{var _0x253327=_0xc03708['length'];var _0x484d32=0x0;for(var _0xe548c8=0x0;_0xe548c8<_0x253327;_0xe548c8++){if(!_0xc03708[_0xe548c8][_0xac16('0x52')])_0x484d32=_0x484d32+0x1;else break;}if(_0x253327<=_0x484d32)_0x5f220d['fn']['QD_smartStockAvailable']['unavailable']=!![];_0x5f220d(this)[_0xac16('0x28')](_0x655811);}catch(_0x5636ec){_0x49f279(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x5636ec[_0xac16('0x27')]]);}});_0x5f220d(function(){_0x5f220d(_0xac16('0x53'))['QD_smartStockAvailable']();});}(window));

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