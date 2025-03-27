async function start() {
    let characterCardBox = document.querySelector("#character-card-box");
    let characterModalBox = document.querySelector("#character-modal-box");

    let characters = await fetchCharacters(); // Теперь возвращает массив

    if (characters.length === 0) {
        characterCardBox.innerHTML = '<p class="text-center text-danger">Ошибка загрузки данных.</p>';
        return;
    }

    characterCardBox.innerHTML = getCharacterCards(characters).join("");
    characterModalBox.innerHTML = getCharacterModals(characters).join("");
}