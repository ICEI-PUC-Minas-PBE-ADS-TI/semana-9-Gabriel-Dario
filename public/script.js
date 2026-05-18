const data = {
    produtos: [
        {
            id: 1,
            nome: "Box Naruto Clássico",
            preco: 129.9,
            categoria: "Mangás",
            imagem: "assets/naruto-box.svg",
            descricao: "Box inspirado em Naruto, ideal para começar uma coleção de mangás de ação, aventura e amizade.",
            emEstoque: true
        },
        {
            id: 2,
            nome: "Mangá One Piece Vol. 1",
            preco: 34.9,
            categoria: "Mangás",
            imagem: "assets/one-piece.svg",
            descricao: "Primeiro volume da aventura de piratas mais conhecida dos animes, com foco em jornada e companheirismo.",
            emEstoque: true
        },
        {
            id: 3,
            nome: "Figure Luffy Gear 5",
            preco: 189.9,
            categoria: "Colecionáveis",
            imagem: "assets/luffy-figure.svg",
            descricao: "Action figure decorativa do Luffy para estante, setup gamer ou coleção de personagens de anime.",
            emEstoque: false
        },
        {
            id: 4,
            nome: "Figure Tanjiro Kamado",
            preco: 159.9,
            categoria: "Colecionáveis",
            imagem: "assets/tanjiro-figure.svg",
            descricao: "Miniatura inspirada em Demon Slayer, com visual de batalha e acabamento para exposição.",
            emEstoque: true
        },
        {
            id: 5,
            nome: "Camiseta Attack on Titan",
            preco: 79.9,
            categoria: "Vestuário",
            imagem: "assets/attack-shirt.svg",
            descricao: "Camiseta temática de Attack on Titan, feita para quem curte animes de ação e fantasia sombria.",
            emEstoque: true
        },
        {
            id: 6,
            nome: "Moletom Jujutsu Kaisen",
            preco: 139.9,
            categoria: "Vestuário",
            imagem: "assets/jujutsu-hoodie.svg",
            descricao: "Moletom confortável com identidade visual inspirada em Jujutsu Kaisen para usar no dia a dia.",
            emEstoque: true
        },
        {
            id: 7,
            nome: "Pôster Death Note",
            preco: 24.9,
            categoria: "Decoração",
            imagem: "assets/death-note-poster.svg",
            descricao: "Pôster decorativo de Death Note para quarto, área de estudos ou espaço de coleção.",
            emEstoque: false
        },
        {
            id: 8,
            nome: "Chaveiro Studio Ghibli",
            preco: 19.9,
            categoria: "Acessórios",
            imagem: "assets/ghibli-keychain.svg",
            descricao: "Chaveiro colecionável inspirado na estética dos filmes do Studio Ghibli.",
            emEstoque: true
        }
    ]
};

const productList = document.getElementById("product-list");
const productDetails = document.getElementById("product-details");
const resultCount = document.getElementById("result-count");
const summary = document.getElementById("summary");
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const renderButton = document.querySelector("#btnRender");

function formatPrice(preco) {
    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function createProductCard(produto) {
    const card = document.createElement("article");
    card.setAttribute("data-id", produto.id);
    card.classList.add("product-card", "card");
    card.style.borderTop = produto.emEstoque ? "4px solid #16a34a" : "4px solid #dc2626";

    const image = document.createElement("img");
    image.setAttribute("src", produto.imagem);
    image.setAttribute("alt", produto.nome);
    image.classList.add("product-image");

    const content = document.createElement("div");
    content.classList.add("product-content");

    const title = document.createElement("h3");
    title.classList.add("card-title");
    title.innerText = produto.nome;

    const category = document.createElement("span");
    category.classList.add("product-category");
    category.innerText = produto.categoria;

    const price = document.createElement("p");
    price.classList.add("product-price");
    price.innerText = formatPrice(produto.preco);

    const stock = document.createElement("p");
    stock.classList.add("stock", produto.emEstoque ? "available" : "unavailable");
    stock.innerText = produto.emEstoque ? "Em estoque" : "Indisponível";

    const actions = document.createElement("div");
    actions.classList.add("card-actions");

    const detailsButton = document.createElement("button");
    detailsButton.setAttribute("type", "button");
    detailsButton.innerText = "Ver detalhes";
    detailsButton.addEventListener("click", () => showProductDetails(produto));

    const highlightButton = document.createElement("button");
    highlightButton.setAttribute("type", "button");
    highlightButton.innerText = "Destacar";
    highlightButton.addEventListener("click", () => {
        card.classList.add("highlight");
        console.log(`Produto destacado: ${produto.nome}`);
    });

    actions.appendChild(detailsButton);
    actions.appendChild(highlightButton);
    content.appendChild(title);
    content.appendChild(category);
    content.appendChild(price);
    content.appendChild(stock);
    content.appendChild(actions);
    card.appendChild(image);
    card.appendChild(content);

    return card;
}

function renderProducts(produtos) {
    productList.innerHTML = "";
    resultCount.innerText = `${produtos.length} ${produtos.length === 1 ? "item" : "itens"}`;

    if (produtos.length === 0) {
        productList.innerHTML = "<p class='empty-state'>Nenhum produto encontrado.</p>";
        return;
    }

    produtos.forEach((produto) => {
        productList.appendChild(createProductCard(produto));
    });

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        console.log(`Card renderizado com data-id: ${card.getAttribute("data-id")}`);
        card.style.minHeight = "100%";
    });
}

function renderCategories() {
    const categorias = [...new Set(data.produtos.map((produto) => produto.categoria))];

    categorySelect.innerHTML = "<option value='Todas'>Todas</option>";
    categorias.forEach((categoria) => {
        const option = document.createElement("option");
        option.setAttribute("value", categoria);
        option.innerText = categoria;
        categorySelect.appendChild(option);
    });
}

function showProductDetails(produto) {
    productDetails.innerHTML = `
        <h2>${produto.nome}</h2>
        <p>${produto.descricao}</p>
        <div class="details-grid">
            <div>
                <span>Preço</span>
                <strong>${formatPrice(produto.preco)}</strong>
            </div>
            <div>
                <span>Categoria</span>
                <strong>${produto.categoria}</strong>
            </div>
            <div>
                <span>Estoque</span>
                <strong>${produto.emEstoque ? "Disponível" : "Indisponível"}</strong>
            </div>
            <div>
                <span>ID</span>
                <strong>${produto.id}</strong>
            </div>
        </div>
    `;

    console.log("Detalhes exibidos:", produto);
}

function filterProducts() {
    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categorySelect.value;

    return data.produtos.filter((produto) => {
        const matchesSearch = produto.nome.toLowerCase().includes(searchText);
        const matchesCategory = selectedCategory === "Todas" || produto.categoria === selectedCategory;
        return matchesSearch && matchesCategory;
    });
}

function renderSummary() {
    const totalProdutos = data.produtos.length;
    const totalCategorias = new Set(data.produtos.map((produto) => produto.categoria)).size;
    const emEstoque = data.produtos.filter((produto) => produto.emEstoque).length;
    const maiorPreco = data.produtos.reduce((maior, produto) => produto.preco > maior.preco ? produto : maior);

    summary.innerHTML = `
        <div class="summary-item">
            <span>Produtos</span>
            <strong>${totalProdutos}</strong>
        </div>
        <div class="summary-item">
            <span>Categorias</span>
            <strong>${totalCategorias}</strong>
        </div>
        <div class="summary-item">
            <span>Em estoque</span>
            <strong>${emEstoque}</strong>
        </div>
        <div class="summary-item">
            <span>Maior preço</span>
            <strong>${formatPrice(maiorPreco.preco)}</strong>
        </div>
    `;
}

function updateCatalog() {
    renderProducts(filterProducts());
}

searchInput.addEventListener("input", updateCatalog);
categorySelect.addEventListener("change", updateCatalog);
renderButton.addEventListener("click", updateCatalog);

renderCategories();
renderSummary();
renderProducts(data.produtos);

const params = new URLSearchParams(window.location.search);
const productIdFromUrl = Number(params.get("produto"));
const productFromUrl = data.produtos.find((produto) => produto.id === productIdFromUrl);
const isPrintDetails = params.get("print") === "detalhe";

if (productFromUrl) {
    showProductDetails(productFromUrl);
    if (isPrintDetails) {
        document.body.classList.add("print-details");
    } else {
        requestAnimationFrame(() => productDetails.scrollIntoView({ block: "start" }));
    }
}
