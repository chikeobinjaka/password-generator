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

const MAX_SPECIAL_CHAR_COUNT = 8;
const MIN_SPECIAL_CHAR_COUNT = 2;
var maxSpecialCharCount = MIN_SPECIAL_CHAR_COUNT; // maximum number of special characters in each password

const SPECIAL_CHARACTERS = "#!*%";
var specialCharacters = SPECIAL_CHARACTERS;

const ALPHA_NUMERIC_CHARS =
  "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";

// String.prototype.ptReplaceCharAt = function(index, replacement) {
//   var retval = this;
//   if (replacement != null && retval.length > index) {
//     retval =
//       this.substr(0, index) +
//       replacement.charAt(index) +
//       this.substr(index + replacement.length);
//   }
//   return retval;
// };

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
/**************************************************
    This function is called by the onClick event of 
    the "Generate" button on the modal.
***************************************************/
function generatePassword() {
  var docElement, docElements;
  var value, intValue, stringValue;

  //    Get Characters per password entry. Default is MIN_PASSWORD_LEN
  if (
    (docElement = document.getElementById("pwd-len-input")) != null &&
    (stringValue = docElement.value) != null &&
    (intValue = Number.parseInt(stringValue)) != NaN &&
    (intValue >= MIN_PASSWORD_LEN || intValue <= MAX_PASSWORD_LEN)
  ) {
    passwdLen = intValue;
  }
  // get special characters per password

  if (
    (docElement = document.getElementById("special-char-count")) != null &&
    (stringValue = docElement.value) != null &&
    (intValue = Number.parseInt(stringValue)) != NaN &&
    (intValue >= MIN_PASSWORD_LEN || intValue <= MAX_PASSWORD_LEN)
  ) {
    maxSpecialCharCount = intValue;
  }

  // check the radio button by name, not ID
  //
  if (
    (docElements = document.getElementsByName("number-of-passwords")) != null
  ) {
    for (let index = 0; index < docElements.length; index++) {
      if (
        (docElement = docElements[index]) != null &&
        docElement.checked === true &&
        (intValue = Number.parseInt(docElement.value)) != NaN
      ) {
        passwdCount = intValue;
      }
    }
  }

  // check to see which special characters were choosen
  // get the "option" tags
  if (
    (docElement = document.getElementById("special-char-selection")) != null &&
    (docElements = document.querySelectorAll("option")) != null &&
    docElements.length != 0
  ) {
    stringValue = "";
    for (
      let index = 0;
      index < docElements.length && index < MAX_SPECIAL_CHAR_COUNT;
      index++
    ) {
      // check if the option is selected. If so, append to stringValue
      docElement = docElements[index];
      //   console.log(docElement);
      if (docElement.selected) {
        // console.log(docElement + " (" + docElement.value + ")");
        stringValue += docElement.value;
      }
    }
    // console.log(stringValue);
    if (stringValue.length != 0) {
      specialCharacters = stringValue;
    }
  }
  //   console.log("Password Length = " + passwdLen);
  //   console.log("Number of Passwords to generate: " + passwdCount);
  //   console.log("Max Special Characters = " + maxSpecialCharCount);
  //   console.log("Special Characters: " + specialCharacters);

  // randomly get characters from the ALPHA_NUMERIC_CHARS string up to password length for passwdCount times
  var generatedPasswords = [];
  var charIndex;
  for (let count = 0; count < passwdCount; count++) {
    var tempPassword = "";
    for (let index = 0; index < passwdLen; index++) {
      charIndex = Math.floor(Math.random() * ALPHA_NUMERIC_CHARS.length);
      tempPassword += ALPHA_NUMERIC_CHARS.charAt(charIndex);
    }
    console.log("Unsalted Password #" + count + " = " + tempPassword);
    generatedPasswords[count] = tempPassword;
    // now "salt the generated password with the special characters"
    var specialChar;
    for (let index = 0; index < maxSpecialCharCount; index++) {
      var position = Math.floor(Math.random() * specialCharacters.length);
      specialChar = specialCharacters.charAt(index);
      tempPassword = ptReplaceCharAt(tempPassword, position, specialChar);
    }
    console.log("SALTED Password #" + count + " = " + tempPassword);
    generatedPasswords[count] = tempPassword;
  }

  // now put the passwords into the text window
  var outputString = "";
  for (let index = 0; index < generatedPasswords.length;index++){
      if (index > 0) outputString += "\n";
      outputString += generatedPasswords[index];
  }
  document.getElementById("generated-passwords").value = outputString;
  //    The following uses the ID of the modal section of the document to
  //   reference and close it
  $(pwdSpecificsModal).modal("hide");
  //   console.log("Just closed the Modal");
}
