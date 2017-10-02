$(document).ready(function () {

  let centreId, statusId;
  let url = 'http://localhost:4000/api/v1/batches'
  let conditions = window.location.href.split('?')[1];
  if (conditions){
    conditions = conditions.split('&');
    if(conditions.length === 1){
      if(conditions[0].split('=')[0] === 'status'){
        statusId = conditions[0].split('=')[1];
      }else{
        centreId = conditions[0].split('=')[1];
      }
    }else{
      if(conditions[0].split('=')[0] === 'status'){
        statusId = conditions[0].split('=')[1];
        centreId = conditions[1].split('=')[1];
      }else{
        centreId = conditions[0].split('=')[1];
        statusId = conditions[1].split('=')[1];
      }
    }
  }

    url += "?" + window.location.href.split('?')[1];

    $(`option[value=${statusId}]`).attr('selected', true);

  $.get('http://localhost:4000/api/v1/centres', function (centres) {


    let centreList = $('#centreList');
    let batchcentrelist = $('#batchcentreList');

    // let editCentreList = $('#editCentreList');
    batchcentrelist.append('<option value="0">All</option>');

    for (let i = 0; i < centres.data.length; i++) {

      if(centres.data[i].id==centreId){
      //   $('#title').text("Rooms for " + centres.data[i].name + " Centre");
        batchcentrelist.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      //   editCentreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      } else {
        batchcentrelist.append('<option value="' + centres.data[i].id + '">' + centres.data[i].name + '</option>');
      }
      centreList.append('<option value="' + centres.data[i].id + '">' + centres.data[i].name + '</option>');
      // editCentreList.append('<option value="'+centres.data[i].id+'">'+centres.data[i].name+'</option>');
      // }
    }
  })

  $.get('http://localhost:4000/api/v1/courses', function (courses) {

    let courseList = $('#courseList');
    // let editCentreList = $('#editCentreList');
    $('#batchNoOfLectures').val(courses.data[0].lect);
    for (let i = 0; i < courses.data.length; i++) {

      // if(centres.data[i].id==centreId){
      //   $('#title').text("Rooms for " + centres.data[i].name + " Centre");
      //   centreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      //   editCentreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      // } else {
      courseList.append('<option value="' + courses.data[i].id + '" nol = "'+courses.data[i].lect+'" name="course">' + courses.data[i].name + '</option>');
      // editCentreList.append('<option value="'+centres.data[i].id+'">'+centres.data[i].name+'</option>');
      // }
    }
  })

  $.get('http://localhost:4000/api/v1/teachers', function (teachers) {

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

  $.get(url, function (batches) {
    if (batches.success === true) {
      let batchList = $('#minicourses-list');
      console.log(batches.data);
      for (let i = 0; i < batches.data.length; i++) {

        let status = batches.data[i].status === 'active' ? 'Archive':'Active';
        let statusClass = batches.data[i].status === 'active' ? 'archive':'active';

        batchList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>` + batches.data[i].name + `</h3>
                        <p>Centre: ` + batches.data[i].centre.name + `
                        <br>Course: ` + batches.data[i].course.name + `<br>
                        Teacher: ` + batches.data[i].teacher.name + `
                        <br>Size: ` + batches.data[i].size + `<br>
                        Number Of Lectures: `+batches.data[i].noOfLectures+`<br>
                        Start: ` + batches.data[i].startDate.split('T')[0] + `<br>End:` + batches.data[i].endDate.split('T')[0] + `</p>
                        <a class=" btn btn-success `+statusClass+`" style=" font-size: 16px; color: white; padding: 5px 12px" batch-id="` + batches.data[i].id + `">`+status+`</a>
                        <i class="fa fa-pencil edit" style="color: blue; font-size: 24px" batch-id="` + batches.data[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px" batch-id="` + batches.data[i].id + `"></i>

                    </div>
                </div>
            </li>`)
      }

      $('.active').click(function (e) {
        let batchId = e.target.getAttribute('batch-id');
        $.ajax({
          url: 'http://localhost:4000/api/v1/batches/' + batchId,
          method: 'PUT',
          data: {values: {
            status: 'active'
          }}
        }).done(function (res) {
          if (res.success === true) {
            window.location.reload();
          } else {
            window.alert('Could Not Delete The Centre Right Now!')
          }
        })
      })

      $('.archive').click(function (e) {
        let batchId = e.target.getAttribute('batch-id');
        $.ajax({
          url: 'http://localhost:4000/api/v1/batches/archive/' + batchId,
          method: 'PUT'
        }).done(function (res) {
          if (res.success === true) {
            window.location.reload();
          } else {
            window.alert('Could Not Delete The Centre Right Now!')
          }
        })
      })
      $('.edit').click(function (e) {
        let centreId = e.target.getAttribute('centre-id');
        $.get('http://localhost:4000/api/v1/centres/' + centreId, function (centre) {
          if (centre.success === true) {
            $('#editCentreName').val(centre.data.name);
            $('#editCentreHead').val(centre.data.head);
            $('#editCentreContact').val(centre.data.phone);

            $('#editCentresModal').modal('show');

            $('#editCentreSave').click(function () {
              let name = $('#editCentreName').val();
              let head = $('#editCentreHead').val();
              let contact = $('#editCentreContact').val();
              $.ajax({

                url: 'http://localhost:4000/api/v1/centres/' + centreId,
                data: {
                  values: {
                    name: name,
                    head: head,
                    phone: contact
                  }
                },
                method: 'PUT'
              }).done(function (centre) {
                if (centre.success === true) {

                  $('#editCentresModal').modal('hide');
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
        let batchId = e.target.getAttribute('batch-id');
        $.ajax({
          url: 'http://localhost:4000/api/v1/batches/' + batchId,
          method: 'DELETE'
        }).done(function (res) {
          if (res.success === true) {
            window.location.reload();
          } else {
            window.alert('Could Not Delete The Centre Right Now!')
          }
        })
      })
    }
  })

  $('#courseList').change(function () {
    $('#batchNoOfLectures').val(($('option[value='+$('#courseList').val()+'][name="course"]').attr('nol')))

    console.log()
  })

  $('#batchSubmit').click(function () {
    let name = $('#batchName').val();
    let size = $('#batchSize').val();
    let nol = $('#batchNoOfLectures');
    let shortcode = $('#lectureShortCode');
    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();
    let centreId = $('#centreList').val();
    let courseId = $('#courseList').val();
    let teacherId = $('#teacherList').val();

    $.post('http://localhost:4000/api/v1/batches/new', {
      name: name,
      startDate: startDate,
      endDate: endDate,
      size: size,
      noOfLectures: nol,
      lectureShortCode: shortcode,
      courseId: courseId,
      centreId: centreId,
      teacherId: teacherId
    }, function (batch) {
      if (batch.success === true) {

        $('#addBatchesModal').modal('hide');
        window.location.reload();
      }
      else {
        console.log("could not add the batch right now")
      }
    })
  });

  $('#batchcentreList').change(function () {
    let changedCI = $('#batchcentreList').val();
    let changedSI = $('#batchstatuslist').val();

    let newurl = 'http://localhost:4000/admin/batches';
    if(+changedCI === 0){
      newurl+="?status="+changedSI;
    }else{
      newurl+="?centreId="+changedCI+"&status="+changedSI;
    }
    console.log(newurl)
    window.location.href = (newurl);
  })

  $('#batchstatuslist').change(function () {
    let changedCI = $('#batchcentreList').val();
    let changedSI = $('#batchstatuslist').val();

    let newurl = 'http://localhost:4000/admin/batches';
    if(+changedCI === 0){
      newurl+="?status="+changedSI;
    }else{
      newurl+="?centreId="+changedCI+"&status="+changedSI;
    }
console.log(newurl)
     window.location.href = (newurl);
  })

});