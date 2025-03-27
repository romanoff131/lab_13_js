/**
 * Получить карточку персонажа
 *
 * @param character
 * @returns {string}
 */
function getCharacterCard(character) {
    return `
        <div class="card mb-3 col-sm-12 col-md-6 col-lg-4">
            <div class="row g-0">
                <div class="col-4">
                    <img src="${character.thumbnail}"
                         style="max-width: 100%;"
                         alt="${character.name}"
                    >
                </div>
                <div class="col-8">
                    <div class="card-body">
                        <h5 class="card-title">${character.name}</h5>
                        <button type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal-${character.id}"
                                class="btn btn-secondary btn-sm"
                        >Подробнее</button>
                    </div>
                </div>
            </div>
        </div>
        `;
}

/**
 * Получить модальное окно персонажа
 *
 * @param character
 * @returns {string}
 */
function getCharacterModal(character) {
    return `
        <div id="exampleModal-${character.id}"
             tabindex="-1"
             aria-labelledby="exampleModalLabel-${character.id}"
             class="modal fade"
             style="display: none;" 
             aria-hidden="true"
        >
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">${character.name}</h5>
                        <button type="button"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                class="btn-close"
                        ></button>
                    </div>
                    <div class="modal-body">
                        <img src="${character.thumbnail}"
                             style="max-width: 100%;"
                             alt="${character.name}"
                        >
                        <div>
                            <p class="text-muted">${character.modified}</p>
                            <h5>Описание:</h5>
                            <p>${character.description}</p>
                        </div>

                        <div class="modal-footer">
                            <button type="button"
                                    data-bs-dismiss="modal"
                                    class="btn btn-secondary btn-sm"
                            >Закрыть</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
}

/**
 * Получить информацию о персонажах с API Marvel
 */
async function fetchCharacters() {
    const publicKey = "5d3eb0566587bd3984363d42e6176770";
    const privateKey = "400f43a6baf239031c0c639cd7c5e2371f1ec89e"; // В реальном приложении его нельзя публиковать!
    const ts = new Date().getTime(); 
    const hash = md5(ts + privateKey + publicKey);

    const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    console.log("Запрос отправляется на API:", apiUrl);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка HTTP: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        console.log("Ответ API:", data);

        if (!data.data || !data.data.results || data.data.results.length === 0) {
            throw new Error("API вернуло пустые данные.");
        }

        return data.data.results.map(character => ({
            id: character.id,
            name: character.name,
            thumbnail: `${character.thumbnail.path}.${character.thumbnail.extension}`,
            description: character.description || "Описание отсутствует",
            modified: character.modified
        }));
    } catch (error) {
        console.error("Ошибка получения данных:", error);
        return [];
    }
}