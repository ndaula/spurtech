var styleColumns = function(){
	var $column1_h =	jQuery('.column-1').height();
	var $column2_h =	jQuery('.column-2').height();

	if($column1_h > $column2_h){
		jQuery('.column-1').css({'border-right':'solid 1px #C4C4C4'});
	} else {
		jQuery('.column-2').css({'border-left':'solid 1px #C4C4C4'});
	}
}

var lcSuperNavOver = function($tabClass){
	jQuery('.'+$tabClass)
		.addClass('highlight').children().show().prepend('<div class="tabExtend"></div>');
}

var lcSuperNavOut = function(){
	jQuery('.iamaTab').removeClass('highlight');
	jQuery('.pane').hide();
}

var helpMePane = function($pane){
	jQuery('.pane_'+$pane).show();
	jQuery('.kcColumns_5.helpMe .column_main').hide();
}

var lmaPane = function($pane){
	jQuery('.pane_'+$pane).show();
	jQuery('.kcColumns_5.lma .column_main').hide();
}

var hidePanes = function($type){
	jQuery('.pane_'+$type).hide();
	jQuery('.kcColumns_5.'+$type+' .column_main').show();
}	

var showAdvancedSearch = function(){
	jQuery('#advancedSearch').removeClass('collapsed').addClass('expanded');
	jQuery('#advancedSearch').slideDown(250);
}

var hideAdvancedSearch = function(){
	$height = jQuery('#advancedSearch').height();
	jQuery('#advancedSearch')
		.animate({hieght:0},250,function(){jQuery(this).hide().css({'height':$height}); })
		.removeClass('expanded')
		.addClass('collapsed');
}

var parentSlider = function($tid){	
	if(jQuery('.children_'+$tid).hasClass('open') == true){
		$count = 0;
		jQuery('.children_'+$tid+' li a').each(function(){
			$count = $count +3+ jQuery(this).attr('offsetHeight');
		});
		jQuery('.children_'+$tid).slideUp(250,
			function(){jQuery('.children_'+$tid).hide().css({'height':$count});
		}).removeClass('open');
		
	} else{
		jQuery('.children_'+$tid).slideDown(250, function(){
			$height = jQuery(this).height();
		}).addClass('open');
		
	}
}

var categorySelect = function($id){
	
	jQuery('#edit-content-type input:checkbox').each(function(){
		if(jQuery(this).attr('value') != $id && jQuery(this).attr('checked')){
			jQuery(this).removeAttr('checked');
		}
	});	
}

var searchFormSubmit = function(){
	var $searchTerm = jQuery('#search-block-form input[type=text]').val()
	var $selectedContent;
	var $selectedProducts = new Array();
	var $node_id;
	var $filters;
	var i = 0;
	
	jQuery('#edit-content-type input:checkbox').each(function(){
		if(jQuery(this).attr('checked')){
			$selectedContent = 'bundle%3A'+ jQuery(this).attr('value')
		}
	});
	
		
	jQuery('#edit-products input:checkbox').each(function(){
		if(jQuery(this).attr('checked')){
			$selectedProducts[i] = 'im_16_field_product_catagories%3A'+jQuery(this).attr('value');
			i++;
		}
	});
	
	
	if(jQuery('#edit-article-id-search #edit-articleid').attr('checked')){
		$node_id = jQuery('#edit-article-id-search #edit-id-text').attr('value');
	}
	
	
	if($selectedContent || $selectedProducts.length >= 1){
		$filters = '?filters='
		$filters += ($selectedContent) ? $selectedContent :''
		
		$.each($selectedProducts, function(i,v){
			$filters += ($filters == '?filters=') ? v : '%20' + v;
		});
	}
	
	
	if($filters && $searchTerm){
		window.location = "/knowledge_center/search/site/" + $searchTerm + $filters;
	} else if($node_id){
		window.location = "/knowledge_center/node/" + $node_id;
	} else if($searchTerm){
		submit();
	}
	
};

var advancedSlider = function(){
	$this = jQuery('#mainsearch-wrap #edit-advancedsearch')
	$button = jQuery('.articleIdButton')
	if($this.hasClass('expanded') == true){
		$this.removeClass('expanded').addClass('collapsed').animate({height:0}).hide();
		$button.removeClass('expanded').addClass('collapsed');
	} else {
		$this.removeClass('collapsed').addClass('expanded').show().animate({height:30},100);
		$button.removeClass('collapsed').addClass('expanded');
	}
}

var anchorPadding = function(){
	$('a').each(function(){
		var caller = this
		var href = $(caller).attr('href')
		if(href && href.indexOf('#') >= 0){
			$(this).click(function(event){
				event.preventDefault();
				var scroll = $(href).offset().top - 150
				window.scrollTo(0,scroll);
			});
		}
	});
}

// DOM LOAD
jQuery(document).ready(function(){
	styleColumns();	
	
	jQuery('.iamaTab').hoverIntent(function(){
		$class = jQuery(this).attr('class').split(' ')[0];
		lcSuperNavOver($class);
	}, function(){
		$class = jQuery(this).attr('class').split(' ')[0];
		lcSuperNavOut($class);
	});
	
	jQuery('#block-apachesolr-sort li').eq(2).hide();
	
	anchorPadding();
	
});
	
