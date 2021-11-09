<?php 
include 'conexao.php';

$email = $_REQUEST['email'];
$senha = $_REQUEST['senha'];

    $query = mysqli_query($con, "select * from usuario where emailUser='$email' and senhaUser='$senha'");

    if(mysqli_num_rows($query) == 0){
        echo 'error';
    }else{
        echo 'success';
        $resul = mysqli_fetch_array($query);
        if(!isset($_SESSION)) session_start();

        $_SESSION['codUser'] = $resul[0];
        $_SESSION['emailUser'] = $resul[1];
    }
?>
