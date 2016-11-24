
var stack = function () {
    this.data = [];
};

stack.prototype.push = function (value) {
    this.data.push(value);
};
stack.prototype.pop = function () {
    return this.data.pop();
};
stack.prototype.count = function () {
    return this.data.length;
};
stack.prototype.empty = function () {
    return this.data = [];
};


var queue = function () {
    this.data = [];
};

queue.prototype.push = function (value) {
    this.data.push(value);
};
queue.prototype.shift = function () {
    return this.data.shift();
};
queue.prototype.count = function () {
    return this.data.length;
};
queue.prototype.empty = function () {
    return this.data = [];
};


var map = function () {
    this.data = [];
};

map.prototype.set = function (key, value) {
    this.data[key] = value;
};
map.prototype.get = function (key) {
    return this.data[key];
};


