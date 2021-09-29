<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];

$destino = $_POST['destino'];
$distancia = $_POST['distancia'];
$duracao = $_POST['duracao'];

$query = mysqli_query($con,"insert into corrida (endDestino,distancia,tempo,infUser) values 
('$destino','$distancia','$duracao',$codUser)");


    $queryConsulta = mysqli_query($con,"select * from corrida where infUser=$codUser order by idCorrida DESC limit 1");
    $resul = mysqli_fetch_object($queryConsulta);
    echo json_encode($resul);


?>