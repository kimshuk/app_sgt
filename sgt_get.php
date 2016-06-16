<?php
/**
 * Created by PhpStorm.
 * User: andrewkim
 * Date: 6/10/16
 * Time: 3:19 PM
 */

require_once('mysql_connect.php');

$query = "SELECT `student`.`student_name`, `class`.`class_name`, `grade`.`score` FROM `grade`
          JOIN `student`
          ON `student`.`id` = `grade`.`student_id`
          JOIN `class`
          ON `grade`.`class_id` = `class`.`id`";

$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $output[] = $row;
    }
    $response = json_encode($output);
    print_r($response);
}

?>