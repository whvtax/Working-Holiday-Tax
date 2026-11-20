'use client'

/**
 * The residency correction link (Jo, 3 Nov). Shown on the tax-residency page ONLY
 * when it is opened with a valid one-time correction link (?k=). It lets the
 * customer answer that one question again. Nothing else on their record is
 * reachable from here, and without the link the page looks exactly as before.
 * The questionnaire components are not touched: this sits beside them.
 */

import { useEffect, useState } from 'react'

import type { AnyFormLang } from '@/lib/formStrings'
import { useShownFormLang } from '@/components/ui/useShownFormLang'

type L = AnyFormLang
export const RESIDENCY_FIX_COPY: Record<L, { title: string; intro: string; resident: string; whm: string; pick: string; save: string; saving: string; done: string; doneBody: string; used: string; usedBody: string; err: string }> = {
  en: { title: 'Update your answer', intro: 'Please choose the option that best describes you. Our team reviews it as part of preparing your return, and the ATO makes the final decision.', resident: 'Australian tax resident', whm: 'Working holiday maker', pick: 'Please choose one option to continue.', save: 'Save my answer', saving: 'Saving...', done: 'Thank you, your answer has been updated.', doneBody: 'You do not need to do anything else. Our team will take it from here.', used: 'This link has already been used.', usedBody: 'If something still needs changing, message us on WhatsApp and we will help.', err: 'Something went wrong. Please message us on WhatsApp and we will fix it for you.' },
  de: { title: 'Angabe aktualisieren', intro: 'Bitte wähle die Option, die am besten auf dich zutrifft. Unser Team prüft das bei der Vorbereitung deiner Steuererklärung, und das ATO entscheidet am Ende.', resident: 'In Australien steuerlich ansässig', whm: 'Working Holiday Maker', pick: 'Bitte wähle eine Option, um fortzufahren.', save: 'Antwort speichern', saving: 'Wird gespeichert...', done: 'Danke, deine Angabe wurde aktualisiert.', doneBody: 'Du musst nichts weiter tun. Unser Team übernimmt ab hier.', used: 'Dieser Link wurde bereits verwendet.', usedBody: 'Wenn noch etwas geändert werden muss, schreib uns auf WhatsApp und wir helfen dir.', err: 'Etwas ist schiefgelaufen. Schreib uns bitte auf WhatsApp und wir kümmern uns darum.' },
  ja: { title: 'ご回答の更新', intro: '最も当てはまるものをお選びください。タックスリターンの作成時に当チームが確認し、最終的な判断はATOが行います。', resident: 'オーストラリアの税務上の居住者', whm: 'ワーキングホリデーメーカー', pick: '続けるには1つお選びください。', save: '回答を保存する', saving: '保存中…', done: 'ありがとうございます。ご回答を更新しました。', doneBody: 'これ以上のお手続きは不要です。以降は当チームが対応します。', used: 'このリンクはすでに使用されています。', usedBody: '変更が必要な場合は、WhatsAppでご連絡ください。対応いたします。', err: 'エラーが発生しました。WhatsAppでご連絡ください。こちらで対応いたします。' },
  // The six below: written by an agent, not checked by a native speaker (18 Nov 2026)
  es: { title: 'Actualiza tu respuesta', intro: 'Elige la opción que mejor te describe. Nuestro equipo la revisa al preparar tu declaración, y la decisión final la toma la ATO.', resident: 'Residente fiscal australiano', whm: 'Working Holiday Maker', pick: 'Elige una opción para continuar.', save: 'Guardar mi respuesta', saving: 'Guardando...', done: 'Gracias, tu respuesta quedó actualizada.', doneBody: 'No tienes que hacer nada más. Nuestro equipo sigue desde aquí.', used: 'Este enlace ya se usó.', usedBody: 'Si todavía hay algo que cambiar, escríbenos por WhatsApp y te ayudamos.', err: 'Algo salió mal. Escríbenos por WhatsApp y lo arreglamos.' },
  fr: { title: 'Mets à jour ta réponse', intro: 'Choisis l’option qui te correspond le mieux. Notre équipe la vérifie en préparant ta déclaration, et la décision finale revient à l’ATO.', resident: 'Résident fiscal australien', whm: 'Working Holiday Maker', pick: 'Choisis une option pour continuer.', save: 'Enregistrer ma réponse', saving: 'Enregistrement...', done: 'Merci, ta réponse a été mise à jour.', doneBody: 'Tu n’as rien d’autre à faire. Notre équipe prend le relais.', used: 'Ce lien a déjà été utilisé.', usedBody: 'S’il reste quelque chose à modifier, écris-nous sur WhatsApp et on t’aide.', err: 'Un problème est survenu. Écris-nous sur WhatsApp et on s’en occupe.' },
  it: { title: 'Aggiorna la tua risposta', intro: 'Scegli l’opzione che ti descrive meglio. Il nostro team la controlla mentre prepara la tua dichiarazione, e la decisione finale spetta all’ATO.', resident: 'Residente fiscale australiano', whm: 'Working Holiday Maker', pick: 'Scegli un’opzione per continuare.', save: 'Salva la mia risposta', saving: 'Salvataggio...', done: 'Grazie, la tua risposta è stata aggiornata.', doneBody: 'Non devi fare altro. Da qui ci pensa il nostro team.', used: 'Questo link è già stato usato.', usedBody: 'Se c’è ancora qualcosa da cambiare, scrivici su WhatsApp e ti aiutiamo.', err: 'Qualcosa è andato storto. Scrivici su WhatsApp e sistemiamo noi.' },
  pt: { title: 'Atualize sua resposta', intro: 'Escolha a opção que melhor descreve você. Nossa equipe confere isso ao preparar a sua declaração, e quem decide no fim é a ATO.', resident: 'Residente fiscal australiano', whm: 'Working Holiday Maker', pick: 'Escolha uma opção para continuar.', save: 'Salvar minha resposta', saving: 'Salvando...', done: 'Obrigado, sua resposta foi atualizada.', doneBody: 'Você não precisa fazer mais nada. Nossa equipe cuida do resto.', used: 'Este link já foi usado.', usedBody: 'Se ainda precisar mudar alguma coisa, chame a gente no WhatsApp que ajudamos.', err: 'Algo deu errado. Chame a gente no WhatsApp que resolvemos.' },
  zh: { title: '更新你的回答', intro: '请选择最符合你情况的一项。我们的团队在准备报税时会核对，最终由 ATO 决定。', resident: '澳洲税务居民', whm: '打工度假者（Working Holiday Maker）', pick: '请先选择一项再继续。', save: '保存我的回答', saving: '正在保存...', done: '谢谢，你的回答已更新。', doneBody: '你不需要再做其他事情，接下来交给我们的团队。', used: '这个链接已经用过了。', usedBody: '如果还有需要修改的地方，请在 WhatsApp 上告诉我们，我们来帮你。', err: '出了点问题。请在 WhatsApp 上告诉我们，我们来处理。' },
  vi: { title: 'Cập nhật câu trả lời', intro: 'Bạn vui lòng chọn mục đúng nhất với bạn. Đội ngũ bên mình sẽ kiểm tra khi chuẩn bị hồ sơ thuế, và ATO là bên quyết định cuối cùng.', resident: 'Người cư trú thuế Úc', whm: 'Working Holiday Maker', pick: 'Vui lòng chọn một mục để tiếp tục.', save: 'Lưu câu trả lời', saving: 'Đang lưu...', done: 'Cảm ơn bạn, câu trả lời đã được cập nhật.', doneBody: 'Bạn không cần làm gì thêm. Đội ngũ bên mình sẽ lo phần còn lại.', used: 'Đường link này đã được dùng rồi.', usedBody: 'Nếu vẫn cần sửa gì, bạn nhắn cho bên mình qua WhatsApp, bên mình sẽ hỗ trợ.', err: 'Đã có lỗi xảy ra. Bạn nhắn cho bên mình qua WhatsApp, bên mình sẽ xử lý.' },
}

type State = 'checking' | 'none' | 'ok' | 'used' | 'saving' | 'done'

export default function ResidencyFixPanel({ lang: routeLang = 'en' }: { lang?: L }) {
  const lang = useShownFormLang(routeLang)
  const c = RESIDENCY_FIX_COPY[lang] ?? RESIDENCY_FIX_COPY.en
  const [state, setState] = useState<State>('checking')
  const [token, setToken] = useState('')
  const [pick, setPick] = useState<'resident' | 'whm' | ''>('')
  const [error, setError] = useState('')

  useEffect(() => {
    const k = new URLSearchParams(window.location.search).get('k') ?? ''
    if (!k) { setState('none'); return }
    setToken(k)
    let alive = true
    fetch(`/api/tax-form/link?k=${encodeURIComponent(k)}`, { cache: 'no-store' })
      .then((r) => r.json())
      .then((j: { state?: string; purpose?: string }) => {
        if (!alive) return
        if (j.purpose !== 'fix') setState('none')
        else setState(j.state === 'ok' ? 'ok' : j.state === 'used' ? 'used' : 'none')
      })
      .catch(() => alive && setState('none'))
    return () => { alive = false }
  }, [])

  if (state === 'checking' || state === 'none') return null

  const submit = async () => {
    if (!pick) { setError(c.pick); return }
    setError('')
    setState('saving')
    try {
      const res = await fetch('/api/tax-form/fix', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ k: token, status: pick }),
      })
      const j = await res.json().catch(() => ({})) as { ok?: boolean; error?: string }
      if (res.ok && j.ok) { setState('done'); return }
      if (j.error === 'link_used') { setState('used'); return }
      setError(c.err)
      setState('ok')
    } catch {
      setError(c.err)
      setState('ok')
    }
  }

  // The step above shows a "session timed out" notice when there is no form in flight. On a
  // correction link that is confusing, so it is hidden here.
  const hideNotice = <style>{'.resstep-whmnote:has(a.resdecl-submit){display:none}'}</style>
  const box: React.CSSProperties = { maxWidth: 560, margin: '24px auto', width: 'calc(100% - 32px)', padding: '20px', border: '1px solid #d9dee5', borderRadius: 22, background: '#fff' }
  const opt = (active: boolean): React.CSSProperties => ({
    display: 'block', width: '100%', textAlign: 'left', padding: '14px 16px', marginTop: 10, borderRadius: 16,
    border: `2px solid ${active ? '#0f6e56' : '#d9dee5'}`, background: active ? '#eef8f4' : '#fff', cursor: 'pointer', fontSize: 16,
  })

  if (state === 'done') {
    return <><div style={box} role="status"><strong>{c.done}</strong><p style={{ marginTop: 8 }}>{c.doneBody}</p></div>{hideNotice}</>
  }
  if (state === 'used') {
    return <><div style={box} role="status"><strong>{c.used}</strong><p style={{ marginTop: 8 }}>{c.usedBody}</p></div>{hideNotice}</>
  }
  return (
    <>
    {hideNotice}
    <div style={box}>
      <strong>{c.title}</strong>
      <p style={{ marginTop: 8 }}>{c.intro}</p>
      <button type="button" style={opt(pick === 'resident')} onClick={() => { setPick('resident'); setError('') }} aria-pressed={pick === 'resident'}>{c.resident}</button>
      <button type="button" style={opt(pick === 'whm')} onClick={() => { setPick('whm'); setError('') }} aria-pressed={pick === 'whm'}>{c.whm}</button>
      {error && <p role="alert" style={{ color: '#b42318', marginTop: 10 }}>{error}</p>}
      <button type="button" onClick={submit} disabled={state === 'saving'}
        style={{ marginTop: 16, padding: '13px 24px', borderRadius: 16, border: 0, background: '#0f6e56', color: '#fff', fontSize: 16, cursor: 'pointer' }}>
        {state === 'saving' ? c.saving : c.save}
      </button>
    </div>
    </>
  )
}
