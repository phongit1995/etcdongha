$(document).ready(function(){
    document.querySelectorAll('.dateinput').flatpickr({
        dateFormat: "Y-m-d",
    })
    $('.saveusers').click(function(){
        let Name= $('#Name').val();
        let Dateofbirth = $('#Dateofbirth').val();
        let Phone = $('#Phone').val();
        let Email = $('#Email').val();
        let Introduce = $('#Introduce').val();
        console.log( Name,Dateofbirth,Phone,Email,Introduce);
        $.ajax({
            method:'post',
            url:'/me/update',
            data:{
                Name:Name,
                Phone:Phone,
                Email:Email,
                DateOfBirth:Dateofbirth,
                Introduce:Introduce
            },
            success:function(data){
                
            }
        })
    })
})