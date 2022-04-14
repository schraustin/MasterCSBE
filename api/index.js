// Name: index.js
// Desc: Contains database requests for Master CS

var express = require('express');
var router = express.Router();
var mysql = require('../config/config');

router.use(express.json());

// Acces Events Table
router.get('/event', function (req, res) {
    // res.status(200).send({"Success": "Base API"});

    mysql.query("SELECT * FROM Event", function (err, rows) {
        if(err) {
          res.status(500).send(err);
          return;
        }

        if(rows) {
          res.status(200).send(rows);
        }

    });

});

// Post to Event
router.post('/event', function requestHandler(req,res) {
  mysql.query("INSERT INTO Event (EventTitle, EventDescription, EventInstructor, EventSpots, EventDate) VALUES (?,?,?,?,?)", [req.body.EventTitle, req.body.EventDescription, req.body.EventInstructor, req.body.EventSpots, req.body.EventDate ], function (err, rows, fields) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });
})

// Delete Event
router.delete('/event/:EventID', function requestHandler(req,res) {

  console.log(`Deleting event with ID ${req.params.EventID}`)
  mysql.query("DELETE FROM Event WHERE EventID = ? ", [req.params.EventID], function (err, rows, fields){

    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send({message:"success"});
    }
  });

})

// Access User Table
router.get('/userwithoutid', function (req, res) {

  mysql.query("SELECT * FROM User", function (err, rows) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });

});

//Access User Table With ID
router.get('/user', function (req, res) {

  //mysql.query("SELECT * FROM User WHERE UserID = ?", [req.params.UserID], function (err, rows) {
    /*let id = req;
    console.log("id = ");
    console.log(id);*/
    //let idstring = id.toString();
    let sql ='SELECT * FROM User WHERE UserID = 3'
    mysql.query(sql, function (err, rows) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });

});

//Post to User Table
router.post('/userpost', function (req , res) {

  //let firstname;
  let record = {
    firstname : req.body.FirstName,
    lastname : req.body.LastName,
    //role : req.body.Role,
    Username : req.body.username,
    Password : req.body.password,
    Role : req.body.role
    /*firstname : 'Sam',
    lastname : 'Smith',
    role : 'Student',
    Username : 'johnsmith@email.com',
    Password : 'password'*/
  };

  /*mysql.query("INSERT INTO `User`(`UserID`, `FirstName`, `LastName`, `Role`, `username`, `password`, `BadgeGiven`, `LessonsTaken`, `CoursesTaken`, `QuizesTaken`, `Streaks`, `Points`) VALUES ('firstname',$firstname,'[value-3]','[value-4]','[value-5]','[value-6]','[value-7]','[value-8]','[value-9]','[value-10]','[value-11]','[value-12]')", function (err, rows) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });*/
  mysql.query('INSERT INTO User SET ?', record, function(error, results, fields) {
    if (error) throw error;
    console.log(results.insertId);
  });

});

/*router.post('/user', function requestHandler(req,res) {
  mysql.query("INSERT INTO User (FirstName, LastName, username, password) VALUES (?,?,?,?)", [req.body.FirstName, req.body.LastName, req.body.username, req.body.password ], function (err, rows, fields) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send({message:"success"});
    }

  });
})*/

//Edit User Profile
router.post('/useredit/:id', function (req , res) {

  let record = {
    firstname : req.body.FirstName,
    lastname : req.body.LastName,
    Username : req.body.username,
    Password : req.body.password,
    Role : req.body.role
  };

  mysql.query("UPDATE User SET ?",record, "WHERE UserID = ?" [req.params.id], function(err, rows){
    if(err){
      res.status(500).send(err);
      return;
    }
    if(rows)
    {
      res.status(200).send(rows);
    }
  })

});

//Access Achievements Table
router.get('/achievements', function (req, res) {

  mysql.query("SELECT * FROM Achievements", function (err, rows) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });

});

// Access Course Completion
router.get('/CourseCompletion', function (req, res) {

  mysql.query("SELECT * FROM CourseCompletion", function (err, rows) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });

});

// Access Quiz Table
router.get('/quiz', function (req, res) {

  mysql.query("SELECT * FROM Quiz", function (err, rows) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });

});
//change id to UserID
// Access Quiz Table with ID
router.get('/quiz/:id', function (req, res) {

  mysql.query("SELECT * FROM Quiz WHERE UserID = ?" + [req.params.UserID], function (err, rows) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });

});

// Access Video Completion Table
router.get('/VideoCompletion', function (req, res) {

  mysql.query("SELECT * FROM VideoCompletion", function (err, rows) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });

});

//Access User Events Table
router.get('/UserEvents', function (req, res) {

  mysql.query("SELECT * FROM UserEvents", function (err, rows) {
    if(err) {
      res.status(500).send(err);
      return;
    }

    if(rows) {
      res.status(200).send(rows);
    }

  });

});

// // // Table used for testing purposes only
// router.get('/test', function (req, res) {

//   mysql.query("SELECT * FROM Test", function (err, rows) {
//     if(err) {
//       res.status(500).send(err);
//       return;
//     }

//     if(rows) {
//       res.status(200).send(rows);
//     }

//   });

// });

// // Post to Test
// router.post('/test', function requestHandler(req,res) {
//   mysql.query("INSERT INTO Test (TestSentence) VALUES (?)", [req.body.TestSentence], function (err, rows, fields) {
//     if(err) {
//       res.status(500).send(err);
//       return;
//     }

//     if(rows) {
//       res.status(200).send({message:"success"});
//     }

//   });
// })


router.get('/Ctest', function (req, res) {
  let params = req.query
  let addSql = 'INSERT INTO QuizAnswers(UserID,QuizID,Answer) VALUES(?,?,?)'
  let addSqlParams = [1, 1, 1];
  mysql.query(addSql, addSqlParams, function (err, result) {
      if (err) {
          console.log('[INSERT ERROR] - ', err.message);
          return;
      }
      console.log('INSERT ID:', result);
  });
  res.send('Hello')
});

router.get('/ChapterInfo', function (req, res) {
  mysql.query("SELECT * FROM ChapterInfo WHERE CourseID = " + req.query.CourseID, function (err, rows) {
      if (err) {
          res.status(500).send(err);
      }
      if (rows) {
          res.status(200).send(rows);
      }
  });
});

router.get('/CourseQuizzes', function (req, res) {
  mysql.query("SELECT * FROM CourseQuizzes", function (err, rows) {
      if (err) {
          res.status(500).send(err);
      }
      if (rows) {
          res.status(200).send(rows);
      }
  });
});

router.get('/QuizAnswers', function (req, res) {
  mysql.query("SELECT * FROM QuizAnswers", function (err, rows) {
      if (err) {
          res.status(500).send(err);
      }
      if (rows) {
          res.status(200).send(rows);
      }
  });
});

router.get('/QuizScores', function (req, res) {
  mysql.query("SELECT * FROM QuizScores", function (err, rows) {
      if (err) {
          res.status(500).send(err);
      }
      if (rows) {
          res.status(200).send(rows);
      }
  });
});
router.get('/IntroQuiz', function (req, res) {
  mysql.query("SELECT * FROM IntroQuiz", function (err, rows) {
      if (err) {
          res.status(500).send(err);
      }
      if (rows) {
          res.status(200).send(rows);
      }
  });
});

router.get('/IntroQuizResult', function (req, res) {
  mysql.query("SELECT * FROM IntroQuizResult", function (err, rows) {
      if (err) {
          res.status(500).send(err);
      }
      if (rows) {
          res.status(200).send(rows);
      }
  });
});

router.get('/updateIntroQuizResult', function (req, res) {
  let params = req.query
  let addSql = 'REPLACE INTO IntroQuizResult(UserID,TypeOfLearner,CourseRecommended) VALUES(?,?,?)'
  let addSqlParams = [params.id, params.type, params.recommended];
  mysql.query(addSql, addSqlParams, function (err, result) {
      if (err) {
          res.send(err)
          return;
      }
      res.send(result)
  });
});

router.get('/getCourseQuizzes', function (req, res) {
  let params = req.query
  let Sql = 'SELECT * FROM CourseQuizzes WHERE CourseID = ' + params.CourseID + ' AND ChapterID = ' + params.ChapterID
  mysql.query(Sql, function (err, result) {
      if (err) {
          res.send(err)
          return;
      }
      res.send(result)
  });
});

router.get('/updateQuizScores', function (req, res) {
  let params = req.query
  let addSql = 'REPLACE INTO QuizScores(UserID,ChapterID,Score) VALUES(?,?,?)'
  let addSqlParams = [params.UserID, params.ChapterID, params.Score];
  mysql.query(addSql, addSqlParams, function (err, result) {
      if (err) {
          res.send(err)
          return;
      }
      res.send(result)
  });
});

module.exports = router;