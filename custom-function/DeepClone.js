const deepClone = target => {
    // 维护两个储存循环引用的数组
    const targets = [];
    const copies = [];
  
    const clone = target => {
        if (target === null) return null;
        // structured clone algorithm 默认不处理函数
        if (typeof target !== 'object') return target;
    
        // 处理循环引用
        const index = targets.indexOf(target);
        if (index != -1) {
            return children[index];
        }

        let copy, proto;
    
        if (isType(target, 'Array')) {
            // 对数组做特殊处理
            copy = [];
        } else if (isType(target, 'RegExp')) {
            // 对正则对象做特殊处理
            copy = new RegExp(target.source, target.flags);
        } else if (isType(target, 'Date')) {
            // 对Date对象做特殊处理
            copy = new Date(target.getTime());
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(target);
            // 利用Object.create切断原型链
            copy = Object.create(proto);
        }
    

        targets.push(target);
        copies.push(copy);
    
        for (let i in target) {
            // 递归
            copy[i] = clone(target[i]);
        }
    
        return copy;
    };
    return clone(target);
};
  