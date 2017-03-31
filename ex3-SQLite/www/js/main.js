document.addEventListener("deviceready", onDeviceReady, false);
var eventForm = document.querySelector("#event-form");
eventForm.addEventListener("submit", submit);
var divSuccess = document.querySelector("#submit-success");
divSuccess.style.display = 'none';

var activityName = document.getElementById("activity_name");
var reporterName = document.getElementById("reporter_name");
var activityDate = document.getElementById("activity_date");
var activityLocation = document.getElementById("activity_location");
var attendingTime = document.getElementById("attending_time");

function onDeviceReady() {
    loadDatabase();
}

function loadDatabase() {
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
    db.transaction(function (tx) {
        var data = [item.id, item.activity_name, item.reporter_name, item.activity_date, item.activity_location, item.attending_time];
        tx.executeSql(query, data, function () {
            eventForm.style.display = 'none';
            divSuccess.style.display = 'block';
        });
    });
}

function addMore() {
    divSuccess.style.display = 'none';
    eventForm.style.display = 'block';
    reset();
}

function reset() {
    activityName.value = '';
    reporterName.value = '';
    activityDate.value = '';
    activityLocation.value = '';
    attendingTime.value = '';
}