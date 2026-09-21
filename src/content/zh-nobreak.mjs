/**
 * Chinese words the browser must not break across lines.
 *
 * Chinese has no spaces, so a browser may break between any two characters and
 * will happily split a word — 锁|好, 行|李 — which reads badly in a headline.
 * build.mjs wraps each word below in a nowrap span, exactly as it does for Thai
 * (thai-nobreak.mjs). Longer entries win, so 行李寄存柜 stays whole before 行李
 * is considered. Add to this list whenever a reviewer spots a bad break; it
 * never changes the copy.
 */
export default [
  '行李寄存柜', '购物中心', '简单明了', '解放双手', '触摸屏', '寄存柜', '行李箱', '九十秒', '这一天',
  '没有钥匙可丢', '银行卡', '手机号', '购物袋', '工程师', '行李', '锁好', '屏幕', '柜位', '柜门', '步骤', '完成', '费率',
  '曼谷', '大约', '开柜', '付款', '短信', '收据', '现金', '账号', '应用', '真人', '回复', '消息', '航班',
  '退房', '寄存', '监控', '公司', '注册', '零售', '空间', '设计', '收入', '规则', '说明', '须知', '联系',
  '我们', '钥匙', '排队', '柜台', '一切', '点击', '选择', '语言', '封顶', '小时', '泰铢',
];
