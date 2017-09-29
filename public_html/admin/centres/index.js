$(document).ready(function () {

  $.get('http://localhost:4000/api/v1/centres', function (centres) {
    if (centres.success === true) {
      let centreList = $('#minicourses-list');
      for (let i = 0; i < centres.data.length; i++) {


        centreList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div style="height: 120px; background-color: #999">
                    </div>
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>`+centres.data[i].name +`</h3>
                        <p>Centre Head: `+centres.data[i].centreHead +`<br> Mob: `+centres.data[i].centreHeadContact +`</p>
                        <a class=" btn btn-success" style=" font-size: 16px; color: white; padding: 5px 12px" href="/admin/centres/`+centres.data[i].id+`/rooms">Rooms</a>&nbsp;<a class=" btn btn-success" style="font-size: 16px; color: white; padding: 5px 12px"  href="/`+centres.data[i].id+`/batches">Batches</a>&nbsp;
                        <i class="fa fa-pencil fa-pencil-right" style="color: blue; font-size: 24px"></i>&nbsp;
                        <i class="fa fa-trash-o" style="color: red; font-size: 24px"></i>

                    </div>
                </div>
            </li>`)
      }
    }
  })

});