(function() {


  var questions = [{
    question: "How many ribs in the human thorax?",
    choices: ["11pairs","12pairs","13pairs","14pairs"],
    correctAnswer: 1
  }, {
    question: "What is the percentage of calcium stored in the human bone?",
    choices: ["95%", "96%", "97%", "98%"],
    correctAnswer: 2
  }, {
    question: "What is the brain of the human cell?",
    choices: ["nucleous", "nuclear membrane", "Chromatin", "Cytoplasam"],
    correctAnswer: 0
  }, {
    question: "Which human bone is called beauty bone?",
    choices: ["humerus", "scapula","acromion","clavicle"],
    correctAnswer: 3
  }, {
    question: "What is the length of human stomach?",
    choices: ["23cm", "24cm","25cm","26cm"],
    correctAnswer: 2
  },
   {
    question: "Which is the smallest bone of the human body?",
    choices: ["hip bone","spine bone","wrist bone","stapes bone"],
    correctAnswer: 3
  },
   {
    question: "What is the estimated number of cells that the human body is composed of?",
    choices: ["17.2 trillion", "27.2 trillion","37.2 trillion","47.2 trillion"],
    correctAnswer: 2
  },
 {
    question: "What is the amount of blood contained in the human body",
    choices: ["2-3 litres", "3-4 litres","4-5 litres","5-6 litres"],
    correctAnswer: 3
  },
   {
    question: "What is the average blood pressure of human being?",
    choices: ["140/90 mmHg","100/60 mmHg","120/80 mmHg","70/60 mmHg"],
    correctAnswer: 2
  },

   {
    question: "Which part of the brain controls anger,fear,body temperature?",
    choices: ["hypothalamus","hippocampus","amygdala","limbic cortex"],
    correctAnswer: 0
  },




  ];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('You got ' + numCorrect + ' questions out of ' +
                 questions.length + ' right!!!');
    return score;
  }
})();