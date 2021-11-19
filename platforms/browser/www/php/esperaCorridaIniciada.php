<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];

$query= mysqli_query($con,"select * from corrida where infUser=$codUser and status='iniciada' order by idCorrida DESC limit 1");

if(mysqli_num_rows($query) > 0){
    echo json_encode('iniciada');
}else echo json_encode('naoiniciada');


?>