const userIcon = document.getElementById('userIcon');
const userPopup = document.getElementById('userPopup');
const userName = document.getElementById('userName');
function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}
function renderUserMenu() {
    const user = getUser();
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
        <div><strong>${user.name}</strong></div>
        <div>${user.email}</div>
        <button id="logoutBtn">Sign Out</button>
    `;
    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        renderUserMenu();
    });
}
userIcon.addEventListener('click', () => {
    userPopup.classList.toggle('hidden');
});
document.addEventListener('DOMContentLoaded', () => {
    renderUserMenu();
});
export {};
//# sourceMappingURL=auth.js.map