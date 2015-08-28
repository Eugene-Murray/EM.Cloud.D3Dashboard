'use strict';



angular.module('d3dashboard')
    .controller('MetricsController', function($scope) {

$( document ).ready(function() {
    
       var w = 200;
var h = 100;
var padding = 2;
var dataset = [50, 60, 25, 20, 25,100,50, 30,22,24];

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
    .attr("x", function(d,i){
      return (i * (w / dataset.length));
    })
    .attr("y", function(d){
      return h - d;
    })
    .attr("width", w / dataset.length - padding)
    .attr("height", function(d){
      return d;
    })
    .attr("fill", function(d, i){
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
        return i * (w / dataset.length) + 2;  // +5
   })
   .attr("y", function(d) {
        return h - (d - 10);
        
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "10px")
   .attr("fill", "white");
       

});










        this.demo1Data = [34, 43, 43, 35, 44, 32, 44, 52];
        this.demo1Options = {
            type: 'line',
            width: '100%',
            height: '60',
            lineColor: '#1ab394',
            fillColor: "#ffffff"
        };

        this.demo2Data = [24, 43, 43, 55, 44, 62, 44, 72];
        this.demo2Options = {
            type: 'line',
            width: '100%',
            height: '60',
            lineColor: '#1ab394',
            fillColor: "#ffffff"
        };

        this.demo3Data = [74, 43, 23, 55, 54, 32, 24, 12];
        this.demo3Options = {
            type: 'line',
            width: '100%',
            height: '60',
            lineColor: '#ed5565',
            fillColor: "#ffffff"
        };

        this.demo4Data = [24, 43, 33, 55, 64, 72, 44, 22];
        this.demo4Options = {
            type: 'line',
            width: '100%',
            height: '60',
            lineColor: '#ed5565',
            fillColor: "#ffffff"
        };

        this.demo5Data = [1, 4];
        this.demo5Options = {
            type: 'pie',
            height: '140',
            sliceColors: ['#1ab394', '#F5F5F5']
        };

        this.demo6Data = [5, 3];
        this.demo6Options = {
            type: 'pie',
            height: '140',
            sliceColors: ['#1ab394', '#F5F5F5']
        };

        this.demo7Data = [2, 2];
        this.demo7Options = {
            type: 'pie',
            height: '140',
            sliceColors: ['#ed5565', '#F5F5F5']
        };

        this.demo8Data = [2, 3];
        this.demo8Options = {
            type: 'pie',
            height: '140',
            sliceColors: ['#ed5565', '#F5F5F5']
        };

    });