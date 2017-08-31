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
        start: moment().startOf('day'),
        stick: true,
        resourceId: 'a'
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
      left: 'prev,next,today',
      center: 'title',
      right: 'month,agendaSevenDay,agendaFiveDay,agendaTwoDay,agendaOneDay'
    },
    fixedWeekCount: false,
    editable: true,
    droppable: true,
    height: 500,
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
      },
      // {
      //   id: 'e', title: 'D',eventColor: 'rgb(255,0,255)'
      // }
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
      console.log(date);
      console.log(resourceId)
      console.log(($('#calendar').fullCalendar('clientEvents')));

    }
  });

  var todayDate = moment().startOf('day');
  var YESTERDAY = todayDate.clone().subtract(1, 'day').format('YYYY-MM-DD');
  var TODAY = todayDate.format('YYYY-MM-DD');
  var TOMORROW = todayDate.clone().add(1, 'day').format('YYYY-MM-DD');

  // $('#calendar').fullCalendar({
  //   schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
  //   resourceAreaWidth: 230,
  //   editable: true,
  //   droppable: true,
  //   scrollTime: '00:00',
  //   fixedWeekCount: false,
  //   header: {
  //     left: 'promptResource today prev,next',
  //     center: 'title',
  //     right: 'timelineDay,timelineThreeDays,agendaWeek,month'
  //   },
  //   height: 500,
  //   customButtons: {
  //     promptResource: {
  //       text: '+ room',
  //       click: function () {
  //         var title = prompt('Room name');
  //         if (title) {
  //           $('#calendar').fullCalendar(
  //             'addResource',
  //             {title: title},
  //             true // scroll to the new resource?
  //           );
  //         }
  //       }
  //     }
  //   },
  //   defaultView: 'timelineDay',
  //   views: {
  //     timelineThreeDays: {
  //       type: 'timeline',
  //       duration: {days: 3}
  //     }
  //   },
  //   resourceLabelText: 'Rooms',
  //   resources: [
  //     {id: 'a', title: 'Auditorium A'},
  //     {id: 'b', title: 'Auditorium B', eventColor: 'green'},
  //     {id: 'c', title: 'Auditorium C', eventColor: 'orange'},
  //     {id: 'e', title: 'Auditorium E', eventColor: 'red'}
  //   ],
  //   events: [
  //     {id: '1', resourceId: 'b', start: TODAY + 'T02:00:00', end: TODAY + 'T07:00:00', title: 'event 1'},
  //     {id: '2', resourceId: 'c', start: TODAY + 'T05:00:00', end: TODAY + 'T22:00:00', title: 'event 2'},
  //     {id: '3', resourceId: 'd', start: YESTERDAY, end: TOMORROW, title: 'event 3'},
  //     {id: '4', resourceId: 'e', start: TODAY + 'T03:00:00', end: TODAY + 'T08:00:00', title: 'event 4'},
  //     {id: '5', resourceId: 'f', start: TODAY + 'T00:30:00', end: TODAY + 'T02:30:00', title: 'event 5'}
  //   ],
  //   eventDrop: function (event, delta, revertFunction, jsEvent, ui, view) {
  //     console.log("1");
  //     if (isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
  //       console.log(event.start);
  //       $('#calendar').fullCalendar('updateEvent', event);
  //     }
  //   },
  //   drop: function (date) {
  //     console.log(2);
  //     console.log(date);
  //   }
  // });


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