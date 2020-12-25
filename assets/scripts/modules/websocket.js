const proto_mgr = require("./proto_mgr");

let websocket = {
    sock: null,
    /** 消息处理的回调函数 */
    cmd_handler: null,
    proto_type: 0,
    is_connected: false,

    /** 链接成功 */
    _on_opened: function (session) {
        let self = this;
        console.log("ws connect server success !")
        self.is_connected = true;
    },
    /** 接收到数据 */
    _on_recv_data: function (str_or_buf) {
        let self = this;
        if (!self.cmd_handler) {
            return;
        }
        let cmd = proto_mgr.decode_cmd(self.proto_type, str_or_buf);
        if (!cmd) {
            return;
        }
        let stype = cmd[0];
        if (self.cmd_handler[stype]) {
            let ctype = cmd[1];
            self.cmd_handler[stype](stype, ctype, cmd[2]);
        }
    },
    /** 断开连接 */
    _on_socket_close: function (session) {
        let self = this;
        if (self.sock) {
            self.close();
        }
    },
    /** 出错 */
    _on_socket_err: function (session) {
        let self = this;
        self.close();
    },
    /** 连接 */
    connect: function (url, proro_type) {
        let self = this;
        let sock = new WebSocket(url);
        self.sock = sock;
        sock.onopen = self._on_opened.bind(self);
        sock.onmessage = self._on_recv_data(self);
        sock.onerror = self._on_socket_err.bind(self);
        sock.onclose = self._on_socket_close.bind(self);
        self.proto_type = proro_type;
    },
    /** 发送 */
    send: function (body) {
        let self = this;
        if (self.sock) {
            self.sock.send(body);
        }
    },
    /** 发送打包数据 */
    send_cmd: function (stype, ctype, body) {
        let self = this;
        if (!self.sock || !self.is_connected) {
            return;
        }
        let buf = proto_mgr.encode_cmd(self.proto_type, stype, ctype, body);
        self.sock.send(buf);
    },
    close: function () {
        let self = this;
        self.is_connected = false;
        if (self.sock !== null) {
            self.sock.close();
            self.sock = null;
        }
    },
    /** 注册消息处理的回调函数 */
    register_cmd_hander: function (cmd_handler) {
        let self = this;
        self.cmd_handler = cmd_handler;
    },
}
websocket.connect("ws://127.0.0.1:7082/ws", proto_mgr.PROTO_BUFF);
// websocket.connect("ws://127.0.0.1:7083/ws", proto_mgr.PROTO_JSON);

module.exports = websocket;