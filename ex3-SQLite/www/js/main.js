document.addEventListener("deviceready", onDeviceReady, false);

var divDB = document.getElementById("done-db");

function onDeviceReady() {
    loadDatabase();
}

function loadDatabase() {
    db = window.openDatabase('kiddy_db', '2.0', 'Kiddy database', 1024 * 1024, firstCreate);

    function firstCreate() {
        divDB.style.visibility = 'hidden';
        createTables();
    }

}

function getDB() {
    return db;
}

function createTables() {
    // create table events
    createEventTable();

    // create table report
    createReportTable();
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
            ')', null,onSuccess);
    });

    function onSuccess() {
        divDB.style.visibility = 'visible';
    }
}

function createReportTable() {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE report (' +
            'id INTEGER NOT NULL UNIQUE,' +
            'person_number INT NOT NULL,' +
            'topic TEXT NOT NULL,' +
            'description TEXT NOT NULL,' +
            'event_id INT NOT NULL,' +
            'FOREIGN KEY (event_id) REFERENCES event(id)' +
            ')', null,onSuccess);
    });

    function onSuccess() {
        divDB.style.visibility = 'visible';
    }
}