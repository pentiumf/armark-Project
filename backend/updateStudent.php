<?php 

	require 'connect.php';
    $postdata = file_get_contents("php://input");

    if (isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);
        
        $id = $request->updatedStudent;
        $name = $request->name;
        $grade = $request->grade;
        $menu = $request->menu;
        $duration = $request->duration;
        
        
        $sql = "UPDATE `students` SET `name` = '$name', `menu` = '$menu', `duration` = '$duration', `grade` = '$grade' WHERE `students`.`student_id` = '$id'";

        
        mysqli_query($dbcon, $sql);

    }

 ?>
 