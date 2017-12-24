/**
 * Created by apoorvaagupta on 9/05/17.
 */
$(document).ready(function () {

  var api = '/api/v1';

  let name = localStorage.getItem('name').split('%20').join(' ');
  $('#name').text('Hey ' + name);

  getCentres();
  $('[data-toggle="tooltip"]').tooltip();

  function getCentres() {

    $.get(`${api}/centres`).done((centresData) => {
      if (centresData) {
        const centres = centresData.data;
        const $centres = $("#centres");
        centres.forEach((centre) => {
          $centres.append(`
            <option value="${centre.id}">${centre.name}</option>
          `);
        });
        showBatchesAndRooms(centres[0]);

        $centres.change(() => {
          getCentre(+($centres.val()));
        })
      } else {
        alert('No Centres.');
      }
    }).fail((err) => {
      alert('No Centres.');
      console.log(err);
    });

  }

  function getCentre(centreId) {
    $.get(`${api}/centres/${centreId}`).done((centreData) => {
      if (centreData.success) {
        showBatchesAndRooms(centreData.data);
      } else {
        alert('Unknown Centre')
      }
    }).fail((err) => {
      alert('Unknown Centre.');
      console.log(err);
    });
  }

  function showBatchesAndRooms(centre) {

    const events = [];
    const resources = [];
    const colors = ['#EB5667', '#F6AB60', '#28B294', '#31C6C7', '#B96BC6', '#2278CF'];
    let colorCounter = 0;

    $('#calendar').remove();

    $('#calendarContainer').append(`
    <div id="calendar"></div>
    `);

    $.get(`${api}/centres/${centre.id}/rooms`).done((roomsData) => {
      if (roomsData.success) {

        const rooms = roomsData.data;
        const $colors = $('#colors');
        $colors.empty().append(`
              <div class="col">
              </div>
              <div class="col">
              </div>
          `);

        rooms.forEach((room) => {
          let currentColor = colors[colorCounter++ % colors.length];
          resources.push({
            id: room.id,
            title: room.name,
            eventColor: currentColor,
            capacity: room.capacity,
            centreId: room.centreId
          });
          $colors.append(`
              <div class="col">
                <div style="display: inline-block;height: 15px;width: 15px; background-color: ${currentColor}"></div>
                <span>${room.name}</span>
              </div>
          `)
        });

        $colors.append(`
              <div class="col">
              </div>
              <div class="col">
              </div>
          `);

        const $batches = $('#batches');
        $batches.empty();

        $.get(`${api}/centres/${centre.id}/batches`).done((data) => {
          if (data.success) {
            let batches = data.data;
            batches.forEach((batch) => {
              $batches.append(`
                <a href="#batch-${batch.id}" class="list-group-item collapsed" data-toggle="collapse" data-parent="#sidebar"
                    aria-expanded="false">
                <span class="hidden-sm-down">
                    ${batch.name}
                </span>
                </a>
                        
                <div class="collapse" id="batch-${batch.id}">                 
                </div>
              `);
            });

            batches.forEach(function (batch) {
              const $lectures = $(`#batch-${batch.id}`);
              let lectures = batch.lectures.sort(function (batch1, batch2) {
                return batch1.id - batch2.id;
              });
              lectures.forEach((lecture) => {
                if (lecture.startTime && lecture.endTime) {
                  events.push({
                    lectureId: lecture.id,
                    title: lecture.name,
                    start: moment.utc(lecture.startTime),
                    end: moment.utc(lecture.endTime),
                    stick: true,
                    resourceId: lecture.roomId,
                    batchCapacity: batch.size,
                    batchName: batch.name,
                    teacherName: batch.teacher.name,
                    courseName: batch.course.name
                  });
                } else {
                  $lectures.append(`
                    <a id="lecture-${lecture.id}" class="list-group-item" data-parent="#batch-${batch.id}" draggable="true">
                        ${lecture.name}
                    </a>
                  `);

                  const $lecture = $(`#lecture-${lecture.id}`);

                  $lecture.data('event', {
                    lectureId: lecture.id,
                    title: lecture.name,
                    hours: batch.hoursPerLecture !== null ? batch.hoursPerLecture : batch.course.hours,
                    start: moment().startOf('day'),
                    stick: true,
                    defaultRoom: batch.roomId,
                    defaultTime: batch.defaultTime,
                    batchCapacity: batch.size,
                    batchName: batch.name,
                    teacherName: batch.teacher.name,
                    courseName: batch.course.name
                  });

                  $lecture.draggable({
                    zIndex: 999,
                    revert: true,
                    revertDuration: 0
                  });
                }
              });

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
                updateLecture(event);
              },
              drop: function (date, jsEvent, ui, resourceId) {
                // console.log(2);
                $(this).remove();

              },
              eventReceive: function (event) {
                console.log(event);
                let defaultTime = event.defaultTime;
                let defaultHours = +defaultTime.split(':')[0];
                let defaultMinutes = +defaultTime.split(':')[1];
                if (event.start._d.getUTCHours() == 0) {
                  event.start = moment(event.start).add(defaultHours, 'hours').add(defaultMinutes, 'minutes');
                  event.end = moment(event.start).add(event.hours, 'hours');
                } else {
                  event.end = moment(event.start).add(event.hours, 'hours');
                }
                event.resourceId = event.resourceId || event.defaultRoom;

                $('#calendar').fullCalendar('updateEvent', event);
                updateLecture(event);

                var index = -1;
                resources.map(function (v, i) {
                  if (v.id === +event.resourceId) {
                    index = i;
                  }
                  return v;
                });
                if (index != -1 && event.batchCapacity > resources[index].capacity) {
                  alert("Batch Capacity greater than room size.");
                }
              },
              eventClick: function (event, jsEvent, view) {
                var index = -1;
                resources.map(function (v, i) {
                  if (v.id === +event.resourceId) {
                    index = i;
                  }
                  return v;
                });

                let prevRoom = resources[(index) % resources.length];
                let newRoom = resources[(index + 1) % resources.length]
                event.resourceId = newRoom.id;
                $('#calendar').fullCalendar('updateEvent', event);
                updateLecture(event);

                $.toast({
                  heading: 'Information',
                  icon: 'info',
                  text: `Room Changed from ${prevRoom.title} to ${newRoom.title}`,
                  position: 'top-right',
                  stack: 4,
                  hideAfter: 1500,
                  showHideTransition: 'slide',
                  loaderBg: '#fc4f4f;'
                })
              },

              eventMouseover: function (event, jsEvent, view) {
                console.log(event)
                var index = -1;
                resources.map(function (v, i) {
                  if (v.id === +event.resourceId) {
                    index = i;
                  }
                  return v;
                });

                $(jsEvent.currentTarget).tooltip(
                  {
                    html: true,
                    title: `
                              Course: ${event.courseName}<br/>
                              Batch: ${event.batchName}<br/>
                              Teacher: ${event.teacherName}<br/>
                              Batch Capacity: ${event.batchCapacity}<br/>                             
                              Room: ${resources[index].title}<br/>
                    `
                  })
              }

            });

          } else {
            alert('There are no Batches');
          }
        }).fail((err) => {
          alert('No Batches At This Centre.');
          console.log(err)
        })
      } else {
        alert('No Rooms At This Centre.');
      }

    }).fail((err) => {
      alert('No Rooms At This Centre.');
      console.log(err)
    });
  }

  function updateLecture(event) {
    $.ajax({
      method: 'PUT',
      url: `${api}/lectures/${event.lectureId}`,
      data: {
        values: {
          startTime: event.start._d,
          endTime: event.end._d,
          date: event.start._d,
          roomId: +event.resourceId
        }
      },
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("clienttoken")
      }
    }).done(function (data) {
      // console.log(data)
    }).fail(function (err) {
      alert('Could Not Update The Lecture');
      console.log(err);
    })
  }

  $('#logout').click(function () {
    localStorage.clear();
    window.location.replace('/users/logout');
  })

});
