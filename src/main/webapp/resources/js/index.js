document.addEventListener("DOMContentLoaded", function () {
    updateDateTime(); // Update immediately on page load
    setInterval(updateDateTime, 13000); // Update every 13 seconds
});

function updateDateTime() {
    const dateElement = document.querySelector(".datetime_date");
    const timeElement = document.querySelector(".datetime_time");

    const currentDate = new Date();
    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

    dateElement.textContent = currentDate.toLocaleDateString('ru-RU', dateOptions);
    timeElement.textContent = currentDate.toLocaleTimeString('ru-RU', timeOptions);
}
