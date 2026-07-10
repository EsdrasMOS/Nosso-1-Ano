const searchInput = document.getElementById('searchInput');
const optionsDropdown = document.getElementById('optionsDropdown');
const imagesContainer = document.getElementById('imagesContainer');
const audioPlayer = document.getElementById('audioPlayer');
const clickableArea = document.getElementsByClassName('clickable-area');

// ====== 2. Bancos de Dados ======
const musicDatabase = {
    'nature': '/assets/musics/4th/nikmouu - Ainda te amo...Ft.VMZ.mp3',
    'tech': '/assets/musics/4th/Bruno Mars - Risk It All [Official Music Video].mp3',
    'music': '/assets/musics/4th/Joji - Like You Do.mp3',
    'travel': '/assets/musics/4th/Era Você.mp3',
    'food': '/assets/musics/4th/Louco por você.mp3',
    'art': '/assets/musics/4th/O Tempo Não Pode Apagar.mp3',
    'culture': '/assets/musics/before/BTS - BAEPSAE.mp3',
    'fantasy': '/assets/musics/before/Stephen Sanchez - Until I Found You.mp3',
    'mystery': '/assets/musics/before/Djavan - Samurai.mp3'
};

const categoryColors = {
    nature: '#e91e63',      
    tech: '#2196f3',        
    music: '#f90000',     
    travel: '#4caf50',    
    food: '#ff9800',      
    art: '#ffc107'     
};

const imageDatabase = {
    nature: [
        { url: '/assets/images/4th/a1.jpeg', frase: 'SEU CHEIRO'},
        { url: '/assets/images/4th/a2.jpg' , frase: 'SEU CALOR'},
        { url: '/assets/images/4th/a3.jpg', frase: 'SEU BEIJO' },
        { url: '/assets/images/4th/a4.jpg', frase: 'SEU ABRAÇO' }
    ],
    tech: [
        { url: '/assets/images/4th/b1.jpg', frase: 'SEU CABELO' },
        { url: '/assets/images/4th/b2.jpg' , frase: 'SEU AFAGO'},
        { url: '/assets/images/4th/b3.jpg' , frase: 'SEUS OLHOS'},
        { url: '/assets/images/4th/b4.jpg' , frase: 'SEU CARINHO'}
    ],
    music: [
        { url: '/assets/images/4th/c1.jpg', frase: 'SUAS MORDISCADAS' },
        { url: '/assets/images/4th/c2.jpg', frase: 'SUA RISADA'},
        { url: '/assets/images/4th/c3.jpg', frase: 'SUAS CÓCEGAS' },
        { url: '/assets/images/4th/c4.jpg', frase: 'SEU JEITO' }
    ],
    travel: [
        { url: '/assets/images/4th/d1.jpg', frase: 'SEU CARINHO' },
        { url: '/assets/images/4th/d2.jpg', frase: 'SUAS MÃOS' },
        { url: '/assets/images/4th/d3.jpg', frase: 'SEU APEGO' },
        { url: '/assets/images/4th/d4.jpg', frase: 'SEU SORRISO' }
    ],
    food: [
        { url: '/assets/images/4th/e1.jpg', frase: 'SUA FÉ' },
        { url: '/assets/images/4th/e2.jpg', frase: 'SUA INTELIGÊNCIA' },
        { url: '/assets/images/4th/e3.jpg', frase: 'SUA VOZ' },
        { url: '/assets/images/4th/e4.jpg', frase: 'SUAS PIADAS' }
    ],
    art: [
        { url: '/assets/images/4th/f4.jpg', frase: 'SEU SER' },
        { url: '/assets/images/4th/f2.jpg', frase: 'SEU AMOR' },
        { url: '/assets/images/4th/f3.jpg', frase: 'SEU VOCÊ' },
        { url: '/assets/images/4th/f1.jpg', frase: 'SEU NÓS' }
    ]
};

const backgroundDatabase = {
    'culture': "url('/assets/images/before/baepsae.png')",
    'fantasy': "url('/assets/images/before/until.png')",
    'mystery': "url('/assets/images/before/samurai.png')"
};

let currentCategory = 'nature';

if (searchInput) {
    searchInput.addEventListener('click', function(e) {
        e.stopPropagation();
        if (optionsDropdown) optionsDropdown.style.display = 'block';
    });

    searchInput.addEventListener('keydown', function(e) {
        e.preventDefault();
    });
}

if (searchInput && optionsDropdown) {
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !optionsDropdown.contains(e.target)) {
            optionsDropdown.style.display = 'none';
        }
    });
}

function selectOption(category, categoryKey) {
    if (searchInput) searchInput.value = category;
    if (optionsDropdown) optionsDropdown.style.display = 'none';
    
    currentCategory = categoryKey;
    changeBackground(categoryKey);
    playMusic(categoryKey);
    
    if (imagesContainer) {
        showImages(categoryKey);
    }
}

function playMusic(categoryKey) {
    const musicPath = musicDatabase[categoryKey];
    console.log('Tentando tocar:', musicPath);
    
    if (musicPath && audioPlayer) {
        const botoes = document.querySelectorAll('.music-btn');
        if (botoes.length > 0) {
            botoes.forEach(btn => {
                btn.classList.remove('playing');
                btn.textContent = '▶ Play';
            });
        }
        
        audioPlayer.src = musicPath;
        audioPlayer.style.display = 'block';
        
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Música tocando!');
                if (event && event.target && event.target.classList.contains('music-btn')) {
                    event.target.classList.add('playing');
                    event.target.textContent = '♪ Tocando...';
                }
            }).catch(error => {
                console.log('Erro ao reproduzir:', error);
            });
        }
    } else {
        console.log('Música não encontrada para:', categoryKey);
    }
}

function showImages(category) {
    if (!imageDatabase[category]) {
        console.log('Sem imagens para:', category);
        return;
    }
    
    const images = imageDatabase[category];
    imagesContainer.innerHTML = '';
    
    images.forEach((img, index) => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <img src="${img.url}" alt="${img.frase}" loading="lazy">
        `;
        
        card.addEventListener('click', function() {
            showBigText(img.frase, category);
        });
        
        imagesContainer.appendChild(card);
    });
    
    imagesContainer.style.display = 'grid';
    
    setTimeout(() => {
        imagesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

function changeBackground(categoryKey) {
    const bgPath = backgroundDatabase[categoryKey];
    
    if (bgPath) {
        document.body.style.backgroundImage = bgPath;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.transition = 'background-image 0.8s ease-in-out';
    }
}

function showBigText(frase, category) {
    const existingOverlay = document.querySelector('.text-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    const overlay = document.createElement('div');
    overlay.className = 'text-overlay';
    
    const textElement = document.createElement('div');
    textElement.className = 'big-text';
    textElement.textContent = frase;
    textElement.style.color = categoryColors[category] || categoryColors.nature;
    
    overlay.appendChild(textElement);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
        }, 500);
    }, 3000);
    
    overlay.addEventListener('click', function() {
        overlay.classList.remove('show');
        setTimeout(() => {
            overlay.remove();
        }, 500);
    });
}

const listaDeImagens = [
    '/assets/images/2nd/apego.png',
    '/assets/images/2nd/golden.png',
    '/assets/images/2nd/her.png',
    '/assets/images/2nd/luz.png',
    '/assets/images/2nd/mares.png',
    '/assets/images/2nd/when.png'
];

let indiceAtual = 0;
const imagemElemento = document.getElementById('imagemClicavel');

if (imagemElemento) {
    imagemElemento.addEventListener('click', function() {
        indiceAtual++;
        
        if (indiceAtual >= listaDeImagens.length) {
            indiceAtual = 0;
        }
        
        imagemElemento.src = listaDeImagens[indiceAtual];
    });
}

const btnAbrir = document.getElementById('btnAbrir');
    const menuCentral = document.getElementById('menuCentral');
    const btnFechar = document.getElementById('btnFechar');

    btnAbrir.addEventListener('click', function() {
        menuCentral.classList.add('ativo');
    });

    btnFechar.addEventListener('click', function() {
        menuCentral.classList.remove('ativo');
    });

    window.addEventListener('click', function(event) {
        if (event.target === menuCentral) {
            menuCentral.classList.remove('ativo');
        }
});

const playerMusica = document.getElementById('playerMusica');
const nomeMusica = document.getElementById('nomeMusica');
const opcoes = document.querySelectorAll('.opcoes-menu a');

opcoes.forEach(opcao => {
    opcao.addEventListener('click', function(e) {
        e.preventDefault();
        
        const musica = this.getAttribute('data-music');
        const nome = this.textContent;
        
        playerMusica.pause();
        
        playerMusica.src = musica;
        playerMusica.play();
        
        nomeMusica.textContent = nome;
        
        opcoes.forEach(o => o.style.backgroundColor = '#f8f9fa');
        this.style.backgroundColor = '#007bff';
        this.style.color = 'white';
    });
});