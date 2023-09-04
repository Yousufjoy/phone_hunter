const loadPhone = async (searchText = "Iphone") => {
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

  phoneContainer.textContent = ""; // search history ager ta ar thake na

  // Phone length 12 er besi hole ekta button dekhabe
  if (phones.length > 12) {
    const showAll = document.getElementById("show-all");
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  phones = phones.slice(0, 5); // phone k set kore ditesi j only 5ta phone show korbe webite e
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
                <button onClick="handleDetails('${phone.slug}')" class="btn btn-primary">Details</button>
              </div>
            </div>
       `; //4) AppendChild
    phoneContainer.appendChild(phoneCard);
  });
  loadingSpinning(false);
};

//handleSearch

const handleSearch = () => {
  loadingSpinning(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPhone(searchText);
};

const loadingSpinning = (isLoading) => {
  const loadingScreen = document.getElementById("loading-screen");
  if (isLoading) {
    loadingScreen.classList.remove("hidden");
  } else {
    loadingScreen.classList.add("hidden");
  }
};

// Handle Details

const handleDetails = async (id) => {
  // console.log("clicked", id);

  // load single phone data

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-phone-name");
  phoneName.innerText = `Name : ${phone.name}`;

  const showDtailContent = document.getElementById("show-detail-container");
  showDtailContent.innerHTML = `
  <img src=${phone.image} alt="" />
  <p> Storage ${phone?.mainFeatures.storage}</p>
  `;

  // show the moodal

  show_details_modal.showModal();
};

loadPhone();
