/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
var student_name;
var student_course;
var student_grade;
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked () {
    var studentName = student_name.val();
    var studentCourse = student_course.val();
    var studentGrade = student_grade.val();
    addStudent(studentName, studentCourse, studentGrade);
    updateData();
}
/**
 * cancelClicked - Event Handler when user clicks the cancel button, should clear out student form
 */
function cancelClicked() {
    clearAddStudentForm();
}
/**
 * addStudent - creates a student objects based on input fields in the form and adds the object to global student array
 *
 * @return undefined
 */
function addStudent(studentName, studentCourse, studentGrade) {
    var studentObj = {
        name : studentName,
        course : studentCourse,
        grade : studentGrade,
        id: 0
    };
    addToServer(studentObj);
    student_array.push(studentObj);
    // addStudentToDom(studentObj);
}
/**
 * clearAddStudentForm - clears out the form values based on inputIds variable
 */
function clearAddStudentForm() {
    $('#studentName').val('');
    $('#course').val('');
    $('#studentGrade').val('');
}
/**
 * calculateAverage - loop through the global student array and calculate average grade and return that value
 * @returns {number}
 */
function calculateAverage () {
    var total_score = 0;
    for (var i = 0; i < student_array.length; i++) {
        total_score += parseInt(student_array[i].grade);
    }
    return Math.round(total_score / student_array.length);
}
/**
 * updateData - centralized function to update the average and call student list update
 */
function updateData() {
    updateStudentList();
    var avg = calculateAverage();
    $('.avgGrade').html(avg);
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    $('tbody > tr').remove();
    for (var i=0; i < student_array.length; i++) {
        addStudentToDom(student_array[i]);
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */

/**
 *  removeStudent - remove student object in the student array
 *  1. using index of the row of the current button to remove from array
 *  2. store the index when adding to the DOM into a data attribute
 */
function addStudentToDom(studentObj) {
        var table_row = $('<tr>');
        var tableName = $('<td>').text(studentObj.student_name);
        var tableCourse = $('<td>').text(studentObj.class_name);
        var tableGrade = $('<td>').text(studentObj.score);
        var tableOp = $('<button>').addClass('btn btn-danger').html('delete').attr('student-id', studentObj.id);
        tableOp.on('click', function () {
            console.log(student_array.indexOf(studentObj));
            student_array.splice(student_array.indexOf(studentObj),1);
            // var delete_row = $(this).parent();
            // delete_row.remove();
            deleteFromServer(studentObj);
            updateData();
        });
        table_row.append(tableName, tableCourse, tableGrade, tableOp);
        $('.student-list tbody').append(table_row);
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    student_array = [];
    $('.avgGrade').html('');
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    student_name = $('#studentName');
    student_course = $('#course');
    student_grade = $('#studentGrade');


    $('#add_btn').click(function () {
        addClicked();
    });
    $('#cln_btn').click(function () {
        cancelClicked();
    });
    $('#data_btn').click(function () {
        getData();
    });

    reset();
});

/**
 *  getData - Using the LearningFuze SGT API pull records from the DB using an AJAX call
 *  With the object you get back from the API find the proper data to add to your SGT
 */

function getData() {
    console.log("request to server made");
    // $.ajax({
    //     dataType: 'json',
    //     url: 'http://s-apis.learningfuze.com/sgt/get',
    //     method: 'post',
    //     cache: 'false',
    //     data: {api_key: 'm7iQL1y1fb'},
    //     success: function (response) {
    //         console.log("successful ajax call", response.data);
    //
    //         //  short cut for data info in api
    //         student_array = response.data;
    //
    //         //  call function to update the student list
    //         updateData();
    //     },
    //     //  ajax if there is an error
    //     error: function () {
    //         console.log('AJAX failed on success');
    //     }
    // });
    $.ajax({
        dataType: 'json',
        type: 'post',
        url: 'sgt_get.php',
        success: function (response) {
            console.log(response);
            for (x in response) {
                addStudentToDom(response[x]);
            }
        },
        //  ajax if there is an error
        error: function () {
            console.log('AJAX failed on success');
        }
    });
}

function addToServer(studentObj) {
    // $.ajax({
    //     dataType: 'json',
    //     url: 'http://s-apis.learningfuze.com/sgt/create',
    //     method: 'post',
    //     cache: 'false',
    //     data: {
    //         api_key: 'm7iQL1y1fb',
    //         name: studentObj.name,
    //         course: studentObj.course,
    //         grade: studentObj.grade
    //     },
    //     success: function (result) {
    //         console.log("request to add made", result);
    //         studentObj.id = result.new_id;
    //         console.log(studentObj.id);
    //     },
    //     error: function () {
    //         console.log('AJAX failed on success');
    //     }
    // });
    var dataSent = {
        student_name: studentObj.name,
        class_name: studentObj.course,
        score: studentObj.grade
    };


    $.ajax({
        dataType: 'json',
        type: 'post',
        url: 'sgt_create.php',
        data: dataSent,
        success: function (response) {
            console.log(response);
            if (response.success) {
                $('#show').html(response.message);
            } else {
                $('#show').html("<p style='color: red'>" + response.message + "</p>");
            }
        },
        //  ajax if there is an error
        error: function () {
            console.log('AJAX failed on success');
        }
    });
}

function deleteFromServer(studentObj) {
    $.ajax({
        dataType: 'json',
        url: 'http://s-apis.learningfuze.com/sgt/delete',
        method: 'post',
        cache: 'false',
        data: {api_key: 'm7iQL1y1fb', student_id: studentObj.id},
        success: function (result) {
            console.log("request to delete made", result);
            console.log("deleted id is ", studentObj.id);
        },
        error: function () {
            console.log('AJAX failed on success');
        }
    });
}