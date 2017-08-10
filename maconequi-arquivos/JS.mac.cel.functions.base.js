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
            } else if (jssalesChannel == "4" && $(document.body).is('.qd-sc-4')) {
                $('.header-qd-v1-amazing-default').hide();
                $('.header-qd-v1-amazing-reseller').show().QD_amazingMenu();
                $('.header-qd-v1-amazing-reseller-mobile').attr('style', '').QD_amazingMenu().addClass('active');
                $('.header-qd-v1-amazing-default-mobile').attr('style', 'display: none !important;');
            }

            $('.header-qd-v1-main-amazing-menu').QD_amazingMenu();

            // Amazing Menu Responsivo
            $(".header-qd-v1-amazing-menu-toggle").click(function() {
                $("body").toggleClass('qd-am-on');
            });

            $(".qd-am-overlay").click(function() {
                $("body").removeClass('qd-am-on');
            });

            $(".floating-qd-v1-call-amazing-menu").click(function() {
                $("body").toggleClass('qd-am-toggle');
            });

            var wrapperMobile = $(".header-qd-v1-main-amazing-menu-mobile");

            wrapperMobile.find('> ul > li a[href="#"]').click(function(evt) {
                evt.preventDefault();
                $(this).parent().toggleClass('qd-am-dropdown-active');
            });

            wrapperMobile.after('<span class="btn-close-mobile"><i class="fa fa-times-circle"></i></span>');

            $(".btn-close-mobile").click(function() {
                $("body").removeClass('qd-am-on');
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
            if (ShippingValue)
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

                    Institutional.checkEmailExist(inputs.filter("[name='qd_form_email']").val() || "").always(function() { loading.slideUp(); }).done(function(data) {
                        if (data.length)
                            return;

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
/* Quatro Digital Plus Smart Cart // 6.10 // Carlos Vinicius // Todos os direitos reservados */
eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) { d[e(c)] = k[c] || e(c) } k = [function (e) { return d[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) { if (k[c]) { p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]) } } return p }('(7(){1e{i.1q=i.1q||{},i.1q.1T=i.1q.1T||$.6V()}1a(l){"V"!==C M&&"7"===C M.1c&&M.1c("2e! ",l.30)}})();(7(l){1e{B a=36,k=7(a,c){P("1u"===C M&&"V"!==C M.1c&&"V"!==C M.1G&&"V"!==C M.2Q){B h;"1u"===C a?(a.6Q("[2O 2N - 2y 2P]\\n"),h=a):h=["[2O 2N - 2y 2P]\\n"+a];P("V"===C c||"3s"!==c.2T()&&"3f"!==c.2T())P("V"!==C c&&"1G"===c.2T())1e{M.1G.2H(M,h)}1a(e){1e{M.1G(h.1F("\\n"))}1a(d){}}1v 1e{M.1c.2H(M,h)}1a(e){1e{M.1c(h.1F("\\n"))}1a(d){}}1v 1e{M.2Q.2H(M,h)}1a(e){1e{M.2Q(h.1F("\\n"))}1a(d){}}}};i.F=i.F||{};i.F.2j=!0;a.1K=7(){};a.1j.1K=7(){U{1j:37 a}};B f=7(a){B c={j:"6N%S%2I%S%1B%S%1C",6x:"6v%S%1B%S%1C",6s:"6t%S%6A%S%1B%S%1C",6L:"7T%S%3Z%S%1B%S%1C",7o:"7p%S%3H%S%1B%S%1C",7l:"7g%S%6E%S%5i%S%1B%S%1C","48%5j":"2%2I%S%3Z%S%1B%S%1C","48%S":"%2I%S%3H%S%1B%S%1C"};U 7(a){B e=7(a){U a};B d=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];a=a["d"+d[16]+"c"+d[17]+"m"+e(d[1])+"n"+d[13]]["l"+d[18]+"c"+d[0]+"5T"+e("o")+"n"];B k=7(a){U 5W(5S(a.1m(/\\./g,"\\5O").1m(/[a-5g-Z]/g,7(a){U 5Q.5P(("Z">=a?5M:5N)>=(a=a.5R(0)+13)?a:a-26)})))};B h=k(a[[d[9],e("o"),d[12],d[e(13)]].1F("")]);k=k((i[["1D",e("2z"),"m",d[1],d[4].5V(),"5U"].1F("")]||"---")+[".v",d[13],"e",e("x"),"5L",e("5K"),"5C",d[1],".c",e("o"),"m.",d[19],"r"].1F(""));22(B f 2x c){P(k===f+c[f]||h===f+c[f]){B g="5B"+d[17]+"e";5A}g="f"+d[0]+"5y"+e(d[1])+""}e=!1;-1<a[[d[12],"e",d[0],"5z",d[9]].1F("")].5E("5J%3S%3R%3G%2U%3b%2U%5I%5H%5F%3O%5G%3O%5Y%2U%3b%3S%3R%3G%6c%3b")&&(e=!0);U[g,e]}(a)}(i);P(!6h(f[0]))U f[1]?k("\\6i\\6m\\3V \\6l\\1N\\6k\\6j\\45\\1N\\45\\3V \\63\\1N\\62\\1N \\61\\5Z\\60\\1N L\\64\\1N!"):!1;a.1K=7(f,c){B h=a(f);P(!h.1r)U h;B e=a.4u(!0,{},{21:!0,11:{47:"69 39 68",3M:"67 66",1p:"<D><I>4y: #G</I><I>5x: #3d</I></D><D><I>5p: #1J</I><I>50: #3a</I></D>",2i:"4Z 1M 4Y n\\T 4w 4W 4t.",3I:"4X 51",3P:\'<42 22="6-8-3x">52 4D: </42><20 3U="56" 1Q="6-8-3x" 54="4c" />\'},2g:4V,29:!0,2C:7(a){U a.2C||a.3B},1T:7(){},2h:7(){}},c);a("");B d=J;P(e.29){B g=!1;"V"===C i.2u&&(k("A 3h 31.1D n\\T 1h 3Q. o 57 40\\2L 4T 2z 4K"),a.4N({4M:"//3u.1i.2M.3j/1i.1D/1.0.0/1i.3w.1D",4L:!1,4U:"4O",1c:7(){k("N\\T 1h 1z\\1A 3e \'//3u.1i.2M.3j/1i.1D/1.0.0/1i.3w.1D\' o 2y n\\T 4Q\\2L 53.");g=!0}}));P(g)U k("A 5w\\1H\\T 1x 2y 5o\\2L 5n 5m!")}P("1u"===C i.2u&&"V"!==C i.2u.1n)B l=i.2u.1n;1v P("1u"===C 1i&&"1u"===C 1i.1n&&"V"!==C 1i.1n.3D)l=37 1i.1n.3D;1v U k("N\\T 1h 3Q a 3h 31.1D");d.3L=\'<D E="6-8-1w 6-8-32"><D E="6-8-4s"><D E="3z"></D><D E="6-8-5s"><D E="6-8-2i"><p></p></D><D E="6-8-3r 6-8-5l"><a 1y="#" E="6-8-3X"></a><D E="6-8-2K"> <D E="6-8-2E"></D> </D><I E="6-8-5k"></I><a 1y="#" E="6-8-43"></a></D><D E="6-8-3r 6-8-1G"><D E="6-8-1J"></D><D E="6-8-3N"></D><D E="6-8-5c"><a 1y="/1n/#/28" E="6-8-49"></a><a 1y="#" E="2G"></a><a 1y="/1n/#/5b" E="6-8-1n"></a></D></D></D></D></D>\';B u=7(b){a(J).2X(b);b.H(".2G, .3z").1R(a(".5a")).15("1U.2B",7(){h.X("6-2v-3l");a(2A.25).X("6-2v-3W")});a(2A).5e("2f.2B").15("2f.2B",7(b){27==b.4G&&(h.X("6-2v-3l"),a(2A.25).X("6-2v-3W"))});B q=b.H(".6-8-2K");b.H(".6-8-3X").15("1U.6n",7(){d.2o("-",1b 0,1b 0,q);U!1});b.H(".6-8-43").15("1U.7w",7(){d.2o(1b 0,1b 0,1b 0,q);U!1});b.H(".6-8-1J 20").1f("").15("2f.7v",7(){d.4H(a(J))});P(e.21){B c=0;a(J).15("7u.4b",7(){B b=7(){i.F.2j&&(d.1S(),i.F.2j=!1,a.1j.2s(!0),d.2b())};c=7s(7(){b()},7t);b()});a(J).15("7x.4b",7(){7y(c)})}};B v=7(b){b=a(b);e.11.1p=e.11.1p.1m("#3d",\'<I E="6-8-3K"></I>\');e.11.1p=e.11.1p.1m("#G",\'<I E="6-8-3E"></I>\');e.11.1p=e.11.1p.1m("#1J",\'<I E="6-8-3C"></I>\');e.11.1p=e.11.1p.1m("#3a",\'<I E="6-8-3F"></I>\');b.H(".6-8-49").1k(e.11.47);b.H(".2G").1k(e.11.3I);b.H(".6-8-1n").1k(e.11.3M);b.H(".6-8-3N").1k(e.11.1p);b.H(".6-8-1J").1k(e.11.3P);b.H(".6-8-2i p").1k(e.11.2i);U b}(J.3L);B r=0;h.2c(7(){0<r?u.1g(J,v.7k()):u.1g(J,v);r++});i.1q.1T.1R(7(){a(".6-8-3K").1k(i.1q.3a||"--");a(".6-8-3E").1k(i.1q.1P||"0");a(".6-8-3C").1k(i.1q.1J||"--");a(".6-8-3F").1k(i.1q.7W||"--")});B t=7(a,e){P("V"===C a.G)U k("N\\T 1h 1z\\1A 3e 1W G 4r 7V\\1H\\T");d.3T.1g(J,e)};d.1S=7(b,d){"V"!=C d?i.F.2q=d:i.F.2q&&(d=i.F.2q);2W(7(){i.F.2q=1b 0},e.2g);a(".6-8-1w").X("6-8-3J");P(e.29){B c=7(b){i.F.Q=b;t(b,d);"V"!==C i.K&&"7"===C i.K.1E&&i.K.1E.1g(J);a(".6-8-1w").10("6-8-3J")};"V"!==C i.F.Q?(c(i.F.Q),"7"===C b&&b(i.F.Q)):a.7U(["G","2S","23"],{2m:7(a){c.1g(J,a);"7"===C b&&b(a)},2n:7(a){k(["N\\T 1h 1z\\1A 3e 1W 1Y 1x 1M",a])}})}1v 2J("81 m\\2l 2a 2k!")};d.2b=7(){B b=a(".6-8-1w");b.H(".6-8-2Z").1r?b.X("6-8-32"):b.10("6-8-32")};d.3T=7(b){B c=a(".6-8-2E");c.2Y();c.2c(7(){B c=a(J),q,f,n=a(""),p;22(p 2x i.F.Q.G)P("1u"===C i.F.Q.G[p]){B m=i.F.Q.G[p];B h=m.7J.1m(/^\\/|\\/$/g,"").7I("/");B g=a(\'<D E="6-8-2Z 7H"><D E="6-8-1Z 6-8-7F 6-8-7G"><D E="6-8-7K"><7L 3t="" E="6-8-3Y" /><I E="6-8-7Q"></I></D></D><D E="6-8-1Z 6-8-7P 6-8-4a"></D><D E="6-8-1Z 6-8-7O 6-8-44"></D><D E="6-8-1Z 6-8-7M 6-8-7N"><D E="6-8-3o 46"><a 1y="#" E="6-8-38"></a><20 3U="7d" E="6-8-1t" /><a 1y="#" E="6-8-35"></a><I E="6-8-6G"></I></D></D><D E="6-8-1Z 6-8-7e 6-8-6C"><D E="6-8-6D 46"><a 1y="#" E="6-8-1X"></a><I E="6-8-6M"></I></D></D></D>\');g.14({"W-Y":m.1Q,"W-Y-1o":p,"W-6-6K":h[0],"W-6-6J":h[h.1r-1]});g.10("6-8-"+m.6B);g.H(".6-8-4a").2X(e.2C(m));g.H(".6-8-44").2X(2F(m.2r)?m.2r:0==m.2r?"6p\\6q":(a("6u[3B=6z]").14("6y")||"R$")+" "+6w(m.2r/6O,2,",","."));g.H(".6-8-1t").14({"W-Y":m.1Q,"W-Y-1o":p}).1f(m.1t);g.H(".6-8-1X").14({"W-Y":m.1Q,"W-Y-1o":p});d.3m(m.1Q,g.H(".6-8-3Y"),m.75);g.H(".6-8-35,.6-8-38").14({"W-Y":m.1Q,"W-Y-1o":p});g.72(c);n=n.1R(g)}1e{B l=c.4C(".6-8-1w").H(".6-8-1J 20");l.1r&&""==l.1f()&&i.F.Q.23.41&&l.1f(i.F.Q.23.41.4I)}1a(w){k("4i 39 40 7c o 4c 2M 7a 79 1Y 1x 1n. 4z: "+w.30,"3f")}d.3y(c);d.2b();b&&b.3g&&7(){f=n.6T("[W-Y=\'"+b.3g+"\']");f.1r&&(q=0,n.2c(7(){B b=a(J);P(b.6R(f))U!1;q+=b.6P()}),d.2o(1b 0,1b 0,q,c.1R(c.6U())),n.X("6-8-4d"),7(a){a.10("6-8-3n");a.10("6-8-4d");2W(7(){a.X("6-8-3n")},e.2g)}(f))}()});(7(){F.Q.G.1r?(a("25").X("6-8-28-2Y").10("6-8-28-3i 6-8-3p-1R-3A"),2W(7(){a("25").X("6-8-3p-1R-3A")},e.2g)):a("25").X("6-8-28-3i").10("6-8-28-2Y")})();"7"===C e.2h?e.2h.1g(J):k("2h n\\T \\1L 34 4A\\1H\\T")};d.3m=7(b,d,c){7 e(){d.X("6-3v").73(7(){a(J).10("6-3v")}).14("3t",c)}c?e():2F(b)?k("N\\T 1h 6H 34 7Z 4x a 7X e 7R 3q 2R","3s"):2J("4e\\1H\\T 2V \\1L 3q m\\2l 2k. 7i o 7z.")};d.3y=7(b){B c=7(b,c){B e=a(b);B n=e.14("W-Y");B f=e.14("W-Y-1o");P(n){B g=33(e.1f())||1;d.2t([n,f],g,g+1,7(a){e.1f(a);"7"===C c&&c()})}};B e=7(b,c){B e=a(b);B f=e.14("W-Y");B n=e.14("W-Y-1o");P(f){B g=33(e.1f())||2;d.2t([f,n],g,g-1,7(a){e.1f(a);"7"===C c&&c()})}};B g=7(b,e){B c=a(b);B f=c.14("W-Y");B n=c.14("W-Y-1o");P(f){B g=33(c.1f())||1;d.2t([f,n],1,g,7(a){c.1f(a);"7"===C e&&e()})}};B f=b.H(".6-8-3o:6o(.3k)");f.10("3k").2c(7(){B b=a(J);b.H(".6-8-35").15("1U.58",7(a){a.4F();f.10("6-1l");c(b.H(".6-8-1t"),7(){f.X("6-1l")})});b.H(".6-8-38").15("1U.5f",7(a){a.4F();f.10("6-1l");e(b.H(".6-8-1t"),7(){f.X("6-1l")})});b.H(".6-8-1t").15("5v.4J",7(){f.10("6-1l");g(J,7(){f.X("6-1l")})});b.H(".6-8-1t").15("2f.4J",7(a){13==a.4G&&(f.10("6-1l"),g(J,7(){f.X("6-1l")}))})});b.H(".6-8-2Z").2c(7(){B b=a(J);b.H(".6-8-1X").15("1U.7A",7(){b.10("6-1l");d.4l(a(J),7(a){a?b.4g(!0).7E(7(){b.1X();d.2b()}):b.X("6-1l")});U!1})})};d.4H=7(a){B b=a.1f(),b=b.1m(/[^0-9\\-]/g,""),b=b.1m(/([0-9]{5})\\-?([0-9])([0-9]{2})?/g,"$1-$2$3"),b=b.1m(/(.{9}).*/g,"$1");a.1f(b);9<=b.1r&&(a.W("4m")!=b&&l.78({4I:b,7b:"71"}).2m(7(a){i.F.Q=a;d.1S()}).2n(7(a){k(["N\\T 1h 1z\\1A 6W o 4D",a]);5q()}),a.W("4m",b))};d.2t=7(b,c,f,g){7 h(b){b="4n"!==C b?!1:b;d.1S();i.F.2j=!1;d.2b();"V"!==C i.K&&"7"===C i.K.1E&&i.K.1E.1g(J);"7"===C 2p&&2p();a.1j.2s(!0,1b 0,b);"7"===C g&&g(c)}f=f||1;P(1>f)U c;P(e.29){P("V"===C i.F.Q.G[b[1]])U k("N\\T 1h 1z\\1A 4o 1W 1Y 1x 1O. A 4p 4k \\1L 4j 4f 2R: i.F.Q.G["+b[1]+"]"),c;i.F.Q.G[b[1]].1t=f;i.F.Q.G[b[1]].1o=b[1];l.6X([i.F.Q.G[b[1]]],["G","2S","23"]).2m(7(a){i.F.Q=a;h(!0)}).2n(7(a){k(["N\\T 1h 1z\\1A 4q a 6Y 6Z 6S 2z 1M",a]);h()})}1v k("70\\1H\\T 2a m\\2l 2a 2k")};d.4l=7(b,c){7 d(b){b="4n"!==C b?!1:b;"V"!==C i.K&&"7"===C i.K.1E&&i.K.1E.1g(J);"7"===C 2p&&2p();a.1j.2s(!0,1b 0,b);"7"===C c&&c(f)}B f=!1,g=a(b).14("W-Y-1o");P(e.29){P("V"===C i.F.Q.G[g])U k("N\\T 1h 1z\\1A 4o 1W 1Y 1x 1O. A 4p 4k \\1L 4j 4f 2R: i.F.Q.G["+g+"]"),f;i.F.Q.G[g].1o=g;l.76([i.F.Q.G[g]],["G","2S","23"]).2m(7(a){f=!0;i.F.Q=a;t(a);d(!0)}).2n(7(a){k(["N\\T 1h 1z\\1A 6r o 1O 1x 1M",a]);d()})}1v 2J("4e\\1H\\T, 2V m\\2l 2a 2k.")};d.2o=7(b,c,e,d){d=d||a(".6-8-2K, .6-8-2E");b=b||"+";c=c||.9*d.6I();d.4g(!0,!0).6F({7n:2F(e)?b+"="+c+"7S":e})};e.21||(d.1S(),a.1j.2s(!0));a(i).15("80.4h 7Y.1i.4h",7(){1e{i.F.Q=1b 0,d.1S()}1a(b){k("4i 39 4q 1W 1Y 1x 1M a 7D 1x 7m 4r 31. 4z: "+b.30,"7f")}});"7"===C e.1T?e.1T.1g(J):k("7h n\\T \\1L 34 4A\\1H\\T")};a.1j.1K=7(f){B c=a(J);c.1j=37 a.1K(J,f);U c}}1a(g){"V"!==C M&&"7"===C M.1c&&M.1c("2e! ",g)}})(J);(7(l){1e{B a=36;i.K=i.K||{};i.K.G={};i.K.1V=!1;i.K.7j=!1;i.K.7q=!1;B k=7(){P(i.K.1V){B f=!1;B g={};i.K.G={};22(h 2x i.F.Q.G)P("1u"===C i.F.Q.G[h]){B c=i.F.Q.G[h];"V"!==C c.1d&&7r!==c.1d&&""!==c.1d&&(i.K.G["1I"+c.1d]=i.K.G["1I"+c.1d]||{},i.K.G["1I"+c.1d].4B=c.1d,g["1I"+c.1d]||(i.K.G["1I"+c.1d].1P=0),i.K.G["1I"+c.1d].1P+=c.1t,f=!0,g["1I"+c.1d]=!0)}B h=f}1v h=1b 0;i.K.1V&&(a(".6-1s-1w").1X(),a(".6-1s-1O-2D").X("6-1s-1O-2D"));22(B e 2x i.K.G){c=i.K.G[e];P("1u"!==C c)U;g=a("20.6-1d[3d="+c.4B+"]").4C("7B");P(i.K.1V||!g.H(".6-1s-1w").1r)f=a(\'<I E="6-1s-1w" 7C="4y 2z 1M 4x 2V 4t."><I E="6-1s-4s"><I E="6-1s-1P"></I></I></I>\'),f.H(".6-1s-1P").1k(c.1P),c=g.H(".5h"),c.1r?c.4E(f).10("6-1s-1O-2D"):g.4E(f)}h&&(i.K.1V=!1)};i.K.1E=7(){i.K.1V=!0;k.1g(J)};a(2A).5d(7(){k.1g(J)})}1a(f){"V"!==C M&&"7"===C M.1c&&M.1c("2e! ",f)}})(J);(7(){1e{B l=36,a,k={2d:".5t",24:{},2w:{}};l.5u=7(f){B g={};a=l.4u(!0,{},k,f);f=l(a.2d).1K(a.24);g.2w="V"!==C a.24.21&&!1===a.24.21?l(a.2d).4v(f.1j,a.2w):l(a.2d).4v(a.2w);g.24=f;U g};l.1j.3c=7(){"1u"===C M&&"7"===C M.1G&&M.1G("O 55 2P n\\T \\1L 65 6a 6b 6d. A 6e\\T 6f 6g\\5X 2a 5D 4w 4S\\4R 4P e 5r 1W 59 74 \\77 2O 2N.")};l.3c=l.1j.3c}1a(f){"V"!==C M&&"7"===C M.1c&&M.1c("2e! ",f)}})();', 62, 498, '||||||qd|function|ddc||||||||||window|||||||||||||||||||var|typeof|div|class|_QuatroDigital_DropDown|items|find|span|this|_QuatroDigital_AmountProduct||console|||if|getOrderForm||25C2|u00e3o|return|undefined|data|removeClass|sku||addClass|texts|||attr|on|||||catch|void|error|productId|try|val|call|foi|vtex|fn|html|loading|replace|checkout|index|cartTotal|_QuatroDigital_CartData|length|bap|quantity|object|else|wrapper|do|href|poss|u00edvel|25A8pbz|25A8oe|js|exec|join|info|u00e7|prod_|shipping|QD_dropDownCart|u00e9|carrinho|u0391|item|qtt|id|add|getCartInfoByUrl|callback|click|allowRecalculate|os|remove|dados|prodCell|input|updateOnlyHover|for|shippingData|dropDown|body|||cart|smartCheckout|esta|cartIsEmpty|each|selector|Oooops|keyup|timeRemoveNewItemClass|callbackProductsList|emptyCart|allowUpdate|descontinuado|u00e9todo|done|fail|scrollCart|adminCart|dataOptionsCache|sellingPrice|simpleCart|changeQantity|vtexjs|bb|buyButton|in|DropDown|no|document|qd_ddc_closeFn|skuName|added|prodWrapper2|isNaN|qd_ddc_continueShopping|apply|25A8znpbardhv|alert|prodWrapper|u00e1|com|Digital|Quatro|Cart|warn|SKU|totalizers|toLowerCase|D1|este|setTimeout|append|empty|prodRow|message|VTEX|noItems|parseInt|uma|quantityMore|jQuery|new|quantityMinus|ao|total|82|smartCart|value|obter|aviso|lastSku|biblioteca|rendered|br|qd_on|lightBoxProdAdd|insertProdImg|lastAdded|prodQttWrapper|product|um|row|alerta|src|io|loaded|min|cep|actionButtons|qd_ddc_lightBoxClose|time|name|infoTotalShipping|SDK|infoTotalItems|infoAllTotal|84|25A8igrkpbzzreprfgnoyr|continueShopping|prodLoaded|infoTotalValue|cartContainer|linkCheckout|infoTotal|C2|shippingForm|encontrada|B8|E0|renderProductsList|type|u0472|lightBoxBodyProdAdd|scrollUp|image|25A8igrkpbzzreprorgn|tentar|address|label|scrollDown|prodPrice|u2202|clearfix|linkCart|jjj|viewCart|prodName|qd_ddc_hover|CEP|lastAddedFixed|Aten|pelo|stop|qdDdcVtex|Problemas|composta|buscada|removeProduct|qdDdcLastPostalCode|boolean|localizar|chave|atualizar|da|wrapper2|produto|extend|QD_buyButton|tem|para|Itens|Detalhes|fun|prodId|getParent|frete|prepend|preventDefault|keyCode|shippingCalculate|postalCode|qd_ddc_change|CDN|async|url|ajax|script|restrita|ser|u00e7a|licen|buscar|dataType|5E3|nenhum|Continuar|ainda|Seu|Total|Comprando|Calcular|executado|placeholder|Smart|tel|Script|qd_ddc_more|direitos|qd_ddc_lightBoxOverlay|orderform|infoBts|ajaxStop|off|qd_ddc_minus|zA|qd_bap_wrapper_content|25A8dhngebqvtvgny|25C|prodLoading|products|aqui|por|par|Frete|updateCartData|todos|wrapper3|qdDdcContainer|QD_smartCart|focusout|execu|Subtotal|ls|rc|break|tr|erc|executando|indexOf|83d|A1g|CF|8F|qu|mm|co|90|122|u00a8|fromCharCode|String|charCodeAt|encodeURIComponent|ti|ite|toUpperCase|escape|u00ea|A1|u0abd|u01ac|u0aef|u0ae8|u03a1|u0472J|mais|Compra|Finalizar|Carrinho|Ir|iniciado|desta|C5|forma|vers|que|voc|eval|u0e17|u00a1|u2113|u221a|u00c3|qd_ddc_scrollUp|not|Gr|u00e1tis|remover|znp|bardhv|meta|pbardhv|qd_number_format|zn|content|currency|25A8igrkpbzzrepr|availability|prodRemove|removeWrapper|25A8igrk|animate|qttLoading|informada|height|category|departament|znpb|prodRowLoading|jj|100|outerHeight|unshift|is|itens|filter|parent|Callbacks|calcular|updateItems|quantidade|de|aten|BRA|appendTo|load|reservados|imageUrl|removeItems|u00e0|calculateShipping|nos|base|country|definir|text|column5|avisso|dhv|Callback|Contacte|buyButtonClicked|clone|znpbar|eveento|scrollTop|znpba|rdhv|quickViewUpdate|null|setInterval|600|mouseenter|qd_ddc_cep|qd_ddc_scrollDown|mouseleave|clearInterval|SAC|qd_ddc_remove|li|title|partir|slideUp|column1|prodImg|qd_ddc_prodRow|split|productCategoryIds|prodImgWrapper|img|column4|prodQtt|column3|column2|imgLoading|nem|px|ardhv|QD_checkoutQueue|requisi|allTotal|imagem|minicartUpdated|URL|productAddedToCart|Este'.split('|'), 0, {}));

/* Quatro Digital Smart Cart */
var _0xc6e7=['toUpperCase','ite','---','erc','qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82','ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-scrollUp','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','val','keyup.qd_ddc_cep','texts','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','#total','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','.qd-ddc-viewCart','linkCart','.qd_ddc_continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-infoTotal','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','_QuatroDigital_AmountProduct','exec','.qd-ddc-wrapper','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','cartIsEmpty','qd-ddc-noItems','empty','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','availability','.qd-ddc-prodPrice','sellingPrice','Grátis','.qd-ddc-remove','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','address','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','aviso','lastSku','[data-sku=\x27','outerHeight','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-cart-empty','qd-ddc-cart-rendered\x20qd-ddc-product-add-time','qd-ddc-product-add-time','qd-ddc-cart-rendered','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','actionButtons','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantity','.qd-ddc-quantityMinus','click.qd_ddc_minus','keyup.qd_ddc_change','click.qd_ddc_remove','removeProduct','slideUp','remove','shippingCalculate','$1-$2$3','calculateShipping','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','index','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','boolean','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','height','animate','updateOnlyHover','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','buyButtonClicked','quickViewUpdate','allowRecalculate','productId','prod_','prodId','.qd-bap-wrapper','.qd-bap-item-added','qd-bap-item-added','<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>','.qd-bap-qtt','ajaxStop','QD_smartCart','dropDown','smartCart','O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','function','prototype','trim','capitalize','slice','toLowerCase','qdAjax','qdAjaxQueue','jquery','000','error','extend','GET','object','data','stringify','type','jqXHR','ajax','done','success','fail','always','complete','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','4.0','simpleCart','getOrderForm','call','QuatroDigital_simpleCart','ajaxStopOn','alerta','warn','[Simple\x20Cart]\x0a','info','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','content','qd_simpleCartOpts','_QuatroDigital_CartData','Shipping','totalizers','value','total','shipping','currencySymbol','allTotal','qtt','showQuantityByItems','items','quantity','callback','fire','hide','filter','.singular','.plural','show','addClass','qd-emptyCart','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','cartTotalE','html','cartQttE','itemsTextE','each','find','cartTotal','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','checkout','SDK','shippingData','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','.qd_cart_auto','bind','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','QD_checkoutQueue','add','Callbacks','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','body','.productQuickView','Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.','location','href','#produto,\x20.produto','QD_buyButton','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','Método\x20descontinuado!','.btn-add-buy-button-asynchronous','.remove-href','qd-bb-active','children','append','<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>','.buy-in-page-button','isProductPage','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-lightBoxBodyProdAdd','buyButton','[href=\x27','qd-bb-itemAddBuyButtonWrapper','removeClass','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','getCartInfoByUrl','isSmartCheckout','allowUpdate','autoWatchBuyButton','unbind','click','mouseenter.qd_bb_buy_sc','indexOf','selectSkuMsg','?redirect=false&','execDefaultAction','redirect=true','queue','buyIfQuantityZeroed','test','match','productPageCallback','buyButtonClickCallback','pop','shift','asyncCallback','trigger','cartProductAdded.vtex','parent','_QuatroDigital_prodBuyCallback','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','url','/checkout/cart/add','productAddedToCart.qdSbbVtex','Oooops!\x20','unshift','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','apply','QD_dropDownCart','fromCharCode','charCodeAt'];(function(_0xb6136e,_0x1eff7c){var _0x2ba4d5=function(_0x64fada){while(--_0x64fada){_0xb6136e['push'](_0xb6136e['shift']());}};_0x2ba4d5(++_0x1eff7c);}(_0xc6e7,0x1cc));var _0x7c6e=function(_0x559d7d,_0x412197){_0x559d7d=_0x559d7d-0x0;var _0x20c960=_0xc6e7[_0x559d7d];return _0x20c960;};(function(_0x1c0c15){_0x1c0c15['fn'][_0x7c6e('0x0')]=_0x1c0c15['fn'][_0x7c6e('0x1')];}(jQuery));function qd_number_format(_0xf45cb0,_0x1cf7d1,_0x3cf5b7,_0x4d7e98){_0xf45cb0=(_0xf45cb0+'')[_0x7c6e('0x2')](/[^0-9+\-Ee.]/g,'');_0xf45cb0=isFinite(+_0xf45cb0)?+_0xf45cb0:0x0;_0x1cf7d1=isFinite(+_0x1cf7d1)?Math[_0x7c6e('0x3')](_0x1cf7d1):0x0;_0x4d7e98=_0x7c6e('0x4')===typeof _0x4d7e98?',':_0x4d7e98;_0x3cf5b7=_0x7c6e('0x4')===typeof _0x3cf5b7?'.':_0x3cf5b7;var _0x158dc4='',_0x158dc4=function(_0x59d315,_0x36cda0){var _0x1cf7d1=Math[_0x7c6e('0x5')](0xa,_0x36cda0);return''+(Math[_0x7c6e('0x6')](_0x59d315*_0x1cf7d1)/_0x1cf7d1)[_0x7c6e('0x7')](_0x36cda0);},_0x158dc4=(_0x1cf7d1?_0x158dc4(_0xf45cb0,_0x1cf7d1):''+Math[_0x7c6e('0x6')](_0xf45cb0))[_0x7c6e('0x8')]('.');0x3<_0x158dc4[0x0][_0x7c6e('0x9')]&&(_0x158dc4[0x0]=_0x158dc4[0x0][_0x7c6e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x4d7e98));(_0x158dc4[0x1]||'')['length']<_0x1cf7d1&&(_0x158dc4[0x1]=_0x158dc4[0x1]||'',_0x158dc4[0x1]+=Array(_0x1cf7d1-_0x158dc4[0x1][_0x7c6e('0x9')]+0x1)[_0x7c6e('0xa')]('0'));return _0x158dc4[_0x7c6e('0xa')](_0x3cf5b7);};_0x7c6e('0xb')!==typeof String[_0x7c6e('0xc')][_0x7c6e('0xd')]&&(String[_0x7c6e('0xc')]['trim']=function(){return this[_0x7c6e('0x2')](/^\s+|\s+$/g,'');});'function'!=typeof String[_0x7c6e('0xc')][_0x7c6e('0xe')]&&(String[_0x7c6e('0xc')][_0x7c6e('0xe')]=function(){return this['charAt'](0x0)['toUpperCase']()+this[_0x7c6e('0xf')](0x1)[_0x7c6e('0x10')]();});(function(_0x28dd31){if(_0x7c6e('0xb')!==typeof _0x28dd31[_0x7c6e('0x11')]){var _0x493f4d={};_0x28dd31[_0x7c6e('0x12')]=_0x493f4d;0x96>parseInt((_0x28dd31['fn'][_0x7c6e('0x13')]['replace'](/[^0-9]+/g,'')+_0x7c6e('0x14'))[_0x7c6e('0xf')](0x0,0x3),0xa)&&console&&_0x7c6e('0xb')==typeof console[_0x7c6e('0x15')]&&console['error']();_0x28dd31['qdAjax']=function(_0x38243f){try{var _0x4d9c66=_0x28dd31[_0x7c6e('0x16')]({},{'url':'','type':_0x7c6e('0x17'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x38243f);var _0x3dff99=_0x7c6e('0x18')===typeof _0x4d9c66[_0x7c6e('0x19')]?JSON[_0x7c6e('0x1a')](_0x4d9c66[_0x7c6e('0x19')]):_0x4d9c66['data']['toString']();var _0x3ef16c=encodeURIComponent(_0x4d9c66['url']+'|'+_0x4d9c66[_0x7c6e('0x1b')]+'|'+_0x3dff99);_0x493f4d[_0x3ef16c]=_0x493f4d[_0x3ef16c]||{};_0x7c6e('0x4')==typeof _0x493f4d[_0x3ef16c]['jqXHR']?_0x493f4d[_0x3ef16c][_0x7c6e('0x1c')]=_0x28dd31[_0x7c6e('0x1d')](_0x4d9c66):(_0x493f4d[_0x3ef16c][_0x7c6e('0x1c')][_0x7c6e('0x1e')](_0x4d9c66[_0x7c6e('0x1f')]),_0x493f4d[_0x3ef16c][_0x7c6e('0x1c')][_0x7c6e('0x20')](_0x4d9c66['error']),_0x493f4d[_0x3ef16c][_0x7c6e('0x1c')][_0x7c6e('0x21')](_0x4d9c66[_0x7c6e('0x22')]));_0x493f4d[_0x3ef16c]['jqXHR'][_0x7c6e('0x21')](function(){isNaN(parseInt(_0x4d9c66[_0x7c6e('0x23')]))||setTimeout(function(){_0x493f4d[_0x3ef16c][_0x7c6e('0x1c')]=void 0x0;},_0x4d9c66[_0x7c6e('0x23')]);});return _0x493f4d[_0x3ef16c][_0x7c6e('0x1c')];}catch(_0x34bc78){'undefined'!==typeof console&&_0x7c6e('0xb')===typeof console[_0x7c6e('0x15')]&&console[_0x7c6e('0x15')](_0x7c6e('0x24')+_0x34bc78[_0x7c6e('0x25')]);}};_0x28dd31['qdAjax']['version']=_0x7c6e('0x26');}}(jQuery));(function(_0x37b031){_0x37b031['fn'][_0x7c6e('0x0')]=_0x37b031['fn'][_0x7c6e('0x1')];}(jQuery));(function(){var _0x32ed65=jQuery;if('function'!==typeof _0x32ed65['fn'][_0x7c6e('0x27')]){_0x32ed65(function(){var _0x43a068=vtexjs['checkout'][_0x7c6e('0x28')];vtexjs['checkout'][_0x7c6e('0x28')]=function(){return _0x43a068[_0x7c6e('0x29')]();};});try{window[_0x7c6e('0x2a')]=window[_0x7c6e('0x2a')]||{};window[_0x7c6e('0x2a')][_0x7c6e('0x2b')]=!0x1;_0x32ed65['fn'][_0x7c6e('0x27')]=function(_0x334028,_0x3eb8db,_0x4810de){var _0x5ef395=function(_0x16f673,_0x51ca6b){if('object'===typeof console){var _0x190217=_0x7c6e('0x18')===typeof _0x16f673;_0x7c6e('0x4')!==typeof _0x51ca6b&&_0x7c6e('0x2c')===_0x51ca6b[_0x7c6e('0x10')]()?_0x190217?console[_0x7c6e('0x2d')](_0x7c6e('0x2e'),_0x16f673[0x0],_0x16f673[0x1],_0x16f673[0x2],_0x16f673[0x3],_0x16f673[0x4],_0x16f673[0x5],_0x16f673[0x6],_0x16f673[0x7]):console['warn'](_0x7c6e('0x2e')+_0x16f673):_0x7c6e('0x4')!==typeof _0x51ca6b&&_0x7c6e('0x2f')===_0x51ca6b[_0x7c6e('0x10')]()?_0x190217?console[_0x7c6e('0x2f')](_0x7c6e('0x2e'),_0x16f673[0x0],_0x16f673[0x1],_0x16f673[0x2],_0x16f673[0x3],_0x16f673[0x4],_0x16f673[0x5],_0x16f673[0x6],_0x16f673[0x7]):console['info'](_0x7c6e('0x2e')+_0x16f673):_0x190217?console[_0x7c6e('0x15')](_0x7c6e('0x2e'),_0x16f673[0x0],_0x16f673[0x1],_0x16f673[0x2],_0x16f673[0x3],_0x16f673[0x4],_0x16f673[0x5],_0x16f673[0x6],_0x16f673[0x7]):console[_0x7c6e('0x15')](_0x7c6e('0x2e')+_0x16f673);}};var _0x5d82bd=_0x32ed65(this);'object'===typeof _0x334028?_0x3eb8db=_0x334028:(_0x334028=_0x334028||!0x1,_0x5d82bd=_0x5d82bd['add'](_0x32ed65[_0x7c6e('0x30')][_0x7c6e('0x31')]));if(!_0x5d82bd[_0x7c6e('0x9')])return _0x5d82bd;_0x32ed65[_0x7c6e('0x30')][_0x7c6e('0x31')]=_0x32ed65[_0x7c6e('0x30')][_0x7c6e('0x31')]['add'](_0x5d82bd);_0x4810de=_0x7c6e('0x4')===typeof _0x4810de?!0x1:_0x4810de;var _0x1b4f92={'cartQtt':_0x7c6e('0x32'),'cartTotal':_0x7c6e('0x33'),'itemsText':_0x7c6e('0x34'),'currencySymbol':(_0x32ed65(_0x7c6e('0x35'))[_0x7c6e('0x36')](_0x7c6e('0x37'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x4040f8=_0x32ed65[_0x7c6e('0x16')]({},_0x1b4f92,_0x3eb8db);var _0x8f1213=_0x32ed65('');_0x5d82bd['each'](function(){var _0x9004c8=_0x32ed65(this);_0x9004c8[_0x7c6e('0x19')](_0x7c6e('0x38'))||_0x9004c8[_0x7c6e('0x19')]('qd_simpleCartOpts',_0x4040f8);});var _0x163771=function(_0x261d18){window[_0x7c6e('0x39')]=window[_0x7c6e('0x39')]||{};for(var _0x334028=0x0,_0x322c75=0x0,_0x321824=0x0;_0x321824<_0x261d18['totalizers'][_0x7c6e('0x9')];_0x321824++)_0x7c6e('0x3a')==_0x261d18[_0x7c6e('0x3b')][_0x321824]['id']&&(_0x322c75+=_0x261d18[_0x7c6e('0x3b')][_0x321824][_0x7c6e('0x3c')]),_0x334028+=_0x261d18[_0x7c6e('0x3b')][_0x321824][_0x7c6e('0x3c')];window['_QuatroDigital_CartData'][_0x7c6e('0x3d')]=_0x4040f8['currencySymbol']+qd_number_format(_0x334028/0x64,0x2,',','.');window[_0x7c6e('0x39')][_0x7c6e('0x3e')]=_0x4040f8[_0x7c6e('0x3f')]+qd_number_format(_0x322c75/0x64,0x2,',','.');window[_0x7c6e('0x39')][_0x7c6e('0x40')]=_0x4040f8[_0x7c6e('0x3f')]+qd_number_format((_0x334028+_0x322c75)/0x64,0x2,',','.');window[_0x7c6e('0x39')][_0x7c6e('0x41')]=0x0;if(_0x4040f8[_0x7c6e('0x42')])for(_0x321824=0x0;_0x321824<_0x261d18[_0x7c6e('0x43')][_0x7c6e('0x9')];_0x321824++)window[_0x7c6e('0x39')][_0x7c6e('0x41')]+=_0x261d18[_0x7c6e('0x43')][_0x321824][_0x7c6e('0x44')];else window['_QuatroDigital_CartData'][_0x7c6e('0x41')]=_0x261d18['items']['length']||0x0;try{window[_0x7c6e('0x39')][_0x7c6e('0x45')]&&window['_QuatroDigital_CartData'][_0x7c6e('0x45')]['fire']&&window[_0x7c6e('0x39')][_0x7c6e('0x45')][_0x7c6e('0x46')]();}catch(_0x4809e9){_0x5ef395('Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart');}_0x501fd6(_0x8f1213);};var _0x2ab950=function(_0x16ff38,_0x855144){0x1===_0x16ff38?_0x855144[_0x7c6e('0x47')]()[_0x7c6e('0x48')](_0x7c6e('0x49'))['show']():_0x855144[_0x7c6e('0x47')]()[_0x7c6e('0x48')](_0x7c6e('0x4a'))[_0x7c6e('0x4b')]();};var _0x1cfc76=function(_0x3b45bf){0x1>_0x3b45bf?_0x5d82bd[_0x7c6e('0x4c')](_0x7c6e('0x4d')):_0x5d82bd['removeClass'](_0x7c6e('0x4d'));};var _0x4aa3cf=function(_0x2fa543,_0x50d940){var _0x206b4a=parseInt(window[_0x7c6e('0x39')][_0x7c6e('0x41')],0xa);_0x50d940[_0x7c6e('0x4e')]['show']();isNaN(_0x206b4a)&&(_0x5ef395(_0x7c6e('0x4f'),_0x7c6e('0x2c')),_0x206b4a=0x0);_0x50d940[_0x7c6e('0x50')][_0x7c6e('0x51')](window[_0x7c6e('0x39')][_0x7c6e('0x3d')]);_0x50d940[_0x7c6e('0x52')][_0x7c6e('0x51')](_0x206b4a);_0x2ab950(_0x206b4a,_0x50d940[_0x7c6e('0x53')]);_0x1cfc76(_0x206b4a);};var _0x501fd6=function(_0x2825b4){_0x5d82bd[_0x7c6e('0x54')](function(){var _0x42e37e={};var _0x102a09=_0x32ed65(this);_0x334028&&_0x102a09[_0x7c6e('0x19')]('qd_simpleCartOpts')&&_0x32ed65[_0x7c6e('0x16')](_0x4040f8,_0x102a09['data']('qd_simpleCartOpts'));_0x42e37e[_0x7c6e('0x4e')]=_0x102a09;_0x42e37e['cartQttE']=_0x102a09[_0x7c6e('0x55')](_0x4040f8['cartQtt'])||_0x8f1213;_0x42e37e['cartTotalE']=_0x102a09[_0x7c6e('0x55')](_0x4040f8[_0x7c6e('0x56')])||_0x8f1213;_0x42e37e['itemsTextE']=_0x102a09[_0x7c6e('0x55')](_0x4040f8[_0x7c6e('0x57')])||_0x8f1213;_0x42e37e[_0x7c6e('0x58')]=_0x102a09[_0x7c6e('0x55')](_0x4040f8[_0x7c6e('0x59')])||_0x8f1213;_0x4aa3cf(_0x2825b4,_0x42e37e);_0x102a09[_0x7c6e('0x4c')](_0x7c6e('0x5a'));});};(function(){if(_0x4040f8[_0x7c6e('0x5b')]){window[_0x7c6e('0x5c')]=window['_QuatroDigital_DropDown']||{};if(_0x7c6e('0x4')!==typeof window['_QuatroDigital_DropDown'][_0x7c6e('0x28')]&&(_0x4810de||!_0x334028))return _0x163771(window['_QuatroDigital_DropDown']['getOrderForm']);if('object'!==typeof window[_0x7c6e('0x5d')]||'undefined'===typeof window[_0x7c6e('0x5d')]['checkout'])if(_0x7c6e('0x18')===typeof vtex&&_0x7c6e('0x18')===typeof vtex[_0x7c6e('0x5e')]&&_0x7c6e('0x4')!==typeof vtex[_0x7c6e('0x5e')][_0x7c6e('0x5f')])new vtex[(_0x7c6e('0x5e'))]['SDK']();else return _0x5ef395('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js');_0x32ed65['QD_checkoutQueue']([_0x7c6e('0x43'),_0x7c6e('0x3b'),_0x7c6e('0x60')],{'done':function(_0x408317){_0x163771(_0x408317);window['_QuatroDigital_DropDown'][_0x7c6e('0x28')]=_0x408317;},'fail':function(_0x26f731){_0x5ef395(['Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.',_0x26f731]);}});}else alert(_0x7c6e('0x61'));}());_0x4040f8[_0x7c6e('0x45')]();_0x32ed65(window)['trigger'](_0x7c6e('0x62'));return _0x5d82bd;};_0x32ed65['QD_simpleCart']={'elements':_0x32ed65('')};_0x32ed65(function(){var _0x411ca6;'function'===typeof window[_0x7c6e('0x63')]&&(_0x411ca6=window[_0x7c6e('0x63')],window[_0x7c6e('0x63')]=function(_0x1d2a68,_0x5c09db,_0xbaad57,_0x30b62e,_0x3b1510){_0x411ca6[_0x7c6e('0x29')](this,_0x1d2a68,_0x5c09db,_0xbaad57,_0x30b62e,function(){_0x7c6e('0xb')===typeof _0x3b1510&&_0x3b1510();_0x32ed65[_0x7c6e('0x30')][_0x7c6e('0x31')][_0x7c6e('0x54')](function(){var _0x568bea=_0x32ed65(this);_0x568bea[_0x7c6e('0x27')](_0x568bea[_0x7c6e('0x19')]('qd_simpleCartOpts'));});});});});var _0x593a40=window['ReloadItemsCart']||void 0x0;window['ReloadItemsCart']=function(_0x1919db){_0x32ed65['fn'][_0x7c6e('0x27')](!0x0);_0x7c6e('0xb')===typeof _0x593a40?_0x593a40[_0x7c6e('0x29')](this,_0x1919db):alert(_0x1919db);};_0x32ed65(function(){var _0x5e5924=_0x32ed65(_0x7c6e('0x64'));_0x5e5924[_0x7c6e('0x9')]&&_0x5e5924[_0x7c6e('0x27')]();});_0x32ed65(function(){_0x32ed65(window)[_0x7c6e('0x65')](_0x7c6e('0x66'),function(){_0x32ed65['fn'][_0x7c6e('0x27')](!0x0);});});}catch(_0x36dee4){_0x7c6e('0x4')!==typeof console&&_0x7c6e('0xb')===typeof console[_0x7c6e('0x15')]&&console[_0x7c6e('0x15')]('Oooops!\x20',_0x36dee4);}}}());(function(){var _0x5eb049=function(_0x4204c2,_0x1e1e74){if(_0x7c6e('0x18')===typeof console){var _0x47fb01=_0x7c6e('0x18')===typeof _0x4204c2;_0x7c6e('0x4')!==typeof _0x1e1e74&&_0x7c6e('0x2c')===_0x1e1e74[_0x7c6e('0x10')]()?_0x47fb01?console[_0x7c6e('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x4204c2[0x0],_0x4204c2[0x1],_0x4204c2[0x2],_0x4204c2[0x3],_0x4204c2[0x4],_0x4204c2[0x5],_0x4204c2[0x6],_0x4204c2[0x7]):console[_0x7c6e('0x2d')](_0x7c6e('0x67')+_0x4204c2):_0x7c6e('0x4')!==typeof _0x1e1e74&&_0x7c6e('0x2f')===_0x1e1e74['toLowerCase']()?_0x47fb01?console['info'](_0x7c6e('0x67'),_0x4204c2[0x0],_0x4204c2[0x1],_0x4204c2[0x2],_0x4204c2[0x3],_0x4204c2[0x4],_0x4204c2[0x5],_0x4204c2[0x6],_0x4204c2[0x7]):console['info'](_0x7c6e('0x67')+_0x4204c2):_0x47fb01?console[_0x7c6e('0x15')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x4204c2[0x0],_0x4204c2[0x1],_0x4204c2[0x2],_0x4204c2[0x3],_0x4204c2[0x4],_0x4204c2[0x5],_0x4204c2[0x6],_0x4204c2[0x7]):console[_0x7c6e('0x15')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a'+_0x4204c2);}},_0xe1ccf1=null,_0x11d1e5={},_0x37a27e={},_0x2f60ae={};$[_0x7c6e('0x68')]=function(_0x4f8d73,_0x31f6e3){if(null===_0xe1ccf1)if(_0x7c6e('0x18')===typeof window[_0x7c6e('0x5d')]&&_0x7c6e('0x4')!==typeof window['vtexjs']['checkout'])_0xe1ccf1=window[_0x7c6e('0x5d')][_0x7c6e('0x5e')];else return _0x5eb049('Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js');var _0x12dcfd=$['extend']({'done':function(){},'fail':function(){}},_0x31f6e3),_0x34a0a3=_0x4f8d73['join'](';'),_0x2eeb39=function(){_0x11d1e5[_0x34a0a3][_0x7c6e('0x69')](_0x12dcfd[_0x7c6e('0x1e')]);_0x37a27e[_0x34a0a3][_0x7c6e('0x69')](_0x12dcfd[_0x7c6e('0x20')]);};_0x2f60ae[_0x34a0a3]?_0x2eeb39():(_0x11d1e5[_0x34a0a3]=$[_0x7c6e('0x6a')](),_0x37a27e[_0x34a0a3]=$['Callbacks'](),_0x2eeb39(),_0x2f60ae[_0x34a0a3]=!0x0,_0xe1ccf1[_0x7c6e('0x28')](_0x4f8d73)[_0x7c6e('0x1e')](function(_0x122fcc){_0x2f60ae[_0x34a0a3]=!0x1;_0x11d1e5[_0x34a0a3][_0x7c6e('0x46')](_0x122fcc);})['fail'](function(_0x16064e){_0x2f60ae[_0x34a0a3]=!0x1;_0x37a27e[_0x34a0a3]['fire'](_0x16064e);}));};}());(function(_0x380c8e){try{var _0x5c584e=jQuery,_0x1021b0,_0x57bbf9=_0x5c584e({}),_0x5de296=function(_0x39c36c,_0x4839f7){if(_0x7c6e('0x18')===typeof console&&_0x7c6e('0x4')!==typeof console['error']&&'undefined'!==typeof console[_0x7c6e('0x2f')]&&_0x7c6e('0x4')!==typeof console['warn']){var _0x563f1f;'object'===typeof _0x39c36c?(_0x39c36c['unshift']('[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a'),_0x563f1f=_0x39c36c):_0x563f1f=[_0x7c6e('0x6b')+_0x39c36c];if(_0x7c6e('0x4')===typeof _0x4839f7||'alerta'!==_0x4839f7[_0x7c6e('0x10')]()&&'aviso'!==_0x4839f7[_0x7c6e('0x10')]())if(_0x7c6e('0x4')!==typeof _0x4839f7&&'info'===_0x4839f7['toLowerCase']())try{console[_0x7c6e('0x2f')]['apply'](console,_0x563f1f);}catch(_0x5250a8){try{console['info'](_0x563f1f[_0x7c6e('0xa')]('\x0a'));}catch(_0x28cdd7){}}else try{console['error']['apply'](console,_0x563f1f);}catch(_0x45c50b){try{console[_0x7c6e('0x15')](_0x563f1f[_0x7c6e('0xa')]('\x0a'));}catch(_0x16140c){}}else try{console[_0x7c6e('0x2d')]['apply'](console,_0x563f1f);}catch(_0x39a146){try{console[_0x7c6e('0x2d')](_0x563f1f[_0x7c6e('0xa')]('\x0a'));}catch(_0x45bce7){}}}},_0xaa3cf5={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x7c6e('0x6c'),'buyQtt':_0x7c6e('0x6d'),'selectSkuMsg':_0x7c6e('0x6e'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0x4e9364,_0x14f84d,_0xfdad48){_0x5c584e(_0x7c6e('0x6f'))['is'](_0x7c6e('0x70'))&&('success'===_0x14f84d?alert('Produto\x20adicionado\x20ao\x20carrinho!'):(alert(_0x7c6e('0x71')),('object'===typeof parent?parent:document)[_0x7c6e('0x72')][_0x7c6e('0x73')]=_0xfdad48));},'isProductPage':function(){return _0x5c584e('body')['is'](_0x7c6e('0x74'));},'execDefaultAction':function(_0x458dbf){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x5c584e[_0x7c6e('0x75')]=function(_0x186ac7,_0x59e995){function _0x1e20a0(_0x327f1c){_0x1021b0['isSmartCheckout']?_0x327f1c[_0x7c6e('0x19')](_0x7c6e('0x76'))||(_0x327f1c[_0x7c6e('0x19')](_0x7c6e('0x76'),0x1),_0x327f1c['on'](_0x7c6e('0x77'),function(_0x7c8d37){if(!_0x1021b0[_0x7c6e('0x78')]())return!0x0;if(!0x0!==_0x6caf99[_0x7c6e('0x79')][_0x7c6e('0x29')](this))return _0x7c8d37[_0x7c6e('0x7a')](),!0x1;})):alert(_0x7c6e('0x7b'));}function _0x2a0850(_0x2a234b){_0x2a234b=_0x2a234b||_0x5c584e(_0x1021b0['buyButton']);_0x2a234b['each'](function(){var _0x2a234b=_0x5c584e(this);_0x2a234b['is']('.qd-sbb-on')||(_0x2a234b['addClass']('qd-sbb-on'),_0x2a234b['is'](_0x7c6e('0x7c'))&&!_0x2a234b['is'](_0x7c6e('0x7d'))||_0x2a234b[_0x7c6e('0x19')](_0x7c6e('0x7e'))||(_0x2a234b[_0x7c6e('0x19')](_0x7c6e('0x7e'),0x1),_0x2a234b[_0x7c6e('0x7f')]('.qd-bb-productAdded')[_0x7c6e('0x9')]||_0x2a234b[_0x7c6e('0x80')](_0x7c6e('0x81')),_0x2a234b['is'](_0x7c6e('0x82'))&&_0x1021b0[_0x7c6e('0x83')]()&&_0x3bc5f3[_0x7c6e('0x29')](_0x2a234b),_0x1e20a0(_0x2a234b)));});_0x1021b0[_0x7c6e('0x83')]()&&!_0x2a234b[_0x7c6e('0x9')]&&_0x5de296('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x2a234b[_0x7c6e('0x84')]+'\x27.',_0x7c6e('0x2f'));}var _0x12ae24=_0x5c584e(_0x186ac7);var _0x6caf99=this;window[_0x7c6e('0x85')]=window[_0x7c6e('0x85')]||{};window['_QuatroDigital_CartData']=window['_QuatroDigital_CartData']||{};_0x6caf99[_0x7c6e('0x86')]=function(_0x156df7,_0x28f088){_0x12ae24[_0x7c6e('0x4c')]('qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd');_0x5c584e(_0x7c6e('0x6f'))[_0x7c6e('0x4c')](_0x7c6e('0x87'));var _0x3aa905=_0x5c584e(_0x1021b0[_0x7c6e('0x88')])[_0x7c6e('0x48')](_0x7c6e('0x89')+(_0x156df7[_0x7c6e('0x36')](_0x7c6e('0x73'))||'---')+'\x27]')[_0x7c6e('0x69')](_0x156df7);_0x3aa905[_0x7c6e('0x4c')](_0x7c6e('0x8a'));setTimeout(function(){_0x12ae24[_0x7c6e('0x8b')](_0x7c6e('0x8c'));_0x3aa905[_0x7c6e('0x8b')](_0x7c6e('0x8a'));},_0x1021b0[_0x7c6e('0x8d')]);window['_Quatro_Digital_dropDown'][_0x7c6e('0x28')]=void 0x0;if(_0x7c6e('0x4')!==typeof _0x59e995&&_0x7c6e('0xb')===typeof _0x59e995[_0x7c6e('0x8e')])return _0x1021b0[_0x7c6e('0x8f')]||(_0x5de296('função\x20descontinuada'),_0x59e995[_0x7c6e('0x8e')]()),window[_0x7c6e('0x5c')][_0x7c6e('0x28')]=void 0x0,_0x59e995[_0x7c6e('0x8e')](function(_0x5269cc){window[_0x7c6e('0x85')][_0x7c6e('0x28')]=_0x5269cc;_0x5c584e['fn'][_0x7c6e('0x27')](!0x0,void 0x0,!0x0);},{'lastSku':_0x28f088});window[_0x7c6e('0x85')][_0x7c6e('0x90')]=!0x0;_0x5c584e['fn'][_0x7c6e('0x27')](!0x0);};(function(){if(_0x1021b0['isSmartCheckout']&&_0x1021b0[_0x7c6e('0x91')]){var _0x353583=_0x5c584e('.btn-add-buy-button-asynchronous');_0x353583[_0x7c6e('0x9')]&&_0x2a0850(_0x353583);}}());var _0x3bc5f3=function(){var _0x4ac43a=_0x5c584e(this);_0x7c6e('0x4')!==typeof _0x4ac43a[_0x7c6e('0x19')](_0x7c6e('0x88'))?(_0x4ac43a[_0x7c6e('0x92')](_0x7c6e('0x93')),_0x1e20a0(_0x4ac43a)):(_0x4ac43a['bind'](_0x7c6e('0x94'),function(_0x13182f){_0x4ac43a[_0x7c6e('0x92')](_0x7c6e('0x93'));_0x1e20a0(_0x4ac43a);_0x5c584e(this)[_0x7c6e('0x92')](_0x13182f);}),_0x5c584e(window)['load'](function(){_0x4ac43a['unbind'](_0x7c6e('0x93'));_0x1e20a0(_0x4ac43a);_0x4ac43a[_0x7c6e('0x92')](_0x7c6e('0x94'));}));};_0x6caf99[_0x7c6e('0x79')]=function(){var _0x587f55=_0x5c584e(this),_0x186ac7=_0x587f55[_0x7c6e('0x36')](_0x7c6e('0x73'))||'';if(-0x1<_0x186ac7[_0x7c6e('0x95')](_0x1021b0[_0x7c6e('0x96')]))return!0x0;_0x186ac7=_0x186ac7[_0x7c6e('0x2')](/redirect\=(false|true)/gi,'')[_0x7c6e('0x2')]('?',_0x7c6e('0x97'))[_0x7c6e('0x2')](/\&\&/gi,'&');if(_0x1021b0[_0x7c6e('0x98')](_0x587f55))return _0x587f55['attr'](_0x7c6e('0x73'),_0x186ac7[_0x7c6e('0x2')]('redirect=false',_0x7c6e('0x99'))),!0x0;_0x186ac7=_0x186ac7['replace'](/http.?:/i,'');_0x57bbf9[_0x7c6e('0x9a')](function(_0x5412ca){if(!_0x1021b0[_0x7c6e('0x9b')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x7c6e('0x9c')](_0x186ac7))return _0x5412ca();var _0x149e0e=function(_0x2fcab0,_0x2a3196){var _0x2a0850=_0x186ac7[_0x7c6e('0x9d')](/sku\=([0-9]+)/gi),_0x315552=[];if('object'===typeof _0x2a0850&&null!==_0x2a0850)for(var _0x58ab3f=_0x2a0850[_0x7c6e('0x9')]-0x1;0x0<=_0x58ab3f;_0x58ab3f--){var _0x4738ea=parseInt(_0x2a0850[_0x58ab3f][_0x7c6e('0x2')](/sku\=/gi,''));isNaN(_0x4738ea)||_0x315552['push'](_0x4738ea);}_0x1021b0[_0x7c6e('0x9e')][_0x7c6e('0x29')](this,_0x2fcab0,_0x2a3196,_0x186ac7);_0x6caf99[_0x7c6e('0x9f')][_0x7c6e('0x29')](this,_0x2fcab0,_0x2a3196,_0x186ac7,_0x315552);_0x6caf99[_0x7c6e('0x86')](_0x587f55,_0x186ac7[_0x7c6e('0x8')]('ku=')[_0x7c6e('0xa0')]()[_0x7c6e('0x8')]('&')[_0x7c6e('0xa1')]());'function'===typeof _0x1021b0[_0x7c6e('0xa2')]&&_0x1021b0[_0x7c6e('0xa2')][_0x7c6e('0x29')](this);_0x5c584e(window)[_0x7c6e('0xa3')]('productAddedToCart');_0x5c584e(window)[_0x7c6e('0xa3')](_0x7c6e('0xa4'));};_0x1021b0['fakeRequest']?(_0x149e0e(null,_0x7c6e('0x1f')),_0x5412ca()):_0x5c584e[_0x7c6e('0x1d')]({'url':_0x186ac7,'complete':_0x149e0e})[_0x7c6e('0x21')](function(){_0x5412ca();});});};_0x6caf99[_0x7c6e('0x9f')]=function(_0xe8acec,_0x2eaf3d,_0x4a18c0,_0x2d1267){try{_0x7c6e('0x1f')===_0x2eaf3d&&_0x7c6e('0x18')===typeof window[_0x7c6e('0xa5')]&&_0x7c6e('0xb')===typeof window['parent'][_0x7c6e('0xa6')]&&window[_0x7c6e('0xa5')][_0x7c6e('0xa6')](_0xe8acec,_0x2eaf3d,_0x4a18c0,_0x2d1267);}catch(_0x4170ad){_0x5de296(_0x7c6e('0xa7'));}};_0x2a0850();_0x7c6e('0xb')===typeof _0x1021b0[_0x7c6e('0x45')]?_0x1021b0[_0x7c6e('0x45')][_0x7c6e('0x29')](this):_0x5de296(_0x7c6e('0xa8'));};var _0x21c01a=_0x5c584e[_0x7c6e('0x6a')]();_0x5c584e['fn'][_0x7c6e('0x75')]=function(_0x21c65e,_0x124baa){var _0x380c8e=_0x5c584e(this);_0x7c6e('0x4')!==typeof _0x124baa||_0x7c6e('0x18')!==typeof _0x21c65e||_0x21c65e instanceof _0x5c584e||(_0x124baa=_0x21c65e,_0x21c65e=void 0x0);_0x1021b0=_0x5c584e[_0x7c6e('0x16')]({},_0xaa3cf5,_0x124baa);var _0x2fc45f;_0x21c01a['add'](function(){_0x380c8e[_0x7c6e('0x7f')](_0x7c6e('0xa9'))[_0x7c6e('0x9')]||_0x380c8e[_0x7c6e('0xaa')](_0x7c6e('0xab'));_0x2fc45f=new _0x5c584e[(_0x7c6e('0x75'))](_0x380c8e,_0x21c65e);});_0x21c01a['fire']();_0x5c584e(window)['on'](_0x7c6e('0xac'),function(_0x3d9639,_0x35f5b2,_0x457b9e){_0x2fc45f[_0x7c6e('0x86')](_0x35f5b2,_0x457b9e);});return _0x5c584e[_0x7c6e('0x16')](_0x380c8e,_0x2fc45f);};var _0x25ccdc=0x0;_0x5c584e(document)[_0x7c6e('0xad')](function(_0x2cfa22,_0x1bd7f3,_0x4c98c7){-0x1<_0x4c98c7[_0x7c6e('0xae')][_0x7c6e('0x10')]()[_0x7c6e('0x95')](_0x7c6e('0xaf'))&&(_0x25ccdc=(_0x4c98c7['url'][_0x7c6e('0x9d')](/sku\=([0-9]+)/i)||[''])[_0x7c6e('0xa0')]());});_0x5c584e(window)[_0x7c6e('0x65')](_0x7c6e('0xb0'),function(){_0x5c584e(window)['trigger'](_0x7c6e('0xac'),[new _0x5c584e(),_0x25ccdc]);});_0x5c584e(document)['ajaxStop'](function(){_0x21c01a[_0x7c6e('0x46')]();});}catch(_0x1b3482){_0x7c6e('0x4')!==typeof console&&_0x7c6e('0xb')===typeof console[_0x7c6e('0x15')]&&console[_0x7c6e('0x15')](_0x7c6e('0xb1'),_0x1b3482);}}(this));function qd_number_format(_0xec9fca,_0x177833,_0x17f112,_0x5e4563){_0xec9fca=(_0xec9fca+'')[_0x7c6e('0x2')](/[^0-9+\-Ee.]/g,'');_0xec9fca=isFinite(+_0xec9fca)?+_0xec9fca:0x0;_0x177833=isFinite(+_0x177833)?Math[_0x7c6e('0x3')](_0x177833):0x0;_0x5e4563=_0x7c6e('0x4')===typeof _0x5e4563?',':_0x5e4563;_0x17f112=_0x7c6e('0x4')===typeof _0x17f112?'.':_0x17f112;var _0x42072e='',_0x42072e=function(_0xf59c67,_0x2e955e){var _0x34ff3d=Math[_0x7c6e('0x5')](0xa,_0x2e955e);return''+(Math[_0x7c6e('0x6')](_0xf59c67*_0x34ff3d)/_0x34ff3d)['toFixed'](_0x2e955e);},_0x42072e=(_0x177833?_0x42072e(_0xec9fca,_0x177833):''+Math[_0x7c6e('0x6')](_0xec9fca))['split']('.');0x3<_0x42072e[0x0][_0x7c6e('0x9')]&&(_0x42072e[0x0]=_0x42072e[0x0][_0x7c6e('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x5e4563));(_0x42072e[0x1]||'')[_0x7c6e('0x9')]<_0x177833&&(_0x42072e[0x1]=_0x42072e[0x1]||'',_0x42072e[0x1]+=Array(_0x177833-_0x42072e[0x1][_0x7c6e('0x9')]+0x1)[_0x7c6e('0xa')]('0'));return _0x42072e[_0x7c6e('0xa')](_0x17f112);}(function(){try{window[_0x7c6e('0x39')]=window[_0x7c6e('0x39')]||{},window[_0x7c6e('0x39')][_0x7c6e('0x45')]=window['_QuatroDigital_CartData']['callback']||$[_0x7c6e('0x6a')]();}catch(_0x29753b){'undefined'!==typeof console&&'function'===typeof console[_0x7c6e('0x15')]&&console[_0x7c6e('0x15')](_0x7c6e('0xb1'),_0x29753b[_0x7c6e('0x25')]);}}());(function(_0x4d5136){try{var _0x1d3277=jQuery,_0x56f129=function(_0x2aa6ee,_0x3c5eec){if(_0x7c6e('0x18')===typeof console&&_0x7c6e('0x4')!==typeof console[_0x7c6e('0x15')]&&_0x7c6e('0x4')!==typeof console[_0x7c6e('0x2f')]&&_0x7c6e('0x4')!==typeof console[_0x7c6e('0x2d')]){var _0x2356f6;'object'===typeof _0x2aa6ee?(_0x2aa6ee[_0x7c6e('0xb2')](_0x7c6e('0xb3')),_0x2356f6=_0x2aa6ee):_0x2356f6=[_0x7c6e('0xb3')+_0x2aa6ee];if(_0x7c6e('0x4')===typeof _0x3c5eec||_0x7c6e('0x2c')!==_0x3c5eec[_0x7c6e('0x10')]()&&'aviso'!==_0x3c5eec[_0x7c6e('0x10')]())if('undefined'!==typeof _0x3c5eec&&'info'===_0x3c5eec[_0x7c6e('0x10')]())try{console[_0x7c6e('0x2f')][_0x7c6e('0xb4')](console,_0x2356f6);}catch(_0x24c912){try{console['info'](_0x2356f6['join']('\x0a'));}catch(_0x242982){}}else try{console[_0x7c6e('0x15')][_0x7c6e('0xb4')](console,_0x2356f6);}catch(_0x34f313){try{console[_0x7c6e('0x15')](_0x2356f6[_0x7c6e('0xa')]('\x0a'));}catch(_0x2c6fba){}}else try{console[_0x7c6e('0x2d')]['apply'](console,_0x2356f6);}catch(_0x7c951e){try{console['warn'](_0x2356f6[_0x7c6e('0xa')]('\x0a'));}catch(_0x173a2b){}}}};window[_0x7c6e('0x5c')]=window[_0x7c6e('0x5c')]||{};window[_0x7c6e('0x5c')][_0x7c6e('0x90')]=!0x0;_0x1d3277[_0x7c6e('0xb5')]=function(){};_0x1d3277['fn']['QD_dropDownCart']=function(){return{'fn':new _0x1d3277()};};var _0x473ca5=function(_0x43fb5c){var _0x367409={'z':'npbardhv%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe'};return function(_0x517ad5){var _0x56e958=function(_0x5c1179){return _0x5c1179;};var _0x435ae5=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x517ad5=_0x517ad5['d'+_0x435ae5[0x10]+'c'+_0x435ae5[0x11]+'m'+_0x56e958(_0x435ae5[0x1])+'n'+_0x435ae5[0xd]]['l'+_0x435ae5[0x12]+'c'+_0x435ae5[0x0]+'ti'+_0x56e958('o')+'n'];var _0x28a448=function(_0x2b2e15){return escape(encodeURIComponent(_0x2b2e15[_0x7c6e('0x2')](/\./g,'¨')[_0x7c6e('0x2')](/[a-zA-Z]/g,function(_0x4ecf60){return String[_0x7c6e('0xb6')](('Z'>=_0x4ecf60?0x5a:0x7a)>=(_0x4ecf60=_0x4ecf60[_0x7c6e('0xb7')](0x0)+0xd)?_0x4ecf60:_0x4ecf60-0x1a);})));};var _0x4d5136=_0x28a448(_0x517ad5[[_0x435ae5[0x9],_0x56e958('o'),_0x435ae5[0xc],_0x435ae5[_0x56e958(0xd)]][_0x7c6e('0xa')]('')]);_0x28a448=_0x28a448((window[['js',_0x56e958('no'),'m',_0x435ae5[0x1],_0x435ae5[0x4][_0x7c6e('0xb8')](),_0x7c6e('0xb9')][_0x7c6e('0xa')]('')]||_0x7c6e('0xba'))+['.v',_0x435ae5[0xd],'e',_0x56e958('x'),'co',_0x56e958('mm'),_0x7c6e('0xbb'),_0x435ae5[0x1],'.c',_0x56e958('o'),'m.',_0x435ae5[0x13],'r'][_0x7c6e('0xa')](''));for(var _0x2cef1c in _0x367409){if(_0x28a448===_0x2cef1c+_0x367409[_0x2cef1c]||_0x4d5136===_0x2cef1c+_0x367409[_0x2cef1c]){var _0x3ba2bc='tr'+_0x435ae5[0x11]+'e';break;}_0x3ba2bc='f'+_0x435ae5[0x0]+'ls'+_0x56e958(_0x435ae5[0x1])+'';}_0x56e958=!0x1;-0x1<_0x517ad5[[_0x435ae5[0xc],'e',_0x435ae5[0x0],'rc',_0x435ae5[0x9]]['join']('')]['indexOf'](_0x7c6e('0xbc'))&&(_0x56e958=!0x0);return[_0x3ba2bc,_0x56e958];}(_0x43fb5c);}(window);if(!eval(_0x473ca5[0x0]))return _0x473ca5[0x1]?_0x56f129(_0x7c6e('0xbd')):!0x1;_0x1d3277['QD_dropDownCart']=function(_0x1ad623,_0x4151ca){var _0x5e6bd9=_0x1d3277(_0x1ad623);if(!_0x5e6bd9[_0x7c6e('0x9')])return _0x5e6bd9;var _0x13cc43=_0x1d3277['extend'](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x7c6e('0xbe'),'linkCheckout':_0x7c6e('0xbf'),'cartTotal':_0x7c6e('0xc0'),'emptyCart':_0x7c6e('0xc1'),'continueShopping':'Continuar\x20Comprando','shippingForm':_0x7c6e('0xc2')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x395e78){return _0x395e78[_0x7c6e('0xc3')]||_0x395e78['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x4151ca);_0x1d3277('');var _0x2ce196=this;if(_0x13cc43[_0x7c6e('0x5b')]){var _0x133d90=!0x1;_0x7c6e('0x4')===typeof window[_0x7c6e('0x5d')]&&(_0x56f129(_0x7c6e('0xc4')),_0x1d3277[_0x7c6e('0x1d')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x7c6e('0xc5'),'error':function(){_0x56f129('Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.');_0x133d90=!0x0;}}));if(_0x133d90)return _0x56f129('A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!');}if(_0x7c6e('0x18')===typeof window[_0x7c6e('0x5d')]&&'undefined'!==typeof window[_0x7c6e('0x5d')][_0x7c6e('0x5e')])var _0x3f9186=window[_0x7c6e('0x5d')][_0x7c6e('0x5e')];else if(_0x7c6e('0x18')===typeof vtex&&_0x7c6e('0x18')===typeof vtex['checkout']&&'undefined'!==typeof vtex['checkout'][_0x7c6e('0x5f')])_0x3f9186=new vtex[(_0x7c6e('0x5e'))][(_0x7c6e('0x5f'))]();else return _0x56f129(_0x7c6e('0xc6'));_0x2ce196[_0x7c6e('0xc7')]=_0x7c6e('0xc8');var _0x2ea498=function(_0x556cc6){_0x1d3277(this)[_0x7c6e('0x80')](_0x556cc6);_0x556cc6['find']('.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose')['add'](_0x1d3277(_0x7c6e('0xc9')))['on']('click.qd_ddc_closeFn',function(){_0x5e6bd9[_0x7c6e('0x8b')](_0x7c6e('0xca'));_0x1d3277(document[_0x7c6e('0x6f')])['removeClass'](_0x7c6e('0x87'));});_0x1d3277(document)[_0x7c6e('0xcb')](_0x7c6e('0xcc'))['on']('keyup.qd_ddc_closeFn',function(_0x3a2f71){0x1b==_0x3a2f71[_0x7c6e('0xcd')]&&(_0x5e6bd9[_0x7c6e('0x8b')](_0x7c6e('0xca')),_0x1d3277(document[_0x7c6e('0x6f')])[_0x7c6e('0x8b')](_0x7c6e('0x87')));});var _0xf36fd=_0x556cc6[_0x7c6e('0x55')]('.qd-ddc-prodWrapper');_0x556cc6[_0x7c6e('0x55')](_0x7c6e('0xce'))['on'](_0x7c6e('0xcf'),function(){_0x2ce196['scrollCart']('-',void 0x0,void 0x0,_0xf36fd);return!0x1;});_0x556cc6['find'](_0x7c6e('0xd0'))['on'](_0x7c6e('0xd1'),function(){_0x2ce196[_0x7c6e('0xd2')](void 0x0,void 0x0,void 0x0,_0xf36fd);return!0x1;});_0x556cc6['find'](_0x7c6e('0xd3'))[_0x7c6e('0xd4')]('')['on'](_0x7c6e('0xd5'),function(){_0x2ce196['shippingCalculate'](_0x1d3277(this));});if(_0x13cc43['updateOnlyHover']){var _0x4151ca=0x0;_0x1d3277(this)['on']('mouseenter.qd_ddc_hover',function(){var _0x556cc6=function(){window['_QuatroDigital_DropDown'][_0x7c6e('0x90')]&&(_0x2ce196[_0x7c6e('0x8e')](),window[_0x7c6e('0x5c')]['allowUpdate']=!0x1,_0x1d3277['fn']['simpleCart'](!0x0),_0x2ce196['cartIsEmpty']());};_0x4151ca=setInterval(function(){_0x556cc6();},0x258);_0x556cc6();});_0x1d3277(this)['on']('mouseleave.qd_ddc_hover',function(){clearInterval(_0x4151ca);});}};var _0x5962a9=function(_0x5dc598){_0x5dc598=_0x1d3277(_0x5dc598);_0x13cc43[_0x7c6e('0xd6')][_0x7c6e('0x56')]=_0x13cc43[_0x7c6e('0xd6')]['cartTotal'][_0x7c6e('0x2')](_0x7c6e('0xd7'),_0x7c6e('0xd8'));_0x13cc43['texts'][_0x7c6e('0x56')]=_0x13cc43['texts'][_0x7c6e('0x56')][_0x7c6e('0x2')](_0x7c6e('0xd9'),_0x7c6e('0xda'));_0x13cc43['texts'][_0x7c6e('0x56')]=_0x13cc43['texts']['cartTotal'][_0x7c6e('0x2')](_0x7c6e('0xdb'),_0x7c6e('0xdc'));_0x13cc43[_0x7c6e('0xd6')][_0x7c6e('0x56')]=_0x13cc43['texts']['cartTotal']['replace'](_0x7c6e('0xdd'),_0x7c6e('0xde'));_0x5dc598[_0x7c6e('0x55')](_0x7c6e('0xdf'))[_0x7c6e('0x51')](_0x13cc43['texts'][_0x7c6e('0xe0')]);_0x5dc598[_0x7c6e('0x55')](_0x7c6e('0xe1'))[_0x7c6e('0x51')](_0x13cc43[_0x7c6e('0xd6')]['continueShopping']);_0x5dc598[_0x7c6e('0x55')](_0x7c6e('0xe2'))[_0x7c6e('0x51')](_0x13cc43[_0x7c6e('0xd6')][_0x7c6e('0xe3')]);_0x5dc598[_0x7c6e('0x55')](_0x7c6e('0xe4'))[_0x7c6e('0x51')](_0x13cc43[_0x7c6e('0xd6')][_0x7c6e('0x56')]);_0x5dc598[_0x7c6e('0x55')](_0x7c6e('0xe5'))[_0x7c6e('0x51')](_0x13cc43[_0x7c6e('0xd6')]['shippingForm']);_0x5dc598['find'](_0x7c6e('0xe6'))['html'](_0x13cc43[_0x7c6e('0xd6')]['emptyCart']);return _0x5dc598;}(this[_0x7c6e('0xc7')]);var _0x3431d7=0x0;_0x5e6bd9[_0x7c6e('0x54')](function(){0x0<_0x3431d7?_0x2ea498[_0x7c6e('0x29')](this,_0x5962a9[_0x7c6e('0xe7')]()):_0x2ea498[_0x7c6e('0x29')](this,_0x5962a9);_0x3431d7++;});window[_0x7c6e('0x39')]['callback'][_0x7c6e('0x69')](function(){_0x1d3277(_0x7c6e('0xe8'))['html'](window['_QuatroDigital_CartData'][_0x7c6e('0x3d')]||'--');_0x1d3277(_0x7c6e('0xe9'))[_0x7c6e('0x51')](window[_0x7c6e('0x39')][_0x7c6e('0x41')]||'0');_0x1d3277('.qd-ddc-infoTotalShipping')[_0x7c6e('0x51')](window[_0x7c6e('0x39')][_0x7c6e('0x3e')]||'--');_0x1d3277(_0x7c6e('0xea'))[_0x7c6e('0x51')](window['_QuatroDigital_CartData'][_0x7c6e('0x40')]||'--');});var _0x400a29=function(_0x2d647b,_0x553024){if(_0x7c6e('0x4')===typeof _0x2d647b[_0x7c6e('0x43')])return _0x56f129(_0x7c6e('0xeb'));_0x2ce196[_0x7c6e('0xec')][_0x7c6e('0x29')](this,_0x553024);};_0x2ce196[_0x7c6e('0x8e')]=function(_0xe727f0,_0x28c3ca){'undefined'!=typeof _0x28c3ca?window[_0x7c6e('0x5c')][_0x7c6e('0xed')]=_0x28c3ca:window[_0x7c6e('0x5c')]['dataOptionsCache']&&(_0x28c3ca=window[_0x7c6e('0x5c')][_0x7c6e('0xed')]);setTimeout(function(){window[_0x7c6e('0x5c')][_0x7c6e('0xed')]=void 0x0;},_0x13cc43['timeRemoveNewItemClass']);_0x1d3277('.qd-ddc-wrapper')[_0x7c6e('0x8b')]('qd-ddc-prodLoaded');if(_0x13cc43[_0x7c6e('0x5b')]){var _0x4151ca=function(_0x3570d1){window['_QuatroDigital_DropDown']['getOrderForm']=_0x3570d1;_0x400a29(_0x3570d1,_0x28c3ca);_0x7c6e('0x4')!==typeof window[_0x7c6e('0xee')]&&_0x7c6e('0xb')===typeof window['_QuatroDigital_AmountProduct'][_0x7c6e('0xef')]&&window['_QuatroDigital_AmountProduct']['exec'][_0x7c6e('0x29')](this);_0x1d3277(_0x7c6e('0xf0'))['addClass']('qd-ddc-prodLoaded');};_0x7c6e('0x4')!==typeof window[_0x7c6e('0x5c')][_0x7c6e('0x28')]?(_0x4151ca(window[_0x7c6e('0x5c')][_0x7c6e('0x28')]),_0x7c6e('0xb')===typeof _0xe727f0&&_0xe727f0(window[_0x7c6e('0x5c')]['getOrderForm'])):_0x1d3277[_0x7c6e('0x68')]([_0x7c6e('0x43'),_0x7c6e('0x3b'),'shippingData'],{'done':function(_0x2c6e3f){_0x4151ca[_0x7c6e('0x29')](this,_0x2c6e3f);_0x7c6e('0xb')===typeof _0xe727f0&&_0xe727f0(_0x2c6e3f);},'fail':function(_0x1bcf69){_0x56f129([_0x7c6e('0xf1'),_0x1bcf69]);}});}else alert(_0x7c6e('0xf2'));};_0x2ce196[_0x7c6e('0xf3')]=function(){var _0x5a8b7d=_0x1d3277('.qd-ddc-wrapper');_0x5a8b7d[_0x7c6e('0x55')]('.qd-ddc-prodRow')[_0x7c6e('0x9')]?_0x5a8b7d[_0x7c6e('0x8b')]('qd-ddc-noItems'):_0x5a8b7d[_0x7c6e('0x4c')](_0x7c6e('0xf4'));};_0x2ce196[_0x7c6e('0xec')]=function(_0x3e0162){var _0x4151ca=_0x1d3277('.qd-ddc-prodWrapper2');_0x4151ca[_0x7c6e('0xf5')]();_0x4151ca[_0x7c6e('0x54')](function(){var _0x4151ca=_0x1d3277(this),_0x1ad623,_0x448770,_0x5365d9=_0x1d3277(''),_0xfb8ed9;for(_0xfb8ed9 in window['_QuatroDigital_DropDown'][_0x7c6e('0x28')][_0x7c6e('0x43')])if(_0x7c6e('0x18')===typeof window[_0x7c6e('0x5c')][_0x7c6e('0x28')][_0x7c6e('0x43')][_0xfb8ed9]){var _0x533c4e=window[_0x7c6e('0x5c')][_0x7c6e('0x28')]['items'][_0xfb8ed9];var _0x14912=_0x533c4e['productCategoryIds'][_0x7c6e('0x2')](/^\/|\/$/g,'')[_0x7c6e('0x8')]('/');var _0x40c27c=_0x1d3277(_0x7c6e('0xf6'));_0x40c27c[_0x7c6e('0x36')]({'data-sku':_0x533c4e['id'],'data-sku-index':_0xfb8ed9,'data-qd-departament':_0x14912[0x0],'data-qd-category':_0x14912[_0x14912[_0x7c6e('0x9')]-0x1]});_0x40c27c[_0x7c6e('0x4c')]('qd-ddc-'+_0x533c4e[_0x7c6e('0xf7')]);_0x40c27c[_0x7c6e('0x55')]('.qd-ddc-prodName')[_0x7c6e('0x80')](_0x13cc43[_0x7c6e('0xc3')](_0x533c4e));_0x40c27c[_0x7c6e('0x55')](_0x7c6e('0xf8'))[_0x7c6e('0x80')](isNaN(_0x533c4e[_0x7c6e('0xf9')])?_0x533c4e[_0x7c6e('0xf9')]:0x0==_0x533c4e[_0x7c6e('0xf9')]?_0x7c6e('0xfa'):(_0x1d3277(_0x7c6e('0x35'))['attr'](_0x7c6e('0x37'))||'R$')+'\x20'+qd_number_format(_0x533c4e[_0x7c6e('0xf9')]/0x64,0x2,',','.'));_0x40c27c[_0x7c6e('0x55')]('.qd-ddc-quantity')['attr']({'data-sku':_0x533c4e['id'],'data-sku-index':_0xfb8ed9})['val'](_0x533c4e[_0x7c6e('0x44')]);_0x40c27c[_0x7c6e('0x55')](_0x7c6e('0xfb'))[_0x7c6e('0x36')]({'data-sku':_0x533c4e['id'],'data-sku-index':_0xfb8ed9});_0x2ce196['insertProdImg'](_0x533c4e['id'],_0x40c27c[_0x7c6e('0x55')](_0x7c6e('0xfc')),_0x533c4e[_0x7c6e('0xfd')]);_0x40c27c['find'](_0x7c6e('0xfe'))[_0x7c6e('0x36')]({'data-sku':_0x533c4e['id'],'data-sku-index':_0xfb8ed9});_0x40c27c['appendTo'](_0x4151ca);_0x5365d9=_0x5365d9[_0x7c6e('0x69')](_0x40c27c);}try{var _0xaf67c5=_0x4151ca[_0x7c6e('0x0')](_0x7c6e('0xf0'))[_0x7c6e('0x55')](_0x7c6e('0xd3'));_0xaf67c5[_0x7c6e('0x9')]&&''==_0xaf67c5[_0x7c6e('0xd4')]()&&window[_0x7c6e('0x5c')][_0x7c6e('0x28')]['shippingData']['address']&&_0xaf67c5[_0x7c6e('0xd4')](window[_0x7c6e('0x5c')]['getOrderForm'][_0x7c6e('0x60')][_0x7c6e('0xff')]['postalCode']);}catch(_0x2320ea){_0x56f129(_0x7c6e('0x100')+_0x2320ea['message'],_0x7c6e('0x101'));}_0x2ce196['actionButtons'](_0x4151ca);_0x2ce196[_0x7c6e('0xf3')]();_0x3e0162&&_0x3e0162[_0x7c6e('0x102')]&&function(){_0x448770=_0x5365d9[_0x7c6e('0x48')](_0x7c6e('0x103')+_0x3e0162['lastSku']+'\x27]');_0x448770[_0x7c6e('0x9')]&&(_0x1ad623=0x0,_0x5365d9['each'](function(){var _0x3e0162=_0x1d3277(this);if(_0x3e0162['is'](_0x448770))return!0x1;_0x1ad623+=_0x3e0162[_0x7c6e('0x104')]();}),_0x2ce196[_0x7c6e('0xd2')](void 0x0,void 0x0,_0x1ad623,_0x4151ca[_0x7c6e('0x69')](_0x4151ca[_0x7c6e('0xa5')]())),_0x5365d9[_0x7c6e('0x8b')](_0x7c6e('0x105')),function(_0x46d72f){_0x46d72f[_0x7c6e('0x4c')]('qd-ddc-lastAdded');_0x46d72f['addClass'](_0x7c6e('0x105'));setTimeout(function(){_0x46d72f[_0x7c6e('0x8b')](_0x7c6e('0x106'));},_0x13cc43[_0x7c6e('0x8d')]);}(_0x448770));}();});(function(){_QuatroDigital_DropDown[_0x7c6e('0x28')][_0x7c6e('0x43')][_0x7c6e('0x9')]?(_0x1d3277(_0x7c6e('0x6f'))[_0x7c6e('0x8b')](_0x7c6e('0x107'))[_0x7c6e('0x4c')](_0x7c6e('0x108')),setTimeout(function(){_0x1d3277(_0x7c6e('0x6f'))['removeClass'](_0x7c6e('0x109'));},_0x13cc43['timeRemoveNewItemClass'])):_0x1d3277('body')[_0x7c6e('0x8b')](_0x7c6e('0x10a'))[_0x7c6e('0x4c')](_0x7c6e('0x107'));}());'function'===typeof _0x13cc43['callbackProductsList']?_0x13cc43[_0x7c6e('0x10b')][_0x7c6e('0x29')](this):_0x56f129(_0x7c6e('0x10c'));};_0x2ce196[_0x7c6e('0x10d')]=function(_0xaab2fe,_0x47d521,_0x4aa546){function _0x34ec20(){_0x47d521[_0x7c6e('0x8b')]('qd-loaded')['load'](function(){_0x1d3277(this)[_0x7c6e('0x4c')]('qd-loaded');})[_0x7c6e('0x36')](_0x7c6e('0x10e'),_0x4aa546);}_0x4aa546?_0x34ec20():isNaN(_0xaab2fe)?_0x56f129(_0x7c6e('0x10f'),'alerta'):alert(_0x7c6e('0x110'));};_0x2ce196[_0x7c6e('0x111')]=function(_0x435e27){var _0xb38e69=function(_0x27696f,_0x149b0d){var _0x4151ca=_0x1d3277(_0x27696f);var _0x38d2f1=_0x4151ca[_0x7c6e('0x36')](_0x7c6e('0x112'));var _0x1ad623=_0x4151ca[_0x7c6e('0x36')](_0x7c6e('0x113'));if(_0x38d2f1){var _0x188ded=parseInt(_0x4151ca[_0x7c6e('0xd4')]())||0x1;_0x2ce196[_0x7c6e('0x114')]([_0x38d2f1,_0x1ad623],_0x188ded,_0x188ded+0x1,function(_0x766571){_0x4151ca[_0x7c6e('0xd4')](_0x766571);_0x7c6e('0xb')===typeof _0x149b0d&&_0x149b0d();});}};var _0x4151ca=function(_0x5f08e6,_0x136310){var _0x4151ca=_0x1d3277(_0x5f08e6);var _0xcd404c=_0x4151ca[_0x7c6e('0x36')](_0x7c6e('0x112'));var _0x1ad623=_0x4151ca['attr'](_0x7c6e('0x113'));if(_0xcd404c){var _0x4dedd1=parseInt(_0x4151ca['val']())||0x2;_0x2ce196[_0x7c6e('0x114')]([_0xcd404c,_0x1ad623],_0x4dedd1,_0x4dedd1-0x1,function(_0x545499){_0x4151ca['val'](_0x545499);'function'===typeof _0x136310&&_0x136310();});}};var _0x4a5a1e=function(_0x4a3eb5,_0x7a252b){var _0x4151ca=_0x1d3277(_0x4a3eb5);var _0x19596a=_0x4151ca[_0x7c6e('0x36')](_0x7c6e('0x112'));var _0x1ad623=_0x4151ca[_0x7c6e('0x36')]('data-sku-index');if(_0x19596a){var _0x24713e=parseInt(_0x4151ca['val']())||0x1;_0x2ce196['changeQantity']([_0x19596a,_0x1ad623],0x1,_0x24713e,function(_0xdd35e5){_0x4151ca['val'](_0xdd35e5);_0x7c6e('0xb')===typeof _0x7a252b&&_0x7a252b();});}};var _0x1ad623=_0x435e27[_0x7c6e('0x55')](_0x7c6e('0x115'));_0x1ad623[_0x7c6e('0x4c')]('qd_on')[_0x7c6e('0x54')](function(){var _0x435e27=_0x1d3277(this);_0x435e27['find'](_0x7c6e('0x116'))['on'](_0x7c6e('0x117'),function(_0x4307bd){_0x4307bd['preventDefault']();_0x1ad623['addClass'](_0x7c6e('0x118'));_0xb38e69(_0x435e27[_0x7c6e('0x55')](_0x7c6e('0x119')),function(){_0x1ad623[_0x7c6e('0x8b')](_0x7c6e('0x118'));});});_0x435e27[_0x7c6e('0x55')](_0x7c6e('0x11a'))['on'](_0x7c6e('0x11b'),function(_0xa67f11){_0xa67f11[_0x7c6e('0x7a')]();_0x1ad623[_0x7c6e('0x4c')](_0x7c6e('0x118'));_0x4151ca(_0x435e27['find'](_0x7c6e('0x119')),function(){_0x1ad623[_0x7c6e('0x8b')](_0x7c6e('0x118'));});});_0x435e27['find'](_0x7c6e('0x119'))['on']('focusout.qd_ddc_change',function(){_0x1ad623['addClass'](_0x7c6e('0x118'));_0x4a5a1e(this,function(){_0x1ad623[_0x7c6e('0x8b')](_0x7c6e('0x118'));});});_0x435e27[_0x7c6e('0x55')](_0x7c6e('0x119'))['on'](_0x7c6e('0x11c'),function(_0x2978da){0xd==_0x2978da[_0x7c6e('0xcd')]&&(_0x1ad623[_0x7c6e('0x4c')](_0x7c6e('0x118')),_0x4a5a1e(this,function(){_0x1ad623['removeClass'](_0x7c6e('0x118'));}));});});_0x435e27[_0x7c6e('0x55')]('.qd-ddc-prodRow')[_0x7c6e('0x54')](function(){var _0x435e27=_0x1d3277(this);_0x435e27[_0x7c6e('0x55')]('.qd-ddc-remove')['on'](_0x7c6e('0x11d'),function(){_0x435e27[_0x7c6e('0x4c')](_0x7c6e('0x118'));_0x2ce196[_0x7c6e('0x11e')](_0x1d3277(this),function(_0x5eceb2){_0x5eceb2?_0x435e27['stop'](!0x0)[_0x7c6e('0x11f')](function(){_0x435e27[_0x7c6e('0x120')]();_0x2ce196['cartIsEmpty']();}):_0x435e27[_0x7c6e('0x8b')](_0x7c6e('0x118'));});return!0x1;});});};_0x2ce196[_0x7c6e('0x121')]=function(_0x3a129f){var _0x19eb57=_0x3a129f[_0x7c6e('0xd4')](),_0x19eb57=_0x19eb57[_0x7c6e('0x2')](/[^0-9\-]/g,''),_0x19eb57=_0x19eb57['replace'](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x7c6e('0x122')),_0x19eb57=_0x19eb57[_0x7c6e('0x2')](/(.{9}).*/g,'$1');_0x3a129f[_0x7c6e('0xd4')](_0x19eb57);0x9<=_0x19eb57[_0x7c6e('0x9')]&&(_0x3a129f[_0x7c6e('0x19')]('qdDdcLastPostalCode')!=_0x19eb57&&_0x3f9186[_0x7c6e('0x123')]({'postalCode':_0x19eb57,'country':_0x7c6e('0x124')})['done'](function(_0x1331e0){window['_QuatroDigital_DropDown']['getOrderForm']=_0x1331e0;_0x2ce196[_0x7c6e('0x8e')]();})[_0x7c6e('0x20')](function(_0x136cd5){_0x56f129([_0x7c6e('0x125'),_0x136cd5]);updateCartData();}),_0x3a129f[_0x7c6e('0x19')]('qdDdcLastPostalCode',_0x19eb57));};_0x2ce196[_0x7c6e('0x114')]=function(_0x207419,_0x3be437,_0x698bda,_0x18c3ee){function _0x3888e8(_0x45afc1){_0x45afc1='boolean'!==typeof _0x45afc1?!0x1:_0x45afc1;_0x2ce196['getCartInfoByUrl']();window[_0x7c6e('0x5c')]['allowUpdate']=!0x1;_0x2ce196[_0x7c6e('0xf3')]();_0x7c6e('0x4')!==typeof window['_QuatroDigital_AmountProduct']&&_0x7c6e('0xb')===typeof window[_0x7c6e('0xee')][_0x7c6e('0xef')]&&window[_0x7c6e('0xee')][_0x7c6e('0xef')][_0x7c6e('0x29')](this);'function'===typeof adminCart&&adminCart();_0x1d3277['fn'][_0x7c6e('0x27')](!0x0,void 0x0,_0x45afc1);_0x7c6e('0xb')===typeof _0x18c3ee&&_0x18c3ee(_0x3be437);}_0x698bda=_0x698bda||0x1;if(0x1>_0x698bda)return _0x3be437;if(_0x13cc43[_0x7c6e('0x5b')]){if('undefined'===typeof window[_0x7c6e('0x5c')][_0x7c6e('0x28')][_0x7c6e('0x43')][_0x207419[0x1]])return _0x56f129(_0x7c6e('0x126')+_0x207419[0x1]+']'),_0x3be437;window['_QuatroDigital_DropDown'][_0x7c6e('0x28')]['items'][_0x207419[0x1]][_0x7c6e('0x44')]=_0x698bda;window[_0x7c6e('0x5c')][_0x7c6e('0x28')][_0x7c6e('0x43')][_0x207419[0x1]][_0x7c6e('0x127')]=_0x207419[0x1];_0x3f9186['updateItems']([window[_0x7c6e('0x5c')]['getOrderForm'][_0x7c6e('0x43')][_0x207419[0x1]]],[_0x7c6e('0x43'),_0x7c6e('0x3b'),_0x7c6e('0x60')])[_0x7c6e('0x1e')](function(_0x38ced4){window[_0x7c6e('0x5c')][_0x7c6e('0x28')]=_0x38ced4;_0x3888e8(!0x0);})[_0x7c6e('0x20')](function(_0x4ab1d1){_0x56f129([_0x7c6e('0x128'),_0x4ab1d1]);_0x3888e8();});}else _0x56f129(_0x7c6e('0x129'));};_0x2ce196[_0x7c6e('0x11e')]=function(_0x5d4bf6,_0x2297e0){function _0x5b342b(_0x6e66ab){_0x6e66ab=_0x7c6e('0x12a')!==typeof _0x6e66ab?!0x1:_0x6e66ab;_0x7c6e('0x4')!==typeof window[_0x7c6e('0xee')]&&_0x7c6e('0xb')===typeof window[_0x7c6e('0xee')]['exec']&&window[_0x7c6e('0xee')]['exec'][_0x7c6e('0x29')](this);_0x7c6e('0xb')===typeof adminCart&&adminCart();_0x1d3277['fn'][_0x7c6e('0x27')](!0x0,void 0x0,_0x6e66ab);_0x7c6e('0xb')===typeof _0x2297e0&&_0x2297e0(_0x1ad623);}var _0x1ad623=!0x1,_0x15a233=_0x1d3277(_0x5d4bf6)[_0x7c6e('0x36')](_0x7c6e('0x113'));if(_0x13cc43[_0x7c6e('0x5b')]){if('undefined'===typeof window[_0x7c6e('0x5c')][_0x7c6e('0x28')][_0x7c6e('0x43')][_0x15a233])return _0x56f129(_0x7c6e('0x126')+_0x15a233+']'),_0x1ad623;window['_QuatroDigital_DropDown'][_0x7c6e('0x28')][_0x7c6e('0x43')][_0x15a233][_0x7c6e('0x127')]=_0x15a233;_0x3f9186['removeItems']([window[_0x7c6e('0x5c')]['getOrderForm'][_0x7c6e('0x43')][_0x15a233]],[_0x7c6e('0x43'),_0x7c6e('0x3b'),_0x7c6e('0x60')])['done'](function(_0x1b8b53){_0x1ad623=!0x0;window['_QuatroDigital_DropDown']['getOrderForm']=_0x1b8b53;_0x400a29(_0x1b8b53);_0x5b342b(!0x0);})[_0x7c6e('0x20')](function(_0x49fb09){_0x56f129([_0x7c6e('0x12b'),_0x49fb09]);_0x5b342b();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x2ce196['scrollCart']=function(_0xb4d4ce,_0x42fbc7,_0x4ac0d0,_0x3b5d13){_0x3b5d13=_0x3b5d13||_0x1d3277(_0x7c6e('0x12c'));_0xb4d4ce=_0xb4d4ce||'+';_0x42fbc7=_0x42fbc7||0.9*_0x3b5d13[_0x7c6e('0x12d')]();_0x3b5d13['stop'](!0x0,!0x0)[_0x7c6e('0x12e')]({'scrollTop':isNaN(_0x4ac0d0)?_0xb4d4ce+'='+_0x42fbc7+'px':_0x4ac0d0});};_0x13cc43[_0x7c6e('0x12f')]||(_0x2ce196['getCartInfoByUrl'](),_0x1d3277['fn'][_0x7c6e('0x27')](!0x0));_0x1d3277(window)['on']('productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex',function(){try{window['_QuatroDigital_DropDown']['getOrderForm']=void 0x0,_0x2ce196[_0x7c6e('0x8e')]();}catch(_0x49703e){_0x56f129(_0x7c6e('0x130')+_0x49703e['message'],_0x7c6e('0x131'));}});_0x7c6e('0xb')===typeof _0x13cc43['callback']?_0x13cc43[_0x7c6e('0x45')][_0x7c6e('0x29')](this):_0x56f129(_0x7c6e('0xa8'));};_0x1d3277['fn'][_0x7c6e('0xb5')]=function(_0x2e19ee){var _0x597956=_0x1d3277(this);_0x597956['fn']=new _0x1d3277[(_0x7c6e('0xb5'))](this,_0x2e19ee);return _0x597956;};}catch(_0x1ab678){_0x7c6e('0x4')!==typeof console&&_0x7c6e('0xb')===typeof console[_0x7c6e('0x15')]&&console['error'](_0x7c6e('0xb1'),_0x1ab678);}}(this));(function(_0x51fc5c){try{var _0x38a596=jQuery;window['_QuatroDigital_AmountProduct']=window[_0x7c6e('0xee')]||{};window[_0x7c6e('0xee')]['items']={};window[_0x7c6e('0xee')]['allowRecalculate']=!0x1;window['_QuatroDigital_AmountProduct'][_0x7c6e('0x132')]=!0x1;window[_0x7c6e('0xee')][_0x7c6e('0x133')]=!0x1;var _0x40f5d1=function(){if(window[_0x7c6e('0xee')][_0x7c6e('0x134')]){var _0x19b38d=!0x1;var _0x51fc5c={};window[_0x7c6e('0xee')]['items']={};for(_0x1014ab in window[_0x7c6e('0x5c')]['getOrderForm'][_0x7c6e('0x43')])if(_0x7c6e('0x18')===typeof window[_0x7c6e('0x5c')][_0x7c6e('0x28')][_0x7c6e('0x43')][_0x1014ab]){var _0x3f6783=window[_0x7c6e('0x5c')][_0x7c6e('0x28')][_0x7c6e('0x43')][_0x1014ab];'undefined'!==typeof _0x3f6783[_0x7c6e('0x135')]&&null!==_0x3f6783[_0x7c6e('0x135')]&&''!==_0x3f6783[_0x7c6e('0x135')]&&(window[_0x7c6e('0xee')][_0x7c6e('0x43')][_0x7c6e('0x136')+_0x3f6783[_0x7c6e('0x135')]]=window[_0x7c6e('0xee')][_0x7c6e('0x43')][_0x7c6e('0x136')+_0x3f6783[_0x7c6e('0x135')]]||{},window[_0x7c6e('0xee')][_0x7c6e('0x43')]['prod_'+_0x3f6783[_0x7c6e('0x135')]][_0x7c6e('0x137')]=_0x3f6783['productId'],_0x51fc5c[_0x7c6e('0x136')+_0x3f6783[_0x7c6e('0x135')]]||(window['_QuatroDigital_AmountProduct']['items'][_0x7c6e('0x136')+_0x3f6783[_0x7c6e('0x135')]]['qtt']=0x0),window['_QuatroDigital_AmountProduct'][_0x7c6e('0x43')][_0x7c6e('0x136')+_0x3f6783['productId']]['qtt']+=_0x3f6783[_0x7c6e('0x44')],_0x19b38d=!0x0,_0x51fc5c['prod_'+_0x3f6783[_0x7c6e('0x135')]]=!0x0);}var _0x1014ab=_0x19b38d;}else _0x1014ab=void 0x0;window['_QuatroDigital_AmountProduct']['allowRecalculate']&&(_0x38a596(_0x7c6e('0x138'))['remove'](),_0x38a596(_0x7c6e('0x139'))[_0x7c6e('0x8b')](_0x7c6e('0x13a')));for(var _0x54f6eb in window[_0x7c6e('0xee')]['items']){_0x3f6783=window['_QuatroDigital_AmountProduct'][_0x7c6e('0x43')][_0x54f6eb];if(_0x7c6e('0x18')!==typeof _0x3f6783)return;_0x51fc5c=_0x38a596('input.qd-productId[value='+_0x3f6783['prodId']+']')[_0x7c6e('0x0')]('li');if(window[_0x7c6e('0xee')][_0x7c6e('0x134')]||!_0x51fc5c[_0x7c6e('0x55')](_0x7c6e('0x138'))[_0x7c6e('0x9')])_0x19b38d=_0x38a596(_0x7c6e('0x13b')),_0x19b38d[_0x7c6e('0x55')](_0x7c6e('0x13c'))[_0x7c6e('0x51')](_0x3f6783[_0x7c6e('0x41')]),_0x3f6783=_0x51fc5c[_0x7c6e('0x55')]('.qd_bap_wrapper_content'),_0x3f6783['length']?_0x3f6783[_0x7c6e('0xaa')](_0x19b38d)[_0x7c6e('0x4c')](_0x7c6e('0x13a')):_0x51fc5c[_0x7c6e('0xaa')](_0x19b38d);}_0x1014ab&&(window['_QuatroDigital_AmountProduct'][_0x7c6e('0x134')]=!0x1);};window[_0x7c6e('0xee')]['exec']=function(){window['_QuatroDigital_AmountProduct'][_0x7c6e('0x134')]=!0x0;_0x40f5d1[_0x7c6e('0x29')](this);};_0x38a596(document)[_0x7c6e('0x13d')](function(){_0x40f5d1[_0x7c6e('0x29')](this);});}catch(_0x42b3fe){_0x7c6e('0x4')!==typeof console&&'function'===typeof console['error']&&console[_0x7c6e('0x15')](_0x7c6e('0xb1'),_0x42b3fe);}}(this));(function(){try{var _0x5cdbff=jQuery,_0x448e3d,_0x589bea={'selector':'.qdDdcContainer','dropDown':{},'buyButton':{}};_0x5cdbff[_0x7c6e('0x13e')]=function(_0x1a16e1){var _0x204281={};_0x448e3d=_0x5cdbff['extend'](!0x0,{},_0x589bea,_0x1a16e1);_0x1a16e1=_0x5cdbff(_0x448e3d[_0x7c6e('0x84')])['QD_dropDownCart'](_0x448e3d[_0x7c6e('0x13f')]);_0x204281[_0x7c6e('0x88')]=_0x7c6e('0x4')!==typeof _0x448e3d[_0x7c6e('0x13f')]['updateOnlyHover']&&!0x1===_0x448e3d[_0x7c6e('0x13f')][_0x7c6e('0x12f')]?_0x5cdbff(_0x448e3d['selector'])[_0x7c6e('0x75')](_0x1a16e1['fn'],_0x448e3d['buyButton']):_0x5cdbff(_0x448e3d[_0x7c6e('0x84')])[_0x7c6e('0x75')](_0x448e3d[_0x7c6e('0x88')]);_0x204281[_0x7c6e('0x13f')]=_0x1a16e1;return _0x204281;};_0x5cdbff['fn'][_0x7c6e('0x140')]=function(){'object'===typeof console&&_0x7c6e('0xb')===typeof console[_0x7c6e('0x2f')]&&console[_0x7c6e('0x2f')](_0x7c6e('0x141'));};_0x5cdbff['smartCart']=_0x5cdbff['fn'][_0x7c6e('0x140')];}catch(_0xc5bc99){_0x7c6e('0x4')!==typeof console&&'function'===typeof console[_0x7c6e('0x15')]&&console['error'](_0x7c6e('0xb1'),_0xc5bc99);}}());