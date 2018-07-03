$(document).ready(function () {

  let name = localStorage.getItem('name');
  let endName = name.indexOf('%20');
  let Name = name.slice(0,endName);
  $('#name').text('Hey ' + Name);

  $('#startDate').datepicker();
  $('#endDate').datepicker();
  $('#editStartDate').datepicker();
  $('#editEndDate').datepicker();

  let centreId, statusId, courseId;
  let url = '/api/v1/batches'
  let conditions = window.location.href.split('?')[1];
  if (conditions) {
    conditions = conditions.split('&');
    centreId = conditions[0].split('centreId=')[1];
    courseId = conditions[1].split('courseId=')[1];
    statusId = conditions[2].split('status=')[1];
  }
  if (window.location.href.split('?')[1]) {
    url += "?" + window.location.href.split('?')[1];
  }
  $(`option[value=${statusId}]`).attr('selected', true);

  $.get('/api/v1/centres', function (centres) {


    let centreList = $('#centreList');
    let batchcentrelist = $('#batchcentreList');

    let editCentreList = $('#editCentreList');

    batchcentrelist.append('<option value="0">All</option>');


    for (let i = 0; i < centres.data.length; i++) {

      if (centres.data[i].id == centreId) {
        //   $('#title').text("Rooms for " + centres.data[i].name + " Centre");
        batchcentrelist.append('<option value="' + centres.data[i].id + '" selected>' + centres.data[i].name + '</option>');
        //   editCentreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      } else {
        batchcentrelist.append('<option value="' + centres.data[i].id + '">' + centres.data[i].name + '</option>');
      }
      centreList.append('<option value="' + centres.data[i].id + '" name="centre">' + centres.data[i].name + '</option>');
      editCentreList.append('<option value="' + centres.data[i].id + '" name="centre">' + centres.data[i].name + '</option>');
      // }
    }
    centreId = $('#centreList').val();
    $.get(`/api/v1/centres/${centreId}/rooms`, function (rooms) {
      let roomList = $('#roomList');
      let editRoomList = $('#editRoomList');
      for (let i = 0; i < rooms.data.length; i++) {
        roomList.append(`<option value="${rooms.data[i].id}" name="room">${rooms.data[i].name}</option>`);
        editRoomList.append(`<option value="${rooms.data[i].id}" name="room">${rooms.data[i].name}</option>`);
      }
    })

  });

  $.get('/api/v1/courses', function (courses) {

    const batchCourseList = $('#batchCourseList');
    batchCourseList.append(`<option value="0">All</option>`);

    let courseList = $('#courseList');
    let editCourseList = $('#editCourseList');
    $('#batchNoOfLectures').val(courses.data[0].lect);
    $('#hoursPerLecture').val(courses.data[0].hours);
    for (let i = 0; i < courses.data.length; i++) {

      if (courses.data[i].id == courseId) {
        batchCourseList.append('<option value="' + courses.data[i].id + '" selected>' + courses.data[i].name + '</option>');
      } else {
        batchCourseList.append('<option value="' + courses.data[i].id + '">' + courses.data[i].name + '</option>');
      }
      courseList.append('<option value="' + courses.data[i].id + '" nol = "' + courses.data[i].lect + '" hours ="' + courses.data[i].hours + '" name="course">' + courses.data[i].name + '</option>');
      editCourseList.append('<option value="' + courses.data[i].id + '" nol = "' + courses.data[i].lect + '" hours ="' + courses.data[i].hours + '" name="course">' + courses.data[i].name + '</option>');
      // }
    }
  })

  $.get('/api/v1/teachers', function (teachers) {

    let teacherList = $('#teacherList');
    let editTeacherList = $('#editTeacherList');

    for (let i = 0; i < teachers.data.length; i++) {

      // if(centres.data[i].id==centreId){
      //   $('#title').text("Rooms for " + centres.data[i].name + " Centre");
      //   centreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      //   editCentreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      // } else {
      teacherList.append('<option value="' + teachers.data[i].id + '" name="teacher">' + teachers.data[i].name + '</option>');
      editTeacherList.append('<option value="' + teachers.data[i].id + '" name="teacher">' + teachers.data[i].name + '</option>');
      // }
    }
  })

  $.get(url, function (batches) {
    if (batches.success === true) {
      let batchList = $('#minicourses-list');

      for (let i = 0; i < batches.data.length; i++) {

        let status = batches.data[i].status === 'active' ? 'Archive' : 'Active';
        let statusClass = batches.data[i].status === 'active' ? 'archive' : 'active';

        batchList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">

                    <div class="text-minicourse"  style="padding: 15px 0">
                        <h3>` + batches.data[i].name + `</h3>
                        <p>Centre: ` + batches.data[i].centre.name + `
                        <br>Course: ` + batches.data[i].course.name + `<br>
                        Teacher: ` + batches.data[i].teacher.name + `
                        <br>Size: ` + batches.data[i].size + `<br>
                        Number Of Lectures: ` + batches.data[i].noOfLectures + `<br>
                        Start: ` + batches.data[i].startDate.split('T')[0] + `<br>End: ` + batches.data[i].endDate.split('T')[0] + `
                        <br/>
                        Default Start Time: ${batches.data[i].defaultTime}<br/>
                        Default Room: ${batches.data[i].room ? batches.data[i].room.name : "Not Selected"}

                        </p>
                        <a class="btn btn-success view-lectures" style=" font-size: 16px; color: white; padding: 5px 8px"  href="/admin/batches/` + batches.data[i].id + `/lectures">Lectures</a>
                        <a class="btn btn-success ` + statusClass + `" style=" font-size: 16px; color: white; padding: 5px 8px" batch-id="` + batches.data[i].id + `">` + status + `</a>
                        <i class="fa fa-pencil edit" style="color: #1EB3E2; font-size: 24px" batch-id="` + batches.data[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px" batch-id="` + batches.data[i].id + `"></i>

                    </div>
                </div>
            </li>`)
      }

      $('.active').click(function (e) {
        let batchId = e.target.getAttribute('batch-id');
        $.ajax({
          url: '/api/v1/batches/' + batchId,
          method: 'PUT',
          data: {
            values: {
              status: 'active'
            }
          },
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("clienttoken")
          }
        }).done(function (res) {
          if (res.success) {
            window.location.reload();
          } else {
            window.alert('Could Not Delete The Centre Right Now!')
          }
        })
      })

      $('.archive').click(function (e) {
        let batchId = e.target.getAttribute('batch-id');

        $.ajax({
          url: '/api/v1/batches/archive/' + batchId,
          method: 'PUT',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("clienttoken")
          }
        }).done(function (res) {
          if (res.success) {
            window.location.reload();
          } else {
            window.alert('Could Not Archive The Batch Right Now!')
          }
        }).fail(function (err) {
          console.log(err)
          alert('Could Not Archive The Batch Right now!');
        })
      })

      // $('.view-lectures').click(function (e) {
      //   let batchId = e.target.getAttribute('batch-id');
      // });

      $('.edit').click(function (e) {
        let batchId = e.target.getAttribute('batch-id');
        $.get('/api/v1/batches/' + batchId, function (batch) {
          if (batch.success === true) {
            $('#editBatchName').val(batch.data.name);
            $('#editBatchSize').val(batch.data.size);
            $('#editBatchNoOfLectures').val(batch.data.noOfLectures);
            $('#editHoursPerLectures').val(batch.data.hoursPerLecture);
            $('#editLectureShortCode').val(batch.data.lectureShortCode);
            $('#editStartDate').val(batch.data.startDate.split('T')[0]);
            $('#editEndDate').val(batch.data.endDate.split('T')[0]);
            $('option[value="' + batch.data.centreId + '"][name="centre"]').attr('selected', true);
            $('option[value="' + batch.data.courseId + '"][name="course"]').attr('selected', true);
            $('option[value="' + batch.data.teacherId + '"][name="teacher"]').attr('selected', true);
            $('#editdefaultTime').val(batch.data.defaultTime);
            $('option[value="' + batch.data.roomId + '"][name="room"]').attr('selected', true);

            $('#editBatchesModal').modal('show');

            $('#editBatchSave').click(function () {
              let name = $('#editBatchName').val();
              let size = $('#editBatchSize').val();
              let nol = $('#editBatchNoOfLectures').val();
              let hoursPerLecture = $('#editHoursPerLectures').val();
              let shortcode = $('#editLectureShortCode').val();
              let startDate = $('#editStartDate').val();
              let endDate = $('#editEndDate').val();
              let centreId = $('#editCentreList').val();
              let courseId = $('#editCourseList').val();
              let teacherId = $('#editTeacherList').val();
              let defaultTime = $('#editdefaultTime').val();
              let roomId = $('#editRoomList').val();

              if (!name || !size || !nol || !hoursPerLecture || !shortcode || !startDate || !endDate || !defaultTime || !centreId || !roomId || !courseId || !teacherId) {

                $('#editBatchError').text('Please Enter All The Details');

              } else {

                $.ajax({

                  url: '/api/v1/batches/' + batchId,
                  data: {
                    values: {
                      name: name,
                      startDate: startDate,
                      endDate: endDate,
                      size: size,
                      noOfLectures: nol,
                      hoursPerLecture: hoursPerLecture,
                      lectureShortCode: shortcode,
                      courseId: courseId,
                      centreId: centreId,
                      teacherId: teacherId,
                      roomId: roomId,
                      defaultTime: defaultTime
                    }
                  },
                  method: 'PUT',
                  headers:
                    {
                      "Authorization":
                      "Bearer " + localStorage.getItem("clienttoken")
                    }
                }).done(function (centre) {
                  if (centre.success === true) {

                    $('#editCentresModal').modal('hide');
                    window.location.reload();
                  }
                  else {
                    console.log("could not add the centre right now")
                  }
                });

              }

            })
          }
        })
      })

      $('.delete').click(function (e) {
        let batchId = e.target.getAttribute('batch-id');
        $.ajax({
          url: '/api/v1/batches/' + batchId,
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("clienttoken")
          }
        }).done(function (res) {
          if (res.success === true) {
            window.location.reload();
          } else {
            window.alert('Could Not Delete The Batch Right Now!')
          }
        })
      })
    }
  })

  $('#centreList').change(function () {
    $.get(`/api/v1/centres/${$('#centreList').val()}/rooms`, function (rooms) {
      let roomList = $('#roomList');
      roomList.empty();
      for (let i = 0; i < rooms.data.length; i++) {
        roomList.append(`<option value="${rooms.data[i].id}" name="room">${rooms.data[i].name}</option>`);
      }
    })
  });

  $('#editCentreList').change(function () {
    $.get(`/api/v1/centres/${$('#editCentreList').val()}/rooms`, function (rooms) {
      let editRoomList = $('#editRoomList');
      editRoomList.empty();
      for (let i = 0; i < rooms.data.length; i++) {
        editRoomList.append(`<option value="${rooms.data[i].id}" name="room">${rooms.data[i].name}</option>`);
      }
    })
  });

  $('#courseList').change(function () {
    $('#batchNoOfLectures').val(($('option[value=' + $('#courseList').val() + '][name="course"]').attr('nol')))
    $('#hoursPerLecture').val(($('option[value=' + $('#courseList').val() + '][name="course"]').attr('hours')))
  })

  $('#editcourselist').change(function () {
    $('#editBatchNoOfLectures').val(($('option[value=' + $('#editCourseList').val() + '][name="course"]').attr('nol')))
    $('#editHoursPerLectures').val(($('option[value=' + $('#editCourseList').val() + '][name="course"]').attr('hours')))
  })

  $('#batchSubmit').click(function () {
    let name = $('#batchName').val();
    let size = $('#batchSize').val();
    let nol = $('#batchNoOfLectures').val();
    let hoursPerLecture = $('#hoursPerLecture').val();
    let shortcode = $('#lectureShortCode').val();
    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();
    let defaultTime = $('#defaultTime').val();
    let centreId = $('#centreList').val();
    let roomId = $('#roomList').val();
    let courseId = $('#courseList').val();
    let teacherId = $('#teacherList').val();

    if (!name || !size || !nol || !hoursPerLecture || !shortcode || !startDate || !endDate || !defaultTime || !centreId || !roomId || !courseId || !teacherId) {

      $('#addBatchError').text('Please Enter All The Details');

    } else {

      $.ajax({
        url: '/api/v1/batches/new',
        data: {
          name,
          startDate,
          endDate,
          size,
          noOfLectures: nol,
          hoursPerLecture,
          lectureShortCode: shortcode,
          defaultTime,
          courseId,
          centreId,
          teacherId,
          roomId
        },
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("clienttoken")
        }
      }).done(function (batch) {
        if (batch.success === true) {

          $('#addBatchesModal').modal('hide');
          window.location.reload();
        }
        else {
          console.log("could not add the batch right now")
        }
      }).fail(function (err) {
        console.log(err);
        alert('Could not add the batch');
      });
    }
  });

  $('#batchcentreList').change(function () {
    let changedCI = $('#batchcentreList').val();
    let changedCoI = $('#batchCourseList').val();
    let changedSI = $('#batchstatuslist').val();

    let newurl = '/admin/batches';
    newurl += `?centreId=${changedCI == '0' ? 'all' : changedCI}&courseId=${changedCoI == '0' ? 'all' : changedCoI}&status=${changedSI}`
    window.location.href = (newurl);
  })

  $('#batchstatuslist').change(function () {
    let changedCI = $('#batchcentreList').val();
    let changedCoI = $('#batchCourseList').val();
    let changedSI = $('#batchstatuslist').val();

    let newurl = '/admin/batches';
    newurl += `?centreId=${changedCI == '0' ? 'all' : changedCI}&courseId=${changedCoI == '0' ? 'all' : changedCoI}&status=${changedSI}`

    window.location.href = (newurl);
  })

  $('#batchCourseList').change(function () {
    let changedCI = $('#batchcentreList').val();
    let changedCoI = $('#batchCourseList').val();
    let changedSI = $('#batchstatuslist').val();

    let newurl = '/admin/batches';
    newurl += `?centreId=${changedCI == '0' ? 'all' : changedCI}&courseId=${changedCoI == '0' ? 'all' : changedCoI}&status=${changedSI}`

    window.location.href = (newurl);
  })


  $('#logout').click(function () {
    localStorage.clear();
    window.location.replace('/users/logout');
  })
});
