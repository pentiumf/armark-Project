<?php 

	require 'connect.php';

    $students = array();

    $sql = "SELECT * FROM students";

    if ($result = mysqli_query($dbcon, $sql)) {
        $count = mysqli_num_rows($result);
        
        //$cr = 0;
        while ($row = mysqli_fetch_assoc($result)) {
              $students[] = $row;
//            $cribs[$cr]['id'] = (int)$row['id'];
//            $cribs[$cr]['type'] = $row['type']; 
//            $cribs[$cr]['price'] = $row['price'];
//            $cribs[$cr]['address'] = $row['address'];
//            $cribs[$cr]['description'] = $row['description'];
//            $cribs[$cr]['bedrooms'] = $row['bedrooms'];
//            $cribs[$cr]['bathrooms'] = $row['bathrooms'];
//            $cribs[$cr]['area'] = $row['area'];
//            $cribs[$cr]['image'] = $row['image'];
//            $cribs[$cr]['owner'] = $row['owner'];
            
            //$cr++;
        }
    }

    //echo $count;
    $json = json_encode($students);

    $output = '[{"total": "'.$count.'", "students": '.$json.'}]';

    
    echo $output;
    exit;

 ?>
 


   
    
   
  
 