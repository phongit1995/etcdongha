$(document).ready(function(){
    console.log('saleoff page');
    let table = $('#datatable').DataTable();
    document.querySelectorAll('.dateinput').flatpickr({
        enableTime: false,
        dateFormat: "Y-m-d",
    })
    // Add Sale Off
    $(".add-saleoff").on('click',function(){
        console.log('add saleoff');
        let LicensePlates = $('#LicensePlates').val();

        let TypeOfSaleOff = $('#TypeOffSaleOff').val();
        let Denominations = $('#Denominations').val();
        let DateStart = $('#DateStart').val();
        let DateEnd = $('#DateEnd').val();
        let Notes = $('#Notes').val();
        let File = $('#SaleoffImage')[0].files[0];
        // console.log(LicensePlates ,NameCustomers,DateStart,DateEnd);
        if(LicensePlates=='' || DateStart==''||DateEnd==''){
            return alertify.error('Vui Lòng Nhập Đủ Thông Tin');
        }
        let formData = new FormData();
        formData.append('LicensePlates',LicensePlates);

        formData.append('TypeOfSaleOff',TypeOfSaleOff);
        formData.append('Denominations',Denominations);
        formData.append('DateStart',DateStart);
        formData.append('DateEnd',DateEnd);
        formData.append('Notes',Notes);
        formData.append('FileImages',File);
        $.ajax({
            url:'/saleoff/create',
            method:'post',
            data:formData,
            cache : false,
            contentType: false,
            processData: false,
            success:function(data){
                if(!data.error){
                    LoadSaleOff();
                    
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Thêm Thành Công',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    ClearInput();
                   
                }
            }
        })

    })
    // Reload table
    function LoadSaleOff(){
        console.log('Load Sale Off');
        $.ajax({
            url:'/saleoff/getlist',
            method:'post',
            success:function(data){
                if(!data.error){
                    console.log(data);
                    let array = data.data.map((item,index)=>{
                        let text= `<tr>  <td>${index+1}</td> 
                        <td>${item.UserName}</td>
                        <td>${item.LicensePlates}</td>
                        <td>${item.TypeOfSaleOffName}</td>
                        <td>${item.DenominationsNumbers }</td>
                        <td>${ moment(item.DateStart).tz("Asia/Bangkok").format("DD-MM-YYYY ")}</td>
                        <td>${ moment(item.DateEnd).tz("Asia/Bangkok").format("DD-MM-YYYY")}</td>
                        <td>${item.Notes}</td>
                        <td><i class="glyphicon glyphicon-eye-open"  data-link="${item.Image}"></i></td>
                        <td>
                            <div class="btn btn-group-xs">`;
                        if(item.canEdit){ text += `<button type="button" class="edit btn btn-success" data-id=${item.SaleOffID}><i class="fa fa-pencil"></i> Sửa</button>`}
                        if(item.canDelete){ text+= `<button type="button" class="del btn btn-danger deleteSaleOff" data-id=${item.SaleOffID}><i class="fa fa-trash"></i> Xóa</button>`}
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
    // Clear Input
    function ClearInput(){
        $('#LicensePlates').val('');

        $('#DateStart').val('');
        $('#DateEnd').val('');
        $('#Notes').val(' ');
        $('#SaleoffImage').val(null);
        $('#image-priview-add').empty();
    }
    // Click OnChange File 
    $('#SaleoffImage').change(function(){
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
              
                let img =`<img src=${e.target.result} class='image-preview'/>`;
                $('#image-priview-add').empty();
                $('#image-priview-add').append(img);
            }
            reader.readAsDataURL(this.files[0]);
        }
    })
    // Delete Sale Off
    $(document).on('click','.deleteSaleOff',function(){
        let SaleOffId= $(this).attr("data-id");
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
                    url:'/saleoff/delete',
                    method:'post',
                    data:{'SaleOffId':SaleOffId},
                    success:function(data){
                        console.log(data);
                        if(!data.error){
                            Swal.fire(
                                'Thành Công!',
                                'Xóa Thành Công !',
                                'success'
                              )
                              LoadSaleOff();
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
            url : "/saleoff/getInfo",
            method:'post',
            data:{Id:id},
            success:function(data){
                console.log(data);
                if(!data.error){
                    $("#LicensePlatesEdit").val(data.data.LicensePlates);
                    $("#NameCustomerEdit").val(data.data.NameCustomer);
                    $("#TypeOffSaleOffEdit").val(data.data.TypeOfSaleOff).change();
                    $("#DenomintationsEdit").val(data.data.Denominations).change();
                    $("#DateStartEdit").val(moment(data.data.DateStart).tz("Asia/Bangkok").format("YYYY-MM-DD"));
                    $("#DateEndEdit").val(moment(data.data.DateEnd).tz("Asia/Bangkok").format("YYYY-MM-DD"));
                    $("#NotesEdit").val(data.data.Notes);
                    $("#idSaleOffEdit").val(data.data.SaleOffID);
                    $('#image-priview-edit').empty();
                    if(data.data.Image){
                        let img =`<img src="/images/saleoffimages/${data.data.Image}" class='image-preview'/>`;
                        $('#image-priview-edit').append(img);
                    }
                    $('#editForm').modal('toggle');
                }
               
            }
        })
    })
    // On Change Image Edit 
    $('#ImageEdit').change(function(){
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
            
                let img =`<img src=${e.target.result} class='image-preview'/>`;
                $('#image-priview-edit').empty();
                $('#image-priview-edit').append(img);
            }
            reader.readAsDataURL(this.files[0]);
        }
    })
    // Submit SaleOff Edit
    $(document).on('click','UpdateSaleOff',function(){
        console.log('update sale off');
    })
})