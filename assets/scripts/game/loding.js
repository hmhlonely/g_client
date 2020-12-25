// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const websocket = require("../modules/websocket");

cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        let self = this;

    },
    start() {
        let self = this;
        self.scheduleOnce(() => {
            let data = {
                name: "哈哈哈",
                age: "123456",
            }
            websocket.send_cmd(1, 1, data);
        }, 3)
    },
});
