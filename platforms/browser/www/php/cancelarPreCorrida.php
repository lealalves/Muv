<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];

$query= mysqli_query($con,"DELETE from corrida where infUser=$codUser order by idCorrida DESC limit 1");

if($query) {
    echo 'success';
}else echo 'error';


?>