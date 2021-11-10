<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];

$query= mysqli_query($con,"select * from corrida where infUser=$codUser and status='aceita' order by idCorrida DESC limit 1");
$resul = mysqli_fetch_assoc($query);

$_SESSION['driverId'] = $resul['infDriver'];

echo json_encode($resul);


?>