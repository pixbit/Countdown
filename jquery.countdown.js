/**
 * @author Zack Perdue / Ziggidy Creative
 * http://zackperdue.com
 * http://ziggidycreative.com
 *
 * Version 0.1
 * Copyright (c) 2011 Ziggidy Creative
 *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 */

 jQuery.fn.countdown = function(options)
{
	// I added this comment
	var defaults = {
		target: 'September 24, 2011',
		parts: ['days', 'hours', 'minutes', 'seconds'],
		separator: ":",
		leadingZero: true,
		height: 180,
		ended: function(){

		}
	}

	var ticker_days = ['<ul>'],
		ticker_hours = ['<ul>'],
		ticker_minutes = ['<ul>'],
		ticker_seconds = ['<ul>'],
		zero = '';

	var now,
		target,
		remaining,
		milli,
		a_days,
		days,
		a_hours,
		hours,
		minutes,
		a_minutes,
		seconds;

	jQuery.extend(defaults, options);

	return this.each(function(){

		var timer = ['<ul>'];

		for (i=0; i < defaults.parts.length; i++){
			timer.push('<li class="part-'+defaults.parts[i]+'"></li>');

			if (defaults.separator !== ":")
			{
				separators = (defaults.parts.length) - 0;
			}else{
				separators = (defaults.parts.length) - 1;
			}

			if (i !== separators){
				if(defaults.separator == ":")
				{
					timer.push('<li class="part-separator">'+defaults.separator+'</li>');
				}else if(defaults.separator == "full"){
					var tag = '';
					switch(defaults.parts[i]){
						case 'days':
							tag = 'D';
							break;
						case 'hours':
							tag = 'H';
							break;
						case 'minutes':
							tag = 'MIN';
							break;
						case 'seconds':
							tag = 'SEC';
							break;
						default:
							tag = defaults.parts[i];
					}
					timer.push('<li class="part-separator">'+tag+'</li>');
				}else if(defaults.separator == "short"){
					timer.push('<li class="part-separator">'+defaults.parts[i].substring(0,1)+'</li>');
				}
			}

		}

		timer.push('</li>');
		timer = timer.join('');

		jQuery(this).append(timer);

		var now = new Date(),
			target = new Date(defaults.target),
			remaining = target.getTime() - now.getTime(),
			milli = 864e5,
			a_days = remaining / milli,
			days = Math.floor(a_days),
			a_hours = (a_days - days) * 24,
			hours = Math.floor(a_hours),
			minutes = Math.floor((a_hours - hours) * 60),
			a_minutes = (a_hours - hours) * 60,
			seconds = Math.floor((a_minutes - minutes) * 60);

		for (i=0; i<=days; i++){
			if(defaults.leadingZero){
				if(i < 10){
					zero = 0;
				}else{
					zero = '';
				}
			}
			ticker_days.push('<li>'+zero+i+'</li>');
		}
		ticker_days.push('</ul>');

		for (i=0; i<=24; i++){
			if(defaults.leadingZero){
				if(i < 10){
					zero = 0;
				}else{
					zero = '';
				}
			}
			ticker_hours.push('<li>'+zero+i+'</li>');
		}
		ticker_hours.push('</ul>');

		for (i=0; i<=59; i++){
			if(defaults.leadingZero){
				if(i < 10){
					zero = 0;
				}else{
					zero = '';
				}
			}
			ticker_minutes.push('<li>'+zero+i+'</li>');
		}
		ticker_minutes.push('</ul>');

		for (i=0; i<=59; i++){
			if(defaults.leadingZero){
				if(i < 10){
					zero = 0;
				}else{
					zero = '';
				}
			}
			ticker_seconds.push('<li>'+zero+i+'</li>');
		}
		ticker_seconds.push('</ul>');

		ticker_days = ticker_days.join('');
		ticker_hours = ticker_hours.join('');
		ticker_minutes = ticker_minutes.join('');
		ticker_seconds = ticker_seconds.join('');

		jQuery(this).find('ul li.part-days').append(ticker_days);
		jQuery(this).find('ul li.part-hours').append(ticker_hours);
		jQuery(this).find('ul li.part-minutes').append(ticker_minutes);
		jQuery(this).find('ul li.part-seconds').append(ticker_seconds);

		var minutes_height = jQuery('.part-minutes ul').innerHeight(),
			days_height = jQuery('.part-days ul').innerHeight(),
			hours_height = jQuery('.part-hours ul').innerHeight(),
			seconds_height = jQuery('.part-seconds ul').innerHeight();


		jQuery('.part-seconds ul').css({'top': (defaults.height * seconds) * -1});
		jQuery('.part-minutes ul').css({'top': (defaults.height * minutes) * -1});
		jQuery('.part-hours ul').css({'top': (defaults.height * hours) * -1});
		jQuery('.part-days ul').css({'top': (defaults.height * days) * -1});


		timer = window.setInterval(function(){

			var now = new Date(),
				target = new Date(defaults.target),
				remaining = target.getTime() - now.getTime(),
				milli = 864e5,
				a_days = remaining / milli,
				days = Math.floor(a_days),
				a_hours = (a_days - days) * 24,
				hours = Math.floor(a_hours),
				minutes = Math.floor((a_hours - hours) * 60),
				a_minutes = (a_hours - hours) * 60,
				seconds = Math.floor((a_minutes - minutes) * 60);

			if (remaining <= 0)
			{
				clearInterval(timer);
				defaults.ended();
			}

			jQuery('.part-seconds ul').animate({'top': ((defaults.height * seconds) * -1)}, defaults.speed);
			jQuery('.part-minutes ul').animate({'top': ((defaults.height * minutes) * -1)}, defaults.speed);
			jQuery('.part-hours ul').animate({'top': ((defaults.height * hours) * -1)}, defaults.speed);
			jQuery('.part-days ul').animate({'top': ((defaults.height * days) * -1)}, defaults.speed);

		}, 1000);

	});

}