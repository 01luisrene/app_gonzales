'use strict';
function search(){
	var searchField =  $('#js_campo_search').ghostHunter({
    results             : '#js_list_results',
    info_template   : "<p class='number-posts'>Number of posts found: {{amount}}</p>",
    result_template : "<li><a href='{{link}}'><p><h2><i class='fa fa-circle' aria-hidden='true'></i> &nbsp;{{title}}</h2></p></a></li>",
    onKeyUp             : true,
    displaySearchInfo   : true
  });
  $('#js_campo_search').on('keyup', function() {
  	var $caja_buscar = $('#js_campo_search').val().length;
	  if($caja_buscar > 0){
  		$('#js_box_results').css({
  			display: 'block'
  		}).addClass('animated zoomIn');
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
$(document).ready(function() {
	search();
	closeSearch()
});