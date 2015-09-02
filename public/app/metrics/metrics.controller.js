'use strict';



angular.module('d3dashboard')
    .controller('MetricsController', function($scope) {

        $(document).ready(function() {
            this.chart1();
            this.chart2();
        });

        var chart1 = function() {


    var w = 200;
    var h = 100;
    var padding = 2;
    var dataset = [50, 60, 25, 20, 25, 100, 50, 30, 22, 24];

    // Create SVG
    var svg = d3.select("#graph")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    // Append Rectangle            
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return (i * (w / dataset.length));
        })
        .attr("y", function(d) {
            return h - d;
        })
        .attr("width", w / dataset.length - padding)
        .attr("height", function(d) {
            return d;
        })
        .attr("fill", function(d, i) {
            return "rgb(0, 0, " + (d * 10) + ")";
        });

    // Append label text    
    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) {
            return i * (w / dataset.length) + 2; // +5
        })
        .attr("y", function(d) {
            return h - (d - 10);

        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "white");

};

        var chart2 = function() { 
            var myStyles = [
  { width: 200,
    color: '#A57706'},
  { width: 230,
    color: '#BD3613'},
  { width: 220,
    color: '#D11C24'},
  { width: 290,
    color: '#C61C6F'},
  { width: 236,
    color: '#595AB7'},
  { width: 230,
    color: '#2176C7'}
];

d3.selectAll('.item')
  .data(myStyles)
  .style({
    'color': 'white',
    'background' : function(d) {
      return d.color;
    },
    width : function(d) {
      return d.width + 'px';
    } 
  })
        };

    });

