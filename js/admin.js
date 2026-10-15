/**
 * Hidden Authentication & Artist Control Panel Controller
 * Enables artists to customize their name, photos, themes, stats, and artworks.
 */

class ArtAdminController {
  constructor() {
    this.authModal = document.getElementById('auth-modal');
    this.adminDrawer = document.getElementById('admin-drawer');
    this.currentTab = 'profile';
    this.selectedAvatarPath = '';
    this.selectedHeroCoverPath = '';
    
    this.init();
  }

  init() {
    this.setupAuthHandlers();
    this.setupAdminTabs();
    this.setupThemePickers();
    this.setupImagePickers();
    this.setupPresetSelector();
    this.setupDataBackup();
    this.setupArtworkForm();
  }

  openAuthModal() {
    if (this.authModal) {
      this.authModal.classList.add('active');
      document.body.style.overflow = 'hidden';
      const input = document.getElementById('auth-username');
      if (input) setTimeout(() => input.focus(), 150);
    }
  }

  closeAuthModal() {
    if (this.authModal) {
      this.authModal.classList.remove('active');
      document.body.style.overflow = '';
      const err = document.getElementById('auth-error-msg');
      if (err) err.style.display = 'none';
    }
  }

  openPanel() {
    this.closeAuthModal();
    if (this.adminDrawer) {
      this.adminDrawer.classList.add('active');
      document.body.style.overflow = 'hidden';
      this.loadProfileIntoForm();
      this.renderArtworkManagerList();
      this.highlightActiveTheme();
    }
  }

  closePanel() {
    if (this.adminDrawer) {
      this.adminDrawer.classList.remove('active');
      document.body.style.overflow = '';
      if (window.location.hash.toLowerCase() === '#admin') {
        history.replaceState(null, null, ' ');
      }
    }
  }

  setupAuthHandlers() {
    const authForm = document.getElementById('admin-login-form');
    if (authForm) {
      authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('auth-username').value.trim();
        const password = document.getElementById('auth-password').value.trim();
        const creds = ArtStore.getAuthCredentials();

        // Support both "artist" or "admin" with default password
        const isUserValid = (username === creds.username || username === 'admin' || username === 'artist');
        const isPassValid = (password === creds.password || password === 'artpass2026' || password === 'admin123');

        if (isUserValid && isPassValid) {
          ArtStore.setAuthenticated(true);
          authForm.reset();
          this.openPanel();
        } else {
          const err = document.getElementById('auth-error-msg');
          if (err) {
            err.textContent = 'Invalid credentials. Hint: artist / artpass2026';
            err.style.display = 'block';
          }
        }
      });
    }

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        ArtStore.setAuthenticated(false);
        this.closePanel();
        alert('You have logged out from the Artist Control Panel.');
      });
    }

    const closeAuthBtn = document.getElementById('close-auth-modal-btn');
    if (closeAuthBtn) {
      closeAuthBtn.addEventListener('click', () => this.closeAuthModal());
    }

    const closePanelBtn = document.getElementById('close-admin-panel-btn');
    if (closePanelBtn) {
      closePanelBtn.addEventListener('click', () => this.closePanel());
    }
  }

  setupAdminTabs() {
    const tabs = document.querySelectorAll('.admin-nav-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        e.currentTarget.classList.add('active');
        const targetSection = e.currentTarget.getAttribute('data-tab');
        
        document.querySelectorAll('.admin-section-pane').forEach(pane => {
          pane.classList.remove('active');
        });
        const activePane = document.getElementById(`pane-${targetSection}`);
        if (activePane) activePane.classList.add('active');
      });
    });
  }

  loadProfileIntoForm() {
    const profile = ArtStore.getProfile();
    if (!profile) return;

    // Profile fields
    document.getElementById('edit-artist-name').value = profile.name || '';
    document.getElementById('edit-artist-title').value = profile.title || '';
    document.getElementById('edit-artist-tagline').value = profile.tagline || '';
    document.getElementById('edit-artist-bio').value = profile.bio || '';
    document.getElementById('edit-artist-location').value = profile.location || '';
    document.getElementById('edit-artist-email').value = profile.email || '';
    document.getElementById('edit-artist-phone').value = profile.phone || '';
    document.getElementById('edit-artist-status-badge').value = profile.statusBadge || '';
    document.getElementById('edit-artist-status-active').checked = profile.statusActive !== false;

    // Stats
    document.getElementById('edit-stat-exp').value = profile.yearsExperience || 8;
    document.getElementById('edit-stat-artworks').value = profile.artworksCount || 100;
    document.getElementById('edit-stat-exhibitions').value = profile.exhibitionsCount || 15;
    document.getElementById('edit-stat-awards').value = profile.awardsCount || 5;

    // Avatar & Cover
    this.selectedAvatarPath = profile.avatar || 'img/front1.jpeg';
    this.selectedHeroCoverPath = profile.heroCover || 'img/front2.jpeg';
    document.getElementById('avatar-preview-img').src = this.selectedAvatarPath;
    document.getElementById('cover-preview-img').src = this.selectedHeroCoverPath;

    // Select corresponding thumb in picker
    this.highlightSelectedThumb('avatar-picker-grid', this.selectedAvatarPath);
    this.highlightSelectedThumb('cover-picker-grid', this.selectedHeroCoverPath);
  }

  setupImagePickers() {
    const avatarGrid = document.getElementById('avatar-picker-grid');
    const coverGrid = document.getElementById('cover-picker-grid');
    const artworkThumbGrid = document.getElementById('new-art-picker-grid');

    const renderThumbs = (container, onSelect) => {
      if (!container) return;
      container.innerHTML = LOCAL_IMAGES.map(img => `
        <img 
          src="${img.path}" 
          alt="${img.label}" 
          class="image-picker-thumb" 
          data-path="${img.path}"
          title="${img.label} (${img.path})"
        />
      `).join('');

      container.querySelectorAll('.image-picker-thumb').forEach(thumb => {
        thumb.addEventListener('click', (e) => {
          container.querySelectorAll('.image-picker-thumb').forEach(t => t.classList.remove('selected'));
          e.currentTarget.classList.add('selected');
          onSelect(e.currentTarget.getAttribute('data-path'));
        });
      });
    };

    // Render for Avatar
    renderThumbs(avatarGrid, (path) => {
      this.selectedAvatarPath = path;
      document.getElementById('avatar-preview-img').src = path;
    });

    // Render for Hero Cover
    renderThumbs(coverGrid, (path) => {
      this.selectedHeroCoverPath = path;
      document.getElementById('cover-preview-img').src = path;
    });

    // Render for New Artwork Modal
    renderThumbs(artworkThumbGrid, (path) => {
      document.getElementById('new-art-img-path').value = path;
      document.getElementById('new-art-preview-img').src = path;
    });

    // File Upload Handler (FileReader to Data URL for instant custom artist photos!)
    const avatarUpload = document.getElementById('avatar-file-upload');
    if (avatarUpload) {
      avatarUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.selectedAvatarPath = event.target.result;
            document.getElementById('avatar-preview-img').src = this.selectedAvatarPath;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Cover File Upload Handler
    const coverUpload = document.getElementById('cover-file-upload');
    if (coverUpload) {
      coverUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            this.selectedHeroCoverPath = event.target.result;
            document.getElementById('cover-preview-img').src = this.selectedHeroCoverPath;
          };
          reader.readAsDataURL(file);
        }
      });
    }

    // Save Profile button listener
    const saveProfileBtn = document.getElementById('save-profile-btn');
    if (saveProfileBtn) {
      saveProfileBtn.addEventListener('click', () => this.saveProfileFromForm());
    }
  }

  highlightSelectedThumb(gridId, path) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.querySelectorAll('.image-picker-thumb').forEach(thumb => {
      if (thumb.getAttribute('data-path') === path) {
        thumb.classList.add('selected');
      } else {
        thumb.classList.remove('selected');
      }
    });
  }

  saveProfileFromForm() {
    const profile = ArtStore.getProfile();

    profile.name = document.getElementById('edit-artist-name').value.trim() || 'Artist';
    profile.title = document.getElementById('edit-artist-title').value.trim();
    profile.tagline = document.getElementById('edit-artist-tagline').value.trim();
    profile.bio = document.getElementById('edit-artist-bio').value.trim();
    profile.location = document.getElementById('edit-artist-location').value.trim();
    profile.email = document.getElementById('edit-artist-email').value.trim();
    profile.phone = document.getElementById('edit-artist-phone').value.trim();
    profile.statusBadge = document.getElementById('edit-artist-status-badge').value.trim();
    profile.statusActive = document.getElementById('edit-artist-status-active').checked;

    profile.yearsExperience = parseInt(document.getElementById('edit-stat-exp').value, 10) || 0;
    profile.artworksCount = parseInt(document.getElementById('edit-stat-artworks').value, 10) || 0;
    profile.exhibitionsCount = parseInt(document.getElementById('edit-stat-exhibitions').value, 10) || 0;
    profile.awardsCount = parseInt(document.getElementById('edit-stat-awards').value, 10) || 0;

    profile.avatar = this.selectedAvatarPath;
    profile.heroCover = this.selectedHeroCoverPath;

    ArtStore.saveProfile(profile);

    // Visual feedback
    const btn = document.getElementById('save-profile-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="check"></i> Profile Saved Live!';
    btn.style.background = '#10b981';
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
      if (window.lucide) window.lucide.createIcons();
    }, 2000);
  }

  setupThemePickers() {
    const container = document.getElementById('theme-cards-container');
    if (!container) return;

    container.innerHTML = Object.values(THEMES).map(theme => `
      <div class="theme-card-option" data-theme-id="${theme.id}">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h4 style="font-family: var(--font-heading); color: var(--text-primary); font-size: 1.05rem;">${theme.name}</h4>
          <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--primary); font-family: var(--font-mono);">
            ${theme.id === 'neon-noir' ? '★ Primary Pink/Purple' : 'Curated'}
          </span>
        </div>
        <p style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 0.35rem;">${theme.description}</p>
        <div class="theme-swatches">
          <span class="theme-swatch-circle" style="background: ${theme.colors.primary}; box-shadow: 0 0 10px ${theme.colors.primary};"></span>
          <span class="theme-swatch-circle" style="background: ${theme.colors.secondary}; box-shadow: 0 0 10px ${theme.colors.secondary};"></span>
          <span class="theme-swatch-circle" style="background: ${theme.colors.bgCard};"></span>
          <span class="theme-swatch-circle" style="background: ${theme.colors.bgDark};"></span>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.theme-card-option').forEach(card => {
      card.addEventListener('click', (e) => {
        const themeId = e.currentTarget.getAttribute('data-theme-id');
        ArtStore.setActiveThemeId(themeId);
        this.highlightActiveTheme();
      });
    });

    // Custom Palette pickers
    const applyCustomThemeBtn = document.getElementById('apply-custom-theme-btn');
    if (applyCustomThemeBtn) {
      applyCustomThemeBtn.addEventListener('click', () => {
        const primaryColor = document.getElementById('custom-primary-color').value;
        const secondaryColor = document.getElementById('custom-secondary-color').value;
        const bgDarkColor = document.getElementById('custom-bg-color').value;

        const customTheme = {
          id: 'custom',
          name: 'Custom Artist Palette',
          description: 'Artist customized color synergy',
          colors: {
            primary: primaryColor,
            primaryGlow: `${primaryColor}66`,
            secondary: secondaryColor,
            secondaryGlow: `${secondaryColor}66`,
            accent: primaryColor,
            bgDark: bgDarkColor,
            bgMedium: bgDarkColor,
            bgCard: 'rgba(23, 11, 40, 0.75)',
            bgCardHover: 'rgba(35, 17, 60, 0.9)',
            textPrimary: '#ffffff',
            textSecondary: '#d1c4e9',
            borderColor: `${primaryColor}44`,
            borderHover: `${secondaryColor}99`,
            navBg: `${bgDarkColor}dd`,
            gradient: `linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%)`
          }
        };

        ArtStore.saveCustomTheme(customTheme);
        this.highlightActiveTheme();
      });
    }

    // Animator Style Selector
    const animSelect = document.getElementById('animator-style-select');
    if (animSelect) {
      animSelect.addEventListener('change', (e) => {
        const profile = ArtStore.getProfile();
        profile.animatorStyle = e.target.value;
        ArtStore.saveProfile(profile);
      });
    }
  }

  highlightActiveTheme() {
    const activeId = ArtStore.getActiveThemeId();
    document.querySelectorAll('.theme-card-option').forEach(card => {
      if (card.getAttribute('data-theme-id') === activeId) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  setupPresetSelector() {
    const presetSelect = document.getElementById('artist-preset-select');
    if (presetSelect) {
      presetSelect.addEventListener('change', (e) => {
        const key = e.target.value;
        if (key && ARTIST_PRESETS[key]) {
          if (confirm(`Switch to artist profile: "${ARTIST_PRESETS[key].name}"? This will load their custom details, photos, and theme.`)) {
            ArtStore.switchPreset(key);
            this.loadProfileIntoForm();
            this.highlightActiveTheme();
          }
        }
      });
    }
  }

  renderArtworkManagerList() {
    const container = document.getElementById('artwork-admin-list');
    if (!container) return;

    const artworks = ArtStore.getArtworks();
    container.innerHTML = artworks.map((art, index) => `
      <div class="artwork-admin-card" data-id="${art.id}">
        <img src="${art.image}" alt="${art.title}" class="artwork-admin-thumb" />
        <div>
          <h4 style="font-family: var(--font-heading); color: var(--text-primary); font-size: 1rem;">${art.title}</h4>
          <span style="font-size: 0.8rem; color: var(--text-muted);">${art.medium} (${art.year})</span>
        </div>
        <div>
          <span class="art-category" style="font-size: 0.75rem;">${art.category}</span>
        </div>
        <div>
          <label style="font-size: 0.8rem; display: flex; align-items: center; gap: 0.4rem; color: var(--text-secondary);">
            <input type="checkbox" ${art.featured ? 'checked' : ''} onchange="artAdmin.toggleArtworkFeatured(${index}, this.checked)" />
            Featured
          </label>
        </div>
        <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
          <button class="btn btn-outline" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;" onclick="artAdmin.deleteArtwork(${index})">
            <i data-lucide="trash-2" style="width: 14px; height: 14px; color: #f43f5e;"></i>
          </button>
        </div>
      </div>
    `).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  toggleArtworkFeatured(index, isFeatured) {
    const artworks = ArtStore.getArtworks();
    if (artworks[index]) {
      artworks[index].featured = isFeatured;
      ArtStore.saveArtworks(artworks);
    }
  }

  deleteArtwork(index) {
    const artworks = ArtStore.getArtworks();
    if (artworks[index] && confirm(`Delete artwork "${artworks[index].title}"?`)) {
      artworks.splice(index, 1);
      ArtStore.saveArtworks(artworks);
      this.renderArtworkManagerList();
    }
  }

  setupArtworkForm() {
    const form = document.getElementById('add-artwork-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('new-art-title').value.trim();
        const category = document.getElementById('new-art-category').value;
        const year = document.getElementById('new-art-year').value.trim() || new Date().getFullYear().toString();
        const medium = document.getElementById('new-art-medium').value.trim() || 'Digital Art';
        const dimensions = document.getElementById('new-art-dimensions').value.trim() || '4000 × 4000 px';
        const image = document.getElementById('new-art-img-path').value || 'img/front1.jpeg';
        const description = document.getElementById('new-art-desc').value.trim();
        const featured = document.getElementById('new-art-featured').checked;

        const newArtwork = {
          id: `art-${Date.now()}`,
          title,
          category,
          year,
          medium,
          dimensions,
          image,
          description,
          featured
        };

        const artworks = ArtStore.getArtworks();
        artworks.unshift(newArtwork);
        ArtStore.saveArtworks(artworks);

        form.reset();
        this.renderArtworkManagerList();
        alert(`Artwork "${title}" successfully added to the portfolio!`);
      });
    }

    // Custom upload for artwork image
    const artUpload = document.getElementById('new-art-file-upload');
    if (artUpload) {
      artUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const dataUrl = event.target.result;
            document.getElementById('new-art-img-path').value = dataUrl;
            document.getElementById('new-art-preview-img').src = dataUrl;
          };
          reader.readAsDataURL(file);
        }
      });
    }
  }

  setupDataBackup() {
    // Export JSON
    const exportBtn = document.getElementById('export-backup-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const json = ArtStore.exportFullBackup();
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const profile = ArtStore.getProfile();
        a.download = `${profile.name.toLowerCase().replace(/\s+/g, '_')}_portfolio_backup.json`;
        a.click();
        URL.revokeObjectURL(url);
      });
    }

    // Import JSON
    const importInput = document.getElementById('import-backup-input');
    if (importInput) {
      importInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const res = ArtStore.importFullBackup(event.target.result);
            if (res.success) {
              alert('Profile successfully imported! Refreshing view...');
              window.location.reload();
            } else {
              alert('Error importing JSON: ' + res.error);
            }
          };
          reader.readAsText(file);
        }
      });
    }

    // Reset Defaults
    const resetBtn = document.getElementById('reset-defaults-btn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all profile details and themes to initial factory defaults?')) {
          ArtStore.resetToDefault();
        }
      });
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  window.artAdmin = new ArtAdminController();
});
