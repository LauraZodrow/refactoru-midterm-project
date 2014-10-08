var quotes = [
	{
		author: 'Helen Keller',
		quote: "College isn't the place to go for ideas.",
		rating: 4
	},
	{
		author: 'George Sewell',
		quote: 'Fear is the tax that conscience pays to guilt.',
		rating: 2
	},
	{
		author: 'Helen Keller',
		quote: "Life is either a daring adventure or nothing. Security does not exist in nature, nor do the children of men as a whole experience it. Avoiding danger is no safer in the long run than exposure.",
		rating: 3
	}
];
var filteredAuthor = '';

// $(document).on('ready', function() {
$(function() {

	// 1. DOM MANIPULATION //////////////////

	/** Renders all the quotes into the #quotes element, filtered by author. */
	var renderQuotes = function() {
		$("#quotes").empty().append(createQuotesList(quotes, filteredAuthor));
	}

	/** Creates a new unordered list element containing the given quotes, filtered by author. */
	var createQuotesList = function(quotes, filteredAuthor) {

		var quotesToRender = !filteredAuthor ?
			quotes : 
			quotes.filter(function(quote) {
				return quote.author === filteredAuthor;
			});

		var quoteItems = quotesToRender.map(function(quote, i) {
			return $('<li>').append(createQuote(quotes[i], i));
		});

		return $('<ul class="list-unstyled">').append(quoteItems);
	};

	/** Create a quote element from the given quote data with the given index. */
	var createQuote = function(quote, i) {
		var quoteEl = $('<div class="quote clearfix" data-index="{0}"></div>'.supplant([i]));
		var quoteControls = $('<div class="quote-controls"></div>')
		var ratingEl = createRating(quote.rating);
		var deleteEl = $('<a class="quote-delete btn btn-xs btn-danger">&times;</a>');
		var quoteTextEl = $('<q class="quote-text">{quote}</q>'.supplant(quote));
		var authorEl = $('<div class="quote-author"><a href="#" class="quote-author-link">-{author}</a></div>'.supplant(quote));

		quoteEl.append(quoteTextEl);
		quoteEl.append(authorEl);

		quoteControls.append(ratingEl);
		quoteControls.append(deleteEl);
		quoteEl.append(quoteControls);

		return quoteEl;
	};

	/** Create a rating element. */
	var createRating = function(rating) {
		var ratingEl = $('<div class="quote-rating">');
		var buttonGroup = $('<div class="btn-group btn-group-xs" data-toggle="buttons">');

		buttonGroup.append([1,2,3,4,5].map(function(n) {
			return createRatingLabel(rating, n);
		}))

		ratingEl.append(buttonGroup);

		return ratingEl;
	};

	/** Creates a single rating label element to be used in a button group. */
	var createRatingLabel = function(rating, n) {
		var label = $('<label class="btn btn-default">').text(n);
    var radio = $('<input type="radio" name="options">').attr('value', n);

  	label.append(radio);

  	if(rating === n) {
  		label.addClass('active');
  	}
  	return label;
	};

	/** Hide the author input and replace it with the given author name to show what quotes are currently being filtered by. */
	var showByAuthor = function(author) {
		$('#author-form-group').addClass('animate-left-collapsed')
		$('#author-shown').removeClass('animate-left-collapsed');
		$('#author-shown-author').text(author);
		$('#inputAuthor').val(author);
		$('#inputQuote').focus();
	};

	/** Hide the author name and show the author input (as in, disablying the filter). */
	var hideByAuthor = function(author) {
		$('#author-form-group').removeClass('animate-left-collapsed')
		$('#author-shown').addClass('animate-left-collapsed');
		$('#inputAuthor').val(author);
		$('#inputAuthor').focus();
	};


	// 2. FORM PROCESSING //////////////////

	/** Extracts the values from the form and return a quote data object. */
	var getQuote = function() {
		return {
			author: $('#inputAuthor').val(),
			quote:  $('#inputQuote').val()
		};
	};

	/** Clears the values in the quote form. */
	var clearQuoteForm = function() {
		$('#add-quote-form input').val('');
		clearValidation();
		$('#inputAuthor').focus();
	};

	/** Clears any validation errors on the form. */
	var clearValidation = function() {
		$('#validation-message').addClass('hidden')
		$('#add-quote-form .has-error').removeClass('has-error');
	};

	/** Validates the form values, displaying validation errors. Returns true if the form is valid, otherwise returns false. */
	var validateForm = function() {

		clearValidation();

		var valid = true;

		if($('#inputAuthor').val().length === 0) {
			$('#inputAuthor').closest('.form-group').addClass('has-error');
			valid = false;
		}

		if($('#inputQuote').val().length === 0) {
			$('#inputQuote').closest('.form-group').addClass('has-error');
			valid = false;

		}
		return valid;
	};

	/** Displays the validation error message. */
	var displayValidationError = function() {

		$('#validation-message')
			.removeClass('hidden')
			.text('Please fill out all fields.');
	};


	// 3. EVENTS //////////////////

	// submit form
	$('#add-quote-form').on('submit', function(e) {
		e.preventDefault();

		if(validateForm()) {
			quotes.splice(0,0,getQuote());
			renderQuotes();
			clearQuoteForm();
		}
		else {
			displayValidationError();
		}
	});

	// delete a quote
	$(document).on('click', '.quote-delete', function() {
		$('#random-quote-modal').modal('hide');
		var quote = $(this).closest('.quote');
		var index = quote.attr('data-index');
		quotes.splice(index,1);
		renderQuotes();
	});

	// rate a quote
	$(document).on('click', '.quote-rating .btn', function() {
		var index = $(this).closest('.quote').attr('data-index');
		quotes[index].rating = +$(this).text();
		quotes.sort(compareByReverseRating);
		renderQuotes();
	});

	// filter by author
	$(document).on('click', '.quote-author-link', function() {
		var author = $(this).text().substring(1);
		filteredAuthor = author;
		showByAuthor(author);
		$('#random-quote-modal').modal('hide');
		clearValidation();
		renderQuotes();
	});

	// remove filter by author
	$('#author-shown-close').on('click', function() {
		hideByAuthor();
		filteredAuthor = '';
		renderQuotes();
	});

	// show a random quote in a modal
	$('#random-quote-button').on('click', function() {
		var index = Math.floor(Math.random() * quotes.length);
		var quote = createQuote(quotes[index], index);
		$('#random-quote-modal .modal-body').empty().append(quote);
		$('#random-quote-modal').modal('show');
	});


	// 4. MAIN //////////////////
	quotes.sort(compareByReverseRating);
	renderQuotes();
	$('#inputAuthor').focus();

});