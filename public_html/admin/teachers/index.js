$(document).ready(function () {

  $.get('http://localhost:4000/api/v1/teachers', function (teachers) {
    console.log(1);
    if (teachers.success === true) {
      let teacherList = $('#minicourses-list');
      for (let i = 0; i < teachers.data.length; i++) {


        teacherList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div style="height: 120px; background-color: #999">
                    </div>
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>`+teachers.data[i].name +`</h3>
                        <p>Email: `+teachers.data[i].email +`<br> Contact: `+teachers.data[i].contact +`</p>
                        <i class="fa fa-pencil edit" style="color: blue; font-size: 24px"  teacher-id="` + teachers.data[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px" teacher-id="` + teachers.data[i].id + `"></i>

                    </div>
                </div>
            </li>`)
      }

      $('.edit').click(function (e) {
        let teacherId = e.target.getAttribute('teacher-id');
        $.get('http://localhost:4000/api/v1/teachers/' + teacherId, function (teacher) {
          if (teacher.success === true) {
            $('#editTeacherName').val(teacher.data.name);
            $('#EditTeacherEmail').val(teacher.data.email);
            $('#editTeacherContact').val(teacher.data.contact);

            $('#editTeachersModal').modal('show');

            $('#editTeacherSave').click(function () {
              let name = $('#editTeacherName').val();
              let email = $('#EditTeacherEmail').val();
              let contact = $('#editTeacherContact').val();
              $.ajax({

                url: 'http://localhost:4000/api/v1/teachers/' + teacherId,
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
            })
          }
        })
      })
      $('.delete').click(function (e) {
        let teacherId = e.target.getAttribute('teacher-id');
        $.ajax({
          url: 'http://localhost:4000/api/v1/teachers/' + teacherId,
          method: 'DELETE'
        }).done(function (res) {
          if(res.success === true){
            window.location.reload();
          }else{
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
    $.post('http://localhost:4000/api/v1/teachers/new',{
      name: name,
      email: email,
      contact: contact
    }, function (teacher) {
      if(teacher.success === true){
        $('#addTeachersModal').modal('hide');

        let teacherList = $('#minicourses-list');
        teacherList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div style="height: 120px; background-color: #999">
                    </div>
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>`+teacher.data.name +`</h3>
                        <p>Email: `+teacher.data.email +`<br> Contact: `+teacher.data.contact +`</p>
                        <i class="fa fa-pencil fa-pencil-right" style="color: blue; font-size: 24px"></i>&nbsp;
                        <i class="fa fa-trash-o" style="color: red; font-size: 24px"></i>

                    </div>
                </div>
            </li>`)
      }
      else{
        console.log("could not add the centre right now")
      }
    })
  })

});