'use strict';
/*
  ========================== https://github.com/jamalneufeld/ghostHunter ===============

  function to display search matches

*/
function search(){
	var searchField =  $('#js_input_search').ghostHunter({
    results             : '#js_results_list',
    info_template   : "<p class='number-posts'>Number of posts found: {{amount}}</p>",
    result_template : "<li><p> <a href='{{link}}'>{{title}}</a></p></li>",
    onKeyUp             : true,
    displaySearchInfo   : true
  });
  $('#js_input_search').on('keyup', function() {
  	var $caja_buscar = $('#js_input_search').val().length;
	  if($caja_buscar > 0){
  		$('#js_container-results').css({
  			display: 'block'
  		}).addClass('animated slideInLeft');
	  }
  });
}
/*
  hides the container of search of the articles
*/
function closeSearch(){
	$('#js_results_close').on('click', function(event) {
		var $caja_buscar = $('#js_input_search');
		setTimeout(function(){ $caja_buscar.val(''); }, 1000);
		$('#js_container-results').css({
				display: 'none'
		});
	});
}
/*
  function to display the navigation pane hidden on mobile devices
*/
function displayNav(){
	$('#js_nav_icon_mobile').on('click', function(e) {
		e.preventDefault();
		$('#js_nav_menu').slideToggle();
	});
	$(window).resize(function(){
    var w = $(window).width();
    if(w>320 && $('#js_nav_menu').is(':hidden')){
      $('#js_nav_menu').removeAttr('style');     
    }
  });
}
/*
===================== http://wicky.nillia.ms/headroom.js/ =========================

hides the nav when the user is scrolling down in the document
o
shows the nav when the user is scrolling up in the document
*/
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
/*
  button up: helps to return to the beginning of the HTML document in a quick way
*/
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
/*
https://highlightjs.org/
give a better presentation to our codeshare
*/
function highlight(){
	$('pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });
}
/*
================ Function to cookies policy ==========================
================ http://www.w3schools.com/js/js_cookies.asp ==========
*/

//function to set a cookie
function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires + "; path=/";
}
//function to get a cookie
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

function cookiePolicy() {
  //stores the value of the cookie
  var cookie=getCookie("_upcookie");
  //validate whether the variable (cookie) is empty
  if (cookie == "") {
    $('#js_bar_accept_cookie').css({
        display: 'block'
    });
  }
  //creates the cookie by clicking on the button with the id (js_btn_cookie)
  $('#js_btn_cookie').on('click', function(e) {
    e.preventDefault();
    var nCookie="_upcookie";
    var cCookie = 'policy of cookies for "theme up"';
    //Validate if the variable (nCookie) is different vacuum
    if (nCookie != "" && nCookie != null) {
      // calls the setCookie () function and assigns values
      setCookie(nCookie, cCookie, 30);
      //hides the container with the id (js_barra_aceptacion_cookie)
      $('#js_bar_accept_cookie').css({
        display: 'none'
      });
      //show a message on the console
      console.log("cookie creada: Name:" + nCookie +" | Content: " + cCookie);
    }
  });  
}
/*
================ cookie end ==========================
*/

/**reading progress**/
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
/*
======================= https://github.com/michael-lynch/reading-time =======

show reading time for article
*/
function readingTime(){
  var $article = $('.js_reading_time');
  $article.readingTime({
    readingTimeTarget: $article.find('.reading-time'),
    wordCountTarget: $article.find('.word-count'),
    wordsPerMinute: 275,
    round: true,
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
/*
================= http://dimsemenov.com/plugins/magnific-popup/ =============

popup for images of the loop
*/
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
/*
================= https://disqus.com/ ============

platform discussions
*/
function disqus(newIdentifier, newUrl, newTitle) {
      if ($('#disqus_thread').length) {
        if (typeof DISQUS === 'undefined') {
          /* * * CONFIGURATION VARIABLES * * */
          var disqus_shortname = 'theme-up'; // required: replace example with your forum shortname
          var disqus_identifier = newIdentifier;
          var disqus_url = newUrl;
          var disqus_title = newTitle;

          /* * * DON'T EDIT BELOW THIS LINE * * */
          (function() {
              var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
              dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
              (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
          })();
        } else {
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.identifier = newIdentifier;
                    this.page.url = newUrl;
                    this.page.title = newTitle;
                }
            });
        }
      }
    }
/*
 function to validate contact form
*/
function formContact(){
  var form = $('.js_contact_form'),
      input_name = $('.js_contact_form .js_input_name'),
      input_email = $('.js_contact_form .js_input_email'),
      textarea_message = $('.js_contact_form .js_textarea_message'),
      btn_form = $('.js_contact_form .js_btn_form'),
      e_name = $('.js_error_name'),
      e_email = $('.js_error_email'),
      e_message = $('.js_error_message');

      input_name.on('focusout', function(event) {
        if(input_name.val() == 0){
          e_name.html('Enter your full name please.');
          input_name.css({border: '3px solid  #FC6E6E'});
          return false;
        }else if(!input_name.val().match(/^[a-záéíóúñü ]+$/ig)){
          e_name.html('Correct your name please.');
          input_name.css({border: '3px solid  #FC6E6E'});
          return false;
        }else{
           input_name.css({border: '3px solid  #27A73F'});
           e_name.html('');
        }
      });

      input_email.on('focusout', function(event) {
        if(input_email.val() == 0){
          e_email.html('Enter your email please.');
          input_email.css({border: '3px solid  #FC6E6E'});
          return false;
        }else if(!input_email.val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)){
          e_email.html('Invalid email format.');
          input_email.css({border: '3px solid  #FC6E6E'});
          return false;
        }else{
          input_email.css({border: '3px solid  #27A73F'});
          e_email.html('');
        }
      });

       textarea_message.on('focusout', function(event) {
        if(textarea_message.val() == 0){
          e_message.html('Enter your message please.');
          textarea_message.css({border: '3px solid  #FC6E6E'});
          return false;
        }else{
         textarea_message.css({border: '3px solid  #27A73F'});
          e_message.html('');
        }
       });

      btn_form.on('click', function(event) {
        event.preventDefault();
        if(input_name.val() == 0){
          e_name.html('Enter your full name please.');
          input_name.css({border: '3px solid  #FC6E6E'});
          input_name.focus();
          return false;
        }else if(!input_name.val().match(/^[a-záéíóúñü ]+$/ig)){
          e_name.html('Correct your name please.');
          input_name.css({border: '3px solid  #FC6E6E'});
          input_name.focus();
          return false;
        }else{
           input_name.css({border: '3px solid  #27A73F'});
           e_name.html('');
        }
        if(input_email.val() == 0){
          e_email.html('Enter your email please.');
          input_email.css({border: '3px solid  #FC6E6E'});
          input_email.focus();
          return false;
        }else if(!input_email.val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)){
          e_email.html('Invalid email format.');
          input_email.css({border: '3px solid  #FC6E6E'});
          input_email.focus();
          return false;
        }else{
          input_email.css({border: '3px solid  #27A73F'});
          e_email.html('');
        }

        if(textarea_message.val() == 0){
          e_message.html('Enter your message please.');
          textarea_message.css({border: '3px solid  #FC6E6E'});
          textarea_message.focus();
          return false;
        }else{
         textarea_message.css({border: '3px solid  #27A73F'});
          e_message.html('');
        }

        if(confirm("Confirm shipment!") == true){
          form.submit();
        }
      });
}
//fitvids
//================ http://fitvidsjs.com/ ============================
function fitvidsjs(){
  $('.post-content').fitVids();
}
//run the functions in the event (ready) of (jquery)
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
  disqus(window.location.href, window.location.href, $('.post-title').text());
  formContact();
  fitvidsjs();
});