// 24 Nov 2026 (plan 3, round 2): Payday Super. Chaque fait vient d'une page officielle (ato.gov.au,
// fairwork.gov.au), relue le 24 novembre 2026 ; sources et URL dans S/plan3/build2-R5.md.
export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'payday-super-working-holiday': {
    title: "Payday Super en PVT : vérifier que votre super arrive",
    description: "Depuis le 1er juillet 2026, la super doit arriver sur votre fund dans les 7 jours ouvrables après chaque paie. Comment le vérifier avant de partir.",
    body: `
Depuis le 1er juillet 2026, votre employeur doit verser votre super à chaque paie, et l'ATO exige qu'elle soit reçue par votre super fund dans les 7 jours ouvrables qui suivent le jour où vous êtes payé. Le taux reste de 12 %, calculé désormais sur ce que l'ATO appelle vos qualifying earnings. En PVT, un versement manquant se voit donc en quelques jours au lieu de plusieurs mois, pendant que vous êtes encore dans le job et encore en Australie.

## Qu'est-ce qui a changé le 1er juillet 2026 ?

Trois choses, toutes côté employeur :

- **Le rythme.** Avant, la super était versée chaque trimestre. Pour les paies versées depuis le 1er juillet 2026, chaque cotisation doit arriver sur votre fund dans les 7 jours ouvrables après la paie.
- **La base de calcul.** La super guarantee correspond à 12 % de vos qualifying earnings. Ce terme regroupe vos ordinary time earnings (le salaire des heures normales), les commissions, le salary sacrifice et d'autres montants qui comptaient déjà comme salaire pour la super.
- **La sanction.** Un employeur en retard doit la super guarantee charge, que l'ATO calcule désormais elle-même, avec des intérêts composés chaque jour et une majoration administrative.

Le détail est sur la page de l'ATO [About Payday Super](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/about-payday-super) (en anglais, mise à jour le 10 août 2026). Les paies versées jusqu'au 30 juin 2026 suivent encore l'ancien système trimestriel : une cotisation pour du travail de mai ou juin 2026 a pu arriver plus tard sans être en retard.

## Y a-t-il des exceptions aux 7 jours ouvrables ?

Oui, et deux comptent beaucoup en PVT, où l'on change souvent d'employeur. La première cotisation d'un nouveau salarié doit arriver dans les 20 jours ouvrables qui suivent la paie, au lieu de 7. C'est pareil pour la première cotisation après une réembauche chez le même employeur.

Une paie hors du cycle normal, comme une prime ou un rappel de salaire, suit une autre règle : sa super est due dans les 7 jours ouvrables après la paie régulière suivante. Une fois l'argent reçu, le fund a 3 jours ouvrables pour l'affecter à votre compte ou le renvoyer. Tous les cas sont listés par l'ATO dans [les délais de paiement de Payday Super](https://www.ato.gov.au/businesses-and-organisations/super-for-employers/payday-super/paying-super-on-payday/payment-deadlines-for-payday-super) (en anglais, mise à jour le 29 septembre 2026).

## Comment vérifier que votre employeur a bien payé ?

En comparant votre fiche de paie avec ce que votre fund a reçu :

1. Regardez votre payslip. Selon le Fair Work Ombudsman, elle doit indiquer les cotisations de super de la période et le fund qui les reçoit, et vous être remise dans le jour ouvrable qui suit la paie.
2. Une fois les 7 jours ouvrables passés, connectez-vous au site ou à l'application de votre fund et cherchez la cotisation. La payslip seule ne prouve rien : seul le fund montre que l'argent est arrivé.
3. Si vous avez eu plusieurs jobs, vérifiez chaque fund. Les services en ligne de l'ATO affichent aussi les cotisations que votre employeur a versées et déclarées.
4. Gardez vos payslips et une capture de chaque cotisation jusqu'à ce que votre super vous ait été versée.

La connexion au fund pas à pas est dans [vérifier son solde de super en PVT](/blog/how-to-check-super-balance-working-holiday), et le calcul pour chaque paie dans [combien de super votre employeur doit verser](/blog/how-much-super-should-employer-pay).

## Et si une cotisation manque ?

Laissez d'abord passer le délai normal, puis procédez dans cet ordre :

1. Demandez à votre employeur, par écrit, quand il a payé, sur quel fund et quel montant. Ce sont les trois questions que l'ATO conseille de poser, y compris à un ancien employeur.
2. Demandez à votre fund si un versement est arrivé sans pouvoir être rattaché à votre compte. Une cotisation doit être accompagnée des informations qui permettent de l'affecter, sinon elle peut être renvoyée.
3. S'il manque toujours de l'argent, signalez-le à l'ATO avec son outil en ligne de signalement de super impayée. L'ATO vous dit par courrier ou par e-mail si elle a pu récupérer la somme, puis verse la super et les intérêts sur votre compte. Cela peut prendre du temps, et tous les signalements n'aboutissent pas ([super impayée par votre employeur](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/growing-and-keeping-track-of-your-super/unpaid-super-from-your-employer), en anglais, mise à jour le 4 juin 2026).

Ce qu'il faut rassembler, et comment ça se passe une fois rentré, est dans [employeur qui ne verse pas la super](/blog/super-employer-not-paying-what-to-do).

## Pourquoi c'est encore plus important quand vous partez ?

Parce que l'ATO vous demande de vérifier avec votre employeur que toute la super due a été versée avant de déposer votre demande de DASP. Vous pouvez commencer et enregistrer la demande en ligne avant de prendre l'avion, mais vous ne pouvez l'envoyer qu'une fois l'Australie quittée et votre visa terminé.

Profitez de cet intervalle. Pour votre dernière paie, comptez 7 jours ouvrables, ou 20 si c'était votre première paie chez ce nouvel employeur, puis vérifiez sur le fund que la cotisation est bien là avant d'envoyer. L'ordre complet, tax return comprise, est sur notre page [quitter l'Australie avec un PVT](/leaving-australia).

## Payday Super change-t-il votre impôt ou les 65 % ?

Non. La super est versée en plus de votre salaire, pas prise dessus : Payday Super change le moment où l'argent bouge, pas votre salaire net ni l'impôt retenu. Quand vous la réclamez, la super d'un PVT reste taxée à 65 % sur la part imposable, et l'impôt retenu en trop sur votre salaire ne revient que par une tax return.

## Et si vous préférez qu'on vérifie avec vous ?

La demande de DASP elle-même ne passe pas par myGov, et vous n'avez pas besoin de myGov pour que nous vous aidions. Envoyez-nous sur WhatsApp les endroits où vous avez travaillé et à peu près quand : nous retrouvons chaque fund lié à votre TFN et nous vérifions la demande avec vous, étape par étape. Nous traitons directement avec l'ATO, et Working Holiday Tax opère sous la supervision d'un agent fiscal enregistré. Tout le fonctionnement est expliqué sur notre page [récupérer sa super](/superannuation).
`,
  },
}
