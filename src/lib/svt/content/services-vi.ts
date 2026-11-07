/**
 * Trang dịch vụ (tiếng Việt), round 4: trang TFN (/vi/tfn, mới) và trang
 * DASP viết lại (/vi/superannuation). Cấu trúc (slug, id các mục, loại khối,
 * nguồn ATO, bài liên quan) lấy từ services-en.ts, xem services-i18n.ts;
 * file này chỉ có chữ. Thông tin giống bản tiếng Anh (đã đối chiếu ato.gov.au
 * ngày 5/11/2026), nhưng viết theo cách người Việt tìm và đọc: "mã số thuế
 * TFN", "làm TFN", "rút super", "tiền hưu bổng", "về Việt Nam".
 */
import type { GuideText } from './guides-i18n'

export const SERVICE_HUBS_VI: Readonly<Record<string, GuideText>> = {
  tfn: {
    label: 'Mã số thuế TFN',
    meta: {
      title: 'Mã số thuế TFN cho du học sinh: cách xin, thời gian, giấy tờ',
      description: 'Cách làm TFN online miễn phí với ATO khi có visa du học 500: cần giấy tờ gì, mất bao lâu, đi làm khi chưa có TFN, và làm gì nếu sau 28 ngày chưa nhận được.',
    },
    h1: { before: '', mark: 'Mã số thuế TFN', after: ' cho du học sinh' },
    lead: 'Mã số thuế TFN (tax file number) là số cá nhân của bạn cho thuế và super ở Úc, dùng suốt đời. Nếu visa cho phép đi làm và bạn đang ở Úc, bạn tự làm TFN online với ATO, miễn phí.',
    short: {
      answer: 'Nếu visa cho phép đi làm và bạn đang ở Úc, bạn đăng ký TFN online với ATO, miễn phí, chỉ cần hộ chiếu. Bạn không phải gửi giấy tờ nào. ATO cho biết TFN thường được gửi qua bưu điện trong vòng 28 ngày kể từ khi nhận được đơn đầy đủ.',
      mark: 'online với ATO, miễn phí',
      facts: [
        { figure: '$0', label: 'phí làm TFN với ATO' },
        { figure: '28 ngày', label: 'để TFN được gửi tới qua bưu điện, theo ATO' },
      ],
    },
    sections: {
      who: { title: 'Ai làm TFN online được', blocks: [
        { p: 'Đơn online của ATO dành cho người đang ở Úc và có visa được phép đi làm. Visa du học (500) và visa tốt nghiệp (485) thường được đi làm. Visa có điều kiện cấm làm việc (8101, 8103 hoặc 8116) thì không dùng đơn online được.' },
        { list: [
          'Bạn đang ở Úc vào ngày nộp đơn.',
          'Visa của bạn cho phép đi làm và đã gắn với hộ chiếu.',
          'Bạn có một địa chỉ nhận thư ở Úc, nơi bạn sẽ ở trong vài tuần tới.',
        ] },
        { note: 'Chưa sang Úc? Đơn online chỉ dùng được khi bạn đã ở Úc, nên không xin TFN trước khi sang được. Đa số du học sinh làm TFN trong mấy tuần đầu, thường là trước ca làm đầu tiên.' },
      ] },
      steps: { title: 'Cách xin TFN online, từng bước', blocks: [
        { list: [
          'Mở trang của ATO dành cho người nhập cư và khách tạm trú (permanent migrants and temporary visitors), rồi bắt đầu đơn online.',
          'Nhập thông tin hộ chiếu đúng y như trong hộ chiếu. Ngoài hộ chiếu, bạn không cần gửi giấy tờ nào khác.',
          'Ghi một địa chỉ ở Úc mà bạn nhận được thư.',
          'Nộp đơn và lưu lại mã biên nhận (receipt ID) hiện ra ở cuối.',
          'Chờ thư. Đừng nộp đơn lần thứ hai trong lúc chờ: ATO cho biết làm vậy có thể khiến hồ sơ chậm hơn.',
        ] },
      ] },
      'not-arrived': { title: 'Chưa nhận được TFN sau 28 ngày', blocks: [
        { p: 'Hãy liên hệ ATO và đọc mã biên nhận (receipt ID) trong đơn của bạn. Nếu bạn đã chuyển nhà sau khi nộp, báo cho ATO địa chỉ mới. Đừng nộp đơn mới.' },
      ] },
      working: { title: 'Chưa có TFN có đi làm được không', blocks: [
        { p: 'Được, bạn có thể bắt đầu đi làm trước khi nhận được số. Hãy báo chủ lao động là bạn đã nộp đơn TFN. Từ lúc nộp đơn, bạn có 28 ngày để đưa TFN cho chủ, và trong thời gian đó thuế được trừ theo mức bình thường. Nếu sau 28 ngày chủ vẫn chưa có TFN của bạn, họ phải trừ thuế theo mức cao nhất.' },
        { note: 'Visa du học giới hạn số giờ làm việc trong thời gian khóa học đang diễn ra. Hãy kiểm tra điều kiện visa với Bộ Nội vụ (Home Affairs) trước khi nhận thêm ca.' },
      ] },
      declaration: { title: 'Tờ khai TFN và ngưỡng miễn thuế', blocks: [
        { p: 'Khi bắt đầu một công việc, bạn điền tờ khai TFN (TFN declaration) cho chủ lao động. Tờ khai hỏi số TFN, bạn có phải người cư trú về thuế ở Úc không, và bạn có đăng ký ngưỡng miễn thuế (tax-free threshold) không.' },
        { p: 'Du học sinh có thể là người cư trú về thuế, thường là khi khóa học kéo dài từ 6 tháng trở lên, nhưng còn tùy hoàn cảnh của bạn và ATO là bên quyết định cuối cùng. Chỉ đăng ký ngưỡng miễn thuế ở một chỗ làm: nếu làm hai việc mà đăng ký ở cả hai, thường sẽ bị trừ thuế quá ít và bạn có thể phải đóng thêm thuế sau ngày 30 tháng 6.' },
      ] },
      'tfn-or-abn': { title: 'TFN hay ABN: bạn cần cái nào', blocks: [
        { p: 'Ai đi làm ở Úc cũng cần TFN. Bạn chỉ cần thêm ABN khi tự làm cho chính mình, ví dụ giao đồ ăn cho Uber Eats hay DoorDash. Đi làm thuê có phiếu lương thì chỉ cần TFN.' },
      ] },
      safe: { title: 'Giữ an toàn mã số TFN', blocks: [
        { p: 'TFN giữ nguyên suốt đời, kể cả khi bạn đổi visa, nên chuyển sang visa 485 không cần làm TFN mới. Chỉ đưa TFN cho chủ lao động, ngân hàng, quỹ super, ATO và bên làm hồ sơ thuế cho bạn, ngoài ra không đưa cho ai. Đừng đăng lên mạng hay gửi cho người tự nhiên liên lạc với bạn: đó là kiểu lừa đảo TFN hay gặp.' },
      ] },
      'with-us': { title: 'Chúng tôi giúp gì', blocks: [
        { p: 'Làm TFN là miễn phí và bạn tự làm với ATO. Chúng tôi không thu phí cho việc này, và bạn có thể hỏi chúng tôi về TFN mà không mất tiền. Sau ngày 30 tháng 6, TFN là nền tảng của hồ sơ thuế. Student Visa Tax làm hồ sơ thuế cho người có visa 500 và 485, và mọi hồ sơ đều được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.' },
      ] },
    },
    faq: [
      { q: 'Làm TFN có mất phí không?', a: 'Không. ATO không thu phí làm TFN. Hãy cẩn thận với các trang web đòi phí để nộp đơn giúp bạn.' },
      { q: 'Có xin TFN trước khi sang Úc được không?', a: 'Không làm online được. Đơn online của ATO dành cho người đang ở Úc với visa được phép đi làm, nên đa số du học sinh làm TFN trong mấy tuần đầu ở đây.' },
      { q: 'Chưa có TFN có đi làm được không?', a: 'Được, trong một thời gian ngắn. Báo chủ lao động là bạn đã nộp đơn. Bạn có 28 ngày để đưa số TFN, sau đó chủ phải trừ thuế theo mức cao nhất.' },
      { q: 'Chuyển sang visa 485 có cần TFN mới không?', a: 'Không. TFN của bạn giữ nguyên suốt đời. Cứ dùng số cũ với chủ lao động, quỹ super và ATO.' },
      { q: 'Quên mã số TFN thì có nên làm lại không?', a: 'Không. Hãy tìm lại TFN trong tài khoản ATO online, trên thông báo tính thuế (notice of assessment), bảng thu nhập (income statement), thư của ATO hoặc bảng sao kê super. Nếu không tìm thấy, hãy liên hệ ATO.' },
      { q: 'Xin TFN cần giấy tờ gì?', a: 'Nếu bạn đang ở Úc với visa được phép đi làm, bạn không cần gửi giấy tờ nào: chỉ cần nhập thông tin hộ chiếu và ATO kiểm tra điện tử. Bạn cũng cần một địa chỉ nhận thư ở Úc.' },
      { q: 'Làm TFN mất bao lâu?', a: 'ATO cho biết TFN thường được gửi qua bưu điện trong vòng 28 ngày kể từ khi nhận được đơn đầy đủ. Nếu sau 28 ngày vẫn chưa nhận được, hãy liên hệ ATO với mã biên nhận (receipt ID) thay vì nộp đơn lại.' },
    ],
    sourceLabels: [
      'ATO: Đơn xin TFN cho người nhập cư và khách tạm trú',
      'ATO: Cách xin TFN',
      'ATO: Tờ khai TFN, thông tin và nghĩa vụ của bên trả lương',
    ],
  },
  superannuation: {
    label: 'Tiền super (DASP)',
    meta: {
      title: 'Rút super khi về nước (DASP): thuế bao nhiêu, nộp thế nào',
      description: 'Rút tiền hưu bổng (super) khi về nước qua DASP: thuế 35% phần đã chịu thuế, 45% phần chưa chịu thuế, 0% phần miễn thuế. Nộp online miễn phí, thường 28 ngày.',
    },
    h1: { before: 'Rút ', mark: 'tiền super', after: ' khi về nước: thuế DASP và cách nộp' },
    lead: 'Khoản super khi rời Úc (DASP, departing Australia superannuation payment) là cách rút tiền hưu bổng (super) ở Úc sau khi bạn đã rời đi, kể cả khi đã về Việt Nam. Thuế DASP thường là 35% với phần đã chịu thuế, 45% với phần chưa chịu thuế và 0% với phần miễn thuế. Nhiều người gọi việc này là “rút super” hay “hoàn thuế xuất cảnh”, nhưng đây không phải tiền hoàn thuế thu nhập, cũng không phải hoàn GST ở sân bay (TRS).',
    short: {
      answer: 'Khi đã rời Úc và visa đã hết hiệu lực, bạn có thể xin rút tiền super theo diện DASP. Quỹ trừ thuế trước khi trả: thường là 35% với phần đã chịu thuế, 45% với phần chưa chịu thuế và 0% với phần miễn thuế. ATO cho biết DASP thường được trả trong vòng 28 ngày kể từ khi nhận được đơn đầy đủ.',
      mark: 'thường là 35% với phần đã chịu thuế',
      facts: [
        { figure: '35%', label: 'phần đã chịu thuế, mức thường gặp nếu bạn chưa từng có visa working holiday' },
        { figure: '45%', label: 'phần chưa chịu thuế' },
        { figure: '28 ngày', label: 'thời gian ATO thường trả, tính từ khi nhận đơn đầy đủ' },
      ],
    },
    sections: {
      eligible: { title: 'Ai được rút DASP', blocks: [
        { p: 'Theo ATO, bạn thường được rút DASP khi đáp ứng đủ các điều sau:' },
        { list: [
          'Tiền super được đóng khi bạn làm việc ở đây bằng visa tạm thời (visa du học hoặc visa tốt nghiệp đều được tính).',
          'Visa của bạn đã hết hiệu lực, do hết hạn hoặc bị hủy.',
          'Bạn đã rời Úc và không còn visa Úc nào khác đang có hiệu lực.',
          'Bạn không phải công dân Úc hay New Zealand, cũng không phải thường trú nhân Úc.',
        ] },
      ] },
      tax: { title: 'Thuế DASP bao nhiêu phần trăm', blocks: [
        { p: 'Quỹ super tự chia số dư của bạn thành các phần và trừ thuế trước khi trả. Nếu bạn chưa từng có visa working holiday, mức thuế của ATO là:' },
        { list: [
          'Phần miễn thuế (tax-free component): 0%.',
          'Phần chịu thuế, loại đã chịu thuế (taxed element): 35%. Đây là phần lớn tiền super chủ lao động đóng cho bạn.',
          'Phần chịu thuế, loại chưa chịu thuế (untaxed element): 45%.',
        ] },
        { note: 'Nếu một phần tiền super đến từ thời gian bạn có visa working holiday (417 hoặc 462), ATO áp thuế 65% cho phần chịu thuế (taxable component), cả loại đã chịu thuế lẫn chưa chịu thuế. Phần miễn thuế vẫn là 0%.' },
      ] },
      apply: { title: 'Cách nộp đơn online, miễn phí với ATO', blocks: [
        { list: [
          'Tìm đủ các tài khoản super của bạn: đăng nhập từng quỹ, hoặc xem dịch vụ ATO online trong myGov trước khi đi.',
          'Bắt đầu đơn DASP online trên trang ATO. Bạn có thể bắt đầu và lưu đơn khi còn ở Úc, và ATO khuyên nên làm vậy, vì về nước rồi mới bắt đầu thì có thể khó hơn.',
          'Nộp đơn khi bạn đã rời Úc và visa đã hết hiệu lực. Trước đó thì chưa nộp được.',
          'Quỹ kiểm tra hồ sơ và trả số dư, sau khi trừ thuế, vào tài khoản ngân hàng bạn cung cấp.',
        ] },
        { note: 'Đơn online của ATO là miễn phí. Bạn không bao giờ phải trả tiền để rút tiền super của chính mình.' },
      ] },
      documents: { title: 'Giấy tờ rút super cần những gì', blocks: [
        { list: [
          'Hộ chiếu và thông tin visa, gồm ngày visa hết hiệu lực.',
          'Tên từng quỹ super và số thành viên (member number).',
          'Tài khoản nhận tiền. Đơn giản nhất là giữ tài khoản ngân hàng ở Úc. Một số quỹ chuyển tiền quốc tế về tài khoản ở Việt Nam, nhưng không phải quỹ nào cũng làm, và có thể mất phí đổi tiền.',
          'Nếu số dư từ $5,000 trở lên, quỹ có thể yêu cầu bản sao giấy tờ tùy thân có chứng thực.',
        ] },
      ] },
      timing: { title: 'Rút super mất bao lâu', blocks: [
        { p: 'ATO cho biết DASP thường được trả trong vòng 28 ngày kể từ khi nhận được đơn đầy đủ. Có thể lâu hơn nếu đơn thiếu thông tin hoặc quỹ yêu cầu thêm giấy tờ.' },
      ] },
      'six-months': { title: 'Nếu chờ quá 6 tháng', blocks: [
        { p: 'Sáu tháng sau khi bạn rời Úc, nếu visa đã hết hiệu lực, quỹ super sẽ chuyển số tiền chưa rút sang ATO. Tiền không mất: bạn vẫn xin rút từ ATO được. Khi tiền đã nằm ở ATO, ATO chỉ trả vào tài khoản ngân hàng ở Úc đứng tên bạn, hoặc bằng séc.' },
      ] },
      'graduate-visa': { title: 'Chuyển sang visa 485', blocks: [
        { p: 'Bạn không rút được khi vẫn còn bất kỳ visa Úc nào đang có hiệu lực, kể cả visa tốt nghiệp 485 hay visa bắc cầu (bridging visa). Tiền super vẫn nằm trong quỹ cho đến khi bạn rời Úc và visa hết hiệu lực.' },
      ] },
      'with-us': { title: 'Rút super qua chúng tôi', blocks: [
        { p: 'Đơn online của ATO là miễn phí. Nếu bạn muốn có người giúp, chúng tôi cùng bạn kiểm tra các quỹ super, ngày visa và giấy tờ, và xác nhận giá qua WhatsApp trước khi bạn thanh toán.' },
        { p: 'Hồ sơ thuế cuối cùng là chuyện riêng, không liên quan đến tiền super. Hồ sơ này tính thu nhập đến ngày bạn rời Úc và được nộp sau ngày 30 tháng 6, dù lúc đó bạn đang ở Việt Nam hay nơi khác.' },
      ] },
    },
    faq: [
      { q: 'Rút super bị trừ thuế bao nhiêu?', a: 'Nếu bạn chưa từng có visa working holiday, thường là 35% phần đã chịu thuế, 45% phần chưa chịu thuế, và không tính thuế phần miễn thuế. Quỹ tự chia các phần và trừ thuế trước khi trả cho bạn.' },
      { q: 'Rút super mất bao lâu?', a: 'ATO cho biết DASP thường được trả trong vòng 28 ngày kể từ khi nhận được đơn đầy đủ. Thiếu giấy tờ thì sẽ lâu hơn.' },
      { q: 'Tiền hưu bổng có rút được khi về Việt Nam không?', a: 'Được. Tiền hưu bổng (super) rút được qua DASP sau khi bạn đã rời Úc và visa đã hết hiệu lực, kể cả khi bạn đang ở Việt Nam. Khi còn ở Úc, bạn chỉ bắt đầu điền đơn được, chưa nộp được.' },
      { q: 'Tôi sắp chuyển sang visa tốt nghiệp 485. Giờ tôi rút super được không?', a: 'Không. Bạn không thể rút khi vẫn còn giữ bất kỳ visa Úc nào đang có hiệu lực, kể cả visa 485. Tiền super vẫn nằm trong quỹ cho đến khi bạn rời Úc và visa hết hiệu lực.' },
      { q: 'Quên không rút super thì tiền có mất không?', a: 'Không mất. Sáu tháng sau khi bạn rời Úc, nếu visa đã hết hiệu lực, quỹ chuyển số tiền đó sang ATO thành super chưa nhận (unclaimed super), và bạn vẫn xin rút từ ATO được.' },
      { q: 'Xin DASP có mất phí không?', a: 'Không. Đơn trực tuyến của ATO là miễn phí, và bạn không bao giờ phải trả tiền để rút super của chính mình. Nếu muốn có người giúp, chúng tôi xác nhận giá qua WhatsApp trước khi bạn trả tiền.' },
      { q: 'Nộp đơn DASP trực tuyến thế nào?', a: 'Tìm tất cả tài khoản super của bạn, rồi bắt đầu điền đơn DASP trực tuyến miễn phí trên trang ATO; bạn có thể lưu đơn khi còn ở Úc. Nộp đơn khi đã rời Úc và visa đã hết hiệu lực, rồi quỹ trả số dư, sau khi trừ thuế, vào tài khoản ngân hàng bạn cung cấp.' },
      { q: '“Hoàn thuế xuất cảnh” có phải là DASP không?', a: 'Nhiều người gọi DASP là “hoàn thuế xuất cảnh”, nhưng thật ra đó là rút tiền super sau khi bạn rời Úc. Hoàn thuế ở sân bay (TRS) là hoàn GST cho hàng hóa bạn mang theo, còn tiền hoàn thuế thu nhập hằng năm là một việc riêng nữa.' },
    ],
    sourceLabels: ['ATO: Khoản super khi rời Úc (DASP)'],
  },
}
