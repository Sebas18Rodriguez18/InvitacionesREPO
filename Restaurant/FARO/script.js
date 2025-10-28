// ============================================
// 🌾 RESTAURANTE CAMPESTRE EL FARO 🌾
// JavaScript para funcionalidad interactiva
// ============================================

document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 Restaurante Campestre El Faro cargado")

  // ============================================
  // MENÚ MÓVIL RESPONSIVE
  // ============================================
  const btnMenuMobile = document.getElementById("btnMenu")
  const navLinks = document.querySelector(".nav-links")

  if (btnMenuMobile) {
    btnMenuMobile.addEventListener("click", () => {
      navLinks.classList.toggle("activo")

      const icon = btnMenuMobile.querySelector("i")
      if (navLinks.classList.contains("activo")) {
        icon.className = "bi bi-x-lg"
      } else {
        icon.className = "bi bi-list"
      }
    })

    const enlaces = navLinks.querySelectorAll(".nav-link")
    enlaces.forEach((enlace) => {
      enlace.addEventListener("click", () => {
        navLinks.classList.remove("activo")
        const icon = btnMenuMobile.querySelector("i")
        icon.className = "bi bi-list"
      })
    })
  }

  // ============================================
  // SCROLL SUAVE PARA NAVEGACIÓN
  // ============================================
  const enlacesNav = document.querySelectorAll('a[href^="#"]')

  enlacesNav.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const navHeight = document.querySelector(".navbar-campestre").offsetHeight
        const targetPosition = targetSection.offsetTop - navHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }
    })
  })

  // ============================================
  // BOTÓN VOLVER ARRIBA
  // ============================================
  const btnVolverArriba = document.getElementById("btnVolverArriba")

  if (btnVolverArriba) {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        btnVolverArriba.classList.add("visible")
      } else {
        btnVolverArriba.classList.remove("visible")
      }
    })

    btnVolverArriba.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  }

  // ============================================
  // CAMBIAR NAVBAR AL HACER SCROLL
  // ============================================
  const navbar = document.querySelector(".navbar-campestre")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 100) {
      navbar.style.boxShadow = "0 10px 30px rgba(0, 76, 153, 0.4)"
    } else {
      navbar.style.boxShadow = "0 8px 25px rgba(0, 76, 153, 0.3)"
    }
  })

  // ============================================
  // ANIMACIÓN AL HACER SCROLL (Intersection Observer)
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  const elementos = document.querySelectorAll(".tarjeta-plato, .categoria-bebidas, .tarjeta-porcion, .caracteristica")
  elementos.forEach((elemento, index) => {
    elemento.style.opacity = "0"
    elemento.style.transform = "translateY(30px)"
    elemento.style.transition = "all 0.6s ease-out"
    elemento.style.transitionDelay = `${index * 0.05}s`
    observer.observe(elemento)
  })

  // ============================================
  // CONTADOR DE PLATOS PARA ESTADÍSTICAS
  // ============================================
  const contarElementos = () => {
    const totalPlatos = document.querySelectorAll(".tarjeta-plato").length
    const totalBebidas = document.querySelectorAll(".item-bebida").length
    const totalPorciones = document.querySelectorAll(".tarjeta-porcion").length

    console.log(`📊 Estadísticas del Menú:
    - Platos Fuertes: ${totalPlatos}
    - Bebidas: ${totalBebidas}
    - Porciones: ${totalPorciones}
    - Total de Items: ${totalPlatos + totalBebidas + totalPorciones}`)
  }

  contarElementos()

  // ============================================
  // MANEJO DE IMÁGENES CON ERROR
  // ============================================
  const imagenes = document.querySelectorAll(".plato-imagen, .logo-principal")

  imagenes.forEach((img) => {
    img.addEventListener("error", function () {
      if (!this.dataset.errorHandled) {
        this.dataset.errorHandled = "true"

        const parent = this.parentElement
        const nombre = this.alt || "Imagen"

        const placeholder = document.createElement("div")
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
        `
        placeholder.innerHTML = `
          <i class="bi bi-image" style="font-size: 3rem; margin-bottom: 10px; color: #FF7F00;"></i>
          <div>${nombre}</div>
        `

        this.style.display = "none"
        parent.appendChild(placeholder)
      }
    })
  })

  // ============================================
  // INICIALIZACIÓN COMPLETA
  // ============================================
  console.log(`
    ╔═══════════════════════════════════════╗
    ║  🌾 RESTAURANTE CAMPESTRE EL FARO 🌾 ║
    ║      Criadero Los 3 - Colombia       ║
    ║                                       ║
    ║  Sistema de Menú Digital v3.0        ║
    ║  Desarrollado con ❤️ y 🌿            ║
    ╚═══════════════════════════════════════╝
  `)

  // ============================================
  // PERFORMANCE MONITORING
  // ============================================
  window.addEventListener("load", () => {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
    console.log(`⚡ Página cargada en ${loadTime}ms`)
  })

  // ============================================
  // PREVENIR ZOOM EN MOBILE (opcional)
  // ============================================
  document.addEventListener("gesturestart", (e) => {
    e.preventDefault()
  })
})

// ============================================
// FUNCIONES GLOBALES ÚTILES
// ============================================

function compartir(red) {
  const url = window.location.href
  const titulo = "Restaurante Campestre El Faro - Criadero Los 3"
  const texto = "¡Descubre los mejores sabores campestres en El Faro!"

  const urls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(texto)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(texto + " " + url)}`,
    email: `mailto:?subject=${encodeURIComponent(titulo)}&body=${encodeURIComponent(texto + "\n\n" + url)}`,
  }

  if (urls[red]) {
    window.open(urls[red], "_blank", "width=600,height=400")
  }
}

function imprimirMenu() {
  window.print()
}

window.compartir = compartir
window.imprimirMenu = imprimirMenu