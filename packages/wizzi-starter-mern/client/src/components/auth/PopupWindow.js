/*
    artifact generator: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\node_modules\wizzi-js\lib\artifacts\js\module\gen\main.js
    package: wizzi-js@0.7.7
    primary source IttfDocument: C:\My\wizzi\stfnbssl\wizzi-examples\packages\wizzi-starter-mern\.wizzi\client\src\components\auth\PopupWindow.js.ittf
*/
'use strict';
import {toParams, toQuery} from './utils';
class PopupWindow {
    constructor(id, url, options = {}) {
        this.id = id;
        this.url = url;
        this.options = options;
    }
    open() {
        const {
            url, 
            id, 
            options
        } = this;
        this.window = window.open(url, id, toQuery(options, ','));
    }
    close() {
        this.cancel();
        this.window.close();
    }
    poll() {
        this.promise = new Promise((resolve, reject) =>
            this._iid = window.setInterval(() => {
                try {
                    const popup = this.window;
                    if (!popup || popup.closed !== false) {
                        this.close();
                        reject(new Error('The popup was closed'));
                        return ;
                    }
                    if (popup.location.href === this.url || popup.location.pathname === 'blank') {
                        return ;
                    }
                    const params = toParams(popup.location.search.replace(/^\?/, ''));
                    resolve(params);
                    this.close();
                } 
                catch (error) {
                } 
            }, 500));
    }
    cancel() {
        if (this._iid) {
            window.clearInterval(this._iid);
            this._iid = null;
        }
    }
    then(...args) {
        return this.promise.then(...args);
    }
    catch(...args) {
        return this.promise.then(...args);
    }
    static open(...args) {
        const popup = new this(...args);
        popup.open();
        popup.poll();
        return popup;
    }
}
export default PopupWindow;
