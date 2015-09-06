
// Test jQuery
$("#test").click(function () {
    alert("JQ works");
});

$('#continuous').click(function () {
    $('#container').load("inc/continuous.php")
});

$('#binary').click(function () {
    $('#container').load("inc/binary.php")
});