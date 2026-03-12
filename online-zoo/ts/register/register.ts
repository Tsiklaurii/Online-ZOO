const nameInput = document.getElementById('nameInput') as HTMLInputElement
const loginInput = document.getElementById('loginInput') as HTMLInputElement
const emailInput = document.getElementById('emailInput') as HTMLInputElement
const passwordInput = document.getElementById('passwordInput') as HTMLInputElement
const confirmPasswordInput = document.getElementById('confirmPasswordInput') as HTMLInputElement
const nameError = document.getElementById('nameError') as HTMLElement
const loginError = document.getElementById('loginError') as HTMLElement
const emailError = document.getElementById('emailError') as HTMLElement
const passwordError = document.getElementById('passwordError') as HTMLElement
const confirmPasswordError = document.getElementById('confirmPasswordError') as HTMLElement
const registerBtn = document.getElementById('registerBtn') as HTMLButtonElement

function validateName(value: string): string | null {
    if (value.length < 3) {
        return 'Name must be at least 3 characters'
    }
    if (!/^[A-Za-z]+$/.test(value)) {
        return 'Only English letters allowed'
    }
    return null
}

function validateLogin(value: string): string | null {
    if (value.length < 3) {
        return 'Login must be at least 3 characters'
    }
    if (!/^[A-Za-z]/.test(value)) {
        return 'Login must start with a letter'
    }
    if (!/^[A-Za-z]+$/.test(value)) {
        return 'Only English letters allowed'
    }
    return null
}

function validateEmail(value: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(value)) {
        return 'Enter a valid email'
    }
    return null
}

function validatePassword(value: string): string | null {
    if (value.length < 6) {
        return 'Password must be at least 6 characters'
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return 'Password must contain a special character'
    }
    return null
}

function validateConfirmPassword(password: string, confirm: string): string | null {
    if (password !== confirm) {
        return 'Passwords do not match'
    }
    return null
}

nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value)
    if (error) {
        nameError.textContent = error
        nameInput.classList.add('input_error')
    }
    updateButtonState()
})

loginInput.addEventListener('blur', () => {
    const error = validateLogin(loginInput.value)
    if (error) {
        loginError.textContent = error
        loginInput.classList.add('input_error')
    }
    updateButtonState()
})

emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value)
    if (error) {
        emailError.textContent = error
        emailInput.classList.add('input_error')
    }
    updateButtonState()
})

passwordInput.addEventListener('blur', () => {
    const error = validatePassword(passwordInput.value)
    if (error) {
        passwordError.textContent = error
        passwordInput.classList.add('input_error')
    }
    updateButtonState()
})

confirmPasswordInput.addEventListener('blur', () => {
    const error = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)
    if (error) {
        confirmPasswordError.textContent = error
        confirmPasswordInput.classList.add('input_error')
    }
    updateButtonState()
})

nameInput.addEventListener('focus', () => {
    nameError.textContent = ''
    nameInput.classList.remove('input_error')
})

loginInput.addEventListener('focus', () => {
    loginError.textContent = ''
    loginInput.classList.remove('input_error')
})

emailInput.addEventListener('focus', () => {
    emailError.textContent = ''
    emailInput.classList.remove('input_error')
})

passwordInput.addEventListener('focus', () => {
    passwordError.textContent = ''
    passwordInput.classList.remove('input_error')
})

confirmPasswordInput.addEventListener('focus', () => {
    confirmPasswordError.textContent = ''
    confirmPasswordInput.classList.remove('input_error')
})

nameInput.addEventListener('input', updateButtonState)
loginInput.addEventListener('input', updateButtonState)
emailInput.addEventListener('input', updateButtonState)
passwordInput.addEventListener('input', updateButtonState)
confirmPasswordInput.addEventListener('input', updateButtonState)

function updateButtonState() {
    const nameValid = !validateName(nameInput.value)
    const loginValid = !validateLogin(loginInput.value)
    const emailValid = !validateEmail(emailInput.value)
    const passwordValid = !validatePassword(passwordInput.value)
    const confirmPasswordValid = !validateConfirmPassword(passwordInput.value, confirmPasswordInput.value)
    registerBtn.disabled = !(nameValid && loginValid && emailValid && passwordValid && confirmPasswordValid)
    registerBtn.style.cursor = registerBtn.disabled ? 'default' : 'pointer'
}

registerBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: loginInput.value,
                    password: passwordInput.value,
                    name: nameInput.value,
                    email: emailInput.value
                })
            }
        )
        const data = await response.json()

        if (!response.ok) {
            alert(JSON.stringify(data))
            return
        }
        localStorage.setItem('token', data.data.access_token)
        window.location.href = '../index.html'
    } catch (error) {
        console.error(error)
    }
})