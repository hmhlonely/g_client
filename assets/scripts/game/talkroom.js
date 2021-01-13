const websocket = require("../modules/websocket");

/** 聊天室协议 */
let TalkCmd = {
    /** 用户进来 */
    Enter: 1,
    /** 用户离开 */
    Exit: 2,
    /** 别人进来 */
    UserArrrived: 3,
    /** 别人离开 */
    UserExit: 4,
    /** 自己发送消息 */
    SendMsg: 5,
    /** 收到别人的消息 */
    UserMsg: 6,
}
let STYPE_TALKROOM = 1;

/** 返回状态 */
let Response = {
    OK: 1,
    IS_IN_TALKROOM: -100,//已经在聊天室了
    NOT_IN_TALKROOM: -101,//不在聊天室了
    INVALD_OPT: -102,//玩家非法操作
    INVALD_PARMAS: -103,//参数不对
}

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        websocket.register_serivces_hander({
            1: this.on_talk_room_service_return.bind(this),//1是服务号
        })
    },

    on_talk_room_service_return(stype, cmd, body) {
        switch (cmd) {
            case TalkCmd.Enter: {
                console.log("TalkCmd.Enter: ", body);
            } break;
            case TalkCmd.Exit: {

            } break;
            case TalkCmd.UserArrrived: {

            } break;
            case TalkCmd.UserExit: {

            } break;
            case TalkCmd.SendMsg: {

            } break;
            case TalkCmd.UserMsg: {

            } break;

        }
    },

    start() {
        this.scheduleOnce(function () {
            this.test_cmd();
        }.bind(this), 3)
    },
    test_cmd() {
        websocket.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, {
            uname: "black" + Math.floor(1 + Math.random() * 10),
            usex: 1,
        })
    }

    // update (dt) {},
});
