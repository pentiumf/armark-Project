<?php 

	require 'connect.php';
    $postdata = file_get_contents("php://input");

    if (isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);
        
        $id = $request->studentId;
        
        $sql = "DELETE FROM `students` WHERE `student_id` = '$id' LIMIT 1";

        
        mysqli_query($dbcon, $sql);

    }

 ?>
 