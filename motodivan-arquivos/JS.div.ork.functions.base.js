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
			wrapper.find('.qd-am-column >ul').show().hide(); // o js precisa calcular a altura do elemento para exibir depois

			var linksWithDropdown = wrapper.find('.qd-am-column.qd-am-has-ul');		

			linksWithDropdown.find('>a, >p').click(function(e) {
				$(this).toggleClass('qd-am-open').find('+ul').slideToggle().toggleClass('qd-am-open');
				e.preventDefault();
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
var _0x222f=['clone','insertBefore','qd-am-content-loaded','trim','[class*=\x27colunas\x27]','hide','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20menu.\x20A\x20url\x20\x27','\x27\x20falho.','ajaxCallback','call','QuatroDigital.am.ajaxCallback','ul[itemscope]','qd-am-has-ul','qd-am-elem-','text','qdAmAddNdx','qd-amazing-menu','>ul','>li','qd-am-column','qd-am-dropdown','children','qd-am-level-','add','qd-am-','-li','trigger','extend','exec','.qd_amazing_menu_auto','getParent','closest','function','QD_amazingMenu','/qd-amazing-menu','object','undefined','info','warn','unshift','[QD\x20Amazing\x20Menu]\x0a','alerta','toLowerCase','aviso','apply','join','error','each','addClass','qd-am-li-','first','last','qd-am-last','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','replace','fromCharCode','charCodeAt','toUpperCase','---','erc','indexOf','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','find','.qd_am_code','filter','.qd-am-banner','.qd-am-collection','length','parent','qd-am-collection-wrapper','qdAjax','url','html','img[alt=\x27','attr','data-qdam-value','.box-banner'];(function(_0x344451,_0x2eaddf){var _0x5d38b0=function(_0x4bf7fa){while(--_0x4bf7fa){_0x344451['push'](_0x344451['shift']());}};_0x5d38b0(++_0x2eaddf);}(_0x222f,0x1a4));var _0xf222=function(_0x4e00d4,_0xdb24a3){_0x4e00d4=_0x4e00d4-0x0;var _0x335d2c=_0x222f[_0x4e00d4];return _0x335d2c;};(function(_0x503e5b){_0x503e5b['fn'][_0xf222('0x0')]=_0x503e5b['fn'][_0xf222('0x1')];}(jQuery));(function(_0x15fc34){var _0x4d09ec;var _0x4b4237=jQuery;if(_0xf222('0x2')!==typeof _0x4b4237['fn'][_0xf222('0x3')]){var _0x307791={'url':_0xf222('0x4'),'callback':function(){},'ajaxCallback':function(){}};var _0x59a619=function(_0x3a2751,_0x54a758){if(_0xf222('0x5')===typeof console&&_0xf222('0x6')!==typeof console['error']&&_0xf222('0x6')!==typeof console[_0xf222('0x7')]&&'undefined'!==typeof console[_0xf222('0x8')]){var _0x32d6d3;_0xf222('0x5')===typeof _0x3a2751?(_0x3a2751[_0xf222('0x9')](_0xf222('0xa')),_0x32d6d3=_0x3a2751):_0x32d6d3=[_0xf222('0xa')+_0x3a2751];if('undefined'===typeof _0x54a758||_0xf222('0xb')!==_0x54a758[_0xf222('0xc')]()&&_0xf222('0xd')!==_0x54a758[_0xf222('0xc')]())if('undefined'!==typeof _0x54a758&&_0xf222('0x7')===_0x54a758[_0xf222('0xc')]())try{console[_0xf222('0x7')][_0xf222('0xe')](console,_0x32d6d3);}catch(_0x12f968){try{console[_0xf222('0x7')](_0x32d6d3[_0xf222('0xf')]('\x0a'));}catch(_0x17df25){}}else try{console['error']['apply'](console,_0x32d6d3);}catch(_0x1feb86){try{console[_0xf222('0x10')](_0x32d6d3['join']('\x0a'));}catch(_0x39be58){}}else try{console[_0xf222('0x8')][_0xf222('0xe')](console,_0x32d6d3);}catch(_0x4392a0){try{console[_0xf222('0x8')](_0x32d6d3[_0xf222('0xf')]('\x0a'));}catch(_0x30b646){}}}};_0x4b4237['fn']['qdAmAddNdx']=function(){var _0x1efa9f=_0x4b4237(this);_0x1efa9f[_0xf222('0x11')](function(_0x8783ab){_0x4b4237(this)[_0xf222('0x12')](_0xf222('0x13')+_0x8783ab);});_0x1efa9f[_0xf222('0x14')]()[_0xf222('0x12')]('qd-am-first');_0x1efa9f[_0xf222('0x15')]()[_0xf222('0x12')](_0xf222('0x16'));return _0x1efa9f;};_0x4b4237['fn'][_0xf222('0x3')]=function(){};_0x15fc34=function(_0x5dba6e){var _0x5cd899={'z':_0xf222('0x17')};return function(_0x3e8875){var _0x201cf0=function(_0x33406d){return _0x33406d;};var _0x35539d=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x3e8875=_0x3e8875['d'+_0x35539d[0x10]+'c'+_0x35539d[0x11]+'m'+_0x201cf0(_0x35539d[0x1])+'n'+_0x35539d[0xd]]['l'+_0x35539d[0x12]+'c'+_0x35539d[0x0]+'ti'+_0x201cf0('o')+'n'];var _0x151a89=function(_0x51b872){return escape(encodeURIComponent(_0x51b872[_0xf222('0x18')](/\./g,'¨')[_0xf222('0x18')](/[a-zA-Z]/g,function(_0x4d3bf4){return String[_0xf222('0x19')](('Z'>=_0x4d3bf4?0x5a:0x7a)>=(_0x4d3bf4=_0x4d3bf4[_0xf222('0x1a')](0x0)+0xd)?_0x4d3bf4:_0x4d3bf4-0x1a);})));};var _0x2d18ab=_0x151a89(_0x3e8875[[_0x35539d[0x9],_0x201cf0('o'),_0x35539d[0xc],_0x35539d[_0x201cf0(0xd)]][_0xf222('0xf')]('')]);_0x151a89=_0x151a89((window[['js',_0x201cf0('no'),'m',_0x35539d[0x1],_0x35539d[0x4][_0xf222('0x1b')](),'ite'][_0xf222('0xf')]('')]||_0xf222('0x1c'))+['.v',_0x35539d[0xd],'e',_0x201cf0('x'),'co',_0x201cf0('mm'),_0xf222('0x1d'),_0x35539d[0x1],'.c',_0x201cf0('o'),'m.',_0x35539d[0x13],'r'][_0xf222('0xf')](''));for(var _0x4305e0 in _0x5cd899){if(_0x151a89===_0x4305e0+_0x5cd899[_0x4305e0]||_0x2d18ab===_0x4305e0+_0x5cd899[_0x4305e0]){var _0x3e2a1c='tr'+_0x35539d[0x11]+'e';break;}_0x3e2a1c='f'+_0x35539d[0x0]+'ls'+_0x201cf0(_0x35539d[0x1])+'';}_0x201cf0=!0x1;-0x1<_0x3e8875[[_0x35539d[0xc],'e',_0x35539d[0x0],'rc',_0x35539d[0x9]][_0xf222('0xf')]('')][_0xf222('0x1e')](_0xf222('0x1f'))&&(_0x201cf0=!0x0);return[_0x3e2a1c,_0x201cf0];}(_0x5dba6e);}(window);if(!eval(_0x15fc34[0x0]))return _0x15fc34[0x1]?_0x59a619(_0xf222('0x20')):!0x1;var _0x2a8310=function(_0x501f8e){var _0x14b2b1=_0x501f8e[_0xf222('0x21')](_0xf222('0x22'));var _0x2f04bf=_0x14b2b1[_0xf222('0x23')](_0xf222('0x24'));var _0x3789e0=_0x14b2b1[_0xf222('0x23')](_0xf222('0x25'));if(_0x2f04bf['length']||_0x3789e0[_0xf222('0x26')])_0x2f04bf[_0xf222('0x27')]()[_0xf222('0x12')]('qd-am-banner-wrapper'),_0x3789e0[_0xf222('0x27')]()['addClass'](_0xf222('0x28')),_0x4b4237[_0xf222('0x29')]({'url':_0x4d09ec[_0xf222('0x2a')],'dataType':_0xf222('0x2b'),'success':function(_0x37b4f7){var _0x152d79=_0x4b4237(_0x37b4f7);_0x2f04bf[_0xf222('0x11')](function(){var _0x37b4f7=_0x4b4237(this);var _0x58ba55=_0x152d79[_0xf222('0x21')](_0xf222('0x2c')+_0x37b4f7[_0xf222('0x2d')](_0xf222('0x2e'))+'\x27]');_0x58ba55[_0xf222('0x26')]&&(_0x58ba55[_0xf222('0x11')](function(){_0x4b4237(this)['getParent'](_0xf222('0x2f'))[_0xf222('0x30')]()[_0xf222('0x31')](_0x37b4f7);}),_0x37b4f7['hide']());})[_0xf222('0x12')](_0xf222('0x32'));_0x3789e0[_0xf222('0x11')](function(){var _0x37b4f7={};var _0x226d84=_0x4b4237(this);_0x152d79[_0xf222('0x21')]('h2')[_0xf222('0x11')](function(){if(_0x4b4237(this)['text']()[_0xf222('0x33')]()[_0xf222('0xc')]()==_0x226d84[_0xf222('0x2d')](_0xf222('0x2e'))[_0xf222('0x33')]()['toLowerCase']())return _0x37b4f7=_0x4b4237(this),!0x1;});_0x37b4f7[_0xf222('0x26')]&&(_0x37b4f7['each'](function(){_0x4b4237(this)[_0xf222('0x0')](_0xf222('0x34'))[_0xf222('0x30')]()['insertBefore'](_0x226d84);}),_0x226d84[_0xf222('0x35')]());})[_0xf222('0x12')]('qd-am-content-loaded');},'error':function(){_0x59a619(_0xf222('0x36')+_0x4d09ec['url']+_0xf222('0x37'));},'complete':function(){_0x4d09ec[_0xf222('0x38')][_0xf222('0x39')](this);_0x4b4237(window)['trigger'](_0xf222('0x3a'),_0x501f8e);},'clearQueueDelay':0xbb8});};_0x4b4237[_0xf222('0x3')]=function(_0x2c1e49){var _0x2cacca=_0x2c1e49[_0xf222('0x21')](_0xf222('0x3b'))['each'](function(){var _0x1ae1d4=_0x4b4237(this);if(!_0x1ae1d4[_0xf222('0x26')])return _0x59a619(['UL\x20do\x20menu\x20não\x20encontrada',_0x2c1e49],'alerta');_0x1ae1d4[_0xf222('0x21')]('li\x20>ul')[_0xf222('0x27')]()[_0xf222('0x12')](_0xf222('0x3c'));_0x1ae1d4[_0xf222('0x21')]('li')['each'](function(){var _0x55136f=_0x4b4237(this);var _0x205895=_0x55136f['children'](':not(ul)');_0x205895[_0xf222('0x26')]&&_0x55136f[_0xf222('0x12')](_0xf222('0x3d')+_0x205895[_0xf222('0x14')]()[_0xf222('0x3e')]()[_0xf222('0x33')]()['replaceSpecialChars']()[_0xf222('0x18')](/\./g,'')[_0xf222('0x18')](/\s/g,'-')['toLowerCase']());});var _0x2cc50d=_0x1ae1d4[_0xf222('0x21')]('>li')[_0xf222('0x3f')]();_0x1ae1d4['addClass'](_0xf222('0x40'));_0x2cc50d=_0x2cc50d[_0xf222('0x21')](_0xf222('0x41'));_0x2cc50d[_0xf222('0x11')](function(){var _0x3a3185=_0x4b4237(this);_0x3a3185[_0xf222('0x21')](_0xf222('0x42'))[_0xf222('0x3f')]()[_0xf222('0x12')](_0xf222('0x43'));_0x3a3185[_0xf222('0x12')]('qd-am-dropdown-menu');_0x3a3185['parent']()['addClass'](_0xf222('0x44'));});_0x2cc50d[_0xf222('0x12')](_0xf222('0x44'));var _0x3cf89b=0x0,_0x15fc34=function(_0x2e83be){_0x3cf89b+=0x1;_0x2e83be=_0x2e83be[_0xf222('0x45')]('li')[_0xf222('0x45')]('*');_0x2e83be[_0xf222('0x26')]&&(_0x2e83be['addClass'](_0xf222('0x46')+_0x3cf89b),_0x15fc34(_0x2e83be));};_0x15fc34(_0x1ae1d4);_0x1ae1d4[_0xf222('0x47')](_0x1ae1d4[_0xf222('0x21')]('ul'))[_0xf222('0x11')](function(){var _0x1d60e5=_0x4b4237(this);_0x1d60e5[_0xf222('0x12')](_0xf222('0x48')+_0x1d60e5[_0xf222('0x45')]('li')[_0xf222('0x26')]+_0xf222('0x49'));});});_0x2a8310(_0x2cacca);_0x4d09ec['callback']['call'](this);_0x4b4237(window)[_0xf222('0x4a')]('QuatroDigital.am.callback',_0x2c1e49);};_0x4b4237['fn'][_0xf222('0x3')]=function(_0x57e0da){var _0x191ef0=_0x4b4237(this);if(!_0x191ef0['length'])return _0x191ef0;_0x4d09ec=_0x4b4237[_0xf222('0x4b')]({},_0x307791,_0x57e0da);_0x191ef0[_0xf222('0x4c')]=new _0x4b4237[(_0xf222('0x3'))](_0x4b4237(this));return _0x191ef0;};_0x4b4237(function(){_0x4b4237(_0xf222('0x4d'))['QD_amazingMenu']();});}}(this));

/*  Automatizador de comments box do Facebook Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital Smart Cart */
var _0x00bb=['productAddedToCart.qdSbbVtex','abs','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','aviso','allowUpdate','QD_dropDownCart','bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','erc','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','name','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','click.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','keyup.qd_ddc_closeFn','.qd-ddc-prodWrapper','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','shippingCalculate','updateOnlyHover','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-infoTotal','.qd-ddc-shipping','shippingForm','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','smartCheckout','_QuatroDigital_AmountProduct','qd-ddc-prodLoaded','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','qd-ddc-','.qd-ddc-prodName','skuName','.qd-ddc-prodPrice','sellingPrice','.qd-ddc-quantity','.qd-ddc-remove','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','val','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','qd-loaded','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','click.qd_ddc_more','qd-loading','focusout.qd_ddc_change','keyup.qd_ddc_change','keyCode','click.qd_ddc_remove','removeProduct','stop','slideUp','remove','$1-$2$3','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','boolean','exec','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','input.qd-productId[value=','prodId','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd_bap_wrapper_content','.qdDdcContainer','dropDown','smartCart','getParent','closest','replace','undefined','pow','round','toFixed','length','join','function','trim','prototype','capitalize','charAt','toUpperCase','toLowerCase','000','slice','error','extend','object','data','toString','url','type','jqXHR','ajax','success','complete','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','qdAjax','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','meta[name=currency]','attr','content','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','value','total','shipping','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','.plural','addClass','removeClass','$this','show','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','html','itemsTextE','each','cartQttE','find','itemsText','emptyElem','emptyCart','qd-sc-populated','_QuatroDigital_DropDown','vtexjs','SDK','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','done','fail','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','href','#produto,\x20.produto','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','preventDefault','Método\x20descontinuado!','buyButton','.qd-sbb-on','qd-sbb-on','.remove-href','qd-bb-active','children','.qd-bb-productAdded','append','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','unbind','click','mouseenter.qd_bb_buy_sc','load','clickBuySmartCheckout','indexOf','selectSkuMsg','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','match','productPageCallback','prodAdd','split','ku=','pop','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','buyButtonClickCallback','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','QD_buyButton','.qd-bb-itemAddWrapper','prepend','QuatroDigital.qd_bb_prod_add','ajaxSend','/checkout/cart/add'];(function(_0x3b48ae,_0x568dd3){var _0x29c21a=function(_0x404f93){while(--_0x404f93){_0x3b48ae['push'](_0x3b48ae['shift']());}};_0x29c21a(++_0x568dd3);}(_0x00bb,0x1d8));var _0xb00b=function(_0xc6be3a,_0x540e05){_0xc6be3a=_0xc6be3a-0x0;var _0x56a310=_0x00bb[_0xc6be3a];return _0x56a310;};(function(_0x4b870b){_0x4b870b['fn'][_0xb00b('0x0')]=_0x4b870b['fn'][_0xb00b('0x1')];}(jQuery));function qd_number_format(_0x54f40d,_0x170f94,_0x47a3bf,_0x278c5e){_0x54f40d=(_0x54f40d+'')[_0xb00b('0x2')](/[^0-9+\-Ee.]/g,'');_0x54f40d=isFinite(+_0x54f40d)?+_0x54f40d:0x0;_0x170f94=isFinite(+_0x170f94)?Math['abs'](_0x170f94):0x0;_0x278c5e=_0xb00b('0x3')===typeof _0x278c5e?',':_0x278c5e;_0x47a3bf=_0xb00b('0x3')===typeof _0x47a3bf?'.':_0x47a3bf;var _0x532ffb='',_0x532ffb=function(_0x36e363,_0xf737d0){var _0x170f94=Math[_0xb00b('0x4')](0xa,_0xf737d0);return''+(Math[_0xb00b('0x5')](_0x36e363*_0x170f94)/_0x170f94)[_0xb00b('0x6')](_0xf737d0);},_0x532ffb=(_0x170f94?_0x532ffb(_0x54f40d,_0x170f94):''+Math['round'](_0x54f40d))['split']('.');0x3<_0x532ffb[0x0][_0xb00b('0x7')]&&(_0x532ffb[0x0]=_0x532ffb[0x0][_0xb00b('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x278c5e));(_0x532ffb[0x1]||'')[_0xb00b('0x7')]<_0x170f94&&(_0x532ffb[0x1]=_0x532ffb[0x1]||'',_0x532ffb[0x1]+=Array(_0x170f94-_0x532ffb[0x1][_0xb00b('0x7')]+0x1)[_0xb00b('0x8')]('0'));return _0x532ffb['join'](_0x47a3bf);};_0xb00b('0x9')!==typeof String['prototype']['trim']&&(String['prototype'][_0xb00b('0xa')]=function(){return this[_0xb00b('0x2')](/^\s+|\s+$/g,'');});_0xb00b('0x9')!=typeof String[_0xb00b('0xb')][_0xb00b('0xc')]&&(String[_0xb00b('0xb')]['capitalize']=function(){return this[_0xb00b('0xd')](0x0)[_0xb00b('0xe')]()+this['slice'](0x1)[_0xb00b('0xf')]();});(function(_0x1084a6){if('function'!==typeof _0x1084a6['qdAjax']){var _0x9b471e={};_0x1084a6['qdAjaxQueue']=_0x9b471e;0x96>parseInt((_0x1084a6['fn']['jquery'][_0xb00b('0x2')](/[^0-9]+/g,'')+_0xb00b('0x10'))[_0xb00b('0x11')](0x0,0x3),0xa)&&console&&_0xb00b('0x9')==typeof console['error']&&console[_0xb00b('0x12')]();_0x1084a6['qdAjax']=function(_0x415f91){try{var _0x5aa9a0=_0x1084a6[_0xb00b('0x13')]({},{'url':'','type':'GET','data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x415f91);var _0xb26ebb=_0xb00b('0x14')===typeof _0x5aa9a0['data']?JSON['stringify'](_0x5aa9a0[_0xb00b('0x15')]):_0x5aa9a0['data'][_0xb00b('0x16')]();var _0x43da66=encodeURIComponent(_0x5aa9a0[_0xb00b('0x17')]+'|'+_0x5aa9a0[_0xb00b('0x18')]+'|'+_0xb26ebb);_0x9b471e[_0x43da66]=_0x9b471e[_0x43da66]||{};'undefined'==typeof _0x9b471e[_0x43da66][_0xb00b('0x19')]?_0x9b471e[_0x43da66]['jqXHR']=_0x1084a6[_0xb00b('0x1a')](_0x5aa9a0):(_0x9b471e[_0x43da66][_0xb00b('0x19')]['done'](_0x5aa9a0[_0xb00b('0x1b')]),_0x9b471e[_0x43da66][_0xb00b('0x19')]['fail'](_0x5aa9a0[_0xb00b('0x12')]),_0x9b471e[_0x43da66][_0xb00b('0x19')]['always'](_0x5aa9a0[_0xb00b('0x1c')]));_0x9b471e[_0x43da66][_0xb00b('0x19')][_0xb00b('0x1d')](function(){isNaN(parseInt(_0x5aa9a0[_0xb00b('0x1e')]))||setTimeout(function(){_0x9b471e[_0x43da66]['jqXHR']=void 0x0;},_0x5aa9a0['clearQueueDelay']);});return _0x9b471e[_0x43da66][_0xb00b('0x19')];}catch(_0x490380){'undefined'!==typeof console&&'function'===typeof console[_0xb00b('0x12')]&&console[_0xb00b('0x12')](_0xb00b('0x1f')+_0x490380[_0xb00b('0x20')]);}};_0x1084a6[_0xb00b('0x21')][_0xb00b('0x22')]=_0xb00b('0x23');}}(jQuery));(function(_0x4a8d2b){_0x4a8d2b['fn'][_0xb00b('0x0')]=_0x4a8d2b['fn']['closest'];}(jQuery));(function(){var _0x450129=jQuery;if(_0xb00b('0x9')!==typeof _0x450129['fn'][_0xb00b('0x24')]){_0x450129(function(){var _0x5b987e=vtexjs[_0xb00b('0x25')][_0xb00b('0x26')];vtexjs[_0xb00b('0x25')][_0xb00b('0x26')]=function(){return _0x5b987e[_0xb00b('0x27')]();};});try{window[_0xb00b('0x28')]=window[_0xb00b('0x28')]||{};window[_0xb00b('0x28')][_0xb00b('0x29')]=!0x1;_0x450129['fn']['simpleCart']=function(_0x2b5f41,_0x44918d,_0x49078d){var _0x593659=function(_0x2f3b37,_0x5a5e5a){if(_0xb00b('0x14')===typeof console){var _0x4d2ee5=_0xb00b('0x14')===typeof _0x2f3b37;_0xb00b('0x3')!==typeof _0x5a5e5a&&_0xb00b('0x2a')===_0x5a5e5a[_0xb00b('0xf')]()?_0x4d2ee5?console[_0xb00b('0x2b')](_0xb00b('0x2c'),_0x2f3b37[0x0],_0x2f3b37[0x1],_0x2f3b37[0x2],_0x2f3b37[0x3],_0x2f3b37[0x4],_0x2f3b37[0x5],_0x2f3b37[0x6],_0x2f3b37[0x7]):console[_0xb00b('0x2b')]('[Simple\x20Cart]\x0a'+_0x2f3b37):'undefined'!==typeof _0x5a5e5a&&'info'===_0x5a5e5a[_0xb00b('0xf')]()?_0x4d2ee5?console[_0xb00b('0x2d')](_0xb00b('0x2c'),_0x2f3b37[0x0],_0x2f3b37[0x1],_0x2f3b37[0x2],_0x2f3b37[0x3],_0x2f3b37[0x4],_0x2f3b37[0x5],_0x2f3b37[0x6],_0x2f3b37[0x7]):console[_0xb00b('0x2d')]('[Simple\x20Cart]\x0a'+_0x2f3b37):_0x4d2ee5?console[_0xb00b('0x12')](_0xb00b('0x2c'),_0x2f3b37[0x0],_0x2f3b37[0x1],_0x2f3b37[0x2],_0x2f3b37[0x3],_0x2f3b37[0x4],_0x2f3b37[0x5],_0x2f3b37[0x6],_0x2f3b37[0x7]):console[_0xb00b('0x12')](_0xb00b('0x2c')+_0x2f3b37);}};var _0x261c80=_0x450129(this);_0xb00b('0x14')===typeof _0x2b5f41?_0x44918d=_0x2b5f41:(_0x2b5f41=_0x2b5f41||!0x1,_0x261c80=_0x261c80[_0xb00b('0x2e')](_0x450129[_0xb00b('0x2f')]['elements']));if(!_0x261c80['length'])return _0x261c80;_0x450129[_0xb00b('0x2f')]['elements']=_0x450129[_0xb00b('0x2f')][_0xb00b('0x30')][_0xb00b('0x2e')](_0x261c80);_0x49078d=_0xb00b('0x3')===typeof _0x49078d?!0x1:_0x49078d;var _0x37c017={'cartQtt':_0xb00b('0x31'),'cartTotal':_0xb00b('0x32'),'itemsText':'.qd_items_text','currencySymbol':(_0x450129(_0xb00b('0x33'))[_0xb00b('0x34')](_0xb00b('0x35'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0xd9c03f=_0x450129[_0xb00b('0x13')]({},_0x37c017,_0x44918d);var _0x2f8786=_0x450129('');_0x261c80['each'](function(){var _0x36980a=_0x450129(this);_0x36980a[_0xb00b('0x15')]('qd_simpleCartOpts')||_0x36980a[_0xb00b('0x15')](_0xb00b('0x36'),_0xd9c03f);});var _0xa2ae04=function(_0x2d8620){window[_0xb00b('0x37')]=window['_QuatroDigital_CartData']||{};for(var _0x2b5f41=0x0,_0xe4b5b6=0x0,_0xb76ede=0x0;_0xb76ede<_0x2d8620[_0xb00b('0x38')]['length'];_0xb76ede++)'Shipping'==_0x2d8620[_0xb00b('0x38')][_0xb76ede]['id']&&(_0xe4b5b6+=_0x2d8620[_0xb00b('0x38')][_0xb76ede][_0xb00b('0x39')]),_0x2b5f41+=_0x2d8620[_0xb00b('0x38')][_0xb76ede][_0xb00b('0x39')];window[_0xb00b('0x37')][_0xb00b('0x3a')]=_0xd9c03f['currencySymbol']+qd_number_format(_0x2b5f41/0x64,0x2,',','.');window[_0xb00b('0x37')][_0xb00b('0x3b')]=_0xd9c03f[_0xb00b('0x3c')]+qd_number_format(_0xe4b5b6/0x64,0x2,',','.');window[_0xb00b('0x37')][_0xb00b('0x3d')]=_0xd9c03f[_0xb00b('0x3c')]+qd_number_format((_0x2b5f41+_0xe4b5b6)/0x64,0x2,',','.');window[_0xb00b('0x37')][_0xb00b('0x3e')]=0x0;if(_0xd9c03f[_0xb00b('0x3f')])for(_0xb76ede=0x0;_0xb76ede<_0x2d8620[_0xb00b('0x40')][_0xb00b('0x7')];_0xb76ede++)window[_0xb00b('0x37')]['qtt']+=_0x2d8620[_0xb00b('0x40')][_0xb76ede][_0xb00b('0x41')];else window[_0xb00b('0x37')][_0xb00b('0x3e')]=_0x2d8620[_0xb00b('0x40')][_0xb00b('0x7')]||0x0;try{window[_0xb00b('0x37')][_0xb00b('0x42')]&&window[_0xb00b('0x37')][_0xb00b('0x42')][_0xb00b('0x43')]&&window[_0xb00b('0x37')]['callback']['fire']();}catch(_0x47c6c0){_0x593659(_0xb00b('0x44'));}_0x57f6ab(_0x2f8786);};var _0x23d858=function(_0x481154,_0x31cee1){0x1===_0x481154?_0x31cee1[_0xb00b('0x45')]()[_0xb00b('0x46')](_0xb00b('0x47'))['show']():_0x31cee1['hide']()[_0xb00b('0x46')](_0xb00b('0x48'))['show']();};var _0x514c5b=function(_0x154759){0x1>_0x154759?_0x261c80[_0xb00b('0x49')]('qd-emptyCart'):_0x261c80[_0xb00b('0x4a')]('qd-emptyCart');};var _0x4bc61e=function(_0x4bcc9e,_0x465d90){var _0x481515=parseInt(window[_0xb00b('0x37')][_0xb00b('0x3e')],0xa);_0x465d90[_0xb00b('0x4b')][_0xb00b('0x4c')]();isNaN(_0x481515)&&(_0x593659(_0xb00b('0x4d'),_0xb00b('0x2a')),_0x481515=0x0);_0x465d90['cartTotalE']['html'](window[_0xb00b('0x37')][_0xb00b('0x3a')]);_0x465d90['cartQttE'][_0xb00b('0x4e')](_0x481515);_0x23d858(_0x481515,_0x465d90[_0xb00b('0x4f')]);_0x514c5b(_0x481515);};var _0x57f6ab=function(_0x15dcbf){_0x261c80[_0xb00b('0x50')](function(){var _0x3b5d82={};var _0x498f95=_0x450129(this);_0x2b5f41&&_0x498f95['data'](_0xb00b('0x36'))&&_0x450129[_0xb00b('0x13')](_0xd9c03f,_0x498f95[_0xb00b('0x15')](_0xb00b('0x36')));_0x3b5d82['$this']=_0x498f95;_0x3b5d82[_0xb00b('0x51')]=_0x498f95[_0xb00b('0x52')](_0xd9c03f['cartQtt'])||_0x2f8786;_0x3b5d82['cartTotalE']=_0x498f95[_0xb00b('0x52')](_0xd9c03f['cartTotal'])||_0x2f8786;_0x3b5d82[_0xb00b('0x4f')]=_0x498f95[_0xb00b('0x52')](_0xd9c03f[_0xb00b('0x53')])||_0x2f8786;_0x3b5d82[_0xb00b('0x54')]=_0x498f95[_0xb00b('0x52')](_0xd9c03f[_0xb00b('0x55')])||_0x2f8786;_0x4bc61e(_0x15dcbf,_0x3b5d82);_0x498f95['addClass'](_0xb00b('0x56'));});};(function(){if(_0xd9c03f['smartCheckout']){window[_0xb00b('0x57')]=window[_0xb00b('0x57')]||{};if(_0xb00b('0x3')!==typeof window['_QuatroDigital_DropDown'][_0xb00b('0x26')]&&(_0x49078d||!_0x2b5f41))return _0xa2ae04(window[_0xb00b('0x57')][_0xb00b('0x26')]);if('object'!==typeof window[_0xb00b('0x58')]||_0xb00b('0x3')===typeof window[_0xb00b('0x58')][_0xb00b('0x25')])if(_0xb00b('0x14')===typeof vtex&&_0xb00b('0x14')===typeof vtex[_0xb00b('0x25')]&&_0xb00b('0x3')!==typeof vtex['checkout'][_0xb00b('0x59')])new vtex[(_0xb00b('0x25'))][(_0xb00b('0x59'))]();else return _0x593659('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x450129[_0xb00b('0x5a')]([_0xb00b('0x40'),_0xb00b('0x38'),_0xb00b('0x5b')],{'done':function(_0x1ad387){_0xa2ae04(_0x1ad387);window['_QuatroDigital_DropDown'][_0xb00b('0x26')]=_0x1ad387;},'fail':function(_0x343214){_0x593659([_0xb00b('0x5c'),_0x343214]);}});}else alert(_0xb00b('0x5d'));}());_0xd9c03f['callback']();_0x450129(window)[_0xb00b('0x5e')](_0xb00b('0x5f'));return _0x261c80;};_0x450129[_0xb00b('0x2f')]={'elements':_0x450129('')};_0x450129(function(){var _0x2d73bb;_0xb00b('0x9')===typeof window[_0xb00b('0x60')]&&(_0x2d73bb=window[_0xb00b('0x60')],window['ajaxRequestbuyButtonAsynchronous']=function(_0x2b090a,_0x502822,_0x3e0648,_0x4c2186,_0x3b3272){_0x2d73bb['call'](this,_0x2b090a,_0x502822,_0x3e0648,_0x4c2186,function(){_0xb00b('0x9')===typeof _0x3b3272&&_0x3b3272();_0x450129['QD_simpleCart'][_0xb00b('0x30')][_0xb00b('0x50')](function(){var _0x3bae02=_0x450129(this);_0x3bae02['simpleCart'](_0x3bae02['data']('qd_simpleCartOpts'));});});});});var _0x21a53d=window[_0xb00b('0x61')]||void 0x0;window[_0xb00b('0x61')]=function(_0x49246b){_0x450129['fn'][_0xb00b('0x24')](!0x0);_0xb00b('0x9')===typeof _0x21a53d?_0x21a53d[_0xb00b('0x27')](this,_0x49246b):alert(_0x49246b);};_0x450129(function(){var _0x2ddba4=_0x450129(_0xb00b('0x62'));_0x2ddba4['length']&&_0x2ddba4[_0xb00b('0x24')]();});_0x450129(function(){_0x450129(window)[_0xb00b('0x63')]('productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex',function(){_0x450129['fn'][_0xb00b('0x24')](!0x0);});});}catch(_0x36ac5a){_0xb00b('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0xb00b('0x12')](_0xb00b('0x64'),_0x36ac5a);}}}());(function(){var _0x23762e=function(_0xc695f,_0x4df7fa){if(_0xb00b('0x14')===typeof console){var _0x30c0a7='object'===typeof _0xc695f;_0xb00b('0x3')!==typeof _0x4df7fa&&_0xb00b('0x2a')===_0x4df7fa[_0xb00b('0xf')]()?_0x30c0a7?console[_0xb00b('0x2b')](_0xb00b('0x65'),_0xc695f[0x0],_0xc695f[0x1],_0xc695f[0x2],_0xc695f[0x3],_0xc695f[0x4],_0xc695f[0x5],_0xc695f[0x6],_0xc695f[0x7]):console['warn'](_0xb00b('0x65')+_0xc695f):_0xb00b('0x3')!==typeof _0x4df7fa&&_0xb00b('0x2d')===_0x4df7fa[_0xb00b('0xf')]()?_0x30c0a7?console[_0xb00b('0x2d')](_0xb00b('0x65'),_0xc695f[0x0],_0xc695f[0x1],_0xc695f[0x2],_0xc695f[0x3],_0xc695f[0x4],_0xc695f[0x5],_0xc695f[0x6],_0xc695f[0x7]):console[_0xb00b('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0xc695f):_0x30c0a7?console[_0xb00b('0x12')](_0xb00b('0x65'),_0xc695f[0x0],_0xc695f[0x1],_0xc695f[0x2],_0xc695f[0x3],_0xc695f[0x4],_0xc695f[0x5],_0xc695f[0x6],_0xc695f[0x7]):console[_0xb00b('0x12')](_0xb00b('0x65')+_0xc695f);}},_0x49f0a2=null,_0x5aac5f={},_0x4c81b1={},_0x5e9677={};$[_0xb00b('0x5a')]=function(_0x432b68,_0x3f010a){if(null===_0x49f0a2)if(_0xb00b('0x14')===typeof window['vtexjs']&&_0xb00b('0x3')!==typeof window[_0xb00b('0x58')][_0xb00b('0x25')])_0x49f0a2=window[_0xb00b('0x58')][_0xb00b('0x25')];else return _0x23762e(_0xb00b('0x66'));var _0x406245=$[_0xb00b('0x13')]({'done':function(){},'fail':function(){}},_0x3f010a),_0x353cc7=_0x432b68[_0xb00b('0x8')](';'),_0x5625a4=function(){_0x5aac5f[_0x353cc7][_0xb00b('0x2e')](_0x406245[_0xb00b('0x67')]);_0x4c81b1[_0x353cc7][_0xb00b('0x2e')](_0x406245[_0xb00b('0x68')]);};_0x5e9677[_0x353cc7]?_0x5625a4():(_0x5aac5f[_0x353cc7]=$[_0xb00b('0x69')](),_0x4c81b1[_0x353cc7]=$['Callbacks'](),_0x5625a4(),_0x5e9677[_0x353cc7]=!0x0,_0x49f0a2[_0xb00b('0x26')](_0x432b68)[_0xb00b('0x67')](function(_0x28ecf8){_0x5e9677[_0x353cc7]=!0x1;_0x5aac5f[_0x353cc7][_0xb00b('0x43')](_0x28ecf8);})[_0xb00b('0x68')](function(_0x14ccaf){_0x5e9677[_0x353cc7]=!0x1;_0x4c81b1[_0x353cc7]['fire'](_0x14ccaf);}));};}());(function(_0x39bb6c){try{var _0x4e95c7=jQuery,_0x135cbf,_0x50922f=_0x4e95c7({}),_0x1b255d=function(_0x20e844,_0x4d1daa){if('object'===typeof console&&_0xb00b('0x3')!==typeof console[_0xb00b('0x12')]&&_0xb00b('0x3')!==typeof console[_0xb00b('0x2d')]&&_0xb00b('0x3')!==typeof console[_0xb00b('0x2b')]){var _0x53130e;_0xb00b('0x14')===typeof _0x20e844?(_0x20e844[_0xb00b('0x6a')](_0xb00b('0x6b')),_0x53130e=_0x20e844):_0x53130e=[_0xb00b('0x6b')+_0x20e844];if(_0xb00b('0x3')===typeof _0x4d1daa||_0xb00b('0x2a')!==_0x4d1daa[_0xb00b('0xf')]()&&'aviso'!==_0x4d1daa['toLowerCase']())if(_0xb00b('0x3')!==typeof _0x4d1daa&&_0xb00b('0x2d')===_0x4d1daa['toLowerCase']())try{console['info'][_0xb00b('0x6c')](console,_0x53130e);}catch(_0x391e98){try{console[_0xb00b('0x2d')](_0x53130e['join']('\x0a'));}catch(_0x884d96){}}else try{console[_0xb00b('0x12')][_0xb00b('0x6c')](console,_0x53130e);}catch(_0x45c9cd){try{console[_0xb00b('0x12')](_0x53130e[_0xb00b('0x8')]('\x0a'));}catch(_0x3113e9){}}else try{console['warn'][_0xb00b('0x6c')](console,_0x53130e);}catch(_0x59e622){try{console[_0xb00b('0x2b')](_0x53130e[_0xb00b('0x8')]('\x0a'));}catch(_0x545dfd){}}}},_0x2f6d2b={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0xb00b('0x6d'),'buyQtt':_0xb00b('0x6e'),'selectSkuMsg':_0xb00b('0x6f'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x263f0b,_0x410d68,_0x4434fa){_0x4e95c7(_0xb00b('0x70'))['is'](_0xb00b('0x71'))&&(_0xb00b('0x1b')===_0x410d68?alert(_0xb00b('0x72')):(alert(_0xb00b('0x73')),(_0xb00b('0x14')===typeof parent?parent:document)['location'][_0xb00b('0x74')]=_0x4434fa));},'isProductPage':function(){return _0x4e95c7(_0xb00b('0x70'))['is'](_0xb00b('0x75'));},'execDefaultAction':function(_0x1990f9){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x4e95c7['QD_buyButton']=function(_0x32b591,_0x17503d){function _0x32508b(_0x109deb){_0x135cbf[_0xb00b('0x76')]?_0x109deb['data'](_0xb00b('0x77'))||(_0x109deb[_0xb00b('0x15')](_0xb00b('0x77'),0x1),_0x109deb['on'](_0xb00b('0x78'),function(_0x4fb982){if(!_0x135cbf[_0xb00b('0x79')]())return!0x0;if(!0x0!==_0x85882c['clickBuySmartCheckout'][_0xb00b('0x27')](this))return _0x4fb982[_0xb00b('0x7a')](),!0x1;})):alert(_0xb00b('0x7b'));}function _0x165442(_0x188349){_0x188349=_0x188349||_0x4e95c7(_0x135cbf[_0xb00b('0x7c')]);_0x188349[_0xb00b('0x50')](function(){var _0x188349=_0x4e95c7(this);_0x188349['is'](_0xb00b('0x7d'))||(_0x188349[_0xb00b('0x49')](_0xb00b('0x7e')),_0x188349['is']('.btn-add-buy-button-asynchronous')&&!_0x188349['is'](_0xb00b('0x7f'))||_0x188349[_0xb00b('0x15')](_0xb00b('0x80'))||(_0x188349[_0xb00b('0x15')]('qd-bb-active',0x1),_0x188349[_0xb00b('0x81')](_0xb00b('0x82'))['length']||_0x188349[_0xb00b('0x83')]('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x188349['is'](_0xb00b('0x84'))&&_0x135cbf[_0xb00b('0x85')]()&&_0x3a1ecf[_0xb00b('0x27')](_0x188349),_0x32508b(_0x188349)));});_0x135cbf['isProductPage']()&&!_0x188349[_0xb00b('0x7')]&&_0x1b255d(_0xb00b('0x86')+_0x188349[_0xb00b('0x87')]+'\x27.',_0xb00b('0x2d'));}var _0x2a4048=_0x4e95c7(_0x32b591);var _0x85882c=this;window[_0xb00b('0x88')]=window[_0xb00b('0x88')]||{};window[_0xb00b('0x37')]=window['_QuatroDigital_CartData']||{};_0x85882c['prodAdd']=function(_0x466ddb,_0x39d7dd){_0x2a4048[_0xb00b('0x49')](_0xb00b('0x89'));_0x4e95c7('body')[_0xb00b('0x49')](_0xb00b('0x8a'));var _0x5eea96=_0x4e95c7(_0x135cbf[_0xb00b('0x7c')])[_0xb00b('0x46')](_0xb00b('0x8b')+(_0x466ddb['attr'](_0xb00b('0x74'))||_0xb00b('0x8c'))+'\x27]')['add'](_0x466ddb);_0x5eea96[_0xb00b('0x49')](_0xb00b('0x8d'));setTimeout(function(){_0x2a4048[_0xb00b('0x4a')](_0xb00b('0x8e'));_0x5eea96[_0xb00b('0x4a')](_0xb00b('0x8d'));},_0x135cbf[_0xb00b('0x8f')]);window[_0xb00b('0x88')]['getOrderForm']=void 0x0;if(_0xb00b('0x3')!==typeof _0x17503d&&_0xb00b('0x9')===typeof _0x17503d[_0xb00b('0x90')])return _0x135cbf[_0xb00b('0x76')]||(_0x1b255d('função\x20descontinuada'),_0x17503d[_0xb00b('0x90')]()),window['_QuatroDigital_DropDown'][_0xb00b('0x26')]=void 0x0,_0x17503d['getCartInfoByUrl'](function(_0x14b743){window[_0xb00b('0x88')][_0xb00b('0x26')]=_0x14b743;_0x4e95c7['fn'][_0xb00b('0x24')](!0x0,void 0x0,!0x0);},{'lastSku':_0x39d7dd});window[_0xb00b('0x88')]['allowUpdate']=!0x0;_0x4e95c7['fn'][_0xb00b('0x24')](!0x0);};(function(){if(_0x135cbf[_0xb00b('0x76')]&&_0x135cbf['autoWatchBuyButton']){var _0x44c086=_0x4e95c7('.btn-add-buy-button-asynchronous');_0x44c086[_0xb00b('0x7')]&&_0x165442(_0x44c086);}}());var _0x3a1ecf=function(){var _0x1c08c1=_0x4e95c7(this);_0xb00b('0x3')!==typeof _0x1c08c1['data'](_0xb00b('0x7c'))?(_0x1c08c1[_0xb00b('0x91')](_0xb00b('0x92')),_0x32508b(_0x1c08c1)):(_0x1c08c1[_0xb00b('0x63')](_0xb00b('0x93'),function(_0x4a4b60){_0x1c08c1['unbind'](_0xb00b('0x92'));_0x32508b(_0x1c08c1);_0x4e95c7(this)[_0xb00b('0x91')](_0x4a4b60);}),_0x4e95c7(window)[_0xb00b('0x94')](function(){_0x1c08c1[_0xb00b('0x91')](_0xb00b('0x92'));_0x32508b(_0x1c08c1);_0x1c08c1['unbind']('mouseenter.qd_bb_buy_sc');}));};_0x85882c[_0xb00b('0x95')]=function(){var _0x7e4de2=_0x4e95c7(this),_0x32b591=_0x7e4de2[_0xb00b('0x34')](_0xb00b('0x74'))||'';if(-0x1<_0x32b591[_0xb00b('0x96')](_0x135cbf[_0xb00b('0x97')]))return!0x0;_0x32b591=_0x32b591['replace'](/redirect\=(false|true)/gi,'')[_0xb00b('0x2')]('?','?redirect=false&')[_0xb00b('0x2')](/\&\&/gi,'&');if(_0x135cbf['execDefaultAction'](_0x7e4de2))return _0x7e4de2[_0xb00b('0x34')](_0xb00b('0x74'),_0x32b591[_0xb00b('0x2')](_0xb00b('0x98'),_0xb00b('0x99'))),!0x0;_0x32b591=_0x32b591[_0xb00b('0x2')](/http.?:/i,'');_0x50922f[_0xb00b('0x9a')](function(_0x2dc670){if(!_0x135cbf[_0xb00b('0x9b')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0xb00b('0x9c')](_0x32b591))return _0x2dc670();var _0x1d15dd=function(_0x565667,_0x456a2f){var _0x165442=_0x32b591[_0xb00b('0x9d')](/sku\=([0-9]+)/gi),_0x29742c=[];if('object'===typeof _0x165442&&null!==_0x165442)for(var _0x3f0175=_0x165442[_0xb00b('0x7')]-0x1;0x0<=_0x3f0175;_0x3f0175--){var _0x49bd18=parseInt(_0x165442[_0x3f0175][_0xb00b('0x2')](/sku\=/gi,''));isNaN(_0x49bd18)||_0x29742c['push'](_0x49bd18);}_0x135cbf[_0xb00b('0x9e')][_0xb00b('0x27')](this,_0x565667,_0x456a2f,_0x32b591);_0x85882c['buyButtonClickCallback'][_0xb00b('0x27')](this,_0x565667,_0x456a2f,_0x32b591,_0x29742c);_0x85882c[_0xb00b('0x9f')](_0x7e4de2,_0x32b591[_0xb00b('0xa0')](_0xb00b('0xa1'))[_0xb00b('0xa2')]()[_0xb00b('0xa0')]('&')['shift']());_0xb00b('0x9')===typeof _0x135cbf['asyncCallback']&&_0x135cbf[_0xb00b('0xa3')][_0xb00b('0x27')](this);_0x4e95c7(window)[_0xb00b('0x5e')](_0xb00b('0xa4'));_0x4e95c7(window)['trigger'](_0xb00b('0xa5'));};_0x135cbf[_0xb00b('0xa6')]?(_0x1d15dd(null,_0xb00b('0x1b')),_0x2dc670()):_0x4e95c7['ajax']({'url':_0x32b591,'complete':_0x1d15dd})[_0xb00b('0x1d')](function(){_0x2dc670();});});};_0x85882c[_0xb00b('0xa7')]=function(_0x2a91a6,_0xcc2183,_0x56a0bb,_0x212a40){try{_0xb00b('0x1b')===_0xcc2183&&_0xb00b('0x14')===typeof window[_0xb00b('0xa8')]&&_0xb00b('0x9')===typeof window[_0xb00b('0xa8')]['_QuatroDigital_prodBuyCallback']&&window['parent'][_0xb00b('0xa9')](_0x2a91a6,_0xcc2183,_0x56a0bb,_0x212a40);}catch(_0x23d306){_0x1b255d(_0xb00b('0xaa'));}};_0x165442();_0xb00b('0x9')===typeof _0x135cbf[_0xb00b('0x42')]?_0x135cbf['callback'][_0xb00b('0x27')](this):_0x1b255d(_0xb00b('0xab'));};var _0x14597c=_0x4e95c7[_0xb00b('0x69')]();_0x4e95c7['fn'][_0xb00b('0xac')]=function(_0x399bf6,_0x48e6e0){var _0x39bb6c=_0x4e95c7(this);_0xb00b('0x3')!==typeof _0x48e6e0||_0xb00b('0x14')!==typeof _0x399bf6||_0x399bf6 instanceof _0x4e95c7||(_0x48e6e0=_0x399bf6,_0x399bf6=void 0x0);_0x135cbf=_0x4e95c7[_0xb00b('0x13')]({},_0x2f6d2b,_0x48e6e0);var _0x44129a;_0x14597c[_0xb00b('0x2e')](function(){_0x39bb6c[_0xb00b('0x81')](_0xb00b('0xad'))[_0xb00b('0x7')]||_0x39bb6c[_0xb00b('0xae')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0x44129a=new _0x4e95c7['QD_buyButton'](_0x39bb6c,_0x399bf6);});_0x14597c[_0xb00b('0x43')]();_0x4e95c7(window)['on'](_0xb00b('0xaf'),function(_0x23eaff,_0x55b3fd,_0x4e0a24){_0x44129a['prodAdd'](_0x55b3fd,_0x4e0a24);});return _0x4e95c7[_0xb00b('0x13')](_0x39bb6c,_0x44129a);};var _0x1e50ca=0x0;_0x4e95c7(document)[_0xb00b('0xb0')](function(_0x5cb267,_0x52e3f2,_0xfb1c7a){-0x1<_0xfb1c7a[_0xb00b('0x17')][_0xb00b('0xf')]()['indexOf'](_0xb00b('0xb1'))&&(_0x1e50ca=(_0xfb1c7a[_0xb00b('0x17')][_0xb00b('0x9d')](/sku\=([0-9]+)/i)||[''])[_0xb00b('0xa2')]());});_0x4e95c7(window)[_0xb00b('0x63')](_0xb00b('0xb2'),function(){_0x4e95c7(window)[_0xb00b('0x5e')](_0xb00b('0xaf'),[new _0x4e95c7(),_0x1e50ca]);});_0x4e95c7(document)['ajaxStop'](function(){_0x14597c[_0xb00b('0x43')]();});}catch(_0x185025){_0xb00b('0x3')!==typeof console&&_0xb00b('0x9')===typeof console[_0xb00b('0x12')]&&console[_0xb00b('0x12')](_0xb00b('0x64'),_0x185025);}}(this));function qd_number_format(_0x16698a,_0x4fcd61,_0x367e95,_0x1f6015){_0x16698a=(_0x16698a+'')[_0xb00b('0x2')](/[^0-9+\-Ee.]/g,'');_0x16698a=isFinite(+_0x16698a)?+_0x16698a:0x0;_0x4fcd61=isFinite(+_0x4fcd61)?Math[_0xb00b('0xb3')](_0x4fcd61):0x0;_0x1f6015='undefined'===typeof _0x1f6015?',':_0x1f6015;_0x367e95=_0xb00b('0x3')===typeof _0x367e95?'.':_0x367e95;var _0x21c682='',_0x21c682=function(_0x40885e,_0x338c67){var _0x44be10=Math[_0xb00b('0x4')](0xa,_0x338c67);return''+(Math['round'](_0x40885e*_0x44be10)/_0x44be10)['toFixed'](_0x338c67);},_0x21c682=(_0x4fcd61?_0x21c682(_0x16698a,_0x4fcd61):''+Math[_0xb00b('0x5')](_0x16698a))[_0xb00b('0xa0')]('.');0x3<_0x21c682[0x0][_0xb00b('0x7')]&&(_0x21c682[0x0]=_0x21c682[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x1f6015));(_0x21c682[0x1]||'')[_0xb00b('0x7')]<_0x4fcd61&&(_0x21c682[0x1]=_0x21c682[0x1]||'',_0x21c682[0x1]+=Array(_0x4fcd61-_0x21c682[0x1][_0xb00b('0x7')]+0x1)[_0xb00b('0x8')]('0'));return _0x21c682['join'](_0x367e95);}(function(){try{window[_0xb00b('0x37')]=window[_0xb00b('0x37')]||{},window[_0xb00b('0x37')]['callback']=window['_QuatroDigital_CartData'][_0xb00b('0x42')]||$['Callbacks']();}catch(_0x348a39){'undefined'!==typeof console&&'function'===typeof console[_0xb00b('0x12')]&&console[_0xb00b('0x12')](_0xb00b('0x64'),_0x348a39[_0xb00b('0x20')]);}}());(function(_0x41ee74){try{var _0x5c5a04=jQuery,_0x1aa5e5=function(_0x54ebe1,_0x592206){if(_0xb00b('0x14')===typeof console&&_0xb00b('0x3')!==typeof console[_0xb00b('0x12')]&&_0xb00b('0x3')!==typeof console[_0xb00b('0x2d')]&&_0xb00b('0x3')!==typeof console['warn']){var _0x38224b;'object'===typeof _0x54ebe1?(_0x54ebe1[_0xb00b('0x6a')](_0xb00b('0xb4')),_0x38224b=_0x54ebe1):_0x38224b=[_0xb00b('0xb4')+_0x54ebe1];if('undefined'===typeof _0x592206||_0xb00b('0x2a')!==_0x592206[_0xb00b('0xf')]()&&_0xb00b('0xb5')!==_0x592206[_0xb00b('0xf')]())if('undefined'!==typeof _0x592206&&'info'===_0x592206[_0xb00b('0xf')]())try{console['info']['apply'](console,_0x38224b);}catch(_0x3f7979){try{console['info'](_0x38224b['join']('\x0a'));}catch(_0x2fecca){}}else try{console[_0xb00b('0x12')][_0xb00b('0x6c')](console,_0x38224b);}catch(_0x475abb){try{console['error'](_0x38224b['join']('\x0a'));}catch(_0x3cff7e){}}else try{console[_0xb00b('0x2b')][_0xb00b('0x6c')](console,_0x38224b);}catch(_0x5e6174){try{console['warn'](_0x38224b[_0xb00b('0x8')]('\x0a'));}catch(_0x55b002){}}}};window['_QuatroDigital_DropDown']=window[_0xb00b('0x57')]||{};window['_QuatroDigital_DropDown'][_0xb00b('0xb6')]=!0x0;_0x5c5a04['QD_dropDownCart']=function(){};_0x5c5a04['fn'][_0xb00b('0xb7')]=function(){return{'fn':new _0x5c5a04()};};var _0x5712fd=function(_0x3de808){var _0x3289aa={'z':_0xb00b('0xb8')};return function(_0x54498c){var _0x442b28=function(_0x596092){return _0x596092;};var _0x44760b=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x54498c=_0x54498c['d'+_0x44760b[0x10]+'c'+_0x44760b[0x11]+'m'+_0x442b28(_0x44760b[0x1])+'n'+_0x44760b[0xd]]['l'+_0x44760b[0x12]+'c'+_0x44760b[0x0]+'ti'+_0x442b28('o')+'n'];var _0x148886=function(_0x5b6afb){return escape(encodeURIComponent(_0x5b6afb['replace'](/\./g,'¨')['replace'](/[a-zA-Z]/g,function(_0x552f73){return String[_0xb00b('0xb9')](('Z'>=_0x552f73?0x5a:0x7a)>=(_0x552f73=_0x552f73['charCodeAt'](0x0)+0xd)?_0x552f73:_0x552f73-0x1a);})));};var _0x41ee74=_0x148886(_0x54498c[[_0x44760b[0x9],_0x442b28('o'),_0x44760b[0xc],_0x44760b[_0x442b28(0xd)]]['join']('')]);_0x148886=_0x148886((window[['js',_0x442b28('no'),'m',_0x44760b[0x1],_0x44760b[0x4][_0xb00b('0xe')](),_0xb00b('0xba')][_0xb00b('0x8')]('')]||_0xb00b('0x8c'))+['.v',_0x44760b[0xd],'e',_0x442b28('x'),'co',_0x442b28('mm'),_0xb00b('0xbb'),_0x44760b[0x1],'.c',_0x442b28('o'),'m.',_0x44760b[0x13],'r']['join'](''));for(var _0x8292fe in _0x3289aa){if(_0x148886===_0x8292fe+_0x3289aa[_0x8292fe]||_0x41ee74===_0x8292fe+_0x3289aa[_0x8292fe]){var _0x31ab26='tr'+_0x44760b[0x11]+'e';break;}_0x31ab26='f'+_0x44760b[0x0]+'ls'+_0x442b28(_0x44760b[0x1])+'';}_0x442b28=!0x1;-0x1<_0x54498c[[_0x44760b[0xc],'e',_0x44760b[0x0],'rc',_0x44760b[0x9]][_0xb00b('0x8')]('')][_0xb00b('0x96')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x442b28=!0x0);return[_0x31ab26,_0x442b28];}(_0x3de808);}(window);if(!eval(_0x5712fd[0x0]))return _0x5712fd[0x1]?_0x1aa5e5('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x5c5a04[_0xb00b('0xb7')]=function(_0xfee3f5,_0x181393){var _0x226d78=_0x5c5a04(_0xfee3f5);if(!_0x226d78[_0xb00b('0x7')])return _0x226d78;var _0x1e1cb9=_0x5c5a04[_0xb00b('0x13')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0xb00b('0xbc'),'linkCheckout':_0xb00b('0xbd'),'cartTotal':'<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','emptyCart':_0xb00b('0xbe'),'continueShopping':_0xb00b('0xbf'),'shippingForm':'<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>'},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x475ebb){return _0x475ebb['skuName']||_0x475ebb[_0xb00b('0xc0')];},'callback':function(){},'callbackProductsList':function(){}},_0x181393);_0x5c5a04('');var _0x13054a=this;if(_0x1e1cb9['smartCheckout']){var _0x4ce456=!0x1;_0xb00b('0x3')===typeof window[_0xb00b('0x58')]&&(_0x1aa5e5(_0xb00b('0xc1')),_0x5c5a04['ajax']({'url':_0xb00b('0xc2'),'async':!0x1,'dataType':_0xb00b('0xc3'),'error':function(){_0x1aa5e5(_0xb00b('0xc4'));_0x4ce456=!0x0;}}));if(_0x4ce456)return _0x1aa5e5('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0xb00b('0x14')===typeof window['vtexjs']&&'undefined'!==typeof window['vtexjs'][_0xb00b('0x25')])var _0x4d42af=window[_0xb00b('0x58')][_0xb00b('0x25')];else if('object'===typeof vtex&&'object'===typeof vtex[_0xb00b('0x25')]&&_0xb00b('0x3')!==typeof vtex['checkout'][_0xb00b('0x59')])_0x4d42af=new vtex[(_0xb00b('0x25'))][(_0xb00b('0x59'))]();else return _0x1aa5e5(_0xb00b('0xc5'));_0x13054a[_0xb00b('0xc6')]=_0xb00b('0xc7');var _0x49cfd5=function(_0x627753){_0x5c5a04(this)[_0xb00b('0x83')](_0x627753);_0x627753['find'](_0xb00b('0xc8'))['add'](_0x5c5a04('.qd_ddc_lightBoxOverlay'))['on'](_0xb00b('0xc9'),function(){_0x226d78['removeClass'](_0xb00b('0xca'));_0x5c5a04(document[_0xb00b('0x70')])[_0xb00b('0x4a')]('qd-bb-lightBoxBodyProdAdd');});_0x5c5a04(document)['off']('keyup.qd_ddc_closeFn')['on'](_0xb00b('0xcb'),function(_0x451fe8){0x1b==_0x451fe8['keyCode']&&(_0x226d78[_0xb00b('0x4a')](_0xb00b('0xca')),_0x5c5a04(document[_0xb00b('0x70')])[_0xb00b('0x4a')](_0xb00b('0x8a')));});var _0x166ff5=_0x627753[_0xb00b('0x52')](_0xb00b('0xcc'));_0x627753['find'](_0xb00b('0xcd'))['on'](_0xb00b('0xce'),function(){_0x13054a[_0xb00b('0xcf')]('-',void 0x0,void 0x0,_0x166ff5);return!0x1;});_0x627753['find']('.qd-ddc-scrollDown')['on']('click.qd_ddc_scrollDown',function(){_0x13054a[_0xb00b('0xcf')](void 0x0,void 0x0,void 0x0,_0x166ff5);return!0x1;});_0x627753[_0xb00b('0x52')](_0xb00b('0xd0'))['val']('')['on'](_0xb00b('0xd1'),function(){_0x13054a[_0xb00b('0xd2')](_0x5c5a04(this));});if(_0x1e1cb9[_0xb00b('0xd3')]){var _0x181393=0x0;_0x5c5a04(this)['on'](_0xb00b('0xd4'),function(){var _0x627753=function(){window[_0xb00b('0x57')]['allowUpdate']&&(_0x13054a[_0xb00b('0x90')](),window[_0xb00b('0x57')][_0xb00b('0xb6')]=!0x1,_0x5c5a04['fn'][_0xb00b('0x24')](!0x0),_0x13054a[_0xb00b('0xd5')]());};_0x181393=setInterval(function(){_0x627753();},0x258);_0x627753();});_0x5c5a04(this)['on'](_0xb00b('0xd6'),function(){clearInterval(_0x181393);});}};var _0x5c73e2=function(_0xeaa6ea){_0xeaa6ea=_0x5c5a04(_0xeaa6ea);_0x1e1cb9[_0xb00b('0xd7')][_0xb00b('0xd8')]=_0x1e1cb9[_0xb00b('0xd7')][_0xb00b('0xd8')][_0xb00b('0x2')](_0xb00b('0xd9'),_0xb00b('0xda'));_0x1e1cb9[_0xb00b('0xd7')][_0xb00b('0xd8')]=_0x1e1cb9['texts'][_0xb00b('0xd8')][_0xb00b('0x2')]('#items',_0xb00b('0xdb'));_0x1e1cb9['texts']['cartTotal']=_0x1e1cb9['texts'][_0xb00b('0xd8')]['replace'](_0xb00b('0xdc'),_0xb00b('0xdd'));_0x1e1cb9[_0xb00b('0xd7')][_0xb00b('0xd8')]=_0x1e1cb9[_0xb00b('0xd7')][_0xb00b('0xd8')][_0xb00b('0x2')](_0xb00b('0xde'),_0xb00b('0xdf'));_0xeaa6ea[_0xb00b('0x52')](_0xb00b('0xe0'))[_0xb00b('0x4e')](_0x1e1cb9[_0xb00b('0xd7')][_0xb00b('0xe1')]);_0xeaa6ea['find'](_0xb00b('0xe2'))[_0xb00b('0x4e')](_0x1e1cb9[_0xb00b('0xd7')][_0xb00b('0xe3')]);_0xeaa6ea[_0xb00b('0x52')]('.qd-ddc-checkout')[_0xb00b('0x4e')](_0x1e1cb9[_0xb00b('0xd7')]['linkCheckout']);_0xeaa6ea['find'](_0xb00b('0xe4'))[_0xb00b('0x4e')](_0x1e1cb9[_0xb00b('0xd7')][_0xb00b('0xd8')]);_0xeaa6ea[_0xb00b('0x52')](_0xb00b('0xe5'))[_0xb00b('0x4e')](_0x1e1cb9[_0xb00b('0xd7')][_0xb00b('0xe6')]);_0xeaa6ea[_0xb00b('0x52')](_0xb00b('0xe7'))['html'](_0x1e1cb9[_0xb00b('0xd7')]['emptyCart']);return _0xeaa6ea;}(this[_0xb00b('0xc6')]);var _0x3fd21f=0x0;_0x226d78[_0xb00b('0x50')](function(){0x0<_0x3fd21f?_0x49cfd5[_0xb00b('0x27')](this,_0x5c73e2[_0xb00b('0xe8')]()):_0x49cfd5[_0xb00b('0x27')](this,_0x5c73e2);_0x3fd21f++;});window['_QuatroDigital_CartData'][_0xb00b('0x42')][_0xb00b('0x2e')](function(){_0x5c5a04(_0xb00b('0xe9'))[_0xb00b('0x4e')](window['_QuatroDigital_CartData'][_0xb00b('0x3a')]||'--');_0x5c5a04(_0xb00b('0xea'))['html'](window[_0xb00b('0x37')][_0xb00b('0x3e')]||'0');_0x5c5a04(_0xb00b('0xeb'))[_0xb00b('0x4e')](window[_0xb00b('0x37')][_0xb00b('0x3b')]||'--');_0x5c5a04(_0xb00b('0xec'))[_0xb00b('0x4e')](window[_0xb00b('0x37')]['allTotal']||'--');});var _0x21eb9f=function(_0x40869b,_0x4b0306){if(_0xb00b('0x3')===typeof _0x40869b[_0xb00b('0x40')])return _0x1aa5e5(_0xb00b('0xed'));_0x13054a[_0xb00b('0xee')][_0xb00b('0x27')](this,_0x4b0306);};_0x13054a[_0xb00b('0x90')]=function(_0x2a29b3,_0x2e1eaf){_0xb00b('0x3')!=typeof _0x2e1eaf?window[_0xb00b('0x57')][_0xb00b('0xef')]=_0x2e1eaf:window['_QuatroDigital_DropDown'][_0xb00b('0xef')]&&(_0x2e1eaf=window[_0xb00b('0x57')][_0xb00b('0xef')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0xb00b('0xef')]=void 0x0;},_0x1e1cb9[_0xb00b('0x8f')]);_0x5c5a04(_0xb00b('0xf0'))[_0xb00b('0x4a')]('qd-ddc-prodLoaded');if(_0x1e1cb9[_0xb00b('0xf1')]){var _0x181393=function(_0x5e7e0f){window['_QuatroDigital_DropDown'][_0xb00b('0x26')]=_0x5e7e0f;_0x21eb9f(_0x5e7e0f,_0x2e1eaf);_0xb00b('0x3')!==typeof window['_QuatroDigital_AmountProduct']&&_0xb00b('0x9')===typeof window['_QuatroDigital_AmountProduct']['exec']&&window[_0xb00b('0xf2')]['exec']['call'](this);_0x5c5a04(_0xb00b('0xf0'))[_0xb00b('0x49')](_0xb00b('0xf3'));};_0xb00b('0x3')!==typeof window[_0xb00b('0x57')][_0xb00b('0x26')]?(_0x181393(window[_0xb00b('0x57')][_0xb00b('0x26')]),_0xb00b('0x9')===typeof _0x2a29b3&&_0x2a29b3(window[_0xb00b('0x57')][_0xb00b('0x26')])):_0x5c5a04[_0xb00b('0x5a')]([_0xb00b('0x40'),_0xb00b('0x38'),'shippingData'],{'done':function(_0x26643c){_0x181393[_0xb00b('0x27')](this,_0x26643c);'function'===typeof _0x2a29b3&&_0x2a29b3(_0x26643c);},'fail':function(_0x128c7e){_0x1aa5e5(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho',_0x128c7e]);}});}else alert(_0xb00b('0xf4'));};_0x13054a[_0xb00b('0xd5')]=function(){var _0x30a46c=_0x5c5a04('.qd-ddc-wrapper');_0x30a46c[_0xb00b('0x52')](_0xb00b('0xf5'))['length']?_0x30a46c[_0xb00b('0x4a')](_0xb00b('0xf6')):_0x30a46c[_0xb00b('0x49')](_0xb00b('0xf6'));};_0x13054a['renderProductsList']=function(_0x2dab12){var _0x181393=_0x5c5a04(_0xb00b('0xf7'));_0x181393['empty']();_0x181393['each'](function(){var _0x181393=_0x5c5a04(this),_0xfee3f5,_0x399a95,_0x7d61d5=_0x5c5a04(''),_0xf4e199;for(_0xf4e199 in window[_0xb00b('0x57')][_0xb00b('0x26')][_0xb00b('0x40')])if(_0xb00b('0x14')===typeof window[_0xb00b('0x57')]['getOrderForm']['items'][_0xf4e199]){var _0x5cee95=window[_0xb00b('0x57')]['getOrderForm'][_0xb00b('0x40')][_0xf4e199];var _0x525fb3=_0x5cee95[_0xb00b('0xf8')]['replace'](/^\/|\/$/g,'')[_0xb00b('0xa0')]('/');var _0x1425da=_0x5c5a04('<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>');_0x1425da[_0xb00b('0x34')]({'data-sku':_0x5cee95['id'],'data-sku-index':_0xf4e199,'data-qd-departament':_0x525fb3[0x0],'data-qd-category':_0x525fb3[_0x525fb3[_0xb00b('0x7')]-0x1]});_0x1425da['addClass'](_0xb00b('0xf9')+_0x5cee95['availability']);_0x1425da[_0xb00b('0x52')](_0xb00b('0xfa'))[_0xb00b('0x83')](_0x1e1cb9[_0xb00b('0xfb')](_0x5cee95));_0x1425da[_0xb00b('0x52')](_0xb00b('0xfc'))[_0xb00b('0x83')](isNaN(_0x5cee95[_0xb00b('0xfd')])?_0x5cee95[_0xb00b('0xfd')]:0x0==_0x5cee95[_0xb00b('0xfd')]?'Grátis':(_0x5c5a04('meta[name=currency]')[_0xb00b('0x34')]('content')||'R$')+'\x20'+qd_number_format(_0x5cee95[_0xb00b('0xfd')]/0x64,0x2,',','.'));_0x1425da['find'](_0xb00b('0xfe'))[_0xb00b('0x34')]({'data-sku':_0x5cee95['id'],'data-sku-index':_0xf4e199})['val'](_0x5cee95[_0xb00b('0x41')]);_0x1425da['find'](_0xb00b('0xff'))[_0xb00b('0x34')]({'data-sku':_0x5cee95['id'],'data-sku-index':_0xf4e199});_0x13054a['insertProdImg'](_0x5cee95['id'],_0x1425da[_0xb00b('0x52')](_0xb00b('0x100')),_0x5cee95[_0xb00b('0x101')]);_0x1425da[_0xb00b('0x52')](_0xb00b('0x102'))['attr']({'data-sku':_0x5cee95['id'],'data-sku-index':_0xf4e199});_0x1425da[_0xb00b('0x103')](_0x181393);_0x7d61d5=_0x7d61d5[_0xb00b('0x2e')](_0x1425da);}try{var _0x5ddc91=_0x181393['getParent'](_0xb00b('0xf0'))['find']('.qd-ddc-shipping\x20input');_0x5ddc91['length']&&''==_0x5ddc91[_0xb00b('0x104')]()&&window[_0xb00b('0x57')][_0xb00b('0x26')][_0xb00b('0x5b')]['address']&&_0x5ddc91[_0xb00b('0x104')](window['_QuatroDigital_DropDown'][_0xb00b('0x26')][_0xb00b('0x5b')][_0xb00b('0x105')][_0xb00b('0x106')]);}catch(_0x5aa72a){_0x1aa5e5(_0xb00b('0x107')+_0x5aa72a[_0xb00b('0x20')],'aviso');}_0x13054a[_0xb00b('0x108')](_0x181393);_0x13054a[_0xb00b('0xd5')]();_0x2dab12&&_0x2dab12[_0xb00b('0x109')]&&function(){_0x399a95=_0x7d61d5['filter']('[data-sku=\x27'+_0x2dab12[_0xb00b('0x109')]+'\x27]');_0x399a95[_0xb00b('0x7')]&&(_0xfee3f5=0x0,_0x7d61d5[_0xb00b('0x50')](function(){var _0x2dab12=_0x5c5a04(this);if(_0x2dab12['is'](_0x399a95))return!0x1;_0xfee3f5+=_0x2dab12[_0xb00b('0x10a')]();}),_0x13054a[_0xb00b('0xcf')](void 0x0,void 0x0,_0xfee3f5,_0x181393[_0xb00b('0x2e')](_0x181393['parent']())),_0x7d61d5['removeClass'](_0xb00b('0x10b')),function(_0x48cdb0){_0x48cdb0['addClass'](_0xb00b('0x10c'));_0x48cdb0[_0xb00b('0x49')]('qd-ddc-lastAddedFixed');setTimeout(function(){_0x48cdb0[_0xb00b('0x4a')](_0xb00b('0x10c'));},_0x1e1cb9[_0xb00b('0x8f')]);}(_0x399a95));}();});(function(){_QuatroDigital_DropDown['getOrderForm'][_0xb00b('0x40')][_0xb00b('0x7')]?(_0x5c5a04(_0xb00b('0x70'))[_0xb00b('0x4a')](_0xb00b('0x10d'))[_0xb00b('0x49')](_0xb00b('0x10e')),setTimeout(function(){_0x5c5a04('body')[_0xb00b('0x4a')](_0xb00b('0x10f'));},_0x1e1cb9['timeRemoveNewItemClass'])):_0x5c5a04('body')['removeClass'](_0xb00b('0x110'))[_0xb00b('0x49')](_0xb00b('0x10d'));}());_0xb00b('0x9')===typeof _0x1e1cb9[_0xb00b('0x111')]?_0x1e1cb9[_0xb00b('0x111')][_0xb00b('0x27')](this):_0x1aa5e5('callbackProductsList\x20não\x20é\x20uma\x20função');};_0x13054a['insertProdImg']=function(_0x1290d9,_0x19d624,_0x50d9a3){function _0x3517d6(){_0x19d624[_0xb00b('0x4a')]('qd-loaded')[_0xb00b('0x94')](function(){_0x5c5a04(this)['addClass'](_0xb00b('0x112'));})['attr']('src',_0x50d9a3);}_0x50d9a3?_0x3517d6():isNaN(_0x1290d9)?_0x1aa5e5('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU',_0xb00b('0x2a')):alert(_0xb00b('0x113'));};_0x13054a[_0xb00b('0x108')]=function(_0x19a9e0){var _0x55ea79=function(_0x1c0da7,_0x481abb){var _0x181393=_0x5c5a04(_0x1c0da7);var _0x15558d=_0x181393[_0xb00b('0x34')](_0xb00b('0x114'));var _0xfee3f5=_0x181393[_0xb00b('0x34')](_0xb00b('0x115'));if(_0x15558d){var _0x1db454=parseInt(_0x181393['val']())||0x1;_0x13054a['changeQantity']([_0x15558d,_0xfee3f5],_0x1db454,_0x1db454+0x1,function(_0x3fe113){_0x181393[_0xb00b('0x104')](_0x3fe113);_0xb00b('0x9')===typeof _0x481abb&&_0x481abb();});}};var _0x181393=function(_0x198c04,_0x1e0206){var _0x181393=_0x5c5a04(_0x198c04);var _0x3f2e40=_0x181393[_0xb00b('0x34')]('data-sku');var _0xfee3f5=_0x181393[_0xb00b('0x34')](_0xb00b('0x115'));if(_0x3f2e40){var _0x26b234=parseInt(_0x181393['val']())||0x2;_0x13054a[_0xb00b('0x116')]([_0x3f2e40,_0xfee3f5],_0x26b234,_0x26b234-0x1,function(_0x11b817){_0x181393[_0xb00b('0x104')](_0x11b817);_0xb00b('0x9')===typeof _0x1e0206&&_0x1e0206();});}};var _0x43b913=function(_0x1c9754,_0xc2b20e){var _0x181393=_0x5c5a04(_0x1c9754);var _0x2e401b=_0x181393['attr']('data-sku');var _0xfee3f5=_0x181393[_0xb00b('0x34')](_0xb00b('0x115'));if(_0x2e401b){var _0x121451=parseInt(_0x181393[_0xb00b('0x104')]())||0x1;_0x13054a[_0xb00b('0x116')]([_0x2e401b,_0xfee3f5],0x1,_0x121451,function(_0x35bed9){_0x181393['val'](_0x35bed9);_0xb00b('0x9')===typeof _0xc2b20e&&_0xc2b20e();});}};var _0xfee3f5=_0x19a9e0[_0xb00b('0x52')](_0xb00b('0x117'));_0xfee3f5[_0xb00b('0x49')](_0xb00b('0x118'))['each'](function(){var _0x19a9e0=_0x5c5a04(this);_0x19a9e0[_0xb00b('0x52')]('.qd-ddc-quantityMore')['on'](_0xb00b('0x119'),function(_0x22291f){_0x22291f[_0xb00b('0x7a')]();_0xfee3f5[_0xb00b('0x49')](_0xb00b('0x11a'));_0x55ea79(_0x19a9e0[_0xb00b('0x52')]('.qd-ddc-quantity'),function(){_0xfee3f5['removeClass'](_0xb00b('0x11a'));});});_0x19a9e0['find']('.qd-ddc-quantityMinus')['on']('click.qd_ddc_minus',function(_0x18f85f){_0x18f85f[_0xb00b('0x7a')]();_0xfee3f5['addClass']('qd-loading');_0x181393(_0x19a9e0[_0xb00b('0x52')](_0xb00b('0xfe')),function(){_0xfee3f5[_0xb00b('0x4a')](_0xb00b('0x11a'));});});_0x19a9e0[_0xb00b('0x52')](_0xb00b('0xfe'))['on'](_0xb00b('0x11b'),function(){_0xfee3f5[_0xb00b('0x49')](_0xb00b('0x11a'));_0x43b913(this,function(){_0xfee3f5[_0xb00b('0x4a')](_0xb00b('0x11a'));});});_0x19a9e0['find'](_0xb00b('0xfe'))['on'](_0xb00b('0x11c'),function(_0xa53d00){0xd==_0xa53d00[_0xb00b('0x11d')]&&(_0xfee3f5[_0xb00b('0x49')](_0xb00b('0x11a')),_0x43b913(this,function(){_0xfee3f5['removeClass'](_0xb00b('0x11a'));}));});});_0x19a9e0[_0xb00b('0x52')](_0xb00b('0xf5'))[_0xb00b('0x50')](function(){var _0x19a9e0=_0x5c5a04(this);_0x19a9e0['find'](_0xb00b('0xff'))['on'](_0xb00b('0x11e'),function(){_0x19a9e0[_0xb00b('0x49')](_0xb00b('0x11a'));_0x13054a[_0xb00b('0x11f')](_0x5c5a04(this),function(_0x2484f6){_0x2484f6?_0x19a9e0[_0xb00b('0x120')](!0x0)[_0xb00b('0x121')](function(){_0x19a9e0[_0xb00b('0x122')]();_0x13054a[_0xb00b('0xd5')]();}):_0x19a9e0[_0xb00b('0x4a')]('qd-loading');});return!0x1;});});};_0x13054a[_0xb00b('0xd2')]=function(_0x20f335){var _0x1484bd=_0x20f335[_0xb00b('0x104')](),_0x1484bd=_0x1484bd[_0xb00b('0x2')](/[^0-9\-]/g,''),_0x1484bd=_0x1484bd['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0xb00b('0x123')),_0x1484bd=_0x1484bd[_0xb00b('0x2')](/(.{9}).*/g,'$1');_0x20f335[_0xb00b('0x104')](_0x1484bd);0x9<=_0x1484bd[_0xb00b('0x7')]&&(_0x20f335['data']('qdDdcLastPostalCode')!=_0x1484bd&&_0x4d42af['calculateShipping']({'postalCode':_0x1484bd,'country':_0xb00b('0x124')})['done'](function(_0x3ae7b7){window[_0xb00b('0x57')][_0xb00b('0x26')]=_0x3ae7b7;_0x13054a[_0xb00b('0x90')]();})['fail'](function(_0x53aebc){_0x1aa5e5([_0xb00b('0x125'),_0x53aebc]);updateCartData();}),_0x20f335['data']('qdDdcLastPostalCode',_0x1484bd));};_0x13054a[_0xb00b('0x116')]=function(_0x4ad4d3,_0x10edb9,_0x360e54,_0x147d5d){function _0x3004e8(_0x52d0ce){_0x52d0ce=_0xb00b('0x126')!==typeof _0x52d0ce?!0x1:_0x52d0ce;_0x13054a[_0xb00b('0x90')]();window[_0xb00b('0x57')][_0xb00b('0xb6')]=!0x1;_0x13054a[_0xb00b('0xd5')]();'undefined'!==typeof window['_QuatroDigital_AmountProduct']&&'function'===typeof window[_0xb00b('0xf2')][_0xb00b('0x127')]&&window['_QuatroDigital_AmountProduct'][_0xb00b('0x127')][_0xb00b('0x27')](this);_0xb00b('0x9')===typeof adminCart&&adminCart();_0x5c5a04['fn'][_0xb00b('0x24')](!0x0,void 0x0,_0x52d0ce);'function'===typeof _0x147d5d&&_0x147d5d(_0x10edb9);}_0x360e54=_0x360e54||0x1;if(0x1>_0x360e54)return _0x10edb9;if(_0x1e1cb9[_0xb00b('0xf1')]){if(_0xb00b('0x3')===typeof window[_0xb00b('0x57')][_0xb00b('0x26')]['items'][_0x4ad4d3[0x1]])return _0x1aa5e5(_0xb00b('0x128')+_0x4ad4d3[0x1]+']'),_0x10edb9;window['_QuatroDigital_DropDown'][_0xb00b('0x26')][_0xb00b('0x40')][_0x4ad4d3[0x1]][_0xb00b('0x41')]=_0x360e54;window[_0xb00b('0x57')][_0xb00b('0x26')][_0xb00b('0x40')][_0x4ad4d3[0x1]][_0xb00b('0x129')]=_0x4ad4d3[0x1];_0x4d42af[_0xb00b('0x12a')]([window[_0xb00b('0x57')][_0xb00b('0x26')][_0xb00b('0x40')][_0x4ad4d3[0x1]]],[_0xb00b('0x40'),_0xb00b('0x38'),_0xb00b('0x5b')])[_0xb00b('0x67')](function(_0xaf3a3f){window[_0xb00b('0x57')]['getOrderForm']=_0xaf3a3f;_0x3004e8(!0x0);})[_0xb00b('0x68')](function(_0xd37f4a){_0x1aa5e5([_0xb00b('0x12b'),_0xd37f4a]);_0x3004e8();});}else _0x1aa5e5(_0xb00b('0x12c'));};_0x13054a[_0xb00b('0x11f')]=function(_0x54b91b,_0x3d8f36){function _0x413a1a(_0x2655ea){_0x2655ea=_0xb00b('0x126')!==typeof _0x2655ea?!0x1:_0x2655ea;_0xb00b('0x3')!==typeof window[_0xb00b('0xf2')]&&_0xb00b('0x9')===typeof window['_QuatroDigital_AmountProduct'][_0xb00b('0x127')]&&window['_QuatroDigital_AmountProduct'][_0xb00b('0x127')][_0xb00b('0x27')](this);_0xb00b('0x9')===typeof adminCart&&adminCart();_0x5c5a04['fn']['simpleCart'](!0x0,void 0x0,_0x2655ea);_0xb00b('0x9')===typeof _0x3d8f36&&_0x3d8f36(_0xfee3f5);}var _0xfee3f5=!0x1,_0x283ad6=_0x5c5a04(_0x54b91b)[_0xb00b('0x34')]('data-sku-index');if(_0x1e1cb9['smartCheckout']){if(_0xb00b('0x3')===typeof window[_0xb00b('0x57')]['getOrderForm'][_0xb00b('0x40')][_0x283ad6])return _0x1aa5e5(_0xb00b('0x128')+_0x283ad6+']'),_0xfee3f5;window[_0xb00b('0x57')][_0xb00b('0x26')]['items'][_0x283ad6]['index']=_0x283ad6;_0x4d42af[_0xb00b('0x12d')]([window[_0xb00b('0x57')][_0xb00b('0x26')][_0xb00b('0x40')][_0x283ad6]],[_0xb00b('0x40'),_0xb00b('0x38'),_0xb00b('0x5b')])[_0xb00b('0x67')](function(_0x5a96bf){_0xfee3f5=!0x0;window[_0xb00b('0x57')][_0xb00b('0x26')]=_0x5a96bf;_0x21eb9f(_0x5a96bf);_0x413a1a(!0x0);})[_0xb00b('0x68')](function(_0x9a4110){_0x1aa5e5([_0xb00b('0x12e'),_0x9a4110]);_0x413a1a();});}else alert(_0xb00b('0x12f'));};_0x13054a[_0xb00b('0xcf')]=function(_0x57f050,_0x39e6f8,_0x1e6419,_0x9b6689){_0x9b6689=_0x9b6689||_0x5c5a04(_0xb00b('0x130'));_0x57f050=_0x57f050||'+';_0x39e6f8=_0x39e6f8||0.9*_0x9b6689[_0xb00b('0x131')]();_0x9b6689[_0xb00b('0x120')](!0x0,!0x0)[_0xb00b('0x132')]({'scrollTop':isNaN(_0x1e6419)?_0x57f050+'='+_0x39e6f8+'px':_0x1e6419});};_0x1e1cb9[_0xb00b('0xd3')]||(_0x13054a[_0xb00b('0x90')](),_0x5c5a04['fn'][_0xb00b('0x24')](!0x0));_0x5c5a04(window)['on'](_0xb00b('0x133'),function(){try{window['_QuatroDigital_DropDown'][_0xb00b('0x26')]=void 0x0,_0x13054a[_0xb00b('0x90')]();}catch(_0x39e491){_0x1aa5e5(_0xb00b('0x134')+_0x39e491[_0xb00b('0x20')],_0xb00b('0x135'));}});'function'===typeof _0x1e1cb9[_0xb00b('0x42')]?_0x1e1cb9[_0xb00b('0x42')][_0xb00b('0x27')](this):_0x1aa5e5('Callback\x20não\x20é\x20uma\x20função');};_0x5c5a04['fn']['QD_dropDownCart']=function(_0x45a2c6){var _0x4a585b=_0x5c5a04(this);_0x4a585b['fn']=new _0x5c5a04[(_0xb00b('0xb7'))](this,_0x45a2c6);return _0x4a585b;};}catch(_0x33f059){'undefined'!==typeof console&&_0xb00b('0x9')===typeof console['error']&&console['error'](_0xb00b('0x64'),_0x33f059);}}(this));(function(_0x4cb6ba){try{var _0x3ca253=jQuery;window[_0xb00b('0xf2')]=window[_0xb00b('0xf2')]||{};window['_QuatroDigital_AmountProduct'][_0xb00b('0x40')]={};window[_0xb00b('0xf2')][_0xb00b('0x136')]=!0x1;window[_0xb00b('0xf2')][_0xb00b('0x137')]=!0x1;window[_0xb00b('0xf2')][_0xb00b('0x138')]=!0x1;var _0x5cfd31=function(){if(window[_0xb00b('0xf2')]['allowRecalculate']){var _0x323b47=!0x1;var _0x4cb6ba={};window[_0xb00b('0xf2')][_0xb00b('0x40')]={};for(_0x5a02f7 in window['_QuatroDigital_DropDown'][_0xb00b('0x26')][_0xb00b('0x40')])if(_0xb00b('0x14')===typeof window[_0xb00b('0x57')][_0xb00b('0x26')][_0xb00b('0x40')][_0x5a02f7]){var _0x5ed8a8=window[_0xb00b('0x57')][_0xb00b('0x26')]['items'][_0x5a02f7];_0xb00b('0x3')!==typeof _0x5ed8a8[_0xb00b('0x139')]&&null!==_0x5ed8a8[_0xb00b('0x139')]&&''!==_0x5ed8a8[_0xb00b('0x139')]&&(window[_0xb00b('0xf2')][_0xb00b('0x40')][_0xb00b('0x13a')+_0x5ed8a8[_0xb00b('0x139')]]=window[_0xb00b('0xf2')][_0xb00b('0x40')][_0xb00b('0x13a')+_0x5ed8a8[_0xb00b('0x139')]]||{},window[_0xb00b('0xf2')][_0xb00b('0x40')]['prod_'+_0x5ed8a8['productId']]['prodId']=_0x5ed8a8[_0xb00b('0x139')],_0x4cb6ba[_0xb00b('0x13a')+_0x5ed8a8[_0xb00b('0x139')]]||(window['_QuatroDigital_AmountProduct'][_0xb00b('0x40')][_0xb00b('0x13a')+_0x5ed8a8[_0xb00b('0x139')]][_0xb00b('0x3e')]=0x0),window[_0xb00b('0xf2')]['items'][_0xb00b('0x13a')+_0x5ed8a8['productId']]['qtt']+=_0x5ed8a8['quantity'],_0x323b47=!0x0,_0x4cb6ba[_0xb00b('0x13a')+_0x5ed8a8[_0xb00b('0x139')]]=!0x0);}var _0x5a02f7=_0x323b47;}else _0x5a02f7=void 0x0;window[_0xb00b('0xf2')][_0xb00b('0x136')]&&(_0x3ca253(_0xb00b('0x13b'))['remove'](),_0x3ca253(_0xb00b('0x13c'))['removeClass'](_0xb00b('0x13d')));for(var _0x1dfa99 in window[_0xb00b('0xf2')][_0xb00b('0x40')]){_0x5ed8a8=window['_QuatroDigital_AmountProduct']['items'][_0x1dfa99];if(_0xb00b('0x14')!==typeof _0x5ed8a8)return;_0x4cb6ba=_0x3ca253(_0xb00b('0x13e')+_0x5ed8a8[_0xb00b('0x13f')]+']')[_0xb00b('0x0')]('li');if(window[_0xb00b('0xf2')][_0xb00b('0x136')]||!_0x4cb6ba['find'](_0xb00b('0x13b'))[_0xb00b('0x7')])_0x323b47=_0x3ca253(_0xb00b('0x140')),_0x323b47[_0xb00b('0x52')]('.qd-bap-qtt')[_0xb00b('0x4e')](_0x5ed8a8[_0xb00b('0x3e')]),_0x5ed8a8=_0x4cb6ba[_0xb00b('0x52')](_0xb00b('0x141')),_0x5ed8a8[_0xb00b('0x7')]?_0x5ed8a8[_0xb00b('0xae')](_0x323b47)[_0xb00b('0x49')](_0xb00b('0x13d')):_0x4cb6ba['prepend'](_0x323b47);}_0x5a02f7&&(window[_0xb00b('0xf2')][_0xb00b('0x136')]=!0x1);};window[_0xb00b('0xf2')]['exec']=function(){window[_0xb00b('0xf2')][_0xb00b('0x136')]=!0x0;_0x5cfd31[_0xb00b('0x27')](this);};_0x3ca253(document)['ajaxStop'](function(){_0x5cfd31[_0xb00b('0x27')](this);});}catch(_0x762c9f){_0xb00b('0x3')!==typeof console&&_0xb00b('0x9')===typeof console[_0xb00b('0x12')]&&console[_0xb00b('0x12')](_0xb00b('0x64'),_0x762c9f);}}(this));(function(){try{var _0x48eb4b=jQuery,_0x11df18,_0x1803b3={'selector':_0xb00b('0x142'),'dropDown':{},'buyButton':{}};_0x48eb4b['QD_smartCart']=function(_0x11ac2d){var _0x26d0f8={};_0x11df18=_0x48eb4b[_0xb00b('0x13')](!0x0,{},_0x1803b3,_0x11ac2d);_0x11ac2d=_0x48eb4b(_0x11df18[_0xb00b('0x87')])['QD_dropDownCart'](_0x11df18[_0xb00b('0x143')]);_0x26d0f8['buyButton']=_0xb00b('0x3')!==typeof _0x11df18[_0xb00b('0x143')]['updateOnlyHover']&&!0x1===_0x11df18[_0xb00b('0x143')][_0xb00b('0xd3')]?_0x48eb4b(_0x11df18[_0xb00b('0x87')])[_0xb00b('0xac')](_0x11ac2d['fn'],_0x11df18[_0xb00b('0x7c')]):_0x48eb4b(_0x11df18['selector'])['QD_buyButton'](_0x11df18[_0xb00b('0x7c')]);_0x26d0f8[_0xb00b('0x143')]=_0x11ac2d;return _0x26d0f8;};_0x48eb4b['fn'][_0xb00b('0x144')]=function(){'object'===typeof console&&_0xb00b('0x9')===typeof console[_0xb00b('0x2d')]&&console[_0xb00b('0x2d')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x48eb4b[_0xb00b('0x144')]=_0x48eb4b['fn'][_0xb00b('0x144')];}catch(_0x4722fe){'undefined'!==typeof console&&_0xb00b('0x9')===typeof console[_0xb00b('0x12')]&&console['error']('Oooops!\x20',_0x4722fe);}}());

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
var _0x558c=['\x22\x20data-qdssr-title=\x22','<option\x20value=\x22\x22></option>','disabledMessage','</select></div>','appendTo','select','add','select2','pt-BR','change','val','QuatroDigital.ssrChange','body','redirect','split','shift','data-qdssr-str','qd-ssr-loading','qd-ssr2-loading','qdAjax','html','removeAttr','disabled','getAjaxOptions','trigger','ajaxError','removeClass','message','optionIsChecked','select[data-qdssr-ndx=','option[data-qdssr-text=\x27','<option\x20value=\x22','\x22\x20data-qdssr-text=\x22','</option>','getCategory','cache','script:not([src])','innerHTML','indexOf','match','pop','qdPlugin','.qd_auto_select_smart_research_2','function','QD_SelectSmartResearch2','object','undefined','error','info','warn','unshift','alerta','toLowerCase','apply','join','Selecione\x20o\x20anterior','href','find','attr','data-qdssr-title','each','push','h5.','\x20+ul\x20.filtro-ativo:first','text','trim','length','replace','toUpperCase','ite','---','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','options','Nenhuma\x20opção\x20foi\x20enviada,\x20é\x20esperado\x20um\x20array\x20com\x20sub\x20arrays\x20contendo\x20o\x20conjunto\x20chave/valor.','data-qdssr-ndx','Problemas\x20ao\x20definir\x20a\x20opção\x20selecionada.\x20Detalhes:\x20','Problemas\x20ao\x20tentar\x20verificar\x20as\x20opções\x20selecionadas.\x20Detalhes:\x20','optionsPlaceHolder','index','<label\x20for=\x22qd-ssr2-select-','labelMessage','\x22\x20id=\x22qd-ssr2-select-'];(function(_0xa051a3,_0x5bbb5f){var _0xd25c17=function(_0x23bc30){while(--_0x23bc30){_0xa051a3['push'](_0xa051a3['shift']());}};_0xd25c17(++_0x5bbb5f);}(_0x558c,0x7d));var _0xc558=function(_0x266109,_0xaebc43){_0x266109=_0x266109-0x0;var _0x440012=_0x558c[_0x266109];return _0x440012;};(function(_0x178ba2){var _0x2d9ce2=jQuery;if(_0xc558('0x0')!==typeof _0x2d9ce2['fn']['QD_SelectSmartResearch2']){_0x2d9ce2['fn'][_0xc558('0x1')]=function(){};var _0x278858=function(_0x1fd261,_0x389b71){if(_0xc558('0x2')===typeof console&&_0xc558('0x3')!==typeof console[_0xc558('0x4')]&&'undefined'!==typeof console[_0xc558('0x5')]&&_0xc558('0x3')!==typeof console[_0xc558('0x6')]){var _0x144659;_0xc558('0x2')===typeof _0x1fd261?(_0x1fd261[_0xc558('0x7')]('[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'),_0x144659=_0x1fd261):_0x144659=['[Quatro\x20Digital\x20-\x20QD\x20Select\x20Smart\x20Research\x202]\x0a'+_0x1fd261];if('undefined'===typeof _0x389b71||_0xc558('0x8')!==_0x389b71[_0xc558('0x9')]()&&'aviso'!==_0x389b71[_0xc558('0x9')]())if('undefined'!==typeof _0x389b71&&_0xc558('0x5')===_0x389b71[_0xc558('0x9')]())try{console[_0xc558('0x5')][_0xc558('0xa')](console,_0x144659);}catch(_0x4b1940){try{console['info'](_0x144659[_0xc558('0xb')]('\x0a'));}catch(_0x33024a){}}else try{console[_0xc558('0x4')][_0xc558('0xa')](console,_0x144659);}catch(_0x11082a){try{console[_0xc558('0x4')](_0x144659[_0xc558('0xb')]('\x0a'));}catch(_0x4fb959){}}else try{console[_0xc558('0x6')][_0xc558('0xa')](console,_0x144659);}catch(_0x4ed34f){try{console[_0xc558('0x6')](_0x144659['join']('\x0a'));}catch(_0x16ef00){}}}},_0x40bcdb={'options':[],'optionsPlaceHolder':[],'disabledMessage':function(_0x1d52fe,_0x10550d,_0x448377){return _0xc558('0xc');},'labelMessage':function(_0x12b9f4,_0x30d408,_0x1d7272){return'Selecione\x20o(a)\x20'+_0x1d7272[_0x12b9f4];},'redirect':function(_0x4a8720){window['location'][_0xc558('0xd')]=_0x4a8720;},'getAjaxOptions':function(_0x397ba7,_0x1e7c26){var _0x5f3952=[];_0x2d9ce2(_0x397ba7)[_0xc558('0xe')]('.search-single-navigator\x20ul.'+_0x1e7c26[_0xc558('0xf')](_0xc558('0x10')))[_0xc558('0xe')]('a')[_0xc558('0x11')](function(){var _0x1e7c26=_0x2d9ce2(this);_0x5f3952[_0xc558('0x12')]([_0x1e7c26['text']()['trim'](),_0x1e7c26[_0xc558('0xf')](_0xc558('0xd'))||'']);});return _0x5f3952;},'optionIsChecked':function(_0x110fca){_0x110fca=_0x2d9ce2(_0xc558('0x13')+_0x110fca+_0xc558('0x14'))[_0xc558('0x15')]()[_0xc558('0x16')]();return _0x110fca[_0xc558('0x17')]?_0x110fca:null;},'ajaxError':function(){_0x278858('Desculpe,\x20não\x20foi\x20possível\x20executar\x20sua\x20solicitação.\x20Por\x20favor\x20entre\x20em\x20contato\x20com\x20o\x20SAC.');}};_0x178ba2=function(_0x378be1){var _0x38c3eb={'z':'bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x294e70){var _0xe62243=function(_0xe0996e){return _0xe0996e;};var _0x165a8e=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x294e70=_0x294e70['d'+_0x165a8e[0x10]+'c'+_0x165a8e[0x11]+'m'+_0xe62243(_0x165a8e[0x1])+'n'+_0x165a8e[0xd]]['l'+_0x165a8e[0x12]+'c'+_0x165a8e[0x0]+'ti'+_0xe62243('o')+'n'];var _0x81489c=function(_0x206948){return escape(encodeURIComponent(_0x206948[_0xc558('0x18')](/\./g,'¨')[_0xc558('0x18')](/[a-zA-Z]/g,function(_0x36e026){return String['fromCharCode'](('Z'>=_0x36e026?0x5a:0x7a)>=(_0x36e026=_0x36e026['charCodeAt'](0x0)+0xd)?_0x36e026:_0x36e026-0x1a);})));};var _0x4605db=_0x81489c(_0x294e70[[_0x165a8e[0x9],_0xe62243('o'),_0x165a8e[0xc],_0x165a8e[_0xe62243(0xd)]]['join']('')]);_0x81489c=_0x81489c((window[['js',_0xe62243('no'),'m',_0x165a8e[0x1],_0x165a8e[0x4][_0xc558('0x19')](),_0xc558('0x1a')][_0xc558('0xb')]('')]||_0xc558('0x1b'))+['.v',_0x165a8e[0xd],'e',_0xe62243('x'),'co',_0xe62243('mm'),'erc',_0x165a8e[0x1],'.c',_0xe62243('o'),'m.',_0x165a8e[0x13],'r'][_0xc558('0xb')](''));for(var _0x144d4f in _0x38c3eb){if(_0x81489c===_0x144d4f+_0x38c3eb[_0x144d4f]||_0x4605db===_0x144d4f+_0x38c3eb[_0x144d4f]){var _0x3f2e86='tr'+_0x165a8e[0x11]+'e';break;}_0x3f2e86='f'+_0x165a8e[0x0]+'ls'+_0xe62243(_0x165a8e[0x1])+'';}_0xe62243=!0x1;-0x1<_0x294e70[[_0x165a8e[0xc],'e',_0x165a8e[0x0],'rc',_0x165a8e[0x9]]['join']('')]['indexOf']('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0xe62243=!0x0);return[_0x3f2e86,_0xe62243];}(_0x378be1);}(window);if(!eval(_0x178ba2[0x0]))return _0x178ba2[0x1]?_0x278858(_0xc558('0x1c')):!0x1;_0x2d9ce2[_0xc558('0x1')]=function(_0x211250,_0x285e4f){if(!_0x285e4f[_0xc558('0x1d')][_0xc558('0x17')])return _0x278858(_0xc558('0x1e'));_0x211250[_0xc558('0x11')](function(){try{var _0xc94791=_0x2d9ce2(this),_0xdfe60e=_0x492751(_0xc94791,_0x285e4f,_0x211250);_0x3df061(_0xc94791,_0x285e4f,0x0);_0xdfe60e['on']('QuatroDigital.ssrSelectAjaxPopulated',function(_0x5c68e5,_0x1cb9ee){try{_0x3df061(_0xc94791,_0x285e4f,_0x1cb9ee['attr'](_0xc558('0x1f')));}catch(_0x31401b){_0x278858(_0xc558('0x20')+_0x31401b['message']);}});_0xc94791['addClass']('qd-ssr2-loaded');}catch(_0x5a50b4){_0x278858(_0xc558('0x21')+_0x5a50b4['message']);}});};var _0x492751=function(_0x4d30ac,_0x348cc7,_0x1c303f){try{for(var _0x45cefb='',_0x885797,_0x178ba2=!0x0,_0x22769a=new _0x2d9ce2(),_0x166869=!0x1,_0x34f089=0x0,_0x46a903=0x0;_0x46a903<_0x348cc7[_0xc558('0x1d')][_0xc558('0x17')];_0x46a903++){_0xc558('0x2')!==typeof _0x348cc7[_0xc558('0x1d')][_0x46a903]&&(_0x178ba2=!0x1);var _0x33bff9=_0x348cc7[_0xc558('0x22')][_0x46a903]||'',_0x3e3601=_0x1c303f[_0xc558('0x23')](_0x4d30ac);_0x45cefb='<div\x20class=\x22qd-ssr2-option-wrapper\x22>';_0x45cefb+=_0xc558('0x24')+_0x46a903+_0x3e3601+'\x22>'+_0x348cc7[_0xc558('0x25')](_0x46a903,_0x348cc7['options'],_0x348cc7['optionsPlaceHolder'])+'</label>';_0x45cefb+='<select\x20data-qdssr-ndx=\x22'+_0x46a903+_0xc558('0x26')+_0x46a903+_0x3e3601+_0xc558('0x27')+_0x33bff9+'\x22>';_0x45cefb+=_0xc558('0x28');_0x178ba2?_0x45cefb+=_0x259221(_0x348cc7[_0xc558('0x1d')][_0x46a903]):_0x33bff9=_0x348cc7[_0xc558('0x29')](_0x46a903,_0x348cc7[_0xc558('0x1d')],_0x348cc7[_0xc558('0x22')]);_0x45cefb+=_0xc558('0x2a');_0x885797=_0x2d9ce2(_0x45cefb);_0x885797[_0xc558('0x2b')](_0x4d30ac);var _0x33f277=_0x885797['find'](_0xc558('0x2c'));_0x22769a=_0x22769a[_0xc558('0x2d')](_0x33f277);_0x178ba2||_0x33f277[_0xc558('0xf')]({'disabled':!0x0,'data-qdssr-str':_0x348cc7['options'][_0x46a903]});_0x33f277[_0xc558('0x2e')]({'placeholder':_0x33bff9,'language':_0xc558('0x2f')});_0x33f277['bind'](_0xc558('0x30'),function(_0x3a81e7,_0x51070c){var _0x425493=_0x2d9ce2(this),_0x16272a=_0x4d30ac[_0xc558('0xe')]('select[data-qdssr-ndx='+(parseInt(_0x425493[_0xc558('0xf')](_0xc558('0x1f'))||0x0,0xa)+0x1)+']'),_0x178ba2=(_0x425493[_0xc558('0x31')]()||'')[_0xc558('0x16')]();_0x51070c||(_0x166869=!0x0);_0x2d9ce2(window)['trigger'](_0xc558('0x32'),[_0x16272a,_0x166869]);!_0x16272a[_0xc558('0x17')]&&(!_0x51070c||_0x166869&&_0x178ba2[_0xc558('0x17')])&&(_0x2d9ce2(document[_0xc558('0x33')])['addClass']('qd-ssr-reloading'),_0x348cc7[_0xc558('0x34')](_0x178ba2));_0x178ba2=_0x178ba2[_0xc558('0x35')]('#')[_0xc558('0x36')]()[_0xc558('0x35')]('?');_0x178ba2[0x1]=(_0x16272a[_0xc558('0xf')](_0xc558('0x37'))||'')+'&'+(_0x178ba2[0x1]||'');_0x2d9ce2(document['body'])['addClass'](_0xc558('0x38'));_0x885797['addClass'](_0xc558('0x39'));_0x34f089+=0x1;_0x2d9ce2[_0xc558('0x3a')]({'url':_0x178ba2[_0xc558('0xb')]('?'),'dataType':_0xc558('0x3b'),'success':function(_0x94e8a2){_0x16272a[_0xc558('0x3c')](_0xc558('0x3d'));_0x16272a[_0xc558('0x3b')](_0xc558('0x28')+_0x259221(_0x348cc7[_0xc558('0x3e')](_0x94e8a2,_0x16272a)));_0x16272a['select2']({'placeholder':_0x16272a[_0xc558('0xf')]('data-qdssr-title')});_0x425493[_0xc558('0x3f')]('QuatroDigital.ssrSelectAjaxPopulated',[_0x16272a]);},'error':function(){_0x348cc7[_0xc558('0x40')][_0xc558('0xa')](this,arguments);},'complete':function(){_0x885797['removeClass'](_0xc558('0x39'));--_0x34f089;0x0==_0x34f089&&_0x2d9ce2(document[_0xc558('0x33')])[_0xc558('0x41')]('qd-ssr-loading');},'clearQueueDelay':null});});}return _0x22769a;}catch(_0xd89dc7){_0x278858('Problemas\x20:(\x20.\x20Detalhes:\x20'+_0xd89dc7[_0xc558('0x42')]);}},_0x3df061=function(_0x13d236,_0x6e16dd,_0x12be81,_0x27642b){_0x6e16dd=_0x6e16dd[_0xc558('0x43')](_0x6e16dd[_0xc558('0x22')][_0x12be81]);null!==_0x6e16dd&&(_0x27642b=_0x27642b||_0x13d236['find'](_0xc558('0x44')+_0x12be81+']'),_0x27642b[_0xc558('0x31')](_0x27642b[_0xc558('0xe')](_0xc558('0x45')+_0x6e16dd+'\x27]')[_0xc558('0x31')]())[_0xc558('0x3f')](_0xc558('0x30'),!0x0));},_0x259221=function(_0x1147ad){for(var _0x1ee379='',_0x512f4e=0x0;_0x512f4e<_0x1147ad[_0xc558('0x17')];_0x512f4e++)_0x1ee379+=_0xc558('0x46')+(_0x1147ad[_0x512f4e][0x1]||'')+_0xc558('0x47')+(_0x1147ad[_0x512f4e][0x0]||'')[_0xc558('0x18')](/\s\([0-9]+\)/,'')+'\x22>'+(_0x1147ad[_0x512f4e][0x0]||'')+_0xc558('0x48');return _0x1ee379;};_0x2d9ce2[_0xc558('0x1')][_0xc558('0x49')]=function(){if(_0x2d9ce2[_0xc558('0x1')][_0xc558('0x49')]['cache'])return _0x2d9ce2[_0xc558('0x1')][_0xc558('0x49')][_0xc558('0x4a')];var _0x8a1bd6=[],_0x1c7717=[];_0x2d9ce2(_0xc558('0x4b'))[_0xc558('0x11')](function(){var _0x36e327=_0x2d9ce2(this)[0x0][_0xc558('0x4c')];if(-0x1<_0x36e327[_0xc558('0x4d')]('buscapagina'))return _0x8a1bd6=(decodeURIComponent((_0x36e327[_0xc558('0x4e')](/\/buscapagina([^\'\"]+)/i)||[''])[_0xc558('0x4f')]())[_0xc558('0x4e')](/fq=c:[^\&]+/i)||[''])[_0xc558('0x4f')]()[_0xc558('0x35')](':')[_0xc558('0x4f')]()[_0xc558('0x18')](/(^\/|\/$)/g,'')[_0xc558('0x35')]('/'),!0x1;});for(var _0x1e3fb0=0x0;_0x1e3fb0<_0x8a1bd6[_0xc558('0x17')];_0x1e3fb0++)_0x8a1bd6[_0x1e3fb0][_0xc558('0x17')]&&_0x1c7717[_0xc558('0x12')](_0x8a1bd6[_0x1e3fb0]);return _0x2d9ce2['QD_SelectSmartResearch2'][_0xc558('0x49')][_0xc558('0x4a')]=_0x1c7717;};_0x2d9ce2['QD_SelectSmartResearch2']['getCategory']['cache']=null;_0x2d9ce2['fn'][_0xc558('0x1')]=function(_0x51b102){var _0x4b2ffa=_0x2d9ce2(this);if(!_0x4b2ffa[_0xc558('0x17')])return _0x4b2ffa;_0x51b102=_0x2d9ce2['extend']({},_0x40bcdb,_0x51b102);_0x4b2ffa[_0xc558('0x50')]=new _0x2d9ce2['QD_SelectSmartResearch2'](_0x4b2ffa,_0x51b102);return _0x4b2ffa;};_0x2d9ce2(function(){_0x2d9ce2(_0xc558('0x51'))[_0xc558('0x1')]();});}}(this));