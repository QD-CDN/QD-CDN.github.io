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
			$('.header-qd-v1-cart, .fixed-buttons-qd-v1').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
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
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
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
			Institutional.applyInstitucionalArtistsCarousel();
			Institutional.formPlans();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		openFilterMenu: function () {
			$('.institucional-qd-v1-menu-toggle').click(function (e) {
				e.preventDefault();

				$(document.body).toggleClass('qd-sn-on');
			});
		},

		applyInstitucionalArtistsCarousel: function() {
			var wrapper = $('.artists-qd-v1-carousel');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 4,
				slidesToScroll: 4,
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
					}
				]
			});
		},
		formPlans: function () {
				if (!$(document.body).is(".plans"))
					return;

				var form = $(".institutional-contact");
				form.find("#qd_form_date").mask('00/00/0000');

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
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/PP/documents",
									type: "POST",
									dataType: "json",
									headers: { "Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
									data: JSON.stringify({
										ip: ip,
										userId: userId,
										email: email,
										phone: phone,
										name: $form.find("#qd_form_name").val() || null,
										birthDate: $form.find("#qd_form_date").val() || null,
										portfolio: $form.find("#qd_form_portfolio").val() || null,							
										address: $form.find("#qd_form_address").val() || null,
										planType: $form.find("#qd_form_type_plan").val() || null
									}),
									success: function (data) {
										$('.institutional-contact').addClass("hide");
										$('.form-succes').removeClass('hide');
									},
									error: function () { alert("Desculpe, não foi possível enviar seu formulário!"); },
									complete: function () { submitWrapper.removeClass("qd-loading"); 
									}
								});
							}
						};
						$.ajax({ url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/PP/search?_fields=id&email=" + email, dataType: "json", headers: { Accept: "application/vnd.vtex.ds.v10+json" }, success: function (data) { if (data.length) saveContact(data[0].id); else saveContact(null); }, error: function () { saveContact(null); if (typeof console == "object" && typeof console.warn == 'function') console.warn('Houve um erro ao tentar buscar os dados do usuário na entidade PP'); } });
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
var _0xa87e=['vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','ragnevalp%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','vtex.sku.selectable','available','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','extend','url','opts','push','success','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','clearQueueDelay','undefined','jqXHR','ajax','readyState','data','textStatus','errorThrown','version','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','data-qd-ssa-qtt','each','find','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','qd-ssa-on','qd-ssa-skus-','skus','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','sku','split','trigger','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','message','off'];(function(_0x4f2cea,_0x545cdd){var _0x1d87b8=function(_0x79d6ca){while(--_0x79d6ca){_0x4f2cea['push'](_0x4f2cea['shift']());}};_0x1d87b8(++_0x545cdd);}(_0xa87e,0x15e));var _0xea87=function(_0x22038c,_0x28d1dd){_0x22038c=_0x22038c-0x0;var _0x3e719d=_0xa87e[_0x22038c];return _0x3e719d;};(function(_0x3c1493){if(_0xea87('0x0')!==typeof _0x3c1493[_0xea87('0x1')]){var _0x2ae388={};_0x3c1493['qdAjaxQueue']=_0x2ae388;_0x3c1493[_0xea87('0x1')]=function(_0x162284){var _0x1e17ed=_0x3c1493[_0xea87('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x162284);var _0x5ea863=escape(encodeURIComponent(_0x1e17ed[_0xea87('0x3')]));_0x2ae388[_0x5ea863]=_0x2ae388[_0x5ea863]||{};_0x2ae388[_0x5ea863][_0xea87('0x4')]=_0x2ae388[_0x5ea863][_0xea87('0x4')]||[];_0x2ae388[_0x5ea863][_0xea87('0x4')][_0xea87('0x5')]({'success':function(_0xd47053,_0xa14996,_0x36d16c){_0x1e17ed[_0xea87('0x6')][_0xea87('0x7')](this,_0xd47053,_0xa14996,_0x36d16c);},'error':function(_0x269540,_0x3f287c,_0x558ea3){_0x1e17ed[_0xea87('0x8')][_0xea87('0x7')](this,_0x269540,_0x3f287c,_0x558ea3);},'complete':function(_0x35e935,_0x5d4731){_0x1e17ed[_0xea87('0x9')]['call'](this,_0x35e935,_0x5d4731);}});_0x2ae388[_0x5ea863][_0xea87('0xa')]=_0x2ae388[_0x5ea863][_0xea87('0xa')]||{'success':{},'error':{},'complete':{}};_0x2ae388[_0x5ea863][_0xea87('0xb')]=_0x2ae388[_0x5ea863]['callbackFns']||{};_0x2ae388[_0x5ea863][_0xea87('0xb')][_0xea87('0xc')]=_0xea87('0xd')===typeof _0x2ae388[_0x5ea863][_0xea87('0xb')][_0xea87('0xc')]?_0x2ae388[_0x5ea863][_0xea87('0xb')][_0xea87('0xc')]:!0x1;_0x2ae388[_0x5ea863]['callbackFns'][_0xea87('0xe')]='boolean'===typeof _0x2ae388[_0x5ea863]['callbackFns']['errorPopulated']?_0x2ae388[_0x5ea863]['callbackFns'][_0xea87('0xe')]:!0x1;_0x2ae388[_0x5ea863][_0xea87('0xb')][_0xea87('0xf')]='boolean'===typeof _0x2ae388[_0x5ea863]['callbackFns']['completePopulated']?_0x2ae388[_0x5ea863][_0xea87('0xb')][_0xea87('0xf')]:!0x1;_0x162284=_0x3c1493[_0xea87('0x2')]({},_0x1e17ed,{'success':function(_0x465d64,_0x4b42a1,_0x15f94b){_0x2ae388[_0x5ea863][_0xea87('0xa')][_0xea87('0x6')]={'data':_0x465d64,'textStatus':_0x4b42a1,'jqXHR':_0x15f94b};_0x2ae388[_0x5ea863]['callbackFns']['successPopulated']=!0x0;for(var _0x1a4096 in _0x2ae388[_0x5ea863][_0xea87('0x4')])_0xea87('0x10')===typeof _0x2ae388[_0x5ea863][_0xea87('0x4')][_0x1a4096]&&(_0x2ae388[_0x5ea863][_0xea87('0x4')][_0x1a4096][_0xea87('0x6')][_0xea87('0x7')](this,_0x465d64,_0x4b42a1,_0x15f94b),_0x2ae388[_0x5ea863][_0xea87('0x4')][_0x1a4096]['success']=function(){});},'error':function(_0x2d337e,_0x275a7a,_0x5a0ea1){_0x2ae388[_0x5ea863][_0xea87('0xa')][_0xea87('0x8')]={'errorThrown':_0x5a0ea1,'textStatus':_0x275a7a,'jqXHR':_0x2d337e};_0x2ae388[_0x5ea863][_0xea87('0xb')][_0xea87('0xe')]=!0x0;for(var _0x5edc4f in _0x2ae388[_0x5ea863][_0xea87('0x4')])_0xea87('0x10')===typeof _0x2ae388[_0x5ea863]['opts'][_0x5edc4f]&&(_0x2ae388[_0x5ea863][_0xea87('0x4')][_0x5edc4f]['error'][_0xea87('0x7')](this,_0x2d337e,_0x275a7a,_0x5a0ea1),_0x2ae388[_0x5ea863][_0xea87('0x4')][_0x5edc4f][_0xea87('0x8')]=function(){});},'complete':function(_0x20fbb0,_0x476a90){_0x2ae388[_0x5ea863][_0xea87('0xa')][_0xea87('0x9')]={'textStatus':_0x476a90,'jqXHR':_0x20fbb0};_0x2ae388[_0x5ea863][_0xea87('0xb')][_0xea87('0xf')]=!0x0;for(var _0x5bd372 in _0x2ae388[_0x5ea863]['opts'])_0xea87('0x10')===typeof _0x2ae388[_0x5ea863][_0xea87('0x4')][_0x5bd372]&&(_0x2ae388[_0x5ea863][_0xea87('0x4')][_0x5bd372][_0xea87('0x9')][_0xea87('0x7')](this,_0x20fbb0,_0x476a90),_0x2ae388[_0x5ea863][_0xea87('0x4')][_0x5bd372][_0xea87('0x9')]=function(){});isNaN(parseInt(_0x1e17ed[_0xea87('0x11')]))||setTimeout(function(){_0x2ae388[_0x5ea863]['jqXHR']=void 0x0;_0x2ae388[_0x5ea863]['opts']=void 0x0;_0x2ae388[_0x5ea863][_0xea87('0xa')]=void 0x0;_0x2ae388[_0x5ea863][_0xea87('0xb')]=void 0x0;},_0x1e17ed['clearQueueDelay']);}});_0xea87('0x12')===typeof _0x2ae388[_0x5ea863][_0xea87('0x13')]?_0x2ae388[_0x5ea863][_0xea87('0x13')]=_0x3c1493[_0xea87('0x14')](_0x162284):_0x2ae388[_0x5ea863]['jqXHR']&&_0x2ae388[_0x5ea863][_0xea87('0x13')][_0xea87('0x15')]&&0x4==_0x2ae388[_0x5ea863][_0xea87('0x13')]['readyState']&&(_0x2ae388[_0x5ea863]['callbackFns'][_0xea87('0xc')]&&_0x162284[_0xea87('0x6')](_0x2ae388[_0x5ea863][_0xea87('0xa')]['success'][_0xea87('0x16')],_0x2ae388[_0x5ea863][_0xea87('0xa')][_0xea87('0x6')][_0xea87('0x17')],_0x2ae388[_0x5ea863][_0xea87('0xa')][_0xea87('0x6')][_0xea87('0x13')]),_0x2ae388[_0x5ea863]['callbackFns'][_0xea87('0xe')]&&_0x162284[_0xea87('0x8')](_0x2ae388[_0x5ea863][_0xea87('0xa')][_0xea87('0x8')][_0xea87('0x13')],_0x2ae388[_0x5ea863][_0xea87('0xa')][_0xea87('0x8')][_0xea87('0x17')],_0x2ae388[_0x5ea863][_0xea87('0xa')]['error'][_0xea87('0x18')]),_0x2ae388[_0x5ea863]['callbackFns'][_0xea87('0xf')]&&_0x162284[_0xea87('0x9')](_0x2ae388[_0x5ea863]['parameters']['complete'][_0xea87('0x13')],_0x2ae388[_0x5ea863][_0xea87('0xa')][_0xea87('0x9')][_0xea87('0x17')]));};_0x3c1493[_0xea87('0x1')][_0xea87('0x19')]='2.1';}}(jQuery));(function(_0x583e6c){function _0x533869(_0x4eda02,_0x55285b){_0x48a660['qdAjax']({'url':'/produto/sku/'+_0x4eda02,'clearQueueDelay':null,'success':_0x55285b,'error':function(){_0x4071dd(_0xea87('0x1a'));}});}var _0x48a660=jQuery;if(_0xea87('0x0')!==typeof _0x48a660['fn'][_0xea87('0x1b')]){var _0x4071dd=function(_0x163445,_0x3a282d){if('object'===typeof console){var _0x4c9138;'object'===typeof _0x163445?(_0x163445[_0xea87('0x1c')](_0xea87('0x1d')),_0x4c9138=_0x163445):_0x4c9138=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x163445];'undefined'===typeof _0x3a282d||'alerta'!==_0x3a282d[_0xea87('0x1e')]()&&'aviso'!==_0x3a282d[_0xea87('0x1e')]()?'undefined'!==typeof _0x3a282d&&_0xea87('0x1f')===_0x3a282d[_0xea87('0x1e')]()?console[_0xea87('0x1f')][_0xea87('0x20')](console,_0x4c9138):console[_0xea87('0x8')][_0xea87('0x20')](console,_0x4c9138):console[_0xea87('0x21')][_0xea87('0x20')](console,_0x4c9138);}},_0x1271a4={},_0x5cb42f=function(_0x7e8145,_0x1738c5){function _0x2eb6f3(_0x2cd028){try{_0x7e8145[_0xea87('0x22')](_0xea87('0x23'))[_0xea87('0x24')](_0xea87('0x25'));var _0x65a67a=_0x2cd028[0x0][_0xea87('0x26')][0x0][_0xea87('0x27')];_0x7e8145['attr'](_0xea87('0x28'),_0x65a67a);_0x7e8145[_0xea87('0x29')](function(){var _0x7e8145=_0x48a660(this)[_0xea87('0x2a')]('[data-qd-ssa-text]');if(0x1>_0x65a67a)return _0x7e8145[_0xea87('0x2b')]()[_0xea87('0x24')](_0xea87('0x2c'))[_0xea87('0x22')](_0xea87('0x2d'));var _0x2cd028=_0x7e8145[_0xea87('0x2e')](_0xea87('0x2f')+_0x65a67a+'\x22]');_0x2cd028=_0x2cd028[_0xea87('0x30')]?_0x2cd028:_0x7e8145[_0xea87('0x2e')](_0xea87('0x31'));_0x7e8145[_0xea87('0x2b')]()[_0xea87('0x24')](_0xea87('0x2c'))[_0xea87('0x22')]('qd-ssa-show');_0x2cd028[_0xea87('0x32')]((_0x2cd028[_0xea87('0x32')]()||'')[_0xea87('0x33')](_0xea87('0x34'),_0x65a67a));_0x2cd028[_0xea87('0x35')]()[_0xea87('0x24')](_0xea87('0x2d'))['removeClass'](_0xea87('0x2c'));});}catch(_0x2f0c32){_0x4071dd([_0xea87('0x36'),_0x2f0c32['message']]);}}if(_0x7e8145[_0xea87('0x30')]){_0x7e8145[_0xea87('0x24')](_0xea87('0x37'));_0x7e8145[_0xea87('0x24')]('qd-ssa-sku-no-selected');try{_0x7e8145['addClass'](_0xea87('0x38')+vtxctx[_0xea87('0x39')]['split'](';')[_0xea87('0x30')]);}catch(_0x1af842){_0x4071dd([_0xea87('0x3a'),_0x1af842['message']]);}_0x48a660(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0xe24595,_0x2a7545,_0x72766a){try{_0x533869(_0x72766a[_0xea87('0x3b')],function(_0x1042db){_0x2eb6f3(_0x1042db);0x1===vtxctx[_0xea87('0x39')][_0xea87('0x3c')](';')[_0xea87('0x30')]&&0x0==_0x1042db[0x0][_0xea87('0x26')][0x0][_0xea87('0x27')]&&_0x48a660(window)[_0xea87('0x3d')]('QuatroDigital.ssa.prodUnavailable');});}catch(_0x26b30b){_0x4071dd([_0xea87('0x3e'),_0x26b30b[_0xea87('0x3f')]]);}});_0x48a660(window)[_0xea87('0x40')](_0xea87('0x41'));_0x48a660(window)['on'](_0xea87('0x42'),function(){_0x7e8145[_0xea87('0x24')](_0xea87('0x43'))['hide']();});}};_0x583e6c=function(_0x54ff75){var _0x12ba5e={'i':_0xea87('0x44')};return function(_0x12f59f){var _0x3b607a=function(_0x765365){return _0x765365;};var _0x2aacf0=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x12f59f=_0x12f59f['d'+_0x2aacf0[0x10]+'c'+_0x2aacf0[0x11]+'m'+_0x3b607a(_0x2aacf0[0x1])+'n'+_0x2aacf0[0xd]]['l'+_0x2aacf0[0x12]+'c'+_0x2aacf0[0x0]+'ti'+_0x3b607a('o')+'n'];var _0x87e3c2=function(_0x3b6c84){return escape(encodeURIComponent(_0x3b6c84[_0xea87('0x33')](/\./g,'¨')[_0xea87('0x33')](/[a-zA-Z]/g,function(_0x4f5226){return String['fromCharCode'](('Z'>=_0x4f5226?0x5a:0x7a)>=(_0x4f5226=_0x4f5226[_0xea87('0x45')](0x0)+0xd)?_0x4f5226:_0x4f5226-0x1a);})));};var _0x1beee5=_0x87e3c2(_0x12f59f[[_0x2aacf0[0x9],_0x3b607a('o'),_0x2aacf0[0xc],_0x2aacf0[_0x3b607a(0xd)]][_0xea87('0x46')]('')]);_0x87e3c2=_0x87e3c2((window[['js',_0x3b607a('no'),'m',_0x2aacf0[0x1],_0x2aacf0[0x4]['toUpperCase'](),_0xea87('0x47')][_0xea87('0x46')]('')]||'---')+['.v',_0x2aacf0[0xd],'e',_0x3b607a('x'),'co',_0x3b607a('mm'),_0xea87('0x48'),_0x2aacf0[0x1],'.c',_0x3b607a('o'),'m.',_0x2aacf0[0x13],'r']['join'](''));for(var _0x69aeba in _0x12ba5e){if(_0x87e3c2===_0x69aeba+_0x12ba5e[_0x69aeba]||_0x1beee5===_0x69aeba+_0x12ba5e[_0x69aeba]){var _0x4d631b='tr'+_0x2aacf0[0x11]+'e';break;}_0x4d631b='f'+_0x2aacf0[0x0]+'ls'+_0x3b607a(_0x2aacf0[0x1])+'';}_0x3b607a=!0x1;-0x1<_0x12f59f[[_0x2aacf0[0xc],'e',_0x2aacf0[0x0],'rc',_0x2aacf0[0x9]]['join']('')]['indexOf'](_0xea87('0x49'))&&(_0x3b607a=!0x0);return[_0x4d631b,_0x3b607a];}(_0x54ff75);}(window);if(!eval(_0x583e6c[0x0]))return _0x583e6c[0x1]?_0x4071dd('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x48a660['fn'][_0xea87('0x1b')]=function(_0x2e0776){var _0x2f554e=_0x48a660(this);_0x2e0776=_0x48a660[_0xea87('0x2')](!0x0,{},_0x1271a4,_0x2e0776);_0x2f554e['qdPlugin']=new _0x5cb42f(_0x2f554e,_0x2e0776);try{'object'===typeof _0x48a660['fn']['QD_smartStockAvailable'][_0xea87('0x4a')]&&_0x48a660(window)['trigger'](_0xea87('0x4b'),[_0x48a660['fn'][_0xea87('0x1b')][_0xea87('0x4a')][_0xea87('0x4c')],_0x48a660['fn'][_0xea87('0x1b')]['initialSkuSelected']['sku']]);}catch(_0x49dc92){_0x4071dd([_0xea87('0x4d'),_0x49dc92['message']]);}_0x48a660['fn'][_0xea87('0x1b')]['unavailable']&&_0x48a660(window)[_0xea87('0x3d')]('QuatroDigital.ssa.prodUnavailable');return _0x2f554e;};_0x48a660(window)['on'](_0xea87('0x41'),function(_0x5444a0,_0x52ceba,_0x2db806){try{_0x48a660['fn']['QD_smartStockAvailable'][_0xea87('0x4a')]={'prod':_0x52ceba,'sku':_0x2db806},_0x48a660(this)[_0xea87('0x40')](_0x5444a0);}catch(_0x1f4dbb){_0x4071dd(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x1f4dbb[_0xea87('0x3f')]]);}});_0x48a660(window)['on'](_0xea87('0x4e'),function(_0xf3f89a,_0x118eb4,_0xcf317){try{for(var _0x42081f=_0xcf317[_0xea87('0x30')],_0x3ec73f=_0x118eb4=0x0;_0x3ec73f<_0x42081f&&!_0xcf317[_0x3ec73f][_0xea87('0x4f')];_0x3ec73f++)_0x118eb4+=0x1;_0x42081f<=_0x118eb4&&(_0x48a660['fn']['QD_smartStockAvailable'][_0xea87('0x50')]=!0x0);_0x48a660(this)[_0xea87('0x40')](_0xf3f89a);}catch(_0xbec932){_0x4071dd([_0xea87('0x51'),_0xbec932[_0xea87('0x3f')]]);}});_0x48a660(function(){_0x48a660(_0xea87('0x52'))['QD_smartStockAvailable']();});}}(window));
var _0x24d6=['---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qdAjax','url','find','img[alt=\x27','data-qdam-value','.box-banner','clone','insertBefore','hide','qd-am-content-loaded','text','attr','[class*=\x27colunas\x27]','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','qd-am-has-ul','children',':not(ul)','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-level-','add','qd-am-','callback','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','QD_amazingMenu','/qd-amazing-menu','object','undefined','info','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','error','qdAmAddNdx','each','qd-am-li-','first','addClass','qd-am-first','last','qd-am-last','ragnevalp%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','toUpperCase'];(function(_0x4d3693,_0x10337e){var _0x375220=function(_0x13ed1c){while(--_0x13ed1c){_0x4d3693['push'](_0x4d3693['shift']());}};_0x375220(++_0x10337e);}(_0x24d6,0x1e6));var _0x624d=function(_0x128ecb,_0x13f744){_0x128ecb=_0x128ecb-0x0;var _0x4c7f90=_0x24d6[_0x128ecb];return _0x4c7f90;};(function(_0x5a98fc){_0x5a98fc['fn'][_0x624d('0x0')]=_0x5a98fc['fn']['closest'];}(jQuery));(function(_0x414399){var _0x187750;var _0x3546b2=jQuery;if('function'!==typeof _0x3546b2['fn'][_0x624d('0x1')]){var _0x58391b={'url':_0x624d('0x2'),'callback':function(){},'ajaxCallback':function(){}};var _0x332c98=function(_0x562175,_0x3b9406){if(_0x624d('0x3')===typeof console&&_0x624d('0x4')!==typeof console['error']&&'undefined'!==typeof console[_0x624d('0x5')]&&_0x624d('0x4')!==typeof console['warn']){var _0x3320d8;_0x624d('0x3')===typeof _0x562175?(_0x562175['unshift'](_0x624d('0x6')),_0x3320d8=_0x562175):_0x3320d8=[_0x624d('0x6')+_0x562175];if('undefined'===typeof _0x3b9406||_0x624d('0x7')!==_0x3b9406['toLowerCase']()&&_0x624d('0x8')!==_0x3b9406[_0x624d('0x9')]())if(_0x624d('0x4')!==typeof _0x3b9406&&_0x624d('0x5')===_0x3b9406[_0x624d('0x9')]())try{console['info'][_0x624d('0xa')](console,_0x3320d8);}catch(_0x5ef059){try{console[_0x624d('0x5')](_0x3320d8[_0x624d('0xb')]('\x0a'));}catch(_0x1dd109){}}else try{console[_0x624d('0xc')]['apply'](console,_0x3320d8);}catch(_0x8ea5bc){try{console[_0x624d('0xc')](_0x3320d8['join']('\x0a'));}catch(_0x41fb3d){}}else try{console['warn'][_0x624d('0xa')](console,_0x3320d8);}catch(_0x30d40c){try{console['warn'](_0x3320d8[_0x624d('0xb')]('\x0a'));}catch(_0x247551){}}}};_0x3546b2['fn'][_0x624d('0xd')]=function(){var _0x3bd38b=_0x3546b2(this);_0x3bd38b[_0x624d('0xe')](function(_0x18c9c7){_0x3546b2(this)['addClass'](_0x624d('0xf')+_0x18c9c7);});_0x3bd38b[_0x624d('0x10')]()[_0x624d('0x11')](_0x624d('0x12'));_0x3bd38b[_0x624d('0x13')]()[_0x624d('0x11')](_0x624d('0x14'));return _0x3bd38b;};_0x3546b2['fn'][_0x624d('0x1')]=function(){};_0x414399=function(_0x32d04e){var _0x4967da={'i':_0x624d('0x15')};return function(_0x1621ad){var _0x39fa36=function(_0x511603){return _0x511603;};var _0x419c26=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1621ad=_0x1621ad['d'+_0x419c26[0x10]+'c'+_0x419c26[0x11]+'m'+_0x39fa36(_0x419c26[0x1])+'n'+_0x419c26[0xd]]['l'+_0x419c26[0x12]+'c'+_0x419c26[0x0]+'ti'+_0x39fa36('o')+'n'];var _0x58c076=function(_0x164684){return escape(encodeURIComponent(_0x164684['replace'](/\./g,'¨')[_0x624d('0x16')](/[a-zA-Z]/g,function(_0x1fe82b){return String[_0x624d('0x17')](('Z'>=_0x1fe82b?0x5a:0x7a)>=(_0x1fe82b=_0x1fe82b['charCodeAt'](0x0)+0xd)?_0x1fe82b:_0x1fe82b-0x1a);})));};var _0x275975=_0x58c076(_0x1621ad[[_0x419c26[0x9],_0x39fa36('o'),_0x419c26[0xc],_0x419c26[_0x39fa36(0xd)]][_0x624d('0xb')]('')]);_0x58c076=_0x58c076((window[['js',_0x39fa36('no'),'m',_0x419c26[0x1],_0x419c26[0x4][_0x624d('0x18')](),'ite'][_0x624d('0xb')]('')]||_0x624d('0x19'))+['.v',_0x419c26[0xd],'e',_0x39fa36('x'),'co',_0x39fa36('mm'),_0x624d('0x1a'),_0x419c26[0x1],'.c',_0x39fa36('o'),'m.',_0x419c26[0x13],'r'][_0x624d('0xb')](''));for(var _0x31be32 in _0x4967da){if(_0x58c076===_0x31be32+_0x4967da[_0x31be32]||_0x275975===_0x31be32+_0x4967da[_0x31be32]){var _0x913e52='tr'+_0x419c26[0x11]+'e';break;}_0x913e52='f'+_0x419c26[0x0]+'ls'+_0x39fa36(_0x419c26[0x1])+'';}_0x39fa36=!0x1;-0x1<_0x1621ad[[_0x419c26[0xc],'e',_0x419c26[0x0],'rc',_0x419c26[0x9]][_0x624d('0xb')]('')][_0x624d('0x1b')](_0x624d('0x1c'))&&(_0x39fa36=!0x0);return[_0x913e52,_0x39fa36];}(_0x32d04e);}(window);if(!eval(_0x414399[0x0]))return _0x414399[0x1]?_0x332c98(_0x624d('0x1d')):!0x1;var _0x1341d1=function(_0xa87618){var _0x3f6157=_0xa87618['find']('.qd_am_code');var _0x2209d2=_0x3f6157[_0x624d('0x1e')](_0x624d('0x1f'));var _0x6918db=_0x3f6157[_0x624d('0x1e')](_0x624d('0x20'));if(_0x2209d2[_0x624d('0x21')]||_0x6918db[_0x624d('0x21')])_0x2209d2[_0x624d('0x22')]()[_0x624d('0x11')](_0x624d('0x23')),_0x6918db[_0x624d('0x22')]()['addClass']('qd-am-collection-wrapper'),_0x3546b2[_0x624d('0x24')]({'url':_0x187750[_0x624d('0x25')],'dataType':'html','success':function(_0x18e221){var _0x34d745=_0x3546b2(_0x18e221);_0x2209d2[_0x624d('0xe')](function(){var _0x18e221=_0x3546b2(this);var _0x5669e3=_0x34d745[_0x624d('0x26')](_0x624d('0x27')+_0x18e221['attr'](_0x624d('0x28'))+'\x27]');_0x5669e3[_0x624d('0x21')]&&(_0x5669e3['each'](function(){_0x3546b2(this)[_0x624d('0x0')](_0x624d('0x29'))[_0x624d('0x2a')]()[_0x624d('0x2b')](_0x18e221);}),_0x18e221[_0x624d('0x2c')]());})['addClass'](_0x624d('0x2d'));_0x6918db[_0x624d('0xe')](function(){var _0x18e221={};var _0x472d21=_0x3546b2(this);_0x34d745[_0x624d('0x26')]('h2')['each'](function(){if(_0x3546b2(this)[_0x624d('0x2e')]()['trim']()[_0x624d('0x9')]()==_0x472d21[_0x624d('0x2f')](_0x624d('0x28'))['trim']()[_0x624d('0x9')]())return _0x18e221=_0x3546b2(this),!0x1;});_0x18e221[_0x624d('0x21')]&&(_0x18e221[_0x624d('0xe')](function(){_0x3546b2(this)['getParent'](_0x624d('0x30'))['clone']()['insertBefore'](_0x472d21);}),_0x472d21[_0x624d('0x2c')]());})['addClass'](_0x624d('0x2d'));},'error':function(){_0x332c98('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'+_0x187750[_0x624d('0x25')]+_0x624d('0x31'));},'complete':function(){_0x187750[_0x624d('0x32')][_0x624d('0x33')](this);_0x3546b2(window)[_0x624d('0x34')](_0x624d('0x35'),_0xa87618);},'clearQueueDelay':0xbb8});};_0x3546b2[_0x624d('0x1')]=function(_0x32842d){var _0x414938=_0x32842d['find'](_0x624d('0x36'))['each'](function(){var _0x537e80=_0x3546b2(this);if(!_0x537e80[_0x624d('0x21')])return _0x332c98(['UL\x20do\x20menu\x20não\x20encontrada',_0x32842d],_0x624d('0x7'));_0x537e80[_0x624d('0x26')]('li\x20>ul')[_0x624d('0x22')]()[_0x624d('0x11')](_0x624d('0x37'));_0x537e80['find']('li')[_0x624d('0xe')](function(){var _0x174bd4=_0x3546b2(this);var _0x57d02a=_0x174bd4[_0x624d('0x38')](_0x624d('0x39'));_0x57d02a[_0x624d('0x21')]&&_0x174bd4['addClass'](_0x624d('0x3a')+_0x57d02a['first']()['text']()['trim']()[_0x624d('0x3b')]()[_0x624d('0x16')](/\./g,'')[_0x624d('0x16')](/\s/g,'-')[_0x624d('0x9')]());});var _0x505fa1=_0x537e80['find'](_0x624d('0x3c'))[_0x624d('0xd')]();_0x537e80[_0x624d('0x11')](_0x624d('0x3d'));_0x505fa1=_0x505fa1[_0x624d('0x26')](_0x624d('0x3e'));_0x505fa1[_0x624d('0xe')](function(){var _0x2cef8c=_0x3546b2(this);_0x2cef8c[_0x624d('0x26')](_0x624d('0x3c'))['qdAmAddNdx']()[_0x624d('0x11')](_0x624d('0x3f'));_0x2cef8c['addClass'](_0x624d('0x40'));_0x2cef8c[_0x624d('0x22')]()[_0x624d('0x11')]('qd-am-dropdown');});_0x505fa1[_0x624d('0x11')]('qd-am-dropdown');var _0x83cf1a=0x0,_0x414399=function(_0x3a228a){_0x83cf1a+=0x1;_0x3a228a=_0x3a228a[_0x624d('0x38')]('li')[_0x624d('0x38')]('*');_0x3a228a[_0x624d('0x21')]&&(_0x3a228a['addClass'](_0x624d('0x41')+_0x83cf1a),_0x414399(_0x3a228a));};_0x414399(_0x537e80);_0x537e80[_0x624d('0x42')](_0x537e80[_0x624d('0x26')]('ul'))[_0x624d('0xe')](function(){var _0x2c75a2=_0x3546b2(this);_0x2c75a2['addClass'](_0x624d('0x43')+_0x2c75a2[_0x624d('0x38')]('li')['length']+'-li');});});_0x1341d1(_0x414938);_0x187750[_0x624d('0x44')][_0x624d('0x33')](this);_0x3546b2(window)[_0x624d('0x34')](_0x624d('0x45'),_0x32842d);};_0x3546b2['fn']['QD_amazingMenu']=function(_0x57c6a6){var _0x5f0c2d=_0x3546b2(this);if(!_0x5f0c2d[_0x624d('0x21')])return _0x5f0c2d;_0x187750=_0x3546b2[_0x624d('0x46')]({},_0x58391b,_0x57c6a6);_0x5f0c2d[_0x624d('0x47')]=new _0x3546b2['QD_amazingMenu'](_0x3546b2(this));return _0x5f0c2d;};_0x3546b2(function(){_0x3546b2(_0x624d('0x48'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
var _0x01d9=['total','.qd-ddc-infoTotalItems','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','function','exec','addClass','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','attr','qd-ddc-','availability','.qd-ddc-prodName','append','skuName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','actionButtons','lastSku','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','http','https','qd-loaded','load','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','stop','slideUp','remove','qdDdcLastPostalCode','calculateShipping','BRA','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','tbody','insertBefore','.qd-ddc-cep-tooltip-text','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','data','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeProduct','removeItems','done','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','scrollCart','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','quickViewUpdate','allowRecalculate','productId','prod_','prodId','qtt','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','ajaxStop','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','smartCart','getParent','closest','replace','undefined','pow','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','Oooops!\x20','message','object','info','warn','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','toLowerCase','apply','_QuatroDigital_DropDown','QD_dropDownCart','ragnevalp%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','extend','Ir\x20ao\x20Carrinho','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','removeClass','find','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','keyCode','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','.qd-ddc-cep-tooltip','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','allowUpdate','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','each','call','clone','add','.qd-ddc-infoTotalValue'];(function(_0x16f68e,_0x15428){var _0x246a0a=function(_0x318c9d){while(--_0x318c9d){_0x16f68e['push'](_0x16f68e['shift']());}};_0x246a0a(++_0x15428);}(_0x01d9,0x93));var _0x901d=function(_0x4f7409,_0x40dbe7){_0x4f7409=_0x4f7409-0x0;var _0x45cdce=_0x01d9[_0x4f7409];return _0x45cdce;};(function(_0x17b75a){_0x17b75a['fn'][_0x901d('0x0')]=_0x17b75a['fn'][_0x901d('0x1')];}(jQuery));function qd_number_format(_0x247cfc,_0x8f7b4,_0x214f38,_0x456f31){_0x247cfc=(_0x247cfc+'')[_0x901d('0x2')](/[^0-9+\-Ee.]/g,'');_0x247cfc=isFinite(+_0x247cfc)?+_0x247cfc:0x0;_0x8f7b4=isFinite(+_0x8f7b4)?Math['abs'](_0x8f7b4):0x0;_0x456f31=_0x901d('0x3')===typeof _0x456f31?',':_0x456f31;_0x214f38=_0x901d('0x3')===typeof _0x214f38?'.':_0x214f38;var _0x313f85='',_0x313f85=function(_0x39fc94,_0x202568){var _0x8f7b4=Math[_0x901d('0x4')](0xa,_0x202568);return''+(Math[_0x901d('0x5')](_0x39fc94*_0x8f7b4)/_0x8f7b4)[_0x901d('0x6')](_0x202568);},_0x313f85=(_0x8f7b4?_0x313f85(_0x247cfc,_0x8f7b4):''+Math[_0x901d('0x5')](_0x247cfc))[_0x901d('0x7')]('.');0x3<_0x313f85[0x0]['length']&&(_0x313f85[0x0]=_0x313f85[0x0][_0x901d('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x456f31));(_0x313f85[0x1]||'')['length']<_0x8f7b4&&(_0x313f85[0x1]=_0x313f85[0x1]||'',_0x313f85[0x1]+=Array(_0x8f7b4-_0x313f85[0x1][_0x901d('0x8')]+0x1)[_0x901d('0x9')]('0'));return _0x313f85[_0x901d('0x9')](_0x214f38);};(function(){try{window[_0x901d('0xa')]=window[_0x901d('0xa')]||{},window['_QuatroDigital_CartData'][_0x901d('0xb')]=window[_0x901d('0xa')][_0x901d('0xb')]||$[_0x901d('0xc')]();}catch(_0xb8869a){_0x901d('0x3')!==typeof console&&'function'===typeof console[_0x901d('0xd')]&&console[_0x901d('0xd')](_0x901d('0xe'),_0xb8869a[_0x901d('0xf')]);}}());(function(_0x1aba97){try{var _0x7dd5f4=jQuery,_0x477cd4=function(_0x407215,_0x3368fc){if(_0x901d('0x10')===typeof console&&_0x901d('0x3')!==typeof console[_0x901d('0xd')]&&_0x901d('0x3')!==typeof console[_0x901d('0x11')]&&_0x901d('0x3')!==typeof console[_0x901d('0x12')]){var _0xf3c66a;_0x901d('0x10')===typeof _0x407215?(_0x407215['unshift'](_0x901d('0x13')),_0xf3c66a=_0x407215):_0xf3c66a=[_0x901d('0x13')+_0x407215];if('undefined'===typeof _0x3368fc||'alerta'!==_0x3368fc['toLowerCase']()&&'aviso'!==_0x3368fc[_0x901d('0x14')]())if(_0x901d('0x3')!==typeof _0x3368fc&&'info'===_0x3368fc[_0x901d('0x14')]())try{console[_0x901d('0x11')]['apply'](console,_0xf3c66a);}catch(_0x20778b){try{console[_0x901d('0x11')](_0xf3c66a[_0x901d('0x9')]('\x0a'));}catch(_0x3f80b9){}}else try{console[_0x901d('0xd')][_0x901d('0x15')](console,_0xf3c66a);}catch(_0x46e5c6){try{console[_0x901d('0xd')](_0xf3c66a['join']('\x0a'));}catch(_0x196a76){}}else try{console[_0x901d('0x12')][_0x901d('0x15')](console,_0xf3c66a);}catch(_0x1f0ee5){try{console['warn'](_0xf3c66a[_0x901d('0x9')]('\x0a'));}catch(_0x23fd43){}}}};window[_0x901d('0x16')]=window[_0x901d('0x16')]||{};window[_0x901d('0x16')]['allowUpdate']=!0x0;_0x7dd5f4[_0x901d('0x17')]=function(){};_0x7dd5f4['fn'][_0x901d('0x17')]=function(){return{'fn':new _0x7dd5f4()};};var _0x14976e=function(_0x2f3ae9){var _0x37158e={'i':_0x901d('0x18')};return function(_0x48e86e){var _0xae6dfe=function(_0x533038){return _0x533038;};var _0x128830=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x48e86e=_0x48e86e['d'+_0x128830[0x10]+'c'+_0x128830[0x11]+'m'+_0xae6dfe(_0x128830[0x1])+'n'+_0x128830[0xd]]['l'+_0x128830[0x12]+'c'+_0x128830[0x0]+'ti'+_0xae6dfe('o')+'n'];var _0x389fd9=function(_0x20dbc5){return escape(encodeURIComponent(_0x20dbc5[_0x901d('0x2')](/\./g,'¨')[_0x901d('0x2')](/[a-zA-Z]/g,function(_0x20df02){return String[_0x901d('0x19')](('Z'>=_0x20df02?0x5a:0x7a)>=(_0x20df02=_0x20df02[_0x901d('0x1a')](0x0)+0xd)?_0x20df02:_0x20df02-0x1a);})));};var _0x530c4b=_0x389fd9(_0x48e86e[[_0x128830[0x9],_0xae6dfe('o'),_0x128830[0xc],_0x128830[_0xae6dfe(0xd)]][_0x901d('0x9')]('')]);_0x389fd9=_0x389fd9((window[['js',_0xae6dfe('no'),'m',_0x128830[0x1],_0x128830[0x4][_0x901d('0x1b')](),_0x901d('0x1c')][_0x901d('0x9')]('')]||_0x901d('0x1d'))+['.v',_0x128830[0xd],'e',_0xae6dfe('x'),'co',_0xae6dfe('mm'),_0x901d('0x1e'),_0x128830[0x1],'.c',_0xae6dfe('o'),'m.',_0x128830[0x13],'r']['join'](''));for(var _0x179149 in _0x37158e){if(_0x389fd9===_0x179149+_0x37158e[_0x179149]||_0x530c4b===_0x179149+_0x37158e[_0x179149]){var _0x1c280b='tr'+_0x128830[0x11]+'e';break;}_0x1c280b='f'+_0x128830[0x0]+'ls'+_0xae6dfe(_0x128830[0x1])+'';}_0xae6dfe=!0x1;-0x1<_0x48e86e[[_0x128830[0xc],'e',_0x128830[0x0],'rc',_0x128830[0x9]][_0x901d('0x9')]('')]['indexOf'](_0x901d('0x1f'))&&(_0xae6dfe=!0x0);return[_0x1c280b,_0xae6dfe];}(_0x2f3ae9);}(window);if(!eval(_0x14976e[0x0]))return _0x14976e[0x1]?_0x477cd4(_0x901d('0x20')):!0x1;_0x7dd5f4[_0x901d('0x17')]=function(_0x410ef4,_0x444bff){var _0x3962c2=_0x7dd5f4(_0x410ef4);if(!_0x3962c2[_0x901d('0x8')])return _0x3962c2;var _0x1b8d3=_0x7dd5f4[_0x901d('0x21')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x901d('0x22'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x901d('0x23'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x901d('0x24')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'forceImageHTTPS':!0x1,'skuName':function(_0x3d790d){return _0x3d790d['skuName']||_0x3d790d[_0x901d('0x25')];},'callback':function(){},'callbackProductsList':function(){}},_0x444bff);_0x7dd5f4('');var _0xd30b1b=this;if(_0x1b8d3[_0x901d('0x26')]){var _0x508ac6=!0x1;_0x901d('0x3')===typeof window[_0x901d('0x27')]&&(_0x477cd4(_0x901d('0x28')),_0x7dd5f4[_0x901d('0x29')]({'url':_0x901d('0x2a'),'async':!0x1,'dataType':_0x901d('0x2b'),'error':function(){_0x477cd4(_0x901d('0x2c'));_0x508ac6=!0x0;}}));if(_0x508ac6)return _0x477cd4(_0x901d('0x2d'));}if(_0x901d('0x10')===typeof window[_0x901d('0x27')]&&_0x901d('0x3')!==typeof window[_0x901d('0x27')][_0x901d('0x2e')])var _0x1aba97=window[_0x901d('0x27')][_0x901d('0x2e')];else if('object'===typeof vtex&&_0x901d('0x10')===typeof vtex[_0x901d('0x2e')]&&'undefined'!==typeof vtex['checkout'][_0x901d('0x2f')])_0x1aba97=new vtex['checkout'][(_0x901d('0x2f'))]();else return _0x477cd4(_0x901d('0x30'));_0xd30b1b[_0x901d('0x31')]=_0x901d('0x32');var _0x4ec53f=function(_0xb1f35e){_0x7dd5f4(this)['append'](_0xb1f35e);_0xb1f35e['find']('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')['add'](_0x7dd5f4(_0x901d('0x33')))['on'](_0x901d('0x34'),function(){_0x3962c2['removeClass'](_0x901d('0x35'));_0x7dd5f4(document[_0x901d('0x36')])['removeClass'](_0x901d('0x37'));});_0x7dd5f4(document)[_0x901d('0x38')](_0x901d('0x39'))['on'](_0x901d('0x39'),function(_0x53663d){0x1b==_0x53663d['keyCode']&&(_0x3962c2[_0x901d('0x3a')](_0x901d('0x35')),_0x7dd5f4(document[_0x901d('0x36')])[_0x901d('0x3a')](_0x901d('0x37')));});var _0x199ff5=_0xb1f35e[_0x901d('0x3b')](_0x901d('0x3c'));_0xb1f35e[_0x901d('0x3b')](_0x901d('0x3d'))['on'](_0x901d('0x3e'),function(){_0xd30b1b['scrollCart']('-',void 0x0,void 0x0,_0x199ff5);return!0x1;});_0xb1f35e[_0x901d('0x3b')]('.qd-ddc-scrollDown')['on'](_0x901d('0x3f'),function(){_0xd30b1b['scrollCart'](void 0x0,void 0x0,void 0x0,_0x199ff5);return!0x1;});var _0x3a7325=_0xb1f35e['find'](_0x901d('0x40'));_0xb1f35e[_0x901d('0x3b')](_0x901d('0x41'))[_0x901d('0x42')]('')['on'](_0x901d('0x43'),function(_0x2787ae){_0xd30b1b[_0x901d('0x44')](_0x7dd5f4(this));0xd==_0x2787ae[_0x901d('0x45')]&&_0xb1f35e[_0x901d('0x3b')](_0x901d('0x46'))[_0x901d('0x47')]();});_0xb1f35e['find'](_0x901d('0x48'))[_0x901d('0x47')](function(_0x48ee6d){_0x48ee6d[_0x901d('0x49')]();_0x3a7325[_0x901d('0x4a')]();});_0xb1f35e[_0x901d('0x3b')](_0x901d('0x4b'))[_0x901d('0x47')](function(_0x1a3b45){_0x1a3b45[_0x901d('0x49')]();_0x3a7325[_0x901d('0x4c')]();});_0x7dd5f4(document)[_0x901d('0x38')](_0x901d('0x4d'))['on'](_0x901d('0x4d'),function(_0x4888e8){_0x7dd5f4(_0x4888e8['target'])[_0x901d('0x1')](_0xb1f35e[_0x901d('0x3b')](_0x901d('0x4e')))[_0x901d('0x8')]||_0x3a7325[_0x901d('0x4c')]();});_0xb1f35e['find']('.qd-ddc-cep-ok')[_0x901d('0x47')](function(_0x39e97f){_0x39e97f['preventDefault']();_0xd30b1b[_0x901d('0x4f')](_0xb1f35e[_0x901d('0x3b')]('.qd-ddc-cep'));});if(_0x1b8d3[_0x901d('0x50')]){var _0x444bff=0x0;_0x7dd5f4(this)['on'](_0x901d('0x51'),function(){var _0xb1f35e=function(){window[_0x901d('0x16')][_0x901d('0x52')]&&(_0xd30b1b['getCartInfoByUrl'](),window[_0x901d('0x16')][_0x901d('0x52')]=!0x1,_0x7dd5f4['fn'][_0x901d('0x53')](!0x0),_0xd30b1b[_0x901d('0x54')]());};_0x444bff=setInterval(function(){_0xb1f35e();},0x258);_0xb1f35e();});_0x7dd5f4(this)['on'](_0x901d('0x55'),function(){clearInterval(_0x444bff);});}};var _0x11953e=function(_0x17c716){_0x17c716=_0x7dd5f4(_0x17c716);_0x1b8d3[_0x901d('0x56')][_0x901d('0x57')]=_0x1b8d3[_0x901d('0x56')]['cartTotal'][_0x901d('0x2')]('#value',_0x901d('0x58'));_0x1b8d3[_0x901d('0x56')][_0x901d('0x57')]=_0x1b8d3[_0x901d('0x56')][_0x901d('0x57')][_0x901d('0x2')](_0x901d('0x59'),_0x901d('0x5a'));_0x1b8d3['texts'][_0x901d('0x57')]=_0x1b8d3[_0x901d('0x56')][_0x901d('0x57')]['replace'](_0x901d('0x5b'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x1b8d3[_0x901d('0x56')][_0x901d('0x57')]=_0x1b8d3[_0x901d('0x56')]['cartTotal'][_0x901d('0x2')](_0x901d('0x5c'),_0x901d('0x5d'));_0x17c716[_0x901d('0x3b')](_0x901d('0x5e'))[_0x901d('0x5f')](_0x1b8d3['texts'][_0x901d('0x60')]);_0x17c716[_0x901d('0x3b')](_0x901d('0x61'))[_0x901d('0x5f')](_0x1b8d3[_0x901d('0x56')][_0x901d('0x62')]);_0x17c716['find'](_0x901d('0x63'))['html'](_0x1b8d3['texts']['linkCheckout']);_0x17c716['find'](_0x901d('0x64'))[_0x901d('0x5f')](_0x1b8d3[_0x901d('0x56')]['cartTotal']);_0x17c716[_0x901d('0x3b')]('.qd-ddc-shipping')[_0x901d('0x5f')](_0x1b8d3[_0x901d('0x56')][_0x901d('0x65')]);_0x17c716[_0x901d('0x3b')](_0x901d('0x66'))[_0x901d('0x5f')](_0x1b8d3[_0x901d('0x56')][_0x901d('0x67')]);return _0x17c716;}(this[_0x901d('0x31')]);var _0x9d336b=0x0;_0x3962c2[_0x901d('0x68')](function(){0x0<_0x9d336b?_0x4ec53f[_0x901d('0x69')](this,_0x11953e[_0x901d('0x6a')]()):_0x4ec53f[_0x901d('0x69')](this,_0x11953e);_0x9d336b++;});window['_QuatroDigital_CartData']['callback'][_0x901d('0x6b')](function(){_0x7dd5f4(_0x901d('0x6c'))[_0x901d('0x5f')](window[_0x901d('0xa')][_0x901d('0x6d')]||'--');_0x7dd5f4(_0x901d('0x6e'))[_0x901d('0x5f')](window['_QuatroDigital_CartData']['qtt']||'0');_0x7dd5f4('.qd-ddc-infoTotalShipping')[_0x901d('0x5f')](window[_0x901d('0xa')][_0x901d('0x6f')]||'--');_0x7dd5f4(_0x901d('0x70'))[_0x901d('0x5f')](window[_0x901d('0xa')][_0x901d('0x71')]||'--');});var _0x2aeeb9=function(_0x2fd22b,_0x4ad18c){if('undefined'===typeof _0x2fd22b[_0x901d('0x72')])return _0x477cd4(_0x901d('0x73'));_0xd30b1b[_0x901d('0x74')][_0x901d('0x69')](this,_0x4ad18c);};_0xd30b1b[_0x901d('0x75')]=function(_0x1b62dc,_0x73488b){_0x901d('0x3')!=typeof _0x73488b?window[_0x901d('0x16')][_0x901d('0x76')]=_0x73488b:window['_QuatroDigital_DropDown'][_0x901d('0x76')]&&(_0x73488b=window[_0x901d('0x16')]['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x901d('0x76')]=void 0x0;},_0x1b8d3[_0x901d('0x77')]);_0x7dd5f4('.qd-ddc-wrapper')[_0x901d('0x3a')](_0x901d('0x78'));if(_0x1b8d3[_0x901d('0x26')]){var _0x57455f=function(_0x56c84f){window[_0x901d('0x16')][_0x901d('0x79')]=_0x56c84f;_0x2aeeb9(_0x56c84f,_0x73488b);_0x901d('0x3')!==typeof window[_0x901d('0x7a')]&&_0x901d('0x7b')===typeof window[_0x901d('0x7a')]['exec']&&window[_0x901d('0x7a')][_0x901d('0x7c')][_0x901d('0x69')](this);_0x7dd5f4('.qd-ddc-wrapper')[_0x901d('0x7d')](_0x901d('0x78'));};_0x901d('0x3')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']?(_0x57455f(window['_QuatroDigital_DropDown'][_0x901d('0x79')]),_0x901d('0x7b')===typeof _0x1b62dc&&_0x1b62dc(window['_QuatroDigital_DropDown']['getOrderForm'])):_0x7dd5f4[_0x901d('0x7e')]([_0x901d('0x72'),_0x901d('0x7f'),_0x901d('0x80')],{'done':function(_0x7b3467){_0x57455f['call'](this,_0x7b3467);_0x901d('0x7b')===typeof _0x1b62dc&&_0x1b62dc(_0x7b3467);},'fail':function(_0x1bd974){_0x477cd4([_0x901d('0x81'),_0x1bd974]);}});}else alert(_0x901d('0x82'));};_0xd30b1b['cartIsEmpty']=function(){var _0x2e1dcb=_0x7dd5f4('.qd-ddc-wrapper');_0x2e1dcb[_0x901d('0x3b')]('.qd-ddc-prodRow')[_0x901d('0x8')]?_0x2e1dcb[_0x901d('0x3a')](_0x901d('0x83')):_0x2e1dcb[_0x901d('0x7d')](_0x901d('0x83'));};_0xd30b1b[_0x901d('0x74')]=function(_0x408194){var _0x444bff=_0x7dd5f4(_0x901d('0x84'));_0x444bff[_0x901d('0x85')]();_0x444bff['each'](function(){var _0x444bff=_0x7dd5f4(this),_0x4e56ba,_0x48e772,_0x52196f=_0x7dd5f4(''),_0x501853;for(_0x501853 in window[_0x901d('0x16')][_0x901d('0x79')]['items'])if(_0x901d('0x10')===typeof window[_0x901d('0x16')][_0x901d('0x79')][_0x901d('0x72')][_0x501853]){var _0x32f4d1=window['_QuatroDigital_DropDown'][_0x901d('0x79')][_0x901d('0x72')][_0x501853];var _0x410ef4=_0x32f4d1['productCategoryIds'][_0x901d('0x2')](/^\/|\/$/g,'')[_0x901d('0x7')]('/');var _0x9b4d8e=_0x7dd5f4(_0x901d('0x86'));_0x9b4d8e[_0x901d('0x87')]({'data-sku':_0x32f4d1['id'],'data-sku-index':_0x501853,'data-qd-departament':_0x410ef4[0x0],'data-qd-category':_0x410ef4[_0x410ef4[_0x901d('0x8')]-0x1]});_0x9b4d8e[_0x901d('0x7d')](_0x901d('0x88')+_0x32f4d1[_0x901d('0x89')]);_0x9b4d8e[_0x901d('0x3b')](_0x901d('0x8a'))[_0x901d('0x8b')](_0x1b8d3[_0x901d('0x8c')](_0x32f4d1));_0x9b4d8e['find'](_0x901d('0x8d'))[_0x901d('0x8b')](isNaN(_0x32f4d1[_0x901d('0x8e')])?_0x32f4d1[_0x901d('0x8e')]:0x0==_0x32f4d1[_0x901d('0x8e')]?_0x901d('0x8f'):(_0x7dd5f4(_0x901d('0x90'))[_0x901d('0x87')]('content')||'R$')+'\x20'+qd_number_format(_0x32f4d1[_0x901d('0x8e')]/0x64,0x2,',','.'));_0x9b4d8e[_0x901d('0x3b')](_0x901d('0x91'))['attr']({'data-sku':_0x32f4d1['id'],'data-sku-index':_0x501853})[_0x901d('0x42')](_0x32f4d1[_0x901d('0x92')]);_0x9b4d8e[_0x901d('0x3b')](_0x901d('0x93'))[_0x901d('0x87')]({'data-sku':_0x32f4d1['id'],'data-sku-index':_0x501853});_0xd30b1b[_0x901d('0x94')](_0x32f4d1['id'],_0x9b4d8e[_0x901d('0x3b')](_0x901d('0x95')),_0x32f4d1[_0x901d('0x96')]);_0x9b4d8e[_0x901d('0x3b')](_0x901d('0x97'))[_0x901d('0x87')]({'data-sku':_0x32f4d1['id'],'data-sku-index':_0x501853});_0x9b4d8e[_0x901d('0x98')](_0x444bff);_0x52196f=_0x52196f[_0x901d('0x6b')](_0x9b4d8e);}try{var _0x3c3175=_0x444bff[_0x901d('0x0')]('.qd-ddc-wrapper')[_0x901d('0x3b')](_0x901d('0x99'));_0x3c3175[_0x901d('0x8')]&&''==_0x3c3175[_0x901d('0x42')]()&&window[_0x901d('0x16')][_0x901d('0x79')]['shippingData'][_0x901d('0x9a')]&&_0x3c3175[_0x901d('0x42')](window[_0x901d('0x16')][_0x901d('0x79')][_0x901d('0x80')][_0x901d('0x9a')][_0x901d('0x9b')]);}catch(_0x519cf5){_0x477cd4(_0x901d('0x9c')+_0x519cf5['message'],_0x901d('0x9d'));}_0xd30b1b[_0x901d('0x9e')](_0x444bff);_0xd30b1b[_0x901d('0x54')]();_0x408194&&_0x408194[_0x901d('0x9f')]&&function(){_0x48e772=_0x52196f['filter']('[data-sku=\x27'+_0x408194['lastSku']+'\x27]');_0x48e772['length']&&(_0x4e56ba=0x0,_0x52196f[_0x901d('0x68')](function(){var _0x408194=_0x7dd5f4(this);if(_0x408194['is'](_0x48e772))return!0x1;_0x4e56ba+=_0x408194['outerHeight']();}),_0xd30b1b['scrollCart'](void 0x0,void 0x0,_0x4e56ba,_0x444bff['add'](_0x444bff[_0x901d('0xa0')]())),_0x52196f['removeClass'](_0x901d('0xa1')),function(_0x126588){_0x126588[_0x901d('0x7d')]('qd-ddc-lastAdded');_0x126588['addClass'](_0x901d('0xa1'));setTimeout(function(){_0x126588[_0x901d('0x3a')](_0x901d('0xa2'));},_0x1b8d3['timeRemoveNewItemClass']);}(_0x48e772),_0x7dd5f4(document['body'])['addClass'](_0x901d('0xa3')),setTimeout(function(){_0x7dd5f4(document[_0x901d('0x36')])['removeClass'](_0x901d('0xa3'));},_0x1b8d3['timeRemoveNewItemClass']));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0x901d('0x72')]['length']?(_0x7dd5f4(_0x901d('0x36'))[_0x901d('0x3a')](_0x901d('0xa4'))[_0x901d('0x7d')](_0x901d('0xa5')),setTimeout(function(){_0x7dd5f4(_0x901d('0x36'))['removeClass'](_0x901d('0xa6'));},_0x1b8d3[_0x901d('0x77')])):_0x7dd5f4(_0x901d('0x36'))[_0x901d('0x3a')](_0x901d('0xa7'))[_0x901d('0x7d')]('qd-ddc-cart-empty');}());'function'===typeof _0x1b8d3[_0x901d('0xa8')]?_0x1b8d3[_0x901d('0xa8')][_0x901d('0x69')](this):_0x477cd4(_0x901d('0xa9'));};_0xd30b1b[_0x901d('0x94')]=function(_0x88b8c7,_0x12e0c4,_0x306491){function _0x3cb399(){_0x1b8d3[_0x901d('0xaa')]&&'string'==typeof _0x306491&&(_0x306491=_0x306491[_0x901d('0x2')](_0x901d('0xab'),_0x901d('0xac')));_0x12e0c4[_0x901d('0x3a')](_0x901d('0xad'))[_0x901d('0xae')](function(){_0x7dd5f4(this)[_0x901d('0x7d')](_0x901d('0xad'));})[_0x901d('0x87')](_0x901d('0xaf'),_0x306491);}_0x306491?_0x3cb399():isNaN(_0x88b8c7)?_0x477cd4(_0x901d('0xb0'),_0x901d('0xb1')):alert(_0x901d('0xb2'));};_0xd30b1b[_0x901d('0x9e')]=function(_0x577512){var _0x444bff=function(_0xcceba6,_0x3a369b){var _0x98c3ff=_0x7dd5f4(_0xcceba6);var _0x364983=_0x98c3ff[_0x901d('0x87')](_0x901d('0xb3'));var _0x410ef4=_0x98c3ff[_0x901d('0x87')]('data-sku-index');if(_0x364983){var _0x1268fc=parseInt(_0x98c3ff[_0x901d('0x42')]())||0x1;_0xd30b1b[_0x901d('0xb4')]([_0x364983,_0x410ef4],_0x1268fc,_0x1268fc+0x1,function(_0x2a9ebc){_0x98c3ff[_0x901d('0x42')](_0x2a9ebc);_0x901d('0x7b')===typeof _0x3a369b&&_0x3a369b();});}};var _0x5146ec=function(_0xba6247,_0xa215a0){var _0x444bff=_0x7dd5f4(_0xba6247);var _0x1823a8=_0x444bff[_0x901d('0x87')]('data-sku');var _0x4ded7d=_0x444bff[_0x901d('0x87')]('data-sku-index');if(_0x1823a8){var _0x410ef4=parseInt(_0x444bff[_0x901d('0x42')]())||0x2;_0xd30b1b['changeQantity']([_0x1823a8,_0x4ded7d],_0x410ef4,_0x410ef4-0x1,function(_0x153537){_0x444bff['val'](_0x153537);_0x901d('0x7b')===typeof _0xa215a0&&_0xa215a0();});}};var _0x488f9e=function(_0x3118f5,_0x127231){var _0x548db2=_0x7dd5f4(_0x3118f5);var _0x2a47cf=_0x548db2['attr']('data-sku');var _0x410ef4=_0x548db2[_0x901d('0x87')](_0x901d('0xb5'));if(_0x2a47cf){var _0x228005=parseInt(_0x548db2[_0x901d('0x42')]())||0x1;_0xd30b1b[_0x901d('0xb4')]([_0x2a47cf,_0x410ef4],0x1,_0x228005,function(_0x4ead3b){_0x548db2[_0x901d('0x42')](_0x4ead3b);_0x901d('0x7b')===typeof _0x127231&&_0x127231();});}};var _0x410ef4=_0x577512[_0x901d('0x3b')](_0x901d('0xb6'));_0x410ef4['addClass'](_0x901d('0xb7'))[_0x901d('0x68')](function(){var _0x577512=_0x7dd5f4(this);_0x577512['find'](_0x901d('0xb8'))['on'](_0x901d('0xb9'),function(_0x125a96){_0x125a96[_0x901d('0x49')]();_0x410ef4[_0x901d('0x7d')](_0x901d('0xba'));_0x444bff(_0x577512[_0x901d('0x3b')](_0x901d('0x91')),function(){_0x410ef4[_0x901d('0x3a')](_0x901d('0xba'));});});_0x577512[_0x901d('0x3b')](_0x901d('0xbb'))['on'](_0x901d('0xbc'),function(_0x380480){_0x380480[_0x901d('0x49')]();_0x410ef4[_0x901d('0x7d')](_0x901d('0xba'));_0x5146ec(_0x577512[_0x901d('0x3b')](_0x901d('0x91')),function(){_0x410ef4[_0x901d('0x3a')](_0x901d('0xba'));});});_0x577512[_0x901d('0x3b')](_0x901d('0x91'))['on'](_0x901d('0xbd'),function(){_0x410ef4[_0x901d('0x7d')](_0x901d('0xba'));_0x488f9e(this,function(){_0x410ef4[_0x901d('0x3a')](_0x901d('0xba'));});});_0x577512[_0x901d('0x3b')](_0x901d('0x91'))['on'](_0x901d('0xbe'),function(_0x4696fb){0xd==_0x4696fb[_0x901d('0x45')]&&(_0x410ef4[_0x901d('0x7d')]('qd-loading'),_0x488f9e(this,function(){_0x410ef4['removeClass'](_0x901d('0xba'));}));});});_0x577512[_0x901d('0x3b')](_0x901d('0xbf'))['each'](function(){var _0x577512=_0x7dd5f4(this);_0x577512[_0x901d('0x3b')](_0x901d('0x93'))['on']('click.qd_ddc_remove',function(){_0x577512[_0x901d('0x7d')](_0x901d('0xba'));_0xd30b1b['removeProduct'](_0x7dd5f4(this),function(_0x1854c4){_0x1854c4?_0x577512[_0x901d('0xc0')](!0x0)[_0x901d('0xc1')](function(){_0x577512[_0x901d('0xc2')]();_0xd30b1b[_0x901d('0x54')]();}):_0x577512[_0x901d('0x3a')](_0x901d('0xba'));});return!0x1;});});};_0xd30b1b[_0x901d('0x44')]=function(_0x345b67){var _0x23420d=_0x345b67[_0x901d('0x42')]();_0x23420d=_0x23420d['replace'](/[^0-9\-]/g,'');_0x23420d=_0x23420d[_0x901d('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x23420d=_0x23420d[_0x901d('0x2')](/(.{9}).*/g,'$1');_0x345b67[_0x901d('0x42')](_0x23420d);};_0xd30b1b['shippingCalculate']=function(_0x2df391){var _0x1ba388=_0x2df391[_0x901d('0x42')]();0x9<=_0x1ba388[_0x901d('0x8')]&&(_0x2df391['data'](_0x901d('0xc3'))!=_0x1ba388&&_0x1aba97[_0x901d('0xc4')]({'postalCode':_0x1ba388,'country':_0x901d('0xc5')})['done'](function(_0x3f6cb4){_0x2df391[_0x901d('0x1')]('.qd-ddc-cep-tooltip-text')[_0x901d('0x3b')](_0x901d('0xc6'))['remove']();window[_0x901d('0x16')]['getOrderForm']=_0x3f6cb4;_0xd30b1b['getCartInfoByUrl']();_0x3f6cb4=_0x3f6cb4[_0x901d('0x80')][_0x901d('0xc7')][0x0][_0x901d('0xc8')];for(var _0x410ef4=_0x7dd5f4(_0x901d('0xc9')),_0x8cc655=0x0;_0x8cc655<_0x3f6cb4[_0x901d('0x8')];_0x8cc655++){var _0x47a1ba=_0x3f6cb4[_0x8cc655],_0x40b9a9=0x1<_0x47a1ba[_0x901d('0xca')]?_0x47a1ba['shippingEstimate'][_0x901d('0x2')]('bd','\x20dia\x20útil'):_0x47a1ba['shippingEstimate'][_0x901d('0x2')]('bd',_0x901d('0xcb')),_0x2bc3c8=_0x7dd5f4(_0x901d('0xcc'));_0x2bc3c8[_0x901d('0x8b')](_0x901d('0xcd')+qd_number_format(_0x47a1ba[_0x901d('0xce')]/0x64,0x2,',','.')+_0x901d('0xcf')+_0x47a1ba[_0x901d('0x25')]+_0x901d('0xd0')+_0x40b9a9+'\x20para\x20o\x20CEP\x20'+_0x1ba388+'</td>');_0x2bc3c8[_0x901d('0x98')](_0x410ef4[_0x901d('0x3b')](_0x901d('0xd1')));}_0x410ef4[_0x901d('0xd2')](_0x2df391[_0x901d('0x1')](_0x901d('0xd3'))['find'](_0x901d('0x4b')));})[_0x901d('0xd4')](function(_0x3638fa){_0x477cd4([_0x901d('0xd5'),_0x3638fa]);updateCartData();}),_0x2df391[_0x901d('0xd6')](_0x901d('0xc3'),_0x1ba388));};_0xd30b1b[_0x901d('0xb4')]=function(_0x392957,_0x57371c,_0x3a1ac3,_0x15df5e){function _0x3869c5(_0x3f9f20){_0x3f9f20='boolean'!==typeof _0x3f9f20?!0x1:_0x3f9f20;_0xd30b1b[_0x901d('0x75')]();window[_0x901d('0x16')][_0x901d('0x52')]=!0x1;_0xd30b1b[_0x901d('0x54')]();_0x901d('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x901d('0x7b')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0x901d('0x7a')][_0x901d('0x7c')][_0x901d('0x69')](this);_0x901d('0x7b')===typeof adminCart&&adminCart();_0x7dd5f4['fn'][_0x901d('0x53')](!0x0,void 0x0,_0x3f9f20);_0x901d('0x7b')===typeof _0x15df5e&&_0x15df5e(_0x57371c);}_0x3a1ac3=_0x3a1ac3||0x1;if(0x1>_0x3a1ac3)return _0x57371c;if(_0x1b8d3[_0x901d('0x26')]){if(_0x901d('0x3')===typeof window['_QuatroDigital_DropDown'][_0x901d('0x79')][_0x901d('0x72')][_0x392957[0x1]])return _0x477cd4(_0x901d('0xd7')+_0x392957[0x1]+']'),_0x57371c;window[_0x901d('0x16')]['getOrderForm'][_0x901d('0x72')][_0x392957[0x1]][_0x901d('0x92')]=_0x3a1ac3;window[_0x901d('0x16')][_0x901d('0x79')][_0x901d('0x72')][_0x392957[0x1]][_0x901d('0xd8')]=_0x392957[0x1];_0x1aba97[_0x901d('0xd9')]([window[_0x901d('0x16')][_0x901d('0x79')][_0x901d('0x72')][_0x392957[0x1]]],[_0x901d('0x72'),_0x901d('0x7f'),_0x901d('0x80')])['done'](function(_0x58d318){window['_QuatroDigital_DropDown']['getOrderForm']=_0x58d318;_0x3869c5(!0x0);})['fail'](function(_0x506f1f){_0x477cd4([_0x901d('0xda'),_0x506f1f]);_0x3869c5();});}else _0x477cd4(_0x901d('0xdb'));};_0xd30b1b[_0x901d('0xdc')]=function(_0x56f641,_0x1056b2){function _0xc85367(_0x11ad5b){_0x11ad5b='boolean'!==typeof _0x11ad5b?!0x1:_0x11ad5b;_0x901d('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0x901d('0x7b')===typeof window[_0x901d('0x7a')]['exec']&&window[_0x901d('0x7a')][_0x901d('0x7c')][_0x901d('0x69')](this);_0x901d('0x7b')===typeof adminCart&&adminCart();_0x7dd5f4['fn']['simpleCart'](!0x0,void 0x0,_0x11ad5b);_0x901d('0x7b')===typeof _0x1056b2&&_0x1056b2(_0x1f182b);}var _0x1f182b=!0x1,_0x410ef4=_0x7dd5f4(_0x56f641)['attr'](_0x901d('0xb5'));if(_0x1b8d3[_0x901d('0x26')]){if(_0x901d('0x3')===typeof window[_0x901d('0x16')][_0x901d('0x79')][_0x901d('0x72')][_0x410ef4])return _0x477cd4(_0x901d('0xd7')+_0x410ef4+']'),_0x1f182b;window[_0x901d('0x16')][_0x901d('0x79')][_0x901d('0x72')][_0x410ef4][_0x901d('0xd8')]=_0x410ef4;_0x1aba97[_0x901d('0xdd')]([window[_0x901d('0x16')][_0x901d('0x79')]['items'][_0x410ef4]],[_0x901d('0x72'),_0x901d('0x7f'),_0x901d('0x80')])[_0x901d('0xde')](function(_0x4d9fef){_0x1f182b=!0x0;window[_0x901d('0x16')]['getOrderForm']=_0x4d9fef;_0x2aeeb9(_0x4d9fef);_0xc85367(!0x0);})[_0x901d('0xd4')](function(_0x55fe6e){_0x477cd4([_0x901d('0xdf'),_0x55fe6e]);_0xc85367();});}else alert(_0x901d('0xe0'));};_0xd30b1b[_0x901d('0xe1')]=function(_0x3af068,_0x29583e,_0x207eac,_0x44d3b9){_0x44d3b9=_0x44d3b9||_0x7dd5f4(_0x901d('0xe2'));_0x3af068=_0x3af068||'+';_0x29583e=_0x29583e||0.9*_0x44d3b9[_0x901d('0xe3')]();_0x44d3b9[_0x901d('0xc0')](!0x0,!0x0)[_0x901d('0xe4')]({'scrollTop':isNaN(_0x207eac)?_0x3af068+'='+_0x29583e+'px':_0x207eac});};_0x1b8d3['updateOnlyHover']||(_0xd30b1b['getCartInfoByUrl'](),_0x7dd5f4['fn'][_0x901d('0x53')](!0x0));_0x7dd5f4(window)['on'](_0x901d('0xe5'),function(){try{window[_0x901d('0x16')][_0x901d('0x79')]=void 0x0,_0xd30b1b['getCartInfoByUrl']();}catch(_0x32134e){_0x477cd4(_0x901d('0xe6')+_0x32134e[_0x901d('0xf')],_0x901d('0xe7'));}});_0x901d('0x7b')===typeof _0x1b8d3[_0x901d('0xb')]?_0x1b8d3[_0x901d('0xb')][_0x901d('0x69')](this):_0x477cd4(_0x901d('0xe8'));};_0x7dd5f4['fn']['QD_dropDownCart']=function(_0x1d6793){var _0x2a6e67=_0x7dd5f4(this);_0x2a6e67['fn']=new _0x7dd5f4['QD_dropDownCart'](this,_0x1d6793);return _0x2a6e67;};}catch(_0x4e9def){_0x901d('0x3')!==typeof console&&_0x901d('0x7b')===typeof console['error']&&console[_0x901d('0xd')](_0x901d('0xe'),_0x4e9def);}}(this));(function(_0x4c18c1){try{var _0x451c5a=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x901d('0x7a')]||{};window[_0x901d('0x7a')][_0x901d('0x72')]={};window[_0x901d('0x7a')]['allowRecalculate']=!0x1;window['_QuatroDigital_AmountProduct']['buyButtonClicked']=!0x1;window[_0x901d('0x7a')][_0x901d('0xe9')]=!0x1;var _0x4e3acd=function(){if(window[_0x901d('0x7a')][_0x901d('0xea')]){var _0xbfe14a=!0x1;var _0x532fa2={};window[_0x901d('0x7a')][_0x901d('0x72')]={};for(_0x49a3a3 in window['_QuatroDigital_DropDown'][_0x901d('0x79')][_0x901d('0x72')])if(_0x901d('0x10')===typeof window[_0x901d('0x16')][_0x901d('0x79')][_0x901d('0x72')][_0x49a3a3]){var _0x8f76ff=window[_0x901d('0x16')][_0x901d('0x79')][_0x901d('0x72')][_0x49a3a3];_0x901d('0x3')!==typeof _0x8f76ff[_0x901d('0xeb')]&&null!==_0x8f76ff[_0x901d('0xeb')]&&''!==_0x8f76ff[_0x901d('0xeb')]&&(window[_0x901d('0x7a')][_0x901d('0x72')][_0x901d('0xec')+_0x8f76ff[_0x901d('0xeb')]]=window[_0x901d('0x7a')]['items']['prod_'+_0x8f76ff[_0x901d('0xeb')]]||{},window[_0x901d('0x7a')][_0x901d('0x72')]['prod_'+_0x8f76ff['productId']][_0x901d('0xed')]=_0x8f76ff[_0x901d('0xeb')],_0x532fa2[_0x901d('0xec')+_0x8f76ff[_0x901d('0xeb')]]||(window[_0x901d('0x7a')][_0x901d('0x72')][_0x901d('0xec')+_0x8f76ff['productId']][_0x901d('0xee')]=0x0),window[_0x901d('0x7a')][_0x901d('0x72')][_0x901d('0xec')+_0x8f76ff['productId']]['qtt']+=_0x8f76ff[_0x901d('0x92')],_0xbfe14a=!0x0,_0x532fa2[_0x901d('0xec')+_0x8f76ff[_0x901d('0xeb')]]=!0x0);}var _0x49a3a3=_0xbfe14a;}else _0x49a3a3=void 0x0;window[_0x901d('0x7a')][_0x901d('0xea')]&&(_0x451c5a(_0x901d('0xef'))[_0x901d('0xc2')](),_0x451c5a(_0x901d('0xf0'))[_0x901d('0x3a')](_0x901d('0xf1')));for(var _0x312ca4 in window['_QuatroDigital_AmountProduct'][_0x901d('0x72')]){_0x8f76ff=window['_QuatroDigital_AmountProduct'][_0x901d('0x72')][_0x312ca4];if(_0x901d('0x10')!==typeof _0x8f76ff)return;_0x532fa2=_0x451c5a(_0x901d('0xf2')+_0x8f76ff['prodId']+']')[_0x901d('0x0')]('li');if(window[_0x901d('0x7a')][_0x901d('0xea')]||!_0x532fa2['find'](_0x901d('0xef'))['length'])_0xbfe14a=_0x451c5a(_0x901d('0xf3')),_0xbfe14a[_0x901d('0x3b')](_0x901d('0xf4'))[_0x901d('0x5f')](_0x8f76ff[_0x901d('0xee')]),_0x8f76ff=_0x532fa2[_0x901d('0x3b')](_0x901d('0xf5')),_0x8f76ff[_0x901d('0x8')]?_0x8f76ff['prepend'](_0xbfe14a)['addClass'](_0x901d('0xf1')):_0x532fa2[_0x901d('0xf6')](_0xbfe14a);}_0x49a3a3&&(window['_QuatroDigital_AmountProduct'][_0x901d('0xea')]=!0x1);};window[_0x901d('0x7a')][_0x901d('0x7c')]=function(){window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x0;_0x4e3acd['call'](this);};_0x451c5a(document)[_0x901d('0xf7')](function(){_0x4e3acd[_0x901d('0x69')](this);});}catch(_0x50c995){'undefined'!==typeof console&&'function'===typeof console[_0x901d('0xd')]&&console[_0x901d('0xd')](_0x901d('0xe'),_0x50c995);}}(this));(function(){try{var _0x41af59=jQuery,_0x47e9f0,_0x480b67={'selector':_0x901d('0xf8'),'dropDown':{},'buyButton':{}};_0x41af59[_0x901d('0xf9')]=function(_0xc35e4e){var _0x4e1a98={};_0x47e9f0=_0x41af59[_0x901d('0x21')](!0x0,{},_0x480b67,_0xc35e4e);_0xc35e4e=_0x41af59(_0x47e9f0[_0x901d('0xfa')])['QD_dropDownCart'](_0x47e9f0[_0x901d('0xfb')]);_0x4e1a98[_0x901d('0xfc')]=_0x901d('0x3')!==typeof _0x47e9f0['dropDown'][_0x901d('0x50')]&&!0x1===_0x47e9f0[_0x901d('0xfb')][_0x901d('0x50')]?_0x41af59(_0x47e9f0['selector'])[_0x901d('0xfd')](_0xc35e4e['fn'],_0x47e9f0[_0x901d('0xfc')]):_0x41af59(_0x47e9f0[_0x901d('0xfa')])[_0x901d('0xfd')](_0x47e9f0[_0x901d('0xfc')]);_0x4e1a98[_0x901d('0xfb')]=_0xc35e4e;return _0x4e1a98;};_0x41af59['fn']['smartCart']=function(){_0x901d('0x10')===typeof console&&_0x901d('0x7b')===typeof console[_0x901d('0x11')]&&console[_0x901d('0x11')](_0x901d('0xfe'));};_0x41af59[_0x901d('0xff')]=_0x41af59['fn']['smartCart'];}catch(_0x3b1c57){_0x901d('0x3')!==typeof console&&_0x901d('0x7b')===typeof console[_0x901d('0xd')]&&console[_0x901d('0xd')](_0x901d('0xe'),_0x3b1c57);}}());