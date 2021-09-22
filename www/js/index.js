function userInfoProfile(){
    $.getJSON('http://127.0.0.1/Muv/www/php/sessao.php',function(result){
        let inputName = document.querySelector('#nomeUsuario');
        let inputEmail = document.querySelector('#emailUsuario');
        let inputTelefone = document.querySelector('#telefoneUsuario');
        let inputData = document.querySelector('#dataUsuario');
        let inputSenha = document.querySelector('#senhaUsuario');
        let especTxt = document.querySelector('.txtespec');
        especTxt.innerHTML = result.especificacao;  
        inputName.value = result.nome;
        inputEmail.value = result.email;
        inputTelefone.value = result.telefone;
        inputData.value = result.aniversario;
        inputSenha.value = result.senha;
    })
}

function showUserName(){
    $.getJSON('http://127.0.0.1/Muv/www/php/sessao.php',function(result){
        let inputName = document.querySelector('#nomeUsuario');
        inputName.innerHTML = result.nome;
    })  
}
function alterar(){
    
    let email = $('#emailUsuario').val();
    let telefone = $('#telefoneUsuario').val();
    let senha = $('#senhaUsuario').val();
    let data = $('#dataUsuario').val();
    let nome = $('#nomeUsuario').val();
    let string = `email=${email}&telefone=${telefone}&senha=${senha}&data=${data}&nome=${nome}&update=`;
    $.ajax({
        type: "POST",
        crossDomain: true, 
        cache: false,
        url: 'http://127.0.0.1/Muv/www/php/alterar.php',
        data: string,
        success: function(data){
            if($.trim(data) == "error"){
                console.log('n foi');                   
            }else{
                window.location.href = 'inapp.html'                 
            }                                        
        }                       
    });
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
                    showUserName();
                    window.location.href = 'inapp.html';                    
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
                        $(".inputlogin").toggleClass("error");
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
    var opcoes = document.querySelectorAll("input[type='radio']")
    opcoes.forEach(function(ck){
        ck.addEventListener("click", function(){
            let checked = document.querySelectorAll("input[type = 'checkbox']:checked")
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








function slideMenuHistoricoChat(){
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


function selectedEspec(){
    let radioespec = document.querySelectorAll("input[type='radio']")
    let selectEspec = '';
    if(radioespec[0].checked) selectEspec = 'visually impaired';
    else if(radioespec[1].checked) selectEspec = 'hearing impaired';
    else if(radioespec[2].checked) selectEspec = 'i am disabled';
    
    let string = `espec=${selectEspec}&update=`
    $.ajax({
        type: "POST",
        crossDomain: true, 
        cache: false,
        url: 'http://127.0.0.1/Muv/www/php/alterarEspec.php',
        data: string,
        success: function(data){
            if($.trim(data) == "error"){                
                console.log('n foi');                   
            }else{
                console.log('foi') 
                window.location.href = 'novoperfil.html'                 
            }                                        
        }                       
    });
}



// funções mapa 
document.addEventListener('deviceready',iniciar)

function iniciar(){
    navigator.geolocation.getCurrentPosition(geoSucess,geoError)
}

function geoSucess(dados){
    var lat = dados.coords.latitude
    var lon = dados.coords.longitude

    localStorage.setItem('latitu', lat)
    localStorage.setItem('longitu', lon)
   
    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    url += lat + ",";
    url += lon + "&key=";
    url += "AIzaSyABnuQpgsqSITzefoNMys4iXmfgWlXqEfk";
                        
    
        $.ajax({
        dataType:"json",
        url:url,
        error:function(e){
            console.log("errou"+e);
        },
        success: function(r){
            console.log("foi!"+r);
            initMap();
        }
    })

}

function geoError(e){
    navigator.notification.alert('Houve um erro:' + e.message,' ', 'Erro')
}

// mapa tela inicial
function initMap() {	 
    var lat= parseFloat(localStorage.getItem('latitu'));
    var lon= parseFloat(localStorage.getItem('longitu')); 
	  
    var meulocal = {lat: lat, lng: lon};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: meulocal,
        disableDefaultUI: true,
    });
    var marker = new google.maps.Marker({
        position: meulocal,
        map: map,
        title: 'Seu Local Atual!'
    });
}



// mapa tela seleção local
function initAutoComplete() {

    var lat= parseFloat(localStorage.getItem('latitu'));
    var lon= parseFloat(localStorage.getItem('longitu')); 
	  
    var meulocal = {lat: lat, lng: lon};

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: meulocal,
        disableDefaultUI: true,
        gestureHandling: "greedy"
    });
    var marker = new google.maps.Marker({
        position: meulocal,
        map: map,
        title: 'Seu Local Atual!'
    });

    const input = document.getElementById("destino-input");
    const searchBox = new google.maps.places.SearchBox(input);
    
    const directionsDisplay = new google.maps.DirectionsRenderer();
    const directionsService = new google.maps.DirectionsService();

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();
    
        if (places.length == 0) {
          return;
        }    
        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
    
        places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
            console.log("Returned place contains no geometry");
            return;
          }
        if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }          
        });        
        map.fitBounds(bounds);        

        const destino = places[0].formatted_address

        if (marker) marker.setMap(null);
			
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel(document.getElementById("directions"));

        route = true;
        var start = meulocal;
        var end = destino;
        
        var request = {
            origin: start, 
            destination: end,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK)
                directionsDisplay.setDirections(response);
        });


      });

}