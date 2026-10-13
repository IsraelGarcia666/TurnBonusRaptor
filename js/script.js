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

// Development check: confirm the form was found in the DOM
console.log(shiftForm);

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
});
