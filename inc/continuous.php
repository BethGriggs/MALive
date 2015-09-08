<script src="lib/handsontable-0.17.0/dist/handsontable.full.js"></script>
<link rel="stylesheet" media="screen" href="lib/handsontable-0.17.0/dist/handsontable.full.css">
 
<h1>Continuous (Hedges g)</h1>

<div id="continuous-hedges-g"></div>
<h1>Continuous R</h1>
<div id="continuous-r"></div>
<h1>Continuous Mean Difference</h1>
<div id="continuous-mean-difference"></div>

<script>
  var hedgesdata = [
    ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1"]
  ];

  var hedgesg = document.getElementById('continuous-hedges-g');
  var meanDiff = new Handsontable(hedgesg,
    {
      data: hedgesdata,
      minSpareRows: 1,
      colHeaders: ["Study", "N1", "N2", "M1", "M2", "SD1", "SD2", "Hedges g", "CI-", "CI+"],
      columnSorting: true,
      contextMenu: true,
      allowInsertColumn: false,
    });
   
      var rdata = [
    ["1", "1", "1","1","1","1"]
  ];

  var r = document.getElementById('continuous-r');
  var meanDiff = new Handsontable(r,
    {
      data: rdata,
      minSpareRows: 1,
      colHeaders: ["Study", "Size", "Correlation", "CI-", "CI+"],
      columnSorting: true,
      contextMenu: true,
    });
    
       
      var meandiffdata = [
    ["1", "1", "1","1","1","1","1","1", "1"]
  ];

  var r = document.getElementById('continuous-mean-difference');
  var meanDiff = new Handsontable(r,
    {
      data: meandiffdata,
      minSpareRows: 1,
      colHeaders: ["Study", "N1", "N2", "M1", "SD1", "SD2", "Mean Difference", "CI-", "CI+"],
      columnSorting: true,
      contextMenu: true,
    });
   
</script>
