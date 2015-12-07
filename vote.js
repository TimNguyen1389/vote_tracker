// Kitten object constructor
function Kitten (name, age, color, photo, vote) {
  this.name = name;
  this.age = age;
  this.color = color;
  this.photo = photo;
  this.vote = vote;
}

// visitor object
var visitor = {
  id: 0,
  totalVote: 0,
  kittenVoted: []
}
// kitten objects
var k1 = new Kitten('kitten1', '4 months', 'brown tiger', 'images/kitten1.jpg', 0);
var k2 = new Kitten('kitten2', '2 weeks', 'black', 'images/kitten2.jpg', 0);
var k3 = new Kitten('kitten3', '2 months', 'orange tiger', 'images/kitten3.jpg', 0);
var k4 = new Kitten('kitten4', '2 months', 'brown tiger', 'images/kitten4.jpg', 0);
var k5 = new Kitten('kitten5', '2 months', 'gray tiger', 'images/kitten5.jpg', 0);
var k6 = new Kitten('kitten6', '1 month', 'mixed color', 'images/kitten6.jpg', 0);
var k7 = new Kitten('kitten7', '2 months', 'white', 'images/kitten7.jpg', 0);
var k8 = new Kitten('kitten8', '4 months', 'black tiger', 'images/kitten8.jpg', 0);
var k9 = new Kitten('kitten9', '2 months', 'brown tiger', 'images/kitten9.jpg', 0);
var k10 = new Kitten('kitten10', '5 months', 'orange tiger', 'images/kitten10.jpg', 0);
var k11 = new Kitten('kitten11', '1 month', 'orange tiger', 'images/kitten11.jpg', 0);
var k12 = new Kitten('kitten12', '5 months', 'orange tiger', 'images/kitten12.jpg', 0);
var k13 = new Kitten('kitten13', '4 months', 'brown tiger', 'images/kitten13.jpg', 0);
var k14 = new Kitten('kitten14', '2 months', 'brown tiger', 'images/kitten14.jpg', 0);
// array of kitten objects
var kittenArr = [];
kittenArr.push(k1, k2, k3, k4, k5, k6, k7, k8, k9, k10, k11, k12, k13, k14);

// JQuery variables
var $heading = $('h3');
var $firstImg = $('#firstImg');
var $secondImg = $('#secondImg');
var $firstImgChart = $('#firstImgChart');
var $secondImgChart = $('#secondImgChart');
var $voteAgain = $('#voteAgain');
var $btnContainer = $('#btnContainer');
var randomImg1, randomImg2;
var $firstImgCap = $('#firstImgCap');
var $secondImgCap = $('#secondImgCap');

// display 2 random kitten images
function ranKittens(){
  randomImg1 = 'kitten' + (Math.floor(Math.random() * (14 - 1 + 1)) + 1);
  randomImg2 = 'kitten' + (Math.floor(Math.random() * (14 - 1 + 1)) + 1);
  // make sure random images are not the same
  while (randomImg1 === randomImg2) {
    randomImg2 = 'kitten' + (Math.floor(Math.random() * (14 - 1 + 1)) + 1);
    }

  $firstImg.show();
  $secondImg.show();
  $firstImg.removeClass('highlight');
  $secondImg.removeClass('highlight');
  $voteAgain.text('');
  $firstImg.attr({src: 'images/' + randomImg1 + '.jpg', width: 200, height: 200});
  $secondImg.attr({src: 'images/' + randomImg2 + '.jpg', width: 200, height: 200});
}
ranKittens();
// add vote to
$firstImg.on('click', function(){
  $firstImg.addClass('highlight');
  $secondImg.hide();
  localStorage.setItem(randomImg1, 1);
  kittenArr.forEach(function(kitten) {
    if(randomImg1 === kitten.name) {
      kitten.vote += 1;
    }
  });
  renderChart();
  $heading.text('You voted for ' + randomImg1 + '! Please vote on the next set of kittens by clicking the next button!');
  $('#nextBtn').remove();
  $btnContainer.append('<button id="nextBtn">next</button>');
  $('#nextBtn').on('click', ranKittens);
});

$secondImg.on('click', function() {
  $secondImg.addClass('highlight');
  $firstImg.hide();
  localStorage.setItem(randomImg2, 1);
  kittenArr.forEach(function(kitten) {
    if(randomImg2 === kitten.name) {
      kitten.vote += 1;
    }
  });
  renderChart();
  $heading.text('You voted for ' + randomImg2 + '! Please vote on the next set of kittens by clicking the next button!');
  $('#nextBtn').remove();
  $btnContainer.append('<button id="nextBtn">next</button>');
  $('#nextBtn').on('click', ranKittens);
});

var $newCanvas = $('<canvas>');
var $kitChart = $('#kitChart');

// render bar chart with ktten vote data
function renderChart() {
  $kitChart.remove('canvas');
  $kitChart.append($newCanvas);
  var $canvas = $('canvas').eq(0).get(0);
  var ctx = $canvas.getContext("2d");

  var data = {
      labels: ['number of votes'],
      datasets: []
      };

  var Dataset = function(label, fillColor, strokeColor, highlightFill, highlightStroke, data) {
    this.label = label;
    this.fillColor = fillColor;
    this.strokeColor = strokeColor;
    this.highlightFill = highlightFill;
    this.highlightStroke = highlightStroke;
    this.data = [data];
    };

  var colors = ["#046380", "#a7a37e", "#A52A2A", "#DEB887", "#5F9EA0",
                "#7FFF00", "#FCF744", "#FF7F50", "#6495ED", "#DC143C"];

  kittenArr.forEach(function(kitten){
    if(randomImg1 === kitten.name) {
      var color = colors[0];
      var newDataSet = new Dataset(kitten.name, color, color, color, color, kitten.vote);
      data.datasets.push(newDataSet);
    }

    if(randomImg2 === kitten.name) {
      var color = colors[1];
      var newDataSet = new Dataset(kitten.name, color, color, color, color, kitten.vote);
      data.datasets.push(newDataSet);
    }
  });

  $firstImgChart.attr({src: 'images/' + data.datasets[0].label + '.jpg', width: 100, height: 100});
  $firstImgCap.text(data.datasets[0].label);
  $secondImgCap.text(data.datasets[1].label);
  $secondImgChart.attr({src: 'images/' + data.datasets[1].label + '.jpg', width: 100, height: 100});

  var options = {
    legendTemplate : '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; '
      + 'i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].'
      + 'fillColor%>\"><%if(datasets[i].label){%><%=datasets[i].label%><%}%></span></li><%}%></ul>',
    responsive: true,
    multiTooltipTemplate: function(data) {
      return data.datasetLabel
    }
  };

  var barChart = new Chart(ctx).Bar(data, options);
  var legend = barChart.generateLegend();

  $('#legend').html(legend);

}
