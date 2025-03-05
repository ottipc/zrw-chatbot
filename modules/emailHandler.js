// modules/emailHandler.js
export async function sendEmail(subject, errorDetails) {
    console.error("Sende E-Mail an info@zrw-berlin.com:", subject, errorDetails);
    return true;
}
