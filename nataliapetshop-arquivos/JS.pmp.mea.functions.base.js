/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});"function"!=typeof String.prototype.capitalize&&(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase()});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E",
"\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.vtexBindQuickViewDestroy();
			Common.applySmartCart();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.qdOverlay();
			Common.openSearchModal();
			Common.openUserLinks();
			Common.applyTipBarCarousel();
			Common.applyMosaicCategorieBanners();
			Common.applyAmazingMenuFooter();
			Common.showFooterLinks();
			Common.smartQuantityShelf();
			Common.applyCarouselShelf();
			Common.saveAmountFix();
			Common.buyInShelf();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
		},
		windowOnload: function() {
			Common.saveAmountFix();
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		openUserLinks:function(){
			$('.header-qd-v1-user-action').click(function() {
				$(this).toggleClass('qd-on');
			});
		},
		openSearchModal: function() {
			$('.header-qd-v1-actions-search, .header-qd-v1-action-search').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
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
		applyAmazingMenu: function() {
			$('.header-qd-v1-amazing-menu').QD_amazingMenu({
				callback: function() {
					$('ul.qd-am-dropdown-menu').each(function() {
						$(this).wrapInner('<li class="container"><ul></ul></li>');
					});
				}
			});
		},		
		applyAmazingMenuFooter: function() {
			$('.footer-qd-v1-menu-list, .footer-qd-v1-category-list').QD_amazingMenu();
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

			$('.header-qd-v1-amazing-menu-trigger').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function() {
				$(document.body).removeClass('qd-am-on');
			});
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-menu-list > ul > li, .footer-qd-v1-category-list > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applyTipBarCarousel: function () {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 5,
				slidesToScroll: 5,
				infinite: true,
				draggable: false,
				responsive: [
					{
						breakpoint: 1366,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
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
		applyMosaicCategorieBanners: function () {
			$('.mosaic-categories-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				containerWidth: 1336,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		smartQuantityShelf: function() {
            $(".shelf-qd-v1-buy-button:not(.qd-on)").addClass('qd-on').QD_smartQuantity({
                buyButton: ".btn-add-buy-button-asynchronous"
            });
		},
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper);
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
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		appendSkuPopUpCloseBtn: function() {
			var wrapper = $('.boxPopUp2 .selectSkuTitle:not(.qd-on)');
			wrapper.addClass('qd-on').append($('<span class="modal-qd-v1-box-popup-close">Fechar</span>').click(function() {
				$(window).trigger('vtex.modal.hide');
				wrapper.removeClass('.qd-on');
				return false;
			}));
		},
		buyInShelf: function() {
            var fn = function() {
                $(".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous:not('.remove-href')").not('.qd-on-bb').addClass("show qd-on-bb").click(function(e) {
                    e.preventDefault();
                    var $t = $(this);

                    Common.buyInShelfOpenModal($t.getParent(".wrapper-buy-button-asynchronous").find("input[class*='buy-button-asynchronous-product-url']" || "").attr("class").replace(/[^0-9]+/gi, ""), $t.getParent(".shelf-qd-v1-buy-button").find(".qd-sq-quantity").val() || 1);
                });
            };
            fn();

            // Ações
            $(".qd-v1-modal").on("hidden.bs.modal", function() {
                $(this).removeClass("shelf-qd-v1-buy-button-modal");
            });

            // No callback do infinity scroll
            $(window).on("QuatroDigital.is_Callback", function() {
                fn();
            });
		},
		buyInShelfOpenModal: function(productId, qty) {
			var modal = $(".qd-v1-modal");
            modal.addClass("shelf-qd-v1-buy-button-modal");

            // Header
            var header = modal.find(".modal-header");
            var modalContent = header.closest(".modal-content");
            modalContent.addClass("buy-in-shelf-open-modal-custom");
            header.children(":not(.close)").remove();
            header.append('<h3>Escolha a variação do produto</h3>');

            var iframe = $('<iframe src="/product-sku-modal?idproduto=' + productId + '&qty=' + qty + '" frameborder="0"></iframe>');
            modal.find(".modal-body").empty().append(iframe);
            modal.modal();

            iframe.load(function() {
                try {
                    var $t = $(this);
                    $t.height($t.contents().find("body").outerHeight(true) + 5);
                } catch (e) { if (typeof console !== "undefined" && typeof console.error === "function") console.error(e.message); };
            });

            // Callback do Quick View
            window._QuatroDigital_prodBuyCallback = function(jqXHR, textStatus, prodLink, skus) {
                modal.modal("hide");
                $(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
            };
        }			
	};

	var Home = {
		init: function() {
			Home.sliderFull();
			Home.applySpecialShelfCarousel();
			Home.seeCoupon();
			Home.applyBrandsCarousel();			
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
				draggable: false,
				autoplay: true,
				autoplaySpeed: 4000				
			});

			wrapper.each(function() {
				$(this).find('.slick-arrow').wrapAll('<div class="slick-nav" />');
			});
		},
		applySpecialShelfCarousel: function() {
			var wrapper = $('.home-qd-v1-special-carousel-banner');

			if (!wrapper.length)
				return false;

			var hasBanner = wrapper.find('.box-banner').length;
			if (!hasBanner)
				wrapper.find('[class*="col-md-"]').removeClass().addClass('col-xs-12');

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').prependTo($t.children('.container'));
			});

			var slideQtd = hasBanner ? 3 : 4;

			wrapper.find('.prateleira').slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				draggable: false,
				speed: 700,
			});
		},
		seeCoupon: function () {
			$('.product-qd-v1-see-coupon').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-coupon-method').toggleClass('qd-is-visible');
			});
		},
		applyBrandsCarousel: function() {
			var wrapper = $('.brand-carousel-qd-v1-carousel, .brands-qd-v1-carousel');

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
							slidesToShow: 2,
							slidesToScroll: 2
						}
					}
				]
			});
		}		
	};

	var Search = {
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {
		},
		hideExtendedMenu: function () {
			$(".search-qd-v1-navigator ul").each(function () {
				var t, li, qtt, moreLink, moreLi, click, liHide;

				t = $(this);
				li = t.find(">li");
				qtt = 200;

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
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				
				$(document.body).toggleClass('qd-sn-on');
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
		}
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.forceImageZoom();
			Product.setAvailableBodyClass();
			$(window).on('skuSelectable.vtex', Product.applyCarouselThumb);
			Product.scrollToDescription();
			Product.doublePrice();
			Product.seeInstalments();
			Product.seeShippingFree();
			Product.qdClickSeeShipping();
			Product.openShipping();
			Product.showFloatingBuyBar();
		},
		ajaxStop: function() {
			Product.applyCarouselThumb();
		},
		windowOnload: function() {},
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
		},
		forceImageZoom: function() {
			try {
				var orig = window.ImageControl;
				window.ImageControl = function() {
					$("ul.thumbs a").each(function() {
						var $t = $(this);
						if ($t.attr("zoom"))
							return;
						var rel = $t.attr("rel");
						if (rel)
							$t.attr("zoom", rel.replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1000-1000"));
					});
					orig.apply(this, arguments);
				}
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Ops, algo saiu errado como zoom :( . Detalhes: " + e.message)); }
		},
		applyCarouselThumb: function() {
			// Wrapper onde foi inserido as thumbs
			var thumbsSliderWrapper = $('.product-qd-v1-thumbs-mobile');
			thumbsSliderWrapper.removeClass('slick-initialized slick-slider');
			
			// Inicializa com o primeiro selecionado
			thumbsSliderWrapper.on('init', function(event, slick){
				$(this).find('.slick-current a').addClass('ON');
				$(this).find('a').on('click', function() {
					thumbsSliderWrapper.slick('slickGoTo', $(this).closest('li').attr('data-slick-index'));
				});
			});

			thumbsSliderWrapper.slick({
				slidesToShow: 5,
				slidesToScroll: 5,				  
  				arrows: false,
				infinite: false,
				draggable: true,
				swipeToSlide: true,
				edgeFriction: .1,
				variableWidth: true,
				responsive: [
					{
					breakpoint: 600,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
							variableWidth: false
						}
					}
				]
			});
		},
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description').offset().top -100
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
		applySmartQuantity: function () {
			$('.product-qd-v1-sku-selection-box, .product-floating-bar-buy').QD_smartQuantity();

			$(window).on("skuSelected.vtex", function (e, id, data) {
				$('.qd-sq-more, .qd-sq-minus').click();
			});
		},
		seeInstalments: function () {
			$('.product-qd-v1-see-installments').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-installments-method').toggleClass('qd-is-visible');
			});
		},
		seeShippingFree: function () {
			$('.product-qd-v1-see-shipping-free').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-shipping-free-method').toggleClass('qd-is-visible');
			});
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		qdClickSeeShipping: function() {
			var modal = $(".qd-v1-modal-shipping-fade");
			var content = $('.product-qd-v1-shipping-method');
			content.appendTo(modal.find('.modal-body'));

			$(".product-qd-v1-shipping-title").click(function() {
				modal.find('.modal-body:not(.qd-on)').addClass('qd-on');
				modal.addClass('qd-v1-modal-shipping');
				modal.modal();
			});
		}
	};

	var List = {
		run: function() {},
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
	};

	var Institutional = {
		init: function() {},
		ajaxStop: function() {},
		windowOnload: function() {}
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

/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
	a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
	(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt;
	d=d.wrap("<span></span>");var h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
	a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

/* PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);

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
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var c=jQuery,e=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(c){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(l){try{console.warn(b.join("\n"))}catch(m){}}}};"function"!==typeof c.QD_scrollToggle&&(c.QD_scrollToggle=function(a){var d=[];if("string"!==typeof a&&"number"!==typeof a||"auto"===a)if("auto"===a)d.push(c(window).height());else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var b=a.split(","),f;for(f in b)"function"!==typeof b[f]&&(a=parseInt(b[f].trim()),
isNaN(a)||d.push(a))}if(!d.length)return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"undefined"===typeof document.body.setAttribute)return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===typeof document.body.removeAttribute)return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"undefined"===
typeof document.body.getAttribute)return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!c(window).scrollTop||isNaN(parseInt(c(window).scrollTop())))return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",
g.message)}c(window).scroll(function(){for(var a=0;a<d.length;a++)c(window).scrollTop()>d[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+a)})},c(function(){var a=c("body[data-qd-scroll-limit]");a.length&&c.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
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
var _0x0040=['hide','addClass','qd-ssa-hide','removeClass','qd-ssa-show','filter','length','[data-qd-ssa-text=\x22default\x22]','html','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','ngnyvncrgfubc%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','ite','---','indexOf','extend','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','unavailable','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','function','QD_smartStockAvailable','object','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','toLowerCase','info','error','warn','apply','qd-ssa-sku-no-selected','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','find'];(function(_0x29d0d7,_0xc8a6ce){var _0x54fac3=function(_0x21bc88){while(--_0x21bc88){_0x29d0d7['push'](_0x29d0d7['shift']());}};_0x54fac3(++_0xc8a6ce);}(_0x0040,0x131));var _0x0004=function(_0xa72931,_0x37d87a){_0xa72931=_0xa72931-0x0;var _0x13b2f5=_0x0040[_0xa72931];return _0x13b2f5;};(function(_0x434ae6){function _0x53076c(_0x58e64d,_0xfdb9c){_0x311d66['qdAjax']({'url':'/produto/sku/'+_0x58e64d,'clearQueueDelay':null,'success':_0xfdb9c,'error':function(){_0x2f0f56(_0x0004('0x0'));}});}var _0x311d66=jQuery;if(_0x0004('0x1')!==typeof _0x311d66['fn'][_0x0004('0x2')]){var _0x2f0f56=function(_0x3a9230,_0x5aa1be){if(_0x0004('0x3')===typeof console){var _0x599321;_0x0004('0x3')===typeof _0x3a9230?(_0x3a9230[_0x0004('0x4')](_0x0004('0x5')),_0x599321=_0x3a9230):_0x599321=[_0x0004('0x5')+_0x3a9230];_0x0004('0x6')===typeof _0x5aa1be||'alerta'!==_0x5aa1be[_0x0004('0x7')]()&&'aviso'!==_0x5aa1be[_0x0004('0x7')]()?'undefined'!==typeof _0x5aa1be&&'info'===_0x5aa1be[_0x0004('0x7')]()?console[_0x0004('0x8')]['apply'](console,_0x599321):console[_0x0004('0x9')]['apply'](console,_0x599321):console[_0x0004('0xa')][_0x0004('0xb')](console,_0x599321);}},_0x49f1ff={},_0x3d18a3=function(_0x47b89e,_0x3f63d4){function _0x25caac(_0x4b464f){try{_0x47b89e['removeClass'](_0x0004('0xc'))['addClass'](_0x0004('0xd'));var _0xc1806e=_0x4b464f[0x0][_0x0004('0xe')][0x0][_0x0004('0xf')];_0x47b89e[_0x0004('0x10')](_0x0004('0x11'),_0xc1806e);_0x47b89e[_0x0004('0x12')](function(){var _0x47b89e=_0x311d66(this)[_0x0004('0x13')]('[data-qd-ssa-text]');if(0x1>_0xc1806e)return _0x47b89e[_0x0004('0x14')]()[_0x0004('0x15')](_0x0004('0x16'))[_0x0004('0x17')](_0x0004('0x18'));var _0x4b464f=_0x47b89e[_0x0004('0x19')]('[data-qd-ssa-text=\x22'+_0xc1806e+'\x22]'),_0x4b464f=_0x4b464f[_0x0004('0x1a')]?_0x4b464f:_0x47b89e[_0x0004('0x19')](_0x0004('0x1b'));_0x47b89e[_0x0004('0x14')]()['addClass'](_0x0004('0x16'))[_0x0004('0x17')](_0x0004('0x18'));_0x4b464f[_0x0004('0x1c')](_0x4b464f[_0x0004('0x1c')]()['replace'](_0x0004('0x1d'),_0xc1806e));_0x4b464f[_0x0004('0x1e')]()[_0x0004('0x15')](_0x0004('0x18'))[_0x0004('0x17')](_0x0004('0x16'));});}catch(_0x39f13a){_0x2f0f56([_0x0004('0x1f'),_0x39f13a[_0x0004('0x20')]]);}}if(_0x47b89e['length']){_0x47b89e[_0x0004('0x15')](_0x0004('0x21'));_0x47b89e[_0x0004('0x15')]('qd-ssa-sku-no-selected');try{_0x47b89e[_0x0004('0x15')](_0x0004('0x22')+vtxctx[_0x0004('0x23')][_0x0004('0x24')](';')['length']);}catch(_0x5a3da2){_0x2f0f56([_0x0004('0x25'),_0x5a3da2[_0x0004('0x20')]]);}_0x311d66(window)['on'](_0x0004('0x26'),function(_0x46df4b,_0x356acd,_0x28cfea){try{_0x53076c(_0x28cfea[_0x0004('0x27')],function(_0x5bc1ab){_0x25caac(_0x5bc1ab);0x1===vtxctx[_0x0004('0x23')][_0x0004('0x24')](';')['length']&&0x0==_0x5bc1ab[0x0]['SkuSellersInformation'][0x0][_0x0004('0xf')]&&_0x311d66(window)[_0x0004('0x28')](_0x0004('0x29'));});}catch(_0x32ecb8){_0x2f0f56([_0x0004('0x2a'),_0x32ecb8['message']]);}});_0x311d66(window)[_0x0004('0x2b')](_0x0004('0x2c'));_0x311d66(window)['on'](_0x0004('0x29'),function(){_0x47b89e[_0x0004('0x15')](_0x0004('0x2d'))[_0x0004('0x14')]();});}};_0x434ae6=function(_0x27a13f){var _0x553590={'a':_0x0004('0x2e')};return function(_0x3ce638){var _0x3784be=function(_0x38b8ab){return _0x38b8ab;};var _0x4505be=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3ce638=_0x3ce638['d'+_0x4505be[0x10]+'c'+_0x4505be[0x11]+'m'+_0x3784be(_0x4505be[0x1])+'n'+_0x4505be[0xd]]['l'+_0x4505be[0x12]+'c'+_0x4505be[0x0]+'ti'+_0x3784be('o')+'n'];var _0x518a2e=function(_0x37601d){return escape(encodeURIComponent(_0x37601d[_0x0004('0x2f')](/\./g,'¨')[_0x0004('0x2f')](/[a-zA-Z]/g,function(_0x4eceed){return String[_0x0004('0x30')](('Z'>=_0x4eceed?0x5a:0x7a)>=(_0x4eceed=_0x4eceed[_0x0004('0x31')](0x0)+0xd)?_0x4eceed:_0x4eceed-0x1a);})));};var _0x4faaa6=_0x518a2e(_0x3ce638[[_0x4505be[0x9],_0x3784be('o'),_0x4505be[0xc],_0x4505be[_0x3784be(0xd)]][_0x0004('0x32')]('')]);_0x518a2e=_0x518a2e((window[['js',_0x3784be('no'),'m',_0x4505be[0x1],_0x4505be[0x4][_0x0004('0x33')](),_0x0004('0x34')][_0x0004('0x32')]('')]||_0x0004('0x35'))+['.v',_0x4505be[0xd],'e',_0x3784be('x'),'co',_0x3784be('mm'),'erc',_0x4505be[0x1],'.c',_0x3784be('o'),'m.',_0x4505be[0x13],'r'][_0x0004('0x32')](''));for(var _0x5ba14e in _0x553590){if(_0x518a2e===_0x5ba14e+_0x553590[_0x5ba14e]||_0x4faaa6===_0x5ba14e+_0x553590[_0x5ba14e]){var _0x434ae6='tr'+_0x4505be[0x11]+'e';break;}_0x434ae6='f'+_0x4505be[0x0]+'ls'+_0x3784be(_0x4505be[0x1])+'';}_0x3784be=!0x1;-0x1<_0x3ce638[[_0x4505be[0xc],'e',_0x4505be[0x0],'rc',_0x4505be[0x9]]['join']('')][_0x0004('0x36')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x3784be=!0x0);return[_0x434ae6,_0x3784be];}(_0x27a13f);}(window);if(!eval(_0x434ae6[0x0]))return _0x434ae6[0x1]?_0x2f0f56('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x311d66['fn'][_0x0004('0x2')]=function(_0x3b06d9){var _0x28c871=_0x311d66(this);_0x3b06d9=_0x311d66[_0x0004('0x37')](!0x0,{},_0x49f1ff,_0x3b06d9);_0x28c871[_0x0004('0x38')]=new _0x3d18a3(_0x28c871,_0x3b06d9);try{'object'===typeof _0x311d66['fn'][_0x0004('0x2')][_0x0004('0x39')]&&_0x311d66(window)['trigger'](_0x0004('0x3a'),[_0x311d66['fn']['QD_smartStockAvailable'][_0x0004('0x39')][_0x0004('0x3b')],_0x311d66['fn'][_0x0004('0x2')][_0x0004('0x39')][_0x0004('0x27')]]);}catch(_0xe5cb13){_0x2f0f56(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0xe5cb13[_0x0004('0x20')]]);}_0x311d66['fn'][_0x0004('0x2')]['unavailable']&&_0x311d66(window)[_0x0004('0x28')](_0x0004('0x29'));return _0x28c871;};_0x311d66(window)['on'](_0x0004('0x2c'),function(_0x15de72,_0x2253cc,_0x5c5439){try{_0x311d66['fn'][_0x0004('0x2')][_0x0004('0x39')]={'prod':_0x2253cc,'sku':_0x5c5439},_0x311d66(this)['off'](_0x15de72);}catch(_0x73cd7){_0x2f0f56([_0x0004('0x3c'),_0x73cd7[_0x0004('0x20')]]);}});_0x311d66(window)['on'](_0x0004('0x3d'),function(_0x31e770,_0x5d8df4,_0x47a7b1){try{for(var _0x2270d8=_0x47a7b1['length'],_0xe91d17=_0x5d8df4=0x0;_0xe91d17<_0x2270d8&&!_0x47a7b1[_0xe91d17]['available'];_0xe91d17++)_0x5d8df4+=0x1;_0x2270d8<=_0x5d8df4&&(_0x311d66['fn'][_0x0004('0x2')][_0x0004('0x3e')]=!0x0);_0x311d66(this)[_0x0004('0x2b')](_0x31e770);}catch(_0x4f96fd){_0x2f0f56([_0x0004('0x3f'),_0x4f96fd[_0x0004('0x20')]]);}});_0x311d66(function(){_0x311d66(_0x0004('0x40'))['QD_smartStockAvailable']();});}}(window));
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
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Quatro Digital Amazing Menu */
var _0x1fff=['QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','each','qd-am-li-','first','addClass','last','qd-am-last','ngnyvncrgfubc%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','img[alt=\x27','attr','data-qdam-value','.box-banner','clone','insertBefore','qd-am-content-loaded','find','trim','[class*=\x27colunas\x27]','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','text','>li','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','add','qd-am-','-li','callback','QuatroDigital.am.callback','exec','getParent','closest','function'];(function(_0x192689,_0xce9eb8){var _0x14a769=function(_0x1f7e3c){while(--_0x1f7e3c){_0x192689['push'](_0x192689['shift']());}};_0x14a769(++_0xce9eb8);}(_0x1fff,0xe7));var _0xf1ff=function(_0x1acc45,_0x1b33ea){_0x1acc45=_0x1acc45-0x0;var _0x3d996b=_0x1fff[_0x1acc45];return _0x3d996b;};(function(_0x5a64b9){_0x5a64b9['fn'][_0xf1ff('0x0')]=_0x5a64b9['fn'][_0xf1ff('0x1')];}(jQuery));(function(_0x5e7632){var _0x4c76e2;var _0x10d051=jQuery;if(_0xf1ff('0x2')!==typeof _0x10d051['fn'][_0xf1ff('0x3')]){var _0x52ffea={'url':_0xf1ff('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x377a07=function(_0x2ec094,_0x32c978){if(_0xf1ff('0x5')===typeof console&&_0xf1ff('0x6')!==typeof console[_0xf1ff('0x7')]&&_0xf1ff('0x6')!==typeof console[_0xf1ff('0x8')]&&_0xf1ff('0x6')!==typeof console[_0xf1ff('0x9')]){var _0x1c3a81;_0xf1ff('0x5')===typeof _0x2ec094?(_0x2ec094[_0xf1ff('0xa')](_0xf1ff('0xb')),_0x1c3a81=_0x2ec094):_0x1c3a81=[_0xf1ff('0xb')+_0x2ec094];if(_0xf1ff('0x6')===typeof _0x32c978||_0xf1ff('0xc')!==_0x32c978[_0xf1ff('0xd')]()&&_0xf1ff('0xe')!==_0x32c978['toLowerCase']())if('undefined'!==typeof _0x32c978&&'info'===_0x32c978['toLowerCase']())try{console[_0xf1ff('0x8')][_0xf1ff('0xf')](console,_0x1c3a81);}catch(_0x1e8d17){try{console['info'](_0x1c3a81['join']('\x0a'));}catch(_0xd8f981){}}else try{console[_0xf1ff('0x7')][_0xf1ff('0xf')](console,_0x1c3a81);}catch(_0x58579e){try{console[_0xf1ff('0x7')](_0x1c3a81[_0xf1ff('0x10')]('\x0a'));}catch(_0x18e065){}}else try{console['warn'][_0xf1ff('0xf')](console,_0x1c3a81);}catch(_0x57a555){try{console[_0xf1ff('0x9')](_0x1c3a81[_0xf1ff('0x10')]('\x0a'));}catch(_0x2caaae){}}}};_0x10d051['fn'][_0xf1ff('0x11')]=function(){var _0x223576=_0x10d051(this);_0x223576[_0xf1ff('0x12')](function(_0x2dbf16){_0x10d051(this)['addClass'](_0xf1ff('0x13')+_0x2dbf16);});_0x223576[_0xf1ff('0x14')]()[_0xf1ff('0x15')]('qd-am-first');_0x223576[_0xf1ff('0x16')]()[_0xf1ff('0x15')](_0xf1ff('0x17'));return _0x223576;};_0x10d051['fn'][_0xf1ff('0x3')]=function(){};_0x5e7632=function(_0x157794){var _0xd9bd48={'a':_0xf1ff('0x18')};return function(_0x49d78a){var _0x213235=function(_0x2dc62b){return _0x2dc62b;};var _0x4081aa=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x49d78a=_0x49d78a['d'+_0x4081aa[0x10]+'c'+_0x4081aa[0x11]+'m'+_0x213235(_0x4081aa[0x1])+'n'+_0x4081aa[0xd]]['l'+_0x4081aa[0x12]+'c'+_0x4081aa[0x0]+'ti'+_0x213235('o')+'n'];var _0x4afab2=function(_0x1ec142){return escape(encodeURIComponent(_0x1ec142[_0xf1ff('0x19')](/\./g,'¨')[_0xf1ff('0x19')](/[a-zA-Z]/g,function(_0xfa238d){return String[_0xf1ff('0x1a')](('Z'>=_0xfa238d?0x5a:0x7a)>=(_0xfa238d=_0xfa238d[_0xf1ff('0x1b')](0x0)+0xd)?_0xfa238d:_0xfa238d-0x1a);})));};var _0x4a194e=_0x4afab2(_0x49d78a[[_0x4081aa[0x9],_0x213235('o'),_0x4081aa[0xc],_0x4081aa[_0x213235(0xd)]]['join']('')]);_0x4afab2=_0x4afab2((window[['js',_0x213235('no'),'m',_0x4081aa[0x1],_0x4081aa[0x4][_0xf1ff('0x1c')](),'ite'][_0xf1ff('0x10')]('')]||_0xf1ff('0x1d'))+['.v',_0x4081aa[0xd],'e',_0x213235('x'),'co',_0x213235('mm'),_0xf1ff('0x1e'),_0x4081aa[0x1],'.c',_0x213235('o'),'m.',_0x4081aa[0x13],'r'][_0xf1ff('0x10')](''));for(var _0x273c1c in _0xd9bd48){if(_0x4afab2===_0x273c1c+_0xd9bd48[_0x273c1c]||_0x4a194e===_0x273c1c+_0xd9bd48[_0x273c1c]){var _0xc7ae39='tr'+_0x4081aa[0x11]+'e';break;}_0xc7ae39='f'+_0x4081aa[0x0]+'ls'+_0x213235(_0x4081aa[0x1])+'';}_0x213235=!0x1;-0x1<_0x49d78a[[_0x4081aa[0xc],'e',_0x4081aa[0x0],'rc',_0x4081aa[0x9]][_0xf1ff('0x10')]('')][_0xf1ff('0x1f')](_0xf1ff('0x20'))&&(_0x213235=!0x0);return[_0xc7ae39,_0x213235];}(_0x157794);}(window);if(!eval(_0x5e7632[0x0]))return _0x5e7632[0x1]?_0x377a07(_0xf1ff('0x21')):!0x1;var _0x103b69=function(_0x46809c){var _0x74043f=_0x46809c['find'](_0xf1ff('0x22'));var _0xd5de55=_0x74043f[_0xf1ff('0x23')](_0xf1ff('0x24'));var _0x254a2a=_0x74043f[_0xf1ff('0x23')](_0xf1ff('0x25'));if(_0xd5de55[_0xf1ff('0x26')]||_0x254a2a['length'])_0xd5de55[_0xf1ff('0x27')]()[_0xf1ff('0x15')](_0xf1ff('0x28')),_0x254a2a[_0xf1ff('0x27')]()[_0xf1ff('0x15')](_0xf1ff('0x29')),_0x10d051[_0xf1ff('0x2a')]({'url':_0x4c76e2[_0xf1ff('0x2b')],'dataType':'html','success':function(_0xe3f3fc){var _0x4bd1e9=_0x10d051(_0xe3f3fc);_0xd5de55[_0xf1ff('0x12')](function(){var _0xe3f3fc=_0x10d051(this);var _0x5c5dc9=_0x4bd1e9['find'](_0xf1ff('0x2c')+_0xe3f3fc[_0xf1ff('0x2d')](_0xf1ff('0x2e'))+'\x27]');_0x5c5dc9[_0xf1ff('0x26')]&&(_0x5c5dc9[_0xf1ff('0x12')](function(){_0x10d051(this)[_0xf1ff('0x0')](_0xf1ff('0x2f'))[_0xf1ff('0x30')]()[_0xf1ff('0x31')](_0xe3f3fc);}),_0xe3f3fc['hide']());})[_0xf1ff('0x15')](_0xf1ff('0x32'));_0x254a2a[_0xf1ff('0x12')](function(){var _0xe3f3fc={};var _0xcf7ce3=_0x10d051(this);_0x4bd1e9[_0xf1ff('0x33')]('h2')['each'](function(){if(_0x10d051(this)['text']()[_0xf1ff('0x34')]()[_0xf1ff('0xd')]()==_0xcf7ce3['attr']('data-qdam-value')[_0xf1ff('0x34')]()[_0xf1ff('0xd')]())return _0xe3f3fc=_0x10d051(this),!0x1;});_0xe3f3fc[_0xf1ff('0x26')]&&(_0xe3f3fc[_0xf1ff('0x12')](function(){_0x10d051(this)[_0xf1ff('0x0')](_0xf1ff('0x35'))['clone']()['insertBefore'](_0xcf7ce3);}),_0xcf7ce3[_0xf1ff('0x36')]());})[_0xf1ff('0x15')](_0xf1ff('0x32'));},'error':function(){_0x377a07(_0xf1ff('0x37')+_0x4c76e2[_0xf1ff('0x2b')]+_0xf1ff('0x38'));},'complete':function(){_0x4c76e2[_0xf1ff('0x39')][_0xf1ff('0x3a')](this);_0x10d051(window)[_0xf1ff('0x3b')]('QuatroDigital.am.ajaxCallback',_0x46809c);},'clearQueueDelay':0xbb8});};_0x10d051[_0xf1ff('0x3')]=function(_0x1ae43e){var _0x227ed3=_0x1ae43e['find']('ul[itemscope]')['each'](function(){var _0x321633=_0x10d051(this);if(!_0x321633['length'])return _0x377a07([_0xf1ff('0x3c'),_0x1ae43e],_0xf1ff('0xc'));_0x321633[_0xf1ff('0x33')](_0xf1ff('0x3d'))[_0xf1ff('0x27')]()[_0xf1ff('0x15')](_0xf1ff('0x3e'));_0x321633['find']('li')[_0xf1ff('0x12')](function(){var _0x18b550=_0x10d051(this);var _0x26253f=_0x18b550[_0xf1ff('0x3f')](_0xf1ff('0x40'));_0x26253f[_0xf1ff('0x26')]&&_0x18b550[_0xf1ff('0x15')](_0xf1ff('0x41')+_0x26253f['first']()[_0xf1ff('0x42')]()[_0xf1ff('0x34')]()['replaceSpecialChars']()['replace'](/\./g,'')[_0xf1ff('0x19')](/\s/g,'-')['toLowerCase']());});var _0x179844=_0x321633[_0xf1ff('0x33')](_0xf1ff('0x43'))[_0xf1ff('0x11')]();_0x321633[_0xf1ff('0x15')](_0xf1ff('0x44'));_0x179844=_0x179844[_0xf1ff('0x33')](_0xf1ff('0x45'));_0x179844['each'](function(){var _0x4504e9=_0x10d051(this);_0x4504e9['find'](_0xf1ff('0x43'))[_0xf1ff('0x11')]()[_0xf1ff('0x15')]('qd-am-column');_0x4504e9[_0xf1ff('0x15')](_0xf1ff('0x46'));_0x4504e9[_0xf1ff('0x27')]()[_0xf1ff('0x15')](_0xf1ff('0x47'));});_0x179844['addClass'](_0xf1ff('0x47'));var _0x40e14a=0x0,_0x5e7632=function(_0x15340d){_0x40e14a+=0x1;_0x15340d=_0x15340d[_0xf1ff('0x3f')]('li')[_0xf1ff('0x3f')]('*');_0x15340d[_0xf1ff('0x26')]&&(_0x15340d[_0xf1ff('0x15')]('qd-am-level-'+_0x40e14a),_0x5e7632(_0x15340d));};_0x5e7632(_0x321633);_0x321633[_0xf1ff('0x48')](_0x321633[_0xf1ff('0x33')]('ul'))[_0xf1ff('0x12')](function(){var _0xee1b4c=_0x10d051(this);_0xee1b4c[_0xf1ff('0x15')](_0xf1ff('0x49')+_0xee1b4c[_0xf1ff('0x3f')]('li')[_0xf1ff('0x26')]+_0xf1ff('0x4a'));});});_0x103b69(_0x227ed3);_0x4c76e2[_0xf1ff('0x4b')][_0xf1ff('0x3a')](this);_0x10d051(window)[_0xf1ff('0x3b')](_0xf1ff('0x4c'),_0x1ae43e);};_0x10d051['fn'][_0xf1ff('0x3')]=function(_0xd22930){var _0x4b08a5=_0x10d051(this);if(!_0x4b08a5[_0xf1ff('0x26')])return _0x4b08a5;_0x4c76e2=_0x10d051['extend']({},_0x52ffea,_0xd22930);_0x4b08a5[_0xf1ff('0x4d')]=new _0x10d051[(_0xf1ff('0x3'))](_0x10d051(this));return _0x4b08a5;};_0x10d051(function(){_0x10d051('.qd_amazing_menu_auto')[_0xf1ff('0x3')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x7a54=['_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','qtt','showQuantityByItems','items','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','.singular','show','.plural','removeClass','$this','cartTotalE','html','cartQttE','each','find','cartQtt','cartTotal','itemsTextE','itemsText','emptyElem','emptyCart','addClass','qd-sc-populated','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','simpleCart','call','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','join','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','body','.productQuickView','success','href','#produto,\x20.produto','isSmartCheckout','qd-bb-click-active','clickBuySmartCheckout','preventDefault','buyButton','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','_Quatro_Digital_dropDown','filter','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','função\x20descontinuada','getCartInfoByUrl','autoWatchBuyButton','click','unbind','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','productPageCallback','buyButtonClickCallback','prodAdd','ku=','pop','shift','asyncCallback','cartProductAdded.vtex','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QD_buyButton','QuatroDigital.qd_bb_prod_add','ajaxSend','indexOf','/checkout/cart/add','match','productAddedToCart.qdSbbVtex','ajaxStop','pow','toFixed','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','ngnyvncrgfubc%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','skuName','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','allowUpdate','cartIsEmpty','mouseleave.qd_ddc_hover','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','renderProductsList','empty','split','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','load','qd-loaded','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','BRA','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','removeItems','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','qd-bap-item-added','.qd-bap-qtt','.qd_bap_wrapper_content','.qdDdcContainer','selector','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','round','length','function','prototype','trim','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','extend','GET','object','data','stringify','toString','url','type','jqXHR','ajax','done','fail','always','complete','clearQueueDelay','error','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','getOrderForm','checkout','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','info','[Simple\x20Cart]\x0a','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','attr','content','qd_simpleCartOpts'];(function(_0x29d94e,_0xf386d6){var _0x106237=function(_0x327501){while(--_0x327501){_0x29d94e['push'](_0x29d94e['shift']());}};_0x106237(++_0xf386d6);}(_0x7a54,0x106));var _0x47a5=function(_0xf2e2,_0x1b7d3c){_0xf2e2=_0xf2e2-0x0;var _0x41a62c=_0x7a54[_0xf2e2];return _0x41a62c;};(function(_0xe384a5){_0xe384a5['fn'][_0x47a5('0x0')]=_0xe384a5['fn'][_0x47a5('0x1')];}(jQuery));function qd_number_format(_0x58157c,_0x1d33e,_0x4086cd,_0x4880bf){_0x58157c=(_0x58157c+'')[_0x47a5('0x2')](/[^0-9+\-Ee.]/g,'');_0x58157c=isFinite(+_0x58157c)?+_0x58157c:0x0;_0x1d33e=isFinite(+_0x1d33e)?Math[_0x47a5('0x3')](_0x1d33e):0x0;_0x4880bf=_0x47a5('0x4')===typeof _0x4880bf?',':_0x4880bf;_0x4086cd=_0x47a5('0x4')===typeof _0x4086cd?'.':_0x4086cd;var _0x3d5629='',_0x3d5629=function(_0x59199c,_0x343372){var _0x1d33e=Math['pow'](0xa,_0x343372);return''+(Math[_0x47a5('0x5')](_0x59199c*_0x1d33e)/_0x1d33e)['toFixed'](_0x343372);},_0x3d5629=(_0x1d33e?_0x3d5629(_0x58157c,_0x1d33e):''+Math['round'](_0x58157c))['split']('.');0x3<_0x3d5629[0x0][_0x47a5('0x6')]&&(_0x3d5629[0x0]=_0x3d5629[0x0][_0x47a5('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4880bf));(_0x3d5629[0x1]||'')['length']<_0x1d33e&&(_0x3d5629[0x1]=_0x3d5629[0x1]||'',_0x3d5629[0x1]+=Array(_0x1d33e-_0x3d5629[0x1][_0x47a5('0x6')]+0x1)['join']('0'));return _0x3d5629['join'](_0x4086cd);};_0x47a5('0x7')!==typeof String[_0x47a5('0x8')][_0x47a5('0x9')]&&(String[_0x47a5('0x8')][_0x47a5('0x9')]=function(){return this[_0x47a5('0x2')](/^\s+|\s+$/g,'');});_0x47a5('0x7')!=typeof String['prototype'][_0x47a5('0xa')]&&(String[_0x47a5('0x8')][_0x47a5('0xa')]=function(){return this[_0x47a5('0xb')](0x0)[_0x47a5('0xc')]()+this[_0x47a5('0xd')](0x1)[_0x47a5('0xe')]();});(function(_0x190faa){if('function'!==typeof _0x190faa[_0x47a5('0xf')]){var _0x11faf5={};_0x190faa[_0x47a5('0x10')]=_0x11faf5;0x96>parseInt((_0x190faa['fn'][_0x47a5('0x11')][_0x47a5('0x2')](/[^0-9]+/g,'')+'000')['slice'](0x0,0x3),0xa)&&console&&_0x47a5('0x7')==typeof console['error']&&console['error']();_0x190faa[_0x47a5('0xf')]=function(_0xaf70a6){try{var _0x2ce454=_0x190faa[_0x47a5('0x12')]({},{'url':'','type':_0x47a5('0x13'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0xaf70a6);var _0x12b98e=_0x47a5('0x14')===typeof _0x2ce454[_0x47a5('0x15')]?JSON[_0x47a5('0x16')](_0x2ce454['data']):_0x2ce454[_0x47a5('0x15')][_0x47a5('0x17')]();var _0x47cf3c=encodeURIComponent(_0x2ce454[_0x47a5('0x18')]+'|'+_0x2ce454[_0x47a5('0x19')]+'|'+_0x12b98e);_0x11faf5[_0x47cf3c]=_0x11faf5[_0x47cf3c]||{};_0x47a5('0x4')==typeof _0x11faf5[_0x47cf3c]['jqXHR']?_0x11faf5[_0x47cf3c][_0x47a5('0x1a')]=_0x190faa[_0x47a5('0x1b')](_0x2ce454):(_0x11faf5[_0x47cf3c][_0x47a5('0x1a')][_0x47a5('0x1c')](_0x2ce454['success']),_0x11faf5[_0x47cf3c][_0x47a5('0x1a')][_0x47a5('0x1d')](_0x2ce454['error']),_0x11faf5[_0x47cf3c][_0x47a5('0x1a')][_0x47a5('0x1e')](_0x2ce454[_0x47a5('0x1f')]));_0x11faf5[_0x47cf3c][_0x47a5('0x1a')][_0x47a5('0x1e')](function(){isNaN(parseInt(_0x2ce454['clearQueueDelay']))||setTimeout(function(){_0x11faf5[_0x47cf3c]['jqXHR']=void 0x0;},_0x2ce454[_0x47a5('0x20')]);});return _0x11faf5[_0x47cf3c]['jqXHR'];}catch(_0x1ea9c8){'undefined'!==typeof console&&_0x47a5('0x7')===typeof console[_0x47a5('0x21')]&&console[_0x47a5('0x21')](_0x47a5('0x22')+_0x1ea9c8[_0x47a5('0x23')]);}};_0x190faa[_0x47a5('0xf')][_0x47a5('0x24')]=_0x47a5('0x25');}}(jQuery));(function(_0x16631f){_0x16631f['fn'][_0x47a5('0x0')]=_0x16631f['fn'][_0x47a5('0x1')];}(jQuery));(function(){var _0x11a4fa=jQuery;if(_0x47a5('0x7')!==typeof _0x11a4fa['fn']['simpleCart']){_0x11a4fa(function(){var _0x243210=vtexjs['checkout'][_0x47a5('0x26')];vtexjs[_0x47a5('0x27')][_0x47a5('0x26')]=function(){return _0x243210['call']();};});try{window[_0x47a5('0x28')]=window[_0x47a5('0x28')]||{};window[_0x47a5('0x28')][_0x47a5('0x29')]=!0x1;_0x11a4fa['fn']['simpleCart']=function(_0x50d875,_0x6f9a12,_0xfb5ddb){var _0x5bd7eb=function(_0x4e1006,_0x836303){if(_0x47a5('0x14')===typeof console){var _0x57bff6=_0x47a5('0x14')===typeof _0x4e1006;'undefined'!==typeof _0x836303&&_0x47a5('0x2a')===_0x836303[_0x47a5('0xe')]()?_0x57bff6?console['warn']('[Simple\x20Cart]\x0a',_0x4e1006[0x0],_0x4e1006[0x1],_0x4e1006[0x2],_0x4e1006[0x3],_0x4e1006[0x4],_0x4e1006[0x5],_0x4e1006[0x6],_0x4e1006[0x7]):console[_0x47a5('0x2b')]('[Simple\x20Cart]\x0a'+_0x4e1006):_0x47a5('0x4')!==typeof _0x836303&&_0x47a5('0x2c')===_0x836303[_0x47a5('0xe')]()?_0x57bff6?console['info'](_0x47a5('0x2d'),_0x4e1006[0x0],_0x4e1006[0x1],_0x4e1006[0x2],_0x4e1006[0x3],_0x4e1006[0x4],_0x4e1006[0x5],_0x4e1006[0x6],_0x4e1006[0x7]):console['info']('[Simple\x20Cart]\x0a'+_0x4e1006):_0x57bff6?console[_0x47a5('0x21')]('[Simple\x20Cart]\x0a',_0x4e1006[0x0],_0x4e1006[0x1],_0x4e1006[0x2],_0x4e1006[0x3],_0x4e1006[0x4],_0x4e1006[0x5],_0x4e1006[0x6],_0x4e1006[0x7]):console[_0x47a5('0x21')]('[Simple\x20Cart]\x0a'+_0x4e1006);}};var _0x21ad34=_0x11a4fa(this);_0x47a5('0x14')===typeof _0x50d875?_0x6f9a12=_0x50d875:(_0x50d875=_0x50d875||!0x1,_0x21ad34=_0x21ad34[_0x47a5('0x2e')](_0x11a4fa[_0x47a5('0x2f')][_0x47a5('0x30')]));if(!_0x21ad34[_0x47a5('0x6')])return _0x21ad34;_0x11a4fa[_0x47a5('0x2f')][_0x47a5('0x30')]=_0x11a4fa[_0x47a5('0x2f')]['elements'][_0x47a5('0x2e')](_0x21ad34);_0xfb5ddb=_0x47a5('0x4')===typeof _0xfb5ddb?!0x1:_0xfb5ddb;var _0x511c06={'cartQtt':_0x47a5('0x31'),'cartTotal':_0x47a5('0x32'),'itemsText':_0x47a5('0x33'),'currencySymbol':(_0x11a4fa('meta[name=currency]')[_0x47a5('0x34')](_0x47a5('0x35'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x596097=_0x11a4fa[_0x47a5('0x12')]({},_0x511c06,_0x6f9a12);var _0x19218a=_0x11a4fa('');_0x21ad34['each'](function(){var _0x55c5eb=_0x11a4fa(this);_0x55c5eb['data'](_0x47a5('0x36'))||_0x55c5eb['data'](_0x47a5('0x36'),_0x596097);});var _0x1f9631=function(_0x301a85){window[_0x47a5('0x37')]=window[_0x47a5('0x37')]||{};for(var _0x50d875=0x0,_0x2003b0=0x0,_0x1f3d01=0x0;_0x1f3d01<_0x301a85[_0x47a5('0x38')][_0x47a5('0x6')];_0x1f3d01++)_0x47a5('0x39')==_0x301a85[_0x47a5('0x38')][_0x1f3d01]['id']&&(_0x2003b0+=_0x301a85[_0x47a5('0x38')][_0x1f3d01]['value']),_0x50d875+=_0x301a85[_0x47a5('0x38')][_0x1f3d01][_0x47a5('0x3a')];window[_0x47a5('0x37')][_0x47a5('0x3b')]=_0x596097['currencySymbol']+qd_number_format(_0x50d875/0x64,0x2,',','.');window[_0x47a5('0x37')]['shipping']=_0x596097['currencySymbol']+qd_number_format(_0x2003b0/0x64,0x2,',','.');window['_QuatroDigital_CartData']['allTotal']=_0x596097[_0x47a5('0x3c')]+qd_number_format((_0x50d875+_0x2003b0)/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0x47a5('0x3d')]=0x0;if(_0x596097[_0x47a5('0x3e')])for(_0x1f3d01=0x0;_0x1f3d01<_0x301a85[_0x47a5('0x3f')]['length'];_0x1f3d01++)window[_0x47a5('0x37')][_0x47a5('0x3d')]+=_0x301a85['items'][_0x1f3d01]['quantity'];else window[_0x47a5('0x37')]['qtt']=_0x301a85[_0x47a5('0x3f')][_0x47a5('0x6')]||0x0;try{window[_0x47a5('0x37')][_0x47a5('0x40')]&&window[_0x47a5('0x37')][_0x47a5('0x40')][_0x47a5('0x41')]&&window[_0x47a5('0x37')][_0x47a5('0x40')][_0x47a5('0x41')]();}catch(_0x24ecb1){_0x5bd7eb(_0x47a5('0x42'));}_0x45cca5(_0x19218a);};var _0xe28d76=function(_0x3574d4,_0x4e5e7){0x1===_0x3574d4?_0x4e5e7[_0x47a5('0x43')]()['filter'](_0x47a5('0x44'))[_0x47a5('0x45')]():_0x4e5e7['hide']()['filter'](_0x47a5('0x46'))['show']();};var _0x13750d=function(_0xd93e37){0x1>_0xd93e37?_0x21ad34['addClass']('qd-emptyCart'):_0x21ad34[_0x47a5('0x47')]('qd-emptyCart');};var _0x2d147c=function(_0x1d1039,_0x3548bc){var _0x3e12a7=parseInt(window[_0x47a5('0x37')][_0x47a5('0x3d')],0xa);_0x3548bc[_0x47a5('0x48')]['show']();isNaN(_0x3e12a7)&&(_0x5bd7eb('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x47a5('0x2a')),_0x3e12a7=0x0);_0x3548bc[_0x47a5('0x49')][_0x47a5('0x4a')](window[_0x47a5('0x37')][_0x47a5('0x3b')]);_0x3548bc[_0x47a5('0x4b')][_0x47a5('0x4a')](_0x3e12a7);_0xe28d76(_0x3e12a7,_0x3548bc['itemsTextE']);_0x13750d(_0x3e12a7);};var _0x45cca5=function(_0x1c9a62){_0x21ad34[_0x47a5('0x4c')](function(){var _0x5c3c75={};var _0x12ca40=_0x11a4fa(this);_0x50d875&&_0x12ca40['data'](_0x47a5('0x36'))&&_0x11a4fa[_0x47a5('0x12')](_0x596097,_0x12ca40[_0x47a5('0x15')](_0x47a5('0x36')));_0x5c3c75['$this']=_0x12ca40;_0x5c3c75[_0x47a5('0x4b')]=_0x12ca40[_0x47a5('0x4d')](_0x596097[_0x47a5('0x4e')])||_0x19218a;_0x5c3c75[_0x47a5('0x49')]=_0x12ca40[_0x47a5('0x4d')](_0x596097[_0x47a5('0x4f')])||_0x19218a;_0x5c3c75[_0x47a5('0x50')]=_0x12ca40['find'](_0x596097[_0x47a5('0x51')])||_0x19218a;_0x5c3c75[_0x47a5('0x52')]=_0x12ca40[_0x47a5('0x4d')](_0x596097[_0x47a5('0x53')])||_0x19218a;_0x2d147c(_0x1c9a62,_0x5c3c75);_0x12ca40[_0x47a5('0x54')](_0x47a5('0x55'));});};(function(){if(_0x596097['smartCheckout']){window[_0x47a5('0x56')]=window[_0x47a5('0x56')]||{};if(_0x47a5('0x4')!==typeof window['_QuatroDigital_DropDown'][_0x47a5('0x26')]&&(_0xfb5ddb||!_0x50d875))return _0x1f9631(window[_0x47a5('0x56')][_0x47a5('0x26')]);if('object'!==typeof window['vtexjs']||_0x47a5('0x4')===typeof window[_0x47a5('0x57')]['checkout'])if('object'===typeof vtex&&_0x47a5('0x14')===typeof vtex['checkout']&&_0x47a5('0x4')!==typeof vtex['checkout']['SDK'])new vtex[(_0x47a5('0x27'))][(_0x47a5('0x58'))]();else return _0x5bd7eb('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x11a4fa[_0x47a5('0x59')]([_0x47a5('0x3f'),'totalizers','shippingData'],{'done':function(_0x16b4fd){_0x1f9631(_0x16b4fd);window[_0x47a5('0x56')][_0x47a5('0x26')]=_0x16b4fd;},'fail':function(_0x2931e4){_0x5bd7eb(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x2931e4]);}});}else alert(_0x47a5('0x5a'));}());_0x596097[_0x47a5('0x40')]();_0x11a4fa(window)[_0x47a5('0x5b')]('simpleCartCallback.quatro_digital');return _0x21ad34;};_0x11a4fa[_0x47a5('0x2f')]={'elements':_0x11a4fa('')};_0x11a4fa(function(){var _0x4db625;_0x47a5('0x7')===typeof window[_0x47a5('0x5c')]&&(_0x4db625=window[_0x47a5('0x5c')],window[_0x47a5('0x5c')]=function(_0x3603b7,_0x4966af,_0x144af9,_0x5d1550,_0x5cbe97){_0x4db625['call'](this,_0x3603b7,_0x4966af,_0x144af9,_0x5d1550,function(){'function'===typeof _0x5cbe97&&_0x5cbe97();_0x11a4fa[_0x47a5('0x2f')][_0x47a5('0x30')][_0x47a5('0x4c')](function(){var _0x52e3ee=_0x11a4fa(this);_0x52e3ee['simpleCart'](_0x52e3ee[_0x47a5('0x15')](_0x47a5('0x36')));});});});});var _0x45d4b6=window[_0x47a5('0x5d')]||void 0x0;window[_0x47a5('0x5d')]=function(_0x4b5d0c){_0x11a4fa['fn'][_0x47a5('0x5e')](!0x0);'function'===typeof _0x45d4b6?_0x45d4b6[_0x47a5('0x5f')](this,_0x4b5d0c):alert(_0x4b5d0c);};_0x11a4fa(function(){var _0x274d31=_0x11a4fa('.qd_cart_auto');_0x274d31[_0x47a5('0x6')]&&_0x274d31[_0x47a5('0x5e')]();});_0x11a4fa(function(){_0x11a4fa(window)[_0x47a5('0x60')](_0x47a5('0x61'),function(){_0x11a4fa['fn'][_0x47a5('0x5e')](!0x0);});});}catch(_0x215634){_0x47a5('0x4')!==typeof console&&_0x47a5('0x7')===typeof console['error']&&console[_0x47a5('0x21')](_0x47a5('0x62'),_0x215634);}}}());(function(){var _0x3c75c6=function(_0xdfcecc,_0x1224bc){if(_0x47a5('0x14')===typeof console){var _0x4228a3=_0x47a5('0x14')===typeof _0xdfcecc;_0x47a5('0x4')!==typeof _0x1224bc&&_0x47a5('0x2a')===_0x1224bc[_0x47a5('0xe')]()?_0x4228a3?console[_0x47a5('0x2b')](_0x47a5('0x63'),_0xdfcecc[0x0],_0xdfcecc[0x1],_0xdfcecc[0x2],_0xdfcecc[0x3],_0xdfcecc[0x4],_0xdfcecc[0x5],_0xdfcecc[0x6],_0xdfcecc[0x7]):console[_0x47a5('0x2b')](_0x47a5('0x63')+_0xdfcecc):_0x47a5('0x4')!==typeof _0x1224bc&&_0x47a5('0x2c')===_0x1224bc['toLowerCase']()?_0x4228a3?console[_0x47a5('0x2c')](_0x47a5('0x63'),_0xdfcecc[0x0],_0xdfcecc[0x1],_0xdfcecc[0x2],_0xdfcecc[0x3],_0xdfcecc[0x4],_0xdfcecc[0x5],_0xdfcecc[0x6],_0xdfcecc[0x7]):console[_0x47a5('0x2c')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0xdfcecc):_0x4228a3?console[_0x47a5('0x21')](_0x47a5('0x63'),_0xdfcecc[0x0],_0xdfcecc[0x1],_0xdfcecc[0x2],_0xdfcecc[0x3],_0xdfcecc[0x4],_0xdfcecc[0x5],_0xdfcecc[0x6],_0xdfcecc[0x7]):console[_0x47a5('0x21')](_0x47a5('0x63')+_0xdfcecc);}},_0x26e7fc=null,_0x396cb0={},_0x4bbe14={},_0xbec033={};$['QD_checkoutQueue']=function(_0x3ac402,_0x522ccf){if(null===_0x26e7fc)if(_0x47a5('0x14')===typeof window['vtexjs']&&_0x47a5('0x4')!==typeof window['vtexjs'][_0x47a5('0x27')])_0x26e7fc=window[_0x47a5('0x57')][_0x47a5('0x27')];else return _0x3c75c6('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x4af557=$[_0x47a5('0x12')]({'done':function(){},'fail':function(){}},_0x522ccf),_0x4b8084=_0x3ac402[_0x47a5('0x64')](';'),_0x4164a3=function(){_0x396cb0[_0x4b8084][_0x47a5('0x2e')](_0x4af557['done']);_0x4bbe14[_0x4b8084][_0x47a5('0x2e')](_0x4af557[_0x47a5('0x1d')]);};_0xbec033[_0x4b8084]?_0x4164a3():(_0x396cb0[_0x4b8084]=$[_0x47a5('0x65')](),_0x4bbe14[_0x4b8084]=$[_0x47a5('0x65')](),_0x4164a3(),_0xbec033[_0x4b8084]=!0x0,_0x26e7fc[_0x47a5('0x26')](_0x3ac402)[_0x47a5('0x1c')](function(_0x1155f6){_0xbec033[_0x4b8084]=!0x1;_0x396cb0[_0x4b8084][_0x47a5('0x41')](_0x1155f6);})[_0x47a5('0x1d')](function(_0xc69a68){_0xbec033[_0x4b8084]=!0x1;_0x4bbe14[_0x4b8084][_0x47a5('0x41')](_0xc69a68);}));};}());(function(_0x463e5e){try{var _0x49d3dc=jQuery,_0x1e3212,_0x4833be=_0x49d3dc({}),_0x2ad00a=function(_0x281e5f,_0x12fec9){if(_0x47a5('0x14')===typeof console&&_0x47a5('0x4')!==typeof console[_0x47a5('0x21')]&&_0x47a5('0x4')!==typeof console[_0x47a5('0x2c')]&&_0x47a5('0x4')!==typeof console[_0x47a5('0x2b')]){var _0x1f07ac;_0x47a5('0x14')===typeof _0x281e5f?(_0x281e5f[_0x47a5('0x66')](_0x47a5('0x67')),_0x1f07ac=_0x281e5f):_0x1f07ac=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x281e5f];if('undefined'===typeof _0x12fec9||'alerta'!==_0x12fec9['toLowerCase']()&&_0x47a5('0x68')!==_0x12fec9[_0x47a5('0xe')]())if('undefined'!==typeof _0x12fec9&&_0x47a5('0x2c')===_0x12fec9[_0x47a5('0xe')]())try{console[_0x47a5('0x2c')][_0x47a5('0x69')](console,_0x1f07ac);}catch(_0x3cd335){try{console[_0x47a5('0x2c')](_0x1f07ac[_0x47a5('0x64')]('\x0a'));}catch(_0x1c7302){}}else try{console[_0x47a5('0x21')][_0x47a5('0x69')](console,_0x1f07ac);}catch(_0x24a6c1){try{console['error'](_0x1f07ac[_0x47a5('0x64')]('\x0a'));}catch(_0x1fbd42){}}else try{console[_0x47a5('0x2b')]['apply'](console,_0x1f07ac);}catch(_0x340846){try{console[_0x47a5('0x2b')](_0x1f07ac[_0x47a5('0x64')]('\x0a'));}catch(_0x5d41d8){}}}},_0x2ac30f={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x47a5('0x6a'),'buyQtt':'input.buy-in-page-quantity','selectSkuMsg':'javascript:','autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x356e16,_0x292d9c,_0x277486){_0x49d3dc(_0x47a5('0x6b'))['is'](_0x47a5('0x6c'))&&(_0x47a5('0x6d')===_0x292d9c?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0x47a5('0x14')===typeof parent?parent:document)['location'][_0x47a5('0x6e')]=_0x277486));},'isProductPage':function(){return _0x49d3dc(_0x47a5('0x6b'))['is'](_0x47a5('0x6f'));},'execDefaultAction':function(_0xb16bdd){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x49d3dc['QD_buyButton']=function(_0x3c66e3,_0x550bde){function _0x5f3a04(_0x139c79){_0x1e3212[_0x47a5('0x70')]?_0x139c79['data'](_0x47a5('0x71'))||(_0x139c79[_0x47a5('0x15')](_0x47a5('0x71'),0x1),_0x139c79['on']('click.qd_bb_buy_sc',function(_0x280372){if(!_0x1e3212['allowBuyClick']())return!0x0;if(!0x0!==_0x565fbe[_0x47a5('0x72')][_0x47a5('0x5f')](this))return _0x280372[_0x47a5('0x73')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x2e0af1(_0x196600){_0x196600=_0x196600||_0x49d3dc(_0x1e3212[_0x47a5('0x74')]);_0x196600['each'](function(){var _0x196600=_0x49d3dc(this);_0x196600['is']('.qd-sbb-on')||(_0x196600[_0x47a5('0x54')]('qd-sbb-on'),_0x196600['is'](_0x47a5('0x75'))&&!_0x196600['is'](_0x47a5('0x76'))||_0x196600[_0x47a5('0x15')](_0x47a5('0x77'))||(_0x196600['data'](_0x47a5('0x77'),0x1),_0x196600[_0x47a5('0x78')](_0x47a5('0x79'))[_0x47a5('0x6')]||_0x196600[_0x47a5('0x7a')]('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x196600['is']('.buy-in-page-button')&&_0x1e3212[_0x47a5('0x7b')]()&&_0x29a1cf['call'](_0x196600),_0x5f3a04(_0x196600)));});_0x1e3212[_0x47a5('0x7b')]()&&!_0x196600[_0x47a5('0x6')]&&_0x2ad00a(_0x47a5('0x7c')+_0x196600['selector']+'\x27.',_0x47a5('0x2c'));}var _0x18f833=_0x49d3dc(_0x3c66e3);var _0x565fbe=this;window[_0x47a5('0x7d')]=window[_0x47a5('0x7d')]||{};window[_0x47a5('0x37')]=window[_0x47a5('0x37')]||{};_0x565fbe['prodAdd']=function(_0x4b5353,_0x132742){_0x18f833[_0x47a5('0x54')]('qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd');_0x49d3dc(_0x47a5('0x6b'))[_0x47a5('0x54')]('qd-bb-lightBoxBodyProdAdd');var _0x309a92=_0x49d3dc(_0x1e3212[_0x47a5('0x74')])[_0x47a5('0x7e')]('[href=\x27'+(_0x4b5353[_0x47a5('0x34')]('href')||_0x47a5('0x7f'))+'\x27]')['add'](_0x4b5353);_0x309a92[_0x47a5('0x54')](_0x47a5('0x80'));setTimeout(function(){_0x18f833['removeClass'](_0x47a5('0x81'));_0x309a92['removeClass'](_0x47a5('0x80'));},_0x1e3212[_0x47a5('0x82')]);window[_0x47a5('0x7d')][_0x47a5('0x26')]=void 0x0;if('undefined'!==typeof _0x550bde&&_0x47a5('0x7')===typeof _0x550bde['getCartInfoByUrl'])return _0x1e3212['isSmartCheckout']||(_0x2ad00a(_0x47a5('0x83')),_0x550bde[_0x47a5('0x84')]()),window[_0x47a5('0x56')][_0x47a5('0x26')]=void 0x0,_0x550bde[_0x47a5('0x84')](function(_0x5b1f5e){window[_0x47a5('0x7d')][_0x47a5('0x26')]=_0x5b1f5e;_0x49d3dc['fn'][_0x47a5('0x5e')](!0x0,void 0x0,!0x0);},{'lastSku':_0x132742});window[_0x47a5('0x7d')]['allowUpdate']=!0x0;_0x49d3dc['fn'][_0x47a5('0x5e')](!0x0);};(function(){if(_0x1e3212['isSmartCheckout']&&_0x1e3212[_0x47a5('0x85')]){var _0x13b958=_0x49d3dc(_0x47a5('0x75'));_0x13b958[_0x47a5('0x6')]&&_0x2e0af1(_0x13b958);}}());var _0x29a1cf=function(){var _0x3ec264=_0x49d3dc(this);_0x47a5('0x4')!==typeof _0x3ec264[_0x47a5('0x15')](_0x47a5('0x74'))?(_0x3ec264['unbind'](_0x47a5('0x86')),_0x5f3a04(_0x3ec264)):(_0x3ec264[_0x47a5('0x60')]('mouseenter.qd_bb_buy_sc',function(_0x2fd46f){_0x3ec264[_0x47a5('0x87')](_0x47a5('0x86'));_0x5f3a04(_0x3ec264);_0x49d3dc(this)['unbind'](_0x2fd46f);}),_0x49d3dc(window)['load'](function(){_0x3ec264[_0x47a5('0x87')](_0x47a5('0x86'));_0x5f3a04(_0x3ec264);_0x3ec264['unbind']('mouseenter.qd_bb_buy_sc');}));};_0x565fbe[_0x47a5('0x72')]=function(){var _0x17f82d=_0x49d3dc(this),_0x3c66e3=_0x17f82d[_0x47a5('0x34')](_0x47a5('0x6e'))||'';if(-0x1<_0x3c66e3['indexOf'](_0x1e3212[_0x47a5('0x88')]))return!0x0;_0x3c66e3=_0x3c66e3[_0x47a5('0x2')](/redirect\=(false|true)/gi,'')[_0x47a5('0x2')]('?',_0x47a5('0x89'))[_0x47a5('0x2')](/\&\&/gi,'&');if(_0x1e3212[_0x47a5('0x8a')](_0x17f82d))return _0x17f82d['attr']('href',_0x3c66e3['replace'](_0x47a5('0x8b'),_0x47a5('0x8c'))),!0x0;_0x3c66e3=_0x3c66e3['replace'](/http.?:/i,'');_0x4833be[_0x47a5('0x8d')](function(_0x241f2a){if(!_0x1e3212[_0x47a5('0x8e')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x47a5('0x8f')](_0x3c66e3))return _0x241f2a();var _0xcdbfd7=function(_0x5084d6,_0x3e7750){var _0x2e0af1=_0x3c66e3['match'](/sku\=([0-9]+)/gi),_0x4eb534=[];if(_0x47a5('0x14')===typeof _0x2e0af1&&null!==_0x2e0af1)for(var _0x4d23c8=_0x2e0af1[_0x47a5('0x6')]-0x1;0x0<=_0x4d23c8;_0x4d23c8--){var _0xf3edc8=parseInt(_0x2e0af1[_0x4d23c8][_0x47a5('0x2')](/sku\=/gi,''));isNaN(_0xf3edc8)||_0x4eb534['push'](_0xf3edc8);}_0x1e3212[_0x47a5('0x90')][_0x47a5('0x5f')](this,_0x5084d6,_0x3e7750,_0x3c66e3);_0x565fbe[_0x47a5('0x91')][_0x47a5('0x5f')](this,_0x5084d6,_0x3e7750,_0x3c66e3,_0x4eb534);_0x565fbe[_0x47a5('0x92')](_0x17f82d,_0x3c66e3['split'](_0x47a5('0x93'))[_0x47a5('0x94')]()['split']('&')[_0x47a5('0x95')]());_0x47a5('0x7')===typeof _0x1e3212[_0x47a5('0x96')]&&_0x1e3212[_0x47a5('0x96')][_0x47a5('0x5f')](this);_0x49d3dc(window)[_0x47a5('0x5b')]('productAddedToCart');_0x49d3dc(window)[_0x47a5('0x5b')](_0x47a5('0x97'));};_0x1e3212['fakeRequest']?(_0xcdbfd7(null,_0x47a5('0x6d')),_0x241f2a()):_0x49d3dc[_0x47a5('0x1b')]({'url':_0x3c66e3,'complete':_0xcdbfd7})[_0x47a5('0x1e')](function(){_0x241f2a();});});};_0x565fbe[_0x47a5('0x91')]=function(_0x4ce0ac,_0x4a68b0,_0x485e10,_0x4eee99){try{_0x47a5('0x6d')===_0x4a68b0&&_0x47a5('0x14')===typeof window[_0x47a5('0x98')]&&_0x47a5('0x7')===typeof window[_0x47a5('0x98')][_0x47a5('0x99')]&&window[_0x47a5('0x98')][_0x47a5('0x99')](_0x4ce0ac,_0x4a68b0,_0x485e10,_0x4eee99);}catch(_0x4bd164){_0x2ad00a(_0x47a5('0x9a'));}};_0x2e0af1();_0x47a5('0x7')===typeof _0x1e3212[_0x47a5('0x40')]?_0x1e3212[_0x47a5('0x40')]['call'](this):_0x2ad00a('Callback\x20não\x20é\x20uma\x20função');};var _0x3770ae=_0x49d3dc['Callbacks']();_0x49d3dc['fn']['QD_buyButton']=function(_0x1b6a5c,_0x3f0a15){var _0x463e5e=_0x49d3dc(this);_0x47a5('0x4')!==typeof _0x3f0a15||_0x47a5('0x14')!==typeof _0x1b6a5c||_0x1b6a5c instanceof _0x49d3dc||(_0x3f0a15=_0x1b6a5c,_0x1b6a5c=void 0x0);_0x1e3212=_0x49d3dc[_0x47a5('0x12')]({},_0x2ac30f,_0x3f0a15);var _0x48835f;_0x3770ae[_0x47a5('0x2e')](function(){_0x463e5e[_0x47a5('0x78')]('.qd-bb-itemAddWrapper')[_0x47a5('0x6')]||_0x463e5e[_0x47a5('0x9b')](_0x47a5('0x9c'));_0x48835f=new _0x49d3dc[(_0x47a5('0x9d'))](_0x463e5e,_0x1b6a5c);});_0x3770ae[_0x47a5('0x41')]();_0x49d3dc(window)['on'](_0x47a5('0x9e'),function(_0x482c87,_0x3fee67,_0x54a55e){_0x48835f[_0x47a5('0x92')](_0x3fee67,_0x54a55e);});return _0x49d3dc[_0x47a5('0x12')](_0x463e5e,_0x48835f);};var _0xe3f69f=0x0;_0x49d3dc(document)[_0x47a5('0x9f')](function(_0x522972,_0x3d93ad,_0x281674){-0x1<_0x281674[_0x47a5('0x18')][_0x47a5('0xe')]()[_0x47a5('0xa0')](_0x47a5('0xa1'))&&(_0xe3f69f=(_0x281674[_0x47a5('0x18')][_0x47a5('0xa2')](/sku\=([0-9]+)/i)||[''])[_0x47a5('0x94')]());});_0x49d3dc(window)[_0x47a5('0x60')](_0x47a5('0xa3'),function(){_0x49d3dc(window)[_0x47a5('0x5b')]('QuatroDigital.qd_bb_prod_add',[new _0x49d3dc(),_0xe3f69f]);});_0x49d3dc(document)[_0x47a5('0xa4')](function(){_0x3770ae[_0x47a5('0x41')]();});}catch(_0x591bde){_0x47a5('0x4')!==typeof console&&_0x47a5('0x7')===typeof console[_0x47a5('0x21')]&&console[_0x47a5('0x21')](_0x47a5('0x62'),_0x591bde);}}(this));function qd_number_format(_0x58fac0,_0x2dee0d,_0x3e7bcf,_0x285e7b){_0x58fac0=(_0x58fac0+'')[_0x47a5('0x2')](/[^0-9+\-Ee.]/g,'');_0x58fac0=isFinite(+_0x58fac0)?+_0x58fac0:0x0;_0x2dee0d=isFinite(+_0x2dee0d)?Math[_0x47a5('0x3')](_0x2dee0d):0x0;_0x285e7b=_0x47a5('0x4')===typeof _0x285e7b?',':_0x285e7b;_0x3e7bcf=_0x47a5('0x4')===typeof _0x3e7bcf?'.':_0x3e7bcf;var _0xa3d578='',_0xa3d578=function(_0x580ce8,_0xf105b8){var _0x5544a2=Math[_0x47a5('0xa5')](0xa,_0xf105b8);return''+(Math[_0x47a5('0x5')](_0x580ce8*_0x5544a2)/_0x5544a2)[_0x47a5('0xa6')](_0xf105b8);},_0xa3d578=(_0x2dee0d?_0xa3d578(_0x58fac0,_0x2dee0d):''+Math[_0x47a5('0x5')](_0x58fac0))['split']('.');0x3<_0xa3d578[0x0][_0x47a5('0x6')]&&(_0xa3d578[0x0]=_0xa3d578[0x0][_0x47a5('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x285e7b));(_0xa3d578[0x1]||'')[_0x47a5('0x6')]<_0x2dee0d&&(_0xa3d578[0x1]=_0xa3d578[0x1]||'',_0xa3d578[0x1]+=Array(_0x2dee0d-_0xa3d578[0x1]['length']+0x1)['join']('0'));return _0xa3d578[_0x47a5('0x64')](_0x3e7bcf);}(function(){try{window[_0x47a5('0x37')]=window[_0x47a5('0x37')]||{},window[_0x47a5('0x37')][_0x47a5('0x40')]=window[_0x47a5('0x37')][_0x47a5('0x40')]||$[_0x47a5('0x65')]();}catch(_0x566630){_0x47a5('0x4')!==typeof console&&'function'===typeof console[_0x47a5('0x21')]&&console[_0x47a5('0x21')]('Oooops!\x20',_0x566630['message']);}}());(function(_0x229280){try{var _0x41d2da=jQuery,_0x530387=function(_0x4420fa,_0x2b2693){if(_0x47a5('0x14')===typeof console&&_0x47a5('0x4')!==typeof console['error']&&_0x47a5('0x4')!==typeof console['info']&&'undefined'!==typeof console['warn']){var _0x1e0171;'object'===typeof _0x4420fa?(_0x4420fa[_0x47a5('0x66')](_0x47a5('0xa7')),_0x1e0171=_0x4420fa):_0x1e0171=[_0x47a5('0xa7')+_0x4420fa];if(_0x47a5('0x4')===typeof _0x2b2693||_0x47a5('0x2a')!==_0x2b2693[_0x47a5('0xe')]()&&_0x47a5('0x68')!==_0x2b2693[_0x47a5('0xe')]())if(_0x47a5('0x4')!==typeof _0x2b2693&&_0x47a5('0x2c')===_0x2b2693[_0x47a5('0xe')]())try{console[_0x47a5('0x2c')][_0x47a5('0x69')](console,_0x1e0171);}catch(_0x1bfa3b){try{console[_0x47a5('0x2c')](_0x1e0171['join']('\x0a'));}catch(_0xdd95c8){}}else try{console[_0x47a5('0x21')][_0x47a5('0x69')](console,_0x1e0171);}catch(_0x2fa5e3){try{console['error'](_0x1e0171[_0x47a5('0x64')]('\x0a'));}catch(_0x49998b){}}else try{console[_0x47a5('0x2b')]['apply'](console,_0x1e0171);}catch(_0x28c125){try{console[_0x47a5('0x2b')](_0x1e0171[_0x47a5('0x64')]('\x0a'));}catch(_0x5c20aa){}}}};window[_0x47a5('0x56')]=window[_0x47a5('0x56')]||{};window[_0x47a5('0x56')]['allowUpdate']=!0x0;_0x41d2da['QD_dropDownCart']=function(){};_0x41d2da['fn'][_0x47a5('0xa8')]=function(){return{'fn':new _0x41d2da()};};var _0x1a5e07=function(_0x31c88c){var _0x4594df={'a':_0x47a5('0xa9')};return function(_0x579e5c){var _0x1196a0=function(_0x4b3ae4){return _0x4b3ae4;};var _0xbcd492=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x579e5c=_0x579e5c['d'+_0xbcd492[0x10]+'c'+_0xbcd492[0x11]+'m'+_0x1196a0(_0xbcd492[0x1])+'n'+_0xbcd492[0xd]]['l'+_0xbcd492[0x12]+'c'+_0xbcd492[0x0]+'ti'+_0x1196a0('o')+'n'];var _0xdeaf4e=function(_0x46647f){return escape(encodeURIComponent(_0x46647f[_0x47a5('0x2')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4dc67c){return String[_0x47a5('0xaa')](('Z'>=_0x4dc67c?0x5a:0x7a)>=(_0x4dc67c=_0x4dc67c[_0x47a5('0xab')](0x0)+0xd)?_0x4dc67c:_0x4dc67c-0x1a);})));};var _0x229280=_0xdeaf4e(_0x579e5c[[_0xbcd492[0x9],_0x1196a0('o'),_0xbcd492[0xc],_0xbcd492[_0x1196a0(0xd)]][_0x47a5('0x64')]('')]);_0xdeaf4e=_0xdeaf4e((window[['js',_0x1196a0('no'),'m',_0xbcd492[0x1],_0xbcd492[0x4][_0x47a5('0xc')](),_0x47a5('0xac')][_0x47a5('0x64')]('')]||_0x47a5('0x7f'))+['.v',_0xbcd492[0xd],'e',_0x1196a0('x'),'co',_0x1196a0('mm'),_0x47a5('0xad'),_0xbcd492[0x1],'.c',_0x1196a0('o'),'m.',_0xbcd492[0x13],'r']['join'](''));for(var _0x530c2e in _0x4594df){if(_0xdeaf4e===_0x530c2e+_0x4594df[_0x530c2e]||_0x229280===_0x530c2e+_0x4594df[_0x530c2e]){var _0xcb1cf2='tr'+_0xbcd492[0x11]+'e';break;}_0xcb1cf2='f'+_0xbcd492[0x0]+'ls'+_0x1196a0(_0xbcd492[0x1])+'';}_0x1196a0=!0x1;-0x1<_0x579e5c[[_0xbcd492[0xc],'e',_0xbcd492[0x0],'rc',_0xbcd492[0x9]]['join']('')][_0x47a5('0xa0')](_0x47a5('0xae'))&&(_0x1196a0=!0x0);return[_0xcb1cf2,_0x1196a0];}(_0x31c88c);}(window);if(!eval(_0x1a5e07[0x0]))return _0x1a5e07[0x1]?_0x530387(_0x47a5('0xaf')):!0x1;_0x41d2da['QD_dropDownCart']=function(_0x36b421,_0x26d629){var _0x4842c5=_0x41d2da(_0x36b421);if(!_0x4842c5[_0x47a5('0x6')])return _0x4842c5;var _0x51f6cf=_0x41d2da[_0x47a5('0x12')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x47a5('0xb0'),'linkCheckout':_0x47a5('0xb1'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x5075a6){return _0x5075a6[_0x47a5('0xb2')]||_0x5075a6['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x26d629);_0x41d2da('');var _0x1f26e9=this;if(_0x51f6cf[_0x47a5('0xb3')]){var _0x530e98=!0x1;'undefined'===typeof window['vtexjs']&&(_0x530387(_0x47a5('0xb4')),_0x41d2da['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':'script','error':function(){_0x530387(_0x47a5('0xb5'));_0x530e98=!0x0;}}));if(_0x530e98)return _0x530387(_0x47a5('0xb6'));}if(_0x47a5('0x14')===typeof window[_0x47a5('0x57')]&&'undefined'!==typeof window[_0x47a5('0x57')]['checkout'])var _0x2b6f9e=window['vtexjs'][_0x47a5('0x27')];else if(_0x47a5('0x14')===typeof vtex&&_0x47a5('0x14')===typeof vtex['checkout']&&_0x47a5('0x4')!==typeof vtex[_0x47a5('0x27')][_0x47a5('0x58')])_0x2b6f9e=new vtex[(_0x47a5('0x27'))]['SDK']();else return _0x530387(_0x47a5('0xb7'));_0x1f26e9[_0x47a5('0xb8')]=_0x47a5('0xb9');var _0x435326=function(_0x1ab5c4){_0x41d2da(this)[_0x47a5('0x7a')](_0x1ab5c4);_0x1ab5c4['find'](_0x47a5('0xba'))[_0x47a5('0x2e')](_0x41d2da(_0x47a5('0xbb')))['on'](_0x47a5('0xbc'),function(){_0x4842c5[_0x47a5('0x47')](_0x47a5('0xbd'));_0x41d2da(document[_0x47a5('0x6b')])[_0x47a5('0x47')](_0x47a5('0xbe'));});_0x41d2da(document)[_0x47a5('0xbf')](_0x47a5('0xc0'))['on'](_0x47a5('0xc0'),function(_0x40dab1){0x1b==_0x40dab1[_0x47a5('0xc1')]&&(_0x4842c5[_0x47a5('0x47')](_0x47a5('0xbd')),_0x41d2da(document[_0x47a5('0x6b')])['removeClass'](_0x47a5('0xbe')));});var _0x5ee5c5=_0x1ab5c4['find'](_0x47a5('0xc2'));_0x1ab5c4[_0x47a5('0x4d')](_0x47a5('0xc3'))['on']('click.qd_ddc_scrollUp',function(){_0x1f26e9[_0x47a5('0xc4')]('-',void 0x0,void 0x0,_0x5ee5c5);return!0x1;});_0x1ab5c4[_0x47a5('0x4d')](_0x47a5('0xc5'))['on'](_0x47a5('0xc6'),function(){_0x1f26e9[_0x47a5('0xc4')](void 0x0,void 0x0,void 0x0,_0x5ee5c5);return!0x1;});_0x1ab5c4[_0x47a5('0x4d')](_0x47a5('0xc7'))[_0x47a5('0xc8')]('')['on'](_0x47a5('0xc9'),function(){_0x1f26e9[_0x47a5('0xca')](_0x41d2da(this));});if(_0x51f6cf[_0x47a5('0xcb')]){var _0x26d629=0x0;_0x41d2da(this)['on'](_0x47a5('0xcc'),function(){var _0x1ab5c4=function(){window['_QuatroDigital_DropDown'][_0x47a5('0xcd')]&&(_0x1f26e9['getCartInfoByUrl'](),window[_0x47a5('0x56')][_0x47a5('0xcd')]=!0x1,_0x41d2da['fn'][_0x47a5('0x5e')](!0x0),_0x1f26e9[_0x47a5('0xce')]());};_0x26d629=setInterval(function(){_0x1ab5c4();},0x258);_0x1ab5c4();});_0x41d2da(this)['on'](_0x47a5('0xcf'),function(){clearInterval(_0x26d629);});}};var _0x3708ea=function(_0x583b37){_0x583b37=_0x41d2da(_0x583b37);_0x51f6cf[_0x47a5('0xd0')][_0x47a5('0x4f')]=_0x51f6cf[_0x47a5('0xd0')]['cartTotal'][_0x47a5('0x2')](_0x47a5('0xd1'),_0x47a5('0xd2'));_0x51f6cf[_0x47a5('0xd0')][_0x47a5('0x4f')]=_0x51f6cf[_0x47a5('0xd0')][_0x47a5('0x4f')][_0x47a5('0x2')](_0x47a5('0xd3'),_0x47a5('0xd4'));_0x51f6cf[_0x47a5('0xd0')][_0x47a5('0x4f')]=_0x51f6cf[_0x47a5('0xd0')][_0x47a5('0x4f')][_0x47a5('0x2')](_0x47a5('0xd5'),_0x47a5('0xd6'));_0x51f6cf[_0x47a5('0xd0')][_0x47a5('0x4f')]=_0x51f6cf[_0x47a5('0xd0')][_0x47a5('0x4f')][_0x47a5('0x2')]('#total',_0x47a5('0xd7'));_0x583b37['find'](_0x47a5('0xd8'))[_0x47a5('0x4a')](_0x51f6cf[_0x47a5('0xd0')][_0x47a5('0xd9')]);_0x583b37[_0x47a5('0x4d')](_0x47a5('0xda'))[_0x47a5('0x4a')](_0x51f6cf[_0x47a5('0xd0')]['continueShopping']);_0x583b37[_0x47a5('0x4d')](_0x47a5('0xdb'))[_0x47a5('0x4a')](_0x51f6cf['texts'][_0x47a5('0xdc')]);_0x583b37[_0x47a5('0x4d')](_0x47a5('0xdd'))[_0x47a5('0x4a')](_0x51f6cf['texts'][_0x47a5('0x4f')]);_0x583b37[_0x47a5('0x4d')](_0x47a5('0xde'))[_0x47a5('0x4a')](_0x51f6cf['texts'][_0x47a5('0xdf')]);_0x583b37['find']('.qd-ddc-emptyCart\x20p')[_0x47a5('0x4a')](_0x51f6cf[_0x47a5('0xd0')][_0x47a5('0x53')]);return _0x583b37;}(this[_0x47a5('0xb8')]);var _0x533cc7=0x0;_0x4842c5[_0x47a5('0x4c')](function(){0x0<_0x533cc7?_0x435326[_0x47a5('0x5f')](this,_0x3708ea[_0x47a5('0xe0')]()):_0x435326[_0x47a5('0x5f')](this,_0x3708ea);_0x533cc7++;});window[_0x47a5('0x37')][_0x47a5('0x40')]['add'](function(){_0x41d2da(_0x47a5('0xe1'))[_0x47a5('0x4a')](window[_0x47a5('0x37')][_0x47a5('0x3b')]||'--');_0x41d2da(_0x47a5('0xe2'))['html'](window[_0x47a5('0x37')]['qtt']||'0');_0x41d2da(_0x47a5('0xe3'))['html'](window[_0x47a5('0x37')]['shipping']||'--');_0x41d2da('.qd-ddc-infoAllTotal')[_0x47a5('0x4a')](window[_0x47a5('0x37')]['allTotal']||'--');});var _0xa07bc6=function(_0x2d7e13,_0x530542){if(_0x47a5('0x4')===typeof _0x2d7e13[_0x47a5('0x3f')])return _0x530387(_0x47a5('0xe4'));_0x1f26e9['renderProductsList'][_0x47a5('0x5f')](this,_0x530542);};_0x1f26e9[_0x47a5('0x84')]=function(_0x2c3d6a,_0x30b0f9){_0x47a5('0x4')!=typeof _0x30b0f9?window['_QuatroDigital_DropDown']['dataOptionsCache']=_0x30b0f9:window[_0x47a5('0x56')]['dataOptionsCache']&&(_0x30b0f9=window[_0x47a5('0x56')][_0x47a5('0xe5')]);setTimeout(function(){window['_QuatroDigital_DropDown']['dataOptionsCache']=void 0x0;},_0x51f6cf[_0x47a5('0x82')]);_0x41d2da('.qd-ddc-wrapper')[_0x47a5('0x47')](_0x47a5('0xe6'));if(_0x51f6cf[_0x47a5('0xb3')]){var _0x26d629=function(_0x14a6ac){window[_0x47a5('0x56')][_0x47a5('0x26')]=_0x14a6ac;_0xa07bc6(_0x14a6ac,_0x30b0f9);'undefined'!==typeof window[_0x47a5('0xe7')]&&'function'===typeof window[_0x47a5('0xe7')][_0x47a5('0xe8')]&&window[_0x47a5('0xe7')][_0x47a5('0xe8')][_0x47a5('0x5f')](this);_0x41d2da(_0x47a5('0xe9'))[_0x47a5('0x54')](_0x47a5('0xe6'));};_0x47a5('0x4')!==typeof window[_0x47a5('0x56')][_0x47a5('0x26')]?(_0x26d629(window[_0x47a5('0x56')]['getOrderForm']),_0x47a5('0x7')===typeof _0x2c3d6a&&_0x2c3d6a(window[_0x47a5('0x56')][_0x47a5('0x26')])):_0x41d2da['QD_checkoutQueue']([_0x47a5('0x3f'),_0x47a5('0x38'),_0x47a5('0xea')],{'done':function(_0x4071e2){_0x26d629[_0x47a5('0x5f')](this,_0x4071e2);_0x47a5('0x7')===typeof _0x2c3d6a&&_0x2c3d6a(_0x4071e2);},'fail':function(_0x482809){_0x530387([_0x47a5('0xeb'),_0x482809]);}});}else alert(_0x47a5('0xec'));};_0x1f26e9[_0x47a5('0xce')]=function(){var _0x3f7286=_0x41d2da(_0x47a5('0xe9'));_0x3f7286[_0x47a5('0x4d')](_0x47a5('0xed'))[_0x47a5('0x6')]?_0x3f7286[_0x47a5('0x47')](_0x47a5('0xee')):_0x3f7286['addClass']('qd-ddc-noItems');};_0x1f26e9[_0x47a5('0xef')]=function(_0x144524){var _0x26d629=_0x41d2da('.qd-ddc-prodWrapper2');_0x26d629[_0x47a5('0xf0')]();_0x26d629['each'](function(){var _0x26d629=_0x41d2da(this),_0x36b421,_0x1e0445,_0x2656ba=_0x41d2da(''),_0x1250dd;for(_0x1250dd in window['_QuatroDigital_DropDown'][_0x47a5('0x26')][_0x47a5('0x3f')])if('object'===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x47a5('0x3f')][_0x1250dd]){var _0x2d4bc2=window[_0x47a5('0x56')][_0x47a5('0x26')][_0x47a5('0x3f')][_0x1250dd];var _0x4c555c=_0x2d4bc2['productCategoryIds'][_0x47a5('0x2')](/^\/|\/$/g,'')[_0x47a5('0xf1')]('/');var _0x3a0c7b=_0x41d2da(_0x47a5('0xf2'));_0x3a0c7b['attr']({'data-sku':_0x2d4bc2['id'],'data-sku-index':_0x1250dd,'data-qd-departament':_0x4c555c[0x0],'data-qd-category':_0x4c555c[_0x4c555c[_0x47a5('0x6')]-0x1]});_0x3a0c7b[_0x47a5('0x54')](_0x47a5('0xf3')+_0x2d4bc2[_0x47a5('0xf4')]);_0x3a0c7b['find']('.qd-ddc-prodName')['append'](_0x51f6cf[_0x47a5('0xb2')](_0x2d4bc2));_0x3a0c7b[_0x47a5('0x4d')](_0x47a5('0xf5'))[_0x47a5('0x7a')](isNaN(_0x2d4bc2[_0x47a5('0xf6')])?_0x2d4bc2[_0x47a5('0xf6')]:0x0==_0x2d4bc2[_0x47a5('0xf6')]?_0x47a5('0xf7'):(_0x41d2da(_0x47a5('0xf8'))['attr'](_0x47a5('0x35'))||'R$')+'\x20'+qd_number_format(_0x2d4bc2[_0x47a5('0xf6')]/0x64,0x2,',','.'));_0x3a0c7b['find'](_0x47a5('0xf9'))[_0x47a5('0x34')]({'data-sku':_0x2d4bc2['id'],'data-sku-index':_0x1250dd})[_0x47a5('0xc8')](_0x2d4bc2[_0x47a5('0xfa')]);_0x3a0c7b['find'](_0x47a5('0xfb'))[_0x47a5('0x34')]({'data-sku':_0x2d4bc2['id'],'data-sku-index':_0x1250dd});_0x1f26e9[_0x47a5('0xfc')](_0x2d4bc2['id'],_0x3a0c7b['find']('.qd-ddc-image'),_0x2d4bc2[_0x47a5('0xfd')]);_0x3a0c7b['find'](_0x47a5('0xfe'))['attr']({'data-sku':_0x2d4bc2['id'],'data-sku-index':_0x1250dd});_0x3a0c7b[_0x47a5('0xff')](_0x26d629);_0x2656ba=_0x2656ba[_0x47a5('0x2e')](_0x3a0c7b);}try{var _0x1ffa35=_0x26d629[_0x47a5('0x0')](_0x47a5('0xe9'))['find']('.qd-ddc-shipping\x20input');_0x1ffa35[_0x47a5('0x6')]&&''==_0x1ffa35[_0x47a5('0xc8')]()&&window[_0x47a5('0x56')][_0x47a5('0x26')]['shippingData']['address']&&_0x1ffa35[_0x47a5('0xc8')](window['_QuatroDigital_DropDown'][_0x47a5('0x26')]['shippingData'][_0x47a5('0x100')]['postalCode']);}catch(_0x41bbe6){_0x530387(_0x47a5('0x101')+_0x41bbe6[_0x47a5('0x23')],_0x47a5('0x68'));}_0x1f26e9[_0x47a5('0x102')](_0x26d629);_0x1f26e9[_0x47a5('0xce')]();_0x144524&&_0x144524[_0x47a5('0x103')]&&function(){_0x1e0445=_0x2656ba[_0x47a5('0x7e')]('[data-sku=\x27'+_0x144524[_0x47a5('0x103')]+'\x27]');_0x1e0445[_0x47a5('0x6')]&&(_0x36b421=0x0,_0x2656ba['each'](function(){var _0x144524=_0x41d2da(this);if(_0x144524['is'](_0x1e0445))return!0x1;_0x36b421+=_0x144524[_0x47a5('0x104')]();}),_0x1f26e9['scrollCart'](void 0x0,void 0x0,_0x36b421,_0x26d629['add'](_0x26d629[_0x47a5('0x98')]())),_0x2656ba['removeClass'](_0x47a5('0x105')),function(_0x181b57){_0x181b57[_0x47a5('0x54')]('qd-ddc-lastAdded');_0x181b57[_0x47a5('0x54')](_0x47a5('0x105'));setTimeout(function(){_0x181b57[_0x47a5('0x47')](_0x47a5('0x106'));},_0x51f6cf[_0x47a5('0x82')]);}(_0x1e0445));}();});(function(){_QuatroDigital_DropDown[_0x47a5('0x26')][_0x47a5('0x3f')]['length']?(_0x41d2da(_0x47a5('0x6b'))[_0x47a5('0x47')](_0x47a5('0x107'))[_0x47a5('0x54')](_0x47a5('0x108')),setTimeout(function(){_0x41d2da(_0x47a5('0x6b'))[_0x47a5('0x47')]('qd-ddc-product-add-time');},_0x51f6cf['timeRemoveNewItemClass'])):_0x41d2da(_0x47a5('0x6b'))[_0x47a5('0x47')](_0x47a5('0x109'))['addClass']('qd-ddc-cart-empty');}());_0x47a5('0x7')===typeof _0x51f6cf[_0x47a5('0x10a')]?_0x51f6cf[_0x47a5('0x10a')][_0x47a5('0x5f')](this):_0x530387(_0x47a5('0x10b'));};_0x1f26e9[_0x47a5('0xfc')]=function(_0x2e0add,_0x58e85b,_0xf00c44){function _0x3ed429(){_0x58e85b[_0x47a5('0x47')]('qd-loaded')[_0x47a5('0x10c')](function(){_0x41d2da(this)[_0x47a5('0x54')](_0x47a5('0x10d'));})[_0x47a5('0x34')](_0x47a5('0x10e'),_0xf00c44);}_0xf00c44?_0x3ed429():isNaN(_0x2e0add)?_0x530387(_0x47a5('0x10f'),_0x47a5('0x2a')):alert(_0x47a5('0x110'));};_0x1f26e9[_0x47a5('0x102')]=function(_0x9ced85){var _0xd4f6ce=function(_0x3426ae,_0x3bd9cf){var _0x26d629=_0x41d2da(_0x3426ae);var _0x3b6203=_0x26d629['attr'](_0x47a5('0x111'));var _0x36b421=_0x26d629[_0x47a5('0x34')](_0x47a5('0x112'));if(_0x3b6203){var _0x3b9a8b=parseInt(_0x26d629['val']())||0x1;_0x1f26e9[_0x47a5('0x113')]([_0x3b6203,_0x36b421],_0x3b9a8b,_0x3b9a8b+0x1,function(_0x4aba8c){_0x26d629[_0x47a5('0xc8')](_0x4aba8c);_0x47a5('0x7')===typeof _0x3bd9cf&&_0x3bd9cf();});}};var _0x26d629=function(_0x29255d,_0x586640){var _0x26d629=_0x41d2da(_0x29255d);var _0x512607=_0x26d629['attr'](_0x47a5('0x111'));var _0x36b421=_0x26d629[_0x47a5('0x34')](_0x47a5('0x112'));if(_0x512607){var _0x184a18=parseInt(_0x26d629[_0x47a5('0xc8')]())||0x2;_0x1f26e9[_0x47a5('0x113')]([_0x512607,_0x36b421],_0x184a18,_0x184a18-0x1,function(_0x33ac8b){_0x26d629[_0x47a5('0xc8')](_0x33ac8b);'function'===typeof _0x586640&&_0x586640();});}};var _0x51d485=function(_0x169ca5,_0x179d3a){var _0x26d629=_0x41d2da(_0x169ca5);var _0x349166=_0x26d629[_0x47a5('0x34')]('data-sku');var _0x36b421=_0x26d629[_0x47a5('0x34')](_0x47a5('0x112'));if(_0x349166){var _0x50ff41=parseInt(_0x26d629['val']())||0x1;_0x1f26e9[_0x47a5('0x113')]([_0x349166,_0x36b421],0x1,_0x50ff41,function(_0x3e8697){_0x26d629['val'](_0x3e8697);_0x47a5('0x7')===typeof _0x179d3a&&_0x179d3a();});}};var _0x36b421=_0x9ced85[_0x47a5('0x4d')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x36b421[_0x47a5('0x54')](_0x47a5('0x114'))[_0x47a5('0x4c')](function(){var _0x9ced85=_0x41d2da(this);_0x9ced85[_0x47a5('0x4d')]('.qd-ddc-quantityMore')['on'](_0x47a5('0x115'),function(_0x38accb){_0x38accb[_0x47a5('0x73')]();_0x36b421[_0x47a5('0x54')]('qd-loading');_0xd4f6ce(_0x9ced85['find'](_0x47a5('0xf9')),function(){_0x36b421['removeClass'](_0x47a5('0x116'));});});_0x9ced85[_0x47a5('0x4d')](_0x47a5('0x117'))['on'](_0x47a5('0x118'),function(_0x14b140){_0x14b140[_0x47a5('0x73')]();_0x36b421['addClass'](_0x47a5('0x116'));_0x26d629(_0x9ced85[_0x47a5('0x4d')](_0x47a5('0xf9')),function(){_0x36b421['removeClass']('qd-loading');});});_0x9ced85[_0x47a5('0x4d')]('.qd-ddc-quantity')['on'](_0x47a5('0x119'),function(){_0x36b421[_0x47a5('0x54')](_0x47a5('0x116'));_0x51d485(this,function(){_0x36b421[_0x47a5('0x47')](_0x47a5('0x116'));});});_0x9ced85['find']('.qd-ddc-quantity')['on'](_0x47a5('0x11a'),function(_0x15c4fd){0xd==_0x15c4fd[_0x47a5('0xc1')]&&(_0x36b421[_0x47a5('0x54')](_0x47a5('0x116')),_0x51d485(this,function(){_0x36b421['removeClass'](_0x47a5('0x116'));}));});});_0x9ced85[_0x47a5('0x4d')](_0x47a5('0xed'))[_0x47a5('0x4c')](function(){var _0x9ced85=_0x41d2da(this);_0x9ced85['find'](_0x47a5('0xfb'))['on'](_0x47a5('0x11b'),function(){_0x9ced85[_0x47a5('0x54')](_0x47a5('0x116'));_0x1f26e9[_0x47a5('0x11c')](_0x41d2da(this),function(_0x3eec46){_0x3eec46?_0x9ced85[_0x47a5('0x11d')](!0x0)[_0x47a5('0x11e')](function(){_0x9ced85[_0x47a5('0x11f')]();_0x1f26e9[_0x47a5('0xce')]();}):_0x9ced85[_0x47a5('0x47')]('qd-loading');});return!0x1;});});};_0x1f26e9[_0x47a5('0xca')]=function(_0x1ccb2e){var _0x565724=_0x1ccb2e['val'](),_0x565724=_0x565724[_0x47a5('0x2')](/[^0-9\-]/g,''),_0x565724=_0x565724['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x47a5('0x120')),_0x565724=_0x565724[_0x47a5('0x2')](/(.{9}).*/g,'$1');_0x1ccb2e['val'](_0x565724);0x9<=_0x565724[_0x47a5('0x6')]&&(_0x1ccb2e[_0x47a5('0x15')](_0x47a5('0x121'))!=_0x565724&&_0x2b6f9e['calculateShipping']({'postalCode':_0x565724,'country':_0x47a5('0x122')})['done'](function(_0x2beef2){window[_0x47a5('0x56')][_0x47a5('0x26')]=_0x2beef2;_0x1f26e9[_0x47a5('0x84')]();})[_0x47a5('0x1d')](function(_0x302f14){_0x530387(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x302f14]);updateCartData();}),_0x1ccb2e['data']('qdDdcLastPostalCode',_0x565724));};_0x1f26e9[_0x47a5('0x113')]=function(_0x2da818,_0x1d6349,_0x9d1a3b,_0x28bf10){function _0x28b865(_0x338c9d){_0x338c9d=_0x47a5('0x123')!==typeof _0x338c9d?!0x1:_0x338c9d;_0x1f26e9[_0x47a5('0x84')]();window[_0x47a5('0x56')][_0x47a5('0xcd')]=!0x1;_0x1f26e9[_0x47a5('0xce')]();_0x47a5('0x4')!==typeof window[_0x47a5('0xe7')]&&_0x47a5('0x7')===typeof window[_0x47a5('0xe7')]['exec']&&window[_0x47a5('0xe7')][_0x47a5('0xe8')][_0x47a5('0x5f')](this);_0x47a5('0x7')===typeof adminCart&&adminCart();_0x41d2da['fn'][_0x47a5('0x5e')](!0x0,void 0x0,_0x338c9d);_0x47a5('0x7')===typeof _0x28bf10&&_0x28bf10(_0x1d6349);}_0x9d1a3b=_0x9d1a3b||0x1;if(0x1>_0x9d1a3b)return _0x1d6349;if(_0x51f6cf[_0x47a5('0xb3')]){if(_0x47a5('0x4')===typeof window['_QuatroDigital_DropDown'][_0x47a5('0x26')]['items'][_0x2da818[0x1]])return _0x530387(_0x47a5('0x124')+_0x2da818[0x1]+']'),_0x1d6349;window[_0x47a5('0x56')]['getOrderForm'][_0x47a5('0x3f')][_0x2da818[0x1]]['quantity']=_0x9d1a3b;window[_0x47a5('0x56')][_0x47a5('0x26')][_0x47a5('0x3f')][_0x2da818[0x1]][_0x47a5('0x125')]=_0x2da818[0x1];_0x2b6f9e[_0x47a5('0x126')]([window['_QuatroDigital_DropDown'][_0x47a5('0x26')][_0x47a5('0x3f')][_0x2da818[0x1]]],[_0x47a5('0x3f'),'totalizers','shippingData'])[_0x47a5('0x1c')](function(_0x1820ca){window[_0x47a5('0x56')]['getOrderForm']=_0x1820ca;_0x28b865(!0x0);})[_0x47a5('0x1d')](function(_0x18f6d1){_0x530387([_0x47a5('0x127'),_0x18f6d1]);_0x28b865();});}else _0x530387('atenção\x20esta\x20método\x20esta\x20descontinuado');};_0x1f26e9[_0x47a5('0x11c')]=function(_0x3136f9,_0x3ecc43){function _0xf4b1df(_0x50e6ef){_0x50e6ef=_0x47a5('0x123')!==typeof _0x50e6ef?!0x1:_0x50e6ef;'undefined'!==typeof window[_0x47a5('0xe7')]&&_0x47a5('0x7')===typeof window[_0x47a5('0xe7')][_0x47a5('0xe8')]&&window['_QuatroDigital_AmountProduct'][_0x47a5('0xe8')][_0x47a5('0x5f')](this);_0x47a5('0x7')===typeof adminCart&&adminCart();_0x41d2da['fn'][_0x47a5('0x5e')](!0x0,void 0x0,_0x50e6ef);_0x47a5('0x7')===typeof _0x3ecc43&&_0x3ecc43(_0x36b421);}var _0x36b421=!0x1,_0xbe3a38=_0x41d2da(_0x3136f9)[_0x47a5('0x34')](_0x47a5('0x112'));if(_0x51f6cf[_0x47a5('0xb3')]){if(_0x47a5('0x4')===typeof window[_0x47a5('0x56')]['getOrderForm'][_0x47a5('0x3f')][_0xbe3a38])return _0x530387(_0x47a5('0x124')+_0xbe3a38+']'),_0x36b421;window['_QuatroDigital_DropDown']['getOrderForm'][_0x47a5('0x3f')][_0xbe3a38][_0x47a5('0x125')]=_0xbe3a38;_0x2b6f9e[_0x47a5('0x128')]([window[_0x47a5('0x56')][_0x47a5('0x26')][_0x47a5('0x3f')][_0xbe3a38]],['items','totalizers',_0x47a5('0xea')])[_0x47a5('0x1c')](function(_0x50cc13){_0x36b421=!0x0;window[_0x47a5('0x56')][_0x47a5('0x26')]=_0x50cc13;_0xa07bc6(_0x50cc13);_0xf4b1df(!0x0);})['fail'](function(_0x269a37){_0x530387(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x269a37]);_0xf4b1df();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x1f26e9['scrollCart']=function(_0x41ee78,_0x385bfa,_0x2771da,_0x4a0630){_0x4a0630=_0x4a0630||_0x41d2da(_0x47a5('0x129'));_0x41ee78=_0x41ee78||'+';_0x385bfa=_0x385bfa||0.9*_0x4a0630['height']();_0x4a0630[_0x47a5('0x11d')](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x2771da)?_0x41ee78+'='+_0x385bfa+'px':_0x2771da});};_0x51f6cf[_0x47a5('0xcb')]||(_0x1f26e9[_0x47a5('0x84')](),_0x41d2da['fn'][_0x47a5('0x5e')](!0x0));_0x41d2da(window)['on'](_0x47a5('0x12a'),function(){try{window[_0x47a5('0x56')][_0x47a5('0x26')]=void 0x0,_0x1f26e9[_0x47a5('0x84')]();}catch(_0x15d573){_0x530387(_0x47a5('0x12b')+_0x15d573['message'],_0x47a5('0x12c'));}});_0x47a5('0x7')===typeof _0x51f6cf[_0x47a5('0x40')]?_0x51f6cf['callback'][_0x47a5('0x5f')](this):_0x530387(_0x47a5('0x12d'));};_0x41d2da['fn'][_0x47a5('0xa8')]=function(_0x2aa949){var _0x24e241=_0x41d2da(this);_0x24e241['fn']=new _0x41d2da[(_0x47a5('0xa8'))](this,_0x2aa949);return _0x24e241;};}catch(_0x969d4b){_0x47a5('0x4')!==typeof console&&_0x47a5('0x7')===typeof console[_0x47a5('0x21')]&&console['error']('Oooops!\x20',_0x969d4b);}}(this));(function(_0x5130b2){try{var _0x53ed86=jQuery;window[_0x47a5('0xe7')]=window['_QuatroDigital_AmountProduct']||{};window[_0x47a5('0xe7')][_0x47a5('0x3f')]={};window['_QuatroDigital_AmountProduct'][_0x47a5('0x12e')]=!0x1;window[_0x47a5('0xe7')][_0x47a5('0x12f')]=!0x1;window[_0x47a5('0xe7')][_0x47a5('0x130')]=!0x1;var _0x1b3a60=function(){if(window['_QuatroDigital_AmountProduct'][_0x47a5('0x12e')]){var _0x259e37=!0x1;var _0x5130b2={};window[_0x47a5('0xe7')]['items']={};for(_0x53a62e in window[_0x47a5('0x56')][_0x47a5('0x26')][_0x47a5('0x3f')])if(_0x47a5('0x14')===typeof window[_0x47a5('0x56')][_0x47a5('0x26')][_0x47a5('0x3f')][_0x53a62e]){var _0x5b7744=window[_0x47a5('0x56')][_0x47a5('0x26')]['items'][_0x53a62e];_0x47a5('0x4')!==typeof _0x5b7744[_0x47a5('0x131')]&&null!==_0x5b7744['productId']&&''!==_0x5b7744[_0x47a5('0x131')]&&(window['_QuatroDigital_AmountProduct'][_0x47a5('0x3f')][_0x47a5('0x132')+_0x5b7744[_0x47a5('0x131')]]=window[_0x47a5('0xe7')][_0x47a5('0x3f')]['prod_'+_0x5b7744['productId']]||{},window[_0x47a5('0xe7')]['items']['prod_'+_0x5b7744['productId']][_0x47a5('0x133')]=_0x5b7744['productId'],_0x5130b2[_0x47a5('0x132')+_0x5b7744[_0x47a5('0x131')]]||(window[_0x47a5('0xe7')]['items']['prod_'+_0x5b7744[_0x47a5('0x131')]]['qtt']=0x0),window['_QuatroDigital_AmountProduct'][_0x47a5('0x3f')]['prod_'+_0x5b7744['productId']][_0x47a5('0x3d')]+=_0x5b7744[_0x47a5('0xfa')],_0x259e37=!0x0,_0x5130b2['prod_'+_0x5b7744[_0x47a5('0x131')]]=!0x0);}var _0x53a62e=_0x259e37;}else _0x53a62e=void 0x0;window[_0x47a5('0xe7')][_0x47a5('0x12e')]&&(_0x53ed86(_0x47a5('0x134'))[_0x47a5('0x11f')](),_0x53ed86('.qd-bap-item-added')[_0x47a5('0x47')](_0x47a5('0x135')));for(var _0x4641b1 in window[_0x47a5('0xe7')]['items']){_0x5b7744=window[_0x47a5('0xe7')][_0x47a5('0x3f')][_0x4641b1];if(_0x47a5('0x14')!==typeof _0x5b7744)return;_0x5130b2=_0x53ed86('input.qd-productId[value='+_0x5b7744[_0x47a5('0x133')]+']')['getParent']('li');if(window['_QuatroDigital_AmountProduct'][_0x47a5('0x12e')]||!_0x5130b2[_0x47a5('0x4d')]('.qd-bap-wrapper')['length'])_0x259e37=_0x53ed86('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x259e37[_0x47a5('0x4d')](_0x47a5('0x136'))['html'](_0x5b7744[_0x47a5('0x3d')]),_0x5b7744=_0x5130b2['find'](_0x47a5('0x137')),_0x5b7744[_0x47a5('0x6')]?_0x5b7744['prepend'](_0x259e37)[_0x47a5('0x54')](_0x47a5('0x135')):_0x5130b2['prepend'](_0x259e37);}_0x53a62e&&(window[_0x47a5('0xe7')][_0x47a5('0x12e')]=!0x1);};window[_0x47a5('0xe7')][_0x47a5('0xe8')]=function(){window[_0x47a5('0xe7')][_0x47a5('0x12e')]=!0x0;_0x1b3a60[_0x47a5('0x5f')](this);};_0x53ed86(document)[_0x47a5('0xa4')](function(){_0x1b3a60[_0x47a5('0x5f')](this);});}catch(_0x1ebfcd){'undefined'!==typeof console&&_0x47a5('0x7')===typeof console[_0x47a5('0x21')]&&console[_0x47a5('0x21')](_0x47a5('0x62'),_0x1ebfcd);}}(this));(function(){try{var _0x209d91=jQuery,_0x4945b4,_0x475d6b={'selector':_0x47a5('0x138'),'dropDown':{},'buyButton':{}};_0x209d91['QD_smartCart']=function(_0x3a8b3c){var _0x42736e={};_0x4945b4=_0x209d91[_0x47a5('0x12')](!0x0,{},_0x475d6b,_0x3a8b3c);_0x3a8b3c=_0x209d91(_0x4945b4[_0x47a5('0x139')])[_0x47a5('0xa8')](_0x4945b4['dropDown']);_0x42736e[_0x47a5('0x74')]='undefined'!==typeof _0x4945b4['dropDown'][_0x47a5('0xcb')]&&!0x1===_0x4945b4['dropDown'][_0x47a5('0xcb')]?_0x209d91(_0x4945b4[_0x47a5('0x139')])['QD_buyButton'](_0x3a8b3c['fn'],_0x4945b4[_0x47a5('0x74')]):_0x209d91(_0x4945b4['selector'])[_0x47a5('0x9d')](_0x4945b4[_0x47a5('0x74')]);_0x42736e[_0x47a5('0x13a')]=_0x3a8b3c;return _0x42736e;};_0x209d91['fn'][_0x47a5('0x13b')]=function(){_0x47a5('0x14')===typeof console&&_0x47a5('0x7')===typeof console['info']&&console[_0x47a5('0x2c')](_0x47a5('0x13c'));};_0x209d91[_0x47a5('0x13b')]=_0x209d91['fn'][_0x47a5('0x13b')];}catch(_0x1c2c5c){_0x47a5('0x4')!==typeof console&&_0x47a5('0x7')===typeof console[_0x47a5('0x21')]&&console[_0x47a5('0x21')](_0x47a5('0x62'),_0x1c2c5c);}}());
/* Quatro Digital - Smart Quantity // Carlos Vinicius // Todos os direitos reservados */
/* Quatro Digital - Smart Quantity // 1.11 // Carlos Vinicius // Todos os direitos reservados */
(function(v){var d=jQuery;if("function"!==typeof d.fn.QD_smartQuantity){var g=function(d,a){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var f;"object"===typeof d?(d.unshift("[Quatro Digital - Smart Quantity]\n"),f=d):f=["[Quatro Digital - Smart Quantity]\n"+d];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!==typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,
f)}catch(k){console.info(f.join("\n"))}else try{console.error.apply(console,f)}catch(k){console.error(f.join("\n"))}else try{console.warn.apply(console,f)}catch(k){console.warn(f.join("\n"))}}},m={buyButton:".buy-button",qttInput:".qd-sq-quantity",btnMore:".qd-sq-more",btnMinus:".qd-sq-minus",initialValue:1,minimumValue:1,setQuantityByUrl:!0},n=function(h,a){function f(c,e,b){a.setQuantityByUrl?c.val(((location.search||"").match(q)||[a.initialValue]).pop()):c.val(a.initialValue);c.change(function(c,
b){try{if("qd_ssl_trigger"!=b){var e=d(this),f=parseInt(e.val().replace(n,""));!isNaN(f)&&f>a.minimumValue?e.val(f):e.val(a.minimumValue);e.trigger("QuatroDigital.sq_change",this)}}catch(t){g(t.message)}});c.focusin(function(){d(this).trigger("QuatroDigital.sq_focusin",this)});e.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue)+1).change()});b.click(function(b){b.preventDefault();c.val((parseInt(c.val())||a.minimumValue+1)-1).change()});c.change()}function k(c,e,b){c.on("QuatroDigital.sq_change",
function(){(d(this).val()||0)<=a.minimumValue?(b.addClass("qd-sq-inactive"),e.removeClass("qd-sq-inactive")):(e.addClass("qd-sq-inactive"),b.removeClass("qd-sq-inactive"))})}function m(c,e){c.on("QuatroDigital.sq_change",function(){try{if(!(e[0].hostname||"").length)return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL","info");var b=e[0].search||"";-1<b.toLowerCase().indexOf("qty=")?e[0].search=b.replace(p,"qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?
a.minimumValue:1))+"&"):e[0].search="qty="+(parseInt(c.val())||("number"==typeof a.minimumValue?a.minimumValue:1))+"&"+(e[0].search||"").replace(p,"");var d=((e.attr("href")||"").match(u)||[""]).pop()+"";c.attr("data-sku-id",d);if(d.length&&"object"===typeof skuJson&&!c.attr("data-sku-price"))for(b=0;b<skuJson.skus.length;b++)skuJson.skus[b].sku==d&&c.attr("data-sku-price",skuJson.skus[b].bestPrice)}catch(l){g(l.message)}})}var n=/[^0-9-]/gi,q=/qty\=([0-9]+)/i,u=/sku\=([0-9]+)/i,p=/qty\=[0-9]+\&?/ig;
h.each(function(){try{var c=d(this),e=c.find(a.buyButton),b=c.find(a.qttInput),h=c.find(a.btnMore),l=c.find(a.btnMinus);if(!e.length&&null!==a.buyButton||!b.length)return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade","alerta");if(b.is(".qd-sq-on"))return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ",b],"info");b.addClass("qd-sq-on");k(b,h,l);null!==a.buyButton&&m(b,e);f(b,h,l);d(window).on("vtex.sku.selected",
function(){b.change()})}catch(r){g(r.message)}})};d.fn.QD_smartQuantity=function(g){var a=d(this);a.qdPlugin=new n(a,d.extend({},m,g));d(window).trigger("QuatroDigital.sq_callback");return a};d(function(){d(".qd_auto_smart_quantity").QD_smartQuantity()})}})(this);
/* Automatizador de comments box do Facebook // Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
