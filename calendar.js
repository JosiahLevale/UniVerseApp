// Adding events to various categories - Romain
// Add event to calendar -> Important
// Atheltics
// Chapel
// TWUSA
// Clubs

// Calendar UI with added events - Oreo
// Add classes to calendar

// Overall app architecture - Oke
// Home page
// Calendar page
// Explore events page

// Design home page - Josiah
// Bento Box design

var coll = document.getElementsByClassName("collapsible");
var l;

for (l = 0; l < coll.length; l++) {
    coll[l].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    addEvenSubmit = document.querySelector(".add-event-btn"),
    eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events");

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

//defult months
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

// localStorage.removeItem('eventsArr');

// Check if array exists in localStorage
let savedArray = localStorage.getItem('eventsArr');

// Initialize array if it doesn't exist
let eventsArr = savedArray ? JSON.parse(savedArray) : [{
    day: 19,
    month: 3,
    year: 2024,
    events: [
        {
            title: "Event 1: RELS 110",
            time: "1:30 AM"
        },
        {
            title: "Event 2: FNDC 101",
            time: "12:00 PM"
        },
    ],

},];


// function to add days to the calendar
function initCalendar() {

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //updating the month on the calendar
    date.innerHTML = months[month] + " " + year;

    let days = "";

    //prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }


    //current month days
    for (let i = 1; i <= lastDate; i++) {

        // check if event present on current day 
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year
            ) {
                //if the event is found
                event = true;
            }
        });



        //if day is the current day,
        if (
            i === new Date().getDate() &&
            year === new Date().getFullYear() &&
            month === new Date().getMonth()
        ) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);


            if (event) {
                days += `<div class="day today event">${i}</div>`;
            } else {
                days += `<div class="day today" >${i}</div>`;
            }
        }

        else {
            if (event) {
                days += `<div class="day event" >${i}</div>`;
            } else {
                days += `<div class="day">${i}</div>`;
            }

        }
    }
    // next month days 
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }

    daysContainer.innerHTML = days;
    //add listner after calender intialized 
    addListner();
}
initCalendar();

// function to go to the next months
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}
// function to go to the next months
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

// Goes to previous and next months
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventTime = document.querySelector(".event-time");


//When the plus icon is clicked
addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});
//When the X is clicked
addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active");
});
//When anywhere but the button is clicked
document.addEventListener("click", (e) => {
    //if clicked outside button
    if (e.target != addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
});

//allow only 50 chars in the event title
addEventTitle.addEventListener("input", function (e) {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

//automatically put : when two number is inputed
addEventTime.addEventListener("input", (e) => {
    //automatically add ":" if two numbers entered
    if (addEventTime.value.length === 2) {
        addEventTime.value += ":";
    }

    if (addEventTime.value.length > 5) {
        addEventTime.value = addEventTime.value.slice(0, 5);
    }

});

//highlights the backgroud of the pressed day 
function addListner() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //set current day as active day
            activeDay = Number(e.target.innerHTML);

            //call active day after its clicked
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            //remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active");
            });
            e.target.classList.add("active");
        });
    });
}


// show the active day events and date at top 
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function to show events of that day

function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        //get events of active day only
        if (
            date === event.day &&
            month + 1 === event.month &&
            year === event.year
        ) {
            // show the event on the calendar 
            event.events.forEach((event) => {
                events += `
            <div class="event">
                <div class="title">
                    <i class="fas fa-circle"></i>
                    <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                    <span class="event-time">${event.time}</span>
                  </div>
                </div> 
                `;
            });
        }
    });

    //if nothing is found
    if (events === "") {
        events = `<div class="no-event">
                    <h3>No Events</h3>
                </div>`;
    }
    console.log(events);
    eventsContainer.innerHTML = events;
}

//function to add events to calendar
addEvenSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTime = addEventTime.value;

    if (eventTitle === "" || eventTime === "") {
        alert("Please fill all the fields");
        return;
    }

    const timeArr = eventTime.split(":");

    if (
        timeArr[0] > 23 || timeArr[1] > 59
    ) {
        alert("Wrong format (Ex: 01:30)")
    }

    const newEvent = {
        title: eventTitle,
        time: eventTime,
    };

    let eventAdded = false;

    //check if eventsarr is not empty
    if (eventsArr.length > 0) {
        //check if the current day already has any event the add to that
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay &&
                item.month === month + 1 &&
                item.year === year
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
        localStorage.setItem('eventsArr', JSON.stringify(eventsArr));
    }

    // create new form if event array or current day has no event
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
        localStorage.setItem('eventsArr', JSON.stringify(eventsArr));
    }

    //remove letters from the add event form
    addEventContainer.classList.remove("active");
    //clear fields
    addEventTitle.value = "";
    addEventTime.value = "";

    //show added event

    updateEvents(activeDay);

});

function goBack() {
    window.history.back();
}

//function to add events to calendar
function addEvent(title, date, time) {
    const eventTitle = title;
    const eventDate = date;
    const eventTime = time;

    const timeArr = eventTime.split(":");
    const dateArr = eventDate.split("-");
    const dayOfEvent = parseInt(dateArr[2]);
    const monthOfEvent = parseInt(dateArr[1]);
    const yearOfEvent = parseInt(dateArr[0]);

    if (
        timeArr[0] > 23 || timeArr[1] > 59
    ) {
        alert("Wrong format (Ex: 01:30)")
    }

    const newEvent = {
        title: eventTitle,
        time: eventTime,
    };

    let eventAdded = false;

    //check if eventsarr is not empty
    if (eventsArr.length > 0) {
        //check if the current day already has any event the add to that
        eventsArr.forEach((item) => {
            if (
                item.day === dayOfEvent &&
                item.month === monthOfEvent &&
                item.year === yearOfEvent
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
        localStorage.setItem('eventsArr', JSON.stringify(eventsArr));
    }

    // create new form if event array or current day has no event
    if (!eventAdded) {
        eventsArr.push({
            day: dayOfEvent,
            month: monthOfEvent,
            year: yearOfEvent,
            events: [newEvent],
        });
        localStorage.setItem('eventsArr', JSON.stringify(eventsArr));
    }

    console.log("Modified Array:", eventsArr);

    alert(eventTitle.concat(" has been added to your calendar"));

};