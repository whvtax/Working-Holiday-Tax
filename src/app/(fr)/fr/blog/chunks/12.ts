export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'tfn-identity-documents-required': {
    title: "Documents pour le TFN : votre passeport suffit",
    description: "Pour un TFN en ligne, un working holiday maker n'a besoin que d'un passeport valide avec son visa, sans copie certifiée. Ce que l'ATO vérifie.",
    body: `
Pour la plupart des working holiday makers, le passeport qui porte le visa est le seul document exigé. Rien n'est à téléverser : la demande vérifie votre passeport par voie électronique auprès des registres de l'immigration. Ce qui compte n'est donc pas ce que vous avez en main, mais le fait que ce que vous saisissez corresponde à ce que l'administration détient déjà.

## Que demande vraiment le formulaire ?

Des informations d'identité plutôt que des justificatifs. Votre nom légal complet, exactement comme sur le passeport, votre date de naissance, votre pays de nationalité et votre pays de naissance, le passeport associé à votre visa 417 ou 462 en cours, votre date d'arrivée avec ce visa, une adresse de résidence en Australie et vos coordonnées.

Aucun agent ne lit la notification d'octroi de votre visa. Il s'agit d'une comparaison automatique, qui réussit ou échoue. C'est pour cette raison qu'un détail en apparence anodin peut bloquer toute la demande.

## Quel passeport utiliser si vous en avez plusieurs ?

Celui avec lequel vous êtes entré en Australie et pour lequel le visa a été accordé. Les doubles nationaux déposent souvent leur demande avec le passeport qu'ils considèrent comme leur principal, puis ne trouvent aucune correspondance, parce que le dossier d'immigration est rattaché à l'autre document.

Le même piège touche toute personne qui a renouvelé son passeport après l'octroi du visa. Le nouveau livret a un nouveau numéro, le dossier du visa garde l'ancien, et la vérification échoue alors que vous tenez bien un passeport valide.

## Quelle adresse indiquer ?

Une adresse où le courrier vous parviendra encore dans un mois, car le TFN arrive sous forme de lettre papier et une lettre retournée à l'expéditeur relance l'attente. Une location ou une colocation, un ami ou un proche, une auberge de jeunesse où l'on vous autorise à recevoir du courrier, ou un lieu de travail avec l'accord de l'employeur : tout cela convient.

Une auberge que vous quittez dans dix jours ne convient pas, et c'est le retard que les gens s'infligent le plus souvent eux-mêmes. Notre guide pour [mettre à jour votre adresse auprès de l'ATO](/blog/how-to-update-address-with-ato) explique quoi faire si vous déménagez avant l'arrivée de la lettre.

## Que se passe-t-il avec les noms qui ne sont pas simples ?

Ils sont la première cause de rejet, et la raison est purement mécanique. Les traits d'union, les apostrophes, les caractères accentués, les prénoms multiples, les noms translittérés et les noms d'usage après mariage créent tous des écarts entre la façon dont un nom est imprimé, la façon dont il a été enregistré au moment du visa et la façon dont on le saisit.

Si le passeport indique François avec une cédille et Müller avec un tréma, les formes sans accent sont une différence pour un système qui compare des chaînes de caractères. Omettre un deuxième prénom qui figure sur la notification d'octroi du visa en est une aussi. Recopiez le nom caractère par caractère, tel qu'il est imprimé.

## Quand l'ATO demande-t-il davantage ?

Quand la comparaison automatique échoue. L'ATO peut alors réclamer des copies certifiées ou une vérification d'identité en personne dans un centre de service.

Cette voie est lente, surtout depuis l'étranger. C'est une bonne raison de faire la demande tôt dans votre séjour plutôt que tard.

## Combien coûte un retard, concrètement ?

Trente cents sur chaque dollar que vous gagnez entre-temps. Sans TFN enregistré, l'employeur retient 45 % au lieu de 15 %, ce qui représente 300 $ retenus sur une semaine à 1 000 $, et cela dure jusqu'à ce que le numéro soit enregistré.

La parade, c'est le délai de 28 jours pour la déclaration. Si vous indiquez à votre employeur que la demande est en cours, et que cela figure sur la Tax File Number Declaration, vous restez au taux working holiday pendant cette période. Tout ce qui a été retenu en trop est récupéré à l'émission de l'avis d'imposition (Notice of Assessment) : le coût porte donc sur le calendrier, pas sur le montant.

## Que faire du numéro une fois reçu ?

Le remettre séparément à chaque employeur, puis le protéger. Les working holiday makers sont visés par le vol de TFN, car un TFN volé permet de déposer une déclaration frauduleuse et de faire verser le remboursement ailleurs. La victime s'en aperçoit en général quand sa propre déclaration est rejetée comme doublon.

N'envoyez jamais votre TFN, votre passeport ou la notification d'octroi de votre visa (visa grant notice) à quelqu'un qui ne peut pas prouver une inscription en cours de validité au registre public des tax practitioners du gouvernement. Les faux comptables présents dans les groupes de backpackers sont un problème récurrent, et un numéro d'inscription vérifiable constitue tout le test.

## Votre demande passera-t-elle du premier coup ?

Les documents sont les mêmes pour tout le monde. Passer du premier coup dépend en revanche de détails qui vous sont propres, et chacun des points ci-dessous est un échec courant et évitable.

- Le passeport avec lequel vous faites la demande est-il celui pour lequel le visa a été accordé ?
- Ce passeport a-t-il été renouvelé depuis l'octroi du visa ?
- Votre nom comporte-t-il des caractères ou des prénoms qui ont pu être enregistrés différemment à une étape ou une autre ?
- Votre arrivée a-t-elle bien été enregistrée ? Ce n'est pas toujours le cas si vous faites la demande quelques heures après l'atterrissage.
- L'adresse postale sera-t-elle encore la vôtre dans un mois ?
- Avez-vous déjà eu un TFN ? Dans ce cas, il faut le récupérer plutôt que refaire une demande.

Tout ce qui a été retenu en trop pendant l'attente revient par la [tax return de working holiday maker](/tax-return), et vous pouvez [estimer votre remboursement d'impôt](/calculator) dès que vous savez combien de temps la période a duré.
`,
  },
  'tfn-security-protect-from-fraud': {
    title: "Arnaques au TFN : qui peut le demander, qui non",
    description: "Votre TFN et les données de votre passeport suffisent à usurper votre identité. Qui peut le demander, les arnaques courantes et que faire en cas de fuite.",
    body: `
Six acteurs peuvent légalement vous demander votre TFN : votre employeur une fois que vous avez commencé, l'ATO, votre banque, votre fonds de super, un agent fiscal enregistré qui agit pour vous et les organismes publics comme Services Australia qui versent des prestations auxquelles vous avez droit. Personne d'autre n'y a droit. Toute demande venant d'ailleurs relève de l'erreur ou de la fraude.

## Pourquoi un TFN vaut-il la peine d'être volé ?

Parce qu'il est permanent et qu'il donne accès à de l'argent à votre nom. Quelqu'un qui détient votre TFN et quelques informations d'identité peut déposer une déclaration à votre place et faire verser le remboursement sur son propre compte, tenter d'accéder à votre super ou créer des ABN rattachés à vous.

Un TFN ne s'annule pas comme une carte bancaire. Une fausse déclaration n'apparaît généralement que des mois plus tard, quand votre vraie déclaration est rejetée comme doublon, avec un remboursement gelé le temps de l'enquête.

## Pourquoi les working holiday makers sont-ils particulièrement visés ?

Parce qu'ils découvrent le système, ne savent pas ce qui est normal et évoluent dans des milieux fondés sur la confiance informelle. Les auberges, les groupes Facebook de backpackers et les communautés WhatsApp sont les endroits où l'on cherche de l'aide quand on ne connaît pas la fiscalité australienne, et les personnes qui s'y proposent ne sont pas contrôlées.

Le schéma est toujours le même. On vous offre de déposer votre déclaration ou de réclamer votre super pour une petite somme, on vous demande une photo de votre passeport et de la notification d'octroi du visa, votre TFN, votre date de naissance, votre adresse, parfois vos coordonnées bancaires. Puis la déclaration est déposée avec le remboursement dirigé ailleurs, et le compte disparaît.

## Quels sont les signaux d'alerte ?

Le premier règle presque tous les cas : aucune inscription vérifiable au registre public des tax practitioners du gouvernement. L'inscription est publique, vérifiable en moins d'une minute, et quelqu'un qui refuse de vous donner un numéro a déjà répondu à la question.

- Un paiement demandé en espèces, en cryptomonnaie ou en cartes-cadeaux
- Aucune adresse professionnelle, une activité uniquement via une messagerie
- Un gros remboursement promis avant que quiconque ait regardé votre situation
- Une demande de vos mots de passe, ou de partager votre écran
- Une pression pour agir tout de suite, avec une échéance en général invoquée

La demande de mot de passe mérite d'être soulignée. Un agent enregistré accède à vos données par son propre canal d'agent et n'a jamais besoin de vos identifiants myGov. Quiconque les réclame n'agit pas en tant qu'agent, quel que soit le nom qu'il se donne.

## Comment la fuite s'est-elle le plus souvent produite ?

Rarement par un moyen sophistiqué. Les causes récurrentes sont les formulaires d'embauche de fausses offres d'emploi qui exigent des pièces d'identité complètes avant tout travail, les documents photographiés ou laissés sur les ordinateurs partagés d'une auberge, et les TFN envoyés par WhatsApp à quelqu'un présenté comme le service paie.

Le point commun est une demande qui semble administrativement normale et qui arrive alors que vous n'avez aucun point de comparaison. Connaître la liste des cinq acteurs transforme une question de jugement en simple vérification.

## Que faire si c'est déjà arrivé ?

Agissez le jour même où vous le soupçonnez. Contactez la ligne d'assistance de l'ATO pour la sécurité de l'identité et dites que votre TFN est compromis. Ils peuvent placer sur votre dossier un marqueur qui exige une vérification supplémentaire avant tout traitement à votre nom, et dans certains cas délivrer un nouveau numéro.

Ensuite, sécurisez tout ce qui y est rattaché. Changez vos identifiants myGov et activez la connexion la plus forte disponible, prévenez votre fonds de super, car les soldes sont une cible à part entière, et vérifiez si une déclaration a déjà été déposée à votre nom cette année. Le marqueur est gratuit et reste protecteur pendant des années.

## Et si une fausse déclaration a déjà été déposée ?

Votre vraie déclaration peut quand même être déposée et le remboursement reste le vôtre, mais il passe sur une voie plus lente le temps que le doublon soit examiné. C'est un retard de plusieurs mois et non une perte, et cela se règle en général avec l'ATO plutôt qu'avec la police.

Signalez-le, conservez toute la correspondance et attendez-vous à des vérifications d'identité supplémentaires sur tout ce qui suit. Se trouver hors d'Australie rend la démarche nettement plus difficile.

## À quel point êtes-vous exposé aujourd'hui ?

Les règles de protection sont les mêmes pour tout le monde. Votre exposition, elle, ne l'est pas, et la remédiation depuis l'étranger est plus lente.

- Avez-vous déjà envoyé des pièces d'identité à quelqu'un que vous ne pouviez pas vérifier ?
- Votre compte myGov utilise-t-il un numéro de téléphone qui fonctionne encore ? Une carte SIM australienne désactivée vous enferme hors de votre propre dossier.
- Les coordonnées de votre fonds de super sont-elles à jour ? Les fonds sont une cible distincte.
- Avez-vous déjà quitté l'Australie ?
- Une déclaration a-t-elle été déposée à votre nom cette année sans que vous l'ayez déposée ?
- Un ABN est-il enregistré à votre nom sans que vous l'ayez demandé ?

Les déclarations déposées dans le cadre de la [tax return de working holiday maker](/tax-return) passent par un canal professionnel vérifiable plutôt que par un compte anonyme, et vous pouvez [estimer vous-même votre remboursement d'impôt](/calculator) avant d'avoir affaire à qui que ce soit.
`,
  },
  'who-can-ask-for-your-tfn': {
    title: "Qui a le droit de vous demander votre TFN ?",
    description: "Seuls six acteurs peuvent légalement le demander : votre employeur, l'ATO, votre fonds de super, votre banque, un agent fiscal et Services Australia.",
    body: `
Six acteurs peuvent légalement vous demander votre Tax File Number : votre employeur une fois embauché, l'ATO, votre fonds de superannuation, votre banque, un agent fiscal enregistré qui agit pour vous et Services Australia si vous demandez une prestation. Tous les autres peuvent poser la question, vous pouvez refuser, et ce refus ne peut pas légalement être retenu contre vous.

## Pourquoi la liste est-elle aussi courte ?

Parce qu'un TFN associé à un passeport forme un kit d'identité exploitable, et que la loi australienne sur la vie privée le traite en conséquence. La collecte est réservée aux organisations qui ont une vraie raison fiscale de le détenir, et chacune doit expliquer pourquoi elle en a besoin, le conserver en sécurité et ne l'utiliser que pour cet usage.

Grâce à cette liste courte, vous n'avez jamais à juger si une demande est raisonnable. Si celui qui demande n'y figure pas, la réponse est non, sans avoir à vous justifier.

## Quand votre employeur a-t-il le droit de le demander ?

Après votre embauche, pas avant. La demande légitime prend la forme d'une Tax File Number Declaration lors de l'intégration, un formulaire standard de l'ATO, et l'employeur utilise le numéro pour appliquer le bon taux de 15 % de working holiday maker et déclarer vos revenus.

Une demande avant que vous ayez accepté un poste est le signal d'alerte, et c'est la façon la plus courante dont les backpackers se font piéger. Une agence de recrutement n'a pas besoin de votre TFN pour vous proposer des missions, et si vous n'avez pas accepté d'offre, il n'y a aucune déclaration à remplir.

## Qui n'y a pas droit ?

Quiconque le demande pour une raison autre que fiscale. Les demandes que reçoivent réellement les working holiday makers viennent d'un ensemble prévisible d'acteurs.

- Les propriétaires et les agences immobilières, y compris pour un dossier de location
- Les auberges de jeunesse, quelle que soit la raison
- Les opérateurs de téléphone, d'internet et de services publics
- Les agences de recrutement, avant que vous soyez embauché
- D'autres voyageurs, des amis ou n'importe qui dans un groupe de discussion
- Toute personne qui propose une aide fiscale mais ne peut pas présenter d'inscription en cours de validité

Refuser à l'un d'eux n'est pas une infraction et ne peut pas légalement servir à vous refuser un logement, un service ou un emploi.

## À quoi ressemblent les arnaques en pratique ?

Elles ne sont pas sophistiquées et n'ont pas besoin de l'être, car elles visent des gens dans leurs premières semaines dans un pays nouveau.

**La fausse offre d'emploi.** Une offre qui arrive sans que vous l'ayez sollicitée, réclame votre TFN et une photo de votre passeport avant tout entretien, et n'aboutit jamais à un vrai travail. Le résultat, c'est un kit d'identité, pas un emploi.

**L'agent de remboursement sur les réseaux sociaux.** Un compte qui propose de déposer votre déclaration, demande votre TFN et vos identifiants de compte gouvernemental, et promet souvent un montant avant d'avoir vu le moindre de vos revenus. Les déclarations sont déposées avec des remboursements versés sur des comptes que la victime ne contrôle pas.

**Le formulaire de paie du panneau d'affichage de l'auberge.** Un formulaire papier qui collecte des TFN pour un travail au noir qui ne se concrétise jamais, laissé là où une centaine de personnes vont le remplir.

Le signe constant, c'est la promesse d'un montant précis de remboursement avant que quiconque ait vu vos relevés de revenus. Personne ne peut connaître ce chiffre à l'avance, et celui qui prétend le faire ne fait pas un vrai travail fiscal.

## Comment vérifier quelqu'un avant de lui confier quoi que ce soit ?

Tout agent fiscal en exercice en Australie figure dans le registre public consultable des tax practitioners du gouvernement. La vérification prend une minute, et un cabinet sérieux s'attend à ce que vous la fassiez.

Deux choses dont un vrai agent n'a jamais besoin : le mot de passe de votre compte gouvernemental et vos identifiants bancaires. L'accès à vos données auprès de l'ATO passe par un canal professionnel, jamais en se connectant à votre place, et toute demande de ces identifiants est une fraude. Les déclarations préparées pour vous ici sont vérifiées et validées par un agent fiscal enregistré avant d'être déposées auprès de l'ATO, et cette inscription se vérifie sur le même registre public.

## Que faire si vous l'avez déjà donné à la mauvaise personne ?

Rien de catastrophique ne se produit automatiquement, et un TFN seul ne suffit pas à vider un compte en banque. Le risque, c'est une fausse déclaration déposée à votre nom, ou un compte ouvert avec votre identité, et les deux sont détectables.

L'ATO peut placer un signalement sur votre dossier après une compromission d'identité, ce qui vaut mieux que d'attendre pour voir. Appelez-le au 13 28 61 et dites clairement ce qui a été communiqué et à qui. Si vous avez aussi donné les identifiants d'un compte gouvernemental, changez-les avant toute autre chose.

## La demande que vous avez devant vous est-elle légitime ?

La liste de ceux qui peuvent légalement demander est fixe, mais le caractère légitime d'une demande précise dépend du contexte.

- Avez-vous déjà accepté le poste ? C'est tout le test pour une demande d'employeur.
- La personne qui demande est-elle un praticien enregistré ? Cela se vérifie en une minute sur le registre public.
- Quelqu'un détient-il aussi les identifiants de votre compte gouvernemental en plus de votre TFN ? C'est une situation nettement pire que le TFN seul.
- Demandez-vous une prestation à Services Australia ? C'est le seul contexte gouvernemental, hors ATO, où la demande est légitime.
- L'avez-vous donné à un fonds de super ? Ce n'est pas un risque mais une nécessité : un fonds sans votre TFN taxe les cotisations à un taux plus élevé et a du mal à rattacher le compte à vous quand vous [réclamez votre super après avoir quitté l'Australie](/superannuation).
`,
  },
  'tfn-australian-address-no-fixed-address': {
    title: "Sans adresse fixe : obtenir quand même un TFN",
    description: "Votre TFN arrive par courrier : il vous faut une adresse australienne qui garde le courrier environ quatre semaines. Auberge, ami ou boîte postale.",
    body: `
Une demande de TFN exige une adresse australienne, car le TFN arrive par lettre postale. Il n'exige pas de bail. Une auberge, le domicile d'un ami, un lieu de travail ou un service de garde de courrier conviennent, à condition que le courrier soit bien récupéré pendant environ quatre semaines après votre demande.

## Qu'est-ce que l'ATO accepte comme adresse ?

L'ATO demande une adresse résidentielle ou postale en Australie et ne vérifie pas que vous y habitez. Il lui faut un endroit où la lettre sera récupérée plutôt que renvoyée à l'expéditeur, ce qui est une exigence plus basse que la plupart des demandeurs ne le croient.

- Une location, une colocation ou une sous-location
- Une auberge de jeunesse ou un hébergement pour backpackers
- Le domicile d'un ami ou d'un proche
- L'adresse d'un lieu de travail, avec l'accord de l'employeur
- Un service de garde de courrier avec une adresse de rue

Une adresse de rue fonctionne plus facilement qu'une boîte postale, ce qu'il vaut mieux savoir avant d'en payer une.

## Pourquoi l'adresse d'une auberge est-elle risquée ?

L'auberge est le choix le plus courant et l'échec le plus courant. Les grandes auberges traitent des centaines de courriers par semaine, des lettres se perdent, sont jetées ou renvoyées, et presque aucune ne fait suivre le courrier d'un client parti.

Si une auberge est la seule option réaliste, demandez à l'accueil s'ils gardent le courrier par nom de client et commencez à vérifier après dix jours. La limite haute de l'ATO est de 28 jours, mais la lettre arrive en général en moins de deux semaines.

## Que se passe-t-il si vous déménagez avant l'arrivée de la lettre ?

Déménager avant que la lettre n'arrive est la première raison pour laquelle un working holiday maker ne reçoit jamais son TFN. Une fois la lettre postée à l'ancienne adresse, l'ATO n'en envoie pas automatiquement une autre, et une lettre retournée ne déclenche pas de nouvel envoi.

Le numéro lui-même n'est pas perdu, car un TFN est attribué une fois pour toutes. Seule la livraison a échoué. Le récupérer passe par la correction de l'adresse dans le dossier de l'ATO et la confirmation du numéro, pas par une nouvelle demande, qui crée un doublon plus long à démêler. Notre guide pour [mettre à jour votre adresse auprès de l'ATO](/blog/how-to-update-address-with-ato) explique la correction.

## Quelle adresse utiliser en pratique ?

Classez les options selon la probabilité qu'un être humain remarque la lettre. Le domicile établi d'un ami ou d'un proche est la meilleure réponse, parce que de vrais foyers ouvrent leur courrier. Vient ensuite le lieu de travail, quand l'employeur est d'accord, et les fermes le font couramment pour leur personnel saisonnier.

- La résidence établie d'un ami ou d'un proche
- L'adresse d'un lieu de travail avec l'accord de l'employeur
- Une auberge où vous avez réservé quatre semaines ou plus et où l'on a confirmé garder le courrier par nom
- Un service de réexpédition de courrier avec une adresse de rue

Ce qui fait échouer les livraisons est prévisible : partir avant l'arrivée de la lettre, les auberges qui vident chaque semaine le courrier non réclamé, et un mauvais numéro d'appartement sur le formulaire.

## Ce retard vous coûte-t-il vraiment de l'argent ?

Pas directement. La demande de TFN est gratuite, le numéro est permanent, et l'impôt retenu en trop revient via la tax return : une lettre en retard ne vous fait donc pas perdre d'argent au final.

Ce qu'elle coûte, c'est de la trésorerie pendant les mois intermédiaires, et cela dépend d'un point distinct de la lettre. Dès votre premier jour de travail, vous avez 28 jours pour donner un TFN à votre employeur avant qu'il doive retenir 45 % au lieu de 15 %, et le formulaire de déclaration permet d'indiquer qu'une demande est en cours. Ce qui décide de votre paie, c'est que vous ayez prévenu l'employeur, pas que la lettre soit arrivée. Notre guide sur [le numéro de référence TFN](/blog/tfn-reference-number-before-tfn-arrives) explique ce que vous pouvez utiliser en attendant.

## Qu'est-ce qui décide si votre demande se passe bien ?

Trois faits, tous sous votre contrôle le jour où vous faites la demande. L'adresse recevra-t-elle encore votre courrier dans quatre semaines ? Les informations correspondent-elles exactement à votre passeport, car un écart avec les registres de l'immigration est la raison habituelle d'un rejet pur et simple ? Et votre employeur a-t-il été prévenu que la demande est en cours, ce qui protège votre taux de retenue pendant l'attente ?

Nous traitons les demandes de TFN avec une adresse vérifiée qui garde le courrier pendant toute la durée de la demande, et nous vous confirmons le numéro directement, ce qui supprime ce point de défaillance pour ceux qui déménagent encore toutes les quelques semaines. Considérez la lettre comme un document de grande valeur : notre guide pour [protéger votre TFN](/blog/tfn-security-protect-from-fraud) explique qui a le droit de le demander.
`,
  },
  'abn-invoicing-requirements-australia': {
    title: "Que doit contenir une facture avec ABN ?",
    description: "Une facture ABN indique votre nom, votre ABN, la date, une description du travail et le total. La GST n'y figure que si vous y êtes inscrit.",
    body: `
Une tax invoice émise avec un [ABN](/abn) doit indiquer votre nom, votre ABN, la date, une description du travail et le total à payer. Les lignes de GST n'y figurent que si vous êtes inscrit à la GST. Si vous omettez l'ABN, le payeur doit retenir 47 % du paiement.

## Que doit contenir toute facture ABN ?

Cinq éléments sur n'importe quelle facture, quel que soit le montant. Le nom doit être le nom légal enregistré pour l'ABN, pas un nom commercial inventé.

- Votre nom, exactement comme il est enregistré pour l'ABN
- Votre ABN
- La date d'émission
- Une description des biens ou des services
- Le montant total à payer

Dès que la facture atteint 75 $ hors GST et que vous êtes inscrit à la GST, il faut davantage : la mention Tax Invoice bien visible, le montant de GST ou une indication que le total inclut la GST, et, pour les factures de 1 000 $ ou plus, le nom ou l'ABN de l'acheteur.

## Faut-il afficher la GST ?

Seulement si vous y êtes inscrit, et la plupart des working holiday makers ne le sont pas. L'inscription est obligatoire une fois que le chiffre d'affaires dépasse 75 000 $ sur un exercice financier, et la plupart des revenus ABN des backpackers restent bien en dessous.

Afficher de la GST sans être inscrit pose un vrai problème : vous facturez une taxe que vous ne pouvez pas reverser, et le payeur réclame un crédit auquel il n'a pas droit. Le transport de passagers en rideshare fait exception et exige l'inscription dès le premier dollar, ce que notre guide sur [la GST et l'ABN](/blog/gst-and-abn-for-working-holiday-makers) explique.

## Que se passe-t-il si vous oubliez l'ABN ?

La règle de retenue en l'absence d'ABN oblige une entreprise qui paie des biens ou des services sans ABN indiqué à retenir 47 % et à les verser à l'ATO. Elle s'applique même si vous avez un ABN valide et avez simplement oublié de l'écrire sur la facture.

L'argent n'est pas perdu. Il est porté au crédit de votre dette d'impôt, et l'excédent revient au dépôt de la [tax return](/tax-return). Ce que cela coûte, c'est l'accès à cet argent : sur une facture de 2 000 $, 940 $ restent chez l'ATO pendant des mois.

## Pourquoi des factures sont-elles rejetées ?

Presque jamais à cause des règles fiscales, presque toujours à cause de petits écarts qui bloquent net un système automatique. Les payeurs vérifient un ABN avec l'outil public ABN Lookup, et si le nom enregistré ne correspond pas à la facture, elle n'avance pas.

- Un nom commercial sur la facture alors que l'ABN est enregistré à votre nom personnel
- Un chiffre faux dans l'ABN, qui fait échouer totalement la recherche
- Aucun numéro de facture, alors que le payeur a besoin d'une référence unique
- Une date écrite à l'américaine plutôt qu'au format JJ/MM/AAAA
- Aucune coordonnée bancaire, ce qui empêche un payeur de bonne volonté de payer

## Qu'est-ce qui vous fait vraiment payer ?

Des champs conformes font accepter une facture. Des habitudes la font payer. La plus efficace est de facturer le jour où le travail se termine, car une facture tardive venant de quelqu'un qui a quitté la région est facile à ignorer.

- Facturez le jour où le travail est terminé
- Indiquez clairement les conditions de paiement : sept jours est la norme pour la main-d'œuvre, et le silence invite à trente
- Citez le bon de commande ou le nom du superviseur quand le site en utilise
- Relancez par écrit dès le premier jour de retard, poliment, avec la facture de nouveau jointe
- Faites un ABN Lookup sur un payeur inconnu avant un gros chantier : cela prend quelques secondes et révèle les entités radiées

## Qu'est-ce qui décide si le problème est la facture ou l'arrangement ?

La facture n'est que de la paperasse. Savoir si vous devriez facturer tout court est une question bien plus importante. Si l'entreprise fixe vos horaires, supervise le travail et fournit le matériel, c'est un emploi, et une facture n'y change rien.

Si on vous demande de facturer des shifts supervisés, c'est du faux travail indépendant (sham contracting), et cela vous coûte les 12 % de [superannuation](/superannuation), le taux de l'award, les penalty rates et la couverture d'accident du travail. Notre guide sur [le test employé ou prestataire](/blog/employee-vs-contractor-australia) décrit le test, à appliquer avant la première facture.

## Que faire avant de quitter l'Australie ?

Deux choses, dont aucune n'est la facturation. Les factures impayées restent légalement recouvrables après votre départ, mais les récupérer depuis un autre pays à l'échelle d'un backpacker est presque impossible : des délais courts et des relances rapides pendant que vous êtes sur place sont donc le seul système qui fonctionne.

La seconde, c'est l'ABN lui-même, à annuler quand les missions s'arrêtent. Laissé ouvert, il génère de la correspondance de l'ATO et des obligations de déclaration pendant des années. Notre guide pour [annuler un ABN](/blog/how-to-cancel-your-abn) explique par quoi commencer.
`,
  },
  'abn-deductions-business-expenses': {
    title: "Déductions ABN : ce que les contractors peuvent réclamer",
    description: "Un revenu ABN ouvre des déductions plus larges : matériel, part du téléphone, frais de véhicule, assurance. Et les justificatifs attendus par l'ATO.",
    body: `
Un titulaire d'ABN déduit ses vraies dépenses professionnelles de son revenu avant le calcul de l'impôt, en contrepartie de l'absence de toute retenue. Les outils, l'équipement de protection, les frais de fonctionnement du véhicule, la part professionnelle du téléphone et d'internet, les licences et les honoraires d'agent sont tous admis. Les justificatifs sont plus stricts que pour les salariés, et c'est là que les demandes échouent.

## Quel est le vrai critère d'une déduction ?

Que la dépense ait été engagée pour gagner votre revenu ABN, et que vous puissiez le montrer. La plupart des demandes échouent sur la seconde partie.

Une demande est refusée faute de trace du coût, faute de trace du lien avec le travail, ou faute de base défendable pour la répartition entre usage professionnel et privé. Une dépense réellement engagée mais impossible à prouver n'est pas une déduction.

## Que peut réclamer un working holiday maker avec un ABN ?

Les catégories qui comptent dépendent du type de travail indépendant. Un livreur et un contractor agricole avec son propre équipement n'ont presque rien en commun, à part le téléphone.

- Les outils et l'équipement nécessaires au travail, comme une tronçonneuse pour l'abattage ou un sac de livraison pour un coursier
- Les vêtements de protection et l'équipement de sécurité : gilets haute visibilité, chaussures à coque en acier, gants, casques de chantier
- Les frais de fonctionnement du véhicule pour les déplacements professionnels : carburant, immatriculation, assurance et entretien, calculés au prorata des kilomètres professionnels
- Le pourcentage professionnel des frais de téléphone mobile et d'internet
- Les licences et certificats que le travail exige réellement, comme un White Card ou un RSA
- Les frais bancaires et de paiement sur un compte professionnel, y compris les commissions des plateformes
- Les honoraires pour la gestion de vos affaires fiscales

Tout ce qui sert à la fois au travail et à un usage privé n'est déductible qu'à hauteur du pourcentage professionnel. Un téléphone utilisé à 60 % pour le travail est déductible à 60 %, et ces 60 % ne peuvent pas être une estimation au hasard.

## Quels justificatifs l'ATO exige-t-il vraiment ?

Un reçu ou une tax invoice indiquant le fournisseur, la date, le montant et ce qui a été acheté, pour chaque demande. Les éléments répartis exigent aussi une base pour le pourcentage : un carnet de bord (logbook) pour les véhicules, une période d'usage représentative pour le téléphone et internet.

Deux seuils changent ce qu'il faut fournir. Un achat de 300 $ ou moins est déductible en totalité l'année où vous l'achetez, au lieu d'être amorti. À partir de l'année de revenus 2026-27, une déduction forfaitaire de 1 000 $ existe pour les personnes éligibles, sans reçus, mais elle n'est pas disponible pour les déclarations 2025-26. Notre guide sur [la déduction forfaitaire de 1 000 $](/blog/1000-dollar-instant-deduction-rule-2026) explique quand prendre le forfait et quand détailler.

## Qu'est-ce qui ne peut pas être déduit, même si cela semble normal ?

Plusieurs coûts paraissent déductibles et ne le sont pas, et ils expliquent la plupart des demandes refusées ici. Le point commun est un coût privé qui survient autour du travail plutôt qu'un coût du travail lui-même.

- Le trajet entre le domicile et un lieu de travail régulier, qui reste un déplacement privé, même avec un départ très tôt
- Les vêtements ordinaires, par opposition aux vêtements de protection ou à un uniforme de marque
- Les repas et boissons pendant la journée de travail, privés pour les contractors comme pour les salariés
- Le logement à votre propre base, y compris si vous y travaillez
- Les coûts engagés avant l'enregistrement de l'ABN et le début de l'activité

Les règles sur les véhicules représentent le plus d'argent et le plus d'incompréhensions. Notre guide sur [le carnet de bord du véhicule avec un ABN](/blog/vehicle-logbook-abn-working-holiday) explique ce qu'un logbook doit contenir pour être accepté.

## Pourquoi les déductions comptent-elles plus avec un ABN qu'avec un salaire ?

Parce que rien n'a été retenu. Avec un salaire, l'employeur a déjà prélevé l'impôt, donc une déduction augmente un remboursement. Avec un revenu ABN, la totalité de la facture vous est parvenue et l'impôt reste dû : une déduction réduit donc un montant à payer.

Cela change l'enjeu, pas l'arithmétique. Un salarié qui oublie des déductions obtient un remboursement plus petit. Un contractor reçoit une facture plus lourde, et si rien n'a été mis de côté pendant l'année, elle arrive sans argent pour la payer.

## Pourquoi tant de demandes ne sont-elles jamais faites ?

Parce que les justificatifs n'ont jamais été gardés, et non parce que les dépenses n'ont pas eu lieu. Le travail agricole en indépendant avec son propre matériel, ou la livraison avec son propre véhicule, engendre des frais déductibles en continu et presque aucun papier n'est conservé.

Il y a aussi un écart de connaissances entre les deux régimes. Les personnes qui ont travaillé comme salariées avant de passer à un ABN gardent les règles des salariés, et le traitement des véhicules et du matériel n'est pas le même.

## Lesquels de ces points s'appliquent à votre année ?

Les déductions disponibles, et leur capacité à résister à un contrôle, dépendent de la façon dont le travail était organisé et de ce que vous avez conservé.

- Le type de travail indépendant, car les catégories diffèrent entre livraison, travail agricole et métiers du bâtiment.
- Si vous avez gardé vos reçus au fur et à mesure, ce qui rend une demande défendable.
- S'il existe un logbook pour toute demande liée à un véhicule, l'élément le plus souvent refusé.
- Si chaque achat coûte plus ou moins de 300 $, ce qui détermine la déduction immédiate ou l'amortissement.
- Si, à partir de 2026-27, la déduction forfaitaire de 1 000 $ dépasse ce que vous pourriez détailler.
- Si vous avez aussi eu un salaire la même année, car cette retenue absorbe souvent l'impôt sur l'ABN.
- Si vous vous êtes inscrit à la GST, ce qui détermine si les montants sont réclamés avec ou sans GST.

La position d'ensemble se calcule dans la [tax return de working holiday maker](/tax-return). Vous pouvez [estimer votre remboursement d'impôt](/calculator) quand vous savez ce que chaque côté de l'année représente.
`,
  },
  'uber-doordash-rideshare-abn-working-holiday': {
    title: "Uber et DoorDash : ABN, GST et impôt",
    description: "Le rideshare exige l'inscription à la GST dès le premier dollar, pas la livraison. Bien s'inscrire, le BAS trimestriel et les déductions.",
    body: `
Le travail via une plateforme est du travail indépendant, pas un emploi. Il vous faut un ABN, rien n'est retenu sur ce que la plateforme vous verse, et aucune superannuation n'est payée. La règle qui piège les gens, c'est la GST : le rideshare exige l'inscription dès le premier dollar sans aucun seuil, alors que la livraison de repas suit le seuil ordinaire de 75 000 $.

## Pourquoi le travail via une plateforme est-il considéré comme indépendant ?

Parce que la plateforme vous paie pour des courses effectuées et non pour votre temps, et qu'elle ne contrôle pas vos horaires comme le ferait un employeur. Uber, DoorDash, Menulog et les autres engagent leurs livreurs et chauffeurs comme contractors indépendants, une classification réelle ici, à la différence de l'emploi déguisé qu'on voit dans les cafés et les fermes.

Il vous faut donc un ABN avant de pouvoir être inscrit sur la plateforme, vous mettez votre impôt de côté vous-même, vous recevez un relevé annuel de la plateforme plutôt qu'un income statement, et vous pouvez déduire les coûts liés au travail. Vous ne recevez en revanche ni super, ni taux d'award, ni couverture d'accident du travail.

## Quelle est la règle de GST qui piège presque tout le monde ?

Pour un travail ordinaire avec ABN, l'inscription à la GST n'est exigée que lorsque le chiffre d'affaires dépasse 75 000 $ sur un exercice financier. Le rideshare ne suit pas cette règle. Les services de transport de passagers, ce qui inclut Uber, Ola, Didi et leurs équivalents, exigent l'inscription à la GST dès la première course.

La livraison de repas est différente. Uber Eats, DoorDash et Menulog relèvent du seuil standard de 75 000 $ : un livreur qui ne fait que de la livraison n'a donc en général aucune obligation de GST. La distinction suit le travail et non l'appli : si vous ajoutez des courses de passagers à une semaine de livraison, l'obligation d'inscription du rideshare est déclenchée.

L'inscription entraîne une obligation de Business Activity Statement, en général trimestrielle, qui dure jusqu'à ce que vous l'annuliez. Un chauffeur qui s'est inscrit puis a ignoré les déclarations peut se voir réclamer rétroactivement la part de GST de chaque course effectuée.

## Que pouvez-vous déduire du revenu de plateforme ?

Tout ce qui a réellement été engagé pour faire le travail, et pour la conduite la liste est longue, car le véhicule est l'outil de l'activité.

- Carburant, entretien, immatriculation, assurance et amortissement, calculés au prorata des kilomètres professionnels
- Les intérêts d'un prêt auto, avec le même prorata
- Le téléphone mobile et les données pour l'appli
- Les péages et le stationnement pendant que vous travaillez
- Le nettoyage du véhicule
- Le matériel de livraison : sac, casque, entretien et réparations du vélo pour les coursiers
- Les commissions et frais de service de la plateforme

Les frais de véhicule peuvent être réclamés au tarif par kilomètre, ou en frais réels appuyés par un logbook. La méthode du logbook donne en général une déduction plus élevée pour quiconque roule de nombreuses heures, et c'est aussi la méthode qui échoue le plus souvent faute de justificatifs. Notre guide sur [le carnet de bord du véhicule](/blog/vehicle-logbook-abn-working-holiday) explique ce qu'il doit contenir.

## L'ATO sait-il déjà ce que vous avez gagné ?

Oui. Les plateformes déclarent directement à l'ATO les revenus annuels dans le cadre du Sharing Economy Reporting Regime : le chiffre de vos revenus existe donc dans les systèmes de l'ATO avant même que vous déposiez quoi que ce soit.

Sous-déclarer ses revenus de plateforme est donc l'omission la moins efficace qui soit. Cela rend aussi le multi-apping plus simple qu'il n'y paraît : chaque plateforme déclare séparément, et une déclaration qui couvre trois plateformes est rapprochée de trois rapports.

## Comment le multi-apping fonctionne-t-il côté impôt ?

Comme une seule activité, pas trois. Faire tourner Uber Eats, DoorDash et Menulog en même temps, c'est une seule entreprise individuelle (sole trader) : un seul ABN, des revenus additionnés entre plateformes, des dépenses regroupées, un seul ensemble de postes professionnels dans la déclaration.

Les dépenses n'ont pas besoin d'être réparties entre les applis, car le vélo ou la voiture sert l'activité et non une plateforme en particulier. Un seul tableur avec la date, la plateforme, les gains bruts et les kilomètres porte tout le reste.

## Pourquoi cela tourne-t-il si souvent mal pour les working holiday makers ?

Parce que rien n'est retenu et que rien ne vous alerte. Quelqu'un qui gagne 25 000 $ en livraison sur une année n'a subi aucune retenue à aucun moment, et le taux working holiday de 15 % sur ce revenu reste dû, payable en une seule fois au dépôt.

Celui qui a aussi eu des salaires ordinaires s'en sort en général mieux, parce que le PAYG retenu sur ces salaires absorbe souvent l'impôt sur le revenu de plateforme. Celui qui n'a fait que de la plateforme, sans rien mettre de côté, reçoit une facture.

## Comment votre année de plateforme s'est-elle composée ?

Le travail via une plateforme est simple une fois les inscriptions correctes. Ce que vous devez dépend de la composition de l'année.

- Si vous avez transporté des passagers ou livré des repas, ce qui décide entièrement de la question de la GST.
- Si vous avez aussi eu des salaires, car la retenue sur ceux-ci couvre souvent l'impôt de la plateforme.
- S'il existe un logbook, ce qui détermine la part des frais de véhicule déductible.
- Combien vous avez mis de côté au fil de l'eau.
- Si vous vous êtes inscrit à la GST et avez déposé les déclarations d'activité qui vont avec.
- Si l'ABN et l'éventuelle inscription à la GST ont été annulés à l'arrêt de l'activité.

La position d'ensemble se calcule dans la [tax return de working holiday maker](/tax-return), et vous pouvez [estimer votre remboursement d'impôt](/calculator) pour voir si votre année se termine par un remboursement ou par un montant à payer.
`,
  },
  'tax-return-without-tfn-australia': {
    title: "Travaillé sans TFN ? Récupérez l'impôt retenu en trop",
    description: "Sans TFN pendant l'année, 45 % ont été retenus, mais vous pouvez obtenir un TFN, déposer et récupérer la différence. Les étapes d'une tax return tardive.",
    body: `
Oui, vous le pouvez, et cette déclaration est généralement la plus rentable de votre séjour. Sans TFN enregistré, votre employeur a dû retenir 45 % au lieu de 15 %, et la différence revient par la tax return. Il vous faut un TFN avant de pouvoir déposer quoi que ce soit, et il peut encore être obtenu après votre départ.

## Combien coûte réellement une période sans TFN ?

Trente cents sur chaque dollar gagné, pendant toute la durée de la période. Avec un TFN enregistré, le taux working holiday de 15 % s'applique aux 45 000 premiers dollars. Sans lui, 45 % sont retenus dès le premier dollar : sur une semaine à 1 000 $, 300 $ sont retenus au lieu de vous être versés.

Rien n'est perdu. L'impôt retenu en trop est crédité au dépôt de la déclaration. Ce que cela coûte entre-temps, c'est de la trésorerie, et c'est pourquoi une année sans TFN donne généralement le plus gros remboursement qu'un working holiday maker voit.

## Pourquoi ne pouvez-vous pas déposer sans TFN ?

Parce que le TFN est l'identifiant qui relie les revenus déclarés par l'employeur à vous. L'ATO détient les salaires déclarés et l'impôt retenu, mais tant qu'aucun TFN n'existe pour les y rattacher, il n'y a aucun avis d'imposition (Notice of Assessment) à établir.

C'est pour cela que des gens abandonnent cet argent. Ils pensent que l'impôt s'est évaporé parce qu'ils n'ont jamais eu de numéro. Ce n'est pas le cas. Il attend, rattaché à la déclaration de l'employeur, d'être mis en correspondance, et c'est la demande de TFN qui y parvient. La demande est gratuite et peut être faite depuis l'étranger avec une vérification d'identité.

## Que se passe-t-il pour les justificatifs si vous n'avez rien gardé ?

Presque tout ce qu'il faut existe déjà dans les systèmes de l'ATO. Les employeurs déclarent les salaires et les retenues via Single Touch Payroll, et cette déclaration est la base de la tax return : une boîte à chaussures de fiches de paie perdues est donc un problème plus petit qu'on ne le ressent.

Le vrai problème, c'est un employeur qui n'a jamais rien déclaré, ce qui arrive dans les secteurs payés au noir. Il faut alors reconstituer le revenu, et notre guide sur [la tax return pour un travail payé au noir](/blog/cash-in-hand-tax-return) explique quelles preuves pèsent.

## Et si l'année est déjà passée ?

Un exercice financier antérieur reste déposable. Une année non déclarée reste en général déposable, même longtemps après, et les working holiday makers déposent couramment pour une année où ils ont quitté le pays.

Deux choses changent avec le temps. Les dossiers des employeurs sont plus difficiles à réclamer quand les déclarations étaient lacunaires, et la vérification d'identité est plus lente depuis l'étranger. Aucune des deux ne ferme la porte, et attendre ne réduit pas, en général, l'impôt retenu en trop que vous pouvez récupérer.

## Qu'est-ce qui change si vous avez déjà quitté le pays ?

La mécanique est la même, la friction est différente. Une déclaration peut être déposée de n'importe où, mais le remboursement est versé sur un compte bancaire australien : un compte fermé sur le chemin de l'aéroport devient donc l'obstacle, plutôt que l'impôt.

Une première déclaration, un TFN tout juste délivré et une adresse à l'étranger, c'est la combinaison qui a le plus de chances de déclencher une vérification d'identité manuelle à l'ATO. C'est un retard et non un rejet, et des documents cohérents le raccourcissent.

## Que trouve-t-on d'autre dans une année sans TFN ?

Plus que la différence de retenue, car les années travaillées sans TFN sont celles où rien d'autre n'a été mis en place. La superannuation en est le cas courant : les cotisations versées sans TFN rattaché restent souvent non rapprochées dans un fonds ou chez l'ATO, et elles vous appartiennent toujours.

L'exonération de la Medicare levy en est un autre. Selon votre situation, la Medicare levy de 2 % peut ne pas s'appliquer, ce qui se vérifie au cas par cas, et elle n'est supprimée que si on la réclame. Ni l'un ni l'autre n'apparaît sur une payslip.

## Quelle est l'ampleur de votre propre retenue en trop ?

La récupérer est la partie facile. Son montant, et la vitesse à laquelle vous la voyez, dépendent de votre propre situation.

- Combien de semaines se sont écoulées avant que votre TFN arrive chez l'employeur.
- Si l'employeur a déclaré vos revenus via Single Touch Payroll.
- Si l'employeur était enregistré auprès de l'ATO comme employeur de working holiday makers, car un employeur non enregistré retient aux taux des non-résidents même avec un TFN au dossier.
- Si un compte bancaire australien est encore ouvert pour recevoir le remboursement.
- Si la super a été versée à un fonds incapable de la rattacher à vous.
- Si plusieurs exercices financiers sont concernés, car chacun est une déclaration distincte.

Le rapprochement se fait dans le cadre de la [tax return de working holiday maker](/tax-return), et vous pouvez [estimer votre remboursement d'impôt](/calculator) quand vous savez à peu près ce qui a été retenu.

## À qui confier vos documents, au juste ?

Les personnes qui ont travaillé sans TFN sont le groupe le plus ciblé dans ce public, car elles ne sont déjà pas sûres du fonctionnement du système. Les groupes Facebook de backpackers et les communautés de messagerie regorgent de gens qui proposent de régler vos impôts.

N'envoyez jamais votre TFN, votre passeport ou la notification d'octroi de votre visa à quelqu'un qui ne peut pas vous montrer une inscription au registre public des tax practitioners du gouvernement. Un numéro d'inscription vérifiable constitue tout le test.
`,
  },
}
