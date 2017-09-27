/**
 * Created by apoorvaagupta on 9/05/17.
 */
$(document).ready(function () {
  var events = [];

  var api = 'http://localhost:4000/api/v1';

  var getBatches = function () {

    const $batches = $('#batches');

    $.get(`${api}/batches/`).done(function (data) {
      if (data.success) {
        let batches = data.data;
        batches.forEach((batch) => {
          $batches.append(`
            <a href="#batch-${batch.name}" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar"
               aria-expanded="false">
              <span class="hidden-sm-down">
                ${batch.name}
              </span>
            </a>
                        
            <div class="collapse" id="batch-${batch.name}">                 
            </div>
          `);
        });


        batches.forEach(function (batch) {
          const $lectures = $(`#batch-${batch.name}`);
          $.get(`${api}/batches/${batch.id}/lectures`).done((data) => {
            if (data.success) {
              let lectures = data.data;
              lectures.forEach((lecture) => {

                $lectures.append(`
                  <a id="lecture-${lecture.id}" class="list-group-item" data-parent="#batch-${batch.name}" draggable="true">
                    ${lecture.name}
                  </a>
                `);

                const $lecture = $(`#lecture-${lecture.id}`);

                $lecture.data('event', {
                  lectureId:lecture.id,
                  title: lecture.name,
                  start: moment().startOf('day').add(10, 'hours'),
                  end: moment().startOf('day').add(12, 'hours'),
                  stick: true,
                  resourceId: 'a'
                });

                $lecture.draggable({
                  zIndex: 999,
                  revert: true,
                  revertDuration: 0
                })

              })
            } else {
              console.log('No Lectures for batch ' + batch.name);
            }
          }).fail((err) => {
            console.log(err)
          })
        });


      } else {
        alert('There are no Batches');
      }
    }).fail(function (err) {
      console.log(err)
    })
  };

  getBatches();

  var draggableItem = function () {

    var lecture = $(".collapse > a");
    lecture.each(function () {
      $(this).data('event', {
        title: $.trim($(this).text()),
        start: moment().startOf('day').add(10, 'hours'),
        stick: true,
        resourceId: 'a'
      });

      $(this).draggable({
        zIndex: 999,
        revert: true,
        revertDuration: 0
      });
      // events.push($(this).data('event'));
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
      console.log(event);
      console.log(($('#calendar').fullCalendar('clientEvents')));

    },
    drop: function (date, jsEvent, ui, resourceId) {
      console.log(2);
      $(this).remove();

    },
    eventReceive: function (event) {
      console.log(event);
      event.start = event.start.add(10, 'hours');
      event.end = event.start.add(13, 'hours');
      console.log(event.start._d)
      $('#calendar').fullCalendar('updateEvent', event);
      $.put(`${api}/lectures/${event.lectureId}`,{
        values: {
          startTime: event.start._d,
          endTime: event.end._d,

        }
      })
    }

  });


});