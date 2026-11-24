# r05 fr: French WHT, tax return and super (PVT audience: France, Belgium, Canada)

Code read: /home/claude/v68/base20 (read only). Data: S/gsc24/wht (3 months to 21 Nov), S/gsc24/bing, S/analysis/a08.
Web research 24 Nov 2026. The shared web search quota ran out before the last check (myID and foreign passports). That
point was then confirmed with WebFetch on myid.gov.au/set-up, which was already in the results. Nothing unverified is
used in the text below.

## 1. Findings

F1 (fact, GSC Pages.csv) French is small but now indexed: 57 /fr URLs have impressions. Flagship
/fr/tax-return-australie-pvt: 1 click, 23 impr., pos 8.09. /fr/superannuation: 15 impr., pos 7.0. /fr/tax-return: no row.
Biggest FR pages are guides: RSA 181 impr., how-to-find-lost-superannuation 56 (pos 9.8), tax-back 38 (pos 15.7),
tax-return-deadline 31 (1 click, pos 5.1), tax-return-without-tfn 16 (1 click, pos 4.6). Countries.csv: Canada 1,409 impr.
(pos 7.15), France 1,109 (pos 8.99), Belgium 232 (CTR 4.31%, the best), Switzerland 315. Inference: most Canadian
impressions are English pages, so the Canadian French share cannot be measured.

F2 (fact, Queries.csv) Almost every French query is anonymised. The visible ones are not about tax returns ("rsa australie",
"passer son rsa australie", "salaire minimum australie"). No myGov query appears in WHT or SVT GSC or in the Bing AI
queries. Inference: French demand for problem queries has to be judged from the SERPs, not from our own data.

F3 (fact, SERPs 24 Nov) Head terms belong to pvtistes.net and pvt.fr:
- "remboursement impots Australie PVT": pvt.fr (2 URLs), then 11 pvtistes.net URLs (dossier + forum), lepetitjournal.com.
  pvt.fr's page is an interview with Taxback.com plus a "Taxback vs eTax" comparison. It was updated 11 May 2025 and does
  not cover myGov, the Medicare levy or past years (WebFetch https://pvt.fr/pvt-australie/tax-back-remboursement-impots).
- "récupérer superannuation Australie PVT DASP": 13 of 15 results are pvtistes.net (tutorial + forum), then
  community.ato.gov.au and the ATO form. The pvtistes tutorial (updated 17 Dec 2025) has no myGov or access section
  (https://pvtistes.net/dossiers/tutoriel-superannuation-australie/).
- Inference: we will not take these head terms from a 3-week-old FR section with no French backlinks (see a08 F7). The
  flagship and /fr/superannuation already answer them well. The open ground is the problem queries.

F4 (fact, SERPs) French myGov problem queries return ONLY pvtistes forum threads, community.ato.gov.au and my.gov.au:
- "myGov code SMS ancien numéro australien PVT tax return": pvtistes thread 175077 (4 URLs), pvtistes 169806,
  community.ato.gov.au (3), my.gov.au "Use a code sent by SMS" (3).
- "myGov bloqué accès depuis la France Australie superannuation": pvtistes (8 URLs), community.ato.gov.au (6).
- "lier ATO myGov code de liaison TFN depuis l'étranger": community.ato.gov.au (12) and English ATO pages only.
- "compte myGov verrouillé trop de tentatives": no French answer at all (Canada Post, GoDaddy, my.gov.au English pages).
- The pvtistes thread 175077 (16 Oct 2026) states Jo's case word for word: "je n'arrive plus à accéder à mon compte myGov",
  "Le code de vérification est toujours envoyé sur mon ancien numéro australien". She lives in Spain, has a Belgian number,
  tried myID, and the ATO's international numbers did not work for her. One reply only, pointing to the ATO contact page:
  unresolved (WebFetch of
  https://pvtistes.net/forum/larrivee-et-la-vie-sur-place/175077-recuperer-l-acces-mygov-australie-depuis-l-etranger-sans-numero-local.html).
- Inference: no French page answers these problems properly. This is the same gap Jo saw in English, and it is wider here.

F5 (fact, code) What FR has today on myGov:
- No guide on any myGov problem. myGov comes up in passing in 03.ts (from-overseas guide: "Une carte SIM australienne
  morte ne reçoit pas les codes de vérification"), 12.ts line 119, 15.ts and 07.ts. None of these explains what to do.
- Money pages: flagship hero note "Pas de payslips, pas de compte myGov"; FAQ "Que ne faites-vous pas ?" ("nous ne vous
  demandons jamais votre mot de passe myGov"); /fr/tax-return FAQ "Ai-je besoin d'un compte myGov ?" (2 sentences);
  /fr/superannuation line 312 "La demande de DASP elle-même ne passe pas par myGov." The approved FR sentence "Vous
  n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons
  directement avec l'ATO." is already used on /fr, /fr/tfn, /fr/abn, /fr/medicare, /fr/contact, /fr/expenses and the calculator.

F6 (fact, code, a constraint for every new FR guide) src/lib/locale-blog.ts `hasGuide` needs BOTH a chunk entry AND an
English guide with the same slug in src/app/(site)/blog/data.ts. That English guide supplies the category and date. A
French chunk with no English twin is not listed and its URL returns a 404. So every new French guide below needs an English
guide with the same slug, which the EN report has to add (please align slugs with r01/r02). It also needs
src/lib/locale-guide-slugs.ts `fr` updated: new-locales-sitemap.test.ts fails and prints the list to paste.

F7 (fact, code) src/lib/will/i18n.ts NO_DASP_MSG.fr: "notre service de superannuation (DASP) n'est pas disponible pour le
moment". Will tells customers DASP is not offered. Inference: new super text must not promise that we file a DASP. CTAs in
this report sell the tax return and offer to answer super questions only.

F8 (fact, official sources, used in the proposed text)
- my.gov.au "Use a code sent by SMS" (updated 17 Dec 2025): to get SMS codes overseas you need the same registered number
  with international roaming. A new number must be updated in the account first, and you need access to the registered
  number to do that. If you no longer have it, you can sign in with Digital ID or create a new myGov account. The helpdesk
  can release your email address so you can reuse it.
  https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms
- my.gov.au sign-in help (updated 19 Nov 2026): an account locks after too many wrong attempts and myGov emails your unique
  username. Unlock: sign in with username and current password, "Unlock your account now", security code, secret question,
  new password. Digital ID, passkey and the myGov app do not work while the account is locked. The username is 2 letters and
  6 numbers ("Forgot username" sends it to your email). No SMS code: try Digital ID, a passkey or the myGov app. If the
  account is locked and cannot be unlocked: create a new account and relink your services, and contact the helpdesk to
  reuse your email. The myGov Code Generator app retires on 28 February 2027.
  https://my.gov.au/content/mygov/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help
- my.gov.au contact (updated 2 Jul 2026): from outside Australia +61 1300 169 468, option 1. Mon to Fri 7 am to 10 pm,
  Sat and Sun 10 am to 5 pm, Australian local time. https://my.gov.au/en/about/help/contact
- ATO contact (updated 8 Oct 2026): from overseas +61 2 6216 1111, 8 am to 5 pm AEDT, Monday to Friday.
  https://www.ato.gov.au/about-ato/contact-us
- ATO "Information you need to link myGov to the ATO" (updated 29 Jun 2026): the questions are based on what the ATO holds
  and may include: an account that received an ATO refund or earned interest in the last 2 years, an active super account,
  a notice of assessment from the last 5 years, a PAYG payment summary from the last 2 years, the travel document used for a
  TFN application in the last 4 years (temporary visitors), the TFN application lodgment receipt number, an ATO refund
  amount from the last 2 years, the most recent payslip. "Skipping all questions will count as a failed attempt."
  https://www.ato.gov.au/myGov_linkinginfo
- ATO "Create a myGov account and link it to the ATO" (updated 21 Jul 2026): use myID, a passkey or an authenticator if
  you are overseas, because an SMS code needs an Australian mobile number. Linking with Digital ID needs the same identity
  strength you achieved before. Some error codes (LCK.001 to LCK.005, IDD.003, ICI.001, OVK.002) mean you must contact
  the ATO. "To recover your myGov account, download the myID app and set it up to a Strong identity strength." Fetched as
  https://www.ato.gov.au/print/section/30b26b63-686e-4336-846d-e7a1896d7e60 (canonical per its own links:
  https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato).
- myID "Set up" (updated 9 Nov 2026): Standard strength = any two of: Australian passport, driver licence or learner
  permit, birth certificate, "visa (using your foreign passport)", ImmiCard, citizenship certificate, Medicare card
  (offered only after one of the others is verified). https://www.myid.gov.au/set-up
- ATO DASP online help (updated 11 Oct 2024): you sign in with your personal details and a secret you create the first
  time. The page does not mention myGov. Needed: personal details, email, passport country and number, fund details
  incl. ABN. TFN is optional but lets the system find your accounts. If the visa information screen is wrong, do not submit
  online: email DASPmail@ato.gov.au. Service standard 28 days.
  https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system
- ATO WHM page (updated 3 Jun 2026): no tax return and no non-lodgment advice if all income was WHM salary or wages and
  taxable income was below $45,001 (2020-21 onward; $37,001 for 2019-20 and earlier). https://ato.gov.au/whm
- Three ways to lodge a prior year (myTax, registered tax agent, paper): already cited in FR 15.ts line 425,
  https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-prior-year-tax-return

F9 (fact, code, small error) FR 15.ts line 443 (past-years guide): "si vous n'avez pas à déposer, vous devez en général
quand même déposer une non-lodgment advice". For a PVT on WHM wages under $45,001 the ATO asks for neither (F8). The
flagship gets this right; the guide reads as the opposite.

## 2. Proposals

Typography for all text below: chunk bodies use straight apostrophes (as in 01 to 18.ts). Page files use ’ (as in the
page.tsx files). Non-breaking space before ? ! : stays as the existing files do it. No dashes.

### P1-1 New guide: tax return without myGov (hub of the problem cluster)
File: new entry in src/app/(fr)/fr/blog/chunks/19.ts (empty today). EN twin with the same slug, category "Tax Return"
(F6). Slug: `tax-return-without-mygov` (checked: no EN or FR slug contains "mygov").
Title: Faire sa tax return australienne sans myGov (43)
Description: Plus d'accès à myGov, code SMS sur un ancien numéro, ATO impossible à lier ? Votre tax return peut quand même être déposée, y compris depuis la France. (151)
Body:
```
Oui, une tax return australienne peut être déposée sans que vous vous connectiez à myGov. myGov ne sert qu'à déposer vous-même sur myTax : l'ATO accepte aussi une déclaration déposée par un agent fiscal enregistré, ou sur papier. Si votre accès myGov est cassé depuis votre retour, votre déclaration ne l'est pas.

## Pourquoi myGov bloque-t-il autant de PVT une fois rentrés ?

Parce que la connexion suppose souvent un numéro australien. L'ATO le dit elle-même : le code par SMS demande un numéro de mobile australien, et si vous êtes à l'étranger elle recommande plutôt myID, une passkey ou une application d'authentification ([page de l'ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato)). Une SIM prépayée qui a expiré après votre départ suffit donc à vous fermer la porte.

Trois blocages reviennent presque toujours : le code SMS qui part sur l'ancien numéro, le compte verrouillé après trop d'essais, et l'ATO qu'on n'arrive pas à relier à un nouveau compte. Chacun a son guide plus bas.

## Quelles sont les façons de déposer sans votre propre compte ?

L'ATO en cite trois pour une année passée : en ligne avec myTax, par un agent fiscal enregistré, ou avec une déclaration papier ([page de l'ATO](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return/lodge-a-prior-year-tax-return)). Seule la première passe par votre myGov. Un agent fiscal enregistré accède à votre dossier par son propre canal et n'a jamais besoin de vos identifiants : quelqu'un qui vous demande votre mot de passe myGov n'agit pas en tant qu'agent.

## De quoi avez-vous besoin, alors ?

De beaucoup moins que pour réparer myGov. Avec nous, trois choses suffisent : votre passeport et votre visa, un compte bancaire australien pour un éventuel remboursement, et à peu près où et quand vous avez travaillé. Pas de payslips : vos employeurs ont déjà transmis vos revenus à l'ATO.

Le compte bancaire est le seul point qui ne se contourne pas. L'ATO ne verse un remboursement d'impôt que sur un compte australien : si le vôtre est fermé, dites-le dès votre premier message.

## Et votre super, sans myGov ?

La demande de DASP en ligne de l'ATO ne passe pas par myGov. Vous vous identifiez avec vos données personnelles, votre passeport et un code secret que vous créez à la première connexion, et votre TFN est facultatif ([aide de l'ATO sur le DASP en ligne](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system)). La super est une demande séparée de la tax return : [comment récupérer sa super](/superannuation).

## Faut-il quand même réparer son accès myGov ?

Ce n'est pas nécessaire pour la tax return. C'est utile si vous voulez consulter vous-même votre dossier ATO ou recevoir les messages de l'ATO dans votre boîte myGov. Selon votre blocage :

- [Le code SMS part sur votre ancien numéro australien](/blog/mygov-sms-code-old-australian-number)
- [Votre compte myGov est verrouillé](/blog/mygov-account-locked)
- [L'ATO refuse de se lier à votre compte myGov](/blog/cant-link-ato-to-mygov)
- [myID n'accepte pas votre passeport étranger](/blog/myid-foreign-passport)

## Et si vous n'aviez jamais déposé une année ?

Elle peut encore l'être. Une année jamais déposée n'expire pas, et chaque année est une déclaration à part : voir [les tax returns des années passées](/blog/past-years-tax-returns-working-holiday) et [déposer depuis l'étranger](/blog/how-to-lodge-tax-return-from-overseas).

Vous n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons directement avec l'ATO, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO. Tout est expliqué sur la page [tax return Australie en PVT](/fr/tax-return-australie-pvt), et vous pouvez nous écrire sur WhatsApp avec les villes où vous avez travaillé.
```
Internal links in: flagship and /fr/tax-return (P1-3), guides B to E, how-to-lodge-tax-return-from-overseas (03.ts, append to
its "Qu'est-ce qui devient réellement plus difficile" section: "Si c'est myGov qui bloque, [une tax return peut être
déposée sans myGov](/blog/tax-return-without-mygov)."), past-years (15.ts, after the line 427 paragraph).

### P1-2 New guide: SMS code on the old Australian number (the pvtistes 175077 case)
Slug `mygov-sms-code-old-australian-number`, category "Tax Return", EN twin needed. File: chunks/19.ts.
Title: myGov : le code SMS part sur votre ancien numéro (48)
Description: Le code myGov arrive sur une SIM australienne que vous n'avez plus ? Ce que prévoit myGov depuis l'étranger, qui appeler, et comment déposer votre tax return. (158)
Body:
```
Si le code de vérification myGov part sur un numéro australien que vous n'avez plus, vous ne pouvez pas changer ce numéro depuis votre compte : myGov demande d'avoir accès à l'ancien numéro pour le modifier. Il reste deux voies officielles, vous connecter avec une identité numérique (Digital ID) ou créer un nouveau compte myGov. Et pour votre tax return, vous n'avez besoin ni de l'une ni de l'autre.

## Pourquoi le code n'arrive-t-il plus ?

Parce que myGov envoie le code au numéro enregistré dans votre compte, et à lui seul. Selon myGov, pour recevoir un code par SMS à l'étranger, il faut ce même numéro, l'itinérance internationale activée et un réseau compatible avec votre opérateur ([myGov, code par SMS](https://my.gov.au/en/about/help/mygov-website/sign-in-to-mygov/use-a-code-sent-by-sms)). Une SIM prépayée australienne désactivée après votre départ ne recevra plus rien, et un nouveau numéro français, belge ou canadien n'est pas reconnu tant qu'il n'a pas été ajouté au compte.

## Peut-on changer le numéro depuis l'étranger ?

Seulement si vous pouvez encore vous connecter. Le changement se fait dans Account settings, puis Contact details, et myGov précise qu'il faut avoir accès au numéro enregistré pour recevoir le code et mettre le compte à jour. Sans cet accès, myGov propose de vous connecter avec Digital ID, ou de créer un nouveau compte myGov. Le service d'assistance de myGov peut libérer votre adresse e-mail si vous voulez la réutiliser pour ce nouveau compte.

## Quelles autres façons de se connecter existent ?

myGov cite Digital ID (myID), une passkey et l'application myGov quand le code SMS ne vient pas ([aide à la connexion myGov](https://my.gov.au/content/mygov/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help)). L'ATO conseille aussi myID, une passkey ou une application d'authentification à toute personne qui se trouve à l'étranger. Ces méthodes s'activent depuis un compte ouvert : mieux vaut les mettre en place avant de quitter l'Australie. L'application myGov Code Generator, elle, s'arrête le 28 février 2027.

## Et si vous créez un nouveau compte myGov ?

Il faudra y relier l'ATO de nouveau, et l'ATO vous posera des questions sur ce qu'elle sait de vous. Ce qui bloque à ce stade est détaillé dans [impossible de lier l'ATO à myGov](/blog/cant-link-ato-to-mygov).

## Qui appeler depuis la France, la Belgique ou le Canada ?

- L'assistance myGov : +61 1300 169 468, puis l'option 1, du lundi au vendredi de 7 h à 22 h et le week-end de 10 h à 17 h, heure australienne ([contacts myGov](https://my.gov.au/en/about/help/contact))
- L'ATO : +61 2 6216 1111, du lundi au vendredi de 8 h à 17 h, heure de Canberra, une ligne prévue pour les personnes à l'aise en anglais ([contacts de l'ATO](https://www.ato.gov.au/about-ato/contact-us))

Avec le décalage horaire, ces heures tombent souvent la nuit en Europe. Préparez votre TFN, votre nom tel qu'il figure sur le passeport et votre date de naissance avant d'appeler.

## Faut-il tout réparer pour faire sa tax return ?

Non. myGov ne sert qu'à déposer vous-même sur myTax. Votre tax return peut être déposée sans votre compte : voir [faire sa tax return sans myGov](/blog/tax-return-without-mygov). Et personne de sérieux ne vous demandera votre mot de passe myGov pour le faire.

Vous n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons directement avec l'ATO, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO. Écrivez-nous sur WhatsApp, ou lisez d'abord [la tax return Australie en PVT](/fr/tax-return-australie-pvt).
```
Note: "heure de Canberra" stands for the ATO's "AEDT". Writing "AEDT" would be wrong half of the year. To keep it neutral,
write "heure de l'Est australien" if Jo prefers.

### P1-3 Money pages: say "no myGov needed" where the problem visitor lands
a) /fr/tax-return-australie-pvt/page.tsx: new Section after "how-it-works" (line 492), before "late-title":
```tsx
<Section eyebrow="myGov" title="Plus d’accès à myGov ? Vous n’en avez pas besoin" titleId="mygov-title">
  <p className={blocks.text}>
    Code SMS envoyé sur un ancien numéro australien, compte verrouillé, ATO impossible à relier : c’est le blocage le plus courant une fois rentré, et il n’empêche pas votre tax return. myGov ne sert qu’à déposer vous-même sur myTax. Vous n’aurez jamais à vous connecter à myGov, à lier une pièce d’identité ou à deviner quel formulaire remplir. Nous traitons directement avec l’ATO.
  </p>
  <LinkRows items={MYGOV_GUIDES} />
</Section>
```
with `const MYGOV_GUIDES = [{...frGuide('tax-return-without-mygov', 'Faire sa tax return sans myGov'), desc: 'Les trois façons de déposer, et ce qu’il vous faut vraiment.'}, {...frGuide('mygov-sms-code-old-australian-number', 'Le code SMS part sur votre ancien numéro'), desc: 'Ce que prévoit myGov, et qui appeler depuis l’étranger.'}, {...frGuide('cant-link-ato-to-mygov', 'Impossible de lier l’ATO à myGov'), desc: 'Les questions de l’ATO, et que faire après un échec.'}]`
(frGuide falls back to the EN guide with "(en anglais)" until the FR chunk is live, so it never 404s.)
Two new FAQ items (after "Puis-je faire ma tax return depuis la France", line 181). FAQPage schema follows automatically:
- Q « Je ne reçois plus le code SMS de myGov, je peux quand même faire ma tax return ? » A « Oui. Le code part sur le
  numéro australien enregistré dans votre compte, et myGov ne permet de le changer que si vous avez encore accès à ce
  numéro. Pour votre tax return, ce n’est pas bloquant : myGov ne sert qu’à déposer vous-même sur myTax.\n\nAvec nous,
  vous n’avez pas à vous connecter à myGov. Nous traitons directement avec l’ATO, et la déclaration est vérifiée et validée
  par un agent fiscal enregistré avant d’être déposée auprès de l’ATO. » (source F8 my.gov.au SMS)
- Q « L’ATO refuse de se lier à mon compte myGov, que faire ? » A « Pour relier l’ATO, il faut répondre à des questions
  sur ce que l’ATO sait de vous, par exemple un payslip récent ou le numéro de reçu de votre demande de TFN, et passer
  toutes les questions compte comme un échec. Certains codes d’erreur obligent à contacter l’ATO.\n\nCe lien n’est pas
  nécessaire pour votre tax return avec nous : vous remplissez un questionnaire, vous signez, et nous traitons directement
  avec l’ATO. » (source F8 ATO linking pages)
Bump webPageLd dateModified and the "Mis à jour le" line only if Jo's freeze allows it (they are not titles; I would bump).
Title and description stay frozen.

b) /fr/tax-return/page.tsx FAQ "Ai-je besoin d’un compte myGov ?" (line 227): add a second paragraph: « \n\nSi le code
SMS part sur un ancien numéro australien, si votre compte est verrouillé ou si l’ATO refuse de se lier à votre compte, cela
ne bloque pas votre déclaration : nous traitons directement avec l’ATO. » Add frGuide('tax-return-without-mygov', 'Faire sa
tax return sans myGov') to GUIDES after the myTax guide.

c) /fr/superannuation/page.tsx new FAQ (after "Faut-il son tax file number", line 130):
Q « Je n’ai plus accès à myGov : puis-je quand même réclamer ma super ? »
A « Oui. La demande de DASP en ligne de l’ATO ne passe pas par myGov : vous vous identifiez avec vos données personnelles,
votre passeport et un code secret créé à la première connexion, puis vous ajoutez chaque fund avec son ABN. Votre TFN est
facultatif, mais il permet au système de retrouver vos comptes.\n\nSi l’écran sur votre visa est faux, ne déposez pas en
ligne : l’ATO demande d’écrire à DASPmail@ato.gov.au. » (source F8 DASP help). No service promise (F7).

### P2-4 New guide: can't link the ATO to myGov
Slug `cant-link-ato-to-mygov`, category "Tax Return", EN twin needed.
Title: Impossible de lier l'ATO à myGov : que faire ? (46)
Description: Les questions de l'ATO pour lier myGov, celles auxquelles un PVT peut répondre, que faire après un échec, et pourquoi votre tax return n'en dépend pas. (151)
Body:
```
Pour relier l'ATO à votre compte myGov, vous devez répondre à des questions sur des informations que l'ATO détient déjà sur vous. Un PVT rentré chez lui n'a souvent plus aucun de ces papiers sous la main, d'où l'échec. Ce lien n'est utile que pour déposer vous-même : votre tax return peut être déposée sans lui.

## Que vous demande l'ATO pour relier votre compte ?

Des informations tirées de votre propre dossier. Selon l'ATO, les questions peuvent porter sur ([informations demandées par l'ATO](https://www.ato.gov.au/myGov_linkinginfo)) :

- un compte bancaire qui a reçu un remboursement de l'ATO ou produit des intérêts au cours des deux dernières années
- un compte de super actif
- un avis d'imposition (notice of assessment) des cinq dernières années
- un PAYG payment summary des deux dernières années
- le document de voyage utilisé pour une demande de TFN au cours des quatre dernières années, si vous l'avez demandé comme visiteur temporaire
- le numéro de reçu de votre demande de TFN
- le montant d'un remboursement de l'ATO des deux dernières années
- votre dernier payslip

Vous n'avez pas à répondre à toutes. Mais passer toutes les questions compte comme une tentative ratée.

## Auxquelles un PVT peut-il répondre ?

Le plus souvent à celles qui portent sur son passeport et son dernier emploi. Le passeport utilisé pour la demande de TFN, si elle date de moins de quatre ans, et le dernier payslip de votre dernier employeur sont les éléments que beaucoup ont encore, dans une boîte mail ou une application de paie. Le compte de super actif est une autre piste : son relevé se trouve en général dans l'espace en ligne du fund.

## Et avec myID ?

L'ATO indique que pour relier l'ATO avec une identité numérique, il faut vous connecter avec la même force d'identité que celle déjà obtenue ([page de l'ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato)). Avec un passeport étranger, atteindre cette force pose ses propres problèmes : voir [myID avec un passeport étranger](/blog/myid-foreign-passport).

## Que faire après un échec ?

Selon l'ATO, si vous ne pouvez pas confirmer votre identité en ligne, elle vous indique la suite. Certains codes d'erreur (LCK.001 à LCK.005, IDD.003, ICI.001, OVK.002) signifient qu'il faut la contacter : +61 2 6216 1111 depuis l'étranger, du lundi au vendredi de 8 h à 17 h, heure de Canberra ([contacts de l'ATO](https://www.ato.gov.au/about-ato/contact-us)).

## Votre tax return attend-elle ce lien ?

Non. Le lien sert à déposer vous-même sur myTax et à consulter votre dossier. Une tax return peut aussi être déposée par un agent fiscal enregistré ou sur papier : voir [faire sa tax return sans myGov](/blog/tax-return-without-mygov).

Vous n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons directement avec l'ATO, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO. Écrivez-nous sur WhatsApp, ou voyez [la tax return Australie en PVT](/fr/tax-return-australie-pvt).
```
Hyphen check: "LCK.001 à LCK.005" (no dash). The ATO page lists LCK.001, LCK.002, LCK.003, LCK.004 and LCK.005.

### P2-5 New guide: locked myGov account
Slug `mygov-account-locked`, category "Tax Return", EN twin needed.
Title: Compte myGov verrouillé : que faire depuis l'étranger (53)
Description: Compte myGov verrouillé, identifiant ou mot de passe oublié après un PVT : les étapes officielles, le nouveau compte, et la tax return sans myGov. (146)
Body:
```
Un compte myGov se verrouille après trop de tentatives de connexion ratées. myGov vous envoie alors par e-mail votre identifiant unique, et vous pouvez le déverrouiller vous-même si vous connaissez encore votre mot de passe et votre question secrète. Sinon, myGov prévoit de créer un nouveau compte. Votre tax return, elle, n'a pas besoin de ce compte.

## Comment déverrouiller son compte ?

Selon myGov ([aide à la connexion myGov](https://my.gov.au/content/mygov/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help)) : connectez-vous avec votre identifiant et votre mot de passe actuel, choisissez « Unlock your account now », saisissez le code de sécurité, répondez à votre question secrète, puis choisissez un nouveau mot de passe. Tant que le compte est verrouillé, Digital ID, les passkeys et l'application myGov ne fonctionnent pas.

Le code de sécurité est envoyé par SMS ou par e-mail. Si c'est l'ancien numéro australien qui bloque, voir [le code SMS part sur votre ancien numéro](/blog/mygov-sms-code-old-australian-number).

## Identifiant ou mot de passe oublié ?

L'identifiant myGov est composé de deux lettres et six chiffres. « Forgot username » le renvoie à l'adresse e-mail enregistrée. « Forgot password » envoie un code pour choisir un nouveau mot de passe. Si vous ne savez plus répondre à vos questions secrètes, myGov propose de vous connecter avec Digital ID, une passkey ou l'application myGov.

## Et si rien ne marche ?

myGov prévoit alors de créer un nouveau compte et d'y relier de nouveau vos services. Pour réutiliser votre ancienne adresse e-mail, contactez l'assistance myGov, depuis l'étranger au +61 1300 169 468, option 1 ([contacts myGov](https://my.gov.au/en/about/help/contact)). Relier l'ATO au nouveau compte demande ensuite de répondre à des questions sur votre dossier : voir [impossible de lier l'ATO à myGov](/blog/cant-link-ato-to-mygov).

## Un message vous propose de débloquer votre compte ?

Méfiez-vous. Aucun interlocuteur sérieux ne vous demande votre mot de passe myGov, ni de cliquer sur un lien reçu par SMS pour « débloquer » un compte. Notre guide sur [la sécurité de votre TFN](/blog/tfn-security-protect-from-fraud) liste les arnaques les plus courantes.

## Votre tax return peut-elle attendre que tout soit réglé ?

Elle n'a pas à attendre. myGov ne sert qu'à déposer vous-même : voir [faire sa tax return sans myGov](/blog/tax-return-without-mygov).

Vous n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons directement avec l'ATO, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO. Écrivez-nous sur WhatsApp, ou voyez [la tax return Australie en PVT](/fr/tax-return-australie-pvt).
```
The sentence on SMS scam links paraphrases the existing FR 09.ts line 446 (ATO wording). The tfn-security guide exists in FR.

### P2-6 New guide: myID with a foreign passport
Slug `myid-foreign-passport`, category "Tax Return", EN twin needed.
Title: myID avec un passeport étranger : ce qui bloque (47)
Description: myID exige deux documents pour une identité Standard, et le visa sur passeport étranger n'en compte qu'un. Ce que cela change pour myGov et votre tax return. (157)
Body:
```
myID accepte votre visa australien, vérifié avec votre passeport étranger, mais pour une identité Standard il faut deux documents de sa liste. Le visa n'en fait qu'un. Sans second document australien, comme un permis de conduire, beaucoup de PVT restent bloqués à ce stade, et ce n'est pas un obstacle pour votre tax return.

## Quels documents myID accepte-t-il ?

Pour une identité Standard, myID demande deux documents parmi ([myID, Set up](https://www.myid.gov.au/set-up)) : un passeport australien, un permis de conduire ou learner permit, un acte de naissance, un visa (avec votre passeport étranger), une ImmiCard, un certificat de citoyenneté, ou une carte Medicare. La carte Medicare n'est proposée qu'après la vérification d'un des autres documents.

## Pourquoi un PVT est-il souvent bloqué ?

Parce que, sur cette liste, il n'a souvent que son visa. Un permis de conduire australien ou une carte Medicare peut servir de second document : la carte Medicare ne concerne que les nationalités qui y ont droit, ce qui n'est en général pas le cas des Français (voir [les pays ayant un accord Medicare](/blog/countries-with-medicare-agreement-australia)).

## Qu'est-ce que myID débloque ?

La connexion à myGov sans code SMS, ce que l'ATO recommande à l'étranger, et le lien avec l'ATO. L'ATO précise que ce lien demande la même force d'identité que celle déjà obtenue, et que pour récupérer un compte myGov avec myID il faut une identité Strong ([page de l'ATO](https://www.ato.gov.au/online-services/online-services-for-individuals-and-sole-traders/ato-online-services-and-mygov/create-a-mygov-account-and-link-it-to-the-ato)).

## Quelles autres solutions reste-t-il ?

Relier l'ATO en répondant à ses questions sur votre dossier ([impossible de lier l'ATO à myGov](/blog/cant-link-ato-to-mygov)), ou ne pas passer par myGov du tout pour votre déclaration ([faire sa tax return sans myGov](/blog/tax-return-without-mygov)). La super se réclame elle aussi sans myGov : [récupérer sa super](/superannuation).

Vous n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons directement avec l'ATO, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO. Écrivez-nous sur WhatsApp, ou voyez [la tax return Australie en PVT](/fr/tax-return-australie-pvt).
```
Caution: "beaucoup de PVT restent bloqués" and "il n'a souvent que son visa" are inferences from the myID list, not ATO
statements. They are worded as "souvent". The claim that French nationals are generally not entitled to Medicare matches
the existing FR pages and the frozen Medicare guide.

### P2-7 Off-site: answer the open pvtistes thread (Jo, by hand)
Thread 175077 is unresolved and ranks for the exact query (F4). If Jo or the team has a pvtistes account, a disclosed,
non-commercial reply should give the official facts only (P1-2 sections 2 to 5: myGov numbers, Digital ID or new account,
email release). Add a link only if the forum's rules allow it. Do not write it for her or post as anyone else. Expected
effect: a brand mention on the domain that owns French PVT SERPs and gets cited by AI answers.

### P3-8 Fix the WHM exception in the past-years guide (F9)
File src/app/(fr)/fr/blog/chunks/15.ts line 443. After "...déposer une non-lodgment advice.", insert:
"Il y a une exception pour les PVT : si tous vos revenus de l'année étaient des salaires de working holiday maker et que votre revenu imposable était inférieur à 45 001 $ (37 001 $ pour 2019-20 et avant), l'ATO ne demande ni tax return ni non-lodgment advice ([page de l'ATO pour les working holiday makers](https://ato.gov.au/whm))."
Check the EN, IT and ES twins of the same guide for the same sentence (likely translated from one source).

### P3-9 DASP visa screen in the rejected-DASP guide
File chunks/13.ts, `dasp-rejected-what-to-do` (line 283): in the cause about the visa record, add: "Si l'écran
d'informations sur le visa de la demande en ligne est faux, ne la déposez pas : l'ATO demande d'écrire à DASPmail@ato.gov.au
([aide de l'ATO sur le DASP en ligne](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system))."
Read the section first. If it already says the same, skip this (grep found no "DASPmail" in FR).

### P3-10 Link the cluster from where French impressions already are
- how-to-find-lost-superannuation (05.ts, 56 impr.): one sentence under the myGov "Fund details" mention (04.ts line 409
  has it too): "Plus d'accès à myGov ? La demande de DASP en ligne n'en a pas besoin : [faire sa tax return et récupérer sa
  super sans myGov](/blog/tax-return-without-mygov)."
- tfn-security (12.ts line 119, about a dead Australian SIM): append "[Que faire si le code SMS part sur votre ancien
  numéro](/blog/mygov-sms-code-old-australian-number)."
- Super category FAQ (blog/data.ts, ALL_CATEGORY_META 'super'): no change (category titles and descriptions are frozen).

## Implementation checklist (for whoever builds it)
1. EN twins first (same slugs, category "Tax Return", date of the build), then FR chunks in 19.ts.
2. src/lib/locale-guide-slugs.ts `fr`: paste the list the sitemap test prints. public/sitemap-llms.xml and llms files:
   regenerate or hand-add the new /fr URLs as the impl-tech log did.
3. Body links use the English path (/blog/..., /superannuation). localizeBodyLinks rewrites them to /fr only when the FR
   page exists; /fr/tax-return-australie-pvt is written in full because it is French only.
4. Run the brief's test set, plus a dash grep and a grep for "nous déposons|agent fiscal enregistré, nous|lodge".
5. After deploy: request indexing for the 5 new FR URLs and the flagship. Run IndexNow.
6. Measure (December): impressions on /fr/blog/*mygov* and the flagship, and the FR queries containing "mygov". The
   baseline is 0 (F2).

## 3. What not to do
- Do not publish a French guide without its English twin (F6): it would not be listed and would return a 404. Do not write a
  FR-only route to get around this. That is a code change against ADR 013.
- Do not change the titles or descriptions of the flagship, /fr/tax-return or /fr/superannuation (frozen to 7 Dec), or the
  /fr/superannuation H1. Do not touch the opening of the frozen Medicare and countries guides that P2-6 links to.
- Do not write a new guide on "remboursement impôts Australie PVT" or "récupérer sa super": the flagship, /fr/tax-return,
  /fr/superannuation, tax-back-australia-working-holiday and how-to-find-lost-superannuation already cover them, so it
  would split rankings between our own pages. A guide on DASP without myGov is also left out on purpose: /fr/superannuation
  line 312 and the new FAQ (P1-3c) cover it.
- Do not promise a DASP service or say "nous nous occupons de votre DASP" (F7). The new text offers the tax return and
  explains the DASP.
- Do not write "nous déposons" or call us agent fiscal / expert-comptable. Use only "vérifiée et validée par un agent fiscal
  enregistré avant d'être déposée auprès de l'ATO" and "Nous traitons directement avec l'ATO". "Un agent fiscal enregistré
  peut déposer" stays as a description of the ATO's three ways, never next to "nous" in the same clause.
- Do not give the phone hours in French or Belgian time (daylight saving changes on both sides), do not promise the helpdesk
  answers, and do not say myID "ne marche pas" with a foreign passport. The official list accepts the visa as one document.
- Do not add myGov troubleshooting to Will (language-rules fr section 6 forbids DIY and login walkthroughs). Will keeps
  MYGOV_REASSURANCE only.
- Do not name pvtistes, pvt.fr or Taxback on our pages, and do not post on forums under any name but Jo's own, disclosed.
- No prices in the new guides (fees stay only where they already are), no refund amounts, no dashes, vous throughout.
