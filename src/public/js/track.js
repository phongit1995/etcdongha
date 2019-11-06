$(document).ready(function(){
        //Buttons examples
    let table = $('#datatable').DataTable();

    console.log('phong');
    document.querySelectorAll('.datetimeinput').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    })
    $('.add-track').on('click',function(){
        console.log('phong');
       let LicensePlates = $('#LicensePlates').val();
       let NameCustomers = $('#NameCustomers').val();
       let Lane = $('select[name=Lane]').val();
       let Notes = $('#Notes').val();
       let Fee = $('select[name=Fee]').val();
       let TrackTime = $('#TrackTime').val();
       console.log(LicensePlates , NameCustomers ,Lane,Notes,Fee,TrackTime);
       if(LicensePlates=='' || NameCustomers==''||TrackTime==''){
        return alertify.error('Vui Lòng Nhập Đủ Thông Tin');
       }
       let data = {};
       data['LicensePlates']=LicensePlates;
       data['NameCustomer']=NameCustomers;
       data['Lane']=Lane;
       data['Notes']=Notes;
       data['TrackFee']=Fee;
       data['TrackTime']=TrackTime;
       $.ajax({
        url : "/track/create",
        method:'post',
        data:data,
        success: function(data){
            if(!data.error){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Thêm Thành Công',
                    showConfirmButton: false,
                    timer: 1500
                })
                LoadTrack();
            }
        }
       })
      
    })
    function LoadTrack(){
        console.log('Load Track');
        $.ajax({
            url : "/track/getList",
            method:'get',
            success:function(data){
                if(!data.error){
                    console.log(data);
                    let array = data.data.map((item,index)=>{
                        let text= `<tr>  <td>${index+1}</td> 
                        <td>${item.UserName}</td>
                        <td>${item.LicensePlates}</td>
                        <td>${item.NameCustomer}</td>
                        <td>${item.Lane}</td>
                        <td>${item.TrackTime}</td>
                        <td>${item.FeeNumbers}</td>
                        <td>${item.Notes}</td>
                        <td>
                            <div class="btn btn-group-xs">`;
                        if(item.canEdit){ text += `<button type="button" class="edit btn btn-success" data-id=${item.TrackId}><i class="fa fa-pencil"></i> Sửa</button>`}
                        if(item.canDelete){ text+= `<button type="button" class="del btn btn-danger deleteTrack" data-id=${item.TrackId}><i class="fa fa-trash"></i> Xóa</button>`}
                         text+= `
                            </div>
                        </td>`
                        return text ;
                        
                    })
                    let result = array.join('');
                    $("#datatable > tbody").empty();
                    table.clear();
                    table.destroy();
                    $("#datatable> tbody").append(result);
                    table = $('#datatable').DataTable();
                }
            }
        })
    }
    // Delete Track
    $(document).on('click','.deleteTrack',function(){
        let TrackId= $(this).attr("data-id");
        Swal.fire({
            title: 'Xóa Thông Tin?',
            text: "Bạn Có Chắc Chắn Xóa Thông Tin này không!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đồng Ý ',
            cancelButtonText:'Không'
          }).then((result) => {
            if (result.value) {
                console.log(TrackId);
                $.ajax({
                    url:'/track/delete',
                    method:'post',
                    data:{'TrackId':TrackId},
                    success:function(data){
                        if(!data.error){
                            Swal.fire(
                                'Thành Công!',
                                'Xóa Thành Công !',
                                'success'
                              )
                              LoadTrack();
                        }
                        else{
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Đã Có Lỗi Xảy Ra!',
                                
                              })
                        }}
                })
                
            }
          })
    })
})
