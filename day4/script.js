const textarea = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearBtn = document.querySelector("#clear-btn");
const themeToggle = document.querySelector("#theme-toggle");

const DRAFT_KEY = "day4-draft";
const THEME_KEY = "day4-theme";


function updateCounts() {
    const text = textarea.value;
    const characterCount = text.length;

    const words = text.trim() === ""
        ? 0
        : text.trim().split(/\s+/).length;

    charCount.textContent = `${characterCount} / 200 characters`;
    wordCount.textContent = `${words} words`;

    charCount.classList.remove("warning", "over");

    if (characterCount > 200) {
        charCount.classList.add("over");
    } else if (characterCount > 180) {
        charCount.classList.add("warning");
    }
}


textarea.addEventListener("input", () => {
    updateCounts();
    localStorage.setItem(DRAFT_KEY, textarea.value);
});


clearBtn.addEventListener("click", () => {
    textarea.value = "";

    updateCounts();

    localStorage.removeItem(DRAFT_KEY);

    textarea.focus();
});


textarea.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        textarea.value = "";

        updateCounts();

        localStorage.removeItem(DRAFT_KEY);
    }
});


themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeToggle.textContent = "Light mode";
        localStorage.setItem(THEME_KEY, "dark");
    } else {
        themeToggle.textContent = "Dark mode";
        localStorage.setItem(THEME_KEY, "light");
    }
});


const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft !== null) {
    textarea.value = savedDraft;
}


const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
}


updateCounts();