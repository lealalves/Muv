<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];

$userImg = $_FILES['file'];
$filetype = $userImg['type'];

if($filetype == 'image/pjpeg' || $filetype == 'image/PJPEG' || $filetype == 'image/jpeg' || $filetype == 'image/JPEG' || $filetype == 'image/jpg' || $filetype == 'image/JPG' || $filetype == 'image/png' || $filetype == 'image/PNG' || $filetype == 'image/gif' || $filetype == 'image/GIF' || $filetype == 'image/bmp' || $filetype == 'image/BMP'){
    if($userImg['size'] > 1000000){
        echo('Arquivo muito grande. Tamanho máximo permitido 500ktb. O aqrquivo enviado contém'.round($arquivo['size']/1024).'kb');
    }

    $novonome = md5(mt_rand(1, 1000).$userImg['name']).'jpg';
    $dr = '../userimg/';
    $caminho = $dr.$novonome;

    move_uploaded_file($_FILES['file']['tmp_name'], $caminho);

    $qlastimg = mysqli_query($con, "select imgperfil from usuario where codUser='$codUser'");
    $lastimg = mysqli_fetch_array($qlastimg);

    if(empty($lastimg[0])){
        $query = mysqli_query($con, "update usuario set imgperfil='$novonome' where codUser='$codUser'");
        if($query) echo $novonome;
        else echo "error";
    }else{
        //se o usuario ja cadastrou outra imagem anteriormente ela ser apagada
        unlink('../userimg/' . $lastimg[0]);
        $query = mysqli_query($con, "update usuario set imgperfil='$novonome' where codUser='$codUser'");
        if($query) echo $novonome;
        else echo "error";
    }
}
 
    

