$(document).ready(function () {

  let name = localStorage.getItem('name').split('%20').join(' ');
  $('#name').text('Hey ' + name);

  let centreId = window.location.href.split('/centres/')[1].split('/rooms/')[0];

  $.get('/api/v1/centres', function (centres) {

    let centreList = $('#centreList');
    let editCentreList = $('#editCentreList');

    for( let i=0; i<centres.data.length; i++){

      if(centres.data[i].id==centreId){
        $('#title').text("Rooms for " + centres.data[i].name + " Centre");
        centreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
        editCentreList.append('<option value="'+centres.data[i].id+'" selected>'+centres.data[i].name+'</option>');
      } else {
        centreList.append('<option value="'+centres.data[i].id+'">'+centres.data[i].name+'</option>');
        editCentreList.append('<option value="'+centres.data[i].id+'">'+centres.data[i].name+'</option>');
      }
    }

  })
  
  $.get('/api/v1/centres/'+centreId+'/rooms', function (rooms) {
    if (rooms.success === true) {
      let roomsList = $('#minicourses-list');
      for (let i = 0; i < rooms.data.length; i++) {

        roomsList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div style="height: 120px; background-color: #999">
                    </div>
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>`+rooms.data[i].name +`</h3>
                        <p>Capacity: `+rooms.data[i].capacity +`<br> Configuration: `+rooms.data[i].config +`</p>
                        <i class="fa fa-pencil edit" style="color: #1EB3E2; font-size: 24px"  room-id="` + rooms.data[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px"  room-id="` + rooms.data[i].id + `"></i>

                    </div>
                </div>
            </li>`)
      }

      $('.edit').click(function (e) {
        let roomId = e.target.getAttribute('room-id');
        $.get('/api/v1/rooms/' + roomId, function (room) {
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

                url: '/api/v1/rooms/' + roomId,
                data: {
                  values: {
                    name: name,
                    capacity: capacity,
                    config: config,
                    centreId: centreId
                  }
                },
                method: 'PUT',
                  headers: {
                      "Authorization": "Bearer " + localStorage.getItem("clienttoken")
                  }
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
          url: '/api/v1/rooms/' + roomId,
          method: 'DELETE',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("clienttoken")
            }
        }).done(function (res) {
          if(res.success === true){
            window.location.reload();
          }else{
            window.alert('Could Not Delete The Centre Right Now!')
          }
        })
      })
    }
  })

  $('#roomSubmit').click(function () {
    let name = $('#roomName').val();
    let capacity = $('#roomCapacity').val();
    let config = $('#roomConfig').val();
    let centreId = $('#centreList').val();

    $.ajax({url: '/api/v1/rooms/new',data: {
      name: name,
      capacity: capacity,
      config: config,
      centreId: centreId
    },method:'POST',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("clienttoken")
        }}).done( function (room) {
      if (room.success === true) {

        $('#addRoomsModal').modal('hide');
        window.location.reload();
      }
      else {
        console.log("could not add the room right now")
      }
    })
  });

    $('#logout').click(function () {
        localStorage.clear();
        window.location.replace('/users/logout');
    })


})