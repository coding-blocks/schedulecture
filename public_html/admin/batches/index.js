$(document).ready(function () {

  $.get('http://localhost:4000/api/v1/batches', function (batches) {
    if (batches.success === true) {
      let batchList = $('#minicourses-list');
      for (let i = 0; i < batches.data.length; i++) {


        batchList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>`+batches.data[i].name +`</h3>
                        <p>Centre: `+batches.data[i].centre.name +`<br>
                        Teacher: `+batches.data[i].teacher.name +`
                        <br>Size: `+batches.data[i].size +`<br>
                        Start: `+batches.data[i].startDate+`<br>End:`+batches.data[i].endDate+`</p>
                        <a class=" btn btn-success" style=" font-size: 16px; color: white; padding: 5px 12px" href="#">Archive</a>
                        <i class="fa fa-pencil fa-pencil-right" style="color: blue; font-size: 24px"></i>&nbsp;
                        <i class="fa fa-trash-o" style="color: red; font-size: 24px"></i>

                    </div>
                </div>
            </li>`)
      }
    }
  })

});