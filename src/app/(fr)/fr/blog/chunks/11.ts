export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'ato-payment-plan-tax-debt-australia': {
    title: "Dette d'impôt : le plan de paiement de l'ATO",
    description: "Une dette fiscale peut être étalée en versements, mais les intérêts continuent de courir. Quitter l'Australie n'efface ni la dette ni ces intérêts.",
    body: `
Oui. Si vous ne pouvez pas régler une facture de l'ATO à la date limite, un plan de paiement permet de l'étaler en plusieurs versements. Les intérêts continuent de courir au titre du General Interest Charge, donc un plan coûte plus cher qu'un paiement comptant, mais bien moins que le silence. Une dette fiscale ne disparaît pas quand vous quittez l'Australie.

## Pourquoi un working holiday maker se retrouve-t-il à devoir de l'argent ?

Parce qu'une partie de son revenu n'a subi aucune retenue d'impôt. Le revenu d'ABN ou de contractor est le cas le plus fréquent, puisque vous avez touché la facture en entier. Le deuxième, c'est un tax free threshold réclamé à tort. Le troisième, c'est le travail payé en cash sans retenue.

Aucun des trois ne se remarque sur le moment. Tous donnent l'impression de gagner un peu plus chaque semaine, puis arrivent des mois plus tard sous la forme d'un seul montant.

## Qu'est-ce qu'un payment arrangement, et quand l'ATO l'accepte-t-il ?

C'est un accord formel pour payer par versements plutôt qu'en une fois, en général chaque semaine ou toutes les deux semaines par prélèvement, avec une dette qui est le plus souvent soldée en moins de deux ans. Tant que le plan est en place et respecté, il vous protège des mesures de recouvrement actives.

L'ATO accepte en général lorsque le montant est proportionné, que vous pouvez montrer que vous êtes réellement dans l'incapacité de tout payer d'un coup, qu'un revenu finance les versements et que vous n'avez pas déjà manqué un arrangement précédent. Le contacter avant l'échéance fonctionne mieux que d'attendre d'être relancé.

## Que coûte le fait de payer plus tard ?

Le General Interest Charge se calcule chaque jour sur le solde dû, avec capitalisation, à un taux nettement supérieur au taux directeur. Il court à partir de l'échéance d'origine, pas à partir du début du plan.

Le dépôt tardif est pénalisé séparément du paiement tardif. Le défaut de dépôt est facturé à raison d'une penalty unit par période de 28 jours de retard, soit actuellement 364 $ à partir du 1er juillet 2026, plafonné à cinq unités ou 1 820 $. La pénalité vise le fait de ne pas déposer : déposer à temps et payer en retard coûte donc nettement moins cher que ne faire ni l'un ni l'autre. Notre guide sur les [pénalités de dépôt tardif](/blog/late-tax-return-penalty-working-holiday) explique quand elle s'applique.

## Que se passe-t-il si vous partez simplement ?

La dette reste. Le General Interest Charge continue de s'accumuler, le solde est compensé automatiquement avec tout futur remboursement australien, y compris la dernière déclaration que la plupart des backpackers déposent après leur départ, et il reste inscrit à votre dossier ATO.

Une dette fiscale impayée peut ressortir lors d'une future demande de visa australien. De petits soldes sont parfois effacés, mais c'est la décision de l'ATO et il ne faut pas compter dessus.

## Que faire avant de prendre l'avion ?

Mettez le plan en place tant que votre banque australienne fonctionne encore. Le prélèvement depuis un compte australien ouvert est ce qui continue de marcher depuis l'étranger, et fermer ce compte casse le plan.

Vérifiez le solde avant de partir. Les demandes de hardship et de remise peuvent se traiter par courrier depuis l'étranger, mais mettre le plan en place est bien plus simple depuis l'Australie.

## Les pénalités peuvent-elles être réduites ?

Parfois. Une remise est envisagée pour une première erreur, une vraie incompréhension d'une obligation, une maladie grave ou d'autres circonstances exceptionnelles, et lorsque vous vous êtes ensuite conformé correctement.

La remise est discrétionnaire, pas automatique, et une remise partielle est plus courante qu'une remise totale. Attendre n'aide pas, car l'argument de l'incompréhension sincère s'affaiblit chaque mois.

## Et si vous pensez que le montant est faux ?

Contestez-le plutôt que de simplement le payer, mais faites les deux en parallèle quand c'est possible. Un avis d'imposition (Notice of Assessment) que vous jugez erroné peut être modifié, en général dans les deux ans suivant son émission, et une décision avec laquelle vous n'êtes pas d'accord peut faire l'objet d'une objection formelle.

Aucune de ces démarches ne suspend le General Interest Charge. Les intérêts continuent de courir sur le montant contesté pendant l'examen de l'objection : quand la somme est importante, il vaut donc généralement mieux mettre un plan en place et contester en même temps. Notre guide sur la [modification d'une tax return](/blog/amending-tax-return-australia) explique quelle voie correspond à quel type d'erreur.

## Un simple retard ou un plan sur deux ans ?

La possibilité d'un plan, et son coût, dépendent de faits propres à votre situation.

- Ce qui a produit la dette : revenu d'ABN, tax free threshold réclamé à tort et années non déclarées mènent à des solutions différentes.
- Si la déclaration est déposée, car la pénalité de défaut de dépôt est distincte de la dette.
- Le montant du solde par rapport à ce que vous pouvez payer, ce qui décide si l'ATO accepte l'échéancier.
- Si un compte bancaire australien reste ouvert pour alimenter le prélèvement.
- Si vous êtes encore en Australie, ce qui facilite beaucoup la mise en place du plan.
- Si un remboursement d'une autre année est dû, puisqu'il est compensé automatiquement avec la dette.
- S'il existe des motifs de remise, à soulever tôt plutôt que tard.

Une dette naît le plus souvent d'une déclaration préparée sans vue d'ensemble, et c'est la [tax return working holiday](/tax-return) qui remet la situation d'aplomb. Vous pouvez [estimer votre remboursement](/calculator) pour d'autres années afin de voir si une compensation se profile.
`,
  },
  'piece-rates-farm-work-working-holiday': {
    title: "Piece rates en ferme : le plancher garanti",
    description: "Un cueilleur payé à la pièce doit pouvoir gagner au moins le taux horaire de l'award. Ce que doit contenir l'accord et comment corriger un sous-paiement.",
    body: `
Le piece rate vous paie au bac, au kilo ou à la barquette plutôt qu'à l'heure, et il est légal sous le Horticulture Award. Ce qui le rend légal, c'est le plancher en dessous : un pieceworker qui est employé doit quand même recevoir le taux horaire minimum de sa classification. Les mauvaises semaines sont compensées.

## Comment fonctionne un piece rate ?

Vous êtes payé à la production et non au temps, donc l'argent suit ce que vous cueillez, pesez ou emballez, pas les heures passées dans le rang. Au kilo de fraises, au bac de pommes, à la barquette de myrtilles, au rang désherbé, à la pièce emballée.

Le système récompense la vitesse, ce qui explique que les fermes l'aiment et que les cueilleurs expérimentés s'y retrouvent souvent bien. La première semaine est différente : la technique demande du temps, et quelqu'un qui apprend sur un fruit inconnu cueille une fraction de ce que fait un cueilleur expérimenté. C'est cet écart que le plancher garanti est là pour absorber.

## Qu'est-ce que le plancher garanti ?

C'est le taux horaire minimum de votre classification selon l'award, appliqué à l'ensemble des heures réellement travaillées sur la période de paie. Si vos gains à la pièce divisés par vos heures donnent un résultat inférieur, l'employeur doit compléter la différence. Ce n'est pas facultatif et une ferme ne peut pas s'en dégager par contrat.

Depuis le 1er juillet 2026, le minimum casual tous emplois confondus est de 33,05 $ de l'heure, soit le salaire minimum national de 26,44 $ plus la majoration casual de 25 %, et les taux de classification de l'award se situent au-dessus. Le plancher se calcule par période de paie et non par jour : un vendredi rapide peut compenser un mardi lent, mais la période dans son ensemble doit franchir la ligne.

## Comment se calcule le complément ?

Additionnez vos gains à la pièce pour la période, additionnez les heures travaillées et divisez l'un par l'autre. Si le résultat est inférieur au minimum horaire applicable, le manque est la différence entre ce que les heures auraient dû rapporter et ce que les pièces ont rapporté.

À 33,05 $ de l'heure, vingt heures font 661,00 $. Si ces vingt heures ont produit 400 $ de gains à la pièce, le taux effectif était de 20,00 $ de l'heure et l'employeur doit un complément de 261,00 $. Un employeur qui ne paie que les 400 $ enfreint le Fair Work Act, quoi qu'on ait convenu oralement.

## Que vaut un accord de piece rate verbal ?

Il n'est pas valide. Les accords de piece rate sous le Horticulture Award doivent être écrits, et un tarif lancé à travers le hangar, « quatre dollars la barquette, à prendre ou à laisser », échoue au regard de l'award dès sa formation et non à cause de l'arithmétique après coup.

Un accord écrit consigne le tarif, ce qui l'empêche de baisser en pleine saison, et il rend une réclamation ultérieure simple. En l'absence d'accord écrit, c'est le taux horaire ordinaire qui s'applique par défaut, souvent plus favorable au travailleur que ce qui a été dit à voix haute.

## Quelles pratiques faut-il surveiller ?

Celles qui réduisent votre production enregistrée ou vos heures enregistrées sans réduire le travail. Chacune est assez courante en horticulture pour mériter une vérification précise.

- Le sous-comptage, quand le décompte ou le poids noté est inférieur à ce que vous avez réellement cueilli
- Le tri, l'emballage ou la préparation non payés, qui sont du temps de travail et comptent dans les heures du calcul
- Les retenues pour le logement, le transport ou les repas qui font passer le taux effectif sous le minimum
- Aucun complément appliqué, ce qui est de loin l'infraction la plus fréquente dans le travail à la pièce
- Des rangs ou des blocs attribués de façon si clairsemée que l'objectif est inatteignable, ce qui ne supprime pas le plancher

## Comment contrôler votre propre semaine ?

Tenez un journal quotidien, car la garantie ne protège que les cueilleurs capables de montrer ce qui s'est passé. Notez les heures de début et de fin, les pauses, et les unités cueillies ou les tickets de décompte remis, et photographiez tout ce que la ferme écrit avant que ça disparaisse dans un tiroir.

À la fin de la période, faites le calcul. Gains divisés par heures : cela donne votre taux effectif ; comparé au minimum horaire de votre classification, il donne le manque. Des résultats durablement sous le plancher signifient soit que le tarif à l'unité était trop bas pour être légal, soit que les conditions rendaient l'objectif impossible. Dans les deux cas, la discussion commence par votre journal, et la procédure de recouvrement du Fair Work Ombudsman repose sur ces preuves. Notre guide sur le [vol de salaire et le recouvrement](/blog/wage-theft-working-holiday-australia) explique la suite.

## Comment le revenu à la pièce est-il imposé ?

Exactement comme n'importe quel autre revenu d'emploi. Le PAYG est retenu à 15 % lorsque votre TFN est enregistré, 12 % de [super](/superannuation) sont versés en plus du brut, et la totalité figure dans votre income statement et sur votre [tax return](/tax-return).

La seule bifurcation est de savoir si vous êtes employé ou non. Un travail à la pièce engagé via un [ABN](/abn) n'a aucune retenue, ne donne pas droit à la super et ne comporte aucun plancher garanti, ce qui explique que certains exploitants le préfèrent. Que cette classification soit authentique dépend de la façon dont le travail se déroule et non de ce que disent les papiers : notre guide sur le [travail en ferme et les ABN](/blog/farm-work-and-abns) présente le test.
`,
  },
  'labour-hire-agencies-working-holiday-australia': {
    title: "Agences de labour hire : qui est votre employeur",
    description: "L'agence est votre employeur : elle doit l'award, la super et les payslips même si la ferme dirige votre travail. Licences par État et signaux d'alerte.",
    body: `
Quand vous travaillez via une agence de labour hire, l'agence est votre employeur et la ferme ou le site n'est que l'endroit où vous allez. Ce seul fait détermine qui vous doit les salaires, la super et les droits. C'est aussi pour cela que le travail par agence est l'endroit où ces droits disparaissent le plus souvent.

## Qui est légalement votre employeur ?

L'agence. Elle vous paie, retient votre impôt, vous doit votre [super](/superannuation), émet vos payslips et porte les obligations de l'award. L'entreprise d'accueil vous dit quoi faire et où vous placer, et ne vous doit rien de tout cela.

Cette séparation explique pourquoi les arrangements par agence tournent mal plus souvent que l'emploi direct. Quand la paie est trop courte, l'entreprise d'accueil dit de voir l'agence et l'agence dit que c'est l'entreprise d'accueil qui fixe les horaires. Faites préciser par écrit qui est votre employeur avant de commencer.

## Qu'apporte le travail par agence ?

De la rapidité. Les agences placent des travailleurs en quelques jours plutôt qu'en quelques semaines, couvrent plusieurs secteurs à la fois et demandent bien moins qu'un recrutement direct. Cela compte quand vous venez d'arriver et avez besoin de travail cette semaine.

Elles gèrent aussi la paie d'un placement à l'autre : trois sites d'accueil différents en un mois donnent donc un seul employeur, une seule TFN declaration et un seul fonds de super au lieu de trois de chaque. Pour quelqu'un qui se déplace dans le pays, cela simplifie vraiment l'année.

## Où le travail par agence dérape-t-il ?

Surtout dans les retenues. Facturer le logement et le transport est légal lorsque c'est convenu par écrit et raisonnable. Cela devient du vol de salaire dès que les retenues font passer votre taux effectif sous le minimum. Les forfaits non détaillés, qui prélèvent un montant hebdomadaire pour une chambre et une place dans un van, sont là où l'exploitation se concentre dans ce secteur.

Les autres défaillances : être placé sous ABN comme contractor alors que le travail est clairement un emploi, des majorations (penalty rates) jamais appliquées aux shifts de week-end, des payslips jamais remis, et des salaires retenus jusqu'à la fin d'un placement, ce qui n'est légal à aucun moment. Si une agence vous dit que d'autres règles s'appliquent au labour hire, c'est faux. Le Fair Work Act s'applique pleinement.

## À quoi avez-vous réellement droit ?

Exactement à ce que vous auriez en travaillant directement pour l'entreprise d'accueil, sans rabais lié à l'arrangement. C'est-à-dire le taux de l'award pour la classification dont relève le travail sur le site d'accueil, les majorations pour les week-ends, les jours fériés et les heures supplémentaires, et des payslips dans un délai d'un jour ouvrable après chaque paie.

- Le taux de l'award pour le travail, le plancher casual depuis le 1er juillet 2026 étant de 33,05 $ de l'heure
- 12 % de super versés dans le fonds que vous avez désigné
- Des payslips détaillant les heures, le taux, l'impôt et les retenues
- Des conditions écrites avant de commencer un placement
- Un lieu de travail sûr, ce qui est un devoir de l'entreprise d'accueil comme de l'agence

## L'agence a-t-elle une licence ?

Vérifiez avant de signer quoi que ce soit. L'État de Victoria, le Queensland, l'Australie-Méridionale (South Australia) et l'Australian Capital Territory appliquent des régimes de licence obligatoires pour le labour hire, avec des registres publics, et opérer sans licence dans ces juridictions est une infraction.

Une licence ne garantit pas un bon comportement, mais son absence dans un État qui l'exige en dit long très vite. Ajoutez les bases : un fonds de super connu, des conditions écrites, des payslips détaillés, un paiement le même jour à chaque cycle.

## Que demander avant de signer ?

Cinq questions, avec des réponses par écrit plutôt qu'au comptoir. Une agence qui refuse d'y répondre vous a appris quelque chose de plus utile que n'importe quelle réponse.

- Avez-vous une licence, et dans quel État ?
- Qui paie ma super, et dans quel fonds ?
- Quel award et quelle classification couvrent le travail sur le site d'accueil ?
- Les payslips seront-ils détaillés par site et par shift ?
- Quelles retenues seront prélevées, et à quel tarif ?

Insistez sur les retenues. Les forfaits transport et logement sont là où part l'argent, et un montant annoncé par semaine plutôt que par poste est ce qui rend le sous-paiement difficile à voir.

## Que faire si vous pensez être sous-payé ?

Calculez d'abord votre taux effectif, car c'est le chiffre sur lequel repose toute réclamation. Additionnez tout ce que vous avez réellement reçu sur une période de paie, compléments compris, divisez par les heures réellement travaillées, temps d'attente non payé inclus, et comparez le résultat au taux de l'award pour le travail.

S'il est insuffisant, la réclamation vise l'agence et non l'entreprise d'accueil. Le Fair Work Ombudsman traite gratuitement les plaintes pour sous-paiement, la super impayée relève de l'ATO, et être titulaire d'un visa 417 ou 462 n'affaiblit ni l'un ni l'autre. Notre guide sur le [vol de salaire et le recouvrement](/blog/wage-theft-working-holiday-australia) explique quelles preuves font tenir une réclamation.
`,
  },
  'how-to-read-a-payslip-australia-working-holiday': {
    title: "Comment lire une fiche de paie australienne",
    description: "Brut, impôt retenu, super, taux horaire et heures : ce que chaque ligne doit montrer, et la vérification rapide qui repère la plupart des sous-paiements.",
    body: `
Une payslip australienne doit être remise dans un délai d'un jour ouvrable après le paiement, et doit indiquer le brut, l'impôt retenu, la super et le net. Pour un working holiday maker dont le TFN est enregistré, l'impôt doit représenter 15 % du brut et la super 12 % en plus. Deux divisions suffisent pour le savoir.

## Pourquoi la payslip est-elle le document qui compte ?

C'est le seul endroit où les heures, le taux, l'impôt et la super apparaissent ensemble, et c'est la preuve si l'un d'eux se révèle faux. Votre relevé bancaire affiche un seul chiffre et ne dit rien de la façon dont on y est arrivé.

C'est aussi le document qui disparaît en premier. Les payslips remises via une appli de planning ou une adresse mail professionnelle s'évanouissent dès la fin de votre emploi, souvent avant que vous ayez pensé à en avoir besoin. Vous les envoyer par mail au fur et à mesure prend trente secondes toutes les deux semaines, et c'est l'habitude la plus utile de cette page.

## À quoi doit ressembler le brut ?

Vos heures multipliées par votre taux, plus les majorations pour le travail de week-end, de soirée, en heures supplémentaires ou les jours fériés, plus les allowances que l'award rattache au poste. Vérifiez cette ligne avant toute autre, parce que tous les autres chiffres de la payslip en découlent.

Comparez-la à votre propre relevé d'heures plutôt qu'au planning, car les deux diffèrent souvent. Le temps de préparation avant un shift ou de nettoyage après est du temps de travail, et c'est là que les heures disparaissent discrètement. Si chaque heure est payée au même taux sur une semaine comportant du week-end, l'award n'est pas appliqué.

## Comment vérifier la ligne d'impôt ?

Divisez l'impôt retenu par le brut. Pour un working holiday maker dont la Tax File Number Declaration a été traitée et dont l'employeur est enregistré, le résultat doit être proche de 15 %.

Tout chiffre nettement supérieur a une cause précise, et chacune se corrige différemment.

- Autour de 45 % : votre TFN n'est pas encore enregistré chez cet employeur, en général parce que le formulaire de déclaration n'a pas été traité
- Autour de 30 % : l'employeur n'est pas enregistré auprès de l'ATO comme employeur de working holiday makers
- Bien en dessous de 15 % : le tax free threshold a peut-être été réclamé à tort dans la déclaration, ce qui produit une facture plus tard et non un remboursement

L'impôt retenu en trop est pris en compte lors de la [tax return](/tax-return), mais l'argent reste chez l'ATO d'ici là. Signalez un mauvais taux dès la première quinzaine plutôt qu'en fin d'année.

## Comment vérifier la ligne de super ?

Divisez la super par le brut et attendez-vous à 12 %, le taux en vigueur depuis le 1er juillet 2025. La super est versée par l'employeur en plus de votre salaire, il ne doit donc jamais réduire votre net, et une payslip où la super semble sortir de vos gains mérite une question.

Dû ne veut pas dire versé. Le montant de super sur une payslip indique ce que l'employeur doit pour la période, pas ce qui est arrivé dans votre fonds, et les deux peuvent être décalés : depuis le 1er juillet 2026, la super est en général due dans les sept jours ouvrables suivant chaque jour de paie (Payday Super), alors qu'avant cette date elle se payait par trimestre. Seul le fonds lui-même vous dit si l'argent est bien arrivé. Notre guide sur la [super impayée](/blog/super-employer-not-paying-what-to-do) explique que faire si ce n'est pas le cas.

## Que vous dit le net ?

Si l'arithmétique tient. Le net est le brut moins l'impôt retenu et les éventuelles retenues légales, et il doit correspondre au centime près au montant déposé sur votre compte. La super n'entre pas du tout dans ce calcul.

Toute retenue, pour le logement, le matériel ou autre, doit figurer sur la payslip, avoir été convenue à l'avance et être légale. Un écart inexpliqué entre le brut moins l'impôt et ce qui est réellement arrivé est le signe le plus net d'une retenue illégale, et il se voit en une soustraction.

## À quoi servent les chiffres cumulés depuis le début de l'année ?

À suivre votre situation sans attendre juillet. La plupart des payslips portent des totaux cumulés depuis le 1er juillet (year to date) pour le brut, l'impôt retenu et souvent la super, ce qui vous permet de voir la forme de votre année tant qu'il est encore temps de corriger.

Ils servent aussi à recouper l'income statement que votre employeur finit par transmettre à l'ATO. Si le brut cumulé de votre dernière payslip et le chiffre de l'income statement ne concordent pas, l'un des deux est faux, et avoir la payslip vous permet de dire lequel.

## Et si votre employeur ne remet aucune payslip ?

C'est déjà une infraction en soi, et rarement la seule. Les employeurs australiens doivent remettre une payslip dans un délai d'un jour ouvrable après le paiement des salaires, au format électronique ou papier, que l'employé la demande ou non.

Sans payslip, il n'existe aucune trace des heures, du taux, de l'impôt ni de la super, ce qui est exactement la position où veut vous mettre un employeur qui cherche à éviter ces obligations. Tenez votre propre relevé daté des heures travaillées à partir de ce moment, gardez chaque dépôt bancaire et prenez cette absence pour le signal d'alarme qu'elle est. Notre guide sur [un employeur qui ne paie pas correctement](/blog/employer-not-paying-correctly) explique la suite.
`,
  },
  'wage-theft-working-holiday-australia': {
    title: "Le vol de salaire est un crime : récupérer sa paie",
    description: "Le sous-paiement délibéré est une infraction pénale. Comment le documenter et récupérer vos salaires gratuitement via le Fair Work Ombudsman.",
    body: `
Un salaire inférieur à ce que la loi vous garantit peut être récupéré, et le signaler ne devrait pas mettre votre visa en danger. Le plancher depuis le 1er juillet 2026 est de 26,44 $ de l'heure, ou 33,05 $ pour les casuals avec la majoration, et la plupart des awards se situent au-dessus. Savoir si vous avez une réclamation relève de l'arithmétique, pas du ressenti.

## Qu'est-ce qui compte comme sous-paiement ?

Tout ce qui vous laisse sous le taux fixé par l'award ou le salaire minimum national pour les heures réellement travaillées. La catégorie est plus large qu'un taux horaire bas, et les formes les plus courantes ressemblent à autre chose sur le moment.

- Un paiement sous le minimum, qui est depuis le 1er juillet 2026 de 26,44 $ de l'heure et de 33,05 $ pour les casuals
- Des heures de week-end, de soirée, supplémentaires ou de jour férié payées au taux de base sans majoration
- Les 12 % de [super](/superannuation) qui n'arrivent jamais dans votre fonds
- Des retenues pour le logement ou le transport qui font passer votre taux effectif sous le minimum
- Des trial shifts non payés qui dépassent largement une brève démonstration de compétences
- Un passage sous ABN pour éviter la super et les taux de l'award alors que le travail est en réalité un emploi
- Des salaires retenus jusqu'à la fin d'un placement, ce qui n'est pas légal
- Du cash sans payslip et sans super

Une part est délibérée et une part relève d'une réelle incompétence de paie. La distinction compte pour la tournure de la conversation, et pas du tout pour ce qui vous est dû.

## Comment vérifier votre propre paie ?

Divisez ce que vous avez reçu par les heures réellement travaillées, y compris le temps non payé avant et après les shifts. Si le résultat est inférieur à 33,05 $ en tant que casual, vous êtes sous-payé par rapport au plancher national, et si votre emploi relève d'un award, le vrai plancher est généralement plus haut.

Vérifiez ensuite le schéma plutôt que le total. Avec les majorations, les heures de week-end et de jour férié doivent être payées à un multiple du taux ordinaire : une payslip où chaque heure est payée au même taux sur une semaine qui comprenait un dimanche est fausse, même si la moyenne paraît acceptable. Notre guide sur les [majorations (penalty rates)](/blog/penalty-rates-australia) donne les multiplicateurs par jour et par award, et le guide sur les [classifications d'award](/blog/award-classifications-working-holiday-australia) explique le bon taux pour le travail que vous faites vraiment plutôt que pour l'intitulé du poste.

## Que faire concrètement ?

Soulevez d'abord le problème par écrit, car la plupart des réclamations qui aboutissent commencent par une trace écrite plutôt que par une confrontation. Un court message exposant les heures, le taux payé et le taux que vous estimez applicable donne à un employeur qui s'est trompé une façon de corriger, et à un employeur de mauvaise foi quelque chose à qui répondre.

Si cela échoue, le Fair Work Ombudsman traite gratuitement les plaintes pour sous-paiement, et être titulaire d'un visa 417 ou 462 n'affaiblit pas la réclamation. La super suit une autre voie : la super impayée est récupérée par l'ATO via le [Superannuation Guarantee Charge](/blog/what-is-superannuation-guarantee-charge), pas par Fair Work, donc un emploi qui cumule les deux problèmes donne deux réclamations distinctes. Rester en poste pendant que vous soulevez le sujet renforce le dossier quand c'est sans danger, car la suite des shifts continue de constituer des preuves.

## Le signaler affectera-t-il votre visa ?

En principe, non. Signaler un employeur pour sous-paiement ne met pas, en soi, votre visa working holiday en cause. Cette crainte fait taire les backpackers sous-payés, alors que des protections existent pour ceux qui signalent.

Une plainte de bonne foi sur le lieu de travail n'est pas un motif de réexamen de votre visa, un employeur ne décide pas de votre statut de visa quoi qu'il laisse entendre, et les dispositifs du Workplace Justice visa existent précisément pour que les titulaires de visas temporaires puissent faire valoir une exploitation sans que leur situation migratoire soit utilisée contre eux.

## Quelles preuves font tenir une réclamation ?

Tout ce qui relie les heures à l'argent, conservé à un endroit que l'employeur ne peut pas vous retirer. Une réclamation pour sous-paiement dépend presque entièrement des preuves, plus faciles à rassembler tant que vous êtes encore sur place.

- Chaque payslip, enregistrée comme fichier plutôt que laissée dans une appli de travail
- Le planning publié, et votre propre note des heures réellement travaillées
- Tout contrat ou lettre d'offre, même informel
- Les SMS et mails sur la paie, les shifts et les retenues
- Les relevés du fonds de super montrant ce qui est arrivé et quand
- Les relevés bancaires montrant ce qui a réellement été déposé

Une note quotidienne des heures de début et de fin prend quelques secondes et c'est le document qui tranche le plus souvent un litige. Enregistrez tout au fur et à mesure plutôt qu'à la fin.

## Peut-on encore récupérer son dû après son départ ?

Oui. Les réclamations pour sous-paiement via le Fair Work Ombudsman et les signalements de super impayé à l'ATO survivent tous deux à votre départ d'Australie, et aucun ne vous oblige à être dans le pays pour les mener.

Ce qui devient plus difficile, ce sont les preuves et le contact. Des plannings et des payslips restés dans un système auquel vous n'avez plus accès sont difficiles à récupérer depuis un autre continent, et un compte bancaire australien fermé à votre départ complique le versement de tout ce qui est récupéré. Les deux se règlent à peu de frais pendant votre dernière quinzaine ici, et coûtent cher à réparer ensuite.
`,
  },
  'backpacker-tax-history-australia': {
    title: "La backpacker tax : de la High Court aux 15 %",
    description: "La backpacker tax de 15 % date de 2017 et a été testée devant la High Court en 2021. Le taux a survécu, avec des conséquences évaluées au cas par cas.",
    body: `
La backpacker tax est le taux forfaitaire appliqué aux revenus des visas 417 et 462 : 15 % sur les 45 000 premiers dollars. C'est le taux en vigueur depuis le 1er janvier 2017. Ce qui décide encore des cas individuels, c'est ce que la High Court en a dit en 2021, et cela varie d'une personne à l'autre.

## Quel est le taux aujourd'hui ?

Quinze pour cent dès le premier dollar jusqu'à 45 000 $, puis le barème des non-résidents au-delà. Les deux sous-classes de visa sont traitées de la même façon, et presque tous les working holiday makers gagnent dans la première tranche.

Ce régime se distingue de la fiscalité australienne ordinaire, et la comparaison entre les deux dépend de la situation individuelle de chacun, examinée au cas par cas.

- 15 % sur le revenu jusqu'à 45 000 $
- 30 % de 45 001 $ à 135 000 $
- 37 % de 135 001 $ à 190 000 $
- 45 % au-delà de 190 000 $

## Quelle était la situation avant 2017 ?

La situation fiscale de chacun décidait de tout. Selon l'appréciation faite de son année, un working holiday maker se voyait appliquer un régime ou un autre. Deux personnes faisant le même travail pouvaient recevoir des factures très différentes, et le côté où elles tombaient relevait d'une appréciation, contestée alors pour les mêmes raisons qu'aujourd'hui.

Le gouvernement considérait certaines de ces faibles factures d'impôt comme un effet non voulu et non comme un choix de politique fiscale. Ce point de vue est à l'origine de la proposition de 2016.

## Comment le taux de 2017 est-il né ?

D'un compromis après une bataille. La proposition de 2016 était d'imposer tous les revenus des working holiday makers à 32,5 % dès le premier dollar en considérant chaque backpacker comme non-résident. L'agriculture et le tourisme se sont immédiatement opposés, car la main-d'œuvre des récoltes dépend de personnes pour lesquelles ce taux aurait changé le calcul même de venir.

L'accord a été le taux de 15 % à partir du 1er janvier 2017. Le même paquet a fait passer le taux du Departing Australia Superannuation Payment (DASP) pour les working holiday makers de 35 % à 65 %, en laissant 35 % pour les autres titulaires de visas temporaires comme les étudiants. La concession sur les salaires a été payée du côté du [super](/blog/tax-on-super-withdrawal-backpacker), et elle l'est toujours.

## Qu'a décidé la High Court dans l'affaire Addy ?

Que le taux de 15 % ne pouvait pas être appliqué légalement au contribuable en cause. Dans Addy v Commissioner of Taxation [2021] HCA 34, la High Court a donné raison au contribuable pour des motifs qui tiennent à la façon dont l'ensemble de l'année d'une personne est évalué, ce qui explique que la décision ne se lit pas comme une règle générale sur la backpacker tax.

Le contribuable a eu gain de cause en première instance en 2019, a perdu devant la Full Federal Court, puis a gagné devant la High Court en 2021. La loi n'a pas été modifiée ensuite : la position reste celle que le tribunal a laissée et s'applique au cas par cas, sans changement du taux.

## Que change la décision Addy pour les autres ?

Son effet varie d'une personne à l'autre et ne doit pas être présumé. Savoir si la décision touche un working holiday maker donné dépend d'une analyse de toute son année, et cette analyse se trompe dans les deux sens quand on la tente soi-même.

La question est un jugement sur votre propre situation, qui tient à des détails que la plupart des gens ne pensent jamais à vérifier, et ni le tableau des taux ni le nom de l'affaire ne peuvent y répondre. Une position n'est prise qu'après avoir passé l'année en revue en entier.

## Qu'est-ce que cela change pour votre déclaration ?

Le résultat d'une déclaration tient à de nombreux éléments, dont l'impôt retenu en trop et l'exemption de la Medicare levy, et pas seulement à Addy. Une décision de justice peut changer les taux applicables dans certaines situations, et savoir si elle vous concerne dépend des faits de votre année.

Là où elle s'applique, son effet varie d'une personne à l'autre pour des raisons peu évidentes vu de l'extérieur. C'est la branche qu'il vaut la peine de faire vérifier avant le dépôt d'une [tax return](/tax-return), parce que modifier après coup est plus difficile que de bien faire du premier coup, et la position adoptée doit être défendable.
`,
  },
  'how-to-check-super-balance-working-holiday': {
    title: "Comment vérifier son solde de super en PVT",
    description: "Votre super est dans un fonds, pas chez votre employeur. Les cotisations arrivent après la paie : un solde peut sembler vide un temps après le travail.",
    body: `
Votre solde de super se trouve dans le fonds où votre employeur a versé, et vous y accédez avec le numéro de membre que ce fonds vous a envoyé. Le solde affiché n'est pas forcément le total : tout dépend du nombre d'emplois que vous avez eus, car chaque employeur a pu ouvrir un compte de plus.

## Pourquoi faut-il vérifier le solde ?

Parce que la super est le seul argent gagné en Australie qui n'apparaît jamais sur votre compte bancaire. Elle est versée en plus de votre salaire, directement dans un fonds, donc rien dans vos opérations bancaires quotidiennes ne vous dirait qu'il manque.

C'est pourquoi la [super](/superannuation) impayée passe si longtemps inaperçue. Un employeur qui sous-paie les salaires est repéré en une quinzaine, car le dépôt est visiblement faux. Un employeur qui ne verse jamais la super peut passer une saison entière sans être remarqué, et pour un working holiday maker la découverte arrive généralement au moment du départ, quand il est le plus difficile de relancer.

## Quand les cotisations doivent-elles apparaître ?

Pour la paie à partir du 1er juillet 2026, en général dans les sept jours ouvrables suivant chaque jour de paie au titre de la Payday Super. Avant cette date, les employeurs versaient la super par trimestre : un écart pouvant aller jusqu'à trois mois était donc normal, et pour les périodes plus anciennes c'est encore la raison la plus fréquente pour laquelle on croit la super manquante alors qu'elle ne l'est pas.

Les anciennes échéances trimestrielles étaient le 28 octobre, le 28 janvier, le 28 avril et le 28 juillet, et elles s'appliquent encore aux périodes de paie antérieures au 1er juillet 2026. Depuis, l'échéance est en général de sept jours ouvrables après la paie. Une cotisation encore absente une semaine ou deux après son échéance est un vrai écart, et c'est le moment de comparer la ligne de la payslip avec le relevé du fonds.

## Et si vous ne savez pas quel fonds est le vôtre ?

Vous en avez presque certainement un, et son nom est écrit à trois endroits. Votre payslip indique le nom du fonds et souvent le numéro de membre, ce qui est la voie la plus rapide. Votre messagerie contient un mail de bienvenue du fonds, classé sous un nom que vous n'avez peut-être pas reconnu comme celui d'un fonds de super à l'époque. Et l'ATO conserve la trace de chaque fonds ayant déjà reçu une cotisation liée à votre TFN.

Ce dernier point compte le plus pour quiconque a eu plusieurs emplois, parce que c'est la seule source qui montre les comptes oubliés. Une année passée d'un job à l'autre produit couramment trois ou quatre comptes distincts sans qu'aucune décision délibérée n'ait été prise.

- Le nom du fonds et le numéro de membre imprimés sur n'importe quelle payslip
- Le mail de bienvenue envoyé à l'ouverture du compte
- Les dossiers de l'ATO, qui listent chaque fonds détenant de l'argent lié à votre TFN
- Le vieux super transféré à l'ATO en tant qu'argent non réclamé, qui vous appartient toujours

## Pourquoi plusieurs comptes vous coûtent-ils de l'argent ?

Parce que chacun facture ses propres frais d'administration et souvent ses propres primes d'assurance, prélevés sur un solde qui ne croît pas entre deux emplois. Quatre petits comptes inactifs pendant six mois perdent plus en frais qu'un seul compte détenant la même somme, et sur des soldes de la taille de ceux des backpackers, la proportion est importante.

La pertinence de regrouper dépend de votre calendrier. Si vous restez et travaillez, [regrouper les comptes](/blog/super-multiple-funds-consolidation) arrête les frais en double. Si vous partez dans quelques semaines, tous les comptes seront de toute façon réclamés via le DASP, et regrouper d'abord peut retarder la demande plutôt que l'aider. Ce qui est toujours une erreur, c'est de laisser un compte oublié, car c'est ainsi que la super finit transférée à l'ATO comme argent non réclamé et laissé discrètement derrière soi.

## Que confirmer avant de demander le DASP ?

Que chaque compte a été retrouvé et que la dernière cotisation a bien été versée. Une demande de Departing Australia Superannuation Payment ferme le compte sur lequel elle est faite, donc toute cotisation arrivant après doit être relancée séparément, et la dernière période de travail est celle qui a le plus de chances d'être encore due.

Le calendrier est le point de bascule. Pour la paie à partir du 1er juillet 2026, la dernière cotisation est en général due dans les sept jours ouvrables suivant votre dernier jour de paie (Payday Super), alors qu'avec l'ancien système trimestriel elle n'était due qu'à la fin du trimestre. Demander trop tôt peut donc faire manquer le dernier versement. Attendre après l'échéance rapporte généralement plus, ce qu'il faut peser face à la [retenue de 65 %](/blog/tax-on-super-withdrawal-backpacker) appliquée dans les deux cas et aux 28 jours environ que prend l'approbation d'un DASP une fois la demande déposée.
`,
  },
  'tfn-application-rejected': {
    title: "Demande de TFN rejetée ? Quatre causes",
    description: "Passeport qui ne correspond pas, retard des données d'immigration, faute de frappe ou TFN déjà existant : identifier la cause et redéposer correctement.",
    body: `
Presque toujours parce que les informations d'identité ne correspondaient pas aux dossiers de Home Affairs. Les causes habituelles sont un numéro de passeport différent de celui de l'attribution du visa, une date de naissance qui ne concorde pas, un nom orthographié autrement que sur le passeport, ou un TFN qui existe déjà depuis un visa antérieur. Aucune n'est fatale.

## Qu'est-ce qui est réellement vérifié ?

Une correspondance électronique avec les dossiers d'immigration, pas une personne qui lit vos documents. Rien n'est téléversé : la demande réussit ou échoue selon que les champs que vous avez saisis correspondent exactement à ce que l'administration détient déjà.

Cela explique la forme des échecs. Des deuxièmes prénoms omis, des traits d'union et des accents supprimés, un nom translittéré comme on le prononce plutôt que comme le passeport l'imprime, un passeport renouvelé après l'attribution du visa. Chacun est une discordance, même s'il s'agit à l'évidence de la même personne.

## Quelles sont les quatre causes à vérifier en premier ?

La plupart des rejets se ramènent à l'une de quatre, et laquelle vous concerne détermine la voie du retour.

- Une faute de frappe dans le numéro de passeport, le nom ou la date de naissance. Corrigez et redéposez avec les informations exactement telles qu'imprimées.
- Une demande faite avant l'enregistrement de votre arrivée. Si vous avez postulé quelques heures après l'atterrissage, l'enregistrement du mouvement n'existait peut-être pas encore, et attendre quelques jours règle le problème.
- Un visa pas encore activé par l'entrée en Australie, ce qui est un problème de calendrier et non de données.
- Un TFN qui existe déjà depuis un visa antérieur. Ce n'est pas tant un rejet qu'une récupération, et créer un second numéro serait le mauvais résultat.

Ce dernier cas compte le plus pour quiconque revient en Australie. Un TFN est permanent : la démarche consiste donc à [retrouver le numéro existant](/blog/how-to-find-lost-tfn) plutôt qu'à redemander et générer un doublon.

## Que vous coûte la situation tant qu'elle n'est pas réglée ?

Trente cents sur chaque dollar, aussi longtemps qu'elle dure. Sans TFN valide enregistré, votre employeur retient 45 % au lieu de 15 %, ce qui sur une semaine à 1 000 $ fait 300 $ par semaine retenus au lieu d'être payés.

Cet impôt retenu en trop est pris en compte lors du dépôt de la déclaration, donc le coût porte d'abord sur le moment, et pour quelqu'un qui paie son loyer chaque semaine, c'est le moment qui compte.

## Le rejet affecte-t-il aussi la déclaration remise à votre employeur ?

Oui. La Tax File Number Declaration enregistre une demande en cours et vous maintient au taux working holiday pendant une fenêtre de 28 jours. Un rejet remet l'horloge à zéro, et une fois la fenêtre passée, l'employeur doit retenir 45 % quoi que vous lui ayez dit.

Dites donc à l'employeur que la demande a été rejetée et qu'elle est redéposée, et mettez la déclaration à jour quand le numéro est émis. Notre guide sur le [formulaire de Tax File Number Declaration](/blog/tax-file-number-declaration-form) explique ce dont la paie a réellement besoin.

## Un appel téléphonique vaut-il mieux qu'un nouvel essai en ligne ?

Pour certaines causes, oui. Une faute de frappe se règle le plus vite en redéposant proprement. Une discordance de nom, un nom d'usage après mariage, une translittération ou un doublon présumé se traitent mieux en parlant à l'ATO, car un agent peut rapprocher des dossiers qu'un contrôle automatique ne peut pas rapprocher.

Le numéro de référence du mail de confirmation d'origine accélère toutes les démarches, et c'est la seule chose que les gens suppriment systématiquement.

## Que faire une fois le numéro enfin émis ?

Donnez-le séparément à chaque employeur sur une nouvelle déclaration, puis vérifiez la payslip suivante plutôt que de supposer que la paie a été mise à jour. Traitez ce numéro comme vous traiteriez un numéro de compte bancaire.

Les working holiday makers sont visés par le vol de TFN, car un TFN volé permet de déposer une déclaration frauduleuse avec le remboursement dirigé ailleurs, et la victime ne le découvre souvent que lorsque sa propre déclaration est rejetée comme doublon. Toute personne qui propose une aide fiscale sans pouvoir montrer une inscription au registre public des tax practitioners ne doit pas recevoir vos documents.

## Laquelle des quatre causes est la vôtre ?

Un rejet est un problème de données, et la donnée en cause détermine à la fois la solution et le délai. Les points ci-dessous permettent de se ramener à une seule cause.

- Si votre nom complet a été saisi exactement comme le passeport l'imprime, deuxièmes prénoms et traits d'union compris.
- Si votre passeport a été renouvelé après l'attribution du visa, ce qui produit un numéro qui ne correspond plus.
- Combien de temps après votre arrivée vous avez postulé, puisque l'enregistrement du mouvement doit exister d'abord.
- Si vous avez déjà eu un TFN, auquel cas la récupération plutôt que la nouvelle demande est la bonne voie.
- Si la fenêtre de 28 jours de la déclaration chez l'employeur est déjà expirée.
- Combien de semaines de retenue à 45 % s'accumulent avant la résolution, ce qui pèse sur le résultat de la déclaration.

Ce qui a été retenu en trop pendant le délai est examiné dans la [tax return working holiday](/tax-return), et vous pouvez [estimer votre remboursement](/calculator) une fois que vous savez combien de temps la période a duré.
`,
  },
}
