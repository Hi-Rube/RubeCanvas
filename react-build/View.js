var View = function() {
};

View.prototype.init = function() {
	this.LayoutParams = {
		matchParent: -1,
		wrapContent: -2
	};
	this.attrs = {
		width: this.LayoutParams.wrapContent,
		height: this.LayoutParams.wrapContent,
		paddingTop: null,
		paddingRight: null,
		paddingBottom: null,
		paddingLeft: null,
		padding: [null, null, null, null],
		marginTop: null,
		marginRight: null,
		marginBottom: null,
		marginLeft: null,
		margin: [null, null, null, null],
		borderTop: [null, null],
		borderRight: [null, null],
		borderBottom: [null, null],
		borderLeft: [null, null],
		border: [null, null],
		backgroundColor: null
	};
};

module.exports = new View();