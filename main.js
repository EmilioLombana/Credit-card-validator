// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [
  valid1,
  valid2,
  valid3,
  valid4,
  valid5,
  invalid1,
  invalid2,
  invalid3,
  invalid4,
  invalid5,
  mystery1,
  mystery2,
  mystery3,
  mystery4,
  mystery5,
];

// Iterates through array from right to left, and applies Luhn's algorithm to determine card validity.
const validateCred = (array) => {
  let even = 0;
  let changedNumber = 0;
  let totalNumber = 0;
  for (let i = array.length - 1; i >= 0; i--) {
    if (even == 0) {
      totalNumber = totalNumber + array[i];
      even = 1;
    } else {
      if (array[i] * 2 >= 9) {
        changedNumber = array[i] * 2 - 9;
      } else {
        changedNumber = array[i] * 2;
      }
      totalNumber = totalNumber + changedNumber;
      even = 0;
    }
  }
  if (totalNumber % 10 == 0) {
    return true;
  } else {
    return false;
  }
};

// Uses our validateCred function to sort all invalid CC's into a seperate array.
const findInvalidCard = (array) => {
  let invalidNums = [];
  for (let i = 0; i <= array.length - 1; i++) {
    let results = validateCred(array[i]);
    if (results == false) {
      invalidNums.push(array[i]);
    }
  }
  return invalidNums;
};

// Function to list companies to which the invalid card numbers belong to.
const idInvalidCardCompanies = (invArr) => {
  let faultyCompanies = [];
  for (let i = 0; i < invArr.length; i++) {
    let firstIndex = invArr[i][0];
    if (firstIndex == "3") {
      faultyCompanies.push("Amex");
    } else if (firstIndex == "4") {
      faultyCompanies.push("Visa");
    } else if (firstIndex == "5") {
      faultyCompanies.push("Mastercard");
    } else if (firstIndex == "6") {
      faultyCompanies.push("Discover");
    }
  }
  const uniqueSetter = new Set(faultyCompanies); // Transforms array into set, a data type that does not accept duplicates.
  const uniqueCompanies = [...uniqueSetter]; // Turns set back into array to keep data types consistent.
  return uniqueCompanies;
};
