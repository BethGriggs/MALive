<script src="lib/handsontable-0.17.0/dist/handsontable.full.js"></script>
<link rel="stylesheet" media="screen" href="lib/handsontable-0.17.0/dist/handsontable.full.css">
 
<h1>Continuous (Hedges g)</h1>

<div id="continuous-hedges-g"></div>
<script>
  var data = [
    ["Study", "N1", "N2", "M1", "M2", "SD1", "SD2", "MeanDiff", "CI-", "CI+"]
  ];

  var container = document.getElementById('continuous-hedges-g');
  var meanDiff = new Handsontable(container,
    {
      data: data,
      minSpareRows: 1,
      colHeaders: ["Study", "N1", "N2", "M1", "M2", "SD1", "SD2", "MeanDiff", "CI-", "CI+"],
      columnSorting: true,
      contextMenu: true,
    });
   
</script>
