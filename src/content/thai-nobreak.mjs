/**
 * Thai words the browser must not break across lines.
 *
 * Thai has no spaces between words, so browsers break lines with a dictionary.
 * Chrome's dictionary happily splits compounds — ต่อ|รอง, จด|ทะเบียน, ว่าง|เปล่า —
 * which reads wrongly in a headline. At build time every word below is bound
 * with U+2060 WORD JOINER (invisible, zero-width, ignored by screen readers) so
 * the only remaining break opportunities are between whole words. Add to this
 * list whenever a Thai reviewer spots a bad break; it never changes the copy.
 */
export default [
  'ต่อรอง', 'ให้บริการ', 'ทางเทคนิค', 'นักช้อป', 'ถอดออก', 'ไม่ต้อง', 'ล่วงหน้า', 'มีค่า',
  'เก้าสิบวินาที', 'ที่ต้องไป', 'เที่ยวบินดึก', 'งานอีเวนต์', 'ใบใหญ่', 'ดำเนินการ', 'จดทะเบียน',
  'ว่างเปล่า', 'ส่งข้อความ', 'กลับเร็ว', 'มากขึ้น', 'ในกรุงเทพฯ', 'ค้าปลีก', 'ศูนย์การค้า', 'สัมภาระ',
  'ประเทศไทย', 'ความเป็นส่วนตัว', 'ลงทุน', 'พื้นที่', 'กระเป๋าเดินทาง', 'ชั่วโมง', 'บริษัท', 'คึกคัก',
  'ล็อกเกอร์', 'พร้อมเพย์', 'ขั้นตอน', 'โทรศัพท์', 'ข้อกำหนด', 'สำหรับ', 'ประมาณ', 'ชัดเจน',
  'ประกาศ', 'อะไร', 'นอกจาก', 'ของมีค่า', 'ออกแบบมา', 'เที่ยวบิน', 'ภาพยนตร์', 'ที่มีที่ที่ต้องไป',
];
