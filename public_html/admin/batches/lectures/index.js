$(document).ready(function () {
  let batchId = window.location.href.split('/batches/')[1].split('/lectures/')[0];

  $.get('http://localhost:4000/api/v1/batches/' + batchId, function (batch) {
    $('#title').text("Lectures for " + batch.data.name + " Batch");
    console.log(batch);
    let lectures = batch.data.lectures;

    let lecturesList = $('#minicourses-list');
    for (let i = 0; i < lectures.length; i++) {

      lecturesList.append(`<li class="list-group-item" style="height: auto">
                <div class="row">
                    <div class="col-2">`+lectures[i].name+`</div>
                    <div class="col-2">`+lectures[i].date+`</div>
                    <div class="col-2">`+lectures[i].startTime+`</div>
                    <div class="col-2">`+lectures[i].endTime+`</div>
                    <div class="col-2">`+lectures[i].teacher+`</div>
                    <div class="col-1">`+lectures[i].room+`</div>
                    <div class="col-1">
                        <i class="fa fa-pencil edit" style="color: blue; font-size: 24px"  lecture-id="` + lectures[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px"  lecture-id="` + lectures[i].id + `"></i>
                    </div>
                </div>
            </li>`)
    }

    $('.edit').click(function (e) {
      let roomId = e.target.getAttribute('room-id');
      $.get('http://localhost:4000/api/v1/rooms/' + roomId, function (room) {
        if (room.success === true) {
          $('#editRoomName').val(room.data.name);
          $('#editRoomCapacity').val(room.data.capacity);
          $('#editRoomConfig').val(room.data.config);

          $('#editRoomsModal').modal('show');

          $('#editRoomSave').click(function () {

            let name = $('#editRoomName').val();
            let capacity = $('#editRoomCapacity').val();
            let config = $('#editRoomConfig').val();
            let centreId = $('#editCentreList').val();
            $.ajax({

              url: 'http://localhost:4000/api/v1/rooms/' + roomId,
              data: {
                values: {
                  name: name,
                  capacity: capacity,
                  config: config,
                  centreId: centreId
                }
              },
              method: 'PUT'
            }).done(function (room) {

              if (room.success === true) {

                $('#editRoomsModal').modal('hide');
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
      let roomId = e.target.getAttribute('room-id');
      $.ajax({
        url: 'http://localhost:4000/api/v1/rooms/' + roomId,
        method: 'DELETE'
      }).done(function (res) {
        if(res.success === true){
          window.location.reload();
        }else{
          window.alert('Could Not Delete The Centre Right Now!')
        }
      })
    })
  })

  // $('#roomSubmit').click(function () {
  //   let name = $('#roomName').val();
  //   let capacity = $('#roomCapacity').val();
  //   let config = $('#roomConfig').val();
  //   let centreId = $('#centreList').val();
  //
  //   $.post('http://localhost:4000/api/v1/rooms/new', {
  //     name: name,
  //     capacity: capacity,
  //     config: config,
  //     centreId: centreId
  //   }, function (room) {
  //     if (room.success === true) {
  //
  //       $('#addRoomsModal').modal('hide');
  //       window.location.reload();
  //     }
  //     else {
  //       console.log("could not add the room right now")
  //     }
  //   })
  // });


})