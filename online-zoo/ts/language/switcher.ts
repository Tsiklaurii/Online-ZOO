import { en } from "./en.js";
import { ka } from "./ka.js";

type Lang = "en" | "ka";

// Shared type for both languages
type Translations = typeof en;
const languages: Record<Lang, Translations> = { en, ka };
const saved = localStorage.getItem("lang");
let currentLang: Lang = saved === "ka" ? "ka" : "en";

// --------------------
// Language control
// --------------------
export function setLanguage(lang: Lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
}

export function getLanguage(): Lang {
    return currentLang;
}

// --------------------
// Typed translator
// --------------------
export function t(key: string): string {
    const translations = languages[currentLang];
    const [section, field] = key.split(".");

    // Ensure section exists
    if (!section || !(section in translations)) {
        return key;
    }

    const sectionObj = translations[section as keyof Translations];

    // Ensure field exists
    if (!field || !(field in sectionObj)) {
        return key;
    }

    return sectionObj[field as keyof typeof sectionObj];
}

// --------------------
// Apply translations to DOM
// --------------------
export function applyTranslations() {
    const elements = document.querySelectorAll<HTMLElement>("[data-i18n]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");

        if (!key) return;

        el.textContent = t(key);
    });
}

// --------------------
// Init switcher
// --------------------
export function initLanguageSwitcher() {
    const enBtn = document.getElementById("langEn") as HTMLButtonElement;
    const kaBtn = document.getElementById("langKa") as HTMLButtonElement;

    function setActive(lang: Lang) {
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