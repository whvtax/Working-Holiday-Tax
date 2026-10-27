/**
 * Nội dung trang chủ (tiếng Việt). Viết lại theo cách người Việt đọc, không
 * dịch từng câu. Cách nói về pháp lý phải giữ đúng nghĩa:
 *   "Hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký"
 *   "Được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO"
 * Cư trú thuế luôn là "có thể", không hứa hẹn tiền hoàn thuế.
 */
import type { HomeCopy } from './home-en'

export const homeVi: HomeCopy = {
  meta: {
    title: 'Khai thuế, hoàn thuế cho du học sinh Úc',
    description: 'Khai thuế cho người có visa 500 và 485. $220 mỗi hồ sơ, $385 nếu có việc ABN, đã gồm GST. Được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.',
  },
  hero: {
    titleBefore: 'Khai thuế cho ',
    titleMark: 'du học sinh',
    lead: 'Dành cho người có visa 500 và 485. Mọi việc đều làm qua WhatsApp và một mẫu đơn trực tuyến ngắn. Được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.',
    price: { amount: '$220', unit: 'mỗi hồ sơ', sub: '$385 nếu có việc ABN. Đã gồm GST.' },
    cta: 'Bắt đầu khai thuế qua WhatsApp',
  },
  priceCheck: { title: 'Giá nào phù hợp với tôi?' },
  guarantee: {
    title: 'Nếu tiền hoàn thuế thấp hơn phí của chúng tôi, chúng tôi trả lại bạn phần chênh lệch',
    docketLabel: 'Ví dụ: phí $220, hoàn thuế $150, chúng tôi trả lại bạn $70',
    docket: [
      { label: 'Phí của chúng tôi', value: '$220' },
      { label: 'Tiền hoàn thuế', value: '$150' },
      { label: 'Chúng tôi trả lại', value: '$70', total: true },
    ],
    terms: 'Chúng tôi trả khoản này sau khi ATO gửi thông báo tính thuế (notice of assessment). Nếu không có tiền hoàn thuế, hoặc bạn phải đóng thêm thuế, thì vẫn tính đủ phí.',
    why: 'Đăng ký ngưỡng miễn thuế ở cả hai chỗ làm, hoặc giao đồ ăn bằng ABN, là những lý do hay gặp khiến du học sinh phải đóng thêm thuế.',
    cta: 'Nhắn tin qua WhatsApp',
  },
  flow: {
    title: 'Từ tin nhắn đầu tiên đến khi nộp hồ sơ',
    label: 'Ví dụ cuộc trò chuyện, từng bước',
    steps: [
      { from: 'them', text: 'Bạn nhắn tin cho chúng tôi qua WhatsApp và chúng tôi xác nhận giá.' },
      { from: 'us', text: 'Bạn chuyển khoản cho The Accounting Academy và gửi ảnh chụp màn hình cho chúng tôi.' },
      { from: 'them', text: 'Bạn điền một mẫu đơn trực tuyến ngắn.' },
      { from: 'us', text: 'Chúng tôi xem hết hồ sơ trong khoảng 24 giờ, rồi gửi bạn bản ước tính.' },
      { from: 'them', text: 'Bạn ký trực tuyến.' },
      { from: 'us', text: 'Hồ sơ thuế của bạn được nộp cho ATO.' },
    ],
    note: 'Chỉ là ví dụ, không phải cuộc trò chuyện thật.',
  },
  payslip: {
    title: 'Đọc phiếu lương từng dòng',
    lead: 'Chạm vào một dòng. Đây là phiếu lương mẫu, tên chủ lao động là hư cấu.',
  },
  story: {
    title: 'Chỉ dành cho visa du học',
    lead: 'Student Visa Tax chỉ làm khai thuế cho người có visa du học và visa tốt nghiệp, ngoài ra không làm gì khác. Vì vậy những câu bạn sắp hỏi, chúng tôi đã gặp rất nhiều lần.',
    points: [
      'Học ở Úc một khóa từ 6 tháng trở lên, và điều đó ảnh hưởng thế nào đến thuế của bạn.',
      'Giấy Medicare Entitlement Statement mà bảo hiểm sức khỏe (OSHC) không gửi cho bạn.',
      'Làm hai việc bán thời gian cùng lúc, và vì sao có thể phải đóng thêm thuế.',
      'Chạy Uber Eats hoặc DoorDash bằng ABN.',
      'Học xong, về nước, và tiền super của bạn sẽ ra sao.',
    ],
    languages: 'Bạn có thể hỏi chúng tôi bằng tiếng Anh, tiếng Trung hoặc tiếng Việt.',
  },
  faq: {
    title: 'Câu hỏi thường gặp',
    items: [
      { q: 'Tôi có cần khai thuế không?', a: 'Thường là có, nếu bạn đã đi làm ở Úc và lương của bạn bị trừ thuế. Khai thuế để lấy lại phần thuế bị trừ dư, và đôi khi bạn có thể phải đóng thêm.' },
      { q: 'Có visa du học thì có phải là người cư trú về thuế không?', a: 'Nếu khóa học của bạn từ 6 tháng trở lên, bạn có thể là người cư trú về thuế. Người cư trú được hưởng ngưỡng miễn thuế $18,200 (không phải đóng thuế cho $18,200 thu nhập đầu tiên), hoặc chỉ một phần ngưỡng này trong năm mới sang Úc hoặc năm rời Úc. Chúng tôi kiểm tra điều này cho bạn trước khi nộp.' },
      { q: 'Tôi có phải đóng Medicare levy không?', a: 'Nếu bạn là người cư trú về thuế và có bảo hiểm OSHC, thường bạn có thể xin miễn. Bạn cần giấy Medicare Entitlement Statement, và chúng tôi sẽ hướng dẫn bạn cách xin.' },
      { q: 'Tôi giao Uber Eats. Có gì khác không?', a: 'Có. Thu nhập ABN không bị trừ thuế trước, nên phải khai như thu nhập kinh doanh, cùng với các chi phí làm việc. Hồ sơ này giá $385.' },
      { q: 'Tôi sắp rời Úc. Thuế và tiền super của tôi sẽ ra sao?', a: 'Bạn vẫn có thể khai thuế từ nước ngoài, và chúng tôi có thể giúp bạn rút tiền super sau khi bạn đã rời Úc.' },
      { q: 'Tôi có thể tự khai, hoặc nhờ hỗ trợ miễn phí không?', a: 'Được. Bạn có thể tự khai trực tuyến bằng myTax. Nếu thu nhập của bạn khoảng $70,000 trở xuống và hồ sơ đơn giản, chương trình Tax Help của ATO và một số phòng tư vấn ở trường đại học có thể giúp miễn phí. Du học sinh thường tìm đến chúng tôi khi muốn có người kiểm tra giúp chuyện cư trú thuế, miễn Medicare levy, làm hai việc hay thu nhập giao đồ ăn bằng ABN.' },
    ],
  },
  images: {
    hero: { id: 'IMG-01', subject: 'student on a café shift', alt: 'Một du học sinh đeo tạp dề quán cà phê, đang làm ca sau quầy' },
    flow: { id: 'IMG-02', subject: 'delivery bike at night', alt: 'Chiếc xe đạp giao hàng có túi giữ nhiệt, đậu bên đường phố vào ban đêm' },
  },
}
