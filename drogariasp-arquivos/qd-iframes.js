$(function(){function c(){var a=$(window).height()-$(".header__fixed").outerHeight(!0)-15;return 300>a?300:a}var a=$("#qd-main-frame-wrapper");a.parent().addClass("grid_1244");var b=a.find("#qd-main-frame");b.css({height:c()});$(window).resize(function(){b.css({height:c()})});a=-1<location.search.indexOf("v=2")?"http://ri.drogariasaopaulo.com.br/filemanager2/":"http://ri.drogariasaopaulo.com.br/filemanager/";b.attr("src",a)});