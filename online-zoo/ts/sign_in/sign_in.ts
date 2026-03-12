const loginInput = document.getElementById('loginInput') as HTMLInputElement
const passwordInput = document.getElementById('passwordInput') as HTMLInputElement
const loginError = document.getElementById('loginError') as HTMLElement
const passwordError = document.getElementById('passwordError') as HTMLElement
const signInBtn = document.getElementById('signInBtn') as HTMLButtonElement

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

function validatePassword(value: string): string | null {
    if (value.length < 6) {
        return 'Password must be at least 6 characters'
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return 'Password must contain a special character'
    }
    return null
}

loginInput.addEventListener('blur', () => {
    const error = validateLogin(loginInput.value)
    if (error) {
        loginError.textContent = error
        loginInput.classList.add('input_error')
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

loginInput.addEventListener('focus', () => {
    loginError.textContent = ''
    loginInput.classList.remove('input_error')
})

passwordInput.addEventListener('focus', () => {
    passwordError.textContent = ''
    passwordInput.classList.remove('input_error')
})

loginInput.addEventListener('input', updateButtonState)
passwordInput.addEventListener('input', updateButtonState)

function updateButtonState() {
    const loginValid = !validateLogin(loginInput.value)
    const passwordValid = !validatePassword(passwordInput.value)
    signInBtn.disabled = !(loginValid && passwordValid)
    signInBtn.style.cursor = signInBtn.disabled ? 'default' : 'pointer'
}

signInBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    try {
        const response = await fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login: loginInput.value,
                    password: passwordInput.value
                })
            }
        )
        const data = await response.json()

        if (!response.ok) {
            alert("Incorrect login or password, try again!")
            loginInput.value = ''
            passwordInput.value = ''
            signInBtn.disabled = true
            return
        }
        localStorage.setItem('token', data.data.access_token)
        window.location.href = '../index.html'
    } catch (error) {
        console.error(error)
    }
})