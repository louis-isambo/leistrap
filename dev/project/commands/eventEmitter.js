import { obj } from "../../deps/PrimaryArray.js"

const _EventEmitter = function () {
    const channels = {}
    var inWaitChannel = {}
    // create the event object that will be like a middleware
    var data = null
    const event_ = { send: (d) => { data = d } }

    //invoke method emits  an event and waiting for the 
    // execution. if there is no channel in our channels object
    // the current channel will be saved into the "inWaitChannel" object
    // this method checks if there is an exist "handler" or channel to the 
    // channels object. 
    async function invoke(channel, listener, ...args) {

        //verify if there is an exist channel
        // an execute firstly "the channel handler" which is 
        // saved in the channels object and
        // after executing the channel handler, we execute
        // !the  invoke listener
        // todo: the handle mothed allows use the save a channel name in the channels object

        async function exe() {
            channels[channel].listener(event_, ...args)
            if (listener) listener(data);
            data = null
        }
        if (obj.has(channel, channels)) {
            obj.after(1, exe)
        }
        else {
            inWaitChannel[channel] = () => obj.after(1, exe)
        }
    }

    // handle method, this method allows us to define 
    // an channel to listen to 
    async function handle(channel, listener) {
        channels[channel] = { listener }
        if (obj.has(channel, inWaitChannel)) {
            inWaitChannel[channel]()
            inWaitChannel = obj.copyObject(inWaitChannel, false, true, channel)
        }
    }

    //the default event
    function readContent(e) {
        var counter = 0
        e.handle("readContent", function (event, listener, content, timeout) {
            if (!timeout) timeout = 1000;
            if (!content) content = [];
            var len = content.length
            var id = setInterval(function () {
                listener(content[counter]);
                if (counter + 1 === len) clearInterval(id); counter++
            }, timeout)
        })
    }
    const eventEmitter_ = { invoke, handle }
    readContent(eventEmitter_)
    return eventEmitter_
}

export { _EventEmitter }
