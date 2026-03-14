var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const userIcon = document.getElementById('userIcon');
const userPopup = document.getElementById('userPopup');
const userName = document.getElementById('userName');
function getUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem('token');
        if (!token)
            return null;
        try {
            const response = yield fetch('https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/auth/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!response.ok) {
                localStorage.removeItem('token');
                return null;
            }
            const json = yield response.json();
            return json.data;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    });
}
function renderUserMenu() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield getUser();
        if (!user) {
            userPopup.innerHTML = `
            <a href="./pages/sign_in.html">Sign In</a>
            <a href="./pages/registration.html">Registration</a>
        `;
            userName.textContent = '';
            return;
        }
        userName.textContent = user.name;
        userPopup.innerHTML = `
        <div class="user_name">${user.name}</div>
        <div>${user.email}</div>
        <button id="logoutBtn" class="sign_out">Sign Out</button>
    `;
        const logoutBtn = document.getElementById('logoutBtn');
        logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('token');
            window.location.href = './index.html';
            renderUserMenu();
        });
    });
}
userIcon.addEventListener('click', () => {
    userPopup.classList.toggle('hidden');
});
document.addEventListener('DOMContentLoaded', () => {
    renderUserMenu();
});
document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target) && !userPopup.contains(e.target)) {
        userPopup.classList.add('hidden');
    }
});
export {};
//# sourceMappingURL=auth.js.map