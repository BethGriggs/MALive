<script src="lib/handsontable-0.17.0/dist/handsontable.full.js"></script>
<link rel="stylesheet" media="screen" href="lib/handsontable-0.17.0/dist/handsontable.full.css">

<h1>Binary Odds Ratio</h1>
<div id="binary-odds-ratio"></div>
<h1>Binary Risk Ratio</h1>
<div id="binary-risk-ratio"></div>
<h1>Binary Risk Difference</h1>
<div id="binary-risk-difference"></div>
<script>
    var oddsRatioData = [
    ["1", "1", "1", "1", "1", "1", "1", "1"]
  ];

    var oddsRatioDiv = document.getElementById('binary-odds-ratio');
    var oddsRatio = new Handsontable(oddsRatioDiv, {
        data: oddsRatioData,
        minSpareRows: 1,
        colHeaders: ["Study", "E1", "E2", "NE1", "NE2", "Odds Ratio", "CI-", "CI+"],
        columnSorting: true,
        contextMenu: true,
        allowInsertColumn: false,
        allowRemoveColumn: false,
    });

    var riskRatioData = [
    ["1", "1", "1", "1", "1", "1", "1", "1"]
  ];

    var riskRatioDiv = document.getElementById('binary-risk-ratio');
    var riskRatio = new Handsontable(riskRatioDiv, {
        data: riskRatioData,
        minSpareRows: 1,
        colHeaders: ["Study", "E1", "E2", "NE1", "NE2", "Risk Ratio", "CI-", "CI+"],
        columnSorting: true,
        contextMenu: true,
        allowInsertColumn: false,
        allowRemoveColumn: false,
    });

    var riskDifferenceData = [
    ["1", "1", "1", "1", "1", "1", "1", "1"]
  ];

    var riskDifferenceDiv = document.getElementById('binary-risk-difference');
    var riskDifference = new Handsontable(riskDifferenceDiv, {
        data: riskDifferenceData,
        minSpareRows: 1,
        colHeaders: ["Study", "E1", "E2", "NE1", "NE2", "Risk Difference", "CI-", "CI+"],
        columnSorting: true,
        contextMenu: true,
        allowInsertColumn: false,
        allowRemoveColumn: false,
    });
</script>