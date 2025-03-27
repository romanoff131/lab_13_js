async function start() {
    let characterCardBox = document.querySelector("#character-card-box");
    let characterModalBox = document.querySelector("#character-modal-box");

    try {
        let characters = await fetchCharacters();
        console.log("Загруженные персонажи:", characters);

        if (characters.length === 0) {
            throw new Error("Данные о персонажах не загружены.");
        }

        characterCardBox.innerHTML = characters.map(getCharacterCard).join("");
        characterModalBox.innerHTML = characters.map(getCharacterModal).join("");
    } catch (error) {
        console.error("Ошибка в start():", error);
        characterCardBox.innerHTML = `<p class="text-center text-danger">Ошибка загрузки данных: ${error.message}</p>`;
    }
}

document.addEventListener("DOMContentLoaded", start);
