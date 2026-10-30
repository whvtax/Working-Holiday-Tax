/**
 * Hướng dẫn (tiếng Việt). Nội dung đúng y như bản tiếng Anh về mặt thông tin
 * (nguồn trong docs/content/svt-facts-2026-10.md), nhưng viết lại theo cách
 * người Việt đọc. Cấu trúc (slug, id các mục, link nguồn chính thức, bài liên
 * quan) lấy từ bản tiếng Anh, xem guides-i18n.ts.
 */
import type { GuideText } from './guides-i18n'

export const GUIDES_VI: Readonly<Record<string, GuideText>> = {
  pricing: {
    label: 'Giá',
    meta: { title: 'Giá khai thuế du học sinh: từ $220, đã gồm GST', description: '$220 cho hồ sơ chỉ có việc làm TFN, $385 nếu có việc ABN như Uber Eats, đã gồm GST. Nếu tiền hoàn thuế thấp hơn phí, chúng tôi trả lại phần chênh lệch.' },
    h1: { before: 'Giá rõ ràng, ', mark: 'báo trước khi bạn trả tiền' },
    lead: 'Chỉ có hai mức giá, đều đã gồm GST. Chúng tôi xác nhận mức nào là của bạn qua WhatsApp, trước khi bạn trả bất cứ khoản nào.',
    sections: {
      prices: { title: 'Chi phí bao nhiêu', blocks: [
        { list: [
          '$220 khi bạn chỉ đi làm thuê dùng TFN: quán cà phê, bán lẻ, kho hàng, dọn dẹp, hay dạy kèm có phiếu lương.',
          '$385 khi bạn còn làm việc ABN: Uber Eats, DoorDash, Menulog, dọn dẹp tính tiền bằng hóa đơn, hoặc bất kỳ việc nào bạn tự gửi hóa đơn và không bị trừ thuế.',
        ] },
        { p: 'Cả hai mức giá đều đã gồm GST. Phí cố định, không bao giờ tính theo phần trăm tiền hoàn thuế.' },
        { p: 'Mỗi năm tài chính là một hồ sơ thuế riêng. Nếu bạn còn những năm trước chưa khai, hãy cho chúng tôi biết những năm nào, chúng tôi sẽ xác nhận giá cho từng năm trước khi bạn thanh toán.' },
      ] },
      guarantee: { title: 'Nếu tiền hoàn thuế thấp hơn phí của chúng tôi', blocks: [
        { p: 'Chúng tôi trả lại bạn phần chênh lệch. Ví dụ minh họa: nếu phí là $220 và tiền hoàn thuế cuối cùng của bạn là $150, chúng tôi trả lại bạn $70.' },
        { p: 'Chúng tôi trả khoản này sau khi ATO gửi thông báo tính thuế (notice of assessment), vì đó là giấy tờ cho biết số tiền hoàn thuế cuối cùng.' },
        { note: 'Nếu không có tiền hoàn thuế, hoặc bạn phải đóng thêm thuế, thì vẫn tính đủ phí. Đăng ký ngưỡng miễn thuế ở cả hai chỗ làm, hoặc giao đồ ăn bằng ABN, là những lý do hay gặp khiến du học sinh phải đóng thêm thuế.' },
      ] },
      paying: { title: 'Cách thanh toán', blocks: [
        { p: 'Chuyển khoản ngân hàng cho The Accounting Academy, sau khi chúng tôi đã xác nhận giá. Gửi ảnh chụp màn hình chuyển khoản qua WhatsApp là chúng tôi bắt đầu làm.' },
        { p: 'Chúng tôi không bao giờ hỏi mật khẩu myGov của bạn, và không bao giờ trừ phí vào tiền hoàn thuế của bạn.' },
      ] },
    },
    sourceLabels: ['ATO: Khai thuế qua đại lý thuế đã đăng ký'],
    short: {"answer": "Student Visa Tax tính $220 cho một hồ sơ khi mọi công việc của bạn đều là việc làm thuê dùng TFN, $385 nếu bạn có thêm việc ABN. Cả hai giá đều đã gồm GST, và chúng tôi xác nhận giá với bạn qua WhatsApp trước khi bạn trả tiền.", "mark": "chúng tôi xác nhận giá với bạn", "facts": [{"figure": "$220", "label": "chỉ có việc làm thuê dùng TFN"}, {"figure": "$385", "label": "có việc ABN, như giao đồ ăn"}]},
  },
  'how-it-works': {
    label: 'Quy trình',
    meta: { title: 'Quy trình khai thuế cho du học sinh ở Úc', description: 'Nhắn tin qua WhatsApp, chuyển khoản, điền một mẫu đơn ngắn, ký trực tuyến. Được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.' },
    h1: { before: 'Từ tin nhắn đầu tiên ', mark: 'đến khi nộp hồ sơ' },
    lead: 'Mọi việc đều làm qua WhatsApp và một mẫu đơn trực tuyến. Bạn không cần đến văn phòng, cũng không cần đưa thông tin đăng nhập myGov cho ai.',
    sections: {
      steps: { title: 'Các bước', blocks: [
        { list: [
          'Bạn nhắn tin cho chúng tôi qua WhatsApp. Chúng tôi hỏi về visa và công việc của bạn, rồi xác nhận giá.',
          'Bạn chuyển khoản cho The Accounting Academy và gửi ảnh chụp màn hình. Khi nhận được tiền, chúng tôi gửi bạn hóa đơn thuế (tax invoice).',
          'Bạn điền một mẫu đơn trực tuyến ngắn và tải lên những giấy tờ được yêu cầu.',
          'Chúng tôi xem mẫu đơn của bạn trong khoảng 24 giờ, rồi gửi bạn bản ước tính.',
          'Bạn đọc lại hồ sơ thuế và ký trực tuyến.',
          'Hồ sơ được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.',
        ] },
      ] },
      'what-you-need': { title: 'Cần chuẩn bị gì', blocks: [
        { list: [
          'Hộ chiếu và thông tin visa của bạn.',
          'Mã số thuế (TFN) của bạn.',
          'Thông tin tài khoản ngân hàng ở Úc, để nhận tiền hoàn thuế, nếu có.',
          'Nếu bạn có làm việc ABN: số tiền nhận được từ từng ứng dụng hoặc từng khách hàng, và các chi phí làm việc như điện thoại, xe đạp hay ô tô.',
        ] },
        { p: 'Bảng kê thu nhập (income statement) được chủ lao động gửi thẳng cho ATO, bạn không cần tự chuẩn bị. Chúng tôi chờ đến khi bảng kê hiện trạng thái “Tax ready”, thường là vào tháng 7.' },
      ] },
      timing: { title: 'Mất bao lâu', blocks: [
        { p: 'Chúng tôi xem mẫu đơn của bạn trong khoảng 24 giờ. Có hai điều có thể khiến cả quá trình lâu hơn: chủ lao động chưa hoàn tất bảng kê thu nhập của bạn, và giấy Medicare Entitlement Statement có thể phải chờ vài tuần mới có.' },
        { p: 'Sau đó ATO xử lý hồ sơ. Chúng tôi báo cho bạn khi hồ sơ đã được nộp, và khi có thông báo tính thuế.' },
      ] },
    },
    sourceLabels: ['ATO: Xem bảng kê thu nhập (income statement)'],
    short: {"answer": "Nhắn tin cho chúng tôi qua WhatsApp, chuyển khoản, điền một mẫu đơn ngắn và ký trực tuyến. Hồ sơ của bạn được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.", "mark": "WhatsApp", "facts": [{"figure": "24 giờ", "label": "khoảng thời gian chúng tôi cần để xem mẫu đơn của bạn"}]},
  },
  'tax-residency': {
    label: 'Cư trú thuế',
    meta: { title: 'Du học sinh có phải người cư trú về thuế?', description: 'Nếu khóa học của bạn từ 6 tháng trở lên, bạn có thể là người cư trú về thuế ở Úc. Điều đó ảnh hưởng thế nào đến ngưỡng miễn thuế và tiền từ quê nhà.' },
    h1: { before: 'Bạn có phải ', mark: 'người cư trú về thuế', after: '?' },
    lead: 'Chỉ riêng visa thì chưa đủ để xác định. Độ dài khóa học và cách bạn sống ở đây cũng quan trọng, và kết quả ảnh hưởng đến số thuế bạn phải đóng.',
    sections: {
      'six-months': { title: 'Quy định về khóa học 6 tháng', blocks: [
        { p: 'ATO cho biết: nếu bạn là du học sinh và đang học một khóa từ 6 tháng trở lên, bạn có thể là người cư trú về thuế ở Úc.' },
        { p: 'Chữ “có thể” rất quan trọng. Cư trú thuế được xác định bằng các tiêu chí về nơi bạn sống và sống bao lâu, nên chúng tôi xem ngày tháng và hoàn cảnh của bạn trước khi nộp bất cứ thứ gì.' },
      ] },
      'why-it-matters': { title: 'Vì sao điều này quan trọng', blocks: [
        { list: [
          'Người cư trú không phải đóng thuế cho $18,200 đầu tiên của thu nhập mỗi năm: đó là ngưỡng miễn thuế.',
          'Trong năm bạn mới sang hoặc rời Úc, bạn có thể chỉ được hưởng một phần ngưỡng này.',
          'Với hầu hết thu nhập, người cư trú chịu thuế suất thấp hơn người không cư trú, còn người không cư trú phải đóng thuế ngay từ đồng đầu tiên.',
        ] },
        { p: 'Chủ lao động trừ thuế ở mỗi kỳ lương như thể tuần nào trong năm bạn cũng kiếm được mức đó. Công việc thứ hai bị trừ thuế theo mức cao hơn. Nếu bạn chỉ đi làm một phần của năm, có thể bạn đã bị trừ thuế nhiều hơn mức cần đóng. Hồ sơ thuế sẽ tính ra số thuế đúng.' },
      ] },
      'income-from-home': { title: 'Tiền từ quê nhà', blocks: [
        { p: 'Hầu hết du học sinh cũng là người tạm trú (temporary resident), vì đang có visa tạm thời. Nếu bạn vừa là người tạm trú vừa là người cư trú về thuế, Úc thường không đánh thuế phần lớn thu nhập ở nước ngoài của bạn, như tiền lãi tiết kiệm ở quê nhà.' },
        { p: 'Bạn vẫn phải khai toàn bộ thu nhập ở Úc, và một số thu nhập từ công việc làm ở nước ngoài.' },
      ] },
      graduate: { title: 'Sau khi tốt nghiệp', blocks: [
        { p: 'Với visa tốt nghiệp 485, bạn thường sống và làm việc toàn thời gian ở đây, nên các câu hỏi về cư trú thuế ở trên cũng áp dụng cho bạn. Chúng tôi xem xét riêng từng năm.' },
      ] },
    },
    faq: [
      { q: 'Khóa học của tôi ngắn hơn 6 tháng. Tôi có phải người cư trú không?', a: 'Có lẽ là không, nhưng còn tùy bạn ở bao lâu và sống ở đây thế nào. Cho chúng tôi biết ngày tháng, chúng tôi kiểm tra giúp bạn.' },
      { q: 'Tôi chuyển từ visa working holiday sang visa du học. Có gì thay đổi không?', a: 'Có. Hai giai đoạn này có thể bị tính thuế khác nhau trong cùng một năm. Hãy cho chúng tôi biết cả hai visa và ngày tháng của từng visa.' },
    ],
    sourceLabels: ['ATO: Du học tại Úc', 'ATO: Người cư trú về thuế ở Úc'],
    short: {"answer": "Du học sinh ở Úc theo học khóa từ 6 tháng trở lên có thể là người cư trú về thuế tại Úc. Người cư trú được hưởng ngưỡng miễn thuế, là $18,200 trong năm 2025-26, hoặc một phần của ngưỡng này trong năm đến hoặc rời Úc.", "mark": "có thể là người cư trú về thuế", "facts": [{"figure": "6 tháng", "label": "độ dài khóa học có thể khiến bạn là người cư trú"}, {"figure": "$18,200", "label": "ngưỡng miễn thuế cho người cư trú"}]},
  },
  medicare: {
    label: 'Medicare levy',
    meta: { title: 'Miễn Medicare levy cho du học sinh', description: 'Du học sinh có bảo hiểm OSHC thường có thể xin miễn Medicare levy. Trước hết bạn cần giấy Medicare Entitlement Statement. Xin khi nào và xin ra sao.' },
    h1: { before: 'Medicare levy và ', mark: 'bảo hiểm du học sinh' },
    lead: 'Nếu bạn là người cư trú về thuế, khoản Medicare levy 2% thường sẽ được cộng vào thuế của bạn. Nếu bạn không đủ điều kiện hưởng Medicare, thường bạn có thể xin miễn, nhưng phải có đúng giấy tờ.',
    sections: {
      mes: { title: 'Giấy Medicare Entitlement Statement', blocks: [
        { p: 'Để xin miễn, bạn cần giấy Medicare Entitlement Statement (MES) do Services Australia cấp. Giấy này cho biết khoảng thời gian trong năm bạn không đủ điều kiện hưởng Medicare. Công ty bảo hiểm sẽ không gửi giấy này. Bạn phải tự xin.' },
        { list: [
          'Bắt đầu nhận đơn từ ngày 1 tháng 7, cho năm tài chính vừa kết thúc.',
          'Bạn xin trực tuyến qua tài khoản myGov.',
          'ATO cho biết thời gian xử lý có thể lên đến 8 tuần.',
          'Mỗi năm xin miễn, bạn cần một giấy mới.',
        ] },
        { note: 'ATO yêu cầu bạn phải chờ có MES rồi mới nộp hồ sơ thuế. Đây là lý do hay gặp nhất khiến hồ sơ của một du học sinh được nộp muộn hơn so với bạn bè.' },
      ] },
      'not-automatic': { title: 'Có giấy chưa chắc đã được miễn', blocks: [
        { p: 'Chỉ có MES thôi thì chưa tự động được miễn. Người phụ thuộc của bạn, kể cả vợ/chồng hoặc bạn đời (partner), cũng phải thuộc diện được miễn. Nếu vợ/chồng hoặc bạn đời của bạn đủ điều kiện hưởng Medicare, có thể bạn sẽ không xin miễn được.' },
        { p: 'Một số nước có thỏa thuận y tế với Úc, và du học sinh từ một vài nước trong số đó đủ điều kiện hưởng Medicare. Nếu bạn thuộc diện này, bạn không xin được MES. Cho chúng tôi biết nước cấp hộ chiếu của bạn, chúng tôi kiểm tra giúp.' },
      ] },
      'foreign-resident': { title: 'Nếu bạn không phải người cư trú về thuế', blocks: [
        { p: 'Người không cư trú về thuế trong cả năm thì không phải đóng Medicare levy, nên năm đó không cần giấy này.' },
      ] },
    },
    faq: [
      { q: 'Công ty bảo hiểm du học sinh có gửi giấy này cho tôi không?', a: 'Không. Công ty bảo hiểm không gửi giấy này. Bạn tự xin với Services Australia, trực tuyến qua tài khoản myGov, từ ngày 1 tháng 7.' },
      { q: 'Năm nào tôi cũng phải xin giấy mới à?', a: 'Đúng vậy. Mỗi năm bạn xin miễn Medicare levy đều cần một giấy Medicare Entitlement Statement mới.' },
    ],
    sourceLabels: ['ATO: Không có quyền hưởng Medicare', 'Services Australia: Medicare Entitlement Statement'],
    short: {"answer": "Nếu bạn là du học sinh, là người cư trú về thuế và không đủ điều kiện hưởng Medicare, thường bạn có thể xin miễn Medicare levy, nhưng phải có Medicare Entitlement Statement (MES) do Services Australia cấp. Hãy chờ có giấy này rồi mới nộp hồ sơ.", "mark": "Medicare Entitlement Statement (MES)", "facts": [{"figure": "2%", "label": "Medicare levy cho người cư trú"}, {"figure": "8 tuần", "label": "thời gian xử lý tối đa, theo ATO"}]},
  },
  'abn-delivery': {
    label: 'Uber Eats và việc ABN',
    meta: { title: 'Thuế cho shipper Uber Eats có visa du học', description: 'Thu nhập ABN không bị trừ thuế trước. Cách khai thu nhập giao hàng, chi phí nào được khấu trừ, GST, và vì sao shipper đôi khi phải đóng thêm. Hồ sơ $385.' },
    h1: { before: 'Uber Eats, DoorDash và ', mark: 'việc ABN' },
    lead: 'Khi làm việc bằng ABN, không ai trừ thuế vào tiền bạn kiếm được. Đó là khác biệt lớn nhất so với đi làm thuê, và cũng là lý do việc ABN cần cẩn thận hơn khi khai thuế.',
    sections: {
      'how-it-works': { title: 'Thu nhập ABN bị tính thuế thế nào', blocks: [
        { p: 'Tiền bạn kiếm từ ứng dụng được khai là thu nhập kinh doanh. Trừ đi chi phí làm việc, phần còn lại được cộng với tiền lương từ các công việc khác để tính thuế.' },
        { p: 'Vì cả năm không bị trừ thuế, việc ABN có thể biến một khoản hoàn thuế thành khoản phải đóng thêm. Biết sớm thì tốt hơn: trước khi bạn ký, chúng tôi có thể cho bạn biết tình hình đại khái.' },
      ] },
      costs: { title: 'Chi phí thường được khấu trừ', blocks: [
        { list: [
          'Phần điện thoại và dữ liệu di động dùng cho công việc.',
          'Chi phí vận hành và sửa chữa xe đạp, xe đạp điện hoặc xe scooter, và túi giao hàng.',
          'Chi phí ô tô, nếu bạn giao hàng bằng ô tô, kèm ghi chép số km chạy cho công việc.',
        ] },
        { p: 'Cách tính đơn giản theo số km chỉ dành cho ô tô. Xe máy, xe scooter và xe đạp được tính theo chi phí thực tế, nên hãy giữ lại hóa đơn.' },
        { p: 'Giữ giấy tờ trong 5 năm kể từ ngày nộp hồ sơ.' },
      ] },
      gst: { title: 'GST', blocks: [
        { p: 'Với giao đồ ăn và giao hàng, bạn chỉ phải đăng ký GST khi doanh thu đạt $75,000 một năm. Hầu hết shipper là du học sinh không bao giờ đến mức đó.' },
        { note: 'Chở khách thì khác. Với dịch vụ chở khách qua ứng dụng, như Uber chở người, ATO yêu cầu bạn phải đăng ký GST trước chuyến chở khách đầu tiên, dù kiếm được ít đến đâu.' },
      ] },
      price: { title: 'Giá ở chỗ chúng tôi', blocks: [
        { p: 'Hồ sơ có việc ABN giá $385, đã gồm GST, dù bạn chỉ giao hàng hay vừa giao hàng vừa đi làm.' },
      ] },
    },
    faq: [
      { q: 'Tôi có dùng chương trình Tax Help miễn phí cho việc giao hàng được không?', a: 'Không. Chương trình Tax Help của ATO không dành cho người làm nhà thầu (contractor) hoặc tự kinh doanh, và giao hàng bằng ABN thuộc diện này.' },
      { q: 'Tôi không giữ hóa đơn. Có còn khấu trừ được không?', a: 'Một số chi phí có thể tính ra từ sao kê ngân hàng và lịch sử trên ứng dụng. Cho chúng tôi biết bạn có gì, chúng tôi xem khoản nào được khấu trừ đúng quy định.' },
    ],
    sourceLabels: ['ATO: Đăng ký cho dịch vụ chở khách qua ứng dụng', 'ATO: Giấy tờ cần lưu giữ', 'ATO: Chương trình Tax Help'],
    short: {"answer": "Không ai trừ thuế trước từ thu nhập ABN. Khoản này được khai là thu nhập kinh doanh, trừ đi chi phí công việc, nên việc giao đồ ăn có thể biến tiền hoàn thuế thành khoản thuế phải đóng.", "mark": "Không ai trừ thuế trước", "facts": [{"figure": "$385", "label": "hồ sơ có việc ABN"}, {"figure": "$75,000", "label": "doanh thu một năm phải đạt mới cần đăng ký GST khi giao đồ ăn, giao hàng"}]},
  },
  'do-i-need-to-lodge': {
    label: 'Có cần khai thuế không?',
    meta: { title: 'Du học sinh ở Úc có cần khai thuế không?', description: 'Nếu bạn đã đi làm ở Úc và bị trừ thuế từ lương, thường bạn cần khai thuế. Hạn nộp, chuyện gì xảy ra nếu không khai, và khi nào nên dùng hỗ trợ miễn phí.' },
    h1: { before: 'Tôi có cần ', mark: 'khai thuế', after: ' không?' },
    lead: 'Thường là có, nếu bạn đã đi làm ở Úc và bị trừ thuế từ lương. Khai thuế để lấy lại phần thuế bị trừ dư, và đôi khi cho thấy bạn phải đóng thêm.',
    sections: {
      who: { title: 'Ai thường phải khai thuế', blocks: [
        { list: [
          'Người bị trừ thuế từ lương trong năm.',
          'Người có thu nhập ABN, như giao đồ ăn.',
          'Người muốn xin miễn Medicare levy hoặc khấu trừ chi phí làm việc.',
        ] },
        { p: 'Năm tài chính ở Úc tính từ ngày 1 tháng 7 đến ngày 30 tháng 6. Mỗi năm là một hồ sơ riêng.' },
      ] },
      deadline: { title: 'Hạn nộp', blocks: [
        { p: 'Nếu bạn tự khai, hạn thông thường là ngày 31 tháng 10 sau khi năm tài chính kết thúc.' },
        { p: 'Đại lý thuế đã đăng ký có chương trình nộp hồ sơ cho phép khách hàng nộp muộn hơn. ATO cho biết, để được tham gia, bạn nên liên hệ đại lý thuế trước ngày 31 tháng 10. Hạn nộp cụ thể của bạn tùy vào hoàn cảnh của bạn.' },
        { note: 'Nếu đến ngày 30 tháng 6 vẫn còn năm trước chưa khai, hồ sơ năm nay phải nộp chậm nhất là ngày 31 tháng 10, kể cả khi khai qua đại lý. Hãy cho chúng tôi biết mọi năm bạn đã đi làm.' },
      ] },
      'free-help': { title: 'Khi nào nên dùng hỗ trợ miễn phí', blocks: [
        { p: 'Nếu thu nhập của bạn khoảng $70,000 trở xuống và hồ sơ đơn giản, chương trình Tax Help của ATO và một số phòng tư vấn ở trường đại học có thể giúp bạn miễn phí. Chương trình này không dành cho việc ABN hay thu nhập kinh doanh.' },
        { p: 'Nếu bạn muốn có người kiểm tra giúp chuyện cư trú thuế, miễn Medicare levy hay chi phí giao hàng, thì đó chính là việc chúng tôi làm.' },
      ] },
    },
    sourceLabels: ['ATO: Khai thuế qua đại lý thuế đã đăng ký', 'ATO: Chương trình Tax Help', 'ATO: Hạn nộp hồ sơ khi khai qua đại lý'],
    short: {"answer": "Thường là có, nếu bạn đã đi làm ở Úc và bị trừ thuế từ lương, hoặc có thu nhập ABN. Mỗi năm tài chính, từ 1 tháng 7 đến 30 tháng 6, là một hồ sơ riêng.", "mark": "Thường là có"},
  },
  'past-years': {
    label: 'Các năm trước',
    meta: { title: 'Khai bù thuế các năm trước cho du học sinh', description: 'Bỏ lỡ hồ sơ thuế của năm trước? Bạn vẫn có thể khai. Cần làm gì, chúng tôi cần những gì, và vì sao nên bắt đầu ngay.' },
    h1: { before: 'Bỏ lỡ một năm? ', mark: 'Vẫn khai được' },
    lead: 'Nhiều du học sinh đến năm thứ hai, thứ ba mới biết phải khai thuế. Các năm trước vẫn khai được, mỗi năm một hồ sơ.',
    sections: {
      how: { title: 'Chúng tôi khai bù thế nào', blocks: [
        { list: [
          'Cho chúng tôi biết những năm tài chính bạn đã đi làm ở Úc, và visa của từng năm.',
          'Chúng tôi xác nhận giá cho từng năm trước khi bạn thanh toán.',
          'Phiếu lương cũ, sao kê ngân hàng và lịch sử trên ứng dụng giúp chúng tôi hoàn thành từng năm.',
          'Mỗi năm được làm thành một hồ sơ riêng, và được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.',
        ] },
      ] },
      'why-now': { title: 'Vì sao nên làm ngay', blocks: [
        { p: 'Nếu năm trước có tiền hoàn thuế, đó vẫn là tiền của bạn và bạn vẫn có thể nhận lại. Nếu năm nào phải đóng thêm thuế, ATO có thể phạt và tính lãi vì nộp muộn, nên xử lý càng sớm càng tốt.' },
        { p: 'Nếu đến ngày 30 tháng 6 vẫn còn năm trước chưa khai, hồ sơ năm hiện tại phải nộp chậm nhất là ngày 31 tháng 10, kể cả khi khai qua đại lý.' },
      ] },
    },
    sourceLabels: ['ATO: Khai thuế qua đại lý thuế đã đăng ký', 'ATO: Hạn nộp hồ sơ khi khai qua đại lý'],
    short: {"answer": "Được. Các năm trước vẫn có thể nộp, mỗi năm một hồ sơ riêng, và nếu năm trước có tiền hoàn thuế, đó vẫn là tiền của bạn. Nếu một năm nào đó phải đóng thêm thuế, giải quyết càng sớm càng tốt.", "mark": "mỗi năm một hồ sơ riêng"},
  },
  'leaving-australia': {
    label: 'Rời Úc',
    meta: { title: 'Học xong và rời Úc: thuế và tiền super', description: 'Bạn có thể khai hồ sơ thuế cuối cùng ở Úc từ nước ngoài, sau ngày 30 tháng 6. Những việc cần làm trước khi bay, và cách rút tiền super sau khi đã đi.' },
    h1: { before: 'Học xong và ', mark: 'về nước' },
    lead: 'Rời Úc không có nghĩa là xong thuế của năm đó. Bạn có thể khai hồ sơ cuối cùng từ nước ngoài, và rút tiền super sau khi đã rời Úc.',
    sections: {
      before: { title: 'Trước khi bay', blocks: [
        { list: [
          'Giữ tài khoản ngân hàng ở Úc cho đến khi nhận được tiền hoàn thuế (nếu có), và cho đến khi nhận tiền super nếu bạn muốn nhận vào tài khoản này.',
          'Hầu hết chủ lao động báo lương của bạn thẳng cho ATO. Nếu có chủ nào không báo, hãy xin họ bảng tóm tắt thu nhập (payment summary) trước khi đi. ATO cho biết họ phải đưa trong vòng 14 ngày.',
          'Lưu lại phiếu lương, và lịch sử thu nhập trên ứng dụng nếu bạn có giao hàng.',
          'Ghi lại email và số điện thoại bạn sẽ dùng ở nước ngoài, và đừng xóa WhatsApp.',
        ] },
      ] },
      'last-return': { title: 'Hồ sơ thuế cuối cùng', blocks: [
        { p: 'Hồ sơ cuối cùng thường được nộp sau ngày 30 tháng 6, khi năm tài chính đã kết thúc. Bạn có thể làm từ nước ngoài, và chúng tôi vẫn làm việc với bạn qua WhatsApp như bình thường.' },
        { p: 'Nếu bạn rời Úc hẳn trước ngày 30 tháng 6, vẫn có thể nộp sớm, nhưng chỉ bằng giấy, và ATO xử lý lâu hơn. Với hầu hết mọi người, chờ đến hết năm thì đơn giản hơn.' },
      ] },
      super: { title: 'Tiền super của bạn', blocks: [
        { p: 'Tiền super chủ lao động đã đóng cho bạn có thể rút dưới dạng khoản DASP (departing Australia superannuation payment), sau khi visa của bạn đã hết hiệu lực và bạn đã rời Úc. Chúng tôi có thể giúp bạn làm việc này.' },
      ] },
    },
    sourceLabels: ['ATO: Trở về nước'],
    short: {"answer": "Sau ngày 30 tháng 6, bạn có thể nộp hồ sơ thuế cuối cùng từ bất cứ đâu, và xin rút super theo diện DASP khi đã rời Úc và visa đã hết hiệu lực. Hãy giữ tài khoản ngân hàng ở Úc cho đến khi nhận được tiền hoàn thuế, nếu có.", "mark": "Hãy giữ tài khoản ngân hàng ở Úc", "facts": [{"figure": "14 ngày", "label": "để chủ lao động đưa bảng tóm tắt thu nhập khi bạn yêu cầu"}]},
  },
  superannuation: {
    label: 'Tiền super (DASP)',
    meta: { title: 'Rút tiền super khi rời Úc (DASP)', description: 'Du học sinh và người có visa tốt nghiệp rút tiền super ở Úc sau khi rời đi thế nào: ai đủ điều kiện, thuế suất, và chuyện gì xảy ra nếu chờ quá 6 tháng.' },
    h1: { before: 'Lấy lại ', mark: 'tiền super', after: ' sau khi rời Úc' },
    lead: 'Ngoài tiền lương, chủ lao động còn đóng tiền super cho bạn. Khi bạn đã rời Úc và visa đã hết hiệu lực, bạn có thể rút số tiền này dưới dạng khoản DASP.',
    sections: {
      eligible: { title: 'Ai được rút', blocks: [
        { list: [
          'Tiền super được đóng khi bạn làm việc ở đây bằng visa tạm thời (visa du học hoặc visa tốt nghiệp đều được tính).',
          'Visa của bạn đã hết hiệu lực, do hết hạn hoặc bị hủy.',
          'Bạn đã rời Úc và không còn visa Úc nào khác đang có hiệu lực.',
          'Bạn không phải công dân Úc hay New Zealand, cũng không phải thường trú nhân Úc.',
        ] },
      ] },
      tax: { title: 'Thuế bị trừ', blocks: [
        { p: 'Quỹ super sẽ trừ thuế trước khi trả cho bạn. Nếu bạn chưa từng có visa working holiday, thuế suất thông thường là 35% với phần lớn tiền super (phần đã chịu thuế, taxed element) và 45% với phần chưa chịu thuế (untaxed element).' },
        { note: 'Nếu bạn cũng từng có visa working holiday (417 hoặc 462), và khoản rút có tiền super từ thời gian đó, ATO áp thuế 65% cho toàn bộ số tiền.' },
      ] },
      'six-months': { title: 'Nếu chờ quá 6 tháng', blocks: [
        { p: 'Sáu tháng sau khi bạn rời Úc, nếu visa đã hết hiệu lực, quỹ super sẽ chuyển số tiền chưa rút sang ATO. Tiền không mất, và bạn vẫn có thể xin rút từ ATO.' },
      ] },
      'with-us': { title: 'Rút qua chúng tôi', blocks: [
        { p: 'Đơn trực tuyến của chính ATO là miễn phí. Nếu bạn muốn chúng tôi làm giúp, chúng tôi kiểm tra các quỹ super, ngày visa và giấy tờ, và xác nhận giá với bạn qua WhatsApp trước khi bạn thanh toán.' },
      ] },
    },
    faq: [
      { q: 'Tôi còn ở Úc thì có rút super được không?', a: 'Không. Bạn có thể bắt đầu điền đơn trước khi đi, nhưng chỉ nộp được khi đã rời Úc và visa đã hết hiệu lực.' },
      { q: 'Tôi sắp chuyển sang visa tốt nghiệp 485. Giờ tôi rút super được không?', a: 'Không. Bạn không thể rút khi vẫn còn giữ bất kỳ visa Úc nào đang có hiệu lực, kể cả visa 485. Tiền super vẫn nằm trong quỹ cho đến khi bạn rời Úc và visa hết hiệu lực.' },
    ],
    sourceLabels: ['ATO: Khoản super khi rời Úc (DASP)'],
    short: {"answer": "Khi đã rời Úc và visa đã hết hiệu lực, bạn có thể xin rút tiền super, gọi là khoản super khi rời Úc (DASP). Quỹ sẽ trừ thuế trước khi trả.", "mark": "khoản super khi rời Úc (DASP)", "facts": [{"figure": "35%", "label": "mức thuế thường gặp trên phần lớn super, nếu chưa từng có visa working holiday"}, {"figure": "6 tháng", "label": "sau khi rời Úc và visa hết hiệu lực, super chưa rút sẽ chuyển cho ATO"}]},
  },
  about: {
    label: 'Về chúng tôi',
    meta: { title: 'Về chúng tôi: chỉ khai thuế visa du học', description: 'Chỉ làm khai thuế cho người có visa du học và visa tốt nghiệp. Hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký.' },
    h1: { before: 'Chỉ dành cho ', mark: 'visa du học' },
    lead: 'Student Visa Tax chỉ làm khai thuế cho người có visa du học (500) và visa tốt nghiệp (485) ở Úc, ngoài ra không làm gì khác.',
    sections: {
      why: { title: 'Vì sao chỉ làm cho du học sinh', blocks: [
        { p: 'Thuế của du học sinh có những câu hỏi riêng: quy định khóa học 6 tháng, giấy Medicare Entitlement Statement, làm hai việc bán thời gian cùng lúc, giao đồ ăn bằng ABN, và tiền super khi về nước. Chúng tôi chỉ làm những việc này, nên bạn không phải giải thích lại từ đầu.' },
        { p: 'Bạn có thể hỏi chúng tôi bằng tiếng Anh, tiếng Trung hoặc tiếng Việt.' },
      ] },
      'who-checks': { title: 'Ai kiểm tra hồ sơ của bạn', blocks: [
        { p: 'Student Visa Tax hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký, The Accounting Academy Services Pty Limited. Mọi hồ sơ đều được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO.' },
        { p: 'Chúng tôi không bao giờ hỏi mật khẩu myGov của bạn.' },
      ] },
    },
    sourceLabels: ['Tax Practitioners Board: Sổ đăng ký công khai'],
    short: {"answer": "Student Visa Tax chỉ làm hồ sơ thuế cho người có visa du học và visa tốt nghiệp ở Úc, bằng tiếng Anh, tiếng Trung và tiếng Việt, và hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký.", "mark": "chỉ làm hồ sơ thuế cho người có visa du học và visa tốt nghiệp"},
  },
}
