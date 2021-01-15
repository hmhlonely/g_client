const websocket = require("../modules/websocket");
const utils = require("../utils/utils");

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
        input: {
            default: null,
            type: cc.EditBox
        },
        scroll_content: {
            default: null,
            type: cc.ScrollView,
        },
        desic_prefab: {
            default: null,
            type: cc.Prefab,
        },
        selftalk_prefab: {
            default: null,
            type: cc.Prefab,
        },
        othertalk_perfab: {
            default: null,
            type: cc.Prefab,
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        websocket.register_serivces_hander({
            1: this.on_talk_room_service_return.bind(this),//1是服务号
        })
        this.random_uname = "游客" + utils.random_int_str(4);
        this.random_usex = utils.random_int(1, 2);
    },

    show_tip_msg(str) {
        let node = cc.instantiate(this.desic_prefab);
        let label = node.getChildByName("desic").getComponent(cc.Label);
        label.string = str;
        this.scroll_content.content.addChild(node);
        this.scroll_content.scrollToBottom(0.1);
    },
    show_selftalk(uname, msg) {
        let node = cc.instantiate(this.selftalk_prefab);
        let label = node.getChildByName("uname").getComponent(cc.Label);
        label.string = uname;
        label = node.getChildByName("msg").getComponent(cc.Label);
        label.string = msg;
        this.scroll_content.content.addChild(node);
        this.scroll_content.scrollToBottom(0.1);
    },
    show_othertalk(uname, msg) {
        let node = cc.instantiate(this.othertalk_perfab);
        let label = node.getChildByName("uname").getComponent(cc.Label);
        label.string = uname;
        label = node.getChildByName("msg").getComponent(cc.Label);
        label.string = msg;
        this.scroll_content.content.addChild(node);
        this.scroll_content.scrollToBottom(0.1);
    },
    on_talk_room_service_return(stype, cmd, body) {
        switch (cmd) {
            case TalkCmd.Enter: {
                console.log("TalkCmd.Enter: ", body);
                if (body == Response.OK) {
                    this.show_tip_msg("你已经成功进入聊天室!!!");
                }
            } break;
            case TalkCmd.Exit: {
                console.log("TalkCmd.Exit: ", body);
                if (body == Response.OK) {
                    this.show_tip_msg("你已经成功离开聊天室!!!");
                }
            } break;
            case TalkCmd.UserArrrived: {
                console.log("UserArrrived：", body);
                this.show_tip_msg(body.uname + "进入聊天室!!!");
            } break;
            case TalkCmd.UserExit: {
                console.log("UserExit", body);
                this.show_tip_msg(body.uname + "离开聊天室!!!");
            } break;
            case TalkCmd.SendMsg: {
                console.log("SendMsg：", body);
                if (body[0] == Response.OK) {
                    this.show_selftalk(body[1], body[3]);
                }
            } break;
            case TalkCmd.UserMsg: {
                console.log("UserMsg", body);
                this.show_othertalk(body[0], body[2]);
            } break;

        }
    },

    start() {

    },

    connect_to_talkroom() {
        console.log("connect_to_talkroom");
        websocket.send_cmd(STYPE_TALKROOM, TalkCmd.Enter, {
            uname: this.random_uname,
            usex: this.random_usex,
        })
    },
    disconnect_from_talkroom() {
        console.log("disconnect_from_talkroom");
        websocket.send_cmd(STYPE_TALKROOM, TalkCmd.Exit, null);
    },
    send_msg_to_talkroom() {
        console.log("send_msg_to_talkroom");
        let str = this.input.string;
        if (!str || str.length <= 0) {
            return;
        }
        console.log("str：", str);
        websocket.send_cmd(STYPE_TALKROOM, TalkCmd.SendMsg, str);
        this.input.string = "";
    }

    // update (dt) {},
});
