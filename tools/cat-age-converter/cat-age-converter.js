function convertAge() {
    const catAgeInput = document.getElementById('catAge');
    const catAge = parseFloat(catAgeInput.value);
    
    // Validasi input
    if (isNaN(catAge) || catAge < 0) {
        alert('Mohon masukkan umur kucing yang valid (0-30 tahun)');
        return;
    }
    
    if (catAge > 30) {
        alert('Umur kucing terlalu tinggi. Maksimal 30 tahun.');
        return;
    }
    
    // Hitung umur manusia berdasarkan rumus:
    // - Tahun pertama: 15 tahun manusia
    // - Tahun kedua: +9 tahun manusia (total 24)
    // - Tahun ketiga dan seterusnya: +4 tahun manusia per tahun
    let humanAge;
    
    if (catAge === 0) {
        humanAge = 0;
    } else if (catAge <= 1) {
        humanAge = catAge * 15;
    } else if (catAge <= 2) {
        humanAge = 15 + (catAge - 1) * 9;
    } else {
        humanAge = 24 + (catAge - 2) * 4;
    }
    
    // Tampilkan hasil
    document.getElementById('catAgeValue').textContent = catAge.toFixed(1);
    document.getElementById('humanAgeValue').textContent = Math.round(humanAge);
    
    // Tambahkan deskripsi berdasarkan tahap kehidupan
    const description = document.getElementById('description');
    if (catAge < 0.5) {
        description.textContent = '🐱 Kucing Anda masih dalam tahap kitten (anak kucing). Ini adalah periode pertumbuhan yang sangat cepat!';
    } else if (catAge < 1) {
        description.textContent = '🐱 Kucing Anda masih dalam tahap kitten. Hampir mencapai kedewasaan!';
    } else if (catAge < 2) {
        description.textContent = '😺 Kucing Anda dalam tahap junior, setara dengan remaja awal manusia.';
    } else if (catAge < 4) {
        description.textContent = '😺 Kucing Anda dalam tahap prime (dewasa muda), setara dengan manusia usia 20-an awal.';
    } else if (catAge < 7) {
        description.textContent = '😸 Kucing Anda dalam tahap dewasa, setara dengan manusia usia 30-40an.';
    } else if (catAge < 11) {
        description.textContent = '🐈 Kucing Anda mulai masuk tahap mature (dewasa tengah), setara dengan manusia usia 40-50an.';
    } else if (catAge < 15) {
        description.textContent = '🐈 Kucing Anda dalam tahap senior, setara dengan manusia usia 60-70an.';
    } else {
        description.textContent = '🦴 Kucing Anda dalam tahap geriatric (sangat senior), setara dengan manusia usia 80+. Luar biasa!';
    }
    
    // Tampilkan section hasil dengan animasi
    const resultSection = document.getElementById('resultSection');
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Allow Enter key to trigger conversion
document.addEventListener('DOMContentLoaded', function() {
    const catAgeInput = document.getElementById('catAge');
    if (catAgeInput) {
        catAgeInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                convertAge();
            }
        });
    }
});
