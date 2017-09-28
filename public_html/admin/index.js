/**
 * Created by apoorvaagupta on 9/05/17.
 */
$(document).ready(function () {
  const events = [];
  const resources = [];
  const colors = ['rgb(255,0,0)', 'rgb(0,255,0)', 'rgb(0,0,255)', 'rgb(255,0,255)'];
  let colorCounter = 0;

  var api = 'http://localhost:4000/api/v1';

  var getBatchesAndRooms = function () {

    $.get(`${api}/rooms`).done((roomsData) => {
      if (roomsData.success) {

        const rooms = roomsData.data;

        rooms.forEach((room) => {
          resources.push({
            id: room.id,
            title: room.name,
            eventColor: 'rgb(255,0,0)',
            capacity: room.capacity,
            centreId: room.centreId
          });
        });

        const $batches = $('#batches');

        $.get(`${api}/batches/`).done((data) => {
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


              let lectures = batch.lectures;
              // console.log(lectures)
              lectures.forEach((lecture) => {
                if (lecture.startTime && lecture.endTime) {
                  // console.log(moment(lecture.startTime))
                  // console.log(lecture.endTime)
                  events.push({
                    lectureId: lecture.id,
                    title: lecture.name,
                    start: moment.utc(lecture.startTime),
                    end: moment.utc(lecture.endTime),
                    stick: true,
                    resourceId: '1'
                  });

                  console.log(events)
                  // $('#calendar').fullCalendar('refetchEvents');
                } else {

                  $lectures.append(`
                    <a id="lecture-${lecture.id}" class="list-group-item" data-parent="#batch-${batch.name}" draggable="true">
                        ${lecture.name}
                    </a>
                  `);


                  const $lecture = $(`#lecture-${lecture.id}`);

                  $lecture.data('event', {
                    lectureId: lecture.id,
                    title: lecture.name,
                    start: moment().startOf('day'),
                    stick: true,
                    resourceId: 'a'
                  });

                  $lecture.draggable({
                    zIndex: 999,
                    revert: true,
                    revertDuration: 0
                  })
                }

              })

            });


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
              resources: resources,
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
                console.log(event);
                $.ajax({
                  method: 'PUT',
                  url: `${api}/lectures/${event.lectureId}`,
                  data: {
                    values: {
                      startTime: event.start._d,
                      endTime: event.end._d,
                      date: event.start._d
                    }
                  }
                }).done(function (data) {
                  console.log(data)
                }).fail(function (err) {
                  console.log(err);
                })
              },
              drop: function (date, jsEvent, ui, resourceId) {
                // console.log(2);
                $(this).remove();

              },
              eventReceive: function (event) {
                // console.log(event);
                event.start = event.start.add(10, 'hours');
                event.end = moment(event.start).add(3, 'hours');
                // console.log(event.start._d.getDay())
                $('#calendar').fullCalendar('updateEvent', event);
                $.ajax({
                  method: 'PUT',
                  url: `${api}/lectures/${event.lectureId}`,
                  data: {
                    values: {
                      startTime: event.start._d,
                      endTime: event.end._d,
                      date: event.start._d
                    }
                  }
                }).done(function (data) {
                  console.log(data)
                }).fail(function (err) {
                  console.log(err);
                })
              }

            });

          } else {
            alert('There are no Batches');
          }
        }).fail((err) => {
          console.log(err)
        })
      } else {
        alert('No Rooms At This Centre.');
      }

    }).fail((err) => {
      console.log(err)
    })
  };

  getBatchesAndRooms();

});