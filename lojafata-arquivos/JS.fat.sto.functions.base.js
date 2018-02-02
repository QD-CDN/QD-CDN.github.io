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

			wrapper.each(function () {
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
					forceImageHTTPS: true,
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
			var wrapper = $('.tip-bar-qd-v1-carousel > ul');

			if (!wrapper.length)
				return;

			var options = {
				arrows: false,
				autoplay: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				infinite: true,
				draggable: false,
				speed: 2000,
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
				// callback: function() {
				// 	$('ul.qd-am-dropdown-menu').each(function() {
				// 		$(this).wrapInner('<li class="container"><ul></ul></li>');
				// 	});
				// }
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
	    	// $('.shelf-qd-v1-stamps').append('<p class="flag Tempo-Regressivo-|05/09/2019-22:10">Tempo Regressivo |05/09/2016 22:10</p>');

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
			Product.applyCarouselShelfSimilares();			
			Product.yourProductMatchWith();			
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
		applyCarouselShelfSimilares: function() {
			var wrapper = $('.qd-stonetree-color');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);
				$t.find('h2').insertBefore(wrapper);
			});
			
			wrapper.parent().removeClass('mosaic-qd-v1-wrapper'); // remove classe de mosaico se tiver carrossel

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev slick-arrow"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next slick-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 3,
				slidesToScroll: 3,
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
							slidesToScroll: 1
						}
					}
				]
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
			// $("#caracteristicas").append('<table cellspacing="0" class="group Especificacao"><tbody><tr class="even"><th class="name-field Fantasia-de">Fantasia de</th><td class="value-field Fantasia-de">Malévola</td></tr><tr><th class="name-field Codigo-do-Produto">Codigo do Produto</th><td class="value-field Codigo-do-Produto">43516</td></tr><tr class="even"><th class="name-field Itens-Inclusos">Itens Inclusos</th><td class="value-field Itens-Inclusos">Vestido , Bolsa , Polainas , Peruca Com Faixa</td></tr><tr><th class="name-field Genero">Genero</th><td class="value-field Genero">Feminino</td></tr><tr class="even"><th class="name-field Garantia">Garantia</th><td class="value-field Garantia">30 dias</td></tr><tr><th class="name-field Video">Video</th><td class="value-field Video">https://www.youtube.com/watch?v=gCmBqppAyiU</td></tr><tr class="even"><th class="name-field Linha">Linha</th><td class="value-field Linha">Luxo</td></tr></tbody></table>');
			var iframe = $("td.value-field.VIDEO:first iframe");

			if (!iframe.length) {
				window.qdVideoInProduct = {
					videoFieldSelector: 'td.value-field.VIDEO:first',
					urlProtocol: 'https'
				};
				return;
			}

			window.qdVideoInProduct = {
				videoFieldSelector: $('<span/>').addClass('video-product').text('https://www.youtube.com/watch?v=' + iframe.attr("src").split("?").shift().split("/").pop() + '&rel=0'),
				urlProtocol: 'https'
			};
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
		},
		yourProductMatchWith: function() {
			var wrapper = $('.product-match-qd-v1-wrapper');
			
			if (wrapper.find('.product-match-qd-v1-last-product *').length < 1)
				return

			wrapper.show();
			var shelf = $('.shelf-qd-v1-current-product');

			var imgRegex = /(ids\/[0-9]+-)[0-9-]+/i;
			var productImageURL = skuJson.skus[0].image.replace(imgRegex, '$1' + 300 + '-' + 300);

			if (productImageURL != undefined) {
				$('<img src="'+ productImageURL +'">').load(function() {
					$(this).appendTo('.shelf_qd_v1_image');
				});
			} else {
				console.log("[Seu produto combina com...] Não foi possível obter a imagem da vitrine...");
			}

			var currentFlags = $('.product-qd-v1-stamps p').clone();
			shelf.find('.shelf-qd-v1-stamps').append(currentFlags);

			var currentName = '<a href=void();>' +  $('.product-qd-v1-sku-selection-row .product-qd-v1-name >div').text() + '</a>';
			shelf.find('.shelf-qd-v1-name h3').append(currentName);

			var priceWrapper = $('.product-qd-v1-sku-selection-row .product-qd-v1-price .descricao-preco');
			var bestPrice = priceWrapper.find('.skuBestPrice').clone();
			var installmentsPrice = priceWrapper.find('.price-installments >span').clone();
			shelf.find('.shelf-qd-v1-price .shelf-qd-v1-price-best-price').append(bestPrice);
			shelf.find('.shelf-qd-v1-price .shelf-qd-v1-price-instalment').append(installmentsPrice);

			var currentBuyButton = $('.product-qd-v1-sku-selection-row .product-qd-v1-buy-button a').first().clone();
			shelf.find('.shelf-qd-v1-buy-button').append(currentBuyButton);

			var currentDescriptionText = '<ul><li>' + $('.product-qd-v1-specification table td.CONSERVACAO').text() + '</li></ul>';
			shelf.find('.shelf-qd-v1-product-field').append(currentDescriptionText);
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
			Institutional.sendAccessForm();			
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
		},
		checkEmailExist: function(email){
			window.QD_checkEmailExist_request = window.QD_checkEmailExist_request || $.ajax({
				url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search",
				data: {"_fields": "id", "email": email},
				type: "GET",
				dataType: "json",
				headers: {Accept: "application/vnd.vtex.ds.v10+json"},
				success: function(data) {
					if(data.length)
						alert("Este e-mail já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
				},
				complete: function(){
					window.QD_checkEmailExist_request = undefined;
				}
			});

			return window.QD_checkEmailExist_request;
		},
		checkCnpjExist: function(cnpj){
			window.QD_checkCnpjExist_request = window.QD_checkCnpjExist_request || $.ajax({
				url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search",
				data: {"_fields": "id", "corporateDocument": cnpj.replace(/[^0-9]/ig, "")},
				type: "GET",
				dataType: "json",
				headers: {Accept: "application/vnd.vtex.ds.v10+json"},
				success: function(data) {
					if(data.length)
						alert("Este CNPJ já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
				},
				complete: function(){
					window.QD_checkCnpjExist_request = undefined;
				}
			});

			return window.QD_checkCnpjExist_request;
		},
		sendAccessForm: function() {
			Institutional.formCadastreMask();

			var $form = $(".form-qd-v1");
			var loading = $('form-qd-v1-loading').hide();
			// $form.find(".form-qd-v1-submit").after(loading);

			var cnpj = $form.find("[name='qd_form_cpnj']");
			cnpj.keyup(function(e) {
				if((cnpj.val() || "").length > 17)
					Institutional.checkCnpjExist(cnpj.val() || "");
			});

			var email = $form.find("[name='qd_form_email']");
			email.focusout(function(e) {
				if((email.val() || "").length > 0)
					Institutional.checkEmailExist(email.val() || "");
			});

			// Preenchendo o endereço a partir do CEP
			var cepInputs = $form.find("input[name=qd_form_street], input[name=qd_form_complement], input[name=qd_form_neighboor], input[name=qd_form_city], input[name=qd_form_state]").attr("disabled", "disabled");
			var cep = $form.find("input[name=qd_form_zipcode]");
			cep.keyup(function(e) {
				if((cep.val() || "").length < 9)
					return;

				// $form.find(".btn-continue").slideUp();
				loading.slideDown();

				$.ajax({
					url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
					dataType: "json",
					success: function(data) {
						// $form.find(".btn-continue").slideUp();
						loading.slideDown();
						$form.find("input[name=qd_form_street]").val(data.street || "");
						$form.find("input[name=qd_form_neighboor]").val(data.neighborhood || "");
						$form.find("input[name=qd_form_city]").val(data.city || "");
						$form.find("input[name=qd_form_state]").val(data.state || "");
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
						loading.slideUp();
						// $form.find(".form-qd-v1-submit").slideDown();
					}
				});
			});

			if (typeof $.fn.validate !== "function")
				return;

			$form.validate({
				rules: {
					email: {
						email: true
					}
				},
				submitHandler: function(form) {
					var $form = $(form);
					var idRegister = '';

					if (!$form.valid())
						return;

					loading.slideDown();
					var inputs = $form.find("input, textarea");

					Institutional.checkEmailExist(inputs.filter("[name='qd_form_email']").val() || "").always(function() {
						loading.slideUp();
					}).done(function(data) {
						if(data.length)
							return;

						loading.slideDown();
						Institutional.checkCnpjExist(inputs.filter("[name='qd_form_cpnj']").val() || "").always(function() {
							loading.slideUp();
						}).done(function(data) {
							if(data.length)
								return;

							loading.slideDown();

							var stateRegistration = (inputs.filter("[name='qd_form_ie']").val() || "Isento").trim();
							stateRegistration = stateRegistration.length? stateRegistration: "Isento";
							stateRegistration = stateRegistration.replace(/i.+ento/g, "Isento");
							var optin = inputs.filter("[name='qd_form_email_news']").val();
							if(optin == "on"){
								optin = 'true';
							}else{
								optin = 'false';
							}

							$.ajax({
								url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/documents",
								type: "PATCH",
								dataType: "json",
								headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
								data: JSON.stringify({
									firstName:				inputs.filter("[name='qd_form_name']").val() || "",
									lastName:				inputs.filter("[name='qd_form_lastname']").val() || "",
									email:					inputs.filter("[name='qd_form_email']").val() || "",
									isNewsletterOptIn:		optin || "",
									// birthDate:				(inputs.filter("[name='qd_form_birthdate']").val() || '').split('/').reverse().join('-'),
									gender:					inputs.filter("[name='qd_form_sex']:checked").val() || "",
									documentType:			"cpf",
									"document":				(inputs.filter("[name='qd_form_cpf']").val() || "").replace(/[^0-9]/ig, ""),
									homePhone:				"+55" + (inputs.filter("[name='qd_form_phone']").val() || "").replace(/[^0-9]/ig, ""),
									cellPhone:				"+55" + (inputs.filter("[name='qd_form_celphone']").val() || "").replace(/[^0-9]/ig, ""),
									isSMSNewsletterOptIn:   false,
									tradeName:				inputs.filter("[name='qd_form_trading_name']").val() || "",
									corporateName:			inputs.filter("[name='qd_form_company_name']").val() || "",
									corporateDocument:		(inputs.filter("[name='qd_form_cpnj']").val() || "").replace(/[^0-9]/ig, ""),
									stateRegistration:		stateRegistration,
									site: 					inputs.filter("[name='qd_form_site']").val() || "",
									facebook: 				inputs.filter("[name='qd_form_facebook']").val() || "",
									instagram: 				inputs.filter("[name='qd_form_instagram']").val() || "",
									workingBrands: 			inputs.filter("[name='qd_form_working_brands']").val() || "",
									interestingBrands: 		inputs.filter("[name='qd_form_interesting_brands']").val() || "",
									isCorporate:			true,
									localeDefault:			"pt-BR"
								}),
								success: function(data) {
									$.ajax({
										url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AD/documents",
										type: "PATCH",
										dataType: "json",
										headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
										data: JSON.stringify({
											addressName:	"Principal",
											userId:			(data.Id || "").replace(/^[a-z]{2}\-/i, ""),
											street:			inputs.filter("[name='qd_form_street']").val() || "",
											number:			inputs.filter("[name='qd_form_number']").val() || "",
											complement:		inputs.filter("[name='qd_form_complement']").val() || "",
											neighborhood:	inputs.filter("[name='qd_form_neighboor']").val() || "",
											city:			inputs.filter("[name='qd_form_city']").val() || "",
											state:			inputs.filter("[name='qd_form_state']").val() || "",
											country:		inputs.filter("[name='qd_form_country']").val() || "",
											postalCode:		inputs.filter("[name='qd_form_zipcode']").val() || "",
											addressType:	"residential",
											receiverName:	inputs.filter("[name='qd_form_name']").val() || "",
											geoCoordinate:	[]
										}),
										success: function() {
											$('.form-qd-v1-sucess').removeClass('hide');
											$('.register-content-qd-v1').addClass('hide');
											$(document).scrollTop(0);
										},
										error: function(data) {
											alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
										},
										complete: function() {
											loading.slideUp(function() {$(this).remove(); });
										}
									});
								},
								error: function() {
									alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
									loading.slideUp(function() {$(this).remove(); });
								}
							});
						});
					});
				},
				errorPlacement: function(error, element) {}
			});
		},
		formCadastreMask: function() {
			var form = $(".form-qd-v1");

			if (!form.length || typeof $.fn.mask !== "function")
				return;

			form.find('[name=qd_form_cpnj]').mask('00.000.000/0000-00');
			form.find('[name=qd_form_cpf]').mask('000.000.000-00');
			form.find('[name=qd_form_phone]').mask('(00) 0000-00009');
			form.find('[name=qd_form_celphone]').mask('(00) 0000-00009');
			form.find('[name=qd_form_zipcode]').mask('00000-000');
			form.find('[name=qd_form_ie]').mask('###.###.###.###.###');
			form.find('[name=qd_form_birthdate]').mask('00/00/0000');
		},
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
<<<<<<< HEAD
var _0xab72=['html','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','length','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','QuatroDigital.ssa.prodUnavailable','qd-ssa-sku-prod-unavailable','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','trigger','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjaxQueue','qdAjax','url','opts','push','success','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','extend','object','clearQueueDelay','jqXHR','readyState','data','textStatus','version','2.1','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','alerta','aviso','toLowerCase','info','apply','removeClass','qd-ssa-sku-no-selected','addClass','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','each','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','[data-qd-ssa-text=\x22default\x22]'];(function(_0xbb0f40,_0x5e73db){var _0x25d64f=function(_0x533bfb){while(--_0x533bfb){_0xbb0f40['push'](_0xbb0f40['shift']());}};_0x25d64f(++_0x5e73db);}(_0xab72,0xd1));var _0x2ab7=function(_0xaea033,_0x120fbb){_0xaea033=_0xaea033-0x0;var _0x4c79cd=_0xab72[_0xaea033];return _0x4c79cd;};(function(_0x588b3c){if(_0x2ab7('0x0')!==typeof _0x588b3c['qdAjax']){var _0x245eb5={};_0x588b3c[_0x2ab7('0x1')]=_0x245eb5;_0x588b3c[_0x2ab7('0x2')]=function(_0x167020){var _0x222f8f=_0x588b3c['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x167020);var _0x4581b4=escape(encodeURIComponent(_0x222f8f[_0x2ab7('0x3')]));_0x245eb5[_0x4581b4]=_0x245eb5[_0x4581b4]||{};_0x245eb5[_0x4581b4][_0x2ab7('0x4')]=_0x245eb5[_0x4581b4][_0x2ab7('0x4')]||[];_0x245eb5[_0x4581b4][_0x2ab7('0x4')][_0x2ab7('0x5')]({'success':function(_0x5a2907,_0x160ac0,_0x11e819){_0x222f8f[_0x2ab7('0x6')][_0x2ab7('0x7')](this,_0x5a2907,_0x160ac0,_0x11e819);},'error':function(_0xef46ee,_0x399fc9,_0x820f9){_0x222f8f[_0x2ab7('0x8')][_0x2ab7('0x7')](this,_0xef46ee,_0x399fc9,_0x820f9);},'complete':function(_0x20ba4c,_0x46fba4){_0x222f8f[_0x2ab7('0x9')][_0x2ab7('0x7')](this,_0x20ba4c,_0x46fba4);}});_0x245eb5[_0x4581b4][_0x2ab7('0xa')]=_0x245eb5[_0x4581b4]['parameters']||{'success':{},'error':{},'complete':{}};_0x245eb5[_0x4581b4][_0x2ab7('0xb')]=_0x245eb5[_0x4581b4][_0x2ab7('0xb')]||{};_0x245eb5[_0x4581b4][_0x2ab7('0xb')][_0x2ab7('0xc')]=_0x2ab7('0xd')===typeof _0x245eb5[_0x4581b4][_0x2ab7('0xb')]['successPopulated']?_0x245eb5[_0x4581b4]['callbackFns'][_0x2ab7('0xc')]:!0x1;_0x245eb5[_0x4581b4][_0x2ab7('0xb')][_0x2ab7('0xe')]=_0x2ab7('0xd')===typeof _0x245eb5[_0x4581b4][_0x2ab7('0xb')][_0x2ab7('0xe')]?_0x245eb5[_0x4581b4]['callbackFns'][_0x2ab7('0xe')]:!0x1;_0x245eb5[_0x4581b4]['callbackFns'][_0x2ab7('0xf')]=_0x2ab7('0xd')===typeof _0x245eb5[_0x4581b4][_0x2ab7('0xb')][_0x2ab7('0xf')]?_0x245eb5[_0x4581b4][_0x2ab7('0xb')]['completePopulated']:!0x1;_0x167020=_0x588b3c[_0x2ab7('0x10')]({},_0x222f8f,{'success':function(_0x1958e1,_0x2d60fb,_0x5690a6){_0x245eb5[_0x4581b4][_0x2ab7('0xa')][_0x2ab7('0x6')]={'data':_0x1958e1,'textStatus':_0x2d60fb,'jqXHR':_0x5690a6};_0x245eb5[_0x4581b4][_0x2ab7('0xb')][_0x2ab7('0xc')]=!0x0;for(var _0x1c791e in _0x245eb5[_0x4581b4][_0x2ab7('0x4')])_0x2ab7('0x11')===typeof _0x245eb5[_0x4581b4]['opts'][_0x1c791e]&&(_0x245eb5[_0x4581b4][_0x2ab7('0x4')][_0x1c791e][_0x2ab7('0x6')][_0x2ab7('0x7')](this,_0x1958e1,_0x2d60fb,_0x5690a6),_0x245eb5[_0x4581b4][_0x2ab7('0x4')][_0x1c791e][_0x2ab7('0x6')]=function(){});},'error':function(_0x1d71ce,_0xcaaf62,_0xc52cda){_0x245eb5[_0x4581b4]['parameters']['error']={'errorThrown':_0xc52cda,'textStatus':_0xcaaf62,'jqXHR':_0x1d71ce};_0x245eb5[_0x4581b4][_0x2ab7('0xb')][_0x2ab7('0xe')]=!0x0;for(var _0xa67fc9 in _0x245eb5[_0x4581b4]['opts'])_0x2ab7('0x11')===typeof _0x245eb5[_0x4581b4]['opts'][_0xa67fc9]&&(_0x245eb5[_0x4581b4][_0x2ab7('0x4')][_0xa67fc9][_0x2ab7('0x8')][_0x2ab7('0x7')](this,_0x1d71ce,_0xcaaf62,_0xc52cda),_0x245eb5[_0x4581b4][_0x2ab7('0x4')][_0xa67fc9]['error']=function(){});},'complete':function(_0x4a71fa,_0x12a400){_0x245eb5[_0x4581b4]['parameters']['complete']={'textStatus':_0x12a400,'jqXHR':_0x4a71fa};_0x245eb5[_0x4581b4][_0x2ab7('0xb')]['completePopulated']=!0x0;for(var _0x4098a9 in _0x245eb5[_0x4581b4][_0x2ab7('0x4')])_0x2ab7('0x11')===typeof _0x245eb5[_0x4581b4]['opts'][_0x4098a9]&&(_0x245eb5[_0x4581b4][_0x2ab7('0x4')][_0x4098a9][_0x2ab7('0x9')][_0x2ab7('0x7')](this,_0x4a71fa,_0x12a400),_0x245eb5[_0x4581b4]['opts'][_0x4098a9][_0x2ab7('0x9')]=function(){});isNaN(parseInt(_0x222f8f[_0x2ab7('0x12')]))||setTimeout(function(){_0x245eb5[_0x4581b4][_0x2ab7('0x13')]=void 0x0;_0x245eb5[_0x4581b4][_0x2ab7('0x4')]=void 0x0;_0x245eb5[_0x4581b4][_0x2ab7('0xa')]=void 0x0;_0x245eb5[_0x4581b4][_0x2ab7('0xb')]=void 0x0;},_0x222f8f['clearQueueDelay']);}});'undefined'===typeof _0x245eb5[_0x4581b4]['jqXHR']?_0x245eb5[_0x4581b4][_0x2ab7('0x13')]=_0x588b3c['ajax'](_0x167020):_0x245eb5[_0x4581b4][_0x2ab7('0x13')]&&_0x245eb5[_0x4581b4][_0x2ab7('0x13')][_0x2ab7('0x14')]&&0x4==_0x245eb5[_0x4581b4][_0x2ab7('0x13')][_0x2ab7('0x14')]&&(_0x245eb5[_0x4581b4][_0x2ab7('0xb')]['successPopulated']&&_0x167020[_0x2ab7('0x6')](_0x245eb5[_0x4581b4][_0x2ab7('0xa')][_0x2ab7('0x6')][_0x2ab7('0x15')],_0x245eb5[_0x4581b4]['parameters'][_0x2ab7('0x6')][_0x2ab7('0x16')],_0x245eb5[_0x4581b4][_0x2ab7('0xa')]['success'][_0x2ab7('0x13')]),_0x245eb5[_0x4581b4][_0x2ab7('0xb')][_0x2ab7('0xe')]&&_0x167020[_0x2ab7('0x8')](_0x245eb5[_0x4581b4][_0x2ab7('0xa')][_0x2ab7('0x8')][_0x2ab7('0x13')],_0x245eb5[_0x4581b4][_0x2ab7('0xa')][_0x2ab7('0x8')]['textStatus'],_0x245eb5[_0x4581b4][_0x2ab7('0xa')][_0x2ab7('0x8')]['errorThrown']),_0x245eb5[_0x4581b4][_0x2ab7('0xb')][_0x2ab7('0xf')]&&_0x167020[_0x2ab7('0x9')](_0x245eb5[_0x4581b4]['parameters'][_0x2ab7('0x9')][_0x2ab7('0x13')],_0x245eb5[_0x4581b4][_0x2ab7('0xa')][_0x2ab7('0x9')][_0x2ab7('0x16')]));};_0x588b3c['qdAjax'][_0x2ab7('0x17')]=_0x2ab7('0x18');}}(jQuery));(function(_0x279516){function _0x428707(_0x2ecf25,_0x27633a){_0x3f59b4[_0x2ab7('0x2')]({'url':'/produto/sku/'+_0x2ecf25,'clearQueueDelay':null,'success':_0x27633a,'error':function(){_0x3586b3(_0x2ab7('0x19'));}});}var _0x3f59b4=jQuery;if(_0x2ab7('0x0')!==typeof _0x3f59b4['fn'][_0x2ab7('0x1a')]){var _0x3586b3=function(_0xda0691,_0x561308){if('object'===typeof console){var _0x330f0e;_0x2ab7('0x11')===typeof _0xda0691?(_0xda0691['unshift'](_0x2ab7('0x1b')),_0x330f0e=_0xda0691):_0x330f0e=[_0x2ab7('0x1b')+_0xda0691];_0x2ab7('0x1c')===typeof _0x561308||_0x2ab7('0x1d')!==_0x561308['toLowerCase']()&&_0x2ab7('0x1e')!==_0x561308[_0x2ab7('0x1f')]()?_0x2ab7('0x1c')!==typeof _0x561308&&_0x2ab7('0x20')===_0x561308[_0x2ab7('0x1f')]()?console[_0x2ab7('0x20')][_0x2ab7('0x21')](console,_0x330f0e):console['error'][_0x2ab7('0x21')](console,_0x330f0e):console['warn']['apply'](console,_0x330f0e);}},_0x4eb92d={},_0x400a9d=function(_0x2c2bc5,_0x14bf7d){function _0x422f11(_0xb5aa1){try{_0x2c2bc5[_0x2ab7('0x22')](_0x2ab7('0x23'))[_0x2ab7('0x24')]('qd-ssa-sku-selected');var _0x448cd8=_0xb5aa1[0x0][_0x2ab7('0x25')][0x0][_0x2ab7('0x26')];_0x2c2bc5[_0x2ab7('0x27')](_0x2ab7('0x28'),_0x448cd8);_0x2c2bc5[_0x2ab7('0x29')](function(){var _0x2c2bc5=_0x3f59b4(this)['find'](_0x2ab7('0x2a'));if(0x1>_0x448cd8)return _0x2c2bc5[_0x2ab7('0x2b')]()[_0x2ab7('0x24')](_0x2ab7('0x2c'))[_0x2ab7('0x22')](_0x2ab7('0x2d'));var _0xb5aa1=_0x2c2bc5[_0x2ab7('0x2e')](_0x2ab7('0x2f')+_0x448cd8+'\x22]');_0xb5aa1=_0xb5aa1['length']?_0xb5aa1:_0x2c2bc5[_0x2ab7('0x2e')](_0x2ab7('0x30'));_0x2c2bc5[_0x2ab7('0x2b')]()[_0x2ab7('0x24')](_0x2ab7('0x2c'))[_0x2ab7('0x22')](_0x2ab7('0x2d'));_0xb5aa1[_0x2ab7('0x31')]((_0xb5aa1[_0x2ab7('0x31')]()||'')['replace']('#qtt',_0x448cd8));_0xb5aa1[_0x2ab7('0x32')]()[_0x2ab7('0x24')]('qd-ssa-show')[_0x2ab7('0x22')](_0x2ab7('0x2c'));});}catch(_0x1bfd28){_0x3586b3([_0x2ab7('0x33'),_0x1bfd28[_0x2ab7('0x34')]]);}}if(_0x2c2bc5[_0x2ab7('0x35')]){_0x2c2bc5[_0x2ab7('0x24')]('qd-ssa-on');_0x2c2bc5['addClass'](_0x2ab7('0x23'));try{_0x2c2bc5['addClass']('qd-ssa-skus-'+vtxctx[_0x2ab7('0x36')][_0x2ab7('0x37')](';')[_0x2ab7('0x35')]);}catch(_0x29b905){_0x3586b3([_0x2ab7('0x38'),_0x29b905[_0x2ab7('0x34')]]);}_0x3f59b4(window)['on'](_0x2ab7('0x39'),function(_0x5057f6,_0x46765d,_0x265c25){try{_0x428707(_0x265c25[_0x2ab7('0x3a')],function(_0xb3e331){_0x422f11(_0xb3e331);0x1===vtxctx[_0x2ab7('0x36')][_0x2ab7('0x37')](';')[_0x2ab7('0x35')]&&0x0==_0xb3e331[0x0][_0x2ab7('0x25')][0x0][_0x2ab7('0x26')]&&_0x3f59b4(window)['trigger']('QuatroDigital.ssa.prodUnavailable');});}catch(_0x380ac5){_0x3586b3([_0x2ab7('0x3b'),_0x380ac5[_0x2ab7('0x34')]]);}});_0x3f59b4(window)[_0x2ab7('0x3c')](_0x2ab7('0x3d'));_0x3f59b4(window)['on'](_0x2ab7('0x3e'),function(){_0x2c2bc5['addClass'](_0x2ab7('0x3f'))['hide']();});}};_0x279516=function(_0x2a08a5){var _0x16a79e={'y':_0x2ab7('0x40')};return function(_0x5107ab){var _0x424d13=function(_0x532db8){return _0x532db8;};var _0x47ca7d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5107ab=_0x5107ab['d'+_0x47ca7d[0x10]+'c'+_0x47ca7d[0x11]+'m'+_0x424d13(_0x47ca7d[0x1])+'n'+_0x47ca7d[0xd]]['l'+_0x47ca7d[0x12]+'c'+_0x47ca7d[0x0]+'ti'+_0x424d13('o')+'n'];var _0x4b5808=function(_0x5201c3){return escape(encodeURIComponent(_0x5201c3[_0x2ab7('0x41')](/\./g,'¨')[_0x2ab7('0x41')](/[a-zA-Z]/g,function(_0x5ec5f5){return String[_0x2ab7('0x42')](('Z'>=_0x5ec5f5?0x5a:0x7a)>=(_0x5ec5f5=_0x5ec5f5[_0x2ab7('0x43')](0x0)+0xd)?_0x5ec5f5:_0x5ec5f5-0x1a);})));};var _0x32521a=_0x4b5808(_0x5107ab[[_0x47ca7d[0x9],_0x424d13('o'),_0x47ca7d[0xc],_0x47ca7d[_0x424d13(0xd)]][_0x2ab7('0x44')]('')]);_0x4b5808=_0x4b5808((window[['js',_0x424d13('no'),'m',_0x47ca7d[0x1],_0x47ca7d[0x4][_0x2ab7('0x45')](),_0x2ab7('0x46')][_0x2ab7('0x44')]('')]||_0x2ab7('0x47'))+['.v',_0x47ca7d[0xd],'e',_0x424d13('x'),'co',_0x424d13('mm'),_0x2ab7('0x48'),_0x47ca7d[0x1],'.c',_0x424d13('o'),'m.',_0x47ca7d[0x13],'r'][_0x2ab7('0x44')](''));for(var _0xebe76a in _0x16a79e){if(_0x4b5808===_0xebe76a+_0x16a79e[_0xebe76a]||_0x32521a===_0xebe76a+_0x16a79e[_0xebe76a]){var _0x31f28a='tr'+_0x47ca7d[0x11]+'e';break;}_0x31f28a='f'+_0x47ca7d[0x0]+'ls'+_0x424d13(_0x47ca7d[0x1])+'';}_0x424d13=!0x1;-0x1<_0x5107ab[[_0x47ca7d[0xc],'e',_0x47ca7d[0x0],'rc',_0x47ca7d[0x9]][_0x2ab7('0x44')]('')][_0x2ab7('0x49')](_0x2ab7('0x4a'))&&(_0x424d13=!0x0);return[_0x31f28a,_0x424d13];}(_0x2a08a5);}(window);if(!eval(_0x279516[0x0]))return _0x279516[0x1]?_0x3586b3(_0x2ab7('0x4b')):!0x1;_0x3f59b4['fn'][_0x2ab7('0x1a')]=function(_0x202452){var _0x58e252=_0x3f59b4(this);_0x202452=_0x3f59b4[_0x2ab7('0x10')](!0x0,{},_0x4eb92d,_0x202452);_0x58e252[_0x2ab7('0x4c')]=new _0x400a9d(_0x58e252,_0x202452);try{'object'===typeof _0x3f59b4['fn'][_0x2ab7('0x1a')][_0x2ab7('0x4d')]&&_0x3f59b4(window)['trigger'](_0x2ab7('0x4e'),[_0x3f59b4['fn'][_0x2ab7('0x1a')]['initialSkuSelected']['prod'],_0x3f59b4['fn'][_0x2ab7('0x1a')][_0x2ab7('0x4d')]['sku']]);}catch(_0x187197){_0x3586b3([_0x2ab7('0x4f'),_0x187197['message']]);}_0x3f59b4['fn'][_0x2ab7('0x1a')][_0x2ab7('0x50')]&&_0x3f59b4(window)[_0x2ab7('0x51')](_0x2ab7('0x3e'));return _0x58e252;};_0x3f59b4(window)['on'](_0x2ab7('0x3d'),function(_0x445f6c,_0x2675b,_0x17cf4c){try{_0x3f59b4['fn'][_0x2ab7('0x1a')][_0x2ab7('0x4d')]={'prod':_0x2675b,'sku':_0x17cf4c},_0x3f59b4(this)[_0x2ab7('0x3c')](_0x445f6c);}catch(_0x4f61fc){_0x3586b3(['Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20',_0x4f61fc[_0x2ab7('0x34')]]);}});_0x3f59b4(window)['on'](_0x2ab7('0x52'),function(_0x2f0c89,_0x1aa540,_0xd7cfb2){try{for(var _0x26fc29=_0xd7cfb2[_0x2ab7('0x35')],_0x4f5622=_0x1aa540=0x0;_0x4f5622<_0x26fc29&&!_0xd7cfb2[_0x4f5622][_0x2ab7('0x53')];_0x4f5622++)_0x1aa540+=0x1;_0x26fc29<=_0x1aa540&&(_0x3f59b4['fn']['QD_smartStockAvailable'][_0x2ab7('0x50')]=!0x0);_0x3f59b4(this)[_0x2ab7('0x3c')](_0x2f0c89);}catch(_0x340ad8){_0x3586b3([_0x2ab7('0x54'),_0x340ad8['message']]);}});_0x3f59b4(function(){_0x3f59b4(_0x2ab7('0x55'))[_0x2ab7('0x1a')]();});}}(window));
=======
var _0xb018=['opts','push','success','call','error','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','extend','object','jqXHR','clearQueueDelay','ajax','readyState','data','textStatus','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','aviso','undefined','info','apply','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','AvailableQuantity','attr','data-qd-ssa-qtt','[data-qd-ssa-text]','hide','removeClass','qd-ssa-show','filter','[data-qd-ssa-text=\x22','length','[data-qd-ssa-text=\x22default\x22]','html','replace','show','message','qd-ssa-on','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','qdPlugin','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','url'];(function(_0x1fc20a,_0x39f358){var _0x23a081=function(_0x36925c){while(--_0x36925c){_0x1fc20a['push'](_0x1fc20a['shift']());}};_0x23a081(++_0x39f358);}(_0xb018,0xaa));var _0x8b01=function(_0x53f231,_0x3d814f){_0x53f231=_0x53f231-0x0;var _0x840716=_0xb018[_0x53f231];return _0x840716;};(function(_0x6ffb3e){if(_0x8b01('0x0')!==typeof _0x6ffb3e[_0x8b01('0x1')]){var _0x124100={};_0x6ffb3e[_0x8b01('0x2')]=_0x124100;_0x6ffb3e[_0x8b01('0x1')]=function(_0x156cc3){var _0x3b2fd3=_0x6ffb3e['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x156cc3);var _0x5d63ef=escape(encodeURIComponent(_0x3b2fd3[_0x8b01('0x3')]));_0x124100[_0x5d63ef]=_0x124100[_0x5d63ef]||{};_0x124100[_0x5d63ef][_0x8b01('0x4')]=_0x124100[_0x5d63ef][_0x8b01('0x4')]||[];_0x124100[_0x5d63ef][_0x8b01('0x4')][_0x8b01('0x5')]({'success':function(_0x4914cb,_0x32127a,_0x178f78){_0x3b2fd3[_0x8b01('0x6')][_0x8b01('0x7')](this,_0x4914cb,_0x32127a,_0x178f78);},'error':function(_0x106719,_0xec0f68,_0x1d5014){_0x3b2fd3[_0x8b01('0x8')]['call'](this,_0x106719,_0xec0f68,_0x1d5014);},'complete':function(_0xe46e1b,_0x23aca9){_0x3b2fd3[_0x8b01('0x9')][_0x8b01('0x7')](this,_0xe46e1b,_0x23aca9);}});_0x124100[_0x5d63ef][_0x8b01('0xa')]=_0x124100[_0x5d63ef][_0x8b01('0xa')]||{'success':{},'error':{},'complete':{}};_0x124100[_0x5d63ef][_0x8b01('0xb')]=_0x124100[_0x5d63ef][_0x8b01('0xb')]||{};_0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xc')]=_0x8b01('0xd')===typeof _0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xc')]?_0x124100[_0x5d63ef][_0x8b01('0xb')]['successPopulated']:!0x1;_0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xe')]='boolean'===typeof _0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xe')]?_0x124100[_0x5d63ef][_0x8b01('0xb')]['errorPopulated']:!0x1;_0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xf')]=_0x8b01('0xd')===typeof _0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xf')]?_0x124100[_0x5d63ef][_0x8b01('0xb')]['completePopulated']:!0x1;_0x156cc3=_0x6ffb3e[_0x8b01('0x10')]({},_0x3b2fd3,{'success':function(_0x206b1e,_0x44ee59,_0x25f0f2){_0x124100[_0x5d63ef][_0x8b01('0xa')][_0x8b01('0x6')]={'data':_0x206b1e,'textStatus':_0x44ee59,'jqXHR':_0x25f0f2};_0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xc')]=!0x0;for(var _0x317e23 in _0x124100[_0x5d63ef][_0x8b01('0x4')])_0x8b01('0x11')===typeof _0x124100[_0x5d63ef][_0x8b01('0x4')][_0x317e23]&&(_0x124100[_0x5d63ef][_0x8b01('0x4')][_0x317e23][_0x8b01('0x6')][_0x8b01('0x7')](this,_0x206b1e,_0x44ee59,_0x25f0f2),_0x124100[_0x5d63ef]['opts'][_0x317e23]['success']=function(){});},'error':function(_0x13822e,_0x7f42c8,_0x3e25d5){_0x124100[_0x5d63ef]['parameters']['error']={'errorThrown':_0x3e25d5,'textStatus':_0x7f42c8,'jqXHR':_0x13822e};_0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xe')]=!0x0;for(var _0x1dbfd5 in _0x124100[_0x5d63ef][_0x8b01('0x4')])'object'===typeof _0x124100[_0x5d63ef][_0x8b01('0x4')][_0x1dbfd5]&&(_0x124100[_0x5d63ef]['opts'][_0x1dbfd5]['error'][_0x8b01('0x7')](this,_0x13822e,_0x7f42c8,_0x3e25d5),_0x124100[_0x5d63ef][_0x8b01('0x4')][_0x1dbfd5][_0x8b01('0x8')]=function(){});},'complete':function(_0x2ece2d,_0x3eb5a9){_0x124100[_0x5d63ef][_0x8b01('0xa')][_0x8b01('0x9')]={'textStatus':_0x3eb5a9,'jqXHR':_0x2ece2d};_0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xf')]=!0x0;for(var _0x15df45 in _0x124100[_0x5d63ef][_0x8b01('0x4')])_0x8b01('0x11')===typeof _0x124100[_0x5d63ef][_0x8b01('0x4')][_0x15df45]&&(_0x124100[_0x5d63ef][_0x8b01('0x4')][_0x15df45][_0x8b01('0x9')][_0x8b01('0x7')](this,_0x2ece2d,_0x3eb5a9),_0x124100[_0x5d63ef][_0x8b01('0x4')][_0x15df45][_0x8b01('0x9')]=function(){});isNaN(parseInt(_0x3b2fd3['clearQueueDelay']))||setTimeout(function(){_0x124100[_0x5d63ef][_0x8b01('0x12')]=void 0x0;_0x124100[_0x5d63ef][_0x8b01('0x4')]=void 0x0;_0x124100[_0x5d63ef][_0x8b01('0xa')]=void 0x0;_0x124100[_0x5d63ef]['callbackFns']=void 0x0;},_0x3b2fd3[_0x8b01('0x13')]);}});'undefined'===typeof _0x124100[_0x5d63ef][_0x8b01('0x12')]?_0x124100[_0x5d63ef]['jqXHR']=_0x6ffb3e[_0x8b01('0x14')](_0x156cc3):_0x124100[_0x5d63ef][_0x8b01('0x12')]&&_0x124100[_0x5d63ef]['jqXHR'][_0x8b01('0x15')]&&0x4==_0x124100[_0x5d63ef][_0x8b01('0x12')][_0x8b01('0x15')]&&(_0x124100[_0x5d63ef]['callbackFns'][_0x8b01('0xc')]&&_0x156cc3[_0x8b01('0x6')](_0x124100[_0x5d63ef]['parameters'][_0x8b01('0x6')][_0x8b01('0x16')],_0x124100[_0x5d63ef][_0x8b01('0xa')][_0x8b01('0x6')][_0x8b01('0x17')],_0x124100[_0x5d63ef][_0x8b01('0xa')][_0x8b01('0x6')]['jqXHR']),_0x124100[_0x5d63ef][_0x8b01('0xb')]['errorPopulated']&&_0x156cc3[_0x8b01('0x8')](_0x124100[_0x5d63ef][_0x8b01('0xa')][_0x8b01('0x8')][_0x8b01('0x12')],_0x124100[_0x5d63ef]['parameters'][_0x8b01('0x8')]['textStatus'],_0x124100[_0x5d63ef][_0x8b01('0xa')]['error']['errorThrown']),_0x124100[_0x5d63ef][_0x8b01('0xb')][_0x8b01('0xf')]&&_0x156cc3[_0x8b01('0x9')](_0x124100[_0x5d63ef][_0x8b01('0xa')][_0x8b01('0x9')][_0x8b01('0x12')],_0x124100[_0x5d63ef]['parameters'][_0x8b01('0x9')][_0x8b01('0x17')]));};_0x6ffb3e[_0x8b01('0x1')][_0x8b01('0x18')]=_0x8b01('0x19');}}(jQuery));(function(_0x5ff6f2){function _0x367bfb(_0x5d4838,_0x18f547){_0x4fda80['qdAjax']({'url':_0x8b01('0x1a')+_0x5d4838,'clearQueueDelay':null,'success':_0x18f547,'error':function(){_0x164df9(_0x8b01('0x1b'));}});}var _0x4fda80=jQuery;if(_0x8b01('0x0')!==typeof _0x4fda80['fn'][_0x8b01('0x1c')]){var _0x164df9=function(_0x2419ba,_0x15d8d5){if(_0x8b01('0x11')===typeof console){var _0xe8300c;_0x8b01('0x11')===typeof _0x2419ba?(_0x2419ba[_0x8b01('0x1d')](_0x8b01('0x1e')),_0xe8300c=_0x2419ba):_0xe8300c=[_0x8b01('0x1e')+_0x2419ba];'undefined'===typeof _0x15d8d5||_0x8b01('0x1f')!==_0x15d8d5[_0x8b01('0x20')]()&&_0x8b01('0x21')!==_0x15d8d5['toLowerCase']()?_0x8b01('0x22')!==typeof _0x15d8d5&&_0x8b01('0x23')===_0x15d8d5[_0x8b01('0x20')]()?console['info'][_0x8b01('0x24')](console,_0xe8300c):console['error']['apply'](console,_0xe8300c):console['warn'][_0x8b01('0x24')](console,_0xe8300c);}},_0x2df803={},_0x3bf65c=function(_0x236d20,_0xc88035){function _0x113583(_0x487ba3){try{_0x236d20['removeClass'](_0x8b01('0x25'))[_0x8b01('0x26')](_0x8b01('0x27'));var _0x487da7=_0x487ba3[0x0]['SkuSellersInformation'][0x0][_0x8b01('0x28')];_0x236d20[_0x8b01('0x29')](_0x8b01('0x2a'),_0x487da7);_0x236d20['each'](function(){var _0x236d20=_0x4fda80(this)['find'](_0x8b01('0x2b'));if(0x1>_0x487da7)return _0x236d20[_0x8b01('0x2c')]()[_0x8b01('0x26')]('qd-ssa-hide')[_0x8b01('0x2d')](_0x8b01('0x2e'));var _0x487ba3=_0x236d20[_0x8b01('0x2f')](_0x8b01('0x30')+_0x487da7+'\x22]');_0x487ba3=_0x487ba3[_0x8b01('0x31')]?_0x487ba3:_0x236d20[_0x8b01('0x2f')](_0x8b01('0x32'));_0x236d20[_0x8b01('0x2c')]()[_0x8b01('0x26')]('qd-ssa-hide')['removeClass'](_0x8b01('0x2e'));_0x487ba3[_0x8b01('0x33')]((_0x487ba3['html']()||'')[_0x8b01('0x34')]('#qtt',_0x487da7));_0x487ba3[_0x8b01('0x35')]()[_0x8b01('0x26')]('qd-ssa-show')[_0x8b01('0x2d')]('qd-ssa-hide');});}catch(_0x40e1db){_0x164df9(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x40e1db[_0x8b01('0x36')]]);}}if(_0x236d20['length']){_0x236d20['addClass'](_0x8b01('0x37'));_0x236d20[_0x8b01('0x26')](_0x8b01('0x25'));try{_0x236d20['addClass']('qd-ssa-skus-'+vtxctx[_0x8b01('0x38')][_0x8b01('0x39')](';')[_0x8b01('0x31')]);}catch(_0x54542a){_0x164df9([_0x8b01('0x3a'),_0x54542a['message']]);}_0x4fda80(window)['on'](_0x8b01('0x3b'),function(_0x212ecb,_0x42b8fa,_0x4f1b7b){try{_0x367bfb(_0x4f1b7b[_0x8b01('0x3c')],function(_0x585484){_0x113583(_0x585484);0x1===vtxctx[_0x8b01('0x38')][_0x8b01('0x39')](';')[_0x8b01('0x31')]&&0x0==_0x585484[0x0]['SkuSellersInformation'][0x0][_0x8b01('0x28')]&&_0x4fda80(window)[_0x8b01('0x3d')](_0x8b01('0x3e'));});}catch(_0x4f7f78){_0x164df9([_0x8b01('0x3f'),_0x4f7f78[_0x8b01('0x36')]]);}});_0x4fda80(window)[_0x8b01('0x40')](_0x8b01('0x41'));_0x4fda80(window)['on'](_0x8b01('0x3e'),function(){_0x236d20['addClass'](_0x8b01('0x42'))[_0x8b01('0x2c')]();});}};_0x5ff6f2=function(_0x5c004b){var _0x44d8ca={'y':_0x8b01('0x43')};return function(_0x43a9b0){var _0x5301f0=function(_0x239ebb){return _0x239ebb;};var _0x100643=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x43a9b0=_0x43a9b0['d'+_0x100643[0x10]+'c'+_0x100643[0x11]+'m'+_0x5301f0(_0x100643[0x1])+'n'+_0x100643[0xd]]['l'+_0x100643[0x12]+'c'+_0x100643[0x0]+'ti'+_0x5301f0('o')+'n'];var _0x3fb2d7=function(_0xbc974){return escape(encodeURIComponent(_0xbc974[_0x8b01('0x34')](/\./g,'¨')[_0x8b01('0x34')](/[a-zA-Z]/g,function(_0x3bc464){return String[_0x8b01('0x44')](('Z'>=_0x3bc464?0x5a:0x7a)>=(_0x3bc464=_0x3bc464[_0x8b01('0x45')](0x0)+0xd)?_0x3bc464:_0x3bc464-0x1a);})));};var _0x54c68a=_0x3fb2d7(_0x43a9b0[[_0x100643[0x9],_0x5301f0('o'),_0x100643[0xc],_0x100643[_0x5301f0(0xd)]][_0x8b01('0x46')]('')]);_0x3fb2d7=_0x3fb2d7((window[['js',_0x5301f0('no'),'m',_0x100643[0x1],_0x100643[0x4]['toUpperCase'](),_0x8b01('0x47')][_0x8b01('0x46')]('')]||_0x8b01('0x48'))+['.v',_0x100643[0xd],'e',_0x5301f0('x'),'co',_0x5301f0('mm'),_0x8b01('0x49'),_0x100643[0x1],'.c',_0x5301f0('o'),'m.',_0x100643[0x13],'r']['join'](''));for(var _0x42a68f in _0x44d8ca){if(_0x3fb2d7===_0x42a68f+_0x44d8ca[_0x42a68f]||_0x54c68a===_0x42a68f+_0x44d8ca[_0x42a68f]){var _0x1a45f0='tr'+_0x100643[0x11]+'e';break;}_0x1a45f0='f'+_0x100643[0x0]+'ls'+_0x5301f0(_0x100643[0x1])+'';}_0x5301f0=!0x1;-0x1<_0x43a9b0[[_0x100643[0xc],'e',_0x100643[0x0],'rc',_0x100643[0x9]][_0x8b01('0x46')]('')][_0x8b01('0x4a')](_0x8b01('0x4b'))&&(_0x5301f0=!0x0);return[_0x1a45f0,_0x5301f0];}(_0x5c004b);}(window);if(!eval(_0x5ff6f2[0x0]))return _0x5ff6f2[0x1]?_0x164df9('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x4fda80['fn'][_0x8b01('0x1c')]=function(_0x3e1fc2){var _0x904bdb=_0x4fda80(this);_0x3e1fc2=_0x4fda80[_0x8b01('0x10')](!0x0,{},_0x2df803,_0x3e1fc2);_0x904bdb[_0x8b01('0x4c')]=new _0x3bf65c(_0x904bdb,_0x3e1fc2);try{_0x8b01('0x11')===typeof _0x4fda80['fn']['QD_smartStockAvailable'][_0x8b01('0x4d')]&&_0x4fda80(window)[_0x8b01('0x3d')](_0x8b01('0x4e'),[_0x4fda80['fn'][_0x8b01('0x1c')][_0x8b01('0x4d')][_0x8b01('0x4f')],_0x4fda80['fn'][_0x8b01('0x1c')][_0x8b01('0x4d')][_0x8b01('0x3c')]]);}catch(_0x3f31ba){_0x164df9([_0x8b01('0x50'),_0x3f31ba[_0x8b01('0x36')]]);}_0x4fda80['fn']['QD_smartStockAvailable'][_0x8b01('0x51')]&&_0x4fda80(window)[_0x8b01('0x3d')](_0x8b01('0x3e'));return _0x904bdb;};_0x4fda80(window)['on'](_0x8b01('0x41'),function(_0x306656,_0x54600c,_0x5ccfa2){try{_0x4fda80['fn'][_0x8b01('0x1c')][_0x8b01('0x4d')]={'prod':_0x54600c,'sku':_0x5ccfa2},_0x4fda80(this)[_0x8b01('0x40')](_0x306656);}catch(_0xa458fb){_0x164df9([_0x8b01('0x52'),_0xa458fb[_0x8b01('0x36')]]);}});_0x4fda80(window)['on'](_0x8b01('0x53'),function(_0x252135,_0x5bd3e1,_0xe60227){try{for(var _0x113416=_0xe60227[_0x8b01('0x31')],_0x325431=_0x5bd3e1=0x0;_0x325431<_0x113416&&!_0xe60227[_0x325431][_0x8b01('0x54')];_0x325431++)_0x5bd3e1+=0x1;_0x113416<=_0x5bd3e1&&(_0x4fda80['fn']['QD_smartStockAvailable'][_0x8b01('0x51')]=!0x0);_0x4fda80(this)[_0x8b01('0x40')](_0x252135);}catch(_0x2238cb){_0x164df9([_0x8b01('0x55'),_0x2238cb[_0x8b01('0x36')]]);}});_0x4fda80(function(){_0x4fda80(_0x8b01('0x56'))['QD_smartStockAvailable']();});}}(window));
>>>>>>> 8b4d7d49cd39c2e6c7476b43866cb84108c973d7
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
<<<<<<< HEAD
var _0xf185=['ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','url','html','attr','data-qdam-value','.box-banner','clone','hide','trim','[class*=\x27colunas\x27]','insertBefore','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','children',':not(ul)','qd-am-elem-','text','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','each','qd-am-li-','first','qd-am-first','last','addClass','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82'];(function(_0x5b4826,_0x4a3682){var _0xd64a1a=function(_0x52f8d9){while(--_0x52f8d9){_0x5b4826['push'](_0x5b4826['shift']());}};_0xd64a1a(++_0x4a3682);}(_0xf185,0x7a));var _0x5f18=function(_0xcae8cf,_0x4ecdd8){_0xcae8cf=_0xcae8cf-0x0;var _0x49e175=_0xf185[_0xcae8cf];return _0x49e175;};(function(_0x18bc32){_0x18bc32['fn'][_0x5f18('0x0')]=_0x18bc32['fn'][_0x5f18('0x1')];}(jQuery));(function(_0x538ca3){var _0x32319b;var _0x474530=jQuery;if(_0x5f18('0x2')!==typeof _0x474530['fn'][_0x5f18('0x3')]){var _0xbab2a0={'url':_0x5f18('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x345a89=function(_0x315865,_0x3d3344){if(_0x5f18('0x5')===typeof console&&_0x5f18('0x6')!==typeof console[_0x5f18('0x7')]&&_0x5f18('0x6')!==typeof console[_0x5f18('0x8')]&&_0x5f18('0x6')!==typeof console[_0x5f18('0x9')]){var _0x4da771;'object'===typeof _0x315865?(_0x315865[_0x5f18('0xa')](_0x5f18('0xb')),_0x4da771=_0x315865):_0x4da771=['[QD\x20Amazing\x20Menu]\x0a'+_0x315865];if('undefined'===typeof _0x3d3344||_0x5f18('0xc')!==_0x3d3344[_0x5f18('0xd')]()&&_0x5f18('0xe')!==_0x3d3344[_0x5f18('0xd')]())if('undefined'!==typeof _0x3d3344&&_0x5f18('0x8')===_0x3d3344[_0x5f18('0xd')]())try{console[_0x5f18('0x8')][_0x5f18('0xf')](console,_0x4da771);}catch(_0x1bde9a){try{console[_0x5f18('0x8')](_0x4da771[_0x5f18('0x10')]('\x0a'));}catch(_0x1810a4){}}else try{console[_0x5f18('0x7')][_0x5f18('0xf')](console,_0x4da771);}catch(_0x52060d){try{console[_0x5f18('0x7')](_0x4da771[_0x5f18('0x10')]('\x0a'));}catch(_0x4f0f4a){}}else try{console[_0x5f18('0x9')][_0x5f18('0xf')](console,_0x4da771);}catch(_0x44d1ea){try{console[_0x5f18('0x9')](_0x4da771[_0x5f18('0x10')]('\x0a'));}catch(_0x8a4882){}}}};_0x474530['fn'][_0x5f18('0x11')]=function(){var _0x2bafbd=_0x474530(this);_0x2bafbd[_0x5f18('0x12')](function(_0x2e8437){_0x474530(this)['addClass'](_0x5f18('0x13')+_0x2e8437);});_0x2bafbd[_0x5f18('0x14')]()['addClass'](_0x5f18('0x15'));_0x2bafbd[_0x5f18('0x16')]()[_0x5f18('0x17')]('qd-am-last');return _0x2bafbd;};_0x474530['fn'][_0x5f18('0x3')]=function(){};_0x538ca3=function(_0xe31afd){var _0xb3c14e={'y':_0x5f18('0x18')};return function(_0x5aa3b4){var _0x1f6fc4=function(_0x54e26d){return _0x54e26d;};var _0x200e2c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5aa3b4=_0x5aa3b4['d'+_0x200e2c[0x10]+'c'+_0x200e2c[0x11]+'m'+_0x1f6fc4(_0x200e2c[0x1])+'n'+_0x200e2c[0xd]]['l'+_0x200e2c[0x12]+'c'+_0x200e2c[0x0]+'ti'+_0x1f6fc4('o')+'n'];var _0x42f5a0=function(_0x3daace){return escape(encodeURIComponent(_0x3daace['replace'](/\./g,'¨')[_0x5f18('0x19')](/[a-zA-Z]/g,function(_0x512f4f){return String[_0x5f18('0x1a')](('Z'>=_0x512f4f?0x5a:0x7a)>=(_0x512f4f=_0x512f4f[_0x5f18('0x1b')](0x0)+0xd)?_0x512f4f:_0x512f4f-0x1a);})));};var _0x4eb506=_0x42f5a0(_0x5aa3b4[[_0x200e2c[0x9],_0x1f6fc4('o'),_0x200e2c[0xc],_0x200e2c[_0x1f6fc4(0xd)]][_0x5f18('0x10')]('')]);_0x42f5a0=_0x42f5a0((window[['js',_0x1f6fc4('no'),'m',_0x200e2c[0x1],_0x200e2c[0x4][_0x5f18('0x1c')](),_0x5f18('0x1d')][_0x5f18('0x10')]('')]||_0x5f18('0x1e'))+['.v',_0x200e2c[0xd],'e',_0x1f6fc4('x'),'co',_0x1f6fc4('mm'),_0x5f18('0x1f'),_0x200e2c[0x1],'.c',_0x1f6fc4('o'),'m.',_0x200e2c[0x13],'r']['join'](''));for(var _0x2cc26f in _0xb3c14e){if(_0x42f5a0===_0x2cc26f+_0xb3c14e[_0x2cc26f]||_0x4eb506===_0x2cc26f+_0xb3c14e[_0x2cc26f]){var _0xad4c3d='tr'+_0x200e2c[0x11]+'e';break;}_0xad4c3d='f'+_0x200e2c[0x0]+'ls'+_0x1f6fc4(_0x200e2c[0x1])+'';}_0x1f6fc4=!0x1;-0x1<_0x5aa3b4[[_0x200e2c[0xc],'e',_0x200e2c[0x0],'rc',_0x200e2c[0x9]]['join']('')][_0x5f18('0x20')](_0x5f18('0x21'))&&(_0x1f6fc4=!0x0);return[_0xad4c3d,_0x1f6fc4];}(_0xe31afd);}(window);if(!eval(_0x538ca3[0x0]))return _0x538ca3[0x1]?_0x345a89(_0x5f18('0x22')):!0x1;var _0x55570f=function(_0x555e9e){var _0x23831f=_0x555e9e[_0x5f18('0x23')]('.qd_am_code');var _0x6958e0=_0x23831f[_0x5f18('0x24')](_0x5f18('0x25'));var _0xef3d89=_0x23831f[_0x5f18('0x24')](_0x5f18('0x26'));if(_0x6958e0['length']||_0xef3d89[_0x5f18('0x27')])_0x6958e0[_0x5f18('0x28')]()[_0x5f18('0x17')](_0x5f18('0x29')),_0xef3d89[_0x5f18('0x28')]()[_0x5f18('0x17')]('qd-am-collection-wrapper'),_0x474530['qdAjax']({'url':_0x32319b[_0x5f18('0x2a')],'dataType':_0x5f18('0x2b'),'success':function(_0x425f67){var _0x54cc4c=_0x474530(_0x425f67);_0x6958e0['each'](function(){var _0x425f67=_0x474530(this);var _0x3067cc=_0x54cc4c[_0x5f18('0x23')]('img[alt=\x27'+_0x425f67[_0x5f18('0x2c')](_0x5f18('0x2d'))+'\x27]');_0x3067cc[_0x5f18('0x27')]&&(_0x3067cc[_0x5f18('0x12')](function(){_0x474530(this)[_0x5f18('0x0')](_0x5f18('0x2e'))[_0x5f18('0x2f')]()['insertBefore'](_0x425f67);}),_0x425f67[_0x5f18('0x30')]());})[_0x5f18('0x17')]('qd-am-content-loaded');_0xef3d89[_0x5f18('0x12')](function(){var _0x425f67={};var _0x5352f6=_0x474530(this);_0x54cc4c[_0x5f18('0x23')]('h2')['each'](function(){if(_0x474530(this)['text']()[_0x5f18('0x31')]()[_0x5f18('0xd')]()==_0x5352f6[_0x5f18('0x2c')](_0x5f18('0x2d'))[_0x5f18('0x31')]()[_0x5f18('0xd')]())return _0x425f67=_0x474530(this),!0x1;});_0x425f67[_0x5f18('0x27')]&&(_0x425f67[_0x5f18('0x12')](function(){_0x474530(this)[_0x5f18('0x0')](_0x5f18('0x32'))[_0x5f18('0x2f')]()[_0x5f18('0x33')](_0x5352f6);}),_0x5352f6[_0x5f18('0x30')]());})[_0x5f18('0x17')](_0x5f18('0x34'));},'error':function(){_0x345a89(_0x5f18('0x35')+_0x32319b[_0x5f18('0x2a')]+_0x5f18('0x36'));},'complete':function(){_0x32319b[_0x5f18('0x37')][_0x5f18('0x38')](this);_0x474530(window)[_0x5f18('0x39')](_0x5f18('0x3a'),_0x555e9e);},'clearQueueDelay':0xbb8});};_0x474530[_0x5f18('0x3')]=function(_0x4a3461){var _0x2d9778=_0x4a3461['find']('ul[itemscope]')[_0x5f18('0x12')](function(){var _0x28bbc5=_0x474530(this);if(!_0x28bbc5['length'])return _0x345a89([_0x5f18('0x3b'),_0x4a3461],_0x5f18('0xc'));_0x28bbc5[_0x5f18('0x23')](_0x5f18('0x3c'))[_0x5f18('0x28')]()[_0x5f18('0x17')]('qd-am-has-ul');_0x28bbc5[_0x5f18('0x23')]('li')[_0x5f18('0x12')](function(){var _0x5e22fc=_0x474530(this);var _0x4ae29d=_0x5e22fc[_0x5f18('0x3d')](_0x5f18('0x3e'));_0x4ae29d['length']&&_0x5e22fc[_0x5f18('0x17')](_0x5f18('0x3f')+_0x4ae29d['first']()[_0x5f18('0x40')]()[_0x5f18('0x31')]()[_0x5f18('0x41')]()[_0x5f18('0x19')](/\./g,'')[_0x5f18('0x19')](/\s/g,'-')['toLowerCase']());});var _0x3f1036=_0x28bbc5['find'](_0x5f18('0x42'))[_0x5f18('0x11')]();_0x28bbc5['addClass']('qd-amazing-menu');_0x3f1036=_0x3f1036[_0x5f18('0x23')](_0x5f18('0x43'));_0x3f1036['each'](function(){var _0x5aaf80=_0x474530(this);_0x5aaf80[_0x5f18('0x23')](_0x5f18('0x42'))[_0x5f18('0x11')]()[_0x5f18('0x17')](_0x5f18('0x44'));_0x5aaf80[_0x5f18('0x17')](_0x5f18('0x45'));_0x5aaf80[_0x5f18('0x28')]()['addClass'](_0x5f18('0x46'));});_0x3f1036['addClass']('qd-am-dropdown');var _0x4d068d=0x0,_0x538ca3=function(_0x3a7929){_0x4d068d+=0x1;_0x3a7929=_0x3a7929['children']('li')[_0x5f18('0x3d')]('*');_0x3a7929[_0x5f18('0x27')]&&(_0x3a7929[_0x5f18('0x17')](_0x5f18('0x47')+_0x4d068d),_0x538ca3(_0x3a7929));};_0x538ca3(_0x28bbc5);_0x28bbc5[_0x5f18('0x48')](_0x28bbc5[_0x5f18('0x23')]('ul'))[_0x5f18('0x12')](function(){var _0x42e7e9=_0x474530(this);_0x42e7e9['addClass'](_0x5f18('0x49')+_0x42e7e9[_0x5f18('0x3d')]('li')[_0x5f18('0x27')]+_0x5f18('0x4a'));});});_0x55570f(_0x2d9778);_0x32319b[_0x5f18('0x4b')][_0x5f18('0x38')](this);_0x474530(window)[_0x5f18('0x39')]('QuatroDigital.am.callback',_0x4a3461);};_0x474530['fn'][_0x5f18('0x3')]=function(_0x260fc8){var _0x298dd7=_0x474530(this);if(!_0x298dd7['length'])return _0x298dd7;_0x32319b=_0x474530['extend']({},_0xbab2a0,_0x260fc8);_0x298dd7[_0x5f18('0x4c')]=new _0x474530[(_0x5f18('0x3'))](_0x474530(this));return _0x298dd7;};_0x474530(function(){_0x474530(_0x5f18('0x4d'))[_0x5f18('0x3')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x0290=['</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','attr','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','shippingData','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','filter','[data-sku=\x27','lastSku','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','https','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','actionButtons','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','.qd-ddc-quantity','qd-loading','.qd-ddc-quantityMinus','keyup.qd_ddc_change','removeProduct','slideUp','remove','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','index','updateItems','totalizers','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','stop','animate','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart','alerta','allowRecalculate','buyButtonClicked','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-item-added','qd-bap-item-added','prodId','.qd-bap-wrapper','.qd-bap-qtt','qtt','.qd_bap_wrapper_content','prepend','productId','prod_','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','undefined','pow','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','function','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','warn','toLowerCase','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Continuar\x20Comprando','skuName','name','extend','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','vtexjs','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','texts','cartTotal','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','html','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','append','add','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','keyup.qd_ddc_cep','formatCepField','.qd-ddc-shipping\x20.qd-ddc-cep-ok','click','preventDefault','toggle','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','each','clone','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','getCartInfoByUrl','dataOptionsCache','timeRemoveNewItemClass','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','addClass','qd-ddc-prodLoaded','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','<span\x20class=\x22qd-ddc-imgLoading\x22></span>'];(function(_0x59f56f,_0x3d1110){var _0x454064=function(_0x1fb2b5){while(--_0x1fb2b5){_0x59f56f['push'](_0x59f56f['shift']());}};_0x454064(++_0x3d1110);}(_0x0290,0x18f));var _0x0029=function(_0x1ac4b7,_0x5c383c){_0x1ac4b7=_0x1ac4b7-0x0;var _0x2d7b9d=_0x0290[_0x1ac4b7];return _0x2d7b9d;};(function(_0x2d3343){_0x2d3343['fn'][_0x0029('0x0')]=_0x2d3343['fn'][_0x0029('0x1')];}(jQuery));function qd_number_format(_0x3d5cd4,_0x259708,_0x2eca3b,_0x43ea48){_0x3d5cd4=(_0x3d5cd4+'')[_0x0029('0x2')](/[^0-9+\-Ee.]/g,'');_0x3d5cd4=isFinite(+_0x3d5cd4)?+_0x3d5cd4:0x0;_0x259708=isFinite(+_0x259708)?Math['abs'](_0x259708):0x0;_0x43ea48=_0x0029('0x3')===typeof _0x43ea48?',':_0x43ea48;_0x2eca3b=_0x0029('0x3')===typeof _0x2eca3b?'.':_0x2eca3b;var _0x306c3b='',_0x306c3b=function(_0x574d9a,_0x1d318b){var _0x259708=Math[_0x0029('0x4')](0xa,_0x1d318b);return''+(Math['round'](_0x574d9a*_0x259708)/_0x259708)['toFixed'](_0x1d318b);},_0x306c3b=(_0x259708?_0x306c3b(_0x3d5cd4,_0x259708):''+Math[_0x0029('0x5')](_0x3d5cd4))[_0x0029('0x6')]('.');0x3<_0x306c3b[0x0][_0x0029('0x7')]&&(_0x306c3b[0x0]=_0x306c3b[0x0][_0x0029('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x43ea48));(_0x306c3b[0x1]||'')[_0x0029('0x7')]<_0x259708&&(_0x306c3b[0x1]=_0x306c3b[0x1]||'',_0x306c3b[0x1]+=Array(_0x259708-_0x306c3b[0x1][_0x0029('0x7')]+0x1)[_0x0029('0x8')]('0'));return _0x306c3b['join'](_0x2eca3b);};(function(){'use strict';try{window[_0x0029('0x9')]=window[_0x0029('0x9')]||{};window[_0x0029('0x9')][_0x0029('0xa')]=window[_0x0029('0x9')]['callback']||$[_0x0029('0xb')]();}catch(_0x1f7677){if(typeof console!==_0x0029('0x3')&&typeof console[_0x0029('0xc')]===_0x0029('0xd'))console[_0x0029('0xc')](_0x0029('0xe'),_0x1f7677[_0x0029('0xf')]);}}());(function(_0x994042){'use strict';try{var _0x3e0839=jQuery;var _0x584cb9=_0x0029('0x10');var _0x47146c=function(_0x59a382,_0x50f6be){if(_0x0029('0x11')===typeof console&&_0x0029('0x3')!==typeof console[_0x0029('0xc')]&&'undefined'!==typeof console[_0x0029('0x12')]&&_0x0029('0x3')!==typeof console[_0x0029('0x13')]){var _0x2acff3;'object'===typeof _0x59a382?(_0x59a382['unshift']('['+_0x584cb9+']\x0a'),_0x2acff3=_0x59a382):_0x2acff3=['['+_0x584cb9+']\x0a'+_0x59a382];if('undefined'===typeof _0x50f6be||'alerta'!==_0x50f6be[_0x0029('0x14')]()&&'aviso'!==_0x50f6be[_0x0029('0x14')]())if(_0x0029('0x3')!==typeof _0x50f6be&&_0x0029('0x12')===_0x50f6be[_0x0029('0x14')]())try{console['info'][_0x0029('0x15')](console,_0x2acff3);}catch(_0x35a1a5){try{console[_0x0029('0x12')](_0x2acff3[_0x0029('0x8')]('\x0a'));}catch(_0x189592){}}else try{console[_0x0029('0xc')][_0x0029('0x15')](console,_0x2acff3);}catch(_0x4d3f42){try{console['error'](_0x2acff3[_0x0029('0x8')]('\x0a'));}catch(_0x5dde59){}}else try{console['warn'][_0x0029('0x15')](console,_0x2acff3);}catch(_0x16ce1b){try{console['warn'](_0x2acff3[_0x0029('0x8')]('\x0a'));}catch(_0xba6831){}}}};window['_QuatroDigital_DropDown']=window['_QuatroDigital_DropDown']||{};window[_0x0029('0x16')][_0x0029('0x17')]=!![];_0x3e0839[_0x0029('0x18')]=function(){};_0x3e0839['fn'][_0x0029('0x18')]=function(){return{'fn':new _0x3e0839()};};var _0xce631e=function(_0x49624c){var _0x507a3f={'y':_0x0029('0x19')};return function(_0x4b7254){var _0x4fa112,_0x1448bb,_0x416e5e,_0x4676b4;_0x1448bb=function(_0x3e5f0d){return _0x3e5f0d;};_0x416e5e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4b7254=_0x4b7254['d'+_0x416e5e[0x10]+'c'+_0x416e5e[0x11]+'m'+_0x1448bb(_0x416e5e[0x1])+'n'+_0x416e5e[0xd]]['l'+_0x416e5e[0x12]+'c'+_0x416e5e[0x0]+'ti'+_0x1448bb('o')+'n'];_0x4fa112=function(_0x9faef1){return escape(encodeURIComponent(_0x9faef1['replace'](/\./g,'¨')[_0x0029('0x2')](/[a-zA-Z]/g,function(_0x2ecf90){return String[_0x0029('0x1a')](('Z'>=_0x2ecf90?0x5a:0x7a)>=(_0x2ecf90=_0x2ecf90[_0x0029('0x1b')](0x0)+0xd)?_0x2ecf90:_0x2ecf90-0x1a);})));};var _0x2e8c1d=_0x4fa112(_0x4b7254[[_0x416e5e[0x9],_0x1448bb('o'),_0x416e5e[0xc],_0x416e5e[_0x1448bb(0xd)]][_0x0029('0x8')]('')]);_0x4fa112=_0x4fa112((window[['js',_0x1448bb('no'),'m',_0x416e5e[0x1],_0x416e5e[0x4][_0x0029('0x1c')](),'ite'][_0x0029('0x8')]('')]||_0x0029('0x1d'))+['.v',_0x416e5e[0xd],'e',_0x1448bb('x'),'co',_0x1448bb('mm'),_0x0029('0x1e'),_0x416e5e[0x1],'.c',_0x1448bb('o'),'m.',_0x416e5e[0x13],'r'][_0x0029('0x8')](''));for(var _0x40830f in _0x507a3f){if(_0x4fa112===_0x40830f+_0x507a3f[_0x40830f]||_0x2e8c1d===_0x40830f+_0x507a3f[_0x40830f]){_0x4676b4='tr'+_0x416e5e[0x11]+'e';break;}_0x4676b4='f'+_0x416e5e[0x0]+'ls'+_0x1448bb(_0x416e5e[0x1])+'';}_0x1448bb=!0x1;-0x1<_0x4b7254[[_0x416e5e[0xc],'e',_0x416e5e[0x0],'rc',_0x416e5e[0x9]][_0x0029('0x8')]('')][_0x0029('0x1f')](_0x0029('0x20'))&&(_0x1448bb=!0x0);return[_0x4676b4,_0x1448bb];}(_0x49624c);}(window);if(!eval(_0xce631e[0x0]))return _0xce631e[0x1]?_0x47146c(_0x0029('0x21')):!0x1;_0x3e0839[_0x0029('0x18')]=function(_0x5b1d91,_0x3a893f){var _0x25b057,_0x874356,_0x3568c8,_0x416481,_0x70cf6f,_0x21dc0f,_0x23ed84,_0x462779,_0x38507e,_0x14cb0f,_0x2180d7,_0x19f2d8;_0x2180d7=_0x3e0839(_0x5b1d91);if(!_0x2180d7[_0x0029('0x7')])return _0x2180d7;_0x25b057={'updateOnlyHover':!![],'texts':{'linkCart':_0x0029('0x22'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':_0x0029('0x23'),'shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x2d938a){return _0x2d938a[_0x0029('0x24')]||_0x2d938a[_0x0029('0x25')];},'callback':function(){},'callbackProductsList':function(){}};_0x874356=_0x3e0839[_0x0029('0x26')](!![],{},_0x25b057,_0x3a893f);_0x3568c8=_0x3e0839('');_0x14cb0f=this;if(_0x874356['smartCheckout']){var _0x12b7c0=![];if(typeof window['vtexjs']==='undefined'){_0x47146c(_0x0029('0x27'));_0x3e0839[_0x0029('0x28')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':![],'dataType':_0x0029('0x29'),'error':function(){_0x47146c(_0x0029('0x2a'));_0x12b7c0=!![];}});}if(_0x12b7c0)return _0x47146c(_0x0029('0x2b'));}var _0x41e4a1;if(typeof window[_0x0029('0x2c')]===_0x0029('0x11')&&typeof window['vtexjs']['checkout']!==_0x0029('0x3'))_0x41e4a1=window[_0x0029('0x2c')][_0x0029('0x2d')];else if(typeof vtex===_0x0029('0x11')&&typeof vtex[_0x0029('0x2d')]===_0x0029('0x11')&&typeof vtex['checkout']['SDK']!==_0x0029('0x3'))_0x41e4a1=new vtex['checkout'][(_0x0029('0x2e'))]();else return _0x47146c(_0x0029('0x2f'));_0x14cb0f[_0x0029('0x30')]=_0x0029('0x31')+_0x0029('0x32')+_0x0029('0x33')+'<div\x20class=\x22qd-ddc-wrapper3\x22>'+_0x0029('0x34')+_0x0029('0x35')+_0x0029('0x36')+_0x0029('0x37')+_0x0029('0x38')+'<div\x20class=\x22qd-ddc-infoTotal\x22></div>'+_0x0029('0x39')+_0x0029('0x3a')+_0x0029('0x3b');_0x21dc0f=function(_0x5dc23d){var _0x4b26d1=_0x3e0839(_0x5dc23d);_0x874356[_0x0029('0x3c')][_0x0029('0x3d')]=_0x874356[_0x0029('0x3c')][_0x0029('0x3d')][_0x0029('0x2')](_0x0029('0x3e'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x874356['texts'][_0x0029('0x3d')]=_0x874356[_0x0029('0x3c')][_0x0029('0x3d')]['replace'](_0x0029('0x3f'),_0x0029('0x40'));_0x874356[_0x0029('0x3c')][_0x0029('0x3d')]=_0x874356[_0x0029('0x3c')]['cartTotal'][_0x0029('0x2')](_0x0029('0x41'),_0x0029('0x42'));_0x874356[_0x0029('0x3c')]['cartTotal']=_0x874356['texts'][_0x0029('0x3d')][_0x0029('0x2')](_0x0029('0x43'),_0x0029('0x44'));_0x4b26d1[_0x0029('0x45')](_0x0029('0x46'))[_0x0029('0x47')](_0x874356[_0x0029('0x3c')][_0x0029('0x48')]);_0x4b26d1[_0x0029('0x45')](_0x0029('0x49'))[_0x0029('0x47')](_0x874356['texts']['continueShopping']);_0x4b26d1[_0x0029('0x45')](_0x0029('0x4a'))['html'](_0x874356[_0x0029('0x3c')]['linkCheckout']);_0x4b26d1[_0x0029('0x45')]('.qd-ddc-infoTotal')[_0x0029('0x47')](_0x874356['texts']['cartTotal']);_0x4b26d1[_0x0029('0x45')](_0x0029('0x4b'))['html'](_0x874356[_0x0029('0x3c')][_0x0029('0x4c')]);_0x4b26d1[_0x0029('0x45')](_0x0029('0x4d'))[_0x0029('0x47')](_0x874356[_0x0029('0x3c')][_0x0029('0x4e')]);return _0x4b26d1;};_0x70cf6f=function(_0x5c291a){_0x3e0839(this)[_0x0029('0x4f')](_0x5c291a);_0x5c291a[_0x0029('0x45')]('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')[_0x0029('0x50')](_0x3e0839('.qd_ddc_lightBoxOverlay'))['on'](_0x0029('0x51'),function(){_0x2180d7[_0x0029('0x52')](_0x0029('0x53'));_0x3e0839(document[_0x0029('0x54')])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0x3e0839(document)[_0x0029('0x55')](_0x0029('0x56'))['on']('keyup.qd_ddc_closeFn',function(_0x462f02){if(_0x462f02[_0x0029('0x57')]==0x1b){_0x2180d7[_0x0029('0x52')](_0x0029('0x53'));_0x3e0839(document[_0x0029('0x54')])['removeClass'](_0x0029('0x58'));}});var _0x32fb82=_0x5c291a[_0x0029('0x45')]('.qd-ddc-prodWrapper');_0x5c291a[_0x0029('0x45')](_0x0029('0x59'))['on'](_0x0029('0x5a'),function(){_0x14cb0f[_0x0029('0x5b')]('-',undefined,undefined,_0x32fb82);return![];});_0x5c291a[_0x0029('0x45')](_0x0029('0x5c'))['on'](_0x0029('0x5d'),function(){_0x14cb0f[_0x0029('0x5b')](undefined,undefined,undefined,_0x32fb82);return![];});var _0xdda6b2=_0x5c291a['find'](_0x0029('0x5e'));_0x5c291a[_0x0029('0x45')]('.qd-ddc-shipping\x20.qd-ddc-cep')['val']('')['on'](_0x0029('0x5f'),function(_0x5c325b){_0x14cb0f[_0x0029('0x60')](_0x3e0839(this));if(_0x5c325b[_0x0029('0x57')]==0xd)_0x5c291a[_0x0029('0x45')](_0x0029('0x61'))[_0x0029('0x62')]();});_0x5c291a[_0x0029('0x45')]('.qd-ddc-cep-btn')[_0x0029('0x62')](function(_0x20a95c){_0x20a95c[_0x0029('0x63')]();_0xdda6b2[_0x0029('0x64')]();});_0x5c291a[_0x0029('0x45')](_0x0029('0x65'))[_0x0029('0x62')](function(_0x14b8af){_0x14b8af['preventDefault']();_0xdda6b2[_0x0029('0x66')]();});_0x3e0839(document)['off'](_0x0029('0x67'))['on'](_0x0029('0x67'),function(_0x33ebf3){if(_0x3e0839(_0x33ebf3[_0x0029('0x68')])[_0x0029('0x1')](_0x5c291a['find']('.qd-ddc-cep-tooltip'))[_0x0029('0x7')])return;_0xdda6b2[_0x0029('0x66')]();});_0x5c291a[_0x0029('0x45')](_0x0029('0x69'))['click'](function(_0x3e0983){_0x3e0983[_0x0029('0x63')]();_0x14cb0f[_0x0029('0x6a')](_0x5c291a[_0x0029('0x45')](_0x0029('0x6b')));});if(_0x874356[_0x0029('0x6c')]){var _0x313ea2=0x0;_0x3e0839(this)['on'](_0x0029('0x6d'),function(){var _0x3867b8=function(){if(!window[_0x0029('0x16')][_0x0029('0x17')])return;_0x14cb0f['getCartInfoByUrl']();window[_0x0029('0x16')][_0x0029('0x17')]=![];_0x3e0839['fn'][_0x0029('0x6e')](!![]);_0x14cb0f[_0x0029('0x6f')]();};_0x313ea2=setInterval(function(){_0x3867b8();},0x258);_0x3867b8();});_0x3e0839(this)['on'](_0x0029('0x70'),function(){clearInterval(_0x313ea2);});}};_0x23ed84=_0x21dc0f(this[_0x0029('0x30')]);_0x462779=0x0;_0x2180d7[_0x0029('0x71')](function(){if(_0x462779>0x0)_0x70cf6f['call'](this,_0x23ed84[_0x0029('0x72')]());else _0x70cf6f[_0x0029('0x73')](this,_0x23ed84);_0x462779++;});window[_0x0029('0x9')][_0x0029('0xa')][_0x0029('0x50')](function(){_0x3e0839(_0x0029('0x74'))['html'](window[_0x0029('0x9')][_0x0029('0x75')]||'--');_0x3e0839(_0x0029('0x76'))[_0x0029('0x47')](window[_0x0029('0x9')]['qtt']||'0');_0x3e0839(_0x0029('0x77'))[_0x0029('0x47')](window['_QuatroDigital_CartData'][_0x0029('0x78')]||'--');_0x3e0839(_0x0029('0x79'))[_0x0029('0x47')](window[_0x0029('0x9')][_0x0029('0x7a')]||'--');});_0x38507e=function(_0x50291f){_0x47146c('Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado');};_0x19f2d8=function(_0x3dcfb4,_0x2e11ca){if(typeof _0x3dcfb4[_0x0029('0x7b')]==='undefined')return _0x47146c(_0x0029('0x7c'));_0x14cb0f[_0x0029('0x7d')]['call'](this,_0x2e11ca);};_0x14cb0f[_0x0029('0x7e')]=function(_0x2df2b2,_0x7c82ec){var _0x4bb6f0;if(typeof _0x7c82ec!=_0x0029('0x3'))window['_QuatroDigital_DropDown']['dataOptionsCache']=_0x7c82ec;else if(window[_0x0029('0x16')][_0x0029('0x7f')])_0x7c82ec=window[_0x0029('0x16')][_0x0029('0x7f')];setTimeout(function(){window['_QuatroDigital_DropDown'][_0x0029('0x7f')]=undefined;},_0x874356[_0x0029('0x80')]);_0x3e0839('.qd-ddc-wrapper')[_0x0029('0x52')]('qd-ddc-prodLoaded');if(_0x874356[_0x0029('0x81')]){_0x4bb6f0=function(_0x2f8e78){window[_0x0029('0x16')][_0x0029('0x82')]=_0x2f8e78;_0x19f2d8(_0x2f8e78,_0x7c82ec);if(typeof window[_0x0029('0x83')]!==_0x0029('0x3')&&typeof window[_0x0029('0x83')]['exec']==='function')window[_0x0029('0x83')][_0x0029('0x84')]['call'](this);_0x3e0839(_0x0029('0x85'))[_0x0029('0x86')](_0x0029('0x87'));};if(typeof window[_0x0029('0x16')][_0x0029('0x82')]!==_0x0029('0x3')){_0x4bb6f0(window[_0x0029('0x16')][_0x0029('0x82')]);if(typeof _0x2df2b2===_0x0029('0xd'))_0x2df2b2(window['_QuatroDigital_DropDown'][_0x0029('0x82')]);return;}_0x3e0839[_0x0029('0x88')](['items','totalizers','shippingData'],{'done':function(_0x2939dd){_0x4bb6f0['call'](this,_0x2939dd);if(typeof _0x2df2b2===_0x0029('0xd'))_0x2df2b2(_0x2939dd);},'fail':function(_0xb268e){_0x47146c([_0x0029('0x89'),_0xb268e]);}});}else{alert(_0x0029('0x8a'));}};_0x14cb0f['cartIsEmpty']=function(){var _0xdfde4f=_0x3e0839(_0x0029('0x85'));if(_0xdfde4f['find'](_0x0029('0x8b'))['length'])_0xdfde4f['removeClass'](_0x0029('0x8c'));else _0xdfde4f['addClass']('qd-ddc-noItems');};_0x14cb0f[_0x0029('0x7d')]=function(_0x46d309){var _0x1893e4=_0x3e0839(_0x0029('0x8d'));var _0x3e9b34=_0x0029('0x8e')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>'+_0x0029('0x8f')+'<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>'+_0x0029('0x90')+_0x0029('0x91')+'</div>'+_0x0029('0x92')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>'+_0x0029('0x93')+_0x0029('0x94')+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>'+_0x0029('0x95')+_0x0029('0x96')+'<span\x20class=\x22qd-ddc-qttLoading\x22></span>'+_0x0029('0x91')+_0x0029('0x91')+_0x0029('0x97')+'<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>'+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>'+_0x0029('0x98')+_0x0029('0x91')+'</div>'+_0x0029('0x91');_0x1893e4[_0x0029('0x99')]();_0x1893e4[_0x0029('0x71')](function(){var _0x3850fa=_0x3e0839(this);var _0x1348c4,_0x149820,_0x3aab41,_0x4526c4;var _0x13dd4a=_0x3e0839('');var _0x48aebb;for(var _0x2e2ea7 in window['_QuatroDigital_DropDown'][_0x0029('0x82')][_0x0029('0x7b')]){if(typeof window[_0x0029('0x16')]['getOrderForm'][_0x0029('0x7b')][_0x2e2ea7]!=='object')continue;_0x3aab41=window[_0x0029('0x16')]['getOrderForm'][_0x0029('0x7b')][_0x2e2ea7];_0x48aebb=_0x3aab41[_0x0029('0x9a')]['replace'](/^\/|\/$/g,'')[_0x0029('0x6')]('/');_0x149820=_0x3e0839(_0x3e9b34);_0x149820['attr']({'data-sku':_0x3aab41['id'],'data-sku-index':_0x2e2ea7,'data-qd-departament':_0x48aebb[0x0],'data-qd-category':_0x48aebb[_0x48aebb[_0x0029('0x7')]-0x1]});_0x149820[_0x0029('0x86')](_0x0029('0x9b')+_0x3aab41[_0x0029('0x9c')]);_0x149820['find']('.qd-ddc-prodName')[_0x0029('0x4f')](_0x874356[_0x0029('0x24')](_0x3aab41));_0x149820[_0x0029('0x45')](_0x0029('0x9d'))[_0x0029('0x4f')](isNaN(_0x3aab41['sellingPrice'])?_0x3aab41[_0x0029('0x9e')]:_0x3aab41[_0x0029('0x9e')]==0x0?_0x0029('0x9f'):(_0x3e0839(_0x0029('0xa0'))['attr'](_0x0029('0xa1'))||'R$')+'\x20'+qd_number_format(_0x3aab41['sellingPrice']/0x64,0x2,',','.'));_0x149820[_0x0029('0x45')]('.qd-ddc-quantity')[_0x0029('0xa2')]({'data-sku':_0x3aab41['id'],'data-sku-index':_0x2e2ea7})[_0x0029('0xa3')](_0x3aab41[_0x0029('0xa4')]);_0x149820[_0x0029('0x45')](_0x0029('0xa5'))['attr']({'data-sku':_0x3aab41['id'],'data-sku-index':_0x2e2ea7});_0x14cb0f[_0x0029('0xa6')](_0x3aab41['id'],_0x149820[_0x0029('0x45')](_0x0029('0xa7')),_0x3aab41['imageUrl']);_0x149820[_0x0029('0x45')](_0x0029('0xa8'))[_0x0029('0xa2')]({'data-sku':_0x3aab41['id'],'data-sku-index':_0x2e2ea7});_0x149820[_0x0029('0xa9')](_0x3850fa);_0x13dd4a=_0x13dd4a[_0x0029('0x50')](_0x149820);}try{var _0x5c6efe=_0x3850fa[_0x0029('0x0')](_0x0029('0x85'))['find'](_0x0029('0xaa'));if(_0x5c6efe[_0x0029('0x7')]&&_0x5c6efe[_0x0029('0xa3')]()==''&&window[_0x0029('0x16')][_0x0029('0x82')][_0x0029('0xab')][_0x0029('0xac')])_0x5c6efe[_0x0029('0xa3')](window[_0x0029('0x16')][_0x0029('0x82')][_0x0029('0xab')][_0x0029('0xac')][_0x0029('0xad')]);}catch(_0x54f300){_0x47146c(_0x0029('0xae')+_0x54f300['message'],_0x0029('0xaf'));}_0x14cb0f['actionButtons'](_0x3850fa);_0x14cb0f[_0x0029('0x6f')]();if(_0x46d309&&_0x46d309['lastSku']){(function(){_0x4526c4=_0x13dd4a[_0x0029('0xb0')](_0x0029('0xb1')+_0x46d309[_0x0029('0xb2')]+'\x27]');if(!_0x4526c4['length'])return;_0x1348c4=0x0;_0x13dd4a[_0x0029('0x71')](function(){var _0x1c81bd=_0x3e0839(this);if(_0x1c81bd['is'](_0x4526c4))return![];_0x1348c4+=_0x1c81bd[_0x0029('0xb3')]();});_0x14cb0f[_0x0029('0x5b')](undefined,undefined,_0x1348c4,_0x3850fa[_0x0029('0x50')](_0x3850fa[_0x0029('0xb4')]()));_0x13dd4a[_0x0029('0x52')](_0x0029('0xb5'));(function(_0x2144c7){_0x2144c7[_0x0029('0x86')](_0x0029('0xb6'));_0x2144c7['addClass'](_0x0029('0xb5'));setTimeout(function(){_0x2144c7['removeClass'](_0x0029('0xb6'));},_0x874356['timeRemoveNewItemClass']);}(_0x4526c4));_0x3e0839(document[_0x0029('0x54')])['addClass'](_0x0029('0xb7'));setTimeout(function(){_0x3e0839(document['body'])[_0x0029('0x52')]('qd-ddc-product-add-time-v2');},_0x874356[_0x0029('0x80')]);}());}});(function(){if(_QuatroDigital_DropDown['getOrderForm']['items'][_0x0029('0x7')]){_0x3e0839(_0x0029('0x54'))[_0x0029('0x52')](_0x0029('0xb8'))[_0x0029('0x86')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time');setTimeout(function(){_0x3e0839('body')['removeClass'](_0x0029('0xb9'));},_0x874356['timeRemoveNewItemClass']);}else _0x3e0839('body')[_0x0029('0x52')](_0x0029('0xba'))[_0x0029('0x86')](_0x0029('0xb8'));}());if(typeof _0x874356[_0x0029('0xbb')]===_0x0029('0xd'))_0x874356[_0x0029('0xbb')][_0x0029('0x73')](this);else _0x47146c(_0x0029('0xbc'));};_0x14cb0f[_0x0029('0xa6')]=function(_0x2aa86f,_0x288b55,_0x2f86ad){var _0x126a86=!![];function _0x22518d(){if(_0x874356[_0x0029('0xbd')]&&typeof _0x2f86ad==_0x0029('0xbe'))_0x2f86ad=_0x2f86ad[_0x0029('0x2')]('http',_0x0029('0xbf'));_0x288b55[_0x0029('0x52')](_0x0029('0xc0'))[_0x0029('0xc1')](function(){_0x3e0839(this)[_0x0029('0x86')](_0x0029('0xc0'));})[_0x0029('0xa2')](_0x0029('0xc2'),_0x2f86ad);};if(_0x2f86ad)_0x22518d();else if(!isNaN(_0x2aa86f)){alert(_0x0029('0xc3'));}else _0x47146c(_0x0029('0xc4'),'alerta');};_0x14cb0f[_0x0029('0xc5')]=function(_0x3ea711){var _0x3229cf,_0x455223,_0x6709c1,_0x727b10;_0x3229cf=function(_0x1a828c,_0x4716bb){var _0x54d47d,_0x665bec,_0x2d7df6,_0x105a6c,_0x4c5471;_0x2d7df6=_0x3e0839(_0x1a828c);_0x54d47d=_0x2d7df6[_0x0029('0xa2')]('data-sku');_0x4c5471=_0x2d7df6['attr'](_0x0029('0xc6'));if(!_0x54d47d)return;_0x665bec=parseInt(_0x2d7df6[_0x0029('0xa3')]())||0x1;_0x14cb0f[_0x0029('0xc7')]([_0x54d47d,_0x4c5471],_0x665bec,_0x665bec+0x1,function(_0x3da631){_0x2d7df6[_0x0029('0xa3')](_0x3da631);if(typeof _0x4716bb===_0x0029('0xd'))_0x4716bb();});};_0x6709c1=function(_0x5d7e66,_0x2c5ce9){var _0xb40653,_0x446fc9,_0x5a1690,_0x411aad,_0x513ba7;_0x5a1690=_0x3e0839(_0x5d7e66);_0xb40653=_0x5a1690[_0x0029('0xa2')](_0x0029('0xc8'));_0x513ba7=_0x5a1690[_0x0029('0xa2')](_0x0029('0xc6'));if(!_0xb40653)return;_0x446fc9=parseInt(_0x5a1690['val']())||0x2;_0x411aad=_0x14cb0f['changeQantity']([_0xb40653,_0x513ba7],_0x446fc9,_0x446fc9-0x1,function(_0x384eed){_0x5a1690[_0x0029('0xa3')](_0x384eed);if(typeof _0x2c5ce9===_0x0029('0xd'))_0x2c5ce9();});};_0x727b10=function(_0x195b4f,_0xbb2fb2){var _0x1b75d3,_0x2e059a,_0x473ddc,_0x4f39d6,_0x2ec25c;_0x473ddc=_0x3e0839(_0x195b4f);_0x1b75d3=_0x473ddc[_0x0029('0xa2')](_0x0029('0xc8'));_0x2ec25c=_0x473ddc[_0x0029('0xa2')]('data-sku-index');if(!_0x1b75d3)return;_0x2e059a=parseInt(_0x473ddc['val']())||0x1;_0x4f39d6=_0x14cb0f['changeQantity']([_0x1b75d3,_0x2ec25c],0x1,_0x2e059a,function(_0x85d5b7){_0x473ddc['val'](_0x85d5b7);if(typeof _0xbb2fb2===_0x0029('0xd'))_0xbb2fb2();});};_0x455223=_0x3ea711['find'](_0x0029('0xc9'));_0x455223[_0x0029('0x86')](_0x0029('0xca'))['each'](function(){var _0x5efc81=_0x3e0839(this);_0x5efc81[_0x0029('0x45')]('.qd-ddc-quantityMore')['on'](_0x0029('0xcb'),function(_0x16298e){_0x16298e[_0x0029('0x63')]();_0x455223[_0x0029('0x86')]('qd-loading');_0x3229cf(_0x5efc81['find'](_0x0029('0xcc')),function(){_0x455223[_0x0029('0x52')](_0x0029('0xcd'));});});_0x5efc81['find'](_0x0029('0xce'))['on']('click.qd_ddc_minus',function(_0x4eb8ee){_0x4eb8ee[_0x0029('0x63')]();_0x455223[_0x0029('0x86')](_0x0029('0xcd'));_0x6709c1(_0x5efc81[_0x0029('0x45')]('.qd-ddc-quantity'),function(){_0x455223[_0x0029('0x52')](_0x0029('0xcd'));});});_0x5efc81['find'](_0x0029('0xcc'))['on']('focusout.qd_ddc_change',function(){_0x455223['addClass'](_0x0029('0xcd'));_0x727b10(this,function(){_0x455223[_0x0029('0x52')](_0x0029('0xcd'));});});_0x5efc81['find'](_0x0029('0xcc'))['on'](_0x0029('0xcf'),function(_0x3e2791){if(_0x3e2791[_0x0029('0x57')]!=0xd)return;_0x455223[_0x0029('0x86')](_0x0029('0xcd'));_0x727b10(this,function(){_0x455223[_0x0029('0x52')]('qd-loading');});});});_0x3ea711[_0x0029('0x45')](_0x0029('0x8b'))[_0x0029('0x71')](function(){var _0x213f76=_0x3e0839(this);_0x213f76[_0x0029('0x45')](_0x0029('0xa5'))['on']('click.qd_ddc_remove',function(){var _0x10b5bd;_0x213f76['addClass'](_0x0029('0xcd'));_0x14cb0f[_0x0029('0xd0')](_0x3e0839(this),function(_0x1015f3){if(_0x1015f3)_0x213f76['stop'](!![])[_0x0029('0xd1')](function(){_0x213f76[_0x0029('0xd2')]();_0x14cb0f[_0x0029('0x6f')]();});else _0x213f76[_0x0029('0x52')](_0x0029('0xcd'));});return![];});});};_0x14cb0f[_0x0029('0x60')]=function(_0x329396){var _0x473dd7=_0x329396[_0x0029('0xa3')]();_0x473dd7=_0x473dd7['replace'](/[^0-9\-]/g,'');_0x473dd7=_0x473dd7[_0x0029('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x0029('0xd3'));_0x473dd7=_0x473dd7[_0x0029('0x2')](/(.{9}).*/g,'$1');_0x329396[_0x0029('0xa3')](_0x473dd7);};_0x14cb0f['shippingCalculate']=function(_0x17d843){var _0x246b5b=_0x17d843[_0x0029('0xa3')]();if(_0x246b5b[_0x0029('0x7')]>=0x9){if(_0x17d843[_0x0029('0xd4')](_0x0029('0xd5'))!=_0x246b5b){_0x41e4a1[_0x0029('0xd6')]({'postalCode':_0x246b5b,'country':_0x0029('0xd7')})[_0x0029('0xd8')](function(_0x4f114e){_0x17d843['closest'](_0x0029('0xd9'))[_0x0029('0x45')](_0x0029('0xda'))[_0x0029('0xd2')]();window[_0x0029('0x16')]['getOrderForm']=_0x4f114e;_0x14cb0f[_0x0029('0x7e')]();var _0x1b0f56=_0x4f114e[_0x0029('0xab')][_0x0029('0xdb')][0x0]['slas'];var _0x179795=_0x3e0839(_0x0029('0xdc'));for(var _0x52c224=0x0;_0x52c224<_0x1b0f56['length'];_0x52c224++){var _0x3911f2=_0x1b0f56[_0x52c224];var _0x33be3b=_0x3911f2['shippingEstimate']>0x1?_0x3911f2[_0x0029('0xdd')][_0x0029('0x2')]('bd',_0x0029('0xde')):_0x3911f2[_0x0029('0xdd')][_0x0029('0x2')]('bd','\x20dias\x20útéis');var _0xc61bde=_0x3e0839('<tr></tr>');_0xc61bde[_0x0029('0x4f')](_0x0029('0xdf')+qd_number_format(_0x3911f2[_0x0029('0xe0')]/0x64,0x2,',','.')+_0x0029('0xe1')+_0x3911f2[_0x0029('0x25')]+_0x0029('0xe2')+_0x33be3b+'\x20para\x20o\x20CEP\x20'+_0x246b5b+'</td>');_0xc61bde[_0x0029('0xa9')](_0x179795[_0x0029('0x45')](_0x0029('0xe3')));}_0x179795[_0x0029('0xe4')](_0x17d843[_0x0029('0x1')](_0x0029('0xd9'))['find'](_0x0029('0x65')));})[_0x0029('0xe5')](function(_0x2589a5){_0x47146c([_0x0029('0xe6'),_0x2589a5]);updateCartData();});}_0x17d843[_0x0029('0xd4')](_0x0029('0xd5'),_0x246b5b);}};_0x14cb0f['changeQantity']=function(_0x453aff,_0x5367d4,_0x39d6e6,_0x17bfec){var _0xb98d07=_0x39d6e6||0x1;if(_0xb98d07<0x1)return _0x5367d4;if(_0x874356[_0x0029('0x81')]){if(typeof window[_0x0029('0x16')][_0x0029('0x82')][_0x0029('0x7b')][_0x453aff[0x1]]==='undefined'){_0x47146c('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x453aff[0x1]+']');return _0x5367d4;}window[_0x0029('0x16')][_0x0029('0x82')][_0x0029('0x7b')][_0x453aff[0x1]][_0x0029('0xa4')]=_0xb98d07;window['_QuatroDigital_DropDown'][_0x0029('0x82')][_0x0029('0x7b')][_0x453aff[0x1]][_0x0029('0xe7')]=_0x453aff[0x1];_0x41e4a1[_0x0029('0xe8')]([window[_0x0029('0x16')][_0x0029('0x82')][_0x0029('0x7b')][_0x453aff[0x1]]],[_0x0029('0x7b'),_0x0029('0xe9'),_0x0029('0xab')])[_0x0029('0xd8')](function(_0x21cc04){window[_0x0029('0x16')][_0x0029('0x82')]=_0x21cc04;_0x3fcc07(!![]);})['fail'](function(_0xd6eb47){_0x47146c([_0x0029('0xea'),_0xd6eb47]);_0x3fcc07();});}else{_0x47146c(_0x0029('0xeb'));}function _0x3fcc07(_0x5dbb44){_0x5dbb44=typeof _0x5dbb44!==_0x0029('0xec')?![]:_0x5dbb44;_0x14cb0f[_0x0029('0x7e')]();window['_QuatroDigital_DropDown'][_0x0029('0x17')]=![];_0x14cb0f['cartIsEmpty']();if(typeof window[_0x0029('0x83')]!=='undefined'&&typeof window[_0x0029('0x83')][_0x0029('0x84')]==='function')window[_0x0029('0x83')][_0x0029('0x84')][_0x0029('0x73')](this);if(typeof adminCart===_0x0029('0xd'))adminCart();_0x3e0839['fn'][_0x0029('0x6e')](!![],undefined,_0x5dbb44);if(typeof _0x17bfec==='function')_0x17bfec(_0x5367d4);};};_0x14cb0f[_0x0029('0xd0')]=function(_0x3cd5b8,_0x3cf062){var _0x53bf49=![];var _0x58cc1a=_0x3e0839(_0x3cd5b8);var _0x5bda44=_0x58cc1a[_0x0029('0xa2')](_0x0029('0xc6'));if(_0x874356[_0x0029('0x81')]){if(typeof window[_0x0029('0x16')][_0x0029('0x82')][_0x0029('0x7b')][_0x5bda44]===_0x0029('0x3')){_0x47146c(_0x0029('0xed')+_0x5bda44+']');return _0x53bf49;}window[_0x0029('0x16')]['getOrderForm']['items'][_0x5bda44][_0x0029('0xe7')]=_0x5bda44;_0x41e4a1[_0x0029('0xee')]([window[_0x0029('0x16')][_0x0029('0x82')][_0x0029('0x7b')][_0x5bda44]],[_0x0029('0x7b'),_0x0029('0xe9'),'shippingData'])['done'](function(_0x20a48f){_0x53bf49=!![];window['_QuatroDigital_DropDown'][_0x0029('0x82')]=_0x20a48f;_0x19f2d8(_0x20a48f);_0x469393(!![]);})[_0x0029('0xe5')](function(_0x3e12d6){_0x47146c(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x3e12d6]);_0x469393();});}else{alert(_0x0029('0xef'));}function _0x469393(_0x2023a5){_0x2023a5=typeof _0x2023a5!==_0x0029('0xec')?![]:_0x2023a5;if(typeof window[_0x0029('0x83')]!==_0x0029('0x3')&&typeof window[_0x0029('0x83')][_0x0029('0x84')]===_0x0029('0xd'))window['_QuatroDigital_AmountProduct'][_0x0029('0x84')]['call'](this);if(typeof adminCart===_0x0029('0xd'))adminCart();_0x3e0839['fn']['simpleCart'](!![],undefined,_0x2023a5);if(typeof _0x3cf062===_0x0029('0xd'))_0x3cf062(_0x53bf49);};};_0x14cb0f[_0x0029('0x5b')]=function(_0x1645fa,_0x543c40,_0x2f7b10,_0x48e40b){var _0x345d7b=_0x48e40b||_0x3e0839(_0x0029('0xf0'));var _0xf55389=_0x1645fa||'+';var _0x436b12=_0x543c40||_0x345d7b[_0x0029('0xf1')]()*0.9;_0x345d7b[_0x0029('0xf2')](!![],!![])[_0x0029('0xf3')]({'scrollTop':isNaN(_0x2f7b10)?_0xf55389+'='+_0x436b12+'px':_0x2f7b10});};if(!_0x874356[_0x0029('0x6c')]){_0x14cb0f[_0x0029('0x7e')]();_0x3e0839['fn'][_0x0029('0x6e')](!![]);}_0x3e0839(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window[_0x0029('0x16')][_0x0029('0x82')]=undefined;_0x14cb0f[_0x0029('0x7e')]();}catch(_0x4bf584){_0x47146c(_0x0029('0xf4')+_0x4bf584[_0x0029('0xf')],_0x0029('0xf5'));}});if(typeof _0x874356[_0x0029('0xa')]===_0x0029('0xd'))_0x874356[_0x0029('0xa')]['call'](this);else _0x47146c(_0x0029('0xf6'));};_0x3e0839['fn'][_0x0029('0x18')]=function(_0x30b7a7){var _0x3ef1e8;_0x3ef1e8=_0x3e0839(this);_0x3ef1e8['fn']=new _0x3e0839[(_0x0029('0x18'))](this,_0x30b7a7);return _0x3ef1e8;};}catch(_0x23b37b){if(typeof console!==_0x0029('0x3')&&typeof console[_0x0029('0xc')]===_0x0029('0xd'))console['error']('Oooops!\x20',_0x23b37b);}}(this));(function(_0x4bdeec){'use strict';try{var _0x301bd0=jQuery;var _0x25a83b=_0x0029('0xf7');var _0x5bb799=function(_0x43a5ba,_0x40ce01){if(_0x0029('0x11')===typeof console&&_0x0029('0x3')!==typeof console['error']&&_0x0029('0x3')!==typeof console[_0x0029('0x12')]&&_0x0029('0x3')!==typeof console[_0x0029('0x13')]){var _0xa3e954;_0x0029('0x11')===typeof _0x43a5ba?(_0x43a5ba['unshift']('['+_0x25a83b+']\x0a'),_0xa3e954=_0x43a5ba):_0xa3e954=['['+_0x25a83b+']\x0a'+_0x43a5ba];if(_0x0029('0x3')===typeof _0x40ce01||_0x0029('0xf8')!==_0x40ce01[_0x0029('0x14')]()&&'aviso'!==_0x40ce01[_0x0029('0x14')]())if(_0x0029('0x3')!==typeof _0x40ce01&&_0x0029('0x12')===_0x40ce01[_0x0029('0x14')]())try{console[_0x0029('0x12')][_0x0029('0x15')](console,_0xa3e954);}catch(_0x4f5476){try{console[_0x0029('0x12')](_0xa3e954[_0x0029('0x8')]('\x0a'));}catch(_0x3ae8dc){}}else try{console[_0x0029('0xc')][_0x0029('0x15')](console,_0xa3e954);}catch(_0x16ad9b){try{console[_0x0029('0xc')](_0xa3e954['join']('\x0a'));}catch(_0x534fb2){}}else try{console[_0x0029('0x13')]['apply'](console,_0xa3e954);}catch(_0x2f3aad){try{console[_0x0029('0x13')](_0xa3e954['join']('\x0a'));}catch(_0x183389){}}}};window['_QuatroDigital_AmountProduct']=window[_0x0029('0x83')]||{};window['_QuatroDigital_AmountProduct'][_0x0029('0x7b')]={};window['_QuatroDigital_AmountProduct'][_0x0029('0xf9')]=![];window[_0x0029('0x83')][_0x0029('0xfa')]=![];window[_0x0029('0x83')][_0x0029('0xfb')]=![];var _0x5db119=_0x0029('0xfc');var _0x3b2f30=function(){var _0x339c73,_0x28697a,_0x3ad0b0,_0xe527e1;_0xe527e1=_0xf43189();if(window[_0x0029('0x83')][_0x0029('0xf9')]){_0x301bd0('.qd-bap-wrapper')['remove']();_0x301bd0(_0x0029('0xfd'))[_0x0029('0x52')](_0x0029('0xfe'));}for(var _0x4c6ac8 in window[_0x0029('0x83')][_0x0029('0x7b')]){_0x339c73=window[_0x0029('0x83')][_0x0029('0x7b')][_0x4c6ac8];if(typeof _0x339c73!==_0x0029('0x11'))return;_0x3ad0b0=_0x301bd0('input.qd-productId[value='+_0x339c73[_0x0029('0xff')]+']')[_0x0029('0x0')]('li');if(!window[_0x0029('0x83')][_0x0029('0xf9')]&&_0x3ad0b0[_0x0029('0x45')](_0x0029('0x100'))[_0x0029('0x7')])continue;_0x28697a=_0x301bd0(_0x5db119);_0x28697a['find'](_0x0029('0x101'))['html'](_0x339c73[_0x0029('0x102')]);var _0x27b579=_0x3ad0b0['find'](_0x0029('0x103'));if(_0x27b579[_0x0029('0x7')])_0x27b579['prepend'](_0x28697a)[_0x0029('0x86')](_0x0029('0xfe'));else _0x3ad0b0[_0x0029('0x104')](_0x28697a);}if(_0xe527e1)window['_QuatroDigital_AmountProduct']['allowRecalculate']=![];};var _0xf43189=function(){if(!window[_0x0029('0x83')][_0x0029('0xf9')])return;var _0x58f648=![],_0x1da6be={};window[_0x0029('0x83')][_0x0029('0x7b')]={};for(var _0x27a3f4 in window[_0x0029('0x16')][_0x0029('0x82')][_0x0029('0x7b')]){if(typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x0029('0x7b')][_0x27a3f4]!=='object')continue;var _0x41e30c=window[_0x0029('0x16')][_0x0029('0x82')][_0x0029('0x7b')][_0x27a3f4];if(typeof _0x41e30c[_0x0029('0x105')]==='undefined'||_0x41e30c[_0x0029('0x105')]===null||_0x41e30c[_0x0029('0x105')]==='')continue;window[_0x0029('0x83')][_0x0029('0x7b')]['prod_'+_0x41e30c[_0x0029('0x105')]]=window[_0x0029('0x83')][_0x0029('0x7b')][_0x0029('0x106')+_0x41e30c['productId']]||{};window[_0x0029('0x83')][_0x0029('0x7b')][_0x0029('0x106')+_0x41e30c['productId']][_0x0029('0xff')]=_0x41e30c[_0x0029('0x105')];if(!_0x1da6be[_0x0029('0x106')+_0x41e30c['productId']])window[_0x0029('0x83')]['items'][_0x0029('0x106')+_0x41e30c['productId']][_0x0029('0x102')]=0x0;window[_0x0029('0x83')][_0x0029('0x7b')][_0x0029('0x106')+_0x41e30c[_0x0029('0x105')]]['qtt']=window['_QuatroDigital_AmountProduct'][_0x0029('0x7b')]['prod_'+_0x41e30c[_0x0029('0x105')]][_0x0029('0x102')]+_0x41e30c[_0x0029('0xa4')];_0x58f648=!![];_0x1da6be[_0x0029('0x106')+_0x41e30c[_0x0029('0x105')]]=!![];}return _0x58f648;};window[_0x0029('0x83')]['exec']=function(){window[_0x0029('0x83')][_0x0029('0xf9')]=!![];_0x3b2f30[_0x0029('0x73')](this);};_0x301bd0(document)[_0x0029('0x107')](function(){_0x3b2f30['call'](this);});}catch(_0x35c2e8){if(typeof console!==_0x0029('0x3')&&typeof console[_0x0029('0xc')]===_0x0029('0xd'))console[_0x0029('0xc')](_0x0029('0xe'),_0x35c2e8);}}(this));(function(){'use strict';try{var _0x2d39c3=jQuery,_0x3fa63b;var _0x494ea5=_0x0029('0x108');var _0x934b09=function(_0x3b3029,_0x3c51d8){if(_0x0029('0x11')===typeof console&&_0x0029('0x3')!==typeof console[_0x0029('0xc')]&&'undefined'!==typeof console[_0x0029('0x12')]&&'undefined'!==typeof console['warn']){var _0x243eeb;_0x0029('0x11')===typeof _0x3b3029?(_0x3b3029['unshift']('['+_0x494ea5+']\x0a'),_0x243eeb=_0x3b3029):_0x243eeb=['['+_0x494ea5+']\x0a'+_0x3b3029];if('undefined'===typeof _0x3c51d8||_0x0029('0xf8')!==_0x3c51d8[_0x0029('0x14')]()&&_0x0029('0xaf')!==_0x3c51d8[_0x0029('0x14')]())if(_0x0029('0x3')!==typeof _0x3c51d8&&_0x0029('0x12')===_0x3c51d8['toLowerCase']())try{console[_0x0029('0x12')]['apply'](console,_0x243eeb);}catch(_0x3f71d6){try{console[_0x0029('0x12')](_0x243eeb[_0x0029('0x8')]('\x0a'));}catch(_0x221376){}}else try{console[_0x0029('0xc')][_0x0029('0x15')](console,_0x243eeb);}catch(_0x5db22f){try{console[_0x0029('0xc')](_0x243eeb[_0x0029('0x8')]('\x0a'));}catch(_0x5a86ac){}}else try{console[_0x0029('0x13')][_0x0029('0x15')](console,_0x243eeb);}catch(_0xf92b4a){try{console['warn'](_0x243eeb['join']('\x0a'));}catch(_0x16cf4c){}}}};var _0x1d1642={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x2d39c3[_0x0029('0x109')]=function(_0x3fabd9){var _0x4d5f96,_0x268a5c={};_0x3fa63b=_0x2d39c3[_0x0029('0x26')](!![],{},_0x1d1642,_0x3fabd9);_0x4d5f96=_0x2d39c3(_0x3fa63b[_0x0029('0x10a')])[_0x0029('0x18')](_0x3fa63b[_0x0029('0x10b')]);if(typeof _0x3fa63b[_0x0029('0x10b')][_0x0029('0x6c')]!==_0x0029('0x3')&&_0x3fa63b[_0x0029('0x10b')]['updateOnlyHover']===![])_0x268a5c[_0x0029('0x10c')]=_0x2d39c3(_0x3fa63b['selector'])[_0x0029('0x10d')](_0x4d5f96['fn'],_0x3fa63b[_0x0029('0x10c')]);else _0x268a5c[_0x0029('0x10c')]=_0x2d39c3(_0x3fa63b[_0x0029('0x10a')])[_0x0029('0x10d')](_0x3fa63b['buyButton']);_0x268a5c[_0x0029('0x10b')]=_0x4d5f96;return _0x268a5c;};_0x2d39c3['fn'][_0x0029('0x10e')]=function(){if(typeof console===_0x0029('0x11')&&typeof console['info']===_0x0029('0xd'))console[_0x0029('0x12')](_0x0029('0x10f'));};_0x2d39c3[_0x0029('0x10e')]=_0x2d39c3['fn'][_0x0029('0x10e')];}catch(_0x4f1ca3){if(typeof console!==_0x0029('0x3')&&typeof console['error']==='function')console[_0x0029('0xc')](_0x0029('0xe'),_0x4f1ca3);}}());
=======
var _0x6c05=['filter','.qd-am-collection','length','qd-am-banner-wrapper','parent','qdAjax','url','html','each','data-qdam-value','.box-banner','qd-am-content-loaded','text','attr','trim','insertBefore','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','trigger','QuatroDigital.am.ajaxCallback','QD_amazingMenu','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','qd-am-has-ul','children','qd-am-elem-','replaceSpecialChars','>li','qd-amazing-menu','>ul','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','call','QuatroDigital.am.callback','extend','.qd_amazing_menu_auto','getParent','closest','function','/qd-amazing-menu','object','undefined','info','warn','[QD\x20Amazing\x20Menu]\x0a','alerta','aviso','toLowerCase','apply','join','error','qdAmAddNdx','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','toUpperCase','erc','indexOf','find','.qd_am_code'];(function(_0x3b5576,_0x1e6a0a){var _0xdd048b=function(_0x51ce14){while(--_0x51ce14){_0x3b5576['push'](_0x3b5576['shift']());}};_0xdd048b(++_0x1e6a0a);}(_0x6c05,0x102));var _0x56c0=function(_0x343d51,_0x39a4db){_0x343d51=_0x343d51-0x0;var _0x2df8ec=_0x6c05[_0x343d51];return _0x2df8ec;};(function(_0x16d13a){_0x16d13a['fn'][_0x56c0('0x0')]=_0x16d13a['fn'][_0x56c0('0x1')];}(jQuery));(function(_0x44650b){var _0x17e24a;var _0x2658f9=jQuery;if(_0x56c0('0x2')!==typeof _0x2658f9['fn']['QD_amazingMenu']){var _0x4cd992={'url':_0x56c0('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x138ed2=function(_0x429de7,_0x5f17d2){if(_0x56c0('0x4')===typeof console&&_0x56c0('0x5')!==typeof console['error']&&_0x56c0('0x5')!==typeof console[_0x56c0('0x6')]&&_0x56c0('0x5')!==typeof console[_0x56c0('0x7')]){var _0x2cc4b5;_0x56c0('0x4')===typeof _0x429de7?(_0x429de7['unshift'](_0x56c0('0x8')),_0x2cc4b5=_0x429de7):_0x2cc4b5=[_0x56c0('0x8')+_0x429de7];if(_0x56c0('0x5')===typeof _0x5f17d2||_0x56c0('0x9')!==_0x5f17d2['toLowerCase']()&&_0x56c0('0xa')!==_0x5f17d2[_0x56c0('0xb')]())if(_0x56c0('0x5')!==typeof _0x5f17d2&&_0x56c0('0x6')===_0x5f17d2[_0x56c0('0xb')]())try{console[_0x56c0('0x6')][_0x56c0('0xc')](console,_0x2cc4b5);}catch(_0x74e2dc){try{console[_0x56c0('0x6')](_0x2cc4b5[_0x56c0('0xd')]('\x0a'));}catch(_0x4e0366){}}else try{console[_0x56c0('0xe')][_0x56c0('0xc')](console,_0x2cc4b5);}catch(_0x2432dd){try{console['error'](_0x2cc4b5['join']('\x0a'));}catch(_0x36fcf6){}}else try{console[_0x56c0('0x7')][_0x56c0('0xc')](console,_0x2cc4b5);}catch(_0x43ecdc){try{console['warn'](_0x2cc4b5[_0x56c0('0xd')]('\x0a'));}catch(_0x1abc8a){}}}};_0x2658f9['fn'][_0x56c0('0xf')]=function(){var _0x59dd26=_0x2658f9(this);_0x59dd26['each'](function(_0x14a8a4){_0x2658f9(this)[_0x56c0('0x10')](_0x56c0('0x11')+_0x14a8a4);});_0x59dd26[_0x56c0('0x12')]()[_0x56c0('0x10')](_0x56c0('0x13'));_0x59dd26[_0x56c0('0x14')]()[_0x56c0('0x10')](_0x56c0('0x15'));return _0x59dd26;};_0x2658f9['fn']['QD_amazingMenu']=function(){};_0x44650b=function(_0xa96092){var _0x302c92={'y':_0x56c0('0x16')};return function(_0x17a7a8){var _0x111941=function(_0x428d70){return _0x428d70;};var _0x3460ac=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x17a7a8=_0x17a7a8['d'+_0x3460ac[0x10]+'c'+_0x3460ac[0x11]+'m'+_0x111941(_0x3460ac[0x1])+'n'+_0x3460ac[0xd]]['l'+_0x3460ac[0x12]+'c'+_0x3460ac[0x0]+'ti'+_0x111941('o')+'n'];var _0x18e00b=function(_0x360f1c){return escape(encodeURIComponent(_0x360f1c[_0x56c0('0x17')](/\./g,'¨')[_0x56c0('0x17')](/[a-zA-Z]/g,function(_0x1f98c6){return String['fromCharCode'](('Z'>=_0x1f98c6?0x5a:0x7a)>=(_0x1f98c6=_0x1f98c6[_0x56c0('0x18')](0x0)+0xd)?_0x1f98c6:_0x1f98c6-0x1a);})));};var _0x182759=_0x18e00b(_0x17a7a8[[_0x3460ac[0x9],_0x111941('o'),_0x3460ac[0xc],_0x3460ac[_0x111941(0xd)]][_0x56c0('0xd')]('')]);_0x18e00b=_0x18e00b((window[['js',_0x111941('no'),'m',_0x3460ac[0x1],_0x3460ac[0x4][_0x56c0('0x19')](),'ite'][_0x56c0('0xd')]('')]||'---')+['.v',_0x3460ac[0xd],'e',_0x111941('x'),'co',_0x111941('mm'),_0x56c0('0x1a'),_0x3460ac[0x1],'.c',_0x111941('o'),'m.',_0x3460ac[0x13],'r'][_0x56c0('0xd')](''));for(var _0xf4aad7 in _0x302c92){if(_0x18e00b===_0xf4aad7+_0x302c92[_0xf4aad7]||_0x182759===_0xf4aad7+_0x302c92[_0xf4aad7]){var _0x541d91='tr'+_0x3460ac[0x11]+'e';break;}_0x541d91='f'+_0x3460ac[0x0]+'ls'+_0x111941(_0x3460ac[0x1])+'';}_0x111941=!0x1;-0x1<_0x17a7a8[[_0x3460ac[0xc],'e',_0x3460ac[0x0],'rc',_0x3460ac[0x9]][_0x56c0('0xd')]('')][_0x56c0('0x1b')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x111941=!0x0);return[_0x541d91,_0x111941];}(_0xa96092);}(window);if(!eval(_0x44650b[0x0]))return _0x44650b[0x1]?_0x138ed2('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0x17336e=function(_0x40b74f){var _0x2b9e69=_0x40b74f[_0x56c0('0x1c')](_0x56c0('0x1d'));var _0x4222e9=_0x2b9e69[_0x56c0('0x1e')]('.qd-am-banner');var _0x1ef646=_0x2b9e69[_0x56c0('0x1e')](_0x56c0('0x1f'));if(_0x4222e9['length']||_0x1ef646[_0x56c0('0x20')])_0x4222e9['parent']()[_0x56c0('0x10')](_0x56c0('0x21')),_0x1ef646[_0x56c0('0x22')]()['addClass']('qd-am-collection-wrapper'),_0x2658f9[_0x56c0('0x23')]({'url':_0x17e24a[_0x56c0('0x24')],'dataType':_0x56c0('0x25'),'success':function(_0x2865a0){var _0x3bcdde=_0x2658f9(_0x2865a0);_0x4222e9[_0x56c0('0x26')](function(){var _0x2865a0=_0x2658f9(this);var _0x56a565=_0x3bcdde[_0x56c0('0x1c')]('img[alt=\x27'+_0x2865a0['attr'](_0x56c0('0x27'))+'\x27]');_0x56a565['length']&&(_0x56a565[_0x56c0('0x26')](function(){_0x2658f9(this)[_0x56c0('0x0')](_0x56c0('0x28'))['clone']()['insertBefore'](_0x2865a0);}),_0x2865a0['hide']());})[_0x56c0('0x10')](_0x56c0('0x29'));_0x1ef646[_0x56c0('0x26')](function(){var _0x2865a0={};var _0x3f14ea=_0x2658f9(this);_0x3bcdde['find']('h2')[_0x56c0('0x26')](function(){if(_0x2658f9(this)[_0x56c0('0x2a')]()['trim']()['toLowerCase']()==_0x3f14ea[_0x56c0('0x2b')](_0x56c0('0x27'))[_0x56c0('0x2c')]()['toLowerCase']())return _0x2865a0=_0x2658f9(this),!0x1;});_0x2865a0[_0x56c0('0x20')]&&(_0x2865a0[_0x56c0('0x26')](function(){_0x2658f9(this)[_0x56c0('0x0')]('[class*=\x27colunas\x27]')['clone']()[_0x56c0('0x2d')](_0x3f14ea);}),_0x3f14ea[_0x56c0('0x2e')]());})[_0x56c0('0x10')](_0x56c0('0x29'));},'error':function(){_0x138ed2(_0x56c0('0x2f')+_0x17e24a['url']+_0x56c0('0x30'));},'complete':function(){_0x17e24a['ajaxCallback']['call'](this);_0x2658f9(window)[_0x56c0('0x31')](_0x56c0('0x32'),_0x40b74f);},'clearQueueDelay':0xbb8});};_0x2658f9[_0x56c0('0x33')]=function(_0x5efadc){var _0x17a48a=_0x5efadc['find'](_0x56c0('0x34'))['each'](function(){var _0x4765f6=_0x2658f9(this);if(!_0x4765f6[_0x56c0('0x20')])return _0x138ed2([_0x56c0('0x35'),_0x5efadc],_0x56c0('0x9'));_0x4765f6[_0x56c0('0x1c')]('li\x20>ul')[_0x56c0('0x22')]()[_0x56c0('0x10')](_0x56c0('0x36'));_0x4765f6[_0x56c0('0x1c')]('li')[_0x56c0('0x26')](function(){var _0x3bf2c6=_0x2658f9(this);var _0x208229=_0x3bf2c6[_0x56c0('0x37')](':not(ul)');_0x208229[_0x56c0('0x20')]&&_0x3bf2c6[_0x56c0('0x10')](_0x56c0('0x38')+_0x208229[_0x56c0('0x12')]()[_0x56c0('0x2a')]()[_0x56c0('0x2c')]()[_0x56c0('0x39')]()['replace'](/\./g,'')['replace'](/\s/g,'-')[_0x56c0('0xb')]());});var _0x2dd196=_0x4765f6[_0x56c0('0x1c')](_0x56c0('0x3a'))[_0x56c0('0xf')]();_0x4765f6['addClass'](_0x56c0('0x3b'));_0x2dd196=_0x2dd196[_0x56c0('0x1c')](_0x56c0('0x3c'));_0x2dd196[_0x56c0('0x26')](function(){var _0x2de1c0=_0x2658f9(this);_0x2de1c0[_0x56c0('0x1c')](_0x56c0('0x3a'))[_0x56c0('0xf')]()['addClass']('qd-am-column');_0x2de1c0[_0x56c0('0x10')](_0x56c0('0x3d'));_0x2de1c0[_0x56c0('0x22')]()[_0x56c0('0x10')](_0x56c0('0x3e'));});_0x2dd196[_0x56c0('0x10')]('qd-am-dropdown');var _0x1db507=0x0,_0x44650b=function(_0x155d2a){_0x1db507+=0x1;_0x155d2a=_0x155d2a[_0x56c0('0x37')]('li')[_0x56c0('0x37')]('*');_0x155d2a[_0x56c0('0x20')]&&(_0x155d2a['addClass'](_0x56c0('0x3f')+_0x1db507),_0x44650b(_0x155d2a));};_0x44650b(_0x4765f6);_0x4765f6[_0x56c0('0x40')](_0x4765f6['find']('ul'))[_0x56c0('0x26')](function(){var _0x4dbcf4=_0x2658f9(this);_0x4dbcf4['addClass'](_0x56c0('0x41')+_0x4dbcf4[_0x56c0('0x37')]('li')['length']+_0x56c0('0x42'));});});_0x17336e(_0x17a48a);_0x17e24a[_0x56c0('0x43')][_0x56c0('0x44')](this);_0x2658f9(window)[_0x56c0('0x31')](_0x56c0('0x45'),_0x5efadc);};_0x2658f9['fn'][_0x56c0('0x33')]=function(_0x551d71){var _0x219989=_0x2658f9(this);if(!_0x219989[_0x56c0('0x20')])return _0x219989;_0x17e24a=_0x2658f9[_0x56c0('0x46')]({},_0x4cd992,_0x551d71);_0x219989['exec']=new _0x2658f9[(_0x56c0('0x33'))](_0x2658f9(this));return _0x219989;};_0x2658f9(function(){_0x2658f9(_0x56c0('0x47'))['QD_amazingMenu']();});}}(this));
/* Quatro Digital Smart Cart */
var _0x8f87=['---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','extend','smartCheckout','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','texts','cartTotal','#value','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','find','.qd-ddc-viewCart','html','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','shippingForm','emptyCart','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','removeClass','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','click','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','hide','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','allowUpdate','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','each','call','clone','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','addClass','getOrderForm','QD_checkoutQueue','totalizers','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','<span\x20class=\x22qd-ddc-imgLoading\x22></span>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','productCategoryIds','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','content','.qd-ddc-quantity','attr','quantity','.qd-ddc-remove','insertProdImg','appendTo','getParent','.qd-ddc-shipping\x20input','shippingData','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','focusout.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','remove','$1-$2$3','data','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','logisticsInfo','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','<td>\x20R$\x20','price','</td><td>',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','</td>','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','removeItems','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart','allowRecalculate','buyButtonClicked','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','prepend','productId','prod_','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','closest','replace','abs','undefined','pow','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','function','Oooops!\x20','message','object','error','info','warn','unshift','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','QD_dropDownCart','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite'];(function(_0x49c3ce,_0x354ddd){var _0x2afa8c=function(_0x3056d){while(--_0x3056d){_0x49c3ce['push'](_0x49c3ce['shift']());}};_0x2afa8c(++_0x354ddd);}(_0x8f87,0xe5));var _0x78f8=function(_0x228d54,_0x16132a){_0x228d54=_0x228d54-0x0;var _0x47e454=_0x8f87[_0x228d54];return _0x47e454;};(function(_0x114dbc){_0x114dbc['fn']['getParent']=_0x114dbc['fn'][_0x78f8('0x0')];}(jQuery));function qd_number_format(_0x6da264,_0x11465a,_0x94862d,_0x479490){_0x6da264=(_0x6da264+'')[_0x78f8('0x1')](/[^0-9+\-Ee.]/g,'');_0x6da264=isFinite(+_0x6da264)?+_0x6da264:0x0;_0x11465a=isFinite(+_0x11465a)?Math[_0x78f8('0x2')](_0x11465a):0x0;_0x479490=_0x78f8('0x3')===typeof _0x479490?',':_0x479490;_0x94862d='undefined'===typeof _0x94862d?'.':_0x94862d;var _0x52d223='',_0x52d223=function(_0x45a9a3,_0x4816df){var _0x11465a=Math[_0x78f8('0x4')](0xa,_0x4816df);return''+(Math[_0x78f8('0x5')](_0x45a9a3*_0x11465a)/_0x11465a)['toFixed'](_0x4816df);},_0x52d223=(_0x11465a?_0x52d223(_0x6da264,_0x11465a):''+Math[_0x78f8('0x5')](_0x6da264))[_0x78f8('0x6')]('.');0x3<_0x52d223[0x0][_0x78f8('0x7')]&&(_0x52d223[0x0]=_0x52d223[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x479490));(_0x52d223[0x1]||'')[_0x78f8('0x7')]<_0x11465a&&(_0x52d223[0x1]=_0x52d223[0x1]||'',_0x52d223[0x1]+=Array(_0x11465a-_0x52d223[0x1][_0x78f8('0x7')]+0x1)[_0x78f8('0x8')]('0'));return _0x52d223[_0x78f8('0x8')](_0x94862d);};(function(){'use strict';try{window[_0x78f8('0x9')]=window[_0x78f8('0x9')]||{};window[_0x78f8('0x9')][_0x78f8('0xa')]=window['_QuatroDigital_CartData'][_0x78f8('0xa')]||$[_0x78f8('0xb')]();}catch(_0x54e753){if(typeof console!==_0x78f8('0x3')&&typeof console['error']===_0x78f8('0xc'))console['error'](_0x78f8('0xd'),_0x54e753[_0x78f8('0xe')]);}}());(function(_0x24babf){'use strict';try{var _0x55c85b=jQuery;var _0x2ea9ef='Quatro\x20Digital\x20-\x20DropDown\x20Cart';var _0x23e28a=function(_0x33e010,_0x42bf05){if(_0x78f8('0xf')===typeof console&&_0x78f8('0x3')!==typeof console[_0x78f8('0x10')]&&'undefined'!==typeof console[_0x78f8('0x11')]&&_0x78f8('0x3')!==typeof console[_0x78f8('0x12')]){var _0x3e56cb;_0x78f8('0xf')===typeof _0x33e010?(_0x33e010[_0x78f8('0x13')]('['+_0x2ea9ef+']\x0a'),_0x3e56cb=_0x33e010):_0x3e56cb=['['+_0x2ea9ef+']\x0a'+_0x33e010];if('undefined'===typeof _0x42bf05||_0x78f8('0x14')!==_0x42bf05[_0x78f8('0x15')]()&&_0x78f8('0x16')!==_0x42bf05[_0x78f8('0x15')]())if(_0x78f8('0x3')!==typeof _0x42bf05&&_0x78f8('0x11')===_0x42bf05[_0x78f8('0x15')]())try{console[_0x78f8('0x11')][_0x78f8('0x17')](console,_0x3e56cb);}catch(_0x50ab8a){try{console[_0x78f8('0x11')](_0x3e56cb[_0x78f8('0x8')]('\x0a'));}catch(_0x2a0209){}}else try{console['error'][_0x78f8('0x17')](console,_0x3e56cb);}catch(_0x3f29a1){try{console[_0x78f8('0x10')](_0x3e56cb[_0x78f8('0x8')]('\x0a'));}catch(_0x194c18){}}else try{console['warn']['apply'](console,_0x3e56cb);}catch(_0x1a1e36){try{console[_0x78f8('0x12')](_0x3e56cb[_0x78f8('0x8')]('\x0a'));}catch(_0x5a07b3){}}}};window[_0x78f8('0x18')]=window[_0x78f8('0x18')]||{};window['_QuatroDigital_DropDown']['allowUpdate']=!![];_0x55c85b[_0x78f8('0x19')]=function(){};_0x55c85b['fn'][_0x78f8('0x19')]=function(){return{'fn':new _0x55c85b()};};var _0x14bd81=function(_0x582e2c){var _0x58f8c9={'y':_0x78f8('0x1a')};return function(_0x5a0b5c){var _0x2fb82c,_0x51790b,_0x1fd4aa,_0x1dbd6b;_0x51790b=function(_0x29b695){return _0x29b695;};_0x1fd4aa=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5a0b5c=_0x5a0b5c['d'+_0x1fd4aa[0x10]+'c'+_0x1fd4aa[0x11]+'m'+_0x51790b(_0x1fd4aa[0x1])+'n'+_0x1fd4aa[0xd]]['l'+_0x1fd4aa[0x12]+'c'+_0x1fd4aa[0x0]+'ti'+_0x51790b('o')+'n'];_0x2fb82c=function(_0x1bb9ad){return escape(encodeURIComponent(_0x1bb9ad[_0x78f8('0x1')](/\./g,'¨')[_0x78f8('0x1')](/[a-zA-Z]/g,function(_0x861f8d){return String['fromCharCode'](('Z'>=_0x861f8d?0x5a:0x7a)>=(_0x861f8d=_0x861f8d[_0x78f8('0x1b')](0x0)+0xd)?_0x861f8d:_0x861f8d-0x1a);})));};var _0x5f4eae=_0x2fb82c(_0x5a0b5c[[_0x1fd4aa[0x9],_0x51790b('o'),_0x1fd4aa[0xc],_0x1fd4aa[_0x51790b(0xd)]][_0x78f8('0x8')]('')]);_0x2fb82c=_0x2fb82c((window[['js',_0x51790b('no'),'m',_0x1fd4aa[0x1],_0x1fd4aa[0x4][_0x78f8('0x1c')](),_0x78f8('0x1d')][_0x78f8('0x8')]('')]||_0x78f8('0x1e'))+['.v',_0x1fd4aa[0xd],'e',_0x51790b('x'),'co',_0x51790b('mm'),_0x78f8('0x1f'),_0x1fd4aa[0x1],'.c',_0x51790b('o'),'m.',_0x1fd4aa[0x13],'r']['join'](''));for(var _0x175042 in _0x58f8c9){if(_0x2fb82c===_0x175042+_0x58f8c9[_0x175042]||_0x5f4eae===_0x175042+_0x58f8c9[_0x175042]){_0x1dbd6b='tr'+_0x1fd4aa[0x11]+'e';break;}_0x1dbd6b='f'+_0x1fd4aa[0x0]+'ls'+_0x51790b(_0x1fd4aa[0x1])+'';}_0x51790b=!0x1;-0x1<_0x5a0b5c[[_0x1fd4aa[0xc],'e',_0x1fd4aa[0x0],'rc',_0x1fd4aa[0x9]]['join']('')][_0x78f8('0x20')](_0x78f8('0x21'))&&(_0x51790b=!0x0);return[_0x1dbd6b,_0x51790b];}(_0x582e2c);}(window);if(!eval(_0x14bd81[0x0]))return _0x14bd81[0x1]?_0x23e28a(_0x78f8('0x22')):!0x1;_0x55c85b['QD_dropDownCart']=function(_0x279b0c,_0x28c2b3){var _0x47a566,_0x4701b3,_0x57e724,_0x3493a2,_0x233135,_0x908509,_0x5e20f9,_0x2fb0be,_0x57f9d2,_0x39bc4c,_0x7a17b9,_0x284451;_0x7a17b9=_0x55c85b(_0x279b0c);if(!_0x7a17b9[_0x78f8('0x7')])return _0x7a17b9;_0x47a566={'updateOnlyHover':!![],'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0x78f8('0x23'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x78f8('0x24'),'continueShopping':_0x78f8('0x25'),'shippingForm':_0x78f8('0x26')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x266902){return _0x266902[_0x78f8('0x27')]||_0x266902[_0x78f8('0x28')];},'callback':function(){},'callbackProductsList':function(){}};_0x4701b3=_0x55c85b[_0x78f8('0x29')](!![],{},_0x47a566,_0x28c2b3);_0x57e724=_0x55c85b('');_0x39bc4c=this;if(_0x4701b3[_0x78f8('0x2a')]){var _0x4327a2=![];if(typeof window[_0x78f8('0x2b')]===_0x78f8('0x3')){_0x23e28a(_0x78f8('0x2c'));_0x55c85b['ajax']({'url':_0x78f8('0x2d'),'async':![],'dataType':'script','error':function(){_0x23e28a(_0x78f8('0x2e'));_0x4327a2=!![];}});}if(_0x4327a2)return _0x23e28a('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}var _0x43b91a;if(typeof window['vtexjs']===_0x78f8('0xf')&&typeof window[_0x78f8('0x2b')][_0x78f8('0x2f')]!==_0x78f8('0x3'))_0x43b91a=window[_0x78f8('0x2b')]['checkout'];else if(typeof vtex==='object'&&typeof vtex[_0x78f8('0x2f')]==='object'&&typeof vtex[_0x78f8('0x2f')][_0x78f8('0x30')]!==_0x78f8('0x3'))_0x43b91a=new vtex[(_0x78f8('0x2f'))][(_0x78f8('0x30'))]();else return _0x23e28a(_0x78f8('0x31'));_0x39bc4c[_0x78f8('0x32')]=_0x78f8('0x33')+_0x78f8('0x34')+_0x78f8('0x35')+_0x78f8('0x36')+_0x78f8('0x37')+_0x78f8('0x38')+_0x78f8('0x39')+_0x78f8('0x3a')+_0x78f8('0x3b')+'<div\x20class=\x22qd-ddc-infoTotal\x22></div>'+'<div\x20class=\x22qd-ddc-infoBts\x22>'+_0x78f8('0x3c')+_0x78f8('0x3d');_0x908509=function(_0x3d09ea){var _0x4c2080=_0x55c85b(_0x3d09ea);_0x4701b3[_0x78f8('0x3e')][_0x78f8('0x3f')]=_0x4701b3[_0x78f8('0x3e')][_0x78f8('0x3f')]['replace'](_0x78f8('0x40'),'<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>');_0x4701b3[_0x78f8('0x3e')][_0x78f8('0x3f')]=_0x4701b3[_0x78f8('0x3e')]['cartTotal'][_0x78f8('0x1')](_0x78f8('0x41'),_0x78f8('0x42'));_0x4701b3['texts'][_0x78f8('0x3f')]=_0x4701b3[_0x78f8('0x3e')][_0x78f8('0x3f')][_0x78f8('0x1')](_0x78f8('0x43'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x4701b3[_0x78f8('0x3e')][_0x78f8('0x3f')]=_0x4701b3[_0x78f8('0x3e')]['cartTotal'][_0x78f8('0x1')]('#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x4c2080[_0x78f8('0x44')](_0x78f8('0x45'))[_0x78f8('0x46')](_0x4701b3[_0x78f8('0x3e')]['linkCart']);_0x4c2080[_0x78f8('0x44')](_0x78f8('0x47'))['html'](_0x4701b3['texts'][_0x78f8('0x48')]);_0x4c2080[_0x78f8('0x44')](_0x78f8('0x49'))[_0x78f8('0x46')](_0x4701b3[_0x78f8('0x3e')][_0x78f8('0x4a')]);_0x4c2080[_0x78f8('0x44')]('.qd-ddc-infoTotal')['html'](_0x4701b3['texts']['cartTotal']);_0x4c2080[_0x78f8('0x44')](_0x78f8('0x4b'))[_0x78f8('0x46')](_0x4701b3[_0x78f8('0x3e')][_0x78f8('0x4c')]);_0x4c2080['find']('.qd-ddc-emptyCart\x20p')[_0x78f8('0x46')](_0x4701b3[_0x78f8('0x3e')][_0x78f8('0x4d')]);return _0x4c2080;};_0x233135=function(_0x2e30cd){_0x55c85b(this)[_0x78f8('0x4e')](_0x2e30cd);_0x2e30cd[_0x78f8('0x44')](_0x78f8('0x4f'))[_0x78f8('0x50')](_0x55c85b(_0x78f8('0x51')))['on'](_0x78f8('0x52'),function(){_0x7a17b9['removeClass'](_0x78f8('0x53'));_0x55c85b(document[_0x78f8('0x54')])[_0x78f8('0x55')](_0x78f8('0x56'));});_0x55c85b(document)[_0x78f8('0x57')]('keyup.qd_ddc_closeFn')['on'](_0x78f8('0x58'),function(_0x4da961){if(_0x4da961[_0x78f8('0x59')]==0x1b){_0x7a17b9[_0x78f8('0x55')](_0x78f8('0x53'));_0x55c85b(document[_0x78f8('0x54')])[_0x78f8('0x55')]('qd-bb-lightBoxBodyProdAdd');}});var _0x1cbcf4=_0x2e30cd[_0x78f8('0x44')](_0x78f8('0x5a'));_0x2e30cd[_0x78f8('0x44')](_0x78f8('0x5b'))['on']('click.qd_ddc_scrollUp',function(){_0x39bc4c[_0x78f8('0x5c')]('-',undefined,undefined,_0x1cbcf4);return![];});_0x2e30cd[_0x78f8('0x44')](_0x78f8('0x5d'))['on'](_0x78f8('0x5e'),function(){_0x39bc4c[_0x78f8('0x5c')](undefined,undefined,undefined,_0x1cbcf4);return![];});var _0x3bd6d2=_0x2e30cd['find']('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x2e30cd[_0x78f8('0x44')](_0x78f8('0x5f'))[_0x78f8('0x60')]('')['on'](_0x78f8('0x61'),function(_0x5ac0f1){_0x39bc4c[_0x78f8('0x62')](_0x55c85b(this));if(_0x5ac0f1[_0x78f8('0x59')]==0xd)_0x2e30cd['find']('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0x78f8('0x63')]();});_0x2e30cd['find'](_0x78f8('0x64'))[_0x78f8('0x63')](function(_0x422cc8){_0x422cc8[_0x78f8('0x65')]();_0x3bd6d2[_0x78f8('0x66')]();});_0x2e30cd[_0x78f8('0x44')](_0x78f8('0x67'))[_0x78f8('0x63')](function(_0x5ad732){_0x5ad732[_0x78f8('0x65')]();_0x3bd6d2[_0x78f8('0x68')]();});_0x55c85b(document)[_0x78f8('0x57')](_0x78f8('0x69'))['on'](_0x78f8('0x69'),function(_0x44c034){if(_0x55c85b(_0x44c034[_0x78f8('0x6a')])[_0x78f8('0x0')](_0x2e30cd['find'](_0x78f8('0x6b')))['length'])return;_0x3bd6d2['hide']();});_0x2e30cd['find'](_0x78f8('0x6c'))[_0x78f8('0x63')](function(_0x44be48){_0x44be48[_0x78f8('0x65')]();_0x39bc4c[_0x78f8('0x6d')](_0x2e30cd[_0x78f8('0x44')](_0x78f8('0x6e')));});if(_0x4701b3[_0x78f8('0x6f')]){var _0x11d893=0x0;_0x55c85b(this)['on'](_0x78f8('0x70'),function(){var _0x3a8e27=function(){if(!window[_0x78f8('0x18')]['allowUpdate'])return;_0x39bc4c[_0x78f8('0x71')]();window[_0x78f8('0x18')][_0x78f8('0x72')]=![];_0x55c85b['fn'][_0x78f8('0x73')](!![]);_0x39bc4c[_0x78f8('0x74')]();};_0x11d893=setInterval(function(){_0x3a8e27();},0x258);_0x3a8e27();});_0x55c85b(this)['on'](_0x78f8('0x75'),function(){clearInterval(_0x11d893);});}};_0x5e20f9=_0x908509(this['cartContainer']);_0x2fb0be=0x0;_0x7a17b9[_0x78f8('0x76')](function(){if(_0x2fb0be>0x0)_0x233135[_0x78f8('0x77')](this,_0x5e20f9[_0x78f8('0x78')]());else _0x233135[_0x78f8('0x77')](this,_0x5e20f9);_0x2fb0be++;});window[_0x78f8('0x9')][_0x78f8('0xa')][_0x78f8('0x50')](function(){_0x55c85b(_0x78f8('0x79'))[_0x78f8('0x46')](window[_0x78f8('0x9')][_0x78f8('0x7a')]||'--');_0x55c85b(_0x78f8('0x7b'))[_0x78f8('0x46')](window[_0x78f8('0x9')][_0x78f8('0x7c')]||'0');_0x55c85b(_0x78f8('0x7d'))[_0x78f8('0x46')](window[_0x78f8('0x9')][_0x78f8('0x7e')]||'--');_0x55c85b(_0x78f8('0x7f'))[_0x78f8('0x46')](window[_0x78f8('0x9')]['allTotal']||'--');});_0x57f9d2=function(_0x5433d1){_0x23e28a(_0x78f8('0x80'));};_0x284451=function(_0x352213,_0x349b93){if(typeof _0x352213[_0x78f8('0x81')]===_0x78f8('0x3'))return _0x23e28a(_0x78f8('0x82'));_0x39bc4c[_0x78f8('0x83')]['call'](this,_0x349b93);};_0x39bc4c['getCartInfoByUrl']=function(_0x21cc36,_0x27ea46){var _0x27a5d6;if(typeof _0x27ea46!=_0x78f8('0x3'))window[_0x78f8('0x18')]['dataOptionsCache']=_0x27ea46;else if(window[_0x78f8('0x18')][_0x78f8('0x84')])_0x27ea46=window[_0x78f8('0x18')][_0x78f8('0x84')];setTimeout(function(){window['_QuatroDigital_DropDown'][_0x78f8('0x84')]=undefined;},_0x4701b3[_0x78f8('0x85')]);_0x55c85b(_0x78f8('0x86'))[_0x78f8('0x55')]('qd-ddc-prodLoaded');if(_0x4701b3[_0x78f8('0x2a')]){_0x27a5d6=function(_0x29e30d){window[_0x78f8('0x18')]['getOrderForm']=_0x29e30d;_0x284451(_0x29e30d,_0x27ea46);if(typeof window[_0x78f8('0x87')]!=='undefined'&&typeof window[_0x78f8('0x87')]['exec']==='function')window[_0x78f8('0x87')][_0x78f8('0x88')][_0x78f8('0x77')](this);_0x55c85b(_0x78f8('0x86'))[_0x78f8('0x89')]('qd-ddc-prodLoaded');};if(typeof window['_QuatroDigital_DropDown'][_0x78f8('0x8a')]!==_0x78f8('0x3')){_0x27a5d6(window[_0x78f8('0x18')]['getOrderForm']);if(typeof _0x21cc36===_0x78f8('0xc'))_0x21cc36(window[_0x78f8('0x18')][_0x78f8('0x8a')]);return;}_0x55c85b[_0x78f8('0x8b')](['items',_0x78f8('0x8c'),'shippingData'],{'done':function(_0x44c8a6){_0x27a5d6[_0x78f8('0x77')](this,_0x44c8a6);if(typeof _0x21cc36===_0x78f8('0xc'))_0x21cc36(_0x44c8a6);},'fail':function(_0x3460ea){_0x23e28a(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x3460ea]);}});}else{alert('Este\x20método\x20esta\x20descontinuado!');}};_0x39bc4c['cartIsEmpty']=function(){var _0x55e91f=_0x55c85b(_0x78f8('0x86'));if(_0x55e91f[_0x78f8('0x44')](_0x78f8('0x8d'))['length'])_0x55e91f[_0x78f8('0x55')](_0x78f8('0x8e'));else _0x55e91f[_0x78f8('0x89')](_0x78f8('0x8e'));};_0x39bc4c['renderProductsList']=function(_0x3edbf9){var _0x450ce2=_0x55c85b(_0x78f8('0x8f'));var _0x313bef='<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>'+_0x78f8('0x90')+'<div\x20class=\x22qd-ddc-prodImgWrapper\x22>'+_0x78f8('0x91')+_0x78f8('0x92')+_0x78f8('0x93')+_0x78f8('0x93')+_0x78f8('0x94')+_0x78f8('0x95')+_0x78f8('0x96')+_0x78f8('0x97')+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>'+'<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>'+_0x78f8('0x98')+_0x78f8('0x99')+'</div>'+_0x78f8('0x93')+_0x78f8('0x9a')+_0x78f8('0x9b')+_0x78f8('0x9c')+_0x78f8('0x9d')+_0x78f8('0x93')+'</div>'+_0x78f8('0x93');_0x450ce2[_0x78f8('0x9e')]();_0x450ce2[_0x78f8('0x76')](function(){var _0x471a2e=_0x55c85b(this);var _0xc405eb,_0x4d8dad,_0x5a8d95,_0x4401d3;var _0x1f00a5=_0x55c85b('');var _0xafc822;for(var _0x51d163 in window['_QuatroDigital_DropDown'][_0x78f8('0x8a')]['items']){if(typeof window[_0x78f8('0x18')][_0x78f8('0x8a')][_0x78f8('0x81')][_0x51d163]!==_0x78f8('0xf'))continue;_0x5a8d95=window['_QuatroDigital_DropDown']['getOrderForm'][_0x78f8('0x81')][_0x51d163];_0xafc822=_0x5a8d95[_0x78f8('0x9f')][_0x78f8('0x1')](/^\/|\/$/g,'')[_0x78f8('0x6')]('/');_0x4d8dad=_0x55c85b(_0x313bef);_0x4d8dad['attr']({'data-sku':_0x5a8d95['id'],'data-sku-index':_0x51d163,'data-qd-departament':_0xafc822[0x0],'data-qd-category':_0xafc822[_0xafc822[_0x78f8('0x7')]-0x1]});_0x4d8dad[_0x78f8('0x89')](_0x78f8('0xa0')+_0x5a8d95[_0x78f8('0xa1')]);_0x4d8dad[_0x78f8('0x44')]('.qd-ddc-prodName')[_0x78f8('0x4e')](_0x4701b3[_0x78f8('0x27')](_0x5a8d95));_0x4d8dad[_0x78f8('0x44')](_0x78f8('0xa2'))[_0x78f8('0x4e')](isNaN(_0x5a8d95[_0x78f8('0xa3')])?_0x5a8d95[_0x78f8('0xa3')]:_0x5a8d95[_0x78f8('0xa3')]==0x0?'Grátis':(_0x55c85b('meta[name=currency]')['attr'](_0x78f8('0xa4'))||'R$')+'\x20'+qd_number_format(_0x5a8d95['sellingPrice']/0x64,0x2,',','.'));_0x4d8dad['find'](_0x78f8('0xa5'))[_0x78f8('0xa6')]({'data-sku':_0x5a8d95['id'],'data-sku-index':_0x51d163})[_0x78f8('0x60')](_0x5a8d95[_0x78f8('0xa7')]);_0x4d8dad['find'](_0x78f8('0xa8'))['attr']({'data-sku':_0x5a8d95['id'],'data-sku-index':_0x51d163});_0x39bc4c[_0x78f8('0xa9')](_0x5a8d95['id'],_0x4d8dad[_0x78f8('0x44')]('.qd-ddc-image'),_0x5a8d95['imageUrl']);_0x4d8dad[_0x78f8('0x44')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')[_0x78f8('0xa6')]({'data-sku':_0x5a8d95['id'],'data-sku-index':_0x51d163});_0x4d8dad[_0x78f8('0xaa')](_0x471a2e);_0x1f00a5=_0x1f00a5[_0x78f8('0x50')](_0x4d8dad);}try{var _0x1b33f1=_0x471a2e[_0x78f8('0xab')](_0x78f8('0x86'))[_0x78f8('0x44')](_0x78f8('0xac'));if(_0x1b33f1[_0x78f8('0x7')]&&_0x1b33f1[_0x78f8('0x60')]()==''&&window[_0x78f8('0x18')]['getOrderForm'][_0x78f8('0xad')][_0x78f8('0xae')])_0x1b33f1['val'](window[_0x78f8('0x18')][_0x78f8('0x8a')][_0x78f8('0xad')][_0x78f8('0xae')]['postalCode']);}catch(_0x32a629){_0x23e28a(_0x78f8('0xaf')+_0x32a629[_0x78f8('0xe')],'aviso');}_0x39bc4c[_0x78f8('0xb0')](_0x471a2e);_0x39bc4c[_0x78f8('0x74')]();if(_0x3edbf9&&_0x3edbf9[_0x78f8('0xb1')]){(function(){_0x4401d3=_0x1f00a5['filter'](_0x78f8('0xb2')+_0x3edbf9[_0x78f8('0xb1')]+'\x27]');if(!_0x4401d3[_0x78f8('0x7')])return;_0xc405eb=0x0;_0x1f00a5[_0x78f8('0x76')](function(){var _0x248b60=_0x55c85b(this);if(_0x248b60['is'](_0x4401d3))return![];_0xc405eb+=_0x248b60[_0x78f8('0xb3')]();});_0x39bc4c['scrollCart'](undefined,undefined,_0xc405eb,_0x471a2e['add'](_0x471a2e['parent']()));_0x1f00a5['removeClass'](_0x78f8('0xb4'));(function(_0x1853d0){_0x1853d0[_0x78f8('0x89')](_0x78f8('0xb5'));_0x1853d0[_0x78f8('0x89')](_0x78f8('0xb4'));setTimeout(function(){_0x1853d0[_0x78f8('0x55')](_0x78f8('0xb5'));},_0x4701b3[_0x78f8('0x85')]);}(_0x4401d3));_0x55c85b(document['body'])[_0x78f8('0x89')](_0x78f8('0xb6'));setTimeout(function(){_0x55c85b(document[_0x78f8('0x54')])['removeClass']('qd-ddc-product-add-time-v2');},_0x4701b3[_0x78f8('0x85')]);}());}});(function(){if(_QuatroDigital_DropDown[_0x78f8('0x8a')]['items'][_0x78f8('0x7')]){_0x55c85b(_0x78f8('0x54'))[_0x78f8('0x55')](_0x78f8('0xb7'))['addClass'](_0x78f8('0xb8'));setTimeout(function(){_0x55c85b('body')['removeClass'](_0x78f8('0xb9'));},_0x4701b3[_0x78f8('0x85')]);}else _0x55c85b(_0x78f8('0x54'))[_0x78f8('0x55')](_0x78f8('0xba'))[_0x78f8('0x89')]('qd-ddc-cart-empty');}());if(typeof _0x4701b3[_0x78f8('0xbb')]===_0x78f8('0xc'))_0x4701b3[_0x78f8('0xbb')][_0x78f8('0x77')](this);else _0x23e28a(_0x78f8('0xbc'));};_0x39bc4c[_0x78f8('0xa9')]=function(_0x5c72ca,_0x578a75,_0x2e76cb){var _0x480d2d=!![];function _0x489bf7(){if(_0x4701b3[_0x78f8('0xbd')]&&typeof _0x2e76cb=='string')_0x2e76cb=_0x2e76cb['replace']('http','https');_0x578a75['removeClass']('qd-loaded')[_0x78f8('0xbe')](function(){_0x55c85b(this)['addClass']('qd-loaded');})['attr'](_0x78f8('0xbf'),_0x2e76cb);};if(_0x2e76cb)_0x489bf7();else if(!isNaN(_0x5c72ca)){alert(_0x78f8('0xc0'));}else _0x23e28a(_0x78f8('0xc1'),_0x78f8('0x14'));};_0x39bc4c['actionButtons']=function(_0x1cbd7f){var _0x1ce8ab,_0x1cb3f8,_0x291664,_0x291190;_0x1ce8ab=function(_0x1bdf5a,_0x40a3ca){var _0x4f761e,_0x268695,_0x3f42a4,_0x4fa8aa,_0x29573d;_0x3f42a4=_0x55c85b(_0x1bdf5a);_0x4f761e=_0x3f42a4['attr'](_0x78f8('0xc2'));_0x29573d=_0x3f42a4['attr'](_0x78f8('0xc3'));if(!_0x4f761e)return;_0x268695=parseInt(_0x3f42a4[_0x78f8('0x60')]())||0x1;_0x39bc4c[_0x78f8('0xc4')]([_0x4f761e,_0x29573d],_0x268695,_0x268695+0x1,function(_0x43899a){_0x3f42a4[_0x78f8('0x60')](_0x43899a);if(typeof _0x40a3ca===_0x78f8('0xc'))_0x40a3ca();});};_0x291664=function(_0x18e0ea,_0x3f98c2){var _0x5f241b,_0x50c596,_0x5df00b,_0x1d4c78,_0x16bbd4;_0x5df00b=_0x55c85b(_0x18e0ea);_0x5f241b=_0x5df00b[_0x78f8('0xa6')](_0x78f8('0xc2'));_0x16bbd4=_0x5df00b[_0x78f8('0xa6')](_0x78f8('0xc3'));if(!_0x5f241b)return;_0x50c596=parseInt(_0x5df00b[_0x78f8('0x60')]())||0x2;_0x1d4c78=_0x39bc4c[_0x78f8('0xc4')]([_0x5f241b,_0x16bbd4],_0x50c596,_0x50c596-0x1,function(_0x53c5bb){_0x5df00b['val'](_0x53c5bb);if(typeof _0x3f98c2===_0x78f8('0xc'))_0x3f98c2();});};_0x291190=function(_0x2ee139,_0x1018c4){var _0x2471b2,_0x3b8ba5,_0x57c389,_0x27bb95,_0x1c1337;_0x57c389=_0x55c85b(_0x2ee139);_0x2471b2=_0x57c389[_0x78f8('0xa6')](_0x78f8('0xc2'));_0x1c1337=_0x57c389[_0x78f8('0xa6')](_0x78f8('0xc3'));if(!_0x2471b2)return;_0x3b8ba5=parseInt(_0x57c389[_0x78f8('0x60')]())||0x1;_0x27bb95=_0x39bc4c[_0x78f8('0xc4')]([_0x2471b2,_0x1c1337],0x1,_0x3b8ba5,function(_0x155a31){_0x57c389[_0x78f8('0x60')](_0x155a31);if(typeof _0x1018c4===_0x78f8('0xc'))_0x1018c4();});};_0x1cb3f8=_0x1cbd7f[_0x78f8('0x44')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x1cb3f8[_0x78f8('0x89')]('qd_on')[_0x78f8('0x76')](function(){var _0x87f0c4=_0x55c85b(this);_0x87f0c4['find'](_0x78f8('0xc5'))['on'](_0x78f8('0xc6'),function(_0x3db185){_0x3db185[_0x78f8('0x65')]();_0x1cb3f8[_0x78f8('0x89')](_0x78f8('0xc7'));_0x1ce8ab(_0x87f0c4[_0x78f8('0x44')](_0x78f8('0xa5')),function(){_0x1cb3f8[_0x78f8('0x55')](_0x78f8('0xc7'));});});_0x87f0c4[_0x78f8('0x44')](_0x78f8('0xc8'))['on']('click.qd_ddc_minus',function(_0x3f3b39){_0x3f3b39[_0x78f8('0x65')]();_0x1cb3f8[_0x78f8('0x89')](_0x78f8('0xc7'));_0x291664(_0x87f0c4[_0x78f8('0x44')](_0x78f8('0xa5')),function(){_0x1cb3f8[_0x78f8('0x55')](_0x78f8('0xc7'));});});_0x87f0c4[_0x78f8('0x44')](_0x78f8('0xa5'))['on'](_0x78f8('0xc9'),function(){_0x1cb3f8[_0x78f8('0x89')](_0x78f8('0xc7'));_0x291190(this,function(){_0x1cb3f8[_0x78f8('0x55')](_0x78f8('0xc7'));});});_0x87f0c4[_0x78f8('0x44')](_0x78f8('0xa5'))['on']('keyup.qd_ddc_change',function(_0xef88b3){if(_0xef88b3['keyCode']!=0xd)return;_0x1cb3f8['addClass'](_0x78f8('0xc7'));_0x291190(this,function(){_0x1cb3f8[_0x78f8('0x55')](_0x78f8('0xc7'));});});});_0x1cbd7f[_0x78f8('0x44')]('.qd-ddc-prodRow')[_0x78f8('0x76')](function(){var _0x32df44=_0x55c85b(this);_0x32df44[_0x78f8('0x44')](_0x78f8('0xa8'))['on'](_0x78f8('0xca'),function(){var _0x47f938;_0x32df44['addClass'](_0x78f8('0xc7'));_0x39bc4c[_0x78f8('0xcb')](_0x55c85b(this),function(_0x3a106a){if(_0x3a106a)_0x32df44[_0x78f8('0xcc')](!![])['slideUp'](function(){_0x32df44[_0x78f8('0xcd')]();_0x39bc4c['cartIsEmpty']();});else _0x32df44[_0x78f8('0x55')](_0x78f8('0xc7'));});return![];});});};_0x39bc4c[_0x78f8('0x62')]=function(_0x17721d){var _0x21a721=_0x17721d[_0x78f8('0x60')]();_0x21a721=_0x21a721[_0x78f8('0x1')](/[^0-9\-]/g,'');_0x21a721=_0x21a721[_0x78f8('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x78f8('0xce'));_0x21a721=_0x21a721[_0x78f8('0x1')](/(.{9}).*/g,'$1');_0x17721d[_0x78f8('0x60')](_0x21a721);};_0x39bc4c['shippingCalculate']=function(_0x4d450e){var _0x53ed6d=_0x4d450e['val']();if(_0x53ed6d['length']>=0x9){if(_0x4d450e[_0x78f8('0xcf')]('qdDdcLastPostalCode')!=_0x53ed6d){_0x43b91a[_0x78f8('0xd0')]({'postalCode':_0x53ed6d,'country':_0x78f8('0xd1')})[_0x78f8('0xd2')](function(_0x54ba12){_0x4d450e['closest'](_0x78f8('0xd3'))[_0x78f8('0x44')]('.qd-dd-cep-slas')['remove']();window[_0x78f8('0x18')][_0x78f8('0x8a')]=_0x54ba12;_0x39bc4c[_0x78f8('0x71')]();var _0x4693b4=_0x54ba12[_0x78f8('0xad')][_0x78f8('0xd4')][0x0]['slas'];var _0x43821a=_0x55c85b('<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>');for(var _0x901501=0x0;_0x901501<_0x4693b4[_0x78f8('0x7')];_0x901501++){var _0xbddb8f=_0x4693b4[_0x901501];var _0x2937f0=_0xbddb8f['shippingEstimate']>0x1?_0xbddb8f[_0x78f8('0xd5')][_0x78f8('0x1')]('bd',_0x78f8('0xd6')):_0xbddb8f[_0x78f8('0xd5')][_0x78f8('0x1')]('bd',_0x78f8('0xd7'));var _0x1b8eff=_0x55c85b(_0x78f8('0xd8'));_0x1b8eff[_0x78f8('0x4e')](_0x78f8('0xd9')+qd_number_format(_0xbddb8f[_0x78f8('0xda')]/0x64,0x2,',','.')+_0x78f8('0xdb')+_0xbddb8f[_0x78f8('0x28')]+_0x78f8('0xdc')+_0x2937f0+_0x78f8('0xdd')+_0x53ed6d+_0x78f8('0xde'));_0x1b8eff[_0x78f8('0xaa')](_0x43821a[_0x78f8('0x44')]('tbody'));}_0x43821a[_0x78f8('0xdf')](_0x4d450e[_0x78f8('0x0')]('.qd-ddc-cep-tooltip-text')[_0x78f8('0x44')](_0x78f8('0x67')));})[_0x78f8('0xe0')](function(_0x5c5be9){_0x23e28a([_0x78f8('0xe1'),_0x5c5be9]);updateCartData();});}_0x4d450e[_0x78f8('0xcf')]('qdDdcLastPostalCode',_0x53ed6d);}};_0x39bc4c[_0x78f8('0xc4')]=function(_0x4b210d,_0x145679,_0x3cd6ef,_0x5519c0){var _0x32f205=_0x3cd6ef||0x1;if(_0x32f205<0x1)return _0x145679;if(_0x4701b3[_0x78f8('0x2a')]){if(typeof window[_0x78f8('0x18')]['getOrderForm'][_0x78f8('0x81')][_0x4b210d[0x1]]===_0x78f8('0x3')){_0x23e28a(_0x78f8('0xe2')+_0x4b210d[0x1]+']');return _0x145679;}window[_0x78f8('0x18')][_0x78f8('0x8a')][_0x78f8('0x81')][_0x4b210d[0x1]][_0x78f8('0xa7')]=_0x32f205;window[_0x78f8('0x18')]['getOrderForm'][_0x78f8('0x81')][_0x4b210d[0x1]][_0x78f8('0xe3')]=_0x4b210d[0x1];_0x43b91a['updateItems']([window[_0x78f8('0x18')]['getOrderForm']['items'][_0x4b210d[0x1]]],[_0x78f8('0x81'),_0x78f8('0x8c'),_0x78f8('0xad')])[_0x78f8('0xd2')](function(_0x1d734c){window[_0x78f8('0x18')]['getOrderForm']=_0x1d734c;_0x48faea(!![]);})[_0x78f8('0xe0')](function(_0x2ab80a){_0x23e28a([_0x78f8('0xe4'),_0x2ab80a]);_0x48faea();});}else{_0x23e28a(_0x78f8('0xe5'));}function _0x48faea(_0x5280b5){_0x5280b5=typeof _0x5280b5!==_0x78f8('0xe6')?![]:_0x5280b5;_0x39bc4c[_0x78f8('0x71')]();window['_QuatroDigital_DropDown']['allowUpdate']=![];_0x39bc4c[_0x78f8('0x74')]();if(typeof window[_0x78f8('0x87')]!==_0x78f8('0x3')&&typeof window[_0x78f8('0x87')][_0x78f8('0x88')]===_0x78f8('0xc'))window['_QuatroDigital_AmountProduct'][_0x78f8('0x88')][_0x78f8('0x77')](this);if(typeof adminCart==='function')adminCart();_0x55c85b['fn']['simpleCart'](!![],undefined,_0x5280b5);if(typeof _0x5519c0===_0x78f8('0xc'))_0x5519c0(_0x145679);};};_0x39bc4c['removeProduct']=function(_0x307967,_0xa0926b){var _0x56e6e8=![];var _0x37f747=_0x55c85b(_0x307967);var _0x35b0d7=_0x37f747['attr'](_0x78f8('0xc3'));if(_0x4701b3[_0x78f8('0x2a')]){if(typeof window[_0x78f8('0x18')][_0x78f8('0x8a')][_0x78f8('0x81')][_0x35b0d7]===_0x78f8('0x3')){_0x23e28a(_0x78f8('0xe2')+_0x35b0d7+']');return _0x56e6e8;}window['_QuatroDigital_DropDown']['getOrderForm'][_0x78f8('0x81')][_0x35b0d7][_0x78f8('0xe3')]=_0x35b0d7;_0x43b91a[_0x78f8('0xe7')]([window[_0x78f8('0x18')]['getOrderForm']['items'][_0x35b0d7]],[_0x78f8('0x81'),'totalizers',_0x78f8('0xad')])[_0x78f8('0xd2')](function(_0x4f105e){_0x56e6e8=!![];window[_0x78f8('0x18')]['getOrderForm']=_0x4f105e;_0x284451(_0x4f105e);_0x351c39(!![]);})[_0x78f8('0xe0')](function(_0x22cf2c){_0x23e28a(['Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho',_0x22cf2c]);_0x351c39();});}else{alert(_0x78f8('0xe8'));}function _0x351c39(_0x409fac){_0x409fac=typeof _0x409fac!==_0x78f8('0xe6')?![]:_0x409fac;if(typeof window[_0x78f8('0x87')]!=='undefined'&&typeof window['_QuatroDigital_AmountProduct']['exec']==='function')window[_0x78f8('0x87')][_0x78f8('0x88')][_0x78f8('0x77')](this);if(typeof adminCart===_0x78f8('0xc'))adminCart();_0x55c85b['fn'][_0x78f8('0x73')](!![],undefined,_0x409fac);if(typeof _0xa0926b==='function')_0xa0926b(_0x56e6e8);};};_0x39bc4c[_0x78f8('0x5c')]=function(_0x3c99a8,_0x52b54b,_0x10c413,_0x5b09dd){var _0xf8b2fb=_0x5b09dd||_0x55c85b(_0x78f8('0xe9'));var _0x30f77e=_0x3c99a8||'+';var _0x39048f=_0x52b54b||_0xf8b2fb[_0x78f8('0xea')]()*0.9;_0xf8b2fb[_0x78f8('0xcc')](!![],!![])[_0x78f8('0xeb')]({'scrollTop':isNaN(_0x10c413)?_0x30f77e+'='+_0x39048f+'px':_0x10c413});};if(!_0x4701b3[_0x78f8('0x6f')]){_0x39bc4c[_0x78f8('0x71')]();_0x55c85b['fn']['simpleCart'](!![]);}_0x55c85b(window)['on'](_0x78f8('0xec'),function(){try{window['_QuatroDigital_DropDown'][_0x78f8('0x8a')]=undefined;_0x39bc4c[_0x78f8('0x71')]();}catch(_0x5e1c66){_0x23e28a('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x5e1c66[_0x78f8('0xe')],'avisso');}});if(typeof _0x4701b3['callback']==='function')_0x4701b3[_0x78f8('0xa')]['call'](this);else _0x23e28a('Callback\x20não\x20é\x20uma\x20função');};_0x55c85b['fn']['QD_dropDownCart']=function(_0x208a89){var _0xb60be2;_0xb60be2=_0x55c85b(this);_0xb60be2['fn']=new _0x55c85b['QD_dropDownCart'](this,_0x208a89);return _0xb60be2;};}catch(_0x53d9d4){if(typeof console!=='undefined'&&typeof console['error']===_0x78f8('0xc'))console[_0x78f8('0x10')](_0x78f8('0xd'),_0x53d9d4);}}(this));(function(_0x46ce81){'use strict';try{var _0x4e069c=jQuery;var _0x2e03e0=_0x78f8('0xed');var _0x40884d=function(_0x43fa0c,_0x546da7){if('object'===typeof console&&_0x78f8('0x3')!==typeof console['error']&&'undefined'!==typeof console[_0x78f8('0x11')]&&_0x78f8('0x3')!==typeof console['warn']){var _0x56cd46;_0x78f8('0xf')===typeof _0x43fa0c?(_0x43fa0c['unshift']('['+_0x2e03e0+']\x0a'),_0x56cd46=_0x43fa0c):_0x56cd46=['['+_0x2e03e0+']\x0a'+_0x43fa0c];if(_0x78f8('0x3')===typeof _0x546da7||'alerta'!==_0x546da7['toLowerCase']()&&_0x78f8('0x16')!==_0x546da7[_0x78f8('0x15')]())if(_0x78f8('0x3')!==typeof _0x546da7&&'info'===_0x546da7[_0x78f8('0x15')]())try{console['info'][_0x78f8('0x17')](console,_0x56cd46);}catch(_0x36e524){try{console[_0x78f8('0x11')](_0x56cd46[_0x78f8('0x8')]('\x0a'));}catch(_0x557555){}}else try{console[_0x78f8('0x10')][_0x78f8('0x17')](console,_0x56cd46);}catch(_0x4e8d39){try{console[_0x78f8('0x10')](_0x56cd46[_0x78f8('0x8')]('\x0a'));}catch(_0x371f6d){}}else try{console['warn'][_0x78f8('0x17')](console,_0x56cd46);}catch(_0x220bb9){try{console[_0x78f8('0x12')](_0x56cd46[_0x78f8('0x8')]('\x0a'));}catch(_0x15f687){}}}};window[_0x78f8('0x87')]=window[_0x78f8('0x87')]||{};window['_QuatroDigital_AmountProduct']['items']={};window[_0x78f8('0x87')][_0x78f8('0xee')]=![];window['_QuatroDigital_AmountProduct'][_0x78f8('0xef')]=![];window[_0x78f8('0x87')][_0x78f8('0xf0')]=![];var _0xff33db=_0x78f8('0xf1');var _0x39b409=function(){var _0x3320e7,_0x5e3cc9,_0x1ca641,_0x11a8ce;_0x11a8ce=_0x4fb4dc();if(window[_0x78f8('0x87')][_0x78f8('0xee')]){_0x4e069c(_0x78f8('0xf2'))[_0x78f8('0xcd')]();_0x4e069c(_0x78f8('0xf3'))['removeClass'](_0x78f8('0xf4'));}for(var _0x219be5 in window[_0x78f8('0x87')]['items']){_0x3320e7=window['_QuatroDigital_AmountProduct'][_0x78f8('0x81')][_0x219be5];if(typeof _0x3320e7!==_0x78f8('0xf'))return;_0x1ca641=_0x4e069c(_0x78f8('0xf5')+_0x3320e7[_0x78f8('0xf6')]+']')['getParent']('li');if(!window[_0x78f8('0x87')][_0x78f8('0xee')]&&_0x1ca641[_0x78f8('0x44')](_0x78f8('0xf2'))['length'])continue;_0x5e3cc9=_0x4e069c(_0xff33db);_0x5e3cc9['find'](_0x78f8('0xf7'))[_0x78f8('0x46')](_0x3320e7[_0x78f8('0x7c')]);var _0x2f6c1f=_0x1ca641[_0x78f8('0x44')]('.qd_bap_wrapper_content');if(_0x2f6c1f[_0x78f8('0x7')])_0x2f6c1f[_0x78f8('0xf8')](_0x5e3cc9)[_0x78f8('0x89')](_0x78f8('0xf4'));else _0x1ca641[_0x78f8('0xf8')](_0x5e3cc9);}if(_0x11a8ce)window[_0x78f8('0x87')][_0x78f8('0xee')]=![];};var _0x4fb4dc=function(){if(!window[_0x78f8('0x87')][_0x78f8('0xee')])return;var _0x5e3a7c=![],_0x28d94e={};window[_0x78f8('0x87')][_0x78f8('0x81')]={};for(var _0x2508bd in window[_0x78f8('0x18')][_0x78f8('0x8a')]['items']){if(typeof window['_QuatroDigital_DropDown'][_0x78f8('0x8a')]['items'][_0x2508bd]!==_0x78f8('0xf'))continue;var _0x3755ff=window[_0x78f8('0x18')][_0x78f8('0x8a')][_0x78f8('0x81')][_0x2508bd];if(typeof _0x3755ff[_0x78f8('0xf9')]==='undefined'||_0x3755ff['productId']===null||_0x3755ff[_0x78f8('0xf9')]==='')continue;window[_0x78f8('0x87')]['items'][_0x78f8('0xfa')+_0x3755ff[_0x78f8('0xf9')]]=window[_0x78f8('0x87')][_0x78f8('0x81')]['prod_'+_0x3755ff[_0x78f8('0xf9')]]||{};window[_0x78f8('0x87')][_0x78f8('0x81')][_0x78f8('0xfa')+_0x3755ff[_0x78f8('0xf9')]][_0x78f8('0xf6')]=_0x3755ff[_0x78f8('0xf9')];if(!_0x28d94e[_0x78f8('0xfa')+_0x3755ff['productId']])window['_QuatroDigital_AmountProduct'][_0x78f8('0x81')]['prod_'+_0x3755ff['productId']][_0x78f8('0x7c')]=0x0;window['_QuatroDigital_AmountProduct'][_0x78f8('0x81')][_0x78f8('0xfa')+_0x3755ff['productId']][_0x78f8('0x7c')]=window['_QuatroDigital_AmountProduct'][_0x78f8('0x81')][_0x78f8('0xfa')+_0x3755ff[_0x78f8('0xf9')]][_0x78f8('0x7c')]+_0x3755ff[_0x78f8('0xa7')];_0x5e3a7c=!![];_0x28d94e[_0x78f8('0xfa')+_0x3755ff[_0x78f8('0xf9')]]=!![];}return _0x5e3a7c;};window[_0x78f8('0x87')]['exec']=function(){window[_0x78f8('0x87')]['allowRecalculate']=!![];_0x39b409[_0x78f8('0x77')](this);};_0x4e069c(document)['ajaxStop'](function(){_0x39b409['call'](this);});}catch(_0x5726df){if(typeof console!=='undefined'&&typeof console[_0x78f8('0x10')]===_0x78f8('0xc'))console[_0x78f8('0x10')](_0x78f8('0xd'),_0x5726df);}}(this));(function(){'use strict';try{var _0x1690a8=jQuery,_0xbb1730;var _0x197d71=_0x78f8('0xfb');var _0x5312a1=function(_0x26b337,_0x288aec){if(_0x78f8('0xf')===typeof console&&_0x78f8('0x3')!==typeof console['error']&&_0x78f8('0x3')!==typeof console[_0x78f8('0x11')]&&_0x78f8('0x3')!==typeof console[_0x78f8('0x12')]){var _0x44a319;_0x78f8('0xf')===typeof _0x26b337?(_0x26b337[_0x78f8('0x13')]('['+_0x197d71+']\x0a'),_0x44a319=_0x26b337):_0x44a319=['['+_0x197d71+']\x0a'+_0x26b337];if(_0x78f8('0x3')===typeof _0x288aec||_0x78f8('0x14')!==_0x288aec[_0x78f8('0x15')]()&&_0x78f8('0x16')!==_0x288aec['toLowerCase']())if(_0x78f8('0x3')!==typeof _0x288aec&&'info'===_0x288aec[_0x78f8('0x15')]())try{console[_0x78f8('0x11')][_0x78f8('0x17')](console,_0x44a319);}catch(_0x4cd3f1){try{console[_0x78f8('0x11')](_0x44a319[_0x78f8('0x8')]('\x0a'));}catch(_0x420af1){}}else try{console[_0x78f8('0x10')][_0x78f8('0x17')](console,_0x44a319);}catch(_0x1ab2df){try{console[_0x78f8('0x10')](_0x44a319[_0x78f8('0x8')]('\x0a'));}catch(_0x269745){}}else try{console[_0x78f8('0x12')][_0x78f8('0x17')](console,_0x44a319);}catch(_0x359ad3){try{console[_0x78f8('0x12')](_0x44a319['join']('\x0a'));}catch(_0x276a60){}}}};var _0x425098={'selector':_0x78f8('0xfc'),'dropDown':{},'buyButton':{}};_0x1690a8[_0x78f8('0xfd')]=function(_0x2bf7ce){var _0x554535,_0x1c3bd8={};_0xbb1730=_0x1690a8[_0x78f8('0x29')](!![],{},_0x425098,_0x2bf7ce);_0x554535=_0x1690a8(_0xbb1730[_0x78f8('0xfe')])[_0x78f8('0x19')](_0xbb1730['dropDown']);if(typeof _0xbb1730['dropDown'][_0x78f8('0x6f')]!==_0x78f8('0x3')&&_0xbb1730[_0x78f8('0xff')][_0x78f8('0x6f')]===![])_0x1c3bd8[_0x78f8('0x100')]=_0x1690a8(_0xbb1730[_0x78f8('0xfe')])[_0x78f8('0x101')](_0x554535['fn'],_0xbb1730[_0x78f8('0x100')]);else _0x1c3bd8[_0x78f8('0x100')]=_0x1690a8(_0xbb1730[_0x78f8('0xfe')])[_0x78f8('0x101')](_0xbb1730['buyButton']);_0x1c3bd8[_0x78f8('0xff')]=_0x554535;return _0x1c3bd8;};_0x1690a8['fn'][_0x78f8('0x102')]=function(){if(typeof console===_0x78f8('0xf')&&typeof console['info']==='function')console[_0x78f8('0x11')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x1690a8[_0x78f8('0x102')]=_0x1690a8['fn'][_0x78f8('0x102')];}catch(_0x2a9155){if(typeof console!=='undefined'&&typeof console[_0x78f8('0x10')]===_0x78f8('0xc'))console[_0x78f8('0x10')](_0x78f8('0xd'),_0x2a9155);}}());
>>>>>>> 8b4d7d49cd39c2e6c7476b43866cb84108c973d7
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);
/* Automatizador de comments box do Facebook // Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* Vídeo na foto do produto // Carlos Vinicius [Quatro Digital] // Todos os direitos reservados */
<<<<<<< HEAD
var _0x99a5=['<div\x20class=\x22qd-playerContainer\x22></div>','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','autoPlay','&mute=','mute','\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','addClass','fadeTo','animate','iframe','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','removeClass','stop','find','.qd-videoItem','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','call','contentWindow','postMessage','attr','click','insertThumbsIn','trigger','load','ImageControl','.qd-videoLink','body','.produto','object','undefined','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','extend','start','td.value-field.Videos:first','ul.thumbs','div#image','videoFieldSelector','split','length','indexOf','youtube','shift','push','be/','pop','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','wrap'];(function(_0x46b2ff,_0x32d753){var _0x1ad7d4=function(_0x4b5b51){while(--_0x4b5b51){_0x46b2ff['push'](_0x46b2ff['shift']());}};_0x1ad7d4(++_0x32d753);}(_0x99a5,0xc5));var _0x599a=function(_0x4adf31,_0x445a2e){_0x4adf31=_0x4adf31-0x0;var _0x25c0c5=_0x99a5[_0x4adf31];return _0x25c0c5;};(function(_0x5757c9){$(function(){if($(document[_0x599a('0x0')])['is'](_0x599a('0x1'))){var _0x4939c9=[];var _0x3bb229=function(_0xd88abd,_0xb77c40){_0x599a('0x2')===typeof console&&(_0x599a('0x3')!==typeof _0xb77c40&&_0x599a('0x4')===_0xb77c40[_0x599a('0x5')]()?console[_0x599a('0x6')](_0x599a('0x7')+_0xd88abd):'undefined'!==typeof _0xb77c40&&'info'===_0xb77c40[_0x599a('0x5')]()?console[_0x599a('0x8')](_0x599a('0x7')+_0xd88abd):console[_0x599a('0x9')]('[Video\x20in\x20product]\x20'+_0xd88abd));};window[_0x599a('0xa')]=window[_0x599a('0xa')]||{};var _0x4c3628=$[_0x599a('0xb')](!0x0,{'insertThumbsIn':_0x599a('0xc'),'videoFieldSelector':_0x599a('0xd'),'controlVideo':!0x0,'urlProtocol':'http','autoPlay':0x0,'mute':0x0},window[_0x599a('0xa')]);var _0x369483=$(_0x599a('0xe'));var _0x3bed4d=$(_0x599a('0xf'));var _0x54e5bb=$(_0x4c3628[_0x599a('0x10')])['text']()['replace'](/;\s*/,';')[_0x599a('0x11')](';');for(var _0x453859=0x0;_0x453859<_0x54e5bb[_0x599a('0x12')];_0x453859++)-0x1<_0x54e5bb[_0x453859][_0x599a('0x13')](_0x599a('0x14'))?_0x4939c9['push'](_0x54e5bb[_0x453859][_0x599a('0x11')]('v=')['pop']()[_0x599a('0x11')](/[&#]/)[_0x599a('0x15')]()):-0x1<_0x54e5bb[_0x453859][_0x599a('0x13')]('youtu.be')&&_0x4939c9[_0x599a('0x16')](_0x54e5bb[_0x453859]['split'](_0x599a('0x17'))[_0x599a('0x18')]()[_0x599a('0x11')](/[\?&#]/)[_0x599a('0x15')]());var _0x59b8ab=$(_0x599a('0x19'));_0x59b8ab[_0x599a('0x1a')]('#include');_0x59b8ab[_0x599a('0x1b')](_0x599a('0x1c'));_0x54e5bb=function(_0x32d8ee){var _0x1e0c64={'y':_0x599a('0x1d')};return function(_0x5de7db){var _0x299df1=function(_0x1f6f7e){return _0x1f6f7e;};var _0x5505ba=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5de7db=_0x5de7db['d'+_0x5505ba[0x10]+'c'+_0x5505ba[0x11]+'m'+_0x299df1(_0x5505ba[0x1])+'n'+_0x5505ba[0xd]]['l'+_0x5505ba[0x12]+'c'+_0x5505ba[0x0]+'ti'+_0x299df1('o')+'n'];var _0x3e9dac=function(_0x2f8739){return escape(encodeURIComponent(_0x2f8739[_0x599a('0x1e')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x36dcbf){return String[_0x599a('0x1f')](('Z'>=_0x36dcbf?0x5a:0x7a)>=(_0x36dcbf=_0x36dcbf[_0x599a('0x20')](0x0)+0xd)?_0x36dcbf:_0x36dcbf-0x1a);})));};var _0x18bd44=_0x3e9dac(_0x5de7db[[_0x5505ba[0x9],_0x299df1('o'),_0x5505ba[0xc],_0x5505ba[_0x299df1(0xd)]][_0x599a('0x21')]('')]);_0x3e9dac=_0x3e9dac((window[['js',_0x299df1('no'),'m',_0x5505ba[0x1],_0x5505ba[0x4]['toUpperCase'](),'ite']['join']('')]||'---')+['.v',_0x5505ba[0xd],'e',_0x299df1('x'),'co',_0x299df1('mm'),_0x599a('0x22'),_0x5505ba[0x1],'.c',_0x299df1('o'),'m.',_0x5505ba[0x13],'r']['join'](''));for(var _0xc8d6c2 in _0x1e0c64){if(_0x3e9dac===_0xc8d6c2+_0x1e0c64[_0xc8d6c2]||_0x18bd44===_0xc8d6c2+_0x1e0c64[_0xc8d6c2]){var _0x174de8='tr'+_0x5505ba[0x11]+'e';break;}_0x174de8='f'+_0x5505ba[0x0]+'ls'+_0x299df1(_0x5505ba[0x1])+'';}_0x299df1=!0x1;-0x1<_0x5de7db[[_0x5505ba[0xc],'e',_0x5505ba[0x0],'rc',_0x5505ba[0x9]][_0x599a('0x21')]('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x299df1=!0x0);return[_0x174de8,_0x299df1];}(_0x32d8ee);}(window);if(!eval(_0x54e5bb[0x0]))return _0x54e5bb[0x1]?_0x3bb229(_0x599a('0x23')):!0x1;var _0x4e9d91=function(_0x582ad4,_0x5a829e){_0x599a('0x14')===_0x5a829e&&_0x59b8ab['html'](_0x599a('0x24')+_0x4c3628[_0x599a('0x25')]+_0x599a('0x26')+_0x582ad4+'?wmode=transparent&rel=0&enablejsapi=1&autoplay='+_0x4c3628[_0x599a('0x27')]+_0x599a('0x28')+_0x4c3628[_0x599a('0x29')]+_0x599a('0x2a'));_0x3bed4d[_0x599a('0x2b')](_0x599a('0x2c'),_0x3bed4d[_0x599a('0x2b')](_0x599a('0x2c'))||_0x3bed4d[_0x599a('0x2c')]());_0x3bed4d['stop'](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(_0x599a('0x0'))[_0x599a('0x2d')]('qdpv-video-on');});_0x59b8ab['stop'](!0x0,!0x0)[_0x599a('0x2e')](0x1f4,0x1,function(){_0x3bed4d['add'](_0x59b8ab)[_0x599a('0x2f')]({'height':_0x59b8ab['find'](_0x599a('0x30'))[_0x599a('0x2c')]()},0x2bc);});};removePlayer=function(){_0x369483['find'](_0x599a('0x31'))[_0x599a('0x32')](_0x599a('0x33'),function(){_0x59b8ab['stop'](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x599a('0x34')]()[_0x599a('0x35')]('style');$(_0x599a('0x0'))[_0x599a('0x36')]('qdpv-video-on');});_0x3bed4d[_0x599a('0x37')](!0x0,!0x0)[_0x599a('0x2e')](0x1f4,0x1,function(){var _0x5806a9=_0x3bed4d[_0x599a('0x2b')]('height');_0x5806a9&&_0x3bed4d[_0x599a('0x2f')]({'height':_0x5806a9},0x2bc);});});};var _0x454538=function(){if(!_0x369483[_0x599a('0x38')](_0x599a('0x39'))[_0x599a('0x12')])for(vId in removePlayer['call'](this),_0x4939c9)if(_0x599a('0x3a')===typeof _0x4939c9[vId]&&''!==_0x4939c9[vId]){var _0x2ddc8d=$(_0x599a('0x3b')+_0x4939c9[vId]+_0x599a('0x3c')+_0x4939c9[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x4939c9[vId]+_0x599a('0x3d'));_0x2ddc8d['find']('a')[_0x599a('0x32')](_0x599a('0x3e'),function(){var _0x202471=$(this);_0x369483[_0x599a('0x38')]('.ON')[_0x599a('0x36')]('ON');_0x202471[_0x599a('0x2d')]('ON');0x1==_0x4c3628[_0x599a('0x3f')]?$(_0x599a('0x40'))[_0x599a('0x12')]?(_0x4e9d91[_0x599a('0x41')](this,'',''),$(_0x599a('0x40'))[0x0][_0x599a('0x42')][_0x599a('0x43')]('{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','*')):_0x4e9d91[_0x599a('0x41')](this,_0x202471[_0x599a('0x44')]('rel'),'youtube'):_0x4e9d91[_0x599a('0x41')](this,_0x202471[_0x599a('0x44')]('rel'),_0x599a('0x14'));return!0x1;});0x1==_0x4c3628['controlVideo']&&_0x369483['find']('a:not(.qd-videoLink)')[_0x599a('0x45')](function(_0x2d5ff9){$('.qd-playerWrapper\x20iframe')[_0x599a('0x12')]&&$(_0x599a('0x40'))[0x0]['contentWindow'][_0x599a('0x43')]('{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','*');});_0x599a('0xc')===_0x4c3628[_0x599a('0x46')]?_0x2ddc8d[_0x599a('0x1a')](_0x369483):_0x2ddc8d['appendTo'](_0x369483);_0x2ddc8d[_0x599a('0x47')]('QuatroDigital.pv_video_added',[_0x4939c9[vId],_0x2ddc8d]);}};$(document)['ajaxStop'](_0x454538);$(window)[_0x599a('0x48')](_0x454538);(function(){var _0x428901=this;var _0x5cbb9c=window[_0x599a('0x49')]||function(){};window[_0x599a('0x49')]=function(_0x53ad90,_0x2ccd79){$(_0x53ad90||'')['is'](_0x599a('0x4a'))||(_0x5cbb9c[_0x599a('0x41')](this,_0x53ad90,_0x2ccd79),_0x454538['call'](_0x428901));};}());}});}(this));
=======
var _0x8604=['td.value-field.Videos:first','http','ul.thumbs','div#image','split','indexOf','youtube','push','pop','youtu.be','be/','shift','prependTo','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','join','toUpperCase','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','&mute=','mute','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','removeClass','data','.qd-videoItem','length','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','click.playVideo','.ON','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','rel','a:not(.qd-videoLink)','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','trigger','QuatroDigital.pv_video_added','load','ImageControl','body','.produto','alerta','toLowerCase','warn','[Video\x20in\x20product]\x20','undefined','info','qdVideoInProduct','extend','start'];(function(_0x55e688,_0x5a5b39){var _0x4eeab9=function(_0x235163){while(--_0x235163){_0x55e688['push'](_0x55e688['shift']());}};_0x4eeab9(++_0x5a5b39);}(_0x8604,0x9d));var _0x4860=function(_0x4c626e,_0x4c2ec5){_0x4c626e=_0x4c626e-0x0;var _0x18e404=_0x8604[_0x4c626e];return _0x18e404;};(function(_0x498181){$(function(){if($(document[_0x4860('0x0')])['is'](_0x4860('0x1'))){var _0x2a6187=[];var _0x2ca67f=function(_0x28711b,_0x2cedaa){'object'===typeof console&&('undefined'!==typeof _0x2cedaa&&_0x4860('0x2')===_0x2cedaa[_0x4860('0x3')]()?console[_0x4860('0x4')](_0x4860('0x5')+_0x28711b):_0x4860('0x6')!==typeof _0x2cedaa&&_0x4860('0x7')===_0x2cedaa[_0x4860('0x3')]()?console['info']('[Video\x20in\x20product]\x20'+_0x28711b):console['error'](_0x4860('0x5')+_0x28711b));};window[_0x4860('0x8')]=window[_0x4860('0x8')]||{};var _0x30905c=$[_0x4860('0x9')](!0x0,{'insertThumbsIn':_0x4860('0xa'),'videoFieldSelector':_0x4860('0xb'),'controlVideo':!0x0,'urlProtocol':_0x4860('0xc'),'autoPlay':0x0,'mute':0x0},window['qdVideoInProduct']);var _0x5ae576=$(_0x4860('0xd'));var _0x2b9f07=$(_0x4860('0xe'));var _0xb37346=$(_0x30905c['videoFieldSelector'])['text']()['replace'](/;\s*/,';')[_0x4860('0xf')](';');for(var _0x450239=0x0;_0x450239<_0xb37346['length'];_0x450239++)-0x1<_0xb37346[_0x450239][_0x4860('0x10')](_0x4860('0x11'))?_0x2a6187[_0x4860('0x12')](_0xb37346[_0x450239][_0x4860('0xf')]('v=')[_0x4860('0x13')]()['split'](/[&#]/)['shift']()):-0x1<_0xb37346[_0x450239][_0x4860('0x10')](_0x4860('0x14'))&&_0x2a6187[_0x4860('0x12')](_0xb37346[_0x450239]['split'](_0x4860('0x15'))[_0x4860('0x13')]()[_0x4860('0xf')](/[\?&#]/)[_0x4860('0x16')]());var _0x30f539=$('<div\x20class=\x22qd-playerWrapper\x22></div>');_0x30f539[_0x4860('0x17')](_0x4860('0x18'));_0x30f539[_0x4860('0x19')](_0x4860('0x1a'));_0xb37346=function(_0x4a2fa0){var _0xbfeb08={'y':_0x4860('0x1b')};return function(_0x2094df){var _0x487362=function(_0x498feb){return _0x498feb;};var _0x5e13e2=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x2094df=_0x2094df['d'+_0x5e13e2[0x10]+'c'+_0x5e13e2[0x11]+'m'+_0x487362(_0x5e13e2[0x1])+'n'+_0x5e13e2[0xd]]['l'+_0x5e13e2[0x12]+'c'+_0x5e13e2[0x0]+'ti'+_0x487362('o')+'n'];var _0x23b74c=function(_0x580053){return escape(encodeURIComponent(_0x580053[_0x4860('0x1c')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x1c6a3a){return String[_0x4860('0x1d')](('Z'>=_0x1c6a3a?0x5a:0x7a)>=(_0x1c6a3a=_0x1c6a3a[_0x4860('0x1e')](0x0)+0xd)?_0x1c6a3a:_0x1c6a3a-0x1a);})));};var _0xef48f=_0x23b74c(_0x2094df[[_0x5e13e2[0x9],_0x487362('o'),_0x5e13e2[0xc],_0x5e13e2[_0x487362(0xd)]][_0x4860('0x1f')]('')]);_0x23b74c=_0x23b74c((window[['js',_0x487362('no'),'m',_0x5e13e2[0x1],_0x5e13e2[0x4][_0x4860('0x20')](),_0x4860('0x21')][_0x4860('0x1f')]('')]||_0x4860('0x22'))+['.v',_0x5e13e2[0xd],'e',_0x487362('x'),'co',_0x487362('mm'),'erc',_0x5e13e2[0x1],'.c',_0x487362('o'),'m.',_0x5e13e2[0x13],'r'][_0x4860('0x1f')](''));for(var _0x3eb7f8 in _0xbfeb08){if(_0x23b74c===_0x3eb7f8+_0xbfeb08[_0x3eb7f8]||_0xef48f===_0x3eb7f8+_0xbfeb08[_0x3eb7f8]){var _0x1bfb98='tr'+_0x5e13e2[0x11]+'e';break;}_0x1bfb98='f'+_0x5e13e2[0x0]+'ls'+_0x487362(_0x5e13e2[0x1])+'';}_0x487362=!0x1;-0x1<_0x2094df[[_0x5e13e2[0xc],'e',_0x5e13e2[0x0],'rc',_0x5e13e2[0x9]]['join']('')][_0x4860('0x10')](_0x4860('0x23'))&&(_0x487362=!0x0);return[_0x1bfb98,_0x487362];}(_0x4a2fa0);}(window);if(!eval(_0xb37346[0x0]))return _0xb37346[0x1]?_0x2ca67f(_0x4860('0x24')):!0x1;var _0x52b711=function(_0x1eebbc,_0x41be95){_0x4860('0x11')===_0x41be95&&_0x30f539[_0x4860('0x25')](_0x4860('0x26')+_0x30905c[_0x4860('0x27')]+_0x4860('0x28')+_0x1eebbc+_0x4860('0x29')+_0x30905c[_0x4860('0x2a')]+_0x4860('0x2b')+_0x30905c[_0x4860('0x2c')]+'\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0x2b9f07['data'](_0x4860('0x2d'),_0x2b9f07['data']('height')||_0x2b9f07[_0x4860('0x2d')]());_0x2b9f07[_0x4860('0x2e')](!0x0,!0x0)[_0x4860('0x2f')](0x1f4,0x0,function(){$(_0x4860('0x0'))[_0x4860('0x30')](_0x4860('0x31'));});_0x30f539[_0x4860('0x2e')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){_0x2b9f07[_0x4860('0x32')](_0x30f539)[_0x4860('0x33')]({'height':_0x30f539[_0x4860('0x34')](_0x4860('0x35'))[_0x4860('0x2d')]()},0x2bc);});};removePlayer=function(){_0x5ae576[_0x4860('0x34')](_0x4860('0x36'))[_0x4860('0x37')](_0x4860('0x38'),function(){_0x30f539[_0x4860('0x2e')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x4860('0x39')]()[_0x4860('0x3a')](_0x4860('0x3b'));$('body')[_0x4860('0x3c')](_0x4860('0x31'));});_0x2b9f07[_0x4860('0x2e')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x708994=_0x2b9f07[_0x4860('0x3d')](_0x4860('0x2d'));_0x708994&&_0x2b9f07['animate']({'height':_0x708994},0x2bc);});});};var _0x8ef101=function(){if(!_0x5ae576[_0x4860('0x34')](_0x4860('0x3e'))[_0x4860('0x3f')])for(vId in removePlayer[_0x4860('0x40')](this),_0x2a6187)if(_0x4860('0x41')===typeof _0x2a6187[vId]&&''!==_0x2a6187[vId]){var _0x407bc4=$(_0x4860('0x42')+_0x2a6187[vId]+_0x4860('0x43')+_0x2a6187[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x2a6187[vId]+'/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>');_0x407bc4[_0x4860('0x34')]('a')[_0x4860('0x37')](_0x4860('0x44'),function(){var _0x4d0d3e=$(this);_0x5ae576[_0x4860('0x34')](_0x4860('0x45'))[_0x4860('0x3c')]('ON');_0x4d0d3e[_0x4860('0x30')]('ON');0x1==_0x30905c[_0x4860('0x46')]?$(_0x4860('0x47'))[_0x4860('0x3f')]?(_0x52b711[_0x4860('0x40')](this,'',''),$(_0x4860('0x47'))[0x0][_0x4860('0x48')][_0x4860('0x49')](_0x4860('0x4a'),'*')):_0x52b711[_0x4860('0x40')](this,_0x4d0d3e['attr'](_0x4860('0x4b')),_0x4860('0x11')):_0x52b711[_0x4860('0x40')](this,_0x4d0d3e['attr']('rel'),_0x4860('0x11'));return!0x1;});0x1==_0x30905c[_0x4860('0x46')]&&_0x5ae576['find'](_0x4860('0x4c'))[_0x4860('0x4d')](function(_0xce58de){$(_0x4860('0x47'))['length']&&$(_0x4860('0x47'))[0x0][_0x4860('0x48')]['postMessage'](_0x4860('0x4e'),'*');});_0x4860('0xa')===_0x30905c[_0x4860('0x4f')]?_0x407bc4[_0x4860('0x17')](_0x5ae576):_0x407bc4['appendTo'](_0x5ae576);_0x407bc4[_0x4860('0x50')](_0x4860('0x51'),[_0x2a6187[vId],_0x407bc4]);}};$(document)['ajaxStop'](_0x8ef101);$(window)[_0x4860('0x52')](_0x8ef101);(function(){var _0x1ecf94=this;var _0x3f0d72=window[_0x4860('0x53')]||function(){};window[_0x4860('0x53')]=function(_0x55134a,_0x43a5ad){$(_0x55134a||'')['is']('.qd-videoLink')||(_0x3f0d72['call'](this,_0x55134a,_0x43a5ad),_0x8ef101[_0x4860('0x40')](_0x1ecf94));};}());}});}(this));
>>>>>>> 8b4d7d49cd39c2e6c7476b43866cb84108c973d7
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