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
    editable: true,
    droppable:true,
    height: 500,
    events: [
      {
        id: 1,
        title: 'abc',
        start: new Date()
      }
    ]
  })


  var draggableItem  = function () {

      var lecture  = $("#draggable");
      lecture.data('event',{
          title: "Lecture:1"
      });
      lecture.draggable({
          zIndex: 999,
          revert:true,
          revertDuration:0
      })

  };

  draggableItem();
});