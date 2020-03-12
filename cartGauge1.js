///////////////////////////////////  G E T  ///////////////////////

var inputCompany = document.getElementById("inputCompany");
var myObj;
var compName;
var spanComp = document.getElementById("spanComp");

async function companyJSON () {
  if (input.value != "") {
    compName = input.value;

    var url = "http://cors-anywhere.herokuapp.com/https://eodhistoricaldata.com/api/fundamentals/" + compName + ".US?api_token=5d039059ec3318.16078074";
    var request = await fetch(url);

    if(request.status == 200) {
      myObj = await request.json();
      console.log(myObj);
      clickEnter();
      recall();
      spanComp.innerHTML = "";
    } else {
      spanComp.innerHTML = compName + "-abbreviation does not exist in data JSON";
      recall();
    }
  } 
  else {
    recall();
  }
}

//////////////////////////////////////////////////////////////////

//////////////////////////////////  enter  ////////////////////////

var input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
 if (event.key === "Enter") {
  document.getElementById("button").click();
 }
});

////////////////////////////////////////////////////////////////


////////////////////////  input value  /////////////////////////

var spanDate = document.getElementById("spanDate");
function clickEnter() {
    var arr = [];
    netIncome = undefined;
    totalAssets = undefined;
    totalRevenue = undefined;
    totalStockholderEquity = undefined;
    var x = input.value;
    if (x != "") {
      for(var key in myObj.Financials.Balance_Sheet.quarterly) {
        arr.push(key);
      }
    
      search1(arr[0], myObj );

    }
    
}

////////////////////////////////////////////////////////////////

var totalAssets, netIncome, totalRevenue, totalCurrentAssets, totalCurrentLiabilities, retainedEarnings, incomeBeforeTax, interestExpense, MarketCapitalization, totalLiab, totalStockholderEquity, variable1, variable2, variable3;

function search1(str, objects) {
 for (var obj in objects) {  
   
  if (str == obj) {

   for (var ob in objects[obj]) {

    if (ob === "totalAssets") {
     totalAssets = objects[obj][ob];
    }
    if (ob === "netIncome") {
     netIncome = objects[obj][ob];
    }
    if (ob === "totalRevenue") {
     totalRevenue = objects[obj][ob];
    }
    if (ob === "totalCurrentAssets") {
     totalCurrentAssets = objects[obj][ob];
    }
    if (ob === "totalCurrentLiabilities") {
     totalCurrentLiabilities = objects[obj][ob];
    }
    if (ob === "retainedEarnings") {
     retainedEarnings = objects[obj][ob];
    }
    if (ob === "incomeBeforeTax") {
     incomeBeforeTax = objects[obj][ob];
    }
    if (ob === "interestExpense") {
     interestExpense = objects[obj][ob];
    }
    if (ob === "MarketCapitalization") {
     MarketCapitalization = objects[obj][ob];
    }
    if (ob === "totalLiab") {
     totalLiab = objects[obj][ob];
    }
    if (ob === "totalStockholderEquity") {
     totalStockholderEquity = objects[obj][ob];
    }
    if (isNaN(netIncome,  totalAssets, totalStockholderEquity, totalRevenue) == false) {
      variable1 = ((netIncome / 1000000) / (totalAssets / 1000000)) * 100;
      variable2 = ((netIncome / 1000000) / (totalStockholderEquity / 1000000)) * 100;
      variable3 = ((totalRevenue / 100000000) / (totalAssets / 1000000)) * 100;
    }   
   }

  }

  if (typeof objects[obj] === "object") {
   search1(str, objects[obj])
  }
 
 }

}


function recall() {
 d3.select("svg").remove();
 d3.select("svg").remove();
 d3.select("svg").remove();
 start();
}


// data which need to be fetched

var name = "xxx";

var gaugeMinValue;
var gaugeMaxValue;
var value;

// données à calculer 

////////////////////////


function start() {

 for (var i = 1; i <= 3; i++) {


  if (i == 1) {
   gaugeMinValue = -50;
   gaugeMaxValue = 50;
   value = gaugeMinValue;
   if (variable1 != undefined && isNaN(variable1) == false) {
    value = variable1;
   }
  };
  if (i == 2) {
   gaugeMinValue = -50;
   gaugeMaxValue = 50;
   value = gaugeMinValue;
   if (variable2 != undefined && isNaN(variable2) == false) {
    value = variable2;
   }
  };
  if (i == 3) {
   gaugeMinValue = -2;
   gaugeMaxValue = 2;
   value = gaugeMinValue;
   if (variable3 != undefined && isNaN(variable3) == false) {
    value = variable3;
   }
  };

  var needleClient;
  var percentValue = (value - gaugeMinValue) / (gaugeMaxValue - gaugeMinValue);
  var percentValue1 = ((value - gaugeMinValue) / (gaugeMaxValue - gaugeMinValue)) * 100;


  (function() {

   var barWidth, chart, chartInset, degToRad, repaintGauge,
    height, margin, numSections, padRad, percToDeg, percToRad,
    percent, radius, sectionIndx, svg, totalPercent, width;



   percent = percentValue;

   numSections = 1;
   sectionPerc = 1 / numSections / 2;
   padRad = 0.025;
   chartInset = 10;

   // Orientation of gauge:
   totalPercent = .75;


   el = d3.select('.chart-gauge' + i);

   margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 20
   };

   width = el[0][0].offsetWidth - margin.left - margin.right;
   height = width;
   radius = Math.min(width, height) / 2;
   barWidth = 40 * width / 300;

   //Utility methods 

   percToDeg = function(perc) {
    return perc * 360;
   };

   percToRad = function(perc) {
    return degToRad(percToDeg(perc));
   };

   degToRad = function(deg) {
    return deg * Math.PI / 180;
   };

   // Create SVG element
   svg = el.append('svg').attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom);

   // Add layer for the panel
   chart = svg.append('g').attr('transform', "translate(" + ((width + margin.left) / 2) + ", " + ((height + margin.top) / 2) + ")");


   chart.append('path').attr('class', "arc chart-first");
   chart.append('path').attr('class', "arc chart-second");
   chart.append('path').attr('class', "arc chart-third");


   arc3 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
   arc2 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)
   arc1 = d3.svg.arc().outerRadius(radius - chartInset).innerRadius(radius - chartInset - barWidth)

   repaintGauge = function() {
    perc = 0.5;
    var next_start = totalPercent;
    arcStartRad = percToRad(next_start);
    arcEndRad = arcStartRad + percToRad(perc / 3);
    next_start += perc / 3;


    arc1.startAngle(arcStartRad).endAngle(arcEndRad);

    arcStartRad = percToRad(next_start);
    arcEndRad = arcStartRad + percToRad(perc / 3);
    next_start += perc / 3;

    arc2.startAngle(arcStartRad + padRad).endAngle(arcEndRad);

    arcStartRad = percToRad(next_start);
    arcEndRad = arcStartRad + percToRad(perc / 3);

    arc3.startAngle(arcStartRad + padRad).endAngle(arcEndRad);

    chart.select(".chart-first").attr('d', arc1);
    chart.select(".chart-second").attr('d', arc2);
    chart.select(".chart-third").attr('d', arc3);


   }
   /////////

   var dataset = [{
    metric: name,
    value: percentValue1
   }]

   var texts = svg.selectAll("text")
    .data(dataset)
    .enter();

   var trX = 90 - 85 * Math.cos(percToRad(percent / 2));
   var trY = 90 - 75 * Math.sin(percToRad(percent / 2));
   // (180, 195) are the coordinates of the center of the gauge.

   displayValue = function() {
    texts.append("text")
     .text(function() {
      return Math.round(dataset[0].value) + "%";
     })
     .attr('id', "Value")
     .attr('transform', "translate(" + trX + ", " + trY + ")")
     .attr("font-size", 18)
     .style("fill", '#000000');
   }



   texts.append("text")
    .text(function() {
     return gaugeMinValue;
    })
    .attr('id', 'scale0')
    .attr('transform', "translate(" + ((width + margin.left) / 100) + ", " + ((height + margin.top) / 2) + ")")
    .attr("font-size", 15)
    .style("fill", "#000000");


   texts.append("text")
    .text(function() {
     return gaugeMaxValue;
    })
    .attr('id', 'scale20')
    .attr('transform', "translate(" + ((width + margin.left) / 1.03) + ", " + ((height + margin.top) / 2) + ")")
    .attr("font-size", 15)
    .style("fill", "#000000");

   var Needle = (function() {

    //Helper function that returns the `d` value for moving the needle
    var recalcPointerPos = function(perc) {
     var centerX, centerY, leftX, leftY, rightX, rightY, thetaRad, topX, topY;
     thetaRad = percToRad(perc / 2);
     centerX = 0;
     centerY = 0;
     topX = centerX - this.len * Math.cos(thetaRad);
     topY = centerY - this.len * Math.sin(thetaRad);
     leftX = centerX - this.radius * Math.cos(thetaRad - Math.PI / 2);
     leftY = centerY - this.radius * Math.sin(thetaRad - Math.PI / 2);
     rightX = centerX - this.radius * Math.cos(thetaRad + Math.PI / 2);
     rightY = centerY - this.radius * Math.sin(thetaRad + Math.PI / 2);


     return "M " + leftX + " " + leftY + " L " + topX + " " + topY + " L " + rightX + " " + rightY;

    };

    function Needle(el) {
     this.el = el;
     this.len = width / 2.5;
     this.radius = this.len / 8;
    }

    Needle.prototype.render = function() {
     this.el.append('circle').attr('class', 'needle-center').attr('cx', 0).attr('cy', 0).attr('r', this.radius);

     return this.el.append('path').attr('class', 'needle').attr('id', 'client-needle').attr('d', recalcPointerPos.call(this, 0));


    };

    Needle.prototype.moveTo = function(perc) {
     var self,
      oldValue = this.perc || 0;

     this.perc = perc;
     self = this;

     // Reset pointer position
     this.el.transition().delay(100).ease('quad').duration(200).select('.needle').tween('reset-progress', function() {
      return function(percentOfPercent) {
       var progress = (1 - percentOfPercent) * oldValue;




       repaintGauge(progress);
       return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
      };
     });

     this.el.transition().delay(300).ease('bounce').duration(1500).select('.needle').tween('progress', function() {
      return function(percentOfPercent) {
       var progress = percentOfPercent * perc;

       repaintGauge(progress);
       return d3.select(this).attr('d', recalcPointerPos.call(self, progress));
      };
     });

    };


    return Needle;

   })();



   needle = new Needle(chart);
   needle.render();
   needle.moveTo(percent);

   setTimeout(displayValue, 1350);



  })();

 }

 variable1 = undefined;
 variable2 = undefined;
 variable3 = undefined;

};


start();