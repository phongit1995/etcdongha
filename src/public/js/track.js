$(document).ready(function(){
        //Buttons examples
    let table = $('#datatable').DataTable();

    console.log('phong');
    // DateTime Picker
    document.querySelectorAll('.datetimeinput').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    })
    document.querySelectorAll('.dateinput').flatpickr({
        dateFormat: "Y-m-d",
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
                        <td>${ moment(item.TrackTime).tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm")}</td>
                        <td>${item.FeeNumbers}</td>
                        <td>${item.Notes}</td>
                        <td>
                            <div class="btn btn-group-xs">`;
                        if(item.canEdit){ text += `<button type="button" class="edit btn btn-success" data-id=${item.TrackId}><i class="fa fa-pencil"></i> Sửa</button>`}
                        if(item.canDelete){ text+= `<button type="button" class="del btn btn-danger deleteTrack" data-id=${item.TrackId}><i class="fa fa-trash"></i> Xóa</button>`}
                         text+= `
                            </div>
                        </td></tr> `
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
                $.ajax({
                    url:'/track/delete',
                    method:'post',
                    data:{'TrackId':TrackId},
                    success:function(data){
                        console.log(data);
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
    // Open Edit Form
    $(document).on('click','.edit',function(){
        
        var id = $(this).data('id');
        $.ajax({
            url : "/track/getInfo",
            method:'post',
            data:{Id:id},
            success:function(data){
                console.log(data);
                $("#LicensePlatesEdit").val(data.data.LicensePlates);
                $("#NameCustomerEdit").val(data.data.NameCustomer);
                $("#LaneEdit").val(data.data.Lane).change();
                $("#TrackTimeEdit").val(moment(data.data.TrackTime).tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm"));
                $("#NotesEdit").val(data.data.Notes);
                $("#FeeEdit").val(data.data.TrackFee).change();
                $("#idTrackEdit").val(data.data.TrackId);
                $('#editForm').modal('toggle');
            }
        })
    })
    // Click UpdateTrack
    $(document).on('click','#UpdateTrack',function(){
        let TrackId= $("#idTrackEdit").val();
        let  LicensePlates =  $("#LicensePlatesEdit").val();
        let NameCustomer = $("#NameCustomerEdit").val();
        let Lane = $("#LaneEdit").val();
        let TrackTime = $("#TrackTimeEdit").val();
        let Notes= $("#NotesEdit").val();
        let TrackFee = $("#FeeEdit").val();
        $.ajax({
            url:'/track/update',
            method:'post',
            data:{TrackId,LicensePlates,NameCustomer,Lane,TrackTime,Notes,TrackFee},
            success:function(data){
                if(!data.error){
                    LoadTrack();
                    $('#editForm').modal('hide');
                    Swal.fire(
                        'Thành Công!',
                        'Cập Nhật Thông Tin Thành Công!',
                        'success'
                      )
                }
                else{
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Đã Có Lỗi Xảy Ra!',
                        
                      })
                }
            }
        })

    })
    // Click To Edit
    // Search
    $('.btn-search-form').on('click',function(){
        console.log('click');
        let LicensePlates = $('#LicensePlatesSearch').val();
        let DateStart = $('#DateStartSearch').val();
        let DateEnd = $('#DateEndSearch').val();
        console.log(LicensePlates,DateStart,DateEnd);
        if(LicensePlates==''&& DateStart=='' && DateEnd==''){
            return alertify.error('Vui Lòng Nhập Đủ Thông Tin Khi Tìm Kiếm');
        }
       
        let data = {};
        if(LicensePlates!=''){
            data['LicensePlates']=LicensePlates;
        }
        if(DateStart!=''){
            data['DateStart']=DateStart;
        }
        if(DateEnd!=''){
            data['DateEnd']=DateEnd;
        }
        $.ajax({
            url:'/track/search',
            method:'post',
            data:data,
            success:function(data){
                console.log(data);
                if(!data.error){
                    if(data.data.length==0){
                        Swal.fire({
                            icon: 'warning',
                            title: 'Oops...',
                            text: 'Không Có Giá trị nào',
                           
                          })
                          return ;
                    }
                    let array = data.data.map((item,index)=>{
                        let text= `<tr>  <td>${index+1}</td> 
                        <td>${item.UserName}</td>
                        <td>${item.LicensePlates}</td>
                        <td>${item.NameCustomer}</td>
                        <td>${item.Lane}</td>
                        <td>${ moment(item.TrackTime).tz("Asia/Bangkok").format("DD-MM-YYYY HH:mm")}</td>
                        <td>${item.FeeNumbers}</td>
                        <td>${item.Notes}</td>
                        <td>
                            <div class="btn btn-group-xs">`;
                        if(item.canEdit){ text += `<button type="button" class="edit btn btn-success" data-id=${item.TrackId}><i class="fa fa-pencil"></i> Sửa</button>`}
                        if(item.canDelete){ text+= `<button type="button" class="del btn btn-danger deleteTrack" data-id=${item.TrackId}><i class="fa fa-trash"></i> Xóa</button>`}
                         text+= `
                            </div>
                        </td></tr> `
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
    })
    // Reset Info
    $('.btn-clear-search').on('click',function(){
        $('#LicensePlatesSearch').val('');
        $('#DateStartSearch').val('');
        $('#DateEndSearch').val('');
        LoadTrack();
    })
})
