let utils = {
    /**
     * 随机字符串
     * @param {*} len 长度
     */
    random_string: function (len) {
        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        let maxPos = $chars.length;
        let str = '';
        for (let i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    },
    /**
     * 随机整数字符串
     * @param {*} len 长度 
     */
    random_int_str: function (len) {
        let $chars = '0123456789';
        let maxPos = $chars.length;
        let str = '';
        for (let i = 0; i < len; i++) {
            str += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    },
    /**
     * 随机数
     * @param {*} begin 开始
     * @param {*} end 结束
     */
    random_int: function (begin, end) {
        let num = begin + Math.random() * (end - begin + 1);
        num = Math.floor(num);
        if (num > end) {
            num = end;
        }
        return num;
    }
}
module.exports = utils;