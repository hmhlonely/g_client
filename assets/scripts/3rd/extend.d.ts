declare interface DataView {
    /** 写入utf8字符串 */
    write_utf8(offset: number, str: string)
    /** 读取utf8字符串 */
    read_utf8(offset: number, byte_length: number);
}

declare interface String {
    /** 获取当前字符串的utf8的字节长度 */
    utf8_byte_len()
}