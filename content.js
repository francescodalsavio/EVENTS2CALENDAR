// Create the Add to Calendar button
const addToCalendarButton = document.createElement("a");
addToCalendarButton.className = "btn btn-primary";
addToCalendarButton.innerHTML = "Add to calendar";
addToCalendarButton.href = "#";
addToCalendarButton.style.width = "100%";

// Handle the click event on the Add to Calendar button
addToCalendarButton.onclick = function() {
  // Get the event duration
  const forEl = addToCalendarButton.closest('.modal-dialog').querySelector('.icon-clock').nextElementSibling;
  let durationString = forEl.nextElementSibling.textContent.trim();
  let durationMilliseconds = 0;
  const match = durationString.match(/\d+/);
  const parsedInt = match ? parseInt(match[0]) : null;
  if (durationString.includes('about an hour')) {
    durationMilliseconds = 60 * 60 * 1000; // default to 60 minutes
  } else if (durationString.includes('hour')) {
    durationMilliseconds = parsedInt * 60 * 60 * 1000;
  } else if (durationString.includes('minute')) {
    durationMilliseconds += parsedInt * 60 * 1000;
  } else {
    durationMilliseconds = 60 * 60 * 1000; // default to 60 minutes
  }

  // Get the event details
  const eventName = addToCalendarButton.closest('.modal-dialog').querySelector('.head h4').textContent.trim();
  const eventDate = addToCalendarButton.closest('.modal-dialog').querySelector('.details [data-long-date]').getAttribute('data-long-date');
  const startDate = new Date(eventDate).toISOString().replace(/-|:|\.\d+/g, '');
  const endDate = new Date(new Date(eventDate).getTime() + durationMilliseconds ).toISOString().replace(/-|:|\.\d+/g, '');
  const location =  addToCalendarButton.closest('.modal-dialog').querySelector('.event-location span:last-child').textContent.trim();
  const details = encodeURIComponent(addToCalendarButton.closest('.modal-dialog').querySelector('.modal-body .notification-text').textContent.trim());
  const calendarLink = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${startDate}/${endDate}&location=${location}&details=${details}`;

  // Open Google Calendar link in new tab
  window.open(calendarLink, '_blank');
};

// Insert the Add to Calendar button after the modal body
const modalBody = document.querySelector(".modal-body");
modalBody.insertAdjacentElement("afterend", addToCalendarButton);
