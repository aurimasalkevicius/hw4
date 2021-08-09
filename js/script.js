/*
File: scripts.js
GUI Assignment 4: PART 1: Validation Plugin 

Aurimas Alkevicius, UMass Lowell Computer Science, aurimas_alkevicius@cs.uml.edu
Copyright (c) 2021 by Alkevicius. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by AA on August 9, 2021 

Credit to:  Code Cast https://www.youtube.com/watch?v=zQUbb2ZtdIc

*/

$(function() {

    // style input fields and error messages if any
    $.validator.setDefaults({
        errorClass: 'help-block',
        highlight: function(element) {
            $(element)
                .closest('.form-group')
                .addClass('has-error');
        },
        unhighlight: function(element) {
            $(element)
                .closest('.form-group')
                .removeClass('has-error');
        },

    });

    // check if input range is valid
    $.validator.addMethod('isInRange', function(value, element) {
        return this.optional(element) ||
            value >= -50 &&
            value <= 50;
    }, 'An integer in <em>Multiplier start</em> field must be within -50 and 50.')

    // check if input is a fraction 
    $.validator.addMethod('isFraction', function(value, element) {
        return this.optional(element) ||
            value % 1 == 0;
    }, 'A value in <em>Multiplier start</em> field must an integer.')

    // validate input form
    $("#inputForm").validate({
        rules: {
            multiplierStart: {
                required: true,
                isInRange: true,
                isFraction: true
            },
            multiplierEnd: {
                required: true,
                isInRange: true,
                isFraction: true
            },
            multiplicandStart: {
                required: true,
                isInRange: true,
                isFraction: true
            },
            multiplicandEnd: {
                required: true,
                isInRange: true,
                isFraction: true
            },
        },
        // display custom error messages
        messages: {
            multiplierStart: {
                required: 'Please enter <em>Multiplier starting range</em>.'
            },
            multiplierEnd: {
                required: 'Please enter <em>Multiplier ending range</em>.'
            },
            multiplicandStart: {
                required: 'Please enter <em>Multiplicand starting range</em>.'
            },
            multiplicandEnd: {
                required: 'Please enter <em>Mltiplicand ending range</em>.'
            }
        },
        // generate the table if no errors
        submitHandler: function() {
            generateTable();
            return false;
        }
    })
});

// generate table - from homework 3

function generateTable() {
    var dynamicTable = '',
        multiplier, multiplicand, alternatingColumn,
        alternatingRow = 1; //alternatingColumn and alternatingRow are used to alternate table cell style 
    var userInput = document.getElementsByClassName("form-control");

    // get user input values and parse them to integers
    var multiplierStart = parseInt(document.getElementsByClassName("form-control")[0].value);
    var multiplierEnd = parseInt(userInput[1].value);
    var multiplicandStart = parseInt(userInput[2].value);
    var multiplicandEnd = parseInt(userInput[3].value);


    // swap values if user input is not in acending order
    if (isInDecendingOrder(multiplierStart, multiplierEnd)) {
        [multiplierStart, multiplierEnd] = [multiplierEnd, multiplierStart];
    }

    if (isInDecendingOrder(multiplicandStart, multiplicandEnd)) {
        [multiplicandStart, multiplicandEnd] = [multiplicandEnd, multiplicandStart];
    }

    // adding dynamic table styling
    document.getElementById("dynamicTable").classList.add("generated-table-style");

    // start building the table
    // start building the first row (aka table header)
    // generate the blank cell for the top-left corner of the table 
    dynamicTable = '<table>' + '<tr>' + "<td class='table-header'></td>";

    // continue building first row by adding multiplier from the range chosen by the user
    for (multiplier = multiplierStart; multiplier <= multiplierEnd; multiplier++) {
        // build the first row with alternating cell styles
        dynamicTable += "<td class='table-header bold'>" + multiplier + "</td>";
        alternatingRow++;
    }

    // finish building the first row
    dynamicTable += '</tr>';
    alternatingRow = 0;

    // start building the rest of the table
    for (multiplicand = multiplicandStart; multiplicand <= multiplicandEnd; multiplicand++) {

        // start building the row of this loop
        dynamicTable += '<tr>';

        // each consecutive row starts with multiplicand from user input with alternating style
        dynamicTable += "<td class='table-header  bold'>" + multiplicand + "</td>";
        alternatingColumn = alternatingRow + 1

        // continue building row with alternating table cell styles
        for (multiplier = multiplierStart; multiplier <= multiplierEnd; multiplier++) {
            dynamicTable += ((alternatingColumn % 2 == 0) ? "<td class='even-cell'>" : "<td class='odd-cell'>") + (multiplier * multiplicand) + "</td>";
            alternatingColumn++;
        }

        // finish building row of this loop
        dynamicTable += '</tr>';
        alternatingRow++
    }

    // finish building the table and display it
    document.getElementById('dynamicTable').innerHTML = (dynamicTable += '</table>');
}

// helper function
function isInDecendingOrder(inputField1, inputField2) {
    return inputField1 > inputField2;
}