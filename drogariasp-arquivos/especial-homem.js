function eh_loadMainSliderEspecialHomem() {
	// Mobile/Responsivo
	if ($('body').hasClass('isResponsible')) {
		var wrapper_banners = $('#wrapper_bannersEspecialHomem');

		// 320 a 725
		if ($(wrapper_banners).width() < 726) {
			var wrapper_slider = $('#wrapper_mainSliderEspecialHomem');
			var height = $(wrapper_slider).find('img:first').height();

			if (height > 0) {				
				$(wrapper_banners).css('display','block');
				$(wrapper_banners).css('visibility','visible');

				$(wrapper_slider).find('.cycle-slideshow').css('height', height + 'px');
				$(wrapper_slider).find('img').css('display', 'block');
			} else {
				$(wrapper_banners).css('display','none');
				$(wrapper_banners).css('visibility','hidden');
			}
		}
	}	
}

function eh_loadMenuEspecialHomem() {
	$('#eh-menu-opener').on('click',function() {
		if ($('#wrapper_subMenuEspecialHomem').hasClass('wrapper_subMenuEspecialHomem_mobile')) {
			$('#wrapper_subMenuEspecialHomem').removeClass('wrapper_subMenuEspecialHomem_mobile');
		} else {
			$('#wrapper_subMenuEspecialHomem').addClass('wrapper_subMenuEspecialHomem_mobile');
		}

		return false;
	});	
}

$(document).ready(function () {
	// Carrega o slider no modo Mobile/Responsivo (Especial Homem)
	eh_loadMainSliderEspecialHomem();

	// Configura click do menu Mobile/Responsivo (Especial Homem)
	eh_loadMenuEspecialHomem();
});

window.addEventListener("orientationchange", eh_loadMainSliderEspecialHomem);
window.addEventListener("resize", eh_loadMainSliderEspecialHomem);