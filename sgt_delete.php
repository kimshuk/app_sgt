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
    $score = $_POST["score"];

    $query = "DELETE FROM `grade`
              WHERE student_id = ('$student_id')
              AND score = ('$score')
              LIMIT 1";

    $result = mysqli_query($conn, $query);

    if ($result && mysqli_affected_rows($conn) ==1) {
        $response = [
            'success' => true,
            'message' => 'Successfully deleted'
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'Delete Error'
        ];
    }
    print_r(json_encode($response));

}

mysqli_free_result($result);

mysqli_close($conn);

?>