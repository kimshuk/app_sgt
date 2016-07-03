<?php
/**
 * Created by PhpStorm.
 * User: andrewkim
 * Date: 6/15/16
 * Time: 3:04 PM
 */
require_once('mysql_connect.php');

//$_POST => {
//    "student_name" => $student;
//};


$student = $_POST["student_name"];
$course = $_POST["student_course"];
$grade = $_POST["student_grade"];

//do validation for duplicate data
//if(isset($_POST)){
//    foreach ($_POST as $key => $value){
//        if($_POST[$key] == ) {
//
//        }
//    }
//}


$query1 = "INSERT INTO `student`.`student_name` VALUES `$student`";
//do query
$result = mysqli_query($conn, $query1);
//get insert id and store in variable
$student_id = mysqli_insert_id($conn);
$query2 = "INSERT INTO `class`.`class_name` VALUES `$course`";
//do query
$result = mysqli_query($conn, $query2);
//get insert id and store in different variable
$class_id = mysqli_insert_id($conn);

$query3 = "INSERT INTO `grade` SET  
            `score` = `$grade`,
            `class_id` = `$class_id`,
            `student_id` = `$student_id`";

$result = mysqli_query($conn, $query3);


if(mysqli_num_rows($result) >0) {
    while($row = mysqli_fetch_assoc($result)){
        $output = $row;
    }
    $response = json_encode($output);
    print_r($response);
}

?>