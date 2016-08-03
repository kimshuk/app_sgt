<?php
/**
 * Created by PhpStorm.
 * User: andrewkim
 * Date: 6/15/16
 * Time: 3:04 PM
 */
require_once('mysql_connect.php');

if (isset($_POST)) {

    $student = $_POST["student_name"];
    $course = $_POST["class_name"];
    $grade = $_POST["score"];

    //do validation for duplicate data
//    $query = "SELECT `name`
//              FROM `student`
//              WHERE `name` = ('$student')";
//    $result = mysqli_query($conn, $query);

    $query = "INSERT INTO `student` (`student_name`) VALUES ('$student')";
    $result = mysqli_query($conn, $query);
    $student_id = mysqli_insert_id($conn);

    $query = "INSERT INTO `class`(`class_name`) VALUES ('$course')";
    $result = mysqli_query($conn, $query);
    $class_id = mysqli_insert_id($conn);

    $query = "INSERT INTO `sgt_db`.`grade` (`id`, `score`, `class_id`, `student_id`)
        VALUES (NULL, '$grade', '$class_id', '$student_id')";
    $result = mysqli_query($conn, $query);

    if(mysqli_affected_rows($conn) >0) {
        $response = [
            'success' => true,
            'message' => 'Grade has been added'
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'There was an error'
        ];
    }
    
    print_r(json_encode($response));
}

mysqli_free_result($result);

mysqli_close($conn);

?>