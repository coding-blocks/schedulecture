$(document).ready(function () {

  let name = localStorage.getItem('name').split('%20').join(' ');
  $('#name').text('Hey ' + name);

  $.get('/api/v1/teachers', function (teachers) {

    if (teachers.success === true) {
      let teacherList = $('#minicourses-list');
      for (let i = 0; i < teachers.data.length; i++) {
        teacherList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div style="height: 120px; background-color: #999">
                    </div>
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>` + teachers.data[i].name + `</h3>
                        <p>Email: ` + teachers.data[i].email + `<br> Contact: ` + teachers.data[i].contact + `</p>
                        <i class="fa fa-pencil edit" style="color: #1EB3E2; font-size: 24px"  teacher-id="` + teachers.data[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px" teacher-id="` + teachers.data[i].id + `"></i>

                    </div>
                </div>
            </li>`)
      }

      $('.edit').click(function (e) {
        let teacherId = e.target.getAttribute('teacher-id');
        $.get('/api/v1/teachers/' + teacherId, function (teacher) {
          if (teacher.success === true) {
            $('#editTeacherName').val(teacher.data.name);
            $('#EditTeacherEmail').val(teacher.data.email);
            $('#editTeacherContact').val(teacher.data.contact);

            $('#editTeachersModal').modal('show');

            $('#editTeacherSave').click(function () {
              let name = $('#editTeacherName').val();
              let email = $('#EditTeacherEmail').val();
              let contact = $('#editTeacherContact').val();

              if (!name || !email || !contact ) {

                $('#editTeacherError').text('Please Enter All The Details');

              } else {
              $.ajax({

                url: '/api/v1/teachers/' + teacherId,
                data: {
                  values: {
                    name: name,
                    email: email,
                    contact: contact
                  }
                },
                method: 'PUT'
              }).done(function (teacher) {
                if (teacher.success === true) {

                  $('#editTeachersModal').modal('hide');
                  window.location.reload();
                }
                else {
                  console.log("could not edit the teacher right now")
                }
              });
            }
            })
          }
        })
      })
      $('.delete').click(function (e) {
        let teacherId = e.target.getAttribute('teacher-id');
        $.ajax({
          url: '/api/v1/teachers/' + teacherId,
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("clienttoken")
          }
        }).done(function (res) {
          if (res.success === true) {
            window.location.reload();
          } else {
            window.alert('Could Not Delete The Teacher Right Now!')
          }
        })
      })
    }
  })

  $('#teacherSubmit').click(function () {
    let name = $('#teacherName').val();
    let email = $('#teacherEmail').val();
    let contact = $('#teacherContact').val();

    if (!name || !email || !contact) {

      $('#addTeacherError').text('Please Enter All The Details');

    } else {

    $.ajax({
      url: '/api/v1/teachers/new',
      data: {
        name: name,
        email: email,
        contact: contact
      },
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("clienttoken")
      },
      method: "POST"
    }).done(function (teacher) {
      if (teacher.success === true) {
        $('#addTeachersModal').modal('hide');

        window.location.reload();

      }
      else {
        console.log("could not add the teacher right now")
      }
    }).fail(function (err) {
      alert('Could not add teacher right now');
    })
  }
  })

    $('#logout').click(function () {
        localStorage.clear();
        window.location.replace('/users/logout');
    })

});