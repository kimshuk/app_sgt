<?php
/**
 * Created by PhpStorm.
 * User: andrewkim
 * Date: 7/30/16
 * Time: 3:28 PM
 */
require_once('mysql_connect.php');

if (isset($_POST)) {
    $student_id = $_POST["student_id"];

    $query = "DELETE FROM `grade`
              WHERE id = $student_id
              LIMIT 1";

    $result = mysqli_query($conn, $query);

    if ($result && mysqli_affected_rows($conn) ==1) {
        // success
        // redirect to the page
        echo "Success!";
    } else {
        // fail
        //

    }

}
?>