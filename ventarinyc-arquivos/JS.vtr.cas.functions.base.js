/**
* Funções base
*/
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.qdOverlay();
			Common.vtexBindQuickViewDestroy();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.applyCarouselShelf();
			Common.applyMosaicBanners();
			Common.applySmartCart();
			Common.applyTipBarCarousel();
			Common.openSearchModal();
			Common.saveAmountFix();
			Common.setDataScrollToggle();
			Common.showFooterLinks();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
		},
		windowOnload: function() {},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		appendSkuPopUpCloseBtn: function () {
			$('<span class="modal-qd-v1-box-popup-close">Fechar</span>').insertBefore('.boxPopUp2 .selectSkuTitle');

			$('.modal-qd-v1-box-popup-close').click(function () {
				$(window).trigger('vtex.modal.hide');
				return false;
			});
		},
		applyAmazingMenu: function() {
			var accountLinks = $('.header-qd-v1-amazing-menu-wrapper .header-qd-v1-account-links');
			accountLinks.children().appendTo(accountLinks.prev('ul'));
			accountLinks.remove();

			$('.header-qd-v1-amazing-menu, .footer-qd-v1-links').QD_amazingMenu();

			$('.header-qd-v1-menu-trigger').click(function(e) {
				$(document.body).toggleClass('qd-am-is-active');
				e.preventDefault();
			});
		},
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});

			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-right"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);
						$.merge($t.parent(), $t.closest('ul')).toggleClass('qd-am-is-active');

						$t.filter(function(){return !$(this).closest('ul').is('.qd-amazing-menu');}).siblings('ul').stop(true, true).slideToggle();
					});

					wrapper.find('> ul > li > .qd-am-dropdown-trigger').click(function() {
						$('.header-qd-v1-amazing-menu-mobile-wrapper').addClass('qd-am-is-active');
						$('.header-qd-v1-amazing-menu-mobile-wrapper').animate({
				          scrollTop: 0
				        }, 200);
					});

					wrapper.find('> ul > li > ul > li:first-child').click(function(e){
						e.preventDefault();
						$(this).parents(".qd-am-is-active").removeClass('qd-am-is-active');
					});
				}
			});

			$('.header-qd-v1-menu-mobile-trigger').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function() {
				$(document.body).removeClass('qd-am-on');
			});
		},
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
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
		applyMosaicBanners: function() {
			$('.mosaic-qd-v1-wrapper .box-banner').QD_mosaicBanners({
				containerWidth: 1326,
				classFourColumn: "col-xs-12 col-sm-6",
				bannerColSecurityMargin: 50
			});
		},
		applySmartCart: function() {
			$('.header-qd-v1-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

			$(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

			var wrapper = $(".qd-sc-wrapper");

			$.QD_smartCart({
				selector: wrapper,
				dropDown:{
					texts: {
						linkCart: "Proceed to checkout",
						cartTotal: '<span class="qd-infoTotalItems">Items: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
					},
					updateOnlyHover: false,
					smartCheckout: true,
					callback: function() {
						$(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>My Cart</h3></div>');
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
					buyButton: "body .prateleira:not(.qd-am) .buy-button"
				}
			});

			// Callback do Quick View
			window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus){
				$.fn.simpleCart(true);
				$(".shelf-qd-v1-buy-button-modal").modal("hide");
				$(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
			};

			$('.header-qd-v1-cart-link').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-cart-show');

				wrapper.height($(window).height());
				wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
			});

			$('.qd_ddc_lightBoxClose').click(function(evt){
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		applyTipBarCarousel: function() {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			wrapper.slick({
				arrows: false,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				infinite: false,
				draggable: false,
				responsive: [
					{
						breakpoint: 1200,
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
		openSearchModal: function() {
			$('.header-qd-v1-search-trigger').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text('- ' + ($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '100');
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-links > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		}
	};

	var Home = {
		init: function() {
			Home.sliderFull();
			Home.applyArtistsCarousel();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sliderFull: function() {
			var wrapper = $('.slider-qd-v1-full');

			wrapper.slick({
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				autoplay: true,
				autoplaySpeed: 9000,
				draggable: false
			});

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applyArtistsCarousel: function() {
			var wrapper = $('.artists-qd-v1-carousel');

			wrapper.slick({
				arrows: false,
				slidesToShow: 6,
				slidesToScroll: 6,
				infinite: false,
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
							centerMode: true,							
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},

					{
						breakpoint: 320,
						settings: {
							centerMode: true,
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}
	};

	var Search = {
		init: function() {
			Search.addFiltersToggleList();
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
		},
		ajaxStop: function() {
			Search.shelfLineFix();		
		},
		windowOnload: function() {},
		addFiltersToggleList: function() {
			var wrapper = $('.search-single-navigator h3');

			$('<span class="qd-expand-filters"><i class="fa fa-plus"></i></span>').click(function(e) {
				$(this).parent().next('ul').toggleClass('qd-is-active');
			}).appendTo(wrapper);
		},
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
			});
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

			// wrapper.find('h3, h4, h5').toggleClass('qd-seach-active-menu');
			// wrapper.find('h3, h4, h5').find("+ ul").stop(true, true).slideToggle();
			// wrapper.find('h3, h4, h5').find("+ div").stop(true, true).slideToggle();

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
		init: function() {
			Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);
			Product.expandGallerySize();
			Product.forceImageZoom();
			Product.openShipping();
			Product.saveAmountFlag();
			Product.setAvailableBodyClass();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		applyCarouselThumb: function() {
			var sliderWrapper = $('.product-qd-v1-image-carrousel'); // Wrapper que será inserido o carousel
			var thumbsWrapper = $('.thumbs').first(); // Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-image-thumbs'); // Wrapper onde foi inserido as thumbs

			sliderWrapper.filter('.slick-initialized').slick('unslick');
			thumbsSliderWrapper.filter('.slick-initialized').slick('unslick');

			var thumbsLi;
			(function cloneThumb () {
				thumbsLi = thumbsWrapper.find('li');
				if(thumbsLi.length < 2){
					thumbsLi.clone().appendTo(thumbsWrapper);
					cloneThumb();
				}
			})();

			thumbsSliderWrapper.html(thumbsWrapper.html());

			thumbsSliderWrapper.find('img').each(function(){
				$t = $(this);
				$t.attr('src', $t.attr('src').replace('-55-55', '-150-150'));
			});

			sliderWrapper.empty();
			thumbsWrapper.find('a').each(function(index){
				$t = $(this);
				$('<div class="qd-slide qd-product-image-' + index + '"><a href="' + $t.attr('rel').replace('-292-292', '-1500-1000') + '"><img src="' + $t.attr('rel').replace('-292-292', '-1500-1000') + '"/></a></div>').appendTo(sliderWrapper);
			});

			var options = {
				slidesToShow: 1,
				slidesToScroll: 1,
				arrows: false,
				centerMode: true,
				dots: true,
				focusOnSelect: true,
				centerPadding: 0
			};
			sliderWrapper.slick($.extend({}, options, {
  				asNavFor: '.product-qd-v1-image-thumbs'
			}));

			thumbsSliderWrapper.addClass('slick-slide').slick($.extend({}, options, {
				arrows: false,
  				asNavFor: '.product-qd-v1-image-carrousel'
			}));
			thumbsSliderWrapper.on('afterChange', function(event, slick, slide){
				thumbsSliderWrapper.find('.ON').removeClass('ON');
				thumbsSliderWrapper.find('.slick-active.slick-center a').addClass('ON');
			}).slick('getSlick').slickGoTo(0);

			sliderWrapper.find('a').click(function(e){e.preventDefault()});
		},
		expandGallerySize: function() {
			$('.product-qd-v1-image-expand').click(function(e) {
				e.preventDefault();
				$('.product-qd-v1-image-carrousel-wrapper').toggleClass('qd-is-active');
				$(this).toggleClass('qd-is-active');
			});
		},
		forceImageZoom: function() {
			try {
				var orig = window.ImageControl;
				window.ImageControl = function() {
					$('ul.thumbs a').each(function() {
						var $t = $(this);
						if ($t.attr('zoom'))
							return;
						var rel = $t.attr('rel');
						if (rel)
							$t.attr('zoom', rel.replace(/(ids\/[0-9]+)[0-9-]+/i, '$1-1000-1000'));
					});
					orig.apply(this, arguments);
				}
			}
			catch (e) {(typeof console !== 'undefined' && typeof console.error === 'function' && console.error('Ops, algo saiu errado como zoom :( . Detalhes: ' + e.message)); }
		},
		openShipping: function() {
			if (typeof window.ShippingValue === 'function')
				$('.product-qd-v1-shipping-title').click(function() {
					window.ShippingValue();
				});
		},
		setAvailableBodyClass: function() {
			function checkVisibleNotify(available) {
				if (available)
					$(document.body).addClass('qd-product-available').removeClass('qd-product-unavailable');
				else
					$(document.body).addClass('qd-product-unavailable').removeClass('qd-product-available');
			}

			$(document).on('skuSelected.vtex', function(e, id, sku) {
				checkVisibleNotify(sku.available);
			});

			checkVisibleNotify(skuJson.available);
		},
		saveAmountFlag: function() {
			var flag = $('.product-qd-v1-stamps-highlight-discount');

			$(window).on('skuSelected.vtex', function(e, sku, data) {
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
		}
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {
			Institutional.openFilterMenu();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		openFilterMenu: function () {
			$('.institucional-qd-v1-menu-toggle').click(function (e) {
				e.preventDefault();

				$(document.body).toggleClass('qd-sn-on');
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
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message)); }

try {
	(function() {
		var body, ajaxStop, windowLoad;

		windowLoad = function() {
			Common.windowOnload();
			if (body.is(".home")) Home.windowOnload();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.windowOnload();
			else if (body.is(".produto")) Product.windowOnload();
			else if (body.is(".listas")) List.windowOnload();
			else if (body.is(".institucional")) Institutional.windowOnload();
			else if (body.is(".orders")) Orders.windowOnload();
		};

		ajaxStop = function() {
			Common.ajaxStop();
			if (body.is(".home")) Home.ajaxStop();
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.ajaxStop();
			else if (body.is(".produto")) Product.ajaxStop();
			else if (body.is(".listas")) List.ajaxStop();
			else if (body.is(".institucional")) Institutional.ajaxStop();
			else if (body.is(".orders")) Orders.ajaxStop();
		};

		$(function() {
			body = $(document.body);
			Common.init();
			if (body.is(".home")) Home.init();
			else if (body.is(".resultado-busca, .departamento, .categoria")){
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
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }

/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();

/* PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);

/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});

/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
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
var _0xf9d5=['object','error','complete','clearQueueDelay','jqXHR','ajax','readyState','data','textStatus','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','alerta','toLowerCase','aviso','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','AvailableQuantity','attr','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','qd-ssa-hide','[data-qd-ssa-text=\x22','length','filter','qd-ssa-show','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','qd-ssa-skus-','skus','split','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','message','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','ragnevalp%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','url','opts','push','success','call','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated'];(function(_0x573632,_0x41f72a){var _0x473c37=function(_0x3fed54){while(--_0x3fed54){_0x573632['push'](_0x573632['shift']());}};_0x473c37(++_0x41f72a);}(_0xf9d5,0x149));var _0x5f9d=function(_0x4072f5,_0x568cd9){_0x4072f5=_0x4072f5-0x0;var _0x191c59=_0xf9d5[_0x4072f5];return _0x191c59;};(function(_0xf2d5eb){if(_0x5f9d('0x0')!==typeof _0xf2d5eb[_0x5f9d('0x1')]){var _0x290ef2={};_0xf2d5eb[_0x5f9d('0x2')]=_0x290ef2;_0xf2d5eb[_0x5f9d('0x1')]=function(_0x27449e){var _0x4df7fd=_0xf2d5eb[_0x5f9d('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x27449e);var _0x59027b=escape(encodeURIComponent(_0x4df7fd[_0x5f9d('0x4')]));_0x290ef2[_0x59027b]=_0x290ef2[_0x59027b]||{};_0x290ef2[_0x59027b][_0x5f9d('0x5')]=_0x290ef2[_0x59027b]['opts']||[];_0x290ef2[_0x59027b][_0x5f9d('0x5')][_0x5f9d('0x6')]({'success':function(_0x46e265,_0x250f6c,_0xcc3772){_0x4df7fd[_0x5f9d('0x7')]['call'](this,_0x46e265,_0x250f6c,_0xcc3772);},'error':function(_0x156129,_0x211098,_0x597974){_0x4df7fd['error'][_0x5f9d('0x8')](this,_0x156129,_0x211098,_0x597974);},'complete':function(_0x261a17,_0x35993b){_0x4df7fd['complete'][_0x5f9d('0x8')](this,_0x261a17,_0x35993b);}});_0x290ef2[_0x59027b][_0x5f9d('0x9')]=_0x290ef2[_0x59027b][_0x5f9d('0x9')]||{'success':{},'error':{},'complete':{}};_0x290ef2[_0x59027b][_0x5f9d('0xa')]=_0x290ef2[_0x59027b]['callbackFns']||{};_0x290ef2[_0x59027b][_0x5f9d('0xa')][_0x5f9d('0xb')]=_0x5f9d('0xc')===typeof _0x290ef2[_0x59027b]['callbackFns'][_0x5f9d('0xb')]?_0x290ef2[_0x59027b][_0x5f9d('0xa')]['successPopulated']:!0x1;_0x290ef2[_0x59027b]['callbackFns'][_0x5f9d('0xd')]=_0x5f9d('0xc')===typeof _0x290ef2[_0x59027b][_0x5f9d('0xa')][_0x5f9d('0xd')]?_0x290ef2[_0x59027b][_0x5f9d('0xa')]['errorPopulated']:!0x1;_0x290ef2[_0x59027b]['callbackFns']['completePopulated']=_0x5f9d('0xc')===typeof _0x290ef2[_0x59027b]['callbackFns'][_0x5f9d('0xe')]?_0x290ef2[_0x59027b]['callbackFns'][_0x5f9d('0xe')]:!0x1;_0x27449e=_0xf2d5eb[_0x5f9d('0x3')]({},_0x4df7fd,{'success':function(_0x2b9da4,_0x55a31c,_0x42e2f9){_0x290ef2[_0x59027b][_0x5f9d('0x9')][_0x5f9d('0x7')]={'data':_0x2b9da4,'textStatus':_0x55a31c,'jqXHR':_0x42e2f9};_0x290ef2[_0x59027b][_0x5f9d('0xa')][_0x5f9d('0xb')]=!0x0;for(var _0xa62826 in _0x290ef2[_0x59027b][_0x5f9d('0x5')])_0x5f9d('0xf')===typeof _0x290ef2[_0x59027b][_0x5f9d('0x5')][_0xa62826]&&(_0x290ef2[_0x59027b]['opts'][_0xa62826]['success']['call'](this,_0x2b9da4,_0x55a31c,_0x42e2f9),_0x290ef2[_0x59027b][_0x5f9d('0x5')][_0xa62826]['success']=function(){});},'error':function(_0xcb239b,_0x5a3472,_0x9d86ce){_0x290ef2[_0x59027b]['parameters']['error']={'errorThrown':_0x9d86ce,'textStatus':_0x5a3472,'jqXHR':_0xcb239b};_0x290ef2[_0x59027b]['callbackFns'][_0x5f9d('0xd')]=!0x0;for(var _0xb27878 in _0x290ef2[_0x59027b][_0x5f9d('0x5')])_0x5f9d('0xf')===typeof _0x290ef2[_0x59027b]['opts'][_0xb27878]&&(_0x290ef2[_0x59027b][_0x5f9d('0x5')][_0xb27878][_0x5f9d('0x10')][_0x5f9d('0x8')](this,_0xcb239b,_0x5a3472,_0x9d86ce),_0x290ef2[_0x59027b][_0x5f9d('0x5')][_0xb27878][_0x5f9d('0x10')]=function(){});},'complete':function(_0x14aaca,_0x2d66cc){_0x290ef2[_0x59027b][_0x5f9d('0x9')][_0x5f9d('0x11')]={'textStatus':_0x2d66cc,'jqXHR':_0x14aaca};_0x290ef2[_0x59027b][_0x5f9d('0xa')]['completePopulated']=!0x0;for(var _0x154a98 in _0x290ef2[_0x59027b][_0x5f9d('0x5')])_0x5f9d('0xf')===typeof _0x290ef2[_0x59027b][_0x5f9d('0x5')][_0x154a98]&&(_0x290ef2[_0x59027b][_0x5f9d('0x5')][_0x154a98][_0x5f9d('0x11')][_0x5f9d('0x8')](this,_0x14aaca,_0x2d66cc),_0x290ef2[_0x59027b][_0x5f9d('0x5')][_0x154a98][_0x5f9d('0x11')]=function(){});isNaN(parseInt(_0x4df7fd['clearQueueDelay']))||setTimeout(function(){_0x290ef2[_0x59027b]['jqXHR']=void 0x0;_0x290ef2[_0x59027b]['opts']=void 0x0;_0x290ef2[_0x59027b][_0x5f9d('0x9')]=void 0x0;_0x290ef2[_0x59027b]['callbackFns']=void 0x0;},_0x4df7fd[_0x5f9d('0x12')]);}});'undefined'===typeof _0x290ef2[_0x59027b][_0x5f9d('0x13')]?_0x290ef2[_0x59027b]['jqXHR']=_0xf2d5eb[_0x5f9d('0x14')](_0x27449e):_0x290ef2[_0x59027b][_0x5f9d('0x13')]&&_0x290ef2[_0x59027b][_0x5f9d('0x13')][_0x5f9d('0x15')]&&0x4==_0x290ef2[_0x59027b][_0x5f9d('0x13')]['readyState']&&(_0x290ef2[_0x59027b][_0x5f9d('0xa')]['successPopulated']&&_0x27449e[_0x5f9d('0x7')](_0x290ef2[_0x59027b]['parameters'][_0x5f9d('0x7')][_0x5f9d('0x16')],_0x290ef2[_0x59027b]['parameters'][_0x5f9d('0x7')][_0x5f9d('0x17')],_0x290ef2[_0x59027b][_0x5f9d('0x9')]['success'][_0x5f9d('0x13')]),_0x290ef2[_0x59027b][_0x5f9d('0xa')][_0x5f9d('0xd')]&&_0x27449e[_0x5f9d('0x10')](_0x290ef2[_0x59027b][_0x5f9d('0x9')]['error'][_0x5f9d('0x13')],_0x290ef2[_0x59027b][_0x5f9d('0x9')][_0x5f9d('0x10')][_0x5f9d('0x17')],_0x290ef2[_0x59027b][_0x5f9d('0x9')][_0x5f9d('0x10')]['errorThrown']),_0x290ef2[_0x59027b][_0x5f9d('0xa')][_0x5f9d('0xe')]&&_0x27449e[_0x5f9d('0x11')](_0x290ef2[_0x59027b]['parameters']['complete'][_0x5f9d('0x13')],_0x290ef2[_0x59027b][_0x5f9d('0x9')][_0x5f9d('0x11')][_0x5f9d('0x17')]));};_0xf2d5eb[_0x5f9d('0x1')]['version']='2.1';}}(jQuery));(function(_0x43b7b9){function _0x3c5737(_0x55ee33,_0x2e3d95){_0x55595b['qdAjax']({'url':_0x5f9d('0x18')+_0x55ee33,'clearQueueDelay':null,'success':_0x2e3d95,'error':function(){_0x4d3288(_0x5f9d('0x19'));}});}var _0x55595b=jQuery;if(_0x5f9d('0x0')!==typeof _0x55595b['fn'][_0x5f9d('0x1a')]){var _0x4d3288=function(_0x24a3c6,_0x148128){if(_0x5f9d('0xf')===typeof console){var _0x2fc689;_0x5f9d('0xf')===typeof _0x24a3c6?(_0x24a3c6[_0x5f9d('0x1b')](_0x5f9d('0x1c')),_0x2fc689=_0x24a3c6):_0x2fc689=[_0x5f9d('0x1c')+_0x24a3c6];_0x5f9d('0x1d')===typeof _0x148128||_0x5f9d('0x1e')!==_0x148128[_0x5f9d('0x1f')]()&&_0x5f9d('0x20')!==_0x148128[_0x5f9d('0x1f')]()?_0x5f9d('0x1d')!==typeof _0x148128&&_0x5f9d('0x21')===_0x148128[_0x5f9d('0x1f')]()?console[_0x5f9d('0x21')][_0x5f9d('0x22')](console,_0x2fc689):console[_0x5f9d('0x10')][_0x5f9d('0x22')](console,_0x2fc689):console[_0x5f9d('0x23')][_0x5f9d('0x22')](console,_0x2fc689);}},_0x4cbce2={},_0x2e5361=function(_0x19f933,_0x13d343){function _0x9afb54(_0x3accf9){try{_0x19f933[_0x5f9d('0x24')](_0x5f9d('0x25'))[_0x5f9d('0x26')]('qd-ssa-sku-selected');var _0x1256c=_0x3accf9[0x0]['SkuSellersInformation'][0x0][_0x5f9d('0x27')];_0x19f933[_0x5f9d('0x28')](_0x5f9d('0x29'),_0x1256c);_0x19f933[_0x5f9d('0x2a')](function(){var _0x19f933=_0x55595b(this)[_0x5f9d('0x2b')](_0x5f9d('0x2c'));if(0x1>_0x1256c)return _0x19f933['hide']()[_0x5f9d('0x26')](_0x5f9d('0x2d'))[_0x5f9d('0x24')]('qd-ssa-show');var _0x3accf9=_0x19f933['filter'](_0x5f9d('0x2e')+_0x1256c+'\x22]');_0x3accf9=_0x3accf9[_0x5f9d('0x2f')]?_0x3accf9:_0x19f933[_0x5f9d('0x30')]('[data-qd-ssa-text=\x22default\x22]');_0x19f933['hide']()[_0x5f9d('0x26')](_0x5f9d('0x2d'))['removeClass'](_0x5f9d('0x31'));_0x3accf9['html']((_0x3accf9[_0x5f9d('0x32')]()||'')[_0x5f9d('0x33')](_0x5f9d('0x34'),_0x1256c));_0x3accf9[_0x5f9d('0x35')]()[_0x5f9d('0x26')](_0x5f9d('0x31'))[_0x5f9d('0x24')](_0x5f9d('0x2d'));});}catch(_0x2193a4){_0x4d3288([_0x5f9d('0x36'),_0x2193a4['message']]);}}if(_0x19f933[_0x5f9d('0x2f')]){_0x19f933[_0x5f9d('0x26')]('qd-ssa-on');_0x19f933[_0x5f9d('0x26')](_0x5f9d('0x25'));try{_0x19f933[_0x5f9d('0x26')](_0x5f9d('0x37')+vtxctx[_0x5f9d('0x38')][_0x5f9d('0x39')](';')[_0x5f9d('0x2f')]);}catch(_0x30153b){_0x4d3288(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0x30153b['message']]);}_0x55595b(window)['on'](_0x5f9d('0x3a'),function(_0x1a8281,_0x2c2de6,_0x101616){try{_0x3c5737(_0x101616[_0x5f9d('0x3b')],function(_0x222a69){_0x9afb54(_0x222a69);0x1===vtxctx[_0x5f9d('0x38')][_0x5f9d('0x39')](';')[_0x5f9d('0x2f')]&&0x0==_0x222a69[0x0]['SkuSellersInformation'][0x0]['AvailableQuantity']&&_0x55595b(window)[_0x5f9d('0x3c')](_0x5f9d('0x3d'));});}catch(_0x25c063){_0x4d3288([_0x5f9d('0x3e'),_0x25c063[_0x5f9d('0x3f')]]);}});_0x55595b(window)[_0x5f9d('0x40')](_0x5f9d('0x41'));_0x55595b(window)['on'](_0x5f9d('0x3d'),function(){_0x19f933[_0x5f9d('0x26')](_0x5f9d('0x42'))['hide']();});}};_0x43b7b9=function(_0x4e2814){var _0x250d06={'i':_0x5f9d('0x43')};return function(_0x45b5a6){var _0x5630ac=function(_0x22cc1e){return _0x22cc1e;};var _0x560290=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x45b5a6=_0x45b5a6['d'+_0x560290[0x10]+'c'+_0x560290[0x11]+'m'+_0x5630ac(_0x560290[0x1])+'n'+_0x560290[0xd]]['l'+_0x560290[0x12]+'c'+_0x560290[0x0]+'ti'+_0x5630ac('o')+'n'];var _0x13e4c7=function(_0x48be3d){return escape(encodeURIComponent(_0x48be3d['replace'](/\./g,'¨')[_0x5f9d('0x33')](/[a-zA-Z]/g,function(_0x537093){return String[_0x5f9d('0x44')](('Z'>=_0x537093?0x5a:0x7a)>=(_0x537093=_0x537093[_0x5f9d('0x45')](0x0)+0xd)?_0x537093:_0x537093-0x1a);})));};var _0x353993=_0x13e4c7(_0x45b5a6[[_0x560290[0x9],_0x5630ac('o'),_0x560290[0xc],_0x560290[_0x5630ac(0xd)]][_0x5f9d('0x46')]('')]);_0x13e4c7=_0x13e4c7((window[['js',_0x5630ac('no'),'m',_0x560290[0x1],_0x560290[0x4][_0x5f9d('0x47')](),_0x5f9d('0x48')]['join']('')]||_0x5f9d('0x49'))+['.v',_0x560290[0xd],'e',_0x5630ac('x'),'co',_0x5630ac('mm'),'erc',_0x560290[0x1],'.c',_0x5630ac('o'),'m.',_0x560290[0x13],'r'][_0x5f9d('0x46')](''));for(var _0x5d0cda in _0x250d06){if(_0x13e4c7===_0x5d0cda+_0x250d06[_0x5d0cda]||_0x353993===_0x5d0cda+_0x250d06[_0x5d0cda]){var _0x557e65='tr'+_0x560290[0x11]+'e';break;}_0x557e65='f'+_0x560290[0x0]+'ls'+_0x5630ac(_0x560290[0x1])+'';}_0x5630ac=!0x1;-0x1<_0x45b5a6[[_0x560290[0xc],'e',_0x560290[0x0],'rc',_0x560290[0x9]][_0x5f9d('0x46')]('')][_0x5f9d('0x4a')](_0x5f9d('0x4b'))&&(_0x5630ac=!0x0);return[_0x557e65,_0x5630ac];}(_0x4e2814);}(window);if(!eval(_0x43b7b9[0x0]))return _0x43b7b9[0x1]?_0x4d3288(_0x5f9d('0x4c')):!0x1;_0x55595b['fn']['QD_smartStockAvailable']=function(_0x5e5dd7){var _0x50ebc=_0x55595b(this);_0x5e5dd7=_0x55595b[_0x5f9d('0x3')](!0x0,{},_0x4cbce2,_0x5e5dd7);_0x50ebc[_0x5f9d('0x4d')]=new _0x2e5361(_0x50ebc,_0x5e5dd7);try{_0x5f9d('0xf')===typeof _0x55595b['fn'][_0x5f9d('0x1a')]['initialSkuSelected']&&_0x55595b(window)[_0x5f9d('0x3c')]('QuatroDigital.ssa.skuSelected',[_0x55595b['fn'][_0x5f9d('0x1a')][_0x5f9d('0x4e')][_0x5f9d('0x4f')],_0x55595b['fn'][_0x5f9d('0x1a')]['initialSkuSelected'][_0x5f9d('0x3b')]]);}catch(_0x118908){_0x4d3288([_0x5f9d('0x50'),_0x118908[_0x5f9d('0x3f')]]);}_0x55595b['fn']['QD_smartStockAvailable'][_0x5f9d('0x51')]&&_0x55595b(window)[_0x5f9d('0x3c')](_0x5f9d('0x3d'));return _0x50ebc;};_0x55595b(window)['on'](_0x5f9d('0x41'),function(_0x42fcdc,_0x3efb29,_0xc1e2bf){try{_0x55595b['fn']['QD_smartStockAvailable'][_0x5f9d('0x4e')]={'prod':_0x3efb29,'sku':_0xc1e2bf},_0x55595b(this)[_0x5f9d('0x40')](_0x42fcdc);}catch(_0x2a510a){_0x4d3288([_0x5f9d('0x52'),_0x2a510a[_0x5f9d('0x3f')]]);}});_0x55595b(window)['on'](_0x5f9d('0x53'),function(_0x28eaab,_0x215900,_0x29682e){try{for(var _0xfe6a18=_0x29682e[_0x5f9d('0x2f')],_0x1632ac=_0x215900=0x0;_0x1632ac<_0xfe6a18&&!_0x29682e[_0x1632ac]['available'];_0x1632ac++)_0x215900+=0x1;_0xfe6a18<=_0x215900&&(_0x55595b['fn'][_0x5f9d('0x1a')][_0x5f9d('0x51')]=!0x0);_0x55595b(this)[_0x5f9d('0x40')](_0x28eaab);}catch(_0x1a8e24){_0x4d3288([_0x5f9d('0x54'),_0x1a8e24['message']]);}});_0x55595b(function(){_0x55595b(_0x5f9d('0x55'))[_0x5f9d('0x1a')]();});}}(window));
var _0xd5fd=['.box-banner','clone','insertBefore','hide','text','attr','trim','[class*=\x27colunas\x27]','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada',':not(ul)','qd-am-elem-','first','replaceSpecialChars','>li','qdAmAddNdx','qd-amazing-menu','qd-am-dropdown','children','qd-am-level-','add','qd-am-','-li','call','QuatroDigital.am.callback','.qd_amazing_menu_auto','getParent','closest','/qd-amazing-menu','undefined','info','warn','object','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','error','join','each','qd-am-li-','addClass','qd-am-first','last','qd-am-last','QD_amazingMenu','replace','fromCharCode','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','find','.qd_am_code','filter','.qd-am-banner','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','data-qdam-value'];(function(_0x4fb785,_0x3557f7){var _0xd812fc=function(_0x4df084){while(--_0x4df084){_0x4fb785['push'](_0x4fb785['shift']());}};_0xd812fc(++_0x3557f7);}(_0xd5fd,0x1d0));var _0xdd5f=function(_0x56c2aa,_0x2a1d7f){_0x56c2aa=_0x56c2aa-0x0;var _0x564688=_0xd5fd[_0x56c2aa];return _0x564688;};(function(_0x4adc91){_0x4adc91['fn'][_0xdd5f('0x0')]=_0x4adc91['fn'][_0xdd5f('0x1')];}(jQuery));(function(_0x35174c){var _0xb9fa48;var _0x4230c9=jQuery;if('function'!==typeof _0x4230c9['fn']['QD_amazingMenu']){var _0x55ab42={'url':_0xdd5f('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x440091=function(_0x42c2ba,_0x5e29ee){if('object'===typeof console&&_0xdd5f('0x3')!==typeof console['error']&&'undefined'!==typeof console[_0xdd5f('0x4')]&&'undefined'!==typeof console[_0xdd5f('0x5')]){var _0x43d0c0;_0xdd5f('0x6')===typeof _0x42c2ba?(_0x42c2ba[_0xdd5f('0x7')](_0xdd5f('0x8')),_0x43d0c0=_0x42c2ba):_0x43d0c0=[_0xdd5f('0x8')+_0x42c2ba];if(_0xdd5f('0x3')===typeof _0x5e29ee||_0xdd5f('0x9')!==_0x5e29ee[_0xdd5f('0xa')]()&&_0xdd5f('0xb')!==_0x5e29ee[_0xdd5f('0xa')]())if(_0xdd5f('0x3')!==typeof _0x5e29ee&&_0xdd5f('0x4')===_0x5e29ee[_0xdd5f('0xa')]())try{console['info'][_0xdd5f('0xc')](console,_0x43d0c0);}catch(_0x4a0b3d){try{console['info'](_0x43d0c0['join']('\x0a'));}catch(_0x3e8ecc){}}else try{console[_0xdd5f('0xd')][_0xdd5f('0xc')](console,_0x43d0c0);}catch(_0x53f96b){try{console['error'](_0x43d0c0[_0xdd5f('0xe')]('\x0a'));}catch(_0x18856f){}}else try{console[_0xdd5f('0x5')][_0xdd5f('0xc')](console,_0x43d0c0);}catch(_0x43e8ec){try{console[_0xdd5f('0x5')](_0x43d0c0[_0xdd5f('0xe')]('\x0a'));}catch(_0x41363b){}}}};_0x4230c9['fn']['qdAmAddNdx']=function(){var _0x4fde5a=_0x4230c9(this);_0x4fde5a[_0xdd5f('0xf')](function(_0x1540b3){_0x4230c9(this)['addClass'](_0xdd5f('0x10')+_0x1540b3);});_0x4fde5a['first']()[_0xdd5f('0x11')](_0xdd5f('0x12'));_0x4fde5a[_0xdd5f('0x13')]()[_0xdd5f('0x11')](_0xdd5f('0x14'));return _0x4fde5a;};_0x4230c9['fn'][_0xdd5f('0x15')]=function(){};_0x35174c=function(_0x2e0d37){var _0x149993={'i':'ragnevalp%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x1347db){var _0x5797bd=function(_0x4d24f4){return _0x4d24f4;};var _0x953de8=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1347db=_0x1347db['d'+_0x953de8[0x10]+'c'+_0x953de8[0x11]+'m'+_0x5797bd(_0x953de8[0x1])+'n'+_0x953de8[0xd]]['l'+_0x953de8[0x12]+'c'+_0x953de8[0x0]+'ti'+_0x5797bd('o')+'n'];var _0x396e5f=function(_0x3d9056){return escape(encodeURIComponent(_0x3d9056[_0xdd5f('0x16')](/\./g,'¨')[_0xdd5f('0x16')](/[a-zA-Z]/g,function(_0x59ef67){return String[_0xdd5f('0x17')](('Z'>=_0x59ef67?0x5a:0x7a)>=(_0x59ef67=_0x59ef67['charCodeAt'](0x0)+0xd)?_0x59ef67:_0x59ef67-0x1a);})));};var _0x145b14=_0x396e5f(_0x1347db[[_0x953de8[0x9],_0x5797bd('o'),_0x953de8[0xc],_0x953de8[_0x5797bd(0xd)]][_0xdd5f('0xe')]('')]);_0x396e5f=_0x396e5f((window[['js',_0x5797bd('no'),'m',_0x953de8[0x1],_0x953de8[0x4]['toUpperCase'](),_0xdd5f('0x18')][_0xdd5f('0xe')]('')]||_0xdd5f('0x19'))+['.v',_0x953de8[0xd],'e',_0x5797bd('x'),'co',_0x5797bd('mm'),_0xdd5f('0x1a'),_0x953de8[0x1],'.c',_0x5797bd('o'),'m.',_0x953de8[0x13],'r'][_0xdd5f('0xe')](''));for(var _0x355582 in _0x149993){if(_0x396e5f===_0x355582+_0x149993[_0x355582]||_0x145b14===_0x355582+_0x149993[_0x355582]){var _0x216204='tr'+_0x953de8[0x11]+'e';break;}_0x216204='f'+_0x953de8[0x0]+'ls'+_0x5797bd(_0x953de8[0x1])+'';}_0x5797bd=!0x1;-0x1<_0x1347db[[_0x953de8[0xc],'e',_0x953de8[0x0],'rc',_0x953de8[0x9]]['join']('')][_0xdd5f('0x1b')](_0xdd5f('0x1c'))&&(_0x5797bd=!0x0);return[_0x216204,_0x5797bd];}(_0x2e0d37);}(window);if(!eval(_0x35174c[0x0]))return _0x35174c[0x1]?_0x440091('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x26ba84=function(_0x44d5f9){var _0x137a0f=_0x44d5f9[_0xdd5f('0x1d')](_0xdd5f('0x1e'));var _0x11ae33=_0x137a0f[_0xdd5f('0x1f')](_0xdd5f('0x20'));var _0x5b90ad=_0x137a0f[_0xdd5f('0x1f')]('.qd-am-collection');if(_0x11ae33[_0xdd5f('0x21')]||_0x5b90ad[_0xdd5f('0x21')])_0x11ae33[_0xdd5f('0x22')]()[_0xdd5f('0x11')](_0xdd5f('0x23')),_0x5b90ad[_0xdd5f('0x22')]()[_0xdd5f('0x11')](_0xdd5f('0x24')),_0x4230c9['qdAjax']({'url':_0xb9fa48[_0xdd5f('0x25')],'dataType':_0xdd5f('0x26'),'success':function(_0x30f4e9){var _0x5ce503=_0x4230c9(_0x30f4e9);_0x11ae33[_0xdd5f('0xf')](function(){var _0x30f4e9=_0x4230c9(this);var _0x10e202=_0x5ce503[_0xdd5f('0x1d')]('img[alt=\x27'+_0x30f4e9['attr'](_0xdd5f('0x27'))+'\x27]');_0x10e202[_0xdd5f('0x21')]&&(_0x10e202[_0xdd5f('0xf')](function(){_0x4230c9(this)[_0xdd5f('0x0')](_0xdd5f('0x28'))[_0xdd5f('0x29')]()[_0xdd5f('0x2a')](_0x30f4e9);}),_0x30f4e9[_0xdd5f('0x2b')]());})[_0xdd5f('0x11')]('qd-am-content-loaded');_0x5b90ad[_0xdd5f('0xf')](function(){var _0x30f4e9={};var _0x3c68e2=_0x4230c9(this);_0x5ce503['find']('h2')[_0xdd5f('0xf')](function(){if(_0x4230c9(this)[_0xdd5f('0x2c')]()['trim']()[_0xdd5f('0xa')]()==_0x3c68e2[_0xdd5f('0x2d')](_0xdd5f('0x27'))[_0xdd5f('0x2e')]()['toLowerCase']())return _0x30f4e9=_0x4230c9(this),!0x1;});_0x30f4e9[_0xdd5f('0x21')]&&(_0x30f4e9[_0xdd5f('0xf')](function(){_0x4230c9(this)[_0xdd5f('0x0')](_0xdd5f('0x2f'))[_0xdd5f('0x29')]()[_0xdd5f('0x2a')](_0x3c68e2);}),_0x3c68e2[_0xdd5f('0x2b')]());})[_0xdd5f('0x11')](_0xdd5f('0x30'));},'error':function(){_0x440091(_0xdd5f('0x31')+_0xb9fa48['url']+_0xdd5f('0x32'));},'complete':function(){_0xb9fa48[_0xdd5f('0x33')]['call'](this);_0x4230c9(window)[_0xdd5f('0x34')](_0xdd5f('0x35'),_0x44d5f9);},'clearQueueDelay':0xbb8});};_0x4230c9[_0xdd5f('0x15')]=function(_0x562bff){var _0x5dbe7e=_0x562bff[_0xdd5f('0x1d')](_0xdd5f('0x36'))[_0xdd5f('0xf')](function(){var _0x1296a6=_0x4230c9(this);if(!_0x1296a6['length'])return _0x440091([_0xdd5f('0x37'),_0x562bff],_0xdd5f('0x9'));_0x1296a6['find']('li\x20>ul')[_0xdd5f('0x22')]()[_0xdd5f('0x11')]('qd-am-has-ul');_0x1296a6[_0xdd5f('0x1d')]('li')[_0xdd5f('0xf')](function(){var _0x518c3d=_0x4230c9(this);var _0x4f2b14=_0x518c3d['children'](_0xdd5f('0x38'));_0x4f2b14[_0xdd5f('0x21')]&&_0x518c3d[_0xdd5f('0x11')](_0xdd5f('0x39')+_0x4f2b14[_0xdd5f('0x3a')]()[_0xdd5f('0x2c')]()['trim']()[_0xdd5f('0x3b')]()[_0xdd5f('0x16')](/\./g,'')['replace'](/\s/g,'-')[_0xdd5f('0xa')]());});var _0x43a39a=_0x1296a6[_0xdd5f('0x1d')](_0xdd5f('0x3c'))[_0xdd5f('0x3d')]();_0x1296a6[_0xdd5f('0x11')](_0xdd5f('0x3e'));_0x43a39a=_0x43a39a[_0xdd5f('0x1d')]('>ul');_0x43a39a[_0xdd5f('0xf')](function(){var _0x4d0233=_0x4230c9(this);_0x4d0233[_0xdd5f('0x1d')](_0xdd5f('0x3c'))[_0xdd5f('0x3d')]()[_0xdd5f('0x11')]('qd-am-column');_0x4d0233['addClass']('qd-am-dropdown-menu');_0x4d0233[_0xdd5f('0x22')]()[_0xdd5f('0x11')](_0xdd5f('0x3f'));});_0x43a39a[_0xdd5f('0x11')](_0xdd5f('0x3f'));var _0x24a604=0x0,_0x35174c=function(_0xfd90aa){_0x24a604+=0x1;_0xfd90aa=_0xfd90aa[_0xdd5f('0x40')]('li')[_0xdd5f('0x40')]('*');_0xfd90aa[_0xdd5f('0x21')]&&(_0xfd90aa[_0xdd5f('0x11')](_0xdd5f('0x41')+_0x24a604),_0x35174c(_0xfd90aa));};_0x35174c(_0x1296a6);_0x1296a6[_0xdd5f('0x42')](_0x1296a6[_0xdd5f('0x1d')]('ul'))['each'](function(){var _0x8f04db=_0x4230c9(this);_0x8f04db[_0xdd5f('0x11')](_0xdd5f('0x43')+_0x8f04db[_0xdd5f('0x40')]('li')['length']+_0xdd5f('0x44'));});});_0x26ba84(_0x5dbe7e);_0xb9fa48['callback'][_0xdd5f('0x45')](this);_0x4230c9(window)[_0xdd5f('0x34')](_0xdd5f('0x46'),_0x562bff);};_0x4230c9['fn'][_0xdd5f('0x15')]=function(_0x3795ed){var _0x5dcfbc=_0x4230c9(this);if(!_0x5dcfbc['length'])return _0x5dcfbc;_0xb9fa48=_0x4230c9['extend']({},_0x55ab42,_0x3795ed);_0x5dcfbc['exec']=new _0x4230c9['QD_amazingMenu'](_0x4230c9(this));return _0x5dcfbc;};_0x4230c9(function(){_0x4230c9(_0xdd5f('0x47'))[_0xdd5f('0x15')]();});}}(this));
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
var _0x5f2f=['Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','addClass','getOrderForm','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','cartIsEmpty','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','each','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-quantity','quantity','insertProdImg','.qd-ddc-image','imageUrl','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','[data-sku=\x27','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','timeRemoveNewItemClass','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','string','https','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','click.qd_ddc_minus','keyup.qd_ddc_change','.qd-ddc-prodRow','removeProduct','stop','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dias\x20útéis','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','tbody','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','fail','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','QD_buyButton','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Oooops!\x20','message','object','info','warn','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','fromCharCode','charCodeAt','toUpperCase','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyCode','body','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','.qd-ddc-cep-close','hide','target','shippingCalculate','.qd-ddc-cep','updateOnlyHover','getCartInfoByUrl','simpleCart','cartTotal','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','html','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','allTotal','items'];(function(_0x431d06,_0x5b8fae){var _0xf3e711=function(_0x123e58){while(--_0x123e58){_0x431d06['push'](_0x431d06['shift']());}};_0xf3e711(++_0x5b8fae);}(_0x5f2f,0x7b));var _0xf5f2=function(_0x34af12,_0x138b46){_0x34af12=_0x34af12-0x0;var _0x1a52c6=_0x5f2f[_0x34af12];return _0x1a52c6;};(function(_0x16d26d){_0x16d26d['fn'][_0xf5f2('0x0')]=_0x16d26d['fn'][_0xf5f2('0x1')];}(jQuery));function qd_number_format(_0x107cf,_0x501fbd,_0x4854b6,_0x1665c7){_0x107cf=(_0x107cf+'')[_0xf5f2('0x2')](/[^0-9+\-Ee.]/g,'');_0x107cf=isFinite(+_0x107cf)?+_0x107cf:0x0;_0x501fbd=isFinite(+_0x501fbd)?Math[_0xf5f2('0x3')](_0x501fbd):0x0;_0x1665c7=_0xf5f2('0x4')===typeof _0x1665c7?',':_0x1665c7;_0x4854b6=_0xf5f2('0x4')===typeof _0x4854b6?'.':_0x4854b6;var _0x466882='',_0x466882=function(_0x46cd9c,_0x2ec345){var _0x501fbd=Math[_0xf5f2('0x5')](0xa,_0x2ec345);return''+(Math[_0xf5f2('0x6')](_0x46cd9c*_0x501fbd)/_0x501fbd)[_0xf5f2('0x7')](_0x2ec345);},_0x466882=(_0x501fbd?_0x466882(_0x107cf,_0x501fbd):''+Math['round'](_0x107cf))[_0xf5f2('0x8')]('.');0x3<_0x466882[0x0]['length']&&(_0x466882[0x0]=_0x466882[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x1665c7));(_0x466882[0x1]||'')[_0xf5f2('0x9')]<_0x501fbd&&(_0x466882[0x1]=_0x466882[0x1]||'',_0x466882[0x1]+=Array(_0x501fbd-_0x466882[0x1][_0xf5f2('0x9')]+0x1)['join']('0'));return _0x466882[_0xf5f2('0xa')](_0x4854b6);};(function(){try{window[_0xf5f2('0xb')]=window[_0xf5f2('0xb')]||{},window[_0xf5f2('0xb')][_0xf5f2('0xc')]=window[_0xf5f2('0xb')]['callback']||$[_0xf5f2('0xd')]();}catch(_0xea612c){_0xf5f2('0x4')!==typeof console&&_0xf5f2('0xe')===typeof console[_0xf5f2('0xf')]&&console['error'](_0xf5f2('0x10'),_0xea612c[_0xf5f2('0x11')]);}}());(function(_0x17d656){try{var _0x1b6dd2=jQuery,_0x23e23a=function(_0x3a9dbb,_0xdb61b3){if(_0xf5f2('0x12')===typeof console&&_0xf5f2('0x4')!==typeof console[_0xf5f2('0xf')]&&_0xf5f2('0x4')!==typeof console[_0xf5f2('0x13')]&&_0xf5f2('0x4')!==typeof console[_0xf5f2('0x14')]){var _0x3cf5ea;_0xf5f2('0x12')===typeof _0x3a9dbb?(_0x3a9dbb[_0xf5f2('0x15')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x3cf5ea=_0x3a9dbb):_0x3cf5ea=[_0xf5f2('0x16')+_0x3a9dbb];if(_0xf5f2('0x4')===typeof _0xdb61b3||'alerta'!==_0xdb61b3['toLowerCase']()&&_0xf5f2('0x17')!==_0xdb61b3[_0xf5f2('0x18')]())if('undefined'!==typeof _0xdb61b3&&_0xf5f2('0x13')===_0xdb61b3[_0xf5f2('0x18')]())try{console[_0xf5f2('0x13')][_0xf5f2('0x19')](console,_0x3cf5ea);}catch(_0x36f1cb){try{console['info'](_0x3cf5ea[_0xf5f2('0xa')]('\x0a'));}catch(_0x4669a6){}}else try{console[_0xf5f2('0xf')][_0xf5f2('0x19')](console,_0x3cf5ea);}catch(_0x287ad5){try{console['error'](_0x3cf5ea['join']('\x0a'));}catch(_0x5f1124){}}else try{console[_0xf5f2('0x14')][_0xf5f2('0x19')](console,_0x3cf5ea);}catch(_0x1a5bb3){try{console[_0xf5f2('0x14')](_0x3cf5ea[_0xf5f2('0xa')]('\x0a'));}catch(_0x13a3be){}}}};window[_0xf5f2('0x1a')]=window[_0xf5f2('0x1a')]||{};window['_QuatroDigital_DropDown'][_0xf5f2('0x1b')]=!0x0;_0x1b6dd2[_0xf5f2('0x1c')]=function(){};_0x1b6dd2['fn'][_0xf5f2('0x1c')]=function(){return{'fn':new _0x1b6dd2()};};var _0x31bfcb=function(_0x198c73){var _0x477604={'i':'ragnevalp%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x53cb96){var _0x22c826=function(_0x14c829){return _0x14c829;};var _0x11c771=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x53cb96=_0x53cb96['d'+_0x11c771[0x10]+'c'+_0x11c771[0x11]+'m'+_0x22c826(_0x11c771[0x1])+'n'+_0x11c771[0xd]]['l'+_0x11c771[0x12]+'c'+_0x11c771[0x0]+'ti'+_0x22c826('o')+'n'];var _0x5027ab=function(_0x5a2c7e){return escape(encodeURIComponent(_0x5a2c7e[_0xf5f2('0x2')](/\./g,'¨')[_0xf5f2('0x2')](/[a-zA-Z]/g,function(_0x17394a){return String[_0xf5f2('0x1d')](('Z'>=_0x17394a?0x5a:0x7a)>=(_0x17394a=_0x17394a[_0xf5f2('0x1e')](0x0)+0xd)?_0x17394a:_0x17394a-0x1a);})));};var _0x54c0c8=_0x5027ab(_0x53cb96[[_0x11c771[0x9],_0x22c826('o'),_0x11c771[0xc],_0x11c771[_0x22c826(0xd)]]['join']('')]);_0x5027ab=_0x5027ab((window[['js',_0x22c826('no'),'m',_0x11c771[0x1],_0x11c771[0x4][_0xf5f2('0x1f')](),'ite'][_0xf5f2('0xa')]('')]||'---')+['.v',_0x11c771[0xd],'e',_0x22c826('x'),'co',_0x22c826('mm'),_0xf5f2('0x20'),_0x11c771[0x1],'.c',_0x22c826('o'),'m.',_0x11c771[0x13],'r'][_0xf5f2('0xa')](''));for(var _0x7b6817 in _0x477604){if(_0x5027ab===_0x7b6817+_0x477604[_0x7b6817]||_0x54c0c8===_0x7b6817+_0x477604[_0x7b6817]){var _0x428770='tr'+_0x11c771[0x11]+'e';break;}_0x428770='f'+_0x11c771[0x0]+'ls'+_0x22c826(_0x11c771[0x1])+'';}_0x22c826=!0x1;-0x1<_0x53cb96[[_0x11c771[0xc],'e',_0x11c771[0x0],'rc',_0x11c771[0x9]][_0xf5f2('0xa')]('')][_0xf5f2('0x21')](_0xf5f2('0x22'))&&(_0x22c826=!0x0);return[_0x428770,_0x22c826];}(_0x198c73);}(window);if(!eval(_0x31bfcb[0x0]))return _0x31bfcb[0x1]?_0x23e23a(_0xf5f2('0x23')):!0x1;_0x1b6dd2['QD_dropDownCart']=function(_0x4149e6,_0x43e4ff){var _0x4590ec=_0x1b6dd2(_0x4149e6);if(!_0x4590ec[_0xf5f2('0x9')])return _0x4590ec;var _0x1408b9=_0x1b6dd2[_0xf5f2('0x24')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xf5f2('0x25'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0xf5f2('0x26'),'emptyCart':_0xf5f2('0x27'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0xf5f2('0x28')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x4b8c42){return _0x4b8c42[_0xf5f2('0x29')]||_0x4b8c42[_0xf5f2('0x2a')];},'callback':function(){},'callbackProductsList':function(){}},_0x43e4ff);_0x1b6dd2('');var _0x2a2c31=this;if(_0x1408b9[_0xf5f2('0x2b')]){var _0x59a6dd=!0x1;'undefined'===typeof window[_0xf5f2('0x2c')]&&(_0x23e23a(_0xf5f2('0x2d')),_0x1b6dd2[_0xf5f2('0x2e')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0xf5f2('0x2f'),'error':function(){_0x23e23a('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x59a6dd=!0x0;}}));if(_0x59a6dd)return _0x23e23a(_0xf5f2('0x30'));}if('object'===typeof window[_0xf5f2('0x2c')]&&_0xf5f2('0x4')!==typeof window['vtexjs'][_0xf5f2('0x31')])var _0x17d656=window[_0xf5f2('0x2c')][_0xf5f2('0x31')];else if('object'===typeof vtex&&'object'===typeof vtex[_0xf5f2('0x31')]&&_0xf5f2('0x4')!==typeof vtex[_0xf5f2('0x31')][_0xf5f2('0x32')])_0x17d656=new vtex[(_0xf5f2('0x31'))][(_0xf5f2('0x32'))]();else return _0x23e23a(_0xf5f2('0x33'));_0x2a2c31['cartContainer']=_0xf5f2('0x34');var _0x3b4ea6=function(_0x536501){_0x1b6dd2(this)[_0xf5f2('0x35')](_0x536501);_0x536501[_0xf5f2('0x36')](_0xf5f2('0x37'))[_0xf5f2('0x38')](_0x1b6dd2(_0xf5f2('0x39')))['on'](_0xf5f2('0x3a'),function(){_0x4590ec[_0xf5f2('0x3b')](_0xf5f2('0x3c'));_0x1b6dd2(document['body'])[_0xf5f2('0x3b')](_0xf5f2('0x3d'));});_0x1b6dd2(document)[_0xf5f2('0x3e')]('keyup.qd_ddc_closeFn')['on']('keyup.qd_ddc_closeFn',function(_0x59eb00){0x1b==_0x59eb00[_0xf5f2('0x3f')]&&(_0x4590ec[_0xf5f2('0x3b')]('qd-bb-lightBoxProdAdd'),_0x1b6dd2(document[_0xf5f2('0x40')])[_0xf5f2('0x3b')](_0xf5f2('0x3d')));});var _0x31f86c=_0x536501[_0xf5f2('0x36')](_0xf5f2('0x41'));_0x536501[_0xf5f2('0x36')](_0xf5f2('0x42'))['on'](_0xf5f2('0x43'),function(){_0x2a2c31[_0xf5f2('0x44')]('-',void 0x0,void 0x0,_0x31f86c);return!0x1;});_0x536501[_0xf5f2('0x36')](_0xf5f2('0x45'))['on'](_0xf5f2('0x46'),function(){_0x2a2c31[_0xf5f2('0x44')](void 0x0,void 0x0,void 0x0,_0x31f86c);return!0x1;});var _0x4faeed=_0x536501[_0xf5f2('0x36')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x536501[_0xf5f2('0x36')](_0xf5f2('0x47'))[_0xf5f2('0x48')]('')['on'](_0xf5f2('0x49'),function(_0x31bf0e){_0x2a2c31[_0xf5f2('0x4a')](_0x1b6dd2(this));0xd==_0x31bf0e['keyCode']&&_0x536501[_0xf5f2('0x36')](_0xf5f2('0x4b'))[_0xf5f2('0x4c')]();});_0x536501[_0xf5f2('0x36')](_0xf5f2('0x4d'))[_0xf5f2('0x4c')](function(_0xf638ff){_0xf638ff[_0xf5f2('0x4e')]();_0x4faeed['toggle']();});_0x536501[_0xf5f2('0x36')](_0xf5f2('0x4f'))[_0xf5f2('0x4c')](function(_0x492eea){_0x492eea[_0xf5f2('0x4e')]();_0x4faeed[_0xf5f2('0x50')]();});_0x1b6dd2(document)[_0xf5f2('0x3e')]('click._QD_DDC_closeShipping')['on']('click._QD_DDC_closeShipping',function(_0x7bb942){_0x1b6dd2(_0x7bb942[_0xf5f2('0x51')])['closest'](_0x536501[_0xf5f2('0x36')]('.qd-ddc-cep-tooltip'))[_0xf5f2('0x9')]||_0x4faeed['hide']();});_0x536501[_0xf5f2('0x36')]('.qd-ddc-cep-ok')[_0xf5f2('0x4c')](function(_0xb8ea3a){_0xb8ea3a[_0xf5f2('0x4e')]();_0x2a2c31[_0xf5f2('0x52')](_0x536501['find'](_0xf5f2('0x53')));});if(_0x1408b9[_0xf5f2('0x54')]){var _0x43e4ff=0x0;_0x1b6dd2(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x536501=function(){window[_0xf5f2('0x1a')]['allowUpdate']&&(_0x2a2c31[_0xf5f2('0x55')](),window[_0xf5f2('0x1a')][_0xf5f2('0x1b')]=!0x1,_0x1b6dd2['fn'][_0xf5f2('0x56')](!0x0),_0x2a2c31['cartIsEmpty']());};_0x43e4ff=setInterval(function(){_0x536501();},0x258);_0x536501();});_0x1b6dd2(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x43e4ff);});}};var _0x12550f=function(_0xa3cc67){_0xa3cc67=_0x1b6dd2(_0xa3cc67);_0x1408b9['texts'][_0xf5f2('0x57')]=_0x1408b9[_0xf5f2('0x58')][_0xf5f2('0x57')][_0xf5f2('0x2')](_0xf5f2('0x59'),_0xf5f2('0x5a'));_0x1408b9[_0xf5f2('0x58')]['cartTotal']=_0x1408b9['texts'][_0xf5f2('0x57')][_0xf5f2('0x2')](_0xf5f2('0x5b'),_0xf5f2('0x5c'));_0x1408b9[_0xf5f2('0x58')]['cartTotal']=_0x1408b9[_0xf5f2('0x58')][_0xf5f2('0x57')][_0xf5f2('0x2')]('#shipping',_0xf5f2('0x5d'));_0x1408b9['texts'][_0xf5f2('0x57')]=_0x1408b9[_0xf5f2('0x58')][_0xf5f2('0x57')][_0xf5f2('0x2')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0xa3cc67[_0xf5f2('0x36')]('.qd-ddc-viewCart')[_0xf5f2('0x5e')](_0x1408b9[_0xf5f2('0x58')]['linkCart']);_0xa3cc67[_0xf5f2('0x36')](_0xf5f2('0x5f'))[_0xf5f2('0x5e')](_0x1408b9['texts'][_0xf5f2('0x60')]);_0xa3cc67[_0xf5f2('0x36')](_0xf5f2('0x61'))[_0xf5f2('0x5e')](_0x1408b9['texts'][_0xf5f2('0x62')]);_0xa3cc67['find'](_0xf5f2('0x63'))[_0xf5f2('0x5e')](_0x1408b9[_0xf5f2('0x58')][_0xf5f2('0x57')]);_0xa3cc67[_0xf5f2('0x36')]('.qd-ddc-shipping')[_0xf5f2('0x5e')](_0x1408b9[_0xf5f2('0x58')][_0xf5f2('0x64')]);_0xa3cc67[_0xf5f2('0x36')](_0xf5f2('0x65'))['html'](_0x1408b9[_0xf5f2('0x58')]['emptyCart']);return _0xa3cc67;}(this['cartContainer']);var _0xd4f6ef=0x0;_0x4590ec['each'](function(){0x0<_0xd4f6ef?_0x3b4ea6[_0xf5f2('0x66')](this,_0x12550f[_0xf5f2('0x67')]()):_0x3b4ea6[_0xf5f2('0x66')](this,_0x12550f);_0xd4f6ef++;});window[_0xf5f2('0xb')]['callback'][_0xf5f2('0x38')](function(){_0x1b6dd2(_0xf5f2('0x68'))[_0xf5f2('0x5e')](window[_0xf5f2('0xb')][_0xf5f2('0x69')]||'--');_0x1b6dd2(_0xf5f2('0x6a'))[_0xf5f2('0x5e')](window['_QuatroDigital_CartData'][_0xf5f2('0x6b')]||'0');_0x1b6dd2(_0xf5f2('0x6c'))[_0xf5f2('0x5e')](window[_0xf5f2('0xb')]['shipping']||'--');_0x1b6dd2(_0xf5f2('0x6d'))['html'](window[_0xf5f2('0xb')][_0xf5f2('0x6e')]||'--');});var _0x5588cf=function(_0x363b34,_0x975bd8){if(_0xf5f2('0x4')===typeof _0x363b34[_0xf5f2('0x6f')])return _0x23e23a(_0xf5f2('0x70'));_0x2a2c31['renderProductsList'][_0xf5f2('0x66')](this,_0x975bd8);};_0x2a2c31[_0xf5f2('0x55')]=function(_0x3a0e75,_0xbf9f55){_0xf5f2('0x4')!=typeof _0xbf9f55?window[_0xf5f2('0x1a')]['dataOptionsCache']=_0xbf9f55:window[_0xf5f2('0x1a')][_0xf5f2('0x71')]&&(_0xbf9f55=window['_QuatroDigital_DropDown'][_0xf5f2('0x71')]);setTimeout(function(){window[_0xf5f2('0x1a')][_0xf5f2('0x71')]=void 0x0;},_0x1408b9['timeRemoveNewItemClass']);_0x1b6dd2('.qd-ddc-wrapper')['removeClass'](_0xf5f2('0x72'));if(_0x1408b9[_0xf5f2('0x2b')]){var _0x35f6a2=function(_0x450691){window[_0xf5f2('0x1a')]['getOrderForm']=_0x450691;_0x5588cf(_0x450691,_0xbf9f55);_0xf5f2('0x4')!==typeof window[_0xf5f2('0x73')]&&_0xf5f2('0xe')===typeof window[_0xf5f2('0x73')][_0xf5f2('0x74')]&&window[_0xf5f2('0x73')][_0xf5f2('0x74')][_0xf5f2('0x66')](this);_0x1b6dd2(_0xf5f2('0x75'))[_0xf5f2('0x76')](_0xf5f2('0x72'));};'undefined'!==typeof window['_QuatroDigital_DropDown']['getOrderForm']?(_0x35f6a2(window[_0xf5f2('0x1a')][_0xf5f2('0x77')]),_0xf5f2('0xe')===typeof _0x3a0e75&&_0x3a0e75(window[_0xf5f2('0x1a')][_0xf5f2('0x77')])):_0x1b6dd2['QD_checkoutQueue']([_0xf5f2('0x6f'),_0xf5f2('0x78'),_0xf5f2('0x79')],{'done':function(_0x28ac67){_0x35f6a2[_0xf5f2('0x66')](this,_0x28ac67);'function'===typeof _0x3a0e75&&_0x3a0e75(_0x28ac67);},'fail':function(_0x2986ed){_0x23e23a([_0xf5f2('0x7a'),_0x2986ed]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x2a2c31[_0xf5f2('0x7b')]=function(){var _0x2b0b30=_0x1b6dd2(_0xf5f2('0x75'));_0x2b0b30[_0xf5f2('0x36')]('.qd-ddc-prodRow')[_0xf5f2('0x9')]?_0x2b0b30[_0xf5f2('0x3b')](_0xf5f2('0x7c')):_0x2b0b30[_0xf5f2('0x76')](_0xf5f2('0x7c'));};_0x2a2c31['renderProductsList']=function(_0x5cab92){var _0x43e4ff=_0x1b6dd2(_0xf5f2('0x7d'));_0x43e4ff[_0xf5f2('0x7e')]();_0x43e4ff[_0xf5f2('0x7f')](function(){var _0x43e4ff=_0x1b6dd2(this),_0x5a2f9f,_0x16048e,_0x4f2fcc=_0x1b6dd2(''),_0x4c4420;for(_0x4c4420 in window['_QuatroDigital_DropDown']['getOrderForm'][_0xf5f2('0x6f')])if(_0xf5f2('0x12')===typeof window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x4c4420]){var _0x9f941e=window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x4c4420];var _0x4149e6=_0x9f941e[_0xf5f2('0x80')][_0xf5f2('0x2')](/^\/|\/$/g,'')[_0xf5f2('0x8')]('/');var _0x1680a6=_0x1b6dd2(_0xf5f2('0x81'));_0x1680a6[_0xf5f2('0x82')]({'data-sku':_0x9f941e['id'],'data-sku-index':_0x4c4420,'data-qd-departament':_0x4149e6[0x0],'data-qd-category':_0x4149e6[_0x4149e6[_0xf5f2('0x9')]-0x1]});_0x1680a6[_0xf5f2('0x76')]('qd-ddc-'+_0x9f941e[_0xf5f2('0x83')]);_0x1680a6[_0xf5f2('0x36')](_0xf5f2('0x84'))[_0xf5f2('0x35')](_0x1408b9[_0xf5f2('0x29')](_0x9f941e));_0x1680a6[_0xf5f2('0x36')](_0xf5f2('0x85'))[_0xf5f2('0x35')](isNaN(_0x9f941e['sellingPrice'])?_0x9f941e[_0xf5f2('0x86')]:0x0==_0x9f941e['sellingPrice']?'Grátis':(_0x1b6dd2('meta[name=currency]')['attr']('content')||'R$')+'\x20'+qd_number_format(_0x9f941e['sellingPrice']/0x64,0x2,',','.'));_0x1680a6[_0xf5f2('0x36')](_0xf5f2('0x87'))[_0xf5f2('0x82')]({'data-sku':_0x9f941e['id'],'data-sku-index':_0x4c4420})[_0xf5f2('0x48')](_0x9f941e[_0xf5f2('0x88')]);_0x1680a6[_0xf5f2('0x36')]('.qd-ddc-remove')['attr']({'data-sku':_0x9f941e['id'],'data-sku-index':_0x4c4420});_0x2a2c31[_0xf5f2('0x89')](_0x9f941e['id'],_0x1680a6['find'](_0xf5f2('0x8a')),_0x9f941e[_0xf5f2('0x8b')]);_0x1680a6['find']('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0xf5f2('0x82')]({'data-sku':_0x9f941e['id'],'data-sku-index':_0x4c4420});_0x1680a6[_0xf5f2('0x8c')](_0x43e4ff);_0x4f2fcc=_0x4f2fcc['add'](_0x1680a6);}try{var _0x1c624f=_0x43e4ff[_0xf5f2('0x0')]('.qd-ddc-wrapper')[_0xf5f2('0x36')](_0xf5f2('0x8d'));_0x1c624f[_0xf5f2('0x9')]&&''==_0x1c624f['val']()&&window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x79')][_0xf5f2('0x8e')]&&_0x1c624f[_0xf5f2('0x48')](window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x79')][_0xf5f2('0x8e')][_0xf5f2('0x8f')]);}catch(_0x191af3){_0x23e23a(_0xf5f2('0x90')+_0x191af3[_0xf5f2('0x11')],_0xf5f2('0x17'));}_0x2a2c31[_0xf5f2('0x91')](_0x43e4ff);_0x2a2c31[_0xf5f2('0x7b')]();_0x5cab92&&_0x5cab92[_0xf5f2('0x92')]&&function(){_0x16048e=_0x4f2fcc[_0xf5f2('0x93')](_0xf5f2('0x94')+_0x5cab92[_0xf5f2('0x92')]+'\x27]');_0x16048e[_0xf5f2('0x9')]&&(_0x5a2f9f=0x0,_0x4f2fcc['each'](function(){var _0x5cab92=_0x1b6dd2(this);if(_0x5cab92['is'](_0x16048e))return!0x1;_0x5a2f9f+=_0x5cab92[_0xf5f2('0x95')]();}),_0x2a2c31['scrollCart'](void 0x0,void 0x0,_0x5a2f9f,_0x43e4ff[_0xf5f2('0x38')](_0x43e4ff[_0xf5f2('0x96')]())),_0x4f2fcc['removeClass'](_0xf5f2('0x97')),function(_0x2f54eb){_0x2f54eb[_0xf5f2('0x76')]('qd-ddc-lastAdded');_0x2f54eb['addClass'](_0xf5f2('0x97'));setTimeout(function(){_0x2f54eb[_0xf5f2('0x3b')](_0xf5f2('0x98'));},_0x1408b9['timeRemoveNewItemClass']);}(_0x16048e),_0x1b6dd2(document['body'])[_0xf5f2('0x76')](_0xf5f2('0x99')),setTimeout(function(){_0x1b6dd2(document[_0xf5f2('0x40')])['removeClass']('qd-ddc-product-add-time-v2');},_0x1408b9['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown['getOrderForm']['items'][_0xf5f2('0x9')]?(_0x1b6dd2('body')[_0xf5f2('0x3b')](_0xf5f2('0x9a'))[_0xf5f2('0x76')](_0xf5f2('0x9b')),setTimeout(function(){_0x1b6dd2(_0xf5f2('0x40'))[_0xf5f2('0x3b')](_0xf5f2('0x9c'));},_0x1408b9[_0xf5f2('0x9d')])):_0x1b6dd2(_0xf5f2('0x40'))[_0xf5f2('0x3b')](_0xf5f2('0x9e'))[_0xf5f2('0x76')](_0xf5f2('0x9a'));}());'function'===typeof _0x1408b9[_0xf5f2('0x9f')]?_0x1408b9[_0xf5f2('0x9f')]['call'](this):_0x23e23a(_0xf5f2('0xa0'));};_0x2a2c31[_0xf5f2('0x89')]=function(_0x537a7d,_0x433ba0,_0xfe9cf5){function _0x281f61(){_0x1408b9['forceImageHTTPS']&&_0xf5f2('0xa1')==typeof _0xfe9cf5&&(_0xfe9cf5=_0xfe9cf5[_0xf5f2('0x2')]('http',_0xf5f2('0xa2')));_0x433ba0[_0xf5f2('0x3b')](_0xf5f2('0xa3'))['load'](function(){_0x1b6dd2(this)[_0xf5f2('0x76')]('qd-loaded');})[_0xf5f2('0x82')]('src',_0xfe9cf5);}_0xfe9cf5?_0x281f61():isNaN(_0x537a7d)?_0x23e23a(_0xf5f2('0xa4'),_0xf5f2('0xa5')):alert(_0xf5f2('0xa6'));};_0x2a2c31[_0xf5f2('0x91')]=function(_0x540d43){var _0x43e4ff=function(_0x5f5403,_0x52e037){var _0x4b4d7f=_0x1b6dd2(_0x5f5403);var _0x2a253a=_0x4b4d7f[_0xf5f2('0x82')]('data-sku');var _0x4149e6=_0x4b4d7f[_0xf5f2('0x82')](_0xf5f2('0xa7'));if(_0x2a253a){var _0x3962b2=parseInt(_0x4b4d7f[_0xf5f2('0x48')]())||0x1;_0x2a2c31[_0xf5f2('0xa8')]([_0x2a253a,_0x4149e6],_0x3962b2,_0x3962b2+0x1,function(_0x5ee4f8){_0x4b4d7f[_0xf5f2('0x48')](_0x5ee4f8);_0xf5f2('0xe')===typeof _0x52e037&&_0x52e037();});}};var _0x4c0a2f=function(_0x22865e,_0x19cbff){var _0x43e4ff=_0x1b6dd2(_0x22865e);var _0x32301a=_0x43e4ff[_0xf5f2('0x82')](_0xf5f2('0xa9'));var _0x2f9dd2=_0x43e4ff[_0xf5f2('0x82')](_0xf5f2('0xa7'));if(_0x32301a){var _0x4149e6=parseInt(_0x43e4ff[_0xf5f2('0x48')]())||0x2;_0x2a2c31[_0xf5f2('0xa8')]([_0x32301a,_0x2f9dd2],_0x4149e6,_0x4149e6-0x1,function(_0x13fcb0){_0x43e4ff[_0xf5f2('0x48')](_0x13fcb0);_0xf5f2('0xe')===typeof _0x19cbff&&_0x19cbff();});}};var _0x24ca50=function(_0x162c13,_0x258920){var _0x3e4e40=_0x1b6dd2(_0x162c13);var _0x5cabb2=_0x3e4e40[_0xf5f2('0x82')](_0xf5f2('0xa9'));var _0x4149e6=_0x3e4e40[_0xf5f2('0x82')](_0xf5f2('0xa7'));if(_0x5cabb2){var _0x37c1a1=parseInt(_0x3e4e40[_0xf5f2('0x48')]())||0x1;_0x2a2c31[_0xf5f2('0xa8')]([_0x5cabb2,_0x4149e6],0x1,_0x37c1a1,function(_0x33cfe7){_0x3e4e40[_0xf5f2('0x48')](_0x33cfe7);'function'===typeof _0x258920&&_0x258920();});}};var _0x4149e6=_0x540d43[_0xf5f2('0x36')](_0xf5f2('0xaa'));_0x4149e6[_0xf5f2('0x76')](_0xf5f2('0xab'))['each'](function(){var _0x540d43=_0x1b6dd2(this);_0x540d43[_0xf5f2('0x36')](_0xf5f2('0xac'))['on'](_0xf5f2('0xad'),function(_0x456a1e){_0x456a1e['preventDefault']();_0x4149e6[_0xf5f2('0x76')](_0xf5f2('0xae'));_0x43e4ff(_0x540d43['find'](_0xf5f2('0x87')),function(){_0x4149e6[_0xf5f2('0x3b')](_0xf5f2('0xae'));});});_0x540d43[_0xf5f2('0x36')]('.qd-ddc-quantityMinus')['on'](_0xf5f2('0xaf'),function(_0xfc76d9){_0xfc76d9[_0xf5f2('0x4e')]();_0x4149e6['addClass']('qd-loading');_0x4c0a2f(_0x540d43[_0xf5f2('0x36')](_0xf5f2('0x87')),function(){_0x4149e6[_0xf5f2('0x3b')](_0xf5f2('0xae'));});});_0x540d43[_0xf5f2('0x36')](_0xf5f2('0x87'))['on']('focusout.qd_ddc_change',function(){_0x4149e6[_0xf5f2('0x76')]('qd-loading');_0x24ca50(this,function(){_0x4149e6[_0xf5f2('0x3b')](_0xf5f2('0xae'));});});_0x540d43[_0xf5f2('0x36')](_0xf5f2('0x87'))['on'](_0xf5f2('0xb0'),function(_0x39635a){0xd==_0x39635a['keyCode']&&(_0x4149e6[_0xf5f2('0x76')](_0xf5f2('0xae')),_0x24ca50(this,function(){_0x4149e6[_0xf5f2('0x3b')](_0xf5f2('0xae'));}));});});_0x540d43[_0xf5f2('0x36')](_0xf5f2('0xb1'))[_0xf5f2('0x7f')](function(){var _0x540d43=_0x1b6dd2(this);_0x540d43[_0xf5f2('0x36')]('.qd-ddc-remove')['on']('click.qd_ddc_remove',function(){_0x540d43['addClass'](_0xf5f2('0xae'));_0x2a2c31[_0xf5f2('0xb2')](_0x1b6dd2(this),function(_0x568806){_0x568806?_0x540d43[_0xf5f2('0xb3')](!0x0)[_0xf5f2('0xb4')](function(){_0x540d43[_0xf5f2('0xb5')]();_0x2a2c31[_0xf5f2('0x7b')]();}):_0x540d43['removeClass'](_0xf5f2('0xae'));});return!0x1;});});};_0x2a2c31[_0xf5f2('0x4a')]=function(_0x10ac11){var _0x5d3ca7=_0x10ac11[_0xf5f2('0x48')]();_0x5d3ca7=_0x5d3ca7[_0xf5f2('0x2')](/[^0-9\-]/g,'');_0x5d3ca7=_0x5d3ca7['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xf5f2('0xb6'));_0x5d3ca7=_0x5d3ca7[_0xf5f2('0x2')](/(.{9}).*/g,'$1');_0x10ac11[_0xf5f2('0x48')](_0x5d3ca7);};_0x2a2c31[_0xf5f2('0x52')]=function(_0x176974){var _0x8b591c=_0x176974[_0xf5f2('0x48')]();0x9<=_0x8b591c[_0xf5f2('0x9')]&&(_0x176974[_0xf5f2('0xb7')](_0xf5f2('0xb8'))!=_0x8b591c&&_0x17d656[_0xf5f2('0xb9')]({'postalCode':_0x8b591c,'country':'BRA'})[_0xf5f2('0xba')](function(_0x31dbfa){_0x176974['closest'](_0xf5f2('0xbb'))['find'](_0xf5f2('0xbc'))[_0xf5f2('0xb5')]();window[_0xf5f2('0x1a')][_0xf5f2('0x77')]=_0x31dbfa;_0x2a2c31['getCartInfoByUrl']();_0x31dbfa=_0x31dbfa[_0xf5f2('0x79')]['logisticsInfo'][0x0][_0xf5f2('0xbd')];for(var _0x4149e6=_0x1b6dd2(_0xf5f2('0xbe')),_0x3310cb=0x0;_0x3310cb<_0x31dbfa['length'];_0x3310cb++){var _0x2bfc53=_0x31dbfa[_0x3310cb],_0x4525c9=0x1<_0x2bfc53[_0xf5f2('0xbf')]?_0x2bfc53[_0xf5f2('0xbf')][_0xf5f2('0x2')]('bd','\x20dia\x20útil'):_0x2bfc53['shippingEstimate'][_0xf5f2('0x2')]('bd',_0xf5f2('0xc0')),_0x16619b=_0x1b6dd2('<tr></tr>');_0x16619b[_0xf5f2('0x35')](_0xf5f2('0xc1')+qd_number_format(_0x2bfc53[_0xf5f2('0xc2')]/0x64,0x2,',','.')+_0xf5f2('0xc3')+_0x2bfc53[_0xf5f2('0x2a')]+_0xf5f2('0xc4')+_0x4525c9+_0xf5f2('0xc5')+_0x8b591c+'</td>');_0x16619b[_0xf5f2('0x8c')](_0x4149e6['find'](_0xf5f2('0xc6')));}_0x4149e6['insertBefore'](_0x176974[_0xf5f2('0x1')]('.qd-ddc-cep-tooltip-text')[_0xf5f2('0x36')]('.qd-ddc-cep-close'));})['fail'](function(_0x2c285c){_0x23e23a([_0xf5f2('0xc7'),_0x2c285c]);updateCartData();}),_0x176974['data'](_0xf5f2('0xb8'),_0x8b591c));};_0x2a2c31[_0xf5f2('0xa8')]=function(_0x2c7ab9,_0x3a76f4,_0x1d1588,_0x25af1e){function _0xd0b5d(_0x128f37){_0x128f37='boolean'!==typeof _0x128f37?!0x1:_0x128f37;_0x2a2c31['getCartInfoByUrl']();window[_0xf5f2('0x1a')]['allowUpdate']=!0x1;_0x2a2c31[_0xf5f2('0x7b')]();_0xf5f2('0x4')!==typeof window[_0xf5f2('0x73')]&&_0xf5f2('0xe')===typeof window[_0xf5f2('0x73')][_0xf5f2('0x74')]&&window[_0xf5f2('0x73')][_0xf5f2('0x74')][_0xf5f2('0x66')](this);_0xf5f2('0xe')===typeof adminCart&&adminCart();_0x1b6dd2['fn'][_0xf5f2('0x56')](!0x0,void 0x0,_0x128f37);_0xf5f2('0xe')===typeof _0x25af1e&&_0x25af1e(_0x3a76f4);}_0x1d1588=_0x1d1588||0x1;if(0x1>_0x1d1588)return _0x3a76f4;if(_0x1408b9['smartCheckout']){if(_0xf5f2('0x4')===typeof window['_QuatroDigital_DropDown'][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x2c7ab9[0x1]])return _0x23e23a(_0xf5f2('0xc8')+_0x2c7ab9[0x1]+']'),_0x3a76f4;window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x2c7ab9[0x1]][_0xf5f2('0x88')]=_0x1d1588;window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x2c7ab9[0x1]][_0xf5f2('0xc9')]=_0x2c7ab9[0x1];_0x17d656['updateItems']([window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x2c7ab9[0x1]]],[_0xf5f2('0x6f'),_0xf5f2('0x78'),_0xf5f2('0x79')])[_0xf5f2('0xba')](function(_0x55c37e){window[_0xf5f2('0x1a')][_0xf5f2('0x77')]=_0x55c37e;_0xd0b5d(!0x0);})[_0xf5f2('0xca')](function(_0x2594b9){_0x23e23a([_0xf5f2('0xcb'),_0x2594b9]);_0xd0b5d();});}else _0x23e23a(_0xf5f2('0xcc'));};_0x2a2c31[_0xf5f2('0xb2')]=function(_0x1167e2,_0x356155){function _0x2fd188(_0x3e35dc){_0x3e35dc=_0xf5f2('0xcd')!==typeof _0x3e35dc?!0x1:_0x3e35dc;_0xf5f2('0x4')!==typeof window[_0xf5f2('0x73')]&&_0xf5f2('0xe')===typeof window[_0xf5f2('0x73')]['exec']&&window[_0xf5f2('0x73')][_0xf5f2('0x74')]['call'](this);'function'===typeof adminCart&&adminCart();_0x1b6dd2['fn'][_0xf5f2('0x56')](!0x0,void 0x0,_0x3e35dc);_0xf5f2('0xe')===typeof _0x356155&&_0x356155(_0x41b8bd);}var _0x41b8bd=!0x1,_0x4149e6=_0x1b6dd2(_0x1167e2)['attr'](_0xf5f2('0xa7'));if(_0x1408b9[_0xf5f2('0x2b')]){if(_0xf5f2('0x4')===typeof window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x4149e6])return _0x23e23a('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x4149e6+']'),_0x41b8bd;window[_0xf5f2('0x1a')]['getOrderForm']['items'][_0x4149e6][_0xf5f2('0xc9')]=_0x4149e6;_0x17d656[_0xf5f2('0xce')]([window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x4149e6]],[_0xf5f2('0x6f'),_0xf5f2('0x78'),'shippingData'])[_0xf5f2('0xba')](function(_0x3a2862){_0x41b8bd=!0x0;window[_0xf5f2('0x1a')]['getOrderForm']=_0x3a2862;_0x5588cf(_0x3a2862);_0x2fd188(!0x0);})[_0xf5f2('0xca')](function(_0x50e119){_0x23e23a(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x50e119]);_0x2fd188();});}else alert(_0xf5f2('0xcf'));};_0x2a2c31['scrollCart']=function(_0x2389b7,_0x10215d,_0x5c7afd,_0x6cf15f){_0x6cf15f=_0x6cf15f||_0x1b6dd2(_0xf5f2('0xd0'));_0x2389b7=_0x2389b7||'+';_0x10215d=_0x10215d||0.9*_0x6cf15f['height']();_0x6cf15f[_0xf5f2('0xb3')](!0x0,!0x0)[_0xf5f2('0xd1')]({'scrollTop':isNaN(_0x5c7afd)?_0x2389b7+'='+_0x10215d+'px':_0x5c7afd});};_0x1408b9[_0xf5f2('0x54')]||(_0x2a2c31[_0xf5f2('0x55')](),_0x1b6dd2['fn'][_0xf5f2('0x56')](!0x0));_0x1b6dd2(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0xf5f2('0x1a')][_0xf5f2('0x77')]=void 0x0,_0x2a2c31['getCartInfoByUrl']();}catch(_0x52658e){_0x23e23a(_0xf5f2('0xd2')+_0x52658e[_0xf5f2('0x11')],_0xf5f2('0xd3'));}});_0xf5f2('0xe')===typeof _0x1408b9[_0xf5f2('0xc')]?_0x1408b9[_0xf5f2('0xc')][_0xf5f2('0x66')](this):_0x23e23a(_0xf5f2('0xd4'));};_0x1b6dd2['fn']['QD_dropDownCart']=function(_0x53f970){var _0xc86ed5=_0x1b6dd2(this);_0xc86ed5['fn']=new _0x1b6dd2['QD_dropDownCart'](this,_0x53f970);return _0xc86ed5;};}catch(_0x34abb6){_0xf5f2('0x4')!==typeof console&&_0xf5f2('0xe')===typeof console[_0xf5f2('0xf')]&&console['error'](_0xf5f2('0x10'),_0x34abb6);}}(this));(function(_0x2c9a1b){try{var _0x29cb4b=jQuery;window[_0xf5f2('0x73')]=window[_0xf5f2('0x73')]||{};window['_QuatroDigital_AmountProduct'][_0xf5f2('0x6f')]={};window[_0xf5f2('0x73')][_0xf5f2('0xd5')]=!0x1;window[_0xf5f2('0x73')][_0xf5f2('0xd6')]=!0x1;window[_0xf5f2('0x73')][_0xf5f2('0xd7')]=!0x1;var _0x3f7f3b=function(){if(window[_0xf5f2('0x73')][_0xf5f2('0xd5')]){var _0x1246f8=!0x1;var _0x347ceb={};window['_QuatroDigital_AmountProduct'][_0xf5f2('0x6f')]={};for(_0x4e7f26 in window['_QuatroDigital_DropDown'][_0xf5f2('0x77')][_0xf5f2('0x6f')])if(_0xf5f2('0x12')===typeof window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x4e7f26]){var _0x2cd0b7=window[_0xf5f2('0x1a')][_0xf5f2('0x77')][_0xf5f2('0x6f')][_0x4e7f26];_0xf5f2('0x4')!==typeof _0x2cd0b7[_0xf5f2('0xd8')]&&null!==_0x2cd0b7[_0xf5f2('0xd8')]&&''!==_0x2cd0b7[_0xf5f2('0xd8')]&&(window[_0xf5f2('0x73')][_0xf5f2('0x6f')][_0xf5f2('0xd9')+_0x2cd0b7[_0xf5f2('0xd8')]]=window['_QuatroDigital_AmountProduct'][_0xf5f2('0x6f')]['prod_'+_0x2cd0b7['productId']]||{},window[_0xf5f2('0x73')][_0xf5f2('0x6f')]['prod_'+_0x2cd0b7[_0xf5f2('0xd8')]][_0xf5f2('0xda')]=_0x2cd0b7[_0xf5f2('0xd8')],_0x347ceb[_0xf5f2('0xd9')+_0x2cd0b7[_0xf5f2('0xd8')]]||(window[_0xf5f2('0x73')][_0xf5f2('0x6f')][_0xf5f2('0xd9')+_0x2cd0b7['productId']][_0xf5f2('0x6b')]=0x0),window[_0xf5f2('0x73')][_0xf5f2('0x6f')]['prod_'+_0x2cd0b7[_0xf5f2('0xd8')]][_0xf5f2('0x6b')]+=_0x2cd0b7[_0xf5f2('0x88')],_0x1246f8=!0x0,_0x347ceb[_0xf5f2('0xd9')+_0x2cd0b7['productId']]=!0x0);}var _0x4e7f26=_0x1246f8;}else _0x4e7f26=void 0x0;window[_0xf5f2('0x73')][_0xf5f2('0xd5')]&&(_0x29cb4b(_0xf5f2('0xdb'))[_0xf5f2('0xb5')](),_0x29cb4b(_0xf5f2('0xdc'))[_0xf5f2('0x3b')](_0xf5f2('0xdd')));for(var _0x106f50 in window[_0xf5f2('0x73')][_0xf5f2('0x6f')]){_0x2cd0b7=window['_QuatroDigital_AmountProduct'][_0xf5f2('0x6f')][_0x106f50];if(_0xf5f2('0x12')!==typeof _0x2cd0b7)return;_0x347ceb=_0x29cb4b(_0xf5f2('0xde')+_0x2cd0b7['prodId']+']')[_0xf5f2('0x0')]('li');if(window[_0xf5f2('0x73')]['allowRecalculate']||!_0x347ceb[_0xf5f2('0x36')]('.qd-bap-wrapper')[_0xf5f2('0x9')])_0x1246f8=_0x29cb4b(_0xf5f2('0xdf')),_0x1246f8['find'](_0xf5f2('0xe0'))['html'](_0x2cd0b7[_0xf5f2('0x6b')]),_0x2cd0b7=_0x347ceb[_0xf5f2('0x36')]('.qd_bap_wrapper_content'),_0x2cd0b7[_0xf5f2('0x9')]?_0x2cd0b7[_0xf5f2('0xe1')](_0x1246f8)[_0xf5f2('0x76')](_0xf5f2('0xdd')):_0x347ceb[_0xf5f2('0xe1')](_0x1246f8);}_0x4e7f26&&(window['_QuatroDigital_AmountProduct'][_0xf5f2('0xd5')]=!0x1);};window[_0xf5f2('0x73')][_0xf5f2('0x74')]=function(){window[_0xf5f2('0x73')][_0xf5f2('0xd5')]=!0x0;_0x3f7f3b[_0xf5f2('0x66')](this);};_0x29cb4b(document)[_0xf5f2('0xe2')](function(){_0x3f7f3b[_0xf5f2('0x66')](this);});}catch(_0x2ed7ef){'undefined'!==typeof console&&_0xf5f2('0xe')===typeof console['error']&&console['error'](_0xf5f2('0x10'),_0x2ed7ef);}}(this));(function(){try{var _0x64c1e0=jQuery,_0x2afa1c,_0x122c75={'selector':_0xf5f2('0xe3'),'dropDown':{},'buyButton':{}};_0x64c1e0[_0xf5f2('0xe4')]=function(_0x4609a2){var _0x104174={};_0x2afa1c=_0x64c1e0[_0xf5f2('0x24')](!0x0,{},_0x122c75,_0x4609a2);_0x4609a2=_0x64c1e0(_0x2afa1c[_0xf5f2('0xe5')])['QD_dropDownCart'](_0x2afa1c['dropDown']);_0x104174['buyButton']=_0xf5f2('0x4')!==typeof _0x2afa1c['dropDown'][_0xf5f2('0x54')]&&!0x1===_0x2afa1c[_0xf5f2('0xe6')][_0xf5f2('0x54')]?_0x64c1e0(_0x2afa1c['selector'])[_0xf5f2('0xe7')](_0x4609a2['fn'],_0x2afa1c[_0xf5f2('0xe8')]):_0x64c1e0(_0x2afa1c['selector'])['QD_buyButton'](_0x2afa1c['buyButton']);_0x104174[_0xf5f2('0xe6')]=_0x4609a2;return _0x104174;};_0x64c1e0['fn'][_0xf5f2('0xe9')]=function(){_0xf5f2('0x12')===typeof console&&'function'===typeof console[_0xf5f2('0x13')]&&console['info'](_0xf5f2('0xea'));};_0x64c1e0[_0xf5f2('0xe9')]=_0x64c1e0['fn'][_0xf5f2('0xe9')];}catch(_0x4fae31){_0xf5f2('0x4')!==typeof console&&'function'===typeof console[_0xf5f2('0xf')]&&console[_0xf5f2('0xf')](_0xf5f2('0x10'),_0x4fae31);}}());