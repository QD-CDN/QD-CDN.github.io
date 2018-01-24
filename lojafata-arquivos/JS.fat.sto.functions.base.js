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
			
			if (wrapper.find('.product-match-qd-v1-last-product *').length > 0) {
				wrapper.show();
				return;
			}

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

			var currentName = '<a href=void();>' +  $('.product-qd-v1-sku-selection-row .product-qd-v1-name >div').text() + '</a>';
			shelf.find('.shelf-qd-v1-name h3').append(currentName);

			var priceWrapper = $('.product-qd-v1-sku-selection-row .product-qd-v1-price .descricao-preco');
			var bestPrice = priceWrapper.find('.skuBestPrice').clone();
			var installmentsPrice = priceWrapper.find('.price-installments >span').clone();
			shelf.find('.shelf-qd-v1-price .shelf-qd-v1-price-best-price').append(bestPrice);
			shelf.find('.shelf-qd-v1-price .shelf-qd-v1-price-instalment').append(installmentsPrice);

			var currentBuyButton = $('.product-qd-v1-sku-selection-row .product-qd-v1-buy-button a').first().clone();
			shelf.find('.shelf-qd-v1-buy-button').append(currentBuyButton);
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
var _0xf5b6=['object','completePopulated','clearQueueDelay','jqXHR','undefined','ajax','readyState','data','textStatus','version','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','toLowerCase','info','apply','warn','removeClass','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','find','[data-qd-ssa-text]','qd-ssa-hide','qd-ssa-show','[data-qd-ssa-text=\x22','length','filter','[data-qd-ssa-text=\x22default\x22]','hide','html','#qtt','show','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','qd-ssa-on','qd-ssa-sku-no-selected','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','sku','trigger','QuatroDigital.ssa.prodUnavailable','off','qd-ssa-sku-prod-unavailable','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','charCodeAt','join','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','QD_smartStockAvailable','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','extend','opts','push','success','call','error','complete','parameters','callbackFns','boolean','successPopulated','errorPopulated'];(function(_0x1b9f73,_0xbe0b52){var _0x3628b0=function(_0x2accf3){while(--_0x2accf3){_0x1b9f73['push'](_0x1b9f73['shift']());}};_0x3628b0(++_0xbe0b52);}(_0xf5b6,0xa0));var _0x6f5b=function(_0x1a7076,_0x94984a){_0x1a7076=_0x1a7076-0x0;var _0x9afd2e=_0xf5b6[_0x1a7076];return _0x9afd2e;};(function(_0x409dec){if(_0x6f5b('0x0')!==typeof _0x409dec[_0x6f5b('0x1')]){var _0x5eee29={};_0x409dec['qdAjaxQueue']=_0x5eee29;_0x409dec[_0x6f5b('0x1')]=function(_0x169794){var _0x56b104=_0x409dec[_0x6f5b('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x169794);var _0x5b6326=escape(encodeURIComponent(_0x56b104['url']));_0x5eee29[_0x5b6326]=_0x5eee29[_0x5b6326]||{};_0x5eee29[_0x5b6326][_0x6f5b('0x3')]=_0x5eee29[_0x5b6326][_0x6f5b('0x3')]||[];_0x5eee29[_0x5b6326]['opts'][_0x6f5b('0x4')]({'success':function(_0x55112d,_0x3a5341,_0x577358){_0x56b104[_0x6f5b('0x5')][_0x6f5b('0x6')](this,_0x55112d,_0x3a5341,_0x577358);},'error':function(_0x58a551,_0x278ee1,_0x32a1c4){_0x56b104[_0x6f5b('0x7')][_0x6f5b('0x6')](this,_0x58a551,_0x278ee1,_0x32a1c4);},'complete':function(_0x1d52ae,_0x182a1e){_0x56b104[_0x6f5b('0x8')]['call'](this,_0x1d52ae,_0x182a1e);}});_0x5eee29[_0x5b6326]['parameters']=_0x5eee29[_0x5b6326][_0x6f5b('0x9')]||{'success':{},'error':{},'complete':{}};_0x5eee29[_0x5b6326][_0x6f5b('0xa')]=_0x5eee29[_0x5b6326][_0x6f5b('0xa')]||{};_0x5eee29[_0x5b6326][_0x6f5b('0xa')]['successPopulated']=_0x6f5b('0xb')===typeof _0x5eee29[_0x5b6326][_0x6f5b('0xa')][_0x6f5b('0xc')]?_0x5eee29[_0x5b6326][_0x6f5b('0xa')][_0x6f5b('0xc')]:!0x1;_0x5eee29[_0x5b6326][_0x6f5b('0xa')][_0x6f5b('0xd')]=_0x6f5b('0xb')===typeof _0x5eee29[_0x5b6326][_0x6f5b('0xa')]['errorPopulated']?_0x5eee29[_0x5b6326]['callbackFns']['errorPopulated']:!0x1;_0x5eee29[_0x5b6326]['callbackFns']['completePopulated']=_0x6f5b('0xb')===typeof _0x5eee29[_0x5b6326][_0x6f5b('0xa')]['completePopulated']?_0x5eee29[_0x5b6326][_0x6f5b('0xa')]['completePopulated']:!0x1;_0x169794=_0x409dec['extend']({},_0x56b104,{'success':function(_0x349d3e,_0x3d505e,_0x431dbb){_0x5eee29[_0x5b6326][_0x6f5b('0x9')][_0x6f5b('0x5')]={'data':_0x349d3e,'textStatus':_0x3d505e,'jqXHR':_0x431dbb};_0x5eee29[_0x5b6326]['callbackFns'][_0x6f5b('0xc')]=!0x0;for(var _0x56acba in _0x5eee29[_0x5b6326][_0x6f5b('0x3')])_0x6f5b('0xe')===typeof _0x5eee29[_0x5b6326][_0x6f5b('0x3')][_0x56acba]&&(_0x5eee29[_0x5b6326][_0x6f5b('0x3')][_0x56acba][_0x6f5b('0x5')]['call'](this,_0x349d3e,_0x3d505e,_0x431dbb),_0x5eee29[_0x5b6326][_0x6f5b('0x3')][_0x56acba][_0x6f5b('0x5')]=function(){});},'error':function(_0x12c1e7,_0x378464,_0x3d3e4e){_0x5eee29[_0x5b6326][_0x6f5b('0x9')][_0x6f5b('0x7')]={'errorThrown':_0x3d3e4e,'textStatus':_0x378464,'jqXHR':_0x12c1e7};_0x5eee29[_0x5b6326][_0x6f5b('0xa')]['errorPopulated']=!0x0;for(var _0xff146b in _0x5eee29[_0x5b6326]['opts'])_0x6f5b('0xe')===typeof _0x5eee29[_0x5b6326][_0x6f5b('0x3')][_0xff146b]&&(_0x5eee29[_0x5b6326][_0x6f5b('0x3')][_0xff146b]['error'][_0x6f5b('0x6')](this,_0x12c1e7,_0x378464,_0x3d3e4e),_0x5eee29[_0x5b6326][_0x6f5b('0x3')][_0xff146b]['error']=function(){});},'complete':function(_0x206b1f,_0x4efa50){_0x5eee29[_0x5b6326][_0x6f5b('0x9')][_0x6f5b('0x8')]={'textStatus':_0x4efa50,'jqXHR':_0x206b1f};_0x5eee29[_0x5b6326]['callbackFns'][_0x6f5b('0xf')]=!0x0;for(var _0x5c355d in _0x5eee29[_0x5b6326][_0x6f5b('0x3')])'object'===typeof _0x5eee29[_0x5b6326][_0x6f5b('0x3')][_0x5c355d]&&(_0x5eee29[_0x5b6326][_0x6f5b('0x3')][_0x5c355d][_0x6f5b('0x8')][_0x6f5b('0x6')](this,_0x206b1f,_0x4efa50),_0x5eee29[_0x5b6326][_0x6f5b('0x3')][_0x5c355d][_0x6f5b('0x8')]=function(){});isNaN(parseInt(_0x56b104[_0x6f5b('0x10')]))||setTimeout(function(){_0x5eee29[_0x5b6326][_0x6f5b('0x11')]=void 0x0;_0x5eee29[_0x5b6326][_0x6f5b('0x3')]=void 0x0;_0x5eee29[_0x5b6326][_0x6f5b('0x9')]=void 0x0;_0x5eee29[_0x5b6326]['callbackFns']=void 0x0;},_0x56b104[_0x6f5b('0x10')]);}});_0x6f5b('0x12')===typeof _0x5eee29[_0x5b6326][_0x6f5b('0x11')]?_0x5eee29[_0x5b6326][_0x6f5b('0x11')]=_0x409dec[_0x6f5b('0x13')](_0x169794):_0x5eee29[_0x5b6326][_0x6f5b('0x11')]&&_0x5eee29[_0x5b6326][_0x6f5b('0x11')][_0x6f5b('0x14')]&&0x4==_0x5eee29[_0x5b6326][_0x6f5b('0x11')][_0x6f5b('0x14')]&&(_0x5eee29[_0x5b6326][_0x6f5b('0xa')]['successPopulated']&&_0x169794[_0x6f5b('0x5')](_0x5eee29[_0x5b6326]['parameters'][_0x6f5b('0x5')][_0x6f5b('0x15')],_0x5eee29[_0x5b6326][_0x6f5b('0x9')][_0x6f5b('0x5')][_0x6f5b('0x16')],_0x5eee29[_0x5b6326][_0x6f5b('0x9')]['success']['jqXHR']),_0x5eee29[_0x5b6326][_0x6f5b('0xa')][_0x6f5b('0xd')]&&_0x169794['error'](_0x5eee29[_0x5b6326][_0x6f5b('0x9')][_0x6f5b('0x7')][_0x6f5b('0x11')],_0x5eee29[_0x5b6326][_0x6f5b('0x9')][_0x6f5b('0x7')]['textStatus'],_0x5eee29[_0x5b6326][_0x6f5b('0x9')][_0x6f5b('0x7')]['errorThrown']),_0x5eee29[_0x5b6326]['callbackFns'][_0x6f5b('0xf')]&&_0x169794[_0x6f5b('0x8')](_0x5eee29[_0x5b6326][_0x6f5b('0x9')]['complete'][_0x6f5b('0x11')],_0x5eee29[_0x5b6326][_0x6f5b('0x9')][_0x6f5b('0x8')][_0x6f5b('0x16')]));};_0x409dec[_0x6f5b('0x1')][_0x6f5b('0x17')]=_0x6f5b('0x18');}}(jQuery));(function(_0x25bf12){function _0x446903(_0x316b66,_0x514e20){_0x1d71f3[_0x6f5b('0x1')]({'url':_0x6f5b('0x19')+_0x316b66,'clearQueueDelay':null,'success':_0x514e20,'error':function(){_0x18ccbd(_0x6f5b('0x1a'));}});}var _0x1d71f3=jQuery;if('function'!==typeof _0x1d71f3['fn']['QD_smartStockAvailable']){var _0x18ccbd=function(_0x3ca7d1,_0x464a13){if(_0x6f5b('0xe')===typeof console){var _0x34fed7;_0x6f5b('0xe')===typeof _0x3ca7d1?(_0x3ca7d1['unshift'](_0x6f5b('0x1b')),_0x34fed7=_0x3ca7d1):_0x34fed7=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x3ca7d1];_0x6f5b('0x12')===typeof _0x464a13||_0x6f5b('0x1c')!==_0x464a13[_0x6f5b('0x1d')]()&&'aviso'!==_0x464a13[_0x6f5b('0x1d')]()?_0x6f5b('0x12')!==typeof _0x464a13&&_0x6f5b('0x1e')===_0x464a13[_0x6f5b('0x1d')]()?console[_0x6f5b('0x1e')][_0x6f5b('0x1f')](console,_0x34fed7):console[_0x6f5b('0x7')][_0x6f5b('0x1f')](console,_0x34fed7):console[_0x6f5b('0x20')]['apply'](console,_0x34fed7);}},_0x1fd16b={},_0x4bc891=function(_0x1b5dbc,_0x23be70){function _0x2e72b4(_0x39e72e){try{_0x1b5dbc[_0x6f5b('0x21')]('qd-ssa-sku-no-selected')[_0x6f5b('0x22')](_0x6f5b('0x23'));var _0x9f6e2a=_0x39e72e[0x0][_0x6f5b('0x24')][0x0][_0x6f5b('0x25')];_0x1b5dbc[_0x6f5b('0x26')](_0x6f5b('0x27'),_0x9f6e2a);_0x1b5dbc['each'](function(){var _0x1b5dbc=_0x1d71f3(this)[_0x6f5b('0x28')](_0x6f5b('0x29'));if(0x1>_0x9f6e2a)return _0x1b5dbc['hide']()[_0x6f5b('0x22')](_0x6f5b('0x2a'))['removeClass'](_0x6f5b('0x2b'));var _0x39e72e=_0x1b5dbc['filter'](_0x6f5b('0x2c')+_0x9f6e2a+'\x22]');_0x39e72e=_0x39e72e[_0x6f5b('0x2d')]?_0x39e72e:_0x1b5dbc[_0x6f5b('0x2e')](_0x6f5b('0x2f'));_0x1b5dbc[_0x6f5b('0x30')]()[_0x6f5b('0x22')](_0x6f5b('0x2a'))[_0x6f5b('0x21')](_0x6f5b('0x2b'));_0x39e72e[_0x6f5b('0x31')]((_0x39e72e[_0x6f5b('0x31')]()||'')['replace'](_0x6f5b('0x32'),_0x9f6e2a));_0x39e72e[_0x6f5b('0x33')]()['addClass'](_0x6f5b('0x2b'))[_0x6f5b('0x21')](_0x6f5b('0x2a'));});}catch(_0x4201fc){_0x18ccbd([_0x6f5b('0x34'),_0x4201fc[_0x6f5b('0x35')]]);}}if(_0x1b5dbc[_0x6f5b('0x2d')]){_0x1b5dbc[_0x6f5b('0x22')](_0x6f5b('0x36'));_0x1b5dbc[_0x6f5b('0x22')](_0x6f5b('0x37'));try{_0x1b5dbc[_0x6f5b('0x22')](_0x6f5b('0x38')+vtxctx[_0x6f5b('0x39')][_0x6f5b('0x3a')](';')[_0x6f5b('0x2d')]);}catch(_0x6fcc6){_0x18ccbd([_0x6f5b('0x3b'),_0x6fcc6[_0x6f5b('0x35')]]);}_0x1d71f3(window)['on'](_0x6f5b('0x3c'),function(_0x5949c4,_0x577bce,_0x5587f2){try{_0x446903(_0x5587f2[_0x6f5b('0x3d')],function(_0x5acf47){_0x2e72b4(_0x5acf47);0x1===vtxctx[_0x6f5b('0x39')][_0x6f5b('0x3a')](';')['length']&&0x0==_0x5acf47[0x0][_0x6f5b('0x24')][0x0][_0x6f5b('0x25')]&&_0x1d71f3(window)[_0x6f5b('0x3e')](_0x6f5b('0x3f'));});}catch(_0xa41f4a){_0x18ccbd(['Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20',_0xa41f4a['message']]);}});_0x1d71f3(window)[_0x6f5b('0x40')]('vtex.sku.selected.QD');_0x1d71f3(window)['on']('QuatroDigital.ssa.prodUnavailable',function(){_0x1b5dbc[_0x6f5b('0x22')](_0x6f5b('0x41'))[_0x6f5b('0x30')]();});}};_0x25bf12=function(_0x548ad0){var _0x592a21={'y':_0x6f5b('0x42')};return function(_0x4f8882){var _0x2d55e3=function(_0x1ca2fd){return _0x1ca2fd;};var _0x2093c6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4f8882=_0x4f8882['d'+_0x2093c6[0x10]+'c'+_0x2093c6[0x11]+'m'+_0x2d55e3(_0x2093c6[0x1])+'n'+_0x2093c6[0xd]]['l'+_0x2093c6[0x12]+'c'+_0x2093c6[0x0]+'ti'+_0x2d55e3('o')+'n'];var _0x227cfb=function(_0x22981f){return escape(encodeURIComponent(_0x22981f[_0x6f5b('0x43')](/\./g,'¨')[_0x6f5b('0x43')](/[a-zA-Z]/g,function(_0x46f9d0){return String['fromCharCode'](('Z'>=_0x46f9d0?0x5a:0x7a)>=(_0x46f9d0=_0x46f9d0[_0x6f5b('0x44')](0x0)+0xd)?_0x46f9d0:_0x46f9d0-0x1a);})));};var _0x593b4b=_0x227cfb(_0x4f8882[[_0x2093c6[0x9],_0x2d55e3('o'),_0x2093c6[0xc],_0x2093c6[_0x2d55e3(0xd)]][_0x6f5b('0x45')]('')]);_0x227cfb=_0x227cfb((window[['js',_0x2d55e3('no'),'m',_0x2093c6[0x1],_0x2093c6[0x4]['toUpperCase'](),_0x6f5b('0x46')][_0x6f5b('0x45')]('')]||_0x6f5b('0x47'))+['.v',_0x2093c6[0xd],'e',_0x2d55e3('x'),'co',_0x2d55e3('mm'),_0x6f5b('0x48'),_0x2093c6[0x1],'.c',_0x2d55e3('o'),'m.',_0x2093c6[0x13],'r']['join'](''));for(var _0x1d92ff in _0x592a21){if(_0x227cfb===_0x1d92ff+_0x592a21[_0x1d92ff]||_0x593b4b===_0x1d92ff+_0x592a21[_0x1d92ff]){var _0x4a2d14='tr'+_0x2093c6[0x11]+'e';break;}_0x4a2d14='f'+_0x2093c6[0x0]+'ls'+_0x2d55e3(_0x2093c6[0x1])+'';}_0x2d55e3=!0x1;-0x1<_0x4f8882[[_0x2093c6[0xc],'e',_0x2093c6[0x0],'rc',_0x2093c6[0x9]][_0x6f5b('0x45')]('')][_0x6f5b('0x49')](_0x6f5b('0x4a'))&&(_0x2d55e3=!0x0);return[_0x4a2d14,_0x2d55e3];}(_0x548ad0);}(window);if(!eval(_0x25bf12[0x0]))return _0x25bf12[0x1]?_0x18ccbd(_0x6f5b('0x4b')):!0x1;_0x1d71f3['fn'][_0x6f5b('0x4c')]=function(_0x111305){var _0x2eef40=_0x1d71f3(this);_0x111305=_0x1d71f3['extend'](!0x0,{},_0x1fd16b,_0x111305);_0x2eef40[_0x6f5b('0x4d')]=new _0x4bc891(_0x2eef40,_0x111305);try{_0x6f5b('0xe')===typeof _0x1d71f3['fn']['QD_smartStockAvailable']['initialSkuSelected']&&_0x1d71f3(window)[_0x6f5b('0x3e')]('QuatroDigital.ssa.skuSelected',[_0x1d71f3['fn'][_0x6f5b('0x4c')][_0x6f5b('0x4e')][_0x6f5b('0x4f')],_0x1d71f3['fn']['QD_smartStockAvailable'][_0x6f5b('0x4e')][_0x6f5b('0x3d')]]);}catch(_0x316127){_0x18ccbd([_0x6f5b('0x50'),_0x316127[_0x6f5b('0x35')]]);}_0x1d71f3['fn']['QD_smartStockAvailable'][_0x6f5b('0x51')]&&_0x1d71f3(window)[_0x6f5b('0x3e')](_0x6f5b('0x3f'));return _0x2eef40;};_0x1d71f3(window)['on']('vtex.sku.selected.QD',function(_0x121361,_0x3257c9,_0x35bce1){try{_0x1d71f3['fn'][_0x6f5b('0x4c')][_0x6f5b('0x4e')]={'prod':_0x3257c9,'sku':_0x35bce1},_0x1d71f3(this)[_0x6f5b('0x40')](_0x121361);}catch(_0x5687c7){_0x18ccbd([_0x6f5b('0x52'),_0x5687c7[_0x6f5b('0x35')]]);}});_0x1d71f3(window)['on'](_0x6f5b('0x53'),function(_0x265f3e,_0x20dab0,_0x3245b2){try{for(var _0x424e55=_0x3245b2[_0x6f5b('0x2d')],_0x1d9a0f=_0x20dab0=0x0;_0x1d9a0f<_0x424e55&&!_0x3245b2[_0x1d9a0f][_0x6f5b('0x54')];_0x1d9a0f++)_0x20dab0+=0x1;_0x424e55<=_0x20dab0&&(_0x1d71f3['fn']['QD_smartStockAvailable'][_0x6f5b('0x51')]=!0x0);_0x1d71f3(this)[_0x6f5b('0x40')](_0x265f3e);}catch(_0x4c49bf){_0x18ccbd([_0x6f5b('0x55'),_0x4c49bf[_0x6f5b('0x35')]]);}});_0x1d71f3(function(){_0x1d71f3(_0x6f5b('0x56'))[_0x6f5b('0x4c')]();});}}(window));
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
var _0xfe9c=['add','qd-am-','-li','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','undefined','error','info','object','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','warn','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','QD_amazingMenu','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','ite','indexOf','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','qdAjax','url','data-qdam-value','insertBefore','hide','text','trim','attr','[class*=\x27colunas\x27]','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','>li','>ul','qd-am-dropdown-menu','qd-am-dropdown'];(function(_0x2a0661,_0x3b1813){var _0x577c31=function(_0x5105b2){while(--_0x5105b2){_0x2a0661['push'](_0x2a0661['shift']());}};_0x577c31(++_0x3b1813);}(_0xfe9c,0x93));var _0xcfe9=function(_0x3c09bd,_0x3372fa){_0x3c09bd=_0x3c09bd-0x0;var _0x10716b=_0xfe9c[_0x3c09bd];return _0x10716b;};(function(_0x4d9c5b){_0x4d9c5b['fn'][_0xcfe9('0x0')]=_0x4d9c5b['fn'][_0xcfe9('0x1')];}(jQuery));(function(_0x2ba25a){var _0xbf5c93;var _0x1890dc=jQuery;if(_0xcfe9('0x2')!==typeof _0x1890dc['fn']['QD_amazingMenu']){var _0x4369ce={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x2692c6=function(_0x3f6c26,_0x39428b){if('object'===typeof console&&_0xcfe9('0x3')!==typeof console[_0xcfe9('0x4')]&&_0xcfe9('0x3')!==typeof console[_0xcfe9('0x5')]&&_0xcfe9('0x3')!==typeof console['warn']){var _0x970450;_0xcfe9('0x6')===typeof _0x3f6c26?(_0x3f6c26['unshift']('[QD\x20Amazing\x20Menu]\x0a'),_0x970450=_0x3f6c26):_0x970450=[_0xcfe9('0x7')+_0x3f6c26];if('undefined'===typeof _0x39428b||_0xcfe9('0x8')!==_0x39428b[_0xcfe9('0x9')]()&&_0xcfe9('0xa')!==_0x39428b[_0xcfe9('0x9')]())if(_0xcfe9('0x3')!==typeof _0x39428b&&_0xcfe9('0x5')===_0x39428b[_0xcfe9('0x9')]())try{console[_0xcfe9('0x5')][_0xcfe9('0xb')](console,_0x970450);}catch(_0x1a7291){try{console[_0xcfe9('0x5')](_0x970450['join']('\x0a'));}catch(_0x4b394e){}}else try{console['error'][_0xcfe9('0xb')](console,_0x970450);}catch(_0x40dd11){try{console[_0xcfe9('0x4')](_0x970450[_0xcfe9('0xc')]('\x0a'));}catch(_0x30f1c9){}}else try{console[_0xcfe9('0xd')][_0xcfe9('0xb')](console,_0x970450);}catch(_0x398793){try{console[_0xcfe9('0xd')](_0x970450[_0xcfe9('0xc')]('\x0a'));}catch(_0x40ed77){}}}};_0x1890dc['fn'][_0xcfe9('0xe')]=function(){var _0x3f293d=_0x1890dc(this);_0x3f293d[_0xcfe9('0xf')](function(_0x203f58){_0x1890dc(this)[_0xcfe9('0x10')](_0xcfe9('0x11')+_0x203f58);});_0x3f293d[_0xcfe9('0x12')]()[_0xcfe9('0x10')](_0xcfe9('0x13'));_0x3f293d[_0xcfe9('0x14')]()[_0xcfe9('0x10')](_0xcfe9('0x15'));return _0x3f293d;};_0x1890dc['fn'][_0xcfe9('0x16')]=function(){};_0x2ba25a=function(_0x16a640){var _0x8da2c1={'y':_0xcfe9('0x17')};return function(_0x1931dc){var _0x2d5799=function(_0x3be0c){return _0x3be0c;};var _0x1c3f95=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1931dc=_0x1931dc['d'+_0x1c3f95[0x10]+'c'+_0x1c3f95[0x11]+'m'+_0x2d5799(_0x1c3f95[0x1])+'n'+_0x1c3f95[0xd]]['l'+_0x1c3f95[0x12]+'c'+_0x1c3f95[0x0]+'ti'+_0x2d5799('o')+'n'];var _0x12aa53=function(_0x576405){return escape(encodeURIComponent(_0x576405[_0xcfe9('0x18')](/\./g,'¨')[_0xcfe9('0x18')](/[a-zA-Z]/g,function(_0x5ba66b){return String[_0xcfe9('0x19')](('Z'>=_0x5ba66b?0x5a:0x7a)>=(_0x5ba66b=_0x5ba66b[_0xcfe9('0x1a')](0x0)+0xd)?_0x5ba66b:_0x5ba66b-0x1a);})));};var _0x186b70=_0x12aa53(_0x1931dc[[_0x1c3f95[0x9],_0x2d5799('o'),_0x1c3f95[0xc],_0x1c3f95[_0x2d5799(0xd)]][_0xcfe9('0xc')]('')]);_0x12aa53=_0x12aa53((window[['js',_0x2d5799('no'),'m',_0x1c3f95[0x1],_0x1c3f95[0x4][_0xcfe9('0x1b')](),_0xcfe9('0x1c')][_0xcfe9('0xc')]('')]||'---')+['.v',_0x1c3f95[0xd],'e',_0x2d5799('x'),'co',_0x2d5799('mm'),'erc',_0x1c3f95[0x1],'.c',_0x2d5799('o'),'m.',_0x1c3f95[0x13],'r'][_0xcfe9('0xc')](''));for(var _0xac9c33 in _0x8da2c1){if(_0x12aa53===_0xac9c33+_0x8da2c1[_0xac9c33]||_0x186b70===_0xac9c33+_0x8da2c1[_0xac9c33]){var _0x274469='tr'+_0x1c3f95[0x11]+'e';break;}_0x274469='f'+_0x1c3f95[0x0]+'ls'+_0x2d5799(_0x1c3f95[0x1])+'';}_0x2d5799=!0x1;-0x1<_0x1931dc[[_0x1c3f95[0xc],'e',_0x1c3f95[0x0],'rc',_0x1c3f95[0x9]][_0xcfe9('0xc')]('')][_0xcfe9('0x1d')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2d5799=!0x0);return[_0x274469,_0x2d5799];}(_0x16a640);}(window);if(!eval(_0x2ba25a[0x0]))return _0x2ba25a[0x1]?_0x2692c6('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;var _0xb4a2a9=function(_0x177348){var _0x2dd529=_0x177348[_0xcfe9('0x1e')](_0xcfe9('0x1f'));var _0x125773=_0x2dd529[_0xcfe9('0x20')](_0xcfe9('0x21'));var _0x2469eb=_0x2dd529[_0xcfe9('0x20')](_0xcfe9('0x22'));if(_0x125773[_0xcfe9('0x23')]||_0x2469eb[_0xcfe9('0x23')])_0x125773[_0xcfe9('0x24')]()[_0xcfe9('0x10')](_0xcfe9('0x25')),_0x2469eb[_0xcfe9('0x24')]()['addClass'](_0xcfe9('0x26')),_0x1890dc[_0xcfe9('0x27')]({'url':_0xbf5c93[_0xcfe9('0x28')],'dataType':'html','success':function(_0x27f5a4){var _0x119196=_0x1890dc(_0x27f5a4);_0x125773[_0xcfe9('0xf')](function(){var _0x27f5a4=_0x1890dc(this);var _0x42fb77=_0x119196[_0xcfe9('0x1e')]('img[alt=\x27'+_0x27f5a4['attr'](_0xcfe9('0x29'))+'\x27]');_0x42fb77[_0xcfe9('0x23')]&&(_0x42fb77[_0xcfe9('0xf')](function(){_0x1890dc(this)[_0xcfe9('0x0')]('.box-banner')['clone']()[_0xcfe9('0x2a')](_0x27f5a4);}),_0x27f5a4[_0xcfe9('0x2b')]());})[_0xcfe9('0x10')]('qd-am-content-loaded');_0x2469eb[_0xcfe9('0xf')](function(){var _0x27f5a4={};var _0x1d4efe=_0x1890dc(this);_0x119196[_0xcfe9('0x1e')]('h2')[_0xcfe9('0xf')](function(){if(_0x1890dc(this)[_0xcfe9('0x2c')]()[_0xcfe9('0x2d')]()[_0xcfe9('0x9')]()==_0x1d4efe[_0xcfe9('0x2e')](_0xcfe9('0x29'))[_0xcfe9('0x2d')]()[_0xcfe9('0x9')]())return _0x27f5a4=_0x1890dc(this),!0x1;});_0x27f5a4[_0xcfe9('0x23')]&&(_0x27f5a4[_0xcfe9('0xf')](function(){_0x1890dc(this)[_0xcfe9('0x0')](_0xcfe9('0x2f'))['clone']()[_0xcfe9('0x2a')](_0x1d4efe);}),_0x1d4efe['hide']());})[_0xcfe9('0x10')](_0xcfe9('0x30'));},'error':function(){_0x2692c6(_0xcfe9('0x31')+_0xbf5c93[_0xcfe9('0x28')]+'\x27\x20falho.');},'complete':function(){_0xbf5c93['ajaxCallback'][_0xcfe9('0x32')](this);_0x1890dc(window)[_0xcfe9('0x33')]('QuatroDigital.am.ajaxCallback',_0x177348);},'clearQueueDelay':0xbb8});};_0x1890dc['QD_amazingMenu']=function(_0x344493){var _0x22121f=_0x344493[_0xcfe9('0x1e')](_0xcfe9('0x34'))[_0xcfe9('0xf')](function(){var _0x31d9d4=_0x1890dc(this);if(!_0x31d9d4[_0xcfe9('0x23')])return _0x2692c6([_0xcfe9('0x35'),_0x344493],'alerta');_0x31d9d4[_0xcfe9('0x1e')](_0xcfe9('0x36'))[_0xcfe9('0x24')]()[_0xcfe9('0x10')](_0xcfe9('0x37'));_0x31d9d4['find']('li')[_0xcfe9('0xf')](function(){var _0x22a4fb=_0x1890dc(this);var _0x25abbe=_0x22a4fb[_0xcfe9('0x38')](_0xcfe9('0x39'));_0x25abbe[_0xcfe9('0x23')]&&_0x22a4fb['addClass'](_0xcfe9('0x3a')+_0x25abbe['first']()['text']()[_0xcfe9('0x2d')]()['replaceSpecialChars']()[_0xcfe9('0x18')](/\./g,'')['replace'](/\s/g,'-')[_0xcfe9('0x9')]());});var _0x1c8114=_0x31d9d4[_0xcfe9('0x1e')](_0xcfe9('0x3b'))['qdAmAddNdx']();_0x31d9d4[_0xcfe9('0x10')]('qd-amazing-menu');_0x1c8114=_0x1c8114[_0xcfe9('0x1e')](_0xcfe9('0x3c'));_0x1c8114[_0xcfe9('0xf')](function(){var _0x440aa9=_0x1890dc(this);_0x440aa9['find'](_0xcfe9('0x3b'))[_0xcfe9('0xe')]()[_0xcfe9('0x10')]('qd-am-column');_0x440aa9[_0xcfe9('0x10')](_0xcfe9('0x3d'));_0x440aa9[_0xcfe9('0x24')]()[_0xcfe9('0x10')](_0xcfe9('0x3e'));});_0x1c8114[_0xcfe9('0x10')]('qd-am-dropdown');var _0x4ab09a=0x0,_0x2ba25a=function(_0x348154){_0x4ab09a+=0x1;_0x348154=_0x348154[_0xcfe9('0x38')]('li')[_0xcfe9('0x38')]('*');_0x348154['length']&&(_0x348154[_0xcfe9('0x10')]('qd-am-level-'+_0x4ab09a),_0x2ba25a(_0x348154));};_0x2ba25a(_0x31d9d4);_0x31d9d4[_0xcfe9('0x3f')](_0x31d9d4['find']('ul'))[_0xcfe9('0xf')](function(){var _0x401b9f=_0x1890dc(this);_0x401b9f[_0xcfe9('0x10')](_0xcfe9('0x40')+_0x401b9f[_0xcfe9('0x38')]('li')[_0xcfe9('0x23')]+_0xcfe9('0x41'));});});_0xb4a2a9(_0x22121f);_0xbf5c93['callback'][_0xcfe9('0x32')](this);_0x1890dc(window)[_0xcfe9('0x33')](_0xcfe9('0x42'),_0x344493);};_0x1890dc['fn'][_0xcfe9('0x16')]=function(_0x1240c9){var _0x353372=_0x1890dc(this);if(!_0x353372[_0xcfe9('0x23')])return _0x353372;_0xbf5c93=_0x1890dc[_0xcfe9('0x43')]({},_0x4369ce,_0x1240c9);_0x353372[_0xcfe9('0x44')]=new _0x1890dc['QD_amazingMenu'](_0x1890dc(this));return _0x353372;};_0x1890dc(function(){_0x1890dc(_0xcfe9('0x45'))[_0xcfe9('0x16')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x8325=['A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','.qd_ddc_continueShopping','html','.qd-ddc-checkout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','click.qd_ddc_closeFn','removeClass','qd-bb-lightBoxProdAdd','body','qd-bb-lightBoxBodyProdAdd','off','keyup.qd_ddc_closeFn','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','val','formatCepField','keyCode','.qd-ddc-cep-btn','click','preventDefault','toggle','.qd-ddc-cep-close','click._QD_DDC_closeShipping','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','mouseleave.qd_ddc_hover','cartContainer','call','.qd-ddc-infoTotalValue','total','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','allTotal','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','qd-ddc-noItems','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','empty','productCategoryIds','attr','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','content','.qd-ddc-quantity','quantity','insertProdImg','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','shippingData','filter','[data-sku=\x27','lastSku','each','outerHeight','parent','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','qd-ddc-cart-empty','forceImageHTTPS','string','http','https','load','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','actionButtons','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-prodRow','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','data','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','\x20dias\x20útéis','<tr></tr>','price','</td><td>','\x20para\x20o\x20CEP\x20','tbody','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','totalizers','boolean','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Callback\x20não\x20é\x20uma\x20função','allowRecalculate','buyButtonClicked','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','prodId','.qd-bap-qtt','.qd_bap_wrapper_content','prepend','productId','prod_','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','QD_smartCart','dropDown','selector','QD_buyButton','buyButton','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','toFixed','length','join','_QuatroDigital_CartData','callback','Callbacks','error','function','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','warn','unshift','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','allowUpdate','QD_dropDownCart','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','extend','smartCheckout','vtexjs'];(function(_0x2f8b27,_0xf606a2){var _0x8c9703=function(_0x329569){while(--_0x329569){_0x2f8b27['push'](_0x2f8b27['shift']());}};_0x8c9703(++_0xf606a2);}(_0x8325,0xd9));var _0x5832=function(_0x5ad6eb,_0x4bea7a){_0x5ad6eb=_0x5ad6eb-0x0;var _0x21a3b9=_0x8325[_0x5ad6eb];return _0x21a3b9;};(function(_0x486ef2){_0x486ef2['fn'][_0x5832('0x0')]=_0x486ef2['fn'][_0x5832('0x1')];}(jQuery));function qd_number_format(_0x1511db,_0x56f2cf,_0x51af62,_0x332cb4){_0x1511db=(_0x1511db+'')[_0x5832('0x2')](/[^0-9+\-Ee.]/g,'');_0x1511db=isFinite(+_0x1511db)?+_0x1511db:0x0;_0x56f2cf=isFinite(+_0x56f2cf)?Math[_0x5832('0x3')](_0x56f2cf):0x0;_0x332cb4=_0x5832('0x4')===typeof _0x332cb4?',':_0x332cb4;_0x51af62=_0x5832('0x4')===typeof _0x51af62?'.':_0x51af62;var _0x365843='',_0x365843=function(_0x31dcad,_0x324792){var _0x56f2cf=Math[_0x5832('0x5')](0xa,_0x324792);return''+(Math[_0x5832('0x6')](_0x31dcad*_0x56f2cf)/_0x56f2cf)[_0x5832('0x7')](_0x324792);},_0x365843=(_0x56f2cf?_0x365843(_0x1511db,_0x56f2cf):''+Math[_0x5832('0x6')](_0x1511db))['split']('.');0x3<_0x365843[0x0][_0x5832('0x8')]&&(_0x365843[0x0]=_0x365843[0x0][_0x5832('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x332cb4));(_0x365843[0x1]||'')[_0x5832('0x8')]<_0x56f2cf&&(_0x365843[0x1]=_0x365843[0x1]||'',_0x365843[0x1]+=Array(_0x56f2cf-_0x365843[0x1][_0x5832('0x8')]+0x1)[_0x5832('0x9')]('0'));return _0x365843[_0x5832('0x9')](_0x51af62);};(function(){'use strict';try{window[_0x5832('0xa')]=window[_0x5832('0xa')]||{};window[_0x5832('0xa')][_0x5832('0xb')]=window[_0x5832('0xa')][_0x5832('0xb')]||$[_0x5832('0xc')]();}catch(_0x281b87){if(typeof console!=='undefined'&&typeof console[_0x5832('0xd')]===_0x5832('0xe'))console[_0x5832('0xd')](_0x5832('0xf'),_0x281b87[_0x5832('0x10')]);}}());(function(_0x454cd1){'use strict';try{var _0x39804c=jQuery;var _0x5eabe8=_0x5832('0x11');var _0x5d05b4=function(_0x386f95,_0x508960){if(_0x5832('0x12')===typeof console&&_0x5832('0x4')!==typeof console[_0x5832('0xd')]&&_0x5832('0x4')!==typeof console[_0x5832('0x13')]&&'undefined'!==typeof console[_0x5832('0x14')]){var _0x35282c;_0x5832('0x12')===typeof _0x386f95?(_0x386f95[_0x5832('0x15')]('['+_0x5eabe8+']\x0a'),_0x35282c=_0x386f95):_0x35282c=['['+_0x5eabe8+']\x0a'+_0x386f95];if(_0x5832('0x4')===typeof _0x508960||_0x5832('0x16')!==_0x508960[_0x5832('0x17')]()&&_0x5832('0x18')!==_0x508960[_0x5832('0x17')]())if(_0x5832('0x4')!==typeof _0x508960&&_0x5832('0x13')===_0x508960['toLowerCase']())try{console['info'][_0x5832('0x19')](console,_0x35282c);}catch(_0x2d1fe1){try{console[_0x5832('0x13')](_0x35282c[_0x5832('0x9')]('\x0a'));}catch(_0x2b4a28){}}else try{console[_0x5832('0xd')][_0x5832('0x19')](console,_0x35282c);}catch(_0x2c8064){try{console['error'](_0x35282c[_0x5832('0x9')]('\x0a'));}catch(_0x3d2483){}}else try{console[_0x5832('0x14')][_0x5832('0x19')](console,_0x35282c);}catch(_0x2b8112){try{console[_0x5832('0x14')](_0x35282c[_0x5832('0x9')]('\x0a'));}catch(_0x24c346){}}}};window[_0x5832('0x1a')]=window[_0x5832('0x1a')]||{};window[_0x5832('0x1a')][_0x5832('0x1b')]=!![];_0x39804c['QD_dropDownCart']=function(){};_0x39804c['fn'][_0x5832('0x1c')]=function(){return{'fn':new _0x39804c()};};var _0x1dd8c8=function(_0x599a29){var _0x9ea334={'y':_0x5832('0x1d')};return function(_0x3e2486){var _0x49cf2d,_0x251c62,_0x507ba1,_0x76d436;_0x251c62=function(_0x599f79){return _0x599f79;};_0x507ba1=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3e2486=_0x3e2486['d'+_0x507ba1[0x10]+'c'+_0x507ba1[0x11]+'m'+_0x251c62(_0x507ba1[0x1])+'n'+_0x507ba1[0xd]]['l'+_0x507ba1[0x12]+'c'+_0x507ba1[0x0]+'ti'+_0x251c62('o')+'n'];_0x49cf2d=function(_0x2d58fc){return escape(encodeURIComponent(_0x2d58fc[_0x5832('0x2')](/\./g,'¨')[_0x5832('0x2')](/[a-zA-Z]/g,function(_0x12c127){return String['fromCharCode'](('Z'>=_0x12c127?0x5a:0x7a)>=(_0x12c127=_0x12c127[_0x5832('0x1e')](0x0)+0xd)?_0x12c127:_0x12c127-0x1a);})));};var _0x46936e=_0x49cf2d(_0x3e2486[[_0x507ba1[0x9],_0x251c62('o'),_0x507ba1[0xc],_0x507ba1[_0x251c62(0xd)]][_0x5832('0x9')]('')]);_0x49cf2d=_0x49cf2d((window[['js',_0x251c62('no'),'m',_0x507ba1[0x1],_0x507ba1[0x4][_0x5832('0x1f')](),_0x5832('0x20')][_0x5832('0x9')]('')]||_0x5832('0x21'))+['.v',_0x507ba1[0xd],'e',_0x251c62('x'),'co',_0x251c62('mm'),_0x5832('0x22'),_0x507ba1[0x1],'.c',_0x251c62('o'),'m.',_0x507ba1[0x13],'r']['join'](''));for(var _0x396d6d in _0x9ea334){if(_0x49cf2d===_0x396d6d+_0x9ea334[_0x396d6d]||_0x46936e===_0x396d6d+_0x9ea334[_0x396d6d]){_0x76d436='tr'+_0x507ba1[0x11]+'e';break;}_0x76d436='f'+_0x507ba1[0x0]+'ls'+_0x251c62(_0x507ba1[0x1])+'';}_0x251c62=!0x1;-0x1<_0x3e2486[[_0x507ba1[0xc],'e',_0x507ba1[0x0],'rc',_0x507ba1[0x9]][_0x5832('0x9')]('')][_0x5832('0x23')](_0x5832('0x24'))&&(_0x251c62=!0x0);return[_0x76d436,_0x251c62];}(_0x599a29);}(window);if(!eval(_0x1dd8c8[0x0]))return _0x1dd8c8[0x1]?_0x5d05b4(_0x5832('0x25')):!0x1;_0x39804c[_0x5832('0x1c')]=function(_0x250c4f,_0x576889){var _0x6de74e,_0x1375e1,_0x535f48,_0x3159dd,_0x4deeee,_0x189c22,_0x49938e,_0x22cde0,_0x48e38b,_0x339565,_0x8ce73c,_0x5f3ce8;_0x8ce73c=_0x39804c(_0x250c4f);if(!_0x8ce73c[_0x5832('0x8')])return _0x8ce73c;_0x6de74e={'updateOnlyHover':!![],'texts':{'linkCart':_0x5832('0x26'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x5832('0x27'),'emptyCart':'Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','continueShopping':'Continuar\x20Comprando','shippingForm':_0x5832('0x28')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x1088ce){return _0x1088ce[_0x5832('0x29')]||_0x1088ce[_0x5832('0x2a')];},'callback':function(){},'callbackProductsList':function(){}};_0x1375e1=_0x39804c[_0x5832('0x2b')](!![],{},_0x6de74e,_0x576889);_0x535f48=_0x39804c('');_0x339565=this;if(_0x1375e1[_0x5832('0x2c')]){var _0x481933=![];if(typeof window[_0x5832('0x2d')]===_0x5832('0x4')){_0x5d05b4(_0x5832('0x2e'));_0x39804c['ajax']({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':![],'dataType':'script','error':function(){_0x5d05b4(_0x5832('0x2f'));_0x481933=!![];}});}if(_0x481933)return _0x5d05b4(_0x5832('0x30'));}var _0x5df251;if(typeof window[_0x5832('0x2d')]===_0x5832('0x12')&&typeof window[_0x5832('0x2d')]['checkout']!==_0x5832('0x4'))_0x5df251=window[_0x5832('0x2d')][_0x5832('0x31')];else if(typeof vtex==='object'&&typeof vtex['checkout']===_0x5832('0x12')&&typeof vtex[_0x5832('0x31')][_0x5832('0x32')]!=='undefined')_0x5df251=new vtex[(_0x5832('0x31'))][(_0x5832('0x32'))]();else return _0x5d05b4(_0x5832('0x33'));_0x339565['cartContainer']=_0x5832('0x34')+_0x5832('0x35')+_0x5832('0x36')+_0x5832('0x37')+_0x5832('0x38')+_0x5832('0x39')+_0x5832('0x3a')+_0x5832('0x3b')+_0x5832('0x3c')+_0x5832('0x3d')+_0x5832('0x3e')+_0x5832('0x3f')+_0x5832('0x40');_0x189c22=function(_0x344242){var _0x18c9d2=_0x39804c(_0x344242);_0x1375e1[_0x5832('0x41')][_0x5832('0x42')]=_0x1375e1['texts'][_0x5832('0x42')][_0x5832('0x2')](_0x5832('0x43'),_0x5832('0x44'));_0x1375e1[_0x5832('0x41')][_0x5832('0x42')]=_0x1375e1['texts']['cartTotal'][_0x5832('0x2')]('#items',_0x5832('0x45'));_0x1375e1[_0x5832('0x41')][_0x5832('0x42')]=_0x1375e1[_0x5832('0x41')][_0x5832('0x42')][_0x5832('0x2')](_0x5832('0x46'),_0x5832('0x47'));_0x1375e1['texts'][_0x5832('0x42')]=_0x1375e1[_0x5832('0x41')][_0x5832('0x42')][_0x5832('0x2')](_0x5832('0x48'),_0x5832('0x49'));_0x18c9d2[_0x5832('0x4a')](_0x5832('0x4b'))['html'](_0x1375e1[_0x5832('0x41')]['linkCart']);_0x18c9d2[_0x5832('0x4a')](_0x5832('0x4c'))[_0x5832('0x4d')](_0x1375e1[_0x5832('0x41')]['continueShopping']);_0x18c9d2[_0x5832('0x4a')](_0x5832('0x4e'))['html'](_0x1375e1[_0x5832('0x41')]['linkCheckout']);_0x18c9d2[_0x5832('0x4a')](_0x5832('0x4f'))[_0x5832('0x4d')](_0x1375e1[_0x5832('0x41')][_0x5832('0x42')]);_0x18c9d2[_0x5832('0x4a')]('.qd-ddc-shipping')[_0x5832('0x4d')](_0x1375e1['texts'][_0x5832('0x50')]);_0x18c9d2['find'](_0x5832('0x51'))[_0x5832('0x4d')](_0x1375e1['texts'][_0x5832('0x52')]);return _0x18c9d2;};_0x4deeee=function(_0x37ca94){_0x39804c(this)[_0x5832('0x53')](_0x37ca94);_0x37ca94[_0x5832('0x4a')](_0x5832('0x54'))[_0x5832('0x55')](_0x39804c('.qd_ddc_lightBoxOverlay'))['on'](_0x5832('0x56'),function(){_0x8ce73c[_0x5832('0x57')](_0x5832('0x58'));_0x39804c(document[_0x5832('0x59')])[_0x5832('0x57')](_0x5832('0x5a'));});_0x39804c(document)[_0x5832('0x5b')](_0x5832('0x5c'))['on'](_0x5832('0x5c'),function(_0x4d1122){if(_0x4d1122['keyCode']==0x1b){_0x8ce73c[_0x5832('0x57')](_0x5832('0x58'));_0x39804c(document[_0x5832('0x59')])[_0x5832('0x57')](_0x5832('0x5a'));}});var _0x2f22de=_0x37ca94['find'](_0x5832('0x5d'));_0x37ca94['find'](_0x5832('0x5e'))['on'](_0x5832('0x5f'),function(){_0x339565[_0x5832('0x60')]('-',undefined,undefined,_0x2f22de);return![];});_0x37ca94[_0x5832('0x4a')](_0x5832('0x61'))['on']('click.qd_ddc_scrollDown',function(){_0x339565[_0x5832('0x60')](undefined,undefined,undefined,_0x2f22de);return![];});var _0x10c3a7=_0x37ca94[_0x5832('0x4a')](_0x5832('0x62'));_0x37ca94['find']('.qd-ddc-shipping\x20.qd-ddc-cep')[_0x5832('0x63')]('')['on']('keyup.qd_ddc_cep',function(_0x1d76c8){_0x339565[_0x5832('0x64')](_0x39804c(this));if(_0x1d76c8[_0x5832('0x65')]==0xd)_0x37ca94['find']('.qd-ddc-shipping\x20.qd-ddc-cep-ok')['click']();});_0x37ca94[_0x5832('0x4a')](_0x5832('0x66'))[_0x5832('0x67')](function(_0x1ec9cc){_0x1ec9cc[_0x5832('0x68')]();_0x10c3a7[_0x5832('0x69')]();});_0x37ca94[_0x5832('0x4a')](_0x5832('0x6a'))[_0x5832('0x67')](function(_0x422f06){_0x422f06[_0x5832('0x68')]();_0x10c3a7['hide']();});_0x39804c(document)[_0x5832('0x5b')](_0x5832('0x6b'))['on']('click._QD_DDC_closeShipping',function(_0x3de145){if(_0x39804c(_0x3de145['target'])[_0x5832('0x1')](_0x37ca94['find']('.qd-ddc-cep-tooltip'))[_0x5832('0x8')])return;_0x10c3a7['hide']();});_0x37ca94['find'](_0x5832('0x6c'))[_0x5832('0x67')](function(_0x385530){_0x385530[_0x5832('0x68')]();_0x339565[_0x5832('0x6d')](_0x37ca94[_0x5832('0x4a')](_0x5832('0x6e')));});if(_0x1375e1[_0x5832('0x6f')]){var _0x4cda33=0x0;_0x39804c(this)['on'](_0x5832('0x70'),function(){var _0x572859=function(){if(!window[_0x5832('0x1a')][_0x5832('0x1b')])return;_0x339565[_0x5832('0x71')]();window[_0x5832('0x1a')][_0x5832('0x1b')]=![];_0x39804c['fn'][_0x5832('0x72')](!![]);_0x339565['cartIsEmpty']();};_0x4cda33=setInterval(function(){_0x572859();},0x258);_0x572859();});_0x39804c(this)['on'](_0x5832('0x73'),function(){clearInterval(_0x4cda33);});}};_0x49938e=_0x189c22(this[_0x5832('0x74')]);_0x22cde0=0x0;_0x8ce73c['each'](function(){if(_0x22cde0>0x0)_0x4deeee[_0x5832('0x75')](this,_0x49938e['clone']());else _0x4deeee[_0x5832('0x75')](this,_0x49938e);_0x22cde0++;});window[_0x5832('0xa')]['callback'][_0x5832('0x55')](function(){_0x39804c(_0x5832('0x76'))['html'](window[_0x5832('0xa')][_0x5832('0x77')]||'--');_0x39804c(_0x5832('0x78'))[_0x5832('0x4d')](window[_0x5832('0xa')][_0x5832('0x79')]||'0');_0x39804c(_0x5832('0x7a'))[_0x5832('0x4d')](window['_QuatroDigital_CartData']['shipping']||'--');_0x39804c(_0x5832('0x7b'))[_0x5832('0x4d')](window[_0x5832('0xa')][_0x5832('0x7c')]||'--');});_0x48e38b=function(_0x32577f){_0x5d05b4(_0x5832('0x7d'));};_0x5f3ce8=function(_0x234bfd,_0x19780e){if(typeof _0x234bfd[_0x5832('0x7e')]===_0x5832('0x4'))return _0x5d05b4(_0x5832('0x7f'));_0x339565['renderProductsList']['call'](this,_0x19780e);};_0x339565[_0x5832('0x71')]=function(_0x21b8a1,_0x1eb5a5){var _0x560524;if(typeof _0x1eb5a5!=_0x5832('0x4'))window[_0x5832('0x1a')][_0x5832('0x80')]=_0x1eb5a5;else if(window['_QuatroDigital_DropDown'][_0x5832('0x80')])_0x1eb5a5=window['_QuatroDigital_DropDown'][_0x5832('0x80')];setTimeout(function(){window[_0x5832('0x1a')][_0x5832('0x80')]=undefined;},_0x1375e1['timeRemoveNewItemClass']);_0x39804c(_0x5832('0x81'))[_0x5832('0x57')](_0x5832('0x82'));if(_0x1375e1['smartCheckout']){_0x560524=function(_0x12bbeb){window[_0x5832('0x1a')][_0x5832('0x83')]=_0x12bbeb;_0x5f3ce8(_0x12bbeb,_0x1eb5a5);if(typeof window['_QuatroDigital_AmountProduct']!==_0x5832('0x4')&&typeof window[_0x5832('0x84')][_0x5832('0x85')]===_0x5832('0xe'))window[_0x5832('0x84')][_0x5832('0x85')][_0x5832('0x75')](this);_0x39804c(_0x5832('0x81'))[_0x5832('0x86')]('qd-ddc-prodLoaded');};if(typeof window[_0x5832('0x1a')][_0x5832('0x83')]!==_0x5832('0x4')){_0x560524(window['_QuatroDigital_DropDown'][_0x5832('0x83')]);if(typeof _0x21b8a1==='function')_0x21b8a1(window['_QuatroDigital_DropDown'][_0x5832('0x83')]);return;}_0x39804c[_0x5832('0x87')]([_0x5832('0x7e'),'totalizers','shippingData'],{'done':function(_0x1c796c){_0x560524[_0x5832('0x75')](this,_0x1c796c);if(typeof _0x21b8a1===_0x5832('0xe'))_0x21b8a1(_0x1c796c);},'fail':function(_0x2cb765){_0x5d05b4([_0x5832('0x88'),_0x2cb765]);}});}else{alert(_0x5832('0x89'));}};_0x339565[_0x5832('0x8a')]=function(){var _0x2b786c=_0x39804c(_0x5832('0x81'));if(_0x2b786c[_0x5832('0x4a')]('.qd-ddc-prodRow')[_0x5832('0x8')])_0x2b786c['removeClass'](_0x5832('0x8b'));else _0x2b786c[_0x5832('0x86')](_0x5832('0x8b'));};_0x339565['renderProductsList']=function(_0x19798c){var _0x41f68f=_0x39804c('.qd-ddc-prodWrapper2');var _0x10637e=_0x5832('0x8c')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>'+'<div\x20class=\x22qd-ddc-prodImgWrapper\x22>'+_0x5832('0x8d')+'<span\x20class=\x22qd-ddc-imgLoading\x22></span>'+_0x5832('0x8e')+_0x5832('0x8e')+_0x5832('0x8f')+_0x5832('0x90')+_0x5832('0x91')+_0x5832('0x92')+_0x5832('0x93')+_0x5832('0x94')+_0x5832('0x95')+'<span\x20class=\x22qd-ddc-qttLoading\x22></span>'+_0x5832('0x8e')+'</div>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>'+'<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>'+_0x5832('0x96')+_0x5832('0x97')+_0x5832('0x8e')+_0x5832('0x8e')+_0x5832('0x8e');_0x41f68f[_0x5832('0x98')]();_0x41f68f['each'](function(){var _0x557c5e=_0x39804c(this);var _0xa6a1a5,_0x2c97a2,_0xd81487,_0x8094b7;var _0x1eafa5=_0x39804c('');var _0x193dea;for(var _0x47c0a0 in window[_0x5832('0x1a')][_0x5832('0x83')][_0x5832('0x7e')]){if(typeof window['_QuatroDigital_DropDown'][_0x5832('0x83')]['items'][_0x47c0a0]!==_0x5832('0x12'))continue;_0xd81487=window[_0x5832('0x1a')][_0x5832('0x83')][_0x5832('0x7e')][_0x47c0a0];_0x193dea=_0xd81487[_0x5832('0x99')][_0x5832('0x2')](/^\/|\/$/g,'')['split']('/');_0x2c97a2=_0x39804c(_0x10637e);_0x2c97a2[_0x5832('0x9a')]({'data-sku':_0xd81487['id'],'data-sku-index':_0x47c0a0,'data-qd-departament':_0x193dea[0x0],'data-qd-category':_0x193dea[_0x193dea['length']-0x1]});_0x2c97a2['addClass'](_0x5832('0x9b')+_0xd81487[_0x5832('0x9c')]);_0x2c97a2['find'](_0x5832('0x9d'))['append'](_0x1375e1[_0x5832('0x29')](_0xd81487));_0x2c97a2['find'](_0x5832('0x9e'))[_0x5832('0x53')](isNaN(_0xd81487[_0x5832('0x9f')])?_0xd81487[_0x5832('0x9f')]:_0xd81487[_0x5832('0x9f')]==0x0?_0x5832('0xa0'):(_0x39804c(_0x5832('0xa1'))[_0x5832('0x9a')](_0x5832('0xa2'))||'R$')+'\x20'+qd_number_format(_0xd81487[_0x5832('0x9f')]/0x64,0x2,',','.'));_0x2c97a2[_0x5832('0x4a')](_0x5832('0xa3'))[_0x5832('0x9a')]({'data-sku':_0xd81487['id'],'data-sku-index':_0x47c0a0})['val'](_0xd81487[_0x5832('0xa4')]);_0x2c97a2[_0x5832('0x4a')]('.qd-ddc-remove')['attr']({'data-sku':_0xd81487['id'],'data-sku-index':_0x47c0a0});_0x339565[_0x5832('0xa5')](_0xd81487['id'],_0x2c97a2[_0x5832('0x4a')]('.qd-ddc-image'),_0xd81487[_0x5832('0xa6')]);_0x2c97a2[_0x5832('0x4a')](_0x5832('0xa7'))['attr']({'data-sku':_0xd81487['id'],'data-sku-index':_0x47c0a0});_0x2c97a2[_0x5832('0xa8')](_0x557c5e);_0x1eafa5=_0x1eafa5[_0x5832('0x55')](_0x2c97a2);}try{var _0x2aec3a=_0x557c5e[_0x5832('0x0')](_0x5832('0x81'))[_0x5832('0x4a')](_0x5832('0xa9'));if(_0x2aec3a[_0x5832('0x8')]&&_0x2aec3a[_0x5832('0x63')]()==''&&window[_0x5832('0x1a')]['getOrderForm'][_0x5832('0xaa')]['address'])_0x2aec3a[_0x5832('0x63')](window[_0x5832('0x1a')][_0x5832('0x83')][_0x5832('0xaa')]['address']['postalCode']);}catch(_0x5dbf27){_0x5d05b4('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x5dbf27[_0x5832('0x10')],_0x5832('0x18'));}_0x339565['actionButtons'](_0x557c5e);_0x339565[_0x5832('0x8a')]();if(_0x19798c&&_0x19798c['lastSku']){(function(){_0x8094b7=_0x1eafa5[_0x5832('0xab')](_0x5832('0xac')+_0x19798c[_0x5832('0xad')]+'\x27]');if(!_0x8094b7[_0x5832('0x8')])return;_0xa6a1a5=0x0;_0x1eafa5[_0x5832('0xae')](function(){var _0x3155c9=_0x39804c(this);if(_0x3155c9['is'](_0x8094b7))return![];_0xa6a1a5+=_0x3155c9[_0x5832('0xaf')]();});_0x339565[_0x5832('0x60')](undefined,undefined,_0xa6a1a5,_0x557c5e[_0x5832('0x55')](_0x557c5e[_0x5832('0xb0')]()));_0x1eafa5[_0x5832('0x57')](_0x5832('0xb1'));(function(_0x36e61d){_0x36e61d['addClass']('qd-ddc-lastAdded');_0x36e61d['addClass'](_0x5832('0xb1'));setTimeout(function(){_0x36e61d[_0x5832('0x57')](_0x5832('0xb2'));},_0x1375e1[_0x5832('0xb3')]);}(_0x8094b7));_0x39804c(document[_0x5832('0x59')])[_0x5832('0x86')](_0x5832('0xb4'));setTimeout(function(){_0x39804c(document['body'])[_0x5832('0x57')](_0x5832('0xb4'));},_0x1375e1[_0x5832('0xb3')]);}());}});(function(){if(_QuatroDigital_DropDown['getOrderForm'][_0x5832('0x7e')][_0x5832('0x8')]){_0x39804c(_0x5832('0x59'))[_0x5832('0x57')]('qd-ddc-cart-empty')[_0x5832('0x86')](_0x5832('0xb5'));setTimeout(function(){_0x39804c(_0x5832('0x59'))[_0x5832('0x57')](_0x5832('0xb6'));},_0x1375e1[_0x5832('0xb3')]);}else _0x39804c(_0x5832('0x59'))[_0x5832('0x57')](_0x5832('0xb7'))[_0x5832('0x86')](_0x5832('0xb8'));}());if(typeof _0x1375e1['callbackProductsList']===_0x5832('0xe'))_0x1375e1['callbackProductsList'][_0x5832('0x75')](this);else _0x5d05b4('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x339565[_0x5832('0xa5')]=function(_0x244537,_0x13c415,_0x5af17d){var _0x5de8ba=!![];function _0x5437c1(){if(_0x1375e1[_0x5832('0xb9')]&&typeof _0x5af17d==_0x5832('0xba'))_0x5af17d=_0x5af17d['replace'](_0x5832('0xbb'),_0x5832('0xbc'));_0x13c415[_0x5832('0x57')]('qd-loaded')[_0x5832('0xbd')](function(){_0x39804c(this)[_0x5832('0x86')]('qd-loaded');})[_0x5832('0x9a')]('src',_0x5af17d);};if(_0x5af17d)_0x5437c1();else if(!isNaN(_0x244537)){alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');}else _0x5d05b4(_0x5832('0xbe'),_0x5832('0x16'));};_0x339565[_0x5832('0xbf')]=function(_0x176be9){var _0x24ea67,_0x5227ea,_0x59cee4,_0x585bec;_0x24ea67=function(_0x34a517,_0x1093e7){var _0x5a512c,_0x53b081,_0x118301,_0x2c414e,_0x5f3e0d;_0x118301=_0x39804c(_0x34a517);_0x5a512c=_0x118301[_0x5832('0x9a')](_0x5832('0xc0'));_0x5f3e0d=_0x118301[_0x5832('0x9a')]('data-sku-index');if(!_0x5a512c)return;_0x53b081=parseInt(_0x118301['val']())||0x1;_0x339565[_0x5832('0xc1')]([_0x5a512c,_0x5f3e0d],_0x53b081,_0x53b081+0x1,function(_0x1a86ab){_0x118301[_0x5832('0x63')](_0x1a86ab);if(typeof _0x1093e7===_0x5832('0xe'))_0x1093e7();});};_0x59cee4=function(_0x3b1a5a,_0x448137){var _0x55d823,_0x26c91e,_0x245b6b,_0x449b49,_0x3b80d3;_0x245b6b=_0x39804c(_0x3b1a5a);_0x55d823=_0x245b6b[_0x5832('0x9a')](_0x5832('0xc0'));_0x3b80d3=_0x245b6b[_0x5832('0x9a')](_0x5832('0xc2'));if(!_0x55d823)return;_0x26c91e=parseInt(_0x245b6b[_0x5832('0x63')]())||0x2;_0x449b49=_0x339565[_0x5832('0xc1')]([_0x55d823,_0x3b80d3],_0x26c91e,_0x26c91e-0x1,function(_0x9593a){_0x245b6b['val'](_0x9593a);if(typeof _0x448137===_0x5832('0xe'))_0x448137();});};_0x585bec=function(_0x838a9e,_0x3f7d88){var _0x343212,_0x2f3ba6,_0x231a75,_0x375185,_0x47d476;_0x231a75=_0x39804c(_0x838a9e);_0x343212=_0x231a75['attr'](_0x5832('0xc0'));_0x47d476=_0x231a75[_0x5832('0x9a')](_0x5832('0xc2'));if(!_0x343212)return;_0x2f3ba6=parseInt(_0x231a75[_0x5832('0x63')]())||0x1;_0x375185=_0x339565['changeQantity']([_0x343212,_0x47d476],0x1,_0x2f3ba6,function(_0x5e145d){_0x231a75[_0x5832('0x63')](_0x5e145d);if(typeof _0x3f7d88===_0x5832('0xe'))_0x3f7d88();});};_0x5227ea=_0x176be9[_0x5832('0x4a')](_0x5832('0xc3'));_0x5227ea[_0x5832('0x86')](_0x5832('0xc4'))[_0x5832('0xae')](function(){var _0x3201b9=_0x39804c(this);_0x3201b9[_0x5832('0x4a')](_0x5832('0xc5'))['on']('click.qd_ddc_more',function(_0x1c5654){_0x1c5654['preventDefault']();_0x5227ea['addClass'](_0x5832('0xc6'));_0x24ea67(_0x3201b9[_0x5832('0x4a')]('.qd-ddc-quantity'),function(){_0x5227ea['removeClass'](_0x5832('0xc6'));});});_0x3201b9[_0x5832('0x4a')](_0x5832('0xc7'))['on'](_0x5832('0xc8'),function(_0x1fc062){_0x1fc062[_0x5832('0x68')]();_0x5227ea[_0x5832('0x86')](_0x5832('0xc6'));_0x59cee4(_0x3201b9[_0x5832('0x4a')](_0x5832('0xa3')),function(){_0x5227ea['removeClass'](_0x5832('0xc6'));});});_0x3201b9[_0x5832('0x4a')](_0x5832('0xa3'))['on'](_0x5832('0xc9'),function(){_0x5227ea[_0x5832('0x86')]('qd-loading');_0x585bec(this,function(){_0x5227ea['removeClass']('qd-loading');});});_0x3201b9[_0x5832('0x4a')](_0x5832('0xa3'))['on'](_0x5832('0xca'),function(_0x2effb4){if(_0x2effb4[_0x5832('0x65')]!=0xd)return;_0x5227ea[_0x5832('0x86')](_0x5832('0xc6'));_0x585bec(this,function(){_0x5227ea[_0x5832('0x57')](_0x5832('0xc6'));});});});_0x176be9[_0x5832('0x4a')](_0x5832('0xcb'))[_0x5832('0xae')](function(){var _0x46b849=_0x39804c(this);_0x46b849['find'](_0x5832('0xcc'))['on'](_0x5832('0xcd'),function(){var _0x5c443d;_0x46b849[_0x5832('0x86')](_0x5832('0xc6'));_0x339565[_0x5832('0xce')](_0x39804c(this),function(_0x272fcd){if(_0x272fcd)_0x46b849[_0x5832('0xcf')](!![])[_0x5832('0xd0')](function(){_0x46b849[_0x5832('0xd1')]();_0x339565[_0x5832('0x8a')]();});else _0x46b849[_0x5832('0x57')]('qd-loading');});return![];});});};_0x339565[_0x5832('0x64')]=function(_0x5a0364){var _0xf95d13=_0x5a0364[_0x5832('0x63')]();_0xf95d13=_0xf95d13[_0x5832('0x2')](/[^0-9\-]/g,'');_0xf95d13=_0xf95d13[_0x5832('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0xf95d13=_0xf95d13[_0x5832('0x2')](/(.{9}).*/g,'$1');_0x5a0364[_0x5832('0x63')](_0xf95d13);};_0x339565[_0x5832('0x6d')]=function(_0x268c0d){var _0x32cc82=_0x268c0d[_0x5832('0x63')]();if(_0x32cc82[_0x5832('0x8')]>=0x9){if(_0x268c0d[_0x5832('0xd2')]('qdDdcLastPostalCode')!=_0x32cc82){_0x5df251[_0x5832('0xd3')]({'postalCode':_0x32cc82,'country':_0x5832('0xd4')})[_0x5832('0xd5')](function(_0x4b6c46){_0x268c0d['closest'](_0x5832('0xd6'))[_0x5832('0x4a')](_0x5832('0xd7'))[_0x5832('0xd1')]();window['_QuatroDigital_DropDown'][_0x5832('0x83')]=_0x4b6c46;_0x339565['getCartInfoByUrl']();var _0x1c6b04=_0x4b6c46[_0x5832('0xaa')]['logisticsInfo'][0x0][_0x5832('0xd8')];var _0x4b9fa5=_0x39804c(_0x5832('0xd9'));for(var _0x388981=0x0;_0x388981<_0x1c6b04[_0x5832('0x8')];_0x388981++){var _0x7912a=_0x1c6b04[_0x388981];var _0x1ab27b=_0x7912a[_0x5832('0xda')]>0x1?_0x7912a[_0x5832('0xda')][_0x5832('0x2')]('bd',_0x5832('0xdb')):_0x7912a[_0x5832('0xda')][_0x5832('0x2')]('bd',_0x5832('0xdc'));var _0x17ab20=_0x39804c(_0x5832('0xdd'));_0x17ab20[_0x5832('0x53')]('<td>\x20R$\x20'+qd_number_format(_0x7912a[_0x5832('0xde')]/0x64,0x2,',','.')+_0x5832('0xdf')+_0x7912a[_0x5832('0x2a')]+',\x20entrega\x20em\x20'+_0x1ab27b+_0x5832('0xe0')+_0x32cc82+'</td>');_0x17ab20['appendTo'](_0x4b9fa5[_0x5832('0x4a')](_0x5832('0xe1')));}_0x4b9fa5['insertBefore'](_0x268c0d['closest'](_0x5832('0xd6'))[_0x5832('0x4a')](_0x5832('0x6a')));})[_0x5832('0xe2')](function(_0x580155){_0x5d05b4([_0x5832('0xe3'),_0x580155]);updateCartData();});}_0x268c0d[_0x5832('0xd2')](_0x5832('0xe4'),_0x32cc82);}};_0x339565['changeQantity']=function(_0xcbe548,_0x3d0f9d,_0x4b98e9,_0x25c6b5){var _0x92d9a3=_0x4b98e9||0x1;if(_0x92d9a3<0x1)return _0x3d0f9d;if(_0x1375e1[_0x5832('0x2c')]){if(typeof window[_0x5832('0x1a')][_0x5832('0x83')][_0x5832('0x7e')][_0xcbe548[0x1]]===_0x5832('0x4')){_0x5d05b4(_0x5832('0xe5')+_0xcbe548[0x1]+']');return _0x3d0f9d;}window[_0x5832('0x1a')]['getOrderForm'][_0x5832('0x7e')][_0xcbe548[0x1]][_0x5832('0xa4')]=_0x92d9a3;window['_QuatroDigital_DropDown'][_0x5832('0x83')][_0x5832('0x7e')][_0xcbe548[0x1]][_0x5832('0xe6')]=_0xcbe548[0x1];_0x5df251[_0x5832('0xe7')]([window[_0x5832('0x1a')][_0x5832('0x83')][_0x5832('0x7e')][_0xcbe548[0x1]]],['items',_0x5832('0xe8'),_0x5832('0xaa')])[_0x5832('0xd5')](function(_0x18c36c){window[_0x5832('0x1a')][_0x5832('0x83')]=_0x18c36c;_0x33cf70(!![]);})[_0x5832('0xe2')](function(_0x433423){_0x5d05b4(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0x433423]);_0x33cf70();});}else{_0x5d05b4('atenção\x20esta\x20método\x20esta\x20descontinuado');}function _0x33cf70(_0x2724ed){_0x2724ed=typeof _0x2724ed!==_0x5832('0xe9')?![]:_0x2724ed;_0x339565[_0x5832('0x71')]();window['_QuatroDigital_DropDown'][_0x5832('0x1b')]=![];_0x339565[_0x5832('0x8a')]();if(typeof window[_0x5832('0x84')]!==_0x5832('0x4')&&typeof window[_0x5832('0x84')]['exec']===_0x5832('0xe'))window[_0x5832('0x84')][_0x5832('0x85')][_0x5832('0x75')](this);if(typeof adminCart==='function')adminCart();_0x39804c['fn'][_0x5832('0x72')](!![],undefined,_0x2724ed);if(typeof _0x25c6b5===_0x5832('0xe'))_0x25c6b5(_0x3d0f9d);};};_0x339565[_0x5832('0xce')]=function(_0x3ea945,_0x4eaab6){var _0xce505b=![];var _0x1d1153=_0x39804c(_0x3ea945);var _0x520381=_0x1d1153[_0x5832('0x9a')](_0x5832('0xc2'));if(_0x1375e1[_0x5832('0x2c')]){if(typeof window[_0x5832('0x1a')][_0x5832('0x83')][_0x5832('0x7e')][_0x520381]==='undefined'){_0x5d05b4('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x520381+']');return _0xce505b;}window['_QuatroDigital_DropDown']['getOrderForm']['items'][_0x520381]['index']=_0x520381;_0x5df251[_0x5832('0xea')]([window[_0x5832('0x1a')][_0x5832('0x83')][_0x5832('0x7e')][_0x520381]],[_0x5832('0x7e'),'totalizers','shippingData'])['done'](function(_0x383bcf){_0xce505b=!![];window[_0x5832('0x1a')][_0x5832('0x83')]=_0x383bcf;_0x5f3ce8(_0x383bcf);_0x2bb431(!![]);})[_0x5832('0xe2')](function(_0x148034){_0x5d05b4([_0x5832('0xeb'),_0x148034]);_0x2bb431();});}else{alert(_0x5832('0xec'));}function _0x2bb431(_0x320e31){_0x320e31=typeof _0x320e31!=='boolean'?![]:_0x320e31;if(typeof window[_0x5832('0x84')]!=='undefined'&&typeof window[_0x5832('0x84')][_0x5832('0x85')]==='function')window['_QuatroDigital_AmountProduct'][_0x5832('0x85')]['call'](this);if(typeof adminCart===_0x5832('0xe'))adminCart();_0x39804c['fn']['simpleCart'](!![],undefined,_0x320e31);if(typeof _0x4eaab6===_0x5832('0xe'))_0x4eaab6(_0xce505b);};};_0x339565[_0x5832('0x60')]=function(_0x3d8bde,_0x4357dc,_0x554829,_0x1538f3){var _0x3c5a77=_0x1538f3||_0x39804c(_0x5832('0xed'));var _0x3b2a11=_0x3d8bde||'+';var _0x113e52=_0x4357dc||_0x3c5a77['height']()*0.9;_0x3c5a77[_0x5832('0xcf')](!![],!![])[_0x5832('0xee')]({'scrollTop':isNaN(_0x554829)?_0x3b2a11+'='+_0x113e52+'px':_0x554829});};if(!_0x1375e1[_0x5832('0x6f')]){_0x339565['getCartInfoByUrl']();_0x39804c['fn']['simpleCart'](!![]);}_0x39804c(window)['on'](_0x5832('0xef'),function(){try{window[_0x5832('0x1a')][_0x5832('0x83')]=undefined;_0x339565['getCartInfoByUrl']();}catch(_0x325c06){_0x5d05b4('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x325c06['message'],'avisso');}});if(typeof _0x1375e1[_0x5832('0xb')]===_0x5832('0xe'))_0x1375e1[_0x5832('0xb')][_0x5832('0x75')](this);else _0x5d05b4(_0x5832('0xf0'));};_0x39804c['fn']['QD_dropDownCart']=function(_0x5f37a4){var _0x5aba50;_0x5aba50=_0x39804c(this);_0x5aba50['fn']=new _0x39804c['QD_dropDownCart'](this,_0x5f37a4);return _0x5aba50;};}catch(_0x25d198){if(typeof console!==_0x5832('0x4')&&typeof console[_0x5832('0xd')]==='function')console['error'](_0x5832('0xf'),_0x25d198);}}(this));(function(_0x239cab){'use strict';try{var _0xf5fae6=jQuery;var _0x5091d9='Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart';var _0x6e0aa4=function(_0x2e20ab,_0x1bf322){if('object'===typeof console&&_0x5832('0x4')!==typeof console[_0x5832('0xd')]&&_0x5832('0x4')!==typeof console[_0x5832('0x13')]&&_0x5832('0x4')!==typeof console[_0x5832('0x14')]){var _0x28ac4d;'object'===typeof _0x2e20ab?(_0x2e20ab[_0x5832('0x15')]('['+_0x5091d9+']\x0a'),_0x28ac4d=_0x2e20ab):_0x28ac4d=['['+_0x5091d9+']\x0a'+_0x2e20ab];if(_0x5832('0x4')===typeof _0x1bf322||_0x5832('0x16')!==_0x1bf322['toLowerCase']()&&_0x5832('0x18')!==_0x1bf322['toLowerCase']())if(_0x5832('0x4')!==typeof _0x1bf322&&_0x5832('0x13')===_0x1bf322['toLowerCase']())try{console[_0x5832('0x13')][_0x5832('0x19')](console,_0x28ac4d);}catch(_0x3213e1){try{console['info'](_0x28ac4d[_0x5832('0x9')]('\x0a'));}catch(_0x596e13){}}else try{console['error'][_0x5832('0x19')](console,_0x28ac4d);}catch(_0x46077f){try{console[_0x5832('0xd')](_0x28ac4d['join']('\x0a'));}catch(_0x54448e){}}else try{console[_0x5832('0x14')]['apply'](console,_0x28ac4d);}catch(_0x399a73){try{console[_0x5832('0x14')](_0x28ac4d[_0x5832('0x9')]('\x0a'));}catch(_0x577a2e){}}}};window[_0x5832('0x84')]=window[_0x5832('0x84')]||{};window['_QuatroDigital_AmountProduct'][_0x5832('0x7e')]={};window[_0x5832('0x84')][_0x5832('0xf1')]=![];window[_0x5832('0x84')][_0x5832('0xf2')]=![];window[_0x5832('0x84')][_0x5832('0xf3')]=![];var _0x185c40=_0x5832('0xf4');var _0x2149d0=function(){var _0x403713,_0x2f93bc,_0x4f7f3e,_0x237cd1;_0x237cd1=_0x222bb6();if(window['_QuatroDigital_AmountProduct'][_0x5832('0xf1')]){_0xf5fae6(_0x5832('0xf5'))[_0x5832('0xd1')]();_0xf5fae6(_0x5832('0xf6'))[_0x5832('0x57')](_0x5832('0xf7'));}for(var _0x12f6dd in window[_0x5832('0x84')][_0x5832('0x7e')]){_0x403713=window['_QuatroDigital_AmountProduct'][_0x5832('0x7e')][_0x12f6dd];if(typeof _0x403713!==_0x5832('0x12'))return;_0x4f7f3e=_0xf5fae6('input.qd-productId[value='+_0x403713[_0x5832('0xf8')]+']')[_0x5832('0x0')]('li');if(!window[_0x5832('0x84')][_0x5832('0xf1')]&&_0x4f7f3e[_0x5832('0x4a')](_0x5832('0xf5'))[_0x5832('0x8')])continue;_0x2f93bc=_0xf5fae6(_0x185c40);_0x2f93bc[_0x5832('0x4a')](_0x5832('0xf9'))[_0x5832('0x4d')](_0x403713[_0x5832('0x79')]);var _0x508fc4=_0x4f7f3e[_0x5832('0x4a')](_0x5832('0xfa'));if(_0x508fc4[_0x5832('0x8')])_0x508fc4[_0x5832('0xfb')](_0x2f93bc)[_0x5832('0x86')](_0x5832('0xf7'));else _0x4f7f3e[_0x5832('0xfb')](_0x2f93bc);}if(_0x237cd1)window[_0x5832('0x84')][_0x5832('0xf1')]=![];};var _0x222bb6=function(){if(!window['_QuatroDigital_AmountProduct']['allowRecalculate'])return;var _0x1c73cd=![],_0x2cede8={};window['_QuatroDigital_AmountProduct']['items']={};for(var _0xb71a69 in window[_0x5832('0x1a')][_0x5832('0x83')][_0x5832('0x7e')]){if(typeof window['_QuatroDigital_DropDown'][_0x5832('0x83')][_0x5832('0x7e')][_0xb71a69]!=='object')continue;var _0x3685b1=window[_0x5832('0x1a')]['getOrderForm'][_0x5832('0x7e')][_0xb71a69];if(typeof _0x3685b1[_0x5832('0xfc')]===_0x5832('0x4')||_0x3685b1[_0x5832('0xfc')]===null||_0x3685b1[_0x5832('0xfc')]==='')continue;window[_0x5832('0x84')][_0x5832('0x7e')][_0x5832('0xfd')+_0x3685b1[_0x5832('0xfc')]]=window[_0x5832('0x84')][_0x5832('0x7e')][_0x5832('0xfd')+_0x3685b1[_0x5832('0xfc')]]||{};window[_0x5832('0x84')][_0x5832('0x7e')][_0x5832('0xfd')+_0x3685b1[_0x5832('0xfc')]]['prodId']=_0x3685b1[_0x5832('0xfc')];if(!_0x2cede8[_0x5832('0xfd')+_0x3685b1['productId']])window['_QuatroDigital_AmountProduct']['items'][_0x5832('0xfd')+_0x3685b1[_0x5832('0xfc')]][_0x5832('0x79')]=0x0;window[_0x5832('0x84')][_0x5832('0x7e')][_0x5832('0xfd')+_0x3685b1[_0x5832('0xfc')]]['qtt']=window[_0x5832('0x84')][_0x5832('0x7e')][_0x5832('0xfd')+_0x3685b1['productId']][_0x5832('0x79')]+_0x3685b1['quantity'];_0x1c73cd=!![];_0x2cede8[_0x5832('0xfd')+_0x3685b1[_0x5832('0xfc')]]=!![];}return _0x1c73cd;};window[_0x5832('0x84')]['exec']=function(){window['_QuatroDigital_AmountProduct'][_0x5832('0xf1')]=!![];_0x2149d0[_0x5832('0x75')](this);};_0xf5fae6(document)[_0x5832('0xfe')](function(){_0x2149d0[_0x5832('0x75')](this);});}catch(_0x59df89){if(typeof console!==_0x5832('0x4')&&typeof console['error']===_0x5832('0xe'))console[_0x5832('0xd')](_0x5832('0xf'),_0x59df89);}}(this));(function(){'use strict';try{var _0x88d916=jQuery,_0x2d8768;var _0x927935=_0x5832('0xff');var _0x491a6e=function(_0x4ab232,_0x54dcc4){if('object'===typeof console&&_0x5832('0x4')!==typeof console[_0x5832('0xd')]&&'undefined'!==typeof console['info']&&_0x5832('0x4')!==typeof console[_0x5832('0x14')]){var _0x37d621;_0x5832('0x12')===typeof _0x4ab232?(_0x4ab232[_0x5832('0x15')]('['+_0x927935+']\x0a'),_0x37d621=_0x4ab232):_0x37d621=['['+_0x927935+']\x0a'+_0x4ab232];if(_0x5832('0x4')===typeof _0x54dcc4||'alerta'!==_0x54dcc4[_0x5832('0x17')]()&&_0x5832('0x18')!==_0x54dcc4[_0x5832('0x17')]())if('undefined'!==typeof _0x54dcc4&&_0x5832('0x13')===_0x54dcc4[_0x5832('0x17')]())try{console['info'][_0x5832('0x19')](console,_0x37d621);}catch(_0x6aa80d){try{console[_0x5832('0x13')](_0x37d621[_0x5832('0x9')]('\x0a'));}catch(_0x164a7d){}}else try{console['error'][_0x5832('0x19')](console,_0x37d621);}catch(_0xc782a4){try{console[_0x5832('0xd')](_0x37d621[_0x5832('0x9')]('\x0a'));}catch(_0x561dba){}}else try{console[_0x5832('0x14')][_0x5832('0x19')](console,_0x37d621);}catch(_0x55cff5){try{console[_0x5832('0x14')](_0x37d621[_0x5832('0x9')]('\x0a'));}catch(_0x1cb3d1){}}}};var _0x4cab57={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x88d916[_0x5832('0x100')]=function(_0x1dfa5d){var _0x4caa30,_0x64d566={};_0x2d8768=_0x88d916[_0x5832('0x2b')](!![],{},_0x4cab57,_0x1dfa5d);_0x4caa30=_0x88d916(_0x2d8768['selector'])[_0x5832('0x1c')](_0x2d8768[_0x5832('0x101')]);if(typeof _0x2d8768[_0x5832('0x101')][_0x5832('0x6f')]!==_0x5832('0x4')&&_0x2d8768['dropDown'][_0x5832('0x6f')]===![])_0x64d566['buyButton']=_0x88d916(_0x2d8768[_0x5832('0x102')])[_0x5832('0x103')](_0x4caa30['fn'],_0x2d8768[_0x5832('0x104')]);else _0x64d566[_0x5832('0x104')]=_0x88d916(_0x2d8768[_0x5832('0x102')])['QD_buyButton'](_0x2d8768[_0x5832('0x104')]);_0x64d566[_0x5832('0x101')]=_0x4caa30;return _0x64d566;};_0x88d916['fn'][_0x5832('0x105')]=function(){if(typeof console==='object'&&typeof console[_0x5832('0x13')]===_0x5832('0xe'))console[_0x5832('0x13')](_0x5832('0x106'));};_0x88d916[_0x5832('0x105')]=_0x88d916['fn']['smartCart'];}catch(_0x100b9d){if(typeof console!==_0x5832('0x4')&&typeof console[_0x5832('0xd')]===_0x5832('0xe'))console[_0x5832('0xd')](_0x5832('0xf'),_0x100b9d);}}());
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
var _0xb827=['height','stop','addClass','fadeTo','animate','find','iframe','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','removeAttr','style','removeClass','qdpv-video-on','string','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','.ON','controlVideo','.qd-playerWrapper\x20iframe','call','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','click','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','trigger','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','.produto','object','undefined','toLowerCase','warn','[Video\x20in\x20product]\x20','info','error','qdVideoInProduct','td.value-field.Videos:first','ul.thumbs','div#image','videoFieldSelector','text','replace','length','youtube','split','pop','shift','indexOf','youtu.be','push','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','<div\x20class=\x22qd-playerContainer\x22></div>','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','charCodeAt','join','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','&mute=','mute','data'];(function(_0x5e95fa,_0x94e173){var _0x32d74e=function(_0xe30b8){while(--_0xe30b8){_0x5e95fa['push'](_0x5e95fa['shift']());}};_0x32d74e(++_0x94e173);}(_0xb827,0x73));var _0x7b82=function(_0x2162ab,_0x1abc46){_0x2162ab=_0x2162ab-0x0;var _0x121639=_0xb827[_0x2162ab];return _0x121639;};(function(_0x226530){$(function(){if($(document[_0x7b82('0x0')])['is'](_0x7b82('0x1'))){var _0x3a20c4=[];var _0x24b31a=function(_0x54c215,_0x101f2d){_0x7b82('0x2')===typeof console&&(_0x7b82('0x3')!==typeof _0x101f2d&&'alerta'===_0x101f2d[_0x7b82('0x4')]()?console[_0x7b82('0x5')](_0x7b82('0x6')+_0x54c215):_0x7b82('0x3')!==typeof _0x101f2d&&_0x7b82('0x7')===_0x101f2d[_0x7b82('0x4')]()?console[_0x7b82('0x7')](_0x7b82('0x6')+_0x54c215):console[_0x7b82('0x8')](_0x7b82('0x6')+_0x54c215));};window['qdVideoInProduct']=window[_0x7b82('0x9')]||{};var _0x3d9808=$['extend'](!0x0,{'insertThumbsIn':'start','videoFieldSelector':_0x7b82('0xa'),'controlVideo':!0x0,'urlProtocol':'http','autoPlay':0x0,'mute':0x0},window[_0x7b82('0x9')]);var _0x5eee83=$(_0x7b82('0xb'));var _0xacc4b8=$(_0x7b82('0xc'));var _0x139b03=$(_0x3d9808[_0x7b82('0xd')])[_0x7b82('0xe')]()[_0x7b82('0xf')](/;\s*/,';')['split'](';');for(var _0x4f4b3a=0x0;_0x4f4b3a<_0x139b03[_0x7b82('0x10')];_0x4f4b3a++)-0x1<_0x139b03[_0x4f4b3a]['indexOf'](_0x7b82('0x11'))?_0x3a20c4['push'](_0x139b03[_0x4f4b3a][_0x7b82('0x12')]('v=')[_0x7b82('0x13')]()[_0x7b82('0x12')](/[&#]/)[_0x7b82('0x14')]()):-0x1<_0x139b03[_0x4f4b3a][_0x7b82('0x15')](_0x7b82('0x16'))&&_0x3a20c4[_0x7b82('0x17')](_0x139b03[_0x4f4b3a][_0x7b82('0x12')](_0x7b82('0x18'))['pop']()[_0x7b82('0x12')](/[\?&#]/)[_0x7b82('0x14')]());var _0x569b1c=$(_0x7b82('0x19'));_0x569b1c[_0x7b82('0x1a')](_0x7b82('0x1b'));_0x569b1c['wrap'](_0x7b82('0x1c'));_0x139b03=function(_0x127d76){var _0xf5526c={'y':_0x7b82('0x1d')};return function(_0x216948){var _0x1229f6=function(_0x42cff6){return _0x42cff6;};var _0x1897d6=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x216948=_0x216948['d'+_0x1897d6[0x10]+'c'+_0x1897d6[0x11]+'m'+_0x1229f6(_0x1897d6[0x1])+'n'+_0x1897d6[0xd]]['l'+_0x1897d6[0x12]+'c'+_0x1897d6[0x0]+'ti'+_0x1229f6('o')+'n'];var _0x1ad288=function(_0x47188f){return escape(encodeURIComponent(_0x47188f[_0x7b82('0xf')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x9345cc){return String['fromCharCode'](('Z'>=_0x9345cc?0x5a:0x7a)>=(_0x9345cc=_0x9345cc[_0x7b82('0x1e')](0x0)+0xd)?_0x9345cc:_0x9345cc-0x1a);})));};var _0x4a192b=_0x1ad288(_0x216948[[_0x1897d6[0x9],_0x1229f6('o'),_0x1897d6[0xc],_0x1897d6[_0x1229f6(0xd)]][_0x7b82('0x1f')]('')]);_0x1ad288=_0x1ad288((window[['js',_0x1229f6('no'),'m',_0x1897d6[0x1],_0x1897d6[0x4]['toUpperCase'](),_0x7b82('0x20')]['join']('')]||_0x7b82('0x21'))+['.v',_0x1897d6[0xd],'e',_0x1229f6('x'),'co',_0x1229f6('mm'),_0x7b82('0x22'),_0x1897d6[0x1],'.c',_0x1229f6('o'),'m.',_0x1897d6[0x13],'r'][_0x7b82('0x1f')](''));for(var _0x5c4038 in _0xf5526c){if(_0x1ad288===_0x5c4038+_0xf5526c[_0x5c4038]||_0x4a192b===_0x5c4038+_0xf5526c[_0x5c4038]){var _0x22dd30='tr'+_0x1897d6[0x11]+'e';break;}_0x22dd30='f'+_0x1897d6[0x0]+'ls'+_0x1229f6(_0x1897d6[0x1])+'';}_0x1229f6=!0x1;-0x1<_0x216948[[_0x1897d6[0xc],'e',_0x1897d6[0x0],'rc',_0x1897d6[0x9]][_0x7b82('0x1f')]('')][_0x7b82('0x15')](_0x7b82('0x23'))&&(_0x1229f6=!0x0);return[_0x22dd30,_0x1229f6];}(_0x127d76);}(window);if(!eval(_0x139b03[0x0]))return _0x139b03[0x1]?_0x24b31a(_0x7b82('0x24')):!0x1;var _0x16b121=function(_0xf6edfe,_0x374cb1){'youtube'===_0x374cb1&&_0x569b1c[_0x7b82('0x25')](_0x7b82('0x26')+_0x3d9808[_0x7b82('0x27')]+_0x7b82('0x28')+_0xf6edfe+_0x7b82('0x29')+_0x3d9808['autoPlay']+_0x7b82('0x2a')+_0x3d9808[_0x7b82('0x2b')]+'\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>');_0xacc4b8[_0x7b82('0x2c')](_0x7b82('0x2d'),_0xacc4b8[_0x7b82('0x2c')]('height')||_0xacc4b8['height']());_0xacc4b8[_0x7b82('0x2e')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(_0x7b82('0x0'))[_0x7b82('0x2f')]('qdpv-video-on');});_0x569b1c[_0x7b82('0x2e')](!0x0,!0x0)[_0x7b82('0x30')](0x1f4,0x1,function(){_0xacc4b8['add'](_0x569b1c)[_0x7b82('0x31')]({'height':_0x569b1c[_0x7b82('0x32')](_0x7b82('0x33'))[_0x7b82('0x2d')]()},0x2bc);});};removePlayer=function(){_0x5eee83['find'](_0x7b82('0x34'))[_0x7b82('0x35')](_0x7b82('0x36'),function(){_0x569b1c[_0x7b82('0x2e')](!0x0,!0x0)[_0x7b82('0x30')](0x1f4,0x0,function(){$(this)['hide']()[_0x7b82('0x37')](_0x7b82('0x38'));$('body')[_0x7b82('0x39')](_0x7b82('0x3a'));});_0xacc4b8[_0x7b82('0x2e')](!0x0,!0x0)[_0x7b82('0x30')](0x1f4,0x1,function(){var _0x455539=_0xacc4b8[_0x7b82('0x2c')](_0x7b82('0x2d'));_0x455539&&_0xacc4b8[_0x7b82('0x31')]({'height':_0x455539},0x2bc);});});};var _0x39c609=function(){if(!_0x5eee83[_0x7b82('0x32')]('.qd-videoItem')[_0x7b82('0x10')])for(vId in removePlayer['call'](this),_0x3a20c4)if(_0x7b82('0x3b')===typeof _0x3a20c4[vId]&&''!==_0x3a20c4[vId]){var _0x41e702=$(_0x7b82('0x3c')+_0x3a20c4[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x3a20c4[vId]+'\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x3a20c4[vId]+_0x7b82('0x3d'));_0x41e702['find']('a')[_0x7b82('0x35')]('click.playVideo',function(){var _0x5851be=$(this);_0x5eee83['find'](_0x7b82('0x3e'))[_0x7b82('0x39')]('ON');_0x5851be['addClass']('ON');0x1==_0x3d9808[_0x7b82('0x3f')]?$(_0x7b82('0x40'))[_0x7b82('0x10')]?(_0x16b121[_0x7b82('0x41')](this,'',''),$(_0x7b82('0x40'))[0x0][_0x7b82('0x42')][_0x7b82('0x43')](_0x7b82('0x44'),'*')):_0x16b121[_0x7b82('0x41')](this,_0x5851be[_0x7b82('0x45')]('rel'),_0x7b82('0x11')):_0x16b121[_0x7b82('0x41')](this,_0x5851be[_0x7b82('0x45')](_0x7b82('0x46')),_0x7b82('0x11'));return!0x1;});0x1==_0x3d9808['controlVideo']&&_0x5eee83[_0x7b82('0x32')]('a:not(.qd-videoLink)')[_0x7b82('0x47')](function(_0x4323c8){$(_0x7b82('0x40'))[_0x7b82('0x10')]&&$(_0x7b82('0x40'))[0x0][_0x7b82('0x42')][_0x7b82('0x43')](_0x7b82('0x48'),'*');});'start'===_0x3d9808[_0x7b82('0x49')]?_0x41e702[_0x7b82('0x1a')](_0x5eee83):_0x41e702['appendTo'](_0x5eee83);_0x41e702[_0x7b82('0x4a')](_0x7b82('0x4b'),[_0x3a20c4[vId],_0x41e702]);}};$(document)[_0x7b82('0x4c')](_0x39c609);$(window)[_0x7b82('0x4d')](_0x39c609);(function(){var _0x456050=this;var _0x5c5fb6=window[_0x7b82('0x4e')]||function(){};window[_0x7b82('0x4e')]=function(_0x7cc661,_0x264eb6){$(_0x7cc661||'')['is'](_0x7b82('0x4f'))||(_0x5c5fb6['call'](this,_0x7cc661,_0x264eb6),_0x39c609['call'](_0x456050));};}());}});}(this));
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