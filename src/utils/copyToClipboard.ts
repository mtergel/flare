/**
 *
 * @param input @type String
 * @returns void
 *
 * Function to copy given text to clipboard.
 * use in client-side
 */
function copyToClipboard(input: string) {
  const dummy = document.createElement("textarea");
  document.body.appendChild(dummy);
  dummy.value = input;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

export default copyToClipboard;
