function goToProker(department) {
    // Redirect ke halaman proker masing-masing departemen
    const prokerPages = {
        'bph': 'proker_bph.html',
        'keilmuan': 'proker_keilmuan.html',
        'perhubungan': 'proker_perhubungan.html',
        'administrasi': 'proker_administrasi.html',
        'kominfo': 'proker_kominfo.html',
        'kewirausahaan': 'proker_kewirausahaan.html'
    };

    if (prokerPages[department]) {
        window.location.href = prokerPages[department];
    }
}

document.getElementById('prokerLink').addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo(0, 0);
});