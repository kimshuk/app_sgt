/**
 * Define all global variables here
 */
/**
 * student_array - global array to hold student objects
 * @type {Array}
 */
var student_array = [];
/**
 * inputIds - id's of the elements that are used to add students
 * @type {string[]}
 */

/**
 * addClicked - Event Handler when user clicks the add button
 */
function addClicked () {
    var name = $('#studentName').val();
    var course = $('#course').val();
    var grade = $('#studentGrade').val();
    addStudent(name, course, grade);
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
function addStudent(name, course, grade) {
    var studentObj = {
        name : name,
        course : course,
        grade : grade
    };
    student_array.push(studentObj);
    addStudentToDom(studentObj);
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
    var avg = calculateAverage();
    $('.avgGrade').html(avg);
    updateStudentList();
}
/**
 * updateStudentList - loops through global student array and appends each objects data into the student-list-container > list-body
 */
function updateStudentList() {
    for (var i=0; i < student_array.length; i++) {
        student_array[i]
    }
}
/**
 * addStudentToDom - take in a student object, create html elements from the values and then append the elements
 * into the .student_list tbody
 * @param studentObj
 */
function addStudentToDom(student) {
        var table_row = $('<tr>');
        var tableName = $('<td>').text(student.name);
        var tableCourse = $('<td>').text(student.course);
        var tableGrade = $('<td>').text(student.grade);
        var tableOp = $('<button>').addClass('btn btn-danger btn-sm').html('delete');
        table_row.append(tableName, tableCourse, tableGrade, tableOp);
        $('.student-list tbody').append(table_row);
}
/**
 * reset - resets the application to initial state. Global variables reset, DOM get reset to initial load state
 */
function reset() {
    student_array = [];
}

/**
 * Listen for the document to load and reset the data to the initial state
 */
$(document).ready(function () {
    $('#add_btn').click(function () {
        addClicked();
    });
    $('#cln_btn').click(function () {
        cancelClicked();
    })
});