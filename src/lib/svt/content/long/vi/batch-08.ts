import type { LongText } from '../types'

export const LONG_VI_08: Readonly<Record<string, LongText>> = {
  'multiple-jobs-tax-return-student-visa': {
    title: 'Làm nhiều việc khi có visa du học: tất cả chung một hồ sơ thuế',
    description: 'Mọi công việc trong năm đều khai chung một hồ sơ thuế. Du học sinh làm hai, ba việc nên kiểm tra bảng kê thu nhập thế nào, tránh bị truy thu thuế và nộp hồ sơ lúc nào.',
    answer: 'Tất cả công việc bạn làm trong một năm tài chính đều khai chung một hồ sơ thuế, kể cả việc chỉ làm một tuần. Hãy chờ đến khi mọi bảng kê thu nhập đều hiện “Tax ready”, đối chiếu từng bảng kê với phiếu lương, rồi nộp một lần với đầy đủ thông tin.',
    body: `Rất nhiều du học sinh làm hơn một việc trong năm: quán cà phê trong học kỳ, kho hàng vào kỳ nghỉ, xen giữa là vài tuần giao đồ ăn. Đến mùa khai thuế, toàn bộ thu nhập đó được khai chung trong một hồ sơ thuế. Bài này giải thích ATO nhìn các công việc của bạn ra sao, vì sao làm nhiều việc có thể làm thay đổi kết quả, và cần kiểm tra gì trước khi nộp hồ sơ.

## Làm sao ATO đã biết tôi làm những việc gì?

Phần lớn chủ lao động ở Úc báo lương của bạn cho ATO mỗi lần trả lương. Hệ thống này gọi là Single Touch Payroll. Trong năm, nó gửi cho ATO tổng lương trước thuế, số thuế đã trừ và thông tin super của bạn.

Cuối năm tài chính, mỗi chủ lao động hoàn tất dữ liệu này. Sau đó dữ liệu hiện trong tài khoản myGov của bạn dưới dạng bảng kê thu nhập (income statement). Mỗi chủ lao động có một bảng kê riêng, nên làm ba việc thì có ba bảng kê.

Như vậy bạn không cần tự nhớ hết mọi công việc. Nếu chủ lao động đã báo lương của bạn, ATO đã có hồ sơ. Dù vậy, bạn vẫn nên tự ghi lại danh sách mọi công việc và thời gian bạn làm ở từng nơi.

## Vì sao mọi công việc phải nằm trong cùng một hồ sơ?

Mỗi năm tài chính (từ 1/7 đến 30/6) bạn nộp một hồ sơ thuế. ATO đối chiếu hồ sơ của bạn với dữ liệu mà chủ lao động đã báo. Nếu hồ sơ thiếu một chủ lao động, các con số sẽ không khớp.

Khi đó ATO có thể điều chỉnh kết quả tính thuế và cộng thêm phần thu nhập bị thiếu. Nếu bạn đã nhận tiền hoàn thuế, bạn có thể phải trả lại một phần. Khai đủ mọi công việc ngay từ lần đầu sẽ đơn giản hơn nhiều.

- Khai cả những việc làm ngắn, dù chỉ một hai ca
- Khai cả việc làm qua công ty cung ứng lao động hoặc công ty việc làm thời vụ (thường công ty đó là chủ lao động ghi trên bảng kê)
- Khai cả lương nhận tiền mặt và tiền tip, vì thu nhập chịu thuế gồm lương, tiền công, tiền tip và các khoản khác trả cho công việc của bạn

## Vì sao làm hai việc có thể khiến tôi bị truy thu thuế?

Mỗi chủ lao động trừ thuế như thể công việc của họ là công việc duy nhất của bạn. Họ không biết chủ lao động kia trả cho bạn bao nhiêu. Điều này quan trọng nhất với du học sinh có thể là người cư trú về thuế ở Úc, vì người cư trú về thuế có ngưỡng miễn thuế $18,200.

ATO cho biết bạn thường chỉ nên đăng ký ngưỡng miễn thuế với một nơi trả lương, thường là nơi trả cho bạn nhiều nhất. Nếu bạn đăng ký với hai chủ lao động, mỗi nơi sẽ trừ thuế ít hơn mức cần trừ. Khi đó tổng số thuế bị trừ quá thấp so với tổng thu nhập của bạn.

**Một ví dụ cụ thể.** Mei có thể là người cư trú về thuế. Trong năm 2025-26, cô kiếm $15,000 ở một quán cà phê và $15,000 ở một siêu thị. Cô đăng ký ngưỡng miễn thuế ở cả hai nơi, nên mỗi chủ lao động trừ rất ít thuế. Tổng thu nhập của cô là $30,000, tức cao hơn ngưỡng $18,200 là $11,800. Năm 2025-26, thuế suất cho người cư trú với thu nhập từ $18,201 đến $45,000 là 16%, nên thuế trên phần này là $1,888, chưa tính các khoản giảm thuế.

Mei có thể được hưởng khoản giảm thuế cho người thu nhập thấp (low income tax offset), tối đa $700 cho người cư trú về thuế có thu nhập chịu thuế đến $37,500. Khoản này có thể giảm số thuế của cô, nhưng tự nó không tạo ra tiền hoàn thuế. Nếu trong năm bị trừ thuế quá ít, cô vẫn có thể phải đóng phần chênh lệch. Medicare levy là chuyện riêng: nhiều du học sinh không được hưởng Medicare và có thể xin miễn bằng giấy Medicare Entitlement Statement.

## Nếu tôi là người không cư trú về thuế thì sao?

Người không cư trú về thuế không có ngưỡng miễn thuế. Năm 2025-26, người không cư trú về thuế đóng thuế 30% ngay từ đồng đầu tiên cho đến $135,000. Bạn không nên đăng ký ngưỡng miễn thuế với bất kỳ chủ lao động nào.

Vì không có ngưỡng miễn thuế, vấn đề trong ví dụ trên không xảy ra theo cùng cách. Nhưng sai sót vẫn có thể xảy ra. Chủ lao động có thể dùng sai câu trả lời về tình trạng cư trú trên tờ khai TFN của bạn, hoặc bạn bắt đầu đi làm trước khi nhận được TFN. Nếu sau 28 ngày bạn vẫn chưa đưa TFN cho chủ lao động, họ buộc phải trừ thuế theo mức cao nhất cộng thêm Medicare levy. Phần thuế bị trừ thêm đó sẽ được tính lại khi khai thuế.

## Làm nhiều việc thì khi nào nên nộp hồ sơ?

Hãy chờ đến khi mọi bảng kê thu nhập đều hiện “Tax ready”. Phần lớn chủ lao động hoàn tất dữ liệu trước ngày 14/7. Một số chủ lao động nhỏ hoàn tất muộn hơn.

Nếu bạn nộp trước khi mọi bảng kê sẵn sàng, có thể thiếu một công việc hoặc các con số còn thay đổi. Khi đó bạn sẽ phải sửa lại hồ sơ. Chờ thêm vài tuần thường tốt hơn là phải sửa về sau.

Nếu một chủ lao động mãi không hoàn tất dữ liệu, hoặc bạn không thấy một công việc mà bạn biết mình đã làm, hãy liên hệ chủ lao động trước. Xin họ thông tin lương cuối cùng. Nếu chủ lao động không trả lời, bạn cũng có thể nhờ ATO giúp.

## Kiểm tra từng bảng kê thu nhập thế nào?

Xem riêng từng bảng kê, rồi so với phiếu lương của bạn.

- Kiểm tra tổng lương trước thuế có gần với tổng trên phiếu lương cuối cùng của công việc đó không
- Kiểm tra số thuế đã trừ có hợp lý so với tiền lương không
- Kiểm tra số tiền super ghi trên đó, và so với tài khoản ở quỹ super của bạn
- Kiểm tra tên chủ lao động để biết bảng kê thuộc công việc nào

Nếu một chủ lao động trừ thuế cao hơn hẳn những nơi khác, có thể có lý do. Có thể bạn bắt đầu làm khi chưa có TFN, hoặc chủ lao động đó dùng sai mức thuế. Nếu một chủ lao động trừ rất ít thuế, hãy kiểm tra xem bạn có đăng ký ngưỡng miễn thuế ở đó ngoài công việc chính hay không.

## Làm nhiều việc thì cần giữ những gì?

Phần lớn thông tin thu nhập của bạn đến từ chủ lao động qua ATO. Nhưng giấy tờ của riêng bạn vẫn quan trọng để đối chiếu và để khai các khoản khấu trừ.

- Phiếu lương cuối cùng của từng công việc
- Ghi chép mọi khoản trả bằng tiền mặt không có trên phiếu lương
- Hóa đơn chi phí liên quan đến công việc, ghi rõ thuộc công việc nào
- Ngày bắt đầu và ngày kết thúc của từng công việc

## Việc cần làm tiếp theo

- Liệt kê mọi công việc bạn làm từ 1/7 đến 30/6
- Đăng nhập myGov và kiểm tra mỗi công việc đều có bảng kê thu nhập hiện “Tax ready”
- Nếu bạn là người cư trú về thuế và làm hai việc, kiểm tra xem bạn chỉ đăng ký ngưỡng miễn thuế với một chủ lao động
- Nếu đã đăng ký hai lần, hãy sửa tờ khai TFN ngay bây giờ để năm sau không bị lặp lại
- Nộp một hồ sơ thuế có đủ mọi công việc

Nếu bạn cần giúp khai nhiều công việc trong một hồ sơ, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tôi chỉ làm một ca rồi nghỉ luôn. Có phải khai không?', a: 'Có. Mọi thu nhập từ việc làm trong năm tài chính đều phải khai, dù nhỏ đến đâu. Nếu chủ lao động đã báo lương, ATO đã có dữ liệu đó.' },
      { q: 'Một chủ lao động chưa hoàn tất bảng kê thu nhập của tôi. Tôi nên làm gì?', a: 'Hãy chờ, và liên hệ chủ lao động để hỏi khi nào họ hoàn tất. Nếu bạn nộp hồ sơ trước khi mọi bảng kê đều “Tax ready”, sau này bạn có thể phải sửa lại hồ sơ.' },
      { q: 'Nếu mỗi việc trả dưới $18,200, tôi có được đăng ký ngưỡng miễn thuế ở cả hai nơi không?', a: 'ATO cho biết thường chỉ nên đăng ký với một nơi trả lương. Nếu tổng thu nhập từ mọi công việc vượt ngưỡng miễn thuế, đăng ký hai lần có thể khiến bạn bị truy thu thuế.' },
      { q: 'Mỗi công việc có phải khai một hồ sơ thuế riêng không?', a: 'Không. Mỗi năm tài chính bạn nộp một hồ sơ thuế, gồm thu nhập từ mọi công việc của bạn.' },
    ],
  },
  'student-to-graduate-visa-485-tax': {
    title: 'Chuyển từ visa du học sang visa 485: thuế của bạn thay đổi gì',
    description: 'Chuyển từ visa du học 500 sang visa tốt nghiệp 485? TFN của bạn vẫn giữ nguyên, nhưng nên xem lại tình trạng cư trú, Medicare, super và hồ sơ thuế năm tới.',
    answer: 'Khi chuyển từ visa du học sang visa tốt nghiệp 485, TFN, super và cách nộp hồ sơ của bạn vẫn như cũ. Điều bạn nên kiểm tra lại là tình trạng cư trú về thuế, quyền lợi Medicare và cách khai một năm có hai loại visa trong cùng một hồ sơ.',
    body: `Học xong và chuyển sang visa 485 (visa tốt nghiệp tạm thời) là một bước lớn. Nhiều người lần đầu đi làm toàn thời gian, nên thu nhập tăng lên. Bản thân visa mới không làm thay đổi luật thuế, nhưng một số câu trả lời của bạn có thể thay đổi. Bài này điểm qua những gì cần kiểm tra.

Điều kiện làm việc của visa 485 là chuyện visa, không phải chuyện thuế. Hãy tự kiểm tra điều kiện visa của bạn với Bộ Nội vụ (Department of Home Affairs).

## Tôi có cần TFN mới không?

Không. Mã số thuế (TFN) theo bạn suốt đời. Nó vẫn giữ nguyên khi bạn đổi visa, đổi việc, hay rời Úc rồi quay lại.

Đừng xin TFN thứ hai. Hãy tiếp tục dùng cùng một mã số với mọi chủ lao động, quỹ super và hồ sơ thuế. Nếu bạn quên TFN, thường bạn có thể tìm thấy nó trong tài khoản myGov đã liên kết với ATO, hoặc trên phiếu lương cũ hay thông báo tính thuế (notice of assessment) cũ.

## Một năm có hai loại visa thì khai thế nào?

Năm tài chính ở Úc tính từ 1/7 đến 30/6. Visa của bạn có thể đổi vào bất kỳ lúc nào trong năm. Bạn vẫn chỉ nộp một hồ sơ thuế cho cả năm tài chính.

Hồ sơ đó gồm thu nhập trong thời gian bạn có visa du học và thời gian bạn có visa 485. Bạn không tách ra thành hai hồ sơ. Bảng kê thu nhập sẽ hiện từng chủ lao động, bất kể lúc làm ở đó bạn đang có visa gì.

## Tình trạng cư trú về thuế của tôi có thay đổi không?

Tình trạng cư trú về thuế không chỉ dựa vào loại visa. Nó tùy vào hoàn cảnh của bạn. ATO cho biết du học sinh theo học khóa từ 6 tháng trở lên có thể là người cư trú về thuế ở Úc.

Khi khóa học kết thúc và bạn bắt đầu visa 485, hoàn cảnh của bạn thay đổi. Bạn không còn đi học, có thể làm toàn thời gian và có thể ở Úc lâu hơn. Bạn vẫn có thể là người cư trú về thuế, nhưng nên xem lại câu hỏi này, đừng chỉ chép lại câu trả lời của năm trước.

Câu trả lời quan trọng vì nó làm thay đổi thuế suất của bạn. Năm 2025-26:

- Người cư trú về thuế có ngưỡng miễn thuế $18,200, sau đó là 16% từ $18,201 đến $45,000, 30% từ $45,001 đến $135,000, 37% từ $135,001 đến $190,000 và 45% trên $190,000
- Người không cư trú về thuế đóng 30% ngay từ đồng đầu tiên cho đến $135,000, sau đó 37%, rồi 45%, và không có ngưỡng miễn thuế

Nếu bạn bắt đầu công việc mới khi đã có visa 485, tờ khai TFN sẽ hỏi bạn có phải là người cư trú về thuế không. Hãy trả lời theo hoàn cảnh hiện tại của bạn.

## Tôi có nên kiểm tra lại quyền lợi Medicare không?

Có. Khi có visa du học, nhiều du học sinh không được hưởng Medicare và dùng bảo hiểm y tế du học sinh (OSHC) thay thế. Họ có thể xin miễn Medicare levy bằng giấy Medicare Entitlement Statement (MES) do Services Australia cấp.

Bạn cần MES cho mỗi năm bạn xin miễn. Có thể nộp đơn từ ngày 1/7, và ATO cho biết có thể mất đến 8 tuần, nên hãy chờ có giấy rồi mới nộp hồ sơ thuế. Nếu bạn chuyển sang visa 485 trong năm, bảo hiểm y tế và quyền lợi Medicare của bạn có thể khác đi. Nếu bạn đến từ một nước có hiệp định y tế song phương với Úc (reciprocal health care agreement), bạn có thể được hưởng Medicare. Khi đó bạn không thể nhận MES.

## Tiền super của tôi sẽ ra sao?

Tiền super vẫn nằm trong quỹ của bạn và tiếp tục sinh lời. Chủ lao động đóng super cho bạn khi bạn có visa 485 giống như khi bạn có visa du học. Từ ngày 1/7/2026, chủ lao động đóng super cùng lúc với trả lương.

Bạn không thể rút super theo diện Departing Australia Superannuation Payment (DASP) khi đang có bất kỳ visa tạm trú nào còn hiệu lực. Chuyển sang visa 485 nghĩa là bạn chưa đủ điều kiện. DASP là chuyện về sau, sau khi bạn rời Úc và visa đã hết hiệu lực, nếu bạn không có visa khác.

Công việc toàn thời gian mới thường đi kèm một quỹ super mới. Nếu bạn không chọn quỹ, chủ lao động mới nên dùng quỹ hiện có của bạn. Hãy kiểm tra để không mở thêm tài khoản mà không có lý do.

## Nếu tôi làm việc theo ABN khi có visa 485 thì sao?

Một số người sau khi tốt nghiệp bắt đầu làm tự do hoặc làm theo hợp đồng. Bạn chỉ được cấp ABN nếu bạn tự kinh doanh. Chủ lao động không nên bắt bạn phải có ABN như một điều kiện để được nhận vào làm.

Thu nhập theo ABN không bị trừ thuế trước. Bạn khai nó trong hồ sơ thuế cùng với chi phí kinh doanh, và bạn có thể phải đóng thuế cho khoản này. Hãy để dành một phần tiền từ mỗi lần được trả.

## Tôi có còn được khấu trừ chi phí học tập không?

Chi phí tự học (self-education) chỉ được khấu trừ nếu việc học có liên quan trực tiếp đến công việc hiện tại của bạn. Việc học phải giúp duy trì hoặc nâng cao kỹ năng cho công việc hiện tại, hoặc có khả năng làm tăng thu nhập từ công việc đó. Học để tìm một công việc mới thì không được tính. Phần lớn học phí cho bằng cấp của bạn không đáp ứng quy định này, nên đừng mặc định là bạn được khấu trừ.

## Danh sách kiểm tra cho năm bạn đổi visa

- Giữ nguyên TFN và đưa cho mọi chủ lao động mới
- Xem lại tình trạng cư trú về thuế trước khi điền tờ khai TFN mới
- Nếu bạn có thể là người cư trú về thuế, chỉ đăng ký ngưỡng miễn thuế với một chủ lao động
- Kiểm tra quyền lợi Medicare và xin MES nếu bạn cần
- Kiểm tra chủ lao động mới có đóng super vào quỹ hiện có của bạn không
- Nộp một hồ sơ cho cả năm tài chính sau khi các bảng kê thu nhập đã “Tax ready”

Nếu năm của bạn có cả hai loại visa và bạn muốn được giúp khai thuế, bạn có thể nhắn tin cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Năm tôi đổi từ visa du học sang visa 485, tôi có phải nộp hai hồ sơ không?', a: 'Không. Bạn nộp một hồ sơ cho cả năm tài chính, từ 1/7 đến 30/6. Hồ sơ gồm thu nhập của cả hai giai đoạn visa.' },
      { q: 'Khi visa du học hết hạn và visa 485 bắt đầu, tôi có rút super được không?', a: 'Không. Chỉ có thể xin DASP sau khi bạn đã rời Úc và không còn visa tạm trú nào còn hiệu lực. Visa 485 là visa còn hiệu lực.' },
      { q: 'Khi có visa 485, tôi có phải là người cư trú về thuế không?', a: 'Bạn có thể là người cư trú về thuế. Tình trạng cư trú tùy vào hoàn cảnh của bạn, không chỉ dựa vào visa, nên hãy xem lại khi khóa học kết thúc và hoàn cảnh của bạn thay đổi.' },
    ],
  },
  'dasp-documents-checklist-international-students': {
    title: 'Giấy tờ DASP cho cựu du học sinh: bản sao chứng thực',
    description: 'Rút super sau khi visa du học hết hạn? Hệ thống DASP trực tuyến cần gì, khi nào đơn giấy cần bản sao chứng thực, và ai có thể chứng thực khi bạn ở nước ngoài.',
    answer: 'Hệ thống DASP trực tuyến miễn phí của ATO tự kiểm tra visa và việc xuất cảnh của bạn, nên chủ yếu bạn cần hộ chiếu, thông tin liên lạc và thông tin quỹ super. Đơn giấy cần bản sao chứng thực, và nếu số tiền từ $5,000 trở lên thì cần giấy Certification of Immigration Status của Bộ Nội vụ.',
    body: `Khi rời Úc sau khi học xong, bạn có thể rút tiền super mà chủ lao động đã đóng cho bạn. Khoản này gọi là Departing Australia Superannuation Payment (DASP). Giấy tờ là khâu khiến nhiều hồ sơ bị chậm, nhất là khi bạn đã về nước. Bài này giải thích bạn cần gì cho từng cách nộp đơn.

## Tôi có đủ điều kiện xin không?

Trước khi gom giấy tờ, hãy kiểm tra xem bạn có đủ điều kiện không. Thông thường bạn có thể xin DASP khi đáp ứng tất cả các điều sau:

- Bạn được đóng super khi làm việc ở Úc bằng visa tạm trú (không phải visa 405 hoặc 410)
- Visa của bạn đã hết hiệu lực (hết hạn hoặc bị hủy)
- Bạn đã rời Úc
- Bạn không có visa nào khác còn hiệu lực, ví dụ visa tốt nghiệp 485
- Bạn không phải là công dân Úc, thường trú nhân hay công dân New Zealand

Bạn có thể bắt đầu điền đơn trực tuyến trước khi đi, nhưng không thể nộp khi visa tạm trú vẫn còn hiệu lực. Bạn có thể kiểm tra tình trạng visa trên VEVO.

## Nên dùng hệ thống trực tuyến hay mẫu đơn giấy?

ATO có hệ thống nộp đơn DASP trực tuyến miễn phí. Với phần lớn cựu du học sinh, đây là cách đơn giản hơn. Hệ thống tự đối chiếu tình trạng visa và việc xuất cảnh của bạn với dữ liệu của Bộ Nội vụ, nên thường bạn không cần gửi bản sao chứng thực qua bưu điện.

Cách còn lại là mẫu đơn giấy. Bạn gửi đơn kèm giấy tờ đã chứng thực đến từng quỹ super. Đơn giấy tốn công hơn, và yêu cầu về giấy tờ tùy vào số tiền bạn xin rút.

## Hệ thống trực tuyến hỏi những gì?

Chuẩn bị sẵn những thứ sau trước khi bắt đầu:

- Thông tin cá nhân và một địa chỉ email
- Quốc gia cấp và số hộ chiếu (hộ chiếu bạn đã dùng ở Úc)
- TFN, nếu bạn có (không bắt buộc nhưng giúp tìm đúng tài khoản)
- Thông tin từng quỹ super, gồm ABN của quỹ và số thành viên của bạn

ATO cho biết bước kiểm tra điều kiện mất khoảng 45 giây và điền đơn mất khoảng 30 phút. Tiêu chuẩn dịch vụ của ATO là 28 ngày kể từ khi nhận đủ hồ sơ. Bạn nộp một đơn riêng cho mỗi quỹ.

## Đơn giấy dưới $5,000 cần những gì?

Với đơn giấy có số tiền dưới $5,000, hướng dẫn điền đơn của ATO cho biết bạn có thể nộp bản sao chứng thực của:

- Visa của bạn, hoặc bằng chứng bạn đã có visa tạm trú nay không còn hiệu lực
- Trang hộ chiếu có dấu xuất cảnh khi bạn rời Úc

Quỹ của bạn cũng có thể yêu cầu giấy tờ chứng minh nhân thân. Hãy liên hệ quỹ để xác nhận họ cần gì trước khi gửi bất cứ thứ gì.

## Nếu số tiền từ $5,000 trở lên thì sao?

Với đơn giấy từ $5,000 trở lên, bạn phải nộp đơn cho Bộ Nội vụ để xin giấy Certification of Immigration Status. Giấy này xác nhận visa của bạn đã hết hiệu lực và bạn đã rời Úc. Bạn không gửi đơn xin giấy này cho quỹ hay cho ATO. Đơn được gửi đến Bộ Nội vụ.

Việc này thêm một bước và thêm thời gian chờ. Đây là thêm một lý do khiến hệ thống trực tuyến thường dễ hơn khi số dư lớn.

## Ai có thể chứng thực bản sao?

Bản sao chứng thực là bản sao đã được một người có thẩm quyền so với bản gốc. Họ viết hoặc đóng dấu “certified true copy” và ghi chữ ký, họ tên, chức danh và ngày.

Ở Úc, danh sách này gồm Justice of the Peace, luật sư (solicitor), bác sĩ, cảnh sát, và nhân viên ngân hàng, building society hoặc credit union có ít nhất năm năm công tác, cùng một số người khác.

Ở ngoài nước Úc, lựa chọn đầu tiên là nhân viên lãnh sự tại đại sứ quán, cao ủy hoặc lãnh sự quán Úc. Nếu không có, công chứng viên (notary public), Justice of the Peace, thẩm phán, hoặc lục sự hay phó lục sự của tòa án có thể chứng thực. Nếu không có ai trong số này, hãy hỏi quỹ xem họ có chấp nhận hình thức chứng thực khác không.

**Mẹo:** nếu bạn vẫn đang ở Úc, hãy chứng thực bản sao trước khi bay. Làm ở đây thường dễ hơn và rẻ hơn ở nước ngoài.

## Đổi tên và giấy tờ bằng ngôn ngữ khác thì sao?

Nếu bạn đã đổi tên, ví dụ sau khi kết hôn, bạn phải nộp bản sao chứng thực của giấy tờ thể hiện việc đổi tên. Quy định này áp dụng với mọi số tiền.

Nếu giấy tờ không phải bằng tiếng Anh, bạn cần bản dịch chính thức từ một dịch vụ dịch thuật được chấp thuận. Sau đó bạn nộp bản sao chứng thực của cả bản gốc lẫn bản dịch.

**Những lỗi giấy tờ hay gặp.** Đây là những vấn đề làm chậm hồ sơ thường xuyên nhất:

- Tên trên tài khoản super không khớp với hộ chiếu
- Bạn đã đổi hộ chiếu mới, còn quỹ chỉ biết số hộ chiếu cũ
- Người chứng thực không nằm trong danh sách được chấp nhận
- Bạn gửi đơn cho một quỹ không giữ tiền nào của bạn

Trước khi nộp đơn, hãy đăng nhập myGov và xem dịch vụ trực tuyến của ATO. Ở đó hiện các tài khoản super gắn với TFN của bạn, để bạn có thể rút từ mọi quỹ, không chỉ quỹ bạn nhớ.

## Danh sách giấy tờ DASP của bạn

- Xác nhận visa đã hết hiệu lực và bạn không có visa nào khác
- Liệt kê mọi quỹ super kèm ABN của quỹ và số thành viên của bạn
- Giữ bản sao hộ chiếu bạn đã dùng ở Úc, và hộ chiếu mới nếu bạn đã đổi
- Dùng hệ thống trực tuyến miễn phí của ATO nếu có thể
- Với đơn giấy, kiểm tra số tiền: dưới $5,000 cần bản sao chứng thực, từ $5,000 trở lên cần giấy Certification of Immigration Status
- Chứng thực bản sao trước khi rời Úc nếu có thể
- Nếu đã quá sáu tháng kể từ khi bạn rời Úc và visa hết hiệu lực, hãy kiểm tra xem tiền super của bạn đã được chuyển sang ATO chưa`,
    faq: [
      { q: 'Hệ thống DASP trực tuyến có mất phí không?', a: 'Không. Hệ thống nộp đơn DASP trực tuyến của ATO được dùng miễn phí.' },
      { q: 'Tôi có thể chứng thực giấy tờ ở nước mình không?', a: 'Có. Nhân viên lãnh sự tại đại sứ quán, cao ủy hoặc lãnh sự quán Úc có thể chứng thực bản sao. Nếu không có, công chứng viên, Justice of the Peace, thẩm phán hoặc lục sự tòa án có thể chứng thực, hoặc hãy hỏi quỹ xem họ chấp nhận hình thức nào khác.' },
      { q: 'Mỗi quỹ super có cần một đơn riêng không?', a: 'Có. Mỗi quỹ trả số dư của riêng quỹ đó, nên bạn nộp một đơn cho mỗi quỹ đang giữ tiền của bạn.' },
    ],
  },
  'dasp-tax-rate-international-students': {
    title: 'Thuế DASP cho du học sinh: thường là 35%, không phải 65%',
    description: 'Super từ việc làm khi đi học thường bị đánh thuế 35% khi rút sau khi rời Úc, không phải mức 65% của visa working holiday. Cách tính thuế DASP, kèm ví dụ cụ thể.',
    answer: 'Nếu bạn chưa từng có visa working holiday 417 hoặc 462, phần taxed element trong DASP bị đánh thuế 35%, phần untaxed element 45% và phần miễn thuế (tax-free component) 0%. Nếu khoản chi trả có bao gồm super từ các khoản đóng trong thời gian bạn có visa 417 hoặc 462, mức 65% áp dụng cho toàn bộ khoản chi trả.',
    body: `Nhiều du học sinh đọc trên mạng rằng super bị đánh thuế 65% khi rời Úc. Mức thuế này có thật, nhưng là dành cho người có visa working holiday. Với phần lớn du học sinh, mức thuế thấp hơn. Bài này giải thích mức nào áp dụng cho bạn và bạn có thể nhận được bao nhiêu.

## Thuế suất DASP là bao nhiêu?

Khi bạn rút super sau khi rời Úc, khoản tiền này gọi là Departing Australia Superannuation Payment (DASP). Quỹ trừ thuế trước khi trả cho bạn. Thuế suất tùy vào từng phần trong tiền super và lịch sử visa của bạn:

- **Phần miễn thuế (tax-free component):** 0%
- **Taxed element:** 35%, nếu bạn chưa từng có visa 417 hoặc 462
- **Untaxed element:** 45%, nếu bạn chưa từng có visa 417 hoặc 462
- **Toàn bộ khoản chi trả, nếu có super từ các khoản đóng trong thời gian có visa 417 hoặc 462:** 65%

Quỹ xác định thuế suất dựa vào thông tin visa trong đơn DASP của bạn. Bạn không phải khai DASP trong hồ sơ thuế, và cũng không thể xin lại tiền thuế này về sau.

## Các phần trong tiền super của tôi nghĩa là gì?

Phần lớn tiền super của du học sinh đến từ khoản đóng của chủ lao động. Đây là khoản chủ lao động đóng cho bạn, bằng 12% thu nhập với phần lớn người lao động, cộng với tiền lời đầu tư. Ở phần lớn các quỹ, đây là taxed element.

Phần miễn thuế thường đến từ các khoản bạn tự đóng bằng tiền của mình sau thuế. Rất ít du học sinh làm vậy, nên với phần lớn du học sinh, phần miễn thuế nhỏ hoặc bằng không.

Untaxed element rất hiếm. Nó chủ yếu có ở một số quỹ của khu vực nhà nước. Bảng sao kê của quỹ hoặc chính quỹ có thể cho bạn biết số dư của bạn gồm những phần nào.

## Tôi sẽ nhận được bao nhiêu? Một ví dụ cụ thể

Arjun học ở Úc bằng visa du học và chưa từng có visa working holiday. Sau khi anh rời Úc và visa hết hiệu lực, số dư super của anh là $6,000. Toàn bộ thuộc taxed element.

- Thuế 35%: $2,100
- Số tiền Arjun nhận được: $3,900

Nếu trong $6,000 đó có $500 là phần miễn thuế, chỉ $5,500 bị đánh thuế 35%. Tiền thuế sẽ là $1,925 và anh nhận được $4,075.

Phí quỹ và lợi nhuận đầu tư làm số dư thay đổi chút ít cho đến ngày quỹ trả tiền cho bạn. Nếu bạn có nhiều quỹ, mỗi quỹ trừ thuế trên khoản tiền của riêng mình, nên bạn sẽ nhận một khoản từ mỗi quỹ. Quỹ cũng sẽ gửi bạn một bảng tóm tắt thanh toán (payment summary) ghi số tiền trước thuế, số thuế đã trừ và số tiền thực nhận. Hãy giữ lại cùng các giấy tờ của bạn.

## Khi nào mức 65% áp dụng cho cựu du học sinh?

Nếu khoản chi trả có bao gồm super từ các khoản đóng trong thời gian bạn có visa working holiday 417 hoặc 462, ATO áp dụng mức 65% cho toàn bộ khoản chi trả. Có người đến Úc bằng visa working holiday trước, sau đó mới đi học bằng visa du học. Lịch sử super của họ là hỗn hợp.

Trong trường hợp đó, toàn bộ khoản chi trả từ cùng một quỹ chịu một mức thuế, chứ không phải mỗi phần một mức. Quỹ dựa vào thông tin visa trong đơn của bạn để xác định.

**Ví dụ với lịch sử visa hỗn hợp.** Sofia làm việc bằng visa 417 và được đóng $4,000 super. Sau đó cô đi học bằng visa du học và được đóng $6,000 super. Toàn bộ thuộc taxed element.

- Tổng khoản chi trả từ quỹ: $10,000, trong đó có $4,000 từ thời gian có visa 417
- Thuế 65% trên toàn bộ khoản: $6,500
- Sofia nhận được $3,500

Vì vậy bạn cần khai đúng các visa của mình trong đơn DASP. Nếu bạn chưa từng có visa working holiday, hãy chắc chắn đơn thể hiện điều đó.

## Có ai giảm được thuế DASP không?

Không. Thuế suất do luật quy định và quỹ trừ thuế trước khi trả cho bạn. Không có khoản khấu trừ, khoản giảm thuế hay người làm dịch vụ nào có thể hạ mức này. Hãy cẩn thận với bất kỳ ai trên mạng mời chào “mức thuế tốt hơn” cho tiền super của bạn. Có thể họ đang muốn lấy hộ chiếu, TFN và thông tin ngân hàng của bạn.

Hệ thống DASP trực tuyến của ATO là miễn phí. Bạn không cần trả tiền cho ai để dùng nó.

## Bị trừ thuế như vậy thì có đáng rút không?

Với phần lớn cựu du học sinh, có. Nếu bạn không rút, tiền super vẫn nằm ở Úc. Khoảng 6 tháng sau khi bạn rời Úc và visa hết hiệu lực, quỹ sẽ chuyển số super chưa rút sang ATO. Bạn vẫn có thể rút từ ATO về sau, nhưng thuế suất DASP vẫn áp dụng khi bạn rút.

Rút sớm sau khi rời Úc nghĩa là bạn giải quyết lúc mọi thông tin còn mới. Bạn vẫn dùng được email, thông tin ngân hàng ở Úc và các giấy tờ cũ.

## DASP và hồ sơ thuế cuối cùng là hai việc riêng

DASP không thuộc hồ sơ thuế của bạn. Hồ sơ thuế cuối cùng gồm tiền lương bạn kiếm được trong năm tài chính cuối cùng ở Úc. Hồ sơ đó có thể mang lại tiền hoàn thuế hoặc khoản thuế phải đóng, tùy vào số tiền bạn kiếm được và số thuế đã bị trừ.

Nhiều du học sinh khi rời Úc cần nộp hồ sơ sau ngày 30/6, và bạn có thể nộp từ nước ngoài. Nếu được, hãy giữ một tài khoản ngân hàng ở Úc để nhận tiền hoàn thuế (nếu có).

## Danh sách kiểm tra DASP của bạn

- Kiểm tra xem bạn đã từng có visa 417 hoặc 462 chưa, và khai đúng mọi visa của bạn
- Tìm mọi quỹ super đứng tên bạn qua dịch vụ trực tuyến của ATO trong myGov
- Chờ đến khi visa đã hết hiệu lực và bạn đã rời Úc
- Nộp đơn qua hệ thống DASP trực tuyến miễn phí của ATO, mỗi quỹ một đơn
- Nộp hồ sơ thuế cuối cùng riêng, sau ngày 30/6`,
    faq: [
      { q: 'Tôi chỉ có visa du học. Super của tôi có bị đánh thuế 65% không?', a: 'Không. Nếu bạn chưa từng có visa 417 hoặc 462, phần taxed element trong DASP bị đánh thuế 35%. Mức 65% chỉ áp dụng khi khoản chi trả có bao gồm super từ các khoản đóng trong thời gian có visa 417 hoặc 462.' },
      { q: 'Tôi có phải khai DASP trong hồ sơ thuế không?', a: 'Không. Quỹ trừ thuế DASP trước khi trả cho bạn, và khoản tiền này không khai trong hồ sơ thuế ở Úc.' },
      { q: 'Nếu tôi không rút super thì sao?', a: 'Khoảng 6 tháng sau khi bạn rời Úc và visa hết hiệu lực, quỹ sẽ chuyển tiền sang ATO. Bạn vẫn có thể rút từ ATO về sau, và cùng thuế suất DASP sẽ được áp dụng.' },
    ],
  },
  'super-multiple-funds-international-students': {
    title: 'Du học sinh có nhiều quỹ super: cách tìm và gộp lại',
    description: 'Làm việc casual thường khiến du học sinh có hai, ba tài khoản super. Cách xem tất cả trong myGov, khi nào nên gộp, và khi nào nên để nguyên đến lúc rời Úc.',
    answer: 'Bạn có thể xem mọi tài khoản super gắn với TFN của mình trong dịch vụ trực tuyến của ATO qua myGov, và chuyển số dư về một quỹ ngay tại đó. Gộp quỹ thường hợp lý khi bạn vẫn đang làm việc ở Úc, nhưng hãy kiểm tra bảo hiểm và phí ở các quỹ cũ trước.',
    body: `Một du học sinh làm ba việc casual trong thời gian học rất dễ có ba tài khoản super. Mỗi tài khoản có thể thu phí riêng. Khi bạn rời Úc, mỗi quỹ cần một đơn DASP riêng. Bài này giải thích cách tìm mọi tài khoản của bạn và cách quyết định có nên gộp lại hay không.

## Vì sao du học sinh hay có nhiều quỹ super?

Khi bạn bắt đầu một công việc, chủ lao động đưa bạn một mẫu đơn để chọn quỹ super. Nhiều du học sinh không chọn. Họ mới đến Úc và chưa biết quỹ nào, nên để trống.

Với người lao động bắt đầu một công việc sau ngày 1/11/2021, nếu bạn không chọn quỹ, chủ lao động phải hỏi ATO về quỹ “stapled” của bạn. Quỹ stapled là một tài khoản super sẵn có gắn với bạn, để nó có thể theo bạn từ việc này sang việc khác. Quy định này đã giảm bớt vấn đề, nhưng không phải lúc nào cũng ngăn được.

Du học sinh bắt đầu đi làm trước ngày đó, hoặc có tài khoản đầu tiên từ công việc đầu tiên, vẫn có thể có thêm một tài khoản từ mỗi công việc ban đầu.

## Một tài khoản thừa tốn bao nhiêu?

Mỗi quỹ thu phí riêng, và nhiều quỹ mặc định kèm bảo hiểm. Với số dư nhỏ, các chi phí này lâu dần có thể lấy đi một phần lớn số tiền.

- Mỗi tài khoản thường có phí quản lý riêng
- Một số tài khoản bị trừ phí bảo hiểm
- Một tài khoản nhỏ không có khoản đóng mới có thể vơi dần theo thời gian

Trước khi gộp tài khoản, ATO khuyên bạn kiểm tra hai điều ở quỹ cũ. Thứ nhất, bạn có thể mất quyền lợi bảo hiểm khi đóng tài khoản. Thứ hai, một số quỹ có thể thu phí rút ra hoặc phí chuyển vào. Nếu không chắc, hãy liên hệ quỹ và hỏi.

## Làm sao xem tất cả tài khoản super của tôi?

Danh sách đầy đủ nhất nằm trong dịch vụ trực tuyến của ATO. Đăng nhập myGov, mở phần ATO và vào mục super. Ở đó bạn có thể:

- Xem các tài khoản super, kể cả tài khoản bị thất lạc
- Xem tiền super chưa nhận đang do ATO giữ
- Xem các khoản đóng mà chủ lao động đã báo
- Gộp tài khoản

Một số tài khoản có thể không hiện, và thông tin có ghi ngày cập nhật (“as at”). Hãy xem ngày đó, vì các khoản đóng gần đây có thể chưa hiện.

## Gộp tài khoản thế nào?

Trong dịch vụ trực tuyến của ATO, vào Super, rồi Manage, rồi Transfer super. Thao tác này chuyển toàn bộ số dư của một tài khoản sang một quỹ khác do bạn chọn.

Gộp tài khoản không làm thay đổi nơi chủ lao động đóng super cho bạn về sau. Nếu muốn chủ lao động hiện tại đóng vào quỹ bạn giữ lại, hãy đưa họ mẫu đơn chọn quỹ super (super choice form) có thông tin của quỹ đó.

**Một ví dụ.** Lina có ba tài khoản từ ba công việc: $1,800, $900 và $400. Công việc hiện tại đóng vào quỹ thứ nhất. Cô kiểm tra rằng hai quỹ kia không có bảo hiểm mà cô cần. Cô chuyển cả hai số dư về quỹ thứ nhất qua dịch vụ trực tuyến của ATO. Giờ cô có một tài khoản khoảng $3,100, chưa trừ phí, và chỉ phải trả một bộ phí.

## Khi nào nên chờ?

Gộp quỹ hiệu quả nhất khi bạn vẫn đang ở Úc và vẫn đi làm. Làm trực tuyến rất dễ, và sau đó bạn chỉ có một tài khoản cho thời gian còn lại ở Úc.

Nếu bạn sắp rời Úc trong vài tuần tới, việc chuyển tiền có thể vẫn đang xử lý khi bạn muốn nộp đơn DASP. Khi đó, để nguyên các tài khoản có thể đơn giản hơn. Sau khi bạn rời Úc và visa hết hiệu lực, bạn nộp một đơn DASP cho mỗi quỹ. Giấy tờ nhiều hơn, nhưng mỗi đơn được xử lý độc lập.

Nếu bạn có thể chuyển sang visa tốt nghiệp 485 hoặc ở lại lâu hơn, gộp ngay bây giờ thường là đáng. Bạn sẽ còn làm việc vài năm nữa, và mỗi năm có tài khoản thừa có thể là thêm một khoản phí.

Trước khi chọn quỹ để giữ lại, hãy so sánh vài điều: mức phí, bảo hiểm đi kèm, và việc sử dụng từ nước ngoài có dễ không. Quỹ mà chủ lao động hiện tại đang đóng vào thường là lựa chọn đơn giản nhất, vì các khoản đóng mới đã vào đó.

## Nếu quỹ đã chuyển tiền của tôi sang ATO thì sao?

Một số quỹ chuyển các tài khoản nhỏ không hoạt động, hoặc các tài khoản mà họ mất liên lạc, sang ATO. Nếu bạn đã rời Úc, tiền super chưa nhận được chuyển sang ATO khoảng 6 tháng sau khi bạn rời Úc và visa hết hiệu lực. Số tiền này không mất. Nó hiện trong dịch vụ trực tuyến của ATO dưới dạng super do ATO giữ, và bạn vẫn có thể rút.

## Cẩn thận lừa đảo về super

Hãy cẩn thận với bất kỳ ai liên hệ bạn và đề nghị tìm hoặc gộp super giúp bạn. Một số người hỏi TFN, bản scan hộ chiếu hoặc mật khẩu quỹ của bạn. Có những thông tin này, kẻ lừa đảo có thể chuyển tiền của bạn đi.

- Chỉ dùng dịch vụ trực tuyến của ATO hoặc trang web chính thức của quỹ
- Không bao giờ chia sẻ mật khẩu quỹ super
- Bất kỳ ai thu phí làm dịch vụ thuế đều phải đăng ký với Tax Practitioners Board, và bạn có thể tra tên họ trên sổ đăng ký công khai

## Danh sách kiểm tra của bạn

- Đăng nhập myGov và liệt kê mọi tài khoản super đứng tên bạn
- Kiểm tra bảo hiểm và phí của từng quỹ cũ trước khi đóng
- Chuyển số dư cũ về quỹ bạn muốn giữ, qua Super, Manage, Transfer super
- Đưa cho chủ lao động hiện tại thông tin quỹ bạn đã chọn
- Nếu bạn sắp rời Úc, cân nhắc chờ và nộp đơn DASP cho từng quỹ thay vì gộp`,
    faq: [
      { q: 'Gộp quỹ có làm thay đổi nơi chủ lao động đóng super cho tôi không?', a: 'Không. Gộp quỹ chỉ chuyển các số dư hiện có. Muốn đổi nơi chủ lao động đóng từ nay về sau, hãy đưa họ thông tin quỹ bạn chọn qua mẫu đơn chọn quỹ super.' },
      { q: 'Gộp super trong myGov có miễn phí không?', a: 'Bản thân dịch vụ trực tuyến của ATO không thu phí, nhưng quỹ cũ có thể có phí rút ra và bạn có thể mất bảo hiểm. Hãy hỏi quỹ trước.' },
      { q: 'Tôi sắp rời Úc. Có nên gộp quỹ trước không?', a: 'Thường thì không gộp sẽ đơn giản hơn. Một lần chuyển tiền đang xử lý dở có thể làm chậm đơn DASP, nên nhiều người để nguyên các tài khoản và nộp một đơn cho mỗi quỹ.' },
    ],
  },
  'dasp-rejected-international-students': {
    title: 'Đơn DASP bị từ chối? Những lý do hay gặp ở cựu du học sinh',
    description: 'Đơn DASP bị từ chối không có nghĩa là mất tiền super. Những lý do cựu du học sinh hay bị từ chối, từ visa 485 còn hiệu lực đến tên không khớp, và cách khắc phục.',
    answer: 'Đơn DASP bị từ chối thường có nguyên nhân đơn giản: còn một visa đang hiệu lực, thông tin của bạn không khớp với quỹ, quỹ không giữ tiền nào của bạn, hoặc giấy tờ không được chấp nhận. Tiền super vẫn nằm trong quỹ, và bạn có thể nộp lại khi đã khắc phục.',
    body: `Bạn đã học xong, đã rời Úc và đã nộp đơn rút super. Rồi đơn bị từ chối. Chuyện này gây căng thẳng, nhưng tiền của bạn không đi đâu cả. Nó vẫn nằm trong quỹ super, hoặc ở ATO, cho đến khi có một đơn được chấp thuận. Bài này giải thích những lý do hay gặp và cách xử lý từng trường hợp.

## Trước tiên, thông báo ghi gì?

Đọc kỹ thông báo từ quỹ hoặc từ ATO. Có thông báo nêu lý do rõ ràng. Có thông báo chỉ ghi là không xử lý được đơn. Nếu lý do không rõ, hãy liên hệ quỹ và hỏi còn thiếu hay sai điều gì.

Sau đó xem lần lượt các lý do dưới đây. Phần lớn đơn bị từ chối rơi vào một trong số này.

## Lý do 1: vẫn còn một visa đang hiệu lực

Bạn không thể nhận DASP khi đang có bất kỳ visa tạm trú nào còn hiệu lực. Đây là vấn đề hay gặp nhất ở cựu du học sinh, vì nhiều người có hơn một visa qua thời gian.

- Visa du học của bạn có thể chưa hết hiệu lực, dù khóa học đã kết thúc
- Bạn có thể đã được cấp visa tốt nghiệp 485 hoặc một visa khác
- Bạn có thể đang có một visa mà bạn quên mất, hoặc đã xin sau đó

Kiểm tra tình trạng của bạn trên VEVO. Hệ thống DASP trực tuyến của ATO không cho bạn nộp đơn khi visa tạm trú vẫn còn hiệu lực. Nếu còn visa đang hiệu lực, bạn phải chờ đến khi nó hết. Các câu hỏi về bản thân visa thì hỏi Bộ Nội vụ (Department of Home Affairs).

**Bạn chưa rời Úc, hoặc dữ liệu chưa được cập nhật.** Bạn phải đã rời Úc mới được rút. Nếu bạn nộp đơn đúng ngày bay, dữ liệu có thể chưa ghi nhận việc xuất cảnh. Chờ một chút rồi nộp lại. Nếu sau một thời gian việc xuất cảnh vẫn chưa hiện, hãy liên hệ Bộ Nội vụ về dữ liệu xuất nhập cảnh của bạn.

## Lý do 2: thông tin của bạn không khớp với quỹ

Quỹ đối chiếu đơn của bạn với dữ liệu của họ. Nếu họ tên, ngày sinh hoặc số hộ chiếu khác nhau, đơn có thể không được chấp nhận.

Chuyện này hay xảy ra vì chủ lao động gõ vội tên bạn khi mở tài khoản. Có thể thiếu tên đệm, hoặc họ và tên bị đảo ngược.

- Đề nghị quỹ sửa dữ liệu trước, rồi nộp lại
- Nếu bạn đã đổi hộ chiếu mới, hãy ghi thông tin hộ chiếu bạn đã dùng ở Úc, và báo cho quỹ biết về hộ chiếu mới
- Nếu bạn đã đổi tên, ví dụ sau khi kết hôn, bạn cần bản sao chứng thực của giấy tờ thể hiện việc đổi tên

## Lý do 3: quỹ không giữ tiền nào của bạn

Một số du học sinh nộp đơn cho quỹ mà họ nhớ, không phải quỹ mà chủ lao động thật sự đã đóng vào. Nếu quỹ không có số dư nào của bạn, họ không thể trả DASP.

Trước khi nộp lại, hãy xem dịch vụ trực tuyến của ATO trong myGov. Ở đó hiện các tài khoản super gắn với TFN của bạn. Bạn có thể phát hiện mình có hai, ba quỹ, và mỗi quỹ cần một đơn riêng. Ghi lại tên từng quỹ, ABN của quỹ và số thành viên của bạn. Bạn sẽ cần các thông tin này cho đơn trực tuyến. Nếu bạn không đăng nhập được myGov từ nước ngoài, hãy cập nhật cài đặt đăng nhập, hoặc hỏi chủ lao động cũ xem họ đã đóng vào quỹ nào.

## Lý do 4: giấy tờ của bạn không được chấp nhận

Trường hợp này chủ yếu xảy ra với đơn giấy. Người chứng thực có thể không nằm trong danh sách được chấp nhận, bản sao có thể chưa được chứng thực đúng cách, hoặc giấy tờ không phải bằng tiếng Anh.

- Ở ngoài nước Úc, lựa chọn đầu tiên là nhân viên lãnh sự tại đại sứ quán, cao ủy hoặc lãnh sự quán Úc
- Nếu không có, công chứng viên (notary public), Justice of the Peace, thẩm phán hoặc lục sự tòa án có thể chứng thực
- Giấy tờ không phải bằng tiếng Anh cần bản dịch chính thức, kèm bản sao chứng thực của cả hai

Với đơn giấy từ $5,000 trở lên, bạn cần giấy Certification of Immigration Status của Bộ Nội vụ. Dùng hệ thống trực tuyến miễn phí của ATO sẽ tránh được phần lớn rắc rối về giấy tờ, vì hệ thống tự kiểm tra dữ liệu visa và xuất cảnh của bạn.

## Lý do 5: tiền của bạn đã được chuyển sang ATO

Khoảng 6 tháng sau khi bạn rời Úc và visa hết hiệu lực, quỹ phải chuyển tiền super chưa nhận sang ATO. Nếu việc này đã xảy ra, quỹ sẽ báo rằng họ không còn giữ tiền của bạn.

Tiền super của bạn không mất. Bạn vẫn có thể rút theo diện DASP, nhưng giờ là rút từ ATO. Hệ thống DASP trực tuyến xử lý được cả super do ATO giữ.

## Danh sách kiểm tra trước khi nộp lại

Tiêu chuẩn dịch vụ của ATO cho hệ thống trực tuyến là 28 ngày kể từ khi nhận đủ hồ sơ. Đơn thiếu thông tin sẽ mất lâu hơn. Ghi đúng mọi chi tiết ở lần thứ hai là cách nhanh nhất để được trả tiền. Trước khi nộp lại, hãy đi qua danh sách này và khắc phục từng mục:

- Kiểm tra VEVO và xác nhận bạn không còn visa nào đang hiệu lực
- Xác nhận việc bạn rời Úc đã được ghi nhận
- Kiểm tra họ tên, ngày sinh và số hộ chiếu khớp với dữ liệu của quỹ
- Kiểm tra mọi quỹ trong dịch vụ trực tuyến của ATO, và nộp đơn cho từng quỹ đang giữ tiền của bạn
- Kiểm tra xem có khoản super nào đã được chuyển sang ATO chưa
- Dùng hệ thống trực tuyến miễn phí của ATO nếu có thể

Hãy nhớ rằng DASP và hồ sơ thuế cuối cùng là hai việc riêng. Nếu bạn chưa nộp hồ sơ thuế cuối cùng, bạn vẫn có thể nộp từ nước ngoài. Nếu được, hãy giữ một tài khoản ngân hàng ở Úc để nhận tiền hoàn thuế (nếu có).`,
    faq: [
      { q: 'Đơn DASP bị từ chối thì tiền super của tôi có mất không?', a: 'Không. Tiền super vẫn nằm trong quỹ, hoặc ở ATO, cho đến khi có một đơn được chấp thuận. Hãy khắc phục vấn đề rồi nộp lại.' },
      { q: 'Tôi có visa 485. Vì sao đơn của tôi bị từ chối?', a: 'Visa tốt nghiệp 485 là một visa tạm trú còn hiệu lực. Bạn không thể nhận DASP khi đang có bất kỳ visa tạm trú nào còn hiệu lực.' },
      { q: 'Quỹ nói họ không còn giữ tiền của tôi. Tiền ở đâu?', a: 'Nếu bạn rời Úc đã hơn khoảng 6 tháng và visa đã hết hiệu lực, quỹ có thể đã chuyển tiền sang ATO. Hãy xem dịch vụ trực tuyến của ATO và rút từ ATO.' },
    ],
  },
  'report-unpaid-super-international-students': {
    title: 'Quỹ không có tiền super? Cách du học sinh báo cho ATO',
    description: 'Nếu phiếu lương có ghi super mà quỹ thì không thấy, bạn có thể hành động. Hướng dẫn từng bước cho du học sinh: kiểm tra, hỏi chủ lao động, rồi báo super chưa được đóng.',
    answer: 'Trước tiên hãy xem tài khoản quỹ super hoặc dịch vụ trực tuyến của ATO để biết tiền đã vào chưa. Nếu thiếu, hãy hỏi chủ lao động bằng văn bản, và nếu vẫn không được giải quyết, hãy báo cho ATO bằng công cụ trực tuyến của họ.',
    body: `Super là khoản tiền chủ lao động đóng vào quỹ super cho bạn, ngoài tiền lương. Du học sinh được hưởng khoản này như mọi người lao động khác. Đôi khi super có ghi trên phiếu lương nhưng không bao giờ vào đến quỹ. Bài này đưa ra các bước để kiểm tra và báo cáo.

## Du học sinh có được đóng super không?

Thông thường là có. ATO cho biết mọi người lao động nhìn chung đều đủ điều kiện được đóng super bắt buộc (super guarantee), dù làm toàn thời gian, bán thời gian hay casual. Điều này bao gồm cả người tạm trú như du học sinh. Mức đóng là 12% thu nhập của bạn.

Có một ngoại lệ cần biết. Nếu bạn dưới 18 tuổi, chủ lao động chỉ phải đóng super cho những tuần bạn làm trên 30 giờ.

Loại visa của bạn không làm thay đổi điều này. Nếu bạn từ 18 tuổi trở lên, số giờ làm mỗi tuần ít đến đâu cũng không quan trọng.

## Khi nào super phải vào quỹ của tôi?

Quy định đã thay đổi từ ngày 1/7/2026. Thay đổi này gọi là Payday Super.

- **Từ ngày 1/7/2026:** chủ lao động phải đóng super cùng lúc với trả lương, và tiền phải vào quỹ của bạn trong vòng 7 ngày làm việc
- **Với người lao động mới:** khoản đóng đầu tiên có thời hạn dài hơn, trong vòng 20 ngày làm việc
- **Trước ngày 1/7/2026:** chủ lao động có thể đóng super theo quý, hạn chót là 28/10, 28/1, 28/4 và 28/7

Vậy nếu bạn kiểm tra super cho công việc làm sau ngày 1/7/2026, bạn sẽ thấy tiền vào quỹ ngay sau mỗi ngày nhận lương. Với các giai đoạn trước đó, hãy tìm một khoản cho mỗi quý.

## Bước 1: kiểm tra quỹ, không chỉ xem phiếu lương

Phiếu lương phải ghi số super mà chủ lao động nói sẽ đóng, và tên quỹ. Nhưng một dòng trên phiếu lương không chứng minh là tiền đã được đóng.

Đăng nhập trang web hoặc ứng dụng của quỹ super và xem danh sách các khoản đóng. Bạn cũng có thể xem dịch vụ trực tuyến của ATO trong myGov, nơi hiện các khoản đóng mà chủ lao động đã báo. So ngày và số tiền với phiếu lương. Hãy nhớ rằng thông tin của ATO có ghi ngày cập nhật (“as at”), nên các khoản gần đây nhất có thể chưa hiện.

Nếu bạn không biết chủ lao động đã dùng quỹ nào, hãy xem phiếu lương. Phiếu lương phải ghi tên quỹ mà super của bạn được đóng vào. Nếu phiếu lương ghi một quỹ bạn chưa từng nghe tên, có thể chủ lao động đã mở tài khoản mới cho bạn, hoặc dùng quỹ stapled của bạn.

**Một ví dụ.** Tomás kiếm $1,000 mỗi tuần ở một nhà hàng. Với mức 12%, super của anh phải khoảng $120 mỗi tuần. Phiếu lương có ghi super, nhưng quỹ của anh không có khoản nào trong hai tháng. Như vậy có khoảng $1,000 tiền super có thể đang bị thiếu.

## Bước 2: hỏi chủ lao động bằng văn bản

Nhiều trường hợp chỉ là nhầm lẫn. Chủ lao động có thể có sai thông tin quỹ hoặc số thành viên, hoặc một lần chuyển tiền bị lỗi.

Gửi một tin nhắn hoặc email ngắn gọn, lịch sự. Ghi đầy đủ họ tên, thời gian bạn làm việc, tên quỹ và số thành viên. Hỏi khi nào khoản super còn thiếu sẽ được đóng. Giữ lại bản sao những gì bạn gửi và mọi câu trả lời. Cho chủ lao động một khoảng thời gian hợp lý để trả lời, nhưng đừng chờ hàng tháng trời. Nếu bạn không còn làm ở đó, bạn vẫn có thể gửi yêu cầu. Quyền được đóng super không chấm dứt khi công việc kết thúc.

## Bước 3: báo cho ATO

Nếu chủ lao động không khắc phục, hãy dùng công cụ trực tuyến của ATO để báo super chưa được đóng. Thường bạn sẽ cần:

- TFN của bạn
- Khoảng thời gian super chưa được đóng
- ABN của chủ lao động, nếu bạn biết (thường có trên phiếu lương)

ATO sẽ cho bạn biết họ có thể hành động để thu khoản super đó không. Không phải trường hợp nào ATO cũng thu được, nhưng họ có dữ liệu lương và super mà chủ lao động báo, nên dễ kiểm tra hơn. Ai cũng có thể dùng công cụ này, kể cả người có visa tạm trú.

## Nếu tiền lương của tôi cũng sai thì sao?

Super chưa được đóng thường đi kèm các vấn đề khác, như trả lương thấp hoặc không có phiếu lương. Vấn đề về lương thuộc thẩm quyền của Fair Work Ombudsman. Bạn có thể gọi số 13 13 94, hoặc dùng dịch vụ thông dịch qua số 13 14 50.

Người có visa có cùng quyền lợi tại nơi làm việc như những người lao động khác. Fair Work Ombudsman cho biết visa của bạn sẽ không bị hủy vì bạn liên hệ họ để được giúp đỡ.

## Nếu tôi sắp rời Úc thì sao?

Nếu được, hãy báo vấn đề trước khi đi. Theo dõi sẽ dễ hơn khi bạn vẫn còn số điện thoại ở Úc và vẫn vào được các tài khoản của mình.

Khi bạn rút super theo diện DASP, quỹ chỉ trả được số tiền đang có trong tài khoản. Super mà chủ lao động chưa bao giờ đóng thì không có trong quỹ. Nếu sau này ATO thu được, tiền có thể được đóng vào quỹ của bạn, và bạn có thể phải nộp thêm một đơn nữa. Hãy giữ địa chỉ email và tài khoản đăng nhập quỹ còn hoạt động sau khi bạn rời Úc.

## Danh sách kiểm tra của bạn

- Tìm các phiếu lương và ghi lại số super của mỗi kỳ lương
- Kiểm tra tài khoản quỹ và dịch vụ trực tuyến của ATO để xem các khoản đóng
- Hỏi chủ lao động bằng văn bản, kèm thông tin quỹ của bạn
- Nếu vẫn không được giải quyết, báo cho ATO bằng công cụ trực tuyến
- Liên hệ Fair Work Ombudsman nếu tiền lương hoặc phiếu lương của bạn cũng sai
- Giữ lại mọi tin nhắn và mọi phiếu lương`,
    faq: [
      { q: 'Phiếu lương có ghi super. Vậy là đã được đóng chưa?', a: 'Không hẳn. Phiếu lương chỉ cho thấy số tiền chủ lao động nói sẽ đóng. Hãy xem tài khoản quỹ hoặc dịch vụ trực tuyến của ATO để biết tiền đã thật sự vào chưa.' },
      { q: 'Tôi có visa du học, tôi có báo super chưa được đóng được không?', a: 'Được. Ai cũng có thể dùng công cụ của ATO để báo super chưa được đóng, kể cả người có visa tạm trú.' },
      { q: 'Bây giờ super có được đóng mỗi kỳ lương không?', a: 'Từ ngày 1/7/2026, chủ lao động phải đóng super cùng lúc với trả lương, và tiền phải vào quỹ của bạn trong vòng 7 ngày làm việc. Trước đó, chủ lao động có thể đóng theo quý.' },
    ],
  },
  'workplace-injury-student-visa-rights': {
    title: 'Bị tai nạn lao động khi có visa du học: quyền lợi và việc cần làm',
    description: 'Bị thương khi đi làm trong lúc du học ở Úc? Bảo hiểm tai nạn lao động áp dụng thế nào với du học sinh, việc cần làm trước tiên, liên hệ ai ở bang bạn và ảnh hưởng gì khi khai thuế.',
    answer: 'Là người lao động có visa du học, bạn có cùng quyền lợi tại nơi làm việc như mọi người khác, kể cả bồi thường tai nạn lao động (workers compensation). Khoản này có thể trả lương khi bạn chưa đủ sức khỏe đi làm, cùng chi phí y tế và phục hồi chức năng. Mỗi bang và vùng lãnh thổ có chương trình riêng.',
    body: `Nhiều du học sinh làm những công việc có nguy cơ chấn thương thật sự: bếp, kho hàng, dọn dẹp, giao hàng và chăm sóc. Nếu bị thương khi đi làm, bạn có thể lo về tiền bạc, việc học và visa. Bài này giải thích những quyền cơ bản của bạn và các bước đầu tiên cần làm.

## Tôi có cùng quyền lợi như những người lao động khác không?

Có. Fair Work Ombudsman cho biết người có visa có cùng quyền lợi tại nơi làm việc như mọi người lao động khác. Có visa du học không lấy đi quyền được làm việc trong môi trường an toàn hay quyền được bồi thường tai nạn lao động của bạn với tư cách người lao động.

## Bồi thường tai nạn lao động chi trả những gì?

Bồi thường tai nạn lao động (workers compensation) là hệ thống dành cho người lao động bị thương hoặc bị bệnh do công việc. Fair Work Ombudsman cho biết hệ thống này gồm các khoản chi trả cho:

- Tiền lương khi bạn chưa đủ sức khỏe đi làm
- Chi phí y tế
- Phục hồi chức năng

Quy định cụ thể, mức chi trả và thời hạn không giống nhau ở mọi nơi. Chúng do từng bang và vùng lãnh thổ quy định.

**Ai quản lý.** Mỗi bang và vùng lãnh thổ có cơ quan quản lý bồi thường tai nạn lao động riêng. Ví dụ, Victoria có WorkSafe Victoria và Queensland có WorkCover Queensland. Chương trình áp dụng thường là của bang nơi bạn làm việc.

Cơ quan quản lý có thể giải thích quyền lợi của bạn, cách nộp hồ sơ yêu cầu bồi thường và thời hạn ở bang của bạn. Fair Work Ombudsman không xử lý hồ sơ bồi thường tai nạn lao động, nên hãy liên hệ cơ quan quản lý ở bang hoặc vùng lãnh thổ của bạn.

## Ngay sau khi bị thương tôi nên làm gì?

Chi tiết tùy vào bang của bạn, nhưng các bước sau giúp ích trong mọi trường hợp:

- **Lo chăm sóc y tế trước tiên.** Nếu chấn thương nghiêm trọng, hãy gọi 000.
- **Báo cho chủ lao động càng sớm càng tốt.** Nếu được, hãy báo bằng văn bản, ví dụ qua email hoặc tin nhắn, để có ghi nhận kèm ngày tháng.
- **Đi khám bác sĩ và nói rõ chấn thương xảy ra khi đi làm.** Hỏi bác sĩ về giấy chứng nhận bồi thường tai nạn lao động dùng ở bang của bạn.
- **Ghi lại chuyện đã xảy ra.** Ghi ngày, giờ, địa điểm, bạn đang làm gì và ai đã chứng kiến.
- **Giữ mọi giấy tờ.** Giữ giấy chứng nhận y tế, hóa đơn, tin nhắn và phiếu lương.
- **Liên hệ cơ quan quản lý của bang** nếu bạn không chắc cách nộp hồ sơ yêu cầu bồi thường.

Đừng chờ xem chấn thương có đỡ hơn không. Nhiều hồ sơ trở nên khó hơn khi chấn thương được báo muộn.

Nếu vì chấn thương mà bạn không thể đi học hoặc đi thi, hãy báo cả cho trường đại học hoặc cao đẳng. Phần lớn các trường có quy trình xét hoàn cảnh đặc biệt (special consideration) hoặc gia hạn, và giấy chứng nhận y tế sẽ giúp ích. Việc này tách riêng với hồ sơ bồi thường tai nạn lao động, nhưng có thể bảo vệ việc học của bạn trong lúc hồi phục.

## Còn OSHC và Medicare thì sao?

Phần lớn du học sinh có bảo hiểm y tế du học sinh (OSHC) theo yêu cầu của visa, và nhiều người không được hưởng Medicare. Bồi thường tai nạn lao động là hệ thống dùng để chi trả việc điều trị chấn thương do công việc.

Hãy nói với bác sĩ, bệnh viện hoặc chuyên viên vật lý trị liệu rằng chấn thương xảy ra khi đi làm. Nếu bạn bị yêu cầu trả tiền, hãy giữ hóa đơn và hỏi công ty bảo hiểm của chủ lao động hoặc cơ quan quản lý của bang cách xin hoàn lại. Công ty bảo hiểm OSHC có thể cho bạn biết họ chi trả những gì.

## Nếu chủ lao động bảo tôi đừng nộp hồ sơ thì sao?

Một số người lao động bị nói rằng nộp hồ sơ sẽ khiến họ mất việc hoặc mất visa. Đừng để điều này ngăn bạn tìm sự giúp đỡ. Fair Work Ombudsman cho biết visa của bạn sẽ không bị hủy vì bạn liên hệ họ để được giúp về quyền lợi tại nơi làm việc.

Luật Fair Work Act cũng bảo vệ bạn khỏi bị đối xử tệ vì bạn sử dụng một quyền tại nơi làm việc, như khiếu nại hoặc hỏi về công việc của mình. Nếu bạn bị sa thải hoặc bị đe dọa, hãy liên hệ Fair Work Ombudsman qua số 13 13 94, hoặc qua dịch vụ thông dịch số 13 14 50.

## Nếu tôi làm việc theo ABN thì sao?

Bồi thường tai nạn lao động nhìn chung dành cho người làm thuê. Nếu bạn thật sự là nhà thầu tự kinh doanh, có thể bạn không được bảo vệ theo cùng cách. Nhà thầu thường tự mua bảo hiểm.

Nhưng chỉ riêng việc có ABN không biến bạn thành nhà thầu. Nếu doanh nghiệp quyết định bạn làm thế nào, ở đâu và khi nào, có thể thực chất bạn là người làm thuê. Nếu bạn nghĩ mình bị coi là nhà thầu một cách sai, hãy liên hệ Fair Work Ombudsman và cơ quan quản lý của bang.

## Chấn thương ảnh hưởng thế nào đến hồ sơ thuế?

Nếu bạn không thể đi làm trong vài tuần, thu nhập trong năm có thể thấp hơn. Hồ sơ thuế sẽ so số thuế đã bị trừ với số thuế tính trên thu nhập thực tế của bạn.

Nếu bạn nhận các khoản bồi thường tai nạn lao động, hãy báo cho người làm hồ sơ thuế cho bạn. Cách tính thuế cho các khoản này tùy vào loại khoản chi trả. Hãy giữ mọi bảng kê mà công ty bảo hiểm gửi cho bạn. Nếu bạn phải tự trả tiền điều trị, hãy giữ cả hóa đơn, phòng trường hợp được hoàn lại qua hồ sơ bồi thường.

Nếu bạn đi làm lại với công việc nhẹ hơn hoặc ít giờ hơn, hãy kiểm tra phiếu lương. Tiền lương và super phải khớp với số giờ và công việc bạn thực sự làm.

## Danh sách kiểm tra sau khi bị tai nạn lao động

- Đi khám chữa và nói với bác sĩ là chấn thương xảy ra khi đi làm
- Báo cho chủ lao động bằng văn bản càng sớm càng tốt
- Ghi lại chuyện đã xảy ra và ai đã chứng kiến
- Giữ giấy chứng nhận, hóa đơn, tin nhắn và phiếu lương
- Liên hệ cơ quan quản lý bồi thường tai nạn lao động của bang hoặc vùng lãnh thổ để biết cách nộp hồ sơ
- Liên hệ Fair Work Ombudsman nếu bạn bị đe dọa hoặc bị sa thải`,
    faq: [
      { q: 'Có visa du học thì tôi có được bồi thường tai nạn lao động không?', a: 'Nếu bạn là người làm thuê thì có. Người có visa có cùng quyền lợi tại nơi làm việc như những người lao động khác, và bồi thường tai nạn lao động do từng bang và vùng lãnh thổ quản lý.' },
      { q: 'Nộp hồ sơ bồi thường có ảnh hưởng đến visa của tôi không?', a: 'Fair Work Ombudsman cho biết visa của bạn sẽ không bị hủy vì bạn liên hệ họ để được giúp về quyền lợi tại nơi làm việc. Với các câu hỏi về bản thân visa, hãy hỏi Bộ Nội vụ (Department of Home Affairs).' },
      { q: 'Tôi liên hệ ai về hồ sơ bồi thường tai nạn lao động?', a: 'Cơ quan quản lý bồi thường tai nạn lao động ở bang hoặc vùng lãnh thổ nơi bạn làm việc. Fair Work Ombudsman không xử lý các hồ sơ này.' },
    ],
  },
  'unfair-dismissal-student-visa-australia': {
    title: 'Bị cho nghỉ việc khi có visa du học: quy định về sa thải bất công',
    description: 'Mất việc và cho rằng mình bị đối xử bất công? Du học sinh phải nộp đơn trong vòng 21 ngày. Ai được khiếu nại, thời gian làm việc tối thiểu, các bảo vệ chung và tiền lương bạn vẫn được nhận.',
    answer: 'Nếu bạn cho rằng mình bị sa thải bất công, bạn phải nộp đơn lên Fair Work Commission trong vòng 21 ngày kể từ ngày bị sa thải. Để khiếu nại sa thải bất công, thường bạn cần đã làm cho chủ lao động ít nhất 6 tháng, hoặc 12 tháng nếu là doanh nghiệp nhỏ, nhưng khiếu nại theo các bảo vệ chung (general protections) không yêu cầu thời gian tối thiểu.',
    body: `Mất việc là chuyện khó khăn, nhất là khi bạn trông vào công việc đó để trả tiền nhà và chi phí học tập. Nếu bạn cho rằng việc sa thải là bất công, bạn có thể có lựa chọn. Loại visa của bạn không quyết định điều này. Điều quyết định là thời gian bạn đã làm ở đó, quy mô doanh nghiệp và lý do bạn bị sa thải. Quy định quan trọng nhất là thời hạn: 21 ngày.

## Tôi có bao lâu để hành động?

Bạn phải nộp đơn lên Fair Work Commission trong vòng 21 ngày kể từ ngày bị sa thải. Thời hạn này áp dụng cho khiếu nại sa thải bất công. Nó cũng áp dụng cho khiếu nại theo các bảo vệ chung (general protections) liên quan đến việc sa thải.

21 ngày là ngắn. Đừng chờ xin được thư giới thiệu, tìm được việc mới hay thi xong rồi mới làm. Nếu chưa chắc, hãy nộp đơn đúng hạn và tìm tư vấn trong quá trình giải quyết. Fair Work Commission là cơ quan xét xử các vụ sa thải bất công.

## Ai được khiếu nại sa thải bất công?

Thông thường bạn cần đáp ứng các điều kiện sau:

- Bạn là người làm thuê (không phải nhà thầu thật sự)
- Bạn đã làm cho chủ lao động ít nhất 6 tháng, hoặc ít nhất 12 tháng nếu đó là doanh nghiệp nhỏ
- Bạn thuộc phạm vi của một award hoặc thỏa ước doanh nghiệp (enterprise agreement), hoặc bạn có thu nhập dưới ngưỡng thu nhập cao (high income threshold)

Doanh nghiệp nhỏ là doanh nghiệp có dưới 15 nhân viên. Nhân viên của các doanh nghiệp liên quan cũng được tính. Nhân viên casual làm việc thường xuyên và có hệ thống được tính khi xác định quy mô doanh nghiệp.

Nhiều du học sinh làm casual. Việc làm casual có được tính vào thời gian làm việc hay không có thể tùy vào cách bạn làm việc, nên hãy hỏi Fair Work Commission hoặc một dịch vụ pháp lý về trường hợp của bạn.

## Thế nào là sa thải bất công?

Việc sa thải có thể là bất công nếu nó khắc nghiệt, không công bằng hoặc không hợp lý. Điều này xét cả lý do lẫn cách thực hiện.

- Bạn có được cho biết lý do không?
- Bạn có được cơ hội để giải trình không?
- Bạn có được cảnh báo về vấn đề hiệu quả công việc trước khi bị sa thải không?
- Lý do đó có đúng sự thật và công bằng không?

Doanh nghiệp nhỏ phải tuân theo Small Business Fair Dismissal Code. Bộ quy tắc này đặt ra quy trình đơn giản hơn, nhưng chủ lao động vẫn phải tuân theo.

Cắt giảm vị trí (redundancy) là chuyện khác. Nếu chủ lao động không còn cần ai làm công việc của bạn nữa, đó có thể là cắt giảm thật sự. Nếu ngay sau đó có người khác được tuyển để làm đúng công việc ấy, hãy tìm tư vấn. Fair Work Commission xem xét tình hình thực tế, không chỉ những từ ngữ mà chủ lao động dùng.

## Nếu tôi làm ở đó chưa đến 6 tháng thì sao?

Bạn vẫn có thể khiếu nại theo các bảo vệ chung trong luật Fair Work Act. Các quy định này bảo vệ bạn khỏi bị sa thải hoặc bị đối xử tệ vì một số lý do nhất định. Hai lý do quan trọng:

- **Quyền tại nơi làm việc.** Bạn có quyền khiếu nại hoặc hỏi về công việc của mình, ví dụ hỏi vì sao lương hay super của bạn bị sai.
- **Phân biệt đối xử.** Chủ lao động không được gây bất lợi cho bạn vì các đặc điểm như chủng tộc, màu da, giới tính, xu hướng tính dục, tuổi tác, khuyết tật, mang thai, tôn giáo, nguồn gốc quốc gia hay nguồn gốc xã hội.

Nếu bạn bị sa thải ngay sau khi hỏi về lương hoặc super, đây có thể là vấn đề thuộc các bảo vệ chung. Thời hạn 21 ngày vẫn áp dụng với việc sa thải.

## Tôi vẫn được trả những khoản nào?

Dù khiếu nại có kết quả ra sao, chủ lao động vẫn phải trả những gì bạn đã làm ra cho đến ngày làm việc cuối cùng.

- Toàn bộ tiền lương cho số giờ bạn đã làm
- Thời gian báo trước, hoặc tiền thay cho thời gian báo trước, nếu award, thỏa ước hay hợp đồng của bạn yêu cầu
- Ngày phép năm chưa dùng, nếu bạn là nhân viên chính thức (nhân viên casual không có phép năm được trả lương)
- Super trên tiền lương của bạn

Nếu thiếu bất kỳ khoản nào, bạn có thể liên hệ Fair Work Ombudsman qua số 13 13 94 hoặc dùng dịch vụ thông dịch qua số 13 14 50. Super chưa được đóng cũng có thể báo cho ATO.

**Visa của bạn.** Bài này không bàn về quy định visa. Nếu bạn lo về visa, hãy hỏi Bộ Nội vụ (Department of Home Affairs). Fair Work Ombudsman cho biết người có visa có cùng quyền lợi tại nơi làm việc như những người lao động khác, và visa của bạn sẽ không bị hủy vì bạn liên hệ họ để được giúp đỡ.

## Mất việc thì thuế ra sao?

Bị sa thải giữa năm có thể làm thay đổi kết quả thuế của bạn. Nếu thu nhập trong năm thấp hơn dự kiến, số thuế bị trừ trong năm có thể nhiều hơn số thuế bạn phải đóng. Điều này tùy vào tình trạng cư trú về thuế và các khoản thu nhập khác của bạn.

Hãy xin chủ lao động phiếu lương cuối cùng và kiểm tra bảng kê thu nhập đã được hoàn tất. Nếu bạn bắt đầu công việc mới, hãy nộp tờ khai TFN cho chủ lao động mới. Nếu bạn có thể là người cư trú về thuế, chỉ đăng ký ngưỡng miễn thuế với một chủ lao động.

## Tôi có thể được tư vấn miễn phí ở đâu?

Fair Work Commission có thông tin bằng nhiều ngôn ngữ, và có Workplace Advice Service tư vấn pháp lý miễn phí cho người đủ điều kiện. Nhiều trường đại học có dịch vụ pháp lý cho sinh viên, và các trung tâm pháp lý cộng đồng (community legal centre) cũng giúp các vấn đề về việc làm. Hãy liên hệ sớm, vì thời hạn 21 ngày không dừng lại trong lúc bạn tìm sự giúp đỡ.

## Danh sách kiểm tra của bạn

- Ghi lại ngày bị sa thải và tính 21 ngày từ ngày đó
- Giữ hợp đồng, lịch làm việc, phiếu lương và mọi tin nhắn liên quan đến việc sa thải
- Viết một bản tóm tắt ngắn theo thời gian những gì đã xảy ra khi bạn còn nhớ, gồm cả ai đã báo cho bạn và báo bằng cách nào
- Kiểm tra bạn đã nhận đủ lương cuối, tiền báo trước, tiền phép và super
- Nộp đơn lên Fair Work Commission trong vòng 21 ngày nếu bạn muốn khiếu nại
- Liên hệ Fair Work Ombudsman về tiền lương chưa được trả`,
    faq: [
      { q: 'Có visa du học thì tôi có khiếu nại sa thải bất công được không?', a: 'Visa của bạn không quyết định điều này. Nếu bạn là người làm thuê, đã làm đủ thời gian tối thiểu và đáp ứng các điều kiện khác, bạn có thể khiếu nại được.' },
      { q: 'Thời hạn khiếu nại sa thải bất công là bao lâu?', a: 'Bạn phải nộp đơn lên Fair Work Commission trong vòng 21 ngày kể từ ngày bị sa thải. Thời hạn này cũng áp dụng cho khiếu nại theo các bảo vệ chung liên quan đến việc sa thải.' },
      { q: 'Tôi mới làm ở đó 3 tháng. Tôi có lựa chọn nào không?', a: 'Thường bạn không thể khiếu nại sa thải bất công, nhưng bạn có thể khiếu nại theo các bảo vệ chung nếu bị sa thải vì một lý do được bảo vệ, như việc hỏi về tiền lương.' },
    ],
  },
  'bullying-harassment-work-international-students': {
    title: 'Bị bắt nạt hoặc quấy rối ở nơi làm việc: hỗ trợ cho du học sinh',
    description: 'Bị bắt nạt hoặc quấy rối ở chỗ làm thêm? Thế nào là bắt nạt và quấy rối tình dục ở Úc, cách ghi chép lại sự việc, và du học sinh có thể tìm sự giúp đỡ ở đâu.',
    answer: 'Bắt nạt ở nơi làm việc là hành vi không hợp lý lặp đi lặp lại, gây nguy cơ cho sức khỏe và an toàn, còn quấy rối tình dục có thể chỉ là một lần. Du học sinh có cùng quyền lợi tại nơi làm việc như những người lao động khác và có thể đề nghị Fair Work Commission ra lệnh chấm dứt hành vi đó.',
    body: `Có du học sinh chịu đựng bị đối xử tệ ở chỗ làm vì mới đến Úc, cần tiền hoặc sợ ảnh hưởng đến visa. Bạn không phải chấp nhận bị bắt nạt hay quấy rối. Người có visa có cùng quyền lợi tại nơi làm việc như những người lao động khác. Bài này giải thích thế nào thì được tính và bạn có thể tìm sự giúp đỡ ở đâu.

## Thế nào là bắt nạt ở nơi làm việc?

Fair Work Ombudsman cho biết bắt nạt ở nơi làm việc xảy ra khi một người hoặc một nhóm người lặp đi lặp lại hành vi không hợp lý với một người lao động, và hành vi đó gây nguy cơ cho sức khỏe và an toàn.

Ví dụ về hành vi không hợp lý có thể gồm:

- Quát mắng, chửi bới hoặc xúc phạm bạn
- Chế giễu bạn trước mặt người khác, kể cả về giọng nói hay ngôn ngữ của bạn
- Cố tình gạt bạn ra ngoài
- Giao cho bạn những việc hoặc thời hạn không thể làm được để bạn thất bại
- Tung tin đồn về bạn

Từ quan trọng là “lặp đi lặp lại”. Một sự việc đơn lẻ thường không phải là bắt nạt theo định nghĩa này, nhưng vẫn có thể là quấy rối, phân biệt đối xử hoặc vấn đề an toàn.

## Những gì không phải là bắt nạt?

Hành động quản lý hợp lý, được thực hiện một cách hợp lý, không phải là bắt nạt. Người quản lý có thể nhận xét về công việc của bạn, áp dụng biện pháp kỷ luật và chỉ đạo cách làm việc.

Nhưng hành động quản lý không được thực hiện một cách hợp lý thì vẫn có thể là bắt nạt. Ví dụ, người quản lý có thể nói với bạn về một lỗi sai. Ngày nào cũng quát mắng bạn về lỗi đó trước mặt khách hàng là chuyện khác.

## Thế nào là quấy rối tình dục?

Quấy rối tình dục gồm sự tán tỉnh tình dục không được chào đón, lời đề nghị quan hệ tình dục không được chào đón, hoặc hành vi khác mang tính tình dục không được chào đón, trong hoàn cảnh mà một người có thể cảm thấy bị xúc phạm, bị làm nhục hoặc bị đe dọa một cách hợp lý.

Khác với bắt nạt, quấy rối tình dục có thể chỉ là một lần. Không cần phải xảy ra lần nữa bạn mới được hành động. Phạm vi bảo vệ rất rộng, gồm người làm thuê, nhà thầu, người làm qua công ty cung ứng lao động và sinh viên đi thực tập.

Nếu ai đó chạm vào bạn khi bạn không đồng ý, theo dõi hoặc đe dọa bạn, đó cũng có thể là tội phạm. Bạn có thể báo cảnh sát, ngoài việc báo ở chỗ làm. Trong trường hợp khẩn cấp, hãy gọi 000.

## Fair Work Commission có thể làm gì?

Nếu bạn vẫn đang đi làm, bạn có thể nộp đơn lên Fair Work Commission xin lệnh chấm dứt bắt nạt. Bạn cũng có thể xin lệnh chấm dứt quấy rối tình dục tại nơi làm việc. Các lệnh này nhằm chấm dứt hành vi để bạn có thể tiếp tục làm việc an toàn. Chúng chủ yếu không phải về tiền. Nếu bạn muốn được bồi thường, những con đường khác, như khiếu nại về phân biệt đối xử, có thể phù hợp hơn, nên hãy tìm tư vấn xem cách nào hợp với hoàn cảnh của bạn.

Fair Work Commission có một bài kiểm tra điều kiện cho đơn chống bắt nạt. Họ cũng có Workplace Advice Service, tư vấn pháp lý miễn phí cho người đủ điều kiện.

Nếu ai đó không tuân theo lệnh chấm dứt bắt nạt, Fair Work Ombudsman có thể giúp.

## Tôi còn có thể tìm sự giúp đỡ ở đâu?

Nếu bạn cảm thấy an toàn, bạn có thể bắt đầu ngay tại nơi làm việc:

- Một người giám sát hoặc quản lý mà bạn tin tưởng
- Người đại diện về sức khỏe và an toàn
- Bộ phận nhân sự
- Công đoàn

Bên ngoài nơi làm việc:

- Australian Human Rights Commission, cho các khiếu nại về bắt nạt, quấy rối hoặc phân biệt đối xử theo luật liên bang
- Cơ quan chống phân biệt đối xử của bang hoặc vùng lãnh thổ
- Cơ quan về sức khỏe và an toàn lao động của bang hoặc vùng lãnh thổ
- Dịch vụ hỗ trợ sinh viên hoặc dịch vụ pháp lý của trường đại học, nơi thường có thể giúp bạn tìm tư vấn miễn phí
- Fair Work Ombudsman qua số 13 13 94, hoặc dịch vụ thông dịch qua số 13 14 50

## Chủ lao động có thể đe dọa visa của tôi không?

Chủ lao động không quyết định visa của bạn. Fair Work Ombudsman cho biết visa của bạn sẽ không bị hủy vì bạn liên hệ họ để được giúp đỡ. Nếu bạn có câu hỏi về bản thân visa, hãy hỏi Bộ Nội vụ (Department of Home Affairs).

Luật Fair Work Act cũng bảo vệ bạn khỏi bị đối xử tệ vì bạn khiếu nại hoặc hỏi về công việc của mình. Nếu bạn bị sa thải vì đã khiếu nại, bạn có thể khiếu nại theo các bảo vệ chung (general protections), và bạn phải nộp đơn trong vòng 21 ngày kể từ ngày bị sa thải.

## Ghi chép lại thế nào cho tốt?

Một bản ghi chép rõ ràng làm cho mọi khiếu nại mạnh hơn. Hãy bắt đầu ngay, kể cả khi bạn chưa chắc có khiếu nại hay không.

- Ghi lại mỗi sự việc ngay sau khi xảy ra: ngày, giờ, địa điểm và những gì đã được nói hoặc làm
- Ghi lại ai khác có mặt
- Giữ tin nhắn, email và các lần thay đổi lịch làm
- Lưu ghi chép bên ngoài hệ thống của chỗ làm, ví dụ trong email cá nhân, vì bạn có thể mất quyền truy cập khi nghỉ việc

Việc ghi âm cuộc trò chuyện khi không có sự đồng ý có quy định khác nhau ở mỗi bang, nên hãy tìm tư vấn trước khi làm. Ghi chép bằng chữ thì luôn an toàn để giữ.

Nếu hành vi đó ảnh hưởng đến sức khỏe hay giấc ngủ của bạn, hãy đi khám bác sĩ hoặc đến dịch vụ tư vấn tâm lý của trường. Giấy xác nhận của chuyên viên y tế có thể hỗ trợ cho khiếu nại, và cũng có thể giúp nếu bạn cần gia hạn bài vở.

**Kiểm tra cả lương và super.** Một nơi làm việc đối xử tệ với người khác cũng có thể vi phạm những quy định khác. Hãy kiểm tra bạn được trả đúng mức lương, nhận phiếu lương trong vòng một ngày làm việc sau ngày trả lương, và được đóng super vào quỹ. Đây là những khiếu nại riêng, và bạn có thể theo đuổi chúng kể cả sau khi đã nghỉ việc.

## Việc cần làm tiếp theo

- Trước hết hãy bảo đảm bạn được an toàn, và gọi 000 trong trường hợp khẩn cấp
- Bắt đầu ghi chép bằng văn bản ngay hôm nay
- Nói chuyện với một người bạn tin tưởng ở chỗ làm, hoặc với dịch vụ hỗ trợ của trường
- Liên hệ Fair Work Commission về lệnh chấm dứt bắt nạt hoặc quấy rối tình dục
- Liên hệ Fair Work Ombudsman nếu bạn bị sa thải, bị đe dọa hoặc bị trả lương thấp`,
    faq: [
      { q: 'Một sự việc đơn lẻ có được tính là bắt nạt không?', a: 'Theo định nghĩa của Fair Work, bắt nạt là hành vi không hợp lý lặp đi lặp lại. Một sự việc đơn lẻ vẫn có thể là quấy rối tình dục, phân biệt đối xử hoặc vấn đề an toàn.' },
      { q: 'Tôi đã nghỉ việc rồi thì có xin được lệnh chấm dứt bắt nạt không?', a: 'Quy trình xin lệnh chấm dứt bắt nạt dành cho người vẫn đang đi làm, vì mục đích là chấm dứt hành vi. Nếu bạn bị sa thải, có thể áp dụng các lựa chọn khác như khiếu nại theo các bảo vệ chung.' },
      { q: 'Khiếu nại có ảnh hưởng đến visa của tôi không?', a: 'Fair Work Ombudsman cho biết visa của bạn sẽ không bị hủy vì bạn liên hệ họ để được giúp đỡ. Với các câu hỏi về bản thân visa, hãy hỏi Bộ Nội vụ (Department of Home Affairs).' },
    ],
  },
  'unpaid-trial-shift-recover-pay-student-visa': {
    title: 'Đã làm ca thử việc không lương? Cách du học sinh đòi tiền công',
    description: 'Nếu ca thử việc không lương của bạn vượt quá một bài kiểm tra kỹ năng ngắn, bạn có thể được nợ tiền lương. Cách du học sinh tính số tiền được nợ và đòi lại, từng bước một.',
    answer: 'Nếu buổi thử việc dài hơn mức cần thiết để thể hiện kỹ năng, hoặc bạn làm công việc bình thường mà không có người trực tiếp giám sát, bạn lẽ ra phải được trả ít nhất mức lương tối thiểu. Hãy tính số giờ, đòi chủ lao động bằng văn bản, và liên hệ Fair Work Ombudsman nếu họ không trả.',
    body: `Nhiều du học sinh được yêu cầu làm “thử việc” trước khi được nhận. Có những buổi thử việc không lương là hợp pháp. Nhiều buổi thì không. Nếu bạn đã làm thử và không được trả tiền, bạn có thể đòi lại được số tiền đó. Bài này tập trung vào việc cần làm sau buổi thử việc: cách kiểm tra, tính số tiền và đòi tiền.

## Buổi thử việc của tôi có hợp pháp không?

Fair Work Ombudsman cho biết thử việc không lương chỉ hợp pháp khi đáp ứng tất cả các điều sau:

- Nhằm để bạn thể hiện kỹ năng cho công việc
- Có chủ lao động hoặc một nhân viên khác trực tiếp giám sát
- Không dài hơn mức cần thiết để thể hiện kỹ năng, có thể từ một giờ đến một ca tùy công việc

Nếu buổi thử việc kéo dài hơn mức cần thiết, hoặc bạn làm công việc bình thường, bạn phải được trả ít nhất mức lương tối thiểu cho khoảng thời gian đó.

## Dấu hiệu cho thấy lẽ ra bạn phải được trả lương

Hãy nhớ lại những gì đã xảy ra hôm đó. Đây là những dấu hiệu cho thấy buổi thử việc thực chất là đi làm:

- Bạn phục vụ khách thật hoặc làm ra sản phẩm mà cửa hàng đem bán
- Bạn làm một mình, không có ai theo dõi
- Buổi thử việc kéo dài hơn một ca, hoặc bạn được gọi lại làm thêm một ngày không lương nữa
- Bạn làm những việc như dọn dẹp hay xếp hàng, không liên quan đến việc thể hiện kỹ năng
- Cửa hàng đang đông khách và dùng bạn để bù người

Bị nói rằng “ngành này ai cũng làm vậy” không làm thay đổi quy định. Và việc bạn có được nhận hay không cũng không quan trọng. Nếu công việc đó lẽ ra phải được trả lương, thì dù thế nào bạn cũng được nợ số tiền đó.

## Tôi được nợ bao nhiêu?

Bắt đầu từ số giờ bạn đã làm. Sau đó tìm mức lương.

Lương tối thiểu quốc gia là $26.44 một giờ, áp dụng từ kỳ lương đầy đủ đầu tiên bắt đầu vào hoặc sau ngày 1/7/2026. Phần lớn công việc thuộc phạm vi một award, và mức lương theo award thường cao hơn. Nhân viên casual còn được thêm phụ cấp casual (casual loading) trên mức lương cơ bản. Ca cuối tuần, ngày lễ và ca khuya có thể có mức lương phụ trội (penalty rates).

Fair Work Ombudsman có công cụ Pay Calculator giúp xác định đúng award và mức lương. Hãy dùng nó với ngày, giờ và loại công việc.

**Một ví dụ.** Hana làm một buổi “thử việc” không lương sáu tiếng ở một quán cà phê vào ngày thường. Phần lớn thời gian cô tự phục vụ khách và pha cà phê. Chỉ tính theo lương tối thiểu quốc gia, sáu tiếng là $158.64. Số tiền thực của cô có thể cao hơn khi tính mức lương theo award và phụ cấp casual.

## Đòi tiền thế nào?

Hãy đòi bằng văn bản. Một tin nhắn hoặc email ngắn là đủ. Lời đề nghị bằng văn bản cũng trở thành bằng chứng nếu sau này bạn cần sự giúp đỡ.

Nêu rõ:

- Họ tên đầy đủ và số điện thoại của bạn
- Ngày và số giờ thử việc
- Bạn đã làm những việc gì
- Số tiền bạn tính được và cách bạn tính
- Thông tin ngân hàng của bạn, hoặc đề nghị chủ lao động liên hệ với bạn

Giữ thái độ lịch sự và rõ ràng. Có chủ lao động sẽ trả khi nhận được một lời đề nghị bằng văn bản đơn giản.

Cho chủ lao động một hạn trả lời rõ ràng, ví dụ 14 ngày. Nếu họ nói buổi thử việc không lương vì “chỉ là kiểm tra”, bạn có thể dẫn quy định của Fair Work: thử việc không lương phải có giám sát và không dài hơn mức cần thiết để thể hiện kỹ năng. Hãy viết đúng sự việc. Bạn không cần tranh luận chi tiết về luật.

## Tôi nên giữ những bằng chứng gì?

Giữ mọi thứ cho thấy bạn đã có mặt và đã làm gì:

- Tin nhắn hẹn buổi thử việc
- Tin tuyển dụng
- Tên người đã giám sát bạn
- Ảnh hoặc ghi chú trong ngày hôm đó, ghi lại ngay lúc ấy
- Mọi câu trả lời từ chủ lao động

Nếu bạn chưa ghi lại chi tiết, hãy ghi ngay bây giờ. Trí nhớ phai đi rất nhanh. Nếu có những người khác cũng làm thử ở cùng chỗ trong cùng ngày, hãy ghi lại tên họ. Một chuỗi các buổi thử việc không lương có thể giúp Fair Work Ombudsman nhìn ra vấn đề.

## Nếu chủ lao động không chịu trả thì sao?

Bạn có thể liên hệ Fair Work Ombudsman. Họ có thể giúp về tiền lương chưa được trả, kể cả buổi thử việc không lương. Gọi số 13 13 94, hoặc dùng dịch vụ thông dịch qua số 13 14 50. Ngoài ra còn có mẫu đơn để báo vấn đề ở nơi làm việc mà không cần nêu tên.

Fair Work Ombudsman cho biết người có visa có cùng quyền lợi tại nơi làm việc như mọi người lao động khác, và visa của bạn sẽ không bị hủy vì bạn liên hệ họ để được giúp đỡ. Với các câu hỏi về bản thân visa, hãy hỏi Bộ Nội vụ (Department of Home Affairs).

## Nếu được trả tiền thì khi khai thuế thế nào?

Tiền lương cho buổi thử việc là thu nhập từ việc làm. Nếu chủ lao động trả qua hệ thống lương của họ, khoản tiền này sẽ hiện trên phiếu lương và trong bảng kê thu nhập của bạn. Hãy đưa TFN cho chủ lao động để bị trừ đúng số thuế.

Chủ lao động cũng phải đóng super trên khoản lương đó. Phiếu lương phải được đưa trong vòng một ngày làm việc sau ngày trả lương, nên nếu chưa nhận được thì hãy hỏi.

## Danh sách kiểm tra của bạn

- Ghi lại ngày, số giờ và các việc bạn đã làm trong buổi thử việc
- Kiểm tra xem buổi thử việc có vượt quá một bài kiểm tra kỹ năng ngắn, có giám sát hay không
- Dùng Pay Calculator của Fair Work để ước tính số tiền
- Đòi chủ lao động trả tiền bằng văn bản
- Giữ mọi tin nhắn và ghi chú
- Liên hệ Fair Work Ombudsman nếu bạn không được trả`,
    faq: [
      { q: 'Tôi không được nhận. Tôi vẫn được nợ tiền cho buổi thử việc chứ?', a: 'Có, nếu buổi thử việc vượt quá một bài kiểm tra kỹ năng ngắn có giám sát. Quyền được trả lương đến từ công việc bạn đã làm, không phải từ việc bạn có được nhận hay không.' },
      { q: 'Thử việc không lương hợp pháp được kéo dài bao lâu?', a: 'Không dài hơn mức cần thiết để thể hiện kỹ năng. Fair Work Ombudsman cho biết có thể từ một giờ đến một ca, tùy công việc, và phải có người trực tiếp giám sát.' },
      { q: 'Nếu chủ lao động từ chối trả, ai có thể giúp tôi?', a: 'Fair Work Ombudsman, qua số 13 13 94 hoặc qua dịch vụ thông dịch số 13 14 50. Người có visa có cùng quyền lợi tại nơi làm việc như những người lao động khác.' },
    ],
  },
  'uniform-laundry-pay-deductions-students': {
    title: 'Bị trừ lương tiền đồng phục và giặt ủi: quy định cho du học sinh',
    description: 'Chủ lao động trừ lương bạn tiền đồng phục hay giặt ủi? Khi nào được phép trừ lương, cách lấy lại tiền, và du học sinh được khấu trừ những gì khi khai thuế.',
    answer: 'Thông thường chủ lao động chỉ được trừ tiền từ lương của bạn nếu bạn đồng ý bằng văn bản và khoản trừ chủ yếu vì lợi ích của bạn, hoặc nếu luật, lệnh của tòa án hay award của bạn cho phép. Nếu bạn tự trả tiền đồng phục bắt buộc, bạn có thể được khấu trừ khoản đó, cùng tiền giặt, khi khai thuế.',
    body: `Có du học sinh thấy trên phiếu lương những khoản trừ không ngờ tới: phí đồng phục, phí giặt ủi hằng tuần, hay tiền bị trừ vì làm vỡ một cái ly. Có người khác thì bị bảo tự mua đồng phục. Bài này giải thích khi nào chủ lao động được trừ tiền từ lương của bạn, cách đòi lại, và đồng phục có thể ảnh hưởng thế nào đến hồ sơ thuế.

## Khi nào chủ lao động được trừ tiền từ lương của tôi?

Fair Work Ombudsman cho biết chủ lao động được trừ tiền từ lương của bạn khi:

- Bạn đồng ý bằng văn bản, và khoản trừ chủ yếu vì lợi ích của bạn
- Luật, hoặc lệnh của tòa án hay của Fair Work Commission cho phép, ví dụ tiền thuế bị trừ từ lương của bạn
- Award của bạn cho phép

Sự đồng ý của bạn phải là thật lòng. Chủ lao động không được ép bạn đồng ý với một khoản trừ. Nếu bạn đã đồng ý với một khoản trừ định kỳ, bạn có thể rút lại sự đồng ý bằng văn bản bất cứ lúc nào.

## Những khoản trừ nào hay có vấn đề?

Ngay cả khi có thỏa thuận đã ký, một khoản trừ sẽ không có hiệu lực nếu nó có lợi cho chủ lao động và không hợp lý trong hoàn cảnh đó. Những khoản hay gây thắc mắc gồm:

- Tiền đồng phục mà công việc bắt buộc phải mặc
- Phí giặt ủi hằng tuần hoặc theo ca
- Tiền bị trừ vì làm vỡ đồ
- Tiền bị trừ vì quầy thu ngân bị thiếu
- Phí đào tạo hoặc tiền đặt cọc

Ví dụ, Fair Work Ombudsman nêu một trường hợp quầy thu ngân bị thiếu $20. Chủ lao động không được trừ số tiền đó vào lương của người lao động và phải tự bù khoản thiếu.

## Có ngoại lệ nào không?

Một số award cho phép một số khoản trừ nhất định. Ví dụ, Hospitality Award chỉ cho phép trừ tiền làm vỡ đồ hoặc thiếu tiền quầy mà không cần đồng ý trong những trường hợp rất hẹp. Khoản trừ phải hợp lý và tương xứng với thiệt hại, người lao động phải từ 18 tuổi trở lên, và phải đã cố ý có hành vi sai trái (wilful misconduct).

Nếu bạn dưới 18 tuổi, có thêm quy định khác. Trong nhiều trường hợp, cha mẹ hoặc người giám hộ cũng phải đồng ý bằng văn bản.

Vì mỗi award khác nhau, hãy kiểm tra award của bạn. Fair Work Ombudsman có thể cho bạn biết công việc của bạn thuộc award nào.

## Làm sao để lấy lại tiền?

Bắt đầu từ các con số. Xem từng phiếu lương và cộng các khoản trừ mà bạn không đồng ý, hoặc bạn cho là không công bằng.

- Liệt kê từng khoản trừ kèm ngày và số tiền
- Gửi chủ lao động một lời đề nghị ngắn bằng văn bản, kèm tổng số tiền và danh sách
- Nếu bạn đã đồng ý với một khoản trừ định kỳ và muốn dừng lại, hãy rút lại sự đồng ý bằng văn bản
- Nếu chủ lao động từ chối, hãy liên hệ Fair Work Ombudsman qua số 13 13 94, hoặc dịch vụ thông dịch qua số 13 14 50

Phiếu lương phải ghi từng khoản trừ. Nếu phiếu lương không cho thấy tiền đi đâu, hãy đề nghị giải thích. Người có visa có cùng quyền lợi tại nơi làm việc như những người lao động khác.

## Khoản trừ ảnh hưởng thế nào đến super và thuế?

Hãy xem khoản trừ được tính trước hay sau khi xác định tổng lương trước thuế. Nếu tổng lương trước thuế bị giảm, super của bạn cũng có thể bị tính trên số tiền thấp hơn. Hãy kiểm tra tổng lương trước thuế và super có khớp với số giờ bạn làm và mức lương của bạn không.

## Tôi có được khấu trừ tiền đồng phục khi khai thuế không?

Đôi khi có. Điều này áp dụng khi bạn tự trả tiền đồng phục và chủ lao động không hoàn lại cho bạn. ATO chỉ cho khấu trừ một số loại trang phục:

- Trang phục riêng của một nghề
- Đồ bảo hộ
- Đồng phục bắt buộc, ví dụ đồng phục có logo của chủ lao động
- Đồng phục không bắt buộc đã được đăng ký với chính phủ

Quần áo thông thường thì không được khấu trừ, kể cả khi chủ lao động yêu cầu. Ví dụ, quần đen và áo sơ mi trắng của nhân viên quầy bar là trang phục thông thường, nên bạn không thể khấu trừ.

## Tôi có được khấu trừ tiền giặt không?

Nếu bạn được khấu trừ trang phục, bạn cũng được khấu trừ chi phí giặt chúng. ATO cho phép $1 cho mỗi mẻ giặt nếu chỉ có quần áo đi làm, hoặc 50 cent cho mỗi mẻ nếu giặt chung với đồ khác.

Với năm 2025-26 và các năm trước, bạn cần bằng chứng bằng văn bản nếu tổng các khoản khấu trừ chi phí công việc trên $300 và khoản khấu trừ tiền giặt trên $150. Từ năm 2026-27, bạn cần bằng chứng bằng văn bản cho mọi khoản khấu trừ tiền giặt, nên hãy bắt đầu ghi một cuốn nhật ký đơn giản về các lần giặt đồ đi làm.

Hãy nhớ ba quy tắc cho mọi khoản khấu trừ liên quan đến công việc: bạn đã bỏ tiền ra và không được hoàn lại, khoản chi liên quan trực tiếp đến việc tạo ra thu nhập, và bạn có giấy tờ chứng minh. Nếu chủ lao động cho bạn đồng phục miễn phí, hoặc đã hoàn tiền cho bạn, bạn không thể khấu trừ tiền mua đồng phục.

**Khoản khấu trừ tiêu chuẩn từ năm 2026-27.** Từ năm 2026-27, người cư trú về thuế có thu nhập từ lao động có thể khấu trừ một khoản tiêu chuẩn (standard deduction) đến $1,000 thay vì liệt kê các chi phí công việc nhỏ. Nếu bạn khai riêng các chi phí công việc, khoản khấu trừ tiêu chuẩn sẽ giảm tương ứng từng đồng. Quy định này bắt đầu sau hồ sơ thuế năm 2025-26, nên không áp dụng cho hồ sơ bạn nộp bây giờ.

## Danh sách kiểm tra của bạn

- Xem từng phiếu lương để tìm các khoản trừ và ghi lại
- Đề nghị chủ lao động bằng văn bản giải thích hoặc hoàn lại những khoản bạn không đồng ý
- Rút lại mọi thỏa thuận bằng văn bản mà bạn không còn chấp nhận
- Liên hệ Fair Work Ombudsman nếu chủ lao động từ chối
- Giữ hóa đơn nếu bạn tự trả tiền đồng phục bắt buộc
- Ghi nhật ký giặt cho quần áo đi làm được khấu trừ`,
    faq: [
      { q: 'Tôi đã ký giấy đồng ý bị trừ tiền giặt ủi. Như vậy có được phép không?', a: 'Không phải lúc nào cũng được. Một khoản trừ có lợi cho chủ lao động và không hợp lý thì không có hiệu lực, kể cả khi có thỏa thuận đã ký. Bạn cũng có thể rút lại thỏa thuận bằng văn bản bất cứ lúc nào.' },
      { q: 'Quầy thu ngân bị thiếu tiền, sếp có được trừ vào lương tôi không?', a: 'Thông thường là không. Một số award chỉ cho phép trong những trường hợp rất hẹp, như người lao động từ 18 tuổi trở lên cố ý có hành vi sai trái, và số tiền phải hợp lý.' },
      { q: 'Tôi có được khấu trừ quần đen và áo sơ mi trắng đi làm không?', a: 'Không. ATO cho biết trang phục thông thường không được khấu trừ, kể cả khi chủ lao động yêu cầu.' },
      { q: 'Giặt đồng phục đi làm thì được khấu trừ bao nhiêu?', a: 'ATO cho phép $1 cho mỗi mẻ giặt chỉ có quần áo đi làm, hoặc 50 cent cho mỗi mẻ nếu giặt chung với đồ khác. Bản thân trang phục đó phải thuộc loại được khấu trừ.' },
    ],
  },
}
