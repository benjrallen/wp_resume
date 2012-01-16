// place any jQuery/helper plugins in here, instead of separate, slower script files.


/*
 * Try/Catch the console
 */
try{
    console.log('Hello Console.');
} catch(e) {
    window.console = {};
    var cMethods = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn".split(",");
    for (var i=0; i<cMethods.length; i++) {
        console[ cMethods[i] ] = function(){};
    }
}


(function($){
	
	var GuruRotator = function(config){
		var me = this,
			defaults = {
				contID: 'rotator',
				//metaID: 'descriptions',
				sliderClass: 'slides',
				controlsClass: 'controls',
//				nextText: '»',
//				prevText: '«',
				nextText: '>>',
				prevText: '<<',
				//ctrlKey: 'ctrl',
				z: 1, //z-index set to 1 in css for the slides
				transitionTime: 1000,
				timeoutTime: 7500,
				showControls: false //false, true, or 'binary'.  'binary' will print out the controls as prev/next only
			};
			
		for (var key in config) {
			defaults[key] = config[key] || defaults[key];
		}
	
		for (var key in defaults) {
			me[key] = defaults[key];
		}
		
		//unconfigurable variables		
		me.container;
		me.slider;
		me.slides;
		me.controls;
		me.sliderTimeout = null;
		
		me.init = function(){
			if( $('#'+me.contID).length ){
				//initialize variables
				me.container = $('#'+me.contID);
				me.slider = me.container.find('.'+me.sliderClass);
				me.slides = me.slider.children(); 
				
				//check if ie 8 or below (dependent on boilerplate html conditional classes)
				//if ( $('html.lte8').length )
				//	me.transitionTime = 0;
												
				//print controls
				me.controls = me.makeControls();
				
				//the last slide is the one that shows onload
				me.controls.children().last().addClass('active');
				me.slides.last().addClass('active');
				
				//so set all the others to 0 opacity
				me.slides.not('.active').fadeOut(0);

				//only rotate if the slider is visible
				$(window).resize(me.onResize);
				
				//'trigger it'
				me.onResize();
				
				
				return me;
			}
			
			return false;
		};
		
		me.onResize = function(e){
			
			if ( me.container.is(':visible') ) {
				//start the change timer
				if( !me.sliderTimeout )
					me.sliderTimeout = setTimeout( me.sliderTimeoutFunc, me.timeoutTime );
			} else {
				if ( me.sliderTimeout ) {
					clearTimeout( me.sliderTimeout );
					me.sliderTimeout = null;
					//console.log( 'timeout cleared', me.sliderTimeout );
				}
			}
		}
		
		me.makeControls = function(){
			var ctrls = $('<div />').addClass( me.controlsClass );
			
			if ( me.showControls === 'binary' ) {
				//make prev/next selctors to switch through the slides
				$('<div />', { text: me.prevText }).addClass('prev').click(me.ctrlClickHandle).appendTo( ctrls );		
				$('<div />', { text: me.nextText }).addClass('next').click(me.ctrlClickHandle).appendTo( ctrls );		
			} else {
				//make a selector for each slide
				me.slides.each(function(i){
					var gid = $(this).attr('gid');
					var ctrl = $('<div />', { text: i+1, gid: gid }).click(me.ctrlClickHandle).appendTo( ctrls );
				});
			}
			
			if ( !me.showControls )
				ctrls.hide();
			
			ctrls.appendTo(me.container);
			
			return ctrls;
		};
		
		me.ctrlClickHandle = function(e){
			me.showControls === 'binary' ?
				me.binarySlideChange( $(this) ) :
				me.slideChange( $(this) ) ;
		}

		me.slideChange = function( ctrl ){
			var gid = ctrl.attr('gid');
			
			if ( !ctrl.hasClass('active') ) {
				
				//clear the timeout transition.  this will allow us to essentially reset the change timer
				clearTimeout( me.sliderTimeout);
				
				//increment the target z-index up by one
				me.z++;
				
				//get the target slide
				var slide = $( '#'+me.contID ).children().not('.'+me.controlsClass).find('[gid="'+gid+'"]');

				//switch to the new slide
				me.fadeChange( slide );
				
				//turn on the corresponding control circle
				ctrl.addClass('active')
					//and turn off the old one
					.siblings('.active').removeClass('active');
					
				//start the change timer
				return me.sliderTimeout = setTimeout( me.sliderTimeoutFunc, me.timeoutTime );
			}
		};
		
		me.fadeChange = function( slide ){
			if ( !slide ) return false;
			
			//stop the animation if one is fading in
			me.slider.children('.active').stop(false, false);
			
			//finish the animation for those that are fading out (all not active slides are told to fade out everytime)
			me.slides.not('.active').stop(false,true);
			
			//set this one as active to signify that it is fading in.
			slide.addClass('active')
				//move it to the top
				.css({ zIndex: me.z })
				//clear its animation queue cause we are using setTimeout and might have a stacked queue
				.stop(true,true)
				//fade it in
				.fadeTo( me.transitionTime, 1)
					//get all the other slides
					.siblings().not('#descriptions-back, .donate')
					//clear its animation queue cause we are using setTimeout and might have a stacked queue
					.stop(true,true)					
					//tell them to get to zero opacity
					.fadeOut(me.transitionTime)
					//and tell them that none of them are fading in
					.removeClass('active');				
		};
		
		//alternate slideChange if controls are prev/next binary
		me.binarySlideChange = function( ctrl ){
			//stop the timeout
			clearTimeout( me.sliderTimeout );
			
			//increment the target z-index up by one
			me.z++;

			var currentSlide = me.slider.children('.active');
			
			//determine the target slide... decide if ctrl was a click or timeout
			var slide = ( 
				!ctrl || ctrl.hasClass('prev') ?
					//go back
					currentSlide.prev().length ? currentSlide.prev() : me.slider.children().last() :
					//go forward
					currentSlide.next().length ? currentSlide.next() : me.slider.children().first()
			);
			
			//switch to the new slide
			me.fadeChange( slide );
			
			//start the change timer
			return me.sliderTimeout = setTimeout( me.sliderTimeoutFunc, me.timeoutTime );
			
		};
		
		//set up the timeout change function
		me.sliderTimeoutFunc = function(){
			
			//console.log( 'slider timeout', me.container.is(':visible') );
			
			//binary prev/next controls have a slightly different functionality
			if ( me.showControls === 'binary' )
				return me.binarySlideChange();
				
			var currentSlide = me.controls.children('.active'),
				nextSlide = ( currentSlide.next().length ? currentSlide.next() : me.controls.children().first() );
						
			return me.slideChange( nextSlide );
		};
				
		return me.init();		
	}
	
	//expose to window
	window['GuruRotator'] = GuruRotator;
	
})(jQuery);

