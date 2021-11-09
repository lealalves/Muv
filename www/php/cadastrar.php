<?php 
include 'conexao.php';

    if(isset($_POST['insert'])){

        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $telefone = $_POST['telefone'];


        $queryValidacao = mysqli_query($con, "select * from usuario where emailUser='$email'");
        if(mysqli_num_rows($queryValidacao) != 0){
            echo 'error';
        }else{

            $query = mysqli_query($con, "INSERT INTO usuario (emailUser, senhaUser, telefoneUser) VALUES ('$email', '$senha', '$telefone')");            
                if($query){
                    echo 'success';
                    if(!isset($_SESSION)) session_start();
                    $querySessao = mysqli_query($con, "select * from usuario where emailUser='$email'");                                       
                    $resul = mysqli_fetch_array($querySessao);
                    $_SESSION['codUser'] = $resul[0];
                }            
                else{
                echo 'error';
                }

            }
        }
?>

