$("#test").click(function () {
    alert("JQ works");
});


$('#continuous').click(function () {
    alert("event list");
    $('#container').load("inc/continuous.php")
});