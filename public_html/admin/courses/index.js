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
                        <i class="fa fa-pencil fa-pencil-right" style="color: blue; font-size: 24px"></i>&nbsp;
                        <i class="fa fa-trash-o" style="color: red; font-size: 24px"></i>

                    </div>
                </div>
            </li>`)
      }
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
        let courseList = $('#minicourses-list');
        courseList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div style="height: 120px; background-color: #999">
                    </div>
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>`+course.data.name +`</h3>
                        <p>Description: `+course.data.desc +`<br> Lectures: `+course.data.lect +`<br> Hours: `+course.data.hours+`</p>
                        <a class=" btn btn-success" style=" font-size: 16px; color: white; padding: 5px 12px" href="/#">Add Batch</a>
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