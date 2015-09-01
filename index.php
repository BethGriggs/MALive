
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
<div class="push"> 
<?php
   include('inc/header.php'); ?>
<h1>Home</h1>
    <button id="test">Click me</button>
<?php include('inc/footer.php'); ?>

    <a href="#menu" class="menu-link">&#9776;</a>
 <nav id="menu" class="panel" role="navigation">
    <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">The Ballad of El Goodo</a></li>
        <li><a href="#">Thirteen</a></li>
        <li><a href="#">September Gurls</a></li>
        <li><a href="#">What's Going Ahn</a></li>
    </ul>
</nav>
    </div>
</body>
<script src="vendor/components/jquery/jquery.js"></script>
<script src="js/test.js"></script>
    <script src="js/bigSlide.js"></script>

<script>
    $(document).ready(function() {
        $('.menu-link').bigSlide();
    });
    
</script>
</html>