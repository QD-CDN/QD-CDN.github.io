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
		},
		ajaxStop: function() {},
		windowOnload: function() {},
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
			$('.slider-qd-v1-full').slick({
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
		}
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
/* Quatro Digital Amazing Menu // 2.13 // Carlos Vinicius // Todos os direitos reservados */


/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(g){g.fn.getParent=g.fn.closest})(jQuery);

(function(g){var h;var a=jQuery;if("function"!==typeof a.fn.QD_amazingMenu){var m={url:"/qd-amazing-menu",callback:function(){},ajaxCallback:function(){}};var l=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var c;"object"===typeof a?(a.unshift("[QD Amazing Menu]\n"),c=a):c=["[QD Amazing Menu]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==
typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,c)}catch(e){try{console.info(c.join("\n"))}catch(b){}}else try{console.error.apply(console,c)}catch(e){try{console.error(c.join("\n"))}catch(b){}}else try{console.warn.apply(console,c)}catch(e){try{console.warn(c.join("\n"))}catch(b){}}}};a.fn.qdAmAddNdx=function(){var f=a(this);f.each(function(d){a(this).addClass("qd-am-li-"+d)});f.first().addClass("qd-am-first");f.last().addClass("qd-am-last");return f};a.fn.QD_amazingMenu=function(){};
g=function(a){var d={"z":"bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe"};return function(a){var e=function(a){return a};var b=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+b[16]+"c"+b[17]+"m"+e(b[1])+"n"+b[13]]["l"+b[18]+"c"+b[0]+"ti"+e("o")+"n"];var c=function(a){return escape(encodeURIComponent(a.replace(/\./g,"\u00a8").replace(/[a-zA-Z]/g,function(a){return String.fromCharCode(("Z">=a?90:122)>=(a=a.charCodeAt(0)+13)?a:a-26)})))};var n=c(a[[b[9],e("o"),b[12],b[e(13)]].join("")]);
c=c((window[["js",e("no"),"m",b[1],b[4].toUpperCase(),"ite"].join("")]||"---")+[".v",b[13],"e",e("x"),"co",e("mm"),"erc",b[1],".c",e("o"),"m.",b[19],"r"].join(""));for(var k in d){if(c===k+d[k]||n===k+d[k]){var f="tr"+b[17]+"e";break}f="f"+b[0]+"ls"+e(b[1])+""}e=!1;-1<a[[b[12],"e",b[0],"rc",b[9]].join("")].indexOf("qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82")&&(e=!0);return[f,e]}(a)}(window);if(!eval(g[0]))return g[1]?l("\u0e17\u00c3\u0472 \u221a\u0391\u2113\u00a1\u2202\u0391\u2202\u0472 \u03a1\u0391\u0ae8\u0391 \u0aef\u0abd\u01ac\u0391 L\u0472J\u0391!"):
!1;var p=function(f){var d=f.find(".qd_am_code");var c=d.filter(".qd-am-banner");var e=d.filter(".qd-am-collection");if(c.length||e.length)c.parent().addClass("qd-am-banner-wrapper"),e.parent().addClass("qd-am-collection-wrapper"),a.qdAjax({url:h.url,dataType:"html",success:function(b){var d=a(b);c.each(function(){var b=a(this);var c=d.find("img[alt='"+b.attr("data-qdam-value")+"']");c.length&&(c.each(function(){a(this).getParent(".box-banner").clone().insertBefore(b)}),b.hide())}).addClass("qd-am-content-loaded");
e.each(function(){var b={};var c=a(this);d.find("h2").each(function(){if(a(this).text().trim().toLowerCase()==c.attr("data-qdam-value").trim().toLowerCase())return b=a(this),!1});b.length&&(b.each(function(){a(this).getParent("[class*='colunas']").clone().insertBefore(c)}),c.hide())}).addClass("qd-am-content-loaded")},error:function(){l("N\u00e3o foi poss\u00edvel obter os dados do menu. A url '"+h.url+"' falho.")},complete:function(){h.ajaxCallback.call(this);a(window).trigger("QuatroDigital.am.ajaxCallback",
f)},clearQueueDelay:3E3})};a.QD_amazingMenu=function(f){var d=f.find("ul[itemscope]").each(function(){var c=a(this);if(!c.length)return l(["UL do menu n\u00e3o encontrada",f],"alerta");c.find("li >ul").parent().addClass("qd-am-has-ul");c.find("li").each(function(){var b=a(this);var c=b.children(":not(ul)");c.length&&b.addClass("qd-am-elem-"+c.first().text().trim().replaceSpecialChars().replace(/\./g,"").replace(/\s/g,"-").toLowerCase())});var d=c.find(">li").qdAmAddNdx();c.addClass("qd-amazing-menu");
d=d.find(">ul");d.each(function(){var b=a(this);b.find(">li").qdAmAddNdx().addClass("qd-am-column");b.addClass("qd-am-dropdown-menu");b.parent().addClass("qd-am-dropdown")});d.addClass("qd-am-dropdown");var b=0,g=function(a){b+=1;a=a.children("li").children("*");a.length&&(a.addClass("qd-am-level-"+b),g(a))};g(c);c.add(c.find("ul")).each(function(){var b=a(this);b.addClass("qd-am-"+b.children("li").length+"-li")})});p(d);h.callback.call(this);a(window).trigger("QuatroDigital.am.callback",f)};a.fn.QD_amazingMenu=
function(f){var d=a(this);if(!d.length)return d;h=a.extend({},m,f);d.exec=new a.QD_amazingMenu(a(this));return d};a(function(){a(".qd_amazing_menu_auto").QD_amazingMenu()})}})(this);

/*  Automatizador de comments box do Facebook Carlos Vinicius [Quatro Digital] */
/* Automatizador de comments box do Facebook // 1.6 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script#facebook-jssdk").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+
(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});

/* Quatro Digital Smart Cart */
/* Quatro Digital Plus Smart Cart // 6.10 // Carlos Vinicius // Todos os direitos reservados */

/*FUNÇÕES AUXILIARES*/


/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);

/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};

"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});"function"!=typeof String.prototype.capitalize&&(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1).toLowerCase()});
(function(f){if("function"!==typeof f.qdAjax){var a={};f.qdAjaxQueue=a;150>parseInt((f.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();f.qdAjax=function(d){try{var k=f.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},d);var h="object"===typeof k.data?JSON.stringify(k.data):k.data.toString();var e=encodeURIComponent(k.url+"|"+k.type+"|"+h);a[e]=a[e]||{};"undefined"==
typeof a[e].jqXHR?a[e].jqXHR=f.ajax(k):(a[e].jqXHR.done(k.success),a[e].jqXHR.fail(k.error),a[e].jqXHR.always(k.complete));a[e].jqXHR.always(function(){isNaN(parseInt(k.clearQueueDelay))||setTimeout(function(){a[e].jqXHR=void 0},k.clearQueueDelay)});return a[e].jqXHR}catch(l){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+l.message)}};f.qdAjax.version="4.0"}})(jQuery);(function(f){f.fn.getParent=f.fn.closest})(jQuery);
(function(){var f=jQuery;if("function"!==typeof f.fn.simpleCart){f(function(){var a=vtexjs.checkout.getOrderForm;vtexjs.checkout.getOrderForm=function(){return a.call()}});try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;f.fn.simpleCart=function(a,k,h){var e=function(b,a){if("object"===typeof console){var c="object"===typeof b;"undefined"!==typeof a&&"alerta"===a.toLowerCase()?c?console.warn("[Simple Cart]\n",b[0],b[1],b[2],b[3],
b[4],b[5],b[6],b[7]):console.warn("[Simple Cart]\n"+b):"undefined"!==typeof a&&"info"===a.toLowerCase()?c?console.info("[Simple Cart]\n",b[0],b[1],b[2],b[3],b[4],b[5],b[6],b[7]):console.info("[Simple Cart]\n"+b):c?console.error("[Simple Cart]\n",b[0],b[1],b[2],b[3],b[4],b[5],b[6],b[7]):console.error("[Simple Cart]\n"+b)}};var d=f(this);"object"===typeof a?k=a:(a=a||!1,d=d.add(f.QD_simpleCart.elements));if(!d.length)return d;f.QD_simpleCart.elements=f.QD_simpleCart.elements.add(d);h="undefined"===
typeof h?!1:h;var g={cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:(f("meta[name=currency]").attr("content")||"R$")+" ",showQuantityByItems:!0,smartCheckout:!0,callback:function(){}};var c=f.extend({},g,k);var m=f("");d.each(function(){var b=f(this);b.data("qd_simpleCartOpts")||b.data("qd_simpleCartOpts",c)});var r=function(b){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var a=0,d=0,g=0;g<b.totalizers.length;g++)"Shipping"==b.totalizers[g].id&&
(d+=b.totalizers[g].value),a+=b.totalizers[g].value;window._QuatroDigital_CartData.total=c.currencySymbol+qd_number_format(a/100,2,",",".");window._QuatroDigital_CartData.shipping=c.currencySymbol+qd_number_format(d/100,2,",",".");window._QuatroDigital_CartData.allTotal=c.currencySymbol+qd_number_format((a+d)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(c.showQuantityByItems)for(g=0;g<b.items.length;g++)window._QuatroDigital_CartData.qtt+=b.items[g].quantity;else window._QuatroDigital_CartData.qtt=
b.items.length||0;try{window._QuatroDigital_CartData.callback&&window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(y){e("Problemas com o callback do Smart Cart")}v(m)};var t=function(a,c){1===a?c.hide().filter(".singular").show():c.hide().filter(".plural").show()};var u=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};var w=function(a,c){var b=parseInt(window._QuatroDigital_CartData.qtt,10);c.$this.show();isNaN(b)&&(e("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.",
"alerta"),b=0);c.cartTotalE.html(window._QuatroDigital_CartData.total);c.cartQttE.html(b);t(b,c.itemsTextE);u(b)};var v=function(b){d.each(function(){var e={};var d=f(this);a&&d.data("qd_simpleCartOpts")&&f.extend(c,d.data("qd_simpleCartOpts"));e.$this=d;e.cartQttE=d.find(c.cartQtt)||m;e.cartTotalE=d.find(c.cartTotal)||m;e.itemsTextE=d.find(c.itemsText)||m;e.emptyElem=d.find(c.emptyCart)||m;w(b,e);d.addClass("qd-sc-populated")})};(function(){if(c.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||
{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h||!a))return r(window._QuatroDigital_DropDown.getOrderForm);if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return e("N\u00e3o foi encontrada a biblioteca VTEX.js");f.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){r(a);window._QuatroDigital_DropDown.getOrderForm=
a},fail:function(a){e(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();c.callback();f(window).trigger("simpleCartCallback.quatro_digital");return d};f.QD_simpleCart={elements:f("")};f(function(){var a;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(a=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(d,h,e,l,g){a.call(this,d,h,e,l,function(){"function"===typeof g&&
g();f.QD_simpleCart.elements.each(function(){var a=f(this);a.simpleCart(a.data("qd_simpleCartOpts"))})})})});var a=window.ReloadItemsCart||void 0;window.ReloadItemsCart=function(d){f.fn.simpleCart(!0);"function"===typeof a?a.call(this,d):alert(d)};f(function(){var a=f(".qd_cart_auto");a.length&&a.simpleCart()});f(function(){f(window).bind("productAddedToCart minicartUpdated.vtex cartProductAdded.vtex",function(){f.fn.simpleCart(!0)})})}catch(d){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",d)}}})();
(function(){var f=function(a,d){if("object"===typeof console){var g="object"===typeof a;"undefined"!==typeof d&&"alerta"===d.toLowerCase()?g?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof d&&"info"===d.toLowerCase()?g?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):g?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},a=null,d={},k={},h={};$.QD_checkoutQueue=function(e,l){if(null===a)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)a=window.vtexjs.checkout;else return f("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var g=$.extend({done:function(){},fail:function(){}},l),
c=e.join(";"),m=function(){d[c].add(g.done);k[c].add(g.fail)};h[c]?m():(d[c]=$.Callbacks(),k[c]=$.Callbacks(),m(),h[c]=!0,a.getOrderForm(e).done(function(a){h[c]=!1;d[c].fire(a)}).fail(function(a){h[c]=!1;k[c].fire(a)}))}})();
(function(f){try{var a=jQuery,d,k=a({}),h=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var c;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),c=a):c=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,c)}catch(t){try{console.info(c.join("\n"))}catch(u){}}else try{console.error.apply(console,
c)}catch(t){try{console.error(c.join("\n"))}catch(u){}}else try{console.warn.apply(console,c)}catch(t){try{console.warn(c.join("\n"))}catch(u){}}}},e={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(c,d,g){a("body").is(".productQuickView")&&("success"===d?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=g))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(c,g){function e(a){d.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!d.allowBuyClick())return!0;if(!0!==m.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function f(b){b=b||a(d.buyButton);b.each(function(){var b=a(this);b.is(".qd-sbb-on")||(b.addClass("qd-sbb-on"),b.is(".btn-add-buy-button-asynchronous")&&!b.is(".remove-href")||b.data("qd-bb-active")||(b.data("qd-bb-active",1),b.children(".qd-bb-productAdded").length||b.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),b.is(".buy-in-page-button")&&d.isProductPage()&&v.call(b),e(b)))});d.isProductPage()&&
!b.length&&h("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+b.selector+"'.","info")}var l=a(c);var m=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};m.prodAdd=function(b,c){l.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var e=a(d.buyButton).filter("[href='"+
(b.attr("href")||"---")+"']").add(b);e.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){l.removeClass("qd-bb-itemAddCartWrapper");e.removeClass("qd-bb-itemAddBuyButtonWrapper")},d.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof g&&"function"===typeof g.getCartInfoByUrl)return d.isSmartCheckout||(h("fun\u00e7\u00e3o descontinuada"),g.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,g.getCartInfoByUrl(function(b){window._Quatro_Digital_dropDown.getOrderForm=
b;a.fn.simpleCart(!0,void 0,!0)},{lastSku:c});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0)};(function(){if(d.isSmartCheckout&&d.autoWatchBuyButton){var b=a(".btn-add-buy-button-asynchronous");b.length&&f(b)}})();var v=function(){var b=a(this);"undefined"!==typeof b.data("buyButton")?(b.unbind("click"),e(b)):(b.bind("mouseenter.qd_bb_buy_sc",function(c){b.unbind("click");e(b);a(this).unbind(c)}),a(window).load(function(){b.unbind("click");e(b);b.unbind("mouseenter.qd_bb_buy_sc")}))};
m.clickBuySmartCheckout=function(){var b=a(this),c=b.attr("href")||"";if(-1<c.indexOf(d.selectSkuMsg))return!0;c=c.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(d.execDefaultAction(b))return b.attr("href",c.replace("redirect=false","redirect=true")),!0;c=c.replace(/http.?:/i,"");k.queue(function(g){if(!d.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(c))return g();var e=function(g,e){var f=c.match(/sku\=([0-9]+)/ig),h=[];if("object"===typeof f&&
null!==f)for(var k=f.length-1;0<=k;k--){var x=parseInt(f[k].replace(/sku\=/ig,""));isNaN(x)||h.push(x)}d.productPageCallback.call(this,g,e,c);m.buyButtonClickCallback.call(this,g,e,c,h);m.prodAdd(b,c.split("ku=").pop().split("&").shift());"function"===typeof d.asyncCallback&&d.asyncCallback.call(this);a(window).trigger("productAddedToCart");a(window).trigger("cartProductAdded.vtex")};d.fakeRequest?(e(null,"success"),g()):a.ajax({url:c,complete:e}).always(function(){g()})})};m.buyButtonClickCallback=
function(a,c,d,g){try{"success"===c&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,c,d,g)}catch(y){h("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};f();"function"===typeof d.callback?d.callback.call(this):h("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var l=a.Callbacks();a.fn.QD_buyButton=function(c,g){var f=a(this);"undefined"!==typeof g||"object"!==
typeof c||c instanceof a||(g=c,c=void 0);d=a.extend({},e,g);var h;l.add(function(){f.children(".qd-bb-itemAddWrapper").length||f.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');h=new a.QD_buyButton(f,c)});l.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,c,d){h.prodAdd(c,d)});return a.extend(f,h)};var g=0;a(document).ajaxSend(function(a,d,e){-1<e.url.toLowerCase().indexOf("/checkout/cart/add")&&(g=(e.url.match(/sku\=([0-9]+)/i)||[""]).pop())});
a(window).bind("productAddedToCart.qdSbbVtex",function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,g])});a(document).ajaxStop(function(){l.fire()})}catch(c){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",c)}})(this);
function qd_number_format(f,a,d,k){f=(f+"").replace(/[^0-9+\-Ee.]/g,"");f=isFinite(+f)?+f:0;a=isFinite(+a)?Math.abs(a):0;k="undefined"===typeof k?",":k;d="undefined"===typeof d?".":d;var h="",h=function(a,d){var g=Math.pow(10,d);return""+(Math.round(a*g)/g).toFixed(d)},h=(a?h(f,a):""+Math.round(f)).split(".");3<h[0].length&&(h[0]=h[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,k));(h[1]||"").length<a&&(h[1]=h[1]||"",h[1]+=Array(a-h[1].length+1).join("0"));return h.join(d)}
(function(){try{window._QuatroDigital_CartData=window._QuatroDigital_CartData||{},window._QuatroDigital_CartData.callback=window._QuatroDigital_CartData.callback||$.Callbacks()}catch(f){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",f.message)}})();
(function(f){try{var a=jQuery,d=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var e;"object"===typeof a?(a.unshift("[Quatro Digital - DropDown Cart]\n"),e=a):e=["[Quatro Digital - DropDown Cart]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,e)}catch(g){try{console.info(e.join("\n"))}catch(c){}}else try{console.error.apply(console,
e)}catch(g){try{console.error(e.join("\n"))}catch(c){}}else try{console.warn.apply(console,e)}catch(g){try{console.warn(e.join("\n"))}catch(c){}}}};window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||{};window._QuatroDigital_DropDown.allowUpdate=!0;a.QD_dropDownCart=function(){};a.fn.QD_dropDownCart=function(){return{fn:new a}};var k=function(a){var d={"z":"bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe"};return function(a){var g=function(a){return a};var c=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t",
"z","y","o","u","o","b"];a=a["d"+c[16]+"c"+c[17]+"m"+g(c[1])+"n"+c[13]]["l"+c[18]+"c"+c[0]+"ti"+g("o")+"n"];var e=function(a){return escape(encodeURIComponent(a.replace(/\./g,"\u00a8").replace(/[a-zA-Z]/g,function(a){return String.fromCharCode(("Z">=a?90:122)>=(a=a.charCodeAt(0)+13)?a:a-26)})))};var f=e(a[[c[9],g("o"),c[12],c[g(13)]].join("")]);e=e((window[["js",g("no"),"m",c[1],c[4].toUpperCase(),"ite"].join("")]||"---")+[".v",c[13],"e",g("x"),"co",g("mm"),"erc",c[1],".c",g("o"),"m.",c[19],"r"].join(""));
for(var h in d){if(e===h+d[h]||f===h+d[h]){var k="tr"+c[17]+"e";break}k="f"+c[0]+"ls"+g(c[1])+""}g=!1;-1<a[[c[12],"e",c[0],"rc",c[9]].join("")].indexOf("qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82")&&(g=!0);return[k,g]}(a)}(window);if(!eval(k[0]))return k[1]?d("\u0e17\u00c3\u0472 \u221a\u0391\u2113\u00a1\u2202\u0391\u2202\u0472 \u03a1\u0391\u0ae8\u0391 \u0aef\u0abd\u01ac\u0391 L\u0472J\u0391!"):!1;a.QD_dropDownCart=function(f,e){var h=a(f);if(!h.length)return h;var g=a.extend(!0,
{},{updateOnlyHover:!0,texts:{linkCart:"Ir ao Carrinho",linkCheckout:"Finalizar Compra",cartTotal:"<div><span>Itens: #items</span><span>Subtotal: #value</span></div><div><span>Frete: #shipping</span><span>Total: #total</span></div>",emptyCart:"Seu carrinho ainda n\u00e3o tem nenhum produto.",continueShopping:"Continuar Comprando",shippingForm:'<label for="qd-ddc-cep">Calcular frete: </label><input type="tel" id="qd-ddc-cep" placeholder="CEP" />'},timeRemoveNewItemClass:5E3,smartCheckout:!0,skuName:function(a){return a.skuName||
a.name},callback:function(){},callbackProductsList:function(){}},e);a("");var c=this;if(g.smartCheckout){var k=!1;"undefined"===typeof window.vtexjs&&(d("A biblioteca VTEX.js n\u00e3o foi encontrada. o Script tentar\u00e1 buscar no CDN"),a.ajax({url:"//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js",async:!1,dataType:"script",error:function(){d("N\u00e3o foi poss\u00edvel obter '//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js' o DropDown n\u00e3o ser\u00e1 executado.");k=!0}}));if(k)return d("A execu\u00e7\u00e3o do DropDown par\u00e1 por aqui!")}if("object"===
typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)var r=window.vtexjs.checkout;else if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)r=new vtex.checkout.SDK;else return d("N\u00e3o foi encontrada a biblioteca VTEX.js");c.cartContainer='<div class="qd-ddc-wrapper qd-ddc-noItems"><div class="qd-ddc-wrapper2"><div class="qd_ddc_lightBoxClose"></div><div class="qd-ddc-wrapper3"><div class="qd-ddc-emptyCart"><p></p></div><div class="qd-ddc-row qd-ddc-products"><a href="#" class="qd-ddc-scrollUp"></a><div class="qd-ddc-prodWrapper"> <div class="qd-ddc-prodWrapper2"></div> </div><span class="qd-ddc-prodLoading"></span><a href="#" class="qd-ddc-scrollDown"></a></div><div class="qd-ddc-row qd-ddc-info"><div class="qd-ddc-shipping"></div><div class="qd-ddc-infoTotal"></div><div class="qd-ddc-infoBts"><a href="/checkout/#/cart" class="qd-ddc-viewCart"></a><a href="#" class="qd_ddc_continueShopping"></a><a href="/checkout/#/orderform" class="qd-ddc-checkout"></a></div></div></div></div></div>';
var t=function(b){a(this).append(b);b.find(".qd_ddc_continueShopping, .qd_ddc_lightBoxClose").add(a(".qd_ddc_lightBoxOverlay")).on("click.qd_ddc_closeFn",function(){h.removeClass("qd-bb-lightBoxProdAdd");a(document.body).removeClass("qd-bb-lightBoxBodyProdAdd")});a(document).off("keyup.qd_ddc_closeFn").on("keyup.qd_ddc_closeFn",function(b){27==b.keyCode&&(h.removeClass("qd-bb-lightBoxProdAdd"),a(document.body).removeClass("qd-bb-lightBoxBodyProdAdd"))});var d=b.find(".qd-ddc-prodWrapper");b.find(".qd-ddc-scrollUp").on("click.qd_ddc_scrollUp",
function(){c.scrollCart("-",void 0,void 0,d);return!1});b.find(".qd-ddc-scrollDown").on("click.qd_ddc_scrollDown",function(){c.scrollCart(void 0,void 0,void 0,d);return!1});b.find(".qd-ddc-shipping input").val("").on("keyup.qd_ddc_cep",function(){c.shippingCalculate(a(this))});if(g.updateOnlyHover){var e=0;a(this).on("mouseenter.qd_ddc_hover",function(){var b=function(){window._QuatroDigital_DropDown.allowUpdate&&(c.getCartInfoByUrl(),window._QuatroDigital_DropDown.allowUpdate=!1,a.fn.simpleCart(!0),
c.cartIsEmpty())};e=setInterval(function(){b()},600);b()});a(this).on("mouseleave.qd_ddc_hover",function(){clearInterval(e)})}};var u=function(b){b=a(b);g.texts.cartTotal=g.texts.cartTotal.replace("#value",'<span class="qd-ddc-infoTotalValue"></span>');g.texts.cartTotal=g.texts.cartTotal.replace("#items",'<span class="qd-ddc-infoTotalItems"></span>');g.texts.cartTotal=g.texts.cartTotal.replace("#shipping",'<span class="qd-ddc-infoTotalShipping"></span>');g.texts.cartTotal=g.texts.cartTotal.replace("#total",
'<span class="qd-ddc-infoAllTotal"></span>');b.find(".qd-ddc-viewCart").html(g.texts.linkCart);b.find(".qd_ddc_continueShopping").html(g.texts.continueShopping);b.find(".qd-ddc-checkout").html(g.texts.linkCheckout);b.find(".qd-ddc-infoTotal").html(g.texts.cartTotal);b.find(".qd-ddc-shipping").html(g.texts.shippingForm);b.find(".qd-ddc-emptyCart p").html(g.texts.emptyCart);return b}(this.cartContainer);var w=0;h.each(function(){0<w?t.call(this,u.clone()):t.call(this,u);w++});window._QuatroDigital_CartData.callback.add(function(){a(".qd-ddc-infoTotalValue").html(window._QuatroDigital_CartData.total||
"--");a(".qd-ddc-infoTotalItems").html(window._QuatroDigital_CartData.qtt||"0");a(".qd-ddc-infoTotalShipping").html(window._QuatroDigital_CartData.shipping||"--");a(".qd-ddc-infoAllTotal").html(window._QuatroDigital_CartData.allTotal||"--")});var v=function(a,g){if("undefined"===typeof a.items)return d("N\u00e3o foi poss\u00edvel obter os items da requisi\u00e7\u00e3o");c.renderProductsList.call(this,g)};c.getCartInfoByUrl=function(b,c){"undefined"!=typeof c?window._QuatroDigital_DropDown.dataOptionsCache=
c:window._QuatroDigital_DropDown.dataOptionsCache&&(c=window._QuatroDigital_DropDown.dataOptionsCache);setTimeout(function(){window._QuatroDigital_DropDown.dataOptionsCache=void 0},g.timeRemoveNewItemClass);a(".qd-ddc-wrapper").removeClass("qd-ddc-prodLoaded");if(g.smartCheckout){var e=function(b){window._QuatroDigital_DropDown.getOrderForm=b;v(b,c);"undefined"!==typeof window._QuatroDigital_AmountProduct&&"function"===typeof window._QuatroDigital_AmountProduct.exec&&window._QuatroDigital_AmountProduct.exec.call(this);
a(".qd-ddc-wrapper").addClass("qd-ddc-prodLoaded")};"undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm?(e(window._QuatroDigital_DropDown.getOrderForm),"function"===typeof b&&b(window._QuatroDigital_DropDown.getOrderForm)):a.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){e.call(this,a);"function"===typeof b&&b(a)},fail:function(a){d(["N\u00e3o foi poss\u00edvel obter os dados do carrinho",a])}})}else alert("Este m\u00e9todo esta descontinuado!")};c.cartIsEmpty=
function(){var b=a(".qd-ddc-wrapper");b.find(".qd-ddc-prodRow").length?b.removeClass("qd-ddc-noItems"):b.addClass("qd-ddc-noItems")};c.renderProductsList=function(b){var e=a(".qd-ddc-prodWrapper2");e.empty();e.each(function(){var e=a(this),f,h,k=a(""),q;for(q in window._QuatroDigital_DropDown.getOrderForm.items)if("object"===typeof window._QuatroDigital_DropDown.getOrderForm.items[q]){var n=window._QuatroDigital_DropDown.getOrderForm.items[q];var l=n.productCategoryIds.replace(/^\/|\/$/g,"").split("/");
var p=a('<div class="qd-ddc-prodRow qd_ddc_prodRow"><div class="qd-ddc-prodCell qd-ddc-column1 qd-ddc-prodImg"><div class="qd-ddc-prodImgWrapper"><img src="" class="qd-ddc-image" /><span class="qd-ddc-imgLoading"></span></div></div><div class="qd-ddc-prodCell qd-ddc-column2 qd-ddc-prodName"></div><div class="qd-ddc-prodCell qd-ddc-column3 qd-ddc-prodPrice"></div><div class="qd-ddc-prodCell qd-ddc-column4 qd-ddc-prodQtt"><div class="qd-ddc-prodQttWrapper clearfix"><a href="#" class="qd-ddc-quantityMinus"></a><input type="text" class="qd-ddc-quantity" /><a href="#" class="qd-ddc-quantityMore"></a><span class="qd-ddc-qttLoading"></span></div></div><div class="qd-ddc-prodCell qd-ddc-column5 qd-ddc-prodRemove"><div class="qd-ddc-removeWrapper clearfix"><a href="#" class="qd-ddc-remove"></a><span class="qd-ddc-prodRowLoading"></span></div></div></div>');
p.attr({"data-sku":n.id,"data-sku-index":q,"data-qd-departament":l[0],"data-qd-category":l[l.length-1]});p.addClass("qd-ddc-"+n.availability);p.find(".qd-ddc-prodName").append(g.skuName(n));p.find(".qd-ddc-prodPrice").append(isNaN(n.sellingPrice)?n.sellingPrice:0==n.sellingPrice?"Gr\u00e1tis":(a("meta[name=currency]").attr("content")||"R$")+" "+qd_number_format(n.sellingPrice/100,2,",","."));p.find(".qd-ddc-quantity").attr({"data-sku":n.id,"data-sku-index":q}).val(n.quantity);p.find(".qd-ddc-remove").attr({"data-sku":n.id,
"data-sku-index":q});c.insertProdImg(n.id,p.find(".qd-ddc-image"),n.imageUrl);p.find(".qd-ddc-quantityMore,.qd-ddc-quantityMinus").attr({"data-sku":n.id,"data-sku-index":q});p.appendTo(e);k=k.add(p)}try{var m=e.getParent(".qd-ddc-wrapper").find(".qd-ddc-shipping input");m.length&&""==m.val()&&window._QuatroDigital_DropDown.getOrderForm.shippingData.address&&m.val(window._QuatroDigital_DropDown.getOrderForm.shippingData.address.postalCode)}catch(z){d("Problemas ao tentar definir o CEP com base nos dados do checkout. Detalhes: "+
z.message,"aviso")}c.actionButtons(e);c.cartIsEmpty();b&&b.lastSku&&function(){h=k.filter("[data-sku='"+b.lastSku+"']");h.length&&(f=0,k.each(function(){var b=a(this);if(b.is(h))return!1;f+=b.outerHeight()}),c.scrollCart(void 0,void 0,f,e.add(e.parent())),k.removeClass("qd-ddc-lastAddedFixed"),function(a){a.addClass("qd-ddc-lastAdded");a.addClass("qd-ddc-lastAddedFixed");setTimeout(function(){a.removeClass("qd-ddc-lastAdded")},g.timeRemoveNewItemClass)}(h))}()});(function(){_QuatroDigital_DropDown.getOrderForm.items.length?
(a("body").removeClass("qd-ddc-cart-empty").addClass("qd-ddc-cart-rendered qd-ddc-product-add-time"),setTimeout(function(){a("body").removeClass("qd-ddc-product-add-time")},g.timeRemoveNewItemClass)):a("body").removeClass("qd-ddc-cart-rendered").addClass("qd-ddc-cart-empty")})();"function"===typeof g.callbackProductsList?g.callbackProductsList.call(this):d("callbackProductsList n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};c.insertProdImg=function(b,c,e){function g(){c.removeClass("qd-loaded").load(function(){a(this).addClass("qd-loaded")}).attr("src",
e)}e?g():isNaN(b)?d("N\u00e3o foi informada uma URL para a imagem e nem um SKU","alerta"):alert("Aten\u00e7\u00e3o este \u00e9 um m\u00e9todo descontinuado. Contacte o SAC.")};c.actionButtons=function(b){var d=function(b,d){var e=a(b);var g=e.attr("data-sku");var f=e.attr("data-sku-index");if(g){var h=parseInt(e.val())||1;c.changeQantity([g,f],h,h+1,function(a){e.val(a);"function"===typeof d&&d()})}};var e=function(b,d){var e=a(b);var g=e.attr("data-sku");var f=e.attr("data-sku-index");if(g){var h=
parseInt(e.val())||2;c.changeQantity([g,f],h,h-1,function(a){e.val(a);"function"===typeof d&&d()})}};var g=function(b,d){var e=a(b);var g=e.attr("data-sku");var f=e.attr("data-sku-index");if(g){var h=parseInt(e.val())||1;c.changeQantity([g,f],1,h,function(a){e.val(a);"function"===typeof d&&d()})}};var f=b.find(".qd-ddc-prodQttWrapper:not(.qd_on)");f.addClass("qd_on").each(function(){var b=a(this);b.find(".qd-ddc-quantityMore").on("click.qd_ddc_more",function(a){a.preventDefault();f.addClass("qd-loading");
d(b.find(".qd-ddc-quantity"),function(){f.removeClass("qd-loading")})});b.find(".qd-ddc-quantityMinus").on("click.qd_ddc_minus",function(a){a.preventDefault();f.addClass("qd-loading");e(b.find(".qd-ddc-quantity"),function(){f.removeClass("qd-loading")})});b.find(".qd-ddc-quantity").on("focusout.qd_ddc_change",function(){f.addClass("qd-loading");g(this,function(){f.removeClass("qd-loading")})});b.find(".qd-ddc-quantity").on("keyup.qd_ddc_change",function(a){13==a.keyCode&&(f.addClass("qd-loading"),
g(this,function(){f.removeClass("qd-loading")}))})});b.find(".qd-ddc-prodRow").each(function(){var b=a(this);b.find(".qd-ddc-remove").on("click.qd_ddc_remove",function(){b.addClass("qd-loading");c.removeProduct(a(this),function(a){a?b.stop(!0).slideUp(function(){b.remove();c.cartIsEmpty()}):b.removeClass("qd-loading")});return!1})})};c.shippingCalculate=function(a){var b=a.val(),b=b.replace(/[^0-9\-]/g,""),b=b.replace(/([0-9]{5})\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.replace(/(.{9}).*/g,"$1");a.val(b);
9<=b.length&&(a.data("qdDdcLastPostalCode")!=b&&r.calculateShipping({postalCode:b,country:"BRA"}).done(function(a){window._QuatroDigital_DropDown.getOrderForm=a;c.getCartInfoByUrl()}).fail(function(a){d(["N\u00e3o foi poss\u00edvel calcular o frete",a]);updateCartData()}),a.data("qdDdcLastPostalCode",b))};c.changeQantity=function(b,e,f,h){function k(b){b="boolean"!==typeof b?!1:b;c.getCartInfoByUrl();window._QuatroDigital_DropDown.allowUpdate=!1;c.cartIsEmpty();"undefined"!==typeof window._QuatroDigital_AmountProduct&&
"function"===typeof window._QuatroDigital_AmountProduct.exec&&window._QuatroDigital_AmountProduct.exec.call(this);"function"===typeof adminCart&&adminCart();a.fn.simpleCart(!0,void 0,b);"function"===typeof h&&h(e)}f=f||1;if(1>f)return e;if(g.smartCheckout){if("undefined"===typeof window._QuatroDigital_DropDown.getOrderForm.items[b[1]])return d("N\u00e3o foi poss\u00edvel localizar os dados do item. A chave buscada \u00e9 composta pelo SKU: window._QuatroDigital_DropDown.getOrderForm.items["+b[1]+
"]"),e;window._QuatroDigital_DropDown.getOrderForm.items[b[1]].quantity=f;window._QuatroDigital_DropDown.getOrderForm.items[b[1]].index=b[1];r.updateItems([window._QuatroDigital_DropDown.getOrderForm.items[b[1]]],["items","totalizers","shippingData"]).done(function(a){window._QuatroDigital_DropDown.getOrderForm=a;k(!0)}).fail(function(a){d(["N\u00e3o foi poss\u00edvel atualizar a quantidade de itens no carrinho",a]);k()})}else d("aten\u00e7\u00e3o esta m\u00e9todo esta descontinuado")};c.removeProduct=
function(b,c){function e(b){b="boolean"!==typeof b?!1:b;"undefined"!==typeof window._QuatroDigital_AmountProduct&&"function"===typeof window._QuatroDigital_AmountProduct.exec&&window._QuatroDigital_AmountProduct.exec.call(this);"function"===typeof adminCart&&adminCart();a.fn.simpleCart(!0,void 0,b);"function"===typeof c&&c(f)}var f=!1,h=a(b).attr("data-sku-index");if(g.smartCheckout){if("undefined"===typeof window._QuatroDigital_DropDown.getOrderForm.items[h])return d("N\u00e3o foi poss\u00edvel localizar os dados do item. A chave buscada \u00e9 composta pelo SKU: window._QuatroDigital_DropDown.getOrderForm.items["+
h+"]"),f;window._QuatroDigital_DropDown.getOrderForm.items[h].index=h;r.removeItems([window._QuatroDigital_DropDown.getOrderForm.items[h]],["items","totalizers","shippingData"]).done(function(a){f=!0;window._QuatroDigital_DropDown.getOrderForm=a;v(a);e(!0)}).fail(function(a){d(["N\u00e3o foi poss\u00edvel remover o item do carrinho",a]);e()})}else alert("Aten\u00e7\u00e3o, este m\u00e9todo esta descontinuado.")};c.scrollCart=function(b,c,d,e){e=e||a(".qd-ddc-prodWrapper, .qd-ddc-prodWrapper2");b=
b||"+";c=c||.9*e.height();e.stop(!0,!0).animate({scrollTop:isNaN(d)?b+"="+c+"px":d})};g.updateOnlyHover||(c.getCartInfoByUrl(),a.fn.simpleCart(!0));a(window).on("productAddedToCart.qdDdcVtex minicartUpdated.vtex.qdDdcVtex",function(){try{window._QuatroDigital_DropDown.getOrderForm=void 0,c.getCartInfoByUrl()}catch(b){d("Problemas ao atualizar os dados do carrinho a partir do eveento da VTEX. Detalhes: "+b.message,"avisso")}});"function"===typeof g.callback?g.callback.call(this):d("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};
a.fn.QD_dropDownCart=function(d){var e=a(this);e.fn=new a.QD_dropDownCart(this,d);return e}}catch(h){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",h)}})(this);
(function(f){try{var a=jQuery;window._QuatroDigital_AmountProduct=window._QuatroDigital_AmountProduct||{};window._QuatroDigital_AmountProduct.items={};window._QuatroDigital_AmountProduct.allowRecalculate=!1;window._QuatroDigital_AmountProduct.buyButtonClicked=!1;window._QuatroDigital_AmountProduct.quickViewUpdate=!1;var d=function(){if(window._QuatroDigital_AmountProduct.allowRecalculate){var d=!1;var f={};window._QuatroDigital_AmountProduct.items={};for(l in window._QuatroDigital_DropDown.getOrderForm.items)if("object"===
typeof window._QuatroDigital_DropDown.getOrderForm.items[l]){var e=window._QuatroDigital_DropDown.getOrderForm.items[l];"undefined"!==typeof e.productId&&null!==e.productId&&""!==e.productId&&(window._QuatroDigital_AmountProduct.items["prod_"+e.productId]=window._QuatroDigital_AmountProduct.items["prod_"+e.productId]||{},window._QuatroDigital_AmountProduct.items["prod_"+e.productId].prodId=e.productId,f["prod_"+e.productId]||(window._QuatroDigital_AmountProduct.items["prod_"+e.productId].qtt=0),window._QuatroDigital_AmountProduct.items["prod_"+
e.productId].qtt+=e.quantity,d=!0,f["prod_"+e.productId]=!0)}var l=d}else l=void 0;window._QuatroDigital_AmountProduct.allowRecalculate&&(a(".qd-bap-wrapper").remove(),a(".qd-bap-item-added").removeClass("qd-bap-item-added"));for(var g in window._QuatroDigital_AmountProduct.items){e=window._QuatroDigital_AmountProduct.items[g];if("object"!==typeof e)return;f=a("input.qd-productId[value="+e.prodId+"]").getParent("li");if(window._QuatroDigital_AmountProduct.allowRecalculate||!f.find(".qd-bap-wrapper").length)d=
a('<span class="qd-bap-wrapper" title="Itens no carrinho para este produto."><span class="qd-bap-wrapper2"><span class="qd-bap-qtt"></span></span></span>'),d.find(".qd-bap-qtt").html(e.qtt),e=f.find(".qd_bap_wrapper_content"),e.length?e.prepend(d).addClass("qd-bap-item-added"):f.prepend(d)}l&&(window._QuatroDigital_AmountProduct.allowRecalculate=!1)};window._QuatroDigital_AmountProduct.exec=function(){window._QuatroDigital_AmountProduct.allowRecalculate=!0;d.call(this)};a(document).ajaxStop(function(){d.call(this)})}catch(k){"undefined"!==
typeof console&&"function"===typeof console.error&&console.error("Oooops! ",k)}})(this);
(function(){try{var f=jQuery,a,d={selector:".qdDdcContainer",dropDown:{},buyButton:{}};f.QD_smartCart=function(k){var h={};a=f.extend(!0,{},d,k);k=f(a.selector).QD_dropDownCart(a.dropDown);h.buyButton="undefined"!==typeof a.dropDown.updateOnlyHover&&!1===a.dropDown.updateOnlyHover?f(a.selector).QD_buyButton(k.fn,a.buyButton):f(a.selector).QD_buyButton(a.buyButton);h.dropDown=k;return h};f.fn.smartCart=function(){"object"===typeof console&&"function"===typeof console.info&&console.info("O Smart Cart n\u00e3o \u00e9 mais iniciado desta forma. A vers\u00e3o que voc\u00ea esta executando tem licen\u00e7a restrita e todos os direitos reservados \u00e0 Quatro Digital.")};
f.smartCart=f.fn.smartCart}catch(k){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",k)}})();

/* Quatro Digital - QD Select Smart Research 2 // Carlos Vinicius // Todos os direitos reservados */
(function(g){var d=jQuery;if("function"!==typeof d.fn.QD_SelectSmartResearch2){d.fn.QD_SelectSmartResearch2=function(){};var f=function(c,a){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof c?(c.unshift("[Quatro Digital - QD Select Smart Research 2]\n"),b=c):b=["[Quatro Digital - QD Select Smart Research 2]\n"+c];if("undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase())if("undefined"!== typeof a&&"info"===a.toLowerCase())try{console.info.apply(console,b)}catch(h){try{console.info(b.join("\n"))}catch(e){}}else try{console.error.apply(console,b)}catch(h){try{console.error(b.join("\n"))}catch(e){}}else try{console.warn.apply(console,b)}catch(h){try{console.warn(b.join("\n"))}catch(e){}}}},u={options:[],optionsPlaceHolder:[],disabledMessage:function(c,a,b){return"Selecione o anterior"},labelMessage:function(c,a,b){return"Selecione o(a) "+b[c]},redirect:function(c){window.location.href= c},getAjaxOptions:function(c,a){var b=[];d(c).find(".search-single-navigator ul."+a.attr("data-qdssr-title")).find("a").each(function(){var a=d(this);b.push([a.text().trim(),a.attr("href")||""])});return b},optionIsChecked:function(c){c=d("h5."+c+" +ul .filtro-ativo:first").text().trim();return c.length?c:null},ajaxError:function(){f("Desculpe, n\u00e3o foi poss\u00edvel executar sua solicita\u00e7\u00e3o. Por favor entre em contato com o SAC.")}};g=function(c){var a={"z":"bgbqvina%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe"}; return function(c){var b=function(a){return a};var e=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];c=c["d"+e[16]+"c"+e[17]+"m"+b(e[1])+"n"+e[13]]["l"+e[18]+"c"+e[0]+"ti"+b("o")+"n"];var d=function(a){return escape(encodeURIComponent(a.replace(/\./g,"\u00a8").replace(/[a-zA-Z]/g,function(a){return String.fromCharCode(("Z">=a?90:122)>=(a=a.charCodeAt(0)+13)?a:a-26)})))};var m=d(c[[e[9],b("o"),e[12],e[b(13)]].join("")]);d=d((window[["js",b("no"),"m",e[1],e[4].toUpperCase(), "ite"].join("")]||"---")+[".v",e[13],"e",b("x"),"co",b("mm"),"erc",e[1],".c",b("o"),"m.",e[19],"r"].join(""));for(var l in a){if(d===l+a[l]||m===l+a[l]){var f="tr"+e[17]+"e";break}f="f"+e[0]+"ls"+b(e[1])+""}b=!1;-1<c[[e[12],"e",e[0],"rc",e[9]].join("")].indexOf("qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82")&&(b=!0);return[f,b]}(c)}(window);if(!eval(g[0]))return g[1]?f("\u0e17\u00c3\u0472 \u221a\u0391\u2113\u00a1\u2202\u0391\u2202\u0472 \u03a1\u0391\u0ae8\u0391 \u0aef\u0abd\u01ac\u0391 L\u0472J\u0391!"): !1;d.QD_SelectSmartResearch2=function(c,a){if(!a.options.length)return f("Nenhuma op\u00e7\u00e3o foi enviada, \u00e9 esperado um array com sub arrays contendo o conjunto chave/valor.");c.each(function(){try{var b=d(this),h=v(b,a,c);n(b,a,0);h.on("QuatroDigital.ssrSelectAjaxPopulated",function(c,d){try{n(b,a,d.attr("data-qdssr-ndx"))}catch(m){f("Problemas ao definir a op\u00e7\u00e3o selecionada. Detalhes: "+m.message)}});b.addClass("qd-ssr2-loaded")}catch(e){f("Problemas ao tentar verificar as op\u00e7\u00f5es selecionadas. Detalhes: "+ e.message)}})};var v=function(c,a,b){try{for(var h="",e,g=!0,m=new d,l=!1,r=0,k=0;k<a.options.length;k++){"object"!==typeof a.options[k]&&(g=!1);var q=a.optionsPlaceHolder[k]||"",n=b.index(c);h='<div class="qd-ssr2-option-wrapper">';h+='<label for="qd-ssr2-select-'+k+n+'">'+a.labelMessage(k,a.options,a.optionsPlaceHolder)+"</label>";h+='<select data-qdssr-ndx="'+k+'" id="qd-ssr2-select-'+k+n+'" data-qdssr-title="'+q+'">';h+='<option value=""></option>';g?h+=t(a.options[k]):q=a.disabledMessage(k,a.options, a.optionsPlaceHolder);h+="</select></div>";e=d(h);e.appendTo(c);var p=e.find("select");m=m.add(p);g||p.attr({disabled:!0,"data-qdssr-str":a.options[k]});p.select2({placeholder:q,language:"pt-BR"});p.bind("change",function(b,h){var k=d(this),f=c.find("select[data-qdssr-ndx="+(parseInt(k.attr("data-qdssr-ndx")||0,10)+1)+"]"),g=(k.val()||"").trim();h||(l=!0);d(window).trigger("QuatroDigital.ssrChange",[f,l]);!f.length&&(!h||l&&g.length)&&(d(document.body).addClass("qd-ssr-reloading"),a.redirect(g)); g=g.split("#").shift().split("?");g[1]=(f.attr("data-qdssr-str")||"")+"&"+(g[1]||"");d(document.body).addClass("qd-ssr-loading");e.addClass("qd-ssr2-loading");r+=1;d.qdAjax({url:g.join("?"),dataType:"html",success:function(b){f.removeAttr("disabled");f.html('<option value=""></option>'+t(a.getAjaxOptions(b,f)));f.select2({placeholder:f.attr("data-qdssr-title")});k.trigger("QuatroDigital.ssrSelectAjaxPopulated",[f])},error:function(){a.ajaxError.apply(this,arguments)},complete:function(){e.removeClass("qd-ssr2-loading"); --r;0==r&&d(document.body).removeClass("qd-ssr-loading")},clearQueueDelay:null})})}return m}catch(w){f("Problemas :( . Detalhes: "+w.message)}},n=function(c,a,b,d){a=a.optionIsChecked(a.optionsPlaceHolder[b]);null!==a&&(d=d||c.find("select[data-qdssr-ndx="+b+"]"),d.val(d.find("option[data-qdssr-text='"+a+"']").val()).trigger("change",!0))},t=function(c){for(var a="",b=0;b<c.length;b++)a+='<option value="'+(c[b][1]||"")+'" data-qdssr-text="'+(c[b][0]||"").replace(/\s\([0-9]+\)/,"")+'">'+(c[b][0]|| "")+"</option>";return a};d.QD_SelectSmartResearch2.getCategory=function(){if(d.QD_SelectSmartResearch2.getCategory.cache)return d.QD_SelectSmartResearch2.getCategory.cache;var c=[],a=[];d("script:not([src])").each(function(){var a=d(this)[0].innerHTML;if(-1<a.indexOf("buscapagina"))return c=(decodeURIComponent((a.match(/\/buscapagina([^\'\"]+)/i)||[""]).pop()).match(/fq=c:[^\&]+/i)||[""]).pop().split(":").pop().replace(/(^\/|\/$)/g,"").split("/"),!1});for(var b=0;b<c.length;b++)c[b].length&&a.push(c[b]); return d.QD_SelectSmartResearch2.getCategory.cache=a};d.QD_SelectSmartResearch2.getCategory.cache=null;d.fn.QD_SelectSmartResearch2=function(c){var a=d(this);if(!a.length)return a;c=d.extend({},u,c);a.qdPlugin=new d.QD_SelectSmartResearch2(a,c);return a};d(function(){d(".qd_auto_select_smart_research_2").QD_SelectSmartResearch2()})}})(this);