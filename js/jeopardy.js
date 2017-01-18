$(function() {
  function getQuestion(cat, i) {
    return data.questions[cat][i]; 
  }

  function getAnswer(cat, i) {
    return data.answers[cat][i];
  }

  function showQuestion() {
    $("#board").fadeOut('fast', function() {
      $("#question").fadeIn('fast');
    }); 
  }

  function showBoard() {
    $("#question").fadeOut('fast', function() {
      $("#board").fadeIn('fast');
    });
  }

  function showAnswer() {
    $("#questionText").fadeOut('fast', function() {
      $(this).text($(this).data('answer')).fadeIn('fast');
    });
  }

  data.categories.forEach(function(category, idx) {
    $("<div>").addClass('cell col one sixth').text(category.toUpperCase()).appendTo("header.row");
    var cat = category.toLowerCase().split(' ')[0];
    var column = $("<div>").addClass("col one sixth").appendTo("#board section.row");
    [100, 200, 300, 400, 500].forEach(function(value, idx) {
      $("<div>").addClass('cell question').text("$"+value).data('category', cat).data('index', idx).appendTo(column);
    });
  });
 
  $(".cell.question").on('click', function() {
    var category = $(this).data('category');
    var index = $(this).data('index');
    $(this).text('').off('click').css('cursor', 'normal');

    $("#questionText").text(getQuestion(category, index)).data('answer', getAnswer(category, index));
    showQuestion();
  }); 

  $("#question").on('click', showAnswer);

  $("body").on('keyup', function(evt) {
    if (evt.keyCode == 13 && $("#question").is(":visible")) {
      showBoard();
    } else {
      return false;
    }
  });

  $("nav").on('click', function() {
    $("#overlay").add("#modal").removeClass('hide');
  });

  $("#overlay").on('click', function() {
    $("#overlay").add("#modal").addClass('hide');
  });
});
