function userInfo(){
    $.getJSON('http://localhost/Muv/www/php/sessao.php',function(result){
        let input = document.querySelector('#nomeusuario')
        input.innerHTML = result.email
    })  
}

function logout(){
    var url = 'http://localhost/Muv/www/php/logout.php'
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
    var url = `http://localhost/Muv/www/php/login.php?email=${email}&senha=${senha}`;
        $.ajax({
            type: "POST",
            crossDomain: true, 
            cache: false,
            url: url,
            data: url,
            success: function(data){              
                if($.trim(data) == "error"){
                    $(".inputlogin").addClass("error");
                    console.log("n foi")                    
                }else{
                    userInfo();
                    window.location.href = 'menu.html';                    
                }                                        
            }                       
        });
}

function cadastrar() {
    var email = $('#email').val();
    var senha = $('#password').val();
    var telefone = $('#phonenumber').val();
    var string = `email=${email}&senha=${senha}&telefone=${telefone}&insert=`;

    if ($.trim(email).length > 0 & $.trim(senha).length > 0 & $.trim(telefone).length > 0) {
        $.ajax({
            type: "POST",
            url: "http://localhost/Muv/www/php/cadastrar.php",
            data: string,
            crossDomain: true,
            cache: false,
            success: function(data) {
                if($.trim(data) == 'error') {                            
                        console.log("burro")
                    }else{
                        window.location.href = 'especificacao.html'
                    }
                }
            });                
        }else{
            $(".inputlogin").addClass("error");
        }        
    }