/**
 * Personalized Art Profile - Data Engine & Configuration
 * Supports multiple artists, persistent local storage, theme management, and image catalogs.
 */

const LOCAL_IMAGES = [
  { id: 'front1', path: 'img/front1.jpeg', label: 'Front Piece I' },
  { id: 'front2', path: 'img/front2.jpeg', label: 'Front Piece II' },
  { id: 'front3', path: 'img/front3.jpeg', label: 'Front Piece III' },
  { id: 'front4', path: 'img/front4.jpeg', label: 'Front Piece IV' },
  { id: 'front5', path: 'img/front5.jpeg', label: 'Front Piece V' },
  { id: 'front6', path: 'img/front6.jpeg', label: 'Front Piece VI' },
  { id: 'pic1', path: 'img/pic1.jpeg', label: 'Masterpiece 01' },
  { id: 'pic2', path: 'img/pic2.jpeg', label: 'Masterpiece 02' },
  { id: 'pic3', path: 'img/pic3.jpeg', label: 'Masterpiece 03' },
  { id: 'pic4', path: 'img/pic4.jpeg', label: 'Masterpiece 04' },
  { id: 'pic5', path: 'img/pic5.jpeg', label: 'Masterpiece 05' },
  { id: 'pic6', path: 'img/pic6.jpeg', label: 'Masterpiece 06' },
  { id: 'pic7', path: 'img/pic7.jpeg', label: 'Masterpiece 07' },
  { id: 'pic8', path: 'img/pic8.jpeg', label: 'Masterpiece 08' },
  { id: 'pic9', path: 'img/pic9.jpeg', label: 'Masterpiece 09' },
  { id: 'pic10', path: 'img/pic10.jpeg', label: 'Masterpiece 10' },
  { id: 'pic11', path: 'img/pic11.jpeg', label: 'Masterpiece 11' },
  { id: 'pic12', path: 'img/pic12.jpeg', label: 'Masterpiece 12' }
];

const THEMES = {
  'neon-noir': {
    id: 'neon-noir',
    name: 'Neon Velvet (Pink & Purple)',
    description: 'Electrifying neon pink, regal purple & pitch black contrast',
    colors: {
      primary: '#ff2a85',
      primaryGlow: 'rgba(255, 42, 133, 0.45)',
      secondary: '#9d4edd',
      secondaryGlow: 'rgba(157, 78, 221, 0.45)',
      accent: '#e056fd',
      bgDark: '#08040c',
      bgMedium: '#11071d',
      bgCard: '#170b28',
      bgCardHover: '#23113c',
      textPrimary: '#fcf8ff',
      textSecondary: '#b7a8d0',
      borderColor: 'rgba(255, 42, 133, 0.22)',
      borderHover: 'rgba(157, 78, 221, 0.65)',
      navBg: 'rgba(8, 4, 12, 0.85)',
      gradient: 'linear-gradient(135deg, #ff2a85 0%, #9d4edd 50%, #4a00e0 100%)',
      gradientSoft: 'linear-gradient(135deg, rgba(255,42,133,0.15) 0%, rgba(157,78,221,0.15) 100%)',
      canvasParticle: '#ff2a85',
      canvasParticleAlt: '#9d4edd'
    }
  },
  'cyber-magenta': {
    id: 'cyber-magenta',
    name: 'Cyberpunk Aurora',
    description: 'Hot magenta, glowing cyan, dark space obsidian',
    colors: {
      primary: '#ff007f',
      primaryGlow: 'rgba(255, 0, 127, 0.45)',
      secondary: '#00f0ff',
      secondaryGlow: 'rgba(0, 240, 255, 0.45)',
      accent: '#7b2cbf',
      bgDark: '#05050b',
      bgMedium: '#0c0c17',
      bgCard: '#131326',
      bgCardHover: '#1c1b36',
      textPrimary: '#ffffff',
      textSecondary: '#9fa6c9',
      borderColor: 'rgba(0, 240, 255, 0.25)',
      borderHover: 'rgba(255, 0, 127, 0.7)',
      navBg: 'rgba(5, 5, 11, 0.85)',
      gradient: 'linear-gradient(135deg, #ff007f 0%, #7b2cbf 50%, #00f0ff 100%)',
      gradientSoft: 'linear-gradient(135deg, rgba(255,0,127,0.15) 0%, rgba(0,240,255,0.15) 100%)',
      canvasParticle: '#ff007f',
      canvasParticleAlt: '#00f0ff'
    }
  },
  'amethyst-gold': {
    id: 'amethyst-gold',
    name: 'Amethyst & Royal Gold',
    description: 'Velvet deep purple, radiant champagne gold and deep bronze',
    colors: {
      primary: '#c084fc',
      primaryGlow: 'rgba(192, 132, 252, 0.4)',
      secondary: '#fbbf24',
      secondaryGlow: 'rgba(251, 191, 36, 0.4)',
      accent: '#f43f5e',
      bgDark: '#090511',
      bgMedium: '#140c24',
      bgCard: '#1c1133',
      bgCardHover: '#291849',
      textPrimary: '#fffdfa',
      textSecondary: '#cbbcdb',
      borderColor: 'rgba(251, 191, 36, 0.25)',
      borderHover: 'rgba(192, 132, 252, 0.7)',
      navBg: 'rgba(9, 5, 17, 0.85)',
      gradient: 'linear-gradient(135deg, #c084fc 0%, #a855f7 50%, #fbbf24 100%)',
      gradientSoft: 'linear-gradient(135deg, rgba(192,132,252,0.15) 0%, rgba(251,191,36,0.15) 100%)',
      canvasParticle: '#c084fc',
      canvasParticleAlt: '#fbbf24'
    }
  },
  'sakura-noir': {
    id: 'sakura-noir',
    name: 'Sakura Noir',
    description: 'Midnight ink, ethereal cherry blossom petal pink and smoky lavender',
    colors: {
      primary: '#ff77a9',
      primaryGlow: 'rgba(255, 119, 169, 0.4)',
      secondary: '#c084fc',
      secondaryGlow: 'rgba(192, 132, 252, 0.4)',
      accent: '#fca5a5',
      bgDark: '#080509',
      bgMedium: '#120b15',
      bgCard: '#19101d',
      bgCardHover: '#24172a',
      textPrimary: '#fff5f8',
      textSecondary: '#b8a6bb',
      borderColor: 'rgba(255, 119, 169, 0.22)',
      borderHover: 'rgba(255, 119, 169, 0.65)',
      navBg: 'rgba(8, 5, 9, 0.85)',
      gradient: 'linear-gradient(135deg, #ff77a9 0%, #c084fc 60%, #818cf8 100%)',
      gradientSoft: 'linear-gradient(135deg, rgba(255,119,169,0.15) 0%, rgba(192,132,252,0.15) 100%)',
      canvasParticle: '#ff77a9',
      canvasParticleAlt: '#c084fc'
    }
  },
  'minimal-noir': {
    id: 'minimal-noir',
    name: 'Minimalist Gallery Noir',
    description: 'Timeless museum monochrome with delicate blush undertone',
    colors: {
      primary: '#f472b6',
      primaryGlow: 'rgba(244, 114, 182, 0.3)',
      secondary: '#e2e8f0',
      secondaryGlow: 'rgba(226, 232, 240, 0.3)',
      accent: '#a78bfa',
      bgDark: '#050506',
      bgMedium: '#0c0c0e',
      bgCard: '#141418',
      bgCardHover: '#1d1d23',
      textPrimary: '#ffffff',
      textSecondary: '#94a3b8',
      borderColor: 'rgba(255, 255, 255, 0.12)',
      borderHover: 'rgba(244, 114, 182, 0.5)',
      navBg: 'rgba(5, 5, 6, 0.88)',
      gradient: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #f472b6 100%)',
      gradientSoft: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(244,114,182,0.1) 100%)',
      canvasParticle: '#f472b6',
      canvasParticleAlt: '#e2e8f0'
    }
  }
};

const ARTIST_PRESETS = {
  'artist-aria': {
    name: 'Aria Thorne',
    title: 'Visual Futurist & Surrealist Concept Artist',
    tagline: 'Bridging the chasm between celestial dreams, neon poetry, and digital mythologies.',
    bio: 'Aria Thorne is an internationally exhibited digital painter and concept designer specializing in ethereal portraiture, luminous surrealism, and atmospheric science-fiction landscapes. Her signature style fuses traditional Renaissance chiaroscuro with pulsing cyberpunk neon palettes, exploring vulnerability, identity, and cosmic transcendence.',
    location: 'Tokyo & Neo-San Francisco',
    yearsExperience: 8,
    artworksCount: 140,
    exhibitionsCount: 18,
    awardsCount: 7,
    avatar: 'img/front1.jpeg',
    heroCover: 'img/front2.jpeg',
    statusBadge: 'Accepting Exclusive Commissions',
    statusActive: true,
    email: 'aria.thorne.art@atelier.dev',
    phone: '+1 (555) 789-2341',
    theme: 'neon-noir',
    animatorStyle: 'cosmic',
    social: {
      instagram: 'https://instagram.com',
      artstation: 'https://artstation.com',
      behance: 'https://behance.net',
      twitter: 'https://x.com',
      discord: 'https://discord.com'
    }
  },
  'artist-marcus': {
    name: 'Marcus Kaelen',
    title: 'Master Illustrator & Cinematic Worldbuilder',
    tagline: 'Sculpting shadows, evocative silhouettes, and visceral fantasy environments.',
    bio: 'Marcus has spent over a decade crafting cinematic character illustrations, graphic novels, and dark fantasy game environments. Known for gritty textured compositions bathed in striking magenta-violet edge lighting, his work immerses audiences into hauntingly beautiful realms.',
    location: 'Berlin / London',
    yearsExperience: 11,
    artworksCount: 220,
    exhibitionsCount: 25,
    awardsCount: 12,
    avatar: 'img/front3.jpeg',
    heroCover: 'img/front4.jpeg',
    statusBadge: 'Booked for Studio Projects',
    statusActive: false,
    email: 'marcus.kaelen@atelier.dev',
    phone: '+49 30 901820',
    theme: 'cyber-magenta',
    animatorStyle: 'constellation',
    social: {
      instagram: 'https://instagram.com',
      artstation: 'https://artstation.com',
      behance: 'https://behance.net',
      twitter: 'https://x.com',
      discord: 'https://discord.com'
    }
  },
  'artist-elena': {
    name: 'Elena Rostova',
    title: 'Neo-Classical & Haute Couture Digital Painter',
    tagline: 'Where high fashion, baroque drama, and modern digital aesthetics collide.',
    bio: 'Elena balances fine art heritage with cutting-edge digital brushwork. Her portraits explore feminine archetype, modern opulence, and psychological introspection with rich jewel tones, iridescent textures, and gilded highlights.',
    location: 'Paris & Milan',
    yearsExperience: 9,
    artworksCount: 175,
    exhibitionsCount: 21,
    awardsCount: 9,
    avatar: 'img/front5.jpeg',
    heroCover: 'img/front6.jpeg',
    statusBadge: 'Limited Gallery Editions Available',
    statusActive: true,
    email: 'elena.rostova@atelier.dev',
    phone: '+33 1 42 68 55 00',
    theme: 'sakura-noir',
    animatorStyle: 'nebula',
    social: {
      instagram: 'https://instagram.com',
      artstation: 'https://artstation.com',
      behance: 'https://behance.net',
      twitter: 'https://x.com',
      discord: 'https://discord.com'
    }
  }
};

const DEFAULT_ARTWORKS = [
  {
    id: 'art-1',
    title: 'Violet Resonance',
    category: 'Surrealism',
    year: '2026',
    medium: 'Digital Oils & Neon Glaze',
    dimensions: '4000 × 5000 px (300 DPI)',
    image: 'img/front1.jpeg',
    featured: true,
    description: 'An exploration of human consciousness merging into hyper-dimensional frequency fields, bathed in electric magenta and ethereal violet tones.'
  },
  {
    id: 'art-2',
    title: 'Crown of Petals & Shadows',
    category: 'Portraits',
    year: '2026',
    medium: 'Digital Mixed Media',
    dimensions: '3800 × 4800 px',
    image: 'img/front2.jpeg',
    featured: true,
    description: 'A study on organic transience and regal stillness. Delicate floral filigree interwoven with rich obsidian brushwork.'
  },
  {
    id: 'art-3',
    title: 'Nocturne in Cyber Pink',
    category: 'Concept Art',
    year: '2025',
    medium: 'Stylized Digital Painting',
    dimensions: '4200 × 4200 px',
    image: 'img/front3.jpeg',
    featured: true,
    description: 'Echoing the quiet moments before dawn in a neon-drenched metropolis. Light cuts through mist like laser silk.'
  },
  {
    id: 'art-4',
    title: 'The Silent Oracle',
    category: 'Surrealism',
    year: '2025',
    medium: 'Digital Impasto & Shader Art',
    dimensions: '3600 × 4500 px',
    image: 'img/front4.jpeg',
    featured: true,
    description: 'A spectral guardian possessing timeless foresight, cloaked in shifting folds of radiant amethyst.'
  },
  {
    id: 'art-5',
    title: 'Ephemeral Sovereign',
    category: 'Portraits',
    year: '2026',
    medium: 'High-Res Digital Canvas',
    dimensions: '4096 × 5120 px',
    image: 'img/front5.jpeg',
    featured: false,
    description: 'Intimate portrait exploring inner emotional strength against the turbulence of digital noise.'
  },
  {
    id: 'art-6',
    title: 'Vertical Horizons',
    category: 'Abstract',
    year: '2025',
    medium: 'Generative Synthesis & Manual Overpainting',
    dimensions: '2800 × 6000 px',
    image: 'img/front6.jpeg',
    featured: false,
    description: 'A monumental vertical tapestry celebrating ascension, celestial architecture, and cascading neon hues.'
  },
  {
    id: 'art-7',
    title: 'Astral Echoes I',
    category: 'Digital Canvas',
    year: '2026',
    medium: 'Digital Acrylics',
    dimensions: '3500 × 3800 px',
    image: 'img/pic1.jpeg',
    featured: false,
    description: 'Fluid harmonics captured in time; brushstrokes mimic the swirling magnetic storms of distant pulsars.'
  },
  {
    id: 'art-8',
    title: 'Gilded Illusion',
    category: 'Portraits',
    year: '2025',
    medium: 'Digital Leaf & Glaze',
    dimensions: '3600 × 4000 px',
    image: 'img/pic2.jpeg',
    featured: false,
    description: 'Reflective gold-leaf textures juxtaposed against moody violet undertones in a tribute to Viennese modernism.'
  },
  {
    id: 'art-9',
    title: 'Whispering Mirage',
    category: 'Surrealism',
    year: '2026',
    medium: 'Digital Mixed Media',
    dimensions: '3700 × 3700 px',
    image: 'img/pic3.jpeg',
    featured: false,
    description: 'The illusion of memory as a shifting liquid mirror, suspended between reality and dream.'
  },
  {
    id: 'art-10',
    title: 'Cosmic Chrysalis',
    category: 'Abstract',
    year: '2025',
    medium: 'Procedural Texture & Brushwork',
    dimensions: '4000 × 4000 px',
    image: 'img/pic4.jpeg',
    featured: false,
    description: 'The moment of rebirth, bursting outward in radiant ribbons of neon fuchsia and electric indigo.'
  },
  {
    id: 'art-11',
    title: 'Velvet Requiem',
    category: 'Concept Art',
    year: '2026',
    medium: 'Cinematic Digital Art',
    dimensions: '3800 × 4200 px',
    image: 'img/pic5.jpeg',
    featured: false,
    description: 'A quiet eulogy for an imagined future civilization, composed in deep jewel tones and velvety shadows.'
  },
  {
    id: 'art-12',
    title: 'Prismatic Solitude',
    category: 'Portraits',
    year: '2025',
    medium: 'Digital Impasto',
    dimensions: '3600 × 4000 px',
    image: 'img/pic6.jpeg',
    featured: false,
    description: 'Deep psychological study of solace in solitude, accented by subtle neon rim lights.'
  },
  {
    id: 'art-13',
    title: 'Cyber Lotus',
    category: 'Surrealism',
    year: '2026',
    medium: 'Digital Glaze & Light Pen',
    dimensions: '3900 × 4500 px',
    image: 'img/pic7.jpeg',
    featured: false,
    description: 'Biomechanical flora blooming under artificial twilight, glowing with self-generated luminescence.'
  },
  {
    id: 'art-14',
    title: 'Synapse Bloom',
    category: 'Abstract',
    year: '2026',
    medium: 'Digital Abstract Expressionism',
    dimensions: '4000 × 4000 px',
    image: 'img/pic8.jpeg',
    featured: false,
    description: 'Visualizing neural fireworks and creative euphoria through bold, gestural digital strokes.'
  },
  {
    id: 'art-15',
    title: 'Obsidian Wings',
    category: 'Concept Art',
    year: '2025',
    medium: 'Digital Matte & Airbrush',
    dimensions: '4000 × 4000 px',
    image: 'img/pic9.jpeg',
    featured: false,
    description: 'A mythic entity emerging from deep space nebulae, wings glistening with stardust.'
  },
  {
    id: 'art-16',
    title: 'Luminescent Dreamer',
    category: 'Digital Canvas',
    year: '2026',
    medium: 'Digital Watercolor & Ink',
    dimensions: '4000 × 4000 px',
    image: 'img/pic10.jpeg',
    featured: false,
    description: 'Ethereal wash of pink and purple watercolors bleeding softly across textured digital paper.'
  },
  {
    id: 'art-17',
    title: 'Starlight Sentinel',
    category: 'Concept Art',
    year: '2025',
    medium: 'Digital Painting',
    dimensions: '4000 × 4000 px',
    image: 'img/pic11.jpeg',
    featured: false,
    description: 'Guardian of the void, holding watch over forgotten celestial gateways.'
  },
  {
    id: 'art-18',
    title: 'Aurora Genesis',
    category: 'Abstract',
    year: '2026',
    medium: 'Vector & Digital Paint',
    dimensions: '3200 × 3200 px',
    image: 'img/pic12.jpeg',
    featured: false,
    description: 'The birth of color from absolute blackness; harmonic waves of ultraviolet and hot pink.'
  }
];

const DEFAULT_AUTH = {
  username: 'artist',
  password: 'artpass2026',
  secretKey: 'art-auth-token-valid'
};

const STORAGE_KEYS = {
  PROFILE: 'art_portfolio_profile',
  ARTWORKS: 'art_portfolio_artworks',
  THEME: 'art_portfolio_theme',
  CUSTOM_THEME: 'art_portfolio_custom_theme',
  AUTH: 'art_portfolio_auth_creds',
  ACTIVE_SESSION: 'art_portfolio_session'
};

class ArtStore {
  static getProfile() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROFILE);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return { ...ARTIST_PRESETS['artist-aria'] };
  }

  static saveProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    window.dispatchEvent(new CustomEvent('art:profile-updated', { detail: profile }));
  }

  static getArtworks() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ARTWORKS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Storage read error:', e);
    }
    return [...DEFAULT_ARTWORKS];
  }

  static saveArtworks(artworks) {
    localStorage.setItem(STORAGE_KEYS.ARTWORKS, JSON.stringify(artworks));
    window.dispatchEvent(new CustomEvent('art:artworks-updated', { detail: artworks }));
  }

  static getActiveThemeId() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'neon-noir';
  }

  static setActiveThemeId(themeId) {
    localStorage.setItem(STORAGE_KEYS.THEME, themeId);
    window.dispatchEvent(new CustomEvent('art:theme-updated', { detail: themeId }));
  }

  static getTheme(themeId) {
    const id = themeId || this.getActiveThemeId();
    if (THEMES[id]) return THEMES[id];
    // Check if custom theme
    try {
      const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_THEME);
      if (custom) return JSON.parse(custom);
    } catch (e) {}
    return THEMES['neon-noir'];
  }

  static saveCustomTheme(customTheme) {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_THEME, JSON.stringify(customTheme));
    this.setActiveThemeId('custom');
  }

  static getAuthCredentials() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.AUTH);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return { ...DEFAULT_AUTH };
  }

  static saveAuthCredentials(creds) {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(creds));
  }

  static isAuthenticated() {
    return sessionStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION) === 'true';
  }

  static setAuthenticated(state) {
    if (state) {
      sessionStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, 'true');
    } else {
      sessionStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
    }
    window.dispatchEvent(new CustomEvent('art:auth-changed', { detail: state }));
  }

  static resetToDefault() {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.ARTWORKS);
    localStorage.removeItem(STORAGE_KEYS.THEME);
    localStorage.removeItem(STORAGE_KEYS.CUSTOM_THEME);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    window.location.reload();
  }

  static exportFullBackup() {
    const backup = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile: this.getProfile(),
      artworks: this.getArtworks(),
      theme: this.getActiveThemeId()
    };
    return JSON.stringify(backup, null, 2);
  }

  static importFullBackup(jsonString) {
    try {
      const data = JSON.parse(jsonString);
      if (data.profile) this.saveProfile(data.profile);
      if (data.artworks && Array.isArray(data.artworks)) this.saveArtworks(data.artworks);
      if (data.theme) this.setActiveThemeId(data.theme);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  static switchPreset(presetKey) {
    if (ARTIST_PRESETS[presetKey]) {
      const profile = { ...ARTIST_PRESETS[presetKey] };
      this.saveProfile(profile);
      this.setActiveThemeId(profile.theme || 'neon-noir');
      return true;
    }
    return false;
  }
}

// Make globally accessible
window.LOCAL_IMAGES = LOCAL_IMAGES;
window.THEMES = THEMES;
window.ARTIST_PRESETS = ARTIST_PRESETS;
window.ArtStore = ArtStore;
