$( document ).ready(function() {
    createSearchModal();
    $('.open-search-modal-qd-v1').click(function(){
        $('#search-qd-v1-modal').modal("toggle");
        $('#search-qd-v1-modal').unbind();
    });

    $(".closeFiltros").click(function () {
        $(".filter-qd-v1").removeClass(".ativo");
    });

    $(".active.title").each(function(){
        $(".active.title").click(function () {
            $(this).next().toggleClass('qd-active-menu');
        });
    })
});

function createSearchModal() {
    $('#search-qd-v1-modal').modal();
};

