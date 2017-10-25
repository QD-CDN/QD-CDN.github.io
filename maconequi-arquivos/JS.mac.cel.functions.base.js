/**
 * Funções base
 */
"function" !== typeof String.prototype.trim && (String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, "") });
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function() { var b = { "\u00e7": "c", "\u00e6": "ae", "\u0153": "oe", "\u00e1": "a", "\u00e9": "e", "\u00ed": "i", "\u00f3": "o", "\u00fa": "u", "\u00e0": "a", "\u00e8": "e", "\u00ec": "i", "\u00f2": "o", "\u00f9": "u", "\u00e4": "a", "\u00eb": "e", "\u00ef": "i", "\u00f6": "o", "\u00fc": "u", "\u00ff": "y", "\u00e2": "a", "\u00ea": "e", "\u00ee": "i", "\u00f4": "o", "\u00fb": "u", "\u00e5": "a", "\u00e3": "a", "\u00f8": "o", "\u00f5": "o", u: "u", "\u00c1": "A", "\u00c9": "E", "\u00cd": "I", "\u00d3": "O", "\u00da": "U", "\u00ca": "E", "\u00d4": "O", "\u00dc": "U", "\u00c3": "A", "\u00d5": "O", "\u00c0": "A", "\u00c7": "C" }; return this.replace(/[\u00e0-\u00fa]/ig, function(a) { return "undefined" != typeof b[a] ? b[a] : a }) });
Array.prototype.indexOf || (Array.prototype.indexOf = function(d, e) { var a; if (null == this) throw new TypeError('"this" is null or not defined'); var c = Object(this), b = c.length >>> 0; if (0 === b) return -1; a = +e || 0; Infinity === Math.abs(a) && (a = 0); if (a >= b) return -1; for (a = Math.max(0 <= a ? a : b - Math.abs(a), 0); a < b;) { if (a in c && c[a] === d) return a; a++ } return -1 });

try {
    var Common = {
        run: function() {},
        init: function() {
            Common.salesChannelBodyClass();
            Common.amazingMenu();
            Common.applyAmazingMenuMobile();
            Common.bannerResponsive();
            Common.callCartLinkShow();
            // Common.shelfColors();
            // Common.shelfColorsCallback();
            Common.smartyQuantity();
            Common.smartyBuyButton();
            Common.buyInShelf();
            // Common.floatBarMiniCart();
            Common.vtexBindQuickViewDestroy();
            Common.applySmartCart();
            Common.qdOverlay();
            // Common.resellerTopBar();
        },
        ajaxStop: function() {
            Common.smartyQuantity();
            // Common.shelfColors();
        },
        windowOnload: function() {
            Common.facebookLikebox();
        },
        vtexBindQuickViewDestroy: function() {
            window.bindQuickView = function() {};
        },
        resellerTopBar: function() {
            if ($(document.body).is('.qd-sc-4') || $(document.body).is('.home-atacado'))
                return

            var wrapper = $('.reseller-info-topbar-qd-v1');

            $('.reseller-info-topbar-qd-v1-close i').click(function() {
                wrapper.slideUp().trigger("QuatroDigital.cf_close");
            });

            wrapper.QD_cookieFn({
                cookieName: "reseller-topbar",
                close: "",
                expireDays: 2,
                show: function() {
                    $('.reseller-info-topbar-qd-v1').removeClass('hide');
                }
            });
        },
        salesChannelBodyClass: function() {
            $(document.body).addClass('qd-sc-' + jssalesChannel);
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
        floatBarMiniCart: function() {
            var miniCart = $(".show-minicart-on-hover");
            $(".floating-qd-v1-content .header-qd-v1-cart-link").mouseenter(function() {
                miniCart.not(this).mouseover();
            });
        },
        qdOverlayClass: 'qd-am-on qd-cart-show qd-sn-on',
        qdOverlay: function () {
            $('.components-qd-v1-overlay').click(function () {
                $(document.body).removeClass(Common.qdOverlayClass);
            });
        },
        applySmartCart: function () {
            $('.header-qd-v1-cart-link').append('<div class="smart-cart-qd-v1-wrapper"><div class="qd-sc-wrapper"></div></div>');

            $(document.body).append('<div class="smart-cart-qd-v2-wrapper"><div class="qd-sc-wrapper"></div></div>');

            var wrapper = $(".qd-sc-wrapper");

            $.QD_smartCart({
                selector: wrapper,
                dropDown: {
                    texts: {
                        linkCart: "Finalizar Compra",
                        cartTotal: '<span class="qd-infoTotalItems">Itens: #items</span><span class="qd-infoTotalValue">Total: #value</span>'
                    },
                    updateOnlyHover: false,
                    smartCheckout: true,
                    callback: function () {
                        $(".qd-ddc-wrapper3").prepend('<div class="qd-cartTitle"><h3>Meu carrinho</h3></div>');
                        wrapper.find('.qd_ddc_continueShopping').after(wrapper.find('.qd-ddc-viewCart'));
                    },
                    skuName: function (data) {
                        return data.name + ' - ' + data.skuName.replace(data.name, '');
                    },
                    callbackProductsList: function () {
                        wrapper.find(".qd-ddc-prodQtt").each(function () {
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
            window._QuatroDigital_prodBuyCallback = function (jqXHR, textStatus, prodLink, skus) {
                $.fn.simpleCart(true);
                $(".shelf-qd-v1-buy-button-modal").modal("hide");
                $(window).trigger("QuatroDigital.qd_bb_prod_add", [new $, skus[0] || 0]);
            };

            $('.header-qd-v1-cart-link').click(function (evt) {
                evt.preventDefault();
                $(document.body).toggleClass('qd-cart-show');

                wrapper.height($(window).height());
                wrapper.find(".qd-ddc-prodWrapper").css('max-height', $(window).height() - 193);
            });

            $('.qd_ddc_lightBoxClose').click(function (evt) {
                $(document.body).removeClass(Common.qdOverlayClass);
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

            var iframe = $('<iframe src="/modal-cores?idproduto=' + productId + '&qty=' + qty + '" frameborder="0"></iframe>');
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
        },
        amazingMenu: function() {
            if (jssalesChannel == "1" && $(document.body).is('.qd-sc-1')) {
                $('.header-qd-v1-amazing-reseller').hide();
                $('.header-qd-v1-amazing-default').show().QD_amazingMenu();
                $('.header-qd-v1-amazing-default-mobile').attr('style', '').QD_amazingMenu().addClass('active');
                $('.header-qd-v1-amazing-reseller-mobile').attr('style', 'display: none !important;');
            } 
            else if (jssalesChannel == "4" && $(document.body).is('.qd-sc-4')) {
                $('.header-qd-v1-amazing-default').hide();
                $('.header-qd-v1-amazing-reseller').show().QD_amazingMenu();
                $('.header-qd-v1-amazing-reseller-mobile').attr('style', '').QD_amazingMenu().addClass('active');
                $('.header-qd-v1-amazing-default-mobile').attr('style', 'display: none !important;');
            }
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

			$('.header-qd-v1-amazing-menu-toggle').click(function(evt) {
				evt.preventDefault();
				$(document.body).toggleClass('qd-am-on');
			});

			$('.header-qd-v1-amazing-menu-mobile-wrapper .header-qd-v1-user-message').on('click', 'a#login', function() {
				$(document.body).removeClass('qd-am-on');
			});
		},
        facebookLikebox: function() {
            $(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/maconequi" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/maconequi" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/maconequi">Maconequi</a></blockquote></div>');
        },
        bannerResponsive: function() {
            $(".banner-qd-v1-responsive .box-banner a, .qd-placeholder .box-banner a").each(function() {
                var $t = $(this);
                var cols = [];

                var href = $t.attr("href") || "";
                if (!href.length)
                    return;

                $t.attr("href", href.replace(/(col-)?(xs|sm|md|lg|hidden-xs|hidden-sm|hidden-md|hidden-lg)(-([0-9]{1,2}))?,?/ig, function(match) {
                    var str = match.replace(",", "").toLowerCase();
                    cols.push(str.substr(0, 4) === "col-" ? str : str);
                    return "";
                }));

                $t.parent().addClass(cols.length ? cols.join(" ") : "col-xs-12 col-sm-12");
            });
        },
        callCartLinkShow: function() {
            if ($(window).width() < 750) {
                $(".header-qd-v1-cart-link").click(function(evt) {
                    evt.preventDefault();

                    $(".v2-vtexsc-cart").toggleClass('cart-show');
                });
            }
        },
        smartyQuantity: function() {
            $(".shelf-qd-v1-buy-button:not(.qd-on)").addClass('qd-on').QD_smartQuantity({
                buyButton: ".btn-add-buy-button-asynchronous"
            });
            // $(".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous").QD_smartQuantity();
        },
        shelfColors: function() {
            $('.prateleira:not([id*="ResultItems"])').QD_coresPrateleira({
                checkDuplicateUri: false,
                replaceProductName: true,
                groupSkuByDimension: false,
                groupSkuByDimension2: true,
                restoreOriginalDetails: true,
                dimensions: ["Cor"],
                productName: function(obj, li) {
                    return li.find('.shelf-qd-v1-product-name a').attr('title') + ' - ' + obj.skuname;
                }
            });
        },
        shelfColorsCallback: function() {
            $(window).on("QuatroDigital.cp_thumbMouseleave", function(e, obj) {
                obj.li.find(".shelf-qd-v1-buy-button").removeClass('qd-on');
                obj.li.find(".qd-sq-on").removeClass('qd-sq-on');
                Common.smartyQuantity();
            });
        },
        smartyBuyButton: function() {
            $(".header-qd-v1-cart-link").QD_buyButton({
                buyButton: ".shelf-qd-v1-buy-button .btn-add-buy-button-asynchronous"
            });
        },
    };

    var Home = {
        init: function() {
            $(".qd-shelf-xs-12").addClass('qd-shelf-xs-6').removeClass('qd-shelf-xs-12');
            Home.cycle2();
            Home.bannerCarouselHome();
            Home.bannerCarouselHomeV2();
            Home.organizeSideMenuCollection();
            Home.shelfCarouselHome();
            Home.sliderFullMobile();
        },
        ajaxStop: function() {},
        windowOnload: function() {},
        cycle2: function () {
            var elem = $(".slider-qd-v1-full");

            if (elem.find('.box-banner').length <= 1)
                elem.addClass("qd-1");

            if (typeof $.fn.cycle !== "function")
                return;

            elem.find(".box-banner").each(function () {
                var $t = $(this);
                $t.attr("data-cycle-pager-template", "<div class='cycle-pager-item'><span class='slider-pager-content'>" + $t.find("img").attr("alt") + "</span></div>");
            });

            elem.cycle({
                slides: ">.box-banner",
                swipe: "true",
                pager: ".slider-qd-v1-responsive-pager",
                prev: ".slider-qd-v1-cycle-prev",
                next: ".slider-qd-v1-cycle-next"
            });
        },
        sliderFullMobile: function() {
            $('.slider-qd-v1-full-mobile').slick({
                dots: false,
                fade: false,
                infinite: true,
                speed: 500,
                draggable: false
            });
        },
        bannerCarouselHome: function() {
            var wrapper = $('.carousel-qd-v1-banner');

            // Titulo
            wrapper.each(function() {
                var wrap = $(this);
                wrap.find("h2").addClass('heading-1').insertBefore(wrap);
            });

            wrapper.owlCarousel({
                items: 7,
                navigation: true,
                pagination: false
            });
        },
        bannerCarouselHomeV2: function() {
            var wrapper = $('.carousel-qd-v2-banner');
            
            // Titulo
            wrapper.each(function() {
                var wrap = $(this);
                wrap.find("h2").addClass('heading-1').insertBefore(wrap);
            });

            wrapper.owlCarousel({
                items: 2,
                itemsMobile: [798, 2],
                navigation: true,
                pagination: false
            });
        },
        shelfCarouselHome: function() {
            var wrapper = $('.shelf-qd-v1-carousel');
            var wrapperCatCollection = $('.qd-category-collections');

            // Titulo
            $.merge($.merge($(), wrapper), wrapperCatCollection).find('.prateleira').each(function() {
                var wrap = $(this);

                wrap.find("h2").addClass('heading-1').insertBefore(wrap);
            });

            var options = {
                items: 4,
                navigation: true,
                pagination: false,
                itemsMobile: [767,2]
            };

            wrapper.find('.prateleira').owlCarousel(options);
            wrapperCatCollection.find('.prateleira').owlCarousel($.extend(true, {}, options, { items: 3 }));
        },
        organizeSideMenuCollection: function() {
            var wrapper = $(".qd-category-collections");
            var htmlItem = '<div class="col-xs-12 item"><div class="row"></div></div>';
            var htmlSideMenuWrapper = '<div class="col-xs-12 col-sm-5 col-md-3 htmlSideMenuWrapper"></div>';
            var htmlCollectionWrapper = '<div class="col-xs-12 col-sm-7 col-md-9 htmlCollectionWrapper"></div>';
            var itemSideMenuCollection = '<div class="row itemSideMenuCollection"><div></div></div>';

            wrapper.find('.box-banner:not(".qd-on"), ul[itemscope]:not(".qd-on")').addClass("qd-on").each(function() {
                $t = $(this);

                $t.after(htmlSideMenuWrapper);

                if ($t.is('ul[itemscope]'))
                    $t.parent().QD_amazingMenu();

                $('.htmlSideMenuWrapper:not(".qd-on")').addClass("qd-on").append(wrapper.find($t));

                var collectionTitle = ($t.getParent(".htmlSideMenuWrapper").find("+ .heading-1")) || "";

                if ($t.getParent(".htmlSideMenuWrapper").find("+ .heading-1 + .prateleira").length > 0)
                    var collection = $t.getParent(".htmlSideMenuWrapper").find("+ .heading-1 + .prateleira");
                else
                    var collection = $t.getParent(".htmlSideMenuWrapper").find("+ .prateleira");

                $t.getParent('.htmlSideMenuWrapper').after(htmlCollectionWrapper);

                $('.htmlCollectionWrapper:not(".qd-on")').addClass("qd-on").append(collectionTitle, collection);

                $t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper").after(itemSideMenuCollection);

                $('.itemSideMenuCollection:not(".qd-on")').addClass("qd-on").find("> div").append($t.getParent(".htmlSideMenuWrapper"), $t.getParent(".htmlSideMenuWrapper").find("+ .htmlCollectionWrapper"));
            });
        },
    };

    var Departament = {
        init: function() {
            Search.emptySearch();
            Departament.sidemenuToggle();
            Departament.hideExtendedMenu();
            Search.shelfLineFix();
            Search.affixSidemenu();
        },
        ajaxStop: function() {
            Search.shelfLineFix();
        },
        windowOnload: function() {},
        sidemenuToggle: function() {
            // Amazing Menu Responsivo
            $(".search-qd-v1-menu-toggle").click(function() {
                $("body").toggleClass('qd-sn-on');
            });

            $(".qd-am-overlay").click(function() {
                $("body").removeClass('qd-sn-on');
            });
        },
        hideExtendedMenu: function() {
            $(".search-qd-v1-navigator ul").each(function() {
                var t, li, qtt, moreLink, moreLi, click, liHide;

                t = $(this);
                li = t.find(">li");
                qtt = 7;

                if (li.length <= qtt) return;

                liHide = li.filter(":gt(" + (qtt - 1) + ")").stop(true, true).hide();
                moreLink = $('<a class="qd-viewMoreMenu">Mostrar mais</a>');
                t.after(moreLink);
                moreLi = $('<li class="qd-viewMoreWrapper"><a class="qd-viewMoreMenu2">Mostrar mais filtros</a></li>');
                t.append(moreLi);

                click = function() {
                    liHide.stop(true, true).slideToggle(function() {
                        if (li.filter(":visible").length > qtt) {
                            moreLink.addClass("minus").text("Mostrar menos filtros");
                            moreLi.addClass("minus").find("a").text("Mostrar menos filtros");
                        } else {
                            moreLink.removeClass("minus").text("Mostrar mais filtros");
                            moreLi.removeClass("minus").find("a").text("Mostrar mais filtros");
                        }
                    });
                };
                moreLi.bind("click.qd_viewMore", click);
                moreLink.bind("click.qd_viewMore", click);
            });
        }
    };

    var Search = {
        init: function() {
            Search.emptySearch();
            Departament.sidemenuToggle();
            Departament.hideExtendedMenu();
            Search.organizeSearchV2();
            Search.shelfLineFix();
            Search.affixSidemenu();
        },
        ajaxStop: function() {
            Search.shelfLineFix();
        },
        windowOnload: function() {},
        emptySearch: function() {
            if ($('.busca-vazio').length > 0) {
                $('.search-qd-v1-no-result').show();
            };

            if ($('body').is(".busca-vazia"))
                $('.search-qd-v1-no-result').show();
        },
        organizeSearchV2: function() {
            var searchQDResult = $(".search-qd-v2-result");
            var wrap = $(".search-qd-v2-result-wrap-content .search-qd-v2-result-wrap");

            // REMOVE ITENS DUPLICADOS
            searchQDResult.find('.resultItemsWrapper + .searchResultsTime, .resultItemsWrapper + .searchResultsTime + .sub').remove();

            // ADICIONAR E ORGANIZA OS ELEMENTOS
            wrap.prepend('<div class="search-qd-v2-result-content row"> <div class="search-qd-v2-result-item-1 col-xs-12 col-sm-3 col-md-3"></div> <div class="search-qd-v2-result-item-2 col-xs-12 col-sm-6 col-md-3"></div> <div class="search-qd-v2-result-item-3 col-xs-12 col-sm-3 col-md-6"></div> </div>');
            $(".search-qd-v2-result-content .search-qd-v2-result-item-1").append(searchQDResult.find(".search-qd-v2-navigator"));
            $(".search-qd-v2-result-content .search-qd-v2-result-item-2").append(searchQDResult.find(".searchResultsTime"));
            $(".search-qd-v2-result-content .search-qd-v2-result-item-3").append(searchQDResult.find(".sub"));

            wrap.find('.search-qd-v2-navigator').prepend('<div class="search-qd-v2-navigator-btn-toggle"></div>');

            // CLICK PARA EXIBIR O MENU
            wrap.find(".search-qd-v2-navigator-btn-toggle").click(function() {
                wrap.find('.search-qd-v2-navigator .navigation').toggle();
            });

            $("body").attr("data-qd-scroll-limit", "200,370");
        },
        shelfLineFix: function() {
            var curTop;
            var wrapper = $("div[id*='ResultItems_'] >.prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

            var shelf = wrapper.children("ul").removeClass('qd-first-line');
            shelf.first().addClass("qd-first-line");

            var setFirst = function() {
                shelf.each(function() {
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
        }, 
        affixSidemenu: function() {
            var box = $('.search-qd-v1-navigator');

            box.QD_affix({
                topSpacing: box.offset().top - 250,
                bottomSpacing: 50,
                bottomLimitSeletor: $('.footer-qd-v1-store-footer'),
                css: {
                    position: 'relative', 
                    transition: 'all .2s ease-out'
                }
            });
		}
    };

    var Product = {
        run: function() {},
        init: function() {
            Product.accessoriesFix();
            Product.setAvailableBodyClass();
            Product.zoomFix();
            Product.qdCheckDescription();
            Product.shelfCarouselProduct();
            Product.openShipping();
            Product.seeDescription();
            Product.selectSku();
            Product.skuListSelection();
            Product.imageSize();
            Product.shippingTableFormat();
            Product.smartQuantity(); // executar após o "skuListSelection"
            Product.smartyBuyButton(); // executar após o "skuListSelection"
            Product.showFloatingBuyBar();            
        },
        ajaxStop: function() {
            Product.addCloseBtnFreightTable();
        },
        windowOnload: function() {},
        imageSize: function() {
            if (!$('.product-qd-v2-image-wrapper').length)
                return;

            var wrapper = $('.product-qd-v2-image-wrapper');
            var imageHeight = $('#image-main').height() || 'auto';

            wrapper.height(imageHeight);

            $(window).resize(function() {
                wrapper.height(imageHeight);
            });
        },
        accessoriesFix: function() {
            $("fieldset >.buy-product-checkbox").parent().each(function() {
                var $t = $(this);
                $t.add($t.prev("ul")).wrapAll('<div class="qd-accessories-wrapper"/>');

                $('.qd-accessories-wrapper').getParent('.prateleira').addClass('qd-accessories-wrapper-content');
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
        qdCheckDescription: function() {
            if ($(".product-qd-v1-description .productDescription").text().length <= 0 && $(".product-qd-v1-description .productDescription > *").length <= 0)
                $(".product-qd-v1-description").hide();
        },
        zoomFix: function() {
            var overlay = $("<div class='qdZoomInvisibleOverlay' />");
            $("#image").prepend(overlay).on("mouseout", ".zoomPad", function() { overlay.hide(); }).on("mouseover", ".zoomPad", function() { overlay.show(); });
        },
        shippingTableFormat: function() {
            window.ajaxShippin = function(method, url, postData, target, callback) {
                $.ajax({
                    type: method,
                    url: url,
                    data: postData,
                    success: function(dataResult) {
                        var data = $(dataResult);
                        data.find('td').text(function(i, content) {
                            return content.replace(/ para o cep \d+\-\d+/gi, '');
                        }).filter(':contains(Frete Retirada)').text(function(index, content) {
                            return content.replace('Frete Retirada', 'Retirada').replace('entrega', 'disponível');
                        });
                        $(target).html(data).show();
                    },
                    error: function(xhr, status, error) {
                        $(target).html(status).show();
                    }
                });
            };
        },
        shelfCarouselProduct: function() {
            var wrapper = $('.qd-collections-wrap');

            // Titulo
            wrapper.find('.prateleira').each(function() {
                var wrap = $(this);

                wrap.find("h2").addClass('heading-2').insertBefore(wrap);

                wrap.find(".box-preco-atualizado").insertAfter(wrap);
            });

            wrapper.find('.prateleira').owlCarousel({
                items: 4,
                navigation: true,
                pagination: false
            });
        },
        openShipping: function() {
            if (typeof ShippingValue === "function")
                ShippingValue();
        },
        hideUniqueSkuOption: function() {
            $(".sku-selector-container [class*='group_']").each(function() {
                var $t = $(this);
                var input = $t.find("input");

                if (input.length !== 1)
                    return;

                input.attr("checked", true).change();
                $t.getParent("ul").hide();
            });
        },
        addCloseBtnFreightTable: function() {
            var elem = $(".freight-values");

            if (!$("#calculoFrete").length) $(".product-shipping").hide();
            else $(".product-shipping").show();

            if (elem.length > 0 && elem.is(":visible"))
                $("<span class='close'/>").bind("click", function() {
                    elem.fadeToggle("fast", "linear");
                }).appendTo(elem);
        },
        seeDescription: function() {
            $(".product-qd-v1-link-description").click(function(e) {
                e.preventDefault();

                $('html, body').stop().animate({
                    'scrollTop': $(".product-qd-v1-description").offset().top - 100
                }, 900, 'swing');
            });
        },
        selectSku: function() {
            var wrapper = $(".skuList");

            wrapper.on("selectSku.qd_click", function() {
                try {
                    var $t = $(this);

                    var buyButton = $t.find(".buy-button");
                    if (buyButton.length)
                        var skuId = buyButton.attr("href").match(/sku\=([0-9]+)/i)[1];
                    else
                        var skuId = $t.find(".sku-notifyme-skuid").val();

                    var selectedSku;
                    for (var i = 0; i < skuJson.skus.length; i++) {
                        if (skuJson.skus[i].sku == skuId) {
                            selectedSku = skuJson.skus[i];
                            break;
                        }
                    }

                    if (selectedSku)
                        $(document).trigger("skuSelected.vtex", [skuId, selectedSku]);

                    wrapper.removeClass("qd-sku-list-selected qd-sku-list-selected-by-click");
                    $t.addClass("qd-sku-list-selected");
                } catch (e) { if (typeof console !== "undefined" && typeof console.info === "function") console.info("Problemas ao selecionar o SKU", e.message); };
            });

            wrapper.click(function() {
                var $t = $(this);

                $t.trigger("selectSku.qd_click");
                $t.addClass("qd-sku-list-selected-by-click");
            });
        },
        skuListSelection: function() {
            if (!$(".product-qd-v1-sku-selection .imageSku, .product-qd-v2-sku-selection .imageSku").length > 0)
                return;

            $(document.body).addClass('sku-in-list');

            var wrapper = $(".product-qd-v1-sku-selection, .product-qd-v2-sku-selection");

            wrapper.find(".skuList").each(function() {
                $(this).addClass("product-qd-v1-sku-in-list");

                if ($(window).width() >= 500) {
                    $(this).addClass('no-xs');
                }
            });

            wrapper.find(".buy-button").each(function() {
                $(this).wrap('<div class="qd-v1-buy-button-content"></div>');
            });

            wrapper.find(".portal-notify-me-ref").each(function() {
                var $t = $(this);

                $t.find(".notifyme").addClass("qd-notifyme-hide");
                $t.getParent(".skuList").addClass("qd-sku-unavaliable");

                var btn = $('<div class="notifyme-btn-wrap"><button class="btn btn-xs notifyme-btn">Avise-me</button></div>');
                btn.find("button").click(function() {
                    btn.siblings(".notifyme").removeClass("qd-notifyme-hide");
                    btn.addClass("qd-notifyme-hide");
                });
                $t.prepend(btn);
            });

            wrapper.find(".qd-v1-buy-button-content").prepend('<div class="qd-v1-smart-qtt"> <input type="tel" class="qd-sq-quantity" /> <div class="btns-wrapper"> <span class="qd-sq-more"></span> <span class="qd-sq-minus"></span> </div> </div>');
        },
        smartQuantity: function() {
            $(".product-qd-v1-sku-selection-box, .product-qd-v2-sku-selection-box").find(".qd-v1-buy-button-content, .product-qd-v1-buy-button").QD_smartQuantity();
        },
        smartyBuyButton: function() {
            $(".header-qd-v1-cart-link").QD_buyButton({
                buyButton: ".product-qd-v1-sku-selection-box .buy-button, .product-qd-v2-sku-selection-box .buy-button"
            });

            $(window).on("QuatroDigital.qd_sc_prodAdd", function(e, buyButton) {
                if (!buyButton.is('.product-qd-v2-sku-selection-box .buy-button'))
                    return;
                buyButton.after(buyButton.find('.qd-bb-productAdded'));
                buyButton.addClass('hide');
                buyButton.prev().addClass('hide');
            });
        },
        showFloatingBuyBar: function () {
			var targetOffset = $(".product-qd-v1-buy-button").offset().top-30;
			var elem = $(".product-qd-v1-floating-info-price");

			var $w = $(window).scroll(function(){

				if (!elem.is('.active-btn')) {
					if ( $w.scrollTop() > targetOffset ) {
						elem.addClass("active");
					}
					else {
						elem.removeClass("active");
					}
				}

			});

			$(".product-qd-v1-floating-info-close").click(function(evt){
				elem.toggleClass("active");
				elem.addClass('active-btn');
			});

			$(".product-qd-v1-floating-price-button, .product-qd-v1-floating-info-price .btn-size-installments").click(function() {
				$('html, body').stop().animate({
					'scrollTop': 500
				}, 900, 'swing');

				elem.removeClass("active");
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
            Institutional.sidemenuToggle();
            // Institutional.sendAccessFormv2();
            Institutional.sendAccessForm();
        },
        ajaxStop: function() {},
        windowOnload: function() {},
        sidemenuToggle: function() {
            // Amazing Menu Responsivo
            $(".institucional-qd-v1-menu-toggle").click(function() {
                $("body").toggleClass('qd-sn-on');
            });

            $(".qd-am-overlay").click(function() {
                $("body").removeClass('qd-sn-on');
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
        checkCnpjExist: function(cnpj) {
            window.QD_checkCnpjExist_request = window.QD_checkCnpjExist_request || $.ajax({
                url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search",
                data: { "_fields": "id", "corporateDocument": cnpj.replace(/[^0-9]/ig, "") },
                type: "GET",
                dataType: "json",
                headers: { Accept: "application/vnd.vtex.ds.v10+json" },
                success: function(data) {
                    if (data.length)
                        alert("Este CNPJ já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
                },
                complete: function() {
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
                if ((cnpj.val() || "").length > 17)
                    Institutional.checkCnpjExist(cnpj.val() || "");
            });

            // Preenchendo o endereço a partir do CEP
            var cepInputs = $form.find("input[name=qd_form_street], input[name=qd_form_complement], input[name=qd_form_neighboor], input[name=qd_form_city], input[name=qd_form_state]").attr("disabled", "disabled");
            var cep = $form.find("input[name=qd_form_zipcode]");
            cep.keyup(function(e) {
                if ((cep.val() || "").length < 9)
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
                rules: { email: { email: true } },
                submitHandler: function(form) {
                    var $form = $(form);

                    if (!$form.valid())
                        return;

                    // $form.find(".form-qd-v1-submit").slideUp();
                    loading.slideDown();
                    var inputs = $form.find("input, textarea");

                    loading.slideDown();
                    Institutional.checkCnpjExist(inputs.filter("[name='qd_form_cpnj']").val() || "").always(function() { loading.slideUp(); }).done(function(data) {
                        if (data.length)
                            return;

                        loading.slideDown();

                        var stateRegistration = (inputs.filter("[name='qd_form_ie']").val() || "Isento").trim();
                        stateRegistration = stateRegistration.length ? stateRegistration : "Isento";
                        stateRegistration = stateRegistration.replace(/i.+ento/g, "Isento");

                        var mobileNumber = (inputs.filter("[name='qd_form_celphone']").val() || "").replace(/[^0-9]/ig, "").trim();
                        mobileNumber = mobileNumber.length ? "+55" + mobileNumber : "";

                        $.ajax({
                            url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/documents",
                            type: "PATCH",
                            dataType: "json",
                            headers: { "Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
                            data: JSON.stringify({
                                firstName: inputs.filter("[name='qd_form_name']").val() || "",
                                email: inputs.filter("[name='qd_form_email']").val() || "",
                                birthDate: (inputs.filter("[name='qd_form_birthdate']").val() || "").replace(/(\d+)\/(\d+)\/(\d+)/g, "$3-$2-$1"),
                                gender: inputs.filter("[name='qd_form_sex']").val() || "",
                                documentType: "cpf",
                                "document": (inputs.filter("[name='qd_form_cpf']").val() || "").replace(/[^0-9]/ig, ""),
                                homePhone: "+55" + (inputs.filter("[name='qd_form_phone']").val() || "").replace(/[^0-9]/ig, ""),
                                phone: mobileNumber,
                                tradeName: inputs.filter("[name='qd_form_trading_name']").val() || "",
                                corporateName: inputs.filter("[name='qd_form_company_name']").val() || "",
                                corporateDocument: (inputs.filter("[name='qd_form_cpnj']").val() || "").replace(/[^0-9]/ig, ""),
                                stateRegistration: stateRegistration,
                                isCorporate: true,
                                localeDefault: "pt-BR"
                            }),
                            success: function(data) {
                                $.ajax({
                                    url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AD/documents",
                                    type: "PATCH",
                                    dataType: "json",
                                    headers: { "Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
                                    data: JSON.stringify({
                                        addressName: "Principal",
                                        userId: (data.Id || "").replace(/^[a-z]{2}\-/i, ""),
                                        street: inputs.filter("[name='qd_form_street']").val() || "",
                                        number: inputs.filter("[name='qd_form_number']").val() || "",
                                        complement: inputs.filter("[name='qd_form_complement']").val() || "",
                                        neighborhood: inputs.filter("[name='qd_form_neighboor']").val() || "",
                                        city: inputs.filter("[name='qd_form_city']").val() || "",
                                        state: inputs.filter("[name='qd_form_state']").val() || "",
                                        postalCode: inputs.filter("[name='qd_form_zipcode']").val() || "",
                                        addressType: "residential",
                                        receiverName: inputs.filter("[name='qd_form_name']").val() || "",
                                        geoCoordinate: []
                                    }),
                                    success: function() {
                                        // $form.find(".form-qd-v1-submit").addClass('hide');
                                        $('.form-qd-v1-sucess').removeClass('hide');
                                        $('.register-content-qd-v1').addClass('hide');
                                        $(document.body).scrollTop(0);
                                    },
                                    error: function(data) {
                                        alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
                                    },
                                    complete: function() {
                                        loading.slideUp(function() { $(this).remove(); });
                                    }
                                });
                            },
                            error: function() {
                                alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
                                loading.slideUp(function() { $(this).remove(); });
                            }
                        });
                    });
                },
                errorPlacement: function(error, element) {}
            });
        },
        sendAccessFormv2: function() {
            Institutional.formCadastreMask();

            var $form = $(".form-qd-v2-form-1");
            var loading = $('form-qd-v1-loading').hide();
            // $form.find(".form-qd-v1-submit").after(loading);

            var cnpj = $form.find("[name='qd_form_cpnj']");
            cnpj.keyup(function(e) {
                if ((cnpj.val() || "").length > 17)
                    Institutional.checkCnpjExist(cnpj.val() || "");
            });

            // Preenchendo o endereço a partir do CEP
            var cepInputs = $form.find("input[name=qd_form_street], input[name=qd_form_complement], input[name=qd_form_neighboor], input[name=qd_form_city], input[name=qd_form_state]").attr("disabled", "disabled");
            var cep = $form.find("input[name=qd_form_zipcode]");
            cep.keyup(function(e) {
                if ((cep.val() || "").length < 9)
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
                rules: { email: { email: true } },
                submitHandler: function(form) {
                    var $form = $(form);

                    if (!$form.valid())
                        return;

                    // $form.find(".form-qd-v1-submit").slideUp();
                    loading.slideDown();
                    var inputs = $form.find("input, textarea");

                    loading.slideDown();
                    Institutional.checkCnpjExist(inputs.filter("[name='qd_form_cpnj']").val() || "").always(function() { loading.slideUp(); }).done(function(data) {
                        if (data.length)
                            return;

                        loading.slideDown();

                        var stateRegistration = (inputs.filter("[name='qd_form_ie']").val() || "Isento").trim();
                        stateRegistration = stateRegistration.length ? stateRegistration : "Isento";
                        stateRegistration = stateRegistration.replace(/i.+ento/g, "Isento");

                        var mobileNumber = (inputs.filter("[name='qd_form_celphone']").val() || "").replace(/[^0-9]/ig, "").trim();
                        mobileNumber = mobileNumber.length ? "+55" + mobileNumber : "";

                        $.ajax({
                            url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/documents",
                            type: "PATCH",
                            dataType: "json",
                            headers: { "Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
                            data: JSON.stringify({
                                firstName: inputs.filter("[name='qd_form_name']").val() || "",
                                email: inputs.filter("[name='qd_form_email']").val() || "",
                                birthDate: (inputs.filter("[name='qd_form_birthdate']").val() || "").replace(/(\d+)\/(\d+)\/(\d+)/g, "$3-$2-$1"),
                                gender: inputs.filter("[name='qd_form_sex']").val() || "",
                                documentType: "cpf",
                                "document": (inputs.filter("[name='qd_form_cpf']").val() || "").replace(/[^0-9]/ig, ""),
                                homePhone: "+55" + (inputs.filter("[name='qd_form_phone']").val() || "").replace(/[^0-9]/ig, ""),
                                phone: mobileNumber,
                                tradeName: inputs.filter("[name='qd_form_trading_name']").val() || "",
                                corporateName: inputs.filter("[name='qd_form_company_name']").val() || "",
                                corporateDocument: (inputs.filter("[name='qd_form_cpnj']").val() || "").replace(/[^0-9]/ig, ""),
                                stateRegistration: stateRegistration,
                                isCorporate: true,
                                localeDefault: "pt-BR"
                            }),
                            success: function(data) {
                                $.ajax({
                                    url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AD/documents",
                                    type: "PATCH",
                                    dataType: "json",
                                    headers: { "Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8" },
                                    data: JSON.stringify({
                                        addressName: "Principal",
                                        userId: (data.Id || "").replace(/^[a-z]{2}\-/i, ""),
                                        street: inputs.filter("[name='qd_form_street']").val() || "",
                                        number: inputs.filter("[name='qd_form_number']").val() || "",
                                        complement: inputs.filter("[name='qd_form_complement']").val() || "",
                                        neighborhood: inputs.filter("[name='qd_form_neighboor']").val() || "",
                                        city: inputs.filter("[name='qd_form_city']").val() || "",
                                        state: inputs.filter("[name='qd_form_state']").val() || "",
                                        postalCode: inputs.filter("[name='qd_form_zipcode']").val() || "",
                                        addressType: "residential",
                                        receiverName: inputs.filter("[name='qd_form_name']").val() || "",
                                        geoCoordinate: []
                                    }),
                                    success: function() {
                                        // $form.find(".form-qd-v1-submit").addClass('hide');
                                        $('.form-qd-v1-sucess').removeClass('hide');
                                        $('.register-content-qd-v1').addClass('hide');
                                        $(document.body).scrollTop(0);
                                    },
                                    error: function(data) {
                                        alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
                                    },
                                    complete: function() {
                                        loading.slideUp(function() { $(this).remove(); });
                                    }
                                });
                            },
                            error: function() {
                                alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
                                loading.slideUp(function() { $(this).remove(); });
                            }
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
} catch (e) {
    (typeof console !== "undefined" && typeof console.error === "function" && console.error("Houve um erro nos objetos. Detalhes: " + e.message));
}

try {
    (function() {
        var body, ajaxStop, windowLoad;

        windowLoad = function() {
            Common.windowOnload();
            if (body.is(".home")) Home.windowOnload();
            else if (body.is(".departamento, .categoria")) Departament.windowOnload();
            else if (body.is(".resultado-busca")) Search.windowOnload();
            else if (body.is(".produto")) Product.windowOnload();
            else if (body.is(".listas")) List.windowOnload();
            else if (body.is(".institucional")) Institutional.windowOnload();
            else if (body.is(".orders")) Orders.windowOnload();
        };

        ajaxStop = function() {
            Common.ajaxStop();
            if (body.is(".home")) Home.ajaxStop();
            else if (body.is(".departamento, .categoria")) Departament.ajaxStop();
            else if (body.is(".resultado-busca")) Search.ajaxStop();
            else if (body.is(".produto")) Product.ajaxStop();
            else if (body.is(".listas")) List.ajaxStop();
            else if (body.is(".institucional")) Institutional.ajaxStop();
            else if (body.is(".orders")) Orders.ajaxStop();
        };

        $(function() {
            body = $(document.body);
            Common.init();
            if (body.is(".home")) Home.init();
            else if (body.is(".departamento, .categoria")) Departament.init();
            else if (body.is(".resultado-busca")) Search.init();
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
} catch (e) {
    (typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message));
}

/* Quatro Digital Newsletter // 5.0 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function() { var f = jQuery; if ("function" !== typeof f.fn.QD_news) { var t = { defaultName: "Digite seu nome...", defaultEmail: "Digite seu e-mail...", nameField: ".qd_news_name", checkNameFieldIsVisible: !0, emailField: ".qd_news_email", btn: ".qd_news_button", elementError: ".nv2_messageError", elementSuccess: ".nv2_messageSuccess", validationMethod: "popup", getAttr: "alt", setDefaultName: !0, checkNameExist: !0, validateName: !0, showInPopup: !0, animation: "blink", animateSpeed: 100, animateDistance: 15, animateRepeat: 3, animateFieldSuccess: ".qd_news_animate_field_success", timeHideSuccessMsg: 3E3, platform: "VTEX", allowSubmit: function() { return !0 }, successCallback: function() {}, submitCallback: function(f, l) {} }; f.fn.QD_news = function(r) { var l = function(a, d) { if ("object" === typeof console && "function" === typeof console.error && "function" === typeof console.info && "function" === typeof console.warn) { var g; "object" === typeof a ? (a.unshift("[QD News]\n"), g = a) : g = ["[QD News]\n" + a]; if ("undefined" === typeof d || "alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase()) if ("undefined" !== typeof d && "info" === d.toLowerCase()) try { console.info.apply(console, g) } catch (b) { console.info(g.join("\n")) } else try { console.error.apply(console, g) } catch (f) { console.error(g.join("\n")) } else try { console.warn.apply(console, g) } catch (e) { console.warn(g.join("\n")) } } }, h = f(this); if (!h.length) return h; var a = f.extend({}, t, r); a.showInPopup || (a.validationMethod = "div"); null !== a.animation ? a.validationMethod = "animateField" : "animateField" == a.validationMethod && (a.animation = "leftRight"); if ("popup" == a.validationMethod && "function" !== typeof f.fn.vtexPopUp2) return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."), h; var q = function(f) { var d, g, b; g = 0; d = function() { f.animate({ left: "-=" + a.animateDistance }, a.animateSpeed, function() { f.animate({ left: "+=" + a.animateDistance }, a.animateSpeed, function() { g < a.animateRepeat && d(); g++ }) }) }; b = function() { f.fadeTo(a.animateSpeed, .2, function() { f.fadeTo(a.animateSpeed, 1, function() { g < a.animateRepeat && b(); g++ }) }) }; f.stop(!0, !0); "leftRight" == a.animation ? d() : "blink" == a.animation && b() }; h.each(function() { var h, d, g, b = f(this), k = b.find(a.nameField), e = b.find(a.emailField), m = b.find(a.btn); "animateField" != a.validationMethod && (d = b.find(a.elementError), g = b.find(a.elementSuccess)); 1 > k.length && a.checkNameExist && l("Campo de nome, n\u00e3o encontrado (" + k.selector + "). Ser\u00e1 atribuido um valor padr\u00e3o.", "info"); if (1 > e.length) return l("Campo de e-mail, n\u00e3o encontrado (" + e.selector + ")"), b; if (1 > m.length) return l("Bot\u00e3o de envio, n\u00e3o encontrado (" + m.selector + ")"), b; if ("animateField" != a.validationMethod && (1 > g.length || 1 > d.length)) return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n (" + g.selector + ", " + d.selector + ")"), b; a.setDefaultName && k.is("input[type=text], textarea") && k.val(a.defaultName); e.val(a.defaultEmail); (function() { if (a.checkNameExist) { if (a.checkNameFieldIsVisible) { var c = k.filter(":visible"); if (!c.length) return } else c = k; var b = c.val(); c.is("input:text, textarea") && c.bind({ focus: function() { c.val() != b || 0 !== c.val().search(a.defaultName.substr(0, 6)) && !a.setDefaultName || c.val("") }, blur: function() { "" === c.val() && c.val(b) } }) } })(); (function() { var c; c = e.val(); e.bind({ focus: function() { e.val() == c && 0 === e.val().search(a.defaultEmail.substr(0, 6)) && e.val("") }, blur: function() { "" === e.val() && e.val(c) } }) })(); h = function() { var c, e, h, k; e = (c = b.find(a.nameField).filter("input[type=text],select,textarea").val()) ? c : b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length ? b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val() || "" : (c = b.find(a.nameField).attr(a.getAttr)) ? c : (c = b.find(a.nameField).text()) ? c : (c = b.find(a.nameField).find(".box-banner img:first").attr("alt")) ? c : "Nome_Padrao"; c = (b.find(a.emailField).val() || "").trim(); h = b.find(a.nameField).is(":visible"); h = a.validateName ? (1 > e.length || 0 === e.search(a.defaultName.substr(0, 6))) && (a.checkNameExist || h ? h : !0) : !1; k = 0 > c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i); if (h || k) "animateField" == a.validationMethod ? (h && q(b.find(a.nameField)), k && q(b.find(a.emailField))) : "popup" == a.validationMethod ? d.vtexPopUp2({ popupType: "newsletter", popupClass: "popupNewsletterError" }) : (d.slideDown().bind("click", function() { f(this).slideUp() }), setTimeout(function() { d.slideUp() }, 1800)); else if (a.allowSubmit()) { m.attr("disabled", "disabled"); var n = { postData: { newsletterClientEmail: c, newsletterClientName: a.defaultName == e ? "-" : e, newsInternalCampaign: "newsletter:opt-in", newsInternalPage: (document.location.pathname || "/").replace(/\//g, "_"), newsInternalPart: "newsletter" }, button: m, wrapper: b }; "linx" === a.platform && (n.postData.nome = n.postData.newsletterClientName, n.postData.email = n.postData.newsletterClientEmail); f.ajax({ url: "linx" === a.platform ? "/newsletter.aspx" : "/no-cache/Newsletter.aspx", type: "linx" === a.platform ? "GET" : "POST", data: n.postData, success: function(c) { var e, h, d; m.removeAttr("disabled"); if ("linx" === a.platform && !(-1 < c.indexOf(" com sucesso.") || -1 < c.indexOf(" cadastrado."))) return alert(c); "popup" == a.validationMethod ? g.vtexPopUp2({ popupType: "newsletter", popupClass: "popupNewsletterSuccess" }) : "animateField" != a.validationMethod && g.slideDown().bind("click", function() { f(this).slideUp() }); d = b.find(a.emailField); a.setDefaultName && b.find(a.nameField).is("input:text, textarea") && b.find(a.nameField).val(a.defaultName); e = function() { d.val(a.defaultEmail) }; "animateField" == a.validationMethod ? (d.val(b.find(a.animateFieldSuccess).val() || "Obrigado!!!"), d.addClass("vtexNewsSuccess"), h = setTimeout(function() { d.removeClass("vtexNewsSuccess"); e(); d.unbind("focus.vtexNews") }, a.timeHideSuccessMsg), d.bind("focus.vtexNews", function() { d.removeClass("vtexNewsSuccess"); clearTimeout(h); f(this).val(""); f(this).unbind("focus.vtexNews") })) : e(); a.successCallback(n); f(window).trigger("qdNewsSuccessCallback", n) } }); a.submitCallback(c, e) } else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'", "info") }; var p = function(a) { 13 == (a.keyCode ? a.keyCode : a.which) && (a.preventDefault(), h()) }; k.filter("input:text, textarea").bind("keydown", p); e.bind("keydown", p); p = m.getParent("form"); p.length ? p.submit(function(a) { a.preventDefault(); h() }) : m.bind("click.qd_news", function() { h() }) }); return h }; f(function() { f(".qd_news_auto").QD_news() }) } })();
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d) { if ("function" !== typeof d.qdAjax) { var a = {}; d.qdAjaxQueue = a; 150 > parseInt((d.fn.jquery.replace(/[^0-9]+/g, "") + "000").slice(0, 3), 10) && console && "function" == typeof console.error && console.error(); d.qdAjax = function(f) { try { var b = d.extend({}, { url: "", type: "GET", data: "", success: function() {}, error: function() {}, complete: function() {}, clearQueueDelay: 5 }, f), e; e = "object" === typeof b.data ? JSON.stringify(b.data) : b.data.toString(); var c = encodeURIComponent(b.url + "|" + b.type + "|" + e); a[c] = a[c] || {}; "undefined" == typeof a[c].jqXHR ? a[c].jqXHR = d.ajax(b) : (a[c].jqXHR.done(b.success), a[c].jqXHR.fail(b.error), a[c].jqXHR.always(b.complete)); a[c].jqXHR.always(function() { isNaN(parseInt(b.clearQueueDelay)) || setTimeout(function() { a[c].jqXHR = void 0 }, b.clearQueueDelay) }); return a[c].jqXHR } catch (g) { "undefined" !== typeof console && "function" === typeof console.error && console.error("Problemas no $.qdAjax :( . Detalhes: " + g.message) } }; d.qdAjax.version = "4.0" } })(jQuery);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function() { var l = function(a, c) { if ("object" === typeof console) { var d = "object" === typeof a; "undefined" !== typeof c && "alerta" === c.toLowerCase() ? d ? console.warn("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.warn("[QD VTEX Checkout Queue]\n" + a) : "undefined" !== typeof c && "info" === c.toLowerCase() ? d ? console.info("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.info("[QD VTEX Checkout Queue]\n" + a) : d ? console.error("[QD VTEX Checkout Queue]\n", a[0], a[1], a[2], a[3], a[4], a[5], a[6], a[7]) : console.error("[QD VTEX Checkout Queue]\n" + a) } }, f = null, g = {}, h = {}, e = {}; $.QD_checkoutQueue = function(a, c) { if (null === f) if ("object" === typeof window.vtexjs && "undefined" !== typeof window.vtexjs.checkout) f = window.vtexjs.checkout; else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js"); var d = $.extend({ done: function() {}, fail: function() {} }, c), b = a.join(";"), k = function() { g[b].add(d.done); h[b].add(d.fail) }; e[b] ? k() : (g[b] = $.Callbacks(), h[b] = $.Callbacks(), k(), e[b] = !0, f.getOrderForm(a).done(function(a) { e[b] = !1; g[b].fire(a) }).fail(function(a) { e[b] = !1; h[b].fire(a) })) } })(); 
/* Quatro Digital - Scroll Toggle // 1.4 // Carlos Vinicius // Todos os direitos reservados */ 
(function() { var c = jQuery, e = function(a, d) { if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) { var b; "object" === typeof a ? (a.unshift("[QD Scroll Toggle]\n"), b = a) : b = ["[QD Scroll Toggle]\n" + a]; if ("undefined" === typeof d || "alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase()) if ("undefined" !== typeof d && "info" === d.toLowerCase()) try { console.info.apply(console, b) } catch (c) { try { console.info(b.join("\n")) } catch (e) {} } else try { console.error.apply(console, b) } catch (h) { try { console.error(b.join("\n")) } catch (k) {} } else try { console.warn.apply(console, b) } catch (l) { try { console.warn(b.join("\n")) } catch (m) {} } } }; "function" !== typeof c.QD_scrollToggle && (c.QD_scrollToggle = function(a) { var d = []; if ("string" !== typeof a && "number" !== typeof a || "auto" === a) if ("auto" === a) d.push(c(window).height()); else return e("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo."); else { var b = a.split(","), f; for (f in b) "function" !== typeof b[f] && (a = parseInt(b[f].trim()), isNaN(a) || d.push(a)) } if (!d.length) return e("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll"); if (!document || !document.body || "undefined" === typeof document.body.setAttribute) return e('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :('); if (!document || !document.body || "undefined" === typeof document.body.removeAttribute) return e('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :('); if (!document || !document.body || "undefined" === typeof document.body.getAttribute) return e('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :('); if (!c(window).scrollTop || isNaN(parseInt(c(window).scrollTop()))) return e('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :('); try { document.body.setAttribute("data-qd-scroll", 1), document.body.getAttribute("data-qd-scroll"), document.body.removeAttribute("data-qd-scroll"), document.body.getAttribute("data-qd-scroll") } catch (g) { e("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo", g.message) } c(window).scroll(function() { for (var a = 0; a < d.length; a++) c(window).scrollTop() > d[a] ? document.body.getAttribute("data-qd-scroll-" + a) || document.body.setAttribute("data-qd-scroll-" + a, 1) : document.body.getAttribute("data-qd-scroll-" + a) && document.body.removeAttribute("data-qd-scroll-" + a) }) }, c(function() { var a = c("body[data-qd-scroll-limit]"); a.length && c.QD_scrollToggle(a.attr("data-qd-scroll-limit")) })) })();
/*! * Javascript Cookie v1.5.1 * https://github.com/js-cookie/js-cookie * * Copyright 2006, 2014 Klaus Hartl * Released under the MIT license */
(function(e) { var l; if ("function" === typeof define && define.amd) define(["jquery"], e); else if ("object" === typeof exports) { try { l = require("jquery") } catch (n) {} module.exports = e(l) } else { var m = window.Cookies, h = window.Cookies = e(window.jQuery); h.noConflict = function() { window.Cookies = m; return h } } })(function(e) { function l(a) { a = c.json ? JSON.stringify(a) : String(a); return c.raw ? a : encodeURIComponent(a) } function n(a, r) { var b; if (c.raw) b = a; else a: { var d = a;0 === d.indexOf('"') && (d = d.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")); try { d = decodeURIComponent(d.replace(p, " ")); b = c.json ? JSON.parse(d) : d; break a } catch (e) {} b = void 0 } return h(r) ? r(b) : b } function m() { for (var a, c, b = 0, d = {}; b < arguments.length; b++) for (a in c = arguments[b], c) d[a] = c[a]; return d } function h(a) { return "[object Function]" === Object.prototype.toString.call(a) } var p = /\+/g, c = function(a, e, b) { if (1 < arguments.length && !h(e)) { b = m(c.defaults, b); if ("number" === typeof b.expires) { var d = b.expires, k = b.expires = new Date; k.setMilliseconds(k.getMilliseconds() + 864E5 * d) } return document.cookie = [c.raw ? a : encodeURIComponent(a), "=", l(e), b.expires ? "; expires=" + b.expires.toUTCString() : "", b.path ? "; path=" + b.path : "", b.domain ? "; domain=" + b.domain : "", b.secure ? "; secure" : ""].join("") } for (var d = a ? void 0 : {}, k = document.cookie ? document.cookie.split("; ") : [], q = 0, p = k.length; q < p; q++) { var f = k[q].split("="), g; g = f.shift(); g = c.raw ? g : decodeURIComponent(g); f = f.join("="); if (a === g) { d = n(f, e); break } a || void 0 === (f = n(f)) || (d[g] = f) } return d }; c.get = c.set = c; c.defaults = {}; c.remove = function(a, e) { c(a, "", m(e, { expires: -1 })); return !c(a) }; e && (e.cookie = c, e.removeCookie = c.remove); return c }); var $Cookies = Cookies.noConflict();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b, c, d, e) { b = (b + "").replace(/[^0-9+\-Ee.]/g, ""); b = isFinite(+b) ? +b : 0; c = isFinite(+c) ? Math.abs(c) : 0; e = "undefined" === typeof e ? "," : e; d = "undefined" === typeof d ? "." : d; var a = "", a = function(a, b) { var c = Math.pow(10, b); return "" + (Math.round(a * c) / c).toFixed(b) }, a = (c ? a(b, c) : "" + Math.round(b)).split("."); 3 < a[0].length && (a[0] = a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, e)); (a[1] || "").length < c && (a[1] = a[1] || "", a[1] += Array(c - a[1].length + 1).join("0")); return a.join(d) };
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function() { function b(a) { var b = $("ul.thumbs").not(a); a.html(b.html()); "function" === typeof clickThumbs && clickThumbs() } "function" !== typeof $.fn.QD_productThumbs && ($.fn.QD_productThumbs = function() { var a = $(this); return $.extend({}, a, new b(a)) }, $(function() { $(".QD-thumbs").QD_productThumbs() })) })();
/* Quatro Digital Amazing Menu // 2.11 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p, a, c, k, e, d) { e = function(c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) { d[e(c)] = k[c] || e(c) } k = [function(e) { return d[e] }]; e = function() { return '\\w+' }; c = 1 }; while (c--) { if (k[c]) { p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]) } } return p }('(i(n){v b,h,g,l;b=2g;G("i"!==V b.1j.10){h={X:"/r-1F-11",1g:i(){}};v k=i(a,b){G("1z"===V I){v d="1z"===V a;"1M"!==V b&&"1C"===b.W()?d?I.1N("[U T S]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):I.1N("[U T S]\\n"+a):"1M"!==V b&&"1m"===b.W()?d?I.1m("[U T S]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):I.1m("[U T S]\\n"+a):d?I.1a("[U T S]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):I.1a("[U T S]\\n"+a)}};b.1j.1l=i(){v a=b(B);a.E(i(a){b(B).x("r-w-H-"+a)});a.1d().x("r-w-1d");a.1E().x("r-w-1E");C a};l=i(a){v c,d;a=a.D(".2f");c=a.1B(".r-w-1f");d=a.1B(".r-w-1K");G(c.F||d.F)c.14().x("r-w-1f-1G"),d.14().x("r-w-1K-1G"),b.2h({X:g.X,2i:"2j",2e:i(a){v m=b(a);c.E(i(){v a,e;e=b(B);a=m.D("2d[29=\'"+e.1I("1H-1O-1A")+"\']");a.F&&(a.E(i(){b(B).1L(".28-1f").1w().1o(e)}),e.1s())}).x("r-w-1r-1q");d.E(i(){v a={},e;e=b(B);m.D("2a").E(i(){G(b(B).1D().1c().W()==e.1I("1H-1O-1A").1c().W())C a=b(B),!1});a.F&&(a.E(i(){b(B).1L("[27*=\'2b\']").1w().1o(e)}),e.1s())}).x("r-w-1r-1q")},1a:i(){k("N\\1J 2c 2k\\2l 2t 2u 2v 1P 11. A X \'"+g.X+"\' 2w.")},2s:2r})};b.10=i(a){v c=i(a){v b={j:"2n%8%1u%8%p%8%q",2m:"2o%8%p%8%q",2p:"2q%8%R%8%p%8%q",2x:"23%8%O%8%p%8%q",1U:"1V%8%Q%8%p%8%q",1S:"c-1e%8%R%8%p%8%q",Y:"-1e%8%O%8%p%8%q","Y-":"1e%8%Q%8%p%8%q","J%8%":"1u%8%R%8%p%8%q","J%8%2":"1Q%8%O%8%p%8%q","J%8%25":"1T%8%Q%8%p%8%q","J%8%21":"1X%8%p%8%q","K%25":"1h%p%8%q","K%1Y":"2%R%8%p%8%q","K%8":"%O%8%p%8%q","K%8%":"Q%8%p%8%q","Y-1Z":"e%8%R%8%p%8%q","Y-K":"%8%O%8%p%8%q","Y-K%":"8%Q%8%p%8%q","J%8%20":"1W%8%R%8%p%8%q","J%8%22":"24%8%O%8%p%8%q","J%8%1R":"e%8%Q%8%p%8%q"};C i(a){v d,e,f,c;e=i(a){C a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+f[16]+"c"+f[17]+"m"+e(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"3f"+e("o")+"n"];d=i(a){C 3m(3d(a.19(/\\./g,"\\3p").19(/[a-3l-Z]/g,i(a){C 3n.3i(("Z">=a?39:3c)>=(a=a.2y(0)+13)?a:a-26)})))};3e(v g 3g b){G(d(a[[f[9],e("o"),f[12],f[e(13)]].1v("")])===g+b[g]){c="38"+f[17]+"e";3b}c="f"+f[0]+"3h"+e(f[1])+""}e=!1;-1<a[[f[12],"e",f[0],"3o",f[9]].1v("")].3k("3j%1t%1x%1y%1k%1b%1k%3a%36%2K%1h%2J%1h%2I%1k%1b%1t%1x%1y%2L%1b")&&(e=!0);C[c,e]}(a)}(n);G(!2M(c[0]))C c[1]?k("\\2O\\37\\1n \\2N\\M\\2H\\2G\\1p\\M\\1p\\1n \\2B\\M\\2A\\M \\2z\\2C\\2D\\M L\\2F\\M!"):!1;c=a.D("P[2E]").E(i(){v d,c;d=b(B);G(!d.F)C k(["2P 1P 11 n\\1J 2Q",a],"1C");d.D("H >P").14().x("r-w-31-P");d.D("H").E(i(){v a=b(B),c;c=a.15(":30(P)");c.F&&a.x("r-w-32-"+c.1d().1D().1c().33().19(/\\./g,"").19(/\\s/g,"-").W())});c=d.D(">H").1l();d.x("r-1F-11");c=c.D(">P");c.E(i(){v a=b(B);a.D(">H").1l().x("r-w-35");a.x("r-w-1i-11");a.14().x("r-w-1i")});c.x("r-w-1i");v g=0,h=i(a){g+=1;a=a.15("H").15("*");a.F&&(a.x("r-w-34-"+g),h(a))};h(d);d.2Z(d.D("P")).E(i(){v a=b(B);a.x("r-w-"+a.15("H").F+"-H")})});l(c);g.1g.2Y(B);b(2T).2S("2R.w.1g",a)};b.1j.10=i(a){v c=b(B);G(!c.F)C c;g=b.2U({},h,a);c.2V=2X b.10(b(B));C c};b(i(){b(".2W").10()})}})(B);', 62, 212, '||||||||25C2||||||||||function|||||||25A8pbz|25A8oe|qd||||var|am|addClass||||this|return|find|each|length|if|li|console|jjj|dqprygvtne||u0391||25A8igrkpbzzreprorgn|ul|25A8igrkpbzzreprfgnoyr|25A8igrkpbzzrepr|Menu|Amazing|QD|typeof|toLowerCase|url|qrirybc||QD_amazingMenu|menu|||parent|children||||replace|error|82|trim|first|znpbardhv|banner|callback|C2|dropdown|fn|D1|qdAmAddNdx|info|u0472|insertBefore|u2202|loaded|content|hide|E0|25A8znpbardhv|join|clone|B8|84|object|value|filter|alerta|text|last|amazing|wrapper|data|attr|u00e3o|collection|getParent|undefined|warn|qdam|do|5A8znpbardhv|25A8dqprygvtn|qriryb|A8znpbardhv|znpba|rdhv|tne|8dqprygvtne|25C|dqprygvtn|25A8dqprygv|25A|25A8dqprygvt|ardhv|ne|||class|box|alt|h2|colunas|foi|img|success|qd_am_code|jQuery|qdAjax|dataType|html|poss|u00edvel|zn|jj|pbardhv|znp|bardhv|3E3|clearQueueDelay|obter|os|dados|falho|znpb|charCodeAt|u0aef|u0ae8|u03a1|u0abd|u01ac|itemscope|u0472J|u00a1|u2113|A1|A1g|83d|C5|eval|u221a|u0e17|UL|encontrada|QuatroDigital|trigger|window|extend|exec|qd_amazing_menu_auto|new|call|add|not|has|elem|replaceSpecialChars|level|column|CF|u00c3|tr|90|8F|break|122|encodeURIComponent|for|ti|in|ls|fromCharCode|qu|indexOf|zA|escape|String|rc|u00a8'.split('|'), 0, {}));
/* * jQuery BBQ: Back Button & Query Library - v1.2.1 - 2/17/2010 * http://benalman.com/projects/jquery-bbq-plugin/ * * Copyright (c) 2010 "Cowboy" Ben Alman * Dual licensed under the MIT and GPL licenses. * http://benalman.com/about/license/ */
(function($, p) { var i, m = Array.prototype.slice, r = decodeURIComponent, a = $.param, c, l, v, b = $.bbq = $.bbq || {}, q, u, j, e = $.event.special, d = "hashchange", A = "querystring", D = "fragment", y = "elemUrlAttr", g = "location", k = "href", t = "src", x = /^.*\?|#.*$/g, w = /^.*\#/, h, C = {}; function E(F) { return typeof F === "string" } function B(G) { var F = m.call(arguments, 1); return function() { return G.apply(this, F.concat(m.call(arguments))) } } function n(F) { return F.replace(/^[^#]*#?(.*)$/, "$1") } function o(F) { return F.replace(/(?:^[^?#]*\?([^#]*).*$)?.*/, "$1") } function f(H, M, F, I, G) { var O, L, K, N, J; if (I !== i) { K = F.match(H ? /^([^#]*)\#?(.*)$/ : /^([^#?]*)\??([^#]*)(#?.*)/); J = K[3] || ""; if (G === 2 && E(I)) { L = I.replace(H ? w : x, "") } else { N = l(K[2]); I = E(I) ? l[H ? D : A](I) : I; L = G === 2 ? I : G === 1 ? $.extend({}, I, N) : $.extend({}, N, I); L = a(L); if (H) { L = L.replace(h, r) } } O = K[1] + (H ? "#" : L || !K[1] ? "?" : "") + L + J } else { O = M(F !== i ? F : p[g][k]) } return O } a[A] = B(f, 0, o); a[D] = c = B(f, 1, n); c.noEscape = function(G) { G = G || ""; var F = $.map(G.split(""), encodeURIComponent); h = new RegExp(F.join("|"), "g") }; c.noEscape(",/"); $.deparam = l = function(I, F) { var H = {}, G = { "true": !0, "false": !1, "null": null }; $.each(I.replace(/\+/g, " ").split("&"), function(L, Q) { var K = Q.split("="), P = r(K[0]), J, O = H, M = 0, R = P.split("]["), N = R.length - 1; if (/\[/.test(R[0]) && /\]$/.test(R[N])) { R[N] = R[N].replace(/\]$/, ""); R = R.shift().split("[").concat(R); N = R.length - 1 } else { N = 0 } if (K.length === 2) { J = r(K[1]); if (F) { J = J && !isNaN(J) ? +J : J === "undefined" ? i : G[J] !== i ? G[J] : J } if (N) { for (; M <= N; M++) { P = R[M] === "" ? O.length : R[M]; O = O[P] = M < N ? O[P] || (R[M + 1] && isNaN(R[M + 1]) ? {} : []) : J } } else { if ($.isArray(H[P])) { H[P].push(J) } else { if (H[P] !== i) { H[P] = [H[P], J] } else { H[P] = J } } } } else { if (P) { H[P] = F ? i : "" } } }); return H }; function z(H, F, G) { if (F === i || typeof F === "boolean") { G = F; F = a[H ? D : A]() } else { F = E(F) ? F.replace(H ? w : x, "") : F } return l(F, G) } l[A] = B(z, 0); l[D] = v = B(z, 1); $[y] || ($[y] = function(F) { return $.extend(C, F) })({ a: k, base: k, iframe: t, img: t, input: t, form: "action", link: k, script: t }); j = $[y]; function s(I, G, H, F) { if (!E(H) && typeof H !== "object") { F = H; H = G; G = i } return this.each(function() { var L = $(this), J = G || j()[(this.nodeName || "").toLowerCase()] || "", K = J && L.attr(J) || ""; L.attr(J, a[I](K, H, F)) }) } $.fn[A] = B(s, A); $.fn[D] = B(s, D); b.pushState = q = function(I, F) { if (E(I) && /^#/.test(I) && F === i) { F = 2 } var H = I !== i, G = c(p[g][k], H ? I : {}, H ? F : 2); p[g][k] = G + (/#/.test(G) ? "" : "#") }; b.getState = u = function(F, G) { return F === i || typeof F === "boolean" ? v(F) : v(G)[F] }; b.removeState = function(F) { var G = {}; if (F !== i) { G = u(); $.each($.isArray(F) ? F : arguments, function(I, H) { delete G[H] }) } q(G, 2) }; e[d] = $.extend(e[d], { add: function(F) { var H; function G(J) { var I = J[D] = c(); J.getState = function(K, L) { return K === i || typeof K === "boolean" ? l(I, K) : l(I, L)[K] }; H.apply(this, arguments) } if ($.isFunction(F)) { H = F; return G } else { H = F.handler; F.handler = G } } }) })(jQuery, this);
/* jQuery Cookie Plugin v1.4.1 // https://github.com/carhartl/jquery-cookie // Copyright 2013 Klaus Hartl // Released under the MIT license */
(function(c) { "function" === typeof define && define.amd ? define(["jquery"], c) : "object" === typeof exports ? c(require("jquery")) : c(jQuery) })(function(c) { function n(b) { b = f.json ? JSON.stringify(b) : String(b); return f.raw ? b : encodeURIComponent(b) } function m(b, e) { var a; if (f.raw) a = b; else a: { var d = b;0 === d.indexOf('"') && (d = d.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\")); try { d = decodeURIComponent(d.replace(l, " ")); a = f.json ? JSON.parse(d) : d; break a } catch (g) {} a = void 0 } return c.isFunction(e) ? e(a) : a } var l = /\+/g, f = c.cookie = function(b, e, a) { if (void 0 !== e && !c.isFunction(e)) { a = c.extend({}, f.defaults, a); if ("number" === typeof a.expires) { var d = a.expires, g = a.expires = new Date; g.setTime(+g + 864E5 * d) } return document.cookie = [f.raw ? b : encodeURIComponent(b), "=", n(e), a.expires ? "; expires=" + a.expires.toUTCString() : "", a.path ? "; path=" + a.path : "", a.domain ? "; domain=" + a.domain : "", a.secure ? "; secure" : ""].join("") } a = b ? void 0 : {}; for (var d = document.cookie ? document.cookie.split("; ") : [], g = 0, l = d.length; g < l; g++) { var h = d[g].split("="), k; k = h.shift(); k = f.raw ? k : decodeURIComponent(k); h = h.join("="); if (b && b === k) { a = m(h, e); break } b || void 0 === (h = m(h)) || (a[k] = h) } return a }; f.defaults = {}; c.removeCookie = function(b, e) { if (void 0 === c.cookie(b)) return !1; c.cookie(b, "", c.extend({}, e, { expires: -1 })); return !c.cookie(b) } });
/* Quatro Digital - Smart Quantity // 1.11 // Carlos Vinicius // Todos os direitos reservados */
(function(v) { var d = jQuery; if ("function" !== typeof d.fn.QD_smartQuantity) { var g = function(d, a) { if ("object" === typeof console && "function" === typeof console.error && "function" === typeof console.info && "function" === typeof console.warn) { var f; "object" === typeof d ? (d.unshift("[Quatro Digital - Smart Quantity]\n"), f = d) : f = ["[Quatro Digital - Smart Quantity]\n" + d]; if ("undefined" === typeof a || "alerta" !== a.toLowerCase() && "aviso" !== a.toLowerCase()) if ("undefined" !== typeof a && "info" === a.toLowerCase()) try { console.info.apply(console, f) } catch (k) { console.info(f.join("\n")) } else try { console.error.apply(console, f) } catch (k) { console.error(f.join("\n")) } else try { console.warn.apply(console, f) } catch (k) { console.warn(f.join("\n")) } } }, m = { buyButton: ".buy-button", qttInput: ".qd-sq-quantity", btnMore: ".qd-sq-more", btnMinus: ".qd-sq-minus", initialValue: 1, minimumValue: 1, setQuantityByUrl: !0 }, n = function(h, a) { function f(c, e, b) { a.setQuantityByUrl ? c.val(((location.search || "").match(q) || [a.initialValue]).pop()) : c.val(a.initialValue); c.change(function(c, b) { try { if ("qd_ssl_trigger" != b) { var e = d(this), f = parseInt(e.val().replace(n, "")); !isNaN(f) && f > a.minimumValue ? e.val(f) : e.val(a.minimumValue); e.trigger("QuatroDigital.sq_change", this) } } catch (t) { g(t.message) } }); c.focusin(function() { d(this).trigger("QuatroDigital.sq_focusin", this) }); e.click(function(b) { b.preventDefault(); c.val((parseInt(c.val()) || a.minimumValue) + 1).change() }); b.click(function(b) { b.preventDefault(); c.val((parseInt(c.val()) || a.minimumValue + 1) - 1).change() }); c.change() } function k(c, e, b) { c.on("QuatroDigital.sq_change", function() { (d(this).val() || 0) <= a.minimumValue ? (b.addClass("qd-sq-inactive"), e.removeClass("qd-sq-inactive")) : (e.addClass("qd-sq-inactive"), b.removeClass("qd-sq-inactive")) }) } function m(c, e) { c.on("QuatroDigital.sq_change", function() { try { if (!(e[0].hostname || "").length) return g("A quantidade n\u00e3o foi inserida no bt comprar pois o mesmo n\u00e3o possui uma URL", "info"); var b = e[0].search || ""; - 1 < b.toLowerCase().indexOf("qty=") ? e[0].search = b.replace(p, "qty=" + (parseInt(c.val()) || ("number" == typeof a.minimumValue ? a.minimumValue : 1)) + "&") : e[0].search = "qty=" + (parseInt(c.val()) || ("number" == typeof a.minimumValue ? a.minimumValue : 1)) + "&" + (e[0].search || "").replace(p, ""); var d = ((e.attr("href") || "").match(u) || [""]).pop() + ""; c.attr("data-sku-id", d); if (d.length && "object" === typeof skuJson && !c.attr("data-sku-price")) for (b = 0; b < skuJson.skus.length; b++) skuJson.skus[b].sku == d && c.attr("data-sku-price", skuJson.skus[b].bestPrice) } catch (l) { g(l.message) } }) } var n = /[^0-9-]/gi, q = /qty\=([0-9]+)/i, u = /sku\=([0-9]+)/i, p = /qty\=[0-9]+\&?/ig; h.each(function() { try { var c = d(this), e = c.find(a.buyButton), b = c.find(a.qttInput), h = c.find(a.btnMore), l = c.find(a.btnMinus); if (!e.length && null !== a.buyButton || !b.length) return g("O plugin parou por aqui! N\u00e3o foram encontrados o bot\u00e3o comprar e o campo de quantidade", "alerta"); if (b.is(".qd-sq-on")) return g(["Execu\u00e7\u00e3o ignorada pois este input j\u00e1 possui o plugin aplicado. Input: ", b], "info"); b.addClass("qd-sq-on"); k(b, h, l); null !== a.buyButton && m(b, e); f(b, h, l); d(window).on("vtex.sku.selected", function() { b.change() }) } catch (r) { g(r.message) } }) }; d.fn.QD_smartQuantity = function(g) { var a = d(this); a.qdPlugin = new n(a, d.extend({}, m, g)); d(window).trigger("QuatroDigital.sq_callback"); return a }; d(function() { d(".qd_auto_smart_quantity").QD_smartQuantity() }) } })(this);
/* Quatro Digital - Smart Buy Button // 2.0 // Carlos Vinicius // Todos os direitos reservados */
(function(u) { try { var a = jQuery, r = a({}), n = function(a, d) { if ("object" === typeof console && "undefined" !== typeof console.error && "undefined" !== typeof console.info && "undefined" !== typeof console.warn) { var b; "object" === typeof a ? (a.unshift("[Quatro Digital - Buy Button]\n"), b = a) : b = ["[Quatro Digital - Buy Button]\n" + a]; if ("undefined" === typeof d || "alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase()) if ("undefined" !== typeof d && "info" === d.toLowerCase()) try { console.info.apply(console, b) } catch (h) { try { console.info(b.join("\n")) } catch (l) {} } else try { console.error.apply(console, b) } catch (h) { try { console.error(b.join("\n")) } catch (l) {} } else try { console.warn.apply(console, b) } catch (h) { try { console.warn(b.join("\n")) } catch (l) {} } } }, t = { timeRemoveNewItemClass: 5E3, isSmartCheckout: !0, buyButton: ".productInformationWrapper  a.buy-button", buyQtt: "input.buy-in-page-quantity", selectSkuMsg: "javascript:", autoWatchBuyButton: !0, buyIfQuantityZeroed: !1, fakeRequest: !1, productPageCallback: function(g, d, b) { a("body").is(".productQuickView") && ("success" === d ? alert("Produto adicionado ao carrinho!") : (alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."), ("object" === typeof parent ? parent : document).location.href = b)) }, isProductPage: function() { return a("body").is("#produto, .produto") }, execDefaultAction: function(a) { return !1 }, allowBuyClick: function() { return !0 }, callback: function() {}, asyncCallback: function() {} }; a.QD_buyButton = function(g, d, b) { function h(a) { f.isSmartCheckout ? a.data("qd-bb-click-active") || (a.data("qd-bb-click-active", 1), a.on("click.qd_bb_buy_sc", function(a) { if (!f.allowBuyClick()) return !0; if (!0 !== m.clickBuySmartCheckout.call(this)) return a.preventDefault(), !1 })) : alert("M\u00e9todo descontinuado!") } function l(e) { e = e || a(f.buyButton); e.each(function() { var c = a(this); c.is(".qd-sbb-on") || (c.addClass("qd-sbb-on"), c.is(".btn-add-buy-button-asynchronous") && !c.is(".remove-href") || c.data("qd-bb-active") || (c.data("qd-bb-active", 1), c.children(".qd-bb-productAdded").length || c.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'), c.is(".buy-in-page-button") && f.isProductPage() && p.call(c), h(c))) }); f.isProductPage() && !e.length && n("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '" + e.selector + "'.", "info") } var p, f = b || f, k = a(g), m = this; window._Quatro_Digital_dropDown = window._Quatro_Digital_dropDown || {}; window._QuatroDigital_CartData = window._QuatroDigital_CartData || {}; m.prodAdd = function(e, c) { k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd"); a("body").addClass("qd-bb-lightBoxBodyProdAdd"); var b = a(f.buyButton).filter("[href='" + (e.attr("href") || "---") + "']").add(e); b.addClass("qd-bb-itemAddBuyButtonWrapper"); setTimeout(function() { k.removeClass("qd-bb-itemAddCartWrapper"); b.removeClass("qd-bb-itemAddBuyButtonWrapper") }, f.timeRemoveNewItemClass); window._Quatro_Digital_dropDown.getOrderForm = void 0; if ("undefined" !== typeof d && "function" === typeof d.getCartInfoByUrl) return f.isSmartCheckout || (n("fun\u00e7\u00e3o descontinuada"), d.getCartInfoByUrl()), window._QuatroDigital_DropDown.getOrderForm = void 0, d.getCartInfoByUrl(function(c) { window._Quatro_Digital_dropDown.getOrderForm = c; a.fn.simpleCart(!0, void 0, !0) }, { lastSku: c }); window._Quatro_Digital_dropDown.allowUpdate = !0; a.fn.simpleCart(!0); a(window).trigger("QuatroDigital.qd_sc_prodAdd", [e, c, b]) }; (function() { if (f.isSmartCheckout && f.autoWatchBuyButton) { var e = a(".btn-add-buy-button-asynchronous"); e.length && l(e) } })(); p = function() { var e = a(this); "undefined" !== typeof e.data("buyButton") ? (e.unbind("click"), h(e)) : (e.bind("mouseenter.qd_bb_buy_sc", function(c) { e.unbind("click"); h(e); a(this).unbind(c) }), a(window).load(function() { e.unbind("click"); h(e); e.unbind("mouseenter.qd_bb_buy_sc") })) }; m.clickBuySmartCheckout = function() { var e = a(this), c = e.attr("href") || ""; if (-1 < c.indexOf(f.selectSkuMsg)) return !0; c = c.replace(/redirect\=(false|true)/ig, "").replace("?", "?redirect=false&").replace(/\&\&/ig, "&"); if (f.execDefaultAction(e)) return e.attr("href", c.replace("redirect=false", "redirect=true")), !0; c = c.replace(/http.?:/i, ""); r.queue(function(b) { if (!f.buyIfQuantityZeroed && !/(&|\?)qty\=[1-9][0-9]*/ig.test(c)) return b(); var d = function(b, d) { var g = c.match(/sku\=([0-9]+)/ig), h = [], l; if ("object" === typeof g && null !== g) for (var k = g.length - 1; 0 <= k; k--) l = parseInt(g[k].replace(/sku\=/ig, "")), isNaN(l) || h.push(l); f.productPageCallback.call(this, b, d, c); m.buyButtonClickCallback.call(this, b, d, c, h); m.prodAdd(e, c.split("ku=").pop().split("&").shift()); "function" === typeof f.asyncCallback && f.asyncCallback.call(this); a(window).trigger("productAddedToCart"); a(window).trigger("cartProductAdded.vtex") }; f.fakeRequest ? (d(null, "success"), b()) : a.ajax({ url: c, complete: d }).always(function() { b() }) }) }; m.buyButtonClickCallback = function(a, c, b, d) { try { "success" === c && "object" === typeof window.parent && "function" === typeof window.parent._QuatroDigital_prodBuyCallback && window.parent._QuatroDigital_prodBuyCallback(a, c, b, d) } catch (v) { n("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.") } }; l(); "function" === typeof f.callback ? f.callback.call(this) : n("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o") }; var k = a.Callbacks(); a.fn.QD_buyButton = function(g, d) { var b = a(this); "undefined" !== typeof d || "object" !== typeof g || g instanceof a || (d = g, g = void 0); var h; k.add(function() { b.children(".qd-bb-itemAddWrapper").length || b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>'); h = new a.QD_buyButton(b, g, a.extend({}, t, d)) }); k.fire(); a(window).on("QuatroDigital.qd_bb_prod_add", function(a, b, d) { h.prodAdd(b, d) }); return a.extend(b, h) }; var q = 0; a(document).ajaxSend(function(a, d, b) { -1 < b.url.toLowerCase().indexOf("/checkout/cart/add") && (q = (b.url.match(/sku\=([0-9]+)/i) || [""]).pop()) }); a(window).bind("productAddedToCart.qdSbbVtex", function() { a(window).trigger("QuatroDigital.qd_bb_prod_add", [new a, q]) }); a(document).ajaxStop(function() { k.fire() }) } catch (g) { "undefined" !== typeof console && "function" === typeof console.error && console.error("Oooops! ", g) } })(this);
/* Quatro Digital - sessionStorage // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function() { var e = function(b, c) { if ("object" === typeof console && "function" === typeof console.error && "function" === typeof console.info && "function" === typeof console.warn) { var a; "object" === typeof b ? (b.unshift("[Quatro Digital - sessionStorage]\n"), a = b) : a = ["[Quatro Digital - sessionStorage]\n" + b]; if ("undefined" === typeof c || "alerta" !== c.toLowerCase() && "aviso" !== c.toLowerCase()) if ("undefined" !== typeof c && "info" === c.toLowerCase()) try { console.info.apply(console, a) } catch (d) { console.info(a.join("\n")) } else try { console.error.apply(console, a) } catch (e) { console.error(a.join("\n")) } else try { console.warn.apply(console, a) } catch (f) { console.warn(a.join("\n")) } } }; window.qdSessionStorage = window.qdSessionStorage || {}; var f = "undefined" !== typeof sessionStorage && "undefined" !== typeof sessionStorage.setItem && "undefined" !== typeof sessionStorage.getItem; window.qdSessionStorage.setItem = function(b, c, a) { try { if (!f) return !1; var d = new Date; sessionStorage.setItem(b, c); isNaN(parseInt(a)) || (d.setTime(d.getTime() + 6E4 * a), sessionStorage.setItem(b + "_expiration", d.getTime())) } catch (g) { e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar salvar os dados no armazenamento da sess\u00e3o. Detalhes: ", g.message], "alerta") } }; window.qdSessionStorage.getItem = function(b) { try { if (!f) return !1; var c = new Date, a = parseInt(sessionStorage.getItem(b + "_expiration") || 0, 10) || 0; return c.getTime() > a ? (sessionStorage.removeItem && (sessionStorage.removeItem(b), sessionStorage.removeItem(b + "_expiration")), null) : sessionStorage.getItem(b) } catch (d) { e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar obter os dados no armazenamento da sess\u00e3o. Detalhes: ", d.message ], "alerta") } } })();
/* Automatizador de comments box do Facebook // 1.5 // Carlos Vinicius [Quatro Digital] */
$(window).load(function() { var a = $(".fb-comments"); a.length && a.attr("data-href", document.location.href.split("#").shift().split("?").shift()); $("#fb-root").length || $("body").append('<div id="fb-root"></div>'); if (!$("script[src*='connect.facebook.net/pt_BR/sdk.js']").filter("[src*='sdk.js']").length) { a = $("meta[property='fb:app_id']").attr("content") || !1; var b, c = document.getElementsByTagName("script")[0]; document.getElementById("facebook-jssdk") || (b = document.createElement("script"), b.id = "facebook-jssdk", b.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3" + (a ? "&appId=" + a : ""), c.parentNode.insertBefore(b, c)) } "undefined" !== typeof FB && "undefined" !== typeof FB.XFBML && FB.XFBML.parse() });
/* Cores Na Prateleira // 12.2 // Carlos Vinicius [QUATRO DIGITAL] // Todos os direitos reservados */
eval(function(p, a, c, k, e, d) { e = function(c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) { d[e(c)] = k[c] || e(c) } k = [function(e) { return d[e] }]; e = function() { return '\\w+' }; c = 1 }; while (c--) { if (k[c]) { p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]) } } return p }('(6(G,b){S("6"!==M b.3w.I){b.3w.I=6(){};b.I={};5 C,D,A,E=-1<6H.6I.1t.1v().3v("6G"),n=6(b,q){S("2l"===M 1g){5 c;"2l"===M b?(b.41("[1N 1V]\\n"),c=b):c=["[1N 1V]\\n"+b];"15"===M q||"1l"!==q.1v()&&"42"!==q.1v()?"15"!==M q&&"1B"===q.1v()?1g.1B.1X(1g,c):1g.2s.1X(1g,c):1g.40.1X(1g,c)}},w=6(b,q){S("2l"===M 1g&&E){5 c;"2l"===M b?(b.41("[1N 1V]\\n"),c=b):c=["[1N 1V]\\n"+b];"15"===M q||"1l"!==q.1v()&&"42"!==q.1v()?"15"!==M q&&"1B"===q.1v()?1g.1B.1X(1g,c):1g.2s.1X(1g,c):1g.40.1X(1g,c)}},B=!1;1w{2n.4S(2n.5l({a:"b"})),B=!0}1x(H){n("6D 6E n\\11 2q 45 a 2n 6J","1l")}5 F={3S:"1L[6K]",6P:"N\\11 1s 6Q\\29 1R 4I 6O\\2M\\6N 6L 6M.",3g:"6B: R$ #3A",2F:"R$ ",6A:".K-3p[6q=\'6r\']",35:!1,4E:!1,3f:!1,4w:!1,3N:!0,2a:!1,4l:!1,4L:!0,4A:!1,1J:14,4M:!1,4c:6(b,q){U b.4Q||b.2B},4K:!0,3c:!0,1m:6p,2N:4,3k:2,39:14,38:{1P:36,2d:36},2f:"3x",2z:!0,2r:!0,1c:["6o"],2w:[14],3o:14,5w:!0,5c:6(){},3q:6(){},4m:6(b,q,c,e,a){},2D:6(b,q,c){1w{U b.1o(/(6l\\/[0-9]+\\-)([0-9]+\\-[0-9]+)/i,"$1"+q+"-"+c)}1x(e){U n(["3u 1T 3q \'2D\'. ",e.1I],"1l"),""}},5j:6(b,q,c,e){e(!1)},1j:!0,4f:2,3H:30,5o:3,6m:"/6n-6s"},z=6(b){5 q={j:"6t%V%3r%V%1A%V%1D",6y:"6z%V%1A%V%1D",6x:"6w%V%6u%V%1A%V%1D",6v:"6R%V%3Z%V%1A%V%1D",6S:"7f%V%3X%V%1A%V%1D",7g:"7e%V%7d%V%7a%V%1A%V%1D","3W%7b":"2%3r%V%3Z%V%1A%V%1D","3W%V":"%3r%V%3X%V%1A%V%1D"};U 6(c){5 b=6(a){U a};5 a=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];c=c["d"+a[16]+"c"+a[17]+"m"+b(a[1])+"n"+a[13]]["l"+a[18]+"c"+a[0]+"7h"+b("o")+"n"];5 d=6(a){U 7i(7n(a.1o(/\\./g,"\\7o").1o(/[a-33-Z]/g,6(a){U 7m.7l(("Z">=a?90:7j)>=(a=a.7k(0)+13)?a:a-26)})))};5 g=d(c[[a[9],b("o"),a[12],a[b(13)]].2i("")]);d=d((1p[["79",b("1T"),"m",a[1],a[4].78(),"6Y"].2i("")]||"---")+[".v",a[13],"e",b("x"),"6Z",b("6X"),"6W",a[1],".c",b("o"),"m.",a[19],"r"].2i(""));X(5 k 1O q){S(d===k+q[k]||g===k+q[k]){5 l="6T"+a[17]+"e";2Q}l="f"+a[0]+"6k"+b(a[1])+""}b=!1;-1<c[[a[12],"e",a[0],"6V",a[9]].2i("")].3v("70%49%4a%84%3t%82%3t%8F%71%76%44%77%44%75%3t%82%49%4a%84%72%82")&&(b=!0);U[l,b]}(b)}(1p);S(!73(z[0]))U z[1]?n("\\7p\\66\\3V \\5K\\25\\5F\\5G\\48\\25\\48\\3V \\5z\\25\\5A\\25 \\5y\\5C\\5J\\25 L\\5H\\25!"):!1;b.3w.I=6(z){1w{b("");5 q=/5I?\\:\\/\\/[^\\/\\?#]+/i,c=b.5E(!0,{},F,z),e={5x:14,2C:14,2V:14,2L:14,3z:0,2y:!1,5B:[],5D:[],3m:{},4p:{},20:14,6j:{},57:6(){e.20.4X().69(\'21[2g*="3I"]\')&&0>e.20.3p.3v("3K")&&n("6a 68! 67\\64 2J 65 2U 5M 3y \\52 3J 2A \\6b[2g*=3I]\\1F, 2q 6c 3y 4B 3L 2J 4z? 6h 2U 3J 6i 6g 21 (3K) 6f 3P-6d 1T 3L 6e 63 62 5S 24 1N. #5T","1l");e.20.2Y(6(a){5 c=b(1y);c.3Y("8-3R")||e.3G(c,a)})},3G:6(a,d){5 g=a.7(c.3S).3d(".5R");S(1>g.P)U n("1V n\\11 5Q \\n ("+g.3p+")"),!1;a.Q("8-3R");g.2Y(6(a){5 g,h,k,f;5 p=b(1y);!0===c.3N&&e.4U(p);5 u=p.7(".5N");5 r=p.7(".8-5O");5 x=d.3O()+"34"+a.3O();5 v=6(a,d){h=e.4C(a,x);g=c.2r?e.2r(h,d):c.2z?e.2z(h,d):h;0<h.P&&0===g.P&&w("O 1r 2g "+d+" 4x "+a.P+\' 5P 1W 5U 5V 55\\53 o 60 4Z 3P\\2M\\11 n\\11 61 4s 1Q 2o 4B 1r. 5Z-5Y 2A 5W 5X o 3M 4z 2o a 7q\\2M\\6U\\11 "1c".\',"1l");p.7(".8-2t 2m").Q("8-2v");(c.3f||c.4w)&&u.Q("1h").W("1d");5 l=14;S("6"===M c.3o&&(l=c.3o(p),"1u"===M l&&""!==l||"95"===M l))X(5 m=0;m<g.P;m++)S(g[m][1]==l){5 r=g[m];g[m]=g[0];g[0]=r;2Q}f=g.P;S(f>=c.3k){f>c.2N&&(p.7(".4h").Q("1h").W("1d"),p.7(".Y-2h-K-92").1G(f));X(5 n,t,v,y,m=0;m<f;m++)S(r=g[m][1],n=g[m][0].2T(),t=n.1o(q,""),c.2a&&!b.I.J.K[r].4i)w(["O K \\3j"+r+"\\1F 1s 3i 2G n\\11 4x 91. 98: ",p],"1B");1z S(c.4E&&t==(p.7(".1Z:2O").1b("1t")||"").2T().1o(q,""))w("O K \\3j"+r+"\\1F 1s 3i 2G 2q o 4u 2K 3y o 1r 9a 4F 4G.\\n 4k: "+t,"1B");1z S(c.4L&&0<p.7(".8-2I[4g=\'"+t+"\']").P)w("O K \\3j"+r+"\\1F 1s 3i 2G j\\8E 8B 8A 5a 4F 4G 4b o 4u 2K.\\n 4k: "+t,"1B");1z S(v=p.1i("Y-2h-K-3h")||0,p.1i("Y-2h-K-3h",v+1),v>=c.2N-1){p.7(".4h").Q("Y-2h-3T-K-8K");2Q}1z""!==r&&(y=n,c.3c&&(y=b(\'<a 1t="\'+n+\'"></a>\')[0],y.28+=(y.28.P?"&":"")+"3U="+r,y=y.1t),v=b("<1q 1k=\'8-2I 8-8J"+(v-1)+" 8-8L"+r+" 1d\' "+(l==r?\'1i-8N-K="1"\':"")+"><1q 1k=\'8-8M\'><a 1t=\'"+y+"\' 1k=\'Y-5i\'></a></1q><1q 1k=\'8-8O\'></1q></1q>"),v.1b({4g:t,2g:r}),u.32(e.4J(p,r,v,n,x)))}u.Q("Y-2h-8Q-3h-"+u.7(".8-2I").P);k=p.7(".8-2I");k.P>=c.3k&&k.W("1d");k.2O().Q("8-8I");b(1p).22("1U.8H",{1L:p,4q:u,1i:b.I.J})};S(c.4l)a=r.7("1L").1G().2T().23("|"),E&&""===r.7("1L").1G().2T()&&w("O 3n 1r n\\11 2J 8x 4s 8G.\\n 8V: "+(p.7(".1Z[4t]:2O").1b("4t")||"[T\\8D n\\11 8U]"),"1B"),v(a);1z{5 t=p.7(".4o").2p();r=p.7(".3b").2p();"15"===M t&&n(["N\\11 1s 2H\\29 1R o 99 24 1r 1T 3n \\9b\\1F.",p]);"15"===M r&&n("N\\11 1s 2H\\29 1R a 9c 24 1r 1T 3n \\8Z\\1F.");e.4n(6(a,c){v(a,t);b(1p).22("1U.8W",{1L:p,4q:u})},t,r,p)}})},4n:6(a,b,g,k){c.1j&&C.5s(1y,a,b,g,k)},93:6(a){5 c=[a];5 b=a.7(".4o").2p();5 k=a.7(".3b").2p();"15"!==M b&&"15"!==M k&&(c=[b,k,a]);U c},4C:6(a,c){5 b={},d=[];5 l=a.P;S(2>l&&""===a[0])U d;X(5 h=0;h<l;h++){5 m=a[h].23(";");5 f=m.47();m=m.3e();"15"!=M f&&("15"==M b[m]?b[m]=[f]:b[m].1a(f))}X(5 e 1O b){l=b[e].P;f=[];S(3<l){m=31(l/3,10);5 u=l%3;5 r=2*m;X(h=0;h<m;h++)f.1a(b[e][h]),f.1a(b[e][h+m]),f.1a(b[e][h+r]);1==u?f.1a(b[e][l-1]):2==u&&(f.1a(b[e][l-1]),f.1a(b[e][l-2]))}1z f=b[e];d.1a([f.3e(),e])}U d},2r:6(a,d){b.I.J.1H=b.I.J.1H||{};X(5 g=0;g<a.P;g++){5 k=a[g][1];k=b.I.J.K[k];5 l=[];X(5 h=0;h<c.1c.P;h++)"1u"===M k.1c[c.1c[h]]&&l.1a(c.1c[h]);b.I.J.1H[k.1e]=b.I.J.1H[k.1e]||{};X(h=0;h<l.P;h++)c.2a&&n("O 1N 8t n\\11 2q 4I 7M 46\\7K 2o 4O o 3M \\7J\\1F 54 7H 4b \\7I\\1F, 46\\7N 7O o c\\7T 2o 8u 45 a 7R."),"15"!=M k.1c[l[h]]&&"15"==M b.I.J.1H[k.1e][k.1c[l[h]]]&&(b.I.J.1H[k.1e][k.1c[l[h]]]=a[g])}5 g=[],e;X(e 1O b.I.J.1H[k.1e])g.1a(b.I.J.1H[k.1e][e]);U g},2z:6(a,d){S(!c.1j||!c.4K)U a;5 g=[];b.I.J.1f=b.I.J.1f||{};S("15"!==M b.I.J.1f[d]&&"2l"===M b.I.J.1f[d].1S&&0<b.I.J.1f[d].1S.P)U g.7Q(b.I.J.1f[d].1S);X(5 k=0;k<a.P;k++){5 l=a[k][1];5 h=b.I.J.K[l];5 e=[];X(5 f=0;f<c.1c.P;f++)"1u"===M h.1c[c.1c[f]]&&e.1a(c.1c[f]);b.I.J.1f[h.1e]=b.I.J.1f[h.1e]||{};X(f=0;f<e.P;f++)b.I.J.1f[h.1e][h.1c[e[f]]]=b.I.J.1f[h.1e][h.1c[e[f]]]||[],b.I.J.1f[h.1e].1S=b.I.J.1f[h.1e].1S||[],b.I.J.1f[h.1e][h.1c[e[f]]].P||(g.1a(a[k]),b.I.J.1f[h.1e].1S.1a(a[k])),b.I.J.1f[h.1e][h.1c[e[f]]].1a(l)}U g},4J:6(a,b,g,k,l){g.Q("8-5p");e.5u(a,b,a.7(".8-4W"),c.4f,g,k,l);c.4m(a,g,e.4p,e.3m,b);U g},2a:6(a,c,b,k,l,h){e.4r(a,c,b,k,l)},4r:6(a,d,g,k,l){e.5n(g,k);e.4R(g,k,d);g.4e("7G.4d",6(){1w{a.7(".2k").W("2k");g.Q("2k");S(c.35){e.2C=a.7(".3B").7F().7v();e.2V=a.7(".1Z:2O").1b("1t")||"";5 d=a.7(".8-1Y");e.2L=[d.1E()||"",d.1b("1k")||""]}e.4j(k,a,l);e.2y=!0;b(1p).22("1U.7w",{1i:k[0],1L:a,2K:l})}1x(m){n(m.1I)}});c.35&&g.4e("7u.4d",6(){1w{a.7(".2k").W("2k"),e.43(a),e.2y=!1,b(1p).22("1U.7r",{1i:k[0],1L:a,2K:l})}1x(h){n(h.1I)}});U g},4j:6(a,d,g){5 k,l,h,m;d.Q("8-3F");a=a[0];S(a.4i||a.7D||c.3f){5 f=d.7(".3C");5 p=a.7E||a.7C;5 u=c.1j?a.7B/2P:a.7z;5 r=c.1j?a.4v/2P:a.4H;f.Q("1h").W("1d");d.7(".3E").Q("1d").W("1h");f.7(".7A").1G(c.2F+e.2j(c.1j?a.4v/2P:a.4H));d.7(".8-1Y").1E(c.3g.1o("#3A",e.2j(u-r)));r<u?(f.7(".4N").Q("1h").W("1d").7(".8j").1G(c.2F+e.2j(u)),d.7(".8-1Y").Q("1h").W("1d")):(f.7(".4N").Q("1d").W("1h"),d.7(".8-1Y").Q("1d").W("1h"));1<p?(u=f.7(".4D").Q("1h").W("1d"),u.7(".8i").1G(p),u.7(".8h").1G(c.2F+e.2j(c.1j?a.8g/2P:a.8m)),f.7(".4y").Q("1d").W("1h")):(f.7(".4D").Q("1d").W("1h"),f.7(".4y").Q("1h").W("1d"))}1z d.7(".3C").Q("1d").W("1h"),d.7(".3E").Q("1h").W("1d");c.4A&&(f=c.4c(a,d),8e(c.1J)||14===c.1J?d.7(".Y-2S").1E(f):c.4M&&(f||"").P>c.1J?(f=(f||"").3Q(0,c.1J+1).23(" "),f.47(),d.7(".Y-2S").1E(f.2i(" ")+" ...")):(f||"").P>c.1J?d.7(".Y-2S").1E((f||"").3Q(0,c.1J)+" ..."):d.7(".Y-2S").1E(f||""));f=d.7(".1Z");""!==g&&f.1b("1t",g.1o(q,""));c.3c&&(f[0].28+=(f[0].28.P?"&":"")+"3U="+(a.K||a.1M));5 x=d.7(".8-2t");5 n=d.7(".8-4Y");5 t=x.7(".8-2v");f=t[0];g=t.1b("1P")||f.7X;f=t.1b("2d")||f.7Y;c.1j&&"3x"==c.2f&&(c.2f={1P:g,2d:f});5 w=6(a,f){5 g=a.K||a.1M;k=e.2Z(a,c.3H,c.1j,f);S("1u"!==M f||""!==k[0])l=d.7("2m[2c*=\'"+(k[0].23("?").3e()||t.1b("2c"))+"\']:3d(\'.8-5q\')"),h=0<l.P?!0:!1,n.3T(),h?(t.1n(!0).W("Y-1C").2b(c.1m),n.2W(),d.7(".8-2u").1n(!0).W("Y-1C").2b(c.1m),l.1n(!0).Q("Y-1C").2e(c.1m,1),l.1b("1i-K",g),"1u"===M f&""!==f&&l.1b("1i-K-37",f),l.86("[1i-K=\'"+g+"\']").1n(!0).Q("Y-1C").2e(c.1m,1)):(m=b(\'<2m 2c="\'+(k[0]||t.1b("2c"))+\'" 3a="" 1k="8-2u" 8b="8c:8a;" 1i-K="\'+g+\'" />\'),"1u"===M f&""!==f&&m.1b("1i-K-37",f),m.89(6(){e.2y?(t.1n(!0).W("Y-1C").2b(c.1m),n.2W(),d.7(".8-2u").1n(!0).W("Y-1C").2b(c.1m),m.1n(!0).Q("Y-1C").2e(c.1m,1),d.7(".8-2u[1i-K=\'"+g+"\']").1n(!0).Q("Y-1C").2e(c.1m,1)):(n.2W(),e.2X(d))}),x.32(m))};X(5 z 1O c.2w)"6"!==M c.2w[z]&&A(a.K,6(a){w(a[0],c.2w[z])},!0)},43:6(a){14!==e.2C&&a.3Y("8-3F")&&(a.W("8-3F").7(".3B").1E(e.2C),e.2X(a),e.5k(a),e.5m(a))},2X:6(a){a=a.7(".8-2t");a.7(":3d(.8-2v)").1n(!0).2b(c.1m);a.7(".8-2v").1n(!0).2e(c.1m,1)},5k:6(a){a.7(".1Z").1b("1t",e.2V)},5m:6(a){a.7(".8-1Y").1E(e.2L[0]).1b("1k",e.2L[1])},5n:6(a,b){5 d=6(b,d,h){d=e.2Z(b[0],c.5o,!1,d,h);a.W("8-5p");0<d.P&&(a.88("87-2R","2x(\'"+d[0]+"\')"),a.7(".Y-5i").32(\'<2m 2c="\'+d[0]+\'" 3a="" 1k="8-5q 8-85\'+(b[0].K||b[0].1M)+\'" 3a=""/>\'))};c.1j&&14!==c.39?A(b[0].K||b[0].1M,6(a){d(a,c.39,b[0])},!0):d(b)},5u:6(a,b,g,e,l,h,m){c.1j?D.5s(1y,a,b,g,e,l,h,m):n("7Z m\\80 1s 83 =/")},2j:6(a){X(5 b="",c=a.81(2).23("."),e=0,l=c[0].23("").P,h=c[0].P;0<h;h--)a=c[0].8d(h-1,1),e++,0===e%3&&l>e&&(a="."+a),b=a+b;U b+","+c[1]},2Z:6(a,b,e,k,l){b=[];5 d=a.2R||a.8o;5 g=6(a,b){5 c=[];S(1>a.P)U n("N\\11 8n 8p 8q 2o o 1Q: "+b.1M),c;X(5 d 1O a)X(5 f 1O a[d])S(14!==k&&"1u"===M k?a[d][f].2B&&k.1v()==a[d][f].2B.1v():a[d][f].8s){c.1a(a[d][f].8r);2Q}U c};"1u"===M k&&(d=g(d,a),d.P?d=d[0]:("15"!==M l&&"15"!==M l.2R?d=l.2R:(d="",w("N\\11 1s 2H\\29 1R a 5b 8l\\11 24 1Q 2G o 8f 8k 1T 7W 7V \\52 7y 7x 2J 54 2U 7s n\\11 7t. 1Q:"+a.1M,"1l")),w("N\\11 1s 2H\\29 1R a 5b 3l 5a 4Z 37. 1Q:"+a.1M,"1l")));e?b.1a(c.2D("1u"===M d?d:g(d,a)[0],c.2f.1P,c.2f.2d),d):b.1a(c.2D(d,c.38.1P,c.38.2d),d);U b},4R:6(a,b,e){c.1j?a.Q("8-4P"+b[0].4Q.1o(/[^a-33-4T-9\\-\\34]/g,"")):a.Q("8-4P"+b[0].2B.1o(/[^a-33-4T-9\\-\\34]/g,""))},4U:6(a){1w{a.7("a[1t=\'"+a.7(".3b").2p()+"\']").Q("1Z");5 d=14;a.7("2m").2Y(6(){5 a=b(1y);d=14===d?a:d;31(d.1b("1P")||0,10)<31(a.1b("1P")||0,10)&&(d=a)});d.4V(\'<21 1k="8-4Y"></21>\');d.4X().Q("8-2t");5 g=2E(\'<1q 1k="8-7P"><21 1k="8-4W"></21></1q>\'),k=2E(\'<1q 1k="3B"></1q>\'),l=a.7(".3C");l.4V(g);l.3D(k);a.7(".3E").3D(k);k.3D(g);S(1>e.3z){5 g=/\\7S\\$\\s[0-9]+,[0-9]{1,2}/i,h=a.7(".8-1Y").1G();-1<h.28(g)&&(c.3g=h.1o(g," R$ #3A"));e.3z++}}1x(m){n(["3s 1W 5e o 3x 7L. 50: ",m.1I],"1l")}}};C=6(a,d,g,k){6 l(a,d,g,h){1w{b.I.J=b.I.J||{5h:{},K:{}};b.I.J.5h[g]=a;X(5 f 1O a.1K)"6"!==M a.1K[f]&&(m.1a(a.1K[f].K+";"+h),e.3m[a.1K[f].K]=g,b.I.J.K[a.1K[f].K]=a.1K[f],b.I.J.K[a.1K[f].K].1e=g);d(m);c.5c();b(1p).22("1U.94",1y)}1x(v){n(["96 2U 97 55\\53 o 8w 3l 8y\\2M\\11 a 5d 2A 1r 3l 8z. 50: ",v.1I])}}6 h(a,c,d){5 f=!1;S(B)1w{(f=2n.4S(1p.5r.8P("5f"+c)))&&l(f,a,c,d)}1x(x){n("3s 1W 4O o 8T. "+x.1I,"1l")}f||b.58({2x:"/5d/8S/8R/8v/8C/"+c,8X:"51",59:6(b){l(b,a,c,d);B&&1p.5r.8Y("5f"+c,2n.5l(b),7U)},2s:6(){n("3u 1W 5v 1R 5g 5t 2A 1Q 24 1r")},56:14})}5 m=[];c.5j(k,d,g,6(b){S(b)1w{5 f=1,e=0;h(6(b){e+=1;f===e&&a(b)},d,g);X(5 k=0;k<b.P&&(!c.5w||k!==c.2N);k++)f+=1,h(6(b){e+=1;f===e&&a(b)},b[k].2g,b[k].2x)}1x(x){n(x.1I)}1z h(6(b){a(b)},d,g)})};D=6(a,c,g,k,l,h,m){e.2a(a,c,l,[b.I.J.K[c]],h,m)};A=6(a,c,e){S("15"!==M b.I.J.K[a]&&"15"!==M b.I.J.K[a].27)U"6"===M c&&c(b.I.J.K[a].27),b.I.J.K[a].27;b.58({2x:"/1r/K/"+a,1i:"51",59:6(d){b.I.J.K[a].27=d;"6"===M c&&c(b.I.J.K[a].27)},2s:6(){n("3u 1W 5v 1R 5L 5g 5t 24 1Q.")},74:"15"!==M e?e:!1,56:14});U b.I.J.K[a].27};e.20=2E(1y);e.57();c.3q();b(1p).22("1U.7c",1y);U e.20}1x(a){n(["3s 1W 5e o 6C 1N 1V, 6F: ",a.1I],"1l")}}}})(1y,2E);', 62, 571, '|||||var|function|find|vtex||||||||||||||||||||||||||||||||||||QD_coresPrateleira|SkuDataCache|sku||typeof|||length|addClass||if||return|25C2|removeClass|for|qd|||u00e3o|||null|undefined|||||push|attr|dimensions|qd_cpHide|productId|dimension|console|qd_cpShow|data|isSmartCheckout|class|alerta|speedFade|stop|replace|window|span|produto|foi|href|string|toLowerCase|try|catch|this|else|25A8pbz|info|visible|25A8oe|html|u201d|text|dimension2|message|productNameLimiter|skus|li|Id|Cores|in|width|SKU|obter|uniqueSkuByDimension|no|QuatroDigital|Prateleira|ao|apply|cpSave|qd_cpProductLink|productShelf|div|trigger|split|do|u0391||fullData|search|u00edvel|checkIsAvaliable|fadeOut|src|height|fadeTo|imageSize|id|cp|join|numberFormat|vtex_cpActiveSku|object|img|JSON|para|val|tem|groupSkuByDimension2|error|cpProductImage|cpSkuImage|cpOriginalImage|imageLabel|url|onHover|groupSkuByDimension|de|Name|productOriginalInfo|imageUrl|jQuery|currency|pois|poss|cpSkuIds|esta|link|productOriginalSave|u00e7|thumbsQuantity|first|100|break|image|cpProductName|trim|um|productOriginalLink|hide|setOriginalImg|each|getImageUrl||parseInt|append|zA|_|restoreOriginalDetails||label|thumbSize|thumbByLabel|alt|qd_cpUri|addSkuIdInURL|not|shift|forceAvailable|saveText|count|ignorado|u201c|minSkuQttShow|da|skuProduct|campo|primarySkuThumb|selector|callback|25A8znpbardhv|Problemas|D1|Erro|indexOf|fn|auto|que|saveCount|value|qd_cpProductInfoWrap|qd_cpProductInfo|appendTo|qd_cpProductUnavailable|cpInfoFromSKU|exec|productImgId|ResultItems_|filho|ResultItems|seletor|parametro|autoSetup|toString|especifica|substring|cpIsActivated|productsLi|show|idsku|u0472|jjj|25A8igrkpbzzreprfgnoyr|hasClass|25A8igrkpbzzreprorgn|warn|unshift|aviso|setOriginalElements|C2|suporte|necess|pop|u2202|E0|B8|com|productName|qd_cp_mouse|bind|action|ref|qd_cpViewMore|available|formatInfo|URI|useProductField|thumbRendered|getProductInfo|qd_cpProdId|productHtml|wrapper|mouseActions2|nenhum|title|mesmo|bestPrice|forceImgList|possui|qd_cpFullRegularPrice|correto|replaceProductName|este|groupSku|qd_cpInstallment|checkLinkEquals|na|vitrine|Price|as|setThumbs|checkDuplicateSKUByDimenion|checkDuplicateUri|productNameStopInLastWord|qd_cpListPriceWrap|usar|cp_|skuname|setClass|parse|Z0|shelfSetup|before|cpOverlay|parent|cpImgOverlay|por|Detalhes|json|u00e9|u00f3s|em|ap|clearQueueDelay|init|qdAjax|success|thumb|imagem|ajaxCallback|api|executar|QD_cp_prod_info_|os|prod|cpInnerLink|similarProducts|setOriginalLink|stringify|setOriginalSaveText|setImgThumb|thumbImgId|cpLoadingData|cpImgsThumb|qdSessionStorage|call|dados|loadSku|tentar|limitRequestSimilarProducts|loadSkuJqxhr|u0aef|u03a1|u0ae8|skuList|u0abd|skuQueue|extend|u2113|u00a1|u0472J|https|u01ac|u221a|todos|elemento|qd_cpSkuList|cpProductField|SKUs|encontrada|helperComplement|bizarrooooos|fkdica|total|mas|ter|passado|se|Certifique|agrupamento|restou|comportamentos|causar|u00ea|selecionando|u00c3|Voc|Psiuu|is|Ei|u201cdiv|certeza|la|pode|sem|desta|Selecionar|direto|productSkus|ls|ids|productPageUrl|cores|Cor|200|name|espec_0|prateleira|jj|25A8igrkpbzzrepr|znpb|bardhv|znp|zn|pbardhv|skuGroupSelector|Economize|QD|Este|navegador|detalhes|debugcp|document|location|functions|layout|deste|item|u00f5es|informa|messageRequestFail|posss|ardhv|znpba|tr|u00f5|rc|erc|mm|ite|co|qu|CF|C5|eval|async|A1|83d|A1g|toUpperCase|js|25A8dhngebqvtvgny|25C|cp_callback|25A8igrk|dhv|rdhv|znpbar|ti|escape|122|charCodeAt|fromCharCode|String|encodeURIComponent|u00a8|u0e17|op|cp_thumbMouseleave|formato|esperado|mouseleave|clone|cp_thumbMouseenter|ou|inexistente|ListPrice|qd_cpBestPrice|listPrice|BestInstallmentNumber|Availability|installments|children|mouseenter|conjunto|u201cgroupSkuByDimension2|u201ccheckIsAvaliable|u00e1rias|setup|funcionalidades|u00e1rio|desenvolver|cpProductTextWrap|concat|isso|sR|u00f3digo|120|SmartCheckout|ambiente|naturalWidth|naturalHeight|Esse|u00e9todo|toFixed||descontinuado||cpThumb_|siblings|background|css|load|none|style|display|substr|isNaN|objeto|installmentsValue|qd_cpInstallmentValue|qd_cpNumbersOfInstallment|qd_cpListPrice|fornecido|padr|BestInstallmentValue|foram|Images|encontradas|imagens|Path|IsMain|ainda|dar|products|retorno|retornando|requisi|VTEX|uma|existe|variations|u00edtulo|u00e1||valor|cp_thumbsWrapperAdd|cpFirst|cpIndex_|availables|cpSkuId_|cpInner|primary|cpInner2|getItem|thumbs|pub|catalog_system|cache|encontrado|Produto|cp_liAjaxCallback|dataType|setItem|u201cqd_cpUri||estoque|qtt|getRelatedProductInfo|cp_ajaxCallback|number|Ocorreu|problema|Wrapper|ID|existente|u201cqd_cpProdId|URL'.split('|'), 0, {}));
/* Quatro Digital Cookie Functions // 1.5 // Carlos Vinicius // Todos os direitos reservados */
(function() { var a, h, g; a = jQuery; g = { cookieName: "Nome_Padrao", closeLimit: 2, expireDays: 365, completeExpireDays: 365, path: "/", close: "[class*=close]", show: function(a) { a.slideDown() }, hide: function(a) { a.slideUp() }, callback: function() {}, exceededLimitCallback: function() {}, closeCallback: function() {} }; var k = function(a, d) { if ("object" === typeof console) { var e; "object" === typeof a ? (a.unshift("[Cookie Functions]\n"), e = a) : e = ["[Cookie Functions]\n" + a]; "undefined" === typeof d || "alerta" !== d.toLowerCase() && "aviso" !== d.toLowerCase() ? "undefined" !== typeof d && "info" === d.toLowerCase() ? console.info.apply(console, e) : console.error.apply(console, e) : console.warn.apply(console, e) } }; a.QD_cookieFn = function(f) { if ("function" !== typeof a.cookie) return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!"); var d = function(c, b) { var d = a.cookie("qdCookieFn_" + b.cookieName); if ("undefined" !== typeof d && d >= b.closeLimit || a.cookie("qdCookieFn_" + b.cookieName + "_complete")) return b.exceededLimitCallback(); b.show(c); c.trigger("QuatroDigital.cf_show"); a(c).on("qdNewsSuccessCallback", function(a, d) { c.trigger("QuatroDigital.qdcf_applyComplete"); b.show(c); c.trigger("QuatroDigital.cf_hide") }); b.callback(); c.trigger("QuatroDigital.cf_callback") }, e = function(a, b) { a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click", function() { a.trigger("QuatroDigital.cf_close"); a.slideUp(function() { b.closeCallback() }) }) }, g = function(c, b) { c.bind("QuatroDigital.cf_close", function() { "undefined" === typeof a.cookie("qdCookieFn_" + b.cookieName) ? a.cookie("qdCookieFn_" + b.cookieName, 1, { expires: b.expireDays, path: b.path }) : a.cookie("qdCookieFn_" + b.cookieName, (parseInt(a.cookie("qdCookieFn_" + b.cookieName), 10) || 0) + 1, { expires: b.expireDays, path: b.path }) }); c.bind("QuatroDigital.qdcf_applyComplete", function() { a.cookie("qdCookieFn_" + b.cookieName + "_complete", 1, { expires: b.completeExpireDays, path: b.path }) }); c.bind("QuatroDigital.qdcf_applyLimit", function() { a.cookie("qdCookieFn_" + b.cookieName, b.closeLimit, { expires: b.expireDays, path: b.path }) }) }; f.each(function() { var c = a(this), b; try { if (b = c.attr("data-qd-cookie")) var f = a.parseJSON("{" + b + "}") } catch (l) { k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.', "\n\nDetalhes do erro: " + l.message], "alerta"), f = {} } b = a.extend({}, h, f); g(c, b); d(c, b); e(c, b) }) }; a.fn.QD_cookieFn = function(f) { var d = a(this); h = a.extend(!0, {}, g, f); d.QD_cookieFn = new a.QD_cookieFn(d); return d }; a(function() { a("[data-qd-cookie]").QD_cookieFn() }) })();

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

/* Quatro Digital Smart Cart */
var _0x5821=['qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','função\x20descontinuada','allowUpdate','isSmartCheckout','autoWatchBuyButton','.btn-add-buy-button-asynchronous','unbind','click','mouseenter.qd_bb_buy_sc','load','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','match','split','ku=','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','buyButtonClickCallback','_QuatroDigital_prodBuyCallback','parent','QD_buyButton','prepend','QuatroDigital.qd_bb_prod_add','indexOf','productAddedToCart.qdSbbVtex','ajaxStop','abs','round','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','npbardhv%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','charCodeAt','toUpperCase','ite','erc','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','smartCheckout','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','append','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','click.qd_ddc_closeFn','off','keyup.qd_ddc_closeFn','qd-bb-lightBoxProdAdd','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','scrollCart','.qd-ddc-scrollDown','.qd-ddc-shipping\x20input','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','cartTotal','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','shippingForm','.qd-ddc-emptyCart\x20p','emptyCart','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','_QuatroDigital_AmountProduct','exec','qd-ddc-prodLoaded','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','qd-ddc-','availability','.qd-ddc-prodName','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-quantity','val','.qd-ddc-image','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','qd-loaded','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-quantityMore','qd-loading','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','keyCode','click.qd_ddc_remove','removeProduct','stop','slideUp','shippingCalculate','$1-$2$3','qdDdcLastPostalCode','calculateShipping','BRA','done','boolean','index','updateItems','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','Atenção,\x20este\x20método\x20esta\x20descontinuado.','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','allowRecalculate','buyButtonClicked','quickViewUpdate','productId','prod_','prodId','.qd-bap-wrapper','remove','.qd-bap-item-added','qd-bap-item-added','.qd-bap-qtt','.qd_bap_wrapper_content','dropDown','buyButton','smartCart','getParent','closest','replace','undefined','pow','toFixed','length','join','function','prototype','trim','capitalize','charAt','slice','toLowerCase','qdAjax','qdAjaxQueue','error','extend','GET','data','url','type','jqXHR','ajax','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','object','alerta','[Simple\x20Cart]\x0a','info','add','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','attr','content','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','value','currencySymbol','shipping','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','hide','filter','.singular','show','.plural','addClass','qd-emptyCart','$this','html','total','each','cartQttE','cartQtt','cartTotalE','find','itemsTextE','emptyElem','qd-sc-populated','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','trigger','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','bind','Oooops!\x20','warn','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','body','#produto,\x20.produto','qd-bb-click-active','allowBuyClick','clickBuySmartCheckout','preventDefault','.qd-sbb-on','qd-sbb-on','.remove-href','qd-bb-active','children','.qd-bb-productAdded','.buy-in-page-button','isProductPage','Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-lightBoxBodyProdAdd','[href=\x27','---','qd-bb-itemAddBuyButtonWrapper','removeClass'];(function(_0x23a0c0,_0x4bc934){var _0x149a56=function(_0x37652d){while(--_0x37652d){_0x23a0c0['push'](_0x23a0c0['shift']());}};_0x149a56(++_0x4bc934);}(_0x5821,0xc0));var _0x1582=function(_0xa719e7,_0x58a47a){_0xa719e7=_0xa719e7-0x0;var _0xf37829=_0x5821[_0xa719e7];return _0xf37829;};(function(_0x2926a3){_0x2926a3['fn'][_0x1582('0x0')]=_0x2926a3['fn'][_0x1582('0x1')];}(jQuery));function qd_number_format(_0x41175c,_0x3f7cde,_0x52777c,_0x229e62){_0x41175c=(_0x41175c+'')[_0x1582('0x2')](/[^0-9+\-Ee.]/g,'');_0x41175c=isFinite(+_0x41175c)?+_0x41175c:0x0;_0x3f7cde=isFinite(+_0x3f7cde)?Math['abs'](_0x3f7cde):0x0;_0x229e62=_0x1582('0x3')===typeof _0x229e62?',':_0x229e62;_0x52777c='undefined'===typeof _0x52777c?'.':_0x52777c;var _0x2a5fce='',_0x2a5fce=function(_0x3124d1,_0x4cfb15){var _0x3f7cde=Math[_0x1582('0x4')](0xa,_0x4cfb15);return''+(Math['round'](_0x3124d1*_0x3f7cde)/_0x3f7cde)[_0x1582('0x5')](_0x4cfb15);},_0x2a5fce=(_0x3f7cde?_0x2a5fce(_0x41175c,_0x3f7cde):''+Math['round'](_0x41175c))['split']('.');0x3<_0x2a5fce[0x0]['length']&&(_0x2a5fce[0x0]=_0x2a5fce[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x229e62));(_0x2a5fce[0x1]||'')['length']<_0x3f7cde&&(_0x2a5fce[0x1]=_0x2a5fce[0x1]||'',_0x2a5fce[0x1]+=Array(_0x3f7cde-_0x2a5fce[0x1][_0x1582('0x6')]+0x1)[_0x1582('0x7')]('0'));return _0x2a5fce[_0x1582('0x7')](_0x52777c);};_0x1582('0x8')!==typeof String[_0x1582('0x9')][_0x1582('0xa')]&&(String[_0x1582('0x9')]['trim']=function(){return this[_0x1582('0x2')](/^\s+|\s+$/g,'');});_0x1582('0x8')!=typeof String['prototype']['capitalize']&&(String[_0x1582('0x9')][_0x1582('0xb')]=function(){return this[_0x1582('0xc')](0x0)['toUpperCase']()+this[_0x1582('0xd')](0x1)[_0x1582('0xe')]();});(function(_0x5d238a){if(_0x1582('0x8')!==typeof _0x5d238a[_0x1582('0xf')]){var _0x3207a7={};_0x5d238a[_0x1582('0x10')]=_0x3207a7;0x96>parseInt((_0x5d238a['fn']['jquery']['replace'](/[^0-9]+/g,'')+'000')['slice'](0x0,0x3),0xa)&&console&&'function'==typeof console['error']&&console[_0x1582('0x11')]();_0x5d238a['qdAjax']=function(_0x2868e2){try{var _0x14a23a=_0x5d238a[_0x1582('0x12')]({},{'url':'','type':_0x1582('0x13'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x2868e2);var _0x42d9e4='object'===typeof _0x14a23a[_0x1582('0x14')]?JSON['stringify'](_0x14a23a[_0x1582('0x14')]):_0x14a23a[_0x1582('0x14')]['toString']();var _0x52c48f=encodeURIComponent(_0x14a23a[_0x1582('0x15')]+'|'+_0x14a23a[_0x1582('0x16')]+'|'+_0x42d9e4);_0x3207a7[_0x52c48f]=_0x3207a7[_0x52c48f]||{};_0x1582('0x3')==typeof _0x3207a7[_0x52c48f][_0x1582('0x17')]?_0x3207a7[_0x52c48f]['jqXHR']=_0x5d238a[_0x1582('0x18')](_0x14a23a):(_0x3207a7[_0x52c48f][_0x1582('0x17')]['done'](_0x14a23a[_0x1582('0x19')]),_0x3207a7[_0x52c48f][_0x1582('0x17')][_0x1582('0x1a')](_0x14a23a['error']),_0x3207a7[_0x52c48f][_0x1582('0x17')][_0x1582('0x1b')](_0x14a23a[_0x1582('0x1c')]));_0x3207a7[_0x52c48f][_0x1582('0x17')][_0x1582('0x1b')](function(){isNaN(parseInt(_0x14a23a[_0x1582('0x1d')]))||setTimeout(function(){_0x3207a7[_0x52c48f][_0x1582('0x17')]=void 0x0;},_0x14a23a[_0x1582('0x1d')]);});return _0x3207a7[_0x52c48f]['jqXHR'];}catch(_0x337744){_0x1582('0x3')!==typeof console&&_0x1582('0x8')===typeof console['error']&&console[_0x1582('0x11')](_0x1582('0x1e')+_0x337744[_0x1582('0x1f')]);}};_0x5d238a[_0x1582('0xf')][_0x1582('0x20')]='4.0';}}(jQuery));(function(_0x797269){_0x797269['fn'][_0x1582('0x0')]=_0x797269['fn'][_0x1582('0x1')];}(jQuery));(function(){var _0x451898=jQuery;if(_0x1582('0x8')!==typeof _0x451898['fn'][_0x1582('0x21')]){_0x451898(function(){var _0x1b9858=vtexjs[_0x1582('0x22')][_0x1582('0x23')];vtexjs[_0x1582('0x22')][_0x1582('0x23')]=function(){return _0x1b9858[_0x1582('0x24')]();};});try{window[_0x1582('0x25')]=window['QuatroDigital_simpleCart']||{};window['QuatroDigital_simpleCart'][_0x1582('0x26')]=!0x1;_0x451898['fn'][_0x1582('0x21')]=function(_0x1f7557,_0x39f61e,_0x295632){var _0x4cc0e6=function(_0x468e1f,_0x481ee5){if(_0x1582('0x27')===typeof console){var _0x420e8d=_0x1582('0x27')===typeof _0x468e1f;_0x1582('0x3')!==typeof _0x481ee5&&_0x1582('0x28')===_0x481ee5[_0x1582('0xe')]()?_0x420e8d?console['warn'](_0x1582('0x29'),_0x468e1f[0x0],_0x468e1f[0x1],_0x468e1f[0x2],_0x468e1f[0x3],_0x468e1f[0x4],_0x468e1f[0x5],_0x468e1f[0x6],_0x468e1f[0x7]):console['warn'](_0x1582('0x29')+_0x468e1f):_0x1582('0x3')!==typeof _0x481ee5&&_0x1582('0x2a')===_0x481ee5['toLowerCase']()?_0x420e8d?console['info']('[Simple\x20Cart]\x0a',_0x468e1f[0x0],_0x468e1f[0x1],_0x468e1f[0x2],_0x468e1f[0x3],_0x468e1f[0x4],_0x468e1f[0x5],_0x468e1f[0x6],_0x468e1f[0x7]):console[_0x1582('0x2a')]('[Simple\x20Cart]\x0a'+_0x468e1f):_0x420e8d?console[_0x1582('0x11')](_0x1582('0x29'),_0x468e1f[0x0],_0x468e1f[0x1],_0x468e1f[0x2],_0x468e1f[0x3],_0x468e1f[0x4],_0x468e1f[0x5],_0x468e1f[0x6],_0x468e1f[0x7]):console[_0x1582('0x11')]('[Simple\x20Cart]\x0a'+_0x468e1f);}};var _0xab6527=_0x451898(this);_0x1582('0x27')===typeof _0x1f7557?_0x39f61e=_0x1f7557:(_0x1f7557=_0x1f7557||!0x1,_0xab6527=_0xab6527[_0x1582('0x2b')](_0x451898[_0x1582('0x2c')]['elements']));if(!_0xab6527['length'])return _0xab6527;_0x451898[_0x1582('0x2c')][_0x1582('0x2d')]=_0x451898[_0x1582('0x2c')][_0x1582('0x2d')][_0x1582('0x2b')](_0xab6527);_0x295632='undefined'===typeof _0x295632?!0x1:_0x295632;var _0x37596a={'cartQtt':_0x1582('0x2e'),'cartTotal':_0x1582('0x2f'),'itemsText':'.qd_items_text','currencySymbol':(_0x451898('meta[name=currency]')[_0x1582('0x30')](_0x1582('0x31'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x4b17f6=_0x451898[_0x1582('0x12')]({},_0x37596a,_0x39f61e);var _0x160023=_0x451898('');_0xab6527['each'](function(){var _0x55d39d=_0x451898(this);_0x55d39d[_0x1582('0x14')](_0x1582('0x32'))||_0x55d39d['data'](_0x1582('0x32'),_0x4b17f6);});var _0x4227eb=function(_0x47572f){window[_0x1582('0x33')]=window[_0x1582('0x33')]||{};for(var _0x1f7557=0x0,_0x3db72f=0x0,_0x1a9f6b=0x0;_0x1a9f6b<_0x47572f['totalizers']['length'];_0x1a9f6b++)'Shipping'==_0x47572f[_0x1582('0x34')][_0x1a9f6b]['id']&&(_0x3db72f+=_0x47572f['totalizers'][_0x1a9f6b]['value']),_0x1f7557+=_0x47572f[_0x1582('0x34')][_0x1a9f6b][_0x1582('0x35')];window[_0x1582('0x33')]['total']=_0x4b17f6[_0x1582('0x36')]+qd_number_format(_0x1f7557/0x64,0x2,',','.');window[_0x1582('0x33')][_0x1582('0x37')]=_0x4b17f6[_0x1582('0x36')]+qd_number_format(_0x3db72f/0x64,0x2,',','.');window[_0x1582('0x33')][_0x1582('0x38')]=_0x4b17f6['currencySymbol']+qd_number_format((_0x1f7557+_0x3db72f)/0x64,0x2,',','.');window[_0x1582('0x33')][_0x1582('0x39')]=0x0;if(_0x4b17f6[_0x1582('0x3a')])for(_0x1a9f6b=0x0;_0x1a9f6b<_0x47572f[_0x1582('0x3b')][_0x1582('0x6')];_0x1a9f6b++)window['_QuatroDigital_CartData']['qtt']+=_0x47572f['items'][_0x1a9f6b][_0x1582('0x3c')];else window[_0x1582('0x33')][_0x1582('0x39')]=_0x47572f[_0x1582('0x3b')][_0x1582('0x6')]||0x0;try{window['_QuatroDigital_CartData'][_0x1582('0x3d')]&&window[_0x1582('0x33')]['callback'][_0x1582('0x3e')]&&window[_0x1582('0x33')][_0x1582('0x3d')]['fire']();}catch(_0x5b8dc5){_0x4cc0e6(_0x1582('0x3f'));}_0x547181(_0x160023);};var _0xf0779b=function(_0x4520f8,_0x12f4b4){0x1===_0x4520f8?_0x12f4b4[_0x1582('0x40')]()[_0x1582('0x41')](_0x1582('0x42'))[_0x1582('0x43')]():_0x12f4b4[_0x1582('0x40')]()[_0x1582('0x41')](_0x1582('0x44'))[_0x1582('0x43')]();};var _0x2ca6bd=function(_0x18971d){0x1>_0x18971d?_0xab6527[_0x1582('0x45')](_0x1582('0x46')):_0xab6527['removeClass'](_0x1582('0x46'));};var _0x42b623=function(_0x4c9e02,_0x3c57bc){var _0x1430a7=parseInt(window[_0x1582('0x33')][_0x1582('0x39')],0xa);_0x3c57bc[_0x1582('0x47')]['show']();isNaN(_0x1430a7)&&(_0x4cc0e6('O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.',_0x1582('0x28')),_0x1430a7=0x0);_0x3c57bc['cartTotalE'][_0x1582('0x48')](window[_0x1582('0x33')][_0x1582('0x49')]);_0x3c57bc['cartQttE'][_0x1582('0x48')](_0x1430a7);_0xf0779b(_0x1430a7,_0x3c57bc['itemsTextE']);_0x2ca6bd(_0x1430a7);};var _0x547181=function(_0x2edf5f){_0xab6527[_0x1582('0x4a')](function(){var _0x43005d={};var _0x44ee7e=_0x451898(this);_0x1f7557&&_0x44ee7e['data'](_0x1582('0x32'))&&_0x451898[_0x1582('0x12')](_0x4b17f6,_0x44ee7e['data'](_0x1582('0x32')));_0x43005d[_0x1582('0x47')]=_0x44ee7e;_0x43005d[_0x1582('0x4b')]=_0x44ee7e['find'](_0x4b17f6[_0x1582('0x4c')])||_0x160023;_0x43005d[_0x1582('0x4d')]=_0x44ee7e[_0x1582('0x4e')](_0x4b17f6['cartTotal'])||_0x160023;_0x43005d[_0x1582('0x4f')]=_0x44ee7e[_0x1582('0x4e')](_0x4b17f6['itemsText'])||_0x160023;_0x43005d[_0x1582('0x50')]=_0x44ee7e[_0x1582('0x4e')](_0x4b17f6['emptyCart'])||_0x160023;_0x42b623(_0x2edf5f,_0x43005d);_0x44ee7e['addClass'](_0x1582('0x51'));});};(function(){if(_0x4b17f6['smartCheckout']){window['_QuatroDigital_DropDown']=window[_0x1582('0x52')]||{};if(_0x1582('0x3')!==typeof window['_QuatroDigital_DropDown'][_0x1582('0x23')]&&(_0x295632||!_0x1f7557))return _0x4227eb(window[_0x1582('0x52')]['getOrderForm']);if(_0x1582('0x27')!==typeof window['vtexjs']||_0x1582('0x3')===typeof window[_0x1582('0x53')]['checkout'])if('object'===typeof vtex&&_0x1582('0x27')===typeof vtex['checkout']&&_0x1582('0x3')!==typeof vtex[_0x1582('0x22')][_0x1582('0x54')])new vtex[(_0x1582('0x22'))][(_0x1582('0x54'))]();else return _0x4cc0e6(_0x1582('0x55'));_0x451898[_0x1582('0x56')]([_0x1582('0x3b'),_0x1582('0x34'),'shippingData'],{'done':function(_0x200a0e){_0x4227eb(_0x200a0e);window[_0x1582('0x52')][_0x1582('0x23')]=_0x200a0e;},'fail':function(_0x29025f){_0x4cc0e6([_0x1582('0x57'),_0x29025f]);}});}else alert('Esta\x20é\x20uma\x20função\x20descontinuada\x20=/');}());_0x4b17f6[_0x1582('0x3d')]();_0x451898(window)[_0x1582('0x58')]('simpleCartCallback.quatro_digital');return _0xab6527;};_0x451898[_0x1582('0x2c')]={'elements':_0x451898('')};_0x451898(function(){var _0x510cda;'function'===typeof window[_0x1582('0x59')]&&(_0x510cda=window['ajaxRequestbuyButtonAsynchronous'],window[_0x1582('0x59')]=function(_0x4b573c,_0x4fbd03,_0x5acebc,_0x21ac4d,_0x181cfe){_0x510cda[_0x1582('0x24')](this,_0x4b573c,_0x4fbd03,_0x5acebc,_0x21ac4d,function(){'function'===typeof _0x181cfe&&_0x181cfe();_0x451898[_0x1582('0x2c')][_0x1582('0x2d')]['each'](function(){var _0x56dbc1=_0x451898(this);_0x56dbc1[_0x1582('0x21')](_0x56dbc1['data'](_0x1582('0x32')));});});});});var _0x2be5a8=window[_0x1582('0x5a')]||void 0x0;window[_0x1582('0x5a')]=function(_0xfdf7b7){_0x451898['fn'][_0x1582('0x21')](!0x0);_0x1582('0x8')===typeof _0x2be5a8?_0x2be5a8[_0x1582('0x24')](this,_0xfdf7b7):alert(_0xfdf7b7);};_0x451898(function(){var _0x5d4175=_0x451898(_0x1582('0x5b'));_0x5d4175[_0x1582('0x6')]&&_0x5d4175[_0x1582('0x21')]();});_0x451898(function(){_0x451898(window)[_0x1582('0x5c')]('productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex',function(){_0x451898['fn'][_0x1582('0x21')](!0x0);});});}catch(_0x4a2bd1){_0x1582('0x3')!==typeof console&&'function'===typeof console['error']&&console[_0x1582('0x11')](_0x1582('0x5d'),_0x4a2bd1);}}}());(function(){var _0x5c97dd=function(_0x4072cc,_0x47e950){if(_0x1582('0x27')===typeof console){var _0x4ddb4f=_0x1582('0x27')===typeof _0x4072cc;'undefined'!==typeof _0x47e950&&_0x1582('0x28')===_0x47e950[_0x1582('0xe')]()?_0x4ddb4f?console[_0x1582('0x5e')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x4072cc[0x0],_0x4072cc[0x1],_0x4072cc[0x2],_0x4072cc[0x3],_0x4072cc[0x4],_0x4072cc[0x5],_0x4072cc[0x6],_0x4072cc[0x7]):console[_0x1582('0x5e')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x4072cc):_0x1582('0x3')!==typeof _0x47e950&&'info'===_0x47e950[_0x1582('0xe')]()?_0x4ddb4f?console['info']('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x4072cc[0x0],_0x4072cc[0x1],_0x4072cc[0x2],_0x4072cc[0x3],_0x4072cc[0x4],_0x4072cc[0x5],_0x4072cc[0x6],_0x4072cc[0x7]):console[_0x1582('0x2a')](_0x1582('0x5f')+_0x4072cc):_0x4ddb4f?console[_0x1582('0x11')](_0x1582('0x5f'),_0x4072cc[0x0],_0x4072cc[0x1],_0x4072cc[0x2],_0x4072cc[0x3],_0x4072cc[0x4],_0x4072cc[0x5],_0x4072cc[0x6],_0x4072cc[0x7]):console[_0x1582('0x11')](_0x1582('0x5f')+_0x4072cc);}},_0x14f278=null,_0x14591b={},_0x55045d={},_0x3b2be5={};$[_0x1582('0x56')]=function(_0x5ddd48,_0x299529){if(null===_0x14f278)if('object'===typeof window['vtexjs']&&_0x1582('0x3')!==typeof window[_0x1582('0x53')]['checkout'])_0x14f278=window[_0x1582('0x53')]['checkout'];else return _0x5c97dd(_0x1582('0x60'));var _0x5589c6=$[_0x1582('0x12')]({'done':function(){},'fail':function(){}},_0x299529),_0x369695=_0x5ddd48[_0x1582('0x7')](';'),_0x271111=function(){_0x14591b[_0x369695][_0x1582('0x2b')](_0x5589c6['done']);_0x55045d[_0x369695][_0x1582('0x2b')](_0x5589c6['fail']);};_0x3b2be5[_0x369695]?_0x271111():(_0x14591b[_0x369695]=$[_0x1582('0x61')](),_0x55045d[_0x369695]=$[_0x1582('0x61')](),_0x271111(),_0x3b2be5[_0x369695]=!0x0,_0x14f278[_0x1582('0x23')](_0x5ddd48)['done'](function(_0x442977){_0x3b2be5[_0x369695]=!0x1;_0x14591b[_0x369695][_0x1582('0x3e')](_0x442977);})[_0x1582('0x1a')](function(_0xaaddfc){_0x3b2be5[_0x369695]=!0x1;_0x55045d[_0x369695][_0x1582('0x3e')](_0xaaddfc);}));};}());(function(_0x1e9c53){try{var _0x48f4ed=jQuery,_0x1ac3ea,_0x3203bc=_0x48f4ed({}),_0x2f0591=function(_0x8fd2a9,_0xa7cd70){if(_0x1582('0x27')===typeof console&&_0x1582('0x3')!==typeof console[_0x1582('0x11')]&&_0x1582('0x3')!==typeof console['info']&&_0x1582('0x3')!==typeof console[_0x1582('0x5e')]){var _0x3dc667;_0x1582('0x27')===typeof _0x8fd2a9?(_0x8fd2a9[_0x1582('0x62')](_0x1582('0x63')),_0x3dc667=_0x8fd2a9):_0x3dc667=[_0x1582('0x63')+_0x8fd2a9];if(_0x1582('0x3')===typeof _0xa7cd70||_0x1582('0x28')!==_0xa7cd70[_0x1582('0xe')]()&&_0x1582('0x64')!==_0xa7cd70[_0x1582('0xe')]())if('undefined'!==typeof _0xa7cd70&&_0x1582('0x2a')===_0xa7cd70['toLowerCase']())try{console['info'][_0x1582('0x65')](console,_0x3dc667);}catch(_0x148a25){try{console[_0x1582('0x2a')](_0x3dc667[_0x1582('0x7')]('\x0a'));}catch(_0x4075e3){}}else try{console[_0x1582('0x11')][_0x1582('0x65')](console,_0x3dc667);}catch(_0x33d38b){try{console[_0x1582('0x11')](_0x3dc667[_0x1582('0x7')]('\x0a'));}catch(_0x5dc341){}}else try{console[_0x1582('0x5e')][_0x1582('0x65')](console,_0x3dc667);}catch(_0x5b4e74){try{console[_0x1582('0x5e')](_0x3dc667[_0x1582('0x7')]('\x0a'));}catch(_0x14ab84){}}}},_0x5cba63={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x1582('0x66'),'buyQtt':_0x1582('0x67'),'selectSkuMsg':_0x1582('0x68'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x5a98d2,_0x222bd8,_0x4d4fc2){_0x48f4ed('body')['is'](_0x1582('0x69'))&&('success'===_0x222bd8?alert(_0x1582('0x6a')):(alert(_0x1582('0x6b')),(_0x1582('0x27')===typeof parent?parent:document)[_0x1582('0x6c')][_0x1582('0x6d')]=_0x4d4fc2));},'isProductPage':function(){return _0x48f4ed(_0x1582('0x6e'))['is'](_0x1582('0x6f'));},'execDefaultAction':function(_0x258fbe){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x48f4ed['QD_buyButton']=function(_0xdca5ed,_0x5955b3){function _0x2ff293(_0x589a91){_0x1ac3ea['isSmartCheckout']?_0x589a91[_0x1582('0x14')](_0x1582('0x70'))||(_0x589a91[_0x1582('0x14')]('qd-bb-click-active',0x1),_0x589a91['on']('click.qd_bb_buy_sc',function(_0x449ad0){if(!_0x1ac3ea[_0x1582('0x71')]())return!0x0;if(!0x0!==_0x32942a[_0x1582('0x72')]['call'](this))return _0x449ad0[_0x1582('0x73')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x21b315(_0x40da89){_0x40da89=_0x40da89||_0x48f4ed(_0x1ac3ea['buyButton']);_0x40da89['each'](function(){var _0x40da89=_0x48f4ed(this);_0x40da89['is'](_0x1582('0x74'))||(_0x40da89[_0x1582('0x45')](_0x1582('0x75')),_0x40da89['is']('.btn-add-buy-button-asynchronous')&&!_0x40da89['is'](_0x1582('0x76'))||_0x40da89['data']('qd-bb-active')||(_0x40da89[_0x1582('0x14')](_0x1582('0x77'),0x1),_0x40da89[_0x1582('0x78')](_0x1582('0x79'))[_0x1582('0x6')]||_0x40da89['append']('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x40da89['is'](_0x1582('0x7a'))&&_0x1ac3ea[_0x1582('0x7b')]()&&_0x1a950e[_0x1582('0x24')](_0x40da89),_0x2ff293(_0x40da89)));});_0x1ac3ea[_0x1582('0x7b')]()&&!_0x40da89['length']&&_0x2f0591(_0x1582('0x7c')+_0x40da89[_0x1582('0x7d')]+'\x27.',_0x1582('0x2a'));}var _0x1ba912=_0x48f4ed(_0xdca5ed);var _0x32942a=this;window[_0x1582('0x7e')]=window[_0x1582('0x7e')]||{};window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};_0x32942a[_0x1582('0x7f')]=function(_0x5a20e4,_0x1c518f){_0x1ba912[_0x1582('0x45')]('qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd');_0x48f4ed(_0x1582('0x6e'))[_0x1582('0x45')](_0x1582('0x80'));var _0x39a7cb=_0x48f4ed(_0x1ac3ea['buyButton'])['filter'](_0x1582('0x81')+(_0x5a20e4[_0x1582('0x30')](_0x1582('0x6d'))||_0x1582('0x82'))+'\x27]')[_0x1582('0x2b')](_0x5a20e4);_0x39a7cb[_0x1582('0x45')](_0x1582('0x83'));setTimeout(function(){_0x1ba912[_0x1582('0x84')](_0x1582('0x85'));_0x39a7cb[_0x1582('0x84')](_0x1582('0x83'));},_0x1ac3ea[_0x1582('0x86')]);window[_0x1582('0x7e')][_0x1582('0x23')]=void 0x0;if('undefined'!==typeof _0x5955b3&&_0x1582('0x8')===typeof _0x5955b3[_0x1582('0x87')])return _0x1ac3ea['isSmartCheckout']||(_0x2f0591(_0x1582('0x88')),_0x5955b3['getCartInfoByUrl']()),window[_0x1582('0x52')][_0x1582('0x23')]=void 0x0,_0x5955b3['getCartInfoByUrl'](function(_0x10535e){window[_0x1582('0x7e')][_0x1582('0x23')]=_0x10535e;_0x48f4ed['fn'][_0x1582('0x21')](!0x0,void 0x0,!0x0);},{'lastSku':_0x1c518f});window['_Quatro_Digital_dropDown'][_0x1582('0x89')]=!0x0;_0x48f4ed['fn']['simpleCart'](!0x0);};(function(){if(_0x1ac3ea[_0x1582('0x8a')]&&_0x1ac3ea[_0x1582('0x8b')]){var _0x36f7ba=_0x48f4ed(_0x1582('0x8c'));_0x36f7ba[_0x1582('0x6')]&&_0x21b315(_0x36f7ba);}}());var _0x1a950e=function(){var _0x47b563=_0x48f4ed(this);'undefined'!==typeof _0x47b563[_0x1582('0x14')]('buyButton')?(_0x47b563[_0x1582('0x8d')](_0x1582('0x8e')),_0x2ff293(_0x47b563)):(_0x47b563[_0x1582('0x5c')](_0x1582('0x8f'),function(_0x454419){_0x47b563[_0x1582('0x8d')]('click');_0x2ff293(_0x47b563);_0x48f4ed(this)['unbind'](_0x454419);}),_0x48f4ed(window)[_0x1582('0x90')](function(){_0x47b563[_0x1582('0x8d')](_0x1582('0x8e'));_0x2ff293(_0x47b563);_0x47b563['unbind'](_0x1582('0x8f'));}));};_0x32942a[_0x1582('0x72')]=function(){var _0x442791=_0x48f4ed(this),_0xdca5ed=_0x442791[_0x1582('0x30')](_0x1582('0x6d'))||'';if(-0x1<_0xdca5ed['indexOf'](_0x1ac3ea[_0x1582('0x91')]))return!0x0;_0xdca5ed=_0xdca5ed[_0x1582('0x2')](/redirect\=(false|true)/gi,'')[_0x1582('0x2')]('?',_0x1582('0x92'))[_0x1582('0x2')](/\&\&/gi,'&');if(_0x1ac3ea[_0x1582('0x93')](_0x442791))return _0x442791[_0x1582('0x30')](_0x1582('0x6d'),_0xdca5ed[_0x1582('0x2')](_0x1582('0x94'),_0x1582('0x95'))),!0x0;_0xdca5ed=_0xdca5ed[_0x1582('0x2')](/http.?:/i,'');_0x3203bc[_0x1582('0x96')](function(_0x4ddba8){if(!_0x1ac3ea[_0x1582('0x97')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x1582('0x98')](_0xdca5ed))return _0x4ddba8();var _0x5203ca=function(_0x538e88,_0x3e56ad){var _0x21b315=_0xdca5ed[_0x1582('0x99')](/sku\=([0-9]+)/gi),_0x40bdad=[];if(_0x1582('0x27')===typeof _0x21b315&&null!==_0x21b315)for(var _0x18bd2b=_0x21b315[_0x1582('0x6')]-0x1;0x0<=_0x18bd2b;_0x18bd2b--){var _0x514b71=parseInt(_0x21b315[_0x18bd2b][_0x1582('0x2')](/sku\=/gi,''));isNaN(_0x514b71)||_0x40bdad['push'](_0x514b71);}_0x1ac3ea['productPageCallback'][_0x1582('0x24')](this,_0x538e88,_0x3e56ad,_0xdca5ed);_0x32942a['buyButtonClickCallback'][_0x1582('0x24')](this,_0x538e88,_0x3e56ad,_0xdca5ed,_0x40bdad);_0x32942a[_0x1582('0x7f')](_0x442791,_0xdca5ed[_0x1582('0x9a')](_0x1582('0x9b'))['pop']()[_0x1582('0x9a')]('&')[_0x1582('0x9c')]());_0x1582('0x8')===typeof _0x1ac3ea[_0x1582('0x9d')]&&_0x1ac3ea[_0x1582('0x9d')]['call'](this);_0x48f4ed(window)[_0x1582('0x58')](_0x1582('0x9e'));_0x48f4ed(window)[_0x1582('0x58')](_0x1582('0x9f'));};_0x1ac3ea[_0x1582('0xa0')]?(_0x5203ca(null,'success'),_0x4ddba8()):_0x48f4ed[_0x1582('0x18')]({'url':_0xdca5ed,'complete':_0x5203ca})['always'](function(){_0x4ddba8();});});};_0x32942a[_0x1582('0xa1')]=function(_0x3ee222,_0x2b845b,_0xa0c543,_0x49b712){try{_0x1582('0x19')===_0x2b845b&&_0x1582('0x27')===typeof window['parent']&&_0x1582('0x8')===typeof window['parent'][_0x1582('0xa2')]&&window[_0x1582('0xa3')]['_QuatroDigital_prodBuyCallback'](_0x3ee222,_0x2b845b,_0xa0c543,_0x49b712);}catch(_0x165b29){_0x2f0591('Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.');}};_0x21b315();'function'===typeof _0x1ac3ea['callback']?_0x1ac3ea['callback']['call'](this):_0x2f0591('Callback\x20não\x20é\x20uma\x20função');};var _0x1ba0bc=_0x48f4ed[_0x1582('0x61')]();_0x48f4ed['fn'][_0x1582('0xa4')]=function(_0x25d0fc,_0x23a965){var _0x1e9c53=_0x48f4ed(this);_0x1582('0x3')!==typeof _0x23a965||_0x1582('0x27')!==typeof _0x25d0fc||_0x25d0fc instanceof _0x48f4ed||(_0x23a965=_0x25d0fc,_0x25d0fc=void 0x0);_0x1ac3ea=_0x48f4ed['extend']({},_0x5cba63,_0x23a965);var _0xa5196a;_0x1ba0bc[_0x1582('0x2b')](function(){_0x1e9c53[_0x1582('0x78')]('.qd-bb-itemAddWrapper')[_0x1582('0x6')]||_0x1e9c53[_0x1582('0xa5')]('<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>');_0xa5196a=new _0x48f4ed['QD_buyButton'](_0x1e9c53,_0x25d0fc);});_0x1ba0bc['fire']();_0x48f4ed(window)['on'](_0x1582('0xa6'),function(_0x4f689d,_0x2e5e62,_0x344ef4){_0xa5196a[_0x1582('0x7f')](_0x2e5e62,_0x344ef4);});return _0x48f4ed['extend'](_0x1e9c53,_0xa5196a);};var _0x3ded7d=0x0;_0x48f4ed(document)['ajaxSend'](function(_0x4558f7,_0x1659d1,_0x62882e){-0x1<_0x62882e[_0x1582('0x15')][_0x1582('0xe')]()[_0x1582('0xa7')]('/checkout/cart/add')&&(_0x3ded7d=(_0x62882e[_0x1582('0x15')][_0x1582('0x99')](/sku\=([0-9]+)/i)||[''])['pop']());});_0x48f4ed(window)[_0x1582('0x5c')](_0x1582('0xa8'),function(){_0x48f4ed(window)[_0x1582('0x58')](_0x1582('0xa6'),[new _0x48f4ed(),_0x3ded7d]);});_0x48f4ed(document)[_0x1582('0xa9')](function(){_0x1ba0bc['fire']();});}catch(_0x34d813){_0x1582('0x3')!==typeof console&&_0x1582('0x8')===typeof console[_0x1582('0x11')]&&console[_0x1582('0x11')](_0x1582('0x5d'),_0x34d813);}}(this));function qd_number_format(_0x14ab96,_0x2e10a2,_0x5f49ae,_0x108e0e){_0x14ab96=(_0x14ab96+'')[_0x1582('0x2')](/[^0-9+\-Ee.]/g,'');_0x14ab96=isFinite(+_0x14ab96)?+_0x14ab96:0x0;_0x2e10a2=isFinite(+_0x2e10a2)?Math[_0x1582('0xaa')](_0x2e10a2):0x0;_0x108e0e=_0x1582('0x3')===typeof _0x108e0e?',':_0x108e0e;_0x5f49ae=_0x1582('0x3')===typeof _0x5f49ae?'.':_0x5f49ae;var _0x22cbba='',_0x22cbba=function(_0x5b1992,_0x59692d){var _0x43fb55=Math[_0x1582('0x4')](0xa,_0x59692d);return''+(Math[_0x1582('0xab')](_0x5b1992*_0x43fb55)/_0x43fb55)[_0x1582('0x5')](_0x59692d);},_0x22cbba=(_0x2e10a2?_0x22cbba(_0x14ab96,_0x2e10a2):''+Math['round'](_0x14ab96))[_0x1582('0x9a')]('.');0x3<_0x22cbba[0x0][_0x1582('0x6')]&&(_0x22cbba[0x0]=_0x22cbba[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x108e0e));(_0x22cbba[0x1]||'')[_0x1582('0x6')]<_0x2e10a2&&(_0x22cbba[0x1]=_0x22cbba[0x1]||'',_0x22cbba[0x1]+=Array(_0x2e10a2-_0x22cbba[0x1][_0x1582('0x6')]+0x1)['join']('0'));return _0x22cbba[_0x1582('0x7')](_0x5f49ae);}(function(){try{window[_0x1582('0x33')]=window[_0x1582('0x33')]||{},window[_0x1582('0x33')][_0x1582('0x3d')]=window[_0x1582('0x33')]['callback']||$[_0x1582('0x61')]();}catch(_0x431378){_0x1582('0x3')!==typeof console&&_0x1582('0x8')===typeof console['error']&&console[_0x1582('0x11')](_0x1582('0x5d'),_0x431378[_0x1582('0x1f')]);}}());(function(_0x23f486){try{var _0x4ed811=jQuery,_0x494e1c=function(_0x312a05,_0x24a487){if(_0x1582('0x27')===typeof console&&_0x1582('0x3')!==typeof console[_0x1582('0x11')]&&_0x1582('0x3')!==typeof console[_0x1582('0x2a')]&&_0x1582('0x3')!==typeof console[_0x1582('0x5e')]){var _0x3dc3aa;'object'===typeof _0x312a05?(_0x312a05[_0x1582('0x62')](_0x1582('0xac')),_0x3dc3aa=_0x312a05):_0x3dc3aa=[_0x1582('0xac')+_0x312a05];if('undefined'===typeof _0x24a487||_0x1582('0x28')!==_0x24a487[_0x1582('0xe')]()&&_0x1582('0x64')!==_0x24a487[_0x1582('0xe')]())if(_0x1582('0x3')!==typeof _0x24a487&&_0x1582('0x2a')===_0x24a487['toLowerCase']())try{console[_0x1582('0x2a')][_0x1582('0x65')](console,_0x3dc3aa);}catch(_0x50b37b){try{console[_0x1582('0x2a')](_0x3dc3aa[_0x1582('0x7')]('\x0a'));}catch(_0x154f47){}}else try{console[_0x1582('0x11')][_0x1582('0x65')](console,_0x3dc3aa);}catch(_0x140dc8){try{console[_0x1582('0x11')](_0x3dc3aa[_0x1582('0x7')]('\x0a'));}catch(_0x19b8d0){}}else try{console['warn']['apply'](console,_0x3dc3aa);}catch(_0x5ad1e1){try{console['warn'](_0x3dc3aa[_0x1582('0x7')]('\x0a'));}catch(_0x2346d2){}}}};window[_0x1582('0x52')]=window[_0x1582('0x52')]||{};window['_QuatroDigital_DropDown'][_0x1582('0x89')]=!0x0;_0x4ed811[_0x1582('0xad')]=function(){};_0x4ed811['fn']['QD_dropDownCart']=function(){return{'fn':new _0x4ed811()};};var _0x314ae2=function(_0x478d48){var _0x1f1b5f={'z':_0x1582('0xae')};return function(_0x5c8b94){var _0x4432a0=function(_0x424b8a){return _0x424b8a;};var _0x1db2d3=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x5c8b94=_0x5c8b94['d'+_0x1db2d3[0x10]+'c'+_0x1db2d3[0x11]+'m'+_0x4432a0(_0x1db2d3[0x1])+'n'+_0x1db2d3[0xd]]['l'+_0x1db2d3[0x12]+'c'+_0x1db2d3[0x0]+'ti'+_0x4432a0('o')+'n'];var _0x486aa2=function(_0x4f99ba){return escape(encodeURIComponent(_0x4f99ba[_0x1582('0x2')](/\./g,'¨')[_0x1582('0x2')](/[a-zA-Z]/g,function(_0x453362){return String[_0x1582('0xaf')](('Z'>=_0x453362?0x5a:0x7a)>=(_0x453362=_0x453362[_0x1582('0xb0')](0x0)+0xd)?_0x453362:_0x453362-0x1a);})));};var _0x23f486=_0x486aa2(_0x5c8b94[[_0x1db2d3[0x9],_0x4432a0('o'),_0x1db2d3[0xc],_0x1db2d3[_0x4432a0(0xd)]]['join']('')]);_0x486aa2=_0x486aa2((window[['js',_0x4432a0('no'),'m',_0x1db2d3[0x1],_0x1db2d3[0x4][_0x1582('0xb1')](),_0x1582('0xb2')][_0x1582('0x7')]('')]||_0x1582('0x82'))+['.v',_0x1db2d3[0xd],'e',_0x4432a0('x'),'co',_0x4432a0('mm'),_0x1582('0xb3'),_0x1db2d3[0x1],'.c',_0x4432a0('o'),'m.',_0x1db2d3[0x13],'r'][_0x1582('0x7')](''));for(var _0x44fdad in _0x1f1b5f){if(_0x486aa2===_0x44fdad+_0x1f1b5f[_0x44fdad]||_0x23f486===_0x44fdad+_0x1f1b5f[_0x44fdad]){var _0x23fb13='tr'+_0x1db2d3[0x11]+'e';break;}_0x23fb13='f'+_0x1db2d3[0x0]+'ls'+_0x4432a0(_0x1db2d3[0x1])+'';}_0x4432a0=!0x1;-0x1<_0x5c8b94[[_0x1db2d3[0xc],'e',_0x1db2d3[0x0],'rc',_0x1db2d3[0x9]][_0x1582('0x7')]('')][_0x1582('0xa7')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x4432a0=!0x0);return[_0x23fb13,_0x4432a0];}(_0x478d48);}(window);if(!eval(_0x314ae2[0x0]))return _0x314ae2[0x1]?_0x494e1c(_0x1582('0xb4')):!0x1;_0x4ed811[_0x1582('0xad')]=function(_0x160a3e,_0x3aa341){var _0x5b88bc=_0x4ed811(_0x160a3e);if(!_0x5b88bc['length'])return _0x5b88bc;var _0xa012e5=_0x4ed811[_0x1582('0x12')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x1582('0xb5'),'linkCheckout':'Finalizar\x20Compra','cartTotal':_0x1582('0xb6'),'emptyCart':_0x1582('0xb7'),'continueShopping':_0x1582('0xb8'),'shippingForm':_0x1582('0xb9')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0xa206be){return _0xa206be[_0x1582('0xba')]||_0xa206be['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x3aa341);_0x4ed811('');var _0x32b1e9=this;if(_0xa012e5[_0x1582('0xbb')]){var _0x49fdc2=!0x1;'undefined'===typeof window['vtexjs']&&(_0x494e1c(_0x1582('0xbc')),_0x4ed811[_0x1582('0x18')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x1582('0xbd'),'error':function(){_0x494e1c(_0x1582('0xbe'));_0x49fdc2=!0x0;}}));if(_0x49fdc2)return _0x494e1c(_0x1582('0xbf'));}if(_0x1582('0x27')===typeof window['vtexjs']&&'undefined'!==typeof window['vtexjs'][_0x1582('0x22')])var _0xd634ae=window[_0x1582('0x53')][_0x1582('0x22')];else if(_0x1582('0x27')===typeof vtex&&_0x1582('0x27')===typeof vtex[_0x1582('0x22')]&&'undefined'!==typeof vtex[_0x1582('0x22')]['SDK'])_0xd634ae=new vtex[(_0x1582('0x22'))][(_0x1582('0x54'))]();else return _0x494e1c('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x32b1e9[_0x1582('0xc0')]=_0x1582('0xc1');var _0x43a475=function(_0x9b1e2a){_0x4ed811(this)[_0x1582('0xc2')](_0x9b1e2a);_0x9b1e2a['find'](_0x1582('0xc3'))[_0x1582('0x2b')](_0x4ed811(_0x1582('0xc4')))['on'](_0x1582('0xc5'),function(){_0x5b88bc['removeClass']('qd-bb-lightBoxProdAdd');_0x4ed811(document[_0x1582('0x6e')])[_0x1582('0x84')](_0x1582('0x80'));});_0x4ed811(document)[_0x1582('0xc6')](_0x1582('0xc7'))['on'](_0x1582('0xc7'),function(_0x5e544b){0x1b==_0x5e544b['keyCode']&&(_0x5b88bc[_0x1582('0x84')](_0x1582('0xc8')),_0x4ed811(document[_0x1582('0x6e')])['removeClass'](_0x1582('0x80')));});var _0x65fbbb=_0x9b1e2a[_0x1582('0x4e')](_0x1582('0xc9'));_0x9b1e2a[_0x1582('0x4e')]('.qd-ddc-scrollUp')['on'](_0x1582('0xca'),function(){_0x32b1e9[_0x1582('0xcb')]('-',void 0x0,void 0x0,_0x65fbbb);return!0x1;});_0x9b1e2a['find'](_0x1582('0xcc'))['on']('click.qd_ddc_scrollDown',function(){_0x32b1e9['scrollCart'](void 0x0,void 0x0,void 0x0,_0x65fbbb);return!0x1;});_0x9b1e2a[_0x1582('0x4e')](_0x1582('0xcd'))['val']('')['on']('keyup.qd_ddc_cep',function(){_0x32b1e9['shippingCalculate'](_0x4ed811(this));});if(_0xa012e5['updateOnlyHover']){var _0x3aa341=0x0;_0x4ed811(this)['on'](_0x1582('0xce'),function(){var _0x9b1e2a=function(){window['_QuatroDigital_DropDown'][_0x1582('0x89')]&&(_0x32b1e9[_0x1582('0x87')](),window[_0x1582('0x52')]['allowUpdate']=!0x1,_0x4ed811['fn'][_0x1582('0x21')](!0x0),_0x32b1e9[_0x1582('0xcf')]());};_0x3aa341=setInterval(function(){_0x9b1e2a();},0x258);_0x9b1e2a();});_0x4ed811(this)['on'](_0x1582('0xd0'),function(){clearInterval(_0x3aa341);});}};var _0x439cae=function(_0x2da8b1){_0x2da8b1=_0x4ed811(_0x2da8b1);_0xa012e5['texts'][_0x1582('0xd1')]=_0xa012e5[_0x1582('0xd2')][_0x1582('0xd1')][_0x1582('0x2')](_0x1582('0xd3'),_0x1582('0xd4'));_0xa012e5[_0x1582('0xd2')][_0x1582('0xd1')]=_0xa012e5[_0x1582('0xd2')][_0x1582('0xd1')][_0x1582('0x2')](_0x1582('0xd5'),_0x1582('0xd6'));_0xa012e5[_0x1582('0xd2')]['cartTotal']=_0xa012e5[_0x1582('0xd2')][_0x1582('0xd1')][_0x1582('0x2')](_0x1582('0xd7'),'<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>');_0xa012e5[_0x1582('0xd2')]['cartTotal']=_0xa012e5['texts']['cartTotal'][_0x1582('0x2')](_0x1582('0xd8'),_0x1582('0xd9'));_0x2da8b1[_0x1582('0x4e')](_0x1582('0xda'))[_0x1582('0x48')](_0xa012e5[_0x1582('0xd2')][_0x1582('0xdb')]);_0x2da8b1['find'](_0x1582('0xdc'))[_0x1582('0x48')](_0xa012e5['texts'][_0x1582('0xdd')]);_0x2da8b1[_0x1582('0x4e')](_0x1582('0xde'))[_0x1582('0x48')](_0xa012e5[_0x1582('0xd2')][_0x1582('0xdf')]);_0x2da8b1[_0x1582('0x4e')](_0x1582('0xe0'))['html'](_0xa012e5[_0x1582('0xd2')][_0x1582('0xd1')]);_0x2da8b1[_0x1582('0x4e')]('.qd-ddc-shipping')['html'](_0xa012e5['texts'][_0x1582('0xe1')]);_0x2da8b1['find'](_0x1582('0xe2'))['html'](_0xa012e5[_0x1582('0xd2')][_0x1582('0xe3')]);return _0x2da8b1;}(this[_0x1582('0xc0')]);var _0x5d23e2=0x0;_0x5b88bc[_0x1582('0x4a')](function(){0x0<_0x5d23e2?_0x43a475['call'](this,_0x439cae[_0x1582('0xe4')]()):_0x43a475['call'](this,_0x439cae);_0x5d23e2++;});window[_0x1582('0x33')][_0x1582('0x3d')][_0x1582('0x2b')](function(){_0x4ed811(_0x1582('0xe5'))[_0x1582('0x48')](window[_0x1582('0x33')]['total']||'--');_0x4ed811(_0x1582('0xe6'))[_0x1582('0x48')](window[_0x1582('0x33')][_0x1582('0x39')]||'0');_0x4ed811(_0x1582('0xe7'))['html'](window[_0x1582('0x33')]['shipping']||'--');_0x4ed811(_0x1582('0xe8'))['html'](window[_0x1582('0x33')]['allTotal']||'--');});var _0x4693be=function(_0x5ab68b,_0x2f6f87){if('undefined'===typeof _0x5ab68b[_0x1582('0x3b')])return _0x494e1c('Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição');_0x32b1e9[_0x1582('0xe9')][_0x1582('0x24')](this,_0x2f6f87);};_0x32b1e9[_0x1582('0x87')]=function(_0x44ac28,_0x250cbd){_0x1582('0x3')!=typeof _0x250cbd?window[_0x1582('0x52')][_0x1582('0xea')]=_0x250cbd:window['_QuatroDigital_DropDown'][_0x1582('0xea')]&&(_0x250cbd=window[_0x1582('0x52')][_0x1582('0xea')]);setTimeout(function(){window['_QuatroDigital_DropDown'][_0x1582('0xea')]=void 0x0;},_0xa012e5['timeRemoveNewItemClass']);_0x4ed811(_0x1582('0xeb'))[_0x1582('0x84')]('qd-ddc-prodLoaded');if(_0xa012e5['smartCheckout']){var _0x3aa341=function(_0x2be1c4){window[_0x1582('0x52')]['getOrderForm']=_0x2be1c4;_0x4693be(_0x2be1c4,_0x250cbd);_0x1582('0x3')!==typeof window[_0x1582('0xec')]&&'function'===typeof window[_0x1582('0xec')][_0x1582('0xed')]&&window[_0x1582('0xec')]['exec'][_0x1582('0x24')](this);_0x4ed811('.qd-ddc-wrapper')['addClass'](_0x1582('0xee'));};_0x1582('0x3')!==typeof window['_QuatroDigital_DropDown']['getOrderForm']?(_0x3aa341(window['_QuatroDigital_DropDown']['getOrderForm']),_0x1582('0x8')===typeof _0x44ac28&&_0x44ac28(window[_0x1582('0x52')]['getOrderForm'])):_0x4ed811['QD_checkoutQueue'](['items','totalizers',_0x1582('0xef')],{'done':function(_0x26b8ab){_0x3aa341[_0x1582('0x24')](this,_0x26b8ab);_0x1582('0x8')===typeof _0x44ac28&&_0x44ac28(_0x26b8ab);},'fail':function(_0x15b84a){_0x494e1c([_0x1582('0xf0'),_0x15b84a]);}});}else alert(_0x1582('0xf1'));};_0x32b1e9[_0x1582('0xcf')]=function(){var _0x13daec=_0x4ed811(_0x1582('0xeb'));_0x13daec[_0x1582('0x4e')](_0x1582('0xf2'))[_0x1582('0x6')]?_0x13daec['removeClass']('qd-ddc-noItems'):_0x13daec['addClass'](_0x1582('0xf3'));};_0x32b1e9['renderProductsList']=function(_0x30fa6f){var _0x3aa341=_0x4ed811(_0x1582('0xf4'));_0x3aa341['empty']();_0x3aa341[_0x1582('0x4a')](function(){var _0x3aa341=_0x4ed811(this),_0x160a3e,_0x3dd915,_0xd592bc=_0x4ed811(''),_0x1ada68;for(_0x1ada68 in window[_0x1582('0x52')][_0x1582('0x23')][_0x1582('0x3b')])if(_0x1582('0x27')===typeof window[_0x1582('0x52')][_0x1582('0x23')][_0x1582('0x3b')][_0x1ada68]){var _0x36909d=window[_0x1582('0x52')]['getOrderForm'][_0x1582('0x3b')][_0x1ada68];var _0x29e891=_0x36909d[_0x1582('0xf5')][_0x1582('0x2')](/^\/|\/$/g,'')[_0x1582('0x9a')]('/');var _0x2ca02c=_0x4ed811(_0x1582('0xf6'));_0x2ca02c[_0x1582('0x30')]({'data-sku':_0x36909d['id'],'data-sku-index':_0x1ada68,'data-qd-departament':_0x29e891[0x0],'data-qd-category':_0x29e891[_0x29e891['length']-0x1]});_0x2ca02c['addClass'](_0x1582('0xf7')+_0x36909d[_0x1582('0xf8')]);_0x2ca02c['find'](_0x1582('0xf9'))['append'](_0xa012e5[_0x1582('0xba')](_0x36909d));_0x2ca02c[_0x1582('0x4e')](_0x1582('0xfa'))[_0x1582('0xc2')](isNaN(_0x36909d[_0x1582('0xfb')])?_0x36909d[_0x1582('0xfb')]:0x0==_0x36909d[_0x1582('0xfb')]?_0x1582('0xfc'):(_0x4ed811('meta[name=currency]')[_0x1582('0x30')](_0x1582('0x31'))||'R$')+'\x20'+qd_number_format(_0x36909d[_0x1582('0xfb')]/0x64,0x2,',','.'));_0x2ca02c[_0x1582('0x4e')](_0x1582('0xfd'))[_0x1582('0x30')]({'data-sku':_0x36909d['id'],'data-sku-index':_0x1ada68})[_0x1582('0xfe')](_0x36909d[_0x1582('0x3c')]);_0x2ca02c[_0x1582('0x4e')]('.qd-ddc-remove')[_0x1582('0x30')]({'data-sku':_0x36909d['id'],'data-sku-index':_0x1ada68});_0x32b1e9['insertProdImg'](_0x36909d['id'],_0x2ca02c[_0x1582('0x4e')](_0x1582('0xff')),_0x36909d['imageUrl']);_0x2ca02c[_0x1582('0x4e')](_0x1582('0x100'))[_0x1582('0x30')]({'data-sku':_0x36909d['id'],'data-sku-index':_0x1ada68});_0x2ca02c[_0x1582('0x101')](_0x3aa341);_0xd592bc=_0xd592bc['add'](_0x2ca02c);}try{var _0x44d7f2=_0x3aa341[_0x1582('0x0')](_0x1582('0xeb'))[_0x1582('0x4e')](_0x1582('0xcd'));_0x44d7f2[_0x1582('0x6')]&&''==_0x44d7f2[_0x1582('0xfe')]()&&window[_0x1582('0x52')][_0x1582('0x23')][_0x1582('0xef')]['address']&&_0x44d7f2['val'](window[_0x1582('0x52')][_0x1582('0x23')][_0x1582('0xef')][_0x1582('0x102')][_0x1582('0x103')]);}catch(_0x4228e9){_0x494e1c(_0x1582('0x104')+_0x4228e9[_0x1582('0x1f')],'aviso');}_0x32b1e9[_0x1582('0x105')](_0x3aa341);_0x32b1e9[_0x1582('0xcf')]();_0x30fa6f&&_0x30fa6f[_0x1582('0x106')]&&function(){_0x3dd915=_0xd592bc[_0x1582('0x41')]('[data-sku=\x27'+_0x30fa6f['lastSku']+'\x27]');_0x3dd915[_0x1582('0x6')]&&(_0x160a3e=0x0,_0xd592bc['each'](function(){var _0x30fa6f=_0x4ed811(this);if(_0x30fa6f['is'](_0x3dd915))return!0x1;_0x160a3e+=_0x30fa6f[_0x1582('0x107')]();}),_0x32b1e9[_0x1582('0xcb')](void 0x0,void 0x0,_0x160a3e,_0x3aa341['add'](_0x3aa341[_0x1582('0xa3')]())),_0xd592bc[_0x1582('0x84')](_0x1582('0x108')),function(_0x53febb){_0x53febb[_0x1582('0x45')](_0x1582('0x109'));_0x53febb['addClass'](_0x1582('0x108'));setTimeout(function(){_0x53febb['removeClass']('qd-ddc-lastAdded');},_0xa012e5['timeRemoveNewItemClass']);}(_0x3dd915));}();});(function(){_QuatroDigital_DropDown['getOrderForm']['items'][_0x1582('0x6')]?(_0x4ed811(_0x1582('0x6e'))[_0x1582('0x84')](_0x1582('0x10a'))['addClass'](_0x1582('0x10b')),setTimeout(function(){_0x4ed811(_0x1582('0x6e'))[_0x1582('0x84')](_0x1582('0x10c'));},_0xa012e5[_0x1582('0x86')])):_0x4ed811(_0x1582('0x6e'))[_0x1582('0x84')](_0x1582('0x10d'))[_0x1582('0x45')](_0x1582('0x10a'));}());_0x1582('0x8')===typeof _0xa012e5[_0x1582('0x10e')]?_0xa012e5[_0x1582('0x10e')][_0x1582('0x24')](this):_0x494e1c(_0x1582('0x10f'));};_0x32b1e9[_0x1582('0x110')]=function(_0x42664c,_0x1ae6a5,_0x7068df){function _0x30c4a2(){_0x1ae6a5[_0x1582('0x84')](_0x1582('0x111'))[_0x1582('0x90')](function(){_0x4ed811(this)['addClass'](_0x1582('0x111'));})[_0x1582('0x30')]('src',_0x7068df);}_0x7068df?_0x30c4a2():isNaN(_0x42664c)?_0x494e1c('Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','alerta'):alert(_0x1582('0x112'));};_0x32b1e9[_0x1582('0x105')]=function(_0x1684e7){var _0xc095cc=function(_0x59709a,_0x11836b){var _0x3aa341=_0x4ed811(_0x59709a);var _0x5d912e=_0x3aa341[_0x1582('0x30')](_0x1582('0x113'));var _0x160a3e=_0x3aa341[_0x1582('0x30')](_0x1582('0x114'));if(_0x5d912e){var _0x45ed7e=parseInt(_0x3aa341[_0x1582('0xfe')]())||0x1;_0x32b1e9['changeQantity']([_0x5d912e,_0x160a3e],_0x45ed7e,_0x45ed7e+0x1,function(_0x28661a){_0x3aa341[_0x1582('0xfe')](_0x28661a);'function'===typeof _0x11836b&&_0x11836b();});}};var _0x3aa341=function(_0xcff6b0,_0x2879c2){var _0x3aa341=_0x4ed811(_0xcff6b0);var _0x59994c=_0x3aa341['attr']('data-sku');var _0x160a3e=_0x3aa341[_0x1582('0x30')](_0x1582('0x114'));if(_0x59994c){var _0x54d331=parseInt(_0x3aa341[_0x1582('0xfe')]())||0x2;_0x32b1e9[_0x1582('0x115')]([_0x59994c,_0x160a3e],_0x54d331,_0x54d331-0x1,function(_0x466ddf){_0x3aa341[_0x1582('0xfe')](_0x466ddf);'function'===typeof _0x2879c2&&_0x2879c2();});}};var _0x2e3705=function(_0x27db29,_0x349725){var _0x3aa341=_0x4ed811(_0x27db29);var _0x28ea8e=_0x3aa341['attr'](_0x1582('0x113'));var _0x160a3e=_0x3aa341[_0x1582('0x30')](_0x1582('0x114'));if(_0x28ea8e){var _0x5eab27=parseInt(_0x3aa341['val']())||0x1;_0x32b1e9[_0x1582('0x115')]([_0x28ea8e,_0x160a3e],0x1,_0x5eab27,function(_0x294cc1){_0x3aa341['val'](_0x294cc1);_0x1582('0x8')===typeof _0x349725&&_0x349725();});}};var _0x160a3e=_0x1684e7[_0x1582('0x4e')]('.qd-ddc-prodQttWrapper:not(.qd_on)');_0x160a3e[_0x1582('0x45')]('qd_on')[_0x1582('0x4a')](function(){var _0x1684e7=_0x4ed811(this);_0x1684e7[_0x1582('0x4e')](_0x1582('0x116'))['on']('click.qd_ddc_more',function(_0x2d88fb){_0x2d88fb[_0x1582('0x73')]();_0x160a3e[_0x1582('0x45')]('qd-loading');_0xc095cc(_0x1684e7['find'](_0x1582('0xfd')),function(){_0x160a3e['removeClass'](_0x1582('0x117'));});});_0x1684e7[_0x1582('0x4e')]('.qd-ddc-quantityMinus')['on'](_0x1582('0x118'),function(_0x4c59c7){_0x4c59c7[_0x1582('0x73')]();_0x160a3e[_0x1582('0x45')](_0x1582('0x117'));_0x3aa341(_0x1684e7['find'](_0x1582('0xfd')),function(){_0x160a3e[_0x1582('0x84')](_0x1582('0x117'));});});_0x1684e7['find'](_0x1582('0xfd'))['on'](_0x1582('0x119'),function(){_0x160a3e[_0x1582('0x45')](_0x1582('0x117'));_0x2e3705(this,function(){_0x160a3e['removeClass'](_0x1582('0x117'));});});_0x1684e7[_0x1582('0x4e')]('.qd-ddc-quantity')['on'](_0x1582('0x11a'),function(_0xbf0ff3){0xd==_0xbf0ff3[_0x1582('0x11b')]&&(_0x160a3e[_0x1582('0x45')](_0x1582('0x117')),_0x2e3705(this,function(){_0x160a3e['removeClass'](_0x1582('0x117'));}));});});_0x1684e7[_0x1582('0x4e')]('.qd-ddc-prodRow')[_0x1582('0x4a')](function(){var _0x1684e7=_0x4ed811(this);_0x1684e7[_0x1582('0x4e')]('.qd-ddc-remove')['on'](_0x1582('0x11c'),function(){_0x1684e7[_0x1582('0x45')]('qd-loading');_0x32b1e9[_0x1582('0x11d')](_0x4ed811(this),function(_0x5eebdd){_0x5eebdd?_0x1684e7[_0x1582('0x11e')](!0x0)[_0x1582('0x11f')](function(){_0x1684e7['remove']();_0x32b1e9[_0x1582('0xcf')]();}):_0x1684e7[_0x1582('0x84')]('qd-loading');});return!0x1;});});};_0x32b1e9[_0x1582('0x120')]=function(_0x1ef4d1){var _0x130453=_0x1ef4d1['val'](),_0x130453=_0x130453[_0x1582('0x2')](/[^0-9\-]/g,''),_0x130453=_0x130453[_0x1582('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x1582('0x121')),_0x130453=_0x130453[_0x1582('0x2')](/(.{9}).*/g,'$1');_0x1ef4d1['val'](_0x130453);0x9<=_0x130453[_0x1582('0x6')]&&(_0x1ef4d1['data'](_0x1582('0x122'))!=_0x130453&&_0xd634ae[_0x1582('0x123')]({'postalCode':_0x130453,'country':_0x1582('0x124')})[_0x1582('0x125')](function(_0x15efd4){window['_QuatroDigital_DropDown']['getOrderForm']=_0x15efd4;_0x32b1e9['getCartInfoByUrl']();})[_0x1582('0x1a')](function(_0x270562){_0x494e1c(['Não\x20foi\x20possível\x20calcular\x20o\x20frete',_0x270562]);updateCartData();}),_0x1ef4d1[_0x1582('0x14')]('qdDdcLastPostalCode',_0x130453));};_0x32b1e9[_0x1582('0x115')]=function(_0x3be2e1,_0x47b509,_0x5362d7,_0x44d80d){function _0x547da7(_0x1f1269){_0x1f1269=_0x1582('0x126')!==typeof _0x1f1269?!0x1:_0x1f1269;_0x32b1e9[_0x1582('0x87')]();window[_0x1582('0x52')][_0x1582('0x89')]=!0x1;_0x32b1e9[_0x1582('0xcf')]();'undefined'!==typeof window[_0x1582('0xec')]&&_0x1582('0x8')===typeof window[_0x1582('0xec')]['exec']&&window[_0x1582('0xec')][_0x1582('0xed')]['call'](this);_0x1582('0x8')===typeof adminCart&&adminCart();_0x4ed811['fn'][_0x1582('0x21')](!0x0,void 0x0,_0x1f1269);_0x1582('0x8')===typeof _0x44d80d&&_0x44d80d(_0x47b509);}_0x5362d7=_0x5362d7||0x1;if(0x1>_0x5362d7)return _0x47b509;if(_0xa012e5['smartCheckout']){if(_0x1582('0x3')===typeof window[_0x1582('0x52')][_0x1582('0x23')][_0x1582('0x3b')][_0x3be2e1[0x1]])return _0x494e1c('Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items['+_0x3be2e1[0x1]+']'),_0x47b509;window[_0x1582('0x52')][_0x1582('0x23')][_0x1582('0x3b')][_0x3be2e1[0x1]][_0x1582('0x3c')]=_0x5362d7;window[_0x1582('0x52')]['getOrderForm'][_0x1582('0x3b')][_0x3be2e1[0x1]][_0x1582('0x127')]=_0x3be2e1[0x1];_0xd634ae[_0x1582('0x128')]([window['_QuatroDigital_DropDown'][_0x1582('0x23')]['items'][_0x3be2e1[0x1]]],['items',_0x1582('0x34'),_0x1582('0xef')])['done'](function(_0x53a873){window[_0x1582('0x52')]['getOrderForm']=_0x53a873;_0x547da7(!0x0);})[_0x1582('0x1a')](function(_0x3b90e8){_0x494e1c([_0x1582('0x129'),_0x3b90e8]);_0x547da7();});}else _0x494e1c(_0x1582('0x12a'));};_0x32b1e9[_0x1582('0x11d')]=function(_0x2abc2f,_0x31a9ca){function _0x3f62af(_0x18afa3){_0x18afa3=_0x1582('0x126')!==typeof _0x18afa3?!0x1:_0x18afa3;_0x1582('0x3')!==typeof window[_0x1582('0xec')]&&_0x1582('0x8')===typeof window['_QuatroDigital_AmountProduct'][_0x1582('0xed')]&&window['_QuatroDigital_AmountProduct'][_0x1582('0xed')][_0x1582('0x24')](this);_0x1582('0x8')===typeof adminCart&&adminCart();_0x4ed811['fn'][_0x1582('0x21')](!0x0,void 0x0,_0x18afa3);'function'===typeof _0x31a9ca&&_0x31a9ca(_0x160a3e);}var _0x160a3e=!0x1,_0x469d5f=_0x4ed811(_0x2abc2f)[_0x1582('0x30')](_0x1582('0x114'));if(_0xa012e5['smartCheckout']){if(_0x1582('0x3')===typeof window['_QuatroDigital_DropDown'][_0x1582('0x23')][_0x1582('0x3b')][_0x469d5f])return _0x494e1c(_0x1582('0x12b')+_0x469d5f+']'),_0x160a3e;window[_0x1582('0x52')][_0x1582('0x23')]['items'][_0x469d5f][_0x1582('0x127')]=_0x469d5f;_0xd634ae[_0x1582('0x12c')]([window[_0x1582('0x52')][_0x1582('0x23')]['items'][_0x469d5f]],['items',_0x1582('0x34'),_0x1582('0xef')])[_0x1582('0x125')](function(_0x3d983c){_0x160a3e=!0x0;window['_QuatroDigital_DropDown'][_0x1582('0x23')]=_0x3d983c;_0x4693be(_0x3d983c);_0x3f62af(!0x0);})[_0x1582('0x1a')](function(_0x270bff){_0x494e1c([_0x1582('0x12d'),_0x270bff]);_0x3f62af();});}else alert(_0x1582('0x12e'));};_0x32b1e9['scrollCart']=function(_0x2ef5e1,_0x1b7c43,_0x1e1734,_0x4f6f2c){_0x4f6f2c=_0x4f6f2c||_0x4ed811(_0x1582('0x12f'));_0x2ef5e1=_0x2ef5e1||'+';_0x1b7c43=_0x1b7c43||0.9*_0x4f6f2c[_0x1582('0x130')]();_0x4f6f2c[_0x1582('0x11e')](!0x0,!0x0)[_0x1582('0x131')]({'scrollTop':isNaN(_0x1e1734)?_0x2ef5e1+'='+_0x1b7c43+'px':_0x1e1734});};_0xa012e5[_0x1582('0x132')]||(_0x32b1e9['getCartInfoByUrl'](),_0x4ed811['fn'][_0x1582('0x21')](!0x0));_0x4ed811(window)['on'](_0x1582('0x133'),function(){try{window[_0x1582('0x52')][_0x1582('0x23')]=void 0x0,_0x32b1e9['getCartInfoByUrl']();}catch(_0x382f22){_0x494e1c(_0x1582('0x134')+_0x382f22[_0x1582('0x1f')],_0x1582('0x135'));}});_0x1582('0x8')===typeof _0xa012e5[_0x1582('0x3d')]?_0xa012e5[_0x1582('0x3d')][_0x1582('0x24')](this):_0x494e1c('Callback\x20não\x20é\x20uma\x20função');};_0x4ed811['fn'][_0x1582('0xad')]=function(_0x8fe542){var _0x426fbc=_0x4ed811(this);_0x426fbc['fn']=new _0x4ed811[(_0x1582('0xad'))](this,_0x8fe542);return _0x426fbc;};}catch(_0x33c108){'undefined'!==typeof console&&'function'===typeof console[_0x1582('0x11')]&&console[_0x1582('0x11')](_0x1582('0x5d'),_0x33c108);}}(this));(function(_0x1786be){try{var _0x44059c=jQuery;window[_0x1582('0xec')]=window[_0x1582('0xec')]||{};window[_0x1582('0xec')][_0x1582('0x3b')]={};window[_0x1582('0xec')][_0x1582('0x136')]=!0x1;window[_0x1582('0xec')][_0x1582('0x137')]=!0x1;window[_0x1582('0xec')][_0x1582('0x138')]=!0x1;var _0x581316=function(){if(window['_QuatroDigital_AmountProduct'][_0x1582('0x136')]){var _0x2288bd=!0x1;var _0x1786be={};window[_0x1582('0xec')][_0x1582('0x3b')]={};for(_0x36fafe in window['_QuatroDigital_DropDown'][_0x1582('0x23')][_0x1582('0x3b')])if('object'===typeof window[_0x1582('0x52')][_0x1582('0x23')][_0x1582('0x3b')][_0x36fafe]){var _0x4d7c23=window[_0x1582('0x52')][_0x1582('0x23')][_0x1582('0x3b')][_0x36fafe];_0x1582('0x3')!==typeof _0x4d7c23[_0x1582('0x139')]&&null!==_0x4d7c23['productId']&&''!==_0x4d7c23[_0x1582('0x139')]&&(window[_0x1582('0xec')]['items'][_0x1582('0x13a')+_0x4d7c23[_0x1582('0x139')]]=window['_QuatroDigital_AmountProduct'][_0x1582('0x3b')][_0x1582('0x13a')+_0x4d7c23[_0x1582('0x139')]]||{},window['_QuatroDigital_AmountProduct'][_0x1582('0x3b')][_0x1582('0x13a')+_0x4d7c23[_0x1582('0x139')]][_0x1582('0x13b')]=_0x4d7c23[_0x1582('0x139')],_0x1786be[_0x1582('0x13a')+_0x4d7c23[_0x1582('0x139')]]||(window[_0x1582('0xec')][_0x1582('0x3b')]['prod_'+_0x4d7c23['productId']]['qtt']=0x0),window[_0x1582('0xec')][_0x1582('0x3b')]['prod_'+_0x4d7c23[_0x1582('0x139')]][_0x1582('0x39')]+=_0x4d7c23['quantity'],_0x2288bd=!0x0,_0x1786be[_0x1582('0x13a')+_0x4d7c23[_0x1582('0x139')]]=!0x0);}var _0x36fafe=_0x2288bd;}else _0x36fafe=void 0x0;window[_0x1582('0xec')][_0x1582('0x136')]&&(_0x44059c(_0x1582('0x13c'))[_0x1582('0x13d')](),_0x44059c(_0x1582('0x13e'))['removeClass'](_0x1582('0x13f')));for(var _0x479ad0 in window[_0x1582('0xec')][_0x1582('0x3b')]){_0x4d7c23=window[_0x1582('0xec')][_0x1582('0x3b')][_0x479ad0];if(_0x1582('0x27')!==typeof _0x4d7c23)return;_0x1786be=_0x44059c('input.qd-productId[value='+_0x4d7c23['prodId']+']')[_0x1582('0x0')]('li');if(window[_0x1582('0xec')][_0x1582('0x136')]||!_0x1786be[_0x1582('0x4e')](_0x1582('0x13c'))[_0x1582('0x6')])_0x2288bd=_0x44059c('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x2288bd[_0x1582('0x4e')](_0x1582('0x140'))[_0x1582('0x48')](_0x4d7c23['qtt']),_0x4d7c23=_0x1786be[_0x1582('0x4e')](_0x1582('0x141')),_0x4d7c23[_0x1582('0x6')]?_0x4d7c23['prepend'](_0x2288bd)[_0x1582('0x45')]('qd-bap-item-added'):_0x1786be['prepend'](_0x2288bd);}_0x36fafe&&(window['_QuatroDigital_AmountProduct']['allowRecalculate']=!0x1);};window[_0x1582('0xec')][_0x1582('0xed')]=function(){window[_0x1582('0xec')][_0x1582('0x136')]=!0x0;_0x581316[_0x1582('0x24')](this);};_0x44059c(document)['ajaxStop'](function(){_0x581316['call'](this);});}catch(_0x476c24){'undefined'!==typeof console&&_0x1582('0x8')===typeof console[_0x1582('0x11')]&&console[_0x1582('0x11')](_0x1582('0x5d'),_0x476c24);}}(this));(function(){try{var _0x4d2b9a=jQuery,_0x7afd32,_0x2e32c9={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x4d2b9a['QD_smartCart']=function(_0x31b574){var _0x3988d8={};_0x7afd32=_0x4d2b9a[_0x1582('0x12')](!0x0,{},_0x2e32c9,_0x31b574);_0x31b574=_0x4d2b9a(_0x7afd32['selector'])['QD_dropDownCart'](_0x7afd32[_0x1582('0x142')]);_0x3988d8[_0x1582('0x143')]=_0x1582('0x3')!==typeof _0x7afd32[_0x1582('0x142')][_0x1582('0x132')]&&!0x1===_0x7afd32[_0x1582('0x142')][_0x1582('0x132')]?_0x4d2b9a(_0x7afd32[_0x1582('0x7d')])['QD_buyButton'](_0x31b574['fn'],_0x7afd32['buyButton']):_0x4d2b9a(_0x7afd32[_0x1582('0x7d')])[_0x1582('0xa4')](_0x7afd32[_0x1582('0x143')]);_0x3988d8[_0x1582('0x142')]=_0x31b574;return _0x3988d8;};_0x4d2b9a['fn'][_0x1582('0x144')]=function(){_0x1582('0x27')===typeof console&&_0x1582('0x8')===typeof console[_0x1582('0x2a')]&&console['info']('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x4d2b9a['smartCart']=_0x4d2b9a['fn'][_0x1582('0x144')];}catch(_0x4c212b){'undefined'!==typeof console&&_0x1582('0x8')===typeof console[_0x1582('0x11')]&&console['error'](_0x1582('0x5d'),_0x4c212b);}}());

/* Quatro Digital - Affix // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(F,d){if("function"!==typeof d.fn.QD_affix){var y=function(a,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var c;"object"===typeof a?(a.unshift("[Quatro Digital - Affix]\n"),c=a):c=["[Quatro Digital - Affix]\n"+a];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,c)}catch(d){try{console.info(c.join("\n"))}catch(e){}}else try{console.error.apply(console,
c)}catch(k){try{console.error(c.join("\n"))}catch(g){}}else try{console.warn.apply(console,c)}catch(p){try{console.warn(c.join("\n"))}catch(q){}}}},u={topSpacing:20,bottomSpacing:20,bottomLimitSeletor:!1,css:{position:"relative"}},e=d(window);e.width();var k=e.height(),z=function(a){var b=a;d(function(){e.resize(function(){b()})});e.load(function(){b=function(){};e.resize(a)})};z(function(){e.width();k=e.height()});d(function(){e.width();k=e.height()});var E=function(a,b){if(a.is(".qd-affix-on"))return y("Execu\u00e7\u00e3o ignorada pois a classe 'qd-affix-on' foi encontrado o que significa que este elemento j\u00e1 teve o plugin aplicado",
"aviso"),a;a.addClass("qd-affix-on");try{a.css(b.css);var c,m,x=function(){m=c=a.offset();m.top=c.top-b.topSpacing};x();var t=!1;a.width();var g=a.height(),p=function(){a.width();g=a.height();t=g+b.topSpacing+b.bottomSpacing>k;r&&(l=q.offset())},q,r=!1,l;(function(){if(b.bottomLimitSeletor){q=d(b.bottomLimitSeletor).first();var a=q.offset();a&&(r=!0,l=a)}})();var h=0,v=0,A=0,B=0,f=0,C=!1,D=0,w=0,n=function(){clearTimeout(A);A=setTimeout(p,25);5>w&&(a[0].style.top=0,x(),w+=1);f=window.scrollY||document.documentElement.scrollTop;
C=0!==f&&f<=B?!0:!1;B=f;if(r&&t){if(f+k>l.top&&a.offset().top+b.topSpacing+g+b.bottomSpacing>l.top){a[0].style.top=l.top-c.top-(b.topSpacing+g+b.bottomSpacing)+"px";return}}else if(r&&f+b.topSpacing+g+b.bottomSpacing>l.top)return;t?C?(h=f-m.top,-1<h&&a.offset().top-b.topSpacing>f&&(a[0].style.top=f-m.top+"px")):(h=c.top+g+b.bottomSpacing,v=f+k,h<v?f+k>a.offset().top+g+b.bottomSpacing&&(a[0].style.top=v-h-b.bottomSpacing+"px"):a[0].style.top=0):(h=f-m.top,a[0].style.top=-1<h?h+"px":0)};e.scroll(function(){n();
clearTimeout(D);D=setTimeout(n,50)});z(function(){p();n()});e.load(function(){p();n()});n()}catch(u){y("Erro: "+u.message)}};d.fn.QD_affix=function(a){var b=d(this);if(!b.length)return b;var c=d.extend({},u,a);b.each(function(){var a=d(this);a.qdPlugin=new E(a,c)});return b};d(function(){d(".qd_auto_affix").QD_affix()})}})(window,jQuery);