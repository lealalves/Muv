<?php

include 'conexao.php';

if(!isset($_SESSION)) session_start();

$email = $_SESSION['emailUser'];
$espec = $_POST['espec'];

$query = mysqli_query($con,"update usuario set especificacao='$espec' where email='$email'");
    if($query){
        echo 'success';
    }else{
        echo 'error';
    } 

?>