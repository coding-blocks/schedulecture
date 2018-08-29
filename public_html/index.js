/**
 * Created by bhavyaagg on 01/10/17.
 */

$(document).ready(function () {

  let clienttokenArray = window.location.href.split('?');
  let getBatch = "all";

  if (clienttokenArray
    && clienttokenArray.length === 2
    && clienttokenArray[1].indexOf("clienttoken=") !== -1
    && clienttokenArray[1].indexOf("name=") !== -1) {

    let queryArray = clienttokenArray[1].split('&');
    let clientToken = queryArray[0].split('clienttoken=')[1];
    let name = queryArray[1].split('name=')[1];

    localStorage.setItem('clienttoken', clientToken);
    localStorage.setItem('name', name);

    window.location.replace('/admin');
  }

  if (clienttokenArray
    && clienttokenArray.length === 2
    && clienttokenArray[1].indexOf("batch=") !== -1) {
    getBatch = clienttokenArray[1].split("batch=")[1];
  }

  var api = '/api/v1';
  var eventsData;


  $('#filters').show();

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
        $.toast({
          heading: 'Warning',
          icon: 'error',
          text: `No Centres`,
          position: 'top-right',
          stack: 4,
          hideAfter: 4000,
          showHideTransition: 'slide',
          loaderBg: '#fc4f4f;'
        });
      }
    }).fail((err) => {
      $.toast({
        heading: 'Warning',
        icon: 'error',
        text: `No Centres`,
        position: 'top-right',
        stack: 4,
        hideAfter: 4000,
        showHideTransition: 'slide',
        loaderBg: '#fc4f4f;'
      });
      console.log(err);
    });

  }

  getCentres();

  function getCentre(centreId) {
    $.get(`${api}/centres/${centreId}`).done((centreData) => {
      if (centreData.success) {
        showBatchesAndRooms(centreData.data);
      } else {
        $.toast({
          heading: 'Warning',
          icon: 'error',
          text: `Unknown Centres`,
          position: 'top-right',
          stack: 4,
          hideAfter: 4000,
          showHideTransition: 'slide',
          loaderBg: '#fc4f4f;'
        });
      }
    }).fail((err) => {
      $.toast({
        heading: 'Warning',
        icon: 'error',
        text: `Unknown Centres`,
        position: 'top-right',
        stack: 4,
        hideAfter: 4000,
        showHideTransition: 'slide',
        loaderBg: '#fc4f4f;'
      });
      console.log(err);
    });
  }

  function getFilters(centreId) {

    const filters = $('#filters');
    filters.empty();

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
          $('input[type="checkbox"]').off('change');
          for (let i = 0; i < batchesData.data.length; i++) {
            if (batchesData.data[i].name === getBatch) {
              $(`input[type="checkbox"][value="${batchesData.data[i].id}"]`).prop('checked', true)
            }
          }

          $('input[type="checkbox"]').change(function () {

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

            let filteredevents = eventsData.filter(function (event) {
              if ((teachersArray.length === 0 || teachersArray.includes(+event.teacherId)) &&
                (roomsArray.length === 0 || roomsArray.includes(+event.resourceId)) &&
                (batchesArray.length === 0 || batchesArray.includes(event.batchId)))
                return true;
              else
                return false;
            })

            $('#calendar').fullCalendar('removeEventSources');
            $('#calendar').fullCalendar('addEventSource', filteredevents);

          })
        });
      });
    });
  }

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

        $.get(`${api}/centres/${centre.id}/batches/?batch=${getBatch}`).done((data) => {
          if (data.success) {
            let batches = data.data;

            batches.forEach(function (batch) {
              let lectures = batch.lectures;
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
                    batchId: batch.id,
                    batchName: batch.name,
                    teacherId: batch.teacher.id,
                    teacherName: batch.teacher.name,
                    courseName: batch.course.name
                  });
                }
              });

            });

            eventsData = events.slice();
            $('#calendar').fullCalendar({
              // put your options and callbacks here
              schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
              header: {
                left: 'prev,next,today',
                center: 'title',
                right: 'month,agendaSevenDay,agendaFiveDay,agendaTwoDay,agendaOneDay'
              },
              fixedWeekCount: false,
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
          } else {
            $.toast({
              heading: 'Warning',
              icon: 'error',
              text: `There are no Batches`,
              position: 'top-right',
              stack: 4,
              hideAfter: 4000,
              showHideTransition: 'slide',
              loaderBg: '#fc4f4f;'
            })
          }
        }).fail((err) => {
          $.toast({
            heading: 'Warning',
            icon: 'error',
            text: `No Batches At This Centre`,
            position: 'top-right',
            stack: 4,
            hideAfter: 4000,
            showHideTransition: 'slide',
            loaderBg: '#fc4f4f;'
          });
          console.log(err)
        })
      } else {
        $.toast({
          heading: 'Warning',
          icon: 'error',
          text: `No Rooms At This Centre.`,
          position: 'top-right',
          stack: 4,
          hideAfter: 4000,
          showHideTransition: 'slide',
          loaderBg: '#fc4f4f;'
        });
      }

    }).fail((err) => {
      $.toast({
        heading: 'Warning',
        icon: 'error',
        text: `No Rooms At This Centre.`,
        position: 'top-right',
        stack: 4,
        hideAfter: 4000,
        showHideTransition: 'slide',
        loaderBg: '#fc4f4f;'
      });
      console.log(err)
    });
  }
});
