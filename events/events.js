var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();

life.on('comfort',function (who) {
    console.log('给' + who + '倒水');
});

life.emit('comfort','汉子');