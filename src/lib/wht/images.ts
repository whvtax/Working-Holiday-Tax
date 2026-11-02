/**
 * The photographs on the Working Holiday Tax site (design layer, 1 Nov).
 *
 * Each slot (IMG-W01, ...) has the files it
 * expects in public/wht-assets/img/. The prompts that produce them are in
 * docs/design/WHT_IMAGE_SCRIPT.md. Until every file of a slot is there the
 * page shows a placeholder of the same shape, so dropping the files in is the
 * whole job: no code change.
 */
export interface ImageFile {
  /** File name in public/wht-assets/img/. */
  file: string
  width: number
  height: number
}

export interface ImageSpec {
  id: string
  mobile: ImageFile
  /** A different crop from 1024px up, when the layout changes shape there. */
  desktop?: ImageFile
}

export const WHT_IMAGES: Readonly<Record<string, ImageSpec>> = {
  // Home hero: wide band under the headline on phones, tall beside it on desktop.
  'IMG-W01': {
    id: 'IMG-W01',
    mobile: { file: 'IMG-W01-mobile.webp', width: 1448, height: 891 },
    desktop: { file: 'IMG-W01-desktop.webp', width: 1122, height: 1402 },
  },
  // Home, between the services and the guides: a full-width band.
  'IMG-W02': {
    id: 'IMG-W02',
    mobile: { file: 'IMG-W02-mobile.webp', width: 1448, height: 891 },
    desktop: { file: 'IMG-W02-desktop.webp', width: 1975, height: 724 },
  },
  // Expenses hub hero: seven working holiday jobs in one frame.
  'IMG-W30': {
    id: 'IMG-W30',
    mobile: { file: 'IMG-W30-mobile.webp', width: 1448, height: 891 },
    desktop: { file: 'IMG-W30-desktop.webp', width: 1122, height: 1402 },
  },
}

export const IMAGE_DIR = '/wht-assets/img'

type Lang = 'en' | 'de' | 'ja' | 'fr' | 'it' | 'es'

/**
 * Inner page photos: one per page at most, from a small library of scenes
 * shared by topic. 3:2, one file per scene, the same in every language.
 * Until a file exists the page simply has no photo (never a placeholder).
 */
export const SCENES: Readonly<Record<string, { file: string; width: number; height: number; alt: Readonly<Record<Lang, string>> }>> = {
  'IMG-W10': { file: 'IMG-W10.webp', width: 1536, height: 1024, alt: {
    en: 'A backpack and a passport on a hostel bunk', de: 'Ein Rucksack und ein Reisepass auf einem Hostelbett', ja: 'ホステルの二段ベッドに置かれたバックパックとパスポート',
    fr: 'Un sac à dos et un passeport sur un lit superposé d’auberge de jeunesse',
    it: 'Uno zaino e un passaporto su un letto a castello di un ostello', es: 'Una mochila y un pasaporte sobre una litera de hostal' } },
  'IMG-W11': { file: 'IMG-W11.webp', width: 1536, height: 1024, alt: {
    en: 'A laptop and an invoice on a cafe table', de: 'Ein Laptop und eine Rechnung auf einem Cafétisch', ja: 'カフェのテーブルに置かれたノートパソコンと請求書',
    fr: 'Un ordinateur portable et une facture sur une table de café',
    it: 'Un portatile e una fattura sul tavolino di un bar', es: 'Una laptop y una factura sobre la mesa de un café' } },
  'IMG-W12': { file: 'IMG-W12.webp', width: 1536, height: 1024, alt: {
    en: 'A kitchen table in the morning with a laptop and paperwork', de: 'Ein Küchentisch am Morgen mit Laptop und Unterlagen', ja: '朝のキッチンテーブルにあるノートパソコンと書類',
    fr: 'Une table de cuisine le matin avec un ordinateur portable et des papiers',
    it: 'Un tavolo da cucina al mattino con un portatile e dei documenti', es: 'Una mesa de cocina por la mañana con una laptop y papeles' } },
  'IMG-W13': { file: 'IMG-W13.webp', width: 1536, height: 1024, alt: {
    en: 'A backpack and a suitcase in an airport departure hall', de: 'Ein Rucksack und ein Koffer in einer Abflughalle', ja: '空港の出発ロビーにあるバックパックとスーツケース',
    fr: 'Un sac à dos et une valise dans un hall de départ d’aéroport',
    it: 'Uno zaino e una valigia nella sala partenze di un aeroporto', es: 'Una mochila y una maleta en la sala de salidas de un aeropuerto' } },
  'IMG-W14': { file: 'IMG-W14.webp', width: 1536, height: 1024, alt: {
    en: 'The waiting area of a medical clinic', de: 'Der Wartebereich einer Arztpraxis', ja: 'クリニックの待合室',
    fr: 'La salle d’attente d’un cabinet médical',
    it: 'La sala d’attesa di un ambulatorio medico', es: 'La sala de espera de una clínica médica' } },
  'IMG-W15': { file: 'IMG-W15.webp', width: 1536, height: 1024, alt: {
    en: 'A remote work camp at dusk with a hi-vis vest on a rail', de: 'Ein abgelegenes Arbeitercamp bei Dämmerung mit einer Warnweste am Geländer', ja: '夕暮れの遠隔地ワークキャンプと手すりに掛けた反射ベスト',
    fr: 'Un camp de travail isolé au crépuscule, avec un gilet haute visibilité sur une rambarde',
    it: 'Un campo di lavoro isolato al tramonto, con un gilet ad alta visibilità su una ringhiera', es: 'Un campamento de trabajo aislado al atardecer, con un chaleco reflectante en una baranda' } },
  'IMG-W16': { file: 'IMG-W16.webp', width: 1536, height: 1024, alt: {
    en: 'A delivery bike with an insulated bag on a city corner', de: 'Ein Lieferfahrrad mit Thermotasche an einer Stadtecke', ja: '街角に停まった保温バッグ付きの配達用自転車',
    fr: 'Un vélo de livraison avec un sac isotherme à un coin de rue',
    it: 'Una bici per le consegne con una borsa termica all’angolo di una strada', es: 'Una bicicleta de reparto con una mochila térmica en una esquina de la ciudad' } },
  'IMG-W17': { file: 'IMG-W17.webp', width: 1536, height: 1024, alt: {
    en: 'A restaurant kitchen during a busy service', de: 'Eine Restaurantküche während des Stoßbetriebs', ja: '忙しい営業中のレストランの厨房',
    fr: 'Une cuisine de restaurant en plein service',
    it: 'La cucina di un ristorante durante il servizio', es: 'La cocina de un restaurante en pleno servicio' } },
  'IMG-W18': { file: 'IMG-W18.webp', width: 1536, height: 1024, alt: {
    en: 'A hard hat and a hi-vis vest on a building site fence', de: 'Ein Schutzhelm und eine Warnweste an einem Baustellenzaun', ja: '建設現場のフェンスに掛けたヘルメットと反射ベスト',
    fr: 'Un casque et un gilet haute visibilité sur la clôture d’un chantier',
    it: 'Un casco e un gilet ad alta visibilità sulla recinzione di un cantiere', es: 'Un casco y un chaleco reflectante en la valla de una obra' } },
  'IMG-W19': { file: 'IMG-W19.webp', width: 1536, height: 1024, alt: {
    en: 'Rows of fruit trees on a farm in morning light', de: 'Obstbaumreihen auf einer Farm im Morgenlicht', ja: '朝の光に照らされた農園の果樹の列',
    fr: 'Des rangées d’arbres fruitiers dans une ferme à la lumière du matin',
    it: 'File di alberi da frutto in una fattoria nella luce del mattino', es: 'Hileras de árboles frutales en una granja con la luz de la mañana' } },
  'IMG-W20': { file: 'IMG-W20.webp', width: 1536, height: 1024, alt: {
    en: 'A quiet warehouse aisle with safety boots by a trolley', de: 'Ein ruhiger Lagergang mit Sicherheitsschuhen neben einem Wagen', ja: '台車のそばに安全靴が置かれた静かな倉庫の通路',
    fr: 'Une allée d’entrepôt calme avec des chaussures de sécurité près d’un chariot',
    it: 'Un corridoio tranquillo di un magazzino con scarpe antinfortunistiche accanto a un carrello', es: 'Un pasillo tranquilo de un almacén con botas de seguridad junto a un carro' } },
  'IMG-W21': { file: 'IMG-W21.webp', width: 1536, height: 1024, alt: {
    en: 'A cleaning trolley in a hotel corridor', de: 'Ein Reinigungswagen in einem Hotelflur', ja: 'ホテルの廊下にある清掃用カート',
    fr: 'Un chariot de ménage dans un couloir d’hôtel',
    it: 'Un carrello delle pulizie nel corridoio di un hotel', es: 'Un carrito de limpieza en el pasillo de un hotel' } },
  'IMG-W22': { file: 'IMG-W22.webp', width: 1536, height: 1024, alt: {
    en: 'A beach car park at sunrise with a van and surfboards', de: 'Ein Strandparkplatz bei Sonnenaufgang mit Van und Surfbrettern', ja: '日の出のビーチの駐車場に停まったバンとサーフボード',
    fr: 'Un parking de plage au lever du soleil avec un van et des planches de surf',
    it: 'Un parcheggio sulla spiaggia all’alba con un furgone e delle tavole da surf', es: 'Un estacionamiento de playa al amanecer con una van y tablas de surf' } },
}

/** Which scene each page shows (page keys are the route without the language prefix). */
export const PAGE_SCENE: Readonly<Record<string, string>> = {
  tfn: 'IMG-W10', abn: 'IMG-W11', 'tax-return': 'IMG-W12', superannuation: 'IMG-W13', medicare: 'IMG-W14',
  'expenses/fifo': 'IMG-W15', 'expenses/delivery-drivers': 'IMG-W16', 'expenses/hospitality': 'IMG-W17',
  'expenses/construction': 'IMG-W18', 'expenses/farm-work': 'IMG-W19', 'expenses/labouring': 'IMG-W20',
  'expenses/cleaners': 'IMG-W21', calculator: 'IMG-W12', about: 'IMG-W22', contact: 'IMG-W22',
  'uk-working-holiday-tax': 'IMG-W22', 'german-working-holiday-tax': 'IMG-W22',
}
