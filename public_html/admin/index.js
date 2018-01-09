/**
 * Created by apoorvaagupta on 9/05/17.
 */
$(document).ready(function () {
  var api = '/api/v1';
  var eventsData;

  $('#mainContent').css('padding-top', ($('#header-bar').height() + 20) + 'px')
  $('#side-menu').css('height', ($(document.body).height() - $('#header-bar').height() - 20) + 'px')
  $('#calendarContainer').css('height', ($(document.body).height() - $('#header-bar').height() - 20) + 'px')

  $(window).resize(function () {
    $('#mainContent').css('padding-top', ($('#header-bar').height() + 20) + 'px')
    $('#side-menu').css('height', ($(document.body).height() - $('#header-bar').height() - 20) + 'px')
    $('#calendarContainer').css('height', ($(document.body).height() - $('#header-bar').height() - 20) + 'px')
    $('#calendar').fullCalendar('option', 'height', $('#calendarContainer').height() - 60);

  });

  let name = localStorage.getItem('name').split('%20').join(' ');
  $('#name').text('Hey ' + name);

  getCentres();

  $('#course-btn').click(function () {
    $('#filters').hide();
    $('#batches').show();
  })


  $('#filters-btn').click(function () {
    $('#batches').hide();
    $('#filters').show();

  })

  // $('[data-toggle="tooltip"]').tooltip();

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
        getFilters(centres[0].id);

        $centres.change(() => {
          getCentre(+($centres.val()));
          getFilters(+($centres.val()));
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

  function getFilters(centreId) {

    const filters = $('#filters');
    let teachersString = "";
    let batchesString = "";
    let roomsString = "";

    $.get(`${api}/teachers`, function (teachersData) {
      if (teachersData.success && teachersData.data.length > 1) {
        teachersString = `<div class="filter-column-divs">
                    <div class="filter-column-divs-heading">Teachers</div>
                    <div class="filter-column-divs-content">`;
        for (let i = 0; i < teachersData.data.length; i++) {
          teachersString += `
                        <label class="label-style">
                            <input class="checkbox-style" name="teachers" value="` + teachersData.data[i].id + `" type="checkbox">&nbsp;&nbsp;` + teachersData.data[i].name + `<br/>
                        </label>
                        <br>
                    `;
        }
        teachersString += `</div></div>`;
        filters.append(teachersString);

      }

      $.get(`${api}/centres/${centreId}/batches/active`, function (batchesData) {
        if (batchesData.success && batchesData.data.length > 1) {
          batchesString = `<div class="filter-column-divs">
                    <div class="filter-column-divs-heading">Batches</div>
                    <div class="filter-column-divs-content">`;
          for (let i = 0; i < batchesData.data.length; i++) {
            batchesString += `
                        <label class="label-style">
                            <input class="checkbox-style" name="batches" value="` + batchesData.data[i].id + `" type="checkbox">&nbsp;&nbsp;` + batchesData.data[i].name + `<br/>
                        </label>
                        <br>
                    `;
          }
          batchesString += `</div></div>`;
          filters.append(batchesString);

        }

        $.get(`${api}/centres/${centreId}/rooms`, function (roomsData) {
          if (roomsData.success && roomsData.data.length > 1) {
            roomsString = `<div class="filter-column-divs">
                    <div class="filter-column-divs-heading">Rooms</div>
                    <div class="filter-column-divs-content">`;
            for (let i = 0; i < roomsData.data.length; i++) {
              roomsString += `
                        <label class="label-style">
                            <input class="checkbox-style" name="rooms" value="` + roomsData.data[i].id + `" type="checkbox">&nbsp;&nbsp;` + roomsData.data[i].name + `<br/>
                        </label>
                        <br>
                    `;
            }
            roomsString += `</div></div>`;
            filters.append(roomsString);

          }

          $('input[type="checkbox"]').change(function () {
            getCentre(centreId);
            console.log("reached");
            let teachersArray = [];
            let batchesArray = [];
            let roomsArray = [];
            let count = 0;

            const teachersFilters = $('input[name="teachers"]');
            const batchesFilters = $('input[name="batches"]');
            const roomsFilters = $('input[name="rooms"]');

            for (let i = 0; i < teachersFilters.length; i++) {
              if (teachersFilters[i].checked) {
                teachersArray.push(+teachersFilters[i].value);
                count++;
              }
            }

            for (let i = 0; i < batchesFilters.length; i++) {
              if (batchesFilters[i].checked) {
                batchesArray.push(+batchesFilters[i].value);
                count++;
              }
            }

            for (let i = 0; i < roomsFilters.length; i++) {
              if (roomsFilters[i].checked) {
                roomsArray.push(+roomsFilters[i].value);
                count++;
              }
            }
            eventsData = $('#calendar')
            let filteredevents = $('#calendar').fullCalendar('clientEvents', function (event) {
              if ((teachersArray.length === 0 || teachersArray.includes(+event.teacherId)) &&
                (roomsArray.length === 0 || roomsArray.includes(+event.resourceId)) &&
                (batchesArray.length === 0 || batchesArray.includes(event.batchId)))
                return true;
              else
                return false;
            })
            console.log(filteredevents);

            // console.log(teachersArray)
            // console.log(batchesArray)
            // console.log(roomsArray)
            $('#calendar').fullCalendar('removeEvents');
            // console.log(filteredevents);
            $('#calendar').fullCalendar('addEventSource', filteredevents);

          })
        });
      });
    });


  }

  // $.get("/api/extra/filters", function (filters) {
  //
  //   const allFilter = $('#allFilters');
  //   if (filters.categoryObject && filters.categoryObject.length > 1) {
  //     let categoryString = `<div class="filter-column-divs">
  //                   <div class="filter-column-divs-heading"><b>CATEGORY</b></div>
  //                   <div class="filter-column-divs-content">`;
  //     for (let i = 0; i < filters.categoryObject.length; i++) {
  //       categoryString += `
  //                       <label class="label-style">
  //                           <input class="checkbox-style" name="category" value="` + filters.categoryObject[i].id + `" type="checkbox">` + filters.categoryObject[i].categoryName + `<br/>
  //                       </label>
  //                       <br>
  //                   `;
  //     }
  //     categoryString += `</div></div>`;
  //     allFilter.append(categoryString);
  //
  //   }
  //   if (filters.subjectObject && filters.subjectObject.length > 1) {
  //     let subjectString = `<div class="filter-column-divs">
  //                   <div class="filter-column-divs-heading"><b>SUBJECT</b></div>
  //                   <div class="filter-column-divs-content">`;
  //     for (let i = 0; i < filters.subjectObject.length; i++) {
  //       subjectString += `
  //                       <label class="label-style">
  //                           <input class="checkbox-style" name="subject" value="` + filters.subjectObject[i].id + `" type="checkbox">` + filters.subjectObject[i].subjectName + `<br/>
  //                       </label>
  //                       <br>
  //                   `;
  //     }
  //     subjectString += `</div></div>`;
  //     allFilter.append(subjectString);
  //
  //   }
  //   if (filters.classObject && filters.classObject.length > 1) {
  //     let classString = `<div class="filter-column-divs">
  //                   <div class="filter-column-divs-heading"><b>CLASS</b></div>
  //                   <div class="filter-column-divs-content">`;
  //     for (let i = 0; i < filters.classObject.length; i++) {
  //       classString += `
  //                       <label class="label-style">
  //                           <input class="checkbox-style" name="class" value="` + filters.classObject[i].id + `" type="checkbox">` + filters.classObject[i].className + `<br/>
  //                       </label>
  //                       <br>
  //                   `;
  //     }
  //     classString += `</div></div>`;
  //     allFilter.append(classString);
  //
  //   }
  // })

  function showBatchesAndRooms(centre) {

    const events = [];
    const resources = [];
    const colors = ['#EB5667', '#1E88E5', '#B96BC6', '#28B294', '#FF8F00', '#31C6C7'];
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
                <span>${room.name} (${room.capacity})</span>
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
                    teacherId: batch.teacher.id,
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
                    teacherId: batch.teacher.id,
                    teacherName: batch.teacher.name,
                    courseName: batch.course.name
                  });

                  $lecture.draggable({
                    zIndex: 9999,
                    revert: true,
                    revertDuration: 0,
                    scroll: false,
                    helper: "clone",
                    appendTo: "body"
                  }).css('z-index', 1000);
                }
              });

            });
            $('#calendar').css('overflow-y', 'scroll');
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
              height: $('#calendarContainer').height() - 60,
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
                let overlappingLectures = $('#calendar').fullCalendar('clientEvents', function (curEvent) {
                  if ((event.start.format() >= curEvent.start.format() && event.start.format() < curEvent.end.format())
                    || (event.end.format() > curEvent.start.format() && event.end.format() <= curEvent.end.format()))
                    return true;
                  else
                    return false;
                })

                let flag = false;

                overlappingLectures.map(function (v) {
                  if (+event.lectureId != v.lectureId && +event.teacherId == v.teacherId) {
                    flag = true;
                  }
                })

                if (flag)
                  $.toast({
                    heading: 'Warning',
                    icon: 'error',
                    text: `${event.teacherName} has another class during this time.`,
                    position: 'top-right',
                    stack: 4,
                    hideAfter: 4000,
                    showHideTransition: 'slide',
                    loaderBg: '#fc4f4f;'
                  })

                var index = -1;
                resources.map(function (v, i) {
                  if (v.id === +event.resourceId) {
                    index = i;
                  }
                  return v;
                });
                if (index != -1 && event.batchCapacity > resources[index].capacity) {
                  // alert("Batch Capacity greater than room size.");

                  $.toast({
                    heading: 'Warning',
                    icon: 'error',
                    text: `Batch Capacity greater than room size.`,
                    position: 'top-right',
                    stack: 4,
                    hideAfter: 2000,
                    showHideTransition: 'slide',
                    loaderBg: '#fc4f4f;'
                  })
                }

                updateLecture(event);
              },
              drop: function (date, jsEvent, ui, resourceId) {
                // console.log(2);
                $(this).remove();

              },
              eventReceive: function (event) {
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
                  // alert("Batch Capacity greater than room size.");

                  $.toast({
                    heading: 'Warning',
                    icon: 'error',
                    text: `Batch Capacity greater than room size.`,
                    position: 'top-right',
                    stack: 4,
                    hideAfter: 2000,
                    showHideTransition: 'slide',
                    loaderBg: '#fc4f4f;'
                  })
                }

                // warning: only one lecture for the teacher at a time.
                // events.map(function (v,i) {
                //   if()
                // })


                let overlappingLectures = $('#calendar').fullCalendar('clientEvents', function (curEvent) {
                  if ((event.start.format() >= curEvent.start.format() && event.start.format() < curEvent.end.format())
                    || (event.end.format() > curEvent.start.format() && event.end.format() <= curEvent.end.format()))
                    return true;
                  else
                    return false;
                })

                let flag = false;

                overlappingLectures.map(function (v) {
                  if (+event.lectureId != v.lectureId && +event.teacherId == v.teacherId) {
                    flag = true;
                  }
                })

                if (flag)
                  $.toast({
                    heading: 'Warning',
                    icon: 'error',
                    text: `${event.teacherName} has another class during this time.`,
                    position: 'top-right',
                    stack: 4,
                    hideAfter: 4000,
                    showHideTransition: 'slide',
                    loaderBg: '#fc4f4f;'
                  })


              },
              eventResize: function (event, delta, revertFunc) {

                let overlappingLectures = $('#calendar').fullCalendar('clientEvents', function (curEvent) {
                  if ((event.start.format() >= curEvent.start.format() && event.start.format() < curEvent.end.format())
                    || (event.end.format() > curEvent.start.format() && event.end.format() <= curEvent.end.format()))
                    return true;
                  else
                    return false;
                })

                let flag = false;

                overlappingLectures.map(function (v) {
                  if (+event.lectureId != v.lectureId && +event.teacherId == v.teacherId) {
                    flag = true;
                  }
                })

                if (flag)
                  $.toast({
                    heading: 'Warning',
                    icon: 'error',
                    text: `${event.teacherName} has another class during this time.`,
                    position: 'top-right',
                    stack: 4,
                    hideAfter: 4000,
                    showHideTransition: 'slide',
                    loaderBg: '#fc4f4f;'
                  })

              },
              eventClick: function (event, jsEvent, view) {
                $(jsEvent.currentTarget).tooltip('dispose');

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

                var index = -1;
                resources.map(function (v, i) {
                  if (v.id === +event.resourceId) {
                    index = i;
                  }
                  return v;
                });
                if (index != -1 && event.batchCapacity > resources[index].capacity) {
                  // alert("Batch Capacity greater than room size.");

                  $.toast({
                    heading: 'Warning',
                    icon: 'error',
                    text: `Batch Capacity greater than room size.`,
                    position: 'top-right',
                    stack: 4,
                    hideAfter: 2000,
                    showHideTransition: 'slide',
                    loaderBg: '#fc4f4f;'
                  })
                }

              },

              eventMouseover: function (event, jsEvent, view) {
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
                  }).tooltip('show');
              }

            });
            // $('[data-toggle="tooltip"]').tooltip();

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
      if (!data.success) {
        alert('Could Not Update The Lecture');
      }
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
