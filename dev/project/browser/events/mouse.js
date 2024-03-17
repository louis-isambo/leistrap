
// todo 1 event : onPressMove 

function PressMove(elem, option) {
    if (!option) option = {};
    if (!option.target) option.target = elem
    var events = {
        "start": "mousemove",
        "end": "mouseup",
        "init": "mousedown"
    }
    // ini  the event 
    function _init_(o) {
        option.target.addEvent(events.init, function (e) {
            if (o.start) o.start(e);
            checkStarting(o)
            elem.addEvent(events.end, end, `end`)
        }, `init`)

    }

    // check  if the event is starting or not
    function checkStarting(o) {
        elem.addEvent(events.start,
            (e) => start(e, o), "start")
    }


    // start the event
    function start(e, o) {
        if (o.listener) o.listener(e)
    }

    // end the event
    function end(e) {
        if (option.end) option.end(e);
        elem.removeEvent(events.start, "start")
        elem.removeEvent(events.end, `end`)
    }
    // call the init function to init the PressMove event 
    // to the main object
    _init_(option)
}



export { PressMove }