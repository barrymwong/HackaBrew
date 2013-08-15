(function($){
	var global = {
		windowTitle : window.document.title,
		scrollTop : $(document).scrollTop(),
		scrollLeft : $(document).scrollLeft(),
		hash : window.location.hash,
		clickScrollOn : 0,
		autoScrollOn : 0,
		topOffset : 600,
		leftOffset : 600,
		lastLeft : 0,
		lastTop : 0,
		frameTop : 0,
		frameLeft: 0,
		loading : '9)~`B!1#Z3^6/&7x*0_a-+=4%Y{[c}]|$5X\:;">.<@2<?/',
		loadingTimer : '',
		loadingFrame : 0,
		page : [
			{ title : 'HackaBrew Co.', hash : '#HackaBrew-Co', top: 0, left: 0, code: 'beer' },
			{ title : 'I know HTML (How To Make Lager)', hash : '#I-know-HTML', top: 0, left: 2000, code: 'pale lager'  },
			{ title : 'Ruby on Ales', hash : '#Ruby-on-Ales', top: 1000, left:0, code: 'red ale'  },
			{ title : 'Localhost:8888', hash : '#Localhost-8888', top: 1000, left: 2000, code: 'porter'  },
			{ title : 'Internet Porn Ale', hash : '#Internet-Porn-Ale', top: 2000, left: 0, code: 'ipa'  },
			{ title : 'MacBrew Pro', hash : '#MacBrew-Pro', top: 2000, left: 2000, code: 'hard cider'  }
		],
		console : [
			{code : 'help', desc : 'show commands' },
			{code : 'clear', desc : 'clear console data' },
			{code : 'next', desc : 'go to next screen' },
			{code : 'previous', desc : 'go to previous screen' },
			{code : 'first', desc : 'go to first screen' },
			{code : 'last', desc : 'go to last screen' },
			{code : 'hide', desc : 'hide console' },
			{code : 'barry', desc : 'Barry M. Wong' }
		],
		consoleData : ''
		
	};


	// run on load
	var init = function(){

		window.onscroll = function(e){
			//e.preventDefault();
			//scrollbar();
		};

		window.onhashchange = function(){
			hashChange();
		};

		setClickLink();
		window.location.hash = global.page[0].hash;
			

		//$('#next').attr('href', global.page[1].hash);	
		//$('#prev').attr('href', global.page[5].hash);	

		$(document).on('submit', 'form#form-console', function(e){
			var q = $(this).parent().find('.query').val().toLowerCase();
			if(global.clickScrollOn === 0) {
				consoleSubmit(q);
			}
			e.preventDefault();
		});

		$(document).on('click', 'a.console-text', function(e){
			var hash = $(this).html();
			
			$('#console-contents').addClass('on');
			$('.hide-toggle a').html('[-] Hide Console');
			$('.query').val(hash).focus();

			e.preventDefault();

		});

		$(document).on('click', '.hide-toggle a', function(e){

console.log($('#console-contents').hasClass('on'));

			if( $('#console-contents').hasClass('on') ){



				$('#console-contents').removeClass('on');
				$('.hide-toggle a').html('[+] Show Console');

			} else {
				$('#console-contents').addClass('on');
				$('.hide-toggle a').html('[-] Hide Console');
			}
			e.preventDefault();
		});
		
		$(document).on('focus', '.query', function(){
			$(this).parent('.query-box').addClass('on');
		});
		
		$(document).on('blur', '.query', function(){
			$(this).parent('.query-box').removeClass('on');
		});

		clearConsoleText();
	};


	// help keyword console tables
	var consoleHelp = function(){
		var consoleLength = global.console.length,
			beerLength = global.page.length,
			beerData = '',
			consoleData = '',
			data = '';

		for(var i = 0; i < beerLength; i++){
			beerData += '<tr><td class="align-right"><a class="console-text" href="#">' + global.page[i].code + '</a></td><td>' + global.page[i].title + '</td></tr>';
		}

		for( var i = 0; i < consoleLength; i++ ) {
			consoleData += '<tr><td class="align-right"><a class="console-text" href="#">' + global.console[i].code + '</a></td><td>' + global.console[i].desc + '</td></tr>';
		}
		
		data += '<div class="cb"></div>';
		data += '<table class="fl">' + beerData + '</table>';
		data += '<table class="fl">' + consoleData + '</table>';
		data += '<div class="cb"></div>';
		return data;
	};

	// clear console input text
	var clearConsoleText = function() {
		$('.query').focus().val('');
	};

	// console start over
	var resetConsole = function(){
		global.consoleData = '';
		$('#console-data').html('');
		clearConsoleText();
	};

	// submit console and process the query value
	var consoleSubmit = function(q) {
		var consoleData = global.consoleData,
			i, 
			isBeer = 0,
			isKeyword = 0,
			dataHeight,
			dataHeightLastChild,
			original_q = q,
			same = 0,
			i_val = '',
			globalPageLength = global.page.length;

		if(q === ''){
			return false;
		}
		
		// search through beers
		for(var i in global.page){
			if(global.page[i].code === q){
				isBeer = 1;
				i_val = i;
			}
		}

		// search through other console keywords
		for(var i in global.console) {
			if(global.console[i].code === q){
				isKeyword = 1;
				i_val = i;
			}
		}
		
		q = '<span class="console-entry">' + q + '</span>';

		if(isBeer === 1){

			if(window.location.hash === global.page[i_val].hash){
				same = 1;
			}

			window.location.hash = global.page[i_val].hash;
			//q = '<a href="' + global.page[i_val].hash + '">' + q + '</a>';
			

			if(same === 1) {
				q = q + '<br><span class="subtext warning">currently visible</span>';
			} else {
				q = q + '<br><span class="subtext">' + global.page[i_val].title + '</span>';
			}

		} else if(isKeyword === 1){
		


			switch(global.console[i_val].code) {
				case 'help' :
					q = q + consoleHelp();
					break;
				case 'clear' :
					resetConsole();
					break;
					return;
				case 'barry' :
					q = q + '<span class="subtext"><a href="http://barrymwong.com" target="_blank">barrymwong.com</a></span>';
					break;
				case 'first' :
				
					var same = 0;
					
					for(var i in global.page){
						if(global.page[i].hash === window.location.hash){
							var j_val = i;
						}
					}
					
					if(window.location.hash === global.page[0].hash){
						same = 1;
					}
					
					if(same === 1) {
						q = q + '<br><span class="subtext warning">currently visible</span>';
					} else {
						window.location.hash = global.page[0].hash;
						q = q + '<span class="subtext">' + global.page[0].title + '</span>';
					}
					
					break;
				case 'last' :
				
					var same = 0;
					
					for(var i in global.page){
						if(global.page[i].hash === window.location.hash){
							var j_val = i;
						}
					}
					
					if(window.location.hash === global.page[globalPageLength-1].hash){
						same = 1;
					}
				
					if(same === 1) {
						q = q + '<br><span class="subtext warning">currently visible</span>';
					} else {
						window.location.hash = global.page[globalPageLength-1].hash;
						q = q + '<span class="subtext">' + global.page[globalPageLength-1].title + '</span>';
					}
					
					break;

				case 'next' :
					var globalPageLength = global.page.length;
			
					for(var i in global.page){
						if(global.page[i].hash === window.location.hash){
							var j_val = i;
						}
					}
					
					j_val++;
					
					if(j_val > globalPageLength-1) {
						j_val = 0;
					}

					window.location.hash = global.page[j_val].hash;
					q = q + '<span class="subtext">' + global.page[j_val].title + '</span>';
					break;

				case 'previous' :
					var globalPageLength = global.page.length;
			
					for(var i in global.page){
						if(global.page[i].hash === window.location.hash){
							var j_val = i;
						}
					}
					
					j_val--;

					if(j_val < 0) {
						j_val = globalPageLength-1;
					}
					
					window.location.hash = global.page[j_val].hash;
					q = q + '<span class="subtext">' + global.page[j_val].title + '</span>';
					break;

				case 'hide' :
					var t;

					t = setTimeout(function(){
						$('#console-contents').removeClass('on');
						$('.hide-toggle a').html('[+] Show Console');
						clearTimeout(t);
					},1000);
					q = q + '<span class="subtext">hide console</span>';
					break;

				default :
					q = q + '<span class="subtext warning">unavailable (future enhancement)</span>';
					break;
			}
			
			

		}

		if(consoleData === '') {
			$('#console-data').html('<ul id="data"></ul>');
		}

		if(isKeyword === 0 && isBeer === 0) {
			q = q + '<span class="subtext error">undefined command</span>';
		}

		q = '<li>' + q + '</li>';

		consoleData = consoleData += q; 
		global.consoleData = consoleData;

		$('#data').html(consoleData);
		
		dataHeightLastChild = $('#data li:last-child').height() + 5;
		dataHeight = $('#data').height() - dataHeightLastChild;
		
		$('#console-data').stop().animate({
	 		scrollTop: dataHeight}, {
	 		duration: 500
	 	});

		clearConsoleText();

		if(original_q === 'clear') {
			resetConsole();
		}
	};
	
	// screen transition loading animation
	var loading = function(){
		var loading = global.loading,
			t;
		
		global.loadingTimer	= setInterval(function(){
			$('#loading').html(global.loading[global.loadingFrame]);
			window.document.title = global.loading[global.loadingFrame];
			
			if(global.loadingFrame >= loading.length-1 ){
				global.loadingFrame = 0;
			} else {
				global.loadingFrame++;
			}
			
			
		},100);	
	};
	
	// enable or disable a tag click
	var setClickLink = function() {
		$(document).on('click', 'a', function(e){

			if(global.clickScrollOn === 1) {
				e.preventDefault();
			}
			 
		});
	};

	var directionCSS = function(lr, tb) {
		if(tb === 'up') {
			$('body').removeClass('up').addClass('down');
		} else {
			$('body').removeClass('down').addClass('up');
		}

		if(lr === 'left') {
			$('body').removeClass('left').addClass('right');
		} else {
			$('body').removeClass('right').addClass('left');
		}
	};

	var lastSection = function(left, top) {
		var last_top = global.lastTop,
			last_left = global.lastLeft,
			now_top = top,
			now_left = left,
			lr, tb;
		
		if(now_top !== last_top && now_left !== last_left) {
			global.lastTop = now_top;
			global.lastLeft = now_left;

			$('body').addClass('');

			lr = (now_top > last_top) ? 'up' : 'down';
			tb = (now_left > last_left) ? 'left' : 'right';

			directionCSS(lr, tb);
		}
	};

	var navHighlight = function(hash) {
		var li = $('#nav li'),
			i;

		for(i = 0; i <= li.length - 1; i++){
			if( $('#nav li > a:eq(' + i + ')').attr('href') === hash ) {
				$('#nav li > a:eq(' + i + ')').addClass('on');
			} else {
				$('#nav li > a:eq(' + i + ')').removeClass('on');
			}
		}
	};

	var hashChange = function(){
		var hash = window.location.hash;

		if(global.clickScrollOn === 0) {
			$('.page').removeClass('on');
			$(hash + '.page').addClass('on');
			animScrollClick(hash);
		}

		navHighlight(hash);
	};

	var animScrollClick = function(hash) {
		var top, left, 
			vertTime = 500, 
			horizTime = 1500;

		if(hash === global.page[0].hash) {
			top = global.page[0].top;
			left = global.page[0].left;
		} else if(hash === global.page[1].hash) {
			top = global.page[1].top;
			left = global.page[1].left;
		} else if(hash === global.page[2].hash) {
			top = global.page[2].top;
			left = global.page[2].left;
		} else if(hash === global.page[3].hash) {
			top = global.page[3].top;
			left = global.page[3].left;
		} else if(hash === global.page[4].hash) {
			top = global.page[4].top;
			left = global.page[4].left;
		} else if(hash === global.page[5].hash) {
			top = global.page[5].top;
			left = global.page[5].left;
		} else if(hash === global.page[6].hash) {
			top = global.page[6].top;
			left = global.page[6].left;
		}

		global.clickScrollOn = 1;
		
		vertTime = (top === global.lastTop) ? 0 : vertTime;
		horizTime = (left === global.lastLeft) ? 0 : horizTime;
		
		$('#loading').addClass('on');
		loading();
		setClickLink();

		$('html, body').stop().animate({
	 		scrollTop: top}, {
	 		duration: vertTime
	 	}).animate({
	 		scrollLeft: left}, {
	 		duration: horizTime,
			complete: function() {
	 			
	 			lastSection(global.lastLeft, global.lastTop);
				
				global.lastTop = top;
				global.lastLeft = left;

				$('#page-top').html(left + ', ' + top);

				global.clickScrollOn = 0;
				setClickLink();
				$('#loading').removeClass('on');
				clearInterval(global.loadingTimer);
				window.document.title = global.windowTitle;
	 		}
	 	});
	};

	init(); // run

})(jQuery);








