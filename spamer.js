"use strict";

window.teamsUtils = window.teamsUtils || {};

teamsUtils.spamer = function () {
    return {
        _sendMessage: function () {
            if (this._retryTime === 0) return;
            if (this._retryTime > 0) this._retryTime--;
            let $input = $('#cke_1_contents').find('> div');
            $input.html(this._message);
            $('#send-message-button').click();
            setTimeout(this._sendMessage.bind(this), this._delay);
            window.console.clear();
        },
        startSpam: function (message, retryTime, delay) {
            if (!'int' === typeof delay) delay = 30000;
            if (!'int' === typeof retryTime) retryTime = 10;
            if (!'string' ===  typeof message) message = JSON.stringify(
                this,
                function(key, value) {
                    if ('function' === typeof value) return value.toString();
                    return value;
                });
            this._message = message;
            this._retryTime = retryTime;
            this._delay = delay;
            this._sendMessage();

            return this;
        },
        _message: undefined,
        _retryTime: undefined,
        _delay: undefined
    };
};

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if( request.action === "spam" ) {
            console.log('spam launch');
            let spamer = window.teamsUtils.spamer();
            let retryTime = parseInt(request.retryTime, 10);
            let delay = parseInt(request.delay, 10);
            let message = request.message;
            if (isNaN(retryTime)) retryTime = 10;
            if (isNaN(delay)) delay = 3000;
            if (message === "") message = undefined;
            console.log(message, retryTime, delay);
            spamer.startSpam(message, retryTime, delay);
        }
    }
);

