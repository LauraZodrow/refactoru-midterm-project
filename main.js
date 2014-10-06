var Library = function(title) {
	this.title = title;
}

Library.prototype.render = function() {
	if(this.element) return this.element;

	this.element = $('<div></div>');

	this.element 
		.addClass('my-library')
		.appendTo('body')
		.append('<h4>' + this.title + '</h4>');

	return this.element;
};

var myLibrary = new Library('My Library')
myLibrary.render();

var Button = function() {
	Library.call(this);
}

Button.prototype.render = function() {
	if(this.element) return this.element;

	this.element = $('<div>My Library</div>');

	this.element 
		.addClass('btn-library')
		.appendTo('body');

	return this.element;
};

Library.prototype = new Button();
Library.prototype.constructor = Button;

var btnLibrary = new Button('My Library');
btnLibrary.render();

Button.prototype.click = function() {
	btnLibrary.on('click', function() {
		myLibrary.show();
	})
};
