export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'what-is-a-tfn': {
    title: "Qu'est-ce qu'un TFN ? Neuf chiffres, deux taux d'impôt",
    description: "Le TFN est votre identité permanente auprès de l'ATO. Sans lui, votre employeur doit retenir l'impôt au taux maximal de 45 %.",
    body: `
Le Tax File Number est un numéro à neuf chiffres que l'ATO attribue à toute personne qui perçoit un revenu en Australie. Il est gratuit et permanent, et c'est lui qui permet à votre employeur de retenir l'impôt au taux qui correspond à votre situation plutôt qu'au taux maximal de 45 %. Tout le reste en dépend.

## Pourquoi ce numéro compte-t-il autant ?

Parce que quatre systèmes distincts s'en servent pour vous reconnaître. L'ATO l'utilise pour votre impôt et votre remboursement. La paie de votre employeur s'en sert pour fixer votre taux de retenue. Votre fonds de super l'utilise pour rattacher les cotisations à votre nom. Votre banque s'en sert pour ne pas retenir d'impôt sur vos intérêts.

Un problème de TFN se voit à un mauvais taux sur une payslip, à un compte de super que personne n'arrive à rattacher à vous, ou à un remboursement qui ne passe pas.

## Que coûte l'absence de TFN, concrètement ?

Sans TFN, l'employeur doit retenir 45 %, et il n'a aucune marge de manœuvre. Avec un TFN enregistré, il applique le taux qui correspond à votre situation.

- 1 000 $ AUD par semaine : 450 $ retenus à 45 %
- 1 500 $ AUD par semaine : 675 $ retenus
- 2 000 $ AUD par semaine : 900 $ retenus

L'impôt retenu en trop est réglé lors du dépôt de la tax return et peut vous être remboursé, selon votre année. Ce que vous perdez, c'est l'accès à cet argent pendant des mois, ce qui compte quand le loyer sort de chaque paie.

## Qui peut en obtenir un, et est-ce compliqué ?

Toute personne autorisée à travailler en Australie : les visas vacances-travail 417 et 462, les visas étudiants avec droit de travail et la plupart des visas temporaires de travail qualifié. La demande est gratuite et doit être faite depuis l'Australie.

C'est vraiment simple, et il ne faut payer personne pour ça. Le plus délicat, c'est le formulaire de déclaration que votre employeur vous remet dès le premier jour : la case sur la résidence fiscale pose la même question que celle qui décide de votre remboursement en fin d'année, et c'est la rubrique où l'on se trompe le plus souvent.

## Pourquoi le formulaire de déclaration compte-t-il plus que le numéro ?

Parce que c'est ce formulaire qui fixe réellement votre taux. Donner votre TFN à l'oral à un manager, ou lui montrer la photo du courrier, ne change rien à la paie. C'est la Tax File Number Declaration qui le fait : elle enregistre votre numéro et votre statut de working holiday maker.

Chaque employeur a besoin du sien. Donner votre TFN à un packing shed près de Shepparton ne sert à rien pour un bar à Melbourne. La perte silencieuse la plus fréquente dans l'année d'un backpacker, c'est un job à 15 % et un second qui tourne à 45 % pendant des mois parce que personne n'a rempli de deuxième formulaire.

## Combien de temps ça prend, et que faire si vous travaillez déjà ?

L'ATO annonce 28 jours au maximum, environ deux semaines en pratique, et le numéro arrive par courrier à une adresse australienne. Vous pouvez commencer à travailler avant de le recevoir.

Vous avez 28 jours à partir de votre premier jour pour le fournir. Une déclaration indiquant que la demande est en cours évite le taux maximal pendant cette période. Si vous ne dites rien, les 45 % s'appliquent tout de suite. Tout ce qui a été retenu en trop avant l'arrivée du numéro revient au moment de la tax return, et non via la paie.

## Avec quelle prudence faut-il le traiter ?

Avec beaucoup de prudence. Un TFN accompagné d'un scan de passeport suffit à usurper votre identité, et les working holiday makers sont des cibles parce qu'ils sont nouveaux et joignables via les panneaux d'affichage des hostels et les réseaux sociaux.

La liste des personnes en droit de vous le demander est courte : un employeur une fois que vous êtes embauché, votre banque, votre fonds de super, un agent fiscal enregistré qui agit pour vous, Services Australia et l'ATO. Les propriétaires, les hostels, les recruteurs avant l'embauche et n'importe qui dans un groupe WhatsApp n'en font pas partie, et les refuser ne vous coûte rien. La [liste complète et les arnaques les plus courantes](/blog/who-can-ask-for-your-tfn) méritent d'être lues une fois.

## Où votre propre dossier peut-il vous coûter cher ?

Obtenir un TFN est la même courte démarche pour tout le monde. Ce qui varie, c'est si vous en avez déjà un et si les papiers autour ont été bien remplis.

- Avez-vous déjà travaillé en Australie ? Le numéro est permanent, et en redemander un crée un doublon qui retarde tout.
- L'adresse postale de votre demande recevra-t-elle encore du courrier dans un mois ? C'est la première cause de retard.
- Combien d'employeurs avez-vous ? Chacun exige son propre formulaire de déclaration.
- Les questions sur la résidence ont-elles été remplies avec soin sur ce formulaire ? Elles pèsent sur le résultat de votre déclaration, et c'est examiné au cas par cas.
- Votre fonds de super a-t-il votre TFN ? Sans lui, un fonds taxe les cotisations plus lourdement et aura du mal à rattacher le compte à vous plus tard.

Le numéro est ce qui rend possibles votre [tax return working holiday](/tax-return) et toute [demande de super après avoir quitté l'Australie](/superannuation), et vous pouvez [estimer votre remboursement d'impôt](/calculator) à tout moment de l'année.
`,
  },
  'how-to-apply-for-a-tfn': {
    title: "Comment demander un TFN, et ce qui peut mal tourner",
    description: "Un TFN est gratuit. De quoi dépend la demande, pourquoi l'adresse et le passeport décident du délai, la fenêtre de 28 jours et le taux de 45 %.",
    body: `
Un Tax File Number ne coûte rien et arrive normalement par courrier dans les 28 jours suivant la demande. Vous pouvez le demander dès votre arrivée en Australie, à condition d'avoir une adresse postale australienne où envoyer la lettre. Ce qui coûte de l'argent, ce sont les semaines qui précèdent son arrivée.

## De quoi la demande dépend-elle ?

De trois éléments, qui doivent tous concorder. Votre passeport tel qu'il est imprimé, orthographe et date de naissance compris, une adresse australienne où l'on peut vous poster la lettre, et une adresse e-mail qui fonctionnera encore dans un mois.

Aucun document n'est à téléverser. L'ATO vérifie le passeport électroniquement auprès des registres de l'immigration, et c'est pourquoi une faute de recopie est la cause la plus fréquente d'échec. Notre guide sur les [pièces d'identité pour le TFN](/blog/tfn-identity-documents-required) détaille ce que cette vérification contrôle.

## Quelle adresse donner ?

Celle où vous serez encore dans un mois, pas celle où vous dormez aujourd'hui. Le TFN arrive sous forme de lettre papier, et une lettre renvoyée à l'expéditeur relance la procédure au lieu d'être réexpédiée.

Une adresse d'hostel convient si vous êtes sûr d'y rester. Un hostel que vous quittez dans dix jours ne convient pas : l'adresse d'un ami ou d'une colocation plus longue vaut mieux, même si vous n'y avez pas encore emménagé. Une adresse qui n'est plus la vôtre est la raison la plus courante pour laquelle 28 jours deviennent deux mois.

## Peut-on commencer à travailler avant de le recevoir ?

Oui, et c'est là que l'argent se joue. Tant qu'aucun TFN n'est enregistré, votre employeur doit retenir 45 %. Mais une Tax File Number Declaration indiquant qu'une demande est en cours vous évite ce taux maximal pendant une fenêtre de 28 jours.

L'essentiel est de prévenir l'employeur dès le premier jour et de remplir la déclaration en conséquence. Si vous ne dites rien, les 45 % s'appliquent tout de suite. Sur une semaine à 1 000 $ AUD, cela fait 450 $ retenus, chaque semaine, jusqu'à ce que ce soit corrigé.

Tout ce qui a été retenu en trop revient au dépôt de la déclaration. Ce que vous perdez, c'est de pouvoir vous servir de cet argent entre-temps.

## Que se passe-t-il une fois le numéro arrivé ?

Chaque employeur a besoin de sa propre Tax File Number Declaration. Un TFN donné à un employeur n'est pas transmis à un autre, et chaque service de paie a besoin de cette déclaration pour appliquer le bon taux.

La déclaration contient aussi la question de la résidence, qui pèse sur votre déclaration d'impôt, et c'est une rubrique à remplir avec soin. Notre guide sur le [formulaire de déclaration du Tax File Number](/blog/tax-file-number-declaration-form) explique ce que demande chaque case.

## Le numéro lui-même est-il gratuit ?

Oui, et on le laisse parfois croire le contraire. Le numéro est délivré par l'ATO sans frais, et nous le disons aussi sur notre [page TFN](/tfn).

L'argent se gagne ou se perd de part et d'autre : le formulaire de déclaration et la fenêtre de 28 jours à l'entrée, puis la tax return qui récupère l'impôt retenu en trop à la sortie.

## Et s'il n'arrive pas ?

Le numéro de référence de l'e-mail de confirmation sert de base à toute relance : gardez-le. Si 28 jours passent sans rien, la cause est presque toujours l'adresse, et la deuxième cause la plus courante est un nom ou une date de naissance qui ne correspondait pas au passeport.

Une demande refusée, et non simplement retardée, est un autre problème, traité dans notre guide sur une [demande de TFN rejetée](/blog/tfn-application-rejected).

## Combien un retard pourrait-il vous coûter ?

La demande est la même pour tout le monde. Ce que coûte un retard ne l'est pas, et cela tient à quelques points réglés pendant votre première semaine.

- Avez-vous commencé à travailler avant de faire la demande ? La période à 45 % court à partir de la première paie, pas à partir de la demande.
- Avez-vous dit à l'employeur que la demande était en cours, et est-ce noté sur la déclaration ?
- L'adresse postale sera-t-elle encore la vôtre à l'arrivée de la lettre ?
- Vos données de passeport ont-elles été saisies exactement comme imprimées ?
- La façon dont l'employeur est enregistré auprès de l'ATO influence le taux retenu, même une fois le TFN arrivé.
- Combien d'employeurs avez-vous ? Chacun a besoin de sa propre déclaration.

Tout ce qui a été retenu en trop pendant l'attente se récupère par votre [tax return working holiday](/tax-return), et vous pouvez [estimer votre remboursement d'impôt](/calculator) à tout moment de l'année.
`,
  },
  'how-long-does-it-take-to-get-a-tfn': {
    title: "Combien de temps prend un TFN ? Et après 28 jours ?",
    description: "En général environ deux semaines, 28 jours au maximum. Ce qui décide si la lettre arrive avant votre première paie à 45 %, et que faire passé le jour 28.",
    body: `
Votre Tax File Number arrive par courrier, à une adresse australienne, jamais par e-mail ni par SMS. Deux semaines, c'est normal, 28 jours est le plafond de l'ATO, et l'attente elle-même pose rarement problème. Les ennuis viennent de l'adresse que vous avez donnée et de la date de votre première paie, car un employeur qui n'a pas votre numéro doit retenir 45 %.

## Pourquoi les 28 jours comptent-ils plus que les deux semaines ?

Deux comptes à rebours de 28 jours tournent en même temps. Le premier est le plafond de traitement de l'ATO. Le second est le délai, à partir de votre premier jour de travail, pour remettre votre TFN à un employeur avant qu'il doive retenir 45 %. Ils ne démarrent pas le même jour, et celui qui coûte de l'argent est le second.

Vous arrivez à Cairns en octobre, trouvez un job de bar la première semaine et faites votre demande la même semaine : les deux compteurs avancent ensemble. Vous passez trois semaines sur la route avant de faire la demande, puis vous commencez à travailler tout de suite : le compteur de l'emploi a déjà une bonne longueur d'avance. C'est dans cet écart que l'argent part.

## Qu'est-ce qui décide vraiment du délai ?

Deux faits concernant votre propre demande expliquent presque tous les retards au-delà de 28 jours, et vous les maîtrisez : l'adresse postale que vous avez donnée, et la concordance entre votre passeport et votre visa d'un côté, et les données du Department of Home Affairs de l'autre.

**Votre adresse postale.** Votre TFN est une lettre. Un hostel que vous quittez dans dix jours, une colocation avec huit noms sur la boîte, un chiffre faux dans le code postal : tout cela se termine par une lettre renvoyée à l'ATO et une attente qui repart de zéro. Dans les demandes que nous relançons, un problème d'adresse est de loin la cause la plus fréquente.

**La concordance avec les registres de l'immigration.** Un numéro de passeport recopié avec une faute, un nom qui apparaît autrement sur la notification de visa que sur le passeport, ou un TFN déjà délivré pour un visa précédent : chacun de ces cas place la demande en examen manuel. Ce n'est pas un refus, mais cela ajoute des semaines et ne se règle pas tout seul.

**Où vous logez.** La livraison en zone régionale ou isolée prend plus de temps qu'en ville. Une adresse de station près de Katherine ou une ferme près de Mildura, ce n'est pas la même affaire pour la poste qu'un appartement du centre de Melbourne, et les 28 jours de l'ATO n'incluent pas les délais d'Australia Post.

## L'attente vous coûte-t-elle de l'argent ?

Seulement si elle recoupe un travail payé et que vous n'avez pas dit à votre employeur que la demande était en cours. Si la Tax File Number Declaration indique que vous avez fait la demande, votre employeur évite le taux de 45 % pendant la fenêtre de 28 jours. Si vous ne dites rien, les 45 % s'appliquent dès la première paie.

L'impôt retenu en trop est réglé au dépôt de votre déclaration, parce que votre impôt est calculé sur vos revenus de toute l'année, et il peut être remboursé, selon votre année : c'est l'ATO qui décide. Ce que vous perdez, c'est de pouvoir vous servir de cet argent entre-temps.

## Peut-on commencer à travailler avant l'arrivée du TFN ?

Oui, et la plupart des gens le font. Aucune loi ne vous interdit d'être employé avant la délivrance de votre Tax File Number, et en principe aucun employeur n'a le droit de vous refuser un poste pour ce seul motif. Gardez l'e-mail de confirmation de l'ATO au cas où l'employeur le demanderait.

## Peut-on accélérer les choses ?

Non. Il n'existe ni accès rapide payant, ni traitement prioritaire, ni suivi en ligne de l'état de la demande, quoi que prétende un site tiers. Quiconque propose d'accélérer un TFN contre paiement vend quelque chose que l'ATO ne vend pas.

Ce qui raccourcit le délai, c'est d'écarter les deux causes de retard, ce qui se règle avant de faire une [demande de TFN](/tfn) : une adresse postale qui vous joindra encore dans un mois, et des données de passeport identiques au document.

## Et si 28 jours passent sans rien recevoir ?

Passé le jour 28, il faut téléphoner. Vous pouvez joindre l'ATO au 13 28 61 pendant les heures ouvrables australiennes, ou au +61 2 6216 1111 depuis l'étranger, avec le numéro de référence de votre e-mail de confirmation et votre passeport.

Ne déposez pas de seconde demande. Un doublon est le moyen le plus sûr de transformer trois semaines de retard en deux mois, parce qu'il crée un dossier contradictoire qu'il faut résoudre à la main avant que l'un ou l'autre puisse avancer.

## À qui l'attente coûte-t-elle réellement ?

L'attente est quasiment la même pour tout le monde. Son coût, non.

- Travaillez-vous pendant l'attente ? Un voyageur qui fait sa demande à l'arrivée et ne commence à travailler que six semaines plus tard ne risque rien.
- Votre employeur a-t-il noté la demande en cours sur votre déclaration ?
- La façon dont votre employeur est enregistré auprès de l'ATO influence le taux retenu, même après l'arrivée de votre TFN.
- Votre adresse recevra-t-elle encore du courrier dans un mois ? Le travail saisonnier vous fait bouger, et les villes de récolte plus vite que les autres.
- Avez-vous déjà eu un TFN pour un visa australien précédent ? Vous le gardez à vie, et en redemander un crée le doublon décrit plus haut.

Si vous avez déjà travaillé un temps à 45 %, cet argent attend chez l'ATO que vous le réclamiez par votre [tax return working holiday](/tax-return), et vous pouvez [estimer votre remboursement d'impôt](/calculator) avant de déposer quoi que ce soit.
`,
  },
  'can-you-start-work-without-a-tfn': {
    title: "Travailler sans TFN ? Oui, vous avez 28 jours",
    description: "Vous pouvez travailler avant l'arrivée de votre TFN. Le formulaire de déclaration vous maintient à 15 % pendant 28 jours, puis cinq points décident.",
    body: `
Oui. Rien ne vous empêche de commencer à travailler avant l'arrivée de votre Tax File Number, et aucun employeur ne peut l'exiger avant de vous embaucher. Vous avez 28 jours à partir de votre premier jour pour le fournir. Indiquez sur le formulaire de déclaration que vous avez fait la demande, et le taux maximal ne s'applique pas pendant cette période.

## En quoi consiste exactement la règle des 28 jours ?

Les 28 jours courent à partir du jour où vous commencez chez cet employeur, pas depuis le jour de votre demande de TFN ni depuis votre arrivée en Australie. Pendant cette période, un employeur qui détient une Tax File Number Declaration indiquant que votre demande est en cours retient au taux ordinaire qui correspond à votre situation. Si les 28 jours s'écoulent sans que le TFN ait été fourni, il doit retenir 45 % sur chaque paie à partir de là.

Le compteur est propre à chaque employeur. Vous commencez dans un café à Perth en mars, puis dans un packing shed près de Shepparton en mai : chacun démarre ses propres 28 jours et a besoin de sa propre déclaration.

## À quoi sert vraiment le formulaire de déclaration ?

La Tax File Number Declaration fixe votre taux de retenue. C'est là que vous indiquez votre situation, et que vous fournissez un TFN ou précisez que vous en avez demandé un. Le service de paie lit ce formulaire et applique le taux en conséquence.

Montrer à un manager la photo de votre lettre de TFN, ou lui dire le numéro de vive voix, ne change rien à votre paie. Le taux suit le formulaire. La case sur la résidence, sur ce même formulaire, compte aussi : elle pèse sur votre déclaration en fin d'année, et c'est examiné au cas par cas.

## Les 45 % s'appliquent-ils à tout si vous dépassez le délai ?

Non. Si les 28 jours s'écoulent, le taux plus élevé s'applique en totalité à chaque paie suivante. Il n'est pas appliqué rétroactivement aux paies déjà versées, et aucun employeur ne reprend d'argent sur des salaires passés.

Dès que vous remettez le TFN, le bon taux reprend à la paie suivante. La part retenue en trop pendant l'écart n'est pas corrigée par la paie : elle revient par l'ATO au dépôt de votre déclaration, avec tout le reste de ce qui a été retenu en trop dans l'année.

## Que dire à votre employeur dès le premier jour ?

Dites que votre demande de TFN est en cours, proposez l'e-mail de confirmation de l'ATO comme preuve, et demandez à remplir la Tax File Number Declaration en y indiquant la demande. Tous les services de paie de l'hôtellerie ou des agences de placement en Australie ont déjà eu cette conversation cent fois.

Les employeurs qui se trompent ne sont pas les grands. Les grands groupes d'hôtellerie et les agences qui fournissent le travail de récolte font cela correctement par défaut. Les failles que nous voyons se trouvent chez les petits indépendants et les fermes à site unique, où la paie est faite par une seule personne entre deux autres tâches, et où personne ne remarque qu'un taux est faux avant que quelqu'un lise une payslip en juin.

## Faut-il un TFN pour autre chose pendant l'attente ?

Vous pouvez ouvrir un compte bancaire australien sans TFN et y être payé. Ce qu'il ne faut pas laisser en suspens, c'est votre fonds de super. Un fonds qui n'a pas votre TFN taxe les cotisations plus lourdement, ne peut pas en accepter certaines, et est plus difficile à retrouver plus tard quand vous réclamez votre super.

La super est versée sur votre salaire dès le premier dollar, quoi qu'il arrive, à 12 %, et un working holiday maker peut [réclamer sa super après avoir quitté l'Australie](/superannuation). Un compte que votre fonds ne parvient pas à rattacher à vous est la raison la plus courante pour laquelle des gens laissent leur super derrière eux.

## Combien votre propre fenêtre de 28 jours peut-elle coûter ?

La règle des 28 jours est la même pour tout le monde, donc elle n'est jamais la variable. Ce qui change, c'est ce que la fenêtre vous coûte, et cela dépend de cinq faits sur votre date de début et vos employeurs.

- Avez-vous fait la demande avant ou après avoir commencé à travailler ? Demander d'abord signifie presque toujours aucune paie à 45 %.
- La déclaration indiquait-elle la demande en cours ? Sans cette mention, les 45 % s'appliquent tout de suite plutôt qu'après 28 jours.
- L'adresse de votre demande recevra-t-elle du courrier pendant un mois ? Le travail saisonnier fait bouger, et une lettre renvoyée relance l'attente au-delà des 28 jours.
- La façon dont votre employeur est enregistré auprès de l'ATO influence le taux retenu, même avec votre TFN.
- Combien d'employeurs avez-vous eus dans l'année ? Chacun a son propre formulaire et son propre compteur.

Un montant retenu à un taux inadapté se revoit par votre [tax return working holiday](/tax-return), et vous pouvez [estimer votre remboursement d'impôt](/calculator) avant de décider quoi que ce soit.
`,
  },
  'what-happens-without-your-tfn': {
    title: "Pas de TFN enregistré ? 45 % retenus, réglés plus tard",
    description: "Sans TFN, l'employeur doit retenir 45 %. Comment cela se revoit lors de la tax return, et sous quelles conditions.",
    body: `
Sans TFN, votre employeur doit retenir 45 %, aussi longtemps que cela dure. Sur 1 000 $ AUD par semaine, cela fait 450 $ pour l'ATO au lieu de votre compte.

## Pourquoi votre employeur retient-il 45 % ?

Votre employeur n'a aucune marge de manœuvre. La loi fiscale australienne oblige un employeur qui n'a pas le Tax File Number d'un salarié à retenir au taux marginal le plus élevé de 45 %, et l'employeur qui l'ignore s'expose à des sanctions de l'ATO. Le taux qui correspond à votre situation s'obtient grâce à un document, pas grâce à un visa.

Ce document est la Tax File Number Declaration. Envoyer votre visa, votre passeport ou la photo de votre lettre de TFN dans un groupe WhatsApp ne suffit pas. Tant que la déclaration n'est pas au service de paie, le système applique le taux qu'il est légalement tenu d'appliquer.

## Que coûtent concrètement 45 % de retenue ?

Voici les retenues hebdomadaires à 45 % pour des salaires réalistes en travail saisonnier ou en hôtellerie à plein temps.

- 800 $ AUD par semaine : 360 $ retenus
- 1 000 $ AUD par semaine : 450 $ retenus
- 1 500 $ AUD par semaine : 675 $ retenus
- 2 000 $ AUD par semaine : 900 $ retenus

Un mois de travail agricole à plein temps pendant les saisons de Bundaberg ou de Mildura, à ces niveaux, représente facilement plusieurs centaines de dollars retenus à un taux élevé.

## Récupère-t-on cet argent ?

Cela se revoit au moment de la tax return, selon votre situation.

L'impôt retenu à ce taux n'est pas une pénalité. Au dépôt de votre déclaration, l'ATO calcule ce que vous deviez sur l'année fiscale, et c'est l'ATO qui décide en dernier ressort du résultat. Nous ne pouvons rien promettre sur le montant d'un éventuel remboursement.

Ce que vous perdez, c'est l'accès à l'argent en attendant. Quand on paie son loyer d'hostel semaine après semaine, rester plusieurs mois avec une retenue aussi élevée est un vrai problème, même si les comptes sont revus à la fin. C'est pourquoi régler la déclaration rapporte plus par heure que la plupart des shifts qu'elle concerne.

## Comment y mettre fin ?

Remettez à votre employeur une Tax File Number Declaration remplie, avec votre TFN. Le bon taux s'applique dès la paie suivante. Votre employeur ne refera pas les paies précédentes et n'y est pas tenu : la retenue passée est revue par l'ATO au moment de la tax return, pas par la paie.

Si votre demande est encore en cours, indiquez-le sur la déclaration. Un employeur qui a cette mention n'applique pas le taux de 45 % pendant la fenêtre de 28 jours, ce qui vous évite en général toute paie à 45 %.

## Qu'est-ce qui décide de la durée à 45 % ?

Quatre éléments décident de la durée du taux élevé, et aucun n'est la lenteur de l'ATO. C'est pourquoi la période varie autant entre des gens qui ont fait leur demande le même jour.

**Avez-vous dit à votre employeur que la demande était en cours ?** La déclaration l'enregistre, et c'est cette mention qui évite le taux de 45 % pendant la fenêtre de 28 jours.

**L'adresse postale de la demande était-elle correcte ?** Votre TFN arrive par lettre. Une mauvaise adresse est de loin la cause la plus courante d'un retard au-delà de 28 jours, et chaque semaine de plus est une semaine de plus à 45 %.

**Comment votre employeur est-il enregistré auprès de l'ATO ?** Cela influence le taux retenu, même une fois votre TFN enregistré. Regardez le pourcentage sur la payslip plutôt que de supposer que le TFN a tout réglé, et n'hésitez pas à nous demander de l'examiner.

**Combien d'employeurs avez-vous eus ?** Chaque employeur a besoin de sa propre déclaration. Donner votre TFN au packing shed ne le donne pas au pub, et il arrive souvent qu'un job soit au bon taux pendant qu'un autre tourne discrètement à 45 % pendant deux mois.

## Cela s'applique-t-il au travail payé en cash ?

Le travail payé en cash sort de cette règle, parce qu'il n'y a généralement aucune paie qui applique un taux, ce qui est un problème différent et plus grave. Un salaire versé en cash n'est légal que si l'impôt est quand même retenu et la super quand même versée ; quand ni l'un ni l'autre n'a lieu, vous n'avez aucune retenue à récupérer et aucun relevé de revenus pour déposer votre déclaration.

Si une partie de votre année s'est faite en cash, ces revenus doivent quand même figurer dans votre déclaration. La façon dont vous avez été payé change les preuves nécessaires, pas l'obligation de déclarer. Voyez [le travail payé en cash en Australie](/blog/can-your-employer-pay-you-cash-in-hand) pour savoir ce que cela signifie en pratique.

## Peut-on réclamer l'argent avant la fin de l'année ?

En général, il faut attendre la fin de l'année fiscale, le 30 juin. L'exception qui compte pour les working holiday makers est le départ définitif d'Australie : si vous partez et ne gagnerez plus de revenus australiens cette année-là, une déclaration anticipée peut être déposée avant le 30 juin.

Que ce soit le bon choix dépend de votre situation de l'année, de la super à réclamer en même temps, et de la question de savoir si un employeur doit encore émettre un relevé de revenus final. Notre équipe l'examine avec vous. Vous pouvez d'abord [estimer votre remboursement d'impôt](/calculator), et une période à 45 % est exactement le cas où l'estimation et le chiffre final divergent le plus.
`,
  },
  'tfn-vs-abn-difference': {
    title: "TFN ou ABN ? La différence qui coûte de l'argent",
    description: "Le TFN sert à l'emploi, où l'impôt est retenu pour vous. L'ABN sert au travail indépendant, sans retenue avant l'évaluation. Beaucoup ont besoin des deux.",
    body: `
Un TFN est votre numéro fiscal personnel, utilisé quand un employeur vous verse un salaire et retient l'impôt pour vous. Un ABN vous identifie comme entreprise, utilisé quand vous facturez un travail et que rien n'est retenu. La plupart des working holiday makers n'ont besoin que d'un TFN. Beaucoup finissent par avoir besoin des deux.

## À quoi sert un TFN ?

C'est votre identité permanente auprès de l'ATO. Toute personne qui perçoit un revenu en Australie en a besoin, salariée ou indépendante. Il relie vos salaires, vos retenues, votre [super](/superannuation) et votre remboursement à une même personne, et il n'expire jamais.

Il vous faut un TFN pour tout ce qui passe par une paie : salaires, retenue PAYG, cotisations de super de l'employeur et dépôt d'une tax return. Cela couvre la plupart des emplois en hôtellerie, en commerce, en entrepôt et en agriculture salariée.

## À quoi sert un ABN ?

C'est un identifiant d'entreprise à onze chiffres, utilisé quand vous travaillez comme sole trader (entrepreneur individuel) plutôt que comme salarié. Il vous permet de facturer un client, et il s'accompagne de toute la responsabilité fiscale qu'un employeur porterait autrement pour vous.

- Vous facturez le travail au lieu d'être payé via une paie
- Rien n'est retenu, donc l'impôt est dû au moment de l'évaluation (assessment)
- Aucune super n'est versée par un employeur pour vous
- Vous portez le risque commercial et fournissez en général votre propre matériel

C'est courant dans le gig work, la livraison, certains arrangements agricoles payés à la pièce, et tout emploi où l'entreprise demande une facture au lieu de vous mettre sur la paie. Notre guide sur [ce qu'est un ABN](/blog/what-is-an-abn) explique quand c'est légitime.

## Peut-on avoir les deux en même temps ?

Oui, et beaucoup de working holiday makers le font. Le TFN est toujours nécessaire parce que c'est votre identifiant personnel, et l'ABN vient à côté pour la part de vos revenus qui relève du travail indépendant.

Cela donne une seule déclaration avec deux types de revenus. Les salaires arrivent avec l'impôt déjà retenu, et les revenus sous ABN arrivent sans rien, si bien que la retenue côté salaires absorbe souvent l'impôt dû côté ABN. Notre guide sur [le fait d'avoir un TFN et un ABN ensemble](/blog/can-you-have-tfn-and-abn) explique comment les deux interagissent.

## Comment savoir lequel s'applique à votre emploi ?

Le critère est le contrôle, pas le libellé de l'annonce. Si l'entreprise décide quand vous commencez, comment le travail se fait et quel matériel vous utilisez, c'est un emploi, et il faut un TFN. Si c'est vous qui décidez de tout cela, que vous facturez un résultat et portez le risque de réparer vos propres erreurs, c'est du travail indépendant, et il faut un ABN.

- **Salarié** : sur la paie, impôt retenu, super versée en plus, l'entreprise dirige le travail
- **Indépendant** : factures émises, paiements bruts, votre propre impôt et votre propre super, vous dirigez le travail

Une annonce qui exige un ABN pour des shifts encadrés à horaires fixes décrit un emploi. C'est du sham contracting (faux travail indépendant), et notre guide sur le [statut de salarié ou d'indépendant](/blog/employee-vs-contractor-australia) explique le critère et ce qu'il vous coûte.

## Que coûte réellement le mauvais numéro ?

Être sous ABN alors que vous devriez être salarié vous coûte les 12 % de super que votre employeur aurait versés, le taux minimum de l'award, les majorations (penalty rates) et toute couverture d'assurance accidents du travail, et fait peser sur vous l'intégralité de l'impôt à la fin de l'année.

L'erreur inverse coûte moins, mais pas rien. Travailler sans que votre TFN soit enregistré signifie 45 % retenus au lieu de 15 %, et une facture sans ABN signifie 47 % retenus par le payeur.

## Qu'est-ce qui décide de ce qu'il vous faut cette année ?

Trois faits sur le travail lui-même. Qui contrôle la façon dont il est fait. Qui fournit le matériel et porte le risque. Et si vous êtes payé pour des heures ou pour un résultat.

La plupart des années working holiday contiennent un mélange, parce qu'un shift de bar à Melbourne et une tournée de livraison dans le même mois sont réellement deux arrangements différents. Ce qui n'est pas acceptable, c'est qu'une ferme ou une agence décide à votre place que du travail posté est du travail indépendant. À vérifier avant la première paie, parce que la super est la part qui se récupère le moins facilement. [Contactez-nous](/contact) si l'arrangement qu'on vous propose ne correspond pas au travail que vous faites réellement.
`,
  },
  'apply-for-tfn-before-arriving': {
    title: "Peut-on demander un TFN avant d'arriver ?",
    description: "Un working holiday maker doit être en Australie pour demander un TFN. Tout le reste peut être prêt d'avance pour déposer la demande dès le premier jour.",
    body: `
Non. La demande de TFN en ligne de l'ATO pour les titulaires d'un passeport étranger exige que vous soyez en Australie, donc un working holiday maker ne peut pas la déposer depuis son pays. Ce que vous pouvez faire avant, c'est avoir tous les éléments prêts pour la déposer dès le premier jour, ce qui décide si vous verrez un jour une paie à 45 %.

## Pourquoi faut-il attendre d'être arrivé ?

La demande repose sur l'enregistrement de votre arrivée en lien avec votre visa, et elle exige une adresse postale australienne où envoyer le numéro.

Vous pouvez détenir le visa accordé des mois à l'avance, cela ne change rien. La demande ne dépend pas de l'octroi du visa, mais du fait que vous êtes sur place.

## Faire la demande dès le premier jour compte-t-il vraiment ?

Oui, plus que le délai de traitement. À partir de votre premier jour de travail, vous avez 28 jours pour remettre votre TFN à un employeur avant qu'il doive retenir 45 %, et l'ATO met jusqu'à 28 jours à le délivrer. La seule vraie variable est le nombre de jours qui s'écoulent entre votre arrivée et votre demande.

Vous faites la demande le premier jour et commencez à travailler la deuxième semaine : la lettre a très probablement le temps d'arriver dans la fenêtre d'emploi. Vous voyagez un mois, puis commencez à travailler le lendemain de votre demande : vous vous êtes créé un écart qui coûte trente cents sur chaque dollar jusqu'à ce qu'il se referme.

## Que préparer avant de partir ?

Tout, sauf l'envoi. La demande est gratuite, et [le formulaire en ligne n'a rien de compliqué](/tfn).

- Les détails de votre passeport, enregistrés sous forme de photo de la page d'identité. Les informations saisies de mémoire sont la raison pour laquelle des demandes finissent en examen manuel.
- Votre notification d'octroi de visa, accessible hors ligne.
- Une décision sur votre adresse postale australienne.
- Une adresse e-mail que vous consulterez vraiment, car la confirmation contient le numéro de référence dont vous aurez besoin si quelque chose tourne mal.

## Quelle adresse utiliser ?

Un endroit qui conservera encore votre courrier dans quatre semaines, ce qui n'est pas la même question que l'endroit où vous dormez la première nuit. Votre TFN arrive par lettre, et uniquement par lettre.

Un hostel convient s'il a un système de courrier et que vous y êtes réservé pour quelques semaines. Un hostel que vous quittez vendredi ne convient pas. Un ami ou un proche, n'importe où en Australie, avec une adresse stable, est en général la meilleure réponse, même si vous n'y allez jamais.

## Votre TFN change-t-il si votre visa change ?

Non. Un Tax File Number est délivré une fois et gardé à vie. Il n'expire pas avec un visa, ne change pas avec un second visa working holiday et n'a pas à être renouvelé des années plus tard avec un autre visa.

Ce qui doit rester à jour, c'est l'adresse que l'ATO a associée à ce numéro, parce que c'est là que vont le courrier et tout remboursement papier. Quiconque est déjà venu en Australie avec un visa étudiant ou working holiday doit supposer qu'il a déjà un TFN et traiter la démarche comme une récupération.

## Vos dates d'arrivée décident du coût.

Tout le monde est soumis à la même règle sur la demande depuis l'Australie, donc la variable est ce que vous coûte l'écart entre votre arrivée et votre demande.

- Êtes-vous déjà venu en Australie avec un visa donnant le droit de travailler ? Si oui, vous avez déjà un TFN, et en redemander un crée un doublon qui retarde tout.
- Quand comptez-vous travailler ? Quelqu'un qui commence une saison de ski à Thredbo ou à Falls Creek en juin avec un job déjà trouvé a une marge bien plus étroite que quelqu'un qui voyage d'abord.
- Avez-vous une adresse australienne stable, ou quelqu'un dans le pays qui peut en fournir une ?
- La façon dont votre premier employeur est enregistré auprès de l'ATO influence le taux retenu, même une fois votre TFN enregistré.

Une fois que vous travaillez, l'impôt retenu avant que le numéro soit enregistré revient par votre [tax return working holiday](/tax-return), et vous pouvez [estimer votre remboursement d'impôt](/calculator) à tout moment de l'année.
`,
  },
  'tfn-application-delayed': {
    title: "TFN en retard après 28 jours ? 3 points à vérifier",
    description: "Un TFN en retard vient souvent d'une mauvaise adresse ou d'un écart avec les registres de l'immigration. Que vérifier, et pourquoi redemander aggrave tout.",
    body: `
Si votre TFN n'est pas arrivé après 28 jours, la cause est presque toujours une adresse que la lettre n'a pas pu atteindre, des données qui ne correspondent pas aux registres de l'immigration, ou une demande en double. Les 28 jours de l'ATO courent à partir de la réception de la demande : vérifiez d'abord cela. Beaucoup de retards n'en sont pas.

## Les 28 jours sont-ils vraiment écoulés ?

Le délai de traitement court à partir de la date où l'ATO a reçu votre demande, pas du moment où vous avez décidé de la faire ni de votre arrivée en Australie. Les demandes en ligne sont normalement reçues le jour même, donc l'e-mail de confirmation tranche.

Avant 28 jours, il n'y a rien à relancer. La livraison postale en zone régionale ou isolée prend plus de temps qu'en ville : une adresse de station d'élevage isolée dans le Kimberley ou une ferme près de Renmark, ce n'est pas la même chose que le centre de Sydney.

## Pourquoi l'adresse est-elle le premier point à vérifier ?

Votre TFN est une lettre papier et rien d'autre. Il n'y a ni envoi par e-mail, ni SMS, ni copie en ligne à télécharger, donc une adresse que la lettre ne peut pas atteindre, c'est un échec total. C'est la cause la plus courante d'un TFN qui n'arrive jamais.

Les échecs sont banals. Un chiffre inversé dans le code postal. Un hostel où le courrier des anciens clients va dans une boîte que personne ne vide. Une adresse donnée la première semaine et quittée la troisième. Si vous avez déménagé depuis votre demande, contactez l'ancienne adresse avant toute autre démarche.

## Qu'est-ce qui place encore une demande en examen ?

Une différence entre votre demande et les registres du Department of Home Affairs. Un numéro de passeport saisi avec une faute, un nom qui apparaît dans un autre ordre sur la notification de visa que sur le passeport, ou un deuxième prénom indiqué à un endroit et omis à l'autre suffisent chacun à arrêter le traitement automatique.

La troisième cause est un TFN précédent. Un Tax File Number est délivré une fois et gardé à vie : un demandeur qui en avait déjà un pour un visa étudiant ou working holiday antérieur a déjà un numéro, et une nouvelle demande entre en conflit avec lui au lieu de le remplacer. Si vous êtes déjà venu en Australie avec un visa donnant le droit de travailler, partez du principe que la tâche consiste à le retrouver.

## Pourquoi ne faut-il pas faire une seconde demande ?

Parce que c'est le moyen le plus sûr de transformer trois semaines de retard en deux mois. Un doublon crée un dossier contradictoire qu'il faut résoudre à la main avant que l'une ou l'autre demande puisse avancer, et la résolution manuelle est plus lente que la file d'attente où vous étiez déjà.

C'est l'erreur que nous voyons le plus souvent, et la seule action qui aggrave les choses à coup sûr.

## Comment débloquer une demande qui n'avance plus ?

Passé le jour 28, il faut téléphoner. Vous pouvez joindre l'ATO au 13 28 61 pendant les heures ouvrables australiennes, ou au +61 2 6216 1111 depuis l'extérieur de l'Australie, avec votre passeport et le numéro de référence de votre e-mail de confirmation.

Votre question est étroite : le TFN a-t-il été délivré, et à quelle adresse ? S'il l'a été et que la lettre s'est égarée, l'adresse enregistrée est corrigée et la lettre est renvoyée. S'il n'a jamais été délivré, vous apprenez ce qui le bloque. Un agent fiscal peut passer cet appel à votre place, ce qui vous évite l'attente au téléphone et une vérification d'identité fondée sur des documents qu'un résident australien possède et qu'un backpacker arrivé il y a trois semaines n'a souvent pas.

## Peut-on continuer à travailler en attendant ?

Oui. Le retard n'affecte pas votre droit de travailler, et il ne doit pas forcément affecter votre taux de retenue. Votre employeur évite en général le taux de 45 % pendant la fenêtre d'emploi de 28 jours si la Tax File Number Declaration indique que votre demande est en cours, et l'e-mail de confirmation en est la preuve.

Si votre propre fenêtre d'emploi de 28 jours est sur le point de s'achever alors que la demande à l'ATO est encore ouverte, dites-le franchement à la paie. Certains employeurs conservent le taux sur la foi de la correspondance de l'ATO. D'autres appliquent 45 %, parce que c'est ce que dit la règle, et l'excédent revient par votre [tax return working holiday](/tax-return).

## Quelle cause est derrière votre retard ?

Un retard au-delà de 28 jours est presque toujours quelque chose de précis plutôt qu'une file d'attente, et la cause détermine si la solution est un appel ou simplement d'attendre.

- Avez-vous déjà eu un TFN australien, avec n'importe quel visa ? Si oui, il s'agit de le retrouver, et c'est la nouvelle demande qui le bloque.
- L'adresse que vous avez donnée reçoit-elle encore votre courrier ? Le travail de récolte et d'hôtellerie fait bouger plus vite que la poste ne livre.
- Vos données de passeport correspondent-elles exactement à la notification de visa, y compris l'ordre des noms et les deuxièmes prénoms ?
- Existe-t-il une seconde demande ? Si oui, c'est très probablement tout le problème.
- Travaillez-vous pendant le retard, et la déclaration mentionne-t-elle la demande ?

Si une série de paies a déjà tourné à 45 %, l'écart est réglé à la déclaration, et vous pouvez [estimer votre remboursement d'impôt](/calculator) pour voir ce que donne l'année une fois les comptes réglés.
`,
  },
}
