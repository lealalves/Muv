<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];

$query= mysqli_query($con,"select * from corrida where infUser=$codUser and status='finalizada' order by idCorrida DESC limit 1");
$resul = mysqli_fetch_assoc($query);

if(mysqli_num_rows($query) > 0){
    $output = '<div class="row historicdata">
<div class="row streetinfo">
    <div class="row streetname">
        <p style="color: #8192B6;font-size:10px">9:10</p>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="10" height="10"
            viewBox="0 0 172 172" style=" fill:#000000;">
            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1"
                stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"
                stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
                font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#8192b6">
                    <path
                        d="M86,14.33333c-39.58041,0 -71.66667,32.08626 -71.66667,71.66667c0,39.58041 32.08626,71.66667 71.66667,71.66667c39.58041,0 71.66667,-32.08626 71.66667,-71.66667c0,-39.58041 -32.08626,-71.66667 -71.66667,-71.66667z">
                    </path>
                </g>
            </g>
        </svg>
        <input class="historicStreetInput" type="text" value="' . $resul['endDestino'] . '" disabled >
    </div>
    <div class="row">
        <i style="color: #8192B6;margin-left: 33px;" class="fas fa-ellipsis-v"></i>
    </div>
    <div class="row streetname">
        <p style="color:#22FFAF;font-size:10px">9:21</p>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="10" height="10"
            viewBox="0 0 172 172" style=" fill:#000000;">
            <g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1"
                stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10"
                stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none"
                font-size="none" text-anchor="none" style="mix-blend-mode: normal">
                <path d="M0,172v-172h172v172z" fill="none"></path>
                <g fill="#22ffaf">
                    <path
                        d="M86,14.33333c-39.58041,0 -71.66667,32.08626 -71.66667,71.66667c0,39.58041 32.08626,71.66667 71.66667,71.66667c39.58041,0 71.66667,-32.08626 71.66667,-71.66667c0,-39.58041 -32.08626,-71.66667 -71.66667,-71.66667z">
                    </path>
                </g>
            </g>
        </svg>
        <input class="historicStreetInput" type="text" value="' . $resul['endOrigem'] . '" disabled >
    </div>
</div>
<div class="row historicraceinfo">
    <h1 style="color: #8192B6;font-size:10px">14/08/2021</h1>
    <h1 style="color: white;font-size:20px">' . $resul['preco'] . '</h1>
    <div class="row distanceinfo">
        <i style="color: blue;" class="fas fa-clock fa-xs"></i>
        <h1 style="color: white;font-size:8px">' . $resul['tempo'] . '</h1>
        <h1 style="color: white;font-size:8px">' . $resul['distancia'] . '</h1>
    </div>
</div>
</div>';
echo json_encode($output);
}else echo json_encode('norace');






?>