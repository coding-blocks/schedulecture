$(document).ready(function () {
  let batchId = window.location.href.split('/batches/')[1].split('/lectures/')[0];

    $.get('/api/v1/teachers', function (teachers) {

        let teacherList = $('#teachersList');
        let editTeacherList = $('#editTeachersList');

        for (let i = 0; i < teachers.data.length; i++) {

            teacherList.append('<option value="' + teachers.data[i].id + '" name="teacher">' + teachers.data[i].name + '</option>');
            editTeacherList.append('<option value="'+teachers.data[i].id+'" name="teacher">'+teachers.data[i].name+'</option>');
        }
    })

    $.get('/api/v1/rooms', function (rooms) {

        let roomsList = $('#roomsList');
        let editRoomsList = $('#editRoomsList');

        for (let i = 0; i < rooms.data.length; i++) {

            roomsList.append('<option value="' + rooms.data[i].id + '" name="room">' + rooms.data[i].name + '</option>');
            editRoomsList.append('<option value="'+rooms.data[i].id+'" name="room">'+rooms.data[i].name+'</option>');
        }
    })


  $.get('/api/v1/batches/' + batchId, function (batch) {
    $('#title').text("Lectures for " + batch.data.name + " Batch");
    console.log(batch);
    let lectures = batch.data.lectures;
    console.log(lectures)
    lectures.sort(function (a, b) {
      return (+a.id) - (+b.id);
    });
    console.log(lectures)
    let lecturesList = $('#minicourses-list');
    for (let i = 0; i < lectures.length; i++) {

      lecturesList.append(`<li class="list-group-item" style="height: auto">
                <div class="row">
                    <div class="col-2">` + lectures[i].name + `</div>
                    <div class="col-2">` + (lectures[i].date ? lectures[i].date.split('T')[0] : '-') + `</div>
                    <div class="col-2">` + (lectures[i].startTime ? lectures[i].startTime.split('T')[1].split(':00.000')[0] : '-') + `</div>
                    <div class="col-2">` + (lectures[i].endTime ? lectures[i].endTime.split('T')[1].split(':00.000')[0] : '-') + `</div>
                    <div class="col-2">` + (lectures[i].teacher ? lectures[i].teacher.name : '-') + `</div>
                    <div class="col-1">` + (lectures[i].room ? lectures[i].room.name : '-') + `</div>
                    <div class="col-1">
                        <i class="fa fa-pencil edit" style="color: #1EB3E2; font-size: 24px"  lecture-id="` + lectures[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px"  lecture-id="` + lectures[i].id + `"></i>
                    </div>
                </div>
            </li>`)
    }

    $('.edit').click(function (e) {
      let lectureId = e.target.getAttribute('lecture-id');
      $.get('/api/v1/lectures/' + lectureId, function (lecture) {
        if (lecture.success === true) {
          $('#editLectureName').val(lecture.data.name);
          $('option[value="'+lecture.data.teacherId+'"][name="teacher"]').attr('selected', true);
          $('option[value="'+lecture.data.roomId+'"][name="room"]').attr('selected', true);

            $('#editLecturesModal').modal('show');

          $('#editLectureSave').click(function () {

            let name = $('#editLectureName').val();
            let teacherId = $('#editTeachersList').val();
            console.log(teacherId)
            let roomId = $('#editRoomsList').val();
            $.ajax({

              url: '/api/v1/lectures/' + lectureId,
              data: {
                values: {
                  name: name,
                  teacherId: teacherId,
                  roomId: roomId
                }
              },
              method: 'PUT'
            }).done(function (lecture) {

              if (lecture.success === true) {

                $('#editLecturesModal').modal('hide');
                window.location.reload();
              }
              else {
                console.log("could not edit the room right now")
              }
            });
          })
        }
      })
    })

    $('.delete').click(function (e) {
      let lectureId = e.target.getAttribute('lecture-id');
      $.ajax({
        url: '/api/v1/lectures/' + lectureId,
        method: 'DELETE'
      }).done(function (res) {
        if (res.success === true) {
          window.location.reload();
        } else {
          window.alert('Could Not Delete The Lecture Right Now!')
        }
      })
    })

  })

  $('#lectureSubmit').click(function () {
    let name = $('#lectureName').val();
    let teacherId = $('#teachersList').val();
    let roomId = $('#roomsList').val();

    $.post('/api/v1/lectures/new', {
      name: name,
      teacherId: teacherId,
      roomId: roomId,
      batchId: batchId

    }, function (lecture) {
      if (lecture.success === true) {

        $('#addLecturesModal').modal('hide');
        window.location.reload();
      }
      else {
        console.log("could not add the room right now")
      }
    })
  });


})