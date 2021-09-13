<?php 
include 'conexao.php';

    if(isset($_POST['insert'])){
        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $telefone = $_POST['telefone'];


        $queryValidacao = mysqli_query($con, "select * from usuario where email='$email'");
        if(mysqli_num_rows($queryValidacao) != 0){
            echo 'error';
        }else{

            $query = mysqli_query($con, "INSERT INTO usuario (email, senha, telefone) VALUES ('$email', '$senha', '$telefone')");

                if($query){
                    echo 'success';
                    if(!isset($_SESSION)) session_start();
                    $_SESSION['emailUser'] = $email;
                }            
                else{
                echo 'error';
                }

            }
        }

            

    
?>

