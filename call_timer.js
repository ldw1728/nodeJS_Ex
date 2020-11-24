var module = require('./custom_module_timer');

module.timer.on('tick', ()=>{
    var time = new Date();
    console.log(time);
});