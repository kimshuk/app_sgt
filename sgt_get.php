<?php
/**
 * Created by PhpStorm.
 * User: andrewkim
 * Date: 6/10/16
 * Time: 3:19 PM
 */

require_once('mysql_connect.php');

mysqli_select_db("sgt_db") or die("couldn't connect to database");

$query = "SELECT `class`.`name`, `student`.`name`, `grade`.`grade` FROM `grade`
          JOIN `student`
          ON `student`.`id` = `grade`.`student_id`
          JOIN `class`
          ON `grade`.`class_id` = `class`.`id`";

$result = mysqli_query($conn, $query);

if(mysqli_num_rows($result) > 0){
    while($row = mysqli_fetch_assoc($result)){
        $new_id = mysqli_insert_id($conn);
        $output['success'] = true;
        $output['new_id'] = $new_id;
    }
}