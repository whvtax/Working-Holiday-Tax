/**
 * The photographs on the Student Visa Tax site (milestone 8).
 *
 * Each slot (IMG-01, IMG-02, ...) has the files it expects in
 * public/svt-assets/img/. The prompts that produce them are in the
 * "Student Visa Tax: image prompts" document. Until every file of a slot is
 * there, the page shows the placeholder, so dropping the files in is the
 * whole job: no code change. The pre-launch check fails while any slot is
 * still a placeholder.
 */
export interface ImageFile {
  /** File name in public/svt-assets/img/. */
  file: string
  width: number
  height: number
}

export interface ImageSpec {
  id: string
  /** The image phones see (and the only one, if there is no desktop crop). */
  mobile: ImageFile
  /** A different crop from 1024px up, when the layout changes shape there. */
  desktop?: ImageFile
}

export const SVT_IMAGES: Readonly<Record<string, ImageSpec>> = {
  // Home hero: wide band under the headline on phones, tall beside it on desktop.
  'IMG-01': {
    id: 'IMG-01',
    mobile: { file: 'IMG-01-mobile.webp', width: 1448, height: 891 },
    desktop: { file: 'IMG-01-desktop.webp', width: 1122, height: 1402 },
  },
  // Home, between "how it works" and the payslip: a full-width band.
  'IMG-02': {
    id: 'IMG-02',
    mobile: { file: 'IMG-02-mobile.webp', width: 1448, height: 891 },
    desktop: { file: 'IMG-02-desktop.webp', width: 1975, height: 724 },
  },
}

export const IMAGE_DIR = '/svt-assets/img'

/**
 * Article photos (decision 005): one per page at most, from a small library of
 * scenes shared by topic. 3:2, one file per scene, the same in every language.
 * Until a file exists the page simply has no photo (never a placeholder).
 */
export const SCENES: Readonly<Record<string, { file: string; width: number; height: number; alt: Readonly<Record<'en' | 'zh' | 'vi', string>> }>> = {
  'IMG-10': { file: 'IMG-10.webp', width: 1536, height: 1024, alt: {
    en: 'A letter waiting in the letterbox of a share house', zh: '合租房门口的信箱里有一封信', vi: 'Một lá thư trong hộp thư của căn nhà thuê chung' } },
  'IMG-11': { file: 'IMG-11.webp', width: 1536, height: 1024, alt: {
    en: 'A quiet warehouse aisle on a weekend shift, a hi-vis vest on a trolley', zh: '周末班的仓库过道，推车上挂着一件反光背心', vi: 'Lối đi trong nhà kho vào ca cuối tuần, áo phản quang treo trên xe đẩy' } },
  'IMG-12': { file: 'IMG-12.webp', width: 1536, height: 1024, alt: {
    en: 'Students walking across a university campus lawn', zh: '学生们走过大学校园的草坪', vi: 'Sinh viên đi ngang bãi cỏ trong khuôn viên trường đại học' } },
  'IMG-13': { file: 'IMG-13.webp', width: 1536, height: 1024, alt: {
    en: 'A desk at night with a laptop, a coffee and a few papers', zh: '夜晚的书桌上放着笔记本电脑、一杯咖啡和几张纸', vi: 'Bàn học buổi tối với máy tính xách tay, một ly cà phê và vài tờ giấy' } },
  'IMG-14': { file: 'IMG-14.webp', width: 1536, height: 1024, alt: {
    en: 'A share-house kitchen table in the morning, with mail and a cup of tea', zh: '早晨合租房的餐桌上放着信件和一杯茶', vi: 'Bàn bếp nhà thuê chung buổi sáng, có thư và một tách trà' } },
  'IMG-15': { file: 'IMG-15.webp', width: 1536, height: 1024, alt: {
    en: 'The waiting area of a university health clinic', zh: '大学健康诊所的候诊区', vi: 'Khu chờ của phòng khám sức khỏe trong trường đại học' } },
  'IMG-16': { file: 'IMG-16.webp', width: 1536, height: 1024, alt: {
    en: 'A restaurant kitchen during a busy service', zh: '营业高峰时的餐厅厨房', vi: 'Bếp nhà hàng trong giờ cao điểm' } },
  'IMG-17': { file: 'IMG-17.webp', width: 1536, height: 1024, alt: {
    en: 'A delivery rider with an insulated bag waiting at a city corner by day', zh: '白天，一名背着保温外卖包的骑手在城市街角等候', vi: 'Một người giao hàng đeo túi giữ nhiệt đứng chờ ở góc phố ban ngày' } },
  'IMG-18': { file: 'IMG-18.webp', width: 1536, height: 1024, alt: {
    en: 'A suitcase and a backpack in an airport departure hall', zh: '机场出发大厅里的一个行李箱和一个背包', vi: 'Một chiếc vali và ba lô ở sảnh khởi hành sân bay' } },
  'IMG-19': { file: 'IMG-19.webp', width: 1448, height: 965, alt: {
    en: 'Chef whites, a hi-vis vest and safety boots hanging by a staff room door', zh: '员工休息室门边挂着厨师服、反光背心和安全鞋', vi: 'Áo đầu bếp, áo phản quang và giày bảo hộ treo cạnh cửa phòng nhân viên' } },
}

/** Which scene each page shows (library slugs, see library.ts). */
export const PAGE_SCENE: Readonly<Record<string, string>> = {
  'blog/apply-for-tfn-student-visa': 'IMG-10', 'blog/tfn-declaration-two-jobs': 'IMG-11', 'tax-residency': 'IMG-12',
  'do-i-need-to-lodge': 'IMG-13', 'blog/income-statement-tax-ready': 'IMG-13', 'blog/work-deductions-students': 'IMG-19',
  'blog/low-income-tax-offset-students': 'IMG-13', medicare: 'IMG-15', 'blog/cash-in-hand-and-tips': 'IMG-16',
  'blog/how-long-does-a-tax-refund-take': 'IMG-14', 'blog/amend-tax-return': 'IMG-13', 'blog/late-lodgment': 'IMG-14', 'blog/tax-return-deadline-31-october': 'IMG-14',
  'blog/tax-payment-plan': 'IMG-14', 'past-years': 'IMG-13', 'leaving-australia': 'IMG-18', 'blog/lodge-from-overseas': 'IMG-18',
  'blog/minimum-wage-students': 'IMG-16', 'blog/payslip-what-to-check': 'IMG-16', 'blog/unpaid-trial-shifts': 'IMG-16', 'blog/underpaid-student-visa': 'IMG-16',
  'blog/employee-or-contractor': 'IMG-17', 'blog/what-is-an-abn-students': 'IMG-17', 'abn-delivery': 'IMG-17', 'blog/cancel-abn-before-leaving': 'IMG-18',
  'blog/how-much-super-employer-pays': 'IMG-11', 'blog/find-and-check-your-super': 'IMG-13', 'blog/employer-not-paying-super': 'IMG-16',
  superannuation: 'IMG-18', 'blog/dasp-documents-and-timing': 'IMG-18',
}
