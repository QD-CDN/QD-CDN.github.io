!function(b){var f={mode:"horizontal",slideSelector:"",infiniteLoop:!0,hideControlOnEnd:!1,speed:500,easing:null,slideMargin:0,startSlide:0,randomStart:!1,captions:!1,ticker:!1,tickerHover:!1,adaptiveHeight:!1,adaptiveHeightSpeed:500,video:!1,useCSS:!0,preloadImages:"visible",responsive:!0,slideZIndex:50,touchEnabled:!0,swipeThreshold:50,oneToOneTouch:!0,preventDefaultSwipeX:!0,preventDefaultSwipeY:!1,pager:!0,pagerType:"full",pagerShortSeparator:" / ",pagerSelector:null,buildPager:null,pagerCustom:null,
controls:!0,nextText:"Next",prevText:"Prev",nextSelector:null,prevSelector:null,autoControls:!1,startText:"Start",stopText:"Stop",autoControlsCombine:!1,autoControlsSelector:null,auto:!1,pause:4E3,autoStart:!0,autoDirection:"next",autoHover:!1,autoDelay:0,minSlides:1,maxSlides:1,moveSlides:0,slideWidth:0,onSliderLoad:function(){},onSlideBefore:function(){},onSlideAfter:function(){},onSlideNext:function(){},onSlidePrev:function(){},onSliderResize:function(){}};b.fn.bxSlider=function(e){if(0==this.length)return this;
if(1<this.length)return this.each(function(){b(this).bxSlider(e)}),this;var a={},c=this,q=b(window).width(),r=b(window).height(),t=function(){a.settings=b.extend({},f,e);a.settings.slideWidth=parseInt(a.settings.slideWidth);a.children=c.children(a.settings.slideSelector);a.children.length<a.settings.minSlides&&(a.settings.minSlides=a.children.length);a.children.length<a.settings.maxSlides&&(a.settings.maxSlides=a.children.length);a.settings.randomStart&&(a.settings.startSlide=Math.floor(Math.random()*
a.children.length));a.active={index:a.settings.startSlide};a.carousel=1<a.settings.minSlides||1<a.settings.maxSlides;a.carousel&&(a.settings.preloadImages="all");a.minThreshold=a.settings.minSlides*a.settings.slideWidth+(a.settings.minSlides-1)*a.settings.slideMargin;a.maxThreshold=a.settings.maxSlides*a.settings.slideWidth+(a.settings.maxSlides-1)*a.settings.slideMargin;a.working=!1;a.controls={};a.interval=null;a.animProp="vertical"==a.settings.mode?"top":"left";a.usingCSS=a.settings.useCSS&&"fade"!=
a.settings.mode&&function(){var d=document.createElement("div"),b=["WebkitPerspective","MozPerspective","OPerspective","msPerspective"],c;for(c in b)if(void 0!==d.style[b[c]])return a.cssPrefix=b[c].replace("Perspective","").toLowerCase(),a.animProp="-"+a.cssPrefix+"-transform",!0;return!1}();"vertical"==a.settings.mode&&(a.settings.maxSlides=a.settings.minSlides);c.data("origStyle",c.attr("style"));c.children(a.settings.slideSelector).each(function(){b(this).data("origStyle",b(this).attr("style"))});
G()},G=function(){c.wrap('<div class="bx-wrapper"><div class="bx-viewport"></div></div>');a.viewport=c.parent();a.loader=b('<div class="bx-loading" />');a.viewport.prepend(a.loader);c.css({width:"horizontal"==a.settings.mode?100*a.children.length+215+"%":"auto",position:"relative"});a.usingCSS&&a.settings.easing?c.css("-"+a.cssPrefix+"-transition-timing-function",a.settings.easing):a.settings.easing||(a.settings.easing="swing");m();a.viewport.css({width:"100%",overflow:"hidden",position:"relative"});
a.viewport.parent().css({maxWidth:H()});a.settings.pager||a.viewport.parent().css({margin:"0 auto 0px"});a.children.css({"float":"horizontal"==a.settings.mode?"left":"none",listStyle:"none",position:"relative"});a.children.css("width",z());"horizontal"==a.settings.mode&&0<a.settings.slideMargin&&a.children.css("marginRight",a.settings.slideMargin);"vertical"==a.settings.mode&&0<a.settings.slideMargin&&a.children.css("marginBottom",a.settings.slideMargin);"fade"==a.settings.mode&&(a.children.css({position:"absolute",
zIndex:0,display:"none"}),a.children.eq(a.settings.startSlide).css({zIndex:a.settings.slideZIndex,display:"block"}));a.controls.el=b('<div class="bx-controls" />');a.settings.captions&&I();a.active.last=a.settings.startSlide==k()-1;a.settings.video&&c.fitVids();var d=a.children.eq(a.settings.startSlide);"all"==a.settings.preloadImages&&(d=a.children);a.settings.ticker?a.settings.pager=!1:(a.settings.pager&&(a.settings.pagerCustom?a.pagerEl=b(a.settings.pagerCustom):(a.pagerEl=b('<div class="bx-pager" />'),
a.settings.pagerSelector?b(a.settings.pagerSelector).html(a.pagerEl):a.controls.el.addClass("bx-has-pager").append(a.pagerEl),A()),a.pagerEl.on("click","a",J)),a.settings.controls&&(a.controls.next=b('<a class="bx-next" href="">'+a.settings.nextText+"</a>"),a.controls.prev=b('<a class="bx-prev" href="">'+a.settings.prevText+"</a>"),a.controls.next.bind("click",K),a.controls.prev.bind("click",L),a.settings.nextSelector&&b(a.settings.nextSelector).append(a.controls.next),a.settings.prevSelector&&b(a.settings.prevSelector).append(a.controls.prev),
a.settings.nextSelector||a.settings.prevSelector||(a.controls.directionEl=b('<div class="bx-controls-direction" />'),a.controls.directionEl.append(a.controls.prev).append(a.controls.next),a.controls.el.addClass("bx-has-controls-direction").append(a.controls.directionEl))),a.settings.auto&&a.settings.autoControls&&(a.controls.start=b('<div class="bx-controls-auto-item"><a class="bx-start" href="">'+a.settings.startText+"</a></div>"),a.controls.stop=b('<div class="bx-controls-auto-item"><a class="bx-stop" href="">'+
a.settings.stopText+"</a></div>"),a.controls.autoEl=b('<div class="bx-controls-auto" />'),a.controls.autoEl.on("click",".bx-start",M),a.controls.autoEl.on("click",".bx-stop",N),a.settings.autoControlsCombine?a.controls.autoEl.append(a.controls.start):a.controls.autoEl.append(a.controls.start).append(a.controls.stop),a.settings.autoControlsSelector?b(a.settings.autoControlsSelector).html(a.controls.autoEl):a.controls.el.addClass("bx-has-controls-auto").append(a.controls.autoEl),v(a.settings.autoStart?
"stop":"start")),(a.settings.controls||a.settings.autoControls||a.settings.pager)&&a.viewport.after(a.controls.el));O(d,P)},O=function(a,c){var d=a.find("img, iframe").length;if(0==d)return c(),void 0;var l=0;a.find("img, iframe").each(function(){b(this).one("load",function(){++l==d&&c()}).each(function(){this.complete&&b(this).load()})})},P=function(){if(a.settings.infiniteLoop&&"fade"!=a.settings.mode&&!a.settings.ticker){var d="vertical"==a.settings.mode?a.settings.minSlides:a.settings.maxSlides,
l=a.children.slice(0,d).clone().addClass("bx-clone"),d=a.children.slice(-d).clone().addClass("bx-clone");c.append(l).prepend(d)}a.loader.remove();B();"vertical"==a.settings.mode&&(a.settings.adaptiveHeight=!0);a.viewport.height(p());c.redrawSlider();a.settings.onSliderLoad(a.active.index);a.initialized=!0;a.settings.responsive&&b(window).bind("resize",C);a.settings.auto&&a.settings.autoStart&&Q();a.settings.ticker&&R();a.settings.pager&&w(a.settings.startSlide);a.settings.controls&&D();a.settings.touchEnabled&&
!a.settings.ticker&&(a.touch={start:{x:0,y:0},end:{x:0,y:0}},a.viewport.bind("touchstart",S))},p=function(){var d=0,c=b();if("vertical"==a.settings.mode||a.settings.adaptiveHeight)if(a.carousel){var e=1==a.settings.moveSlides?a.active.index:a.active.index*n(),c=a.children.eq(e);for(i=1;i<=a.settings.maxSlides-1;i++)c=e+i>=a.children.length?c.add(a.children.eq(i-1)):c.add(a.children.eq(e+i))}else c=a.children.eq(a.active.index);else c=a.children;return"vertical"==a.settings.mode?(c.each(function(){d+=
b(this).outerHeight()}),0<a.settings.slideMargin&&(d+=a.settings.slideMargin*(a.settings.minSlides-1))):d=Math.max.apply(Math,c.map(function(){return b(this).outerHeight(!1)}).get()),d},H=function(){var d="100%";return 0<a.settings.slideWidth&&(d="horizontal"==a.settings.mode?a.settings.maxSlides*a.settings.slideWidth+(a.settings.maxSlides-1)*a.settings.slideMargin:a.settings.slideWidth),d},z=function(){var d=a.settings.slideWidth,b=a.viewport.width();return 0==a.settings.slideWidth||a.settings.slideWidth>
b&&!a.carousel||"vertical"==a.settings.mode?d=b:1<a.settings.maxSlides&&"horizontal"==a.settings.mode&&(b>a.maxThreshold||b<a.minThreshold&&(d=(b-a.settings.slideMargin*(a.settings.minSlides-1))/a.settings.minSlides)),d},m=function(){var d=1;"horizontal"==a.settings.mode&&0<a.settings.slideWidth?a.viewport.width()<a.minThreshold?d=a.settings.minSlides:a.viewport.width()>a.maxThreshold?d=a.settings.maxSlides:(d=a.children.first().width(),d=Math.floor(a.viewport.width()/d)):"vertical"==a.settings.mode&&
(d=a.settings.minSlides);return d},k=function(){var d=0;if(0<a.settings.moveSlides)if(a.settings.infiniteLoop)d=a.children.length/n();else for(var b=0,c=0;b<a.children.length;)++d,b=c+m(),c+=a.settings.moveSlides<=m()?a.settings.moveSlides:m();else d=Math.ceil(a.children.length/m());return d},n=function(){return 0<a.settings.moveSlides&&a.settings.moveSlides<=m()?a.settings.moveSlides:m()},B=function(){if(a.children.length>a.settings.maxSlides&&a.active.last&&!a.settings.infiniteLoop)if("horizontal"==
a.settings.mode){var d=a.children.last();var b=d.position();h(-(b.left-(a.viewport.width()-d.width())),"reset",0)}else"vertical"==a.settings.mode&&(b=a.children.eq(a.children.length-a.settings.minSlides).position(),h(-b.top,"reset",0));else b=a.children.eq(a.active.index*n()).position(),a.active.index==k()-1&&(a.active.last=!0),void 0!=b&&("horizontal"==a.settings.mode?h(-b.left,"reset",0):"vertical"==a.settings.mode&&h(-b.top,"reset",0))},h=function(d,b,e,g){if(a.usingCSS)d="vertical"==a.settings.mode?
"translate3d(0, "+d+"px, 0)":"translate3d("+d+"px, 0, 0)",c.css("-"+a.cssPrefix+"-transition-duration",e/1E3+"s"),"slide"==b?(c.css(a.animProp,d),c.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",function(){c.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");x()})):"reset"==b?c.css(a.animProp,d):"ticker"==b&&(c.css("-"+a.cssPrefix+"-transition-timing-function","linear"),c.css(a.animProp,d),c.bind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd",
function(){c.unbind("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd");h(g.resetValue,"reset",0);u()}));else{var l={};l[a.animProp]=d;"slide"==b?c.animate(l,e,a.settings.easing,function(){x()}):"reset"==b?c.css(a.animProp,d):"ticker"==b&&c.animate(l,speed,"linear",function(){h(g.resetValue,"reset",0);u()})}},A=function(){for(var d="",c=k(),e=0;c>e;e++){var g="";a.settings.buildPager&&b.isFunction(a.settings.buildPager)?(g=a.settings.buildPager(e),a.pagerEl.addClass("bx-custom-pager")):
(g=e+1,a.pagerEl.addClass("bx-default-pager"));d+='<div class="bx-pager-item"><a href="" data-slide-index="'+e+'" class="bx-pager-link">'+g+"</a></div>"}a.pagerEl.html(d)},I=function(){a.children.each(function(){var a=b(this).find("img:first").attr("title");void 0!=a&&(""+a).length&&b(this).append('<div class="bx-caption"><span>'+a+"</span></div>")})},K=function(b){a.settings.auto&&c.stopAuto();c.goToNextSlide();b.preventDefault()},L=function(b){a.settings.auto&&c.stopAuto();c.goToPrevSlide();b.preventDefault()},
M=function(a){c.startAuto();a.preventDefault()},N=function(a){c.stopAuto();a.preventDefault()},J=function(d){a.settings.auto&&c.stopAuto();var e=b(d.currentTarget),e=parseInt(e.attr("data-slide-index"));e!=a.active.index&&c.goToSlide(e);d.preventDefault()},w=function(d){var c=a.children.length;return"short"==a.settings.pagerType?(1<a.settings.maxSlides&&(c=Math.ceil(a.children.length/a.settings.maxSlides)),a.pagerEl.html(d+1+a.settings.pagerShortSeparator+c),void 0):(a.pagerEl.find("a").removeClass("active"),
a.pagerEl.each(function(a,c){b(c).find("a").eq(d).addClass("active")}),void 0)},x=function(){if(a.settings.infiniteLoop){var b="";0==a.active.index?b=a.children.eq(0).position():a.active.index==k()-1&&a.carousel?b=a.children.eq((k()-1)*n()).position():a.active.index==a.children.length-1&&(b=a.children.eq(a.children.length-1).position());b&&("horizontal"==a.settings.mode?h(-b.left,"reset",0):"vertical"==a.settings.mode&&h(-b.top,"reset",0))}a.working=!1;a.settings.onSlideAfter(a.children.eq(a.active.index),
a.oldIndex,a.active.index)},v=function(b){a.settings.autoControlsCombine?a.controls.autoEl.html(a.controls[b]):(a.controls.autoEl.find("a").removeClass("active"),a.controls.autoEl.find("a:not(.bx-"+b+")").addClass("active"))},D=function(){1==k()?(a.controls.prev.addClass("disabled"),a.controls.next.addClass("disabled")):!a.settings.infiniteLoop&&a.settings.hideControlOnEnd&&(0==a.active.index?(a.controls.prev.addClass("disabled"),a.controls.next.removeClass("disabled")):a.active.index==k()-1?(a.controls.next.addClass("disabled"),
a.controls.prev.removeClass("disabled")):(a.controls.prev.removeClass("disabled"),a.controls.next.removeClass("disabled")))},Q=function(){0<a.settings.autoDelay?setTimeout(c.startAuto,a.settings.autoDelay):c.startAuto();a.settings.autoHover&&c.hover(function(){a.interval&&(c.stopAuto(!0),a.autoPaused=!0)},function(){a.autoPaused&&(c.startAuto(!0),a.autoPaused=null)})},R=function(){var d=0;"next"==a.settings.autoDirection?c.append(a.children.clone().addClass("bx-clone")):(c.prepend(a.children.clone().addClass("bx-clone")),
d=a.children.first().position(),d="horizontal"==a.settings.mode?-d.left:-d.top);h(d,"reset",0);a.settings.pager=!1;a.settings.controls=!1;a.settings.autoControls=!1;a.settings.tickerHover&&!a.usingCSS&&a.viewport.hover(function(){c.stop()},function(){var d=0;a.children.each(function(){d+="horizontal"==a.settings.mode?b(this).outerWidth(!0):b(this).outerHeight(!0)});var e=a.settings.speed/d*(d-Math.abs(parseInt(c.css("horizontal"==a.settings.mode?"left":"top"))));u(e)});u()},u=function(b){speed=b?
b:a.settings.speed;b={left:0,top:0};var d={left:0,top:0};"next"==a.settings.autoDirection?b=c.find(".bx-clone").first().position():d=a.children.first().position();h("horizontal"==a.settings.mode?-b.left:-b.top,"ticker",speed,{resetValue:"horizontal"==a.settings.mode?-d.left:-d.top})},S=function(b){a.working?b.preventDefault():(a.touch.originalPos=c.position(),b=b.originalEvent,a.touch.start.x=b.changedTouches[0].pageX,a.touch.start.y=b.changedTouches[0].pageY,a.viewport.bind("touchmove",E),a.viewport.bind("touchend",
F))},E=function(b){var c=b.originalEvent,d=Math.abs(c.changedTouches[0].pageX-a.touch.start.x),e=Math.abs(c.changedTouches[0].pageY-a.touch.start.y);if(3*d>e&&a.settings.preventDefaultSwipeX?b.preventDefault():3*e>d&&a.settings.preventDefaultSwipeY&&b.preventDefault(),"fade"!=a.settings.mode&&a.settings.oneToOneTouch)"horizontal"==a.settings.mode?(b=c.changedTouches[0].pageX-a.touch.start.x,b=a.touch.originalPos.left+b):(b=c.changedTouches[0].pageY-a.touch.start.y,b=a.touch.originalPos.top+b),h(b,
"reset",0)},F=function(b){a.viewport.unbind("touchmove",E);var d=b.originalEvent;b=0;(a.touch.end.x=d.changedTouches[0].pageX,a.touch.end.y=d.changedTouches[0].pageY,"fade"==a.settings.mode)?(d=Math.abs(a.touch.start.x-a.touch.end.x),d>=a.settings.swipeThreshold&&(a.touch.start.x>a.touch.end.x?c.goToNextSlide():c.goToPrevSlide(),c.stopAuto())):(d=0,"horizontal"==a.settings.mode?(d=a.touch.end.x-a.touch.start.x,b=a.touch.originalPos.left):(d=a.touch.end.y-a.touch.start.y,b=a.touch.originalPos.top),
!a.settings.infiniteLoop&&(0==a.active.index&&0<d||a.active.last&&0>d)?h(b,"reset",200):Math.abs(d)>=a.settings.swipeThreshold?(0>d?c.goToNextSlide():c.goToPrevSlide(),c.stopAuto()):h(b,"reset",200));a.viewport.unbind("touchend",F)},C=function(){var d=b(window).width(),e=b(window).height();q==d&&r==e||(q=d,r=e,c.redrawSlider(),a.settings.onSliderResize.call(c,a.active.index))};return c.goToSlide=function(d,e){if(!a.working&&a.active.index!=d)if(a.working=!0,a.oldIndex=a.active.index,a.active.index=
0>d?k()-1:d>=k()?0:d,a.settings.onSlideBefore(a.children.eq(a.active.index),a.oldIndex,a.active.index),"next"==e?a.settings.onSlideNext(a.children.eq(a.active.index),a.oldIndex,a.active.index):"prev"==e&&a.settings.onSlidePrev(a.children.eq(a.active.index),a.oldIndex,a.active.index),a.active.last=a.active.index>=k()-1,a.settings.pager&&w(a.active.index),a.settings.controls&&D(),"fade"==a.settings.mode)a.settings.adaptiveHeight&&a.viewport.height()!=p()&&a.viewport.animate({height:p()},a.settings.adaptiveHeightSpeed),
a.children.filter(":visible").fadeOut(a.settings.speed).css({zIndex:0}),a.children.eq(a.active.index).css("zIndex",a.settings.slideZIndex+1).fadeIn(a.settings.speed,function(){b(this).css("zIndex",a.settings.slideZIndex);x()});else{a.settings.adaptiveHeight&&a.viewport.height()!=p()&&a.viewport.animate({height:p()},a.settings.adaptiveHeightSpeed);var q=0,g={left:0,top:0};if(!a.settings.infiniteLoop&&a.carousel&&a.active.last)if("horizontal"==a.settings.mode){var f=a.children.eq(a.children.length-
1);g=f.position();q=a.viewport.width()-f.outerWidth()}else g=a.children.eq(a.children.length-a.settings.minSlides).position();else a.carousel&&a.active.last&&"prev"==e?(f=1==a.settings.moveSlides?a.settings.maxSlides-n():(k()-1)*n()-(a.children.length-a.settings.maxSlides),f=c.children(".bx-clone").eq(f),g=f.position()):"next"==e&&0==a.active.index?(g=c.find("> .bx-clone").eq(a.settings.maxSlides).position(),a.active.last=!1):0<=d&&(f=d*n(),g=a.children.eq(f).position());"undefined"!=typeof g&&h("horizontal"==
a.settings.mode?-(g.left-q):-g.top,"slide",a.settings.speed)}},c.goToNextSlide=function(){if(a.settings.infiniteLoop||!a.active.last){var b=parseInt(a.active.index)+1;c.goToSlide(b,"next")}},c.goToPrevSlide=function(){if(a.settings.infiniteLoop||0!=a.active.index){var b=parseInt(a.active.index)-1;c.goToSlide(b,"prev")}},c.startAuto=function(b){a.interval||(a.interval=setInterval(function(){"next"==a.settings.autoDirection?c.goToNextSlide():c.goToPrevSlide()},a.settings.pause),a.settings.autoControls&&
1!=b&&v("stop"))},c.stopAuto=function(b){a.interval&&(clearInterval(a.interval),a.interval=null,a.settings.autoControls&&1!=b&&v("start"))},c.getCurrentSlide=function(){return a.active.index},c.getCurrentSlideElement=function(){return a.children.eq(a.active.index)},c.getSlideCount=function(){return a.children.length},c.redrawSlider=function(){a.children.add(c.find(".bx-clone")).outerWidth(z());a.viewport.css("height",p());a.settings.ticker||B();a.active.last&&(a.active.index=k()-1);a.active.index>=
k()&&(a.active.last=!0);a.settings.pager&&!a.settings.pagerCustom&&(A(),w(a.active.index))},c.destroySlider=function(){a.initialized&&(a.initialized=!1,b(".bx-clone",this).remove(),a.children.each(function(){void 0!=b(this).data("origStyle")?b(this).attr("style",b(this).data("origStyle")):b(this).removeAttr("style")}),void 0!=b(this).data("origStyle")?this.attr("style",b(this).data("origStyle")):b(this).removeAttr("style"),b(this).unwrap().unwrap(),a.controls.el&&a.controls.el.remove(),a.controls.next&&
a.controls.next.remove(),a.controls.prev&&a.controls.prev.remove(),a.pagerEl&&a.settings.controls&&a.pagerEl.remove(),b(".bx-caption",this).remove(),a.controls.autoEl&&a.controls.autoEl.remove(),clearInterval(a.interval),a.settings.responsive&&b(window).unbind("resize",C))},c.reloadSlider=function(a){void 0!=a&&(e=a);c.destroySlider();t()},t(),this}}(jQuery);var VtexPluginGetProductVariations;
VtexPluginGetProductVariations=function(){$("body.departamento .vitrine>ul>li, body.categoria .vitrine>ul>li").not(".qd-on").addClass("qd-on").each(function(){if(null==$(this).attr("id")&&0==$(this).find(".product-variation").length){var b=$(this);var f=$(this).next().attr("id").split("helperComplement_")[1];$.ajax("/api/catalog_system/pub/products/variations/"+f,{type:"GET",dataType:"json",error:function(b,a,c){},success:function(e,a,c){c=e.skus;e=$('<ul class="product-variation"></ul>').appendTo(b.find(".imagem-produto"));
for(a=0;a<c.length;){var f=a-1;if(0===a||"undefined"!==typeof c[f]&&c[a].dimensions.Cor!==c[f].dimensions.Cor&&1>e.find('li[data-sku-color="'+c[a].dimensions.Cor+'"]').length){var r=c[a].image;f=c[a].sku;e.append('<li id="variacao-item-'+f+'" data-sku-color="'+c[a].dimensions.Cor+'" data-sku-size="'+c[a].dimensions.Tamanho+'" data-sku="'+f+'"> <div class="wrap-image"><img class="product-variation-image" data-sku="'+f+'" src="'+r.replace("392-392","40-40")+'"/></div> <div class="wrap-info"><div class="title">'+
c[a].skuname+'</div> <div class="price"> <div class="price-from">'+c[a].listPrice+'</div> <div class="price-current">'+c[a].bestPrice+"</div> </div> </li>");var t=b.find("a.productImage img").attr("src");$("li#variacao-item-"+f).mouseover(function(){b.find("a.productImage img").attr("src",$(this).find("img").attr("src").replace("40-40","300-300"))});$("li#variacao-item-"+f).mouseleave(function(){b.find("a.productImage img").attr("src",t)})}a++}}})}})};var menuOutTimer;
$(function(){$("#wrap-menu .menu-departamento > h3").hover(function(){menuOutObject=$(this).next("ul");y=$(this).position().left;menuOutObject.css("left",y);menuOutObject.is(":visible")||hideMenuSubItems($("#wrap-menu .menu-departamento > ul:visible"));clearTimeout(menuOutTimer);menuOutObject.fadeIn()},function(){menuOutTimer=setTimeout(function(){hideMenuSubItems(menuOutObject)},10)});$("#wrap-menu .menu-departamento > ul").hover(function(){menuOutObject=$(this);clearTimeout(menuOutTimer);$(this).prev("h3").addClass("marcador")},
function(){menuOutTimer=setTimeout(function(){hideMenuSubItems(menuOutObject)},10);$(this).prev("h3").removeClass("marcador")})});function hideMenuSubItems(b){b.fadeOut(10)}function skuPreSelected(){function b(){$(".topic.Cor input").eq(f).click().change();f+=1}var f=0;b();var e=$(".topic.TAMANHO input.item_unavaliable").length,a=$(".topic.TAMANHO input").length;e==a&&b();$(".topic.N\u00famero input").not(".item_unavaliable").first().click().change()}
function sliderBanner(){var b=$(".bannerTop");1<b.find(".box-banner").length&&b.cycle({fx:"fade",speed:1E3,timeout:5E3,pause:!0,next:".next2",prev:".prev2"})}
jQuery(document).ready(function(b){b("#quantidadeSacola").load("/no-cache/QuantidadeItensCarrinho.aspx .amount-items-em");b("#vitrineHome .wrap-vitrines .prateleira ul .helperComplement").remove();b("#vitrineHome .wrap-vitrines .prateleira ul").jcarousel();b("#wrap-menu h3").first().addClass("first");b("#wrap-menu h3").last().addClass("last");if(b("body").hasClass("produto"))b(".caroselProduto .prateleira ul .helperComplement").remove(),b(".caroselProduto .prateleira ul").jcarousel(),b("ul.Cor li a").each(function(){b(this).wrap('<span class="outerBorder" />');
var e=b(this).attr("title").replace(/\s/g,"-"),e=e.toLowerCase(),e=e.replace(new RegExp(/[\u00c3 \u00c3\u00a1\u00c3\u00a2\u00c3\u00a3\u00c3\u00a4\u00c3\u00a5]/g),"a"),e=e.replace(new RegExp(/\u00c3\u00a6/g),"ae"),e=e.replace(new RegExp(/\u00c3\u00a7/g),"c"),e=e.replace(new RegExp(/[\u00c3\u00a8\u00c3\u00a9\u00c3\u00aa\u00c3\u00ab]/g),"e"),e=e.replace(new RegExp(/[\u00c3\u00ac\u00c3\u00ad\u00c3\u00ae\u00c3\u00af]/g),"i"),e=e.replace(new RegExp(/\u00c3\u00b1/g),"n"),e=e.replace(new RegExp(/[\u00c3\u00b2\u00c3\u00b3\u00c3\u00b4\u00c3\u00b5\u00c3\u00b6]/g),
"o"),e=e.replace(new RegExp(/\u00c5\u201c/g),"oe"),e=e.replace(new RegExp(/[\u00c3\u00b9\u00c3\u00ba\u00c3\u00bb\u00c3\u00bc]/g),"u"),e=e.replace(new RegExp(/[\u00c3\u00bd\u00c3\u00bf]/g),"y");b(this).css("background","url(/arquivos/"+e+".png) repeat")}),b("#product-options .productarea .areaBtns, #product-options .productarea.productarea-one #product-wishlist a").live("click",function(){var e=b(this).next("div");1==e.css("opacity")?e.animate({opacity:0},500,function(){e.hide()}):b(e).fadeIn(function(){e.animate({opacity:1},
500)})});else if(b("body").hasClass("internas")){var f=b("#sideBar .menu-departamento a");b(f).html(function(b,a){return a.replace(/ \(\d*\)/,"")});b("#sideBar .menu-departamento").fadeIn();b("#sideBar .menu-departamento h4, #sideBar .menu-departamento h5").prepend('<span class="sidebarToggle" />');b(".sidebarToggle").click(function(){b(this).parent().next("ul").is(":hidden")&&b(this).css("background","url('/arquivos/minus.png')");b(this).parent().next("ul").slideToggle()});b(".sidebarToggle").click(function(){b(this).parent().next("div").is(":hidden")?
b(this).css("background","url('/arquivos/minus.png') center"):b(this).css("background","url('/arquivos/plus.png') center");b(this).parent().next("div").slideToggle()});b("#sideBar h3, #sideBar h4").each(function(){b(this).next("ul").length||b(this).find(".sidebarToggle").hide()});b("#sideBar h5").each(function(){b(this).next("div").length||b(this).find(".sidebarToggle").hide()})}b(".internas .shareheart, .institucional .shareheart").click(function(){b("#product-social").animate({width:"toggle"})});
dataLayer[0].productId&&b.ajax({url:"/api/catalog_system/pub/products/variations/"+dataLayer[0].productId,async:!1,success:function(e,a,c){b(".dimension-Cor").each(function(){i=0;for(var a=b(this).attr("class").split("skuespec_Cor_opcao_")[1].replace(/ /g,"");i<e.skus.length;)e.skus[i].dimensions.Cor==a&&b(this).css("background","url("+e.skus[i].image+") no-repeat left top"),i++})},error:function(b,a,c){}});b(".topic.Cor .select.skuList .dimension-Cor").click(function(){b(".topic.Cor .select.skuList .dimension-Cor").removeClass("active");
b(this).addClass("active")});sliderBanner();"function"==typeof b.fn.vtexSmartResearch&&b(".search-multiple-navigator input[type='checkbox']").vtexSmartResearch({shelfCallback:VtexPluginGetProductVariations})});jQuery(document).ajaxStop(function(){$(".preload").remove();VtexPluginGetProductVariations();$(".product-variation").each(function(){3<$(this).find("li").length&&$(this).bxSlider({pager:!1,slideWidth:51,minSlides:3,maxSlides:3,controls:!0})})});
$(window).load(function(){0<$(".brandcarousel").length&&$(".internas .carousel-marcas ul").carouFredSel({width:"100%",height:45,swipe:!0,auto:1,mousewheel:!0,align:"left",scroll:{width:"variable",items:1,easing:"linear",duration:6E3}});$(".popup").hide();$(".b-modal.__b-popup1__").hide();$("#abrePopup").click(function(){$(".popup").show();$(".popup").bPopup();$(".b-modal.__b-popup1__").show();$("#abrePopup").hide()});$(".popup img").click(function(){$(".popup").hide();$(".b-modal.__b-popup1__").hide()});
$(".especificacao").hover(function(){$(".productarea-one").css("display","none");$(".productarea-two").css("display","block");$(".productarea-three").css("display","none");$(".descricao").css({background:"#fff",color:"#000"});$(".prodRatings").css({background:"#fff",color:"#000"});$(".especificacao").css({background:"#3e3e3e",color:"#FFF"})});$(".descricao").hover(function(){$(".productarea-one").css("display","block");$(".productarea-two").css("display","none");$(".productarea-three").css("display",
"none");$(".descricao").css({background:"#3e3e3e",color:"#FFF"});$(".prodRatings").css({background:"#fff",color:"#000"});$(".especificacao, .avaliacao").css({background:"#fff",color:"#000"})});$(".product-step-title").remove();$(".prodRatings").hover(function(){$(".productarea-one").css("display","none");$(".productarea-two").css("display","none");$(".productarea-three").css("display","block");$(".descricao").css({background:"#fff",color:"#000"});$(".prodRatings").css({background:"#3e3e3e",color:"#FFF"});
$(".especificacao").css({background:"#fff",color:"#000"})});$("#image-main").after('<div class="lupa"></div>');$("#prazo p a").html("Consulte o prazo de entrega");document.getElementById("userReviewShowAllComments")});