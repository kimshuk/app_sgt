<?php
/**
 * Created by PhpStorm.
 * User: andrewkim
 * Date: 6/10/16
 * Time: 3:19 PM
 */

require_once('mysql_connect.php');

mysqli_select_db("sgt_db") or die("couldn't connect to database");

$query = "SELECT `student id``class id``grade` FROM  
          WHERE ";

$result = mysqli_query($conn, $query);