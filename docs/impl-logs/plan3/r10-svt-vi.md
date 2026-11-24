# r10 svt-vi: Student Visa Tax, Vietnamese (/vi), tax return and super, myGov problems

Research only, repository untouched. Code: /home/claude/v68/base20 (v69 = v68 base20 + Phase 1). Data: S/gsc24/svt (3 months to 21 Nov).
Web search budget ran out after 7 Vietnamese SERP checks; two planned checks ("khai thuế Úc khi đã về Việt Nam...",
"myGov bị khóa") were not run. All official facts below were fetched on 24 Nov 2026.

## 1. Findings

F1 (fact, Queries.csv). The vi refund cluster is the biggest non-English demand on SVT and sits on page 3 to 4:
"hoàn thuế ở úc" 24 impr @34.4, "hoàn thuế úc" 21 @34.8, "hướng dẫn hoàn thuế xuất cảnh úc" 17 @38.7,
"hoàn thuế ở úc được bao nhiêu" 13 @29.4, "cách thức để được hoàn thuế tại sân bay úc" 8 @22.9. 0 clicks on all.
No vi query about super, DASP or myGov appears yet (16 vi queries in total, the rest are "là gì" questions:
"white card là gì" 7 @7, "abn là gì" 2 @10, "payg là gì" 1 @9).

F2 (fact, Pages.csv). 110 vi URLs have impressions. Money-relevant vi pages: TRS article 115 @21.0 (2 clicks),
how-long-does-a-tax-refund-take 55 @15.5, tax-return-deadline-31-october 12 @5.7 (1 click), /vi/superannuation 8 @8.5
(1 click), dasp-documents-checklist 6 @5.5 (2 clicks), find-and-check-your-super 8 @5.3 (1 click),
tax-on-super-withdrawal 3 @42.7, what-is-a-tax-refund 4 @25.5, tax-back-australia 3 @5.7, /vi home 1 @9.
Countries.csv: Vietnam 370 impr / 6 clicks (2nd market after Australia 2,921).

F3 (fact, docs/SEO_AI_PHASE1_V68_2026-11-24.md and docs/impl-logs/impl-svt.md). Already done, do not re-propose:
TRS routing box ("Bạn tìm hoàn thuế thu nhập ... hay rút super?"), /vi home answer block + 3 FAQs (incl. "Hoàn thuế ở Úc
được bao nhiêu?"), /vi/superannuation 3 new FAQs (11 total), "Cách nhận tiền hoàn thuế: 5 bước" in vi tax-back,
moneyLinks() related lists, HOME_LINKS vi anchors. The /vi/superannuation lead already explains "hoàn thuế xuất cảnh".

F4 (fact, code grep). No SVT page in any language is about myGov problems. vi mentions myGov in about 40 sentences but
only one short section handles access: long/vi/batch-01.ts, lodging-tax-return-after-going-home-students,
"## Nếu bạn không vào được tài khoản ATO từ nước ngoài" (3 sentences: old Australian number stops working, a registered
tax agent can still see income statements and lodge). Nowhere does SVT say "you don't need myGov to use us".
Slugs `mygov-*`, `link-ato-to-mygov-*`, `dasp-online-application-*` are free across the site (grep src/).

F5 (fact, SERPs 24 Nov). Vietnamese SERPs are weak and mostly official PDFs or unrelated:
- "hoàn thuế Úc du học sinh khai thuế": ato.gov.au Vietnamese fact sheets, accgroup.vn (2021 article), ozlinks.au.
- "hoàn thuế ở úc được bao nhiêu": ATO Vietnamese pages, accgroup.vn, vemvisa.com, miniwebtool calculator.
- "hướng dẫn hoàn thuế xuất cảnh úc": ABF duty-free PDF, infrastructure.gov.au passenger guides, vietjetair. No page
  answers the TRS how-to in Vietnamese in a web page form.
- "rút super khi về Việt Nam DASP hướng dẫn": palmscheme.gov.au Vietnamese PDFs (worker guide, DASP online factsheet),
  community.ato.gov.au threads, ATO "Hưu bổng là gì?".
- "không đăng nhập được myGov mã xác nhận số điện thoại Úc ở Việt Nam": my.gov.au Vietnamese PDFs, then unrelated
  (GoDaddy, Cathay, Google help). "liên kết ATO với myGov không được du học sinh": only English ATO pages and about 12
  community.ato.gov.au threads.
Inference: a native vi page on any myGov or DASP-system problem has no Vietnamese competitor; SVT vi pages already
reach positions 4 to 7 within weeks on uncontested long-tail topics (F2), so these are the most winnable vi pages.

F6 (fact, official facts for the new text; URL per fact)
- SMS codes: overseas you must use the same Australian number with international roaming on. If you can't sign in with
  your old number, use Digital ID or create a new myGov account; the helpdesk can release your email.
  https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms
- Didn't get SMS code: check reception etc., or sign in with Digital ID, a passkey or the myGov app. Forgot username:
  2 letters + 6 numbers, sent by email. Locked: "Unlock your account now" with security code and secret question; if
  still locked, create a new account and relink services.
  https://my.gov.au/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
- New myGov account: needs a personal email (or Digital ID); a mobile number is not required; MFA options include SMS,
  passkey, authenticator. https://my.gov.au/en/about/help/mygov-website/create-mygov-account
- myGov helpdesk: in Australia 132 307 option 1; from overseas +61 1300 169 468 option 1; Mon to Fri 7 am to 10 pm,
  Sat and Sun 10 am to 5 pm, Australian time. https://my.gov.au/en/about/help/contact
- ATO when you can't sign in: recover with a Strong myID (name, date of birth, email must match), else new myGov account
  and relink; "Where you're unable to set up a Strong myID, we recommend using a Standard myID".
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/when-you-can-t-sign-in-to-your-mygov-account
- Linking ATO: View and link services, Link, enter details, answer 2 questions about your tax record; the ATO does not
  support the Secret Questions and Answers sign-in.
  https://my.gov.au/en/about/help/mygov-account/link-services-to-your-account/link-the-australian-taxation-office
- Linking errors: TFN 9 digits no spaces; names first 40 characters; one name goes in Family name; skipping all
  questions counts as a failed attempt; LCK lockout: wait; IDD.003, ICI.001, OVK.002: contact the ATO.
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/help-and-support-for-online-services-individuals
- ATO phones: from overseas +61 2 6216 1111 (8 am to 5 pm AEDT, Mon to Fri); linking the ATO to myGov from overseas
  +61 2 6216 3444 (8 am to 6 pm, Mon to Fri); in Australia 13 28 61. https://www.ato.gov.au/about-ato/contact-us/
- myID: Standard = verify 2 documents; the list includes "visa (using your foreign passport)"; Strong needs Australian
  identity documents and a photo; needs a personal email, a smart device, age 15+. https://www.myid.gov.au/set-up
  Inference (do not state as fact): with only a Vietnamese passport a student usually verifies one document (visa) and
  needs a second Australian one (for example a driver licence) for Standard; Strong is usually out of reach.
- Lodging from overseas: myTax online, a registered tax agent, or paper; update myGov sign-in settings before leaving;
  keep an Australian bank account for the refund.
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-your-tax-return-from-outside-australia
- DASP online system: own login with name, date of birth, email, passport country and number, optional TFN; shared
  secret answer 1 to 20 characters, 3 attempts, forgotten secret means phoning the ATO; details must match the passport
  exactly; can start and save in Australia, submit only after leaving with no active visa (check VEVO); wrong visa
  information: do not submit, email DASPmail@ato.gov.au; fund not found: "Add application" with the fund's ABN;
  submitted application cannot be edited, contact the fund; funds generally process within 28 days.
  https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
  Note: that page never mentions myGov. "DASP does not use myGov" is an inference from it; keep the wording to what the
  page says (passport details and a secret answer you set).

## 2. Proposals

### P1-A. New guide: myGov sign-in problems (vi, with an EN master entry)
Why: Jo's main idea; no vi competitor (F5); blocks both the refund and the DASP check.
Files: LongArticle entry in a new long/en/batch-13-mygov.ts (EN master required: types.ts says translations exist only
for English articles; long-articles test checks this), vi text in new long/vi/batch-13-mygov.ts, regenerate both
index.ts files (header says "Generated by scripts/svt-long-index.mjs"; the script is NOT in this zip, so add the import
by hand and note it). Category 'Tax return'. If the SVT-en agent proposes the same topic, use ONE slug for both.
Test limits: body >= 600 whitespace words, >= 4 H2 sections, >= 2 FAQ, sources official, no links in body.
- slug: mygov-sign-in-problems-international-students
- title (54): Không đăng nhập được myGov? Cách xử lý cho du học sinh
- description (149): Không nhận được mã SMS vì số Úc đã hủy, quên mật khẩu hay bị khóa myGov? Cách vào lại theo hướng dẫn chính thức, và cách khai thuế khi chưa vào được.
- answer: Nếu không nhận được mã SMS vì số điện thoại Úc đã hủy, myGov cho phép bạn đăng nhập bằng Digital ID (như myID), passkey hoặc ứng dụng myGov, hoặc tạo tài khoản myGov mới rồi liên kết lại với ATO. Trong lúc chưa vào được, bạn vẫn khai thuế được qua một đại lý thuế đã đăng ký.
- body (ready text; implementer may add one worked example to pass 600 words):

Nhiều du học sinh đăng ký myGov bằng số điện thoại Úc. Sau khi học xong và về Việt Nam, số đó bị hủy, và myGov vẫn gửi mã đăng nhập về số cũ. Đây là lý do hay gặp nhất khiến bạn không xem được bảng kê thu nhập, không kiểm tra được super và nghĩ rằng mình không khai thuế được nữa. Thật ra bạn còn nhiều cách.

## Vì sao tôi không nhận được mã SMS của myGov?
Mã SMS luôn được gửi về số điện thoại đã đăng ký trong tài khoản. Theo myGov, khi ở nước ngoài bạn phải dùng đúng số Úc đó và bật chuyển vùng quốc tế. Nếu số đã bị nhà mạng thu hồi, bạn sẽ không nhận được mã nữa, và bạn chỉ đổi được số điện thoại khi đã đăng nhập.
Trước khi kết luận số đã mất, myGov khuyên kiểm tra sóng, chế độ máy bay, các mục tin nhắn bị chặn hoặc rác, bộ nhớ máy, cập nhật phần mềm, rồi khởi động lại điện thoại.

## Đăng nhập bằng cách khác: Digital ID, passkey, ứng dụng myGov
Nếu vẫn không nhận được mã, myGov cho phép đăng nhập bằng Digital ID, passkey hoặc ứng dụng myGov, nếu trước đó bạn đã bật các cách này. Mất điện thoại thì bạn vẫn có thể dùng passkey đã đồng bộ trên thiết bị khác, passkey dự phòng, hoặc Digital ID nếu đã kết nối. Sau khi vào được, hãy xóa passkey của máy đã mất.
ATO còn cho một cách khôi phục: nếu bạn có myID ở mức Strong, với tên, ngày sinh và email trùng với myGov, hãy nhập tên đăng nhập và mật khẩu, chọn “I didn't get my code”, rồi chọn “Continue with Digital ID”. Mức Strong cần giấy tờ tùy thân của Úc, nên nhiều du học sinh không làm được bước này.

## Quên tên đăng nhập, quên mật khẩu, hoặc bị khóa tài khoản
- Quên tên đăng nhập: chọn Forgot username và nhập email đã đăng ký. myGov gửi tên đăng nhập riêng gồm 2 chữ cái và 6 chữ số.
- Quên mật khẩu: chọn Forgot password và nhận mã. Nếu myGov thấy đăng nhập bất thường, có thể tắt email và số điện thoại làm tên đăng nhập; khi đó bạn cần tên đăng nhập riêng và mật khẩu hiện tại.
- Bị khóa sau nhiều lần nhập sai: chọn Unlock your account now, nhập mã bảo mật, trả lời câu hỏi bí mật và đặt mật khẩu mới. Khi tài khoản còn khóa, bạn không dùng được Digital ID, passkey hay ứng dụng myGov.

## Tạo tài khoản myGov mới khi đã về Việt Nam
Nếu mọi cách trên đều không được, myGov và ATO đều hướng dẫn tạo tài khoản myGov mới rồi liên kết lại các dịch vụ. Tài khoản mới cần một email cá nhân chỉ bạn dùng; số điện thoại không bắt buộc. Bạn có thể chọn passkey hoặc ứng dụng xác thực thay cho mã SMS, nên không cần số Úc. Mỗi email chỉ dùng cho một tài khoản; muốn dùng lại email cũ, hãy gọi bộ phận hỗ trợ myGov để họ giải phóng email đó. ATO khuyên dùng myID mức Standard nếu không làm được mức Strong. Sau đó bạn liên kết ATO bằng cách trả lời 2 câu hỏi về hồ sơ thuế (xem bài về liên kết ATO).

## Gọi hỗ trợ myGov từ nước ngoài
Bộ phận hỗ trợ myGov: từ nước ngoài gọi +61 1300 169 468 và chọn số 1 (ở Úc gọi 132 307, chọn số 1). Giờ làm việc theo giờ Úc: thứ Hai đến thứ Sáu 7 giờ sáng đến 10 giờ tối, thứ Bảy và Chủ nhật 10 giờ sáng đến 5 giờ chiều. Có thể mất phí gọi quốc tế.

## Chưa vào được myGov thì có khai thuế được không?
Được. ATO liệt kê ba cách khai thuế từ ngoài nước Úc: tự khai trực tuyến bằng myTax (cần myGov đã liên kết ATO), khai qua một đại lý thuế đã đăng ký, hoặc khai bằng giấy. Bảng kê thu nhập của bạn do ATO lưu giữ, nên không mất đi khi bạn không vào được myGov. Bạn chỉ cần giữ một tài khoản ngân hàng ở Úc để nhận tiền hoàn thuế, nếu có.

## Để không bị khóa lần sau
Trước khi rời Úc, hãy bật thêm một cách đăng nhập dự phòng (passkey, ứng dụng xác thực hoặc Digital ID) trong My account, Account settings, Sign in settings, và ghi lại tên đăng nhập 2 chữ 6 số.

- FAQ:
  Q: Tôi đã về Việt Nam, số Úc bị hủy, có lấy lại được mã SMS không? A: Không, mã chỉ gửi về số đã đăng ký. Hãy đăng nhập bằng Digital ID, passkey hoặc ứng dụng myGov nếu đã bật, hoặc tạo tài khoản myGov mới bằng email cá nhân.
  Q: Tạo myGov mới có cần số điện thoại Úc không? A: Không. myGov cho biết số điện thoại không bắt buộc; bạn có thể dùng passkey hoặc ứng dụng xác thực.
  Q: Không vào được myGov thì có rút super được không? A: Có. Đơn DASP trực tuyến của ATO dùng thông tin hộ chiếu và một câu trả lời bí mật do bạn tự đặt.
- sources: the 5 my.gov.au/ato.gov.au URLs in F6 (SMS, sign-in help, create account, contact, ATO can't sign in, lodge from outside Australia).
- closing paragraph (last body paragraph, approved wording):
  Bạn không cần myGov để khai thuế với Student Visa Tax. Chúng tôi làm việc trực tiếp với ATO, và hồ sơ được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi nộp cho ATO. Nếu bạn đang kẹt ở myGov, hãy nhắn cho Student Visa Tax qua WhatsApp.
- links (long/en/links.ts LONG_ALSO): 'mygov-sign-in-problems-international-students': ['blog/link-ato-to-mygov-problems-international-students',
  'blog/lodging-tax-return-after-going-home-students', 'superannuation']; moneyLinks() adds the home (refund) link first.
  Also add 'blog/mygov-sign-in-problems-international-students' to LONG_ALSO of lodging-tax-return-after-going-home-students,
  tax-after-leaving-australia-international-students and find-and-check-your-super (vi 8 @5.3), so pages with impressions
  feed it.

### P1-B. New guide: linking the ATO to myGov (vi, EN master)
Why: separate intent from sign-in ("liên kết" vs "đăng nhập"); English SERP for it is only ATO and ~12 community threads,
vi has nothing (F5). Same files and test limits as P1-A, category 'Tax return'.
- slug: link-ato-to-mygov-problems-international-students
- title (53): Không liên kết được ATO với myGov: du học sinh làm gì
- description (153): Lỗi khi liên kết ATO với myGov, câu hỏi xác minh không trả lời được, myID chỉ có hộ chiếu Việt Nam? Các bước xử lý và số điện thoại ATO khi ở nước ngoài.
- answer: Để liên kết ATO, bạn đăng nhập myGov, chọn View and link services, chọn Link cạnh Australian Taxation Office, nhập thông tin rồi trả lời 2 câu hỏi về hồ sơ thuế. Nếu bị báo lỗi hoặc bị khóa, từ nước ngoài bạn có thể gọi đường dây liên kết myGov của ATO số +61 2 6216 3444.
- body:

Có tài khoản myGov chưa đủ: bạn phải liên kết thêm ATO mới xem được bảng kê thu nhập, tiền super và tự khai thuế bằng myTax. Du học sinh hay vướng ở bước này, nhất là khi vừa tạo tài khoản myGov mới sau khi về nước.

## Các bước liên kết ATO với myGov
- Đăng nhập myGov.
- Mở View and link services.
- Chọn Link cạnh Australian Taxation Office.
- Nhập hoặc xác nhận thông tin cá nhân.
- Trả lời 2 câu hỏi để xác minh hồ sơ thuế.
Lưu ý: ATO không chấp nhận cách đăng nhập bằng câu hỏi bí mật (Secret Questions and Answers). Nếu bạn đang dùng cách này, hãy đổi sang cách đăng nhập khác trước khi liên kết.

## Thông tin của tôi “không khớp”: kiểm tra gì?
- TFN: 9 chữ số, viết liền, không có khoảng trắng.
- Họ và tên: chỉ 40 ký tự đầu của mỗi phần. Nếu bạn chỉ có một tên, nhập vào ô Family name.
- So tên, ngày sinh và địa chỉ với hồ sơ ở ATO. Nếu đúng mà vẫn báo lỗi (như IDD.002, IDD.004, IDD.006), hãy liên hệ ATO.
- Với các câu hỏi về hồ sơ thuế, hãy đọc kỹ và mở giấy tờ ra đối chiếu. Bỏ qua tất cả câu hỏi bị tính là một lần thất bại.

## Bị khóa sau nhiều lần thử (LCK)
Lỗi LCK.001 đến LCK.005 nghĩa là bạn đã thử quá nhiều lần. Hãy chờ hết thời gian khóa; hệ thống cho biết khi nào bạn thử lại được. Với lỗi IDD.003, ICI.001 hoặc OVK.002, bạn không thể hoàn tất trực tuyến và phải liên hệ ATO.

## myID khi chỉ có hộ chiếu Việt Nam
myID có mức Basic, Standard và Strong. Mức Standard cần xác minh 2 giấy tờ, và danh sách có mục visa (dùng hộ chiếu nước ngoài của bạn). Mức Strong cần giấy tờ tùy thân của Úc và ảnh. Nếu myGov báo OVK.001 (cách đăng nhập không được hỗ trợ), ATO hướng dẫn đăng xuất, đăng nhập bằng myID mức Strong hoặc Standard rồi thử lại; nếu bạn không dùng được myID, hãy liên hệ ATO. Nếu trước đây bạn đăng nhập bằng myID, lần sau phải dùng myID cùng mức trở lên (lỗi OAS.001, OAS.002).

## Gọi ATO từ nước ngoài
- Đường dây hỗ trợ liên kết ATO với myGov: +61 2 6216 3444, thứ Hai đến thứ Sáu, 8 giờ sáng đến 6 giờ chiều.
- Đường dây chung của ATO từ nước ngoài: +61 2 6216 1111, thứ Hai đến thứ Sáu, 8 giờ sáng đến 5 giờ chiều (giờ AEDT).
- Cần phiên dịch: dịch vụ TIS +61 3 9268 8332.
Chuẩn bị sẵn TFN, hộ chiếu và một giấy tờ thuế cũ, như notice of assessment, trước khi gọi.

## Không liên kết được thì có khai thuế được không?
Được. Liên kết ATO chỉ cần nếu bạn muốn tự khai bằng myTax. ATO cũng cho khai qua một đại lý thuế đã đăng ký hoặc khai bằng giấy.

- FAQ:
  Q: Vì sao ATO không có trong danh sách dịch vụ của tôi? A: Bạn cần liên kết trước: trên trang chủ myGov chọn View and link services. Nếu ATO đã hiện là đã liên kết mà không vào được, chọn Unlink, chờ xác nhận, rồi Link lại.
  Q: Tôi có cần myID để liên kết ATO không? A: Không phải lúc nào cũng cần; cách thường dùng là trả lời 2 câu hỏi về hồ sơ thuế. Bạn cần myID nếu trước đây đã dùng myID với ATO, hoặc khi myGov báo cách đăng nhập không được hỗ trợ.
- sources: my.gov.au link-the-ATO page; ATO help-and-support-for-online-services-individuals; ATO contact-us; myid.gov.au/set-up.
- closing paragraph: same approved paragraph as P1-A (ending with WhatsApp).
- links: LONG_ALSO 'link-ato-to-mygov-problems-international-students': ['blog/mygov-sign-in-problems-international-students',
  'blog/find-and-check-your-super', 'blog/lodging-tax-return-after-going-home-students'].

### P1-C. "No myGov needed" FAQ on the two vi money pages (no new page, high leverage)
Files: src/lib/svt/content/home-vi.ts (faq.items, append; FAQPage schema reads this list) and services-vi.ts
(superannuation faq, append). Same question in home-en/home-zh and services-en/zh to keep shapes aligned (check the
SVT tests for equal FAQ counts before adding to one language only). Titles, H1, leads untouched.
- home-vi FAQ: { q: 'Tôi không vào được myGov, có khai thuế được không?', a: 'Được. Bạn không cần myGov để khai thuế với
  chúng tôi. Chúng tôi làm việc trực tiếp với ATO, và hồ sơ được một đại lý thuế đã đăng ký xem xét và ký duyệt trước khi
  nộp cho ATO. Bảng kê thu nhập của bạn vẫn nằm ở ATO, kể cả khi số điện thoại Úc của bạn đã bị hủy.' }
  (The "đại lý thuế" sentence matches the approved regex in i18n-rules-26oct.test.ts line 49.)
- services-vi superannuation FAQ: { q: 'Rút super có cần myGov không?', a: 'Đơn DASP trực tuyến của ATO dùng thông tin
  hộ chiếu của bạn và một câu trả lời bí mật do bạn tự đặt khi bắt đầu đơn. myGov chỉ giúp bạn xem các quỹ super; nếu
  không vào được, bạn có thể hỏi trực tiếp các quỹ hoặc nhắn cho chúng tôi qua WhatsApp để cùng kiểm tra.' }
  Source: ATO DASP online help (F6). Jo to confirm the second sentence matches the DASP service.
- Also extend the 3 sentences in lodging-tax-return-after-going-home-students "## Nếu bạn không vào được tài khoản ATO
  từ nước ngoài" with one sentence (not a rewrite): "Bạn cũng có thể tạo tài khoản myGov mới bằng email cá nhân và
  passkey, không cần số điện thoại Úc." Source: my.gov.au create-mygov-account.

### P2-A. New guide: DASP online application errors (vi, EN master), category 'Super'
Why: palmscheme PDFs and community threads are all the SERP has (F5); this is a "problem blocking the super withdrawal"
page, distinct from dasp-rejected (fund rejects a submitted claim) and dasp-documents-checklist (certified copies).
- slug: dasp-online-application-problems-international-students
- title (48): Đơn DASP online bị lỗi? Cách xử lý khi rút super
- description (143): Không thấy quỹ super, thông tin visa sai, quên câu trả lời bí mật hay đơn không hiện ra? Cách xử lý từng lỗi trên hệ thống DASP online của ATO.
- answer: Hệ thống DASP online của ATO không đăng nhập bằng myGov mà dùng tên, ngày sinh, hộ chiếu và một câu trả lời bí mật do bạn đặt. Phần lớn lỗi đến từ thông tin nhập khác với lần đầu, visa còn hiệu lực, hoặc quỹ chưa được tìm thấy theo TFN.
- H2s with answers (all from the ATO DASP help URL in F6):
  ## Tôi cần những thông tin gì để bắt đầu đơn? Tên, ngày sinh, email, nước cấp và số hộ chiếu, thông tin quỹ (có ABN
  của quỹ); TFN không bắt buộc nhưng giúp hệ thống tìm các tài khoản super. Nhập đúng như trên hộ chiếu.
  ## Vì sao tôi chưa nộp được đơn? Bạn có thể bắt đầu và lưu đơn khi còn ở Úc, nhưng chỉ nộp được khi đã rời Úc và
  không còn visa nào có hiệu lực, kể cả visa 485. Kiểm tra trên VEVO.
  ## Quên câu trả lời bí mật: Câu trả lời dài 1 đến 20 ký tự, bạn có 3 lần nhập. Quên thì phải gọi ATO (+61 2 6216 1111).
  ## Đơn đã lưu không hiện ra: thường do thông tin cá nhân nhập khác lần đầu (TFN nếu đã nhập, tên, hộ chiếu, ngày sinh).
  ## Không tìm thấy quỹ super: dùng Add application và nhập ABN của quỹ. Không tìm thấy TFN: gọi ATO.
  ## Thông tin visa hiện sai: đừng nộp, hãy email DASPmail@ato.gov.au.
  ## Đã nộp rồi mới thấy sai: đơn đã nộp không sửa được; liên hệ quỹ theo thông tin ở trang Submitted applications.
  Hệ thống không hiện tiến độ; quỹ thường xử lý trong 28 ngày, hãy hỏi quỹ.
- FAQ: "Rút super có cần myGov không?" (same answer as P1-C); "Visa 485 còn hạn có rút super được không?" (Không, phải
  chờ visa hết hiệu lực và đã rời Úc.)
- closing paragraph: "Nếu bạn muốn có người cùng kiểm tra quỹ, ngày visa và đơn DASP, hãy nhắn cho Student Visa Tax qua
  WhatsApp." (No agent sentence needed; no fee mention.)
- links: LONG_ALSO ['superannuation', 'blog/dasp-rejected-international-students', 'blog/dasp-documents-checklist-international-students'];
  add this slug to LONG_ALSO of dasp-documents-checklist (vi 6 @5.5, 2 clicks) and how-long-does-dasp-take.

### P2-B. TRS article: an airport how-to H2 for "hướng dẫn hoàn thuế xuất cảnh úc" / "tại sân bay"
The vi TRS page (long/vi/batch-05.ts) is the vi click leader at 21.0 and already has "## Cách làm thủ tục ở sân bay".
Do not add a duplicate. Proposal: add 2 FAQ items only (FAQ is open, body H2s stay): 
  Q: "Hướng dẫn hoàn thuế xuất cảnh ở sân bay Úc gồm những bước nào?" A: one-sentence summary pointing to the existing
  section, plus "Nếu bạn muốn rút tiền super khi rời Úc, đó là DASP, không làm ở sân bay." 
  Facts for the steps must come from the TRS section already on the page (its sources: ABF/ATO TRS). Verify against
  https://www.ato.gov.au/businesses-and-organisations/gst-excise-and-indirect-taxes/gst/in-detail/rules-for-specific-transactions/international-transactions/gst-free-sales-to-travellers-departing-australia/tourist-refund-scheme
  before writing (not fetched this round). Measure: queries containing "sân bay" / "xuất cảnh" on this URL after 28 days.

### P2-C. Wire P1/P2 guides from strong vi pages
long/en/links.ts LONG_ALSO additions (apply to all languages; vi is where the demand is):
what-is-the-ato-international-students (vi 77 @7.5, 0 clicks) -> blog/mygov-sign-in-problems-international-students;
tax-back-australia-international-students and how-long-does-a-tax-refund-take -> blog/mygov-sign-in-problems-...;
dasp-or-leave-super-international-students and tax-on-super-withdrawal -> blog/dasp-online-application-problems-....
Keep moneyLinks() first; related list is capped at 6, so check that the home and /superannuation stay in.

### P3-A. Third myGov page only if P1-A/B get impressions: "myID với hộ chiếu Việt Nam"
Hold until the December data. The myid.gov.au facts are thin for foreign-passport holders (the "You can't achieve a
Standard identity strength" help text could not be read), so P1-B carries the topic for now.

### P3-B. Measurement (add to the December review)
GSC vi: queries containing "mygov", "myid", "liên kết", "mã", "khóa", "dasp", "super"; pages P1-A, P1-B, P2-A; /vi and
/vi/superannuation impressions; whatsapp_click from those URLs (GA4, Phase 1 event).

## 3. What NOT to do
- Do not change titles, descriptions, H1s, leads or existing H2s of /vi, /vi/superannuation, the TRS article or any
  existing guide (frozen until 7 Dec). New guides only get new titles.
- Do not publish a vi-only article: an EN master LongArticle is required (types.ts, long-articles test). Coordinate the
  EN text and slug with the SVT-en report so the two do not create twin myGov slugs.
- No "/vi/tax-return" page and no vi guide targeting "hoàn thuế úc" head terms: /vi owns "khai thuế, hoàn thuế",
  tax-back and average-tax-refund already cover the refund; a fourth page would split them (a13 R5).
- Do not merge sign-in and linking into the DASP guide: DASP online does not use myGov, so mixing them would mislead.
- Never write "chúng tôi nộp hồ sơ", "kế toán", "đại lý thuế của chúng tôi", "chúng tôi là đại lý thuế", any refund
  promise ("đảm bảo hoàn thuế") or any price; every "đại lý thuế" sentence on home/services/guides must match the approved
  regex (i18n-rules-26oct.test.ts). No em/en dashes. No mention of the other brand.
- Do not state as fact that a Vietnamese passport cannot reach myID Standard or Strong, that DASP "does not need myGov"
  (say what it uses instead), or any time zone for the ATO linking line (the page gives none).
- Do not tell readers to share myGov passwords or codes; existing vi scam articles warn against it (keep consistent).
- Do not promise we fix their myGov account: we help with the return and DASP; myGov recovery is the student's and
  Services Australia's.
