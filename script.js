(function() 
 {
  var allQuestions = [{
    question: "Who killed the Emperor?",
    options: [`Darth Vader`, `Luke`,`He didn't die`,`Leia`],
    answer: 0
  }, {
    question: "What is the color of Obi-Wan's lightsaber?",
    options: [`Red`, `Green`, `Purple`, `Blue`],
    answer: 3
  }, {
    question: `Who tells Luke, "Join me and I will complete your training"?`,
    options: [`The Emperor`,`Yoda`,`Darth Vader`,`Obi-Wan`],
    answer: 2
  },{
    question: "What color is the uniform of a TIE fighter pilot?",
    options: [`Gray`,`Dark blue`,`Green`,`Black`],
    answer: 3
  }, {
    question: "Who was the final rescuer to enter Jabba's palace?",
    options: [`R2-D2`,`Chewie`,`Leia`,`Luke`],
    answer: 3
  },{
    question: `Who told Luke, "Size matters not"?`,
    options: [`Yoda`,`Obi-Wan`,`Anakin`,`No one`],
    answer: 0
  },{
    question: "What is R2-D2's name often shortened to?",
    options: [`RD`,`R2`,`D2`,`22`],
    answer: 1
  },{
    question: "Whose presence did Luke sense on the moon of Endor?",
    options: [`Leia's`,`No one's`,`The Emperor's`,`Darth Vader's`],
    answer: 3
  },{
    question: "What color is a blaster's stun bolt?",
    options: [`Blue`,`Green`,`Red`,`White`],
    answer: 0
  },{
    question: `What planet did Luke say gave him "the creeps"?`,
    options: [`Hoth`,`Sollust`,`Dagobah`,`Tatooine`],
    answer: 2
    }];
  
  var quesCounter = 0;
  var selectOptions = [];
  var quizSpace = $('#quiz');
    
  nextQuestion();
    
  $('#next').click(function () 
    {
        chooseOption();
        if (isNaN(selectOptions[quesCounter])) 
        {
            alert('Please select an option !');
        } 
        else 
        {
          quesCounter++;
          nextQuestion();
        }
    });
  
  $('#prev').click(function () 
    {
        chooseOption();
        quesCounter--;
        nextQuestion();
    });
  
  function createElement(index) 
    {
        var element = $('<div>',{id: 'question'});
        var header = $('<h2>Question No. ' + (index + 1) + ' :</h2>');
        element.append(header);

        var question = $('<p>').append(allQuestions[index].question);
        element.append(question);

        var radio = radioButtons(index);
        element.append(radio);

        return element;
    }
  
  function radioButtons(index) 
    {
        var radioItems = $('<ul>');
        var item;
        var input = '';
        for (var i = 0; i < allQuestions[index].options.length; i++) {
          item = $('<li>');
          input = '<input type="radio" name="answer" value=' + i + ' />';
          input += allQuestions[index].options[i];
          item.append(input);
          radioItems.append(item);
        }
        return radioItems;
  }
  
  function chooseOption() 
    {
        selectOptions[quesCounter] = +$('input[name="answer"]:checked').val();
    }
   
  function nextQuestion() 
    {
        quizSpace.fadeOut(function() 
            {
              $('#question').remove();
              if(quesCounter < allQuestions.length)
                {
                    var nextQuestion = createElement(quesCounter);
                    quizSpace.append(nextQuestion).fadeIn();
                    if (!(isNaN(selectOptions[quesCounter]))) 
                    {
                      $('input[value='+selectOptions[quesCounter]+']').prop('checked', true);
                    }
                    if(quesCounter === 1)
                    {
                      $('#prev').show();
                    } 
                    else if(quesCounter === 0)
                    {
                      $('#prev').hide();
                      $('#next').show();
                    }
                }
              else 
                {
                    var scoreRslt = displayResult();
                    quizSpace.append(scoreRslt).fadeIn();
                    $('#next').hide();
                    $('#prev').hide();
                }
        });
    }
  
  function displayResult() 
    {
        var score = $('<p>',{id: 'question'});
        var correct = 0;
        for (var i = 0; i < selectOptions.length; i++) 
        {
          if (selectOptions[i] === allQuestions[i].answer) 
          {
            correct++;
          }
        }
        score.append('You scored ' + correct + ' out of ' +allQuestions.length);
        return score;
  }
})();