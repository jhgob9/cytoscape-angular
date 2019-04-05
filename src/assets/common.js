function removePopper(){
	const divs = document.querySelectorAll('body>div');
	divs.forEach(function (el) {
		el.remove()
	});
}