const Hook = require("./Hook");

class SyncHook extends Hook {
    _createCall() {
        return (...args)=>this.taps.forEach(option=>{
            option.fn(...args)})
    };
}

module.exports = SyncHook;