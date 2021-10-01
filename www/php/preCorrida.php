<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];


$classe = $_POST['classe'];
$preco = $_POST['preco'];
$destino = $_POST['destino'];
$distancia = $_POST['distancia'];
$duracao = $_POST['duracao'];

$query = mysqli_query($con,"insert into corrida (endDestino,distancia,tempo,preco,classe,infUser) values 
('$destino','$distancia','$duracao','$preco','$classe',$codUser)");

if($query){
    echo "success";
}else {
    echo "error";
}
?>