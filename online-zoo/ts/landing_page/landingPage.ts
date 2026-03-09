// meet some our pets ------------------------------------------------------------------------------------
interface Pet {
    id: number
    name: string
    commonName: string
    description: string
}

const petImages: Record<number, string> = {
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
}

const petsContainer = document.getElementById('petsContainer') as HTMLElement
const petsLoader = document.getElementById('petsLoader') as HTMLElement
const petsFetchError = document.getElementById('petsError') as HTMLElement
const petsNextBtn = document.getElementById('nextBtn') as HTMLElement
const petsPrevBtn = document.getElementById('prevBtn') as HTMLElement
const petsBtns = document.getElementById('petsBtns') as HTMLElement

async function fetchPets(): Promise<void> {
    try {
        const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets')
        const data = await response.json();
        const pets: Pet[] = data.data;
        petsLoader.style.display = 'none'

        renderPets(pets)
        slider(
            petsContainer,
            '.slide',
            petsNextBtn,
            petsPrevBtn,
            40
        )
    } catch (error) {
        console.error(error)
        petsFetchError.textContent = 'Something went wrong. Please, refresh the page!'
        petsBtns.style.display = 'none'
    }
}

function renderPets(pets: Pet[]): void {
    const cardsPerSlide = 2; 
    for (let i = 0; i < pets.length; i += cardsPerSlide) {
        const slide = document.createElement('div');
        slide.classList.add('slide');

        const slice = pets.slice(i, i + cardsPerSlide);
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
})

// feedback ----------------------------------------------------------------------------------------------------
interface Feedback {
    id: number
    city: string
    month: string
    year: string
    text: string
    name: string
}

const feedbackContainer = document.getElementById('feedbackContainer') as HTMLElement
const feedbackLoader = document.getElementById('feedbackLoader') as HTMLElement
const feedbackFetchError = document.getElementById('feedbackFetchError') as HTMLElement
const feedbackBtns = document.getElementById('feedbackBtns') as HTMLElement
const feedbackNextBtn = document.getElementById('feedbackNextBtn') as HTMLElement
const feedbackPrevBtn = document.getElementById('feedbackPrevBtn') as HTMLElement

async function fetchFeedback(): Promise<void> {
    try {
        const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/feedback')
        const data = await response.json();
        const feedback: Feedback[] = data.data;
        feedbackLoader.style.display = 'none'

        renderFeedback(feedback)
        slider(
            feedbackContainer,
            '.slide',
            feedbackNextBtn,
            feedbackPrevBtn,
            30
        )
    } catch (error) {
        console.error(error)
        feedbackFetchError.textContent = 'Something went wrong. Please, refresh the page!'
        feedbackBtns.style.display = 'none'
    }
}

function renderFeedback(feedbacks: Feedback[]): void {
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
})

// slider------------------------------------------------------------------------------------------------------
function slider(container: HTMLElement, slideSelector: string, nextBtn: HTMLElement, prevBtn: HTMLElement, gap: number): void {
    const slides = container.querySelectorAll(slideSelector)
    let currentIndex = 0
    const slideWidth = (slides[0] as HTMLElement).offsetWidth + gap

    nextBtn.addEventListener('click', () => {
        currentIndex++
        if (currentIndex >= slides.length) {
            currentIndex = 0
        }
        updateSlider()
    })
    prevBtn.addEventListener('click', () => {
        currentIndex--
        if (currentIndex < 0) {
            currentIndex = slides.length - 1
        }
        updateSlider()
    })
    function updateSlider() {
        container.style.transform = `translateX(-${currentIndex * slideWidth}px)`
    }
}