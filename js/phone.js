const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  ); // fetch koro kintu ektu wait koro, data load howar jonno  tay await
  const data = await res.json(); // Tarpor data k json E convert koro ebong ektu wait koro tai await dawa
  const phones = data.data;
  displayPhones(phones);
};

// Step 1 :Data gulo niye ekta ekta phone pawa
const displayPhones = (phones) => {
  //1) Where to add
  const phoneContainer = document.getElementById("phone-container");
  // clear phone container  cards before adding new cards
  phoneContainer.textContent = "";
  phones.forEach((phone) => {
    // 2) What to add create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card p-4 bg-grey-100 shadow-xl`;
    // 3) Set innerHtml
    phoneCard.innerHTML = `
            <figure>
              <img
                src="${phone.image}"
                alt="Shoes"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">${phone.brand}</h2>
              <p>${phone.phone_name}</p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
              </div>
            </div>
       `; //4) AppendChild
    phoneContainer.appendChild(phoneCard);
  });
};

//handleSearch

const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
};
