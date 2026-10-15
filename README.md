# Personalized Artist Portfolio & Interactive Atelier

A modern, high-performance, personalized art portfolio featuring an interactive web animator, dynamic theme engine (with primary **Pink, Purple & Black** neon combination), and a **hidden authentication control panel** for multiple artists to customize their identity, artwork, and profile pictures on the fly.

---

## 🌟 Key Features

### 1. Web Animator ("Living Canvas" & GSAP Motion)
- **Interactive Particle Nebulae**: HTML5 Canvas rendering glowing neon cosmic particles, constellation nodes, and radiant nebulae that react in real-time to pointer movement and gravitational physics.
- **Dynamic 3D Tilt**: Interactive perspective tilt and luminous specular glare on art cards following mouse coordinates.
- **GSAP & ScrollTrigger Animations**: Staggered gallery entrances, glowing counter statistics, and magnetic hover effects.

### 2. Primary Color Theme: Pink, Purple & Black
- **Default Theme**: **Neon Velvet**
  - **Pitch Black Background**: `#08040c`
  - **Glowing Hot Pink**: `#ff2a85`
  - **Electric Royal Purple**: `#9d4edd`
  - **Deep Velvet Glassmorphic Cards**: `rgba(23, 11, 40, 0.65)` with backdrop blur and luminous glowing borders.
- **Additional Intelligent Themes**:
  - **Cyberpunk Aurora**: Pitch Black, Vivid Hot Magenta, Cyan & Deep Violet.
  - **Amethyst & Royal Gold**: Velvet Midnight Purple & Radiant Champagne Gold.
  - **Sakura Noir**: Ink Black, Ethereal Petal Pink & Smoky Lavender.
  - **Gallery Minimalist Noir**: Deep Charcoal, Silver Mist & Delicate Blush.
  - **Custom Palette Generator**: Interactive color pickers for custom artist primary, secondary, and background colors.

### 3. Hidden Authentication & Control Panel
Artists can open the secret management form via any of the following hidden triggers:

1. **Secret URL Hash**:
   ```
   http://localhost:8080/index.html#admin
   ```
2. **Secret URL Query Parameter**:
   ```
   http://localhost:8080/index.html?admin=true
   ```
3. **Dedicated Admin Dashboard URL**:
   ```
   http://localhost:8080/admin.html
   ```
4. **Keyboard Shortcut**: Press `Ctrl + Shift + A` (or `Cmd + Shift + A` on Mac) anywhere on the website.
5. **Footer Lock Icon**: Click the discreet lock icon labeled **"Artist Portal"** in the website footer.

#### 🔑 Static Login Credentials
- **Username**: `artist` *(or `admin`)*
- **Password**: `artpass2026`

---

## 🎨 Artist Personalization & Control Features

Once logged in, any artist can:
1. **Change Name & Bio**: Update full name, professional title, header tagline, location, contact email, and detailed biography. Updates the site live instantly.
2. **Change Profile Picture & Showcase Cover**:
   - Visual thumbnail picker displaying all 18 images from `img/front1.jpeg`–`front6.jpeg` and `img/pic1.jpeg`–`pic12.jpeg`.
   - Option to upload any custom image file directly via file dialog (reads data URL via `FileReader`).
3. **Theme Variety Selection**:
   - 1-click switching between Pink/Purple/Black and other intelligent themes.
   - Adjust particle canvas animator modes (*Cosmic Nebulae*, *Constellation Nodes*, *Radiant Aurora*, *Minimal Dust*).
4. **Manage Artworks**:
   - Add new artworks with custom titles, categories, years, mediums, dimensions, descriptions, and featured spotlights.
   - Edit, delete, and reorder artwork pieces.
5. **Multi-Artist Switcher & Presets**:
   - Includes built-in artist profiles (e.g. *Aria Thorne*, *Marcus Kaelen*, *Elena Rostova*).
   - Export full portfolio as a `.json` backup file.
   - Import `.json` backup file to instantly load another artist's complete portfolio setup.

---

## 🚀 Running the Project

You can open `index.html` directly in any web browser, or serve it using Python's built-in server:

```powershell
python -m http.server 8080
```

Then visit:
- **Showcase Website**: [http://localhost:8080/index.html](http://localhost:8080/index.html)
- **Hidden Admin Gate (URL Method)**: [http://localhost:8080/index.html#admin](http://localhost:8080/index.html#admin)
- **Dedicated Admin Dashboard**: [http://localhost:8080/admin.html](http://localhost:8080/admin.html)
