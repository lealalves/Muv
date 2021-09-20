<?php 
include 'conexao.php';

$email = $_REQUEST['email'];
$senha = $_REQUEST['senha'];

    $query = mysqli_query($con, "select * from usuario where email='$email' and senha='$senha'");

    if(mysqli_num_rows($query) == 0){
        echo 'error';
    }else{
        $resul = mysqli_fetch_array($query);
        if(!isset($_SESSION)) session_start();

        $_SESSION['codUser'] = $resul[0];
        $_SESSION['emailUser'] = $resul[1];
    }
?>
