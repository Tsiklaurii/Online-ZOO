const userIcon = document.getElementById('userIcon') as HTMLElement
const userPopup = document.getElementById('userPopup') as HTMLElement
const userName = document.getElementById('userName') as HTMLElement

interface User {
    name: string
    email: string
}

function getUser(): User | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
}

function renderUserMenu(): void {
    const user = getUser()

    if (!user) {
        userPopup.innerHTML = `
            <a href="./pages/sign_in.html">Sign In</a>
            <a href="./pages/registration.html">Registration</a>
        `
        userName.textContent = ''
        return
    }
    userName.textContent = user.name

    userPopup.innerHTML = `
        <div><strong>${user.name}</strong></div>
        <div>${user.email}</div>
        <button id="logoutBtn">Sign Out</button>
    `
    const logoutBtn = document.getElementById('logoutBtn')

    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('user')
        renderUserMenu()
    })
}
userIcon.addEventListener('click', () => {
    userPopup.classList.toggle('hidden')
})
document.addEventListener('DOMContentLoaded', () => {
    renderUserMenu()
})