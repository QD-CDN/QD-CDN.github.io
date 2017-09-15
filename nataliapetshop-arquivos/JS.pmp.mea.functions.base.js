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
			Common.setDataScrollToggle();
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
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '0');
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
			$('.product-qd-v1-see-coupon-click').click(function (e) {
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
			Home.sliderFull();
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
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();				
				$(document.body).toggleClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').appendTo('.search-single-navigator').removeClass('hide');
			});

			$('.navigation-tabs').prepend('<span class="search-qd-v1-navigator-close hide"></span>');
			
			$('.search-qd-v1-navigator-close').click(function() {
				$(document.body).removeClass('qd-sn-on');
				$('.search-qd-v1-navigator-close').addClass('hide');
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
			Product.accessoriesFix();
			Product.accessoriesApplyCarousel();
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
			Institutional.sideMenuToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sideMenuToggle:function() {
			$('.institucional-qd-v1-menu-toggle-wrap').click(function(evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
			});

			$('.institucional-qd-v1-side-menu-wrap-close').click(function(){
				$(document.body).removeClass('qd-sn-on');
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

/* Slick.js - Version: 1.6.0 - Author: Ken Wheeler - Website: http://kenwheeler.github.io - Docs: http://kenwheeler.github.io/slick - Repo: http://github.com/kenwheeler/slick - Issues: http://github.com/kenwheeler/slick/issues */
!function(a){"use strict";"function"==typeof define&&define.amd?define(["jquery"],a):"undefined"!=typeof exports?module.exports=a(require("jquery")):a(jQuery)}(function(a){"use strict";var b=window.Slick||{};b=function(){function c(c,d){var f,e=this;e.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:a(c),appendDots:a(c),arrows:!0,asNavFor:null,prevArrow:'<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous</button>',nextArrow:'<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(b,c){return a('<button type="button" data-role="none" role="button" tabindex="0" />').text(c+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},e.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},a.extend(e,e.initials),e.activeBreakpoint=null,e.animType=null,e.animProp=null,e.breakpoints=[],e.breakpointSettings=[],e.cssTransitions=!1,e.focussed=!1,e.interrupted=!1,e.hidden="hidden",e.paused=!0,e.positionProp=null,e.respondTo=null,e.rowCount=1,e.shouldClick=!0,e.$slider=a(c),e.$slidesCache=null,e.transformType=null,e.transitionType=null,e.visibilityChange="visibilitychange",e.windowWidth=0,e.windowTimer=null,f=a(c).data("slick")||{},e.options=a.extend({},e.defaults,d,f),e.currentSlide=e.options.initialSlide,e.originalSettings=e.options,"undefined"!=typeof document.mozHidden?(e.hidden="mozHidden",e.visibilityChange="mozvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(e.hidden="webkitHidden",e.visibilityChange="webkitvisibilitychange"),e.autoPlay=a.proxy(e.autoPlay,e),e.autoPlayClear=a.proxy(e.autoPlayClear,e),e.autoPlayIterator=a.proxy(e.autoPlayIterator,e),e.changeSlide=a.proxy(e.changeSlide,e),e.clickHandler=a.proxy(e.clickHandler,e),e.selectHandler=a.proxy(e.selectHandler,e),e.setPosition=a.proxy(e.setPosition,e),e.swipeHandler=a.proxy(e.swipeHandler,e),e.dragHandler=a.proxy(e.dragHandler,e),e.keyHandler=a.proxy(e.keyHandler,e),e.instanceUid=b++,e.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,e.registerBreakpoints(),e.init(!0)}var b=0;return c}(),b.prototype.activateADA=function(){var a=this;a.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},b.prototype.addSlide=b.prototype.slickAdd=function(b,c,d){var e=this;if("boolean"==typeof c)d=c,c=null;else if(0>c||c>=e.slideCount)return!1;e.unload(),"number"==typeof c?0===c&&0===e.$slides.length?a(b).appendTo(e.$slideTrack):d?a(b).insertBefore(e.$slides.eq(c)):a(b).insertAfter(e.$slides.eq(c)):d===!0?a(b).prependTo(e.$slideTrack):a(b).appendTo(e.$slideTrack),e.$slides=e.$slideTrack.children(this.options.slide),e.$slideTrack.children(this.options.slide).detach(),e.$slideTrack.append(e.$slides),e.$slides.each(function(b,c){a(c).attr("data-slick-index",b)}),e.$slidesCache=e.$slides,e.reinit()},b.prototype.animateHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.animate({height:b},a.options.speed)}},b.prototype.animateSlide=function(b,c){var d={},e=this;e.animateHeight(),e.options.rtl===!0&&e.options.vertical===!1&&(b=-b),e.transformsEnabled===!1?e.options.vertical===!1?e.$slideTrack.animate({left:b},e.options.speed,e.options.easing,c):e.$slideTrack.animate({top:b},e.options.speed,e.options.easing,c):e.cssTransitions===!1?(e.options.rtl===!0&&(e.currentLeft=-e.currentLeft),a({animStart:e.currentLeft}).animate({animStart:b},{duration:e.options.speed,easing:e.options.easing,step:function(a){a=Math.ceil(a),e.options.vertical===!1?(d[e.animType]="translate("+a+"px, 0px)",e.$slideTrack.css(d)):(d[e.animType]="translate(0px,"+a+"px)",e.$slideTrack.css(d))},complete:function(){c&&c.call()}})):(e.applyTransition(),b=Math.ceil(b),e.options.vertical===!1?d[e.animType]="translate3d("+b+"px, 0px, 0px)":d[e.animType]="translate3d(0px,"+b+"px, 0px)",e.$slideTrack.css(d),c&&setTimeout(function(){e.disableTransition(),c.call()},e.options.speed))},b.prototype.getNavTarget=function(){var b=this,c=b.options.asNavFor;return c&&null!==c&&(c=a(c).not(b.$slider)),c},b.prototype.asNavFor=function(b){var c=this,d=c.getNavTarget();null!==d&&"object"==typeof d&&d.each(function(){var c=a(this).slick("getSlick");c.unslicked||c.slideHandler(b,!0)})},b.prototype.applyTransition=function(a){var b=this,c={};b.options.fade===!1?c[b.transitionType]=b.transformType+" "+b.options.speed+"ms "+b.options.cssEase:c[b.transitionType]="opacity "+b.options.speed+"ms "+b.options.cssEase,b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.autoPlay=function(){var a=this;a.autoPlayClear(),a.slideCount>a.options.slidesToShow&&(a.autoPlayTimer=setInterval(a.autoPlayIterator,a.options.autoplaySpeed))},b.prototype.autoPlayClear=function(){var a=this;a.autoPlayTimer&&clearInterval(a.autoPlayTimer)},b.prototype.autoPlayIterator=function(){var a=this,b=a.currentSlide+a.options.slidesToScroll;a.paused||a.interrupted||a.focussed||(a.options.infinite===!1&&(1===a.direction&&a.currentSlide+1===a.slideCount-1?a.direction=0:0===a.direction&&(b=a.currentSlide-a.options.slidesToScroll,a.currentSlide-1===0&&(a.direction=1))),a.slideHandler(b))},b.prototype.buildArrows=function(){var b=this;b.options.arrows===!0&&(b.$prevArrow=a(b.options.prevArrow).addClass("slick-arrow"),b.$nextArrow=a(b.options.nextArrow).addClass("slick-arrow"),b.slideCount>b.options.slidesToShow?(b.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.prependTo(b.options.appendArrows),b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.appendTo(b.options.appendArrows),b.options.infinite!==!0&&b.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):b.$prevArrow.add(b.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},b.prototype.buildDots=function(){var c,d,b=this;if(b.options.dots===!0&&b.slideCount>b.options.slidesToShow){for(b.$slider.addClass("slick-dotted"),d=a("<ul />").addClass(b.options.dotsClass),c=0;c<=b.getDotCount();c+=1)d.append(a("<li />").append(b.options.customPaging.call(this,b,c)));b.$dots=d.appendTo(b.options.appendDots),b.$dots.find("li").first().addClass("slick-active").attr("aria-hidden","false")}},b.prototype.buildOut=function(){var b=this;b.$slides=b.$slider.children(b.options.slide+":not(.slick-cloned)").addClass("slick-slide"),b.slideCount=b.$slides.length,b.$slides.each(function(b,c){a(c).attr("data-slick-index",b).data("originalStyling",a(c).attr("style")||"")}),b.$slider.addClass("slick-slider"),b.$slideTrack=0===b.slideCount?a('<div class="slick-track"/>').appendTo(b.$slider):b.$slides.wrapAll('<div class="slick-track"/>').parent(),b.$list=b.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent(),b.$slideTrack.css("opacity",0),(b.options.centerMode===!0||b.options.swipeToSlide===!0)&&(b.options.slidesToScroll=1),a("img[data-lazy]",b.$slider).not("[src]").addClass("slick-loading"),b.setupInfinite(),b.buildArrows(),b.buildDots(),b.updateDots(),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.options.draggable===!0&&b.$list.addClass("draggable")},b.prototype.buildRows=function(){var b,c,d,e,f,g,h,a=this;if(e=document.createDocumentFragment(),g=a.$slider.children(),a.options.rows>1){for(h=a.options.slidesPerRow*a.options.rows,f=Math.ceil(g.length/h),b=0;f>b;b++){var i=document.createElement("div");for(c=0;c<a.options.rows;c++){var j=document.createElement("div");for(d=0;d<a.options.slidesPerRow;d++){var k=b*h+(c*a.options.slidesPerRow+d);g.get(k)&&j.appendChild(g.get(k))}i.appendChild(j)}e.appendChild(i)}a.$slider.empty().append(e),a.$slider.children().children().children().css({width:100/a.options.slidesPerRow+"%",display:"inline-block"})}},b.prototype.checkResponsive=function(b,c){var e,f,g,d=this,h=!1,i=d.$slider.width(),j=window.innerWidth||a(window).width();if("window"===d.respondTo?g=j:"slider"===d.respondTo?g=i:"min"===d.respondTo&&(g=Math.min(j,i)),d.options.responsive&&d.options.responsive.length&&null!==d.options.responsive){f=null;for(e in d.breakpoints)d.breakpoints.hasOwnProperty(e)&&(d.originalSettings.mobileFirst===!1?g<d.breakpoints[e]&&(f=d.breakpoints[e]):g>d.breakpoints[e]&&(f=d.breakpoints[e]));null!==f?null!==d.activeBreakpoint?(f!==d.activeBreakpoint||c)&&(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):(d.activeBreakpoint=f,"unslick"===d.breakpointSettings[f]?d.unslick(f):(d.options=a.extend({},d.originalSettings,d.breakpointSettings[f]),b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b)),h=f):null!==d.activeBreakpoint&&(d.activeBreakpoint=null,d.options=d.originalSettings,b===!0&&(d.currentSlide=d.options.initialSlide),d.refresh(b),h=f),b||h===!1||d.$slider.trigger("breakpoint",[d,h])}},b.prototype.changeSlide=function(b,c){var f,g,h,d=this,e=a(b.currentTarget);switch(e.is("a")&&b.preventDefault(),e.is("li")||(e=e.closest("li")),h=d.slideCount%d.options.slidesToScroll!==0,f=h?0:(d.slideCount-d.currentSlide)%d.options.slidesToScroll,b.data.message){case"previous":g=0===f?d.options.slidesToScroll:d.options.slidesToShow-f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide-g,!1,c);break;case"next":g=0===f?d.options.slidesToScroll:f,d.slideCount>d.options.slidesToShow&&d.slideHandler(d.currentSlide+g,!1,c);break;case"index":var i=0===b.data.index?0:b.data.index||e.index()*d.options.slidesToScroll;d.slideHandler(d.checkNavigable(i),!1,c),e.children().trigger("focus");break;default:return}},b.prototype.checkNavigable=function(a){var c,d,b=this;if(c=b.getNavigableIndexes(),d=0,a>c[c.length-1])a=c[c.length-1];else for(var e in c){if(a<c[e]){a=d;break}d=c[e]}return a},b.prototype.cleanUpEvents=function(){var b=this;b.options.dots&&null!==b.$dots&&a("li",b.$dots).off("click.slick",b.changeSlide).off("mouseenter.slick",a.proxy(b.interrupt,b,!0)).off("mouseleave.slick",a.proxy(b.interrupt,b,!1)),b.$slider.off("focus.slick blur.slick"),b.options.arrows===!0&&b.slideCount>b.options.slidesToShow&&(b.$prevArrow&&b.$prevArrow.off("click.slick",b.changeSlide),b.$nextArrow&&b.$nextArrow.off("click.slick",b.changeSlide)),b.$list.off("touchstart.slick mousedown.slick",b.swipeHandler),b.$list.off("touchmove.slick mousemove.slick",b.swipeHandler),b.$list.off("touchend.slick mouseup.slick",b.swipeHandler),b.$list.off("touchcancel.slick mouseleave.slick",b.swipeHandler),b.$list.off("click.slick",b.clickHandler),a(document).off(b.visibilityChange,b.visibility),b.cleanUpSlideEvents(),b.options.accessibility===!0&&b.$list.off("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().off("click.slick",b.selectHandler),a(window).off("orientationchange.slick.slick-"+b.instanceUid,b.orientationChange),a(window).off("resize.slick.slick-"+b.instanceUid,b.resize),a("[draggable!=true]",b.$slideTrack).off("dragstart",b.preventDefault),a(window).off("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).off("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.cleanUpSlideEvents=function(){var b=this;b.$list.off("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.off("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.cleanUpRows=function(){var b,a=this;a.options.rows>1&&(b=a.$slides.children().children(),b.removeAttr("style"),a.$slider.empty().append(b))},b.prototype.clickHandler=function(a){var b=this;b.shouldClick===!1&&(a.stopImmediatePropagation(),a.stopPropagation(),a.preventDefault())},b.prototype.destroy=function(b){var c=this;c.autoPlayClear(),c.touchObject={},c.cleanUpEvents(),a(".slick-cloned",c.$slider).detach(),c.$dots&&c.$dots.remove(),c.$prevArrow&&c.$prevArrow.length&&(c.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.prevArrow)&&c.$prevArrow.remove()),c.$nextArrow&&c.$nextArrow.length&&(c.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),c.htmlExpr.test(c.options.nextArrow)&&c.$nextArrow.remove()),c.$slides&&(c.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){a(this).attr("style",a(this).data("originalStyling"))}),c.$slideTrack.children(this.options.slide).detach(),c.$slideTrack.detach(),c.$list.detach(),c.$slider.append(c.$slides)),c.cleanUpRows(),c.$slider.removeClass("slick-slider"),c.$slider.removeClass("slick-initialized"),c.$slider.removeClass("slick-dotted"),c.unslicked=!0,b||c.$slider.trigger("destroy",[c])},b.prototype.disableTransition=function(a){var b=this,c={};c[b.transitionType]="",b.options.fade===!1?b.$slideTrack.css(c):b.$slides.eq(a).css(c)},b.prototype.fadeSlide=function(a,b){var c=this;c.cssTransitions===!1?(c.$slides.eq(a).css({zIndex:c.options.zIndex}),c.$slides.eq(a).animate({opacity:1},c.options.speed,c.options.easing,b)):(c.applyTransition(a),c.$slides.eq(a).css({opacity:1,zIndex:c.options.zIndex}),b&&setTimeout(function(){c.disableTransition(a),b.call()},c.options.speed))},b.prototype.fadeSlideOut=function(a){var b=this;b.cssTransitions===!1?b.$slides.eq(a).animate({opacity:0,zIndex:b.options.zIndex-2},b.options.speed,b.options.easing):(b.applyTransition(a),b.$slides.eq(a).css({opacity:0,zIndex:b.options.zIndex-2}))},b.prototype.filterSlides=b.prototype.slickFilter=function(a){var b=this;null!==a&&(b.$slidesCache=b.$slides,b.unload(),b.$slideTrack.children(this.options.slide).detach(),b.$slidesCache.filter(a).appendTo(b.$slideTrack),b.reinit())},b.prototype.focusHandler=function(){var b=this;b.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*:not(.slick-arrow)",function(c){c.stopImmediatePropagation();var d=a(this);setTimeout(function(){b.options.pauseOnFocus&&(b.focussed=d.is(":focus"),b.autoPlay())},0)})},b.prototype.getCurrent=b.prototype.slickCurrentSlide=function(){var a=this;return a.currentSlide},b.prototype.getDotCount=function(){var a=this,b=0,c=0,d=0;if(a.options.infinite===!0)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else if(a.options.centerMode===!0)d=a.slideCount;else if(a.options.asNavFor)for(;b<a.slideCount;)++d,b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;else d=1+Math.ceil((a.slideCount-a.options.slidesToShow)/a.options.slidesToScroll);return d-1},b.prototype.getLeft=function(a){var c,d,f,b=this,e=0;return b.slideOffset=0,d=b.$slides.first().outerHeight(!0),b.options.infinite===!0?(b.slideCount>b.options.slidesToShow&&(b.slideOffset=b.slideWidth*b.options.slidesToShow*-1,e=d*b.options.slidesToShow*-1),b.slideCount%b.options.slidesToScroll!==0&&a+b.options.slidesToScroll>b.slideCount&&b.slideCount>b.options.slidesToShow&&(a>b.slideCount?(b.slideOffset=(b.options.slidesToShow-(a-b.slideCount))*b.slideWidth*-1,e=(b.options.slidesToShow-(a-b.slideCount))*d*-1):(b.slideOffset=b.slideCount%b.options.slidesToScroll*b.slideWidth*-1,e=b.slideCount%b.options.slidesToScroll*d*-1))):a+b.options.slidesToShow>b.slideCount&&(b.slideOffset=(a+b.options.slidesToShow-b.slideCount)*b.slideWidth,e=(a+b.options.slidesToShow-b.slideCount)*d),b.slideCount<=b.options.slidesToShow&&(b.slideOffset=0,e=0),b.options.centerMode===!0&&b.options.infinite===!0?b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)-b.slideWidth:b.options.centerMode===!0&&(b.slideOffset=0,b.slideOffset+=b.slideWidth*Math.floor(b.options.slidesToShow/2)),c=b.options.vertical===!1?a*b.slideWidth*-1+b.slideOffset:a*d*-1+e,b.options.variableWidth===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,b.options.centerMode===!0&&(f=b.slideCount<=b.options.slidesToShow||b.options.infinite===!1?b.$slideTrack.children(".slick-slide").eq(a):b.$slideTrack.children(".slick-slide").eq(a+b.options.slidesToShow+1),c=b.options.rtl===!0?f[0]?-1*(b.$slideTrack.width()-f[0].offsetLeft-f.width()):0:f[0]?-1*f[0].offsetLeft:0,c+=(b.$list.width()-f.outerWidth())/2)),c},b.prototype.getOption=b.prototype.slickGetOption=function(a){var b=this;return b.options[a]},b.prototype.getNavigableIndexes=function(){var e,a=this,b=0,c=0,d=[];for(a.options.infinite===!1?e=a.slideCount:(b=-1*a.options.slidesToScroll,c=-1*a.options.slidesToScroll,e=2*a.slideCount);e>b;)d.push(b),b=c+a.options.slidesToScroll,c+=a.options.slidesToScroll<=a.options.slidesToShow?a.options.slidesToScroll:a.options.slidesToShow;return d},b.prototype.getSlick=function(){return this},b.prototype.getSlideCount=function(){var c,d,e,b=this;return e=b.options.centerMode===!0?b.slideWidth*Math.floor(b.options.slidesToShow/2):0,b.options.swipeToSlide===!0?(b.$slideTrack.find(".slick-slide").each(function(c,f){return f.offsetLeft-e+a(f).outerWidth()/2>-1*b.swipeLeft?(d=f,!1):void 0}),c=Math.abs(a(d).attr("data-slick-index")-b.currentSlide)||1):b.options.slidesToScroll},b.prototype.goTo=b.prototype.slickGoTo=function(a,b){var c=this;c.changeSlide({data:{message:"index",index:parseInt(a)}},b)},b.prototype.init=function(b){var c=this;a(c.$slider).hasClass("slick-initialized")||(a(c.$slider).addClass("slick-initialized"),c.buildRows(),c.buildOut(),c.setProps(),c.startLoad(),c.loadSlider(),c.initializeEvents(),c.updateArrows(),c.updateDots(),c.checkResponsive(!0),c.focusHandler()),b&&c.$slider.trigger("init",[c]),c.options.accessibility===!0&&c.initADA(),c.options.autoplay&&(c.paused=!1,c.autoPlay())},b.prototype.initADA=function(){var b=this;b.$slides.add(b.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),b.$slideTrack.attr("role","listbox"),b.$slides.not(b.$slideTrack.find(".slick-cloned")).each(function(c){a(this).attr({role:"option","aria-describedby":"slick-slide"+b.instanceUid+c})}),null!==b.$dots&&b.$dots.attr("role","tablist").find("li").each(function(c){a(this).attr({role:"presentation","aria-selected":"false","aria-controls":"navigation"+b.instanceUid+c,id:"slick-slide"+b.instanceUid+c})}).first().attr("aria-selected","true").end().find("button").attr("role","button").end().closest("div").attr("role","toolbar"),b.activateADA()},b.prototype.initArrowEvents=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},a.changeSlide),a.$nextArrow.off("click.slick").on("click.slick",{message:"next"},a.changeSlide))},b.prototype.initDotEvents=function(){var b=this;b.options.dots===!0&&b.slideCount>b.options.slidesToShow&&a("li",b.$dots).on("click.slick",{message:"index"},b.changeSlide),b.options.dots===!0&&b.options.pauseOnDotsHover===!0&&a("li",b.$dots).on("mouseenter.slick",a.proxy(b.interrupt,b,!0)).on("mouseleave.slick",a.proxy(b.interrupt,b,!1))},b.prototype.initSlideEvents=function(){var b=this;b.options.pauseOnHover&&(b.$list.on("mouseenter.slick",a.proxy(b.interrupt,b,!0)),b.$list.on("mouseleave.slick",a.proxy(b.interrupt,b,!1)))},b.prototype.initializeEvents=function(){var b=this;b.initArrowEvents(),b.initDotEvents(),b.initSlideEvents(),b.$list.on("touchstart.slick mousedown.slick",{action:"start"},b.swipeHandler),b.$list.on("touchmove.slick mousemove.slick",{action:"move"},b.swipeHandler),b.$list.on("touchend.slick mouseup.slick",{action:"end"},b.swipeHandler),b.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},b.swipeHandler),b.$list.on("click.slick",b.clickHandler),a(document).on(b.visibilityChange,a.proxy(b.visibility,b)),b.options.accessibility===!0&&b.$list.on("keydown.slick",b.keyHandler),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),a(window).on("orientationchange.slick.slick-"+b.instanceUid,a.proxy(b.orientationChange,b)),a(window).on("resize.slick.slick-"+b.instanceUid,a.proxy(b.resize,b)),a("[draggable!=true]",b.$slideTrack).on("dragstart",b.preventDefault),a(window).on("load.slick.slick-"+b.instanceUid,b.setPosition),a(document).on("ready.slick.slick-"+b.instanceUid,b.setPosition)},b.prototype.initUI=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.show(),a.$nextArrow.show()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.show()},b.prototype.keyHandler=function(a){var b=this;a.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===a.keyCode&&b.options.accessibility===!0?b.changeSlide({data:{message:b.options.rtl===!0?"next":"previous"}}):39===a.keyCode&&b.options.accessibility===!0&&b.changeSlide({data:{message:b.options.rtl===!0?"previous":"next"}}))},b.prototype.lazyLoad=function(){function g(c){a("img[data-lazy]",c).each(function(){var c=a(this),d=a(this).attr("data-lazy"),e=document.createElement("img");e.onload=function(){c.animate({opacity:0},100,function(){c.attr("src",d).animate({opacity:1},200,function(){c.removeAttr("data-lazy").removeClass("slick-loading")}),b.$slider.trigger("lazyLoaded",[b,c,d])})},e.onerror=function(){c.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),b.$slider.trigger("lazyLoadError",[b,c,d])},e.src=d})}var c,d,e,f,b=this;b.options.centerMode===!0?b.options.infinite===!0?(e=b.currentSlide+(b.options.slidesToShow/2+1),f=e+b.options.slidesToShow+2):(e=Math.max(0,b.currentSlide-(b.options.slidesToShow/2+1)),f=2+(b.options.slidesToShow/2+1)+b.currentSlide):(e=b.options.infinite?b.options.slidesToShow+b.currentSlide:b.currentSlide,f=Math.ceil(e+b.options.slidesToShow),b.options.fade===!0&&(e>0&&e--,f<=b.slideCount&&f++)),c=b.$slider.find(".slick-slide").slice(e,f),g(c),b.slideCount<=b.options.slidesToShow?(d=b.$slider.find(".slick-slide"),g(d)):b.currentSlide>=b.slideCount-b.options.slidesToShow?(d=b.$slider.find(".slick-cloned").slice(0,b.options.slidesToShow),g(d)):0===b.currentSlide&&(d=b.$slider.find(".slick-cloned").slice(-1*b.options.slidesToShow),g(d))},b.prototype.loadSlider=function(){var a=this;a.setPosition(),a.$slideTrack.css({opacity:1}),a.$slider.removeClass("slick-loading"),a.initUI(),"progressive"===a.options.lazyLoad&&a.progressiveLazyLoad()},b.prototype.next=b.prototype.slickNext=function(){var a=this;a.changeSlide({data:{message:"next"}})},b.prototype.orientationChange=function(){var a=this;a.checkResponsive(),a.setPosition()},b.prototype.pause=b.prototype.slickPause=function(){var a=this;a.autoPlayClear(),a.paused=!0},b.prototype.play=b.prototype.slickPlay=function(){var a=this;a.autoPlay(),a.options.autoplay=!0,a.paused=!1,a.focussed=!1,a.interrupted=!1},b.prototype.postSlide=function(a){var b=this;b.unslicked||(b.$slider.trigger("afterChange",[b,a]),b.animating=!1,b.setPosition(),b.swipeLeft=null,b.options.autoplay&&b.autoPlay(),b.options.accessibility===!0&&b.initADA())},b.prototype.prev=b.prototype.slickPrev=function(){var a=this;a.changeSlide({data:{message:"previous"}})},b.prototype.preventDefault=function(a){a.preventDefault()},b.prototype.progressiveLazyLoad=function(b){b=b||1;var e,f,g,c=this,d=a("img[data-lazy]",c.$slider);d.length?(e=d.first(),f=e.attr("data-lazy"),g=document.createElement("img"),g.onload=function(){e.attr("src",f).removeAttr("data-lazy").removeClass("slick-loading"),c.options.adaptiveHeight===!0&&c.setPosition(),c.$slider.trigger("lazyLoaded",[c,e,f]),c.progressiveLazyLoad()},g.onerror=function(){3>b?setTimeout(function(){c.progressiveLazyLoad(b+1)},500):(e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),c.$slider.trigger("lazyLoadError",[c,e,f]),c.progressiveLazyLoad())},g.src=f):c.$slider.trigger("allImagesLoaded",[c])},b.prototype.refresh=function(b){var d,e,c=this;e=c.slideCount-c.options.slidesToShow,!c.options.infinite&&c.currentSlide>e&&(c.currentSlide=e),c.slideCount<=c.options.slidesToShow&&(c.currentSlide=0),d=c.currentSlide,c.destroy(!0),a.extend(c,c.initials,{currentSlide:d}),c.init(),b||c.changeSlide({data:{message:"index",index:d}},!1)},b.prototype.registerBreakpoints=function(){var c,d,e,b=this,f=b.options.responsive||null;if("array"===a.type(f)&&f.length){b.respondTo=b.options.respondTo||"window";for(c in f)if(e=b.breakpoints.length-1,d=f[c].breakpoint,f.hasOwnProperty(c)){for(;e>=0;)b.breakpoints[e]&&b.breakpoints[e]===d&&b.breakpoints.splice(e,1),e--;b.breakpoints.push(d),b.breakpointSettings[d]=f[c].settings}b.breakpoints.sort(function(a,c){return b.options.mobileFirst?a-c:c-a})}},b.prototype.reinit=function(){var b=this;b.$slides=b.$slideTrack.children(b.options.slide).addClass("slick-slide"),b.slideCount=b.$slides.length,b.currentSlide>=b.slideCount&&0!==b.currentSlide&&(b.currentSlide=b.currentSlide-b.options.slidesToScroll),b.slideCount<=b.options.slidesToShow&&(b.currentSlide=0),b.registerBreakpoints(),b.setProps(),b.setupInfinite(),b.buildArrows(),b.updateArrows(),b.initArrowEvents(),b.buildDots(),b.updateDots(),b.initDotEvents(),b.cleanUpSlideEvents(),b.initSlideEvents(),b.checkResponsive(!1,!0),b.options.focusOnSelect===!0&&a(b.$slideTrack).children().on("click.slick",b.selectHandler),b.setSlideClasses("number"==typeof b.currentSlide?b.currentSlide:0),b.setPosition(),b.focusHandler(),b.paused=!b.options.autoplay,b.autoPlay(),b.$slider.trigger("reInit",[b])},b.prototype.resize=function(){var b=this;a(window).width()!==b.windowWidth&&(clearTimeout(b.windowDelay),b.windowDelay=window.setTimeout(function(){b.windowWidth=a(window).width(),b.checkResponsive(),b.unslicked||b.setPosition()},50))},b.prototype.removeSlide=b.prototype.slickRemove=function(a,b,c){var d=this;return"boolean"==typeof a?(b=a,a=b===!0?0:d.slideCount-1):a=b===!0?--a:a,d.slideCount<1||0>a||a>d.slideCount-1?!1:(d.unload(),c===!0?d.$slideTrack.children().remove():d.$slideTrack.children(this.options.slide).eq(a).remove(),d.$slides=d.$slideTrack.children(this.options.slide),d.$slideTrack.children(this.options.slide).detach(),d.$slideTrack.append(d.$slides),d.$slidesCache=d.$slides,void d.reinit())},b.prototype.setCSS=function(a){var d,e,b=this,c={};b.options.rtl===!0&&(a=-a),d="left"==b.positionProp?Math.ceil(a)+"px":"0px",e="top"==b.positionProp?Math.ceil(a)+"px":"0px",c[b.positionProp]=a,b.transformsEnabled===!1?b.$slideTrack.css(c):(c={},b.cssTransitions===!1?(c[b.animType]="translate("+d+", "+e+")",b.$slideTrack.css(c)):(c[b.animType]="translate3d("+d+", "+e+", 0px)",b.$slideTrack.css(c)))},b.prototype.setDimensions=function(){var a=this;a.options.vertical===!1?a.options.centerMode===!0&&a.$list.css({padding:"0px "+a.options.centerPadding}):(a.$list.height(a.$slides.first().outerHeight(!0)*a.options.slidesToShow),a.options.centerMode===!0&&a.$list.css({padding:a.options.centerPadding+" 0px"})),a.listWidth=a.$list.width(),a.listHeight=a.$list.height(),a.options.vertical===!1&&a.options.variableWidth===!1?(a.slideWidth=Math.ceil(a.listWidth/a.options.slidesToShow),a.$slideTrack.width(Math.ceil(a.slideWidth*a.$slideTrack.children(".slick-slide").length))):a.options.variableWidth===!0?a.$slideTrack.width(5e3*a.slideCount):(a.slideWidth=Math.ceil(a.listWidth),a.$slideTrack.height(Math.ceil(a.$slides.first().outerHeight(!0)*a.$slideTrack.children(".slick-slide").length)));var b=a.$slides.first().outerWidth(!0)-a.$slides.first().width();a.options.variableWidth===!1&&a.$slideTrack.children(".slick-slide").width(a.slideWidth-b)},b.prototype.setFade=function(){var c,b=this;b.$slides.each(function(d,e){c=b.slideWidth*d*-1,b.options.rtl===!0?a(e).css({position:"relative",right:c,top:0,zIndex:b.options.zIndex-2,opacity:0}):a(e).css({position:"relative",left:c,top:0,zIndex:b.options.zIndex-2,opacity:0})}),b.$slides.eq(b.currentSlide).css({zIndex:b.options.zIndex-1,opacity:1})},b.prototype.setHeight=function(){var a=this;if(1===a.options.slidesToShow&&a.options.adaptiveHeight===!0&&a.options.vertical===!1){var b=a.$slides.eq(a.currentSlide).outerHeight(!0);a.$list.css("height",b)}},b.prototype.setOption=b.prototype.slickSetOption=function(){var c,d,e,f,h,b=this,g=!1;if("object"===a.type(arguments[0])?(e=arguments[0],g=arguments[1],h="multiple"):"string"===a.type(arguments[0])&&(e=arguments[0],f=arguments[1],g=arguments[2],"responsive"===arguments[0]&&"array"===a.type(arguments[1])?h="responsive":"undefined"!=typeof arguments[1]&&(h="single")),"single"===h)b.options[e]=f;else if("multiple"===h)a.each(e,function(a,c){b.options[a]=c});else if("responsive"===h)for(d in f)if("array"!==a.type(b.options.responsive))b.options.responsive=[f[d]];else{for(c=b.options.responsive.length-1;c>=0;)b.options.responsive[c].breakpoint===f[d].breakpoint&&b.options.responsive.splice(c,1),c--;b.options.responsive.push(f[d])}g&&(b.unload(),b.reinit())},b.prototype.setPosition=function(){var a=this;a.setDimensions(),a.setHeight(),a.options.fade===!1?a.setCSS(a.getLeft(a.currentSlide)):a.setFade(),a.$slider.trigger("setPosition",[a])},b.prototype.setProps=function(){var a=this,b=document.body.style;a.positionProp=a.options.vertical===!0?"top":"left","top"===a.positionProp?a.$slider.addClass("slick-vertical"):a.$slider.removeClass("slick-vertical"),(void 0!==b.WebkitTransition||void 0!==b.MozTransition||void 0!==b.msTransition)&&a.options.useCSS===!0&&(a.cssTransitions=!0),a.options.fade&&("number"==typeof a.options.zIndex?a.options.zIndex<3&&(a.options.zIndex=3):a.options.zIndex=a.defaults.zIndex),void 0!==b.OTransform&&(a.animType="OTransform",a.transformType="-o-transform",a.transitionType="OTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.MozTransform&&(a.animType="MozTransform",a.transformType="-moz-transform",a.transitionType="MozTransition",void 0===b.perspectiveProperty&&void 0===b.MozPerspective&&(a.animType=!1)),void 0!==b.webkitTransform&&(a.animType="webkitTransform",a.transformType="-webkit-transform",a.transitionType="webkitTransition",void 0===b.perspectiveProperty&&void 0===b.webkitPerspective&&(a.animType=!1)),void 0!==b.msTransform&&(a.animType="msTransform",a.transformType="-ms-transform",a.transitionType="msTransition",void 0===b.msTransform&&(a.animType=!1)),void 0!==b.transform&&a.animType!==!1&&(a.animType="transform",a.transformType="transform",a.transitionType="transition"),a.transformsEnabled=a.options.useTransform&&null!==a.animType&&a.animType!==!1},b.prototype.setSlideClasses=function(a){var c,d,e,f,b=this;d=b.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),b.$slides.eq(a).addClass("slick-current"),b.options.centerMode===!0?(c=Math.floor(b.options.slidesToShow/2),b.options.infinite===!0&&(a>=c&&a<=b.slideCount-1-c?b.$slides.slice(a-c,a+c+1).addClass("slick-active").attr("aria-hidden","false"):(e=b.options.slidesToShow+a,
d.slice(e-c+1,e+c+2).addClass("slick-active").attr("aria-hidden","false")),0===a?d.eq(d.length-1-b.options.slidesToShow).addClass("slick-center"):a===b.slideCount-1&&d.eq(b.options.slidesToShow).addClass("slick-center")),b.$slides.eq(a).addClass("slick-center")):a>=0&&a<=b.slideCount-b.options.slidesToShow?b.$slides.slice(a,a+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):d.length<=b.options.slidesToShow?d.addClass("slick-active").attr("aria-hidden","false"):(f=b.slideCount%b.options.slidesToShow,e=b.options.infinite===!0?b.options.slidesToShow+a:a,b.options.slidesToShow==b.options.slidesToScroll&&b.slideCount-a<b.options.slidesToShow?d.slice(e-(b.options.slidesToShow-f),e+f).addClass("slick-active").attr("aria-hidden","false"):d.slice(e,e+b.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false")),"ondemand"===b.options.lazyLoad&&b.lazyLoad()},b.prototype.setupInfinite=function(){var c,d,e,b=this;if(b.options.fade===!0&&(b.options.centerMode=!1),b.options.infinite===!0&&b.options.fade===!1&&(d=null,b.slideCount>b.options.slidesToShow)){for(e=b.options.centerMode===!0?b.options.slidesToShow+1:b.options.slidesToShow,c=b.slideCount;c>b.slideCount-e;c-=1)d=c-1,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d-b.slideCount).prependTo(b.$slideTrack).addClass("slick-cloned");for(c=0;e>c;c+=1)d=c,a(b.$slides[d]).clone(!0).attr("id","").attr("data-slick-index",d+b.slideCount).appendTo(b.$slideTrack).addClass("slick-cloned");b.$slideTrack.find(".slick-cloned").find("[id]").each(function(){a(this).attr("id","")})}},b.prototype.interrupt=function(a){var b=this;a||b.autoPlay(),b.interrupted=a},b.prototype.selectHandler=function(b){var c=this,d=a(b.target).is(".slick-slide")?a(b.target):a(b.target).parents(".slick-slide"),e=parseInt(d.attr("data-slick-index"));return e||(e=0),c.slideCount<=c.options.slidesToShow?(c.setSlideClasses(e),void c.asNavFor(e)):void c.slideHandler(e)},b.prototype.slideHandler=function(a,b,c){var d,e,f,g,j,h=null,i=this;return b=b||!1,i.animating===!0&&i.options.waitForAnimate===!0||i.options.fade===!0&&i.currentSlide===a||i.slideCount<=i.options.slidesToShow?void 0:(b===!1&&i.asNavFor(a),d=a,h=i.getLeft(d),g=i.getLeft(i.currentSlide),i.currentLeft=null===i.swipeLeft?g:i.swipeLeft,i.options.infinite===!1&&i.options.centerMode===!1&&(0>a||a>i.getDotCount()*i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):i.options.infinite===!1&&i.options.centerMode===!0&&(0>a||a>i.slideCount-i.options.slidesToScroll)?void(i.options.fade===!1&&(d=i.currentSlide,c!==!0?i.animateSlide(g,function(){i.postSlide(d)}):i.postSlide(d))):(i.options.autoplay&&clearInterval(i.autoPlayTimer),e=0>d?i.slideCount%i.options.slidesToScroll!==0?i.slideCount-i.slideCount%i.options.slidesToScroll:i.slideCount+d:d>=i.slideCount?i.slideCount%i.options.slidesToScroll!==0?0:d-i.slideCount:d,i.animating=!0,i.$slider.trigger("beforeChange",[i,i.currentSlide,e]),f=i.currentSlide,i.currentSlide=e,i.setSlideClasses(i.currentSlide),i.options.asNavFor&&(j=i.getNavTarget(),j=j.slick("getSlick"),j.slideCount<=j.options.slidesToShow&&j.setSlideClasses(i.currentSlide)),i.updateDots(),i.updateArrows(),i.options.fade===!0?(c!==!0?(i.fadeSlideOut(f),i.fadeSlide(e,function(){i.postSlide(e)})):i.postSlide(e),void i.animateHeight()):void(c!==!0?i.animateSlide(h,function(){i.postSlide(e)}):i.postSlide(e))))},b.prototype.startLoad=function(){var a=this;a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&(a.$prevArrow.hide(),a.$nextArrow.hide()),a.options.dots===!0&&a.slideCount>a.options.slidesToShow&&a.$dots.hide(),a.$slider.addClass("slick-loading")},b.prototype.swipeDirection=function(){var a,b,c,d,e=this;return a=e.touchObject.startX-e.touchObject.curX,b=e.touchObject.startY-e.touchObject.curY,c=Math.atan2(b,a),d=Math.round(180*c/Math.PI),0>d&&(d=360-Math.abs(d)),45>=d&&d>=0?e.options.rtl===!1?"left":"right":360>=d&&d>=315?e.options.rtl===!1?"left":"right":d>=135&&225>=d?e.options.rtl===!1?"right":"left":e.options.verticalSwiping===!0?d>=35&&135>=d?"down":"up":"vertical"},b.prototype.swipeEnd=function(a){var c,d,b=this;if(b.dragging=!1,b.interrupted=!1,b.shouldClick=b.touchObject.swipeLength>10?!1:!0,void 0===b.touchObject.curX)return!1;if(b.touchObject.edgeHit===!0&&b.$slider.trigger("edge",[b,b.swipeDirection()]),b.touchObject.swipeLength>=b.touchObject.minSwipe){switch(d=b.swipeDirection()){case"left":case"down":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide+b.getSlideCount()):b.currentSlide+b.getSlideCount(),b.currentDirection=0;break;case"right":case"up":c=b.options.swipeToSlide?b.checkNavigable(b.currentSlide-b.getSlideCount()):b.currentSlide-b.getSlideCount(),b.currentDirection=1}"vertical"!=d&&(b.slideHandler(c),b.touchObject={},b.$slider.trigger("swipe",[b,d]))}else b.touchObject.startX!==b.touchObject.curX&&(b.slideHandler(b.currentSlide),b.touchObject={})},b.prototype.swipeHandler=function(a){var b=this;if(!(b.options.swipe===!1||"ontouchend"in document&&b.options.swipe===!1||b.options.draggable===!1&&-1!==a.type.indexOf("mouse")))switch(b.touchObject.fingerCount=a.originalEvent&&void 0!==a.originalEvent.touches?a.originalEvent.touches.length:1,b.touchObject.minSwipe=b.listWidth/b.options.touchThreshold,b.options.verticalSwiping===!0&&(b.touchObject.minSwipe=b.listHeight/b.options.touchThreshold),a.data.action){case"start":b.swipeStart(a);break;case"move":b.swipeMove(a);break;case"end":b.swipeEnd(a)}},b.prototype.swipeMove=function(a){var d,e,f,g,h,b=this;return h=void 0!==a.originalEvent?a.originalEvent.touches:null,!b.dragging||h&&1!==h.length?!1:(d=b.getLeft(b.currentSlide),b.touchObject.curX=void 0!==h?h[0].pageX:a.clientX,b.touchObject.curY=void 0!==h?h[0].pageY:a.clientY,b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curX-b.touchObject.startX,2))),b.options.verticalSwiping===!0&&(b.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(b.touchObject.curY-b.touchObject.startY,2)))),e=b.swipeDirection(),"vertical"!==e?(void 0!==a.originalEvent&&b.touchObject.swipeLength>4&&a.preventDefault(),g=(b.options.rtl===!1?1:-1)*(b.touchObject.curX>b.touchObject.startX?1:-1),b.options.verticalSwiping===!0&&(g=b.touchObject.curY>b.touchObject.startY?1:-1),f=b.touchObject.swipeLength,b.touchObject.edgeHit=!1,b.options.infinite===!1&&(0===b.currentSlide&&"right"===e||b.currentSlide>=b.getDotCount()&&"left"===e)&&(f=b.touchObject.swipeLength*b.options.edgeFriction,b.touchObject.edgeHit=!0),b.options.vertical===!1?b.swipeLeft=d+f*g:b.swipeLeft=d+f*(b.$list.height()/b.listWidth)*g,b.options.verticalSwiping===!0&&(b.swipeLeft=d+f*g),b.options.fade===!0||b.options.touchMove===!1?!1:b.animating===!0?(b.swipeLeft=null,!1):void b.setCSS(b.swipeLeft)):void 0)},b.prototype.swipeStart=function(a){var c,b=this;return b.interrupted=!0,1!==b.touchObject.fingerCount||b.slideCount<=b.options.slidesToShow?(b.touchObject={},!1):(void 0!==a.originalEvent&&void 0!==a.originalEvent.touches&&(c=a.originalEvent.touches[0]),b.touchObject.startX=b.touchObject.curX=void 0!==c?c.pageX:a.clientX,b.touchObject.startY=b.touchObject.curY=void 0!==c?c.pageY:a.clientY,void(b.dragging=!0))},b.prototype.unfilterSlides=b.prototype.slickUnfilter=function(){var a=this;null!==a.$slidesCache&&(a.unload(),a.$slideTrack.children(this.options.slide).detach(),a.$slidesCache.appendTo(a.$slideTrack),a.reinit())},b.prototype.unload=function(){var b=this;a(".slick-cloned",b.$slider).remove(),b.$dots&&b.$dots.remove(),b.$prevArrow&&b.htmlExpr.test(b.options.prevArrow)&&b.$prevArrow.remove(),b.$nextArrow&&b.htmlExpr.test(b.options.nextArrow)&&b.$nextArrow.remove(),b.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},b.prototype.unslick=function(a){var b=this;b.$slider.trigger("unslick",[b,a]),b.destroy()},b.prototype.updateArrows=function(){var b,a=this;b=Math.floor(a.options.slidesToShow/2),a.options.arrows===!0&&a.slideCount>a.options.slidesToShow&&!a.options.infinite&&(a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===a.currentSlide?(a.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-a.options.slidesToShow&&a.options.centerMode===!1?(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):a.currentSlide>=a.slideCount-1&&a.options.centerMode===!0&&(a.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),a.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},b.prototype.updateDots=function(){var a=this;null!==a.$dots&&(a.$dots.find("li").removeClass("slick-active").attr("aria-hidden","true"),a.$dots.find("li").eq(Math.floor(a.currentSlide/a.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden","false"))},b.prototype.visibility=function(){var a=this;a.options.autoplay&&(document[a.hidden]?a.interrupted=!0:a.interrupted=!1)},a.fn.slick=function(){var f,g,a=this,c=arguments[0],d=Array.prototype.slice.call(arguments,1),e=a.length;for(f=0;e>f;f++)if("object"==typeof c||"undefined"==typeof c?a[f].slick=new b(a[f],c):g=a[f].slick[c].apply(a[f].slick,d),"undefined"!=typeof g)return g;return a}});

/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console, a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&& (f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt; d=d.wrap("<span></span>");var h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!", a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
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
var _0xb10b=['#qtt','message','qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','SkuSellersInformation','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','ngnyvncrgfubc%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','unavailable','.qd_smart_stock_available_auto','qdAjax','qdAjaxQueue','extend','url','opts','push','success','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','clearQueueDelay','jqXHR','undefined','ajax','readyState','data','textStatus','version','2.1','/produto/sku/','function','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','info','apply','warn','qd-ssa-sku-no-selected','qd-ssa-sku-selected','AvailableQuantity','attr','data-qd-ssa-qtt','find','[data-qd-ssa-text]','hide','addClass','qd-ssa-hide','removeClass','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','html','replace'];(function(_0x28ab1a,_0x41638e){var _0x2db742=function(_0x5f5d8f){while(--_0x5f5d8f){_0x28ab1a['push'](_0x28ab1a['shift']());}};_0x2db742(++_0x41638e);}(_0xb10b,0x12a));var _0xbb10=function(_0x248dc8,_0x10c027){_0x248dc8=_0x248dc8-0x0;var _0x15aaee=_0xb10b[_0x248dc8];return _0x15aaee;};(function(_0x13ce8d){if('function'!==typeof _0x13ce8d[_0xbb10('0x0')]){var _0x35bc5f={};_0x13ce8d[_0xbb10('0x1')]=_0x35bc5f;_0x13ce8d['qdAjax']=function(_0x4541ae){var _0x9bbed=_0x13ce8d[_0xbb10('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x4541ae);var _0x22320e=escape(encodeURIComponent(_0x9bbed[_0xbb10('0x3')]));_0x35bc5f[_0x22320e]=_0x35bc5f[_0x22320e]||{};_0x35bc5f[_0x22320e][_0xbb10('0x4')]=_0x35bc5f[_0x22320e]['opts']||[];_0x35bc5f[_0x22320e][_0xbb10('0x4')][_0xbb10('0x5')]({'success':function(_0x513741,_0x1b9e94,_0x3fb675){_0x9bbed[_0xbb10('0x6')][_0xbb10('0x7')](this,_0x513741,_0x1b9e94,_0x3fb675);},'error':function(_0x2353ef,_0x1ce33e,_0x229887){_0x9bbed[_0xbb10('0x8')]['call'](this,_0x2353ef,_0x1ce33e,_0x229887);},'complete':function(_0x4e47f8,_0x20bd61){_0x9bbed[_0xbb10('0x9')][_0xbb10('0x7')](this,_0x4e47f8,_0x20bd61);}});_0x35bc5f[_0x22320e]['parameters']=_0x35bc5f[_0x22320e][_0xbb10('0xa')]||{'success':{},'error':{},'complete':{}};_0x35bc5f[_0x22320e]['callbackFns']=_0x35bc5f[_0x22320e][_0xbb10('0xb')]||{};_0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xc')]=_0xbb10('0xd')===typeof _0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xc')]?_0x35bc5f[_0x22320e]['callbackFns'][_0xbb10('0xc')]:!0x1;_0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xe')]=_0xbb10('0xd')===typeof _0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xe')]?_0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xe')]:!0x1;_0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xf')]='boolean'===typeof _0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xf')]?_0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xf')]:!0x1;_0x4541ae=_0x13ce8d[_0xbb10('0x2')]({},_0x9bbed,{'success':function(_0x1682a4,_0x575cca,_0x30efc6){_0x35bc5f[_0x22320e][_0xbb10('0xa')][_0xbb10('0x6')]={'data':_0x1682a4,'textStatus':_0x575cca,'jqXHR':_0x30efc6};_0x35bc5f[_0x22320e]['callbackFns'][_0xbb10('0xc')]=!0x0;for(var _0x19f48d in _0x35bc5f[_0x22320e][_0xbb10('0x4')])_0xbb10('0x10')===typeof _0x35bc5f[_0x22320e][_0xbb10('0x4')][_0x19f48d]&&(_0x35bc5f[_0x22320e][_0xbb10('0x4')][_0x19f48d]['success'][_0xbb10('0x7')](this,_0x1682a4,_0x575cca,_0x30efc6),_0x35bc5f[_0x22320e][_0xbb10('0x4')][_0x19f48d]['success']=function(){});},'error':function(_0x4c4b0d,_0x8e2b97,_0x311abe){_0x35bc5f[_0x22320e][_0xbb10('0xa')][_0xbb10('0x8')]={'errorThrown':_0x311abe,'textStatus':_0x8e2b97,'jqXHR':_0x4c4b0d};_0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xe')]=!0x0;for(var _0x407cb4 in _0x35bc5f[_0x22320e][_0xbb10('0x4')])_0xbb10('0x10')===typeof _0x35bc5f[_0x22320e][_0xbb10('0x4')][_0x407cb4]&&(_0x35bc5f[_0x22320e][_0xbb10('0x4')][_0x407cb4][_0xbb10('0x8')]['call'](this,_0x4c4b0d,_0x8e2b97,_0x311abe),_0x35bc5f[_0x22320e]['opts'][_0x407cb4]['error']=function(){});},'complete':function(_0xc93a04,_0x3c5ae7){_0x35bc5f[_0x22320e][_0xbb10('0xa')]['complete']={'textStatus':_0x3c5ae7,'jqXHR':_0xc93a04};_0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xf')]=!0x0;for(var _0x6ed43b in _0x35bc5f[_0x22320e][_0xbb10('0x4')])_0xbb10('0x10')===typeof _0x35bc5f[_0x22320e][_0xbb10('0x4')][_0x6ed43b]&&(_0x35bc5f[_0x22320e][_0xbb10('0x4')][_0x6ed43b]['complete'][_0xbb10('0x7')](this,_0xc93a04,_0x3c5ae7),_0x35bc5f[_0x22320e][_0xbb10('0x4')][_0x6ed43b][_0xbb10('0x9')]=function(){});isNaN(parseInt(_0x9bbed[_0xbb10('0x11')]))||setTimeout(function(){_0x35bc5f[_0x22320e][_0xbb10('0x12')]=void 0x0;_0x35bc5f[_0x22320e][_0xbb10('0x4')]=void 0x0;_0x35bc5f[_0x22320e]['parameters']=void 0x0;_0x35bc5f[_0x22320e][_0xbb10('0xb')]=void 0x0;},_0x9bbed['clearQueueDelay']);}});_0xbb10('0x13')===typeof _0x35bc5f[_0x22320e]['jqXHR']?_0x35bc5f[_0x22320e][_0xbb10('0x12')]=_0x13ce8d[_0xbb10('0x14')](_0x4541ae):_0x35bc5f[_0x22320e][_0xbb10('0x12')]&&_0x35bc5f[_0x22320e]['jqXHR']['readyState']&&0x4==_0x35bc5f[_0x22320e][_0xbb10('0x12')][_0xbb10('0x15')]&&(_0x35bc5f[_0x22320e]['callbackFns'][_0xbb10('0xc')]&&_0x4541ae[_0xbb10('0x6')](_0x35bc5f[_0x22320e][_0xbb10('0xa')][_0xbb10('0x6')][_0xbb10('0x16')],_0x35bc5f[_0x22320e][_0xbb10('0xa')][_0xbb10('0x6')]['textStatus'],_0x35bc5f[_0x22320e][_0xbb10('0xa')][_0xbb10('0x6')][_0xbb10('0x12')]),_0x35bc5f[_0x22320e][_0xbb10('0xb')][_0xbb10('0xe')]&&_0x4541ae[_0xbb10('0x8')](_0x35bc5f[_0x22320e][_0xbb10('0xa')][_0xbb10('0x8')][_0xbb10('0x12')],_0x35bc5f[_0x22320e]['parameters'][_0xbb10('0x8')][_0xbb10('0x17')],_0x35bc5f[_0x22320e][_0xbb10('0xa')][_0xbb10('0x8')]['errorThrown']),_0x35bc5f[_0x22320e][_0xbb10('0xb')]['completePopulated']&&_0x4541ae['complete'](_0x35bc5f[_0x22320e][_0xbb10('0xa')][_0xbb10('0x9')][_0xbb10('0x12')],_0x35bc5f[_0x22320e][_0xbb10('0xa')][_0xbb10('0x9')][_0xbb10('0x17')]));};_0x13ce8d['qdAjax'][_0xbb10('0x18')]=_0xbb10('0x19');}}(jQuery));(function(_0x52de31){function _0x5e3fbd(_0x5cd55f,_0x31bee3){_0x3c0cd7[_0xbb10('0x0')]({'url':_0xbb10('0x1a')+_0x5cd55f,'clearQueueDelay':null,'success':_0x31bee3,'error':function(){_0x4d1a83('Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!');}});}var _0x3c0cd7=jQuery;if(_0xbb10('0x1b')!==typeof _0x3c0cd7['fn'][_0xbb10('0x1c')]){var _0x4d1a83=function(_0x1dcd38,_0x446f49){if('object'===typeof console){var _0xd238e9;_0xbb10('0x10')===typeof _0x1dcd38?(_0x1dcd38['unshift'](_0xbb10('0x1d')),_0xd238e9=_0x1dcd38):_0xd238e9=[_0xbb10('0x1d')+_0x1dcd38];_0xbb10('0x13')===typeof _0x446f49||_0xbb10('0x1e')!==_0x446f49[_0xbb10('0x1f')]()&&_0xbb10('0x20')!==_0x446f49['toLowerCase']()?_0xbb10('0x13')!==typeof _0x446f49&&_0xbb10('0x21')===_0x446f49[_0xbb10('0x1f')]()?console[_0xbb10('0x21')]['apply'](console,_0xd238e9):console[_0xbb10('0x8')][_0xbb10('0x22')](console,_0xd238e9):console[_0xbb10('0x23')][_0xbb10('0x22')](console,_0xd238e9);}},_0x17b6c5={},_0x12238a=function(_0x5e2cfa,_0x351484){function _0x202c60(_0x54ac18){try{_0x5e2cfa['removeClass'](_0xbb10('0x24'))['addClass'](_0xbb10('0x25'));var _0x180933=_0x54ac18[0x0]['SkuSellersInformation'][0x0][_0xbb10('0x26')];_0x5e2cfa[_0xbb10('0x27')](_0xbb10('0x28'),_0x180933);_0x5e2cfa['each'](function(){var _0x5e2cfa=_0x3c0cd7(this)[_0xbb10('0x29')](_0xbb10('0x2a'));if(0x1>_0x180933)return _0x5e2cfa[_0xbb10('0x2b')]()[_0xbb10('0x2c')](_0xbb10('0x2d'))[_0xbb10('0x2e')](_0xbb10('0x2f'));var _0x54ac18=_0x5e2cfa[_0xbb10('0x30')](_0xbb10('0x31')+_0x180933+'\x22]');_0x54ac18=_0x54ac18[_0xbb10('0x32')]?_0x54ac18:_0x5e2cfa['filter'](_0xbb10('0x33'));_0x5e2cfa[_0xbb10('0x2b')]()['addClass'](_0xbb10('0x2d'))[_0xbb10('0x2e')](_0xbb10('0x2f'));_0x54ac18[_0xbb10('0x34')]((_0x54ac18[_0xbb10('0x34')]()||'')[_0xbb10('0x35')](_0xbb10('0x36'),_0x180933));_0x54ac18['show']()['addClass'](_0xbb10('0x2f'))[_0xbb10('0x2e')](_0xbb10('0x2d'));});}catch(_0x57d2c0){_0x4d1a83(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x57d2c0[_0xbb10('0x37')]]);}}if(_0x5e2cfa[_0xbb10('0x32')]){_0x5e2cfa[_0xbb10('0x2c')](_0xbb10('0x38'));_0x5e2cfa[_0xbb10('0x2c')](_0xbb10('0x24'));try{_0x5e2cfa[_0xbb10('0x2c')](_0xbb10('0x39')+vtxctx[_0xbb10('0x3a')][_0xbb10('0x3b')](';')['length']);}catch(_0x5eafac){_0x4d1a83([_0xbb10('0x3c'),_0x5eafac[_0xbb10('0x37')]]);}_0x3c0cd7(window)['on'](_0xbb10('0x3d'),function(_0xb014b0,_0x36aa7d,_0x440f9e){try{_0x5e3fbd(_0x440f9e[_0xbb10('0x3e')],function(_0x445870){_0x202c60(_0x445870);0x1===vtxctx[_0xbb10('0x3a')][_0xbb10('0x3b')](';')[_0xbb10('0x32')]&&0x0==_0x445870[0x0][_0xbb10('0x3f')][0x0][_0xbb10('0x26')]&&_0x3c0cd7(window)[_0xbb10('0x40')](_0xbb10('0x41'));});}catch(_0x547a7a){_0x4d1a83([_0xbb10('0x42'),_0x547a7a['message']]);}});_0x3c0cd7(window)[_0xbb10('0x43')](_0xbb10('0x44'));_0x3c0cd7(window)['on'](_0xbb10('0x41'),function(){_0x5e2cfa[_0xbb10('0x2c')](_0xbb10('0x45'))[_0xbb10('0x2b')]();});}};_0x52de31=function(_0x2e3326){var _0x44eec1={'a':_0xbb10('0x46')};return function(_0x3d71e){var _0x44a056=function(_0x1c2dce){return _0x1c2dce;};var _0x1d49e1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3d71e=_0x3d71e['d'+_0x1d49e1[0x10]+'c'+_0x1d49e1[0x11]+'m'+_0x44a056(_0x1d49e1[0x1])+'n'+_0x1d49e1[0xd]]['l'+_0x1d49e1[0x12]+'c'+_0x1d49e1[0x0]+'ti'+_0x44a056('o')+'n'];var _0x3d7e17=function(_0x4475e1){return escape(encodeURIComponent(_0x4475e1['replace'](/\./g,'¨')[_0xbb10('0x35')](/[a-zA-Z]/g,function(_0x466eb7){return String[_0xbb10('0x47')](('Z'>=_0x466eb7?0x5a:0x7a)>=(_0x466eb7=_0x466eb7[_0xbb10('0x48')](0x0)+0xd)?_0x466eb7:_0x466eb7-0x1a);})));};var _0xbffa3c=_0x3d7e17(_0x3d71e[[_0x1d49e1[0x9],_0x44a056('o'),_0x1d49e1[0xc],_0x1d49e1[_0x44a056(0xd)]][_0xbb10('0x49')]('')]);_0x3d7e17=_0x3d7e17((window[['js',_0x44a056('no'),'m',_0x1d49e1[0x1],_0x1d49e1[0x4]['toUpperCase'](),_0xbb10('0x4a')][_0xbb10('0x49')]('')]||_0xbb10('0x4b'))+['.v',_0x1d49e1[0xd],'e',_0x44a056('x'),'co',_0x44a056('mm'),_0xbb10('0x4c'),_0x1d49e1[0x1],'.c',_0x44a056('o'),'m.',_0x1d49e1[0x13],'r'][_0xbb10('0x49')](''));for(var _0x22de7f in _0x44eec1){if(_0x3d7e17===_0x22de7f+_0x44eec1[_0x22de7f]||_0xbffa3c===_0x22de7f+_0x44eec1[_0x22de7f]){var _0x175872='tr'+_0x1d49e1[0x11]+'e';break;}_0x175872='f'+_0x1d49e1[0x0]+'ls'+_0x44a056(_0x1d49e1[0x1])+'';}_0x44a056=!0x1;-0x1<_0x3d71e[[_0x1d49e1[0xc],'e',_0x1d49e1[0x0],'rc',_0x1d49e1[0x9]][_0xbb10('0x49')]('')][_0xbb10('0x4d')](_0xbb10('0x4e'))&&(_0x44a056=!0x0);return[_0x175872,_0x44a056];}(_0x2e3326);}(window);if(!eval(_0x52de31[0x0]))return _0x52de31[0x1]?_0x4d1a83(_0xbb10('0x4f')):!0x1;_0x3c0cd7['fn'][_0xbb10('0x1c')]=function(_0x16932f){var _0x4e7fac=_0x3c0cd7(this);_0x16932f=_0x3c0cd7['extend'](!0x0,{},_0x17b6c5,_0x16932f);_0x4e7fac[_0xbb10('0x50')]=new _0x12238a(_0x4e7fac,_0x16932f);try{_0xbb10('0x10')===typeof _0x3c0cd7['fn'][_0xbb10('0x1c')][_0xbb10('0x51')]&&_0x3c0cd7(window)['trigger']('QuatroDigital.ssa.skuSelected',[_0x3c0cd7['fn'][_0xbb10('0x1c')][_0xbb10('0x51')][_0xbb10('0x52')],_0x3c0cd7['fn'][_0xbb10('0x1c')][_0xbb10('0x51')][_0xbb10('0x3e')]]);}catch(_0x45c0dc){_0x4d1a83(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x45c0dc[_0xbb10('0x37')]]);}_0x3c0cd7['fn'][_0xbb10('0x1c')]['unavailable']&&_0x3c0cd7(window)['trigger']('QuatroDigital.ssa.prodUnavailable');return _0x4e7fac;};_0x3c0cd7(window)['on'](_0xbb10('0x44'),function(_0x31c727,_0x155dc5,_0x5bd1c0){try{_0x3c0cd7['fn']['QD_smartStockAvailable']['initialSkuSelected']={'prod':_0x155dc5,'sku':_0x5bd1c0},_0x3c0cd7(this)[_0xbb10('0x43')](_0x31c727);}catch(_0x249b33){_0x4d1a83([_0xbb10('0x53'),_0x249b33['message']]);}});_0x3c0cd7(window)['on'](_0xbb10('0x54'),function(_0x13131c,_0x5a6538,_0x4a560c){try{for(var _0x27d7b9=_0x4a560c[_0xbb10('0x32')],_0x308896=_0x5a6538=0x0;_0x308896<_0x27d7b9&&!_0x4a560c[_0x308896][_0xbb10('0x55')];_0x308896++)_0x5a6538+=0x1;_0x27d7b9<=_0x5a6538&&(_0x3c0cd7['fn']['QD_smartStockAvailable'][_0xbb10('0x56')]=!0x0);_0x3c0cd7(this)[_0xbb10('0x43')](_0x13131c);}catch(_0xa7179d){_0x4d1a83(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0xa7179d[_0xbb10('0x37')]]);}});_0x3c0cd7(function(){_0x3c0cd7(_0xbb10('0x57'))[_0xbb10('0x1c')]();});}}(window));
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
var _0x2eeb=['qd-am-li-','addClass','qd-am-first','last','qd-am-last','ngnyvncrgfubc%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','ite','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','html','each','img[alt=\x27','attr','data-qdam-value','.box-banner','insertBefore','qd-am-content-loaded','text','trim','[class*=\x27colunas\x27]','clone','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','first','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','getParent','function','QD_amazingMenu','object','undefined','warn','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','info','apply','error','join','qdAmAddNdx'];(function(_0x2f9c1d,_0x4d09cd){var _0x28f58c=function(_0x29717e){while(--_0x29717e){_0x2f9c1d['push'](_0x2f9c1d['shift']());}};_0x28f58c(++_0x4d09cd);}(_0x2eeb,0x1ea));var _0xb2ee=function(_0x420b0c,_0xbb4ea3){_0x420b0c=_0x420b0c-0x0;var _0x3a0f8b=_0x2eeb[_0x420b0c];return _0x3a0f8b;};(function(_0x592de3){_0x592de3['fn'][_0xb2ee('0x0')]=_0x592de3['fn']['closest'];}(jQuery));(function(_0x53ec79){var _0x59d9d2;var _0xf73d46=jQuery;if(_0xb2ee('0x1')!==typeof _0xf73d46['fn'][_0xb2ee('0x2')]){var _0xc2e9f={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x3a5076=function(_0x15a821,_0x5d130f){if(_0xb2ee('0x3')===typeof console&&_0xb2ee('0x4')!==typeof console['error']&&_0xb2ee('0x4')!==typeof console['info']&&_0xb2ee('0x4')!==typeof console[_0xb2ee('0x5')]){var _0xa8676b;_0xb2ee('0x3')===typeof _0x15a821?(_0x15a821['unshift'](_0xb2ee('0x6')),_0xa8676b=_0x15a821):_0xa8676b=[_0xb2ee('0x6')+_0x15a821];if(_0xb2ee('0x4')===typeof _0x5d130f||_0xb2ee('0x7')!==_0x5d130f[_0xb2ee('0x8')]()&&'aviso'!==_0x5d130f['toLowerCase']())if(_0xb2ee('0x4')!==typeof _0x5d130f&&_0xb2ee('0x9')===_0x5d130f[_0xb2ee('0x8')]())try{console[_0xb2ee('0x9')][_0xb2ee('0xa')](console,_0xa8676b);}catch(_0x2e78fd){try{console[_0xb2ee('0x9')](_0xa8676b['join']('\x0a'));}catch(_0x636f11){}}else try{console[_0xb2ee('0xb')][_0xb2ee('0xa')](console,_0xa8676b);}catch(_0x2733ee){try{console[_0xb2ee('0xb')](_0xa8676b[_0xb2ee('0xc')]('\x0a'));}catch(_0x1011cf){}}else try{console[_0xb2ee('0x5')][_0xb2ee('0xa')](console,_0xa8676b);}catch(_0x4f689f){try{console['warn'](_0xa8676b['join']('\x0a'));}catch(_0x5dc15d){}}}};_0xf73d46['fn'][_0xb2ee('0xd')]=function(){var _0x116cd9=_0xf73d46(this);_0x116cd9['each'](function(_0x418aa3){_0xf73d46(this)['addClass'](_0xb2ee('0xe')+_0x418aa3);});_0x116cd9['first']()[_0xb2ee('0xf')](_0xb2ee('0x10'));_0x116cd9[_0xb2ee('0x11')]()[_0xb2ee('0xf')](_0xb2ee('0x12'));return _0x116cd9;};_0xf73d46['fn'][_0xb2ee('0x2')]=function(){};_0x53ec79=function(_0x769d35){var _0x115b06={'a':_0xb2ee('0x13')};return function(_0x40a51b){var _0x3db42a=function(_0x18d82b){return _0x18d82b;};var _0x5ac5db=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x40a51b=_0x40a51b['d'+_0x5ac5db[0x10]+'c'+_0x5ac5db[0x11]+'m'+_0x3db42a(_0x5ac5db[0x1])+'n'+_0x5ac5db[0xd]]['l'+_0x5ac5db[0x12]+'c'+_0x5ac5db[0x0]+'ti'+_0x3db42a('o')+'n'];var _0x89edfb=function(_0x4a3dc5){return escape(encodeURIComponent(_0x4a3dc5[_0xb2ee('0x14')](/\./g,'¨')[_0xb2ee('0x14')](/[a-zA-Z]/g,function(_0x25f043){return String['fromCharCode'](('Z'>=_0x25f043?0x5a:0x7a)>=(_0x25f043=_0x25f043[_0xb2ee('0x15')](0x0)+0xd)?_0x25f043:_0x25f043-0x1a);})));};var _0x42ffa9=_0x89edfb(_0x40a51b[[_0x5ac5db[0x9],_0x3db42a('o'),_0x5ac5db[0xc],_0x5ac5db[_0x3db42a(0xd)]][_0xb2ee('0xc')]('')]);_0x89edfb=_0x89edfb((window[['js',_0x3db42a('no'),'m',_0x5ac5db[0x1],_0x5ac5db[0x4][_0xb2ee('0x16')](),_0xb2ee('0x17')]['join']('')]||'---')+['.v',_0x5ac5db[0xd],'e',_0x3db42a('x'),'co',_0x3db42a('mm'),'erc',_0x5ac5db[0x1],'.c',_0x3db42a('o'),'m.',_0x5ac5db[0x13],'r']['join'](''));for(var _0x30e944 in _0x115b06){if(_0x89edfb===_0x30e944+_0x115b06[_0x30e944]||_0x42ffa9===_0x30e944+_0x115b06[_0x30e944]){var _0x373abc='tr'+_0x5ac5db[0x11]+'e';break;}_0x373abc='f'+_0x5ac5db[0x0]+'ls'+_0x3db42a(_0x5ac5db[0x1])+'';}_0x3db42a=!0x1;-0x1<_0x40a51b[[_0x5ac5db[0xc],'e',_0x5ac5db[0x0],'rc',_0x5ac5db[0x9]]['join']('')][_0xb2ee('0x18')](_0xb2ee('0x19'))&&(_0x3db42a=!0x0);return[_0x373abc,_0x3db42a];}(_0x769d35);}(window);if(!eval(_0x53ec79[0x0]))return _0x53ec79[0x1]?_0x3a5076(_0xb2ee('0x1a')):!0x1;var _0x3b94bb=function(_0xbdf703){var _0xa4defc=_0xbdf703[_0xb2ee('0x1b')](_0xb2ee('0x1c'));var _0x3e39d2=_0xa4defc[_0xb2ee('0x1d')](_0xb2ee('0x1e'));var _0x2742fa=_0xa4defc[_0xb2ee('0x1d')]('.qd-am-collection');if(_0x3e39d2[_0xb2ee('0x1f')]||_0x2742fa['length'])_0x3e39d2[_0xb2ee('0x20')]()['addClass'](_0xb2ee('0x21')),_0x2742fa['parent']()['addClass'](_0xb2ee('0x22')),_0xf73d46['qdAjax']({'url':_0x59d9d2[_0xb2ee('0x23')],'dataType':_0xb2ee('0x24'),'success':function(_0x2b56c0){var _0x2dfbf5=_0xf73d46(_0x2b56c0);_0x3e39d2[_0xb2ee('0x25')](function(){var _0x2b56c0=_0xf73d46(this);var _0x28f5ed=_0x2dfbf5[_0xb2ee('0x1b')](_0xb2ee('0x26')+_0x2b56c0[_0xb2ee('0x27')](_0xb2ee('0x28'))+'\x27]');_0x28f5ed[_0xb2ee('0x1f')]&&(_0x28f5ed['each'](function(){_0xf73d46(this)[_0xb2ee('0x0')](_0xb2ee('0x29'))['clone']()[_0xb2ee('0x2a')](_0x2b56c0);}),_0x2b56c0['hide']());})[_0xb2ee('0xf')](_0xb2ee('0x2b'));_0x2742fa[_0xb2ee('0x25')](function(){var _0x2b56c0={};var _0x46b840=_0xf73d46(this);_0x2dfbf5[_0xb2ee('0x1b')]('h2')[_0xb2ee('0x25')](function(){if(_0xf73d46(this)[_0xb2ee('0x2c')]()['trim']()[_0xb2ee('0x8')]()==_0x46b840[_0xb2ee('0x27')](_0xb2ee('0x28'))[_0xb2ee('0x2d')]()[_0xb2ee('0x8')]())return _0x2b56c0=_0xf73d46(this),!0x1;});_0x2b56c0[_0xb2ee('0x1f')]&&(_0x2b56c0[_0xb2ee('0x25')](function(){_0xf73d46(this)[_0xb2ee('0x0')](_0xb2ee('0x2e'))[_0xb2ee('0x2f')]()[_0xb2ee('0x2a')](_0x46b840);}),_0x46b840[_0xb2ee('0x30')]());})['addClass']('qd-am-content-loaded');},'error':function(){_0x3a5076(_0xb2ee('0x31')+_0x59d9d2[_0xb2ee('0x23')]+_0xb2ee('0x32'));},'complete':function(){_0x59d9d2['ajaxCallback'][_0xb2ee('0x33')](this);_0xf73d46(window)[_0xb2ee('0x34')]('QuatroDigital.am.ajaxCallback',_0xbdf703);},'clearQueueDelay':0xbb8});};_0xf73d46[_0xb2ee('0x2')]=function(_0x5d6872){var _0x5af3ba=_0x5d6872['find']('ul[itemscope]')[_0xb2ee('0x25')](function(){var _0x310e70=_0xf73d46(this);if(!_0x310e70[_0xb2ee('0x1f')])return _0x3a5076([_0xb2ee('0x35'),_0x5d6872],'alerta');_0x310e70[_0xb2ee('0x1b')](_0xb2ee('0x36'))[_0xb2ee('0x20')]()[_0xb2ee('0xf')](_0xb2ee('0x37'));_0x310e70[_0xb2ee('0x1b')]('li')['each'](function(){var _0x17b34a=_0xf73d46(this);var _0x50eee5=_0x17b34a[_0xb2ee('0x38')](_0xb2ee('0x39'));_0x50eee5[_0xb2ee('0x1f')]&&_0x17b34a[_0xb2ee('0xf')](_0xb2ee('0x3a')+_0x50eee5[_0xb2ee('0x3b')]()[_0xb2ee('0x2c')]()['trim']()[_0xb2ee('0x3c')]()[_0xb2ee('0x14')](/\./g,'')[_0xb2ee('0x14')](/\s/g,'-')[_0xb2ee('0x8')]());});var _0x148a66=_0x310e70[_0xb2ee('0x1b')](_0xb2ee('0x3d'))[_0xb2ee('0xd')]();_0x310e70['addClass'](_0xb2ee('0x3e'));_0x148a66=_0x148a66[_0xb2ee('0x1b')](_0xb2ee('0x3f'));_0x148a66[_0xb2ee('0x25')](function(){var _0x52b869=_0xf73d46(this);_0x52b869[_0xb2ee('0x1b')](_0xb2ee('0x3d'))[_0xb2ee('0xd')]()[_0xb2ee('0xf')]('qd-am-column');_0x52b869[_0xb2ee('0xf')]('qd-am-dropdown-menu');_0x52b869[_0xb2ee('0x20')]()[_0xb2ee('0xf')](_0xb2ee('0x40'));});_0x148a66[_0xb2ee('0xf')](_0xb2ee('0x40'));var _0x538100=0x0,_0x53ec79=function(_0x2d1702){_0x538100+=0x1;_0x2d1702=_0x2d1702[_0xb2ee('0x38')]('li')[_0xb2ee('0x38')]('*');_0x2d1702[_0xb2ee('0x1f')]&&(_0x2d1702[_0xb2ee('0xf')](_0xb2ee('0x41')+_0x538100),_0x53ec79(_0x2d1702));};_0x53ec79(_0x310e70);_0x310e70[_0xb2ee('0x42')](_0x310e70[_0xb2ee('0x1b')]('ul'))[_0xb2ee('0x25')](function(){var _0x3abb80=_0xf73d46(this);_0x3abb80['addClass'](_0xb2ee('0x43')+_0x3abb80[_0xb2ee('0x38')]('li')['length']+_0xb2ee('0x44'));});});_0x3b94bb(_0x5af3ba);_0x59d9d2['callback'][_0xb2ee('0x33')](this);_0xf73d46(window)['trigger'](_0xb2ee('0x45'),_0x5d6872);};_0xf73d46['fn'][_0xb2ee('0x2')]=function(_0x29c7fa){var _0xf9249d=_0xf73d46(this);if(!_0xf9249d[_0xb2ee('0x1f')])return _0xf9249d;_0x59d9d2=_0xf73d46[_0xb2ee('0x46')]({},_0xc2e9f,_0x29c7fa);_0xf9249d['exec']=new _0xf73d46[(_0xb2ee('0x2'))](_0xf73d46(this));return _0xf9249d;};_0xf73d46(function(){_0xf73d46(_0xb2ee('0x47'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0xca4b=['buyButtonClicked','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','prepend','productId','prod_','ajaxStop','.qdDdcContainer','QD_smartCart','extend','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','undefined','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','error','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','warn','unshift','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','ngnyvncrgfubc%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','ite','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','name','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','body','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','scrollCart','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','each','call','.qd-ddc-infoTotalValue','total','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodName','sellingPrice','Grátis','meta[name=currency]','attr','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','getParent','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','filter','lastSku','parent','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','done','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Oooops!\x20','allowRecalculate'];(function(_0x5c7312,_0x4b0096){var _0x5d5705=function(_0x2edf62){while(--_0x2edf62){_0x5c7312['push'](_0x5c7312['shift']());}};_0x5d5705(++_0x4b0096);}(_0xca4b,0x1d0));var _0xbca4=function(_0x206738,_0x2615cd){_0x206738=_0x206738-0x0;var _0x34c004=_0xca4b[_0x206738];return _0x34c004;};(function(_0x125438){_0x125438['fn']['getParent']=_0x125438['fn'][_0xbca4('0x0')];}(jQuery));function qd_number_format(_0x564b50,_0x4b37a3,_0x5018d7,_0x43b935){_0x564b50=(_0x564b50+'')[_0xbca4('0x1')](/[^0-9+\-Ee.]/g,'');_0x564b50=isFinite(+_0x564b50)?+_0x564b50:0x0;_0x4b37a3=isFinite(+_0x4b37a3)?Math['abs'](_0x4b37a3):0x0;_0x43b935=_0xbca4('0x2')===typeof _0x43b935?',':_0x43b935;_0x5018d7='undefined'===typeof _0x5018d7?'.':_0x5018d7;var _0x299f49='',_0x299f49=function(_0x686275,_0x47ebf0){var _0x4b37a3=Math['pow'](0xa,_0x47ebf0);return''+(Math[_0xbca4('0x3')](_0x686275*_0x4b37a3)/_0x4b37a3)[_0xbca4('0x4')](_0x47ebf0);},_0x299f49=(_0x4b37a3?_0x299f49(_0x564b50,_0x4b37a3):''+Math['round'](_0x564b50))[_0xbca4('0x5')]('.');0x3<_0x299f49[0x0][_0xbca4('0x6')]&&(_0x299f49[0x0]=_0x299f49[0x0][_0xbca4('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x43b935));(_0x299f49[0x1]||'')[_0xbca4('0x6')]<_0x4b37a3&&(_0x299f49[0x1]=_0x299f49[0x1]||'',_0x299f49[0x1]+=Array(_0x4b37a3-_0x299f49[0x1]['length']+0x1)[_0xbca4('0x7')]('0'));return _0x299f49[_0xbca4('0x7')](_0x5018d7);};!function(){'use strict';try{window[_0xbca4('0x8')]=window[_0xbca4('0x8')]||{},window[_0xbca4('0x8')]['callback']=window['_QuatroDigital_CartData'][_0xbca4('0x9')]||$[_0xbca4('0xa')]();}catch(_0x2c4442){_0xbca4('0x2')!=typeof console&&_0xbca4('0xb')==typeof console[_0xbca4('0xc')]&&console[_0xbca4('0xc')]('Oooops!\x20',_0x2c4442['message']);}}(),function(_0x215224){'use strict';try{var _0x5f34a7=jQuery,_0x1983c6=_0xbca4('0xd'),_0x21acde=function(_0x1ae99b,_0xab9ebf){if(_0xbca4('0xe')==typeof console&&'undefined'!=typeof console[_0xbca4('0xc')]&&'undefined'!=typeof console[_0xbca4('0xf')]&&_0xbca4('0x2')!=typeof console[_0xbca4('0x10')]){var _0x45c436;if(_0xbca4('0xe')==typeof _0x1ae99b?(_0x1ae99b[_0xbca4('0x11')]('['+_0x1983c6+']\x0a'),_0x45c436=_0x1ae99b):_0x45c436=['['+_0x1983c6+']\x0a'+_0x1ae99b],_0xbca4('0x2')==typeof _0xab9ebf||_0xbca4('0x12')!==_0xab9ebf[_0xbca4('0x13')]()&&_0xbca4('0x14')!==_0xab9ebf[_0xbca4('0x13')]())if(_0xbca4('0x2')!=typeof _0xab9ebf&&_0xbca4('0xf')===_0xab9ebf[_0xbca4('0x13')]())try{console[_0xbca4('0xf')]['apply'](console,_0x45c436);}catch(_0xc3bd26){try{console[_0xbca4('0xf')](_0x45c436['join']('\x0a'));}catch(_0x1772d5){}}else try{console[_0xbca4('0xc')][_0xbca4('0x15')](console,_0x45c436);}catch(_0x13a0c7){try{console[_0xbca4('0xc')](_0x45c436['join']('\x0a'));}catch(_0xd35dd0){}}else try{console[_0xbca4('0x10')][_0xbca4('0x15')](console,_0x45c436);}catch(_0x32385c){try{console['warn'](_0x45c436[_0xbca4('0x7')]('\x0a'));}catch(_0x5bec99){}}}};window[_0xbca4('0x16')]=window['_QuatroDigital_DropDown']||{},window[_0xbca4('0x16')][_0xbca4('0x17')]=!0x0,_0x5f34a7[_0xbca4('0x18')]=function(){},_0x5f34a7['fn']['QD_dropDownCart']=function(){return{'fn':new _0x5f34a7()};};var _0x21eecf=function(_0x118b99){var _0x5e9c5e={'a':_0xbca4('0x19')};return function(_0x11d2e1){var _0x300d17,_0x4d8132,_0x263c20,_0x49eb8a;_0x4d8132=function(_0x2528b9){return _0x2528b9;},_0x263c20=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'],_0x11d2e1=_0x11d2e1['d'+_0x263c20[0x10]+'c'+_0x263c20[0x11]+'m'+_0x4d8132(_0x263c20[0x1])+'n'+_0x263c20[0xd]]['l'+_0x263c20[0x12]+'c'+_0x263c20[0x0]+'ti'+_0x4d8132('o')+'n'],_0x300d17=function(_0x6dfc72){return escape(encodeURIComponent(_0x6dfc72[_0xbca4('0x1')](/\./g,'¨')[_0xbca4('0x1')](/[a-zA-Z]/g,function(_0x242b28){return String['fromCharCode'](('Z'>=_0x242b28?0x5a:0x7a)>=(_0x242b28=_0x242b28[_0xbca4('0x1a')](0x0)+0xd)?_0x242b28:_0x242b28-0x1a);})));};var _0xc5dae7=_0x300d17(_0x11d2e1[[_0x263c20[0x9],_0x4d8132('o'),_0x263c20[0xc],_0x263c20[_0x4d8132(0xd)]][_0xbca4('0x7')]('')]);_0x300d17=_0x300d17((window[['js',_0x4d8132('no'),'m',_0x263c20[0x1],_0x263c20[0x4]['toUpperCase'](),_0xbca4('0x1b')]['join']('')]||'---')+['.v',_0x263c20[0xd],'e',_0x4d8132('x'),'co',_0x4d8132('mm'),_0xbca4('0x1c'),_0x263c20[0x1],'.c',_0x4d8132('o'),'m.',_0x263c20[0x13],'r'][_0xbca4('0x7')](''));for(var _0x1bc01a in _0x5e9c5e){if(_0x300d17===_0x1bc01a+_0x5e9c5e[_0x1bc01a]||_0xc5dae7===_0x1bc01a+_0x5e9c5e[_0x1bc01a]){_0x49eb8a='tr'+_0x263c20[0x11]+'e';break;}_0x49eb8a='f'+_0x263c20[0x0]+'ls'+_0x4d8132(_0x263c20[0x1]);}return _0x4d8132=!0x1,-0x1<_0x11d2e1[[_0x263c20[0xc],'e',_0x263c20[0x0],'rc',_0x263c20[0x9]][_0xbca4('0x7')]('')][_0xbca4('0x1d')](_0xbca4('0x1e'))&&(_0x4d8132=!0x0),[_0x49eb8a,_0x4d8132];}(_0x118b99);}(window);if(!eval(_0x21eecf[0x0]))return _0x21eecf[0x1]?_0x21acde('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x5f34a7[_0xbca4('0x18')]=function(_0x24855e,_0x41a6c0){var _0x1a88d3,_0x26eeba,_0x1fbfb6,_0x133046,_0x4232ed,_0x36a900,_0x70e484,_0x43678e,_0x14e462,_0x2b59d2,_0x52fed4;if(_0x2b59d2=_0x5f34a7(_0x24855e),!_0x2b59d2[_0xbca4('0x6')])return _0x2b59d2;if(_0x1a88d3={'updateOnlyHover':!0x0,'texts':{'linkCart':_0xbca4('0x1f'),'linkCheckout':_0xbca4('0x20'),'cartTotal':_0xbca4('0x21'),'emptyCart':_0xbca4('0x22'),'continueShopping':_0xbca4('0x23'),'shippingForm':_0xbca4('0x24')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x5ddb6c){return _0x5ddb6c[_0xbca4('0x25')]||_0x5ddb6c[_0xbca4('0x26')];},'callback':function(){},'callbackProductsList':function(){}},_0x26eeba=_0x5f34a7['extend'](!0x0,{},_0x1a88d3,_0x41a6c0),_0x1fbfb6=_0x5f34a7(''),_0x14e462=this,_0x26eeba[_0xbca4('0x27')]){var _0xc9839d=!0x1;if('undefined'==typeof window[_0xbca4('0x28')]&&(_0x21acde(_0xbca4('0x29')),_0x5f34a7[_0xbca4('0x2a')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0xbca4('0x2b'),'error':function(){_0x21acde(_0xbca4('0x2c')),_0xc9839d=!0x0;}})),_0xc9839d)return _0x21acde('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}var _0x3dc525;if(_0xbca4('0xe')==typeof window[_0xbca4('0x28')]&&_0xbca4('0x2')!=typeof window[_0xbca4('0x28')][_0xbca4('0x2d')])_0x3dc525=window[_0xbca4('0x28')][_0xbca4('0x2d')];else{if('object'!=typeof vtex||_0xbca4('0xe')!=typeof vtex[_0xbca4('0x2d')]||_0xbca4('0x2')==typeof vtex[_0xbca4('0x2d')][_0xbca4('0x2e')])return _0x21acde('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x3dc525=new vtex['checkout'][(_0xbca4('0x2e'))]();}_0x14e462[_0xbca4('0x2f')]=_0xbca4('0x30'),_0x4232ed=function(_0x5ece08){var _0x41a6c0=_0x5f34a7(_0x5ece08);return _0x26eeba[_0xbca4('0x31')][_0xbca4('0x32')]=_0x26eeba[_0xbca4('0x31')]['cartTotal']['replace'](_0xbca4('0x33'),_0xbca4('0x34')),_0x26eeba[_0xbca4('0x31')][_0xbca4('0x32')]=_0x26eeba[_0xbca4('0x31')][_0xbca4('0x32')][_0xbca4('0x1')]('#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>'),_0x26eeba[_0xbca4('0x31')]['cartTotal']=_0x26eeba[_0xbca4('0x31')][_0xbca4('0x32')][_0xbca4('0x1')]('#shipping',_0xbca4('0x35')),_0x26eeba[_0xbca4('0x31')][_0xbca4('0x32')]=_0x26eeba[_0xbca4('0x31')][_0xbca4('0x32')][_0xbca4('0x1')](_0xbca4('0x36'),_0xbca4('0x37')),_0x41a6c0[_0xbca4('0x38')](_0xbca4('0x39'))[_0xbca4('0x3a')](_0x26eeba[_0xbca4('0x31')][_0xbca4('0x3b')]),_0x41a6c0['find'](_0xbca4('0x3c'))['html'](_0x26eeba['texts'][_0xbca4('0x3d')]),_0x41a6c0[_0xbca4('0x38')](_0xbca4('0x3e'))[_0xbca4('0x3a')](_0x26eeba['texts'][_0xbca4('0x3f')]),_0x41a6c0['find'](_0xbca4('0x40'))[_0xbca4('0x3a')](_0x26eeba[_0xbca4('0x31')]['cartTotal']),_0x41a6c0[_0xbca4('0x38')]('.qd-ddc-shipping')[_0xbca4('0x3a')](_0x26eeba[_0xbca4('0x31')][_0xbca4('0x41')]),_0x41a6c0['find'](_0xbca4('0x42'))[_0xbca4('0x3a')](_0x26eeba['texts'][_0xbca4('0x43')]),_0x41a6c0;},_0x133046=function(_0x5ab9fe){_0x5f34a7(this)[_0xbca4('0x44')](_0x5ab9fe),_0x5ab9fe['find'](_0xbca4('0x45'))[_0xbca4('0x46')](_0x5f34a7(_0xbca4('0x47')))['on']('click.qd_ddc_closeFn',function(){_0x2b59d2[_0xbca4('0x48')](_0xbca4('0x49')),_0x5f34a7(document['body'])[_0xbca4('0x48')](_0xbca4('0x4a'));}),_0x5f34a7(document)[_0xbca4('0x4b')](_0xbca4('0x4c'))['on'](_0xbca4('0x4c'),function(_0x4325f1){0x1b==_0x4325f1[_0xbca4('0x4d')]&&(_0x2b59d2[_0xbca4('0x48')](_0xbca4('0x49')),_0x5f34a7(document[_0xbca4('0x4e')])[_0xbca4('0x48')](_0xbca4('0x4a')));});var _0x41a6c0=_0x5ab9fe['find'](_0xbca4('0x4f'));if(_0x5ab9fe[_0xbca4('0x38')]('.qd-ddc-scrollUp')['on'](_0xbca4('0x50'),function(){return _0x14e462['scrollCart']('-',void 0x0,void 0x0,_0x41a6c0),!0x1;}),_0x5ab9fe[_0xbca4('0x38')](_0xbca4('0x51'))['on']('click.qd_ddc_scrollDown',function(){return _0x14e462[_0xbca4('0x52')](void 0x0,void 0x0,void 0x0,_0x41a6c0),!0x1;}),_0x5ab9fe['find'](_0xbca4('0x53'))[_0xbca4('0x54')]('')['on'](_0xbca4('0x55'),function(){_0x14e462[_0xbca4('0x56')](_0x5f34a7(this));}),_0x26eeba[_0xbca4('0x57')]){var _0x5670d8=0x0;_0x5f34a7(this)['on'](_0xbca4('0x58'),function(){var _0x5ab9fe=function(){window[_0xbca4('0x16')][_0xbca4('0x17')]&&(_0x14e462['getCartInfoByUrl'](),window[_0xbca4('0x16')][_0xbca4('0x17')]=!0x1,_0x5f34a7['fn'][_0xbca4('0x59')](!0x0),_0x14e462[_0xbca4('0x5a')]());};_0x5670d8=setInterval(function(){_0x5ab9fe();},0x258),_0x5ab9fe();}),_0x5f34a7(this)['on'](_0xbca4('0x5b'),function(){clearInterval(_0x5670d8);});}},_0x36a900=_0x4232ed(this[_0xbca4('0x2f')]),_0x70e484=0x0,_0x2b59d2[_0xbca4('0x5c')](function(){_0x70e484>0x0?_0x133046[_0xbca4('0x5d')](this,_0x36a900['clone']()):_0x133046[_0xbca4('0x5d')](this,_0x36a900),_0x70e484++;}),window['_QuatroDigital_CartData'][_0xbca4('0x9')][_0xbca4('0x46')](function(){_0x5f34a7(_0xbca4('0x5e'))['html'](window['_QuatroDigital_CartData'][_0xbca4('0x5f')]||'--'),_0x5f34a7('.qd-ddc-infoTotalItems')[_0xbca4('0x3a')](window[_0xbca4('0x8')][_0xbca4('0x60')]||'0'),_0x5f34a7(_0xbca4('0x61'))[_0xbca4('0x3a')](window[_0xbca4('0x8')][_0xbca4('0x62')]||'--'),_0x5f34a7(_0xbca4('0x63'))[_0xbca4('0x3a')](window[_0xbca4('0x8')][_0xbca4('0x64')]||'--');}),_0x43678e=function(_0x180902){_0x21acde('Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado');},_0x52fed4=function(_0x4c5b44,_0xd34738){return _0xbca4('0x2')==typeof _0x4c5b44[_0xbca4('0x65')]?_0x21acde(_0xbca4('0x66')):void _0x14e462[_0xbca4('0x67')]['call'](this,_0xd34738);},_0x14e462[_0xbca4('0x68')]=function(_0x1d0e96,_0x1129a6){var _0x288467;if('undefined'!=typeof _0x1129a6?window[_0xbca4('0x16')][_0xbca4('0x69')]=_0x1129a6:window['_QuatroDigital_DropDown'][_0xbca4('0x69')]&&(_0x1129a6=window[_0xbca4('0x16')]['dataOptionsCache']),setTimeout(function(){window[_0xbca4('0x16')][_0xbca4('0x69')]=void 0x0;},_0x26eeba[_0xbca4('0x6a')]),_0x5f34a7(_0xbca4('0x6b'))[_0xbca4('0x48')](_0xbca4('0x6c')),_0x26eeba['smartCheckout']){if(_0x288467=function(_0x5b315a){window[_0xbca4('0x16')][_0xbca4('0x6d')]=_0x5b315a,_0x52fed4(_0x5b315a,_0x1129a6),_0xbca4('0x2')!=typeof window[_0xbca4('0x6e')]&&_0xbca4('0xb')==typeof window[_0xbca4('0x6e')][_0xbca4('0x6f')]&&window['_QuatroDigital_AmountProduct'][_0xbca4('0x6f')][_0xbca4('0x5d')](this),_0x5f34a7(_0xbca4('0x6b'))[_0xbca4('0x70')](_0xbca4('0x6c'));},_0xbca4('0x2')!=typeof window[_0xbca4('0x16')]['getOrderForm'])return _0x288467(window[_0xbca4('0x16')][_0xbca4('0x6d')]),void(_0xbca4('0xb')==typeof _0x1d0e96&&_0x1d0e96(window['_QuatroDigital_DropDown'][_0xbca4('0x6d')]));_0x5f34a7['QD_checkoutQueue']([_0xbca4('0x65'),'totalizers',_0xbca4('0x71')],{'done':function(_0xdfa0d4){_0x288467['call'](this,_0xdfa0d4),_0xbca4('0xb')==typeof _0x1d0e96&&_0x1d0e96(_0xdfa0d4);},'fail':function(_0x555409){_0x21acde([_0xbca4('0x72'),_0x555409]);}});}else alert(_0xbca4('0x73'));},_0x14e462[_0xbca4('0x5a')]=function(){var _0x24855e=_0x5f34a7(_0xbca4('0x6b'));_0x24855e[_0xbca4('0x38')](_0xbca4('0x74'))[_0xbca4('0x6')]?_0x24855e[_0xbca4('0x48')](_0xbca4('0x75')):_0x24855e['addClass'](_0xbca4('0x75'));},_0x14e462[_0xbca4('0x67')]=function(_0x4a28e6){var _0x41a6c0=_0x5f34a7(_0xbca4('0x76')),_0x9bc02f=_0xbca4('0x77');_0x41a6c0[_0xbca4('0x78')](),_0x41a6c0['each'](function(){var _0x41a6c0,_0x494db1,_0x1fb790,_0x118242,_0x8a1e3e,_0x43c934=_0x5f34a7(this),_0x5ec80d=_0x5f34a7('');for(var _0x4c333f in window['_QuatroDigital_DropDown'][_0xbca4('0x6d')][_0xbca4('0x65')])_0xbca4('0xe')==typeof window[_0xbca4('0x16')][_0xbca4('0x6d')][_0xbca4('0x65')][_0x4c333f]&&(_0x1fb790=window[_0xbca4('0x16')][_0xbca4('0x6d')][_0xbca4('0x65')][_0x4c333f],_0x8a1e3e=_0x1fb790[_0xbca4('0x79')][_0xbca4('0x1')](/^\/|\/$/g,'')[_0xbca4('0x5')]('/'),_0x494db1=_0x5f34a7(_0x9bc02f),_0x494db1['attr']({'data-sku':_0x1fb790['id'],'data-sku-index':_0x4c333f,'data-qd-departament':_0x8a1e3e[0x0],'data-qd-category':_0x8a1e3e[_0x8a1e3e['length']-0x1]}),_0x494db1[_0xbca4('0x70')](_0xbca4('0x7a')+_0x1fb790[_0xbca4('0x7b')]),_0x494db1[_0xbca4('0x38')](_0xbca4('0x7c'))[_0xbca4('0x44')](_0x26eeba[_0xbca4('0x25')](_0x1fb790)),_0x494db1[_0xbca4('0x38')]('.qd-ddc-prodPrice')[_0xbca4('0x44')](isNaN(_0x1fb790[_0xbca4('0x7d')])?_0x1fb790['sellingPrice']:0x0==_0x1fb790[_0xbca4('0x7d')]?_0xbca4('0x7e'):(_0x5f34a7(_0xbca4('0x7f'))[_0xbca4('0x80')](_0xbca4('0x81'))||'R$')+'\x20'+qd_number_format(_0x1fb790[_0xbca4('0x7d')]/0x64,0x2,',','.')),_0x494db1['find'](_0xbca4('0x82'))[_0xbca4('0x80')]({'data-sku':_0x1fb790['id'],'data-sku-index':_0x4c333f})['val'](_0x1fb790[_0xbca4('0x83')]),_0x494db1[_0xbca4('0x38')](_0xbca4('0x84'))[_0xbca4('0x80')]({'data-sku':_0x1fb790['id'],'data-sku-index':_0x4c333f}),_0x14e462[_0xbca4('0x85')](_0x1fb790['id'],_0x494db1[_0xbca4('0x38')](_0xbca4('0x86')),_0x1fb790[_0xbca4('0x87')]),_0x494db1[_0xbca4('0x38')](_0xbca4('0x88'))[_0xbca4('0x80')]({'data-sku':_0x1fb790['id'],'data-sku-index':_0x4c333f}),_0x494db1[_0xbca4('0x89')](_0x43c934),_0x5ec80d=_0x5ec80d[_0xbca4('0x46')](_0x494db1));try{var _0x2683a4=_0x43c934[_0xbca4('0x8a')](_0xbca4('0x6b'))['find'](_0xbca4('0x53'));_0x2683a4[_0xbca4('0x6')]&&''==_0x2683a4['val']()&&window['_QuatroDigital_DropDown'][_0xbca4('0x6d')][_0xbca4('0x71')][_0xbca4('0x8b')]&&_0x2683a4[_0xbca4('0x54')](window[_0xbca4('0x16')][_0xbca4('0x6d')][_0xbca4('0x71')][_0xbca4('0x8b')][_0xbca4('0x8c')]);}catch(_0x51076b){_0x21acde(_0xbca4('0x8d')+_0x51076b['message'],_0xbca4('0x14'));}_0x14e462[_0xbca4('0x8e')](_0x43c934),_0x14e462['cartIsEmpty'](),_0x4a28e6&&_0x4a28e6['lastSku']&&!function(){_0x118242=_0x5ec80d[_0xbca4('0x8f')]('[data-sku=\x27'+_0x4a28e6[_0xbca4('0x90')]+'\x27]'),_0x118242[_0xbca4('0x6')]&&(_0x41a6c0=0x0,_0x5ec80d[_0xbca4('0x5c')](function(){var _0x4a28e6=_0x5f34a7(this);return _0x4a28e6['is'](_0x118242)?!0x1:void(_0x41a6c0+=_0x4a28e6['outerHeight']());}),_0x14e462[_0xbca4('0x52')](void 0x0,void 0x0,_0x41a6c0,_0x43c934[_0xbca4('0x46')](_0x43c934[_0xbca4('0x91')]())),_0x5ec80d[_0xbca4('0x48')]('qd-ddc-lastAddedFixed'),function(_0x3170d1){_0x3170d1[_0xbca4('0x70')](_0xbca4('0x92')),_0x3170d1[_0xbca4('0x70')](_0xbca4('0x93')),setTimeout(function(){_0x3170d1[_0xbca4('0x48')]('qd-ddc-lastAdded');},_0x26eeba[_0xbca4('0x6a')]);}(_0x118242));}();}),function(){_QuatroDigital_DropDown[_0xbca4('0x6d')][_0xbca4('0x65')][_0xbca4('0x6')]?(_0x5f34a7(_0xbca4('0x4e'))['removeClass']('qd-ddc-cart-empty')['addClass'](_0xbca4('0x94')),setTimeout(function(){_0x5f34a7('body')[_0xbca4('0x48')](_0xbca4('0x95'));},_0x26eeba[_0xbca4('0x6a')])):_0x5f34a7(_0xbca4('0x4e'))['removeClass']('qd-ddc-cart-rendered')[_0xbca4('0x70')]('qd-ddc-cart-empty');}(),_0xbca4('0xb')==typeof _0x26eeba[_0xbca4('0x96')]?_0x26eeba['callbackProductsList']['call'](this):_0x21acde(_0xbca4('0x97'));},_0x14e462[_0xbca4('0x85')]=function(_0x26eb93,_0x2f51b3,_0x393bc5){function _0x5984d8(){_0x2f51b3[_0xbca4('0x48')](_0xbca4('0x98'))[_0xbca4('0x99')](function(){_0x5f34a7(this)[_0xbca4('0x70')](_0xbca4('0x98'));})[_0xbca4('0x80')](_0xbca4('0x9a'),_0x393bc5);}_0x393bc5?_0x5984d8():isNaN(_0x26eb93)?_0x21acde('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xbca4('0x12')):alert(_0xbca4('0x9b'));},_0x14e462[_0xbca4('0x8e')]=function(_0x5a3caa){var _0x41a6c0,_0x20a66c,_0x2b994d,_0xc71a3;_0x41a6c0=function(_0x19dfaa,_0x15f063){var _0x450e98,_0x363267,_0x49c685,_0x5ce20c;_0x49c685=_0x5f34a7(_0x19dfaa),_0x450e98=_0x49c685['attr'](_0xbca4('0x9c')),_0x5ce20c=_0x49c685[_0xbca4('0x80')](_0xbca4('0x9d')),_0x450e98&&(_0x363267=parseInt(_0x49c685[_0xbca4('0x54')]())||0x1,_0x14e462[_0xbca4('0x9e')]([_0x450e98,_0x5ce20c],_0x363267,_0x363267+0x1,function(_0x49bcde){_0x49c685[_0xbca4('0x54')](_0x49bcde),'function'==typeof _0x15f063&&_0x15f063();}));},_0x2b994d=function(_0x132fa4,_0x1c8ca6){var _0xd347aa,_0x303799,_0x2e8dc0,_0x5771c4,_0x2529df;_0x2e8dc0=_0x5f34a7(_0x132fa4),_0xd347aa=_0x2e8dc0[_0xbca4('0x80')]('data-sku'),_0x2529df=_0x2e8dc0[_0xbca4('0x80')](_0xbca4('0x9d')),_0xd347aa&&(_0x303799=parseInt(_0x2e8dc0[_0xbca4('0x54')]())||0x2,_0x5771c4=_0x14e462[_0xbca4('0x9e')]([_0xd347aa,_0x2529df],_0x303799,_0x303799-0x1,function(_0x280377){_0x2e8dc0['val'](_0x280377),'function'==typeof _0x1c8ca6&&_0x1c8ca6();}));},_0xc71a3=function(_0x1e41bf,_0x18d6db){var _0x203a3,_0x504e02,_0xa4c6e3,_0x44e43b,_0x30aac1;_0xa4c6e3=_0x5f34a7(_0x1e41bf),_0x203a3=_0xa4c6e3['attr'](_0xbca4('0x9c')),_0x30aac1=_0xa4c6e3['attr'](_0xbca4('0x9d')),_0x203a3&&(_0x504e02=parseInt(_0xa4c6e3[_0xbca4('0x54')]())||0x1,_0x44e43b=_0x14e462[_0xbca4('0x9e')]([_0x203a3,_0x30aac1],0x1,_0x504e02,function(_0x382413){_0xa4c6e3[_0xbca4('0x54')](_0x382413),_0xbca4('0xb')==typeof _0x18d6db&&_0x18d6db();}));},_0x20a66c=_0x5a3caa[_0xbca4('0x38')](_0xbca4('0x9f')),_0x20a66c[_0xbca4('0x70')](_0xbca4('0xa0'))['each'](function(){var _0x5a3caa=_0x5f34a7(this);_0x5a3caa[_0xbca4('0x38')](_0xbca4('0xa1'))['on'](_0xbca4('0xa2'),function(_0xfc7474){_0xfc7474[_0xbca4('0xa3')](),_0x20a66c[_0xbca4('0x70')](_0xbca4('0xa4')),_0x41a6c0(_0x5a3caa[_0xbca4('0x38')]('.qd-ddc-quantity'),function(){_0x20a66c[_0xbca4('0x48')](_0xbca4('0xa4'));});}),_0x5a3caa[_0xbca4('0x38')](_0xbca4('0xa5'))['on'](_0xbca4('0xa6'),function(_0x2fb90c){_0x2fb90c[_0xbca4('0xa3')](),_0x20a66c[_0xbca4('0x70')](_0xbca4('0xa4')),_0x2b994d(_0x5a3caa[_0xbca4('0x38')]('.qd-ddc-quantity'),function(){_0x20a66c[_0xbca4('0x48')]('qd-loading');});}),_0x5a3caa[_0xbca4('0x38')](_0xbca4('0x82'))['on'](_0xbca4('0xa7'),function(){_0x20a66c[_0xbca4('0x70')](_0xbca4('0xa4')),_0xc71a3(this,function(){_0x20a66c[_0xbca4('0x48')](_0xbca4('0xa4'));});}),_0x5a3caa[_0xbca4('0x38')](_0xbca4('0x82'))['on'](_0xbca4('0xa8'),function(_0x24d1bc){0xd==_0x24d1bc[_0xbca4('0x4d')]&&(_0x20a66c[_0xbca4('0x70')](_0xbca4('0xa4')),_0xc71a3(this,function(){_0x20a66c[_0xbca4('0x48')](_0xbca4('0xa4'));}));});}),_0x5a3caa[_0xbca4('0x38')](_0xbca4('0x74'))[_0xbca4('0x5c')](function(){var _0x5a3caa=_0x5f34a7(this);_0x5a3caa[_0xbca4('0x38')](_0xbca4('0x84'))['on'](_0xbca4('0xa9'),function(){return _0x5a3caa[_0xbca4('0x70')]('qd-loading'),_0x14e462[_0xbca4('0xaa')](_0x5f34a7(this),function(_0x414329){_0x414329?_0x5a3caa[_0xbca4('0xab')](!0x0)['slideUp'](function(){_0x5a3caa[_0xbca4('0xac')](),_0x14e462['cartIsEmpty']();}):_0x5a3caa['removeClass']('qd-loading');}),!0x1;});});},_0x14e462[_0xbca4('0x56')]=function(_0x57b769){var _0x41a6c0=_0x57b769[_0xbca4('0x54')]();_0x41a6c0=_0x41a6c0[_0xbca4('0x1')](/[^0-9\-]/g,''),_0x41a6c0=_0x41a6c0[_0xbca4('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xbca4('0xad')),_0x41a6c0=_0x41a6c0[_0xbca4('0x1')](/(.{9}).*/g,'$1'),_0x57b769['val'](_0x41a6c0),_0x41a6c0[_0xbca4('0x6')]>=0x9&&(_0x57b769[_0xbca4('0xae')](_0xbca4('0xaf'))!=_0x41a6c0&&_0x3dc525[_0xbca4('0xb0')]({'postalCode':_0x41a6c0,'country':_0xbca4('0xb1')})['done'](function(_0x545ec1){window[_0xbca4('0x16')]['getOrderForm']=_0x545ec1,_0x14e462[_0xbca4('0x68')]();})[_0xbca4('0xb2')](function(_0x3181f5){_0x21acde([_0xbca4('0xb3'),_0x3181f5]),updateCartData();}),_0x57b769[_0xbca4('0xae')](_0xbca4('0xaf'),_0x41a6c0));},_0x14e462[_0xbca4('0x9e')]=function(_0x39270a,_0x45df06,_0x579906,_0x5ad89f){function _0x146d1a(_0x364bfc){_0x364bfc=_0xbca4('0xb4')!=typeof _0x364bfc?!0x1:_0x364bfc,_0x14e462[_0xbca4('0x68')](),window['_QuatroDigital_DropDown'][_0xbca4('0x17')]=!0x1,_0x14e462['cartIsEmpty'](),_0xbca4('0x2')!=typeof window[_0xbca4('0x6e')]&&_0xbca4('0xb')==typeof window['_QuatroDigital_AmountProduct'][_0xbca4('0x6f')]&&window[_0xbca4('0x6e')][_0xbca4('0x6f')]['call'](this),_0xbca4('0xb')==typeof adminCart&&adminCart(),_0x5f34a7['fn']['simpleCart'](!0x0,void 0x0,_0x364bfc),_0xbca4('0xb')==typeof _0x5ad89f&&_0x5ad89f(_0x45df06);}var _0x236fae=_0x579906||0x1;if(0x1>_0x236fae)return _0x45df06;if(_0x26eeba[_0xbca4('0x27')]){if(_0xbca4('0x2')==typeof window[_0xbca4('0x16')][_0xbca4('0x6d')][_0xbca4('0x65')][_0x39270a[0x1]])return _0x21acde(_0xbca4('0xb5')+_0x39270a[0x1]+']'),_0x45df06;window['_QuatroDigital_DropDown'][_0xbca4('0x6d')][_0xbca4('0x65')][_0x39270a[0x1]]['quantity']=_0x236fae,window[_0xbca4('0x16')][_0xbca4('0x6d')][_0xbca4('0x65')][_0x39270a[0x1]]['index']=_0x39270a[0x1],_0x3dc525[_0xbca4('0xb6')]([window[_0xbca4('0x16')][_0xbca4('0x6d')]['items'][_0x39270a[0x1]]],[_0xbca4('0x65'),_0xbca4('0xb7'),_0xbca4('0x71')])['done'](function(_0x1f0b2f){window['_QuatroDigital_DropDown'][_0xbca4('0x6d')]=_0x1f0b2f,_0x146d1a(!0x0);})[_0xbca4('0xb2')](function(_0x463342){_0x21acde([_0xbca4('0xb8'),_0x463342]),_0x146d1a();});}else _0x21acde(_0xbca4('0xb9'));},_0x14e462[_0xbca4('0xaa')]=function(_0x7b15a3,_0x515a80){function _0x1a672(_0x199aad){_0x199aad=_0xbca4('0xb4')!=typeof _0x199aad?!0x1:_0x199aad,'undefined'!=typeof window[_0xbca4('0x6e')]&&_0xbca4('0xb')==typeof window['_QuatroDigital_AmountProduct'][_0xbca4('0x6f')]&&window[_0xbca4('0x6e')][_0xbca4('0x6f')][_0xbca4('0x5d')](this),'function'==typeof adminCart&&adminCart(),_0x5f34a7['fn'][_0xbca4('0x59')](!0x0,void 0x0,_0x199aad),'function'==typeof _0x515a80&&_0x515a80(_0x476416);}var _0x476416=!0x1,_0x750ebe=_0x5f34a7(_0x7b15a3),_0x211623=_0x750ebe['attr'](_0xbca4('0x9d'));if(_0x26eeba[_0xbca4('0x27')]){if(_0xbca4('0x2')==typeof window[_0xbca4('0x16')]['getOrderForm']['items'][_0x211623])return _0x21acde('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x211623+']'),_0x476416;window[_0xbca4('0x16')][_0xbca4('0x6d')][_0xbca4('0x65')][_0x211623][_0xbca4('0xba')]=_0x211623,_0x3dc525['removeItems']([window[_0xbca4('0x16')][_0xbca4('0x6d')]['items'][_0x211623]],[_0xbca4('0x65'),_0xbca4('0xb7'),_0xbca4('0x71')])[_0xbca4('0xbb')](function(_0x71b7a){_0x476416=!0x0,window[_0xbca4('0x16')]['getOrderForm']=_0x71b7a,_0x52fed4(_0x71b7a),_0x1a672(!0x0);})[_0xbca4('0xb2')](function(_0x85daba){_0x21acde([_0xbca4('0xbc'),_0x85daba]),_0x1a672();});}else alert(_0xbca4('0xbd'));},_0x14e462['scrollCart']=function(_0x1bee59,_0x3a9de9,_0x157cf0,_0x1cc0bb){var _0x384f97=_0x1cc0bb||_0x5f34a7(_0xbca4('0xbe')),_0x415163=_0x1bee59||'+',_0x165883=_0x3a9de9||0.9*_0x384f97[_0xbca4('0xbf')]();_0x384f97[_0xbca4('0xab')](!0x0,!0x0)[_0xbca4('0xc0')]({'scrollTop':isNaN(_0x157cf0)?_0x415163+'='+_0x165883+'px':_0x157cf0});},_0x26eeba[_0xbca4('0x57')]||(_0x14e462[_0xbca4('0x68')](),_0x5f34a7['fn'][_0xbca4('0x59')](!0x0)),_0x5f34a7(window)['on'](_0xbca4('0xc1'),function(){try{window[_0xbca4('0x16')][_0xbca4('0x6d')]=void 0x0,_0x14e462[_0xbca4('0x68')]();}catch(_0x444c1c){_0x21acde(_0xbca4('0xc2')+_0x444c1c['message'],_0xbca4('0xc3'));}}),_0xbca4('0xb')==typeof _0x26eeba['callback']?_0x26eeba[_0xbca4('0x9')][_0xbca4('0x5d')](this):_0x21acde(_0xbca4('0xc4'));},_0x5f34a7['fn'][_0xbca4('0x18')]=function(_0x4b818b){var _0xd6ebfb;return _0xd6ebfb=_0x5f34a7(this),_0xd6ebfb['fn']=new _0x5f34a7[(_0xbca4('0x18'))](this,_0x4b818b),_0xd6ebfb;};}catch(_0x262e3e){_0xbca4('0x2')!=typeof console&&_0xbca4('0xb')==typeof console[_0xbca4('0xc')]&&console[_0xbca4('0xc')](_0xbca4('0xc5'),_0x262e3e);}}(this),function(_0x28d525){'use strict';try{var _0xb97c57=jQuery;window[_0xbca4('0x6e')]=window[_0xbca4('0x6e')]||{},window[_0xbca4('0x6e')][_0xbca4('0x65')]={},window[_0xbca4('0x6e')][_0xbca4('0xc6')]=!0x1,window[_0xbca4('0x6e')][_0xbca4('0xc7')]=!0x1,window[_0xbca4('0x6e')][_0xbca4('0xc8')]=!0x1;var _0x390264=_0xbca4('0xc9'),_0x10f996=function(){var _0x28d525,_0x483f35,_0x262614,_0x56b947;_0x56b947=_0x421bf7(),window[_0xbca4('0x6e')][_0xbca4('0xc6')]&&(_0xb97c57(_0xbca4('0xca'))['remove'](),_0xb97c57(_0xbca4('0xcb'))['removeClass'](_0xbca4('0xcc')));for(var _0x225354 in window['_QuatroDigital_AmountProduct'][_0xbca4('0x65')]){if(_0x28d525=window[_0xbca4('0x6e')][_0xbca4('0x65')][_0x225354],'object'!=typeof _0x28d525)return;if(_0x262614=_0xb97c57(_0xbca4('0xcd')+_0x28d525[_0xbca4('0xce')]+']')['getParent']('li'),window[_0xbca4('0x6e')][_0xbca4('0xc6')]||!_0x262614[_0xbca4('0x38')](_0xbca4('0xca'))[_0xbca4('0x6')]){_0x483f35=_0xb97c57(_0x390264),_0x483f35['find'](_0xbca4('0xcf'))[_0xbca4('0x3a')](_0x28d525[_0xbca4('0x60')]);var _0x1ec94b=_0x262614['find']('.qd_bap_wrapper_content');_0x1ec94b['length']?_0x1ec94b[_0xbca4('0xd0')](_0x483f35)[_0xbca4('0x70')](_0xbca4('0xcc')):_0x262614[_0xbca4('0xd0')](_0x483f35);}}_0x56b947&&(window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1);},_0x421bf7=function(){if(window[_0xbca4('0x6e')]['allowRecalculate']){var _0x28d525=!0x1,_0xed4c6b={};window[_0xbca4('0x6e')][_0xbca4('0x65')]={};for(var _0x1c061b in window[_0xbca4('0x16')][_0xbca4('0x6d')][_0xbca4('0x65')])if(_0xbca4('0xe')==typeof window[_0xbca4('0x16')]['getOrderForm'][_0xbca4('0x65')][_0x1c061b]){var _0x4c6e49=window['_QuatroDigital_DropDown'][_0xbca4('0x6d')][_0xbca4('0x65')][_0x1c061b];'undefined'!=typeof _0x4c6e49['productId']&&null!==_0x4c6e49[_0xbca4('0xd1')]&&''!==_0x4c6e49[_0xbca4('0xd1')]&&(window['_QuatroDigital_AmountProduct'][_0xbca4('0x65')][_0xbca4('0xd2')+_0x4c6e49[_0xbca4('0xd1')]]=window['_QuatroDigital_AmountProduct'][_0xbca4('0x65')]['prod_'+_0x4c6e49['productId']]||{},window[_0xbca4('0x6e')][_0xbca4('0x65')][_0xbca4('0xd2')+_0x4c6e49['productId']]['prodId']=_0x4c6e49[_0xbca4('0xd1')],_0xed4c6b['prod_'+_0x4c6e49[_0xbca4('0xd1')]]||(window[_0xbca4('0x6e')][_0xbca4('0x65')][_0xbca4('0xd2')+_0x4c6e49['productId']][_0xbca4('0x60')]=0x0),window[_0xbca4('0x6e')][_0xbca4('0x65')][_0xbca4('0xd2')+_0x4c6e49[_0xbca4('0xd1')]][_0xbca4('0x60')]=window[_0xbca4('0x6e')]['items'][_0xbca4('0xd2')+_0x4c6e49[_0xbca4('0xd1')]][_0xbca4('0x60')]+_0x4c6e49[_0xbca4('0x83')],_0x28d525=!0x0,_0xed4c6b['prod_'+_0x4c6e49[_0xbca4('0xd1')]]=!0x0);}return _0x28d525;}};window['_QuatroDigital_AmountProduct'][_0xbca4('0x6f')]=function(){window[_0xbca4('0x6e')][_0xbca4('0xc6')]=!0x0,_0x10f996[_0xbca4('0x5d')](this);},_0xb97c57(document)[_0xbca4('0xd3')](function(){_0x10f996['call'](this);});}catch(_0x466281){'undefined'!=typeof console&&_0xbca4('0xb')==typeof console['error']&&console[_0xbca4('0xc')](_0xbca4('0xc5'),_0x466281);}}(this),function(){'use strict';try{var _0x36ab6a,_0x331fe8=jQuery,_0x1595fd={'selector':_0xbca4('0xd4'),'dropDown':{},'buyButton':{}};_0x331fe8[_0xbca4('0xd5')]=function(_0x2f9463){var _0x41c514,_0x351f5c={};return _0x36ab6a=_0x331fe8[_0xbca4('0xd6')](!0x0,{},_0x1595fd,_0x2f9463),_0x41c514=_0x331fe8(_0x36ab6a[_0xbca4('0xd7')])[_0xbca4('0x18')](_0x36ab6a[_0xbca4('0xd8')]),_0xbca4('0x2')!=typeof _0x36ab6a[_0xbca4('0xd8')][_0xbca4('0x57')]&&_0x36ab6a[_0xbca4('0xd8')][_0xbca4('0x57')]===!0x1?_0x351f5c[_0xbca4('0xd9')]=_0x331fe8(_0x36ab6a['selector'])[_0xbca4('0xda')](_0x41c514['fn'],_0x36ab6a['buyButton']):_0x351f5c[_0xbca4('0xd9')]=_0x331fe8(_0x36ab6a[_0xbca4('0xd7')])[_0xbca4('0xda')](_0x36ab6a[_0xbca4('0xd9')]),_0x351f5c['dropDown']=_0x41c514,_0x351f5c;},_0x331fe8['fn'][_0xbca4('0xdb')]=function(){_0xbca4('0xe')==typeof console&&_0xbca4('0xb')==typeof console['info']&&console[_0xbca4('0xf')](_0xbca4('0xdc'));},_0x331fe8[_0xbca4('0xdb')]=_0x331fe8['fn']['smartCart'];}catch(_0x43f3b1){_0xbca4('0x2')!=typeof console&&'function'==typeof console['error']&&console[_0xbca4('0xc')]('Oooops!\x20',_0x43f3b1);}}();
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
