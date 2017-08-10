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
            //$(".qd-shelf-xs-12").addClass('qd-shelf-xs-6').removeClass('qd-shelf-xs-12');
            Home.cycle2();
            Home.bannerCarouselHome();
            Home.organizeSideMenuCollection();
            Home.shelfCarouselHome();
        },
        ajaxStop: function() {},
        windowOnload: function() {},
        cycle2: function() {
            var elem = $(".slider-qd-v1-full, .slider-qd-v1-full-mobile");

            if (elem.find('.box-banner').length <= 1)
                elem.addClass("qd-1");

            if (typeof $.fn.cycle !== "function")
                return;

            elem.find(".box-banner").each(function() {
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
var _0x53c4=['[href=\x27','qd-bb-itemAddBuyButtonWrapper','qd-bb-itemAddCartWrapper','timeRemoveNewItemClass','função\x20descontinuada','getCartInfoByUrl','allowUpdate','buyButton','click','bind','mouseenter.qd_bb_buy_sc','unbind','load','selectSkuMsg','execDefaultAction','redirect=false','redirect=true','queue','buyIfQuantityZeroed','test','match','push','buyButtonClickCallback','ku=','pop','shift','asyncCallback','productAddedToCart','cartProductAdded.vtex','fakeRequest','parent','Problemas\x20ao\x20tentar\x20comunicar\x20a\x20página\x20que\x20o\x20produto\x20foi\x20aicionado\x20ao\x20carrinho.','Callback\x20não\x20é\x20uma\x20função','QD_buyButton','.qd-bb-itemAddWrapper','prepend','<span\x20class=\x22qd-bb-itemAddWrapper\x22><span\x20class=\x22qd-bb-itemAddIco\x22></span></span>','QuatroDigital.qd_bb_prod_add','ajaxSend','indexOf','productAddedToCart.qdSbbVtex','ajaxStop','[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a','QD_dropDownCart','npbardhv%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe','fromCharCode','ite','Ir\x20ao\x20Carrinho','Finalizar\x20Compra','<div><span>Itens:\x20#items</span><span>Subtotal:\x20#value</span></div><div><span>Frete:\x20#shipping</span><span>Total:\x20#total</span></div>','Seu\x20carrinho\x20ainda\x20não\x20tem\x20nenhum\x20produto.','Continuar\x20Comprando','<label\x20for=\x22qd-ddc-cep\x22>Calcular\x20frete:\x20</label><input\x20type=\x22tel\x22\x20id=\x22qd-ddc-cep\x22\x20placeholder=\x22CEP\x22\x20/>','skuName','A\x20biblioteca\x20VTEX.js\x20não\x20foi\x20encontrada.\x20o\x20Script\x20tentará\x20buscar\x20no\x20CDN','script','Não\x20foi\x20possível\x20obter\x20\x27//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js\x27\x20o\x20DropDown\x20não\x20será\x20executado.','A\x20execução\x20do\x20DropDown\x20pará\x20por\x20aqui!','cartContainer','<div\x20class=\x22qd-ddc-wrapper\x20qd-ddc-noItems\x22><div\x20class=\x22qd-ddc-wrapper2\x22><div\x20class=\x22qd_ddc_lightBoxClose\x22></div><div\x20class=\x22qd-ddc-wrapper3\x22><div\x20class=\x22qd-ddc-emptyCart\x22><p></p></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-products\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollUp\x22></a><div\x20class=\x22qd-ddc-prodWrapper\x22>\x20<div\x20class=\x22qd-ddc-prodWrapper2\x22></div>\x20</div><span\x20class=\x22qd-ddc-prodLoading\x22></span><a\x20href=\x22#\x22\x20class=\x22qd-ddc-scrollDown\x22></a></div><div\x20class=\x22qd-ddc-row\x20qd-ddc-info\x22><div\x20class=\x22qd-ddc-shipping\x22></div><div\x20class=\x22qd-ddc-infoTotal\x22></div><div\x20class=\x22qd-ddc-infoBts\x22><a\x20href=\x22/checkout/#/cart\x22\x20class=\x22qd-ddc-viewCart\x22></a><a\x20href=\x22#\x22\x20class=\x22qd_ddc_continueShopping\x22></a><a\x20href=\x22/checkout/#/orderform\x22\x20class=\x22qd-ddc-checkout\x22></a></div></div></div></div></div>','.qd_ddc_continueShopping,\x20.qd_ddc_lightBoxClose','.qd_ddc_lightBoxOverlay','qd-bb-lightBoxProdAdd','off','keyup.qd_ddc_closeFn','keyCode','.qd-ddc-prodWrapper','click.qd_ddc_scrollUp','.qd-ddc-scrollDown','click.qd_ddc_scrollDown','scrollCart','.qd-ddc-shipping\x20input','keyup.qd_ddc_cep','shippingCalculate','mouseenter.qd_ddc_hover','cartIsEmpty','mouseleave.qd_ddc_hover','texts','cartTotal','#value','<span\x20class=\x22qd-ddc-infoTotalValue\x22></span>','#items','<span\x20class=\x22qd-ddc-infoTotalItems\x22></span>','#shipping','<span\x20class=\x22qd-ddc-infoTotalShipping\x22></span>','<span\x20class=\x22qd-ddc-infoAllTotal\x22></span>','linkCart','.qd_ddc_continueShopping','continueShopping','.qd-ddc-checkout','linkCheckout','.qd-ddc-shipping','.qd-ddc-emptyCart\x20p','clone','.qd-ddc-infoTotalValue','.qd-ddc-infoTotalItems','.qd-ddc-infoTotalShipping','.qd-ddc-infoAllTotal','Não\x20foi\x20possível\x20obter\x20os\x20items\x20da\x20requisição','renderProductsList','dataOptionsCache','.qd-ddc-wrapper','qd-ddc-prodLoaded','_QuatroDigital_AmountProduct','exec','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20do\x20carrinho','Este\x20método\x20esta\x20descontinuado!','.qd-ddc-prodRow','qd-ddc-noItems','.qd-ddc-prodWrapper2','empty','productCategoryIds','<div\x20class=\x22qd-ddc-prodRow\x20qd_ddc_prodRow\x22><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column1\x20qd-ddc-prodImg\x22><div\x20class=\x22qd-ddc-prodImgWrapper\x22><img\x20src=\x22\x22\x20class=\x22qd-ddc-image\x22\x20/><span\x20class=\x22qd-ddc-imgLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column2\x20qd-ddc-prodName\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column3\x20qd-ddc-prodPrice\x22></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column4\x20qd-ddc-prodQtt\x22><div\x20class=\x22qd-ddc-prodQttWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMinus\x22></a><input\x20type=\x22text\x22\x20class=\x22qd-ddc-quantity\x22\x20/><a\x20href=\x22#\x22\x20class=\x22qd-ddc-quantityMore\x22></a><span\x20class=\x22qd-ddc-qttLoading\x22></span></div></div><div\x20class=\x22qd-ddc-prodCell\x20qd-ddc-column5\x20qd-ddc-prodRemove\x22><div\x20class=\x22qd-ddc-removeWrapper\x20clearfix\x22><a\x20href=\x22#\x22\x20class=\x22qd-ddc-remove\x22></a><span\x20class=\x22qd-ddc-prodRowLoading\x22></span></div></div></div>','availability','.qd-ddc-prodName','sellingPrice','.qd-ddc-quantity','.qd-ddc-image','imageUrl','.qd-ddc-quantityMore,.qd-ddc-quantityMinus','appendTo','val','address','postalCode','Problemas\x20ao\x20tentar\x20definir\x20o\x20CEP\x20com\x20base\x20nos\x20dados\x20do\x20checkout.\x20Detalhes:\x20','actionButtons','lastSku','[data-sku=\x27','qd-ddc-lastAddedFixed','qd-ddc-lastAdded','qd-ddc-product-add-time','callbackProductsList','callbackProductsList\x20não\x20é\x20uma\x20função','insertProdImg','src','Não\x20foi\x20informada\x20uma\x20URL\x20para\x20a\x20imagem\x20e\x20nem\x20um\x20SKU','Atenção\x20este\x20é\x20um\x20método\x20descontinuado.\x20Contacte\x20o\x20SAC.','data-sku','data-sku-index','changeQantity','.qd-ddc-prodQttWrapper:not(.qd_on)','qd_on','.qd-ddc-quantityMore','click.qd_ddc_more','qd-loading','.qd-ddc-quantityMinus','click.qd_ddc_minus','focusout.qd_ddc_change','keyup.qd_ddc_change','.qd-ddc-remove','click.qd_ddc_remove','removeProduct','slideUp','remove','$1-$2$3','BRA','Não\x20foi\x20possível\x20calcular\x20o\x20frete','qdDdcLastPostalCode','boolean','Não\x20foi\x20possível\x20localizar\x20os\x20dados\x20do\x20item.\x20A\x20chave\x20buscada\x20é\x20composta\x20pelo\x20SKU:\x20window._QuatroDigital_DropDown.getOrderForm.items[','Não\x20foi\x20possível\x20atualizar\x20a\x20quantidade\x20de\x20itens\x20no\x20carrinho','atenção\x20esta\x20método\x20esta\x20descontinuado','index','removeItems','Não\x20foi\x20possível\x20remover\x20o\x20item\x20do\x20carrinho','.qd-ddc-prodWrapper,\x20.qd-ddc-prodWrapper2','animate','updateOnlyHover','productAddedToCart.qdDdcVtex\x20minicartUpdated.vtex.qdDdcVtex','Problemas\x20ao\x20atualizar\x20os\x20dados\x20do\x20carrinho\x20a\x20partir\x20do\x20eveento\x20da\x20VTEX.\x20Detalhes:\x20','avisso','buyButtonClicked','quickViewUpdate','productId','prod_','allowRecalculate','.qd-bap-wrapper','input.qd-productId[value=','.qd-bap-qtt','.qd_bap_wrapper_content','qd-bap-item-added','.qdDdcContainer','dropDown','smartCart','getParent','closest','replace','abs','undefined','pow','round','toFixed','split','length','join','prototype','charAt','toUpperCase','slice','toLowerCase','qdAjaxQueue','jquery','function','error','qdAjax','extend','GET','data','toString','url','jqXHR','ajax','done','success','fail','always','clearQueueDelay','Problemas\x20no\x20$.qdAjax\x20:(\x20.\x20Detalhes:\x20','message','version','4.0','simpleCart','checkout','getOrderForm','call','QuatroDigital_simpleCart','object','warn','[Simple\x20Cart]\x0a','info','QD_simpleCart','elements','.qd_cart_qtt','.qd_cart_total','.qd_items_text','meta[name=currency]','attr','content','each','qd_simpleCartOpts','_QuatroDigital_CartData','totalizers','value','total','shipping','allTotal','currencySymbol','qtt','showQuantityByItems','items','quantity','callback','fire','Problemas\x20com\x20o\x20callback\x20do\x20Smart\x20Cart','filter','.singular','show','addClass','qd-emptyCart','removeClass','$this','O\x20valor\x20obtido\x20para\x20calcular\x20o\x20plural/singular\x20não\x20é\x20um\x20número!\x20O\x20valor\x20será\x20definido\x20para\x200.','alerta','cartTotalE','html','cartQttE','find','cartQtt','itemsTextE','itemsText','emptyElem','emptyCart','qd-sc-populated','smartCheckout','_QuatroDigital_DropDown','vtexjs','SDK','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js','QD_checkoutQueue','shippingData','Não\x20foi\x20possível\x20obter\x20os\x20dados\x20para\x20o\x20carrinho.','Esta\x20é\x20uma\x20função\x20descontinuada\x20=/','trigger','simpleCartCallback.quatro_digital','ajaxRequestbuyButtonAsynchronous','ReloadItemsCart','.qd_cart_auto','productAddedToCart\x20minicartUpdated.vtex\x20cartProductAdded.vtex','Oooops!\x20','[QD\x20VTEX\x20Checkout\x20Queue]\x0a','Não\x20foi\x20encontrada\x20a\x20biblioteca\x20VTEX.js.\x20Este\x20componente\x20para\x20por\x20aqui,\x20a\x20força\x20não\x20esta\x20mais\x20contigo\x20neste\x20jornada!\x20Para\x20resolver\x20isto\x20inclua\x20a\x20biblioteca\x20VTEX.js','add','Callbacks','unshift','[Quatro\x20Digital\x20-\x20Buy\x20Button]\x0a','aviso','apply','.productInformationWrapper\x20\x20a.buy-button','input.buy-in-page-quantity','javascript:','.productQuickView','Produto\x20adicionado\x20ao\x20carrinho!','href','body','#produto,\x20.produto','isSmartCheckout','qd-bb-click-active','click.qd_bb_buy_sc','allowBuyClick','clickBuySmartCheckout','preventDefault','qd-sbb-on','.btn-add-buy-button-asynchronous','qd-bb-active','children','append','isProductPage','selector','_Quatro_Digital_dropDown','prodAdd','qd-bb-itemAddCartWrapper\x20qd-bb-lightBoxProdAdd','qd-bb-lightBoxBodyProdAdd'];(function(_0x5608a3,_0x5b33c5){var _0x1ed50a=function(_0x959171){while(--_0x959171){_0x5608a3['push'](_0x5608a3['shift']());}};_0x1ed50a(++_0x5b33c5);}(_0x53c4,0xb8));var _0x453c=function(_0x1bb52c,_0x5c4870){_0x1bb52c=_0x1bb52c-0x0;var _0x2e8307=_0x53c4[_0x1bb52c];return _0x2e8307;};(function(_0x4e49e3){_0x4e49e3['fn'][_0x453c('0x0')]=_0x4e49e3['fn'][_0x453c('0x1')];}(jQuery));function qd_number_format(_0x3fe6eb,_0xc7b676,_0x47c1f0,_0x107ca9){_0x3fe6eb=(_0x3fe6eb+'')[_0x453c('0x2')](/[^0-9+\-Ee.]/g,'');_0x3fe6eb=isFinite(+_0x3fe6eb)?+_0x3fe6eb:0x0;_0xc7b676=isFinite(+_0xc7b676)?Math[_0x453c('0x3')](_0xc7b676):0x0;_0x107ca9=_0x453c('0x4')===typeof _0x107ca9?',':_0x107ca9;_0x47c1f0=_0x453c('0x4')===typeof _0x47c1f0?'.':_0x47c1f0;var _0x454cc7='',_0x454cc7=function(_0x22389d,_0x9bb665){var _0xc7b676=Math[_0x453c('0x5')](0xa,_0x9bb665);return''+(Math[_0x453c('0x6')](_0x22389d*_0xc7b676)/_0xc7b676)[_0x453c('0x7')](_0x9bb665);},_0x454cc7=(_0xc7b676?_0x454cc7(_0x3fe6eb,_0xc7b676):''+Math[_0x453c('0x6')](_0x3fe6eb))[_0x453c('0x8')]('.');0x3<_0x454cc7[0x0][_0x453c('0x9')]&&(_0x454cc7[0x0]=_0x454cc7[0x0][_0x453c('0x2')](/\B(?=(?:\d{3})+(?!\d))/g,_0x107ca9));(_0x454cc7[0x1]||'')['length']<_0xc7b676&&(_0x454cc7[0x1]=_0x454cc7[0x1]||'',_0x454cc7[0x1]+=Array(_0xc7b676-_0x454cc7[0x1]['length']+0x1)[_0x453c('0xa')]('0'));return _0x454cc7['join'](_0x47c1f0);};'function'!==typeof String[_0x453c('0xb')]['trim']&&(String[_0x453c('0xb')]['trim']=function(){return this[_0x453c('0x2')](/^\s+|\s+$/g,'');});'function'!=typeof String['prototype']['capitalize']&&(String[_0x453c('0xb')]['capitalize']=function(){return this[_0x453c('0xc')](0x0)[_0x453c('0xd')]()+this[_0x453c('0xe')](0x1)[_0x453c('0xf')]();});(function(_0x3d6f46){if('function'!==typeof _0x3d6f46['qdAjax']){var _0x2b9a24={};_0x3d6f46[_0x453c('0x10')]=_0x2b9a24;0x96>parseInt((_0x3d6f46['fn'][_0x453c('0x11')]['replace'](/[^0-9]+/g,'')+'000')[_0x453c('0xe')](0x0,0x3),0xa)&&console&&_0x453c('0x12')==typeof console[_0x453c('0x13')]&&console['error']();_0x3d6f46[_0x453c('0x14')]=function(_0x5b46c0){try{var _0x1cb3f9=_0x3d6f46[_0x453c('0x15')]({},{'url':'','type':_0x453c('0x16'),'data':'','success':function(){},'error':function(){},'complete':function(){},'clearQueueDelay':0x5},_0x5b46c0);var _0x3c4a57='object'===typeof _0x1cb3f9[_0x453c('0x17')]?JSON['stringify'](_0x1cb3f9[_0x453c('0x17')]):_0x1cb3f9[_0x453c('0x17')][_0x453c('0x18')]();var _0xde1407=encodeURIComponent(_0x1cb3f9[_0x453c('0x19')]+'|'+_0x1cb3f9['type']+'|'+_0x3c4a57);_0x2b9a24[_0xde1407]=_0x2b9a24[_0xde1407]||{};_0x453c('0x4')==typeof _0x2b9a24[_0xde1407]['jqXHR']?_0x2b9a24[_0xde1407][_0x453c('0x1a')]=_0x3d6f46[_0x453c('0x1b')](_0x1cb3f9):(_0x2b9a24[_0xde1407][_0x453c('0x1a')][_0x453c('0x1c')](_0x1cb3f9[_0x453c('0x1d')]),_0x2b9a24[_0xde1407]['jqXHR'][_0x453c('0x1e')](_0x1cb3f9['error']),_0x2b9a24[_0xde1407][_0x453c('0x1a')]['always'](_0x1cb3f9['complete']));_0x2b9a24[_0xde1407][_0x453c('0x1a')][_0x453c('0x1f')](function(){isNaN(parseInt(_0x1cb3f9['clearQueueDelay']))||setTimeout(function(){_0x2b9a24[_0xde1407][_0x453c('0x1a')]=void 0x0;},_0x1cb3f9[_0x453c('0x20')]);});return _0x2b9a24[_0xde1407][_0x453c('0x1a')];}catch(_0x3708d5){_0x453c('0x4')!==typeof console&&_0x453c('0x12')===typeof console['error']&&console[_0x453c('0x13')](_0x453c('0x21')+_0x3708d5[_0x453c('0x22')]);}};_0x3d6f46[_0x453c('0x14')][_0x453c('0x23')]=_0x453c('0x24');}}(jQuery));(function(_0x5d9476){_0x5d9476['fn'][_0x453c('0x0')]=_0x5d9476['fn'][_0x453c('0x1')];}(jQuery));(function(){var _0xd629bf=jQuery;if(_0x453c('0x12')!==typeof _0xd629bf['fn'][_0x453c('0x25')]){_0xd629bf(function(){var _0x2d49eb=vtexjs[_0x453c('0x26')]['getOrderForm'];vtexjs[_0x453c('0x26')][_0x453c('0x27')]=function(){return _0x2d49eb[_0x453c('0x28')]();};});try{window['QuatroDigital_simpleCart']=window[_0x453c('0x29')]||{};window[_0x453c('0x29')]['ajaxStopOn']=!0x1;_0xd629bf['fn']['simpleCart']=function(_0xa0e95f,_0x4a60f8,_0x24bfba){var _0x2211b0=function(_0x4128a7,_0x53b125){if('object'===typeof console){var _0x1d71a3=_0x453c('0x2a')===typeof _0x4128a7;_0x453c('0x4')!==typeof _0x53b125&&'alerta'===_0x53b125[_0x453c('0xf')]()?_0x1d71a3?console[_0x453c('0x2b')]('[Simple\x20Cart]\x0a',_0x4128a7[0x0],_0x4128a7[0x1],_0x4128a7[0x2],_0x4128a7[0x3],_0x4128a7[0x4],_0x4128a7[0x5],_0x4128a7[0x6],_0x4128a7[0x7]):console[_0x453c('0x2b')](_0x453c('0x2c')+_0x4128a7):_0x453c('0x4')!==typeof _0x53b125&&_0x453c('0x2d')===_0x53b125[_0x453c('0xf')]()?_0x1d71a3?console[_0x453c('0x2d')](_0x453c('0x2c'),_0x4128a7[0x0],_0x4128a7[0x1],_0x4128a7[0x2],_0x4128a7[0x3],_0x4128a7[0x4],_0x4128a7[0x5],_0x4128a7[0x6],_0x4128a7[0x7]):console[_0x453c('0x2d')](_0x453c('0x2c')+_0x4128a7):_0x1d71a3?console[_0x453c('0x13')](_0x453c('0x2c'),_0x4128a7[0x0],_0x4128a7[0x1],_0x4128a7[0x2],_0x4128a7[0x3],_0x4128a7[0x4],_0x4128a7[0x5],_0x4128a7[0x6],_0x4128a7[0x7]):console[_0x453c('0x13')]('[Simple\x20Cart]\x0a'+_0x4128a7);}};var _0x11b565=_0xd629bf(this);_0x453c('0x2a')===typeof _0xa0e95f?_0x4a60f8=_0xa0e95f:(_0xa0e95f=_0xa0e95f||!0x1,_0x11b565=_0x11b565['add'](_0xd629bf['QD_simpleCart']['elements']));if(!_0x11b565[_0x453c('0x9')])return _0x11b565;_0xd629bf[_0x453c('0x2e')]['elements']=_0xd629bf[_0x453c('0x2e')][_0x453c('0x2f')]['add'](_0x11b565);_0x24bfba=_0x453c('0x4')===typeof _0x24bfba?!0x1:_0x24bfba;var _0x1a545f={'cartQtt':_0x453c('0x30'),'cartTotal':_0x453c('0x31'),'itemsText':_0x453c('0x32'),'currencySymbol':(_0xd629bf(_0x453c('0x33'))[_0x453c('0x34')](_0x453c('0x35'))||'R$')+'\x20','showQuantityByItems':!0x0,'smartCheckout':!0x0,'callback':function(){}};var _0x1be830=_0xd629bf[_0x453c('0x15')]({},_0x1a545f,_0x4a60f8);var _0x31f699=_0xd629bf('');_0x11b565[_0x453c('0x36')](function(){var _0x1d83e8=_0xd629bf(this);_0x1d83e8[_0x453c('0x17')](_0x453c('0x37'))||_0x1d83e8['data'](_0x453c('0x37'),_0x1be830);});var _0x21afc7=function(_0x482def){window['_QuatroDigital_CartData']=window[_0x453c('0x38')]||{};for(var _0xa0e95f=0x0,_0x4a9b52=0x0,_0x521c81=0x0;_0x521c81<_0x482def[_0x453c('0x39')][_0x453c('0x9')];_0x521c81++)'Shipping'==_0x482def['totalizers'][_0x521c81]['id']&&(_0x4a9b52+=_0x482def['totalizers'][_0x521c81][_0x453c('0x3a')]),_0xa0e95f+=_0x482def[_0x453c('0x39')][_0x521c81][_0x453c('0x3a')];window[_0x453c('0x38')][_0x453c('0x3b')]=_0x1be830['currencySymbol']+qd_number_format(_0xa0e95f/0x64,0x2,',','.');window[_0x453c('0x38')][_0x453c('0x3c')]=_0x1be830['currencySymbol']+qd_number_format(_0x4a9b52/0x64,0x2,',','.');window[_0x453c('0x38')][_0x453c('0x3d')]=_0x1be830[_0x453c('0x3e')]+qd_number_format((_0xa0e95f+_0x4a9b52)/0x64,0x2,',','.');window[_0x453c('0x38')][_0x453c('0x3f')]=0x0;if(_0x1be830[_0x453c('0x40')])for(_0x521c81=0x0;_0x521c81<_0x482def[_0x453c('0x41')][_0x453c('0x9')];_0x521c81++)window[_0x453c('0x38')][_0x453c('0x3f')]+=_0x482def[_0x453c('0x41')][_0x521c81][_0x453c('0x42')];else window[_0x453c('0x38')][_0x453c('0x3f')]=_0x482def[_0x453c('0x41')][_0x453c('0x9')]||0x0;try{window[_0x453c('0x38')][_0x453c('0x43')]&&window[_0x453c('0x38')][_0x453c('0x43')][_0x453c('0x44')]&&window[_0x453c('0x38')]['callback']['fire']();}catch(_0x38f38e){_0x2211b0(_0x453c('0x45'));}_0xd8365b(_0x31f699);};var _0x230d29=function(_0x38d495,_0x391afb){0x1===_0x38d495?_0x391afb['hide']()[_0x453c('0x46')](_0x453c('0x47'))[_0x453c('0x48')]():_0x391afb['hide']()[_0x453c('0x46')]('.plural')[_0x453c('0x48')]();};var _0x447946=function(_0x147f9b){0x1>_0x147f9b?_0x11b565[_0x453c('0x49')](_0x453c('0x4a')):_0x11b565[_0x453c('0x4b')](_0x453c('0x4a'));};var _0x3411c1=function(_0x51679b,_0x5ce5aa){var _0x183a99=parseInt(window[_0x453c('0x38')][_0x453c('0x3f')],0xa);_0x5ce5aa[_0x453c('0x4c')]['show']();isNaN(_0x183a99)&&(_0x2211b0(_0x453c('0x4d'),_0x453c('0x4e')),_0x183a99=0x0);_0x5ce5aa[_0x453c('0x4f')][_0x453c('0x50')](window[_0x453c('0x38')][_0x453c('0x3b')]);_0x5ce5aa['cartQttE'][_0x453c('0x50')](_0x183a99);_0x230d29(_0x183a99,_0x5ce5aa['itemsTextE']);_0x447946(_0x183a99);};var _0xd8365b=function(_0x5ca4ff){_0x11b565[_0x453c('0x36')](function(){var _0x4a09eb={};var _0x995993=_0xd629bf(this);_0xa0e95f&&_0x995993[_0x453c('0x17')]('qd_simpleCartOpts')&&_0xd629bf[_0x453c('0x15')](_0x1be830,_0x995993[_0x453c('0x17')](_0x453c('0x37')));_0x4a09eb[_0x453c('0x4c')]=_0x995993;_0x4a09eb[_0x453c('0x51')]=_0x995993[_0x453c('0x52')](_0x1be830[_0x453c('0x53')])||_0x31f699;_0x4a09eb[_0x453c('0x4f')]=_0x995993[_0x453c('0x52')](_0x1be830['cartTotal'])||_0x31f699;_0x4a09eb[_0x453c('0x54')]=_0x995993[_0x453c('0x52')](_0x1be830[_0x453c('0x55')])||_0x31f699;_0x4a09eb[_0x453c('0x56')]=_0x995993[_0x453c('0x52')](_0x1be830[_0x453c('0x57')])||_0x31f699;_0x3411c1(_0x5ca4ff,_0x4a09eb);_0x995993[_0x453c('0x49')](_0x453c('0x58'));});};(function(){if(_0x1be830[_0x453c('0x59')]){window[_0x453c('0x5a')]=window[_0x453c('0x5a')]||{};if(_0x453c('0x4')!==typeof window[_0x453c('0x5a')][_0x453c('0x27')]&&(_0x24bfba||!_0xa0e95f))return _0x21afc7(window[_0x453c('0x5a')][_0x453c('0x27')]);if(_0x453c('0x2a')!==typeof window[_0x453c('0x5b')]||_0x453c('0x4')===typeof window[_0x453c('0x5b')][_0x453c('0x26')])if(_0x453c('0x2a')===typeof vtex&&'object'===typeof vtex['checkout']&&'undefined'!==typeof vtex[_0x453c('0x26')][_0x453c('0x5c')])new vtex['checkout'][(_0x453c('0x5c'))]();else return _0x2211b0(_0x453c('0x5d'));_0xd629bf[_0x453c('0x5e')]([_0x453c('0x41'),'totalizers',_0x453c('0x5f')],{'done':function(_0x33c5d2){_0x21afc7(_0x33c5d2);window[_0x453c('0x5a')][_0x453c('0x27')]=_0x33c5d2;},'fail':function(_0x175502){_0x2211b0([_0x453c('0x60'),_0x175502]);}});}else alert(_0x453c('0x61'));}());_0x1be830[_0x453c('0x43')]();_0xd629bf(window)[_0x453c('0x62')](_0x453c('0x63'));return _0x11b565;};_0xd629bf['QD_simpleCart']={'elements':_0xd629bf('')};_0xd629bf(function(){var _0x5e1a11;'function'===typeof window['ajaxRequestbuyButtonAsynchronous']&&(_0x5e1a11=window[_0x453c('0x64')],window['ajaxRequestbuyButtonAsynchronous']=function(_0x4883ca,_0x2fd69d,_0x2aca48,_0x1c254c,_0x5188f1){_0x5e1a11[_0x453c('0x28')](this,_0x4883ca,_0x2fd69d,_0x2aca48,_0x1c254c,function(){_0x453c('0x12')===typeof _0x5188f1&&_0x5188f1();_0xd629bf[_0x453c('0x2e')]['elements'][_0x453c('0x36')](function(){var _0x20b17c=_0xd629bf(this);_0x20b17c['simpleCart'](_0x20b17c[_0x453c('0x17')]('qd_simpleCartOpts'));});});});});var _0x650054=window[_0x453c('0x65')]||void 0x0;window[_0x453c('0x65')]=function(_0x3af9e6){_0xd629bf['fn'][_0x453c('0x25')](!0x0);_0x453c('0x12')===typeof _0x650054?_0x650054[_0x453c('0x28')](this,_0x3af9e6):alert(_0x3af9e6);};_0xd629bf(function(){var _0x2735d7=_0xd629bf(_0x453c('0x66'));_0x2735d7['length']&&_0x2735d7[_0x453c('0x25')]();});_0xd629bf(function(){_0xd629bf(window)['bind'](_0x453c('0x67'),function(){_0xd629bf['fn'][_0x453c('0x25')](!0x0);});});}catch(_0x47a75b){'undefined'!==typeof console&&_0x453c('0x12')===typeof console[_0x453c('0x13')]&&console[_0x453c('0x13')](_0x453c('0x68'),_0x47a75b);}}}());(function(){var _0x4e7886=function(_0x1cb4b9,_0x18b970){if('object'===typeof console){var _0x3d5d3b=_0x453c('0x2a')===typeof _0x1cb4b9;_0x453c('0x4')!==typeof _0x18b970&&'alerta'===_0x18b970[_0x453c('0xf')]()?_0x3d5d3b?console[_0x453c('0x2b')](_0x453c('0x69'),_0x1cb4b9[0x0],_0x1cb4b9[0x1],_0x1cb4b9[0x2],_0x1cb4b9[0x3],_0x1cb4b9[0x4],_0x1cb4b9[0x5],_0x1cb4b9[0x6],_0x1cb4b9[0x7]):console['warn'](_0x453c('0x69')+_0x1cb4b9):_0x453c('0x4')!==typeof _0x18b970&&_0x453c('0x2d')===_0x18b970[_0x453c('0xf')]()?_0x3d5d3b?console[_0x453c('0x2d')]('[QD\x20VTEX\x20Checkout\x20Queue]\x0a',_0x1cb4b9[0x0],_0x1cb4b9[0x1],_0x1cb4b9[0x2],_0x1cb4b9[0x3],_0x1cb4b9[0x4],_0x1cb4b9[0x5],_0x1cb4b9[0x6],_0x1cb4b9[0x7]):console[_0x453c('0x2d')](_0x453c('0x69')+_0x1cb4b9):_0x3d5d3b?console['error'](_0x453c('0x69'),_0x1cb4b9[0x0],_0x1cb4b9[0x1],_0x1cb4b9[0x2],_0x1cb4b9[0x3],_0x1cb4b9[0x4],_0x1cb4b9[0x5],_0x1cb4b9[0x6],_0x1cb4b9[0x7]):console['error'](_0x453c('0x69')+_0x1cb4b9);}},_0x15b407=null,_0x204739={},_0x38e6f6={},_0x5cdcfc={};$[_0x453c('0x5e')]=function(_0x5a1304,_0x4b3624){if(null===_0x15b407)if('object'===typeof window[_0x453c('0x5b')]&&_0x453c('0x4')!==typeof window['vtexjs']['checkout'])_0x15b407=window['vtexjs']['checkout'];else return _0x4e7886(_0x453c('0x6a'));var _0x16648d=$[_0x453c('0x15')]({'done':function(){},'fail':function(){}},_0x4b3624),_0x5d42d3=_0x5a1304[_0x453c('0xa')](';'),_0x3280ef=function(){_0x204739[_0x5d42d3][_0x453c('0x6b')](_0x16648d[_0x453c('0x1c')]);_0x38e6f6[_0x5d42d3]['add'](_0x16648d[_0x453c('0x1e')]);};_0x5cdcfc[_0x5d42d3]?_0x3280ef():(_0x204739[_0x5d42d3]=$['Callbacks'](),_0x38e6f6[_0x5d42d3]=$[_0x453c('0x6c')](),_0x3280ef(),_0x5cdcfc[_0x5d42d3]=!0x0,_0x15b407[_0x453c('0x27')](_0x5a1304)[_0x453c('0x1c')](function(_0x4b2257){_0x5cdcfc[_0x5d42d3]=!0x1;_0x204739[_0x5d42d3][_0x453c('0x44')](_0x4b2257);})[_0x453c('0x1e')](function(_0x1a1cb9){_0x5cdcfc[_0x5d42d3]=!0x1;_0x38e6f6[_0x5d42d3]['fire'](_0x1a1cb9);}));};}());(function(_0x548915){try{var _0x10696d=jQuery,_0x59dcf4,_0x26a309=_0x10696d({}),_0x18e17a=function(_0x31088f,_0x37163f){if('object'===typeof console&&_0x453c('0x4')!==typeof console[_0x453c('0x13')]&&_0x453c('0x4')!==typeof console[_0x453c('0x2d')]&&_0x453c('0x4')!==typeof console[_0x453c('0x2b')]){var _0x174a25;_0x453c('0x2a')===typeof _0x31088f?(_0x31088f[_0x453c('0x6d')](_0x453c('0x6e')),_0x174a25=_0x31088f):_0x174a25=[_0x453c('0x6e')+_0x31088f];if(_0x453c('0x4')===typeof _0x37163f||_0x453c('0x4e')!==_0x37163f['toLowerCase']()&&_0x453c('0x6f')!==_0x37163f['toLowerCase']())if(_0x453c('0x4')!==typeof _0x37163f&&_0x453c('0x2d')===_0x37163f[_0x453c('0xf')]())try{console['info']['apply'](console,_0x174a25);}catch(_0x594838){try{console[_0x453c('0x2d')](_0x174a25[_0x453c('0xa')]('\x0a'));}catch(_0x4077c9){}}else try{console['error']['apply'](console,_0x174a25);}catch(_0x5481ec){try{console[_0x453c('0x13')](_0x174a25['join']('\x0a'));}catch(_0x15798a){}}else try{console[_0x453c('0x2b')][_0x453c('0x70')](console,_0x174a25);}catch(_0x3b2e16){try{console[_0x453c('0x2b')](_0x174a25[_0x453c('0xa')]('\x0a'));}catch(_0xd4d0d8){}}}},_0x2d62cd={'timeRemoveNewItemClass':0x1388,'isSmartCheckout':!0x0,'buyButton':_0x453c('0x71'),'buyQtt':_0x453c('0x72'),'selectSkuMsg':_0x453c('0x73'),'autoWatchBuyButton':!0x0,'buyIfQuantityZeroed':!0x1,'fakeRequest':!0x1,'productPageCallback':function(_0xc04232,_0x1ccfee,_0x545ced){_0x10696d('body')['is'](_0x453c('0x74'))&&('success'===_0x1ccfee?alert(_0x453c('0x75')):(alert('Ooops!\x20Algo\x20saiu\x20errado\x20ao\x20tentar\x20adicionar\x20seu\x20produto\x20ao\x20carrinho.\x20\x0a\x20Vou\x20te\x20redirecionar\x20para\x20o\x20carrinho.'),(_0x453c('0x2a')===typeof parent?parent:document)['location'][_0x453c('0x76')]=_0x545ced));},'isProductPage':function(){return _0x10696d(_0x453c('0x77'))['is'](_0x453c('0x78'));},'execDefaultAction':function(_0x670242){return!0x1;},'allowBuyClick':function(){return!0x0;},'callback':function(){},'asyncCallback':function(){}};_0x10696d['QD_buyButton']=function(_0x40ed8a,_0x40b800){function _0xd4fd2b(_0x22c744){_0x59dcf4[_0x453c('0x79')]?_0x22c744[_0x453c('0x17')](_0x453c('0x7a'))||(_0x22c744['data']('qd-bb-click-active',0x1),_0x22c744['on'](_0x453c('0x7b'),function(_0x51f5fd){if(!_0x59dcf4[_0x453c('0x7c')]())return!0x0;if(!0x0!==_0x1f29b1[_0x453c('0x7d')][_0x453c('0x28')](this))return _0x51f5fd[_0x453c('0x7e')](),!0x1;})):alert('Método\x20descontinuado!');}function _0x2b464c(_0x48207a){_0x48207a=_0x48207a||_0x10696d(_0x59dcf4['buyButton']);_0x48207a[_0x453c('0x36')](function(){var _0x48207a=_0x10696d(this);_0x48207a['is']('.qd-sbb-on')||(_0x48207a['addClass'](_0x453c('0x7f')),_0x48207a['is'](_0x453c('0x80'))&&!_0x48207a['is']('.remove-href')||_0x48207a[_0x453c('0x17')]('qd-bb-active')||(_0x48207a[_0x453c('0x17')](_0x453c('0x81'),0x1),_0x48207a[_0x453c('0x82')]('.qd-bb-productAdded')['length']||_0x48207a[_0x453c('0x83')]('<span\x20class=\x22qd-bb-productAdded\x22><i\x20class=\x22icon-thumbs-up\x22></i>\x20<span>Produto\x20adicionado</span></span>'),_0x48207a['is']('.buy-in-page-button')&&_0x59dcf4[_0x453c('0x84')]()&&_0x2d7954[_0x453c('0x28')](_0x48207a),_0xd4fd2b(_0x48207a)));});_0x59dcf4[_0x453c('0x84')]()&&!_0x48207a[_0x453c('0x9')]&&_0x18e17a('Oooops!\x0aAparentemente\x20esta\x20é\x20uma\x20página\x20de\x20produto\x20porém\x20não\x20encontrei\x20nenhum\x20botão\x20comprar!\x0aVerifique\x20se\x20é\x20este\x20mesmo\x20o\x20seletor:\x20\x27'+_0x48207a[_0x453c('0x85')]+'\x27.',_0x453c('0x2d'));}var _0x605b09=_0x10696d(_0x40ed8a);var _0x1f29b1=this;window[_0x453c('0x86')]=window[_0x453c('0x86')]||{};window[_0x453c('0x38')]=window[_0x453c('0x38')]||{};_0x1f29b1[_0x453c('0x87')]=function(_0x499403,_0x5caad4){_0x605b09[_0x453c('0x49')](_0x453c('0x88'));_0x10696d(_0x453c('0x77'))[_0x453c('0x49')](_0x453c('0x89'));var _0x540e64=_0x10696d(_0x59dcf4['buyButton'])[_0x453c('0x46')](_0x453c('0x8a')+(_0x499403[_0x453c('0x34')](_0x453c('0x76'))||'---')+'\x27]')[_0x453c('0x6b')](_0x499403);_0x540e64[_0x453c('0x49')](_0x453c('0x8b'));setTimeout(function(){_0x605b09['removeClass'](_0x453c('0x8c'));_0x540e64[_0x453c('0x4b')](_0x453c('0x8b'));},_0x59dcf4[_0x453c('0x8d')]);window['_Quatro_Digital_dropDown'][_0x453c('0x27')]=void 0x0;if('undefined'!==typeof _0x40b800&&_0x453c('0x12')===typeof _0x40b800['getCartInfoByUrl'])return _0x59dcf4[_0x453c('0x79')]||(_0x18e17a(_0x453c('0x8e')),_0x40b800[_0x453c('0x8f')]()),window['_QuatroDigital_DropDown'][_0x453c('0x27')]=void 0x0,_0x40b800[_0x453c('0x8f')](function(_0x45c8e0){window[_0x453c('0x86')][_0x453c('0x27')]=_0x45c8e0;_0x10696d['fn'][_0x453c('0x25')](!0x0,void 0x0,!0x0);},{'lastSku':_0x5caad4});window['_Quatro_Digital_dropDown'][_0x453c('0x90')]=!0x0;_0x10696d['fn'][_0x453c('0x25')](!0x0);};(function(){if(_0x59dcf4[_0x453c('0x79')]&&_0x59dcf4['autoWatchBuyButton']){var _0x4973b6=_0x10696d(_0x453c('0x80'));_0x4973b6[_0x453c('0x9')]&&_0x2b464c(_0x4973b6);}}());var _0x2d7954=function(){var _0xadbfd8=_0x10696d(this);_0x453c('0x4')!==typeof _0xadbfd8['data'](_0x453c('0x91'))?(_0xadbfd8['unbind'](_0x453c('0x92')),_0xd4fd2b(_0xadbfd8)):(_0xadbfd8[_0x453c('0x93')](_0x453c('0x94'),function(_0x50dc63){_0xadbfd8[_0x453c('0x95')](_0x453c('0x92'));_0xd4fd2b(_0xadbfd8);_0x10696d(this)[_0x453c('0x95')](_0x50dc63);}),_0x10696d(window)[_0x453c('0x96')](function(){_0xadbfd8[_0x453c('0x95')](_0x453c('0x92'));_0xd4fd2b(_0xadbfd8);_0xadbfd8['unbind'](_0x453c('0x94'));}));};_0x1f29b1[_0x453c('0x7d')]=function(){var _0x3cee19=_0x10696d(this),_0x40ed8a=_0x3cee19[_0x453c('0x34')](_0x453c('0x76'))||'';if(-0x1<_0x40ed8a['indexOf'](_0x59dcf4[_0x453c('0x97')]))return!0x0;_0x40ed8a=_0x40ed8a['replace'](/redirect\=(false|true)/gi,'')[_0x453c('0x2')]('?','?redirect=false&')['replace'](/\&\&/gi,'&');if(_0x59dcf4[_0x453c('0x98')](_0x3cee19))return _0x3cee19[_0x453c('0x34')](_0x453c('0x76'),_0x40ed8a['replace'](_0x453c('0x99'),_0x453c('0x9a'))),!0x0;_0x40ed8a=_0x40ed8a[_0x453c('0x2')](/http.?:/i,'');_0x26a309[_0x453c('0x9b')](function(_0x26216c){if(!_0x59dcf4[_0x453c('0x9c')]&&!/(&|\?)qty\=[1-9][0-9]*/gi[_0x453c('0x9d')](_0x40ed8a))return _0x26216c();var _0x5e113a=function(_0x582483,_0xea6686){var _0x2b464c=_0x40ed8a[_0x453c('0x9e')](/sku\=([0-9]+)/gi),_0x2f65bf=[];if(_0x453c('0x2a')===typeof _0x2b464c&&null!==_0x2b464c)for(var _0x8afbd4=_0x2b464c[_0x453c('0x9')]-0x1;0x0<=_0x8afbd4;_0x8afbd4--){var _0x39dc15=parseInt(_0x2b464c[_0x8afbd4]['replace'](/sku\=/gi,''));isNaN(_0x39dc15)||_0x2f65bf[_0x453c('0x9f')](_0x39dc15);}_0x59dcf4['productPageCallback'][_0x453c('0x28')](this,_0x582483,_0xea6686,_0x40ed8a);_0x1f29b1[_0x453c('0xa0')][_0x453c('0x28')](this,_0x582483,_0xea6686,_0x40ed8a,_0x2f65bf);_0x1f29b1['prodAdd'](_0x3cee19,_0x40ed8a['split'](_0x453c('0xa1'))[_0x453c('0xa2')]()[_0x453c('0x8')]('&')[_0x453c('0xa3')]());'function'===typeof _0x59dcf4[_0x453c('0xa4')]&&_0x59dcf4[_0x453c('0xa4')]['call'](this);_0x10696d(window)[_0x453c('0x62')](_0x453c('0xa5'));_0x10696d(window)[_0x453c('0x62')](_0x453c('0xa6'));};_0x59dcf4[_0x453c('0xa7')]?(_0x5e113a(null,_0x453c('0x1d')),_0x26216c()):_0x10696d[_0x453c('0x1b')]({'url':_0x40ed8a,'complete':_0x5e113a})[_0x453c('0x1f')](function(){_0x26216c();});});};_0x1f29b1['buyButtonClickCallback']=function(_0x302475,_0x48292a,_0x3cbd0c,_0x59e205){try{'success'===_0x48292a&&_0x453c('0x2a')===typeof window['parent']&&'function'===typeof window[_0x453c('0xa8')]['_QuatroDigital_prodBuyCallback']&&window[_0x453c('0xa8')]['_QuatroDigital_prodBuyCallback'](_0x302475,_0x48292a,_0x3cbd0c,_0x59e205);}catch(_0x1a6fd6){_0x18e17a(_0x453c('0xa9'));}};_0x2b464c();_0x453c('0x12')===typeof _0x59dcf4[_0x453c('0x43')]?_0x59dcf4['callback'][_0x453c('0x28')](this):_0x18e17a(_0x453c('0xaa'));};var _0x47c385=_0x10696d[_0x453c('0x6c')]();_0x10696d['fn'][_0x453c('0xab')]=function(_0x29ad15,_0x5cd0db){var _0x548915=_0x10696d(this);_0x453c('0x4')!==typeof _0x5cd0db||_0x453c('0x2a')!==typeof _0x29ad15||_0x29ad15 instanceof _0x10696d||(_0x5cd0db=_0x29ad15,_0x29ad15=void 0x0);_0x59dcf4=_0x10696d['extend']({},_0x2d62cd,_0x5cd0db);var _0x58498a;_0x47c385[_0x453c('0x6b')](function(){_0x548915[_0x453c('0x82')](_0x453c('0xac'))[_0x453c('0x9')]||_0x548915[_0x453c('0xad')](_0x453c('0xae'));_0x58498a=new _0x10696d[(_0x453c('0xab'))](_0x548915,_0x29ad15);});_0x47c385[_0x453c('0x44')]();_0x10696d(window)['on'](_0x453c('0xaf'),function(_0x5812be,_0xda4321,_0x57ae64){_0x58498a[_0x453c('0x87')](_0xda4321,_0x57ae64);});return _0x10696d[_0x453c('0x15')](_0x548915,_0x58498a);};var _0x1e5963=0x0;_0x10696d(document)[_0x453c('0xb0')](function(_0x643598,_0x4be00b,_0x5a817e){-0x1<_0x5a817e['url'][_0x453c('0xf')]()[_0x453c('0xb1')]('/checkout/cart/add')&&(_0x1e5963=(_0x5a817e[_0x453c('0x19')][_0x453c('0x9e')](/sku\=([0-9]+)/i)||[''])[_0x453c('0xa2')]());});_0x10696d(window)['bind'](_0x453c('0xb2'),function(){_0x10696d(window)[_0x453c('0x62')](_0x453c('0xaf'),[new _0x10696d(),_0x1e5963]);});_0x10696d(document)[_0x453c('0xb3')](function(){_0x47c385['fire']();});}catch(_0x333c93){_0x453c('0x4')!==typeof console&&_0x453c('0x12')===typeof console[_0x453c('0x13')]&&console['error'](_0x453c('0x68'),_0x333c93);}}(this));function qd_number_format(_0x3fd0f8,_0x1af857,_0x246439,_0x3dc5be){_0x3fd0f8=(_0x3fd0f8+'')[_0x453c('0x2')](/[^0-9+\-Ee.]/g,'');_0x3fd0f8=isFinite(+_0x3fd0f8)?+_0x3fd0f8:0x0;_0x1af857=isFinite(+_0x1af857)?Math[_0x453c('0x3')](_0x1af857):0x0;_0x3dc5be=_0x453c('0x4')===typeof _0x3dc5be?',':_0x3dc5be;_0x246439=_0x453c('0x4')===typeof _0x246439?'.':_0x246439;var _0x52df8b='',_0x52df8b=function(_0x36b411,_0x417a54){var _0x322e31=Math[_0x453c('0x5')](0xa,_0x417a54);return''+(Math[_0x453c('0x6')](_0x36b411*_0x322e31)/_0x322e31)[_0x453c('0x7')](_0x417a54);},_0x52df8b=(_0x1af857?_0x52df8b(_0x3fd0f8,_0x1af857):''+Math['round'](_0x3fd0f8))[_0x453c('0x8')]('.');0x3<_0x52df8b[0x0][_0x453c('0x9')]&&(_0x52df8b[0x0]=_0x52df8b[0x0]['replace'](/\B(?=(?:\d{3})+(?!\d))/g,_0x3dc5be));(_0x52df8b[0x1]||'')[_0x453c('0x9')]<_0x1af857&&(_0x52df8b[0x1]=_0x52df8b[0x1]||'',_0x52df8b[0x1]+=Array(_0x1af857-_0x52df8b[0x1][_0x453c('0x9')]+0x1)[_0x453c('0xa')]('0'));return _0x52df8b[_0x453c('0xa')](_0x246439);}(function(){try{window[_0x453c('0x38')]=window['_QuatroDigital_CartData']||{},window['_QuatroDigital_CartData'][_0x453c('0x43')]=window[_0x453c('0x38')][_0x453c('0x43')]||$[_0x453c('0x6c')]();}catch(_0x5bc114){_0x453c('0x4')!==typeof console&&_0x453c('0x12')===typeof console[_0x453c('0x13')]&&console[_0x453c('0x13')]('Oooops!\x20',_0x5bc114[_0x453c('0x22')]);}}());(function(_0x49a992){try{var _0x55dad1=jQuery,_0x240e4e=function(_0x287064,_0x48bce7){if(_0x453c('0x2a')===typeof console&&'undefined'!==typeof console['error']&&_0x453c('0x4')!==typeof console[_0x453c('0x2d')]&&_0x453c('0x4')!==typeof console[_0x453c('0x2b')]){var _0x459ae7;_0x453c('0x2a')===typeof _0x287064?(_0x287064[_0x453c('0x6d')]('[Quatro\x20Digital\x20-\x20DropDown\x20Cart]\x0a'),_0x459ae7=_0x287064):_0x459ae7=[_0x453c('0xb4')+_0x287064];if(_0x453c('0x4')===typeof _0x48bce7||'alerta'!==_0x48bce7['toLowerCase']()&&_0x453c('0x6f')!==_0x48bce7[_0x453c('0xf')]())if(_0x453c('0x4')!==typeof _0x48bce7&&_0x453c('0x2d')===_0x48bce7[_0x453c('0xf')]())try{console[_0x453c('0x2d')][_0x453c('0x70')](console,_0x459ae7);}catch(_0x51a4b3){try{console['info'](_0x459ae7['join']('\x0a'));}catch(_0x33c955){}}else try{console[_0x453c('0x13')][_0x453c('0x70')](console,_0x459ae7);}catch(_0x3735db){try{console[_0x453c('0x13')](_0x459ae7[_0x453c('0xa')]('\x0a'));}catch(_0x6d1bf7){}}else try{console[_0x453c('0x2b')][_0x453c('0x70')](console,_0x459ae7);}catch(_0xc33116){try{console[_0x453c('0x2b')](_0x459ae7[_0x453c('0xa')]('\x0a'));}catch(_0x3624bf){}}}};window[_0x453c('0x5a')]=window['_QuatroDigital_DropDown']||{};window[_0x453c('0x5a')][_0x453c('0x90')]=!0x0;_0x55dad1[_0x453c('0xb5')]=function(){};_0x55dad1['fn'][_0x453c('0xb5')]=function(){return{'fn':new _0x55dad1()};};var _0x835c92=function(_0x5939b0){var _0x100134={'z':_0x453c('0xb6')};return function(_0x4adeb1){var _0x5e1927=function(_0x34ee6f){return _0x34ee6f;};var _0x1c3a80=['a','e',0x12,'m','s','k','d','u','g','h','a','g','s','t','z','y','o','u','o','b'];_0x4adeb1=_0x4adeb1['d'+_0x1c3a80[0x10]+'c'+_0x1c3a80[0x11]+'m'+_0x5e1927(_0x1c3a80[0x1])+'n'+_0x1c3a80[0xd]]['l'+_0x1c3a80[0x12]+'c'+_0x1c3a80[0x0]+'ti'+_0x5e1927('o')+'n'];var _0x1ab55a=function(_0x4db7a1){return escape(encodeURIComponent(_0x4db7a1[_0x453c('0x2')](/\./g,'¨')[_0x453c('0x2')](/[a-zA-Z]/g,function(_0x518a73){return String[_0x453c('0xb7')](('Z'>=_0x518a73?0x5a:0x7a)>=(_0x518a73=_0x518a73['charCodeAt'](0x0)+0xd)?_0x518a73:_0x518a73-0x1a);})));};var _0x49a992=_0x1ab55a(_0x4adeb1[[_0x1c3a80[0x9],_0x5e1927('o'),_0x1c3a80[0xc],_0x1c3a80[_0x5e1927(0xd)]]['join']('')]);_0x1ab55a=_0x1ab55a((window[['js',_0x5e1927('no'),'m',_0x1c3a80[0x1],_0x1c3a80[0x4][_0x453c('0xd')](),_0x453c('0xb8')][_0x453c('0xa')]('')]||'---')+['.v',_0x1c3a80[0xd],'e',_0x5e1927('x'),'co',_0x5e1927('mm'),'erc',_0x1c3a80[0x1],'.c',_0x5e1927('o'),'m.',_0x1c3a80[0x13],'r'][_0x453c('0xa')](''));for(var _0x30409a in _0x100134){if(_0x1ab55a===_0x30409a+_0x100134[_0x30409a]||_0x49a992===_0x30409a+_0x100134[_0x30409a]){var _0x5ec050='tr'+_0x1c3a80[0x11]+'e';break;}_0x5ec050='f'+_0x1c3a80[0x0]+'ls'+_0x5e1927(_0x1c3a80[0x1])+'';}_0x5e1927=!0x1;-0x1<_0x4adeb1[[_0x1c3a80[0xc],'e',_0x1c3a80[0x0],'rc',_0x1c3a80[0x9]]['join']('')][_0x453c('0xb1')]('qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82')&&(_0x5e1927=!0x0);return[_0x5ec050,_0x5e1927];}(_0x5939b0);}(window);if(!eval(_0x835c92[0x0]))return _0x835c92[0x1]?_0x240e4e('ทÃѲ\x20√Αℓ¡∂Α∂Ѳ\x20ΡΑ૨Α\x20૯ઽƬΑ\x20LѲJΑ!'):!0x1;_0x55dad1['QD_dropDownCart']=function(_0x43128f,_0x428ccd){var _0x3d4753=_0x55dad1(_0x43128f);if(!_0x3d4753['length'])return _0x3d4753;var _0x245b94=_0x55dad1[_0x453c('0x15')](!0x0,{},{'updateOnlyHover':!0x0,'texts':{'linkCart':_0x453c('0xb9'),'linkCheckout':_0x453c('0xba'),'cartTotal':_0x453c('0xbb'),'emptyCart':_0x453c('0xbc'),'continueShopping':_0x453c('0xbd'),'shippingForm':_0x453c('0xbe')},'timeRemoveNewItemClass':0x1388,'smartCheckout':!0x0,'skuName':function(_0x50f1ac){return _0x50f1ac[_0x453c('0xbf')]||_0x50f1ac['name'];},'callback':function(){},'callbackProductsList':function(){}},_0x428ccd);_0x55dad1('');var _0x3c325d=this;if(_0x245b94[_0x453c('0x59')]){var _0x41ca7a=!0x1;_0x453c('0x4')===typeof window[_0x453c('0x5b')]&&(_0x240e4e(_0x453c('0xc0')),_0x55dad1[_0x453c('0x1b')]({'url':'//io.vtex.com.br/vtex.js/1.0.0/vtex.min.js','async':!0x1,'dataType':_0x453c('0xc1'),'error':function(){_0x240e4e(_0x453c('0xc2'));_0x41ca7a=!0x0;}}));if(_0x41ca7a)return _0x240e4e(_0x453c('0xc3'));}if(_0x453c('0x2a')===typeof window[_0x453c('0x5b')]&&_0x453c('0x4')!==typeof window[_0x453c('0x5b')][_0x453c('0x26')])var _0x197b6b=window['vtexjs']['checkout'];else if(_0x453c('0x2a')===typeof vtex&&'object'===typeof vtex[_0x453c('0x26')]&&_0x453c('0x4')!==typeof vtex[_0x453c('0x26')]['SDK'])_0x197b6b=new vtex[(_0x453c('0x26'))][(_0x453c('0x5c'))]();else return _0x240e4e(_0x453c('0x5d'));_0x3c325d[_0x453c('0xc4')]=_0x453c('0xc5');var _0x11770c=function(_0x10c32d){_0x55dad1(this)['append'](_0x10c32d);_0x10c32d['find'](_0x453c('0xc6'))['add'](_0x55dad1(_0x453c('0xc7')))['on']('click.qd_ddc_closeFn',function(){_0x3d4753['removeClass'](_0x453c('0xc8'));_0x55dad1(document[_0x453c('0x77')])[_0x453c('0x4b')](_0x453c('0x89'));});_0x55dad1(document)[_0x453c('0xc9')](_0x453c('0xca'))['on']('keyup.qd_ddc_closeFn',function(_0x1a4565){0x1b==_0x1a4565[_0x453c('0xcb')]&&(_0x3d4753[_0x453c('0x4b')](_0x453c('0xc8')),_0x55dad1(document[_0x453c('0x77')])[_0x453c('0x4b')](_0x453c('0x89')));});var _0x301442=_0x10c32d[_0x453c('0x52')](_0x453c('0xcc'));_0x10c32d[_0x453c('0x52')]('.qd-ddc-scrollUp')['on'](_0x453c('0xcd'),function(){_0x3c325d['scrollCart']('-',void 0x0,void 0x0,_0x301442);return!0x1;});_0x10c32d[_0x453c('0x52')](_0x453c('0xce'))['on'](_0x453c('0xcf'),function(){_0x3c325d[_0x453c('0xd0')](void 0x0,void 0x0,void 0x0,_0x301442);return!0x1;});_0x10c32d[_0x453c('0x52')](_0x453c('0xd1'))['val']('')['on'](_0x453c('0xd2'),function(){_0x3c325d[_0x453c('0xd3')](_0x55dad1(this));});if(_0x245b94['updateOnlyHover']){var _0x428ccd=0x0;_0x55dad1(this)['on'](_0x453c('0xd4'),function(){var _0x10c32d=function(){window[_0x453c('0x5a')][_0x453c('0x90')]&&(_0x3c325d['getCartInfoByUrl'](),window[_0x453c('0x5a')]['allowUpdate']=!0x1,_0x55dad1['fn'][_0x453c('0x25')](!0x0),_0x3c325d[_0x453c('0xd5')]());};_0x428ccd=setInterval(function(){_0x10c32d();},0x258);_0x10c32d();});_0x55dad1(this)['on'](_0x453c('0xd6'),function(){clearInterval(_0x428ccd);});}};var _0x3fb1aa=function(_0x13a2e6){_0x13a2e6=_0x55dad1(_0x13a2e6);_0x245b94['texts']['cartTotal']=_0x245b94[_0x453c('0xd7')][_0x453c('0xd8')][_0x453c('0x2')](_0x453c('0xd9'),_0x453c('0xda'));_0x245b94['texts']['cartTotal']=_0x245b94[_0x453c('0xd7')][_0x453c('0xd8')][_0x453c('0x2')](_0x453c('0xdb'),_0x453c('0xdc'));_0x245b94[_0x453c('0xd7')][_0x453c('0xd8')]=_0x245b94[_0x453c('0xd7')][_0x453c('0xd8')]['replace'](_0x453c('0xdd'),_0x453c('0xde'));_0x245b94[_0x453c('0xd7')]['cartTotal']=_0x245b94[_0x453c('0xd7')][_0x453c('0xd8')][_0x453c('0x2')]('#total',_0x453c('0xdf'));_0x13a2e6[_0x453c('0x52')]('.qd-ddc-viewCart')[_0x453c('0x50')](_0x245b94[_0x453c('0xd7')][_0x453c('0xe0')]);_0x13a2e6[_0x453c('0x52')](_0x453c('0xe1'))[_0x453c('0x50')](_0x245b94[_0x453c('0xd7')][_0x453c('0xe2')]);_0x13a2e6[_0x453c('0x52')](_0x453c('0xe3'))[_0x453c('0x50')](_0x245b94['texts'][_0x453c('0xe4')]);_0x13a2e6[_0x453c('0x52')]('.qd-ddc-infoTotal')[_0x453c('0x50')](_0x245b94['texts'][_0x453c('0xd8')]);_0x13a2e6['find'](_0x453c('0xe5'))[_0x453c('0x50')](_0x245b94['texts']['shippingForm']);_0x13a2e6['find'](_0x453c('0xe6'))[_0x453c('0x50')](_0x245b94['texts'][_0x453c('0x57')]);return _0x13a2e6;}(this[_0x453c('0xc4')]);var _0x4a3eb7=0x0;_0x3d4753[_0x453c('0x36')](function(){0x0<_0x4a3eb7?_0x11770c[_0x453c('0x28')](this,_0x3fb1aa[_0x453c('0xe7')]()):_0x11770c[_0x453c('0x28')](this,_0x3fb1aa);_0x4a3eb7++;});window['_QuatroDigital_CartData'][_0x453c('0x43')][_0x453c('0x6b')](function(){_0x55dad1(_0x453c('0xe8'))[_0x453c('0x50')](window[_0x453c('0x38')][_0x453c('0x3b')]||'--');_0x55dad1(_0x453c('0xe9'))[_0x453c('0x50')](window[_0x453c('0x38')][_0x453c('0x3f')]||'0');_0x55dad1(_0x453c('0xea'))[_0x453c('0x50')](window[_0x453c('0x38')]['shipping']||'--');_0x55dad1(_0x453c('0xeb'))[_0x453c('0x50')](window[_0x453c('0x38')]['allTotal']||'--');});var _0x5ce4e0=function(_0x2ff4bf,_0x4fe600){if(_0x453c('0x4')===typeof _0x2ff4bf[_0x453c('0x41')])return _0x240e4e(_0x453c('0xec'));_0x3c325d[_0x453c('0xed')][_0x453c('0x28')](this,_0x4fe600);};_0x3c325d[_0x453c('0x8f')]=function(_0x533027,_0xe6141b){'undefined'!=typeof _0xe6141b?window[_0x453c('0x5a')][_0x453c('0xee')]=_0xe6141b:window['_QuatroDigital_DropDown'][_0x453c('0xee')]&&(_0xe6141b=window[_0x453c('0x5a')]['dataOptionsCache']);setTimeout(function(){window['_QuatroDigital_DropDown']['dataOptionsCache']=void 0x0;},_0x245b94[_0x453c('0x8d')]);_0x55dad1(_0x453c('0xef'))['removeClass'](_0x453c('0xf0'));if(_0x245b94['smartCheckout']){var _0x428ccd=function(_0x4bd01a){window[_0x453c('0x5a')]['getOrderForm']=_0x4bd01a;_0x5ce4e0(_0x4bd01a,_0xe6141b);_0x453c('0x4')!==typeof window[_0x453c('0xf1')]&&_0x453c('0x12')===typeof window[_0x453c('0xf1')][_0x453c('0xf2')]&&window[_0x453c('0xf1')]['exec']['call'](this);_0x55dad1(_0x453c('0xef'))[_0x453c('0x49')]('qd-ddc-prodLoaded');};_0x453c('0x4')!==typeof window[_0x453c('0x5a')][_0x453c('0x27')]?(_0x428ccd(window[_0x453c('0x5a')][_0x453c('0x27')]),_0x453c('0x12')===typeof _0x533027&&_0x533027(window['_QuatroDigital_DropDown'][_0x453c('0x27')])):_0x55dad1[_0x453c('0x5e')]([_0x453c('0x41'),_0x453c('0x39'),_0x453c('0x5f')],{'done':function(_0x404166){_0x428ccd[_0x453c('0x28')](this,_0x404166);_0x453c('0x12')===typeof _0x533027&&_0x533027(_0x404166);},'fail':function(_0x26d411){_0x240e4e([_0x453c('0xf3'),_0x26d411]);}});}else alert(_0x453c('0xf4'));};_0x3c325d[_0x453c('0xd5')]=function(){var _0x1a6a60=_0x55dad1(_0x453c('0xef'));_0x1a6a60[_0x453c('0x52')](_0x453c('0xf5'))[_0x453c('0x9')]?_0x1a6a60[_0x453c('0x4b')](_0x453c('0xf6')):_0x1a6a60[_0x453c('0x49')](_0x453c('0xf6'));};_0x3c325d['renderProductsList']=function(_0xa07ebb){var _0x428ccd=_0x55dad1(_0x453c('0xf7'));_0x428ccd[_0x453c('0xf8')]();_0x428ccd[_0x453c('0x36')](function(){var _0x428ccd=_0x55dad1(this),_0x43128f,_0x3fa81b,_0x5c69b5=_0x55dad1(''),_0x27942f;for(_0x27942f in window['_QuatroDigital_DropDown'][_0x453c('0x27')]['items'])if(_0x453c('0x2a')===typeof window[_0x453c('0x5a')][_0x453c('0x27')]['items'][_0x27942f]){var _0x4a860a=window[_0x453c('0x5a')][_0x453c('0x27')][_0x453c('0x41')][_0x27942f];var _0x22f7b8=_0x4a860a[_0x453c('0xf9')][_0x453c('0x2')](/^\/|\/$/g,'')[_0x453c('0x8')]('/');var _0x264200=_0x55dad1(_0x453c('0xfa'));_0x264200[_0x453c('0x34')]({'data-sku':_0x4a860a['id'],'data-sku-index':_0x27942f,'data-qd-departament':_0x22f7b8[0x0],'data-qd-category':_0x22f7b8[_0x22f7b8['length']-0x1]});_0x264200[_0x453c('0x49')]('qd-ddc-'+_0x4a860a[_0x453c('0xfb')]);_0x264200['find'](_0x453c('0xfc'))[_0x453c('0x83')](_0x245b94[_0x453c('0xbf')](_0x4a860a));_0x264200[_0x453c('0x52')]('.qd-ddc-prodPrice')['append'](isNaN(_0x4a860a[_0x453c('0xfd')])?_0x4a860a[_0x453c('0xfd')]:0x0==_0x4a860a['sellingPrice']?'Grátis':(_0x55dad1('meta[name=currency]')[_0x453c('0x34')](_0x453c('0x35'))||'R$')+'\x20'+qd_number_format(_0x4a860a[_0x453c('0xfd')]/0x64,0x2,',','.'));_0x264200['find'](_0x453c('0xfe'))[_0x453c('0x34')]({'data-sku':_0x4a860a['id'],'data-sku-index':_0x27942f})['val'](_0x4a860a[_0x453c('0x42')]);_0x264200['find']('.qd-ddc-remove')[_0x453c('0x34')]({'data-sku':_0x4a860a['id'],'data-sku-index':_0x27942f});_0x3c325d['insertProdImg'](_0x4a860a['id'],_0x264200[_0x453c('0x52')](_0x453c('0xff')),_0x4a860a[_0x453c('0x100')]);_0x264200[_0x453c('0x52')](_0x453c('0x101'))[_0x453c('0x34')]({'data-sku':_0x4a860a['id'],'data-sku-index':_0x27942f});_0x264200[_0x453c('0x102')](_0x428ccd);_0x5c69b5=_0x5c69b5[_0x453c('0x6b')](_0x264200);}try{var _0xe0180a=_0x428ccd[_0x453c('0x0')](_0x453c('0xef'))[_0x453c('0x52')]('.qd-ddc-shipping\x20input');_0xe0180a[_0x453c('0x9')]&&''==_0xe0180a[_0x453c('0x103')]()&&window[_0x453c('0x5a')][_0x453c('0x27')]['shippingData'][_0x453c('0x104')]&&_0xe0180a[_0x453c('0x103')](window[_0x453c('0x5a')]['getOrderForm'][_0x453c('0x5f')][_0x453c('0x104')][_0x453c('0x105')]);}catch(_0x487e12){_0x240e4e(_0x453c('0x106')+_0x487e12['message'],_0x453c('0x6f'));}_0x3c325d[_0x453c('0x107')](_0x428ccd);_0x3c325d[_0x453c('0xd5')]();_0xa07ebb&&_0xa07ebb[_0x453c('0x108')]&&function(){_0x3fa81b=_0x5c69b5[_0x453c('0x46')](_0x453c('0x109')+_0xa07ebb['lastSku']+'\x27]');_0x3fa81b[_0x453c('0x9')]&&(_0x43128f=0x0,_0x5c69b5[_0x453c('0x36')](function(){var _0xa07ebb=_0x55dad1(this);if(_0xa07ebb['is'](_0x3fa81b))return!0x1;_0x43128f+=_0xa07ebb['outerHeight']();}),_0x3c325d[_0x453c('0xd0')](void 0x0,void 0x0,_0x43128f,_0x428ccd[_0x453c('0x6b')](_0x428ccd[_0x453c('0xa8')]())),_0x5c69b5['removeClass'](_0x453c('0x10a')),function(_0x2fd522){_0x2fd522[_0x453c('0x49')](_0x453c('0x10b'));_0x2fd522[_0x453c('0x49')](_0x453c('0x10a'));setTimeout(function(){_0x2fd522[_0x453c('0x4b')](_0x453c('0x10b'));},_0x245b94[_0x453c('0x8d')]);}(_0x3fa81b));}();});(function(){_QuatroDigital_DropDown[_0x453c('0x27')][_0x453c('0x41')][_0x453c('0x9')]?(_0x55dad1(_0x453c('0x77'))[_0x453c('0x4b')]('qd-ddc-cart-empty')[_0x453c('0x49')]('qd-ddc-cart-rendered\x20qd-ddc-product-add-time'),setTimeout(function(){_0x55dad1(_0x453c('0x77'))[_0x453c('0x4b')](_0x453c('0x10c'));},_0x245b94[_0x453c('0x8d')])):_0x55dad1(_0x453c('0x77'))[_0x453c('0x4b')]('qd-ddc-cart-rendered')['addClass']('qd-ddc-cart-empty');}());_0x453c('0x12')===typeof _0x245b94[_0x453c('0x10d')]?_0x245b94[_0x453c('0x10d')][_0x453c('0x28')](this):_0x240e4e(_0x453c('0x10e'));};_0x3c325d[_0x453c('0x10f')]=function(_0x49599b,_0xd04754,_0x185dfe){function _0x5f0e2f(){_0xd04754[_0x453c('0x4b')]('qd-loaded')[_0x453c('0x96')](function(){_0x55dad1(this)['addClass']('qd-loaded');})['attr'](_0x453c('0x110'),_0x185dfe);}_0x185dfe?_0x5f0e2f():isNaN(_0x49599b)?_0x240e4e(_0x453c('0x111'),_0x453c('0x4e')):alert(_0x453c('0x112'));};_0x3c325d[_0x453c('0x107')]=function(_0x357cf0){var _0x5e002b=function(_0x452d44,_0x188849){var _0x428ccd=_0x55dad1(_0x452d44);var _0x220b9e=_0x428ccd[_0x453c('0x34')](_0x453c('0x113'));var _0x43128f=_0x428ccd[_0x453c('0x34')](_0x453c('0x114'));if(_0x220b9e){var _0x20807b=parseInt(_0x428ccd['val']())||0x1;_0x3c325d[_0x453c('0x115')]([_0x220b9e,_0x43128f],_0x20807b,_0x20807b+0x1,function(_0x1aa994){_0x428ccd[_0x453c('0x103')](_0x1aa994);_0x453c('0x12')===typeof _0x188849&&_0x188849();});}};var _0x428ccd=function(_0x518b51,_0x15775b){var _0x428ccd=_0x55dad1(_0x518b51);var _0x4a193d=_0x428ccd['attr'](_0x453c('0x113'));var _0x43128f=_0x428ccd[_0x453c('0x34')](_0x453c('0x114'));if(_0x4a193d){var _0x545001=parseInt(_0x428ccd[_0x453c('0x103')]())||0x2;_0x3c325d[_0x453c('0x115')]([_0x4a193d,_0x43128f],_0x545001,_0x545001-0x1,function(_0x3d6cb4){_0x428ccd['val'](_0x3d6cb4);_0x453c('0x12')===typeof _0x15775b&&_0x15775b();});}};var _0x593f9d=function(_0x3cdf39,_0x5733ed){var _0x428ccd=_0x55dad1(_0x3cdf39);var _0x86e384=_0x428ccd[_0x453c('0x34')](_0x453c('0x113'));var _0x43128f=_0x428ccd[_0x453c('0x34')]('data-sku-index');if(_0x86e384){var _0xc2a1d0=parseInt(_0x428ccd[_0x453c('0x103')]())||0x1;_0x3c325d['changeQantity']([_0x86e384,_0x43128f],0x1,_0xc2a1d0,function(_0x1b411b){_0x428ccd[_0x453c('0x103')](_0x1b411b);_0x453c('0x12')===typeof _0x5733ed&&_0x5733ed();});}};var _0x43128f=_0x357cf0[_0x453c('0x52')](_0x453c('0x116'));_0x43128f[_0x453c('0x49')](_0x453c('0x117'))[_0x453c('0x36')](function(){var _0x357cf0=_0x55dad1(this);_0x357cf0['find'](_0x453c('0x118'))['on'](_0x453c('0x119'),function(_0x4e5c73){_0x4e5c73['preventDefault']();_0x43128f[_0x453c('0x49')](_0x453c('0x11a'));_0x5e002b(_0x357cf0[_0x453c('0x52')]('.qd-ddc-quantity'),function(){_0x43128f['removeClass'](_0x453c('0x11a'));});});_0x357cf0[_0x453c('0x52')](_0x453c('0x11b'))['on'](_0x453c('0x11c'),function(_0xe850c){_0xe850c[_0x453c('0x7e')]();_0x43128f[_0x453c('0x49')](_0x453c('0x11a'));_0x428ccd(_0x357cf0[_0x453c('0x52')]('.qd-ddc-quantity'),function(){_0x43128f[_0x453c('0x4b')](_0x453c('0x11a'));});});_0x357cf0['find'](_0x453c('0xfe'))['on'](_0x453c('0x11d'),function(){_0x43128f['addClass'](_0x453c('0x11a'));_0x593f9d(this,function(){_0x43128f['removeClass'](_0x453c('0x11a'));});});_0x357cf0[_0x453c('0x52')](_0x453c('0xfe'))['on'](_0x453c('0x11e'),function(_0x1960e9){0xd==_0x1960e9['keyCode']&&(_0x43128f[_0x453c('0x49')](_0x453c('0x11a')),_0x593f9d(this,function(){_0x43128f[_0x453c('0x4b')](_0x453c('0x11a'));}));});});_0x357cf0[_0x453c('0x52')](_0x453c('0xf5'))[_0x453c('0x36')](function(){var _0x357cf0=_0x55dad1(this);_0x357cf0[_0x453c('0x52')](_0x453c('0x11f'))['on'](_0x453c('0x120'),function(){_0x357cf0[_0x453c('0x49')](_0x453c('0x11a'));_0x3c325d[_0x453c('0x121')](_0x55dad1(this),function(_0x2e2210){_0x2e2210?_0x357cf0['stop'](!0x0)[_0x453c('0x122')](function(){_0x357cf0[_0x453c('0x123')]();_0x3c325d['cartIsEmpty']();}):_0x357cf0['removeClass'](_0x453c('0x11a'));});return!0x1;});});};_0x3c325d[_0x453c('0xd3')]=function(_0xb0eb05){var _0x462175=_0xb0eb05[_0x453c('0x103')](),_0x462175=_0x462175[_0x453c('0x2')](/[^0-9\-]/g,''),_0x462175=_0x462175[_0x453c('0x2')](/([0-9]{5})\-?([0-9])([0-9]{2})?/g,_0x453c('0x124')),_0x462175=_0x462175[_0x453c('0x2')](/(.{9}).*/g,'$1');_0xb0eb05[_0x453c('0x103')](_0x462175);0x9<=_0x462175[_0x453c('0x9')]&&(_0xb0eb05[_0x453c('0x17')]('qdDdcLastPostalCode')!=_0x462175&&_0x197b6b['calculateShipping']({'postalCode':_0x462175,'country':_0x453c('0x125')})['done'](function(_0x137ac3){window[_0x453c('0x5a')][_0x453c('0x27')]=_0x137ac3;_0x3c325d['getCartInfoByUrl']();})[_0x453c('0x1e')](function(_0x4ccd1f){_0x240e4e([_0x453c('0x126'),_0x4ccd1f]);updateCartData();}),_0xb0eb05['data'](_0x453c('0x127'),_0x462175));};_0x3c325d[_0x453c('0x115')]=function(_0x373af8,_0x2d30db,_0xf6185f,_0x33d1eb){function _0x37ff6a(_0x4c548a){_0x4c548a=_0x453c('0x128')!==typeof _0x4c548a?!0x1:_0x4c548a;_0x3c325d[_0x453c('0x8f')]();window[_0x453c('0x5a')][_0x453c('0x90')]=!0x1;_0x3c325d[_0x453c('0xd5')]();_0x453c('0x4')!==typeof window[_0x453c('0xf1')]&&_0x453c('0x12')===typeof window[_0x453c('0xf1')][_0x453c('0xf2')]&&window[_0x453c('0xf1')][_0x453c('0xf2')]['call'](this);_0x453c('0x12')===typeof adminCart&&adminCart();_0x55dad1['fn'][_0x453c('0x25')](!0x0,void 0x0,_0x4c548a);_0x453c('0x12')===typeof _0x33d1eb&&_0x33d1eb(_0x2d30db);}_0xf6185f=_0xf6185f||0x1;if(0x1>_0xf6185f)return _0x2d30db;if(_0x245b94['smartCheckout']){if(_0x453c('0x4')===typeof window['_QuatroDigital_DropDown']['getOrderForm'][_0x453c('0x41')][_0x373af8[0x1]])return _0x240e4e(_0x453c('0x129')+_0x373af8[0x1]+']'),_0x2d30db;window[_0x453c('0x5a')][_0x453c('0x27')][_0x453c('0x41')][_0x373af8[0x1]][_0x453c('0x42')]=_0xf6185f;window[_0x453c('0x5a')][_0x453c('0x27')]['items'][_0x373af8[0x1]]['index']=_0x373af8[0x1];_0x197b6b['updateItems']([window[_0x453c('0x5a')][_0x453c('0x27')][_0x453c('0x41')][_0x373af8[0x1]]],[_0x453c('0x41'),_0x453c('0x39'),'shippingData'])[_0x453c('0x1c')](function(_0x5172fb){window[_0x453c('0x5a')][_0x453c('0x27')]=_0x5172fb;_0x37ff6a(!0x0);})[_0x453c('0x1e')](function(_0x4b4cef){_0x240e4e([_0x453c('0x12a'),_0x4b4cef]);_0x37ff6a();});}else _0x240e4e(_0x453c('0x12b'));};_0x3c325d[_0x453c('0x121')]=function(_0x48573b,_0x10a652){function _0x573cd1(_0x18f23c){_0x18f23c='boolean'!==typeof _0x18f23c?!0x1:_0x18f23c;'undefined'!==typeof window[_0x453c('0xf1')]&&'function'===typeof window[_0x453c('0xf1')][_0x453c('0xf2')]&&window[_0x453c('0xf1')][_0x453c('0xf2')][_0x453c('0x28')](this);_0x453c('0x12')===typeof adminCart&&adminCart();_0x55dad1['fn'][_0x453c('0x25')](!0x0,void 0x0,_0x18f23c);_0x453c('0x12')===typeof _0x10a652&&_0x10a652(_0x43128f);}var _0x43128f=!0x1,_0x399fba=_0x55dad1(_0x48573b)[_0x453c('0x34')](_0x453c('0x114'));if(_0x245b94[_0x453c('0x59')]){if(_0x453c('0x4')===typeof window[_0x453c('0x5a')][_0x453c('0x27')][_0x453c('0x41')][_0x399fba])return _0x240e4e(_0x453c('0x129')+_0x399fba+']'),_0x43128f;window[_0x453c('0x5a')][_0x453c('0x27')]['items'][_0x399fba][_0x453c('0x12c')]=_0x399fba;_0x197b6b[_0x453c('0x12d')]([window['_QuatroDigital_DropDown'][_0x453c('0x27')][_0x453c('0x41')][_0x399fba]],[_0x453c('0x41'),'totalizers','shippingData'])['done'](function(_0x2f35f0){_0x43128f=!0x0;window[_0x453c('0x5a')][_0x453c('0x27')]=_0x2f35f0;_0x5ce4e0(_0x2f35f0);_0x573cd1(!0x0);})[_0x453c('0x1e')](function(_0x3e85fe){_0x240e4e([_0x453c('0x12e'),_0x3e85fe]);_0x573cd1();});}else alert('Atenção,\x20este\x20método\x20esta\x20descontinuado.');};_0x3c325d[_0x453c('0xd0')]=function(_0x30a349,_0x3860c6,_0x5a100f,_0x1c244b){_0x1c244b=_0x1c244b||_0x55dad1(_0x453c('0x12f'));_0x30a349=_0x30a349||'+';_0x3860c6=_0x3860c6||0.9*_0x1c244b['height']();_0x1c244b['stop'](!0x0,!0x0)[_0x453c('0x130')]({'scrollTop':isNaN(_0x5a100f)?_0x30a349+'='+_0x3860c6+'px':_0x5a100f});};_0x245b94[_0x453c('0x131')]||(_0x3c325d[_0x453c('0x8f')](),_0x55dad1['fn'][_0x453c('0x25')](!0x0));_0x55dad1(window)['on'](_0x453c('0x132'),function(){try{window[_0x453c('0x5a')][_0x453c('0x27')]=void 0x0,_0x3c325d[_0x453c('0x8f')]();}catch(_0x3b663c){_0x240e4e(_0x453c('0x133')+_0x3b663c[_0x453c('0x22')],_0x453c('0x134'));}});'function'===typeof _0x245b94[_0x453c('0x43')]?_0x245b94['callback'][_0x453c('0x28')](this):_0x240e4e(_0x453c('0xaa'));};_0x55dad1['fn']['QD_dropDownCart']=function(_0x1719f3){var _0x44a1c3=_0x55dad1(this);_0x44a1c3['fn']=new _0x55dad1[(_0x453c('0xb5'))](this,_0x1719f3);return _0x44a1c3;};}catch(_0x27750e){_0x453c('0x4')!==typeof console&&'function'===typeof console[_0x453c('0x13')]&&console[_0x453c('0x13')]('Oooops!\x20',_0x27750e);}}(this));(function(_0x23b4ca){try{var _0x532d7c=jQuery;window[_0x453c('0xf1')]=window[_0x453c('0xf1')]||{};window['_QuatroDigital_AmountProduct'][_0x453c('0x41')]={};window[_0x453c('0xf1')]['allowRecalculate']=!0x1;window[_0x453c('0xf1')][_0x453c('0x135')]=!0x1;window[_0x453c('0xf1')][_0x453c('0x136')]=!0x1;var _0x1eb1a1=function(){if(window[_0x453c('0xf1')]['allowRecalculate']){var _0x555e44=!0x1;var _0x23b4ca={};window['_QuatroDigital_AmountProduct'][_0x453c('0x41')]={};for(_0x5587c4 in window['_QuatroDigital_DropDown'][_0x453c('0x27')]['items'])if(_0x453c('0x2a')===typeof window[_0x453c('0x5a')][_0x453c('0x27')][_0x453c('0x41')][_0x5587c4]){var _0x5f259f=window['_QuatroDigital_DropDown']['getOrderForm'][_0x453c('0x41')][_0x5587c4];_0x453c('0x4')!==typeof _0x5f259f['productId']&&null!==_0x5f259f['productId']&&''!==_0x5f259f['productId']&&(window[_0x453c('0xf1')]['items']['prod_'+_0x5f259f[_0x453c('0x137')]]=window['_QuatroDigital_AmountProduct'][_0x453c('0x41')]['prod_'+_0x5f259f['productId']]||{},window[_0x453c('0xf1')]['items'][_0x453c('0x138')+_0x5f259f[_0x453c('0x137')]]['prodId']=_0x5f259f['productId'],_0x23b4ca[_0x453c('0x138')+_0x5f259f[_0x453c('0x137')]]||(window['_QuatroDigital_AmountProduct'][_0x453c('0x41')][_0x453c('0x138')+_0x5f259f[_0x453c('0x137')]][_0x453c('0x3f')]=0x0),window[_0x453c('0xf1')][_0x453c('0x41')][_0x453c('0x138')+_0x5f259f[_0x453c('0x137')]][_0x453c('0x3f')]+=_0x5f259f[_0x453c('0x42')],_0x555e44=!0x0,_0x23b4ca['prod_'+_0x5f259f[_0x453c('0x137')]]=!0x0);}var _0x5587c4=_0x555e44;}else _0x5587c4=void 0x0;window[_0x453c('0xf1')][_0x453c('0x139')]&&(_0x532d7c(_0x453c('0x13a'))[_0x453c('0x123')](),_0x532d7c('.qd-bap-item-added')['removeClass']('qd-bap-item-added'));for(var _0x53acfc in window[_0x453c('0xf1')][_0x453c('0x41')]){_0x5f259f=window[_0x453c('0xf1')]['items'][_0x53acfc];if(_0x453c('0x2a')!==typeof _0x5f259f)return;_0x23b4ca=_0x532d7c(_0x453c('0x13b')+_0x5f259f['prodId']+']')['getParent']('li');if(window[_0x453c('0xf1')]['allowRecalculate']||!_0x23b4ca[_0x453c('0x52')](_0x453c('0x13a'))[_0x453c('0x9')])_0x555e44=_0x532d7c('<span\x20class=\x22qd-bap-wrapper\x22\x20title=\x22Itens\x20no\x20carrinho\x20para\x20este\x20produto.\x22><span\x20class=\x22qd-bap-wrapper2\x22><span\x20class=\x22qd-bap-qtt\x22></span></span></span>'),_0x555e44[_0x453c('0x52')](_0x453c('0x13c'))[_0x453c('0x50')](_0x5f259f[_0x453c('0x3f')]),_0x5f259f=_0x23b4ca[_0x453c('0x52')](_0x453c('0x13d')),_0x5f259f['length']?_0x5f259f[_0x453c('0xad')](_0x555e44)[_0x453c('0x49')](_0x453c('0x13e')):_0x23b4ca['prepend'](_0x555e44);}_0x5587c4&&(window[_0x453c('0xf1')][_0x453c('0x139')]=!0x1);};window[_0x453c('0xf1')]['exec']=function(){window[_0x453c('0xf1')][_0x453c('0x139')]=!0x0;_0x1eb1a1[_0x453c('0x28')](this);};_0x532d7c(document)[_0x453c('0xb3')](function(){_0x1eb1a1[_0x453c('0x28')](this);});}catch(_0x4bcbbc){_0x453c('0x4')!==typeof console&&_0x453c('0x12')===typeof console[_0x453c('0x13')]&&console[_0x453c('0x13')]('Oooops!\x20',_0x4bcbbc);}}(this));(function(){try{var _0x154b02=jQuery,_0x1176d5,_0x54e919={'selector':_0x453c('0x13f'),'dropDown':{},'buyButton':{}};_0x154b02['QD_smartCart']=function(_0x34132c){var _0x4d5c65={};_0x1176d5=_0x154b02[_0x453c('0x15')](!0x0,{},_0x54e919,_0x34132c);_0x34132c=_0x154b02(_0x1176d5['selector'])[_0x453c('0xb5')](_0x1176d5[_0x453c('0x140')]);_0x4d5c65[_0x453c('0x91')]='undefined'!==typeof _0x1176d5['dropDown'][_0x453c('0x131')]&&!0x1===_0x1176d5[_0x453c('0x140')][_0x453c('0x131')]?_0x154b02(_0x1176d5[_0x453c('0x85')])[_0x453c('0xab')](_0x34132c['fn'],_0x1176d5[_0x453c('0x91')]):_0x154b02(_0x1176d5[_0x453c('0x85')])[_0x453c('0xab')](_0x1176d5['buyButton']);_0x4d5c65[_0x453c('0x140')]=_0x34132c;return _0x4d5c65;};_0x154b02['fn'][_0x453c('0x141')]=function(){_0x453c('0x2a')===typeof console&&_0x453c('0x12')===typeof console[_0x453c('0x2d')]&&console[_0x453c('0x2d')]('O\x20Smart\x20Cart\x20não\x20é\x20mais\x20iniciado\x20desta\x20forma.\x20A\x20versão\x20que\x20você\x20esta\x20executando\x20tem\x20licença\x20restrita\x20e\x20todos\x20os\x20direitos\x20reservados\x20à\x20Quatro\x20Digital.');};_0x154b02['smartCart']=_0x154b02['fn'][_0x453c('0x141')];}catch(_0x4808b2){_0x453c('0x4')!==typeof console&&_0x453c('0x12')===typeof console[_0x453c('0x13')]&&console[_0x453c('0x13')](_0x453c('0x68'),_0x4808b2);}}());