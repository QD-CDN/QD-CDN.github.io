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
			Common.applyMosaicBanners();			
			Common.openSearchModal();			
			Common.applyTipBarCarousel();			
			Common.showFooterLinks();
			Common.qdOverlay();
			Common.bodyDataQDScrollT();
			Common.saveAmountFix();	
			Common.showHideMenuFloat();			
			Common.openModalVideoInstitutional();			
			Common.applyCarouselShelf();			
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();			
			Common.saveAmountFix();			
		},
		windowOnload: function() {
			Common.saveAmountFix();			
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
		qdOverlay: function() {
			$('.components-qd-v1-overlay').click(function() {
				$(document.body).removeClass(Common.qdOverlayClass);
			});
		},
		bodyDataQDScrollT: function() {
			$(document.body).attr('data-qd-scroll-limit', '145');
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '% OFF');
			});
		},
		applyMosaicBanners: function () {
			$('.mosaic-qd-v1-wrapper > .box-banner').QD_mosaicBanners({
				containerWidth: 1170,
				classTwoColumn: "col-xs-12 col-md-6", 
				classThreeColumn: "col-xs-12 col-md-4",
				classFourColumn: "col-xs-6 col-md-3"
			});
			
			$('.mosaic-qd-v2-wrapper > .box-banner').QD_mosaicBanners({
				containerWidth: 800,
				classTwoColumn: "col-xs-12 col-md-6", 
				classThreeColumn: "col-xs-12 col-md-4",
				classFourColumn: "col-xs-6 col-md-3"
			});
		},
		openModalVideoInstitutional: function() {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('video-qd-v1-modal');
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
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper);
			});
			
			wrapper.parent().removeClass('mosaic-qd-v1-wrapper'); // remove classe de mosaico se tiver carrossel

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
		appendSkuPopUpCloseBtn: function() {
			var wrapper = $('.boxPopUp2 .selectSkuTitle:not(.qd-on)');
			wrapper.addClass('qd-on').append($('<span class="modal-qd-v1-box-popup-close">Fechar</span>').click(function() {
				$(window).trigger('vtex.modal.hide');
				wrapper.removeClass('.qd-on');
				return false;
			}));
		},
		showFooterLinks: function () {
			$('.footer-qd-v1-menu-list > ul > li').click(function (e) {
				var $t = $(this);
				$t.toggleClass('qd-is-active');
				$t.find('> ul').toggleClass('qd-is-active');
			});
		},
		applySmartCart: function() {
			$('.header-qd-v1-actions-wrapper').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');
			$('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>').insertAfter('.fixed-buttons-qd-v1 .header-qd-v1-cart-link');			

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
				Common.blogAdjustBodyHeight();
			});
		},
		applyTipBarCarousel: function() {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				draggable: false
			};

			wrapper.slick($.extend(true, options, (function() {
				// Se estiver dentro do product-qd-v1-sku-selection-box, ele mostrará só 2 slides por vez, mantendo as outras propriedades da variável options
				if(wrapper.closest('.product-qd-v1-sku-selection-box').length)
					return { slidesToShow: 2 };
				return {};
			})()));
		},
		openSearchModal: function() {
			$('.header-qd-v1-action-search').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
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
		applyAmazingMenuMobile: function() {
			var wrapper = $('.header-qd-v1-amazing-menu-mobile');

			wrapper.find('> ul > li > ul').prepend(function(){return $(this).prev().clone().wrap('<li></li>').parent()});

			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-angle-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
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
		showHideMenuFloat: function(){
			$('.header-qd-v1-float-menu-trigger').click(function(){
				$('.header-qd-v1-amazing-menu-wrapper.float-bar').toggleClass('qd-nav-float-on');
			});
		}
	};

	var Home = {
		init: function() {
			Home.sliderFull();			
			Home.countDown();			
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
		countDown: function() {
	    	// Caso seja necessário realizar algum teste, descomente a linha de baixo
	    	$('.shelf-qd-v1-stamps').append('<p class="flag Tempo-Regressivo-|05/09/2019-22:10">Tempo Regressivo |05/09/2016 22:10</p>');

	    	$('.countdown-qd-v1-wrapper .shelf-qd-v1').each(function() {
				var $t = $(this);
				
				$t.prepend('<p class="shelf-qd-v1-countdown-title">SUPER OFERTA</p>');

		    	$t.vtexCountdown({
		    		htmlFormat : '<span class="days qd-cp-timeinfo">%days% <span class="vtex-cd_p qd-cp-text">dias</span><span class="vtex-cd_s qd-cp-text">dia</span> </span><span class="hours qd-cp-timeinfo">%hours% <span class="vtex-cd_p qd-cp-text">horas</span><span class="vtex-cd_s qd-cp-text">hora</span> </span><span class="minutes qd-cp-timeinfo">%minutes% <span class="vtex-cd_p qd-cp-text">min.</span><span class="vtex-cd_s qd-cp-text">min.</span> </span><span class="seconds qd-cp-timeinfo">%seconds% <span class="vtex-cd_p qd-cp-text">seg.</span><span class="vtex-cd_s qd-cp-text">seg.</span> </span>',
		    		displayElement: '.shelf-qd-v1-countdown',
		    		callback: function() {
		    			$t.addClass('qd-has-countdown');
		    		}
		    	});
	    	});
		}
	};

	var Search = {
		init: function() {
			Search.hideExtendedMenu();
			Search.openFiltersMenu();
			Search.shelfLineFix();
			Search.infinityScroll();						
			Home.sliderFull();			
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {
		},
		infinityScroll: function () {
			$(".prateleira[id*=ResultItems]").QD_infinityScroll();
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
			Product.qdCallThumbVideo();			
			Product.openShipping();
			Product.qdHideUniqueSkuOption();
			Product.scrollToDescription();
			Product.scrollToOpinions();
			Product.seeInstalments();
			Product.applyMatchCarouselShelf();
			Product.saveAmountFlag();
			Product.scrollToBuyButton();
			Product.showFloatingBuyBar();
			Product.applyProductBrandCarousel();
			Product.smartStockInit();			
		},
		ajaxStop: function() {
			Product.applyCarouselThumb();
		},
		windowOnload: function() {},
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
				variableWidth: true
			});
		},
		qdCallThumbVideo: function() {
			var iframe = $("td.value-field.Video:first iframe");

			if (!iframe.length) {
				window.qdVideoInProduct = {videoFieldSelector: 'td.value-field.Video:first'};
				return;
			}

			window.qdVideoInProduct = {videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0')};
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		qdHideUniqueSkuOption: function() {
			$(".product-qd-v1-sku-selection [class*='group_']").each(function(){
				var $t = $(this);
				var input =  $t.find("input");

				if(input.length !== 1)
					return;

				input.attr("checked", true).change();
				$t.getParent("ul").hide();
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
		scrollToOpinions: function() {
			$('.product-qd-v1-see-opinions').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-avaliations').offset().top -100
				}, 900, 'swing');
			});
		},
		seeInstalments: function () {
			$('.product-qd-v1-see-installments').click(function (e) {
				e.preventDefault();
				$(this).toggleClass('qd-is-active');
				$('.product-qd-v1-installments-method').toggleClass('qd-is-visible');
			});
		},
		applyMatchCarouselShelf: function() {
			var wrapper = $('.product-match-qd-v1-shelf-carousel .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper);
			});

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 1,
				slidesToScroll: 1,
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
		},
		scrollToBuyButton: function() {
			$('.product-qd-v1-buy-button-float').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-name').offset().top -100
				}, 900, 'swing');
			});
		},
		showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top - 10;
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
		applyProductBrandCarousel: function() {
			var wrapper = $('.brand-carousel-qd-v1-carousel');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				speed: 700,
				responsive: [
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					},

					{
						breakpoint: 550,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							infinite: true,
							centerPadding: '0px'	
						} 
					},

					{
						breakpoint: 380,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
							centerMode: true,
							infinite: true,
							centerPadding: '0px'							
							
						}
					}
				]
			});
		},
		smartStockInit: function(){
			$('.qd_smart_stock_available').QD_smartStockAvailable();
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
var _0xd96f=['available','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','extend','url','opts','push','success','call','error','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','complete','jqXHR','clearQueueDelay','undefined','readyState','textStatus','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','info','apply','warn','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','data-qd-ssa-qtt','each','find','[data-qd-ssa-text]','qd-ssa-hide','removeClass','qd-ssa-show','[data-qd-ssa-text=\x22','filter','hide','html','replace','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','length','qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable'];(function(_0x3060f6,_0x4caa25){var _0x758dac=function(_0x5a6e84){while(--_0x5a6e84){_0x3060f6['push'](_0x3060f6['shift']());}};_0x758dac(++_0x4caa25);}(_0xd96f,0x107));var _0xfd96=function(_0x4f7a5e,_0x189db2){_0x4f7a5e=_0x4f7a5e-0x0;var _0x3da5d8=_0xd96f[_0x4f7a5e];return _0x3da5d8;};(function(_0x1d9c76){if(_0xfd96('0x0')!==typeof _0x1d9c76[_0xfd96('0x1')]){var _0xb847c={};_0x1d9c76[_0xfd96('0x2')]=_0xb847c;_0x1d9c76[_0xfd96('0x1')]=function(_0x38ba7e){var _0x2a8815=_0x1d9c76[_0xfd96('0x3')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x38ba7e);var _0x5e0b18=escape(encodeURIComponent(_0x2a8815[_0xfd96('0x4')]));_0xb847c[_0x5e0b18]=_0xb847c[_0x5e0b18]||{};_0xb847c[_0x5e0b18][_0xfd96('0x5')]=_0xb847c[_0x5e0b18][_0xfd96('0x5')]||[];_0xb847c[_0x5e0b18][_0xfd96('0x5')][_0xfd96('0x6')]({'success':function(_0x1bdef7,_0x354089,_0x3e347b){_0x2a8815[_0xfd96('0x7')][_0xfd96('0x8')](this,_0x1bdef7,_0x354089,_0x3e347b);},'error':function(_0x21df39,_0x367d54,_0x125c40){_0x2a8815[_0xfd96('0x9')][_0xfd96('0x8')](this,_0x21df39,_0x367d54,_0x125c40);},'complete':function(_0xce4828,_0x2cad3e){_0x2a8815['complete'][_0xfd96('0x8')](this,_0xce4828,_0x2cad3e);}});_0xb847c[_0x5e0b18][_0xfd96('0xa')]=_0xb847c[_0x5e0b18]['parameters']||{'success':{},'error':{},'complete':{}};_0xb847c[_0x5e0b18]['callbackFns']=_0xb847c[_0x5e0b18][_0xfd96('0xb')]||{};_0xb847c[_0x5e0b18][_0xfd96('0xb')][_0xfd96('0xc')]=_0xfd96('0xd')===typeof _0xb847c[_0x5e0b18][_0xfd96('0xb')][_0xfd96('0xc')]?_0xb847c[_0x5e0b18][_0xfd96('0xb')][_0xfd96('0xc')]:!0x1;_0xb847c[_0x5e0b18][_0xfd96('0xb')][_0xfd96('0xe')]=_0xfd96('0xd')===typeof _0xb847c[_0x5e0b18][_0xfd96('0xb')][_0xfd96('0xe')]?_0xb847c[_0x5e0b18]['callbackFns'][_0xfd96('0xe')]:!0x1;_0xb847c[_0x5e0b18][_0xfd96('0xb')]['completePopulated']=_0xfd96('0xd')===typeof _0xb847c[_0x5e0b18][_0xfd96('0xb')][_0xfd96('0xf')]?_0xb847c[_0x5e0b18][_0xfd96('0xb')]['completePopulated']:!0x1;_0x38ba7e=_0x1d9c76[_0xfd96('0x3')]({},_0x2a8815,{'success':function(_0x330d85,_0x415e05,_0x4a6031){_0xb847c[_0x5e0b18][_0xfd96('0xa')][_0xfd96('0x7')]={'data':_0x330d85,'textStatus':_0x415e05,'jqXHR':_0x4a6031};_0xb847c[_0x5e0b18][_0xfd96('0xb')]['successPopulated']=!0x0;for(var _0x3a2618 in _0xb847c[_0x5e0b18][_0xfd96('0x5')])_0xfd96('0x10')===typeof _0xb847c[_0x5e0b18]['opts'][_0x3a2618]&&(_0xb847c[_0x5e0b18][_0xfd96('0x5')][_0x3a2618]['success'][_0xfd96('0x8')](this,_0x330d85,_0x415e05,_0x4a6031),_0xb847c[_0x5e0b18][_0xfd96('0x5')][_0x3a2618][_0xfd96('0x7')]=function(){});},'error':function(_0x244ab8,_0x554dd1,_0x3c62a2){_0xb847c[_0x5e0b18][_0xfd96('0xa')][_0xfd96('0x9')]={'errorThrown':_0x3c62a2,'textStatus':_0x554dd1,'jqXHR':_0x244ab8};_0xb847c[_0x5e0b18][_0xfd96('0xb')]['errorPopulated']=!0x0;for(var _0x5f04c3 in _0xb847c[_0x5e0b18][_0xfd96('0x5')])'object'===typeof _0xb847c[_0x5e0b18][_0xfd96('0x5')][_0x5f04c3]&&(_0xb847c[_0x5e0b18][_0xfd96('0x5')][_0x5f04c3]['error'][_0xfd96('0x8')](this,_0x244ab8,_0x554dd1,_0x3c62a2),_0xb847c[_0x5e0b18][_0xfd96('0x5')][_0x5f04c3]['error']=function(){});},'complete':function(_0x47ba40,_0x495b7a){_0xb847c[_0x5e0b18][_0xfd96('0xa')]['complete']={'textStatus':_0x495b7a,'jqXHR':_0x47ba40};_0xb847c[_0x5e0b18]['callbackFns'][_0xfd96('0xf')]=!0x0;for(var _0x215529 in _0xb847c[_0x5e0b18][_0xfd96('0x5')])_0xfd96('0x10')===typeof _0xb847c[_0x5e0b18]['opts'][_0x215529]&&(_0xb847c[_0x5e0b18][_0xfd96('0x5')][_0x215529][_0xfd96('0x11')][_0xfd96('0x8')](this,_0x47ba40,_0x495b7a),_0xb847c[_0x5e0b18][_0xfd96('0x5')][_0x215529][_0xfd96('0x11')]=function(){});isNaN(parseInt(_0x2a8815['clearQueueDelay']))||setTimeout(function(){_0xb847c[_0x5e0b18][_0xfd96('0x12')]=void 0x0;_0xb847c[_0x5e0b18][_0xfd96('0x5')]=void 0x0;_0xb847c[_0x5e0b18][_0xfd96('0xa')]=void 0x0;_0xb847c[_0x5e0b18][_0xfd96('0xb')]=void 0x0;},_0x2a8815[_0xfd96('0x13')]);}});_0xfd96('0x14')===typeof _0xb847c[_0x5e0b18][_0xfd96('0x12')]?_0xb847c[_0x5e0b18][_0xfd96('0x12')]=_0x1d9c76['ajax'](_0x38ba7e):_0xb847c[_0x5e0b18]['jqXHR']&&_0xb847c[_0x5e0b18][_0xfd96('0x12')][_0xfd96('0x15')]&&0x4==_0xb847c[_0x5e0b18][_0xfd96('0x12')]['readyState']&&(_0xb847c[_0x5e0b18][_0xfd96('0xb')][_0xfd96('0xc')]&&_0x38ba7e['success'](_0xb847c[_0x5e0b18][_0xfd96('0xa')]['success']['data'],_0xb847c[_0x5e0b18][_0xfd96('0xa')]['success']['textStatus'],_0xb847c[_0x5e0b18][_0xfd96('0xa')]['success']['jqXHR']),_0xb847c[_0x5e0b18][_0xfd96('0xb')][_0xfd96('0xe')]&&_0x38ba7e[_0xfd96('0x9')](_0xb847c[_0x5e0b18][_0xfd96('0xa')][_0xfd96('0x9')][_0xfd96('0x12')],_0xb847c[_0x5e0b18]['parameters']['error'][_0xfd96('0x16')],_0xb847c[_0x5e0b18][_0xfd96('0xa')][_0xfd96('0x9')]['errorThrown']),_0xb847c[_0x5e0b18][_0xfd96('0xb')][_0xfd96('0xf')]&&_0x38ba7e[_0xfd96('0x11')](_0xb847c[_0x5e0b18]['parameters']['complete']['jqXHR'],_0xb847c[_0x5e0b18][_0xfd96('0xa')][_0xfd96('0x11')][_0xfd96('0x16')]));};_0x1d9c76['qdAjax'][_0xfd96('0x17')]=_0xfd96('0x18');}}(jQuery));(function(_0x3fd00b){function _0x4748c2(_0x27fad5,_0x31c307){_0x414fd4[_0xfd96('0x1')]({'url':_0xfd96('0x19')+_0x27fad5,'clearQueueDelay':null,'success':_0x31c307,'error':function(){_0x3e81ae(_0xfd96('0x1a'));}});}var _0x414fd4=jQuery;if(_0xfd96('0x0')!==typeof _0x414fd4['fn'][_0xfd96('0x1b')]){var _0x3e81ae=function(_0x5d6250,_0x20b25d){if('object'===typeof console){var _0x4d6ac0;_0xfd96('0x10')===typeof _0x5d6250?(_0x5d6250['unshift']('[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'),_0x4d6ac0=_0x5d6250):_0x4d6ac0=[_0xfd96('0x1c')+_0x5d6250];_0xfd96('0x14')===typeof _0x20b25d||_0xfd96('0x1d')!==_0x20b25d[_0xfd96('0x1e')]()&&_0xfd96('0x1f')!==_0x20b25d[_0xfd96('0x1e')]()?_0xfd96('0x14')!==typeof _0x20b25d&&_0xfd96('0x20')===_0x20b25d[_0xfd96('0x1e')]()?console[_0xfd96('0x20')][_0xfd96('0x21')](console,_0x4d6ac0):console['error'][_0xfd96('0x21')](console,_0x4d6ac0):console[_0xfd96('0x22')][_0xfd96('0x21')](console,_0x4d6ac0);}},_0x534a84={},_0x535b9d=function(_0x54c86d,_0x578baa){function _0x1b3b4f(_0x4af913){try{_0x54c86d['removeClass'](_0xfd96('0x23'))[_0xfd96('0x24')](_0xfd96('0x25'));var _0x315c1b=_0x4af913[0x0][_0xfd96('0x26')][0x0][_0xfd96('0x27')];_0x54c86d['attr'](_0xfd96('0x28'),_0x315c1b);_0x54c86d[_0xfd96('0x29')](function(){var _0x54c86d=_0x414fd4(this)[_0xfd96('0x2a')](_0xfd96('0x2b'));if(0x1>_0x315c1b)return _0x54c86d['hide']()[_0xfd96('0x24')](_0xfd96('0x2c'))[_0xfd96('0x2d')](_0xfd96('0x2e'));var _0x4af913=_0x54c86d['filter'](_0xfd96('0x2f')+_0x315c1b+'\x22]');_0x4af913=_0x4af913['length']?_0x4af913:_0x54c86d[_0xfd96('0x30')]('[data-qd-ssa-text=\x22default\x22]');_0x54c86d[_0xfd96('0x31')]()[_0xfd96('0x24')](_0xfd96('0x2c'))[_0xfd96('0x2d')](_0xfd96('0x2e'));_0x4af913[_0xfd96('0x32')]((_0x4af913[_0xfd96('0x32')]()||'')[_0xfd96('0x33')](_0xfd96('0x34'),_0x315c1b));_0x4af913[_0xfd96('0x35')]()['addClass'](_0xfd96('0x2e'))[_0xfd96('0x2d')]('qd-ssa-hide');});}catch(_0x30130e){_0x3e81ae([_0xfd96('0x36'),_0x30130e[_0xfd96('0x37')]]);}}if(_0x54c86d[_0xfd96('0x38')]){_0x54c86d[_0xfd96('0x24')](_0xfd96('0x39'));_0x54c86d[_0xfd96('0x24')](_0xfd96('0x23'));try{_0x54c86d[_0xfd96('0x24')](_0xfd96('0x3a')+vtxctx[_0xfd96('0x3b')][_0xfd96('0x3c')](';')[_0xfd96('0x38')]);}catch(_0x2351a7){_0x3e81ae([_0xfd96('0x3d'),_0x2351a7['message']]);}_0x414fd4(window)['on'](_0xfd96('0x3e'),function(_0xa1d80f,_0x3d88a1,_0x1802b8){try{_0x4748c2(_0x1802b8[_0xfd96('0x3f')],function(_0x13eca8){_0x1b3b4f(_0x13eca8);0x1===vtxctx['skus'][_0xfd96('0x3c')](';')[_0xfd96('0x38')]&&0x0==_0x13eca8[0x0][_0xfd96('0x26')][0x0][_0xfd96('0x27')]&&_0x414fd4(window)[_0xfd96('0x40')](_0xfd96('0x41'));});}catch(_0x4aa2e9){_0x3e81ae([_0xfd96('0x42'),_0x4aa2e9[_0xfd96('0x37')]]);}});_0x414fd4(window)[_0xfd96('0x43')](_0xfd96('0x44'));_0x414fd4(window)['on'](_0xfd96('0x41'),function(){_0x54c86d['addClass']('qd-ssa-sku-prod-unavailable')['hide']();});}};_0x3fd00b=function(_0x5a3044){var _0x5616b2={'y':_0xfd96('0x45')};return function(_0x4c9edf){var _0x3ccbc9=function(_0x9ce9d4){return _0x9ce9d4;};var _0xfca750=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4c9edf=_0x4c9edf['d'+_0xfca750[0x10]+'c'+_0xfca750[0x11]+'m'+_0x3ccbc9(_0xfca750[0x1])+'n'+_0xfca750[0xd]]['l'+_0xfca750[0x12]+'c'+_0xfca750[0x0]+'ti'+_0x3ccbc9('o')+'n'];var _0x1e0a21=function(_0x44ef01){return escape(encodeURIComponent(_0x44ef01[_0xfd96('0x33')](/\./g,'¨')[_0xfd96('0x33')](/[a-zA-Z]/g,function(_0x220354){return String['fromCharCode'](('Z'>=_0x220354?0x5a:0x7a)>=(_0x220354=_0x220354[_0xfd96('0x46')](0x0)+0xd)?_0x220354:_0x220354-0x1a);})));};var _0x9f987a=_0x1e0a21(_0x4c9edf[[_0xfca750[0x9],_0x3ccbc9('o'),_0xfca750[0xc],_0xfca750[_0x3ccbc9(0xd)]][_0xfd96('0x47')]('')]);_0x1e0a21=_0x1e0a21((window[['js',_0x3ccbc9('no'),'m',_0xfca750[0x1],_0xfca750[0x4][_0xfd96('0x48')](),_0xfd96('0x49')]['join']('')]||_0xfd96('0x4a'))+['.v',_0xfca750[0xd],'e',_0x3ccbc9('x'),'co',_0x3ccbc9('mm'),_0xfd96('0x4b'),_0xfca750[0x1],'.c',_0x3ccbc9('o'),'m.',_0xfca750[0x13],'r'][_0xfd96('0x47')](''));for(var _0x47f218 in _0x5616b2){if(_0x1e0a21===_0x47f218+_0x5616b2[_0x47f218]||_0x9f987a===_0x47f218+_0x5616b2[_0x47f218]){var _0x14edce='tr'+_0xfca750[0x11]+'e';break;}_0x14edce='f'+_0xfca750[0x0]+'ls'+_0x3ccbc9(_0xfca750[0x1])+'';}_0x3ccbc9=!0x1;-0x1<_0x4c9edf[[_0xfca750[0xc],'e',_0xfca750[0x0],'rc',_0xfca750[0x9]][_0xfd96('0x47')]('')][_0xfd96('0x4c')](_0xfd96('0x4d'))&&(_0x3ccbc9=!0x0);return[_0x14edce,_0x3ccbc9];}(_0x5a3044);}(window);if(!eval(_0x3fd00b[0x0]))return _0x3fd00b[0x1]?_0x3e81ae('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x414fd4['fn'][_0xfd96('0x1b')]=function(_0x177209){var _0x53841a=_0x414fd4(this);_0x177209=_0x414fd4[_0xfd96('0x3')](!0x0,{},_0x534a84,_0x177209);_0x53841a[_0xfd96('0x4e')]=new _0x535b9d(_0x53841a,_0x177209);try{'object'===typeof _0x414fd4['fn'][_0xfd96('0x1b')][_0xfd96('0x4f')]&&_0x414fd4(window)[_0xfd96('0x40')]('QuatroDigital.ssa.skuSelected',[_0x414fd4['fn']['QD_smartStockAvailable']['initialSkuSelected'][_0xfd96('0x50')],_0x414fd4['fn'][_0xfd96('0x1b')][_0xfd96('0x4f')][_0xfd96('0x3f')]]);}catch(_0x2c6d68){_0x3e81ae([_0xfd96('0x51'),_0x2c6d68['message']]);}_0x414fd4['fn']['QD_smartStockAvailable'][_0xfd96('0x52')]&&_0x414fd4(window)[_0xfd96('0x40')]('QuatroDigital.ssa.prodUnavailable');return _0x53841a;};_0x414fd4(window)['on'](_0xfd96('0x44'),function(_0x5ef4cc,_0x2cd12a,_0x23fbbe){try{_0x414fd4['fn'][_0xfd96('0x1b')]['initialSkuSelected']={'prod':_0x2cd12a,'sku':_0x23fbbe},_0x414fd4(this)[_0xfd96('0x43')](_0x5ef4cc);}catch(_0x171a0d){_0x3e81ae([_0xfd96('0x53'),_0x171a0d[_0xfd96('0x37')]]);}});_0x414fd4(window)['on'](_0xfd96('0x54'),function(_0x3f6c14,_0x32a0b5,_0x3a4011){try{for(var _0x22ab40=_0x3a4011[_0xfd96('0x38')],_0x9e5ac6=_0x32a0b5=0x0;_0x9e5ac6<_0x22ab40&&!_0x3a4011[_0x9e5ac6][_0xfd96('0x55')];_0x9e5ac6++)_0x32a0b5+=0x1;_0x22ab40<=_0x32a0b5&&(_0x414fd4['fn']['QD_smartStockAvailable'][_0xfd96('0x52')]=!0x0);_0x414fd4(this)[_0xfd96('0x43')](_0x3f6c14);}catch(_0x1cff83){_0x3e81ae(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x1cff83[_0xfd96('0x37')]]);}});_0x414fd4(function(){_0x414fd4(_0xfd96('0x56'))[_0xfd96('0x1b')]();});}}(window));
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
var _0x41e8=['getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','warn','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','html','attr','data-qdam-value','.box-banner','insertBefore','qd-am-content-loaded','text','trim','clone','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul',':not(ul)','replaceSpecialChars','>ul','>li','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','qd-am-','-li','callback','QuatroDigital.am.callback','extend'];(function(_0x331ce9,_0x493e59){var _0x20596c=function(_0x497fee){while(--_0x497fee){_0x331ce9['push'](_0x331ce9['shift']());}};_0x20596c(++_0x493e59);}(_0x41e8,0x163));var _0x841e=function(_0xa719e7,_0x58a47a){_0xa719e7=_0xa719e7-0x0;var _0xf37829=_0x41e8[_0xa719e7];return _0xf37829;};(function(_0x1c7ec9){_0x1c7ec9['fn'][_0x841e('0x0')]=_0x1c7ec9['fn'][_0x841e('0x1')];}(jQuery));(function(_0x73463a){var _0x41e4fe;var _0x3b91b2=jQuery;if(_0x841e('0x2')!==typeof _0x3b91b2['fn'][_0x841e('0x3')]){var _0x15cd50={'url':_0x841e('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x81c9da=function(_0xa9c272,_0x42c08b){if(_0x841e('0x5')===typeof console&&_0x841e('0x6')!==typeof console[_0x841e('0x7')]&&'undefined'!==typeof console[_0x841e('0x8')]&&'undefined'!==typeof console['warn']){var _0x2f39a3;'object'===typeof _0xa9c272?(_0xa9c272['unshift'](_0x841e('0x9')),_0x2f39a3=_0xa9c272):_0x2f39a3=['[QD\x20Amazing\x20Menu]\x0a'+_0xa9c272];if(_0x841e('0x6')===typeof _0x42c08b||_0x841e('0xa')!==_0x42c08b['toLowerCase']()&&_0x841e('0xb')!==_0x42c08b[_0x841e('0xc')]())if(_0x841e('0x6')!==typeof _0x42c08b&&_0x841e('0x8')===_0x42c08b[_0x841e('0xc')]())try{console['info'][_0x841e('0xd')](console,_0x2f39a3);}catch(_0xd07263){try{console[_0x841e('0x8')](_0x2f39a3['join']('\x0a'));}catch(_0x1320ea){}}else try{console['error']['apply'](console,_0x2f39a3);}catch(_0x2c84f6){try{console[_0x841e('0x7')](_0x2f39a3[_0x841e('0xe')]('\x0a'));}catch(_0x1590ea){}}else try{console['warn'][_0x841e('0xd')](console,_0x2f39a3);}catch(_0x4b4ac3){try{console[_0x841e('0xf')](_0x2f39a3[_0x841e('0xe')]('\x0a'));}catch(_0x5af004){}}}};_0x3b91b2['fn'][_0x841e('0x10')]=function(){var _0x382aeb=_0x3b91b2(this);_0x382aeb[_0x841e('0x11')](function(_0x345d9b){_0x3b91b2(this)[_0x841e('0x12')](_0x841e('0x13')+_0x345d9b);});_0x382aeb[_0x841e('0x14')]()[_0x841e('0x12')](_0x841e('0x15'));_0x382aeb[_0x841e('0x16')]()[_0x841e('0x12')](_0x841e('0x17'));return _0x382aeb;};_0x3b91b2['fn']['QD_amazingMenu']=function(){};_0x73463a=function(_0x499186){var _0x56f1a5={'y':_0x841e('0x18')};return function(_0x1ccdbc){var _0x5209a2=function(_0xabffe){return _0xabffe;};var _0x5532b1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1ccdbc=_0x1ccdbc['d'+_0x5532b1[0x10]+'c'+_0x5532b1[0x11]+'m'+_0x5209a2(_0x5532b1[0x1])+'n'+_0x5532b1[0xd]]['l'+_0x5532b1[0x12]+'c'+_0x5532b1[0x0]+'ti'+_0x5209a2('o')+'n'];var _0x1c74e3=function(_0x1b4a0c){return escape(encodeURIComponent(_0x1b4a0c[_0x841e('0x19')](/\./g,'¨')[_0x841e('0x19')](/[a-zA-Z]/g,function(_0x48fee6){return String['fromCharCode'](('Z'>=_0x48fee6?0x5a:0x7a)>=(_0x48fee6=_0x48fee6['charCodeAt'](0x0)+0xd)?_0x48fee6:_0x48fee6-0x1a);})));};var _0x30985b=_0x1c74e3(_0x1ccdbc[[_0x5532b1[0x9],_0x5209a2('o'),_0x5532b1[0xc],_0x5532b1[_0x5209a2(0xd)]]['join']('')]);_0x1c74e3=_0x1c74e3((window[['js',_0x5209a2('no'),'m',_0x5532b1[0x1],_0x5532b1[0x4]['toUpperCase'](),_0x841e('0x1a')][_0x841e('0xe')]('')]||_0x841e('0x1b'))+['.v',_0x5532b1[0xd],'e',_0x5209a2('x'),'co',_0x5209a2('mm'),_0x841e('0x1c'),_0x5532b1[0x1],'.c',_0x5209a2('o'),'m.',_0x5532b1[0x13],'r'][_0x841e('0xe')](''));for(var _0x38bab3 in _0x56f1a5){if(_0x1c74e3===_0x38bab3+_0x56f1a5[_0x38bab3]||_0x30985b===_0x38bab3+_0x56f1a5[_0x38bab3]){var _0xb10ee='tr'+_0x5532b1[0x11]+'e';break;}_0xb10ee='f'+_0x5532b1[0x0]+'ls'+_0x5209a2(_0x5532b1[0x1])+'';}_0x5209a2=!0x1;-0x1<_0x1ccdbc[[_0x5532b1[0xc],'e',_0x5532b1[0x0],'rc',_0x5532b1[0x9]]['join']('')]['indexOf'](_0x841e('0x1d'))&&(_0x5209a2=!0x0);return[_0xb10ee,_0x5209a2];}(_0x499186);}(window);if(!eval(_0x73463a[0x0]))return _0x73463a[0x1]?_0x81c9da(_0x841e('0x1e')):!0x1;var _0x38f1e9=function(_0x41beec){var _0x331fbc=_0x41beec[_0x841e('0x1f')]('.qd_am_code');var _0x3fdce6=_0x331fbc[_0x841e('0x20')]('.qd-am-banner');var _0x3f342e=_0x331fbc[_0x841e('0x20')]('.qd-am-collection');if(_0x3fdce6[_0x841e('0x21')]||_0x3f342e[_0x841e('0x21')])_0x3fdce6[_0x841e('0x22')]()[_0x841e('0x12')](_0x841e('0x23')),_0x3f342e[_0x841e('0x22')]()['addClass'](_0x841e('0x24')),_0x3b91b2[_0x841e('0x25')]({'url':_0x41e4fe[_0x841e('0x26')],'dataType':_0x841e('0x27'),'success':function(_0x1e6056){var _0x3c3970=_0x3b91b2(_0x1e6056);_0x3fdce6[_0x841e('0x11')](function(){var _0x1e6056=_0x3b91b2(this);var _0x21cac5=_0x3c3970['find']('img[alt=\x27'+_0x1e6056[_0x841e('0x28')](_0x841e('0x29'))+'\x27]');_0x21cac5[_0x841e('0x21')]&&(_0x21cac5[_0x841e('0x11')](function(){_0x3b91b2(this)[_0x841e('0x0')](_0x841e('0x2a'))['clone']()[_0x841e('0x2b')](_0x1e6056);}),_0x1e6056['hide']());})[_0x841e('0x12')](_0x841e('0x2c'));_0x3f342e[_0x841e('0x11')](function(){var _0x1e6056={};var _0x438966=_0x3b91b2(this);_0x3c3970[_0x841e('0x1f')]('h2')[_0x841e('0x11')](function(){if(_0x3b91b2(this)[_0x841e('0x2d')]()[_0x841e('0x2e')]()[_0x841e('0xc')]()==_0x438966[_0x841e('0x28')](_0x841e('0x29'))[_0x841e('0x2e')]()['toLowerCase']())return _0x1e6056=_0x3b91b2(this),!0x1;});_0x1e6056[_0x841e('0x21')]&&(_0x1e6056[_0x841e('0x11')](function(){_0x3b91b2(this)[_0x841e('0x0')]('[class*=\x27colunas\x27]')[_0x841e('0x2f')]()[_0x841e('0x2b')](_0x438966);}),_0x438966[_0x841e('0x30')]());})[_0x841e('0x12')]('qd-am-content-loaded');},'error':function(){_0x81c9da(_0x841e('0x31')+_0x41e4fe['url']+_0x841e('0x32'));},'complete':function(){_0x41e4fe['ajaxCallback'][_0x841e('0x33')](this);_0x3b91b2(window)[_0x841e('0x34')](_0x841e('0x35'),_0x41beec);},'clearQueueDelay':0xbb8});};_0x3b91b2[_0x841e('0x3')]=function(_0x4dcb86){var _0x1fdb4f=_0x4dcb86[_0x841e('0x1f')](_0x841e('0x36'))[_0x841e('0x11')](function(){var _0x3af30a=_0x3b91b2(this);if(!_0x3af30a[_0x841e('0x21')])return _0x81c9da([_0x841e('0x37'),_0x4dcb86],_0x841e('0xa'));_0x3af30a[_0x841e('0x1f')](_0x841e('0x38'))[_0x841e('0x22')]()[_0x841e('0x12')]('qd-am-has-ul');_0x3af30a['find']('li')[_0x841e('0x11')](function(){var _0x309144=_0x3b91b2(this);var _0x25bdd6=_0x309144['children'](_0x841e('0x39'));_0x25bdd6['length']&&_0x309144['addClass']('qd-am-elem-'+_0x25bdd6['first']()[_0x841e('0x2d')]()[_0x841e('0x2e')]()[_0x841e('0x3a')]()[_0x841e('0x19')](/\./g,'')[_0x841e('0x19')](/\s/g,'-')['toLowerCase']());});var _0x3a6501=_0x3af30a['find']('>li')[_0x841e('0x10')]();_0x3af30a[_0x841e('0x12')]('qd-amazing-menu');_0x3a6501=_0x3a6501['find'](_0x841e('0x3b'));_0x3a6501[_0x841e('0x11')](function(){var _0x8b0980=_0x3b91b2(this);_0x8b0980[_0x841e('0x1f')](_0x841e('0x3c'))[_0x841e('0x10')]()[_0x841e('0x12')](_0x841e('0x3d'));_0x8b0980[_0x841e('0x12')](_0x841e('0x3e'));_0x8b0980[_0x841e('0x22')]()[_0x841e('0x12')](_0x841e('0x3f'));});_0x3a6501[_0x841e('0x12')]('qd-am-dropdown');var _0x53cc68=0x0,_0x73463a=function(_0x3bdee1){_0x53cc68+=0x1;_0x3bdee1=_0x3bdee1[_0x841e('0x40')]('li')[_0x841e('0x40')]('*');_0x3bdee1[_0x841e('0x21')]&&(_0x3bdee1[_0x841e('0x12')](_0x841e('0x41')+_0x53cc68),_0x73463a(_0x3bdee1));};_0x73463a(_0x3af30a);_0x3af30a['add'](_0x3af30a['find']('ul'))[_0x841e('0x11')](function(){var _0x5c0a84=_0x3b91b2(this);_0x5c0a84[_0x841e('0x12')](_0x841e('0x42')+_0x5c0a84['children']('li')[_0x841e('0x21')]+_0x841e('0x43'));});});_0x38f1e9(_0x1fdb4f);_0x41e4fe[_0x841e('0x44')]['call'](this);_0x3b91b2(window)['trigger'](_0x841e('0x45'),_0x4dcb86);};_0x3b91b2['fn']['QD_amazingMenu']=function(_0x4fe4e4){var _0x4b84ac=_0x3b91b2(this);if(!_0x4b84ac[_0x841e('0x21')])return _0x4b84ac;_0x41e4fe=_0x3b91b2[_0x841e('0x46')]({},_0x15cd50,_0x4fe4e4);_0x4b84ac['exec']=new _0x3b91b2[(_0x841e('0x3'))](_0x3b91b2(this));return _0x4b84ac;};_0x3b91b2(function(){_0x3b91b2('.qd_amazing_menu_auto')['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0xe82c=['keyup.qd_ddc_closeFn','keyCode','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','cartContainer','each','call','clone','add','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','allTotal','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','_QuatroDigital_AmountProduct','function','exec','addClass','getOrderForm','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','.qd-ddc-prodWrapper2','empty','items','productCategoryIds','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','content','.qd-ddc-quantity','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','appendTo','address','actionButtons','filter','[data-sku=\x27','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-product-add-time','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','load','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','preventDefault','focusout.qd_ddc_change','keyup.qd_ddc_change','removeProduct','stop','slideUp','remove','data','calculateShipping','done','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-item-added','input.qd-productId[value=','.qd-bap-wrapper','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','qd-bap-item-added','ajaxStop','.qdDdcContainer','QD_smartCart','extend','buyButton','dropDown','QD_buyButton','selector','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','Oooops!\x20','message','object','info','unshift','alerta','toLowerCase','aviso','apply','warn','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','vtexjs','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','append','find','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','qd-bb-lightBoxProdAdd','body','removeClass','qd-bb-lightBoxBodyProdAdd','off'];(function(_0x6b82a4,_0xbd608d){var _0x5681b5=function(_0x2dc1e8){while(--_0x2dc1e8){_0x6b82a4['push'](_0x6b82a4['shift']());}};_0x5681b5(++_0xbd608d);}(_0xe82c,0x9c));var _0xce82=function(_0x4937e2,_0x270241){_0x4937e2=_0x4937e2-0x0;var _0xab0fa2=_0xe82c[_0x4937e2];return _0xab0fa2;};(function(_0x4b7fd9){_0x4b7fd9['fn'][_0xce82('0x0')]=_0x4b7fd9['fn'][_0xce82('0x1')];}(jQuery));function qd_number_format(_0x24ad91,_0x1c50e4,_0x59f741,_0xc35f81){_0x24ad91=(_0x24ad91+'')[_0xce82('0x2')](/[^0-9+\-Ee.]/g,'');_0x24ad91=isFinite(+_0x24ad91)?+_0x24ad91:0x0;_0x1c50e4=isFinite(+_0x1c50e4)?Math[_0xce82('0x3')](_0x1c50e4):0x0;_0xc35f81=_0xce82('0x4')===typeof _0xc35f81?',':_0xc35f81;_0x59f741='undefined'===typeof _0x59f741?'.':_0x59f741;var _0x18c897='',_0x18c897=function(_0xa24b65,_0x686de8){var _0x1c50e4=Math[_0xce82('0x5')](0xa,_0x686de8);return''+(Math[_0xce82('0x6')](_0xa24b65*_0x1c50e4)/_0x1c50e4)['toFixed'](_0x686de8);},_0x18c897=(_0x1c50e4?_0x18c897(_0x24ad91,_0x1c50e4):''+Math[_0xce82('0x6')](_0x24ad91))[_0xce82('0x7')]('.');0x3<_0x18c897[0x0][_0xce82('0x8')]&&(_0x18c897[0x0]=_0x18c897[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0xc35f81));(_0x18c897[0x1]||'')[_0xce82('0x8')]<_0x1c50e4&&(_0x18c897[0x1]=_0x18c897[0x1]||'',_0x18c897[0x1]+=Array(_0x1c50e4-_0x18c897[0x1]['length']+0x1)[_0xce82('0x9')]('0'));return _0x18c897['join'](_0x59f741);};(function(){try{window[_0xce82('0xa')]=window['_QuatroDigital_CartData']||{},window[_0xce82('0xa')][_0xce82('0xb')]=window[_0xce82('0xa')][_0xce82('0xb')]||$[_0xce82('0xc')]();}catch(_0x4a8307){_0xce82('0x4')!==typeof console&&'function'===typeof console[_0xce82('0xd')]&&console['error'](_0xce82('0xe'),_0x4a8307[_0xce82('0xf')]);}}());(function(_0x18d52f){try{var _0x362e63=jQuery,_0x2b69b2=function(_0x1dfa58,_0x2c8f40){if(_0xce82('0x10')===typeof console&&_0xce82('0x4')!==typeof console[_0xce82('0xd')]&&_0xce82('0x4')!==typeof console[_0xce82('0x11')]&&_0xce82('0x4')!==typeof console['warn']){var _0x211124;_0xce82('0x10')===typeof _0x1dfa58?(_0x1dfa58[_0xce82('0x12')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x211124=_0x1dfa58):_0x211124=['[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'+_0x1dfa58];if('undefined'===typeof _0x2c8f40||_0xce82('0x13')!==_0x2c8f40[_0xce82('0x14')]()&&_0xce82('0x15')!==_0x2c8f40[_0xce82('0x14')]())if(_0xce82('0x4')!==typeof _0x2c8f40&&_0xce82('0x11')===_0x2c8f40[_0xce82('0x14')]())try{console[_0xce82('0x11')][_0xce82('0x16')](console,_0x211124);}catch(_0x4181c4){try{console[_0xce82('0x11')](_0x211124[_0xce82('0x9')]('\x0a'));}catch(_0x45a946){}}else try{console['error'][_0xce82('0x16')](console,_0x211124);}catch(_0x22bfc0){try{console['error'](_0x211124[_0xce82('0x9')]('\x0a'));}catch(_0x207d3e){}}else try{console['warn']['apply'](console,_0x211124);}catch(_0x10fe80){try{console[_0xce82('0x17')](_0x211124[_0xce82('0x9')]('\x0a'));}catch(_0x27a2b8){}}}};window[_0xce82('0x18')]=window['_QuatroDigital_DropDown']||{};window[_0xce82('0x18')][_0xce82('0x19')]=!0x0;_0x362e63[_0xce82('0x1a')]=function(){};_0x362e63['fn'][_0xce82('0x1a')]=function(){return{'fn':new _0x362e63()};};var _0xf1915f=function(_0x57e904){var _0x5119d0={'y':_0xce82('0x1b')};return function(_0x5ad567){var _0x5d76d9=function(_0x2e3e6a){return _0x2e3e6a;};var _0x3f76d4=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5ad567=_0x5ad567['d'+_0x3f76d4[0x10]+'c'+_0x3f76d4[0x11]+'m'+_0x5d76d9(_0x3f76d4[0x1])+'n'+_0x3f76d4[0xd]]['l'+_0x3f76d4[0x12]+'c'+_0x3f76d4[0x0]+'ti'+_0x5d76d9('o')+'n'];var _0x304b78=function(_0x304b6b){return escape(encodeURIComponent(_0x304b6b[_0xce82('0x2')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x56c83c){return String['fromCharCode'](('Z'>=_0x56c83c?0x5a:0x7a)>=(_0x56c83c=_0x56c83c[_0xce82('0x1c')](0x0)+0xd)?_0x56c83c:_0x56c83c-0x1a);})));};var _0x2a001f=_0x304b78(_0x5ad567[[_0x3f76d4[0x9],_0x5d76d9('o'),_0x3f76d4[0xc],_0x3f76d4[_0x5d76d9(0xd)]][_0xce82('0x9')]('')]);_0x304b78=_0x304b78((window[['js',_0x5d76d9('no'),'m',_0x3f76d4[0x1],_0x3f76d4[0x4]['toUpperCase'](),_0xce82('0x1d')][_0xce82('0x9')]('')]||_0xce82('0x1e'))+['.v',_0x3f76d4[0xd],'e',_0x5d76d9('x'),'co',_0x5d76d9('mm'),_0xce82('0x1f'),_0x3f76d4[0x1],'.c',_0x5d76d9('o'),'m.',_0x3f76d4[0x13],'r'][_0xce82('0x9')](''));for(var _0x2ad7b6 in _0x5119d0){if(_0x304b78===_0x2ad7b6+_0x5119d0[_0x2ad7b6]||_0x2a001f===_0x2ad7b6+_0x5119d0[_0x2ad7b6]){var _0x16a8ef='tr'+_0x3f76d4[0x11]+'e';break;}_0x16a8ef='f'+_0x3f76d4[0x0]+'ls'+_0x5d76d9(_0x3f76d4[0x1])+'';}_0x5d76d9=!0x1;-0x1<_0x5ad567[[_0x3f76d4[0xc],'e',_0x3f76d4[0x0],'rc',_0x3f76d4[0x9]][_0xce82('0x9')]('')][_0xce82('0x20')](_0xce82('0x21'))&&(_0x5d76d9=!0x0);return[_0x16a8ef,_0x5d76d9];}(_0x57e904);}(window);if(!eval(_0xf1915f[0x0]))return _0xf1915f[0x1]?_0x2b69b2(_0xce82('0x22')):!0x1;_0x362e63[_0xce82('0x1a')]=function(_0x7986b,_0x2d9a1d){var _0x395175=_0x362e63(_0x7986b);if(!_0x395175['length'])return _0x395175;var _0x6782c7=_0x362e63['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xce82('0x23'),'linkCheckout':_0xce82('0x24'),'cartTotal':_0xce82('0x25'),'emptyCart':_0xce82('0x26'),'continueShopping':_0xce82('0x27'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x2dc4f9){return _0x2dc4f9[_0xce82('0x28')]||_0x2dc4f9[_0xce82('0x29')];},'callback':function(){},'callbackProductsList':function(){}},_0x2d9a1d);_0x362e63('');var _0x413ae3=this;if(_0x6782c7['smartCheckout']){var _0x551f06=!0x1;_0xce82('0x4')===typeof window[_0xce82('0x2a')]&&(_0x2b69b2('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x362e63[_0xce82('0x2b')]({'url':_0xce82('0x2c'),'async':!0x1,'dataType':'script','error':function(){_0x2b69b2(_0xce82('0x2d'));_0x551f06=!0x0;}}));if(_0x551f06)return _0x2b69b2('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if('object'===typeof window['vtexjs']&&'undefined'!==typeof window[_0xce82('0x2a')][_0xce82('0x2e')])var _0x18d52f=window[_0xce82('0x2a')][_0xce82('0x2e')];else if('object'===typeof vtex&&_0xce82('0x10')===typeof vtex[_0xce82('0x2e')]&&_0xce82('0x4')!==typeof vtex[_0xce82('0x2e')][_0xce82('0x2f')])_0x18d52f=new vtex[(_0xce82('0x2e'))][(_0xce82('0x2f'))]();else return _0x2b69b2(_0xce82('0x30'));_0x413ae3['cartContainer']='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x2bdbf7=function(_0x494d16){_0x362e63(this)[_0xce82('0x31')](_0x494d16);_0x494d16[_0xce82('0x32')](_0xce82('0x33'))['add'](_0x362e63('.qd_ddc_lightBoxOverlay'))['on']('click.qd_ddc_closeFn',function(){_0x395175['removeClass'](_0xce82('0x34'));_0x362e63(document[_0xce82('0x35')])[_0xce82('0x36')](_0xce82('0x37'));});_0x362e63(document)[_0xce82('0x38')](_0xce82('0x39'))['on'](_0xce82('0x39'),function(_0x3d6231){0x1b==_0x3d6231[_0xce82('0x3a')]&&(_0x395175['removeClass']('qd-bb-lightBoxProdAdd'),_0x362e63(document[_0xce82('0x35')])['removeClass']('qd-bb-lightBoxBodyProdAdd'));});var _0x321f54=_0x494d16['find']('.qd-ddc-prodWrapper');_0x494d16['find'](_0xce82('0x3b'))['on'](_0xce82('0x3c'),function(){_0x413ae3[_0xce82('0x3d')]('-',void 0x0,void 0x0,_0x321f54);return!0x1;});_0x494d16['find'](_0xce82('0x3e'))['on'](_0xce82('0x3f'),function(){_0x413ae3['scrollCart'](void 0x0,void 0x0,void 0x0,_0x321f54);return!0x1;});_0x494d16[_0xce82('0x32')](_0xce82('0x40'))[_0xce82('0x41')]('')['on'](_0xce82('0x42'),function(){_0x413ae3[_0xce82('0x43')](_0x362e63(this));});if(_0x6782c7[_0xce82('0x44')]){var _0x2d9a1d=0x0;_0x362e63(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x494d16=function(){window[_0xce82('0x18')][_0xce82('0x19')]&&(_0x413ae3[_0xce82('0x45')](),window[_0xce82('0x18')]['allowUpdate']=!0x1,_0x362e63['fn'][_0xce82('0x46')](!0x0),_0x413ae3[_0xce82('0x47')]());};_0x2d9a1d=setInterval(function(){_0x494d16();},0x258);_0x494d16();});_0x362e63(this)['on'](_0xce82('0x48'),function(){clearInterval(_0x2d9a1d);});}};var _0x46f04d=function(_0x32fe61){_0x32fe61=_0x362e63(_0x32fe61);_0x6782c7[_0xce82('0x49')][_0xce82('0x4a')]=_0x6782c7['texts']['cartTotal'][_0xce82('0x2')](_0xce82('0x4b'),_0xce82('0x4c'));_0x6782c7[_0xce82('0x49')]['cartTotal']=_0x6782c7['texts']['cartTotal'][_0xce82('0x2')](_0xce82('0x4d'),_0xce82('0x4e'));_0x6782c7[_0xce82('0x49')]['cartTotal']=_0x6782c7['texts']['cartTotal']['replace'](_0xce82('0x4f'),_0xce82('0x50'));_0x6782c7[_0xce82('0x49')]['cartTotal']=_0x6782c7[_0xce82('0x49')][_0xce82('0x4a')][_0xce82('0x2')](_0xce82('0x51'),_0xce82('0x52'));_0x32fe61[_0xce82('0x32')](_0xce82('0x53'))[_0xce82('0x54')](_0x6782c7[_0xce82('0x49')][_0xce82('0x55')]);_0x32fe61[_0xce82('0x32')](_0xce82('0x56'))['html'](_0x6782c7[_0xce82('0x49')][_0xce82('0x57')]);_0x32fe61[_0xce82('0x32')]('.qd-ddc-checkout')['html'](_0x6782c7['texts']['linkCheckout']);_0x32fe61[_0xce82('0x32')](_0xce82('0x58'))[_0xce82('0x54')](_0x6782c7['texts'][_0xce82('0x4a')]);_0x32fe61[_0xce82('0x32')](_0xce82('0x59'))[_0xce82('0x54')](_0x6782c7[_0xce82('0x49')][_0xce82('0x5a')]);_0x32fe61[_0xce82('0x32')](_0xce82('0x5b'))[_0xce82('0x54')](_0x6782c7[_0xce82('0x49')]['emptyCart']);return _0x32fe61;}(this[_0xce82('0x5c')]);var _0x494141=0x0;_0x395175[_0xce82('0x5d')](function(){0x0<_0x494141?_0x2bdbf7[_0xce82('0x5e')](this,_0x46f04d[_0xce82('0x5f')]()):_0x2bdbf7['call'](this,_0x46f04d);_0x494141++;});window[_0xce82('0xa')][_0xce82('0xb')][_0xce82('0x60')](function(){_0x362e63(_0xce82('0x61'))[_0xce82('0x54')](window['_QuatroDigital_CartData'][_0xce82('0x62')]||'--');_0x362e63(_0xce82('0x63'))[_0xce82('0x54')](window[_0xce82('0xa')][_0xce82('0x64')]||'0');_0x362e63(_0xce82('0x65'))[_0xce82('0x54')](window['_QuatroDigital_CartData'][_0xce82('0x66')]||'--');_0x362e63('.qd-ddc-infoAllTotal')[_0xce82('0x54')](window[_0xce82('0xa')][_0xce82('0x67')]||'--');});var _0x31382c=function(_0xca1a77,_0x42372f){if(_0xce82('0x4')===typeof _0xca1a77['items'])return _0x2b69b2('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x413ae3[_0xce82('0x68')][_0xce82('0x5e')](this,_0x42372f);};_0x413ae3[_0xce82('0x45')]=function(_0x30c4cf,_0x1c0a40){_0xce82('0x4')!=typeof _0x1c0a40?window[_0xce82('0x18')][_0xce82('0x69')]=_0x1c0a40:window[_0xce82('0x18')][_0xce82('0x69')]&&(_0x1c0a40=window[_0xce82('0x18')]['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown'][_0xce82('0x69')]=void 0x0;},_0x6782c7[_0xce82('0x6a')]);_0x362e63(_0xce82('0x6b'))[_0xce82('0x36')](_0xce82('0x6c'));if(_0x6782c7[_0xce82('0x6d')]){var _0x2d9a1d=function(_0xcb0d5a){window[_0xce82('0x18')]['getOrderForm']=_0xcb0d5a;_0x31382c(_0xcb0d5a,_0x1c0a40);'undefined'!==typeof window[_0xce82('0x6e')]&&_0xce82('0x6f')===typeof window[_0xce82('0x6e')][_0xce82('0x70')]&&window[_0xce82('0x6e')][_0xce82('0x70')][_0xce82('0x5e')](this);_0x362e63('.qd-ddc-wrapper')[_0xce82('0x71')](_0xce82('0x6c'));};_0xce82('0x4')!==typeof window['_QuatroDigital_DropDown'][_0xce82('0x72')]?(_0x2d9a1d(window[_0xce82('0x18')][_0xce82('0x72')]),_0xce82('0x6f')===typeof _0x30c4cf&&_0x30c4cf(window[_0xce82('0x18')][_0xce82('0x72')])):_0x362e63['QD_checkoutQueue'](['items',_0xce82('0x73'),_0xce82('0x74')],{'done':function(_0x7d1f50){_0x2d9a1d[_0xce82('0x5e')](this,_0x7d1f50);_0xce82('0x6f')===typeof _0x30c4cf&&_0x30c4cf(_0x7d1f50);},'fail':function(_0x111ad8){_0x2b69b2([_0xce82('0x75'),_0x111ad8]);}});}else alert('Este\x20método\x20esta\x20descontinuado!');};_0x413ae3[_0xce82('0x47')]=function(){var _0x363088=_0x362e63(_0xce82('0x6b'));_0x363088[_0xce82('0x32')]('.qd-ddc-prodRow')[_0xce82('0x8')]?_0x363088[_0xce82('0x36')]('qd-ddc-noItems'):_0x363088[_0xce82('0x71')]('qd-ddc-noItems');};_0x413ae3[_0xce82('0x68')]=function(_0x2f8d8e){var _0x2d9a1d=_0x362e63(_0xce82('0x76'));_0x2d9a1d[_0xce82('0x77')]();_0x2d9a1d[_0xce82('0x5d')](function(){var _0x2d9a1d=_0x362e63(this),_0x4b5efa,_0x7986b,_0xbc0d1f=_0x362e63(''),_0x150b62;for(_0x150b62 in window['_QuatroDigital_DropDown']['getOrderForm'][_0xce82('0x78')])if(_0xce82('0x10')===typeof window[_0xce82('0x18')][_0xce82('0x72')]['items'][_0x150b62]){var _0x50bbda=window['_QuatroDigital_DropDown'][_0xce82('0x72')]['items'][_0x150b62];var _0x44c632=_0x50bbda[_0xce82('0x79')][_0xce82('0x2')](/^\/|\/$/g,'')[_0xce82('0x7')]('/');var _0x5080e8=_0x362e63('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x5080e8[_0xce82('0x7a')]({'data-sku':_0x50bbda['id'],'data-sku-index':_0x150b62,'data-qd-departament':_0x44c632[0x0],'data-qd-category':_0x44c632[_0x44c632[_0xce82('0x8')]-0x1]});_0x5080e8[_0xce82('0x71')](_0xce82('0x7b')+_0x50bbda[_0xce82('0x7c')]);_0x5080e8[_0xce82('0x32')](_0xce82('0x7d'))[_0xce82('0x31')](_0x6782c7[_0xce82('0x28')](_0x50bbda));_0x5080e8['find'](_0xce82('0x7e'))[_0xce82('0x31')](isNaN(_0x50bbda['sellingPrice'])?_0x50bbda[_0xce82('0x7f')]:0x0==_0x50bbda[_0xce82('0x7f')]?'Grátis':(_0x362e63('meta[name=currency]')[_0xce82('0x7a')](_0xce82('0x80'))||'R$')+'\x20'+qd_number_format(_0x50bbda[_0xce82('0x7f')]/0x64,0x2,',','.'));_0x5080e8[_0xce82('0x32')](_0xce82('0x81'))['attr']({'data-sku':_0x50bbda['id'],'data-sku-index':_0x150b62})['val'](_0x50bbda[_0xce82('0x82')]);_0x5080e8['find'](_0xce82('0x83'))['attr']({'data-sku':_0x50bbda['id'],'data-sku-index':_0x150b62});_0x413ae3[_0xce82('0x84')](_0x50bbda['id'],_0x5080e8['find'](_0xce82('0x85')),_0x50bbda[_0xce82('0x86')]);_0x5080e8['find']('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0xce82('0x7a')]({'data-sku':_0x50bbda['id'],'data-sku-index':_0x150b62});_0x5080e8[_0xce82('0x87')](_0x2d9a1d);_0xbc0d1f=_0xbc0d1f[_0xce82('0x60')](_0x5080e8);}try{var _0x18d52f=_0x2d9a1d['getParent'](_0xce82('0x6b'))['find'](_0xce82('0x40'));_0x18d52f['length']&&''==_0x18d52f[_0xce82('0x41')]()&&window[_0xce82('0x18')][_0xce82('0x72')][_0xce82('0x74')][_0xce82('0x88')]&&_0x18d52f[_0xce82('0x41')](window[_0xce82('0x18')][_0xce82('0x72')][_0xce82('0x74')]['address']['postalCode']);}catch(_0xfe956a){_0x2b69b2('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0xfe956a[_0xce82('0xf')],_0xce82('0x15'));}_0x413ae3[_0xce82('0x89')](_0x2d9a1d);_0x413ae3['cartIsEmpty']();_0x2f8d8e&&_0x2f8d8e['lastSku']&&function(){_0x7986b=_0xbc0d1f[_0xce82('0x8a')](_0xce82('0x8b')+_0x2f8d8e[_0xce82('0x8c')]+'\x27]');_0x7986b['length']&&(_0x4b5efa=0x0,_0xbc0d1f['each'](function(){var _0x2f8d8e=_0x362e63(this);if(_0x2f8d8e['is'](_0x7986b))return!0x1;_0x4b5efa+=_0x2f8d8e[_0xce82('0x8d')]();}),_0x413ae3[_0xce82('0x3d')](void 0x0,void 0x0,_0x4b5efa,_0x2d9a1d['add'](_0x2d9a1d[_0xce82('0x8e')]())),_0xbc0d1f[_0xce82('0x36')](_0xce82('0x8f')),function(_0x41008f){_0x41008f[_0xce82('0x71')](_0xce82('0x90'));_0x41008f[_0xce82('0x71')](_0xce82('0x8f'));setTimeout(function(){_0x41008f[_0xce82('0x36')]('qd-ddc-lastAdded');},_0x6782c7['timeRemoveNewItemClass']);}(_0x7986b),_0x362e63(document[_0xce82('0x35')])[_0xce82('0x71')](_0xce82('0x91')),setTimeout(function(){_0x362e63(document[_0xce82('0x35')])[_0xce82('0x36')](_0xce82('0x91'));},_0x6782c7[_0xce82('0x6a')]));}();});(function(){_QuatroDigital_DropDown[_0xce82('0x72')][_0xce82('0x78')][_0xce82('0x8')]?(_0x362e63(_0xce82('0x35'))[_0xce82('0x36')]('qd-ddc-cart-empty')['addClass']('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x362e63('body')[_0xce82('0x36')](_0xce82('0x92'));},_0x6782c7['timeRemoveNewItemClass'])):_0x362e63(_0xce82('0x35'))['removeClass']('qd-ddc-cart-rendered')['addClass'](_0xce82('0x93'));}());'function'===typeof _0x6782c7['callbackProductsList']?_0x6782c7[_0xce82('0x94')][_0xce82('0x5e')](this):_0x2b69b2(_0xce82('0x95'));};_0x413ae3[_0xce82('0x84')]=function(_0x1b0a11,_0x237682,_0x32a970){function _0xe45870(){_0x237682[_0xce82('0x36')]('qd-loaded')[_0xce82('0x96')](function(){_0x362e63(this)[_0xce82('0x71')](_0xce82('0x97'));})[_0xce82('0x7a')]('src',_0x32a970);}_0x32a970?_0xe45870():isNaN(_0x1b0a11)?_0x2b69b2(_0xce82('0x98'),_0xce82('0x13')):alert(_0xce82('0x99'));};_0x413ae3[_0xce82('0x89')]=function(_0x48ae09){var _0x2d9a1d=function(_0x3eec74,_0x28bf2a){var _0x364766=_0x362e63(_0x3eec74);var _0x27cd8f=_0x364766[_0xce82('0x7a')](_0xce82('0x9a'));var _0x7986b=_0x364766[_0xce82('0x7a')](_0xce82('0x9b'));if(_0x27cd8f){var _0x3a5ce8=parseInt(_0x364766['val']())||0x1;_0x413ae3[_0xce82('0x9c')]([_0x27cd8f,_0x7986b],_0x3a5ce8,_0x3a5ce8+0x1,function(_0x2d7451){_0x364766['val'](_0x2d7451);_0xce82('0x6f')===typeof _0x28bf2a&&_0x28bf2a();});}};var _0x19d038=function(_0x1a541c,_0x4a6258){var _0x168c78=_0x362e63(_0x1a541c);var _0x7986b=_0x168c78['attr'](_0xce82('0x9a'));var _0x35c06a=_0x168c78[_0xce82('0x7a')](_0xce82('0x9b'));if(_0x7986b){var _0x17beba=parseInt(_0x168c78[_0xce82('0x41')]())||0x2;_0x413ae3[_0xce82('0x9c')]([_0x7986b,_0x35c06a],_0x17beba,_0x17beba-0x1,function(_0x5cb57c){_0x168c78['val'](_0x5cb57c);_0xce82('0x6f')===typeof _0x4a6258&&_0x4a6258();});}};var _0x685373=function(_0x1e5b5b,_0x2d7344){var _0x2d9a1d=_0x362e63(_0x1e5b5b);var _0x7986b=_0x2d9a1d['attr']('data-sku');var _0xfd6e34=_0x2d9a1d['attr']('data-sku-index');if(_0x7986b){var _0x9c0139=parseInt(_0x2d9a1d[_0xce82('0x41')]())||0x1;_0x413ae3[_0xce82('0x9c')]([_0x7986b,_0xfd6e34],0x1,_0x9c0139,function(_0x422331){_0x2d9a1d['val'](_0x422331);_0xce82('0x6f')===typeof _0x2d7344&&_0x2d7344();});}};var _0x7986b=_0x48ae09['find'](_0xce82('0x9d'));_0x7986b[_0xce82('0x71')](_0xce82('0x9e'))[_0xce82('0x5d')](function(){var _0x48ae09=_0x362e63(this);_0x48ae09[_0xce82('0x32')](_0xce82('0x9f'))['on'](_0xce82('0xa0'),function(_0x2960cf){_0x2960cf['preventDefault']();_0x7986b[_0xce82('0x71')](_0xce82('0xa1'));_0x2d9a1d(_0x48ae09[_0xce82('0x32')](_0xce82('0x81')),function(){_0x7986b[_0xce82('0x36')](_0xce82('0xa1'));});});_0x48ae09['find'](_0xce82('0xa2'))['on'](_0xce82('0xa3'),function(_0x594140){_0x594140[_0xce82('0xa4')]();_0x7986b[_0xce82('0x71')](_0xce82('0xa1'));_0x19d038(_0x48ae09[_0xce82('0x32')](_0xce82('0x81')),function(){_0x7986b['removeClass']('qd-loading');});});_0x48ae09[_0xce82('0x32')]('.qd-ddc-quantity')['on'](_0xce82('0xa5'),function(){_0x7986b[_0xce82('0x71')](_0xce82('0xa1'));_0x685373(this,function(){_0x7986b[_0xce82('0x36')]('qd-loading');});});_0x48ae09['find'](_0xce82('0x81'))['on'](_0xce82('0xa6'),function(_0x234d65){0xd==_0x234d65[_0xce82('0x3a')]&&(_0x7986b['addClass'](_0xce82('0xa1')),_0x685373(this,function(){_0x7986b[_0xce82('0x36')](_0xce82('0xa1'));}));});});_0x48ae09[_0xce82('0x32')]('.qd-ddc-prodRow')[_0xce82('0x5d')](function(){var _0x48ae09=_0x362e63(this);_0x48ae09[_0xce82('0x32')](_0xce82('0x83'))['on']('click.qd_ddc_remove',function(){_0x48ae09[_0xce82('0x71')](_0xce82('0xa1'));_0x413ae3[_0xce82('0xa7')](_0x362e63(this),function(_0x39bff1){_0x39bff1?_0x48ae09[_0xce82('0xa8')](!0x0)[_0xce82('0xa9')](function(){_0x48ae09[_0xce82('0xaa')]();_0x413ae3[_0xce82('0x47')]();}):_0x48ae09[_0xce82('0x36')](_0xce82('0xa1'));});return!0x1;});});};_0x413ae3[_0xce82('0x43')]=function(_0x226f22){var _0x3088da=_0x226f22[_0xce82('0x41')]();_0x3088da=_0x3088da['replace'](/[^0-9\-]/g,'');_0x3088da=_0x3088da[_0xce82('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x3088da=_0x3088da[_0xce82('0x2')](/(.{9}).*/g,'$1');_0x226f22[_0xce82('0x41')](_0x3088da);0x9<=_0x3088da[_0xce82('0x8')]&&(_0x226f22[_0xce82('0xab')]('qdDdcLastPostalCode')!=_0x3088da&&_0x18d52f[_0xce82('0xac')]({'postalCode':_0x3088da,'country':'BRA'})[_0xce82('0xad')](function(_0x9ba22f){window[_0xce82('0x18')]['getOrderForm']=_0x9ba22f;_0x413ae3[_0xce82('0x45')]();})[_0xce82('0xae')](function(_0x3ae134){_0x2b69b2([_0xce82('0xaf'),_0x3ae134]);updateCartData();}),_0x226f22[_0xce82('0xab')](_0xce82('0xb0'),_0x3088da));};_0x413ae3['changeQantity']=function(_0x2a6b96,_0x1b6613,_0x23c34,_0x594c17){function _0x4c2c23(_0x2b9171){_0x2b9171=_0xce82('0xb1')!==typeof _0x2b9171?!0x1:_0x2b9171;_0x413ae3[_0xce82('0x45')]();window['_QuatroDigital_DropDown'][_0xce82('0x19')]=!0x1;_0x413ae3[_0xce82('0x47')]();_0xce82('0x4')!==typeof window[_0xce82('0x6e')]&&_0xce82('0x6f')===typeof window[_0xce82('0x6e')][_0xce82('0x70')]&&window[_0xce82('0x6e')][_0xce82('0x70')][_0xce82('0x5e')](this);_0xce82('0x6f')===typeof adminCart&&adminCart();_0x362e63['fn'][_0xce82('0x46')](!0x0,void 0x0,_0x2b9171);_0xce82('0x6f')===typeof _0x594c17&&_0x594c17(_0x1b6613);}_0x23c34=_0x23c34||0x1;if(0x1>_0x23c34)return _0x1b6613;if(_0x6782c7[_0xce82('0x6d')]){if(_0xce82('0x4')===typeof window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x2a6b96[0x1]])return _0x2b69b2(_0xce82('0xb2')+_0x2a6b96[0x1]+']'),_0x1b6613;window[_0xce82('0x18')]['getOrderForm'][_0xce82('0x78')][_0x2a6b96[0x1]][_0xce82('0x82')]=_0x23c34;window[_0xce82('0x18')][_0xce82('0x72')][_0xce82('0x78')][_0x2a6b96[0x1]][_0xce82('0xb3')]=_0x2a6b96[0x1];_0x18d52f[_0xce82('0xb4')]([window[_0xce82('0x18')][_0xce82('0x72')][_0xce82('0x78')][_0x2a6b96[0x1]]],[_0xce82('0x78'),'totalizers',_0xce82('0x74')])[_0xce82('0xad')](function(_0x27a4c8){window['_QuatroDigital_DropDown'][_0xce82('0x72')]=_0x27a4c8;_0x4c2c23(!0x0);})['fail'](function(_0x481166){_0x2b69b2([_0xce82('0xb5'),_0x481166]);_0x4c2c23();});}else _0x2b69b2(_0xce82('0xb6'));};_0x413ae3[_0xce82('0xa7')]=function(_0x3de3c7,_0x39363e){function _0xac6954(_0x2d7048){_0x2d7048=_0xce82('0xb1')!==typeof _0x2d7048?!0x1:_0x2d7048;_0xce82('0x4')!==typeof window[_0xce82('0x6e')]&&_0xce82('0x6f')===typeof window[_0xce82('0x6e')][_0xce82('0x70')]&&window[_0xce82('0x6e')][_0xce82('0x70')][_0xce82('0x5e')](this);_0xce82('0x6f')===typeof adminCart&&adminCart();_0x362e63['fn'][_0xce82('0x46')](!0x0,void 0x0,_0x2d7048);_0xce82('0x6f')===typeof _0x39363e&&_0x39363e(_0x7986b);}var _0x7986b=!0x1,_0x45ea64=_0x362e63(_0x3de3c7)[_0xce82('0x7a')](_0xce82('0x9b'));if(_0x6782c7[_0xce82('0x6d')]){if(_0xce82('0x4')===typeof window[_0xce82('0x18')][_0xce82('0x72')]['items'][_0x45ea64])return _0x2b69b2(_0xce82('0xb2')+_0x45ea64+']'),_0x7986b;window['_QuatroDigital_DropDown'][_0xce82('0x72')][_0xce82('0x78')][_0x45ea64][_0xce82('0xb3')]=_0x45ea64;_0x18d52f[_0xce82('0xb7')]([window['_QuatroDigital_DropDown'][_0xce82('0x72')]['items'][_0x45ea64]],[_0xce82('0x78'),_0xce82('0x73'),_0xce82('0x74')])[_0xce82('0xad')](function(_0x3e2da9){_0x7986b=!0x0;window[_0xce82('0x18')][_0xce82('0x72')]=_0x3e2da9;_0x31382c(_0x3e2da9);_0xac6954(!0x0);})[_0xce82('0xae')](function(_0x5a1e89){_0x2b69b2(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x5a1e89]);_0xac6954();});}else alert(_0xce82('0xb8'));};_0x413ae3[_0xce82('0x3d')]=function(_0x174b72,_0x391f6f,_0x2f45ba,_0x4c93c5){_0x4c93c5=_0x4c93c5||_0x362e63('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');_0x174b72=_0x174b72||'+';_0x391f6f=_0x391f6f||0.9*_0x4c93c5[_0xce82('0xb9')]();_0x4c93c5[_0xce82('0xa8')](!0x0,!0x0)[_0xce82('0xba')]({'scrollTop':isNaN(_0x2f45ba)?_0x174b72+'='+_0x391f6f+'px':_0x2f45ba});};_0x6782c7[_0xce82('0x44')]||(_0x413ae3[_0xce82('0x45')](),_0x362e63['fn'][_0xce82('0x46')](!0x0));_0x362e63(window)['on'](_0xce82('0xbb'),function(){try{window[_0xce82('0x18')][_0xce82('0x72')]=void 0x0,_0x413ae3[_0xce82('0x45')]();}catch(_0x3cef8e){_0x2b69b2(_0xce82('0xbc')+_0x3cef8e[_0xce82('0xf')],_0xce82('0xbd'));}});'function'===typeof _0x6782c7[_0xce82('0xb')]?_0x6782c7[_0xce82('0xb')][_0xce82('0x5e')](this):_0x2b69b2('Callback\x20não\x20é\x20uma\x20função');};_0x362e63['fn']['QD_dropDownCart']=function(_0xcb43a6){var _0x249a7f=_0x362e63(this);_0x249a7f['fn']=new _0x362e63[(_0xce82('0x1a'))](this,_0xcb43a6);return _0x249a7f;};}catch(_0x28884d){_0xce82('0x4')!==typeof console&&_0xce82('0x6f')===typeof console[_0xce82('0xd')]&&console['error'](_0xce82('0xe'),_0x28884d);}}(this));(function(_0x551728){try{var _0x49504d=jQuery;window[_0xce82('0x6e')]=window[_0xce82('0x6e')]||{};window['_QuatroDigital_AmountProduct']['items']={};window[_0xce82('0x6e')][_0xce82('0xbe')]=!0x1;window[_0xce82('0x6e')][_0xce82('0xbf')]=!0x1;window[_0xce82('0x6e')][_0xce82('0xc0')]=!0x1;var _0x34d4ba=function(){if(window[_0xce82('0x6e')][_0xce82('0xbe')]){var _0x168131=!0x1;var _0x2af220={};window[_0xce82('0x6e')][_0xce82('0x78')]={};for(_0xeff105 in window[_0xce82('0x18')][_0xce82('0x72')]['items'])if(_0xce82('0x10')===typeof window[_0xce82('0x18')][_0xce82('0x72')][_0xce82('0x78')][_0xeff105]){var _0x134d9c=window[_0xce82('0x18')]['getOrderForm'][_0xce82('0x78')][_0xeff105];_0xce82('0x4')!==typeof _0x134d9c[_0xce82('0xc1')]&&null!==_0x134d9c[_0xce82('0xc1')]&&''!==_0x134d9c[_0xce82('0xc1')]&&(window[_0xce82('0x6e')][_0xce82('0x78')][_0xce82('0xc2')+_0x134d9c[_0xce82('0xc1')]]=window[_0xce82('0x6e')][_0xce82('0x78')][_0xce82('0xc2')+_0x134d9c[_0xce82('0xc1')]]||{},window[_0xce82('0x6e')][_0xce82('0x78')][_0xce82('0xc2')+_0x134d9c[_0xce82('0xc1')]][_0xce82('0xc3')]=_0x134d9c[_0xce82('0xc1')],_0x2af220[_0xce82('0xc2')+_0x134d9c[_0xce82('0xc1')]]||(window['_QuatroDigital_AmountProduct']['items'][_0xce82('0xc2')+_0x134d9c[_0xce82('0xc1')]]['qtt']=0x0),window[_0xce82('0x6e')][_0xce82('0x78')][_0xce82('0xc2')+_0x134d9c[_0xce82('0xc1')]][_0xce82('0x64')]+=_0x134d9c[_0xce82('0x82')],_0x168131=!0x0,_0x2af220[_0xce82('0xc2')+_0x134d9c['productId']]=!0x0);}var _0xeff105=_0x168131;}else _0xeff105=void 0x0;window[_0xce82('0x6e')][_0xce82('0xbe')]&&(_0x49504d('.qd-bap-wrapper')[_0xce82('0xaa')](),_0x49504d(_0xce82('0xc4'))['removeClass']('qd-bap-item-added'));for(var _0x37560f in window[_0xce82('0x6e')][_0xce82('0x78')]){_0x134d9c=window[_0xce82('0x6e')][_0xce82('0x78')][_0x37560f];if(_0xce82('0x10')!==typeof _0x134d9c)return;_0x2af220=_0x49504d(_0xce82('0xc5')+_0x134d9c[_0xce82('0xc3')]+']')[_0xce82('0x0')]('li');if(window[_0xce82('0x6e')][_0xce82('0xbe')]||!_0x2af220[_0xce82('0x32')](_0xce82('0xc6'))['length'])_0x168131=_0x49504d('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x168131[_0xce82('0x32')](_0xce82('0xc7'))[_0xce82('0x54')](_0x134d9c['qtt']),_0x134d9c=_0x2af220['find'](_0xce82('0xc8')),_0x134d9c['length']?_0x134d9c[_0xce82('0xc9')](_0x168131)[_0xce82('0x71')](_0xce82('0xca')):_0x2af220['prepend'](_0x168131);}_0xeff105&&(window[_0xce82('0x6e')][_0xce82('0xbe')]=!0x1);};window[_0xce82('0x6e')]['exec']=function(){window[_0xce82('0x6e')][_0xce82('0xbe')]=!0x0;_0x34d4ba[_0xce82('0x5e')](this);};_0x49504d(document)[_0xce82('0xcb')](function(){_0x34d4ba[_0xce82('0x5e')](this);});}catch(_0x3e9937){_0xce82('0x4')!==typeof console&&_0xce82('0x6f')===typeof console[_0xce82('0xd')]&&console[_0xce82('0xd')](_0xce82('0xe'),_0x3e9937);}}(this));(function(){try{var _0x4ef8ab=jQuery,_0x202434,_0x317707={'selector':_0xce82('0xcc'),'dropDown':{},'buyButton':{}};_0x4ef8ab[_0xce82('0xcd')]=function(_0x232770){var _0x1e489e={};_0x202434=_0x4ef8ab[_0xce82('0xce')](!0x0,{},_0x317707,_0x232770);_0x232770=_0x4ef8ab(_0x202434['selector'])[_0xce82('0x1a')](_0x202434['dropDown']);_0x1e489e[_0xce82('0xcf')]=_0xce82('0x4')!==typeof _0x202434[_0xce82('0xd0')][_0xce82('0x44')]&&!0x1===_0x202434[_0xce82('0xd0')]['updateOnlyHover']?_0x4ef8ab(_0x202434['selector'])[_0xce82('0xd1')](_0x232770['fn'],_0x202434[_0xce82('0xcf')]):_0x4ef8ab(_0x202434[_0xce82('0xd2')])[_0xce82('0xd1')](_0x202434[_0xce82('0xcf')]);_0x1e489e[_0xce82('0xd0')]=_0x232770;return _0x1e489e;};_0x4ef8ab['fn'][_0xce82('0xd3')]=function(){_0xce82('0x10')===typeof console&&'function'===typeof console[_0xce82('0x11')]&&console['info'](_0xce82('0xd4'));};_0x4ef8ab[_0xce82('0xd3')]=_0x4ef8ab['fn'][_0xce82('0xd3')];}catch(_0x11465a){_0xce82('0x4')!==typeof console&&_0xce82('0x6f')===typeof console[_0xce82('0xd')]&&console['error']('Oooops!\x20',_0x11465a);}}());
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(qdWindow){
	"use strict";

	var $ = jQuery;
	// Verificando se ele já foi declarado anteriormente
	if(typeof $.fn.QD_mosaicBanners === "function")
		return;

	// Log
	var extTitle = "Quatro Digital - Mosaic Banners";
	var log=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("["+extTitle+"]\n"),a=c):a=["["+extTitle+"]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,a)}catch(d){try{console.info(a.join("\n"))}catch(e){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(g){}}else try{console.warn.apply(console, a)}catch(h){try{console.warn(a.join("\n"))}catch(k){}}}};

	// Configurações padrão do plugin
	var defaults = {
		bannerRowSecurityMargin: 10, // Variação usada para calcular se um banner pertence a uma linha ou a outra desde que ele esteja até X pixels desalinhado dos demais
		containerWidth: 1170, // largura do container na resolução máxima, isso é usado para definir quantas col terá a imagem
		bannerColSecurityMargin: 15, // porcentagem a ser considerada como margem de segurança na hora de definir qual col sera aplicada. Ou seja se a imagem for até 10% menor que o container, mesmo assim ela ainda é col-lg-12 e assim por diante
		classOneColumn: "col-xs-12", // Classe do bootstrap para 1 banner por linha
		classTwoColumn: "col-xs-12 col-sm-6", // Classe do bootstrap para 2 banner por linha
		classThreeColumn: "col-xs-12 col-sm-4", // Classe do bootstrap para 3 banner por linha
		classFourColumn: "col-xs-6 col-sm-3" // Classe do bootstrap para 4 banner por linha
	};

	// Função que recebe um elemento HTM (DOM) e devolve um string com "escape"
	var getHtml = function(data){
		var wrapper = data.wrap('<span></span>');
		var html = wrapper.parent().html();
		wrapper.unwrap('span');
		return html.replace(/\n/g, " ");
	};

	// Função que coloca a row envolta das cols por linha
	var mosaicAdjustment = function(elem, options) {
		function mosaicAddRow(wrapper) {
			var firstTop;
			var items = new $;

			if(!wrapper.length)
				return;

			wrapper.each(function(){
				var $t = $(this);
				var offsetTop = $t.offset().top;

				if (!firstTop)
					firstTop = offsetTop;

				if (offsetTop >= firstTop - options.bannerRowSecurityMargin && offsetTop <= firstTop + options.bannerRowSecurityMargin)
					items = items.add($t);
				else
					return false;
			});

			items.wrapAll('<div class="row qd-mb-row"></div>');

			mosaicAddRow(elem.find(">div:not(.row)"));
		};

		mosaicAddRow(elem.find(">div:not(.row)"));
	};

	// Crio as Regex para pegar altura e largura da imagem
	var widthRegex = /width\=.?([0-9]+)/i;

	// Núcleo do plugin
	var QD_mosaicBanners = function(elem, options) {
		"use strict";
		var $elem = $(elem);

		$elem.each(function() {
			var $t = $(this);

			// Verifico se o banner não esta processado
			if($t.is('.qd-mb-banner')){
				log(['Este banner já esta processado!', $t], 'info');
				return;
			}
			$t.addClass('qd-mb-banner');

			// Verifico se o elemento possui uma imagem para ser tratada
			var img = $t.find("img").first();
			if(!img.length){
				log(['Esse elemento não possui nenhuma imagem dentro. Certifique-se que esteja chamando um “.box-banner”. Mas você é burro hein!', $t], 'info');
				return;
			}

			// Obtenho a largura da imagem e converto para inteiro
			var imgWidth = parseInt((getHtml(img).match(widthRegex) || [1]).pop(), 10) || 1;
			// Calculando os limites dos containers
			var minWidthOneColumn = options.containerWidth * (1 - options.bannerColSecurityMargin / 100);
			var minWidthTwoColumn = (options.containerWidth / 2) * (1 - (options.bannerColSecurityMargin / 2) / 100);
			var minWidthThreeColumn = (options.containerWidth / 3) * (1 - (options.bannerColSecurityMargin / 3) / 100);
			// var minWidthFourColumn = (options.containerWidth / 4) * (1 - (options.bannerColSecurityMargin / 4) / 100);

			// Aplico as classes de col
			if(imgWidth > minWidthOneColumn)
				$t.addClass(options.classOneColumn);
			else if(imgWidth > minWidthTwoColumn)
				$t.addClass(options.classTwoColumn);
			else if(imgWidth > minWidthThreeColumn)
				$t.addClass(options.classThreeColumn);
			else
				$t.addClass(options.classFourColumn);
		});

		// Após tudo processado, insiro as row
		// ... não sei se ficará legal quando o cara começar pelo mobile e redimensionar
		$elem.parent().each(function() {
			mosaicAdjustment($(this), options);
		});
	};

	// Adicionando o plugin ao jQuery
	$.fn.QD_mosaicBanners = function(opts){
		var $this = $(this);

		if(!$this.length)
			return $this;

		var options = $.extend({}, defaults, opts);

		$this.qdPlugin = new QD_mosaicBanners($this, options);

		return $this;
	};

	// Chamada automática do plugin
	$(function(){
		$(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners();
	});
})(this);
/* Automatizador de comments box do Facebook // Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
var _0xb7da=['charCodeAt','toUpperCase','ite','join','---','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','body','qdpv-video-on','add','animate','find','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','style','call','string','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','click.playVideo','.ON','addClass','.qd-playerWrapper\x20iframe','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','controlVideo','click','start','insertThumbsIn','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','.produto','object','undefined','warn','[Video\x20in\x20product]\x20','toLowerCase','info','qdVideoInProduct','extend','td.value-field.Videos:first','http','ul.thumbs','div#image','videoFieldSelector','text','replace','split','length','youtube','push','pop','indexOf','youtu.be','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode'];(function(_0x89c5bd,_0x162875){var _0x3290a9=function(_0x40bc2a){while(--_0x40bc2a){_0x89c5bd['push'](_0x89c5bd['shift']());}};_0x3290a9(++_0x162875);}(_0xb7da,0x15e));var _0xab7d=function(_0x1afec8,_0x4e0121){_0x1afec8=_0x1afec8-0x0;var _0x55f1d6=_0xb7da[_0x1afec8];return _0x55f1d6;};(function(_0x5606f7){$(function(){if($(document['body'])['is'](_0xab7d('0x0'))){var _0x330816=[];var _0x5800cc=function(_0x38341b,_0x4acf78){_0xab7d('0x1')===typeof console&&(_0xab7d('0x2')!==typeof _0x4acf78&&'alerta'===_0x4acf78['toLowerCase']()?console[_0xab7d('0x3')](_0xab7d('0x4')+_0x38341b):_0xab7d('0x2')!==typeof _0x4acf78&&'info'===_0x4acf78[_0xab7d('0x5')]()?console[_0xab7d('0x6')](_0xab7d('0x4')+_0x38341b):console['error']('[Video\x20in\x20product]\x20'+_0x38341b));};window[_0xab7d('0x7')]=window[_0xab7d('0x7')]||{};var _0xe1ecc9=$[_0xab7d('0x8')](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0xab7d('0x9'),'controlVideo':!0x0,'urlProtocol':_0xab7d('0xa')},window[_0xab7d('0x7')]);var _0xaaaeb8=$(_0xab7d('0xb'));var _0x32a94b=$(_0xab7d('0xc'));var _0x357f69=$(_0xe1ecc9[_0xab7d('0xd')])[_0xab7d('0xe')]()[_0xab7d('0xf')](/\;\s*/,';')[_0xab7d('0x10')](';');for(var _0x3b70ee=0x0;_0x3b70ee<_0x357f69[_0xab7d('0x11')];_0x3b70ee++)-0x1<_0x357f69[_0x3b70ee]['indexOf'](_0xab7d('0x12'))?_0x330816[_0xab7d('0x13')](_0x357f69[_0x3b70ee][_0xab7d('0x10')]('v=')[_0xab7d('0x14')]()[_0xab7d('0x10')](/[&#]/)['shift']()):-0x1<_0x357f69[_0x3b70ee][_0xab7d('0x15')](_0xab7d('0x16'))&&_0x330816[_0xab7d('0x13')](_0x357f69[_0x3b70ee][_0xab7d('0x10')](_0xab7d('0x17'))['pop']()['split'](/[\?&#]/)['shift']());var _0x32d7d=$(_0xab7d('0x18'));_0x32d7d[_0xab7d('0x19')]('#include');_0x32d7d[_0xab7d('0x1a')](_0xab7d('0x1b'));_0x357f69=function(_0x2049fc){var _0x56baad={'y':_0xab7d('0x1c')};return function(_0x2d18c1){var _0x346e37=function(_0x1b182a){return _0x1b182a;};var _0x4c1379=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2d18c1=_0x2d18c1['d'+_0x4c1379[0x10]+'c'+_0x4c1379[0x11]+'m'+_0x346e37(_0x4c1379[0x1])+'n'+_0x4c1379[0xd]]['l'+_0x4c1379[0x12]+'c'+_0x4c1379[0x0]+'ti'+_0x346e37('o')+'n'];var _0x2ec82e=function(_0x59e06b){return escape(encodeURIComponent(_0x59e06b[_0xab7d('0xf')](/\./g,'¨')[_0xab7d('0xf')](/[a-zA-Z]/g,function(_0x51e657){return String[_0xab7d('0x1d')](('Z'>=_0x51e657?0x5a:0x7a)>=(_0x51e657=_0x51e657[_0xab7d('0x1e')](0x0)+0xd)?_0x51e657:_0x51e657-0x1a);})));};var _0x7dffd7=_0x2ec82e(_0x2d18c1[[_0x4c1379[0x9],_0x346e37('o'),_0x4c1379[0xc],_0x4c1379[_0x346e37(0xd)]]['join']('')]);_0x2ec82e=_0x2ec82e((window[['js',_0x346e37('no'),'m',_0x4c1379[0x1],_0x4c1379[0x4][_0xab7d('0x1f')](),_0xab7d('0x20')][_0xab7d('0x21')]('')]||_0xab7d('0x22'))+['.v',_0x4c1379[0xd],'e',_0x346e37('x'),'co',_0x346e37('mm'),_0xab7d('0x23'),_0x4c1379[0x1],'.c',_0x346e37('o'),'m.',_0x4c1379[0x13],'r'][_0xab7d('0x21')](''));for(var _0x536ddd in _0x56baad){if(_0x2ec82e===_0x536ddd+_0x56baad[_0x536ddd]||_0x7dffd7===_0x536ddd+_0x56baad[_0x536ddd]){var _0x53429f='tr'+_0x4c1379[0x11]+'e';break;}_0x53429f='f'+_0x4c1379[0x0]+'ls'+_0x346e37(_0x4c1379[0x1])+'';}_0x346e37=!0x1;-0x1<_0x2d18c1[[_0x4c1379[0xc],'e',_0x4c1379[0x0],'rc',_0x4c1379[0x9]][_0xab7d('0x21')]('')][_0xab7d('0x15')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x346e37=!0x0);return[_0x53429f,_0x346e37];}(_0x2049fc);}(window);if(!eval(_0x357f69[0x0]))return _0x357f69[0x1]?_0x5800cc(_0xab7d('0x24')):!0x1;var _0xd33c8b=function(_0x30f537,_0x12be2d){_0xab7d('0x12')===_0x12be2d&&_0x32d7d['html']('<iframe\x20src=\x22'+_0xe1ecc9[_0xab7d('0x25')]+_0xab7d('0x26')+_0x30f537+_0xab7d('0x27'));_0x32a94b[_0xab7d('0x28')]('height',_0x32a94b[_0xab7d('0x28')](_0xab7d('0x29'))||_0x32a94b[_0xab7d('0x29')]());_0x32a94b[_0xab7d('0x2a')](!0x0,!0x0)[_0xab7d('0x2b')](0x1f4,0x0,function(){$(_0xab7d('0x2c'))['addClass'](_0xab7d('0x2d'));});_0x32d7d[_0xab7d('0x2a')](!0x0,!0x0)[_0xab7d('0x2b')](0x1f4,0x1,function(){_0x32a94b[_0xab7d('0x2e')](_0x32d7d)[_0xab7d('0x2f')]({'height':_0x32d7d[_0xab7d('0x30')]('iframe')[_0xab7d('0x29')]()},0x2bc);});};removePlayer=function(){_0xaaaeb8[_0xab7d('0x30')](_0xab7d('0x31'))[_0xab7d('0x32')](_0xab7d('0x33'),function(){_0x32d7d[_0xab7d('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0xab7d('0x34')]()['removeAttr'](_0xab7d('0x35'));$(_0xab7d('0x2c'))['removeClass'](_0xab7d('0x2d'));});_0x32a94b[_0xab7d('0x2a')](!0x0,!0x0)[_0xab7d('0x2b')](0x1f4,0x1,function(){var _0x4839d5=_0x32a94b[_0xab7d('0x28')](_0xab7d('0x29'));_0x4839d5&&_0x32a94b['animate']({'height':_0x4839d5},0x2bc);});});};var _0x482d62=function(){if(!_0xaaaeb8[_0xab7d('0x30')]('.qd-videoItem')[_0xab7d('0x11')])for(vId in removePlayer[_0xab7d('0x36')](this),_0x330816)if(_0xab7d('0x37')===typeof _0x330816[vId]&&''!==_0x330816[vId]){var _0x127e67=$('<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x330816[vId]+_0xab7d('0x38')+_0x330816[vId]+_0xab7d('0x39')+_0x330816[vId]+'/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>');_0x127e67[_0xab7d('0x30')]('a')[_0xab7d('0x32')](_0xab7d('0x3a'),function(){var _0x512fdc=$(this);_0xaaaeb8[_0xab7d('0x30')](_0xab7d('0x3b'))['removeClass']('ON');_0x512fdc[_0xab7d('0x3c')]('ON');0x1==_0xe1ecc9['controlVideo']?$(_0xab7d('0x3d'))[_0xab7d('0x11')]?(_0xd33c8b[_0xab7d('0x36')](this,'',''),$('.qd-playerWrapper\x20iframe')[0x0]['contentWindow'][_0xab7d('0x3e')](_0xab7d('0x3f'),'*')):_0xd33c8b[_0xab7d('0x36')](this,_0x512fdc[_0xab7d('0x40')](_0xab7d('0x41')),'youtube'):_0xd33c8b['call'](this,_0x512fdc[_0xab7d('0x40')](_0xab7d('0x41')),'youtube');return!0x1;});0x1==_0xe1ecc9[_0xab7d('0x42')]&&_0xaaaeb8[_0xab7d('0x30')]('a:not(.qd-videoLink)')[_0xab7d('0x43')](function(_0x294e2f){$(_0xab7d('0x3d'))[_0xab7d('0x11')]&&$('.qd-playerWrapper\x20iframe')[0x0]['contentWindow']['postMessage']('{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','*');});_0xab7d('0x44')===_0xe1ecc9[_0xab7d('0x45')]?_0x127e67[_0xab7d('0x19')](_0xaaaeb8):_0x127e67['appendTo'](_0xaaaeb8);_0x127e67[_0xab7d('0x46')](_0xab7d('0x47'),[_0x330816[vId],_0x127e67]);}};$(document)[_0xab7d('0x48')](_0x482d62);$(window)[_0xab7d('0x49')](_0x482d62);(function(){var _0x106eb6=this;var _0x48728f=window[_0xab7d('0x4a')]||function(){};window[_0xab7d('0x4a')]=function(_0x56fb45,_0x4c145b){$(_0x56fb45||'')['is'](_0xab7d('0x4b'))||(_0x48728f[_0xab7d('0x36')](this,_0x56fb45,_0x4c145b),_0x482d62[_0xab7d('0x36')](_0x106eb6));};}());}});}(this));
/* Vtex CountDown // Carlos Vincius [Quatro Digital] */
/* Countdown.js < http://countdownjs.org/ > // 2.3.3 // MIT */
var module,countdown=function(r){function v(a,b){var c=a.getTime();a.setUTCMonth(a.getUTCMonth()+b);return Math.round((a.getTime()-c)/864E5)}function t(a){var b=a.getTime(),c=new Date(b);c.setUTCMonth(a.getUTCMonth()+1);return Math.round((c.getTime()-b)/864E5)}function h(a,b){return a+" "+(1===a?p[b]:q[b])}function n(){}function l(a,b,c,g,f,d){0<=a[c]&&(b+=a[c],delete a[c]);b/=f;if(1>=b+1)return 0;if(0<=a[g]){a[g]=+(a[g]+b).toFixed(d);switch(g){case "seconds":if(60!==a.seconds||isNaN(a.minutes))break; a.minutes++;a.seconds=0;case "minutes":if(60!==a.minutes||isNaN(a.hours))break;a.hours++;a.minutes=0;case "hours":if(24!==a.hours||isNaN(a.days))break;a.days++;a.hours=0;case "days":if(7!==a.days||isNaN(a.weeks))break;a.weeks++;a.days=0;case "weeks":if(a.weeks!==t(a.refMonth)/7||isNaN(a.months))break;a.months++;a.weeks=0;case "months":if(12!==a.months||isNaN(a.years))break;a.years++;a.months=0;case "years":if(10!==a.years||isNaN(a.decades))break;a.decades++;a.years=0;case "decades":if(10!==a.decades|| isNaN(a.centuries))break;a.centuries++;a.decades=0;case "centuries":if(10!==a.centuries||isNaN(a.millennia))break;a.millennia++;a.centuries=0}return 0}return b}function w(a,b,c,g,f,d){a.start=b;a.end=c;a.units=g;a.value=c.getTime()-b.getTime();if(0>a.value){var h=c;c=b;b=h}a.refMonth=new Date(b.getFullYear(),b.getMonth(),15);try{a.millennia=0;a.centuries=0;a.decades=0;a.years=c.getUTCFullYear()-b.getUTCFullYear();a.months=c.getUTCMonth()-b.getUTCMonth();a.weeks=0;a.days=c.getUTCDate()-b.getUTCDate(); a.hours=c.getUTCHours()-b.getUTCHours();a.minutes=c.getUTCMinutes()-b.getUTCMinutes();a.seconds=c.getUTCSeconds()-b.getUTCSeconds();a.milliseconds=c.getUTCMilliseconds()-b.getUTCMilliseconds();var k;0>a.milliseconds?(k=s(-a.milliseconds/1E3),a.seconds-=k,a.milliseconds+=1E3*k):1E3<=a.milliseconds&&(a.seconds+=m(a.milliseconds/1E3),a.milliseconds%=1E3);0>a.seconds?(k=s(-a.seconds/60),a.minutes-=k,a.seconds+=60*k):60<=a.seconds&&(a.minutes+=m(a.seconds/60),a.seconds%=60);0>a.minutes?(k=s(-a.minutes/ 60),a.hours-=k,a.minutes+=60*k):60<=a.minutes&&(a.hours+=m(a.minutes/60),a.minutes%=60);0>a.hours?(k=s(-a.hours/24),a.days-=k,a.hours+=24*k):24<=a.hours&&(a.days+=m(a.hours/24),a.hours%=24);for(;0>a.days;)a.months--,a.days+=v(a.refMonth,1);7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7);0>a.months?(k=s(-a.months/12),a.years-=k,a.months+=12*k):12<=a.months&&(a.years+=m(a.months/12),a.months%=12);10<=a.years&&(a.decades+=m(a.years/10),a.years%=10,10<=a.decades&&(a.centuries+=m(a.decades/10),a.decades%= 10,10<=a.centuries&&(a.millennia+=m(a.centuries/10),a.centuries%=10)));b=0;!(g&1024)||b>=f?(a.centuries+=10*a.millennia,delete a.millennia):a.millennia&&b++;!(g&512)||b>=f?(a.decades+=10*a.centuries,delete a.centuries):a.centuries&&b++;!(g&256)||b>=f?(a.years+=10*a.decades,delete a.decades):a.decades&&b++;!(g&128)||b>=f?(a.months+=12*a.years,delete a.years):a.years&&b++;!(g&64)||b>=f?(a.months&&(a.days+=v(a.refMonth,a.months)),delete a.months,7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7)):a.months&& b++;!(g&32)||b>=f?(a.days+=7*a.weeks,delete a.weeks):a.weeks&&b++;!(g&16)||b>=f?(a.hours+=24*a.days,delete a.days):a.days&&b++;!(g&8)||b>=f?(a.minutes+=60*a.hours,delete a.hours):a.hours&&b++;!(g&4)||b>=f?(a.seconds+=60*a.minutes,delete a.minutes):a.minutes&&b++;!(g&2)||b>=f?(a.milliseconds+=1E3*a.seconds,delete a.seconds):a.seconds&&b++;if(!(g&1)||b>=f){var e=l(a,0,"milliseconds","seconds",1E3,d);if(e&&(e=l(a,e,"seconds","minutes",60,d))&&(e=l(a,e,"minutes","hours",60,d))&&(e=l(a,e,"hours","days", 24,d))&&(e=l(a,e,"days","weeks",7,d))&&(e=l(a,e,"weeks","months",t(a.refMonth)/7,d))){g=e;var n,p=a.refMonth,q=p.getTime(),r=new Date(q);r.setUTCFullYear(p.getUTCFullYear()+1);n=Math.round((r.getTime()-q)/864E5);if(e=l(a,g,"months","years",n/t(a.refMonth),d))if(e=l(a,e,"years","decades",10,d))if(e=l(a,e,"decades","centuries",10,d))if(e=l(a,e,"centuries","millennia",10,d))throw Error("Fractional unit overflow");}}}finally{delete a.refMonth}return a}function d(a,b,c,d,f){var h;c=+c||222;d=0<d?d:NaN; f=0<f?20>f?Math.round(f):20:0;"function"===typeof a?(h=a,a=null):a instanceof Date||(a=null!==a&&isFinite(a)?new Date(a):null);"function"===typeof b?(h=b,b=null):b instanceof Date||(b=null!==b&&isFinite(b)?new Date(b):null);if(!a&&!b)return new n;if(!h)return w(new n,a||new Date,b||new Date,c,d,f);var l=c&1?1E3/30:c&2?1E3:c&4?6E4:c&8?36E5:c&16?864E5:6048E5,k,e=function(){h(w(new n,a||new Date,b||new Date,c,d,f),k)};e();return k=setInterval(e,l)}var s=Math.ceil,m=Math.floor,p,q,u;n.prototype.toString= function(){var a=u(this),b=a.length;if(!b)return"";1<b&&(a[b-1]="and "+a[b-1]);return a.join(", ")};n.prototype.toHTML=function(a){a=a||"span";var b=u(this),c=b.length;if(!c)return"";for(var d=0;d<c;d++)b[d]="\x3c"+a+"\x3e"+b[d]+"\x3c/"+a+"\x3e";--c&&(b[c]="and "+b[c]);return b.join(", ")};u=function(a){var b=[],c=a.millennia;c&&b.push(h(c,10));(c=a.centuries)&&b.push(h(c,9));(c=a.decades)&&b.push(h(c,8));(c=a.years)&&b.push(h(c,7));(c=a.months)&&b.push(h(c,6));(c=a.weeks)&&b.push(h(c,5));(c=a.days)&& b.push(h(c,4));(c=a.hours)&&b.push(h(c,3));(c=a.minutes)&&b.push(h(c,2));(c=a.seconds)&&b.push(h(c,1));(c=a.milliseconds)&&b.push(h(c,0));return b};d.MILLISECONDS=1;d.SECONDS=2;d.MINUTES=4;d.HOURS=8;d.DAYS=16;d.WEEKS=32;d.MONTHS=64;d.YEARS=128;d.DECADES=256;d.CENTURIES=512;d.MILLENNIA=1024;d.DEFAULTS=222;d.ALL=2047;d.setLabels=function(a,b){a=a||[];a.split&&(a=a.split("|"));b=b||[];b.split&&(b=b.split("|"));for(var c=0;10>=c;c++)p[c]=a[c]||p[c],q[c]=b[c]||q[c]};(d.resetLabels=function(){p="millisecond second minute hour day week month year decade century millennium".split(" "); q="milliseconds seconds minutes hours days weeks months years decades centuries millennia".split(" ")})();r&&r.exports&&(r.exports=d);return d}(module);

/* Vtex CountDown // 1.3 // Carlos Vincius [Quatro Digital] // MIT */
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(c){"function"!==typeof c.fn.vtexCountdown&&(c.fn.vtexCountdown=function(e){var b=jQuery.extend({},{element:"p[class*='|']",separator:"|",dateSeparator:"/",hourSeparator:":",outputFormat:1,htmlFormat:'<span class="days qd-cp-timeinfo">%days% <span class="vtex-cd_p qd-cp-text">dias</span><span class="vtex-cd_s qd-cp-text">dias</span> </span><span class="hours qd-cp-timeinfo">%hours% <span class="vtex-cd_p qd-cp-text">horas</span><span class="vtex-cd_s qd-cp-text">hora</span> </span><span class="minutes qd-cp-timeinfo">%minutes% <span class="vtex-cd_p qd-cp-text">minutos</span><span class="vtex-cd_s qd-cp-text">minuto</span> </span><span class="seconds qd-cp-timeinfo">%seconds% <span class="vtex-cd_p qd-cp-text">segundos</span><span class="vtex-cd_s qd-cp-text">segundo</span> </span>',updatInterval:1E3,
callback:function(){},updateCallback:function(){},removeDateText:!0,displayElement:null},e),f=c(this),k=f.find(b.element).first(),l="object"==typeof console,G=b.displayElement?f.find(b.displayElement):f;if(1>k.length)return l&&console.log("[Erro] Elemento com o nome da promo\u00e7\u00e3o n\u00e3o encontrado \n ("+k.selector+")"),f;e=k.text()||"";if(0>e.indexOf(b.separator))return l&&console.log("[Erro] Separador \u201c"+b.separator+"\u201d n\u00e3o encontrado."),f;var r=e.split(b.separator).pop().trim(),
h=r.split(" ");e=(h[0]||"").split(b.dateSeparator);var h=(h[1]||"").split(b.hourSeparator),s=new Date(e[2],e[1]-1,e[0],h[0],h[1]);if(3>e.length||2>h.length||isNaN(s.getTime()))return l&&console.log("[Erro] Data Inv\u00e1lida \u201c"+r+"\u201d, \n utilize o padr\u00e3o: DD/MM/AAAA HH:MM"),f;var g=new Date,t="",u="",v="",w="",m=c(""),n=c(""),p=c(""),q=c(""),x=c(""),y=c(""),z=c(""),A=c(""),B=c(""),C=c(""),D=c(""),E=c(""),F=null,d={removeDateText:function(){b.removeDateText&&k.text(k.text().replace(b.separator,
"").replace(r,""))},getTimeRemaining:function(){g.setMilliseconds(g.getMilliseconds()+b.updatInterval);var a=2===b.outputFormat?countdown(g,s,countdown.HOURS|countdown.MINUTES|countdown.SECONDS):countdown(g,s,countdown.DAYS|countdown.HOURS|countdown.MINUTES|countdown.SECONDS);t=9<a.days?a.days:"0"+(a.days||0);u=9<a.hours?a.hours:"0"+a.hours;v=9<a.minutes?a.minutes:"0"+a.minutes;w=9<a.seconds?a.seconds:"0"+a.seconds;d.updateHtml()},toDate:function(a){var c={jan:0,fev:1,mar:2,abr:3,mai:4,jun:5,jul:6,
ago:7,set:8,out:9,nov:10,dez:11},b=a.replace(/[a-z]{3}/,function(a){return c[a]||""}).replace(",","").split(" "),d=b[3].split(":");g=new Date(b[2],b[0],b[1],d[0],d[1],d[2]);isNaN(g.getTime())&&(l&&console.log("Erro ao processar a data retornada via Ajax \n \u201c"+a+"\u201d"),g=new Date)},splitChar:function(a){var b="";a=a.toString();a=a.split("");for(var c in a)"function"!==typeof a[c]&&(b+='<span class="qd-cp-char qd-cp-'+c+'">'+a[c]+"</span>");return b},updateHtml:function(){q.html(d.splitChar(w));
p.html(d.splitChar(v));n.html(d.splitChar(u));m.html(d.splitChar(t));1==w?(A.hide(),E.show()):(E.hide(),A.show());1==v?(z.hide(),D.show()):(D.hide(),z.show());1==u?(y.hide(),C.show()):(C.hide(),y.show());1==t?(x.hide(),B.show()):(B.hide(),x.show());null===F?(f.removeClass("vtex-cd_loading"),d.updateCounter(),b.callback()):b.updateCallback()},formatHtml:function(){var a=b.htmlFormat.replace("%days%",'<span class="vtex-cd_days qd-cp-digits"></span>').replace("%hours%",'<span class="vtex-cd_hours qd-cp-digits"></span>').replace("%minutes%",
'<span class="vtex-cd_minutes qd-cp-digits"></span>').replace("%seconds%",'<span class="vtex-cd_seconds qd-cp-digits"></span>'),a=c(a);m=a.find(".vtex-cd_days");n=a.find(".vtex-cd_hours");p=a.find(".vtex-cd_minutes");q=a.find(".vtex-cd_seconds");x=m.siblings(".vtex-cd_p");y=n.siblings(".vtex-cd_p");z=p.siblings(".vtex-cd_p");A=q.siblings(".vtex-cd_p");B=m.siblings(".vtex-cd_s");C=n.siblings(".vtex-cd_s");D=p.siblings(".vtex-cd_s");E=q.siblings(".vtex-cd_s");G.addClass("vtex-cd_loading").append(a)},
updateCounter:function(){F=setInterval(d.getTimeRemaining,b.updatInterval)}};c.ajax({url:"/no-cache/HoraAtualServidor.aspx",data:"html",success:function(a,b,c){d.toDate(a.toLowerCase().trim());d.getTimeRemaining()},error:function(a,b,c){l&&console.log("Erro na requisi\u00e7\u00e3o Ajax");d.getTimeRemaining()}});d.removeDateText();d.formatHtml()})})(jQuery);