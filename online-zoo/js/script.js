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


// make your donation
function openDonationPopup2() {
    const popup = document.getElementById("donationPopup2");
    popup.classList.add("active");
    document.body.classList.add("no_scroll");
    showStep(1);
}

function showStep(stepNumber) {
    document.querySelectorAll(".form_step").forEach(step => {
        step.classList.remove("active");
    });
    document.getElementById("step" + stepNumber).classList.add("active");
}

let selectedAmount = null;
const amountButtons = document.querySelectorAll(".amount_btn");
const otherAmountInput = document.getElementById("otherAmount");

amountButtons.forEach(button => {
    button.addEventListener("click", function () {
        amountButtons.forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        selectedAmount = this.dataset.amount;
        otherAmountInput.value = "";
    });
});

otherAmountInput.addEventListener("input", function () {
    if (this.value.trim() !== "") {
        amountButtons.forEach(btn => btn.classList.remove("active"));
        selectedAmount = null;
    }
});

function goToStep2() {
    const otherAmount = otherAmountInput.value.trim();

    if (!selectedAmount && !otherAmount) {
        alert("Please select or enter a donation amount");
        return;
    }
    showStep(2);
}

function goToStep3() {
    const name = document.getElementById("fullName");
    const email = document.getElementById("email");

    if (!name.value.trim() || !email.value.trim()) {
        alert("Please enter name and email address");
        return;
    }
    showStep(3);
}

function goBackToStep1() {
    showStep(1);
}

function goBackToStep2() {
    showStep(2);
}

function completeDonation() {
    const card = document.getElementById("card");
    const cvv = document.getElementById("cvv");
    const month = document.getElementById("month");
    const year = document.getElementById("year");

    if (!card.value.trim() || !cvv.value.trim() || !month.value || !year.value) {
        alert("Please enter card information");
        return;
    }
    if (month.value < 1 || month.value > 12 || year.value < 2000 || year.value > 3000) {
        alert("Please enter correct card information");
        return;
    }
    closePopup();
}

function closePopup() {
    const popup = document.getElementById("donationPopup2");
    popup.classList.remove("active");
    document.body.classList.remove("no_scroll");

    document.querySelectorAll("#donationPopup2 input").forEach(input => {
        input.value = "";
    });
}