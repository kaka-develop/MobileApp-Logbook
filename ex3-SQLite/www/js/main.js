document.addEventListener("deviceready", onDeviceReady, false);

// get form element and set submit listener
var eventForm = document.querySelector("#event-form");
eventForm.addEventListener("submit", submit);

// default, div of sucess is hidden
var divSuccess = document.querySelector("#submit-success");
divSuccess.style.display = 'none';

// get field elements
var activityName = document.getElementById("activity_name");
var reporterName = document.getElementById("reporter_name");
var activityDate = document.getElementById("activity_date");
var activityLocation = document.getElementById("activity_location");
var attendingTime = document.getElementById("attending_time");

var db = null;

function onDeviceReady() {
    loadDatabase();
}

function loadDatabase() {
    // init database
    db = window.openDatabase('kiddy_db', '2.0', 'Kiddy database', 1024 * 1024, firstCreate);

    function firstCreate() {
        createTables();
    }

}

function createTables() {
    // create table events
    createEventTable();
}

function createEventTable() {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE event (' +
            'id INTEGER NOT NULL UNIQUE,' +
            'activity_name TEXT NOT NULL,' +
            'reporter_name TEXT NOT NULL,' +
            'activity_date DATE NOT NULL,' +
            'activity_location TEXT,' +
            'attending_time DATETIME' +
            ')', null);
    });
}

function submit(e) {
    // create event entity from field values and insert it
    var event = {
        id: (new Date()).getTime(),
        activity_name: activityName.value,
        reporter_name: reporterName.value,
        activity_date: activityDate.value,
        activity_location: activityLocation.value,
        attending_time: attendingTime.value
    };
    insert(event);
}


function insert(item) {
    var query = 'INSERT INTO event(id,activity_name,reporter_name,activity_date,activity_location,attending_time) VALUES (?,?,?,?,?,?)';
    var data = [item.id, item.activity_name, item.reporter_name, item.activity_date, item.activity_location, item.attending_time];
    db.transaction(function (tx) {
        tx.executeSql(query, data, function () {
            eventForm.style.display = 'none';
            divSuccess.style.display = 'block';
        });
    });
}

function addMore() {
    // display sucess and reset
    divSuccess.style.display = 'none';
    eventForm.style.display = 'block';
    reset();
}

function reset() {
    // rest value of fields
    activityName.value = '';
    reporterName.value = '';
    activityDate.value = '';
    activityLocation.value = '';
    attendingTime.value = '';
}