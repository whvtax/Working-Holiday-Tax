/**
 * Student Visa Tax: the tax residency step in the six languages added with
 * decision 017 (de, ja, es, fr, it, pt). English, Chinese and Vietnamese stay
 * in form-brand-svt.tsx. Students choose between Australian resident and
 * foreign resident for tax; the working holiday maker status never appears.
 *
 * written by an agent, not checked by a native speaker (18 Nov 2026)
 */
import type { ResidencyCopy } from '@/components/ui/form-brand'

// written by an agent, not checked by a native speaker (18 Nov 2026)
export const DE_RES: ResidencyCopy = {
  titleLead: 'Bestätigen wir deine ', titleAccent: 'Steuerresidenz', titleTail: '',
  intro: 'Die steuerliche Ansässigkeit bestimmt, welche Steuersätze für dein Einkommen gelten.',
  introEmph: 'Sie ist unabhängig von deinem Visum.',
  quizIntro: 'Damit du in Australien als steuerlich ansässig giltst (dann sind die ersten $18,200 deines Einkommens steuerfrei), sollten die meisten der folgenden Punkte wirklich auf dich zutreffen.\n\nWenn das so ist, kannst du „In Australien steuerlich ansässig“ auswählen. Die endgültige Entscheidung über deinen Status trifft das ATO, nachdem wir deine Steuererklärung eingereicht haben.',
  questions: [
    'Dein Kurs in Australien dauert 6 Monate oder länger',
    'Du wohnst während des Studiums in Australien',
    'Während des Jahres wohnst du normalerweise in Australien',
    'Du arbeitest neben dem Studium in Australien oder hast dort andere Bindungen',
  ],
  sessionLost: 'Deine Sitzung ist abgelaufen. Bitte gib deine Angaben noch einmal ein. Es wurde nichts gesendet.',
  sessionLostCta: 'Zurück zum Formular',
  declIntro: 'Ich habe diese Seite und die Informationen des ATO gelesen und erkläre, dass ich steuerlich Folgendes bin:',
  residentLabel: 'In Australien steuerlich ansässig',
  otherLabel: 'In Australien steuerlich nicht ansässig (foreign resident)',
  pickOne: 'Bitte wähle deinen steuerlichen Status',
  secure: 'Deine Daten werden sicher und vertraulich behandelt.',
  confirmLead: 'Du hast „foreign resident“ gewählt, also steuerlich nicht ansässig. Das bedeutet: Der steuerfreie Betrag von $18,200 und der Low Income Tax Offset gelten nicht, und Steuern fallen ab dem ersten Dollar an. Wir prüfen deine Angabe, bevor etwas eingereicht wird.',
  confirmYes: 'Ja, das stimmt',
  confirmNo: 'Noch einmal prüfen',
}

// written by an agent, not checked by a native speaker (18 Nov 2026)
export const JA_RES: ResidencyCopy = {
  titleLead: '', titleAccent: '税務上の居住区分', titleTail: 'を確認しましょう',
  intro: '税務上の居住区分は、所得に適用される税率を決めるものです。',
  introEmph: 'ビザとは別のものです。',
  quizIntro: 'オーストラリアの税務上の居住者と見なされる（所得の最初の$18,200が非課税になる）には、以下の項目のほとんどが実際に当てはまっている必要があります。\n\n当てはまる場合は、「オーストラリアの税務上の居住者」を選択できます。居住区分の最終的な判断は、当社がタックスリターンを提出した後にATOが行います。',
  questions: [
    'オーストラリアでのコースの期間が6か月以上である',
    '在学中はオーストラリアに住んでいる',
    'その年度中、普段の住まいがオーストラリアにある',
    '在学中にオーストラリアで働いている、またはその他のつながりがある',
  ],
  sessionLost: 'セッションの有効期限が切れたため、もう一度ご入力ください。送信はされていません。',
  sessionLostCta: 'フォームに戻る',
  declIntro: 'このページとATOの情報を読んだうえで、税務上、私は次のとおりであることを宣言します：',
  residentLabel: 'オーストラリアの税務上の居住者',
  otherLabel: '税務上の非居住者（foreign resident）',
  pickOne: '税務上の居住区分を選択してください',
  secure: 'お客様の情報は安全かつ機密に管理されます。',
  confirmLead: '非居住者（foreign resident）を選択されました。この場合、$18,200の非課税枠と低所得者税額控除（Low Income Tax Offset）は適用されず、最初の1ドルから課税されます。提出前に、当チームがご回答を確認します。',
  confirmYes: 'はい、間違いありません',
  confirmNo: 'もう一度確認する',
}

// written by an agent, not checked by a native speaker (18 Nov 2026)
export const ES_RES: ResidencyCopy = {
  titleLead: 'Confirmemos tu ', titleAccent: 'residencia fiscal', titleTail: '',
  intro: 'La residencia fiscal decide qué tasas de impuestos se aplican a tus ingresos.',
  introEmph: 'Es algo distinto de tu visa.',
  quizIntro: 'Para que se te considere residente fiscal australiano, es decir, para que los primeros $18,200 de tus ingresos estén libres de impuestos, la mayoría de los puntos de abajo deberían aplicarse de verdad a tu caso.\n\nSi es así, puedes elegir "Residente fiscal australiano". La decisión final sobre tu residencia la toma la ATO una vez que hayamos presentado tu declaración.',
  questions: [
    'Tu curso en Australia dura 6 meses o más',
    'Vives en Australia mientras estudias',
    'Tu hogar habitual durante el año está en Australia',
    'Trabajas o tienes otros vínculos en Australia mientras estudias',
  ],
  sessionLost: 'Tu sesión caducó, así que tienes que volver a escribir tus datos. No se envió nada.',
  sessionLostCta: 'Volver al formulario',
  declIntro: 'Después de leer esta página y la información de la ATO, declaro que a efectos fiscales soy:',
  residentLabel: 'Residente fiscal australiano',
  otherLabel: 'No residente fiscal (foreign resident)',
  pickOne: 'Elige tu situación de residencia fiscal',
  secure: 'Tu información se guarda de forma segura y privada.',
  confirmLead: 'Elegiste no residente fiscal (foreign resident). Esto significa que el umbral libre de impuestos de $18,200 y el Low Income Tax Offset no se aplican, y que pagas impuestos desde el primer dólar. Revisamos tu respuesta antes de presentar nada.',
  confirmYes: 'Sí, es correcto',
  confirmNo: 'Déjame revisarlo otra vez',
}

// written by an agent, not checked by a native speaker (18 Nov 2026)
export const FR_RES: ResidencyCopy = {
  titleLead: 'Confirmons ta ', titleAccent: 'résidence fiscale', titleTail: '',
  intro: 'La résidence fiscale détermine les taux d’imposition appliqués à tes revenus.',
  introEmph: 'Elle est distincte de ton visa.',
  quizIntro: 'Pour être considéré comme résident fiscal australien, c’est-à-dire pour que les premiers $18,200 de tes revenus ne soient pas imposés, la plupart des points ci-dessous doivent vraiment te correspondre.\n\nSi c’est le cas, tu peux choisir « Résident fiscal australien ». La décision finale sur ta résidence revient à l’ATO, une fois ta déclaration déposée par nos soins.',
  questions: [
    'Ta formation en Australie dure 6 mois ou plus',
    'Tu vis en Australie pendant tes études',
    'Ton domicile habituel pendant l’année est en Australie',
    'Tu travailles ou tu as d’autres attaches en Australie pendant tes études',
  ],
  sessionLost: 'Ta session a expiré : il faut saisir tes informations à nouveau. Rien n’a été envoyé.',
  sessionLostCta: 'Retour au formulaire',
  declIntro: 'Après avoir lu cette page et les informations de l’ATO, je déclare être, sur le plan fiscal :',
  residentLabel: 'Résident fiscal australien',
  otherLabel: 'Non-résident fiscal (foreign resident)',
  pickOne: 'Choisis ton statut de résidence fiscale',
  secure: 'Tes informations restent sécurisées et confidentielles.',
  confirmLead: 'Tu as choisi non-résident fiscal (foreign resident). Cela veut dire que le seuil d’exonération de $18,200 et le Low Income Tax Offset ne s’appliquent pas, et que l’impôt est dû dès le premier dollar. Nous vérifions ta réponse avant tout dépôt.',
  confirmYes: 'Oui, c’est correct',
  confirmNo: 'Revoir mes réponses',
}

// written by an agent, not checked by a native speaker (18 Nov 2026)
export const IT_RES: ResidencyCopy = {
  titleLead: 'Confermiamo la tua ', titleAccent: 'residenza fiscale', titleTail: '',
  intro: 'La residenza fiscale stabilisce quali aliquote si applicano al tuo reddito.',
  introEmph: 'È una cosa distinta dal tuo visto.',
  quizIntro: 'Per essere considerato residente fiscale australiano, cioè con i primi $18,200 di reddito esenti da imposta, la maggior parte dei punti qui sotto deve riguardarti davvero.\n\nSe è così, puoi scegliere "Residente fiscale australiano". La decisione finale sulla tua residenza spetta all’ATO, dopo che avremo presentato la tua dichiarazione.',
  questions: [
    'Il tuo corso in Australia dura 6 mesi o più',
    'Vivi in Australia mentre studi',
    'La tua casa abituale durante l’anno è in Australia',
    'Lavori o hai altri legami in Australia mentre studi',
  ],
  sessionLost: 'La sessione è scaduta, quindi devi inserire di nuovo i tuoi dati. Non è stato inviato nulla.',
  sessionLostCta: 'Torna al modulo',
  declIntro: 'Dopo aver letto questa pagina e le informazioni dell’ATO, dichiaro che ai fini fiscali sono:',
  residentLabel: 'Residente fiscale australiano',
  otherLabel: 'Non residente fiscale (foreign resident)',
  pickOne: 'Scegli il tuo stato di residenza fiscale',
  secure: 'I tuoi dati sono protetti e restano riservati.',
  confirmLead: 'Hai scelto non residente fiscale (foreign resident). Significa che la soglia di esenzione di $18,200 e il Low Income Tax Offset non si applicano e che le imposte partono dal primo dollaro. Controlliamo la tua risposta prima di presentare qualsiasi cosa.',
  confirmYes: 'Sì, è corretto',
  confirmNo: 'Ricontrollo',
}

// written by an agent, not checked by a native speaker (18 Nov 2026)
export const PT_RES: ResidencyCopy = {
  titleLead: 'Vamos confirmar sua ', titleAccent: 'residência fiscal', titleTail: '',
  intro: 'A residência fiscal define quais alíquotas valem para a sua renda.',
  introEmph: 'É uma questão separada do seu visto.',
  quizIntro: 'Para ser considerado residente fiscal australiano, ou seja, para que os primeiros $18,200 da sua renda fiquem livres de imposto, a maioria dos pontos abaixo precisa valer de verdade para você.\n\nSe for o caso, você pode escolher "Residente fiscal australiano". A decisão final sobre a sua residência é da ATO, depois que enviarmos a sua declaração.',
  questions: [
    'Seu curso na Austrália dura 6 meses ou mais',
    'Você mora na Austrália enquanto estuda',
    'Sua moradia habitual durante o ano fica na Austrália',
    'Você trabalha ou tem outros vínculos na Austrália enquanto estuda',
  ],
  sessionLost: 'Sua sessão expirou, então você precisa preencher os dados de novo. Nada foi enviado.',
  sessionLostCta: 'Voltar ao formulário',
  declIntro: 'Depois de ler esta página e as informações da ATO, declaro que, para fins fiscais, sou:',
  residentLabel: 'Residente fiscal australiano',
  otherLabel: 'Não residente fiscal (foreign resident)',
  pickOne: 'Escolha sua situação de residência fiscal',
  secure: 'Seus dados ficam seguros e privados.',
  confirmLead: 'Você escolheu não residente fiscal (foreign resident). Isso quer dizer que a faixa de isenção de $18,200 e o Low Income Tax Offset não se aplicam, e que há imposto desde o primeiro dólar. Conferimos a sua resposta antes de enviar qualquer coisa.',
  confirmYes: 'Sim, está certo',
  confirmNo: 'Quero rever',
}
