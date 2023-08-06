// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

//display the current date using Day.js

//making call to jQuery using "$()"

$("#currentDay").text(dayjs().format('MMMM D, YYYY'));

$(document).ready(function () {

  //dynamically generate the time blocks for 12PM to 5PM
  var lastTimeBlock = $(".time-block").last();
  var lastHour = parseInt(lastTimeBlock.attr('id').split('-')[1]);
  var currentHour = dayjs().hour();

  for (let i = lastHour + 1; i <= 17; i++) {
    var timeStatus;
    if (i < currentHour) {
      timeStatus = "past";
    } else if (i === currentHour) {
      timeStatus = "present";
    } else {
      timeStatus = "future";
    }

    //adjusting for the hour display for 12PM
    var displayHour = i === 12 ? '12PM' : (i <= 11 ? i + 'AM' : (i - 12) + 'PM');

    var newTimeBlock = $(`<div class="row time-block ${timeStatus}" id="hour-${i}">
    <div class="col-2 col-md-1 hour text-center py-3">${displayHour}</div>
    <textarea class="col-8 col-md-10 description" rows="3"></textarea>
    <button class="btn saveBtn col-2 col-md-1" aria-label="save">
      <i class="fas fa-save"></i>
    </div>`);

    lastTimeBlock.after(newTimeBlock);
    lastTimeBlock = newTimeBlock;
  }

  //save tasks into localStorage
  $(".saveBtn").click(function () {
    var timeBlock = $(this).parent();
    var hour = timeBlock.attr('id');
    var userInput = timeBlock.find('textarea').val();
    localStorage.setItem(hour, userInput);
  });

    //load tasks from locatStorage
    $('.time-block').each(function() {
      var hour = $(this).attr('id').split('-')[1];
      var storedValue = localStorage.getItem('hour-' + hour);
      if (storedValue) {
        $(this).find('textarea').val(storedValue);
      }
    });

  //applying 'past, 'present', and 'future' class
  $(".time-block").each(function() {
    var blockHour = parseInt($(this).attr('id').split('-')[1]);
    if (blockHour < currentHour) {
      $(this).removeClass('future present').addClass('past');
    } else if (blockHour === currentHour) {
      $(this).removeClass('past future').addclass('present');
    } else {
      $(this).addClass('past present').addClass('future');
    }
  });

});