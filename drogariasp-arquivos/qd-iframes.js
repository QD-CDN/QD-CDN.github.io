// Iframe do gerenciador de arquivos
$(function () {
	var wrapper = $('#qd-main-frame-wrapper');

	wrapper.parent().addClass('grid_1244');

	var iframe = wrapper.find('#qd-main-frame');
	iframe.css({ height: getHeight() });
	$(window).resize(function () {
		iframe.css({ height: getHeight() });
	});

	iframe.attr('src', 'http://ri.drogariasaopaulo.com.br/filemanager/');

	function getHeight() {
		var height = $(window).height() - $('.header__fixed').outerHeight(true) - 15;
		return height < 300 ? 300 : height;
	}
});
