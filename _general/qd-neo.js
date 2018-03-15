$( document ).ready(function() {
    createSearchModal();
    $('.open-search-modal-qd-v1').click(function(){
        $('#search-qd-v1-modal').modal("toggle");
    });
});

function createSearchModal() {
    $('#search-qd-v1-modal').modal();
};

