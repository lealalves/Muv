function userInfoProfile() {
    $.getJSON('http://127.0.0.1/Muv/www/php/sessao.php', function (result) {
        $('#nomeUsuario').val(result.nome)
        $('#emailUsuario').val(result.email)
        $('#telefoneUsuario').val(result.telefone)
        $('#dataUsuario').val(result.aniversario)
        $('#senhaUsuario').val(result.senha)
        $('.txtespec').text(result.especificacao)

        if (result.imgperfil != undefined) {
            $('.userImg').attr('src', `userimg/${result.imgperfil}`)
        } else {
            $('.userImg').attr('src', 'img/noavatar.png')
        }

        if (result.especificacao == "i am disabled") {
            $('#especImg').attr('src', `img/disabledicon.png`)
            $('.especselect').css('background-color', '#15C4EA')
        } else if (result.especificacao == "hearing impaired") {
            $('#especImg').attr('src', `img/hearingicon.png`)
            $('.especselect').css('background-color', '#22FFAF')
        } else if (result.especificacao == "visually impaired") {
            $('#especImg').attr('src', `img/visuallyicon.png`)
            $('.especselect').css('background-color', '#8B54FF')
        }
    })
}

function showUserName() {
    $.getJSON('http://127.0.0.1/Muv/www/php/sessao.php', function (result) {
        let inputName = document.querySelector('#nomeUsuario');
        inputName.innerHTML = result.nome;
    })
}

function showUserImg() {
    $.getJSON('http://127.0.0.1/Muv/www/php/sessao.php', function (result) {

        if (result.imgperfil != undefined) {
            $('.userImg').attr('src', `userimg/${result.imgperfil}`)
        } else {
            $('.userImg').attr('src', 'img/noavatar.png')
        }
    })
}

function alterarImagem() {
    var file_data = $('#inputfile').prop('files')[0];
    var form_data = new FormData();

    if (file_data != undefined) {
        form_data.append('file', file_data);
        $.ajax({
            url: "http://127.0.0.1/Muv/www/php/alterarImagem.php",
            type: "POST",
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                $('.userImg').attr('src', `userimg/${data}`)
            }
        });
    } else {
        console.log('sem imagem selecionada!')
    }

}

function alterar() {
    let email = $('#emailUsuario').val();
    let telefone = $('#telefoneUsuario').val();
    let senha = $('#senhaUsuario').val();
    let data = $('#dataUsuario').val();
    let nome = $('#nomeUsuario').val();
    let string = `email=${email}&telefone=${telefone}&senha=${senha}&data=${data}&nome=${nome}`;
    $.ajax({
        type: "POST",
        crossDomain: true,
        cache: false,
        url: 'http://127.0.0.1/Muv/www/php/alterar.php',
        data: string,       
        success: function (data) {
            if ($.trim(data) == "success") {
                window.location.href = 'inapp.html'
                console.log('foi');
            } else {
                console.log('n foi');
            }
        }
    });
}

function logout() {
    var url = 'http://127.0.0.1/Muv/www/php/logout.php'
    $.ajax({
        url: url,
        data: url,
        success: function (data) {
            window.location.href = data;
        }
    })
}

function login() {
    var email = $('#email').val();
    var senha = $('#password').val()
    var url = `http://127.0.0.1/Muv/www/php/login.php?email=${email}&senha=${senha}`;
    if ($.trim(email).length > 0 & $.trim(senha).length > 0) {
        $.ajax({
            type: "POST",
            crossDomain: true,
            cache: false,
            url: url,
            data: url,
            beforeSend: function(){
                console.log('carregando..')
            },
            success: function (data) {
                if ($.trim(data) == "success") {
                    window.location.href = 'inapp.html';
                    showUserName();
                } else {
                    $(".inputlogin").addClass("error");
                    setTimeout(function (){
                        $(".inputlogin").removeClass("error");
                    },2000)
                }
            }
        });
    } else {
        $(".inputlogin").addClass("error");
            setTimeout(function (){
                $(".inputlogin").removeClass("error");
            },2000)
    };

}

function cadastrar() {
    var email = $('#email').val();
    var senha = $('#password').val();
    var telefone = $('#phonenumber').val();
    var string = `email=${email}&senha=${senha}&telefone=${telefone}&insert=`;

    if ($.trim(email).length > 0 & $.trim(senha).length > 0 & $.trim(telefone).length > 0) {
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/Muv/www/php/cadastrar.php",
            data: string,
            crossDomain: true,
            cache: false,
            success: function (data) {
                if ($.trim(data) == "success") {
                    window.location.href = 'especificacao.html'
                } else {
                    $(".inputlogin").addClass("error");
                    setTimeout(function (){
                        $(".inputlogin").removeClass("error");
                    },2000)                    
                }
            }
        });
    } else {
        $(".inputlogin").addClass("error");
            setTimeout(function (){
                $(".inputlogin").removeClass("error");
            },2000)
    }
}






function validarEspec() {
    $('.btnespec').hide()
    var opcoes = document.querySelectorAll("input[type='radio']")
    opcoes.forEach(function (ck) {
        ck.addEventListener("click", function () {
            let checked = document.querySelectorAll("input[type = 'checkbox']:checked")
            if (checked != 0) {
                $('.btnespec').fadeIn()
            }
        })
    })
}









function swiperFunc() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        loop: false,
        spaceBetween: 50,
        centeredSlides: true
    });
}








function slideMenuHistoricoChat() {
    let input = document.querySelectorAll('.optionsradio')

    input.forEach(item => {
        item.addEventListener('click', function () {
            let container = document.querySelector(".container-menu")
            if (input[1].checked == true && input[0].checked == false) {
                container.classList.add('movetohistoric')
            } else {
                container.classList.remove('movetohistoric')
            }

        })
    })
}


function selectedEspec() {
    let radioespec = document.querySelectorAll("input[type='radio']")
    let selectEspec = '';
    if (radioespec[0].checked) selectEspec = 'visually impaired';
    else if (radioespec[1].checked) selectEspec = 'hearing impaired';
    else if (radioespec[2].checked) selectEspec = 'i am disabled';

    let string = `espec=${selectEspec}&update=`
    $.ajax({
        type: "POST",
        crossDomain: true,
        cache: false,
        url: 'http://127.0.0.1/Muv/www/php/alterarEspec.php',
        data: string,
        success: function (data) {
            if ($.trim(data) == "success") {
                console.log('foi')
                window.location.href = 'novoperfil.html'
            } else {
                console.log('n foi');
            }
        }
    });
}



// funções mapa 
document.addEventListener('deviceready', iniciar)

function iniciar() {
    navigator.geolocation.getCurrentPosition(geoSucess, geoError)
}
// definindo o local atual
function geoSucess(dados) {
    var lat = dados.coords.latitude
    var lon = dados.coords.longitude

    localStorage.setItem('latitu', lat)
    localStorage.setItem('longitu', lon)

    var url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
    url += lat + ",";
    url += lon + "&key=";
    url += "AIzaSyABnuQpgsqSITzefoNMys4iXmfgWlXqEfk";


    $.ajax({
        dataType: "json",
        url: url,
        error: function (e) {
            console.log("errou" + e);
        },
        success: function (r) {
            console.log("foi!");
            initMap();
        }
    })

}

function geoError(e) {
    navigator.notification.alert('Houve um erro:' + e.message, ' ', 'Erro')
}

// mapa tela inicial
function initMap() {
    var lat = parseFloat(localStorage.getItem('latitu'));
    var lon = parseFloat(localStorage.getItem('longitu'));

    var meulocal = { lat: lat, lng: lon };
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: meulocal,
        disableDefaultUI: true,
    });
    var marker = new google.maps.Marker({
        position: meulocal,
        map: map,
        animation: google.maps.Animation.DROP
    });

    const contentString = '<h1>Seu local atual!</h1>';
    setTimeout(function () {
        const infowindow = new google.maps.InfoWindow({
            content: contentString,
        });
        infowindow.open({
            anchor: marker,
            map,
            shouldFocus: false,
        });
    }, 1000)
}



// mapa tela seleção local
function initAutoComplete() {

    let directionsDisplay = new google.maps.DirectionsRenderer();
    let directionsService = new google.maps.DirectionsService();

    var lat = parseFloat(localStorage.getItem('latitu'));
    var lon = parseFloat(localStorage.getItem('longitu'));

    var meulocal = { lat: lat, lng: lon };

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: meulocal,
        disableDefaultUI: true,
        gestureHandling: "greedy"
    });
    var marker = new google.maps.Marker({
        position: meulocal,
        map: map,
    });

    const input = document.getElementById("destino-input");
    const searchBox = new google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
        searchBox.setBounds(map.getBounds());
    });
    // apos definir o destino :
    searchBox.addListener("places_changed", () => {
        $('.localselectoptions').fadeOut(100);
        if ($('.localselectoptions').fadeOut()) {
            $('.localsearchbg').height(60)
        }

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
        var destinolocal = places[0].formatted_address;

        if (marker) marker.setMap(null);

        directionsDisplay.setMap(map);

        var request = {
            origin: meulocal,
            destination: destinolocal,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                $('.loadIcon').hide();

                // calculo do preço
                let t = response.routes[0].legs[0].duration.value
                let km = response.routes[0].legs[0].distance.value

                let muvX = 2 + ((km / 1000) * 1.50) + ((t / 60) * 0.25) + 1;

                let muvMax = 2 + ((km / 1000) * 2.40) + ((t / 60) * 0.25) + 1;

                let muvNav = 2 + ((km / 1000) * 4.55) + ((t / 60) * 0.25) + 1;

                // mostrando o preço na tela de cada classe
                let muvXTexto = document.getElementById('xclassePreco');
                let muvMaxTexto = document.getElementById('maxclassePreco');
                let muvNavTexto = document.getElementById('navclassePreco');

                muvXTexto.innerHTML = `R$${muvX.toFixed(2)}`;
                muvMaxTexto.innerHTML = `R$${muvMax.toFixed(2)}`;
                muvNavTexto.innerHTML = `R$${muvNav.toFixed(2)}`;

                let opcoes = document.querySelectorAll('.slides');
                // verificando qual classe foi escolhida e pegando o preço
                opcoes.forEach((op) => {
                    op.addEventListener('click', function (event) {
                        opcaoSelecionada = event.currentTarget
                        let preco
                        let classe
                        if (opcaoSelecionada.id == "classe-1") {
                            classe = "muvX"
                            preco = muvXTexto.innerHTML
                        } else if (opcaoSelecionada.id == "classe-2") {
                            classe = "muvMax"
                            preco = muvMaxTexto.innerHTML
                        } else if (opcaoSelecionada.id == "classe-3") {
                            classe = "muvNav"
                            preco = muvNavTexto.innerHTML
                        }

                        // enviando informações preCorrida para o banco de dados
                        let duracao = response.routes[0].legs[0].duration.text
                        let distancia = response.routes[0].legs[0].distance.text
                        let destino = response.routes[0].legs[0].end_address
                        let origem = response.routes[0].legs[0].start_address

                        let string = `duracao=${duracao}&distancia=${distancia}&destino=${destino}
                        &origem=${origem}&preco=${preco}&classe=${classe}`
                        $.ajax({
                            type: "POST",
                            crossDomain: true,
                            cache: false,
                            url: 'http://127.0.0.1/Muv/www/php/preCorrida.php',
                            data: string,
                            success: function (data) {
                                if ($.trim(data) == "success") {
                                    console.log('dados da corrida gravados')
                                    window.location.href = 'localconfirm.html'
                                } else {
                                    console.log('não foi')
                                }
                            }
                        });
                    })
                })
            }
        });
    });
}

// mostrar dados da corrida para confirmação
function raceConfirmInfo() {
    $.getJSON('http://127.0.0.1/Muv/www/php/preCorridaConsulta.php', function (result) {
        let txtDestino = document.getElementById('txtDestino')
        let txtDistancia = document.getElementById('txtDistancia')
        let txtTempo = document.getElementById('txtTempo')
        let txtPreco = document.getElementById('txtPreco')
        let classeImg = document.getElementById('classeImg')

        classeImg.setAttribute('src', `img/${result.classe}.png`)
        txtPreco.innerHTML = result.preco;
        txtDestino.innerHTML = result.endDestino;
        txtDistancia.innerHTML = result.distancia;
        txtTempo.innerHTML = result.tempo;

    })
}

$(document).ready(function () {
    $('#btnCancelpreRace,#btnLoadingCancelRace').click(() => {
        $.ajax({
            type: "POST",
            crossDomain: true,
            cache: false,
            url: 'http://127.0.0.1/Muv/www/php/cancelarPreCorrida.php',
            success: function (data) {
                if ($.trim(data) == "success") {
                    window.location.href = 'inapp.html'
                    console.log('corrida deletada com sucesso')
                } else {
                    console.log('não foi')
                }
            }
        });
    })
    $('#btnConfirmpreRace').click(() => {
        let input = document.querySelectorAll('input[name="metodoPagamento"]')
        let pagamento;
        console.log(input)
        if (input[0].checked) {
            pagamento = "cartaocredito";
        } else pagamento = "dinheiro";

        let string = `pagamento=${pagamento}&status=motorista`

        $.ajax({
            type: "POST",
            crossDomain: true,
            cache: false,
            url: "http://127.0.0.1/Muv/www/php/corrida.php",
            data: string,
            success: function (data) {
                if ($.trim(data) == "success") {
                    console.log('corrida gravada com sucesso')
                    window.location.href = 'loadingpage.html'
                } else {
                    console.log('não foi')
                }
            }
        });
    })
})



// script select animado
function selectAnimate() {
    $('select').awselect({
        background: "#fff", //the dark blue background
        vertical_padding: "15px", //top and bottom padding
        horizontal_padding: "20px", // left and right padding,
        immersive: false // immersive option, demonstrated at the next example
    })
};