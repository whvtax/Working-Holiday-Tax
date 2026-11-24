// 24 Nov 2026 (plan 3): guides myGov et compte fermé. Chaque fait vient d'une page officielle
// (ato.gov.au, my.gov.au, myid.gov.au) ; sources et URL dans le journal de build E.
export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'tax-return-without-mygov': {
    title: "Faire sa tax return australienne sans myGov",
    description: "Plus d'accès à myGov, code SMS sur un ancien numéro, ATO impossible à lier ? Votre tax return peut quand même être déposée, y compris depuis la France.",
    body: `
Oui, une tax return australienne peut être déposée sans que vous vous connectiez à myGov. myGov ne sert qu'à la déposer vous-même en ligne avec myTax : l'ATO accepte aussi une déclaration déposée par un agent fiscal enregistré, ou une déclaration papier envoyée par la poste, y compris depuis l'étranger. Si votre accès myGov est cassé depuis votre retour, votre déclaration ne l'est pas.

## Pourquoi myGov bloque-t-il autant de PVT une fois rentrés ?

Parce que l'accès repose souvent sur un numéro australien. Pour utiliser les services en ligne de l'ATO, le code par SMS ne fonctionne qu'avec un numéro de mobile australien, et l'ATO recommande myID, une passkey ou une application d'authentification aux personnes qui se trouvent à l'étranger. Une SIM prépayée qui a expiré après votre départ suffit donc à fermer la porte.

Trois blocages reviennent presque toujours : le code SMS qui part sur l'ancien numéro, le compte verrouillé après trop d'essais, et l'ATO qu'on n'arrive pas à relier à un nouveau compte. Chacun a sa solution officielle, plus bas.

## Quelles sont les façons de déposer sans votre propre compte ?

L'ATO en cite trois, et une seule passe par votre myGov :

1. En ligne avec myTax : il faut un compte myGov relié à l'ATO, et un accès qui fonctionne depuis l'étranger.
2. Par un agent fiscal enregistré : il prépare et dépose la déclaration, et vous n'avez pas à vous connecter à myGov.
3. Sur papier : vous remplissez le formulaire et vous l'envoyez par la poste.

Les trois sont décrites sur la page de l'ATO [comment déposer votre tax return](https://www.ato.gov.au/individuals-and-families/your-tax-return/how-to-lodge-your-tax-return) (en anglais). Seuls les agents fiscaux enregistrés peuvent facturer la préparation d'une déclaration, et leur inscription se vérifie sur le registre du Tax Practitioners Board. Ne donnez votre mot de passe myGov à personne : un agent n'en a pas besoin.

## Et la déclaration papier depuis l'étranger ?

Elle reste possible, mais lente. Vous commandez le formulaire papier en ligne ou par téléphone, vous le remplissez et vous l'envoyez à GPO Box 9845, SYDNEY NSW 2001, AUSTRALIA. L'ATO indique qu'une déclaration papier peut prendre jusqu'à 90 jours ouvrables de traitement, alors que la plupart des déclarations en ligne sont traitées en 10 jours ouvrables.

Il vous faut aussi les chiffres de chaque employeur. Sans accès à vos income statements dans myGov, c'est souvent la partie la plus pénible du papier.

## De quoi avez-vous besoin avec nous ?

De beaucoup moins que pour réparer myGov. Trois choses suffisent : votre passeport et votre visa, un compte bancaire australien pour un éventuel remboursement, et à peu près où et quand vous avez travaillé. Pas de payslips : vos employeurs ont déjà transmis vos revenus à l'ATO.

Le compte bancaire est le seul point qui ne se contourne pas, car l'ATO ne verse un remboursement d'impôt que sur un compte australien. Si le vôtre est déjà fermé, voyez [remboursement d'impôt et compte australien fermé](/blog/tax-refund-closed-australian-bank-account).

## Et votre super, sans myGov ?

La demande de DASP en ligne de l'ATO ne vous demande pas de vous connecter à myGov. Vous vous identifiez avec vos données personnelles, votre passeport et une question secrète que vous choisissez, et votre TFN y est facultatif.

La super est une demande séparée de la tax return, avec son propre calendrier. Le détail est dans [réclamer sa super sans myGov](/blog/claim-super-without-mygov).

## Faut-il quand même réparer son accès myGov ?

Pas pour la tax return. C'est utile si vous voulez consulter vous-même votre dossier ATO ou déposer seul les années suivantes, et il vaut mieux le faire tant que vous êtes encore en Australie.

Selon votre blocage : [le code SMS de myGov n'arrive plus à l'étranger](/blog/mygov-sms-code-not-received-overseas), [compte myGov verrouillé](/blog/mygov-account-locked-out), ou la vue d'ensemble [des problèmes myGov et de leurs solutions](/blog/mygov-problems-tax-return-super) (en anglais).

## Et si vous préférez ne pas vous en occuper ?

Vous n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons directement avec l'ATO, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO.

Écrivez-nous sur WhatsApp avec les villes où vous avez travaillé et à peu près quels mois, depuis l'Australie ou depuis chez vous. Tout est expliqué sur la page [tax return Australie en PVT](/fr/tax-return-australie-pvt).
`,
  },
  'mygov-sms-code-not-received-overseas': {
    title: "myGov : le code SMS n'arrive plus depuis l'étranger",
    description: "Le code myGov part sur une SIM australienne que vous n'avez plus ? Ce que prévoit myGov depuis l'étranger, qui appeler, et comment faire votre tax return.",
    body: `
Si le code de vérification myGov part sur un numéro australien que vous n'avez plus, il n'arrivera plus : myGov n'envoie le code qu'au numéro enregistré dans votre compte, et ce numéro ne se change qu'une fois connecté. Il reste deux voies officielles, vous connecter avec une identité numérique (Digital ID, comme myID) ou créer un nouveau compte myGov. Et pour votre tax return, vous n'avez besoin ni de l'une ni de l'autre.

## Pourquoi le code n'arrive-t-il plus ?

Parce que myGov envoie le code au numéro enregistré dans votre compte, et à lui seul. À l'étranger, il faut ce même numéro australien, l'itinérance internationale activée et un réseau compatible avec votre opérateur. Une SIM prépayée désactivée après votre départ ne reçoit plus rien.

Si la SIM est encore active, myGov conseille les vérifications de base : réseau, mode avion désactivé, redémarrage du téléphone, mémoire disponible, messages bloqués ou classés en spam. Le détail est sur la page de myGov sur [les codes par SMS](https://my.gov.au/en/about/help/mygov-website/help-using-your-account/sign-in-to-mygov/use-a-code-sent-by-sms) (en anglais).

## Peut-on mettre un numéro français, belge ou canadien ?

Seulement si vous pouvez encore vous connecter, et cela ne règle pas tout. Le numéro se change dans Account settings, puis Contact details, une fois connecté. Mais pour les services en ligne de l'ATO, le code par SMS ne fonctionne qu'avec un numéro de mobile australien.

Pour l'ATO depuis l'étranger, la vraie solution est donc une méthode qui ne dépend d'aucun numéro : myID, une passkey ou une application d'authentification, comme l'ATO le recommande aux personnes à l'étranger.

## Quelles autres façons de se connecter existent ?

L'application myGov, une passkey, une application d'authentification et myID. Elles s'activent depuis un compte ouvert, dans Account settings puis Sign in settings : mieux vaut les mettre en place avant de quitter l'Australie, tant que l'ancien numéro reçoit encore les codes.

L'application myGov Code Generator n'est plus téléchargeable et s'arrête le 28 février 2027 : ne comptez pas dessus. L'aide de myGov sur [les problèmes de connexion](https://my.gov.au/content/mygov/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help) (en anglais) liste les options encore valables.

## Et si vous êtes déjà rentré sans aucun accès ?

Il reste deux voies, dans cet ordre :

1. Sur la page de connexion, choisissez « I didn't get my code », puis « Continue with Digital ID ». Cela demande une myID de niveau Strong, avec le même nom, la même date de naissance et la même adresse e-mail que votre compte myGov.
2. Sinon, créez un nouveau compte myGov et reliez-y l'ATO de nouveau.

La première voie est rarement ouverte à un PVT : le niveau Strong suppose notamment un passeport australien, et un visa ne peut pas être vérifié dans myID depuis l'étranger. Pour la plupart des PVT rentrés, c'est donc un nouveau compte. Pour réutiliser votre adresse e-mail, l'assistance myGov doit d'abord la libérer.

Relier l'ATO au nouveau compte passe ensuite par des questions sur votre dossier, détaillées dans [impossible de lier l'ATO à myGov](/blog/cant-link-ato-to-mygov) (en anglais).

## Qui appeler depuis la France, la Belgique ou le Canada ?

- L'assistance myGov : +61 1300 169 468, puis l'option 1, du lundi au vendredi de 7 h à 22 h et le samedi et le dimanche de 10 h à 17 h, heure australienne
- L'ATO : +61 2 6216 1111, du lundi au vendredi de 8 h à 17 h, heure de l'Est australien, en anglais

Avec le décalage horaire, ces heures tombent souvent la nuit en Europe. Gardez votre TFN, votre nom tel qu'il figure sur le passeport et votre date de naissance sous la main avant d'appeler. Les numéros sont sur la page [contacts myGov](https://my.gov.au/en/about/help/contact) (en anglais).

## Faut-il tout réparer pour faire sa tax return ?

Non. myGov ne sert qu'à déposer vous-même avec myTax, et personne de sérieux ne vous demandera votre mot de passe myGov.

Une tax return peut aussi être déposée par un agent fiscal enregistré ou sur papier : voir [faire sa tax return sans myGov](/blog/tax-return-without-mygov). Si c'est plutôt un compte verrouillé qui vous bloque, lisez [compte myGov verrouillé](/blog/mygov-account-locked-out), et pour tous les autres cas, [les problèmes myGov et leurs solutions](/blog/mygov-problems-tax-return-super) (en anglais).

## Et si vous préférez ne pas vous en occuper ?

Vous n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons directement avec l'ATO, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO.

Écrivez-nous sur WhatsApp, même sans aucun accès à myGov, ou lisez d'abord [la tax return Australie en PVT](/fr/tax-return-australie-pvt).
`,
  },
  'mygov-account-locked-out': {
    title: "Compte myGov verrouillé : que faire depuis l'étranger",
    description: "Compte myGov verrouillé, identifiant ou mot de passe oublié après un PVT : les étapes officielles, le nouveau compte, et la tax return sans myGov.",
    body: `
Un compte myGov se verrouille après trop de tentatives de connexion ratées, et myGov vous envoie alors votre identifiant par e-mail. Vous le déverrouillez vous-même sur la page de connexion avec cet identifiant, votre mot de passe actuel, un code de sécurité et votre question secrète. Si ce n'est pas possible, myGov prévoit de créer un nouveau compte, et votre tax return, elle, n'a pas besoin de ce compte.

## Comment déverrouiller son compte ?

En quatre étapes, sur la page de connexion de myGov :

1. Saisissez votre identifiant et votre mot de passe actuel.
2. Choisissez « Unlock your account now ».
3. Saisissez le code de sécurité et répondez à votre question secrète.
4. Choisissez un nouveau mot de passe et confirmez-le.

Tant que le compte est verrouillé, Digital ID, les passkeys et l'application myGov ne fonctionnent pas non plus. La marche à suivre est sur l'aide de myGov sur [les problèmes de connexion](https://my.gov.au/content/mygov/en/about/help/mygov-website/help-using-your-account/mygov-sign-in-help) (en anglais).

## Identifiant ou mot de passe oublié ?

« Forgot username » renvoie l'identifiant à l'adresse e-mail enregistrée : il est composé de deux lettres et six chiffres. « Forgot password » vous fait choisir où recevoir un code, puis un nouveau mot de passe.

Si myGov a désactivé votre e-mail et votre numéro de mobile comme identifiants après une activité inhabituelle, connectez-vous avec cet identifiant unique. Et si le code doit arriver sur une SIM australienne expirée, voyez [le code SMS de myGov n'arrive plus à l'étranger](/blog/mygov-sms-code-not-received-overseas).

## Et si vous avez oublié vos questions secrètes ?

myGov propose alors de vous connecter avec Digital ID, une passkey ou l'application myGov, à condition de les avoir activés. Les questions secrètes ne permettent de toute façon pas d'accéder aux services de l'ATO.

Pour l'ATO, l'accès passe par myID, une passkey, une application d'authentification ou un code SMS envoyé à un numéro australien.

## Et si rien ne marche ?

myGov prévoit alors de créer un nouveau compte et d'y relier de nouveau vos services. Votre ancienne adresse e-mail reste attachée à l'ancien compte tant que l'assistance myGov ne l'a pas libérée.

Depuis l'étranger, l'assistance myGov répond au +61 1300 169 468, option 1, du lundi au vendredi de 7 h à 22 h et le week-end de 10 h à 17 h, heure australienne ([contacts myGov](https://my.gov.au/en/about/help/contact), en anglais). Relier l'ATO au nouveau compte demande ensuite de répondre à des questions sur votre dossier : voir [impossible de lier l'ATO à myGov](/blog/cant-link-ato-to-mygov) (en anglais).

## Un message vous propose de débloquer votre compte ?

Méfiez-vous. Aucun interlocuteur sérieux ne vous demande votre mot de passe myGov, ni de cliquer sur un lien reçu par SMS pour « débloquer » un compte.

Si vous entrez dans myGov mais que les services de l'ATO restent inaccessibles, l'ATO indique que cela peut venir d'une fuite de données ou d'une mesure de protection sur votre dossier, et qu'il faut alors la contacter. Notre guide sur [la sécurité de votre TFN](/blog/tfn-security-protect-from-fraud) liste les arnaques les plus courantes.

## Votre tax return peut-elle attendre que tout soit réglé ?

Elle n'a pas à attendre. myGov ne sert qu'à déposer vous-même avec myTax, et l'ATO accepte aussi une déclaration déposée par un agent fiscal enregistré ou sur papier.

Les trois façons de faire sont comparées dans [faire sa tax return sans myGov](/blog/tax-return-without-mygov).

## Et si vous préférez ne pas vous en occuper ?

Vous n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons directement avec l'ATO, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO.

Écrivez-nous sur WhatsApp, même avec un compte verrouillé, ou voyez [la tax return Australie en PVT](/fr/tax-return-australie-pvt).
`,
  },
  'claim-super-without-mygov': {
    title: "Réclamer sa super sans myGov : ce qu'il faut vraiment",
    description: "La demande de DASP en ligne de l'ATO ne passe pas par myGov, et votre TFN y est facultatif. Ce qu'elle demande, et que faire si votre fund est introuvable.",
    body: `
La demande de DASP en ligne de l'ATO ne passe pas par myGov : vous vous identifiez avec vos données personnelles, votre passeport et une question secrète que vous choisissez à la première connexion, et votre TFN est facultatif. Un compte myGov verrouillé, un ancien numéro australien qui ne reçoit plus les codes ou un ATO jamais relié ne bloquent donc pas la demande de votre super. La demande en ligne est gratuite.

## Où myGov intervient-il, alors ?

Seulement pour retrouver votre super. myGov relié à l'ATO liste chaque compte sous Super, puis Fund details, super déjà transférée à l'ATO comprise. C'est pratique, mais ce n'est pas la demande elle-même.

La demande de DASP passe par un système séparé de l'ATO, qui fait aussi cette recherche si vous saisissez votre TFN. Si vous n'avez aucune idée de vos funds, [retrouver une super perdue](/blog/how-to-find-lost-superannuation) explique les pistes.

## Que demande la demande en ligne ?

Vos nom et date de naissance, une adresse e-mail, le pays et le numéro de votre passeport, et pour chaque compte l'ABN du fund et, si vous l'avez, votre numéro de membre. Le système affiche ensuite les informations de visa qu'il trouve, et peut retrouver l'ABN d'un fund à partir de son nom.

Votre TFN est facultatif : sans lui, vous saisissez vous-même chaque compte. Avec lui, le système cherche vos comptes et crée une demande pour chacun. Tout est décrit dans l'aide de l'ATO sur [la demande de DASP en ligne](https://ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp/help-with-the-dasp-online-application-system) (en anglais).

## Et si vous ne retrouvez pas votre fund ?

Partez des endroits où vous avez travaillé : chaque employeur versait la super dans un fund, et son nom figure en général sur vos payslips. Si le système n'affiche pas un fund que vous savez avoir eu, choisissez « Add application » et commencez une demande avec l'ABN de ce fund.

Si vous avez oublié la réponse à votre question secrète pour rouvrir une demande enregistrée, c'est l'ATO qu'il faut appeler.

## Que faut-il avant de pouvoir envoyer la demande ?

Trois conditions en même temps : vous avez quitté l'Australie, votre visa 417 ou 462 a expiré ou a été annulé, et vous n'avez aucun autre visa australien actif. Vous pouvez commencer la demande et l'enregistrer avant de partir, puis l'envoyer une fois parti.

Tant que votre visa est actif, la demande ne peut pas être envoyée : vérifiez-le sur VEVO. Si l'écran sur votre visa affiche des informations fausses, ne l'envoyez pas en ligne : l'ATO demande d'écrire à DASPmail@ato.gov.au. Les autres causes de refus sont dans [que faire si votre DASP est refusé](/blog/dasp-rejected-what-to-do).

## Peut-on appeler l'ATO depuis l'étranger ?

Oui. Depuis l'étranger, l'ATO répond au +61 2 6216 1111, du lundi au vendredi de 8 h à 17 h, heure de l'Est australien : demandez à être transféré au 13 10 20. Un service d'interprètes (TIS National) répond au +61 3 9268 8332.

## Comment la super est-elle versée ?

Une super encore dans un fund peut être versée sur un compte australien, par chèque en dollars australiens ou, si le fund le propose, par virement international. La super déjà transférée à l'ATO n'est versée que sur un compte australien à votre nom ou par chèque.

L'ATO indique un paiement en général dans les 28 jours suivant la réception d'une demande complète. Les règles sont sur la page de l'ATO sur [le DASP](https://www.ato.gov.au/individuals-and-families/super-for-individuals-and-families/super/temporary-residents-and-superannuation/departing-australia-superannuation-payment-dasp) (en anglais).

## Et la tax return, sans myGov ?

C'est une démarche séparée, avec son propre paiement, qui ne peut aller que sur un compte australien.

Elle aussi peut se faire sans myGov : voir [faire sa tax return sans myGov](/blog/tax-return-without-mygov).

## Et si vous préférez nous la confier ?

La demande de DASP elle-même ne passe pas par myGov. Ce qui prend du temps, c'est tout ce qui l'entoure. Nous traitons directement avec l'ATO, et Working Holiday Tax opère sous la supervision d'un agent fiscal enregistré.

Ce que vous nous confieriez, c'est la recherche sur tous les comptes liés à votre tax file number, super détenue par l'ATO comprise, les copies certifiées organisées depuis l'étranger, une demande séparée pour chaque fund, et les relances quand l'un d'eux ne répond plus. Écrivez-nous sur WhatsApp avec vos employeurs, la date de fin de votre visa et celle de votre départ, ou lisez d'abord [comment récupérer sa super](/superannuation).
`,
  },
  'tax-refund-closed-australian-bank-account': {
    title: "Remboursement d'impôt et compte australien fermé",
    description: "Compte australien fermé avant l'arrivée du remboursement ? L'ATO ne paie que sur un compte australien. Ce que devient l'argent et comment le récupérer.",
    body: `
L'ATO ne verse un remboursement d'impôt que sur un compte bancaire australien, jamais sur un compte à l'étranger. Si le compte indiqué a été fermé, le remboursement revient à l'ATO, qui le verse de nouveau une fois que vous lui donnez des coordonnées australiennes à jour ; sans elles, elle le réémet par chèque. L'argent n'est pas perdu, mais il attend que les coordonnées soient réglées.

## L'ATO peut-elle verser un remboursement sur un compte français ?

Non. L'ATO l'écrit en toutes lettres : elle ne peut verser les remboursements que sur un compte bancaire australien. Sans coordonnées bancaires, il peut même être impossible de déposer en ligne avec myTax.

C'est la différence avec la super : un fund peut, s'il le propose, verser le DASP par virement international. Un remboursement d'impôt, jamais. La règle est sur la page de l'ATO sur [les coordonnées bancaires](https://www.ato.gov.au/individuals-and-families/tax-file-number/update-your-tfn-registration-details/update-your-financial-institution-details) (en anglais).

## Que devient un remboursement versé sur un compte fermé ?

La Reserve Bank of Australia le renvoie à l'ATO, ce qui peut prendre jusqu'à 10 jours. Dès que vous mettez à jour vos coordonnées bancaires, l'ATO le verse sur le nouveau compte.

Si vous ne donnez pas de nouvelles coordonnées, l'ATO réémet le remboursement par chèque. Depuis janvier 2025, elle retient certains chèques jusqu'à 90 jours, le temps de vous demander des coordonnées bancaires. Tout cela figure sur la page de l'ATO sur [les remboursements manquants](https://www.ato.gov.au/individuals-and-families/your-tax-return/check-the-progress-of-your-tax-return/missing-tax-return-refunds) (en anglais).

## Et si la déclaration est déposée sans compte australien ?

L'ATO peut alors retenir le remboursement jusqu'à 90 jours à partir du moment où il est dû, et vous contacte par courrier, par e-mail ou dans votre boîte myGov pour demander un compte australien valide. Donner ces coordonnées avec la déclaration évite cette attente.

## Et si l'argent est arrivé sur le mauvais compte ?

Tout dépend du compte. S'il s'agit d'un compte qui n'a aucun lien avec vous, contactez l'ATO, qui tente de récupérer la somme : cela peut prendre plus de 28 jours. S'il s'agit d'un compte que vous connaissez, comme un ancien compte à vous ou celui de votre partenaire, l'ATO ne peut en général pas le récupérer, et c'est à régler avec le titulaire du compte.

## Comment donner de nouvelles coordonnées à l'ATO ?

En ligne dans myGov : ATO, puis My profile, puis Financial institution details. Le compte doit notamment être à votre nom, seul ou joint, avec un BSB à 6 chiffres et un numéro de compte de 9 chiffres au plus.

Sans accès à myGov, vous pouvez aussi appeler l'ATO avec votre TFN sous la main : +61 2 6216 1111 depuis l'étranger, du lundi au vendredi de 8 h à 17 h, heure de l'Est australien. Si c'est myGov qui vous bloque, voyez [faire sa tax return sans myGov](/blog/tax-return-without-mygov).

## Faut-il garder son compte australien après le départ ?

Oui, jusqu'à ce que tout ce qui vous est dû soit arrivé. Le remboursement d'une année travaillée ne peut arriver qu'en Australie, et c'est le compte le plus simple pour suivre aussi la super.

Les délais de traitement sont expliqués dans [le délai d'un remboursement d'impôt](/blog/how-long-does-tax-refund-take-australia), et le reste de la liste avant le départ dans [l'impôt après avoir quitté l'Australie](/blog/tax-obligations-after-leaving-australia).

## Et si vous préférez ne pas vous en occuper ?

Vous n'aurez jamais à vous connecter à myGov, à lier une pièce d'identité ou à deviner quel formulaire remplir. Nous traitons directement avec l'ATO, et votre déclaration est vérifiée et validée par un agent fiscal enregistré avant d'être déposée auprès de l'ATO.

Dites-nous dans votre premier message si votre compte australien est déjà fermé. Écrivez-nous sur WhatsApp, ou lisez d'abord [la tax return Australie en PVT](/fr/tax-return-australie-pvt).
`,
  },
}
