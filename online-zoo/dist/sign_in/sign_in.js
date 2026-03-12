var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loginInput = document.getElementById('loginInput');
const passwordInput = document.getElementById('passwordInput');
const loginError = document.getElementById('loginError');
const passwordError = document.getElementById('passwordError');
const signInBtn = document.getElementById('signInBtn');
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
function validatePassword(value) {
    if (value.length < 6) {
        return 'Password must be at least 6 characters';
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return 'Password must contain a special character';
    }
    return null;
}
loginInput.addEventListener('blur', () => {
    const error = validateLogin(loginInput.value);
    if (error) {
        loginError.textContent = error;
        loginInput.classList.add('input_error');
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
loginInput.addEventListener('focus', () => {
    loginError.textContent = '';
    loginInput.classList.remove('input_error');
});
passwordInput.addEventListener('focus', () => {
    passwordError.textContent = '';
    passwordInput.classList.remove('input_error');
});
loginInput.addEventListener('input', updateButtonState);
passwordInput.addEventListener('input', updateButtonState);
function updateButtonState() {
    const loginValid = !validateLogin(loginInput.value);
    const passwordValid = !validatePassword(passwordInput.value);
    signInBtn.disabled = !(loginValid && passwordValid);
    signInBtn.style.cursor = signInBtn.disabled ? 'default' : 'pointer';
}
signInBtn.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    try {
        const response = yield fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: loginInput.value,
                password: passwordInput.value
            })
        });
        const data = yield response.json();
        if (!response.ok) {
            alert("Incorrect login or password, try again!");
            loginInput.value = '';
            passwordInput.value = '';
            signInBtn.disabled = true;
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
//# sourceMappingURL=sign_in.js.map