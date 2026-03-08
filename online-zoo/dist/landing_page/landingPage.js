var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const petImages = {
    1: './assets/images/Panda.png',
    2: './assets/images/Lemur.png',
    3: './assets/images/Gorilla.png',
    4: './assets/images/Alligator.png',
    5: './assets/images/Eagles.png',
    6: './assets/images/Koala.png',
    7: './assets/images/Lion.png',
    8: './assets/images/Tiger.png',
    9: './assets/images/Red_panda.jpg',
    10: './assets/images/Mountain_gorilla.jpg',
    11: './assets/images/African_elephant.jpg',
    12: './assets/images/Sea_otter.jpg',
    13: './assets/images/Bengal_tiger.jpg',
    14: './assets/images/Gray_wolf.jpg',
    15: './assets/images/Fennec_fox.jpg',
    16: './assets/images/Grizzly_bear.jpg',
    17: './assets/images/Bottlenose_dolphin.jpg',
    18: './assets/images/Snow_leopard.jpg',
    19: './assets/images/Polar_bear.jpg',
    20: './assets/images/Jaguar.jpg',
    21: './assets/images/Ring_tailed_lemur.jpg',
    22: './assets/images/White_rhinoceros.jpg',
    23: './assets/images/Arctic_fox.jpg',
    24: './assets/images/Saltwater_crocodile.jpg',
    25: './assets/images/Scarlet_macaw.jpg',
    26: './assets/images/Comodo_dragon.jpg',
    27: './assets/images/Sloth.jpg',
    28: './assets/images/Cheetah.jpg'
};
const petsContainer = document.getElementById('petsContainer');
const petsLoader = document.getElementById('petsLoader');
const petsFetchError = document.getElementById('petsError');
const petsNextBtn = document.getElementById('nextBtn');
const petsPrevBtn = document.getElementById('prevBtn');
const petsBtns = document.getElementById('petsBtns');
function fetchPets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets');
            const data = yield response.json();
            const pets = data.data;
            petsLoader.style.display = 'none';
            renderPets(pets);
            Slider(petsContainer, '.slide', petsNextBtn, petsPrevBtn);
        }
        catch (error) {
            console.error(error);
            petsFetchError.textContent = 'Something went wrong. Please, refresh the page!';
            petsBtns.style.display = 'none';
        }
    });
}
function renderPets(pets) {
    const cardsPerSlide = 2; // 2 cards per slide
    for (let i = 0; i < pets.length; i += cardsPerSlide) {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const slice = pets.slice(i, i + cardsPerSlide); // get 2 pets
        slice.forEach(pet => {
            const image = petImages[pet.id];
            const card = document.createElement('div');
            card.classList.add('pet_card');
            card.innerHTML = `
                <a href="./pages/zoos_page.html?id=${pet.id}">
                    <div class="name">${pet.name}</div>
                    <img src="${image}" alt="${pet.name}">
                    <div class="card_info">
                        <div>
                            <h3>${pet.commonName}</h3>
                            <p>${pet.description}</p>
                        </div>
                        <button>View Live Cam <img src="./assets/icons/View_live_cam_arrow.svg" alt="View Live Cam Arrow"></button>
                    </div>
                </a>
            `;
            slide.appendChild(card);
        });
        petsContainer.appendChild(slide);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchPets();
});
const feedbackContainer = document.getElementById('feedbackContainer');
const feedbackLoader = document.getElementById('feedbackLoader');
const feedbackFetchError = document.getElementById('feedbackFetchError');
const feedbackBtns = document.getElementById('feedbackBtns');
const feedbackNextBtn = document.getElementById('feedbackNextBtn');
const feedbackPrevBtn = document.getElementById('feedbackPrevBtn');
function fetchFeedback() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/feedback');
            const data = yield response.json();
            const feedback = data.data;
            feedbackLoader.style.display = 'none';
            renderFeedback(feedback);
            Slider(feedbackContainer, '.slide', feedbackNextBtn, feedbackPrevBtn);
        }
        catch (error) {
            console.error(error);
            feedbackFetchError.textContent = 'Something went wrong. Please, refresh the page!';
            feedbackBtns.style.display = 'none';
        }
    });
}
function renderFeedback(feedbacks) {
    const cardsPerSlide = 2; // 2 cards per slide
    for (let i = 0; i < feedbacks.length; i += cardsPerSlide) {
        const slide = document.createElement('div');
        slide.classList.add('slide');
        const slice = feedbacks.slice(i, i + cardsPerSlide); // get 2 pets
        slice.forEach(feedback => {
            const card = document.createElement('div');
            card.classList.add('feedback_card');
            card.innerHTML = `
                        <img src="./assets/icons/Feedback_svg.svg" alt="Feedback">
                        <div class="date">${feedback.city}, ${feedback.month} ${feedback.year}</div>
                        <div class="text">${feedback.text}</div>
                        <div class="name">${feedback.name}</div>
                        `;
            slide.appendChild(card);
        });
        feedbackContainer.appendChild(slide);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetchFeedback();
});
// slider------------------------------------------------------------------------------------------------------
function Slider(container, slideSelector, nextBtn, prevBtn, gap = 30) {
    const slides = container.querySelectorAll(slideSelector);
    if (!slides.length)
        return;
    let currentIndex = 0;
    const slideWidth = slides[0].offsetWidth + gap;
    nextBtn.addEventListener('click', () => {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        updateSlider();
    });
    prevBtn.addEventListener('click', () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        updateSlider();
    });
    function updateSlider() {
        container.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
}
export {};
//# sourceMappingURL=landingPage.js.map