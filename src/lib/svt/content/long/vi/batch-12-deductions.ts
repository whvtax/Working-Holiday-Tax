import type { LongText } from '../types'

export const LONG_VI_DEDUCTIONS: Readonly<Record<string, LongText>> = {
  'deductions-by-job-international-students': {
    title: 'Khấu trừ thuế theo từng công việc cho du học sinh',
    description: 'Bạn được khấu trừ gì tùy vào công việc bạn làm. Hướng dẫn theo từng việc cho du học sinh làm quán cà phê, bán lẻ, dọn dẹp, chăm sóc, kho hàng, nông trại, giao đồ ăn và chở khách.',
    answer: 'Bạn được khấu trừ những chi phí công việc do chính bạn trả, không được hoàn lại, liên quan trực tiếp đến việc tạo ra thu nhập và có chứng từ chứng minh. Danh sách cụ thể khác nhau ở mỗi công việc, nên hãy bắt đầu từ công việc bạn thực sự đã làm.',
    body: `Phần lớn du học sinh làm nhiều hơn một loại việc trong năm. Một học kỳ làm quán cà phê, một mùa hè làm nông trại và thêm vài buổi dọn dẹp cuối tuần là chuyện rất bình thường. Mỗi công việc có một danh sách ngắn những chi phí bạn được khấu trừ khi khai thuế, và một danh sách những thứ trông có vẻ được khấu trừ nhưng thực ra là không.

Bài này là tấm bản đồ. Bài giải thích các quy tắc áp dụng cho mọi công việc, rồi chỉ cho bạn hướng dẫn phù hợp với từng việc trên trang này.

## Ba quy tắc đứng sau mọi khoản khấu trừ

ATO dùng cùng ba điều kiện cho mọi chi phí công việc, dù bạn làm việc gì hay có visa nào:

- **Bạn tự trả tiền** và không ai hoàn lại cho bạn. Nếu chủ lao động đưa cho bạn món đồ đó, hoặc đã hoàn tiền, thì không có gì để khấu trừ.
- **Chi phí liên quan trực tiếp đến việc tạo ra thu nhập.** Chi phí phải phát sinh từ việc làm công việc đó, không phải từ việc đi xin việc hay từ đời sống riêng của bạn.
- **Bạn có chứng từ.** Thường là hóa đơn. Không có chứng từ, khoản khấu trừ có thể bị từ chối.

Nếu một món đồ vừa dùng cho công việc vừa dùng cho việc riêng, bạn chỉ được khấu trừ phần dùng cho công việc. Một chiếc điện thoại dùng một nửa cho công việc, một nửa để liên lạc với bạn bè thì chỉ được khấu trừ 50%, không phải toàn bộ.

## Bạn đã làm công việc nào?

Hãy tìm công việc của bạn dưới đây. Mỗi công việc có một hướng dẫn riêng, gồm danh sách "được khấu trừ", "không được khấu trừ" và một ví dụ cụ thể.

- **Nhà hàng, quán cà phê, quán bar:** giày bảo hộ, đồng phục có logo, phí gia hạn RSA (chứng chỉ phục vụ rượu có trách nhiệm).
- **Phụ bếp và đầu bếp:** quần kẻ ô của đầu bếp, dao, găng tay chống cắt.
- **Bán lẻ và siêu thị:** đồng phục có logo và tiền giặt, khóa học cho đúng công việc hiện tại.
- **Dọn dẹp:** dụng cụ, hóa chất, đồ bảo hộ, đi lại giữa các chỗ làm trong cùng một ngày.
- **Chăm sóc người già và hỗ trợ người khuyết tật:** giày chống trượt, găng tay và khẩu trang, đi lại giữa các khách hàng.
- **Kho hàng và lao động phổ thông:** giày mũi thép, áo phản quang (hi-vis), phí gia hạn bằng lái xe nâng.
- **Xây dựng:** đồ bảo hộ cá nhân (PPE), dụng cụ, đồ chống nắng khi làm ngoài trời, phí gia hạn các loại thẻ.
- **Nông trại và hái trái cây:** kem chống nắng, mũ, găng tay, dụng cụ hái.
- **Gia sư, trợ giảng và nhân viên chăm sóc trẻ:** đồ dùng dạy học, một số trường hợp kiểm tra làm việc với trẻ em (working with children check).
- **Giao đồ ăn bằng ABN:** phí nền tảng, phần dùng cho công việc của điện thoại và xe.
- **Chạy xe chở khách bằng ABN:** chi phí xe, phí nền tảng, đồ dùng cho khách, giấy phép hành nghề tài xế.

## Những khoản không ai được khấu trừ, dù làm việc gì

Một số chi phí là chi phí riêng với tất cả mọi người. Năm nào du học sinh cũng hỏi về chúng, nên chúng tôi gom lại ở đây:

- **Quần áo thông thường**, kể cả khi chủ lao động yêu cầu bạn mặc. Quần đen và áo sơ mi trắng là ví dụ của chính ATO.
- **Đường đi từ nhà đến chỗ làm**, kể cả khi đường xa, đi sớm hay về khuya.
- **Đồ ăn thức uống trong một ca làm bình thường.**
- **Bằng hoặc chứng chỉ đầu tiên** mà bạn cần có để được nhận vào làm. Phí gia hạn trong lúc bạn đang làm việc thì lại là chuyện khác.
- **Tiêm chủng**, kể cả khi công việc bắt buộc.
- **Tiền phạt**, như phạt đỗ xe hay phạt chạy quá tốc độ.
- **Tiền thuê nhà, tiền chợ và OSHC (bảo hiểm y tế du học sinh).** Đây là chi phí sinh hoạt.
- **Học phí khóa học theo visa du học của bạn**, trong hầu hết trường hợp. Việc học chỉ được khấu trừ khi gắn chặt với công việc bạn đang làm, không phải khi nó chuẩn bị cho bạn một nghề mới.

## Quy định về chứng từ

Chứng từ quan trọng hơn nhiều so với điều phần lớn du học sinh nghĩ. Đây là các quy định của ATO:

- **Giữ chứng từ trong 5 năm** kể từ ngày bạn nộp hồ sơ thuế.
- **Một chứng từ đạt yêu cầu** ghi rõ bên bán, số tiền, món bạn mua và ngày mua. Một tấm ảnh chụp hóa đơn rõ nét trên điện thoại là được.
- **Chỉ có sao kê ngân hàng thường là chưa đủ.** ATO cho biết sao kê có thể hỗ trợ một khoản khấu trừ khi bạn không lấy được hóa đơn, nhưng nên đi kèm chứng từ khác, như một ghi chép trong sổ tay.
- **Quy tắc $300 (năm 2025-26 trở về trước):** nếu tổng các khoản khấu trừ công việc của bạn từ $300 trở xuống, bạn không cần hóa đơn, nhưng vẫn phải cho thấy bạn đã tính số tiền đó thế nào. Chi phí ô tô có quy định riêng và không tính vào mức $300 này.
- **Dụng cụ và thiết bị:** món đồ có giá từ $300 trở xuống được khấu trừ toàn bộ trong năm mua. Món đồ trên $300, hoặc một bộ có tổng giá trên $300, được khấu trừ dần qua nhiều năm.
- **Tiền giặt:** ATO chấp nhận $1 cho mỗi mẻ chỉ có quần áo làm việc, hoặc 50 cent cho mỗi mẻ nếu bạn giặt chung quần áo làm việc với đồ cá nhân. Cách tính này chỉ áp dụng cho quần áo được khấu trừ.
- **Đi lại bằng ô tô:** cách tính theo cent mỗi km (cents per kilometre) chỉ dành cho ô tô. Cách này không áp dụng cho xe máy hay xe đạp.

## Ví dụ: một du học sinh, ba công việc

Mei đang học thạc sĩ hai năm, nên cô có thể là người cư trú về thuế ở Úc. Trong năm 2025-26, cô làm ở một quán cà phê, làm nông trại trong một mùa hè và dọn nhà vào cuối tuần.

- Giày chống trượt cho quán cà phê, cần thiết vì sàn ướt: $95
- Kem chống nắng và mũ rộng vành cho nông trại: $60
- Găng tay và sản phẩm tẩy rửa cô tự mua: $110
- Một bộ đồng phục mới của quán cà phê có logo, giặt riêng mỗi tuần một lần trong 40 tuần, $1 mỗi mẻ: $40

Tổng cộng là $305. Vì số này vượt quá $300, cô cần chứng từ bằng văn bản cho toàn bộ, không chỉ cho $5 vượt mức. Cô đã giữ ảnh chụp hóa đơn và một cuốn sổ ghi việc giặt đơn giản, nên khoản khấu trừ này vững vàng. Chiếc quần jean đen cô mặc ở quán cà phê không nằm trong danh sách.

## Một khoản khấu trừ đáng bao nhiêu với bạn

Khoản khấu trừ làm giảm thu nhập chịu thuế của bạn. Nó không quay về túi bạn theo kiểu một đồng đổi một đồng. Giá trị của nó phụ thuộc vào thuế suất của bạn:

- **Nếu bạn có thể là người cư trú về thuế** và thu nhập chịu thuế nằm trong khung từ $18,201 đến $45,000, mỗi $100 khấu trừ giúp giảm $16 tiền thuế thu nhập (thuế suất năm 2025-26).
- **Nếu bạn là người không cư trú về thuế**, thuế bắt đầu ở mức 30% ngay từ đồng đầu tiên, nên mỗi $100 khấu trừ giúp giảm $30 tiền thuế thu nhập.
- **Nếu bạn có thể là người cư trú về thuế và thu nhập chịu thuế vốn đã dưới $18,200**, một khoản khấu trừ thường không thay đổi gì, vì không có tiền thuế thu nhập nào để giảm.

## Một thay đổi từ năm 2026-27

Từ năm 2026-27 (hồ sơ thuế bạn nộp từ tháng 7 năm 2027), ATO sẽ áp dụng khoản khấu trừ chuẩn tối đa $1,000 cho người cư trú về thuế có thu nhập từ lao động như tiền lương. Bạn không cần hóa đơn cho khoản này. Nếu bạn kê khai chi phí công việc thực tế, khoản khấu trừ chuẩn bị giảm đúng bằng số đó, nên có thể giảm về 0. Khoản này không áp dụng cho hồ sơ năm 2025-26, và cũng không áp dụng cho người không cư trú về thuế.

## Bước tiếp theo

- Mở hướng dẫn cho từng công việc bạn đã làm trong năm.
- Tạo ngay hôm nay một album ảnh hoặc thư mục trên điện thoại để lưu hóa đơn.
- Ghi lại mọi chuyến đi giữa hai chỗ làm trong cùng một ngày: ngày, địa điểm và số km.
- Ghi việc giặt đồng phục vào một cuốn sổ đơn giản.

Khi bạn sẵn sàng nộp hồ sơ, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp và chúng tôi sẽ cùng bạn xem qua từng công việc.`,
    faq: [
      { q: 'Năm nay tôi làm ba công việc. Tôi có phải nộp ba hồ sơ thuế không?', a: 'Không. Bạn nộp một hồ sơ cho cả năm tài chính, từ ngày 1 tháng 7 đến ngày 30 tháng 6. Hồ sơ đó gồm thu nhập và các khoản khấu trừ của mọi công việc.' },
      { q: 'Tôi có được khấu trừ học phí đại học không?', a: 'Trong hầu hết trường hợp là không. Việc học chỉ được khấu trừ khi gắn chặt với công việc bạn đang làm, ví dụ một khóa học nâng cao kỹ năng bạn dùng trong công việc đó. Khóa học chuẩn bị cho bạn một nghề mới thì không được khấu trừ.' },
      { q: 'Sao kê ngân hàng có đủ làm chứng từ không?', a: 'Thường là không, nếu chỉ có một mình nó. ATO muốn có hóa đơn từ bên bán. Sao kê ngân hàng có thể giúp khi bạn làm mất hóa đơn, đi kèm với chứng từ khác như một ghi chép trong sổ tay.' },
      { q: 'Người không cư trú về thuế có được khấu trừ như vậy không?', a: 'Có. Quy định về khấu trừ là như nhau. Điều khác là thuế suất, nên cùng một khoản khấu trừ có thể có giá trị khác nhau với mỗi người.' },
    ],
  },
  'hospitality-tax-deductions-students': {
    title: 'Khấu trừ thuế ngành nhà hàng cho du học sinh',
    description: 'Phục vụ bàn, pha chế cà phê hay làm quầy bar khi có visa du học? Nhân viên quán cà phê, bar và nhà hàng được khấu trừ gì khi khai thuế, không được gì, và cần giữ chứng từ nào.',
    answer: 'Nhân viên quán cà phê, quán bar và nhà hàng được khấu trừ quần áo bảo hộ, đồng phục bắt buộc có logo của chủ lao động cùng tiền giặt, phí gia hạn RSA hoặc giấy phép trò chơi có thưởng, và khóa học gắn với công việc hiện tại. Quần áo đen thông thường, RSA đầu tiên và bữa ăn trong ca thì không được khấu trừ.',
    body: `Ngành nhà hàng là một trong những công việc phổ biến nhất của du học sinh. Quán cà phê, quán bar và nhà hàng có ca làm casual dễ xếp quanh giờ học. Danh sách khấu trừ cho công việc này ngắn, nhưng rất dễ sai theo cả hai chiều: du học sinh khai những thứ không được khai, và quên mất vài thứ được khai.

Bài này dành cho công việc ở khu vực phục vụ khách: phục vụ bàn, pha chế cà phê (barista), pha chế ở quầy bar và người chạy món. Nếu bạn làm trong bếp, hãy đọc hướng dẫn riêng của chúng tôi cho phụ bếp và đầu bếp.

## Những quy tắc áp dụng trước tiên

Mọi khoản khấu trừ phải đáp ứng ba điều kiện của ATO:

- Bạn tự trả tiền và không được hoàn lại.
- Chi phí liên quan trực tiếp đến việc tạo ra thu nhập từ công việc này.
- Bạn có chứng từ, thường là hóa đơn.

Nếu bạn dùng một thứ cho cả công việc lẫn việc riêng, bạn chỉ được khấu trừ phần dùng cho công việc.

## Những gì bạn được khấu trừ

- **Đồng phục bắt buộc.** Tức là quần áo chủ lao động yêu cầu theo một quy định được áp dụng nghiêm ngặt, và mang nét riêng của doanh nghiệp, ví dụ áo có logo của quán. Bạn được khấu trừ tiền mua, sửa và giặt.
- **Đồng phục không bắt buộc đã được đăng ký.** Một số đồng phục có tên trong danh sách Register of Approved Occupational Clothing của ATO. Hãy hỏi chủ lao động nếu bạn không chắc.
- **Quần áo và giày bảo hộ.** Những món có đặc điểm bảo vệ bạn khỏi một rủi ro cụ thể trong công việc, như tạp dề hoặc giày chống trượt cho sàn ướt sau máy pha cà phê hay sau quầy bar.
- **Tiền giặt quần áo được khấu trừ.** $1 mỗi mẻ nếu bạn chỉ giặt quần áo làm việc, hoặc 50 cent mỗi mẻ nếu giặt chung với đồ cá nhân.
- **Phí gia hạn RSA hoặc gia hạn giấy phép trò chơi có thưởng (gaming licence).** ATO cho biết bạn được khấu trừ phí gia hạn trong lúc đang làm công việc này.
- **Khóa học gắn với công việc hiện tại.** Ví dụ của ATO là một khóa pha chế cà phê cho người đã làm ở quán cà phê.
- **Phí công đoàn.**

## Những gì bạn không được khấu trừ

- **Quần áo thông thường**, kể cả khi quản lý yêu cầu. Ví dụ của ATO là quần đen và áo sơ mi trắng. Giày đen trơn, quần jean và áo polo trơn cũng thuộc nhóm này.
- **RSA đầu tiên của bạn.** Chi phí lấy chứng chỉ lần đầu không được khấu trừ, vì nó giúp bạn có được việc chứ không phải để làm việc.
- **Đồ ăn thức uống trong ca**, kể cả bữa ăn nhân viên. Đây là chi phí riêng.
- **Chăm sóc ngoại hình**, như cắt tóc hay trang điểm, kể cả khi quán có tiêu chuẩn riêng.
- **Đi lại từ nhà đến chỗ làm**, kể cả sau khi đóng cửa muộn hay làm ca gãy.
- **Tiêm chủng**, kể cả khi chủ lao động yêu cầu.
- **Bất cứ thứ gì chủ lao động đã trả hoặc đã hoàn tiền.**

## Tiền tip là thu nhập, không phải khoản khấu trừ

Đây không phải khoản khấu trừ, nhưng nó quan trọng với du học sinh làm ngành nhà hàng. Tiền tip là một phần thu nhập chịu thuế của bạn. Tip trả qua bảng lương đã có sẵn trong bảng kê thu nhập (income statement). Tip tiền mặt đưa thẳng cho bạn cũng phải khai, nên hãy ghi lại tổng số mỗi tuần một cách đơn giản.

## Ví dụ cụ thể

Arjun đang học cử nhân và làm barista kiêm phục vụ bàn. Anh có thể là người cư trú về thuế ở Úc. Trong năm 2025-26, anh đã trả:

- Giày chống trượt cho sàn ướt sau máy pha cà phê: $85
- Hai áo có logo thêu của quán (quán bắt buộc mặc): $70
- Phí gia hạn RSA: $40
- Tiền giặt: anh giặt riêng áo có logo và tạp dề mỗi tuần một mẻ trong 44 tuần, $1 mỗi mẻ: $44

Tổng khấu trừ của anh là $239. Vì tổng các khoản khấu trừ công việc từ $300 trở xuống, anh không cần hóa đơn cho năm 2025-26, nhưng vẫn phải cho thấy đã tính từng khoản thế nào. Dù vậy anh vẫn giữ hóa đơn, và đó là lựa chọn an toàn hơn.

Arjun không được cộng thêm chiếc quần đen ($60), RSA đầu tiên từ năm trước, hay các bữa ăn nhân viên anh đã trả tiền. Nếu thu nhập chịu thuế của anh nằm trong khung từ $18,201 đến $45,000, khoản khấu trừ $239 giúp giảm khoảng $38 tiền thuế thu nhập (16% cho năm 2025-26).

## Chứng từ cần giữ

- Hóa đơn mua giày, đồng phục và phí gia hạn chứng chỉ. Ảnh chụp rõ nét bằng điện thoại là được.
- Bản sao quy định về đồng phục, hoặc ảnh chụp đồng phục có logo.
- Một cuốn sổ ghi việc giặt trong vài tuần, cho thấy bạn giặt bao nhiêu mẻ.
- Giữ mọi thứ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Với năm 2025-26, nếu tổng các khoản khấu trừ công việc trên $300, bạn cần chứng từ bằng văn bản cho tất cả. Riêng tiền giặt, bạn cần chứng từ bằng văn bản như một cuốn sổ ghi khi tiền giặt khai trên $150 và tổng các khoản khấu trừ công việc trên $300.

Từ năm 2026-27, người cư trú về thuế có thu nhập từ lương sẽ được hưởng khoản khấu trừ chuẩn tối đa $1,000 thay cho các mức $300 và $150. Nếu bạn kê khai chi phí công việc thực tế, khoản khấu trừ chuẩn bị giảm đúng bằng số đó.

## Hai quán, một hồ sơ

Nhiều du học sinh làm ở hai quán. Mỗi quán là một chủ lao động riêng với bảng kê thu nhập riêng, và cả hai đều nằm trong một hồ sơ thuế. Chỉ đăng ký ngưỡng miễn thuế với một chủ lao động, thường là nơi trả cho bạn nhiều nhất. Khoản khấu trừ từ cả hai công việc đều khai trên cùng một hồ sơ.

## Danh sách kiểm tra trước khi nộp

- Đồng phục của bạn có nét riêng của quán và có bắt buộc không? Nếu chỉ là quần áo trơn, đừng khai.
- Năm nay bạn có gia hạn RSA trong lúc đang làm không? Hãy tìm lại hóa đơn.
- Bạn có mua giày chống trượt hoặc giày bảo hộ cho sàn ướt hay sàn nóng không?
- Đếm số mẻ giặt trong năm.
- Cộng tổng tiền tip tiền mặt và khai số đó.

Nếu bạn muốn có người kiểm tra các khoản khấu trừ ngành nhà hàng trước khi nộp, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Quán cà phê bắt tôi mặc toàn đồ đen. Tôi có được khấu trừ không?', a: 'Không. Quần áo đen trơn là quần áo thông thường, kể cả khi chủ lao động yêu cầu. Đồng phục phải mang nét riêng của doanh nghiệp, như áo có logo.' },
      { q: 'Tôi có được khấu trừ RSA không?', a: 'Bạn được khấu trừ phí gia hạn trong lúc đang làm công việc đó. RSA đầu tiên mà bạn lấy để được nhận vào làm thì không được khấu trừ.' },
      { q: 'Tiền tip tiền mặt có phải chịu thuế không?', a: 'Có. Tiền tip là thu nhập chịu thuế. Tip trả qua bảng lương đã có trong bảng kê thu nhập, còn tip tiền mặt thì bạn phải tự cộng vào.' },
    ],
  },
  'food-delivery-tax-deductions-students': {
    title: 'Khấu trừ thuế cho người giao đồ ăn là du học sinh',
    description: 'Giao đồ ăn bằng ABN trong lúc đi học? Người giao hàng được khấu trừ gì: phí nền tảng, điện thoại, chi phí xe đạp hay ô tô, đồ nghề. Và những gì vẫn là chi phí riêng.',
    answer: 'Người giao đồ ăn làm bằng ABN được khấu trừ phần dùng cho công việc của xe, điện thoại và dữ liệu di động, phí nền tảng, và đồ nghề như túi giữ nhiệt hay giá đỡ điện thoại. Tiền phạt, bữa ăn và phần dùng riêng của mọi chi phí thì không được khấu trừ.',
    body: `Các ứng dụng giao đồ ăn trả tiền cho người giao hàng như nhà thầu (contractor), nên phần lớn du học sinh giao đồ ăn đều làm bằng ABN. Không có đồng thuế nào bị trừ từ tiền ứng dụng trả cho bạn. Vì vậy các khoản khấu trừ thật sự có tác dụng: chúng làm giảm phần lợi nhuận dùng để tính thuế.

Bài này nói về những gì bạn được khấu trừ khi giao đồ ăn hoặc giao hàng, bằng xe đạp, xe máy hay ô tô. Nếu bạn cũng chở khách, hãy đọc thêm hướng dẫn về chạy xe chở khách của chúng tôi, vì quy định GST khác hẳn.

## Thu nhập giao hàng bị tính thuế thế nào

Thu nhập giao hàng được khai trong hồ sơ thuế là thu nhập kinh doanh, cùng với các chi phí kinh doanh của bạn. ATO cho biết thu nhập từ việc cung cấp dịch vụ qua nền tảng số phải được khai, kể cả khi đó chỉ là thu nhập phụ bên cạnh một công việc làm thuê. Hãy giữ các bảng kê mà nền tảng gửi cho bạn, vì chúng cho thấy thu nhập của bạn.

Nếu chỉ giao đồ ăn và giao hàng, nhìn chung bạn chỉ cần đăng ký GST khi doanh thu đạt $75,000. Nếu bạn chở khách cho một ứng dụng gọi xe (ride-sourcing), bạn phải đăng ký GST trước chuyến đầu tiên, dù bạn kiếm được bao nhiêu.

## Những gì bạn được khấu trừ

Mọi khoản khấu trừ đều cần ba điều: bạn tự trả tiền, không ai hoàn lại, và chi phí liên quan đến việc tạo ra thu nhập giao hàng. Bạn cũng cần có chứng từ.

- **Phí nền tảng và tiền hoa hồng.** ATO cho biết phí dịch vụ hoặc hoa hồng mà nền tảng số thu có thể được khấu trừ 100%.
- **Phần dùng cho công việc của điện thoại và dữ liệu di động.** Ứng dụng, bản đồ và tin nhắn cho khách đều chạy trên điện thoại của bạn. Hãy khấu trừ theo tỷ lệ dùng cho công việc, tính theo một cách hợp lý, như một bản ghi việc sử dụng trong bốn tuần.
- **Đồ nghề cho công việc.** Túi giao hàng giữ nhiệt, giá đỡ điện thoại, sạc, đèn. Món đồ có giá từ $300 trở xuống được khấu trừ toàn bộ trong năm mua. Món trên $300 được khấu trừ dần theo số năm sử dụng (effective life).
- **Chi phí ô tô, nếu bạn giao hàng bằng ô tô.** Bạn có thể dùng cách tính theo cent mỗi km (88 cent mỗi km cho năm 2025-26, tối đa 5,000 km công việc cho mỗi xe) hoặc sổ ghi hành trình (logbook). Chỉ số km giao hàng mới được tính.
- **Chi phí xe máy, xe tay ga hay xe đạp.** Cách tính theo cent mỗi km chỉ dành cho ô tô. Với xe máy, ATO cho biết bạn khấu trừ chi phí thực tế theo tỷ lệ dùng cho công việc. Xe đạp hay xe đạp điện cũng theo cùng nguyên tắc: chi phí vận hành và sửa chữa thực tế, theo phần dùng cho công việc.
- **Tiền đỗ xe trong lúc làm việc**, ví dụ khi chờ lấy đơn.
- **Sửa chữa và bảo hiểm** cho thiết bị làm việc, theo phần dùng cho công việc.

## Những gì bạn không được khấu trừ

- **Tiền phạt**, kể cả phạt đỗ xe trong lúc đi giao hàng.
- **Bữa ăn của bạn**, kể cả khi bạn ăn giữa các đơn.
- **Phần dùng riêng của bất cứ thứ gì**: chuyến đi chơi cuối tuần, cuộc gọi riêng, dữ liệu dùng cho việc cá nhân.
- **Quần áo thông thường.** Một chiếc áo khoác bạn cũng mặc ngoài giờ làm là quần áo thông thường.
- **Con số đoán chừng.** Nếu bạn không cho thấy được đã tính tỷ lệ thế nào, khoản khấu trừ có thể bị từ chối.

## Ví dụ cụ thể

Linh là người không cư trú về thuế và giao đồ ăn bằng xe đạp điện với ABN. Trong năm 2025-26, cô đã trả:

- Một túi giao hàng giữ nhiệt: $45
- Giá đỡ điện thoại và sạc dự phòng: $60
- Đèn trước và đèn sau: $50
- Gói cước điện thoại: $40 mỗi tháng, $480 cả năm. Bản ghi bốn tuần cho thấy 60% dùng cho giao hàng, nên cô khấu trừ $288.
- Sửa xe đạp điện và thay lốp mới: $240. Nhật ký chạy xe cho thấy 80% dùng cho giao hàng, nên cô khấu trừ $192.

Tổng cộng là $635. Mỗi món nhỏ đều dưới $300, nên cô khấu trừ toàn bộ từng món ngay trong năm nay. Bản thân chiếc xe đạp điện có giá trên $300, nên chi phí của nó được chia ra qua nhiều năm theo phần dùng cho công việc.

Là người không cư trú về thuế, Linh đóng thuế 30% ngay từ đồng đầu tiên (năm 2025-26), nên $635 khấu trừ giúp giảm khoảng $190 tiền thuế thu nhập.

## Chứng từ cần giữ

- Bảng kê của nền tảng cho thấy thu nhập và các khoản phí.
- Hóa đơn cho mọi món bạn mua. Ảnh chụp rõ nét là được.
- Một bản ghi việc dùng điện thoại trong bốn tuần để chứng minh tỷ lệ dùng cho công việc.
- Với ô tô: một bản ghi cách bạn tính số km giao hàng (cách tính theo cent mỗi km), hoặc sổ ghi hành trình 12 tuần (cách tính theo logbook). Một cuốn logbook có thể dùng trong 5 năm.
- Với xe đạp hay xe máy: một bản ghi phần dùng để giao hàng so với tổng mức sử dụng, và hóa đơn cho mọi chi phí.
- Giữ mọi thứ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Chỉ có sao kê ngân hàng thường là chưa đủ. ATO muốn có hóa đơn từ bên bán, hoặc chứng từ khác cho thấy bạn đã mua gì.

## Khoản khấu trừ chuẩn $1,000 có dành cho người giao hàng không?

Từ năm 2026-27, ATO sẽ áp dụng khoản khấu trừ chuẩn tối đa $1,000 cho người cư trú về thuế có thu nhập từ lao động như tiền lương. Khoản này không áp dụng nếu thu nhập duy nhất của bạn là thu nhập kinh doanh, như thu nhập giao hàng bằng ABN. Người giao hàng bằng ABN vẫn tiếp tục khấu trừ chi phí thực tế kèm chứng từ.

## Danh sách kiểm tra trước khi nộp

- Tải bảng kê cả năm từ mỗi ứng dụng giao hàng.
- Cộng tổng phí nền tảng.
- Tìm hóa đơn túi giao hàng, giá đỡ, đèn và tiền sửa xe.
- Tính tỷ lệ dùng điện thoại từ một bản ghi thật, không phải đoán.
- Nếu bạn lái ô tô, chọn giữa cách tính theo cent mỗi km và logbook.
- Nếu có lúc nào bạn chở khách, hãy kiểm tra việc đăng ký GST.

Hồ sơ của người giao hàng có nhiều phần hơn hồ sơ chỉ có tiền lương. Nếu bạn muốn được giúp, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tôi có dùng cách tính theo cent mỗi km cho xe tay ga được không?', a: 'Không. Cách tính này chỉ dành cho ô tô. Với xe máy hay xe tay ga, bạn khấu trừ chi phí thực tế theo tỷ lệ dùng cho công việc, kèm hóa đơn và bản ghi phần dùng cho công việc.' },
      { q: 'Tôi có được khấu trừ toàn bộ hóa đơn điện thoại không?', a: 'Chỉ phần dùng cho công việc. Nếu bạn cũng dùng điện thoại cho việc riêng, hãy tính tỷ lệ dùng để giao hàng từ một bản ghi thật và khấu trừ phần đó.' },
      { q: 'Giao đồ ăn có phải đăng ký GST không?', a: 'Nhìn chung chỉ khi doanh thu của bạn đạt $75,000. Chở khách cho một ứng dụng gọi xe thì khác: bạn phải đăng ký GST trước chuyến đầu tiên.' },
    ],
  },
  'retail-tax-deductions-students': {
    title: 'Khấu trừ thuế ngành bán lẻ và siêu thị cho du học sinh',
    description: 'Làm cửa hàng hay siêu thị khi có visa du học? Nhân viên bán lẻ được khấu trừ gì khi khai thuế, cách xét đồng phục, và vì sao điện thoại và giày thường không được khấu trừ.',
    answer: 'Nhân viên bán lẻ và siêu thị được khấu trừ đồng phục bắt buộc có logo cùng tiền giặt, đồng phục đã đăng ký, khóa học gắn với công việc hiện tại và phí công đoàn. Quần áo trơn, chăm sóc ngoại hình, điện thoại chỉ dùng để nhắn về ca làm và đi lại đến chỗ làm thì không được khấu trừ.',
    body: `Bán lẻ là công việc được nhiều du học sinh chọn. Siêu thị, cửa hàng quần áo và các quầy trong trung tâm mua sắm có ca casual vào buổi tối và cuối tuần. Danh sách khấu trừ cho ngành bán lẻ ngắn, nên bạn cần biết chính xác cái gì nằm trong đó và cái gì không.

## Bắt đầu với ba điều kiện

ATO xét mọi chi phí công việc theo ba quy tắc:

- Bạn tự bỏ tiền ra và không được hoàn lại.
- Chi phí liên quan trực tiếp đến việc tạo ra thu nhập ở công việc này.
- Bạn có chứng từ để chứng minh.

Nếu một thứ được dùng cho cả công việc lẫn đời sống riêng, chỉ phần dùng cho công việc mới được tính.

## Những gì bạn được khấu trừ

- **Đồng phục bắt buộc.** ATO cho biết đây là quần áo mà nơi làm việc yêu cầu rõ ràng, theo một quy định được áp dụng nghiêm ngặt và nhất quán, và mang nét riêng của chủ lao động. Một chiếc áo có logo thêu của cửa hàng là ví dụ của ATO. Bạn được khấu trừ tiền mua, thuê, sửa hoặc giặt.
- **Đồng phục không bắt buộc đã được đăng ký.** Một số đồng phục có tên trong danh sách Register of Approved Occupational Clothing của ATO. Chủ lao động có thể cho bạn biết đồng phục của bạn có trong đó không.
- **Tiền giặt đồng phục.** $1 mỗi mẻ nếu bạn chỉ giặt quần áo làm việc, hoặc 50 cent mỗi mẻ nếu giặt chung với đồ cá nhân.
- **Khóa học gắn với công việc hiện tại.** Ví dụ của ATO là một khóa chăm sóc khách hàng cho nhân viên bán lẻ.
- **Phí công đoàn và phí hội nghề nghiệp.**
- **Đi lại giữa hai công việc trong cùng một ngày**, ví dụ từ ca ở siêu thị đi thẳng đến công việc thứ hai làm phục vụ bàn. Đi lại giữa hai cửa hàng của cùng một chủ lao động trong cùng một ngày cũng được tính.

## Những gì bạn không được khấu trừ

- **Quần áo thông thường**, kể cả khi chủ lao động yêu cầu và bạn chỉ mặc khi đi làm. ATO cũng cho biết bạn không được khấu trừ quần áo do chính cửa hàng nơi bạn làm bán ra, trừ khi đó là đồng phục thật sự.
- **Giày thông thường.** Giày thể thao đen hay giày đi làm không thuộc đồng phục là quần áo thông thường.
- **Chăm sóc ngoại hình.** Cắt tóc, mỹ phẩm và sản phẩm chăm sóc da là chi phí riêng, kể cả khi chủ lao động yêu cầu hay cửa hàng có bán.
- **Điện thoại, nếu bạn chỉ dùng cho công việc để nhắn tin về ca làm.** ATO cho biết bạn không được khấu trừ chi phí điện thoại hay internet khi việc dùng cho công việc duy nhất là trao đổi với quản lý về ca làm hoặc xem phiếu lương.
- **Đi lại từ nhà đến chỗ làm**, và tiền đỗ xe ở nơi làm việc thường ngày.
- **Phương tiện công cộng, taxi hay xe công nghệ** giữa nhà và chỗ làm, kể cả cho ca tối muộn.
- **Đồ ăn thức uống trong giờ làm bình thường.**
- **Tiêm chủng**, kể cả khi công việc yêu cầu.

## Ngoại lệ về bữa ăn khi làm thêm giờ

Có một trường hợp hẹp mà bữa ăn được khấu trừ. Nếu bạn nhận phụ cấp ăn khi làm thêm giờ (overtime meal allowance) theo thỏa thuận lao động (award hoặc agreement), và phụ cấp này đã được tính vào thu nhập của bạn, bạn được khấu trừ tiền một bữa ăn bạn mua và ăn trong lúc làm thêm giờ. Hãy xem phiếu lương: nếu không thấy phụ cấp ăn khi làm thêm giờ, ngoại lệ này không áp dụng cho bạn.

## Ví dụ cụ thể

Sofia đang học một khóa diploma kéo dài 18 tháng, nên cô có thể là người cư trú về thuế ở Úc. Cô làm ở một siêu thị và một cửa hàng quần áo. Trong năm 2025-26, cô đã trả:

- Hai áo polo có logo siêu thị, bắt buộc theo quy định đồng phục: $50
- Tiền giặt: mỗi tuần một mẻ chỉ có quần áo làm việc trong 40 tuần, $1 mỗi mẻ: $40
- Một khóa chăm sóc khách hàng ngắn hạn do quản lý gợi ý, cô tự trả tiền: $120

Tổng cộng là $210. Cô không được khấu trừ chiếc quần jean đen mà cửa hàng quần áo yêu cầu nhân viên mặc, hay chiếc quần jean cô mua ở cửa hàng với giá giảm cho nhân viên. Cô cũng không được khấu trừ gói cước điện thoại, vì cô chỉ dùng nó để đổi ca.

Nếu thu nhập chịu thuế của Sofia nằm trong khung từ $18,201 đến $45,000, khoản khấu trừ $210 giúp giảm khoảng $34 tiền thuế thu nhập (16% cho năm 2025-26). Nếu thu nhập chịu thuế của cô dưới $18,200, khoản khấu trừ thường không thay đổi gì, vì không có tiền thuế thu nhập nào để giảm.

## Chứng từ cần giữ

- Hóa đơn mua đồng phục và khóa học. Ảnh chụp mỗi hóa đơn bằng điện thoại là được.
- Ảnh chụp đồng phục có logo, hoặc bản sao quy định về đồng phục.
- Một cuốn sổ ghi việc giặt ngắn gọn, cho thấy mỗi tuần bạn giặt bao nhiêu mẻ.
- Giữ chứng từ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Với năm 2025-26, nếu tổng các khoản khấu trừ công việc trên $300, bạn cần chứng từ bằng văn bản cho toàn bộ số tiền. Chỉ có sao kê ngân hàng thường là chưa đủ, vì nó không cho thấy bạn đã mua gì.

Từ năm 2026-27, người cư trú về thuế có thu nhập từ lương sẽ được hưởng khoản khấu trừ chuẩn tối đa $1,000 mà không cần hóa đơn. Nếu bạn kê khai chi phí công việc thực tế, khoản khấu trừ chuẩn bị giảm đúng bằng số đó.

## Những câu du học sinh làm bán lẻ hay hỏi

Du học sinh thường hỏi về giá giảm cho nhân viên. Tiền được giảm khi bạn mua đồ cho chính mình không phải là khoản khấu trừ, và đồ dùng riêng thì không được khấu trừ, dù mua với giá nào.

Du học sinh cũng hay hỏi về chuyện làm hai việc. Mỗi chủ lao động đưa cho bạn một bảng kê thu nhập riêng. Cả hai nằm trong một hồ sơ thuế, cùng với các khoản khấu trừ từ cả hai công việc. Chỉ đăng ký ngưỡng miễn thuế với một chủ lao động, thường là nơi trả cho bạn nhiều nhất.

## Danh sách kiểm tra trước khi nộp

- Đồng phục của bạn có nét riêng và có bắt buộc theo quy định không? Nếu không, đừng khai.
- Đếm số mẻ giặt trong năm.
- Bạn có trả tiền cho một khóa học gắn với công việc hiện tại không?
- Bạn có lái xe đi thẳng giữa hai công việc trong cùng một ngày không? Ghi lại ngày và số km.
- Đừng khai chăm sóc ngoại hình, quần áo trơn và chi phí điện thoại chỉ dùng để nhắn về ca làm.

Nếu bạn muốn các khoản khấu trừ ngành bán lẻ được kiểm tra trước khi nộp, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Cửa hàng bắt tôi mặc quần áo của chính cửa hàng. Tôi có được khấu trừ không?', a: 'Thường là không. ATO cho biết quần áo do chính cửa hàng nơi bạn làm bán ra là quần áo thông thường, kể cả khi bạn chỉ mặc lúc đi làm. Chỉ đồng phục thật sự, mang nét riêng và bắt buộc theo quy định, mới được khấu trừ.' },
      { q: 'Quản lý nhắn lịch làm qua điện thoại. Tôi có được khấu trừ điện thoại không?', a: 'Không. ATO cho biết chi phí điện thoại không được khấu trừ khi việc dùng cho công việc duy nhất là trao đổi với quản lý về ca làm hoặc xem phiếu lương.' },
      { q: 'Tôi có được khấu trừ tiền đỗ xe ở trung tâm mua sắm không?', a: 'Không, nếu đó là nơi làm việc thường ngày của bạn. Tiền đỗ xe ở đó là chi phí riêng để đi đến chỗ làm.' },
    ],
  },
  'cleaner-tax-deductions-students': {
    title: 'Khấu trừ thuế cho du học sinh làm dọn dẹp',
    description: 'Dọn nhà hay dọn văn phòng trong lúc đi học? Người làm dọn dẹp được khấu trừ gì: dụng cụ, hóa chất, đồ bảo hộ và đi lại giữa các chỗ làm. Kèm theo các chứng từ bạn cần giữ.',
    answer: 'Người làm dọn dẹp được khấu trừ dụng cụ và sản phẩm tự mua, đồ bảo hộ như găng tay và khẩu trang, quần áo bảo hộ và đồng phục bắt buộc, và chi phí lái ô tô đi thẳng giữa hai chỗ làm trong cùng một ngày. Chuyến đi từ nhà đến chỗ làm đầu tiên thì không được khấu trừ.',
    body: `Dọn dẹp là công việc linh hoạt, nên nhiều du học sinh chọn làm. Có người dọn văn phòng buổi tối cho một công ty. Có người dọn nhà riêng bằng ABN. Cả hai nhóm đều có những khoản khấu trừ thật sự, và khoản lớn nhất lại thường là khoản du học sinh hay quên: đi lại giữa các chỗ làm.

## Nhân viên hay làm bằng ABN?

Nếu một công ty dọn dẹp xếp lịch cho bạn và trả lương, bạn là nhân viên. Thuế được trừ từ lương và chủ lao động đóng super cho bạn. Nếu bạn tự tìm khách, tự đặt giá và tự gửi hóa đơn cho khách, có thể bạn đang kinh doanh bằng ABN. Không có thuế nào bị trừ trước, và thu nhập cùng chi phí kinh doanh được khai trong hồ sơ thuế của bạn.

Những món được khấu trừ ở hai trường hợp khá giống nhau. Cách khai trong hồ sơ thì khác, nên hãy cho người làm hồ sơ thuế biết bạn đã làm theo hình thức nào.

## Những gì bạn được khấu trừ

- **Dụng cụ bạn tự mua.** Cây lau nhà, xô, khăn lau, máy hút bụi hay máy làm sạch bằng hơi nước. Bạn cũng được khấu trừ tiền sửa chữa và bảo hiểm cho chúng.
- **Sản phẩm tẩy rửa và hóa chất** bạn tự trả tiền.
- **Đồ bảo hộ cá nhân (PPE)**, như găng tay và khẩu trang.
- **Quần áo và giày bảo hộ.** Ví dụ của ATO cho người làm dọn dẹp là tạp dề và giày chống trượt.
- **Đồng phục bắt buộc**, như áo có logo thêu của chủ lao động, khi quy định về đồng phục được áp dụng nghiêm ngặt.
- **Tiền giặt quần áo được khấu trừ.** $1 mỗi mẻ chỉ có quần áo làm việc, hoặc 50 cent mỗi mẻ nếu giặt chung.
- **Lái ô tô giữa các chỗ làm trong cùng một ngày.** Từ một nhà bạn dọn đi thẳng đến nhà tiếp theo, hoặc từ chỗ dọn dẹp đi thẳng đến công việc thứ hai.
- **Phần dùng cho công việc của điện thoại**, nếu bạn có bản ghi cho thấy việc dùng cho công việc.
- **Phí công đoàn.**

## Quy tắc $300 cho dụng cụ

Món đồ có giá từ $300 trở xuống, và không thuộc một bộ có tổng giá trên $300, được khấu trừ toàn bộ trong năm mua. Món đồ trên $300 được khấu trừ dần qua nhiều năm, theo mức giảm giá trị của nó. Một máy hút bụi công nghiệp giá $450 vẫn được khấu trừ: chỉ là được chia ra qua nhiều năm.

## Những gì bạn không được khấu trừ

- **Đi lại từ nhà đến chỗ làm**, và về nhà cuối ngày. Đây là chi phí riêng, kể cả khi bạn bắt đầu sớm hay xong việc muộn.
- **Quần áo thông thường**, như quần đen, áo polo hay giày thể thao, kể cả khi chủ lao động yêu cầu.
- **Sản phẩm hoặc dụng cụ do khách hay chủ lao động cung cấp.** Nếu nhà khách có sẵn hóa chất, bạn không có chi phí nào để khấu trừ.
- **Bất cứ thứ gì đã được hoàn tiền.**
- **Đồ ăn thức uống trong ca làm.**
- **Tiền phạt.**

Có một ngoại lệ hẹp cho việc đi từ nhà đến chỗ làm khi bạn phải mang theo thiết bị cồng kềnh. Phải đủ cả ba điều kiện: thiết bị là thiết yếu cho công việc, cồng kềnh đến mức chỉ chở được bằng xe, và nơi làm việc không có chỗ cất giữ an toàn. Với phần lớn người làm dọn dẹp, ngoại lệ này không áp dụng.

## Ví dụ cụ thể

Ravi đang học năm thứ hai của một khóa cử nhân ba năm, nên anh có thể là người cư trú về thuế ở Úc. Anh dọn nhà riêng vào thứ Bảy, ba nhà liên tiếp, và lái xe của mình. Trong năm 2025-26:

- Anh lái 14 km giữa nhà thứ nhất và nhà thứ hai, 10 km giữa nhà thứ hai và nhà thứ ba, tức 24 km đi lại cho công việc mỗi thứ Bảy. Qua 40 ngày thứ Bảy là 960 km. Với mức 88 cent mỗi km (năm 2025-26), anh khấu trừ $844.80.
- Anh mua găng tay, khăn lau và sản phẩm tẩy rửa hết $180.
- Anh mua một máy hút bụi không dây giá $260.

Tổng khấu trừ của anh là $1,284.80. Đoạn lái từ nhà đến nhà đầu tiên và từ nhà cuối cùng về nhà không được tính.

Nếu thu nhập chịu thuế của Ravi nằm trong khung từ $18,201 đến $45,000, khoản khấu trừ này giúp giảm khoảng $205 tiền thuế thu nhập (16% cho năm 2025-26).

## Chứng từ cần giữ

- **Với việc đi lại:** ghi lại từng ngày, các địa chỉ và số km giữa các chỗ làm. Cách tính theo cent mỗi km không cần hóa đơn, nhưng bạn phải cho thấy đã tính số km thế nào. Tối đa là 5,000 km công việc cho mỗi xe mỗi năm.
- **Với đồ đã mua:** hóa đơn cho mỗi lần mua. Ảnh chụp rõ nét bằng điện thoại là được.
- **Với điện thoại:** bản ghi việc dùng cho công việc trong một khoảng thời gian điển hình.
- **Với tiền giặt:** một cuốn sổ đơn giản ghi số mẻ giặt.
- Giữ mọi thứ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Cách tính theo cent mỗi km chỉ dành cho ô tô. Cách này không áp dụng cho xe máy. Nếu bạn đi xe máy giữa các chỗ làm, bạn khấu trừ chi phí thực tế theo phần dùng cho công việc, kèm hóa đơn.

Với năm 2025-26, khi tổng các khoản khấu trừ công việc (không tính chi phí ô tô) trên $300, bạn cần chứng từ bằng văn bản cho tất cả. Chỉ có sao kê ngân hàng thường là chưa đủ.

## Thay đổi từ năm 2026-27

Từ năm 2026-27, người cư trú về thuế có thu nhập từ lương được hưởng khoản khấu trừ chuẩn tối đa $1,000. Nếu bạn kê khai chi phí thực tế, kể cả chi phí lái ô tô giữa các chỗ làm, khoản khấu trừ chuẩn bị giảm đúng bằng số đó. Người làm dọn dẹp có khoản đi lại lớn thường sẽ kê khai chi phí thực tế kèm đầy đủ chứng từ. Khoản khấu trừ chuẩn không áp dụng khi bạn chỉ có thu nhập kinh doanh bằng ABN.

## Danh sách kiểm tra trước khi nộp

- Liệt kê mọi ngày bạn lái xe giữa hai chỗ làm, kèm số km.
- Tìm hóa đơn dụng cụ và sản phẩm bạn đã mua.
- Tách riêng những món khách cung cấp với những món bạn tự trả tiền.
- Kiểm tra xem áo của bạn là đồng phục thật sự có logo hay chỉ là quần áo trơn.
- Cho người làm hồ sơ biết bạn làm với tư cách nhân viên, bằng ABN, hay cả hai.

Nếu bạn muốn được giúp tổng hợp cả năm làm dọn dẹp, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tôi có được khấu trừ đoạn lái đến chỗ dọn dẹp đầu tiên không?', a: 'Không. Đi lại từ nhà đến chỗ làm là chi phí riêng. Đi thẳng giữa hai chỗ làm trong cùng một ngày thì được khấu trừ.' },
      { q: 'Tôi mua máy hút bụi giá $420. Tôi có được khấu trừ không?', a: 'Có, nhưng không phải toàn bộ trong một năm. Món đồ trên $300 được khấu trừ dần qua nhiều năm theo mức giảm giá trị.' },
      { q: 'Tôi có được khấu trừ hóa chất mà khách để sẵn ở nhà không?', a: 'Không. Bạn chỉ được khấu trừ những chi phí bạn tự trả và không được hoàn lại.' },
    ],
  },
  'aged-care-disability-tax-deductions-students': {
    title: 'Khấu trừ thuế ngành chăm sóc người già và người khuyết tật',
    description: 'Làm nhân viên hỗ trợ hay chăm sóc khi có visa du học? Người làm chăm sóc được khấu trừ gì: đi lại giữa khách hàng, giày chống trượt, PPE và việc học. Và những gì là chi phí riêng.',
    answer: 'Người làm chăm sóc người già và hỗ trợ người khuyết tật được khấu trừ chi phí lái ô tô giữa các khách hàng trong cùng một ngày, quần áo bảo hộ như giày chống trượt, PPE tự mua, đồng phục bắt buộc và việc học gắn với công việc hiện tại. Tiêm chủng, đi lại từ nhà và chi phí đi chơi cùng khách hàng thì không được khấu trừ.',
    body: `Nhiều du học sinh làm trong ngành chăm sóc người già và hỗ trợ người khuyết tật, thường là trong lúc học điều dưỡng, công tác xã hội hay ngành y tế. Công việc có đi lại, đồ bảo hộ và đào tạo, nên có nhiều khoản có thể khấu trừ hơn phần lớn các việc casual khác. Cũng có những giới hạn rất rõ ràng.

## Ba quy tắc

ATO áp dụng ba điều kiện cho mọi khoản khấu trừ:

- Bạn tự trả tiền và không ai hoàn lại cho bạn.
- Chi phí liên quan trực tiếp đến việc tạo ra thu nhập.
- Bạn có chứng từ chứng minh.

Với món đồ dùng cho cả công việc lẫn việc riêng, chỉ phần dùng cho công việc mới được khấu trừ.

## Những gì bạn được khấu trừ

- **Lái ô tô giữa các khách hàng trong cùng một ngày.** Ví dụ của ATO cho người làm chăm sóc gồm lái thẳng giữa nhà các khách hàng, và đưa khách hàng đi khám hay đi hẹn. Lái thẳng từ một công việc đến công việc thứ hai, như từ việc chăm sóc cá nhân sang việc hỗ trợ người khuyết tật, cũng được tính.
- **Đi từ nhà thẳng đến một nơi làm việc khác**, như trung tâm đào tạo cho một khóa học của công việc.
- **Quần áo bảo hộ.** Ví dụ của ATO là giày chống trượt của điều dưỡng. Bạn được khấu trừ tiền mua, sửa hoặc giặt.
- **Đồng phục bắt buộc** mang nét riêng, như áo có logo của chủ lao động, theo một quy định được áp dụng nghiêm ngặt.
- **PPE bạn tự mua**, như găng tay, khẩu trang, nước rửa tay hay bình xịt diệt khuẩn.
- **Tiền giặt quần áo được khấu trừ**, $1 mỗi mẻ chỉ có quần áo làm việc hoặc 50 cent mỗi mẻ nếu giặt chung.
- **Việc học gắn với công việc hiện tại.** Ví dụ của ATO là chứng chỉ Certificate IV in Ageing Support cho người làm chăm sóc người già.
- **Phần dùng cho công việc của điện thoại**, kèm bản ghi việc dùng cho công việc.
- **Phí công đoàn.**

## Những gì bạn không được khấu trừ

- **Đi từ nhà đến khách hàng đầu tiên và từ khách hàng cuối cùng về nhà.** ATO cho biết những chuyến đi bình thường giữa nhà và chỗ làm là chi phí riêng, kể cả với ca sớm, ca muộn hay ca cuối tuần.
- **Quần áo thông thường**, như quần jean, áo thun và giày thể thao, kể cả khi chủ lao động yêu cầu.
- **Tiêm phòng cúm và các loại tiêm chủng khác.** ATO cho biết đây là chi phí riêng, kể cả khi công việc bắt buộc.
- **Chi phí của khách hàng trong buổi đi chơi**, như cà phê, bữa trưa hay vé xem phim của họ, và cả của bạn.
- **Đồ ăn thức uống trong giờ làm bình thường.**
- **Phí phòng tập thể dục**, dù công việc nặng về thể chất.
- **Tiền đỗ xe ở nơi làm việc thường ngày**, và phương tiện công cộng giữa nhà và chỗ làm.
- **Bất cứ thứ gì chủ lao động đã trả hoặc đã hoàn tiền**, như phụ cấp theo km đã bù đủ toàn bộ chi phí của bạn.

## Lưu ý về việc học cho sinh viên điều dưỡng

Du học sinh thường hỏi khóa học chính của mình có được khấu trừ không. ATO cho biết việc học được khấu trừ khi nó duy trì hoặc nâng cao kỹ năng bạn cần ở công việc hiện tại, hoặc nhiều khả năng làm tăng thu nhập từ công việc đó. Việc học không được khấu trừ khi chỉ liên quan một cách chung chung, hoặc khi nó giúp bạn có được một công việc mới.

Một khóa ngắn hạn nâng cao kỹ năng của bạn với tư cách nhân viên hỗ trợ có nhiều khả năng đạt yêu cầu. Một tấm bằng chuẩn bị cho bạn bước vào một nghề mới, như Bachelor of Nursing trong lúc bạn đang làm trợ lý, thường thuộc nhóm thứ hai. Hãy hỏi trước khi khai học phí.

## Kiểm tra lý lịch tư pháp và các loại kiểm tra khác

Hướng dẫn của ATO cho người làm chăm sóc không nói rõ phí kiểm tra lý lịch tư pháp (police check) có được khấu trừ với nhân viên hay không. Đừng mặc định là được. Hãy hỏi trước khi khai. Với kiểm tra làm việc với trẻ em (working with children check), ATO có quy định riêng, được giải thích trong hướng dẫn của chúng tôi cho gia sư và nhân viên chăm sóc trẻ.

## Ví dụ cụ thể

Grace học thạc sĩ hai năm, nên cô có thể là người cư trú về thuế ở Úc. Cô làm cho một đơn vị chăm sóc tại nhà và lái xe của mình. Trong năm 2025-26:

- Cô lái xe giữa các khách hàng trong 120 ngày, trung bình 15 km mỗi ngày: 1,800 km. Chủ lao động không trả phụ cấp theo km. Với mức 88 cent mỗi km (năm 2025-26), cô khấu trừ $1,584.
- Giày chống trượt: $110
- Găng tay và nước rửa tay cô tự mua: $45

Tổng khấu trừ của cô là $1,739. Đoạn lái từ nhà đến khách hàng đầu tiên và về nhà không được tính, mũi tiêm phòng cúm cũng vậy.

Nếu thu nhập chịu thuế của Grace nằm trong khung từ $18,201 đến $45,000, khoản khấu trừ giúp giảm khoảng $278 tiền thuế thu nhập (16% cho năm 2025-26).

Hãy xem phiếu lương trước khi khai. Nếu chủ lao động hoàn lại chi phí đi lại thực tế, bạn không được khấu trừ, vì bạn không tự gánh chi phí đó. Nếu thay vào đó bạn nhận phụ cấp theo km, hãy cho người làm hồ sơ thuế biết để khoản này được xử lý đúng.

## Chứng từ cần giữ

- **Bản ghi đi lại:** ngày, địa chỉ khách hàng (hoặc mã khách hàng) và số km giữa các nơi. Với cách tính theo cent mỗi km, bạn không cần hóa đơn, nhưng phải cho thấy đã tính số km thế nào. Giới hạn là 5,000 km công việc cho mỗi xe mỗi năm.
- **Hóa đơn** mua giày, PPE, đồng phục và khóa học. Ảnh chụp rõ nét bằng điện thoại là được.
- **Giấy tờ ghi danh và học phí** cho bất kỳ khóa học nào bạn khai.
- Giữ chứng từ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Cách tính theo cent mỗi km chỉ dành cho ô tô, không dùng cho xe máy.

Từ năm 2026-27, người cư trú về thuế có thu nhập từ lương được hưởng khoản khấu trừ chuẩn tối đa $1,000. Kê khai chi phí thực tế, kể cả chi phí lái ô tô, sẽ làm khoản này giảm đúng bằng số đó. Nếu khoản đi lại của bạn lớn, bạn thường sẽ kê khai chi phí thực tế kèm đầy đủ chứng từ.

## Danh sách kiểm tra trước khi nộp

- Xuất danh sách ca làm và khách hàng của cả năm để dựng lại bản ghi đi lại.
- Xem phiếu lương có phụ cấp theo km không.
- Tìm hóa đơn giày, PPE và đồng phục.
- Xem xét kỹ khóa học bạn đã trả tiền có gắn với công việc hiện tại không.
- Đừng khai tiêm chủng, phí phòng tập và chi phí đi chơi cùng khách hàng.

Nếu bạn muốn được giúp với hồ sơ của người làm chăm sóc, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Chủ lao động bắt buộc tiêm phòng cúm. Tôi có được khấu trừ không?', a: 'Không. ATO cho biết tiêm phòng cúm và các loại tiêm chủng khác là chi phí riêng, kể cả khi công việc bắt buộc.' },
      { q: 'Tôi có được khấu trừ việc lái xe đưa khách hàng đi khám không?', a: 'Có, nếu bạn dùng xe của mình và không được hoàn tiền. ATO liệt kê việc đưa khách hàng đi khám hay đi hẹn là chi phí đi lại được khấu trừ.' },
      { q: 'Tôi có được khấu trừ học phí Bachelor of Nursing không?', a: 'Thường là không, vì một tấm bằng dẫn đến nghề mới là việc học để có công việc mới. Việc học nâng cao kỹ năng cho công việc hiện tại thì có thể được khấu trừ. Hãy hỏi trước khi khai.' },
    ],
  },
  'warehouse-labouring-tax-deductions-students': {
    title: 'Khấu trừ thuế cho du học sinh làm kho hàng và lao động phổ thông',
    description: 'Làm ca ở kho hàng, nhà máy hay qua công ty cung ứng lao động khi có visa du học? Được khấu trừ gì: giày mũi thép, áo phản quang, dụng cụ, gia hạn bằng và đi lại giữa các nơi làm.',
    answer: 'Người làm kho hàng và lao động phổ thông được khấu trừ đồ bảo hộ như giày mũi thép và găng tay, dụng cụ tự mua, phí gia hạn bằng đã có, và chi phí lái ô tô giữa hai nơi làm trong cùng một ngày. Bằng lái xe nâng đầu tiên và đường đi làm hằng ngày thì không được khấu trừ.',
    body: `Công việc ở kho hàng, nhà máy và qua công ty cung ứng lao động (labour hire) cho nhiều du học sinh những ca dài trong kỳ nghỉ và việc làm đều đặn vào cuối tuần trong học kỳ. Công ty cung ứng thường gửi bạn đến nhiều nơi khác nhau. Khoản khấu trừ đi theo công việc bạn làm, không theo tên của công ty cung ứng.

## Ba điều kiện

Mọi khoản khấu trừ phải đáp ứng ba quy tắc của ATO:

- Bạn tự trả tiền và không được hoàn lại.
- Chi phí liên quan trực tiếp đến việc tạo ra thu nhập.
- Bạn có chứng từ chứng minh.

Nếu một món đồ cũng được dùng cho việc riêng, chỉ khấu trừ phần dùng cho công việc.

## Những gì bạn được khấu trừ

- **Quần áo bảo hộ.** Ví dụ của ATO là giày mũi thép, găng tay và quần áo chống cháy. Bạn cũng được khấu trừ tiền giặt và sửa chúng.
- **Thiết bị an toàn**, như kính bảo hộ và mặt nạ thở.
- **Dụng cụ và thiết bị bạn mua cho công việc**, như máy nén khí, máy khoan hay búa, cùng tiền sửa chữa và bảo hiểm.
- **Gia hạn bằng hoặc chứng chỉ đặc biệt bạn đã có và cần cho công việc.** Ví dụ của ATO là gia hạn giấy phép lái xe hạng nặng trong lúc đang đi làm. Gia hạn bằng lái xe nâng cũng theo quy tắc này.
- **Lái ô tô đi thẳng giữa hai công việc trong cùng một ngày**, hoặc giữa hai nơi làm của cùng một chủ lao động trong cùng một ngày. Ví dụ của ATO là đi từ kho hàng đến một công trường.
- **Đi từ nhà thẳng đến một nơi làm việc khác**, như trung tâm đào tạo cho một khóa học của công việc.
- **Phí công đoàn.**
- **Tiền giặt quần áo bảo hộ**, $1 mỗi mẻ chỉ có quần áo làm việc, hoặc 50 cent mỗi mẻ nếu giặt chung.

## Những gì bạn không được khấu trừ

- **Bằng lái xe nâng đầu tiên.** ATO cho biết chi phí lấy lần đầu một bằng hay chứng chỉ đặc biệt mà bạn cần để có việc thì không được khấu trừ.
- **Bằng lái xe thông thường**, kể cả khi công việc yêu cầu.
- **Quần áo thông thường**, như quần jean hay giày thể thao, kể cả khi chủ lao động yêu cầu và bạn chỉ mặc khi đi làm.
- **Đi lại từ nhà đến chỗ làm**, kể cả với ca sớm, ca muộn hay ca cuối tuần. Nếu công ty cung ứng gửi bạn đến cùng một kho hàng trong nhiều tuần, chuyến đi đó vẫn là đường đi làm hằng ngày.
- **Tiền đỗ xe ở nơi làm việc thường ngày**, và phương tiện công cộng, taxi hay xe công nghệ giữa nhà và chỗ làm.
- **Đồ ăn thức uống trong giờ làm bình thường.**
- **Tiêm phòng cúm và các loại tiêm chủng khác.**
- **Đồ nghề do công ty cung ứng hay chủ lao động cấp**, như áo phản quang được phát.

## Hai quy tắc làm thay đổi khoản khấu trừ

**Quy tắc $300.** Món đồ có giá từ $300 trở xuống, và không thuộc một bộ có tổng giá trên $300, được khấu trừ toàn bộ trong năm mua. Món đồ trên $300 được khấu trừ dần qua nhiều năm. Mỗi đôi giày và mỗi đôi găng tay được xét riêng, nên những lần mua nhỏ trong năm cộng lại cũng đáng kể.

**Ngoại lệ dụng cụ cồng kềnh.** Đi lại từ nhà đến chỗ làm có thể được khấu trừ trong một trường hợp hẹp. Tất cả các điều sau phải đúng: dụng cụ là thiết yếu cho công việc, cồng kềnh đến mức chỉ chở thuận tiện bằng xe, và nơi làm việc không có chỗ cất giữ an toàn. Với phần lớn công việc ở kho hàng, ngoại lệ này không áp dụng.

## Ví dụ cụ thể

Tomás là người không cư trú về thuế, học một khóa tiếng Anh rồi tiếp đến một khóa diploma. Trong mùa hè, anh làm cho hai công ty cung ứng lao động. Trong năm 2025-26, anh đã trả:

- Giày mũi thép: $140
- Găng tay chống cắt, bốn đôi trong năm: $60
- Gia hạn bằng lái xe nâng trong lúc đang làm công việc đó: $150
- Trong 20 ngày, anh lái xe từ ca sáng ở một kho hàng đi thẳng đến ca chiều ở một nơi khác, mỗi lần 18 km: 360 km. Với mức 88 cent mỗi km (năm 2025-26), anh khấu trừ $316.80.

Tổng cộng là $666.80. Bằng lái xe nâng đầu tiên, mà anh mua trước lần được gửi đi làm đầu tiên, không nằm trong danh sách. Chiếc áo phản quang công ty cung ứng phát cho anh cũng vậy.

Là người không cư trú về thuế, Tomás đóng thuế 30% ngay từ đồng đầu tiên (năm 2025-26), nên khoản khấu trừ giúp giảm khoảng $200 tiền thuế thu nhập.

## Chứng từ cần giữ

- Hóa đơn mua giày, găng tay, dụng cụ và phí gia hạn bằng. Ảnh chụp rõ nét bằng điện thoại là được.
- Ghi chép đi lại cho mỗi ngày bạn di chuyển giữa các nơi làm: ngày, hai địa điểm và số km. Cách tính theo cent mỗi km không cần hóa đơn, nhưng bạn phải cho thấy đã tính số km thế nào.
- Giữ mọi thứ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Với năm 2025-26, nếu tổng các khoản khấu trừ công việc, không tính chi phí ô tô, trên $300, bạn cần chứng từ bằng văn bản cho tất cả. Chỉ có sao kê ngân hàng thường là chưa đủ.

## Nhiều công ty cung ứng, một hồ sơ

Mỗi công ty cung ứng là một chủ lao động riêng và đưa cho bạn một bảng kê thu nhập riêng. Tất cả đều nằm trong một hồ sơ. Hãy chờ đến khi từng bảng kê thu nhập hiện "Tax ready" rồi mới nộp, để không thiếu gì. Nếu bạn có thể là người cư trú về thuế, chỉ đăng ký ngưỡng miễn thuế với một chủ lao động.

## Danh sách kiểm tra trước khi nộp

Từ năm 2026-27, người cư trú về thuế có thu nhập từ lương được hưởng khoản khấu trừ chuẩn tối đa $1,000 mà không cần hóa đơn. Kê khai chi phí công việc thực tế sẽ làm khoản này giảm đúng bằng số đó. Người không cư trú về thuế không được dùng khoản này. Với hồ sơ năm 2025-26, hãy kiểm tra những điểm sau:

- Liệt kê mọi công ty cung ứng và kiểm tra từng bảng kê thu nhập đã "Tax ready".
- Tìm hóa đơn giày, găng tay và dụng cụ bạn đã trả tiền.
- Tách riêng bằng cấp lần đầu với các lần gia hạn.
- Liệt kê những ngày có đi lại giữa hai nơi làm.
- Đừng khai đồ nghề được phát và đường đi làm hằng ngày.

Nếu bạn làm cho nhiều công ty cung ứng và muốn được kiểm tra, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tôi có được khấu trừ bằng lái xe nâng không?', a: 'Không, nếu đó là bằng đầu tiên bạn cần để có việc. Phí gia hạn trong lúc bạn đang làm công việc cần bằng đó thì được khấu trừ.' },
      { q: 'Công ty cung ứng gửi tôi đến nhiều kho hàng khác nhau. Chi phí đi lại có được khấu trừ không?', a: 'Đi thẳng giữa hai nơi làm trong cùng một ngày thì được khấu trừ. Chuyến đi từ nhà đến nơi làm và về nhà nhìn chung là đường đi làm hằng ngày.' },
      { q: 'Đôi giày của tôi hỏng sau ba tháng. Tôi có được khấu trừ đôi thứ hai không?', a: 'Có, nếu đó là giày bảo hộ và bạn tự trả tiền. Mỗi lần mua là một khoản khấu trừ riêng.' },
    ],
  },
  'construction-tax-deductions-students': {
    title: 'Khấu trừ thuế ngành xây dựng cho du học sinh',
    description: 'Làm phụ hồ ở công trường trong lúc đi học? Người làm xây dựng được khấu trừ gì: PPE, dụng cụ, đồ chống nắng và phí gia hạn thẻ. Vì sao White Card đầu tiên không được khấu trừ.',
    answer: 'Người làm xây dựng được khấu trừ PPE như áo phản quang và giày mũi thép, dụng cụ tự mua, đồ chống nắng khi làm ngoài trời trong thời gian dài, và phí gia hạn thẻ và giấy phép làm việc. Thẻ hay giấy phép đầu tiên bạn cần để có việc, quần áo thông thường và đường lái xe đến công trường thì không được khấu trừ.',
    body: `Công trường xây dựng trả lương khá cho công việc chân tay, nên một số du học sinh nhận việc phụ hồ, thường trong kỳ nghỉ hè dài. Công việc tạo ra những chi phí thật: giày, áo phản quang, dụng cụ và kem chống nắng. Dưới đây là những gì bạn được khấu trừ, những gì không, và cách giữ chứng từ cho vững.

## Ba điều kiện

Mọi khoản khấu trừ phải đáp ứng ba quy tắc của ATO:

- Bạn tự trả tiền và không được hoàn lại.
- Chi phí liên quan trực tiếp đến việc tạo ra thu nhập.
- Bạn có chứng từ chứng minh.

Nếu một thứ cũng được dùng cho việc riêng, chỉ khấu trừ phần dùng cho công việc.

## Những gì bạn được khấu trừ

- **Quần áo bảo hộ và đồ an toàn** bảo vệ bạn khỏi một rủi ro cụ thể ở công trường. Ví dụ của ATO là áo phản quang và giày mũi thép, cùng với thiết bị an toàn như dây đai an toàn, kính bảo hộ và mặt nạ thở. Bạn được khấu trừ tiền mua, thuê, sửa hoặc giặt.
- **Đồ chống nắng.** Kem chống nắng, mũ chống nắng và kính râm, nhưng chỉ khi công việc của bạn đòi hỏi làm ngoài trời trong thời gian dài.
- **Dụng cụ và thiết bị bạn mua.** Ví dụ của ATO gồm máy cưa đĩa, máy trộn bê tông và bộ tua vít. Tiền sửa chữa và bảo hiểm cũng được tính.
- **Phí gia hạn bằng, giấy phép, chứng chỉ hoặc thẻ làm việc** liên quan đến công việc của bạn.
- **Lái ô tô đi thẳng giữa hai công việc trong cùng một ngày.** Ví dụ của ATO là lái xe từ công việc xây dựng đến công việc thứ hai làm bảo vệ.
- **Đi lại và chỗ ở khi bạn làm việc xa nhà qua đêm**, ví dụ ở một công trường tạm thời tại bang khác, khi chủ lao động không trả.
- **Phần dùng cho công việc của điện thoại**, kèm bản ghi việc dùng cho công việc.
- **Phí công đoàn.**

## Những gì bạn không được khấu trừ

- **Thẻ hoặc bằng đầu tiên của bạn.** ATO cho biết chi phí lấy bằng lần đầu để có việc làm thì không được khấu trừ. White Card bạn lấy để bắt đầu làm xây dựng thuộc nhóm này.
- **Bằng lái xe của bạn**, kể cả khi công việc yêu cầu.
- **Quần áo thông thường**, như quần jean, quần short kaki hay áo đi làm không có đặc điểm bảo hộ, kể cả khi chủ lao động yêu cầu.
- **Đường lái xe từ nhà đến công trường**, kể cả khi đường xa hay đi rất sớm.
- **Dụng cụ do chủ lao động cung cấp**, hoặc bất cứ thứ gì đã được hoàn tiền.
- **Tiền phạt** và **phí phòng tập thể dục**.

## Bộ dụng cụ và đường lái xe đến công trường

**Quy tắc $300.** Món đồ có giá từ $300 trở xuống, và không thuộc một bộ có tổng giá trên $300, được khấu trừ toàn bộ trong năm mua. Món đồ trên $300 vẫn được khấu trừ, nhưng dần qua nhiều năm theo mức giảm giá trị.

Hãy cẩn thận với các bộ dụng cụ. Nếu bạn mua cùng lúc một bộ dụng cụ có giá trên $300, cả bộ được tính là một món, kể cả khi từng món lẻ có giá dưới $300.

**Đường lái xe đến công trường.** ATO chỉ cho khấu trừ đi lại từ nhà đến công trường trong hai trường hợp hạn chế. Thứ nhất là khi nơi làm việc của bạn thay đổi liên tục và bạn di chuyển giữa các công trường trong ngày. Thứ hai là khi bạn chở dụng cụ cồng kềnh, thiết yếu cho công việc, chỉ chở thuận tiện bằng xe, và công trường không có chỗ cất giữ an toàn. Tất cả các điều kiện đó phải đúng.

Nếu bạn đủ điều kiện, hãy lưu ý rằng xe chở được từ một tấn trở lên, như nhiều xe bán tải (ute), không được dùng cách tính theo cent mỗi km hay logbook. Thay vào đó bạn khấu trừ chi phí thực tế của phần dùng cho công việc, kèm hóa đơn.

## Ví dụ cụ thể

Kenji có thể là người cư trú về thuế ở Úc vì khóa cử nhân của anh kéo dài ba năm. Trong kỳ nghỉ hè, anh làm phụ hồ ngoài trời ở công trường. Trong năm 2025-26, anh đã trả:

- Giày mũi thép: $160
- Hai áo phản quang: $50
- Kính bảo hộ và chụp tai chống ồn: $45
- Kem chống nắng, mũ rộng vành và kính râm bảo hộ: $85
- Một máy khoan không dây: $230

Tổng cộng là $570. Mỗi món đều dưới $300 và được mua riêng, nên anh khấu trừ toàn bộ từng món. White Card đầu tiên, quần jean và đường lái xe đến công trường không được tính.

Nếu thu nhập chịu thuế của Kenji nằm trong khung từ $18,201 đến $45,000, khoản khấu trừ giúp giảm khoảng $91 tiền thuế thu nhập (16% cho năm 2025-26).

## Chứng từ cần giữ

- Hóa đơn mua PPE, đồ chống nắng và dụng cụ. Ảnh chụp rõ nét bằng điện thoại là được.
- Hóa đơn cho mọi lần gia hạn bằng hay thẻ.
- Ghi lại những ngày bạn làm ngoài trời, để chứng minh khoản đồ chống nắng.
- Giữ chứng từ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Với năm 2025-26, nếu tổng các khoản khấu trừ công việc, không tính chi phí ô tô, trên $300, bạn cần chứng từ bằng văn bản cho tất cả. Chỉ có sao kê ngân hàng thường là chưa đủ, vì nó không cho thấy bạn đã mua gì.

Từ năm 2026-27, người cư trú về thuế có thu nhập từ lương được hưởng khoản khấu trừ chuẩn tối đa $1,000 mà không cần hóa đơn. Kê khai chi phí thực tế sẽ làm khoản này giảm đúng bằng số đó. Với du học sinh chỉ có vài trăm đô la tiền PPE, khoản khấu trừ chuẩn có thể đơn giản hơn. Với du học sinh mua nhiều dụng cụ lớn, chi phí thực tế kèm chứng từ có thể cao hơn.

## Nhà thầu hay nhân viên?

Một số công trường yêu cầu người phụ hồ phải có ABN. Có ABN không biến bạn thành nhà thầu. Nếu doanh nghiệp quyết định bạn làm việc thế nào, khi nào và ở đâu, có thể bạn là nhân viên, dù hợp đồng ghi gì đi nữa. Nếu bạn không chắc, Thanh tra Công bằng Lao động (Fair Work Ombudsman) có thể giúp bạn.

## Danh sách kiểm tra trước khi nộp

- Tìm hóa đơn giày, áo phản quang, kính và dụng cụ.
- Kiểm tra xem bạn có mua bộ dụng cụ nào trên $300 không.
- Giữ hóa đơn kem chống nắng và ghi lại những ngày làm ngoài trời.
- Tách riêng thẻ đầu tiên với các lần gia hạn.
- Đừng khai quần áo đi làm thông thường và đường lái xe đến công trường hằng ngày.

Nếu bạn muốn có người xem lại các khoản khấu trừ ngành xây dựng, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tôi có được khấu trừ White Card không?', a: 'Không, nếu đó là thẻ đầu tiên bạn cần để bắt đầu làm xây dựng. ATO cho biết bằng hoặc thẻ lần đầu cần để có việc thì không được khấu trừ. Phí gia hạn thẻ làm việc thì được khấu trừ.' },
      { q: 'Tôi có được khấu trừ kem chống nắng không?', a: 'Có, khi công việc của bạn đòi hỏi làm ngoài trời trong thời gian dài. Hãy giữ hóa đơn và chỉ khấu trừ phần dùng cho công việc.' },
      { q: 'Tôi mua một bộ dụng cụ giá $420. Có được khấu trừ không?', a: 'Có, nhưng một bộ mua cùng lúc có giá trên $300 được tính là một món, nên được khấu trừ dần qua nhiều năm.' },
    ],
  },
  'farm-work-tax-deductions-students': {
    title: 'Khấu trừ thuế khi làm nông trại và hái trái cây cho du học sinh',
    description: 'Làm nông trại hay hái trái cây trong kỳ nghỉ? Được khấu trừ gì: kem chống nắng, mũ, găng tay, dụng cụ và đi lại giữa các nông trại. Vì sao tiền thuê nhà và đường đi đến vùng làm là chi phí riêng.',
    answer: 'Người làm nông trại được khấu trừ đồ chống nắng khi làm ngoài trời trong thời gian dài, quần áo bảo hộ như găng tay và giày mũi thép, dụng cụ tự mua, phí gia hạn bằng và chi phí lái ô tô giữa các nông trại trong cùng một ngày. Chỗ ở, đồ ăn, việc chuyển đến vùng nông trại và đường lái xe đến nông trại hằng ngày thì không được khấu trừ.',
    body: `Một số du học sinh dành kỳ nghỉ hè để hái trái cây, đóng gói hoặc làm việc ở nông trại. Công việc ngoài trời và nặng về thể chất, nên có danh sách khấu trừ riêng. Kem chống nắng, vốn là chi phí riêng với phần lớn mọi người, lại có thể được khấu trừ ở đây.

## Ba điều kiện

Mọi khoản khấu trừ phải đáp ứng ba quy tắc của ATO:

- Bạn tự trả tiền và không được hoàn lại.
- Chi phí liên quan trực tiếp đến việc tạo ra thu nhập.
- Bạn có chứng từ chứng minh.

Nếu một thứ được dùng cho cả công việc lẫn đời sống riêng, chỉ khấu trừ phần dùng cho công việc.

## Những gì bạn được khấu trừ

- **Đồ chống nắng.** Mũ và kem chống nắng khi bạn làm ngoài trời trong thời gian dài. Kính râm cho việc làm ngoài trời cũng theo cùng nguyên tắc. Chỉ khấu trừ phần dùng cho công việc.
- **Quần áo bảo hộ** bảo vệ bạn khỏi những rủi ro cụ thể, như găng tay hay giày mũi thép. Bạn cũng được khấu trừ tiền giặt và sửa chúng.
- **Dụng cụ và thiết bị bạn mua cho công việc.** Ví dụ của ATO là máy cưa xích và dụng cụ làm hàng rào. Kéo cắt cành, túi hái trái cây và đèn đội đầu cũng thuộc nhóm này.
- **Gia hạn một bằng đặc biệt** bạn đã có trong lúc đang làm công việc đó, như bằng lái xe nâng cho xưởng đóng gói.
- **Lái ô tô đi thẳng giữa hai công việc khác nhau trong cùng một ngày**, hoặc giữa hai nông trại hay hai khu đất của cùng một chủ lao động trong cùng một ngày.
- **Đi lại xa nhà qua đêm vì công việc**, như di chuyển gia súc đường dài, khi chủ lao động không trả.
- **Phần dùng cho công việc của điện thoại**, kèm bản ghi việc dùng cho công việc.
- **Tiền giặt quần áo bảo hộ**, $1 mỗi mẻ chỉ có quần áo làm việc hoặc 50 cent mỗi mẻ nếu giặt chung.

## Những gì bạn không được khấu trừ

- **Chỗ ở trong vùng nông trại.** Nơi bạn ở trong mùa vụ là chi phí sinh hoạt.
- **Chuyển đến một nơi làm việc mới.** ATO cho biết chi phí chuyển chỗ ở, dù do công việc yêu cầu hay do bạn tự chọn khi nhận việc mới, đều không được khấu trừ. Vé xe buýt hay vé máy bay đến vùng nông trại thuộc nhóm này.
- **Đường lái xe hằng ngày từ chỗ ở đến nông trại**, kể cả trên đường đất dài hay phải đi từ rất sớm.
- **Đồ ăn thức uống trong ngày làm việc.**
- **Quần áo thông thường**, như quần jean, quần thể thao, quần short kaki và áo khoác, kể cả khi chủ lao động bảo bạn mặc.
- **Bằng lái xe của bạn**, và bằng đặc biệt đầu tiên bạn cần để có việc.
- **Gói nghe nhạc** và các chi phí riêng khác.

## Chi phí dụng cụ và xe dùng ở nông trại

**Quy tắc $300.** Món đồ có giá từ $300 trở xuống, và không thuộc một bộ có tổng giá trên $300, được khấu trừ toàn bộ trong năm mua. Món đồ trên $300 được khấu trừ dần qua nhiều năm. Găng tay hái trái cây mau hỏng, và mỗi đôi là một lần mua riêng, nên hãy giữ mọi hóa đơn.

**Xe bán tải và xe dùng ở nông trại.** Cách tính theo cent mỗi km và logbook chỉ áp dụng cho ô tô. ATO cho biết xe bán tải (ute) chở được từ một tấn trở lên, xe buýt nhỏ, xe máy và xe địa hình bốn bánh (quad bike) đều không được dùng hai cách này. Với những loại xe đó, bạn khấu trừ chi phí thực tế của phần dùng cho công việc, kèm hóa đơn và bản ghi việc dùng cho công việc.

## Ví dụ cụ thể

Amara học thạc sĩ hai năm, nên cô có thể là người cư trú về thuế ở Úc. Trong kỳ nghỉ hè, cô hái trái cây 10 tuần cho một chủ vườn. Trong 25 ngày, người giám sát chuyển cả nhóm từ một khu đất sang một nông trại khác vào buổi chiều, và mỗi lần cô lái xe của mình 16 km.

- Đi lại giữa các nông trại: 25 ngày x 16 km = 400 km. Với mức 88 cent mỗi km (năm 2025-26), cô khấu trừ $352.
- Kem chống nắng và mũ rộng vành: $70
- Găng tay hái trái cây, năm đôi: $55
- Kéo cắt cành và túi hái trái cây: $95

Tổng khấu trừ của cô là $572. Cô không được khấu trừ tiền phòng ở thị trấn gần nông trại, vé xe buýt đến vùng đó, hay đường lái xe buổi sáng từ chỗ ở đến khu đất đầu tiên.

Nếu thu nhập chịu thuế của Amara nằm trong khung từ $18,201 đến $45,000, khoản khấu trừ giúp giảm khoảng $92 tiền thuế thu nhập (16% cho năm 2025-26). Nếu tổng thu nhập chịu thuế cả năm của cô dưới $18,200, khoản khấu trừ thường không thay đổi gì.

## Chứng từ cần giữ

- Hóa đơn kem chống nắng, mũ, găng tay và dụng cụ. Ảnh chụp là được.
- Ghi chép đi lại cho mỗi ngày bạn di chuyển giữa các nông trại: ngày, hai địa điểm và số km.
- Phiếu lương, hoặc ghi chép từng nông trại và những ngày bạn làm ở đó.
- Giữ mọi thứ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Với năm 2025-26, nếu tổng các khoản khấu trừ công việc, không tính chi phí ô tô, trên $300, bạn cần chứng từ bằng văn bản cho tất cả. Chỉ có sao kê ngân hàng thường là chưa đủ.

## Trả lương theo sản phẩm và các việc ngắn ngày

Được trả lương theo thùng hay theo ký (piece rates) không làm thay đổi thuế của bạn. Đó vẫn là tiền lương. Phần lớn nông trại báo lương của bạn cho ATO qua Single Touch Payroll, nên khoản này hiện trong bảng kê thu nhập. Các việc ngắn ngày rất dễ bị quên, nên hãy liệt kê mọi nông trại và kiểm tra từng bảng kê thu nhập trước khi nộp.

## Danh sách kiểm tra trước khi nộp

- Liệt kê mọi nông trại hay nhà thầu bạn đã làm cho.
- Giữ hóa đơn kem chống nắng và găng tay, và ghi lại những ngày làm ngoài trời.
- Ghi lại những ngày bạn lái xe giữa các nông trại.
- Đừng khai chỗ ở, đồ ăn và chi phí đi đến vùng nông trại.
- Nếu bạn dùng xe bán tải hay xe địa hình bốn bánh, hãy giữ hóa đơn chi phí thực tế.

Nếu bạn muốn được giúp khai một mùa làm nông trại trong hồ sơ thuế, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tôi có được khấu trừ tiền chỗ ở gần nông trại không?', a: 'Không. Chỗ ở là chi phí sinh hoạt riêng, kể cả khi nông trại ở xa nơi bạn học.' },
      { q: 'Tôi có được khấu trừ vé xe buýt đến vùng hái trái cây không?', a: 'Không. ATO cho biết chi phí chuyển đến một nơi làm việc mới thì không được khấu trừ.' },
      { q: 'Kem chống nắng có thật sự được khấu trừ không?', a: 'Có, khi bạn làm ngoài trời trong thời gian dài. Chỉ khấu trừ phần bạn đã dùng cho công việc.' },
    ],
  },
  'tutor-childcare-tax-deductions-students': {
    title: 'Khấu trừ thuế cho gia sư và nhân viên chăm sóc trẻ là du học sinh',
    description: 'Làm gia sư, chăm sóc trẻ hay trợ giảng trong lúc đi học? Bạn được khấu trừ gì, quy định về kiểm tra làm việc với trẻ em (working with children check), và học phí của bạn.',
    answer: 'Gia sư, nhân viên chăm sóc trẻ và trợ giảng được khấu trừ đồ dùng dạy học, đồng phục bắt buộc, phần dùng cho công việc của điện thoại và internet, đi lại giữa hai công việc trong cùng một ngày, và việc học gắn với công việc hiện tại. Lần kiểm tra làm việc với trẻ em đầu tiên chỉ được khấu trừ trong một số trường hợp hạn chế.',
    body: `Dạy kèm, chăm sóc trẻ và hỗ trợ giáo dục là những công việc hợp với nhiều du học sinh. Có người dạy kèm học sinh phổ thông bằng ABN. Có người làm trợ lý ở trung tâm chăm sóc trẻ hay ở trường học. Bài này nói về các khoản khấu trừ cho loại công việc này, kể cả kiểm tra làm việc với trẻ em (working with children check), vốn có quy định riêng của ATO.

## Ba điều kiện

Mọi khoản khấu trừ phải đáp ứng ba quy tắc của ATO:

- Bạn tự trả tiền và không ai hoàn lại cho bạn.
- Chi phí liên quan trực tiếp đến việc tạo ra thu nhập.
- Bạn có chứng từ chứng minh.

Nếu bạn dùng một thứ cho cả công việc lẫn việc riêng, chỉ khấu trừ phần dùng cho công việc.

## Những gì bạn được khấu trừ

- **Đồ dùng dạy học** liên quan đến công việc của bạn, như sách, phiếu bài tập hay trò chơi học tập bạn mua cho học sinh.
- **Đồng phục bắt buộc** mà nơi làm việc yêu cầu rõ ràng, ví dụ áo có logo của trung tâm. Bạn được khấu trừ tiền mua, thuê, sửa hoặc giặt.
- **Phần dùng cho công việc của điện thoại và internet**, kèm bản ghi việc dùng cho công việc. Gia sư dạy trực tuyến dùng internet cho công việc rất nhiều, nên một bản ghi hợp lý rất quan trọng.
- **Lái ô tô đi thẳng giữa hai công việc trong cùng một ngày.** Ví dụ của ATO là lái xe từ công việc giảng dạy đến buổi dạy kèm.
- **Đi đến một nơi làm việc khác của cùng chủ lao động**, hoặc từ nhà thẳng đến nơi đào tạo cho một khóa học của công việc.
- **Khóa sơ cứu, nếu bạn là người được chỉ định phụ trách sơ cứu** ở nơi làm việc. Đây là điều kiện trong hướng dẫn của ATO cho người làm ngành giáo dục.
- **Việc học gắn với công việc hiện tại.** Ví dụ của ATO là một khóa học về làm việc với trẻ có nhu cầu học tập đặc biệt.
- **Phí công đoàn và phí hội nghề nghiệp.**
- **Phí nền tảng**, nếu bạn dạy kèm qua một nền tảng bằng ABN.

## Kiểm tra làm việc với trẻ em

ATO có một trang riêng về vấn đề này. Bạn được khấu trừ chi phí khi bạn đang là nhân viên và cần làm mới hoặc gia hạn giấy kiểm tra để tiếp tục có thu nhập từ công việc. Một nhân viên mới được khấu trừ nếu thu nhập gần đây của họ đến từ việc làm liên tục trong lĩnh vực liên quan đến trẻ em.

Nếu bạn mới bắt đầu làm việc liên quan đến trẻ em, bạn không được khấu trừ chi phí lần kiểm tra đầu tiên. Ví dụ của ATO là một người đã rời lĩnh vực này lâu năm và cần làm giấy kiểm tra mới để quay lại với tư cách nhân viên mới: không được khấu trừ.

## Những gì bạn không được khấu trừ

- **Quần áo thông thường**, như quần áo hằng ngày, đồ thể thao hay đồ công sở, kể cả khi chủ lao động yêu cầu.
- **Quà cho học sinh**, như quà cuối học kỳ. ATO cho biết đây là chi phí riêng.
- **Chi phí riêng của học sinh**, như bữa trưa hay sách vở của các em.
- **Đi lại từ nhà đến chỗ làm**, kể cả cho các sự kiện ngoài giờ.
- **Tiêm phòng cúm và các loại tiêm chủng khác**, kể cả khi nơi làm việc yêu cầu.
- **Khóa học chính theo visa du học của bạn**, trong hầu hết trường hợp. Việc học chỉ liên quan chung chung đến công việc, hoặc chuẩn bị cho bạn một công việc mới, thì không được khấu trừ. ATO lấy Bachelor of Education làm ví dụ cho việc học giúp một người có được việc làm mới.

## Dạy kèm bằng ABN

Nếu bạn dạy kèm riêng và tự gửi hóa đơn cho các gia đình, có thể bạn đang kinh doanh bằng ABN. Không có thuế nào bị trừ trước, nên bạn khai thu nhập và các chi phí kinh doanh trong hồ sơ thuế. Nhìn chung bạn chỉ cần đăng ký GST khi doanh thu đạt $75,000.

Việc đi từ nhà đến nhà học sinh có thể khó xét hơn việc đi giữa hai công việc. Nếu bạn dạy kèm bằng ABN và lái xe đến nhiều gia đình, hãy ghi chép đầy đủ và hỏi trước khi khai chuyến đi đầu tiên và cuối cùng trong ngày.

## Ví dụ cụ thể

Hana học thạc sĩ hai năm, nên cô có thể là người cư trú về thuế ở Úc. Cô làm trợ lý ở một trung tâm chăm sóc trẻ và dạy kèm toán bằng ABN vào buổi tối. Trong năm 2025-26, cô đã trả:

- Hai áo của trung tâm có logo, bắt buộc theo quy định: $60
- Sách bài tập và đề luyện toán cho việc dạy kèm: $90
- Internet: $70 mỗi tháng, $840 cả năm. Bản ghi bốn tuần cho thấy 25% dùng cho dạy kèm, nên cô khấu trừ $210.
- Trong 30 ngày, cô lái xe từ trung tâm đi thẳng đến buổi dạy kèm, mỗi lần 9 km: 270 km. Với mức 88 cent mỗi km (năm 2025-26), cô khấu trừ $237.60.

Tổng cộng là $597.60. Lần kiểm tra làm việc với trẻ em đầu tiên, mà cô làm trước công việc đầu tiên liên quan đến trẻ em, không nằm trong danh sách. Quà cuối năm cô tặng các em cũng vậy.

Nếu thu nhập chịu thuế của Hana nằm trong khung từ $18,201 đến $45,000, khoản khấu trừ giúp giảm khoảng $96 tiền thuế thu nhập (16% cho năm 2025-26).

## Chứng từ cần giữ

- Hóa đơn đồ dùng dạy học, đồng phục và khóa học.
- Bản ghi bốn tuần về việc dùng internet và điện thoại.
- Ghi chép đi lại cho mỗi ngày có đi giữa hai công việc: ngày, địa điểm và số km.
- Các hóa đơn bạn đã gửi cho gia đình học sinh, nếu bạn dạy kèm bằng ABN.
- Giữ mọi thứ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Với năm 2025-26, nếu tổng các khoản khấu trừ công việc, không tính chi phí ô tô, trên $300, bạn cần chứng từ bằng văn bản cho tất cả. Chỉ có sao kê ngân hàng thường là chưa đủ.

Từ năm 2026-27, người cư trú về thuế có thu nhập từ lương được hưởng khoản khấu trừ chuẩn tối đa $1,000. Kê khai chi phí công việc thực tế sẽ làm khoản này giảm đúng bằng số đó. Khoản này không áp dụng nếu thu nhập duy nhất của bạn là thu nhập kinh doanh.

## Danh sách kiểm tra trước khi nộp

- Kiểm tra xem giấy kiểm tra làm việc với trẻ em của bạn có được khấu trừ theo quy định của ATO không.
- Tìm hóa đơn đồ dùng dạy học.
- Tính phần dùng cho công việc của điện thoại và internet từ một bản ghi thật.
- Liệt kê những ngày bạn lái xe đi thẳng giữa hai công việc.
- Đừng khai quà tặng, quần áo thông thường và học phí khóa học chính.

Nếu bạn vừa làm chăm sóc trẻ vừa dạy kèm bằng ABN, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp để được giúp với cả hai phần của hồ sơ.`,
    faq: [
      { q: 'Tôi có được khấu trừ lần kiểm tra làm việc với trẻ em đầu tiên không?', a: 'Chỉ khi thu nhập gần đây của bạn đến từ việc làm liên tục trong lĩnh vực liên quan đến trẻ em. Nếu bạn mới bắt đầu làm việc liên quan đến trẻ em, lần kiểm tra đầu tiên không được khấu trừ.' },
      { q: 'Tôi có được khấu trừ quà mua cho các em không?', a: 'Không. ATO cho biết quà cho học sinh là chi phí riêng.' },
      { q: 'Tôi có được khấu trừ học phí Bachelor of Education không?', a: 'Nhìn chung là không. ATO lấy tấm bằng này làm ví dụ cho việc học giúp bạn có được việc làm mới, và loại này không được khấu trừ.' },
    ],
  },
  'rideshare-tax-deductions-students': {
    title: 'Khấu trừ thuế cho du học sinh chạy xe chở khách',
    description: 'Chạy xe chở khách cho ứng dụng bằng ABN trong lúc đi học? Được khấu trừ gì: chi phí xe, phí nền tảng, đồ dùng cho khách, giấy phép tài xế. Kèm quy định về GST và chứng từ.',
    answer: 'Tài xế chở khách được khấu trừ phần dùng cho kinh doanh của chi phí xe, phí nền tảng, phí cầu đường khách không trả, nước uống và kẹo bạc hà cho khách, và giấy phép tài xế cùng các loại kiểm tra. Tiền phạt, bữa ăn lúc nghỉ và việc dùng xe cho việc riêng thì không được khấu trừ.',
    body: `Chạy xe chở khách là thu nhập kinh doanh. Bạn cần ABN và phải đăng ký GST trước chuyến đầu tiên, và không có thuế nào bị trừ từ tiền ứng dụng trả cho bạn. Các khoản khấu trừ làm giảm phần lợi nhuận dùng để tính thuế, nên chứng từ đầy đủ ở đây quan trọng hơn ở phần lớn công việc khác của du học sinh.

Trước khi bắt đầu, hãy kiểm tra với Bộ Nội vụ (Department of Home Affairs) xem điều kiện visa của bạn có cho phép làm công việc này không.

## Đăng ký trước tiên

ATO cho biết tài xế chở khách qua ứng dụng (ride-sourcing) phải đăng ký GST bất kể kiếm được bao nhiêu, và phải đăng ký trước chuyến đầu tiên. Bạn cần ABN để đăng ký GST. Bạn báo cáo GST hằng tháng hoặc hằng quý. Điều này khác với giao đồ ăn, nơi việc đăng ký GST nhìn chung chỉ áp dụng khi doanh thu đạt $75,000.

Nếu bạn được khấu trừ lại GST (GST credit) cho một khoản chi phí, khoản khấu trừ thuế thu nhập của bạn là số tiền không tính GST.

## Những gì bạn được khấu trừ

- **Chi phí ô tô** cho chiếc xe bạn sở hữu hoặc thuê dài hạn, theo một trong hai cách:
  - **Theo cent mỗi km:** 88 cent mỗi km cho năm 2025-26, tối đa 5,000 km kinh doanh cho mỗi xe. Mức này đã bao gồm mọi chi phí vận hành, kể cả xăng, bảo dưỡng, bảo hiểm và khấu hao (decline in value), nên bạn không được khấu trừ riêng các khoản đó.
  - **Theo logbook:** tỷ lệ dùng cho kinh doanh của chi phí vận hành, khấu hao và tiền lãi. Logbook phải ghi ít nhất 12 tuần liên tục và có thể dùng trong 5 năm.
- **Phí nền tảng và tiền hoa hồng.**
- **Xăng**, nếu bạn dùng cách tính theo logbook, như một phần của chi phí vận hành.
- **Phí cầu đường** mà khách không trả.
- **Tiền đỗ xe trong lúc chờ cuốc.** Tiền đỗ xe khi đi việc riêng thì không được khấu trừ.
- **Đồ dùng cho khách**, như nước uống, kẹo bạc hà và khăn giấy, cùng khăn ướt hay nước rửa tay để vệ sinh xe.
- **Phần dùng cho kinh doanh của điện thoại.**
- **Giấy phép và chấp thuận của bang**, như giấy phép tài xế (driver accreditation), phí nộp đơn, khám sức khỏe và kiểm tra lý lịch tư pháp cho công việc.
- **Phí làm hồ sơ thuế.**

## Những gì bạn không được khấu trừ

- **Tiền phạt**, kể cả phạt chạy quá tốc độ và phạt đỗ xe.
- **Bữa ăn bạn mua lúc nghỉ.**
- **Việc dùng xe cho việc riêng**, như lái xe đến trường đại học hay đi mua sắm.
- **Bằng lái xe cá nhân của bạn.**
- **Tín dụng thuế nhiên liệu (fuel tax credits).**
- **Chi phí vận hành cộng thêm vào cách tính theo cent mỗi km.** Nếu bạn dùng cách này, nó đã bao gồm các chi phí đó.

## Cách nào cho khoản khấu trừ lớn hơn?

Cách tính theo cent mỗi km dừng ở mức 5,000 km kinh doanh. Du học sinh chạy nhiều có thể vượt mức này rất nhanh, và mỗi km vượt quá đều bị mất. Logbook không có giới hạn và tính cả tiền lãi vay mua xe. Cách này tốn công hơn: 12 tuần ghi chép các chuyến đi và hóa đơn cho phần lớn chi phí. Bạn có thể đổi cách tính từ năm này sang năm khác.

## Ví dụ cụ thể

David học cử nhân ba năm, nên anh có thể là người cư trú về thuế ở Úc. Anh chạy xe chở khách cho một ứng dụng vào cuối tuần. Anh đã ghi logbook 12 tuần, cho thấy 60% số km của anh là cho kinh doanh. Trong năm 2025-26, chi phí xe của anh, không tính GST, là:

- Xăng: $2,400
- Bảo hiểm và đăng ký xe: $1,500
- Bảo dưỡng và lốp xe: $700

Tổng chi phí vận hành là $4,600. Với 60% dùng cho kinh doanh, anh khấu trừ $2,760 tiền chi phí vận hành, cộng thêm 60% khấu hao của xe. Anh cũng khấu trừ:

- Phí nền tảng ghi trên bảng kê cả năm
- Nước uống và kẹo bạc hà cho khách: $80
- 60% gói cước điện thoại, dựa trên bản ghi việc sử dụng trong bốn tuần

Nếu dùng cách tính theo cent mỗi km, 6,500 km kinh doanh của anh sẽ bị giới hạn ở 5,000 km x 88 cent = $4,400, và số này đã bao gồm mọi chi phí vận hành xe kể cả khấu hao. David so sánh hai con số và dùng cách cho kết quả tốt hơn mà anh có chứng từ để chứng minh.

Anh không được khấu trừ hai lần bị phạt chạy quá tốc độ, hay các bữa trưa anh mua giữa các cuốc. Anh cũng không được khấu trừ số km lái đến trường đại học hay đi mua sắm, vì đó là các chuyến đi riêng, kể cả khi ứng dụng vẫn mở trên điện thoại.

Nếu David đã đăng ký GST và được khấu trừ lại GST cho các chi phí này, anh dùng số tiền không tính GST, như ở trên. Các khoản khấu trừ khi đó làm giảm lợi nhuận kinh doanh của anh, và thuế được tính trên phần lợi nhuận đó cùng với bất kỳ tiền lương nào anh kiếm được.

## Chứng từ cần giữ

- Logbook ghi 12 tuần liên tục với số đồng hồ công-tơ-mét, nếu bạn dùng cách này.
- Bản ghi cách bạn tính số km kinh doanh, nếu bạn dùng cách tính theo cent mỗi km.
- Bảng kê của nền tảng cho thấy tiền cước, tiền tip, tiền thưởng và các khoản phí. Tiền tip và tiền thưởng từ nền tảng là thu nhập.
- Hóa đơn chi phí xe, đồ dùng cho khách, giấy phép tài xế và các loại kiểm tra.
- Bản ghi phần dùng cho kinh doanh của điện thoại.
- Giữ chứng từ trong 5 năm kể từ ngày bạn nộp hồ sơ.

ATO cho biết bạn phải nộp hồ sơ thuế nếu có thu nhập từ chở khách qua ứng dụng, dù nhiều hay ít.

## Chạy xe chở khách và khoản khấu trừ chuẩn $1,000

Từ năm 2026-27, người cư trú về thuế có thu nhập từ lao động được hưởng khoản khấu trừ chuẩn tối đa $1,000. Khoản này không áp dụng nếu thu nhập duy nhất của bạn là thu nhập kinh doanh, như thu nhập chạy xe chở khách. Nếu bạn còn có một công việc hưởng lương, hãy hỏi xem hai phần này kết hợp với nhau thế nào.

## Danh sách kiểm tra trước khi nộp

- Kiểm tra bạn đã đăng ký GST trước chuyến đầu tiên, và các tờ khai hoạt động kinh doanh (BAS) đã nộp đầy đủ.
- Tải bảng kê cả năm từ mỗi ứng dụng.
- Chọn cách tính chi phí xe và kiểm tra bạn có đủ chứng từ cho cách đó.
- Gom hóa đơn đồ dùng cho khách, phí cầu đường, tiền đỗ xe và giấy phép tài xế.
- Đừng khai tiền phạt, bữa ăn và các chuyến đi riêng.

Hồ sơ của tài xế chở khách có cả GST, thu nhập kinh doanh và chi phí xe ở cùng một chỗ. Nếu bạn muốn được giúp, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tôi chỉ chạy vài tiếng mỗi tuần. Tôi có cần đăng ký GST không?', a: 'Có. ATO cho biết tài xế chở khách qua ứng dụng phải đăng ký GST bất kể kiếm được bao nhiêu, và phải đăng ký trước chuyến đầu tiên.' },
      { q: 'Tôi có được khấu trừ tiền xăng và đồng thời dùng cách tính theo cent mỗi km không?', a: 'Không. Mức cent mỗi km đã bao gồm mọi chi phí vận hành, kể cả xăng. Xăng chỉ được khấu trừ riêng khi bạn dùng cách tính theo logbook.' },
      { q: 'Tiền tip của khách có phải chịu thuế không?', a: 'Có. Tiền cước, tiền tip và tiền thưởng từ nền tảng đều là thu nhập chịu thuế.' },
      { q: 'Tôi có được khấu trừ phí kiểm tra lý lịch tư pháp không?', a: 'Có, cho công việc chở khách. ATO liệt kê kiểm tra lý lịch tư pháp, giấy phép tài xế và khám sức khỏe cho công việc là được khấu trừ.' },
    ],
  },
  'chef-kitchen-hand-tax-deductions-students': {
    title: 'Khấu trừ thuế cho phụ bếp và đầu bếp là du học sinh',
    description: 'Làm phụ bếp, nấu ăn hay đầu bếp khi có visa du học? Nhân viên bếp được khấu trừ gì: quần và mũ đầu bếp, dao, đồ bảo hộ và khóa học. Vì sao khóa học nấu ăn thường không được.',
    answer: 'Phụ bếp và đầu bếp được khấu trừ trang phục riêng của nghề như quần kẻ ô và mũ đầu bếp, quần áo bảo hộ, dao và dụng cụ bếp tự mua, và khóa học gắn với công việc hiện tại. Quần áo thông thường, bữa ăn nhân viên và khóa học đào tạo cho một công việc mới thì không được khấu trừ.',
    body: `Các bếp nhà hàng tuyển rất nhiều du học sinh, làm phụ bếp, nấu ăn và đầu bếp. Một số bạn còn đang học ngành nấu ăn thương mại (commercial cookery). Công việc trong bếp có nhiều khoản khấu trừ hơn công việc phục vụ một chút, chủ yếu là quần áo và dao.

## Ba điều kiện

Mọi khoản khấu trừ phải đáp ứng ba quy tắc của ATO:

- Bạn tự trả tiền và không ai hoàn lại cho bạn.
- Chi phí liên quan trực tiếp đến việc tạo ra thu nhập.
- Bạn có chứng từ chứng minh.

Nếu bạn cũng dùng một thứ ở nhà, chỉ khấu trừ phần dùng cho công việc.

## Những gì bạn được khấu trừ

- **Trang phục riêng của nghề.** Ví dụ của ATO là quần kẻ ô và mũ của đầu bếp. Loại trang phục này cho thấy một nghề cụ thể, nên được khấu trừ kể cả khi không có logo của nhà hàng. Bạn được khấu trừ tiền mua, sửa và giặt.
- **Quần áo bảo hộ**, như tạp dề và găng tay. Găng tay chống cắt hay chịu nhiệt bảo vệ bạn khỏi những rủi ro cụ thể trong bếp. Giày chống trượt cho sàn ướt hay sàn trơn dầu mỡ cũng là đồ bảo hộ.
- **Đồng phục bắt buộc** có nhận diện riêng của chủ lao động.
- **Dao và dụng cụ bếp bạn dùng cho công việc**, cùng tiền bảo hiểm và sửa chữa, như mài dao. Nếu bạn cũng dùng chúng ở nhà, chỉ khấu trừ phần dùng cho công việc.
- **Tiền giặt quần áo được khấu trừ.** $1 mỗi mẻ chỉ có quần áo làm việc, hoặc 50 cent mỗi mẻ nếu giặt chung với đồ cá nhân.
- **Khóa học gắn với công việc hiện tại**, giúp duy trì hoặc nâng cao kỹ năng bạn đang dùng.
- **Phí công đoàn.**

## Những gì bạn không được khấu trừ

- **Quần áo thông thường**, như quần đen hay áo sơ mi trắng, kể cả khi bếp yêu cầu.
- **Bữa ăn nhân viên** và đồ ăn thức uống trong ca.
- **Đi lại từ nhà đến chỗ làm.** ATO cho biết điều này bao gồm cả những chuyến đi mà bạn mang theo đồ không thể mang lên phương tiện công cộng, như dao đầu bếp. Mang theo dao không làm cho đường đi làm được khấu trừ.
- **Khóa học đào tạo bạn cho một công việc mới.** Ví dụ của ATO là một người giao hàng học để trở thành đầu bếp: không được khấu trừ.
- **Tiêm chủng**, kể cả khi nơi làm việc yêu cầu.
- **Dao hay dụng cụ do chủ lao động cung cấp.**

## Khóa học nấu ăn của tôi có được khấu trừ không?

Đây là câu hỏi phổ biến nhất của du học sinh làm bếp. ATO cho biết việc học được khấu trừ khi nó có mối liên hệ đủ chặt với công việc hiện tại: giúp duy trì hoặc nâng cao kỹ năng bạn cần cho công việc đó, hoặc nhiều khả năng làm tăng thu nhập từ công việc đó. Việc học không được khấu trừ khi nó giúp bạn có được một công việc mới, hoặc khi bạn không đi làm.

Vì vậy câu trả lời tùy vào hoàn cảnh của bạn, và hai du học sinh cùng lớp có thể nhận được câu trả lời khác nhau. Một khóa ngắn về kỹ năng dùng dao cho người đang làm nấu ăn có nhiều khả năng đạt yêu cầu. Một chương trình nấu ăn đầy đủ của một phụ bếp muốn trở thành đầu bếp thì gần với ví dụ "công việc mới" của ATO hơn. Hãy hỏi trước khi khai học phí, và dù thế nào cũng nên giữ giấy tờ ghi danh.

## Quy tắc $300 và bộ dao

Một con dao hay dụng cụ có giá từ $300 trở xuống, và không thuộc một bộ có tổng giá trên $300, được khấu trừ toàn bộ trong năm mua. Món đồ trên $300 được khấu trừ dần qua nhiều năm.

Hãy để ý các bộ dao. Một túi dao gồm năm con dao mua cùng lúc với giá $380 được tính là một bộ trên $300, dù từng con dao lẻ có giá dưới $300. Bộ dao đó được khấu trừ dần qua nhiều năm.

## Ví dụ cụ thể

Minh là người không cư trú về thuế và làm nấu ăn ở một nhà hàng. Trong năm 2025-26, anh đã trả:

- Hai quần kẻ ô và một mũ đầu bếp: $90
- Hai tạp dề và găng tay chống cắt: $55
- Một con dao đầu bếp mua riêng: $180
- Tiền mài dao: $30
- Tiền giặt: mỗi tuần một mẻ chỉ có quần áo làm việc trong 45 tuần, $1 mỗi mẻ: $45

Tổng cộng là $400. Anh cũng trả $380 cho một bộ dao; bộ này được khấu trừ dần qua nhiều năm, không phải toàn bộ trong năm nay. Anh không được khấu trừ áo đen đi làm, các bữa ăn nhân viên hay đường lái xe đi làm có mang theo dao.

Là người không cư trú về thuế, Minh đóng thuế 30% ngay từ đồng đầu tiên (năm 2025-26), nên khoản khấu trừ $400 giúp giảm khoảng $120 tiền thuế thu nhập.

## Chứng từ cần giữ

- Hóa đơn trang phục đầu bếp, đồ bảo hộ, dao và tiền mài dao. Ảnh chụp bằng điện thoại là được.
- Một cuốn sổ ghi việc giặt ngắn gọn, cho thấy số mẻ giặt.
- Giấy tờ ghi danh và thanh toán khóa học, nếu bạn khai việc học.
- Giữ mọi thứ trong 5 năm kể từ ngày bạn nộp hồ sơ.

Với năm 2025-26, nếu tổng các khoản khấu trừ công việc trên $300, bạn cần chứng từ bằng văn bản cho toàn bộ số tiền, không chỉ phần vượt quá $300. Riêng tiền giặt, bạn cần chứng từ bằng văn bản khi tiền giặt khai trên $150 và tổng các khoản khấu trừ công việc trên $300. Chỉ có sao kê ngân hàng thường là chưa đủ.

Từ năm 2026-27, người cư trú về thuế có thu nhập từ lương được hưởng khoản khấu trừ chuẩn tối đa $1,000 mà không cần hóa đơn. Kê khai chi phí công việc thực tế sẽ làm khoản này giảm đúng bằng số đó. Người không cư trú về thuế không được dùng khoản này.

## Danh sách kiểm tra trước khi nộp

- Tách riêng trang phục đầu bếp (được khấu trừ) với quần áo đen hay trắng trơn (không được khấu trừ).
- Kiểm tra xem có con dao nào được mua theo bộ trên $300 không.
- Đếm số mẻ giặt.
- Cân nhắc kỹ xem khóa học của bạn có gắn với công việc hiện tại không.
- Đừng khai bữa ăn nhân viên và đường đi làm.

Nhân viên bếp thường làm cho hai nhà hàng. Cả hai bảng kê thu nhập nằm trong một hồ sơ, cùng với các khoản khấu trừ từ cả hai công việc.

Nếu bạn muốn hồ sơ của người làm bếp được kiểm tra trước khi nộp, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tôi có được khấu trừ quần đầu bếp không có logo không?', a: 'Có. ATO xem quần kẻ ô và mũ đầu bếp là trang phục riêng của nghề, được khấu trừ mà không cần logo.' },
      { q: 'Tôi mang dao đi làm. Tôi có được khấu trừ đường lái xe không?', a: 'Không. ATO cho biết việc mang theo đồ không thể mang lên phương tiện công cộng, như dao đầu bếp, không làm cho chuyến đi từ nhà đến chỗ làm được khấu trừ.' },
      { q: 'Tôi có được khấu trừ khóa học nấu ăn thương mại không?', a: 'Chỉ khi khóa học gắn chặt với công việc hiện tại và nâng cao kỹ năng bạn đang dùng. Khóa học đào tạo bạn cho một công việc mới, như trở thành đầu bếp, thì không được khấu trừ.' },
    ],
  },
}
