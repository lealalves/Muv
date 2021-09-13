<?php

include 'conexao.php';

$email = $_POST['email'];
$telefone = $_POST['telefone'];
$senha = $_POST['senha'];
$nome = $_POST['nome'];
$data = $_POST['data'];


$query = mysqli_query($con,"update usuario set email='$email',senha='$senha',telefone='$telefone',nome='$nome',
aniversario='$data' where email='$email'");
    if($query){
        echo 'success';
    }else{
        echo 'error';
    } 

?>