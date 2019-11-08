

$(document).ready(function(){
    document.querySelectorAll('.datetimeinput').flatpickr({
        enableTime: true,
        dateFormat: "Y-m-d H:i",
    })
    document.querySelectorAll('.dateinput').flatpickr({
        enableTime: false,
        dateFormat: "Y-m-d",
    })
    $('.add-operatingdiary').on('click',function(){
        console.log('add operatingdiary');
        let LicensePlates = $('#LicensePlates').val();
        let Lane = $('#Lane').val();
        let OperatingDiaryTime = $('#OperatingDiaryTime').val();
        let Descriptor = $('#Descriptor').val();
        let HandeError = $('#HandeError').val();
        let Notes = $('#Notes').val();
        let File = $('#Image')[0].files[0];
        console.log(LicensePlates,OperatingDiaryTime);
        if(LicensePlates=='' || OperatingDiaryTime==''){
            return alertify.error('Vui Lòng Nhập Đủ Thông Tin');
        }
        let formData = new FormData();
        formData.append('LicensePlates',LicensePlates);
        formData.append('Lane',Lane);
        formData.append('Descriptor',Descriptor);
        formData.append('Handle',HandeError);
        formData.append('Notes',Notes);
        formData.append('OperatingDiaryTime',OperatingDiaryTime);
        formData.append('FileImages',File);
        $.ajax({
            url:'/operatingdiary/create',
            method:'post',
            data:formData,
            cache : false,
            contentType: false,
            processData: false,
            success:function(data){
                console.log(data);
                if(!data.error){
                    loadOperatingdiary();
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
    // On change Image
    $('#Image').change(function(){
        console.log('change file');
        console.log(this.files[0]);
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
    // Clear Input 
    function ClearInput(){
        $('#LicensePlates').val('');
        $('#OperatingDiaryTime').val('');
        $('#Notes').val(' ');
        $('#Image').val(null);
        $('#image-priview-add').empty();
    }
    // Load Table 
    function loadOperatingdiary(){

    }
})