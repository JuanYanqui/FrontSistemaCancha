var $body = $('body');
var $progressBar = $('progress');
var value = 0;
var transitionEnd = 'webkitTransitionEnd transitionend';



function setupClickHandlers() {

	// Show next form on continue click
	$('.next').on('click', function() {
     
			var $currentForm = $(this).parents('section');
			showNextForm($currentForm);
	});

	// Reset form on reset button click
	$('.previous').on('click', function() {
		var $currentForm = $(this).parents('section');
			showPreviousForm($currentForm);
	});
	
	return false;
}



function showNextForm($currentForm) {
	var currentFormStep = parseInt($currentForm.attr('data-step')) || false;
	var $nextForm = $('section[data-step="' + (currentFormStep + 1) + '"]');

	console.log('Current step is ' + currentFormStep);
	console.log('The next form is # ' + $nextForm.attr('data-step'));



	// Ensure top of form is in view
	$('html, body').animate({
		scrollTop : $body.offset().top
	}, 'fast');

	// Hide current form fields
	$currentForm.addClass('hidden');
	
	
	
	// Show next form fields
	$nextForm.removeClass('hidden');

  $( ".plane" ).animate({
    left: "+=260",
    
   
  },0,"linear");
  
	// Increment value (based on 4 steps 0 - 100)
	value += 33;

	// Reset if we've reached the end
	if (value >= 100) {
		formReset();
	} else {
		$('.form-progress')
			.find('.form-progress-indicator.active')
			.next('.form-progress-indicator')
			.addClass('active');
    
    
		// Set progress bar to the next value
		$progressBar.val(value);
	}

	// Update hidden progress descriptor (for a11y)
	$('.js-form-progress-completion').html($progressBar.val() + '% complete');

	

	return false;
}



/*previous*/

function showPreviousForm($currentForm) {
	var currentFormStep = parseInt($currentForm.attr('data-step')) || false;
	var $previousForm = $('section[data-step="' + (currentFormStep - 1) + '"]');

	
	console.log('The previous form is # ' + $previousForm.attr('data-step'));



	// Ensure top of form is in view
	$('html, body').animate({
		scrollTop : $body.offset().top
	}, 'fast');

	// Hide current form fields
	$currentForm.addClass('hidden');
	
	
	
	// Show next form fields
	$previousForm.removeClass('hidden');

  $( ".plane" ).animate({
    left: "-=260",
   
  },0);
  
  
	// Increment value (based on 4 steps 0 - 100)
	value -= 33;

	// Reset if we've reached the end
	if (value >= 100) {
		formReset();
	} else {
		$('.form-progress')
			.find('.form-progress-indicator.active')
			.last('.form-progress-indicator')
			.removeClass('active');

		// Set progress bar to the next value
		$progressBar.val(value);
	}

	// Update hidden progress descriptor (for a11y)
	$('.js-form-progress-completion').html($progressBar.val() + '% complete');

	

	return false;
}


function init() {
	setupClickHandlers();
}

init();


$(window, document, undefined).ready(function() {

  $('input').blur(function() {
    var $this = $(this);
    if ($this.val())
      $this.addClass('used');
    else
      $this.removeClass('used');
  });
  
  });

