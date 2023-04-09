var total_arrival_quota = 150;
var total_arrival_completed;

/************************************/
function CalculateArrival() {
  var interview_data_temp  = JSON.parse(interview_data_arr_raw);
  
  total_arrival_completed = 0;
  for (i = 0; i < interview_data_temp.length; i++) {
    var interview = interview_data_temp[i];
    //only get complete interview & not test
    if ((interview.InterviewState == "Complete")
      && (isCurrentMonth(interview.InterviewEndDate))
      )
    {
      total_arrival_completed++;
    }
  }

  }


