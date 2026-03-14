interface User {
    name: string
    email: string
    login: string
}

const donateBtn = document.getElementById("donateBtn") as HTMLButtonElement;
const donationPopup2 = document.getElementById("donationPopup2") as HTMLDivElement;

function openDonationPopup2(): void {
    donationPopup2.classList.add("active");
    document.body.classList.add("no_scroll");
}
donateBtn?.addEventListener("click", openDonationPopup2);

// close function!!

interface Pet {
    id: number
    name: string
    commonName: string
    description: string
}

const petsSelect = document.getElementById("pets") as HTMLSelectElement;

async function fetchPets(): Promise<void> {
    try {
        const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets')
        const data = await response.json();
        const pets: Pet[] = data.data;

        pets.forEach(pet => {
            const option = document.createElement('option')
            option.value = String(pet.id)
            option.textContent = `${pet.name} the ${pet.commonName}`
            petsSelect.appendChild(option);
        })

    } catch (error) {
        console.error(error)
        const option = document.createElement("option")
        option.textContent = "Something went wrong. Refresh the page!"
        petsSelect.appendChild(option)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchPets();
})

// STEP 1 LOGIC ---------------------------------------------------------------------------------------------

const amountButtons = document.querySelectorAll<HTMLButtonElement>('.amount_btn')
const otherAmountInput = document.getElementById('otherAmount') as HTMLInputElement
const step1NextBtn = document.getElementById('step1NextBtn') as HTMLButtonElement
let selectedAmount: string | null = null

function validateOtherAmount(value: string): string | null {
    if (value === '') {
        return null
    }
    if (!/^[0-9]+$/.test(value)) {
        return 'Only numbers are allowed'
    }
    if (Number(value) <= 0) {
        return 'Amount must be greater than 0'
    }
    return null
}

const otherAmountError = document.createElement('p')
otherAmountInput.after(otherAmountError)

otherAmountInput.addEventListener('blur', () => {
    const error = validateOtherAmount(otherAmountInput.value)
    if (error) {
        otherAmountError.textContent = error
        otherAmountError.style.color = 'red'
        otherAmountInput.classList.add('input_error')
    }
    updateButtonState()
})

otherAmountInput.addEventListener('focus', () => {
    otherAmountError.textContent = ''
    otherAmountInput.classList.remove('input_error')
})

amountButtons.forEach(button => {
    button.addEventListener('click', () => {
        amountButtons.forEach(btn => btn.classList.remove('active'))
        button.classList.add('active')
        selectedAmount = button.dataset.amount || null
        otherAmountInput.value = ''
        updateButtonState()
    })
})

otherAmountInput.addEventListener('input', () => {
    const error = validateOtherAmount(otherAmountInput.value)
    if (!error && otherAmountInput.value !== '') {
        amountButtons.forEach(btn => btn.classList.remove('active'))
        selectedAmount = null
    }
    updateButtonState()
})

petsSelect.addEventListener('change', updateButtonState)

function updateButtonState() {
    const otherAmountValid = !validateOtherAmount(otherAmountInput.value)
    const petSelected = petsSelect.value !== ''
    const amountValid = selectedAmount !== null || (otherAmountInput.value !== '' && otherAmountValid)
    step1NextBtn.disabled = !(amountValid && petSelected)
    step1NextBtn.style.cursor = step1NextBtn.disabled ? 'default' : 'pointer'
}

const step1 = document.getElementById('step1') as HTMLFormElement
const step2 = document.getElementById('step2') as HTMLFormElement
const step3 = document.getElementById('step3') as HTMLFormElement

function goToStep2() {
    step1.classList.remove('active')
    step2.classList.add('active')
}
step1NextBtn.addEventListener('click', goToStep2)

// STEP 2------------------------------------------------------------------------------------------------------

const fullNameInput = document.getElementById('fullName') as HTMLInputElement
const emailInput = document.getElementById('email') as HTMLInputElement
const step2NextBtn = document.getElementById('step2NextBtn') as HTMLButtonElement

const nameError = document.createElement('p')
const emailError = document.createElement('p')

fullNameInput.after(nameError)
emailInput.after(emailError)

function validateName(value: string): string | null {
    if (value.trim().length < 3) {
        return 'Name must contain at least 3 characters'
    }
    if (!/^[A-Za-z\s]+$/.test(value)) {
        return 'Only letters and spaces allowed'
    }
    return null
}

function validateEmail(value: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
        return 'Invalid email format'
    }
    return null
}

fullNameInput.addEventListener('blur', () => {
    const error = validateName(fullNameInput.value)
    if (error) {
        nameError.textContent = error
        nameError.style.color = 'red'
        fullNameInput.classList.add('input_error')
    }
    updateStep2ButtonState()
})

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value)
    if (error) {
        emailError.textContent = error
        emailError.style.color = 'red'
        emailInput.classList.add('input_error')
    }
    updateStep2ButtonState()
})

fullNameInput.addEventListener('focus', () => {
    nameError.textContent = ''
    fullNameInput.classList.remove('input_error')
})

emailInput.addEventListener('focus', () => {
    emailError.textContent = ''
    emailInput.classList.remove('input_error')
})

fullNameInput.addEventListener('input', updateStep2ButtonState)
emailInput.addEventListener('input', updateStep2ButtonState)

function updateStep2ButtonState() {

    const nameValid = !validateName(fullNameInput.value)
    const emailValid = !validateEmail(emailInput.value)

    step2NextBtn.disabled = !(nameValid && emailValid)
    step2NextBtn.style.cursor = step2NextBtn.disabled ? 'default' : 'pointer'
}

function goToStep3() {
    step2.classList.remove('active')
    step3.classList.add('active')
}

step2NextBtn.addEventListener('click', goToStep3)

async function getUser(): Promise<User | null> {
    const token = localStorage.getItem('token')
    if (!token) return null
    try {
        const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/profile',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        if (!response.ok) {
            localStorage.removeItem('token')
            return null
        }
        const json = await response.json()
        return json.data
    } catch (error) {
        console.error(error)
        return null
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const user = await getUser()
    if (!user) return
    fullNameInput.value = user.name
    emailInput.value = user.email
    updateStep2ButtonState()
})

// STEP 3 ---------------------------------------------------------------------------------

const cardInput = document.getElementById('card') as HTMLInputElement
const cvvInput = document.getElementById('cvv') as HTMLInputElement
const monthInput = document.getElementById('month') as HTMLInputElement
const yearInput = document.getElementById('year') as HTMLInputElement
const completeDonationBtn = document.getElementById('completeDonation') as HTMLButtonElement

const cardError = document.createElement('p')
const cvvError = document.createElement('p')
const dateError = document.createElement('p')

cardInput.after(cardError)
cvvInput.after(cvvError)
yearInput.after(dateError)

function validateCardNumber(value: string): string | null {
    if (!/^\d{16}$/.test(value)) {
        return 'Card number must be exactly 16 digits'
    }
    return null
}

function validateCVV(value: string): string | null {
    if (!/^\d{3}$/.test(value)) {
        return 'CVV must be exactly 3 digits'
    }
    return null
}

function validateMonth(month: string): string | null {
    if (!/^\d+$/.test(month)) {
        return 'Month must be a number'
    }
    const mm = Number(month)
    if (mm < 1 || mm > 12) {
        return 'Month must be between 1 and 12'
    }
    return null
}

function validateYear(year: string): string | null {
    if (!/^\d+$/.test(year)) {
        return 'Year must be a number'
    }
    if (!/^\d{2}$/.test(year)) {
        return 'Enter the last 2 digits of the year'
    }
    const yy = Number(year)
    const currentYear = new Date().getFullYear() % 100
    if (yy < currentYear) {
        return 'Card has expired'
    }
    return null
}

cardInput.addEventListener('blur', () => {
    const error = validateCardNumber(cardInput.value)
    cardError.textContent = error || ''
    cardError.style.color = 'red'
    cardInput.classList.toggle('input_error', !!error)
    updateStep3ButtonState()
})

cvvInput.addEventListener('blur', () => {
    const error = validateCVV(cvvInput.value)
    cvvError.textContent = error || ''
    cvvError.style.color = 'red'
    cvvInput.classList.toggle('input_error', !!error)
    updateStep3ButtonState()
})

monthInput.addEventListener('blur', () => {
    const monthError = validateMonth(monthInput.value)
    const yearError = validateYear(yearInput.value)
    const error = monthError || yearError

    dateError.textContent = error || ''
    dateError.style.color = 'red'
    monthInput.classList.toggle('input_error', !!error)
    yearInput.classList.toggle('input_error', !!error)
    updateStep3ButtonState()
})

yearInput.addEventListener('blur', () => {
    const monthError = validateMonth(monthInput.value)
    const yearError = validateYear(yearInput.value)
    const error = monthError || yearError

    dateError.textContent = error || ''
    dateError.style.color = 'red'
    monthInput.classList.toggle('input_error', !!error)
    yearInput.classList.toggle('input_error', !!error)
    updateStep3ButtonState()
})

cardInput.addEventListener('focus', () => {
    cardError.textContent = ''
    cardInput.classList.remove('input_error')
})

cvvInput.addEventListener('focus', () => {
    cvvError.textContent = ''
    cvvInput.classList.remove('input_error')
})

monthInput.addEventListener('focus', () => {
    dateError.textContent = ''
    monthInput.classList.remove('input_error')
    yearInput.classList.remove('input_error')
})

yearInput.addEventListener('focus', () => {
    dateError.textContent = ''
    monthInput.classList.remove('input_error')
    yearInput.classList.remove('input_error')
})

function updateStep3ButtonState(): void {
    const cardValid = !validateCardNumber(cardInput.value)
    const cvvValid = !validateCVV(cvvInput.value)
    const monthValid = !validateMonth(monthInput.value)
    const yearValid = !validateYear(yearInput.value)

    completeDonationBtn.disabled = !(cardValid && cvvValid && monthValid && yearValid)
    completeDonationBtn.style.cursor = completeDonationBtn.disabled ? 'default' : 'pointer'
}

cardInput.addEventListener('input', updateStep3ButtonState)
cvvInput.addEventListener('input', updateStep3ButtonState)
monthInput.addEventListener('input', updateStep3ButtonState)
yearInput.addEventListener('input', updateStep3ButtonState)

// saved cards -------------------------------------------------------------------------------------------

const savedCardsKey = 'savedCards'
const saveCardContainer = document.getElementById('saveCardContainer') as HTMLDivElement

document.addEventListener('DOMContentLoaded', async () => {
    const user = await getUser()
    if (!user) return

    const saveCardCheckbox = document.createElement('input')
    saveCardCheckbox.type = 'checkbox'
    saveCardCheckbox.id = 'saveCardCheckbox'

    const saveCardLabel = document.createElement('label')
    saveCardLabel.htmlFor = 'saveCardCheckbox'
    saveCardLabel.textContent = 'Save card info for future donations'

    saveCardContainer.appendChild(saveCardCheckbox)
    saveCardContainer.appendChild(saveCardLabel)

    step3.querySelector('.inputs')?.prepend(saveCardContainer)

    const savedCards: { name: string, card: string, cvv: string, month: string, year: string }[] = JSON.parse(localStorage.getItem(savedCardsKey) || '[]')

    if (savedCards.length > 0) {
        const select = document.createElement('select')
        select.id = 'savedCardsSelect'
        select.classList = 'saved_cards_select'
        const defaultOption = document.createElement('option')
        defaultOption.value = ''
        defaultOption.textContent = 'Select saved card'
        select.appendChild(defaultOption)

        savedCards.forEach((c, index) => {
            const option = document.createElement('option')
            option.value = String(index)
            const masked = c.card.slice(0, 4) + ' **** **** ' + c.card.slice(-4)
            option.textContent = `${masked}`
            select.appendChild(option)
        })

        step3.querySelector('.inputs')?.prepend(select)

        select.addEventListener('change', () => {
            const idx = Number(select.value)
            if (!isNaN(idx) && savedCards[idx]) {
                const c = savedCards[idx]
                cardInput.value = c.card
                cvvInput.value = c.cvv
                monthInput.value = c.month
                yearInput.value = c.year
                updateStep3ButtonState()
            } else {
                cardInput.value = ''
                cvvInput.value = ''
                monthInput.value = ''
                yearInput.value = ''
                updateStep3ButtonState()
            }
        })
    }
})

// post---------------------------------------------------------------------------------------------------

completeDonationBtn.addEventListener('click', async () => {
    const cardValid = !validateCardNumber(cardInput.value)
    const cvvValid = !validateCVV(cvvInput.value)
    const monthValid = !validateMonth(monthInput.value)
    const yearValid = !validateYear(yearInput.value)

    if (!(cardValid && cvvValid && monthValid && yearValid)) return

    const amount = selectedAmount || otherAmountInput.value
    const petOption = petsSelect.selectedOptions[0]
    const petName = petOption?.textContent || 'your chosen pet'
    const petId = petOption?.value

    const donationData = {
        name: fullNameInput.value,
        email: emailInput.value,
        amount: Number(amount),
        petId: Number(petId)
    }

    const saveCardCheckbox = document.getElementById('saveCardCheckbox') as HTMLInputElement | null
    if (saveCardCheckbox?.checked) {
        const savedCards: { name: string, card: string, cvv: string, month: string, year: string }[] =
            JSON.parse(localStorage.getItem(savedCardsKey) || '[]')

        const newCard = {
            name: fullNameInput.value,
            card: cardInput.value,
            cvv: cvvInput.value,
            month: monthInput.value,
            year: yearInput.value
        }

        if (!savedCards.some(c => c.card === newCard.card)) {
            savedCards.push(newCard)
            localStorage.setItem(savedCardsKey, JSON.stringify(savedCards))
        }
    }

    try {
        const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/donations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(donationData)
        })

        if (!response.ok) throw new Error('Donation failed')

        alert(`Thank you for your donation of ${amount} to ${petName}!`)
        window.location.href = 'index.html'

        cardInput.value = ''
        cvvInput.value = ''
        monthInput.value = ''
        yearInput.value = ''
        updateStep3ButtonState()
    } catch (error) {
        console.error(error)
        alert('Something went wrong. Please, try again later.')
    }
})

//back buttons ---------------------------------------------------------------------------------------------

const step2BackBtn = document.getElementById('step2BackBtn') as HTMLButtonElement
step2BackBtn.addEventListener('click', () => {
    step2.classList.remove('active')
    step1.classList.add('active')
})

const step3BackBtn = document.getElementById('step3BackBtn') as HTMLButtonElement
step3BackBtn.addEventListener('click', () => {
    step3.classList.remove('active')
    step2.classList.add('active')
})