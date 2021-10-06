<?php

include 'conexao.php';

session_start();

$codUser = $_SESSION['codUser'];

/* Getting file name */
$filename = $_FILES['file']['name'];

/* Location */
$location = "../userimg/" . $filename;
$imageFileType = pathinfo($location, PATHINFO_EXTENSION);
$imageFileType = strtolower($imageFileType);

/* Valid extensions */
$valid_extensions = array("jpg", "jpeg", "png");

/* Check file extension */
if (in_array(strtolower($imageFileType), $valid_extensions)) {
    /* Upload file */
    if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
        $qlastimg = mysqli_query($con, "select imgperfil from usuario where codUser='$codUser'");
        $lastimg = mysqli_fetch_array($qlastimg);
        if(empty($lastimg[0])){
            $query = mysqli_query($con, "update usuario set imgperfil='$filename' where codUser='$codUser'");
            if ($query) {
                echo 'success';
            } else {
                echo 'error';
            }
        }else{
            if (unlink('../userimg/' . $lastimg[0])) {
                $query = mysqli_query($con, "update usuario set imgperfil='$filename' where codUser='$codUser'");
                if ($query) {
                    echo 'success';
                } else {
                    echo 'error';
                }
            }
        }        
    }
}
