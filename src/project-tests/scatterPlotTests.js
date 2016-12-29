import $ from 'jquery';
import each from 'jquery';

export default function createScatterPlotTests() {
  describe('#ScatterPlotTests', function() {
    const MIN_YEAR = 1990;
    const MAX_YEAR = 2020;
    const MIN_MINUTES = 36;
    const MAX_MINUTES = 40;
    
    describe('#Content', function() {
      it('1. I can see a title element that has a corresponding id="title".', function() {
        FCC_Global.assert.isNotNull(document.getElementById('title'), 'Could not find element with id="title" ');
      });
      
      it('2. I can see an x-axis that has a corresponding id="x-axis".', function() {
        FCC_Global.assert.isNotNull(document.getElementById('x-axis'), 'There should be an element with id="x-axis" ');
        FCC_Global.assert.isAbove(document.querySelectorAll('#x-axis g').length, 0, 'x-axis should be a <g> SVG element ');
      });
      
      it('3. I can see a y-axis that has a corresponding id="y-axis".', function() {
        FCC_Global.assert.isNotNull(document.getElementById('y-axis'), 'There should be an element with id="y-axis" ');  
        FCC_Global.assert.isAbove(document.querySelectorAll('g#y-axis').length, 0, 'y-axis should be a <g> SVG element' );
      });
      
      it('4. I can see dots, that each have a class of "dot", which represent the data being plotted.', function() {
        FCC_Global.assert.isAbove(document.querySelectorAll('.dot').length, 0, 'Could not find any circles with class="dot" ');
      });
        
      it('5. Each dot should have the properties "data-xvalue" and "data-yvalue" containing their corresponding x and y values.', function() {
        const dots = document.getElementsByClassName('dot');
        for(var i=0; i<dots.length; i++){
          var dot = dots[i];
          FCC_Global.assert.isNotNull(dot.getAttribute("data-xvalue"), 'Could not find property "data-xvalue" in dot ')
          FCC_Global.assert.isNotNull(dot.getAttribute("data-yvalue"), 'Could not find property "data-yvalue" in dot ')
        }  
      });
      
      it('6. The data-xvalue and data-yvalue of each dot should be within the range of the actual data.', function() {
        const MIN_X_VALUE = MIN_YEAR;
        const MAX_X_VALUE = MAX_YEAR;
        $(".dot").each(function(){
          
          FCC_Global.assert.isAtLeast($(this).context.getAttribute("data-xvalue"), MIN_X_VALUE, "The data-xvalue of a dot is below the range of the actual data " )
          FCC_Global.assert.isAtMost($(this).context.getAttribute("data-xvalue"), MAX_X_VALUE, "The data-xvalue of a dot is above the range of the actual data " )
          
          //compare just the minutes for a good approximation
          var yDate = new Date($(this).context.getAttribute("data-yvalue"));
          FCC_Global.assert.isAtLeast(yDate.getMinutes(), MIN_MINUTES, "The minutes data-yvalue of a dot is below the range of the actual minutes data " )
          FCC_Global.assert.isAtMost(yDate.getMinutes(), MAX_MINUTES, "The minutes data-yvalue of a dot is above the range of the actual minutes data " ) 
        });
      });
      
      it('7. The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.', function() {        
        const dotsCollection = document.getElementsByClassName('dot');
        //convert to array    
        const dots = [].slice.call(dotsCollection);
         
        //sort the dots based on xvalue in ascending order
        const sortedDots = dots.sort(function(a,b){
          return a.getAttribute("data-xvalue")-b.getAttribute("data-xvalue")
        });
        
        //check to see if the x locations of the new sorted array are in ascending order
        for(var i = 0; i < sortedDots.length-1; ++i) {
          FCC_Global.assert.isAtMost(+sortedDots[i].cx.baseVal.value,  +sortedDots[i+1].cx.baseVal.value, "x values don't line up with x locations ");
        } 
      });
       
      it('8. The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.', function() {
        const dotsCollection = document.getElementsByClassName('dot');
        //convert to array    
        const dots = [].slice.call(dotsCollection);
         
        //sort the dots based on yvalue in ascending order
        const sortedDots = dots.sort(function(a,b){
          return new Date(a.getAttribute("data-yvalue")) - new Date(b.getAttribute("data-yvalue"));
        });
          
        //check to see if the y locations of the new sorted array are in ascending order
        for(var i = 0; i < sortedDots.length-1; ++i) {
          FCC_Global.assert.isAtMost(+sortedDots[i].cy.baseVal.value,  +sortedDots[i+1].cy.baseVal.value, "y values don't line up with y locations ");
        } 
      });
      
      it('9. I can see multiple tick labels on the y-axis with "%M:%S" time  format.', function() {
        var yAxisTickLabels = $("#y-axis .tick")
        FCC_Global.assert.isAbove(yAxisTickLabels.length, 0, "Could not find tick labels on the y axis ")
        yAxisTickLabels.each(function(){
          //match "%M:%S" d3 time format
          FCC_Global.assert.match($(this).context.textContent, /[0-5][0-9]:[0-5][0-9]/, 'Y-axis tick labels aren\'t in the "%M:%S" d3 time format ')
        });
      });
      
      
      it('10. I can see multiple tick labels on the x-axis that show the year.', function() {
        var xAxisTickLabels = $("#x-axis .tick")
        FCC_Global.assert.isAbove(xAxisTickLabels.length, 0, "Could not find tick labels on the x axis ")
        xAxisTickLabels.each(function(){
          //match check if this is a year
          FCC_Global.assert.match($(this).context.textContent, /[1-2][0-9][0-9][0-9]/, 'X-axis tick labels do not show the year ')
        });
      });
       
      it('11. I can see that the range of the x-axis labels are within the range of the actual x-axis data.', function() {
        var xAxisLabels = $("#x-axis .tick")
        const MIN_YEAR = 1994;
        const MAX_YEAR = 2016;
        xAxisLabels.each(function(){
          FCC_Global.assert.isAtLeast($(this).context.textContent, MIN_YEAR, "x axis labels are below the range of the actual data " )
          FCC_Global.assert.isAtMost($(this).context.textContent, MAX_YEAR, "x axis labels are above the range of the actual data " )
        });
      });
     
      it('12. I can see that the range of the y-axis labels are within the range of the actual y-axis data.', function() {
        var yAxisLabels = $("#y-axis .tick")
        const MIN_TIME = new Date(0, 0, 0, 0, MIN_MINUTES, 0, 0);
        const MAX_TIME = new Date(0, 0, 0, 0, MAX_MINUTES, 0, 0);
        yAxisLabels.each(function(){
          var timeArr = $(this).context.textContent.split(":")
          var mins = timeArr[0];
          var secs = timeArr[1];
          var date = new Date(0, 0, 0, 0, mins, secs, 0);
          FCC_Global.assert.isAtLeast(date, MIN_TIME, "y axis labels are below the range of the actual data " )
          FCC_Global.assert.isAtMost(date, MAX_TIME, "y axis labels are above the range of the actual data " )  
        });       
      });
          
      it('13. I can see a legend that has id="legend".', function() {
        FCC_Global.assert.isNotNull(document.getElementById('legend'), 'There should be an element with id="legend"'); 
      });
       
      it('14. I can mouse over any dot and see a tooltip with corresponding id="tooltip" which displays more information about the data.', function() {
        
        //This doesn't work if tooltip uses CSS3 transitions (to fade in and out).  Currently only checks for opacity in the style property of the tooltip
        //TODO check for tooltip visibility in multiple ways:  opacity prop, style prop...
        function testTooltip(tooltip, elem){
          elem.dispatchEvent(new MouseEvent('mouseover')) 
          FCC_Global.assert.notStrictEqual(tooltip.style.opacity, "0", 'The tooltip should be visible when mouse is on a dot ')

          // move mouse off of cell
          elem.dispatchEvent(new MouseEvent('mouseout'));
          FCC_Global.assert.strictEqual(tooltip.style.opacity, "0", 'On mouseout, the tooltip should return to being invisible ')
        } 
        
        const tooltip = document.getElementById('tooltip');
        FCC_Global.assert.isNotNull(document.getElementById('tooltip'), 'There should be an element with id="tooltip" ')
     
        //place mouse initially on an element that doesn't trigger the tooltip
        const title = document.getElementById('title');      
        title.dispatchEvent(new MouseEvent('mouseover'));     

        FCC_Global.assert.strictEqual(tooltip.style.opacity, "0", 'The tooltip should start out as invisible ');
        
        const dots = document.querySelectorAll('.dot');
        FCC_Global.assert.isAbove(dots.length, 0, 'Could not find any dots in the scatter plot ');   
        
        //test tool tip on first and last dots
        testTooltip(tooltip, dots[0]);  
        testTooltip(tooltip, dots[dots.length-1]);  
      });
    });

  }); 
}