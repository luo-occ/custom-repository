function CustomPromise(executor) {
    // 初始化state为等待态    
    this.state = 'pending';
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.err = undefined;
    // 存放 fn1 的回调
    this.fn1Callbacks = [];
    // 存放 fn2 的回调
    this.fn2Callbacks = [];
     // 成功
    let resolve = (value) => { 
        if(this.state==='pending') {
            this.state='fulfilled'
            this.value=value
        }
    };
    // 失败
    let reject = (err) => {
        if(this.state==='pending') {
            this.state='rejected'
            this.err=err
        }
    };
    // 立即执行
    try{
        executor(resolve, reject);
    } catch (err) {
        reject(err)
    }
}

CustomPromise.prototype.then = function(fn1,fn2) {
    const self=this
    fn1 = typeof fn1 === 'function' ? fn1 : function(v) {}
    fn2 = typeof fn2 === 'function' ? fn2 : function(r) {}
    if (self.state === 'resolved') {
        return new CustomPromise(function(resolve, reject) {
            try {
                const x = fn1(self.value)
                if (x instanceof CustomPromise) {
                    x.then(res=>resolve(res),e=>reject(e))
                } else {
                    resolve(x)
                }
                
            } catch (e) {
                reject(e)
            }
        })
    }
    if (self.state === 'resolved') {
        return new CustomPromise(function(resolve, reject) {
            try {
                const x = fn1(self.err)
                reject(x)
            } catch (e) {
                reject(e)
            }
        })
    }
    if (self.state === 'resolved') {
        return new CustomPromise(function(resolve, reject) {
            this.fn1Callback.push(function(value) {
                try {
                    var x = fn1(self.value);
                    resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
            this.fn2Callback.push(function(value) {
                try {
                    var x = fn2(self.err);
                    reject(x)
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}