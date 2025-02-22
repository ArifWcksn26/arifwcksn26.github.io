const suggestions = [
    "Home",
    "Sejarah",
    "Stadion",
    "Prestasi",
    "Legend"
];

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function() {
    const inputValue = this.value.toLowerCase();
    searchResults.innerHTML = ""; // Kosongkan hasil pencarian

    if (inputValue) {
        const filteredSuggestions = suggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(inputValue)
        );

        filteredSuggestions.forEach(suggestion => {
            const a = document.createElement("a");
            a.href = "#" + suggestion.toLowerCase(); // Mengatur tautan
            a.textContent = suggestion;
            a.addEventListener("click", function(event) {
                event.preventDefault(); // Mencegah perilaku default anchor
                smoothScrollTo(suggestion.toLowerCase()); // Panggil fungsi scroll
            });
            searchResults.appendChild(a);
        });

        if (filteredSuggestions.length > 0) {
            searchResults.style.display = "block"; // Tampilkan hasil pencarian
        } else {
            searchResults.style.display = "none"; // Sembunyikan jika tidak ada hasil
        }
    } else {
        searchResults.style.display = "none"; // Sembunyikan jika input kosong
    }
});

// Fungsi untuk scroll dengan mulus
function smoothScrollTo(targetId) {
    const targetElement = document.getElementById(targetId);
    targetElement.scrollIntoView({ behavior: 'smooth' }); // Scroll dengan efek mulus
    searchResults.style.display = "none"; // Sembunyikan hasil pencarian setelah scroll
}

// Menutup hasil pencarian jika mengklik di luar
window.onclick = function(event) {
    if (!event.target.matches('#searchInput') && !event.target.matches('#searchButton')) {
        searchResults.style.display = "none"; // Menyembunyikan hasil pencarian
    }
};


function searchContent() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const sections = document.querySelectorAll('article h2, article h3, p'); 

    let found = false;

    sections.forEach(section => {
        if (section.textContent.toLowerCase().includes(searchInput)) {
            found = true;
            const sectionId = section.parentElement.id; 
            if (sectionId) {
                window.location.hash = sectionId; 
            }
        }
    });

    if (!found) {
        alert('Konten tidak ditemukan.');
    }
}

// Event listener untuk tombol pencarian
document.getElementById('searchButton').addEventListener('click', searchContent);

// Event listener untuk penekanan tombol Enter
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchContent(); 
    }
});

window.onload = function() {
    alert("Selamat datang di situs saya!");
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.onclick = function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    };
});
