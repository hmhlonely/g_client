const proto_mgr = require("../../modules/proto_mgr");
// require("../../3rd/extend");
//二进制 编码解码
function encode_cmd_1_1(body) {
    let offset = body["name"].utf8_byte_len();
    let len = 2 + 2 + 2 + offset + 2 + body["age"].utf8_byte_len();
    let buf = new ArrayBuffer(len);
    let dataview = new DataView(buf);
    dataview.setUint16(0, 1, true);
    dataview.setUint16(2, 1, true);

    dataview.setUint16(4, offset, true);
    dataview.write_utf8(4 + 2, body["name"]);

    offset = 6 + offset;
    dataview.setUint16(offset, body["age"].utf8_byte_len());
    dataview.write_utf8(offset + 2, body["age"]);

    return dataview;
}
function decode_cmd_1_1(buf) {
    let cmd = {};
    let stype = buf.readUInt16LE(0);
    let ctype = buf.readUInt16LE(2);

    let len = buf.readUInt16LE(4)
    if ((len + 2 + 2 + 2) > buf.length) {
        return null;
    }
    let name = buf.toString("utf8", 6, 6 + len);
    if (!name) {
        return null;
    }

    let offset = 6 + len;
    let ageLen = buf.readUInt16LE(offset);
    if ((ageLen + offset + 2) > buf.len) {
        return null;
    }
    let age = buf.toString("utf8", offset + 2, offset + 2 + ageLen);
    if (!age) {
        return null;
    }
    cmd[0] = stype;
    cmd[1] = ctype;
    cmd[2] = {
        name: name,
        age: age,
    }
    return cmd;
}

proto_mgr.reg_buf_encoder(1, 1, encode_cmd_1_1);
proto_mgr.reg_buf_decoder(1, 1, decode_cmd_1_1);