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
				$t.find('h2').insertBefore($t);
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
							slidesToShow: 3,
							slidesToScroll: 3
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
var _0x29ef=['html','replace','show','message','qd-ssa-on','qd-ssa-sku-no-selected','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','off','vtex.sku.selected.QD','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','extend','qdPlugin','initialSkuSelected','prod','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','opts','push','success','call','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','error','clearQueueDelay','jqXHR','ajax','readyState','textStatus','errorThrown','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','undefined','toLowerCase','info','apply','warn','removeClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','data-qd-ssa-qtt','find','hide','addClass','qd-ssa-hide','filter','length','[data-qd-ssa-text=\x22default\x22]','qd-ssa-show'];(function(_0x3f2a40,_0x344287){var _0x1c82f6=function(_0x36ef22){while(--_0x36ef22){_0x3f2a40['push'](_0x3f2a40['shift']());}};_0x1c82f6(++_0x344287);}(_0x29ef,0x16d));var _0xf29e=function(_0x2a2fdd,_0x5b7c09){_0x2a2fdd=_0x2a2fdd-0x0;var _0x560dc0=_0x29ef[_0x2a2fdd];return _0x560dc0;};(function(_0x240cd1){if(_0xf29e('0x0')!==typeof _0x240cd1[_0xf29e('0x1')]){var _0x1e2e6={};_0x240cd1[_0xf29e('0x2')]=_0x1e2e6;_0x240cd1[_0xf29e('0x1')]=function(_0xd5fa9e){var _0x4d790f=_0x240cd1['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0xd5fa9e);var _0x36c4f4=escape(encodeURIComponent(_0x4d790f['url']));_0x1e2e6[_0x36c4f4]=_0x1e2e6[_0x36c4f4]||{};_0x1e2e6[_0x36c4f4]['opts']=_0x1e2e6[_0x36c4f4][_0xf29e('0x3')]||[];_0x1e2e6[_0x36c4f4][_0xf29e('0x3')][_0xf29e('0x4')]({'success':function(_0x556232,_0x98b8b1,_0x2252b3){_0x4d790f[_0xf29e('0x5')][_0xf29e('0x6')](this,_0x556232,_0x98b8b1,_0x2252b3);},'error':function(_0x21e536,_0x351375,_0x12b560){_0x4d790f['error'][_0xf29e('0x6')](this,_0x21e536,_0x351375,_0x12b560);},'complete':function(_0xfb6cd3,_0x539eb4){_0x4d790f[_0xf29e('0x7')][_0xf29e('0x6')](this,_0xfb6cd3,_0x539eb4);}});_0x1e2e6[_0x36c4f4][_0xf29e('0x8')]=_0x1e2e6[_0x36c4f4][_0xf29e('0x8')]||{'success':{},'error':{},'complete':{}};_0x1e2e6[_0x36c4f4][_0xf29e('0x9')]=_0x1e2e6[_0x36c4f4][_0xf29e('0x9')]||{};_0x1e2e6[_0x36c4f4][_0xf29e('0x9')][_0xf29e('0xa')]=_0xf29e('0xb')===typeof _0x1e2e6[_0x36c4f4][_0xf29e('0x9')][_0xf29e('0xa')]?_0x1e2e6[_0x36c4f4][_0xf29e('0x9')]['successPopulated']:!0x1;_0x1e2e6[_0x36c4f4][_0xf29e('0x9')][_0xf29e('0xc')]=_0xf29e('0xb')===typeof _0x1e2e6[_0x36c4f4][_0xf29e('0x9')]['errorPopulated']?_0x1e2e6[_0x36c4f4][_0xf29e('0x9')]['errorPopulated']:!0x1;_0x1e2e6[_0x36c4f4][_0xf29e('0x9')][_0xf29e('0xd')]=_0xf29e('0xb')===typeof _0x1e2e6[_0x36c4f4][_0xf29e('0x9')][_0xf29e('0xd')]?_0x1e2e6[_0x36c4f4][_0xf29e('0x9')]['completePopulated']:!0x1;_0xd5fa9e=_0x240cd1['extend']({},_0x4d790f,{'success':function(_0x3df296,_0x427b36,_0x25d8ab){_0x1e2e6[_0x36c4f4]['parameters']['success']={'data':_0x3df296,'textStatus':_0x427b36,'jqXHR':_0x25d8ab};_0x1e2e6[_0x36c4f4][_0xf29e('0x9')]['successPopulated']=!0x0;for(var _0x4a5e02 in _0x1e2e6[_0x36c4f4]['opts'])_0xf29e('0xe')===typeof _0x1e2e6[_0x36c4f4]['opts'][_0x4a5e02]&&(_0x1e2e6[_0x36c4f4][_0xf29e('0x3')][_0x4a5e02][_0xf29e('0x5')][_0xf29e('0x6')](this,_0x3df296,_0x427b36,_0x25d8ab),_0x1e2e6[_0x36c4f4][_0xf29e('0x3')][_0x4a5e02][_0xf29e('0x5')]=function(){});},'error':function(_0x8f06a3,_0x21f456,_0x582ee4){_0x1e2e6[_0x36c4f4][_0xf29e('0x8')]['error']={'errorThrown':_0x582ee4,'textStatus':_0x21f456,'jqXHR':_0x8f06a3};_0x1e2e6[_0x36c4f4]['callbackFns'][_0xf29e('0xc')]=!0x0;for(var _0x28a8db in _0x1e2e6[_0x36c4f4]['opts'])_0xf29e('0xe')===typeof _0x1e2e6[_0x36c4f4][_0xf29e('0x3')][_0x28a8db]&&(_0x1e2e6[_0x36c4f4][_0xf29e('0x3')][_0x28a8db][_0xf29e('0xf')]['call'](this,_0x8f06a3,_0x21f456,_0x582ee4),_0x1e2e6[_0x36c4f4]['opts'][_0x28a8db][_0xf29e('0xf')]=function(){});},'complete':function(_0x14945a,_0x488ec6){_0x1e2e6[_0x36c4f4][_0xf29e('0x8')]['complete']={'textStatus':_0x488ec6,'jqXHR':_0x14945a};_0x1e2e6[_0x36c4f4][_0xf29e('0x9')][_0xf29e('0xd')]=!0x0;for(var _0x51dea2 in _0x1e2e6[_0x36c4f4][_0xf29e('0x3')])_0xf29e('0xe')===typeof _0x1e2e6[_0x36c4f4][_0xf29e('0x3')][_0x51dea2]&&(_0x1e2e6[_0x36c4f4][_0xf29e('0x3')][_0x51dea2]['complete'][_0xf29e('0x6')](this,_0x14945a,_0x488ec6),_0x1e2e6[_0x36c4f4][_0xf29e('0x3')][_0x51dea2][_0xf29e('0x7')]=function(){});isNaN(parseInt(_0x4d790f[_0xf29e('0x10')]))||setTimeout(function(){_0x1e2e6[_0x36c4f4]['jqXHR']=void 0x0;_0x1e2e6[_0x36c4f4][_0xf29e('0x3')]=void 0x0;_0x1e2e6[_0x36c4f4][_0xf29e('0x8')]=void 0x0;_0x1e2e6[_0x36c4f4][_0xf29e('0x9')]=void 0x0;},_0x4d790f['clearQueueDelay']);}});'undefined'===typeof _0x1e2e6[_0x36c4f4]['jqXHR']?_0x1e2e6[_0x36c4f4][_0xf29e('0x11')]=_0x240cd1[_0xf29e('0x12')](_0xd5fa9e):_0x1e2e6[_0x36c4f4][_0xf29e('0x11')]&&_0x1e2e6[_0x36c4f4][_0xf29e('0x11')][_0xf29e('0x13')]&&0x4==_0x1e2e6[_0x36c4f4][_0xf29e('0x11')][_0xf29e('0x13')]&&(_0x1e2e6[_0x36c4f4]['callbackFns'][_0xf29e('0xa')]&&_0xd5fa9e[_0xf29e('0x5')](_0x1e2e6[_0x36c4f4][_0xf29e('0x8')]['success']['data'],_0x1e2e6[_0x36c4f4][_0xf29e('0x8')][_0xf29e('0x5')][_0xf29e('0x14')],_0x1e2e6[_0x36c4f4][_0xf29e('0x8')]['success'][_0xf29e('0x11')]),_0x1e2e6[_0x36c4f4][_0xf29e('0x9')][_0xf29e('0xc')]&&_0xd5fa9e[_0xf29e('0xf')](_0x1e2e6[_0x36c4f4]['parameters'][_0xf29e('0xf')][_0xf29e('0x11')],_0x1e2e6[_0x36c4f4][_0xf29e('0x8')][_0xf29e('0xf')][_0xf29e('0x14')],_0x1e2e6[_0x36c4f4]['parameters'][_0xf29e('0xf')][_0xf29e('0x15')]),_0x1e2e6[_0x36c4f4]['callbackFns']['completePopulated']&&_0xd5fa9e['complete'](_0x1e2e6[_0x36c4f4][_0xf29e('0x8')]['complete'][_0xf29e('0x11')],_0x1e2e6[_0x36c4f4][_0xf29e('0x8')]['complete'][_0xf29e('0x14')]));};_0x240cd1['qdAjax']['version']=_0xf29e('0x16');}}(jQuery));(function(_0x519ccb){function _0x4b8196(_0x476a8b,_0x5d0195){_0x3921a0['qdAjax']({'url':_0xf29e('0x17')+_0x476a8b,'clearQueueDelay':null,'success':_0x5d0195,'error':function(){_0x498274(_0xf29e('0x18'));}});}var _0x3921a0=jQuery;if(_0xf29e('0x0')!==typeof _0x3921a0['fn'][_0xf29e('0x19')]){var _0x498274=function(_0x3fb9be,_0xcb4246){if(_0xf29e('0xe')===typeof console){var _0x495291;_0xf29e('0xe')===typeof _0x3fb9be?(_0x3fb9be['unshift'](_0xf29e('0x1a')),_0x495291=_0x3fb9be):_0x495291=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x3fb9be];_0xf29e('0x1b')===typeof _0xcb4246||'alerta'!==_0xcb4246['toLowerCase']()&&'aviso'!==_0xcb4246[_0xf29e('0x1c')]()?_0xf29e('0x1b')!==typeof _0xcb4246&&_0xf29e('0x1d')===_0xcb4246[_0xf29e('0x1c')]()?console[_0xf29e('0x1d')][_0xf29e('0x1e')](console,_0x495291):console[_0xf29e('0xf')]['apply'](console,_0x495291):console[_0xf29e('0x1f')][_0xf29e('0x1e')](console,_0x495291);}},_0x5debf8={},_0x598aa1=function(_0x1fe167,_0x156233){function _0x44a50a(_0x58073e){try{_0x1fe167[_0xf29e('0x20')]('qd-ssa-sku-no-selected')['addClass'](_0xf29e('0x21'));var _0xef6fb3=_0x58073e[0x0][_0xf29e('0x22')][0x0][_0xf29e('0x23')];_0x1fe167['attr'](_0xf29e('0x24'),_0xef6fb3);_0x1fe167['each'](function(){var _0x1fe167=_0x3921a0(this)[_0xf29e('0x25')]('[data-qd-ssa-text]');if(0x1>_0xef6fb3)return _0x1fe167[_0xf29e('0x26')]()[_0xf29e('0x27')](_0xf29e('0x28'))[_0xf29e('0x20')]('qd-ssa-show');var _0x58073e=_0x1fe167[_0xf29e('0x29')]('[data-qd-ssa-text=\x22'+_0xef6fb3+'\x22]');_0x58073e=_0x58073e[_0xf29e('0x2a')]?_0x58073e:_0x1fe167[_0xf29e('0x29')](_0xf29e('0x2b'));_0x1fe167[_0xf29e('0x26')]()[_0xf29e('0x27')]('qd-ssa-hide')['removeClass'](_0xf29e('0x2c'));_0x58073e[_0xf29e('0x2d')]((_0x58073e['html']()||'')[_0xf29e('0x2e')]('#qtt',_0xef6fb3));_0x58073e[_0xf29e('0x2f')]()[_0xf29e('0x27')]('qd-ssa-show')['removeClass']('qd-ssa-hide');});}catch(_0x1b26ea){_0x498274(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x1b26ea[_0xf29e('0x30')]]);}}if(_0x1fe167[_0xf29e('0x2a')]){_0x1fe167[_0xf29e('0x27')](_0xf29e('0x31'));_0x1fe167[_0xf29e('0x27')](_0xf29e('0x32'));try{_0x1fe167[_0xf29e('0x27')](_0xf29e('0x33')+vtxctx[_0xf29e('0x34')][_0xf29e('0x35')](';')[_0xf29e('0x2a')]);}catch(_0x124b48){_0x498274([_0xf29e('0x36'),_0x124b48[_0xf29e('0x30')]]);}_0x3921a0(window)['on'](_0xf29e('0x37'),function(_0x4a930a,_0x3212a3,_0x348842){try{_0x4b8196(_0x348842[_0xf29e('0x38')],function(_0x316d5f){_0x44a50a(_0x316d5f);0x1===vtxctx[_0xf29e('0x34')]['split'](';')[_0xf29e('0x2a')]&&0x0==_0x316d5f[0x0][_0xf29e('0x22')][0x0][_0xf29e('0x23')]&&_0x3921a0(window)[_0xf29e('0x39')](_0xf29e('0x3a'));});}catch(_0x23638f){_0x498274([_0xf29e('0x3b'),_0x23638f[_0xf29e('0x30')]]);}});_0x3921a0(window)[_0xf29e('0x3c')](_0xf29e('0x3d'));_0x3921a0(window)['on'](_0xf29e('0x3a'),function(){_0x1fe167[_0xf29e('0x27')]('qd-ssa-sku-prod-unavailable')[_0xf29e('0x26')]();});}};_0x519ccb=function(_0x3e9647){var _0x108433={'y':_0xf29e('0x3e')};return function(_0x4406a4){var _0x4e12a6=function(_0x5c5195){return _0x5c5195;};var _0x5b7454=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4406a4=_0x4406a4['d'+_0x5b7454[0x10]+'c'+_0x5b7454[0x11]+'m'+_0x4e12a6(_0x5b7454[0x1])+'n'+_0x5b7454[0xd]]['l'+_0x5b7454[0x12]+'c'+_0x5b7454[0x0]+'ti'+_0x4e12a6('o')+'n'];var _0x2f8ba1=function(_0x14cf5c){return escape(encodeURIComponent(_0x14cf5c[_0xf29e('0x2e')](/\./g,'¨')[_0xf29e('0x2e')](/[a-zA-Z]/g,function(_0x821f51){return String[_0xf29e('0x3f')](('Z'>=_0x821f51?0x5a:0x7a)>=(_0x821f51=_0x821f51[_0xf29e('0x40')](0x0)+0xd)?_0x821f51:_0x821f51-0x1a);})));};var _0x8db490=_0x2f8ba1(_0x4406a4[[_0x5b7454[0x9],_0x4e12a6('o'),_0x5b7454[0xc],_0x5b7454[_0x4e12a6(0xd)]][_0xf29e('0x41')]('')]);_0x2f8ba1=_0x2f8ba1((window[['js',_0x4e12a6('no'),'m',_0x5b7454[0x1],_0x5b7454[0x4][_0xf29e('0x42')](),_0xf29e('0x43')][_0xf29e('0x41')]('')]||_0xf29e('0x44'))+['.v',_0x5b7454[0xd],'e',_0x4e12a6('x'),'co',_0x4e12a6('mm'),_0xf29e('0x45'),_0x5b7454[0x1],'.c',_0x4e12a6('o'),'m.',_0x5b7454[0x13],'r']['join'](''));for(var _0x52607b in _0x108433){if(_0x2f8ba1===_0x52607b+_0x108433[_0x52607b]||_0x8db490===_0x52607b+_0x108433[_0x52607b]){var _0x4d8208='tr'+_0x5b7454[0x11]+'e';break;}_0x4d8208='f'+_0x5b7454[0x0]+'ls'+_0x4e12a6(_0x5b7454[0x1])+'';}_0x4e12a6=!0x1;-0x1<_0x4406a4[[_0x5b7454[0xc],'e',_0x5b7454[0x0],'rc',_0x5b7454[0x9]][_0xf29e('0x41')]('')][_0xf29e('0x46')](_0xf29e('0x47'))&&(_0x4e12a6=!0x0);return[_0x4d8208,_0x4e12a6];}(_0x3e9647);}(window);if(!eval(_0x519ccb[0x0]))return _0x519ccb[0x1]?_0x498274('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x3921a0['fn'][_0xf29e('0x19')]=function(_0x30fc6d){var _0x1d09d7=_0x3921a0(this);_0x30fc6d=_0x3921a0[_0xf29e('0x48')](!0x0,{},_0x5debf8,_0x30fc6d);_0x1d09d7[_0xf29e('0x49')]=new _0x598aa1(_0x1d09d7,_0x30fc6d);try{_0xf29e('0xe')===typeof _0x3921a0['fn']['QD_smartStockAvailable'][_0xf29e('0x4a')]&&_0x3921a0(window)[_0xf29e('0x39')]('QuatroDigital.ssa.skuSelected',[_0x3921a0['fn']['QD_smartStockAvailable'][_0xf29e('0x4a')][_0xf29e('0x4b')],_0x3921a0['fn'][_0xf29e('0x19')][_0xf29e('0x4a')][_0xf29e('0x38')]]);}catch(_0x226cf7){_0x498274(['Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20',_0x226cf7[_0xf29e('0x30')]]);}_0x3921a0['fn'][_0xf29e('0x19')][_0xf29e('0x4c')]&&_0x3921a0(window)[_0xf29e('0x39')](_0xf29e('0x3a'));return _0x1d09d7;};_0x3921a0(window)['on']('vtex.sku.selected.QD',function(_0x347a43,_0xd22361,_0x327e34){try{_0x3921a0['fn'][_0xf29e('0x19')][_0xf29e('0x4a')]={'prod':_0xd22361,'sku':_0x327e34},_0x3921a0(this)[_0xf29e('0x3c')](_0x347a43);}catch(_0x3d8c66){_0x498274([_0xf29e('0x4d'),_0x3d8c66[_0xf29e('0x30')]]);}});_0x3921a0(window)['on'](_0xf29e('0x4e'),function(_0x3cefab,_0x576ed1,_0x57209f){try{for(var _0x153fc5=_0x57209f[_0xf29e('0x2a')],_0x51ddf9=_0x576ed1=0x0;_0x51ddf9<_0x153fc5&&!_0x57209f[_0x51ddf9][_0xf29e('0x4f')];_0x51ddf9++)_0x576ed1+=0x1;_0x153fc5<=_0x576ed1&&(_0x3921a0['fn']['QD_smartStockAvailable'][_0xf29e('0x4c')]=!0x0);_0x3921a0(this)[_0xf29e('0x3c')](_0x3cefab);}catch(_0x36aa4c){_0x498274([_0xf29e('0x50'),_0x36aa4c[_0xf29e('0x30')]]);}});_0x3921a0(function(){_0x3921a0(_0xf29e('0x51'))[_0xf29e('0x19')]();});}}(window));
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
var _0xc977=['find','filter','.qd-am-banner','length','parent','qd-am-collection-wrapper','qdAjax','html','img[alt=\x27','.box-banner','clone','insertBefore','hide','trim','data-qdam-value','[class*=\x27colunas\x27]','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','call','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','text','replaceSpecialChars','qd-amazing-menu','>ul','>li','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','join','apply','qdAmAddNdx','each','addClass','first','last','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'];(function(_0x45a0fb,_0x2f66be){var _0x70decd=function(_0x33644c){while(--_0x33644c){_0x45a0fb['push'](_0x45a0fb['shift']());}};_0x70decd(++_0x2f66be);}(_0xc977,0x18d));var _0x7c97=function(_0x34a63a,_0x38d39b){_0x34a63a=_0x34a63a-0x0;var _0x349795=_0xc977[_0x34a63a];return _0x349795;};(function(_0x2658a0){_0x2658a0['fn'][_0x7c97('0x0')]=_0x2658a0['fn'][_0x7c97('0x1')];}(jQuery));(function(_0x1f4b61){var _0x239d1c;var _0x104bae=jQuery;if(_0x7c97('0x2')!==typeof _0x104bae['fn'][_0x7c97('0x3')]){var _0x16c6ab={'url':_0x7c97('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0xdfb4d5=function(_0x18f5f2,_0x3416c7){if(_0x7c97('0x5')===typeof console&&_0x7c97('0x6')!==typeof console[_0x7c97('0x7')]&&'undefined'!==typeof console[_0x7c97('0x8')]&&'undefined'!==typeof console[_0x7c97('0x9')]){var _0x21055f;_0x7c97('0x5')===typeof _0x18f5f2?(_0x18f5f2[_0x7c97('0xa')](_0x7c97('0xb')),_0x21055f=_0x18f5f2):_0x21055f=[_0x7c97('0xb')+_0x18f5f2];if(_0x7c97('0x6')===typeof _0x3416c7||_0x7c97('0xc')!==_0x3416c7[_0x7c97('0xd')]()&&'aviso'!==_0x3416c7[_0x7c97('0xd')]())if('undefined'!==typeof _0x3416c7&&'info'===_0x3416c7[_0x7c97('0xd')]())try{console[_0x7c97('0x8')]['apply'](console,_0x21055f);}catch(_0x155b85){try{console[_0x7c97('0x8')](_0x21055f[_0x7c97('0xe')]('\x0a'));}catch(_0x4eea61){}}else try{console[_0x7c97('0x7')][_0x7c97('0xf')](console,_0x21055f);}catch(_0x25cc31){try{console['error'](_0x21055f[_0x7c97('0xe')]('\x0a'));}catch(_0x4580c0){}}else try{console[_0x7c97('0x9')][_0x7c97('0xf')](console,_0x21055f);}catch(_0xb952cf){try{console[_0x7c97('0x9')](_0x21055f['join']('\x0a'));}catch(_0x2d8995){}}}};_0x104bae['fn'][_0x7c97('0x10')]=function(){var _0x11f787=_0x104bae(this);_0x11f787[_0x7c97('0x11')](function(_0x2aeec3){_0x104bae(this)[_0x7c97('0x12')]('qd-am-li-'+_0x2aeec3);});_0x11f787[_0x7c97('0x13')]()['addClass']('qd-am-first');_0x11f787[_0x7c97('0x14')]()[_0x7c97('0x12')]('qd-am-last');return _0x11f787;};_0x104bae['fn'][_0x7c97('0x3')]=function(){};_0x1f4b61=function(_0x2be482){var _0x1990fc={'y':_0x7c97('0x15')};return function(_0x5c222d){var _0x317eaa=function(_0x49da2e){return _0x49da2e;};var _0x1aa336=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5c222d=_0x5c222d['d'+_0x1aa336[0x10]+'c'+_0x1aa336[0x11]+'m'+_0x317eaa(_0x1aa336[0x1])+'n'+_0x1aa336[0xd]]['l'+_0x1aa336[0x12]+'c'+_0x1aa336[0x0]+'ti'+_0x317eaa('o')+'n'];var _0xa752c5=function(_0x472a36){return escape(encodeURIComponent(_0x472a36[_0x7c97('0x16')](/\./g,'¨')[_0x7c97('0x16')](/[a-zA-Z]/g,function(_0x298a61){return String['fromCharCode'](('Z'>=_0x298a61?0x5a:0x7a)>=(_0x298a61=_0x298a61['charCodeAt'](0x0)+0xd)?_0x298a61:_0x298a61-0x1a);})));};var _0x3ccf80=_0xa752c5(_0x5c222d[[_0x1aa336[0x9],_0x317eaa('o'),_0x1aa336[0xc],_0x1aa336[_0x317eaa(0xd)]][_0x7c97('0xe')]('')]);_0xa752c5=_0xa752c5((window[['js',_0x317eaa('no'),'m',_0x1aa336[0x1],_0x1aa336[0x4]['toUpperCase'](),_0x7c97('0x17')]['join']('')]||_0x7c97('0x18'))+['.v',_0x1aa336[0xd],'e',_0x317eaa('x'),'co',_0x317eaa('mm'),_0x7c97('0x19'),_0x1aa336[0x1],'.c',_0x317eaa('o'),'m.',_0x1aa336[0x13],'r'][_0x7c97('0xe')](''));for(var _0x5910e5 in _0x1990fc){if(_0xa752c5===_0x5910e5+_0x1990fc[_0x5910e5]||_0x3ccf80===_0x5910e5+_0x1990fc[_0x5910e5]){var _0x368bb5='tr'+_0x1aa336[0x11]+'e';break;}_0x368bb5='f'+_0x1aa336[0x0]+'ls'+_0x317eaa(_0x1aa336[0x1])+'';}_0x317eaa=!0x1;-0x1<_0x5c222d[[_0x1aa336[0xc],'e',_0x1aa336[0x0],'rc',_0x1aa336[0x9]][_0x7c97('0xe')]('')][_0x7c97('0x1a')](_0x7c97('0x1b'))&&(_0x317eaa=!0x0);return[_0x368bb5,_0x317eaa];}(_0x2be482);}(window);if(!eval(_0x1f4b61[0x0]))return _0x1f4b61[0x1]?_0xdfb4d5(_0x7c97('0x1c')):!0x1;var _0x9c31fe=function(_0x41ed9e){var _0x5b9b5b=_0x41ed9e[_0x7c97('0x1d')]('.qd_am_code');var _0x57a9aa=_0x5b9b5b[_0x7c97('0x1e')](_0x7c97('0x1f'));var _0x4d7eef=_0x5b9b5b[_0x7c97('0x1e')]('.qd-am-collection');if(_0x57a9aa[_0x7c97('0x20')]||_0x4d7eef[_0x7c97('0x20')])_0x57a9aa[_0x7c97('0x21')]()['addClass']('qd-am-banner-wrapper'),_0x4d7eef[_0x7c97('0x21')]()[_0x7c97('0x12')](_0x7c97('0x22')),_0x104bae[_0x7c97('0x23')]({'url':_0x239d1c['url'],'dataType':_0x7c97('0x24'),'success':function(_0x209e42){var _0x31b46c=_0x104bae(_0x209e42);_0x57a9aa[_0x7c97('0x11')](function(){var _0x209e42=_0x104bae(this);var _0x52fa69=_0x31b46c['find'](_0x7c97('0x25')+_0x209e42['attr']('data-qdam-value')+'\x27]');_0x52fa69['length']&&(_0x52fa69[_0x7c97('0x11')](function(){_0x104bae(this)['getParent'](_0x7c97('0x26'))[_0x7c97('0x27')]()[_0x7c97('0x28')](_0x209e42);}),_0x209e42[_0x7c97('0x29')]());})['addClass']('qd-am-content-loaded');_0x4d7eef['each'](function(){var _0x209e42={};var _0x41bceb=_0x104bae(this);_0x31b46c[_0x7c97('0x1d')]('h2')[_0x7c97('0x11')](function(){if(_0x104bae(this)['text']()[_0x7c97('0x2a')]()[_0x7c97('0xd')]()==_0x41bceb['attr'](_0x7c97('0x2b'))[_0x7c97('0x2a')]()[_0x7c97('0xd')]())return _0x209e42=_0x104bae(this),!0x1;});_0x209e42[_0x7c97('0x20')]&&(_0x209e42[_0x7c97('0x11')](function(){_0x104bae(this)['getParent'](_0x7c97('0x2c'))[_0x7c97('0x27')]()['insertBefore'](_0x41bceb);}),_0x41bceb[_0x7c97('0x29')]());})[_0x7c97('0x12')]('qd-am-content-loaded');},'error':function(){_0xdfb4d5(_0x7c97('0x2d')+_0x239d1c['url']+_0x7c97('0x2e'));},'complete':function(){_0x239d1c['ajaxCallback'][_0x7c97('0x2f')](this);_0x104bae(window)['trigger'](_0x7c97('0x30'),_0x41ed9e);},'clearQueueDelay':0xbb8});};_0x104bae[_0x7c97('0x3')]=function(_0x8148eb){var _0x1a286=_0x8148eb[_0x7c97('0x1d')](_0x7c97('0x31'))['each'](function(){var _0x220662=_0x104bae(this);if(!_0x220662[_0x7c97('0x20')])return _0xdfb4d5([_0x7c97('0x32'),_0x8148eb],_0x7c97('0xc'));_0x220662[_0x7c97('0x1d')](_0x7c97('0x33'))[_0x7c97('0x21')]()[_0x7c97('0x12')](_0x7c97('0x34'));_0x220662[_0x7c97('0x1d')]('li')[_0x7c97('0x11')](function(){var _0x262cbc=_0x104bae(this);var _0x17d2e9=_0x262cbc[_0x7c97('0x35')](_0x7c97('0x36'));_0x17d2e9[_0x7c97('0x20')]&&_0x262cbc[_0x7c97('0x12')]('qd-am-elem-'+_0x17d2e9['first']()[_0x7c97('0x37')]()[_0x7c97('0x2a')]()[_0x7c97('0x38')]()[_0x7c97('0x16')](/\./g,'')[_0x7c97('0x16')](/\s/g,'-')[_0x7c97('0xd')]());});var _0x59bfc1=_0x220662[_0x7c97('0x1d')]('>li')['qdAmAddNdx']();_0x220662['addClass'](_0x7c97('0x39'));_0x59bfc1=_0x59bfc1['find'](_0x7c97('0x3a'));_0x59bfc1[_0x7c97('0x11')](function(){var _0x256273=_0x104bae(this);_0x256273[_0x7c97('0x1d')](_0x7c97('0x3b'))[_0x7c97('0x10')]()[_0x7c97('0x12')](_0x7c97('0x3c'));_0x256273['addClass'](_0x7c97('0x3d'));_0x256273['parent']()[_0x7c97('0x12')](_0x7c97('0x3e'));});_0x59bfc1[_0x7c97('0x12')](_0x7c97('0x3e'));var _0x57dfdf=0x0,_0x1f4b61=function(_0xfe02e7){_0x57dfdf+=0x1;_0xfe02e7=_0xfe02e7[_0x7c97('0x35')]('li')[_0x7c97('0x35')]('*');_0xfe02e7[_0x7c97('0x20')]&&(_0xfe02e7['addClass'](_0x7c97('0x3f')+_0x57dfdf),_0x1f4b61(_0xfe02e7));};_0x1f4b61(_0x220662);_0x220662[_0x7c97('0x40')](_0x220662[_0x7c97('0x1d')]('ul'))['each'](function(){var _0x431e62=_0x104bae(this);_0x431e62[_0x7c97('0x12')](_0x7c97('0x41')+_0x431e62[_0x7c97('0x35')]('li')['length']+_0x7c97('0x42'));});});_0x9c31fe(_0x1a286);_0x239d1c[_0x7c97('0x43')][_0x7c97('0x2f')](this);_0x104bae(window)['trigger']('QuatroDigital.am.callback',_0x8148eb);};_0x104bae['fn']['QD_amazingMenu']=function(_0x2c9a66){var _0x465c34=_0x104bae(this);if(!_0x465c34[_0x7c97('0x20')])return _0x465c34;_0x239d1c=_0x104bae[_0x7c97('0x44')]({},_0x16c6ab,_0x2c9a66);_0x465c34[_0x7c97('0x45')]=new _0x104bae[(_0x7c97('0x3'))](_0x104bae(this));return _0x465c34;};_0x104bae(function(){_0x104bae(_0x7c97('0x46'))[_0x7c97('0x3')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x4044=['updateOnlyHover','allowUpdate','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','each','call','clone','add','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','shipping','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','shippingData','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','renderProductsList','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','productCategoryIds','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','attr','content','.qd-ddc-quantity','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','lastSku','filter','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','insertProdImg','forceImageHTTPS','string','http','qd-loaded','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','actionButtons','data-sku-index','changeQantity','data-sku','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','remove','formatCepField','$1-$2$3','shippingCalculate','data','calculateShipping','BRA','done','.qd-dd-cep-slas','logisticsInfo','slas','shippingEstimate','\x20dia\x20útil','append','price','</td><td>',',\x20entrega\x20em\x20','</td>','insertBefore','.qd-ddc-cep-tooltip-text','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','quantity','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','smartCheckout','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart','allowRecalculate','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','input.qd-productId[value=','getParent','.qd-bap-wrapper','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','qd-bap-item-added','productId','prod_','prodId','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','QD_smartCart','selector','dropDown','buyButton','QD_buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','abs','undefined','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','function','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','info','warn','object','unshift','alerta','aviso','toLowerCase','apply','_QuatroDigital_DropDown','QD_dropDownCart','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','name','extend','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','cartContainer','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','.qd_ddc_continueShopping','html','.qd-ddc-checkout','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','removeClass','body','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyCode','.qd-ddc-shipping\x20.qd-ddc-cep-ok','.qd-ddc-cep-btn','click','preventDefault','toggle','.qd-ddc-cep-close','click._QD_DDC_closeShipping','.qd-ddc-cep-tooltip','hide','.qd-ddc-cep-ok','.qd-ddc-cep'];(function(_0x1f2d56,_0x4fc343){var _0x49026e=function(_0x454d0d){while(--_0x454d0d){_0x1f2d56['push'](_0x1f2d56['shift']());}};_0x49026e(++_0x4fc343);}(_0x4044,0xa3));var _0x4404=function(_0x147c2b,_0x28c10e){_0x147c2b=_0x147c2b-0x0;var _0x2dc36f=_0x4044[_0x147c2b];return _0x2dc36f;};(function(_0x40c1aa){_0x40c1aa['fn']['getParent']=_0x40c1aa['fn'][_0x4404('0x0')];}(jQuery));function qd_number_format(_0x1a6b87,_0x5b254c,_0x1e7658,_0x2cfc44){_0x1a6b87=(_0x1a6b87+'')[_0x4404('0x1')](/[^0-9+\-Ee.]/g,'');_0x1a6b87=isFinite(+_0x1a6b87)?+_0x1a6b87:0x0;_0x5b254c=isFinite(+_0x5b254c)?Math[_0x4404('0x2')](_0x5b254c):0x0;_0x2cfc44=_0x4404('0x3')===typeof _0x2cfc44?',':_0x2cfc44;_0x1e7658=_0x4404('0x3')===typeof _0x1e7658?'.':_0x1e7658;var _0x4f9ef3='',_0x4f9ef3=function(_0x559b60,_0x18537c){var _0x5b254c=Math['pow'](0xa,_0x18537c);return''+(Math[_0x4404('0x4')](_0x559b60*_0x5b254c)/_0x5b254c)[_0x4404('0x5')](_0x18537c);},_0x4f9ef3=(_0x5b254c?_0x4f9ef3(_0x1a6b87,_0x5b254c):''+Math[_0x4404('0x4')](_0x1a6b87))[_0x4404('0x6')]('.');0x3<_0x4f9ef3[0x0][_0x4404('0x7')]&&(_0x4f9ef3[0x0]=_0x4f9ef3[0x0][_0x4404('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x2cfc44));(_0x4f9ef3[0x1]||'')[_0x4404('0x7')]<_0x5b254c&&(_0x4f9ef3[0x1]=_0x4f9ef3[0x1]||'',_0x4f9ef3[0x1]+=Array(_0x5b254c-_0x4f9ef3[0x1][_0x4404('0x7')]+0x1)['join']('0'));return _0x4f9ef3[_0x4404('0x8')](_0x1e7658);};(function(){'use strict';try{window[_0x4404('0x9')]=window[_0x4404('0x9')]||{};window['_QuatroDigital_CartData']['callback']=window[_0x4404('0x9')][_0x4404('0xa')]||$[_0x4404('0xb')]();}catch(_0x5d9245){if(typeof console!==_0x4404('0x3')&&typeof console[_0x4404('0xc')]===_0x4404('0xd'))console[_0x4404('0xc')](_0x4404('0xe'),_0x5d9245[_0x4404('0xf')]);}}());(function(_0x1d85d9){'use strict';try{var _0x1b7880=jQuery;var _0x5db965=_0x4404('0x10');var _0x20f70c=function(_0x4f99d5,_0x47c9ba){if('object'===typeof console&&_0x4404('0x3')!==typeof console[_0x4404('0xc')]&&'undefined'!==typeof console[_0x4404('0x11')]&&_0x4404('0x3')!==typeof console[_0x4404('0x12')]){var _0x24dc12;_0x4404('0x13')===typeof _0x4f99d5?(_0x4f99d5[_0x4404('0x14')]('['+_0x5db965+']\x0a'),_0x24dc12=_0x4f99d5):_0x24dc12=['['+_0x5db965+']\x0a'+_0x4f99d5];if(_0x4404('0x3')===typeof _0x47c9ba||_0x4404('0x15')!==_0x47c9ba['toLowerCase']()&&_0x4404('0x16')!==_0x47c9ba[_0x4404('0x17')]())if(_0x4404('0x3')!==typeof _0x47c9ba&&_0x4404('0x11')===_0x47c9ba[_0x4404('0x17')]())try{console[_0x4404('0x11')][_0x4404('0x18')](console,_0x24dc12);}catch(_0x5448b2){try{console['info'](_0x24dc12['join']('\x0a'));}catch(_0x455310){}}else try{console[_0x4404('0xc')][_0x4404('0x18')](console,_0x24dc12);}catch(_0x142bcc){try{console[_0x4404('0xc')](_0x24dc12['join']('\x0a'));}catch(_0x36106f){}}else try{console[_0x4404('0x12')][_0x4404('0x18')](console,_0x24dc12);}catch(_0x87d695){try{console[_0x4404('0x12')](_0x24dc12['join']('\x0a'));}catch(_0x57309b){}}}};window[_0x4404('0x19')]=window[_0x4404('0x19')]||{};window[_0x4404('0x19')]['allowUpdate']=!![];_0x1b7880[_0x4404('0x1a')]=function(){};_0x1b7880['fn']['QD_dropDownCart']=function(){return{'fn':new _0x1b7880()};};var _0x2678b2=function(_0x43ed72){var _0x32f823={'y':'bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x25785b){var _0x354e66,_0x4c9ac6,_0xda7c59,_0x5bbdc2;_0x4c9ac6=function(_0x16b686){return _0x16b686;};_0xda7c59=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x25785b=_0x25785b['d'+_0xda7c59[0x10]+'c'+_0xda7c59[0x11]+'m'+_0x4c9ac6(_0xda7c59[0x1])+'n'+_0xda7c59[0xd]]['l'+_0xda7c59[0x12]+'c'+_0xda7c59[0x0]+'ti'+_0x4c9ac6('o')+'n'];_0x354e66=function(_0x46e051){return escape(encodeURIComponent(_0x46e051[_0x4404('0x1')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0xfda820){return String['fromCharCode'](('Z'>=_0xfda820?0x5a:0x7a)>=(_0xfda820=_0xfda820['charCodeAt'](0x0)+0xd)?_0xfda820:_0xfda820-0x1a);})));};var _0x323908=_0x354e66(_0x25785b[[_0xda7c59[0x9],_0x4c9ac6('o'),_0xda7c59[0xc],_0xda7c59[_0x4c9ac6(0xd)]][_0x4404('0x8')]('')]);_0x354e66=_0x354e66((window[['js',_0x4c9ac6('no'),'m',_0xda7c59[0x1],_0xda7c59[0x4][_0x4404('0x1b')](),'ite'][_0x4404('0x8')]('')]||_0x4404('0x1c'))+['.v',_0xda7c59[0xd],'e',_0x4c9ac6('x'),'co',_0x4c9ac6('mm'),_0x4404('0x1d'),_0xda7c59[0x1],'.c',_0x4c9ac6('o'),'m.',_0xda7c59[0x13],'r']['join'](''));for(var _0x2f9d1f in _0x32f823){if(_0x354e66===_0x2f9d1f+_0x32f823[_0x2f9d1f]||_0x323908===_0x2f9d1f+_0x32f823[_0x2f9d1f]){_0x5bbdc2='tr'+_0xda7c59[0x11]+'e';break;}_0x5bbdc2='f'+_0xda7c59[0x0]+'ls'+_0x4c9ac6(_0xda7c59[0x1])+'';}_0x4c9ac6=!0x1;-0x1<_0x25785b[[_0xda7c59[0xc],'e',_0xda7c59[0x0],'rc',_0xda7c59[0x9]][_0x4404('0x8')]('')][_0x4404('0x1e')](_0x4404('0x1f'))&&(_0x4c9ac6=!0x0);return[_0x5bbdc2,_0x4c9ac6];}(_0x43ed72);}(window);if(!eval(_0x2678b2[0x0]))return _0x2678b2[0x1]?_0x20f70c('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x1b7880[_0x4404('0x1a')]=function(_0x53aeaa,_0x532ed1){var _0x50c0a2,_0x1c0fa5,_0x16b198,_0x8ccb55,_0x2ee2f9,_0x52e78c,_0x537551,_0x32176c,_0x26f221,_0x44694a,_0x1c128d,_0x5057f5;_0x1c128d=_0x1b7880(_0x53aeaa);if(!_0x1c128d[_0x4404('0x7')])return _0x1c128d;_0x50c0a2={'updateOnlyHover':!![],'texts':{'linkCart':_0x4404('0x20'),'linkCheckout':_0x4404('0x21'),'cartTotal':_0x4404('0x22'),'emptyCart':_0x4404('0x23'),'continueShopping':_0x4404('0x24'),'shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x553e06){return _0x553e06[_0x4404('0x25')]||_0x553e06[_0x4404('0x26')];},'callback':function(){},'callbackProductsList':function(){}};_0x1c0fa5=_0x1b7880[_0x4404('0x27')](!![],{},_0x50c0a2,_0x532ed1);_0x16b198=_0x1b7880('');_0x44694a=this;if(_0x1c0fa5['smartCheckout']){var _0x5c7095=![];if(typeof window[_0x4404('0x28')]===_0x4404('0x3')){_0x20f70c(_0x4404('0x29'));_0x1b7880[_0x4404('0x2a')]({'url':_0x4404('0x2b'),'async':![],'dataType':_0x4404('0x2c'),'error':function(){_0x20f70c(_0x4404('0x2d'));_0x5c7095=!![];}});}if(_0x5c7095)return _0x20f70c(_0x4404('0x2e'));}var _0x3015b8;if(typeof window[_0x4404('0x28')]==='object'&&typeof window[_0x4404('0x28')]['checkout']!==_0x4404('0x3'))_0x3015b8=window['vtexjs'][_0x4404('0x2f')];else if(typeof vtex==='object'&&typeof vtex[_0x4404('0x2f')]===_0x4404('0x13')&&typeof vtex['checkout'][_0x4404('0x30')]!==_0x4404('0x3'))_0x3015b8=new vtex['checkout']['SDK']();else return _0x20f70c('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x44694a[_0x4404('0x31')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>'+_0x4404('0x32')+_0x4404('0x33')+_0x4404('0x34')+_0x4404('0x35')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>'+_0x4404('0x36')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>'+_0x4404('0x37')+'<div\x20class=\x22qd-ddc-infoTotal\x22></div>'+_0x4404('0x38')+'<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>'+'</div></div></div></div></div>';_0x52e78c=function(_0x2deca8){var _0x17fe10=_0x1b7880(_0x2deca8);_0x1c0fa5[_0x4404('0x39')][_0x4404('0x3a')]=_0x1c0fa5['texts']['cartTotal']['replace'](_0x4404('0x3b'),_0x4404('0x3c'));_0x1c0fa5['texts'][_0x4404('0x3a')]=_0x1c0fa5['texts'][_0x4404('0x3a')][_0x4404('0x1')]('#items',_0x4404('0x3d'));_0x1c0fa5[_0x4404('0x39')][_0x4404('0x3a')]=_0x1c0fa5['texts'][_0x4404('0x3a')][_0x4404('0x1')](_0x4404('0x3e'),_0x4404('0x3f'));_0x1c0fa5[_0x4404('0x39')][_0x4404('0x3a')]=_0x1c0fa5['texts']['cartTotal'][_0x4404('0x1')]('#total',_0x4404('0x40'));_0x17fe10[_0x4404('0x41')](_0x4404('0x42'))['html'](_0x1c0fa5[_0x4404('0x39')]['linkCart']);_0x17fe10[_0x4404('0x41')](_0x4404('0x43'))[_0x4404('0x44')](_0x1c0fa5[_0x4404('0x39')]['continueShopping']);_0x17fe10[_0x4404('0x41')](_0x4404('0x45'))['html'](_0x1c0fa5[_0x4404('0x39')]['linkCheckout']);_0x17fe10[_0x4404('0x41')]('.qd-ddc-infoTotal')[_0x4404('0x44')](_0x1c0fa5[_0x4404('0x39')]['cartTotal']);_0x17fe10[_0x4404('0x41')](_0x4404('0x46'))[_0x4404('0x44')](_0x1c0fa5[_0x4404('0x39')][_0x4404('0x47')]);_0x17fe10['find'](_0x4404('0x48'))['html'](_0x1c0fa5[_0x4404('0x39')][_0x4404('0x49')]);return _0x17fe10;};_0x2ee2f9=function(_0x4f78c5){_0x1b7880(this)['append'](_0x4f78c5);_0x4f78c5[_0x4404('0x41')](_0x4404('0x4a'))['add'](_0x1b7880(_0x4404('0x4b')))['on']('click.qd_ddc_closeFn',function(){_0x1c128d['removeClass'](_0x4404('0x4c'));_0x1b7880(document['body'])['removeClass'](_0x4404('0x4d'));});_0x1b7880(document)[_0x4404('0x4e')](_0x4404('0x4f'))['on'](_0x4404('0x4f'),function(_0xfe4982){if(_0xfe4982['keyCode']==0x1b){_0x1c128d[_0x4404('0x50')](_0x4404('0x4c'));_0x1b7880(document[_0x4404('0x51')])[_0x4404('0x50')](_0x4404('0x4d'));}});var _0x86b553=_0x4f78c5[_0x4404('0x41')](_0x4404('0x52'));_0x4f78c5['find'](_0x4404('0x53'))['on'](_0x4404('0x54'),function(){_0x44694a[_0x4404('0x55')]('-',undefined,undefined,_0x86b553);return![];});_0x4f78c5['find'](_0x4404('0x56'))['on'](_0x4404('0x57'),function(){_0x44694a[_0x4404('0x55')](undefined,undefined,undefined,_0x86b553);return![];});var _0x29b6be=_0x4f78c5[_0x4404('0x41')](_0x4404('0x58'));_0x4f78c5[_0x4404('0x41')](_0x4404('0x59'))[_0x4404('0x5a')]('')['on']('keyup.qd_ddc_cep',function(_0x2902f7){_0x44694a['formatCepField'](_0x1b7880(this));if(_0x2902f7[_0x4404('0x5b')]==0xd)_0x4f78c5[_0x4404('0x41')](_0x4404('0x5c'))['click']();});_0x4f78c5[_0x4404('0x41')](_0x4404('0x5d'))[_0x4404('0x5e')](function(_0x1956f7){_0x1956f7[_0x4404('0x5f')]();_0x29b6be[_0x4404('0x60')]();});_0x4f78c5[_0x4404('0x41')](_0x4404('0x61'))[_0x4404('0x5e')](function(_0x586f20){_0x586f20['preventDefault']();_0x29b6be['hide']();});_0x1b7880(document)[_0x4404('0x4e')](_0x4404('0x62'))['on'](_0x4404('0x62'),function(_0x6513d5){if(_0x1b7880(_0x6513d5['target'])[_0x4404('0x0')](_0x4f78c5[_0x4404('0x41')](_0x4404('0x63')))['length'])return;_0x29b6be[_0x4404('0x64')]();});_0x4f78c5['find'](_0x4404('0x65'))['click'](function(_0x1a8180){_0x1a8180[_0x4404('0x5f')]();_0x44694a['shippingCalculate'](_0x4f78c5[_0x4404('0x41')](_0x4404('0x66')));});if(_0x1c0fa5[_0x4404('0x67')]){var _0x2e1b1d=0x0;_0x1b7880(this)['on']('mouseenter.qd_ddc_hover',function(){var _0xbcda0f=function(){if(!window[_0x4404('0x19')][_0x4404('0x68')])return;_0x44694a[_0x4404('0x69')]();window['_QuatroDigital_DropDown'][_0x4404('0x68')]=![];_0x1b7880['fn'][_0x4404('0x6a')](!![]);_0x44694a[_0x4404('0x6b')]();};_0x2e1b1d=setInterval(function(){_0xbcda0f();},0x258);_0xbcda0f();});_0x1b7880(this)['on'](_0x4404('0x6c'),function(){clearInterval(_0x2e1b1d);});}};_0x537551=_0x52e78c(this[_0x4404('0x31')]);_0x32176c=0x0;_0x1c128d[_0x4404('0x6d')](function(){if(_0x32176c>0x0)_0x2ee2f9[_0x4404('0x6e')](this,_0x537551[_0x4404('0x6f')]());else _0x2ee2f9['call'](this,_0x537551);_0x32176c++;});window[_0x4404('0x9')][_0x4404('0xa')][_0x4404('0x70')](function(){_0x1b7880(_0x4404('0x71'))[_0x4404('0x44')](window['_QuatroDigital_CartData'][_0x4404('0x72')]||'--');_0x1b7880(_0x4404('0x73'))[_0x4404('0x44')](window[_0x4404('0x9')][_0x4404('0x74')]||'0');_0x1b7880(_0x4404('0x75'))[_0x4404('0x44')](window[_0x4404('0x9')][_0x4404('0x76')]||'--');_0x1b7880('.qd-ddc-infoAllTotal')[_0x4404('0x44')](window['_QuatroDigital_CartData'][_0x4404('0x77')]||'--');});_0x26f221=function(_0x50a2ba){_0x20f70c('Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado');};_0x5057f5=function(_0x2fdc38,_0x4dd1b9){if(typeof _0x2fdc38[_0x4404('0x78')]===_0x4404('0x3'))return _0x20f70c(_0x4404('0x79'));_0x44694a['renderProductsList'][_0x4404('0x6e')](this,_0x4dd1b9);};_0x44694a['getCartInfoByUrl']=function(_0x1c0f90,_0x387a4b){var _0x4de13d;if(typeof _0x387a4b!=_0x4404('0x3'))window[_0x4404('0x19')][_0x4404('0x7a')]=_0x387a4b;else if(window[_0x4404('0x19')]['dataOptionsCache'])_0x387a4b=window[_0x4404('0x19')]['dataOptionsCache'];setTimeout(function(){window['_QuatroDigital_DropDown'][_0x4404('0x7a')]=undefined;},_0x1c0fa5['timeRemoveNewItemClass']);_0x1b7880(_0x4404('0x7b'))['removeClass'](_0x4404('0x7c'));if(_0x1c0fa5['smartCheckout']){_0x4de13d=function(_0x3031e7){window['_QuatroDigital_DropDown'][_0x4404('0x7d')]=_0x3031e7;_0x5057f5(_0x3031e7,_0x387a4b);if(typeof window[_0x4404('0x7e')]!=='undefined'&&typeof window[_0x4404('0x7e')][_0x4404('0x7f')]==='function')window[_0x4404('0x7e')]['exec'][_0x4404('0x6e')](this);_0x1b7880('.qd-ddc-wrapper')[_0x4404('0x80')](_0x4404('0x7c'));};if(typeof window[_0x4404('0x19')][_0x4404('0x7d')]!==_0x4404('0x3')){_0x4de13d(window['_QuatroDigital_DropDown'][_0x4404('0x7d')]);if(typeof _0x1c0f90===_0x4404('0xd'))_0x1c0f90(window['_QuatroDigital_DropDown'][_0x4404('0x7d')]);return;}_0x1b7880[_0x4404('0x81')](['items',_0x4404('0x82'),_0x4404('0x83')],{'done':function(_0x3363d4){_0x4de13d[_0x4404('0x6e')](this,_0x3363d4);if(typeof _0x1c0f90==='function')_0x1c0f90(_0x3363d4);},'fail':function(_0x12b9b7){_0x20f70c(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x12b9b7]);}});}else{alert(_0x4404('0x84'));}};_0x44694a['cartIsEmpty']=function(){var _0x46f589=_0x1b7880('.qd-ddc-wrapper');if(_0x46f589[_0x4404('0x41')]('.qd-ddc-prodRow')[_0x4404('0x7')])_0x46f589[_0x4404('0x50')]('qd-ddc-noItems');else _0x46f589[_0x4404('0x80')](_0x4404('0x85'));};_0x44694a[_0x4404('0x86')]=function(_0x2f05c2){var _0x584cec=_0x1b7880(_0x4404('0x87'));var _0x62e017=_0x4404('0x88')+_0x4404('0x89')+'<div\x20class=\x22qd-ddc-prodImgWrapper\x22>'+_0x4404('0x8a')+'<span\x20class=\x22qd-ddc-imgLoading\x22></span>'+_0x4404('0x8b')+_0x4404('0x8b')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>'+_0x4404('0x8c')+_0x4404('0x8d')+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>'+_0x4404('0x8e')+_0x4404('0x8f')+_0x4404('0x90')+_0x4404('0x8b')+_0x4404('0x8b')+_0x4404('0x91')+'<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>'+_0x4404('0x92')+_0x4404('0x93')+_0x4404('0x8b')+'</div>'+_0x4404('0x8b');_0x584cec[_0x4404('0x94')]();_0x584cec[_0x4404('0x6d')](function(){var _0x274fce=_0x1b7880(this);var _0x4bd577,_0x4592f1,_0x199bca,_0x1953a6;var _0x3d9d88=_0x1b7880('');var _0x1fdc49;for(var _0x1a1fa7 in window['_QuatroDigital_DropDown'][_0x4404('0x7d')]['items']){if(typeof window[_0x4404('0x19')][_0x4404('0x7d')][_0x4404('0x78')][_0x1a1fa7]!==_0x4404('0x13'))continue;_0x199bca=window['_QuatroDigital_DropDown'][_0x4404('0x7d')]['items'][_0x1a1fa7];_0x1fdc49=_0x199bca[_0x4404('0x95')][_0x4404('0x1')](/^\/|\/$/g,'')[_0x4404('0x6')]('/');_0x4592f1=_0x1b7880(_0x62e017);_0x4592f1['attr']({'data-sku':_0x199bca['id'],'data-sku-index':_0x1a1fa7,'data-qd-departament':_0x1fdc49[0x0],'data-qd-category':_0x1fdc49[_0x1fdc49[_0x4404('0x7')]-0x1]});_0x4592f1[_0x4404('0x80')]('qd-ddc-'+_0x199bca[_0x4404('0x96')]);_0x4592f1[_0x4404('0x41')](_0x4404('0x97'))['append'](_0x1c0fa5[_0x4404('0x25')](_0x199bca));_0x4592f1[_0x4404('0x41')](_0x4404('0x98'))['append'](isNaN(_0x199bca['sellingPrice'])?_0x199bca[_0x4404('0x99')]:_0x199bca[_0x4404('0x99')]==0x0?_0x4404('0x9a'):(_0x1b7880(_0x4404('0x9b'))[_0x4404('0x9c')](_0x4404('0x9d'))||'R$')+'\x20'+qd_number_format(_0x199bca[_0x4404('0x99')]/0x64,0x2,',','.'));_0x4592f1[_0x4404('0x41')](_0x4404('0x9e'))[_0x4404('0x9c')]({'data-sku':_0x199bca['id'],'data-sku-index':_0x1a1fa7})[_0x4404('0x5a')](_0x199bca['quantity']);_0x4592f1[_0x4404('0x41')]('.qd-ddc-remove')[_0x4404('0x9c')]({'data-sku':_0x199bca['id'],'data-sku-index':_0x1a1fa7});_0x44694a['insertProdImg'](_0x199bca['id'],_0x4592f1[_0x4404('0x41')](_0x4404('0x9f')),_0x199bca['imageUrl']);_0x4592f1[_0x4404('0x41')](_0x4404('0xa0'))['attr']({'data-sku':_0x199bca['id'],'data-sku-index':_0x1a1fa7});_0x4592f1[_0x4404('0xa1')](_0x274fce);_0x3d9d88=_0x3d9d88[_0x4404('0x70')](_0x4592f1);}try{var _0x507bab=_0x274fce['getParent'](_0x4404('0x7b'))['find'](_0x4404('0xa2'));if(_0x507bab[_0x4404('0x7')]&&_0x507bab[_0x4404('0x5a')]()==''&&window[_0x4404('0x19')]['getOrderForm'][_0x4404('0x83')]['address'])_0x507bab[_0x4404('0x5a')](window[_0x4404('0x19')][_0x4404('0x7d')][_0x4404('0x83')][_0x4404('0xa3')][_0x4404('0xa4')]);}catch(_0x2c737b){_0x20f70c(_0x4404('0xa5')+_0x2c737b['message'],'aviso');}_0x44694a['actionButtons'](_0x274fce);_0x44694a[_0x4404('0x6b')]();if(_0x2f05c2&&_0x2f05c2[_0x4404('0xa6')]){(function(){_0x1953a6=_0x3d9d88[_0x4404('0xa7')]('[data-sku=\x27'+_0x2f05c2['lastSku']+'\x27]');if(!_0x1953a6[_0x4404('0x7')])return;_0x4bd577=0x0;_0x3d9d88[_0x4404('0x6d')](function(){var _0xe759ea=_0x1b7880(this);if(_0xe759ea['is'](_0x1953a6))return![];_0x4bd577+=_0xe759ea[_0x4404('0xa8')]();});_0x44694a[_0x4404('0x55')](undefined,undefined,_0x4bd577,_0x274fce[_0x4404('0x70')](_0x274fce[_0x4404('0xa9')]()));_0x3d9d88[_0x4404('0x50')](_0x4404('0xaa'));(function(_0x180ba0){_0x180ba0['addClass'](_0x4404('0xab'));_0x180ba0['addClass'](_0x4404('0xaa'));setTimeout(function(){_0x180ba0['removeClass'](_0x4404('0xab'));},_0x1c0fa5[_0x4404('0xac')]);}(_0x1953a6));_0x1b7880(document[_0x4404('0x51')])[_0x4404('0x80')]('qd-ddc-product-add-time-v2');setTimeout(function(){_0x1b7880(document[_0x4404('0x51')])[_0x4404('0x50')](_0x4404('0xad'));},_0x1c0fa5[_0x4404('0xac')]);}());}});(function(){if(_QuatroDigital_DropDown[_0x4404('0x7d')]['items'][_0x4404('0x7')]){_0x1b7880(_0x4404('0x51'))[_0x4404('0x50')](_0x4404('0xae'))['addClass'](_0x4404('0xaf'));setTimeout(function(){_0x1b7880(_0x4404('0x51'))[_0x4404('0x50')](_0x4404('0xb0'));},_0x1c0fa5['timeRemoveNewItemClass']);}else _0x1b7880(_0x4404('0x51'))['removeClass'](_0x4404('0xb1'))[_0x4404('0x80')](_0x4404('0xae'));}());if(typeof _0x1c0fa5[_0x4404('0xb2')]==='function')_0x1c0fa5[_0x4404('0xb2')][_0x4404('0x6e')](this);else _0x20f70c('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x44694a[_0x4404('0xb3')]=function(_0x9ff0c8,_0x57bbf1,_0x5e03ef){var _0x490423=!![];function _0x1269b7(){if(_0x1c0fa5[_0x4404('0xb4')]&&typeof _0x5e03ef==_0x4404('0xb5'))_0x5e03ef=_0x5e03ef['replace'](_0x4404('0xb6'),'https');_0x57bbf1[_0x4404('0x50')](_0x4404('0xb7'))['load'](function(){_0x1b7880(this)[_0x4404('0x80')](_0x4404('0xb7'));})[_0x4404('0x9c')]('src',_0x5e03ef);};if(_0x5e03ef)_0x1269b7();else if(!isNaN(_0x9ff0c8)){alert(_0x4404('0xb8'));}else _0x20f70c(_0x4404('0xb9'),_0x4404('0x15'));};_0x44694a[_0x4404('0xba')]=function(_0x29197c){var _0x51551a,_0x37c85e,_0x506298,_0x470543;_0x51551a=function(_0x5de77e,_0x46c324){var _0x2f8c36,_0x327dd4,_0x39760f,_0x431b79,_0x1370d2;_0x39760f=_0x1b7880(_0x5de77e);_0x2f8c36=_0x39760f[_0x4404('0x9c')]('data-sku');_0x1370d2=_0x39760f['attr'](_0x4404('0xbb'));if(!_0x2f8c36)return;_0x327dd4=parseInt(_0x39760f['val']())||0x1;_0x44694a[_0x4404('0xbc')]([_0x2f8c36,_0x1370d2],_0x327dd4,_0x327dd4+0x1,function(_0x4d55f9){_0x39760f['val'](_0x4d55f9);if(typeof _0x46c324===_0x4404('0xd'))_0x46c324();});};_0x506298=function(_0x287193,_0x21d0dc){var _0x1b2884,_0x82652e,_0x43ffab,_0x38c638,_0x4da4b4;_0x43ffab=_0x1b7880(_0x287193);_0x1b2884=_0x43ffab[_0x4404('0x9c')](_0x4404('0xbd'));_0x4da4b4=_0x43ffab[_0x4404('0x9c')](_0x4404('0xbb'));if(!_0x1b2884)return;_0x82652e=parseInt(_0x43ffab[_0x4404('0x5a')]())||0x2;_0x38c638=_0x44694a[_0x4404('0xbc')]([_0x1b2884,_0x4da4b4],_0x82652e,_0x82652e-0x1,function(_0xce23ab){_0x43ffab['val'](_0xce23ab);if(typeof _0x21d0dc===_0x4404('0xd'))_0x21d0dc();});};_0x470543=function(_0x4079c8,_0x309cbe){var _0x56aa65,_0xe00c44,_0x17d578,_0x5a11f1,_0x1ab612;_0x17d578=_0x1b7880(_0x4079c8);_0x56aa65=_0x17d578[_0x4404('0x9c')](_0x4404('0xbd'));_0x1ab612=_0x17d578['attr'](_0x4404('0xbb'));if(!_0x56aa65)return;_0xe00c44=parseInt(_0x17d578[_0x4404('0x5a')]())||0x1;_0x5a11f1=_0x44694a[_0x4404('0xbc')]([_0x56aa65,_0x1ab612],0x1,_0xe00c44,function(_0x585839){_0x17d578[_0x4404('0x5a')](_0x585839);if(typeof _0x309cbe==='function')_0x309cbe();});};_0x37c85e=_0x29197c[_0x4404('0x41')](_0x4404('0xbe'));_0x37c85e[_0x4404('0x80')](_0x4404('0xbf'))[_0x4404('0x6d')](function(){var _0xeb8c1f=_0x1b7880(this);_0xeb8c1f[_0x4404('0x41')]('.qd-ddc-quantityMore')['on'](_0x4404('0xc0'),function(_0x4e012c){_0x4e012c[_0x4404('0x5f')]();_0x37c85e[_0x4404('0x80')](_0x4404('0xc1'));_0x51551a(_0xeb8c1f['find'](_0x4404('0x9e')),function(){_0x37c85e[_0x4404('0x50')]('qd-loading');});});_0xeb8c1f[_0x4404('0x41')](_0x4404('0xc2'))['on'](_0x4404('0xc3'),function(_0xc7898f){_0xc7898f[_0x4404('0x5f')]();_0x37c85e[_0x4404('0x80')](_0x4404('0xc1'));_0x506298(_0xeb8c1f[_0x4404('0x41')](_0x4404('0x9e')),function(){_0x37c85e[_0x4404('0x50')](_0x4404('0xc1'));});});_0xeb8c1f[_0x4404('0x41')](_0x4404('0x9e'))['on'](_0x4404('0xc4'),function(){_0x37c85e[_0x4404('0x80')]('qd-loading');_0x470543(this,function(){_0x37c85e[_0x4404('0x50')](_0x4404('0xc1'));});});_0xeb8c1f[_0x4404('0x41')](_0x4404('0x9e'))['on'](_0x4404('0xc5'),function(_0x58dd8c){if(_0x58dd8c['keyCode']!=0xd)return;_0x37c85e[_0x4404('0x80')]('qd-loading');_0x470543(this,function(){_0x37c85e[_0x4404('0x50')](_0x4404('0xc1'));});});});_0x29197c[_0x4404('0x41')](_0x4404('0xc6'))[_0x4404('0x6d')](function(){var _0x43554b=_0x1b7880(this);_0x43554b[_0x4404('0x41')](_0x4404('0xc7'))['on'](_0x4404('0xc8'),function(){var _0x3cc289;_0x43554b[_0x4404('0x80')](_0x4404('0xc1'));_0x44694a[_0x4404('0xc9')](_0x1b7880(this),function(_0x10669b){if(_0x10669b)_0x43554b[_0x4404('0xca')](!![])['slideUp'](function(){_0x43554b[_0x4404('0xcb')]();_0x44694a['cartIsEmpty']();});else _0x43554b['removeClass'](_0x4404('0xc1'));});return![];});});};_0x44694a[_0x4404('0xcc')]=function(_0x3c82d8){var _0x521210=_0x3c82d8[_0x4404('0x5a')]();_0x521210=_0x521210[_0x4404('0x1')](/[^0-9\-]/g,'');_0x521210=_0x521210[_0x4404('0x1')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x4404('0xcd'));_0x521210=_0x521210[_0x4404('0x1')](/(.{9}).*/g,'$1');_0x3c82d8[_0x4404('0x5a')](_0x521210);};_0x44694a[_0x4404('0xce')]=function(_0xf24316){var _0x25604a=_0xf24316['val']();if(_0x25604a[_0x4404('0x7')]>=0x9){if(_0xf24316[_0x4404('0xcf')]('qdDdcLastPostalCode')!=_0x25604a){_0x3015b8[_0x4404('0xd0')]({'postalCode':_0x25604a,'country':_0x4404('0xd1')})[_0x4404('0xd2')](function(_0x36cb63){_0xf24316[_0x4404('0x0')]('.qd-ddc-cep-tooltip-text')[_0x4404('0x41')](_0x4404('0xd3'))['remove']();window[_0x4404('0x19')][_0x4404('0x7d')]=_0x36cb63;_0x44694a[_0x4404('0x69')]();var _0x503dd1=_0x36cb63[_0x4404('0x83')][_0x4404('0xd4')][0x0][_0x4404('0xd5')];var _0x55de0d=_0x1b7880('<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>');for(var _0x2e0ba9=0x0;_0x2e0ba9<_0x503dd1['length'];_0x2e0ba9++){var _0x1973dc=_0x503dd1[_0x2e0ba9];var _0x2457da=_0x1973dc[_0x4404('0xd6')]>0x1?_0x1973dc['shippingEstimate'][_0x4404('0x1')]('bd',_0x4404('0xd7')):_0x1973dc[_0x4404('0xd6')][_0x4404('0x1')]('bd','\x20dias\x20útéis');var _0x4c439c=_0x1b7880('<tr></tr>');_0x4c439c[_0x4404('0xd8')]('<td>\x20R$\x20'+qd_number_format(_0x1973dc[_0x4404('0xd9')]/0x64,0x2,',','.')+_0x4404('0xda')+_0x1973dc[_0x4404('0x26')]+_0x4404('0xdb')+_0x2457da+'\x20para\x20o\x20CEP\x20'+_0x25604a+_0x4404('0xdc'));_0x4c439c['appendTo'](_0x55de0d[_0x4404('0x41')]('tbody'));}_0x55de0d[_0x4404('0xdd')](_0xf24316[_0x4404('0x0')](_0x4404('0xde'))[_0x4404('0x41')](_0x4404('0x61')));})[_0x4404('0xdf')](function(_0x3f033a){_0x20f70c([_0x4404('0xe0'),_0x3f033a]);updateCartData();});}_0xf24316['data']('qdDdcLastPostalCode',_0x25604a);}};_0x44694a[_0x4404('0xbc')]=function(_0x58e97f,_0x3d8a26,_0x1f717e,_0x1d321d){var _0x332ef3=_0x1f717e||0x1;if(_0x332ef3<0x1)return _0x3d8a26;if(_0x1c0fa5['smartCheckout']){if(typeof window[_0x4404('0x19')][_0x4404('0x7d')][_0x4404('0x78')][_0x58e97f[0x1]]===_0x4404('0x3')){_0x20f70c(_0x4404('0xe1')+_0x58e97f[0x1]+']');return _0x3d8a26;}window['_QuatroDigital_DropDown'][_0x4404('0x7d')]['items'][_0x58e97f[0x1]][_0x4404('0xe2')]=_0x332ef3;window[_0x4404('0x19')][_0x4404('0x7d')][_0x4404('0x78')][_0x58e97f[0x1]]['index']=_0x58e97f[0x1];_0x3015b8[_0x4404('0xe3')]([window[_0x4404('0x19')]['getOrderForm'][_0x4404('0x78')][_0x58e97f[0x1]]],['items',_0x4404('0x82'),_0x4404('0x83')])['done'](function(_0x3e2df0){window[_0x4404('0x19')][_0x4404('0x7d')]=_0x3e2df0;_0x66a62c(!![]);})[_0x4404('0xdf')](function(_0x2b9ea5){_0x20f70c([_0x4404('0xe4'),_0x2b9ea5]);_0x66a62c();});}else{_0x20f70c(_0x4404('0xe5'));}function _0x66a62c(_0x3aa08c){_0x3aa08c=typeof _0x3aa08c!==_0x4404('0xe6')?![]:_0x3aa08c;_0x44694a[_0x4404('0x69')]();window['_QuatroDigital_DropDown'][_0x4404('0x68')]=![];_0x44694a['cartIsEmpty']();if(typeof window[_0x4404('0x7e')]!=='undefined'&&typeof window[_0x4404('0x7e')]['exec']===_0x4404('0xd'))window[_0x4404('0x7e')]['exec'][_0x4404('0x6e')](this);if(typeof adminCart===_0x4404('0xd'))adminCart();_0x1b7880['fn'][_0x4404('0x6a')](!![],undefined,_0x3aa08c);if(typeof _0x1d321d===_0x4404('0xd'))_0x1d321d(_0x3d8a26);};};_0x44694a[_0x4404('0xc9')]=function(_0x3ae182,_0x525359){var _0x11d3e1=![];var _0x2aed30=_0x1b7880(_0x3ae182);var _0x19974d=_0x2aed30[_0x4404('0x9c')](_0x4404('0xbb'));if(_0x1c0fa5[_0x4404('0xe7')]){if(typeof window['_QuatroDigital_DropDown'][_0x4404('0x7d')][_0x4404('0x78')][_0x19974d]===_0x4404('0x3')){_0x20f70c('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x19974d+']');return _0x11d3e1;}window[_0x4404('0x19')]['getOrderForm']['items'][_0x19974d][_0x4404('0xe8')]=_0x19974d;_0x3015b8[_0x4404('0xe9')]([window[_0x4404('0x19')][_0x4404('0x7d')][_0x4404('0x78')][_0x19974d]],[_0x4404('0x78'),_0x4404('0x82'),_0x4404('0x83')])[_0x4404('0xd2')](function(_0x2e00ed){_0x11d3e1=!![];window[_0x4404('0x19')][_0x4404('0x7d')]=_0x2e00ed;_0x5057f5(_0x2e00ed);_0x289c18(!![]);})[_0x4404('0xdf')](function(_0x30f0bf){_0x20f70c([_0x4404('0xea'),_0x30f0bf]);_0x289c18();});}else{alert(_0x4404('0xeb'));}function _0x289c18(_0x121b67){_0x121b67=typeof _0x121b67!=='boolean'?![]:_0x121b67;if(typeof window[_0x4404('0x7e')]!==_0x4404('0x3')&&typeof window['_QuatroDigital_AmountProduct']['exec']===_0x4404('0xd'))window['_QuatroDigital_AmountProduct']['exec'][_0x4404('0x6e')](this);if(typeof adminCart===_0x4404('0xd'))adminCart();_0x1b7880['fn'][_0x4404('0x6a')](!![],undefined,_0x121b67);if(typeof _0x525359==='function')_0x525359(_0x11d3e1);};};_0x44694a[_0x4404('0x55')]=function(_0x1098ee,_0x3991d1,_0x423ee4,_0xe5f832){var _0x2ffefb=_0xe5f832||_0x1b7880(_0x4404('0xec'));var _0x1cbc4b=_0x1098ee||'+';var _0x1628b8=_0x3991d1||_0x2ffefb['height']()*0.9;_0x2ffefb[_0x4404('0xca')](!![],!![])[_0x4404('0xed')]({'scrollTop':isNaN(_0x423ee4)?_0x1cbc4b+'='+_0x1628b8+'px':_0x423ee4});};if(!_0x1c0fa5[_0x4404('0x67')]){_0x44694a['getCartInfoByUrl']();_0x1b7880['fn']['simpleCart'](!![]);}_0x1b7880(window)['on'](_0x4404('0xee'),function(){try{window[_0x4404('0x19')][_0x4404('0x7d')]=undefined;_0x44694a[_0x4404('0x69')]();}catch(_0x4400a9){_0x20f70c(_0x4404('0xef')+_0x4400a9[_0x4404('0xf')],_0x4404('0xf0'));}});if(typeof _0x1c0fa5['callback']===_0x4404('0xd'))_0x1c0fa5[_0x4404('0xa')][_0x4404('0x6e')](this);else _0x20f70c(_0x4404('0xf1'));};_0x1b7880['fn'][_0x4404('0x1a')]=function(_0x3e3313){var _0x177e8a;_0x177e8a=_0x1b7880(this);_0x177e8a['fn']=new _0x1b7880['QD_dropDownCart'](this,_0x3e3313);return _0x177e8a;};}catch(_0x1a5c86){if(typeof console!==_0x4404('0x3')&&typeof console[_0x4404('0xc')]===_0x4404('0xd'))console[_0x4404('0xc')](_0x4404('0xe'),_0x1a5c86);}}(this));(function(_0x503501){'use strict';try{var _0x4cdf0a=jQuery;var _0x41e492=_0x4404('0xf2');var _0x1f2733=function(_0x4f2028,_0x27b579){if(_0x4404('0x13')===typeof console&&_0x4404('0x3')!==typeof console[_0x4404('0xc')]&&_0x4404('0x3')!==typeof console[_0x4404('0x11')]&&_0x4404('0x3')!==typeof console['warn']){var _0x4b5215;_0x4404('0x13')===typeof _0x4f2028?(_0x4f2028[_0x4404('0x14')]('['+_0x41e492+']\x0a'),_0x4b5215=_0x4f2028):_0x4b5215=['['+_0x41e492+']\x0a'+_0x4f2028];if('undefined'===typeof _0x27b579||'alerta'!==_0x27b579[_0x4404('0x17')]()&&_0x4404('0x16')!==_0x27b579[_0x4404('0x17')]())if(_0x4404('0x3')!==typeof _0x27b579&&_0x4404('0x11')===_0x27b579[_0x4404('0x17')]())try{console[_0x4404('0x11')]['apply'](console,_0x4b5215);}catch(_0x1c6e14){try{console[_0x4404('0x11')](_0x4b5215[_0x4404('0x8')]('\x0a'));}catch(_0x486fff){}}else try{console[_0x4404('0xc')][_0x4404('0x18')](console,_0x4b5215);}catch(_0x159075){try{console[_0x4404('0xc')](_0x4b5215[_0x4404('0x8')]('\x0a'));}catch(_0x5e0bf5){}}else try{console[_0x4404('0x12')][_0x4404('0x18')](console,_0x4b5215);}catch(_0x48faec){try{console[_0x4404('0x12')](_0x4b5215[_0x4404('0x8')]('\x0a'));}catch(_0x2509ea){}}}};window[_0x4404('0x7e')]=window[_0x4404('0x7e')]||{};window['_QuatroDigital_AmountProduct'][_0x4404('0x78')]={};window[_0x4404('0x7e')][_0x4404('0xf3')]=![];window[_0x4404('0x7e')]['buyButtonClicked']=![];window['_QuatroDigital_AmountProduct'][_0x4404('0xf4')]=![];var _0x1b9734=_0x4404('0xf5');var _0x278017=function(){var _0x249e01,_0x5e902f,_0x53f4a6,_0x1f827d;_0x1f827d=_0x42f13d();if(window[_0x4404('0x7e')]['allowRecalculate']){_0x4cdf0a('.qd-bap-wrapper')[_0x4404('0xcb')]();_0x4cdf0a('.qd-bap-item-added')[_0x4404('0x50')]('qd-bap-item-added');}for(var _0x8c2e05 in window[_0x4404('0x7e')]['items']){_0x249e01=window['_QuatroDigital_AmountProduct'][_0x4404('0x78')][_0x8c2e05];if(typeof _0x249e01!==_0x4404('0x13'))return;_0x53f4a6=_0x4cdf0a(_0x4404('0xf6')+_0x249e01['prodId']+']')[_0x4404('0xf7')]('li');if(!window['_QuatroDigital_AmountProduct'][_0x4404('0xf3')]&&_0x53f4a6['find'](_0x4404('0xf8'))[_0x4404('0x7')])continue;_0x5e902f=_0x4cdf0a(_0x1b9734);_0x5e902f[_0x4404('0x41')](_0x4404('0xf9'))['html'](_0x249e01[_0x4404('0x74')]);var _0x150009=_0x53f4a6[_0x4404('0x41')](_0x4404('0xfa'));if(_0x150009[_0x4404('0x7')])_0x150009[_0x4404('0xfb')](_0x5e902f)['addClass'](_0x4404('0xfc'));else _0x53f4a6[_0x4404('0xfb')](_0x5e902f);}if(_0x1f827d)window['_QuatroDigital_AmountProduct'][_0x4404('0xf3')]=![];};var _0x42f13d=function(){if(!window[_0x4404('0x7e')][_0x4404('0xf3')])return;var _0x32877a=![],_0x262948={};window['_QuatroDigital_AmountProduct'][_0x4404('0x78')]={};for(var _0x69a300 in window['_QuatroDigital_DropDown'][_0x4404('0x7d')][_0x4404('0x78')]){if(typeof window[_0x4404('0x19')][_0x4404('0x7d')][_0x4404('0x78')][_0x69a300]!==_0x4404('0x13'))continue;var _0x391138=window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x69a300];if(typeof _0x391138[_0x4404('0xfd')]===_0x4404('0x3')||_0x391138[_0x4404('0xfd')]===null||_0x391138[_0x4404('0xfd')]==='')continue;window[_0x4404('0x7e')][_0x4404('0x78')][_0x4404('0xfe')+_0x391138[_0x4404('0xfd')]]=window[_0x4404('0x7e')][_0x4404('0x78')]['prod_'+_0x391138['productId']]||{};window[_0x4404('0x7e')][_0x4404('0x78')][_0x4404('0xfe')+_0x391138['productId']][_0x4404('0xff')]=_0x391138['productId'];if(!_0x262948['prod_'+_0x391138[_0x4404('0xfd')]])window['_QuatroDigital_AmountProduct'][_0x4404('0x78')][_0x4404('0xfe')+_0x391138[_0x4404('0xfd')]][_0x4404('0x74')]=0x0;window['_QuatroDigital_AmountProduct'][_0x4404('0x78')][_0x4404('0xfe')+_0x391138[_0x4404('0xfd')]]['qtt']=window[_0x4404('0x7e')][_0x4404('0x78')][_0x4404('0xfe')+_0x391138[_0x4404('0xfd')]][_0x4404('0x74')]+_0x391138[_0x4404('0xe2')];_0x32877a=!![];_0x262948[_0x4404('0xfe')+_0x391138[_0x4404('0xfd')]]=!![];}return _0x32877a;};window[_0x4404('0x7e')][_0x4404('0x7f')]=function(){window[_0x4404('0x7e')]['allowRecalculate']=!![];_0x278017[_0x4404('0x6e')](this);};_0x4cdf0a(document)[_0x4404('0x100')](function(){_0x278017[_0x4404('0x6e')](this);});}catch(_0x427dd7){if(typeof console!==_0x4404('0x3')&&typeof console[_0x4404('0xc')]===_0x4404('0xd'))console[_0x4404('0xc')](_0x4404('0xe'),_0x427dd7);}}(this));(function(){'use strict';try{var _0x4c4c79=jQuery,_0x1c73cb;var _0xeb44e0=_0x4404('0x101');var _0x11981a=function(_0x253f12,_0x5dddaf){if(_0x4404('0x13')===typeof console&&_0x4404('0x3')!==typeof console[_0x4404('0xc')]&&_0x4404('0x3')!==typeof console[_0x4404('0x11')]&&_0x4404('0x3')!==typeof console['warn']){var _0xe2ed6c;_0x4404('0x13')===typeof _0x253f12?(_0x253f12[_0x4404('0x14')]('['+_0xeb44e0+']\x0a'),_0xe2ed6c=_0x253f12):_0xe2ed6c=['['+_0xeb44e0+']\x0a'+_0x253f12];if(_0x4404('0x3')===typeof _0x5dddaf||_0x4404('0x15')!==_0x5dddaf['toLowerCase']()&&'aviso'!==_0x5dddaf[_0x4404('0x17')]())if(_0x4404('0x3')!==typeof _0x5dddaf&&_0x4404('0x11')===_0x5dddaf['toLowerCase']())try{console[_0x4404('0x11')][_0x4404('0x18')](console,_0xe2ed6c);}catch(_0x3d75da){try{console['info'](_0xe2ed6c['join']('\x0a'));}catch(_0x381504){}}else try{console['error'][_0x4404('0x18')](console,_0xe2ed6c);}catch(_0x21fca9){try{console[_0x4404('0xc')](_0xe2ed6c[_0x4404('0x8')]('\x0a'));}catch(_0x3884f7){}}else try{console[_0x4404('0x12')]['apply'](console,_0xe2ed6c);}catch(_0x4dc0af){try{console['warn'](_0xe2ed6c[_0x4404('0x8')]('\x0a'));}catch(_0x221dc9){}}}};var _0x2bf30a={'selector':_0x4404('0x102'),'dropDown':{},'buyButton':{}};_0x4c4c79[_0x4404('0x103')]=function(_0x4cd63c){var _0x3eaf39,_0x362efc={};_0x1c73cb=_0x4c4c79[_0x4404('0x27')](!![],{},_0x2bf30a,_0x4cd63c);_0x3eaf39=_0x4c4c79(_0x1c73cb[_0x4404('0x104')])[_0x4404('0x1a')](_0x1c73cb[_0x4404('0x105')]);if(typeof _0x1c73cb['dropDown'][_0x4404('0x67')]!==_0x4404('0x3')&&_0x1c73cb[_0x4404('0x105')][_0x4404('0x67')]===![])_0x362efc[_0x4404('0x106')]=_0x4c4c79(_0x1c73cb[_0x4404('0x104')])['QD_buyButton'](_0x3eaf39['fn'],_0x1c73cb['buyButton']);else _0x362efc[_0x4404('0x106')]=_0x4c4c79(_0x1c73cb[_0x4404('0x104')])[_0x4404('0x107')](_0x1c73cb[_0x4404('0x106')]);_0x362efc[_0x4404('0x105')]=_0x3eaf39;return _0x362efc;};_0x4c4c79['fn'][_0x4404('0x108')]=function(){if(typeof console==='object'&&typeof console[_0x4404('0x11')]===_0x4404('0xd'))console['info'](_0x4404('0x109'));};_0x4c4c79[_0x4404('0x108')]=_0x4c4c79['fn'][_0x4404('0x108')];}catch(_0x3e966d){if(typeof console!==_0x4404('0x3')&&typeof console[_0x4404('0xc')]===_0x4404('0xd'))console[_0x4404('0xc')]('Oooops!\x20',_0x3e966d);}}());
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
var _0xfe5a=['ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','addClass','qdpv-video-on','add','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','removeClass','call','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','controlVideo','.qd-playerWrapper\x20iframe','length','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','start','prependTo','appendTo','trigger','ajaxStop','load','ImageControl','.qd-videoLink','body','.produto','object','toLowerCase','undefined','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','td.value-field.Videos:first','http','ul.thumbs','div#image','text','replace','indexOf','youtube','split','pop','shift','youtu.be','push','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','#include','wrap','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82'];(function(_0x31173b,_0x26ccac){var _0x575a3c=function(_0x22d85a){while(--_0x22d85a){_0x31173b['push'](_0x31173b['shift']());}};_0x575a3c(++_0x26ccac);}(_0xfe5a,0x1db));var _0xafe5=function(_0x1e2f11,_0x4f2599){_0x1e2f11=_0x1e2f11-0x0;var _0x1e6f79=_0xfe5a[_0x1e2f11];return _0x1e6f79;};(function(_0xaf37aa){$(function(){if($(document[_0xafe5('0x0')])['is'](_0xafe5('0x1'))){var _0x51da0d=[];var _0x1ed0c2=function(_0x49e8a4,_0x54cb76){_0xafe5('0x2')===typeof console&&('undefined'!==typeof _0x54cb76&&'alerta'===_0x54cb76[_0xafe5('0x3')]()?console['warn']('[Video\x20in\x20product]\x20'+_0x49e8a4):_0xafe5('0x4')!==typeof _0x54cb76&&'info'===_0x54cb76[_0xafe5('0x3')]()?console[_0xafe5('0x5')](_0xafe5('0x6')+_0x49e8a4):console[_0xafe5('0x7')](_0xafe5('0x6')+_0x49e8a4));};window[_0xafe5('0x8')]=window['qdVideoInProduct']||{};var _0x3acd36=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0xafe5('0x9'),'controlVideo':!0x0,'urlProtocol':_0xafe5('0xa'),'autoPlay':0x0,'mute':0x0},window[_0xafe5('0x8')]);var _0x4076fe=$(_0xafe5('0xb'));var _0x30d60e=$(_0xafe5('0xc'));var _0x34a43a=$(_0x3acd36['videoFieldSelector'])[_0xafe5('0xd')]()[_0xafe5('0xe')](/;\s*/,';')['split'](';');for(var _0x40bafc=0x0;_0x40bafc<_0x34a43a['length'];_0x40bafc++)-0x1<_0x34a43a[_0x40bafc][_0xafe5('0xf')](_0xafe5('0x10'))?_0x51da0d['push'](_0x34a43a[_0x40bafc][_0xafe5('0x11')]('v=')[_0xafe5('0x12')]()[_0xafe5('0x11')](/[&#]/)[_0xafe5('0x13')]()):-0x1<_0x34a43a[_0x40bafc][_0xafe5('0xf')](_0xafe5('0x14'))&&_0x51da0d[_0xafe5('0x15')](_0x34a43a[_0x40bafc][_0xafe5('0x11')](_0xafe5('0x16'))[_0xafe5('0x12')]()[_0xafe5('0x11')](/[\?&#]/)[_0xafe5('0x13')]());var _0x503c50=$(_0xafe5('0x17'));_0x503c50['prependTo'](_0xafe5('0x18'));_0x503c50[_0xafe5('0x19')]('<div\x20class=\x22qd-playerContainer\x22></div>');_0x34a43a=function(_0x5689a4){var _0x590aaa={'y':_0xafe5('0x1a')};return function(_0x1edb86){var _0x11d9a4=function(_0x54ea9c){return _0x54ea9c;};var _0x1b9bcc=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1edb86=_0x1edb86['d'+_0x1b9bcc[0x10]+'c'+_0x1b9bcc[0x11]+'m'+_0x11d9a4(_0x1b9bcc[0x1])+'n'+_0x1b9bcc[0xd]]['l'+_0x1b9bcc[0x12]+'c'+_0x1b9bcc[0x0]+'ti'+_0x11d9a4('o')+'n'];var _0x43028c=function(_0x32f9b6){return escape(encodeURIComponent(_0x32f9b6[_0xafe5('0xe')](/\./g,'¨')[_0xafe5('0xe')](/[a-zA-Z]/g,function(_0x29b8cd){return String[_0xafe5('0x1b')](('Z'>=_0x29b8cd?0x5a:0x7a)>=(_0x29b8cd=_0x29b8cd[_0xafe5('0x1c')](0x0)+0xd)?_0x29b8cd:_0x29b8cd-0x1a);})));};var _0x2b1a7b=_0x43028c(_0x1edb86[[_0x1b9bcc[0x9],_0x11d9a4('o'),_0x1b9bcc[0xc],_0x1b9bcc[_0x11d9a4(0xd)]][_0xafe5('0x1d')]('')]);_0x43028c=_0x43028c((window[['js',_0x11d9a4('no'),'m',_0x1b9bcc[0x1],_0x1b9bcc[0x4][_0xafe5('0x1e')](),_0xafe5('0x1f')][_0xafe5('0x1d')]('')]||_0xafe5('0x20'))+['.v',_0x1b9bcc[0xd],'e',_0x11d9a4('x'),'co',_0x11d9a4('mm'),_0xafe5('0x21'),_0x1b9bcc[0x1],'.c',_0x11d9a4('o'),'m.',_0x1b9bcc[0x13],'r'][_0xafe5('0x1d')](''));for(var _0x4ad2a7 in _0x590aaa){if(_0x43028c===_0x4ad2a7+_0x590aaa[_0x4ad2a7]||_0x2b1a7b===_0x4ad2a7+_0x590aaa[_0x4ad2a7]){var _0x64bb67='tr'+_0x1b9bcc[0x11]+'e';break;}_0x64bb67='f'+_0x1b9bcc[0x0]+'ls'+_0x11d9a4(_0x1b9bcc[0x1])+'';}_0x11d9a4=!0x1;-0x1<_0x1edb86[[_0x1b9bcc[0xc],'e',_0x1b9bcc[0x0],'rc',_0x1b9bcc[0x9]][_0xafe5('0x1d')]('')]['indexOf'](_0xafe5('0x22'))&&(_0x11d9a4=!0x0);return[_0x64bb67,_0x11d9a4];}(_0x5689a4);}(window);if(!eval(_0x34a43a[0x0]))return _0x34a43a[0x1]?_0x1ed0c2(_0xafe5('0x23')):!0x1;var _0x186579=function(_0x4dbde7,_0x9ee147){_0xafe5('0x10')===_0x9ee147&&_0x503c50[_0xafe5('0x24')](_0xafe5('0x25')+_0x3acd36[_0xafe5('0x26')]+_0xafe5('0x27')+_0x4dbde7+_0xafe5('0x28')+_0x3acd36[_0xafe5('0x29')]+'&mute='+_0x3acd36['mute']+_0xafe5('0x2a'));_0x30d60e[_0xafe5('0x2b')](_0xafe5('0x2c'),_0x30d60e[_0xafe5('0x2b')](_0xafe5('0x2c'))||_0x30d60e[_0xafe5('0x2c')]());_0x30d60e[_0xafe5('0x2d')](!0x0,!0x0)[_0xafe5('0x2e')](0x1f4,0x0,function(){$(_0xafe5('0x0'))[_0xafe5('0x2f')](_0xafe5('0x30'));});_0x503c50[_0xafe5('0x2d')](!0x0,!0x0)[_0xafe5('0x2e')](0x1f4,0x1,function(){_0x30d60e[_0xafe5('0x31')](_0x503c50)[_0xafe5('0x32')]({'height':_0x503c50[_0xafe5('0x33')](_0xafe5('0x34'))['height']()},0x2bc);});};removePlayer=function(){_0x4076fe['find'](_0xafe5('0x35'))[_0xafe5('0x36')](_0xafe5('0x37'),function(){_0x503c50[_0xafe5('0x2d')](!0x0,!0x0)[_0xafe5('0x2e')](0x1f4,0x0,function(){$(this)[_0xafe5('0x38')]()[_0xafe5('0x39')](_0xafe5('0x3a'));$(_0xafe5('0x0'))[_0xafe5('0x3b')](_0xafe5('0x30'));});_0x30d60e[_0xafe5('0x2d')](!0x0,!0x0)[_0xafe5('0x2e')](0x1f4,0x1,function(){var _0x577581=_0x30d60e[_0xafe5('0x2b')](_0xafe5('0x2c'));_0x577581&&_0x30d60e[_0xafe5('0x32')]({'height':_0x577581},0x2bc);});});};var _0x3eec25=function(){if(!_0x4076fe[_0xafe5('0x33')]('.qd-videoItem')['length'])for(vId in removePlayer[_0xafe5('0x3c')](this),_0x51da0d)if(_0xafe5('0x3d')===typeof _0x51da0d[vId]&&''!==_0x51da0d[vId]){var _0x2cc9f8=$(_0xafe5('0x3e')+_0x51da0d[vId]+_0xafe5('0x3f')+_0x51da0d[vId]+_0xafe5('0x40')+_0x51da0d[vId]+_0xafe5('0x41'));_0x2cc9f8[_0xafe5('0x33')]('a')[_0xafe5('0x36')](_0xafe5('0x42'),function(){var _0x3e013e=$(this);_0x4076fe['find']('.ON')[_0xafe5('0x3b')]('ON');_0x3e013e[_0xafe5('0x2f')]('ON');0x1==_0x3acd36[_0xafe5('0x43')]?$(_0xafe5('0x44'))[_0xafe5('0x45')]?(_0x186579['call'](this,'',''),$(_0xafe5('0x44'))[0x0][_0xafe5('0x46')][_0xafe5('0x47')](_0xafe5('0x48'),'*')):_0x186579[_0xafe5('0x3c')](this,_0x3e013e[_0xafe5('0x49')]('rel'),_0xafe5('0x10')):_0x186579[_0xafe5('0x3c')](this,_0x3e013e[_0xafe5('0x49')](_0xafe5('0x4a')),_0xafe5('0x10'));return!0x1;});0x1==_0x3acd36[_0xafe5('0x43')]&&_0x4076fe[_0xafe5('0x33')]('a:not(.qd-videoLink)')[_0xafe5('0x4b')](function(_0x52631c){$(_0xafe5('0x44'))[_0xafe5('0x45')]&&$(_0xafe5('0x44'))[0x0]['contentWindow'][_0xafe5('0x47')](_0xafe5('0x4c'),'*');});_0xafe5('0x4d')===_0x3acd36['insertThumbsIn']?_0x2cc9f8[_0xafe5('0x4e')](_0x4076fe):_0x2cc9f8[_0xafe5('0x4f')](_0x4076fe);_0x2cc9f8[_0xafe5('0x50')]('QuatroDigital.pv_video_added',[_0x51da0d[vId],_0x2cc9f8]);}};$(document)[_0xafe5('0x51')](_0x3eec25);$(window)[_0xafe5('0x52')](_0x3eec25);(function(){var _0x4fda40=this;var _0xcb766b=window[_0xafe5('0x53')]||function(){};window[_0xafe5('0x53')]=function(_0x34734a,_0x278506){$(_0x34734a||'')['is'](_0xafe5('0x54'))||(_0xcb766b['call'](this,_0x34734a,_0x278506),_0x3eec25[_0xafe5('0x3c')](_0x4fda40));};}());}});}(this));
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