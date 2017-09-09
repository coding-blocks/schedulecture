/**
 * Created by apoorvaagupta on 9/05/17.
 */
$(document).ready(function () {
  var events = [];
  var draggableItem = function () {

console.log(moment().startOf('day'));
    var lecture = $(".collapse > a");
    lecture.each(function () {
      $(this).data('event', {
        title:  $.trim($(this).text()),
        start: moment().startOf('day'),
        stick: true,
        resourceId: 'a'
      });

      $(this).draggable({
        zIndex: 999,
        revert: true,
        revertDuration: 0
      });

    })


  };

  draggableItem();

  // page is now ready, initialize the calendar...

  $('#calendar').fullCalendar({
    // put your options and callbacks here
    schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
    header: {
      left: 'prev,next,today',
      center: 'title',
      right: 'month,agendaSevenDay,agendaFiveDay,agendaTwoDay,agendaOneDay'
    },
    fixedWeekCount: false,
    editable: true,
    droppable: true,
    minTime: "07:00:00",
    maxTime: "22:00:00",
    //height: 500,
    events: events,
    dayClick: function (date, jsEvent, view, resourceObj) {
      $('#calendar').fullCalendar('changeView', 'agendaOneDay', date);
    },
    resources: [
      {
        id: 'a', title: 'A', eventColor: 'rgb(255,0,0)'

      },
      {
        id: 'b', title: 'B', eventColor: 'rgb(0,255,0)'
      },

      {
        id: 'c', title: 'C', eventColor: 'rgb(0,0,255)'
      },
      {
        id: 'd', title: 'D', eventColor: 'rgb(255,0,255)'
      }
    ],
    views: {
      agendaFiveDay: {
        type: 'agenda',
        duration: {days: 5},
        groupByDateAndResource: true,
        buttonText: '5 days',
        dateIncrement: {days: 1}
      },
      agendaTwoDay: {
        type: 'agenda',
        duration: {days: 2},
        groupByDateAndResource: true,
        buttonText: '2 days',
        dateIncrement: {days: 1}
      },
      agendaOneDay: {
        type: 'agenda',
        duration: {days: 1},
        groupByDateAndResource: true,
        buttonText: 'day',
        dateIncrement: {days: 1}
      },
      agendaSevenDay: {
        type: 'agenda',
        duration: {days: 7},
        groupByDateAndResource: true,
        dateIncrement: {days: 1}
      }

    },
    eventDrop: function (event, delta, revertFunction, jsEvent, ui, view) {
      console.log("1");
      if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
        console.log(event.start);
        $('#calendar').fullCalendar('updateEvent', event);
      }
      console.log(($('#calendar').fullCalendar('clientEvents')));

    },
    drop: function (date, jsEvent, ui, resourceId) {
      console.log(2);
      // console.log(date);
      // console.log(resourceId)
      // console.log(($('#calendar').fullCalendar('clientEvents')));

      console.log("heyyyy "+ this);
      $(this).remove();

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
    if (x >= xmin && y >= ymin && x <= xmax && y <= ymax) {
      return true;
    }
    return false;

  }


});