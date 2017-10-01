$(document).ready(function () {

  $.get('http://localhost:4000/api/v1/courses', function (courses) {
    if (courses.success === true) {
      let courseList = $('#minicourses-list');
      for (let i = 0; i < courses.data.length; i++) {


        courseList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div style="height: 120px; background-color: #999">
                    </div>
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>`+courses.data[i].name +`</h3>
                        <p>Description: `+courses.data[i].desc +`<br> Lectures: `+courses.data[i].lect +`<br> Hours: `+courses.data[i].hours+`</p>
                        <a class=" btn btn-success" style=" font-size: 16px; color: white; padding: 5px 12px" href="/#">Add Batch</a>
                        <i class="fa fa-pencil edit" style="color: blue; font-size: 24px" course-id="`+courses.data[i].id+`"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px" course-id="`+courses.data[i].id+`"></i>

                    </div>
                </div>
            </li>`)
      }

      $('.edit').click(function (e) {
        let courseId = e.target.getAttribute('course-id');
        $.get('http://localhost:4000/api/v1/courses/' + courseId, function (course) {
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
              $.ajax({

                url: 'http://localhost:4000/api/v1/courses/' + courseId,
                data: {
                  values: {
                    name: name,
                    desc: desc,
                    lect: lect,
                    hours: hours
                  }
                },
                method: 'PUT'
              }).done(function (course) {
                if (course.success === true) {

                  $('#editCoursesModal').modal('hide');
                  window.location.reload();
                }
                else {
                  console.log("could not add the centre right now")
                }
              });
            })
          }
        })
      })
      $('.delete').click(function (e) {
        let courseId = e.target.getAttribute('course-id');
        $.ajax({
          url: 'http://localhost:4000/api/v1/courses/' + courseId,
          method: 'DELETE'
        }).done(function (res) {
          if(res.success === true){
            window.location.reload();
          }else{
            window.alert('Could Not Delete The Course Right Now!')
          }
        })
      })
    }
  })

  $('#courseSubmit').click(function () {
    let name = $('#courseName').val();
    let desc = $('#courseDesc').val();
    let lect = $('#lectures').val();
    let hours = $('#hours').val();
    $.post('http://localhost:4000/api/v1/courses/new',{
      name: name,
      desc: desc,
      lect: lect,
      hours: hours
    }, function (course) {
      if(course.success === true){

        $('#addCoursesModal').modal('hide');
        window.location.reload();

      }
      else{
        console.log("could not add the centre right now")
      }
    })
  })


});