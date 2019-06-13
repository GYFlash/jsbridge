function JSBridge() {console.log('%c%s', 'color: #00B7FF;', 'Hello JSBridge');}
JSBridge.prototype.log = function (id, message) {
    if (document.getElementById(id)) {
        document.getElementById(id).innerHTML += '<p> <span style="color: #000;background-color: red;padding: 0 10px;">>:</span>&nbsp;&nbsp;&nbsp;'+message+'</p><br>';
    }
};

JSBridge.prototype.osName = function () {
    var u = navigator.userAgent;
    if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
        return 'Android'
    } else if (u.indexOf('iPhone') > -1) {
        return 'iOS'
    } else if (u.indexOf('iPad') > -1) {
        return 'iPad'
    } else if (u.indexOf('Windows Phone') > -1) {
        return 'WP'
    } else if (u.toLowerCase().indexOf('micromessenger') !== -1) {
        return 'Weixin'
    }
};
JSBridge.prototype.connect = function (callback) {
    if (window.WebViewJavascriptBridge) {
        return callback(WebViewJavascriptBridge)
    }
    if (this.osName() === 'iOS' || this.osName() === 'iPad') {
        if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'https://__bridge_loaded__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
        return;
    }
    if (this.osName() === 'Android') {
        document.addEventListener('WebViewJavascriptBridgeReady', function() {
            return callback(WebViewJavascriptBridge)
        }, false);
    }
};
