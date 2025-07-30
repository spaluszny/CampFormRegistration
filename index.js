storage = []
liveJSON = []
const label = document.getElementById ("registrar-stat")
const count = 0


 //************** other button disabling **************//
const otherBtn = document.getElementById("other-radio")
const northBtn = document.getElementById("north-radio")
const southBtn = document.getElementById("south-radio")
const naBtn = document.getElementById("na-radio")
const highSchoolInput = document.getElementById("highschool-input")

otherBtn.addEventListener('change', func =>{
    if (otherBtn.checked){
        highSchoolInput.disabled = false;
        highSchoolInput.placeholder = "Enter high school name";
    }
})
northBtn.addEventListener('change', func =>{
    if (northBtn.checked){
        highSchoolInput.disabled = true;
        highSchoolInput.placeholder = "";
    }
})
southBtn.addEventListener('change', func =>{
    if (southBtn.checked){
        highSchoolInput.disabled = true;
        highSchoolInput.placeholder = "";
    }
})
naBtn.addEventListener('change', func =>{
    if (naBtn.checked){
        highSchoolInput.disabled = true;
        highSchoolInput.placeholder = "";
    }
})


//************** prints data into table and stores it globally **************//
function printStudents(dataJSON) {

    dataJSON.forEach(element => {
        // store globally
        storage.push(element)
        //gets table
        const table = document.getElementById('registrar-table')
        // runs addTableRow function to add rows of json data
        addTableRow(element, table)
    });
    // updates label total
    label.innerHTML = "Total: " + dataJSON.length
}

//************** reset student table data **************//
function resetStudents(dataJSON) {

    const table = document.getElementById("registrar-table")
    // delates table data
    while (table.lastChild){
        table.removeChild(table.lastChild);
    }
    // creates table header
    table.innerHTML = "<thead><th>Name</th><th>Under 18?</th><th>Email</th><th>Registration Time</th> <th>Grade</th> <th>High School</th><th>Session 1</th><th>Session 2</th></thead><tbody></tbody>";
    // adds back table rows
    dataJSON.forEach(element => {
        addTableRow(element, table)
    });
    // updates label total upon reset
    label.innerHTML = "Total: " + dataJSON.length
}


const summerCampForm = document.getElementById("summerCampRegistration");

summerCampForm.addEventListener("submit", (event) => {
    // prevent default
    event.preventDefault();
    // change it to formdata
    new FormData(summerCampForm);
});


summerCampForm.addEventListener("formdata", (event) => {
    // get the form data (in its raw form)
    const data = event.formData;

    // make an empty object (JSON)
    const dataJSON = {};

    // look through each "name" attribute in the from
    for (const [key, value] of data.entries()) {
        dataJSON[key] = value;
    }

    //************** cleaning up data **************//

    //cleaning under 18 data
    if (dataJSON.under18 == "on") {
        dataJSON.under18 = true;
    }
    else {
        dataJSON.under18 = false;
    }

    // cleaning session1 data
    const session1 = []

    const session1slot1 = dataJSON["session1-slot1"]
    const session1slot2 = dataJSON["session1-slot2"]
    const session1slot3 = dataJSON["session1-slot3"]
    const session1slot4 = dataJSON["session1-slot4"]

    if (session1slot1 != 'None') {
        session1.push(session1slot1)
    }
    if (session1slot2 != 'None') {
        session1.push(session1slot2)
    }

    if (session1slot3 != 'None') {
        session1.push(session1slot3)
    }
    if (session1slot4 != 'None') {
        session1.push(session1slot4)
    }

    delete dataJSON["session1-slot1"]
    delete dataJSON["session1-slot2"]
    delete dataJSON["session1-slot3"]
    delete dataJSON["session1-slot4"]

    dataJSON.session1 = session1

    //cleaning session2 data
    const session2 = []

    const session2slot1 = dataJSON["session2-slot1"]
    const session2slot2 = dataJSON["session2-slot2"]
    const session2slot3 = dataJSON["session2-slot3"]
    const session2slot4 = dataJSON["session2-slot4"]

    // if button is not none push to session2
    if (session2slot1 != 'None') {
        session2.push(session2slot1)
    }
    if (session2slot2 != 'None') {
        session2.push(session2slot2)
    }
    if (session2slot3 != 'None') {
        session2.push(session2slot3)
    }
    if (session2slot4 != 'None') {
        session2.push(session2slot4)
    }

    // deletes session2 slots data
    delete dataJSON["session2-slot1"]
    delete dataJSON["session2-slot2"]
    delete dataJSON["session2-slot3"]
    delete dataJSON["session2-slot4"]

    // attach it to the data
    dataJSON.session2 = session2

    // timestamp
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();

    const dateString = `${year}-${month}-${date} ${hour}:${minute}:${second}`;

    // attach it to the data
    dataJSON.timestamp = dateString

    // push to global data for search function
    storage.push(dataJSON)
    console.log(storage)

    // add input data to table 
    const table = document.getElementById('registrar-table')
    addTableRow(dataJSON, table)

    // updates label total
    label.innerHTML = "Total: " + storage.length

    //resets form when submitted
    summerCampForm.reset();

});

//**************   Add Table Row   **************/ 

function addTableRow(data, table) {

    const newRow = document.createElement("tr");
    const nameD = document.createElement("td");
    const underD = document.createElement("td");
    const emailD = document.createElement("td");
    const timeD = document.createElement("td");
    const gradeD = document.createElement("td");
    const highSchoolD = document.createElement("td");
    const session1D = document.createElement("td");
    const session2D = document.createElement("td");

    nameD.innerHTML = data.lastName + ', ' + data.firstName;
    underD.innerHTML = data.under18
    if (data.under18 == true) {
        underD.innerHTML = 'Yes'
    }
    else {
        underD.innerHTML = 'No'
    }
    emailD.innerHTML = data.email
    timeD.innerHTML = data.timestamp
    gradeD.innerHTML = data.grade
    highSchoolD.innerHTML = data.highschool
    session1D.innerHTML = data.session1
    session2D.innerHTML = data.session2

    newRow.appendChild(nameD);
    newRow.appendChild(underD);
    newRow.appendChild(emailD);
    newRow.appendChild(timeD);
    newRow.appendChild(gradeD);
    newRow.appendChild(highSchoolD);
    newRow.appendChild(session1D);
    newRow.appendChild(session2D);

    table.appendChild(newRow);
}

//**************   search   **************/ 

const search = document.getElementById("search-button");

search.addEventListener("click", (event) => {

    const table = document.getElementById('registrar-table')
    // removes data from table  
    while (table.lastChild){
        table.removeChild(table.lastChild);
    }
    //gets search input
    const searchInput = document.getElementById("search-input").value

    //filters to only select session1 and session2 courses included in searchInput
    const matching = storage.filter((course)=>{
        return course.session1.includes(searchInput) + course.session2.includes(searchInput)
    })

    //creates table header
    table.innerHTML = "<thead><th>Name</th><th>Under 18?</th><th>Email</th><th>Registration Time</th> <th>Grade</th> <th>High School</th><th>Session 1</th><th>Session 2</th></thead><tbody></tbody>";
   
    //adds filtered searches to table
    matching.forEach(elem => {
        console.log(matching)
        addTableRow(elem, table)
    })

    // changes label to only show search total
    label.innerHTML = "Total: " + matching.length
});

//**************   reset   **************/ 

const reset = document.getElementById("reset-button");

reset.addEventListener("click", (event) => {

    // reset input
    const input = document.getElementById("search-input")
    input.value = "";
    input.placeholder = "course name";

    //reset table
    resetStudents(storage);

});

//**************   load JSON   **************/ 

function loadJSON(filename, func) {

    // create an object to load file
    const xobj = new XMLHttpRequest();

    // load the file
    xobj.open("GET", filename);

    // create the function to run when xobj reads the file
    xobj.onreadystatechange = () => {
        // check readiness for the object and text
        if (xobj.readyState == 4 && xobj.status == "200") {
            // get the file contents
            const responseText = xobj.responseText;

            // convert responseText from a raw string to a JSON object
            const dataJSON = JSON.parse(responseText);

            // now that the JSON is ready at this point (guaranteed)
            // run the function that needs this data
            func(dataJSON);
        }
    };
    // send the xobj out to web
    xobj.send();
}


//console.log(storage)
loadJSON("index.json", printStudents);