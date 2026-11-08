let words = [];

let currentIndex =
    Number(localStorage.getItem("currentIndex")) || 0;

let learnedWords =
    JSON.parse(
        localStorage.getItem("learnedWords")
    ) || [];

const wordEl =
    document.getElementById("word");

const meaningEl =
    document.getElementById("meaning");

const exampleEl =
    document.getElementById("example");

const translationEl =
    document.getElementById("translation");

const countEl =
    document.getElementById("count");

// 保存
function saveData() {

    localStorage.setItem(
        "currentIndex",
        currentIndex
    );

    localStorage.setItem(
        "learnedWords",
        JSON.stringify(learnedWords)
    );
}

// 表示
function displayWord() {

    if (words.length === 0) {
        return;
    }

    if (currentIndex >= words.length) {

        wordEl.textContent =
            "学習完了 🎉";

        meaningEl.textContent = "";

        exampleEl.textContent = "";

        translationEl.textContent = "";

        return;
    }

    const item = words[currentIndex];

    wordEl.textContent =
        item.word;

    meaningEl.textContent =
        item.meaning;

    exampleEl.textContent =
        item.example;

    translationEl.textContent =
        item.translation;

    exampleEl.classList.add("hidden");
    translationEl.classList.add("hidden");

    countEl.textContent =
        learnedWords.length;
}

// 次の単語
function nextWord() {

    currentIndex++;

    saveData();

    displayWord();
}

// 答えを見る
document
.getElementById("showBtn")
.addEventListener("click", () => {

    exampleEl.classList.remove("hidden");

    translationEl.classList.remove("hidden");

});

// 覚えた
document
.getElementById("knownBtn")
.addEventListener("click", () => {

    const currentWord =
        words[currentIndex].word;

    if (
        !learnedWords.includes(currentWord)
    ) {
        learnedWords.push(currentWord);
    }

    saveData();

    nextWord();

});

// 未習得
document
.getElementById("unknownBtn")
.addEventListener("click", () => {

    nextWord();

});

// 次の単語へ
document
.getElementById("nextBtn")
.addEventListener("click", () => {

    nextWord();

});

// ダークモード復元
if (
    localStorage.getItem("theme")
    === "dark"
) {

    document.body.classList.add("dark");

}

// ダークモード切替
document
.getElementById("themeBtn")
.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
            ? "dark"
            : "light"
    );

});

// JSON読込
async function loadWords() {

    try {

        const response =
            await fetch("./words.json");

        words =
            await response.json();

        displayWord();

    } catch (error) {

        console.error(error);

        wordEl.textContent =
            "単語データの読み込みに失敗しました";

    }

}

loadWords();

if ("serviceWorker" in navigator) {

    window.addEventListener(
        "load",
        () => {

            navigator.serviceWorker.register(
                "./service-worker.js"
            )
            .then(() => {
                console.log(
                    "Service Worker 登録完了"
                );
            });

        }
    );

}