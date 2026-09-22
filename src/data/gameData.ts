import { 
  CharacterProfile, 
  PoliticalParty, 
  CampaignPromise, 
  Dilemma,
  GameEnding,
  EndingType,
  RivalCandidate,
  ProfileId,
  ProfileComodin,
  PartyId
} from '../types';

export const PES_LICENSE_DISCLAIMER = 
  'Son nombres ficticios, porque no tenemos la licencia, somos como PES. Si un partido desea otorgar la licencia, estaremos encantados de recibirla. Pero gratel, porque somos misios.';

export const MALE_PROFILES: CharacterProfile[] = [
  {
    id: 'intelectual',
    gender: 'masculino',
    name: 'Intelectual',
    tagline: '4 maestrías que a nadie le importan',
    description: 'Tu plan de gobierno tiene 400 páginas que ni tu primer regidor ha leído.',
    avatarEmoji: '🧐',
    avatarBg: 'bg-indigo-900',
    statBonus: { mediaCredibility: 15, jneTachaRisk: -10, popularSympathy: -5, polling: 0.8 },
    quote: '"Como señalaba Habermas en su teoría de la acción comunicativa, el bypass carece de sustento epistemológico y ontológico."'
  },
  {
    id: 'bajado_de_pepa',
    gender: 'masculino',
    name: 'El bajado de pepa',
    tagline: 'Hablas huevadas, pero conectas con la generación Z',
    description: 'Los dibujitos te apoyan.',
    avatarEmoji: '🤪',
    avatarBg: 'bg-amber-600',
    statBonus: { polling: 1.4, popularSympathy: 15, jneTachaRisk: 10, mediaCredibility: -5 },
    quote: '"¡Causa, si gano Lima pongo feriado todos los lunes de resaca y canchas de skate en la Vía Expresa, sapeee!"'
  },
  {
    id: 'galan',
    gender: 'masculino',
    name: 'El Galán',
    tagline: 'Eres “pintón”. Todo el público femenino te aclama',
    description: 'Te shippean con Juliana Oxenford por alguna extraña razón.',
    avatarEmoji: '😎',
    avatarBg: 'bg-pink-700',
    statBonus: { polling: 1.0, campaignFunds: 2, popularSympathy: 10 },
    quote: '"Lima no necesita ideologías extremas, necesita un alcalde que le devuelva la sonrisa, el porte y el colágeno a la ciudad."'
  },
  {
    id: 'sindicalista',
    gender: 'masculino',
    name: 'Sindicalista',
    tagline: 'Siempre haces huelga frente al Palacio Municipal',
    description: 'Aclamas reivindicar a los limeños menos favorecidos viviendo en Miraflores.',
    avatarEmoji: '✊🏽',
    avatarBg: 'bg-red-800',
    statBonus: { popularSympathy: 12, campaignFunds: -2, mediaCredibility: -5, jneTachaRisk: -5, polling: 0.5 },
    quote: '"¡Compañeros! ¡Ni un paso atrás ante los consorcios monopólicos mientras tomo mi capuchino descafeinado en Larcomar!"'
  },
  {
    id: 'vendedor',
    gender: 'masculino',
    name: 'El vendedor',
    tagline: 'Perfil outsider y un discurso popular',
    description: 'que asusta a las tías miraflorinas',
    avatarEmoji: '🤠',
    avatarBg: 'bg-emerald-800',
    statBonus: { polling: 1.5, popularSympathy: 15, jneTachaRisk: 12 },
    quote: '"Yo no vengo de los cócteles del Club Terrazas, hermanos. Yo sé lo que es el sudor del micro y esperar 3 horas parado en Puente Nuevo."'
  }
];

export const FEMALE_PROFILES: CharacterProfile[] = [
  {
    id: 'doctora_academica',
    gender: 'femenino',
    name: 'La doctora académica',
    tagline: 'Nadie sabe exactamente qué propone,',
    description: 'pero su bibliografía tiene más páginas que el presupuesto municipal.',
    avatarEmoji: '👩‍🏫',
    avatarBg: 'bg-teal-900',
    statBonus: { mediaCredibility: 18, jneTachaRisk: -12, popularSympathy: -6, polling: 0.8 },
    quote: '"De acuerdo con mi tesis doctoral en Heidelberg, la movilidad metropolitana es un constructo socioespacial asimétrico."'
  },
  {
    id: 'tiktoker',
    gender: 'femenino',
    name: 'Tiktoker',
    tagline: 'Haces videos denunciando huecos en las pistas',
    description: 'Tienes 600 mil seguidores y haces lives pidiendo Yape.',
    avatarEmoji: '📱',
    avatarBg: 'bg-fuchsia-700',
    statBonus: { polling: 1.5, popularSympathy: 14, jneTachaRisk: 8 },
    quote: '"¡Chicos miren este cráter lunar en plena Javier Prado! Manden leoncitos en TikTok y mandamos a parcharlo hoy mismo."'
  },
  {
    id: 'dirigente_social',
    gender: 'femenino',
    name: 'Dirigente social',
    tagline: 'Vistes un mandil floreado',
    description: 'Prometes reivindicar a las señitos de las ollas comunes y mandar bien lejos a Sedapal.',
    avatarEmoji: '👵🏽',
    avatarBg: 'bg-orange-700',
    statBonus: { popularSympathy: 16, campaignFunds: -2, mediaCredibility: 5, polling: 0.5 },
    quote: '"¡A mí no me tiembla la mano! Si Sedapal no abre la matriz, cerramos la Panamericana con ollas, cucharones y leña."'
  },
  {
    id: 'girly',
    gender: 'femenino',
    name: 'Girly',
    tagline: 'El Regatas es tu segundo hogar',
    description: 'Prometes enrejar los parques del distrito para que "no entre gente rara a hacer picnic".',
    avatarEmoji: '💅🏼',
    avatarBg: 'bg-sky-800',
    statBonus: { campaignFunds: 5, popularSympathy: -8, mediaCredibility: 10, polling: 1.0 },
    quote: '"O sea manix, Lima tiene que ser aesthetic. No podemos permitir que la gente traiga taper con arroz chaufa al Olivar, es un horror."'
  },
  {
    id: 'emprendedora',
    gender: 'femenino',
    name: 'Emprendedora',
    tagline: 'Tienes negocios informales en Mesa Redonda',
    description: 'Tu terror no es el debate, sino los fiscalizadores.',
    avatarEmoji: '💼',
    avatarBg: 'bg-amber-700',
    statBonus: { campaignFunds: 6, jneTachaRisk: 14, polling: 1.2 },
    quote: '"A Lima le falta facturar, papá. Menos floro de regidores y más chamba 24/7 sin fiscalizadores abusivos."'
  },
  {
    id: 'ex_chica_reality',
    gender: 'femenino',
    name: 'Ex-Chica Reality',
    tagline: 'Pasaste de pelearte con tu ex en Magaly',
    description: 'a postular aspirando a los votos de los chibolos pulpines.',
    avatarEmoji: '✨',
    avatarBg: 'bg-rose-600',
    statBonus: { polling: 1.6, jneTachaRisk: 12, mediaCredibility: -5 },
    quote: '"Muchos dicen que solo sé saltar la tuerca, pero mi vocación de servicio es real... ¡y los ampays quedaron en el pasado!"'
  }
];

export const PARTIES: PoliticalParty[] = [
  {
    id: 'bloque_naranja',
    name: 'Bloque Naranja',
    originalInspiration: 'Fuerza Popular',
    shortName: 'Bloque Naranja',
    color: '#FF6600',
    bgClass: 'bg-orange-600',
    borderClass: 'border-orange-500',
    textClass: 'text-orange-400',
    slogan: '¡Por la mano dura, la disciplina y el taper sagrado!',
    symbol: 'K-Naranja',
    symbolEmoji: '🍊',
    description: 'Tradición disciplinada. Tienen personeros en cada mesa electoral listos para impugnar hasta las firmas de tu tía.'
  },
  {
    id: 'renovacion_del_pueblo',
    name: 'Renovación del Pueblo',
    originalInspiration: 'Renovación Popular',
    shortName: 'Renovación P.',
    color: '#0099FF',
    bgClass: 'bg-sky-600',
    borderClass: 'border-sky-400',
    textClass: 'text-sky-400',
    slogan: '¡Lima Potencia Mundial y teleférico hasta Huarochirí!',
    symbol: 'Ola Celeste',
    symbolEmoji: '🌊',
    description: 'Prometen hacer de Lima la capital de Europa y llevar motos con GPS a perseguir carteristas en los cerros.'
  },
  {
    id: 'juan_perez',
    name: 'Partido Político Juan Perez (JP)',
    originalInspiration: 'Juntos por el Perú',
    shortName: 'Juan Pérez (JP)',
    color: '#D92525',
    bgClass: 'bg-red-600',
    borderClass: 'border-red-500',
    textClass: 'text-red-400',
    slogan: 'Cualquier parecido a la realidad es pura coincidencia',
    symbol: 'JP Rojo y Verde',
    symbolEmoji: '🚩',
    description: 'Colectivo progresista con olor a café de Chanchamayo. Cada asamblea municipal dura 9 horas y termina en debate filosófico.'
  },
  {
    id: 'avanza_patriota',
    name: 'Avanza Patriota',
    originalInspiration: 'Avanza País',
    shortName: 'Avanza Pat.',
    color: '#003399',
    bgClass: 'bg-blue-700',
    borderClass: 'border-blue-500',
    textClass: 'text-blue-400',
    slogan: '¡El tren del progreso con chofer sin brevete!',
    symbol: 'Tren Azul',
    symbolEmoji: '🚆',
    description: 'Promueven la libre empresa, formalizar los colectivos y desregular todo... hasta los límites de velocidad.'
  },
  {
    id: 'somos_clave',
    name: 'Somos Clave',
    originalInspiration: 'Somos Perú',
    shortName: 'Somos Clave',
    color: '#E11D48',
    bgClass: 'bg-rose-600',
    borderClass: 'border-rose-500',
    textClass: 'text-rose-400',
    slogan: 'El corazón que late... mientras no nos investiguen',
    symbol: 'Corazón Rojo',
    symbolEmoji: '❤️',
    description: 'El clásico partido municipal con arraigo distrital. Prometen parchar pistas un mes antes de cada elección.'
  },
  {
    id: 'nosotros_podemos',
    name: 'Nosotros Podemos',
    originalInspiration: 'Podemos Perú',
    shortName: 'Nosotros Podemos',
    color: '#F59E0B',
    bgClass: 'bg-amber-600',
    borderClass: 'border-amber-500',
    textClass: 'text-amber-400',
    slogan: '¡Podemos prometer lo que sea con tal de ganar!',
    symbol: 'Letra P Dorada',
    symbolEmoji: '🅿️',
    description: 'Expertos en campaña relámpago, carteles gigantescos en la Panamericana y promesas de seguridad extrema.'
  },
  {
    id: 'obra_bien',
    name: 'Obra Bien',
    originalInspiration: 'Partido Político Obras',
    shortName: 'Obra Bien',
    color: '#10B981',
    bgClass: 'bg-emerald-600',
    borderClass: 'border-emerald-400',
    textClass: 'text-emerald-400',
    slogan: 'Las obras no se caen... ¡solo se desploman con estilo!',
    symbol: 'Pala & Casco',
    symbolEmoji: '🚜',
    description: 'Especialistas en inaugurar piletas con luces LED y puentes peatonales de dudosa ingeniería sismo-resistente.'
  },
  {
    id: 'granito_de_mostaza',
    name: 'Partido Granito de Mostaza',
    originalInspiration: 'Partido Popular Cristiano',
    shortName: 'Granito Mostaza',
    color: '#15803D',
    bgClass: 'bg-green-700',
    borderClass: 'border-green-500',
    textClass: 'text-green-400',
    slogan: 'La fe mueve montañas y recupera la inscripción electoral',
    symbol: 'Granito Verde',
    symbolEmoji: '🌱',
    description: 'Tradición socialcristiana y doctrina social. Discursos pulcros, misa los domingos y alianzas de último minuto.'
  },
  {
    id: 'altoque_peru',
    name: 'Altoque Perú',
    originalInspiration: 'Ahora Nación',
    shortName: 'Altoque Perú',
    color: '#8B5CF6',
    bgClass: 'bg-purple-600',
    borderClass: 'border-purple-500',
    textClass: 'text-purple-400',
    slogan: '¡Soluciones al toque... o al menos eso dice el PowerPoint!',
    symbol: 'Rayo Morado',
    symbolEmoji: '⚡',
    description: 'Cuadros técnicos jóvenes con gráficos de barras, Notion, dashboards en iPad y soluciones listas en 48 horas.'
  }
];

export const CAMPAIGN_PROMISES: CampaignPromise[] = [
  {
    id: 'seguridad',
    label: 'Combatir la inseguridad ciudadana',
    description: 'Plan "Chapa tu choro": serenos con chalecos de titanio y cámaras con reconocimiento facial hasta en los micros.',
    icon: '🛡️',
    initialBonus: { stat: 'popularSympathy', amount: 15 }
  },
  {
    id: 'transporte',
    label: 'Mejorar el transporte público',
    description: 'Prometes acabar con el tráfico de Javier Prado en 72 horas y sincronizar todos los semáforos de Evitamiento.',
    icon: '🚌',
    initialBonus: { stat: 'polling', amount: 0.8 }
  },
  {
    id: 'comercio',
    label: 'Promover la fiscalización del comercio ambulatorio',
    description: 'Ordenar Mesa Redonda y Gamarra con cuadrillas de fiscalizadores y empadronamiento digital con código QR.',
    icon: '🏪',
    initialBonus: { stat: 'mediaCredibility', amount: 12 }
  },
  {
    id: 'obras_arboles',
    label: 'Construir más obras, plantar más árboles',
    description: 'Llenar la capital de piletas con luces LED, bermas con árboles nativos y bypasses ecológicos con gras sintético.',
    icon: '🌳',
    initialBonus: { stat: 'campaignFunds', amount: 2 }
  }
];

export const ALL_RIVAL_CANDIDATES: (RivalCandidate & { partyId: PartyId })[] = [
  {
    id: 'rival_porky',
    partyId: 'renovacion_del_pueblo',
    name: 'El Magnate Porcino de la Ola',
    partyName: 'Renovación del Pueblo',
    partyShort: 'Renovación P.',
    avatarEmoji: '🌊',
    color: '#0099FF',
    polling: 22.8
  },
  {
    id: 'rival_keiko',
    partyId: 'bloque_naranja',
    name: 'La Heredera del Taper Naranja',
    partyName: 'Bloque Naranja',
    partyShort: 'Bloque Naranja',
    avatarEmoji: '🍊',
    color: '#FF6600',
    polling: 21.5
  },
  {
    id: 'rival_allison',
    partyId: 'avanza_patriota',
    name: 'El Gran Cabezón de Magdalena',
    partyName: 'Avanza Patriota',
    partyShort: 'Avanza Pat.',
    avatarEmoji: '🚆',
    color: '#003399',
    polling: 18.2
  },
  {
    id: 'rival_techito',
    partyId: 'somos_clave',
    name: 'Techito Techo-Firme',
    partyName: 'Somos Clave',
    partyShort: 'Somos Clave',
    avatarEmoji: '❤️',
    color: '#E11D48',
    polling: 15.6
  },
  {
    id: 'rival_urresti',
    partyId: 'nosotros_podemos',
    name: 'El Capitán del Tuit Picante',
    partyName: 'Nosotros Podemos',
    partyShort: 'Nosotros Podemos',
    avatarEmoji: '🅿️',
    color: '#F59E0B',
    polling: 13.4
  },
  {
    id: 'rival_belmont',
    partyId: 'obra_bien',
    name: 'El Espartano Cósmico de RBC',
    partyName: 'Obra Bien',
    partyShort: 'Obra Bien',
    avatarEmoji: '🚜',
    color: '#10B981',
    polling: 10.2
  },
  {
    id: 'rival_susel',
    partyId: 'juan_perez',
    name: 'Doña Susel y su Labubu Fiscalizador',
    partyName: 'Partido Político Juan Perez (JP)',
    partyShort: 'JP',
    avatarEmoji: '🚩',
    color: '#D92525',
    polling: 7.8
  },
  {
    id: 'rival_mostaza',
    partyId: 'granito_de_mostaza',
    name: 'El Doctor Socialcristiano de la Misa',
    partyName: 'Partido Granito de Mostaza',
    partyShort: 'Granito Mostaza',
    avatarEmoji: '🌱',
    color: '#15803D',
    polling: 6.8
  },
  {
    id: 'rival_tecnocrata',
    partyId: 'altoque_peru',
    name: 'El Tecnócrata del Rayo en TikTok',
    partyName: 'Altoque Perú',
    partyShort: 'Altoque Perú',
    avatarEmoji: '⚡',
    color: '#8B5CF6',
    polling: 5.9
  }
];

export const getRivalsForCandidate = (playerPartyId?: PartyId): RivalCandidate[] => {
  // Filter out any rival that belongs to the player's assigned party
  const pool = ALL_RIVAL_CANDIDATES.filter(r => r.partyId !== playerPartyId);

  // Take top 6 rivals with properly calibrated starting polling tiers
  const basePollings = [22.8, 18.2, 15.6, 13.4, 10.2, 7.8];
  return pool.slice(0, 6).map((rival, index) => ({
    ...rival,
    polling: basePollings[index] ?? rival.polling
  }));
};

export const RIVAL_CANDIDATES: RivalCandidate[] = ALL_RIVAL_CANDIDATES.slice(0, 6);

// =========================================================================
// COMODINES ESTRATÉGICOS VARIABLES SEGÚN EL PERFIL ELEGIDO
// Cada perfil cuenta con 3 comodines personalizados con costos y límites
// =========================================================================
export const PROFILE_COMODINES: Record<ProfileId, ProfileComodin[]> = {
  // --- HOMBRES ---
  intelectual: [
    {
      id: 'com_intelectual_1',
      title: 'Cátedra Epistemológica en TV',
      description: 'Citas a Habermas y a Keynes en vivo. Dejas mudos a los panelistas y disparas tu credibilidad.',
      icon: '🎓',
      costFunds: 0.5,
      maxUses: 2,
      deltas: { polling: 1.8, mediaCredibility: 12, campaignFunds: -0.5 },
      headlineNews: 'INTELECTUAL DESLUMBRA EN TELEVISIÓN CITANDO A ECONOMISTAS ALEMANES EN HORARIO PRIME'
    },
    {
      id: 'com_intelectual_2',
      title: 'Desplegar Plan de 400 Páginas',
      description: 'Llevas los 4 tomos empastados al JNE. Demuestras pulcritud técnica y anulas cualquier riesgo de tacha.',
      icon: '📚',
      costFunds: 0,
      maxUses: 1,
      deltas: { polling: 1.0, jneTachaRisk: -15, mediaCredibility: 8 },
      headlineNews: 'PLAN DE GOBIERNO DE 400 PÁGINAS SUPERA AUDITORÍA TÉCNICA DEL JNE CON HONORES'
    },
    {
      id: 'com_intelectual_3',
      title: 'Debate Filosófico en Paradero',
      description: 'Explicas la teoría del valor a los cobradores de combi. Les parece raro pero respetan tu sapiencia.',
      icon: '🧐',
      costFunds: 0.3,
      maxUses: 1,
      deltas: { polling: 1.5, popularSympathy: 8, campaignFunds: -0.3 },
      headlineNews: 'CANDIDATO INTELECTUAL RESUELVE EL TRÁFICO CON FORMULACIÓN MATEMÁTICA EN PLENO PARADERO'
    }
  ],
  bajado_de_pepa: [
    {
      id: 'com_bajado_1',
      title: 'Colaboración con Dibujitos Otakus',
      description: 'Los cliperos de TikTok y dibujitos te dedican fanarts con aura épica y música phonk de fondo.',
      icon: '⚡',
      costFunds: 0.4,
      maxUses: 2,
      deltas: { polling: 2.5, popularSympathy: 12, campaignFunds: -0.4 },
      headlineNews: 'COMUNIDAD OTAKU Y DIBUJITOS SE UNEN A LA CAMPAÑA Y COLONIZAN LAS REDES SOCIALES'
    },
    {
      id: 'com_bajado_2',
      title: 'Remix Phonk Viral en TikTok',
      description: 'Tus frases más random son mezcladas por DJs de Lima Norte y alcanzan 2 millones de vistas.',
      icon: '🎧',
      costFunds: 0.6,
      maxUses: 2,
      deltas: { polling: 2.2, popularSympathy: 10, jneTachaRisk: 5, campaignFunds: -0.6 },
      headlineNews: 'REMIX VIRAL EN TIKTOK ROMPE RÉCORD DE REPRODUCCIONES CON FRASES DEL CANDIDATO'
    },
    {
      id: 'com_bajado_3',
      title: 'Grito "¡Sapeee!" en Plaza Mayor',
      description: 'Lanzas el grito de guerra en pleno mitin. La chibolería enloquece y llena la Vía Expresa.',
      icon: '🤪',
      costFunds: 0,
      maxUses: 1,
      deltas: { polling: 1.5, popularSympathy: 14, mediaCredibility: -5 },
      headlineNews: 'EUFORIA JUVENIL: EL GRITO DE GUERRA ENLOQUECE A MILES DE JÓVENES EN EL CENTRO DE LIMA'
    }
  ],
  galan: [
    {
      id: 'com_galan_1',
      title: 'Guiño en Vivo a Juliana Oxenford',
      description: 'Miras fijamente a la cámara y sonríes. La conductora se sonroja y te regala 15 minutos más de entrevista.',
      icon: '😉',
      costFunds: 0.2,
      maxUses: 2,
      deltas: { polling: 2.2, mediaCredibility: 10, campaignFunds: -0.2 },
      headlineNews: 'SHIPPEO NACIONAL: EL CANDIDATO GALÁN PARALIZA LAS REDES CON SONRISA EN ENTREVISTA'
    },
    {
      id: 'com_galan_2',
      title: 'Spot Perfumado en Horario Prime',
      description: 'Producción cinematográfica de alta gama. Camisa blanca, atardecer en la Costa Verde y mirada seductora.',
      icon: '✨',
      costFunds: 1.2,
      maxUses: 1,
      deltas: { polling: 3.2, popularSympathy: 12, campaignFunds: -1.2 },
      headlineNews: 'SPOT TELEVISIVO DE HOLLYWOOD CONQUISTA EL VOTO POPULAR Y ENLOQUECE AL PÚBLICO'
    },
    {
      id: 'com_galan_3',
      title: 'Selfies con Caseras y Señitos',
      description: 'Caminata con abrazos, besos en la mejilla y fotos grupales. Arrasas con el voto de las madres de familia.',
      icon: '🤳',
      costFunds: 0.3,
      maxUses: 2,
      deltas: { polling: 2.0, popularSympathy: 10, campaignFunds: -0.3 },
      headlineNews: 'CARISMA INSUPERABLE: COLAS DE VECINAS PARA TOMARSE FOTO CON EL CANDIDATO GALÁN'
    }
  ],
  sindicalista: [
    {
      id: 'com_sindicalista_1',
      title: 'Huelga Simbólica en Palacio',
      description: 'Te encadenas pacíficamente 20 minutos reclamando aumentos y derechos para los obreros de limpieza.',
      icon: '⛓️',
      costFunds: 0.2,
      maxUses: 2,
      deltas: { polling: 2.2, popularSympathy: 14, mediaCredibility: -5, campaignFunds: -0.2 },
      headlineNews: 'HUELGA SIMBÓLICA EN PALACIO MUNICIPAL CONMUEVE A LOS TRABAJADORES DE LIMA'
    },
    {
      id: 'com_sindicalista_2',
      title: 'Megáfono con Cinta Aislante',
      description: 'Subes al techo de una combi con tu megáfono guerrero. Discurso ardiente contra los peajes abusivos.',
      icon: '📢',
      costFunds: 0.1,
      maxUses: 2,
      deltas: { polling: 1.8, popularSympathy: 10, campaignFunds: -0.1 },
      headlineNews: 'DISCURSO EN COMBI CONTRA LOS PEAJES ENCIENDE LOS ÁNIMOS DE LOS PASAJEROS'
    },
    {
      id: 'com_sindicalista_3',
      title: 'Pacto Social desde Miraflores',
      description: 'Reúnes a dirigentes vecinales en un elegante café de Pardo. Firman un acuerdo histórico de unidad obrera.',
      icon: '☕',
      costFunds: 0.5,
      maxUses: 1,
      deltas: { polling: 2.0, mediaCredibility: 10, campaignFunds: -0.5 },
      headlineNews: 'PACTO SOCIAL DE MIRAFLORES: EL SINDICALISMO MODERNO SE REÚNE PARA TRANSFORMAR LIMA'
    }
  ],
  vendedor: [
    {
      id: 'com_vendedor_1',
      title: 'Discurso Outsider Callejero',
      description: 'Hablas claro, directo y sin rodeos. Conectas con el descontento popular y asustas a los partidos tradicionales.',
      icon: '🗣️',
      costFunds: 0.3,
      maxUses: 2,
      deltas: { polling: 2.8, popularSympathy: 12, jneTachaRisk: 6, campaignFunds: -0.3 },
      headlineNews: 'TSUNAMI OUTSIDER: DISCURSO EN LA PARADA ASUSTA A LOS LÍDERES POLÍTICOS TRADICIONALES'
    },
    {
      id: 'com_vendedor_2',
      title: 'Caldo de Gallina a las 5 AM',
      description: 'Te transmites en vivo desayunando con estibadores y canillitas. Tu autenticidad aplasta a los pitucos.',
      icon: '🍲',
      costFunds: 0.1,
      maxUses: 2,
      deltas: { polling: 2.0, popularSympathy: 10, campaignFunds: -0.1 },
      headlineNews: 'CALDO DE GALLINA A LAS 5 AM: EL CANDIDATO DEL PUEBLO MUESTRA SU LADO MÁS HUMILDE'
    },
    {
      id: 'com_vendedor_3',
      title: 'Desafío Abierto a las Tías Miraflorinas',
      description: 'Mitin en el Parque Kennedy explicando por qué Lima Norte merece la misma inversión que San Isidro.',
      icon: '🤠',
      costFunds: 0.4,
      maxUses: 1,
      deltas: { polling: 2.2, mediaCredibility: 8, campaignFunds: -0.4 },
      headlineNews: 'DEBATE EN PARQUE KENNEDY: EL CANDIDATO OUTSIDER PLANTEA DESCENTRALIZAR LA CAPITAL'
    }
  ],

  // --- MUJERES ---
  doctora_academica: [
    {
      id: 'com_doctora_1',
      title: 'Exhibir Bibliografía de 50 Páginas',
      description: 'Publicas el marco teórico de tu plan de gobierno. Los opinólogos de Twitter quedan anonadados.',
      icon: '📖',
      costFunds: 0.3,
      maxUses: 2,
      deltas: { polling: 1.6, mediaCredibility: 15, campaignFunds: -0.3 },
      headlineNews: 'BIBLIOGRAFÍA ACADÉMICA DE 50 PÁGINAS CONVIERTE AL CANDIDATO EN EL FAVORITO DE LA PRENSA'
    },
    {
      id: 'com_doctora_2',
      title: 'Cátedra Magistral en Vivo',
      description: 'Dictas una clase abierta de urbanismo sostenible en la Plaza San Martín con pizarra acrílica.',
      icon: '👩‍🏫',
      costFunds: 0.6,
      maxUses: 2,
      deltas: { polling: 2.0, mediaCredibility: 12, jneTachaRisk: -10, campaignFunds: -0.6 },
      headlineNews: 'CÁTEDRA DE URBANISMO EN LA PLAZA SAN MARTÍN ATRAE A CIENTOS DE ESTUDIANTES'
    },
    {
      id: 'com_doctora_3',
      title: 'Ensayo en Revista Indexada Scopus',
      description: 'Publicas un artículo científico sobre la descongestión del Metropolitano que valida todas tus promesas.',
      icon: '🔬',
      costFunds: 0.4,
      maxUses: 1,
      deltas: { polling: 1.8, mediaCredibility: 14, campaignFunds: -0.4 },
      headlineNews: 'REVISTA CIENTÍFICA INTERNACIONAL AVALA PLAN DE TRANSPORTE DE LA CANDIDATA'
    }
  ],
  tiktoker: [
    {
      id: 'com_tiktoker_1',
      title: 'Live de Madrugada Pidiendo Yape',
      description: 'Haces una maratón de 6 horas en TikTok. Miles de seguidores te transfieren monedas y recargas de campaña.',
      icon: '💸',
      costFunds: 0,
      maxUses: 2,
      deltas: { polling: 0.8, campaignFunds: 1.5, popularSympathy: 5 },
      headlineNews: 'MARATÓN TIKTOK RECAUDA S/. 1.5 MILLONES EN DONACIONES DE SEGUIDORES PARA LA CAMPAÑA'
    },
    {
      id: 'com_tiktoker_2',
      title: 'Denuncia de Cráter en Pista',
      description: 'Pones una planta en un bache de la Av. Abancay y lo transmites con música dramática. 3M de vistas.',
      icon: '🕳️',
      costFunds: 0.3,
      maxUses: 2,
      deltas: { polling: 2.5, popularSympathy: 12, campaignFunds: -0.3 },
      headlineNews: 'VIDEO VIRAL DENUNCIANDO CRÁTER EN ABANCAY OBLIGA A REPARACIÓN INMEDIATA'
    },
    {
      id: 'com_tiktoker_3',
      title: 'Challenge Viral con Chibolos',
      description: 'Coreografía pegajosa de campaña con los influencers más populares. Arrasas en el sector juvenil.',
      icon: '💃',
      costFunds: 0.5,
      maxUses: 1,
      deltas: { polling: 2.8, popularSympathy: 14, jneTachaRisk: 6, campaignFunds: -0.5 },
      headlineNews: 'BAILE VIRAL DE CAMPAÑA ES TENDENCIA #1 EN TIKTOK Y LLEGA A TODAS LAS CASAS'
    }
  ],
  dirigente_social: [
    {
      id: 'com_dirigente_1',
      title: 'Gran Olla Común en la Panamericana',
      description: 'Armas una olla gigante de ají de gallina con leña para 1,000 vecinos. Demuestras liderazgo y solidaridad pura.',
      icon: '🍲',
      costFunds: 0.3,
      maxUses: 2,
      deltas: { polling: 2.8, popularSympathy: 16, campaignFunds: -0.3 },
      headlineNews: 'GRAN OLLA COMÚN REÚNE A MILES DE VECINOS EN UN CLAMOR DE ESPERANZA Y SOLIDARIDAD'
    },
    {
      id: 'com_dirigente_2',
      title: 'Cerrarle la Matriz a Sedapal',
      description: 'Marcha enérgica con ollas y tapas exigiendo agua las 24 horas. Los funcionarios se rinden ante tu presión.',
      icon: '🚰',
      costFunds: 0.2,
      maxUses: 1,
      deltas: { polling: 2.4, popularSympathy: 12, jneTachaRisk: 8, campaignFunds: -0.2 },
      headlineNews: 'PROTESTA VECINAL OBLIGA A SEDAPAL A RESTABLECER EL AGUA EN LIMA ESTE TRAS 10 DÍAS'
    },
    {
      id: 'com_dirigente_3',
      title: 'Mitin con Mandil Floreado y Megáfono',
      description: 'Subes al estrado en Puente Piedra con tu mandil de siempre. La ovación del pueblo te hace subir en las encuestas.',
      icon: '👵🏽',
      costFunds: 0.3,
      maxUses: 2,
      deltas: { polling: 2.2, popularSympathy: 12, campaignFunds: -0.3 },
      headlineNews: 'EL MANDIL FLOREADO SE CONVIERTE EN SÍMBOLO DE ESPERANZA PARA LOS CERROS DE LIMA'
    }
  ],
  girly: [
    {
      id: 'com_girly_1',
      title: 'Brunch Pro-Fondos en el Club Regatas',
      description: 'Tostadas de palta, mimosas y entradas a S/. 2,000 por plato. Recaudas fondos millonarios para la recta final.',
      icon: '🥂',
      costFunds: 0.2,
      maxUses: 2,
      deltas: { polling: 0.5, campaignFunds: 2.2, popularSympathy: -4 },
      headlineNews: 'EXCLUSIVO BRUNCH EN EL REGATAS RECAUDA S/. 2.2 MILLONES PARA LA CAMPAÑA ELECTORAL'
    },
    {
      id: 'com_girly_2',
      title: 'Decreto Enrejar Parques "Anti-Picnic"',
      description: 'Prometes vallas perimétricas con sensores para que los parques estén ordenados y sin arroz chaufa en taper.',
      icon: '🚧',
      costFunds: 0.4,
      maxUses: 1,
      deltas: { polling: 1.5, mediaCredibility: 10, popularSympathy: -8, campaignFunds: -0.4 },
      headlineNews: 'POLÉMICA ORDENANZA: PROPUESTA DE ENREJAR PARQUES DESATA DEBATE CALIENTE EN REDES'
    },
    {
      id: 'com_girly_3',
      title: 'Reel Aesthetic en el Malecón',
      description: 'Video con paleta de colores beige, tips de compostaje y pilates en el faro de Miraflores. Muy chic.',
      icon: '💅🏼',
      costFunds: 0.3,
      maxUses: 2,
      deltas: { polling: 2.0, popularSympathy: 6, mediaCredibility: 6, campaignFunds: -0.3 },
      headlineNews: 'CAMPAÑA AESTHETIC REVOLUCIONA EL VOTO JOVEN EN LIMA TRADICIONAL Y BARRANCO'
    }
  ],
  emprendedora: [
    {
      id: 'com_emprendedora_1',
      title: 'Liquidación 2x1 en Mesa Redonda',
      description: 'Remate masivo de polos, mochilas y mercadería. Financias la campaña con tus propias ganancias comerciales.',
      icon: '🛍️',
      costFunds: 0.2,
      maxUses: 2,
      deltas: { polling: 1.2, campaignFunds: 1.8, popularSympathy: 6 },
      headlineNews: 'ÉXITO COMERCIAL: LIQUIDACIÓN EN MESA REDONDA INYECTA FONDOS FRESCAS A LA CAMPAÑA'
    },
    {
      id: 'com_emprendedora_2',
      title: 'Bombazo de Maicena a Fiscalizadores',
      description: 'Defiendes a las caseras ambulantes tirándoles maicena de carnaval a los camiones municipales abusivos.',
      icon: '💥',
      costFunds: 0.2,
      maxUses: 1,
      deltas: { polling: 2.5, popularSympathy: 14, jneTachaRisk: 10, campaignFunds: -0.2 },
      headlineNews: 'BATALLA DE MAICENA EN GAMARRA: CANDIDATA DEFIENDE A LAS MADRES COMERCIANTES'
    },
    {
      id: 'com_emprendedora_3',
      title: 'Operativo Chamba 24/7 sin SUNAT',
      description: 'Plan de choque para que ningún pequeño comerciante sea clausurado por boletas simples. Aplausos de pie.',
      icon: '💼',
      costFunds: 0.4,
      maxUses: 2,
      deltas: { polling: 2.2, popularSympathy: 10, campaignFunds: -0.4 },
      headlineNews: 'PROPUESTA DE APOYO AL COMERCIO POPULAR CONQUISTA A LOS EMPRENDEDORES DE LIMA'
    }
  ],
  ex_chica_reality: [
    {
      id: 'com_ex_reality_1',
      title: 'Ampay Estratégico en Magaly',
      description: 'Sales en un restaurante campestre casualmente hablando de tu plan de obras. Rating de 20 puntos y tendencia nacional.',
      icon: '📸',
      costFunds: 0.3,
      maxUses: 2,
      deltas: { polling: 3.0, popularSympathy: 12, mediaCredibility: -8, campaignFunds: -0.3 },
      headlineNews: 'AMPAY POLÍTICO: LA CANDIDATA PARALIZA LA FARÁNDULA Y LIDERA LAS CONVERSACIONES'
    },
    {
      id: 'com_ex_reality_2',
      title: 'Reto de Saltar la Tuerca en Mitin',
      description: 'En pleno mitin de Comas compites saltando la tuerca y armando vasitos contra el primer regidor. Furor total.',
      icon: '🔩',
      costFunds: 0.3,
      maxUses: 2,
      deltas: { polling: 2.5, popularSympathy: 14, campaignFunds: -0.3 },
      headlineNews: 'SHOW EN VIVO: MILES CELEBRAN LA ENERGÍA Y EL CARISMA DE LA CANDIDATA EN EL MITIN'
    },
    {
      id: 'com_ex_reality_3',
      title: 'Llorar en Vivo por los Chibolos de Lima',
      description: 'En el programa de la tarde te conmueves hasta las lágrimas prometiendo canchitas y comedores infantiles.',
      icon: '😢',
      costFunds: 0.4,
      maxUses: 1,
      deltas: { polling: 2.2, popularSympathy: 10, mediaCredibility: 6, campaignFunds: -0.4 },
      headlineNews: 'LÁGRIMAS EN VIVO: EMOTIVO MOMENTO DE LA CANDIDATA LLEGA AL CORAZÓN DE LAS FAMILIAS'
    }
  ]
};

export const CAMPAIGN_DILEMMAS: Dilemma[] = [
  // ==========================================
  // SEMANA 1: ARRANQUE DE CAMPAÑA & CONOS
  // ==========================================
  {
    id: 'sem1_mitin_sjl',
    week: 1,
    characterName: 'Don Teófilo',
    characterRole: 'Secretario del Comité de Base de SJL',
    characterAvatar: '👨🏽‍💼',
    dialogue: 'Candidato, arrancamos en Canto Grande. Para llenar la losa deportiva podemos alquilar 15 coasters y repartir sánguches de pollo con gaseosa, o hacer un mitin austero con megáfono a pilas y volanteo cara a cara.',
    contextTag: 'Semana 1 • Mitin en SJL',
    scene3D: 'mitin_calle',
    choices: [
      {
        text: 'Fletar 15 coasters y repartir sánguches con gaseosa para reventar la losa deportiva',
        feedback: 'Plaza repleta en la foto aérea, pero el desembolso fue brutal (S/. 1.8M) y el JNE abre acta por entrega de dádivas prohibidas.',
        deltas: { polling: 1.5, campaignFunds: -1.8, popularSympathy: 10, jneTachaRisk: 14 },
        headlineNews: 'MAREA HUMANA EN SJL: CANDIDATO LLENA MITIN CON SÁNGUCHES Y JNE FISCALIZA DÁDIVAS',
        tweetReaction: {
          author: 'Vecino de Bayóvar',
          handle: '@canto_grande_pe',
          avatar: '🥪',
          content: 'El sánguche estaba bien servido pero vinieron 10 inspectores a filmar todo. Ojo con la tacha.'
        }
      },
      {
        text: 'Mitin austero con megáfono a pilas, volanteo puerta a puerta y diálogo directo',
        feedback: 'Cero gasto financiero y cero problemas legales, aunque acudieron pocas personas y los rivales se burlan de tu convocatoria.',
        deltas: { polling: -0.6, campaignFunds: 0, mediaCredibility: 8, jneTachaRisk: -5, popularSympathy: -4 },
        headlineNews: 'ARRANQUE FRÍO: CANDIDATO APUESTA POR LA AUSTERIDAD PERO NO LOGRA LLENAR EN SJL',
        tweetReaction: {
          author: 'Reportero Comunitario',
          handle: '@cronica_vial',
          avatar: '📸',
          content: 'Habló con megáfono 40 minutos. Mucho floro técnico pero apenas 50 vecinos escuchando.'
        }
      }
    ]
  },
  {
    id: 'sem1_tiktok_trend',
    week: 1,
    characterName: 'Kike Z',
    characterRole: 'Asesor de Redes Sociales Sub-23',
    characterAvatar: '👱🏻‍♂️',
    dialogue: 'Jefe, hay un trend viral de baile con música phonk y orejitas de gato en TikTok. Si lo bailamos en el Jr. de la Unión nos hacemos virales en 2 horas, pero la prensa seria nos va a criticar por falta de seriedad.',
    contextTag: 'Semana 1 • Viralidad Gen Z',
    scene3D: 'batalla_aura',
    choices: [
      {
        text: 'Rechazar el baile: "La crisis de Lima se resuelve con propuestas técnicas, no con payasadas"',
        feedback: 'Los analistas serios saludan tu madurez política, pero los jóvenes te sepultan con memes de "boomer aburrido".',
        deltas: { polling: 0.4, mediaCredibility: 12, popularSympathy: -8, jneTachaRisk: -2 },
        headlineNews: 'SOBRIEDAD REPUBLICANA: CANDIDATO SE NIEGA AL CIRCO DIGITAL Y DEFIENDE PLAN TÉCNICO',
        tweetReaction: {
          author: 'Analista Político',
          handle: '@ojo_critico',
          avatar: '🧐',
          content: 'Bien ahí. Necesitamos un alcalde metropolitano con liderazgo, no un tiktoker con orejas.'
        }
      },
      {
        text: 'Ponerse las orejitas y bailar el trend con soltura en el Jirón de la Unión',
        feedback: 'Reventaste en TikTok con 3 millones de vistas, pero los diarios tradicionales titulan: "¿Circo o candidatura?".',
        deltas: { polling: 1.2, popularSympathy: 12, mediaCredibility: -12, campaignFunds: -0.3 },
        headlineNews: 'VIRAL TOTAL: CANDIDATO BAILA EN EL CENTRO DE LIMA Y DESATA POLÉMICA POR RIGOR',
        tweetReaction: {
          author: 'Gen Z Vote',
          handle: '@chibolo_politico',
          avatar: '🐱',
          content: 'El baile fue épico pero sigo sin saber qué va a hacer con los peajes corruptos.'
        }
      }
    ]
  },
  {
    id: 'sem1_denuncia_bienes',
    week: 1,
    characterName: 'Dra. Alanya',
    characterRole: 'Directora de Fiscalización del JNE',
    characterAvatar: '👩🏻‍⚖️',
    dialogue: 'Candidato, la oposición ha interpuesto una tacha formal acusándolo de omitir un terreno y una camioneta en su Hoja de Vida. El JNE exige descargos documentados o iniciará proceso de exclusión.',
    contextTag: 'Semana 1 • Riesgo de Tacha JNE',
    scene3D: 'entrevista_tv',
    choices: [
      {
        text: 'Contratar bufete top y peritaje contable exprés para allanarse y subsanar todo ante el JNE',
        feedback: 'El JNE archiva la tacha por subsanación oportuna, pero el costo de honorarios legales drenó S/. 1.2M de la caja.',
        deltas: { polling: -0.4, campaignFunds: -1.2, jneTachaRisk: -20, mediaCredibility: 8 },
        headlineNews: 'SALVADO POR LA CAMPANA: CANDIDATO SUBSANA OMISIÓN PATRIMONIAL Y PAGA COSTOSA DEFENSA',
        tweetReaction: {
          author: 'Abogado Constitucional',
          handle: '@ley_y_orden_pe',
          avatar: '📜',
          content: 'Respuesta rápida de sus abogados, pero la billetera de la campaña sintió el golpe.'
        }
      },
      {
        text: 'Denunciar persecución política de los rivales y convocar una vigilia ciudadana frente al JNE',
        feedback: 'Tus simpatizantes marchan con pancartas, pero los magistrados del JNE te colocan en la lista negra de alto riesgo.',
        deltas: { polling: 0.6, popularSympathy: 8, jneTachaRisk: 22, mediaCredibility: -6 },
        headlineNews: 'TENSIÓN JUDICIAL: CANDIDATO EN PIE DE GUERRA CONTRA EL JNE TRAS PEDIDO DE TACHA',
        tweetReaction: {
          author: 'Ciudadano Vigilante',
          handle: '@voto_limpio',
          avatar: '👀',
          content: 'Gritar persecución no borra que no declaró sus bienes. Está jugando con fuego ante la ley.'
        }
      }
    ]
  },

  // ==========================================
  // SEMANA 2: MERCADOS & CONTACTO POPULAR
  // ==========================================
  {
    id: 'sem2_pan_con_chicharron',
    week: 2,
    characterName: 'Doña Mechita',
    characterRole: 'Dueña de "El Chicharrón de Oro" en Mercado de Surquillo',
    characterAvatar: '👵🏽',
    dialogue: '¡Doctorcito! Le he preparado un sanguche de pan con chicharrón con su buen camote frito y ají limo recién picado. Las cámaras de televisión están al frente. ¿Cómo lo come?',
    contextTag: 'Semana 2 • Prueba Callejera',
    scene3D: 'pan_chicharron',
    choices: [
      {
        text: 'Aceptar el pan con chicharrón con apetito y comérselo con las manos frente a las cámaras',
        feedback: 'Aplausos en el mercado, pero te manchas la camisa blanca, la prensa elitista te tilda de demagogo y te cae pesado.',
        deltas: { polling: 1.0, popularSympathy: 12, mediaCredibility: -6, campaignFunds: -0.2 },
        headlineNews: 'BAÑO DE POPULARIDAD: CANDIDATO SE DA BANQUETE CALLEJERO Y CONQUISTA MERCADO',
        tweetReaction: {
          author: 'Casera de Surquillo',
          handle: '@mechita_mercado',
          avatar: '👵',
          content: '¡Qué apetito el doctor! Se comió todo el sánguche con las manos como buen limeño.'
        }
      },
      {
        text: 'Pedir servilleta con cortesía, elogiar la sazón e invitar una ronda de chicha para todo el mercado',
        feedback: 'Gesto respetuoso y querido por todos los puestos, aunque pagar la cuenta del mercado costó S/. 0.6M.',
        deltas: { polling: 1.2, mediaCredibility: 8, campaignFunds: -0.6, popularSympathy: 6 },
        headlineNews: 'CABALLEROSIDAD EN EL MERCADO: CANDIDATO INVITA CHICHA Y GANA SIMPATÍA POPULAR',
        tweetReaction: {
          author: 'Criollo 100%',
          handle: '@sabor_peruano',
          avatar: '🥤',
          content: 'Elegante y generoso con las caseras. No necesitó fingir para ganarse el respeto del mercado.'
        }
      }
    ]
  },
  {
    id: 'sem2_caldo_gallina_pata',
    week: 2,
    characterName: 'Señora Fortunata',
    characterRole: 'Presidenta de la Olla Común "Los Pinos" de Comas',
    characterAvatar: '👵🏾',
    dialogue: 'Doctor, en esta olla común alimentamos a 200 familias. Le hemos servido un caldo de gallina con su pata bien cocida. ¿Cómo apoya a nuestra organización?',
    contextTag: 'Semana 2 • Olla Común en Comas',
    scene3D: 'caldo_gallina',
    choices: [
      {
        text: 'Donar 20 sacos de arroz y víveres con fondos propios y compartir caldo ligero con las madres',
        feedback: 'Solidaridad concreta muy agradecida por las madres, pero gastas S/. 0.8M y el JNE fiscaliza si es dádiva proselitista.',
        deltas: { polling: 0.8, mediaCredibility: 8, campaignFunds: -0.8, jneTachaRisk: 15 },
        headlineNews: 'SOLIDARIDAD Y POLÉMICA: CANDIDATO LLEVA VÍVERES A OLLA COMÚN Y ENFRENTA OBSERVACIÓN',
        tweetReaction: {
          author: 'Madre Luchadora',
          handle: '@comas_unida',
          avatar: '❤️',
          content: 'La comida llegó de verdad a las ollas de los niños. Que la burocracia no fastidie.'
        }
      },
      {
        text: 'Chuparse la pata con devoción popular y prometer gas subsidiado municipal para todas las ollas',
        feedback: 'Conexión emocional tremenda en el cerro, pero economistas critican que la municipalidad no tiene caja para subsidiar gas.',
        deltas: { polling: 1.2, popularSympathy: 14, mediaCredibility: -8, campaignFunds: -0.1 },
        headlineNews: 'PROMESA CALIENTE: CANDIDATO ANUNCIA SUBSIDIO DE GAS Y ECONOMISTAS ALERTAN DÉFICIT',
        tweetReaction: {
          author: 'Vecino del Cono Norte',
          handle: '@lima_norte_firme',
          avatar: '🔥',
          content: 'Habló con el corazón en la mano. Si cumple lo del gas, acá tiene todos los votos.'
        }
      }
    ]
  },
  {
    id: 'sem2_pichanga_losas',
    week: 2,
    characterName: 'El Cholo Sotil Jr.',
    characterRole: 'Capitán de Barrio en Villa El Salvador',
    characterAvatar: '🏃🏽‍♂️',
    dialogue: 'Candidato, semifinal del campeonato interbarrios en la losa de cemento. Falta un delantero. ¿Entra a la cancha a meter pierna o prefiere dirigir desde la banca?',
    contextTag: 'Semana 2 • Pichanga en VES',
    scene3D: 'mitin_calle',
    choices: [
      {
        text: 'Ponerse las zapatillas lona y meter pierna fuerte en el cemento para meter el gol del triunfo',
        feedback: 'Golaso celebrado por la barra, pero una barrida te luxa el tobillo: gastas S/. 0.6M en clínica y andas con muleta.',
        deltas: { polling: 1.0, popularSympathy: 12, campaignFunds: -0.6, mediaCredibility: -4 },
        headlineNews: 'GOLAZO Y LESIÓN: CANDIDATO METE GOL EN VES PERO SALE EN CAMILLA A LA CLÍNICA',
        tweetReaction: {
          author: 'Pelotero de Barrio',
          handle: '@futbol_macho_pe',
          avatar: '👟',
          content: 'Le metió con todo al cemento. Salió cojeando pero demostró que no arruga.'
        }
      },
      {
        text: 'Dirigir el equipo desde la banca con pizarra táctica y financiar los trofeos del torneo',
        feedback: 'Imagen de estratega maduro y cero lesiones, aunque la barra rival te grita "¡técnico de escritorio!".',
        deltas: { polling: 0.5, mediaCredibility: 8, campaignFunds: -0.4, popularSympathy: -4 },
        headlineNews: 'ESTRATEGIA EN LA BANCA: CANDIDATO ASUME DE DT EN TORNEO DE VILLA EL SALVADOR',
        tweetReaction: {
          author: 'Hincha de Tablada',
          handle: '@ves_futbol',
          avatar: '📋',
          content: 'No quiso arriesgar las piernas pero regaló los trofeos y armó la jugada del triunfo.'
        }
      }
    ]
  },

  // ==========================================
  // SEMANA 3: GUERRA SUCIA & REDES SOCIALES
  // ==========================================
  {
    id: 'sem3_audio_filtrado',
    week: 3,
    characterName: 'Hacker Anónimo',
    characterRole: 'Filtrador de Audios de WhatsApp',
    characterAvatar: '🕵️‍♂️',
    dialogue: 'Candidato, un portal chicha filtró un audio suyo de hace 3 años quejándose furioso: "El tráfico de Javier Prado me tiene harto, esta ciudad parece una jungla de combis podridas". La oposición pide su renuncia.',
    contextTag: 'Semana 3 • Guerra Sucia & Audios',
    scene3D: 'entrevista_tv',
    choices: [
      {
        text: 'Denunciar espionaje telefónico ilícito, exigir peritaje de la Fiscalía y querellar al medio',
        feedback: 'Demuestras apego a la legalidad y seriedad institucional, pero gastas S/. 0.8M y pareces poco tolerante a las críticas.',
        deltas: { polling: -0.6, mediaCredibility: 10, campaignFunds: -0.8, popularSympathy: -6 },
        headlineNews: 'BATALLA LEGAL: CANDIDATO QUERELLA A MEDIOS POR FILTRACIÓN DE AUDIO PRIVADO',
        tweetReaction: {
          author: 'Jurista Independiente',
          handle: '@derecho_pe',
          avatar: '⚖️',
          content: 'El chuponeo es delito, pero amenazar a la prensa nunca suma puntos en campaña.'
        }
      },
      {
        text: 'Admitir el audio con picardía criolla: "¡Claro que renegué, como cualquier limeño atrapado 3 horas!"',
        feedback: 'Identificación masiva con los pasajeros, pero los gremios de transportistas informales declaran paro contra tu lista.',
        deltas: { polling: 0.8, popularSympathy: 10, mediaCredibility: -8, jneTachaRisk: 4 },
        headlineNews: 'DESPARPAJO CRIOLLO: CANDIDATO RATIFICA SU BRONCA CONTRA EL TRÁFICO Y ENFRENTA A TRANSPORTISTAS',
        tweetReaction: {
          author: 'Pasajero del Metropolitano',
          handle: '@odio_el_trafico',
          avatar: '🚌',
          content: 'Dijo lo que todos sentimos a las 6:30 PM en Javier Prado. Genuino y sin caretas.'
        }
      }
    ]
  },
  {
    id: 'sem3_batalla_aura_kennedy',
    week: 3,
    characterName: 'Rival "El Celeste"',
    characterRole: 'Candidato Rival y Streamer Político',
    characterAvatar: '🧑🏼‍🎤',
    dialogue: 'Oye rivalucho, te reto públicamente a una "Batalla de Aura" cara a cara en el anfiteatro del Parque Kennedy. Sin asesores, a ver quién impone más presencia y quién se achica.',
    contextTag: 'Semana 3 • Duelo de Aura en Miraflores',
    scene3D: 'batalla_aura',
    choices: [
      {
        text: 'Aceptar el reto en vivo, ponerse lentes oscuros e imponer un aura estoica frente a 1,000 personas',
        feedback: 'Ganas clips épicos en TikTok, pero en el cruce verbal te sacan una denuncia antigua y la comuna te multa por desorden.',
        deltas: { polling: 1.2, popularSympathy: 10, mediaCredibility: -8, jneTachaRisk: 8, campaignFunds: -0.4 },
        headlineNews: 'DUELO EN MIRAFLORES: CANDIDATO GANA AURA EN REDES PERO RECIBE MULTA MUNICIPAL',
        tweetReaction: {
          author: 'Editor Phonk',
          handle: '@phonk_peru',
          avatar: '⚡',
          content: 'El rival parpadeó 30 veces y el doctor mantuvo la mirada fría. Puro cine.'
        }
      },
      {
        text: 'Desairar el show mediático y transmitir en vivo desde un muro de contención en VMT',
        feedback: 'Proyectas que te importan las obras de los pobres y no el circo de Miraflores, aunque en redes dicen que "arrugaste".',
        deltas: { polling: 0.6, mediaCredibility: 12, popularSympathy: -8, jneTachaRisk: -4 },
        headlineNews: 'CONTRASTE TOTAL: CANDIDATO PREFIERE SUPERVISAR OBRAS EN CERROS ANTES QUE SHOW MEDIÁTICO',
        tweetReaction: {
          author: 'Vecino de Tablada',
          handle: '@vmt_al_dia',
          avatar: '🧱',
          content: 'Mientras otros pelean por likes en Miraflores, el doctor vino a ver el muro que se cae.'
        }
      }
    ]
  },
  {
    id: 'sem3_financiamiento_maletin',
    week: 3,
    characterName: 'Don Gino',
    characterRole: 'Operador de Fondos No Declarados',
    characterAvatar: '🤵🏻‍♂️',
    dialogue: 'Doctor... tenemos S/. 1.8 millones en efectivo para paneles luminosos en toda la Panamericana. Solo queremos que camufle el aporte en una cena pro-fondos y revise los contratos de peajes cuando asuma.',
    contextTag: 'Semana 3 • La Tentación del Maletín',
    scene3D: 'entrevista_tv',
    choices: [
      {
        text: 'Aceptar el aporte de S/. 1.8M camuflándolo como tarjetas de cena pro-fondos de S/. 500',
        feedback: 'Inyección salvadora a la caja y paneles en toda Lima, pero una filtración alerta a la Fiscalía y tu riesgo JNE se dispara +28%.',
        deltas: { polling: 1.2, campaignFunds: 1.8, jneTachaRisk: 28, mediaCredibility: -12 },
        headlineNews: 'ALERTA FISCAL: INVESTIGAN APORTES SOSPECHOSOS EN MEGA-CENA PRO-FONDOS DEL CANDIDATO',
        tweetReaction: {
          author: 'Periodista de Investigación',
          handle: '@ojo_publico_pe',
          avatar: '🕵️',
          content: '¿De dónde salieron 3,000 comensales millonarios? El JNE ya solicitó la lista completa.'
        }
      },
      {
        text: 'Expulsar al operador de la sede y convocar a la prensa para denunciar el lobby de los peajes',
        feedback: 'Gol ético impecable y aplauso editorial, pero el consorcio de peajes financia una campaña mediática hostil en tu contra.',
        deltas: { polling: 0.8, mediaCredibility: 16, jneTachaRisk: -15, popularSympathy: -6, campaignFunds: -0.4 },
        headlineNews: 'MANOS LIMPIAS: CANDIDATO DENUNCIA INTENTO DE COIMA Y RETORNO DE PEAJES CORRUPTOS',
        tweetReaction: {
          author: 'Ciudadano Decente',
          handle: '@peru_honesto',
          avatar: '🛡️',
          content: 'Valiente al cerrarle la puerta a las mafias de los peajes. Así se defiende a Lima.'
        }
      }
    ]
  },

  // ==========================================
  // SEMANA 4: EL GRAN DEBATE EN TELEVISIÓN
  // ==========================================
  {
    id: 'sem4_debate_tv_canal4',
    week: 4,
    characterName: 'Mávila Huertas',
    characterRole: 'Moderadora del Gran Debate Limeño',
    characterAvatar: '👩🏻‍💼',
    dialogue: 'Candidato, en vivo ante 5 millones de televidentes. Su rival puntero afirma que usted carece de experiencia técnica y que su plan vial causará un colapso en 48 horas. Tiene 60 segundos de réplica.',
    contextTag: 'Semana 4 • El Gran Debate en TV',
    scene3D: 'debate',
    choices: [
      {
        text: 'Mantener la calma zen, mirar al lente y exponer el plan de seguridad metropolitana con IA y drones',
        feedback: 'Proyectas solvencia técnica y temple de burgomaestre, pero los comentaristas señalan que te faltó picardía y contundencia.',
        deltas: { polling: 1.2, mediaCredibility: 14, popularSympathy: -4, jneTachaRisk: -2 },
        headlineNews: 'TEMPLE Y PLAN: CANDIDATO DESTACA EN DEBATE CON PROPUESTAS PERO EVITA LA BRONCA',
        tweetReaction: {
          author: 'Televidente Atento',
          handle: '@politica_tv',
          avatar: '🎯',
          content: 'Muy ordenado y serio. No cayó en el barro pero le faltó rematar al rival en vivo.'
        }
      },
      {
        text: 'Lanzar un misil directo con informe de Contraloría destapando consultorías truchas del rival puntero',
        feedback: 'Golpe demoledor que frena en seco al puntero en prime-time, aunque la audiencia conservadora critica el exceso de agresividad.',
        deltas: { polling: 1.8, mediaCredibility: 4, popularSympathy: -6, jneTachaRisk: 10 },
        headlineNews: 'GOLPE BAJO EN EL DEBATE: CANDIDATO DESNUDA CASOS DEL RIVAL Y ENCIENDE LA POLÉMICA',
        tweetReaction: {
          author: 'Tuitero Político',
          handle: '@fuego_cruzado',
          avatar: '🔥',
          content: 'Le sacó el expediente en la cara en vivo. El rival se quedó mudo 30 segundos.'
        }
      }
    ]
  },
  {
    id: 'sem4_entrevista_willax_beto',
    week: 4,
    characterName: 'Beto de la Noche',
    characterRole: 'Conductor Polémico de "Sin Filtro"',
    characterAvatar: '👨🏻‍💼',
    dialogue: 'A ver doctor... mis fuentes revelan que su primer regidor tiene 3 papeletas graves por exceso de velocidad y una deuda coactiva de S/. 45,000. ¿Lo blinda en mi set o admite que lleva gente cuestionada?',
    contextTag: 'Semana 4 • Entrevista Hostil',
    scene3D: 'entrevista_tv',
    choices: [
      {
        text: 'Pelear de tú a tú con el conductor, cortarlo en seco y acusarlo de operador político de los rivales',
        feedback: 'Tus barras bravas te aplauden por no dejarte avasallar, pero el canal te declara la guerra mediática toda la semana.',
        deltas: { polling: -0.6, popularSympathy: 8, mediaCredibility: -16, jneTachaRisk: 6 },
        headlineNews: 'BRONCA EN EL SET: CANDIDATO Y CONDUCTOR SE DICEN DE TODO EN TENSA ENTREVISTA',
        tweetReaction: {
          author: 'Espectador Nocturno',
          handle: '@rating_nocturno',
          avatar: '🥊',
          content: 'Se dijeron la vela verde al aire. Muy picante pero no aclaró el tema de su regidor.'
        }
      },
      {
        text: 'Desarmar la acusación con carpetas notariadas, anunciar remoción preventiva del regidor y no picar',
        feedback: 'Muestras liderazgo ético y muñeca firme, desactivando una trampa mediática sin perder la compostura.',
        deltas: { polling: 1.2, mediaCredibility: 14, jneTachaRisk: -8, popularSympathy: -4 },
        headlineNews: 'MANO DURA EN LA LISTA: CANDIDATO SEPARA A REGIDOR CUESTIONADO TRAS ENTREVISTA',
        tweetReaction: {
          author: 'Ciudadano Exigente',
          handle: '@voto_responsable',
          avatar: '✅',
          content: 'No le tembló la mano para botar al mal elemento de su plancha. Bien jugado.'
        }
      }
    ]
  },
  {
    id: 'sem4_propuesta_bypass_tren',
    week: 4,
    characterName: 'Ing. Barreto',
    characterRole: 'Presidente del Colegio de Urbanistas',
    characterAvatar: '👷🏽‍♂️',
    dialogue: 'Candidato, para su propuesta estrella de transporte: ¿Prometerá el megaproyecto de Teleférico Interurbano de 40 km por los cerros que ilusiona a las masas pero cuesta millones, o el plan austero de ola verde semafórica inteligente?',
    contextTag: 'Semana 4 • Propuesta Estrella',
    scene3D: 'conferencia_prensa',
    choices: [
      {
        text: 'Prometer el Teleférico Interurbano de 40 km y tren bala metropolitano uniendo cerros',
        feedback: 'Fervor popular en los cerros de Lima Norte y Este, pero los colegios de ingenieros tildan la promesa de demagogia inviable.',
        deltas: { polling: 1.6, popularSympathy: 14, mediaCredibility: -14, jneTachaRisk: 10 },
        headlineNews: 'PROMESA MONUMENTAL: CANDIDATO ANUNCIA MEGA-TELEFÉRICO Y DESATA CRÍTICAS POR COSTOS',
        tweetReaction: {
          author: 'Vecino de Independencia',
          handle: '@independencia_futuro',
          avatar: '🚡',
          content: 'Suena hermoso llegar a SJL en 15 minutos, pero ¿con qué plata lo va a construir?'
        }
      },
      {
        text: 'Priorizar la sincronización de 1,200 semáforos con fibra óptica y bacheo intensivo 24/7',
        feedback: 'Aval total de los ingenieros de tránsito por realismo técnico, aunque los vecinos de cerros sienten falta de una obra emblemática.',
        deltas: { polling: 0.8, mediaCredibility: 14, campaignFunds: -0.6, popularSympathy: -6 },
        headlineNews: 'SOLUCIONES REALISTAS: URBANISTAS RESPALDAN PLAN SEMAFÓRICO Y CERO VENTA DE HUMO',
        tweetReaction: {
          author: 'Ingeniero de Vías',
          handle: '@obras_reales',
          avatar: '📐',
          content: 'Al fin alguien que entiende que sincronizar semáforos cuesta 10 veces menos y alivia el tráfico hoy.'
        }
      }
    ]
  },

  // ==========================================
  // SEMANA 5: CIERRE DE CAMPAÑA & DÍA D
  // ==========================================
  {
    id: 'sem5_cierre_plaza_mayor',
    week: 5,
    characterName: 'Comandante de Tránsito',
    characterRole: 'Jefe de Operaciones del Centro Histórico',
    characterAvatar: '👮‍♂️',
    dialogue: 'Candidato, último jueves de campaña. Su mitin de cierre puede contratar a las 3 orquestas de cumbia más taquilleras para reventar la Plaza San Martín, o hacer una marcha cívica con antorchas por el Centro Histórico.',
    contextTag: 'Semana 5 • Cierre de Campaña',
    scene3D: 'mitin_banderas',
    choices: [
      {
        text: 'Caravana cívica pacífica con antorchas y marcha ciudadana por el Centro Histórico',
        feedback: 'Mensaje austero y cívico sin caos vehicular, pero tus rivales dominan los noticieros nocturnos con sus conciertos multitudinarios.',
        deltas: { polling: -0.4, mediaCredibility: 10, campaignFunds: -0.4, jneTachaRisk: -5, popularSympathy: 2 },
        headlineNews: 'CIERRE CIUDADANO: CARAVANA PACÍFICA DE ANTORCHAS RECORRE EL CENTRO DE LIMA',
        tweetReaction: {
          author: 'Vecino del Centro',
          handle: '@centro_historico',
          avatar: '🕊️',
          content: 'No ensuciaron la plaza ni reventaron parlantes hasta las 3 AM. Muy decente.'
        }
      },
      {
        text: 'Megaconcierto de cumbia con las 3 orquestas más caras, pantalla 360 y fuegos artificiales',
        feedback: 'Más de 80,000 personas bailando en el cierre más concurrido, pero el costo fue estratosférico (S/. 2.4M) y recibes sanción municipal.',
        deltas: { polling: 1.8, campaignFunds: -2.4, popularSympathy: 16, jneTachaRisk: 14 },
        headlineNews: 'APOTÉOSIS EN EL CENTRO: CANDIDATO CIERRA CAMPAÑA ANTE 80,000 LIMEÑOS A RITMO DE CUMBIA',
        tweetReaction: {
          author: 'Bailarín Popular',
          handle: '@cumbia_peru',
          avatar: '🎺',
          content: 'Qué fiestón inolvidable. Si gobierna como armó la fiesta, Lima Potencia asegurada.'
        }
      }
    ]
  },
  {
    id: 'sem5_guerra_redes_veda',
    week: 5,
    characterName: 'Asesor Fantasma',
    characterRole: 'Estratega Digital de Última Hora',
    characterAvatar: '👨🏽‍💻',
    dialogue: 'Jefe, estamos en veda electoral (a 24 horas del sufragio). La ley prohíbe publicidad formal, pero en WhatsApp y TikTok podemos activar cadenas de micro-memes para cazar el voto indeciso. ¿Apretamos el botón?',
    contextTag: 'Semana 5 • Veda Electoral',
    scene3D: 'batalla_aura',
    choices: [
      {
        text: 'Activar ejército digital fantasma para inundar WhatsApp con cadenas y videos emotivos',
        feedback: 'Gran empuje de última hora entre indecisos, pero el JNE rastrea las cuentas bots y abre proceso sancionador sumarísimo.',
        deltas: { polling: 1.8, campaignFunds: -0.8, jneTachaRisk: 24, mediaCredibility: -10 },
        headlineNews: 'TSUNAMI DIGITAL EN VEDA: JNE MONITOREA MENSAJES ILEGALES POR WHATSAPP Y REDES',
        tweetReaction: {
          author: 'Usuario de Redes',
          handle: '@limeño_comun',
          avatar: '📱',
          content: 'Me llegaron 4 cadenas de WhatsApp a las 11 PM del sábado. Se nota la desesperación de última hora.'
        }
      },
      {
        text: 'Respetar la veda electoral a rajatabla, almorzar con la familia y dar un mensaje de paz',
        feedback: 'Cumplimiento impecable de la ley electoral y tranquilidad judicial, aunque los rivales aprovecharon para arrebatarte indecisos.',
        deltas: { polling: -0.8, jneTachaRisk: -15, mediaCredibility: 10, popularSympathy: -2 },
        headlineNews: 'SILENCIO ELECTORAL: CANDIDATO CUMPLE LA VEDA Y COMPARTE ALMUERZO EN FAMILIA',
        tweetReaction: {
          author: 'Abogado Electoral',
          handle: '@derecho_pe',
          avatar: '⚖️',
          content: 'Un ejemplo de respeto a la normativa del Jurado. Así se construye democracia.'
        }
      }
    ]
  },
  {
    id: 'sem5_boca_de_urna_domingo',
    week: 5,
    characterName: 'Encuestador Jefe',
    characterRole: 'Director de Boca de Urna Nacional',
    characterAvatar: '👨🏼‍🏫',
    dialogue: '¡Son las 4:00 PM del domingo de elecciones! Las mesas cerraron y el boca de urna muestra un empate técnico al milímetro. La pelea se definirá en el conteo de actas impugnadas en los colegios.',
    contextTag: 'Semana 5 • FLASH ELECTORAL BOCA DE URNA',
    scene3D: 'debate',
    choices: [
      {
        text: 'Desplegar 6,000 personeros pagados con refrigerio para vigilar y pelear cada voto mesa por mesa',
        feedback: 'Tus personeros cuidan cada voto disputado con uñas y dientes, pero requirió pagar S/. 1.5M en viáticos de urgencia.',
        deltas: { polling: 1.5, campaignFunds: -1.5, mediaCredibility: 4 },
        headlineNews: 'BATALLA POR LAS ACTAS: EJÉRCITO DE PERSONEROS DEFIENDE VOTOS EN COLEGIOS DE LIMA',
        tweetReaction: {
          author: 'Personero Heroico',
          handle: '@cuidando_el_voto',
          avatar: '📝',
          content: 'No soltamos ni una mesa en San Juan de Lurigancho. Cada voto contó.'
        }
      },
      {
        text: 'Confiar en personeros voluntarios no pagados y esperar en vigilia pacífica el reporte de ONPE',
        feedback: 'Ahorraste caja y proyectaste serenidad democrática, pero personeros rivales te impugnaron varias actas dudosas.',
        deltas: { polling: -1.2, campaignFunds: 0, mediaCredibility: 6, popularSympathy: -2 },
        headlineNews: 'ESPERA EN EL BÚNKER: CANDIDATURA AGUARDA PRIMEROS RESULTADOS OFICIALES DE ONPE',
        tweetReaction: {
          author: 'Ciudadano Limeño',
          handle: '@lima_voto_ya',
          avatar: '🇵🇪',
          content: 'Día histórico. Ahora que la ONPE cuente con transparencia hasta la última acta.'
        }
      }
    ]
  }
];

export const GAME_ENDINGS: Record<EndingType, GameEnding> = {
  GANADOR_ALCALDIA: {
    type: 'GANADOR_ALCALDIA',
    title: '¡VICTORIA TOTAL! ALCALDE DE LIMA 2026-2030',
    subtitle: 'Culminaste #1 en las encuestas y arrasaste en las urnas',
    newspaperName: 'EL COMERCIO DE LIMA',
    headline: '¡TRIUNFO HISTÓRICO! NUEVO BURGOMAESTRE DE LIMA PROMETE TRANSFORMAR LA CAPITAL TRAS ARRASAR EN EL VOTO POPULAR',
    description: 'Conquistaste los mercados, saliste ileso de la guerra sucia, dominaste el debate en televisión y te comiste el pan con chicharrón con el pueblo. Los limeños te confiaron el sillón de Nicolás de Ribera.',
    badge: '👑 ELECTO ALCALDE METROPOLITANO',
    badgeColor: 'bg-amber-500 text-black font-black',
    shareMessage: '¡Gané las elecciones y soy el nuevo ALCALDE DE LIMA 2026 en "Sé Alcalde"! 🇵🇪🏛️ ¿Podrás tú llegar al 1er lugar?'
  },
  SEGUNDO_LUGAR: {
    type: 'SEGUNDO_LUGAR',
    title: 'Medalla de Plata: Por un Pelito',
    subtitle: 'Quedaste en segundo lugar a escasos votos del ganador',
    newspaperName: 'LA REPÚBLICA DIGITAL',
    headline: 'FINAL DE FOTOGRAFÍA: CANDIDATO PIERDE LA ALCALDÍA POR MENOS DE 1% TRAS INFARTANTE CONTEO',
    description: 'Hiciste una gran campaña y llenaste plazas, pero un par de traspiés en el debate y en redes te costaron la punta en la última semana. Ya suenas como favorito para la Presidencia 2031.',
    badge: '🥈 2DO LUGAR EN URNAS',
    badgeColor: 'bg-slate-300 text-slate-950 font-bold',
    shareMessage: '¡Quedé segundo por menos de 1% en "Sé Alcalde Lima 2026"! 🥈🤦‍♂️ Faltó comer un pan con chicharrón más.'
  },
  DERROTA_HUMILLANTE: {
    type: 'DERROTA_HUMILLANTE',
    title: 'Fracaso Electoral Estrepitoso',
    subtitle: 'El pueblo te castigó y terminaste con menos de 8% de votos',
    newspaperName: 'EL BOCÓN CHICHA',
    headline: '¡CHAO PESCADO! CANDIDATO SE DERRUMBA EN LAS ENCUESTAS Y PIERDE HASTA EN SU PROPIA MESA',
    description: 'Tus desplantes a los vecinos, tu rechazo a la comida callejera y tus pataletas en televisión te pasaron factura. Los analistas califican tu campaña como "la peor del milenio".',
    badge: '💀 DERRUMBE EN LAS URNAS',
    badgeColor: 'bg-red-700 text-white font-bold',
    shareMessage: '¡El pueblo me mandó a mi casa con 7% de votos en "Sé Alcalde Lima 2026"! 📉😭'
  },
  TACHADO_JNE: {
    type: 'TACHADO_JNE',
    title: 'Inhabilitado por el JNE',
    subtitle: 'El Jurado Electoral te sacó de carrera antes del domingo',
    newspaperName: 'PERÚ 21 EXCLUSIVO',
    headline: '¡FUERA DE CARRERA! RESOLUCIÓN DEL JNE EXCLUYE A CANDIDATO POR OMISIÓN DE BIENES Y FINANCIAMIENTO OSCURO',
    description: 'Tus audios filtrados y tus aportes no declarados colmaron la paciencia de las autoridades electorales. Tu foto fue tachada con plumón negro en la cédula de votación.',
    badge: '🚨 TACHADO POR EL JNE',
    badgeColor: 'bg-red-600 text-white font-black',
    shareMessage: '¡El JNE me tachó antes de las elecciones en "Sé Alcalde"! ⚖️🚫 No me dejaron ni llegar al domingo.'
  },
  QUIEBRA_CAMPANA: {
    type: 'QUIEBRA_CAMPANA',
    title: 'Campaña en Quiebra Absoluta',
    subtitle: 'Te quedaste sin un sol antes de la tercera semana',
    newspaperName: 'DIARIO EXTRA',
    headline: 'BANCARROTA ELECTORAL: EMBARGAN CAMIONETAS Y PANELES TRAS QUEDARSE SIN FONDOS',
    description: 'Derrochaste todo el presupuesto en spots caros y asesores internacionales que no sirvieron para nada. Tu equipo de campaña te abandonó a mitad de camino por falta de pago.',
    badge: '💸 FONDOS EN CERO',
    badgeColor: 'bg-rose-700 text-white font-bold',
    shareMessage: '¡Me quedé sin plata a mitad de campaña en "Sé Alcalde Lima 2026"! 💸💀'
  },
  ESCANDALO_VIRAL: {
    type: 'ESCANDALO_VIRAL',
    title: 'Cancelado en Redes Sociales',
    subtitle: 'Tus desplantes te convirtieron en el hazmerreír nacional',
    newspaperName: 'TROME DEL PERÚ',
    headline: 'MEME NACIONAL: CANDIDATO NO AGUANTA LA CALLE Y ES CANCELADO DE POR VIDA EN TIKTOK',
    description: 'El video donde rechazaste el pan con chicharrón con cubiertos descartables rompió récords históricos de desaprobación. Ni tus familiares votaron por ti.',
    badge: '📉 CANCELACIÓN TOTAL',
    badgeColor: 'bg-purple-800 text-white font-bold',
    shareMessage: '¡Me cancelaron en TikTok y terminé como meme en "Sé Alcalde Lima 2026"! 🤡📲'
  }
};
