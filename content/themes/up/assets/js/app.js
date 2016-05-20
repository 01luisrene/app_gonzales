'use strict';
function search(){
	var searchField =  $('#js_campo_search').ghostHunter({
    results             : '#js_list_results',
    info_template   : "<p class='number-posts'>Number of posts found: {{amount}}</p>",
    result_template : "<li><p> <a href='{{link}}'>{{title}}</a></p></li>",
    onKeyUp             : true,
    displaySearchInfo   : true
  });
  $('#js_campo_search').on('keyup', function() {
  	var $caja_buscar = $('#js_campo_search').val().length;
	  if($caja_buscar > 0){
  		$('#js_box_results').css({
  			display: 'block'
  		}).addClass('animated slideInLeft');
	  }
  });
}

function closeSearch(){
	$('#js_box_results_close').on('click', function(event) {
		var $caja_buscar = $('#js_campo_search');
		setTimeout(function(){ $caja_buscar.val(''); }, 1000);
		$('#js_box_results').css({
				display: 'none'
		});
	});
}
function displayNav(){
	$('#js_nav_icon_mobile').on('click', function(event) {
		event.preventDefault();
		$('#js_nav_menu').slideToggle();
	});
	$(window).resize(function(){
    var w = $(window).width();
    if(w>320 && $('#js_nav_menu').is(':hidden')){
      $('#js_nav_menu').removeAttr('style');     
    }
  });
}
function headroom(){
  $(".headroom").headroom({
    "offset": 205,
    "tolerance": 5,
    "classes": {
      "initial": "animated",
      "pinned": "swingInX",
      "unpinned": "swingOutX"
    }
  });
}
function buttonUp(){
  $(window).scroll(function(){
    if($(this).scrollTop() > 300){
      $("#js_button_up").show(); //fadeIn
    }else{
      $("#js_button_up").fadeOut(); //fadeOut
    }
  });
  $("#js_button_up").on('click', function (e) {
    e.preventDefault();
      $("body,html").animate({
      scrollTop: 0
    },700);
    return false;
  });
}
function highlight(){
	$('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
}
function cookiePolicy(){
  function setCookie(cname,cvalue,exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires=" + d.toGMTString();
      document.cookie = cname+"="+cvalue+"; "+expires + "; path=/";
  }

  function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i<ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0)==' ') c = c.substring(1);
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
  }

  var p_cookie=getCookie("_upcookie");
  if (p_cookie == "") {
      $('#js_barra_aceptacion_cookie').css({
        display: 'block'
      });
   }
  $('#js_btn_cookie').on('click', function(e) {
    e.preventDefault();
    p_cookie = '01luisrene';
    if (p_cookie != "" && p_cookie != null) {
      setCookie("_upcookie", p_cookie, 30);
      $('#js_barra_aceptacion_cookie').css({
        display: 'none'
      });
      console.log("cookie creada: " + p_cookie);
     }
  });
}
function progressReading() {
  var getMax = function() {
      return $(document).height() - $(window).height();
  };
  var getValue = function() {
      return $(window).scrollTop();
  };
  var progressBar, max, value, width;
  if('max' in document.createElement('progress')){
      // Browser supports progress element
      progressBar = $('progress');
      // Set the Max attr for the first time
      progressBar.attr({ max: getMax() });
      $(document).on('scroll', function(){
          // On scroll only Value attr needs to be calculated
          progressBar.attr({ value: getValue() });
      });
      $(window).resize(function(){
          // On resize, both Max/Value attr needs to be calculated
          progressBar.attr({ max: getMax(), value: getValue() });
      });
  }        
}
function readingTime(){
  var $article = $('.js_reading_time');
  $article.readingTime({
    readingTimeTarget: $article.find('.reading-time'),
    wordCountTarget: $article.find('.word-count'),
    wordsPerMinute: 275,
    round: false,
    lang: 'es',
    success: function() {
        console.log('It worked!');
    },
    error: function(message) {
        console.log(message);
        $article.find('.reading-time').remove();
    }
  });
}
function magnificPopup(){ 
  $('.open-popup-link').magnificPopup({
    type: 'image',
    closeBtnInside: false,
    closeOnContentClick: true,

    image: {
      verticalFit: true,
      titleSrc: function(item) {
        return item.el.attr('title') + ' &#8212; <a class="image-source-link" href="'+item.src+'" target="_blank">open original</a>';
      }
    }
  });
  }
$(document).ready(function() {
	search();
	closeSearch();
	displayNav();
	headroom();
  buttonUp();
	highlight();
  cookiePolicy();
  progressReading();
  readingTime();
  magnificPopup();
});