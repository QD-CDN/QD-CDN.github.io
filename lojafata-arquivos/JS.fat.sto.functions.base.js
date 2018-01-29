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
var _0xf91e=['replace','#qtt','show','message','length','qd-ssa-on','sku','split','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','fromCharCode','join','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','initialSkuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','off','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','vtex.sku.selectable','available','unavailable','qdAjax','qdAjaxQueue','extend','url','opts','push','success','error','call','complete','parameters','callbackFns','successPopulated','boolean','errorPopulated','completePopulated','object','clearQueueDelay','jqXHR','undefined','ajax','readyState','data','textStatus','2.1','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','QD_smartStockAvailable','unshift','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','aviso','info','toLowerCase','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','attr','data-qd-ssa-qtt','find','[data-qd-ssa-text]','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22','[data-qd-ssa-text=\x22default\x22]','html'];(function(_0x2df1f2,_0x58d388){var _0x38652b=function(_0x18e322){while(--_0x18e322){_0x2df1f2['push'](_0x2df1f2['shift']());}};_0x38652b(++_0x58d388);}(_0xf91e,0x73));var _0xef91=function(_0x44103e,_0x49b751){_0x44103e=_0x44103e-0x0;var _0x2be5c9=_0xf91e[_0x44103e];return _0x2be5c9;};(function(_0x21b592){if('function'!==typeof _0x21b592[_0xef91('0x0')]){var _0x4b6122={};_0x21b592[_0xef91('0x1')]=_0x4b6122;_0x21b592[_0xef91('0x0')]=function(_0x21f789){var _0x1b2418=_0x21b592[_0xef91('0x2')]({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x21f789);var _0x5267fb=escape(encodeURIComponent(_0x1b2418[_0xef91('0x3')]));_0x4b6122[_0x5267fb]=_0x4b6122[_0x5267fb]||{};_0x4b6122[_0x5267fb][_0xef91('0x4')]=_0x4b6122[_0x5267fb]['opts']||[];_0x4b6122[_0x5267fb][_0xef91('0x4')][_0xef91('0x5')]({'success':function(_0xde9285,_0x358a88,_0x5a32c1){_0x1b2418[_0xef91('0x6')]['call'](this,_0xde9285,_0x358a88,_0x5a32c1);},'error':function(_0x55249d,_0x278a32,_0x5baaa9){_0x1b2418[_0xef91('0x7')][_0xef91('0x8')](this,_0x55249d,_0x278a32,_0x5baaa9);},'complete':function(_0x2115b0,_0x47d158){_0x1b2418[_0xef91('0x9')][_0xef91('0x8')](this,_0x2115b0,_0x47d158);}});_0x4b6122[_0x5267fb][_0xef91('0xa')]=_0x4b6122[_0x5267fb][_0xef91('0xa')]||{'success':{},'error':{},'complete':{}};_0x4b6122[_0x5267fb][_0xef91('0xb')]=_0x4b6122[_0x5267fb][_0xef91('0xb')]||{};_0x4b6122[_0x5267fb][_0xef91('0xb')][_0xef91('0xc')]=_0xef91('0xd')===typeof _0x4b6122[_0x5267fb]['callbackFns']['successPopulated']?_0x4b6122[_0x5267fb]['callbackFns'][_0xef91('0xc')]:!0x1;_0x4b6122[_0x5267fb]['callbackFns'][_0xef91('0xe')]='boolean'===typeof _0x4b6122[_0x5267fb][_0xef91('0xb')]['errorPopulated']?_0x4b6122[_0x5267fb][_0xef91('0xb')]['errorPopulated']:!0x1;_0x4b6122[_0x5267fb][_0xef91('0xb')][_0xef91('0xf')]='boolean'===typeof _0x4b6122[_0x5267fb][_0xef91('0xb')]['completePopulated']?_0x4b6122[_0x5267fb][_0xef91('0xb')][_0xef91('0xf')]:!0x1;_0x21f789=_0x21b592[_0xef91('0x2')]({},_0x1b2418,{'success':function(_0x2468a5,_0xe9a77d,_0x272f9b){_0x4b6122[_0x5267fb]['parameters'][_0xef91('0x6')]={'data':_0x2468a5,'textStatus':_0xe9a77d,'jqXHR':_0x272f9b};_0x4b6122[_0x5267fb][_0xef91('0xb')][_0xef91('0xc')]=!0x0;for(var _0x5b3f77 in _0x4b6122[_0x5267fb][_0xef91('0x4')])_0xef91('0x10')===typeof _0x4b6122[_0x5267fb]['opts'][_0x5b3f77]&&(_0x4b6122[_0x5267fb]['opts'][_0x5b3f77]['success'][_0xef91('0x8')](this,_0x2468a5,_0xe9a77d,_0x272f9b),_0x4b6122[_0x5267fb]['opts'][_0x5b3f77][_0xef91('0x6')]=function(){});},'error':function(_0x298a31,_0x46e755,_0x35c2dc){_0x4b6122[_0x5267fb][_0xef91('0xa')][_0xef91('0x7')]={'errorThrown':_0x35c2dc,'textStatus':_0x46e755,'jqXHR':_0x298a31};_0x4b6122[_0x5267fb][_0xef91('0xb')][_0xef91('0xe')]=!0x0;for(var _0x261dfc in _0x4b6122[_0x5267fb][_0xef91('0x4')])_0xef91('0x10')===typeof _0x4b6122[_0x5267fb]['opts'][_0x261dfc]&&(_0x4b6122[_0x5267fb][_0xef91('0x4')][_0x261dfc][_0xef91('0x7')][_0xef91('0x8')](this,_0x298a31,_0x46e755,_0x35c2dc),_0x4b6122[_0x5267fb]['opts'][_0x261dfc][_0xef91('0x7')]=function(){});},'complete':function(_0x5466a5,_0x2d22ce){_0x4b6122[_0x5267fb][_0xef91('0xa')][_0xef91('0x9')]={'textStatus':_0x2d22ce,'jqXHR':_0x5466a5};_0x4b6122[_0x5267fb][_0xef91('0xb')]['completePopulated']=!0x0;for(var _0x3fdbc6 in _0x4b6122[_0x5267fb][_0xef91('0x4')])'object'===typeof _0x4b6122[_0x5267fb][_0xef91('0x4')][_0x3fdbc6]&&(_0x4b6122[_0x5267fb]['opts'][_0x3fdbc6]['complete'][_0xef91('0x8')](this,_0x5466a5,_0x2d22ce),_0x4b6122[_0x5267fb][_0xef91('0x4')][_0x3fdbc6][_0xef91('0x9')]=function(){});isNaN(parseInt(_0x1b2418[_0xef91('0x11')]))||setTimeout(function(){_0x4b6122[_0x5267fb][_0xef91('0x12')]=void 0x0;_0x4b6122[_0x5267fb][_0xef91('0x4')]=void 0x0;_0x4b6122[_0x5267fb][_0xef91('0xa')]=void 0x0;_0x4b6122[_0x5267fb]['callbackFns']=void 0x0;},_0x1b2418[_0xef91('0x11')]);}});_0xef91('0x13')===typeof _0x4b6122[_0x5267fb][_0xef91('0x12')]?_0x4b6122[_0x5267fb][_0xef91('0x12')]=_0x21b592[_0xef91('0x14')](_0x21f789):_0x4b6122[_0x5267fb][_0xef91('0x12')]&&_0x4b6122[_0x5267fb][_0xef91('0x12')][_0xef91('0x15')]&&0x4==_0x4b6122[_0x5267fb]['jqXHR'][_0xef91('0x15')]&&(_0x4b6122[_0x5267fb][_0xef91('0xb')][_0xef91('0xc')]&&_0x21f789[_0xef91('0x6')](_0x4b6122[_0x5267fb][_0xef91('0xa')][_0xef91('0x6')][_0xef91('0x16')],_0x4b6122[_0x5267fb][_0xef91('0xa')][_0xef91('0x6')][_0xef91('0x17')],_0x4b6122[_0x5267fb][_0xef91('0xa')][_0xef91('0x6')][_0xef91('0x12')]),_0x4b6122[_0x5267fb][_0xef91('0xb')][_0xef91('0xe')]&&_0x21f789[_0xef91('0x7')](_0x4b6122[_0x5267fb][_0xef91('0xa')][_0xef91('0x7')][_0xef91('0x12')],_0x4b6122[_0x5267fb][_0xef91('0xa')][_0xef91('0x7')]['textStatus'],_0x4b6122[_0x5267fb]['parameters'][_0xef91('0x7')]['errorThrown']),_0x4b6122[_0x5267fb][_0xef91('0xb')][_0xef91('0xf')]&&_0x21f789[_0xef91('0x9')](_0x4b6122[_0x5267fb][_0xef91('0xa')][_0xef91('0x9')][_0xef91('0x12')],_0x4b6122[_0x5267fb]['parameters'][_0xef91('0x9')][_0xef91('0x17')]));};_0x21b592[_0xef91('0x0')]['version']=_0xef91('0x18');}}(jQuery));(function(_0x5ad052){function _0xb9240c(_0x239eed,_0x1bd0c1){_0x31d9b3[_0xef91('0x0')]({'url':_0xef91('0x19')+_0x239eed,'clearQueueDelay':null,'success':_0x1bd0c1,'error':function(){_0x535161(_0xef91('0x1a'));}});}var _0x31d9b3=jQuery;if('function'!==typeof _0x31d9b3['fn'][_0xef91('0x1b')]){var _0x535161=function(_0x1c741a,_0x398bff){if(_0xef91('0x10')===typeof console){var _0xd42d32;_0xef91('0x10')===typeof _0x1c741a?(_0x1c741a[_0xef91('0x1c')](_0xef91('0x1d')),_0xd42d32=_0x1c741a):_0xd42d32=['[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a'+_0x1c741a];_0xef91('0x13')===typeof _0x398bff||_0xef91('0x1e')!==_0x398bff['toLowerCase']()&&_0xef91('0x1f')!==_0x398bff['toLowerCase']()?'undefined'!==typeof _0x398bff&&_0xef91('0x20')===_0x398bff[_0xef91('0x21')]()?console[_0xef91('0x20')][_0xef91('0x22')](console,_0xd42d32):console[_0xef91('0x7')][_0xef91('0x22')](console,_0xd42d32):console[_0xef91('0x23')][_0xef91('0x22')](console,_0xd42d32);}},_0x2a502e={},_0xec0597=function(_0x548d1c,_0x4b781b){function _0x402671(_0xaf444){try{_0x548d1c[_0xef91('0x24')](_0xef91('0x25'))[_0xef91('0x26')](_0xef91('0x27'));var _0x1de883=_0xaf444[0x0][_0xef91('0x28')][0x0][_0xef91('0x29')];_0x548d1c[_0xef91('0x2a')](_0xef91('0x2b'),_0x1de883);_0x548d1c['each'](function(){var _0x548d1c=_0x31d9b3(this)[_0xef91('0x2c')](_0xef91('0x2d'));if(0x1>_0x1de883)return _0x548d1c[_0xef91('0x2e')]()[_0xef91('0x26')](_0xef91('0x2f'))[_0xef91('0x24')](_0xef91('0x30'));var _0xaf444=_0x548d1c[_0xef91('0x31')](_0xef91('0x32')+_0x1de883+'\x22]');_0xaf444=_0xaf444['length']?_0xaf444:_0x548d1c[_0xef91('0x31')](_0xef91('0x33'));_0x548d1c['hide']()[_0xef91('0x26')](_0xef91('0x2f'))[_0xef91('0x24')](_0xef91('0x30'));_0xaf444[_0xef91('0x34')]((_0xaf444[_0xef91('0x34')]()||'')[_0xef91('0x35')](_0xef91('0x36'),_0x1de883));_0xaf444[_0xef91('0x37')]()['addClass'](_0xef91('0x30'))[_0xef91('0x24')](_0xef91('0x2f'));});}catch(_0x38c7dc){_0x535161(['Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20',_0x38c7dc[_0xef91('0x38')]]);}}if(_0x548d1c[_0xef91('0x39')]){_0x548d1c[_0xef91('0x26')](_0xef91('0x3a'));_0x548d1c[_0xef91('0x26')]('qd-ssa-sku-no-selected');try{_0x548d1c[_0xef91('0x26')]('qd-ssa-skus-'+vtxctx['skus']['split'](';')[_0xef91('0x39')]);}catch(_0xf8854e){_0x535161(['Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20',_0xf8854e[_0xef91('0x38')]]);}_0x31d9b3(window)['on']('vtex.sku.selected\x20QuatroDigital.ssa.skuSelected',function(_0x4664bb,_0x59618b,_0x29292f){try{_0xb9240c(_0x29292f[_0xef91('0x3b')],function(_0x4d6269){_0x402671(_0x4d6269);0x1===vtxctx['skus'][_0xef91('0x3c')](';')[_0xef91('0x39')]&&0x0==_0x4d6269[0x0][_0xef91('0x28')][0x0][_0xef91('0x29')]&&_0x31d9b3(window)[_0xef91('0x3d')](_0xef91('0x3e'));});}catch(_0x2ff88f){_0x535161([_0xef91('0x3f'),_0x2ff88f['message']]);}});_0x31d9b3(window)['off'](_0xef91('0x40'));_0x31d9b3(window)['on'](_0xef91('0x3e'),function(){_0x548d1c['addClass'](_0xef91('0x41'))['hide']();});}};_0x5ad052=function(_0x5b8bb4){var _0x2eb41c={'y':'bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x54d497){var _0x41ff93=function(_0x2d7394){return _0x2d7394;};var _0x1e8d4c=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x54d497=_0x54d497['d'+_0x1e8d4c[0x10]+'c'+_0x1e8d4c[0x11]+'m'+_0x41ff93(_0x1e8d4c[0x1])+'n'+_0x1e8d4c[0xd]]['l'+_0x1e8d4c[0x12]+'c'+_0x1e8d4c[0x0]+'ti'+_0x41ff93('o')+'n'];var _0x330279=function(_0x5a46e1){return escape(encodeURIComponent(_0x5a46e1[_0xef91('0x35')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4323c8){return String[_0xef91('0x42')](('Z'>=_0x4323c8?0x5a:0x7a)>=(_0x4323c8=_0x4323c8['charCodeAt'](0x0)+0xd)?_0x4323c8:_0x4323c8-0x1a);})));};var _0x22bcbe=_0x330279(_0x54d497[[_0x1e8d4c[0x9],_0x41ff93('o'),_0x1e8d4c[0xc],_0x1e8d4c[_0x41ff93(0xd)]][_0xef91('0x43')]('')]);_0x330279=_0x330279((window[['js',_0x41ff93('no'),'m',_0x1e8d4c[0x1],_0x1e8d4c[0x4][_0xef91('0x44')](),_0xef91('0x45')]['join']('')]||_0xef91('0x46'))+['.v',_0x1e8d4c[0xd],'e',_0x41ff93('x'),'co',_0x41ff93('mm'),_0xef91('0x47'),_0x1e8d4c[0x1],'.c',_0x41ff93('o'),'m.',_0x1e8d4c[0x13],'r']['join'](''));for(var _0x317d3b in _0x2eb41c){if(_0x330279===_0x317d3b+_0x2eb41c[_0x317d3b]||_0x22bcbe===_0x317d3b+_0x2eb41c[_0x317d3b]){var _0x372207='tr'+_0x1e8d4c[0x11]+'e';break;}_0x372207='f'+_0x1e8d4c[0x0]+'ls'+_0x41ff93(_0x1e8d4c[0x1])+'';}_0x41ff93=!0x1;-0x1<_0x54d497[[_0x1e8d4c[0xc],'e',_0x1e8d4c[0x0],'rc',_0x1e8d4c[0x9]][_0xef91('0x43')]('')][_0xef91('0x48')](_0xef91('0x49'))&&(_0x41ff93=!0x0);return[_0x372207,_0x41ff93];}(_0x5b8bb4);}(window);if(!eval(_0x5ad052[0x0]))return _0x5ad052[0x1]?_0x535161(_0xef91('0x4a')):!0x1;_0x31d9b3['fn'][_0xef91('0x1b')]=function(_0x427eb7){var _0x5b65f8=_0x31d9b3(this);_0x427eb7=_0x31d9b3[_0xef91('0x2')](!0x0,{},_0x2a502e,_0x427eb7);_0x5b65f8[_0xef91('0x4b')]=new _0xec0597(_0x5b65f8,_0x427eb7);try{_0xef91('0x10')===typeof _0x31d9b3['fn']['QD_smartStockAvailable']['initialSkuSelected']&&_0x31d9b3(window)[_0xef91('0x3d')]('QuatroDigital.ssa.skuSelected',[_0x31d9b3['fn']['QD_smartStockAvailable'][_0xef91('0x4c')][_0xef91('0x4d')],_0x31d9b3['fn'][_0xef91('0x1b')][_0xef91('0x4c')][_0xef91('0x3b')]]);}catch(_0x84bf29){_0x535161([_0xef91('0x4e'),_0x84bf29[_0xef91('0x38')]]);}_0x31d9b3['fn']['QD_smartStockAvailable']['unavailable']&&_0x31d9b3(window)[_0xef91('0x3d')](_0xef91('0x3e'));return _0x5b65f8;};_0x31d9b3(window)['on'](_0xef91('0x40'),function(_0x598dc7,_0x24f3bd,_0x2ac378){try{_0x31d9b3['fn'][_0xef91('0x1b')]['initialSkuSelected']={'prod':_0x24f3bd,'sku':_0x2ac378},_0x31d9b3(this)[_0xef91('0x4f')](_0x598dc7);}catch(_0x488da2){_0x535161([_0xef91('0x50'),_0x488da2['message']]);}});_0x31d9b3(window)['on'](_0xef91('0x51'),function(_0x35a481,_0x45887c,_0x11b478){try{for(var _0x604202=_0x11b478[_0xef91('0x39')],_0x4b3a7e=_0x45887c=0x0;_0x4b3a7e<_0x604202&&!_0x11b478[_0x4b3a7e][_0xef91('0x52')];_0x4b3a7e++)_0x45887c+=0x1;_0x604202<=_0x45887c&&(_0x31d9b3['fn'][_0xef91('0x1b')][_0xef91('0x53')]=!0x0);_0x31d9b3(this)['off'](_0x35a481);}catch(_0x551557){_0x535161(['Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20',_0x551557[_0xef91('0x38')]]);}});_0x31d9b3(function(){_0x31d9b3('.qd_smart_stock_available_auto')[_0xef91('0x1b')]();});}}(window));
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
var _0xe7ae=['ajaxCallback','call','trigger','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','first','replaceSpecialChars','>li','>ul','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','callback','extend','.qd_amazing_menu_auto','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','error','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qdAmAddNdx','addClass','qd-am-li-','last','qd-am-last','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','url','html','find','attr','data-qdam-value','each','getParent','clone','insertBefore','hide','text','trim','qd-am-content-loaded','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27'];(function(_0x56545f,_0xb9e8a8){var _0x440b74=function(_0x440f12){while(--_0x440f12){_0x56545f['push'](_0x56545f['shift']());}};_0x440b74(++_0xb9e8a8);}(_0xe7ae,0x13f));var _0xee7a=function(_0x2b3c9d,_0x220b50){_0x2b3c9d=_0x2b3c9d-0x0;var _0x52135a=_0xe7ae[_0x2b3c9d];return _0x52135a;};(function(_0x13b6a7){_0x13b6a7['fn']['getParent']=_0x13b6a7['fn'][_0xee7a('0x0')];}(jQuery));(function(_0x2e01fe){var _0x25a0b6;var _0x2153a9=jQuery;if(_0xee7a('0x1')!==typeof _0x2153a9['fn'][_0xee7a('0x2')]){var _0x2ec07e={'url':_0xee7a('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0x1c505f=function(_0x2b4521,_0x3400e3){if(_0xee7a('0x4')===typeof console&&_0xee7a('0x5')!==typeof console[_0xee7a('0x6')]&&_0xee7a('0x5')!==typeof console[_0xee7a('0x7')]&&_0xee7a('0x5')!==typeof console[_0xee7a('0x8')]){var _0x4d684a;_0xee7a('0x4')===typeof _0x2b4521?(_0x2b4521[_0xee7a('0x9')](_0xee7a('0xa')),_0x4d684a=_0x2b4521):_0x4d684a=[_0xee7a('0xa')+_0x2b4521];if(_0xee7a('0x5')===typeof _0x3400e3||_0xee7a('0xb')!==_0x3400e3[_0xee7a('0xc')]()&&_0xee7a('0xd')!==_0x3400e3[_0xee7a('0xc')]())if(_0xee7a('0x5')!==typeof _0x3400e3&&_0xee7a('0x7')===_0x3400e3[_0xee7a('0xc')]())try{console[_0xee7a('0x7')][_0xee7a('0xe')](console,_0x4d684a);}catch(_0x1f3c7f){try{console[_0xee7a('0x7')](_0x4d684a[_0xee7a('0xf')]('\x0a'));}catch(_0x3f6256){}}else try{console[_0xee7a('0x6')][_0xee7a('0xe')](console,_0x4d684a);}catch(_0x211724){try{console['error'](_0x4d684a[_0xee7a('0xf')]('\x0a'));}catch(_0x445d3f){}}else try{console[_0xee7a('0x8')][_0xee7a('0xe')](console,_0x4d684a);}catch(_0x28273d){try{console[_0xee7a('0x8')](_0x4d684a[_0xee7a('0xf')]('\x0a'));}catch(_0x350287){}}}};_0x2153a9['fn'][_0xee7a('0x10')]=function(){var _0x20a5eb=_0x2153a9(this);_0x20a5eb['each'](function(_0x4c1499){_0x2153a9(this)[_0xee7a('0x11')](_0xee7a('0x12')+_0x4c1499);});_0x20a5eb['first']()[_0xee7a('0x11')]('qd-am-first');_0x20a5eb[_0xee7a('0x13')]()[_0xee7a('0x11')](_0xee7a('0x14'));return _0x20a5eb;};_0x2153a9['fn'][_0xee7a('0x2')]=function(){};_0x2e01fe=function(_0x27fcdd){var _0x1ee3bc={'y':_0xee7a('0x15')};return function(_0x4a4f28){var _0x47c688=function(_0x2c1c23){return _0x2c1c23;};var _0x70c917=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4a4f28=_0x4a4f28['d'+_0x70c917[0x10]+'c'+_0x70c917[0x11]+'m'+_0x47c688(_0x70c917[0x1])+'n'+_0x70c917[0xd]]['l'+_0x70c917[0x12]+'c'+_0x70c917[0x0]+'ti'+_0x47c688('o')+'n'];var _0x314623=function(_0x1a1c71){return escape(encodeURIComponent(_0x1a1c71[_0xee7a('0x16')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x3dbdcb){return String[_0xee7a('0x17')](('Z'>=_0x3dbdcb?0x5a:0x7a)>=(_0x3dbdcb=_0x3dbdcb[_0xee7a('0x18')](0x0)+0xd)?_0x3dbdcb:_0x3dbdcb-0x1a);})));};var _0x159e67=_0x314623(_0x4a4f28[[_0x70c917[0x9],_0x47c688('o'),_0x70c917[0xc],_0x70c917[_0x47c688(0xd)]]['join']('')]);_0x314623=_0x314623((window[['js',_0x47c688('no'),'m',_0x70c917[0x1],_0x70c917[0x4]['toUpperCase'](),_0xee7a('0x19')]['join']('')]||_0xee7a('0x1a'))+['.v',_0x70c917[0xd],'e',_0x47c688('x'),'co',_0x47c688('mm'),_0xee7a('0x1b'),_0x70c917[0x1],'.c',_0x47c688('o'),'m.',_0x70c917[0x13],'r']['join'](''));for(var _0x21497d in _0x1ee3bc){if(_0x314623===_0x21497d+_0x1ee3bc[_0x21497d]||_0x159e67===_0x21497d+_0x1ee3bc[_0x21497d]){var _0x3ae7f3='tr'+_0x70c917[0x11]+'e';break;}_0x3ae7f3='f'+_0x70c917[0x0]+'ls'+_0x47c688(_0x70c917[0x1])+'';}_0x47c688=!0x1;-0x1<_0x4a4f28[[_0x70c917[0xc],'e',_0x70c917[0x0],'rc',_0x70c917[0x9]][_0xee7a('0xf')]('')][_0xee7a('0x1c')](_0xee7a('0x1d'))&&(_0x47c688=!0x0);return[_0x3ae7f3,_0x47c688];}(_0x27fcdd);}(window);if(!eval(_0x2e01fe[0x0]))return _0x2e01fe[0x1]?_0x1c505f(_0xee7a('0x1e')):!0x1;var _0x2f406c=function(_0x44e191){var _0x4dc704=_0x44e191['find'](_0xee7a('0x1f'));var _0xa245a3=_0x4dc704[_0xee7a('0x20')](_0xee7a('0x21'));var _0x574db1=_0x4dc704['filter'](_0xee7a('0x22'));if(_0xa245a3[_0xee7a('0x23')]||_0x574db1['length'])_0xa245a3[_0xee7a('0x24')]()['addClass']('qd-am-banner-wrapper'),_0x574db1[_0xee7a('0x24')]()['addClass']('qd-am-collection-wrapper'),_0x2153a9['qdAjax']({'url':_0x25a0b6[_0xee7a('0x25')],'dataType':_0xee7a('0x26'),'success':function(_0x107436){var _0x4d584e=_0x2153a9(_0x107436);_0xa245a3['each'](function(){var _0x107436=_0x2153a9(this);var _0x30851b=_0x4d584e[_0xee7a('0x27')]('img[alt=\x27'+_0x107436[_0xee7a('0x28')](_0xee7a('0x29'))+'\x27]');_0x30851b['length']&&(_0x30851b[_0xee7a('0x2a')](function(){_0x2153a9(this)[_0xee7a('0x2b')]('.box-banner')[_0xee7a('0x2c')]()[_0xee7a('0x2d')](_0x107436);}),_0x107436[_0xee7a('0x2e')]());})[_0xee7a('0x11')]('qd-am-content-loaded');_0x574db1[_0xee7a('0x2a')](function(){var _0x107436={};var _0x36493c=_0x2153a9(this);_0x4d584e['find']('h2')[_0xee7a('0x2a')](function(){if(_0x2153a9(this)[_0xee7a('0x2f')]()[_0xee7a('0x30')]()[_0xee7a('0xc')]()==_0x36493c[_0xee7a('0x28')](_0xee7a('0x29'))[_0xee7a('0x30')]()[_0xee7a('0xc')]())return _0x107436=_0x2153a9(this),!0x1;});_0x107436['length']&&(_0x107436[_0xee7a('0x2a')](function(){_0x2153a9(this)['getParent']('[class*=\x27colunas\x27]')[_0xee7a('0x2c')]()['insertBefore'](_0x36493c);}),_0x36493c[_0xee7a('0x2e')]());})[_0xee7a('0x11')](_0xee7a('0x31'));},'error':function(){_0x1c505f(_0xee7a('0x32')+_0x25a0b6['url']+'\x27\x20falho.');},'complete':function(){_0x25a0b6[_0xee7a('0x33')][_0xee7a('0x34')](this);_0x2153a9(window)[_0xee7a('0x35')](_0xee7a('0x36'),_0x44e191);},'clearQueueDelay':0xbb8});};_0x2153a9[_0xee7a('0x2')]=function(_0x55f083){var _0x3830b5=_0x55f083[_0xee7a('0x27')](_0xee7a('0x37'))[_0xee7a('0x2a')](function(){var _0x254690=_0x2153a9(this);if(!_0x254690['length'])return _0x1c505f([_0xee7a('0x38'),_0x55f083],'alerta');_0x254690[_0xee7a('0x27')](_0xee7a('0x39'))[_0xee7a('0x24')]()[_0xee7a('0x11')](_0xee7a('0x3a'));_0x254690['find']('li')[_0xee7a('0x2a')](function(){var _0x1da5b5=_0x2153a9(this);var _0x14e5e0=_0x1da5b5[_0xee7a('0x3b')](_0xee7a('0x3c'));_0x14e5e0[_0xee7a('0x23')]&&_0x1da5b5['addClass'](_0xee7a('0x3d')+_0x14e5e0[_0xee7a('0x3e')]()[_0xee7a('0x2f')]()[_0xee7a('0x30')]()[_0xee7a('0x3f')]()['replace'](/\./g,'')[_0xee7a('0x16')](/\s/g,'-')[_0xee7a('0xc')]());});var _0x180a6d=_0x254690[_0xee7a('0x27')](_0xee7a('0x40'))[_0xee7a('0x10')]();_0x254690[_0xee7a('0x11')]('qd-amazing-menu');_0x180a6d=_0x180a6d[_0xee7a('0x27')](_0xee7a('0x41'));_0x180a6d[_0xee7a('0x2a')](function(){var _0x4082bb=_0x2153a9(this);_0x4082bb[_0xee7a('0x27')](_0xee7a('0x40'))[_0xee7a('0x10')]()[_0xee7a('0x11')](_0xee7a('0x42'));_0x4082bb[_0xee7a('0x11')]('qd-am-dropdown-menu');_0x4082bb[_0xee7a('0x24')]()[_0xee7a('0x11')](_0xee7a('0x43'));});_0x180a6d[_0xee7a('0x11')](_0xee7a('0x43'));var _0x40af15=0x0,_0x2e01fe=function(_0x200d5d){_0x40af15+=0x1;_0x200d5d=_0x200d5d[_0xee7a('0x3b')]('li')[_0xee7a('0x3b')]('*');_0x200d5d['length']&&(_0x200d5d[_0xee7a('0x11')](_0xee7a('0x44')+_0x40af15),_0x2e01fe(_0x200d5d));};_0x2e01fe(_0x254690);_0x254690[_0xee7a('0x45')](_0x254690['find']('ul'))[_0xee7a('0x2a')](function(){var _0x122b65=_0x2153a9(this);_0x122b65[_0xee7a('0x11')](_0xee7a('0x46')+_0x122b65[_0xee7a('0x3b')]('li')[_0xee7a('0x23')]+'-li');});});_0x2f406c(_0x3830b5);_0x25a0b6[_0xee7a('0x47')][_0xee7a('0x34')](this);_0x2153a9(window)[_0xee7a('0x35')]('QuatroDigital.am.callback',_0x55f083);};_0x2153a9['fn'][_0xee7a('0x2')]=function(_0x49c703){var _0x273451=_0x2153a9(this);if(!_0x273451[_0xee7a('0x23')])return _0x273451;_0x25a0b6=_0x2153a9[_0xee7a('0x48')]({},_0x2ec07e,_0x49c703);_0x273451['exec']=new _0x2153a9[(_0xee7a('0x2'))](_0x2153a9(this));return _0x273451;};_0x2153a9(function(){_0x2153a9(_0xee7a('0x49'))[_0xee7a('0x2')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x53e2=['getCartInfoByUrl','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','smartCheckout','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>','<span\x20class=\x22qd-ddc-imgLoading\x22></span>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<span\x20class=\x22qd-ddc-qttLoading\x22></span>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','empty','productCategoryIds','attr','qd-ddc-','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','content','quantity','.qd-ddc-remove','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','.qd-ddc-shipping\x20input','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','timeRemoveNewItemClass','qd-ddc-product-add-time-v2','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','forceImageHTTPS','string','http','qd-loaded','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','.qd-ddc-quantity','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','stop','slideUp','$1-$2$3','data','qdDdcLastPostalCode','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','.qd-dd-cep-slas','logisticsInfo','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dias\x20útéis','<td>\x20R$\x20','price','</td><td>','\x20para\x20o\x20CEP\x20','tbody','insertBefore','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','Callback\x20não\x20é\x20uma\x20função','Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart','unshift','allowRecalculate','buyButtonClicked','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','prepend','productId','prod_','prodId','ajaxStop','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','QD_smartCart','dropDown','buyButton','QD_buyButton','selector','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','split','length','join','_QuatroDigital_CartData','callback','Callbacks','error','function','Oooops!\x20','message','object','info','warn','aviso','toLowerCase','apply','_QuatroDigital_DropDown','QD_dropDownCart','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>','skuName','name','extend','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd-ddc-wrapper2\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-shipping\x22></div>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','find','html','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','emptyCart','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','body','removeClass','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text','.qd-ddc-shipping\x20.qd-ddc-cep','val','keyup.qd_ddc_cep','formatCepField','click','preventDefault','toggle','hide','off','click._QD_DDC_closeShipping','target','.qd-ddc-cep-tooltip','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','allowUpdate','simpleCart','cartIsEmpty','each','clone','.qd-ddc-infoTotalValue','total','qtt','.qd-ddc-infoTotalShipping','shipping','.qd-ddc-infoAllTotal','allTotal','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','call'];(function(_0xb742ac,_0x237a3d){var _0x1988bc=function(_0x27b828){while(--_0x27b828){_0xb742ac['push'](_0xb742ac['shift']());}};_0x1988bc(++_0x237a3d);}(_0x53e2,0x195));var _0x253e=function(_0x321bb2,_0x202794){_0x321bb2=_0x321bb2-0x0;var _0x9c12ed=_0x53e2[_0x321bb2];return _0x9c12ed;};(function(_0x59ca59){_0x59ca59['fn'][_0x253e('0x0')]=_0x59ca59['fn'][_0x253e('0x1')];}(jQuery));function qd_number_format(_0x107a0a,_0x2fff9f,_0x1a5a7f,_0x4545c2){_0x107a0a=(_0x107a0a+'')[_0x253e('0x2')](/[^0-9+\-Ee.]/g,'');_0x107a0a=isFinite(+_0x107a0a)?+_0x107a0a:0x0;_0x2fff9f=isFinite(+_0x2fff9f)?Math[_0x253e('0x3')](_0x2fff9f):0x0;_0x4545c2='undefined'===typeof _0x4545c2?',':_0x4545c2;_0x1a5a7f=_0x253e('0x4')===typeof _0x1a5a7f?'.':_0x1a5a7f;var _0x15be22='',_0x15be22=function(_0x4ca302,_0x21195e){var _0x2fff9f=Math[_0x253e('0x5')](0xa,_0x21195e);return''+(Math[_0x253e('0x6')](_0x4ca302*_0x2fff9f)/_0x2fff9f)['toFixed'](_0x21195e);},_0x15be22=(_0x2fff9f?_0x15be22(_0x107a0a,_0x2fff9f):''+Math[_0x253e('0x6')](_0x107a0a))[_0x253e('0x7')]('.');0x3<_0x15be22[0x0]['length']&&(_0x15be22[0x0]=_0x15be22[0x0][_0x253e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4545c2));(_0x15be22[0x1]||'')['length']<_0x2fff9f&&(_0x15be22[0x1]=_0x15be22[0x1]||'',_0x15be22[0x1]+=Array(_0x2fff9f-_0x15be22[0x1][_0x253e('0x8')]+0x1)[_0x253e('0x9')]('0'));return _0x15be22[_0x253e('0x9')](_0x1a5a7f);};(function(){'use strict';try{window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};window[_0x253e('0xa')][_0x253e('0xb')]=window[_0x253e('0xa')]['callback']||$[_0x253e('0xc')]();}catch(_0x352397){if(typeof console!=='undefined'&&typeof console[_0x253e('0xd')]===_0x253e('0xe'))console[_0x253e('0xd')](_0x253e('0xf'),_0x352397[_0x253e('0x10')]);}}());(function(_0x1f64df){'use strict';try{var _0x2098f5=jQuery;var _0xf5382d='Quatro\x20Digital\x20-\x20DropDown\x20Cart';var _0x146c45=function(_0x2f471c,_0x445934){if(_0x253e('0x11')===typeof console&&_0x253e('0x4')!==typeof console[_0x253e('0xd')]&&_0x253e('0x4')!==typeof console[_0x253e('0x12')]&&_0x253e('0x4')!==typeof console[_0x253e('0x13')]){var _0x2aa4ec;_0x253e('0x11')===typeof _0x2f471c?(_0x2f471c['unshift']('['+_0xf5382d+']\x0a'),_0x2aa4ec=_0x2f471c):_0x2aa4ec=['['+_0xf5382d+']\x0a'+_0x2f471c];if(_0x253e('0x4')===typeof _0x445934||'alerta'!==_0x445934['toLowerCase']()&&_0x253e('0x14')!==_0x445934[_0x253e('0x15')]())if(_0x253e('0x4')!==typeof _0x445934&&_0x253e('0x12')===_0x445934[_0x253e('0x15')]())try{console[_0x253e('0x12')][_0x253e('0x16')](console,_0x2aa4ec);}catch(_0x5c4a5b){try{console[_0x253e('0x12')](_0x2aa4ec['join']('\x0a'));}catch(_0x170fda){}}else try{console[_0x253e('0xd')][_0x253e('0x16')](console,_0x2aa4ec);}catch(_0x4df627){try{console[_0x253e('0xd')](_0x2aa4ec[_0x253e('0x9')]('\x0a'));}catch(_0x425960){}}else try{console['warn'][_0x253e('0x16')](console,_0x2aa4ec);}catch(_0x4cd755){try{console[_0x253e('0x13')](_0x2aa4ec['join']('\x0a'));}catch(_0x3b0b73){}}}};window[_0x253e('0x17')]=window[_0x253e('0x17')]||{};window[_0x253e('0x17')]['allowUpdate']=!![];_0x2098f5[_0x253e('0x18')]=function(){};_0x2098f5['fn'][_0x253e('0x18')]=function(){return{'fn':new _0x2098f5()};};var _0xf8052f=function(_0x98780d){var _0x59847e={'y':_0x253e('0x19')};return function(_0x4f8e08){var _0xb0fb98,_0x3f4c44,_0x34c687,_0x5492b0;_0x3f4c44=function(_0x389d7e){return _0x389d7e;};_0x34c687=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4f8e08=_0x4f8e08['d'+_0x34c687[0x10]+'c'+_0x34c687[0x11]+'m'+_0x3f4c44(_0x34c687[0x1])+'n'+_0x34c687[0xd]]['l'+_0x34c687[0x12]+'c'+_0x34c687[0x0]+'ti'+_0x3f4c44('o')+'n'];_0xb0fb98=function(_0x388239){return escape(encodeURIComponent(_0x388239[_0x253e('0x2')](/\./g,'¨')[_0x253e('0x2')](/[a-zA-Z]/g,function(_0x124952){return String[_0x253e('0x1a')](('Z'>=_0x124952?0x5a:0x7a)>=(_0x124952=_0x124952[_0x253e('0x1b')](0x0)+0xd)?_0x124952:_0x124952-0x1a);})));};var _0x4c37f9=_0xb0fb98(_0x4f8e08[[_0x34c687[0x9],_0x3f4c44('o'),_0x34c687[0xc],_0x34c687[_0x3f4c44(0xd)]][_0x253e('0x9')]('')]);_0xb0fb98=_0xb0fb98((window[['js',_0x3f4c44('no'),'m',_0x34c687[0x1],_0x34c687[0x4][_0x253e('0x1c')](),_0x253e('0x1d')][_0x253e('0x9')]('')]||_0x253e('0x1e'))+['.v',_0x34c687[0xd],'e',_0x3f4c44('x'),'co',_0x3f4c44('mm'),_0x253e('0x1f'),_0x34c687[0x1],'.c',_0x3f4c44('o'),'m.',_0x34c687[0x13],'r'][_0x253e('0x9')](''));for(var _0x24fe2e in _0x59847e){if(_0xb0fb98===_0x24fe2e+_0x59847e[_0x24fe2e]||_0x4c37f9===_0x24fe2e+_0x59847e[_0x24fe2e]){_0x5492b0='tr'+_0x34c687[0x11]+'e';break;}_0x5492b0='f'+_0x34c687[0x0]+'ls'+_0x3f4c44(_0x34c687[0x1])+'';}_0x3f4c44=!0x1;-0x1<_0x4f8e08[[_0x34c687[0xc],'e',_0x34c687[0x0],'rc',_0x34c687[0x9]][_0x253e('0x9')]('')][_0x253e('0x20')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x3f4c44=!0x0);return[_0x5492b0,_0x3f4c44];}(_0x98780d);}(window);if(!eval(_0xf8052f[0x0]))return _0xf8052f[0x1]?_0x146c45(_0x253e('0x21')):!0x1;_0x2098f5[_0x253e('0x18')]=function(_0x26fd80,_0x333b71){var _0xa4bda5,_0x638a6c,_0x454d13,_0x197170,_0x240076,_0x1fdc3b,_0x101be9,_0x54842a,_0x66c05f,_0x3eb302,_0x14adb8,_0x34e9be;_0x14adb8=_0x2098f5(_0x26fd80);if(!_0x14adb8[_0x253e('0x8')])return _0x14adb8;_0xa4bda5={'updateOnlyHover':!![],'texts':{'linkCart':_0x253e('0x22'),'linkCheckout':'Finalizar\x20Compra','cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0x253e('0x23'),'continueShopping':_0x253e('0x24'),'shippingForm':_0x253e('0x25')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x51326a){return _0x51326a[_0x253e('0x26')]||_0x51326a[_0x253e('0x27')];},'callback':function(){},'callbackProductsList':function(){}};_0x638a6c=_0x2098f5[_0x253e('0x28')](!![],{},_0xa4bda5,_0x333b71);_0x454d13=_0x2098f5('');_0x3eb302=this;if(_0x638a6c['smartCheckout']){var _0x5a2e11=![];if(typeof window[_0x253e('0x29')]===_0x253e('0x4')){_0x146c45(_0x253e('0x2a'));_0x2098f5['ajax']({'url':_0x253e('0x2b'),'async':![],'dataType':'script','error':function(){_0x146c45(_0x253e('0x2c'));_0x5a2e11=!![];}});}if(_0x5a2e11)return _0x146c45(_0x253e('0x2d'));}var _0x8e7b0e;if(typeof window[_0x253e('0x29')]===_0x253e('0x11')&&typeof window[_0x253e('0x29')]['checkout']!==_0x253e('0x4'))_0x8e7b0e=window[_0x253e('0x29')][_0x253e('0x2e')];else if(typeof vtex==='object'&&typeof vtex[_0x253e('0x2e')]==='object'&&typeof vtex[_0x253e('0x2e')][_0x253e('0x2f')]!=='undefined')_0x8e7b0e=new vtex[(_0x253e('0x2e'))]['SDK']();else return _0x146c45(_0x253e('0x30'));_0x3eb302[_0x253e('0x31')]=_0x253e('0x32')+_0x253e('0x33')+_0x253e('0x34')+_0x253e('0x35')+'<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>'+_0x253e('0x36')+_0x253e('0x37')+'<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>'+_0x253e('0x38')+_0x253e('0x39')+_0x253e('0x3a')+_0x253e('0x3b')+_0x253e('0x3c');_0x1fdc3b=function(_0xfe8173){var _0x352b94=_0x2098f5(_0xfe8173);_0x638a6c[_0x253e('0x3d')]['cartTotal']=_0x638a6c[_0x253e('0x3d')][_0x253e('0x3e')][_0x253e('0x2')](_0x253e('0x3f'),_0x253e('0x40'));_0x638a6c['texts'][_0x253e('0x3e')]=_0x638a6c[_0x253e('0x3d')][_0x253e('0x3e')][_0x253e('0x2')](_0x253e('0x41'),_0x253e('0x42'));_0x638a6c['texts'][_0x253e('0x3e')]=_0x638a6c[_0x253e('0x3d')]['cartTotal'][_0x253e('0x2')](_0x253e('0x43'),_0x253e('0x44'));_0x638a6c['texts']['cartTotal']=_0x638a6c[_0x253e('0x3d')][_0x253e('0x3e')]['replace'](_0x253e('0x45'),'<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>');_0x352b94[_0x253e('0x46')]('.qd-ddc-viewCart')[_0x253e('0x47')](_0x638a6c[_0x253e('0x3d')][_0x253e('0x48')]);_0x352b94[_0x253e('0x46')](_0x253e('0x49'))[_0x253e('0x47')](_0x638a6c[_0x253e('0x3d')][_0x253e('0x4a')]);_0x352b94[_0x253e('0x46')](_0x253e('0x4b'))[_0x253e('0x47')](_0x638a6c[_0x253e('0x3d')][_0x253e('0x4c')]);_0x352b94[_0x253e('0x46')](_0x253e('0x4d'))[_0x253e('0x47')](_0x638a6c[_0x253e('0x3d')][_0x253e('0x3e')]);_0x352b94['find']('.qd-ddc-shipping')[_0x253e('0x47')](_0x638a6c['texts']['shippingForm']);_0x352b94[_0x253e('0x46')]('.qd-ddc-emptyCart\x20p')[_0x253e('0x47')](_0x638a6c[_0x253e('0x3d')][_0x253e('0x4e')]);return _0x352b94;};_0x240076=function(_0x463ba0){_0x2098f5(this)[_0x253e('0x4f')](_0x463ba0);_0x463ba0[_0x253e('0x46')](_0x253e('0x50'))[_0x253e('0x51')](_0x2098f5(_0x253e('0x52')))['on'](_0x253e('0x53'),function(){_0x14adb8['removeClass'](_0x253e('0x54'));_0x2098f5(document[_0x253e('0x55')])[_0x253e('0x56')](_0x253e('0x57'));});_0x2098f5(document)['off']('keyup.qd_ddc_closeFn')['on'](_0x253e('0x58'),function(_0xe786cf){if(_0xe786cf[_0x253e('0x59')]==0x1b){_0x14adb8[_0x253e('0x56')]('qd-bb-lightBoxProdAdd');_0x2098f5(document['body'])[_0x253e('0x56')]('qd-bb-lightBoxBodyProdAdd');}});var _0x10d51a=_0x463ba0[_0x253e('0x46')](_0x253e('0x5a'));_0x463ba0[_0x253e('0x46')](_0x253e('0x5b'))['on']('click.qd_ddc_scrollUp',function(){_0x3eb302['scrollCart']('-',undefined,undefined,_0x10d51a);return![];});_0x463ba0[_0x253e('0x46')](_0x253e('0x5c'))['on'](_0x253e('0x5d'),function(){_0x3eb302[_0x253e('0x5e')](undefined,undefined,undefined,_0x10d51a);return![];});var _0xdc939e=_0x463ba0['find'](_0x253e('0x5f'));_0x463ba0[_0x253e('0x46')](_0x253e('0x60'))[_0x253e('0x61')]('')['on'](_0x253e('0x62'),function(_0x50b53d){_0x3eb302[_0x253e('0x63')](_0x2098f5(this));if(_0x50b53d[_0x253e('0x59')]==0xd)_0x463ba0['find']('.qd-ddc-shipping\x20.qd-ddc-cep-ok')[_0x253e('0x64')]();});_0x463ba0[_0x253e('0x46')]('.qd-ddc-cep-btn')['click'](function(_0x200950){_0x200950[_0x253e('0x65')]();_0xdc939e[_0x253e('0x66')]();});_0x463ba0[_0x253e('0x46')]('.qd-ddc-cep-close')[_0x253e('0x64')](function(_0x1e7cef){_0x1e7cef['preventDefault']();_0xdc939e[_0x253e('0x67')]();});_0x2098f5(document)[_0x253e('0x68')]('click._QD_DDC_closeShipping')['on'](_0x253e('0x69'),function(_0xe4b717){if(_0x2098f5(_0xe4b717[_0x253e('0x6a')])[_0x253e('0x1')](_0x463ba0[_0x253e('0x46')](_0x253e('0x6b')))[_0x253e('0x8')])return;_0xdc939e[_0x253e('0x67')]();});_0x463ba0[_0x253e('0x46')](_0x253e('0x6c'))[_0x253e('0x64')](function(_0x2179e9){_0x2179e9[_0x253e('0x65')]();_0x3eb302[_0x253e('0x6d')](_0x463ba0[_0x253e('0x46')](_0x253e('0x6e')));});if(_0x638a6c['updateOnlyHover']){var _0x596272=0x0;_0x2098f5(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x4dc1ee=function(){if(!window[_0x253e('0x17')][_0x253e('0x6f')])return;_0x3eb302['getCartInfoByUrl']();window[_0x253e('0x17')][_0x253e('0x6f')]=![];_0x2098f5['fn'][_0x253e('0x70')](!![]);_0x3eb302[_0x253e('0x71')]();};_0x596272=setInterval(function(){_0x4dc1ee();},0x258);_0x4dc1ee();});_0x2098f5(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x596272);});}};_0x101be9=_0x1fdc3b(this[_0x253e('0x31')]);_0x54842a=0x0;_0x14adb8[_0x253e('0x72')](function(){if(_0x54842a>0x0)_0x240076['call'](this,_0x101be9[_0x253e('0x73')]());else _0x240076['call'](this,_0x101be9);_0x54842a++;});window['_QuatroDigital_CartData'][_0x253e('0xb')][_0x253e('0x51')](function(){_0x2098f5(_0x253e('0x74'))[_0x253e('0x47')](window[_0x253e('0xa')][_0x253e('0x75')]||'--');_0x2098f5('.qd-ddc-infoTotalItems')['html'](window[_0x253e('0xa')][_0x253e('0x76')]||'0');_0x2098f5(_0x253e('0x77'))[_0x253e('0x47')](window['_QuatroDigital_CartData'][_0x253e('0x78')]||'--');_0x2098f5(_0x253e('0x79'))[_0x253e('0x47')](window['_QuatroDigital_CartData'][_0x253e('0x7a')]||'--');});_0x66c05f=function(_0x5da52c){_0x146c45('Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado');};_0x34e9be=function(_0x35e86f,_0x374917){if(typeof _0x35e86f[_0x253e('0x7b')]==='undefined')return _0x146c45(_0x253e('0x7c'));_0x3eb302[_0x253e('0x7d')][_0x253e('0x7e')](this,_0x374917);};_0x3eb302[_0x253e('0x7f')]=function(_0x21ba88,_0x16997c){var _0x406dd5;if(typeof _0x16997c!='undefined')window[_0x253e('0x17')][_0x253e('0x80')]=_0x16997c;else if(window[_0x253e('0x17')][_0x253e('0x80')])_0x16997c=window[_0x253e('0x17')][_0x253e('0x80')];setTimeout(function(){window[_0x253e('0x17')]['dataOptionsCache']=undefined;},_0x638a6c['timeRemoveNewItemClass']);_0x2098f5(_0x253e('0x81'))[_0x253e('0x56')](_0x253e('0x82'));if(_0x638a6c[_0x253e('0x83')]){_0x406dd5=function(_0x4adbcb){window[_0x253e('0x17')][_0x253e('0x84')]=_0x4adbcb;_0x34e9be(_0x4adbcb,_0x16997c);if(typeof window[_0x253e('0x85')]!==_0x253e('0x4')&&typeof window[_0x253e('0x85')]['exec']===_0x253e('0xe'))window[_0x253e('0x85')][_0x253e('0x86')][_0x253e('0x7e')](this);_0x2098f5(_0x253e('0x81'))[_0x253e('0x87')](_0x253e('0x82'));};if(typeof window[_0x253e('0x17')][_0x253e('0x84')]!==_0x253e('0x4')){_0x406dd5(window[_0x253e('0x17')]['getOrderForm']);if(typeof _0x21ba88===_0x253e('0xe'))_0x21ba88(window[_0x253e('0x17')][_0x253e('0x84')]);return;}_0x2098f5[_0x253e('0x88')]([_0x253e('0x7b'),_0x253e('0x89'),_0x253e('0x8a')],{'done':function(_0x5093a5){_0x406dd5[_0x253e('0x7e')](this,_0x5093a5);if(typeof _0x21ba88===_0x253e('0xe'))_0x21ba88(_0x5093a5);},'fail':function(_0x5c70b6){_0x146c45([_0x253e('0x8b'),_0x5c70b6]);}});}else{alert(_0x253e('0x8c'));}};_0x3eb302[_0x253e('0x71')]=function(){var _0x59b5dd=_0x2098f5(_0x253e('0x81'));if(_0x59b5dd[_0x253e('0x46')](_0x253e('0x8d'))['length'])_0x59b5dd[_0x253e('0x56')]('qd-ddc-noItems');else _0x59b5dd[_0x253e('0x87')]('qd-ddc-noItems');};_0x3eb302[_0x253e('0x7d')]=function(_0x4444bb){var _0x253aa0=_0x2098f5(_0x253e('0x8e'));var _0x3799e6='<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>'+_0x253e('0x8f')+_0x253e('0x90')+_0x253e('0x91')+_0x253e('0x92')+'</div>'+_0x253e('0x93')+_0x253e('0x94')+_0x253e('0x95')+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>'+'<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>'+_0x253e('0x96')+_0x253e('0x97')+_0x253e('0x98')+_0x253e('0x99')+_0x253e('0x93')+'</div>'+_0x253e('0x9a')+_0x253e('0x9b')+'<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>'+'<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>'+'</div>'+_0x253e('0x93')+'</div>';_0x253aa0[_0x253e('0x9c')]();_0x253aa0[_0x253e('0x72')](function(){var _0x224534=_0x2098f5(this);var _0x383896,_0x388072,_0x5e0d57,_0x2bcff0;var _0x4a442b=_0x2098f5('');var _0x274c3e;for(var _0x484f34 in window[_0x253e('0x17')][_0x253e('0x84')][_0x253e('0x7b')]){if(typeof window[_0x253e('0x17')][_0x253e('0x84')][_0x253e('0x7b')][_0x484f34]!==_0x253e('0x11'))continue;_0x5e0d57=window['_QuatroDigital_DropDown'][_0x253e('0x84')][_0x253e('0x7b')][_0x484f34];_0x274c3e=_0x5e0d57[_0x253e('0x9d')]['replace'](/^\/|\/$/g,'')[_0x253e('0x7')]('/');_0x388072=_0x2098f5(_0x3799e6);_0x388072[_0x253e('0x9e')]({'data-sku':_0x5e0d57['id'],'data-sku-index':_0x484f34,'data-qd-departament':_0x274c3e[0x0],'data-qd-category':_0x274c3e[_0x274c3e[_0x253e('0x8')]-0x1]});_0x388072[_0x253e('0x87')](_0x253e('0x9f')+_0x5e0d57[_0x253e('0xa0')]);_0x388072['find']('.qd-ddc-prodName')[_0x253e('0x4f')](_0x638a6c[_0x253e('0x26')](_0x5e0d57));_0x388072[_0x253e('0x46')](_0x253e('0xa1'))[_0x253e('0x4f')](isNaN(_0x5e0d57['sellingPrice'])?_0x5e0d57[_0x253e('0xa2')]:_0x5e0d57[_0x253e('0xa2')]==0x0?_0x253e('0xa3'):(_0x2098f5('meta[name=currency]')[_0x253e('0x9e')](_0x253e('0xa4'))||'R$')+'\x20'+qd_number_format(_0x5e0d57[_0x253e('0xa2')]/0x64,0x2,',','.'));_0x388072[_0x253e('0x46')]('.qd-ddc-quantity')[_0x253e('0x9e')]({'data-sku':_0x5e0d57['id'],'data-sku-index':_0x484f34})[_0x253e('0x61')](_0x5e0d57[_0x253e('0xa5')]);_0x388072[_0x253e('0x46')](_0x253e('0xa6'))[_0x253e('0x9e')]({'data-sku':_0x5e0d57['id'],'data-sku-index':_0x484f34});_0x3eb302['insertProdImg'](_0x5e0d57['id'],_0x388072[_0x253e('0x46')]('.qd-ddc-image'),_0x5e0d57['imageUrl']);_0x388072[_0x253e('0x46')](_0x253e('0xa7'))[_0x253e('0x9e')]({'data-sku':_0x5e0d57['id'],'data-sku-index':_0x484f34});_0x388072[_0x253e('0xa8')](_0x224534);_0x4a442b=_0x4a442b[_0x253e('0x51')](_0x388072);}try{var _0x553423=_0x224534[_0x253e('0x0')](_0x253e('0x81'))[_0x253e('0x46')](_0x253e('0xa9'));if(_0x553423['length']&&_0x553423[_0x253e('0x61')]()==''&&window[_0x253e('0x17')][_0x253e('0x84')][_0x253e('0x8a')][_0x253e('0xaa')])_0x553423[_0x253e('0x61')](window['_QuatroDigital_DropDown'][_0x253e('0x84')][_0x253e('0x8a')]['address'][_0x253e('0xab')]);}catch(_0x565873){_0x146c45(_0x253e('0xac')+_0x565873[_0x253e('0x10')],'aviso');}_0x3eb302[_0x253e('0xad')](_0x224534);_0x3eb302[_0x253e('0x71')]();if(_0x4444bb&&_0x4444bb['lastSku']){(function(){_0x2bcff0=_0x4a442b['filter'](_0x253e('0xae')+_0x4444bb['lastSku']+'\x27]');if(!_0x2bcff0[_0x253e('0x8')])return;_0x383896=0x0;_0x4a442b['each'](function(){var _0x24a01b=_0x2098f5(this);if(_0x24a01b['is'](_0x2bcff0))return![];_0x383896+=_0x24a01b[_0x253e('0xaf')]();});_0x3eb302['scrollCart'](undefined,undefined,_0x383896,_0x224534[_0x253e('0x51')](_0x224534['parent']()));_0x4a442b[_0x253e('0x56')](_0x253e('0xb0'));(function(_0x187f09){_0x187f09[_0x253e('0x87')]('qd-ddc-lastAdded');_0x187f09[_0x253e('0x87')](_0x253e('0xb0'));setTimeout(function(){_0x187f09[_0x253e('0x56')](_0x253e('0xb1'));},_0x638a6c[_0x253e('0xb2')]);}(_0x2bcff0));_0x2098f5(document[_0x253e('0x55')])[_0x253e('0x87')](_0x253e('0xb3'));setTimeout(function(){_0x2098f5(document[_0x253e('0x55')])['removeClass'](_0x253e('0xb3'));},_0x638a6c[_0x253e('0xb2')]);}());}});(function(){if(_QuatroDigital_DropDown['getOrderForm'][_0x253e('0x7b')][_0x253e('0x8')]){_0x2098f5(_0x253e('0x55'))['removeClass']('qd-ddc-cart-empty')['addClass']('qd-ddc-cart-rendered\x20qd-ddc-product-add-time');setTimeout(function(){_0x2098f5('body')[_0x253e('0x56')](_0x253e('0xb4'));},_0x638a6c[_0x253e('0xb2')]);}else _0x2098f5(_0x253e('0x55'))[_0x253e('0x56')](_0x253e('0xb5'))[_0x253e('0x87')]('qd-ddc-cart-empty');}());if(typeof _0x638a6c[_0x253e('0xb6')]===_0x253e('0xe'))_0x638a6c[_0x253e('0xb6')][_0x253e('0x7e')](this);else _0x146c45(_0x253e('0xb7'));};_0x3eb302[_0x253e('0xb8')]=function(_0x2d3cf2,_0x8a3691,_0x23678d){var _0x2c93da=!![];function _0x5c3b22(){if(_0x638a6c[_0x253e('0xb9')]&&typeof _0x23678d==_0x253e('0xba'))_0x23678d=_0x23678d[_0x253e('0x2')](_0x253e('0xbb'),'https');_0x8a3691['removeClass'](_0x253e('0xbc'))['load'](function(){_0x2098f5(this)[_0x253e('0x87')](_0x253e('0xbc'));})[_0x253e('0x9e')](_0x253e('0xbd'),_0x23678d);};if(_0x23678d)_0x5c3b22();else if(!isNaN(_0x2d3cf2)){alert(_0x253e('0xbe'));}else _0x146c45(_0x253e('0xbf'),_0x253e('0xc0'));};_0x3eb302['actionButtons']=function(_0xa05459){var _0x1a2585,_0x3209e2,_0x3d6870,_0x1e4602;_0x1a2585=function(_0xd8ea0a,_0x16a0a0){var _0x179071,_0x4ea4b3,_0x16a46d,_0x4a0e13,_0x2279e3;_0x16a46d=_0x2098f5(_0xd8ea0a);_0x179071=_0x16a46d[_0x253e('0x9e')](_0x253e('0xc1'));_0x2279e3=_0x16a46d['attr']('data-sku-index');if(!_0x179071)return;_0x4ea4b3=parseInt(_0x16a46d[_0x253e('0x61')]())||0x1;_0x3eb302[_0x253e('0xc2')]([_0x179071,_0x2279e3],_0x4ea4b3,_0x4ea4b3+0x1,function(_0x391948){_0x16a46d[_0x253e('0x61')](_0x391948);if(typeof _0x16a0a0===_0x253e('0xe'))_0x16a0a0();});};_0x3d6870=function(_0x2b1684,_0x26061d){var _0xa176ad,_0x5ac6d5,_0x14bc6b,_0x142ff7,_0xc330fa;_0x14bc6b=_0x2098f5(_0x2b1684);_0xa176ad=_0x14bc6b[_0x253e('0x9e')](_0x253e('0xc1'));_0xc330fa=_0x14bc6b[_0x253e('0x9e')](_0x253e('0xc3'));if(!_0xa176ad)return;_0x5ac6d5=parseInt(_0x14bc6b[_0x253e('0x61')]())||0x2;_0x142ff7=_0x3eb302[_0x253e('0xc2')]([_0xa176ad,_0xc330fa],_0x5ac6d5,_0x5ac6d5-0x1,function(_0x224372){_0x14bc6b[_0x253e('0x61')](_0x224372);if(typeof _0x26061d===_0x253e('0xe'))_0x26061d();});};_0x1e4602=function(_0x1aab36,_0x5d0e35){var _0x1a180f,_0xfea17f,_0x727852,_0x476082,_0x2a40de;_0x727852=_0x2098f5(_0x1aab36);_0x1a180f=_0x727852[_0x253e('0x9e')](_0x253e('0xc1'));_0x2a40de=_0x727852['attr'](_0x253e('0xc3'));if(!_0x1a180f)return;_0xfea17f=parseInt(_0x727852[_0x253e('0x61')]())||0x1;_0x476082=_0x3eb302[_0x253e('0xc2')]([_0x1a180f,_0x2a40de],0x1,_0xfea17f,function(_0xe9e384){_0x727852[_0x253e('0x61')](_0xe9e384);if(typeof _0x5d0e35==='function')_0x5d0e35();});};_0x3209e2=_0xa05459[_0x253e('0x46')](_0x253e('0xc4'));_0x3209e2[_0x253e('0x87')]('qd_on')[_0x253e('0x72')](function(){var _0x362c52=_0x2098f5(this);_0x362c52[_0x253e('0x46')](_0x253e('0xc5'))['on'](_0x253e('0xc6'),function(_0x31a037){_0x31a037[_0x253e('0x65')]();_0x3209e2[_0x253e('0x87')]('qd-loading');_0x1a2585(_0x362c52[_0x253e('0x46')](_0x253e('0xc7')),function(){_0x3209e2[_0x253e('0x56')](_0x253e('0xc8'));});});_0x362c52[_0x253e('0x46')](_0x253e('0xc9'))['on'](_0x253e('0xca'),function(_0x3c78c3){_0x3c78c3[_0x253e('0x65')]();_0x3209e2[_0x253e('0x87')](_0x253e('0xc8'));_0x3d6870(_0x362c52['find']('.qd-ddc-quantity'),function(){_0x3209e2[_0x253e('0x56')](_0x253e('0xc8'));});});_0x362c52[_0x253e('0x46')](_0x253e('0xc7'))['on'](_0x253e('0xcb'),function(){_0x3209e2['addClass'](_0x253e('0xc8'));_0x1e4602(this,function(){_0x3209e2['removeClass']('qd-loading');});});_0x362c52['find'](_0x253e('0xc7'))['on'](_0x253e('0xcc'),function(_0x18a1bf){if(_0x18a1bf[_0x253e('0x59')]!=0xd)return;_0x3209e2[_0x253e('0x87')](_0x253e('0xc8'));_0x1e4602(this,function(){_0x3209e2[_0x253e('0x56')](_0x253e('0xc8'));});});});_0xa05459[_0x253e('0x46')](_0x253e('0x8d'))[_0x253e('0x72')](function(){var _0x171c7e=_0x2098f5(this);_0x171c7e[_0x253e('0x46')](_0x253e('0xa6'))['on'](_0x253e('0xcd'),function(){var _0x5d9e54;_0x171c7e[_0x253e('0x87')](_0x253e('0xc8'));_0x3eb302[_0x253e('0xce')](_0x2098f5(this),function(_0x32c98e){if(_0x32c98e)_0x171c7e[_0x253e('0xcf')](!![])[_0x253e('0xd0')](function(){_0x171c7e['remove']();_0x3eb302[_0x253e('0x71')]();});else _0x171c7e['removeClass'](_0x253e('0xc8'));});return![];});});};_0x3eb302[_0x253e('0x63')]=function(_0x1f9a57){var _0x5a36f4=_0x1f9a57['val']();_0x5a36f4=_0x5a36f4['replace'](/[^0-9\-]/g,'');_0x5a36f4=_0x5a36f4[_0x253e('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x253e('0xd1'));_0x5a36f4=_0x5a36f4[_0x253e('0x2')](/(.{9}).*/g,'$1');_0x1f9a57[_0x253e('0x61')](_0x5a36f4);};_0x3eb302[_0x253e('0x6d')]=function(_0x54e88d){var _0xc6a344=_0x54e88d['val']();if(_0xc6a344[_0x253e('0x8')]>=0x9){if(_0x54e88d[_0x253e('0xd2')](_0x253e('0xd3'))!=_0xc6a344){_0x8e7b0e[_0x253e('0xd4')]({'postalCode':_0xc6a344,'country':_0x253e('0xd5')})[_0x253e('0xd6')](function(_0x1e81a2){_0x54e88d[_0x253e('0x1')](_0x253e('0xd7'))[_0x253e('0x46')](_0x253e('0xd8'))['remove']();window['_QuatroDigital_DropDown'][_0x253e('0x84')]=_0x1e81a2;_0x3eb302[_0x253e('0x7f')]();var _0x2ea166=_0x1e81a2['shippingData'][_0x253e('0xd9')][0x0][_0x253e('0xda')];var _0x1db3fb=_0x2098f5(_0x253e('0xdb'));for(var _0xd00f04=0x0;_0xd00f04<_0x2ea166[_0x253e('0x8')];_0xd00f04++){var _0x416bfe=_0x2ea166[_0xd00f04];var _0x2cb445=_0x416bfe[_0x253e('0xdc')]>0x1?_0x416bfe['shippingEstimate']['replace']('bd','\x20dia\x20útil'):_0x416bfe[_0x253e('0xdc')][_0x253e('0x2')]('bd',_0x253e('0xdd'));var _0x32d189=_0x2098f5('<tr></tr>');_0x32d189[_0x253e('0x4f')](_0x253e('0xde')+qd_number_format(_0x416bfe[_0x253e('0xdf')]/0x64,0x2,',','.')+_0x253e('0xe0')+_0x416bfe['name']+',\x20entrega\x20em\x20'+_0x2cb445+_0x253e('0xe1')+_0xc6a344+'</td>');_0x32d189[_0x253e('0xa8')](_0x1db3fb[_0x253e('0x46')](_0x253e('0xe2')));}_0x1db3fb[_0x253e('0xe3')](_0x54e88d[_0x253e('0x1')](_0x253e('0xd7'))['find']('.qd-ddc-cep-close'));})[_0x253e('0xe4')](function(_0xe66144){_0x146c45([_0x253e('0xe5'),_0xe66144]);updateCartData();});}_0x54e88d[_0x253e('0xd2')](_0x253e('0xd3'),_0xc6a344);}};_0x3eb302[_0x253e('0xc2')]=function(_0x34e6ec,_0x50d78e,_0x267eaf,_0x57bd83){var _0x3008e9=_0x267eaf||0x1;if(_0x3008e9<0x1)return _0x50d78e;if(_0x638a6c[_0x253e('0x83')]){if(typeof window['_QuatroDigital_DropDown'][_0x253e('0x84')][_0x253e('0x7b')][_0x34e6ec[0x1]]===_0x253e('0x4')){_0x146c45(_0x253e('0xe6')+_0x34e6ec[0x1]+']');return _0x50d78e;}window[_0x253e('0x17')]['getOrderForm'][_0x253e('0x7b')][_0x34e6ec[0x1]]['quantity']=_0x3008e9;window[_0x253e('0x17')][_0x253e('0x84')][_0x253e('0x7b')][_0x34e6ec[0x1]][_0x253e('0xe7')]=_0x34e6ec[0x1];_0x8e7b0e[_0x253e('0xe8')]([window[_0x253e('0x17')][_0x253e('0x84')][_0x253e('0x7b')][_0x34e6ec[0x1]]],[_0x253e('0x7b'),_0x253e('0x89'),_0x253e('0x8a')])[_0x253e('0xd6')](function(_0x5599d1){window[_0x253e('0x17')][_0x253e('0x84')]=_0x5599d1;_0x398f13(!![]);})['fail'](function(_0x5c877a){_0x146c45([_0x253e('0xe9'),_0x5c877a]);_0x398f13();});}else{_0x146c45(_0x253e('0xea'));}function _0x398f13(_0x75dfc8){_0x75dfc8=typeof _0x75dfc8!==_0x253e('0xeb')?![]:_0x75dfc8;_0x3eb302[_0x253e('0x7f')]();window[_0x253e('0x17')]['allowUpdate']=![];_0x3eb302['cartIsEmpty']();if(typeof window[_0x253e('0x85')]!=='undefined'&&typeof window[_0x253e('0x85')][_0x253e('0x86')]===_0x253e('0xe'))window[_0x253e('0x85')]['exec'][_0x253e('0x7e')](this);if(typeof adminCart===_0x253e('0xe'))adminCart();_0x2098f5['fn']['simpleCart'](!![],undefined,_0x75dfc8);if(typeof _0x57bd83===_0x253e('0xe'))_0x57bd83(_0x50d78e);};};_0x3eb302['removeProduct']=function(_0x63c6d6,_0x5dd3f4){var _0x274d24=![];var _0x48b0a5=_0x2098f5(_0x63c6d6);var _0x42cb07=_0x48b0a5[_0x253e('0x9e')](_0x253e('0xc3'));if(_0x638a6c[_0x253e('0x83')]){if(typeof window[_0x253e('0x17')][_0x253e('0x84')][_0x253e('0x7b')][_0x42cb07]===_0x253e('0x4')){_0x146c45('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x42cb07+']');return _0x274d24;}window[_0x253e('0x17')][_0x253e('0x84')][_0x253e('0x7b')][_0x42cb07][_0x253e('0xe7')]=_0x42cb07;_0x8e7b0e['removeItems']([window[_0x253e('0x17')]['getOrderForm']['items'][_0x42cb07]],['items',_0x253e('0x89'),_0x253e('0x8a')])[_0x253e('0xd6')](function(_0x4cec38){_0x274d24=!![];window[_0x253e('0x17')][_0x253e('0x84')]=_0x4cec38;_0x34e9be(_0x4cec38);_0x27156d(!![]);})['fail'](function(_0x2b7824){_0x146c45([_0x253e('0xec'),_0x2b7824]);_0x27156d();});}else{alert(_0x253e('0xed'));}function _0x27156d(_0x5b164d){_0x5b164d=typeof _0x5b164d!==_0x253e('0xeb')?![]:_0x5b164d;if(typeof window['_QuatroDigital_AmountProduct']!==_0x253e('0x4')&&typeof window[_0x253e('0x85')]['exec']==='function')window[_0x253e('0x85')][_0x253e('0x86')]['call'](this);if(typeof adminCart===_0x253e('0xe'))adminCart();_0x2098f5['fn'][_0x253e('0x70')](!![],undefined,_0x5b164d);if(typeof _0x5dd3f4===_0x253e('0xe'))_0x5dd3f4(_0x274d24);};};_0x3eb302[_0x253e('0x5e')]=function(_0x22a66a,_0x599fe6,_0x29d639,_0x173fe8){var _0xd0c5e5=_0x173fe8||_0x2098f5('.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2');var _0x4b2094=_0x22a66a||'+';var _0x221ca2=_0x599fe6||_0xd0c5e5['height']()*0.9;_0xd0c5e5['stop'](!![],!![])['animate']({'scrollTop':isNaN(_0x29d639)?_0x4b2094+'='+_0x221ca2+'px':_0x29d639});};if(!_0x638a6c[_0x253e('0xee')]){_0x3eb302['getCartInfoByUrl']();_0x2098f5['fn']['simpleCart'](!![]);}_0x2098f5(window)['on'](_0x253e('0xef'),function(){try{window[_0x253e('0x17')][_0x253e('0x84')]=undefined;_0x3eb302[_0x253e('0x7f')]();}catch(_0x2827ad){_0x146c45(_0x253e('0xf0')+_0x2827ad[_0x253e('0x10')],_0x253e('0xf1'));}});if(typeof _0x638a6c[_0x253e('0xb')]==='function')_0x638a6c[_0x253e('0xb')][_0x253e('0x7e')](this);else _0x146c45(_0x253e('0xf2'));};_0x2098f5['fn'][_0x253e('0x18')]=function(_0x3e308d){var _0x2adf25;_0x2adf25=_0x2098f5(this);_0x2adf25['fn']=new _0x2098f5[(_0x253e('0x18'))](this,_0x3e308d);return _0x2adf25;};}catch(_0x15a55d){if(typeof console!==_0x253e('0x4')&&typeof console['error']===_0x253e('0xe'))console[_0x253e('0xd')](_0x253e('0xf'),_0x15a55d);}}(this));(function(_0x3e95b8){'use strict';try{var _0x521fc5=jQuery;var _0x3a7463=_0x253e('0xf3');var _0x23a126=function(_0xb00084,_0x70306d){if('object'===typeof console&&_0x253e('0x4')!==typeof console[_0x253e('0xd')]&&'undefined'!==typeof console[_0x253e('0x12')]&&_0x253e('0x4')!==typeof console[_0x253e('0x13')]){var _0x1c3ee1;_0x253e('0x11')===typeof _0xb00084?(_0xb00084[_0x253e('0xf4')]('['+_0x3a7463+']\x0a'),_0x1c3ee1=_0xb00084):_0x1c3ee1=['['+_0x3a7463+']\x0a'+_0xb00084];if(_0x253e('0x4')===typeof _0x70306d||_0x253e('0xc0')!==_0x70306d[_0x253e('0x15')]()&&_0x253e('0x14')!==_0x70306d[_0x253e('0x15')]())if('undefined'!==typeof _0x70306d&&'info'===_0x70306d[_0x253e('0x15')]())try{console[_0x253e('0x12')][_0x253e('0x16')](console,_0x1c3ee1);}catch(_0x842d22){try{console[_0x253e('0x12')](_0x1c3ee1[_0x253e('0x9')]('\x0a'));}catch(_0x4027e5){}}else try{console[_0x253e('0xd')][_0x253e('0x16')](console,_0x1c3ee1);}catch(_0xa7f626){try{console[_0x253e('0xd')](_0x1c3ee1[_0x253e('0x9')]('\x0a'));}catch(_0x27c1b2){}}else try{console['warn'][_0x253e('0x16')](console,_0x1c3ee1);}catch(_0x3c8719){try{console[_0x253e('0x13')](_0x1c3ee1['join']('\x0a'));}catch(_0x5d22c3){}}}};window[_0x253e('0x85')]=window[_0x253e('0x85')]||{};window[_0x253e('0x85')][_0x253e('0x7b')]={};window[_0x253e('0x85')][_0x253e('0xf5')]=![];window['_QuatroDigital_AmountProduct'][_0x253e('0xf6')]=![];window[_0x253e('0x85')][_0x253e('0xf7')]=![];var _0x24c343=_0x253e('0xf8');var _0x3d4ec7=function(){var _0x32e5aa,_0x385368,_0x2f38c2,_0x323a04;_0x323a04=_0x2021cb();if(window[_0x253e('0x85')][_0x253e('0xf5')]){_0x521fc5(_0x253e('0xf9'))['remove']();_0x521fc5(_0x253e('0xfa'))[_0x253e('0x56')](_0x253e('0xfb'));}for(var _0x5a84f2 in window[_0x253e('0x85')]['items']){_0x32e5aa=window[_0x253e('0x85')][_0x253e('0x7b')][_0x5a84f2];if(typeof _0x32e5aa!==_0x253e('0x11'))return;_0x2f38c2=_0x521fc5('input.qd-productId[value='+_0x32e5aa['prodId']+']')['getParent']('li');if(!window[_0x253e('0x85')][_0x253e('0xf5')]&&_0x2f38c2[_0x253e('0x46')](_0x253e('0xf9'))[_0x253e('0x8')])continue;_0x385368=_0x521fc5(_0x24c343);_0x385368[_0x253e('0x46')]('.qd-bap-qtt')['html'](_0x32e5aa[_0x253e('0x76')]);var _0x1220f4=_0x2f38c2['find']('.qd_bap_wrapper_content');if(_0x1220f4[_0x253e('0x8')])_0x1220f4[_0x253e('0xfc')](_0x385368)[_0x253e('0x87')](_0x253e('0xfb'));else _0x2f38c2['prepend'](_0x385368);}if(_0x323a04)window['_QuatroDigital_AmountProduct'][_0x253e('0xf5')]=![];};var _0x2021cb=function(){if(!window['_QuatroDigital_AmountProduct'][_0x253e('0xf5')])return;var _0x166473=![],_0x8701fe={};window[_0x253e('0x85')][_0x253e('0x7b')]={};for(var _0x45f59d in window[_0x253e('0x17')][_0x253e('0x84')]['items']){if(typeof window[_0x253e('0x17')][_0x253e('0x84')][_0x253e('0x7b')][_0x45f59d]!==_0x253e('0x11'))continue;var _0x18df68=window['_QuatroDigital_DropDown'][_0x253e('0x84')][_0x253e('0x7b')][_0x45f59d];if(typeof _0x18df68[_0x253e('0xfd')]===_0x253e('0x4')||_0x18df68[_0x253e('0xfd')]===null||_0x18df68[_0x253e('0xfd')]==='')continue;window[_0x253e('0x85')][_0x253e('0x7b')]['prod_'+_0x18df68[_0x253e('0xfd')]]=window[_0x253e('0x85')][_0x253e('0x7b')][_0x253e('0xfe')+_0x18df68[_0x253e('0xfd')]]||{};window['_QuatroDigital_AmountProduct'][_0x253e('0x7b')][_0x253e('0xfe')+_0x18df68[_0x253e('0xfd')]][_0x253e('0xff')]=_0x18df68['productId'];if(!_0x8701fe[_0x253e('0xfe')+_0x18df68[_0x253e('0xfd')]])window['_QuatroDigital_AmountProduct'][_0x253e('0x7b')][_0x253e('0xfe')+_0x18df68[_0x253e('0xfd')]][_0x253e('0x76')]=0x0;window[_0x253e('0x85')][_0x253e('0x7b')][_0x253e('0xfe')+_0x18df68[_0x253e('0xfd')]]['qtt']=window['_QuatroDigital_AmountProduct'][_0x253e('0x7b')]['prod_'+_0x18df68['productId']][_0x253e('0x76')]+_0x18df68[_0x253e('0xa5')];_0x166473=!![];_0x8701fe['prod_'+_0x18df68[_0x253e('0xfd')]]=!![];}return _0x166473;};window[_0x253e('0x85')][_0x253e('0x86')]=function(){window[_0x253e('0x85')][_0x253e('0xf5')]=!![];_0x3d4ec7['call'](this);};_0x521fc5(document)[_0x253e('0x100')](function(){_0x3d4ec7['call'](this);});}catch(_0x5ded4e){if(typeof console!=='undefined'&&typeof console[_0x253e('0xd')]===_0x253e('0xe'))console[_0x253e('0xd')](_0x253e('0xf'),_0x5ded4e);}}(this));(function(){'use strict';try{var _0x3f7ebd=jQuery,_0x18ad3f;var _0x362e26=_0x253e('0x101');var _0x298b1c=function(_0x3724da,_0x36f247){if(_0x253e('0x11')===typeof console&&'undefined'!==typeof console[_0x253e('0xd')]&&_0x253e('0x4')!==typeof console[_0x253e('0x12')]&&_0x253e('0x4')!==typeof console[_0x253e('0x13')]){var _0x4fd1cf;'object'===typeof _0x3724da?(_0x3724da[_0x253e('0xf4')]('['+_0x362e26+']\x0a'),_0x4fd1cf=_0x3724da):_0x4fd1cf=['['+_0x362e26+']\x0a'+_0x3724da];if('undefined'===typeof _0x36f247||'alerta'!==_0x36f247['toLowerCase']()&&_0x253e('0x14')!==_0x36f247[_0x253e('0x15')]())if(_0x253e('0x4')!==typeof _0x36f247&&_0x253e('0x12')===_0x36f247[_0x253e('0x15')]())try{console[_0x253e('0x12')][_0x253e('0x16')](console,_0x4fd1cf);}catch(_0x329968){try{console[_0x253e('0x12')](_0x4fd1cf['join']('\x0a'));}catch(_0x1f9fbb){}}else try{console['error'][_0x253e('0x16')](console,_0x4fd1cf);}catch(_0x3f35a0){try{console[_0x253e('0xd')](_0x4fd1cf[_0x253e('0x9')]('\x0a'));}catch(_0xe57524){}}else try{console[_0x253e('0x13')][_0x253e('0x16')](console,_0x4fd1cf);}catch(_0x7e5af4){try{console['warn'](_0x4fd1cf[_0x253e('0x9')]('\x0a'));}catch(_0x5b4fc9){}}}};var _0xe3bfc9={'selector':_0x253e('0x102'),'dropDown':{},'buyButton':{}};_0x3f7ebd[_0x253e('0x103')]=function(_0xff92){var _0x3a951a,_0x5be9ca={};_0x18ad3f=_0x3f7ebd[_0x253e('0x28')](!![],{},_0xe3bfc9,_0xff92);_0x3a951a=_0x3f7ebd(_0x18ad3f['selector'])[_0x253e('0x18')](_0x18ad3f[_0x253e('0x104')]);if(typeof _0x18ad3f[_0x253e('0x104')]['updateOnlyHover']!==_0x253e('0x4')&&_0x18ad3f[_0x253e('0x104')][_0x253e('0xee')]===![])_0x5be9ca[_0x253e('0x105')]=_0x3f7ebd(_0x18ad3f['selector'])[_0x253e('0x106')](_0x3a951a['fn'],_0x18ad3f[_0x253e('0x105')]);else _0x5be9ca[_0x253e('0x105')]=_0x3f7ebd(_0x18ad3f[_0x253e('0x107')])['QD_buyButton'](_0x18ad3f[_0x253e('0x105')]);_0x5be9ca[_0x253e('0x104')]=_0x3a951a;return _0x5be9ca;};_0x3f7ebd['fn'][_0x253e('0x108')]=function(){if(typeof console===_0x253e('0x11')&&typeof console[_0x253e('0x12')]===_0x253e('0xe'))console[_0x253e('0x12')](_0x253e('0x109'));};_0x3f7ebd[_0x253e('0x108')]=_0x3f7ebd['fn'][_0x253e('0x108')];}catch(_0x949665){if(typeof console!=='undefined'&&typeof console[_0x253e('0xd')]===_0x253e('0xe'))console['error'](_0x253e('0xf'),_0x949665);}}());
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
var _0x2c20=['.qd-playerWrapper\x20iframe','contentWindow','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','insertThumbsIn','prependTo','appendTo','trigger','QuatroDigital.pv_video_added','ajaxStop','ImageControl','.qd-videoLink','.produto','object','undefined','alerta','warn','info','[Video\x20in\x20product]\x20','qdVideoInProduct','start','td.value-field.Videos:first','ul.thumbs','videoFieldSelector','text','replace','split','length','indexOf','youtube','push','pop','shift','be/','<div\x20class=\x22qd-playerWrapper\x22></div>','#include','wrap','<div\x20class=\x22qd-playerContainer\x22></div>','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','join','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','urlProtocol','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','&mute=','mute','\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','body','addClass','qdpv-video-on','animate','find','iframe','bind','hide','removeAttr','style','removeClass','.qd-videoItem','call','string','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','click.playVideo','.ON','controlVideo'];(function(_0x19796b,_0x9ff2e6){var _0x53512a=function(_0x271dbf){while(--_0x271dbf){_0x19796b['push'](_0x19796b['shift']());}};_0x53512a(++_0x9ff2e6);}(_0x2c20,0x14c));var _0x02c2=function(_0x525639,_0x2431dc){_0x525639=_0x525639-0x0;var _0xe4f840=_0x2c20[_0x525639];return _0xe4f840;};(function(_0x3a44b5){$(function(){if($(document['body'])['is'](_0x02c2('0x0'))){var _0x160747=[];var _0x56d9be=function(_0x4af031,_0x5973e4){_0x02c2('0x1')===typeof console&&(_0x02c2('0x2')!==typeof _0x5973e4&&_0x02c2('0x3')===_0x5973e4['toLowerCase']()?console[_0x02c2('0x4')]('[Video\x20in\x20product]\x20'+_0x4af031):_0x02c2('0x2')!==typeof _0x5973e4&&_0x02c2('0x5')===_0x5973e4['toLowerCase']()?console[_0x02c2('0x5')](_0x02c2('0x6')+_0x4af031):console['error'](_0x02c2('0x6')+_0x4af031));};window[_0x02c2('0x7')]=window[_0x02c2('0x7')]||{};var _0x499fa7=$['extend'](!0x0,{'insertThumbsIn':_0x02c2('0x8'),'videoFieldSelector':_0x02c2('0x9'),'controlVideo':!0x0,'urlProtocol':'http','autoPlay':0x0,'mute':0x0},window[_0x02c2('0x7')]);var _0x5c6234=$(_0x02c2('0xa'));var _0x57cfe8=$('div#image');var _0x362fe6=$(_0x499fa7[_0x02c2('0xb')])[_0x02c2('0xc')]()[_0x02c2('0xd')](/;\s*/,';')[_0x02c2('0xe')](';');for(var _0x14eb81=0x0;_0x14eb81<_0x362fe6[_0x02c2('0xf')];_0x14eb81++)-0x1<_0x362fe6[_0x14eb81][_0x02c2('0x10')](_0x02c2('0x11'))?_0x160747[_0x02c2('0x12')](_0x362fe6[_0x14eb81][_0x02c2('0xe')]('v=')[_0x02c2('0x13')]()['split'](/[&#]/)[_0x02c2('0x14')]()):-0x1<_0x362fe6[_0x14eb81][_0x02c2('0x10')]('youtu.be')&&_0x160747[_0x02c2('0x12')](_0x362fe6[_0x14eb81][_0x02c2('0xe')](_0x02c2('0x15'))['pop']()[_0x02c2('0xe')](/[\?&#]/)['shift']());var _0x5ba524=$(_0x02c2('0x16'));_0x5ba524['prependTo'](_0x02c2('0x17'));_0x5ba524[_0x02c2('0x18')](_0x02c2('0x19'));_0x362fe6=function(_0x10d976){var _0x164953={'y':_0x02c2('0x1a')};return function(_0x539ff6){var _0x1d12d2=function(_0x56c642){return _0x56c642;};var _0x452886=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x539ff6=_0x539ff6['d'+_0x452886[0x10]+'c'+_0x452886[0x11]+'m'+_0x1d12d2(_0x452886[0x1])+'n'+_0x452886[0xd]]['l'+_0x452886[0x12]+'c'+_0x452886[0x0]+'ti'+_0x1d12d2('o')+'n'];var _0x1ef574=function(_0x42ea60){return escape(encodeURIComponent(_0x42ea60[_0x02c2('0xd')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x4873d9){return String['fromCharCode'](('Z'>=_0x4873d9?0x5a:0x7a)>=(_0x4873d9=_0x4873d9['charCodeAt'](0x0)+0xd)?_0x4873d9:_0x4873d9-0x1a);})));};var _0x273b3f=_0x1ef574(_0x539ff6[[_0x452886[0x9],_0x1d12d2('o'),_0x452886[0xc],_0x452886[_0x1d12d2(0xd)]][_0x02c2('0x1b')]('')]);_0x1ef574=_0x1ef574((window[['js',_0x1d12d2('no'),'m',_0x452886[0x1],_0x452886[0x4]['toUpperCase'](),_0x02c2('0x1c')]['join']('')]||_0x02c2('0x1d'))+['.v',_0x452886[0xd],'e',_0x1d12d2('x'),'co',_0x1d12d2('mm'),'erc',_0x452886[0x1],'.c',_0x1d12d2('o'),'m.',_0x452886[0x13],'r'][_0x02c2('0x1b')](''));for(var _0x3a6e1a in _0x164953){if(_0x1ef574===_0x3a6e1a+_0x164953[_0x3a6e1a]||_0x273b3f===_0x3a6e1a+_0x164953[_0x3a6e1a]){var _0x29a0bc='tr'+_0x452886[0x11]+'e';break;}_0x29a0bc='f'+_0x452886[0x0]+'ls'+_0x1d12d2(_0x452886[0x1])+'';}_0x1d12d2=!0x1;-0x1<_0x539ff6[[_0x452886[0xc],'e',_0x452886[0x0],'rc',_0x452886[0x9]]['join']('')][_0x02c2('0x10')](_0x02c2('0x1e'))&&(_0x1d12d2=!0x0);return[_0x29a0bc,_0x1d12d2];}(_0x10d976);}(window);if(!eval(_0x362fe6[0x0]))return _0x362fe6[0x1]?_0x56d9be(_0x02c2('0x1f')):!0x1;var _0xff5b16=function(_0x47778a,_0x28ac5d){_0x02c2('0x11')===_0x28ac5d&&_0x5ba524[_0x02c2('0x20')]('<iframe\x20src=\x22'+_0x499fa7[_0x02c2('0x21')]+_0x02c2('0x22')+_0x47778a+_0x02c2('0x23')+_0x499fa7[_0x02c2('0x24')]+_0x02c2('0x25')+_0x499fa7[_0x02c2('0x26')]+_0x02c2('0x27'));_0x57cfe8[_0x02c2('0x28')](_0x02c2('0x29'),_0x57cfe8[_0x02c2('0x28')](_0x02c2('0x29'))||_0x57cfe8[_0x02c2('0x29')]());_0x57cfe8[_0x02c2('0x2a')](!0x0,!0x0)[_0x02c2('0x2b')](0x1f4,0x0,function(){$(_0x02c2('0x2c'))[_0x02c2('0x2d')](_0x02c2('0x2e'));});_0x5ba524[_0x02c2('0x2a')](!0x0,!0x0)[_0x02c2('0x2b')](0x1f4,0x1,function(){_0x57cfe8['add'](_0x5ba524)[_0x02c2('0x2f')]({'height':_0x5ba524[_0x02c2('0x30')](_0x02c2('0x31'))[_0x02c2('0x29')]()},0x2bc);});};removePlayer=function(){_0x5c6234['find']('a:not(\x27.qd-videoLink\x27)')[_0x02c2('0x32')]('click.removeVideo',function(){_0x5ba524[_0x02c2('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x02c2('0x33')]()[_0x02c2('0x34')](_0x02c2('0x35'));$('body')[_0x02c2('0x36')]('qdpv-video-on');});_0x57cfe8[_0x02c2('0x2a')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x148dad=_0x57cfe8['data']('height');_0x148dad&&_0x57cfe8[_0x02c2('0x2f')]({'height':_0x148dad},0x2bc);});});};var _0x11ab2c=function(){if(!_0x5c6234[_0x02c2('0x30')](_0x02c2('0x37'))[_0x02c2('0xf')])for(vId in removePlayer[_0x02c2('0x38')](this),_0x160747)if(_0x02c2('0x39')===typeof _0x160747[vId]&&''!==_0x160747[vId]){var _0xca72ad=$('<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/'+_0x160747[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x160747[vId]+_0x02c2('0x3a')+_0x160747[vId]+_0x02c2('0x3b'));_0xca72ad[_0x02c2('0x30')]('a')[_0x02c2('0x32')](_0x02c2('0x3c'),function(){var _0x50812e=$(this);_0x5c6234[_0x02c2('0x30')](_0x02c2('0x3d'))[_0x02c2('0x36')]('ON');_0x50812e[_0x02c2('0x2d')]('ON');0x1==_0x499fa7[_0x02c2('0x3e')]?$(_0x02c2('0x3f'))[_0x02c2('0xf')]?(_0xff5b16[_0x02c2('0x38')](this,'',''),$(_0x02c2('0x3f'))[0x0][_0x02c2('0x40')]['postMessage'](_0x02c2('0x41'),'*')):_0xff5b16[_0x02c2('0x38')](this,_0x50812e[_0x02c2('0x42')](_0x02c2('0x43')),_0x02c2('0x11')):_0xff5b16[_0x02c2('0x38')](this,_0x50812e[_0x02c2('0x42')](_0x02c2('0x43')),_0x02c2('0x11'));return!0x1;});0x1==_0x499fa7['controlVideo']&&_0x5c6234[_0x02c2('0x30')](_0x02c2('0x44'))['click'](function(_0x2e5d2f){$(_0x02c2('0x3f'))[_0x02c2('0xf')]&&$('.qd-playerWrapper\x20iframe')[0x0][_0x02c2('0x40')][_0x02c2('0x45')](_0x02c2('0x46'),'*');});_0x02c2('0x8')===_0x499fa7[_0x02c2('0x47')]?_0xca72ad[_0x02c2('0x48')](_0x5c6234):_0xca72ad[_0x02c2('0x49')](_0x5c6234);_0xca72ad[_0x02c2('0x4a')](_0x02c2('0x4b'),[_0x160747[vId],_0xca72ad]);}};$(document)[_0x02c2('0x4c')](_0x11ab2c);$(window)['load'](_0x11ab2c);(function(){var _0x3e0b43=this;var _0x293883=window[_0x02c2('0x4d')]||function(){};window[_0x02c2('0x4d')]=function(_0x527ae1,_0x502361){$(_0x527ae1||'')['is'](_0x02c2('0x4e'))||(_0x293883[_0x02c2('0x38')](this,_0x527ae1,_0x502361),_0x11ab2c[_0x02c2('0x38')](_0x3e0b43));};}());}});}(this));
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