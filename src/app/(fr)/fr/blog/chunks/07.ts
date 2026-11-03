export const chunk: Record<string, { title: string; description: string; body: string }> = {
  'what-does-tax-withheld-mean-payslip': {
    title: "Tax withheld sur votre payslip : 15 % est-il juste ?",
    description: "Avec un PVT, l'impôt retenu doit valoir environ 15 % du brut. Si votre calcul donne 0,30 ou 0,45, voici ce qui cloche et ce qui peut être récupéré.",
    body: `
Le tax withheld, c'est l'impôt sur le revenu que votre employeur verse à l'ATO sur votre salaire brut avant que le reste n'arrive sur votre compte. Avec un visa vacances-travail, il doit représenter environ 15 % de vos gains bruts jusqu'à 45 000 $. Divisez l'impôt retenu par le brut indiqué sur votre payslip (fiche de paie) : vous devriez obtenir à peu près 0,15.

## Quels sont les trois montants d'une payslip et comment s'articulent-ils ?

Toute payslip australienne conforme affiche le gross pay (brut), le tax withheld (impôt retenu) et le net pay (net). Le premier moins le deuxième donne le troisième. Le brut, c'est ce que vous avez gagné, l'impôt retenu, c'est ce que votre employeur a transmis à l'ATO, et le net, c'est ce qui arrive sur votre compte.

L'impôt retenu est un acompte, pas une facture définitive. C'est une estimation prélevée paie après paie, en attendant un calcul fait une seule fois, à la fin de l'année fiscale, sur l'ensemble de vos revenus. Une retenue trop forte donne un remboursement, une retenue trop faible donne une facture.

## Comment vérifier que le taux est le bon ?

Divisez l'impôt retenu par le brut sur n'importe quelle payslip. Un working holiday maker dont le formulaire de déclaration (Tax File Number Declaration) est correctement rempli et dont l'employeur est bien enregistré doit tomber près de 0,15.

- Brut de 600 $ par semaine : environ 90 $ retenus
- Brut de 900 $ par semaine : environ 135 $ retenus
- Brut de 1 200 $ par semaine : environ 180 $ retenus
- Brut de 2 000 $ par semaine : environ 300 $ retenus

Faites le calcul sur plus d'une payslip, et pour chaque employeur séparément. Le cas typique n'est pas une payslip fausse de bout en bout : c'est un employeur correct et un autre qui se trompe discrètement depuis des mois.

## Que signifie chaque pourcentage anormal ?

Le pourcentage vous dit quelle règle a mal fonctionné, et chaque cas a sa cause et sa solution.

**Autour de 45 %.** Votre Tax File Number Declaration n'est pas arrivée au service paie, ou le délai de 28 jours s'est écoulé sans que votre TFN soit fourni. C'est le cas le plus coûteux et le plus fréquent. Il se règle dès que le formulaire est enregistré, à partir de la paie suivante.

**Autour de 30 % ou un peu plus.** Votre employeur n'est pas enregistré auprès de l'ATO comme employeur de working holiday makers : il applique donc les taux des non-résidents. Ce n'est pas votre erreur et il n'y a rien à corriger sur votre formulaire. L'excédent peut être récupéré au moment de la tax return.

**Nettement sous 15 %, ou presque rien sur un salaire ordinaire.** Il se peut que le tax-free threshold ait été coché sur votre déclaration, ce qui ne correspond pas forcément à votre situation. C'est le seul cas de cette liste qui peut créer une dette plutôt qu'un remboursement : trop peu a été retenu pendant toute l'année et la différence est à payer lors de l'assessment.

**Rien du tout, et aucune ligne de super non plus.** Vous êtes payé en dehors de la paie officielle, quel que soit le nom que l'on donne à cet arrangement. Il n'y a aucune retenue à récupérer et aucun income statement sur lequel s'appuyer, mais le revenu reste à déclarer.

## Où va l'argent une fois retenu ?

Votre employeur le garde un court moment, le reverse à l'ATO selon son propre calendrier de déclaration, puis arrête les totaux en fin d'année sous la forme de votre income statement. C'est ce relevé, et non vos payslips, qui sert de base à votre tax return.

Si un employeur ne finalise jamais, ou finalise avec des chiffres qui ne correspondent pas à ce que vous avez touché, vos payslips sont la seule preuve de l'écart. C'est tout l'intérêt de les conserver.

## Pourquoi garder ses payslips si l'ATO a déjà les données ?

Parce que l'ATO a ce que l'employeur a déclaré, ce qui n'est pas toujours ce que vous avez réellement touché. Les payslips permettent de résoudre un écart, et ce sont les seuls documents qui montrent la super séparément de l'impôt, la ligne la plus susceptible de manquer complètement.

Les erreurs de paie sur les salaires de backpackers ne sont pas rares, et elles ne sont généralement pas malveillantes. On les retrouve surtout dans les petites structures à un seul site, dans les fermes et les packing sheds qui tiennent leurs comptes sur papier pendant la récolte, et dans les établissements où une seule personne s'occupe de la paie en plus de tout le reste. Garder les payslips reçues par email dans un seul dossier règle la question plus tard.

## Pourquoi votre payslip affiche-t-elle autre chose ?

Le repère des 15 % est celui d'un working holiday maker typique : une payslip qui affiche autre chose vous renseigne donc sur votre propre situation. Plusieurs cas donnent un autre pourcentage, et ils ne vont pas tous dans le même sens.

- Le nombre d'employeurs que vous avez eus. Chacun implique une déclaration distincte, un taux distinct et un income statement distinct, et la retenue excessive se concentre souvent chez un seul d'entre eux.
- Le fait qu'un employeur n'était pas enregistré comme employeur de working holiday makers, ce qui entraîne une retenue au taux non-résident que vous ne pouvez pas corriger de votre côté.
- Le fait que le tax-free threshold ait été coché ou non. C'est la branche qui produit une facture plutôt qu'un remboursement.
- Le fait qu'une partie de vos revenus soit du travail sous ABN, où rien n'est retenu et où l'impôt se règle entièrement lors de l'assessment.
- Le fait qu'une période se soit écoulée avant l'enregistrement de votre TFN, ce qui met une série de paies à 45 % et concentre votre remboursement sur cette période.

Tout ce qui a été retenu au-delà de ce que vous deviez vraiment peut être récupéré par votre [tax return de working holiday maker](/tax-return), et vous pouvez [estimer votre remboursement d'impôt](/calculator) à partir de vos chiffres depuis le début de l'année.
`,
  },
  'what-is-an-income-statement': {
    title: "Income statement en Australie : de quoi s'agit-il ?",
    description: "L'income statement a remplacé le payment summary papier. Votre employeur le dépose via la paie, et il n'est définitif qu'une fois « tax ready ».",
    body: `
Vous recevez un income statement par employeur et par année fiscale, et il contient les deux chiffres sur lesquels repose votre tax return : le brut et l'impôt retenu. C'est le successeur numérique du PAYG payment summary, qui arrivait autrefois sur papier. Personne ne vous le remet plus : il se trouve dans les systèmes de l'ATO, et une année working holiday avec cinq employeurs en produit cinq.

## D'où vient un income statement ?

Il vient du logiciel de paie de votre employeur, pas d'un formulaire que quelqu'un remplit en fin d'année. Avec le Single Touch Payroll, chaque paie transmet à l'ATO votre salaire brut, l'impôt retenu et votre superannuation au fur et à mesure, et l'income statement en est le cumul.

Ce relevé appartient donc aux systèmes de l'ATO, pas à votre ancien employeur. Une ferme de Mildura qui ne répond plus à vos emails a déjà déclaré vos salaires, et les chiffres peuvent être récupérés sans elle.

## À partir de quand est-il utilisable ?

L'année fiscale se termine le 30 juin, les employeurs commencent à finaliser vers le 14 juillet, et la plupart ont terminé d'ici le 31 juillet. Tant qu'un employeur n'a pas finalisé, le relevé affiche des chiffres cumulés depuis le début de l'année, non déclarés complets. Son statut passe à « tax ready » une fois la finalisation faite.

Déposer sa déclaration à partir d'un relevé qui n'est pas tax ready est le moyen le plus sûr d'obtenir un assessment erroné, puis une rectification. Les chiffres peuvent encore changer, et la déclaration ne correspond alors plus à ce que détient l'ATO. Mieux vaut attendre que tous les employeurs aient finalisé que déposer la première semaine de juillet.

## Quels sont les trois chiffres à vérifier ?

Le brut, l'impôt retenu et la super affichée à côté. Ces trois chiffres vous disent si votre année a été taxée comme elle devait l'être.

- **Gross payments (brut).** Comparez avec votre propre total cumulé tiré des payslips. Un écart veut dire soit une période de paie manquante, soit un sous-paiement.
- **Tax withheld (impôt retenu).** Divisez-le par le brut. Autour de 15 % est correct pour un working holiday maker chez un employeur enregistré. Nettement plus signifie une période sans votre TFN enregistré, ou un employeur qui ne s'est jamais enregistré.
- **Super.** Depuis le 1er juillet 2026, les cotisations sont généralement versées dans les sept jours ouvrables suivant chaque paie (avant, chaque trimestre) : un chiffre qui paraît faible peut simplement ne pas avoir encore été versé.

## Que faire s'il manque un employeur ?

Un employeur manquant est le défaut le plus courant, et il a trois causes. L'employeur n'a peut-être pas encore finalisé, auquel cas il suffit d'attendre. Il vous a peut-être déclaré sous un mauvais nom ou une mauvaise date de naissance : le dossier existe, mais il n'est pas rattaché à vous. Ou il n'a jamais déclaré les salaires du tout, ce qui est le cas du travail payé en cash.

Dans tous les cas, le revenu que vous avez gagné est imposable et doit figurer dans la déclaration, qu'un relevé existe ou non. Notre guide sur le [dépôt de la tax return avec des revenus en cash](/blog/cash-in-hand-tax-return) explique comment reconstituer une période pour laquelle rien n'a été déposé.

## Que faire si les chiffres sont faux ?

Les erreurs du relevé sont corrigées par l'employeur, pas en ajustant la déclaration pour qu'elle colle à vos payslips. Parmi les plus courantes : un total brut qui ne se réconcilie pas, une retenue qui reflète un mauvais statut de résidence, et des périodes de paie en double après un changement de logiciel de paie.

Quand l'employeur est réactif, la correction se fait en général en un ou deux cycles de paie. Quand il ne l'est pas, la déclaration peut être déposée sur une estimation correctement justifiée, puis rectifiée une fois la déclaration de l'employeur corrigée, dans la limite de deux ans. Ce qui ne marche pas, c'est d'utiliser discrètement un chiffre que l'ATO ne détient pas : c'est cet écart qui envoie une déclaration en examen manuel.

## Qu'est-ce qui décide de l'exhaustivité de votre déclaration ?

Le fait que chaque employeur de l'année ait été identifié, et rien d'autre ne s'en approche. Une année working holiday compte couramment trois, quatre ou cinq employeurs dans deux États, et souvent sur deux années fiscales. L'employeur oublié est presque toujours le plus court : trois semaines de packing en février, quinze jours de promotion, un shift via une agence.

Déposer sans avoir tenu compte de chacun d'eux est l'erreur d'auto-dépôt la plus fréquente, et elle joue dans les deux sens. Un employeur oublié avec une forte retenue, c'est un remboursement que vous n'avez jamais réclamé. Un employeur oublié dont vous n'avez pas déclaré les revenus, c'est une rectification et des intérêts plus tard. Quand nous préparons une [tax return](/tax-return), la liste complète est d'abord extraite des systèmes de l'ATO, car la mémoire est peu fiable après une année passée à bouger.

## Que devez-vous conserver vous-même ?

Gardez vos payslips, vos relevés bancaires qui montrent l'arrivée des salaires, et tout écrit concernant votre taux de rémunération. L'income statement vous dit ce qui a été déclaré. Vos propres documents sont les seuls à vous dire si ce qui a été déclaré correspond à ce qui vous était dû.

C'est surtout important dans le travail agricole et la restauration, où le chiffre déclaré peut être parfaitement exact en tant que trace d'un sous-paiement. La déclaration est préparée sur les chiffres déclarés dans tous les cas, mais l'écart mérite d'être connu, car le récupérer via Fair Work est une démarche distincte et gratuite.
`,
  },
  'what-is-the-ato': {
    title: "Qu'est-ce que l'ATO ? Le guide du backpacker",
    description: "L'ATO attribue votre TFN, reçoit les déclarations de vos employeurs, verse votre remboursement et libère votre super. Quatre échanges, un numéro.",
    body: `
L'Australian Taxation Office (ATO) est l'administration fédérale qui gère le système fiscal australien. Pour un working holiday maker, elle fait quatre choses : elle attribue votre TFN, elle reçoit ce que vos employeurs et vos fonds de super déclarent à votre sujet, elle traite votre tax return et verse le remboursement, et elle libère la super après votre départ.

## Que fait concrètement l'ATO qui vous concerne ?

Tout passe par votre Tax File Number. L'ATO l'attribue, puis s'en sert comme fil conducteur entre chaque déclaration de salaire, chaque cotisation de super, chaque versement d'intérêts bancaires et chaque tax return que vous déposez.

Son champ d'action est plus large : impôt sur le revenu, GST, registre des entreprises et système de la superannuation guarantee. Presque rien de tout cela ne touche directement un backpacker.

## Comment l'ATO sait-elle ce que vous avez gagné ?

Automatiquement, avant même que vous lui disiez quoi que ce soit. Les employeurs déclarent vos salaires et l'impôt retenu à chaque paie via le Single Touch Payroll, les fonds de super déclarent les cotisations versées pour vous, les banques déclarent les intérêts des comptes australiens, et les registres d'actions déclarent les dividendes.

C'est pourquoi une tax return peut être déposée depuis un autre pays sans une seule payslip. C'est aussi pourquoi un employeur qui n'a jamais finalisé ses déclarations pose un vrai problème : le revenu existe, vous le savez, et le dossier de l'ATO ne le montre pas. Vos payslips comblent cet écart.

## Dans quels cas l'ATO vous contacte-t-elle ?

La plupart des working holiday makers n'entendent jamais parler d'elle. Les raisons sont peu nombreuses : elle a besoin de précisions pour traiter une déclaration, ses chiffres ne correspondent pas à ce qui a été déclaré, un impôt est dû et impayé, une vérification d'identité retient un remboursement ou, plus rarement, un contrôle a été ouvert.

Un contact légitime arrive par courrier à l'adresse enregistrée, ou par l'intermédiaire d'un agent fiscal qui agit pour vous. Une adresse périmée pose donc problème : une lettre que vous n'avez jamais vue reste une lettre que vous êtes réputé avoir reçue.

## Comment distinguer un vrai contact d'une arnaque ?

Par ce qu'on vous demande et par l'urgence avec laquelle on le demande. L'ATO ne téléphone pas pour exiger un paiement immédiat, n'accepte pas de paiement en cartes cadeaux ni en cryptomonnaie, ne menace ni d'arrestation ni d'expulsion, et ne vous demande pas de rester en ligne pendant que vous allez dans un magasin.

Les working holiday makers sont visés en particulier : vous êtes nouveau dans le pays, vous ne savez pas ce qui est normal, et la menace d'un problème de visa est crédible pour vous d'une façon qu'elle ne le serait pas pour un Australien. Raccrochez et vérifiez de votre côté.

## Quel est le rôle de l'ATO pour récupérer votre super ?

Plutôt celui d'un gardien que d'un payeur, dans la plupart des cas. Quand une Departing Australia Superannuation Payment (DASP) est demandée, l'ATO vérifie que votre visa a pris fin et que vous avez quitté le pays, puis la demande passe à votre fonds de super, qui applique la retenue de 65 % et verse le solde.

L'exception, c'est la super que l'ATO détient déjà. Quand un fonds a perdu le contact avec vous, le solde est transféré à l'ATO en tant que super non réclamé, et c'est l'ATO qui le verse directement. Quelqu'un qui est parti il y a plus de six mois sans mettre à jour son adresse a de bonnes chances de se trouver dans ce cas. Les deux voies sont détaillées là où vous pouvez [réclamer votre super après avoir quitté l'Australie](/superannuation).

## L'état de vos documents décide de la suite.

Ce qui décide si ces quatre échanges ordinaires se passent bien, c'est l'état des dossiers que l'ATO détient sur vous.

- Le fait que l'adresse et les coordonnées bancaires connues de l'ATO soient à jour.
- Le fait que chaque employeur ait finalisé ses déclarations.
- Le fait que vous ayez encore accès à un compte en ligne que vous avez créé, ce qui devient un problème une fois à l'étranger.
- Le fait que votre super soit encore dans des fonds ou ait déjà été transférée à l'ATO comme super non réclamé.
- Le fait que vous ayez des années précédentes jamais déposées, que les dossiers de l'ATO montrent toujours.

Votre réconciliation annuelle avec l'ATO, c'est votre [tax return de working holiday maker](/tax-return), et vous pouvez [estimer votre remboursement d'impôt](/calculator) avant de déposer quoi que ce soit.
`,
  },
  'gross-pay-vs-net-pay-australia': {
    title: "Brut ou net en Australie : où part l'argent ?",
    description: "Le brut est avant impôt, le net arrive sur votre compte. Environ 15 % les séparent avec un PVT, et la super s'ajoute au salaire sans en être déduit.",
    body: `
Le gross pay (brut), c'est ce que vous avez gagné avant impôt. Le net pay (net), c'est ce qui arrive sur votre compte bancaire. Avec un visa vacances-travail et un TFN enregistré, environ 15 % du brut se trouve entre les deux. La superannuation ne fait pas partie de cet écart : elle est versée en plus de votre salaire, dans un fonds, et non déduite de celui-ci.

## Que signifient vraiment les montants de votre payslip ?

Une payslip australienne distingue quatre chiffres, et en confondre deux est la façon dont les gens concluent qu'ils ont été sous-payés alors que ce n'est pas le cas.

- **Gross pay** : le total des gains avant toute retenue
- **Tax withheld** : le PAYG versé à l'ATO en votre nom
- **Net pay** : le brut moins l'impôt retenu, le montant qui vous est viré
- **Super** : une ligne à part, versée par l'employeur dans votre fonds

Sur 1 000 $ de salaire brut chez un employeur enregistré pour les working holiday makers, 150 $ sont retenus à 15 %, 850 $ arrivent sur votre compte, et 120 $ de super à 12 % vont à votre fonds. La super n'apparaît jamais dans les 850 $, et ne doit pas y apparaître.

## Pourquoi la super n'est-elle pas une déduction ?

La superannuation est un coût pour l'employeur qui s'ajoute à votre salaire, pas une tranche de celui-ci. Elle est calculée à 12 % sur vos gains ordinaires bruts et versée dans un fonds à votre nom, et votre brut est le même que l'employeur la verse ou non. C'est la lecture erronée d'une payslip australienne que nous rencontrons le plus souvent.

Si une payslip montre la super soustraite du brut pour arriver à un brut plus faible, ce n'est pas une simple question de présentation. Cela signifie une erreur de paie, ou un employeur qui traite un salaire comme s'il incluait déjà la super, ce qui change ce qui vous est dû. Notre guide sur la [super impayée](/blog/super-employer-not-paying-what-to-do) explique quoi faire.

## Quel montant votre tax return utilise-t-elle ?

Votre tax return et votre income statement utilisent tous deux le brut, jamais le net. L'ATO calcule votre impôt sur le brut, puis crédite l'impôt déjà retenu, et la différence, dans un sens ou dans l'autre, est votre remboursement ou votre facture. Le net n'apparaît nulle part dans le calcul.

Cela piège ceux qui suivent leur année dans une appli bancaire. Le montant qui arrive sur votre compte représente environ 85 % du chiffre que l'ATO utilisera, si bien que l'année paraît toujours plus petite vue de la banque.

## Qu'est-ce qui décide de la part du brut que vous gardez ?

Trois faits sur votre année déterminent l'écart. Le taux de retenue est le plus important : 15 % avec un TFN enregistré chez un employeur enregistré pour les working holiday makers, 45 % sans TFN, et les taux des non-résidents si l'employeur ne s'est jamais enregistré comme employeur de working holiday makers. Chacun produit un net très différent pour le même brut.

- **Le fait que votre TFN ait été enregistré dès le premier jour.** Des semaines à 45 % avant le traitement du formulaire de déclaration donnent un net beaucoup plus mince, et l'excédent peut être récupéré au moment de la tax return, pas dans la paie.
- **Le fait que l'employeur soit enregistré auprès de l'ATO pour employer des working holiday makers.** Un employeur non enregistré retient aux taux des non-résidents, plus élevés que 15 % dès le premier dollar.
- **Le fait que les majorations, le loading et les indemnités aient été payés ou non.** Un taux casual qui omet discrètement le loading de 25 % abaisse le brut avant même que la retenue n'entre en jeu, et cette perte ne revient pas dans un remboursement.

## Comment vérifier que le brut est correct ?

Reconstituer le brut à partir de zéro prend environ cinq minutes, et cela vaut la peine d'être fait une fois par employeur tant que vous vous souvenez des shifts.

1. Les heures ordinaires multipliées par votre taux horaire
2. Plus les majorations (penalty rates) des shifts de week-end, de soirée et de jours fériés
3. Plus les indemnités, comme l'uniforme, les outils ou les déplacements
4. Plus les heures supplémentaires au bon taux
5. Comparez le total avec la ligne du brut sur la payslip

Quand les chiffres ne se réconcilient pas, la cause est généralement un classement d'un niveau trop bas dans l'award plutôt qu'un vol délibéré. Signalez-le par écrit au service paie, car c'est la version que les employeurs corrigent vite.

## À quel moment n'est-ce plus une question de payslip ?

Dès que l'écart entre le brut et le net vient de votre situation fiscale plutôt que d'un calcul. Une retenue excessive à 45 %, un employeur non enregistré, une Medicare levy prélevée sur quelqu'un qui n'a pas droit à Medicare, et une question de résidence mal remplie réduisent tous le net pendant l'année, et sont tous récupérés, ou non, dans la déclaration.

La payslip montre le montant prélevé et ne dit rien sur le fait qu'il aurait dû l'être. Savoir lequel de ces cas s'est appliqué à votre année, c'est à cela que sert une [tax return](/tax-return), et c'est pourquoi deux backpackers avec exactement le même brut peuvent se retrouver à des milliers de dollars d'écart.
`,
  },
  'do-working-holiday-makers-pay-tax-on-tips': {
    title: "Les pourboires sont-ils imposables en Australie ? Oui",
    description: "Les pourboires en cash ou par carte sont imposables. Ce qui passe par la paie, ce qu'il faut déclarer soi-même et les notes à garder.",
    body: `
Oui. Les pourboires sont un revenu imposable en Australie quelle que soit la forme sous laquelle ils arrivent, taxés au taux working holiday maker de 15 % sur les 45 000 premiers dollars, avec votre salaire. Ce qui varie, c'est qui déclare l'argent, et cela dépend de la façon dont le pourboire vous est parvenu.

## Quels pourboires sont déjà déclarés pour vous ?

Tout ce qui passe par la caisse de l'établissement. Les pourboires par carte, les service charges ajoutés à l'addition et les pourboires mutualisés et redistribués via un système de tronc passent tous par la paie : le PAYG est donc retenu sur le moment, et les montants figurent dans votre income statement de fin d'année avec le reste de votre salaire.

La déclaration et l'impôt sont déjà réglés sur cette part. Regardez une payslip : un établissement qui affirme redistribuer les pourboires alors que rien n'apparaît sur aucune payslip mérite une question.

## Quels pourboires devez-vous déclarer vous-même ?

Le cash remis directement en main propre. Personne ne l'enregistre, aucun PAYG n'est retenu, et il n'apparaît pas dans votre income statement. L'obligation de le déclarer à la fin de l'année fiscale vous revient.

Le montant détermine l'importance du sujet. Un café tranquille de banlieue ne génère presque rien en pourboires cash, et la question est théorique. Un bar très fréquenté du centre-ville les vendredis et samedis soir peut générer une somme significative sur une saison, et là, cela devient de l'argent réel dans la [tax return](/tax-return).

- Pourboires cash de clients : votre responsabilité, aucun impôt retenu sur le moment
- Pourboires partagés en cash en fin de shift : même traitement, à déclarer
- Pourboires par carte et tronc : déclarés via la paie, rien de plus à faire

## Quels justificatifs faut-il vraiment ?

Un total cumulé. L'ATO n'attend pas que chaque pourboire soit consigné. Un montant hebdomadaire noté quelque part de durable, avec la date et l'établissement, satisfait à l'obligation de tenue de registres.

L'alternative, c'est de deviner en octobre pour une saison terminée en mars. Ceux qui ne déclarent rien sont rarement malhonnêtes : ils n'ont aucune idée du chiffre et zéro leur paraît le plus prudent. Une note sur le téléphone règle ça.

## Que se passe-t-il si vous ne déclarez pas vos pourboires en cash ?

Pas de lettre de contrôle la semaine qui suit votre déclaration. La restauration est un secteur où les données sont recoupées, et les revenus non déclarés finissent par ressortir plus tard, via les déclarations au niveau des établissements et le profil des dépôts bancaires.

La conséquence, quand cela ressort, c'est l'impôt qui aurait dû être payé, plus une pénalité pour insuffisance et des intérêts, appliqués à l'année concernée. L'impôt sur une saison de pourboires déclarés à 15 % est plus faible que la plupart des gens ne le pensent. Pour qui prévoit une deuxième ou une troisième année, une situation non réglée avec l'ATO est un point en suspens dans toute démarche future auprès de l'administration australienne.

## La super est-elle versée sur les pourboires ?

Parfois, et cela dépend de la même distinction. Les pourboires redistribués via la paie de l'employeur peuvent faire partie des ordinary time earnings, auquel cas 12 % de [super](/superannuation) sont dus dessus. Le cash remis par un client n'est pas versé par l'employeur : aucune obligation de super n'y est attachée.

Le classement dépend de l'award et de la façon dont l'établissement a qualifié les versements, ce qu'une payslip ne vous dira pas. La vérification utile consiste à voir si vos cotisations de super sont cohérentes avec vos gains totaux, distributions du tronc comprises, car un trou à cet endroit relève de la même discussion que tout autre cas de [super non versé](/blog/super-employer-not-paying-what-to-do).
`,
  },
  'tax-obligations-after-leaving-australia': {
    title: "Impôts après avoir quitté l'Australie : ce qu'il reste",
    description: "Quitter l'Australie ne ferme pas votre dossier fiscal. Dernière déclaration, demande de super et annulation de l'ABN se font à distance.",
    body: `
Une carte d'embarquement n'est pas un événement fiscal. Tout ce que vous avez accumulé en travaillant en Australie reste chez l'ATO après votre départ : une déclaration pour chaque année fiscale où vous avez eu des revenus, un solde de super que personne ne réclame à votre place, un ABN qui reste enregistré tant que vous ne l'annulez pas. Rien de tout cela n'exige votre présence dans le pays, et rien n'expire parce que vous êtes parti.

## Qu'est-ce qui reste à régler une fois parti ?

Quatre choses, indépendantes les unes des autres, si bien qu'en faire une n'efface pas les autres. La dernière déclaration doit être déposée, le [super](/superannuation) réclamé, tout [ABN](/abn) annulé, et l'ATO doit avoir des coordonnées qui vous joignent encore.

- Déposer une déclaration pour chaque année fiscale australienne où vous avez eu des revenus
- Réclamer votre super via la Departing Australia Superannuation Payment (DASP)
- Annuler tout ABN enregistré comme sole trader
- Garder une adresse email et un compte bancaire qui fonctionnent

L'ATO détient vos revenus déclarés par chaque employeur où que vous soyez : une année non déposée ne passe donc pas inaperçue. Elle reste simplement ouverte.

## Comment se passe concrètement le dépôt depuis l'étranger ?

La même déclaration, préparée de la même façon, depuis un autre code postal. Les income statements viennent des systèmes de l'ATO et non de vos anciens employeurs, ce qui compte parce que courir après un packing shed du Queensland pour obtenir des documents depuis Berlin n'est pas un plan réaliste.

La date limite standard est le 31 octobre qui suit la fin de l'année fiscale. Les déclarations déposées par un agent enregistré bénéficient généralement d'un délai prolongé jusqu'au mois de mai suivant. Notre guide sur le [dépôt depuis l'étranger](/blog/how-to-lodge-tax-return-from-overseas) explique ce qu'il faut avoir sous la main.

## Quand pouvez-vous réclamer votre super ?

La demande de DASP s'ouvre quand deux conditions sont réunies : votre visa a cessé d'être en vigueur, et vous avez quitté l'Australie. Il faut les deux, pas l'une ou l'autre. Partir alors que le visa est encore valide oblige à attendre son expiration ou son annulation avant que la demande puisse avancer.

Le paiement subit une retenue de 65 % pour les cotisations de working holiday maker : un solde de 10 000 $ donne donc environ 3 500 $ net. L'approbation prend couramment autour de 28 jours une fois la demande complète, et le montant net peut être versé sur un compte australien ou étranger selon le fonds. Notre [guide de la super](/superannuation) détaille la démarche et les documents.

## Que se passe-t-il si vous laissez la super sur place ?

Si un fonds n'a pas eu de vos nouvelles pendant six mois après votre départ et que votre visa a expiré, il transfère le solde à l'ATO en tant que super non réclamé. L'argent reste le vôtre, mais la demande devient une demande auprès de l'ATO plutôt qu'auprès du fonds, avec des papiers différents.

Ce qui coûte vraiment de l'argent, c'est d'avoir plusieurs fonds et de ne réclamer que celui dont on se souvient. Quatre employeurs sur une année signifient souvent plus d'un fonds, chacun avec son solde et sa propre demande. Notre guide pour [retrouver une super perdue](/blog/how-to-find-lost-superannuation) explique comment la retrouver.

## Peut-on déposer avant le 30 juin si l'on part pour de bon ?

Oui, et presque personne ne le sait. Quelqu'un qui quitte définitivement l'Australie en cours d'année fiscale peut déposer une déclaration anticipée pour cette partie d'année au lieu d'attendre juillet, ce qui avance le remboursement de plusieurs mois.

Ce n'est pas automatiquement le meilleur choix. Une déclaration anticipée est préparée avant que les déclarations des employeurs soient finalisées : les chiffres doivent donc être construits à partir des payslips au lieu d'être récupérés, et un retour en Australie plus tard dans la même année oblige à la rectifier. Elle convient à un départ net avec des dossiers complets.

## Qu'est-ce qui rend la chose simple ou compliquée ?

Trois faits sur la façon dont vous êtes parti. Si votre compte bancaire australien est toujours ouvert : le remboursement comme la DASP sont versés sur un compte, et en rouvrir un depuis l'étranger est vraiment difficile. Si vous connaissez chaque employeur de l'année : un emploi oublié est la cause habituelle d'une rectification des mois plus tard. Et si le visa a bien expiré, ce qui conditionne la demande de super.

C'est le compte qui fait les vrais dégâts. Les gens ferment tout la semaine avant de s'envoler, ce qui transforme un remboursement simple en une opération de plusieurs mois pour rétablir des coordonnées de paiement depuis un autre continent. Gardez-le ouvert trois à quatre mois après votre départ, jusqu'à ce que le remboursement et la super soient tous deux arrivés.

## Est-ce grave de simplement ne pas déposer ?

C'est plus grave plus tard qu'aujourd'hui. Une année non déposée reste au dossier indéfiniment, et quand un remboursement était dû, il n'est tout simplement pas versé, ce qui est l'issue la plus courante et la plus silencieuse.

Quand de l'impôt était dû au lieu d'être remboursé, des intérêts courent et la dette suit le dossier fiscal plutôt que la personne, et elle refait surface dès qu'il y a une raison de regarder, y compris une future demande de visa australien. Notre guide sur les [déclarations tardives et les pénalités](/blog/late-tax-return-penalty-working-holiday) explique où les pénalités mordent réellement, ce qui est rarement là où les gens le craignent. [Contactez-nous](/contact) si vous êtes parti avec une année en suspens.
`,
  },
  'tax-residency-working-holiday-makers': {
    title: "Êtes-vous résident fiscal australien ?",
    description: "La résidence peut changer les taux de toute votre année. Elle ne se règle pas avec une liste de contrôle et demande une vraie vérification.",
    body: `
La résidence fiscale est la question qui a la plus grande portée dans une tax return de working holiday maker. Elle peut changer les taux appliqués à toute votre année, et c'est le point auquel on répond le plus souvent de travers, y compris quand on était sûr de sa réponse.

De quel côté de la ligne vous vous trouvez ne peut se déduire ni de cette page, ni d'une calculatrice, ni de l'expérience d'un ami. C'est une appréciation de votre propre année, et chaque déclaration préparée ici est vérifiée et validée par un agent fiscal enregistré avant qu'une position soit prise.

## Qu'est-ce que la résidence fiscale change ?

Plus que ce que la plupart des gens imaginent. Elle peut changer les taux appliqués à vos salaires, les déductions auxquelles vous avez droit, la façon dont les revenus de placement et les revenus étrangers sont traités, et le montant du résultat final. L'effet varie beaucoup d'une personne à l'autre, et personne ne peut dire de l'extérieur dans quel cas vous êtes.

## Pourquoi ne pouvez-vous pas le déterminer vous-même ?

Parce que ce n'est pas une question avec une seule réponse. Elle pèse ensemble de nombreux éléments de votre situation, dont certains auxquels la plupart des gens ne pensent pas à regarder, et aucun fait isolé ni aucune règle empirique ne la tranche. Deux voyageurs dont les années se ressemblent presque peuvent être correctement évalués de façon différente.

## Votre visa décide-t-il de la réponse ?

Pas à lui seul. Détenir un visa 417 ou 462 ne dit presque rien sur la façon dont votre année sera évaluée, et répondre à la question de résidence sur un formulaire à l'instinct est la manière dont les déclarations finissent fausses, dans les deux sens.

## Que se passe-t-il si l'on répond de travers ?

Soit vous revendiquez une position que vous ne pouvez pas justifier, ce qui peut conduire plus tard à un assessment rectifié, soit vous payez discrètement trop parce qu'une meilleure position n'a jamais été envisagée. Les deux cas sont courants, et les deux sont évitables.

## Qui devrait le vérifier pour vous ?

Un agent fiscal enregistré qui passe votre année en revue en entier avant que quoi que ce soit soit déposé. C'est ainsi que la résidence est traitée dans chaque [tax return de working holiday maker](/tax-return) préparée ici. [Contactez-nous](/contact) et nous la passerons en revue avec vous.
`,
  },
  'how-to-update-address-with-ato': {
    title: "Adresse ATO : pourquoi elle compte",
    description: "Une adresse périmée retarde votre lettre de TFN, vos avis de super et les courriers de l'ATO. Voici ce qui se passe et quelle adresse donner.",
    body: `
L'adresse que l'ATO détient pour vous détermine où partent votre lettre de TFN, vos avis d'imposition et le courrier lié à votre super. Le courrier déjà en route suit l'ancienne adresse : un changement ne joue donc que pour ce qui est posté après. Garder cette adresse à jour, c'est ce que notre équipe d'agents fiscaux fait pour ses clients dans le cadre de la déclaration.

## Pourquoi l'ATO a-t-elle une adresse si les remboursements vont sur un compte bancaire ?

Parce que plusieurs éléments qui décident si vous serez payé continuent de voyager par la poste. Votre lettre de TFN est envoyée par courrier, et uniquement par courrier. La correspondance de vérification d'identité est envoyée par courrier. Les avis d'imposition (Notice of Assessment), les lettres de rectification et toute demande d'information partent à l'adresse enregistrée, et une lettre que vous ne voyez jamais reste une lettre que vous êtes réputé avoir reçue.

Les remboursements eux-mêmes sont versés par voie électronique sur un compte bancaire australien dans presque tous les cas : une adresse périmée n'empêche donc généralement pas l'argent d'arriver. Elle bloque tout ce qui doit se passer avant l'argent.

## Qu'est-ce qui se passe mal quand l'adresse est ancienne ?

L'échec le plus coûteux est la lettre de TFN, parce qu'une lettre retournée relance une attente de 28 jours pendant que vous travaillez peut-être à 45 % au lieu de 15 %.

Le deuxième est la superannuation. Votre fonds et l'ATO détiennent chacun une adresse pour vous, et un fonds qui ne parvient pas à vous joindre finit par déclarer le compte comme non réclamé et par le transférer à l'ATO. Cet argent reste le vôtre et reste réclamable, mais il est désormais une étape de plus loin de vous au moment précis où vous quittez le pays.

Le troisième est le plus discret. Une lettre de l'ATO qui pose une question sur votre déclaration, restée sans réponse parce qu'elle est partie dans un hostel de Byron que vous avez quitté en mars, devient un assessment établi sans votre avis.

## Quelle adresse donner si vous déménagez toutes les quelques semaines ?

Un endroit qui conservera encore votre courrier dans quatre semaines, ce qui est rarement l'endroit où vous dormez ce soir. La récolte et la restauration font bouger les gens plus vite que la poste ne fait avancer les lettres.

- L'adresse australienne permanente d'un ami ou d'un proche est la meilleure réponse, même si vous n'y allez jamais.
- Un hostel de longue durée convient s'il garde réellement le courrier des clients partis, ce que beaucoup ne font pas.
- Une boîte postale (PO box) est acceptée et reste l'option la plus fiable pour quiconque passe une saison à enchaîner les fermes.
- Un hostel que vous quittez vendredi est la pire réponse, et c'est celle que la plupart des gens donnent.

L'ATO enregistre séparément une adresse postale et une adresse de résidence. Si vous utilisez une adresse de garde de courrier, mettez-la en adresse postale et laissez l'adresse de résidence à l'endroit où vous vivez réellement, car la lettre de TFN suit l'adresse postale.

## Votre adresse compte-t-elle encore une fois parti d'Australie ?

Oui, et c'est le moment où la plupart des gens cessent d'y penser. Une adresse à l'étranger peut être enregistrée auprès de l'ATO, et elle devrait l'être, parce que la correspondance après le départ est exactement celle que vous ne pouvez pas vous permettre de manquer : un remboursement en cours de vérification, une Departing Australia Superannuation Payment, une demande de confirmation d'identité.

Vos coordonnées bancaires comptent autant. Un remboursement dirigé vers un compte australien fermé en route vers l'aéroport ne disparaît pas, mais il revient et devient un crédit en attente sur votre compte ATO jusqu'à ce que quelqu'un dise à l'ATO où l'envoyer.

## Est-ce de l'intendance ou une urgence dans votre cas ?

Mettre à jour une adresse est la même tâche pour tout le monde, mais l'urgence n'est pas la même.

- Le fait que vous attendiez encore une lettre de TFN. Si c'est le cas, c'est urgent, et c'est la seule chose de cette page qui a un coût hebdomadaire.
- Le fait que vous ayez de la super dans un fonds qui a une ancienne adresse. Les comptes injoignables finissent transférés à l'ATO comme super non réclamé.
- Le fait que vous soyez sur le point de quitter l'Australie. L'adresse et le compte bancaire doivent tous deux être justes avant votre vol, pas après.
- Le fait que vous ayez plus d'un fonds de super issu de plusieurs employeurs. Chaque fonds détient sa propre adresse, et mettre à jour l'ATO ne met pas les fonds à jour.

Si vous partez avec de la super encore en Australie, l'adresse fait partie des éléments qui décident de la facilité avec laquelle vous pouvez [réclamer votre super après avoir quitté l'Australie](/superannuation), et vous pouvez [estimer votre remboursement d'impôt](/calculator) avant de déposer quoi que ce soit.
`,
  },
}
