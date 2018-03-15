$( document ).ready(function() {
    createSearchModal();

    $('.open-search-modal-qd-v1').click(function(){
        console.log("click");
        $('#search-qd-v1-modal').modal("toggle");
    });
});

function createSearchModal() {
    console.log('search modal');
    $('#search-qd-v1-modal').modal();
};

