/**
* Funções base
*/
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.replaceSpecialChars&&(String.prototype.replaceSpecialChars=function(){var b={"\u00e7":"c","\u00e6":"ae","\u0153":"oe","\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00e0":"a","\u00e8":"e","\u00ec":"i","\u00f2":"o","\u00f9":"u","\u00e4":"a","\u00eb":"e","\u00ef":"i","\u00f6":"o","\u00fc":"u","\u00ff":"y","\u00e2":"a","\u00ea":"e","\u00ee":"i","\u00f4":"o","\u00fb":"u","\u00e5":"a","\u00e3":"a","\u00f8":"o","\u00f5":"o",u:"u","\u00c1":"A","\u00c9":"E", "\u00cd":"I","\u00d3":"O","\u00da":"U","\u00ca":"E","\u00d4":"O","\u00dc":"U","\u00c3":"A","\u00d5":"O","\u00c0":"A","\u00c7":"C"};return this.replace(/[\u00e0-\u00fa]/ig,function(a){return"undefined"!=typeof b[a]?b[a]:a})});

try {
	var Common = {
		init: function () {
			Common.bannerResponsive();
			Common.sidemenuToggle();
			Common.addScrollLimit();
			Common.linkToCartMiniCart();
		},
		ajaxStop: function () {
			Common.linkToCartMiniCart();
		},
		windowOnload: function () {
			Common.facebookLikeBox();
		},
		linkToCartMiniCart: function(){
			$(".v2-vtexsc-cart a.cartCheckout").attr('href', '/checkout/#/cart');
		},
		facebookLikeBox: function() {
			$(".facebook-likebox").html('<div class="fb-page" data-href="https://www.facebook.com/mahoganyoficial" data-small-header="false" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><div class="fb-xfbml-parse-ignore"><blockquote cite="https://www.facebook.com/mahoganyoficial"><a href="https://www.facebook.com/mahoganyoficial">Mahogany Cosméticos</a></blockquote></div></div>');
		},
		bannerResponsive : function(){
			$(".qd-banner-responsive .box-banner a").each(function(){
				var $t = $(this);
				var cols = [];

				var href = $t.attr("href") || "";
				if(!href.length)
					return;

				$t.attr( "href", href.replace(/(col-)?(xs|sm|md|lg)-[0-9]{1,2},?/ig, function(match){
					var str = match.replace(",", "").toLowerCase();
					cols.push( str.substr(0,4) === "col-" ? str : "col-" + str );
					return "";
				}) );

				$t.parent().addClass( cols.length ? cols.join(" ") : "col-xs-12 col-sm-12" );
			});
		},
		sidemenuToggle:function(){
			// Amazing Menu Responsivo
			$(".side-menu-toggle").click(function(){
				$("body").toggleClass('qd-sm-on');
			});
			$(".qd-sm-overlay, .close-btn-sidebar").click(function(){
				$("body").removeClass('qd-sm-on');
			});
		},
		addScrollLimit: function() {
			$("body").attr("data-qd-scroll-limit", 150);
		}
	};

	var Home = {
		init: function () {
			Home.autoCycle();
			Home.cycle2();
			Home.shelfLineFixHome();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		autoCycle: function(){
			$(".box-banner a").each(function(){
				var $t = $(this);
				$t.parent().attr("data-href", $t.attr("href"));
			});

			$(".box-banner[data-href*='#slide']").each(function(){
				var $t = $(this);

				if($t.getParent(".cycle-slideshow").length)
					return;

				var banners = $t.add($t.siblings("[data-href*='#slide']"));
				var cycle = $('<div class="cycle-slideshow clearfix col-sm-8" data-cycle-slides=".box-banner" data-cycle-prev=".cycle-prev" data-cycle-next=".cycle-next" data-cycle-pause-on-hover="true"></div>');
				cycle.append('<span class="cycle-pager cycle-control"></span> <div class="cycle-prev cycle-control"></div> <div class="cycle-next cycle-control"></div>');
				$t.before(cycle);
				banners.prependTo(cycle);
			});
		},
		cycle2: function() {
			if(typeof $.fn.cycle !== "function")
				return;
			var elem = $(".main-slider");

			elem.find(".box-banner").each(function() {
				var $t = $(this);
				$t.attr("data-cycle-pager-template", "<span class='cycle-pager-item'></span>");
			});

			elem.cycle({
				slides: ">.box-banner",
				swipe: "true",
				pager: ".cycle-pager-wrap",
				prev: ".cycle-prev",
				next: ".cycle-next"
			});
		},
		shelfLineFixHome: function() {
			var curTop;
			var wrapper = $(".prateleira:not('.qd-fi-on')").addClass('qd-fi-on');

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
		}
	};

	var Departament = {
		init: function () {
			Departament.showDisclaimerBanners();
			Departament.dropdownmenuToggle();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {},
		showDisclaimerBanners: function () {
			if ($(".disclaimer .box-banner").length)
				$(".disclaimer").show();
		},
		dropdownmenuToggle:function(){
			$(".toggle-dropdown").click(function(){
				$(".menu-dropdown-toggle > .navigation-tabs").slideToggle();
				$(".menu-dropdown-toggle > .navigation").slideToggle();
			});
		}
	};

	var Search = {
		init: function () {
			Departament.showDisclaimerBanners();
			Search.emptySearch();
			Departament.dropdownmenuToggle();
			Search.shelfLineFix();
		},
		ajaxStop: function () {
			Search.shelfLineFix();
		},
		windowOnload: function () {
		},
		emptySearch:function () {
			if ($('.busca-vazio').length>0) {
				$('.no-search-result').show();
				$('.searchTitle').hide();
			};
		},
		shelfLineFix: function() {
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
		}
	};

	var Product = {
		init: function () {
			Product.forceImageZoom();
			Product.goToSizeTable();
			Product.calcFreight();
			Product.addThis();
			Product.showDescription();
			Product.buyButton();
			Product.createTabsProduct();
			Product.accessoriesFix();
		},
		ajaxStop: function () {
			Product.addCloseBtnFreightTable();
		},
		windowOnload: function () {},
		buyButton : function(){
			$(".nav-cart").QD_buyButton( {
				buyButton : ".sku-selection-box .buy-in-page-button",
				execDefaultAction : function($buyButton){ return true; }
			} );
		},
		calcFreight : function() {
			if( typeof window.ShippingValue === "function" )
				window.ShippingValue();
		},
		showDescription : function(){
			$(".about-product-link").click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".product-description").offset().top - 40
				}, 900, 'swing');
			});
		},
		addCloseBtnFreightTable: function() {
			var elem = $(".freight-values");
			if (elem.length > 0 && elem.is(":visible"))
				$("<span class='close'/>").bind("click", function() {
					elem.fadeToggle("fast","linear");
				}).appendTo(elem);
		},
		addThis:function(){
			var html,userId,elem;
			window.addthis_config = window.addthis_config || {};

			// Configurações
			userId="ra-537ca76b7f873600";
			window.addthis_config.data_track_addressbar=false;
			elem=$(".add-this");


			if(!elem.length) return;

			html=$('<div class="addthis_toolbox addthis_default_style addthis_16x16_style">\
				<a class="addthis_button_facebook"></a>\
				<a class="addthis_button_twitter"></a>\
				<a class="addthis_button_pinterest_share"></a>\
				<a class="addthis_button_email"></a>\
				<a class="addthis_button_compact"></a><a class="addthis_counter addthis_bubble_style"></a>\
				</div>');
			elem.append(html);

			var addthis_config = {"data_track_addressbar":true};

			$.getScript("//s7.addthis.com/js/300/addthis_widget.js#pubid="+userId);
		},
		forceImageZoom: function(){
			try{
				var orig = window.ImageControl;

				window.ImageControl = function(par1, par2){
					$("ul.thumbs a").each(function(){
						var $t = $(this);

						if($t.attr("zoom"))
							return;

						$t.attr("zoom", $t.attr("rel").replace(/(ids\/[0-9]+)[0-9-]+/i, "$1-1000-1000"));
					});

					orig.call(this, par1, par2);
				}
			}catch(e){
				if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
					console.info("Ops, algo saiu errado como zoom.");
					console.error(err);
				}
			}
		},
		goToSizeTable:function(){
			$("<a href='#size-table' class='size-table-link'>Tabela de medidas</a>").appendTo(".Tamanho .specification");
		},
		createTabsProduct: function() {
			var wrapper = $('#caracteristicas');
			var tabContent = $('.qd-smartTabs');

			wrapper.find(".name-field").each(function(){
				var $t = $(this);
				var table = $t.next();

				if ($t.text().toLowerCase() === "descrição" || $t.text().toLowerCase() === "modo de usar" || $t.text().toLowerCase() === "pirâmide olfativa") {
					tabContent.find(".qd-tabNav").append('<li><a href="#">' + $t.text().toLowerCase() + '</a></li>');
					tabContent.find(".qd-tabNav:not(.qd-on)").addClass('qd-on').after('<div class="qd-content"></div>')
					tabContent.find(".qd-content").append('<div class="qd-tabContent"><p>' + table.html() + '</p> </div>');
				};
			});
		},
		accessoriesFix: function() {
			$("fieldset >.buy-product-checkbox").parent().each(function() {
				var $t  = $(this);
				$t.add($t.prev("ul")).wrapAll('<div class="qd-accessories-wrapper col-xs-12 col-sm-4 col-md-3"/>');
			});
		}

	};

	var List = {
		init: function () {},
		ajaxStop: function () {},
		windowOnload: function () {}
	};

	var Institutional = {
		init: function () {
			Departament.dropdownmenuToggle();
			Institutional.contactForm();
			Institutional.storeLocator();
			Institutional.resellerForm();
			Institutional.newsForm();
			Institutional.workWithUsForm();

			if ($(document.body).is('.hotsite')) {
				Institutional.hotsiteApplyMosaicBanners();
				Institutional.hotsiteInstitutionalMosaicBanners();
				Institutional.hotsiteSliderFull();
				Institutional.hotsiteContentSlider();
				Institutional.hotsiteProductsCarousel();
				Institutional.hotsiteSliderLinkScroll();
				Institutional.hotsiteSejaFranqueadoBannerMosaic();
				Institutional.hotsiteSejaFranqueadoBannerModalForm();
				Institutional.hotsiteSejaRevendedor();
				Institutional.hotsiteSejaFranqueadoScrollBanners();
				Institutional.ancorScroll();
			}
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		hotsiteSejaFranqueadoScrollBanners: function() {
			if(!$(document.body).is(".seja-um-franqueado"))
				return;

			var linkBanner = $('.seja-um-franqueado-block-4-banners a');

			for (var i = 0; i < linkBanner.length; i++) {
				$(linkBanner[i]).attr('data-qd-item', i);
			}

			linkBanner.click(function(evt) {
				evt.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $($('.seja-um-franqueado-block-6-content')[$(this).attr('data-qd-item')]).offset().top - 80
				}, 900, 'swing');
			});
		},
		ancorScroll: function() {
			$('a[href="#como-funciona"]').click(function(evt) {
				evt.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $("#como-funciona").offset().top
				}, 900, 'swing');
			});

			$('a[href="#10-motivos"]').click(function(evt) {
				evt.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $("#10-motivos").offset().top
				}, 900, 'swing');
			});

		},
		hotsiteSejaFranqueadoBannerModalForm: function() {
			if(!$(document.body).is(".seja-um-franqueado:not(.revendedor)"))
				return;

			var modal = $('.franchisee-qd-v1-modal');

			$('a[href="#qd-link-form"]').click(function(evt) {
				evt.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".form-franchisee-wrapper").offset().top - 300
				}, 900, 'swing');
			});

			// Envio do formulario
			var form = $(".form-franchisee-wrapper form");
			var fieldsCRM = {};

			form.find("#qd_form_phone").mask('(00) 0000-00009');
			form.find("#qd_form_celphone").mask('(00) 0000-00009');
			form.find("#qd_form_zipCode").mask('00000-000');

			// Preenchendo o endereço a partir do CEP
			var $form = form;
			var cepInputs = $form.find("input[id=qd_form_address], input[id=qd_form_neighborhood], input[id=qd_form_city], input[id=qd_form_state]").attr("disabled", "disabled");
			var cep = $form.find("input[id=qd_form_zipCode]");
			cep.keyup(function(e) {
				if ((cep.val() || "").length < 9)
					return;

				$.ajax({
					url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
					dataType: "json",
					success: function(data) {
						$form.find("input[id=qd_form_address]").val(data.street || "");
						$form.find("input[id=qd_form_neighborhood]").val(data.neighborhood || "");
						$form.find("input[id=qd_form_city]").val(data.city || "");
						$form.find("select[id=qd_form_state]").val(data.state || "");
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
					}
				});
			});

			form.validate({
				rules: {email: { email: true } },
				submitHandler: function(form) {
					var $form = $(form);

					if (!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function() {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#qd_form_email").val() || "";
						if (!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function(userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length ? "+55" + phone : null;

							$.ajax({
								url: "//api.ipify.org?format=jsonp",
								dataType: "jsonp",
								success: function(data) {sendData(data.ip); },
								error: function() {
									$.ajax({
										url: "//www.telize.com/jsonip",
										dataType: "jsonp",
										success: function(data) {sendData(data.ip); },
										error: function(data) {sendData(null); }
									});
								}
							});

							var sendData = function(ip) {
								$form.find('[data-qd-name-crm]').each(function() {
									var $t = $(this);
									fieldsCRM[$t.attr('data-qd-name-crm')] = $t.val();
								});
								fieldsCRM['ip'] = ip;
								fieldsCRM['userId'] = userId;

								$form[0].reset();
								$("#qd_form_city_interest").html('<option value="">Selecione o Estado</option>');

								$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/FQ/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify(fieldsCRM),
									success: function(data) {
										$form.find(".form-succes").removeClass("hide");

										setTimeout(function() {
											$form.find(".form-succes").addClass('hide');
											modal.modal('hide');
										}, 6000)
									},
									error: function() {
										alert("Desculpe, não foi possível enviar seu formulário!");
									},
									complete: function() {
										submitWrapper.removeClass("qd-loading");
									}
								});
							}
						};
						$.ajax({
							url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
							type: "GET",
							dataType: "json",
							headers: {Accept: "application/vnd.vtex.ds.v10+json"},
							success: function(data) {
								if (data.length)
									saveContact(data[0].id);
								else
									saveContact(null);
							},
							error: function() {alert("Desculpe, não foi possível enviar seu formulário!"); }
						});
					})();

					return false;
				},
				errorPlacement: function(error, element) {}
			});

			var dataJson = [{sigla:"AC",nome:"Acre",cidades:["Acrelândia","Assis Brasil","Brasiléia","Bujari","Capixaba","Cruzeiro do Sul","Epitaciolândia","Feijó","Jordão","Mâncio Lima","Manoel Urbano","Marechal Thaumaturgo","Plácido de Castro","Porto Acre","Porto Walter","Rio Branco","Rodrigues Alves","Santa Rosa do Purus","Sena Madureira","Senador Guiomard","Tarauacá","Xapuri"]},{sigla:"AL",nome:"Alagoas",cidades:["Água Branca","Anadia","Arapiraca","Atalaia","Barra de Santo Antônio","Barra de São Miguel","Batalha","Belém","Belo Monte","Boca da Mata","Branquinha","Cacimbinhas","Cajueiro","Campestre","Campo Alegre","Campo Grande","Canapi","Capela","Carneiros","Chã Preta","Coité do Nóia","Colônia Leopoldina","Coqueiro Seco","Coruripe","Craíbas","Delmiro Gouveia","Dois Riachos","Estrela de Alagoas","Feira Grande","Feliz Deserto","Flexeiras","Girau do Ponciano","Ibateguara","Igaci","Igreja Nova","Inhapi","Jacaré dos Homens","Jacuípe","Japaratinga","Jaramataia","Jequiá da Praia","Joaquim Gomes","Jundiá","Junqueiro","Lagoa da Canoa","Limoeiro de Anadia","Maceió","Major Isidoro","Mar Vermelho","Maragogi","Maravilha","Marechal Deodoro","Maribondo","Mata Grande","Matriz de Camaragibe","Messias","Minador do Negrão","Monteirópolis","Murici","Novo Lino","Olho d'Água das Flores","Olho d'Água do Casado","Olho d'Água Grande","Olivença","Ouro Branco","Palestina","Palmeira dos Índios","Pão de Açúcar","Pariconha","Paripueira","Passo de Camaragibe","Paulo Jacinto","Penedo","Piaçabuçu","Pilar","Pindoba","Piranhas","Poço das Trincheiras","Porto Calvo","Porto de Pedras","Porto Real do Colégio","Quebrangulo","Rio Largo","Roteiro","Santa Luzia do Norte","Santana do Ipanema","Santana do Mundaú","São Brás","São José da Laje","São José da Tapera","São Luís do Quitunde","São Miguel dos Campos","São Miguel dos Milagres","São Sebastião","Satuba","Senador Rui Palmeira","Tanque d'Arca","Taquarana","Teotônio Vilela","Traipu","União dos Palmares","Viçosa"]},{sigla:"AM",nome:"Amazonas",cidades:["Alvarães","Amaturá","Anamã","Anori","Apuí","Atalaia do Norte","Autazes","Barcelos","Barreirinha","Benjamin Constant","Beruri","Boa Vista do Ramos","Boca do Acre","Borba","Caapiranga","Canutama","Carauari","Careiro","Careiro da Várzea","Coari","Codajás","Eirunepé","Envira","Fonte Boa","Guajará","Humaitá","Ipixuna","Iranduba","Itacoatiara","Itamarati","Itapiranga","Japurá","Juruá","Jutaí","Lábrea","Manacapuru","Manaquiri","Manaus","Manicoré","Maraã","Maués","Nhamundá","Nova Olinda do Norte","Novo Airão","Novo Aripuanã","Parintins","Pauini","Presidente Figueiredo","Rio Preto da Eva","Santa Isabel do Rio Negro","Santo Antônio do Içá","São Gabriel da Cachoeira","São Paulo de Olivença","São Sebastião do Uatumã","Silves","Tabatinga","Tapauá","Tefé","Tonantins","Uarini","Urucará","Urucurituba"]},{sigla:"AP",nome:"Amapá",cidades:["Amapá","Calçoene","Cutias","Ferreira Gomes","Itaubal","Laranjal do Jari","Macapá","Mazagão","Oiapoque","Pedra Branca do Amapari","Porto Grande","Pracuúba","Santana","Serra do Navio","Tartarugalzinho","Vitória do Jari"]},{sigla:"BA",nome:"Bahia",cidades:["Abaíra","Abaré","Acajutiba","Adustina","Água Fria","Aiquara","Alagoinhas","Alcobaça","Almadina","Amargosa","Amélia Rodrigues","América Dourada","Anagé","Andaraí","Andorinha","Angical","Anguera","Antas","Antônio Cardoso","Antônio Gonçalves","Aporá","Apuarema","Araças","Aracatu","Araci","Aramari","Arataca","Aratuípe","Aurelino Leal","Baianópolis","Baixa Grande","Banzaê","Barra","Barra da Estiva","Barra do Choça","Barra do Mendes","Barra do Rocha","Barreiras","Barro Alto","Barrocas","Barro Preto","Belmonte","Belo Campo","Biritinga","Boa Nova","Boa Vista do Tupim","Bom Jesus da Lapa","Bom Jesus da Serra","Boninal","Bonito","Boquira","Botuporã","Brejões","Brejolândia","Brotas de Macaúbas","Brumado","Buerarema","Buritirama","Caatiba","Cabaceiras do Paraguaçu","Cachoeira","Caculé","Caém","Caetanos","Caetité","Cafarnaum","Cairu","Caldeirão Grande","Camacan","Camaçari","Camamu","Campo Alegre de Lourdes","Campo Formoso","Canápolis","Canarana","Canavieiras","Candeal","Candeias","Candiba","Cândido Sales","Cansanção","Canudos","Capela do Alto Alegre","Capim Grosso","Caraíbas","Caravelas","Cardeal da Silva","Carinhanha","Casa Nova","Castro Alves","Catolândia","Catu","Caturama","Central","Chorrochó","Cícero Dantas","Cipó","Coaraci","Cocos","Conceição da Feira","Conceição do Almeida","Conceição do Coité","Conceição do Jacuípe","Conde","Condeúba","Contendas do Sincorá","Coração de Maria","Cordeiros","Coribe","Coronel João Sá","Correntina","Cotegipe","Cravolândia","Crisópolis","Cristópolis","Cruz das Almas","Curaçá","Dário Meira","Dias d'Ávila","Dom Basílio","Dom Macedo Costa","Elísio Medrado","Encruzilhada","Entre Rios","Érico Cardoso","Esplanada","Euclides da Cunha","Eunápolis","Fátima","Feira da Mata","Feira de Santana","Filadélfia","Firmino Alves","Floresta Azul","Formosa do Rio Preto","Gandu","Gavião","Gentio do Ouro","Glória","Gongogi","Governador Mangabeira","Guajeru","Guanambi","Guaratinga","Heliópolis","Iaçu","Ibiassucê","Ibicaraí","Ibicoara","Ibicuí","Ibipeba","Ibipitanga","Ibiquera","Ibirapitanga","Ibirapuã","Ibirataia","Ibitiara","Ibititá","Ibotirama","Ichu","Igaporã","Igrapiúna","Iguaí","Ilhéus","Inhambupe","Ipecaetá","Ipiaú","Ipirá","Ipupiara","Irajuba","Iramaia","Iraquara","Irará","Irecê","Itabela","Itaberaba","Itabuna","Itacaré","Itaeté","Itagi","Itagibá","Itagimirim","Itaguaçu da Bahia","Itaju do Colônia","Itajuípe","Itamaraju","Itamari","Itambé","Itanagra","Itanhém","Itaparica","Itapé","Itapebi","Itapetinga","Itapicuru","Itapitanga","Itaquara","Itarantim","Itatim","Itiruçu","Itiúba","Itororó","Ituaçu","Ituberá","Iuiú","Jaborandi","Jacaraci","Jacobina","Jaguaquara","Jaguarari","Jaguaripe","Jandaíra","Jequié","Jeremoabo","Jiquiriçá","Jitaúna","João Dourado","Juazeiro","Jucuruçu","Jussara","Jussari","Jussiape","Lafaiete Coutinho","Lagoa Real","Laje","Lajedão","Lajedinho","Lajedo do Tabocal","Lamarão","Lapão","Lauro de Freitas","Lençóis","Licínio de Almeida","Livramento de Nossa Senhora","Luís Eduardo Magalhães","Macajuba","Macarani","Macaúbas","Macururé","Madre de Deus","Maetinga","Maiquinique","Mairi","Malhada","Malhada de Pedras","Manoel Vitorino","Mansidão","Maracás","Maragogipe","Maraú","Marcionílio Souza","Mascote","Mata de São João","Matina","Medeiros Neto","Miguel Calmon","Milagres","Mirangaba","Mirante","Monte Santo","Morpará","Morro do Chapéu","Mortugaba","Mucugê","Mucuri","Mulungu do Morro","Mundo Novo","Muniz Ferreira","Muquém de São Francisco","Muritiba","Mutuípe","Nazaré","Nilo Peçanha","Nordestina","Nova Canaã","Nova Fátima","Nova Ibiá","Nova Itarana","Nova Redenção","Nova Soure","Nova Viçosa","Novo Horizonte","Novo Triunfo","Olindina","Oliveira dos Brejinhos","Ouriçangas","Ourolândia","Palmas de Monte Alto","Palmeiras","Paramirim","Paratinga","Paripiranga","Pau Brasil","Paulo Afonso","Pé de Serra","Pedrão","Pedro Alexandre","Piatã","Pilão Arcado","Pindaí","Pindobaçu","Pintadas","Piraí do Norte","Piripá","Piritiba","Planaltino","Planalto","Poções","Pojuca","Ponto Novo","Porto Seguro","Potiraguá","Prado","Presidente Dutra","Presidente Jânio Quadros","Presidente Tancredo Neves","Queimadas","Quijingue","Quixabeira","Rafael Jambeiro","Remanso","Retirolândia","Riachão das Neves","Riachão do Jacuípe","Riacho de Santana","Ribeira do Amparo","Ribeira do Pombal","Ribeirão do Largo","Rio de Contas","Rio do Antônio","Rio do Pires","Rio Real","Rodelas","Ruy Barbosa","Salinas da Margarida","Salvador","Santa Bárbara","Santa Brígida","Santa Cruz Cabrália","Santa Cruz da Vitória","Santa Inês","Santa Luzia","Santa Maria da Vitória","Santa Rita de Cássia","Santa Teresinha","Santaluz","Santana","Santanópolis","Santo Amaro","Santo Antônio de Jesus","Santo Estêvão","São Desidério","São Domingos","São Felipe","São Félix","São Félix do Coribe","São Francisco do Conde","São Gabriel","São Gonçalo dos Campos","São José da Vitória","São José do Jacuípe","São Miguel das Matas","São Sebastião do Passé","Sapeaçu","Sátiro Dias","Saubara","Saúde","Seabra","Sebastião Laranjeiras","Senhor do Bonfim","Sento Sé","Serra do Ramalho","Serra Dourada","Serra Preta","Serrinha","Serrolândia","Simões Filho","Sítio do Mato","Sítio do Quinto","Sobradinho","Souto Soares","Tabocas do Brejo Velho","Tanhaçu","Tanque Novo","Tanquinho","Taperoá","Tapiramutá","Teixeira de Freitas","Teodoro Sampaio","Teofilândia","Teolândia","Terra Nova","Tremedal","Tucano","Uauá","Ubaíra","Ubaitaba","Ubatã","Uibaí","Umburanas","Una","Urandi","Uruçuca","Utinga","Valença","Valente","Várzea da Roça","Várzea do Poço","Várzea Nova","Varzedo","Vera Cruz","Vereda","Vitória da Conquista","Wagner","Wanderley","Wenceslau Guimarães","Xique-Xique"]},{sigla:"CE",nome:"Ceará",cidades:["Abaiara","Acarapé","Acaraú","Acopiara","Aiuaba","Alcântaras","Altaneira","Alto Santo","Amontada","Antonina do Norte","Apuiarés","Aquiraz","Aracati","Aracoiaba","Ararendá","Araripe","Aratuba","Arneiroz","Assaré","Aurora","Baixio","Banabuiú","Barbalha","Barreira","Barro","Barroquinha","Baturité","Beberibe","Bela Cruz","Boa Viagem","Brejo Santo","Camocim","Campos Sales","Canindé","Capistrano","Caridade","Cariré","Caririaçu","Cariús","Carnaubal","Cascavel","Catarina","Catunda","Caucaia","Cedro","Chaval","Choró","Chorozinho","Coreaú","Crateús","Crato","Croatá","Cruz","Deputado Irapuan Pinheiro","Ererê","Eusébio","Farias Brito","Forquilha","Fortaleza","Fortim","Frecheirinha","General Sampaio","Graça","Granja","Granjeiro","Groaíras","Guaiúba","Guaraciaba do Norte","Guaramiranga","Hidrolândia","Horizonte","Ibaretama","Ibiapina","Ibicuitinga","Icapuí","Icó","Iguatu","Independência","Ipaporanga","Ipaumirim","Ipu","Ipueiras","Iracema","Irauçuba","Itaiçaba","Itaitinga","Itapagé","Itapipoca","Itapiúna","Itarema","Itatira","Jaguaretama","Jaguaribara","Jaguaribe","Jaguaruana","Jardim","Jati","Jijoca de Jericoaroara","Juazeiro do Norte","Jucás","Lavras da Mangabeira","Limoeiro do Norte","Madalena","Maracanaú","Maranguape","Marco","Martinópole","Massapê","Mauriti","Meruoca","Milagres","Milhã","Miraíma","Missão Velha","Mombaça","Monsenhor Tabosa","Morada Nova","Moraújo","Morrinhos","Mucambo","Mulungu","Nova Olinda","Nova Russas","Novo Oriente","Ocara","Orós","Pacajus","Pacatuba","Pacoti","Pacujá","Palhano","Palmácia","Paracuru","Paraipaba","Parambu","Paramoti","Pedra Branca","Penaforte","Pentecoste","Pereiro","Pindoretama","Piquet Carneiro","Pires Ferreira","Poranga","Porteiras","Potengi","Potiretama","Quiterianópolis","Quixadá","Quixelô","Quixeramobim","Quixeré","Redenção","Reriutaba","Russas","Saboeiro","Salitre","Santa Quitéria","Santana do Acaraú","Santana do Cariri","São Benedito","São Gonçalo do Amarante","São João do Jaguaribe","São Luís do Curu","Senador Pompeu","Senador Sá","Sobral","Solonópole","Tabuleiro do Norte","Tamboril","Tarrafas","Tauá","Tejuçuoca","Tianguá","Trairi","Tururu","Ubajara","Umari","Umirim","Uruburetama","Uruoca","Varjota","Várzea Alegre","Viçosa do Ceará"]},{sigla:"DF",nome:"Distrito Federal",cidades:["Brasília"]},{sigla:"ES",nome:"Espírito Santo",cidades:["Afonso Cláudio","Água Doce do Norte","Águia Branca","Alegre","Alfredo Chaves","Alto Rio Novo","Anchieta","Apiacá","Aracruz","Atilio Vivacqua","Baixo Guandu","Barra de São Francisco","Boa Esperança","Bom Jesus do Norte","Brejetuba","Cachoeiro de Itapemirim","Cariacica","Castelo","Colatina","Conceição da Barra","Conceição do Castelo","Divino de São Lourenço","Domingos Martins","Dores do Rio Preto","Ecoporanga","Fundão","Governador Lindenberg","Guaçuí","Guarapari","Ibatiba","Ibiraçu","Ibitirama","Iconha","Irupi","Itaguaçu","Itapemirim","Itarana","Iúna","Jaguaré","Jerônimo Monteiro","João Neiva","Laranja da Terra","Linhares","Mantenópolis","Marataizes","Marechal Floriano","Marilândia","Mimoso do Sul","Montanha","Mucurici","Muniz Freire","Muqui","Nova Venécia","Pancas","Pedro Canário","Pinheiros","Piúma","Ponto Belo","Presidente Kennedy","Rio Bananal","Rio Novo do Sul","Santa Leopoldina","Santa Maria de Jetibá","Santa Teresa","São Domingos do Norte","São Gabriel da Palha","São José do Calçado","São Mateus","São Roque do Canaã","Serra","Sooretama","Vargem Alta","Venda Nova do Imigrante","Viana","Vila Pavão","Vila Valério","Vila Velha","Vitória"]},{sigla:"GO",nome:"Goiás",cidades:["Abadia de Goiás","Abadiânia","Acreúna","Adelândia","Água Fria de Goiás","Água Limpa","Águas Lindas de Goiás","Alexânia","Aloândia","Alto Horizonte","Alto Paraíso de Goiás","Alvorada do Norte","Amaralina","Americano do Brasil","Amorinópolis","Anápolis","Anhanguera","Anicuns","Aparecida de Goiânia","Aparecida do Rio Doce","Aporé","Araçu","Aragarças","Aragoiânia","Araguapaz","Arenópolis","Aruanã","Aurilândia","Avelinópolis","Baliza","Barro Alto","Bela Vista de Goiás","Bom Jardim de Goiás","Bom Jesus de Goiás","Bonfinópolis","Bonópolis","Brazabrantes","Britânia","Buriti Alegre","Buriti de Goiás","Buritinópolis","Cabeceiras","Cachoeira Alta","Cachoeira de Goiás","Cachoeira Dourada","Caçu","Caiapônia","Caldas Novas","Caldazinha","Campestre de Goiás","Campinaçu","Campinorte","Campo Alegre de Goiás","Campos Limpo de Goiás","Campos Belos","Campos Verdes","Carmo do Rio Verde","Castelândia","Catalão","Caturaí","Cavalcante","Ceres","Cezarina","Chapadão do Céu","Cidade Ocidental","Cocalzinho de Goiás","Colinas do Sul","Córrego do Ouro","Corumbá de Goiás","Corumbaíba","Cristalina","Cristianópolis","Crixás","Cromínia","Cumari","Damianópolis","Damolândia","Davinópolis","Diorama","Divinópolis de Goiás","Doverlândia","Edealina","Edéia","Estrela do Norte","Faina","Fazenda Nova","Firminópolis","Flores de Goiás","Formosa","Formoso","Gameleira de Goiás","Goianápolis","Goiandira","Goianésia","Goiânia","Goianira","Goiás","Goiatuba","Gouvelândia","Guapó","Guaraíta","Guarani de Goiás","Guarinos","Heitoraí","Hidrolândia","Hidrolina","Iaciara","Inaciolândia","Indiara","Inhumas","Ipameri","Ipiranga de Goiás","Iporá","Israelândia","Itaberaí","Itaguari","Itaguaru","Itajá","Itapaci","Itapirapuã","Itapuranga","Itarumã","Itauçu","Itumbiara","Ivolândia","Jandaia","Jaraguá","Jataí","Jaupaci","Jesúpolis","Joviânia","Jussara","Lagoa Santa","Leopoldo de Bulhões","Luziânia","Mairipotaba","Mambaí","Mara Rosa","Marzagão","Matrinchã","Maurilândia","Mimoso de Goiás","Minaçu","Mineiros","Moiporá","Monte Alegre de Goiás","Montes Claros de Goiás","Montividiu","Montividiu do Norte","Morrinhos","Morro Agudo de Goiás","Mossâmedes","Mozarlândia","Mundo Novo","Mutunópolis","Nazário","Nerópolis","Niquelândia","Nova América","Nova Aurora","Nova Crixás","Nova Glória","Nova Iguaçu de Goiás","Nova Roma","Nova Veneza","Novo Brasil","Novo Gama","Novo Planalto","Orizona","Ouro Verde de Goiás","Ouvidor","Padre Bernardo","Palestina de Goiás","Palmeiras de Goiás","Palmelo","Palminópolis","Panamá","Paranaiguara","Paraúna","Perolândia","Petrolina de Goiás","Pilar de Goiás","Piracanjuba","Piranhas","Pirenópolis","Pires do Rio","Planaltina","Pontalina","Porangatu","Porteirão","Portelândia","Posse","Professor Jamil","Quirinópolis","Rialma","Rianápolis","Rio Quente","Rio Verde","Rubiataba","Sanclerlândia","Santa Bárbara de Goiás","Santa Cruz de Goiás","Santa Fé de Goiás","Santa Helena de Goiás","Santa Isabel","Santa Rita do Araguaia","Santa Rita do Novo Destino","Santa Rosa de Goiás","Santa Tereza de Goiás","Santa Terezinha de Goiás","Santo Antônio da Barra","Santo Antônio de Goiás","Santo Antônio do Descoberto","São Domingos","São Francisco de Goiás","São João d'Aliança","São João da Paraúna","São Luís de Montes Belos","São Luíz do Norte","São Miguel do Araguaia","São Miguel do Passa Quatro","São Patrício","São Simão","Senador Canedo","Serranópolis","Silvânia","Simolândia","Sítio d'Abadia","Taquaral de Goiás","Teresina de Goiás","Terezópolis de Goiás","Três Ranchos","Trindade","Trombas","Turvânia","Turvelândia","Uirapuru","Uruaçu","Uruana","Urutaí","Valparaíso de Goiás","Varjão","Vianópolis","Vicentinópolis","Vila Boa","Vila Propício"]},{sigla:"MA",nome:"Maranhão",cidades:["Açailândia","Afonso Cunha","Água Doce do Maranhão","Alcântara","Aldeias Altas","Altamira do Maranhão","Alto Alegre do Maranhão","Alto Alegre do Pindaré","Alto Parnaíba","Amapá do Maranhão","Amarante do Maranhão","Anajatuba","Anapurus","Apicum-Açu","Araguanã","Araioses","Arame","Arari","Axixá","Bacabal","Bacabeira","Bacuri","Bacurituba","Balsas","Barão de Grajaú","Barra do Corda","Barreirinhas","Bela Vista do Maranhão","Belágua","Benedito Leite","Bequimão","Bernardo do Mearim","Boa Vista do Gurupi","Bom Jardim","Bom Jesus das Selvas","Bom Lugar","Brejo","Brejo de Areia","Buriti","Buriti Bravo","Buriticupu","Buritirana","Cachoeira Grande","Cajapió","Cajari","Campestre do Maranhão","Cândido Mendes","Cantanhede","Capinzal do Norte","Carolina","Carutapera","Caxias","Cedral","Central do Maranhão","Centro do Guilherme","Centro Novo do Maranhão","Chapadinha","Cidelândia","Codó","Coelho Neto","Colinas","Conceição do Lago-Açu","Coroatá","Cururupu","Davinópolis","Dom Pedro","Duque Bacelar","Esperantinópolis","Estreito","Feira Nova do Maranhão","Fernando Falcão","Formosa da Serra Negra","Fortaleza dos Nogueiras","Fortuna","Godofredo Viana","Gonçalves Dias","Governador Archer","Governador Edison Lobão","Governador Eugênio Barros","Governador Luiz Rocha","Governador Newton Bello","Governador Nunes Freire","Graça Aranha","Grajaú","Guimarães","Humberto de Campos","Icatu","Igarapé do Meio","Igarapé Grande","Imperatriz","Itaipava do Grajaú","Itapecuru Mirim","Itinga do Maranhão","Jatobá","Jenipapo dos Vieiras","João Lisboa","Joselândia","Junco do Maranhão","Lago da Pedra","Lago do Junco","Lago dos Rodrigues","Lago Verde","Lagoa do Mato","Lagoa Grande do Maranhão","Lajeado Novo","Lima Campos","Loreto","Luís Domingues","Magalhães de Almeida","Maracaçumé","Marajá do Sena","Maranhãozinho","Mata Roma","Matinha","Matões","Matões do Norte","Milagres do Maranhão","Mirador","Miranda do Norte","Mirinzal","Monção","Montes Altos","Morros","Nina Rodrigues","Nova Colinas","Nova Iorque","Nova Olinda do Maranhão","Olho d'Água das Cunhãs","Olinda Nova do Maranhão","Paço do Lumiar","Palmeirândia","Paraibano","Parnarama","Passagem Franca","Pastos Bons","Paulino Neves","Paulo Ramos","Pedreiras","Pedro do Rosário","Penalva","Peri Mirim","Peritoró","Pindaré Mirim","Pinheiro","Pio XII","Pirapemas","Poção de Pedras","Porto Franco","Porto Rico do Maranhão","Presidente Dutra","Presidente Juscelino","Presidente Médici","Presidente Sarney","Presidente Vargas","Primeira Cruz","Raposa","Riachão","Ribamar Fiquene","Rosário","Sambaíba","Santa Filomena do Maranhão","Santa Helena","Santa Inês","Santa Luzia","Santa Luzia do Paruá","Santa Quitéria do Maranhão","Santa Rita","Santana do Maranhão","Santo Amaro do Maranhão","Santo Antônio dos Lopes","São Benedito do Rio Preto","São Bento","São Bernardo","São Domingos do Azeitão","São Domingos do Maranhão","São Félix de Balsas","São Francisco do Brejão","São Francisco do Maranhão","São João Batista","São João do Carú","São João do Paraíso","São João do Soter","São João dos Patos","São José de Ribamar","São José dos Basílios","São Luís","São Luís Gonzaga do Maranhão","São Mateus do Maranhão","São Pedro da Água Branca","São Pedro dos Crentes","São Raimundo das Mangabeiras","São Raimundo do Doca Bezerra","São Roberto","São Vicente Ferrer","Satubinha","Senador Alexandre Costa","Senador La Rocque","Serrano do Maranhão","Sítio Novo","Sucupira do Norte","Sucupira do Riachão","Tasso Fragoso","Timbiras","Timon","Trizidela do Vale","Tufilândia","Tuntum","Turiaçu","Turilândia","Tutóia","Urbano Santos","Vargem Grande","Viana","Vila Nova dos Martírios","Vitória do Mearim","Vitorino Freire","Zé Doca"]},{sigla:"MG",nome:"Minas Gerais",cidades:["Abadia dos Dourados","Abaeté","Abre Campo","Acaiaca","Açucena","Água Boa","Água Comprida","Aguanil","Águas Formosas","Águas Vermelhas","Aimorés","Aiuruoca","Alagoa","Albertina","Além Paraíba","Alfenas","Alfredo Vasconcelos","Almenara","Alpercata","Alpinópolis","Alterosa","Alto Caparaó","Alto Jequitibá","Alto Rio Doce","Alvarenga","Alvinópolis","Alvorada de Minas","Amparo do Serra","Andradas","Andrelândia","Angelândia","Antônio Carlos","Antônio Dias","Antônio Prado de Minas","Araçaí","Aracitaba","Araçuaí","Araguari","Arantina","Araponga","Araporã","Arapuá","Araújos","Araxá","Arceburgo","Arcos","Areado","Argirita","Aricanduva","Arinos","Astolfo Dutra","Ataléia","Augusto de Lima","Baependi","Baldim","Bambuí","Bandeira","Bandeira do Sul","Barão de Cocais","Barão de Monte Alto","Barbacena","Barra Longa","Barroso","Bela Vista de Minas","Belmiro Braga","Belo Horizonte","Belo Oriente","Belo Vale","Berilo","Berizal","Bertópolis","Betim","Bias Fortes","Bicas","Biquinhas","Boa Esperança","Bocaina de Minas","Bocaiúva","Bom Despacho","Bom Jardim de Minas","Bom Jesus da Penha","Bom Jesus do Amparo","Bom Jesus do Galho","Bom Repouso","Bom Sucesso","Bonfim","Bonfinópolis de Minas","Bonito de Minas","Borda da Mata","Botelhos","Botumirim","Brás Pires","Brasilândia de Minas","Brasília de Minas","Brasópolis","Braúnas","Brumadinho","Bueno Brandão","Buenópolis","Bugre","Buritis","Buritizeiro","Cabeceira Grande","Cabo Verde","Cachoeira da Prata","Cachoeira de Minas","Cachoeira de Pajeú","Cachoeira Dourada","Caetanópolis","Caeté","Caiana","Cajuri","Caldas","Camacho","Camanducaia","Cambuí","Cambuquira","Campanário","Campanha","Campestre","Campina Verde","Campo Azul","Campo Belo","Campo do Meio","Campo Florido","Campos Altos","Campos Gerais","Cana Verde","Canaã","Canápolis","Candeias","Cantagalo","Caparaó","Capela Nova","Capelinha","Capetinga","Capim Branco","Capinópolis","Capitão Andrade","Capitão Enéas","Capitólio","Caputira","Caraí","Caranaíba","Carandaí","Carangola","Caratinga","Carbonita","Careaçu","Carlos Chagas","Carmésia","Carmo da Cachoeira","Carmo da Mata","Carmo de Minas","Carmo do Cajuru","Carmo do Paranaíba","Carmo do Rio Claro","Carmópolis de Minas","Carneirinho","Carrancas","Carvalhópolis","Carvalhos","Casa Grande","Cascalho Rico","Cássia","Cataguases","Catas Altas","Catas Altas da Noruega","Catuji","Catuti","Caxambu","Cedro do Abaeté","Central de Minas","Centralina","Chácara","Chalé","Chapada do Norte","Chapada Gaúcha","Chiador","Cipotânea","Claraval","Claro dos Poções","Cláudio","Coimbra","Coluna","Comendador Gomes","Comercinho","Conceição da Aparecida","Conceição da Barra de Minas","Conceição das Alagoas","Conceição das Pedras","Conceição de Ipanema","Conceição do Mato Dentro","Conceição do Pará","Conceição do Rio Verde","Conceição dos Ouros","Cônego Marinho","Confins","Congonhal","Congonhas","Congonhas do Norte","Conquista","Conselheiro Lafaiete","Conselheiro Pena","Consolação","Contagem","Coqueiral","Coração de Jesus","Cordisburgo","Cordislândia","Corinto","Coroaci","Coromandel","Coronel Fabriciano","Coronel Murta","Coronel Pacheco","Coronel Xavier Chaves","Córrego Danta","Córrego do Bom Jesus","Córrego Fundo","Córrego Novo","Couto de Magalhães de Minas","Crisólita","Cristais","Cristália","Cristiano Otoni","Cristina","Crucilândia","Cruzeiro da Fortaleza","Cruzília","Cuparaque","Curral de Dentro","Curvelo","Datas","Delfim Moreira","Delfinópolis","Delta","Descoberto","Desterro de Entre Rios","Desterro do Melo","Diamantina","Diogo de Vasconcelos","Dionísio","Divinésia","Divino","Divino das Laranjeiras","Divinolândia de Minas","Divinópolis","Divisa Alegre","Divisa Nova","Divisópolis","Dom Bosco","Dom Cavati","Dom Joaquim","Dom Silvério","Dom Viçoso","Dona Euzébia","Dores de Campos","Dores de Guanhães","Dores do Indaiá","Dores do Turvo","Doresópolis","Douradoquara","Durandé","Elói Mendes","Engenheiro Caldas","Engenheiro Navarro","Entre Folhas","Entre Rios de Minas","Ervália","Esmeraldas","Espera Feliz","Espinosa","Espírito Santo do Dourado","Estiva","Estrela Dalva","Estrela do Indaiá","Estrela do Sul","Eugenópolis","Ewbank da Câmara","Extrema","Fama","Faria Lemos","Felício dos Santos","Felisburgo","Felixlândia","Fernandes Tourinho","Ferros","Fervedouro","Florestal","Formiga","Formoso","Fortaleza de Minas","Fortuna de Minas","Francisco Badaró","Francisco Dumont","Francisco Sá","Franciscópolis","Frei Gaspar","Frei Inocêncio","Frei Lagonegro","Fronteira","Fronteira dos Vales","Fruta de Leite","Frutal","Funilândia","Galiléia","Gameleiras","Glaucilândia","Goiabeira","Goianá","Gonçalves","Gonzaga","Gouveia","Governador Valadares","Grão Mogol","Grupiara","Guanhães","Guapé","Guaraciaba","Guaraciama","Guaranésia","Guarani","Guarará","Guarda-Mor","Guaxupé","Guidoval","Guimarânia","Guiricema","Gurinhatã","Heliodora","Iapu","Ibertioga","Ibiá","Ibiaí","Ibiracatu","Ibiraci","Ibirité","Ibitiúra de Minas","Ibituruna","Icaraí de Minas","Igarapé","Igaratinga","Iguatama","Ijaci","Ilicínea","Imbé de Minas","Inconfidentes","Indaiabira","Indianópolis","Ingaí","Inhapim","Inhaúma","Inimutaba","Ipaba","Ipanema","Ipatinga","Ipiaçu","Ipuiúna","Iraí de Minas","Itabira","Itabirinha de Mantena","Itabirito","Itacambira","Itacarambi","Itaguara","Itaipé","Itajubá","Itamarandiba","Itamarati de Minas","Itambacuri","Itambé do Mato Dentro","Itamogi","Itamonte","Itanhandu","Itanhomi","Itaobim","Itapagipe","Itapecerica","Itapeva","Itatiaiuçu","Itaú de Minas","Itaúna","Itaverava","Itinga","Itueta","Ituiutaba","Itumirim","Iturama","Itutinga","Jaboticatubas","Jacinto","Jacuí","Jacutinga","Jaguaraçu","Jaíba","Jampruca","Janaúba","Januária","Japaraíba","Japonvar","Jeceaba","Jenipapo de Minas","Jequeri","Jequitaí","Jequitibá","Jequitinhonha","Jesuânia","Joaíma","Joanésia","João Monlevade","João Pinheiro","Joaquim Felício","Jordânia","José Gonçalves de Minas","José Raydan","Josenópolis","Juatuba","Juiz de Fora","Juramento","Juruaia","Juvenília","Ladainha","Lagamar","Lagoa da Prata","Lagoa dos Patos","Lagoa Dourada","Lagoa Formosa","Lagoa Grande","Lagoa Santa","Lajinha","Lambari","Lamim","Laranjal","Lassance","Lavras","Leandro Ferreira","Leme do Prado","Leopoldina","Liberdade","Lima Duarte","Limeira do Oeste","Lontra","Luisburgo","Luislândia","Luminárias","Luz","Machacalis","Machado","Madre de Deus de Minas","Malacacheta","Mamonas","Manga","Manhuaçu","Manhumirim","Mantena","Mar de Espanha","Maravilhas","Maria da Fé","Mariana","Marilac","Mário Campos","Maripá de Minas","Marliéria","Marmelópolis","Martinho Campos","Martins Soares","Mata Verde","Materlândia","Mateus Leme","Mathias Lobato","Matias Barbosa","Matias Cardoso","Matipó","Mato Verde","Matozinhos","Matutina","Medeiros","Medina","Mendes Pimentel","Mercês","Mesquita","Minas Novas","Minduri","Mirabela","Miradouro","Miraí","Miravânia","Moeda","Moema","Monjolos","Monsenhor Paulo","Montalvânia","Monte Alegre de Minas","Monte Azul","Monte Belo","Monte Carmelo","Monte Formoso","Monte Santo de Minas","Monte Sião","Montes Claros","Montezuma","Morada Nova de Minas","Morro da Garça","Morro do Pilar","Munhoz","Muriaé","Mutum","Muzambinho","Nacip Raydan","Nanuque","Naque","Natalândia","Natércia","Nazareno","Nepomuceno","Ninheira","Nova Belém","Nova Era","Nova Lima","Nova Módica","Nova Ponte","Nova Porteirinha","Nova Resende","Nova Serrana","Nova União","Novo Cruzeiro","Novo Oriente de Minas","Novorizonte","Olaria","Olhos-d'Água","Olímpio Noronha","Oliveira","Oliveira Fortes","Onça de Pitangui","Oratórios","Orizânia","Ouro Branco","Ouro Fino","Ouro Preto","Ouro Verde de Minas","Padre Carvalho","Padre Paraíso","Pai Pedro","Paineiras","Pains","Paiva","Palma","Palmópolis","Papagaios","Pará de Minas","Paracatu","Paraguaçu","Paraisópolis","Paraopeba","Passa Quatro","Passa Tempo","Passa-Vinte","Passabém","Passos","Patis","Patos de Minas","Patrocínio","Patrocínio do Muriaé","Paula Cândido","Paulistas","Pavão","Peçanha","Pedra Azul","Pedra Bonita","Pedra do Anta","Pedra do Indaiá","Pedra Dourada","Pedralva","Pedras de Maria da Cruz","Pedrinópolis","Pedro Leopoldo","Pedro Teixeira","Pequeri","Pequi","Perdigão","Perdizes","Perdões","Periquito","Pescador","Piau","Piedade de Caratinga","Piedade de Ponte Nova","Piedade do Rio Grande","Piedade dos Gerais","Pimenta","Pingo-d'Água","Pintópolis","Piracema","Pirajuba","Piranga","Piranguçu","Piranguinho","Pirapetinga","Pirapora","Piraúba","Pitangui","Piumhi","Planura","Poço Fundo","Poços de Caldas","Pocrane","Pompéu","Ponte Nova","Ponto Chique","Ponto dos Volantes","Porteirinha","Porto Firme","Poté","Pouso Alegre","Pouso Alto","Prados","Prata","Pratápolis","Pratinha","Presidente Bernardes","Presidente Juscelino","Presidente Kubitschek","Presidente Olegário","Prudente de Morais","Quartel Geral","Queluzito","Raposos","Raul Soares","Recreio","Reduto","Resende Costa","Resplendor","Ressaquinha","Riachinho","Riacho dos Machados","Ribeirão das Neves","Ribeirão Vermelho","Rio Acima","Rio Casca","Rio do Prado","Rio Doce","Rio Espera","Rio Manso","Rio Novo","Rio Paranaíba","Rio Pardo de Minas","Rio Piracicaba","Rio Pomba","Rio Preto","Rio Vermelho","Ritápolis","Rochedo de Minas","Rodeiro","Romaria","Rosário da Limeira","Rubelita","Rubim","Sabará","Sabinópolis","Sacramento","Salinas","Salto da Divisa","Santa Bárbara","Santa Bárbara do Leste","Santa Bárbara do Monte Verde","Santa Bárbara do Tugúrio","Santa Cruz de Minas","Santa Cruz de Salinas","Santa Cruz do Escalvado","Santa Efigênia de Minas","Santa Fé de Minas","Santa Helena de Minas","Santa Juliana","Santa Luzia","Santa Margarida","Santa Maria de Itabira","Santa Maria do Salto","Santa Maria do Suaçuí","Santa Rita de Caldas","Santa Rita de Ibitipoca","Santa Rita de Jacutinga","Santa Rita de Minas","Santa Rita do Itueto","Santa Rita do Sapucaí","Santa Rosa da Serra","Santa Vitória","Santana da Vargem","Santana de Cataguases","Santana de Pirapama","Santana do Deserto","Santana do Garambéu","Santana do Jacaré","Santana do Manhuaçu","Santana do Paraíso","Santana do Riacho","Santana dos Montes","Santo Antônio do Amparo","Santo Antônio do Aventureiro","Santo Antônio do Grama","Santo Antônio do Itambé","Santo Antônio do Jacinto","Santo Antônio do Monte","Santo Antônio do Retiro","Santo Antônio do Rio Abaixo","Santo Hipólito","Santos Dumont","São Bento Abade","São Brás do Suaçuí","São Domingos das Dores","São Domingos do Prata","São Félix de Minas","São Francisco","São Francisco de Paula","São Francisco de Sales","São Francisco do Glória","São Geraldo","São Geraldo da Piedade","São Geraldo do Baixio","São Gonçalo do Abaeté","São Gonçalo do Pará","São Gonçalo do Rio Abaixo","São Gonçalo do Rio Preto","São Gonçalo do Sapucaí","São Gotardo","São João Batista do Glória","São João da Lagoa","São João da Mata","São João da Ponte","São João das Missões","São João del Rei","São João do Manhuaçu","São João do Manteninha","São João do Oriente","São João do Pacuí","São João do Paraíso","São João Evangelista","São João Nepomuceno","São Joaquim de Bicas","São José da Barra","São José da Lapa","São José da Safira","São José da Varginha","São José do Alegre","São José do Divino","São José do Goiabal","São José do Jacuri","São José do Mantimento","São Lourenço","São Miguel do Anta","São Pedro da União","São Pedro do Suaçuí","São Pedro dos Ferros","São Romão","São Roque de Minas","São Sebastião da Bela Vista","São Sebastião da Vargem Alegre","São Sebastião do Anta","São Sebastião do Maranhão","São Sebastião do Oeste","São Sebastião do Paraíso","São Sebastião do Rio Preto","São Sebastião do Rio Verde","São Thomé das Letras","São Tiago","São Tomás de Aquino","São Vicente de Minas","Sapucaí-Mirim","Sardoá","Sarzedo","Sem-Peixe","Senador Amaral","Senador Cortes","Senador Firmino","Senador José Bento","Senador Modestino Gonçalves","Senhora de Oliveira","Senhora do Porto","Senhora dos Remédios","Sericita","Seritinga","Serra Azul de Minas","Serra da Saudade","Serra do Salitre","Serra dos Aimorés","Serrania","Serranópolis de Minas","Serranos","Serro","Sete Lagoas","Setubinha","Silveirânia","Silvianópolis","Simão Pereira","Simonésia","Sobrália","Soledade de Minas","Tabuleiro","Taiobeiras","Taparuba","Tapira","Tapiraí","Taquaraçu de Minas","Tarumirim","Teixeiras","Teófilo Otoni","Timóteo","Tiradentes","Tiros","Tocantins","Tocos do Moji","Toledo","Tombos","Três Corações","Três Marias","Três Pontas","Tumiritinga","Tupaciguara","Turmalina","Turvolândia","Ubá","Ubaí","Ubaporanga","Uberaba","Uberlândia","Umburatiba","Unaí","União de Minas","Uruana de Minas","Urucânia","Urucuia","Vargem Alegre","Vargem Bonita","Vargem Grande do Rio Pardo","Varginha","Varjão de Minas","Várzea da Palma","Varzelândia","Vazante","Verdelândia","Veredinha","Veríssimo","Vermelho Novo","Vespasiano","Viçosa","Vieiras","Virgem da Lapa","Virgínia","Virginópolis","Virgolândia","Visconde do Rio Branco","Volta Grande","Wenceslau Braz"]},{sigla:"MS",nome:"Mato Grosso do Sul",cidades:["Água Clara","Alcinópolis","Amambaí","Anastácio","Anaurilândia","Angélica","Antônio João","Aparecida do Taboado","Aquidauana","Aral Moreira","Bandeirantes","Bataguassu","Bataiporã","Bela Vista","Bodoquena","Bonito","Brasilândia","Caarapó","Camapuã","Campo Grande","Caracol","Cassilândia","Chapadão do Sul","Corguinho","Coronel Sapucaia","Corumbá","Costa Rica","Coxim","Deodápolis","Dois Irmãos do Buriti","Douradina","Dourados","Eldorado","Fátima do Sul","Glória de Dourados","Guia Lopes da Laguna","Iguatemi","Inocência","Itaporã","Itaquiraí","Ivinhema","Japorã","Jaraguari","Jardim","Jateí","Juti","Ladário","Laguna Carapã","Maracaju","Miranda","Mundo Novo","Naviraí","Nioaque","Nova Alvorada do Sul","Nova Andradina","Novo Horizonte do Sul","Paranaíba","Paranhos","Pedro Gomes","Ponta Porã","Porto Murtinho","Ribas do Rio Pardo","Rio Brilhante","Rio Negro","Rio Verde de Mato Grosso","Rochedo","Santa Rita do Pardo","São Gabriel do Oeste","Selvíria","Sete Quedas","Sidrolândia","Sonora","Tacuru","Taquarussu","Terenos","Três Lagoas","Vicentina"]},{sigla:"MT",nome:"Mato Grosso",cidades:["Acorizal","Água Boa","Alta Floresta","Alto Araguaia","Alto Boa Vista","Alto Garças","Alto Paraguai","Alto Taquari","Apiacás","Araguaiana","Araguainha","Araputanga","Arenápolis","Aripuanã","Barão de Melgaço","Barra do Bugres","Barra do Garças","Bom Jesus do Araguaia","Brasnorte","Cáceres","Campinápolis","Campo Novo do Parecis","Campo Verde","Campos de Júlio","Canabrava do Norte","Canarana","Carlinda","Castanheira","Chapada dos Guimarães","Cláudia","Cocalinho","Colíder","Colniza","Comodoro","Confresa","Conquista d'Oeste","Cotriguaçu","Curvelândia","Cuiabá","Denise","Diamantino","Dom Aquino","Feliz Natal","Figueirópolis d'Oeste","Gaúcha do Norte","General Carneiro","Glória d'Oeste","Guarantã do Norte","Guiratinga","Indiavaí","Itaúba","Itiquira","Jaciara","Jangada","Jauru","Juara","Juína","Juruena","Juscimeira","Lambari d'Oeste","Lucas do Rio Verde","Luciára","Marcelândia","Matupá","Mirassol d'Oeste","Nobres","Nortelândia","Nossa Senhora do Livramento","Nova Bandeirantes","Nova Brasilândia","Nova Canãa do Norte","Nova Guarita","Nova Lacerda","Nova Marilândia","Nova Maringá","Nova Monte Verde","Nova Mutum","Nova Nazaré","Nova Olímpia","Nova Santa Helena","Nova Ubiratã","Nova Xavantina","Novo Horizonte do Norte","Novo Mundo","Novo Santo Antônio","Novo São Joaquim","Paranaíta","Paranatinga","Pedra Preta","Peixoto de Azevedo","Planalto da Serra","Poconé","Pontal do Araguaia","Ponte Branca","Pontes e Lacerda","Porto Alegre do Norte","Porto dos Gaúchos","Porto Esperidião","Porto Estrela","Poxoréo","Primavera do Leste","Querência","Reserva do Cabaçal","Ribeirão Cascalheira","Ribeirãozinho","Rio Branco","Rondolândia","Rondonópolis","Rosário Oeste","Salto do Céu","Santa Carmem","Santa Cruz do Xingu","Santa Rita do Trivelato","Santa Terezinha","Santo Afonso","Santo Antônio do Leste","Santo Antônio do Leverger","São Félix do Araguaia","São José do Povo","São José do Rio Claro","São José do Xingu","São José dos Quatro Marcos","São Pedro da Cipa","Sapezal","Serra Nova Dourada","Sinop","Sorriso","Tabaporã","Tangará da Serra","Tapurah","Terra Nova do Norte","Tesouro","Torixoréu","União do Sul","Vale de São Domingos","Várzea Grande","Vera","Vila Bela da Santíssima Trindade","Vila Rica"]},{sigla:"PA",nome:"Pará",cidades:["Abaetetuba","Abel Figueiredo","Acará","Afuá","Água Azul do Norte","Alenquer","Almeirim","Altamira","Anajás","Ananindeua","Anapu","Augusto Corrêa","Aurora do Pará","Aveiro","Bagre","Baião","Bannach","Barcarena","Belém","Belterra","Benevides","Bom Jesus do Tocantins","Bonito","Bragança","Brasil Novo","Brejo Grande do Araguaia","Breu Branco","Breves","Bujaru","Cachoeira do Arari","Cachoeira do Piriá","Cametá","Canaã dos Carajás","Capanema","Capitão Poço","Castanhal","Chaves","Colares","Conceição do Araguaia","Concórdia do Pará","Cumaru do Norte","Curionópolis","Curralinho","Curuá","Curuçá","Dom Eliseu","Eldorado dos Carajás","Faro","Floresta do Araguaia","Garrafão do Norte","Goianésia do Pará","Gurupá","Igarapé-Açu","Igarapé-Miri","Inhangapi","Ipixuna do Pará","Irituia","Itaituba","Itupiranga","Jacareacanga","Jacundá","Juruti","Limoeiro do Ajuru","Mãe do Rio","Magalhães Barata","Marabá","Maracanã","Marapanim","Marituba","Medicilândia","Melgaço","Mocajuba","Moju","Monte Alegre","Muaná","Nova Esperança do Piriá","Nova Ipixuna","Nova Timboteua","Novo Progresso","Novo Repartimento","Óbidos","Oeiras do Pará","Oriximiná","Ourém","Ourilândia do Norte","Pacajá","Palestina do Pará","Paragominas","Parauapebas","Pau d'Arco","Peixe-Boi","Piçarra","Placas","Ponta de Pedras","Portel","Porto de Moz","Prainha","Primavera","Quatipuru","Redenção","Rio Maria","Rondon do Pará","Rurópolis","Salinópolis","Salvaterra","Santa Bárbara do Pará","Santa Cruz do Arari","Santa Isabel do Pará","Santa Luzia do Pará","Santa Maria das Barreiras","Santa Maria do Pará","Santana do Araguaia","Santarém","Santarém Novo","Santo Antônio do Tauá","São Caetano de Odivela","São Domingos do Araguaia","São Domingos do Capim","São Félix do Xingu","São Francisco do Pará","São Geraldo do Araguaia","São João da Ponta","São João de Pirabas","São João do Araguaia","São Miguel do Guamá","São Sebastião da Boa Vista","Sapucaia","Senador José Porfírio","Soure","Tailândia","Terra Alta","Terra Santa","Tomé-Açu","Tracuateua","Trairão","Tucumã","Tucuruí","Ulianópolis","Uruará","Vigia","Viseu","Vitória do Xingu","Xinguara"]},{sigla:"PB",nome:"Paraíba",cidades:["Água Branca","Aguiar","Alagoa Grande","Alagoa Nova","Alagoinha","Alcantil","Algodão de Jandaíra","Alhandra","Amparo","Aparecida","Araçagi","Arara","Araruna","Areia","Areia de Baraúnas","Areial","Aroeiras","Assunção","Baía da Traição","Bananeiras","Baraúna","Barra de Santa Rosa","Barra de Santana","Barra de São Miguel","Bayeux","Belém","Belém do Brejo do Cruz","Bernardino Batista","Boa Ventura","Boa Vista","Bom Jesus","Bom Sucesso","Bonito de Santa Fé","Boqueirão","Borborema","Brejo do Cruz","Brejo dos Santos","Caaporã","Cabaceiras","Cabedelo","Cachoeira dos Índios","Cacimba de Areia","Cacimba de Dentro","Cacimbas","Caiçara","Cajazeiras","Cajazeirinhas","Caldas Brandão","Camalaú","Campina Grande","Campo de Santana","Capim","Caraúbas","Carrapateira","Casserengue","Catingueira","Catolé do Rocha","Caturité","Conceição","Condado","Conde","Congo","Coremas","Coxixola","Cruz do Espírito Santo","Cubati","Cuité","Cuité de Mamanguape","Cuitegi","Curral de Cima","Curral Velho","Damião","Desterro","Diamante","Dona Inês","Duas Estradas","Emas","Esperança","Fagundes","Frei Martinho","Gado Bravo","Guarabira","Gurinhém","Gurjão","Ibiara","Igaracy","Imaculada","Ingá","Itabaiana","Itaporanga","Itapororoca","Itatuba","Jacaraú","Jericó","João Pessoa","Juarez Távora","Juazeirinho","Junco do Seridó","Juripiranga","Juru","Lagoa","Lagoa de Dentro","Lagoa Seca","Lastro","Livramento","Logradouro","Lucena","Mãe d'Água","Malta","Mamanguape","Manaíra","Marcação","Mari","Marizópolis","Massaranduba","Mataraca","Matinhas","Mato Grosso","Maturéia","Mogeiro","Montadas","Monte Horebe","Monteiro","Mulungu","Natuba","Nazarezinho","Nova Floresta","Nova Olinda","Nova Palmeira","Olho d'Água","Olivedos","Ouro Velho","Parari","Passagem","Patos","Paulista","Pedra Branca","Pedra Lavrada","Pedras de Fogo","Pedro Régis","Piancó","Picuí","Pilar","Pilões","Pilõezinhos","Pirpirituba","Pitimbu","Pocinhos","Poço Dantas","Poço de José de Moura","Pombal","Prata","Princesa Isabel","Puxinanã","Queimadas","Quixabá","Remígio","Riachão","Riachão do Bacamarte","Riachão do Poço","Riacho de Santo Antônio","Riacho dos Cavalos","Rio Tinto","Salgadinho","Salgado de São Félix","Santa Cecília","Santa Cruz","Santa Helena","Santa Inês","Santa Luzia","Santa Rita","Santa Teresinha","Santana de Mangueira","Santana dos Garrotes","Santarém","Santo André","São Bentinho","São Bento","São Domingos de Pombal","São Domingos do Cariri","São Francisco","São João do Cariri","São João do Rio do Peixe","São João do Tigre","São José da Lagoa Tapada","São José de Caiana","São José de Espinharas","São José de Piranhas","São José de Princesa","São José do Bonfim","São José do Brejo do Cruz","São José do Sabugi","São José dos Cordeiros","São José dos Ramos","São Mamede","São Miguel de Taipu","São Sebastião de Lagoa de Roça","São Sebastião do Umbuzeiro","Sapé","Seridó","Serra Branca","Serra da Raiz","Serra Grande","Serra Redonda","Serraria","Sertãozinho","Sobrado","Solânea","Soledade","Sossêgo","Sousa","Sumé","Taperoá","Tavares","Teixeira","Tenório","Triunfo","Uiraúna","Umbuzeiro","Várzea","Vieirópolis","Vista Serrana","Zabelê"]},{sigla:"PE",nome:"Pernambuco",cidades:["Abreu e Lima","Afogados da Ingazeira","Afrânio","Agrestina","Água Preta","Águas Belas","Alagoinha","Aliança","Altinho","Amaraji","Angelim","Araçoiaba","Araripina","Arcoverde","Barra de Guabiraba","Barreiros","Belém de Maria","Belém de São Francisco","Belo Jardim","Betânia","Bezerros","Bodocó","Bom Conselho","Bom Jardim","Bonito","Brejão","Brejinho","Brejo da Madre de Deus","Buenos Aires","Buíque","Cabo de Santo Agostinho","Cabrobó","Cachoeirinha","Caetés","Calçado","Calumbi","Camaragibe","Camocim de São Félix","Camutanga","Canhotinho","Capoeiras","Carnaíba","Carnaubeira da Penha","Carpina","Caruaru","Casinhas","Catende","Cedro","Chã de Alegria","Chã Grande","Condado","Correntes","Cortês","Cumaru","Cupira","Custódia","Dormentes","Escada","Exu","Feira Nova","Fernando de Noronha","Ferreiros","Flores","Floresta","Frei Miguelinho","Gameleira","Garanhuns","Glória do Goitá","Goiana","Granito","Gravatá","Iati","Ibimirim","Ibirajuba","Igarassu","Iguaraci","Inajá","Ingazeira","Ipojuca","Ipubi","Itacuruba","Itaíba","Itamaracá","Itambé","Itapetim","Itapissuma","Itaquitinga","Jaboatão dos Guararapes","Jaqueira","Jataúba","Jatobá","João Alfredo","Joaquim Nabuco","Jucati","Jupi","Jurema","Lagoa do Carro","Lagoa do Itaenga","Lagoa do Ouro","Lagoa dos Gatos","Lagoa Grande","Lajedo","Limoeiro","Macaparana","Machados","Manari","Maraial","Mirandiba","Moreilândia","Moreno","Nazaré da Mata","Olinda","Orobó","Orocó","Ouricuri","Palmares","Palmeirina","Panelas","Paranatama","Parnamirim","Passira","Paudalho","Paulista","Pedra","Pesqueira","Petrolândia","Petrolina","Poção","Pombos","Primavera","Quipapá","Quixaba","Recife","Riacho das Almas","Ribeirão","Rio Formoso","Sairé","Salgadinho","Salgueiro","Saloá","Sanharó","Santa Cruz","Santa Cruz da Baixa Verde","Santa Cruz do Capibaribe","Santa Filomena","Santa Maria da Boa Vista","Santa Maria do Cambucá","Santa Terezinha","São Benedito do Sul","São Bento do Una","São Caitano","São João","São Joaquim do Monte","São José da Coroa Grande","São José do Belmonte","São José do Egito","São Lourenço da Mata","São Vicente Ferrer","Serra Talhada","Serrita","Sertânia","Sirinhaém","Solidão","Surubim","Tabira","Tacaimbó","Tacaratu","Tamandaré","Taquaritinga do Norte","Terezinha","Terra Nova","Timbaúba","Toritama","Tracunhaém","Trindade","Triunfo","Tupanatinga","Tuparetama","Venturosa","Verdejante","Vertente do Lério","Vertentes","Vicência","Vitória de Santo Antão","Xexéu"]},{sigla:"PI",nome:"Piauí",cidades:["Acauã","Agricolândia","Água Branca","Alagoinha do Piauí","Alegrete do Piauí","Alto Longá","Altos","Alvorada do Gurguéia","Amarante","Angical do Piauí","Anísio de Abreu","Antônio Almeida","Aroazes","Arraial","Assunção do Piauí","Avelino Lopes","Baixa Grande do Ribeiro","Barra d'Alcântara","Barras","Barreiras do Piauí","Barro Duro","Batalha","Bela Vista do Piauí","Belém do Piauí","Beneditinos","Bertolínia","Betânia do Piauí","Boa Hora","Bocaina","Bom Jesus","Bom Princípio do Piauí","Bonfim do Piauí","Boqueirão do Piauí","Brasileira","Brejo do Piauí","Buriti dos Lopes","Buriti dos Montes","Cabeceiras do Piauí","Cajazeiras do Piauí","Cajueiro da Praia","Caldeirão Grande do Piauí","Campinas do Piauí","Campo Alegre do Fidalgo","Campo Grande do Piauí","Campo Largo do Piauí","Campo Maior","Canavieira","Canto do Buriti","Capitão de Campos","Capitão Gervásio Oliveira","Caracol","Caraúbas do Piauí","Caridade do Piauí","Castelo do Piauí","Caxingó","Cocal","Cocal de Telha","Cocal dos Alves","Coivaras","Colônia do Gurguéia","Colônia do Piauí","Conceição do Canindé","Coronel José Dias","Corrente","Cristalândia do Piauí","Cristino Castro","Curimatá","Currais","Curral Novo do Piauí","Curralinhos","Demerval Lobão","Dirceu Arcoverde","Dom Expedito Lopes","Dom Inocêncio","Domingos Mourão","Elesbão Veloso","Eliseu Martins","Esperantina","Fartura do Piauí","Flores do Piauí","Floresta do Piauí","Floriano","Francinópolis","Francisco Ayres","Francisco Macedo","Francisco Santos","Fronteiras","Geminiano","Gilbués","Guadalupe","Guaribas","Hugo Napoleão","Ilha Grande","Inhuma","Ipiranga do Piauí","Isaías Coelho","Itainópolis","Itaueira","Jacobina do Piauí","Jaicós","Jardim do Mulato","Jatobá do Piauí","Jerumenha","João Costa","Joaquim Pires","Joca Marques","José de Freitas","Juazeiro do Piauí","Júlio Borges","Jurema","Lagoa Alegre","Lagoa de São Francisco","Lagoa do Barro do Piauí","Lagoa do Piauí","Lagoa do Sítio","Lagoinha do Piauí","Landri Sales","Luís Correia","Luzilândia","Madeiro","Manoel Emídio","Marcolândia","Marcos Parente","Massapê do Piauí","Matias Olímpio","Miguel Alves","Miguel Leão","Milton Brandão","Monsenhor Gil","Monsenhor Hipólito","Monte Alegre do Piauí","Morro Cabeça no Tempo","Morro do Chapéu do Piauí","Murici dos Portelas","Nazaré do Piauí","Nossa Senhora de Nazaré","Nossa Senhora dos Remédios","Nova Santa Rita","Novo Oriente do Piauí","Novo Santo Antônio","Oeiras","Olho d'Água do Piauí","Padre Marcos","Paes Landim","Pajeú do Piauí","Palmeira do Piauí","Palmeirais","Paquetá","Parnaguá","Parnaíba","Passagem Franca do Piauí","Patos do Piauí","Pau d'Arco do Piauí","Paulistana","Pavussu","Pedro II","Pedro Laurentino","Picos","Pimenteiras","Pio IX","Piracuruca","Piripiri","Porto","Porto Alegre do Piauí","Prata do Piauí","Queimada Nova","Redenção do Gurguéia","Regeneração","Riacho Frio","Ribeira do Piauí","Ribeiro Gonçalves","Rio Grande do Piauí","Santa Cruz do Piauí","Santa Cruz dos Milagres","Santa Filomena","Santa Luz","Santa Rosa do Piauí","Santana do Piauí","Santo Antônio de Lisboa","Santo Antônio dos Milagres","Santo Inácio do Piauí","São Braz do Piauí","São Félix do Piauí","São Francisco de Assis do Piauí","São Francisco do Piauí","São Gonçalo do Gurguéia","São Gonçalo do Piauí","São João da Canabrava","São João da Fronteira","São João da Serra","São João da Varjota","São João do Arraial","São João do Piauí","São José do Divino","São José do Peixe","São José do Piauí","São Julião","São Lourenço do Piauí","São Luis do Piauí","São Miguel da Baixa Grande","São Miguel do Fidalgo","São Miguel do Tapuio","São Pedro do Piauí","São Raimundo Nonato","Sebastião Barros","Sebastião Leal","Sigefredo Pacheco","Simões","Simplício Mendes","Socorro do Piauí","Sussuapara","Tamboril do Piauí","Tanque do Piauí","Teresina","União","Uruçuí","Valença do Piauí","Várzea Branca","Várzea Grande","Vera Mendes","Vila Nova do Piauí","Wall Ferraz"]},{sigla:"PR",nome:"Paraná",cidades:["Abatiá","Adrianópolis","Agudos do Sul","Almirante Tamandaré","Altamira do Paraná","Alto Paraná","Alto Piquiri","Altônia","Alvorada do Sul","Amaporã","Ampére","Anahy","Andirá","Ângulo","Antonina","Antônio Olinto","Apucarana","Arapongas","Arapoti","Arapuã","Araruna","Araucária","Ariranha do Ivaí","Assaí","Assis Chateaubriand","Astorga","Atalaia","Balsa Nova","Bandeirantes","Barbosa Ferraz","Barra do Jacaré","Barracão","Bela Vista da Caroba","Bela Vista do Paraíso","Bituruna","Boa Esperança","Boa Esperança do Iguaçu","Boa Ventura de São Roque","Boa Vista da Aparecida","Bocaiúva do Sul","Bom Jesus do Sul","Bom Sucesso","Bom Sucesso do Sul","Borrazópolis","Braganey","Brasilândia do Sul","Cafeara","Cafelândia","Cafezal do Sul","Califórnia","Cambará","Cambé","Cambira","Campina da Lagoa","Campina do Simão","Campina Grande do Sul","Campo Bonito","Campo do Tenente","Campo Largo","Campo Magro","Campo Mourão","Cândido de Abreu","Candói","Cantagalo","Capanema","Capitão Leônidas Marques","Carambeí","Carlópolis","Cascavel","Castro","Catanduvas","Centenário do Sul","Cerro Azul","Céu Azul","Chopinzinho","Cianorte","Cidade Gaúcha","Clevelândia","Colombo","Colorado","Congonhinhas","Conselheiro Mairinck","Contenda","Corbélia","Cornélio Procópio","Coronel Domingos Soares","Coronel Vivida","Corumbataí do Sul","Cruz Machado","Cruzeiro do Iguaçu","Cruzeiro do Oeste","Cruzeiro do Sul","Cruzmaltina","Curitiba","Curiúva","Diamante d'Oeste","Diamante do Norte","Diamante do Sul","Dois Vizinhos","Douradina","Doutor Camargo","Doutor Ulysses","Enéas Marques","Engenheiro Beltrão","Entre Rios do Oeste","Esperança Nova","Espigão Alto do Iguaçu","Farol","Faxinal","Fazenda Rio Grande","Fênix","Fernandes Pinheiro","Figueira","Flor da Serra do Sul","Floraí","Floresta","Florestópolis","Flórida","Formosa do Oeste","Foz do Iguaçu","Foz do Jordão","Francisco Alves","Francisco Beltrão","General Carneiro","Godoy Moreira","Goioerê","Goioxim","Grandes Rios","Guaíra","Guairaçá","Guamiranga","Guapirama","Guaporema","Guaraci","Guaraniaçu","Guarapuava","Guaraqueçaba","Guaratuba","Honório Serpa","Ibaiti","Ibema","Ibiporã","Icaraíma","Iguaraçu","Iguatu","Imbaú","Imbituva","Inácio Martins","Inajá","Indianópolis","Ipiranga","Iporã","Iracema do Oeste","Irati","Iretama","Itaguajé","Itaipulândia","Itambaracá","Itambé","Itapejara d'Oeste","Itaperuçu","Itaúna do Sul","Ivaí","Ivaiporã","Ivaté","Ivatuba","Jaboti","Jacarezinho","Jaguapitã","Jaguariaíva","Jandaia do Sul","Janiópolis","Japira","Japurá","Jardim Alegre","Jardim Olinda","Jataizinho","Jesuítas","Joaquim Távora","Jundiaí do Sul","Juranda","Jussara","Kaloré","Lapa","Laranjal","Laranjeiras do Sul","Leópolis","Lidianópolis","Lindoeste","Loanda","Lobato","Londrina","Luiziana","Lunardelli","Lupionópolis","Mallet","Mamborê","Mandaguaçu","Mandaguari","Mandirituba","Manfrinópolis","Mangueirinha","Manoel Ribas","Marechal Cândido Rondon","Maria Helena","Marialva","Marilândia do Sul","Marilena","Mariluz","Maringá","Mariópolis","Maripá","Marmeleiro","Marquinho","Marumbi","Matelândia","Matinhos","Mato Rico","Mauá da Serra","Medianeira","Mercedes","Mirador","Miraselva","Missal","Moreira Sales","Morretes","Munhoz de Melo","Nossa Senhora das Graças","Nova Aliança do Ivaí","Nova América da Colina","Nova Aurora","Nova Cantu","Nova Esperança","Nova Esperança do Sudoeste","Nova Fátima","Nova Laranjeiras","Nova Londrina","Nova Olímpia","Nova Prata do Iguaçu","Nova Santa Bárbara","Nova Santa Rosa","Nova Tebas","Novo Itacolomi","Ortigueira","Ourizona","Ouro Verde do Oeste","Paiçandu","Palmas","Palmeira","Palmital","Palotina","Paraíso do Norte","Paranacity","Paranaguá","Paranapoema","Paranavaí","Pato Bragado","Pato Branco","Paula Freitas","Paulo Frontin","Peabiru","Perobal","Pérola","Pérola d'Oeste","Piên","Pinhais","Pinhal de São Bento","Pinhalão","Pinhão","Piraí do Sul","Piraquara","Pitanga","Pitangueiras","Planaltina do Paraná","Planalto","Ponta Grossa","Pontal do Paraná","Porecatu","Porto Amazonas","Porto Barreiro","Porto Rico","Porto Vitória","Prado Ferreira","Pranchita","Presidente Castelo Branco","Primeiro de Maio","Prudentópolis","Quarto Centenário","Quatiguá","Quatro Barras","Quatro Pontes","Quedas do Iguaçu","Querência do Norte","Quinta do Sol","Quitandinha","Ramilândia","Rancho Alegre","Rancho Alegre d'Oeste","Realeza","Rebouças","Renascença","Reserva","Reserva do Iguaçu","Ribeirão Claro","Ribeirão do Pinhal","Rio Azul","Rio Bom","Rio Bonito do Iguaçu","Rio Branco do Ivaí","Rio Branco do Sul","Rio Negro","Rolândia","Roncador","Rondon","Rosário do Ivaí","Sabáudia","Salgado Filho","Salto do Itararé","Salto do Lontra","Santa Amélia","Santa Cecília do Pavão","Santa Cruz Monte Castelo","Santa Fé","Santa Helena","Santa Inês","Santa Isabel do Ivaí","Santa Izabel do Oeste","Santa Lúcia","Santa Maria do Oeste","Santa Mariana","Santa Mônica","Santa Tereza do Oeste","Santa Terezinha de Itaipu","Santana do Itararé","Santo Antônio da Platina","Santo Antônio do Caiuá","Santo Antônio do Paraíso","Santo Antônio do Sudoeste","Santo Inácio","São Carlos do Ivaí","São Jerônimo da Serra","São João","São João do Caiuá","São João do Ivaí","São João do Triunfo","São Jorge d'Oeste","São Jorge do Ivaí","São Jorge do Patrocínio","São José da Boa Vista","São José das Palmeiras","São José dos Pinhais","São Manoel do Paraná","São Mateus do Sul","São Miguel do Iguaçu","São Pedro do Iguaçu","São Pedro do Ivaí","São Pedro do Paraná","São Sebastião da Amoreira","São Tomé","Sapopema","Sarandi","Saudade do Iguaçu","Sengés","Serranópolis do Iguaçu","Sertaneja","Sertanópolis","Siqueira Campos","Sulina","Tamarana","Tamboara","Tapejara","Tapira","Teixeira Soares","Telêmaco Borba","Terra Boa","Terra Rica","Terra Roxa","Tibagi","Tijucas do Sul","Toledo","Tomazina","Três Barras do Paraná","Tunas do Paraná","Tuneiras do Oeste","Tupãssi","Turvo","Ubiratã","Umuarama","União da Vitória","Uniflor","Uraí","Ventania","Vera Cruz do Oeste","Verê","Vila Alta","Virmond","Vitorino","Wenceslau Braz","Xambrê"]},{sigla:"RJ",nome:"Rio de Janeiro",cidades:["Angra dos Reis","Aperibé","Araruama","Areal","Armação de Búzios","Arraial do Cabo","Barra do Piraí","Barra Mansa","Belford Roxo","Bom Jardim","Bom Jesus do Itabapoana","Cabo Frio","Cachoeiras de Macacu","Cambuci","Campos dos Goytacazes","Cantagalo","Carapebus","Cardoso Moreira","Carmo","Casimiro de Abreu","Comendador Levy Gasparian","Conceição de Macabu","Cordeiro","Duas Barras","Duque de Caxias","Engenheiro Paulo de Frontin","Guapimirim","Iguaba Grande","Itaboraí","Itaguaí","Italva","Itaocara","Itaperuna","Itatiaia","Japeri","Laje do Muriaé","Macaé","Macuco","Magé","Mangaratiba","Maricá","Mendes","Mesquita","Miguel Pereira","Miracema","Natividade","Nilópolis","Niterói","Nova Friburgo","Nova Iguaçu","Paracambi","Paraíba do Sul","Parati","Paty do Alferes","Petrópolis","Pinheiral","Piraí","Porciúncula","Porto Real","Quatis","Queimados","Quissamã","Resende","Rio Bonito","Rio Claro","Rio das Flores","Rio das Ostras","Rio de Janeiro","Santa Maria Madalena","Santo Antônio de Pádua","São Fidélis","São Francisco de Itabapoana","São Gonçalo","São João da Barra","São João de Meriti","São José de Ubá","São José do Vale do Rio Preto","São Pedro da Aldeia","São Sebastião do Alto","Sapucaia","Saquarema","Seropédica","Silva Jardim","Sumidouro","Tanguá","Teresópolis","Trajano de Morais","Três Rios","Valença","Varre-Sai","Vassouras","Volta Redonda"]},{sigla:"RN",nome:"Rio Grande do Norte",cidades:["Acari","Açu","Afonso Bezerra","Água Nova","Alexandria","Almino Afonso","Alto do Rodrigues","Angicos","Antônio Martins","Apodi","Areia Branca","Arês","Augusto Severo","Baía Formosa","Baraúna","Barcelona","Bento Fernandes","Bodó","Bom Jesus","Brejinho","Caiçara do Norte","Caiçara do Rio do Vento","Caicó","Campo Redondo","Canguaretama","Caraúbas","Carnaúba dos Dantas","Carnaubais","Ceará-Mirim","Cerro Corá","Coronel Ezequiel","Coronel João Pessoa","Cruzeta","Currais Novos","Doutor Severiano","Encanto","Equador","Espírito Santo","Extremoz","Felipe Guerra","Fernando Pedroza","Florânia","Francisco Dantas","Frutuoso Gomes","Galinhos","Goianinha","Governador Dix-Sept Rosado","Grossos","Guamaré","Ielmo Marinho","Ipanguaçu","Ipueira","Itajá","Itaú","Jaçanã","Jandaíra","Janduís","Januário Cicco","Japi","Jardim de Angicos","Jardim de Piranhas","Jardim do Seridó","João Câmara","João Dias","José da Penha","Jucurutu","Jundiá","Lagoa d'Anta","Lagoa de Pedras","Lagoa de Velhos","Lagoa Nova","Lagoa Salgada","Lajes","Lajes Pintadas","Lucrécia","Luís Gomes","Macaíba","Macau","Major Sales","Marcelino Vieira","Martins","Maxaranguape","Messias Targino","Montanhas","Monte Alegre","Monte das Gameleiras","Mossoró","Natal","Nísia Floresta","Nova Cruz","Olho-d'Água do Borges","Ouro Branco","Paraná","Paraú","Parazinho","Parelhas","Parnamirim","Passa e Fica","Passagem","Patu","Pau dos Ferros","Pedra Grande","Pedra Preta","Pedro Avelino","Pedro Velho","Pendências","Pilões","Poço Branco","Portalegre","Porto do Mangue","Presidente Juscelino","Pureza","Rafael Fernandes","Rafael Godeiro","Riacho da Cruz","Riacho de Santana","Riachuelo","Rio do Fogo","Rodolfo Fernandes","Ruy Barbosa","Santa Cruz","Santa Maria","Santana do Matos","Santana do Seridó","Santo Antônio","São Bento do Norte","São Bento do Trairí","São Fernando","São Francisco do Oeste","São Gonçalo do Amarante","São João do Sabugi","São José de Mipibu","São José do Campestre","São José do Seridó","São Miguel","São Miguel de Touros","São Paulo do Potengi","São Pedro","São Rafael","São Tomé","São Vicente","Senador Elói de Souza","Senador Georgino Avelino","Serra de São Bento","Serra do Mel","Serra Negra do Norte","Serrinha","Serrinha dos Pintos","Severiano Melo","Sítio Novo","Taboleiro Grande","Taipu","Tangará","Tenente Ananias","Tenente Laurentino Cruz","Tibau","Tibau do Sul","Timbaúba dos Batistas","Touros","Triunfo Potiguar","Umarizal","Upanema","Várzea","Venha-Ver","Vera Cruz","Viçosa","Vila Flor"]},{sigla:"RO",nome:"Rondônia",cidades:["Alta Floresta d'Oeste","Alto Alegre do Parecis","Alto Paraíso","Alvorada d'Oeste","Ariquemes","Buritis","Cabixi","Cacaulândia","Cacoal","Campo Novo de Rondônia","Candeias do Jamari","Castanheiras","Cerejeiras","Chupinguaia","Colorado do Oeste","Corumbiara","Costa Marques","Cujubim","Espigão d'Oeste","Governador Jorge Teixeira","Guajará-Mirim","Itapuã do Oeste","Jaru","Ji-Paraná","Machadinho d'Oeste","Ministro Andreazza","Mirante da Serra","Monte Negro","Nova Brasilândia d'Oeste","Nova Mamoré","Nova União","Novo Horizonte do Oeste","Ouro Preto do Oeste","Parecis","Pimenta Bueno","Pimenteiras do Oeste","Porto Velho","Presidente Médici","Primavera de Rondônia","Rio Crespo","Rolim de Moura","Santa Luzia d'Oeste","São Felipe d'Oeste","São Francisco do Guaporé","São Miguel do Guaporé","Seringueiras","Teixeirópolis","Theobroma","Urupá","Vale do Anari","Vale do Paraíso","Vilhena"]},{sigla:"RR",nome:"Roraima",cidades:["Alto Alegre","Amajari","Boa Vista","Bonfim","Cantá","Caracaraí","Caroebe","Iracema","Mucajaí","Normandia","Pacaraima","Rorainópolis","São João da Baliza","São Luiz","Uiramutã"]},{sigla:"RS",nome:"Rio Grande do Sul",cidades:["Aceguá","Água Santa","Agudo","Ajuricaba","Alecrim","Alegrete","Alegria","Almirante Tamandaré do Sul","Alpestre","Alto Alegre","Alto Feliz","Alvorada","Amaral Ferrador","Ametista do Sul","André da Rocha","Anta Gorda","Antônio Prado","Arambaré","Araricá","Aratiba","Arroio do Meio","Arroio do Padre","Arroio do Sal","Arroio do Tigre","Arroio dos Ratos","Arroio Grande","Arvorezinha","Augusto Pestana","Áurea","Bagé","Balneário Pinhal","Barão","Barão de Cotegipe","Barão do Triunfo","Barra do Guarita","Barra do Quaraí","Barra do Ribeiro","Barra do Rio Azul","Barra Funda","Barracão","Barros Cassal","Benjamin Constan do Sul","Bento Gonçalves","Boa Vista das Missões","Boa Vista do Buricá","Boa Vista do Cadeado","Boa Vista do Incra","Boa Vista do Sul","Bom Jesus","Bom Princípio","Bom Progresso","Bom Retiro do Sul","Boqueirão do Leão","Bossoroca","Bozano","Braga","Brochier","Butiá","Caçapava do Sul","Cacequi","Cachoeira do Sul","Cachoeirinha","Cacique Doble","Caibaté","Caiçara","Camaquã","Camargo","Cambará do Sul","Campestre da Serra","Campina das Missões","Campinas do Sul","Campo Bom","Campo Novo","Campos Borges","Candelária","Cândido Godói","Candiota","Canela","Canguçu","Canoas","Canudos do Vale","Capão Bonito do Sul","Capão da Canoa","Capão do Cipó","Capão do Leão","Capela de Santana","Capitão","Capivari do Sul","Caraá","Carazinho","Carlos Barbosa","Carlos Gomes","Casca","Caseiros","Catuípe","Caxias do Sul","Centenário","Cerrito","Cerro Branco","Cerro Grande","Cerro Grande do Sul","Cerro Largo","Chapada","Charqueadas","Charrua","Chiapeta","Chuí","Chuvisca","Cidreira","Ciríaco","Colinas","Colorado","Condor","Constantina","Coqueiro Baixo","Coqueiros do Sul","Coronel Barros","Coronel Bicaco","Coronel Pilar","Cotiporã","Coxilha","Crissiumal","Cristal","Cristal do Sul","Cruz Alta","Cruzaltense","Cruzeiro do Sul","David Canabarro","Derrubadas","Dezesseis de Novembro","Dilermando de Aguiar","Dois Irmãos","Dois Irmãos das Missões","Dois Lajeados","Dom Feliciano","Dom Pedrito","Dom Pedro de Alcântara","Dona Francisca","Doutor Maurício Cardoso","Doutor Ricardo","Eldorado do Sul","Encantado","Encruzilhada do Sul","Engenho Velho","Entre Rios do Sul","Entre-Ijuís","Erebango","Erechim","Ernestina","Erval Grande","Erval Seco","Esmeralda","Esperança do Sul","Espumoso","Estação","Estância Velha","Esteio","Estrela","Estrela Velha","Eugênio de Castro","Fagundes Varela","Farroupilha","Faxinal do Soturno","Faxinalzinho","Fazenda Vilanova","Feliz","Flores da Cunha","Floriano Peixoto","Fontoura Xavier","Formigueiro","Forquetinha","Fortaleza dos Valos","Frederico Westphalen","Garibaldi","Garruchos","Gaurama","General Câmara","Gentil","Getúlio Vargas","Giruá","Glorinha","Gramado","Gramado dos Loureiros","Gramado Xavier","Gravataí","Guabiju","Guaíba","Guaporé","Guarani das Missões","Harmonia","Herval","Herveiras","Horizontina","Hulha Negra","Humaitá","Ibarama","Ibiaçá","Ibiraiaras","Ibirapuitã","Ibirubá","Igrejinha","Ijuí","Ilópolis","Imbé","Imigrante","Independência","Inhacorá","Ipê","Ipiranga do Sul","Iraí","Itaara","Itacurubi","Itapuca","Itaqui","Itati","Itatiba do Sul","Ivorá","Ivoti","Jaboticaba","Jacuizinho","Jacutinga","Jaguarão","Jaguari","Jaquirana","Jari","Jóia","Júlio de Castilhos","Lagoa Bonita do Sul","Lagoa dos Três Cantos","Lagoa Vermelha","Lagoão","Lajeado","Lajeado do Bugre","Lavras do Sul","Liberato Salzano","Lindolfo Collor","Linha Nova","Maçambara","Machadinho","Mampituba","Manoel Viana","Maquiné","Maratá","Marau","Marcelino Ramos","Mariana Pimentel","Mariano Moro","Marques de Souza","Mata","Mato Castelhano","Mato Leitão","Mato Queimado","Maximiliano de Almeida","Minas do Leão","Miraguaí","Montauri","Monte Alegre dos Campos","Monte Belo do Sul","Montenegro","Mormaço","Morrinhos do Sul","Morro Redondo","Morro Reuter","Mostardas","Muçum","Muitos Capões","Muliterno","Não-Me-Toque","Nicolau Vergueiro","Nonoai","Nova Alvorada","Nova Araçá","Nova Bassano","Nova Boa Vista","Nova Bréscia","Nova Candelária","Nova Esperança do Sul","Nova Hartz","Nova Pádua","Nova Palma","Nova Petrópolis","Nova Prata","Nova Ramada","Nova Roma do Sul","Nova Santa Rita","Novo Barreiro","Novo Cabrais","Novo Hamburgo","Novo Machado","Novo Tiradentes","Novo Xingu","Osório","Paim Filho","Palmares do Sul","Palmeira das Missões","Palmitinho","Panambi","Pântano Grande","Paraí","Paraíso do Sul","Pareci Novo","Parobé","Passa Sete","Passo do Sobrado","Passo Fundo","Paulo Bento","Paverama","Pedras Altas","Pedro Osório","Pejuçara","Pelotas","Picada Café","Pinhal","Pinhal da Serra","Pinhal Grande","Pinheirinho do Vale","Pinheiro Machado","Pirapó","Piratini","Planalto","Poço das Antas","Pontão","Ponte Preta","Portão","Porto Alegre","Porto Lucena","Porto Mauá","Porto Vera Cruz","Porto Xavier","Pouso Novo","Presidente Lucena","Progresso","Protásio Alves","Putinga","Quaraí","Quatro Irmãos","Quevedos","Quinze de Novembro","Redentora","Relvado","Restinga Seca","Rio dos Índios","Rio Grande","Rio Pardo","Riozinho","Roca Sales","Rodeio Bonito","Rolador","Rolante","Ronda Alta","Rondinha","Roque Gonzales","Rosário do Sul","Sagrada Família","Saldanha Marinho","Salto do Jacuí","Salvador das Missões","Salvador do Sul","Sananduva","Santa Bárbara do Sul","Santa Cecília do Sul","Santa Clara do Sul","Santa Cruz do Sul","Santa Margarida do Sul","Santa Maria","Santa Maria do Herval","Santa Rosa","Santa Tereza","Santa Vitória do Palmar","Santana da Boa Vista","Santana do Livramento","Santiago","Santo Ângelo","Santo Antônio da Patrulha","Santo Antônio das Missões","Santo Antônio do Palma","Santo Antônio do Planalto","Santo Augusto","Santo Cristo","Santo Expedito do Sul","São Borja","São Domingos do Sul","São Francisco de Assis","São Francisco de Paula","São Gabriel","São Jerônimo","São João da Urtiga","São João do Polêsine","São Jorge","São José das Missões","São José do Herval","São José do Hortêncio","São José do Inhacorá","São José do Norte","São José do Ouro","São José do Sul","São José dos Ausentes","São Leopoldo","São Lourenço do Sul","São Luiz Gonzaga","São Marcos","São Martinho","São Martinho da Serra","São Miguel das Missões","São Nicolau","São Paulo das Missões","São Pedro da Serra","São Pedro das Missões","São Pedro do Butiá","São Pedro do Sul","São Sebastião do Caí","São Sepé","São Valentim","São Valentim do Sul","São Valério do Sul","São Vendelino","São Vicente do Sul","Sapiranga","Sapucaia do Sul","Sarandi","Seberi","Sede Nova","Segredo","Selbach","Senador Salgado Filho","Sentinela do Sul","Serafina Corrêa","Sério","Sertão","Sertão Santana","Sete de Setembro","Severiano de Almeida","Silveira Martins","Sinimbu","Sobradinho","Soledade","Tabaí","Tapejara","Tapera","Tapes","Taquara","Taquari","Taquaruçu do Sul","Tavares","Tenente Portela","Terra de Areia","Teutônia","Tio Hugo","Tiradentes do Sul","Toropi","Torres","Tramandaí","Travesseiro","Três Arroios","Três Cachoeiras","Três Coroas","Três de Maio","Três Forquilhas","Três Palmeiras","Três Passos","Trindade do Sul","Triunfo","Tucunduva","Tunas","Tupanci do Sul","Tupanciretã","Tupandi","Tuparendi","Turuçu","Ubiretama","União da Serra","Unistalda","Uruguaiana","Vacaria","Vale do Sol","Vale Real","Vale Verde","Vanini","Venâncio Aires","Vera Cruz","Veranópolis","Vespasiano Correa","Viadutos","Viamão","Vicente Dutra","Victor Graeff","Vila Flores","Vila Lângaro","Vila Maria","Vila Nova do Sul","Vista Alegre","Vista Alegre do Prata","Vista Gaúcha","Vitória das Missões","Westfália","Xangri-lá"]},{sigla:"SC",nome:"Santa Catarina",cidades:["Abdon Batista","Abelardo Luz","Agrolândia","Agronômica","Água Doce","Águas de Chapecó","Águas Frias","Águas Mornas","Alfredo Wagner","Alto Bela Vista","Anchieta","Angelina","Anita Garibaldi","Anitápolis","Antônio Carlos","Apiúna","Arabutã","Araquari","Araranguá","Armazém","Arroio Trinta","Arvoredo","Ascurra","Atalanta","Aurora","Balneário Arroio do Silva","Balneário Barra do Sul","Balneário Camboriú","Balneário Gaivota","Bandeirante","Barra Bonita","Barra Velha","Bela Vista do Toldo","Belmonte","Benedito Novo","Biguaçu","Blumenau","Bocaina do Sul","Bom Jardim da Serra","Bom Jesus","Bom Jesus do Oeste","Bom Retiro","Bombinhas","Botuverá","Braço do Norte","Braço do Trombudo","Brunópolis","Brusque","Caçador","Caibi","Calmon","Camboriú","Campo Alegre","Campo Belo do Sul","Campo Erê","Campos Novos","Canelinha","Canoinhas","Capão Alto","Capinzal","Capivari de Baixo","Catanduvas","Caxambu do Sul","Celso Ramos","Cerro Negro","Chapadão do Lageado","Chapecó","Cocal do Sul","Concórdia","Cordilheira Alta","Coronel Freitas","Coronel Martins","Correia Pinto","Corupá","Criciúma","Cunha Porã","Cunhataí","Curitibanos","Descanso","Dionísio Cerqueira","Dona Emma","Doutor Pedrinho","Entre Rios","Ermo","Erval Velho","Faxinal dos Guedes","Flor do Sertão","Florianópolis","Formosa do Sul","Forquilhinha","Fraiburgo","Frei Rogério","Galvão","Garopaba","Garuva","Gaspar","Governador Celso Ramos","Grão Pará","Gravatal","Guabiruba","Guaraciaba","Guaramirim","Guarujá do Sul","Guatambú","Herval d'Oeste","Ibiam","Ibicaré","Ibirama","Içara","Ilhota","Imaruí","Imbituba","Imbuia","Indaial","Iomerê","Ipira","Iporã do Oeste","Ipuaçu","Ipumirim","Iraceminha","Irani","Irati","Irineópolis","Itá","Itaiópolis","Itajaí","Itapema","Itapiranga","Itapoá","Ituporanga","Jaborá","Jacinto Machado","Jaguaruna","Jaraguá do Sul","Jardinópolis","Joaçaba","Joinville","José Boiteux","Jupiá","Lacerdópolis","Lages","Laguna","Lajeado Grande","Laurentino","Lauro Muller","Lebon Régis","Leoberto Leal","Lindóia do Sul","Lontras","Luiz Alves","Luzerna","Macieira","Mafra","Major Gercino","Major Vieira","Maracajá","Maravilha","Marema","Massaranduba","Matos Costa","Meleiro","Mirim Doce","Modelo","Mondaí","Monte Carlo","Monte Castelo","Morro da Fumaça","Morro Grande","Navegantes","Nova Erechim","Nova Itaberaba","Nova Trento","Nova Veneza","Novo Horizonte","Orleans","Otacílio Costa","Ouro","Ouro Verde","Paial","Painel","Palhoça","Palma Sola","Palmeira","Palmitos","Papanduva","Paraíso","Passo de Torres","Passos Maia","Paulo Lopes","Pedras Grandes","Penha","Peritiba","Petrolândia","Piçarras","Pinhalzinho","Pinheiro Preto","Piratuba","Planalto Alegre","Pomerode","Ponte Alta","Ponte Alta do Norte","Ponte Serrada","Porto Belo","Porto União","Pouso Redondo","Praia Grande","Presidente Castelo Branco","Presidente Getúlio","Presidente Nereu","Princesa","Quilombo","Rancho Queimado","Rio das Antas","Rio do Campo","Rio do Oeste","Rio do Sul","Rio dos Cedros","Rio Fortuna","Rio Negrinho","Rio Rufino","Riqueza","Rodeio","Romelândia","Salete","Saltinho","Salto Veloso","Sangão","Santa Cecília","Santa Helena","Santa Rosa de Lima","Santa Rosa do Sul","Santa Terezinha","Santa Terezinha do Progresso","Santiago do Sul","Santo Amaro da Imperatriz","São Bento do Sul","São Bernardino","São Bonifácio","São Carlos","São Cristovão do Sul","São Domingos","São Francisco do Sul","São João Batista","São João do Itaperiú","São João do Oeste","São João do Sul","São Joaquim","São José","São José do Cedro","São José do Cerrito","São Lourenço do Oeste","São Ludgero","São Martinho","São Miguel da Boa Vista","São Miguel do Oeste","São Pedro de Alcântara","Saudades","Schroeder","Seara","Serra Alta","Siderópolis","Sombrio","Sul Brasil","Taió","Tangará","Tigrinhos","Tijucas","Timbé do Sul","Timbó","Timbó Grande","Três Barras","Treviso","Treze de Maio","Treze Tílias","Trombudo Central","Tubarão","Tunápolis","Turvo","União do Oeste","Urubici","Urupema","Urussanga","Vargeão","Vargem","Vargem Bonita","Vidal Ramos","Videira","Vitor Meireles","Witmarsum","Xanxerê","Xavantina","Xaxim","Zortéa"]},{sigla:"SE",nome:"Sergipe",cidades:["Amparo de São Francisco","Aquidabã","Aracaju","Arauá","Areia Branca","Barra dos Coqueiros","Boquim","Brejo Grande","Campo do Brito","Canhoba","Canindé de São Francisco","Capela","Carira","Carmópolis","Cedro de São João","Cristinápolis","Cumbe","Divina Pastora","Estância","Feira Nova","Frei Paulo","Gararu","General Maynard","Gracho Cardoso","Ilha das Flores","Indiaroba","Itabaiana","Itabaianinha","Itabi","Itaporanga d'Ajuda","Japaratuba","Japoatã","Lagarto","Laranjeiras","Macambira","Malhada dos Bois","Malhador","Maruim","Moita Bonita","Monte Alegre de Sergipe","Muribeca","Neópolis","Nossa Senhora Aparecida","Nossa Senhora da Glória","Nossa Senhora das Dores","Nossa Senhora de Lourdes","Nossa Senhora do Socorro","Pacatuba","Pedra Mole","Pedrinhas","Pinhão","Pirambu","Poço Redondo","Poço Verde","Porto da Folha","Propriá","Riachão do Dantas","Riachuelo","Ribeirópolis","Rosário do Catete","Salgado","Santa Luzia do Itanhy","Santa Rosa de Lima","Santana do São Francisco","Santo Amaro das Brotas","São Cristóvão","São Domingos","São Francisco","São Miguel do Aleixo","Simão Dias","Siriri","Telha","Tobias Barreto","Tomar do Geru","Umbaúba"]},{sigla:"SP",nome:"São Paulo",cidades:["Adamantina","Adolfo","Aguaí","Águas da Prata","Águas de Lindóia","Águas de Santa Bárbara","Águas de São Pedro","Agudos","Alambari","Alfredo Marcondes","Altair","Altinópolis","Alto Alegre","Alumínio","Álvares Florence","Álvares Machado","Álvaro de Carvalho","Alvinlândia","Americana","Américo Brasiliense","Américo de Campos","Amparo","Analândia","Andradina","Angatuba","Anhembi","Anhumas","Aparecida","Aparecida d'Oeste","Apiaí","Araçariguama","Araçatuba","Araçoiaba da Serra","Aramina","Arandu","Arapeí","Araraquara","Araras","Arco-Íris","Arealva","Areias","Areiópolis","Ariranha","Artur Nogueira","Arujá","Aspásia","Assis","Atibaia","Auriflama","Avaí","Avanhandava","Avaré","Bady Bassitt","Balbinos","Bálsamo","Bananal","Barão de Antonina","Barbosa","Bariri","Barra Bonita","Barra do Chapéu","Barra do Turvo","Barretos","Barrinha","Barueri","Bastos","Batatais","Bauru","Bebedouro","Bento de Abreu","Bernardino de Campos","Bertioga","Bilac","Birigui","Biritiba-Mirim","Boa Esperança do Sul","Bocaina","Bofete","Boituva","Bom Jesus dos Perdões","Bom Sucesso de Itararé","Borá","Boracéia","Borborema","Borebi","Botucatu","Bragança Paulista","Braúna","Brejo Alegre","Brodowski","Brotas","Buri","Buritama","Buritizal","Cabrália Paulista","Cabreúva","Caçapava","Cachoeira Paulista","Caconde","Cafelândia","Caiabu","Caieiras","Caiuá","Cajamar","Cajati","Cajobi","Cajuru","Campina do Monte Alegre","Campinas","Campo Limpo Paulista","Campos do Jordão","Campos Novos Paulista","Cananéia","Canas","Cândido Mota","Cândido Rodrigues","Canitar","Capão Bonito","Capela do Alto","Capivari","Caraguatatuba","Carapicuíba","Cardoso","Casa Branca","Cássia dos Coqueiros","Castilho","Catanduva","Catiguá","Cedral","Cerqueira César","Cerquilho","Cesário Lange","Charqueada","Chavantes","Clementina","Colina","Colômbia","Conchal","Conchas","Cordeirópolis","Coroados","Coronel Macedo","Corumbataí","Cosmópolis","Cosmorama","Cotia","Cravinhos","Cristais Paulista","Cruzália","Cruzeiro","Cubatão","Cunha","Descalvado","Diadema","Dirce Reis","Divinolândia","Dobrada","Dois Córregos","Dolcinópolis","Dourado","Dracena","Duartina","Dumont","Echaporã","Eldorado","Elias Fausto","Elisiário","Embaúba","Embu","Embu-Guaçu","Emilianópolis","Engenheiro Coelho","Espírito Santo do Pinhal","Espírito Santo do Turvo","Estiva Gerbi","Estrela d'Oeste","Estrela do Norte","Euclides da Cunha Paulista","Fartura","Fernando Prestes","Fernandópolis","Fernão","Ferraz de Vasconcelos","Flora Rica","Floreal","Florínia","Flórida Paulista","Franca","Francisco Morato","Franco da Rocha","Gabriel Monteiro","Gália","Garça","Gastão Vidigal","Gavião Peixoto","General Salgado","Getulina","Glicério","Guaiçara","Guaimbê","Guaíra","Guapiaçu","Guapiara","Guará","Guaraçaí","Guaraci","Guarani d'Oeste","Guarantã","Guararapes","Guararema","Guaratinguetá","Guareí","Guariba","Guarujá","Guarulhos","Guatapará","Guzolândia","Herculândia","Holambra","Hortolândia","Iacanga","Iacri","Iaras","Ibaté","Ibirá","Ibirarema","Ibitinga","Ibiúna","Icém","Iepê","Igaraçu do Tietê","Igarapava","Igaratá","Iguape","Ilha Comprida","Ilha Solteira","Ilhabela","Indaiatuba","Indiana","Indiaporã","Inúbia Paulista","Ipauçu","Iperó","Ipeúna","Ipiguá","Iporanga","Ipuã","Iracemápolis","Irapuã","Irapuru","Itaberá","Itaí","Itajobi","Itaju","Itanhaém","Itaóca","Itapecerica da Serra","Itapetininga","Itapeva","Itapevi","Itapira","Itapirapuã Paulista","Itápolis","Itaporanga","Itapuí","Itapura","Itaquaquecetuba","Itararé","Itariri","Itatiba","Itatinga","Itirapina","Itirapuã","Itobi","Itu","Itupeva","Ituverava","Jaborandi","Jaboticabal","Jacareí","Jaci","Jacupiranga","Jaguariúna","Jales","Jambeiro","Jandira","Jardinópolis","Jarinu","Jaú","Jeriquara","Joanópolis","João Ramalho","José Bonifácio","Júlio Mesquita","Jumirim","Jundiaí","Junqueirópolis","Juquiá","Juquitiba","Lagoinha","Laranjal Paulista","Lavínia","Lavrinhas","Leme","Lençóis Paulista","Limeira","Lindóia","Lins","Lorena","Lourdes","Louveira","Lucélia","Lucianópolis","Luís Antônio","Luiziânia","Lupércio","Lutécia","Macatuba","Macaubal","Macedônia","Magda","Mairinque","Mairiporã","Manduri","Marabá Paulista","Maracaí","Marapoama","Mariápolis","Marília","Marinópolis","Martinópolis","Matão","Mauá","Mendonça","Meridiano","Mesópolis","Miguelópolis","Mineiros do Tietê","Mira Estrela","Miracatu","Mirandópolis","Mirante do Paranapanema","Mirassol","Mirassolândia","Mococa","Mogi das Cruzes","Mogi-Guaçu","Mogi-Mirim","Mombuca","Monções","Mongaguá","Monte Alegre do Sul","Monte Alto","Monte Aprazível","Monte Azul Paulista","Monte Castelo","Monte Mor","Monteiro Lobato","Morro Agudo","Morungaba","Motuca","Murutinga do Sul","Nantes","Narandiba","Natividade da Serra","Nazaré Paulista","Neves Paulista","Nhandeara","Nipoã","Nova Aliança","Nova Campina","Nova Canaã Paulista","Nova Castilho","Nova Europa","Nova Granada","Nova Guataporanga","Nova Independência","Nova Luzitânia","Nova Odessa","Novais","Novo Horizonte","Nuporanga","Ocauçu","Óleo","Olímpia","Onda Verde","Oriente","Orindiúva","Orlândia","Osasco","Oscar Bressane","Osvaldo Cruz","Ourinhos","Ouro Verde","Ouroeste","Pacaembu","Palestina","Palmares Paulista","Palmeira d'Oeste","Palmital","Panorama","Paraguaçu Paulista","Paraibuna","Paraíso","Paranapanema","Paranapuã","Parapuã","Pardinho","Pariquera-Açu","Parisi","Patrocínio Paulista","Paulicéia","Paulínia","Paulistânia","Paulo de Faria","Pederneiras","Pedra Bela","Pedranópolis","Pedregulho","Pedreira","Pedrinhas Paulista","Pedro de Toledo","Penápolis","Pereira Barreto","Pereiras","Peruíbe","Piacatu","Piedade","Pilar do Sul","Pindamonhangaba","Pindorama","Pinhalzinho","Piquerobi","Piquete","Piracaia","Piracicaba","Piraju","Pirajuí","Pirangi","Pirapora do Bom Jesus","Pirapozinho","Pirassununga","Piratininga","Pitangueiras","Planalto","Platina","Poá","Poloni","Pompéia","Pongaí","Pontal","Pontalinda","Pontes Gestal","Populina","Porangaba","Porto Feliz","Porto Ferreira","Potim","Potirendaba","Pracinha","Pradópolis","Praia Grande","Pratânia","Presidente Alves","Presidente Bernardes","Presidente Epitácio","Presidente Prudente","Presidente Venceslau","Promissão","Quadra","Quatá","Queiroz","Queluz","Quintana","Rafard","Rancharia","Redenção da Serra","Regente Feijó","Reginópolis","Registro","Restinga","Ribeira","Ribeirão Bonito","Ribeirão Branco","Ribeirão Corrente","Ribeirão do Sul","Ribeirão dos Índios","Ribeirão Grande","Ribeirão Pires","Ribeirão Preto","Rifaina","Rincão","Rinópolis","Rio Claro","Rio das Pedras","Rio Grande da Serra","Riolândia","Riversul","Rosana","Roseira","Rubiácea","Rubinéia","Sabino","Sagres","Sales","Sales Oliveira","Salesópolis","Salmourão","Saltinho","Salto","Salto de Pirapora","Salto Grande","Sandovalina","Santa Adélia","Santa Albertina","Santa Bárbara d'Oeste","Santa Branca","Santa Clara d'Oeste","Santa Cruz da Conceição","Santa Cruz da Esperança","Santa Cruz das Palmeiras","Santa Cruz do Rio Pardo","Santa Ernestina","Santa Fé do Sul","Santa Gertrudes","Santa Isabel","Santa Lúcia","Santa Maria da Serra","Santa Mercedes","Santa Rita d'Oeste","Santa Rita do Passa Quatro","Santa Rosa de Viterbo","Santa Salete","Santana da Ponte Pensa","Santana de Parnaíba","Santo Anastácio","Santo André","Santo Antônio da Alegria","Santo Antônio de Posse","Santo Antônio do Aracanguá","Santo Antônio do Jardim","Santo Antônio do Pinhal","Santo Expedito","Santópolis do Aguapeí","Santos","São Bento do Sapucaí","São Bernardo do Campo","São Caetano do Sul","São Carlos","São Francisco","São João da Boa Vista","São João das Duas Pontes","São João de Iracema","São João do Pau d'Alho","São Joaquim da Barra","São José da Bela Vista","São José do Barreiro","São José do Rio Pardo","São José do Rio Preto","São José dos Campos","São Lourenço da Serra","São Luís do Paraitinga","São Manuel","São Miguel Arcanjo","São Paulo","São Pedro","São Pedro do Turvo","São Roque","São Sebastião","São Sebastião da Grama","São Simão","São Vicente","Sarapuí","Sarutaiá","Sebastianópolis do Sul","Serra Azul","Serra Negra","Serrana","Sertãozinho","Sete Barras","Severínia","Silveiras","Socorro","Sorocaba","Sud Mennucci","Sumaré","Suzanápolis","Suzano","Tabapuã","Tabatinga","Taboão da Serra","Taciba","Taguaí","Taiaçu","Taiúva","Tambaú","Tanabi","Tapiraí","Tapiratiba","Taquaral","Taquaritinga","Taquarituba","Taquarivaí","Tarabai","Tarumã","Tatuí","Taubaté","Tejupá","Teodoro Sampaio","Terra Roxa","Tietê","Timburi","Torre de Pedra","Torrinha","Trabiju","Tremembé","Três Fronteiras","Tuiuti","Tupã","Tupi Paulista","Turiúba","Turmalina","Ubarana","Ubatuba","Ubirajara","Uchoa","União Paulista","Urânia","Uru","Urupês","Valentim Gentil","Valinhos","Valparaíso","Vargem","Vargem Grande do Sul","Vargem Grande Paulista","Várzea Paulista","Vera Cruz","Vinhedo","Viradouro","Vista Alegre do Alto","Vitória Brasil","Votorantim","Votuporanga","Zacarias"]},{sigla:"TO",nome:"Tocantins",cidades:["Abreulândia","Aguiarnópolis","Aliança do Tocantins","Almas","Alvorada","Ananás","Angico","Aparecida do Rio Negro","Aragominas","Araguacema","Araguaçu","Araguaína","Araguanã","Araguatins","Arapoema","Arraias","Augustinópolis","Aurora do Tocantins","Axixá do Tocantins","Babaçulândia","Bandeirantes do Tocantins","Barra do Ouro","Barrolândia","Bernardo Sayão","Bom Jesus do Tocantins","Brasilândia do Tocantins","Brejinho de Nazaré","Buriti do Tocantins","Cachoeirinha","Campos Lindos","Cariri do Tocantins","Carmolândia","Carrasco Bonito","Caseara","Centenário","Chapada da Natividade","Chapada de Areia","Colinas do Tocantins","Colméia","Combinado","Conceição do Tocantins","Couto de Magalhães","Cristalândia","Crixás do Tocantins","Darcinópolis","Dianópolis","Divinópolis do Tocantins","Dois Irmãos do Tocantins","Dueré","Esperantina","Fátima","Figueirópolis","Filadélfia","Formoso do Araguaia","Fortaleza do Tabocão","Goianorte","Goiatins","Guaraí","Gurupi","Ipueiras","Itacajá","Itaguatins","Itapiratins","Itaporã do Tocantins","Jaú do Tocantins","Juarina","Lagoa da Confusão","Lagoa do Tocantins","Lajeado","Lavandeira","Lizarda","Luzinópolis","Marianópolis do Tocantins","Mateiros","Maurilândia do Tocantins","Miracema do Tocantins","Miranorte","Monte do Carmo","Monte Santo do Tocantins","Muricilândia","Natividade","Nazaré","Nova Olinda","Nova Rosalândia","Novo Acordo","Novo Alegre","Novo Jardim","Oliveira de Fátima","Palmas","Palmeirante","Palmeiras do Tocantins","Palmeirópolis","Paraíso do Tocantins","Paranã","Pau d'Arco","Pedro Afonso","Peixe","Pequizeiro","Pindorama do Tocantins","Piraquê","Pium","Ponte Alta do Bom Jesus","Ponte Alta do Tocantins","Porto Alegre do Tocantins","Porto Nacional","Praia Norte","Presidente Kennedy","Pugmil","Recursolândia","Riachinho","Rio da Conceição","Rio dos Bois","Rio Sono","Sampaio","Sandolândia","Santa Fé do Araguaia","Santa Maria do Tocantins","Santa Rita do Tocantins","Santa Rosa do Tocantins","Santa Tereza do Tocantins","Santa Terezinha Tocantins","São Bento do Tocantins","São Félix do Tocantins","São Miguel do Tocantins","São Salvador do Tocantins","São Sebastião do Tocantins","São Valério da Natividade","Silvanópolis","Sítio Novo do Tocantins","Sucupira","Taguatinga","Taipas do Tocantins","Talismã","Tocantínia","Tocantinópolis","Tupirama","Tupiratins","Wanderlândia","Xambioá"]}];

			$('#qd_form_state_interest').change(function() {
				var optionSelected = $(this).find('option:selected').val();
				var options_cidades = "";

				if (!optionSelected.length) {
					$("#qd_form_city_interest").html('<option value="">Selecione o Estado</option>');
				} else {
					$.each(dataJson, function (key, val) {
						if(val.sigla == optionSelected) {
							$.each(val.cidades, function (key_city, val_city) {
								options_cidades += '<option value="' + val_city + '">' + val_city + '</option>';
							});
						}
					});

					$("#qd_form_city_interest").html(options_cidades);
				}
			});
		},
		calcStoreGeoDistance: function(cep, callback) {
			var $dataReturn;

			$.ajax({
				url: '//qd-mahogany-cdn.github.io/arquivos/store-v2.json',
				dataType: 'JSON'
			}).done(function(data) {
				if (!data)
					return;

				fn(data.store);
			});

			function fn(stores) {
				// Verifica o mais proximo
				$.ajax({
					url: 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyCOMigqttWK8lgTq3VnbKEgkgxEg1CPFpY&new_forward_geocoder=true&address=' + cep + '&components=country:BR'
				}).done(function(data) {
					if (data.results)
						calcDistance(new google.maps.LatLng(data.results[0].geometry.location.lat, data.results[0].geometry.location.lng), stores);
					else
						callback(null);
				});
			}

			function calcDistance(p1, stores) {
				var shorterDistance;
				var distance;

				for (var i = 0; i < stores.length; i++) {
					distance = (google.maps.geometry.spherical.computeDistanceBetween(p1, new google.maps.LatLng(stores[i].latitude, stores[i].longitude)) / 1000);
					shorterDistance = shorterDistance || distance;
					if (distance <= shorterDistance) {
						shorterDistance = distance;
						$dataReturn = stores[i];
					}
				}

				callback($dataReturn.email);
			}
		},
		hotsiteSejaRevendedor: function() {
			if(!$(document.body).is(".revendedor"))
				return;

			$('a[href="#qd-link-form"]').click(function(evt) {
				evt.preventDefault();
				$('html, body').stop().animate({'scrollTop': $(".form-franchisee-wrapper").offset().top - 300 }, 900, 'swing');
			});

			// Envio do formulario
			var form = $(".form-franchisee-wrapper form");
			var fieldsCRM = {};

			form.find("#qd_form_phone").mask('(00) 90000-0000');
			form.find("#qd_form_zipCode").mask('00000-000');

			// Preenchendo o endereço a partir do CEP
			var $form = form;
			var cepInputs = $form.find("input[id=qd_form_address], input[id=qd_form_neighborhood], input[id=qd_form_city], input[id=qd_form_state]").attr("disabled", "disabled");
			var cep = $form.find("input[id=qd_form_zipCode]");
			var resellerEmail = $('<input type="hidden" data-qd-name-crm="resellerEmail" name="resellerEmail" />').appendTo($form);

			cep.keyup(function(e) {
				if ((cep.val() || "").length < 9)
					return;

				$.ajax({
					url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
					dataType: "json",
					success: function(data) {
						$form.find("input[id=qd_form_address]").val(data.street || "");
						$form.find("input[id=qd_form_neighborhood]").val(data.neighborhood || "");
						$form.find("input[id=qd_form_city]").val(data.city || "");
						$form.find("select[id=qd_form_state]").val(data.state || "");

						Institutional.calcStoreGeoDistance(data.postalCode, function(rEmail) {resellerEmail.val(rEmail || 'telmo.campos@mahogany.com.br')});
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
					}
				});
			});

			form.validate({
				rules: {email: {email: true } },
				submitHandler: function(form) {
					var $form = $(form);

					if (!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function() {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#qd_form_email").val() || "";
						if (!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function(userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length ? "+55" + phone : null;

							$.ajax({url:"//api.ipify.org?format=jsonp",dataType:"jsonp",success:function(a){sendData(a.ip)},error:function(){$.ajax({url:"//www.telize.com/jsonip",dataType:"jsonp",success:function(a){sendData(a.ip)},error:function(a){sendData(null)}})}});

							var sendData = function(ip) {
								$form.find('[data-qd-name-crm]').each(function() {
									var $t = $(this);
									fieldsCRM[$t.attr('data-qd-name-crm')] = $t.val();
								});
								fieldsCRM['ip'] = ip;
								fieldsCRM['userId'] = userId;
								fieldsCRM['phone'] = phone;

								$form[0].reset();
								// $("#qd_form_city_interest").html('<option value="">Selecione o Estado</option>');

								$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/RV/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify(fieldsCRM),
									success: function(data) {
										$form.find(".form-succes").removeClass("hide");
									},
									error: function() {
										alert("Desculpe, não foi possível enviar seu formulário!");
									},
									complete: function() {
										submitWrapper.removeClass("qd-loading");
									}
								});
							}
						};

						$.ajax({
							url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
							type: "GET",
							dataType: "json",
							headers: {Accept: "application/vnd.vtex.ds.v10+json"},
							success: function(data) {saveContact(data.length? data[0].id: null); },
							error: function() {alert("Desculpe, não foi possível enviar seu formulário!"); }
						});
					})();

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		hotsiteSejaFranqueadoBannerMosaic: function() {
			$('.seja-um-franqueado-block:not(.seja-um-franqueado-block-3, .seja-um-revendedor-block-7) .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 10
			});

			$('.seja-um-franqueado-block.seja-um-franqueado-block-3 .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 30
			});
		},
		contactForm: function(){
			if (!$(document.body).is(".central-de-atendimento"))
				return;

			var form = $(".institucional-content .form-contact-wrapper form");

			form.find("#qd_form_phone").mask('(00) 0000-00009');
			form.find("#qd_form_celphone").mask('(00) 0000-00009');
			form.find("#zipCode").mask('00000-000');

			// Preenchendo o endereço a partir do CEP
			var $form = form;
			var cepInputs = $form.find("input[name=address], input[name=neighborhood], input[name=city], input[name=state]").attr("disabled", "disabled");
			var cep = $form.find("input[name=zipCode]");
			cep.keyup(function(e) {
				if ((cep.val() || "").length < 9)
					return;

				$.ajax({
					url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
					dataType: "json",
					success: function(data) {
						$form.find("input[name=address]").val(data.street || "");
						$form.find("input[name=neighborhood]").val(data.neighborhood || "");
						$form.find("input[name=city]").val(data.city || "");
						$form.find("input[name=state]").val(data.state || "");
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
					}
				});
			});

			form.validate({
				rules: {email: {email: true } },
				submitHandler: function(form) {
					var $form = $(form);

					if (!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function() {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#qd_form_email").val() || "";
						if (!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function(userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length ? "+55" + phone : null;

							$.ajax({
								url: "//api.ipify.org?format=jsonp",
								dataType: "jsonp",
								success: function(data) {sendData(data.ip); },
								error: function() {
									$.ajax({
										url: "//www.telize.com/jsonip",
										dataType: "jsonp",
										success: function(data) {sendData(data.ip); },
										error: function(data) {sendData(null); }
									});
								}
							});

							var sendData = function(ip) {
								$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/AT/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify({
										fullName: $form.find("#qd_form_name").val() || null,
										zipCode: $form.find("#zipCode").val() || null,
										address: $form.find("#address").val() || null,
										neighborhood: $form.find("#neighborhood").val() || null,
										city: $form.find("#city").val() || null,
										state: $form.find("#state").val() || null,
										ip: ip,
										message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
										phone: phone,
										subject: $form.find("#qd_form_subject").val() || null,
										email: email,
										userId: userId
									}),
									success: function(data) {
										$form.find(".form-succes").removeClass("hide");
									},
									error: function() {
										alert("Desculpe, não foi possível enviar seu formulário!");
									},
									complete: function() {
										submitWrapper.removeClass("qd-loading");
									}
								});
							}
						};
						$.ajax({
							url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
							type: "GET",
							dataType: "json",
							headers: {Accept: "application/vnd.vtex.ds.v10+json"},
							success: function(data) {
								if (data.length)
									saveContact(data[0].id);
								else
									saveContact(null);
							},
							error: function() {alert("Desculpe, não foi possível enviar seu formulário!"); }
						});
					})();

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		storeLocator: function() {
			if(!$(document.body).is(".qd-store-locator"))
				return;

			var mapWrapper = $('.qd-map-wrapper');
			var fieldWrapper = $(".qd-map-field-wrapper");
			var height = $(window).height() - ($(".store-header").outerHeight(true) + $(".footer-store-extra").outerHeight(true)) - 5;
			mapWrapper.height(height > 400? height: 400);

			var map = new google.maps.Map(mapWrapper[0], {
				center: new google.maps.LatLng(-14.4565898, -49.972459),
				zoom: 4,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			});

			var storeFeatures = new storeLocator.FeatureSet(
				new storeLocator.Feature('store-YES', 'Lojas'),
				new storeLocator.Feature('space-YES', 'Espaços'),
				new storeLocator.Feature('dealer-YES', 'Revendedores'),
				new storeLocator.Feature('all-YES', 'Todas')
			);

			var dataFeed = new storeLocator.StaticDataFeed();
			var requestCount = 0;
			var store = {};
			var reseller = {};
			var space = {};
			$.ajax({
				url: '//qd-mahogany-cdn.github.io/arquivos/store.json',
				dataType: "json",
				success: function(json) {store = json;},
				complete:function() {requestCount++; setStores();}
			});
			$.ajax({
				url: '//qd-mahogany-cdn.github.io/arquivos/resellers.json',
				dataType: "json",
				success: function(json) {reseller = json;},
				complete:function() {requestCount++; setStores();}
			});
			$.ajax({
				url: '//qd-mahogany-cdn.github.io/arquivos/space.json',
				dataType: "json",
				success: function(json) {space = json;},
				complete:function() {requestCount++; setStores();}
			});

			function setStores() {
				if(requestCount < 3)
					return;

				var stores = [];
				setStoresPopulate(stores, store.store || {});
				setStoresPopulate(stores, reseller.store || {});
				setStoresPopulate(stores, space.store || {});
				dataFeed.setStores(stores);
			};

			function setStoresPopulate(stores, data) {
				for(var i in data){
					var features = new storeLocator.FeatureSet;
					if(data[i].addressType == "Espaco")
						features.add(storeFeatures.getById('space-YES'));
					else if(data[i].addressType == "Revendedor")
						features.add(storeFeatures.getById('dealer-YES'));
					else
						features.add(storeFeatures.getById('store-YES'));
					features.add(storeFeatures.getById('all-YES'));

					stores.push(new storeLocator.Store(i + data[i].title + data[i].latitude + data[i].longitude, new google.maps.LatLng(data[i].latitude, data[i].longitude), features, {
						title: data[i].title,
						address: data[i].address,
						phone: '<strong>Tel.: </strong>' + data[i].phone,
						web: '<a href="https://maps.google.com/?q=' + (data[i].addressType == "Revendedor" ?'Revendedor ' :'') + 'Mahogany@' + data[i].latitude + ',' + data[i].longitude + '" target="_blank">Ver no Google Maps</a>'
					}));
				}
			};

			var iconStore = new google.maps.MarkerImage('/arquivos/pin-mahogany.png', new google.maps.Size(28, 36), null, new google.maps.Point(14, 36));
			var iconSpace = new google.maps.MarkerImage('/arquivos/pin-mahogany-rev.png', new google.maps.Size(28, 36), null, new google.maps.Point(14, 36));
			var iconDealer = new google.maps.MarkerImage('/arquivos/pin-mahogany-rev3.png', new google.maps.Size(28, 36), null, new google.maps.Point(14, 36));
			var getView = function(geolocation) {
				var icon;
				var view = new storeLocator.View(map, dataFeed, {geolocation: geolocation, features: storeFeatures});

				view.createMarker = function(store) {
					if(store.getFeatures().getById("space-YES"))
						icon = iconSpace;
					else if(store.getFeatures().getById("dealer-YES"))
						icon = iconDealer;
					else
						icon = iconStore;

					return new google.maps.Marker({
						position: store.getLocation(),
						icon: icon
					});
				}

				return view;
			};

			var setControl = function(){
				var inputs = $(".storelocator-panel .feature-filter input");
				inputs.each(function(ndx) {
					var $t = $(this);
					var input = $('<input type="radio" name="qd-store-locator-type" id="qd-store-locator-type' + ndx + '" />');
					$t.after(input).parent().attr("for", "qd-store-locator-type" + ndx);
					input.change(function() {
						if(!$(this).is(":checked"))
							return;
						inputs.filter(":checked").click();
						$t.click();
					});
				});
			};

			new storeLocator.Panel(fieldWrapper[0], {view: getView(false)});
			setControl();
			$(".qd-map-geo").click(function() {
				fieldWrapper.empty();
				new storeLocator.Panel(fieldWrapper[0], {view: getView(true)});
				setControl();
			});

			var hideBtn = $('<span class="qd-map-hide-panel"><span class="arrow-l"></span><span class="arrow-r"></span></span>');
			var sidePanel = $(".qd-map-side-panel").append(hideBtn);
			hideBtn.click(function() {
				sidePanel.toggleClass("qd-map-hidden");
			});
		},
		resellerForm: function() {
		    if (!$(document.body).is(".reseller-form"))
			    return;

			var form = $(".form-horizontal");

			form.find("#qd_form_phone").mask('(00) 0000-00009');
			form.find('#qd_cpf').mask('000.000.000-00');
			form.find('#qd_form_zip').mask('00000-000');
			// form.find("#qd_form_celphone").mask('(00) 0000-00009');

			form.validate({
			    rules: {email: {email: true } },
			    submitHandler: function(form) {
			        var $form = $(form);

			        if (!$form.valid())
			            return;

			        // Enviando os dados para o CRM
			        (function() {
			            // Adicionando classe de carregando
			            var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

			            // Obtendo o e-mail
			            var email = $form.find("#qd_form_email").val() || "";
			            if (!email.length)
			                return alert("Preencha seu e-mail");

			            var saveContact = function(userId) {
			                var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
			                phone = phone.length ? "+55" + phone : null;

			                $.ajax({
			                    url: "//api.ipify.org?format=jsonp",
			                    dataType: "jsonp",
			                    success: function(data) {sendData(data.ip); },
			                    error: function() {
			                        $.ajax({
			                            url: "//www.telize.com/jsonip",
			                            dataType: "jsonp",
			                            success: function(data) {sendData(data.ip); },
			                            error: function(data) {sendData(null); }
			                        });
			                    }
			                });

			                var sendData = function(ip) {
			                    $.ajax({
			                        url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/RV/documents",
			                        type: "POST",
			                        dataType: "json",
			                        headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
			                        data: JSON.stringify({
			                            fullName: $form.find("#qd_form_name").val() || null,
			                            ip: ip,
			                            phone: phone,
			                            cpf: $form.find("#qd_cpf").val() || null,
			                            zipCode: $form.find("#qd_form_zip").val() || null,
			                            address: $form.find("#qd_address").val() || null,
			                            number: $form.find("#qd_address_number").val() || null,
			                            complement: $form.find("#qd_address_complement").val() || null,
			                            neighborhood: $form.find("#qd_neighborhood").val() || null,
			                            city: $form.find("#qd_cidade").val() || null,
			                            state: $form.find("#qd_state").val() || null,
			                            email: email,
			                            userId: userId
			                        }),
			                        success: function(data) {$form.find(".form-succes").removeClass("hide"); },
			                        error: function() {alert("Desculpe, não foi possível enviar seu formulário!"); },
			                        complete: function() {submitWrapper.removeClass("qd-loading"); }
			                    });
			                }
			            };
			            $.ajax({
			                url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
			                type: "GET",
			                dataType: "json",
			                headers: {Accept: "application/vnd.vtex.ds.v10+json"},
			                success: function(data) {
			                    if (data.length)
			                        saveContact(data[0].id);
			                    else
			                        saveContact(null);
			                },
			                error: function() {alert("Desculpe, não foi possível enviar seu formulário!"); }
			            });
			        })();

			        return false;
			    },
			    errorPlacement: function(error, element) {}
			});
		},
		newsForm: function() {
			if(!$(document.body).is(".institucional"))
				return;

			var form = $(".receive-news-form");
			form.find("#birthDate").mask('00/00/0000');
			form.find("#zipCode").mask('00000-000');
			form.find("#cellphone").mask('(00) 0000-00009');

			// Preenchendo o endereço a partir do CEP
			var $form = form;
			var cepInputs = $form.find("input[name=address], input[name=complemento], input[name=neighborhood], input[name=city], input[name=state], input[name=pais]").attr("disabled", "disabled");
			var cep = $form.find("input[name=zipCode]");
			cep.keyup(function(e) {
				if ((cep.val() || "").length < 9)
					return;

				$.ajax({
					url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
					dataType: "json",
					success: function(data) {
						$form.find("input[name=address]").val(data.street || "");
						$form.find("input[name=neighborhood]").val(data.neighborhood || "");
						$form.find("input[name=city]").val(data.city || "");
						$form.find("input[name=state]").val(data.state || "");
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
					}
				});
			});

			form.validate({
				rules: {email: {email: true } },
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function() {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#email").val() || "";
						if(!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function(userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length? "+55" + phone: null;

							$.ajax({
								url: "//api.ipify.org?format=jsonp",
								dataType: "jsonp",
								success: function(data) { sendData(data.ip); },
								error: function() {
									$.ajax({
										url: "//www.telize.com/jsonip",
										dataType: "jsonp",
										success: function(data) { sendData(data.ip); },
										error: function(data) { sendData(null); }
									});
								}
							});

								var sendData = function(ip) {
									$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/RN/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify({
										fullName: $form.find("#fullName").val() || null,
										birthDate: $form.find("#birthDate").val() || null,
										cellphone: $form.find("#cellphone").val() || null,
										zipCode: $form.find("#zipCode").val() || null,
										address: $form.find("#address").val() || null,
										number: $form.find("#number").val() || null,
										complement: $form.find("#complement").val() || null,
										neighborhood: $form.find("#neighborhood").val() || null,
										city: $form.find("#city").val() || null,
										state: $form.find("#state").val() || null,
										ip: ip,
										// message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
										// phone: phone,
										// subject: $form.find("#qd_form_subject").val() || null,
										email: email,
										userId: userId
									}),
									success: function(data){ $form.find(".form-succes").removeClass("hide"); },
									error: function() { alert("Desculpe, não foi possível enviar seu formulário!"); },
									complete: function(){ submitWrapper.removeClass("qd-loading"); }
								});
							}
						};
						$.ajax({
							url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
							type: "GET",
							dataType: "json",
							headers: {Accept: "application/vnd.vtex.ds.v10+json"},
							success: function(data){
								if(data.length)
									saveContact(data[0].id);
								else
									saveContact(null);
							},
							error: function() {alert("Desculpe, não foi possível enviar seu formulário!");}
						});
					})();

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		workWithUsForm: function() {
			if(!$(document.body).is(".institucional"))
				return;

			var form = $(".work-with-us");
			form.find("#birthDate").mask('00/00/0000');
			form.find("#zipCode").mask('00000-000');
			form.find("#phone").mask('(00) 0000-00009');
			form.find("#cellphone").mask('(00) 0000-00009');

			// Preenchendo o endereço a partir do CEP
			var $form = form;
			var cepInputs = $form.find("input[name=address], input[name=complemento], input[name=neighborhood], input[name=city], input[name=state], input[name=pais]").attr("disabled", "disabled");
			var cep = $form.find("input[name=zipCode]");
			cep.keyup(function(e) {
				if ((cep.val() || "").length < 9)
					return;

				$.ajax({
					url: "/api/checkout/pub/postal-code/BRA/" + cep.val(),
					dataType: "json",
					success: function(data) {
						$form.find("input[name=address]").val(data.street || "");
						$form.find("input[name=neighborhood]").val(data.neighborhood || "");
						$form.find("input[name=city]").val(data.city || "");
						$form.find("input[name=state]").val(data.state || "");
					},
					complete: function() {
						cepInputs.removeAttr('disabled');
					}
				});
			});

			form.validate({
				rules: {email: {email: true } },
				submitHandler: function(form){
					var $form = $(form);

					if(!$form.valid())
						return;

					// Enviando os dados para o CRM
					(function() {
						// Adicionando classe de carregando
						var submitWrapper = $form.find("[type=submit]").parent().addClass("qd-loading");

						// Obtendo o e-mail
						var email = $form.find("#email").val() || "";
						if(!email.length)
							return alert("Preencha seu e-mail");

						var saveContact = function(userId) {
							var phone = ($form.find("#qd_form_phone").val() || "").replace(/[^0-9]+/ig, "");
							phone = phone.length? "+55" + phone: null;

							$.ajax({
								url: "//api.ipify.org?format=jsonp",
								dataType: "jsonp",
								success: function(data) { sendData(data.ip); },
								error: function() {
									$.ajax({
										url: "//www.telize.com/jsonip",
										dataType: "jsonp",
										success: function(data) { sendData(data.ip); },
										error: function(data) { sendData(null); }
									});
								}
							});

								var sendData = function(ip) {
									$.ajax({
									url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/TC/documents",
									type: "POST",
									dataType: "json",
									headers: {"Accept": "application/vnd.vtex.ds.v10+json", "Content-Type": "application/json; charset=utf-8"},
									data: JSON.stringify({
										fullName: $form.find("#fullName").val() || null,
										birthDate: $form.find("#birthDate").val() || null,
										status: $form.find("#status").val() || null,
										sex: $form.find("input[name=sex]").val() || null,
										phone: $form.find("#phone").val() || null,
										cellphone: $form.find("#cellphone").val() || null,
										zipCode: $form.find("#zipCode").val() || null,
										address: $form.find("#address").val() || null,
										number: $form.find("#number").val() || null,
										complement: $form.find("#complement").val() || null,
										neighborhood: $form.find("#neighborhood").val() || null,
										city: $form.find("#city").val() || null,
										state: $form.find("#state").val() || null,
										education: $form.find("#education").val() || null,
										educationalInstitution: $form.find("#educationalInstitution").val() || null,
										area: $form.find("#area").val() || null,
										ip: ip,
										// message: ($form.find("#qd_form_msg").val() || "").replace(/(?:\r\n|\r|\n)/g, '<br />'),
										// phone: phone,
										// subject: $form.find("#qd_form_subject").val() || null,
										email: email,
										userId: userId
									}),
									success: function(data){ $form.find(".form-succes").removeClass("hide"); },
									error: function() { alert("Desculpe, não foi possível enviar seu formulário!"); },
									complete: function(){ submitWrapper.removeClass("qd-loading"); }
								});
							}
						};
						$.ajax({
							url: "//api.vtexcrm.com.br/" + jsnomeLoja + "/dataentities/CL/search?_fields=id&email=" + email,
							type: "GET",
							dataType: "json",
							headers: {Accept: "application/vnd.vtex.ds.v10+json"},
							success: function(data){
								if(data.length)
									saveContact(data[0].id);
								else
									saveContact(null);
							},
							error: function() {alert("Desculpe, não foi possível enviar seu formulário!");}
						});
					})();

					return false;
				},
				errorPlacement: function(error, element) {}
			});
		},
		hotsiteApplyMosaicBanners: function() {
			$('.hotsite-qd-v1-banner-products .box-banner, .hotsite-qd-v1-categories .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 30
			});
		},
		hotsiteInstitutionalMosaicBanners: function() {
			$('.hotsite-qd-v1-institutional-banners .box-banner').QD_mosaicBanners({
				bannerColSecurityMargin: 0,
				bannerRowSecurityMargin: 0
			});
		},
		hotsiteSliderFull: function() {
			if(typeof $.fn.cycle !== 'function')
				return;

			var elem = $('.slider-qd-v1-full');

			elem.find('.box-banner').each(function() {
				var $t = $(this);
				$t.attr('data-cycle-pager-template', '<span class="cycle-pager-item"></span>');
			});

			if (elem.find('.box-banner').length <= 1)
				elem.find('.cycle-control').hide();

			elem.cycle({
				slides: '.box-banner',
				swipe: 'true',
				pager: '.cycle-pager-wrap',
				prev: '.cycle-prev',
				next: '.cycle-next'
			});
		},
		hotsiteSliderLinkScroll: function() {
			$('.slider-qd-v1-full-scroll').click(function(e){
				e.preventDefault();

				$('html, body').stop().animate({
					'scrollTop': $(".hotsite-qd-v1-banner-products, .seja-um-franqueado-block-1").offset().top - 50
				}, 900, 'swing');
			});
		},
		hotsiteContentSlider: function() {
			if(typeof $.fn.cycle !== 'function')
				return;

			var elem = $('.hotsite-qd-v1-content-slider');

			elem.find('.box-banner').each(function() {
				var $t = $(this);
				$t.attr('data-cycle-pager-template', '<span class="cycle-pager-item"></span>');
			});

			if (elem.find('.box-banner').length <= 1)
				elem.find('.cycle-control').hide();

			elem.cycle({
				slides: '>.box-banner',
				swipe: 'true',
				pager: '.cycle-pager-wrap',
				prev: '.cycle-prev',
				next: '.cycle-next'
			});
		},
		hotsiteProductsCarousel: function() {
			var wrapper = $('.hotsite-qd-v1-products-wrapper');

			wrapper.find('.prateleira').each(function() {
				$(this).find('h2').remove();
			});

			wrapper.find('.prateleira').owlCarousel({
				itemsCustom: [[0, 1], [480, 2], [768, 3], [1200, 4]],
				slideSpeed: 300,
				navigation: true
			});
		}
	};

	var Orders = {
		init: function () {
			Orders.bootstrapCssFix();
		},
		ajaxStop: function () {},
		windowOnload: function () {},
		bootstrapCssFix : function(){
			var styleSheets = document.styleSheets;
			for (var i = 0; i < styleSheets.length; i++) {
				if ((styleSheets[i].href || "").indexOf('io.vtex.com.br/front-libs/bootstrap/2.3.2/css/bootstrap.min.css') > -1) {
					styleSheets[i].disabled = true;
					break;
				}
			}
		}
	};
} catch (err) {
	if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
		console.info("Houve um erro nos objetos, informações abaixo.");
		console.error(err);
	}
}

try {
	(function () {
		var body, ajaxStop, windowLoad;

		windowLoad = function () {
			Common.windowOnload();
			if (body.filter(".home").length > 0) Home.windowOnload();
			else if (body.filter(".departamento, .categoria").length > 0) Departament.windowOnload();
			else if (body.filter(".resultado-busca").length > 0) Search.windowOnload();
			else if (body.filter(".produto").length > 0) Product.windowOnload();
			else if (body.filter(".listas").length > 0) List.windowOnload();
			else if (body.filter(".institucional").length > 0) Institutional.windowOnload();
			else if(body.filter(".orders").length>0)Orders.windowOnload();
		};

		ajaxStop = function () {
			Common.ajaxStop();
			if (body.filter(".home").length > 0) Home.ajaxStop();
			else if (body.filter(".departamento, .categoria").length > 0) Departament.ajaxStop();
			else if (body.filter(".resultado-busca").length > 0) Search.ajaxStop();
			else if (body.filter(".produto").length > 0) Product.ajaxStop();
			else if (body.filter(".listas").length > 0) List.ajaxStop();
			else if (body.filter(".institucional").length > 0) Institutional.ajaxStop();
			else if(body.filter(".orders").length>0)Orders.ajaxStop();
		};

		$(function () {
			body = $("body");
			Common.init();
			if (body.filter(".home").length > 0) Home.init();
			else if (body.filter(".departamento, .categoria").length > 0) Departament.init();
			else if (body.filter(".resultado-busca").length > 0) Search.init();
			else if (body.filter(".produto").length > 0) Product.init();
			else if (body.filter(".listas").length > 0) List.init();
			else if (body.filter(".institucional").length > 0) Institutional.init();
			else if(body.filter(".orders").length>0)Orders.init();
			$(document).ajaxStop(ajaxStop);
			$(window).load(windowLoad);
			body.addClass('jsFullLoaded');
		});
	})();
} catch (err) {
	if (typeof console !== "undefined" && typeof console.error === "function" && typeof console.info === "function") {
		$("body").addClass('jsFullLoaded jsFullLoadedError');
		console.info("Houve um erro ao iniciar os objetos, informações abaixo.");
		console.error(err);
	}
}

/* Automatizador de comments box do Facebook // 1.4 // Carlos Vinicius [Quatro Digital] */
$(window).load(function(){var a=$(".fb-comments");a.length&&a.attr("data-href",document.location.href.split("#").shift().split("?").shift());$("#fb-root").length||$("body").append('<div id="fb-root"></div>');if($("script[src*='connect.facebook.net/pt_BR/sdk.js']").filter("[src*='sdk.js']").length)"undefined"!==typeof FB&&"undefined"!==typeof FB.XFBML&&FB.XFBML.parse();else{a=$("meta[property='fb:app_id']").attr("content")||!1;var b,c=document.getElementsByTagName("script")[0];document.getElementById("facebook-jssdk")||
(b=document.createElement("script"),b.id="facebook-jssdk",b.src="//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.3"+(a?"&appId="+a:""),c.parentNode.insertBefore(b,c))}});
/* Newslleter customizada para a plataforma VTEX // 4.7 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os Direitos Reservados */
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
(function(h){"function"!==typeof h.fn.QD_news&&(h.fn.QD_news=function(p){var g,a,m,e;e=function(a,b){"object"===typeof console&&("undefined"!==typeof b&&"alerta"===b.toLowerCase()?console.warn("[VtexNews] "+a):"undefined"!==typeof b&&"info"===b.toLowerCase()?console.info("[VtexNews] "+a):console.error("[VtexNews] "+a))};g=jQuery(this);if(1>g.length)return g;a=jQuery.extend({defaultName:"Digite seu nome...",defaultEmail:"Digite seu e-mail...",nameField:".qd_news_name",emailField:".qd_news_email",btn:".qd_news_button",
elementError:".nv2_messageError",elementSuccess:".nv2_messageSuccess",validationMethod:"popup",getAttr:"alt",setDefaultName:!0,checkNameExist:!0,validateName:!0,showInPopup:!0,animation:"blink",animateSpeed:100,animateDistance:15,animateRepeat:3,animateFieldSuccess:".qd_news_animate_field_success",timeHideSuccessMsg:3E3,successCallback:function(){},submitCallback:function(a,b){}},p);a.showInPopup||(a.validationMethod="div");null!==a.animation?a.validationMethod="animateField":"animateField"==a.validationMethod&&
(a.animation="leftRight");if("popup"==a.validationMethod&&"function"!==typeof jQuery.fn.vtexPopUp2)return e("O popUp2 n\u00e3o foi encontrado. Adicione o Plugin de PopUp2."),g;m=function(f){var b,d,c;d=0;b=function(){f.animate({left:"-="+a.animateDistance},a.animateSpeed,function(){f.animate({left:"+="+a.animateDistance},a.animateSpeed,function(){d<a.animateRepeat&&b();d++})})};c=function(){f.fadeTo(a.animateSpeed,0.2,function(){f.fadeTo(a.animateSpeed,1,function(){d<a.animateRepeat&&c();d++})})};
f.stop(!0,!0);"leftRight"==a.animation?b():"blink"==a.animation&&c()};g.each(function(){var f,b,d,c,g,k,l;b=jQuery(this);d=b.find(a.nameField);c=b.find(a.emailField);g=b.find(a.btn);k=b.find(a.elementError);l=b.find(a.elementSuccess);1>d.length&&a.checkNameExist&&e("Campo de nome, n\u00e3o encontrado ("+d.selector+"). Ser\u00e1 atribuido um valor padr\u00e3o.","info");if(1>c.length)return e("Campo de e-mail, n\u00e3o encontrado ("+c.selector+")"),b;if(1>g.length)return e("Bot\u00e3o de envio, n\u00e3o encontrado ("+
g.selector+")"),b;if("animateField"!=a.validationMethod&&(1>l.length||1>k.length))return e("A(s) mensagem(ns) de erro e/ou sucesso esta(m) faltando \n ("+l.selector+", "+k.selector+")"),b;a.setDefaultName&&d.is("input[type=text], textarea")&&d.val(a.defaultName);c.val(a.defaultEmail);(function(){var b,c;a.checkNameExist&&(b=d.filter(":visible"),b.length&&(c=b.val(),d.is("input:text, textarea")&&b.bind({focus:function(){b.val()!=c||0!==b.val().search(a.defaultName.substr(0,6))&&!a.setDefaultName||
b.val("")},blur:function(){""===b.val()&&b.val(c)}})))})();(function(){var b;b=c.val();c.bind({focus:function(){c.val()==b&&0===c.val().search(a.defaultEmail.substr(0,6))&&c.val("")},blur:function(){""===c.val()&&c.val(b)}})})();f=function(){var c,d,f,e;d=(c=b.find(a.nameField).filter("input[type=text],select,textarea").val())?c:b.find(a.nameField).filter("input[type=radio], input[type=checkbox]").length?b.find(a.nameField).filter("input[type=radio]:checked, input[type=checkbox]:checked").val()||
"":(c=b.find(a.nameField).attr(a.getAttr))?c:(c=b.find(a.nameField).text())?c:(c=b.find(a.nameField).find(".box-banner img:first").attr("alt"))?c:"Nome_Padrao";c=(b.find(a.emailField).val()||"").trim();f=b.find(a.nameField).is(":visible");f=a.validateName?(1>d.length||0===d.search(a.defaultName.substr(0,6)))&&(a.checkNameExist||f?f:!0):!1;e=0>c.search(/^[a-z0-9\_\-\.\+]+@[a-z0-9\_\-]+(\.[a-z0-9\_\-]{2,})+$/i);f||e?"animateField"==a.validationMethod?(f&&m(b.find(a.nameField)),e&&m(b.find(a.emailField))):
"popup"==a.validationMethod?k.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterError"}):(k.slideDown().bind("click",function(){h(this).slideUp()}),setTimeout(function(){k.slideUp()},1800)):(g.attr("disabled","disabled"),jQuery.ajax({url:"/no-cache/Newsletter.aspx",type:"POST",data:{newsletterClientEmail:c,newsletterClientName:a.defaultName==d?"-":d,newsInternalCampaign:"newsletter:opt-in",newsInternalPage:(document.location.pathname||"/").replace(/\//g,"_"),newsInternalPart:"newsletter"},
success:function(c){var d,f,e;g.removeAttr("disabled");"popup"==a.validationMethod?l.vtexPopUp2({popupType:"newsletter",popupClass:"popupNewsletterSuccess"}):"animateField"!=a.validationMethod&&l.slideDown().bind("click",function(){h(this).slideUp()});e=b.find(a.emailField);a.setDefaultName&&b.find(a.nameField).is("input:text, textarea")&&b.find(a.nameField).val(a.defaultName);d=function(){e.val(a.defaultEmail)};"animateField"==a.validationMethod?(e.val(b.find(a.animateFieldSuccess).val()||"Cadastro Efetuado!"),
e.addClass("vtexNewsSuccess"),f=setTimeout(function(){e.removeClass("vtexNewsSuccess");d();e.unbind("focus.vtexNews")},a.timeHideSuccessMsg),e.bind("focus.vtexNews",function(){e.removeClass("vtexNewsSuccess");clearTimeout(f);h(this).val("");h(this).unbind("focus.vtexNews")})):d();a.successCallback()}}),a.submitCallback(c,d))};g.bind("click",function(){f()});var n=function(a){13==(a.keyCode?a.keyCode:a.which)&&(a.preventDefault(),f())};d.filter("input:text, textarea").bind("keydown",n);c.bind("keydown",
n)});return g},h(function(){h(".qd_news_auto").QD_news()}))})(jQuery);
/* Quatro Digital - jQuery Ajax Queue // 2.0 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(a){"function"!==typeof a.qdAjax&&(a.qdAjaxQueue={},a.qdAjax=function(d){var c,b;c=a.extend({},{success:function(){},error:function(){},complete:function(){},clearQueueDelay:0},d);b=escape(encodeURIComponent(c.url));a.qdAjaxQueue[b]=a.qdAjaxQueue[b]||{};a.qdAjaxQueue[b].opts=a.qdAjaxQueue[b].opts||[];a.qdAjaxQueue[b].opts.push({success:function(a,b,e){c.success.call(this,a,b,e)},error:function(a,b,e){c.error.call(this,a,b,e)},complete:function(a,b){c.complete.call(this,a,b)}});a.qdAjaxQueue[b].parameters=
a.qdAjaxQueue[b].parameters||{success:{},error:{},complete:{}};a.qdAjaxQueue[b].callbackFns=a.qdAjaxQueue[b].callbackFns||{};a.qdAjaxQueue[b].callbackFns.successPopulated="boolean"===typeof a.qdAjaxQueue[b].callbackFns.successPopulated?a.qdAjaxQueue[b].callbackFns.successPopulated:!1;a.qdAjaxQueue[b].callbackFns.errorPopulated="boolean"===typeof a.qdAjaxQueue[b].callbackFns.errorPopulated?a.qdAjaxQueue[b].callbackFns.errorPopulated:!1;a.qdAjaxQueue[b].callbackFns.completePopulated="boolean"===typeof a.qdAjaxQueue[b].callbackFns.completePopulated?
a.qdAjaxQueue[b].callbackFns.completePopulated:!1;d=a.extend({},c,{success:function(g,f,e){a.qdAjaxQueue[b].parameters.success={data:g,textStatus:f,jqXHR:e};a.qdAjaxQueue[b].callbackFns.successPopulated=!0;for(var c in a.qdAjaxQueue[b].opts)"object"===typeof a.qdAjaxQueue[b].opts[c]&&(a.qdAjaxQueue[b].opts[c].success.call(this,g,f,e),a.qdAjaxQueue[b].opts[c].success=function(){})},error:function(c,f,e){a.qdAjaxQueue[b].parameters.error={errorThrown:e,textStatus:f,jqXHR:c};a.qdAjaxQueue[b].callbackFns.errorPopulated=
!0;for(var d in a.qdAjaxQueue[b].opts)"object"===typeof a.qdAjaxQueue[b].opts[d]&&(a.qdAjaxQueue[b].opts[d].error.call(this,c,f,e),a.qdAjaxQueue[b].opts[d].error=function(){})},complete:function(d,f){a.qdAjaxQueue[b].parameters.complete={textStatus:f,jqXHR:d};a.qdAjaxQueue[b].callbackFns.completePopulated=!0;for(var e in a.qdAjaxQueue[b].opts)"object"===typeof a.qdAjaxQueue[b].opts[e]&&(a.qdAjaxQueue[b].opts[e].complete.call(this,d,f),a.qdAjaxQueue[b].opts[e].complete=function(){});setTimeout(function(){a.qdAjaxQueue[b].jqXHR=
void 0;a.qdAjaxQueue[b].opts=void 0;a.qdAjaxQueue[b].parameters=void 0;a.qdAjaxQueue[b].callbackFns=void 0},c.clearQueueDelay)}});"undefined"===typeof a.qdAjaxQueue[b].jqXHR?a.qdAjaxQueue[b].jqXHR=a.ajax(d):a.qdAjaxQueue[b].jqXHR&&a.qdAjaxQueue[b].jqXHR.readyState&&4==a.qdAjaxQueue[b].jqXHR.readyState&&(a.qdAjaxQueue[b].callbackFns.successPopulated&&d.success(a.qdAjaxQueue[b].parameters.success.data,a.qdAjaxQueue[b].parameters.success.textStatus,a.qdAjaxQueue[b].parameters.success.jqXHR),a.qdAjaxQueue[b].callbackFns.errorPopulated&&
d.error(a.qdAjaxQueue[b].parameters.error.jqXHR,a.qdAjaxQueue[b].parameters.error.textStatus,a.qdAjaxQueue[b].parameters.error.errorThrown),a.qdAjaxQueue[b].callbackFns.completePopulated&&d.complete(a.qdAjaxQueue[b].parameters.complete.jqXHR,a.qdAjaxQueue[b].parameters.complete.textStatus))},a.qdAjax.version="2.0")})(jQuery);
/* Quatro Digital jQuery Scroll // 1.0 // Carlos Vinicius // Todos os direitos reservados */
(function(a){"function"!==typeof a.fn.QD_scroll&&(a.fn.QD_scroll=function(d,b){var c;b=b||100;window.QuatroDigital_scroll=window.QuatroDigital_scroll||{};window.QuatroDigital_scroll.scrollTop=null;window.QuatroDigital_scroll.lastScrollTop=null;a(this).scroll(function(){c=this;window.QuatroDigital_scroll.scrollTop=a(window).scrollTop()});(function(){window.QuatroDigital_scroll.interval=setInterval(function(){window.QuatroDigital_scroll.lastScrollTop!==window.QuatroDigital_scroll.scrollTop&&(null!==
window.QuatroDigital_scroll.scrollTop&&d.call(c,window.QuatroDigital_scroll.scrollTop),window.QuatroDigital_scroll.lastScrollTop=window.QuatroDigital_scroll.scrollTop)},b)})()})})(jQuery);
/* $("a").getParent("ul"); // Carlos Vinicius [ QUATRO DIGITAL ] // MIT */
(function(b){b.fn.getParent=function(c){var a;a=b(this);if(1>a.length)return a;a=a.parent();return a.is("html")?b(""):a.is(c)?a:a.length?a.getParent(c):a}})(jQuery);
// QUATRO DIGITAL - BUY BUTTON (BLOCO) // 1.2 // Carlos Vinicius // Todos os direitos reservados
(function(u){try{var c=jQuery,k,l,b;k=function(a,c){if("object"===typeof console){var b="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?b?console.warn("[Quatro Digital - Buy Button]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[Quatro Digital - Buy Button]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?b?console.info("[Quatro Digital - Buy Button]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[Quatro Digital - Buy Button]\n"+a):b?console.error("[Quatro Digital - Buy Button]\n",
a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[Quatro Digital - Buy Button]\n"+a)}};l={timeRemoveNewItemClass:5E3,isSmartCheckout:!0,buyButton:".productInformationWrapper  a.buy-button",buyQtt:"input.buy-in-page-quantity",selectSkuMsg:"selecione o modelo desejado",productPageCallback:function(a,b,h){c("body").is(".productQuickView")&&("success"===b?alert("Produto adicionado ao carrinho!"):(alert("Ooops! Algo saiu errado ao tentar adicionar seu produto ao carrinho. \n Vou te redirecionar para o carrinho."),
("object"===typeof parent?parent:document).location.href=h))},getProductQttElem:function(a,b){return a.parent().find(b)},isProductPage:function(){return c("body").is("#produto, .produto")},execDefaultAction:function(a){return!1},allowBuyClick:function(){return!0},callback:function(){},asyncCallback:function(){}};c.QD_buyButton=function(a,e){var h,l,m,g,p;h=c(a);g=this;window._Quatro_Digital_dropDown=window._Quatro_Digital_dropDown||{};window._QuatroDigital_CartData=window._QuatroDigital_CartData||
{};g.prodAdd=function(a,d){h.addClass("qd-bb-itemAddCartWrapper qd-bb-lightBoxProdAdd");a.addClass("qd-bb-itemAddBuyButtonWrapper");c("body").addClass("qd-bb-lightBoxBodyProdAdd");setTimeout(function(){h.removeClass("qd-bb-itemAddCartWrapper");a.removeClass("qd-bb-itemAddBuyButtonWrapper")},b.timeRemoveNewItemClass);window._QuatroDigital_CartData.lastSkuAdded=d;window._Quatro_Digital_dropDown.getOrderForm=void 0;if("undefined"!==typeof e&&"function"===typeof e.getCartInfoByUrl){if(b.isSmartCheckout||
e.getCartInfoByUrl(),b.isSmartCheckout)return e.getCartInfoByUrl(function(a){window._Quatro_Digital_dropDown.getOrderForm=a;c.fn.simpleCart(!0,void 0,!0)})}else window._Quatro_Digital_dropDown.allowUpdate=!0;c.fn.simpleCart(!0)};(function(){if("function"===typeof window.ajaxRequestbuyButtonAsynchronous){var a;a=window.ajaxRequestbuyButtonAsynchronous;window.ajaxRequestbuyButtonAsynchronous=function(d,b,r,s,q){a.call(this,d,b,r,s,function(){"function"===typeof q&&q.call(this);g.prodAdd(c(""))});window._QuatroDigital_AmountProduct=
window._QuatroDigital_AmountProduct||{};window._QuatroDigital_AmountProduct.buyButtonClicked=!0}}})();l=function(){var a=c(this);"undefined"!==typeof a.data("buyButton")?(a.unbind("click"),m(a)):(a.bind("mouseenter.qd_bb_buy_sc",function(d){var b=c(this);a.unbind("click");m(a);b.unbind(d)}),c(window).load(function(){a.unbind("click");m(a);a.unbind("mouseenter.qd_bb_buy_sc")}))};g.clickBuySmartCheckout=function(a){var d,f;f=c(this);d=f.attr("href")||"";if(!(-1<d.indexOf(b.selectSkuMsg))){d=-1<d.indexOf("redirect=false")?
d:d+"&redirect=false";a=b.getProductQttElem(f,b.buyQtt).val()||"";isNaN(a)||""===a||(d=d.replace(/qty\=[0-9]*/i,"qty="+a));if(b.execDefaultAction(f))return f.attr("href",d.replace("redirect=false","redirect=true")),!0;d=d.replace(/http.?:/i,"");c.ajax({url:d,complete:function(a,c){b.productPageCallback.call(this,a,c,d);g.buyButtonClickCallback.call(this,a,c,d);g.prodAdd(f,d.split("ku=").pop().split("&").shift());"function"===typeof b.asyncCallback&&b.asyncCallback.call(this)}});return!1}};g.buyButtonClickCallback=
function(a,b,c){"success"===b&&"object"===typeof window.parent&&"function"===typeof window.parent._QuatroDigital_prodBuyCallback&&window.parent._QuatroDigital_prodBuyCallback(a,b,c)};m=function(a){b.isSmartCheckout?a.not(".qd_bb_buy_on").addClass("qd_bb_buy_on").bind("click.qd_bb_buy_sc",function(){return b.allowBuyClick()?g.clickBuySmartCheckout.call(this):!0}):a.bind("click.qd_bb_buy",function(){if(!b.allowBuyClick())return!0;var a,f,n,e;n=c(this);a=c(b.buyQtt).val()||1;e=n.attr("href");if(!(0>
e.search(/carrinho/i)))return f=e.split("ku=").pop().split("&").shift(),window._QuatroDigital_AmountProduct=window._QuatroDigital_AmountProduct||{},window._QuatroDigital_AmountProduct.buyButtonClicked=!0,c.qdAjax({url:"/no-cache/CarrinhoAdd.aspx?idSku="+f+"&quantidade="+a,success:function(a){if(-1<a.indexOf("Ocorreu um erro"))return k(["Ao tentar adicionar o produto ao carrinho, recebi um conte\u00fado com o texto \u201cOcorreu um erro\u201d",a]);g.prodAdd(n,f);"function"===typeof adminCart&&adminCart()},
error:function(a){k(["N\u00e3o foi adicionar o produto ao carrinho",a])},complete:function(a,c){b.productPageCallback.call(this,a,c,e);callbackFn.call(this,a,c,e);"function"===typeof b.asyncCallback&&b.asyncCallback.call(this)}}),!1})};p=function(a){b.getProductQttElem(a,b.buyQtt).each(function(){var a=c(this);if(!a.next(".qd-bb-qtyButtonsWrap").length){var b=c('<ul class="qtyButtonsWrap qd-bb-qtyButtonsWrap"> <li> <span class="qd-bb-btMore btAmnout btPlus"> + </span> </li> <li> <span class="qd-bb-btMinus btAmnout btMinus"> - </span> </li> </ul>');
a.after(b);b.find(".qd-bb-btMore").bind("click",function(){a.val((parseInt(a.val())||0)+1);a.change()});b.find(".qd-bb-btMinus").bind("click",function(){var b=parseInt(a.val())||1;a.val((2>b?2:b)-1);a.change()})}})};(function(){var a=c(b.buyButton);a.append('<span class="qd-bb-productAdded"><i class="icon-thumbs-up"></i> <span>Produto adicionado</span></span>');p(a);a.is(".buy-in-page-button")&&b.isProductPage()&&l.call(a);m(a);b.isProductPage()&&!a.length&&k("Oooops!\nAparentemente esta \u00e9 uma p\u00e1gina de produto por\u00e9m n\u00e3o encontrei nenhum bot\u00e3o comprar!\nVerifique se \u00e9 este mesmo o seletor: '"+
a.selector+"'.","info")})();"function"===typeof b.callback?b.callback.call(this):k("Callback n\u00e3o \u00e9 uma fun\u00e7\u00e3o")};c.fn.QD_buyButton=function(a,e){"undefined"!==typeof e||"object"!==typeof a||a instanceof c||(e=a,a=void 0);var h=c(this);b=c.extend({},l,e);h.prepend('<span class="qd-bb-itemAddWrapper"><span class="qd-bb-itemAddIco"></span></span>');return c.extend({},h,new c.QD_buyButton(this,a))}}catch(t){"undefined"!==typeof console&&"function"===typeof console.error&&console.error("Oooops! ",
t)}})(this);
/* Quatro Digital - VTEX Checkout Queue // 1.1 //  Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
(function(){var l=function(a,c){if("object"===typeof console){var d="object"===typeof a;"undefined"!==typeof c&&"alerta"===c.toLowerCase()?d?console.warn("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.warn("[QD VTEX Checkout Queue]\n"+a):"undefined"!==typeof c&&"info"===c.toLowerCase()?d?console.info("[QD VTEX Checkout Queue]\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):console.info("[QD VTEX Checkout Queue]\n"+a):d?console.error("[QD VTEX Checkout Queue]\n",a[0],a[1],
a[2],a[3],a[4],a[5],a[6],a[7]):console.error("[QD VTEX Checkout Queue]\n"+a)}},f=null,g={},h={},e={};$.QD_checkoutQueue=function(a,c){if(null===f)if("object"===typeof window.vtexjs&&"undefined"!==typeof window.vtexjs.checkout)f=window.vtexjs.checkout;else return l("N\u00e3o foi encontrada a biblioteca VTEX.js. Este componente para por aqui, a for\u00e7a n\u00e3o esta mais contigo neste jornada! Para resolver isto inclua a biblioteca VTEX.js");var d=$.extend({done:function(){},fail:function(){}},c),
b=a.join(";"),k=function(){g[b].add(d.done);h[b].add(d.fail)};e[b]?k():(g[b]=$.Callbacks(),h[b]=$.Callbacks(),k(),e[b]=!0,f.getOrderForm(a).done(function(a){e[b]=!1;g[b].fire(a)}).fail(function(a){e[b]=!1;h[b].fire(a)}))}})();
/*PHP JS - Number Format - http://phpjs.org/functions/number_format/*/
function qd_number_format(b,c,d,e){b=(b+"").replace(/[^0-9+\-Ee.]/g,"");b=isFinite(+b)?+b:0;c=isFinite(+c)?Math.abs(c):0;e="undefined"===typeof e?",":e;d="undefined"===typeof d?".":d;var a="",a=function(a,b){var c=Math.pow(10,b);return""+(Math.round(a*c)/c).toFixed(b)},a=(c?a(b,c):""+Math.round(b)).split(".");3<a[0].length&&(a[0]=a[0].replace(/\B(?=(?:\d{3})+(?!\d))/g,e));(a[1]||"").length<c&&(a[1]=a[1]||"",a[1]+=Array(c-a[1].length+1).join("0"));return a.join(d)};
/* Quatro Digital Simple Cart // 4.13 // Carlos Vinicius [ QUATRO DIGITAL ] // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(9(){s b=20;x("9"!==i b.v.t){b(9(){s b=V.D.F;V.D.F=9(){J b.Y()}});1s{8.17=8.17||{};8.17.21=!1;b.v.t=9(c,n,h){s d,k,g,f,l,p,q,r,m;k=9(a,b){x("E"===i u){s e="E"===i a;"z"!==i b&&"1g"===b.1r()?e?u.1q("[C y]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):u.1q("[C y]\\n"+a):"z"!==i b&&"18"===b.1r()?e?u.18("[C y]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):u.18("[C y]\\n"+a):e?u.W("[C y]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):u.W("[C y]\\n"+a)}};d=b(w);"E"===i c?n=c:(c=c||!1,d=d.1p(b.v.t.K));x(!d.I)J d;b.v.t.K=b.v.t.K.1p(d);h="z"===i h?!1:h;f=b.1b({},{1k:".1W",1e:".1X",1f:".22",T:"R$ ",1m:!0,1a:!0,A:9(){}},n);g=b("");d.19(9(){s a=b(w);a.L("M")||a.L("M",f)});m=9(a){8.j=8.j||{};1n(s b=0,e=0,c=0;c<a.H.I;c++)"23"==a.H[c].29&&(e+=a.H[c].1o),b+=a.H[c].1o;8.j.1d=f.T+X(b/14,2,",",".");8.j.28=f.T+X(e/14,2,",",".");8.j.27=f.T+X((b+e)/14,2,",",".");8.j.S=0;x(f.1m)1n(c=0;c<a.P.I;c++)8.j.S+=a.P[c].2b;Z 8.j.S=a.P.I||0;1s{8.j.A&&8.j.A.1t&&8.j.A.1t()}1y(d){k("1I 1G o A 1J 1F y")}r(g)};l=9(a,b){1===a?b.1x().1l(".1v").12():b.1x().1l(".1u").12()};q=9(a){1>a?d.1i("16-13"):d.1Q("16-13")};p=9(a,b){s c;c=1R(8.j.S,10);b.$w.12();2c(c)&&(k("O 1z 1O 11 1L o 1u/1v n\\U \\1B 1N n\\26! O 1z 2p\\2q 2u 11 0.","1g"),c=0);b.1j.1c(8.j.1d);b.1A.1c(c);l(c,b.1h);q(c)};r=9(a){d.19(9(){s d={},e;e=b(w);c&&e.L("M")&&b.1b(f,e.L("M"));d.$w=e;d.1A=e.Q(f.1k)||g;d.1j=e.Q(f.1e)||g;d.1h=e.Q(f.1f)||g;d.2k=e.Q(f.13)||g;p(a,d);e.1i("16-2y-2r")})};(9(){x(f.1a){8.G=8.G||{};x("z"!==i 8.G.F&&(h?h:!c))J m(8.G.F);x("E"!==i 8.V||"z"===i 8.V.D)x("E"===i B&&"E"===i B.D&&"z"!==i B.D.1w)2m B.D.1w;Z J k("N\\U 1C 2z a 2t 1P.2o");b.2f(["P","H","2d"],{2l:9(a){m(a);8.G.F=a},2h:9(a){k(["N\\U 1C 2g\\2x 2v 2s 1M 11 o 1S.",a])}})}Z 1E("1K \\1B 1H 1T\\1U\\U 25 =/")})();f.A();b(8).2a("1V.1Z");J d};b.v.t.K=b("");b(9(){s c;"9"===i 8.15&&(c=8.15,8.15=9(l,h,d,k,g){c.Y(w,l,h,d,k,9(){"9"===i g&&g();b.v.t.K.19(9(){s c;c=b(w);c.t(c.L("M"))})})})});s l=8.1D||24 0;8.1D=9(c){b.v.t(!0);"9"===i l?l.Y(w,c):1E(c)};b(9(){s c=b(".2w");c.I&&c.t()});b(9(){b(8).2i("2n 2e.B 2j.B",9(){b.v.t(!0)})})}1y(c){"z"!==i u&&"9"===i u.W&&u.W("1Y! ",c)}}})();',62,160,'||||||||window|function|||||||||typeof|_QuatroDigital_CartData|||||||||var|simpleCart|console|fn|this|if|Cart|undefined|callback|vtex|Simple|checkout|object|getOrderForm|_QuatroDigital_DropDown|totalizers|length|return|elements|data|qd_simpleCartOpts|||items|find||qtt|currencySymbol|u00e3o|vtexjs|error|qd_number_format|call|else||para|show|emptyCart|100|ajaxRequestbuyButtonAsynchronous|qd|QuatroDigital_simpleCart|info|each|smartCheckout|extend|html|total|cartTotal|itemsText|alerta|itemsTextE|addClass|cartTotalE|cartQtt|filter|showQuantityByItems|for|value|add|warn|toLowerCase|try|fire|plural|singular|SDK|hide|catch|valor|cartQttE|u00e9|foi|ReloadItemsCart|alert|Smart|com|uma|Problemas|do|Esta|calcular|dados|um|obtido|VTEX|removeClass|parseInt|carrinho|fun|u00e7|simpleCartCallback|qd_cart_qtt|qd_cart_total|Oooops|quatro_digital|jQuery|ajaxStopOn|qd_items_text|Shipping|void|descontinuada|u00famero|allTotal|shipping|id|trigger|quantity|isNaN|shippingData|minicartUpdated|QD_checkoutQueue|poss|fail|bind|cartProductAdded|emptyElem|done|new|productAddedToCart|js|ser|u00e1|populated|os|biblioteca|definido|obter|qd_cart_auto|u00edvel|sc|encontrada'.split('|'),0,{}));
/* Quatro Digital Amazing Menu // 2.11 // Carlos Vinicius // Todos os direitos reservados */
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('(i(n){q b,h,g,l;b=2H;H("i"!==T b.1i.U){h={R:"/p-1A-S",1g:i(){}};q k=i(a,b){H("1M"===T I){q d="1M"===T a;"1C"!==T b&&"1N"===b.Q()?d?I.1B("[M K J]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):I.1B("[M K J]\\n"+a):"1C"!==T b&&"1f"===b.Q()?d?I.1f("[M K J]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):I.1f("[M K J]\\n"+a):d?I.1h("[M K J]\\n",a[0],a[1],a[2],a[3],a[4],a[5],a[6],a[7]):I.1h("[M K J]\\n"+a)}};b.1i.Y=i(){q a=b(v);a.E(i(a){b(v).w("p-r-G-"+a)});a.10().w("p-r-10");a.1k().w("p-r-1k");C a};l=i(a){q c,d;a=a.D(".2S");c=a.1x(".p-r-11");d=a.1x(".p-r-1O");H(c.F||d.F)c.V().w("p-r-11-1y"),d.V().w("p-r-1O-1y"),b.2T({R:g.R,1Y:"1R",1W:i(a){q m=b(a);c.E(i(){q a,e;e=b(v);a=m.D("1S[1T=\'"+e.1r("1L-1w-1E")+"\']");a.F&&(a.E(i(){b(v).1u(".1U-11").1G().1z(e)}),e.1F())}).w("p-r-1K-1D");d.E(i(){q a={},e;e=b(v);m.D("2p").E(i(){H(b(v).1H().1a().Q()==e.1r("1L-1w-1E").1a().Q())C a=b(v),!1});a.F&&(a.E(i(){b(v).1u("[29*=\'2a\']").1G().1z(e)}),e.1F())}).w("p-r-1K-1D")},1h:i(){k("N\\1I 2b 2c\\28 27 21 22 1J S. A R \'"+g.R+"\' 23.")},24:2d})};b.U=i(a){q c=i(a){q b={j:"20%8%1q%8%x%8%B",2l:"2m%8%x%8%B",2n:"2o%8%1j%8%x%8%B",2k:"2j%8%15%8%x%8%B",2f:"2g%8%1c%8%x%8%B",2h:"c-1b%8%1j%8%x%8%B",1t:"-1b%8%15%8%x%8%B","1t-":"1b%8%1c%8%x%8%B","14%8%":"1q%8%1j%8%x%8%B","14%8%2":"2i%8%15%8%x%8%B","14%8%25":"1V%8%1c%8%x%8%B"};C i(a){q d,e,f,c;e=i(a){C a};f=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o"];a=a["d"+f[16]+"c"+f[17]+"m"+e(f[1])+"n"+f[13]]["l"+f[18]+"c"+f[0]+"1X"+e("o")+"n"];d=i(a){C 1Z(1Q(a.W(/\\./g,"\\1P").W(/[a-2e-Z]/g,i(a){C 2y.3e(("Z">=a?2R:2X)>=(a=a.3f(0)+13)?a:a-26)})))};2Y(q g 2Z b){H(d(a[[f[9],e("o"),f[12],f[e(13)]].1v("")])===g+b[g]){c="30"+f[17]+"e";31}c="f"+f[0]+"2W"+e(f[1])+""}e=!1;-1<a[[f[12],"e",f[0],"2U",f[9]].1v("")].32("33%1n%1l%1m%1e%1d%1e%3b%3c%3d%1p%3a%1p%2q%1e%1d%1n%1l%1m%39%1d")&&(e=!0);C[c,e]}(a)}(n);H(!35(c[0]))C c[1]?k("\\34\\36\\1s \\37\\O\\38\\2V\\1o\\O\\1o\\1s \\2P\\O\\2Q\\O \\2z\\2A\\2B\\O L\\2x\\O!"):!1;c=a.D("P[2w]").E(i(){q d,c;d=b(v);H(!d.F)C k(["2s 1J S n\\1I 2r",a],"1N");d.D("G >P").V().w("p-r-2t-P");d.D("G").E(i(){q a=b(v),c;c=a.X(":2u(P)");c.F&&a.w("p-r-2v-"+c.10().1H().1a().2C().W(/\\./g,"").W(/\\s/g,"-").Q())});c=d.D(">G").Y();d.w("p-1A-S");c=c.D(">P");c.E(i(){q a=b(v);a.D(">G").Y().w("p-r-2D");a.w("p-r-19-S");a.V().w("p-r-19")});c.w("p-r-19");q g=0,h=i(a){g+=1;a=a.X("G").X("*");a.F&&(a.w("p-r-2L-"+g),h(a))};h(d);d.2M(d.D("P")).E(i(){q a=b(v);a.w("p-r-"+a.X("G").F+"-G")})});l(c);g.1g.2N(v);b(2O).2K("2J.r.1g",a)};b.1i.U=i(a){q c=b(v);H(!c.F)C c;g=b.2F({},h,a);c.2E=2G b.U(b(v));C c};b(i(){b(".2I").U()})}})(v);',62,202,'||||||||25C2||||||||||function|||||||qd|var|am||||this|addClass|25A8pbz||||25A8oe|return|find|each|length|li|if|console|Menu|Amazing||QD||u0391|ul|toLowerCase|url|menu|typeof|QD_amazingMenu|parent|replace|children|qdAmAddNdx||first|banner|||jjj|25A8igrkpbzzreprorgn||||dropdown|trim|znubtnal|25A8igrkpbzzreprfgnoyr|82|D1|info|callback|error|fn|25A8igrkpbzzrepr|last|B8|84|E0|u2202|C2|25A8znubtnal|attr|u0472|qrirybc|getParent|join|qdam|filter|wrapper|insertBefore|amazing|warn|undefined|loaded|value|hide|clone|text|u00e3o|do|content|data|object|alerta|collection|u00a8|encodeURIComponent|html|img|alt|box|A8znubtnal|success|ti|dataType|escape|jj|os|dados|falho|clearQueueDelay|||obter|u00edvel|class|colunas|foi|poss|3E3|zA|znubt|nal|qriryb|5A8znubtnal|tnal|znub|zn|ubtnal|znu|btnal|h2|A1|encontrada|UL|has|not|elem|itemscope|u0472J|String|u0aef|u0abd|u01ac|replaceSpecialChars|column|exec|extend|new|jQuery|qd_amazing_menu_auto|QuatroDigital|trigger|level|add|call|window|u03a1|u0ae8|90|qd_am_code|qdAjax|rc|u00a1|ls|122|for|in|tr|break|indexOf|qu|u0e17|eval|u00c3|u221a|u2113|C5|A1g|8F|CF|83d|fromCharCode|charCodeAt'.split('|'),0,{}));
/* Smart Tabs - Automatização de Abas // Carlos Vinicius -  Quatro Digital // 1.4 // Todos os direitos reservados */
"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
$(function(){var g;g={tabsWithShelf:function(){$(".qd-smartTabsCollections").each(function(){var c,a,b;c=$(this);a=c.find(".qd-tabNav");b=0;c.find(".qd-collections >div").each(function(){var c,d;c=$(this).addClass("qd-tabContent").addClass("qd_itemContent-"+b);d=$("<li class='qd_itemTitle-"+b+"'></li>").append($("<span></span>").html(c.find(">h2").html()||""));a.append(d);0===b&&(d.addClass("qd-activeTab"),c.addClass("qd-activeContent"));b++});a.find(">li:last").addClass("last");c.addClass("qd-smartTabs")})},
configs:function(c){if(c.length){var a,b,e,d;a=c.attr("data-tabs")||"";c={hideEmpty:null};a=a.split(/\;\s*/);for(b in a)"string"===typeof a[b]&&""!==a[b]&&(e=a[b].split(":"),d=e.shift(),"hideEmpty"===d?c.hideEmpty=e.pop().trim():"showCallback"===d&&(c.showCallback=window[e.pop().trim()]||null));return c}},tabs:function(){$(".qd-smartTabs").each(function(){function c(){var c=a.find(".qd-activeTab");"function"===typeof e.showCallback&&c.length&&e.showCallback(c,a.find(".qd-activeContent"))}var a,b,
e,d,f,k;a=$(this);e=g.configs(a);b=a.find(".qd-tabNav");if(a.find(".box-banner").length){var h=$('<ul class="qd-tabNav"/>').appendTo(a);k=a.find(".box-banner");k.each(function(c,d){var b=$(d);b.addClass("qd-tabContent");h.append("<li>"+b.find("img").attr("alt")+"</li>");b.appendTo(a)});h.find("li:first").addClass("qd-activeTab");a.find(".box-banner:first").addClass("qd-activeContent");h.children("li").bind("click",function(){var b=$(this);if(b.hasClass("qd-activeTab"))return!1;h.find("li").removeClass("qd-activeTab");
b.addClass("qd-activeTab");d=a.find(".qd-tabContent");f=d.eq(b.index());f.is(".qd-activeContent")||(d.hide().removeClass("qd-activeContent"),f.fadeTo(300,1).addClass("qd-activeContent"),c())})}b.children("li").bind("click",function(){var e=$(this);if(e.hasClass("qd-activeTab"))return!1;b.find("li").removeClass("qd-activeTab");e.addClass("qd-activeTab");d=a.find(".qd-tabContent");f=d.eq(e.index());f.is(".qd-activeContent")||(d.hide().removeClass("qd-activeContent"),f.fadeTo(300,1).addClass("qd-activeContent"),
c())});"false"!==e.hideEmpty&&(d=a.find(".qd-tabContent"),d.each(function(){var a;a=$(this);0<a.text().trim().length||(a.addClass("qd-noContent").hide(),b.children("li:eq("+d.index(a)+")").addClass("qd-noContent").hide())}),b.children("li:not(.qd-noContent):first").trigger("click"));c()})}};g.tabsWithShelf();g.tabs()});
/* Quatro Digital - Scroll Toggle // 1.1 // Carlos Vinicius // Todos os direitos reservados */
(function(){var b=jQuery,d=function(a,c){if("object"===typeof console){var b;"object"===typeof a?(a.unshift("[QD Scroll Toggle]\n"),b=a):b=["[QD Scroll Toggle]\n"+a];"undefined"===typeof c||"alerta"!==c.toLowerCase()&&"aviso"!==c.toLowerCase()?"undefined"!==typeof c&&"info"===c.toLowerCase()?console.info.apply(console,b):console.error.apply(console,b):console.warn.apply(console,b)}};"function"!==typeof b.QD_scrollToggle&&(b.QD_scrollToggle=function(a){var c=[];if("string"!==typeof a&&"number"!==typeof a||
"auto"===a)if("auto"===a)c.push(b(window).height());else return d("N\u00e3o foi informado o limite de scroll necess\u00e1rio para adicionar o atributo.");else{var e=a.split(","),f;for(f in e)"function"!==typeof e[f]&&(a=parseInt(e[f].trim()),isNaN(a)||c.push(a))}if(!c.length)return d("Aaeeeeeeee irm\u00e3o! N\u00e3o consegui encontrar nenhum valor para calcular o scroll");if(!document||!document.body||"function"!==typeof document.body.setAttribute)return d('"document.body.setAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');
if(!document||!document.body||"function"!==typeof document.body.removeAttribute)return d('"document.body.removeAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!document||!document.body||"function"!==typeof document.body.getAttribute)return d('"document.body.getAttribute" N\u00e3o \u00e9 uma fun\u00e7\u00e3o :(');if(!b(window).scrollTop||isNaN(parseInt(b(window).scrollTop())))return d('"$(window).scrollTop" n\u00e3o esta retornando um n\u00famero inteiro :(');try{document.body.setAttribute("data-qd-scroll",
1),document.body.getAttribute("data-qd-scroll"),document.body.removeAttribute("data-qd-scroll"),document.body.getAttribute("data-qd-scroll")}catch(g){d("N\u00e3o foi poss\u00edvel fazer o passo a passo de consultar, adicionar e remover um atributo",g.message)}b(window).scroll(function(){for(var a=0;a<c.length;a++)b(window).scrollTop()>c[a]?document.body.getAttribute("data-qd-scroll-"+a)||document.body.setAttribute("data-qd-scroll-"+a,1):document.body.getAttribute("data-qd-scroll-"+a)&&document.body.removeAttribute("data-qd-scroll-"+
a)})},b(function(){var a=b("body[data-qd-scroll-limit]");a.length&&b.QD_scrollToggle(a.attr("data-qd-scroll-limit"))}))})();
// jQuery Mask Plugin v1.10.13 // github.com/igorescobar/jQuery-Mask-Plugin
(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(window.jQuery||window.Zepto)})(function(b){var y=function(a,d,e){a=b(a);var g=this,q=a.val(),h;d="function"===typeof d?d(a.val(),void 0,a,e):d;var c={invalid:[],getCaret:function(){try{var k,p=0,b=a.get(0),f=document.selection,c=b.selectionStart;if(f&&-1===navigator.appVersion.indexOf("MSIE 10"))k=f.createRange(),k.moveStart("character",a.is("input")?-a.val().length:-a.text().length),p=k.text.length;else if(c||"0"===c)p=c;
return p}catch(d){}},setCaret:function(k){try{if(a.is(":focus")){var p,c=a.get(0);c.setSelectionRange?c.setSelectionRange(k,k):c.createTextRange&&(p=c.createTextRange(),p.collapse(!0),p.moveEnd("character",k),p.moveStart("character",k),p.select())}}catch(f){}},events:function(){a.on("keyup.mask",c.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){a.keydown().keyup()},100)}).on("change.mask",function(){a.data("changed",!0)}).on("blur.mask",function(){q===a.val()||a.data("changed")||
a.trigger("change");a.data("changed",!1)}).on("keydown.mask, blur.mask",function(){q=a.val()}).on("focusout.mask",function(){e.clearIfNotMatch&&!h.test(c.val())&&c.val("")})},getRegexMask:function(){for(var k=[],a,c,f,b,e=0;e<d.length;e++)(a=g.translation[d[e]])?(c=a.pattern.toString().replace(/.{1}$|^.{1}/g,""),f=a.optional,(a=a.recursive)?(k.push(d[e]),b={digit:d[e],pattern:c}):k.push(f||a?c+"?":c)):k.push(d[e].replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));k=k.join("");b&&(k=k.replace(RegExp("("+b.digit+
"(.*"+b.digit+")?)"),"($1)?").replace(RegExp(b.digit,"g"),b.pattern));return RegExp(k)},destroyEvents:function(){a.off("keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(k){var c=a.is("input")?"val":"text";if(0<arguments.length){if(a[c]()!==k)a[c](k);c=a}else c=a[c]();return c},getMCharsBeforeCount:function(c,a){for(var b=0,f=0,e=d.length;f<e&&f<c;f++)g.translation[d.charAt(f)]||(c=a?c+1:c,b++);return b},caretPos:function(a,b,e,f){return g.translation[d.charAt(Math.min(a-
1,d.length-1))]?Math.min(a+e-b-f,e):c.caretPos(a+1,b,e,f)},behaviour:function(a){a=a||window.event;c.invalid=[];var e=a.keyCode||a.which;if(-1===b.inArray(e,g.byPassKeys)){var d=c.getCaret(),f=c.val().length,n=d<f,l=c.getMasked(),h=l.length,m=c.getMCharsBeforeCount(h-1)-c.getMCharsBeforeCount(f-1);c.val(l);!n||65===e&&a.ctrlKey||(8!==e&&46!==e&&(d=c.caretPos(d,f,h,m)),c.setCaret(d));return c.callbacks(a)}},getMasked:function(a){var b=[],h=c.val(),f=0,n=d.length,l=0,q=h.length,m=1,u="push",v=-1,t,
r;e.reverse?(u="unshift",m=-1,t=0,f=n-1,l=q-1,r=function(){return-1<f&&-1<l}):(t=n-1,r=function(){return f<n&&l<q});for(;r();){var x=d.charAt(f),w=h.charAt(l),s=g.translation[x];if(s)w.match(s.pattern)?(b[u](w),s.recursive&&(-1===v?v=f:f===t&&(f=v-m),t===v&&(f-=m)),f+=m):s.optional?(f+=m,l-=m):s.fallback?(b[u](s.fallback),f+=m,l-=m):c.invalid.push({p:l,v:w,e:s.pattern}),l+=m;else{if(!a)b[u](x);w===x&&(l+=m);f+=m}}a=d.charAt(t);n!==q+1||g.translation[a]||b.push(a);return b.join("")},callbacks:function(b){var g=
c.val(),h=g!==q,f=[g,b,a,e],n=function(a,c,b){"function"===typeof e[a]&&c&&e[a].apply(this,b)};n("onChange",!0===h,f);n("onKeyPress",!0===h,f);n("onComplete",g.length===d.length,f);n("onInvalid",0<c.invalid.length,[g,b,a,c.invalid,e])}};g.mask=d;g.options=e;g.remove=function(){var b=c.getCaret();c.destroyEvents();c.val(g.getCleanVal());c.setCaret(b-c.getMCharsBeforeCount(b));return a};g.getCleanVal=function(){return c.getMasked(!0)};g.init=function(d){d=d||!1;e=e||{};g.byPassKeys=b.jMaskGlobals.byPassKeys;
g.translation=b.jMaskGlobals.translation;g.translation=b.extend({},g.translation,e.translation);g=b.extend(!0,{},g,e);h=c.getRegexMask();!1===d?(e.placeholder&&a.attr("placeholder",e.placeholder),a.attr("autocomplete","off"),c.destroyEvents(),c.events(),d=c.getCaret(),c.val(c.getMasked()),c.setCaret(d+c.getMCharsBeforeCount(d,!0))):(c.events(),c.val(c.getMasked()))};g.init(!a.is("input"))};b.maskWatchers={};var A=function(){var a=b(this),d={},e=a.attr("data-mask");a.attr("data-mask-reverse")&&(d.reverse=
!0);a.attr("data-mask-clearifnotmatch")&&(d.clearIfNotMatch=!0);if(z(a,e,d))return a.data("mask",new y(this,e,d))},z=function(a,d,e){e=e||{};var g=b(a).data("mask"),h=JSON.stringify;a=b(a).val()||b(a).text();try{return"function"===typeof d&&(d=d(a)),"object"!==typeof g||h(g.options)!==h(e)||g.mask!==d}catch(r){}};b.fn.mask=function(a,d){d=d||{};var e=this.selector,g=b.jMaskGlobals,h=b.jMaskGlobals.watchInterval,r=function(){if(z(this,a,d))return b(this).data("mask",new y(this,a,d))};b(this).each(r);
e&&""!==e&&g.watchInputs&&(clearInterval(b.maskWatchers[e]),b.maskWatchers[e]=setInterval(function(){b(document).find(e).each(r)},h))};b.fn.unmask=function(){clearInterval(b.maskWatchers[this.selector]);delete b.maskWatchers[this.selector];return this.each(function(){var a=b(this).data("mask");a&&a.remove().removeData("mask")})};b.fn.cleanVal=function(){return this.data("mask").getCleanVal()};var h={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,
watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};b.jMaskGlobals=b.jMaskGlobals||{};h=b.jMaskGlobals=b.extend(!0,{},h,b.jMaskGlobals);h.dataMask&&b(h.dataMaskAttr).each(A);setInterval(function(){b.jMaskGlobals.watchDataMask&&b(document).find(b.jMaskGlobals.maskElements).filter(h.dataMaskAttr).each(A)},h.watchInterval)});
/*! jQuery Validation Plugin - v1.13.1 - 10/14/2014 * http://jqueryvalidation.org/ * Copyright (c) 2014 Jörn Zaefferer; Licensed MIT */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a(jQuery)}(function(a){a.extend(a.fn,{validate:function(b){if(!this.length)return void(b&&b.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));var c=a.data(this[0],"validator");return c?c:(this.attr("novalidate","novalidate"),c=new a.validator(b,this[0]),a.data(this[0],"validator",c),c.settings.onsubmit&&(this.validateDelegate(":submit","click",function(b){c.settings.submitHandler&&(c.submitButton=b.target),a(b.target).hasClass("cancel")&&(c.cancelSubmit=!0),void 0!==a(b.target).attr("formnovalidate")&&(c.cancelSubmit=!0)}),this.submit(function(b){function d(){var d,e;return c.settings.submitHandler?(c.submitButton&&(d=a("<input type='hidden'/>").attr("name",c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)),e=c.settings.submitHandler.call(c,c.currentForm,b),c.submitButton&&d.remove(),void 0!==e?e:!1):!0}return c.settings.debug&&b.preventDefault(),c.cancelSubmit?(c.cancelSubmit=!1,d()):c.form()?c.pendingRequest?(c.formSubmitted=!0,!1):d():(c.focusInvalid(),!1)})),c)},valid:function(){var b,c;return a(this[0]).is("form")?b=this.validate().form():(b=!0,c=a(this[0].form).validate(),this.each(function(){b=c.element(this)&&b})),b},removeAttrs:function(b){var c={},d=this;return a.each(b.split(/\s/),function(a,b){c[b]=d.attr(b),d.removeAttr(b)}),c},rules:function(b,c){var d,e,f,g,h,i,j=this[0];if(b)switch(d=a.data(j.form,"validator").settings,e=d.rules,f=a.validator.staticRules(j),b){case"add":a.extend(f,a.validator.normalizeRule(c)),delete f.messages,e[j.name]=f,c.messages&&(d.messages[j.name]=a.extend(d.messages[j.name],c.messages));break;case"remove":return c?(i={},a.each(c.split(/\s/),function(b,c){i[c]=f[c],delete f[c],"required"===c&&a(j).removeAttr("aria-required")}),i):(delete e[j.name],f)}return g=a.validator.normalizeRules(a.extend({},a.validator.classRules(j),a.validator.attributeRules(j),a.validator.dataRules(j),a.validator.staticRules(j)),j),g.required&&(h=g.required,delete g.required,g=a.extend({required:h},g),a(j).attr("aria-required","true")),g.remote&&(h=g.remote,delete g.remote,g=a.extend(g,{remote:h})),g}}),a.extend(a.expr[":"],{blank:function(b){return!a.trim(""+a(b).val())},filled:function(b){return!!a.trim(""+a(b).val())},unchecked:function(b){return!a(b).prop("checked")}}),a.validator=function(b,c){this.settings=a.extend(!0,{},a.validator.defaults,b),this.currentForm=c,this.init()},a.validator.format=function(b,c){return 1===arguments.length?function(){var c=a.makeArray(arguments);return c.unshift(b),a.validator.format.apply(this,c)}:(arguments.length>2&&c.constructor!==Array&&(c=a.makeArray(arguments).slice(1)),c.constructor!==Array&&(c=[c]),a.each(c,function(a,c){b=b.replace(new RegExp("\\{"+a+"\\}","g"),function(){return c})}),b)},a.extend(a.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusCleanup:!1,focusInvalid:!0,errorContainer:a([]),errorLabelContainer:a([]),onsubmit:!0,ignore:":hidden",ignoreTitle:!1,onfocusin:function(a){this.lastActive=a,this.settings.focusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,a,this.settings.errorClass,this.settings.validClass),this.hideThese(this.errorsFor(a)))},onfocusout:function(a){this.checkable(a)||!(a.name in this.submitted)&&this.optional(a)||this.element(a)},onkeyup:function(a,b){(9!==b.which||""!==this.elementValue(a))&&(a.name in this.submitted||a===this.lastElement)&&this.element(a)},onclick:function(a){a.name in this.submitted?this.element(a):a.parentNode.name in this.submitted&&this.element(a.parentNode)},highlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).addClass(c).removeClass(d):a(b).addClass(c).removeClass(d)},unhighlight:function(b,c,d){"radio"===b.type?this.findByName(b.name).removeClass(c).addClass(d):a(b).removeClass(c).addClass(d)}},setDefaults:function(b){a.extend(a.validator.defaults,b)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date ( ISO ).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:a.validator.format("Please enter no more than {0} characters."),minlength:a.validator.format("Please enter at least {0} characters."),rangelength:a.validator.format("Please enter a value between {0} and {1} characters long."),range:a.validator.format("Please enter a value between {0} and {1}."),max:a.validator.format("Please enter a value less than or equal to {0}."),min:a.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:!1,prototype:{init:function(){function b(b){var c=a.data(this[0].form,"validator"),d="on"+b.type.replace(/^validate/,""),e=c.settings;e[d]&&!this.is(e.ignore)&&e[d].call(c,this[0],b)}this.labelContainer=a(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||a(this.currentForm),this.containers=a(this.settings.errorContainer).add(this.settings.errorLabelContainer),this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},this.reset();var c,d=this.groups={};a.each(this.settings.groups,function(b,c){"string"==typeof c&&(c=c.split(/\s/)),a.each(c,function(a,c){d[c]=b})}),c=this.settings.rules,a.each(c,function(b,d){c[b]=a.validator.normalizeRule(d)}),a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']","focusin focusout keyup",b).validateDelegate("select, option, [type='radio'], [type='checkbox']","click",b),this.settings.invalidHandler&&a(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler),a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required","true")},form:function(){return this.checkForm(),a.extend(this.submitted,this.errorMap),this.invalid=a.extend({},this.errorMap),this.valid()||a(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),this.valid()},checkForm:function(){this.prepareForm();for(var a=0,b=this.currentElements=this.elements();b[a];a++)this.check(b[a]);return this.valid()},element:function(b){var c=this.clean(b),d=this.validationTargetFor(c),e=!0;return this.lastElement=d,void 0===d?delete this.invalid[c.name]:(this.prepareElement(d),this.currentElements=a(d),e=this.check(d)!==!1,e?delete this.invalid[d.name]:this.invalid[d.name]=!0),a(b).attr("aria-invalid",!e),this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),this.showErrors(),e},showErrors:function(b){if(b){a.extend(this.errorMap,b),this.errorList=[];for(var c in b)this.errorList.push({message:b[c],element:this.findByName(c)[0]});this.successList=a.grep(this.successList,function(a){return!(a.name in b)})}this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors()},resetForm:function(){a.fn.resetForm&&a(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(a){var b,c=0;for(b in a)c++;return c},hideErrors:function(){this.hideThese(this.toHide)},hideThese:function(a){a.not(this.containers).text(""),this.addWrapper(a).hide()},valid:function(){return 0===this.size()},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid)try{a(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(b){}},findLastActive:function(){var b=this.lastActive;return b&&1===a.grep(this.errorList,function(a){return a.element.name===b.name}).length&&b},elements:function(){var b=this,c={};return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function(){return!this.name&&b.settings.debug&&window.console&&console.error("%o has no name assigned",this),this.name in c||!b.objectLength(a(this).rules())?!1:(c[this.name]=!0,!0)})},clean:function(b){return a(b)[0]},errors:function(){var b=this.settings.errorClass.split(" ").join(".");return a(this.settings.errorElement+"."+b,this.errorContext)},reset:function(){this.successList=[],this.errorList=[],this.errorMap={},this.toShow=a([]),this.toHide=a([]),this.currentElements=a([])},prepareForm:function(){this.reset(),this.toHide=this.errors().add(this.containers)},prepareElement:function(a){this.reset(),this.toHide=this.errorsFor(a)},elementValue:function(b){var c,d=a(b),e=b.type;return"radio"===e||"checkbox"===e?a("input[name='"+b.name+"']:checked").val():"number"===e&&"undefined"!=typeof b.validity?b.validity.badInput?!1:d.val():(c=d.val(),"string"==typeof c?c.replace(/\r/g,""):c)},check:function(b){b=this.validationTargetFor(this.clean(b));var c,d,e,f=a(b).rules(),g=a.map(f,function(a,b){return b}).length,h=!1,i=this.elementValue(b);for(d in f){e={method:d,parameters:f[d]};try{if(c=a.validator.methods[d].call(this,i,b,e.parameters),"dependency-mismatch"===c&&1===g){h=!0;continue}if(h=!1,"pending"===c)return void(this.toHide=this.toHide.not(this.errorsFor(b)));if(!c)return this.formatAndAdd(b,e),!1}catch(j){throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+b.id+", check the '"+e.method+"' method.",j),j}}if(!h)return this.objectLength(f)&&this.successList.push(b),!0},customDataMessage:function(b,c){return a(b).data("msg"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase())||a(b).data("msg")},customMessage:function(a,b){var c=this.settings.messages[a];return c&&(c.constructor===String?c:c[b])},findDefined:function(){for(var a=0;a<arguments.length;a++)if(void 0!==arguments[a])return arguments[a];return void 0},defaultMessage:function(b,c){return this.findDefined(this.customMessage(b.name,c),this.customDataMessage(b,c),!this.settings.ignoreTitle&&b.title||void 0,a.validator.messages[c],"<strong>Warning: No message defined for "+b.name+"</strong>")},formatAndAdd:function(b,c){var d=this.defaultMessage(b,c.method),e=/\$?\{(\d+)\}/g;"function"==typeof d?d=d.call(this,c.parameters,b):e.test(d)&&(d=a.validator.format(d.replace(e,"{$1}"),c.parameters)),this.errorList.push({message:d,element:b,method:c.method}),this.errorMap[b.name]=d,this.submitted[b.name]=d},addWrapper:function(a){return this.settings.wrapper&&(a=a.add(a.parent(this.settings.wrapper))),a},defaultShowErrors:function(){var a,b,c;for(a=0;this.errorList[a];a++)c=this.errorList[a],this.settings.highlight&&this.settings.highlight.call(this,c.element,this.settings.errorClass,this.settings.validClass),this.showLabel(c.element,c.message);if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(a=0;this.successList[a];a++)this.showLabel(this.successList[a]);if(this.settings.unhighlight)for(a=0,b=this.validElements();b[a];a++)this.settings.unhighlight.call(this,b[a],this.settings.errorClass,this.settings.validClass);this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return a(this.errorList).map(function(){return this.element})},showLabel:function(b,c){var d,e,f,g=this.errorsFor(b),h=this.idOrName(b),i=a(b).attr("aria-describedby");g.length?(g.removeClass(this.settings.validClass).addClass(this.settings.errorClass),g.html(c)):(g=a("<"+this.settings.errorElement+">").attr("id",h+"-error").addClass(this.settings.errorClass).html(c||""),d=g,this.settings.wrapper&&(d=g.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()),this.labelContainer.length?this.labelContainer.append(d):this.settings.errorPlacement?this.settings.errorPlacement(d,a(b)):d.insertAfter(b),g.is("label")?g.attr("for",h):0===g.parents("label[for='"+h+"']").length&&(f=g.attr("id").replace(/(:|\.|\[|\])/g,"\\$1"),i?i.match(new RegExp("\\b"+f+"\\b"))||(i+=" "+f):i=f,a(b).attr("aria-describedby",i),e=this.groups[b.name],e&&a.each(this.groups,function(b,c){c===e&&a("[name='"+b+"']",this.currentForm).attr("aria-describedby",g.attr("id"))}))),!c&&this.settings.success&&(g.text(""),"string"==typeof this.settings.success?g.addClass(this.settings.success):this.settings.success(g,b)),this.toShow=this.toShow.add(g)},errorsFor:function(b){var c=this.idOrName(b),d=a(b).attr("aria-describedby"),e="label[for='"+c+"'], label[for='"+c+"'] *";return d&&(e=e+", #"+d.replace(/\s+/g,", #")),this.errors().filter(e)},idOrName:function(a){return this.groups[a.name]||(this.checkable(a)?a.name:a.id||a.name)},validationTargetFor:function(b){return this.checkable(b)&&(b=this.findByName(b.name)),a(b).not(this.settings.ignore)[0]},checkable:function(a){return/radio|checkbox/i.test(a.type)},findByName:function(b){return a(this.currentForm).find("[name='"+b+"']")},getLength:function(b,c){switch(c.nodeName.toLowerCase()){case"select":return a("option:selected",c).length;case"input":if(this.checkable(c))return this.findByName(c.name).filter(":checked").length}return b.length},depend:function(a,b){return this.dependTypes[typeof a]?this.dependTypes[typeof a](a,b):!0},dependTypes:{"boolean":function(a){return a},string:function(b,c){return!!a(b,c.form).length},"function":function(a,b){return a(b)}},optional:function(b){var c=this.elementValue(b);return!a.validator.methods.required.call(this,c,b)&&"dependency-mismatch"},startRequest:function(a){this.pending[a.name]||(this.pendingRequest++,this.pending[a.name]=!0)},stopRequest:function(b,c){this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[b.name],c&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(a(this.currentForm).submit(),this.formSubmitted=!1):!c&&0===this.pendingRequest&&this.formSubmitted&&(a(this.currentForm).triggerHandler("invalid-form",[this]),this.formSubmitted=!1)},previousValue:function(b){return a.data(b,"previousValue")||a.data(b,"previousValue",{old:null,valid:!0,message:this.defaultMessage(b,"remote")})}},classRuleSettings:{required:{required:!0},email:{email:!0},url:{url:!0},date:{date:!0},dateISO:{dateISO:!0},number:{number:!0},digits:{digits:!0},creditcard:{creditcard:!0}},addClassRules:function(b,c){b.constructor===String?this.classRuleSettings[b]=c:a.extend(this.classRuleSettings,b)},classRules:function(b){var c={},d=a(b).attr("class");return d&&a.each(d.split(" "),function(){this in a.validator.classRuleSettings&&a.extend(c,a.validator.classRuleSettings[this])}),c},attributeRules:function(b){var c,d,e={},f=a(b),g=b.getAttribute("type");for(c in a.validator.methods)"required"===c?(d=b.getAttribute(c),""===d&&(d=!0),d=!!d):d=f.attr(c),/min|max/.test(c)&&(null===g||/number|range|text/.test(g))&&(d=Number(d)),d||0===d?e[c]=d:g===c&&"range"!==g&&(e[c]=!0);return e.maxlength&&/-1|2147483647|524288/.test(e.maxlength)&&delete e.maxlength,e},dataRules:function(b){var c,d,e={},f=a(b);for(c in a.validator.methods)d=f.data("rule"+c.charAt(0).toUpperCase()+c.substring(1).toLowerCase()),void 0!==d&&(e[c]=d);return e},staticRules:function(b){var c={},d=a.data(b.form,"validator");return d.settings.rules&&(c=a.validator.normalizeRule(d.settings.rules[b.name])||{}),c},normalizeRules:function(b,c){return a.each(b,function(d,e){if(e===!1)return void delete b[d];if(e.param||e.depends){var f=!0;switch(typeof e.depends){case"string":f=!!a(e.depends,c.form).length;break;case"function":f=e.depends.call(c,c)}f?b[d]=void 0!==e.param?e.param:!0:delete b[d]}}),a.each(b,function(d,e){b[d]=a.isFunction(e)?e(c):e}),a.each(["minlength","maxlength"],function(){b[this]&&(b[this]=Number(b[this]))}),a.each(["rangelength","range"],function(){var c;b[this]&&(a.isArray(b[this])?b[this]=[Number(b[this][0]),Number(b[this][1])]:"string"==typeof b[this]&&(c=b[this].replace(/[\[\]]/g,"").split(/[\s,]+/),b[this]=[Number(c[0]),Number(c[1])]))}),a.validator.autoCreateRanges&&(null!=b.min&&null!=b.max&&(b.range=[b.min,b.max],delete b.min,delete b.max),null!=b.minlength&&null!=b.maxlength&&(b.rangelength=[b.minlength,b.maxlength],delete b.minlength,delete b.maxlength)),b},normalizeRule:function(b){if("string"==typeof b){var c={};a.each(b.split(/\s/),function(){c[this]=!0}),b=c}return b},addMethod:function(b,c,d){a.validator.methods[b]=c,a.validator.messages[b]=void 0!==d?d:a.validator.messages[b],c.length<3&&a.validator.addClassRules(b,a.validator.normalizeRule(b))},methods:{required:function(b,c,d){if(!this.depend(d,c))return"dependency-mismatch";if("select"===c.nodeName.toLowerCase()){var e=a(c).val();return e&&e.length>0}return this.checkable(c)?this.getLength(b,c)>0:a.trim(b).length>0},email:function(a,b){return this.optional(b)||/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)},url:function(a,b){return this.optional(b)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)},date:function(a,b){return this.optional(b)||!/Invalid|NaN/.test(new Date(a).toString())},dateISO:function(a,b){return this.optional(b)||/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)},number:function(a,b){return this.optional(b)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)},digits:function(a,b){return this.optional(b)||/^\d+$/.test(a)},creditcard:function(a,b){if(this.optional(b))return"dependency-mismatch";if(/[^0-9 \-]+/.test(a))return!1;var c,d,e=0,f=0,g=!1;if(a=a.replace(/\D/g,""),a.length<13||a.length>19)return!1;for(c=a.length-1;c>=0;c--)d=a.charAt(c),f=parseInt(d,10),g&&(f*=2)>9&&(f-=9),e+=f,g=!g;return e%10===0},minlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d},maxlength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||d>=e},rangelength:function(b,c,d){var e=a.isArray(b)?b.length:this.getLength(b,c);return this.optional(c)||e>=d[0]&&e<=d[1]},min:function(a,b,c){return this.optional(b)||a>=c},max:function(a,b,c){return this.optional(b)||c>=a},range:function(a,b,c){return this.optional(b)||a>=c[0]&&a<=c[1]},equalTo:function(b,c,d){var e=a(d);return this.settings.onfocusout&&e.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){a(c).valid()}),b===e.val()},remote:function(b,c,d){if(this.optional(c))return"dependency-mismatch";var e,f,g=this.previousValue(c);return this.settings.messages[c.name]||(this.settings.messages[c.name]={}),g.originalMessage=this.settings.messages[c.name].remote,this.settings.messages[c.name].remote=g.message,d="string"==typeof d&&{url:d}||d,g.old===b?g.valid:(g.old=b,e=this,this.startRequest(c),f={},f[c.name]=b,a.ajax(a.extend(!0,{url:d,mode:"abort",port:"validate"+c.name,dataType:"json",data:f,context:e.currentForm,success:function(d){var f,h,i,j=d===!0||"true"===d;e.settings.messages[c.name].remote=g.originalMessage,j?(i=e.formSubmitted,e.prepareElement(c),e.formSubmitted=i,e.successList.push(c),delete e.invalid[c.name],e.showErrors()):(f={},h=d||e.defaultMessage(c,"remote"),f[c.name]=g.message=a.isFunction(h)?h(b):h,e.invalid[c.name]=!0,e.showErrors(f)),g.valid=j,e.stopRequest(c,j)}},d)),"pending")}}}),a.format=function(){throw"$.format has been deprecated. Please use $.validator.format instead."};var b,c={};a.ajaxPrefilter?a.ajaxPrefilter(function(a,b,d){var e=a.port;"abort"===a.mode&&(c[e]&&c[e].abort(),c[e]=d)}):(b=a.ajax,a.ajax=function(d){var e=("mode"in d?d:a.ajaxSettings).mode,f=("port"in d?d:a.ajaxSettings).port;return"abort"===e?(c[f]&&c[f].abort(),c[f]=b.apply(this,arguments),c[f]):b.apply(this,arguments)}),a.extend(a.fn,{validateDelegate:function(b,c,d){return this.bind(c,function(c){var e=a(c.target);return e.is(b)?d.apply(e,arguments):void 0})}})});
/* QD Blog Integration - functions.base add-on // 1.0 */
(function(){try{if(!window.QD_blogIntegrationBlockRedirect && window.top.location != window.location) window.top.location = window.location; } catch(e){if (typeof console !== "undefined" && typeof console.info === "function") console.info("Erro ao verificar se o site esta em um iframe. ", e.message); } })();
/* Quatro Digital - Mosaic Banners // 1.2 // Carlos Vinicius // Todos os direitos reservados */
(function(q){var e=jQuery;if("function"!==typeof e.fn.QD_mosaicBanners){var k=function(c,b){if("object"===typeof console&&"undefined"!==typeof console.error&&"undefined"!==typeof console.info&&"undefined"!==typeof console.warn){var a;"object"===typeof c?(c.unshift("[Quatro Digital - Mosaic Banners]\n"),a=c):a=["[Quatro Digital - Mosaic Banners]\n"+c];if("undefined"===typeof b||"alerta"!==b.toLowerCase()&&"aviso"!==b.toLowerCase())if("undefined"!==typeof b&&"info"===b.toLowerCase())try{console.info.apply(console,
a)}catch(f){try{console.info(a.join("\n"))}catch(d){}}else try{console.error.apply(console,a)}catch(f){try{console.error(a.join("\n"))}catch(d){}}else try{console.warn.apply(console,a)}catch(f){try{console.warn(a.join("\n"))}catch(d){}}}},l={bannerRowSecurityMargin:10,containerWidth:1170,bannerColSecurityMargin:15,classOneColumn:"col-xs-12",classTwoColumn:"col-xs-12 col-sm-6",classThreeColumn:"col-xs-12 col-sm-4",classFourColumn:"col-xs-6 col-sm-3"},m=function(c,b){function a(f){var d,g=new e;f.length&&
(f.each(function(){var f=e(this),a=f.offset().top;d||(d=a);if(a>=d-b.bannerRowSecurityMargin&&a<=d+b.bannerRowSecurityMargin)g=g.add(f);else return!1}),g.wrapAll('<div class="row qd-mb-row"></div>'),a(c.find(">div:not(.row)")))}a(c.find(">div:not(.row)"))},n=/width\=.?([0-9]+)/i,p=function(c,b){var a=e(c);a.each(function(){var a=e(this);if(a.is(".qd-mb-banner"))k(["Este banner j\u00e1 esta processado!",a],"info");else{a.addClass("qd-mb-banner");var d=a.find("img").first();if(d.length){var c=parseInt,
d=d.wrap("<span></span>"),h=d.parent().html();d.unwrap("span");d=h.replace(/\n/g," ");c=c((d.match(n)||[1]).pop(),10)||1;d=b.containerWidth/2*(1-b.bannerColSecurityMargin/2/100);h=b.containerWidth/3*(1-b.bannerColSecurityMargin/3/100);c>b.containerWidth*(1-b.bannerColSecurityMargin/100)?a.addClass(b.classOneColumn):c>d?a.addClass(b.classTwoColumn):c>h?a.addClass(b.classThreeColumn):a.addClass(b.classFourColumn)}else k(["Esse elemento n\u00e3o possui nenhuma imagem dentro. Certifique-se que esteja chamando um \u201c.box-banner\u201d. Mas voc\u00ea \u00e9 burro hein!",
a],"info")}});a.parent().each(function(){m(e(this),b)})};e.fn.QD_mosaicBanners=function(c){var b=e(this);if(!b.length)return b;c=e.extend({},l,c);b.qdPlugin=new p(b,c);return b};e(function(){e(".qd_auto_mosaic_banners .box-banner").QD_mosaicBanners()})}})(this);