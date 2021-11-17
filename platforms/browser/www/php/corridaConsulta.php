<?php

include 'conexao.php';

session_start();

$query= mysqli_query($con,"select * from corrida inner join motorista on infDriver = codDriver where infDriver =" . $_SESSION['driverId']);
$resul = mysqli_fetch_object($query);


echo json_encode($resul);


?>