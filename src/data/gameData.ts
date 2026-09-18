import { 
  CharacterProfile, 
  PoliticalParty, 
  CampaignPromise, 
  Dilemma,
  GameEnding,
  EndingType,
  RivalCandidate,
  ProfileId,
  ProfileComodin
} from '../types';

export const PES_LICENSE_DISCLAIMER = 
  'Son nombres ficticios, porque no tenemos la licencia, somos como PES. Si un partido desea otorgar la licencia, estaremos encantados de recibirla. Pero gratel, porque somos misios.';

export const MALE_PROFILES: CharacterProfile[] = [
  {
    id: 'intelectual',
    gender: 'masculino',
    name: 'Intelectual',
    tagline: '4 maestrías que a nadie le importan',
    description: 'Tu plan de gobierno tiene 400 páginas que ni tu primer regidor ha leído. Citas a Weber, Habermas y Keynes en plena parada de combis.',
    avatarEmoji: '🧐',
    avatarBg: 'bg-indigo-900',
    statBonus: { mediaCredibility: 15, jneTachaRisk: -10, popularSympathy: -5, polling: 1 },
    quote: '"Como señalaba Habermas en su teoría de la acción comunicativa, el bypass carece de sustento epistemológico y ontológico."'
  },
  {
    id: 'bajado_de_pepa',
    gender: 'masculino',
    name: 'El bajado de pepa',
    tagline: 'Hablas huevadas, pero conectas con la generación Z',
    description: 'Los dibujitos y la comunidad otaku te apoyan incondicionalmente. Los tiktokers editan tus discursos con música phonk y los viralizan.',
    avatarEmoji: '🤪',
    avatarBg: 'bg-amber-600',
    statBonus: { polling: 4, popularSympathy: 15, jneTachaRisk: 10, mediaCredibility: -5 },
    quote: '"¡Causa, si gano Lima pongo feriado todos los lunes de resaca y canchas de skate en la Vía Expresa, sapeee!"'
  },
  {
    id: 'galan',
    gender: 'masculino',
    name: 'El Galán',
    tagline: 'Eres “pintón”. Todo el público femenino te aclama',
    description: 'Sonrisa colgate, camisa desabotonada y gel fijador extra fuerte. Te shippean con Milagros Leiva por alguna extraña razón en Twitter/X.',
    avatarEmoji: '😎',
    avatarBg: 'bg-pink-700',
    statBonus: { polling: 3, campaignFunds: 2, popularSympathy: 10 },
    quote: '"Lima no necesita ideologías extremas, necesita un alcalde que le devuelva la sonrisa, el porte y el colágeno a la ciudad."'
  },
  {
    id: 'sindicalista',
    gender: 'masculino',
    name: 'Sindicalista',
    tagline: 'Siempre haces huelga frente al Palacio Municipal',
    description: 'Aclamas reivindicar a los limeños menos favorecidos viviendo cómodamente en un departamento de estreno en Miraflores.',
    avatarEmoji: '✊🏽',
    avatarBg: 'bg-red-800',
    statBonus: { popularSympathy: 12, campaignFunds: -2, mediaCredibility: -5, jneTachaRisk: -5 },
    quote: '"¡Compañeros! ¡Ni un paso atrás ante los consorcios monopólicos mientras tomo mi capuchino descafeinado en Larcomar!"'
  },
  {
    id: 'vendedor',
    gender: 'masculino',
    name: 'El vendedor',
    tagline: 'Perfil outsider y un discurso popular que asusta a las tías miraflorinas',
    description: 'Oratoria antisistema, sombrero, chaleco de lana y megáfono a pilas. Se toma fotos comiendo caldo de gallina a las 5 AM en La Parada.',
    avatarEmoji: '🤠',
    avatarBg: 'bg-emerald-800',
    statBonus: { polling: 5, popularSympathy: 15, jneTachaRisk: 12 },
    quote: '"Yo no vengo de los cócteles del Club Terrazas, hermanos. Yo sé lo que es el sudor del micro y esperar 3 horas parado en Puente Nuevo."'
  }
];

export const FEMALE_PROFILES: CharacterProfile[] = [
  {
    id: 'doctora_academica',
    gender: 'femenino',
    name: 'La doctora académica',
    tagline: 'Nadie sabe exactamente qué propone, pero su bibliografía tiene más páginas que el presupuesto municipal',
    description: 'Cita autores alemanes y franceses en el mercado de Caquetá. Sus propuestas tienen 18 tomos encuadernados que nadie se atreve a abrir.',
    avatarEmoji: '👩‍🏫',
    avatarBg: 'bg-teal-900',
    statBonus: { mediaCredibility: 18, jneTachaRisk: -12, popularSympathy: -6, polling: 1 },
    quote: '"De acuerdo con mi tesis doctoral en Heidelberg, la movilidad metropolitana es un constructo socioespacial asimétrico."'
  },
  {
    id: 'tiktoker',
    gender: 'femenino',
    name: 'Tiktoker',
    tagline: 'Haces videos denunciando huecos en las pistas',
    description: 'Tienes 600 mil seguidores y haces lives pidiendo Yape de madrugada para "parchar baches con cemento y corazón".',
    avatarEmoji: '📱',
    avatarBg: 'bg-fuchsia-700',
    statBonus: { polling: 5, popularSympathy: 14, jneTachaRisk: 8 },
    quote: '"¡Chicos miren este cráter lunar en plena Javier Prado! Manden leoncitos en TikTok y mandamos a parcharlo hoy mismo."'
  },
  {
    id: 'dirigente_social',
    gender: 'femenino',
    name: 'Dirigente social',
    tagline: 'Vistes un mandil floreado',
    description: 'Prometes reivindicar a las señitos de las ollas comunes y mandar bien lejos a Sedapal por cortar el agua 15 días seguidos.',
    avatarEmoji: '👵🏽',
    avatarBg: 'bg-orange-700',
    statBonus: { popularSympathy: 16, campaignFunds: -2, mediaCredibility: 5 },
    quote: '"¡A mí no me tiembla la mano! Si Sedapal no abre la matriz, cerramos la Panamericana con ollas, cucharones y leña."'
  },
  {
    id: 'girly',
    gender: 'femenino',
    name: 'Girly',
    tagline: 'El Regatas es tu segundo hogar',
    description: 'Prometes enrejar los parques del distrito para que "no entre gente rara a hacer picnic" ni a sentarse en el gras japonés.',
    avatarEmoji: '💅🏼',
    avatarBg: 'bg-sky-800',
    statBonus: { campaignFunds: 5, popularSympathy: -8, mediaCredibility: 10, polling: 2 },
    quote: '"O sea manix, Lima tiene que ser aesthetic. No podemos permitir que la gente traiga taper con arroz chaufa al Olivar, es un horror."'
  },
  {
    id: 'emprendedora',
    gender: 'femenino',
    name: 'Emprendedora',
    tagline: 'Tienes negocios informales en Mesa Redonda',
    description: 'Tu terror no es el debate electoral del JNE, sino que los fiscalizadores municipales te caigan de sorpresa con la grúa.',
    avatarEmoji: '💼',
    avatarBg: 'bg-amber-700',
    statBonus: { campaignFunds: 6, jneTachaRisk: 14, polling: 3 },
    quote: '"A Lima le falta facturar, papá. Menos floro de regidores y más chamba 24/7 sin fiscalizadores abusivos."'
  },
  {
    id: 'ex_chica_reality',
    gender: 'femenino',
    name: 'Ex-Chica Reality',
    tagline: 'Pasaste de pelearte con tu ex en Magaly a postular aspirando a los votos de los chibolos pulpines',
    description: 'De armar vasitos y saltar la tuerca en TV prime time a encabezar una lista municipal por los votos masivos de la farándula.',
    avatarEmoji: '✨',
    avatarBg: 'bg-rose-600',
    statBonus: { polling: 6, jneTachaRisk: 12, mediaCredibility: -5 },
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
    initialBonus: { stat: 'polling', amount: 3 }
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

export const RIVAL_CANDIDATES: RivalCandidate[] = [
  {
    id: 'rival_porky',
    name: 'El Magnate Porcino de la Ola',
    partyName: 'Renovación del Pueblo',
    partyShort: 'Renovación P.',
    avatarEmoji: '🌊',
    color: '#0099FF',
    polling: 22.4
  },
  {
    id: 'rival_allison',
    name: 'El Gran Cabezón de Magdalena',
    partyName: 'Avanza Patriota',
    partyShort: 'Avanza Pat.',
    avatarEmoji: '🚆',
    color: '#003399',
    polling: 17.8
  },
  {
    id: 'rival_techito',
    name: 'Techito Techo-Firme',
    partyName: 'Somos Clave',
    partyShort: 'Somos Clave',
    avatarEmoji: '❤️',
    color: '#E11D48',
    polling: 15.2
  },
  {
    id: 'rival_urresti',
    name: 'El Capitán del Tuit Picante',
    partyName: 'Nosotros Podemos',
    partyShort: 'Nosotros Podemos',
    avatarEmoji: '🅿️',
    color: '#F59E0B',
    polling: 13.5
  },
  {
    id: 'rival_belmont',
    name: 'El Espartano Cósmico de RBC',
    partyName: 'Obra Bien',
    partyShort: 'Obra Bien',
    avatarEmoji: '🚜',
    color: '#10B981',
    polling: 10.1
  },
  {
    id: 'rival_susel',
    name: 'Doña Susel y su Labubu Fiscalizador',
    partyName: 'Partido Político Juan Perez (JP)',
    partyShort: 'JP',
    avatarEmoji: '🚩',
    color: '#D92525',
    polling: 8.6
  }
];

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
      title: 'Guiño en Vivo a Milagros Leiva',
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
    characterAvatar: '📢',
    dialogue: 'Candidato, arrancamos en Canto Grande. Para llenar la losa deportiva podemos alquilar 15 coasters piratas y repartir sánguches de pollo con gaseosa a los asistentes, o confiar en que la gente vendrá solo a escuchar sus 40 propuestas técnicas.',
    contextTag: 'Semana 1 • Mitin en SJL',
    scene3D: 'mitin_calle',
    choices: [
      {
        text: 'Fletar las coasters y asegurar los sánguches: ¡La plaza se llena sí o sí!',
        feedback: 'Foto aérea con lleno total en portada. Los vecinos te aplauden, pero gastaste S/. 1.2M en logística.',
        deltas: { polling: 2.5, campaignFunds: -1.2, popularSympathy: 10 },
        headlineNews: 'MAREA HUMANA EN SJL: CANDIDATO ABRE CAMPAÑA CON PLAZA REPLETA Y SÁNGUCHES',
        tweetReaction: {
          author: 'Vecino de Bayóvar',
          handle: '@canto_grande_pe',
          avatar: '🥪',
          content: 'El sánguche estaba bien servido y el polo me quedó bacán. Tiene mi voto el doctor.'
        }
      },
      {
        text: 'Cero clientelismo: mitin austero con megáfono a pilas sin regalar comida',
        feedback: 'Fueron 45 personas y 10 perros callejeros. La prensa titula "Mitin fantasma", pero ahorraste fondos.',
        deltas: { polling: -2.0, campaignFunds: 0, mediaCredibility: 5 },
        headlineNews: 'POCO ENTUSIASMO: APENAS UN PUÑADO DE CURIOSOS EN ARRANQUE DE CAMPAÑA',
        tweetReaction: {
          author: 'Reportero Político',
          handle: '@cronica_vial',
          avatar: '📸',
          content: 'Había más palomas que simpatizantes en la losa de San Juan de Lurigancho. Duro arranque.'
        }
      }
    ]
  },
  {
    id: 'sem1_tiktok_trend',
    week: 1,
    characterName: 'Kike Z',
    characterRole: 'Asesor de Redes Sociales Sub-23',
    characterAvatar: '📱',
    dialogue: 'Jefe, si no nos metemos a TikTok estamos muertos. Hay un trend de baile viral con música phonk y orejitas de gato que tiene 10 millones de vistas. Si lo grabamos ahorita en el Jr. de la Unión, nos hacemos virales en 2 horas.',
    contextTag: 'Semana 1 • Viralidad Gen Z',
    scene3D: 'batalla_aura',
    choices: [
      {
        text: 'Ponerse las orejitas y bailar con soltura: ¡Todo por los votos de los chibolos!',
        feedback: 'El video revienta TikTok con 4 millones de reproducciones. Tu apodo se vuelve sticker de WhatsApp.',
        deltas: { polling: 3.2, popularSympathy: 14, mediaCredibility: -4 },
        headlineNews: 'VIRAL TOTAL: CANDIDATO BAILA TREND Y CONQUISTA A LA GENERACIÓN Z EN TIKTOK',
        tweetReaction: {
          author: 'Otaku Limeño',
          handle: '@otaku_puro',
          avatar: '🐱',
          content: 'No sé cuál es su plan de transporte pero tiene un flow increíble. Voto fijazo.'
        }
      },
      {
        text: 'Rechazar el baile: "Soy un político serio, no un payaso de internet"',
        feedback: 'La prensa tradicional elogia tu sobriedad, pero los jóvenes te tildan de "aburrido boomer".',
        deltas: { polling: -1.5, mediaCredibility: 8, popularSympathy: -8 },
        headlineNews: 'SOBRIEDAD O RIGIDEZ: CANDIDATO SE NIEGA A PARTICIPAR EN TIKTOKS ELECTORALES',
        tweetReaction: {
          author: 'Tiktoker Crítico',
          handle: '@genz_vota',
          avatar: '😐',
          content: 'Tiene menos carisma que una pared de concreto. Próximo candidato por favor.'
        }
      }
    ]
  },
  {
    id: 'sem1_denuncia_bienes',
    week: 1,
    characterName: 'Dra. Alanya',
    characterRole: 'Directora de Fiscalización del JNE',
    characterAvatar: '⚖️',
    dialogue: 'Candidato, la oposición ha presentado una tacha en su contra alegando que no declaró una camioneta y un terreno en Cieneguilla en su Hoja de Vida. El JNE le da 24 horas para aclarar o quedará fuera de carrera.',
    contextTag: 'Semana 1 • Riesgo de Tacha JNE',
    scene3D: 'entrevista_tv',
    choices: [
      {
        text: 'Presentar descargos notariales inmediatos y pagar peritaje contable de urgencia',
        feedback: 'El JNE archiva la tacha por unanimidad. Demuestras transparencia total pero gastas S/. 0.6M en abogados.',
        deltas: { polling: 1.0, campaignFunds: -0.6, jneTachaRisk: -15, mediaCredibility: 6 },
        headlineNews: 'JNE RECHAZA TACHA: CANDIDATO DESVIRTÚA DENUNCIA Y CONTINÚA EN CARRERA',
        tweetReaction: {
          author: 'Abogado Constitucionalista',
          handle: '@ley_y_orden_pe',
          avatar: '📜',
          content: 'Respuesta rápida y solvente. La oposición intentó una tacha chicha y fracasó.'
        }
      },
      {
        text: 'Denunciar "persecución política de los caviares" y amenazar con huelga de hambre',
        feedback: 'Tu base dura se enardece, pero el JNE te coloca bajo sospecha y sube tu riesgo de exclusión.',
        deltas: { polling: -2.2, jneTachaRisk: 20, popularSympathy: 4 },
        headlineNews: 'TENSIÓN CON EL JNE: CANDIDATO EN PIE DE GUERRA TRAS PEDIDO DE EXCLUSIÓN',
        tweetReaction: {
          author: 'Ciudadano Vigilante',
          handle: '@voto_limpio',
          avatar: '👀',
          content: 'El que no la debe no la teme. Si no aclara los papeles, mejor que lo saquen.'
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
    characterRole: 'Dueña del Puesto "El Chicharrón de Oro" en Mercado de Surquillo',
    characterAvatar: '🥪',
    dialogue: '¡Ay doctorcito, qué alegría verlo en mi mercado! Le he preparado un sanguche de pan con chicharrón bien taipá, con su camote frito, cebollita y ají limo recién picado. ¡Cómalo con la mano para las cámaras de televisión!',
    contextTag: 'Semana 2 • Prueba de Fuego Callejera',
    scene3D: 'pan_chicharron',
    choices: [
      {
        text: 'Aceptar el pan con chicharrón con apetito y comérselo con las manos frente a las cámaras',
        feedback: '¡GOLAZO ELECTORAL! Te limpias la grasa con la servilleta y la gente estalla en aplausos: "¡Este sí es de los nuestros!".',
        deltas: { polling: 4.0, popularSympathy: 20, mediaCredibility: 2 },
        headlineNews: 'SABOR Y PUEBLO: CANDIDATO SE DA UN BANQUETE POPULAR CON PAN CON CHICHARRÓN',
        tweetReaction: {
          author: 'Casera de Surquillo',
          handle: '@mechita_mercado',
          avatar: '👵',
          content: '¡Qué humilde mi candidato! Se comió todo el sánguche sin asco y se tomó foto con todas.'
        }
      },
      {
        text: 'Agradecer amablemente pero pedir cubiertos descartables y alcohol en gel antes de tocarlo',
        feedback: 'DESASTRE POPULAR. Doña Mechita se ofendió, la gente gritó "¡Pituco sobrado!" y el video se volvió meme.',
        deltas: { polling: -4.5, popularSympathy: -22, mediaCredibility: -5 },
        headlineNews: '¡QUÉ DESAIRE! CANDIDATO PIDE TENEDOR PARA COMER CHICHARRÓN Y MERCADO LO PUNCHEA',
        tweetReaction: {
          author: 'Criollo 100%',
          handle: '@sabor_peruano',
          avatar: '🤦‍♂️',
          content: '¿Quién come pan con chicharrón con tenedor y alcohol en gel? Este tipo no conoce el Perú.'
        }
      }
    ]
  },
  {
    id: 'sem2_caldo_gallina_pata',
    week: 2,
    characterName: 'Señora Fortunata',
    characterRole: 'Presidenta de la Olla Común "Los Pinos" de Comas',
    characterAvatar: '🍲',
    dialogue: 'Doctor, aquí cocinamos con mucho cariño. Le hemos servido el plato de honor: un caldo de gallina con huevo duro y su buena pata bien cocida. ¿Le entra con cuchara o prefiere que le cambiemos el plato?',
    contextTag: 'Semana 2 • Olla Común en Lima Norte',
    scene3D: 'caldo_gallina',
    choices: [
      {
        text: 'Chuparse la pata con gusto y declarar: "¡Aquí está el verdadero colágeno del pueblo!"',
        feedback: 'Las madres de familia te abrazan con lágrimas y te nombran padrino de la olla común.',
        deltas: { polling: 3.5, popularSympathy: 18, campaignFunds: -0.4 },
        headlineNews: 'CONEXIÓN GENUINA: CANDIDATO COMPARTE CALDO DE GALLINA EN OLLA COMÚN DE COMAS',
        tweetReaction: {
          author: 'Madre Luchadora',
          handle: '@comas_unida',
          avatar: '❤️',
          content: 'No como otros que vienen en camioneta blindada y ni saludan. Este señor tiene corazón.'
        }
      },
      {
        text: 'Mover la pata hacia el borde del plato y comerse solo el fideo con cara de resignación',
        feedback: 'Una vecina transmitió en vivo la cara de disgusto y los noticieros de la noche lo pasaron en bucle.',
        deltas: { polling: -3.0, popularSympathy: -14 },
        headlineNews: 'CARA DE FÚCHI: CANDIDATO PASA APUROS AL PROBAR COMIDA EN ASENTAMIENTO HUMANO',
        tweetReaction: {
          author: 'Observador Urbano',
          handle: '@lima_real',
          avatar: '👀',
          content: 'Se le notaba el sufrimiento en cada cucharada. Se nota que solo va a los conos en campaña.'
        }
      }
    ]
  },
  {
    id: 'sem2_pichanga_losas',
    week: 2,
    characterName: 'El Cholo Sotil Jr.',
    characterRole: 'Capitán del Equipo del Barrio de Villa El Salvador',
    characterAvatar: '⚽',
    dialogue: 'Habla candidato, estamos jugando la semifinal del torneo interbarrios en la losa de cemento. Falta un delantero. Si se pone la 10 y mete un gol, acá 500 familias votan en bloque por su lista.',
    contextTag: 'Semana 2 • Pichanga en Villa El Salvador',
    scene3D: 'mitin_calle',
    choices: [
      {
        text: 'Ponerse las zapatillas lona, meter pierna fuerte y clavar un gol de punta al ángulo',
        feedback: 'Locura en la tribuna. Te cargan en hombros y el video de tu gol tiene 2 millones de vistas con relato del Tanque Arias.',
        deltas: { polling: 3.0, popularSympathy: 15 },
        headlineNews: '¡GOLAZO ELECTORAL! CANDIDATO LA ROMPE EN PICHANGA DE VES Y SE METE AL BOLSILLO AL SUR',
        tweetReaction: {
          author: 'Pelotero de Barrio',
          handle: '@futbol_macho_pe',
          avatar: '👟',
          content: 'Buen pie el doctor, le metió con chanfle y celebró con el pueblo. Voto cantado.'
        }
      },
      {
        text: 'Excusarse diciendo que "tiene prescripción médica por meniscos" y quedarse en terno en la banca',
        feedback: 'Te salvaste de una fractura en el cemento, pero te gritaron "¡pecho frío!" durante todo el segundo tiempo.',
        deltas: { polling: -1.0, popularSympathy: -6 },
        headlineNews: 'PECHO FRÍO: CANDIDATO PREFIERE CUIDAR EL TERNO Y NO SE ANIMA A PISAR LA LOSA',
        tweetReaction: {
          author: 'Hincha de Tablada',
          handle: '@ves_futbol',
          avatar: '🥶',
          content: 'Puso excusa médica jajaja. Qué va a aguantar la patada de los muchachos.'
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
    characterAvatar: '🕵️',
    dialogue: 'Candidato, un portal web chicha acaba de filtrar un audio suyo de hace 3 años donde se le escucha quejarse: "El tráfico de Javier Prado me tiene harto, esta ciudad parece una jungla de combis podridas". La oposición exige su renuncia.',
    contextTag: 'Semana 3 • Guerra Sucia & Audios',
    scene3D: 'entrevista_tv',
    choices: [
      {
        text: 'Salir al frente con humor: "¡Claro que me quejé, como cualquier limeño atrapado 3 horas en un micro!"',
        feedback: '¡JUGADA MAESTRA! La gente se siente identificada al 100%: "Dijo lo que todos pensamos". Transformas el ataque en fortaleza.',
        deltas: { polling: 4.2, popularSympathy: 16, mediaCredibility: 4 },
        headlineNews: 'DE CRÍTICA A VIRAL: CANDIDATO CAPITALIZA AUDIO Y PROMETE SOLUCIÓN AL TRÁFICO INFERNAL',
        tweetReaction: {
          author: 'Pasajero Cansado',
          handle: '@odio_el_metropolitano',
          avatar: '🚌',
          content: 'Al fin un candidato que admite que el tráfico da ganas de llorar. Toda la razón doctor.'
        }
      },
      {
        text: 'Decir que el audio "fue manipulado con clonación de voz por hackers norcoreanos"',
        feedback: 'Nadie te cree. Expertos en tecnología te desmienten en televisión y quedas en ridículo absoluto.',
        deltas: { polling: -3.8, mediaCredibility: -18, jneTachaRisk: 10 },
        headlineNews: 'JUSTIFICACIÓN INFANTIL: CANDIDATO CULPA A LA INTELIGENCIA ARTIFICIAL POR AUDIO PROPIO',
        tweetReaction: {
          author: 'Fact Checker Perú',
          handle: '@ojo_al_bife',
          avatar: '❌',
          content: 'Confirmado al 100%: el audio es real. La mentira siempre tiene patas cortas en campaña.'
        }
      }
    ]
  },
  {
    id: 'sem3_batalla_aura_kennedy',
    week: 3,
    characterName: 'Rival "El Celeste"',
    characterRole: 'Candidato Rival y Streamer Político',
    characterAvatar: '🌊',
    dialogue: 'Oye rivalucho, te reto públicamente a una "Batalla de Aura" cara a cara en el anfiteatro del Parque Kennedy. Sin guardaespaldas, solo tú y yo frente a 800 personas midiendo quién impone más presencia y quién se achica.',
    contextTag: 'Semana 3 • Duelo de Aura en Miraflores',
    scene3D: 'batalla_aura',
    choices: [
      {
        text: 'Aceptar el reto, ponerse lentes oscuros e imponer un aura estoica de prócer de la República',
        feedback: 'ÉPICO. Tu mirada inmutable hace trastabillar al rival en plena transmisión en vivo. Ganas +50,000 de aura en TikTok.',
        deltas: { polling: 4.8, popularSympathy: 18, mediaCredibility: 6 },
        headlineNews: 'PARQUE KENNEDY CORONA AL REY DEL AURA: CANDIDATO ARRASTRA EN DUELO PSICOLÓGICO',
        tweetReaction: {
          author: 'Editor Phonk',
          handle: '@phonk_peru',
          avatar: '⚡',
          content: 'El rival parpadeó 40 veces por segundo y el doctor ni pestañeó. Aura nivel 9,999.'
        }
      },
      {
        text: 'Arrugar diciendo que "esas son niñerías para mocosos sin oficio"',
        feedback: 'Te etiquetan de "cobarde" y "falto de aura". Pierdes el voto juvenil en masa hacia tu contrincante.',
        deltas: { polling: -3.5, popularSympathy: -15 },
        headlineNews: 'ARRUGÓ: CANDIDATO EVITA DUELO EN EL KENNEDY Y RECIBE OLA DE MEMES EN REDES',
        tweetReaction: {
          author: 'Gen Z Vote',
          handle: '@chibolo_politico',
          avatar: '📉',
          content: 'Cero aura. Si le tiene miedo a pararse en un parque, cómo va a gobernar Lima.'
        }
      }
    ]
  },
  {
    id: 'sem3_financiamiento_maletin',
    week: 3,
    characterName: 'Don Gino',
    characterRole: 'Operador de Fondos No Declarados',
    characterAvatar: '💼',
    dialogue: 'Doctor... le tenemos S/. 2.5 millones en efectivo en este maletín de cuero para afiches y paneles luminosos en toda la Panamericana. Solo pedimos que cuando sea alcalde, renueve la concesión de los peajes por 30 años más. Nadie se va a enterar.',
    contextTag: 'Semana 3 • La Tentación del Maletín',
    scene3D: 'entrevista_tv',
    choices: [
      {
        text: 'Botar al operador a patadas de la sede de campaña: "¡Con la plata de los limeños no se juega!"',
        feedback: 'Tu dignidad queda intacta y tu riesgo JNE se va a cero. Mantienes la moral limpia para los debates.',
        deltas: { polling: 2.0, jneTachaRisk: -20, mediaCredibility: 15 },
        headlineNews: 'MANOS LIMPIAS: CANDIDATO DENUNCIA INTENTO DE SOBORNO Y GANA PRESTIGIO ÉTICO',
        tweetReaction: {
          author: 'Ciudadano Decente',
          handle: '@peru_honesto',
          avatar: '🛡️',
          content: 'Por fin alguien que le cierra la puerta a los negociados oscuros. Mis respetos.'
        }
      },
      {
        text: 'Aceptar el maletín con la condición de que "lo camuflen como rifas profondos"',
        feedback: 'Llenas Lima de afiches gigantes, pero la Fiscalía abre investigación preliminar a 10 días del voto.',
        deltas: { polling: 1.0, campaignFunds: 4.5, jneTachaRisk: 35 },
        headlineNews: 'ALERTA JUDICIAL: FISCALÍA INDAGA APORTES FANTASMA TRAS MEGA-DESPLIEGUE PUBLICITARIO',
        tweetReaction: {
          author: 'Periodista de Investigación',
          handle: '@ojo_publico_pe',
          avatar: '🕵️',
          content: '¿De dónde saca plata para poner 200 paneles LED en la Vía Expresa si en su hoja de vida declaró ganar el sueldo mínimo?'
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
    characterRole: 'Moderadora del Gran Debate Limeño (América TV)',
    characterAvatar: '📺',
    dialogue: 'Candidato, estamos en vivo por señal abierta. Su rival afirma que usted no tiene experiencia municipal y que su plan de transporte colapsará la ciudad en 48 horas. Tiene 60 segundos de réplica frente a 5 millones de televidentes.',
    contextTag: 'Semana 4 • El Gran Debate en TV',
    scene3D: 'debate',
    choices: [
      {
        text: 'Mirar a la cámara 1, apelar a la emoción del pueblo y desmontar la falacia con cifras reales',
        feedback: 'TRIUNFO APLASTANTE. El minuto de oro del debate se viraliza en todas las plataformas y disparas en intención de voto.',
        deltas: { polling: 5.5, mediaCredibility: 18, popularSympathy: 10 },
        headlineNews: 'GANADOR INDISCUTIBLE: CANDIDATO ARRASTRA EN DEBATE TELEVISADO CON MINUTO DE ORO',
        tweetReaction: {
          author: 'Televidente Atento',
          handle: '@politica_tv',
          avatar: '🎯',
          content: 'Impecable. Habló claro, sin papelitos y mirando a los ojos de la gente. Ya ganó la elección.'
        }
      },
      {
        text: 'Perder los papeles, gritar "¡mentiroso!" y abandonar el atril furioso en plena transmisión',
        feedback: 'Bochorno nacional en prime-time. Los memes te sepultan y tus números se derrumban en las encuestas.',
        deltas: { polling: -6.0, mediaCredibility: -25, popularSympathy: -10 },
        headlineNews: 'PATALETA EN VIVO: CANDIDATO PIERDE EL CONTROL Y ABANDONA DEBATE ANTE MILLONES',
        tweetReaction: {
          author: 'Analista de Medios',
          handle: '@rating_politico',
          avatar: '📉',
          content: 'No aguantó la primera pregunta difícil y explotó. Qué falta de madurez emocional.'
        }
      }
    ]
  },
  {
    id: 'sem4_entrevista_willax_beto',
    week: 4,
    characterName: 'Beto de la Noche',
    characterRole: 'Conductor Polémico del Programa "Sin Filtro"',
    characterAvatar: '👓',
    dialogue: 'A ver doctor... lo tengo en mi set. Mis fuentes me dicen que su teniente alcalde desayunó con el dueño de una empresa de combis piratas para condonarle papeletas por S/. 200,000. ¿Lo bota ahorita mismo o admite que está rodeado de pillos?',
    contextTag: 'Semana 4 • El Sillón de las Preguntas Incisivas',
    scene3D: 'entrevista_tv',
    choices: [
      {
        text: 'Exhibir documentos contundentes en vivo, comprometerse a una auditoría externa y no titubear',
        feedback: 'Saliste invicto del set más picante de la televisión peruana. Demostraste muñeca de hierro.',
        deltas: { polling: 3.5, mediaCredibility: 15, jneTachaRisk: -5 },
        headlineNews: 'TEMPLANZA DE ACERO: CANDIDATO FRENA EN SECO ACUSACIONES EN ENTREVISTA NOCTURNA',
        tweetReaction: {
          author: 'Seguidor Fiel',
          handle: '@firme_con_el_doc',
          avatar: '💪',
          content: 'Fue a la boca del lobo y salió con la cabeza en alto. Mis respetos total.'
        }
      },
      {
        text: 'Trabar la lengua, sudar frío y pedir un vaso con agua mientras miras al techo',
        feedback: 'El conductor se burló de ti durante 20 minutos y el video del sudor se convirtió en sticker viral.',
        deltas: { polling: -3.5, mediaCredibility: -15, popularSympathy: -8 },
        headlineNews: 'CONTRA LAS CUERDAS: CANDIDATO PADECE EN SET TELEVISIVO Y NO LOGRA RESPONDER',
        tweetReaction: {
          author: 'Tuitero Sarcástico',
          handle: '@chongo_peruano',
          avatar: '💦',
          content: 'Sudaba más que testigo en juicio oral. No supo qué decir durante 5 minutos.'
        }
      }
    ]
  },
  {
    id: 'sem4_propuesta_bypass_tren',
    week: 4,
    characterName: 'Ing. Barreto',
    characterRole: 'Presidente del Colegio de Urbanistas',
    characterAvatar: '📐',
    dialogue: 'Candidato, en la mesa técnica de transporte le piden definir su obra estrella para Lima: ¿Construirá un teleférico de 40 kilómetros por los cerros que suena maravilloso pero cuesta millones, o priorizará la semaforización inteligente y reparación de pistas?',
    contextTag: 'Semana 4 • La Propuesta Estrella',
    scene3D: 'conferencia_prensa',
    choices: [
      {
        text: 'Prometer el teleférico intercerros: ¡Megaproyecto futurista que enamora al electorado!',
        feedback: 'La gente de los cerros se emociona y tus números en Lima Norte y Lima Este explotan hacia arriba.',
        deltas: { polling: 4.0, popularSympathy: 12, campaignFunds: -1.0 },
        headlineNews: 'LIMA DEL FUTURO: PROPUESTA DE TELEFÉRICO INTERURBANO CAUSA FUROR EN LOS CERROS',
        tweetReaction: {
          author: 'Vecino de Independencia',
          handle: '@independencia_futuro',
          avatar: '🚡',
          content: 'Ojalá se haga realidad. Llegar a San Juan en 15 minutos sería un sueño.'
        }
      },
      {
        text: 'Apostar por el plan técnico de semáforos y bacheo: menos floro y soluciones reales',
        feedback: 'Los ingenieros aplauden tu seriedad técnica, aunque no genera el mismo impacto mediático.',
        deltas: { polling: 1.5, mediaCredibility: 12 },
        headlineNews: 'REALISMO TÉCNICO: CANDIDATO APUESTA POR EL REORDENAMIENTO VIAL Y CERO HUMO',
        tweetReaction: {
          author: 'Ingeniero Civil',
          handle: '@obras_reales',
          avatar: '📐',
          content: 'Al fin una propuesta sensata que no promete castillos en el aire.'
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
    dialogue: 'Candidato, es el último jueves antes de las elecciones. Su mitin de cierre puede traer a las 3 orquestas de cumbia más caras del Perú con fuegos artificiales para reventar la Plaza San Martín, o hacer una caravana pacífica con antorchas.',
    contextTag: 'Semana 5 • El Gran Cierre de Campaña',
    scene3D: 'mitin_banderas',
    choices: [
      {
        text: 'Meter las 3 orquestas de cumbia y fuegos artificiales: ¡Fiesta popular inolvidable!',
        feedback: 'Más de 100,000 personas bailando en la plaza. Transmisión en vivo con rating histórico en redes.',
        deltas: { polling: 4.5, campaignFunds: -2.0, popularSympathy: 20 },
        headlineNews: 'CIERRE APOTEÓSICO: CANDIDATO REVIENTA EL CENTRO DE LIMA CON FIESTA POPULAR',
        tweetReaction: {
          author: 'Bailarín de Cumbia',
          handle: '@cumbia_peru',
          avatar: '🎺',
          content: 'Qué fiesta por Dios. La mejor campaña que he visto en 20 años. ¡Ya ganó!'
        }
      },
      {
        text: 'Caravana austera con antorchas y discurso de despedida de 20 minutos',
        feedback: 'Cierre respetuoso y sin caos vehicular, aunque tus rivales acapararon los titulares de la noche.',
        deltas: { polling: 0.5, mediaCredibility: 8 },
        headlineNews: 'CIERRE PACÍFICO: CANDIDATO CONCLUYE CAMPAÑA CON CARAVANA CIUDADANA',
        tweetReaction: {
          author: 'Vecino del Centro',
          handle: '@centro_historico',
          avatar: '🕊️',
          content: 'Gracias por no dejar 10 toneladas de botellas vacías en la plaza. Muy civilizado.'
        }
      }
    ]
  },
  {
    id: 'sem5_guerra_redes_veda',
    week: 5,
    characterName: 'Asesor Fantasma',
    characterRole: 'Estratega de Guerra Digital de Última Hora',
    characterAvatar: '💻',
    dialogue: 'Jefe, estamos en veda electoral (a 24 horas del sufragio). La ley prohíbe publicidad en TV, pero en TikTok y WhatsApp no hay fiscalización. Si soltamos S/. 500,000 en micro-memes y cadenas emocionales, consolidamos el voto de los indecisos.',
    contextTag: 'Semana 5 • La Veda Electoral',
    scene3D: 'batalla_aura',
    choices: [
      {
        text: 'Activar la maquinaria de memes y cadenas emotivas por WhatsApp: ¡Aquí no se afloja!',
        feedback: 'El teléfono de media Lima suena con tus videos emotivos. Los indecisos se vuelcan masivamente a tu favor.',
        deltas: { polling: 3.5, campaignFunds: -0.5, jneTachaRisk: 10 },
        headlineNews: 'TSUNAMI DIGITAL: REDES ARDEN CON MENSAJES DE ÚLTIMO MINUTO ANTES DEL VOTO',
        tweetReaction: {
          author: 'Usuario de WhatsApp',
          handle: '@limeño_comun',
          avatar: '📱',
          content: 'Hasta en el grupo de la familia mandaron el video del doctor. Imposible no verlo.'
        }
      },
      {
        text: 'Respetar la veda electoral a rajatabla y descansar con la familia el sábado',
        feedback: 'Cumples la ley electoral con pulcritud, confiando en que el trabajo de 5 semanas dará frutos.',
        deltas: { polling: 0.5, jneTachaRisk: -10, mediaCredibility: 10 },
        headlineNews: 'RESPETO A LA LEY: CANDIDATO GUARDA SILENCIO Y PASA EL DÍA PREVIO EN FAMILIA',
        tweetReaction: {
          author: 'Abogado Electoral',
          handle: '@derecho_pe',
          avatar: '⚖️',
          content: 'Un ejemplo de respeto a la normativa del Jurado Nacional de Elecciones.'
        }
      }
    ]
  },
  {
    id: 'sem5_boca_de_urna_domingo',
    week: 5,
    characterName: 'Encuestador Jefe',
    characterRole: 'Director de Boca de Urna a Nivel Nacional',
    characterAvatar: '📊',
    dialogue: '¡Son exactamente las 4:00 PM del domingo de elecciones! Las mesas de votación cerraron. Los canales de televisión sueltan el flash electoral con el conteo rápido de actas. La tensión en el búnker es absoluta.',
    contextTag: 'Semana 5 • FLASH ELECTORAL BOCA DE URNA',
    scene3D: 'debate',
    choices: [
      {
        text: 'Salir al balcón con la bandera del Perú a celebrar el veredicto de las urnas',
        feedback: '¡EL PUEBLO HA HABLADO! Los fuegos artificiales iluminan el cielo limeño mientras las actas se procesan.',
        deltas: { polling: 1.0, popularSympathy: 10 },
        headlineNews: '¡HABEMUS ALCALDE! BOCA DE URNA DEFINE EL NUEVO DESTINO DE LIMA METROPOLITANA',
        tweetReaction: {
          author: 'Ciudadano Limeño',
          handle: '@lima_voto_ya',
          avatar: '🇵🇪',
          content: 'Se acabó la espera. Hoy ganó la democracia y empieza una nueva etapa para la capital.'
        }
      },
      {
        text: 'Aguardar los resultados oficiales de la ONPE con personeros y actas en mano',
        feedback: 'Prudencia republicana. Tus personeros cuidan cada voto mesa por mesa en los colegios de la capital.',
        deltas: { polling: 0.5, mediaCredibility: 10 },
        headlineNews: 'MINUTO A MINUTO: BÚNKER ESPERA EL PRIMER CONTEO OFICIAL DE LA ONPE',
        tweetReaction: {
          author: 'Personero Heroico',
          handle: '@cuidando_el_voto',
          avatar: '📝',
          content: 'Aquí defendiendo los votos hasta la última mesa. Todo en orden.'
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
