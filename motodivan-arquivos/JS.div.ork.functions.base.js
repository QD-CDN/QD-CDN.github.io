/**
* Funções base
*/
String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});
/* Quatro Digital - Product Thumbs // 1.2 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs();a.trigger("QuatroDigital.pt_callback",[a])}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return a.length?$.extend({},a,new b(a)):a},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.qdOverlay();
			Common.vtexBindQuickViewDestroy();
			Common.accessoriesFix();
			Common.applyAmazingMenu();
			Common.applyAmazingMenuMobile();
			Common.applyMosaicBanners();
			Common.applySmartCart();
			Common.applyCarouselShelf();
			Common.openSearchModal();
			Common.saveAmountFix();
			Common.setDataScrollToggle();
			Common.showFooterContent();
			Common.openModalVideoInstitutional();
		},
		ajaxStop: function() {
			Common.appendSkuPopUpCloseBtn();
			Common.saveAmountFix();
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
		openModalVideoInstitutional: function() {
			var videoRegex = /(youtu\.be\/|\?v=)([^&]+)/i;

			$('.box-banner a').filter('[href*="youtube.com/"], [href*="youtu.be/"]').click(function(e) {
				e.preventDefault();
				var modal = $('.qd-v1-modal').clone().appendTo(document.body).addClass('hotsite-information-qd-v1-modal');
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
		accessoriesFix: function() {
			if (!$(document.body).is('.produto'))
				return;

			$('fieldset >.buy-product-checkbox').parent().each(function() {
				var $t  = $(this);
				$t.add($t.prev('ul')).wrapAll('<div class="accessories-qd-v1-item col-xs-12 col-sm-6 col-md-3"/>');
			});
		},
		appendSkuPopUpCloseBtn: function() {
			$('<span class="modal-qd-v1-box-popup-close">Fechar</span>').insertBefore('.boxPopUp2 .selectSkuTitle');

			$('.modal-qd-v1-box-popup-close').click(function() {
				$(window).trigger('vtex.modal.hide');
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

			wrapper.QD_amazingMenu({
				callback: function() {
					$('<span class="qd-am-dropdown-trigger"><i class="fa fa-caret-down"></i></span>').appendTo(wrapper.find('.qd-am-has-ul')).click(function() {
						var $t = $(this);
						$t.parent().toggleClass('qd-am-is-active');

						$t.siblings('ul').stop(true, true).slideToggle();
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
		applyCarouselShelf: function() {
			var wrapper = $('.carousel-qd-v1-shelf .prateleira');

			if (!wrapper.length)
				return false;

			wrapper.each(function() {
				var $t = $(this);

				$t.find('h2').prependTo($t.parent());
			});

			var slides = 4;
			if (wrapper.parent().hasClass('side-carousel-qd-v1-shelf'))
				slides = 3				

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: slides,
				slidesToScroll: slides,
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
		applyMosaicBanners: function() {
			$('.mosaic-qd-v1-wrapper .box-banner').QD_mosaicBanners({
				containerWidth: 1326,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});

			$('.mosaic-qd-v2-wrapper .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: -30,
				containerWidth: 1326,
				classFourColumn: "col-xs-12 col-sm-6 col-md-3"
			});
		},
		applySmartCart: function() {
			$('.header-qd-v1-actions-cart').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

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
		openSearchModal: function() {
			$('.header-qd-v1-actions-search').click(function() {
				$('.modal-qd-v1-search').modal();
				return false;
			});
		},
		saveAmountFix: function() {
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		setDataScrollToggle: function() {
			$(document.body).attr('data-qd-scroll-limit', '0');
		},
		showFooterContent: function() {
			$('.footer-qd-v1-mobile-collapse-trigger').click(function(e) {
				e.preventDefault();
				$(this).addClass('qd-is-hide');
				$('.footer-qd-v1-mobile-collapse').addClass('qd-is-active');
			});
		}
	};

	var Home = {
		init: function() {
			// Home.openModalVideoInstitutional();
			Home.sliderFull();
			Home.applyBrandCarousel();
			Home.selectSmartResearch2();
			Home.homeSpecialLinksToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		homeSpecialLinksToggle:function() {	
			if(!$(document.body).is('.home'))
				return

			var wrapper = $('.home-qd-v1-special-links');
			wrapper.QD_amazingMenu();

			var links = wrapper.find('.qd-am-column.qd-am-has-ul');			
			var dropdown = links.find('>ul');			

			links.find('>a, >p').click(function(e) {
				var $t = $(this).toggleClass('qd-am-open').find('+ul').stop();
				e.preventDefault();

				if($t.height() == 0) {
					$t.css('height', '100%');
				}
				else {
					$t.css('height', '0');
				}
			});
		},
		applyBrandCarousel: function () {
			var wrapper = $('.carousel-qd-v1-brand');

			wrapper.slick({
				prevArrow: '<button type="button" class="slick-prev"><i class="fa fa-angle-left" aria-hidden="true"></i></button>',
				nextArrow: '<button type="button" class="slick-next"><i class="fa fa-angle-right" aria-hidden="true"></i></button>',
				slidesToShow: 5,
				slidesToScroll: 5,
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
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		openModalVideoInstitutional: function() {
			$('.home-qd-v1-video-poster').click(function(e) {
				$('.modal-qd-v1-home-video').modal('show');
				return false;
			});
		},
		sliderFull: function() {
			$('.slider-qd-v1-full, .hotsite-qd-v1-banner-slider').slick({
				dots: true,
				fade: true,
				cssEase: 'linear',
				infinite: true,
				speed: 500,
				draggable: false
			});
		},
		selectSmartResearch2: function() {
			try {
				var depart = [2];
				var url, map = {};
				$(document.body).addClass('qd-car-select-loading');

				console.log(depart);

				$.ajax({
					url: "/busca?lid=5d3daea3-3b62-48fb-abf3-9db9e398e19c&fq=C:/" + depart[0] + "/",
					dataType: "html",
					success: function(data) {
						// Pegando os anos
						var qttRegex = /\s+\([0-9]+\)$/;
						var values = [];
						$(data).find(".search-single-navigator ul.Ano").find("a").each(function() {
							var $t = $(this);
							values.push([$t.text().trim().replace(qttRegex, ""), $t.attr("href") || ""])
						});

						$(".qd-search-filters").QD_SelectSmartResearch2({
							options: [values, "lid=5d3daea3-3b62-48fb-abf3-9db9e398e19c", "lid=5d3daea3-3b62-48fb-abf3-9db9e398e19c"],
							optionsPlaceHolder: ["Ano", "Montadora", "Modelo"],
							disabledMessage: function(index, options, optionsPlaceHolder) {
								return "Selecione o(a) " + optionsPlaceHolder[index - 1];
							},
							labelMessage: function(index, options, optionsPlaceHolder) {
								return "Selecione " + optionsPlaceHolder[index]
							},
							redirect: function(newUrl) {
								var url = new QD_VtexUrlParse(newUrl);
								if(location.search.toLowerCase().indexOf("map=") > -1)
									url.mergeUrl(location.href);
								else
									url.getMap();
								window.location.href = url.getUrl({ft: true});
							},
							optionIsChecked: function(optionPlaceHolder) {
								if (typeof optionPlaceHolder === "undefined")
									return null;

								var value = $("h5." + optionPlaceHolder + " +ul .filtro-ativo:first").text().trim().replace(qttRegex, "");
								if (value.length)
									return value;

								if(!url && location.search.toLowerCase().indexOf("map=") > -1){
									url = new QD_VtexUrlParse(location.href);
									var urlMap = url.getMap();
									map = {
										"Montadora": decodeURIComponent(urlMap.map.specificationFilter_47 || ""),
										"Modelo": decodeURIComponent(urlMap.map.specificationFilter_48 || ""),
										"Ano": decodeURIComponent(urlMap.map.specificationFilter_46 || "")
									};
								}

								value = map[optionPlaceHolder] || "";
								return value.length ? value : null;
							},
							getAjaxOptions: function(requestData, $select) {
								var values = [];
								$(requestData).find(".search-single-navigator ul." + $select.attr("data-qdssr-title")).find("a").each(function() {
									var $t = $(this);
									values.push([$t.text().trim().replace(qttRegex, ""), $t.attr("href") || ""])
								});
								return values;
							}
						});
					},
					complete: function() {
						$(document.body).removeClass('qd-car-select-loading');
					},
					clearQueueDelay: null
				});
			}
			catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message)); }
		},

	};

	var Search = {
		init: function() {
			Search.openFiltersMenu();
			Search.shelfLineFix();
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {
			Search.shelfLineFix();
		},
		openFiltersMenu: function() {
			$('.search-qd-v1-navigator-trigger').click(function(e) {
				e.preventDefault();
				$(document.body).toggleClass('qd-sn-on');
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
			// Product.forceImageZoom();
			Product.applyCarouselThumb(); $(window).on('skuSelected.vtex', Product.applyCarouselThumb);
			Product.accessoriesApplyCarousel();
			Product.openShipping();
			Product.saveAmountFlag();
			Product.scrollToDescription();
			Product.setAvailableBodyClass();
			Product.wrapProductSpecification();
			Product.splitDescription();
			Product.applyTipBarCarousel();
		},
		ajaxStop: function() {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function() {},
		accessoriesApplyCarousel: function() {
			$('.accessories-qd-v1-item').wrapAll('<div class="accessories-qd-v1-carousel"></div>');

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
		applyTipBarCarousel: function() {
			var wrapper = $('.tip-bar-qd-v1-carousel');

			if (!wrapper.length)
				return;

			wrapper.find('[class*="col-"]').each(function(){
				$(this).removeAttr('class');
				$(this).addClass('col-xs-12 col-md-6');
			});

			wrapper.slick({
				arrows: false,
				autoplay: true,
				slidesToShow: 2,
				slidesToScroll: 2,
				infinite: true,
				draggable: false,
				responsive:[
					{
						breakpoint: 991,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		},
		splitDescription: function() {
			var wrapper = $('.product-qd-v1-description-wrapper .row').first();
			var measuresEl = wrapper.find('h4.Medidas, h4.Medida');

			if(measuresEl.length > 0) // Verifica se existe Medidas
				measuresEl = measuresEl.wrap('<div class="col-xs-12"><div class="product-qd-v1-specification"><div class="h1 h2 h3 h4 h5 h6 p ul dl"></div></div></div>').after(wrapper.find('table.Medidas, table.Medida')).closest('.col-xs-12').appendTo(wrapper);

			var columns = wrapper.find('[class*=col-xs-12]:not(:first-child)');
			columns.removeClass(function(){ // Remove classe col-md-*
				var match = $(this).attr('class').match(/col-md-\d{1,2}/g);
				if(match == null)
					return '';
				return match[0];
			}).addClass(function() { // Adiciona classe col-md-* nova baseada no nº de colunas (MAX: col-md-6, MIN: col-md-3)
				return 'col-md-' + (Math.min(6, Math.max(3, Math.round(12 / columns.length))));
			});
		},
		addCloseBtnFreightTable: function() {
			var elem = $('.freight-values');

			if (!$('#calculoFrete').length) $('.product-qd-v1-shipping').hide();
			else $('.product-qd-v1-shipping').show();

			if (elem.length > 0 && elem.is(':visible'))
				$('<span class="close"/>').bind('click', function() {
					elem.fadeToggle('fast', 'linear');
				}).appendTo(elem);
		},
		applyCarouselThumb: function() {
			var thumbsSliderWrapper = $('.product-qd-v1-image-thumbs-mobile'); // Wrapper onde foi inserido as thumbs

			thumbsSliderWrapper.slick({
  				slidesToShow: 5,
  				arrows: false,
  				infinite: false,
  				dots: false,
  				responsive: [
  					{
  						breakpoint: 600,
  						settings: {
  							slidesToShow: 3
  						}
  					}
  				]
			});
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
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
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
		scrollToDescription: function() {
			$('.product-qd-v1-link-description').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.product-qd-v1-description-wrapper').offset().top -100
				}, 900, 'swing');
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
		wrapProductSpecification: function() {
			$('#caracteristicas > h4').each(function() {
				$(this).next('table').addBack().wrapAll('<div class="product-qd-v1-specification-column" />')
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
			Institutional.sendAccessForm();
			Institutional.sidemenuToggle();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sidemenuToggle:function() {
			// Amazing Menu Responsivo
			$('.institucional-qd-v1-menu-toggle-wrap').click(function(evt) {
				evt.preventDefault();
				$(document.body).addClass('qd-sn-on');
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

							$.ajax({
								url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/documents",
								type: "PATCH",
								dataType: "json",
								headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
								data: JSON.stringify({
									firstName:				inputs.filter("[name='qd_form_name']").val() || "",
									lastName:				inputs.filter("[name='qd_form_lastname']").val() || "",
									email:					inputs.filter("[name='qd_form_email']").val() || "",
									birthDate:				(inputs.filter("[name='qd_form_birthdate']").val() || '').split('/').reverse().join('-'),
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

		Search.isSearch = $(document.body).is('.resultado-busca');
		Search.isDepartament = $(document.body).is('.departamento');
		Search.isCategory = $(document.body).is('.categoria');

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
			else if (body.is(".resultado-busca, .departamento, .categoria")) Search.init();
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
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(){"function"!==typeof $.cookie&&function(c){"function"===typeof define&&define.amd?define(["jquery"],c):"object"===typeof exports?c(require("jquery")):c(jQuery)}(function(c){function p(a){a=e.json?JSON.stringify(a):String(a);return e.raw?a:encodeURIComponent(a)}function n(a,g){var b;if(e.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\"));try{d=decodeURIComponent(d.replace(l," "));b=e.json?JSON.parse(d):d;break a}catch(h){}b=void 0}return c.isFunction(g)?
g(b):b}var l=/\+/g,e=c.cookie=function(a,g,b){if(1<arguments.length&&!c.isFunction(g)){b=c.extend({},e.defaults,b);if("number"===typeof b.expires){var d=b.expires,h=b.expires=new Date;h.setTime(+h+864E5*d)}return document.cookie=[e.raw?a:encodeURIComponent(a),"=",p(g),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},h=document.cookie?document.cookie.split("; "):[],m=0,l=h.length;m<l;m++){var f=
h[m].split("="),k;k=f.shift();k=e.raw?k:decodeURIComponent(k);f=f.join("=");if(a&&a===k){d=n(f,g);break}a||void 0===(f=n(f))||(d[k]=f)}return d};e.defaults={};c.removeCookie=function(a,e){if(void 0===c.cookie(a))return!1;c.cookie(a,"",c.extend({},e,{expires:-1}));return!c.cookie(a)}})})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital Simple Cart // 4.14 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart){b(function(){var b=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return b.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var d,k,g,f,l,p,q,r,m;k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],
a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.QD_simpleCart.elements));if(!d.length)return d;b.QD_simpleCart.elements=b.QD_simpleCart.elements.add(d);h="undefined"===
typeof h?!1:h;f=b.extend({},{cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:"R$ ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}},n);g=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});m=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&(e+=a.totalizers[c].value),b+=a.totalizers[c].value;
window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=a.items.length||0;try{window._QuatroDigital_CartData.callback&&
window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(d){k("Problemas com o callback do Smart Cart")}r(g)};l=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};q=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};p=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);l(c,b.itemsTextE);q(c)};r=function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||g;d.cartTotalE=e.find(f.cartTotal)||g;d.itemsTextE=e.find(f.itemsText)||g;d.emptyElem=e.find(f.emptyCart)||g;p(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h?h:!c))return m(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){m(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.QD_simpleCart={elements:b("")};b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(l,h,d,k,g){c.call(this,l,h,d,k,function(){"function"===typeof g&&
g();b.QD_simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var l=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(c){b.fn.simpleCart(!0);"function"===typeof l?l.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){b.fn.simpleCart(!0)})})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",c)}}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Quatro Digital - Smart Buy Button // 1.18 // Carlos Vinicius // Todos os direitos reservados */
(function(u){try{var a=jQuery,c,r=a({}),l=function(a,c){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),b=a):b=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,b)}catch(h){try{console.info(b.join("\n"))}catch(k){}}else try{console.error.apply(console,
b)}catch(h){try{console.error(b.join("\n"))}catch(k){}}else try{console.warn.apply(console,b)}catch(h){try{console.warn(b.join("\n"))}catch(k){}}}},t={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(c,f,b){a("body").is(".productQuickView")&&("success"===f?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=b))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(g,f){function b(a){c.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!c.allowBuyClick())return!0;if(!0!==m.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function h(e){e=e||a(c.buyButton);e.each(function(){var d=a(this);d.is(".qd-sbb-on")||(d.addClass("qd-sbb-on"),d.is(".btn-add-buy-button-asynchronous")&&!d.is(".remove-href")||d.data("qd-bb-active")||(d.data("qd-bb-active",1),d.children(".qd-bb-productAdded").length||d.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),d.is(".buy-in-page-button")&&c.isProductPage()&&p.call(d),b(d)))});c.isProductPage()&&
!e.length&&l("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+e.selector+"'.","info")}var k,p,m;k=a(g);m=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};m.prodAdd=function(e,d){k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var b=a(c.buyButton).filter("[href='"+
(e.attr("href")||"---")+"']").add(e);b.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){k.removeClass("qd-bb-itemAddCartWrapper");b.removeClass("qd-bb-itemAddBuyButtonWrapper")},c.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof f&&"function"===typeof f.getCartInfoByUrl)return c.isSmartCheckout||(l("fun\u00e7\u00e3o descontinuada"),f.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,f.getCartInfoByUrl(function(d){window._Quatro_Digital_dropDown.getOrderForm=
d;a.fn.simpleCart(!0,void 0,!0)},{lastSku:d});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0)};(function(){if(c.isSmartCheckout&&c.autoWatchBuyButton){var e=a(".btn-add-buy-button-asynchronous");e.length&&h(e)}})();p=function(){var e=a(this);"undefined"!==typeof e.data("buyButton")?(e.unbind("click"),b(e)):(e.bind("mouseenter.qd_bb_buy_sc",function(d){e.unbind("click");b(e);a(this).unbind(d)}),a(window).load(function(){e.unbind("click");b(e);e.unbind("mouseenter.qd_bb_buy_sc")}))};
m.clickBuySmartCheckout=function(){var e=a(this),d=e.attr("href")||"";if(-1<d.indexOf(c.selectSkuMsg))return!0;d=d.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(c.execDefaultAction(e))return e.attr("href",d.replace("redirect=false","redirect=true")),!0;d=d.replace(/http.?:/i,"");r.queue(function(b){if(!c.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(d))return b();var f=function(b,f){var g=d.match(/sku\=([0-9]+)/ig),h=[],k;if("object"===typeof g&&
null!==g)for(var l=g.length-1;0<=l;l--)k=parseInt(g[l].replace(/sku\=/ig,"")),isNaN(k)||h.push(k);c.productPageCallback.call(this,b,f,d);m.buyButtonClickCallback.call(this,b,f,d,h);m.prodAdd(e,d.split("ku=").pop().split("&").shift());"function"===typeof c.asyncCallback&&c.asyncCallback.call(this);a(window).trigger("productAddedToCart");a(window).trigger("cartProductAdded.vtex")};c.fakeRequest?(f(null,"success"),b()):a.ajax({url:d,complete:f}).always(function(){b()})})};m.buyButtonClickCallback=function(a,
b,c,f){try{"success"===b&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,b,c,f)}catch(g){l("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};h();"function"===typeof c.callback?c.callback.call(this):l("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var n=a.Callbacks();a.fn.QD_buyButton=function(g,f){var b=a(this);"undefined"!==typeof f||"object"!==typeof g||g instanceof
a||(f=g,g=void 0);c=a.extend({},t,f);var h;n.add(function(){b.children(".qd-bb-itemAddWrapper").length||b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');h=new a.QD_buyButton(b,g)});n.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,b,c){h.prodAdd(b,c)});return a.extend(b,h)};var q=0;a(document).ajaxSend(function(a,c,b){-1<b.url.toLowerCase().indexOf("/checkout/cart/add")&&(q=(b.url.match(/sku\=([0-9]+)/i)||[""]).pop())});a(window).bind("productAddedToCart.qdSbbVtex",
function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,q])});a(document).ajaxStop(function(){n.fire()})}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",g)}})(this);
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);

/* Quatro Digital Amazing Menu */
var _0xee5b=['fromCharCode','charCodeAt','toUpperCase','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-collection','length','parent','qd-am-banner-wrapper','qd-am-collection-wrapper','url','img[alt=\x27','attr','getParent','.box-banner','insertBefore','hide','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','clone','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','trigger','ul[itemscope]','UL\x20do\x20menu\x20não\x20encontrada','li\x20>ul','qd-am-has-ul','children',':not(ul)','qd-am-elem-','text','>li','qd-amazing-menu','qd-am-column','qd-am-dropdown','qd-am-level-','add','qd-am-','-li','callback','QuatroDigital.am.callback','exec','.qd_amazing_menu_auto','closest','function','QD_amazingMenu','object','undefined','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','info','join','error','apply','warn','qdAmAddNdx','each','addClass','qd-am-li-','first','qd-am-first','last','qd-am-last','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace'];(function(_0x8e358b,_0x3c7af6){var _0x4673b0=function(_0x27eaae){while(--_0x27eaae){_0x8e358b['push'](_0x8e358b['shift']());}};_0x4673b0(++_0x3c7af6);}(_0xee5b,0x1f4));var _0xbee5=function(_0x2de74d,_0x212408){_0x2de74d=_0x2de74d-0x0;var _0x3aa054=_0xee5b[_0x2de74d];return _0x3aa054;};(function(_0x5384bd){_0x5384bd['fn']['getParent']=_0x5384bd['fn'][_0xbee5('0x0')];}(jQuery));(function(_0x203bba){var _0x4f850a;var _0x1893e4=jQuery;if(_0xbee5('0x1')!==typeof _0x1893e4['fn'][_0xbee5('0x2')]){var _0x210159={'url':'/qd-amazing-menu','callback':function(){},'ajaxCallback':function(){}};var _0x5200b1=function(_0x2e8127,_0x2c0bde){if(_0xbee5('0x3')===typeof console&&_0xbee5('0x4')!==typeof console['error']&&'undefined'!==typeof console['info']&&'undefined'!==typeof console['warn']){var _0x20c66c;_0xbee5('0x3')===typeof _0x2e8127?(_0x2e8127[_0xbee5('0x5')](_0xbee5('0x6')),_0x20c66c=_0x2e8127):_0x20c66c=['[QD\x20Amazing\x20Menu]\x0a'+_0x2e8127];if(_0xbee5('0x4')===typeof _0x2c0bde||_0xbee5('0x7')!==_0x2c0bde[_0xbee5('0x8')]()&&_0xbee5('0x9')!==_0x2c0bde[_0xbee5('0x8')]())if(_0xbee5('0x4')!==typeof _0x2c0bde&&_0xbee5('0xa')===_0x2c0bde[_0xbee5('0x8')]())try{console[_0xbee5('0xa')]['apply'](console,_0x20c66c);}catch(_0x14e032){try{console['info'](_0x20c66c[_0xbee5('0xb')]('\x0a'));}catch(_0x180edd){}}else try{console[_0xbee5('0xc')]['apply'](console,_0x20c66c);}catch(_0x5092f2){try{console[_0xbee5('0xc')](_0x20c66c['join']('\x0a'));}catch(_0x40afcb){}}else try{console['warn'][_0xbee5('0xd')](console,_0x20c66c);}catch(_0x141878){try{console[_0xbee5('0xe')](_0x20c66c['join']('\x0a'));}catch(_0x27e034){}}}};_0x1893e4['fn'][_0xbee5('0xf')]=function(){var _0x5a0ae5=_0x1893e4(this);_0x5a0ae5[_0xbee5('0x10')](function(_0x538460){_0x1893e4(this)[_0xbee5('0x11')](_0xbee5('0x12')+_0x538460);});_0x5a0ae5[_0xbee5('0x13')]()[_0xbee5('0x11')](_0xbee5('0x14'));_0x5a0ae5[_0xbee5('0x15')]()[_0xbee5('0x11')](_0xbee5('0x16'));return _0x5a0ae5;};_0x1893e4['fn'][_0xbee5('0x2')]=function(){};_0x203bba=function(_0x117f10){var _0x35d7d3={'z':_0xbee5('0x17')};return function(_0x450824){var _0x47af8e=function(_0x550325){return _0x550325;};var _0x469a7a=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x450824=_0x450824['d'+_0x469a7a[0x10]+'c'+_0x469a7a[0x11]+'m'+_0x47af8e(_0x469a7a[0x1])+'n'+_0x469a7a[0xd]]['l'+_0x469a7a[0x12]+'c'+_0x469a7a[0x0]+'ti'+_0x47af8e('o')+'n'];var _0x48bfb5=function(_0x205491){return escape(encodeURIComponent(_0x205491[_0xbee5('0x18')](/\./g,'¨')[_0xbee5('0x18')](/[a-zA-Z]/g,function(_0x2bfb0f){return String[_0xbee5('0x19')](('Z'>=_0x2bfb0f?0x5a:0x7a)>=(_0x2bfb0f=_0x2bfb0f[_0xbee5('0x1a')](0x0)+0xd)?_0x2bfb0f:_0x2bfb0f-0x1a);})));};var _0x359ccf=_0x48bfb5(_0x450824[[_0x469a7a[0x9],_0x47af8e('o'),_0x469a7a[0xc],_0x469a7a[_0x47af8e(0xd)]][_0xbee5('0xb')]('')]);_0x48bfb5=_0x48bfb5((window[['js',_0x47af8e('no'),'m',_0x469a7a[0x1],_0x469a7a[0x4][_0xbee5('0x1b')](),'ite']['join']('')]||'---')+['.v',_0x469a7a[0xd],'e',_0x47af8e('x'),'co',_0x47af8e('mm'),'erc',_0x469a7a[0x1],'.c',_0x47af8e('o'),'m.',_0x469a7a[0x13],'r']['join'](''));for(var _0x1af3de in _0x35d7d3){if(_0x48bfb5===_0x1af3de+_0x35d7d3[_0x1af3de]||_0x359ccf===_0x1af3de+_0x35d7d3[_0x1af3de]){var _0x18d7f4='tr'+_0x469a7a[0x11]+'e';break;}_0x18d7f4='f'+_0x469a7a[0x0]+'ls'+_0x47af8e(_0x469a7a[0x1])+'';}_0x47af8e=!0x1;-0x1<_0x450824[[_0x469a7a[0xc],'e',_0x469a7a[0x0],'rc',_0x469a7a[0x9]][_0xbee5('0xb')]('')][_0xbee5('0x1c')](_0xbee5('0x1d'))&&(_0x47af8e=!0x0);return[_0x18d7f4,_0x47af8e];}(_0x117f10);}(window);if(!eval(_0x203bba[0x0]))return _0x203bba[0x1]?_0x5200b1(_0xbee5('0x1e')):!0x1;var _0x3c8643=function(_0x4e9a79){var _0x36b50f=_0x4e9a79[_0xbee5('0x1f')](_0xbee5('0x20'));var _0x39da95=_0x36b50f[_0xbee5('0x21')]('.qd-am-banner');var _0x21b993=_0x36b50f[_0xbee5('0x21')](_0xbee5('0x22'));if(_0x39da95[_0xbee5('0x23')]||_0x21b993[_0xbee5('0x23')])_0x39da95[_0xbee5('0x24')]()[_0xbee5('0x11')](_0xbee5('0x25')),_0x21b993[_0xbee5('0x24')]()['addClass'](_0xbee5('0x26')),_0x1893e4['qdAjax']({'url':_0x4f850a[_0xbee5('0x27')],'dataType':'html','success':function(_0x2d20cd){var _0x52dad9=_0x1893e4(_0x2d20cd);_0x39da95[_0xbee5('0x10')](function(){var _0x2d20cd=_0x1893e4(this);var _0x3220bf=_0x52dad9[_0xbee5('0x1f')](_0xbee5('0x28')+_0x2d20cd[_0xbee5('0x29')]('data-qdam-value')+'\x27]');_0x3220bf[_0xbee5('0x23')]&&(_0x3220bf[_0xbee5('0x10')](function(){_0x1893e4(this)[_0xbee5('0x2a')](_0xbee5('0x2b'))['clone']()[_0xbee5('0x2c')](_0x2d20cd);}),_0x2d20cd[_0xbee5('0x2d')]());})[_0xbee5('0x11')](_0xbee5('0x2e'));_0x21b993['each'](function(){var _0x2d20cd={};var _0xe61341=_0x1893e4(this);_0x52dad9[_0xbee5('0x1f')]('h2')[_0xbee5('0x10')](function(){if(_0x1893e4(this)['text']()[_0xbee5('0x2f')]()['toLowerCase']()==_0xe61341[_0xbee5('0x29')]('data-qdam-value')['trim']()['toLowerCase']())return _0x2d20cd=_0x1893e4(this),!0x1;});_0x2d20cd[_0xbee5('0x23')]&&(_0x2d20cd[_0xbee5('0x10')](function(){_0x1893e4(this)[_0xbee5('0x2a')](_0xbee5('0x30'))[_0xbee5('0x31')]()[_0xbee5('0x2c')](_0xe61341);}),_0xe61341[_0xbee5('0x2d')]());})[_0xbee5('0x11')]('qd-am-content-loaded');},'error':function(){_0x5200b1(_0xbee5('0x32')+_0x4f850a['url']+_0xbee5('0x33'));},'complete':function(){_0x4f850a[_0xbee5('0x34')][_0xbee5('0x35')](this);_0x1893e4(window)[_0xbee5('0x36')]('QuatroDigital.am.ajaxCallback',_0x4e9a79);},'clearQueueDelay':0xbb8});};_0x1893e4[_0xbee5('0x2')]=function(_0x4eb1f8){var _0x565e9f=_0x4eb1f8[_0xbee5('0x1f')](_0xbee5('0x37'))[_0xbee5('0x10')](function(){var _0x1974f2=_0x1893e4(this);if(!_0x1974f2['length'])return _0x5200b1([_0xbee5('0x38'),_0x4eb1f8],_0xbee5('0x7'));_0x1974f2[_0xbee5('0x1f')](_0xbee5('0x39'))[_0xbee5('0x24')]()[_0xbee5('0x11')](_0xbee5('0x3a'));_0x1974f2[_0xbee5('0x1f')]('li')[_0xbee5('0x10')](function(){var _0x381954=_0x1893e4(this);var _0x5f3f8a=_0x381954[_0xbee5('0x3b')](_0xbee5('0x3c'));_0x5f3f8a['length']&&_0x381954[_0xbee5('0x11')](_0xbee5('0x3d')+_0x5f3f8a[_0xbee5('0x13')]()[_0xbee5('0x3e')]()['trim']()['replaceSpecialChars']()['replace'](/\./g,'')[_0xbee5('0x18')](/\s/g,'-')[_0xbee5('0x8')]());});var _0xa087f7=_0x1974f2[_0xbee5('0x1f')](_0xbee5('0x3f'))[_0xbee5('0xf')]();_0x1974f2[_0xbee5('0x11')](_0xbee5('0x40'));_0xa087f7=_0xa087f7[_0xbee5('0x1f')]('>ul');_0xa087f7['each'](function(){var _0x38e9f5=_0x1893e4(this);_0x38e9f5['find'](_0xbee5('0x3f'))[_0xbee5('0xf')]()['addClass'](_0xbee5('0x41'));_0x38e9f5[_0xbee5('0x11')]('qd-am-dropdown-menu');_0x38e9f5['parent']()[_0xbee5('0x11')](_0xbee5('0x42'));});_0xa087f7['addClass'](_0xbee5('0x42'));var _0x2974f6=0x0,_0x203bba=function(_0x42b164){_0x2974f6+=0x1;_0x42b164=_0x42b164[_0xbee5('0x3b')]('li')[_0xbee5('0x3b')]('*');_0x42b164[_0xbee5('0x23')]&&(_0x42b164[_0xbee5('0x11')](_0xbee5('0x43')+_0x2974f6),_0x203bba(_0x42b164));};_0x203bba(_0x1974f2);_0x1974f2[_0xbee5('0x44')](_0x1974f2['find']('ul'))[_0xbee5('0x10')](function(){var _0x34f01d=_0x1893e4(this);_0x34f01d[_0xbee5('0x11')](_0xbee5('0x45')+_0x34f01d['children']('li')[_0xbee5('0x23')]+_0xbee5('0x46'));});});_0x3c8643(_0x565e9f);_0x4f850a[_0xbee5('0x47')]['call'](this);_0x1893e4(window)[_0xbee5('0x36')](_0xbee5('0x48'),_0x4eb1f8);};_0x1893e4['fn']['QD_amazingMenu']=function(_0x5a6cc2){var _0x54a570=_0x1893e4(this);if(!_0x54a570[_0xbee5('0x23')])return _0x54a570;_0x4f850a=_0x1893e4['extend']({},_0x210159,_0x5a6cc2);_0x54a570[_0xbee5('0x49')]=new _0x1893e4[(_0xbee5('0x2'))](_0x1893e4(this));return _0x54a570;};_0x1893e4(function(){_0x1893e4(_0xbee5('0x4a'))[_0xbee5('0x2')]();});}}(this));

/*  Automatizador de comments box do Facebook Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital Smart Cart */
var _0x24ca=['updateOnlyHover','mouseenter.qd_ddc_hover','mouseleave.qd_ddc_hover','texts','cartTotal','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','smartCheckout','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','meta[name=currency]','.qd-ddc-remove','insertProdImg','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','address','cartIsEmpty','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAdded','qd-ddc-lastAddedFixed','timeRemoveNewItemClass','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-empty','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','qd-loaded','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','actionButtons','data-sku','changeQantity','data-sku-index','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','preventDefault','qd-loading','.qd-ddc-quantity','click.qd_ddc_minus','keyup.qd_ddc_change','.qd-ddc-prodRow','click.qd_ddc_remove','removeProduct','slideUp','remove','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','.qd-bap-qtt','.qdDdcContainer','QD_smartCart','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','closest','replace','abs','undefined','round','toFixed','length','join','function','prototype','trim','capitalize','charAt','toUpperCase','slice','toLowerCase','qdAjaxQueue','000','error','qdAjax','extend','object','data','url','type','jqXHR','done','fail','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','getParent','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','Shipping','value','total','currencySymbol','shipping','allTotal','showQuantityByItems','items','qtt','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','show','.plural','addClass','qd-emptyCart','$this','cartTotalE','cartQttE','html','itemsTextE','find','itemsText','emptyElem','emptyCart','qd-sc-populated','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','.productQuickView','success','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','body','#produto,\x20.produto','QD_buyButton','qd-bb-click-active','click.qd_bb_buy_sc','clickBuySmartCheckout','buyButton','.qd-sbb-on','qd-sbb-on','qd-bb-active','.qd-bb-productAdded','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','[href=\x27','qd-bb-itemAddBuyButtonWrapper','removeClass','qd-bb-itemAddCartWrapper','isSmartCheckout','função\x20descontinuada','getCartInfoByUrl','allowUpdate','autoWatchBuyButton','.btn-add-buy-button-asynchronous','unbind','click','mouseenter.qd_bb_buy_sc','load','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','match','push','productPageCallback','buyButtonClickCallback','split','pop','shift','asyncCallback','trigger','productAddedToCart','cartProductAdded.vtex','fakeRequest','ajax','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','ajaxSend','/checkout/cart/add','productAddedToCart.qdSbbVtex','QuatroDigital.qd_bb_prod_add','ajaxStop','pow','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','skuName','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','qd-bb-lightBoxBodyProdAdd','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','scrollCart','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','shippingCalculate'];(function(_0x71b765,_0x3053f8){var _0x34cb24=function(_0x2dd237){while(--_0x2dd237){_0x71b765['push'](_0x71b765['shift']());}};_0x34cb24(++_0x3053f8);}(_0x24ca,0x1bc));var _0xa24c=function(_0x29e35f,_0x4859ef){_0x29e35f=_0x29e35f-0x0;var _0x266b74=_0x24ca[_0x29e35f];return _0x266b74;};(function(_0x26ecd3){_0x26ecd3['fn']['getParent']=_0x26ecd3['fn'][_0xa24c('0x0')];}(jQuery));function qd_number_format(_0x4ebab4,_0x4defb1,_0x5876d6,_0x18497e){_0x4ebab4=(_0x4ebab4+'')[_0xa24c('0x1')](/[^0-9+\-Ee.]/g,'');_0x4ebab4=isFinite(+_0x4ebab4)?+_0x4ebab4:0x0;_0x4defb1=isFinite(+_0x4defb1)?Math[_0xa24c('0x2')](_0x4defb1):0x0;_0x18497e=_0xa24c('0x3')===typeof _0x18497e?',':_0x18497e;_0x5876d6=_0xa24c('0x3')===typeof _0x5876d6?'.':_0x5876d6;var _0x3c0aaa='',_0x3c0aaa=function(_0x2dd348,_0x257264){var _0x4defb1=Math['pow'](0xa,_0x257264);return''+(Math[_0xa24c('0x4')](_0x2dd348*_0x4defb1)/_0x4defb1)[_0xa24c('0x5')](_0x257264);},_0x3c0aaa=(_0x4defb1?_0x3c0aaa(_0x4ebab4,_0x4defb1):''+Math[_0xa24c('0x4')](_0x4ebab4))['split']('.');0x3<_0x3c0aaa[0x0][_0xa24c('0x6')]&&(_0x3c0aaa[0x0]=_0x3c0aaa[0x0][_0xa24c('0x1')](/\B(?=(?:\d{3})+(?!\d))/g,_0x18497e));(_0x3c0aaa[0x1]||'')[_0xa24c('0x6')]<_0x4defb1&&(_0x3c0aaa[0x1]=_0x3c0aaa[0x1]||'',_0x3c0aaa[0x1]+=Array(_0x4defb1-_0x3c0aaa[0x1][_0xa24c('0x6')]+0x1)[_0xa24c('0x7')]('0'));return _0x3c0aaa[_0xa24c('0x7')](_0x5876d6);};_0xa24c('0x8')!==typeof String[_0xa24c('0x9')][_0xa24c('0xa')]&&(String['prototype'][_0xa24c('0xa')]=function(){return this[_0xa24c('0x1')](/^\s+|\s+$/g,'');});_0xa24c('0x8')!=typeof String[_0xa24c('0x9')]['capitalize']&&(String[_0xa24c('0x9')][_0xa24c('0xb')]=function(){return this[_0xa24c('0xc')](0x0)[_0xa24c('0xd')]()+this[_0xa24c('0xe')](0x1)[_0xa24c('0xf')]();});(function(_0x448275){if('function'!==typeof _0x448275['qdAjax']){var _0xb80781={};_0x448275[_0xa24c('0x10')]=_0xb80781;0x96>parseInt((_0x448275['fn']['jquery']['replace'](/[^0-9]+/g,'')+_0xa24c('0x11'))[_0xa24c('0xe')](0x0,0x3),0xa)&&console&&'function'==typeof console[_0xa24c('0x12')]&&console['error']();_0x448275[_0xa24c('0x13')]=function(_0x2a610a){try{var _0x1fcd4b=_0x448275[_0xa24c('0x14')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x2a610a);var _0x16d363=_0xa24c('0x15')===typeof _0x1fcd4b[_0xa24c('0x16')]?JSON['stringify'](_0x1fcd4b['data']):_0x1fcd4b['data']['toString']();var _0x2173f6=encodeURIComponent(_0x1fcd4b[_0xa24c('0x17')]+'|'+_0x1fcd4b[_0xa24c('0x18')]+'|'+_0x16d363);_0xb80781[_0x2173f6]=_0xb80781[_0x2173f6]||{};_0xa24c('0x3')==typeof _0xb80781[_0x2173f6]['jqXHR']?_0xb80781[_0x2173f6][_0xa24c('0x19')]=_0x448275['ajax'](_0x1fcd4b):(_0xb80781[_0x2173f6][_0xa24c('0x19')][_0xa24c('0x1a')](_0x1fcd4b['success']),_0xb80781[_0x2173f6][_0xa24c('0x19')][_0xa24c('0x1b')](_0x1fcd4b[_0xa24c('0x12')]),_0xb80781[_0x2173f6][_0xa24c('0x19')][_0xa24c('0x1c')](_0x1fcd4b['complete']));_0xb80781[_0x2173f6][_0xa24c('0x19')]['always'](function(){isNaN(parseInt(_0x1fcd4b[_0xa24c('0x1d')]))||setTimeout(function(){_0xb80781[_0x2173f6][_0xa24c('0x19')]=void 0x0;},_0x1fcd4b[_0xa24c('0x1d')]);});return _0xb80781[_0x2173f6]['jqXHR'];}catch(_0x1beb55){_0xa24c('0x3')!==typeof console&&_0xa24c('0x8')===typeof console[_0xa24c('0x12')]&&console[_0xa24c('0x12')](_0xa24c('0x1e')+_0x1beb55[_0xa24c('0x1f')]);}};_0x448275['qdAjax'][_0xa24c('0x20')]=_0xa24c('0x21');}}(jQuery));(function(_0x152120){_0x152120['fn'][_0xa24c('0x22')]=_0x152120['fn']['closest'];}(jQuery));(function(){var _0x21d2a8=jQuery;if(_0xa24c('0x8')!==typeof _0x21d2a8['fn'][_0xa24c('0x23')]){_0x21d2a8(function(){var _0x59dbeb=vtexjs[_0xa24c('0x24')][_0xa24c('0x25')];vtexjs[_0xa24c('0x24')]['getOrderForm']=function(){return _0x59dbeb[_0xa24c('0x26')]();};});try{window['QuatroDigital_simpleCart']=window[_0xa24c('0x27')]||{};window[_0xa24c('0x27')][_0xa24c('0x28')]=!0x1;_0x21d2a8['fn']['simpleCart']=function(_0x1f52f8,_0x53f90,_0x1d0379){var _0x52572f=function(_0x1c1ed3,_0x57c340){if(_0xa24c('0x15')===typeof console){var _0x42ba21='object'===typeof _0x1c1ed3;'undefined'!==typeof _0x57c340&&_0xa24c('0x29')===_0x57c340[_0xa24c('0xf')]()?_0x42ba21?console[_0xa24c('0x2a')](_0xa24c('0x2b'),_0x1c1ed3[0x0],_0x1c1ed3[0x1],_0x1c1ed3[0x2],_0x1c1ed3[0x3],_0x1c1ed3[0x4],_0x1c1ed3[0x5],_0x1c1ed3[0x6],_0x1c1ed3[0x7]):console[_0xa24c('0x2a')](_0xa24c('0x2b')+_0x1c1ed3):_0xa24c('0x3')!==typeof _0x57c340&&'info'===_0x57c340[_0xa24c('0xf')]()?_0x42ba21?console[_0xa24c('0x2c')](_0xa24c('0x2b'),_0x1c1ed3[0x0],_0x1c1ed3[0x1],_0x1c1ed3[0x2],_0x1c1ed3[0x3],_0x1c1ed3[0x4],_0x1c1ed3[0x5],_0x1c1ed3[0x6],_0x1c1ed3[0x7]):console[_0xa24c('0x2c')](_0xa24c('0x2b')+_0x1c1ed3):_0x42ba21?console[_0xa24c('0x12')](_0xa24c('0x2b'),_0x1c1ed3[0x0],_0x1c1ed3[0x1],_0x1c1ed3[0x2],_0x1c1ed3[0x3],_0x1c1ed3[0x4],_0x1c1ed3[0x5],_0x1c1ed3[0x6],_0x1c1ed3[0x7]):console[_0xa24c('0x12')](_0xa24c('0x2b')+_0x1c1ed3);}};var _0x129bb9=_0x21d2a8(this);'object'===typeof _0x1f52f8?_0x53f90=_0x1f52f8:(_0x1f52f8=_0x1f52f8||!0x1,_0x129bb9=_0x129bb9[_0xa24c('0x2d')](_0x21d2a8[_0xa24c('0x2e')][_0xa24c('0x2f')]));if(!_0x129bb9[_0xa24c('0x6')])return _0x129bb9;_0x21d2a8['QD_simpleCart']['elements']=_0x21d2a8[_0xa24c('0x2e')]['elements'][_0xa24c('0x2d')](_0x129bb9);_0x1d0379=_0xa24c('0x3')===typeof _0x1d0379?!0x1:_0x1d0379;var _0x22a316={'cartQtt':_0xa24c('0x30'),'cartTotal':_0xa24c('0x31'),'itemsText':'.qd_items_text','currencySymbol':(_0x21d2a8('meta[name=currency]')[_0xa24c('0x32')](_0xa24c('0x33'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x3603db=_0x21d2a8[_0xa24c('0x14')]({},_0x22a316,_0x53f90);var _0x722488=_0x21d2a8('');_0x129bb9[_0xa24c('0x34')](function(){var _0x5080d0=_0x21d2a8(this);_0x5080d0['data'](_0xa24c('0x35'))||_0x5080d0[_0xa24c('0x16')](_0xa24c('0x35'),_0x3603db);});var _0x2101f8=function(_0x43beff){window['_QuatroDigital_CartData']=window[_0xa24c('0x36')]||{};for(var _0x1f52f8=0x0,_0x5ef186=0x0,_0x599627=0x0;_0x599627<_0x43beff[_0xa24c('0x37')][_0xa24c('0x6')];_0x599627++)_0xa24c('0x38')==_0x43beff['totalizers'][_0x599627]['id']&&(_0x5ef186+=_0x43beff['totalizers'][_0x599627][_0xa24c('0x39')]),_0x1f52f8+=_0x43beff[_0xa24c('0x37')][_0x599627][_0xa24c('0x39')];window[_0xa24c('0x36')][_0xa24c('0x3a')]=_0x3603db[_0xa24c('0x3b')]+qd_number_format(_0x1f52f8/0x64,0x2,',','.');window[_0xa24c('0x36')][_0xa24c('0x3c')]=_0x3603db['currencySymbol']+qd_number_format(_0x5ef186/0x64,0x2,',','.');window['_QuatroDigital_CartData'][_0xa24c('0x3d')]=_0x3603db[_0xa24c('0x3b')]+qd_number_format((_0x1f52f8+_0x5ef186)/0x64,0x2,',','.');window[_0xa24c('0x36')]['qtt']=0x0;if(_0x3603db[_0xa24c('0x3e')])for(_0x599627=0x0;_0x599627<_0x43beff[_0xa24c('0x3f')][_0xa24c('0x6')];_0x599627++)window[_0xa24c('0x36')][_0xa24c('0x40')]+=_0x43beff[_0xa24c('0x3f')][_0x599627][_0xa24c('0x41')];else window[_0xa24c('0x36')][_0xa24c('0x40')]=_0x43beff[_0xa24c('0x3f')]['length']||0x0;try{window[_0xa24c('0x36')][_0xa24c('0x42')]&&window[_0xa24c('0x36')]['callback'][_0xa24c('0x43')]&&window[_0xa24c('0x36')][_0xa24c('0x42')][_0xa24c('0x43')]();}catch(_0x3918a6){_0x52572f(_0xa24c('0x44'));}_0x1fa739(_0x722488);};var _0x1a20bd=function(_0x46f725,_0x2ac54d){0x1===_0x46f725?_0x2ac54d[_0xa24c('0x45')]()[_0xa24c('0x46')]('.singular')[_0xa24c('0x47')]():_0x2ac54d[_0xa24c('0x45')]()[_0xa24c('0x46')](_0xa24c('0x48'))[_0xa24c('0x47')]();};var _0x1112a0=function(_0x269779){0x1>_0x269779?_0x129bb9[_0xa24c('0x49')](_0xa24c('0x4a')):_0x129bb9['removeClass']('qd-emptyCart');};var _0x1e73f8=function(_0x5c14df,_0xc078ef){var _0x1f436c=parseInt(window['_QuatroDigital_CartData'][_0xa24c('0x40')],0xa);_0xc078ef[_0xa24c('0x4b')][_0xa24c('0x47')]();isNaN(_0x1f436c)&&(_0x52572f('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta'),_0x1f436c=0x0);_0xc078ef[_0xa24c('0x4c')]['html'](window[_0xa24c('0x36')][_0xa24c('0x3a')]);_0xc078ef[_0xa24c('0x4d')][_0xa24c('0x4e')](_0x1f436c);_0x1a20bd(_0x1f436c,_0xc078ef[_0xa24c('0x4f')]);_0x1112a0(_0x1f436c);};var _0x1fa739=function(_0x3f3ce6){_0x129bb9[_0xa24c('0x34')](function(){var _0x22a0db={};var _0xf3498c=_0x21d2a8(this);_0x1f52f8&&_0xf3498c['data'](_0xa24c('0x35'))&&_0x21d2a8[_0xa24c('0x14')](_0x3603db,_0xf3498c[_0xa24c('0x16')]('qd_simpleCartOpts'));_0x22a0db['$this']=_0xf3498c;_0x22a0db['cartQttE']=_0xf3498c[_0xa24c('0x50')](_0x3603db['cartQtt'])||_0x722488;_0x22a0db[_0xa24c('0x4c')]=_0xf3498c[_0xa24c('0x50')](_0x3603db['cartTotal'])||_0x722488;_0x22a0db[_0xa24c('0x4f')]=_0xf3498c[_0xa24c('0x50')](_0x3603db[_0xa24c('0x51')])||_0x722488;_0x22a0db[_0xa24c('0x52')]=_0xf3498c[_0xa24c('0x50')](_0x3603db[_0xa24c('0x53')])||_0x722488;_0x1e73f8(_0x3f3ce6,_0x22a0db);_0xf3498c[_0xa24c('0x49')](_0xa24c('0x54'));});};(function(){if(_0x3603db['smartCheckout']){window[_0xa24c('0x55')]=window['_QuatroDigital_DropDown']||{};if('undefined'!==typeof window['_QuatroDigital_DropDown']['getOrderForm']&&(_0x1d0379||!_0x1f52f8))return _0x2101f8(window['_QuatroDigital_DropDown'][_0xa24c('0x25')]);if('object'!==typeof window[_0xa24c('0x56')]||_0xa24c('0x3')===typeof window[_0xa24c('0x56')][_0xa24c('0x24')])if(_0xa24c('0x15')===typeof vtex&&_0xa24c('0x15')===typeof vtex[_0xa24c('0x24')]&&_0xa24c('0x3')!==typeof vtex[_0xa24c('0x24')][_0xa24c('0x57')])new vtex[(_0xa24c('0x24'))][(_0xa24c('0x57'))]();else return _0x52572f(_0xa24c('0x58'));_0x21d2a8[_0xa24c('0x59')]([_0xa24c('0x3f'),'totalizers',_0xa24c('0x5a')],{'done':function(_0x168601){_0x2101f8(_0x168601);window['_QuatroDigital_DropDown'][_0xa24c('0x25')]=_0x168601;},'fail':function(_0x179ae1){_0x52572f([_0xa24c('0x5b'),_0x179ae1]);}});}else alert(_0xa24c('0x5c'));}());_0x3603db['callback']();_0x21d2a8(window)['trigger'](_0xa24c('0x5d'));return _0x129bb9;};_0x21d2a8['QD_simpleCart']={'elements':_0x21d2a8('')};_0x21d2a8(function(){var _0x486040;_0xa24c('0x8')===typeof window[_0xa24c('0x5e')]&&(_0x486040=window[_0xa24c('0x5e')],window[_0xa24c('0x5e')]=function(_0x56c84b,_0x48a7b2,_0x29b836,_0x512b6f,_0x52a895){_0x486040[_0xa24c('0x26')](this,_0x56c84b,_0x48a7b2,_0x29b836,_0x512b6f,function(){_0xa24c('0x8')===typeof _0x52a895&&_0x52a895();_0x21d2a8[_0xa24c('0x2e')]['elements'][_0xa24c('0x34')](function(){var _0x128e5b=_0x21d2a8(this);_0x128e5b['simpleCart'](_0x128e5b[_0xa24c('0x16')](_0xa24c('0x35')));});});});});var _0x3096bf=window['ReloadItemsCart']||void 0x0;window[_0xa24c('0x5f')]=function(_0x34e261){_0x21d2a8['fn'][_0xa24c('0x23')](!0x0);_0xa24c('0x8')===typeof _0x3096bf?_0x3096bf[_0xa24c('0x26')](this,_0x34e261):alert(_0x34e261);};_0x21d2a8(function(){var _0x4e89e4=_0x21d2a8(_0xa24c('0x60'));_0x4e89e4[_0xa24c('0x6')]&&_0x4e89e4[_0xa24c('0x23')]();});_0x21d2a8(function(){_0x21d2a8(window)[_0xa24c('0x61')](_0xa24c('0x62'),function(){_0x21d2a8['fn'][_0xa24c('0x23')](!0x0);});});}catch(_0x239c87){'undefined'!==typeof console&&_0xa24c('0x8')===typeof console[_0xa24c('0x12')]&&console['error'](_0xa24c('0x63'),_0x239c87);}}}());(function(){var _0x3e455b=function(_0x3c277a,_0xa32e53){if(_0xa24c('0x15')===typeof console){var _0x32ddc3='object'===typeof _0x3c277a;_0xa24c('0x3')!==typeof _0xa32e53&&_0xa24c('0x29')===_0xa32e53[_0xa24c('0xf')]()?_0x32ddc3?console['warn'](_0xa24c('0x64'),_0x3c277a[0x0],_0x3c277a[0x1],_0x3c277a[0x2],_0x3c277a[0x3],_0x3c277a[0x4],_0x3c277a[0x5],_0x3c277a[0x6],_0x3c277a[0x7]):console[_0xa24c('0x2a')](_0xa24c('0x64')+_0x3c277a):'undefined'!==typeof _0xa32e53&&_0xa24c('0x2c')===_0xa32e53[_0xa24c('0xf')]()?_0x32ddc3?console[_0xa24c('0x2c')](_0xa24c('0x64'),_0x3c277a[0x0],_0x3c277a[0x1],_0x3c277a[0x2],_0x3c277a[0x3],_0x3c277a[0x4],_0x3c277a[0x5],_0x3c277a[0x6],_0x3c277a[0x7]):console[_0xa24c('0x2c')](_0xa24c('0x64')+_0x3c277a):_0x32ddc3?console['error']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x3c277a[0x0],_0x3c277a[0x1],_0x3c277a[0x2],_0x3c277a[0x3],_0x3c277a[0x4],_0x3c277a[0x5],_0x3c277a[0x6],_0x3c277a[0x7]):console[_0xa24c('0x12')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x3c277a);}},_0x14da5e=null,_0xb460b4={},_0x256d86={},_0x3a241a={};$[_0xa24c('0x59')]=function(_0x1879ae,_0x26427c){if(null===_0x14da5e)if(_0xa24c('0x15')===typeof window[_0xa24c('0x56')]&&'undefined'!==typeof window[_0xa24c('0x56')][_0xa24c('0x24')])_0x14da5e=window[_0xa24c('0x56')][_0xa24c('0x24')];else return _0x3e455b(_0xa24c('0x65'));var _0x389c08=$[_0xa24c('0x14')]({'done':function(){},'fail':function(){}},_0x26427c),_0x54cb90=_0x1879ae[_0xa24c('0x7')](';'),_0x34d8c8=function(){_0xb460b4[_0x54cb90][_0xa24c('0x2d')](_0x389c08['done']);_0x256d86[_0x54cb90][_0xa24c('0x2d')](_0x389c08['fail']);};_0x3a241a[_0x54cb90]?_0x34d8c8():(_0xb460b4[_0x54cb90]=$[_0xa24c('0x66')](),_0x256d86[_0x54cb90]=$[_0xa24c('0x66')](),_0x34d8c8(),_0x3a241a[_0x54cb90]=!0x0,_0x14da5e[_0xa24c('0x25')](_0x1879ae)[_0xa24c('0x1a')](function(_0x5726e1){_0x3a241a[_0x54cb90]=!0x1;_0xb460b4[_0x54cb90][_0xa24c('0x43')](_0x5726e1);})[_0xa24c('0x1b')](function(_0x552b79){_0x3a241a[_0x54cb90]=!0x1;_0x256d86[_0x54cb90][_0xa24c('0x43')](_0x552b79);}));};}());(function(_0x168a8b){try{var _0x135cef=jQuery,_0x3e0c08,_0x8bd3fb=_0x135cef({}),_0x288cb7=function(_0x37089c,_0x49c5bb){if(_0xa24c('0x15')===typeof console&&_0xa24c('0x3')!==typeof console[_0xa24c('0x12')]&&_0xa24c('0x3')!==typeof console[_0xa24c('0x2c')]&&_0xa24c('0x3')!==typeof console[_0xa24c('0x2a')]){var _0x13dbef;_0xa24c('0x15')===typeof _0x37089c?(_0x37089c[_0xa24c('0x67')](_0xa24c('0x68')),_0x13dbef=_0x37089c):_0x13dbef=['[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'+_0x37089c];if(_0xa24c('0x3')===typeof _0x49c5bb||_0xa24c('0x29')!==_0x49c5bb['toLowerCase']()&&_0xa24c('0x69')!==_0x49c5bb[_0xa24c('0xf')]())if(_0xa24c('0x3')!==typeof _0x49c5bb&&'info'===_0x49c5bb['toLowerCase']())try{console[_0xa24c('0x2c')][_0xa24c('0x6a')](console,_0x13dbef);}catch(_0x53928f){try{console[_0xa24c('0x2c')](_0x13dbef[_0xa24c('0x7')]('\x0a'));}catch(_0x106178){}}else try{console[_0xa24c('0x12')][_0xa24c('0x6a')](console,_0x13dbef);}catch(_0x336898){try{console['error'](_0x13dbef['join']('\x0a'));}catch(_0x4ef0bc){}}else try{console[_0xa24c('0x2a')]['apply'](console,_0x13dbef);}catch(_0x53462e){try{console[_0xa24c('0x2a')](_0x13dbef[_0xa24c('0x7')]('\x0a'));}catch(_0x32d14a){}}}},_0x271647={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xa24c('0x6b'),'buyQtt':_0xa24c('0x6c'),'selectSkuMsg':_0xa24c('0x6d'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x16f93a,_0x170b65,_0x2544fc){_0x135cef('body')['is'](_0xa24c('0x6e'))&&(_0xa24c('0x6f')===_0x170b65?alert(_0xa24c('0x70')):(alert(_0xa24c('0x71')),(_0xa24c('0x15')===typeof parent?parent:document)[_0xa24c('0x72')][_0xa24c('0x73')]=_0x2544fc));},'isProductPage':function(){return _0x135cef(_0xa24c('0x74'))['is'](_0xa24c('0x75'));},'execDefaultAction':function(_0x3c5495){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x135cef[_0xa24c('0x76')]=function(_0x1154e3,_0x4ecbe9){function _0x1fe0f3(_0xf00f4b){_0x3e0c08['isSmartCheckout']?_0xf00f4b[_0xa24c('0x16')](_0xa24c('0x77'))||(_0xf00f4b[_0xa24c('0x16')]('qd-bb-click-active',0x1),_0xf00f4b['on'](_0xa24c('0x78'),function(_0x4420c3){if(!_0x3e0c08['allowBuyClick']())return!0x0;if(!0x0!==_0x1085b1[_0xa24c('0x79')][_0xa24c('0x26')](this))return _0x4420c3['preventDefault'](),!0x1;})):alert('Método\x20descontinuado!');}function _0x124d52(_0x3eddb6){_0x3eddb6=_0x3eddb6||_0x135cef(_0x3e0c08[_0xa24c('0x7a')]);_0x3eddb6[_0xa24c('0x34')](function(){var _0x3eddb6=_0x135cef(this);_0x3eddb6['is'](_0xa24c('0x7b'))||(_0x3eddb6[_0xa24c('0x49')](_0xa24c('0x7c')),_0x3eddb6['is']('.btn-add-buy-button-asynchronous')&&!_0x3eddb6['is']('.remove-href')||_0x3eddb6[_0xa24c('0x16')](_0xa24c('0x7d'))||(_0x3eddb6[_0xa24c('0x16')]('qd-bb-active',0x1),_0x3eddb6['children'](_0xa24c('0x7e'))['length']||_0x3eddb6['append']('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x3eddb6['is'](_0xa24c('0x7f'))&&_0x3e0c08[_0xa24c('0x80')]()&&_0x5f3ca1[_0xa24c('0x26')](_0x3eddb6),_0x1fe0f3(_0x3eddb6)));});_0x3e0c08[_0xa24c('0x80')]()&&!_0x3eddb6[_0xa24c('0x6')]&&_0x288cb7(_0xa24c('0x81')+_0x3eddb6[_0xa24c('0x82')]+'\x27.',_0xa24c('0x2c'));}var _0x97cb23=_0x135cef(_0x1154e3);var _0x1085b1=this;window[_0xa24c('0x83')]=window[_0xa24c('0x83')]||{};window['_QuatroDigital_CartData']=window[_0xa24c('0x36')]||{};_0x1085b1[_0xa24c('0x84')]=function(_0x4f71e5,_0x2fd4a2){_0x97cb23['addClass']('qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd');_0x135cef('body')[_0xa24c('0x49')]('qd-bb-lightBoxBodyProdAdd');var _0x5c71bd=_0x135cef(_0x3e0c08['buyButton'])[_0xa24c('0x46')](_0xa24c('0x85')+(_0x4f71e5['attr'](_0xa24c('0x73'))||'---')+'\x27]')[_0xa24c('0x2d')](_0x4f71e5);_0x5c71bd[_0xa24c('0x49')](_0xa24c('0x86'));setTimeout(function(){_0x97cb23[_0xa24c('0x87')](_0xa24c('0x88'));_0x5c71bd['removeClass'](_0xa24c('0x86'));},_0x3e0c08['timeRemoveNewItemClass']);window[_0xa24c('0x83')][_0xa24c('0x25')]=void 0x0;if(_0xa24c('0x3')!==typeof _0x4ecbe9&&_0xa24c('0x8')===typeof _0x4ecbe9['getCartInfoByUrl'])return _0x3e0c08[_0xa24c('0x89')]||(_0x288cb7(_0xa24c('0x8a')),_0x4ecbe9[_0xa24c('0x8b')]()),window[_0xa24c('0x55')]['getOrderForm']=void 0x0,_0x4ecbe9[_0xa24c('0x8b')](function(_0x29e1ac){window[_0xa24c('0x83')][_0xa24c('0x25')]=_0x29e1ac;_0x135cef['fn'][_0xa24c('0x23')](!0x0,void 0x0,!0x0);},{'lastSku':_0x2fd4a2});window[_0xa24c('0x83')][_0xa24c('0x8c')]=!0x0;_0x135cef['fn'][_0xa24c('0x23')](!0x0);};(function(){if(_0x3e0c08[_0xa24c('0x89')]&&_0x3e0c08[_0xa24c('0x8d')]){var _0x627114=_0x135cef(_0xa24c('0x8e'));_0x627114[_0xa24c('0x6')]&&_0x124d52(_0x627114);}}());var _0x5f3ca1=function(){var _0x3dbd9e=_0x135cef(this);_0xa24c('0x3')!==typeof _0x3dbd9e[_0xa24c('0x16')](_0xa24c('0x7a'))?(_0x3dbd9e[_0xa24c('0x8f')](_0xa24c('0x90')),_0x1fe0f3(_0x3dbd9e)):(_0x3dbd9e[_0xa24c('0x61')](_0xa24c('0x91'),function(_0x49c721){_0x3dbd9e[_0xa24c('0x8f')](_0xa24c('0x90'));_0x1fe0f3(_0x3dbd9e);_0x135cef(this)[_0xa24c('0x8f')](_0x49c721);}),_0x135cef(window)[_0xa24c('0x92')](function(){_0x3dbd9e[_0xa24c('0x8f')](_0xa24c('0x90'));_0x1fe0f3(_0x3dbd9e);_0x3dbd9e[_0xa24c('0x8f')]('mouseenter.qd_bb_buy_sc');}));};_0x1085b1[_0xa24c('0x79')]=function(){var _0x454a82=_0x135cef(this),_0x1154e3=_0x454a82[_0xa24c('0x32')](_0xa24c('0x73'))||'';if(-0x1<_0x1154e3[_0xa24c('0x93')](_0x3e0c08[_0xa24c('0x94')]))return!0x0;_0x1154e3=_0x1154e3[_0xa24c('0x1')](/redirect\=(false|true)/gi,'')[_0xa24c('0x1')]('?',_0xa24c('0x95'))['replace'](/\&\&/gi,'&');if(_0x3e0c08[_0xa24c('0x96')](_0x454a82))return _0x454a82[_0xa24c('0x32')](_0xa24c('0x73'),_0x1154e3[_0xa24c('0x1')](_0xa24c('0x97'),_0xa24c('0x98'))),!0x0;_0x1154e3=_0x1154e3[_0xa24c('0x1')](/http.?:/i,'');_0x8bd3fb[_0xa24c('0x99')](function(_0x517a09){if(!_0x3e0c08[_0xa24c('0x9a')]&&!/(&|\?)qty\=[1-9][0-9]*/gi['test'](_0x1154e3))return _0x517a09();var _0x5e4d27=function(_0x530b00,_0x57cc8d){var _0x124d52=_0x1154e3[_0xa24c('0x9b')](/sku\=([0-9]+)/gi),_0x3791eb=[];if(_0xa24c('0x15')===typeof _0x124d52&&null!==_0x124d52)for(var _0x2f0ec7=_0x124d52['length']-0x1;0x0<=_0x2f0ec7;_0x2f0ec7--){var _0x14708b=parseInt(_0x124d52[_0x2f0ec7][_0xa24c('0x1')](/sku\=/gi,''));isNaN(_0x14708b)||_0x3791eb[_0xa24c('0x9c')](_0x14708b);}_0x3e0c08[_0xa24c('0x9d')][_0xa24c('0x26')](this,_0x530b00,_0x57cc8d,_0x1154e3);_0x1085b1[_0xa24c('0x9e')][_0xa24c('0x26')](this,_0x530b00,_0x57cc8d,_0x1154e3,_0x3791eb);_0x1085b1[_0xa24c('0x84')](_0x454a82,_0x1154e3[_0xa24c('0x9f')]('ku=')[_0xa24c('0xa0')]()[_0xa24c('0x9f')]('&')[_0xa24c('0xa1')]());_0xa24c('0x8')===typeof _0x3e0c08[_0xa24c('0xa2')]&&_0x3e0c08['asyncCallback'][_0xa24c('0x26')](this);_0x135cef(window)[_0xa24c('0xa3')](_0xa24c('0xa4'));_0x135cef(window)['trigger'](_0xa24c('0xa5'));};_0x3e0c08[_0xa24c('0xa6')]?(_0x5e4d27(null,_0xa24c('0x6f')),_0x517a09()):_0x135cef[_0xa24c('0xa7')]({'url':_0x1154e3,'complete':_0x5e4d27})[_0xa24c('0x1c')](function(){_0x517a09();});});};_0x1085b1['buyButtonClickCallback']=function(_0x56a345,_0x2d3f36,_0x4e0c0e,_0x1c912c){try{_0xa24c('0x6f')===_0x2d3f36&&'object'===typeof window[_0xa24c('0xa8')]&&_0xa24c('0x8')===typeof window[_0xa24c('0xa8')][_0xa24c('0xa9')]&&window[_0xa24c('0xa8')][_0xa24c('0xa9')](_0x56a345,_0x2d3f36,_0x4e0c0e,_0x1c912c);}catch(_0x5a0fdb){_0x288cb7(_0xa24c('0xaa'));}};_0x124d52();_0xa24c('0x8')===typeof _0x3e0c08[_0xa24c('0x42')]?_0x3e0c08[_0xa24c('0x42')]['call'](this):_0x288cb7(_0xa24c('0xab'));};var _0x34baef=_0x135cef[_0xa24c('0x66')]();_0x135cef['fn'][_0xa24c('0x76')]=function(_0x13cf59,_0x3960a7){var _0x168a8b=_0x135cef(this);'undefined'!==typeof _0x3960a7||_0xa24c('0x15')!==typeof _0x13cf59||_0x13cf59 instanceof _0x135cef||(_0x3960a7=_0x13cf59,_0x13cf59=void 0x0);_0x3e0c08=_0x135cef[_0xa24c('0x14')]({},_0x271647,_0x3960a7);var _0x3df316;_0x34baef['add'](function(){_0x168a8b['children'](_0xa24c('0xac'))[_0xa24c('0x6')]||_0x168a8b[_0xa24c('0xad')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x3df316=new _0x135cef[(_0xa24c('0x76'))](_0x168a8b,_0x13cf59);});_0x34baef['fire']();_0x135cef(window)['on']('QuatroDigital.qd_bb_prod_add',function(_0x29122e,_0x2463b8,_0x3d7917){_0x3df316[_0xa24c('0x84')](_0x2463b8,_0x3d7917);});return _0x135cef[_0xa24c('0x14')](_0x168a8b,_0x3df316);};var _0x16a761=0x0;_0x135cef(document)[_0xa24c('0xae')](function(_0x1838d3,_0x42e99a,_0x5ae9e5){-0x1<_0x5ae9e5[_0xa24c('0x17')][_0xa24c('0xf')]()[_0xa24c('0x93')](_0xa24c('0xaf'))&&(_0x16a761=(_0x5ae9e5[_0xa24c('0x17')][_0xa24c('0x9b')](/sku\=([0-9]+)/i)||[''])['pop']());});_0x135cef(window)['bind'](_0xa24c('0xb0'),function(){_0x135cef(window)[_0xa24c('0xa3')](_0xa24c('0xb1'),[new _0x135cef(),_0x16a761]);});_0x135cef(document)[_0xa24c('0xb2')](function(){_0x34baef[_0xa24c('0x43')]();});}catch(_0x467c24){'undefined'!==typeof console&&_0xa24c('0x8')===typeof console['error']&&console[_0xa24c('0x12')](_0xa24c('0x63'),_0x467c24);}}(this));function qd_number_format(_0x147244,_0x2e4d2e,_0x3eb91b,_0x5e3e0f){_0x147244=(_0x147244+'')[_0xa24c('0x1')](/[^0-9+\-Ee.]/g,'');_0x147244=isFinite(+_0x147244)?+_0x147244:0x0;_0x2e4d2e=isFinite(+_0x2e4d2e)?Math[_0xa24c('0x2')](_0x2e4d2e):0x0;_0x5e3e0f=_0xa24c('0x3')===typeof _0x5e3e0f?',':_0x5e3e0f;_0x3eb91b='undefined'===typeof _0x3eb91b?'.':_0x3eb91b;var _0x1c7bd3='',_0x1c7bd3=function(_0x21596a,_0x56cd61){var _0x59d15d=Math[_0xa24c('0xb3')](0xa,_0x56cd61);return''+(Math[_0xa24c('0x4')](_0x21596a*_0x59d15d)/_0x59d15d)['toFixed'](_0x56cd61);},_0x1c7bd3=(_0x2e4d2e?_0x1c7bd3(_0x147244,_0x2e4d2e):''+Math[_0xa24c('0x4')](_0x147244))[_0xa24c('0x9f')]('.');0x3<_0x1c7bd3[0x0][_0xa24c('0x6')]&&(_0x1c7bd3[0x0]=_0x1c7bd3[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x5e3e0f));(_0x1c7bd3[0x1]||'')[_0xa24c('0x6')]<_0x2e4d2e&&(_0x1c7bd3[0x1]=_0x1c7bd3[0x1]||'',_0x1c7bd3[0x1]+=Array(_0x2e4d2e-_0x1c7bd3[0x1][_0xa24c('0x6')]+0x1)['join']('0'));return _0x1c7bd3['join'](_0x3eb91b);}(function(){try{window['_QuatroDigital_CartData']=window[_0xa24c('0x36')]||{},window[_0xa24c('0x36')][_0xa24c('0x42')]=window['_QuatroDigital_CartData']['callback']||$[_0xa24c('0x66')]();}catch(_0x660dd2){_0xa24c('0x3')!==typeof console&&_0xa24c('0x8')===typeof console[_0xa24c('0x12')]&&console['error']('Oooops!\x20',_0x660dd2[_0xa24c('0x1f')]);}}());(function(_0x2ccd55){try{var _0x2c4ae1=jQuery,_0x685e6a=function(_0x25a5da,_0x53ebd2){if(_0xa24c('0x15')===typeof console&&_0xa24c('0x3')!==typeof console[_0xa24c('0x12')]&&'undefined'!==typeof console[_0xa24c('0x2c')]&&'undefined'!==typeof console[_0xa24c('0x2a')]){var _0x25dfa9;_0xa24c('0x15')===typeof _0x25a5da?(_0x25a5da[_0xa24c('0x67')](_0xa24c('0xb4')),_0x25dfa9=_0x25a5da):_0x25dfa9=[_0xa24c('0xb4')+_0x25a5da];if(_0xa24c('0x3')===typeof _0x53ebd2||_0xa24c('0x29')!==_0x53ebd2[_0xa24c('0xf')]()&&_0xa24c('0x69')!==_0x53ebd2[_0xa24c('0xf')]())if(_0xa24c('0x3')!==typeof _0x53ebd2&&'info'===_0x53ebd2[_0xa24c('0xf')]())try{console[_0xa24c('0x2c')][_0xa24c('0x6a')](console,_0x25dfa9);}catch(_0x33d259){try{console['info'](_0x25dfa9[_0xa24c('0x7')]('\x0a'));}catch(_0x50982e){}}else try{console[_0xa24c('0x12')][_0xa24c('0x6a')](console,_0x25dfa9);}catch(_0x167f53){try{console[_0xa24c('0x12')](_0x25dfa9[_0xa24c('0x7')]('\x0a'));}catch(_0x554072){}}else try{console[_0xa24c('0x2a')][_0xa24c('0x6a')](console,_0x25dfa9);}catch(_0x593132){try{console[_0xa24c('0x2a')](_0x25dfa9[_0xa24c('0x7')]('\x0a'));}catch(_0x2dae6d){}}}};window[_0xa24c('0x55')]=window[_0xa24c('0x55')]||{};window['_QuatroDigital_DropDown'][_0xa24c('0x8c')]=!0x0;_0x2c4ae1[_0xa24c('0xb5')]=function(){};_0x2c4ae1['fn'][_0xa24c('0xb5')]=function(){return{'fn':new _0x2c4ae1()};};var _0x4bfc69=function(_0x317cd5){var _0x461b10={'z':_0xa24c('0xb6')};return function(_0x47d1dc){var _0x3f993c=function(_0x4c0222){return _0x4c0222;};var _0x22c8a7=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x47d1dc=_0x47d1dc['d'+_0x22c8a7[0x10]+'c'+_0x22c8a7[0x11]+'m'+_0x3f993c(_0x22c8a7[0x1])+'n'+_0x22c8a7[0xd]]['l'+_0x22c8a7[0x12]+'c'+_0x22c8a7[0x0]+'ti'+_0x3f993c('o')+'n'];var _0x3f67cd=function(_0x4bccaf){return escape(encodeURIComponent(_0x4bccaf['replace'](/\./g,'¨')[_0xa24c('0x1')](/[a-zA-Z]/g,function(_0x727b4e){return String[_0xa24c('0xb7')](('Z'>=_0x727b4e?0x5a:0x7a)>=(_0x727b4e=_0x727b4e[_0xa24c('0xb8')](0x0)+0xd)?_0x727b4e:_0x727b4e-0x1a);})));};var _0x2ccd55=_0x3f67cd(_0x47d1dc[[_0x22c8a7[0x9],_0x3f993c('o'),_0x22c8a7[0xc],_0x22c8a7[_0x3f993c(0xd)]][_0xa24c('0x7')]('')]);_0x3f67cd=_0x3f67cd((window[['js',_0x3f993c('no'),'m',_0x22c8a7[0x1],_0x22c8a7[0x4][_0xa24c('0xd')](),_0xa24c('0xb9')][_0xa24c('0x7')]('')]||_0xa24c('0xba'))+['.v',_0x22c8a7[0xd],'e',_0x3f993c('x'),'co',_0x3f993c('mm'),_0xa24c('0xbb'),_0x22c8a7[0x1],'.c',_0x3f993c('o'),'m.',_0x22c8a7[0x13],'r'][_0xa24c('0x7')](''));for(var _0x57c08c in _0x461b10){if(_0x3f67cd===_0x57c08c+_0x461b10[_0x57c08c]||_0x2ccd55===_0x57c08c+_0x461b10[_0x57c08c]){var _0x27ccd7='tr'+_0x22c8a7[0x11]+'e';break;}_0x27ccd7='f'+_0x22c8a7[0x0]+'ls'+_0x3f993c(_0x22c8a7[0x1])+'';}_0x3f993c=!0x1;-0x1<_0x47d1dc[[_0x22c8a7[0xc],'e',_0x22c8a7[0x0],'rc',_0x22c8a7[0x9]]['join']('')][_0xa24c('0x93')](_0xa24c('0xbc'))&&(_0x3f993c=!0x0);return[_0x27ccd7,_0x3f993c];}(_0x317cd5);}(window);if(!eval(_0x4bfc69[0x0]))return _0x4bfc69[0x1]?_0x685e6a(_0xa24c('0xbd')):!0x1;_0x2c4ae1[_0xa24c('0xb5')]=function(_0x5432c9,_0x371aab){var _0x59f5e5=_0x2c4ae1(_0x5432c9);if(!_0x59f5e5[_0xa24c('0x6')])return _0x59f5e5;var _0x1c8281=_0x2c4ae1['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':'Ir\x20ao\x20Carrinho','linkCheckout':_0xa24c('0xbe'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0xa24c('0xbf'),'continueShopping':_0xa24c('0xc0'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x1a8800){return _0x1a8800[_0xa24c('0xc1')]||_0x1a8800['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x371aab);_0x2c4ae1('');var _0x325276=this;if(_0x1c8281['smartCheckout']){var _0x2f9e96=!0x1;_0xa24c('0x3')===typeof window[_0xa24c('0x56')]&&(_0x685e6a('A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN'),_0x2c4ae1[_0xa24c('0xa7')]({'url':_0xa24c('0xc2'),'async':!0x1,'dataType':'script','error':function(){_0x685e6a(_0xa24c('0xc3'));_0x2f9e96=!0x0;}}));if(_0x2f9e96)return _0x685e6a(_0xa24c('0xc4'));}if('object'===typeof window[_0xa24c('0x56')]&&_0xa24c('0x3')!==typeof window[_0xa24c('0x56')][_0xa24c('0x24')])var _0x270b70=window[_0xa24c('0x56')][_0xa24c('0x24')];else if('object'===typeof vtex&&_0xa24c('0x15')===typeof vtex[_0xa24c('0x24')]&&_0xa24c('0x3')!==typeof vtex[_0xa24c('0x24')][_0xa24c('0x57')])_0x270b70=new vtex[(_0xa24c('0x24'))][(_0xa24c('0x57'))]();else return _0x685e6a(_0xa24c('0x58'));_0x325276[_0xa24c('0xc5')]='<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>';var _0x1fdaa3=function(_0x557a06){_0x2c4ae1(this)[_0xa24c('0xc6')](_0x557a06);_0x557a06['find'](_0xa24c('0xc7'))[_0xa24c('0x2d')](_0x2c4ae1(_0xa24c('0xc8')))['on'](_0xa24c('0xc9'),function(){_0x59f5e5[_0xa24c('0x87')](_0xa24c('0xca'));_0x2c4ae1(document['body'])['removeClass']('qd-bb-lightBoxBodyProdAdd');});_0x2c4ae1(document)[_0xa24c('0xcb')](_0xa24c('0xcc'))['on'](_0xa24c('0xcc'),function(_0x26fe83){0x1b==_0x26fe83[_0xa24c('0xcd')]&&(_0x59f5e5['removeClass'](_0xa24c('0xca')),_0x2c4ae1(document[_0xa24c('0x74')])[_0xa24c('0x87')](_0xa24c('0xce')));});var _0x2118bc=_0x557a06['find'](_0xa24c('0xcf'));_0x557a06[_0xa24c('0x50')](_0xa24c('0xd0'))['on']('click.qd_ddc_scrollUp',function(){_0x325276[_0xa24c('0xd1')]('-',void 0x0,void 0x0,_0x2118bc);return!0x1;});_0x557a06[_0xa24c('0x50')](_0xa24c('0xd2'))['on'](_0xa24c('0xd3'),function(){_0x325276[_0xa24c('0xd1')](void 0x0,void 0x0,void 0x0,_0x2118bc);return!0x1;});_0x557a06['find'](_0xa24c('0xd4'))[_0xa24c('0xd5')]('')['on'](_0xa24c('0xd6'),function(){_0x325276[_0xa24c('0xd7')](_0x2c4ae1(this));});if(_0x1c8281[_0xa24c('0xd8')]){var _0x371aab=0x0;_0x2c4ae1(this)['on'](_0xa24c('0xd9'),function(){var _0x557a06=function(){window['_QuatroDigital_DropDown'][_0xa24c('0x8c')]&&(_0x325276['getCartInfoByUrl'](),window[_0xa24c('0x55')]['allowUpdate']=!0x1,_0x2c4ae1['fn']['simpleCart'](!0x0),_0x325276['cartIsEmpty']());};_0x371aab=setInterval(function(){_0x557a06();},0x258);_0x557a06();});_0x2c4ae1(this)['on'](_0xa24c('0xda'),function(){clearInterval(_0x371aab);});}};var _0x4946b3=function(_0x9999c6){_0x9999c6=_0x2c4ae1(_0x9999c6);_0x1c8281[_0xa24c('0xdb')]['cartTotal']=_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xdc')]['replace']('#value',_0xa24c('0xdd'));_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xdc')]=_0x1c8281['texts'][_0xa24c('0xdc')][_0xa24c('0x1')](_0xa24c('0xde'),_0xa24c('0xdf'));_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xdc')]=_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xdc')][_0xa24c('0x1')]('#shipping',_0xa24c('0xe0'));_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xdc')]=_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xdc')][_0xa24c('0x1')](_0xa24c('0xe1'),_0xa24c('0xe2'));_0x9999c6[_0xa24c('0x50')]('.qd-ddc-viewCart')[_0xa24c('0x4e')](_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xe3')]);_0x9999c6[_0xa24c('0x50')](_0xa24c('0xe4'))['html'](_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xe5')]);_0x9999c6[_0xa24c('0x50')]('.qd-ddc-checkout')['html'](_0x1c8281[_0xa24c('0xdb')]['linkCheckout']);_0x9999c6['find'](_0xa24c('0xe6'))[_0xa24c('0x4e')](_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xdc')]);_0x9999c6[_0xa24c('0x50')](_0xa24c('0xe7'))[_0xa24c('0x4e')](_0x1c8281[_0xa24c('0xdb')][_0xa24c('0xe8')]);_0x9999c6[_0xa24c('0x50')](_0xa24c('0xe9'))[_0xa24c('0x4e')](_0x1c8281['texts'][_0xa24c('0x53')]);return _0x9999c6;}(this[_0xa24c('0xc5')]);var _0x3f0b27=0x0;_0x59f5e5[_0xa24c('0x34')](function(){0x0<_0x3f0b27?_0x1fdaa3[_0xa24c('0x26')](this,_0x4946b3[_0xa24c('0xea')]()):_0x1fdaa3[_0xa24c('0x26')](this,_0x4946b3);_0x3f0b27++;});window[_0xa24c('0x36')][_0xa24c('0x42')][_0xa24c('0x2d')](function(){_0x2c4ae1(_0xa24c('0xeb'))['html'](window[_0xa24c('0x36')][_0xa24c('0x3a')]||'--');_0x2c4ae1(_0xa24c('0xec'))[_0xa24c('0x4e')](window[_0xa24c('0x36')][_0xa24c('0x40')]||'0');_0x2c4ae1(_0xa24c('0xed'))[_0xa24c('0x4e')](window[_0xa24c('0x36')]['shipping']||'--');_0x2c4ae1(_0xa24c('0xee'))[_0xa24c('0x4e')](window[_0xa24c('0x36')][_0xa24c('0x3d')]||'--');});var _0x26ce24=function(_0x5aecd0,_0x32938f){if(_0xa24c('0x3')===typeof _0x5aecd0[_0xa24c('0x3f')])return _0x685e6a(_0xa24c('0xef'));_0x325276[_0xa24c('0xf0')][_0xa24c('0x26')](this,_0x32938f);};_0x325276[_0xa24c('0x8b')]=function(_0x5e7888,_0x5cdabe){'undefined'!=typeof _0x5cdabe?window[_0xa24c('0x55')][_0xa24c('0xf1')]=_0x5cdabe:window['_QuatroDigital_DropDown'][_0xa24c('0xf1')]&&(_0x5cdabe=window[_0xa24c('0x55')][_0xa24c('0xf1')]);setTimeout(function(){window[_0xa24c('0x55')][_0xa24c('0xf1')]=void 0x0;},_0x1c8281['timeRemoveNewItemClass']);_0x2c4ae1(_0xa24c('0xf2'))[_0xa24c('0x87')]('qd-ddc-prodLoaded');if(_0x1c8281[_0xa24c('0xf3')]){var _0x371aab=function(_0x2ba1fb){window[_0xa24c('0x55')][_0xa24c('0x25')]=_0x2ba1fb;_0x26ce24(_0x2ba1fb,_0x5cdabe);_0xa24c('0x3')!==typeof window[_0xa24c('0xf4')]&&_0xa24c('0x8')===typeof window[_0xa24c('0xf4')][_0xa24c('0xf5')]&&window[_0xa24c('0xf4')][_0xa24c('0xf5')][_0xa24c('0x26')](this);_0x2c4ae1(_0xa24c('0xf2'))['addClass']('qd-ddc-prodLoaded');};_0xa24c('0x3')!==typeof window[_0xa24c('0x55')][_0xa24c('0x25')]?(_0x371aab(window[_0xa24c('0x55')][_0xa24c('0x25')]),_0xa24c('0x8')===typeof _0x5e7888&&_0x5e7888(window[_0xa24c('0x55')][_0xa24c('0x25')])):_0x2c4ae1[_0xa24c('0x59')](['items',_0xa24c('0x37'),_0xa24c('0x5a')],{'done':function(_0x73201e){_0x371aab[_0xa24c('0x26')](this,_0x73201e);_0xa24c('0x8')===typeof _0x5e7888&&_0x5e7888(_0x73201e);},'fail':function(_0x547996){_0x685e6a([_0xa24c('0xf6'),_0x547996]);}});}else alert(_0xa24c('0xf7'));};_0x325276['cartIsEmpty']=function(){var _0x45738d=_0x2c4ae1(_0xa24c('0xf2'));_0x45738d[_0xa24c('0x50')]('.qd-ddc-prodRow')[_0xa24c('0x6')]?_0x45738d[_0xa24c('0x87')](_0xa24c('0xf8')):_0x45738d[_0xa24c('0x49')](_0xa24c('0xf8'));};_0x325276[_0xa24c('0xf0')]=function(_0x1c68a6){var _0x371aab=_0x2c4ae1(_0xa24c('0xf9'));_0x371aab[_0xa24c('0xfa')]();_0x371aab[_0xa24c('0x34')](function(){var _0x371aab=_0x2c4ae1(this),_0x5432c9,_0x4f1dff,_0x78cc6e=_0x2c4ae1(''),_0x391d76;for(_0x391d76 in window[_0xa24c('0x55')][_0xa24c('0x25')][_0xa24c('0x3f')])if(_0xa24c('0x15')===typeof window[_0xa24c('0x55')][_0xa24c('0x25')][_0xa24c('0x3f')][_0x391d76]){var _0x21d1b5=window[_0xa24c('0x55')][_0xa24c('0x25')]['items'][_0x391d76];var _0x3be24f=_0x21d1b5[_0xa24c('0xfb')]['replace'](/^\/|\/$/g,'')[_0xa24c('0x9f')]('/');var _0x1877da=_0x2c4ae1(_0xa24c('0xfc'));_0x1877da['attr']({'data-sku':_0x21d1b5['id'],'data-sku-index':_0x391d76,'data-qd-departament':_0x3be24f[0x0],'data-qd-category':_0x3be24f[_0x3be24f[_0xa24c('0x6')]-0x1]});_0x1877da['addClass'](_0xa24c('0xfd')+_0x21d1b5[_0xa24c('0xfe')]);_0x1877da[_0xa24c('0x50')](_0xa24c('0xff'))[_0xa24c('0xc6')](_0x1c8281[_0xa24c('0xc1')](_0x21d1b5));_0x1877da[_0xa24c('0x50')](_0xa24c('0x100'))['append'](isNaN(_0x21d1b5['sellingPrice'])?_0x21d1b5[_0xa24c('0x101')]:0x0==_0x21d1b5['sellingPrice']?_0xa24c('0x102'):(_0x2c4ae1(_0xa24c('0x103'))[_0xa24c('0x32')](_0xa24c('0x33'))||'R$')+'\x20'+qd_number_format(_0x21d1b5['sellingPrice']/0x64,0x2,',','.'));_0x1877da['find']('.qd-ddc-quantity')[_0xa24c('0x32')]({'data-sku':_0x21d1b5['id'],'data-sku-index':_0x391d76})['val'](_0x21d1b5[_0xa24c('0x41')]);_0x1877da[_0xa24c('0x50')](_0xa24c('0x104'))[_0xa24c('0x32')]({'data-sku':_0x21d1b5['id'],'data-sku-index':_0x391d76});_0x325276[_0xa24c('0x105')](_0x21d1b5['id'],_0x1877da[_0xa24c('0x50')](_0xa24c('0x106')),_0x21d1b5[_0xa24c('0x107')]);_0x1877da[_0xa24c('0x50')](_0xa24c('0x108'))['attr']({'data-sku':_0x21d1b5['id'],'data-sku-index':_0x391d76});_0x1877da['appendTo'](_0x371aab);_0x78cc6e=_0x78cc6e['add'](_0x1877da);}try{var _0x4615d7=_0x371aab['getParent'](_0xa24c('0xf2'))[_0xa24c('0x50')](_0xa24c('0xd4'));_0x4615d7[_0xa24c('0x6')]&&''==_0x4615d7[_0xa24c('0xd5')]()&&window['_QuatroDigital_DropDown'][_0xa24c('0x25')][_0xa24c('0x5a')][_0xa24c('0x109')]&&_0x4615d7[_0xa24c('0xd5')](window[_0xa24c('0x55')]['getOrderForm'][_0xa24c('0x5a')][_0xa24c('0x109')]['postalCode']);}catch(_0x3a847f){_0x685e6a('Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20'+_0x3a847f[_0xa24c('0x1f')],_0xa24c('0x69'));}_0x325276['actionButtons'](_0x371aab);_0x325276[_0xa24c('0x10a')]();_0x1c68a6&&_0x1c68a6[_0xa24c('0x10b')]&&function(){_0x4f1dff=_0x78cc6e[_0xa24c('0x46')](_0xa24c('0x10c')+_0x1c68a6['lastSku']+'\x27]');_0x4f1dff['length']&&(_0x5432c9=0x0,_0x78cc6e[_0xa24c('0x34')](function(){var _0x1c68a6=_0x2c4ae1(this);if(_0x1c68a6['is'](_0x4f1dff))return!0x1;_0x5432c9+=_0x1c68a6[_0xa24c('0x10d')]();}),_0x325276[_0xa24c('0xd1')](void 0x0,void 0x0,_0x5432c9,_0x371aab['add'](_0x371aab[_0xa24c('0xa8')]())),_0x78cc6e[_0xa24c('0x87')]('qd-ddc-lastAddedFixed'),function(_0x1279e8){_0x1279e8[_0xa24c('0x49')](_0xa24c('0x10e'));_0x1279e8[_0xa24c('0x49')](_0xa24c('0x10f'));setTimeout(function(){_0x1279e8[_0xa24c('0x87')](_0xa24c('0x10e'));},_0x1c8281[_0xa24c('0x110')]);}(_0x4f1dff));}();});(function(){_QuatroDigital_DropDown[_0xa24c('0x25')][_0xa24c('0x3f')]['length']?(_0x2c4ae1('body')['removeClass']('qd-ddc-cart-empty')[_0xa24c('0x49')](_0xa24c('0x111')),setTimeout(function(){_0x2c4ae1(_0xa24c('0x74'))[_0xa24c('0x87')](_0xa24c('0x112'));},_0x1c8281['timeRemoveNewItemClass'])):_0x2c4ae1(_0xa24c('0x74'))['removeClass']('qd-ddc-cart-rendered')['addClass'](_0xa24c('0x113'));}());'function'===typeof _0x1c8281[_0xa24c('0x114')]?_0x1c8281[_0xa24c('0x114')]['call'](this):_0x685e6a(_0xa24c('0x115'));};_0x325276[_0xa24c('0x105')]=function(_0x2bb5b8,_0xc81b9c,_0x4651bc){function _0x24e68f(){_0xc81b9c[_0xa24c('0x87')](_0xa24c('0x116'))[_0xa24c('0x92')](function(){_0x2c4ae1(this)['addClass'](_0xa24c('0x116'));})[_0xa24c('0x32')]('src',_0x4651bc);}_0x4651bc?_0x24e68f():isNaN(_0x2bb5b8)?_0x685e6a(_0xa24c('0x117'),_0xa24c('0x29')):alert('Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.');};_0x325276[_0xa24c('0x118')]=function(_0x27ed85){var _0x58cacb=function(_0x43bf6d,_0x476850){var _0x371aab=_0x2c4ae1(_0x43bf6d);var _0x17a646=_0x371aab[_0xa24c('0x32')](_0xa24c('0x119'));var _0x5432c9=_0x371aab['attr']('data-sku-index');if(_0x17a646){var _0x5c4f5d=parseInt(_0x371aab[_0xa24c('0xd5')]())||0x1;_0x325276[_0xa24c('0x11a')]([_0x17a646,_0x5432c9],_0x5c4f5d,_0x5c4f5d+0x1,function(_0x51187e){_0x371aab['val'](_0x51187e);_0xa24c('0x8')===typeof _0x476850&&_0x476850();});}};var _0x371aab=function(_0x1ab1e6,_0x36f8a4){var _0x371aab=_0x2c4ae1(_0x1ab1e6);var _0x5dfd8c=_0x371aab['attr'](_0xa24c('0x119'));var _0x5432c9=_0x371aab[_0xa24c('0x32')](_0xa24c('0x11b'));if(_0x5dfd8c){var _0x2fc75c=parseInt(_0x371aab[_0xa24c('0xd5')]())||0x2;_0x325276[_0xa24c('0x11a')]([_0x5dfd8c,_0x5432c9],_0x2fc75c,_0x2fc75c-0x1,function(_0x439b92){_0x371aab['val'](_0x439b92);_0xa24c('0x8')===typeof _0x36f8a4&&_0x36f8a4();});}};var _0x22c428=function(_0x1e2191,_0x3c34cc){var _0x371aab=_0x2c4ae1(_0x1e2191);var _0xc0b1=_0x371aab[_0xa24c('0x32')](_0xa24c('0x119'));var _0x5432c9=_0x371aab[_0xa24c('0x32')](_0xa24c('0x11b'));if(_0xc0b1){var _0x17f7af=parseInt(_0x371aab[_0xa24c('0xd5')]())||0x1;_0x325276[_0xa24c('0x11a')]([_0xc0b1,_0x5432c9],0x1,_0x17f7af,function(_0xad3227){_0x371aab[_0xa24c('0xd5')](_0xad3227);_0xa24c('0x8')===typeof _0x3c34cc&&_0x3c34cc();});}};var _0x5432c9=_0x27ed85[_0xa24c('0x50')](_0xa24c('0x11c'));_0x5432c9[_0xa24c('0x49')](_0xa24c('0x11d'))[_0xa24c('0x34')](function(){var _0x27ed85=_0x2c4ae1(this);_0x27ed85[_0xa24c('0x50')]('.qd-ddc-quantityMore')['on'](_0xa24c('0x11e'),function(_0x5dc425){_0x5dc425[_0xa24c('0x11f')]();_0x5432c9[_0xa24c('0x49')](_0xa24c('0x120'));_0x58cacb(_0x27ed85[_0xa24c('0x50')](_0xa24c('0x121')),function(){_0x5432c9[_0xa24c('0x87')]('qd-loading');});});_0x27ed85[_0xa24c('0x50')]('.qd-ddc-quantityMinus')['on'](_0xa24c('0x122'),function(_0x599e0d){_0x599e0d[_0xa24c('0x11f')]();_0x5432c9[_0xa24c('0x49')](_0xa24c('0x120'));_0x371aab(_0x27ed85[_0xa24c('0x50')](_0xa24c('0x121')),function(){_0x5432c9[_0xa24c('0x87')](_0xa24c('0x120'));});});_0x27ed85['find'](_0xa24c('0x121'))['on']('focusout.qd_ddc_change',function(){_0x5432c9['addClass'](_0xa24c('0x120'));_0x22c428(this,function(){_0x5432c9[_0xa24c('0x87')]('qd-loading');});});_0x27ed85[_0xa24c('0x50')](_0xa24c('0x121'))['on'](_0xa24c('0x123'),function(_0x3d10da){0xd==_0x3d10da[_0xa24c('0xcd')]&&(_0x5432c9[_0xa24c('0x49')](_0xa24c('0x120')),_0x22c428(this,function(){_0x5432c9[_0xa24c('0x87')](_0xa24c('0x120'));}));});});_0x27ed85[_0xa24c('0x50')](_0xa24c('0x124'))[_0xa24c('0x34')](function(){var _0x27ed85=_0x2c4ae1(this);_0x27ed85['find'](_0xa24c('0x104'))['on'](_0xa24c('0x125'),function(){_0x27ed85['addClass'](_0xa24c('0x120'));_0x325276[_0xa24c('0x126')](_0x2c4ae1(this),function(_0x2dafef){_0x2dafef?_0x27ed85['stop'](!0x0)[_0xa24c('0x127')](function(){_0x27ed85[_0xa24c('0x128')]();_0x325276[_0xa24c('0x10a')]();}):_0x27ed85[_0xa24c('0x87')](_0xa24c('0x120'));});return!0x1;});});};_0x325276[_0xa24c('0xd7')]=function(_0x4bac40){var _0x287f69=_0x4bac40[_0xa24c('0xd5')](),_0x287f69=_0x287f69['replace'](/[^0-9\-]/g,''),_0x287f69=_0x287f69['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xa24c('0x129')),_0x287f69=_0x287f69['replace'](/(.{9}).*/g,'$1');_0x4bac40['val'](_0x287f69);0x9<=_0x287f69['length']&&(_0x4bac40[_0xa24c('0x16')](_0xa24c('0x12a'))!=_0x287f69&&_0x270b70[_0xa24c('0x12b')]({'postalCode':_0x287f69,'country':_0xa24c('0x12c')})[_0xa24c('0x1a')](function(_0x38dfb0){window[_0xa24c('0x55')][_0xa24c('0x25')]=_0x38dfb0;_0x325276['getCartInfoByUrl']();})['fail'](function(_0x2cc122){_0x685e6a([_0xa24c('0x12d'),_0x2cc122]);updateCartData();}),_0x4bac40['data'](_0xa24c('0x12a'),_0x287f69));};_0x325276[_0xa24c('0x11a')]=function(_0x2e4590,_0x67cf64,_0x534101,_0xa09ca9){function _0x23b864(_0x3a5fb4){_0x3a5fb4=_0xa24c('0x12e')!==typeof _0x3a5fb4?!0x1:_0x3a5fb4;_0x325276[_0xa24c('0x8b')]();window['_QuatroDigital_DropDown'][_0xa24c('0x8c')]=!0x1;_0x325276[_0xa24c('0x10a')]();_0xa24c('0x3')!==typeof window[_0xa24c('0xf4')]&&'function'===typeof window['_QuatroDigital_AmountProduct'][_0xa24c('0xf5')]&&window[_0xa24c('0xf4')][_0xa24c('0xf5')]['call'](this);_0xa24c('0x8')===typeof adminCart&&adminCart();_0x2c4ae1['fn'][_0xa24c('0x23')](!0x0,void 0x0,_0x3a5fb4);_0xa24c('0x8')===typeof _0xa09ca9&&_0xa09ca9(_0x67cf64);}_0x534101=_0x534101||0x1;if(0x1>_0x534101)return _0x67cf64;if(_0x1c8281[_0xa24c('0xf3')]){if(_0xa24c('0x3')===typeof window[_0xa24c('0x55')]['getOrderForm'][_0xa24c('0x3f')][_0x2e4590[0x1]])return _0x685e6a('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x2e4590[0x1]+']'),_0x67cf64;window[_0xa24c('0x55')][_0xa24c('0x25')][_0xa24c('0x3f')][_0x2e4590[0x1]][_0xa24c('0x41')]=_0x534101;window[_0xa24c('0x55')][_0xa24c('0x25')][_0xa24c('0x3f')][_0x2e4590[0x1]][_0xa24c('0x12f')]=_0x2e4590[0x1];_0x270b70[_0xa24c('0x130')]([window[_0xa24c('0x55')][_0xa24c('0x25')]['items'][_0x2e4590[0x1]]],[_0xa24c('0x3f'),_0xa24c('0x37'),_0xa24c('0x5a')])['done'](function(_0x29fb2a){window[_0xa24c('0x55')][_0xa24c('0x25')]=_0x29fb2a;_0x23b864(!0x0);})['fail'](function(_0x1e8a75){_0x685e6a([_0xa24c('0x131'),_0x1e8a75]);_0x23b864();});}else _0x685e6a(_0xa24c('0x132'));};_0x325276[_0xa24c('0x126')]=function(_0x1c3ad2,_0x4c4a61){function _0x2902af(_0x303568){_0x303568=_0xa24c('0x12e')!==typeof _0x303568?!0x1:_0x303568;'undefined'!==typeof window[_0xa24c('0xf4')]&&_0xa24c('0x8')===typeof window['_QuatroDigital_AmountProduct'][_0xa24c('0xf5')]&&window[_0xa24c('0xf4')][_0xa24c('0xf5')][_0xa24c('0x26')](this);'function'===typeof adminCart&&adminCart();_0x2c4ae1['fn'][_0xa24c('0x23')](!0x0,void 0x0,_0x303568);_0xa24c('0x8')===typeof _0x4c4a61&&_0x4c4a61(_0x5432c9);}var _0x5432c9=!0x1,_0x26a1bf=_0x2c4ae1(_0x1c3ad2)[_0xa24c('0x32')]('data-sku-index');if(_0x1c8281[_0xa24c('0xf3')]){if(_0xa24c('0x3')===typeof window[_0xa24c('0x55')]['getOrderForm']['items'][_0x26a1bf])return _0x685e6a(_0xa24c('0x133')+_0x26a1bf+']'),_0x5432c9;window[_0xa24c('0x55')][_0xa24c('0x25')][_0xa24c('0x3f')][_0x26a1bf]['index']=_0x26a1bf;_0x270b70[_0xa24c('0x134')]([window[_0xa24c('0x55')][_0xa24c('0x25')]['items'][_0x26a1bf]],['items',_0xa24c('0x37'),_0xa24c('0x5a')])[_0xa24c('0x1a')](function(_0x179399){_0x5432c9=!0x0;window[_0xa24c('0x55')][_0xa24c('0x25')]=_0x179399;_0x26ce24(_0x179399);_0x2902af(!0x0);})[_0xa24c('0x1b')](function(_0x2d35a2){_0x685e6a([_0xa24c('0x135'),_0x2d35a2]);_0x2902af();});}else alert(_0xa24c('0x136'));};_0x325276[_0xa24c('0xd1')]=function(_0x4b87ce,_0x4ea50d,_0x57ffbb,_0x208d9f){_0x208d9f=_0x208d9f||_0x2c4ae1(_0xa24c('0x137'));_0x4b87ce=_0x4b87ce||'+';_0x4ea50d=_0x4ea50d||0.9*_0x208d9f[_0xa24c('0x138')]();_0x208d9f['stop'](!0x0,!0x0)['animate']({'scrollTop':isNaN(_0x57ffbb)?_0x4b87ce+'='+_0x4ea50d+'px':_0x57ffbb});};_0x1c8281['updateOnlyHover']||(_0x325276[_0xa24c('0x8b')](),_0x2c4ae1['fn'][_0xa24c('0x23')](!0x0));_0x2c4ae1(window)['on'](_0xa24c('0x139'),function(){try{window[_0xa24c('0x55')][_0xa24c('0x25')]=void 0x0,_0x325276[_0xa24c('0x8b')]();}catch(_0x486038){_0x685e6a(_0xa24c('0x13a')+_0x486038[_0xa24c('0x1f')],'avisso');}});'function'===typeof _0x1c8281['callback']?_0x1c8281[_0xa24c('0x42')][_0xa24c('0x26')](this):_0x685e6a('Callback\x20não\x20é\x20uma\x20função');};_0x2c4ae1['fn'][_0xa24c('0xb5')]=function(_0x2174ef){var _0x44bd7c=_0x2c4ae1(this);_0x44bd7c['fn']=new _0x2c4ae1[(_0xa24c('0xb5'))](this,_0x2174ef);return _0x44bd7c;};}catch(_0x4b4092){'undefined'!==typeof console&&_0xa24c('0x8')===typeof console[_0xa24c('0x12')]&&console[_0xa24c('0x12')](_0xa24c('0x63'),_0x4b4092);}}(this));(function(_0x209d79){try{var _0x28174e=jQuery;window[_0xa24c('0xf4')]=window[_0xa24c('0xf4')]||{};window[_0xa24c('0xf4')][_0xa24c('0x3f')]={};window[_0xa24c('0xf4')]['allowRecalculate']=!0x1;window[_0xa24c('0xf4')][_0xa24c('0x13b')]=!0x1;window[_0xa24c('0xf4')][_0xa24c('0x13c')]=!0x1;var _0x25f814=function(){if(window[_0xa24c('0xf4')][_0xa24c('0x13d')]){var _0x76874f=!0x1;var _0x209d79={};window['_QuatroDigital_AmountProduct'][_0xa24c('0x3f')]={};for(_0x38619c in window[_0xa24c('0x55')][_0xa24c('0x25')][_0xa24c('0x3f')])if('object'===typeof window[_0xa24c('0x55')][_0xa24c('0x25')][_0xa24c('0x3f')][_0x38619c]){var _0x1e400e=window[_0xa24c('0x55')][_0xa24c('0x25')][_0xa24c('0x3f')][_0x38619c];'undefined'!==typeof _0x1e400e[_0xa24c('0x13e')]&&null!==_0x1e400e[_0xa24c('0x13e')]&&''!==_0x1e400e['productId']&&(window[_0xa24c('0xf4')][_0xa24c('0x3f')][_0xa24c('0x13f')+_0x1e400e[_0xa24c('0x13e')]]=window[_0xa24c('0xf4')]['items'][_0xa24c('0x13f')+_0x1e400e[_0xa24c('0x13e')]]||{},window[_0xa24c('0xf4')][_0xa24c('0x3f')]['prod_'+_0x1e400e[_0xa24c('0x13e')]]['prodId']=_0x1e400e[_0xa24c('0x13e')],_0x209d79['prod_'+_0x1e400e['productId']]||(window[_0xa24c('0xf4')][_0xa24c('0x3f')]['prod_'+_0x1e400e[_0xa24c('0x13e')]][_0xa24c('0x40')]=0x0),window['_QuatroDigital_AmountProduct']['items'][_0xa24c('0x13f')+_0x1e400e[_0xa24c('0x13e')]][_0xa24c('0x40')]+=_0x1e400e[_0xa24c('0x41')],_0x76874f=!0x0,_0x209d79[_0xa24c('0x13f')+_0x1e400e[_0xa24c('0x13e')]]=!0x0);}var _0x38619c=_0x76874f;}else _0x38619c=void 0x0;window[_0xa24c('0xf4')][_0xa24c('0x13d')]&&(_0x28174e(_0xa24c('0x140'))['remove'](),_0x28174e(_0xa24c('0x141'))[_0xa24c('0x87')](_0xa24c('0x142')));for(var _0x5f1f26 in window[_0xa24c('0xf4')]['items']){_0x1e400e=window['_QuatroDigital_AmountProduct']['items'][_0x5f1f26];if(_0xa24c('0x15')!==typeof _0x1e400e)return;_0x209d79=_0x28174e(_0xa24c('0x143')+_0x1e400e[_0xa24c('0x144')]+']')[_0xa24c('0x22')]('li');if(window['_QuatroDigital_AmountProduct'][_0xa24c('0x13d')]||!_0x209d79[_0xa24c('0x50')]('.qd-bap-wrapper')[_0xa24c('0x6')])_0x76874f=_0x28174e('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x76874f[_0xa24c('0x50')](_0xa24c('0x145'))['html'](_0x1e400e[_0xa24c('0x40')]),_0x1e400e=_0x209d79[_0xa24c('0x50')]('.qd_bap_wrapper_content'),_0x1e400e[_0xa24c('0x6')]?_0x1e400e[_0xa24c('0xad')](_0x76874f)[_0xa24c('0x49')](_0xa24c('0x142')):_0x209d79[_0xa24c('0xad')](_0x76874f);}_0x38619c&&(window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1);};window['_QuatroDigital_AmountProduct'][_0xa24c('0xf5')]=function(){window[_0xa24c('0xf4')][_0xa24c('0x13d')]=!0x0;_0x25f814[_0xa24c('0x26')](this);};_0x28174e(document)[_0xa24c('0xb2')](function(){_0x25f814[_0xa24c('0x26')](this);});}catch(_0x14dde6){'undefined'!==typeof console&&_0xa24c('0x8')===typeof console['error']&&console[_0xa24c('0x12')]('Oooops!\x20',_0x14dde6);}}(this));(function(){try{var _0x3327c9=jQuery,_0x30cef0,_0x2e35a7={'selector':_0xa24c('0x146'),'dropDown':{},'buyButton':{}};_0x3327c9[_0xa24c('0x147')]=function(_0x202063){var _0x166b46={};_0x30cef0=_0x3327c9['extend'](!0x0,{},_0x2e35a7,_0x202063);_0x202063=_0x3327c9(_0x30cef0[_0xa24c('0x82')])[_0xa24c('0xb5')](_0x30cef0['dropDown']);_0x166b46[_0xa24c('0x7a')]=_0xa24c('0x3')!==typeof _0x30cef0['dropDown'][_0xa24c('0xd8')]&&!0x1===_0x30cef0['dropDown'][_0xa24c('0xd8')]?_0x3327c9(_0x30cef0[_0xa24c('0x82')])[_0xa24c('0x76')](_0x202063['fn'],_0x30cef0[_0xa24c('0x7a')]):_0x3327c9(_0x30cef0[_0xa24c('0x82')])[_0xa24c('0x76')](_0x30cef0[_0xa24c('0x7a')]);_0x166b46['dropDown']=_0x202063;return _0x166b46;};_0x3327c9['fn'][_0xa24c('0x148')]=function(){'object'===typeof console&&_0xa24c('0x8')===typeof console[_0xa24c('0x2c')]&&console['info'](_0xa24c('0x149'));};_0x3327c9[_0xa24c('0x148')]=_0x3327c9['fn'][_0xa24c('0x148')];}catch(_0x30acda){_0xa24c('0x3')!==typeof console&&_0xa24c('0x8')===typeof console[_0xa24c('0x12')]&&console[_0xa24c('0x12')]('Oooops!\x20',_0x30acda);}}());

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x466a=['<label\x20for=\x22qd-ssr2-select-','labelMessage','optionsPlaceHolder','</label>','\x22\x20id=\x22qd-ssr2-select-','\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','disabledMessage','</select></div>','appendTo','select','add','select2','pt-BR','change','val','QuatroDigital.ssrChange','body','qd-ssr-reloading','split','shift','data-qdssr-str','addClass','qd-ssr-loading','qd-ssr2-loading','removeAttr','disabled','html','getAjaxOptions','trigger','ajaxError','removeClass','Problemas\x20:(\x20.\x20Detalhes:\x20','optionIsChecked','select[data-qdssr-ndx=','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','cache','script:not([src])','innerHTML','buscapagina','match','pop','push','getCategory','extend','function','QD_SelectSmartResearch2','object','error','undefined','info','warn','unshift','[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a','alerta','aviso','toLowerCase','apply','join','Selecione\x20o\x20anterior','Selecione\x20o(a)\x20','location','href','find','.search-single-navigator\x20ul.','attr','data-qdssr-title','text','trim','h5.','\x20+ul\x20.filtro-ativo:first','Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','options','length','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','each','QuatroDigital.ssrSelectAjaxPopulated','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','message','qd-ssr2-loaded','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','index','<div\x20class=\x22qd-ssr2-option-wrapper\x22>'];(function(_0x321bb2,_0x202794){var _0x9c12ed=function(_0x263dd3){while(--_0x263dd3){_0x321bb2['push'](_0x321bb2['shift']());}};_0x9c12ed(++_0x202794);}(_0x466a,0x8e));var _0xa466=function(_0x58f6b2,_0x1b2b69){_0x58f6b2=_0x58f6b2-0x0;var _0x367f28=_0x466a[_0x58f6b2];return _0x367f28;};(function(_0x2341bb){var _0x8f0e73=jQuery;if(_0xa466('0x0')!==typeof _0x8f0e73['fn'][_0xa466('0x1')]){_0x8f0e73['fn']['QD_SelectSmartResearch2']=function(){};var _0x2c5277=function(_0x49df13,_0x3a893f){if(_0xa466('0x2')===typeof console&&'undefined'!==typeof console[_0xa466('0x3')]&&_0xa466('0x4')!==typeof console[_0xa466('0x5')]&&'undefined'!==typeof console[_0xa466('0x6')]){var _0xd4fb77;'object'===typeof _0x49df13?(_0x49df13[_0xa466('0x7')](_0xa466('0x8')),_0xd4fb77=_0x49df13):_0xd4fb77=[_0xa466('0x8')+_0x49df13];if(_0xa466('0x4')===typeof _0x3a893f||_0xa466('0x9')!==_0x3a893f['toLowerCase']()&&_0xa466('0xa')!==_0x3a893f[_0xa466('0xb')]())if(_0xa466('0x4')!==typeof _0x3a893f&&'info'===_0x3a893f[_0xa466('0xb')]())try{console[_0xa466('0x5')][_0xa466('0xc')](console,_0xd4fb77);}catch(_0x415397){try{console[_0xa466('0x5')](_0xd4fb77[_0xa466('0xd')]('\x0a'));}catch(_0x5e28e7){}}else try{console[_0xa466('0x3')][_0xa466('0xc')](console,_0xd4fb77);}catch(_0x2f0e1e){try{console[_0xa466('0x3')](_0xd4fb77['join']('\x0a'));}catch(_0x504e62){}}else try{console['warn']['apply'](console,_0xd4fb77);}catch(_0x117d15){try{console[_0xa466('0x6')](_0xd4fb77['join']('\x0a'));}catch(_0x3bde40){}}}},_0x34121a={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x16160e,_0x3c8c49,_0x25fc2f){return _0xa466('0xe');},'labelMessage':function(_0x296134,_0x460e7e,_0x417dea){return _0xa466('0xf')+_0x417dea[_0x296134];},'redirect':function(_0x2b195d){window[_0xa466('0x10')][_0xa466('0x11')]=_0x2b195d;},'getAjaxOptions':function(_0x4434f4,_0x38c7ce){var _0x25431c=[];_0x8f0e73(_0x4434f4)[_0xa466('0x12')](_0xa466('0x13')+_0x38c7ce[_0xa466('0x14')](_0xa466('0x15')))[_0xa466('0x12')]('a')['each'](function(){var _0x38c7ce=_0x8f0e73(this);_0x25431c['push']([_0x38c7ce[_0xa466('0x16')]()[_0xa466('0x17')](),_0x38c7ce[_0xa466('0x14')](_0xa466('0x11'))||'']);});return _0x25431c;},'optionIsChecked':function(_0xd12614){_0xd12614=_0x8f0e73(_0xa466('0x18')+_0xd12614+_0xa466('0x19'))[_0xa466('0x16')]()['trim']();return _0xd12614['length']?_0xd12614:null;},'ajaxError':function(){_0x2c5277(_0xa466('0x1a'));}};_0x2341bb=function(_0x154984){var _0x2de30b={'z':_0xa466('0x1b')};return function(_0x5f04a7){var _0x635b47=function(_0x363a21){return _0x363a21;};var _0x38e608=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5f04a7=_0x5f04a7['d'+_0x38e608[0x10]+'c'+_0x38e608[0x11]+'m'+_0x635b47(_0x38e608[0x1])+'n'+_0x38e608[0xd]]['l'+_0x38e608[0x12]+'c'+_0x38e608[0x0]+'ti'+_0x635b47('o')+'n'];var _0x41bffd=function(_0x5eecdb){return escape(encodeURIComponent(_0x5eecdb['replace'](/\./g,'¨')[_0xa466('0x1c')](/[a-zA-Z]/g,function(_0x5a36da){return String[_0xa466('0x1d')](('Z'>=_0x5a36da?0x5a:0x7a)>=(_0x5a36da=_0x5a36da[_0xa466('0x1e')](0x0)+0xd)?_0x5a36da:_0x5a36da-0x1a);})));};var _0x3ffdda=_0x41bffd(_0x5f04a7[[_0x38e608[0x9],_0x635b47('o'),_0x38e608[0xc],_0x38e608[_0x635b47(0xd)]][_0xa466('0xd')]('')]);_0x41bffd=_0x41bffd((window[['js',_0x635b47('no'),'m',_0x38e608[0x1],_0x38e608[0x4][_0xa466('0x1f')](),'ite'][_0xa466('0xd')]('')]||_0xa466('0x20'))+['.v',_0x38e608[0xd],'e',_0x635b47('x'),'co',_0x635b47('mm'),_0xa466('0x21'),_0x38e608[0x1],'.c',_0x635b47('o'),'m.',_0x38e608[0x13],'r'][_0xa466('0xd')](''));for(var _0x48f3d9 in _0x2de30b){if(_0x41bffd===_0x48f3d9+_0x2de30b[_0x48f3d9]||_0x3ffdda===_0x48f3d9+_0x2de30b[_0x48f3d9]){var _0x9d3b83='tr'+_0x38e608[0x11]+'e';break;}_0x9d3b83='f'+_0x38e608[0x0]+'ls'+_0x635b47(_0x38e608[0x1])+'';}_0x635b47=!0x1;-0x1<_0x5f04a7[[_0x38e608[0xc],'e',_0x38e608[0x0],'rc',_0x38e608[0x9]][_0xa466('0xd')]('')][_0xa466('0x22')](_0xa466('0x23'))&&(_0x635b47=!0x0);return[_0x9d3b83,_0x635b47];}(_0x154984);}(window);if(!eval(_0x2341bb[0x0]))return _0x2341bb[0x1]?_0x2c5277('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x8f0e73['QD_SelectSmartResearch2']=function(_0x16b0af,_0x368341){if(!_0x368341[_0xa466('0x24')][_0xa466('0x25')])return _0x2c5277(_0xa466('0x26'));_0x16b0af[_0xa466('0x27')](function(){try{var _0x10c0b4=_0x8f0e73(this),_0x25ed68=_0x6dab0f(_0x10c0b4,_0x368341,_0x16b0af);_0x1f5ead(_0x10c0b4,_0x368341,0x0);_0x25ed68['on'](_0xa466('0x28'),function(_0x5b82ba,_0x24a548){try{_0x1f5ead(_0x10c0b4,_0x368341,_0x24a548[_0xa466('0x14')](_0xa466('0x29')));}catch(_0x2e6f2c){_0x2c5277(_0xa466('0x2a')+_0x2e6f2c[_0xa466('0x2b')]);}});_0x10c0b4['addClass'](_0xa466('0x2c'));}catch(_0xa009ed){_0x2c5277(_0xa466('0x2d')+_0xa009ed[_0xa466('0x2b')]);}});};var _0x6dab0f=function(_0x3c18c5,_0x51520a,_0x152acd){try{for(var _0x11975b='',_0x426631,_0x2341bb=!0x0,_0x27d022=new _0x8f0e73(),_0x322864=!0x1,_0xd7ad8c=0x0,_0x15dfc9=0x0;_0x15dfc9<_0x51520a[_0xa466('0x24')][_0xa466('0x25')];_0x15dfc9++){'object'!==typeof _0x51520a['options'][_0x15dfc9]&&(_0x2341bb=!0x1);var _0x1515c8=_0x51520a['optionsPlaceHolder'][_0x15dfc9]||'',_0x113316=_0x152acd[_0xa466('0x2e')](_0x3c18c5);_0x11975b=_0xa466('0x2f');_0x11975b+=_0xa466('0x30')+_0x15dfc9+_0x113316+'\x22>'+_0x51520a[_0xa466('0x31')](_0x15dfc9,_0x51520a[_0xa466('0x24')],_0x51520a[_0xa466('0x32')])+_0xa466('0x33');_0x11975b+='<select\x20data-qdssr-ndx=\x22'+_0x15dfc9+_0xa466('0x34')+_0x15dfc9+_0x113316+_0xa466('0x35')+_0x1515c8+'\x22>';_0x11975b+=_0xa466('0x36');_0x2341bb?_0x11975b+=_0x3243c2(_0x51520a[_0xa466('0x24')][_0x15dfc9]):_0x1515c8=_0x51520a[_0xa466('0x37')](_0x15dfc9,_0x51520a[_0xa466('0x24')],_0x51520a[_0xa466('0x32')]);_0x11975b+=_0xa466('0x38');_0x426631=_0x8f0e73(_0x11975b);_0x426631[_0xa466('0x39')](_0x3c18c5);var _0x292689=_0x426631[_0xa466('0x12')](_0xa466('0x3a'));_0x27d022=_0x27d022[_0xa466('0x3b')](_0x292689);_0x2341bb||_0x292689[_0xa466('0x14')]({'disabled':!0x0,'data-qdssr-str':_0x51520a[_0xa466('0x24')][_0x15dfc9]});_0x292689[_0xa466('0x3c')]({'placeholder':_0x1515c8,'language':_0xa466('0x3d')});_0x292689['bind'](_0xa466('0x3e'),function(_0x1625f2,_0xfc0e42){var _0x5ab80b=_0x8f0e73(this),_0x351e23=_0x3c18c5[_0xa466('0x12')]('select[data-qdssr-ndx='+(parseInt(_0x5ab80b[_0xa466('0x14')](_0xa466('0x29'))||0x0,0xa)+0x1)+']'),_0x2341bb=(_0x5ab80b[_0xa466('0x3f')]()||'')[_0xa466('0x17')]();_0xfc0e42||(_0x322864=!0x0);_0x8f0e73(window)['trigger'](_0xa466('0x40'),[_0x351e23,_0x322864]);!_0x351e23[_0xa466('0x25')]&&(!_0xfc0e42||_0x322864&&_0x2341bb[_0xa466('0x25')])&&(_0x8f0e73(document[_0xa466('0x41')])['addClass'](_0xa466('0x42')),_0x51520a['redirect'](_0x2341bb));_0x2341bb=_0x2341bb[_0xa466('0x43')]('#')[_0xa466('0x44')]()['split']('?');_0x2341bb[0x1]=(_0x351e23['attr'](_0xa466('0x45'))||'')+'&'+(_0x2341bb[0x1]||'');_0x8f0e73(document[_0xa466('0x41')])[_0xa466('0x46')](_0xa466('0x47'));_0x426631[_0xa466('0x46')](_0xa466('0x48'));_0xd7ad8c+=0x1;_0x8f0e73['qdAjax']({'url':_0x2341bb[_0xa466('0xd')]('?'),'dataType':'html','success':function(_0x278918){_0x351e23[_0xa466('0x49')](_0xa466('0x4a'));_0x351e23[_0xa466('0x4b')](_0xa466('0x36')+_0x3243c2(_0x51520a[_0xa466('0x4c')](_0x278918,_0x351e23)));_0x351e23[_0xa466('0x3c')]({'placeholder':_0x351e23['attr'](_0xa466('0x15'))});_0x5ab80b[_0xa466('0x4d')](_0xa466('0x28'),[_0x351e23]);},'error':function(){_0x51520a[_0xa466('0x4e')][_0xa466('0xc')](this,arguments);},'complete':function(){_0x426631[_0xa466('0x4f')](_0xa466('0x48'));--_0xd7ad8c;0x0==_0xd7ad8c&&_0x8f0e73(document['body'])[_0xa466('0x4f')](_0xa466('0x47'));},'clearQueueDelay':null});});}return _0x27d022;}catch(_0x1e932e){_0x2c5277(_0xa466('0x50')+_0x1e932e[_0xa466('0x2b')]);}},_0x1f5ead=function(_0x205507,_0x32cc99,_0x3e879e,_0x441a00){_0x32cc99=_0x32cc99[_0xa466('0x51')](_0x32cc99[_0xa466('0x32')][_0x3e879e]);null!==_0x32cc99&&(_0x441a00=_0x441a00||_0x205507[_0xa466('0x12')](_0xa466('0x52')+_0x3e879e+']'),_0x441a00[_0xa466('0x3f')](_0x441a00[_0xa466('0x12')](_0xa466('0x53')+_0x32cc99+'\x27]')['val']())[_0xa466('0x4d')]('change',!0x0));},_0x3243c2=function(_0x5c800e){for(var _0x5bae9f='',_0x3266f0=0x0;_0x3266f0<_0x5c800e[_0xa466('0x25')];_0x3266f0++)_0x5bae9f+=_0xa466('0x54')+(_0x5c800e[_0x3266f0][0x1]||'')+_0xa466('0x55')+(_0x5c800e[_0x3266f0][0x0]||'')[_0xa466('0x1c')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x5c800e[_0x3266f0][0x0]||'')+'</option>';return _0x5bae9f;};_0x8f0e73['QD_SelectSmartResearch2']['getCategory']=function(){if(_0x8f0e73[_0xa466('0x1')]['getCategory'][_0xa466('0x56')])return _0x8f0e73[_0xa466('0x1')]['getCategory']['cache'];var _0xebb8e7=[],_0x288831=[];_0x8f0e73(_0xa466('0x57'))[_0xa466('0x27')](function(){var _0x3fc289=_0x8f0e73(this)[0x0][_0xa466('0x58')];if(-0x1<_0x3fc289['indexOf'](_0xa466('0x59')))return _0xebb8e7=(decodeURIComponent((_0x3fc289[_0xa466('0x5a')](/\/buscapagina([^\'\"]+)/i)||[''])[_0xa466('0x5b')]())['match'](/fq=c:[^\&]+/i)||[''])[_0xa466('0x5b')]()[_0xa466('0x43')](':')[_0xa466('0x5b')]()['replace'](/(^\/|\/$)/g,'')[_0xa466('0x43')]('/'),!0x1;});for(var _0x2ff3bc=0x0;_0x2ff3bc<_0xebb8e7[_0xa466('0x25')];_0x2ff3bc++)_0xebb8e7[_0x2ff3bc][_0xa466('0x25')]&&_0x288831[_0xa466('0x5c')](_0xebb8e7[_0x2ff3bc]);return _0x8f0e73[_0xa466('0x1')][_0xa466('0x5d')][_0xa466('0x56')]=_0x288831;};_0x8f0e73[_0xa466('0x1')][_0xa466('0x5d')][_0xa466('0x56')]=null;_0x8f0e73['fn'][_0xa466('0x1')]=function(_0x56600a){var _0xf8d1b3=_0x8f0e73(this);if(!_0xf8d1b3[_0xa466('0x25')])return _0xf8d1b3;_0x56600a=_0x8f0e73[_0xa466('0x5e')]({},_0x34121a,_0x56600a);_0xf8d1b3['qdPlugin']=new _0x8f0e73[(_0xa466('0x1'))](_0xf8d1b3,_0x56600a);return _0xf8d1b3;};_0x8f0e73(function(){_0x8f0e73('.qd_auto_select_smart_research_2')[_0xa466('0x1')]();});}}(this));