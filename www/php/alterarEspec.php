<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];
$espec = $_POST['espec'];

$query = mysqli_query($con,"update usuario set especificacao='$espec' where codUser='$codUser'");
    if($query){
        echo 'success';
    }else{
        echo 'error';
    } 

?>