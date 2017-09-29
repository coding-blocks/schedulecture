$(document).ready(function () {
  let centreId = window.location.href.split('/centres/')[1].split('/rooms/')[0];
  console.log(centreId);

  console.log('http://localhost:4000/api/v1/centres/'+centreId+'/rooms');

  $.get('http://localhost:4000/api/v1/centres/'+centreId+'/rooms', function (rooms) {
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
                        <i class="fa fa-pencil fa-pencil-right" style="color: blue; font-size: 24px"></i>&nbsp;
                        <i class="fa fa-trash-o" style="color: red; font-size: 24px"></i>

                    </div>
                </div>
            </li>`)
      }
    }
  })

})