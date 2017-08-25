/**
 * Created by aayusharora on 8/25/17.
 */
$(document).ready(function () {

  // page is now ready, initialize the calendar...

  $('#calendar').fullCalendar({
    // put your options and callbacks here
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    fixedWeekCount: false,
    height: 500,
    editable: true,

  })

});