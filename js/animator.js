/**
 * Web Animator Engine - Dynamic Canvas Effects, Mouse Interactions & GSAP Motion
 * Tailored for Pink, Purple & Black neon aesthetics.
 */

class WebAnimator {
  constructor() {
    this.canvas = document.getElementById('ambient-canvas');
    this.ctx = this.canvas ? this.canvas.getContext('2d') : null;
    this.particles = [];
    this.mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, radius: 180, isHovering: false };
    this.animationFrameId = null;
    this.themeColors = {
      primary: '#ff2a85',
      secondary: '#9d4edd',
      bgDark: '#08040c'
    };
    this.mode = 'cosmic'; // 'cosmic' | 'constellation' | 'nebula' | 'ambient'
    this.initCanvas();
    this.initMouseTracker();
    this.initCardTilt();
  }

  setThemeColors(colors, mode = null) {
    if (colors) {
      this.themeColors.primary = colors.primary || '#ff2a85';
      this.themeColors.secondary = colors.secondary || '#9d4edd';
      this.themeColors.bgDark = colors.bgDark || '#08040c';
    }
    if (mode) this.mode = mode;
    this.spawnParticles();
  }

  initCanvas() {
    if (!this.canvas || !this.ctx) return;
    this.resizeCanvas();
    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.spawnParticles();
    });
    this.spawnParticles();
    this.render();
  }

  resizeCanvas() {
    if (!this.canvas) return;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  spawnParticles() {
    if (!this.width || !this.height) return;
    const count = Math.min(Math.floor((this.width * this.height) / 14000), 75);
    this.particles = [];

    for (let i = 0; i < count; i++) {
      const isAlt = Math.random() > 0.45;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.55,
        vy: (Math.random() - 0.5) * 0.55,
        size: Math.random() * 2.8 + 1,
        baseAlpha: Math.random() * 0.6 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulsePhase: Math.random() * Math.PI * 2,
        color: isAlt ? this.themeColors.primary : this.themeColors.secondary,
        blur: Math.random() * 12 + 6
      });
    }
  }

  initMouseTracker() {
    window.addEventListener('pointermove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.mouse.isHovering = true;
      this.updateCursorGlow(e.clientX, e.clientY);
    });

    document.addEventListener('mouseleave', () => {
      this.mouse.isHovering = false;
      const glow = document.getElementById('cursor-glow');
      if (glow) glow.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
      const glow = document.getElementById('cursor-glow');
      if (glow) glow.style.opacity = '1';
    });
  }

  updateCursorGlow(x, y) {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;
    glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  render() {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Subtle atmospheric ambient radial glow following mouse
    if (this.mouse.isHovering) {
      const grad = this.ctx.createRadialGradient(
        this.mouse.x, this.mouse.y, 10,
        this.mouse.x, this.mouse.y, 350
      );
      grad.addColorStop(0, 'rgba(255, 42, 133, 0.06)');
      grad.addColorStop(0.5, 'rgba(157, 78, 221, 0.03)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // Draw and connect particles
    const pLen = this.particles.length;
    for (let i = 0; i < pLen; i++) {
      const p = this.particles[i];

      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges with margin
      if (p.x < -20) p.x = this.width + 20;
      if (p.x > this.width + 20) p.x = -20;
      if (p.y < -20) p.y = this.height + 20;
      if (p.y > this.height + 20) p.y = -20;

      // Mouse repulsion & interaction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius && this.mouse.isHovering) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        p.x -= (dx / dist) * force * 1.5;
        p.y -= (dy / dist) * force * 1.5;
      }

      // Dynamic pulsating alpha
      p.pulsePhase += p.pulseSpeed;
      const currentAlpha = Math.max(0.1, p.baseAlpha + Math.sin(p.pulsePhase) * 0.25);

      // Draw glowing particle
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.globalAlpha = currentAlpha;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = p.blur;
      this.ctx.fill();
      this.ctx.restore();

      // Constellation mode: draw delicate neon lines between nearby nodes
      if (this.mode === 'constellation' || this.mode === 'cosmic') {
        for (let j = i + 1; j < pLen; j++) {
          const p2 = this.particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          const maxLink = this.mode === 'constellation' ? 140 : 100;
          if (dist2 < maxLink) {
            const lineAlpha = (1 - dist2 / maxLink) * 0.18;
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = p.color;
            this.ctx.globalAlpha = lineAlpha;
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
        }
      }
    }

    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  initCardTilt() {
    // 3D dynamic tilt for cards and artwork frames
    const tiltContainers = document.querySelectorAll('.tilt-effect');
    tiltContainers.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

        const glare = card.querySelector('.card-glare');
        if (glare) {
          glare.style.opacity = '1';
          glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 42, 133, 0.28), transparent 70%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        const glare = card.querySelector('.card-glare');
        if (glare) glare.style.opacity = '0';
      });
    });
  }

  animateEntrance() {
    if (typeof gsap === 'undefined') return;

    // Hero title & badge animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.from('.hero-badge', { opacity: 0, y: -20, duration: 0.8, delay: 0.2 })
      .from('.hero-title-line', { opacity: 0, y: 35, duration: 1, stagger: 0.15 }, '-=0.5')
      .from('.hero-description', { opacity: 0, y: 25, duration: 0.8 }, '-=0.6')
      .from('.hero-cta-group', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      .from('.hero-art-showcase', { opacity: 0, scale: 0.92, duration: 1.1 }, '-=0.7')
      .from('.stat-box', { opacity: 0, y: 30, stagger: 0.12, duration: 0.7 }, '-=0.6');

    // Number counter animation for statistics
    const statCounters = document.querySelectorAll('.stat-number');
    statCounters.forEach((counter) => {
      const target = parseInt(counter.getAttribute('data-target') || counter.innerText, 10);
      if (isNaN(target)) return;
      gsap.fromTo(counter, 
        { innerText: 0 },
        {
          innerText: target,
          duration: 2.2,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: counter,
            start: 'top 85%'
          }
        }
      );
    });

    // Stagger animation for gallery items
    if (window.ScrollTrigger) {
      gsap.utils.toArray('.art-card').forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 40,
          duration: 0.75,
          delay: (index % 3) * 0.1,
          ease: 'power2.out'
        });
      });
    }
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

window.WebAnimator = WebAnimator;
