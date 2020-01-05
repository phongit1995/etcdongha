$(document).ready(function(){
    let table = $('#datatable').DataTable({
        "searching": false
    });
    document.querySelectorAll('.dateinput').flatpickr({
        dateFormat: "Y-m-d",
        defaultDate:new Date()
    })
    $('#AddTicket').click(function(){
        let LicensePlates = $('#LicensePlatesName').val();
        let MoneyAdd = $("#MoneyAdd").val();
        let TypeOfTicketAdd = $("#TypeOfTicketAdd").val();
        let StationsAdd = $("#StationsAdd").val();
        let dateStartAdd = $("#dateStartAdd").val();
        let dateEndAdd = $("#dateEndAdd").val();
        let NotesAdd = $("#NotesAdd").val();
        console.log(LicensePlates  ,MoneyAdd ,TypeOfTicketAdd ,StationsAdd,dateStartAdd ,dateEndAdd,NotesAdd );
        if(LicensePlates=='' && MoneyAdd==''){
            return alertify.error('Vui Lòng Nhập Đủ Thông Tin');
        }
        $.ajax({
            url:"/ticketmonth/create",
            method:"post",
            data:{
                LicensePlates:LicensePlates,
                NameStations:StationsAdd,
                TypeOfTicket:TypeOfTicketAdd,
                Money:MoneyAdd,
                DateStart:dateStartAdd,
                DateEnd:dateEndAdd,
                Notes:NotesAdd
            },
            success:function(data){
                if(!data.error){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Thêm Thành Công',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    $('#LicensePlatesName').val('');
                    $('#MoneyAdd').val('');
                    $('#NotesAdd').val('');
                    LoadListTicket();
                }
            }
        })
    })
    $(document).on('click','.deleteTicket',function(){
        let TicketId= $(this).attr("data-id");
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
                    url:'/ticketmonth/delete',
                    method:'post',
                    data:{'TicketId':TicketId},
                    success:function(data){
                        console.log(data);
                        if(!data.error){
                            Swal.fire(
                                'Thành Công!',
                                'Xóa Thành Công !',
                                'success'
                              )
                              LoadListTicket();
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
    // Reload List

    function LoadListTicket (){
        $.ajax({
            method:'get',
            url:'/ticketmonth/getlist',
            success:function(data){
                console.log(data);
                let array = data.data.map((item,index)=>{
                    let text = `
                    <tr role="row" class="odd"> <td class="sorting_1">${index+1}</td> 
                    <td>${item.LicensePlates}</td>
                    <td>${item.StationsName}</td> 
                    <td>${item.TypeOfTicketName}</td> 
                    <td>${item.Money}</td> 
                    <td>${moment(item.DateStart).tz("Asia/Bangkok").format("DD-MM-YYYY")}</td> 
                    <td>${moment(item.DateEnd).tz("Asia/Bangkok").format("DD-MM-YYYY")}</td> 
                    <td>${item.Notes}</td> 
                    <td width="5%"> 
                    <div class="btn btn-group-xs"> `;
                    if(item.canEdit){ text += `<button type="button" class="edit btn btn-success" data-id="${item.TicketId}"><i class="fa fa-pencil"></i> Sửa</button>`}
                    if(item.canDelete){text += ` <button type="button" class="del btn btn-danger deleteTicket" data-id="${item.TicketId}"><i class="fa fa-trash"></i> Xóa</button>`}      
                           
                    text += ` </div> 
                      </td> 
                      </tr>
                    `
                    return text ;
                })
                let result = array.join('');
                console.log(result);
                    $("#datatable > tbody").empty();
                    table.clear();
                    table.destroy();
                    $("#datatable> tbody").append(result);
                    table = $('#datatable').DataTable();
            }
        })
    }
})