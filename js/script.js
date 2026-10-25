// ==================================================
// TURNBONUSRAPTOR - JAVASCRIPT
// ==================================================

// JS STEP 1: Select elements from the DOM
// JS STEP 2: Listen for form submission and read input
// JS STEP 3: Validate the input
// JS STEP 4: Calculate the bonus
// JS STEP 5: Create and display shift entries
// JS STEP 6: Save and load data with localStorage
// JS STEP 7: Product Rate Book
// JS STEP 8: Filters, summaries and theme controls

// ==================================================
// JS STEP 1: SELECT ELEMENTS FROM THE DOM
// ==================================================

// Select the shift form
const shiftForm = document.querySelector("#shiftForm");

// Select the form from input fields
const shiftDate = document.querySelector("#shiftDate");
const projectName = document.querySelector("#projectName");
const productNumber = document.querySelector("#productNumber");
const productSuggestions = document.querySelector("#productSuggestions");
const batchNumber = document.querySelector("#batchNumber");
const hoursWorked = document.querySelector("#hoursWorked");
const unitsCompleted = document.querySelector("#unitsCompleted");
const unitRate = document.querySelector("#unitRate");

// Select the area used for messages
const shiftMessage = document.querySelector("#shiftMessage");

// Select the shift entries area (STEP 5)
const shiftList = document.querySelector("#shiftList");
const emptyEntriesMessage = document.querySelector("#emptyEntriesMessage");

// Select the Bonus Summary elements (STEP 8)
const monthlyBonus = document.querySelector("#monthlyBonus");
const weeklyBonus = document.querySelector("#weeklyBonus");

// Select the Product Rate Book toggle elements (STEP 7)
const rateBookToggle = document.querySelector("#rateBookToggle");
const rateBookContent = document.querySelector("#rateBookContent");

// Select the Product Rate Book form elements (STEP 7)
const rateBookForm = document.querySelector("#rateBookForm");

const rateProductNumber = document.querySelector("#rateProductNumber");

const rateProjectName = document.querySelector("#rateProjectName");

const rateValue = document.querySelector("#rateValue");

const rateBookMessage = document.querySelector("#rateBookMessage");

const rateBookList = document.querySelector("#rateBookList");

const emptyRateBookMessage = document.querySelector("#emptyRateBookMessage");

// Development check: confirm the form was found in the DOM
console.log(shiftForm);

// --------------------------------------------------
// Helper function: format date for display
// --------------------------------------------------

function formatDate(dateString) {
  const [year, month, day] = dateString.split("-");

  return `${day}.${month}.${year}`;
}

// --------------------------------------------------
// Helper function: display one shift entry (for step 6.2)
// --------------------------------------------------

function displayShiftEntry(shiftEntry, index) {
  const entryCard = document.createElement("article");
  entryCard.classList.add("shift-entry");

  const entryTitle = document.createElement("h3");
  entryTitle.textContent =
    formatDate(shiftEntry.date) + " – " + shiftEntry.project;

  const productInfo = document.createElement("p");
  productInfo.textContent =
    "Product: " + shiftEntry.product + " | Batch: " + shiftEntry.batch;

  const workInfo = document.createElement("p");
  workInfo.textContent =
    "Hours: " + shiftEntry.hours + " | Units: " + shiftEntry.units;

  const rateInfo = document.createElement("p");
  rateInfo.textContent = "Rate: €" + shiftEntry.rate.toFixed(3) + " / unit";

  const bonusInfo = document.createElement("p");
  bonusInfo.textContent = "Estimated bonus: €" + shiftEntry.bonus.toFixed(2);

  // --------------------------------------------------
  // Create a delete button for this shift
  // --------------------------------------------------

  const deleteButton = document.createElement("button");

  deleteButton.textContent = "Delete";
  deleteButton.type = "button";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", function () {
    const confirmed = confirm("Are you sure you want to delete this shift?");

    if (!confirmed) {
      return;
    }

    // Remove this shift from the array
    shiftEntries.splice(index, 1);

    // Save the updated array in localStorage
    localStorage.setItem("shiftEntries", JSON.stringify(shiftEntries));

    // Refresh the displayed shift list
    renderShiftEntries();
    // Refresh the monthly/weekly bonus
    renderMonthlyBonus();
    renderWeeklyBonus();
  });

  entryCard.append(
    entryTitle,
    productInfo,
    workInfo,
    rateInfo,
    bonusInfo,
    deleteButton,
  );

  emptyEntriesMessage.hidden = true;

  shiftList.append(entryCard);
}

// --------------------------------------------------
// Helper function: render all saved shift entries
// --------------------------------------------------

function renderShiftEntries() {
  // Remove all currently displayed shift cards
  shiftList.replaceChildren();

  // If there are no saved shifts, show the empty message
  if (shiftEntries.length === 0) {
    emptyEntriesMessage.hidden = false;
    return;
  }

  // If shifts exist, hide the empty message
  emptyEntriesMessage.hidden = true;

  // Display every shift stored in the array
  shiftEntries.forEach(function (shiftEntry, index) {
    displayShiftEntry(shiftEntry, index);
  });
}

// --------------------------------------------------
// Helper function: calculate this month's bonus
// --------------------------------------------------

function renderMonthlyBonus() {
  // Get the current year and month from the browser
  const now = new Date();

  const currentYear = now.getFullYear();

  const currentMonth = String(now.getMonth() + 1).padStart(2, "0");

  // Example: "2026-10"
  const currentMonthKey = currentYear + "-" + currentMonth;

  // Start the monthly total at zero
  let monthlyTotal = 0;

  // Check every saved shift
  shiftEntries.forEach(function (shiftEntry) {
    // Only count shifts from the current month
    if (shiftEntry.date.startsWith(currentMonthKey)) {
      monthlyTotal += shiftEntry.bonus;
    }
  });

  // Display the result
  monthlyBonus.textContent = "€" + monthlyTotal.toFixed(2);
}

// --------------------------------------------------
// Helper function: calculate this week's bonus
// Week runs from Monday to Sunday
// --------------------------------------------------

function renderWeeklyBonus() {
  const now = new Date();

  // JavaScript:
  // Sunday = 0, Monday = 1, ... Saturday = 6
  const dayOfWeek = now.getDay();

  // Convert that into "days since Monday"
  const daysSinceMonday = (dayOfWeek + 6) % 7;

  // Find this week's Monday
  const monday = new Date(now);
  monday.setDate(now.getDate() - daysSinceMonday);

  // Find this week's Sunday
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  // Convert a Date into YYYY-MM-DD
  function getDateKey(date) {
    const year = date.getFullYear();

    const month = String(date.getMonth() + 1).padStart(2, "0");

    const day = String(date.getDate()).padStart(2, "0");

    return year + "-" + month + "-" + day;
  }

  const mondayKey = getDateKey(monday);
  const sundayKey = getDateKey(sunday);

  let weeklyTotal = 0;

  shiftEntries.forEach(function (shiftEntry) {
    if (shiftEntry.date >= mondayKey && shiftEntry.date <= sundayKey) {
      weeklyTotal += shiftEntry.bonus;
    }
  });

  weeklyBonus.textContent = "€" + weeklyTotal.toFixed(2);
}

// --------------------------------------------------
// Helper function: display one Product Rate Book entry (for step 7.5B)
// --------------------------------------------------

function displayProductRateEntry(productRateEntry, index) {
  // Create a card for one saved product
  const productCard = document.createElement("article");
  productCard.classList.add("rate-book-entry");

  // Product number
  const productTitle = document.createElement("h3");
  productTitle.textContent = productRateEntry.product;

  // Project name
  const projectInfo = document.createElement("p");
  projectInfo.textContent = "Project: " + productRateEntry.project;

  // Bonus rate
  const rateInfo = document.createElement("p");
  rateInfo.textContent =
    "Rate: €" + productRateEntry.rate.toFixed(3) + " / unit";

  // Delete button
  const deleteButton = document.createElement("button");

  deleteButton.textContent = "Delete";
  deleteButton.type = "button";
  deleteButton.classList.add("delete-button");

  deleteButton.addEventListener("click", function () {
    const confirmed = confirm("Are you sure you want to delete this product?");

    if (!confirmed) {
      return;
    }

    // Remove one product from the array
    productRates.splice(index, 1);

    // Update localStorage
    localStorage.setItem("productRates", JSON.stringify(productRates));

    // Refresh the displayed Rate Book
    renderProductRates();

    // Refresh the product suggestions
    renderProductSuggestions();
  });

  // Put the information inside the card
  productCard.append(productTitle, projectInfo, rateInfo, deleteButton);

  // Add the card to the Product Rate Book
  rateBookList.append(productCard);
}

// --------------------------------------------------
// Helper function: render all Product Rate Book entries (for step 7.5B)
// --------------------------------------------------

function renderProductRates() {
  // Remove only previously displayed product cards.
  // Keep the "No products saved yet" message in the DOM.
  const existingProductCards =
    rateBookList.querySelectorAll(".rate-book-entry");

  existingProductCards.forEach(function (card) {
    card.remove();
  });

  // If there are no saved products, show the empty message
  if (productRates.length === 0) {
    emptyRateBookMessage.hidden = false;
    return;
  }

  // If products exist, hide the empty message
  emptyRateBookMessage.hidden = true;

  // Display every saved product
  productRates.forEach(function (productRateEntry, index) {
    displayProductRateEntry(productRateEntry, index);
  });
}

// --------------------------------------------------
// Helper function: show saved products as suggestions
// --------------------------------------------------

function renderProductSuggestions() {
  // Remove old suggestions
  productSuggestions.replaceChildren();

  // Create one suggestion for every saved product
  productRates.forEach(function (productRateEntry) {
    const option = document.createElement("option");

    option.value = productRateEntry.product;

    option.label =
      productRateEntry.project + " — €" + productRateEntry.rate.toFixed(3);

    productSuggestions.append(option);
  });
}

// ==================================================
// APP DATA: SAVED SHIFT ENTRIES
// Used later in JS STEP 6
// ==================================================

// Try to get previously saved shifts from localStorage.
// If there are none, start with an empty array.
const shiftEntries = JSON.parse(localStorage.getItem("shiftEntries")) || [];

// Development check (Why JSON.parse()? Because localStorage can only store text.
// Shifts are JavaScript objects, it needs JSON to convert between the two forms.)
console.log("Saved shifts:", shiftEntries);

// ==================================================
// APP DATA: SAVED PRODUCT RATES
// Used in JS STEP 7
// ==================================================

// Try to load previously saved products from localStorage.
// If none exist, start with an empty array.
const productRates = JSON.parse(localStorage.getItem("productRates")) || [];

// Development check
console.log("Saved product rates:", productRates);

// ==================================================
// JS STEP 7.5c: DISPLAY SAVED PRODUCT RATES ON PAGE LOAD
// ==================================================

renderProductRates();
renderProductSuggestions();
// ==================================================
// JS STEP 6.2: DISPLAY SAVED SHIFTS ON PAGE LOAD
// ==================================================

renderShiftEntries();
// ===Step 8.1b: DISPLAY THIS MONTH'S/week BONUS ON PAGE LOAD
renderMonthlyBonus();
renderWeeklyBonus();
// ==================================================
// JS STEP 2: LISTEN FOR FORM SUBMISSION AND READ INPUT
// ==================================================

shiftForm.addEventListener("submit", function (event) {
  // Stop the browser's normal form submission
  event.preventDefault();

  // Read the values entered by the user
  const date = shiftDate.value;
  const project = projectName.value.trim();
  const product = productNumber.value.trim();
  const batch = batchNumber.value.trim();
  const hours = hoursWorked.value;
  const units = unitsCompleted.value;
  const rate = unitRate.value;

  // Temporary test output
  console.log("Date:", date);
  console.log("Project:", project);
  console.log("Product:", product);
  console.log("Batch:", batch);
  console.log("Hours:", hours);
  console.log("Units:", units);
  console.log("Rate:", rate);

  // ==================================================
  // JS STEP 3: VALIDATE THE INPUT
  // ==================================================

  // Remove old validation styles and messages
  shiftMessage.textContent = "";
  shiftMessage.className = "";

  shiftDate.classList.remove("input-error");
  projectName.classList.remove("input-error");
  productNumber.classList.remove("input-error");
  batchNumber.classList.remove("input-error");
  hoursWorked.classList.remove("input-error");
  unitsCompleted.classList.remove("input-error");
  unitRate.classList.remove("input-error");

  // Track whether an error has been found
  let hasError = false;

  // Check text and date fields
  if (date === "") {
    shiftDate.classList.add("input-error");
    hasError = true;
  }

  if (project === "") {
    projectName.classList.add("input-error");
    hasError = true;
  }

  if (product === "") {
    productNumber.classList.add("input-error");
    hasError = true;
  }

  if (batch === "") {
    batchNumber.classList.add("input-error");
    hasError = true;
  }

  if (hours === "" || Number(hours) <= 0) {
    hoursWorked.classList.add("input-error");
    hasError = true;
  }

  if (units === "" || Number(units) < 0) {
    unitsCompleted.classList.add("input-error");
    hasError = true;
  }

  if (rate === "" || Number(rate) < 0) {
    unitRate.classList.add("input-error");
    hasError = true;
  }

  // Stop here if something is invalid
  if (hasError) {
    shiftMessage.textContent =
      "Please complete all fields correctly. Negative values are not allowed.";
    shiftMessage.className = "error-message";

    return;
  }

  if (Number(units) === 0 && Number(rate) === 0) {
    shiftMessage.textContent =
      "Note: This entry has 0 units and a €0 bonus rate. The entry is still valid.";
    shiftMessage.className = "info-message";
  } else if (Number(units) === 0) {
    shiftMessage.textContent =
      "Note: This entry has 0 units, so no unit-based bonus will be generated.";
    shiftMessage.className = "info-message";
  } else if (Number(rate) === 0) {
    shiftMessage.textContent =
      "Note: This entry has a €0 bonus rate. The entry is still valid.";
    shiftMessage.className = "info-message";
  }

  // ==================================================
  // JS STEP 4: CALCULATE THE BONUS
  // ==================================================

  // Convert the input values from text to numbers
  const unitsNumber = Number(units);
  const rateNumber = Number(rate);

  // Calculate the estimated bonus
  const bonus = unitsNumber * rateNumber;

  // Development check
  console.log("Estimated bonus:", bonus.toFixed(2), "€");

  // ==================================================
  // JS STEP 5: CREATE AND DISPLAY A SHIFT ENTRY
  // ==================================================

  // Store the information for one shift in an object
  const shiftEntry = {
    date: date,
    project: project,
    product: product,
    batch: batch,
    hours: Number(hours),
    units: unitsNumber,
    rate: rateNumber,
    bonus: bonus,
  };
  // ============================================
  // Add the new shift to the array.(JS STEP 6).
  shiftEntries.push(shiftEntry);

  // Save the updated array in localStorage
  localStorage.setItem("shiftEntries", JSON.stringify(shiftEntries));
  // ================================================================

  // Development check
  console.log("Shift entry:", shiftEntry);

  // --------------------------------------------------
  // Display the shift entry
  // The DOM creation code was moved to the reusable
  // displayShiftEntry() helper function below.
  // --------------------------------------------------
  renderShiftEntries();
  // refresh the monthly/weekly bonus (STEP 8)
  renderMonthlyBonus();
  renderWeeklyBonus();

  // Clear the form for the next shift
  shiftForm.reset();
});

// ==================================================
// JS STEP 7.3: OPEN AND CLOSE THE PRODUCT RATE BOOK
// ==================================================

rateBookToggle.addEventListener("click", function () {
  // Check whether the Rate Book content is currently hidden
  const isHidden = rateBookContent.hidden;

  // Switch between hidden and visible
  rateBookContent.hidden = !isHidden;

  // Update the accessibility information
  rateBookToggle.setAttribute("aria-expanded", String(isHidden));

  // Change the button text
  if (isHidden) {
    rateBookToggle.textContent = "Close";
  } else {
    rateBookToggle.textContent = "Open";
  }
});

// ==================================================
// JS STEP 7.4C: SAVE PRODUCT RATE BOOK ENTRY
// ==================================================

rateBookForm.addEventListener("submit", function (event) {
  // Stop the browser from refreshing the page
  event.preventDefault();

  // Read the values entered in the Rate Book form
  const product = rateProductNumber.value.trim();
  const project = rateProjectName.value.trim();
  const rate = rateValue.value;

  // Clear previous messages and error styles
  rateBookMessage.textContent = "";
  rateBookMessage.className = "";

  rateProductNumber.classList.remove("input-error");
  rateProjectName.classList.remove("input-error");
  rateValue.classList.remove("input-error");

  // Track whether something is wrong
  let hasError = false;

  // Validate product number
  if (product === "") {
    rateProductNumber.classList.add("input-error");
    hasError = true;
  }

  // Validate project name
  if (project === "") {
    rateProjectName.classList.add("input-error");
    hasError = true;
  }

  // Rate may be 0, but not empty or negative
  if (rate === "" || Number(rate) < 0) {
    rateValue.classList.add("input-error");
    hasError = true;
  }

  // Stop if validation failed
  if (hasError) {
    rateBookMessage.textContent =
      "Please complete all Product Rate Book fields correctly.";

    rateBookMessage.className = "error-message";

    return;
  }

  // Check whether this product number already exists
  const productAlreadyExists = productRates.some(function (productRateEntry) {
    return productRateEntry.product.toLowerCase() === product.toLowerCase();
  });

  // Stop if the product is already in the Rate Book
  if (productAlreadyExists) {
    rateProductNumber.classList.add("input-error");

    rateBookMessage.textContent =
      "This product number already exists in the Product Rate Book.";

    rateBookMessage.className = "error-message";

    return;
  }

  // Create one product-rate object
  const productRateEntry = {
    product: product,
    project: project,
    rate: Number(rate),
  };

  // Development check
  console.log("Product rate entry:", productRateEntry);

  // Add the new product to the Product Rate Book array
  productRates.push(productRateEntry);

  // Save the updated Product Rate Book in localStorage
  localStorage.setItem("productRates", JSON.stringify(productRates));

  // Development check
  console.log("Updated product rates:", productRates);

  // Refresh the displayed Product Rate Book
  renderProductRates();
  // Refresh the product suggestions
  renderProductSuggestions();

  // Clear the Rate Book form
  rateBookForm.reset();
});

// ==================================================
// JS STEP 7.7: USE PRODUCT RATE BOOK IN SHIFT FORM
// ==================================================

productNumber.addEventListener("input", function () {
  // Read what the user is typing in the Shift form
  const enteredProduct = productNumber.value.trim().toLowerCase();

  // Look for an exact matching product in the Rate Book
  const savedProduct = productRates.find(function (productRateEntry) {
    return productRateEntry.product.toLowerCase() === enteredProduct;
  });

  // If a matching saved product exists,
  // automatically fill its project and bonus rate
  if (savedProduct) {
    projectName.value = savedProduct.project;
    unitRate.value = savedProduct.rate;
  }
});
