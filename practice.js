/**
 * Media base class for all media items. Will
 * store common elements between each media
 * item that is created.
 * @param {string} title       The title of the media
 * @param {string} description A description of the media
 */
var Media = function(title, description){
	this.title = title;
	this.description = description;
};

/**
 * Render a DOM element for this media item
 * @return {jQuery} DOM Element that represents media item
 */
Media.prototype.render = function() {
	if(this.element) return this.element;

	this.element = $('<li>');
	this.element
		.addClass('media-item')
		.append('<h4>' + this.title + '</h4>')
		.append('<p>' + this.description + '</p>');

	return this.element;
};


/**
 * A game media item that is more specific
 * details about games. Extends Media.
 * @param {string} title       Title of game
 * @param {string} description Description of game
 * @param {array} platforms    Platforms supported
 */
var Game = function(title, description, platforms){
	Media.call(this, title, description);

	this.platforms = platforms;
};
Game.prototype = new Media();
Game.prototype.constructor = Game;


/**
 * Movie class for all movie items. Extends
 * the Media class.
 * @param {string} title       Title of the movie
 * @param {string} description Description of the movie
 * @param {string} genre       Genre of the movie
 */
var Movie = function(title, description, genre){
	Media.call(this, title, description);

	this.genre = genre;
};
Movie.prototype = new Media();
Movie.prototype.constructor = Movie;

/**
 * A library class for containing
 * lists of media items
 * @param {string} person Name of person who owns library
 */
var MediaLibrary = function(person){
	this.person = person;
	this.media = [];
};

/**
 * Render a DOM element for the entire media library.
 * Will contain placeholders to inject the title
 * and the list of media items contained in this instance.
 * @return {jQuery} DOM Element that represents this library
 */
MediaLibrary.prototype.render = function() {
	if(this.element) return this.element;

	// Clone the form template and append it later
	var form = $('#media-form').clone();
	form
		.attr('id', '') // Reset the ID from the template
		.addClass('media-form') // Add a class for identification

	// hook up the submit event on this form to the formSubmit
	// method attached to this class instance.
	// By using "bind", we force the context of the
	// formSubmit function to always be (in this case)
	// our MediaLibrary instance. This will prevent jQuery
	// from overriding it to be the event target as it usually does.
	form.on('submit', this.formSubmit.bind(this));

	// if the element property is NOT set on this library,
	// let's create it here:
	this.element = $('<div>');
	this.element
		.addClass('media-library')
		.append('<h2>' + this.person + '\'s Library</h2>')
		.append(form)
		.append('<ul>');

	// Render all media items in this library instance:
	// THIS HAS BEEN SUPERSEDED BY: the addItem method
	// 	since it already calls and ensures render().
	/*
		for (var i = 0; i < this.media.length; i++) {
			var mediaElement = this.media[i].render();
			this.element.find('ul').append(mediaElement);
		};
	*/

	return this.element;
};

/**
 * Add a Media item into the list and automatically
 * render it as well.
 * @param {Media} mediaItem The media item to add and render
 */
MediaLibrary.prototype.addItem = function(mediaItem) {
	// Make sure to update our media item array
	this.media.push(mediaItem);

	// Make sure this.element is set
	this.render();

	// Render the newly added media item
	var mediaElement = mediaItem.render();
	this.element.find('ul').append(mediaElement);
};

/**
 * Handle submission of the new Item form.
 * Because this will be using jQuery and we
 * will end up with a conflicting context (
 * this meaning the current class instance vs.
 * this meaning the DOM element that fired the event)
 * we need to "bind" to a context in our render()
 * method above.
 * @param  {event} e Event arguments
 */
MediaLibrary.prototype.formSubmit = function(e) {
	e.preventDefault();

	// mediaLibrary is the original class instance
	// that maintains the form
	var mediaLibrary = this;

	// Form is the form element that was submitted
	// to make this event happen
	var form = $(e.target);

	var title = form.find('[name=title]').val();
	var description = form.find('[name=description]').val();

	var media = new Media(title, description);
	mediaLibrary.addItem(media);
	
};


/////////////
// TESTING //
/////////////
var myMediaLibrary = new MediaLibrary('Chris');
var joesLibrary = new MediaLibrary('Joe');
var roysLibrary = new MediaLibrary('Roy');

var myGame = new Game('Braid', 'Fun platforming puzzle game', ['pc', 'xbox', 'ps3']);
var myMovie = new Movie('Big Lebowski', 'The Dude', 'comedy');
var myOtherGame = new Game('Watchdogs', 'GTA with hacking', ['pc', 'xbox', 'ps4']);

myMediaLibrary.addItem(myGame);
myMediaLibrary.addItem(myOtherGame);
joesLibrary.addItem(myMovie);


// Add libraries to the DOM
var librariesElement = $('.libraries');
librariesElement.append(
	myMediaLibrary.render(),
	joesLibrary.render(),
	roysLibrary.render()
);