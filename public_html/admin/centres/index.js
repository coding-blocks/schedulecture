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
                        <h3>` + centres.data[i].name + `</h3>
                        <p>Centre Head: ` + centres.data[i].head + `<br> Mob: ` + centres.data[i].phone + `</p>
                        <a class=" btn btn-success" style=" font-size: 16px; color: white; padding: 5px 12px" href="/admin/centres/` + centres.data[i].id + `/rooms">Rooms</a>&nbsp;<a class=" btn btn-success" style="font-size: 16px; color: white; padding: 5px 12px"  href="/admin/batches?centreId=` + centres.data[i].id + `/">Batches</a>&nbsp;
                        <i class="fa fa-pencil edit" style="color: blue; font-size: 24px" centre-id="` + centres.data[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px" centre-id="` + centres.data[i].id + `"></i>

                    </div>
                </div>
            </li>`)
      }

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

                  $('#addCentresModal').modal('hide');
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
        let centreId = e.target.getAttribute('centre-id');
        $.ajax({
          url: 'http://localhost:4000/api/v1/centres/' + centreId,
          method: 'DELETE'
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

  $('#centreSubmit').click(function () {
    let name = $('#centreName').val();
    let head = $('#centreHead').val();
    let contact = $('#centreContact').val();
    $.post('http://localhost:4000/api/v1/centres/new', {
      name: name,
      head: head,
      phone: contact
    }, function (centre) {
      if (centre.success === true) {

        $('#addCentresModal').modal('hide');
        let centreList = $('#minicourses-list');
        centreList.append(`<li class="minicourses-list-li col-3" style="height: auto">
                <div class="minicourses-list-li-div">
                    <div style="height: 120px; background-color: #999">
                    </div>
                    <div class="text-center"  style="padding: 15px 0">
                        <h3>` + centre.data.name + `</h3>
                        <p>Centre Head: ` + centre.data.head + `<br> Mob: ` + centre.data.phone + `</p>
                        <a class=" btn btn-success" style=" font-size: 16px; color: white; padding: 5px 12px" href="/admin/centres/` + centre.data.id + `/rooms">Rooms</a>&nbsp;<a class=" btn btn-success" style="font-size: 16px; color: white; padding: 5px 12px"  href="/` + centre.data.id + `/batches">Batches</a>&nbsp;
                        <i class="fa fa-pencil fa-pencil-right" style="color: blue; font-size: 24px"  centre-id="` + centre.data.id + `"></i>&nbsp;
                        <i class="fa fa-trash-o" style="color: red; font-size: 24px" centre-id="` + centre.data.id + `"></i>

                    </div>
                </div>
            </li>`)
      }
      else {
        console.log("could not add the centre right now")
      }
    })
  });

});
