/* Function takes two inputs and returns the one that is greater or NaN if there was any issue.
The check is done by converting the inputs to float. However, it is the inpput that will be 
returned, not the float conversion. That way an integer like "10", won't be returned as "10.0"
*/
function greaterThan(input1, input2) {
  var float1, float2;
  if (
    (float1 = Number.parseFloat(input1)) === NaN ||
    (float2 = Number.parseFloat(input2)) === NaN
  ) {
    return NaN;
  }
  if (float1 >= float2) return input1;
  return input2;
}
/* Global variables
 */

const MIN_PASSWORD_LEN = 8;
const MAX_PASSWORD_LEN = 128;
var passwdLen = MIN_PASSWORD_LEN; // Length of generated password(s)

const PASSWORD_COUNT = 3;
const MAX_PASSWORD_COUNT = 5;
var passwdCount = PASSWORD_COUNT; // Number of passwords to generate

const SPECIAL_CHARACTERS = "#!*%()@$=&+?[]{}";

const UPPER_CASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER_CASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMERIC_CHARACTERS = "0123456789";

function ptReplaceCharAt(originalString, position, replacement) {
  var retval = originalString;
  var pos;
  if (
    originalString != null &&
    replacement != null &&
    replacement.length != 0 &&
    (pos = Number.parseInt(position)) != NaN
  ) {
    if (pos >= originalString.length) {
      retval = originalString + replacement;
    } else if (pos == 0) {
      retval = replacement + originalString;
    } else if (pos < originalString.length) {
      retval =
        originalString.slice(0, pos - 1) +
        replacement +
        originalString.slice(pos);
    }
  }
  return retval;
}

/* ***********************************************
   Function returns the number of characters per 
   password from the modal input
**************************************************/
function getPasswordLengthInput() {
  var docElement, docElements;
  var value, intValue, stringValue, retval;
  //    Get Characters per password entry. Default is MIN_PASSWORD_LEN
  retval = MIN_PASSWORD_LEN;
  if (
    (docElement = document.getElementById("pwd-len-input")) != null &&
    (stringValue = docElement.value) != null &&
    (intValue = Number.parseInt(stringValue)) != NaN &&
    (intValue >= MIN_PASSWORD_LEN || intValue <= MAX_PASSWORD_LEN)
  ) {
    retval = intValue;
  }
  return retval;
}

/* ************************************************
Function returns the number of passwords to generate
from the modal radio input
***************************************************/
function getPasswordCountInput() {
  var docElement, docElements;
  var value, intValue, stringValue, retval;
  // check the radio button by name, not ID

  retval = PASSWORD_COUNT;
  if (
    (docElements = document.getElementsByName("number-of-passwords")) != null
  ) {
    for (let index = 0; index < docElements.length; index++) {
      if (
        (docElement = docElements[index]) != null &&
        docElement.checked === true &&
        (intValue = Number.parseInt(docElement.value)) != NaN
      ) {
        retval = intValue;
      }
    }
  }
  return retval;
}

function getAllowedAlphaCharacters() {
  var docElement, docElements;
  var value, intValue, stringValue, retval;
  // check if upper, lower or both cases are allowed
  // check the radio button by name, not ID
  stringValue = "bothcase";
  if ((docElements = document.getElementsByName("pwdCase")) != null) {
    for (let index = 0; index < docElements.length; index++) {
      if (
        (docElement = docElements[index]) != null &&
        docElement.checked === true
      ) {
        stringValue = docElement.value;
      }
    }
  }

  retval = "";
  switch (stringValue.toLowerCase()) {
    case "uppercase":
      retval = UPPER_CASE_CHARACTERS;
      console.log("Upper case characters are allowed");
      break;
    case "lowercase":
      retval = LOWER_CASE_CHARACTERS;
      console.log("Lower case characters are allowed");
      break;
    case "bothcase":
      retval = UPPER_CASE_CHARACTERS;
      retval += LOWER_CASE_CHARACTERS;
      console.log("Both Upper and Lower case characters are allowed");
      break;
    default:
      retval = UPPER_CASE_CHARACTERS;
      retval += LOWER_CASE_CHARACTERS;
      console.log("DEFAULT!! Both Upper and Lower case characters are allowed");
      break;
  }
  return retval;
}

function getAllowedNumericCharacters() {
  var docElement, docElements;
  var value, intValue, stringValue, retval;
  // check if numbers are allowed
  // check the radio button by name, not ID
  stringValue = "yes";
  if ((docElements = document.getElementsByName("pwdNumbers")) != null) {
    for (let index = 0; index < docElements.length; index++) {
      if (
        (docElement = docElements[index]) != null &&
        docElement.checked === true
      ) {
        stringValue = docElement.value;
      }
    }
  }
  if (stringValue.toLowerCase() === "yes") {
    retval += NUMERIC_CHARACTERS;
    console.log("Numeric Characters are Allowed");
  }

  return retval;
}

function getAllowedSpecialCharacters() {
  var docElement, docElements;
  var value, intValue, stringValue, retval;
  // check if special characters are allowed
  // check the radio button by name, not ID
  stringValue = "yes";
  if ((docElements = document.getElementsByName("pwdSpecialChars")) != null) {
    for (let index = 0; index < docElements.length; index++) {
      if (
        (docElement = docElements[index]) != null &&
        docElement.checked === true
      ) {
        stringValue = docElement.value;
      }
    }
  }
  if (stringValue.toLowerCase() === "yes") {
    retval += SPECIAL_CHARACTERS;
    console.log("Special Characters are Allowed");
  }

  return retval;
}
/* ************************************************
Function returns string containing allowed characters
based on radio buttons in modal dialog
 ***************************************************/
function getAllowedPasswordCharacters() {
  var retval;

  retval = getAllowedAlphaCharacters();
  retval += getAllowedNumericCharacters();
  retval += getAllowedSpecialCharacters();
  console.log("Allowed Password Characters : " + retval);
  return retval;
}
/**************************************************
      This function is called by the onClick event of 
      the "Generate" button on the modal.
  ***************************************************/
function generatePassword() {
  var docElement, docElements;
  var value, intValue, stringValue, allowedPasswordCharacters;
  var generatedPasswords = [];
  var generatePassword = "";

  // first clear the output
  document.getElementById("generated-passwords").value = "";

  // get password length
  passwdLen = getPasswordLengthInput();
  // get number of passwords to generate
  passwdCount = getPasswordCountInput();
  // Build string to contain allowed password characters
  allowedPasswordCharacters = getAllowedPasswordCharacters();

  // create strings from allowed characters randomly
  var allowedCharLen = allowedPasswordCharacters.length;

  for (let count = 0; count < passwdCount; count++) {
    generatePassword = "";
    for (let index = 0; index < passwdLen; index++) {
      intValue = Math.floor(Math.random() * allowedCharLen);
      generatePassword += allowedPasswordCharacters.charAt(intValue);
    }
    generatedPasswords[count] = generatePassword;
  }
  // now put the passwords into the text window
  var outputString = "";
  for (let index = 0; index < generatedPasswords.length; index++) {
    if (index > 0) outputString += "\n";
    outputString += generatedPasswords[index];
  }
  document.getElementById("generated-passwords").value = outputString;
  //    The following uses the ID of the modal section of the document to
  //   reference and close it
  $(pwdSpecificsModal).modal("hide");
  //   console.log("Just closed the Modal");
}
