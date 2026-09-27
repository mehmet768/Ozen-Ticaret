/* <!-- Tema & Sepet JS --> */

// Tema Yönetimi
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const htmlEl = document.documentElement;

// Kayıtlı temayı yükle
const savedTheme = localStorage.getItem("shopTheme") || "light";
htmlEl.setAttribute("data-bs-theme", savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener("click", () => {
  const current = htmlEl.getAttribute("data-bs-theme");
  const newTheme = current === "light" ? "dark" : "light";
  htmlEl.setAttribute("data-bs-theme", newTheme);
  localStorage.setItem("shopTheme", newTheme);
  updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
  themeIcon.className =
    theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
}

// Sepete Ekleme Animasyonu
const addButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cartCount");

addButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    let count = parseInt(cartCount.textContent);
    cartCount.textContent = count + 1;

    btn.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Eklendi!';
    btn.classList.add("btn-success");
    btn.classList.remove("btn-primary");

    setTimeout(() => {
      btn.innerHTML = "Sepete Ekle";
      btn.classList.remove("btn-success");
      btn.classList.add("btn-primary");
    }, 1500);
  });
});

// Yumuşak Kaydırma
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  });
});



// === Basit ve Güvenilir Sayaç ===
function runCounters() {
  const counters = document.querySelectorAll(".counter-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const duration = 5000;
    const stepTime = 20;
    const totalSteps = duration / stepTime;
    const increment = target / totalSteps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target.toLocaleString("tr-TR");
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current).toLocaleString("tr-TR");
      }
    }, stepTime);
  });
}

// Sayfa tamamen yüklendikten sonra çalıştır
if (document.readyState === "complete") {
  runCounters();
} else {
  window.addEventListener("load", runCounters);
}



 // === Kategori Seçimi ===
    const tabs = document.querySelectorAll('.faq-tab');
    const contents = document.querySelectorAll('.faq-content');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Sekmelerden aktifliği kaldır
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // İçerikleri gizle / göster
        const category = tab.getAttribute('data-category');
        contents.forEach(content => {
          content.classList.remove('active');
          if (content.id === category) {
            content.classList.add('active');
          }
        });
      });
    });