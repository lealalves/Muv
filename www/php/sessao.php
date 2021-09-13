<?php
include 'conexao.php';


if (!isset($_SESSION)) session_start();

    $emailUser = $_SESSION['emailUser'];

    $query = mysqli_query($con,"select * from usuario where email='$emailUser'");
    $info = mysqli_fetch_object($query);
    echo json_encode($info);
 
?>