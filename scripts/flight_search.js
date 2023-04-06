var flightRawList;
var flightList = [];
var flightShortList = [];
var flightForInterview;
/************************************/
function getToDate() {
  var d = new Date();
      
  month = '' + (d.getMonth() + 1),
  day = '' + d.getDate(),
  year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [day, month,year].join('-');
}

 function flight_in_list_found(list, item) {
  item = item.toLowerCase();
  
  if (item) {
    if (item !== "") {
      for (i = 0; i < list.length; i++) {
        if (list[i].Show.toLowerCase() === item) {
          return true;
        }
      }
    }
  }
  return false;
}

function load_flight_list() {
  flightRawList = JSON.parse(BLL_Departures_Flight_List_Raw);
  flightList = [];
  flightList.length = 0;
  flightShortList = [];
  flightShortList.length = 0;

  for (i = 0; i < flightRawList.length; i++) {
    var flight = flightRawList[i];
    if ((flight.Date == getToDate()) //today flight && departure
    ) 
    {
      {
        
        var Date = '"Date"' + ":" + '"' +  flightRawList[i].Date + '", ';
        var Time = '"Time"' + ":" + '"' +  flightRawList[i].Time + '", ';
        var Flight = '"Flight"' + ":" + '"' +  flightRawList[i].Flight + '", ';
        var Airline = '"Airline"' + ":" + '"' +  flightRawList[i].Airline + '", '; //name
        var AirlineCode = '"AirlineCode"' + ":" + '"' +  flightRawList[i].AirlineCode + '", ';//code
        var Dest = '"Dest"' + ":" + '"' +  flightRawList[i].Dest + '", ';
        var DestName = '"DestName"' + ":" + '"' +  flightRawList[i].DestName + '", ';
        var Via = "";
        var ViaName = "";

        if (  flightRawList[i].Next && flightRawList[i].Next !="" && flightRawList[i].Next != flightRawList[i].Dest) {
          Via = '"Via"' + ":" + '"' +  flightRawList[i].Next + '", ';
          ViaName = '"ViaName"' + ":" + '"' +  flightRawList[i].NextName + '", ';
        }

        var Show = '"Show"' + ":" + '"' +  flightRawList[i].Flight + " (" 
        Show += flightRawList[i].Time + " to " + flightRawList[i].DestName ;
        if (flightRawList[i].Next && flightRawList[i].Next !="" && flightRawList[i].Next != flightRawList[i].Dest) {
          Show += " via " +  flightRawList[i].Next ;
        }
        Show +=")";

        var str = '{' + Date + Time + AirlineCode + Airline + Flight +  Dest + DestName + Via + ViaName +  Show + '"}';
      
        flightList.push(JSON.parse(str));
      }
    }
  }
  console.log("flightList: ", flightList);
}

function update_drop_box_list() {
  var input = document.getElementById('inputFlightCodeID').value;
  var searchList = document.getElementById('flightDropBoxList');
  
  searchList.innerHTML = '';
  flightShortList = [];
  flightShortList.length = 0;

  input = input.toLowerCase();

  var count = 0;
  for (i = 0; i < flightList.length; i++) {
    let flight = flightList[i];
    var today = getToDate();
    
    if (today == flight.Date)
    { 
      if (flight.Show.toLowerCase().includes(input)) {
        const elem = document.createElement("option");
        elem.value = flight.Show;
        searchList.appendChild(elem);
        flightShortList.push(flight);
        count++;
      }
    }
    
    if (count > 7) {
      break;
    }
  }

  if (flight_in_list_found(flightList, document.getElementById('inputFlightCodeID').value)) {
    console.log("Found ", document.getElementById('inputFlightCodeID').value);
  }
  else{
    console.log("Not found ", document.getElementById('inputFlightCodeID').value);
  }  
  
  console.log("search flight done!");
}

function select_flight() {
  var selectedFlight = document.getElementById('inputFlightCodeID').value;
  var found = false;

  for (i = 0; i < flightShortList.length; i++) {
    var currentFlight = flightShortList[i];
    if (currentFlight.Show == selectedFlight) { 
      //store detail data here
      //Search engine to produce Flight no., Airline, Destination, Via - to be added later
      flightForInterview = currentFlight;
      console.log("currentFlight: ", flightForInterview);
      found = true;
      break;
    }
  }
  if (!found) {
    alert("Please select a flight number from the list.");
  }
}

