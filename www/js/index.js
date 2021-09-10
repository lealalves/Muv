function userInfo(){
    $.getJSON('http://127.0.0.1/Muv/www/php/sessao.php',function(result){
        let input = document.querySelector('#nomeusuario')
        input.innerHTML = result.email
    })  
}

function logout(){
    var url = 'http://127.0.0.1/Muv/www/php/logout.php'
    $.ajax({
        url: url,
        data: url,
        success: function(data){
            window.location.href = data;
        }
    })
}

function login() {
    var email = $('#email').val();
    var senha = $('#password').val()
    var url = `http://127.0.0.1/Muv/www/php/login.php?email=${email}&senha=${senha}`;
    if($.trim(email).length > 0 & $.trim(senha).length > 0){
        $.ajax({
            type: "POST",
            crossDomain: true, 
            cache: false,
            url: url,
            data: url,
            success: function(data){
                if($.trim(data) == "error"){
                    $(".inputlogin").toggleClass("error");                   
                }else{
                    userInfo();
                    window.location.href = 'menu.html';                    
                }                                        
            }                       
        });
    }else $(".inputlogin").toggleClass("error");
        
}

function cadastrar() {
    var email = $('#email').val();
    var senha = $('#password').val();
    var telefone = $('#phonenumber').val();
    var string = `email=${email}&senha=${senha}&telefone=${telefone}&insert=`;

    if($.trim(email).length > 0 & $.trim(senha).length > 0 & $.trim(telefone).length > 0) {
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/Muv/www/php/cadastrar.php",
            data: string,
            crossDomain: true,
            cache: false,
            success: function(data) {
                if($.trim(data) == "error") {                            
                    }else{
                        window.location.href = 'especificacao.html'
                    }
                }
            });                
        }else{
            $(".inputlogin").toggleClass("error");
        }        
    }






function validarEspec(){
    var opcoes = document.querySelectorAll("input[type='checkbox']")
    opcoes.forEach(function(ck){
        ck.addEventListener("click", function(){
            let checked = document.querySelectorAll("input[type = 'checkbox']:checked").length
            var btn = document.querySelector(".btnespec")
            if(checked != 0){
                btn.classList.add("show")
            }else{
                btn.classList.remove("show")
            }
        })
    })
}









function swiperFunc(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        loop: false,
        spaceBetween: 50,
        centeredSlides: true          
      });
}








function userOptionScreens(){
    let input = document.querySelectorAll('.optionsradio')

            input.forEach(item =>{
                item.addEventListener('click',function(){
                    let container = document.querySelector(".container-menu")
                    if(input[1].checked == true && input[0].checked == false){                     
                        container.classList.add('movetohistoric')
                    }else{
                        container.classList.remove('movetohistoric')
                    }
                    
                })
            })
}