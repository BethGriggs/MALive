<!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>

<body>
    <div class="push">
        <?php
   include('inc/header.php'); ?>
            <div id="container" class="wrap push">
                <h1>Home</h1>
                <button id="test">Click me</button>
            </div>
        
            <?php include('inc/footer.php'); ?>
           <?php include('inc/navigation.php'); ?>
 </div>
</body>
<script src="vendor/components/jquery/jquery.js"></script>
<script src="js/test.js"></script>
<script src="js/bigSlide.js"></script>

<script>
    $(document).ready(function () {
        $('.menu-link').bigSlide();
    });
</script>

</html>