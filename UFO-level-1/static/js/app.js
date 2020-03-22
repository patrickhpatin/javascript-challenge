// +++++++++++++++++++++++++++++++++++++++
//         Variable Declarations
// +++++++++++++++++++++++++++++++++++++++
// from data.js
var tableData = data;
var filteredData = data;

// Get a reference to the table body
var tbody = d3.select("tbody");

// Get the input field
var input = document.getElementById("ufoFilterForm");

var ufoFilter = {
  datetime: "",
  city: "",
  state: "",
  country: "",
  shape: ""
};

// +++++++++++++++++++++++++++++++++++++++
//               The Code
// +++++++++++++++++++++++++++++++++++++++
function DoTheFiltering(ufoRecord) {
  return (
    (ufoRecord["datetime"] == ufoFilter["datetime"] || ufoFilter["datetime"] == "")
    // && (ufoRecord["city"] == ufoFilter["city"] || ufoFilter["city"] == "") 
    // && (ufoRecord["state"] == ufoFilter["state"] || ufoFilter["state"] == "") 
    // && (ufoRecord["country"] == ufoFilter["country"] || ufoFilter["country"] == "") 
    // && (ufoRecord["shape"] == ufoFilter["shape"] || ufoFilter["shape"] == "")
  );
};

function filterDisplayData() {
  tbody.html("");
  filteredData.forEach(ufoSighting => {
    var row = tbody.append("tr");
    Object.entries(ufoSighting).forEach(function([key, value]) {
      // Append a cell to the row for each value
      var cell = row.append("td");
      cell.text(value);
    });
  });
};

// +++++++++++++++++++++++++++++++++++++++
//           Event Listeners
// +++++++++++++++++++++++++++++++++++++++
// d3.selectAll(".form-control").on("keyup", () => {
//   ufoFilter[d3.event.target.id] = d3.event.target.value;
//   // ufoFilter[d3.event.target.id] = d3.event.target.value;
// });

d3.select("#filter-btn").on("click", () => {
  ufoFilter["datetime"] = d3.select("#datetime").node().value;
  // ufoFilter["city"] = d3.select("#city").node().value;
  // ufoFilter["state"] = d3.select("#state").node().value;
  // ufoFilter["country"] = d3.select("#country").node().value;
  // ufoFilter["shape"] = d3.select("#shape").node().value;

  filteredData = tableData.filter(DoTheFiltering);
  filterDisplayData();
});

// Cancel the default form submit action (i.e. refresh)
// And instead, call the button click to filter the data
// Execute a function when the user releases a key on the keyboard
input.addEventListener("submit", function(event) {
  // Cancel the default action, if needed
  event.preventDefault();
  // Trigger the button element with a click
  document.getElementById("filter-btn").click();
});

filterDisplayData();