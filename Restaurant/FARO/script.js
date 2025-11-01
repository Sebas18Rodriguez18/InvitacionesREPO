document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 Restaurante Campestre El Faro cargado. Version 100% Mejorada.")

  const navbar = document.querySelector(".navbar-campestre")
  const heroSection = document.getElementById("hero")
  const btnVolverArriba = document.getElementById("btnVolverArriba")
  const btnMenuMobile = document.getElementById("btnMenu")
  const navLinks = document.querySelector(".nav-links")

  if (btnMenuMobile && navLinks) {
    btnMenuMobile.addEventListener("click", () => {
      const isExpanded = navLinks.classList.toggle("activo")
      btnMenuMobile.setAttribute("aria-expanded", isExpanded)

      const icon = btnMenuMobile.querySelector("i")
      if (isExpanded) {
        icon.className = "bi bi-x-lg"
      } else {
        icon.className = "bi bi-list"
      }
    })

    const enlaces = navLinks.querySelectorAll(".nav-link")
    enlaces.forEach((enlace) => {
      enlace.addEventListener("click", () => {
        navLinks.classList.remove("activo")
        btnMenuMobile.setAttribute("aria-expanded", "false")
        const icon = btnMenuMobile.querySelector("i")
        icon.className = "bi bi-list"
      })
    })
  }

  const enlacesNav = document.querySelectorAll('a[href^="#"]')

  enlacesNav.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      }
    })
  })

  if (heroSection && navbar) {
    const heroObserverOptions = {
      rootMargin: `-${navbar.offsetHeight}px 0px 0px 0px`,
      threshold: 0,
    }

    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          navbar.classList.add("scrolled")
        } else {
          navbar.classList.remove("scrolled")
        }
      })
    }, heroObserverOptions)

    heroObserver.observe(heroSection)
  }

  if (heroSection && btnVolverArriba) {
    const scrollObserverOptions = {
      rootMargin: "0px 0px -100px 0px",
      threshold: 0.1,
    }

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          btnVolverArriba.classList.add("show")
        } else {
          btnVolverArriba.classList.remove("show")
        }
      })
    }, scrollObserverOptions)

    scrollObserver.observe(heroSection)

    btnVolverArriba.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    })
  }
  
  const modal = document.getElementById("imagenModal")
  const modalImagen = document.getElementById("modalImagenPrincipal")
  const modalDescripcion = document.getElementById("modalDescripcion")
  const cerrarModalBtn = document.querySelector(".cerrar-modal")

  const platosConModal = document.querySelectorAll('[data-modal-target="true"]')

  if (!modal || !modalImagen || !modalDescripcion) {
    console.warn("Modal elements not found in DOM — modal functionality disabled.")
  } else {
    function abrirModal(imgSrc, captionText) {
      if (!imgSrc) {
        console.warn("No image source provided for modal, aborting abrirModal.")
        return
      }

      modalImagen.src = imgSrc
      modalDescripcion.textContent = captionText || ""
      modal.classList.add("abierto")
      document.body.style.overflow = "hidden"
      modal.setAttribute('aria-hidden', 'false')
    }

    function cerrarModal() {
      modal.classList.remove("abierto")
      document.body.style.overflow = ""
      modal.setAttribute('aria-hidden', 'true')
    }

    platosConModal.forEach(plato => {
      plato.addEventListener("click", () => {
        let imgSrc = plato.dataset.fullImg
        
        if (!imgSrc) {
          const imgElement = plato.querySelector('img')
          if (imgElement) {
            imgSrc = imgElement.src
          }
        }
        
        const captionText = plato.dataset.caption || plato.querySelector(".plato-nombre")?.textContent || plato.getAttribute('aria-label') || ''
        
        if (imgSrc) {
          abrirModal(imgSrc, captionText)
        } else {
          console.warn("No se encontró imagen para mostrar en el modal", plato)
        }
      })

      plato.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          plato.click()
        }
      })
    })

    if (cerrarModalBtn) {
      cerrarModalBtn.addEventListener("click", cerrarModal)
    } else {
      console.warn("Cerrar modal button not found — close button listener not attached.")
    }

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        cerrarModal()
      }
    })

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("abierto")) {
        cerrarModal()
      }
    })
  }

})

function compartir(red) {
  const url = encodeURIComponent(window.location.href)
  const titulo = encodeURIComponent("Restaurante Campestre El Faro - Criadero Los 3")
  const texto = encodeURIComponent("¡Descubre los mejores sabores campestres en El Faro!")

  const urls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
    twitter: `https://twitter.com/intent/tweet?url=${url}&text=${texto}`,
    whatsapp: `https://wa.me/?text=${texto + "%20" + url}`,
    email: `mailto:?subject=${titulo}&body=${texto + "%20" + url}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${titulo}&summary=${texto}`
  }

  if (urls[red]) {
    window.open(urls[red], '_blank')
  } else {
    console.error("Red social no soportada para compartir.")
  }
}

document.addEventListener("gesturestart", (e) => {
  e.preventDefault()
})