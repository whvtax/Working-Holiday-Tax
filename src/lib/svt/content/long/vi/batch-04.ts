import type { LongText } from '../types'

export const LONG_VI_04: Readonly<Record<string, LongText>> = {
  'tax-withheld-payslip-student-visa': {
    title: 'Thuế bị trừ trên phiếu lương: hướng dẫn cho người có visa du học',
    description: 'Thuế bị trừ (tax withheld) là khoản chủ lao động gửi cho ATO từ mỗi kỳ lương. Điều gì quyết định con số này, vì sao nó có vẻ quá cao hay quá thấp, và nên kiểm tra gì.',
    answer: 'Thuế bị trừ là phần lương gộp mà chủ lao động gửi cho ATO thay bạn, trước khi trả phần còn lại cho bạn. Đây chỉ là số ước tính, không phải số thuế cuối cùng: hồ sơ thuế mới tính ra con số thật, và phần chênh lệch sẽ thành tiền hoàn thuế hoặc khoản bạn phải đóng thêm.',
    body: `Ở Úc, phiếu lương nào cũng có một dòng ghi tax withheld, tức thuế bị trừ. Với nhiều du học sinh, đây là con số khó hiểu nhất trên phiếu lương. Nó thay đổi từ tuần này sang tuần khác, mỗi chỗ làm một khác, và hiếm khi giống với những gì bạn bè kể. Bài này giải thích con số đó là gì, điều gì quyết định nó, và khi nào thì nên hỏi lại.

## Thuế bị trừ thực ra là gì?

Khi trả lương, chủ lao động không đưa bạn toàn bộ số tiền bạn làm ra. Họ giữ lại một khoản và gửi cho ATO đứng tên bạn. Khoản đó là thuế bị trừ. ATO giữ số tiền này đến cuối năm tài chính, tức là từ 1 tháng 7 đến 30 tháng 6.

Thuế bị trừ là một khoản trả trước. Chủ lao động không biết cả năm của bạn ra sao. Họ chỉ biết số tiền họ trả cho bạn, và những gì bạn khai trên tờ khai mã số thuế (TFN declaration). Vì vậy họ ước tính. Khi bạn nộp hồ sơ thuế, ATO tính số thuế thật bạn phải đóng trên toàn bộ thu nhập trong năm, rồi so với tổng số thuế đã bị trừ.

- Nếu số đã bị trừ nhiều hơn số bạn phải đóng, phần chênh lệch được trả lại cho bạn dưới dạng tiền hoàn thuế.
- Nếu số đã bị trừ ít hơn số bạn phải đóng, bạn đóng thêm phần chênh lệch.
- Nếu hai số gần bằng nhau, có thể chẳng bên nào phải trả thêm bao nhiêu.

## Điều gì quyết định số thuế bị trừ từ lương?

Với phần lớn du học sinh, có ba điều quyết định: bạn trả lời gì trên tờ khai TFN, chủ lao động đã có TFN của bạn chưa, và bạn kiếm được bao nhiêu trong kỳ lương đó.

- **Câu hỏi về cư trú.** Tờ khai hỏi bạn có phải là người cư trú về thuế ở Úc không. Du học sinh theo học khóa từ 6 tháng trở lên có thể là người cư trú về thuế. Câu trả lời của bạn làm thay đổi bảng trừ thuế mà chủ lao động áp dụng.
- **Câu hỏi về ngưỡng miễn thuế.** Nếu bạn có thể là người cư trú về thuế, bạn được đăng ký ngưỡng miễn thuế với một chủ lao động. Chủ lao động đó sẽ trừ thuế ít hơn. Người không cư trú về thuế không có ngưỡng miễn thuế.
- **TFN của bạn.** Nếu trong vòng 28 ngày kể từ khi bắt đầu làm mà bạn chưa đưa TFN cho chủ lao động, ATO cho biết họ buộc phải trừ thuế theo mức cao nhất cộng thêm Medicare levy.
- **Số tiền bạn kiếm được trong kỳ lương đó.** Tuần làm nhiều ca hơn thì bị trừ nhiều hơn, và không phải lúc nào cũng tăng theo đúng tỷ lệ.

## Vì sao mỗi kỳ lương bị trừ một khác?

Số thuế bị trừ được tính theo bảng. Các bảng này giả định rằng tiền lương tuần này là mức bạn kiếm được mỗi tuần trong cả năm. Nếu tuần này bạn làm 10 giờ và tuần sau làm 25 giờ, bảng sẽ coi đó là hai mức thu nhập năm rất khác nhau. Số thuế bị trừ thay đổi theo.

Với công việc casual, chuyện này là bình thường. Đừng so phiếu lương này với phiếu lương khác để đoán xem thuế có đúng không. Hãy nhìn tổng số trong vài tháng, hoặc chờ bảng kê thu nhập (income statement) sau ngày 30 tháng 6.

## Khi nào thì bị trừ quá ít?

Lý do hay gặp nhất là đăng ký ngưỡng miễn thuế với hai chủ lao động. ATO cho biết bạn thường chỉ nên đăng ký với một nơi trả lương, thường là nơi trả cho bạn nhiều nhất. Nếu đăng ký hai lần, mỗi chủ lao động sẽ trừ thuế như thể đó là công việc duy nhất của bạn. Tổng số thuế bị trừ không đủ, và bạn có thể phải đóng thêm thuế khi nộp hồ sơ.

Một lý do khác là khai mình là người cư trú về thuế trong khi thực ra không phải. Người không cư trú về thuế phải đóng thuế ngay từ đồng đầu tiên, nên nếu bị trừ theo mức của người cư trú thì có thể bị thiếu.

## Khi nào thì bị trừ quá nhiều?

Số thuế bị trừ cũng có thể cao hơn số thuế cuối cùng của bạn. Với du học sinh, những lý do thường gặp là:

- bạn không đưa TFN cho chủ lao động kịp lúc, nên có vài tuần bị trừ theo mức cao nhất
- bạn trả lời "không" ở câu hỏi cư trú trong khi bạn có thể là người cư trú về thuế
- bạn không đăng ký ngưỡng miễn thuế với chủ lao động nào
- bạn bắt đầu đi làm giữa năm, nên bảng trừ thuế giả định bạn có thu nhập cả năm, trong khi thực tế bạn không kiếm được số đó
- Medicare levy đã bị trừ, nhưng bạn không đủ điều kiện hưởng Medicare và có thể xin miễn

Không khoản nào trong số này là tiền mất đi. Nó sẽ được điều chỉnh trong hồ sơ thuế, nếu có phần phải trả lại cho bạn.

## Một ví dụ cụ thể

Giả sử một du học sinh có thể là người cư trú về thuế trong năm 2025-26 và kiếm được $30,000 từ một công việc trong cả năm. Theo thuế suất cho người cư trú năm 2025-26, $18,200 đầu tiên được miễn thuế, $11,800 tiếp theo bị tính 16%, tức là $1,888. Khoản giảm thuế cho thu nhập thấp $700 sau đó đưa số này xuống còn $1,188, chưa tính Medicare levy.

Nếu phiếu lương cho thấy cả năm đã bị trừ $2,000, phần chênh lệch $812 là điểm khởi đầu cho tiền hoàn thuế, trước khi tính Medicare levy. Nhưng nếu du học sinh này là người không cư trú về thuế, thuế trên cùng $30,000 là 30% ngay từ đồng đầu tiên, tức là $9,000. Khi đó, cũng những phiếu lương ấy lại có nghĩa là phải đóng thêm thuế. Đó là lý do câu trả lời về cư trú quan trọng đến vậy.

## Nên kiểm tra gì trên phiếu lương?

Fair Work cho biết phiếu lương nào cũng phải ghi lương gộp, lương thực nhận và từng khoản khấu trừ, kể cả thuế. Hãy kiểm tra:

- lương gộp trừ đi thuế bị trừ (và các khoản khấu trừ khác được ghi) bằng đúng lương thực nhận
- có dòng thuế hay không; phiếu lương bình thường mà không có dòng thuế nào thì nên hỏi lại
- chủ lao động đã có TFN của bạn trong hồ sơ
- bạn chỉ đăng ký ngưỡng miễn thuế với một công việc, nếu bạn có thể là người cư trú về thuế

## Việc nên làm tiếp theo

Giữ mọi phiếu lương trong một thư mục, chia theo từng chủ lao động. Nếu làm nhiều việc, hãy kiểm tra lại các tờ khai TFN. Sau ngày 30 tháng 6, chờ đến khi các bảng kê thu nhập hiện "Tax ready", rồi so tổng số thuế bị trừ với số trên phiếu lương. Nếu bạn cần giúp, hãy nhắn cho Student Visa Tax qua WhatsApp, chúng tôi sẽ kiểm tra số thuế bị trừ của bạn khi làm hồ sơ thuế.`,
    faq: [
      { q: 'Thuế bị trừ có giống với số thuế tôi phải đóng không?', a: 'Không. Đó là số ước tính được trừ từ mỗi kỳ lương. Hồ sơ thuế mới tính ra số thật cho cả năm và so sánh hai số này.' },
      { q: 'Tôi có thể đề nghị chủ lao động trừ thuế nhiều hơn không?', a: 'Được. Nếu bạn nghĩ mình đang bị trừ quá ít, ví dụ vì làm hai việc, bạn có thể đề nghị một chủ lao động trừ nhiều hơn.' },
      { q: 'Vì sao mấy tuần đầu tôi bị trừ thuế nhiều như vậy?', a: 'Nếu sau 28 ngày chủ lao động vẫn chưa có TFN của bạn, họ buộc phải trừ thuế theo mức cao nhất cộng thêm Medicare levy. Phần dư sẽ được tính lại trong hồ sơ thuế.' },
    ],
  },
  'income-statement-explained-international-students': {
    title: 'Bảng kê thu nhập là gì? Giải thích cho du học sinh',
    description: 'Bảng kê thu nhập (income statement) là bản ghi cả năm về lương và thuế từ mỗi chủ lao động. Cách tìm, cách đọc, và cách xử lý khi bị thiếu hoặc sai trước khi nộp hồ sơ.',
    answer: 'Bảng kê thu nhập là bản tổng kết cuối năm cho biết một chủ lao động đã trả bạn bao nhiêu và đã trừ bao nhiêu thuế. Chủ lao động báo cho ATO qua hệ thống trả lương, và bạn xem được trong dịch vụ trực tuyến của ATO qua myGov.',
    body: `Nếu bạn đi làm ở Úc trong năm tài chính, mỗi chủ lao động đều có bản ghi tiền lương của bạn. Bản ghi đó gọi là bảng kê thu nhập (income statement). Đây là tài liệu chính để làm hồ sơ thuế. Nhiều du học sinh chưa bao giờ thấy nó, vì nó không được gửi qua bưu điện hay email cho bạn. Nó nằm ở ATO.

## Bảng kê thu nhập là gì?

Bảng kê thu nhập cho biết, với một chủ lao động trong một năm tài chính, bạn được trả bao nhiêu và bị trừ bao nhiêu thuế. Nó thay cho bảng tóm tắt thu nhập (payment summary) bằng giấy trước đây. Nếu trong năm bạn làm ba việc, bạn có ba bảng kê thu nhập.

Hai con số quan trọng nhất là:

- lương gộp của bạn (tiền lương trước thuế)
- tổng số thuế bị trừ

Tiền super của bạn do quỹ super báo riêng cho ATO, và bạn có thể kiểm tra trong dịch vụ trực tuyến của ATO.

## Nó từ đâu mà có?

Chủ lao động không điền đơn nào vào cuối năm cả. Phần mềm trả lương của họ báo tiền lương và tiền thuế của bạn cho ATO mỗi lần trả lương. Hệ thống này gọi là Single Touch Payroll. Bảng kê thu nhập là tổng cộng dồn của các lần báo cáo đó.

Điều này có một cái lợi lớn cho du học sinh. Dù bạn đã chuyển thành phố, đổi việc hay mất liên lạc với chủ cũ, bản ghi tiền lương của bạn đã nằm sẵn ở ATO. Bạn không cần đi tìm chủ cũ để xin giấy tờ.

## Tìm bảng kê của bạn ở đâu?

Bạn xem bảng kê thu nhập trong dịch vụ trực tuyến của ATO. Đăng nhập myGov, kiểm tra ATO đã được liên kết, rồi mở mục bảng kê thu nhập. Nếu bạn làm hồ sơ với đại lý thuế, họ cũng xem được dữ liệu này qua quyền truy cập ATO của họ.

Nếu bạn sắp rời Úc, ATO cho biết khi bạn đề nghị lúc nghỉ việc để rời Úc, chủ lao động phải đưa cho bạn bảng tóm tắt thu nhập trong vòng 14 ngày. Điều này có ích nếu bạn muốn có một bản trước khi năm tài chính kết thúc.

## “Tax ready” nghĩa là gì?

Trong năm, các con số trên bảng kê thu nhập vẫn còn thay đổi. Sau ngày 30 tháng 6, chủ lao động hoàn tất bảng kê. Khi đó, trạng thái của nó chuyển thành “Tax ready”. ATO cho biết phần lớn chủ lao động hoàn tất trước ngày 14 tháng 7.

Hãy chờ đến khi mọi bảng kê thu nhập của bạn đều hiện “Tax ready” rồi mới nộp hồ sơ. Nếu nộp sớm hơn, các con số có thể vẫn thay đổi, và hồ sơ của bạn có thể không còn khớp với dữ liệu ATO đang giữ. Việc đó có thể dẫn đến chậm trễ hoặc phải sửa hồ sơ sau này.

Điều này quan trọng với du học sinh hơn nhiều người khác. Du học sinh thường làm hai, ba việc casual trong một năm, và mỗi chủ lao động hoàn tất theo lịch riêng. Có nơi đã “Tax ready” từ đầu tháng 7, có nơi lâu hơn. Hãy kiểm tra từng bảng kê, không chỉ bảng đầu tiên bạn thấy.

## Kiểm tra các con số thế nào?

Dành vài phút với phiếu lương và sao kê ngân hàng. Với mỗi chủ lao động, kiểm tra ba điều:

- **Lương gộp.** Cộng lương gộp trên các phiếu lương trong năm. Tổng này nên gần với số trên bảng kê. Nếu chênh nhiều, có thể bị sót một kỳ lương hoặc báo cáo bị sai.
- **Thuế bị trừ.** So tổng số với phiếu lương. Nếu cao hơn hoặc thấp hơn nhiều so với bạn nghĩ, hãy xem lại tờ khai TFN cho công việc đó.
- **Tên chủ lao động.** Một số doanh nghiệp báo cáo dưới tên công ty mà bạn không nhận ra. Hãy đối chiếu với số ABN trên phiếu lương.

## Nếu thiếu bảng kê của một chủ lao động thì sao?

Thiếu bảng kê thu nhập là chuyện thường gặp, và có vài lý do:

- chủ lao động chưa hoàn tất, nên chờ thêm một thời gian có thể sẽ thấy
- chủ lao động báo cáo sai tên, ngày sinh hoặc TFN của bạn, nên bản ghi không được gắn với bạn
- bạn được trả ngoài hệ thống trả lương, ví dụ nhận tiền mặt, nên không có báo cáo nào

Dù là trường hợp nào, thu nhập đó vẫn phải chịu thuế. ATO cho biết tiền lương, tiền tip và các khoản được trả cho công sức của bạn đều là thu nhập chịu thuế (assessable income), và thu nhập bằng tiền mặt phải được khai. Phiếu lương và sao kê ngân hàng sẽ là bằng chứng của bạn.

Nếu chủ lao động dùng sai tên hoặc sai TFN, hãy liên hệ và đề nghị họ sửa trong hệ thống trả lương. Khi họ sửa xong, bảng kê sẽ hiện trong tài khoản ATO của bạn. Hãy đưa thông tin của bạn đúng y như trên thư báo TFN.

## Nếu các con số bị sai thì sao?

Hãy đề nghị chủ lao động sửa. Chỉ chủ lao động mới sửa được báo cáo lương của họ. Gửi đề nghị bằng văn bản, kèm phiếu lương có con số đúng.

Nếu chủ lao động không trả lời, đừng lặng lẽ nộp hồ sơ dùng những con số khác. Hãy trao đổi với đại lý thuế của bạn về cách khai đúng thu nhập kèm bằng chứng. Nên nhớ cá nhân thường có 2 năm kể từ thông báo tính thuế (notice of assessment) để sửa hồ sơ, nên vẫn có thể sửa sau nếu chủ lao động điều chỉnh bản ghi sau khi bạn đã nộp.

Bảng kê thu nhập mà du học sinh hay quên nhất là những việc ngắn: hai tuần làm sự kiện, vài ca làm thử có trả lương, một trung tâm dạy kèm vào mùa hè. Trước khi nộp hồ sơ, hãy liệt kê mọi nơi đã trả tiền cho bạn từ 1 tháng 7 đến 30 tháng 6, rồi đối chiếu từng nơi với một bảng kê. Quên một công việc có thể khiến bạn phải đóng thuế sau này, hoặc mất luôn số thuế đã bị trừ mà lẽ ra bạn được nhận lại.

## Danh sách việc cần làm

- Đăng nhập myGov và mở các bảng kê thu nhập trong ATO.
- Liệt kê mọi chủ lao động trong năm tài chính.
- Chờ đến khi từng bảng kê hiện “Tax ready”.
- So lương gộp và thuế bị trừ với phiếu lương.
- Đề nghị chủ lao động sửa sai bằng văn bản.
- Giữ phiếu lương và sao kê ngân hàng cùng hồ sơ thuế.`,
    faq: [
      { q: 'Chủ lao động có gửi bảng kê thu nhập cho tôi không?', a: 'Thường là không. Bảng kê được báo cho ATO và bạn xem trong dịch vụ trực tuyến của ATO qua myGov, hoặc đại lý thuế xem giúp bạn.' },
      { q: 'Tôi có được nộp hồ sơ trước khi bảng kê hiện “Tax ready” không?', a: 'Được, nhưng nên chờ. Các con số vẫn có thể thay đổi, và hồ sơ không khớp với dữ liệu của ATO có thể bị chậm hoặc phải sửa lại.' },
      { q: 'Chủ cũ của tôi đã đóng cửa. Bảng kê thu nhập của tôi có mất không?', a: 'Không, nếu trong năm họ đã báo cáo qua hệ thống trả lương. Bản ghi đã nằm ở ATO. Nếu chưa từng được báo cáo, phiếu lương và sao kê ngân hàng là bằng chứng của bạn.' },
    ],
  },
  'what-is-the-ato-international-students': {
    title: 'ATO là gì? Hướng dẫn dễ hiểu cho du học sinh',
    description: 'ATO quản lý thuế và super. ATO làm gì cho du học sinh, biết tiền lương của bạn bằng cách nào, khi nào liên hệ bạn, và cách nhận ra cuộc gọi giả danh ATO.',
    answer: 'ATO (Australian Taxation Office) là cơ quan Chính phủ Úc quản lý hệ thống thuế và super. Với du học sinh, ATO cấp TFN, nhận báo cáo về tiền lương, xử lý hồ sơ thuế và giải quyết việc rút super khi bạn rời Úc.',
    body: `Khi bắt đầu đi làm ở Úc, gần như ngay lập tức bạn sẽ nghe đến ATO. Chủ lao động hỏi mã số thuế của bạn. Phiếu lương ghi tiền thuế đã được gửi cho ATO. Bạn bè thì nói chuyện nộp hồ sơ cho ATO. Bài này giải thích ATO là gì và liên quan thế nào đến cuộc sống du học của bạn.

## ATO là gì?

ATO là Australian Taxation Office, cơ quan thuế của Úc. Đây là cơ quan nhà nước thu thuế và quản lý hệ thống quỹ hưu trí (superannuation, hay super). ATO tách biệt với Bộ Nội vụ (Home Affairs), nơi phụ trách visa, và với Services Australia, nơi phụ trách Medicare.

ATO không quyết định gì về visa của bạn. ATO chỉ lo thu nhập, thuế và super của bạn.

## ATO làm gì cho du học sinh?

Trong thời gian ở Úc, phần lớn du học sinh làm việc với ATO theo bốn cách:

- **Cấp mã số thuế (TFN).** Bạn xin trực tuyến miễn phí nếu visa cho phép đi làm và bạn đang ở Úc. TFN được gửi qua bưu điện đến địa chỉ của bạn ở Úc.
- **Nhận báo cáo về tiền lương.** Chủ lao động báo tiền lương và thuế bị trừ của bạn vào mỗi ngày trả lương, và quỹ super báo các khoản đóng super.
- **Xử lý hồ sơ thuế.** Sau ngày 30 tháng 6 bạn nộp hồ sơ thuế. ATO tính thuế, gửi thông báo tính thuế (notice of assessment), và chuyển tiền hoàn thuế (nếu có) vào tài khoản ngân hàng ở Úc của bạn.
- **Tham gia vào việc rút super khi bạn rời Úc.** Sau khi visa hết hiệu lực và bạn đã rời Úc, bạn có thể xin khoản super khi rời Úc (DASP). Hệ thống DASP trực tuyến của ATO là miễn phí.

## ATO biết bạn kiếm được bao nhiêu bằng cách nào?

Mỗi lần trả lương, chủ lao động báo cho ATO. Hệ thống này gọi là Single Touch Payroll. Đến cuối năm, ATO đã có sẵn bản ghi tiền lương và tiền thuế của bạn từ mỗi chủ lao động. Bản ghi này là bảng kê thu nhập (income statement) của bạn.

Ngân hàng cũng báo tiền lãi trên các tài khoản ở Úc của bạn. Quỹ super báo số tiền chủ lao động đã đóng vào quỹ. Vì vậy ATO thường phát hiện được khi hồ sơ thuế thiếu một công việc hoặc thiếu tiền lãi.

## Bạn làm việc với ATO bằng cách nào?

Phần lớn du học sinh dùng một trong những cách sau:

- **myGov.** Tạo tài khoản myGov và liên kết với ATO. Sau đó bạn xem được bảng kê thu nhập, theo dõi super, cập nhật thông tin và nộp hồ sơ bằng myTax.
- **Ứng dụng ATO (ATO app).** Cho bạn dùng các dịch vụ trực tuyến tương tự trên điện thoại.
- **Một đại lý thuế đã đăng ký.** Đại lý thuế có thể nộp hồ sơ và làm việc với ATO thay bạn.

Bạn không bắt buộc chỉ chọn một cách. Nhiều du học sinh dùng myGov để kiểm tra thông tin trong năm và nhờ đại lý thuế làm hồ sơ. Nếu bạn dùng đại lý thuế, ATO có thể trao đổi với họ về hồ sơ của bạn, điều này rất tiện khi bạn bận học hoặc đã rời Úc.

## Khi nào ATO liên hệ bạn?

Nhiều du học sinh không bao giờ nhận được gì từ ATO ngoài thông báo tính thuế. ATO có thể liên hệ nếu cần thêm thông tin để xử lý hồ sơ, nếu một con số trong hồ sơ không khớp với dữ liệu của ATO, hoặc nếu bạn còn nợ thuế.

Thư thường được gửi qua bưu điện đến địa chỉ ATO đang có. Nếu chuyển nhà, hãy cập nhật địa chỉ. Một lá thư bạn không bao giờ thấy vẫn có thể có hậu quả.

Nếu ATO yêu cầu thông tin, hãy trả lời trước hạn ghi trong thư. Giữ lại một bản những gì bạn gửi. Phần lớn yêu cầu rất đơn giản, như một bản phiếu lương hoặc hóa đơn cho một khoản khấu trừ. Trả lời nhanh thường là cách nhanh nhất để hồ sơ được xử lý xong.

## Nhận ra liên hệ giả danh ATO thế nào?

Kẻ lừa đảo thường giả danh ATO, và du học sinh hay bị nhắm tới. ATO cho biết họ sẽ không bao giờ:

- tự gửi cho bạn email hoặc tin nhắn có đường link hay mã QR khi bạn không yêu cầu
- hỏi thông tin cá nhân của bạn qua email hoặc SMS
- đe dọa bắt giữ bạn hoặc bắt bạn phải giữ máy
- đòi trả tiền bằng thẻ quà tặng, tiền mã hóa, hoặc chuyển vào tài khoản cá nhân hay tài khoản ở nước ngoài
- đe dọa hủy TFN của bạn hoặc đòi phí để bạn được nhận tiền hoàn thuế
- liên hệ bạn bằng tin nhắn riêng trên mạng xã hội

Nếu không chắc một cuộc liên hệ có thật hay không, đừng trả lời. ATO cho biết bạn có thể gọi 1800 008 540 để kiểm tra. Bạn cũng có thể tự đăng nhập myGov xem tài khoản ATO của mình, hoặc hỏi đại lý thuế.

## Rời Úc rồi có còn làm việc với ATO không?

Có. Nếu bạn đã đi làm, có lẽ bạn vẫn cần nộp hồ sơ thuế sau ngày 30 tháng 6, kể cả khi đã về nước. Bạn có thể nộp từ nước ngoài bằng myTax, qua một đại lý thuế đã đăng ký, hoặc bằng giấy. Hãy cập nhật cài đặt đăng nhập myGov trước khi đi để vẫn dùng được khi ở nước ngoài.

Việc rút super cũng liên quan đến ATO sau khi bạn rời Úc. Nếu quỹ không trả được cho bạn, hoặc đã sáu tháng kể từ khi visa hết hiệu lực và bạn đã rời Úc, tiền super sẽ được chuyển cho ATO. Bạn vẫn xin rút được.

## Danh sách việc cần làm

- Xin TFN khi bạn có quyền đi làm, và giữ kín số này.
- Tạo tài khoản myGov và liên kết với ATO.
- Luôn cập nhật địa chỉ, email và thông tin ngân hàng.
- Kiểm tra mọi cuộc gọi hay tin nhắn tự xưng là ATO trước khi làm gì.
- Sau ngày 30 tháng 6, nộp hồ sơ thuế nếu cần, khi các bảng kê thu nhập đã “Tax ready”.`,
    faq: [
      { q: 'ATO có phải là cơ quan di trú không?', a: 'Không. ATO quản lý thuế và super. Visa do Bộ Nội vụ (Department of Home Affairs) phụ trách.' },
      { q: 'Xin TFN từ ATO có mất tiền không?', a: 'Không. Xin TFN là miễn phí. Đừng bao giờ trả tiền cho trang web nào để nộp đơn giúp bạn.' },
      { q: 'Có người gọi nói tôi nợ tiền ATO và phải trả ngay hôm nay. Tôi nên làm gì?', a: 'Hãy cúp máy và đừng trả tiền. ATO cho biết bạn có thể gọi 1800 008 540 để kiểm tra, hoặc đăng nhập myGov để xem tài khoản ATO thật của mình.' },
    ],
  },
  'gross-pay-vs-net-pay-student-visa': {
    title: 'Lương gộp và lương thực nhận khi có visa du học: đọc phiếu lương',
    description: 'Lương gộp là trước thuế, lương thực nhận là số về tài khoản. Cách đọc từng dòng trên phiếu lương, vì sao super được đóng thêm, và hồ sơ thuế dùng con số nào.',
    answer: 'Lương gộp (gross pay) là tổng số bạn kiếm được trước khi bị trừ bất cứ khoản nào. Lương thực nhận (net pay) là phần còn lại sau thuế và các khoản khấu trừ khác, và là số tiền được chuyển vào tài khoản ngân hàng của bạn. Super do chủ lao động đóng thêm ngoài lương gộp, vào quỹ super của bạn.',
    body: `Phiếu lương đầu tiên ở Úc có thể khá khó hiểu. Có nhiều con số, và số tiền về tài khoản ngân hàng lại không phải số ở dòng trên cùng. Bài này giải thích sự khác nhau giữa lương gộp và lương thực nhận, super nằm ở đâu, và vì sao điều này quan trọng khi khai thuế.

## Lương gộp là gì?

Lương gộp (gross pay) là toàn bộ số tiền bạn kiếm được trong kỳ lương, trước mọi khoản khấu trừ. Nó gồm tiền giờ làm thông thường theo mức lương giờ, cộng với mọi khoản lương phụ trội (penalty rates), khoản cộng thêm (loadings), phụ cấp (allowances) và tiền làm thêm giờ (overtime) mà bạn được trả.

Fair Work cho biết phiếu lương của bạn phải ghi lương gộp, mức lương giờ thông thường và số giờ làm theo mức đó, cùng mọi khoản loading, phụ cấp hay lương phụ trội đã trả.

## Lương thực nhận là gì?

Lương thực nhận (net pay) là lương gộp trừ đi các khoản bị khấu trừ. Với phần lớn du học sinh, khoản khấu trừ chính là thuế bị trừ. Một số người còn có các khoản khác mà họ đã đồng ý, như phí công đoàn hoặc salary sacrifice. Phiếu lương phải ghi từng khoản khấu trừ.

Lương thực nhận là số tiền chủ lao động chuyển vào tài khoản ngân hàng của bạn. Đôi khi nó được gọi là take-home pay.

## Super nằm ở đâu?

Super không bị trừ vào lương của bạn. Chủ lao động đóng super thêm ngoài tiền lương, vào một quỹ super đứng tên bạn. ATO cho biết nhìn chung mọi nhân viên đều đủ điều kiện, kể cả người làm bán thời gian, casual và người tạm trú. Mức đóng là 12%.

Phiếu lương phải ghi số super chủ lao động đã đóng cho bạn và tên quỹ. Super không làm thay đổi lương thực nhận. Nếu một phiếu lương có vẻ trừ super khỏi tiền lương để ra lương thực nhận, hãy hỏi chủ lao động.

## Một ví dụ cụ thể

Đây là một phiếu lương giả định, đơn giản, cho một tuần làm casual:

- Giờ làm thông thường: 15 giờ x $30.00 = $450.00
- Giờ làm Chủ nhật có lương phụ trội: 2 giờ x $45.00 = $90.00
- **Lương gộp: $540.00**
- Thuế bị trừ: $45.00
- **Lương thực nhận: $495.00** (chuyển vào tài khoản ngân hàng)
- Super: $64.80 (12% của $540.00, đóng vào quỹ super)

Trong ví dụ này, giờ làm có lương phụ trội là giờ làm thông thường, nên vẫn được tính super. Làm thêm giờ thì khác: ATO cho biết tiền làm thêm giờ nhìn chung không nằm trong phần thu nhập dùng để tính super.

Các mức lương ở trên chỉ để làm ví dụ. Mức lương thật của bạn tùy vào award hoặc thỏa thuận lao động. Bạn có thể kiểm tra bằng công cụ tính lương (Pay Calculator) của Fair Work.

## Hồ sơ thuế dùng con số nào?

Hồ sơ thuế dùng lương gộp, không phải lương thực nhận. ATO tính thuế trên thu nhập gộp trong năm của bạn. Sau đó trừ đi số thuế đã bị trừ. Kết quả là tiền hoàn thuế, hoặc số bạn còn phải đóng.

Nhiều du học sinh bất ngờ vì điều này khi theo dõi thu nhập bằng ứng dụng ngân hàng. Ngân hàng chỉ hiện lương thực nhận, nên thu nhập cả năm trông nhỏ hơn thực tế. Bảng kê thu nhập (income statement) mới hiện con số gộp.

Điều này cũng quan trọng khi bạn tự lưu giấy tờ. Nếu bạn cộng các khoản tiền vào tài khoản để kiểm tra thu nhập, hãy nhớ bạn đang cộng số thực nhận. Muốn so với bảng kê thu nhập, hãy cộng lương gộp trên các phiếu lương.

## Vì sao hai du học sinh cùng lương gộp lại nhận về khác nhau?

Lương gộp phụ thuộc vào công việc. Lương thực nhận còn phụ thuộc vào tình hình thuế của bạn. Hai du học sinh có cùng lương gộp có thể nhận về rất khác nhau vì:

- **Cư trú về thuế.** Du học sinh theo học khóa từ 6 tháng trở lên có thể là người cư trú về thuế và có thể đăng ký ngưỡng miễn thuế. Người không cư trú về thuế phải đóng thuế ngay từ đồng đầu tiên.
- **Ngưỡng miễn thuế.** Chỉ nên đăng ký với một chủ lao động.
- **TFN.** Nếu sau 28 ngày chủ lao động vẫn chưa có TFN, thuế bị trừ theo mức cao nhất cộng thêm Medicare levy.
- **Medicare levy.** Bằng 2% thu nhập chịu thuế. Nhiều du học sinh không đủ điều kiện hưởng Medicare và có thể xin miễn bằng giấy Medicare Entitlement Statement.

Một số điều được điều chỉnh ngay trong năm. Những điều khác chỉ được điều chỉnh khi bạn nộp hồ sơ thuế.

Ví dụ, thuế bị trừ theo mức cao nhất trong mấy tuần đầu, khi chủ lao động chưa có TFN, làm lương thực nhận lúc đó ít hơn. Phần thuế dư sẽ được tính lại trong hồ sơ thuế, nếu có phần phải trả lại cho bạn. Phiếu lương cho biết đã bị trừ bao nhiêu. Nó không cho biết số đó có đúng với cả năm của bạn hay không.

## Kiểm tra lương gộp có đúng không thế nào?

Lương thực nhận chỉ đúng khi lương gộp đúng. Mỗi tháng một lần, hãy lấy một phiếu lương và kiểm tra:

- nhân số giờ làm thông thường với mức lương giờ
- cộng thêm lương phụ trội cho cuối tuần, ngày lễ, ca khuya hoặc ca sáng sớm
- cộng thêm các khoản phụ cấp và tiền làm thêm giờ
- so tổng số với lương gộp trên phiếu lương

Nếu không khớp, hãy hỏi quản lý hoặc bộ phận trả lương bằng văn bản. Fair Work cho biết người có visa có quyền tại nơi làm việc như mọi nhân viên khác, và bạn có thể liên hệ Thanh tra Công bằng Lao động (Fair Work Ombudsman) qua số 13 13 94 để được giúp.

## Danh sách việc cần làm

- Tìm lương gộp, thuế bị trừ, lương thực nhận và super trên mỗi phiếu lương.
- Kiểm tra lương gộp trừ các khoản khấu trừ bằng lương thực nhận.
- Kiểm tra super được ghi là đóng thêm ngoài lương, có tên quỹ.
- Mỗi tháng tự tính lại lương gộp từ số giờ làm.
- Giữ mọi phiếu lương để dùng khi khai thuế.`,
    faq: [
      { q: 'Super có nằm trong lương thực nhận không?', a: 'Không. Super do chủ lao động đóng thêm ngoài tiền lương, vào quỹ super của bạn. Nó không nằm trong khoản chuyển vào tài khoản ngân hàng.' },
      { q: 'Tôi khai lương gộp hay lương thực nhận trong hồ sơ thuế?', a: 'Lương gộp. Số thuế đã bị trừ sau đó được tính vào số thuế bạn phải đóng cho cả năm.' },
      { q: 'Bao lâu thì tôi phải nhận được phiếu lương?', a: 'Fair Work cho biết trong vòng 1 ngày làm việc sau ngày trả lương. Phiếu lương có thể bằng giấy hoặc bản điện tử.' },
    ],
  },
  'tax-on-tips-student-visa': {
    title: 'Tiền tip có phải đóng thuế khi có visa du học?',
    description: 'Ở Úc, tiền tip là thu nhập chịu thuế, dù qua thẻ hay tiền mặt. Tip đến tay du học sinh qua bảng lương hoặc trực tiếp, phải khai gì, và cách ghi chép đơn giản.',
    answer: 'Có. ATO cho biết tiền tip và tiền thưởng của khách (gratuities) là thu nhập chịu thuế, nên phải khai trong hồ sơ thuế dù bạn nhận qua thẻ, qua bảng lương hay bằng tiền mặt. Tip qua thẻ được trả qua bảng lương thường đã được báo cáo; tip tiền mặt bạn tự giữ thì bạn tự khai.',
    body: `Nhiều du học sinh làm ở quán cà phê, nhà hàng, quán bar và khách sạn. Tiền tip có thể làm thu nhập tăng thêm đáng kể, nhất là vào những cuối tuần đông khách. Câu hỏi hay gặp là tiền tip có bị tính thuế không. Câu trả lời ngắn gọn là có. Bài này giải thích thuế áp dụng thế nào và bạn cần làm gì.

## Ở Úc, tiền tip có phải chịu thuế không?

Có. ATO cho biết thu nhập chịu thuế (assessable income) gồm tiền lương, tiền tip, tiền thưởng của khách và các khoản khác được trả cho công sức của bạn. ATO cũng cho biết thu nhập bằng tiền mặt phải được khai. Không có quy định riêng nào cho du học sinh, và không có khoản nhỏ nào được miễn thuế chỉ vì đó là tiền tip.

Tiền tip được cộng vào các khoản thu nhập khác trong năm. Nó bị tính thuế theo cùng thuế suất với tiền lương. Trong năm 2025-26, nếu bạn có thể là người cư trú về thuế, ngưỡng miễn thuế $18,200 áp dụng cho tổng thu nhập của bạn, tính cả tiền tip. Nếu bạn là người không cư trú về thuế, thuế áp dụng ngay từ đồng đầu tiên.

## Tiền tip đến tay bạn bằng cách nào?

Cách tiền tip đến tay bạn quyết định ai báo cáo khoản đó. Thường có hai cách.

- **Qua bảng lương.** Tip qua thẻ, phí phục vụ (service charge), hoặc quỹ tip chung được nơi làm trả qua hệ thống trả lương. Các khoản này hiện trên phiếu lương, có trừ thuế, và nằm trong bảng kê thu nhập (income statement) của bạn.
- **Trực tiếp.** Tiền mặt khách đưa cho bạn, hoặc tiền mặt chia nhau giữa nhân viên cuối ca. Không ai báo cáo khoản này thay bạn. Không có thuế bị trừ, và nó không có trong bảng kê thu nhập.

Cả hai loại đều là thu nhập. Khác nhau chỉ ở chỗ ai ghi nhận nó.

Có nơi dùng cả hai cách. Ví dụ, tip qua thẻ được trả qua bảng lương mỗi hai tuần, trong khi nhân viên còn chia nhau hũ tiền mặt cuối mỗi tối. Khi đó, một phần tiền tip của bạn đã được báo cáo, phần còn lại thì chưa. Hãy ghi chép riêng hai phần này.

## Tip qua bảng lương thì cần làm gì?

Nếu tiền tip được trả qua bảng lương, phần lớn việc đã được làm sẵn. Hãy xem một phiếu lương để chắc là tiền tip có được ghi. Fair Work cho biết phiếu lương phải ghi lương gộp và mọi khoản thanh toán khác, nên tiền tip do chủ lao động trả phải hiện trên đó.

Khi khai thuế, các khoản tip này đã nằm trong con số trên bảng kê thu nhập. Đừng cộng thêm lần nữa.

## Tip tiền mặt thì cần làm gì?

Bạn tự cộng tip tiền mặt vào hồ sơ thuế. Muốn khai cho chính xác, bạn cần có ghi chép. Không cần ghi từng đồng xu. Với phần lớn du học sinh, một ghi chú đơn giản mỗi tuần là đủ:

- tuần hoặc ngày
- nơi làm
- tổng tiền tip mặt bạn giữ lại

Ghi chú trên điện thoại là được. Hãy ghi mỗi tuần khi còn nhớ. Đến tháng 10 mới cố đoán tiền tip của cả năm thì khó hơn nhiều, và đoán thì rất dễ sai.

Nếu bạn gửi tiền tip mặt vào tài khoản ngân hàng, sao kê ngân hàng cũng giúp được. Riêng nó thì chưa phải là bản ghi đầy đủ, vì bạn có thể đã tiêu một phần tiền mặt trước khi gửi. Ghi chú hằng tuần cùng với các khoản gửi vào ngân hàng sẽ cho một bức tranh rõ ràng.

## Một ví dụ cụ thể

Giả sử một du học sinh có thể là người cư trú về thuế trong năm 2025-26. Cô ấy có $21,000 tiền lương từ một nhà hàng, có trừ thuế, và giữ khoảng $40 tip tiền mặt mỗi tuần trong 40 tuần. Tức là $1,600 tip tiền mặt.

Tổng thu nhập trong năm của cô ấy là $22,600. Theo thuế suất cho người cư trú năm 2025-26, $18,200 đầu tiên được miễn thuế. $4,400 còn lại bị tính 16%, tức là $704, và khoản giảm thuế cho thu nhập thấp có thể giảm thêm số này. Tip tiền mặt chỉ chiếm một phần nhỏ trong số thuế, nhưng vẫn phải được khai.

## Nếu chưa khai tiền tip thì sao?

Nếu bạn quên khai tiền tip trong hồ sơ đã nộp, bạn có thể đề nghị sửa hồ sơ. ATO cho biết cá nhân thường có 2 năm kể từ ngày sau khi thông báo tính thuế (notice of assessment) được gửi. Tự sửa vẫn tốt hơn là chờ ATO phát hiện.

Thu nhập trong ngành nhà hàng, khách sạn là lĩnh vực ATO để ý. Các khoản gửi vào ngân hàng và sổ sách của nơi làm có thể cho thấy thu nhập chưa được khai.

Nếu bị phát hiện có thu nhập chưa khai, bạn có thể phải đóng phần thuế còn thiếu, cộng tiền lãi, và có thể bị phạt. Khai tiền tip ngay từ đầu sẽ tránh được chuyện này. Thêm một dòng vào hồ sơ thuế cũng đơn giản hơn nhiều so với sửa lại sau.

## Tiền tip có được tính super không?

Tùy vào cách tiền tip được trả. Tiền mặt khách đưa cho bạn không phải do chủ lao động trả, nên không được đóng super. Với tip trả qua bảng lương, có được đóng super hay không có thể tùy vào cách khoản đó được phân loại, điều mà phiếu lương có thể không giải thích. Nếu không chắc, hãy hỏi bộ phận trả lương bằng văn bản, rồi kiểm tra quỹ super để xem đã được đóng bao nhiêu.

## Danh sách việc cần làm

- Tìm tiền tip trên phiếu lương. Nếu có, khoản đó đã được báo cáo.
- Ghi chú hằng tuần số tip tiền mặt bạn giữ lại.
- Cộng tổng tip tiền mặt vào hồ sơ thuế.
- Giữ giấy tờ trong 5 năm kể từ khi nộp hồ sơ.
- Nếu đã quên khai tiền tip trong hồ sơ năm trước, hãy hỏi về việc sửa hồ sơ.

Nếu bạn cần giúp với hồ sơ thuế có tip tiền mặt, hãy nhắn cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Có mức tiền tip nào được miễn thuế không?', a: 'Không. Tiền tip là một phần thu nhập chịu thuế của bạn. Nếu bạn có thể là người cư trú về thuế, ngưỡng miễn thuế áp dụng cho tổng thu nhập, không riêng cho tiền tip.' },
      { q: 'Tip qua thẻ đã có trên phiếu lương. Tôi có phải cộng thêm không?', a: 'Không. Tip trả qua bảng lương đã nằm trong bảng kê thu nhập. Chỉ cộng những khoản tip chưa được báo cáo, như tiền mặt bạn tự giữ.' },
      { q: 'Tôi nên giữ ghi chép tiền tip bao lâu?', a: 'Giữ cùng hồ sơ thuế trong 5 năm kể từ ngày nộp hồ sơ.' },
    ],
  },
  'tax-after-leaving-australia-international-students': {
    title: 'Thuế sau khi rời Úc: du học sinh vẫn còn phải làm gì',
    description: 'Học xong không có nghĩa là hồ sơ thuế đã đóng. Hồ sơ thuế, rút super, ABN và thông tin liên lạc mà du học sinh vẫn cần lo sau khi rời Úc.',
    answer: 'Rời Úc không chấm dứt nghĩa vụ thuế của bạn. Nếu đã đi làm, có lẽ bạn vẫn cần nộp hồ sơ thuế sau ngày 30 tháng 6, và có thể nộp từ nước ngoài. Bạn cũng có thể rút super theo diện DASP khi visa đã hết hiệu lực và bạn đã rời Úc.',
    body: `Khóa học kết thúc, bạn thu dọn hành lý và bay về nước. Thuế và super ở Úc của bạn thì không kết thúc cùng ngày đó. Tin vui là gần như mọi việc đều làm được từ nước ngoài. Bài này liệt kê những việc vẫn còn dang dở sau khi bạn rời Úc và nên làm theo thứ tự nào.

## Những việc gì còn dang dở khi bạn rời Úc?

Phần lớn du học sinh đã đi làm có đến bốn việc riêng biệt. Xong một việc không có nghĩa là xong các việc còn lại.

- nộp hồ sơ thuế cho mỗi năm tài chính bạn có thu nhập ở Úc
- rút super theo diện khoản super khi rời Úc (DASP)
- hủy ABN, nếu bạn có ABN để giao đồ ăn hoặc làm các việc theo hợp đồng khác
- luôn cập nhật thông tin liên lạc và ngân hàng với ATO và các quỹ super

## Bạn có còn phải nộp hồ sơ thuế không?

ATO cho biết nếu bạn đã đi làm, có lẽ bạn sẽ cần nộp hồ sơ thuế sau ngày 30 tháng 6, và bạn có thể nộp từ nước ngoài. Năm tài chính tính từ 1 tháng 7 đến 30 tháng 6. Vì vậy nếu bạn rời Úc vào tháng 12, hồ sơ cuối cùng sẽ tính từ 1 tháng 7 đến tháng 12, và được nộp sau ngày 30 tháng 6 kế tiếp.

Bạn có thể nộp từ ngoài nước Úc bằng myTax qua myGov, qua một đại lý thuế đã đăng ký, hoặc bằng giấy. Nếu dùng myTax, hãy cập nhật cài đặt đăng nhập myGov trước khi đi để vẫn đăng nhập được khi ở nước ngoài. Thời gian nộp hồ sơ thông thường là từ 1 tháng 7 đến 31 tháng 10. Đại lý thuế đã đăng ký có thể cho bạn hạn nộp muộn hơn.

Nếu bạn ở lại Úc sau khóa học, ví dụ với visa tốt nghiệp 485, hồ sơ thuế vẫn làm như vậy. Bạn nộp hồ sơ cho mỗi năm tài chính có thu nhập. Khác nhau chỉ ở thời điểm nộp hồ sơ cuối cùng.

## Có thể nộp hồ sơ trước khi rời Úc không?

ATO cho biết nếu bạn rời Úc hẳn, bạn có thể nộp trước ngày 30 tháng 6, nhưng chỉ bằng giấy, và chậm hơn. Với phần lớn du học sinh, dễ hơn là chờ đến sau ngày 30 tháng 6, khi các bảng kê thu nhập đã “Tax ready”, rồi nộp trực tuyến.

Trước khi đi, hãy xin mỗi chủ lao động một bảng tóm tắt thu nhập (payment summary). ATO cho biết nếu bạn đề nghị khi nghỉ việc để rời Úc, chủ lao động phải đưa cho bạn trong vòng 14 ngày. Đây là giấy tờ hữu ích nếu sau này có gì bị thiếu.

## Rút super thế nào?

Bạn có thể xin DASP khi đáp ứng tất cả các điều sau: bạn đã đi làm bằng visa tạm trú (không phải visa 405 hoặc 410), visa của bạn đã hết hiệu lực, bạn đã rời Úc, và bạn không còn visa nào khác đang có hiệu lực. Bạn có thể bắt đầu điền đơn trước khi đi, nhưng không thể nộp khi visa tạm trú vẫn còn hiệu lực. Hệ thống DASP trực tuyến của ATO là miễn phí.

Khoản tiền này bị tính thuế. Nếu bạn chưa từng có visa working holiday, phần đã chịu thuế (taxed element) bị tính thuế 35%. Nếu bạn làm nhiều việc, có thể bạn có nhiều quỹ, nên hãy kiểm tra từng quỹ.

## Một ví dụ cụ thể

Giả sử một bạn đã tốt nghiệp rời Úc với $4,000 trong một quỹ super, toàn bộ là phần đã chịu thuế, và bạn ấy chưa từng có visa working holiday. Sau khi visa hết hiệu lực, bạn ấy xin DASP. Thuế 35% là $1,400, nên số tiền nhận được là $2,600.

Nếu bạn ấy không làm gì, quỹ sẽ chuyển số super này cho ATO 6 tháng sau khi bạn ấy rời Úc và visa hết hiệu lực. Tiền vẫn là của bạn ấy và vẫn xin rút được. Chỉ là thêm một bước nữa.

Nếu có hai quỹ từ hai công việc, bạn ấy sẽ nộp đơn cho từng quỹ. Trước khi đi, bạn ấy có thể đăng nhập dịch vụ trực tuyến của ATO để tìm các tài khoản bị thất lạc hoặc tài khoản thừa, để không bỏ sót gì. Ghi lại tên từng quỹ và số thành viên chỉ mất vài phút mà giúp việc rút tiền sau này dễ hơn nhiều.

## Có cần hủy ABN không?

Nếu bạn có ABN, ví dụ để giao đồ ăn, hãy hủy khi ngừng công việc đó. Cơ quan Đăng ký Doanh nghiệp Úc (ABR) cho biết phải hủy trong vòng 28 ngày khi công việc kinh doanh đã dừng. Hủy ABN không làm mất nghĩa vụ nộp hồ sơ thuế cuối cùng, và mọi thu nhập ABN vẫn phải khai trong đó.

## Đừng đóng tài khoản ngân hàng

Tiền hoàn thuế được trả vào tài khoản ngân hàng ở Úc. Nhiều du học sinh đóng tài khoản vào tuần cuối cùng ở Úc. Việc này có thể làm tiền hoàn thuế bị chậm hàng tháng. Hãy giữ ít nhất một tài khoản ở Úc cho đến khi đã nhận được cả tiền hoàn thuế và tiền super.

Hãy cập nhật địa chỉ, email và số điện thoại với ATO và với từng quỹ super. Cập nhật với ATO không có nghĩa là quỹ cũng được cập nhật.

Nếu bạn có ABN, hãy giữ cả giấy tờ của công việc đó. ATO cho biết phải giữ chứng từ bằng văn bản trong 5 năm kể từ khi nộp hồ sơ. Một thư mục đơn giản gồm phiếu lương, hóa đơn bạn xuất và biên lai là đủ, và có thể lưu bản điện tử.

## Danh sách việc cần làm trước khi bay

- Cập nhật cài đặt đăng nhập myGov để dùng được ở nước ngoài.
- Xin mỗi chủ lao động một bảng tóm tắt thu nhập.
- Ghi lại mọi chủ lao động và quỹ super trong năm.
- Cập nhật thông tin liên lạc với ATO và từng quỹ.
- Giữ lại một tài khoản ngân hàng ở Úc.
- Hủy ABN nếu bạn có.
- Sau khi visa hết hiệu lực, nộp đơn xin DASP.
- Sau ngày 30 tháng 6, nộp hồ sơ thuế cuối cùng khi các bảng kê đã “Tax ready”.

Nếu bạn muốn làm hồ sơ thuế cuối cùng từ nước ngoài, hãy nhắn cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tôi có thể nộp hồ sơ thuế cuối cùng khi đã về nước không?', a: 'Được. Bạn có thể nộp từ ngoài nước Úc bằng myTax, qua một đại lý thuế đã đăng ký, hoặc bằng giấy.' },
      { q: 'Tôi có thể rút super khi visa du học vẫn còn hiệu lực không?', a: 'Không. Bạn có thể bắt đầu điền đơn DASP, nhưng chỉ nộp được sau khi visa đã hết hiệu lực và bạn đã rời Úc.' },
      { q: 'Nếu tôi quên mất tiền super thì sao?', a: 'Sáu tháng sau khi bạn rời Úc và visa hết hiệu lực, quỹ sẽ chuyển tiền cho ATO. Bạn vẫn có thể xin rút từ ATO theo diện DASP.' },
    ],
  },
  'tax-residency-international-students-explained': {
    title: 'Cư trú về thuế với du học sinh: thực tế thay đổi những gì',
    description: 'Du học sinh theo học khóa từ 6 tháng trở lên có thể là người cư trú về thuế ở Úc. Điều đó thay đổi gì trong thực tế: ngưỡng miễn thuế, thuế suất, khoản giảm thuế và Medicare.',
    answer: 'Du học sinh theo học khóa từ 6 tháng trở lên có thể là người cư trú về thuế ở Úc. Nếu đúng vậy, bạn có thể được hưởng ngưỡng miễn thuế và thuế suất cho người cư trú, điều này có thể làm thay đổi số thuế của cả năm.',
    body: `Cư trú về thuế không giống với visa hay tình trạng di trú của bạn. Đây chỉ là một khái niệm về thuế. Bạn có thể có visa du học mà vẫn là người cư trú về thuế ở Úc. Bạn cũng có thể là người không cư trú về thuế. Bài này cho thấy sự khác nhau đó bằng những con số thật, và vì sao cần cẩn thận khi xác định.

## Cư trú về thuế là gì?

Cư trú về thuế quyết định cách Úc tính thuế trên thu nhập của bạn. Nó không ảnh hưởng đến visa, và không biến bạn thành thường trú nhân. ATO xem xét toàn bộ hoàn cảnh của bạn. Với du học sinh, ATO cho biết nếu bạn theo học khóa từ 6 tháng trở lên, bạn có thể là người cư trú về thuế ở Úc.

Đây là "có thể", không phải tự động là có. Hoàn cảnh của bạn được cân nhắc, và hai du học sinh nhìn bên ngoài giống nhau vẫn có thể nhận câu trả lời khác nhau.

## Nếu là người cư trú về thuế thì thay đổi gì?

Nếu bạn có thể là người cư trú về thuế, nhiều điều thay đổi cùng lúc:

- **Ngưỡng miễn thuế.** $18,200 thu nhập đầu tiên trong năm được miễn thuế. Nếu bạn chỉ là người cư trú trong một phần của năm, có thể bạn chỉ được một phần số này.
- **Thuế suất.** Năm 2025-26, thuế suất cho người cư trú là: $0 đến $18,200 không tính thuế, $18,201 đến $45,000 là 16%, $45,001 đến $135,000 là 30%, $135,001 đến $190,000 là 37%, và trên $190,000 là 45%.
- **Khoản giảm thuế cho thu nhập thấp.** Người cư trú có thu nhập chịu thuế dưới $66,667 có thể được hưởng, tối đa $700.
- **Thu nhập ở nước ngoài.** ATO cho biết du học sinh vừa là người tạm trú (temporary resident) vừa là người cư trú về thuế ở Úc thì nhìn chung không bị tính thuế trên phần lớn thu nhập ở nước ngoài. Thu nhập ở Úc của bạn vẫn phải khai.

## Nếu là người không cư trú về thuế thì thay đổi gì?

Người không cư trú về thuế không có ngưỡng miễn thuế. Năm 2025-26, thuế suất là 30% ngay từ đồng đầu tiên đến $135,000, sau đó là 37%, rồi 45%. Khoản giảm thuế cho thu nhập thấp chỉ dành cho người cư trú.

## Một ví dụ cụ thể

Hai du học sinh, mỗi người kiếm được $24,000 từ việc làm bán thời gian trong cả năm 2025-26.

- **Du học sinh A có thể là người cư trú về thuế.** $18,200 đầu tiên được miễn thuế. $5,800 tiếp theo bị tính 16%, tức là $928. Khoản giảm thuế cho thu nhập thấp $700 đưa số này xuống còn $228.
- **Du học sinh B là người không cư trú về thuế.** Toàn bộ $24,000 bị tính 30%, tức là $7,200.

Các con số này chưa tính Medicare levy. Khoảng cách giữa hai kết quả rất lớn, và nó đến từ chỉ một câu hỏi. Đó là lý do nên xác định đúng tình trạng cư trú, theo cả hai chiều.

## Trong năm, tình trạng cư trú xuất hiện ở đâu?

Lần đầu bạn gặp câu hỏi về cư trú là trên tờ khai mã số thuế (TFN declaration) khi bắt đầu một công việc. Câu trả lời của bạn làm thay đổi số thuế chủ lao động trừ từ lương.

- Nếu bạn có thể là người cư trú về thuế, bạn chỉ được đăng ký ngưỡng miễn thuế với một chủ lao động. Đăng ký với hai việc thường dẫn đến phải đóng thêm thuế.
- Nếu bạn là người không cư trú về thuế, hãy chọn "không" ở câu hỏi về ngưỡng miễn thuế trên mọi tờ khai.

Những gì bạn ghi trên tờ khai không quyết định tình trạng cư trú cuối cùng của bạn. Nó chỉ quyết định số thuế bị trừ. Tình trạng cuối cùng được xác định khi làm hồ sơ thuế.

Nếu câu trả lời về cư trú của bạn hóa ra không đúng, số thuế sẽ được điều chỉnh trong hồ sơ thuế. Bị trừ quá nhiều thì phần dư có thể được trả lại cho bạn, nếu có. Bị trừ quá ít thì bạn đóng thêm phần chênh lệch.

## Còn Medicare thì sao?

Cư trú về thuế và quyền hưởng Medicare là hai câu hỏi riêng. Du học sinh có thể là người cư trú về thuế mà vẫn không đủ điều kiện hưởng Medicare. Nhiều du học sinh có bảo hiểm OSHC (bảo hiểm y tế cho du học sinh) thay thế, đây là một điều kiện của visa.

Nếu không đủ điều kiện hưởng Medicare, bạn có thể xin miễn Medicare levy bằng giấy Medicare Entitlement Statement do Services Australia cấp. Du học sinh đến từ những nước có thỏa thuận chăm sóc sức khỏe tương hỗ (reciprocal health care agreement) với Úc có thể được hưởng Medicare, và khi đó không được miễn.

## Vì sao không nên tự quyết định chuyện này

Nhiều du học sinh tự đoán. Có người cho rằng có visa du học là người không cư trú về thuế, và đóng thuế nhiều hơn mức cần. Có người lại cho rằng mình là người cư trú mà không xem xét hoàn cảnh, và chọn một cách khai mà mình không chứng minh được. Cả hai đều là lỗi thường gặp.

Muốn có câu trả lời đúng, cần xem cùng lúc độ dài khóa học, thời điểm bạn đến Úc, trong năm bạn có rời Úc không, và các sự việc khác trong năm của bạn.

Những thay đổi trong năm cũng quan trọng. Du học sinh học xong và chuyển sang visa mới, hoặc rời Úc hẳn giữa năm, có thể có tình trạng khác cho một phần của năm. Khi đó, ngưỡng miễn thuế có thể chỉ được áp dụng một phần. Đây là những trường hợp cần xem xét kỹ nhất. Nên nêu ra trước khi nộp hồ sơ thay vì sau khi đã nộp.

## Việc nên làm tiếp theo

- Kiểm tra độ dài khóa học trên giấy xác nhận nhập học (confirmation of enrolment).
- Ghi lại ngày bạn đến Úc và những chuyến đi dài ra khỏi Úc.
- Kiểm tra câu trả lời về cư trú trên từng tờ khai TFN.
- Chỉ đăng ký ngưỡng miễn thuế với một công việc, nếu bạn có thể là người cư trú về thuế.
- Xin giấy Medicare Entitlement Statement nếu bạn không đủ điều kiện hưởng Medicare.

Mọi hồ sơ thuế của Student Visa Tax đều được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO, kể cả phần xác định tình trạng cư trú.`,
    faq: [
      { q: 'Là người cư trú về thuế có làm thay đổi visa của tôi không?', a: 'Không. Cư trú về thuế chỉ dùng cho việc tính thuế. Nó không thay đổi visa và không biến bạn thành thường trú nhân.' },
      { q: 'Khóa học của tôi ngắn hơn 6 tháng. Tôi có phải là người không cư trú về thuế không?', a: 'Thường là có thể, nhưng còn tùy vào toàn bộ hoàn cảnh của bạn. Nên kiểm tra trước khi nộp hồ sơ.' },
      { q: 'Tôi có phải khai thu nhập ở nước mình không?', a: 'ATO cho biết du học sinh vừa là người tạm trú vừa là người cư trú về thuế ở Úc thì nhìn chung không bị tính thuế trên phần lớn thu nhập ở nước ngoài. Thu nhập ở Úc của bạn thì phải khai.' },
    ],
  },
  'update-address-with-ato-international-students': {
    title: 'Cách cập nhật địa chỉ với ATO cho du học sinh',
    description: 'Du học sinh hay chuyển nhà. Cách đổi địa chỉ, email và số điện thoại với ATO qua myGov, ứng dụng ATO, điện thoại hoặc bưu điện, và vì sao quỹ super cũng cần biết.',
    answer: 'Cách nhanh nhất là trực tuyến: đăng nhập myGov, mở ATO trong mục dịch vụ đã liên kết, rồi vào My profile, Personal details. Bạn cũng có thể dùng ứng dụng ATO, gọi điện cho ATO, hoặc gửi mẫu đơn Change of details for individuals qua bưu điện.',
    body: `Du học sinh chuyển nhà rất nhiều. Có thể bạn bắt đầu ở ký túc xá, chuyển sang nhà share, rồi lại chuyển khi hết hợp đồng thuê. Mỗi lần như vậy, ATO vẫn giữ địa chỉ cũ của bạn nếu bạn không báo. Bài này giải thích cách cập nhật thông tin và vì sao việc này quan trọng hơn bạn nghĩ.

## Vì sao địa chỉ của bạn quan trọng với ATO?

Tiền hoàn thuế được trả vào tài khoản ngân hàng, nên dễ nghĩ rằng địa chỉ không quan trọng. Nhưng một số thứ quan trọng vẫn có thể được gửi qua bưu điện:

- TFN của bạn, được ATO gửi qua bưu điện đến địa chỉ ở Úc mà bạn khai
- thư yêu cầu thêm thông tin về hồ sơ thuế
- thông báo về số thuế bạn còn nợ
- yêu cầu xác minh danh tính, có thể làm hồ sơ bị giữ lại

Thư gửi đến nhà cũ vẫn được coi là đã gửi. Nếu thư hỏi điều gì mà bạn không bao giờ trả lời, hồ sơ có thể bị chậm hoặc được quyết định mà không có ý kiến của bạn.

Email và số điện thoại cũng quan trọng vì lý do tương tự. ATO và myGov dùng chúng để gửi mã đăng nhập và tin nhắn. Nếu bạn đổi số điện thoại mà số cũ vẫn còn trong hồ sơ, có thể bạn không đăng nhập được khi cần nộp hồ sơ thuế.

## Bạn có thể cập nhật những thông tin nào?

ATO cho phép bạn cập nhật địa chỉ nơi ở, địa chỉ nhận thư, số điện thoại nhà và di động, và địa chỉ email. Hãy kiểm tra tất cả, không chỉ địa chỉ. Email hay số điện thoại cũ cũng có thể gây ra những rắc rối tương tự.

## Cập nhật trực tuyến thế nào?

Trực tuyến thường là cách nhanh nhất.

- **Qua dịch vụ trực tuyến của ATO.** Đăng nhập myGov, chọn Australian Taxation Office trong mục Linked services, rồi vào My profile, sau đó Personal details. Cập nhật thông tin liên lạc, đồng ý với phần xác nhận (declaration), và chọn Save.
- **Qua hồ sơ myGov.** Trong myGov, vào My Account, rồi Profile, rồi Contact details. Ở đây bạn có thể chọn những dịch vụ nhà nước đã liên kết nào cùng nhận thông tin mới.
- **Qua ứng dụng ATO.** Vào More, rồi My details, rồi chọn Update ở mục Personal details.

Nếu bạn chưa liên kết ATO với myGov, nên làm ngay. Bạn cũng sẽ dùng nó để xem bảng kê thu nhập (income statement) và nộp hồ sơ thuế.

Khi lưu xong, hãy xem thông báo xác nhận. Sau đó đăng xuất rồi đăng nhập lại để chắc thông tin mới đã hiện. Chỉ mất một phút mà tránh được bất ngờ sau này.

## Có thể cập nhật qua điện thoại hoặc bưu điện không?

Được. Bạn có thể gọi điện cho ATO. Bạn sẽ phải xác minh danh tính, nên hãy chuẩn bị sẵn TFN.

Bạn cũng có thể tải mẫu đơn Change of details for individuals và gửi qua bưu điện. ATO cho biết sau khi nhận được mẫu đơn, có thể mất đến 28 ngày để cập nhật hồ sơ, nên đây là cách chậm nhất.

Một đại lý thuế đã đăng ký cũng có thể cập nhật thông tin của bạn với ATO khi lo hồ sơ thuế cho bạn.

## Nên khai địa chỉ nào?

Hãy khai một địa chỉ mà vài tuần nữa bạn vẫn nhận được thư. Nếu sắp chuyển nhà, dùng địa chỉ mới, hoặc một địa chỉ nhận thư đáng tin cậy. Điều này quan trọng nhất khi bạn đang chờ TFN, vì TFN chỉ được gửi qua bưu điện.

Nếu bạn ở ký túc xá hoặc nhà share, hãy hỏi xem thư của người thuê cũ được xử lý thế nào. Có nơi giữ thư một thời gian, có nơi gửi trả lại. Nếu không chắc, địa chỉ của một người bạn hay người thân có chỗ ở ổn định ở Úc có thể là địa chỉ nhận thư tốt hơn, nếu họ đồng ý kiểm tra thư giúp bạn.

ATO lưu riêng địa chỉ nơi ở và địa chỉ nhận thư. Nếu bạn dùng một địa chỉ khác để nhận thư, hãy chắc rằng địa chỉ nhận thư là nơi bạn kiểm tra được.

## Cập nhật với ATO có cập nhật luôn quỹ super không?

Không. ATO cho biết các cách cập nhật của ATO chỉ thay đổi thông tin của bạn với ATO. Quỹ super giữ hồ sơ riêng. Nếu bạn làm nhiều việc, có thể bạn có nhiều quỹ, và quỹ nào cũng cần thông tin mới của bạn.

Điều này quan trọng vì quỹ nào không liên lạc được với bạn có thể báo tài khoản của bạn là bị thất lạc (lost). Khi bạn rời Úc, việc tìm lại có thể khó hơn. Bạn có thể xem các tài khoản super trong dịch vụ trực tuyến của ATO, giúp bạn biết cần cập nhật những quỹ nào.

## Còn sau khi rời Úc thì sao?

Hãy tiếp tục cập nhật thông tin sau khi học xong. Hồ sơ thuế cuối cùng, mọi thư từ liên quan, và đơn rút super DASP đều diễn ra sau khi bạn rời Úc. Nếu định dùng myTax từ nước ngoài, hãy cập nhật cài đặt đăng nhập myGov trước khi đi để vẫn đăng nhập được.

Hãy giữ địa chỉ email luôn đúng. Đây thường là cách dễ nhất để giữ liên lạc với đại lý thuế và quỹ super khi bạn đã về nước.

Trước khi bay, nên lập một danh sách: TFN, thông tin đăng nhập myGov, từng quỹ super và số thành viên, và tài khoản ngân hàng ở Úc mà bạn giữ lại. Có danh sách này, việc cập nhật thông tin từ nước ngoài sẽ rất nhanh. Hãy cất ở nơi an toàn và kín đáo.

## Danh sách việc cần làm

- Cập nhật địa chỉ trong vòng một tuần sau khi chuyển nhà.
- Kiểm tra luôn email và số di động.
- Dùng myGov hoặc ứng dụng ATO nếu được, vì đây là cách nhanh nhất.
- Cập nhật riêng với từng quỹ super.
- Trước khi rời Úc, cập nhật thông tin và cài đặt đăng nhập myGov.`,
    faq: [
      { q: 'Đổi địa chỉ mất bao lâu?', a: 'Thay đổi trực tuyến được cập nhật vào tài khoản ATO ngay khi bạn lưu. Mẫu đơn gửi qua bưu điện có thể mất đến 28 ngày sau khi ATO nhận được.' },
      { q: 'Tôi chuyển nhà trước khi nhận được TFN. Tôi nên làm gì?', a: 'Cập nhật địa chỉ nhận thư với ATO càng sớm càng tốt, vì TFN được gửi qua bưu điện. Nếu sau 28 ngày kể từ khi nộp đơn vẫn chưa nhận được, hãy liên hệ ATO.' },
      { q: 'Trường đại học hoặc quỹ super có nhận được địa chỉ mới của tôi không?', a: 'ATO không chuyển cho họ. Bạn hãy tự cập nhật với quỹ super, và báo cho trường qua hệ thống riêng của trường.' },
    ],
  },
  'what-is-a-tax-refund-international-students': {
    title: 'Tiền hoàn thuế là gì? Cách tính với du học sinh',
    description: 'Tiền hoàn thuế là phần thuế bị trừ dư trong năm mà ATO trả lại sau khi bạn nộp hồ sơ. Vì sao du học sinh có thể được hoàn, vì sao có người lại phải đóng thêm, và điều gì quyết định kết quả.',
    answer: 'Tiền hoàn thuế là số tiền ATO trả lại khi số thuế bị trừ từ lương trong năm nhiều hơn số thuế bạn thực sự phải đóng. Số này được tính khi bạn nộp hồ sơ thuế, và có du học sinh được hoàn thuế, có người lại phải đóng thêm.',
    body: `Nhiều du học sinh nghe nói khai thuế là được nhận tiền về. Đôi khi đúng. Đôi khi không. Tiền hoàn thuế không phải tiền thưởng hay khoản trợ cấp cho du học sinh. Đó là tiền thuế của chính bạn được trả lại vì đã bị trừ quá nhiều. Bài này giải thích tiền hoàn thuế được tính thế nào, điều gì làm nó nhiều hơn hay ít đi, và vì sao có du học sinh lại phải đóng thêm.

## Tiền hoàn thuế là gì?

Trong năm, chủ lao động trừ thuế từ mỗi kỳ lương và gửi cho ATO. Số đó chỉ là ước tính. Khi năm tài chính kết thúc vào ngày 30 tháng 6, bạn nộp hồ sơ thuế. ATO tính số thuế thật trên tổng thu nhập của bạn và so với tổng số thuế đã bị trừ.

- Nếu số thuế đã bị trừ nhiều hơn số bạn phải đóng, ATO trả lại cho bạn phần chênh lệch. Đó là tiền hoàn thuế.
- Nếu số thuế đã bị trừ ít hơn số bạn phải đóng, bạn phải đóng thêm thuế.

ATO gửi thông báo tính thuế (notice of assessment) cho biết kết quả, và chuyển tiền hoàn thuế (nếu có) vào tài khoản ngân hàng ở Úc của bạn.

## Vì sao du học sinh có thể được hoàn thuế?

Thuế bị trừ được tính theo từng kỳ lương. Cách tính giả định rằng mỗi kỳ lương là mức bình thường của cả năm. Công việc của du học sinh thường không đều, nên số ước tính hay bị lệch. Những lý do thường gặp khiến bị trừ quá nhiều:

- bạn đến Úc hoặc bắt đầu đi làm giữa năm tài chính
- số giờ làm lên xuống thất thường, ví dụ làm nhiều hơn vào kỳ nghỉ
- bạn không đưa TFN cho chủ lao động kịp lúc, nên có một thời gian bị trừ theo mức cao nhất
- bạn có thể là người cư trú về thuế nhưng không đăng ký ngưỡng miễn thuế với công việc nào
- Medicare levy đã bị trừ, nhưng bạn không đủ điều kiện hưởng Medicare và có thể xin miễn
- bạn có các khoản khấu trừ chi phí công việc làm giảm thu nhập chịu thuế

## Vì sao có du học sinh lại phải đóng thêm thuế?

Một số du học sinh bất ngờ khi phải đóng thêm. Những lý do hay gặp nhất là:

- đăng ký ngưỡng miễn thuế với hai chủ lao động trở lên, nên bị trừ quá ít
- làm việc bằng ABN, như giao đồ ăn, nơi không ai trừ thuế từ tiền bạn nhận
- thu nhập tiền mặt hoặc tip tiền mặt không bị trừ thuế
- khai là người cư trú về thuế trên tờ khai TFN trong khi bạn là người không cư trú về thuế

Nếu phải đóng thêm, trong một số trường hợp ATO cho phép bạn trả góp (payment plan). Biết sớm vẫn tốt hơn.

Phải đóng thêm thuế không phải là bị phạt. Đó là phần thuế lẽ ra phải được trừ trong năm nhưng chưa bị trừ. Nếu biết mình có thu nhập ABN hoặc tiền mặt, bạn có thể để riêng một ít mỗi tuần để đến lúc đóng thuế đỡ nặng.

## Một ví dụ cụ thể

Giả sử một du học sinh có thể là người cư trú về thuế trong năm 2025-26 và kiếm được $24,000 từ một công việc, trong năm đã bị trừ $1,500 tiền thuế.

- Thuế trên $24,000 theo thuế suất cho người cư trú năm 2025-26: $18,200 đầu tiên được miễn thuế, $5,800 tiếp theo tính 16% là $928.
- Khoản giảm thuế cho thu nhập thấp $700 đưa số này xuống còn $228.
- Số thuế đã bị trừ là $1,500, nên trước khi tính Medicare levy, phần chênh lệch là $1,272.

Nếu du học sinh này không đủ điều kiện hưởng Medicare và có giấy Medicare Entitlement Statement, có thể được miễn Medicare levy. Nếu cũng du học sinh này là người không cư trú về thuế, thuế sẽ là 30% của $24,000, tức là $7,200, và cùng $1,500 đã bị trừ đó sẽ dẫn đến phải đóng thêm. Đây chỉ là ví dụ. Kết quả của bạn tùy vào năm của chính bạn.

## Điều gì quyết định số tiền hoàn thuế?

Bạn không thể biết kết quả chỉ từ một phiếu lương. Nó phụ thuộc vào cả năm của bạn:

- tình trạng cư trú về thuế của bạn
- bạn làm bao nhiêu việc, và việc nào được đăng ký ngưỡng miễn thuế
- tổng số thuế bị trừ trên tất cả các bảng kê thu nhập
- mọi khoản thu nhập không bị trừ thuế, như thu nhập ABN hoặc tiền mặt
- tình trạng Medicare của bạn
- mọi khoản khấu trừ mà bạn có chứng từ

Hai điều đầu thường quan trọng nhất. Thay đổi tình trạng cư trú có thể làm số thuế trên cùng một mức thu nhập chênh nhau hàng nghìn đô la, như ví dụ ở trên. Và một công việc thứ hai có đăng ký ngưỡng miễn thuế có thể biến khoản hoàn thuế bạn đang chờ thành khoản phải đóng thêm. Hãy kiểm tra những điều này trước khi nghĩ đến các khoản khấu trừ.

## Khi nào nhận được tiền hoàn thuế?

ATO cho biết phần lớn hồ sơ nộp trực tuyến được xử lý trong vòng 12 ngày làm việc. Một số hồ sơ cần kiểm tra thủ công, có thể mất đến 30 ngày theo lịch. Hồ sơ giấy mất đến 50 ngày làm việc. Tiền hoàn thuế được chuyển vào tài khoản ngân hàng ở Úc, nên hãy giữ tài khoản cho đến khi nhận được tiền.

Nộp sớm không phải lúc nào cũng nhận tiền sớm hơn. Nếu bạn nộp trước khi các bảng kê thu nhập hiện “Tax ready”, hoặc trước khi nhận được giấy Medicare Entitlement Statement, hồ sơ có thể phải sửa lại sau. Hồ sơ đầy đủ thường là hồ sơ nhanh nhất.

## Danh sách việc cần làm

- Chờ đến khi mọi bảng kê thu nhập hiện “Tax ready”.
- Liệt kê mọi công việc và mọi khoản thu nhập tiền mặt hoặc ABN.
- Kiểm tra các tờ khai TFN xem đã đăng ký ngưỡng miễn thuế ở đâu.
- Xin giấy Medicare Entitlement Statement nếu bạn không đủ điều kiện hưởng Medicare.
- Giữ hóa đơn cho mọi chi phí công việc.
- Giữ một tài khoản ngân hàng ở Úc.

Nếu bạn muốn có người làm hồ sơ thuế giúp, hãy nhắn cho Student Visa Tax qua WhatsApp. Chúng tôi xem xét cả năm của bạn và báo kết quả cho bạn, dù có tiền hoàn thuế hay không, trước khi nộp bất cứ thứ gì.`,
    faq: [
      { q: 'Du học sinh nào cũng được hoàn thuế phải không?', a: 'Không. Chỉ được hoàn thuế khi số thuế đã bị trừ nhiều hơn số bạn phải đóng. Có du học sinh được hoàn, có người không nhận lại gì, và có người phải đóng thêm.' },
      { q: 'Tiền hoàn thuế có chuyển vào tài khoản ngân hàng ở nước tôi được không?', a: 'ATO trả tiền hoàn thuế vào tài khoản ngân hàng ở Úc, nên hãy giữ một tài khoản cho đến khi nhận được tiền.' },
      { q: 'Năm ngoái tôi chưa khai thuế. Tôi còn được hoàn thuế cho năm đó không?', a: 'Bạn vẫn có thể nộp hồ sơ cho năm trước. Có tiền hoàn thuế hay không tùy vào số thuế đã bị trừ và số thuế bạn phải đóng.' },
    ],
  },
  'tax-refund-delays-international-students': {
    title: 'Vì sao tiền hoàn thuế đến chậm? Lý do với du học sinh',
    description: 'Phần lớn hồ sơ trực tuyến được xử lý trong 12 ngày làm việc. Vì sao tiền hoàn thuế của du học sinh có thể lâu hơn, từ giấy Medicare đến thông tin ngân hàng, và cách theo dõi.',
    answer: 'ATO cho biết phần lớn hồ sơ trực tuyến được xử lý trong vòng 12 ngày làm việc, nhưng hồ sơ cần kiểm tra thủ công có thể mất đến 30 ngày theo lịch. Với du học sinh, lý do chậm thường là nộp quá sớm, số liệu không khớp với dữ liệu của ATO, hoặc sai thông tin ngân hàng.',
    body: `Bạn đã nộp hồ sơ và giờ đang chờ. Bạn của bạn nhận tiền hoàn thuế sau một tuần, còn của bạn thì vẫn chưa thấy. Bài này xem xét những lý do khiến tiền hoàn thuế của du học sinh có thể chậm hơn, cách kiểm tra hồ sơ đang ở đâu, và bạn có thể làm gì để tránh chậm trễ vào năm sau.

## Thường mất bao lâu?

ATO đưa ra các mốc thời gian xử lý như sau:

- phần lớn hồ sơ trực tuyến được xử lý trong vòng 12 ngày làm việc
- hồ sơ cần xử lý thủ công có thể mất đến 30 ngày theo lịch
- hồ sơ giấy có thể mất đến 50 ngày làm việc

Ngày làm việc không tính cuối tuần và ngày lễ. Vì vậy 12 ngày làm việc thường vào khoảng hai tuần rưỡi theo lịch.

Các mốc này tính từ khi ATO nhận được hồ sơ, không phải từ khi bạn bắt đầu chuẩn bị. Nếu bạn còn đang chờ giấy tờ, thời gian chưa bắt đầu tính. Với du học sinh, khoảng thời gian trước khi nộp hồ sơ thường còn dài hơn cả thời gian xử lý.

## Kiểm tra tiến độ thế nào?

Bạn theo dõi hồ sơ trong dịch vụ trực tuyến của ATO qua myGov. Tìm mục tiến độ hồ sơ thuế. Nếu đại lý thuế nộp giúp bạn, họ cũng xem được trạng thái và có thể trao đổi với ATO thay bạn.

Trạng thái cho biết hồ sơ đang ở giai đoạn nào, như đã nhận (received), đang xử lý (in progress) hoặc đã hoàn tất (finalised). Khi hoàn tất, ATO gửi thông báo tính thuế (notice of assessment).

## Lý do 1: chờ giấy Medicare Entitlement Statement

Nhiều du học sinh không đủ điều kiện hưởng Medicare và có thể xin miễn Medicare levy. Muốn vậy, bạn cần giấy Medicare Entitlement Statement do Services Australia cấp. ATO cho biết nên chờ có giấy này rồi mới nộp hồ sơ. Đơn xin bắt đầu nhận từ ngày 1 tháng 7, và ATO cho biết có thể mất đến 8 tuần.

Thời gian chờ này diễn ra trước khi nộp hồ sơ, nên không hiện ra như tiền hoàn thuế bị chậm. Nhưng đây thường là lý do một du học sinh nộp hồ sơ muộn hơn người bạn được hưởng Medicare.

## Lý do 2: nộp hồ sơ trước khi bảng kê thu nhập sẵn sàng

Chủ lao động hoàn tất bảng kê thu nhập (income statement) của bạn sau ngày 30 tháng 6, và phần lớn làm xong trước ngày 14 tháng 7. Nếu bạn nộp trước khi bảng kê hiện “Tax ready”, các con số có thể thay đổi. Khi đó ATO có thể thấy hồ sơ của bạn không khớp với dữ liệu của họ, và hồ sơ có thể phải kiểm tra thủ công.

## Lý do 3: số liệu không khớp với dữ liệu của ATO

ATO đã có sẵn dữ liệu từ chủ lao động, ngân hàng và quỹ super. Nếu hồ sơ của bạn thiếu một công việc, thiếu tiền lãi ngân hàng, hoặc dùng một con số khác, hồ sơ có thể được một người kiểm tra. Những ví dụ thường gặp ở du học sinh:

- quên một công việc ngắn hạn
- có thêm một bảng kê thu nhập đứng tên một công ty mà bạn không nhận ra
- không khai tiền lãi trên tài khoản tiết kiệm ở Úc

Nếu ATO thấy có chênh lệch, họ có thể điều chỉnh hồ sơ hoặc hỏi bạn. Dù thế nào cũng mất thời gian hơn một hồ sơ khớp ngay từ đầu. Hãy kiểm tra tài khoản ATO để xem đủ mọi bảng kê thu nhập và tiền lãi ngân hàng trước khi nộp.

Du học sinh làm hai, ba việc là những người dễ bỏ sót nhất. Nếu chủ lao động thuộc một tập đoàn lớn, bảng kê thu nhập có thể ghi tên công ty mẹ. Hãy đối chiếu số ABN trên phiếu lương với số ABN trên bảng kê.

## Lý do 4: thông tin ngân hàng và xác minh danh tính

Tiền hoàn thuế được trả vào tài khoản ngân hàng ở Úc. Nếu số BSB hoặc số tài khoản bị sai, hoặc tài khoản đã đóng, tiền không chuyển được. Chuyện này hay xảy ra khi du học sinh đóng tài khoản trước khi rời Úc. Hãy giữ tài khoản cho đến khi nhận được tiền hoàn thuế, và kiểm tra kỹ thông tin ngân hàng trong hồ sơ.

Nếu đây là hồ sơ thuế đầu tiên của bạn ở Úc, hoặc thông tin trong hồ sơ khác với những gì ATO đang có, ATO có thể cần xác minh danh tính của bạn. Thư về việc này có thể được gửi qua bưu điện. Nếu địa chỉ đã cũ, có thể bạn không thấy thư. Hãy cập nhật địa chỉ, email và số điện thoại với ATO mỗi khi chuyển nhà.

## Trong lúc chờ, bạn có thể làm gì?

- Kiểm tra trạng thái trong dịch vụ trực tuyến của ATO trước khi gọi cho ai.
- Đảm bảo thông tin liên lạc còn đúng, để bạn thấy được mọi yêu cầu của ATO.
- Trả lời mọi yêu cầu của ATO nhanh chóng và đầy đủ.
- Đừng nộp hồ sơ thứ hai cho cùng một năm. Nếu có gì sai, hãy hỏi về việc sửa hồ sơ.
- Nếu bạn dùng đại lý thuế, nhờ họ xem trạng thái giúp.

Hãy cẩn thận với tin nhắn nói rằng bạn có thể nhận tiền hoàn thuế nhanh hơn nếu trả phí hoặc bấm vào một đường link. ATO cho biết họ không bao giờ đòi phí để bạn được nhận tiền hoàn thuế, và không bao giờ tự gửi đường link qua email hay SMS khi bạn không yêu cầu.

## Cách nhận tiền hoàn thuế nhanh hơn vào năm sau

- Xin giấy Medicare Entitlement Statement sớm sau ngày 1 tháng 7, nếu bạn cần.
- Chờ đến khi mọi bảng kê thu nhập hiện “Tax ready”.
- Liệt kê mọi công việc và mọi tài khoản ngân hàng trước khi nộp.
- Kiểm tra thông tin ngân hàng hai lần.
- Luôn cập nhật địa chỉ và email với ATO.
- Trong năm, giữ một danh sách mọi chủ lao động và mọi tài khoản ngân hàng ở Úc, để không bỏ sót gì khi khai thuế.

Hồ sơ đầy đủ ngay khi nộp thường là hồ sơ nhanh nhất. Bỏ thêm vài ngày kiểm tra trước khi nộp có thể giúp bạn đỡ phải chờ hàng tuần sau đó.`,
    faq: [
      { q: 'Đã 12 ngày làm việc rồi. Tôi có nên gọi cho ATO không?', a: 'Hãy kiểm tra trạng thái trong dịch vụ trực tuyến của ATO trước. Nếu hồ sơ cần xử lý thủ công, ATO cho biết có thể mất đến 30 ngày theo lịch.' },
      { q: 'Tôi có thể nộp hồ sơ trước khi nhận được giấy Medicare Entitlement Statement không?', a: 'ATO cho biết nếu bạn xin miễn Medicare levy thì nên chờ có giấy này rồi mới nộp hồ sơ.' },
      { q: 'Tài khoản ngân hàng ở Úc của tôi đã đóng. Tiền hoàn thuế sẽ ra sao?', a: 'Tiền không thể chuyển vào tài khoản đã đóng. Hãy liên hệ ATO hoặc đại lý thuế để cung cấp thông tin tài khoản ngân hàng ở Úc đúng.' },
    ],
  },
  'super-for-casual-student-workers': {
    title: 'Super cho du học sinh làm casual và bán thời gian',
    description: 'Du học sinh làm casual và bán thời gian nhìn chung được đóng 12% super, dù kiếm được bao nhiêu. Super tính trên khoản nào, khi nào phải đến quỹ theo Payday Super, và cách kiểm tra.',
    answer: 'Có. ATO cho biết nhìn chung mọi nhân viên đều được đóng super, kể cả người làm casual, bán thời gian và người tạm trú, bất kể kiếm được bao nhiêu. Mức đóng là 12%, do chủ lao động đóng thêm ngoài tiền lương.',
    body: `Phần lớn du học sinh làm việc casual hoặc bán thời gian. Nhiều người nghĩ super chỉ dành cho người làm toàn thời gian, hoặc chỉ cho người sẽ ở lại Úc. Điều đó không đúng. Bài này giải thích super áp dụng thế nào với du học sinh làm casual và bán thời gian, super tính trên khoản nào, và cách kiểm tra xem đã được đóng chưa.

## Super là gì?

Superannuation, hay super, là tiền chủ lao động đóng vào một quỹ cho bạn. Mục đích là để dành cho lúc nghỉ hưu. Với người tạm trú rời Úc, super thường có thể rút ra theo diện khoản super khi rời Úc (DASP) sau khi visa hết hiệu lực.

Super được đóng thêm ngoài tiền lương. Nó không bị trừ vào lương của bạn.

Super cũng tách biệt với thuế. Thuế bị trừ được gửi cho ATO. Super được gửi vào quỹ của bạn. Cả hai đều phải hiện trên phiếu lương thành hai dòng riêng.

## Người làm casual và bán thời gian có được đóng super không?

Có. ATO cho biết nhìn chung mọi nhân viên đều đủ điều kiện hưởng super guarantee (mức super bắt buộc), dù làm toàn thời gian, bán thời gian hay casual, và bất kể kiếm được bao nhiêu. Điều này nhìn chung bao gồm cả người tạm trú, như du học sinh. Mức đóng là 12%.

Có một vài ngoại lệ. Người dưới 18 tuổi chỉ được đóng super cho những tuần làm hơn 30 giờ. Trường hợp này hiếm gặp với sinh viên đại học nhưng có thể liên quan đến những bạn nhỏ tuổi hơn.

Có visa du học không làm thay đổi quyền được đóng super của bạn. Bạn được áp dụng cùng quy định như một người lao động Úc làm cùng công việc. Nếu chủ lao động nói du học sinh làm casual không được đóng super, điều đó không đúng. Hãy đề nghị họ kiểm tra lại, và ghi lại những gì họ nói.

Casual loading không thay cho super. Casual loading là phần lương cộng thêm mà người làm casual được nhận thay cho những quyền lợi như nghỉ phép có lương. Nó không phải là để thay cho super. Chủ lao động phải trả cả hai.

Thực ra, ATO liệt kê casual loading là một phần của thu nhập dùng để tính super. Vì vậy super phải được tính trên mức lương đã cộng loading, không chỉ trên mức lương cơ bản.

## Super được tính trên khoản nào?

Super được tính trên thu nhập đủ điều kiện (qualifying earnings). ATO cho biết khoản này gồm tiền lương cho giờ làm thông thường, và liệt kê casual loading cùng lương phụ trội theo ca (shift penalties), kể cả lương phụ trội ngày lễ, là được tính. Tiền làm thêm giờ nhìn chung không được tính.

- giờ làm thông thường theo mức lương giờ: được tính
- casual loading: được tính
- lương phụ trội theo ca cho giờ làm thông thường: được tính
- làm thêm giờ (overtime): nhìn chung không được tính

## Một ví dụ cụ thể

Một du học sinh làm casual và kiếm được $600 trong một tuần. Toàn bộ là tiền giờ làm thông thường, đã gồm casual loading và lương phụ trội ca Chủ nhật. Tuần đó không làm thêm giờ.

Super cho tuần đó là 12% của $600, tức là $72. Khoản này được đóng vào quỹ super của cô ấy. Lương gộp $600 vẫn bị tính thuế như bình thường, và lương thực nhận của cô ấy không thay đổi vì super.

Nếu tuần đó cô ấy làm thêm 3 giờ overtime, được trả theo mức làm thêm giờ, thì tiền làm thêm giờ đó nhìn chung sẽ không nằm trong $600 dùng để tính super. Phiếu lương vẫn ghi tiền làm thêm giờ là một phần của lương gộp.

## Khi nào super phải được đóng?

Từ ngày 1 tháng 7 năm 2026, Payday Super được áp dụng. Chủ lao động phải đóng super cùng lúc với trả lương, và tiền phải đến quỹ của bạn trong vòng 7 ngày làm việc sau ngày trả lương. Với nhân viên mới, lần đóng đầu tiên có thể mất đến 20 ngày làm việc.

Trước ngày 1 tháng 7 năm 2026, chủ lao động được đóng theo quý. Vì vậy với công việc trước ngày đó, việc tiền super đến quỹ chậm vài tuần so với phiếu lương là bình thường.

## Kiểm tra super đã được đóng chưa thế nào?

Phiếu lương cho biết chủ lao động nói họ đã đóng bao nhiêu. Quỹ của bạn cho biết thực tế đã nhận được bao nhiêu. Hãy kiểm tra cả hai.

- Fair Work cho biết phiếu lương phải ghi các khoản đóng super và tên quỹ.
- Đăng nhập quỹ super và xem các khoản đã được đóng.
- Trong dịch vụ trực tuyến của ATO, bạn xem được các khoản chủ lao động đã đóng và tìm các tài khoản bị thất lạc.

Nếu thiếu super, trước tiên hãy hỏi chủ lao động. Nếu vẫn không được đóng, bạn có thể báo cáo việc không đóng super cho ATO bằng công cụ trực tuyến của họ. Bạn sẽ cần TFN, khoảng thời gian bị thiếu và số ABN của chủ lao động.

## Nhiều việc có thể là nhiều quỹ

Nếu bạn không chọn quỹ, mỗi chủ lao động có thể mở một quỹ mới cho bạn. Ba việc casual có thể thành ba quỹ, quỹ nào cũng có phí riêng. Phần lớn nhân viên được chọn quỹ nhận super của mình. Hãy đưa cùng một thông tin quỹ cho mỗi chủ lao động mới nếu bạn muốn gom tất cả về một chỗ.

Nhiều quỹ cung cấp cho bạn một mẫu đơn hoặc lá thư ghi thông tin quỹ, để bạn đưa cho chủ lao động mới. Hãy để chung với thông tin TFN để sẵn sàng khi bắt đầu một công việc. Dùng một quỹ duy nhất cũng giúp đơn DASP đơn giản hơn khi bạn rời Úc. Ngoài ra còn ít khoản phí hơn.

Nếu bạn đã có nhiều quỹ, bạn có thể gộp lại. ATO khuyên nên kiểm tra trước, vì bạn có thể mất bảo hiểm đi kèm ở quỹ cũ, và có thể mất phí.

## Danh sách việc cần làm

- Kiểm tra mọi phiếu lương đều ghi super và tên quỹ.
- Đăng nhập quỹ và so các khoản đã được đóng.
- Chọn một quỹ và đưa thông tin cho mỗi chủ lao động mới.
- Tìm các tài khoản bị thất lạc hoặc tài khoản thừa trong dịch vụ trực tuyến của ATO.
- Báo cáo việc không đóng super nếu chủ lao động không khắc phục.
- Khi rời Úc, rút super theo diện DASP sau khi visa hết hiệu lực.`,
    faq: [
      { q: 'Tôi chỉ làm vài giờ mỗi tuần thì có được đóng super không?', a: 'Nhìn chung là có. ATO cho biết nhân viên đủ điều kiện bất kể kiếm được bao nhiêu. Người dưới 18 tuổi chỉ được đóng super cho những tuần làm hơn 30 giờ.' },
      { q: 'Tiền làm thêm giờ có được tính super không?', a: 'Nhìn chung là không. Super được tính trên thu nhập đủ điều kiện, và khoản này nhìn chung không gồm tiền làm thêm giờ.' },
      { q: 'Về nước rồi tôi có rút được super không?', a: 'Thường là được. Sau khi visa hết hiệu lực và bạn đã rời Úc, bạn có thể xin DASP. Nếu bạn chưa từng có visa working holiday, phần đã chịu thuế (taxed element) bị tính thuế 35%.' },
    ],
  },
}
