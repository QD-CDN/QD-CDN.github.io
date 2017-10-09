/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});
Array.prototype.indexOf||(Array.prototype.indexOf=function(d,e){var a;if(null==this)throw new TypeError('"this" is null or not defined');var c=Object(this),b=c.length>>>0;if(0===b)return-1;a=+e||0;Infinity===Math.abs(a)&&(a=0);if(a>=b)return-1;for(a=Math.max(0<=a?a:b-Math.abs(a),0);a<b;){if(a in c&&c[a]===d)return a;a++}return-1});

try {
	var Common = {
		run: function() {},
		init: function() {
			Common.vtexBindQuickViewDestroy();
			Common.bannersCount();
			Common.amazingMenu();
			Common.clickActiveMiniCartMobile();
			Common.modalCallChange();
			Common.floatBarMiniCart();
			Common.setScrollToggle();
			Common.btnSearchOpen();
			Common.hideFreeOldValue();
			Common.saveAmountFix();
		},
		ajaxStop: function() {
			Common.saveAmountFix();
		},
		windowOnload: function() {
			Common.facebookLikebox();	
		},
		vtexBindQuickViewDestroy: function() {
			window.bindQuickView = function() {};
		},
		saveAmountFix: function() {
			console.log('teste')
			$('.shelf-qd-v1-highlight-discount-percentage:not(.qd-on)').addClass('qd-on').each(function() {
				var $t = $(this);
				$t.text(($t.text().trim().match(/[0-9]+/) || [""]).pop() + '%');
			});
		},
		hideFreeOldValue: function() {
			(function(){
				var orig,t=this;
				orig=window.FireSkuSelectionChanged||function(){};
				window.FireSkuSelectionChanged=function(a,b){
					orig.call(this,a,b);
					$('#sku-selector-container span.value').each(function(){
						$t = $(this);
						if(parseFloat((($t.text().match(/(\d+\,\d+)/) || ['1','1'])[1]).replace(',', '.')) == 0)
							return $t.closest('.regularPrice').addClass('hide');
						$t.closest('.regularPrice').removeClass('hide');
				    });
				};
			})();
		},
		btnSearchOpen: function() {
			$('.header-qd-v2-searchbar-btn').click(function() {
				$('.header-qd-v2-searchbar').toggleClass('header-qd-v2-searchbar-active');
			});

			$('.header-qd-v3-searchbar-btn').click(function() {
				$('.header-qd-v3-searchbar').toggleClass('header-qd-v3-searchbar-active');
			});
		},
		setScrollToggle: function() {
			if($(document.body).is('.vstm') || $(document.body).is('.pinkgym')) {
				$("body").attr("data-qd-scroll-limit", 120);
				return;
			}
			$("body").attr("data-qd-scroll-limit", 200);
		},
		bannersCount: function() {
			$(".box-banner").parent().each(function() {
				var $t = $(this);
				$t.addClass("qdBannerCount-" + $t.find(".box-banner").length);
			});
		},
		floatBarMiniCart: function() {
			var miniCart = $(".show-minicart-on-hover");
			$(".floating-qd-v1-content .header-qd-v1-cart").mouseenter(function() {
				miniCart.not(this).mouseover();
			});
		},
		amazingMenu: function() {
			$(".header-qd-v1-main-amazing-menu, .header-qd-v2-main-amazing-menu, .header-qd-v4-main-amazing-menu, .header-qd-v3-main-amazing-menu").QD_amazingMenu();

			// Amazing Menu Responsivo
			$(".header-qd-v1-amazing-menu-toggle").click(function(){
				$("body").toggleClass('qd-am-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-am-on');
			});

			$('.header-qd-v4-main-amazing-menu-mobile').QD_amazingMenu();
			$('.header-qd-v2-main-amazing-menu-mobile').QD_amazingMenu();

			$('.header-qd-v2-main-amazing-menu-mobile > ul > li.qd-am-has-ul > a, .header-qd-v2-main-amazing-menu-mobile > ul > li.qd-am-has-ul > p, .header-qd-v1-main-amazing-menu-mobile > ul > li.qd-am-has-ul > a, .header-qd-v1-main-amazing-menu-mobile > ul > li.qd-am-has-ul > p').click(function(evt){
				evt.preventDefault();

				var $t = $(this);
				$t.toggleClass('qd-on');
				$t.next('ul').slideToggle();
			});
		},
		facebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/vestem" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/vestem"><a href="https://www.facebook.com/vestem">Vestem</a></blockquote></div></div>');
		},
		clickActiveMiniCartMobile: function(){
			if ($(window).width() <= 767) {
				$(".cart-click-active-mobile, .floating-qd-v1-content .header-qd-v1-cart a").click(function(evt) {
					evt.preventDefault();
					$(".v2-vtexsc-cart").toggleClass('cart-show');
				});
			};
		},
		formCadastreMask: function() {
			var form = $(".modal form.form-first-step");

			if (!form.length || typeof $.fn.mask !== "function")
				return;

			form.find('[name=cnpj]').mask('00.000.000/0000-00');
			form.find('[name=cpf]').mask('000.000.000-00');
			form.find('[name=tel_comercial]').mask('(00) 0000-00009');
			form.find('[name=tel_celular]').mask('(00) 0000-00009');
			form.find('[name=cep]').mask('00000-000');
			form.find('[name=insc_estadual]').mask('###.###.###.###.###');
		},
		checkEmailExist: function(email){
			window.QD_checkEmailExist_request = window.QD_checkEmailExist_request || $.ajax({
				url: "http://vestem.sslblindado.com/vtex-user-sign-up/consult.php",
				dataType: "json",
				data: {
					e: "CL",
					q: "email=" + email
				},
				success: function(data) {
					if(data.out.length)
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
				url: "http://vestem.sslblindado.com/vtex-user-sign-up/consult.php",
				dataType: "json",
				data: {
					e: "CL",
					q: "corporateDocument=" +  cnpj.replace(/[^0-9]/ig, "")
				},
				success: function(data) {
					if(data.out.length)
						alert("Este CNPJ já existe em nosso cadastro. Para maiores informações por favor entre em contato com o Atendimento ao Cliente.");
				},
				complete: function(){
					window.QD_checkCnpjExist_request = undefined;
				}
			});

			return window.QD_checkCnpjExist_request;
		},
		modalCallChange: function() {
		    $(".call-page-register").click(function(evt) {
		        evt.preventDefault();

		        $("body").addClass("form-register-open");

		        $(".modal-base .modal-body, .modal-base .modal-footer").empty();
		        $(".modal-base .modal-header .close").siblings().empty();

		        $(".first-step").each(function() {
		            $(".modal-base .modal-body").html(this.innerHTML);
		        });

		        $(".modal-base .modal-header").html($(".first-step-content .text-header").addClass("header-first-step"));
		        $(".modal-base").removeClass("third-step").removeClass("second-step").addClass("pop-ups-identification first-step").modal({
		            backdrop: 'static',
		            keyboard: false
		        });

		        Common.formCadastreMask();

		        var $form = $(".form-first-step");
		        var loading = $('<div class="qdLoading qd-hide qd-padding-15 bg-warning">Carregando ... <img src="/arquivos/ajax-loader2.gif" /></div>').hide();
		        $form.find(".btn-continue").after(loading);

		        var cnpj = $form.find("[name='cnpj']");
		        cnpj.keyup(function(e) {
		            if ((cnpj.val() || "").length > 17)
		                Common.checkCnpjExist(cnpj.val() || "");
		        });

		        var email = $form.find("[name='e-mail']");
		        email.focusout(function(e) {
		            if ((email.val() || "").length > 0)
		                Common.checkEmailExist(email.val() || "");
		        });

		        // Preenchendo o endereço a partir do CEP
		        var cepInputs = $form.find("input[name=rua], input[name=numero], input[name=complemento], input[name=bairro], input[name=cidade], input[name=estado], input[name=pais]").attr("disabled", "disabled");
		        var cep = $form.find("input[name=cep]");
		        cep.keyup(function(e) {
		            if ((cep.val() || "").length < 9)
		                return;

		            $form.find(".btn-continue").slideUp();
		            loading.slideDown();

		            $.ajax({
		                url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
		                dataType: "json",
		                success: function(data) {
		                    $form.find("input[name=rua]").val(data.street || "");
		                    $form.find("input[name=bairro]").val(data.neighborhood || "");
		                    $form.find("input[name=cidade]").val(data.city || "");
		                    $form.find("input[name=estado]").val(data.state || "");
		                    $form.find("input[name=pais]").val(data.country || "");
		                },
		                complete: function() {
		                    cepInputs.removeAttr('disabled');
		                    $form.find(".btn-continue").slideDown();
		                    loading.slideUp();
		                }
		            });
		        });

		        $(".btn-continue").click(function() {
		            if (typeof $.fn.validate !== "function")
		                return;

		            $form.validate({
		                submitHandler: function(form) {
		                    var $form = $(form);

		                    if (!$form.valid())
		                        return;

		                    $form.find(".btn-continue").slideUp();
		                    loading.slideDown();
		                    var inputs = $form.find("input");

		                    Common.checkEmailExist(inputs.filter("[name='e-mail']").val() || "").always(function() {
		                        loading.slideUp();
		                    }).done(function(data) {
		                        if (data.out.length)
		                            return;

		                        loading.slideDown();
		                        Common.checkCnpjExist(inputs.filter("[name='cnpj']").val() || "").always(function() {
		                            loading.slideUp();
		                        }).done(function() {
		                            if (data.out.length)
		                                return;

		                            loading.slideDown();

		                            var stateRegistration = (inputs.filter("[name='insc_estadual']").val() || "Isento").trim();
		                            stateRegistration = stateRegistration.length ? stateRegistration : "Isento";
		                            stateRegistration = stateRegistration.replace(/i.+ento/g, "Isento");

		                            var mobileNumber = (inputs.filter("[name='tel_celular']").val() || "").replace(/[^0-9]/ig, "").trim();
		                            mobileNumber = mobileNumber.length ? "+55" + mobileNumber : "";

		                            $.ajax({
		                                url: "http://vestem.sslblindado.com/vtex-user-sign-up/insert.php",
		                                type: "POST",
		                                dataType: "json",
		                                // contentType: "application/json",
		                                data: {
		                                    e: "CL",
		                                    data: JSON.stringify({
		                                        corporateName: inputs.filter("[name='razao_social']").val() || "",
		                                        tradeName: inputs.filter("[name='nome_fantasia']").val() || "",
		                                        corporateDocument: (inputs.filter("[name='cnpj']").val() || "").replace(/[^0-9]/ig, ""),
		                                        "document": (inputs.filter("[name='cpf']").val() || "").replace(/[^0-9]/ig, ""),
		                                        documentType: "cpf",
		                                        stateRegistration: stateRegistration,
		                                        firstName: inputs.filter("[name='nome']").val() || "",
		                                        lastName: inputs.filter("[name='sobrenome']").val() || "",
		                                        email: inputs.filter("[name='e-mail']").val() || "",
		                                        homePhone: "+55" + (inputs.filter("[name='tel_comercial']").val() || "").replace(/[^0-9]/ig, ""),
		                                        phone: mobileNumber,
		                                        isCorporate: true,
		                                        isNewsletterOptIn: false,
		                                        localeDefault: "pt-BR",
		                                        site: inputs.filter("[name='site']").val() || "",
		                                        facebook: inputs.filter("[name='facebook']").val() || "",
		                                        instagram: inputs.filter("[name='instagram']").val() || "",
		                                        workingBrands: inputs.filter("[name='marcas_que_trabalham']").val() || "",
		                                        interestBrands: inputs.filter("[name='marcas_de_interesse*']").val() || "",
		                                    })
		                                },
		                                success: function(data) {
		                                    $.ajax({
		                                        url: "http://vestem.sslblindado.com/vtex-user-sign-up/insert.php",
		                                        type: "POST",
		                                        dataType: "json",
		                                        // contentType: "application/json",
		                                        data: {
		                                            e: "AD",
		                                            data: JSON.stringify({
		                                                addressName: "Principal",
		                                                // userId:			(data.response.DocumentId || ""),
		                                                userId: (data.response.Id || "").replace(/^[a-z]{2}\-/i, ""),
		                                                street: inputs.filter("[name='rua']").val() || "",
		                                                number: inputs.filter("[name='numero']").val() || "",
		                                                complement: inputs.filter("[name='complemento']").val() || "",
		                                                neighborhood: inputs.filter("[name='bairro']").val() || "",
		                                                city: inputs.filter("[name='cidade']").val() || "",
		                                                state: inputs.filter("[name='estado']").val() || "",
		                                                postalCode: inputs.filter("[name='cep']").val() || "",
		                                                country: inputs.filter("[name='pais']").val() || "",
		                                                addressType: "residential",
		                                                receiverName: inputs.filter("[name='nome']").val() || "",
		                                                geoCoordinate: []
		                                            })
		                                        },
		                                        success: function() {
		                                            $(".modal-base .modal-body, .modal-base .modal-footer").empty();
		                                            $(".modal-base .modal-header .close").siblings().empty();

		                                            $(".second-step").each(function() {
		                                                $(".modal-base .modal-body").html(this.innerHTML);
		                                            });

		                                            $(".modal-base").removeClass("first-step").removeClass("third-step").addClass("second-step").modal({
		                                                backdrop: 'static',
		                                                keyboard: false
		                                            });
		                                        },
		                                        error: function(data) {
		                                            alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
		                                        },
		                                        complete: function() {
		                                            loading.slideUp(function() {
		                                                $(this).remove();
		                                            });
		                                        }
		                                    });
		                                },
		                                error: function() {
		                                    alert("Não foi possível enviar seu formulário, por favor tente novamente ou entre em contato por telefone.");
		                                    loading.slideUp(function() {
		                                        $(this).remove();
		                                    });
		                                }
		                            });
		                        });
		                    });
		                },
		                errorPlacement: function(error, element) {}
		            });

		            $form.submit();
		        });

		        $(".btn-next-step").click(function() {
		            $(".modal-base .modal-body, .modal-base .modal-footer").empty();
		            $(".modal-base .modal-header .close").siblings().empty();

		            $(".modal.pop-ups-identification").modal('hide');
		            $("body").removeClass("form-register-open");
		        });
		    });
		}
	};

	var Home = {
		init: function() {
			Home.cycle2();
			Home.bannerResponsive();
			Home.mosaicAdjustment(); // Chamar depois do "bannerResponsive"
			Home.organizeSideMenuCollection();
			Home.homeShelfCarousel();
			Home.modalNewsLetter();
			Home.mobileSliderFull();
			Home.homeV2CarouselCategory();
			Home.shelfCarouselV2();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		shelfCarouselV2: function() {
			var wrapper = $('.shelf-qd-v2-carousel');

			// Titulo
			wrapper.find('.prateleira').each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('shelf-qd-v2-carousel-title').insertBefore(wrap);
			});

			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
		},
		homeV2CarouselCategory: function() {
			var wrapper = $('.home-qd-v2-carousel-category');

			wrapper.find('.col-xs-12').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});

			wrapper.prepend('<h2 class="shelf-qd-v2-carousel-title">CONTINUA INDECISA? <span>Vamos facilitar ainda mais para você:</span></h2>');
		},
		cycle2: function() {
			if(typeof $.fn.cycle !== "function")
				return;

			var elem = $(".slider-qd-v1-full-wrapper");
			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<div class='cycle-pager-item'><span class='slider-pager-content'>" + $t.find("img").attr("alt") + "</span></div>");
			});
			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ">.slider-qd-v1-responsive-pager",
				prev: ">.slider-qd-v1-cycle-prev",
				next: ">.slider-qd-v1-cycle-next",
				pauseOnHover: true
			});
		},
		mobileSliderFull: function() {
			if(typeof $.fn.slick !== "function")
				return;

			$('.slider-qd-v3-full').slick({
				fade: true,
				infinite: true,
				arrows: false,
				autoplay: true,
				cssEase: 'linear',
				speed: 500,
				autoplaySpeed: 3000,
			});
		},
		bannerResponsive : function(){
			$(".qd-mosaic-wrapper .box-banner a, .banner-qd-v1-browse-by-brand .box-banner a, .qd-banner-responsive .box-banner a, .banner-qd-v2-full .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr("href", href.replace(/(col-)?(xs|sm|md|lg)-[0-9]{1,2},?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : "col-" + str );
					return "";
				}));

				$t.parent().addClass( cols.length ? cols.join(" ") : "col-xs-12 col-sm-12" );
			});
		},
		mosaicAdjustment: function() {
			mosaicAddRow($(".qd-mosaic-wrapper >div:not(.row)"));

			function mosaicAddRow(wrapper) {
				var firstTop;
				var items = new $;

				if(!wrapper.length)
					return;

				wrapper.each(function(){
					var $t = $(this);
					var offsetTop = $t.offset().top;

					if (!firstTop)
						firstTop = offsetTop;

					if (offsetTop >= firstTop - 10 && offsetTop <= firstTop + 10)
						items = items.add($t);
					else
						return false;
				});

				items.wrapAll('<div class="row"></div>');
				mosaicAddRow($(".qd-mosaic-wrapper > div:not(.row)"));
			}
		},
		organizeSideMenuCollection: function() {
			$(".box-banner +.prateleira, ul[itemscope] +.prateleira").each(function() {
				var $t = $(this);
				var sideElem = $t.prev();

				$t.add(sideElem).wrapAll('<div class="row item-qd-v1-side-summary-collection"></div>');

				sideElem.wrap('<div class="col-xs-12 col-sm-3 col-md-3 html-qd-v1-side-summary-wrapper"></div>');
				$t.wrap('<div class="col-xs-12 col-sm-9 col-md-9 html-qd-v1-side-collection-wrapper"></div>');

				$t.find('li.helperComplement').remove();
				var ul = $t.children("ul");
				var ulFirst = ul.first();
				if(ul.length > 1){
					ul.children().appendTo(ulFirst);
					ul.not(ulFirst).remove();
				}
				ulFirst.owlCarousel({
					items: 3,
					navigation: true,
					pagination: false
				});
			});
		},
		homeShelfCarousel: function() {
			var wrapper = $('.shelf-qd-v1-carousel');

			// Titulo
			wrapper.find('.prateleira').each(function(){
				var wrap = $(this);

				wrap.find("h2").addClass('heading-3').insertBefore(wrap);
			});

			wrapper.find('.prateleira').owlCarousel({
				items: 4,
				navigation: true,
				pagination: false
			});
		},
		modalNewsLetter: function() {
			if ($(window).width() < 768)
				return;

			var modal = $(".qd-v1-modal");
			var html = $('<div class="content-news"> <div class="row"> <div class="col-xs-12"> <form novalidate="1"> <div class="qd_news"> <div class="row form-row"> <input type="text" name="name" class="qd_news_name input-type-text-ghost form-control" /> <input type="text" name="email" class="qd_news_email input-type-text-ghost form-control" /> </div> <div class="row form-row"> <button class="qd_news_button">GERAR CUPOM</button> <a href="/politica-de-privacidade" style="display: none;" class="link-politica-privacidade-modal">Politica de privacidade</a> </div> </div> <span class="content-close"> <i class="btn-close ico-close" data-dismiss="modal"></i> </span> </form> </div> </div> </div>');
			var inputSuccess = $('<div class="row form-row"><input type="text" name="name" class="qd_success input-type-text-ghost form-control" /></div>');

			// Ações
			modal.on("hidden.bs.modal", function(){
				modal.removeClass("qd-v1-newsletter-modal");
				html.trigger("QuatroDigital.cf_close");
			});

			html.QD_cookieFn({
				cookieName: "newsletter",
				close: "",
				expireDays: 7,
				show: function($elem){
					modal.find(".modal-body").empty().append(html);
					modal.addClass("qd-v1-newsletter-modal");
					$(".qd-v1-newsletter-modal .qd_news .qd_news_name").val("utm_source=" + $.cookie("qdUtmSource"));
					modal.modal();

					html.QD_news({
						defaultEmail: "Digite seu e-mail",
						checkNameFieldIsVisible: false,
						successCallback: function () {
							$(".qd-v1-newsletter-modal").addClass("qd-v1-newsletter-modal-finish");
							$(".qd-v1-newsletter-modal-finish .content-close").append('<i class="btn-close-2" data-dismiss="modal"></i>');
							$(".qd-v1-newsletter-modal .qd_news").append(inputSuccess);
							$(".qd-v1-newsletter-modal .qd_success").val("VESTEMPROMO10");
						}
					});

					$(".qd-v1-newsletter-modal .qd_news .qd_news_name").val("utm_source=" + $.cookie("qdUtmSource"));
				},
				hide: function($elem){}
			});
		}
	};

	var Departament = {
		init: function() {
			Home.cycle2();
			Search.shelfLineFix();
			Departament.sidemenuToggle();
			Departament.vstmHome();
			Departament.pinkgymHome();
			Departament.vstmDropdownNav();
			Departament.organizeSideMenuCollection();
			Departament.vstmSetDepartamentSearch();
			Departament.pinkSetDepartamentSearch();

			if ( $(document.body).is('.vstm') || $(document.body).is('.pinkgym') ) {
				Home.bannerResponsive();
				Home.mosaicAdjustment();
			}

			Departament.searchNavigatorV3();
	        Departament.moveQuantityToSidebar();
	        Search.sizeQtdFix();
	        Search.removeEmptyUL();
			// Departament.goUpHighlightedCategory();
			Departament.setCategoryHighlightedTitle();
		},
		ajaxStop: function() {
			Search.shelfLineFix();
		},
		windowOnload: function() {
			Search.shelfLineFix();
			Departament.pinkgymFacebookLikebox();
		},
		applySearchTitle: function(){
	    	var text = $('.resultado-busca-termo .value').first().text().replace(/-/g, " ") || $('.bread-crumb li').last().find('a').text();
	    	var wrapper = $('.search-single-navigator');

	    	var firstItem = wrapper.find('h3').first();
	    	if(firstItem.text() == text)
	    		firstItem.remove();

	    	$('<h3><a></a></h3>')
	    		.find('a')
	    			.attr('href', window.location.href)
	    			.text(text)
	    			.parent()
	    		.addClass("qd-busca-termo")
	    		.prependTo(wrapper);
		},
		searchNavigatorV3: function() {
			var wrapper = $('.search-qd-v3-navigator');
			var filterActive = $('<div class="qd-filter-active"><h3><span class="qd-menu-arrow"></span> FILTROS</h3><ul></ul></div>');
			var wrapperToggle = $('<div class="qd-wrappe-toggle"></div>');
			var singleNavigator = wrapper.find('.search-single-navigator');

			wrapper.find('ul[itemscope="itemscope"] > li > p, h5').prepend('<span class="qd-menu-arrow"></span>');

			singleNavigator.find('ul.roupas').prependTo(singleNavigator);
			singleNavigator.find('h3.roupas').prependTo(singleNavigator);

			singleNavigator.find('h3').each(function() {
				var $t = $(this);

				if ($t.find('+ ul > *').length)
					$t.prepend('<span class="qd-menu-arrow"></span>');
			});

			wrapper.find('.qd-menu-arrow').click(function(evt) {
				$(this).toggleClass('qd-active').parent().find('+ ul').stop(true, true).slideToggle(400);

				if ($(evt.target).parent('h3').length)
					wrapper.find('.qd-wrappe-toggle').stop(true, true).slideToggle(400);
			});

			// Remove Quantitade
			wrapper.find('a').each(function() {
				var $t = $(this);

				$t.text($t.text().replace(/\((([0-9]\w+)?([0-9])?)\)/g, ''));
			});

			// Monta uma div com as ul de h4
			singleNavigator.find('h4').each(function() {
				var $t = $(this);
				var ul = $t.find('+ ul');

				$t.appendTo(wrapperToggle);
				ul.appendTo(wrapperToggle);
			});

			if (wrapper.find('h3 + ul').length)
				wrapper.find('h3 + ul').after(wrapperToggle);
			else
				wrapper.find('h3').after(wrapperToggle);


			// Filtro Ativo
			if (!wrapper.find('.filtro-ativo').length)
				return

			wrapper.find('.filtro-ativo').each(function() {
				var $t = $(this);

				filterActive.find('ul').append('<li><a href="' + $t.find('+ a').attr('href') + '">' + $t.text() + '</a></li>');
			});

			wrapper.prepend(filterActive);

			filterActive.find('.qd-menu-arrow').click(function(evt) {
				$(this).toggleClass('qd-active').parent().find('+ ul').stop(true, true).slideToggle(400);
			});
		},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			$(".search-qd-v1-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		},
		vstmHome: function() {
			if (!$(document.body).is('.vstm'))
				return;

			Home.bannerResponsive();
			Home.cycle2();
			$('.banner-qd-v1-mosaic .img-responsive .box-banner.col-xs-12.col-sm-6:first').before('<div class="clearfix"></div>');
		},
	    moveQuantityToSidebar: function() {
	    	$('.resultado-busca-numero .value').first().insertAfter($('.search-qd-v4-navigator .search-single-navigator h3').first());
	    },
		pinkgymHome: function() {
			if (!$(document.body).is('.pinkgym'))
				return;
			Home.bannerResponsive();
			Home.cycle2();
			$('.banner-qd-v1-mosaic .img-responsive .box-banner.col-xs-12.col-sm-6:first').before('<div class="clearfix"></div>');
		},
		pinkSetDepartamentSearch: function(){
			if (!$(document.body).is('.pinkgym'))
				return;
			$(".header-qd-v1-searchbar select option[value=1000005]").attr('selected', true);
		},
		vstmSetDepartamentSearch: function(){
			if (!$(document.body).is('.vstm'))
				return;
			$(".header-qd-v1-searchbar select option[value=1000013]").attr('selected', true);
		},
		vstmDropdownNav: function() {
			if (!$(document.body).is('.vstm'))
				return;
			var isOpened = false;

			$('.header-qd-v1-user').on('click', function(){
				if(isOpened) {
					$('.header-qd-v1-dropdown-nav').stop().hide();
					isOpened = false;
				} else {
					$('.header-qd-v1-dropdown-nav').stop().show();
					isOpened = true;
				}
			});

		},
		pinkgymFacebookLikebox: function() {
			$(".footer-qd-v1-facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/pinkgymoficial/?fref=ts" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/pinkgymoficial/?fref=ts"><a href="https://www.facebook.com/pinkgymoficial/?fref=ts">Pinkgym</a></blockquote></div></div>');
		},
		organizeSideMenuCollection: function() {
			if ($(document.body).is('.departamento.vstm') || $(document.body).is('.departamento.pinkgym')) {
				$(".banner-qd-v1-grouped-shelves .prateleira").each(function() {
					var $t = $(this);
					var sideElem = $t.prev();

					$t.add(sideElem).wrapAll('<div class="row item-qd-v1-side-summary-collection"></div>');

					sideElem.wrap('<div class="col-xs-12 col-sm-3 col-md-3 html-qd-v1-side-summary-wrapper"></div>');
					$t.wrap('<div class="col-xs-12 col-sm-12 col-md-12 html-qd-v1-side-collection-wrapper"></div>');

					$t.find('li.helperComplement').remove();
					var ul = $t.children("ul");
					var ulFirst = ul.first();
					if(ul.length > 1){
						ul.children().appendTo(ulFirst);
						ul.not(ulFirst).remove();
					}
					ulFirst.owlCarousel({
						items: 4,
						navigation: true,
						pagination: false
					});
				});
			}
		},
		goUpHighlightedCategory: function() {
			var wrapper = $('.search-qd-v4-navigator .search-single-navigator');
			if(wrapper.find('h4').length == 1) {
				wrapper.find('h4 + ul').insertAfter(wrapper.find('span.value'));
				wrapper.find('h4').insertAfter(wrapper.find('span.value'));
			}
		},
		setCategoryHighlightedTitle: function() {
			var wrapper = $('.search-qd-v4-navigator .search-single-navigator'),
				h4 = wrapper.find('h4');
			if(h4.length == 1) {
				var link = wrapper.find('h3 a');
				link.attr('href', h4.find('a').attr('href'));
				link.text(h4.find('a').text());
			}
		}
	};

	var Search = {
	    init: function() {
	    	Home.cycle2();
	        Search.shelfLineFix();
	        Search.moveQuantityToSidebar();
	        Departament.sidemenuToggle();
	        Departament.searchNavigatorV3();
	        Search.sizeQtdFix();
	        Search.removeEmptyUL();
			Departament.applySearchTitle();
			Home.homeV2CarouselCategory();
			
			if ($(document.body).is('.vstm'))
				Home.bannerResponsive();
				Home.mosaicAdjustment();
	    },
	    ajaxStop: function() {
	        Search.shelfLineFix();
	    },
	    windowOnload: function() {
	        Search.shelfLineFix();
	    },
	    moveQuantityToSidebar: function() {
	    	$('.resultado-busca-numero .value').first().prependTo($('.search-single-navigator'));
	    },
	    shelfLineFix: function() {
	        try {
	            var exec = function() {
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
	            };
	            exec();

	            // Olhando para o Smart Research
	            if (!window.qd_shelf_line_fix_) {
	                $(window).on("QuatroDigital.sr_shelfCallback", exec);
	                window.qd_shelf_line_fix_ = true;
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
	                $(window).on("resize.qd", function() {
	                    clearTimeout(timeOut);
	                    timeOut = setTimeout(function() {
	                        $(".qd-first-line").removeClass(".qd-first-line");
	                        exec();
	                    }, 20);
	                });
	            }
	        } catch (e) {
	            (typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :( . Detalhes: " + e.message));
	        }
	    },
	    sizeQtdFix: function() {
	        $('.search-qd-v4-navigator a').each(function() {
	        	var $t = $(this);
	        	$t.text($t.text().replace(/\(([^)]+)\)/g, ""));
	        });
	    },
	    removeEmptyUL: function() {
	    	$('.search-single-navigator ul').each(function() {
	    		var el = $(this);
	    		if(el.html() == '' || el.html() == '\n') {
	    			el.detach();
	    		}
	    	});
	    }
	};

	var Product = {
		run: function() {},
		init: function() {
			Product.seeDescription();
			Product.openShipping();
			Product.checkBuyTogether();
			Product.checkSpecification();
			Product.currentColorThumb();
			Product.qdProductCollectionsWrapCarousel(); // Chamar este metodo sempre por último

			if ($(document.body).is('.produto-b2b')){
				Product.skuGridChangeImage();
				Product.setSkuExibition();
				Product.callBuyButton();
			}

			Departament.vstmDropdownNav();
			Product.addLinkMeasurementChart();
			Product.addLinkOpenModalTableSize();
			Product.checkTab();
			Product.uniqueSkuNameFix();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		checkTab: function() {
			var tabLink = $('.product-qd-v2-info-menu');
			var tabContent = $('.product-qd-v2-info-content');

			if (!tabContent.find('.productDescription').text().length) {
				tabLink.find('[aria-controls="product-qd-v2-info-content-description"]').hide();
				tabLink.find('[aria-controls="product-qd-v2-info-content-specification"]').click();
			} else if(!tabContent.find('#caracteristicas').text().length) {
				tabLink.find('[aria-controls="product-qd-v2-info-content-description"]').click();
				tabLink.find('[aria-controls="product-qd-v2-info-content-specification"]').hide();
			}
		},
		addLinkOpenModalTableSize: function() {
			var modal = $(".qd-v1-modal");
			var htmlVestem = $('<div class="row"> <div class="col-xs-12"> <img src="/arquivos/banner-vestem-desktop-size.jpg" class="img-desktop" alt="Tabela de Tamanhos" /> <img src="/arquivos/banner-vestem-mobile-size.jpg" class="img-mobile" alt="Tabela de Tamanhos" /> </div> </div>');
			var htmlPinkgym = $('<div class="row"> <div class="col-xs-12"> <img src="/arquivos/banner-pinkgym-desktop-size.jpg" class="img-desktop" alt="Tabela de Tamanhos" /> <img src="/arquivos/banner-pinkgym-mobile-size.jpg" class="img-mobile" alt="Tabela de Tamanhos" /> </div> </div>');
			var htmlVtm = $('<div class="row"> <div class="col-xs-12"> <img src="/arquivos/banner-vtsm-desktop-size.jpg" class="img-desktop" alt="Tabela de Tamanhos" /> <img src="/arquivos/banner-vtsm-mobile-size.jpg" class="img-mobile" alt="Tabela de Tamanhos" /> </div> </div>');

			$(".product-qd-v1-sku-selection .Tamanho .specification").append('<span class="product-qd-v1-sku-selection-btn-table-size">Tabela de medidas</span>')

			// Ações
			modal.on("hidden.bs.modal", function(){
				modal.removeClass("qd-v1-size-modal");
			});

			$(".product-qd-v1-sku-selection-btn-table-size, .product-qd-v2-sku-selection-btn-table-size").click(function(event) {
				if ($(document.body).is('.pinkgym'))
					modal.find(".modal-body").empty().append(htmlPinkgym);
				else if ($(document.body).is('.vstm'))
					modal.find(".modal-body").empty().append(htmlVtm);
				else
					modal.find(".modal-body").empty().append(htmlVestem);

				modal.addClass("qd-v1-size-modal");

				modal.modal();
			});
		},
		addLinkMeasurementChart: function() {
			if ( !($(document.body).is('.vstm') || $(document.body).is('.pinkgym')) )
				return;

			if ( !$(document.body).is('.produto') )
				return;

			var wrapper = $('.product-qd-v1-sku-selection');
			wrapper.find('.specification').append('<a href="#">Tabela de medidas</a>');

		},
		seeDescription: function() {
			$(".product-qd-v1-link-description").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".product-qd-v1-description").offset().top - 100
				}, 900, 'swing');
			});
		},
		openShipping: function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		currentColorThumb: function() {
			var ul = $(".sku-qd-v1-color-similar .prateleira >ul:first");
			var newUl = ul.clone();

			newUl.find("img").attr("src", skuJson.skus[0].image);
			newUl.find("a").attr("href", "").addClass("qd-sku-selected");
			newUl.insertBefore(ul);

			if ($(document.body).is('.vstm') || $(document.body).is('.pinkgym'))
				$('.sku-qd-v1-color-similar .prateleira h2').attr('data-selected-item' , '( '+$('.productName').text()+' )' );
		},
		qdProductCollectionsWrapCarousel: function() {
			$('.qd-collections-wrap').find('.prateleira').each(function(){
				var $this = $(this);

				$this.find("h2").addClass('heading-3').insertBefore($this);

				$this.owlCarousel({
					items : 4,
					navigation: true,
					pagination: false
				});
			});
		},
		checkBuyTogether: function(){
			if ($(document.body).is('.vstm'))
				return;

			var wrapper = $(".product-qd-v1-area-placeholder-buy-together");

			if (wrapper.find('.buy-together-content > *').length <= 0){
				wrapper.find('> .col-lg-6').removeClass('col-lg-6');
				wrapper.find('> .col-sm-6').removeClass('col-sm-6');
			}
		},
		checkSpecification: function() {
			if ($(document.body).is('.vstm'))
				return;

			if ($(".product-qd-v1-specification #caracteristicas > *").length <= 0)
				$(".product-qd-v1-description").parent().removeClass('col-sm-5').addClass('col-sm-12');
		},
		skuGridChangeImage:function(){
			$(window).on("QuatroDigital.ssg_callback", function(){
				$(".qd-sku-img,.qd-sku-name").click(function(){
					$(this).siblings(".qd-sku-qtt-wrap[id]:first").attr("id");
					try {
						var skuId = $(this).siblings(".qd-sku-qtt-wrap[id]:first").attr("id");

						var selectedSku;
						for (var i = 0; i < skuJson.skus.length; i++) {
							if (skuJson.skus[i].sku == skuId) {
								selectedSku = skuJson.skus[i];
								break;
							}
						}
						if (selectedSku)
							$(document).trigger("skuSelected.vtex", [skuId, selectedSku]);
					} catch (e) {
						if (typeof console !== "undefined" && typeof console.info === "function")
							console.info("Problemas ao selecionar o SKU", e.message);
					};
				});
			});
		},
		setSkuExibition: function() {
			if(skuJson.dimensionsMap.COR && skuJson.dimensionsMap.COR.length == 1){
				$(".qd-smart-sku-grid").QD_smartSkuGrid();
				$("body").addClass("qd-sku-list-layout");
				return;
			}

			$(".qd-smart-sku-grid").QD_smartSkuGrid();
			$("body").addClass("qd-sku-grid-layout");
		},
		callBuyButton: function() {
			$(".qd_cart_auto").QD_buyButton({
				buyButton: ".product-qd-v1-sku-grid-wrapper .buy-button"
			});
		},
		uniqueSkuNameFix:function(){
            var adjustText = function(elem, index){
                try {
                    var jsonSku = window["skuJson" + index];
                    // Adicionando o nome do SKU logo abaixo
                    elem.after('<div class="qd-product-name">' + jsonSku.name + '</div>');
                }
                catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && console.error("Problemas :disappointed: . Detalhes: " + e.message)); }
            };

            // Produto
            $(".product-qd-v2-name .fn.productName").each(function(){
                adjustText($(this), "");
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
			Institutional.sidemenuToggleInstitutional();
			Institutional.sendResellerForm();
			Institutional.closeSuccessModal();
			Institutional.scrollToStoresMobile();
			// Institutional.openResellerTab();
		},
		ajaxStop: function() {},
		windowOnload: function() {},
		sidemenuToggleInstitutional: function() {
			// Amazing Menu Responsivo
			$(".institucional-qd-v1-menu-toggle").click(function(){
				$("body").toggleClass('qd-sn-on');
			});

			$(".qd-am-overlay").click(function(){
				$("body").removeClass('qd-sn-on');
			});
		},
		openResellerTab: function() {
			var link = window.location.href.match(/#\w+/g);
			$('.nav-tabs li a[href*=' + ((link == null)?'#revendedor':link[0]) + ']').click();
		},
		closeSuccessModal: function() {
			$('.qd-am-overlay').click(function(){
				$('.form-qd-v1-confirmation').addClass('hide');
				$(document.body).removeClass('qd-form-sucess');
			});
		},
		scrollToStoresMobile: function() {
			$('.nav-tabs li a').click(function(e) {
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $('.form-wrapper-qd-v1').offset().top - 100
				}, 900, 'swing');
			});
		},
		formCadastreMask: function() {
			var form = $(".form-qd-v1");

			if (!form.length || typeof $.fn.mask !== "function")
				return;

			form.find('[name=qd_form_cpnj]').mask('00.000.000/0000-00');
			form.find('[name=qd_form_cpf]').mask('000.000.000-00');
			form.find('[name=qd_form_businessphone]').mask('(00) 0000-00009');
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
		sendResellerForm: function() {
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
			var cepInputs = $form.find("input[name=qd_form_street], input[name=qd_form_complement], input[name=qd_form_neighboor], input[name=qd_form_city], input[name=qd_form_state], input[name=qd_form_country]").attr("disabled", "disabled");
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
						$form.find("input[name=qd_form_country]").val(data.country || "");
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

					if (!$form.valid())
						return;

					// $form.find(".form-qd-v1-submit").slideUp();
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

							var mobileNumber = (inputs.filter("[name='qd_form_celphone']").val() || "").replace(/[^0-9]/ig, "").trim();
							mobileNumber = mobileNumber.length? "+55" + mobileNumber: "";

							var fileError = function(file) {
								alert('Desculpe, não foi possível enviar seu arquivo em anexo.');
								file.addClass('error');
							}

							$form.find('input[type=file]').removeClass('error');

							var fileFachada = $form.find('#qd_form_file_fachada')[0];
							var fileInterior1 = $form.find('#qd_form_file_interior_1')[0];
							var fileInterior2 = $form.find('#qd_form_file_interior_2')[0];

							var error = new $;
							if(!(fileFachada.files[0])){
								$.merge(error, $(fileFachada));
							}
							if(!(fileInterior1.files[0])){
								$.merge(error, $(fileInterior1));
							}
							if(!(fileInterior2.files[0])){
								$.merge(error, $(fileInterior2));
							}

							if(error.length > 0) {
								alert('Por favor insira todos arquivos em anexo.');
								error.addClass('error');
								return;
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
									documentType:			"cpf",
									"document":				(inputs.filter("[name='qd_form_cpf']").val() || "").replace(/[^0-9]/ig, ""),
									corporateDocument:		(inputs.filter("[name='qd_form_cpnj']").val() || "").replace(/[^0-9]/ig, ""),
									corporateName:			inputs.filter("[name='qd_form_company_name']").val() || "",
									tradeName:				inputs.filter("[name='qd_form_trading_name']").val() || "",
									stateRegistration:		stateRegistration,
									businessPhone:			"+55" + (inputs.filter("[name='qd_form_businessphone']").val() || "").replace(/[^0-9]/ig, ""),
									cellPhone:				mobileNumber,
									site:					inputs.filter("[name='qd_form_site']").val() || "",
									facebook:				inputs.filter("[name='qd_form_facebook']").val() || "",
									instagram:				inputs.filter("[name='qd_form_instagram']").val() || "",
									workingBrands:			inputs.filter("[name='qd_form_brands']").val() || "",
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

											var fileData = new FormData();
											fileData.append(0, (fileFachada.files[0]));												

											$.ajax({
												url: '//api.vtexcrm.com.br/' + jsnomeLoja + '/dataentities/CL/documents/' + data.Id.replace(/.{2}\-/, '') + '/facade/attachments',
												type: 'POST',
												data: fileData,
												processData: false,
												contentType: false,
												enctype: 'multipart/form-data',
												headers: {"Accept": "application/vnd.vtex.ds.v10+json"},
												success: function(){
													fileData = new FormData();
													fileData.append(1, (fileInterior1.files[0]));
													
													$.ajax({
														url: '//api.vtexcrm.com.br/' + jsnomeLoja + '/dataentities/CL/documents/' + data.Id.replace(/.{2}\-/, '') + '/indoorOne/attachments',
														type: 'POST',
														data: fileData,
														processData: false,
														contentType: false,
														enctype: 'multipart/form-data',
														headers: {"Accept": "application/vnd.vtex.ds.v10+json"},
														success: function(){
															fileData = new FormData();
															fileData.append(1, (fileInterior2.files[0]));

															$.ajax({
																url: '//api.vtexcrm.com.br/' + jsnomeLoja + '/dataentities/CL/documents/' + data.Id.replace(/.{2}\-/, '') + '/indoorTwo/attachments',
																type: 'POST',
																data: fileData,
																processData: false,
																contentType: false,
																enctype: 'multipart/form-data',
																headers: {"Accept": "application/vnd.vtex.ds.v10+json"},
																success: function(){
																	$('.form-qd-v1-confirmation').removeClass('hide');
																	$(document.body).addClass('qd-form-sucess');
																	$('.form-qd-v1').find('input, textarea, select').val("");
																},
																error: function(){
																	fileError($(fileInterior2));
																}
															});
														},
														error: function(){
															fileError($(fileInterior1));
														}
													});
												},
												error: function(){
													fileError($(fileFachada));
												}
											});
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
}
catch (e) {(typeof console !== "undefined" && typeof console.error === "function" && $("body").addClass('jsFullLoaded jsFullLoadedError') && console.error("Houve um erro ao iniciar os objetos. Detalhes: " + e.message)); }

/* Quatro Digital Newsletter // 5.0 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
(function(){var f=jQuery;if("function"!==typeof f.fn.QD_news){var t={defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",checkNameFieldIsVisible:!0,emailField:".qd_news_email",btn:".qd_news_button",elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",
timeHideSuccessMsg:3E3,platform:"VTEX",allowSubmit:function(){return!0},successCallback:function(){},submitCallback:function(f,l){}};f.fn.QD_news=function(r){var l=function(a,d){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof a?(a.unshift("[QD News]\n"),g=a):g=["[QD News]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===
d.toLowerCase())try{console.info.apply(console,g)}catch(b){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(f){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(e){console.warn(g.join("\n"))}}},h=f(this);if(!h.length)return h;var a=f.extend({},t,r);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof f.fn.vtexPopUp2)return l("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),
h;var q=function(f){var d,g,b;g=0;d=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){g<a.animateRepeat&&d();g++})})};b=function(){f.fadeTo(a.animateSpeed,.2,function(){f.fadeTo(a.animateSpeed,1,function(){g<a.animateRepeat&&b();g++})})};f.stop(!0,!0);"leftRight"==a.animation?d():"blink"==a.animation&&b()};h.each(function(){var h,d,g,b=f(this),k=b.find(a.nameField),e=b.find(a.emailField),m=b.find(a.btn);"animateField"!=
a.validationMethod&&(d=b.find(a.elementError),g=b.find(a.elementSuccess));1>k.length&&a.checkNameExist&&l("Campo de nome, n\u00e3o encontrado ("+k.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>e.length)return l("Campo de e-mail, n\u00e3o encontrado ("+e.selector+")"),b;if(1>m.length)return l("Bot\u00e3o de envio, n\u00e3o encontrado ("+m.selector+")"),b;if("animateField"!=a.validationMethod&&(1>g.length||1>d.length))return l("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+
g.selector+", "+d.selector+")"),b;a.setDefaultName&&k.is("input[type=text], textarea")&&k.val(a.defaultName);e.val(a.defaultEmail);(function(){if(a.checkNameExist){if(a.checkNameFieldIsVisible){var c=k.filter(":visible");if(!c.length)return}else c=k;var b=c.val();c.is("input:text, textarea")&&c.bind({focus:function(){c.val()!=b||0!==c.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||c.val("")},blur:function(){""===c.val()&&c.val(b)}})}})();(function(){var c;c=e.val();e.bind({focus:function(){e.val()==
c&&0===e.val().search(a.defaultEmail.substr(0,6))&&e.val("")},blur:function(){""===e.val()&&e.val(c)}})})();h=function(){var c,e,h,k;e=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?
c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();h=b.find(a.nameField).is(":visible");h=a.validateName?(1>e.length||0===e.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||h?h:!0):!1;k=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);if(h||k)"animateField"==a.validationMethod?(h&&q(b.find(a.nameField)),k&&q(b.find(a.emailField))):"popup"==a.validationMethod?d.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(d.slideDown().bind("click",function(){f(this).slideUp()}),
setTimeout(function(){d.slideUp()},1800));else if(a.allowSubmit()){m.attr("disabled","disabled");var n={postData:{newsletterClientEmail:c,newsletterClientName:a.defaultName==e?"-":e,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},button:m,wrapper:b};"linx"===a.platform&&(n.postData.nome=n.postData.newsletterClientName,n.postData.email=n.postData.newsletterClientEmail);f.ajax({url:"linx"===a.platform?"/newsletter.aspx":
"/no-cache/Newsletter.aspx",type:"linx"===a.platform?"GET":"POST",data:n.postData,success:function(c){var e,h,d;m.removeAttr("disabled");if("linx"===a.platform&&!(-1<c.indexOf(" com sucesso.")||-1<c.indexOf(" cadastrado.")))return alert(c);"popup"==a.validationMethod?g.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&g.slideDown().bind("click",function(){f(this).slideUp()});d=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&
b.find(a.nameField).val(a.defaultName);e=function(){d.val(a.defaultEmail)};"animateField"==a.validationMethod?(d.val(b.find(a.animateFieldSuccess).val()||"Obrigado!!!"),d.addClass("vtexNewsSuccess"),h=setTimeout(function(){d.removeClass("vtexNewsSuccess");e();d.unbind("focus.vtexNews")},a.timeHideSuccessMsg),d.bind("focus.vtexNews",function(){d.removeClass("vtexNewsSuccess");clearTimeout(h);f(this).val("");f(this).unbind("focus.vtexNews")})):e();a.successCallback(n);f(window).trigger("qdNewsSuccessCallback",
n)}});a.submitCallback(c,e)}else l("Os dados n\u00e3o foram enviados pois o parametro 'allowSubmit' n\u00e3o retornou 'true'","info")};var p=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),h())};k.filter("input:text, textarea").bind("keydown",p);e.bind("keydown",p);p=m.getParent("form");p.length?p.submit(function(a){a.preventDefault();h()}):m.bind("click.qd_news",function(){h()})});return h};f(function(){f(".qd_news_auto").QD_news()})}})();
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
/*! * Javascript Cookie v1.5.1 * https://github.com/js-cookie/js-cookie * * Copyright 2006, 2014 Klaus Hartl * Released under the MIT license */
(function(e){var l;if("function"===typeof define&&define.amd)define(["jquery"],e);else if("object"===typeof exports){try{l=require("jquery")}catch(n){}module.exports=e(l)}else{var m=window.Cookies,h=window.Cookies=e(window.jQuery);h.noConflict=function(){window.Cookies=m;return h}}})(function(e){function l(a){a=c.json?JSON.stringify(a):String(a);return c.raw?a:encodeURIComponent(a)}function n(a,r){var b;if(c.raw)b=a;else a:{var d=a;0===d.indexOf('"')&&(d=d.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g, "\\"));try{d=decodeURIComponent(d.replace(p," "));b=c.json?JSON.parse(d):d;break a}catch(e){}b=void 0}return h(r)?r(b):b}function m(){for(var a,c,b=0,d={};b<arguments.length;b++)for(a in c=arguments[b],c)d[a]=c[a];return d}function h(a){return"[object Function]"===Object.prototype.toString.call(a)}var p=/\+/g,c=function(a,e,b){if(1<arguments.length&&!h(e)){b=m(c.defaults,b);if("number"===typeof b.expires){var d=b.expires,k=b.expires=new Date;k.setMilliseconds(k.getMilliseconds()+864E5*d)}return document.cookie= [c.raw?a:encodeURIComponent(a),"=",l(e),b.expires?"; expires="+b.expires.toUTCString():"",b.path?"; path="+b.path:"",b.domain?"; domain="+b.domain:"",b.secure?"; secure":""].join("")}for(var d=a?void 0:{},k=document.cookie?document.cookie.split("; "):[],q=0,p=k.length;q<p;q++){var f=k[q].split("="),g;g=f.shift();g=c.raw?g:decodeURIComponent(g);f=f.join("=");if(a===g){d=n(f,e);break}a||void 0===(f=n(f))||(d[g]=f)}return d};c.get=c.set=c;c.defaults={};c.remove=function(a,e){c(a,"",m(e,{expires:-1})); return!c(a)};e&&(e.cookie=c,e.removeCookie=c.remove);return c});
var $Cookies = Cookies.noConflict();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital Simple Cart // 4.12 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var b=jQuery;if("function"!==typeof b.fn.simpleCart)try{window.QuatroDigital_simpleCart=window.QuatroDigital_simpleCart||{};window.QuatroDigital_simpleCart.ajaxStopOn=!1;b.fn.simpleCart=function(c,n,h){var d,k,g,f,l,p,q,r,m;k=function(a,b){if("object"===typeof console){var e="object"===typeof a;"undefined"!==typeof b&&"alerta"===b.toLowerCase()?e?console.warn("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Simple Cart]\n"+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?
e?console.info("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Simple Cart]\n"+a):e?console.error("[Simple Cart]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Simple Cart]\n"+a)}};d=b(this);"object"===typeof c?n=c:(c=c||!1,d=d.add(b.fn.simpleCart.elements));if(!d.length)return d;b.fn.simpleCart.elements=b.fn.simpleCart.elements.add(d);h="undefined"===typeof h?!1:h;f=b.extend({},{cartQtt:".qd_cart_qtt",cartTotal:".qd_cart_total",itemsText:".qd_items_text",currencySymbol:"R$ ",
showQuantityByItems:!0,smartCheckout:!0,callback:function(){}},n);g=b("");d.each(function(){var a=b(this);a.data("qd_simpleCartOpts")||a.data("qd_simpleCartOpts",f)});m=function(a){window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};for(var b=0,e=0,c=0;c<a.totalizers.length;c++)"Shipping"==a.totalizers[c].id&&(e+=a.totalizers[c].value),b+=a.totalizers[c].value;window._QuatroDigital_CartData.total=f.currencySymbol+qd_number_format(b/100,2,",",".");window._QuatroDigital_CartData.shipping=
f.currencySymbol+qd_number_format(e/100,2,",",".");window._QuatroDigital_CartData.allTotal=f.currencySymbol+qd_number_format((b+e)/100,2,",",".");window._QuatroDigital_CartData.qtt=0;if(f.showQuantityByItems)for(c=0;c<a.items.length;c++)window._QuatroDigital_CartData.qtt+=a.items[c].quantity;else window._QuatroDigital_CartData.qtt=a.items.length||0;try{window._QuatroDigital_CartData.callback&&window._QuatroDigital_CartData.callback.fire&&window._QuatroDigital_CartData.callback.fire()}catch(d){k("Problemas com o callback do Smart Cart")}r(g)};
l=function(a,b){1===a?b.hide().filter(".singular").show():b.hide().filter(".plural").show()};q=function(a){1>a?d.addClass("qd-emptyCart"):d.removeClass("qd-emptyCart")};p=function(a,b){var c;c=parseInt(window._QuatroDigital_CartData.qtt,10);b.$this.show();isNaN(c)&&(k("O valor obtido para calcular o plural/singular n\u00e3o \u00e9 um n\u00famero! O valor ser\u00e1 definido para 0.","alerta"),c=0);b.cartTotalE.html(window._QuatroDigital_CartData.total);b.cartQttE.html(c);l(c,b.itemsTextE);q(c)};r=
function(a){d.each(function(){var d={},e;e=b(this);c&&e.data("qd_simpleCartOpts")&&b.extend(f,e.data("qd_simpleCartOpts"));d.$this=e;d.cartQttE=e.find(f.cartQtt)||g;d.cartTotalE=e.find(f.cartTotal)||g;d.itemsTextE=e.find(f.itemsText)||g;d.emptyElem=e.find(f.emptyCart)||g;p(a,d);e.addClass("qd-sc-populated")})};(function(){if(f.smartCheckout){window._QuatroDigital_DropDown=window._QuatroDigital_DropDown||{};if("undefined"!==typeof window._QuatroDigital_DropDown.getOrderForm&&(h?h:!c))return m(window._QuatroDigital_DropDown.getOrderForm);
if("object"!==typeof window.vtexjs||"undefined"===typeof window.vtexjs.checkout)if("object"===typeof vtex&&"object"===typeof vtex.checkout&&"undefined"!==typeof vtex.checkout.SDK)new vtex.checkout.SDK;else return k("N\u00e3o foi encontrada a biblioteca VTEX.js");b.QD_checkoutQueue(["items","totalizers","shippingData"],{done:function(a){m(a);window._QuatroDigital_DropDown.getOrderForm=a},fail:function(a){k(["N\u00e3o foi poss\u00edvel obter os dados para o carrinho.",a])}})}else alert("Esta \u00e9 uma fun\u00e7\u00e3o descontinuada =/")})();
f.callback();b(window).trigger("simpleCartCallback.quatro_digital");return d};b.fn.simpleCart.elements=b("");b(function(){var c;"function"===typeof window.ajaxRequestbuyButtonAsynchronous&&(c=window.ajaxRequestbuyButtonAsynchronous,window.ajaxRequestbuyButtonAsynchronous=function(l,h,d,k,g){c.call(this,l,h,d,k,function(){"function"===typeof g&&g();b.fn.simpleCart.elements.each(function(){var c;c=b(this);c.simpleCart(c.data("qd_simpleCartOpts"))})})})});var l=window.ReloadItemsCart||void 0;window.ReloadItemsCart=
function(c){b.fn.simpleCart(!0);"function"===typeof l?l.call(this,c):alert(c)};b(function(){var c=b(".qd_cart_auto");c.length&&c.simpleCart()});b(function(){b(window).bind("productAddedToCart minicartUpdated.vtex",function(){b.fn.simpleCart(!0)})})}catch(t){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",t)}})();
/* $("a").getParent("ul"); // 3 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(a){a.fn.getParent=a.fn.closest})(jQuery);
/* Quatro Digital - Product Thumbs // 1.0 // Carlos Vinicius // Todos os direitos reservados. */
(function(){function b(a){var b=$("ul.thumbs").not(a);a.html(b.html());"function"===typeof clickThumbs&&clickThumbs()}"function"!==typeof $.fn.QD_productThumbs&&($.fn.QD_productThumbs=function(){var a=$(this);return $.extend({},a,new b(a))},$(function(){$(".QD-thumbs").QD_productThumbs()}))})();
/* Automatizador de comments box do Facebook // 1.5 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if(!$("script[src*='connect.facebook.net/pt_BR/sdk.js']").filter("[src*='sdk.js']").length){a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||(b=document.createElement("script"),b.id="facebook-jssdk", b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse()});
/* Quatro Digital - localStorage // 1.1 // Carlos Vinicius // Todos os direitos reservados */
(function(){var e=function(b,c){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var a;"object"===typeof b?(b.unshift("[Quatro Digital - localStorage]\n"),a=b):a=["[Quatro Digital - localStorage]\n"+b];if("undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase())if("undefined"!==typeof c&&"info"===c.toLowerCase())try{console.info.apply(console,a)}catch(d){console.info(a.join("\n"))}else try{console.error.apply(console,
a)}catch(e){console.error(a.join("\n"))}else try{console.warn.apply(console,a)}catch(f){console.warn(a.join("\n"))}}};window.qdLocalStorage=window.qdLocalStorage||{};var f="undefined"!==typeof localStorage&&"undefined"!==typeof localStorage.setItem&&"undefined"!==typeof localStorage.getItem;window.qdLocalStorage.setItem=function(b,c,a){try{if(!f)return!1;var d=new Date;localStorage.setItem(b,c);isNaN(parseInt(a))||(d.setTime(d.getTime()+6E4*a),localStorage.setItem(b+"_expiration",d.getTime()))}catch(g){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar salvar os dados no armazenamento local. Detalhes: ",
g.message],"alerta")}};window.qdLocalStorage.getItem=function(b){try{if(!f)return!1;var c=new Date,a=parseInt(localStorage.getItem(b+"_expiration")||0,10)||0;return c.getTime()>a?(localStorage.removeItem&&(localStorage.removeItem(b),localStorage.removeItem(b+"_expiration")),null):localStorage.getItem(b)}catch(d){e(["Aeeee irm\u00e3o! Algo saiu errado ao tentar obter os dados no armazenamento local. Detalhes: ",d.message],"alerta")}}})();
/* Quatro Digital - Smart SKU Totalizer // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(m){var a=jQuery;if("function"!==typeof a.fn.QD_smartSkuTotalizer){var f=function(a,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var c;"object"===typeof a?(a.unshift("[Quatro Digital - Smart SKU Totalizer]\n"),c=a):c=["[Quatro Digital - Smart SKU Totalizer]\n"+a];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
c)}catch(f){try{console.info(c.join("\n"))}catch(k){}}else try{console.error.apply(console,c)}catch(g){try{console.error(c.join("\n"))}catch(e){}}else try{console.warn.apply(console,c)}catch(n){try{console.warn(c.join("\n"))}catch(p){}}}},l={inputQtt:"input",qttSkus:".qd-selected-qtt-sku",valueSkus:".qd-selected-sku-total"};a.QD_smartSkuTotalizer=function(d,b){if(!d.length)return d;try{var c=a(b.qttSkus),h=a(b.valueSkus),k=a("meta[name='currency']").attr("content")||"R$";if(!c.length&&!h.length)return f("N\u00e3o encontrei os elementos para informar os totais, por isso n\u00e3o irei exibi-los.",
"info");var g=d.find(b.inputQtt).not("disabled").filter("[data-sku-id]");g.on("QuatroDigital.sq_change",function(){try{var b=0,d=0;g.each(function(){var c=a(this),e=parseInt(c.val());0<e&&(d+=e,b+=e*(parseInt(c.attr("data-sku-price"))||0))});c.html(d);h.html(k+" "+qd_number_format(b/100,2,",","."))}catch(e){f(e.message)}})}catch(e){f(e.message)}};a.fn.QD_smartSkuTotalizer=function(d){var b=a(this);if(!b.length)return b;var c=a.extend({},l,d);b.each(function(){a.QD_smartSkuTotalizer(a(this),c)});return b};
a(function(){a(".qd_auto_smart_sku_totalizer").QD_smartSkuTotalizer()})}})(this);
/* Quatro Digital - Smart Buy Button // 1.17 // Carlos Vinicius // Todos os direitos reservados */
(function(v){try{var a=jQuery,d,r=a({}),m=function(a,d){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var b;"object"===typeof a?(a.unshift("[Quatro Digital - Buy Button]\n"),b=a):b=["[Quatro Digital - Buy Button]\n"+a];if("undefined"===typeof d||"alerta"!==d.toLowerCase()&&"aviso"!==d.toLowerCase())if("undefined"!==typeof d&&"info"===d.toLowerCase())try{console.info.apply(console,b)}catch(g){try{console.info(b.join("\n"))}catch(k){}}else try{console.error.apply(console,
b)}catch(n){try{console.error(b.join("\n"))}catch(l){}}else try{console.warn.apply(console,b)}catch(e){try{console.warn(b.join("\n"))}catch(c){}}}},t={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"javascript:",autoWatchBuyButton:!0,buyIfQuantityZeroed:!1,fakeRequest:!1,productPageCallback:function(d,f,b){a("body").is(".productQuickView")&&("success"===f?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=b))},isProductPage:function(){return a("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};a.QD_buyButton=function(h,f){function b(a){d.isSmartCheckout?a.data("qd-bb-click-active")||(a.data("qd-bb-click-active",1),a.on("click.qd_bb_buy_sc",function(a){if(!d.allowBuyClick())return!0;if(!0!==l.clickBuySmartCheckout.call(this))return a.preventDefault(),
!1})):alert("M\u00e9todo descontinuado!")}function g(e){e=e||a(d.buyButton);e.each(function(){var c=a(this);c.is(".qd-sbb-on")||(c.addClass("qd-sbb-on"),c.is(".btn-add-buy-button-asynchronous")&&!c.is(".remove-href")||c.data("qd-bb-active")||(c.data("qd-bb-active",1),c.children(".qd-bb-productAdded").length||c.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>'),c.is(".buy-in-page-button")&&d.isProductPage()&&n.call(c),b(c)))});d.isProductPage()&&
!e.length&&m("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+e.selector+"'.","info")}var k,n,l;k=a(h);l=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||{};l.prodAdd=function(e,c){k.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a("body").addClass("qd-bb-lightBoxBodyProdAdd");var b=a(d.buyButton).filter("[href='"+
(e.attr("href")||"---")+"']").add(e);b.addClass("qd-bb-itemAddBuyButtonWrapper");setTimeout(function(){k.removeClass("qd-bb-itemAddCartWrapper");b.removeClass("qd-bb-itemAddBuyButtonWrapper")},d.timeRemoveNewItemClass);window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof f&&"function"===typeof f.getCartInfoByUrl)return d.isSmartCheckout||(m("fun\u00e7\u00e3o descontinuada"),f.getCartInfoByUrl()),window._QuatroDigital_DropDown.getOrderForm=void 0,f.getCartInfoByUrl(function(c){window._Quatro_Digital_dropDown.getOrderForm=
c;a.fn.simpleCart(!0,void 0,!0)},{lastSku:c});window._Quatro_Digital_dropDown.allowUpdate=!0;a.fn.simpleCart(!0)};(function(){if(d.isSmartCheckout&&d.autoWatchBuyButton){var e=a(".btn-add-buy-button-asynchronous");e.length&&g(e)}})();n=function(){var e=a(this);"undefined"!==typeof e.data("buyButton")?(e.unbind("click"),b(e)):(e.bind("mouseenter.qd_bb_buy_sc",function(c){e.unbind("click");b(e);a(this).unbind(c)}),a(window).load(function(){e.unbind("click");b(e);e.unbind("mouseenter.qd_bb_buy_sc")}))};
l.clickBuySmartCheckout=function(){var e=a(this),c=e.attr("href")||"";if(-1<c.indexOf(d.selectSkuMsg))return!0;c=c.replace(/redirect\=(false|true)/ig,"").replace("?","?redirect=false&").replace(/\&\&/ig,"&");if(d.execDefaultAction(e))return e.attr("href",c.replace("redirect=false","redirect=true")),!0;c=c.replace(/http.?:/i,"");r.queue(function(b){if(!d.buyIfQuantityZeroed&&!/(&|\?)qty\=[1-9][0-9]*/ig.test(c))return b();var f=function(a,b){var f=c.match(/sku\=([0-9]+)/ig),h=[],g;if("object"===typeof f&&
null!==f)for(var k=f.length-1;0<=k;k--)g=parseInt(f[k].replace(/sku\=/ig,"")),isNaN(g)||h.push(g);d.productPageCallback.call(this,a,b,c);l.buyButtonClickCallback.call(this,a,b,c,h);l.prodAdd(e,c.split("ku=").pop().split("&").shift());"function"===typeof d.asyncCallback&&d.asyncCallback.call(this)};d.fakeRequest?(f(null,"success"),b()):a.ajax({url:c,complete:f}).always(function(){b()})})};l.buyButtonClickCallback=function(a,c,b,d){try{"success"===c&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&
window.parent._QuatroDigital_prodBuyCallback(a,c,b,d)}catch(f){m("Problemas ao tentar comunicar a p\u00e1gina que o produto foi aicionado ao carrinho.")}};g();"function"===typeof d.callback?d.callback.call(this):m("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};var p=a.Callbacks();a.fn.QD_buyButton=function(h,f){var b=a(this);"undefined"!==typeof f||"object"!==typeof h||h instanceof a||(f=h,h=void 0);d=a.extend({},t,f);var g;p.add(function(){b.children(".qd-bb-itemAddWrapper").length||b.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');
g=new a.QD_buyButton(b,h)});p.fire();a(window).on("QuatroDigital.qd_bb_prod_add",function(a,b,d){g.prodAdd(b,d)});return a.extend(b,g)};var q=0;a(document).ajaxSend(function(a,d,b){-1<b.url.toLowerCase().indexOf("/checkout/cart/add")&&(q=(b.url.match(/sku\=([0-9]+)/i)||[""]).pop())});a(window).bind("productAddedToCart.qdSbbVtex",function(){a(window).trigger("QuatroDigital.qd_bb_prod_add",[new a,q])});a(document).ajaxStop(function(){p.fire()})}catch(u){"undefined"!==typeof console&&"function"===typeof console.error&&
console.error("Oooops! ",u)}})(this);
/* Quatro Digital Cookie Functions // 1.4 // Carlos Vinicius // Todos os direitos reservados */
(function(){var a,h,g;a=jQuery;g={cookieName:"Nome_Padrao",closeLimit:2,expireDays:365,completeExpireDays:365,path:"/",close:"[class*=close]",show:function(a){a.slideDown()},hide:function(a){a.slideUp()},callback:function(){},exceededLimitCallback:function(){},closeCallback:function(){}};var k=function(a,c){if("object"===typeof console){var e;"object"===typeof a?(a.unshift("[Cookie Functions]\n"),e=a):e=["[Cookie Functions]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?
"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,e):console.error.apply(console,e):console.warn.apply(console,e)}};a.QD_cookieFn=function(f){if("function"!==typeof a.cookie)return k("Aeeeee irm\u00e3\u00e3\u00e3ooooo!\nEsta faltando o plugin $.cookie mew. Chama ele na p\u00e1gina, vlw!");var c=function(d,b){var c=a.cookie("qdCookieFn_"+b.cookieName);if("undefined"!==typeof c&&c>=b.closeLimit||a.cookie("qdCookieFn_"+b.cookieName+"_complete"))return b.exceededLimitCallback();
b.show(d);d.trigger("QuatroDigital.cf_show");a(window).on("qdNewsSuccessCallback",function(a,c){d.trigger("QuatroDigital.qdcf_applyComplete");b.show(d);d.trigger("QuatroDigital.cf_hide")});b.callback();d.trigger("QuatroDigital.cf_callback")},e=function(a,b){a.find(b.close).not(".qd-cookie-on").addClass("qd-cookie-on").bind("click",function(){a.trigger("QuatroDigital.cf_close");a.slideUp(function(){b.closeCallback()})})},g=function(c,b){c.bind("QuatroDigital.cf_close",function(){"undefined"===typeof a.cookie("qdCookieFn_"+
b.cookieName)?a.cookie("qdCookieFn_"+b.cookieName,1,{expires:b.expireDays,path:b.path}):a.cookie("qdCookieFn_"+b.cookieName,(parseInt(a.cookie("qdCookieFn_"+b.cookieName),10)||0)+1,{expires:b.expireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyComplete",function(){a.cookie("qdCookieFn_"+b.cookieName+"_complete",1,{expires:b.completeExpireDays,path:b.path})});c.bind("QuatroDigital.qdcf_applyLimit",function(){a.cookie("qdCookieFn_"+b.cookieName,b.closeLimit,{expires:b.expireDays,path:b.path})})};
f.each(function(){var d=a(this),b;try{if(b=d.attr("data-qd-cookie"))var f=a.parseJSON("{"+b+"}")}catch(l){k(['Aeee irm\u00e3ooo!\nN\u00e3o consegui converter as suas op\u00e7\u00f5es do atributo [data-qd-cookie], verifique se voc\u00ea escreveu no formato esperado que \u00e9 (respeitando-se todas as aspas simples e duplas):\n<div data-qd-cookie=\'"chave":"valor","chave2":"valor2"\' />.',"\n\nDetalhes do erro: "+l.message],"alerta"),f={}}b=a.extend({},h,f);g(d,b);c(d,b);e(d,b)})};a.fn.QD_cookieFn=
function(f){var c=a(this);h=a.extend(!0,{},g,f);c.QD_cookieFn=new a.QD_cookieFn(c);return c};a(function(){a("[data-qd-cookie]").QD_cookieFn()})})();
/* Quatro Digital - jQuery Ajax Queue // 4.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(d){if("function"!==typeof d.qdAjax){var a={};d.qdAjaxQueue=a;150>parseInt((d.fn.jquery.replace(/[^0-9]+/g,"")+"000").slice(0,3),10)&&console&&"function"==typeof console.error&&console.error();d.qdAjax=function(f){try{var b=d.extend({},{url:"",type:"GET",data:"",success:function(){},error:function(){},complete:function(){},clearQueueDelay:5},f),e;e="object"===typeof b.data?JSON.stringify(b.data):b.data.toString();var c=encodeURIComponent(b.url+"|"+b.type+"|"+e);a[c]=a[c]||{};"undefined"==
typeof a[c].jqXHR?a[c].jqXHR=d.ajax(b):(a[c].jqXHR.done(b.success),a[c].jqXHR.fail(b.error),a[c].jqXHR.always(b.complete));a[c].jqXHR.always(function(){isNaN(parseInt(b.clearQueueDelay))||setTimeout(function(){a[c].jqXHR=void 0},b.clearQueueDelay)});return a[c].jqXHR}catch(g){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Problemas no $.qdAjax :( . Detalhes: "+g.message)}};d.qdAjax.version="4.0"}})(jQuery);
/* Quatro Digital Social Photos // 1.5 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(w){var b=jQuery;if("function"!==typeof b.fn.QD_socialPhotos){var q=function(b,k){if("object"===typeof console&&"function"===typeof console.error&&"function"===typeof console.info&&"function"===typeof console.warn){var g;"object"===typeof b?(b.unshift("[Quatro Digital Social Photos]\n"),g=b):g=["[Quatro Digital Social Photos]\n"+b];if("undefined"===typeof k||"alerta"!==k.toLowerCase()&&"aviso"!==k.toLowerCase())if("undefined"!==typeof k&&"info"===k.toLowerCase())try{console.info.apply(console,
g)}catch(e){console.info(g.join("\n"))}else try{console.error.apply(console,g)}catch(e){console.error(g.join("\n"))}else try{console.warn.apply(console,g)}catch(e){console.warn(g.join("\n"))}}};b.fn.QD_socialPhotos=function(u,k){function g(){c.disableReload||setInterval(function(){r()},c.timer)}var e,v,c,r,l,h,p=!0,m=[],n=0,t;e=b(this);if(!e.length)return e;c=b.extend({},{photosQtty:5,tag:null,timer:1E3,disableReload:!0,socialType:"flickr",user:null,filterByTag:!1,ajaxCallback:function(a,d,c){},callback:function(a,
d,c){}},k);720>c.timer&&(c.timer=720);null!=c.tag?h=c.tag:(l=b("#qd-instragram-hash-tag"),l.length&&(h=l[0].innerHTML));"instagram"!==c.socialType||"string"===typeof h&&""!=h||(p=!1);v=function(){e.each(function(){var a=b("<ul class='instagram-tags-container'/>");b(this).empty().append(a);for(var d in m)"function"!==typeof m[d]&&a.append("<li><img src='"+m[d].url+"' title='"+m[d].title+"' /></li>");c.ajaxCallback(n,e,h);b(window).trigger("QuatroDigital.QD_socialPhotos.ajaxCallback",{_length:n,$this:e,
tag:h})});g()};t=function(a){try{if("instagram"===c.socialType){n=a.data.length;for(var d=0;d<c.photosQtty&&d<n;d++)"function"!==typeof a.data[d]&&m.push({url:a.data[d].images.low_resolution.url,title:a.data[d].caption?a.data[d].caption.text:""})}else if("flickr"===c.socialType)for(n=a.photos.total,d=0;d<c.photosQtty&&d<n;d++)"function"!==typeof a.photos.photo[d]&&m.push({url:a.photos.photo[d].url_m,title:a.photos.photo[d].title||""});v()}catch(b){q(["Problemas ao organizar as fotos retornadas da API.",
b.message],"alerta")}};l=function(a){var d={j:"jj%25C2%25A8irfgrz%25C2%25A8pbz",ir:"fgrz%25C2%25A8pbz",irf:"grz%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe",irfg:"rz%25C2%25A8igrkpbzzreprorgn%25C2%25A8pbz%25C2%25A8oe",irfgr:"z%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe",qriryb:"c-irfgrz%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe",qrirybc:"-irfgrz%25C2%25A8igrkpbzzreprorgn%25C2%25A8pbz%25C2%25A8oe","qrirybc-":"irfgrz%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe","jjj%25C2%":"25A8irfgrz%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe",
"jjj%25C2%2":"5A8irfgrz%25C2%25A8igrkpbzzreprorgn%25C2%25A8pbz%25C2%25A8oe","jjj%25C2%25":"A8irfgrz%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe","jjj%25C2%25A":"8o2o%25C2%25A8irfgrz%25C2%25A8pbz","o2o%25C2%25A8":"irfgrz%25C2%25A8pbz","irfgrzo2o%25C2":"%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe","irfgrzo2o%25C2%":"25A8igrkpbzzreprorgn%25C2%25A8pbz%25C2%25A8oe","irfgrzo2o%25C2%2":"5A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe","qrirybc-irfgrzo2o":"%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe",
"qrirybc-irfgrzo2o%":"25C2%25A8igrkpbzzreprorgn%25C2%25A8pbz%25C2%25A8oe","qrirybc-irfgrzo2o%2":"5C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe","jjj%25C2%25A8irfgrzo":"2o%25C2%25A8igrkpbzzrepr%25C2%25A8pbz%25C2%25A8oe","jjj%25C2%25A8irfgrzo2":"o%25C2%25A8igrkpbzzreprorgn%25C2%25A8pbz%25C2%25A8oe","jjj%25C2%25A8irfgrzo2o":"%25C2%25A8igrkpbzzreprfgnoyr%25C2%25A8pbz%25C2%25A8oe"};return function(a){var c,b,f,e;b=function(a){return a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z",
"y","o","u","o"];a=a["d"+f[16]+"c"+f[17]+"m"+b(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"ti"+b("o")+"n"];c=function(a){return escape(encodeURIComponent(a.replace(/\./g,"\u00a8").replace(/[a-zA-Z]/g,function(a){return String.fromCharCode(("Z">=a?90:122)>=(a=a.charCodeAt(0)+13)?a:a-26)})))};for(var g in d){if(c(a[[f[9],b("o"),f[12],f[b(13)]].join("")])===g+d[g]){e="tr"+f[17]+"e";break}e="f"+f[0]+"ls"+b(f[1])+""}b=!1;-1<a[[f[12],"e",f[0],"rc",f[9]].join("")].indexOf("qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82")&&
(b=!0);return[e,b]}(a)}(w);if(!eval(l[0]))return l[1]?q("\u0e17\u00c3\u0472 \u221a\u0391\u2113\u00a1\u2202\u0391\u2202\u0472 \u03a1\u0391\u0ae8\u0391 \u0aef\u0abd\u01ac\u0391 L\u0472J\u0391!"):!1;r=function(){if("instagram"===c.socialType)var a="https://api.instagram.com/v1/tags/"+h+"/media/recent?access_token="+u+"&count="+c.photosQtty;else"flickr"===c.socialType&&(a="https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=3&extras=url_m&api_key="+u+"&user_id="+c.user+"&format=json&per_page="+
c.photosQtty+"&jsoncallback=?",c.filterByTag&&(a=a+"&tags="+c.filterByTag));try{qdLocalStorage.getItem("QD_socialPhotos"+a)&&"object"===typeof JSON?t(JSON.parse(qdLocalStorage.getItem("QD_socialPhotos"+a))):b.ajax({url:a,dataType:"jsonp",cache:!0,success:t}).done(function(b){"object"===typeof JSON&&qdLocalStorage.setItem("QD_socialPhotos"+a,JSON.stringify(b),60)})}catch(d){q(["Aeeee irm\u00e3o! Problemas para obter os dados via API do Flickr :( . Detalhes: ",d.message],"alerta")}};p?r():e.addClass("qd-sit-no-results");
c.callback(p,e,h);b(window).trigger("QuatroDigital.QD_socialPhotos.callback",{allowExec:p,$this:e,tag:h});return e}}})(this);
/* Quatro Digital Amazing Menu // 2.12 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(4(h){i a,m,k,n;a=2i;B("4"!==G a.1a.R){m={T:"/7-1K-V",1g:4(){}};i l=4(a,b){B("1y"===G w&&"X"!==G w.11&&"X"!==G w.14&&"X"!==G w.1k){i d;"1y"===G a?(a.2h("[1m 1o 1p]\\n"),d=a):d=["[1m 1o 1p]\\n"+a];B("X"===G b||"1F"!==b.O()&&"2j"!==b.O())B("X"!==G b&&"14"===b.O())M{w.14.1l(w,d)}Q(p){M{w.14(d.Y("\\n"))}Q(f){}}1z M{w.11.1l(w,d)}Q(p){M{w.11(d.Y("\\n"))}Q(f){}}1z M{w.1k.1l(w,d)}Q(p){M{w.1k(d.Y("\\n"))}Q(f){}}}};a.1a.1f=4(){i e=a(v);e.D(4(b){a(v).r("7-8-F-"+b)});e.1d().r("7-8-1d");e.1D().r("7-8-1D");x e};a.1a.R=4(){};h=4(a){i b={j:"2k%3%1G%3%5",2l:"2g%3%5",2f:"2b%3%P%3%5%3%6",2a:"1q%3%S%3%5%3%6",2c:"z%3%W%3%5%3%6",2d:"c-1c%3%P%3%5%3%6",U:"-1c%3%S%3%5%3%6","U-":"1c%3%W%3%5%3%6","I%3%":"1G%3%P%3%5%3%6","I%3%2":"2e%3%S%3%5%3%6","I%3%25":"2m%3%W%3%5%3%6","I%3%2n":"2w%3%5%3%6","H%2v":"2%5%3%6","H%3":"%P%3%5%3%6","H%3%":"S%3%5%3%6","H%3%2":"29%3%5%3%6","U-H":"%3%P%3%5%3%6","U-H%":"3%S%3%5%3%6","U-H%2":"2y%W%3%5%3%6","I%3%2z":"1q%3%P%3%5%3%6","I%3%2u":"z%3%S%3%5%3%6","I%3%2t":"%3%W%3%5%3%6"};x 4(a){i e,f,c,g;f=4(a){x a};c=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+c[16]+"c"+c[17]+"m"+f(c[1])+"n"+c[13]]["l"+c[18]+"c"+c[0]+"2p"+f("o")+"n"];e=4(a){x 2o(2q(a.10(/\\./g,"\\2r").10(/[a-2s-Z]/g,4(a){x 2A.1S(("Z">=a?1T:1V)>=(a=a.1U(0)+13)?a:a-26)})))};28(i q 23 b){B(e(a[[c[9],f("o"),c[12],c[f(13)]].Y("")])===q+b[q]){g="24"+c[17]+"e";27}g="f"+c[0]+"22"+f(c[1])+""}f=!1;-1<a[[c[12],"e",c[0],"21",c[9]].Y("")].1W("1X%1R%1E%1H%1h%1i%1h%1Y%1Z%20%1x%2x%1x%2O%1h%1i%1R%1E%1H%3l%1i")&&(f=!0);x[g,f]}(a)}(h);B(!3k(h[0]))x h[1]?l("\\39\\3d\\1N \\3g\\K\\3p\\38\\1M\\K\\1M\\1N \\3a\\K\\2B\\K \\3e\\3f\\3h\\K L\\3c\\K!"):!1;n=4(e){i b,d;e=e.C(".3b");b=e.1J(".7-8-1b");d=e.1J(".7-8-1O");B(b.E||d.E)b.15().r("7-8-1b-1n"),d.15().r("7-8-1O-1n"),a.3j({T:k.T,3i:"3o",3q:4(e){i f=a(e);b.D(4(){i c,g;g=a(v);c=f.C("3n[3m=\'"+g.1P("1w-1v-1u")+"\']");c.E&&(c.D(4(){a(v).1t(".36-1b").1B().1A(g)}),g.1s())}).r("7-8-1C-1r");d.D(4(){i c={},g;g=a(v);f.C("2L").D(4(){B(a(v).1I().1e().O()==g.1P("1w-1v-1u").1e().O())x c=a(v),!1});c.E&&(c.D(4(){a(v).1t("[2K*=\'2M\']").1B().1A(g)}),g.1s())}).r("7-8-1C-1r")},11:4(){l("N\\1L 2N 2P\\37 2J 2I 2D 1Q V. A T \'"+k.T+"\' 2C.")},2E:2F})};a.R=4(e){i b=e.C("J[2H]").D(4(){i d,b;d=a(v);B(!d.E)x l(["2G 1Q V n\\1L 2Q",e],"1F");d.C("F >J").15().r("7-8-2R-J");d.C("F").D(4(){i g=a(v),b;b=g.19(":31(J)");b.E&&g.r("7-8-30-"+b.1d().1I().1e().32().10(/\\./g,"").10(/\\s/g,"-").O())});b=d.C(">F").1f();d.r("7-1K-V");b=b.C(">J");b.D(4(){i b=a(v);b.C(">F").1f().r("7-8-33");b.r("7-8-1j-V");b.15().r("7-8-1j")});b.r("7-8-1j");i f=0,c=4(a){f+=1;a=a.19("F").19("*");a.E&&(a.r("7-8-35-"+f),c(a))};c(d);d.34(d.C("J")).D(4(){i b=a(v);b.r("7-8-"+b.19("F").E+"-F")})});n(b);k.1g.2Z(v);a(2Y).2T("2S.8.1g",e)};a.1a.R=4(e){i b=a(v);B(!b.E)x b;k=a.2U({},m,e);b.2V=2X a.R(a(v));x b};a(4(){a(".2W").R()})}})(v);',62,213,'|||25C2|function|25A8pbz|25A8oe|qd|am||||||||||var|||||||||addClass||||this|console|return||||if|find|each|length|li|typeof|qriirfgrz|jjj|ul|u0391||try||toLowerCase|25A8igrkpbzzrepr|catch|QD_amazingMenu|25A8igrkpbzzreprorgn|url|qrirybc|menu|25A8igrkpbzzreprfgnoyr|undefined|join||replace|error|||info|parent||||children|fn|banner|irfgrz|first|trim|qdAmAddNdx|callback|D1|82|dropdown|warn|apply|QD|wrapper|Amazing|Menu|rz|loaded|hide|getParent|value|qdam|data|C2|object|else|insertBefore|clone|content|last|B8|alerta|25A8irfgrz|84|text|filter|amazing|u00e3o|u2202|u0472|collection|attr|do|E0|fromCharCode|90|charCodeAt|122|indexOf|qu|8F|CF|83d|rc|ls|in|tr|||break|for|5A8igrkpbzzreprfgnoyr|irfg|grz|irfgr|qriryb|5A8irfgrz|irf|fgrz|unshift|jQuery|aviso|jj|ir|A8irfgrz|25A|escape|ti|encodeURIComponent|u00a8|zA|25A8qriirfgrz|25A8qriirfgr|25C|8qriirfgrz|A1g|5C2|25A8qriirfg|String|u0ae8|falho|dados|clearQueueDelay|3E3|UL|itemscope|os|obter|class|h2|colunas|foi|A1|poss|encontrada|has|QuatroDigital|trigger|extend|exec|qd_amazing_menu_auto|new|window|call|elem|not|replaceSpecialChars|column|add|level|box|u00edvel|u00a1|u0e17|u03a1|qd_am_code|u0472J|u00c3|u0aef|u0abd|u221a|u01ac|dataType|qdAjax|eval|C5|alt|img|html|u2113|success'.split('|'),0,{}));