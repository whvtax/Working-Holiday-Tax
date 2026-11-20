/** Chinese and Vietnamese versions of the fixed messages that are not in the template
 *  translations (Jo, 27 Oct): thanks, "later", and the one-message price texts (the price
 *  flow's 'old' setting). Keys match renderApproved keys; "@first" is the first-message
 *  variant. {{name}} is replaced with the first name, {{form}} with the form link.
 *  18 Nov (decision 018): for BOTH brands (the name is historical), and every key that the
 *  nine-language translations cover (opening, couple, refund_not_yet, documents_received,
 *  bank_document, own_account, refund_chance, payment link, not_our_price, no_refund_cases,
 *  account_name) was removed here: those come from i18n.ts in every language.
 *  18 Nov (language review): no "right away" (马上, ngay) that the English does not say, the
 *  guarantee worded as in the price flow, "bạn được hưởng" (the customer, not us). */
export const SVT_FIXED_TEXTS: Readonly<Record<'zh' | 'vi', Readonly<Record<string, string>>>> = {
  zh: {
    'thanks@first': "不客气！😊",
    thanks: "不客气！😊",
    'later_plan@first': "完全不急，你什么时候方便都可以 😊",
    later_plan: "完全不急，你什么时候方便都可以 😊",
    // By stage, like the English (later-plan.ts): paid gets the form, price sent gets the screenshot ask.
    'later_plan@form': "不急 😊 方便的时候点这个链接填表就行：{{form}}",
    'later_plan@pay': "不急 😊 转好账发个截图给我们就行。",
    'price_tfn@first': "嗨 {{name}}！😊 很乐意帮你。\n\n看起来 TFN 这个方案最适合你：$220。我们会审核你的税务居民身份、Medicare 和抵扣项目，然后帮你准备并提交报税，确保你该拿的一样都不漏。\n\nBSB: 062692\nAccount: 81049952\n\n如果你的退税比我们的费用少，差额我们退给你。如果没有退税，费用照常全额收取。\n\n付款后发个截图给我们，我们就开始处理！",
    price_tfn: "好的，那就是 TFN 方案，$220。我们会审核你的税务居民身份、Medicare 和抵扣项目，然后帮你准备并提交报税，确保你该拿的一样都不漏。\n\nBSB: 062692\nAccount: 81049952\n\n如果你的退税比我们的费用少，差额我们退给你。如果没有退税，费用照常全额收取。\n\n付款后发个截图给我们，我们就开始处理！",
    'price_tfn_abn@first': "嗨 {{name}}！😊 很乐意帮你。\n\n看起来 TFN + ABN 这个方案最适合你：$385。我们会审核你的税务居民身份、Medicare 和抵扣项目，为你的 ABN 收入和支出另外做一份 business schedule（经营收支明细），然后帮你准备并提交报税，确保你该拿的一样都不漏。\n\nBSB: 062692\nAccount: 81049952\n\n付款后发个截图给我们，我们就开始处理！",
    price_tfn_abn: "好的，那就是 TFN + ABN 方案，$385。我们会审核你的税务居民身份、Medicare 和抵扣项目，为你的 ABN 收入和支出另外做一份 business schedule（经营收支明细），然后帮你准备并提交报税，确保你该拿的一样都不漏。\n\nBSB: 062692\nAccount: 81049952\n\n付款后发个截图给我们，我们就开始处理！",
    'price_tfn_review@first': "没问题，已经提交过的报税我们也可以帮你审核。\n\n因为已经提交了，这次是帮你审核已有的报税，不是重新报一份。审核费用是 $330，包含审核，以及需要时重新提交修改后的报税，不管审核结果怎样都是这个价。\n\nBSB: 062692\nAccount: 81049952\n\n付款后发个截图给我们，我们就开始处理！",
    price_tfn_review: "没问题，已经提交过的报税我们也可以帮你审核。\n\n因为已经提交了，这次是帮你审核已有的报税，不是重新报一份。审核费用是 $330，包含审核，以及需要时重新提交修改后的报税，不管审核结果怎样都是这个价。\n\nBSB: 062692\nAccount: 81049952\n\n付款后发个截图给我们，我们就开始处理！",
    'price_tfn_abn_review@first': "没问题，已经提交过的报税我们也可以帮你审核。\n\n因为已经提交了，这次是帮你审核已有的报税，不是重新报一份。审核费用是 $440（含 GST），不管审核结果怎样都是这个价。\n\nBSB: 062692\nAccount: 81049952\n\n付款后发个截图给我们，我们就开始处理！",
    price_tfn_abn_review: "没问题，已经提交过的报税我们也可以帮你审核。\n\n因为已经提交了，这次是帮你审核已有的报税，不是重新报一份。审核费用是 $440（含 GST），不管审核结果怎样都是这个价。\n\nBSB: 062692\nAccount: 81049952\n\n付款后发个截图给我们，我们就开始处理！",
  },
  vi: {
    'thanks@first': "Không có gì đâu bạn! 😊",
    thanks: "Không có gì đâu bạn! 😊",
    'later_plan@first': "Không gấp đâu, lúc nào bạn tiện thì làm nhé 😊",
    later_plan: "Không gấp đâu, lúc nào bạn tiện thì làm nhé 😊",
    'later_plan@form': "Không sao đâu 😊 Đây là link, khi nào bạn sẵn sàng thì điền nhé: {{form}}",
    'later_plan@pay': "Không gấp đâu 😊 Bạn chuyển khoản xong thì gửi ảnh chụp màn hình cho bên mình nhé.",
    'price_tfn@first': "Chào {{name}}! 😊 Rất vui được giúp bạn.\n\nCó vẻ gói TFN là phù hợp nhất với bạn: $220. Bên mình xem xét tình trạng cư trú thuế, Medicare và các khoản khấu trừ của bạn, rồi chuẩn bị và nộp hồ sơ thuế, để bạn không bỏ sót khoản nào bạn được hưởng.\n\nBSB: 062692\nSố tài khoản: 81049952\n\nNếu tiền hoàn thuế của bạn thấp hơn phí của bên mình, bên mình sẽ trả lại bạn phần chênh lệch. Nếu không có tiền hoàn thuế, phí đầy đủ của bên mình vẫn được áp dụng.\n\nBạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!",
    price_tfn: "Mình hiểu rồi, vậy là gói TFN, $220. Bên mình xem xét tình trạng cư trú thuế, Medicare và các khoản khấu trừ của bạn, rồi chuẩn bị và nộp hồ sơ thuế, để bạn không bỏ sót khoản nào bạn được hưởng.\n\nBSB: 062692\nSố tài khoản: 81049952\n\nNếu tiền hoàn thuế của bạn thấp hơn phí của bên mình, bên mình sẽ trả lại bạn phần chênh lệch. Nếu không có tiền hoàn thuế, phí đầy đủ của bên mình vẫn được áp dụng.\n\nBạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!",
    'price_tfn_abn@first': "Chào {{name}}! 😊 Rất vui được giúp bạn.\n\nCó vẻ gói TFN + ABN là phù hợp nhất với bạn: $385. Bên mình xem xét tình trạng cư trú thuế, Medicare và các khoản khấu trừ của bạn, lập thêm bảng kê kinh doanh (business schedule) cho thu nhập và chi phí ABN, rồi chuẩn bị và nộp hồ sơ thuế, để bạn không bỏ sót khoản nào bạn được hưởng.\n\nBSB: 062692\nSố tài khoản: 81049952\n\nBạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!",
    price_tfn_abn: "Mình hiểu rồi, vậy là gói TFN + ABN, $385. Bên mình xem xét tình trạng cư trú thuế, Medicare và các khoản khấu trừ của bạn, lập thêm bảng kê kinh doanh (business schedule) cho thu nhập và chi phí ABN, rồi chuẩn bị và nộp hồ sơ thuế, để bạn không bỏ sót khoản nào bạn được hưởng.\n\nBSB: 062692\nSố tài khoản: 81049952\n\nBạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!",
    'price_tfn_review@first': "Được bạn nhé, bên mình có thể xem lại hồ sơ thuế bạn đã nộp.\n\nVì hồ sơ đã được nộp rồi, nên đây là dịch vụ xem lại hồ sơ đã có, chứ không phải làm hồ sơ mới. Phí là $330, gồm việc xem lại và, nếu cần, nộp lại hồ sơ thuế đã sửa, và không thay đổi dù kết quả thế nào.\n\nBSB: 062692\nSố tài khoản: 81049952\n\nBạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!",
    price_tfn_review: "Được bạn nhé, bên mình có thể xem lại hồ sơ thuế bạn đã nộp.\n\nVì hồ sơ đã được nộp rồi, nên đây là dịch vụ xem lại hồ sơ đã có, chứ không phải làm hồ sơ mới. Phí là $330, gồm việc xem lại và, nếu cần, nộp lại hồ sơ thuế đã sửa, và không thay đổi dù kết quả thế nào.\n\nBSB: 062692\nSố tài khoản: 81049952\n\nBạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!",
    'price_tfn_abn_review@first': "Được bạn nhé, bên mình có thể xem lại hồ sơ thuế bạn đã nộp.\n\nVì hồ sơ đã được nộp rồi, nên đây là dịch vụ xem lại hồ sơ đã có, chứ không phải làm hồ sơ mới. Phí cho việc xem lại là $440 (đã gồm GST) và không thay đổi dù kết quả thế nào.\n\nBSB: 062692\nSố tài khoản: 81049952\n\nBạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!",
    price_tfn_abn_review: "Được bạn nhé, bên mình có thể xem lại hồ sơ thuế bạn đã nộp.\n\nVì hồ sơ đã được nộp rồi, nên đây là dịch vụ xem lại hồ sơ đã có, chứ không phải làm hồ sơ mới. Phí cho việc xem lại là $440 (đã gồm GST) và không thay đổi dù kết quả thế nào.\n\nBSB: 062692\nSố tài khoản: 81049952\n\nBạn chuyển khoản xong thì gửi ảnh chụp màn hình, bên mình sẽ bắt đầu làm nhé!",
  },
}
