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
            if(!isset($_SESSION)) session_start();
                if($query){
                    echo 'success';
                    $querySessao = mysqli_query($con, "select * from usuario where email='$email'");                                       
                    $resul = mysqli_fetch_array($querySessao);
                    $_SESSION['codUser'] = $resul[0];
                }            
                else{
                echo 'error';
                }

            }
        }

            

    
?>

