// ============================================
// 🌾 RESTAURANTE CAMPESTRE EL FARO 🌾
// JavaScript para funcionalidad interactiva
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  console.log('🔥 Restaurante Campestre El Faro cargado');
  
  // ============================================
  // MENÚ MÓVIL RESPONSIVE
  // ============================================
  const btnMenuMobile = document.getElementById('btnMenu');
  const navLinks = document.querySelector('.nav-links');
  
  if (btnMenuMobile) {
    btnMenuMobile.addEventListener('click', function() {
      navLinks.classList.toggle('activo');
      
      // Cambiar icono del botón
      if (navLinks.classList.contains('activo')) {
        btnMenuMobile.textContent = '✕';
      } else {
        btnMenuMobile.textContent = '☰';
      }
    });
    
    // Cerrar menú al hacer clic en un enlace
    const enlaces = navLinks.querySelectorAll('.nav-link');
    enlaces.forEach(enlace => {
      enlace.addEventListener('click', function() {
        navLinks.classList.remove('activo');
        btnMenuMobile.textContent = '☰';
      });
    });
  }
  
  // ============================================
  // SCROLL SUAVE PARA NAVEGACIÓN
  // ============================================
  const enlacesNav = document.querySelectorAll('a[href^="#"]');
  
  enlacesNav.forEach(enlace => {
    enlace.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        const navHeight = document.querySelector('.navbar-campestre').offsetHeight;
        const targetPosition = targetSection.offsetTop - navHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ============================================
  // BOTÓN VOLVER ARRIBA
  // ============================================
  const btnVolverArriba = document.getElementById('btnVolverArriba');
  
  if (btnVolverArriba) {
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        btnVolverArriba.classList.add('visible');
      } else {
        btnVolverArriba.classList.remove('visible');
      }
    });
    
    btnVolverArriba.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // ============================================
  // CAMBIAR NAVBAR AL HACER SCROLL
  // ============================================
  const navbar = document.querySelector('.navbar-campestre');
  
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 100) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 76, 153, 0.4)';
    } else {
      navbar.style.boxShadow = '0 8px 25px rgba(0, 76, 153, 0.3)';
    }
  });
  
  // ============================================
  // BOTONES DE ORDENAR CON ANIMACIÓN
  // ============================================
  const botonesOrdenar = document.querySelectorAll('.btn-ordenar');
  
  botonesOrdenar.forEach(boton => {
    boton.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Obtener información del plato
      const tarjeta = this.closest('.tarjeta-plato');
      const nombrePlato = tarjeta.querySelector('.plato-nombre').textContent;
      const precioPlato = tarjeta.querySelector('.plato-precio').textContent;
      
      // Animación del botón
      this.style.transform = 'scale(0.9)';
      setTimeout(() => {
        this.style.transform = 'scale(1.1)';
      }, 100);
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
      
      // Mostrar mensaje de confirmación
      mostrarNotificacion(`¡${nombrePlato} agregado! ${precioPlato}`, 'exito');
      
      // En una aplicación real, aquí se agregaría al carrito
      console.log('Plato agregado:', nombrePlato, precioPlato);
    });
  });
  
  // ============================================
  // SISTEMA DE NOTIFICACIONES
  // ============================================
  function mostrarNotificacion(mensaje, tipo = 'info') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = 'notificacion-toast';
    notificacion.innerHTML = `
      <div class="notificacion-contenido ${tipo}">
        <span class="notificacion-icono">
          ${tipo === 'exito' ? '✓' : 'ℹ'}
        </span>
        <span class="notificacion-texto">${mensaje}</span>
      </div>
    `;
    
    // Agregar estilos si no existen
    if (!document.getElementById('notificacion-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notificacion-styles';
      styles.textContent = `
        .notificacion-toast {
          position: fixed;
          top: 100px;
          right: 20px;
          z-index: 10000;
          animation: slideInRight 0.3s ease-out;
        }
        
        .notificacion-contenido {
          background: white;
          padding: 16px 24px;
          border-radius: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 12px;
          border-left: 5px solid #FF7F00;
          min-width: 280px;
        }
        
        .notificacion-contenido.exito {
          border-left-color: #6B8E23;
        }
        
        .notificacion-icono {
          width: 32px;
          height: 32px;
          background: #FF7F00;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
          flex-shrink: 0;
        }
        
        .notificacion-contenido.exito .notificacion-icono {
          background: #6B8E23;
        }
        
        .notificacion-texto {
          color: #1A1A1A;
          font-weight: 600;
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        @keyframes slideOutRight {
          from {
            transform: translateX(0);
            opacity: 1;
          }
          to {
            transform: translateX(400px);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(styles);
    }
    
    // Agregar al DOM
    document.body.appendChild(notificacion);
    
    // Remover después de 3 segundos
    setTimeout(() => {
      notificacion.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        notificacion.remove();
      }, 300);
    }, 3000);
  }
  
  // ============================================
  // ANIMACIÓN AL HACER SCROLL (Intersection Observer)
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observar elementos
  const elementos = document.querySelectorAll('.tarjeta-plato, .categoria-bebidas, .tarjeta-porcion, .caracteristica');
  elementos.forEach((elemento, index) => {
    elemento.style.opacity = '0';
    elemento.style.transform = 'translateY(30px)';
    elemento.style.transition = 'all 0.6s ease-out';
    elemento.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(elemento);
  });
  
  // ============================================
  // EFECTO PARALLAX EN HERO
  // ============================================
  const heroSection = document.querySelector('.hero-campestre');
  
  if (heroSection) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const parallaxSpeed = 0.5;
      
      if (scrolled < window.innerHeight) {
        heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        heroSection.style.opacity = 1 - (scrolled / window.innerHeight);
      }
    });
  }
  
  // ============================================
  // CONTADOR DE PLATOS PARA ESTADÍSTICAS
  // ============================================
  const contarElementos = () => {
    const totalPlatos = document.querySelectorAll('.tarjeta-plato').length;
    const totalBebidas = document.querySelectorAll('.item-bebida').length;
    const totalPorciones = document.querySelectorAll('.tarjeta-porcion').length;
    
    console.log(`📊 Estadísticas del Menú:
    - Platos Fuertes: ${totalPlatos}
    - Bebidas: ${totalBebidas}
    - Porciones: ${totalPorciones}
    - Total de Items: ${totalPlatos + totalBebidas + totalPorciones}`);
  };
  
  contarElementos();
  
  // ============================================
  // MANEJO DE IMÁGENES CON ERROR
  // ============================================
  const imagenes = document.querySelectorAll('.plato-imagen, .logo-principal');
  
  imagenes.forEach(img => {
    img.addEventListener('error', function() {
      if (!this.dataset.errorHandled) {
        this.dataset.errorHandled = 'true';
        
        // Crear placeholder
        const parent = this.parentElement;
        const nombre = this.alt || 'Imagen';
        
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #F5F5F5, #E0E0E0);
          color: #666;
          font-weight: 600;
          padding: 20px;
          text-align: center;
        `;
        placeholder.innerHTML = `
          <div style="font-size: 3rem; margin-bottom: 10px;">🍽️</div>
          <div>${nombre}</div>
        `;
        
        this.style.display = 'none';
        parent.appendChild(placeholder);
      }
    });
  });
  
  // ============================================
  // BÚSQUEDA Y FILTRADO (funcionalidad adicional)
  // ============================================
  let carrito = [];
  
  // Función para agregar al carrito (simulación)
  window.agregarAlCarrito = function(nombrePlato, precio) {
    carrito.push({ nombre: nombrePlato, precio: precio });
    localStorage.setItem('carrito', JSON.stringify(carrito));
    console.log('Carrito actualizado:', carrito);
  };
  
  // ============================================
  // MODO OSCURO / CLARO (opcional)
  // ============================================
  const toggleTema = () => {
    document.body.classList.toggle('modo-oscuro');
    const esModoOscuro = document.body.classList.contains('modo-oscuro');
    localStorage.setItem('tema', esModoOscuro ? 'oscuro' : 'claro');
  };
  
  // Cargar tema guardado
  const temaGuardado = localStorage.getItem('tema');
  if (temaGuardado === 'oscuro') {
    document.body.classList.add('modo-oscuro');
  }
  
  // ============================================
  // ANIMACIONES ADICIONALES PARA ENLACES
  // ============================================
  const enlacesHover = document.querySelectorAll('.nav-link, .red-social, .footer-links a');
  
  enlacesHover.forEach(enlace => {
    enlace.addEventListener('mouseenter', function() {
      this.style.transition = 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
    });
  });
  
  // ============================================
  // EFECTOS DE SONIDO (opcional - descomentar si se desea)
  // ============================================
  /*
  const playClickSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTgIGWi77eefTRAMUKfj8LZjHAY4ktfzy34tBS');
    audio.play().catch(() => {});
  };
  */
  
  // ============================================
  // INICIALIZACIÓN COMPLETA
  // ============================================
  console.log(`
    ╔═══════════════════════════════════════╗
    ║  🌾 RESTAURANTE CAMPESTRE EL FARO 🌾 ║
    ║      Criadero Los 3 - Colombia       ║
    ║                                       ║
    ║  Sistema de Menú Digital v2.0        ║
    ║  Desarrollado con ❤️ y 🌿            ║
    ╚═══════════════════════════════════════╝
  `);
  
  // Mensaje de bienvenida interactivo
  setTimeout(() => {
    mostrarNotificacion('¡Bienvenido a El Faro! 🔥', 'exito');
  }, 1000);
  
  // ============================================
  // PERFORMANCE MONITORING
  // ============================================
  window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`⚡ Página cargada en ${loadTime}ms`);
  });
  
  // ============================================
  // PREVENIR ZOOM EN MOBILE (opcional)
  // ============================================
  document.addEventListener('gesturestart', function(e) {
    e.preventDefault();
  });
  
  // ============================================
  // LAZY LOADING PARA IMÁGENES
  // ============================================
  if ('loading' in HTMLImageElement.prototype) {
    const imagenes = document.querySelectorAll('img[loading="lazy"]');
    imagenes.forEach(img => {
      img.src = img.dataset.src || img.src;
    });
  } else {
    // Fallback para navegadores que no soportan lazy loading nativo
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
  }
  
});

// ============================================
// FUNCIONES GLOBALES ÚTILES
// ============================================

// Función para compartir en redes sociales
function compartir(red) {
  const url = window.location.href;
  const titulo = 'Restaurante Campestre El Faro - Criadero Los 3';
  const texto = '¡Descubre los mejores sabores campestres en El Faro!';
  
  const urls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(texto + ' ' + url)}`,
    email: `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(texto + '\n\n' + url)}`
  };
  
  if (urls[red]) {
    window.open(urls[red], '_blank', 'width=600,height=400');
  }
}

// Función para imprimir el menú
function imprimirMenu() {
  window.print();
}

// Función para descargar el menú como PDF (requiere librería adicional)
function descargarMenuPDF() {
  alert('Función de descarga PDF en desarrollo. Por ahora, puedes usar Ctrl+P y seleccionar "Guardar como PDF"');
  window.print();
}

// Exponer funciones al objeto window para uso global
window.compartir = compartir;
window.imprimirMenu = imprimirMenu;
window.descargarMenuPDF = descargarMenuPDF;
