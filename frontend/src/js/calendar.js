/**
 * Created by aayusharora on 8/25/17.
 */
$(document).ready(function () {
  var events = [];
  var draggableItem = function () {


    var lecture = $("#draggable > p");
    lecture.each(function () {
      $(this).data('event', {
        title: "Lecture:1",
        resourceId: 'a',
        start: $.fullCalendar.moment()
      });

      $(this).draggable({
        zIndex: 999,
        revert: true,
        revertDuration: 0
      });
      events.push($(this).data().event);
    })


  };

  draggableItem();

  // page is now ready, initialize the calendar...

  $('#calendar').fullCalendar({
    // put your options and callbacks here
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    fixedWeekCount: false,
    editable: true,
    droppable: true,
    height: 500,
    events: events,
    resources: [
      {
        id: 'a', title: 'A',eventColor: 'rgb(255,0,0)'

      },
      {
        id: 'b', title: 'B',eventColor: 'rgb(0,255,0)'
      },
      {
        id: 'c', title: 'C',eventColor: 'rgb(0,0,255)'
      },
      {
        id: 'd', title: 'D',eventColor: 'rgb(255,0,255)'
      }
    ],
    eventDrop: function (event, delta, revertFunction, jsEvent, ui, view) {
      console.log("1");
      if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
        console.log(event.start);
        $('#calendar').fullCalendar('updateEvent', event);
      }
    },
    drop: function (date) {
      console.log(2);
      console.log(date);
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


});