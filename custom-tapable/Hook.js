const Type = {
    sync:'sync',
    promise:'promise',
}

// tap = {
//     type: String,
//     name: String,
//     fn: (...args) => any
// }

class Hook {
	constructor(args = [], name = undefined) {
		this._args = args;
        this.name = name;
        // 监听的函数集合
		this.taps = [];
		this.call = this._createCall(Type.sync);
		this.promise = this._createCall(Type.promise);
    }

    tap(name, fn) {
		this._tap(Type.sync, name, fn);
	}

	tapPromise(name, fn) {
		this._tap(Type.promise, name, fn);
    }
    
    _tap(type, name, fn) {
        // tapInstance = this._runRegisterInterceptors(tapInstance);
		let i = this.taps.length;
		this.taps[i] = { type, fn, name};
    }
    
    _createCall(type) {
        throw new Error("Abstract: should be overridden");
		// return this.compile({
        //     type,
		// 	taps: this.taps,
		// 	args: this._args,
		// });
	}
}

module.exports = Hook;