<?php
include 'conexao.php';


if (!isset($_SESSION)) session_start();

    $codUser = $_SESSION['codUser'];

    $query = mysqli_query($con,"select * from usuario where codUser='$codUser'");
    $info = mysqli_fetch_object($query);
    echo json_encode($info);
 
?>