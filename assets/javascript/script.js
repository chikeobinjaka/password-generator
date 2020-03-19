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
var passwdLen; // Length of generated password(s)
var passwdCount; // Number of passwords to generate
var maxSpecialChar; // maximum number of special characters in each password
/**************************************************
    This function is called by the onClick event of 
    the "Generate" button on the modal.
***************************************************/
function generatePassword() {
  console.log("Generate Password Button Clicked");
  //    Read the values in the various inputs

  //    The following uses the ID of the modal section of the document to
  //   reference and close it

  $(pwdSpecificsModal).modal("hide");
  console.log("Just closed the Modal");
}
