  // Judul
document.addEventListener("DOMContentLoaded", () => {
  const titleSection = document.querySelector(".judul");

  // Tambahkan kelas animasi ketika halaman selesai dimuat
  setTimeout(() => {
    titleSection.classList.add("show");
  }, 200);
});

  // Filter button
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll(".filter-btns a");

  filterButtons.forEach((btn, index) => {
    const btnText = btn.textContent.trim().toLowerCase();
    
    // Tentukan animasi berdasarkan teks tombol
    if (btnText === "all" || btnText === "bph" || btnText === "keilmuan" || btnText === "perhubungan") {
      btn.classList.add("slide-right");
    } else if (btnText === "administrasi" || btnText === "kominfo" || btnText === "kewirausahaan") {
      btn.classList.add("slide-left");
    }

    // Tambahkan kelas animate setelah delay
    setTimeout(() => {
      btn.classList.add("animate");
    }, index * 120); // animasi berurutan
  });
});

  // Filter card - animasi saat scroll dari tengah ke samping
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");
  const cardsContainer = document.querySelector(".cards");

  // Fungsi untuk menghitung posisi card dalam grid berdasarkan posisi visual
  function getCardGridPosition(card) {
    const cardRect = card.getBoundingClientRect();
    const containerRect = cardsContainer.getBoundingClientRect();
    
    // Dapatkan semua card yang terlihat dan posisinya
    const allCards = Array.from(cards);
    const visibleCards = allCards.filter(c => {
      const rect = c.getBoundingClientRect();
      return rect.top < containerRect.bottom && rect.bottom > containerRect.top;
    });
    
    // Urutkan card berdasarkan posisi Y (baris) dan X (kolom)
    const sortedByRow = visibleCards.sort((a, b) => {
      const aTop = a.getBoundingClientRect().top;
      const bTop = b.getBoundingClientRect().top;
      if (Math.abs(aTop - bTop) < 10) { // Card dalam baris yang sama
        return a.getBoundingClientRect().left - b.getBoundingClientRect().left;
      }
      return aTop - bTop;
    });
    
    // Cari baris card saat ini
    const cardTop = cardRect.top;
    const sameRowCards = sortedByRow.filter(c => {
      const cTop = c.getBoundingClientRect().top;
      return Math.abs(cTop - cardTop) < 10; // Toleransi 10px untuk baris yang sama
    });
    
    // Urutkan card dalam baris berdasarkan posisi X
    const rowCards = sameRowCards.sort((a, b) => {
      return a.getBoundingClientRect().left - b.getBoundingClientRect().left;
    });
    
    // Cari index card dalam baris
    const colIndex = rowCards.indexOf(card);
    const totalCols = rowCards.length;
    const centerCol = Math.floor((totalCols - 1) / 2);
    
    // Hitung jarak dari tengah
    const distanceFromCenter = Math.abs(colIndex - centerCol);
    
    return distanceFromCenter;
  }

  // Buat Intersection Observer untuk mendeteksi saat card masuk viewport
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const distanceFromCenter = getCardGridPosition(entry.target);
        
        // Delay berdasarkan jarak dari tengah (card tengah = 0ms)
        const delay = distanceFromCenter * 100;
        
        setTimeout(() => {
          entry.target.classList.add("slide-up");
        }, delay);
        
        // Hentikan observe setelah animasi dipicu
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1, // Trigger saat 10% card terlihat
    rootMargin: "0px 0px -50px 0px" // Trigger sedikit sebelum card masuk viewport
  });

  // Observe semua card
  cards.forEach((card) => {
    observer.observe(card);
  });
});