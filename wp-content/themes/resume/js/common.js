(function($){
	
	//transitionTime
	var guruTransTime = 350,
		maxWidth = 960,
		basePadding = 35;
		
	$(document).ready(function(){
		console.log('hello common ready');
		
		$('html.ie').length ? Guru.ie = true : Guru.ie = false;
		$('html.lte8').length ? Guru.lte8 = true : Guru.lte8 = false;
		typeof WebKitPoint !== 'undefined' ? Guru.webkit = true : Guru.webkit = false;
				
		autoMenu();
		
        var fpRotate = new GuruRotator({
             transitionTime: 750,
             timeoutTime: 7000,
             showControls: true
         });
         
         pageReadMore();
	});	
	
	
	function pageReadMore(){
//		if ( $('.page-read-more').length ){
//			var readMore = $('.page-read-more'),
		if ( $('.entry-content .more-link').length ){
			var readMore = $('.entry-content .more-link'),
				rest = $('.entry-full');
			
			rest.find('span[id]').each(function(){
				$(this).siblings('br').remove();
				$(this).remove();
			});	
			
			//readMore.append('<div class="tri"></div>').click(function(e){
			readMore.click(function(e){
				
				e.preventDefault();
				
				$(this).fadeOut(guruTransTime);
				rest.slideDown(guruTransTime * 2, function(){
					$(window).trigger('resize');
				});
				
				//return false;
			});;
		}
	}
	
	
	//this hampton project has a right and a left primary nav menu.
	function autoMenu(){
		if ( $('#header nav').length ) {
			
			$('#header nav').each(function(){
				
				var nav = $(this),
					lis = $(this).find('li'),
					innerMargin = 75;
		
				var sizeItUp = function(){
								
					//make total item width
					var lisW = 0;
					
					lis.each(function(){
						lisW += $(this).width();
					});
					
					//now calculate the right margin for the lis
					//var margin = Math.floor( ( nav.width() - lisW ) / (lis.length - 1) - 3 );
					var margin = Math.floor( ( maxWidth/2 - innerMargin - basePadding - lisW ) / (lis.length - 1) - 3 );
					
					if( nav.is('#accessLeft') ){
						//console.log('accessLeft', nav );
						lis.not(':first').css({ marginLeft: margin });
					} else {
						//console.log('accessRight', nav );
						lis.not(':last').css({ marginRight: margin });
					}
					
					//lis.not(':last').css({ marginRight: margin });
				};
				
				//size up the menu		
				$(window).resize( sizeItUp );
				
				//find the current_page item if it is a special post type archive
				lis.each(function(){				
					if ( $(this).find('a').attr('href') === window.location.href ) {
						$(this).addClass('current-menu-item current_page_item');
					}
				});
				
			});
						
//			var sizeItUp = function(){
//				if ( $(window).width() >= maxWidth ){
//				
//					//to make total item width
//					var	lisW = 0;
//					
//					lis.each(function(){
//						lisW += $(this).width();
//					});
//					
//					//now calculate the right margin for the lis
//					var margin = Math.floor( ( nav.width() - lisW ) / (lis.length - 1) - 3 );
//					
//					lis.not(':last').css({ marginRight: margin });
//					
//					//console.log('fit those nav items', nav, nav.width(), lisW, margin);
//				}
//			};

			//size up the menu		
			$(window).resize();
			
			
		}
	}
	
	
})(jQuery);
