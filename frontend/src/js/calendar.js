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
    droppable: true,
    height: 500,
    events: [
      {
        id: 1,
        title: 'abc',
        start: new Date(),
        stick: true
      }
    ],
    eventDragStop: function (event, jsEvent, ui, view) {
      console.log("1")
      if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {

        event.start = view.currentRange.start._d;
        event.end = view.currentRange.end._d;
        console.log(view);
        console.log(event.start);
        console.log(event.end);
        $('#calendar').fullCalendar('updateEvent', event);

      }
    }
  });

  var isEventOverDiv = function (x, y) {

    const $tbody = $('tbody.fc-body');
    const offset = $tbody.offset();
    const xmin = offset.left;
    const ymin = offset.top;
    const xmax = xmin + $tbody.width();
    const ymax = ymin + $tbody.height();


    // Compare
    if (x >= xmin
      && y >= ymin
      && x <= xmax
      && y <= ymax) {
      return true;
    }
    return false;

  }


  var draggableItem = function () {

    var lecture = $("#draggable");
    lecture.data('event', {
      title: "Lecture:1"
    });
    lecture.draggable({
      zIndex: 999,
      revert: true,
      revertDuration: 0
    })

  };
// Draggable added
  draggableItem();
});