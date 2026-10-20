import { useState, useEffect, useRef } from 'react';

const SMITHING_TRIMS = [
  { id: 'trim_netherite', name: 'Melhoria de Netherita', img: 'https://minecraft.wiki/images/Netherite_Upgrade_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Bastion Remnant (Tesouro: 100% | Outros baús: 10%)' },
  { id: 'trim_sentry', name: 'Molde do Sentinela', img: 'https://minecraft.wiki/images/Sentry_Armor_Trim_Smithing_Template_JE2_BE2.png', dropInfo: 'Local: Pillager Outpost | Chance: 25% (2 unidades)' },
  { id: 'trim_vex', name: 'Molde do Vex', img: 'https://minecraft.wiki/images/Vex_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Woodland Mansion | Chance: 50%' },
  { id: 'trim_wild', name: 'Molde do Selvagem', img: 'https://minecraft.wiki/images/Wild_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Jungle Temple | Chance: 33.3% (2 unidades)' },
  { id: 'trim_coast', name: 'Molde da Costa', img: 'https://minecraft.wiki/images/Coast_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Shipwreck (Naufrágio) | Chance: 16.7% (2 unidades)' },
  { id: 'trim_dune', name: 'Molde da Duna', img: 'https://minecraft.wiki/images/Dune_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Desert Pyramid | Chance: 14.3% (2 unidades)' },
  { id: 'trim_wayfinder', name: 'Molde do Buscador', img: 'https://minecraft.wiki/images/Wayfinder_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'trim_raiser', name: 'Molde do Criador', img: 'https://minecraft.wiki/images/Raiser_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'trim_shaper', name: 'Molde do Moldador', img: 'https://minecraft.wiki/images/Shaper_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'trim_host', name: 'Molde do Hospedeiro', img: 'https://minecraft.wiki/images/Host_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'trim_ward', name: 'Molde do Guarda', img: 'https://minecraft.wiki/images/Ward_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Ancient City | Chance: 5%' },
  { id: 'trim_silence', name: 'Molde do Silêncio', img: 'https://minecraft.wiki/images/Silence_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Ancient City | Chance: 1.2%' },
  { id: 'trim_tide', name: 'Molde da Maré', img: 'https://minecraft.wiki/images/Tide_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Ocean Monument (Drop do Elder Guardian) | Chance: 20%' },
  { id: 'trim_snout', name: 'Molde do Focinho', img: 'https://minecraft.wiki/images/Snout_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Bastion Remnant | Chance: 8.3%' },
  { id: 'trim_rib', name: 'Molde da Costela', img: 'https://minecraft.wiki/images/Rib_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Nether Fortress | Chance: 6.7%' },
  { id: 'trim_eye', name: 'Molde do Olho', img: 'https://minecraft.wiki/images/Eye_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Stronghold (Biblioteca: 100% | Altar: 10%)' },
  { id: 'trim_spire', name: 'Molde da Espiral', img: 'https://minecraft.wiki/images/Spire_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: End City | Chance: 6.7%' },
  { id: 'trim_bolt', name: 'Molde do Parafuso', img: 'https://minecraft.wiki/images/Bolt_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Trial Chambers (Cofre Normal) | Chance: 6.3%' },
  { id: 'trim_flow', name: 'Molde do Fluxo', img: 'https://minecraft.wiki/images/Flow_Armor_Trim_Smithing_Template_JE1_BE1.png', dropInfo: 'Local: Trial Chambers (Cofre Ominoso) | Chance: 22.5%' }
];
const MUSIC_DISCS = [
  // --- C418 (Os 12 Clássicos) ---
  { id: 'disc_13', name: 'Disco 13', img: 'https://minecraft.wiki/images/Music_Disc_13_JE1_BE1.png', dropInfo: 'Local: Dungeon / Mansion / Creeper abatido por Esqueleto' },
  { id: 'disc_cat', name: 'Disco Cat', img: 'https://minecraft.wiki/images/Music_Disc_cat_JE1_BE1.png', dropInfo: 'Local: Dungeon / Mansion / Creeper abatido por Esqueleto' },
  { id: 'disc_blocks', name: 'Disco Blocks', img: 'https://minecraft.wiki/images/Music_Disc_blocks_JE1_BE1.png', dropInfo: 'Local: Creeper abatido por Esqueleto | Chance: 100% (Aleatório)' },
  { id: 'disc_chirp', name: 'Disco Chirp', img: 'https://minecraft.wiki/images/Music_Disc_chirp_JE1_BE1.png', dropInfo: 'Local: Creeper abatido por Esqueleto | Chance: 100% (Aleatório)' },
  { id: 'disc_far', name: 'Disco Far', img: 'https://minecraft.wiki/images/Music_Disc_far_JE1_BE1.png', dropInfo: 'Local: Creeper abatido por Esqueleto | Chance: 100% (Aleatório)' },
  { id: 'disc_mall', name: 'Disco Mall', img: 'https://minecraft.wiki/images/Music_Disc_mall_JE1_BE1.png', dropInfo: 'Local: Creeper abatido por Esqueleto | Chance: 100% (Aleatório)' },
  { id: 'disc_mellohi', name: 'Disco Mellohi', img: 'https://minecraft.wiki/images/Music_Disc_mellohi_JE1_BE1.png', dropInfo: 'Local: Tesouro Enterrado (18.9%) / Creeper por Esqueleto' },
  { id: 'disc_stal', name: 'Disco Stal', img: 'https://minecraft.wiki/images/Music_Disc_stal_JE1_BE1.png', dropInfo: 'Local: Creeper abatido por Esqueleto | Chance: 100% (Aleatório)' },
  { id: 'disc_strad', name: 'Disco Strad', img: 'https://minecraft.wiki/images/Music_Disc_strad_JE1_BE1.png', dropInfo: 'Local: Creeper abatido por Esqueleto | Chance: 100% (Aleatório)' },
  { id: 'disc_ward', name: 'Disco Ward', img: 'https://minecraft.wiki/images/Music_Disc_ward_JE1_BE1.png', dropInfo: 'Local: Creeper abatido por Esqueleto | Chance: 100% (Aleatório)' },
  { id: 'disc_11', name: 'Disco 11', img: 'https://minecraft.wiki/images/Music_Disc_11_JE1_BE1.png', dropInfo: 'Local: Creeper abatido por Esqueleto | Chance: 100% (Aleatório)' },
  { id: 'disc_wait', name: 'Disco Wait', img: 'https://minecraft.wiki/images/Music_Disc_wait_JE1_BE1.png', dropInfo: 'Local: Tesouro Enterrado (18.9%) / Creeper por Esqueleto' },

  // --- Lena Raine ---
  { id: 'disc_pigstep', name: 'Pigstep', img: 'https://minecraft.wiki/images/Music_Disc_Pigstep_JE1_BE1.png', dropInfo: 'Local: Bastion Remnant (Baús Genéricos) | Chance: 5.6%' },
  { id: 'disc_otherside', name: 'otherside', img: 'https://minecraft.wiki/images/Music_Disc_otherside_JE1_BE1.png', dropInfo: 'Local: Stronghold (Altar: 2.5%) / Ancient City (8.4%) / Dungeon (3.1%)' },
  { id: 'disc_creator', name: 'Creator', img: 'https://minecraft.wiki/images/Music_Disc_Creator_JE1_BE1.png', dropInfo: 'Local: Trial Chambers (Cofre Ominoso) | Chance: 7.5%' },
  { id: 'disc_creator_box', name: 'Creator (Music Box)', img: 'https://minecraft.wiki/images/Music_Disc_Creator_%28Music_Box%29_JE1_BE1.png', dropInfo: 'Local: Trial Chambers (Potes Decorados) | Chance: 1.4%' },

  // --- Aaron Cherof & Samuel Åberg ---
  { id: 'disc_5', name: 'Disco 5', img: 'https://minecraft.wiki/images/Music_Disc_5_JE1_BE1.png', dropInfo: 'Local: Criação com 9 Fragmentos de Disco 5 (Ancient City)' },
  { id: 'disc_relic', name: 'Relic', img: 'https://minecraft.wiki/images/Music_Disc_Relic_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito Raro) | Chance: 8.3%' },
  { id: 'disc_precipice', name: 'Precipice', img: 'https://minecraft.wiki/images/Music_Disc_Precipice_JE1_BE1.png', dropInfo: 'Local: Trial Chambers (Cofre Normal) | Chance: 3.1%' },

  // --- Faixas Adicionais (Eventos e Spin-offs) ---
  { id: 'disc_tears', name: 'Tears', img: 'https://minecraft.wiki/images/Music_Disc_Tears_JE1_BE1.png', dropInfo: 'Local: Nether (Ghast abatido por bola de fogo refletida)' },
  { id: 'disc_lava_chicken', name: 'Lava Chicken', img: 'https://minecraft.wiki/images/Music_Disc_Lava_Chicken_JE1_BE1.png', dropInfo: 'Local: Evento Especial / Drop de Chicken Jockey raro' },
  { id: 'disc_bounce', name: 'Bounce', img: 'https://minecraft.wiki/images/Music_Disc_Bounce_JE1_BE1.png', dropInfo: 'Local: Evento Especial (Snapshot Poisonous Potato)' },

  // --- O Fragmento Perdido ---
  { id: 'disc_5_fragment', name: 'Fragmento de Disco 5', img: 'https://minecraft.wiki/images/Disc_Fragment_5_JE1_BE1.png', dropInfo: 'Local: Ancient City (Baús Normais) | Chance: 29.8% (1-3 unid.)' }
];

const POTTERY_SHERDS = [
  { id: 'sherd_angler', name: 'Óstraco de Pescador', img: 'https://minecraft.wiki/images/Angler_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Ruínas Oceânicas Quentes (Areia Suspeita) | Chance: 6.7%' },
  { id: 'sherd_archer', name: 'Óstraco de Arqueiro', img: 'https://minecraft.wiki/images/Archer_Pottery_Sherd_JE2_BE2.png', dropInfo: 'Local: Pirâmide do Deserto (Areia Suspeita) | Chance: 12.5%' },
  { id: 'sherd_arms_up', name: 'Óstraco de Celebração', img: 'https://minecraft.wiki/images/Arms_Up_Pottery_Sherd_JE1_BE2.png', dropInfo: 'Local: Poço do Deserto (Areia Suspeita) | Chance: 25%' },
  { id: 'sherd_blade', name: 'Óstraco de Lâmina', img: 'https://minecraft.wiki/images/Blade_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Ruínas Oceânicas Frias (Cascalho Suspeito) | Chance: 6.7%' },
  { id: 'sherd_brewer', name: 'Óstraco de Alquimista', img: 'https://minecraft.wiki/images/Brewer_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Poço do Deserto (Areia Suspeita) | Chance: 25%' },
  { id: 'sherd_burn', name: 'Óstraco de Chama', img: 'https://minecraft.wiki/images/Burn_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'sherd_danger', name: 'Óstraco de Perigo', img: 'https://minecraft.wiki/images/Danger_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'sherd_explorer', name: 'Óstraco de Explorador', img: 'https://minecraft.wiki/images/Explorer_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Ruínas Oceânicas Frias (Cascalho Suspeito) | Chance: 6.7%' },
  { id: 'sherd_flow', name: 'Óstraco de Fluxo', img: 'https://minecraft.wiki/images/Flow_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trial Chambers (Potes Decorados) | Chance: 2.3%' },  { id: 'sherd_friend', name: 'Óstraco de Amizade', img: 'https://minecraft.wiki/images/Friend_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'sherd_guster', name: 'Óstraco de Vendaval', img: 'https://minecraft.wiki/images/Guster_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trial Chambers (Potes Decorados) | Chance: 2.3%' },
  { id: 'sherd_heart', name: 'Óstraco de Coração', img: 'https://minecraft.wiki/images/Heart_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'sherd_heartbreak', name: 'Óstraco de Desgosto', img: 'https://minecraft.wiki/images/Heartbreak_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'sherd_howl', name: 'Óstraco de Uivo', img: 'https://minecraft.wiki/images/Howl_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'sherd_miner', name: 'Óstraco de Mineiro', img: 'https://minecraft.wiki/images/Miner_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Pirâmide do Deserto (Areia Suspeita) | Chance: 12.5%' },
  { id: 'sherd_mourner', name: 'Óstraco de Luto', img: 'https://minecraft.wiki/images/Mourner_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Ruínas Oceânicas Frias (Cascalho Suspeito) | Chance: 6.7%' },
  { id: 'sherd_plenty', name: 'Óstraco de Fartura', img: 'https://minecraft.wiki/images/Plenty_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Ruínas Oceânicas Frias (Cascalho Suspeito) | Chance: 6.7%' },
  { id: 'sherd_prize', name: 'Óstraco de Joia', img: 'https://minecraft.wiki/images/Prize_Pottery_Sherd_JE1_BE2.png', dropInfo: 'Local: Pirâmide do Deserto (Areia Suspeita) | Chance: 12.5%' },
  { id: 'sherd_scrape', name: 'Óstraco de Rasgo', img: 'https://minecraft.wiki/images/Scrape_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trial Chambers (Potes Decorados) | Chance: 2.3%' },
  { id: 'sherd_sheaf', name: 'Óstraco de Feixe', img: 'https://minecraft.wiki/images/Sheaf_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Trail Ruins (Cascalho Suspeito) | Chance: 8.3%' },
  { id: 'sherd_shelter', name: 'Óstraco de Abrigo', img: 'https://minecraft.wiki/images/Shelter_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Ruínas Oceânicas Quentes (Areia Suspeita) | Chance: 6.7%' },
  { id: 'sherd_skull', name: 'Óstraco de Caveira', img: 'https://minecraft.wiki/images/Skull_Pottery_Sherd_JE1_BE2.png', dropInfo: 'Local: Pirâmide do Deserto (Areia Suspeita) | Chance: 12.5%' },
  { id: 'sherd_snort', name: 'Óstraco de Bufido', img: 'https://minecraft.wiki/images/Snort_Pottery_Sherd_JE1_BE1.png', dropInfo: 'Local: Ruínas Oceânicas Quentes (Areia Suspeita) | Chance: 6.7%' }
];


const BANNER_PATTERNS = [
  // --- Clássicos e Nether ---
  { id: 'banner_flower', name: 'Figura de Flor', img: 'https://minecraft.wiki/images/Flower_Charge_Banner_Pattern_JE2_BE2.png', dropInfo: 'Local: Bancada de Trabalho (Papel + Margarida)' },
  { id: 'banner_creeper', name: 'Figura de Creeper', img: 'https://minecraft.wiki/images/Creeper_Charge_Banner_Pattern_JE2_BE2.png', dropInfo: 'Local: Bancada de Trabalho (Papel + Cabeça de Creeper)' },
  { id: 'banner_skull', name: 'Figura de Caveira', img: 'https://minecraft.wiki/images/Skull_Charge_Banner_Pattern_JE2_BE2.png', dropInfo: 'Local: Bancada de Trabalho (Papel + Crânio de Esqueleto Wither)' },
  { id: 'banner_thing', name: 'Símbolo da Mojang', img: 'https://minecraft.wiki/images/Thing_Banner_Pattern_JE2_BE2.png', dropInfo: 'Local: Bancada de Trabalho (Papel + Maçã Dourada Encantada)' },
  { id: 'banner_globe', name: 'Padrão de Globo', img: 'https://minecraft.wiki/images/Globe_Banner_Pattern_JE2_BE2.png', dropInfo: 'Local: Troca de Cartógrafo Nível Mestre | Preço: 8 Esmeraldas' },
  { id: 'banner_snout', name: 'Padrão de Focinho', img: 'https://minecraft.wiki/images/Snout_Banner_Pattern_JE2_BE2.png', dropInfo: 'Local: Bastion Remnant (Baús) | Chance: 10.1%' },

  // --- Tricky Trials (1.21) ---
  { id: 'banner_flow', name: 'Padrão de Fluxo', img: 'https://minecraft.wiki/images/Flow_Banner_Pattern_JE2_BE2.png', dropInfo: 'Local: Trial Chambers (Cofre Ominoso) | Chance: 15%' },
  { id: 'banner_guster', name: 'Padrão de Vendaval', img: 'https://minecraft.wiki/images/Guster_Banner_Pattern_JE2_BE2.png', dropInfo: 'Local: Trial Chambers (Cofre Normal) | Chance: 6.3%' }
];

// O VILLAGER_TRADES, CATEGORIES e ALL_COLLECTIBLES mantêm-se exatamente iguais ao que tens!

const VILLAGER_TRADES = [
  {
    id: 'role_anti_warden',
    role: 'Anti-Warden',
    description: 'Kit focado em furtividade máxima e mobilidade para explorar Ancient Cities em segurança.',
    profession: 'Bibliotecário + Armeiro',
    trades: [
      { id: 'vt_swift_sneak', name: 'Passo Furtivo III (Swift Sneak III)', source: 'Baú de Ancient City (Não negociável)', price: 'Loot de Baú (8.4%)', notes: 'Essencial nas Grevas de Netherita para caminhar rápido agachado.' },
      { id: 'vt_prot_4', name: 'Proteção IV (Protection IV)', source: 'Bibliotecário (Qualquer bioma)', price: '14–64 Esmeraldas', notes: 'Aplica em todas as 4 peças da armadura.' },
      { id: 'vt_feather_4', name: 'Peso Pena IV (Feather Falling IV)', source: 'Bibliotecário (Qualquer bioma)', price: '14–64 Esmeraldas', notes: 'Reduz o dano de queda em torres da Ancient City.' },
      { id: 'vt_aqua_res', name: 'Afinidade Aquática + Respiração III', source: 'Bibliotecário (Qualquer bioma)', price: '5–38 Esmeraldas', notes: 'Útil para submersão rápida caso o Warden seja invocado.' }
    ]
  },
  {
    id: 'role_elytra',
    role: 'Kit Elytra',
    description: 'Livros essenciais para voo infinito e durabilidade máxima nas tuas Elytra.',
    profession: 'Bibliotecário + Flecheiro',
    trades: [
      { id: 'vt_mending_elytra', name: 'Remendo (Mending)', source: 'Bibliotecário (Pântano ou Qualquer)', price: '10–36 Esmeraldas (x2)', notes: 'Repara as Elytra usando orbes de XP.' },
      { id: 'vt_unbreaking_3', name: 'Inquebrável III (Unbreaking III)', source: 'Bibliotecário (Qualquer bioma)', price: '11–54 Esmeraldas', notes: 'Quadruplica o tempo de voo antes de precisar de reparo.' },
      { id: 'vt_phantom_mem', name: 'Membranas de Fantasma (Reserva)', source: 'Caça Noturna / Gatos Domesticados', price: 'Presente de Gato (3.2%)', notes: 'Alternativa de reparo na bigorna caso fiques sem XP no End.' }
    ]
  },
  {
    id: 'role_tools',
    role: 'Kit Ferramentas',
    description: 'Setup perfeito para Picareta, Pá e Machado de mineração e construção em larga escala.',
    profession: 'Bibliotecário + Ferramenteiro',
    trades: [
      { id: 'vt_eff_5', name: 'Eficiência V (Efficiency V)', source: 'Bibliotecário (Qualquer bioma)', price: '17–64 Esmeraldas', notes: 'Permite Insta-Mine em Pedra com Beacon Haste II.' },
      { id: 'vt_silk_touch', name: 'Toque Suave (Silk Touch)', source: 'Bibliotecário (Qualquer bioma)', price: '5–19 Esmeraldas', notes: 'Indispensável para recolher Cascalho/Areia Suspeita, Vidro eEnder Chests.' },
      { id: 'vt_fortune_3', name: 'Fortuna III (Fortune III)', source: 'Bibliotecário (Qualquer bioma)', price: '11–54 Esmeraldas', notes: 'Multiplica até 4x o drop de Diamantes, Esmeraldas e Carvão.' },
      { id: 'vt_mending_tools', name: 'Remendo + Inquebrável III', source: 'Bibliotecário (Qualquer bioma)', price: '10–54 Esmeraldas', notes: 'Mantém todo o conjunto de ferramentas eterno.' }
    ]
  },
  {
    id: 'role_weapons',
    role: 'Armas',
    description: 'Combinação de dano máximo para Espada, Arco e Tridente contra Bosses e Mobs.',
    profession: 'Bibliotecário + Armeiro de Armas',
    trades: [
      { id: 'vt_sharp_5', name: 'Afiação V (Sharpness V)', source: 'Bibliotecário (Qualquer bioma)', price: '17–64 Esmeraldas', notes: 'Melhor dano geral para Espada e Machado.' },
      { id: 'vt_looting_3', name: 'Saque III (Looting III)', source: 'Bibliotecário (Qualquer bioma)', price: '11–54 Esmeraldas', notes: 'Essencial para farmar Crânios Wither, Pérolas do Fim e Discos.' },
      { id: 'vt_power_5', name: 'Força V + Infinidade (Power V + Infinity)', source: 'Bibliotecário (Qualquer bioma)', price: '17–64 Esmeraldas', notes: 'Abate Creepers e Esqueletos à distância com 1 flecha.' },
      { id: 'vt_sweeping_3', name: 'Alcance III + Aspecto Flamejante II', source: 'Bibliotecário (Qualquer bioma)', price: '8–54 Esmeraldas', notes: 'Dano em área máximo para farms de XP.' }
    ]
  }
];

const CATEGORIES = [
  { id: 'trims', label: 'Moldes', fullTitle: 'Moldes de Ferraria (Smithing Trims)', items: SMITHING_TRIMS },
  { id: 'discs', label: 'Discos', fullTitle: 'Discos de Música (Music Discs)', items: MUSIC_DISCS },
  { id: 'sherds', label: 'Cerâmicas', fullTitle: 'Fragmentos de Cerâmica (Pottery Sherds)', items: POTTERY_SHERDS },
  { id: 'banners', label: 'Estandartes', fullTitle: 'Padrões de Estandarte (Banner Patterns)', items: BANNER_PATTERNS }
];

const ALL_COLLECTIBLES = [
  ...SMITHING_TRIMS,
  ...MUSIC_DISCS,
  ...POTTERY_SHERDS,
  ...BANNER_PATTERNS
];

const STORAGE_COLLECTED_KEY = 'mc_tracker_v2_collected';
const STORAGE_PINNED_KEY = 'mc_tracker_v2_pinned';

export default function App() {
  const [collected, setCollected] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COLLECTED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [pinned, setPinned] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PINNED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [hideCompleted, setHideCompleted] = useState(false);
  const [activeInfoItem, setActiveInfoItem] = useState(null);
  const [statusToast, setStatusToast] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_COLLECTED_KEY, JSON.stringify(collected));
    } catch (error) {
      console.error('Erro ao gravar colecionáveis no localStorage:', error);
    }
  }, [collected]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PINNED_KEY, JSON.stringify(pinned));
    } catch (error) {
      console.error('Erro ao gravar pins no localStorage:', error);
    }
  }, [pinned]);

  const showNotification = (msg) => {
    setStatusToast(msg);
    setTimeout(() => {
      setStatusToast(null);
    }, 3000);
  };

  const toggleCollected = (id) => {
    setCollected((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const togglePin = (id, event) => {
    if (event) event.stopPropagation();
    setPinned((prev) =>
      prev.includes(id) ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleOpenInfo = (item, event) => {
    if (event) event.stopPropagation();
    setActiveInfoItem(item);
  };

  const handleExportJSON = () => {
    const payload = {
      version: '2.0',
      exportedAt: new Date().toISOString(),
      collected,
      pinned
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `minecraft-tracker-v2-backup.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('Progresso exportado com sucesso!');
  };

  const handleImportJSON = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target?.result);
        if (Array.isArray(parsed.collected)) {
          setCollected(parsed.collected);
        }
        if (Array.isArray(parsed.pinned)) {
          setPinned(parsed.pinned);
        }
        showNotification('Dados importados com sucesso!');
      } catch {
        showNotification('Erro: Ficheiro JSON inválido.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const filterItems = (items) => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dropInfo.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCompletion = hideCompleted ? !collected.includes(item.id) : true;
      return matchesSearch && matchesCompletion;
    });
  };

  const pinnedItemsObjects = ALL_COLLECTIBLES.filter((item) => pinned.includes(item.id));
  const totalCollectiblesCount = ALL_COLLECTIBLES.length;
  const totalCollectedCount = ALL_COLLECTIBLES.filter((i) => collected.includes(i.id)).length;
  const globalPercent = Math.round((totalCollectedCount / totalCollectiblesCount) * 100);

  const renderSectionHeader = (title, items) => {
    const count = items.filter((i) => collected.includes(i.id)).length;
    const total = items.length;
    const pct = total > 0 ? Math.round((count / total) * 100) : 0;

    return (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-neutral-800">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-neutral-100 tracking-tight">
            {title}
          </h2>
          <p className="text-xs text-neutral-400">
            {count} de {total} concluídos ({pct}%)
          </p>
        </div>

        {/* Mini-barra de progresso modular */}
        <div className="flex items-center gap-3 w-full sm:w-64">
          <div className="flex-1 h-2.5 bg-neutral-900 border border-neutral-800 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs font-mono font-semibold text-emerald-400 min-w-[3.2rem] text-right">
            {count}/{total}
          </span>
        </div>
      </div>
    );
  };

  const renderItemCard = (item) => {
    const isCollected = collected.includes(item.id);
    const isPinned = pinned.includes(item.id);
    const isModalOpen = activeInfoItem?.id === item.id;

    return (
      <div
        key={item.id}
        onClick={() => toggleCollected(item.id)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleCollected(item.id);
          }
        }}
        className={`group relative flex flex-col items-center justify-between p-4 rounded-xl border transition-all duration-200 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
          isCollected
            ? 'bg-emerald-500/10 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
            : 'bg-neutral-900 border-neutral-800 opacity-60 hover:opacity-90 hover:border-neutral-700'
        }`}
      >
        {/* Canto Sup. Esquerdo: Estrela / Pin */}
        <button
          type="button"
          onClick={(e) => togglePin(item.id, e)}
          title={isPinned ? 'Remover dos Objetivos da Sessão' : 'Fixar nos Objetivos da Sessão'}
          className={`absolute top-2.5 left-2.5 z-10 p-1.5 rounded-lg border transition-colors ${
            isPinned
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
              : 'bg-neutral-950/60 border-neutral-800 text-neutral-500 hover:text-amber-300 hover:border-neutral-700'
          }`}
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>

        {/* Canto Sup. Direito: Ponto Verde Pulsante quando Coletado */}
        {isCollected && (
          <span className="absolute top-3.5 right-3.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
          </span>
        )}

        {/* Centro: Imagem Pixelada */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center my-4">
          <img
            src={item.img}
            alt={item.name}
            loading="lazy"
            style={{ imageRendering: 'pixelated' }}
            className={`max-w-full max-h-full object-contain transition-transform duration-300 drop-shadow-md ${
              isCollected ? 'grayscale-0 scale-105' : 'grayscale'
            }`}
          />
        </div>

        {/* Rodapé do Card */}
        <div className="w-full text-center mt-1 pr-6 pl-1">
          <p
            className={`text-xs sm:text-sm font-semibold truncate ${
              isCollected ? 'text-neutral-100' : 'text-neutral-300'
            }`}
          >
            {item.name}
          </p>
          <span
            className={`inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded ${
              isCollected
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-neutral-800 text-neutral-400'
            }`}
          >
            {isCollected ? 'Coletado' : 'Pendente'}
          </span>
        </div>

        {/* Canto Inf. Direito: Ícone de Informação (Abre Modal) */}
        <button
          type="button"
          onClick={(e) => handleOpenInfo(item, e)}
          title="Ver informações de obtenção"
          className={`absolute bottom-2.5 right-2.5 z-10 w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold border transition-colors ${
            isModalOpen
              ? 'bg-emerald-500 text-neutral-950 border-emerald-400'
              : 'bg-neutral-950/80 text-neutral-400 border-neutral-700 hover:text-neutral-100 hover:border-neutral-500'
          }`}
        >
          i
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col">
      {/* Notificação Flutuante */}
      {statusToast && (
        <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 rounded-xl bg-neutral-900 border border-emerald-500 text-emerald-400 text-xs sm:text-sm font-medium shadow-xl">
          {statusToast}
        </div>
      )}

      {/* Modal de Detalhes de Obtenção */}
      {activeInfoItem && (
        <div
          onClick={() => setActiveInfoItem(null)}
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-center p-2">
                  <img
                    src={activeInfoItem.img}
                    alt={activeInfoItem.name}
                    style={{ imageRendering: 'pixelated' }}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-neutral-100">{activeInfoItem.name}</h3>
                  <span className="text-xs text-emerald-400 font-mono">
                    {collected.includes(activeInfoItem.id) ? '● Coletado' : '○ Pendente'}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveInfoItem(null)}
                className="text-neutral-400 hover:text-neutral-100 p-1 rounded-lg bg-neutral-800/60"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <p className="text-xs uppercase tracking-wider font-semibold text-neutral-400">
                Guia de Drop / Obtenção
              </p>
              <p className="text-sm text-neutral-200 leading-relaxed">
                {activeInfoItem.dropInfo}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={(e) => togglePin(activeInfoItem.id, e)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium border border-neutral-700 bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
              >
                {pinned.includes(activeInfoItem.id) ? 'Remover Pin' : 'Fixar na Sessão'}
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleCollected(activeInfoItem.id);
                  setActiveInfoItem(null);
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500 text-neutral-950 hover:bg-emerald-400"
              >
                {collected.includes(activeInfoItem.id) ? 'Marcar como Pendente' : 'Marcar como Coletado'}
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="w-full max-w-6xl mx-auto px-4 py-6 sm:py-10 space-y-8">
        {/* 1. Cabeçalho Geral & Exportação */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[11px] font-semibold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              Solo Player Companion • v2.0
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-100">
              Minecraft Tracker v2.0
            </h1>
            <p className="text-xs sm:text-sm text-neutral-400">
              Progresso Global: <strong className="text-neutral-200">{totalCollectedCount}</strong> de{' '}
              <strong className="text-neutral-200">{totalCollectiblesCount}</strong> colecionáveis ({globalPercent}%)
            </p>
          </div>

          {/* Botões Exportar / Importar JSON no Canto Superior Direito */}
          <div className="flex items-center gap-2.5 self-start md:self-center">
            <button
              type="button"
              onClick={handleExportJSON}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 transition-colors cursor-pointer"
            >
              Exportar JSON
            </button>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 rounded-lg text-xs font-semibold bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition-colors cursor-pointer"
            >
              Importar JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
          </div>
        </header>

        {/* 2. Filtros de Visão (Controlos Gerais) */}
        <section className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-neutral-900/60 border border-neutral-800 p-4 rounded-xl">
          {/* Barra de Pesquisa em Tempo Real */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar item ou local de obtenção (ex: Ancient City, Pigstep, Fluxo)..."
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-neutral-950 border border-neutral-800 text-sm text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 text-sm">
              🔍
            </span>
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-200"
              >
                Limpar
              </button>
            )}
          </div>

          {/* Botão Toggle "Ocultar Concluídos" */}
          <button
            type="button"
            onClick={() => setHideCompleted((prev) => !prev)}
            className="flex items-center justify-between sm:justify-start gap-3 px-3.5 py-2 rounded-lg bg-neutral-950 border border-neutral-800 cursor-pointer"
          >
            <span className="text-xs sm:text-sm font-medium text-neutral-300">
              Ocultar Concluídos
            </span>
            <span
              className={`w-9 h-5 flex items-center rounded-full p-0.5 transition-colors ${
                hideCompleted ? 'bg-emerald-500' : 'bg-neutral-700'
              }`}
            >
              <span
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                  hideCompleted ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </span>
          </button>
        </section>

        {/* 3. Navegação por Abas (Tabs) */}
        <nav className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'overview', label: 'Visão Geral (Todos)' },
            { id: 'trims', label: 'Moldes' },
            { id: 'discs', label: 'Discos' },
            { id: 'sherds', label: 'Cerâmicas' },
            { id: 'banners', label: 'Estandartes' },
            { id: 'villagers', label: 'Guias de Villager' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap border transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-500 text-neutral-950 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-neutral-200 hover:border-neutral-700'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* 4. Secção de Pinned (Objetivos da Sessão) - Visível em todas as abas exceto Villagers */}
        {activeTab !== 'villagers' && (
          <section className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 text-sm">★</span>
                <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-neutral-200">
                  Objetivos da Sessão ({pinnedItemsObjects.length})
                </h2>
              </div>
              {pinnedItemsObjects.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPinned([])}
                  className="text-xs text-neutral-400 hover:text-neutral-200 underline cursor-pointer"
                >
                  Limpar pins
                </button>
              )}
            </div>

            {pinnedItemsObjects.length === 0 ? (
              <p className="text-xs text-neutral-500">
                Clica no ícone de estrela (★) no canto superior esquerdo de qualquer item para afixá-lo como objetivo desta sessão.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2.5">
                {pinnedItemsObjects.map((item) => {
                  const isCollected = collected.includes(item.id);
                  return (
                    <div
                      key={`pin_${item.id}`}
                      onClick={() => toggleCollected(item.id)}
                      className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isCollected
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-200'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{ imageRendering: 'pixelated' }}
                        className={`w-6 h-6 object-contain ${isCollected ? 'grayscale-0' : 'grayscale'}`}
                      />
                      <span className="font-medium">{item.name}</span>
                      <button
                        type="button"
                        onClick={(e) => togglePin(item.id, e)}
                        title="Desafixar"
                        className="text-neutral-500 hover:text-amber-400 ml-1"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* 5. Conteúdo Principal Consoante a Aba Ativa */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {CATEGORIES.map((category) => {
              const filtered = filterItems(category.items);
              return (
                <section key={category.id}>
                  {renderSectionHeader(category.fullTitle, category.items)}
                  {filtered.length === 0 ? (
                    <p className="text-sm text-neutral-500 py-6 text-center bg-neutral-900/30 rounded-xl border border-neutral-900">
                      Nenhum item encontrado com os filtros atuais nesta secção.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filtered.map(renderItemCard)}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}

        {['trims', 'discs', 'sherds', 'banners'].includes(activeTab) && (
          <div>
            {CATEGORIES.filter((cat) => cat.id === activeTab).map((category) => {
              const filtered = filterItems(category.items);
              return (
                <section key={category.id}>
                  {renderSectionHeader(category.fullTitle, category.items)}
                  {filtered.length === 0 ? (
                    <p className="text-sm text-neutral-500 py-8 text-center bg-neutral-900/30 rounded-xl border border-neutral-900">
                      Nenhum item corresponde à pesquisa ou filtro selecionado.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {filtered.map(renderItemCard)}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        )}

        {activeTab === 'villagers' && (
          <section className="space-y-6">
            <div className="border-b border-neutral-800 pb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-100">
                Guias de Trocas de Villagers & Kits de Equipamento
              </h2>
              <p className="text-xs sm:text-sm text-neutral-400 mt-1">
                Marca os encantamentos e trocas que já garantiste no teu Trading Hall.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {VILLAGER_TRADES.map((group) => {
                const visibleTrades = group.trades.filter((t) => {
                  const matchesSearch =
                    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.notes.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    group.role.toLowerCase().includes(searchQuery.toLowerCase());
                  const matchesHide = hideCompleted ? !collected.includes(t.id) : true;
                  return matchesSearch && matchesHide;
                });

                const completedTrades = group.trades.filter((t) => collected.includes(t.id)).length;
                const totalTrades = group.trades.length;
                const rolePct = Math.round((completedTrades / totalTrades) * 100);

                return (
                  <div
                    key={group.id}
                    className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                            {group.profession}
                          </span>
                          <h3 className="text-lg font-bold text-neutral-100">{group.role}</h3>
                        </div>
                        <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-neutral-950 border border-neutral-800 text-emerald-400">
                          {completedTrades}/{totalTrades}
                        </span>
                      </div>

                      <p className="text-xs text-neutral-400 leading-relaxed">
                        {group.description}
                      </p>

                      <div className="h-2 w-full bg-neutral-950 border border-neutral-800 rounded-full overflow-hidden p-0.5">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${rolePct}%` }}
                        />
                      </div>

                      <div className="space-y-2.5 pt-2">
                        {visibleTrades.map((trade) => {
                          const isDone = collected.includes(trade.id);
                          return (
                            <div
                              key={trade.id}
                              onClick={() => toggleCollected(trade.id)}
                              className={`p-3 rounded-xl border transition-all cursor-pointer ${
                                isDone
                                  ? 'bg-emerald-500/10 border-emerald-500'
                                  : 'bg-neutral-950/80 border-neutral-800 opacity-75 hover:opacity-100'
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs sm:text-sm font-semibold text-neutral-100">
                                  {trade.name}
                                </span>
                                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-emerald-400">
                                  {trade.price}
                                </span>
                              </div>
                              <p className="text-[11px] text-neutral-400 mt-1">
                                <strong className="text-neutral-300">Origem:</strong> {trade.source}
                              </p>
                              <p className="text-[11px] text-neutral-500 mt-0.5">{trade.notes}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
