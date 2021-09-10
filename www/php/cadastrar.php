<?php 
include 'conexao.php';

    if(isset($_POST['insert'])){
        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $telefone = $_POST['telefone'];

        $query = mysqli_query($con, "INSERT INTO usuario (email, senha, telefone) VALUES ('$email', '$senha', '$telefone')");

        if($query){
            echo 'success';
        }
            
        else{
           echo 'error';
        }

    }        

    
?>

