$(document).ready(function () {

  let name = localStorage.getItem('name').split('%20').join(' ');
  $('#name').text('Hey ' + name);

  $('#startDate').datepicker();
  $('#endDate').datepicker()

  $.get('/api/v1/courses', function (courses) {
    if (courses.success === true) {
      let courseList = $('#minicourses-list');
      for (let i = 0; i < courses.data.length; i++) {


        courseList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div style="height: 120px; background-color: #999">
                    </div>
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>` + courses.data[i].name + `</h3>
                        <p>Description: ` + courses.data[i].desc + `<br> Lectures: ` + courses.data[i].lect + `<br> Hours: ` + courses.data[i].hours + `</p>
                        <a class=" btn btn-success addBatch" style=" font-size: 16px; color: white; padding: 5px 12px"  course-id="` + courses.data[i].id + `" nol="` + courses.data[i].lect + ` " hours="` + courses.data[i].hours + `">Add Batch</a>
                        <i class="fa fa-pencil edit" style="color: #1EB3E2; font-size: 24px" course-id="` + courses.data[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px" course-id="` + courses.data[i].id + `"></i>

                    </div>
                </div>
            </li>`)
      }

      $('.addBatch').click(function (e) {

        $(`option[value=${e.target.getAttribute('course-id')}][name='course']`).attr('selected', true);
        $('#batchNoOfLectures').val(e.target.getAttribute('nol'))
        $('#hoursPerLectures').val(e.target.getAttribute('hours'))
        $('#addBatchesModal').modal('show');
        $('#courseList').change(function () {
          $('#batchNoOfLectures').val(($('option[value=' + $('#courseList').val() + '][name="course"]').attr('nol')))

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

            $('#addBatchesError').text('Please Enter All The Details');

          } else {
            $.ajax({
              url: '/api/v1/batches/new',
              data: {
                name: name,
                startDate: startDate,
                endDate: endDate,
                size: size,
                noOfLectures: nol,
                hoursPerLecture: hoursPerLecture,
                lectureShortCode: shortcode,
                courseId: courseId,
                centreId: centreId,
                teacherId: teacherId
              },
              method: 'POST',
              headers: {
                "Authorization": "Bearer " + localStorage.getItem("clienttoken")
              }
            }).done(function (batch) {
              if (batch.success) {
                $('#addBatchesModal').modal('hide');
                window.location.reload();
              }
              else {
                console.log("could not add the batch right now")
              }
            }).fail(function (err) {
              alert("could not add the batch right now")
            })

          }
        });
      })


      $('.edit').click(function (e) {
        let courseId = e.target.getAttribute('course-id');
        $.get('/api/v1/courses/' + courseId, function (course) {
          if (course.success === true) {
            $('#editCourseName').val(course.data.name);
            $('#editCourseDesc').val(course.data.desc);
            $('#editLectures').val(course.data.lect);
            $('#editHours').val(course.data.hours);

            $('#editCoursesModal').modal('show');

            $('#editCourseSave').click(function () {
              let name = $('#editCourseName').val();
              let desc = $('#editCourseDesc').val();
              let lect = $('#editLectures').val();
              let hours = $('#editHours').val();

              if (!name || !desc || !lect || !hours) {

                $('#editCourseError').text('Please Enter All The Details');

              } else {
                $.ajax({
                  url: '/api/v1/courses/' + courseId,
                  data: {
                    values: {
                      name: name,
                      desc: desc,
                      lect: lect,
                      hours: hours
                    }
                  },
                  method: 'PUT',
                  headers: {
                    "Authorization": "Bearer " + localStorage.getItem("clienttoken")
                  }
                }).done(function (course) {
                  if (course.success === true) {

                    $('#editCoursesModal').modal('hide');
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
        let courseId = e.target.getAttribute('course-id');
        $.ajax({
          url: '/api/v1/courses/' + courseId,
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("clienttoken")
          }
        }).done(function (res) {
          if (res.success === true) {
            window.location.reload();
          } else {
            window.alert('Could Not Delete The Course Right Now!')
          }
        })
      })
    }
  })


  $.get('/api/v1/centres', function (centres) {


    let centreList = $('#centreList');

    for (let i = 0; i < centres.data.length; i++) {

      centreList.append('<option value="' + centres.data[i].id + '">' + centres.data[i].name + '</option>');
      // editCentreList.append('<option value="'+centres.data[i].id+'">'+centres.data[i].name+'</option>');
      // }
    }

    centreId = $('#centreList').val();
    $.get(`/api/v1/centres/${centreId}/rooms`, function (rooms) {
      let roomList = $('#roomList');
      for (let i = 0; i < rooms.data.length; i++) {
        roomList.append(`<option value="${rooms.data[i].id}" name="room">${rooms.data[i].name}</option>`);
      }
    })
  })

  $.get('/api/v1/courses', function (courses) {

    let courseList = $('#courseList');
    // let editCentreList = $('#editCentreList');

    for (let i = 0; i < courses.data.length; i++) {

      // if(centres.data[i].id==centreId){
      //   $('#title').text("Rooms for " + centres.data[i].name + " Centre");
      //   centreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      //   editCentreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      // } else {
      courseList.append('<option value="' + courses.data[i].id + '" nol = "' + courses.data[i].lect + '" name="course">' + courses.data[i].name + '</option>');
      // editCentreList.append('<option value="'+centres.data[i].id+'">'+centres.data[i].name+'</option>');
      // }
    }
  })

  $.get('/api/v1/teachers', function (teachers) {

    let teacherList = $('#teacherList');
    // let editCentreList = $('#editCentreList');

    for (let i = 0; i < teachers.data.length; i++) {

      // if(centres.data[i].id==centreId){
      //   $('#title').text("Rooms for " + centres.data[i].name + " Centre");
      //   centreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      //   editCentreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      // } else {
      teacherList.append('<option value="' + teachers.data[i].id + '">' + teachers.data[i].name + '</option>');
      // editCentreList.append('<option value="'+centres.data[i].id+'">'+centres.data[i].name+'</option>');
      // }
    }
  })

  $('#courseSubmit').click(function () {
    let name = $('#courseName').val();
    let desc = $('#courseDesc').val();
    let lect = $('#lectures').val();
    let hours = $('#hours').val();
    if (!name || !desc || !lect || !hours) {

      $('#addCourseError').text('Please Enter All The Details');

    } else {
      $.ajax({
        url: '/api/v1/courses/new',
        data: {
          name: name,
          desc: desc,
          lect: lect,
          hours: hours
        },
        method: 'POST',
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("clienttoken")
        }
      }).done(function (course) {
        if (course.success === true) {

          $('#addCoursesModal').modal('hide');
          window.location.reload();

        }
        else {
          console.log("could not add the centre right now")
        }
      }).fail(function (err) {
        alert("could not add the centre right now");
      })

    }
  })

  $('#logout').click(function () {
    localStorage.clear();
    window.location.replace('/users/logout');
  })


});