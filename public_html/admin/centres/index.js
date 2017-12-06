$(document).ready(function () {

  $.get('/api/v1/centres', function (centres) {
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
                        <a class=" btn btn-success" style=" font-size: 16px; color: white; padding: 5px 12px" href="/admin/centres/` + centres.data[i].id + `/rooms">Rooms</a>&nbsp;<a class=" btn btn-success" style="font-size: 16px; color: white; padding: 5px 12px"  href="/admin/batches?centreId=` + centres.data[i].id + `">Batches</a>&nbsp;
                        <i class="fa fa-pencil edit" style="color: #1EB3E2; font-size: 24px" centre-id="` + centres.data[i].id + `"></i>&nbsp;
                        <i class="fa fa-trash-o delete" style="color: red; font-size: 24px" centre-id="` + centres.data[i].id + `"></i>

                    </div>
                </div>
            </li>`)
      }

      $('.edit').click(function (e) {
        let centreId = e.target.getAttribute('centre-id');
        $.get('/api/v1/centres/' + centreId, function (centre) {
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

                url: '/api/v1/centres/' + centreId,
                data: {
                  values: {
                    name: name,
                    head: head,
                    phone: contact
                  }
                },
                method: 'PUT',
                headers: {
                  "Authorization": "Bearer " + localStorage.getItem("clienttoken")
                }
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
        let centreId = e.target.getAttribute('centre-id');
        $.ajax({
          url: '/api/v1/centres/' + centreId,
          method: 'DELETE',
          headers: {
            "Authorization": "Bearer " + localStorage.getItem("clienttoken")
          }
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

  $('#centreSubmit').click(function () {
    let name = $('#centreName').val();
    let head = $('#centreHead').val();
    let contact = $('#centreContact').val();
    $.ajax({
      url: '/api/v1/centres/new', data: {
        name: name,
        head: head,
        phone: contact
      }, method: 'POST',
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("clienttoken")
      }
    }).done(function (centre) {
      if (centre.success === true) {

        $('#addCentresModal').modal('hide');
        window.location.reload();
      }
      else {
        console.log("could not add the centre right now")
      }
    })
  });

});
