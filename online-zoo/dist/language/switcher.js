import { en } from "./en.js";
import { ka } from "./ka.js";
const languages = { en, ka };
const saved = localStorage.getItem("lang");
let currentLang = saved === "ka" ? "ka" : "en";
// --------------------
// Language control
// --------------------
export function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
}
export function getLanguage() {
    return currentLang;
}
// --------------------
// Typed translator
// --------------------
export function t(key) {
    const translations = languages[currentLang];
    const [section, field] = key.split(".");
    // Ensure section exists
    if (!section || !(section in translations)) {
        return key;
    }
    const sectionObj = translations[section];
    // Ensure field exists
    if (!field || !(field in sectionObj)) {
        return key;
    }
    return sectionObj[field];
}
// --------------------
// Apply translations to DOM
// --------------------
export function applyTranslations() {
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (!key)
            return;
        el.textContent = t(key);
    });
}
// --------------------
// Init switcher
// --------------------
export function initLanguageSwitcher() {
    const enBtn = document.getElementById("langEn");
    const kaBtn = document.getElementById("langKa");
    function setActive(lang) {
        enBtn.classList.toggle("active", lang === "en");
        kaBtn.classList.toggle("active", lang === "ka");
    }
    setActive(getLanguage());
    applyTranslations();
    enBtn.addEventListener("click", () => {
        setLanguage("en");
        setActive("en");
        applyTranslations();
    });
    kaBtn.addEventListener("click", () => {
        setLanguage("ka");
        setActive("ka");
        applyTranslations();
    });
}
initLanguageSwitcher();
//# sourceMappingURL=switcher.js.map