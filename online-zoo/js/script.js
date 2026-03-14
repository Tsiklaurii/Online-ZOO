// together we care, save and protect!
function openDonationPopup1() {
    const popup = document.getElementById("donationPopup1");
    popup.classList.add("active");
    document.body.classList.add("no_scroll");
}

function closeDonationPopup1() {
    const popup = document.getElementById("donationPopup1");
    popup.classList.remove("active");
    document.body.classList.remove("no_scroll");
}