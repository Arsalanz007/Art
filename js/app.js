/**
 * Main Art Showcase Application Controller
 * Handles live profile binding, gallery rendering, dynamic filtering, lightbox, and theme application.
 */

document.addEventListener('DOMContentLoaded', () => {
  const app = new ArtPortfolioApp();
  window.artApp = app;
});

class ArtPortfolioApp {
  constructor() {
    this.animator = new WebAnimator();
    this.currentFilter = 'all';
    this.activeLightboxIndex = 0;
    this.filteredArtworks = [];
    
    this.init();
  }

  init() {
    this.applyTheme(ArtStore.getActiveThemeId());
    this.renderProfile();
    this.renderGallery();
    this.setupEventListeners();
    this.checkUrlForAdmin();
    
    // Lucide icon replacement
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Trigger GSAP entrance
    setTimeout(() => {
      this.animator.animateEntrance();
      this.animator.initCardTilt();
    }, 100);

    // Subscribe to store updates
    window.addEventListener('art:profile-updated', () => this.renderProfile());
    window.addEventListener('art:artworks-updated', () => this.renderGallery());
    window.addEventListener('art:theme-updated', (e) => this.applyTheme(e.detail));
  }

  applyTheme(themeId) {
    const theme = ArtStore.getTheme(themeId);
    if (!theme || !theme.colors) return;

    const root = document.documentElement;
    const colors = theme.colors;

    root.style.setProperty('--primary', colors.primary);
    root.style.setProperty('--primary-glow', colors.primaryGlow || 'rgba(255, 42, 133, 0.45)');
    root.style.setProperty('--secondary', colors.secondary);
    root.style.setProperty('--secondary-glow', colors.secondaryGlow || 'rgba(157, 78, 221, 0.45)');
    root.style.setProperty('--accent', colors.accent || colors.primary);
    root.style.setProperty('--bg-dark', colors.bgDark);
    root.style.setProperty('--bg-medium', colors.bgMedium || colors.bgDark);
    root.style.setProperty('--bg-card', colors.bgCard);
    root.style.setProperty('--bg-card-hover', colors.bgCardHover);
    root.style.setProperty('--text-primary', colors.textPrimary || '#fcf8ff');
    root.style.setProperty('--text-secondary', colors.textSecondary || '#b7a8d0');
    root.style.setProperty('--border-subtle', colors.borderColor);
    root.style.setProperty('--border-hover', colors.borderHover);
    root.style.setProperty('--nav-bg', colors.navBg);
    root.style.setProperty('--gradient-primary', colors.gradient);
    
    // Update animator canvas colors
    if (this.animator) {
      const profile = ArtStore.getProfile();
      this.animator.setThemeColors(colors, profile.animatorStyle || 'cosmic');
    }

    // Update mini theme dropdown if present
    const miniSelect = document.getElementById('mini-theme-select');
    if (miniSelect) miniSelect.value = themeId;
  }

  renderProfile() {
    const profile = ArtStore.getProfile();
    if (!profile) return;

    // Document title
    document.title = `${profile.name} — Contemporary Art Portfolio`;

    // Navbar Brand
    const navName = document.getElementById('nav-artist-name');
    const navRole = document.getElementById('nav-artist-role');
    const navAvatar = document.getElementById('nav-artist-avatar');
    if (navName) navName.textContent = profile.name;
    if (navRole) navRole.textContent = profile.title;
    if (navAvatar) navAvatar.src = profile.avatar;

    // Hero Section
    const heroName = document.getElementById('hero-artist-name');
    const heroTagline = document.getElementById('hero-tagline');
    const heroBio = document.getElementById('hero-bio');
    const heroCover = document.getElementById('hero-cover-img');
    const heroStatus = document.getElementById('hero-status-badge');
    const heroFeaturedTitle = document.getElementById('hero-featured-title');

    if (heroName) heroName.textContent = profile.name;
    if (heroTagline) heroTagline.textContent = profile.tagline;
    if (heroBio) heroBio.textContent = profile.bio;
    if (heroCover) heroCover.src = profile.heroCover || profile.avatar;
    if (heroStatus) {
      heroStatus.innerHTML = `<span class="pulse-dot"></span> ${profile.statusBadge || 'Available for Inquiries'}`;
      heroStatus.style.display = profile.statusActive !== false ? 'inline-flex' : 'none';
    }
    if (heroFeaturedTitle) {
      heroFeaturedTitle.textContent = `${profile.name} — Featured Opus`;
    }

    // Statistics
    const statExp = document.getElementById('stat-years-exp');
    const statArt = document.getElementById('stat-artworks');
    const statExh = document.getElementById('stat-exhibitions');
    const statAwd = document.getElementById('stat-awards');

    if (statExp) {
      statExp.textContent = profile.yearsExperience;
      statExp.setAttribute('data-target', profile.yearsExperience);
    }
    if (statArt) {
      statArt.textContent = profile.artworksCount;
      statArt.setAttribute('data-target', profile.artworksCount);
    }
    if (statExh) {
      statExh.textContent = profile.exhibitionsCount;
      statExh.setAttribute('data-target', profile.exhibitionsCount);
    }
    if (statAwd) {
      statAwd.textContent = profile.awardsCount;
      statAwd.setAttribute('data-target', profile.awardsCount);
    }

    // About Section
    const aboutPortrait = document.getElementById('about-portrait-img');
    const aboutName = document.getElementById('about-name');
    const aboutBio = document.getElementById('about-full-bio');
    const aboutExpYears = document.getElementById('about-exp-years');
    const aboutLocation = document.getElementById('about-location');
    const aboutEmail = document.getElementById('about-email');

    if (aboutPortrait) aboutPortrait.src = profile.avatar;
    if (aboutName) aboutName.textContent = profile.name;
    if (aboutBio) aboutBio.textContent = profile.bio;
    if (aboutExpYears) aboutExpYears.textContent = `${profile.yearsExperience}+`;
    if (aboutLocation) aboutLocation.textContent = profile.location;
    if (aboutEmail) aboutEmail.textContent = profile.email;

    // Contact section & Footer
    const contactEmail = document.getElementById('contact-artist-email');
    const footerCopyright = document.getElementById('footer-copyright');
    if (contactEmail) contactEmail.href = `mailto:${profile.email}`;
    if (footerCopyright) {
      footerCopyright.textContent = `© ${new Date().getFullYear()} ${profile.name}. All visual works protected by copyright.`;
    }

    // Refresh icons
    if (window.lucide) window.lucide.createIcons();
  }

  renderGallery() {
    const artworks = ArtStore.getArtworks();
    const grid = document.getElementById('artwork-grid');
    if (!grid) return;

    if (this.currentFilter === 'all') {
      this.filteredArtworks = artworks;
    } else {
      this.filteredArtworks = artworks.filter(art => 
        art.category.toLowerCase().replace(/\s+/g, '-') === this.currentFilter.toLowerCase()
      );
    }

    grid.innerHTML = this.filteredArtworks.map((art, index) => `
      <article class="art-card tilt-effect" data-index="${index}" onclick="artApp.openLightbox(${index})">
        <div class="card-glare"></div>
        <div class="art-thumbnail-wrap">
          <img src="${art.image}" alt="${art.title}" class="art-thumbnail" loading="lazy" />
          <span class="art-card-badge">${art.year}</span>
          <div class="art-card-overlay">
            <span class="btn btn-outline" style="padding: 0.5rem 1.2rem; font-size: 0.85rem;">
              <i data-lucide="expand" style="width: 16px; height: 16px;"></i> Inspect Opus
            </span>
          </div>
        </div>
        <div class="art-card-info">
          <div>
            <div class="art-meta-row">
              <span class="art-category">${art.category}</span>
              <span class="art-year">${art.dimensions || ''}</span>
            </div>
            <h3 class="art-title">${art.title}</h3>
            <p class="art-medium">${art.medium}</p>
          </div>
          <div class="art-view-btn">
            <span>Explore Details</span>
            <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
          </div>
        </div>
      </article>
    `).join('');

    if (this.animator) {
      this.animator.initCardTilt();
    }
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  setupEventListeners() {
    // Gallery Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.currentTarget.classList.add('active');
        this.currentFilter = e.currentTarget.getAttribute('data-filter') || 'all';
        this.renderGallery();
      });
    });

    // Lightbox modal keyboard navigation
    window.addEventListener('keydown', (e) => {
      const modal = document.getElementById('lightbox-modal');
      if (!modal || !modal.classList.contains('active')) return;

      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowRight') this.navigateLightbox(1);
      if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
    });

    // Hidden Admin Trigger via keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        this.triggerHiddenAuth();
      }
    });

    // Mini theme dropdown quick switch
    const miniSelect = document.getElementById('mini-theme-select');
    if (miniSelect) {
      miniSelect.addEventListener('change', (e) => {
        ArtStore.setActiveThemeId(e.target.value);
      });
    }

    // Commission Form
    const commForm = document.getElementById('commission-form');
    if (commForm) {
      commForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your commission inquiry! The artist will review your concept and reply shortly.');
        commForm.reset();
      });
    }
  }

  openLightbox(index) {
    if (!this.filteredArtworks[index]) return;
    this.activeLightboxIndex = index;
    const art = this.filteredArtworks[index];
    const modal = document.getElementById('lightbox-modal');
    if (!modal) return;

    document.getElementById('lightbox-img').src = art.image;
    document.getElementById('lightbox-title').textContent = art.title;
    document.getElementById('lightbox-category').textContent = art.category;
    document.getElementById('lightbox-year').textContent = art.year;
    document.getElementById('lightbox-medium').textContent = art.medium;
    document.getElementById('lightbox-dimensions').textContent = art.dimensions || 'Archival Edition';
    document.getElementById('lightbox-desc').textContent = art.description || 'Exclusive artistic composition crafted with deliberate aesthetic balance.';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  }

  closeLightbox() {
    const modal = document.getElementById('lightbox-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  navigateLightbox(direction) {
    const total = this.filteredArtworks.length;
    if (total <= 1) return;
    this.activeLightboxIndex = (this.activeLightboxIndex + direction + total) % total;
    this.openLightbox(this.activeLightboxIndex);
  }

  triggerHiddenAuth() {
    if (ArtStore.isAuthenticated()) {
      window.artAdmin?.openPanel();
    } else {
      window.artAdmin?.openAuthModal();
    }
  }

  checkUrlForAdmin() {
    // Check if #admin or ?admin=true is present in URL
    const hash = window.location.hash.toLowerCase();
    const params = new URLSearchParams(window.location.search);
    const hasAdminParam = params.has('admin') || params.has('panel');

    if (hash === '#admin' || hash === '#control' || hasAdminParam) {
      setTimeout(() => {
        this.triggerHiddenAuth();
      }, 300);
    }

    // Listen for hash changes
    window.addEventListener('hashchange', () => {
      if (window.location.hash.toLowerCase() === '#admin') {
        this.triggerHiddenAuth();
      }
    });
  }
}
