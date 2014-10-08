var Library = function(title) {
	this.title = title;
}

Library.prototype.render = function() {
	if(this.element) return this.element;

	this.element = $('<div></div>');

	this.element 
		.addClass('my-library')
		.appendTo('.container')
		.append('<h4>' + this.title + '</h4>')

	return this.element;
};

var myLibrary = new Library('My Library')
myLibrary.render();

// Library.prototype.show = function() {
// 	if(this.element) return this.element;

// 	this.element = $("<div><img src='./images/venice.jpg'></div>");

// 	this.element
// 		.addClass('venice-italy')
// 		.appendTo('my-library')
// 		.append('<h3>' + 'My Photos' + '</h3>');

// 	return this.element;
// };

// var myPhoto = new Library('Photos');
// myPhoto.show();

var Button = function() {
	Library.call(this);
}

Button.prototype.render = function() {
	if(this.element) return this.element;

	this.element = $('<div><h4>My Library</h4></div>');

	this.element 
		.addClass('btn-library')
		.appendTo('body');

	this.element.on('click', function () {
		$('.my-library').slideDown(600);
		$('.btn-library').hide();
	});	

	$('.my-library').on('click', 'h4', function() {
		$('.my-library').slideUp(600);
		$('.btn-library').show();
	})

	return this.element;
};

var btnLibrary = new Button('My Library');
btnLibrary.render();

Button.prototype = new Library();
Button.prototype.constructor = Button;

