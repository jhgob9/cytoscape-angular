function removePopper(){
	const divs = document.querySelectorAll('body>div');
	divs.forEach(function (el) {
		el.remove()
	});
}
function removeCy() {
	const cyWrap = document.querySelectorAll('.cy_wrap');
	cyWrap.forEach(function (el) {
		el._cyreg.cy.destroy();
		el.remove();
	});
	const cyDel = document.querySelectorAll('.cy_del');
	cyDel.forEach(function (el) {
		el.remove()
	});
}