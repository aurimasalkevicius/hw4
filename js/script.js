/*
File: scripts.js
GUI Assignment 3: Creating an Interactive Dynamic Table

Aurimas Alkevicius, UMass Lowell Computer Science, aurimas_alkevicius@cs.uml.edu
Copyright (c) 2021 by Alkevicius. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by AA on August 9, 2021 
*/

const minOfRange = -50,
    maxOfRange = 50;

function validateInput() {

    // this will hold error message
    var errorMessage = '';

    //clear html elements
    document.getElementById('errorMessage').innerHTML = '';
    document.getElementById('dynamicTable').innerHTML = '';

    // get user input values and parse them to integers
    var multiplierStart = Number(document.getElementById("form").elements[0].value);
    var multiplierEnd = Number(document.getElementById("form").elements[1].value);
    var multiplicandStart = Number(document.getElementById("form").elements[2].value);
    var multiplicandEnd = Number(document.getElementById("form").elements[3].value);

    // user inpuut validation block
    if (isEmptyField(multiplierStart)) errorMessage += "Please enter an integer in <em>Multiplier start</em> field.<br>";
    if (isEmptyField(multiplierEnd)) errorMessage += "Please enter an integer in <em>Multiplier end</em> field.<br>";
    if (isEmptyField(multiplicandStart)) errorMessage += "Please enter an integer in <em>Multiplicand start</em> field.<br>";
    if (isEmptyField(multiplicandEnd)) errorMessage += "Please enter an integer in <em>Multiplicand end</em> field.<br>";

    if (isOutOfRange(multiplierStart)) errorMessage += "An integer in <em>Multiplier start</em> field must be within -50 and 50.<br>";
    if (isOutOfRange(multiplierEnd)) errorMessage += "An integer in <em>Multiplier end</em> field must be within -50 and 50.<br>";
    if (isOutOfRange(multiplicandStart)) errorMessage += "An integer in <em>Multiplicand start</em> field must be within -50 and 50.<br>";
    if (isOutOfRange(multiplicandEnd)) errorMessage += "An integer in <em>Multiplicand end</em> field must be within -50 and 50.<br>";

    if (isFraction(multiplierStart)) errorMessage += "The input in <em>Multiplier start</em> field should be an integer.<br>";
    if (isFraction(multiplierEnd)) errorMessage += "The input in <em>Multiplier end</em> field should be an integer.<br>";
    if (isFraction(multiplicandStart)) errorMessage += "The input in <em>Multiplicand start</em> field should be an integer.<br>";
    if (isFraction(multiplicandEnd)) errorMessage += "The input in <em>Multiplicand end</em> field should be an integer.<br>";

    // swap values if user input is not in acending order
    if (isInDecendingOrder(multiplierStart, multiplierEnd)) {
        [multiplierStart, multiplierEnd] = [multiplierEnd, multiplierStart];
    }

    if (isInDecendingOrder(multiplicandStart, multiplicandEnd)) {
        [multiplicandStart, multiplicandEnd] = [multiplicandEnd, multiplicandStart];
    }

    // display error message if any
    document.getElementById('errorMessage').innerHTML = errorMessage;

    // generate table if no errors
    if (errorMessage == '') generateTable(multiplierStart, multiplierEnd, multiplicandStart, multiplicandEnd);

}

// helper functions

function isEmptyField(inputField) {
    return inputField === '';
}

function isOutOfRange(inputField) {
    return (inputField < minOfRange || inputField > maxOfRange);
}

function isFraction(inputField) {
    return inputField % 1 !== 0;
}

function isInDecendingOrder(inputField1, inputField2) {
    return inputField1 > inputField2;
}

// generate table

function generateTable(multiplierStart, multiplierEnd, multiplicandStart, multiplicandEnd) {
    var dynamicTable = '',
        multiplier, multiplicand, alternatingColumn,
        alternatingRow = 1; //alternatingColumn and alternatingRow are used to alternate table cell style 

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