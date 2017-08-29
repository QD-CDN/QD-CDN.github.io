/* Quatro Digital - Smart Stock Available // 1.0 // Carlos Vinicius // Todos os direitos reservados */

/*FUNÇÕES AUXILIARES*/
/* Quatro Digital - jQuery Ajax Queue // 2.1 // Carlos Vinicius [ QUATRO DIGITAL ] // MIT <http://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT> */
(function(c){if("function"!==typeof c.qdAjax){var a={};c.qdAjaxQueue=a;c.qdAjax=function(e){var d,b;d=c.extend({},{success:function(){},error:function(){},complete:function(){},clearQueueDelay:0},e);b=escape(encodeURIComponent(d.url));a[b]=a[b]||{};a[b].opts=a[b].opts||[];a[b].opts.push({success:function(a,b,f){d.success.call(this,a,b,f)},error:function(a,b,f){d.error.call(this,a,b,f)},complete:function(a,b){d.complete.call(this,a,b)}});a[b].parameters=a[b].parameters||{success:{},error:{},complete:{}};
a[b].callbackFns=a[b].callbackFns||{};a[b].callbackFns.successPopulated="boolean"===typeof a[b].callbackFns.successPopulated?a[b].callbackFns.successPopulated:!1;a[b].callbackFns.errorPopulated="boolean"===typeof a[b].callbackFns.errorPopulated?a[b].callbackFns.errorPopulated:!1;a[b].callbackFns.completePopulated="boolean"===typeof a[b].callbackFns.completePopulated?a[b].callbackFns.completePopulated:!1;e=c.extend({},d,{success:function(d,g,f){a[b].parameters.success={data:d,textStatus:g,jqXHR:f};
a[b].callbackFns.successPopulated=!0;for(var c in a[b].opts)"object"===typeof a[b].opts[c]&&(a[b].opts[c].success.call(this,d,g,f),a[b].opts[c].success=function(){})},error:function(c,d,f){a[b].parameters.error={errorThrown:f,textStatus:d,jqXHR:c};a[b].callbackFns.errorPopulated=!0;for(var e in a[b].opts)"object"===typeof a[b].opts[e]&&(a[b].opts[e].error.call(this,c,d,f),a[b].opts[e].error=function(){})},complete:function(c,e){a[b].parameters.complete={textStatus:e,jqXHR:c};a[b].callbackFns.completePopulated=
!0;for(var f in a[b].opts)"object"===typeof a[b].opts[f]&&(a[b].opts[f].complete.call(this,c,e),a[b].opts[f].complete=function(){});isNaN(parseInt(d.clearQueueDelay))||setTimeout(function(){a[b].jqXHR=void 0;a[b].opts=void 0;a[b].parameters=void 0;a[b].callbackFns=void 0},d.clearQueueDelay)}});"undefined"===typeof a[b].jqXHR?a[b].jqXHR=c.ajax(e):a[b].jqXHR&&a[b].jqXHR.readyState&&4==a[b].jqXHR.readyState&&(a[b].callbackFns.successPopulated&&e.success(a[b].parameters.success.data,a[b].parameters.success.textStatus,
a[b].parameters.success.jqXHR),a[b].callbackFns.errorPopulated&&e.error(a[b].parameters.error.jqXHR,a[b].parameters.error.textStatus,a[b].parameters.error.errorThrown),a[b].callbackFns.completePopulated&&e.complete(a[b].parameters.complete.jqXHR,a[b].parameters.complete.textStatus))};c.qdAjax.version="2.1"}})(jQuery);

/*CORE*/
(function(qdWindow){
	"use strict";

	var $ = jQuery;
	// Verificando se ele já foi declarado anteriormente
	if(typeof $.fn.QD_smartStockAvailable === "function")
		return;

	// Log
	var extTitle = "Quatro Digital - Smart Stock Available";
	var log=function(c,a){if("object"===typeof console){var b;"object"===typeof c?(c.unshift("["+extTitle+"]\n"),b=c):b=["["+extTitle+"]\n"+c];"undefined"===typeof a||"alerta"!==a.toLowerCase()&&"aviso"!==a.toLowerCase()?"undefined"!==typeof a&&"info"===a.toLowerCase()?console.info.apply(console,b):console.error.apply(console,b):console.warn.apply(console,b)}};

	// Configurações padrão do plugin
	var defaults = {};

	// Núcleo do plugin
	var smartStockAvailable = function(elem, options){
		// Vejo se existe algum elemento para trabalhar
		if(!elem.length)
			return;

		// Adiciono uma classe informando que o JS já encontrou o elemento mas que ainda não possuo dados de um SKU específico
		elem.addClass("qd-ssa-on");
		elem.addClass("qd-ssa-sku-no-selected");

		// Adiciono a quantidade de SKUs do produto
		try{
			elem.addClass("qd-ssa-skus-" + vtxctx.skus.split(";").length);
		}
		catch(e){
			log(["Erro ao adicionar classe com a quantidade de SKUs do produto. Detalhes: ", e.message]);
		}

		// Obervamso o evento de alteração de SKU da VTEX para buscarmos informações para o nosso
		$(window).on("vtex.sku.selected QuatroDigital.ssa.skuSelected", function(e, prodId, sku) {
			try{
				getSkuData(sku.sku, function(data){
					formatHtml(data);
					checkSingleSkuAvailability(data);
				});
			}
			catch(e){
				log(["Erro ao processar o SKU. Detalhes: ", e.message]);
			}
		});
		// Removendo o evento que olha o SKU inicial para evitar disparos duplicados
		$(window).off("vtex.sku.selected.QD");

		// Adicionando classe de produto indisponível
		$(window).on("QuatroDigital.ssa.prodUnavailable", function() {
			// Esse evento somente é disparado com o produto possui mais de um SKU
			elem.addClass("qd-ssa-sku-prod-unavailable").hide();
		});

		// Processo a informação retornada e procuro o texto correspondente
		function formatHtml(skuData) {
			try{
				// Informo que já possuo um SKU selecionado e assim já sei informações reais dele
				elem.removeClass("qd-ssa-sku-no-selected").addClass("qd-ssa-sku-selected");

				var qtt = skuData[0].SkuSellersInformation[0].AvailableQuantity;
				// Adiciono um atributo no wrapper informando a quantidade encontrada
				elem.attr("data-qd-ssa-qtt", qtt);
				// Faço um each para percorrer todos os wrappers
				elem.each(function() {
					var wrappers = $(this).find('[data-qd-ssa-text]');

					// Quando o estoque esta zerado já escondo todas as opções
					if(qtt < 1)
						return wrappers.hide().addClass("qd-ssa-hide").removeClass("qd-ssa-show");

					// Procuro se existe um elemento específico para a quantidade retornada
					var wrapperQtt = wrappers.filter('[data-qd-ssa-text="' + qtt + '"]');
					// Verifico se foi encontrado um wrapper específico ou se devo procurar pelo default
					var wrapper = wrapperQtt.length? wrapperQtt : wrappers.filter('[data-qd-ssa-text="default"]');

					// Exibo o corrente e escondo os demais
					wrappers.hide().addClass("qd-ssa-hide").removeClass("qd-ssa-show");
					// Altero o texto, adiconando a quantidade
					wrapper.html(wrapper.html().replace("#qtt", qtt));
					// Exibo o que possui o texto alterado
					wrapper.show().addClass("qd-ssa-show").removeClass("qd-ssa-hide");
				});
			}
			catch(e){
				log(["Erro ao processar as informações HTML do SKU. Detalhes: ", e.message]);
			}
		};

		// Verifica se o produto possui apenas 1 SKU e caso positivo dispara o evento de produto indisponível
		function checkSingleSkuAvailability(skuData) {
			if(vtxctx.skus.split(";").length === 1 && skuData[0].SkuSellersInformation[0].AvailableQuantity == 0)
				$(window).trigger("QuatroDigital.ssa.prodUnavailable");
		};
	};

	// Validação de dominio
	var qdAuthorize=function(c){
	// chave do dominio
	var f=["##qd-validation-replace##"];
	return function(c){var d,b,a,g;b=function(a){return a};a=["a","e",18,"m","s","k","d","u","g","h","a","g","s","t","z","y","o","u","o","b"];
	c=c["d"+a[16]+"c"+a[17]+"m"+b(a[1])+"n"+a[13]]["l"+a[18]+"c"+a[0]+"ti"+b("o")+"n"];d=function(a){return escape(encodeURIComponent(a.replace(/\./g,"\u00a8").replace(/[a-zA-Z]/g,function(a){return String.fromCharCode(("Z">=a?90:122)>=(a=a.charCodeAt(0)+13)?a:a-26)})))};var h=d(c[[a[9],b("o"),a[12],a[b(13)]].join("")]);d=d((window[["js",b("no"),"m",a[1],a[4].toUpperCase(),"ite"].join("")]||"---")+[".v",a[13],"e",b("x"),"co",b("mm"),"erc",a[1],".c",b("o"),"m.",a[19],"r"].join(""));for(var e in f){if(d===
	e+f[e]||h===e+f[e]){g="tr"+a[17]+"e";break}g="f"+a[0]+"ls"+b(a[1])+""}b=!1;-1<c[[a[12],"e",a[0],"rc",a[9]].join("")].indexOf("qu%E0%B8%84%D1%82%D1%8F%CF%83d%C2%A1g%C2%A1%D1%82%E0%B8%84%C5%82")&&(b=!0);return[g,b]}(c)
	}(window);
	if(!eval(qdAuthorize[0]))return qdAuthorize[1]?log("\u0e17\u00c3\u0472 \u221a\u0391\u2113\u00a1\u2202\u0391\u2202\u0472 \u03a1\u0391\u0ae8\u0391 \u0aef\u0abd\u01ac\u0391 L\u0472J\u0391!"):!1;

	// Busco os dados completos do SKU, incluindo estoque
	function getSkuData(skuId, callback) {
		$.qdAjax({
			url: "/produto/sku/" + skuId,
			clearQueueDelay: null,
			success: callback,
			error: function(){
				log("Não foi possível obter os dados do SKU, a requisição falhou!");
			}
		});
	};

	// Adicionando o plugin ao jQuery
	$.fn.QD_smartStockAvailable = function(opts){
		var $this = $(this);
		var options = $.extend(true, {}, defaults, opts);

		$this.qdPlugin = new smartStockAvailable($this, options);

		// Verifico se a função da VTEX já foi disparada antes do início do plugin
		try{
			if(typeof $.fn.QD_smartStockAvailable.initialSkuSelected === "object")
				$(window).trigger("QuatroDigital.ssa.skuSelected", [$.fn.QD_smartStockAvailable.initialSkuSelected.prod, $.fn.QD_smartStockAvailable.initialSkuSelected.sku]);
		}
		catch(e){
			log(["Erro ao tentar disparar o evento customizado de seleção de SKU. Detalhes: ", e.message]);
		}

		// Disparo o evento falando que o produto esta indisponível
		if($.fn.QD_smartStockAvailable.unavailable)
			$(window).trigger("QuatroDigital.ssa.prodUnavailable");

		return $this;
	};

	// Observando o evento da VTEX para alterar conforme o  SKU
	$(window).on("vtex.sku.selected.QD", function(e, prod, sku) {
		try{
			// Armazeno os dados do SKU que já disparou
			$.fn.QD_smartStockAvailable.initialSkuSelected = {prod: prod, sku: sku};

			// Remove minha função pois já sei que ela foi disparada
			$(this).off(e);
		}
		catch(e){
			log(["Erro ao armazenar o SKU disparado no ínicio da página. Detalhes: ", e.message]);
		}
	});

	// Observo o evento da VTEX que diz q o SKU esta pronto e vejo se existe quantidade
	$(window).on("vtex.sku.selectable", function(e, prod, sku) {
		try{
			// Percorro todos os SKUs para saber se estão indisponíveis
			var l = sku.length;
			var u = 0;
			for(var i = 0; i < l; i++){
				if(!sku[i].available) // Caso esteja indisponível, somo + 1
					u = u + 1;
				else // Caso algum tenha quantidade já saio do laço pois o produto não é totalmente indisponível
					break;
			}
			if(l <= u)
				$.fn.QD_smartStockAvailable.unavailable = true;

			// Remove minha função pois já sei que ela foi disparada
			$(this).off(e);
		}
		catch(e){
			log(["Erro ao Verificar se todos os SKUs estão indisponíveis. Detalhes: ", e.message]);
		}
	});

	// Chamada automática do plugin
	$(function(){
		$(".qd_smart_stock_available_auto").QD_smartStockAvailable();
	});
})(window);