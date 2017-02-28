<?php 

	require 'connect.php';
    $postdata = file_get_contents("php://input");

    if (isset($postdata) && !empty($postdata)) {
        $request = json_decode($postdata);
        
        $name = $request->name;
        $grade = $request->grade;
        $menu = $request->menu;
        $duration = $request->duration;
        
        if ($name == '' || $grade == '' || $menu == '' || $duration == '') return;
        
        $sql = "INSERT INTO `students` (`student_id`, `name`, `menu`, `duration`, `grade`) VALUES (NULL, '$name', '$menu', '$duration', '$grade')";
        
        mysqli_query($dbcon, $sql);

    }

 ?>
 


   
    
   
  
 