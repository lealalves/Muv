<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];

$pagamento = $_POST['pagamento'];
$status = $_POST['status'];

$query = mysqli_query($con,"update corrida set pagamento='$pagamento',status='$status' where infUser=$codUser");

if($query){
    echo "success";
}else {
    echo "error";
}
?>