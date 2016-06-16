<?php
/**
 * Created by PhpStorm.
 * User: andrewkim
 * Date: 6/15/16
 * Time: 3:04 PM
 */
require_once('mysql_connect.php');

$student = $_POST["student_name"];
$course = $_POST["student_course"];
$grade = $_POST["student_grade"];
//do validation for duplicate data


$query1 = "INSERT INTO `student`.`student_name` VALUES `$student`";
//do query
$result = mysqli_query($conn, $query1);
//get insert id and store in variable
$id = mysqli_insert_id($conn);
$query2 = "INSERT INTO `class`.`class_name` VALUES `$course`";
//do query
$result = mysqli_query($conn, $query2);
//get insert id and store in different variable
$
$query3 = "INSERT INTO `grade` SET  
            `score` = `$grade`,
            SELECT `class`.`id` FROM `class`
            WHERE `class`.`id` = `grade`.`class_id`";


?>