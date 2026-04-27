const userIcon = document.getElementById('userIcon') as HTMLElement
const userPopup = document.getElementById('userPopup') as HTMLElement
const userName = document.getElementById('userName') as HTMLElement

interface User {
    name: string
    email: string
    login: string
}

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

async function renderUserMenu(): Promise<void> {
    const user = await getUser()

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
        <div class="user_name">${user.name}</div>
        <div>${user.email}</div>
        <button id="logoutBtn" class="sign_out">Sign Out</button>
    `
    const logoutBtn = document.getElementById('logoutBtn')
    logoutBtn?.addEventListener('click', () => {
        localStorage.removeItem('token')
        window.location.href = './index.html'
        renderUserMenu()
    })
}
userIcon.addEventListener('click', () => {
    userPopup.classList.toggle('hidden')
})

document.addEventListener('DOMContentLoaded', () => {
    renderUserMenu()
})

document.addEventListener('click', (e) => {
    if (!userIcon.contains(e.target as Node) && !userPopup.contains(e.target as Node)) {
        userPopup.classList.add('hidden')
    }
})