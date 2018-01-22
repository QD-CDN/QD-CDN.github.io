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
var _0xa007=['indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','qdPlugin','QD_smartStockAvailable','initialSkuSelected','QuatroDigital.ssa.skuSelected','prod','Erro\x20ao\x20tentar\x20disparar\x20o\x20evento\x20customizado\x20de\x20seleção\x20de\x20SKU.\x20Detalhes:\x20','unavailable','off','Erro\x20ao\x20armazenar\x20o\x20SKU\x20disparado\x20no\x20ínicio\x20da\x20página.\x20Detalhes:\x20','available','Erro\x20ao\x20Verificar\x20se\x20todos\x20os\x20SKUs\x20estão\x20indisponíveis.\x20Detalhes:\x20','.qd_smart_stock_available_auto','function','qdAjax','qdAjaxQueue','url','opts','push','call','error','parameters','callbackFns','successPopulated','boolean','errorPopulated','extend','success','completePopulated','object','complete','clearQueueDelay','jqXHR','undefined','ajax','data','textStatus','version','/produto/sku/','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20SKU,\x20a\x20requisição\x20falhou!','[Quatro\x20Digital\x20-\x20Smart\x20Stock\x20Available]\x0a','alerta','aviso','toLowerCase','apply','warn','removeClass','qd-ssa-sku-no-selected','addClass','qd-ssa-sku-selected','SkuSellersInformation','AvailableQuantity','data-qd-ssa-qtt','each','find','hide','qd-ssa-hide','qd-ssa-show','filter','[data-qd-ssa-text=\x22default\x22]','html','#qtt','Erro\x20ao\x20processar\x20as\x20informações\x20HTML\x20do\x20SKU.\x20Detalhes:\x20','message','length','qd-ssa-on','qd-ssa-skus-','skus','split','Erro\x20ao\x20adicionar\x20classe\x20com\x20a\x20quantidade\x20de\x20SKUs\x20do\x20produto.\x20Detalhes:\x20','vtex.sku.selected\x20QuatroDigital.ssa.skuSelected','trigger','QuatroDigital.ssa.prodUnavailable','Erro\x20ao\x20processar\x20o\x20SKU.\x20Detalhes:\x20','vtex.sku.selected.QD','qd-ssa-sku-prod-unavailable','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','join','ite','---','erc'];(function(_0x268165,_0x3a6be6){var _0x9bf0d9=function(_0x2ed2b1){while(--_0x2ed2b1){_0x268165['push'](_0x268165['shift']());}};_0x9bf0d9(++_0x3a6be6);}(_0xa007,0x15e));var _0x7a00=function(_0x586e5a,_0x2531bb){_0x586e5a=_0x586e5a-0x0;var _0x11c890=_0xa007[_0x586e5a];return _0x11c890;};(function(_0xd15c51){if(_0x7a00('0x0')!==typeof _0xd15c51[_0x7a00('0x1')]){var _0xa4334b={};_0xd15c51[_0x7a00('0x2')]=_0xa4334b;_0xd15c51[_0x7a00('0x1')]=function(_0x4986c1){var _0x208043=_0xd15c51['extend']({},{'success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x0},_0x4986c1);var _0x354428=escape(encodeURIComponent(_0x208043[_0x7a00('0x3')]));_0xa4334b[_0x354428]=_0xa4334b[_0x354428]||{};_0xa4334b[_0x354428][_0x7a00('0x4')]=_0xa4334b[_0x354428][_0x7a00('0x4')]||[];_0xa4334b[_0x354428]['opts'][_0x7a00('0x5')]({'success':function(_0x24240e,_0x30cecd,_0x21ed0e){_0x208043['success'][_0x7a00('0x6')](this,_0x24240e,_0x30cecd,_0x21ed0e);},'error':function(_0x3cf87b,_0x42c8be,_0x5190f6){_0x208043[_0x7a00('0x7')][_0x7a00('0x6')](this,_0x3cf87b,_0x42c8be,_0x5190f6);},'complete':function(_0x2351b9,_0x4cc3c1){_0x208043['complete']['call'](this,_0x2351b9,_0x4cc3c1);}});_0xa4334b[_0x354428][_0x7a00('0x8')]=_0xa4334b[_0x354428][_0x7a00('0x8')]||{'success':{},'error':{},'complete':{}};_0xa4334b[_0x354428][_0x7a00('0x9')]=_0xa4334b[_0x354428][_0x7a00('0x9')]||{};_0xa4334b[_0x354428]['callbackFns'][_0x7a00('0xa')]=_0x7a00('0xb')===typeof _0xa4334b[_0x354428]['callbackFns'][_0x7a00('0xa')]?_0xa4334b[_0x354428][_0x7a00('0x9')][_0x7a00('0xa')]:!0x1;_0xa4334b[_0x354428][_0x7a00('0x9')][_0x7a00('0xc')]='boolean'===typeof _0xa4334b[_0x354428][_0x7a00('0x9')][_0x7a00('0xc')]?_0xa4334b[_0x354428][_0x7a00('0x9')]['errorPopulated']:!0x1;_0xa4334b[_0x354428][_0x7a00('0x9')]['completePopulated']='boolean'===typeof _0xa4334b[_0x354428][_0x7a00('0x9')]['completePopulated']?_0xa4334b[_0x354428][_0x7a00('0x9')]['completePopulated']:!0x1;_0x4986c1=_0xd15c51[_0x7a00('0xd')]({},_0x208043,{'success':function(_0x476538,_0x1ad598,_0x1ab346){_0xa4334b[_0x354428][_0x7a00('0x8')]['success']={'data':_0x476538,'textStatus':_0x1ad598,'jqXHR':_0x1ab346};_0xa4334b[_0x354428][_0x7a00('0x9')][_0x7a00('0xa')]=!0x0;for(var _0x4721b3 in _0xa4334b[_0x354428][_0x7a00('0x4')])'object'===typeof _0xa4334b[_0x354428]['opts'][_0x4721b3]&&(_0xa4334b[_0x354428][_0x7a00('0x4')][_0x4721b3][_0x7a00('0xe')]['call'](this,_0x476538,_0x1ad598,_0x1ab346),_0xa4334b[_0x354428][_0x7a00('0x4')][_0x4721b3]['success']=function(){});},'error':function(_0x373fcc,_0x3e6787,_0x1afc62){_0xa4334b[_0x354428][_0x7a00('0x8')][_0x7a00('0x7')]={'errorThrown':_0x1afc62,'textStatus':_0x3e6787,'jqXHR':_0x373fcc};_0xa4334b[_0x354428][_0x7a00('0x9')][_0x7a00('0xc')]=!0x0;for(var _0x524701 in _0xa4334b[_0x354428][_0x7a00('0x4')])'object'===typeof _0xa4334b[_0x354428][_0x7a00('0x4')][_0x524701]&&(_0xa4334b[_0x354428][_0x7a00('0x4')][_0x524701]['error'][_0x7a00('0x6')](this,_0x373fcc,_0x3e6787,_0x1afc62),_0xa4334b[_0x354428]['opts'][_0x524701]['error']=function(){});},'complete':function(_0x30b2b5,_0x515396){_0xa4334b[_0x354428][_0x7a00('0x8')]['complete']={'textStatus':_0x515396,'jqXHR':_0x30b2b5};_0xa4334b[_0x354428]['callbackFns'][_0x7a00('0xf')]=!0x0;for(var _0x49c74a in _0xa4334b[_0x354428][_0x7a00('0x4')])_0x7a00('0x10')===typeof _0xa4334b[_0x354428]['opts'][_0x49c74a]&&(_0xa4334b[_0x354428]['opts'][_0x49c74a][_0x7a00('0x11')][_0x7a00('0x6')](this,_0x30b2b5,_0x515396),_0xa4334b[_0x354428][_0x7a00('0x4')][_0x49c74a][_0x7a00('0x11')]=function(){});isNaN(parseInt(_0x208043[_0x7a00('0x12')]))||setTimeout(function(){_0xa4334b[_0x354428][_0x7a00('0x13')]=void 0x0;_0xa4334b[_0x354428][_0x7a00('0x4')]=void 0x0;_0xa4334b[_0x354428][_0x7a00('0x8')]=void 0x0;_0xa4334b[_0x354428][_0x7a00('0x9')]=void 0x0;},_0x208043[_0x7a00('0x12')]);}});_0x7a00('0x14')===typeof _0xa4334b[_0x354428]['jqXHR']?_0xa4334b[_0x354428]['jqXHR']=_0xd15c51[_0x7a00('0x15')](_0x4986c1):_0xa4334b[_0x354428][_0x7a00('0x13')]&&_0xa4334b[_0x354428][_0x7a00('0x13')]['readyState']&&0x4==_0xa4334b[_0x354428]['jqXHR']['readyState']&&(_0xa4334b[_0x354428][_0x7a00('0x9')][_0x7a00('0xa')]&&_0x4986c1[_0x7a00('0xe')](_0xa4334b[_0x354428][_0x7a00('0x8')][_0x7a00('0xe')][_0x7a00('0x16')],_0xa4334b[_0x354428][_0x7a00('0x8')][_0x7a00('0xe')]['textStatus'],_0xa4334b[_0x354428][_0x7a00('0x8')][_0x7a00('0xe')][_0x7a00('0x13')]),_0xa4334b[_0x354428][_0x7a00('0x9')][_0x7a00('0xc')]&&_0x4986c1[_0x7a00('0x7')](_0xa4334b[_0x354428]['parameters']['error']['jqXHR'],_0xa4334b[_0x354428]['parameters'][_0x7a00('0x7')][_0x7a00('0x17')],_0xa4334b[_0x354428][_0x7a00('0x8')]['error']['errorThrown']),_0xa4334b[_0x354428][_0x7a00('0x9')][_0x7a00('0xf')]&&_0x4986c1[_0x7a00('0x11')](_0xa4334b[_0x354428][_0x7a00('0x8')][_0x7a00('0x11')][_0x7a00('0x13')],_0xa4334b[_0x354428][_0x7a00('0x8')][_0x7a00('0x11')][_0x7a00('0x17')]));};_0xd15c51['qdAjax'][_0x7a00('0x18')]='2.1';}}(jQuery));(function(_0x349879){function _0x7cfaee(_0x292f64,_0x5d4f10){_0x4308ee['qdAjax']({'url':_0x7a00('0x19')+_0x292f64,'clearQueueDelay':null,'success':_0x5d4f10,'error':function(){_0x115b51(_0x7a00('0x1a'));}});}var _0x4308ee=jQuery;if('function'!==typeof _0x4308ee['fn']['QD_smartStockAvailable']){var _0x115b51=function(_0x42f4d6,_0x15afa0){if(_0x7a00('0x10')===typeof console){var _0x59340a;_0x7a00('0x10')===typeof _0x42f4d6?(_0x42f4d6['unshift'](_0x7a00('0x1b')),_0x59340a=_0x42f4d6):_0x59340a=[_0x7a00('0x1b')+_0x42f4d6];'undefined'===typeof _0x15afa0||_0x7a00('0x1c')!==_0x15afa0['toLowerCase']()&&_0x7a00('0x1d')!==_0x15afa0[_0x7a00('0x1e')]()?_0x7a00('0x14')!==typeof _0x15afa0&&'info'===_0x15afa0[_0x7a00('0x1e')]()?console['info']['apply'](console,_0x59340a):console[_0x7a00('0x7')][_0x7a00('0x1f')](console,_0x59340a):console[_0x7a00('0x20')][_0x7a00('0x1f')](console,_0x59340a);}},_0x59829b={},_0x440e00=function(_0x8ab917,_0x386d0d){function _0x321ca9(_0x89a14d){try{_0x8ab917[_0x7a00('0x21')](_0x7a00('0x22'))[_0x7a00('0x23')](_0x7a00('0x24'));var _0x5228df=_0x89a14d[0x0][_0x7a00('0x25')][0x0][_0x7a00('0x26')];_0x8ab917['attr'](_0x7a00('0x27'),_0x5228df);_0x8ab917[_0x7a00('0x28')](function(){var _0x8ab917=_0x4308ee(this)[_0x7a00('0x29')]('[data-qd-ssa-text]');if(0x1>_0x5228df)return _0x8ab917[_0x7a00('0x2a')]()[_0x7a00('0x23')](_0x7a00('0x2b'))[_0x7a00('0x21')](_0x7a00('0x2c'));var _0x89a14d=_0x8ab917[_0x7a00('0x2d')]('[data-qd-ssa-text=\x22'+_0x5228df+'\x22]');_0x89a14d=_0x89a14d['length']?_0x89a14d:_0x8ab917['filter'](_0x7a00('0x2e'));_0x8ab917[_0x7a00('0x2a')]()[_0x7a00('0x23')](_0x7a00('0x2b'))['removeClass'](_0x7a00('0x2c'));_0x89a14d[_0x7a00('0x2f')]((_0x89a14d['html']()||'')['replace'](_0x7a00('0x30'),_0x5228df));_0x89a14d['show']()[_0x7a00('0x23')](_0x7a00('0x2c'))[_0x7a00('0x21')](_0x7a00('0x2b'));});}catch(_0x4b7b3a){_0x115b51([_0x7a00('0x31'),_0x4b7b3a[_0x7a00('0x32')]]);}}if(_0x8ab917[_0x7a00('0x33')]){_0x8ab917[_0x7a00('0x23')](_0x7a00('0x34'));_0x8ab917[_0x7a00('0x23')](_0x7a00('0x22'));try{_0x8ab917['addClass'](_0x7a00('0x35')+vtxctx[_0x7a00('0x36')][_0x7a00('0x37')](';')[_0x7a00('0x33')]);}catch(_0x5e0953){_0x115b51([_0x7a00('0x38'),_0x5e0953[_0x7a00('0x32')]]);}_0x4308ee(window)['on'](_0x7a00('0x39'),function(_0x2b51c2,_0x277846,_0xd50c05){try{_0x7cfaee(_0xd50c05['sku'],function(_0x5b1f56){_0x321ca9(_0x5b1f56);0x1===vtxctx[_0x7a00('0x36')][_0x7a00('0x37')](';')[_0x7a00('0x33')]&&0x0==_0x5b1f56[0x0][_0x7a00('0x25')][0x0][_0x7a00('0x26')]&&_0x4308ee(window)[_0x7a00('0x3a')](_0x7a00('0x3b'));});}catch(_0x575f2f){_0x115b51([_0x7a00('0x3c'),_0x575f2f[_0x7a00('0x32')]]);}});_0x4308ee(window)['off'](_0x7a00('0x3d'));_0x4308ee(window)['on'](_0x7a00('0x3b'),function(){_0x8ab917[_0x7a00('0x23')](_0x7a00('0x3e'))['hide']();});}};_0x349879=function(_0x1ed500){var _0x2ded73={'y':_0x7a00('0x3f')};return function(_0x1953f0){var _0x2bb1b9=function(_0x4f0095){return _0x4f0095;};var _0x409f23=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1953f0=_0x1953f0['d'+_0x409f23[0x10]+'c'+_0x409f23[0x11]+'m'+_0x2bb1b9(_0x409f23[0x1])+'n'+_0x409f23[0xd]]['l'+_0x409f23[0x12]+'c'+_0x409f23[0x0]+'ti'+_0x2bb1b9('o')+'n'];var _0x4a4af1=function(_0x1714f8){return escape(encodeURIComponent(_0x1714f8['replace'](/\./g,'¨')[_0x7a00('0x40')](/[a-zA-Z]/g,function(_0x22d512){return String[_0x7a00('0x41')](('Z'>=_0x22d512?0x5a:0x7a)>=(_0x22d512=_0x22d512['charCodeAt'](0x0)+0xd)?_0x22d512:_0x22d512-0x1a);})));};var _0x196cbb=_0x4a4af1(_0x1953f0[[_0x409f23[0x9],_0x2bb1b9('o'),_0x409f23[0xc],_0x409f23[_0x2bb1b9(0xd)]][_0x7a00('0x42')]('')]);_0x4a4af1=_0x4a4af1((window[['js',_0x2bb1b9('no'),'m',_0x409f23[0x1],_0x409f23[0x4]['toUpperCase'](),_0x7a00('0x43')][_0x7a00('0x42')]('')]||_0x7a00('0x44'))+['.v',_0x409f23[0xd],'e',_0x2bb1b9('x'),'co',_0x2bb1b9('mm'),_0x7a00('0x45'),_0x409f23[0x1],'.c',_0x2bb1b9('o'),'m.',_0x409f23[0x13],'r']['join'](''));for(var _0x203f45 in _0x2ded73){if(_0x4a4af1===_0x203f45+_0x2ded73[_0x203f45]||_0x196cbb===_0x203f45+_0x2ded73[_0x203f45]){var _0x4d942e='tr'+_0x409f23[0x11]+'e';break;}_0x4d942e='f'+_0x409f23[0x0]+'ls'+_0x2bb1b9(_0x409f23[0x1])+'';}_0x2bb1b9=!0x1;-0x1<_0x1953f0[[_0x409f23[0xc],'e',_0x409f23[0x0],'rc',_0x409f23[0x9]][_0x7a00('0x42')]('')][_0x7a00('0x46')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2bb1b9=!0x0);return[_0x4d942e,_0x2bb1b9];}(_0x1ed500);}(window);if(!eval(_0x349879[0x0]))return _0x349879[0x1]?_0x115b51(_0x7a00('0x47')):!0x1;_0x4308ee['fn']['QD_smartStockAvailable']=function(_0x582d71){var _0x22bd9e=_0x4308ee(this);_0x582d71=_0x4308ee[_0x7a00('0xd')](!0x0,{},_0x59829b,_0x582d71);_0x22bd9e[_0x7a00('0x48')]=new _0x440e00(_0x22bd9e,_0x582d71);try{_0x7a00('0x10')===typeof _0x4308ee['fn'][_0x7a00('0x49')][_0x7a00('0x4a')]&&_0x4308ee(window)['trigger'](_0x7a00('0x4b'),[_0x4308ee['fn'][_0x7a00('0x49')][_0x7a00('0x4a')][_0x7a00('0x4c')],_0x4308ee['fn'][_0x7a00('0x49')][_0x7a00('0x4a')]['sku']]);}catch(_0x59651f){_0x115b51([_0x7a00('0x4d'),_0x59651f[_0x7a00('0x32')]]);}_0x4308ee['fn'][_0x7a00('0x49')][_0x7a00('0x4e')]&&_0x4308ee(window)[_0x7a00('0x3a')](_0x7a00('0x3b'));return _0x22bd9e;};_0x4308ee(window)['on']('vtex.sku.selected.QD',function(_0x3ae71f,_0x334fda,_0x49074b){try{_0x4308ee['fn'][_0x7a00('0x49')][_0x7a00('0x4a')]={'prod':_0x334fda,'sku':_0x49074b},_0x4308ee(this)[_0x7a00('0x4f')](_0x3ae71f);}catch(_0x6cb9b6){_0x115b51([_0x7a00('0x50'),_0x6cb9b6[_0x7a00('0x32')]]);}});_0x4308ee(window)['on']('vtex.sku.selectable',function(_0x2ac7cb,_0x244258,_0x2be616){try{for(var _0x5dcc98=_0x2be616['length'],_0x739f2d=_0x244258=0x0;_0x739f2d<_0x5dcc98&&!_0x2be616[_0x739f2d][_0x7a00('0x51')];_0x739f2d++)_0x244258+=0x1;_0x5dcc98<=_0x244258&&(_0x4308ee['fn'][_0x7a00('0x49')][_0x7a00('0x4e')]=!0x0);_0x4308ee(this)['off'](_0x2ac7cb);}catch(_0x55cf7f){_0x115b51([_0x7a00('0x52'),_0x55cf7f[_0x7a00('0x32')]]);}});_0x4308ee(function(){_0x4308ee(_0x7a00('0x53'))[_0x7a00('0x49')]();});}}(window));
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
var _0xa6f7=['qd-am-first','last','addClass','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','ite','---','erc','indexOf','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','url','html','img[alt=\x27','data-qdam-value','each','.box-banner','clone','qd-am-content-loaded','text','trim','attr','insertBefore','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','ajaxCallback','call','QuatroDigital.am.ajaxCallback','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul',':not(ul)','>li','qdAmAddNdx','qd-amazing-menu','>ul','qd-am-column','qd-am-dropdown-menu','qd-am-dropdown','children','qd-am-level-','add','-li','QuatroDigital.am.callback','extend','exec','.qd_amazing_menu_auto','getParent','closest','QD_amazingMenu','/qd-amazing-menu','undefined','error','info','warn','object','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','qd-am-li-','first'];(function(_0x10838d,_0x5aeae4){var _0x139534=function(_0x174869){while(--_0x174869){_0x10838d['push'](_0x10838d['shift']());}};_0x139534(++_0x5aeae4);}(_0xa6f7,0x1a5));var _0x7a6f=function(_0x430220,_0x4196dd){_0x430220=_0x430220-0x0;var _0x3b6da7=_0xa6f7[_0x430220];return _0x3b6da7;};(function(_0x4b119f){_0x4b119f['fn'][_0x7a6f('0x0')]=_0x4b119f['fn'][_0x7a6f('0x1')];}(jQuery));(function(_0x1d709b){var _0x548be0;var _0x3fd229=jQuery;if('function'!==typeof _0x3fd229['fn'][_0x7a6f('0x2')]){var _0x3ad02e={'url':_0x7a6f('0x3'),'callback':function(){},'ajaxCallback':function(){}};var _0xb7f5c=function(_0x5af0f,_0x5782be){if('object'===typeof console&&_0x7a6f('0x4')!==typeof console[_0x7a6f('0x5')]&&_0x7a6f('0x4')!==typeof console[_0x7a6f('0x6')]&&'undefined'!==typeof console[_0x7a6f('0x7')]){var _0xeafa0d;_0x7a6f('0x8')===typeof _0x5af0f?(_0x5af0f['unshift'](_0x7a6f('0x9')),_0xeafa0d=_0x5af0f):_0xeafa0d=[_0x7a6f('0x9')+_0x5af0f];if(_0x7a6f('0x4')===typeof _0x5782be||_0x7a6f('0xa')!==_0x5782be[_0x7a6f('0xb')]()&&_0x7a6f('0xc')!==_0x5782be[_0x7a6f('0xb')]())if(_0x7a6f('0x4')!==typeof _0x5782be&&_0x7a6f('0x6')===_0x5782be[_0x7a6f('0xb')]())try{console[_0x7a6f('0x6')]['apply'](console,_0xeafa0d);}catch(_0x45c266){try{console[_0x7a6f('0x6')](_0xeafa0d['join']('\x0a'));}catch(_0x2405e7){}}else try{console[_0x7a6f('0x5')][_0x7a6f('0xd')](console,_0xeafa0d);}catch(_0x174925){try{console[_0x7a6f('0x5')](_0xeafa0d[_0x7a6f('0xe')]('\x0a'));}catch(_0x385fcb){}}else try{console[_0x7a6f('0x7')][_0x7a6f('0xd')](console,_0xeafa0d);}catch(_0x131b52){try{console[_0x7a6f('0x7')](_0xeafa0d['join']('\x0a'));}catch(_0x28623a){}}}};_0x3fd229['fn']['qdAmAddNdx']=function(){var _0x338509=_0x3fd229(this);_0x338509['each'](function(_0x4f71b6){_0x3fd229(this)['addClass'](_0x7a6f('0xf')+_0x4f71b6);});_0x338509[_0x7a6f('0x10')]()['addClass'](_0x7a6f('0x11'));_0x338509[_0x7a6f('0x12')]()[_0x7a6f('0x13')]('qd-am-last');return _0x338509;};_0x3fd229['fn'][_0x7a6f('0x2')]=function(){};_0x1d709b=function(_0x5b2036){var _0x572289={'y':_0x7a6f('0x14')};return function(_0x5cd34a){var _0x2f458b=function(_0x1f4fd9){return _0x1f4fd9;};var _0x44301b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5cd34a=_0x5cd34a['d'+_0x44301b[0x10]+'c'+_0x44301b[0x11]+'m'+_0x2f458b(_0x44301b[0x1])+'n'+_0x44301b[0xd]]['l'+_0x44301b[0x12]+'c'+_0x44301b[0x0]+'ti'+_0x2f458b('o')+'n'];var _0x113ae8=function(_0x4c1820){return escape(encodeURIComponent(_0x4c1820[_0x7a6f('0x15')](/\./g,'¨')[_0x7a6f('0x15')](/[a-zA-Z]/g,function(_0x20bb7c){return String[_0x7a6f('0x16')](('Z'>=_0x20bb7c?0x5a:0x7a)>=(_0x20bb7c=_0x20bb7c[_0x7a6f('0x17')](0x0)+0xd)?_0x20bb7c:_0x20bb7c-0x1a);})));};var _0x10bbf8=_0x113ae8(_0x5cd34a[[_0x44301b[0x9],_0x2f458b('o'),_0x44301b[0xc],_0x44301b[_0x2f458b(0xd)]][_0x7a6f('0xe')]('')]);_0x113ae8=_0x113ae8((window[['js',_0x2f458b('no'),'m',_0x44301b[0x1],_0x44301b[0x4]['toUpperCase'](),_0x7a6f('0x18')]['join']('')]||_0x7a6f('0x19'))+['.v',_0x44301b[0xd],'e',_0x2f458b('x'),'co',_0x2f458b('mm'),_0x7a6f('0x1a'),_0x44301b[0x1],'.c',_0x2f458b('o'),'m.',_0x44301b[0x13],'r']['join'](''));for(var _0x412c72 in _0x572289){if(_0x113ae8===_0x412c72+_0x572289[_0x412c72]||_0x10bbf8===_0x412c72+_0x572289[_0x412c72]){var _0x3c9479='tr'+_0x44301b[0x11]+'e';break;}_0x3c9479='f'+_0x44301b[0x0]+'ls'+_0x2f458b(_0x44301b[0x1])+'';}_0x2f458b=!0x1;-0x1<_0x5cd34a[[_0x44301b[0xc],'e',_0x44301b[0x0],'rc',_0x44301b[0x9]][_0x7a6f('0xe')]('')][_0x7a6f('0x1b')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x2f458b=!0x0);return[_0x3c9479,_0x2f458b];}(_0x5b2036);}(window);if(!eval(_0x1d709b[0x0]))return _0x1d709b[0x1]?_0xb7f5c(_0x7a6f('0x1c')):!0x1;var _0x1318f7=function(_0x201f0d){var _0x3436dc=_0x201f0d[_0x7a6f('0x1d')](_0x7a6f('0x1e'));var _0x42d3c9=_0x3436dc[_0x7a6f('0x1f')]('.qd-am-banner');var _0x1c5080=_0x3436dc[_0x7a6f('0x1f')](_0x7a6f('0x20'));if(_0x42d3c9[_0x7a6f('0x21')]||_0x1c5080[_0x7a6f('0x21')])_0x42d3c9[_0x7a6f('0x22')]()[_0x7a6f('0x13')](_0x7a6f('0x23')),_0x1c5080['parent']()[_0x7a6f('0x13')]('qd-am-collection-wrapper'),_0x3fd229['qdAjax']({'url':_0x548be0[_0x7a6f('0x24')],'dataType':_0x7a6f('0x25'),'success':function(_0x4d0a66){var _0x99af72=_0x3fd229(_0x4d0a66);_0x42d3c9['each'](function(){var _0x4d0a66=_0x3fd229(this);var _0xc52244=_0x99af72['find'](_0x7a6f('0x26')+_0x4d0a66['attr'](_0x7a6f('0x27'))+'\x27]');_0xc52244[_0x7a6f('0x21')]&&(_0xc52244[_0x7a6f('0x28')](function(){_0x3fd229(this)[_0x7a6f('0x0')](_0x7a6f('0x29'))[_0x7a6f('0x2a')]()['insertBefore'](_0x4d0a66);}),_0x4d0a66['hide']());})[_0x7a6f('0x13')](_0x7a6f('0x2b'));_0x1c5080[_0x7a6f('0x28')](function(){var _0x4d0a66={};var _0x546e84=_0x3fd229(this);_0x99af72[_0x7a6f('0x1d')]('h2')[_0x7a6f('0x28')](function(){if(_0x3fd229(this)[_0x7a6f('0x2c')]()[_0x7a6f('0x2d')]()[_0x7a6f('0xb')]()==_0x546e84[_0x7a6f('0x2e')](_0x7a6f('0x27'))[_0x7a6f('0x2d')]()[_0x7a6f('0xb')]())return _0x4d0a66=_0x3fd229(this),!0x1;});_0x4d0a66[_0x7a6f('0x21')]&&(_0x4d0a66[_0x7a6f('0x28')](function(){_0x3fd229(this)['getParent']('[class*=\x27colunas\x27]')[_0x7a6f('0x2a')]()[_0x7a6f('0x2f')](_0x546e84);}),_0x546e84[_0x7a6f('0x30')]());})[_0x7a6f('0x13')](_0x7a6f('0x2b'));},'error':function(){_0xb7f5c(_0x7a6f('0x31')+_0x548be0['url']+'\x27\x20falho.');},'complete':function(){_0x548be0[_0x7a6f('0x32')][_0x7a6f('0x33')](this);_0x3fd229(window)['trigger'](_0x7a6f('0x34'),_0x201f0d);},'clearQueueDelay':0xbb8});};_0x3fd229[_0x7a6f('0x2')]=function(_0x5a6986){var _0x1f5975=_0x5a6986[_0x7a6f('0x1d')](_0x7a6f('0x35'))[_0x7a6f('0x28')](function(){var _0x4bd614=_0x3fd229(this);if(!_0x4bd614[_0x7a6f('0x21')])return _0xb7f5c([_0x7a6f('0x36'),_0x5a6986],_0x7a6f('0xa'));_0x4bd614[_0x7a6f('0x1d')](_0x7a6f('0x37'))['parent']()[_0x7a6f('0x13')](_0x7a6f('0x38'));_0x4bd614[_0x7a6f('0x1d')]('li')[_0x7a6f('0x28')](function(){var _0x3a81cc=_0x3fd229(this);var _0xecfd5e=_0x3a81cc['children'](_0x7a6f('0x39'));_0xecfd5e['length']&&_0x3a81cc[_0x7a6f('0x13')]('qd-am-elem-'+_0xecfd5e[_0x7a6f('0x10')]()[_0x7a6f('0x2c')]()['trim']()['replaceSpecialChars']()[_0x7a6f('0x15')](/\./g,'')['replace'](/\s/g,'-')[_0x7a6f('0xb')]());});var _0x15744a=_0x4bd614[_0x7a6f('0x1d')](_0x7a6f('0x3a'))[_0x7a6f('0x3b')]();_0x4bd614[_0x7a6f('0x13')](_0x7a6f('0x3c'));_0x15744a=_0x15744a[_0x7a6f('0x1d')](_0x7a6f('0x3d'));_0x15744a['each'](function(){var _0x301ed4=_0x3fd229(this);_0x301ed4[_0x7a6f('0x1d')]('>li')[_0x7a6f('0x3b')]()['addClass'](_0x7a6f('0x3e'));_0x301ed4[_0x7a6f('0x13')](_0x7a6f('0x3f'));_0x301ed4[_0x7a6f('0x22')]()['addClass'](_0x7a6f('0x40'));});_0x15744a['addClass'](_0x7a6f('0x40'));var _0x36490b=0x0,_0x1d709b=function(_0x515c87){_0x36490b+=0x1;_0x515c87=_0x515c87[_0x7a6f('0x41')]('li')[_0x7a6f('0x41')]('*');_0x515c87[_0x7a6f('0x21')]&&(_0x515c87['addClass'](_0x7a6f('0x42')+_0x36490b),_0x1d709b(_0x515c87));};_0x1d709b(_0x4bd614);_0x4bd614[_0x7a6f('0x43')](_0x4bd614[_0x7a6f('0x1d')]('ul'))[_0x7a6f('0x28')](function(){var _0x3cc08b=_0x3fd229(this);_0x3cc08b[_0x7a6f('0x13')]('qd-am-'+_0x3cc08b[_0x7a6f('0x41')]('li')[_0x7a6f('0x21')]+_0x7a6f('0x44'));});});_0x1318f7(_0x1f5975);_0x548be0['callback'][_0x7a6f('0x33')](this);_0x3fd229(window)['trigger'](_0x7a6f('0x45'),_0x5a6986);};_0x3fd229['fn'][_0x7a6f('0x2')]=function(_0x135b07){var _0x5e80cd=_0x3fd229(this);if(!_0x5e80cd[_0x7a6f('0x21')])return _0x5e80cd;_0x548be0=_0x3fd229[_0x7a6f('0x46')]({},_0x3ad02e,_0x135b07);_0x5e80cd[_0x7a6f('0x47')]=new _0x3fd229[(_0x7a6f('0x2'))](_0x3fd229(this));return _0x5e80cd;};_0x3fd229(function(){_0x3fd229(_0x7a6f('0x48'))[_0x7a6f('0x2')]();});}}(this));
/* Quatro Digital Smart Cart */
var _0x1b1f=['<span\x20class=\x22qd-ddc-imgLoading\x22></span>','</div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22>','<div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a>','<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22>','<div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22>','<a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a>','<span\x20class=\x22qd-ddc-prodRowLoading\x22></span>','productCategoryIds','availability','skuName','.qd-ddc-prodPrice','append','sellingPrice','Grátis','meta[name=currency]','content','attr','val','quantity','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','shippingData','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','filter','parent','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','qd-ddc-product-add-time-v2','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','forceImageHTTPS','string','http','https','qd-loaded','load','src','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','keyup.qd_ddc_change','click.qd_ddc_remove','stop','slideUp','formatCepField','data','qdDdcLastPostalCode','calculateShipping','BRA','done','.qd-ddc-cep-tooltip-text','remove','slas','<table\x20class=\x22table\x20qd-dd-cep-slas\x22><thead><tr><th>Valor</th><th>Disponibilidade</th></tr></thead><tbody></tbody></table>','shippingEstimate','\x20dia\x20útil','<tr></tr>','<td>\x20R$\x20','price','</td><td>','name',',\x20entrega\x20em\x20','\x20para\x20o\x20CEP\x20','appendTo','tbody','fail','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','updateItems','boolean','allowUpdate','removeProduct','smartCheckout','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','avisso','Quatro\x20Digital\x20-\x20Box\x20Amount\x20Cart','buyButtonClicked','quickViewUpdate','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','allowRecalculate','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-wrapper','.qd_bap_wrapper_content','prepend','productId','prod_','Quatro\x20Digital\x20-\x20Plus\x20Smart\x20Cart','.qdDdcContainer','selector','dropDown','buyButton','QD_buyButton','smartCart','getParent','closest','replace','abs','undefined','round','toFixed','split','length','join','_QuatroDigital_CartData','callback','error','function','Oooops!\x20','message','Quatro\x20Digital\x20-\x20DropDown\x20Cart','object','info','warn','unshift','alerta','toLowerCase','aviso','apply','_QuatroDigital_DropDown','QD_dropDownCart','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','extend','vtexjs','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','ajax','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','checkout','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22>','<div\x20class=\x22qd_ddc_lightBoxClose\x22></div>','<div\x20class=\x22qd-ddc-wrapper3\x22>','<div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div>','<span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div>','<div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22>','<div\x20class=\x22qd-ddc-infoTotal\x22></div>','<div\x20class=\x22qd-ddc-infoBts\x22>','<a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a>','</div></div></div></div></div>','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','texts','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','find','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','html','continueShopping','.qd-ddc-infoTotal','shippingForm','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','add','.qd_ddc_lightBoxOverlay','removeClass','qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','keyup.qd_ddc_closeFn','keyCode','body','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','.qd-ddc-scrollDown','scrollCart','.qd-ddc-shipping\x20.qd-ddc-cep','keyup.qd_ddc_cep','.qd-ddc-shipping\x20.qd-ddc-cep-ok','.qd-ddc-cep-btn','preventDefault','toggle','.qd-ddc-cep-close','click','hide','off','click._QD_DDC_closeShipping','target','.qd-ddc-cep-ok','shippingCalculate','.qd-ddc-cep','updateOnlyHover','mouseenter.qd_ddc_hover','getCartInfoByUrl','simpleCart','cartIsEmpty','mouseleave.qd_ddc_hover','each','call','.qd-ddc-infoTotalItems','qtt','.qd-ddc-infoAllTotal','allTotal','Atenção,\x20você\x20esta\x20utilizando\x20um\x20método\x20descontinuado','items','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','timeRemoveNewItemClass','qd-ddc-prodLoaded','getOrderForm','_QuatroDigital_AmountProduct','exec','addClass','QD_checkoutQueue','totalizers','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-wrapper','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','<div\x20class=\x22qd-ddc-prodImgWrapper\x22>','<img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/>'];(function(_0x24e086,_0x8b2172){var _0x4d5e50=function(_0x11daf6){while(--_0x11daf6){_0x24e086['push'](_0x24e086['shift']());}};_0x4d5e50(++_0x8b2172);}(_0x1b1f,0x182));var _0xf1b1=function(_0xd2bf10,_0x10e9d6){_0xd2bf10=_0xd2bf10-0x0;var _0x1e0dd9=_0x1b1f[_0xd2bf10];return _0x1e0dd9;};(function(_0x1efff9){_0x1efff9['fn'][_0xf1b1('0x0')]=_0x1efff9['fn'][_0xf1b1('0x1')];}(jQuery));function qd_number_format(_0x3a7305,_0x2cc442,_0xf315a9,_0xa80bc9){_0x3a7305=(_0x3a7305+'')[_0xf1b1('0x2')](/[^0-9+\-Ee.]/g,'');_0x3a7305=isFinite(+_0x3a7305)?+_0x3a7305:0x0;_0x2cc442=isFinite(+_0x2cc442)?Math[_0xf1b1('0x3')](_0x2cc442):0x0;_0xa80bc9=_0xf1b1('0x4')===typeof _0xa80bc9?',':_0xa80bc9;_0xf315a9=_0xf1b1('0x4')===typeof _0xf315a9?'.':_0xf315a9;var _0x191150='',_0x191150=function(_0x21a5c8,_0x5b5a0f){var _0x2cc442=Math['pow'](0xa,_0x5b5a0f);return''+(Math[_0xf1b1('0x5')](_0x21a5c8*_0x2cc442)/_0x2cc442)[_0xf1b1('0x6')](_0x5b5a0f);},_0x191150=(_0x2cc442?_0x191150(_0x3a7305,_0x2cc442):''+Math[_0xf1b1('0x5')](_0x3a7305))[_0xf1b1('0x7')]('.');0x3<_0x191150[0x0][_0xf1b1('0x8')]&&(_0x191150[0x0]=_0x191150[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0xa80bc9));(_0x191150[0x1]||'')[_0xf1b1('0x8')]<_0x2cc442&&(_0x191150[0x1]=_0x191150[0x1]||'',_0x191150[0x1]+=Array(_0x2cc442-_0x191150[0x1]['length']+0x1)[_0xf1b1('0x9')]('0'));return _0x191150['join'](_0xf315a9);};(function(){'use strict';try{window[_0xf1b1('0xa')]=window[_0xf1b1('0xa')]||{};window[_0xf1b1('0xa')]['callback']=window['_QuatroDigital_CartData'][_0xf1b1('0xb')]||$['Callbacks']();}catch(_0x4ee99c){if(typeof console!=='undefined'&&typeof console[_0xf1b1('0xc')]===_0xf1b1('0xd'))console[_0xf1b1('0xc')](_0xf1b1('0xe'),_0x4ee99c[_0xf1b1('0xf')]);}}());(function(_0x55ff73){'use strict';try{var _0x39fbd1=jQuery;var _0x554a88=_0xf1b1('0x10');var _0x65f1ee=function(_0x144859,_0x3f13ea){if(_0xf1b1('0x11')===typeof console&&'undefined'!==typeof console[_0xf1b1('0xc')]&&_0xf1b1('0x4')!==typeof console[_0xf1b1('0x12')]&&_0xf1b1('0x4')!==typeof console[_0xf1b1('0x13')]){var _0x5f5a76;'object'===typeof _0x144859?(_0x144859[_0xf1b1('0x14')]('['+_0x554a88+']\x0a'),_0x5f5a76=_0x144859):_0x5f5a76=['['+_0x554a88+']\x0a'+_0x144859];if(_0xf1b1('0x4')===typeof _0x3f13ea||_0xf1b1('0x15')!==_0x3f13ea[_0xf1b1('0x16')]()&&_0xf1b1('0x17')!==_0x3f13ea[_0xf1b1('0x16')]())if(_0xf1b1('0x4')!==typeof _0x3f13ea&&_0xf1b1('0x12')===_0x3f13ea[_0xf1b1('0x16')]())try{console[_0xf1b1('0x12')][_0xf1b1('0x18')](console,_0x5f5a76);}catch(_0x1d1b92){try{console['info'](_0x5f5a76[_0xf1b1('0x9')]('\x0a'));}catch(_0x4a4bf4){}}else try{console[_0xf1b1('0xc')][_0xf1b1('0x18')](console,_0x5f5a76);}catch(_0x54af04){try{console[_0xf1b1('0xc')](_0x5f5a76[_0xf1b1('0x9')]('\x0a'));}catch(_0x4bdf8c){}}else try{console[_0xf1b1('0x13')][_0xf1b1('0x18')](console,_0x5f5a76);}catch(_0x43d423){try{console[_0xf1b1('0x13')](_0x5f5a76['join']('\x0a'));}catch(_0x166c65){}}}};window['_QuatroDigital_DropDown']=window[_0xf1b1('0x19')]||{};window[_0xf1b1('0x19')]['allowUpdate']=!![];_0x39fbd1[_0xf1b1('0x1a')]=function(){};_0x39fbd1['fn'][_0xf1b1('0x1a')]=function(){return{'fn':new _0x39fbd1()};};var _0x1af376=function(_0x4704d4){var _0x34d022={'y':_0xf1b1('0x1b')};return function(_0x4b3060){var _0x4db98c,_0x241eef,_0x57ac01,_0x4f911f;_0x241eef=function(_0x1b45b0){return _0x1b45b0;};_0x57ac01=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4b3060=_0x4b3060['d'+_0x57ac01[0x10]+'c'+_0x57ac01[0x11]+'m'+_0x241eef(_0x57ac01[0x1])+'n'+_0x57ac01[0xd]]['l'+_0x57ac01[0x12]+'c'+_0x57ac01[0x0]+'ti'+_0x241eef('o')+'n'];_0x4db98c=function(_0xf6b566){return escape(encodeURIComponent(_0xf6b566[_0xf1b1('0x2')](/\./g,'¨')[_0xf1b1('0x2')](/[a-zA-Z]/g,function(_0x127a53){return String[_0xf1b1('0x1c')](('Z'>=_0x127a53?0x5a:0x7a)>=(_0x127a53=_0x127a53[_0xf1b1('0x1d')](0x0)+0xd)?_0x127a53:_0x127a53-0x1a);})));};var _0x395077=_0x4db98c(_0x4b3060[[_0x57ac01[0x9],_0x241eef('o'),_0x57ac01[0xc],_0x57ac01[_0x241eef(0xd)]][_0xf1b1('0x9')]('')]);_0x4db98c=_0x4db98c((window[['js',_0x241eef('no'),'m',_0x57ac01[0x1],_0x57ac01[0x4][_0xf1b1('0x1e')](),_0xf1b1('0x1f')]['join']('')]||_0xf1b1('0x20'))+['.v',_0x57ac01[0xd],'e',_0x241eef('x'),'co',_0x241eef('mm'),_0xf1b1('0x21'),_0x57ac01[0x1],'.c',_0x241eef('o'),'m.',_0x57ac01[0x13],'r'][_0xf1b1('0x9')](''));for(var _0x22ecff in _0x34d022){if(_0x4db98c===_0x22ecff+_0x34d022[_0x22ecff]||_0x395077===_0x22ecff+_0x34d022[_0x22ecff]){_0x4f911f='tr'+_0x57ac01[0x11]+'e';break;}_0x4f911f='f'+_0x57ac01[0x0]+'ls'+_0x241eef(_0x57ac01[0x1])+'';}_0x241eef=!0x1;-0x1<_0x4b3060[[_0x57ac01[0xc],'e',_0x57ac01[0x0],'rc',_0x57ac01[0x9]][_0xf1b1('0x9')]('')][_0xf1b1('0x22')](_0xf1b1('0x23'))&&(_0x241eef=!0x0);return[_0x4f911f,_0x241eef];}(_0x4704d4);}(window);if(!eval(_0x1af376[0x0]))return _0x1af376[0x1]?_0x65f1ee(_0xf1b1('0x24')):!0x1;_0x39fbd1['QD_dropDownCart']=function(_0x1d4061,_0x33a031){var _0x2a0ea0,_0x315340,_0x3daa3d,_0x5a51ec,_0x21daf9,_0x356e8f,_0x466a81,_0x1c14ce,_0x2e513e,_0x3d43a5,_0x45c513,_0x266108;_0x45c513=_0x39fbd1(_0x1d4061);if(!_0x45c513[_0xf1b1('0x8')])return _0x45c513;_0x2a0ea0={'updateOnlyHover':!![],'texts':{'linkCart':_0xf1b1('0x25'),'linkCheckout':_0xf1b1('0x26'),'cartTotal':_0xf1b1('0x27'),'emptyCart':_0xf1b1('0x28'),'continueShopping':_0xf1b1('0x29'),'shippingForm':'<div\x20class=\x22qd-ddc-cep-tooltip\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-cep-btn\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</a><div\x20class=\x22qd-ddc-cep-tooltip-text\x22><h4\x20class=\x22qd-ddc-cep-title\x22>Consulte\x20o\x20prazo\x20e\x20o\x20valor\x20do\x20frete</h4><div\x20class=\x22qd-ddc-cep-wrapper\x22><input\x20type=\x22tel\x22\x20class=\x22qd-ddc-cep\x22\x20placeholder=\x22Digite\x20o\x20CEP\x20de\x20entrega\x22><a\x20class=\x22qd-ddc-cep-ok\x22\x20href=\x22#\x22>OK</a></div><a\x20class=\x22qd-ddc-cep-close\x22\x20href=\x22#\x22><i\x20class=\x22fa\x20fa-times\x22\x20aria-hidden=\x22true\x22></i>\x20Fechar</a></div></div>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!![],'forceImageHTTPS':![],'skuName':function(_0x35429f){return _0x35429f['skuName']||_0x35429f['name'];},'callback':function(){},'callbackProductsList':function(){}};_0x315340=_0x39fbd1[_0xf1b1('0x2a')](!![],{},_0x2a0ea0,_0x33a031);_0x3daa3d=_0x39fbd1('');_0x3d43a5=this;if(_0x315340['smartCheckout']){var _0x121e0a=![];if(typeof window[_0xf1b1('0x2b')]===_0xf1b1('0x4')){_0x65f1ee(_0xf1b1('0x2c'));_0x39fbd1[_0xf1b1('0x2d')]({'url':_0xf1b1('0x2e'),'async':![],'dataType':'script','error':function(){_0x65f1ee(_0xf1b1('0x2f'));_0x121e0a=!![];}});}if(_0x121e0a)return _0x65f1ee(_0xf1b1('0x30'));}var _0x214e56;if(typeof window[_0xf1b1('0x2b')]===_0xf1b1('0x11')&&typeof window[_0xf1b1('0x2b')]['checkout']!==_0xf1b1('0x4'))_0x214e56=window['vtexjs'][_0xf1b1('0x31')];else if(typeof vtex==='object'&&typeof vtex['checkout']===_0xf1b1('0x11')&&typeof vtex['checkout']['SDK']!==_0xf1b1('0x4'))_0x214e56=new vtex['checkout'][(_0xf1b1('0x32'))]();else return _0x65f1ee(_0xf1b1('0x33'));_0x3d43a5[_0xf1b1('0x34')]=_0xf1b1('0x35')+'<div\x20class=\x22qd-ddc-wrapper2\x22>'+_0xf1b1('0x36')+_0xf1b1('0x37')+_0xf1b1('0x38')+_0xf1b1('0x39')+_0xf1b1('0x3a')+_0xf1b1('0x3b')+'<div\x20class=\x22qd-ddc-shipping\x22></div>'+_0xf1b1('0x3c')+_0xf1b1('0x3d')+_0xf1b1('0x3e')+_0xf1b1('0x3f');_0x356e8f=function(_0x1c8296){var _0x5344af=_0x39fbd1(_0x1c8296);_0x315340['texts'][_0xf1b1('0x40')]=_0x315340['texts'][_0xf1b1('0x40')][_0xf1b1('0x2')]('#value',_0xf1b1('0x41'));_0x315340[_0xf1b1('0x42')][_0xf1b1('0x40')]=_0x315340[_0xf1b1('0x42')][_0xf1b1('0x40')]['replace']('#items',_0xf1b1('0x43'));_0x315340[_0xf1b1('0x42')]['cartTotal']=_0x315340[_0xf1b1('0x42')][_0xf1b1('0x40')][_0xf1b1('0x2')](_0xf1b1('0x44'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0x315340[_0xf1b1('0x42')]['cartTotal']=_0x315340[_0xf1b1('0x42')][_0xf1b1('0x40')][_0xf1b1('0x2')](_0xf1b1('0x45'),_0xf1b1('0x46'));_0x5344af[_0xf1b1('0x47')](_0xf1b1('0x48'))['html'](_0x315340['texts'][_0xf1b1('0x49')]);_0x5344af[_0xf1b1('0x47')](_0xf1b1('0x4a'))[_0xf1b1('0x4b')](_0x315340[_0xf1b1('0x42')][_0xf1b1('0x4c')]);_0x5344af[_0xf1b1('0x47')]('.qd-ddc-checkout')['html'](_0x315340[_0xf1b1('0x42')]['linkCheckout']);_0x5344af[_0xf1b1('0x47')](_0xf1b1('0x4d'))['html'](_0x315340[_0xf1b1('0x42')][_0xf1b1('0x40')]);_0x5344af['find']('.qd-ddc-shipping')[_0xf1b1('0x4b')](_0x315340['texts'][_0xf1b1('0x4e')]);_0x5344af[_0xf1b1('0x47')]('.qd-ddc-emptyCart\x20p')[_0xf1b1('0x4b')](_0x315340[_0xf1b1('0x42')]['emptyCart']);return _0x5344af;};_0x21daf9=function(_0x3e32ba){_0x39fbd1(this)['append'](_0x3e32ba);_0x3e32ba[_0xf1b1('0x47')](_0xf1b1('0x4f'))[_0xf1b1('0x50')](_0x39fbd1(_0xf1b1('0x51')))['on']('click.qd_ddc_closeFn',function(){_0x45c513[_0xf1b1('0x52')](_0xf1b1('0x53'));_0x39fbd1(document['body'])[_0xf1b1('0x52')](_0xf1b1('0x54'));});_0x39fbd1(document)['off']('keyup.qd_ddc_closeFn')['on'](_0xf1b1('0x55'),function(_0x190edd){if(_0x190edd[_0xf1b1('0x56')]==0x1b){_0x45c513[_0xf1b1('0x52')](_0xf1b1('0x53'));_0x39fbd1(document[_0xf1b1('0x57')])[_0xf1b1('0x52')](_0xf1b1('0x54'));}});var _0x48e832=_0x3e32ba[_0xf1b1('0x47')](_0xf1b1('0x58'));_0x3e32ba[_0xf1b1('0x47')](_0xf1b1('0x59'))['on']('click.qd_ddc_scrollUp',function(){_0x3d43a5['scrollCart']('-',undefined,undefined,_0x48e832);return![];});_0x3e32ba[_0xf1b1('0x47')](_0xf1b1('0x5a'))['on']('click.qd_ddc_scrollDown',function(){_0x3d43a5[_0xf1b1('0x5b')](undefined,undefined,undefined,_0x48e832);return![];});var _0x35a364=_0x3e32ba[_0xf1b1('0x47')]('.qd-ddc-shipping\x20.qd-ddc-cep-tooltip-text');_0x3e32ba[_0xf1b1('0x47')](_0xf1b1('0x5c'))['val']('')['on'](_0xf1b1('0x5d'),function(_0x3845d6){_0x3d43a5['formatCepField'](_0x39fbd1(this));if(_0x3845d6[_0xf1b1('0x56')]==0xd)_0x3e32ba[_0xf1b1('0x47')](_0xf1b1('0x5e'))['click']();});_0x3e32ba[_0xf1b1('0x47')](_0xf1b1('0x5f'))['click'](function(_0x3cfc9c){_0x3cfc9c[_0xf1b1('0x60')]();_0x35a364[_0xf1b1('0x61')]();});_0x3e32ba[_0xf1b1('0x47')](_0xf1b1('0x62'))[_0xf1b1('0x63')](function(_0x29b669){_0x29b669[_0xf1b1('0x60')]();_0x35a364[_0xf1b1('0x64')]();});_0x39fbd1(document)[_0xf1b1('0x65')](_0xf1b1('0x66'))['on']('click._QD_DDC_closeShipping',function(_0x598f43){if(_0x39fbd1(_0x598f43[_0xf1b1('0x67')])['closest'](_0x3e32ba['find']('.qd-ddc-cep-tooltip'))[_0xf1b1('0x8')])return;_0x35a364[_0xf1b1('0x64')]();});_0x3e32ba['find'](_0xf1b1('0x68'))[_0xf1b1('0x63')](function(_0xe94a55){_0xe94a55[_0xf1b1('0x60')]();_0x3d43a5[_0xf1b1('0x69')](_0x3e32ba[_0xf1b1('0x47')](_0xf1b1('0x6a')));});if(_0x315340[_0xf1b1('0x6b')]){var _0x1147fc=0x0;_0x39fbd1(this)['on'](_0xf1b1('0x6c'),function(){var _0x1cfcf4=function(){if(!window[_0xf1b1('0x19')]['allowUpdate'])return;_0x3d43a5[_0xf1b1('0x6d')]();window[_0xf1b1('0x19')]['allowUpdate']=![];_0x39fbd1['fn'][_0xf1b1('0x6e')](!![]);_0x3d43a5[_0xf1b1('0x6f')]();};_0x1147fc=setInterval(function(){_0x1cfcf4();},0x258);_0x1cfcf4();});_0x39fbd1(this)['on'](_0xf1b1('0x70'),function(){clearInterval(_0x1147fc);});}};_0x466a81=_0x356e8f(this['cartContainer']);_0x1c14ce=0x0;_0x45c513[_0xf1b1('0x71')](function(){if(_0x1c14ce>0x0)_0x21daf9[_0xf1b1('0x72')](this,_0x466a81['clone']());else _0x21daf9[_0xf1b1('0x72')](this,_0x466a81);_0x1c14ce++;});window[_0xf1b1('0xa')]['callback']['add'](function(){_0x39fbd1('.qd-ddc-infoTotalValue')[_0xf1b1('0x4b')](window[_0xf1b1('0xa')]['total']||'--');_0x39fbd1(_0xf1b1('0x73'))[_0xf1b1('0x4b')](window[_0xf1b1('0xa')][_0xf1b1('0x74')]||'0');_0x39fbd1('.qd-ddc-infoTotalShipping')[_0xf1b1('0x4b')](window[_0xf1b1('0xa')]['shipping']||'--');_0x39fbd1(_0xf1b1('0x75'))[_0xf1b1('0x4b')](window[_0xf1b1('0xa')][_0xf1b1('0x76')]||'--');});_0x2e513e=function(_0x56319d){_0x65f1ee(_0xf1b1('0x77'));};_0x266108=function(_0x158709,_0x4ed4a5){if(typeof _0x158709[_0xf1b1('0x78')]===_0xf1b1('0x4'))return _0x65f1ee(_0xf1b1('0x79'));_0x3d43a5[_0xf1b1('0x7a')][_0xf1b1('0x72')](this,_0x4ed4a5);};_0x3d43a5['getCartInfoByUrl']=function(_0x4e4dce,_0x37679e){var _0xcacc6f;if(typeof _0x37679e!='undefined')window['_QuatroDigital_DropDown'][_0xf1b1('0x7b')]=_0x37679e;else if(window[_0xf1b1('0x19')][_0xf1b1('0x7b')])_0x37679e=window[_0xf1b1('0x19')][_0xf1b1('0x7b')];setTimeout(function(){window[_0xf1b1('0x19')][_0xf1b1('0x7b')]=undefined;},_0x315340[_0xf1b1('0x7c')]);_0x39fbd1('.qd-ddc-wrapper')[_0xf1b1('0x52')](_0xf1b1('0x7d'));if(_0x315340['smartCheckout']){_0xcacc6f=function(_0x461713){window[_0xf1b1('0x19')][_0xf1b1('0x7e')]=_0x461713;_0x266108(_0x461713,_0x37679e);if(typeof window[_0xf1b1('0x7f')]!==_0xf1b1('0x4')&&typeof window['_QuatroDigital_AmountProduct'][_0xf1b1('0x80')]==='function')window['_QuatroDigital_AmountProduct'][_0xf1b1('0x80')][_0xf1b1('0x72')](this);_0x39fbd1('.qd-ddc-wrapper')[_0xf1b1('0x81')](_0xf1b1('0x7d'));};if(typeof window[_0xf1b1('0x19')][_0xf1b1('0x7e')]!=='undefined'){_0xcacc6f(window[_0xf1b1('0x19')][_0xf1b1('0x7e')]);if(typeof _0x4e4dce===_0xf1b1('0xd'))_0x4e4dce(window[_0xf1b1('0x19')][_0xf1b1('0x7e')]);return;}_0x39fbd1[_0xf1b1('0x82')]([_0xf1b1('0x78'),_0xf1b1('0x83'),'shippingData'],{'done':function(_0x2b0cda){_0xcacc6f['call'](this,_0x2b0cda);if(typeof _0x4e4dce===_0xf1b1('0xd'))_0x4e4dce(_0x2b0cda);},'fail':function(_0x5286d2){_0x65f1ee([_0xf1b1('0x84'),_0x5286d2]);}});}else{alert(_0xf1b1('0x85'));}};_0x3d43a5['cartIsEmpty']=function(){var _0xdfa718=_0x39fbd1(_0xf1b1('0x86'));if(_0xdfa718['find'](_0xf1b1('0x87'))[_0xf1b1('0x8')])_0xdfa718['removeClass'](_0xf1b1('0x88'));else _0xdfa718[_0xf1b1('0x81')](_0xf1b1('0x88'));};_0x3d43a5[_0xf1b1('0x7a')]=function(_0x3e1362){var _0x21c031=_0x39fbd1(_0xf1b1('0x89'));var _0xca45e5='<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22>'+'<div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22>'+_0xf1b1('0x8a')+_0xf1b1('0x8b')+_0xf1b1('0x8c')+_0xf1b1('0x8d')+'</div>'+_0xf1b1('0x8e')+_0xf1b1('0x8f')+_0xf1b1('0x90')+_0xf1b1('0x91')+_0xf1b1('0x92')+'<input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/>'+_0xf1b1('0x93')+'<span\x20class=\x22qd-ddc-qttLoading\x22></span>'+_0xf1b1('0x8d')+_0xf1b1('0x8d')+_0xf1b1('0x94')+_0xf1b1('0x95')+_0xf1b1('0x96')+_0xf1b1('0x97')+_0xf1b1('0x8d')+_0xf1b1('0x8d')+_0xf1b1('0x8d');_0x21c031['empty']();_0x21c031[_0xf1b1('0x71')](function(){var _0x4f58d7=_0x39fbd1(this);var _0x4e2c25,_0x3a2da0,_0x5d569f,_0x58e736;var _0x2e3340=_0x39fbd1('');var _0x1f64e9;for(var _0x5393f9 in window[_0xf1b1('0x19')][_0xf1b1('0x7e')]['items']){if(typeof window[_0xf1b1('0x19')][_0xf1b1('0x7e')]['items'][_0x5393f9]!==_0xf1b1('0x11'))continue;_0x5d569f=window['_QuatroDigital_DropDown'][_0xf1b1('0x7e')][_0xf1b1('0x78')][_0x5393f9];_0x1f64e9=_0x5d569f[_0xf1b1('0x98')][_0xf1b1('0x2')](/^\/|\/$/g,'')[_0xf1b1('0x7')]('/');_0x3a2da0=_0x39fbd1(_0xca45e5);_0x3a2da0['attr']({'data-sku':_0x5d569f['id'],'data-sku-index':_0x5393f9,'data-qd-departament':_0x1f64e9[0x0],'data-qd-category':_0x1f64e9[_0x1f64e9['length']-0x1]});_0x3a2da0[_0xf1b1('0x81')]('qd-ddc-'+_0x5d569f[_0xf1b1('0x99')]);_0x3a2da0[_0xf1b1('0x47')]('.qd-ddc-prodName')['append'](_0x315340[_0xf1b1('0x9a')](_0x5d569f));_0x3a2da0['find'](_0xf1b1('0x9b'))[_0xf1b1('0x9c')](isNaN(_0x5d569f[_0xf1b1('0x9d')])?_0x5d569f['sellingPrice']:_0x5d569f[_0xf1b1('0x9d')]==0x0?_0xf1b1('0x9e'):(_0x39fbd1(_0xf1b1('0x9f'))['attr'](_0xf1b1('0xa0'))||'R$')+'\x20'+qd_number_format(_0x5d569f[_0xf1b1('0x9d')]/0x64,0x2,',','.'));_0x3a2da0['find']('.qd-ddc-quantity')[_0xf1b1('0xa1')]({'data-sku':_0x5d569f['id'],'data-sku-index':_0x5393f9})[_0xf1b1('0xa2')](_0x5d569f[_0xf1b1('0xa3')]);_0x3a2da0['find'](_0xf1b1('0xa4'))[_0xf1b1('0xa1')]({'data-sku':_0x5d569f['id'],'data-sku-index':_0x5393f9});_0x3d43a5[_0xf1b1('0xa5')](_0x5d569f['id'],_0x3a2da0[_0xf1b1('0x47')](_0xf1b1('0xa6')),_0x5d569f[_0xf1b1('0xa7')]);_0x3a2da0[_0xf1b1('0x47')]('.qd-ddc-quantityMore,.qd-ddc-quantityMinus')['attr']({'data-sku':_0x5d569f['id'],'data-sku-index':_0x5393f9});_0x3a2da0['appendTo'](_0x4f58d7);_0x2e3340=_0x2e3340[_0xf1b1('0x50')](_0x3a2da0);}try{var _0x62e2ea=_0x4f58d7[_0xf1b1('0x0')]('.qd-ddc-wrapper')[_0xf1b1('0x47')]('.qd-ddc-shipping\x20input');if(_0x62e2ea[_0xf1b1('0x8')]&&_0x62e2ea[_0xf1b1('0xa2')]()==''&&window['_QuatroDigital_DropDown'][_0xf1b1('0x7e')][_0xf1b1('0xa8')][_0xf1b1('0xa9')])_0x62e2ea[_0xf1b1('0xa2')](window[_0xf1b1('0x19')][_0xf1b1('0x7e')][_0xf1b1('0xa8')][_0xf1b1('0xa9')]['postalCode']);}catch(_0x533c25){_0x65f1ee(_0xf1b1('0xaa')+_0x533c25[_0xf1b1('0xf')],_0xf1b1('0x17'));}_0x3d43a5[_0xf1b1('0xab')](_0x4f58d7);_0x3d43a5[_0xf1b1('0x6f')]();if(_0x3e1362&&_0x3e1362[_0xf1b1('0xac')]){(function(){_0x58e736=_0x2e3340[_0xf1b1('0xad')]('[data-sku=\x27'+_0x3e1362[_0xf1b1('0xac')]+'\x27]');if(!_0x58e736[_0xf1b1('0x8')])return;_0x4e2c25=0x0;_0x2e3340[_0xf1b1('0x71')](function(){var _0x5135c5=_0x39fbd1(this);if(_0x5135c5['is'](_0x58e736))return![];_0x4e2c25+=_0x5135c5['outerHeight']();});_0x3d43a5[_0xf1b1('0x5b')](undefined,undefined,_0x4e2c25,_0x4f58d7[_0xf1b1('0x50')](_0x4f58d7[_0xf1b1('0xae')]()));_0x2e3340[_0xf1b1('0x52')]('qd-ddc-lastAddedFixed');(function(_0x193209){_0x193209[_0xf1b1('0x81')](_0xf1b1('0xaf'));_0x193209[_0xf1b1('0x81')](_0xf1b1('0xb0'));setTimeout(function(){_0x193209[_0xf1b1('0x52')](_0xf1b1('0xaf'));},_0x315340['timeRemoveNewItemClass']);}(_0x58e736));_0x39fbd1(document[_0xf1b1('0x57')])[_0xf1b1('0x81')](_0xf1b1('0xb1'));setTimeout(function(){_0x39fbd1(document['body'])[_0xf1b1('0x52')](_0xf1b1('0xb1'));},_0x315340[_0xf1b1('0x7c')]);}());}});(function(){if(_QuatroDigital_DropDown[_0xf1b1('0x7e')][_0xf1b1('0x78')][_0xf1b1('0x8')]){_0x39fbd1(_0xf1b1('0x57'))[_0xf1b1('0x52')](_0xf1b1('0xb2'))['addClass'](_0xf1b1('0xb3'));setTimeout(function(){_0x39fbd1('body')['removeClass'](_0xf1b1('0xb4'));},_0x315340[_0xf1b1('0x7c')]);}else _0x39fbd1(_0xf1b1('0x57'))[_0xf1b1('0x52')](_0xf1b1('0xb5'))['addClass'](_0xf1b1('0xb2'));}());if(typeof _0x315340[_0xf1b1('0xb6')]===_0xf1b1('0xd'))_0x315340[_0xf1b1('0xb6')][_0xf1b1('0x72')](this);else _0x65f1ee(_0xf1b1('0xb7'));};_0x3d43a5['insertProdImg']=function(_0xb70413,_0x1f28dd,_0x4e50af){var _0xc35d02=!![];function _0x12c9f3(){if(_0x315340[_0xf1b1('0xb8')]&&typeof _0x4e50af==_0xf1b1('0xb9'))_0x4e50af=_0x4e50af[_0xf1b1('0x2')](_0xf1b1('0xba'),_0xf1b1('0xbb'));_0x1f28dd[_0xf1b1('0x52')](_0xf1b1('0xbc'))[_0xf1b1('0xbd')](function(){_0x39fbd1(this)[_0xf1b1('0x81')](_0xf1b1('0xbc'));})[_0xf1b1('0xa1')](_0xf1b1('0xbe'),_0x4e50af);};if(_0x4e50af)_0x12c9f3();else if(!isNaN(_0xb70413)){alert(_0xf1b1('0xbf'));}else _0x65f1ee(_0xf1b1('0xc0'),_0xf1b1('0x15'));};_0x3d43a5[_0xf1b1('0xab')]=function(_0x150044){var _0x9edd9d,_0x280878,_0x3aa594,_0x5c77bb;_0x9edd9d=function(_0x5cce57,_0x5081ea){var _0x4cdb9a,_0x2a715c,_0xf0f589,_0xcb9fcd,_0x4eb9c0;_0xf0f589=_0x39fbd1(_0x5cce57);_0x4cdb9a=_0xf0f589['attr'](_0xf1b1('0xc1'));_0x4eb9c0=_0xf0f589[_0xf1b1('0xa1')](_0xf1b1('0xc2'));if(!_0x4cdb9a)return;_0x2a715c=parseInt(_0xf0f589['val']())||0x1;_0x3d43a5[_0xf1b1('0xc3')]([_0x4cdb9a,_0x4eb9c0],_0x2a715c,_0x2a715c+0x1,function(_0xa29e65){_0xf0f589[_0xf1b1('0xa2')](_0xa29e65);if(typeof _0x5081ea===_0xf1b1('0xd'))_0x5081ea();});};_0x3aa594=function(_0x17de00,_0x3cad5d){var _0x4f3fb0,_0x5b249f,_0x12c1cf,_0x4b5047,_0xa3ced3;_0x12c1cf=_0x39fbd1(_0x17de00);_0x4f3fb0=_0x12c1cf[_0xf1b1('0xa1')](_0xf1b1('0xc1'));_0xa3ced3=_0x12c1cf['attr']('data-sku-index');if(!_0x4f3fb0)return;_0x5b249f=parseInt(_0x12c1cf['val']())||0x2;_0x4b5047=_0x3d43a5['changeQantity']([_0x4f3fb0,_0xa3ced3],_0x5b249f,_0x5b249f-0x1,function(_0x470b87){_0x12c1cf[_0xf1b1('0xa2')](_0x470b87);if(typeof _0x3cad5d==='function')_0x3cad5d();});};_0x5c77bb=function(_0x23d556,_0x19ee49){var _0x3079c2,_0x210fa6,_0x26c69e,_0x217d01,_0xe900b2;_0x26c69e=_0x39fbd1(_0x23d556);_0x3079c2=_0x26c69e[_0xf1b1('0xa1')]('data-sku');_0xe900b2=_0x26c69e['attr'](_0xf1b1('0xc2'));if(!_0x3079c2)return;_0x210fa6=parseInt(_0x26c69e[_0xf1b1('0xa2')]())||0x1;_0x217d01=_0x3d43a5[_0xf1b1('0xc3')]([_0x3079c2,_0xe900b2],0x1,_0x210fa6,function(_0x17a539){_0x26c69e[_0xf1b1('0xa2')](_0x17a539);if(typeof _0x19ee49===_0xf1b1('0xd'))_0x19ee49();});};_0x280878=_0x150044[_0xf1b1('0x47')](_0xf1b1('0xc4'));_0x280878[_0xf1b1('0x81')](_0xf1b1('0xc5'))['each'](function(){var _0x26a7a8=_0x39fbd1(this);_0x26a7a8[_0xf1b1('0x47')](_0xf1b1('0xc6'))['on']('click.qd_ddc_more',function(_0x3c3189){_0x3c3189[_0xf1b1('0x60')]();_0x280878['addClass'](_0xf1b1('0xc7'));_0x9edd9d(_0x26a7a8['find'](_0xf1b1('0xc8')),function(){_0x280878[_0xf1b1('0x52')](_0xf1b1('0xc7'));});});_0x26a7a8[_0xf1b1('0x47')](_0xf1b1('0xc9'))['on'](_0xf1b1('0xca'),function(_0x2f16e9){_0x2f16e9[_0xf1b1('0x60')]();_0x280878[_0xf1b1('0x81')](_0xf1b1('0xc7'));_0x3aa594(_0x26a7a8[_0xf1b1('0x47')](_0xf1b1('0xc8')),function(){_0x280878[_0xf1b1('0x52')]('qd-loading');});});_0x26a7a8[_0xf1b1('0x47')](_0xf1b1('0xc8'))['on']('focusout.qd_ddc_change',function(){_0x280878[_0xf1b1('0x81')](_0xf1b1('0xc7'));_0x5c77bb(this,function(){_0x280878['removeClass']('qd-loading');});});_0x26a7a8['find'](_0xf1b1('0xc8'))['on'](_0xf1b1('0xcb'),function(_0x3bdd32){if(_0x3bdd32[_0xf1b1('0x56')]!=0xd)return;_0x280878[_0xf1b1('0x81')](_0xf1b1('0xc7'));_0x5c77bb(this,function(){_0x280878[_0xf1b1('0x52')](_0xf1b1('0xc7'));});});});_0x150044['find'](_0xf1b1('0x87'))[_0xf1b1('0x71')](function(){var _0x58f177=_0x39fbd1(this);_0x58f177[_0xf1b1('0x47')](_0xf1b1('0xa4'))['on'](_0xf1b1('0xcc'),function(){var _0x288220;_0x58f177[_0xf1b1('0x81')](_0xf1b1('0xc7'));_0x3d43a5['removeProduct'](_0x39fbd1(this),function(_0x265a8a){if(_0x265a8a)_0x58f177[_0xf1b1('0xcd')](!![])[_0xf1b1('0xce')](function(){_0x58f177['remove']();_0x3d43a5[_0xf1b1('0x6f')]();});else _0x58f177[_0xf1b1('0x52')](_0xf1b1('0xc7'));});return![];});});};_0x3d43a5[_0xf1b1('0xcf')]=function(_0x1602df){var _0x13c875=_0x1602df[_0xf1b1('0xa2')]();_0x13c875=_0x13c875[_0xf1b1('0x2')](/[^0-9\-]/g,'');_0x13c875=_0x13c875[_0xf1b1('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,'$1-$2$3');_0x13c875=_0x13c875[_0xf1b1('0x2')](/(.{9}).*/g,'$1');_0x1602df[_0xf1b1('0xa2')](_0x13c875);};_0x3d43a5[_0xf1b1('0x69')]=function(_0x16903b){var _0x74848d=_0x16903b[_0xf1b1('0xa2')]();if(_0x74848d[_0xf1b1('0x8')]>=0x9){if(_0x16903b[_0xf1b1('0xd0')](_0xf1b1('0xd1'))!=_0x74848d){_0x214e56[_0xf1b1('0xd2')]({'postalCode':_0x74848d,'country':_0xf1b1('0xd3')})[_0xf1b1('0xd4')](function(_0x3e2448){_0x16903b['closest'](_0xf1b1('0xd5'))[_0xf1b1('0x47')]('.qd-dd-cep-slas')[_0xf1b1('0xd6')]();window[_0xf1b1('0x19')][_0xf1b1('0x7e')]=_0x3e2448;_0x3d43a5['getCartInfoByUrl']();var _0x458c73=_0x3e2448[_0xf1b1('0xa8')]['logisticsInfo'][0x0][_0xf1b1('0xd7')];var _0xd35f57=_0x39fbd1(_0xf1b1('0xd8'));for(var _0x54f008=0x0;_0x54f008<_0x458c73[_0xf1b1('0x8')];_0x54f008++){var _0x4bf95f=_0x458c73[_0x54f008];var _0x23976c=_0x4bf95f[_0xf1b1('0xd9')]>0x1?_0x4bf95f[_0xf1b1('0xd9')]['replace']('bd',_0xf1b1('0xda')):_0x4bf95f[_0xf1b1('0xd9')][_0xf1b1('0x2')]('bd','\x20dias\x20útéis');var _0x8ddc52=_0x39fbd1(_0xf1b1('0xdb'));_0x8ddc52[_0xf1b1('0x9c')](_0xf1b1('0xdc')+qd_number_format(_0x4bf95f[_0xf1b1('0xdd')]/0x64,0x2,',','.')+_0xf1b1('0xde')+_0x4bf95f[_0xf1b1('0xdf')]+_0xf1b1('0xe0')+_0x23976c+_0xf1b1('0xe1')+_0x74848d+'</td>');_0x8ddc52[_0xf1b1('0xe2')](_0xd35f57[_0xf1b1('0x47')](_0xf1b1('0xe3')));}_0xd35f57['insertBefore'](_0x16903b[_0xf1b1('0x1')](_0xf1b1('0xd5'))[_0xf1b1('0x47')]('.qd-ddc-cep-close'));})[_0xf1b1('0xe4')](function(_0xb44d65){_0x65f1ee([_0xf1b1('0xe5'),_0xb44d65]);updateCartData();});}_0x16903b['data']('qdDdcLastPostalCode',_0x74848d);}};_0x3d43a5[_0xf1b1('0xc3')]=function(_0x1db42f,_0x4183a7,_0x29afd8,_0x492d77){var _0x41fce4=_0x29afd8||0x1;if(_0x41fce4<0x1)return _0x4183a7;if(_0x315340['smartCheckout']){if(typeof window[_0xf1b1('0x19')][_0xf1b1('0x7e')][_0xf1b1('0x78')][_0x1db42f[0x1]]===_0xf1b1('0x4')){_0x65f1ee(_0xf1b1('0xe6')+_0x1db42f[0x1]+']');return _0x4183a7;}window[_0xf1b1('0x19')][_0xf1b1('0x7e')][_0xf1b1('0x78')][_0x1db42f[0x1]][_0xf1b1('0xa3')]=_0x41fce4;window['_QuatroDigital_DropDown'][_0xf1b1('0x7e')][_0xf1b1('0x78')][_0x1db42f[0x1]]['index']=_0x1db42f[0x1];_0x214e56[_0xf1b1('0xe7')]([window[_0xf1b1('0x19')][_0xf1b1('0x7e')][_0xf1b1('0x78')][_0x1db42f[0x1]]],[_0xf1b1('0x78'),_0xf1b1('0x83'),_0xf1b1('0xa8')])[_0xf1b1('0xd4')](function(_0xe27b5c){window[_0xf1b1('0x19')][_0xf1b1('0x7e')]=_0xe27b5c;_0xc71064(!![]);})[_0xf1b1('0xe4')](function(_0xdc91c9){_0x65f1ee(['Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho',_0xdc91c9]);_0xc71064();});}else{_0x65f1ee('atenção\x20esta\x20método\x20esta\x20descontinuado');}function _0xc71064(_0x213c64){_0x213c64=typeof _0x213c64!==_0xf1b1('0xe8')?![]:_0x213c64;_0x3d43a5[_0xf1b1('0x6d')]();window['_QuatroDigital_DropDown'][_0xf1b1('0xe9')]=![];_0x3d43a5[_0xf1b1('0x6f')]();if(typeof window[_0xf1b1('0x7f')]!=='undefined'&&typeof window['_QuatroDigital_AmountProduct']['exec']===_0xf1b1('0xd'))window[_0xf1b1('0x7f')][_0xf1b1('0x80')][_0xf1b1('0x72')](this);if(typeof adminCart===_0xf1b1('0xd'))adminCart();_0x39fbd1['fn'][_0xf1b1('0x6e')](!![],undefined,_0x213c64);if(typeof _0x492d77===_0xf1b1('0xd'))_0x492d77(_0x4183a7);};};_0x3d43a5[_0xf1b1('0xea')]=function(_0x30daa5,_0x3c4ae8){var _0x3dcb4f=![];var _0x4a714a=_0x39fbd1(_0x30daa5);var _0x135b71=_0x4a714a[_0xf1b1('0xa1')](_0xf1b1('0xc2'));if(_0x315340[_0xf1b1('0xeb')]){if(typeof window[_0xf1b1('0x19')]['getOrderForm'][_0xf1b1('0x78')][_0x135b71]===_0xf1b1('0x4')){_0x65f1ee(_0xf1b1('0xe6')+_0x135b71+']');return _0x3dcb4f;}window[_0xf1b1('0x19')]['getOrderForm'][_0xf1b1('0x78')][_0x135b71]['index']=_0x135b71;_0x214e56[_0xf1b1('0xec')]([window['_QuatroDigital_DropDown'][_0xf1b1('0x7e')][_0xf1b1('0x78')][_0x135b71]],['items',_0xf1b1('0x83'),'shippingData'])[_0xf1b1('0xd4')](function(_0x48379d){_0x3dcb4f=!![];window[_0xf1b1('0x19')]['getOrderForm']=_0x48379d;_0x266108(_0x48379d);_0x35e9ef(!![]);})[_0xf1b1('0xe4')](function(_0x188c31){_0x65f1ee([_0xf1b1('0xed'),_0x188c31]);_0x35e9ef();});}else{alert(_0xf1b1('0xee'));}function _0x35e9ef(_0x1599eb){_0x1599eb=typeof _0x1599eb!==_0xf1b1('0xe8')?![]:_0x1599eb;if(typeof window[_0xf1b1('0x7f')]!==_0xf1b1('0x4')&&typeof window[_0xf1b1('0x7f')]['exec']==='function')window[_0xf1b1('0x7f')]['exec'][_0xf1b1('0x72')](this);if(typeof adminCart===_0xf1b1('0xd'))adminCart();_0x39fbd1['fn'][_0xf1b1('0x6e')](!![],undefined,_0x1599eb);if(typeof _0x3c4ae8===_0xf1b1('0xd'))_0x3c4ae8(_0x3dcb4f);};};_0x3d43a5[_0xf1b1('0x5b')]=function(_0x221a6d,_0x3a1a40,_0x3434f6,_0xbdc05b){var _0x15294f=_0xbdc05b||_0x39fbd1(_0xf1b1('0xef'));var _0x338af7=_0x221a6d||'+';var _0x4eda5c=_0x3a1a40||_0x15294f[_0xf1b1('0xf0')]()*0.9;_0x15294f[_0xf1b1('0xcd')](!![],!![])['animate']({'scrollTop':isNaN(_0x3434f6)?_0x338af7+'='+_0x4eda5c+'px':_0x3434f6});};if(!_0x315340[_0xf1b1('0x6b')]){_0x3d43a5[_0xf1b1('0x6d')]();_0x39fbd1['fn']['simpleCart'](!![]);}_0x39fbd1(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window['_QuatroDigital_DropDown'][_0xf1b1('0x7e')]=undefined;_0x3d43a5['getCartInfoByUrl']();}catch(_0x53851a){_0x65f1ee('Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20'+_0x53851a[_0xf1b1('0xf')],_0xf1b1('0xf1'));}});if(typeof _0x315340[_0xf1b1('0xb')]===_0xf1b1('0xd'))_0x315340['callback'][_0xf1b1('0x72')](this);else _0x65f1ee('Callback\x20não\x20é\x20uma\x20função');};_0x39fbd1['fn'][_0xf1b1('0x1a')]=function(_0x420cb1){var _0x324af1;_0x324af1=_0x39fbd1(this);_0x324af1['fn']=new _0x39fbd1['QD_dropDownCart'](this,_0x420cb1);return _0x324af1;};}catch(_0x223ff9){if(typeof console!==_0xf1b1('0x4')&&typeof console[_0xf1b1('0xc')]===_0xf1b1('0xd'))console[_0xf1b1('0xc')]('Oooops!\x20',_0x223ff9);}}(this));(function(_0x3829c8){'use strict';try{var _0x713912=jQuery;var _0x42275b=_0xf1b1('0xf2');var _0x479685=function(_0x1ed29f,_0x372739){if('object'===typeof console&&_0xf1b1('0x4')!==typeof console['error']&&_0xf1b1('0x4')!==typeof console[_0xf1b1('0x12')]&&'undefined'!==typeof console[_0xf1b1('0x13')]){var _0x19595b;_0xf1b1('0x11')===typeof _0x1ed29f?(_0x1ed29f[_0xf1b1('0x14')]('['+_0x42275b+']\x0a'),_0x19595b=_0x1ed29f):_0x19595b=['['+_0x42275b+']\x0a'+_0x1ed29f];if(_0xf1b1('0x4')===typeof _0x372739||_0xf1b1('0x15')!==_0x372739[_0xf1b1('0x16')]()&&_0xf1b1('0x17')!==_0x372739[_0xf1b1('0x16')]())if(_0xf1b1('0x4')!==typeof _0x372739&&_0xf1b1('0x12')===_0x372739[_0xf1b1('0x16')]())try{console[_0xf1b1('0x12')]['apply'](console,_0x19595b);}catch(_0x5b46ff){try{console[_0xf1b1('0x12')](_0x19595b[_0xf1b1('0x9')]('\x0a'));}catch(_0x5f4d9f){}}else try{console[_0xf1b1('0xc')][_0xf1b1('0x18')](console,_0x19595b);}catch(_0x1abf57){try{console[_0xf1b1('0xc')](_0x19595b[_0xf1b1('0x9')]('\x0a'));}catch(_0x21ecc3){}}else try{console[_0xf1b1('0x13')][_0xf1b1('0x18')](console,_0x19595b);}catch(_0x1780b3){try{console[_0xf1b1('0x13')](_0x19595b[_0xf1b1('0x9')]('\x0a'));}catch(_0x17ea17){}}}};window['_QuatroDigital_AmountProduct']=window[_0xf1b1('0x7f')]||{};window[_0xf1b1('0x7f')]['items']={};window['_QuatroDigital_AmountProduct']['allowRecalculate']=![];window[_0xf1b1('0x7f')][_0xf1b1('0xf3')]=![];window[_0xf1b1('0x7f')][_0xf1b1('0xf4')]=![];var _0x27434a=_0xf1b1('0xf5');var _0x26c17e=function(){var _0x119352,_0xf38941,_0x3fbcfd,_0x326b5f;_0x326b5f=_0x1ce6d9();if(window[_0xf1b1('0x7f')][_0xf1b1('0xf6')]){_0x713912('.qd-bap-wrapper')['remove']();_0x713912(_0xf1b1('0xf7'))[_0xf1b1('0x52')](_0xf1b1('0xf8'));}for(var _0x115326 in window['_QuatroDigital_AmountProduct'][_0xf1b1('0x78')]){_0x119352=window[_0xf1b1('0x7f')]['items'][_0x115326];if(typeof _0x119352!==_0xf1b1('0x11'))return;_0x3fbcfd=_0x713912(_0xf1b1('0xf9')+_0x119352[_0xf1b1('0xfa')]+']')[_0xf1b1('0x0')]('li');if(!window[_0xf1b1('0x7f')]['allowRecalculate']&&_0x3fbcfd[_0xf1b1('0x47')](_0xf1b1('0xfb'))['length'])continue;_0xf38941=_0x713912(_0x27434a);_0xf38941[_0xf1b1('0x47')]('.qd-bap-qtt')['html'](_0x119352['qtt']);var _0x55a13c=_0x3fbcfd[_0xf1b1('0x47')](_0xf1b1('0xfc'));if(_0x55a13c[_0xf1b1('0x8')])_0x55a13c[_0xf1b1('0xfd')](_0xf38941)[_0xf1b1('0x81')](_0xf1b1('0xf8'));else _0x3fbcfd['prepend'](_0xf38941);}if(_0x326b5f)window['_QuatroDigital_AmountProduct'][_0xf1b1('0xf6')]=![];};var _0x1ce6d9=function(){if(!window[_0xf1b1('0x7f')][_0xf1b1('0xf6')])return;var _0xce94bb=![],_0x22f5d5={};window[_0xf1b1('0x7f')][_0xf1b1('0x78')]={};for(var _0x1f163a in window[_0xf1b1('0x19')][_0xf1b1('0x7e')][_0xf1b1('0x78')]){if(typeof window[_0xf1b1('0x19')][_0xf1b1('0x7e')][_0xf1b1('0x78')][_0x1f163a]!==_0xf1b1('0x11'))continue;var _0x273f91=window[_0xf1b1('0x19')][_0xf1b1('0x7e')][_0xf1b1('0x78')][_0x1f163a];if(typeof _0x273f91[_0xf1b1('0xfe')]===_0xf1b1('0x4')||_0x273f91[_0xf1b1('0xfe')]===null||_0x273f91[_0xf1b1('0xfe')]==='')continue;window[_0xf1b1('0x7f')][_0xf1b1('0x78')][_0xf1b1('0xff')+_0x273f91['productId']]=window['_QuatroDigital_AmountProduct'][_0xf1b1('0x78')]['prod_'+_0x273f91[_0xf1b1('0xfe')]]||{};window[_0xf1b1('0x7f')][_0xf1b1('0x78')][_0xf1b1('0xff')+_0x273f91['productId']]['prodId']=_0x273f91[_0xf1b1('0xfe')];if(!_0x22f5d5['prod_'+_0x273f91['productId']])window[_0xf1b1('0x7f')]['items']['prod_'+_0x273f91[_0xf1b1('0xfe')]][_0xf1b1('0x74')]=0x0;window[_0xf1b1('0x7f')][_0xf1b1('0x78')][_0xf1b1('0xff')+_0x273f91[_0xf1b1('0xfe')]][_0xf1b1('0x74')]=window[_0xf1b1('0x7f')][_0xf1b1('0x78')][_0xf1b1('0xff')+_0x273f91['productId']][_0xf1b1('0x74')]+_0x273f91[_0xf1b1('0xa3')];_0xce94bb=!![];_0x22f5d5[_0xf1b1('0xff')+_0x273f91['productId']]=!![];}return _0xce94bb;};window[_0xf1b1('0x7f')][_0xf1b1('0x80')]=function(){window[_0xf1b1('0x7f')][_0xf1b1('0xf6')]=!![];_0x26c17e[_0xf1b1('0x72')](this);};_0x713912(document)['ajaxStop'](function(){_0x26c17e['call'](this);});}catch(_0x423dee){if(typeof console!==_0xf1b1('0x4')&&typeof console[_0xf1b1('0xc')]==='function')console[_0xf1b1('0xc')](_0xf1b1('0xe'),_0x423dee);}}(this));(function(){'use strict';try{var _0x1ef8f4=jQuery,_0x41805e;var _0x4e675e=_0xf1b1('0x100');var _0x5f051c=function(_0x394efe,_0xc130be){if(_0xf1b1('0x11')===typeof console&&_0xf1b1('0x4')!==typeof console['error']&&_0xf1b1('0x4')!==typeof console[_0xf1b1('0x12')]&&_0xf1b1('0x4')!==typeof console['warn']){var _0x1b37d6;_0xf1b1('0x11')===typeof _0x394efe?(_0x394efe[_0xf1b1('0x14')]('['+_0x4e675e+']\x0a'),_0x1b37d6=_0x394efe):_0x1b37d6=['['+_0x4e675e+']\x0a'+_0x394efe];if(_0xf1b1('0x4')===typeof _0xc130be||_0xf1b1('0x15')!==_0xc130be[_0xf1b1('0x16')]()&&_0xf1b1('0x17')!==_0xc130be[_0xf1b1('0x16')]())if(_0xf1b1('0x4')!==typeof _0xc130be&&_0xf1b1('0x12')===_0xc130be[_0xf1b1('0x16')]())try{console[_0xf1b1('0x12')]['apply'](console,_0x1b37d6);}catch(_0x2d9051){try{console[_0xf1b1('0x12')](_0x1b37d6[_0xf1b1('0x9')]('\x0a'));}catch(_0x4d840d){}}else try{console[_0xf1b1('0xc')][_0xf1b1('0x18')](console,_0x1b37d6);}catch(_0x3c3695){try{console[_0xf1b1('0xc')](_0x1b37d6[_0xf1b1('0x9')]('\x0a'));}catch(_0x73519c){}}else try{console[_0xf1b1('0x13')][_0xf1b1('0x18')](console,_0x1b37d6);}catch(_0x48e875){try{console[_0xf1b1('0x13')](_0x1b37d6[_0xf1b1('0x9')]('\x0a'));}catch(_0x173126){}}}};var _0x4f1ace={'selector':_0xf1b1('0x101'),'dropDown':{},'buyButton':{}};_0x1ef8f4['QD_smartCart']=function(_0x359ab4){var _0x251b2,_0x3985bf={};_0x41805e=_0x1ef8f4[_0xf1b1('0x2a')](!![],{},_0x4f1ace,_0x359ab4);_0x251b2=_0x1ef8f4(_0x41805e[_0xf1b1('0x102')])[_0xf1b1('0x1a')](_0x41805e['dropDown']);if(typeof _0x41805e[_0xf1b1('0x103')]['updateOnlyHover']!=='undefined'&&_0x41805e[_0xf1b1('0x103')][_0xf1b1('0x6b')]===![])_0x3985bf[_0xf1b1('0x104')]=_0x1ef8f4(_0x41805e[_0xf1b1('0x102')])[_0xf1b1('0x105')](_0x251b2['fn'],_0x41805e[_0xf1b1('0x104')]);else _0x3985bf[_0xf1b1('0x104')]=_0x1ef8f4(_0x41805e[_0xf1b1('0x102')])['QD_buyButton'](_0x41805e[_0xf1b1('0x104')]);_0x3985bf[_0xf1b1('0x103')]=_0x251b2;return _0x3985bf;};_0x1ef8f4['fn'][_0xf1b1('0x106')]=function(){if(typeof console===_0xf1b1('0x11')&&typeof console[_0xf1b1('0x12')]===_0xf1b1('0xd'))console[_0xf1b1('0x12')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x1ef8f4['smartCart']=_0x1ef8f4['fn'][_0xf1b1('0x106')];}catch(_0x5f1b2d){if(typeof console!==_0xf1b1('0x4')&&typeof console[_0xf1b1('0xc')]===_0xf1b1('0xd'))console['error'](_0xf1b1('0xe'),_0x5f1b2d);}}());
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
var _0x1393=['text','replace','split','length','indexOf','youtube','push','shift','youtu.be','pop','<div\x20class=\x22qd-playerWrapper\x22></div>','prependTo','#include','<div\x20class=\x22qd-playerContainer\x22></div>','bwnsngn%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','join','toUpperCase','ite','---','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','html','<iframe\x20src=\x22','://www.youtube.com/embed/','?wmode=transparent&rel=0&enablejsapi=1&autoplay=','autoPlay','&mute=','mute','\x22\x20frameborder=\x220\x22\x20allowfullscreen></iframe>','data','height','stop','fadeTo','qdpv-video-on','animate','a:not(\x27.qd-videoLink\x27)','bind','click.removeVideo','hide','removeAttr','style','removeClass','call','<li\x20class=\x27qd-videoItem\x27><span\x20class=\x27qd-videoThumbBg\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','\x27\x20style=\x27background-image:url(\x22//img.youtube.com/vi/','/default.jpg\x22)\x27><img\x20src=\x27/arquivos/qd-playIco.png\x27\x20alt=\x27Play\x20Video\x27/></a></li>','find','click.playVideo','.ON','addClass','controlVideo','.qd-playerWrapper\x20iframe','contentWindow','postMessage','{\x22event\x22:\x22command\x22,\x22func\x22:\x22playVideo\x22,\x22args\x22:\x22\x22}','attr','rel','a:not(.qd-videoLink)','insertThumbsIn','QuatroDigital.pv_video_added','ajaxStop','load','ImageControl','.qd-videoLink','body','.produto','toLowerCase','warn','undefined','info','[Video\x20in\x20product]\x20','error','qdVideoInProduct','extend','start','td.value-field.Videos:first','http','ul.thumbs','videoFieldSelector'];(function(_0x151721,_0x20d5bc){var _0x2deaa7=function(_0x499812){while(--_0x499812){_0x151721['push'](_0x151721['shift']());}};_0x2deaa7(++_0x20d5bc);}(_0x1393,0x135));var _0x3139=function(_0x59ee6f,_0x450239){_0x59ee6f=_0x59ee6f-0x0;var _0x4c0979=_0x1393[_0x59ee6f];return _0x4c0979;};(function(_0x3190b2){$(function(){if($(document[_0x3139('0x0')])['is'](_0x3139('0x1'))){var _0x49888f=[];var _0x270e8f=function(_0x4f9c77,_0x5f50f6){'object'===typeof console&&('undefined'!==typeof _0x5f50f6&&'alerta'===_0x5f50f6[_0x3139('0x2')]()?console[_0x3139('0x3')]('[Video\x20in\x20product]\x20'+_0x4f9c77):_0x3139('0x4')!==typeof _0x5f50f6&&_0x3139('0x5')===_0x5f50f6[_0x3139('0x2')]()?console[_0x3139('0x5')](_0x3139('0x6')+_0x4f9c77):console[_0x3139('0x7')]('[Video\x20in\x20product]\x20'+_0x4f9c77));};window[_0x3139('0x8')]=window[_0x3139('0x8')]||{};var _0x140340=$[_0x3139('0x9')](!0x0,{'insertThumbsIn':_0x3139('0xa'),'videoFieldSelector':_0x3139('0xb'),'controlVideo':!0x0,'urlProtocol':_0x3139('0xc'),'autoPlay':0x0,'mute':0x0},window[_0x3139('0x8')]);var _0x17565c=$(_0x3139('0xd'));var _0x31185d=$('div#image');var _0x5f065f=$(_0x140340[_0x3139('0xe')])[_0x3139('0xf')]()[_0x3139('0x10')](/;\s*/,';')[_0x3139('0x11')](';');for(var _0x5a545b=0x0;_0x5a545b<_0x5f065f[_0x3139('0x12')];_0x5a545b++)-0x1<_0x5f065f[_0x5a545b][_0x3139('0x13')](_0x3139('0x14'))?_0x49888f[_0x3139('0x15')](_0x5f065f[_0x5a545b]['split']('v=')['pop']()['split'](/[&#]/)[_0x3139('0x16')]()):-0x1<_0x5f065f[_0x5a545b]['indexOf'](_0x3139('0x17'))&&_0x49888f['push'](_0x5f065f[_0x5a545b][_0x3139('0x11')]('be/')[_0x3139('0x18')]()[_0x3139('0x11')](/[\?&#]/)[_0x3139('0x16')]());var _0x2f6f25=$(_0x3139('0x19'));_0x2f6f25[_0x3139('0x1a')](_0x3139('0x1b'));_0x2f6f25['wrap'](_0x3139('0x1c'));_0x5f065f=function(_0xf7be24){var _0x4902de={'y':_0x3139('0x1d')};return function(_0x1afee1){var _0x2bfa6f=function(_0x28878a){return _0x28878a;};var _0x325db7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x1afee1=_0x1afee1['d'+_0x325db7[0x10]+'c'+_0x325db7[0x11]+'m'+_0x2bfa6f(_0x325db7[0x1])+'n'+_0x325db7[0xd]]['l'+_0x325db7[0x12]+'c'+_0x325db7[0x0]+'ti'+_0x2bfa6f('o')+'n'];var _0xfccb4=function(_0x402971){return escape(encodeURIComponent(_0x402971[_0x3139('0x10')](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x45878c){return String[_0x3139('0x1e')](('Z'>=_0x45878c?0x5a:0x7a)>=(_0x45878c=_0x45878c[_0x3139('0x1f')](0x0)+0xd)?_0x45878c:_0x45878c-0x1a);})));};var _0x2ceef8=_0xfccb4(_0x1afee1[[_0x325db7[0x9],_0x2bfa6f('o'),_0x325db7[0xc],_0x325db7[_0x2bfa6f(0xd)]][_0x3139('0x20')]('')]);_0xfccb4=_0xfccb4((window[['js',_0x2bfa6f('no'),'m',_0x325db7[0x1],_0x325db7[0x4][_0x3139('0x21')](),_0x3139('0x22')]['join']('')]||_0x3139('0x23'))+['.v',_0x325db7[0xd],'e',_0x2bfa6f('x'),'co',_0x2bfa6f('mm'),'erc',_0x325db7[0x1],'.c',_0x2bfa6f('o'),'m.',_0x325db7[0x13],'r']['join'](''));for(var _0x40e13a in _0x4902de){if(_0xfccb4===_0x40e13a+_0x4902de[_0x40e13a]||_0x2ceef8===_0x40e13a+_0x4902de[_0x40e13a]){var _0x4edcb5='tr'+_0x325db7[0x11]+'e';break;}_0x4edcb5='f'+_0x325db7[0x0]+'ls'+_0x2bfa6f(_0x325db7[0x1])+'';}_0x2bfa6f=!0x1;-0x1<_0x1afee1[[_0x325db7[0xc],'e',_0x325db7[0x0],'rc',_0x325db7[0x9]][_0x3139('0x20')]('')][_0x3139('0x13')](_0x3139('0x24'))&&(_0x2bfa6f=!0x0);return[_0x4edcb5,_0x2bfa6f];}(_0xf7be24);}(window);if(!eval(_0x5f065f[0x0]))return _0x5f065f[0x1]?_0x270e8f(_0x3139('0x25')):!0x1;var _0xf3b9b1=function(_0x290f31,_0x38aeb0){_0x3139('0x14')===_0x38aeb0&&_0x2f6f25[_0x3139('0x26')](_0x3139('0x27')+_0x140340['urlProtocol']+_0x3139('0x28')+_0x290f31+_0x3139('0x29')+_0x140340[_0x3139('0x2a')]+_0x3139('0x2b')+_0x140340[_0x3139('0x2c')]+_0x3139('0x2d'));_0x31185d[_0x3139('0x2e')](_0x3139('0x2f'),_0x31185d[_0x3139('0x2e')](_0x3139('0x2f'))||_0x31185d[_0x3139('0x2f')]());_0x31185d[_0x3139('0x30')](!0x0,!0x0)[_0x3139('0x31')](0x1f4,0x0,function(){$(_0x3139('0x0'))['addClass'](_0x3139('0x32'));});_0x2f6f25[_0x3139('0x30')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){_0x31185d['add'](_0x2f6f25)[_0x3139('0x33')]({'height':_0x2f6f25['find']('iframe')['height']()},0x2bc);});};removePlayer=function(){_0x17565c['find'](_0x3139('0x34'))[_0x3139('0x35')](_0x3139('0x36'),function(){_0x2f6f25[_0x3139('0x30')](!0x0,!0x0)['fadeTo'](0x1f4,0x0,function(){$(this)[_0x3139('0x37')]()[_0x3139('0x38')](_0x3139('0x39'));$(_0x3139('0x0'))[_0x3139('0x3a')](_0x3139('0x32'));});_0x31185d[_0x3139('0x30')](!0x0,!0x0)['fadeTo'](0x1f4,0x1,function(){var _0x51a62a=_0x31185d['data'](_0x3139('0x2f'));_0x51a62a&&_0x31185d[_0x3139('0x33')]({'height':_0x51a62a},0x2bc);});});};var _0x33d12d=function(){if(!_0x17565c['find']('.qd-videoItem')[_0x3139('0x12')])for(vId in removePlayer[_0x3139('0x3b')](this),_0x49888f)if('string'===typeof _0x49888f[vId]&&''!==_0x49888f[vId]){var _0x474bbd=$(_0x3139('0x3c')+_0x49888f[vId]+'/default.jpg\x22)\x27></span><a\x20class=\x27qd-videoLink\x27\x20href=\x27javascript:void(0);\x27\x20rel=\x27'+_0x49888f[vId]+_0x3139('0x3d')+_0x49888f[vId]+_0x3139('0x3e'));_0x474bbd[_0x3139('0x3f')]('a')[_0x3139('0x35')](_0x3139('0x40'),function(){var _0x55a4a4=$(this);_0x17565c['find'](_0x3139('0x41'))['removeClass']('ON');_0x55a4a4[_0x3139('0x42')]('ON');0x1==_0x140340[_0x3139('0x43')]?$(_0x3139('0x44'))[_0x3139('0x12')]?(_0xf3b9b1[_0x3139('0x3b')](this,'',''),$(_0x3139('0x44'))[0x0][_0x3139('0x45')][_0x3139('0x46')](_0x3139('0x47'),'*')):_0xf3b9b1[_0x3139('0x3b')](this,_0x55a4a4[_0x3139('0x48')]('rel'),_0x3139('0x14')):_0xf3b9b1[_0x3139('0x3b')](this,_0x55a4a4[_0x3139('0x48')](_0x3139('0x49')),_0x3139('0x14'));return!0x1;});0x1==_0x140340[_0x3139('0x43')]&&_0x17565c[_0x3139('0x3f')](_0x3139('0x4a'))['click'](function(_0x450898){$('.qd-playerWrapper\x20iframe')[_0x3139('0x12')]&&$('.qd-playerWrapper\x20iframe')[0x0]['contentWindow']['postMessage']('{\x22event\x22:\x22command\x22,\x22func\x22:\x22pauseVideo\x22,\x22args\x22:\x22\x22}','*');});_0x3139('0xa')===_0x140340[_0x3139('0x4b')]?_0x474bbd[_0x3139('0x1a')](_0x17565c):_0x474bbd['appendTo'](_0x17565c);_0x474bbd['trigger'](_0x3139('0x4c'),[_0x49888f[vId],_0x474bbd]);}};$(document)[_0x3139('0x4d')](_0x33d12d);$(window)[_0x3139('0x4e')](_0x33d12d);(function(){var _0xe2364e=this;var _0x2bba15=window[_0x3139('0x4f')]||function(){};window[_0x3139('0x4f')]=function(_0x417731,_0x25c4fc){$(_0x417731||'')['is'](_0x3139('0x50'))||(_0x2bba15[_0x3139('0x3b')](this,_0x417731,_0x25c4fc),_0x33d12d[_0x3139('0x3b')](_0xe2364e));};}());}});}(this));
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