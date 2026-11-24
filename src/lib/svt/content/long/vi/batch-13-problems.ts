import type { LongText } from '../types'

/**
 * myGov, DASP and bank account problems for students (24 Nov 2026).
 * Written natively in Vietnamese; slug, category, dates and sources come
 * from the English twins in long/en/batch-13-problems.ts.
 */
export const LONG_VI_13: Readonly<Record<string, LongText>> = {
  'mygov-sms-code-overseas-international-students': {
    title: 'Về nước không nhận được mã myGov? Cách xử lý cho du học sinh',
    description: 'Số Úc đã hủy nên mã SMS của myGov không về? Các cách đăng nhập khác, cách lấy lại hoặc tạo tài khoản mới, và cách khai thuế, rút super khi chưa vào được myGov.',
    answer: 'Mã SMS của myGov chỉ gửi về số điện thoại Úc đã đăng ký trong tài khoản, nên khi số bị hủy bạn sẽ không nhận được mã. Bạn có thể đăng nhập bằng ứng dụng myGov, passkey hoặc Digital ID (myID) nếu đã cài trước; nếu chưa, myGov hướng dẫn tạo tài khoản mới rồi liên kết lại với ATO. Để nộp hồ sơ thuế cuối cùng hay rút super, bạn không nhất thiết phải sửa myGov trước.',
    body: `Nhiều du học sinh đăng ký myGov bằng số điện thoại Úc. Học xong, về Việt Nam, số đó bị hủy, và myGov vẫn gửi mã đăng nhập về số cũ. Bài này tóm tắt những gì myGov và ATO hướng dẫn, và những việc bạn vẫn làm được mà không cần myGov.

## Vì sao về nước rồi thì không nhận được mã myGov?

Theo myGov, mã SMS luôn được gửi về số điện thoại đã đăng ký trong tài khoản. Khi ở nước ngoài, bạn phải dùng đúng số Úc đó, bật chuyển vùng quốc tế và kết nối với mạng mà nhà mạng của bạn hỗ trợ. Khi sim trả trước đã bị khóa hoặc hết hạn, mã không còn nơi nào để đến.

Một số điện thoại mới cũng không giải quyết được ngay. myGov cho biết bạn phải cập nhật số mới trong tài khoản trước khi dùng nó để nhận mã, và chỉ làm được việc này khi bạn còn đăng nhập được.

## Nên kiểm tra gì trước?

Nếu số Úc của bạn vẫn còn dùng được mà lần này không thấy mã, myGov khuyên kiểm tra:

- điện thoại có sóng không, chế độ máy bay đã tắt chưa;
- khởi động lại điện thoại;
- bộ nhớ máy có bị đầy không;
- tin nhắn có bị chặn hoặc vào mục tin rác không;
- hệ điều hành có cần cập nhật không.

Nếu vẫn không nhận được, bạn cần chuyển sang một cách đăng nhập khác.

## Những cách đăng nhập nào không cần số Úc?

myGov cho biết nếu trước đó bạn đã bật ứng dụng myGov, passkey hoặc Digital ID, bạn có thể dùng chúng để đăng nhập khi không nhận được mã SMS. Người đăng nhập bằng các cách này cũng không cần thay đổi gì trước khi ra nước ngoài.

Với dịch vụ trực tuyến của ATO, quy định chặt hơn. ATO cho biết bạn có thể đăng nhập bằng myID mức Standard hoặc Strong, passkey, ứng dụng xác thực, hoặc mã SMS gửi về số điện thoại Úc. Nếu bạn ở nước ngoài và không có số Úc, ATO khuyên dùng myID, passkey hoặc ứng dụng xác thực. Ứng dụng xác thực có thể là Google Authenticator, Apple Passwords hoặc 1Password, và chỉ cài được khi bạn đang đăng nhập.

Vì vậy cách an toàn nhất là thêm một cách đăng nhập không phụ thuộc vào số Úc khi bạn còn vào được tài khoản.

## Đã về nước và không đăng nhập được thì làm sao?

ATO cho biết nếu bạn có myID mức Strong, với tên, ngày sinh và email trùng với tài khoản myGov, bạn có thể chọn “I didn't get my code” ở trang đăng nhập, rồi chọn “Continue with Digital ID” để lấy lại tài khoản. Theo trang myID, mức Strong cần giấy tờ tùy thân của Úc và xác minh ảnh, nên du học sinh chỉ có hộ chiếu nước ngoài thường không làm được bước này.

Nếu không lấy lại được, myGov và ATO đều hướng dẫn tạo tài khoản myGov mới rồi liên kết lại với ATO. Tài khoản mới có thể dùng email khác; nếu muốn dùng lại email cũ, bạn cần gọi bộ phận hỗ trợ myGov để họ giải phóng email đó. Khi tạo tài khoản mới, hãy chọn ngay một cách đăng nhập không cần số Úc.

Bộ phận hỗ trợ myGov: từ nước ngoài gọi +61 1300 169 468 và chọn số 1 (ở Úc gọi 132 307, chọn số 1). Giờ làm việc theo giờ Úc: thứ Hai đến thứ Sáu 7 giờ sáng đến 10 giờ tối, thứ Bảy và Chủ nhật 10 giờ sáng đến 5 giờ chiều. Có thể mất phí gọi quốc tế. Bộ phận này chỉ hỗ trợ về tài khoản myGov.

## Có đổi số myGov sang số Việt Nam được không?

Chỉ đổi được khi đã đăng nhập. myGov cho biết số điện thoại được sửa trong phần thông tin liên lạc của tài khoản, nên khi không vào được tài khoản thì bạn không đổi được.

Ngay cả khi đổi được, hãy nhớ quy định của ATO: mã SMS để đăng nhập dịch vụ trực tuyến của ATO phải gửi về số điện thoại Úc. Vì vậy sau khi về nước, thay vì đổi số, bạn nên chuyển sang passkey, ứng dụng xác thực hoặc myID.

## Tạo tài khoản mới thì có mất hồ sơ thuế không?

Không. Bảng kê thu nhập, thông báo tính thuế và thông tin super do ATO lưu giữ, không nằm trong myGov. Tài khoản myGov mới chỉ cần liên kết lại với ATO là bạn xem được các hồ sơ này trực tuyến. Khi liên kết, ATO hỏi vài câu dựa trên thông tin họ đang có, như phiếu lương gần nhất, một tài khoản super đang hoạt động hoặc tài khoản ngân hàng đã nhận tiền hoàn thuế. Bài của chúng tôi về liên kết ATO với myGov giải thích từng câu hỏi.

## Khai thuế và rút super có bắt buộc phải có myGov không?

Không nhất thiết. ATO cho biết muốn tự khai trực tuyến bằng myTax thì cần tài khoản myGov đã liên kết với ATO. Khi ở ngoài nước Úc, bạn cũng có thể khai thuế qua đại lý thuế đã đăng ký hoặc nộp hồ sơ giấy. Bảng kê thu nhập của bạn vẫn nằm ở ATO, không mất đi khi bạn không vào được myGov.

Rút super (DASP) cũng khác. Đơn DASP trực tuyến của ATO hỏi thông tin cá nhân, email, nước cấp và số hộ chiếu, và thông tin quỹ super; TFN không bắt buộc. Danh sách đó không có bước đăng nhập myGov.

Một điều cần nhớ: ATO chỉ trả tiền hoàn thuế vào tài khoản ngân hàng ở Úc. Đừng đóng tài khoản ở Úc trước khi nhận được tiền.

## Bạn không cần myGov để chúng tôi giúp

Bạn không cần myGov để khai thuế với Student Visa Tax. Chúng tôi làm việc trực tiếp với ATO, và hồ sơ được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO. Chúng tôi không bao giờ hỏi mật khẩu myGov của bạn. Dù bạn đang ở đâu, hãy nhắn cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Tạo tài khoản myGov mới thì hồ sơ thuế cũ có mất không?', a: 'Không. Bảng kê thu nhập, thông báo tính thuế và thông tin super do ATO lưu giữ, không nằm trong myGov. Khi liên kết tài khoản mới với ATO, ATO sẽ hỏi vài câu dựa trên thông tin họ đang có về bạn.' },
      { q: 'Có dùng số điện thoại Việt Nam để nhận mã được không?', a: 'Bạn phải đăng nhập mới đổi được số. Hơn nữa, ATO cho biết mã SMS để vào dịch vụ trực tuyến của ATO phải gửi về số điện thoại Úc. Khi ở nước ngoài, ATO khuyên dùng myID, passkey hoặc ứng dụng xác thực.' },
      { q: 'Không vào được myGov thì tiền super có bị mất không?', a: 'Không. Danh sách thông tin của đơn DASP trực tuyến không có bước đăng nhập myGov. Sau khi bạn rời Úc đủ 6 tháng và visa đã hết hiệu lực, super chưa rút sẽ được chuyển sang ATO, và bạn vẫn xin rút từ ATO được.' },
    ],
  },

  'cant-link-ato-mygov-international-students': {
    title: 'Không liên kết được ATO với myGov: du học sinh làm gì',
    description: 'Không trả lời được câu hỏi xác minh, gặp mã lỗi, hay ATO không hiện trong myGov? Cách đăng nhập ATO chấp nhận, ý nghĩa mã lỗi và số gọi từ nước ngoài.',
    answer: 'Khi bạn liên kết myGov với ATO, ATO hỏi vài câu dựa trên hồ sơ họ đang có để xác minh danh tính, và bỏ qua tất cả câu hỏi bị tính là một lần thất bại. Với du học sinh, câu dễ trả lời nhất thường là số biên nhận đơn TFN, hộ chiếu đã dùng khi xin TFN và phiếu lương gần nhất; nếu vẫn không liên kết được, bạn vẫn khai thuế được mà không cần myGov.',
    body: `Có tài khoản myGov chưa đủ: bạn phải liên kết thêm ATO mới xem được bảng kê thu nhập, tiền super và tự khai thuế bằng myTax. Du học sinh hay vướng ở bước này, nhất là khi vừa tạo tài khoản myGov mới sau khi về nước. Bài này đi theo hướng dẫn của ATO, từng bước một.

## ATO chấp nhận những cách đăng nhập nào?

ATO cho biết để liên kết hoặc dùng dịch vụ trực tuyến của ATO, bạn đăng nhập myGov bằng một trong các cách sau:

- myID ở mức Standard hoặc Strong;
- passkey;
- ứng dụng xác thực;
- mã SMS gửi về số điện thoại Úc.

Câu hỏi bí mật không được chấp nhận. ATO cho biết nếu câu hỏi bí mật là cách đăng nhập duy nhất của bạn, tài khoản myGov sẽ bị hủy liên kết với ATO. Vì vậy, trước khi liên kết, hãy thêm passkey hoặc ứng dụng xác thực trong phần cài đặt đăng nhập.

## ATO sẽ hỏi những gì khi liên kết?

Các câu hỏi dựa trên hồ sơ ATO đang có về bạn. Bạn không cần trả lời được mọi loại, nhưng bỏ qua tất cả câu hỏi bị tính là một lần thất bại. ATO có thể hỏi về:

- tài khoản ngân hàng đã nhận tiền hoàn thuế từ ATO hoặc có tiền lãi trong 2 năm gần đây;
- một tài khoản super đang hoạt động;
- thông báo tính thuế (notice of assessment) trong 5 năm gần đây;
- bảng tóm tắt lương PAYG (payment summary) trong 2 năm gần đây;
- giấy tờ đi lại, nếu bạn xin TFN với tư cách khách tạm trú trong 4 năm gần đây;
- số biên nhận đơn xin TFN;
- số tiền hoàn thuế của ATO trong 2 năm gần đây;
- phiếu lương gần nhất.

Phần lớn du học sinh xin TFN bằng hộ chiếu, nên câu về giấy tờ đi lại thường dễ trả lời nhất, nếu lần xin đó trong 4 năm gần đây. Hãy để sẵn hộ chiếu, phiếu lương và bảng sao kê của quỹ super trước khi bắt đầu. Câu nào không chắc thì bỏ qua, đừng đoán.

## Các mã lỗi khi liên kết có nghĩa là gì?

ATO liệt kê một số mã lỗi hay gặp:

- **IDD.002, IDD.004, IDD.006:** thông tin không khớp. Kiểm tra TFN, họ tên và địa chỉ. Nếu bạn chỉ có một tên, nhập vào ô Family name.
- **OVK.001:** cách đăng nhập của bạn không được hỗ trợ. Đăng xuất, đăng nhập lại bằng myID rồi thử lại; nếu không dùng được myID, hãy liên hệ ATO.
- **LCK.001 đến LCK.005:** bạn đã thử quá nhiều lần. Chờ đến thời điểm hệ thống cho biết rồi thử lại.
- **IDD.003, ICI.001, OVK.002:** không thể liên kết trực tuyến, bạn cần liên hệ ATO.

ATO cũng cho biết nếu bạn không xác minh được danh tính trực tuyến, hệ thống sẽ cho bạn biết bước tiếp theo.

## ATO không hiện trong myGov thì làm gì?

Trên trang chủ myGov, chọn “View and link services”, tìm Australian Taxation Office và chọn “Link”. Nếu ATO đã hiện là đã liên kết mà bạn không mở được, hãy chọn “Unlink”, chờ xác nhận, rồi chọn “Link” lại.

Nếu bạn vừa tạo tài khoản myGov mới, việc ATO chưa có trong danh sách là bình thường. Bạn cần liên kết lại và trả lời lại các câu hỏi xác minh.

## Ở nước ngoài thì gọi số nào?

- ATO: từ nước ngoài gọi +61 2 6216 1111, thứ Hai đến thứ Sáu, 8 giờ sáng đến 5 giờ chiều giờ miền Đông nước Úc; ở Úc gọi 13 28 61. Chuẩn bị sẵn TFN, hộ chiếu và một giấy tờ thuế cũ trước khi gọi.
- Bộ phận hỗ trợ myGov: từ nước ngoài gọi +61 1300 169 468 và chọn số 1. Thứ Hai đến thứ Sáu 7 giờ sáng đến 10 giờ tối, thứ Bảy và Chủ nhật 10 giờ sáng đến 5 giờ chiều, theo giờ Úc. Không đăng nhập được thì hỏi myGov; liên kết và xác minh danh tính thì hỏi ATO.

## Không liên kết được thì có khai thuế hay rút super được không?

Được. ATO cho biết chỉ khi tự khai trực tuyến bằng myTax bạn mới cần tài khoản myGov đã liên kết với ATO. Khi ở ngoài nước Úc, bạn có thể khai thuế qua đại lý thuế đã đăng ký hoặc nộp hồ sơ giấy.

Đơn DASP trực tuyến để rút super hỏi thông tin cá nhân, email, thông tin hộ chiếu và thông tin quỹ; TFN không bắt buộc, và danh sách đó không có bước đăng nhập myGov. Về tiền hoàn thuế, hãy nhớ: ATO chỉ trả vào tài khoản ngân hàng ở Úc.

## Bạn không cần myGov để chúng tôi giúp

Bạn không cần myGov, cũng không cần liên kết ATO trước, để khai thuế với Student Visa Tax. Chúng tôi làm việc trực tiếp với ATO, và hồ sơ được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO. Chúng tôi không bao giờ hỏi mật khẩu myGov của bạn. Hãy nhắn cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'Năm đầu tiên tôi chưa có thông báo tính thuế, liên kết thế nào?', a: 'Người khai thuế lần đầu chưa có thông báo tính thuế là bình thường. Hãy thử số biên nhận đơn TFN, hộ chiếu đã dùng khi xin TFN, phiếu lương gần nhất hoặc tài khoản super. Nếu vẫn không được, hãy liên hệ ATO, hoặc khai thuế mà không cần myGov.' },
      { q: 'Có được bỏ qua câu hỏi xác minh không?', a: 'Có thể bỏ qua câu không chắc, nhưng bỏ qua tất cả bị tính là một lần thất bại. Thử quá nhiều lần sẽ gặp lỗi bắt đầu bằng LCK, và bạn phải chờ đến thời điểm hệ thống cho biết.' },
      { q: 'Tôi chỉ dùng câu hỏi bí mật, có liên kết ATO được không?', a: 'Không. ATO không chấp nhận đăng nhập bằng câu hỏi bí mật. Hãy thêm passkey, ứng dụng xác thực hoặc myID trong cài đặt đăng nhập của myGov, rồi mới liên kết ATO.' },
    ],
  },

  'claim-super-without-mygov-international-students': {
    title: 'Rút super sau khi học xong mà không cần myGov',
    description: 'Về nước, không vào được myGov, có rút super được không? Đơn DASP trực tuyến cần gì, khi nào nộp được, visa hiện sai thì làm gì, và tiền được trả ra sao.',
    answer: 'Được. Đơn DASP trực tuyến của ATO là một hệ thống riêng và miễn phí, hỏi thông tin cá nhân, email, thông tin hộ chiếu và thông tin quỹ super; TFN không bắt buộc, và danh sách đó không có bước đăng nhập myGov. Bạn nộp được khi đã rời Úc và visa đã hết hiệu lực.',
    body: `Bạn đã về nước, muốn rút tiền super ở Úc, nhưng không vào được myGov. Chuyện này rất hay gặp, và không làm bạn mất quyền rút super. Dưới đây là cách đơn DASP trực tuyến hoạt động, theo hướng dẫn của ATO.

## Đơn DASP trực tuyến hỏi những gì?

ATO liệt kê các thông tin sau:

- thông tin cá nhân như họ tên và ngày sinh, nhập đúng y như trên hộ chiếu;
- địa chỉ email;
- nước cấp và số hộ chiếu;
- thông tin quỹ super, gồm ABN của quỹ và số thành viên của bạn;
- TFN: không bắt buộc. Nếu bạn nhập, hệ thống sẽ tìm giúp các tài khoản super đứng tên bạn.

Hệ thống cũng hiện thông tin visa mà nó tìm được để bạn xác nhận. ATO cho biết đơn trực tuyến là miễn phí. Nếu số tiền super từ $5,000 trở lên, quỹ có thể yêu cầu bản sao giấy tờ tùy thân có chứng thực; chứng thực khi còn ở Úc thường dễ hơn.

## Khi nào thì nộp được đơn?

Bạn cần đủ cả ba điều: đã rời Úc; visa đã hết hiệu lực (hết hạn hoặc bị hủy); và không còn visa Úc nào khác đang có hiệu lực. Nếu bạn vẫn đang giữ visa tốt nghiệp 485 hay visa bắc cầu, bạn chưa nộp được.

ATO khuyên bắt đầu điền đơn trước khi rời Úc và ghi lại thông tin đã nhập, vì sau khi đi bạn phải dùng đúng thông tin đó để tiếp tục và nộp đơn. Nếu không chắc tình trạng visa, hãy kiểm tra trên VEVO.

## myGov thật ra dùng ở bước nào?

Chỉ ở bước tìm tài khoản super. ATO cho biết nếu không chắc tiền nằm ở quỹ nào, bạn có thể xem trong dịch vụ trực tuyến của ATO, cách này cần tài khoản myGov đã liên kết ATO. Nhưng bạn cũng có thể nhập TFN vào đơn DASP để hệ thống tìm giúp, hoặc gọi ATO từ nước ngoài số +61 2 6216 1111, thứ Hai đến thứ Sáu, 8 giờ sáng đến 5 giờ chiều giờ miền Đông nước Úc.

Vì vậy, không vào được myGov chỉ làm bạn mất một trong các cách tìm super, chứ không chặn việc nộp đơn.

## Thông tin visa hiện sai thì làm gì?

Đừng nộp. ATO cho biết nếu thông tin visa hệ thống hiển thị không đúng, bạn không nên nộp đơn mà hãy gửi email đến DASPmail@ato.gov.au để báo.

Nếu visa vẫn hiện là còn hiệu lực, nghĩa là bạn chưa nộp được. Bạn có thể lưu đơn, rồi quay lại nộp khi visa đã hết hiệu lực và bạn đang ở ngoài nước Úc.

## Tiền super được trả như thế nào?

ATO nêu ba cách nhận tiền:

- chuyển khoản vào tài khoản ngân hàng ở Úc;
- séc bằng đô la Úc;
- chuyển tiền quốc tế: chỉ một số quỹ làm, và có thể mất phí, kể cả phí đổi tiền.

Nếu bạn đã rời Úc đủ 6 tháng và visa đã hết hiệu lực, quỹ sẽ chuyển super chưa rút sang ATO. Tiền không mất, bạn vẫn xin rút từ ATO được; nhưng ATO chỉ trả vào tài khoản ngân hàng ở Úc đứng tên bạn, hoặc bằng séc. ATO cho biết khi đơn đã đầy đủ, tiền thường được trả trong vòng 28 ngày.

## Có nhờ người khác làm đơn được không?

Được. ATO cho biết bạn có thể ủy quyền bằng văn bản cho một đại lý thuế đã đăng ký làm đơn thay bạn. Người được ủy quyền có thể xử lý đơn thay bạn, nên hãy chọn người bạn tin tưởng, và đừng gửi mật khẩu myGov hay ảnh hộ chiếu cho người lạ.

## Bạn không muốn tự làm đơn?

Đơn online của ATO là miễn phí. Nếu bạn muốn có người giúp, chúng tôi cùng bạn kiểm tra các quỹ super, ngày visa và giấy tờ, và xác nhận giá qua WhatsApp trước khi bạn thanh toán. Tất cả đều không cần myGov.`,
    faq: [
      { q: 'Rút super có cần myGov không?', a: 'Danh sách thông tin của đơn DASP trực tuyến không có bước đăng nhập myGov. Đơn hỏi thông tin cá nhân, email, thông tin hộ chiếu và thông tin quỹ; TFN không bắt buộc. myGov chỉ là một trong các cách tìm tài khoản super.' },
      { q: 'Tôi vẫn còn visa 485 hoặc visa bắc cầu, có nộp đơn được không?', a: 'Chưa. Bạn phải rời Úc, visa phải hết hiệu lực, và không còn visa Úc nào khác đang có hiệu lực. Bạn có thể bắt đầu điền và lưu đơn trước.' },
      { q: 'Super có chuyển về tài khoản ở Việt Nam được không?', a: 'Tùy quỹ. Một số quỹ có chuyển tiền quốc tế, nhưng không phải quỹ nào cũng làm, và có thể mất phí, kể cả phí đổi tiền. Super đã chuyển sang ATO chỉ được trả vào tài khoản ngân hàng ở Úc đứng tên bạn, hoặc bằng séc.' },
    ],
  },

  'tax-refund-closed-australian-bank-account-international-students': {
    title: 'Đã đóng tài khoản ngân hàng ở Úc? Tiền hoàn thuế và super',
    description: 'Đóng tài khoản ở Úc trước khi nhận tiền hoàn thuế? ATO chỉ trả vào tài khoản ở Úc. Tiền bị trả lại thì sao, và cách cập nhật thông tin ngân hàng từ nước ngoài.',
    answer: 'ATO chỉ trả tiền hoàn thuế vào tài khoản ngân hàng ở Úc. Nếu tiền được chuyển vào tài khoản bạn đã đóng, Ngân hàng Dự trữ Úc sẽ trả lại cho ATO, và ATO chuyển lại khi bạn cập nhật thông tin ngân hàng; nếu không có thông tin mới, ATO trả bằng séc. Tiền không mất, chỉ phải chờ bạn bổ sung thông tin.',
    body: `Nhiều du học sinh đóng tài khoản ngân hàng vào tuần cuối cùng ở Úc. Nhưng hồ sơ thuế chỉ nộp được sau ngày 30 tháng 6, và super chỉ rút được khi visa đã hết, nên tiền có thể về khi tài khoản đã không còn. Bài này giải thích tiền đi đâu, và bạn còn làm được gì.

## ATO có trả tiền hoàn thuế vào tài khoản ở Việt Nam không?

Không. ATO cho biết họ chỉ trả tiền hoàn thuế vào tài khoản ngân hàng ở Úc. Nếu bạn chưa đóng tài khoản, hãy giữ nó cho đến khi tiền hoàn thuế về.

## Tiền hoàn thuế vào tài khoản đã đóng thì sao?

ATO cho biết tiền hoàn thuế chuyển vào tài khoản đã đóng sẽ được Ngân hàng Dự trữ Úc (Reserve Bank of Australia) trả lại cho ATO, việc này có thể mất đến 10 ngày.

- Nếu bạn đã cung cấp tài khoản ở Úc mới, ATO sẽ chuyển lại tiền vào tài khoản đó.
- Nếu không có thông tin tài khoản mới, ATO sẽ trả lại bằng séc.
- Từ tháng 1 năm 2025, ATO giữ một số khoản hoàn thuế bằng séc đến 90 ngày trong lúc hỏi bạn thông tin ngân hàng.

Vì vậy, tiền hoàn thuế tưởng như biến mất thường là đã được trả, bị trả lại, và đang chờ ở ATO.

## Ở nước ngoài, cập nhật thông tin ngân hàng với ATO thế nào?

ATO cho biết bạn có thể cập nhật trong dịch vụ trực tuyến của ATO qua myGov hoặc ứng dụng ATO, hoặc gọi điện; bạn hoặc người đại diện được chỉ định sẽ trả lời vài câu để xác minh danh tính. Tài khoản phải đứng tên bạn (riêng hoặc chung), số BSB có 6 chữ số và số tài khoản tối đa 9 chữ số.

Chuẩn bị sẵn TFN trước khi gọi. Từ nước ngoài gọi +61 2 6216 1111, thứ Hai đến thứ Sáu, 8 giờ sáng đến 5 giờ chiều giờ miền Đông nước Úc; ở Úc gọi 13 28 61. Nếu bạn không còn vào được myGov, bài của chúng tôi về mã myGov khi ở nước ngoài có các cách xử lý.

## Còn tiền super thì sao?

Super đi theo đường khác: DASP do quỹ super của bạn trả. ATO nêu các cách nhận tiền: chuyển khoản vào tài khoản ở Úc, séc bằng đô la Úc, hoặc chuyển tiền quốc tế; chuyển tiền quốc tế chỉ một số quỹ làm, và có thể mất phí, kể cả phí đổi tiền.

Nếu bạn đã rời Úc đủ 6 tháng và visa đã hết hiệu lực, super chưa rút sẽ được chuyển sang ATO. ATO chỉ trả khoản này vào tài khoản ngân hàng ở Úc đứng tên bạn, hoặc bằng séc. Vì vậy, nếu muốn nhận bằng chuyển khoản, giữ lại một tài khoản ở Úc càng đáng.

## Một ví dụ

Minh học xong thạc sĩ và đóng tài khoản ngân hàng một tuần trước khi về Hà Nội. Tháng 7, Minh nộp hồ sơ thuế cuối cùng từ Hà Nội nhưng vẫn ghi số tài khoản cũ. Vài tuần sau, tiền hoàn thuế vẫn chưa thấy.

Lý do là ATO đã trả tiền, nhưng tài khoản đã đóng nên Ngân hàng Dự trữ Úc trả tiền lại cho ATO. Minh gọi ATO, xác minh danh tính, rồi đưa thông tin một tài khoản ở Úc vẫn còn dùng, và ATO chuyển lại tiền vào đó. Nếu Minh không có tài khoản nào ở Úc, ATO sẽ gửi séc, và séc có thể bị giữ trong lúc ATO hỏi thông tin ngân hàng.

## Trước khi đóng tài khoản: danh sách cần kiểm tra

- Chỉ đóng tài khoản ở Úc sau khi đã nhận cả tiền hoàn thuế lẫn tiền super.
- Ghi lại số BSB và số tài khoản ở nơi an toàn.
- Trước khi nộp hồ sơ, kiểm tra ATO đang lưu tài khoản nào của bạn.
- Nếu muốn quỹ trả super bằng chuyển tiền quốc tế, hỏi quỹ trước xem có làm không và phí bao nhiêu.
- Ghi lại TFN, tên quỹ super và số thành viên.

## Làm hồ sơ thuế đúng từ nước ngoài

Nếu tài khoản đã đóng hoặc sắp đóng, hãy báo cho chúng tôi trước khi làm hồ sơ. Bạn không cần myGov để khai thuế với Student Visa Tax. Chúng tôi làm việc trực tiếp với ATO, và hồ sơ được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO. Hãy nhắn cho Student Visa Tax qua WhatsApp.`,
    faq: [
      { q: 'ATO có chuyển tiền hoàn thuế về ngân hàng ở Việt Nam không?', a: 'Không. ATO chỉ trả tiền hoàn thuế vào tài khoản ngân hàng ở Úc. Tiền bị trả lại sẽ được chuyển vào tài khoản ở Úc mới mà bạn cung cấp; nếu không có, ATO trả bằng séc.' },
      { q: 'Tài khoản đã đóng thì tiền hoàn thuế có mất không?', a: 'Không. ATO cho biết Ngân hàng Dự trữ Úc trả tiền lại cho ATO, có thể mất đến 10 ngày. Khi bạn cập nhật thông tin ngân hàng, ATO chuyển lại; từ tháng 1 năm 2025, một số khoản hoàn thuế bằng séc bị giữ đến 90 ngày.' },
      { q: 'Super có chuyển về tài khoản ở nước ngoài được không?', a: 'Tùy quỹ. Một số quỹ có chuyển tiền quốc tế và có thể mất phí, kể cả phí đổi tiền. Super đã chuyển sang ATO chỉ được trả vào tài khoản ngân hàng ở Úc đứng tên bạn, hoặc bằng séc.' },
    ],
  },
  'dasp-online-application-problems-international-students': {
    title: 'Đơn DASP online bị lỗi? Cách xử lý cho du học sinh',
    description: 'Không thấy đơn đã lưu, không tìm thấy quỹ super, quên câu trả lời bí mật hay thông tin visa hiện sai? Cách xử lý từng lỗi theo hướng dẫn của ATO.',
    answer: 'Phần lớn lỗi trên hệ thống DASP online đều có cách xử lý trong hướng dẫn của ATO: nhập đúng y như lần đầu để xem đơn đã lưu, dùng Add application với ABN của quỹ nếu hệ thống không tìm thấy quỹ, gọi ATO nếu quên câu trả lời bí mật, và gửi email đến DASPmail@ato.gov.au nếu thông tin visa hiện sai.',
    body: `Khi về nước và muốn rút tiền super ở Úc, nhiều du học sinh bị kẹt ngay trên hệ thống DASP online của ATO. Tin tốt là các lỗi hay gặp chỉ có vài loại, và trang hướng dẫn của ATO có cách xử lý cho từng loại. Đơn online này miễn phí, mất khoảng 30 phút để điền, và bạn có thể bắt đầu từ trước khi rời Úc. Dưới đây là các lỗi theo thứ tự bạn thường gặp.

## Cần chuẩn bị gì trước khi bắt đầu?

Theo ATO, hệ thống sẽ hỏi:

- họ tên, ngày sinh và các thông tin cá nhân khác, cùng địa chỉ email
- nước cấp hộ chiếu và số hộ chiếu
- thông tin tài khoản quỹ super, gồm cả ABN của quỹ
- TFN của bạn, không bắt buộc: nếu nhập, hệ thống sẽ tự tìm các tài khoản super; nếu không, bạn tự nhập thông tin tài khoản

Bước đầu tiên là kiểm tra điều kiện, mất khoảng 45 giây. ATO dặn nhập thông tin đúng y như trên hộ chiếu. Chỉ cần làm đúng điều này, bạn tránh được lỗi hay gặp nhất về sau.

## Vì sao tôi không nộp được đơn?

Bạn có thể bắt đầu và lưu đơn khi còn ở Úc hoặc khi visa còn hiệu lực, nhưng chỉ nộp được khi đã đủ điều kiện, tức là visa đã hết hiệu lực và bạn đã rời Úc. ATO cho biết kể cả khi bạn đã rời Úc, nếu visa tạm trú vẫn còn hiệu lực thì vẫn chưa nộp được. Visa tốt nghiệp 485 hay visa bắc cầu (bridging visa) đều tính là visa còn hiệu lực.

Hãy kiểm tra tình trạng visa trên VEVO, công cụ tra cứu visa trực tuyến của Bộ Nội vụ Úc. Nếu VEVO vẫn báo visa còn hiệu lực, hãy chờ visa hết hạn rồi quay lại nộp đơn đã lưu.

## Đơn đã lưu biến đâu mất?

ATO cho biết muốn xem đơn đã lưu, bạn phải nhập lại đúng y những thông tin đã dùng lần đầu: TFN, họ tên, thông tin hộ chiếu và ngày sinh.

- Nếu lần đầu có nhập TFN, lần này cũng phải nhập. Nếu lần đầu không nhập, lần này cũng bỏ trống.
- Giữ thông tin hộ chiếu đúng như lần đầu, kể cả khi hộ chiếu đó đã hết hạn.

Chỉ cần một thông tin khác đi, hệ thống vẫn cho bạn tạo đơn mới, nhưng bạn sẽ không thấy đơn đã lưu. Trước khi làm lại từ đầu, hãy thử thêm một lần với thông tin đúng như lần đầu bạn gõ.

## Quên câu trả lời bí mật thì sao?

Khi bắt đầu, bạn tự đặt một câu hỏi mà chỉ bạn biết câu trả lời. ATO cho biết câu trả lời dài từ 1 đến 20 ký tự, có thể là một hoặc nhiều từ và có số; khoảng trắng thừa sẽ được bỏ qua. Khi quay lại hệ thống, bạn có ba lần nhập. Nếu đã quên câu trả lời, ATO hướng dẫn gọi điện cho ATO.

## Hệ thống không tìm thấy quỹ super của tôi

Nếu bạn biết mình có super mà hệ thống không tìm thấy, ATO hướng dẫn chọn Add application ở trang Add an application, rồi bắt đầu đơn bằng ABN của quỹ đang giữ super của bạn. Bạn có thể tra ABN của quỹ trên trang Super Fund Lookup hoặc hỏi thẳng quỹ.

Nếu không tìm được TFN, ATO gợi ý xem thông báo tính thuế (notice of assessment), thư từ ATO hoặc bảng tóm tắt thu nhập (payment summary) của chủ lao động. Vẫn không thấy thì gọi ATO; bạn sẽ được hỏi vài câu để xác minh danh tính.

Nếu super của bạn đã được chuyển cho ATO, đơn sẽ hiện một mục như "Payment of unclaimed superannuation money" thay cho tên quỹ. Điều này xảy ra khi bạn đã rời Úc từ 6 tháng trở lên và visa đã hết hiệu lực. Tiền không mất, và bạn vẫn rút được.

## Thông tin visa hiện sai

Màn hình thông tin visa cho biết bạn đã từng có visa working holiday (subclass 417 hoặc 462) hay chưa. Nếu thông tin này sai, ATO dặn đừng nộp đơn, mà hãy gửi email đến DASPmail@ato.gov.au. Các visa khác có quyền đi làm không cần ghi loại và ngày trên màn hình này, nhưng ATO cho biết quỹ của bạn cần biết bạn từng có các visa đó.

## Đã nộp mà phát hiện sai, sửa được không?

Không. ATO cho biết đơn đã nộp chỉ xem được, không sửa được. Hãy liên hệ thẳng với quỹ; thông tin liên hệ có ở trang Submitted applications. Đơn đã lưu mà chưa nộp thì vẫn sửa được, bằng câu trả lời bí mật của bạn.

## Làm sao biết đơn đang ở bước nào?

Hệ thống hiện trạng thái cho từng đơn: submitted, rejected, new application, not to be forwarded hoặc transferred. Hệ thống không cho biết quỹ đã xử lý xong chưa. Tiêu chuẩn phục vụ của ATO là 28 ngày kể từ khi nhận đơn đầy đủ, trừ khi quỹ cần bạn bổ sung thông tin. Hãy hỏi quỹ về tiến độ, hoặc hỏi ATO nếu super đang do ATO giữ.

## Ở nước ngoài thì gọi số nào?

Số của ATO từ nước ngoài là +61 2 6216 1111, thứ Hai đến thứ Sáu, 8 giờ sáng đến 5 giờ chiều theo giờ miền Đông nước Úc; hãy xin chuyển máy đến 13 10 20. Ở Úc, gọi thẳng 13 10 20. Nếu cần phiên dịch, dịch vụ TIS có số +61 3 9268 8332.

## Bạn muốn có người giúp rút super?

Đơn online của ATO là miễn phí, và bạn không bao giờ phải trả tiền để rút tiền super của chính mình. Nếu bạn muốn có người giúp, chúng tôi cùng bạn kiểm tra các quỹ super, ngày visa và giấy tờ, và xác nhận giá qua WhatsApp trước khi bạn thanh toán. Student Visa Tax hoạt động dưới sự giám sát của một đại lý thuế đã đăng ký.

Hồ sơ thuế cuối cùng là chuyện riêng, không liên quan đến tiền super. Hồ sơ này tính thu nhập đến ngày bạn rời Úc và được nộp sau ngày 30 tháng 6, dù lúc đó bạn đang ở đâu.`,
    faq: [
      { q: 'Vì sao tôi không thấy đơn DASP đã lưu?', a: 'ATO cho biết bạn phải nhập lại đúng TFN, họ tên, thông tin hộ chiếu và ngày sinh như lần đầu. Nếu lần đầu không nhập TFN thì lần này cũng bỏ trống, và giữ thông tin hộ chiếu như lần đầu, kể cả khi hộ chiếu đã hết hạn.' },
      { q: 'Đơn DASP đã nộp rồi có sửa được không?', a: 'Không. ATO cho biết đơn đã nộp chỉ xem được, không sửa được. Hãy liên hệ quỹ của bạn; thông tin liên hệ có ở trang Submitted applications.' },
      { q: 'Tôi đã rời Úc, sao vẫn chưa nộp được đơn?', a: 'Nhiều khả năng visa của bạn vẫn còn hiệu lực. ATO cho biết khi visa tạm trú còn hiệu lực thì không nộp được, kể cả khi bạn đã rời Úc. Hãy kiểm tra tình trạng visa trên VEVO.' },
    ],
  },
}
