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
				if (emptyH.length > 0 && emptyH.text().trim() == "")
					$(this).hide();
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
			Product.applySKUListBodyClass(); // Chamar antes do Product.productSkuMerge();
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
			Product.tooltipActivate();
			Product.productSkuMerge();
			Product.applyBuyButton(); // chamar após Product.productSkuMerge
			Product.applySmartQuantity(); // chamar após Product.doublePrice e Product.productSkuMerge
		},
		ajaxStop: function () { },
		windowOnload: function () { },
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
		},
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 30;
			var elem = $(".product-floating-bar-buy");

			//Verifica se existe o botão "Comprar" na barra
			if(!elem.find('.buy-button').length) 
				return;

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
		productSkuMerge: function() {
			try {
				if (!skuJson.skus[0].dimensions['Código RGB'])
					return;

				// Ajustando bodyClass e escondendo SKU em lista
				$('.product-qd-v1-sku-selection').hide();

				var wrapper = $('<div class="product-qd-v1-sku-merge"></div>').insertAfter('.product-qd-v1-sku-selection-color-similiar');
				var priceWrapper = $('.product-qd-v1-price-wrapper');
				var unavailableWrapper = $('.product-qd-v1-price-unavailable');

				$('<h5>Selecione a variação desejada: </h5>').appendTo(wrapper);
				var wrapperColors = $('<ul></ul>').appendTo(wrapper);
				var loading = $('<div style="clear: both" class="loading"></div>').hide().appendTo(wrapper);

				var item;
				function renderBubble(pData) {
					for (var i = 0; i < pData.skus.length; i++) {
						item = $('<a href="#" title="' + (pData.skus[i].dimensions['Cor'] || '---') + '" data-qd-sku="' + pData.skus[i].sku + '"></a>').hide().appendTo(wrapperColors).wrap('<li></li>');
						item.tooltip();
						item.css('background-color', pData.skus[i].dimensions['Código RGB'] || '---');
						bubbleClick(item, pData.skus[i]);
						
						// Indisponível
						if (!pData.skus[i].available){
							item.addClass('color-unavailable').after('<span style="display:none">indisponível</span>');
							$('<div style="display:none" class="portal-notify-me-ref qd-nm-sku-id-' + pData.skus[i].sku + '"></div>').prependTo(unavailableWrapper.find('.product-qd-v1-buy-button')).notifyMe(null, {sku: pData.skus[i].sku});
						}
					}
				}

				// Renderizando as bolhas
				renderBubble(skuJson);

				// Clique no link
				function bubbleClick(btn, skuData) {
					btn.click(function (e) {
						e.preventDefault();
						$(window).trigger('skuSelected.vtex', [skuJson.productId, skuData]);

						unavailableWrapper.find('.portal-notify-me-ref').hide();
						unavailableWrapper.find('.qd-nm-sku-id-' + skuData.sku).show();
					});
				};

				// Classe de selecionado
				$(window).on('skuSelected.vtex', function (e, pId, skuData) {
					wrapperColors.find('a').removeClass('color-selected').filter('[data-qd-sku=' + skuData.sku + ']').addClass('color-selected');
				});

				// Animando as bolhas
				function showbubble() {
					var elem = wrapperColors.find('a').not(':visible').first();
					if (elem.length)
						elem.add(elem.next('span')).slideDown('fast', showbubble);
				};
				showbubble();

				// Ativando o plugin de preço
				if (!priceWrapper.find('.plugin-preco').length)
					$('<div class="qd-psm-price-wrapper"></div>').prependTo(priceWrapper.find('.product-qd-v1-price')).price(skuJson.productId);
				// Ativando o plugin do botão comprar
				if (!priceWrapper.find('.buy-button-ref').length)
					$("<a class='buy-button buy-button-ref'>Comprar</a>").prependTo(priceWrapper.find('.product-qd-v1-buy-button')).buyButton(skuJson.productId, { salesChannel: jssalesChannel }, {});

				// Disponível e Indisponível
				$(window).on('skuSelected.vtex', function (e, pId, skuData) {
					if (skuData.available) {
						priceWrapper.stop(true, true).slideDown();
						unavailableWrapper.stop(true, true).slideUp();
					}
					else {
						priceWrapper.stop(true, true).slideUp();
						unavailableWrapper.stop(true, true).slideDown();
					}
				});

				// Informa qual cor o usuário selecionou
				var selectedColorWrapper = $('<div class="qd-psm-selected-color"></div>').insertBefore(priceWrapper.find('.product-qd-v1-price'));
				$(window).on('skuSelected.vtex', function (e, pId, skuData) {
					if (!skuData.dimensions['Código RGB']){
						selectedColorWrapper.empty();
						return;
					}

					selectedColorWrapper.html('<span>Cor selecionada</span>');

					var tr = $('<tr></tr>');
					$('<a style="background: ' + skuData.dimensions['Código RGB'] + '" href="#" title="' + skuData.dimensions['Cor'] + '"></a>').appendTo(tr).wrap('<td></td>').tooltip();
					tr.append('<td>' + skuData.dimensions['Cor'] + '</td>');
					tr.prependTo(selectedColorWrapper);
					tr.wrap('<table></table>');
				});
			}
			catch (e) { (typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: ", e)); }
		},
		applyBuyButton: function() {
			$(".qd_cart_auto").QD_buyButton({
				buyButton: ".product-qd-v1-buy-button .buy-button"
			});
			$(".qd_cart_auto").QD_buyButton({
				buyButton: ".skuList .buy-button"
			});
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
var _0x5687=['.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','trim','getParent','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','url','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','qd-am-elem-','first','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-dropdown','children','qd-am-level-','add','qd-am-','-li','callback','call','extend','.qd_amazing_menu_auto','closest','/qd-amazing-menu','object','undefined','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','error','qdAmAddNdx','addClass','qd-am-li-','QD_amazingMenu','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','each','img[alt=\x27','attr'];(function(_0x132e12,_0x1c0513){var _0xe79c4a=function(_0x51fd69){while(--_0x51fd69){_0x132e12['push'](_0x132e12['shift']());}};_0xe79c4a(++_0x1c0513);}(_0x5687,0xf5));var _0x7568=function(_0x425ef2,_0x5d8920){_0x425ef2=_0x425ef2-0x0;var _0x35ec2c=_0x5687[_0x425ef2];return _0x35ec2c;};(function(_0x2e5a93){_0x2e5a93['fn']['getParent']=_0x2e5a93['fn'][_0x7568('0x0')];}(jQuery));(function(_0x561339){var _0x1b6ccc;var _0x3521ce=jQuery;if('function'!==typeof _0x3521ce['fn']['QD_amazingMenu']){var _0x52d2b9={'url':_0x7568('0x1'),'callback':function(){},'ajaxCallback':function(){}};var _0x1ee1fd=function(_0x2cd045,_0xe2de43){if(_0x7568('0x2')===typeof console&&'undefined'!==typeof console['error']&&_0x7568('0x3')!==typeof console[_0x7568('0x4')]&&_0x7568('0x3')!==typeof console[_0x7568('0x5')]){var _0x44f7cc;_0x7568('0x2')===typeof _0x2cd045?(_0x2cd045[_0x7568('0x6')](_0x7568('0x7')),_0x44f7cc=_0x2cd045):_0x44f7cc=[_0x7568('0x7')+_0x2cd045];if(_0x7568('0x3')===typeof _0xe2de43||_0x7568('0x8')!==_0xe2de43[_0x7568('0x9')]()&&_0x7568('0xa')!==_0xe2de43['toLowerCase']())if('undefined'!==typeof _0xe2de43&&_0x7568('0x4')===_0xe2de43[_0x7568('0x9')]())try{console[_0x7568('0x4')][_0x7568('0xb')](console,_0x44f7cc);}catch(_0x369350){try{console[_0x7568('0x4')](_0x44f7cc[_0x7568('0xc')]('\x0a'));}catch(_0x2f8bd4){}}else try{console[_0x7568('0xd')]['apply'](console,_0x44f7cc);}catch(_0x278b49){try{console[_0x7568('0xd')](_0x44f7cc['join']('\x0a'));}catch(_0x2284e7){}}else try{console['warn'][_0x7568('0xb')](console,_0x44f7cc);}catch(_0x534006){try{console[_0x7568('0x5')](_0x44f7cc[_0x7568('0xc')]('\x0a'));}catch(_0x3a2ba5){}}}};_0x3521ce['fn'][_0x7568('0xe')]=function(){var _0x5b6450=_0x3521ce(this);_0x5b6450['each'](function(_0x543ef1){_0x3521ce(this)[_0x7568('0xf')](_0x7568('0x10')+_0x543ef1);});_0x5b6450['first']()[_0x7568('0xf')]('qd-am-first');_0x5b6450['last']()[_0x7568('0xf')]('qd-am-last');return _0x5b6450;};_0x3521ce['fn'][_0x7568('0x11')]=function(){};_0x561339=function(_0x3330a2){var _0x2cf1f2={'i':_0x7568('0x12')};return function(_0x27d288){var _0x213be3=function(_0x519e25){return _0x519e25;};var _0x43e3f0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x27d288=_0x27d288['d'+_0x43e3f0[0x10]+'c'+_0x43e3f0[0x11]+'m'+_0x213be3(_0x43e3f0[0x1])+'n'+_0x43e3f0[0xd]]['l'+_0x43e3f0[0x12]+'c'+_0x43e3f0[0x0]+'ti'+_0x213be3('o')+'n'];var _0xfc637b=function(_0x267571){return escape(encodeURIComponent(_0x267571[_0x7568('0x13')](/\./g,'¨')[_0x7568('0x13')](/[a-zA-Z]/g,function(_0x49cc7a){return String['fromCharCode'](('Z'>=_0x49cc7a?0x5a:0x7a)>=(_0x49cc7a=_0x49cc7a['charCodeAt'](0x0)+0xd)?_0x49cc7a:_0x49cc7a-0x1a);})));};var _0x169b25=_0xfc637b(_0x27d288[[_0x43e3f0[0x9],_0x213be3('o'),_0x43e3f0[0xc],_0x43e3f0[_0x213be3(0xd)]]['join']('')]);_0xfc637b=_0xfc637b((window[['js',_0x213be3('no'),'m',_0x43e3f0[0x1],_0x43e3f0[0x4][_0x7568('0x14')](),_0x7568('0x15')][_0x7568('0xc')]('')]||_0x7568('0x16'))+['.v',_0x43e3f0[0xd],'e',_0x213be3('x'),'co',_0x213be3('mm'),_0x7568('0x17'),_0x43e3f0[0x1],'.c',_0x213be3('o'),'m.',_0x43e3f0[0x13],'r'][_0x7568('0xc')](''));for(var _0x2a7136 in _0x2cf1f2){if(_0xfc637b===_0x2a7136+_0x2cf1f2[_0x2a7136]||_0x169b25===_0x2a7136+_0x2cf1f2[_0x2a7136]){var _0x372092='tr'+_0x43e3f0[0x11]+'e';break;}_0x372092='f'+_0x43e3f0[0x0]+'ls'+_0x213be3(_0x43e3f0[0x1])+'';}_0x213be3=!0x1;-0x1<_0x27d288[[_0x43e3f0[0xc],'e',_0x43e3f0[0x0],'rc',_0x43e3f0[0x9]][_0x7568('0xc')]('')]['indexOf'](_0x7568('0x18'))&&(_0x213be3=!0x0);return[_0x372092,_0x213be3];}(_0x3330a2);}(window);if(!eval(_0x561339[0x0]))return _0x561339[0x1]?_0x1ee1fd(_0x7568('0x19')):!0x1;var _0x4b7ead=function(_0x2801c3){var _0x3fb546=_0x2801c3[_0x7568('0x1a')](_0x7568('0x1b'));var _0x1b9387=_0x3fb546[_0x7568('0x1c')](_0x7568('0x1d'));var _0x3140da=_0x3fb546[_0x7568('0x1c')](_0x7568('0x1e'));if(_0x1b9387[_0x7568('0x1f')]||_0x3140da[_0x7568('0x1f')])_0x1b9387[_0x7568('0x20')]()[_0x7568('0xf')](_0x7568('0x21')),_0x3140da[_0x7568('0x20')]()[_0x7568('0xf')](_0x7568('0x22')),_0x3521ce[_0x7568('0x23')]({'url':_0x1b6ccc['url'],'dataType':'html','success':function(_0x58847d){var _0x5b09d2=_0x3521ce(_0x58847d);_0x1b9387[_0x7568('0x24')](function(){var _0x58847d=_0x3521ce(this);var _0x11cbad=_0x5b09d2[_0x7568('0x1a')](_0x7568('0x25')+_0x58847d[_0x7568('0x26')]('data-qdam-value')+'\x27]');_0x11cbad['length']&&(_0x11cbad[_0x7568('0x24')](function(){_0x3521ce(this)['getParent'](_0x7568('0x27'))[_0x7568('0x28')]()[_0x7568('0x29')](_0x58847d);}),_0x58847d[_0x7568('0x2a')]());})['addClass'](_0x7568('0x2b'));_0x3140da[_0x7568('0x24')](function(){var _0x58847d={};var _0x4d7623=_0x3521ce(this);_0x5b09d2['find']('h2')['each'](function(){if(_0x3521ce(this)[_0x7568('0x2c')]()[_0x7568('0x2d')]()[_0x7568('0x9')]()==_0x4d7623['attr']('data-qdam-value')['trim']()[_0x7568('0x9')]())return _0x58847d=_0x3521ce(this),!0x1;});_0x58847d[_0x7568('0x1f')]&&(_0x58847d[_0x7568('0x24')](function(){_0x3521ce(this)[_0x7568('0x2e')](_0x7568('0x2f'))[_0x7568('0x28')]()[_0x7568('0x29')](_0x4d7623);}),_0x4d7623[_0x7568('0x2a')]());})[_0x7568('0xf')](_0x7568('0x2b'));},'error':function(){_0x1ee1fd(_0x7568('0x30')+_0x1b6ccc[_0x7568('0x31')]+'\x27\x20falho.');},'complete':function(){_0x1b6ccc[_0x7568('0x32')]['call'](this);_0x3521ce(window)[_0x7568('0x33')](_0x7568('0x34'),_0x2801c3);},'clearQueueDelay':0xbb8});};_0x3521ce[_0x7568('0x11')]=function(_0x3dace5){var _0x3e1ab9=_0x3dace5[_0x7568('0x1a')]('ul[itemscope]')[_0x7568('0x24')](function(){var _0x46f72e=_0x3521ce(this);if(!_0x46f72e['length'])return _0x1ee1fd([_0x7568('0x35'),_0x3dace5],'alerta');_0x46f72e['find']('li\x20>ul')[_0x7568('0x20')]()[_0x7568('0xf')](_0x7568('0x36'));_0x46f72e[_0x7568('0x1a')]('li')[_0x7568('0x24')](function(){var _0x395633=_0x3521ce(this);var _0x2016b4=_0x395633['children'](':not(ul)');_0x2016b4[_0x7568('0x1f')]&&_0x395633['addClass'](_0x7568('0x37')+_0x2016b4[_0x7568('0x38')]()['text']()[_0x7568('0x2d')]()[_0x7568('0x39')]()[_0x7568('0x13')](/\./g,'')[_0x7568('0x13')](/\s/g,'-')['toLowerCase']());});var _0x322a1e=_0x46f72e[_0x7568('0x1a')](_0x7568('0x3a'))[_0x7568('0xe')]();_0x46f72e[_0x7568('0xf')](_0x7568('0x3b'));_0x322a1e=_0x322a1e[_0x7568('0x1a')](_0x7568('0x3c'));_0x322a1e['each'](function(){var _0x4f5579=_0x3521ce(this);_0x4f5579[_0x7568('0x1a')](_0x7568('0x3a'))[_0x7568('0xe')]()['addClass']('qd-am-column');_0x4f5579['addClass']('qd-am-dropdown-menu');_0x4f5579[_0x7568('0x20')]()[_0x7568('0xf')](_0x7568('0x3d'));});_0x322a1e[_0x7568('0xf')](_0x7568('0x3d'));var _0x2ef283=0x0,_0x561339=function(_0x1b69d3){_0x2ef283+=0x1;_0x1b69d3=_0x1b69d3[_0x7568('0x3e')]('li')[_0x7568('0x3e')]('*');_0x1b69d3['length']&&(_0x1b69d3[_0x7568('0xf')](_0x7568('0x3f')+_0x2ef283),_0x561339(_0x1b69d3));};_0x561339(_0x46f72e);_0x46f72e[_0x7568('0x40')](_0x46f72e[_0x7568('0x1a')]('ul'))[_0x7568('0x24')](function(){var _0x4efc5a=_0x3521ce(this);_0x4efc5a[_0x7568('0xf')](_0x7568('0x41')+_0x4efc5a[_0x7568('0x3e')]('li')[_0x7568('0x1f')]+_0x7568('0x42'));});});_0x4b7ead(_0x3e1ab9);_0x1b6ccc[_0x7568('0x43')][_0x7568('0x44')](this);_0x3521ce(window)['trigger']('QuatroDigital.am.callback',_0x3dace5);};_0x3521ce['fn'][_0x7568('0x11')]=function(_0xac9246){var _0x4b7b27=_0x3521ce(this);if(!_0x4b7b27[_0x7568('0x1f')])return _0x4b7b27;_0x1b6ccc=_0x3521ce[_0x7568('0x45')]({},_0x52d2b9,_0xac9246);_0x4b7b27['exec']=new _0x3521ce['QD_amazingMenu'](_0x3521ce(this));return _0x4b7b27;};_0x3521ce(function(){_0x3521ce(_0x7568('0x46'))['QD_amazingMenu']();});}}(this));

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
var _0x6350=['qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','body','find','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','clone','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','call','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','each','productCategoryIds','attr','qd-ddc-','availability','.qd-ddc-prodName','append','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','val','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','.qd-ddc-quantity','keyup.qd_ddc_change','slideUp','remove','qdDdcLastPostalCode','BRA','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','quantity','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','data-sku-index','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','totalizers','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','stop','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','.qdDdcContainer','QD_smartCart','extend','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','replace','abs','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','function','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','name','smartCheckout','vtexjs','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass'];(function(_0x491faa,_0x4f2907){var _0x414440=function(_0x310864){while(--_0x310864){_0x491faa['push'](_0x491faa['shift']());}};_0x414440(++_0x4f2907);}(_0x6350,0xa2));var _0x0635=function(_0x583496,_0x5ab617){_0x583496=_0x583496-0x0;var _0x3dc74f=_0x6350[_0x583496];return _0x3dc74f;};(function(_0x476d57){_0x476d57['fn']['getParent']=_0x476d57['fn']['closest'];}(jQuery));function qd_number_format(_0x2da4b4,_0x2dcb2d,_0x30ab62,_0x4fc32f){_0x2da4b4=(_0x2da4b4+'')[_0x0635('0x0')](/[^0-9+\-Ee.]/g,'');_0x2da4b4=isFinite(+_0x2da4b4)?+_0x2da4b4:0x0;_0x2dcb2d=isFinite(+_0x2dcb2d)?Math[_0x0635('0x1')](_0x2dcb2d):0x0;_0x4fc32f=_0x0635('0x2')===typeof _0x4fc32f?',':_0x4fc32f;_0x30ab62=_0x0635('0x2')===typeof _0x30ab62?'.':_0x30ab62;var _0x6f268c='',_0x6f268c=function(_0x43146b,_0x159afb){var _0x2dcb2d=Math[_0x0635('0x3')](0xa,_0x159afb);return''+(Math[_0x0635('0x4')](_0x43146b*_0x2dcb2d)/_0x2dcb2d)[_0x0635('0x5')](_0x159afb);},_0x6f268c=(_0x2dcb2d?_0x6f268c(_0x2da4b4,_0x2dcb2d):''+Math[_0x0635('0x4')](_0x2da4b4))[_0x0635('0x6')]('.');0x3<_0x6f268c[0x0][_0x0635('0x7')]&&(_0x6f268c[0x0]=_0x6f268c[0x0][_0x0635('0x0')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4fc32f));(_0x6f268c[0x1]||'')[_0x0635('0x7')]<_0x2dcb2d&&(_0x6f268c[0x1]=_0x6f268c[0x1]||'',_0x6f268c[0x1]+=Array(_0x2dcb2d-_0x6f268c[0x1][_0x0635('0x7')]+0x1)[_0x0635('0x8')]('0'));return _0x6f268c[_0x0635('0x8')](_0x30ab62);};(function(){try{window[_0x0635('0x9')]=window['_QuatroDigital_CartData']||{},window[_0x0635('0x9')][_0x0635('0xa')]=window['_QuatroDigital_CartData'][_0x0635('0xa')]||$['Callbacks']();}catch(_0x26835){'undefined'!==typeof console&&_0x0635('0xb')===typeof console[_0x0635('0xc')]&&console[_0x0635('0xc')](_0x0635('0xd'),_0x26835[_0x0635('0xe')]);}}());(function(_0x16c07f){try{var _0x7e0084=jQuery,_0x5a5148=function(_0x3a1623,_0x56f95a){if(_0x0635('0xf')===typeof console&&'undefined'!==typeof console[_0x0635('0xc')]&&_0x0635('0x2')!==typeof console[_0x0635('0x10')]&&_0x0635('0x2')!==typeof console[_0x0635('0x11')]){var _0x5e3083;_0x0635('0xf')===typeof _0x3a1623?(_0x3a1623[_0x0635('0x12')](_0x0635('0x13')),_0x5e3083=_0x3a1623):_0x5e3083=[_0x0635('0x13')+_0x3a1623];if(_0x0635('0x2')===typeof _0x56f95a||'alerta'!==_0x56f95a[_0x0635('0x14')]()&&_0x0635('0x15')!==_0x56f95a[_0x0635('0x14')]())if(_0x0635('0x2')!==typeof _0x56f95a&&'info'===_0x56f95a[_0x0635('0x14')]())try{console[_0x0635('0x10')]['apply'](console,_0x5e3083);}catch(_0x1787e1){try{console[_0x0635('0x10')](_0x5e3083[_0x0635('0x8')]('\x0a'));}catch(_0x2f7fc8){}}else try{console[_0x0635('0xc')][_0x0635('0x16')](console,_0x5e3083);}catch(_0x4432f9){try{console[_0x0635('0xc')](_0x5e3083[_0x0635('0x8')]('\x0a'));}catch(_0x2e0eb0){}}else try{console['warn']['apply'](console,_0x5e3083);}catch(_0x29ce27){try{console[_0x0635('0x11')](_0x5e3083['join']('\x0a'));}catch(_0xfa8b52){}}}};window[_0x0635('0x17')]=window[_0x0635('0x17')]||{};window['_QuatroDigital_DropDown'][_0x0635('0x18')]=!0x0;_0x7e0084['QD_dropDownCart']=function(){};_0x7e0084['fn'][_0x0635('0x19')]=function(){return{'fn':new _0x7e0084()};};var _0x39e0f6=function(_0x2421f3){var _0x1d4d69={'i':_0x0635('0x1a')};return function(_0x22361c){var _0x36c4ec=function(_0x73b2d1){return _0x73b2d1;};var _0x316ab5=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x22361c=_0x22361c['d'+_0x316ab5[0x10]+'c'+_0x316ab5[0x11]+'m'+_0x36c4ec(_0x316ab5[0x1])+'n'+_0x316ab5[0xd]]['l'+_0x316ab5[0x12]+'c'+_0x316ab5[0x0]+'ti'+_0x36c4ec('o')+'n'];var _0x1acb98=function(_0x163f77){return escape(encodeURIComponent(_0x163f77[_0x0635('0x0')](/\./g,'¨')[_0x0635('0x0')](/[a-zA-Z]/g,function(_0x495d66){return String[_0x0635('0x1b')](('Z'>=_0x495d66?0x5a:0x7a)>=(_0x495d66=_0x495d66[_0x0635('0x1c')](0x0)+0xd)?_0x495d66:_0x495d66-0x1a);})));};var _0x722362=_0x1acb98(_0x22361c[[_0x316ab5[0x9],_0x36c4ec('o'),_0x316ab5[0xc],_0x316ab5[_0x36c4ec(0xd)]][_0x0635('0x8')]('')]);_0x1acb98=_0x1acb98((window[['js',_0x36c4ec('no'),'m',_0x316ab5[0x1],_0x316ab5[0x4][_0x0635('0x1d')](),_0x0635('0x1e')][_0x0635('0x8')]('')]||_0x0635('0x1f'))+['.v',_0x316ab5[0xd],'e',_0x36c4ec('x'),'co',_0x36c4ec('mm'),_0x0635('0x20'),_0x316ab5[0x1],'.c',_0x36c4ec('o'),'m.',_0x316ab5[0x13],'r']['join'](''));for(var _0x120de8 in _0x1d4d69){if(_0x1acb98===_0x120de8+_0x1d4d69[_0x120de8]||_0x722362===_0x120de8+_0x1d4d69[_0x120de8]){var _0x554f3a='tr'+_0x316ab5[0x11]+'e';break;}_0x554f3a='f'+_0x316ab5[0x0]+'ls'+_0x36c4ec(_0x316ab5[0x1])+'';}_0x36c4ec=!0x1;-0x1<_0x22361c[[_0x316ab5[0xc],'e',_0x316ab5[0x0],'rc',_0x316ab5[0x9]]['join']('')][_0x0635('0x21')](_0x0635('0x22'))&&(_0x36c4ec=!0x0);return[_0x554f3a,_0x36c4ec];}(_0x2421f3);}(window);if(!eval(_0x39e0f6[0x0]))return _0x39e0f6[0x1]?_0x5a5148(_0x0635('0x23')):!0x1;_0x7e0084[_0x0635('0x19')]=function(_0x3c7357,_0x5917da){var _0x7d881b=_0x7e0084(_0x3c7357);if(!_0x7d881b[_0x0635('0x7')])return _0x7d881b;var _0x6b40da=_0x7e0084['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x0635('0x24'),'linkCheckout':_0x0635('0x25'),'cartTotal':_0x0635('0x26'),'emptyCart':_0x0635('0x27'),'continueShopping':_0x0635('0x28'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x28a26f){return _0x28a26f['skuName']||_0x28a26f[_0x0635('0x29')];},'callback':function(){},'callbackProductsList':function(){}},_0x5917da);_0x7e0084('');var _0x1cace3=this;if(_0x6b40da[_0x0635('0x2a')]){var _0x44f0d9=!0x1;_0x0635('0x2')===typeof window[_0x0635('0x2b')]&&(_0x5a5148('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x7e0084[_0x0635('0x2c')]({'url':_0x0635('0x2d'),'async':!0x1,'dataType':_0x0635('0x2e'),'error':function(){_0x5a5148('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x44f0d9=!0x0;}}));if(_0x44f0d9)return _0x5a5148(_0x0635('0x2f'));}if(_0x0635('0xf')===typeof window[_0x0635('0x2b')]&&_0x0635('0x2')!==typeof window[_0x0635('0x2b')][_0x0635('0x30')])var _0x16c07f=window[_0x0635('0x2b')][_0x0635('0x30')];else if('object'===typeof vtex&&'object'===typeof vtex[_0x0635('0x30')]&&_0x0635('0x2')!==typeof vtex[_0x0635('0x30')][_0x0635('0x31')])_0x16c07f=new vtex[(_0x0635('0x30'))]['SDK']();else return _0x5a5148('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x1cace3[_0x0635('0x32')]=_0x0635('0x33');var _0x28dbf1=function(_0x438fd6){_0x7e0084(this)['append'](_0x438fd6);_0x438fd6['find'](_0x0635('0x34'))[_0x0635('0x35')](_0x7e0084(_0x0635('0x36')))['on'](_0x0635('0x37'),function(){_0x7d881b[_0x0635('0x38')](_0x0635('0x39'));_0x7e0084(document['body'])[_0x0635('0x38')](_0x0635('0x3a'));});_0x7e0084(document)[_0x0635('0x3b')](_0x0635('0x3c'))['on'](_0x0635('0x3c'),function(_0xbf40fe){0x1b==_0xbf40fe[_0x0635('0x3d')]&&(_0x7d881b[_0x0635('0x38')](_0x0635('0x39')),_0x7e0084(document[_0x0635('0x3e')])[_0x0635('0x38')](_0x0635('0x3a')));});var _0x307af0=_0x438fd6[_0x0635('0x3f')](_0x0635('0x40'));_0x438fd6['find'](_0x0635('0x41'))['on'](_0x0635('0x42'),function(){_0x1cace3[_0x0635('0x43')]('-',void 0x0,void 0x0,_0x307af0);return!0x1;});_0x438fd6[_0x0635('0x3f')]('.qd-ddc-scrollDown')['on'](_0x0635('0x44'),function(){_0x1cace3[_0x0635('0x43')](void 0x0,void 0x0,void 0x0,_0x307af0);return!0x1;});_0x438fd6['find'](_0x0635('0x45'))['val']('')['on']('keyup.qd_ddc_cep',function(){_0x1cace3[_0x0635('0x46')](_0x7e0084(this));});if(_0x6b40da[_0x0635('0x47')]){var _0x5917da=0x0;_0x7e0084(this)['on'](_0x0635('0x48'),function(){var _0x438fd6=function(){window['_QuatroDigital_DropDown'][_0x0635('0x18')]&&(_0x1cace3[_0x0635('0x49')](),window[_0x0635('0x17')]['allowUpdate']=!0x1,_0x7e0084['fn'][_0x0635('0x4a')](!0x0),_0x1cace3[_0x0635('0x4b')]());};_0x5917da=setInterval(function(){_0x438fd6();},0x258);_0x438fd6();});_0x7e0084(this)['on'](_0x0635('0x4c'),function(){clearInterval(_0x5917da);});}};var _0x5a2085=function(_0x52c588){_0x52c588=_0x7e0084(_0x52c588);_0x6b40da[_0x0635('0x4d')][_0x0635('0x4e')]=_0x6b40da['texts'][_0x0635('0x4e')][_0x0635('0x0')](_0x0635('0x4f'),_0x0635('0x50'));_0x6b40da['texts']['cartTotal']=_0x6b40da[_0x0635('0x4d')][_0x0635('0x4e')][_0x0635('0x0')]('#items',_0x0635('0x51'));_0x6b40da[_0x0635('0x4d')][_0x0635('0x4e')]=_0x6b40da[_0x0635('0x4d')][_0x0635('0x4e')][_0x0635('0x0')](_0x0635('0x52'),_0x0635('0x53'));_0x6b40da[_0x0635('0x4d')][_0x0635('0x4e')]=_0x6b40da[_0x0635('0x4d')][_0x0635('0x4e')][_0x0635('0x0')](_0x0635('0x54'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x52c588[_0x0635('0x3f')](_0x0635('0x55'))[_0x0635('0x56')](_0x6b40da[_0x0635('0x4d')][_0x0635('0x57')]);_0x52c588[_0x0635('0x3f')](_0x0635('0x58'))[_0x0635('0x56')](_0x6b40da[_0x0635('0x4d')][_0x0635('0x59')]);_0x52c588['find'](_0x0635('0x5a'))[_0x0635('0x56')](_0x6b40da[_0x0635('0x4d')]['linkCheckout']);_0x52c588[_0x0635('0x3f')](_0x0635('0x5b'))['html'](_0x6b40da[_0x0635('0x4d')][_0x0635('0x4e')]);_0x52c588[_0x0635('0x3f')](_0x0635('0x5c'))[_0x0635('0x56')](_0x6b40da['texts'][_0x0635('0x5d')]);_0x52c588['find'](_0x0635('0x5e'))[_0x0635('0x56')](_0x6b40da[_0x0635('0x4d')][_0x0635('0x5f')]);return _0x52c588;}(this[_0x0635('0x32')]);var _0x343168=0x0;_0x7d881b['each'](function(){0x0<_0x343168?_0x28dbf1['call'](this,_0x5a2085[_0x0635('0x60')]()):_0x28dbf1['call'](this,_0x5a2085);_0x343168++;});window[_0x0635('0x9')][_0x0635('0xa')][_0x0635('0x35')](function(){_0x7e0084('.qd-ddc-infoTotalValue')[_0x0635('0x56')](window['_QuatroDigital_CartData'][_0x0635('0x61')]||'--');_0x7e0084(_0x0635('0x62'))[_0x0635('0x56')](window['_QuatroDigital_CartData'][_0x0635('0x63')]||'0');_0x7e0084(_0x0635('0x64'))[_0x0635('0x56')](window[_0x0635('0x9')][_0x0635('0x65')]||'--');_0x7e0084(_0x0635('0x66'))['html'](window['_QuatroDigital_CartData']['allTotal']||'--');});var _0x565260=function(_0x30225f,_0x4396d8){if(_0x0635('0x2')===typeof _0x30225f[_0x0635('0x67')])return _0x5a5148(_0x0635('0x68'));_0x1cace3[_0x0635('0x69')][_0x0635('0x6a')](this,_0x4396d8);};_0x1cace3[_0x0635('0x49')]=function(_0xb36910,_0x498d4e){_0x0635('0x2')!=typeof _0x498d4e?window[_0x0635('0x17')][_0x0635('0x6b')]=_0x498d4e:window[_0x0635('0x17')][_0x0635('0x6b')]&&(_0x498d4e=window[_0x0635('0x17')][_0x0635('0x6b')]);setTimeout(function(){window[_0x0635('0x17')]['dataOptionsCache']=void 0x0;},_0x6b40da[_0x0635('0x6c')]);_0x7e0084(_0x0635('0x6d'))['removeClass'](_0x0635('0x6e'));if(_0x6b40da['smartCheckout']){var _0x5917da=function(_0x38c958){window[_0x0635('0x17')][_0x0635('0x6f')]=_0x38c958;_0x565260(_0x38c958,_0x498d4e);_0x0635('0x2')!==typeof window[_0x0635('0x70')]&&_0x0635('0xb')===typeof window[_0x0635('0x70')]['exec']&&window[_0x0635('0x70')][_0x0635('0x71')]['call'](this);_0x7e0084(_0x0635('0x6d'))[_0x0635('0x72')](_0x0635('0x6e'));};'undefined'!==typeof window['_QuatroDigital_DropDown'][_0x0635('0x6f')]?(_0x5917da(window[_0x0635('0x17')][_0x0635('0x6f')]),_0x0635('0xb')===typeof _0xb36910&&_0xb36910(window[_0x0635('0x17')][_0x0635('0x6f')])):_0x7e0084[_0x0635('0x73')](['items','totalizers',_0x0635('0x74')],{'done':function(_0x15321a){_0x5917da[_0x0635('0x6a')](this,_0x15321a);_0x0635('0xb')===typeof _0xb36910&&_0xb36910(_0x15321a);},'fail':function(_0x16812e){_0x5a5148([_0x0635('0x75'),_0x16812e]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x1cace3[_0x0635('0x4b')]=function(){var _0x523b62=_0x7e0084('.qd-ddc-wrapper');_0x523b62[_0x0635('0x3f')](_0x0635('0x76'))[_0x0635('0x7')]?_0x523b62['removeClass'](_0x0635('0x77')):_0x523b62[_0x0635('0x72')](_0x0635('0x77'));};_0x1cace3[_0x0635('0x69')]=function(_0x5828c8){var _0x5917da=_0x7e0084(_0x0635('0x78'));_0x5917da[_0x0635('0x79')]();_0x5917da[_0x0635('0x7a')](function(){var _0x5917da=_0x7e0084(this),_0x163fc5,_0x3c7357,_0x2cc862=_0x7e0084(''),_0x184ad3;for(_0x184ad3 in window[_0x0635('0x17')][_0x0635('0x6f')][_0x0635('0x67')])if(_0x0635('0xf')===typeof window[_0x0635('0x17')][_0x0635('0x6f')][_0x0635('0x67')][_0x184ad3]){var _0x2ea8f5=window[_0x0635('0x17')][_0x0635('0x6f')][_0x0635('0x67')][_0x184ad3];var _0x3f9b2d=_0x2ea8f5[_0x0635('0x7b')][_0x0635('0x0')](/^\/|\/$/g,'')['split']('/');var _0x84af60=_0x7e0084('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x84af60[_0x0635('0x7c')]({'data-sku':_0x2ea8f5['id'],'data-sku-index':_0x184ad3,'data-qd-departament':_0x3f9b2d[0x0],'data-qd-category':_0x3f9b2d[_0x3f9b2d[_0x0635('0x7')]-0x1]});_0x84af60['addClass'](_0x0635('0x7d')+_0x2ea8f5[_0x0635('0x7e')]);_0x84af60[_0x0635('0x3f')](_0x0635('0x7f'))[_0x0635('0x80')](_0x6b40da[_0x0635('0x81')](_0x2ea8f5));_0x84af60[_0x0635('0x3f')](_0x0635('0x82'))[_0x0635('0x80')](isNaN(_0x2ea8f5[_0x0635('0x83')])?_0x2ea8f5[_0x0635('0x83')]:0x0==_0x2ea8f5[_0x0635('0x83')]?_0x0635('0x84'):(_0x7e0084(_0x0635('0x85'))['attr']('content')||'R$')+'\x20'+qd_number_format(_0x2ea8f5[_0x0635('0x83')]/0x64,0x2,',','.'));_0x84af60[_0x0635('0x3f')]('.qd-ddc-quantity')[_0x0635('0x7c')]({'data-sku':_0x2ea8f5['id'],'data-sku-index':_0x184ad3})[_0x0635('0x86')](_0x2ea8f5['quantity']);_0x84af60['find'](_0x0635('0x87'))[_0x0635('0x7c')]({'data-sku':_0x2ea8f5['id'],'data-sku-index':_0x184ad3});_0x1cace3[_0x0635('0x88')](_0x2ea8f5['id'],_0x84af60[_0x0635('0x3f')](_0x0635('0x89')),_0x2ea8f5[_0x0635('0x8a')]);_0x84af60[_0x0635('0x3f')](_0x0635('0x8b'))['attr']({'data-sku':_0x2ea8f5['id'],'data-sku-index':_0x184ad3});_0x84af60[_0x0635('0x8c')](_0x5917da);_0x2cc862=_0x2cc862['add'](_0x84af60);}try{var _0x16c07f=_0x5917da[_0x0635('0x8d')]('.qd-ddc-wrapper')[_0x0635('0x3f')](_0x0635('0x45'));_0x16c07f[_0x0635('0x7')]&&''==_0x16c07f['val']()&&window[_0x0635('0x17')][_0x0635('0x6f')]['shippingData'][_0x0635('0x8e')]&&_0x16c07f[_0x0635('0x86')](window[_0x0635('0x17')][_0x0635('0x6f')][_0x0635('0x74')][_0x0635('0x8e')]['postalCode']);}catch(_0x59d3f7){_0x5a5148(_0x0635('0x8f')+_0x59d3f7[_0x0635('0xe')],'aviso');}_0x1cace3['actionButtons'](_0x5917da);_0x1cace3[_0x0635('0x4b')]();_0x5828c8&&_0x5828c8[_0x0635('0x90')]&&function(){_0x3c7357=_0x2cc862['filter']('[data-sku=\x27'+_0x5828c8[_0x0635('0x90')]+'\x27]');_0x3c7357[_0x0635('0x7')]&&(_0x163fc5=0x0,_0x2cc862['each'](function(){var _0x5828c8=_0x7e0084(this);if(_0x5828c8['is'](_0x3c7357))return!0x1;_0x163fc5+=_0x5828c8[_0x0635('0x91')]();}),_0x1cace3[_0x0635('0x43')](void 0x0,void 0x0,_0x163fc5,_0x5917da['add'](_0x5917da[_0x0635('0x92')]())),_0x2cc862['removeClass'](_0x0635('0x93')),function(_0x13e94b){_0x13e94b[_0x0635('0x72')](_0x0635('0x94'));_0x13e94b[_0x0635('0x72')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x13e94b['removeClass']('qd-ddc-lastAdded');},_0x6b40da[_0x0635('0x6c')]);}(_0x3c7357),_0x7e0084(document[_0x0635('0x3e')])[_0x0635('0x72')]('qd-ddc-product-add-time-v2'),setTimeout(function(){_0x7e0084(document[_0x0635('0x3e')])[_0x0635('0x38')](_0x0635('0x95'));},_0x6b40da['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown[_0x0635('0x6f')][_0x0635('0x67')][_0x0635('0x7')]?(_0x7e0084(_0x0635('0x3e'))[_0x0635('0x38')](_0x0635('0x96'))['addClass'](_0x0635('0x97')),setTimeout(function(){_0x7e0084(_0x0635('0x3e'))[_0x0635('0x38')]('qd-ddc-product-add-time');},_0x6b40da[_0x0635('0x6c')])):_0x7e0084('body')[_0x0635('0x38')](_0x0635('0x98'))['addClass'](_0x0635('0x96'));}());_0x0635('0xb')===typeof _0x6b40da[_0x0635('0x99')]?_0x6b40da[_0x0635('0x99')][_0x0635('0x6a')](this):_0x5a5148(_0x0635('0x9a'));};_0x1cace3['insertProdImg']=function(_0x15807e,_0x2fdd36,_0x1ecf90){function _0x196cb0(){_0x2fdd36[_0x0635('0x38')](_0x0635('0x9b'))['load'](function(){_0x7e0084(this)['addClass'](_0x0635('0x9b'));})[_0x0635('0x7c')](_0x0635('0x9c'),_0x1ecf90);}_0x1ecf90?_0x196cb0():isNaN(_0x15807e)?_0x5a5148(_0x0635('0x9d'),_0x0635('0x9e')):alert(_0x0635('0x9f'));};_0x1cace3['actionButtons']=function(_0x355d11){var _0x5917da=function(_0x3cc10b,_0x2fd72e){var _0x4e9bd8=_0x7e0084(_0x3cc10b);var _0x177ad3=_0x4e9bd8[_0x0635('0x7c')](_0x0635('0xa0'));var _0x3c7357=_0x4e9bd8['attr']('data-sku-index');if(_0x177ad3){var _0x21d4dd=parseInt(_0x4e9bd8['val']())||0x1;_0x1cace3[_0x0635('0xa1')]([_0x177ad3,_0x3c7357],_0x21d4dd,_0x21d4dd+0x1,function(_0x1880ad){_0x4e9bd8[_0x0635('0x86')](_0x1880ad);_0x0635('0xb')===typeof _0x2fd72e&&_0x2fd72e();});}};var _0x31b65e=function(_0x17c1ac,_0x29a9fc){var _0x434257=_0x7e0084(_0x17c1ac);var _0x3c7357=_0x434257[_0x0635('0x7c')](_0x0635('0xa0'));var _0x1622fe=_0x434257[_0x0635('0x7c')]('data-sku-index');if(_0x3c7357){var _0x44b56f=parseInt(_0x434257[_0x0635('0x86')]())||0x2;_0x1cace3[_0x0635('0xa1')]([_0x3c7357,_0x1622fe],_0x44b56f,_0x44b56f-0x1,function(_0x46c182){_0x434257['val'](_0x46c182);_0x0635('0xb')===typeof _0x29a9fc&&_0x29a9fc();});}};var _0x3db1f9=function(_0x257ca9,_0x418e2f){var _0x5917da=_0x7e0084(_0x257ca9);var _0x3c7357=_0x5917da['attr']('data-sku');var _0xe177ca=_0x5917da['attr']('data-sku-index');if(_0x3c7357){var _0x1571b5=parseInt(_0x5917da[_0x0635('0x86')]())||0x1;_0x1cace3[_0x0635('0xa1')]([_0x3c7357,_0xe177ca],0x1,_0x1571b5,function(_0x190c7c){_0x5917da[_0x0635('0x86')](_0x190c7c);_0x0635('0xb')===typeof _0x418e2f&&_0x418e2f();});}};var _0x3c7357=_0x355d11[_0x0635('0x3f')](_0x0635('0xa2'));_0x3c7357[_0x0635('0x72')](_0x0635('0xa3'))[_0x0635('0x7a')](function(){var _0x355d11=_0x7e0084(this);_0x355d11[_0x0635('0x3f')](_0x0635('0xa4'))['on'](_0x0635('0xa5'),function(_0x50bf35){_0x50bf35[_0x0635('0xa6')]();_0x3c7357[_0x0635('0x72')](_0x0635('0xa7'));_0x5917da(_0x355d11[_0x0635('0x3f')]('.qd-ddc-quantity'),function(){_0x3c7357[_0x0635('0x38')]('qd-loading');});});_0x355d11[_0x0635('0x3f')](_0x0635('0xa8'))['on']('click.qd_ddc_minus',function(_0x1fb247){_0x1fb247[_0x0635('0xa6')]();_0x3c7357[_0x0635('0x72')](_0x0635('0xa7'));_0x31b65e(_0x355d11[_0x0635('0x3f')]('.qd-ddc-quantity'),function(){_0x3c7357['removeClass'](_0x0635('0xa7'));});});_0x355d11['find'](_0x0635('0xa9'))['on']('focusout.qd_ddc_change',function(){_0x3c7357[_0x0635('0x72')](_0x0635('0xa7'));_0x3db1f9(this,function(){_0x3c7357[_0x0635('0x38')](_0x0635('0xa7'));});});_0x355d11[_0x0635('0x3f')](_0x0635('0xa9'))['on'](_0x0635('0xaa'),function(_0x2dcd21){0xd==_0x2dcd21[_0x0635('0x3d')]&&(_0x3c7357[_0x0635('0x72')](_0x0635('0xa7')),_0x3db1f9(this,function(){_0x3c7357[_0x0635('0x38')]('qd-loading');}));});});_0x355d11[_0x0635('0x3f')](_0x0635('0x76'))[_0x0635('0x7a')](function(){var _0x355d11=_0x7e0084(this);_0x355d11[_0x0635('0x3f')](_0x0635('0x87'))['on']('click.qd_ddc_remove',function(){_0x355d11['addClass'](_0x0635('0xa7'));_0x1cace3['removeProduct'](_0x7e0084(this),function(_0x4dd902){_0x4dd902?_0x355d11['stop'](!0x0)[_0x0635('0xab')](function(){_0x355d11[_0x0635('0xac')]();_0x1cace3['cartIsEmpty']();}):_0x355d11['removeClass']('qd-loading');});return!0x1;});});};_0x1cace3[_0x0635('0x46')]=function(_0x169ee3){var _0x33379c=_0x169ee3[_0x0635('0x86')]();_0x33379c=_0x33379c['replace'](/[^0-9\-]/g,'');_0x33379c=_0x33379c['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x33379c=_0x33379c['replace'](/(.{9}).*/g,'$1');_0x169ee3[_0x0635('0x86')](_0x33379c);0x9<=_0x33379c['length']&&(_0x169ee3['data'](_0x0635('0xad'))!=_0x33379c&&_0x16c07f['calculateShipping']({'postalCode':_0x33379c,'country':_0x0635('0xae')})[_0x0635('0xaf')](function(_0x538ead){window[_0x0635('0x17')][_0x0635('0x6f')]=_0x538ead;_0x1cace3[_0x0635('0x49')]();})[_0x0635('0xb0')](function(_0xf3ca40){_0x5a5148([_0x0635('0xb1'),_0xf3ca40]);updateCartData();}),_0x169ee3['data'](_0x0635('0xad'),_0x33379c));};_0x1cace3[_0x0635('0xa1')]=function(_0x39af30,_0x3834ac,_0x32cbd5,_0x46c0ca){function _0x238870(_0x31e445){_0x31e445='boolean'!==typeof _0x31e445?!0x1:_0x31e445;_0x1cace3[_0x0635('0x49')]();window[_0x0635('0x17')][_0x0635('0x18')]=!0x1;_0x1cace3[_0x0635('0x4b')]();_0x0635('0x2')!==typeof window[_0x0635('0x70')]&&'function'===typeof window[_0x0635('0x70')]['exec']&&window[_0x0635('0x70')][_0x0635('0x71')]['call'](this);_0x0635('0xb')===typeof adminCart&&adminCart();_0x7e0084['fn'][_0x0635('0x4a')](!0x0,void 0x0,_0x31e445);_0x0635('0xb')===typeof _0x46c0ca&&_0x46c0ca(_0x3834ac);}_0x32cbd5=_0x32cbd5||0x1;if(0x1>_0x32cbd5)return _0x3834ac;if(_0x6b40da['smartCheckout']){if(_0x0635('0x2')===typeof window[_0x0635('0x17')][_0x0635('0x6f')]['items'][_0x39af30[0x1]])return _0x5a5148('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x39af30[0x1]+']'),_0x3834ac;window[_0x0635('0x17')][_0x0635('0x6f')][_0x0635('0x67')][_0x39af30[0x1]][_0x0635('0xb2')]=_0x32cbd5;window[_0x0635('0x17')]['getOrderForm'][_0x0635('0x67')][_0x39af30[0x1]][_0x0635('0xb3')]=_0x39af30[0x1];_0x16c07f[_0x0635('0xb4')]([window[_0x0635('0x17')][_0x0635('0x6f')]['items'][_0x39af30[0x1]]],[_0x0635('0x67'),'totalizers','shippingData'])[_0x0635('0xaf')](function(_0x288306){window[_0x0635('0x17')]['getOrderForm']=_0x288306;_0x238870(!0x0);})[_0x0635('0xb0')](function(_0x221339){_0x5a5148([_0x0635('0xb5'),_0x221339]);_0x238870();});}else _0x5a5148(_0x0635('0xb6'));};_0x1cace3[_0x0635('0xb7')]=function(_0x37a3d5,_0x71527c){function _0x4aa345(_0x9d15bf){_0x9d15bf='boolean'!==typeof _0x9d15bf?!0x1:_0x9d15bf;_0x0635('0x2')!==typeof window[_0x0635('0x70')]&&_0x0635('0xb')===typeof window[_0x0635('0x70')][_0x0635('0x71')]&&window[_0x0635('0x70')][_0x0635('0x71')][_0x0635('0x6a')](this);_0x0635('0xb')===typeof adminCart&&adminCart();_0x7e0084['fn'][_0x0635('0x4a')](!0x0,void 0x0,_0x9d15bf);_0x0635('0xb')===typeof _0x71527c&&_0x71527c(_0x3c7357);}var _0x3c7357=!0x1,_0x548d7e=_0x7e0084(_0x37a3d5)['attr'](_0x0635('0xb8'));if(_0x6b40da[_0x0635('0x2a')]){if(_0x0635('0x2')===typeof window[_0x0635('0x17')][_0x0635('0x6f')][_0x0635('0x67')][_0x548d7e])return _0x5a5148(_0x0635('0xb9')+_0x548d7e+']'),_0x3c7357;window[_0x0635('0x17')]['getOrderForm'][_0x0635('0x67')][_0x548d7e]['index']=_0x548d7e;_0x16c07f[_0x0635('0xba')]([window['_QuatroDigital_DropDown']['getOrderForm'][_0x0635('0x67')][_0x548d7e]],['items',_0x0635('0xbb'),_0x0635('0x74')])[_0x0635('0xaf')](function(_0x160c91){_0x3c7357=!0x0;window['_QuatroDigital_DropDown'][_0x0635('0x6f')]=_0x160c91;_0x565260(_0x160c91);_0x4aa345(!0x0);})[_0x0635('0xb0')](function(_0x473231){_0x5a5148([_0x0635('0xbc'),_0x473231]);_0x4aa345();});}else alert(_0x0635('0xbd'));};_0x1cace3['scrollCart']=function(_0x501641,_0x3a6d88,_0x311a1f,_0x88cfa6){_0x88cfa6=_0x88cfa6||_0x7e0084(_0x0635('0xbe'));_0x501641=_0x501641||'+';_0x3a6d88=_0x3a6d88||0.9*_0x88cfa6['height']();_0x88cfa6[_0x0635('0xbf')](!0x0,!0x0)[_0x0635('0xc0')]({'scrollTop':isNaN(_0x311a1f)?_0x501641+'='+_0x3a6d88+'px':_0x311a1f});};_0x6b40da['updateOnlyHover']||(_0x1cace3[_0x0635('0x49')](),_0x7e0084['fn'][_0x0635('0x4a')](!0x0));_0x7e0084(window)['on'](_0x0635('0xc1'),function(){try{window['_QuatroDigital_DropDown'][_0x0635('0x6f')]=void 0x0,_0x1cace3[_0x0635('0x49')]();}catch(_0x24a86){_0x5a5148(_0x0635('0xc2')+_0x24a86[_0x0635('0xe')],_0x0635('0xc3'));}});'function'===typeof _0x6b40da[_0x0635('0xa')]?_0x6b40da[_0x0635('0xa')][_0x0635('0x6a')](this):_0x5a5148(_0x0635('0xc4'));};_0x7e0084['fn']['QD_dropDownCart']=function(_0x4cf63b){var _0x1fdfcd=_0x7e0084(this);_0x1fdfcd['fn']=new _0x7e0084['QD_dropDownCart'](this,_0x4cf63b);return _0x1fdfcd;};}catch(_0xf083ff){_0x0635('0x2')!==typeof console&&_0x0635('0xb')===typeof console['error']&&console[_0x0635('0xc')](_0x0635('0xd'),_0xf083ff);}}(this));(function(_0x5453fb){try{var _0x348dfd=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x0635('0x70')]||{};window['_QuatroDigital_AmountProduct']['items']={};window[_0x0635('0x70')][_0x0635('0xc5')]=!0x1;window[_0x0635('0x70')][_0x0635('0xc6')]=!0x1;window[_0x0635('0x70')]['quickViewUpdate']=!0x1;var _0x4d50e4=function(){if(window[_0x0635('0x70')][_0x0635('0xc5')]){var _0x11661c=!0x1;var _0x39f13b={};window[_0x0635('0x70')]['items']={};for(_0x8ccff0 in window[_0x0635('0x17')][_0x0635('0x6f')][_0x0635('0x67')])if(_0x0635('0xf')===typeof window[_0x0635('0x17')][_0x0635('0x6f')][_0x0635('0x67')][_0x8ccff0]){var _0x3c8fe2=window[_0x0635('0x17')]['getOrderForm'][_0x0635('0x67')][_0x8ccff0];_0x0635('0x2')!==typeof _0x3c8fe2[_0x0635('0xc7')]&&null!==_0x3c8fe2['productId']&&''!==_0x3c8fe2[_0x0635('0xc7')]&&(window[_0x0635('0x70')]['items']['prod_'+_0x3c8fe2[_0x0635('0xc7')]]=window['_QuatroDigital_AmountProduct'][_0x0635('0x67')][_0x0635('0xc8')+_0x3c8fe2['productId']]||{},window[_0x0635('0x70')][_0x0635('0x67')][_0x0635('0xc8')+_0x3c8fe2['productId']][_0x0635('0xc9')]=_0x3c8fe2[_0x0635('0xc7')],_0x39f13b[_0x0635('0xc8')+_0x3c8fe2[_0x0635('0xc7')]]||(window[_0x0635('0x70')][_0x0635('0x67')]['prod_'+_0x3c8fe2[_0x0635('0xc7')]][_0x0635('0x63')]=0x0),window[_0x0635('0x70')][_0x0635('0x67')]['prod_'+_0x3c8fe2[_0x0635('0xc7')]][_0x0635('0x63')]+=_0x3c8fe2[_0x0635('0xb2')],_0x11661c=!0x0,_0x39f13b['prod_'+_0x3c8fe2['productId']]=!0x0);}var _0x8ccff0=_0x11661c;}else _0x8ccff0=void 0x0;window[_0x0635('0x70')][_0x0635('0xc5')]&&(_0x348dfd(_0x0635('0xca'))[_0x0635('0xac')](),_0x348dfd(_0x0635('0xcb'))['removeClass'](_0x0635('0xcc')));for(var _0x3d6f9b in window[_0x0635('0x70')]['items']){_0x3c8fe2=window[_0x0635('0x70')][_0x0635('0x67')][_0x3d6f9b];if(_0x0635('0xf')!==typeof _0x3c8fe2)return;_0x39f13b=_0x348dfd(_0x0635('0xcd')+_0x3c8fe2['prodId']+']')[_0x0635('0x8d')]('li');if(window[_0x0635('0x70')][_0x0635('0xc5')]||!_0x39f13b['find'](_0x0635('0xca'))[_0x0635('0x7')])_0x11661c=_0x348dfd(_0x0635('0xce')),_0x11661c[_0x0635('0x3f')](_0x0635('0xcf'))[_0x0635('0x56')](_0x3c8fe2[_0x0635('0x63')]),_0x3c8fe2=_0x39f13b[_0x0635('0x3f')](_0x0635('0xd0')),_0x3c8fe2['length']?_0x3c8fe2[_0x0635('0xd1')](_0x11661c)['addClass']('qd-bap-item-added'):_0x39f13b[_0x0635('0xd1')](_0x11661c);}_0x8ccff0&&(window[_0x0635('0x70')]['allowRecalculate']=!0x1);};window[_0x0635('0x70')][_0x0635('0x71')]=function(){window[_0x0635('0x70')][_0x0635('0xc5')]=!0x0;_0x4d50e4[_0x0635('0x6a')](this);};_0x348dfd(document)['ajaxStop'](function(){_0x4d50e4[_0x0635('0x6a')](this);});}catch(_0x5424e7){_0x0635('0x2')!==typeof console&&'function'===typeof console[_0x0635('0xc')]&&console[_0x0635('0xc')](_0x0635('0xd'),_0x5424e7);}}(this));(function(){try{var _0x24c996=jQuery,_0x36bad0,_0x388307={'selector':_0x0635('0xd2'),'dropDown':{},'buyButton':{}};_0x24c996[_0x0635('0xd3')]=function(_0x2dc3e5){var _0xcc0ea4={};_0x36bad0=_0x24c996[_0x0635('0xd4')](!0x0,{},_0x388307,_0x2dc3e5);_0x2dc3e5=_0x24c996(_0x36bad0[_0x0635('0xd5')])[_0x0635('0x19')](_0x36bad0[_0x0635('0xd6')]);_0xcc0ea4[_0x0635('0xd7')]=_0x0635('0x2')!==typeof _0x36bad0[_0x0635('0xd6')][_0x0635('0x47')]&&!0x1===_0x36bad0[_0x0635('0xd6')]['updateOnlyHover']?_0x24c996(_0x36bad0['selector'])[_0x0635('0xd8')](_0x2dc3e5['fn'],_0x36bad0[_0x0635('0xd7')]):_0x24c996(_0x36bad0[_0x0635('0xd5')])[_0x0635('0xd8')](_0x36bad0[_0x0635('0xd7')]);_0xcc0ea4[_0x0635('0xd6')]=_0x2dc3e5;return _0xcc0ea4;};_0x24c996['fn'][_0x0635('0xd9')]=function(){'object'===typeof console&&'function'===typeof console[_0x0635('0x10')]&&console[_0x0635('0x10')](_0x0635('0xda'));};_0x24c996[_0x0635('0xd9')]=_0x24c996['fn']['smartCart'];}catch(_0x1dde60){_0x0635('0x2')!==typeof console&&_0x0635('0xb')===typeof console[_0x0635('0xc')]&&console[_0x0635('0xc')](_0x0635('0xd'),_0x1dde60);}}());

/* Quatro Digital - Smart Stock Available */
var _0xcad3=['erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdAjax','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','extend','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','QD_smartStockAvailable','function','Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available','object','unshift','undefined','alerta','toLowerCase','aviso','info','apply','error','warn','length','addClass','qd-ssa-on','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','message','off','vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','removeClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','each','[data-qd-ssa-text]','qd-ssa-hide','qd-ssa-show','[data-qd-ssa-text=\x22','filter','hide','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','trigger','vgevarqbnegrfnangb%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---'];(function(_0x54a28a,_0x1ba1fe){var _0x3da1f1=function(_0x7231b5){while(--_0x7231b5){_0x54a28a['push'](_0x54a28a['shift']());}};_0x3da1f1(++_0x1ba1fe);}(_0xcad3,0xd3));var _0x3cad=function(_0x2adbeb,_0x5581be){_0x2adbeb=_0x2adbeb-0x0;var _0x5e18a6=_0xcad3[_0x2adbeb];return _0x5e18a6;};(function(_0xc804dc){'use strict';var _0x23b334=jQuery;if(typeof _0x23b334['fn'][_0x3cad('0x0')]===_0x3cad('0x1'))return;var _0x14f8f8=_0x3cad('0x2');var _0x2aee3e=function(_0x29130a,_0x224e96){if(_0x3cad('0x3')===typeof console){var _0x24a153;'object'===typeof _0x29130a?(_0x29130a[_0x3cad('0x4')]('['+_0x14f8f8+']\x0a'),_0x24a153=_0x29130a):_0x24a153=['['+_0x14f8f8+']\x0a'+_0x29130a];_0x3cad('0x5')===typeof _0x224e96||_0x3cad('0x6')!==_0x224e96[_0x3cad('0x7')]()&&_0x3cad('0x8')!==_0x224e96[_0x3cad('0x7')]()?'undefined'!==typeof _0x224e96&&_0x3cad('0x9')===_0x224e96[_0x3cad('0x7')]()?console[_0x3cad('0x9')][_0x3cad('0xa')](console,_0x24a153):console[_0x3cad('0xb')][_0x3cad('0xa')](console,_0x24a153):console[_0x3cad('0xc')][_0x3cad('0xa')](console,_0x24a153);}};var _0x491439={};var _0x5dc140=function(_0xa54c5e,_0x5a2171){if(!_0xa54c5e[_0x3cad('0xd')])return;_0xa54c5e[_0x3cad('0xe')](_0x3cad('0xf'));_0xa54c5e[_0x3cad('0xe')]('qd-ssa-sku-no-selected');try{_0xa54c5e[_0x3cad('0xe')]('qd-ssa-skus-'+vtxctx[_0x3cad('0x10')][_0x3cad('0x11')](';')[_0x3cad('0xd')]);}catch(_0x3e9c35){_0x2aee3e([_0x3cad('0x12'),_0x3e9c35['message']]);}_0x23b334(window)['on'](_0x3cad('0x13'),function(_0x250bd8,_0x358063,_0x386078){try{_0x6ede78(_0x386078[_0x3cad('0x14')],function(_0x576bbd){_0x2351d0(_0x576bbd);_0x361250(_0x576bbd);});}catch(_0x403ecf){_0x2aee3e(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0x403ecf[_0x3cad('0x15')]]);}});_0x23b334(window)[_0x3cad('0x16')](_0x3cad('0x17'));_0x23b334(window)['on'](_0x3cad('0x18'),function(){_0xa54c5e[_0x3cad('0xe')]('qd-ssa-sku-prod-unavailable')['hide']();});function _0x2351d0(_0x10afc2){try{_0xa54c5e[_0x3cad('0x19')]('qd-ssa-sku-no-selected')['addClass'](_0x3cad('0x1a'));var _0x31a404=_0x10afc2[0x0][_0x3cad('0x1b')][0x0][_0x3cad('0x1c')];_0xa54c5e[_0x3cad('0x1d')]('data-qd-ssa-qtt',_0x31a404);_0xa54c5e[_0x3cad('0x1e')](function(){var _0x578575=_0x23b334(this)['find'](_0x3cad('0x1f'));if(_0x31a404<0x1)return _0x578575['hide']()[_0x3cad('0xe')](_0x3cad('0x20'))[_0x3cad('0x19')](_0x3cad('0x21'));var _0x3b3714=_0x578575['filter'](_0x3cad('0x22')+_0x31a404+'\x22]');var _0x402efd=_0x3b3714[_0x3cad('0xd')]?_0x3b3714:_0x578575[_0x3cad('0x23')]('[data-qd-ssa-text=\x22default\x22]');_0x578575[_0x3cad('0x24')]()['addClass'](_0x3cad('0x20'))[_0x3cad('0x19')](_0x3cad('0x21'));_0x402efd['html']((_0x402efd['html']()||'')[_0x3cad('0x25')](_0x3cad('0x26'),_0x31a404));_0x402efd[_0x3cad('0x27')]()['addClass'](_0x3cad('0x21'))[_0x3cad('0x19')]('qd-ssa-hide');});}catch(_0x52006b){_0x2aee3e([_0x3cad('0x28'),_0x52006b[_0x3cad('0x15')]]);}};function _0x361250(_0x1d6d85){if(vtxctx[_0x3cad('0x10')][_0x3cad('0x11')](';')[_0x3cad('0xd')]===0x1&&_0x1d6d85[0x0][_0x3cad('0x1b')][0x0][_0x3cad('0x1c')]==0x0)_0x23b334(window)[_0x3cad('0x29')](_0x3cad('0x18'));};};var _0x57d543=function(_0x44ec37){var _0x24a340={'i':_0x3cad('0x2a')};return function(_0x54603d){var _0x5bc06a,_0x6cb235,_0x3581ee,_0x12ac9a;_0x6cb235=function(_0x4e10f5){return _0x4e10f5;};_0x3581ee=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x54603d=_0x54603d['d'+_0x3581ee[0x10]+'c'+_0x3581ee[0x11]+'m'+_0x6cb235(_0x3581ee[0x1])+'n'+_0x3581ee[0xd]]['l'+_0x3581ee[0x12]+'c'+_0x3581ee[0x0]+'ti'+_0x6cb235('o')+'n'];_0x5bc06a=function(_0x1130e6){return escape(encodeURIComponent(_0x1130e6[_0x3cad('0x25')](/\./g,'¨')[_0x3cad('0x25')](/[a-zA-Z]/g,function(_0x234a7a){return String[_0x3cad('0x2b')](('Z'>=_0x234a7a?0x5a:0x7a)>=(_0x234a7a=_0x234a7a[_0x3cad('0x2c')](0x0)+0xd)?_0x234a7a:_0x234a7a-0x1a);})));};var _0x57a16b=_0x5bc06a(_0x54603d[[_0x3581ee[0x9],_0x6cb235('o'),_0x3581ee[0xc],_0x3581ee[_0x6cb235(0xd)]][_0x3cad('0x2d')]('')]);_0x5bc06a=_0x5bc06a((window[['js',_0x6cb235('no'),'m',_0x3581ee[0x1],_0x3581ee[0x4][_0x3cad('0x2e')](),_0x3cad('0x2f')][_0x3cad('0x2d')]('')]||_0x3cad('0x30'))+['.v',_0x3581ee[0xd],'e',_0x6cb235('x'),'co',_0x6cb235('mm'),_0x3cad('0x31'),_0x3581ee[0x1],'.c',_0x6cb235('o'),'m.',_0x3581ee[0x13],'r'][_0x3cad('0x2d')](''));for(var _0x79c9af in _0x24a340){if(_0x5bc06a===_0x79c9af+_0x24a340[_0x79c9af]||_0x57a16b===_0x79c9af+_0x24a340[_0x79c9af]){_0x12ac9a='tr'+_0x3581ee[0x11]+'e';break;}_0x12ac9a='f'+_0x3581ee[0x0]+'ls'+_0x6cb235(_0x3581ee[0x1])+'';}_0x6cb235=!0x1;-0x1<_0x54603d[[_0x3581ee[0xc],'e',_0x3581ee[0x0],'rc',_0x3581ee[0x9]][_0x3cad('0x2d')]('')][_0x3cad('0x32')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x6cb235=!0x0);return[_0x12ac9a,_0x6cb235];}(_0x44ec37);}(window);if(!eval(_0x57d543[0x0]))return _0x57d543[0x1]?_0x2aee3e(_0x3cad('0x33')):!0x1;function _0x6ede78(_0x4486dc,_0x2ec888){_0x23b334[_0x3cad('0x34')]({'url':_0x3cad('0x35')+_0x4486dc,'clearQueueDelay':null,'success':_0x2ec888,'error':function(){_0x2aee3e(_0x3cad('0x36'));}});};_0x23b334['fn'][_0x3cad('0x0')]=function(_0x2a1a3d){var _0x5e7a24=_0x23b334(this);var _0x3480b7=_0x23b334[_0x3cad('0x37')](!![],{},_0x491439,_0x2a1a3d);_0x5e7a24[_0x3cad('0x38')]=new _0x5dc140(_0x5e7a24,_0x3480b7);try{if(typeof _0x23b334['fn']['QD_smartStockAvailable'][_0x3cad('0x39')]===_0x3cad('0x3'))_0x23b334(window)[_0x3cad('0x29')](_0x3cad('0x3a'),[_0x23b334['fn']['QD_smartStockAvailable'][_0x3cad('0x39')][_0x3cad('0x3b')],_0x23b334['fn'][_0x3cad('0x0')][_0x3cad('0x39')][_0x3cad('0x14')]]);}catch(_0x4c8df){_0x2aee3e([_0x3cad('0x3c'),_0x4c8df[_0x3cad('0x15')]]);}if(_0x23b334['fn']['QD_smartStockAvailable']['unavailable'])_0x23b334(window)[_0x3cad('0x29')](_0x3cad('0x18'));return _0x5e7a24;};_0x23b334(window)['on'](_0x3cad('0x17'),function(_0x2a32e0,_0x3b9241,_0x227d0f){try{_0x23b334['fn'][_0x3cad('0x0')]['initialSkuSelected']={'prod':_0x3b9241,'sku':_0x227d0f};_0x23b334(this)[_0x3cad('0x16')](_0x2a32e0);}catch(_0x2dc0c2){_0x2aee3e([_0x3cad('0x3d'),_0x2dc0c2['message']]);}});_0x23b334(window)['on'](_0x3cad('0x3e'),function(_0x467ce0,_0x674156,_0x1df9bd){try{var _0x2f01ae=_0x1df9bd[_0x3cad('0xd')];var _0xcdbdc6=0x0;for(var _0x2be192=0x0;_0x2be192<_0x2f01ae;_0x2be192++){if(!_0x1df9bd[_0x2be192][_0x3cad('0x3f')])_0xcdbdc6=_0xcdbdc6+0x1;else break;}if(_0x2f01ae<=_0xcdbdc6)_0x23b334['fn']['QD_smartStockAvailable']['unavailable']=!![];_0x23b334(this)[_0x3cad('0x16')](_0x467ce0);}catch(_0x21326c){_0x2aee3e([_0x3cad('0x40'),_0x21326c[_0x3cad('0x15')]]);}});_0x23b334(function(){_0x23b334('.qd_smart_stock_available_auto')[_0x3cad('0x0')]();});}(window));

// not-qd-include ../qd-quatro-lib-plugins/Infinity Scroll Memory/QD_infinityScrollMemory.min.js

// not-qd-include ../qd-quatro-lib-plugins/Pacote Mobile Check/Mobile_Adjust.min.js
// not-qd-include ../qd-quatro-lib-plugins/Pacote Mobile Check/Mobile_Check.min.js
// not-qd-include ../qd-quatro-lib-plugins/Pacote Mobile Check/Mobile_Link_Adjust.min.js