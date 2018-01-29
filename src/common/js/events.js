

export default EventEmitter;

// 事件发射器
function EventEmitter() {

    this._events = {};
    this._maxListeners = 10;
}

EventEmitter.prototype.on = EventEmitter.prototype.addListener = function(event, listener) {

    if(this._events[event]) {

        this._events[event].push(listener);
    } else {

        this._events[event] = [listener];
    }

    if(this._events[event].length >= this._maxListeners) {

        console.warn('监听绑定的太多了');
    }
}

EventEmitter.prototype.removeListener = function(event, listener) {

    if(this._events[evnet]) {

        this._events[event]  = this._events[event].filter(function() {

            return item != listener;
        })
    }
}

EventEmitter.prototype.removeAllListeners = function(event) {

    this._events[event] = [];
}

EventEmitter.prototype.once = function(event, listener) {

    var self = this;
    function g() {

        listener.apply(null, Array.from(arguments));
        that.removeListener(event, g);
    }

    if(this._events[event]){

        this._events[event].push(g);
    } else {

        this._events[event] = [g];
    }
}

EventEmitter.prototype.emit = function(event) {

    var args = Array.prototype.slice.call(arguments, 1);

    if(this._events[event]){

        this._events[event].forEach(function(listener) {

            listener.apply(null, args);
        })
    }
}