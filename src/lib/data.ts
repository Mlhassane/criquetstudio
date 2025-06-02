// Types pour les articles et catégories
export type Article = {
  id: number
  slug: string
  title: string
  excerpt: string
  content: string
  category: string
  categorySlug: string
  date: string
  author: string
  image: string
}

// Données simulées pour les articles
export const articles: Article[] = [
  {
    id: 1,
    slug: "plan-developpement-infrastructures",
    title: "Le gouvernement annonce un plan ambitieux pour le développement des infrastructures nationales",
    excerpt:
      "Le Premier ministre a présenté hier un programme quinquennal visant à moderniser les infrastructures routières, énergétiques et numériques du pays.",
    content: `
      <p>Le Premier ministre nigérien a dévoilé hier un ambitieux plan quinquennal de développement des infrastructures nationales, lors d'une conférence de presse tenue au Palais du gouvernement à Niamey.</p>
      
      <p>Ce programme, estimé à plus de 500 milliards de francs CFA, vise à moderniser considérablement les infrastructures routières, énergétiques et numériques du pays d'ici 2030. "Notre objectif est de créer les conditions nécessaires pour une croissance économique durable et inclusive", a déclaré le Premier ministre.</p>
      
      <p>Le plan prévoit notamment la construction de plus de 2 000 kilomètres de routes bitumées reliant les principales villes du pays, l'extension du réseau électrique à 80% des zones rurales, et le déploiement de la fibre optique dans toutes les capitales régionales.</p>
      
      <p>Financé en partie par des partenaires internationaux, dont la Banque Mondiale et la Banque Africaine de Développement, ce programme devrait également créer plus de 50 000 emplois directs et indirects, selon les estimations du gouvernement.</p>
      
      <p>Les travaux devraient débuter dès le mois prochain, avec la réhabilitation de l'axe routier Niamey-Dosso, considéré comme prioritaire pour le désenclavement de la région.</p>
      
      <p>Les experts économiques saluent cette initiative, tout en soulignant l'importance d'une bonne gouvernance dans la mise en œuvre de ce vaste programme. "C'est un pas dans la bonne direction, mais la réussite dépendra de la transparence et de l'efficacité dans l'exécution des projets", a commenté Dr. Amadou Issoufou, économiste à l'Université de Niamey.</p>
    `,
    category: "Politique",
    categorySlug: "politique",
    date: "12 avril 2025",
    author: "Ibrahim Moussa",
    image: "/img.jpg",
  },
  {
    id: 2,
    slug: "hausse-prix-denrees-alimentaires",
    title: "Hausse des prix des denrées alimentaires : les commerçants expliquent",
    excerpt: "Les commerçants du grand marché de Niamey s'expriment sur les causes de l'inflation récente",
    content: `
      <p>Face à la hausse continue des prix des denrées alimentaires de première nécessité, les commerçants du grand marché de Niamey ont tenu à expliquer les raisons de cette inflation qui affecte le pouvoir d'achat des Nigériens.</p>
      
      <p>Selon Alhaji Mahamadou, président de l'association des commerçants du grand marché, plusieurs facteurs sont à l'origine de cette situation. "Les perturbations climatiques ont affecté les récoltes dans plusieurs régions du pays, réduisant l'offre face à une demande croissante", explique-t-il.</p>
      
      <p>La hausse des coûts de transport, liée à l'augmentation des prix du carburant, est également pointée du doigt. "Acheminer les marchandises depuis les zones de production jusqu'aux marchés urbains coûte désormais 30% plus cher qu'il y a six mois", précise Aïssa Abdou, grossiste en céréales.</p>
      
      <p>Les commerçants évoquent aussi les difficultés d'approvisionnement liées à la situation sécuritaire dans certaines régions frontalières, qui perturbent les circuits commerciaux traditionnels.</p>
      
      <p>Face à cette situation, le gouvernement a annoncé des mesures d'urgence, notamment la suspension temporaire des taxes sur l'importation de certains produits de première nécessité et la mise en place de stocks régulateurs pour stabiliser les prix.</p>
      
      <p>Les associations de consommateurs appellent quant à elles à une surveillance accrue des pratiques commerciales pour éviter toute spéculation abusive sur les prix.</p>
    `,
    category: "Économie",
    categorySlug: "economie",
    date: "11 avril 2025",
    author: "Amadou Issoufou",
    image: "/img.jpg",
  },
  {
    id: 3,
    slug: "rentree-scolaire-nouveaux-programmes",
    title: "Rentrée scolaire 2025 : les nouveaux programmes éducatifs dévoilés",
    excerpt: "Le Ministère de l'Éducation présente les réformes pour améliorer la qualité de l'enseignement",
    content: `
      <p>À l'approche de la rentrée scolaire 2025, le Ministère de l'Éducation Nationale a dévoilé les nouveaux programmes éducatifs qui seront mis en œuvre dans les établissements scolaires du Niger.</p>
      
      <p>Cette réforme, fruit de deux années de travail impliquant enseignants, experts en éducation et partenaires internationaux, vise à améliorer la qualité de l'enseignement et à adapter les contenus aux réalités et aux besoins du pays.</p>
      
      <p>"Nous avons mis l'accent sur l'enseignement des sciences, des mathématiques et des technologies, tout en renforçant l'apprentissage des langues nationales dans les premières années du primaire", a expliqué la Ministre de l'Éducation lors de la présentation officielle des nouveaux programmes.</p>
      
      <p>Parmi les innovations majeures, on note l'introduction de modules d'initiation à l'entrepreneuriat dès le collège, l'intégration de contenus sur l'environnement et le développement durable, ainsi que le renforcement de l'éducation civique.</p>
      
      <p>La réforme prévoit également une révision des méthodes d'évaluation, privilégiant désormais les compétences pratiques et la capacité d'analyse plutôt que la simple mémorisation.</p>
      
      <p>Pour accompagner cette réforme, plus de 15 000 enseignants ont déjà bénéficié de formations spécifiques durant les vacances scolaires, et de nouveaux manuels scolaires, conçus localement, seront distribués gratuitement aux élèves.</p>
      
      <p>Les syndicats d'enseignants saluent globalement cette initiative, tout en appelant à un meilleur accompagnement matériel pour sa mise en œuvre effective dans toutes les régions du pays.</p>
    `,
    category: "Éducation",
    categorySlug: "education",
    date: "10 avril 2025",
    author: "Mariama Abdou",
    image: "/img.jpg",
  },
  {
    id: 4,
    slug: "festival-air-agadez",
    title: "Le Festival de l'Aïr attire des milliers de visiteurs à Agadez",
    excerpt: "La célébration annuelle met en valeur la richesse culturelle des peuples touaregs",
    content: `
      <p>La ville historique d'Agadez a vibré pendant une semaine aux rythmes du Festival de l'Aïr, attirant des milliers de visiteurs venus de tout le Niger et de l'étranger.</p>
      
      <p>Cette célébration annuelle, qui met en valeur la richesse culturelle des peuples touaregs, a connu cette année une affluence record, signe d'un regain d'intérêt pour le tourisme culturel dans la région.</p>
      
      <p>"Nous avons accueilli plus de 5 000 visiteurs, dont près d'un millier d'étrangers, ce qui représente une augmentation de 30% par rapport à l'édition précédente", se réjouit Mohamed Anacko, président du comité d'organisation.</p>
      
      <p>Au programme de cette 15ème édition : concerts de musique traditionnelle, expositions d'artisanat, défilés de mode valorisant les créations locales, courses de chameaux et démonstrations de savoir-faire ancestraux.</p>
      
      <p>Le festival a également servi de plateforme pour sensibiliser à la préservation du patrimoine culturel immatériel de la région, avec plusieurs conférences et ateliers sur ce thème.</p>
      
      <p>"C'est une vitrine exceptionnelle pour notre culture et notre artisanat, mais aussi une opportunité économique importante pour toute la région", souligne Rhissa Feltou, maire d'Agadez.</p>
      
      <p>Les retombées économiques sont en effet significatives, avec un impact direct sur l'hôtellerie, la restauration et le commerce local. Les artisans, en particulier, ont pu écouler leurs productions et nouer des contacts avec des acheteurs internationaux.</p>
      
      <p>Fort de ce succès, les organisateurs envisagent déjà d'étendre la durée du festival pour l'édition 2026 et d'y ajouter de nouvelles activités pour attirer davantage de visiteurs.</p>
    `,
    category: "Culture",
    categorySlug: "culture",
    date: "9 avril 2025",
    author: "Ibrahim Moussa",
    image: "/img.jpg",
  },
  {
    id: 5,
    slug: "secheresse-sahel-plan-urgence",
    title: "Sécheresse au Sahel : le Niger met en place un plan d'urgence",
    excerpt:
      "Face à la sécheresse persistante, les autorités déploient des mesures d'urgence pour soutenir les populations affectées",
    content: `
      <p>Face à la sécheresse persistante qui affecte plusieurs régions du Sahel, le gouvernement nigérien vient d'annoncer la mise en place d'un plan d'urgence pour venir en aide aux populations touchées.</p>
      
      <p>Selon les données météorologiques, le déficit pluviométrique atteint 40% dans certaines zones du pays, compromettant gravement les récoltes et menaçant la sécurité alimentaire de milliers de familles.</p>
      
      <p>"Nous avons mobilisé 15 milliards de francs CFA pour financer des actions immédiates de soutien aux populations vulnérables", a déclaré le ministre de l'Action humanitaire lors d'une conférence de presse à Niamey.</p>
      
      <p>Ce plan d'urgence prévoit notamment la distribution de vivres dans les zones les plus affectées, la mise en place de points d'eau d'urgence pour le bétail, et le lancement de programmes "argent contre travail" pour soutenir les revenus des ménages ruraux.</p>
      
      <p>Des mesures à plus long terme sont également prévues, comme le renforcement des systèmes d'irrigation, la promotion de variétés de cultures résistantes à la sécheresse, et l'extension des programmes d'assurance agricole.</p>
      
      <p>Les partenaires internationaux du Niger, dont le Programme Alimentaire Mondial et la FAO, ont salué cette initiative et annoncé leur soutien technique et financier pour sa mise en œuvre.</p>
      
      <p>"Cette crise rappelle l'urgence d'investir dans l'adaptation au changement climatique dans la région sahélienne", a souligné le représentant du PNUD au Niger, appelant à une mobilisation internationale accrue sur cette question.</p>
    `,
    category: "Environnement",
    categorySlug: "environnement",
    date: "11 avril 2025",
    author: "Aïchatou Diallo",
    image: "/img.jpg",
  },
  {
    id: 6,
    slug: "cooperation-internationale-accord-ue",
    title: "Coopération internationale : signature d'un accord avec l'Union Européenne",
    excerpt:
      "Un nouvel accord de partenariat économique et de développement a été signé entre le Niger et l'Union Européenne",
    content: `
      <p>Le Niger et l'Union Européenne ont signé hier à Bruxelles un important accord de partenariat économique et de développement, marquant une nouvelle étape dans leurs relations bilatérales.</p>
      
      <p>Cet accord, qui couvre la période 2025-2030, prévoit un soutien financier de 450 millions d'euros pour accompagner les efforts de développement du Niger dans plusieurs secteurs prioritaires.</p>
      
      <p>"Ce partenariat renforcé témoigne de la confiance mutuelle entre le Niger et l'Union Européenne, et de notre engagement commun pour le développement durable et la stabilité dans la région sahélienne", a déclaré le ministre nigérien des Affaires étrangères lors de la cérémonie de signature.</p>
      
      <p>Les fonds alloués seront principalement destinés à des projets dans les domaines de l'agriculture durable, de l'accès à l'énergie, de la formation professionnelle des jeunes, et de la gouvernance.</p>
      
      <p>L'accord comprend également un volet commercial visant à faciliter l'accès des produits nigériens au marché européen, notamment pour l'artisanat, les produits agricoles transformés et les minerais.</p>
      
      <p>Un mécanisme de suivi conjoint sera mis en place pour assurer la transparence dans l'utilisation des fonds et évaluer régulièrement l'impact des projets financés.</p>
      
      <p>Les organisations de la société civile nigérienne ont globalement accueilli favorablement cet accord, tout en appelant à une meilleure implication des acteurs locaux dans la définition des priorités et la mise en œuvre des projets.</p>
    `,
    category: "Politique Étrangère",
    categorySlug: "politique-etrangere",
    date: "10 avril 2025",
    author: "Moussa Abdoulaye",
    image: "/img.jpg",
  },
  {
    id: 7,
    slug: "artisans-nigeriens-salon-international",
    title: "Les artisans nigériens brillent au Salon international de l'artisanat",
    excerpt:
      "Les créations des artisans du Niger ont été particulièrement remarquées lors du Salon international de l'artisanat de Paris",
    content: `
      <p>Les artisans nigériens ont fait sensation au Salon international de l'artisanat qui s'est tenu la semaine dernière à Paris, attirant l'attention des visiteurs et des professionnels du secteur.</p>
      
      <p>La délégation nigérienne, composée de 25 artisans représentant diverses spécialités, a présenté un éventail impressionnant de créations alliant savoir-faire traditionnel et innovation.</p>
      
      <p>"Les bijoux touaregs en argent, les sculptures sur bois, les poteries décoratives et les textiles teints à l'indigo ont particulièrement séduit les visiteurs", rapporte Aïcha Hamani, directrice de la promotion de l'artisanat au Ministère de la Culture.</p>
      
      <p>Plusieurs artisans ont conclu d'importants contrats avec des distributeurs européens, notamment Abdoul Razak, maître bijoutier de Tahoua, qui a signé un partenariat avec une chaîne de boutiques de luxe pour la commercialisation de ses créations en Europe.</p>
      
      <p>"C'est une reconnaissance de la qualité et de l'originalité de notre travail, mais aussi une opportunité économique majeure pour notre communauté d'artisans", se réjouit-il.</p>
      
      <p>Le pavillon du Niger a également accueilli plusieurs ateliers de démonstration, permettant aux visiteurs de découvrir les techniques ancestrales de travail du cuir, de la vannerie et de la forge traditionnelle.</p>
      
      <p>Cette participation réussie s'inscrit dans la stratégie nationale de promotion de l'artisanat nigérien à l'international, un secteur qui emploie plus de 500 000 personnes dans le pays et représente une source importante de devises étrangères.</p>
      
      <p>Le Ministère de la Culture a annoncé son intention de renforcer le soutien aux artisans pour les aider à moderniser leurs outils de production et à adapter leurs créations aux goûts du marché international, tout en préservant l'authenticité culturelle qui fait leur force.</p>
    `,
    category: "Culture",
    categorySlug: "culture",
    date: "9 avril 2025",
    author: "Fatima Sidikou",
    image: "/img.jpg",
  },
  {
    id: 8,
    slug: "programme-agricole-securite-alimentaire",
    title: "Le Niger lance un ambitieux programme agricole pour renforcer la sécurité alimentaire",
    excerpt: "Le gouvernement nigérien vient d'annoncer le lancement d'un programme agricole d'envergure nationale",
    content: `
      <p>Le gouvernement nigérien vient d'annoncer le lancement d'un programme agricole d'envergure nationale visant à moderniser le secteur et à augmenter la production alimentaire.</p>
      
      <p>Ce projet, baptisé "Niger Nourricier 2030", mobilisera plus de 300 milliards de francs CFA sur cinq ans pour transformer l'agriculture nigérienne et renforcer la sécurité alimentaire du pays.</p>
      
      <p>"Notre objectif est d'atteindre l'autosuffisance alimentaire pour les principales céréales d'ici 2030 et de réduire significativement notre dépendance aux importations", a déclaré le ministre de l'Agriculture lors du lancement officiel du programme à Dosso.</p>
      
      <p>Financé en partie par des partenaires internationaux, dont la Banque Mondiale et la FAO, ce programme prévoit la distribution de semences améliorées à plus de 500 000 agriculteurs, la réhabilitation de 50 000 hectares de périmètres irrigués, et la construction de 1 000 nouveaux forages pour l'irrigation.</p>
      
      <p>Un volet important du programme est consacré à la formation des agriculteurs aux techniques modernes de production et à l'agriculture intelligente face au climat, pour mieux faire face aux défis du changement climatique.</p>
      
      <p>Le programme inclut également des mesures pour faciliter l'accès au crédit agricole, notamment pour les femmes et les jeunes entrepreneurs, ainsi que des investissements dans les infrastructures de stockage et de transformation des produits agricoles.</p>
      
      <p>"C'est une approche intégrée qui prend en compte toute la chaîne de valeur, de la production à la commercialisation", souligne Dr. Amadou Diallo, expert en développement rural.</p>
      
      <p>Les premières actions concrètes débuteront dès le mois prochain avec la distribution de kits agricoles dans les régions de Tillabéri, Dosso et Maradi, considérées comme prioritaires pour cette première phase.</p>
    `,
    category: "Agriculture",
    categorySlug: "agriculture",
    date: "8 avril 2025",
    author: "Fatima Mahamadou",
    image: "/img.jpg",
  },
  {
    id: 9,
    slug: "campagne-vaccination-meningite",
    title: "Santé publique : campagne de vaccination contre la méningite dans les régions du nord",
    excerpt: "Le Ministère de la Santé lance une vaste campagne de vaccination préventive contre la méningite",
    content: `
      <p>Le Ministère de la Santé Publique du Niger a lancé cette semaine une vaste campagne de vaccination préventive contre la méningite dans les régions du nord du pays, particulièrement exposées à cette maladie.</p>
      
      <p>Cette initiative, qui cible plus de 2 millions de personnes âgées de 1 à 29 ans, vise à prévenir une éventuelle épidémie durant la saison sèche, période propice à la propagation de la maladie.</p>
      
      <p>"La méningite reste une menace sérieuse pour la santé publique dans notre pays, avec des taux de mortalité qui peuvent atteindre 10% même avec un traitement approprié", rappelle Dr. Aïchatou Kader, directrice de la prévention au Ministère de la Santé.</p>
      
      <p>Pour cette campagne, plus de 500 équipes mobiles ont été déployées dans les régions d'Agadez, Tahoua et Tillabéri, avec un accent particulier sur les zones rurales éloignées et les communautés nomades.</p>
      
      <p>Le vaccin utilisé, développé spécifiquement pour les souches de méningite prévalentes dans la région sahélienne, offre une protection de longue durée et a déjà fait ses preuves lors de précédentes campagnes.</p>
      
      <p>Parallèlement à la vaccination, des actions de sensibilisation sont menées auprès des populations sur les symptômes de la maladie et l'importance d'une consultation médicale rapide en cas de signes suspects.</p>
      
      <p>Cette campagne, d'un coût total de 3,5 milliards de francs CFA, est financée conjointement par l'État nigérien et des partenaires internationaux comme l'OMS, l'UNICEF et GAVI.</p>
      
      <p>Les autorités sanitaires espèrent atteindre un taux de couverture vaccinale d'au moins 95% dans les zones ciblées, ce qui permettrait d'établir une immunité collective efficace contre la maladie.</p>
    `,
    category: "Santé",
    categorySlug: "sante",
    date: "7 avril 2025",
    author: "Dr. Aïchatou Kader",
    image: "/img.jpg",
  },
  {
    id: 10,
    slug: "centrale-photovoltaique-maradi",
    title: "Énergie solaire : inauguration d'une centrale photovoltaïque à Maradi",
    excerpt: "Une nouvelle centrale solaire de 30 MW vient d'être mise en service dans la région de Maradi",
    content: `
      <p>Une nouvelle centrale solaire photovoltaïque d'une capacité de 30 mégawatts vient d'être inaugurée dans la région de Maradi, marquant une étape importante dans la transition énergétique du Niger.</p>
      
      <p>Cette infrastructure, construite sur un terrain de 60 hectares à 15 kilomètres de la ville de Maradi, représente un investissement de 45 millions de dollars, financé par un partenariat public-privé impliquant l'État nigérien et des investisseurs internationaux.</p>
      
      <p>"Cette centrale permettra d'alimenter en électricité plus de 100 000 foyers et entreprises de la région, tout en réduisant notre dépendance aux énergies fossiles importées", s'est réjoui le ministre de l'Énergie lors de la cérémonie d'inauguration.</p>
      
      <p>Équipée de 90 000 panneaux solaires de dernière génération et d'un système de stockage par batteries, la centrale peut fonctionner 24 heures sur 24, assurant ainsi une alimentation stable même après le coucher du soleil.</p>
      
      <p>Le projet a créé 200 emplois directs pendant la phase de construction et maintient 50 postes permanents pour l'exploitation et la maintenance des installations.</p>
      
      <p>"C'est un exemple concret de développement durable, qui concilie croissance économique, création d'emplois et protection de l'environnement", a souligné Ousmane Diallo, directeur général de la société exploitante.</p>
      
      <p>Cette centrale s'inscrit dans la stratégie nationale de développement des énergies renouvelables, qui vise à porter à 30% la part du solaire dans le mix énergétique du Niger d'ici 2030.</p>
      
      <p>Deux autres projets similaires sont déjà en cours de développement dans les régions de Tahoua et Zinder, avec des mises en service prévues respectivement en 2026 et 2027.</p>
    `,
    category: "Énergie",
    categorySlug: "energie",
    date: "6 avril 2025",
    author: "Ousmane Diallo",
    image: "/img.jpg",
  },
  // Ajout d'articles pour la catégorie "Société"
  {
    id: 11,
    slug: "jeunes-entrepreneurs-nigeriens",
    title: "Les jeunes entrepreneurs nigériens à l'honneur lors d'un forum international",
    excerpt: "Une délégation de startups nigériennes a présenté ses innovations lors d'un forum international à Dakar",
    content: `
      <p>Une délégation de jeunes entrepreneurs nigériens a fait forte impression lors du Forum International de l'Innovation et de l'Entrepreneuriat qui s'est tenu la semaine dernière à Dakar, au Sénégal.</p>
      
      <p>Composée de dix startups opérant dans divers secteurs, cette délégation a présenté des solutions innovantes adaptées aux défis spécifiques du continent africain, suscitant l'intérêt des investisseurs et des partenaires potentiels.</p>
      
      <p>Parmi les projets qui ont particulièrement retenu l'attention figure "Sahel Irrigation", une application mobile développée par Hamidou Maïga, qui permet aux agriculteurs d'optimiser leur consommation d'eau grâce à des capteurs connectés et des algorithmes d'intelligence artificielle.</p>
      
      <p>"Notre technologie permet de réduire jusqu'à 40% la consommation d'eau tout en augmentant les rendements agricoles de 25%", explique le jeune ingénieur de 28 ans, diplômé de l'École des Mines de Niamey.</p>
      
      <p>Autre succès notable, la plateforme "NigerPay", créée par Aïcha Ibrahim, qui facilite les transactions financières pour les populations non bancarisées grâce à un système simple utilisant les téléphones mobiles basiques.</p>
      
      <p>"Au Niger, moins de 20% de la population a accès aux services bancaires traditionnels, mais plus de 80% possède un téléphone mobile. Notre solution comble ce fossé", souligne l'entrepreneure de 32 ans.</p>
      
      <p>À l'issue du forum, trois startups nigériennes ont conclu des accords de financement avec des investisseurs internationaux, pour un montant total de 1,2 million de dollars.</p>
      
      <p>Le Ministre nigérien de l'Économie Numérique, présent à Dakar pour soutenir la délégation, a salué ces succès et annoncé le lancement prochain d'un fonds national dédié au financement des startups innovantes, doté d'une enveloppe initiale de 5 milliards de francs CFA.</p>
    `,
    category: "Société",
    categorySlug: "societe",
    date: "5 avril 2025",
    author: "Mariama Abdou",
    image: "/img.jpg",
  },
  {
    id: 12,
    slug: "traditions-mariage-niger",
    title: "Les traditions de mariage au Niger : entre héritage culturel et modernité",
    excerpt: "Un regard sur l'évolution des cérémonies de mariage dans les différentes communautés du Niger",
    content: `
      <p>Les cérémonies de mariage au Niger, riches en couleurs et en traditions, connaissent une évolution notable ces dernières années, entre préservation des rituels ancestraux et adaptation aux réalités contemporaines.</p>
      
      <p>Dans la communauté haoussa, majoritaire dans le pays, le "Fatiha", cérémonie religieuse qui scelle l'union, reste un moment incontournable. Cependant, les festivités qui l'accompagnent se transforment progressivement.</p>
      
      <p>"Autrefois, les célébrations s'étalaient sur une semaine entière, avec des rituels spécifiques pour chaque journée. Aujourd'hui, la plupart des familles concentrent les festivités sur deux ou trois jours", explique Hadiza Moussa, sociologue à l'Université de Niamey.

      <p>Chez les Touaregs du nord, la cérémonie du "Takouba", où le marié reçoit le sabre traditionnel symbolisant son passage à l'âge adulte, perdure. Mais là aussi, les changements sont perceptibles.</p>
      
      <p>"Les jeunes couples urbains intègrent désormais des éléments modernes tout en conservant l'essentiel des rituels. Par exemple, la tenue traditionnelle indigo cohabite avec le costume occidental pour le marié", observe Rhissa Ag Boula, chef traditionnel de la région d'Agadez.</p>
      
      <p>L'aspect économique des mariages connaît également une évolution significative. La dot, autrefois constituée principalement de bétail et de biens matériels, inclut aujourd'hui souvent des sommes d'argent, des bijoux modernes ou même des biens électroniques.</p>
      
      <p>Face à l'inflation des coûts des cérémonies, certaines communautés ont mis en place des mesures pour limiter les dépenses. À Maradi, les autorités religieuses et traditionnelles ont établi un plafond pour la dot afin d'éviter que le coût élevé des mariages ne devienne un obstacle pour les jeunes.</p>
      
      <p>Les nouvelles technologies transforment également ces célébrations. La diffusion en direct des cérémonies sur les réseaux sociaux pour les membres de la famille vivant à l'étranger est devenue courante dans les milieux urbains.</p>
      
      <p>Malgré ces évolutions, l'essence même du mariage nigérien, comme moment de renforcement des liens communautaires et familiaux, demeure intacte, témoignant de la capacité des traditions à s'adapter sans se dénaturer.</p>
    `,
    category: "Société",
    categorySlug: "societe",
    date: "4 avril 2025",
    author: "Aïcha Hamani",
    image: "/img.jpg",
  },
  {
    id: 13,
    slug: "artisanat-feminin-niger",
    title: "L'artisanat féminin au Niger : un secteur en pleine renaissance",
    excerpt: "Les artisanes nigériennes innovent tout en préservant les techniques ancestrales",
    content: `
      <p>L'artisanat féminin connaît une véritable renaissance au Niger, porté par des initiatives qui allient préservation des savoir-faire traditionnels et innovation créative.</p>
      
      <p>Dans la région de Dosso, le collectif "Femmes et Traditions" regroupe plus de 200 artisanes spécialisées dans la poterie décorative. Grâce à un programme de formation soutenu par l'UNESCO, ces femmes ont modernisé leurs techniques tout en conservant les motifs et symboles ancestraux.</p>
      
      <p>"Nous utilisons désormais des fours améliorés qui consomment moins de bois et produisent des pièces de meilleure qualité, mais les dessins et les méthodes de préparation de l'argile restent fidèles à notre héritage", explique Mariama Soumana, présidente du collectif.</p>
      
      <p>À Agadez, ce sont les bijoutières touarègues qui réinventent leur art. Traditionnellement réservé aux hommes, le travail de l'argent s'ouvre progressivement aux femmes qui y apportent une sensibilité nouvelle.</p>
      
      <p>"Nos créations intègrent des éléments contemporains tout en respectant les symboles traditionnels touaregs. Cette approche nous a permis d'accéder à de nouveaux marchés, notamment en Europe", témoigne Fatima Ag Ghali, dont les bijoux sont désormais exposés dans plusieurs galeries parisiennes.</p>
      
      <p>Le tissage et la vannerie connaissent également un renouveau, avec l'introduction de matériaux recyclés et de nouvelles techniques de teinture végétale. À Zinder, l'association "Fil et Avenir" forme des jeunes femmes à ces métiers tout en développant des produits adaptés aux goûts contemporains : sacs, accessoires de mode, objets de décoration.</p>
      
      <p>Ces initiatives contribuent significativement à l'autonomisation économique des femmes dans les zones rurales. Selon une étude récente du Ministère de l'Artisanat, les revenus des artisanes organisées en coopératives ont augmenté de 45% en moyenne au cours des cinq dernières années.</p>
      
      <p>Pour soutenir cette dynamique, le gouvernement nigérien a lancé un programme national de valorisation de l'artisanat féminin, incluant des facilités d'accès au microcrédit, des formations techniques et commerciales, et la création de plateformes de vente en ligne pour atteindre les marchés internationaux.</p>
    `,
    category: "Société",
    categorySlug: "societe",
    date: "3 avril 2025",
    author: "Fatima Sidikou",
    image: "/img.jpg",
  },
]

// Fonction pour obtenir tous les articles
export function getAllArticles() {
  return articles
}

// Fonction pour obtenir un article par son slug
export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug)
}

// Fonction pour obtenir les articles par catégorie
export function getArticlesByCategory(categorySlug: string) {
  return articles.filter((article) => article.categorySlug === categorySlug)
}

// Fonction pour rechercher des articles
export function searchArticles(query: string) {
  const searchTerm = query.toLowerCase()
  return articles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.content.toLowerCase().includes(searchTerm),
  )
}

// Liste des catégories
export const categories = [
  { name: "Politique", slug: "politique" },
  { name: "Économie", slug: "economie" },
  { name: "Société", slug: "societe" },
  { name: "Culture", slug: "culture" },
  { name: "Santé", slug: "sante" },
  { name: "Éducation", slug: "education" },
  { name: "Environnement", slug: "environnement" },
  { name: "Agriculture", slug: "agriculture" },
  { name: "Énergie", slug: "energie" },
  { name: "Politique Étrangère", slug: "politique-etrangere" },
]
