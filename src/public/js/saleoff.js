$(document).ready(function(){
    console.log('saleoff page');
    document.querySelectorAll('.dateinput').flatpickr({
        enableTime: false,
        dateFormat: "Y-m-d",
    })
    $(".add-saleoff").on('click',function(){
        console.log('add saleoff');
        let LicensePlates = $('#LicensePlates').val();
        let NameCustomers = $('#NameCustomers').val();
        let TypeOfSaleOff = $('#TypeOffSaleOff').val();
        let Denominations = $('#Denominations').val();
        let DateStart = $('#DateStart').val();
        let DateEnd = $('#DateEnd').val();
        let Notes = $('#Notes').val();
        let File = $('#SaleoffImage')[0].files[0];
        // console.log(LicensePlates ,NameCustomers,DateStart,DateEnd);
        if(LicensePlates=='' || NameCustomers==''||DateStart==''||DateEnd==''){
            return alertify.error('Vui Lòng Nhập Đủ Thông Tin');
        }
        let formData = new FormData();
        formData.append('LicensePlates',LicensePlates);
        formData.append('NameCustomer',NameCustomers);
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
                    LoadTrack();
                    
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
    function LoadTrack(){

    }
    // Clear Input
    function ClearInput(){
        $('#LicensePlates').val('');
        $('#NameCustomers').val('');
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
                $('#imgshow').attr('src', e.target.result);
                let img =`<img src=${e.target.result} class='image-preview'/>`;
                $('#image-priview-add').empty();
                $('#image-priview-add').append(img);
            }
            reader.readAsDataURL(this.files[0]);
        }
    })
})