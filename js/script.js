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
const batchNumber = document.querySelector("#batchNumber");
const hoursWorked = document.querySelector("#hoursWorked");
const unitsCompleted = document.querySelector("#unitsCompleted");
const unitRate = document.querySelector("#unitRate");

// Select the area used for messages
const shiftMessage = document.querySelector("#shiftMessage");

// Select the shift entries area (STEP 5)
const shiftList = document.querySelector("#shiftList");
const emptyEntriesMessage = document.querySelector("#emptyEntriesMessage");

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

// ==================================================
// APP DATA: SAVED SHIFT ENTRIES
// Used later in JS STEP 6
// ==================================================

// Try to get previously saved shifts from localStorage.
// If there are none, start with an empty array.
const shiftEntries = JSON.parse(localStorage.getItem("shiftEntries")) || [];

// Development check (Why JSON.parse()? Because localStorage can only store text.
// Your shifts are JavaScript objects, so we need JSON to convert between the two forms.)
console.log("Saved shifts:", shiftEntries);

// ==================================================
// JS STEP 6.2: DISPLAY SAVED SHIFTS ON PAGE LOAD
// ==================================================

renderShiftEntries();

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

  // Clear the form for the next shift
  shiftForm.reset();
});
