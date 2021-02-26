export class EventEmitter {
    eventMap:Map<string,Function[]> = new Map()
    addListener(event:string, listener:Function) {
        if(this.eventMap[event]) {
            this.eventMap[event].push(listener)
        } else {
            this.eventMap[event] = [listener]
        }
    }
    on(event:string, listener:Function) {
        this.addListener(event,listener)
    }
    once(event:string, listener:Function) {
        let called = false
        function onceListener(...args:any[]) {
            if(!called) {
                listener(...args)
                called = true
            }
        }
        this.addListener(event,onceListener)
    }
    removeListener(event:string, listener:Function) {
        const listeners:Function[] = this.eventMap[event]
        if(listeners) {
            const index = listeners.indexOf(listener)
            if(index!==undefined) {
                listeners.splice(index,1)
            }
        }
    }
    removeAllListeners(event?:string) {
        if(event) {
            this.eventMap[event]=undefined
        }else {
            this.eventMap = new Map()
        }
    }
    setMaxListeners(n:number) {
        //
    }
    listeners(event:string) {
        return this.eventMap[event]
    }
    emit(event:string, ...args) {
        if(this.eventMap[event]) {
            this.eventMap[event].forEach(listener => {
                listener(...args)
            });
        }
    }
}
