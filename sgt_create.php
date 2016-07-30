<?php
/**
 * Created by PhpStorm.
 * User: andrewkim
 * Date: 6/15/16
 * Time: 3:04 PM
 */
require_once('mysql_connect.php');

if (isset($_POST)) {

    $student = $_POST["studentName"];
    $course = $_POST["course"];
    $grade = $_POST["studentGrade"];

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

    $query3 = "INSERT INTO `sgt_db`.`grade` (`id`, `score`, `class_id`, `student_id`)
            VALUES (NULL, $grade, $class_id, $student_id)";

    print($query3);

    $result = mysqli_query($conn, $query3);

    if(mysqli_num_rows($result) >0) {
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

?>