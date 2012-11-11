var _privateStaticMember = 'PrSM';

function MyClass() {
	var _privateInstanceMember = 'PrIM';

	var _privateInstanceMethod = function() {
		return _privateStaticMember + ',' + _privateInstanceMember + ',' + MyClass.publicStaticMember + ',' + this.publicInstanceMember;
	};

	this.publicInstanceMember = 'PuIM';

	this.publicInstanceMethod = function() {
		return _privateStaticMember + ',' + _privateInstanceMember + ',' + MyClass.publicStaticMember + ',' + this.publicInstanceMember;
	};
}

var _privateStaticMethod = function() {
	return _privateStaticMember + ',' + MyClass.publicStaticMember;
};

MyClass.publicStaticMember = 'PuSM';

MyClass.publicStaticMethod = function() {
	return _privateStaticMember + ',' + MyClass.publicStaticMember;
};

module.exports = MyClass;