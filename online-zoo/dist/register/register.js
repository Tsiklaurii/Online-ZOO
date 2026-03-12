var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const nameInput = document.getElementById('nameInput');
const loginInput = document.getElementById('loginInput');
const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const nameError = document.getElementById('nameError');
const loginError = document.getElementById('loginError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const registerBtn = document.getElementById('registerBtn');
function validateName(value) {
    if (value.length < 3) {
        return 'Name must be at least 3 characters';
    }
    if (!/^[A-Za-z]+$/.test(value)) {
        return 'Only English letters allowed';
    }
    return null;
}
function validateLogin(value) {
    if (value.length < 3) {
        return 'Login must be at least 3 characters';
    }
    if (!/^[A-Za-z]/.test(value)) {
        return 'Login must start with a letter';
    }
    if (!/^[A-Za-z]+$/.test(value)) {
        return 'Only English letters allowed';
    }
    return null;
}
function validateEmail(value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
        return 'Enter a valid email';
    }
    return null;
}
function validatePassword(value) {
    if (value.length < 6) {
        return 'Password must be at least 6 characters';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return 'Password must contain a special character';
    }
    return null;
}
function validateConfirmPassword(password, confirm) {
    if (password !== confirm) {
        return 'Passwords do not match';
    }
    return null;
}
nameInput.addEventListener('blur', () => {
    const error = validateName(nameInput.value);
    if (error) {
        nameError.textContent = error;
        nameInput.classList.add('input_error');
    }
    updateButtonState();
});
loginInput.addEventListener('blur', () => {
    const error = validateLogin(loginInput.value);
    if (error) {
        loginError.textContent = error;
        loginInput.classList.add('input_error');
    }
    updateButtonState();
});
emailInput.addEventListener('blur', () => {
    const error = validateEmail(emailInput.value);
    if (error) {
        emailError.textContent = error;
        emailInput.classList.add('input_error');
    }
    updateButtonState();
});
passwordInput.addEventListener('blur', () => {
    const error = validatePassword(passwordInput.value);
    if (error) {
        passwordError.textContent = error;
        passwordInput.classList.add('input_error');
    }
    updateButtonState();
});
confirmPasswordInput.addEventListener('blur', () => {
    const error = validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    if (error) {
        confirmPasswordError.textContent = error;
        confirmPasswordInput.classList.add('input_error');
    }
    updateButtonState();
});
nameInput.addEventListener('focus', () => {
    nameError.textContent = '';
    nameInput.classList.remove('input_error');
});
loginInput.addEventListener('focus', () => {
    loginError.textContent = '';
    loginInput.classList.remove('input_error');
});
emailInput.addEventListener('focus', () => {
    emailError.textContent = '';
    emailInput.classList.remove('input_error');
});
passwordInput.addEventListener('focus', () => {
    passwordError.textContent = '';
    passwordInput.classList.remove('input_error');
});
confirmPasswordInput.addEventListener('focus', () => {
    confirmPasswordError.textContent = '';
    confirmPasswordInput.classList.remove('input_error');
});
nameInput.addEventListener('input', updateButtonState);
loginInput.addEventListener('input', updateButtonState);
emailInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);
confirmPasswordInput.addEventListener('input', updateButtonState);
function updateButtonState() {
    const nameValid = !validateName(nameInput.value);
    const loginValid = !validateLogin(loginInput.value);
    const emailValid = !validateEmail(emailInput.value);
    const passwordValid = !validatePassword(passwordInput.value);
    const confirmPasswordValid = !validateConfirmPassword(passwordInput.value, confirmPasswordInput.value);
    registerBtn.disabled = !(nameValid && loginValid && emailValid && passwordValid && confirmPasswordValid);
    registerBtn.style.cursor = registerBtn.disabled ? 'default' : 'pointer';
}
registerBtn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const response = yield fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/register', {
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
        });
        const data = yield response.json();
        if (!response.ok) {
            alert(JSON.stringify(data));
            return;
        }
        localStorage.setItem('token', data.data.access_token);
        window.location.href = '../index.html';
    }
    catch (error) {
        console.error(error);
    }
}));
export {};
//# sourceMappingURL=register.js.map