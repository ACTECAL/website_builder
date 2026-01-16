import React, { useEffect, useRef } from 'react';

// Advanced animation hook for scroll-based animations
export const useScrollAnimations = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in-view');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.scroll-animate');
    animatedElements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return observerRef.current;
};

// Magnetic cursor effect hook
export const useMagneticCursor = (selector: string = '[data-magnetic]') => {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * 0.3;
      const deltaY = (e.clientY - centerY) * 0.3;

      target.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      target.style.transform = 'translate(0px, 0px)';
    };

    elements.forEach((element) => {
      element.addEventListener('mousemove', handleMouseMove as EventListener);
      element.addEventListener('mouseleave', handleMouseLeave as EventListener);
    });

    return () => {
      elements.forEach((element) => {
        element.removeEventListener('mousemove', handleMouseMove as EventListener);
        element.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      });
    };
  }, [selector]);
};

// Particle background effect hook
export const useParticleBackground = (containerId: string, particleCount: number = 50) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = document.getElementById(containerId) as HTMLCanvasElement;
    if (!canvas) return;

    canvasRef.current = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = `rgba(${59 + Math.random() * 40}, ${130 + Math.random() * 40}, ${246 + Math.random() * 40}, ${this.opacity})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;

        // Subtle opacity pulsing
        this.opacity += Math.sin(Date.now() * 0.001) * 0.01;
        this.opacity = Math.max(0.1, Math.min(0.7, this.opacity));
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [containerId, particleCount]);

  return canvasRef;
};

// Advanced hover effect hook
export const useHoverEffects = () => {
  useEffect(() => {
    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;

      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.className = 'ripple-effect';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(255, 255, 255, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.pointerEvents = 'none';

      const rect = target.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      target.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    };

    const rippleElements = document.querySelectorAll('[data-ripple]');
    rippleElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter as EventListener);
    });

    return () => {
      rippleElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter as EventListener);
      });
    };
  }, []);
};

// Typewriter effect hook
export const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = React.useState('');
  const [isComplete, setIsComplete] = React.useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText(text.slice(0, i + 1));
        i++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isComplete };
};

// Advanced loading states hook
export const useLoadingStates = () => {
  const showSkeleton = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.classList.add('loading-skeleton');
    });
  };

  const hideSkeleton = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.classList.remove('loading-skeleton');
      el.classList.add('loaded');
    });
  };

  const showSuccess = (selector: string) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      el.classList.add('success-animation');
      setTimeout(() => {
        el.classList.remove('success-animation');
      }, 1000);
    });
  };

  return { showSkeleton, hideSkeleton, showSuccess };
};

// Advanced parallax effect hook
export const useParallax = (speed: number = 0.5) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const parallaxElements = document.querySelectorAll('[data-parallax]');

      parallaxElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        const elementSpeed = parseFloat(element.getAttribute('data-parallax-speed') || speed.toString());

        if (elementTop < window.innerHeight && elementTop > -element.clientHeight) {
          const yPos = -(scrolled * elementSpeed);
          (element as HTMLElement).style.transform = `translate3d(0, ${yPos}px, 0)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
};

// Advanced theme switcher hook
export const useThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark' | 'auto'>('light');

  const switchTheme = (theme: 'light' | 'dark' | 'auto') => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute('data-theme', theme);

    // Store preference
    localStorage.setItem('preferred-theme', theme);

    // Apply theme classes
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('preferred-theme') as 'light' | 'dark' | 'auto' || 'light';
    switchTheme(savedTheme);
  }, []);

  return { currentTheme, switchTheme };
};

// Advanced tooltip system hook
export const useAdvancedTooltip = () => {
  useEffect(() => {
    let tooltipElement: HTMLDivElement | null = null;

    const showTooltip = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      const tooltipText = target.getAttribute('data-tooltip');

      if (!tooltipText) return;

      // Remove existing tooltip
      if (tooltipElement) {
        tooltipElement.remove();
      }

      // Create new tooltip
      tooltipElement = document.createElement('div');
      tooltipElement.className = 'advanced-tooltip';
      tooltipElement.textContent = tooltipText;

      document.body.appendChild(tooltipElement);

      // Position tooltip
      const rect = target.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();

      let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
      let top = rect.top - tooltipRect.height - 8;

      // Adjust if tooltip goes off screen
      if (left < 8) left = 8;
      if (left + tooltipRect.width > window.innerWidth - 8) {
        left = window.innerWidth - tooltipRect.width - 8;
      }

      if (top < 8) {
        top = rect.bottom + 8;
        tooltipElement.classList.add('tooltip-bottom');
      }

      tooltipElement.style.left = left + 'px';
      tooltipElement.style.top = top + 'px';
      tooltipElement.style.opacity = '1';
      tooltipElement.style.transform = 'translateY(0)';
    };

    const hideTooltip = () => {
      if (tooltipElement) {
        tooltipElement.style.opacity = '0';
        tooltipElement.style.transform = 'translateY(-4px)';
        setTimeout(() => {
          if (tooltipElement) {
            tooltipElement.remove();
            tooltipElement = null;
          }
        }, 200);
      }
    };

    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach((element) => {
      element.addEventListener('mouseenter', showTooltip as EventListener);
      element.addEventListener('mouseleave', hideTooltip as EventListener);
    });

    return () => {
      tooltipElements.forEach((element) => {
        element.removeEventListener('mouseenter', showTooltip as EventListener);
        element.removeEventListener('mouseleave', hideTooltip as EventListener);
      });
      if (tooltipElement) {
        tooltipElement.remove();
      }
    };
  }, []);
};

// Performance monitoring hook
export const usePerformanceMonitor = () => {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics
        if (entry.entryType === 'largest-contentful-paint') {
          console.log('LCP:', entry.startTime);
        }
        if (entry.entryType === 'first-input') {
          console.log('FID:', (entry as any).processingStart - entry.startTime);
        }
        if (entry.entryType === 'layout-shift') {
          console.log('CLS:', (entry as any).value);
        }
      }
    });

    observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });

    return () => observer.disconnect();
  }, []);
};

// Advanced form validation hook with animations
export const useFormValidation = (rules: Record<string, (value: string) => boolean>) => {
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string) => {
    const rule = rules[name];
    if (!rule) return true;

    const isValid = rule(value);
    setErrors(prev => ({
      ...prev,
      [name]: isValid ? '' : `${name} is invalid`
    }));

    // Add visual feedback
    const input = document.querySelector(`[name="${name}"]`) as HTMLInputElement;
    if (input) {
      if (!isValid) {
        input.classList.add('invalid-shake');
        setTimeout(() => input.classList.remove('invalid-shake'), 500);
      }
    }

    return isValid;
  };

  const validateForm = (data: Record<string, string>) => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    Object.keys(rules).forEach((field) => {
      const rule = rules[field];
      if (rule && !rule(data[field] || '')) {
        newErrors[field] = `${field} is invalid`;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }));
  };

  return { errors, touched, validateField, validateForm, handleBlur };
};
