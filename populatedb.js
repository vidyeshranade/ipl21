#! /usr/bin/env node

console.log('This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb://your_username:your_password@your_dabase_url');

// Get arguments passed on command line
/* var userArgs = process.argv.slice(2);
if (!userArgs[0].startsWith('mongodb://')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
} */

var async = require('async')
var Book = require('./models/book')
var Author = require('./models/author')
var Genre = require('./models/genre')
var BookInstance = require('./models/bookinstance')


var mongoose = require('mongoose');
const author = require('./models/author');
var Schema = mongoose.Schema;


// var mongoDB = userArgs[0];
var mongoDB = "mongodb+srv://mongodb_db_user:mongodb_db_user@clustervid.r7g14.mongodb.net/local_library?retryWrites=true&w=majority";
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

var authors = []
var genres = []
var books = []
var bookinstances = []

function authorCreate(first_name, family_name, d_birth, d_death, cb) {
  authordetail = {first_name:first_name , family_name: family_name }
  if (d_birth != false) authordetail.date_of_birth = d_birth
  if (d_death != false) authordetail.date_of_death = d_death
  
  var author = new Author(authordetail);
       
  author.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Author: ' + author);
    authors.push(author)
    cb(null, author)
  }  );
}

function genreCreate(name, cb) {
  var genre = new Genre({ name: name });
       
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New Genre: ' + genre);
    genres.push(genre)
    cb(null, genre);
  }   );
}

function bookCreate(title, summary, isbn, author, genre, price,cb) {
  bookdetail = { 
    title: title,
    summary: summary,
    author: author,
    isbn: isbn,
    price: price
  }
  if (genre != false) bookdetail.genre = genre
    
  var book = new Book(bookdetail);    
  book.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Book: ' + book);
    books.push(book)
    cb(null, book)
  }  );
}


function bookInstanceCreate(book, imprint, due_back, status, cb) {
  bookinstancedetail = { 
    book: book,
    imprint: imprint
  }    
  if (due_back != false) bookinstancedetail.due_back = due_back
  if (status != false) bookinstancedetail.status = status
    
  var bookinstance = new BookInstance(bookinstancedetail);    
  bookinstance.save(function (err) {
    if (err) {
      console.log('ERROR CREATING BookInstance: ' + bookinstance);
      cb(err, null)
      return
    }
    console.log('New BookInstance: ' + bookinstance);
    bookinstances.push(bookinstance)
    cb(null, book)
  }  );
}


function createGenreAuthors(cb) {
    async.parallel([
      function(callback) {
        authorCreate('A.C.', 'Bhaktivedanta', '', '', callback);
      }, 
      function(callback) {
            authorCreate('Adam', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Adams', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Alice', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Antoine-De', 'Saint-Exuper', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Archer', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Bacon', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Brad', 'Ford', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Brian', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Caroline', 'Stone', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Catherine', 'Cookson', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Childcraft', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Clive', 'Fletcher', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Cookson', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Cynthia', 'Victor', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Dr.Leo', 'Rebello', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Dr.Surekha', 'Sawant', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Eleanor-H.', 'Porter', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Elizabeth', 'Novle', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Erlestanley', 'Gardener', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Faulks', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Ferris', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Gale', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Gowers', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Grisham', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Hanksearls', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Henkes', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Higgins', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Hoag', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Holmes', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Iain', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Innes', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Irving', 'Wallace', '', '', callback);
          }, 
      function(callback) {
            authorCreate('J.R.R.', 'Tolkien', '', '', callback);
          }, 
      function(callback) {
            authorCreate('James', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('John', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('K.N.', 'Munshi', '', '', callback);
          }, 
      function(callback) {
            authorCreate('K.N.Munshi', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Kirst', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Larry', 'collins', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Ludlum', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Mary-Ellen', 'Pinkham', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Melissa', 'Bank', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Narinder', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('P.G.', 'Wodehouse', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Peters', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Pountney', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Rankin', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Rendell', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Rhodes', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Richard', 'Holmes', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Robert', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Robert-Louis', 'Stevenson', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Robin', 'Cook', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Rose', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Shields', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('SUKHADEV', 'THORAT', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Tom', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Tong', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Turow', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Victor', 'Hugo', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Walawalkar', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Wallace', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Willa-Beatti', 'Wilson', '', '', callback);
          }, 
      function(callback) {
            authorCreate('Young', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अ.रा.', 'गर्दी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अंजनकुमार', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अंजली', 'कीर्तने', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अंजली', 'पेंडसे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अंबिका', 'सरकार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अच्युत', 'गोडबोले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अजित', 'ठाकूर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अजित', 'तेंडूलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अतुल', 'धामणकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अनंत', 'भालेराव', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अनंत', 'लाभसेटवार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अनंत', 'सामंत', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अनिता', 'पाध्ये', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अनिल', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अनिल', 'अवचट', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अनिल', 'आठल्ये', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अनिल', 'काळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अनिल', 'डांगे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अप्पासाहेब', 'जाधव', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अरविंद', 'ताटके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अरुण', 'ठाकूर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अरुण', 'नेरूरकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अरुण', 'मांडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अरुण', 'साधू', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अरुण', 'साधू', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अरुणा', 'ढेरे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अवंतिका', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अविनाश', 'धर्माधिकारी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अविनाश', 'सहस्रबुद्धे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अशोक', 'जैन', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अशोक', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अशोक', 'निर्फारके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अशोक', 'पाध्ये', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अशोक', 'बोरकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('अशोक', 'शहाणे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आ.ह.साळुंके', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आचार्य', 'अत्रे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आचार्य', 'अत्रे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आनंद', 'अवधानी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आनंद', 'यादव', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आनंद', 'सराफ', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आर.एम.लाला', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आर.के.', 'नारायण', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आरती', 'प्रभू', '', '', callback);
          }, 
      function(callback) {
            authorCreate('आशा', 'बगे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('इंदिरा', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('इसाक', 'मुजावर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('इसाक', 'मुजावर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('उज्ज्वला', 'मेहेंदळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('उत्तम', 'कोळगावकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('उमा-वि.', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('उमेश', 'कणकवलीकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('उल्हास', 'राजाज्ञ', '', '', callback);
          }, 
      function(callback) {
            authorCreate('उषा', 'आठवले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('उषा', 'तांबे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ए.पी.जे.', 'अब्दुल-कलाम', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ए.पी.जे.अब्दुल', 'कलाम', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ए.व्ही.', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('कमल', 'पाध्ये', '', '', callback);
          }, 
      function(callback) {
            authorCreate('कमलेश', 'वालावलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('किरण', 'बेदी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('किशोर', 'काळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('किशोर', 'पवार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('कुसुमाग्रज', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('कुसुमावती', 'देशपांडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('कृष्णकांत', 'नाईक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('कृष्णमेघ', 'कुंटे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('कृष्णाजी', 'आठवले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('कृष्णात', 'खोत', '', '', callback);
          }, 
      function(callback) {
            authorCreate('कृष्णामाई', 'सुर्वे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('केशव', 'मेश्राम', '', '', callback);
          }, 
      function(callback) {
            authorCreate('खुशवंत', 'सिंग', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ग.प्र.', 'प्रधान', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गंगाधर', 'गाडगीळ', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गंगाधर-पाटील', 'म.सु.पाटील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गजानन', 'क्षीरसागर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गदिमा', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गिरीश', 'जाखोटिया', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गीता', 'पिरामल', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गीविंद', 'तळवलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गुलजार', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गो.तू.', 'पाटील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गो.मा.', 'पवार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गो.रा.', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गोट', 'खिंडीकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गोदावरी', 'परुळेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गोपाळ', 'गोडसे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गोपाळ-नीळकंठ', 'दांडेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गोपीनाथ', 'तलवळकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गोविंद', 'तळवलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('गौरी', 'देशपांडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('चारुहास', 'पंडित', '', '', callback);
          }, 
      function(callback) {
            authorCreate('चारूशीला', 'ओक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('चिं.वि.', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('चिं.त्र्य.', 'खानोलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('चिदंबर-महाराज', 'मंडळ', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ज.वि.', 'पवार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('जगन्नाथ', 'कुंटे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('जयंत', 'नारळीकर', '', '', callback);
          },
      function(callback) {
        authorCreate('जयवंत', 'दळवी', '', '', callback);
      },  
      function(callback) {
            authorCreate('जयश्री', 'गडकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('जयश्री', 'बेडेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('जी.ए.', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('जी.एन.', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('जीन', 'वेबस्टर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ज्ञानदा', 'नाईक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ज्ञानेश्वर', 'कर्णिक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ज्ञानेश्वर', 'मुळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ज्योतीभास्कर-वासुदेवराव', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ज्योस्त्ना', 'देवधर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.अनुराधा', 'गोडबोले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.अलका', 'मांडके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.आ.ह.', 'साळुंखे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.आनंद', 'नाडकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.उल्हास', 'लुकतुके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.कमला', 'सोहोनी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.किशोर', 'पवार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.ग.ना.', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.गो.रा.', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.ज्ञानेश्वर', 'तांदळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.दत्तप्रसाद', 'दाभोळकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.धुंडीराज', 'पाठक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.नरेंद्र', 'जाधव', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.पी.एस.', 'रामाणी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.प्रकाश', 'आमटे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.बाळ', 'फोंडके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.बी.के.जगताप', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.मनोहर', 'वर्तीकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.महेश', 'केळूसकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.मीना', 'नेरुकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.र.कृ.गद्रे', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.रमा', 'मराठे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.रवी', 'बापट', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.रवी-बापट,डॉ.कामाक्षी-भाटे', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.राजेंद्र', 'बर्वे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.शशिकांत', 'लोखंडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.श्रीकांत', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.श्रीराम', 'पंडित', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.संजय', 'ओक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.सुधीर', 'निरगुडकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.सुलोचन', 'सोगण', '', '', callback);
          }, 
      function(callback) {
            authorCreate('डॉ.ह.वि.', 'सरदेसाई', '', '', callback);
          }, 
      function(callback) {
            authorCreate('तसलिमा', 'नासरीन', '', '', callback);
          }, 
      function(callback) {
            authorCreate('त्र्यं.वि.', 'सरदेशमुख', '', '', callback);
          }, 
      function(callback) {
            authorCreate('द.न.', 'गोखले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('द.मा.', 'मिरासदार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('द.मा.', 'लेले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('द.रा.', 'पेंडसे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('द.व्यं.', 'जहागीरदार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दत्ता', 'टोळ', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दत्ता', 'देसाई', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दत्ता', 'मारुलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दत्तात्रय', 'धनगरे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दया', 'पवार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दाजी', 'पणशीकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दादा', 'कोंडके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दादा', 'धार्माधिकारी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दिगंबरदास', 'मंडळ', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दिनकर', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दिलीप', 'प्रभावळकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दीपक', 'घारे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('दुर्गा', 'भागवत', '', '', callback);
          }, 
      function(callback) {
            authorCreate('देशपांडे', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('धनंजय', 'कीर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नंदकुमार', 'टेणी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नंदिनी', 'आत्मसिद्ध', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नंदिनी', 'आत्मसीचर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नंदू', 'नाटेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नरहर', 'फाटक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नरेंद्र', 'चपळगावकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ना.ग.', 'गोरे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ना.गो.', 'कालेलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ना.धो.', 'ताम्हणकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ना.सं.', 'इनामदार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नाथ', 'माधव', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नितीन', 'कोत्तापल्ले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नितीन', 'गडकरी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नितीन', 'तेंडूलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('निरंजन', 'घाटे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नीला', 'पांढरे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नीला', 'सत्यनारायण', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नीलिमा', 'प्रधान', '', '', callback);
          }, 
      function(callback) {
            authorCreate('नीलिमा', 'भावे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पंकज', 'कुरुलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पंडित-किशनलाल', 'शर्मा', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पंडित', 'विद्यासागर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पद्मा', 'रानडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पद्माकर', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पवार', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पांडुरंगशास्त्री', 'आठवले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पांढरे', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पालेत', 'बुर्ज्वा', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पु.ना.', 'ओक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पु.ल.', 'देशपांडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पु.ल.देशपांडे,मंगेश-राजाध्यक्ष,रामचंद्र-आलुरकर', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पु.शि.', 'रेगे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पुरषोत्तम', 'धाक्रम', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पुरुषोत्तम', 'बोरकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पुलो', 'कोएलो', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पुष्पा', 'भावे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('पोरस', 'मुन्शी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रकाश', 'आमटे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रकाश', 'संत', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रतिभा', 'रानडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रदीप', 'कर्णिक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रदीप', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रभाकर', 'उर्ध्वरेषे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रभाकर', 'पाध्ये', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रभाकर', 'पेंढारकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रभाकर', 'बागुल', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रभाकरण', 'पेंढारकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रमिला', 'मोडक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रमोद', 'जोगळेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रल्हाद', 'धोंड', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रवीण', 'दवणे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रवीण', 'पाटकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रा.द.के.', 'केळकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रा.मधुरकर', 'दिघे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रा.मिलिंद.', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रा.शिवाजीराव', 'भोसले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('प्रिया', 'जामकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('फ.मु.', 'शिंदे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('फिरोज', 'रानडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('बहिणाबाई', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('बा.सी.', 'अष्टीकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('बाजीराव', 'पाटील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('बाबा', 'भांड', '', '', callback);
          }, 
      function(callback) {
            authorCreate('बाळ', 'सडवेलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('बाळकृष्ण', 'प्रभुदेसाई', '', '', callback);
          }, 
      function(callback) {
            authorCreate('बाळासाहेब', 'ठाकरे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('बासू', 'भट्टाचार्य', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भ.ग.', 'बापट', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भवरलाल', 'जैन', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भा.का.', 'गर्दे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भा.ल.', 'महाबळ', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भाई', 'भगत', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भारत', 'सासणे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भालचंद्र', 'नेमाडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भालचंद्र', 'मयेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भालजी', 'पेंढारकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भावना', 'भार्गवे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('भास्करभाई', 'भट्ट', '', '', callback);
          }, 
      function(callback) {
            authorCreate('म.गो.पाठक', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('म.वा.', 'धोंड', '', '', callback);
          }, 
      function(callback) {
            authorCreate('म.सु.', 'पाटील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मंगला', 'केवळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मंगला', 'गोडबोले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मंगेश', 'देशमुख', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मंगेश', 'पाडगावकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मंगेश', 'राजाध्यक्ष', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मकरंद', 'साठे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मधुकर', 'तोरडमल', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मधुकर', 'धर्मापुरीकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मधुकाका', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मधुमंगेश', 'कर्णिक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मधूमंगेश', 'कर्णिक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मनोहर', 'शहाणे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('महादेव-शास्त्री', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('माधव', 'आचवल', '', '', callback);
          }, 
      function(callback) {
            authorCreate('माधव', 'कर्वे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('माधव', 'गडकरी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('माधवी', 'देसाई', '', '', callback);
          }, 
      function(callback) {
            authorCreate('माधवी', 'मित्र', '', '', callback);
          }, 
      function(callback) {
            authorCreate('माधुरी', 'काळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('माधुरी', 'काळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('माधुरी', 'पुरंदरे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मानकर', 'काका', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मारुती', 'चितमपल्ली', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मारुती', 'यादव', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मालती', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मालिका', 'शेख', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मिलिंद', 'गुणाजी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मिलिंद', 'बोकील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मिलिद', 'गुणाजी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मिलींद', 'बोकील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मीना', 'देशपांडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मुकुंद', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मुकुंद', 'टाकसाळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मुधोळकर', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मोनिका', 'गजेंद्रगडकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('मोहन', 'पाटील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('य.दी.', 'फडके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('यशवंत', 'देव', '', '', callback);
          }, 
      function(callback) {
            authorCreate('यशवंत', 'रांजणकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('योगेश', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('योगेश्वर', 'अभ्यंकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रंगनाथ', 'पठारे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रणजीत', 'देसाई', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रणजीत', 'देसाई', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रत्नाकर', 'मतकरी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रफ़िक़', 'झकेरिया', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रमेश', 'तेंडुलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रमेश', 'तेंडूलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रविंद्र', 'गुर्जर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रविंद्र', 'पिंगे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रविंद्र', 'पिंगे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रविंद्र', 'भट', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रवी', 'परांजपे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रवींद्र', 'गुर्जर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रवींद्र', 'सुर्वे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रा.भा.', 'पाटणकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रागिणी', 'पुंडलिक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('राजन', 'खान', '', '', callback);
          }, 
      function(callback) {
            authorCreate('राजन', 'खान', '', '', callback);
          }, 
      function(callback) {
            authorCreate('राजा', 'मंगळवेढेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('राजा', 'लिमये', '', '', callback);
          }, 
      function(callback) {
            authorCreate('राजीव', 'नाईक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('राजेंद्र', 'बनहट्टी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('राजेश', 'शारंगपाणी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('राजेश-रमेश', 'रघुवंशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रामदास', 'पाध्ये', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रामदास', 'फुटाणे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रामदास', 'भटकळ', '', '', callback);
          }, 
      function(callback) {
            authorCreate('राहुल', 'सिंघल', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रेश्मा', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रोहिणी', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('रोहिणी', 'गवाणकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('लक्ष्मण', 'माने', '', '', callback);
          }, 
      function(callback) {
            authorCreate('लछामान', 'हर्दवाणी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('लीना', 'मेहेंदळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('व.पु.', 'काळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वनराज', 'मालवी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वर्षा', 'लोवेलेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वसंत', 'गुप्ते', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वसंत', 'डहाके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वसंत', 'बापट', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वसंत', 'सरवटे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वसंत-दा.', 'भट', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वि.', 'वैद्य', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वि.के.', 'फडके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वि.ग.', 'कानिटकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वि.ज.', 'बोरकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वि.पु.भागवत-स्मारक-समिती', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वि.रा.', 'वेलणकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वि.श्री.', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वि.स.', 'खांडेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वि.स.', 'वाळिंबे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विकास', 'सबनीस', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विजय', 'तेंडूलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विजय', 'देवधर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विजय', 'पाडळकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विजय', 'रणदिवे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विजय', 'वैद्य', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विजया', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विजया', 'राजाध्यक्ष', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विजया', 'वैद्य', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विद्या', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विद्याधर', 'पुंडलिक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विनोबा', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विलास', 'पाटील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विलास', 'सारंग', '', '', callback);
          }, 
      function(callback) {
            authorCreate('विश्वास', 'पाटील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वीणा', 'गवाणकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('वैद्य', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('व्यं.ना.', 'केशकामत', '', '', callback);
          }, 
      function(callback) {
            authorCreate('व्यंकटेश', 'माडगुळकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शं.ना.', 'नवरे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शंकर', 'पाटील', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शशिकला', 'उपाध्ये', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शांता', 'गोखले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शांता', 'शेळके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शांता', 'शेळके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शांताराम', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शांताराम', 'पवार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शांताराम', 'हिवराळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शिरपा', 'काणेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शिरीष', 'कणेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शिरीष', 'पै', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शिव', 'खेरा', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शिवराज', 'गोर्ले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शिवाजी', 'सावंत', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शी.द.', 'फडणीस', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शैला', 'दातार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('शोभना', 'रानडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('श्याम', 'मनोहर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('श्री', 'ठाणेदार', '', '', callback);
          }, 
      function(callback) {
            authorCreate('श्री.ना.', 'पेंडसे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('श्री.पु.', 'गोखले', '', '', callback);
          }, 
      function(callback) {
            authorCreate('श्री.म.', 'माटे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('श्री.श्री.', 'भट', '', '', callback);
          }, 
      function(callback) {
            authorCreate('श्रीकांत', 'पागनीस', '', '', callback);
          }, 
      function(callback) {
            authorCreate('श्री-भिखाभाई-सुथार-आणि-सौ.-छाया-पागे', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('श्रुती', 'पानसे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('स.ल.', 'सागर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('संजय', 'आवटे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('संजय', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('संजय', 'डहाळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('संजय', 'पंडित', '', '', callback);
          }, 
      function(callback) {
            authorCreate('संजीव', 'लाटकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('संदीप', 'खरे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('संदेश', 'भंडारे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सखा', 'कलाल', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सचिन', 'कुंडलकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सडवेलकर', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सदा', 'डुंबरे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सदानंद', 'देशमुख', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सद्गुरू-वामनराव', 'पै', '', '', callback);
          }, 
      function(callback) {
            authorCreate('साधना', 'आमटे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सानिया', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('साने', 'गुरुजी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुधा', 'जोशी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुधा', 'मुर्ती', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुधीर', 'गाडगीळ', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुधीर', 'थत्ते', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुधीर', 'फडके', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुनंदा', 'अमरापूरकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुनिता', 'देशपांडे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुनीती', 'जैन', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुनील-कृ.', 'गोंधळेकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुब्रातो', 'बागची', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुभाष', 'भेण्डे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुमती', 'देवस्थळे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुमा', 'करंदीकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुमेध', 'वडावाला', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुरेंद्र', 'ग्रामोपाध्ये', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुरेश', 'नाईक', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुलभा-वसंत', 'कामत', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुहास', 'कुलकर्णी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुहास', 'पुजारी', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सुहास', 'शिरवळकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सौ.सुमती', 'सामंत', '', '', callback);
          }, 
      function(callback) {
            authorCreate('सौमित्र', '', '', '', callback);
          }, 
      function(callback) {
            authorCreate('स्वातंत्र्यवीर', 'सावरकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('स्वामी', 'अशोकानंद', '', '', callback);
          }, 
      function(callback) {
            authorCreate('स्वामी', 'विवेकानंद', '', '', callback);
          }, 
      function(callback) {
            authorCreate('ह.मो.', 'मराठे', '', '', callback);
          }, 
      function(callback) {
            authorCreate('हंसा', 'वाडकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('हमीद', 'दलवाई', '', '', callback);
          }, 
      function(callback) {
            authorCreate('हरिभाई', 'ठक्कर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('हिमानी', 'सावरकर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('हिराभाई', 'ठक्कर', '', '', callback);
          }, 
      function(callback) {
            authorCreate('हेमंत', 'देसाई', '', '', callback);
          }, 
      function(callback) {
            authorCreate('हेमा', 'श्रीखंडे', '', '', callback);
          }, 
/*        function(callback) {
          genreCreate("आत्मचरित्र", callback);
        },
        function(callback) {
          genreCreate("चरित्र", callback);
        },
        function(callback) {
          genreCreate("मुलांची पुस्तके", callback);
        },
        function(callback) {
          genreCreate("विज्ञान", callback);
        },
        function(callback) {
          genreCreate("नाटक", callback);
        },
        function(callback) {
          genreCreate("आरोग्य", callback);
        },
        function(callback) {
          genreCreate("विनोदी", callback);
        },
        function(callback) {
          genreCreate("ललित", callback);
        },
        function(callback) {
          genreCreate("कादंबरी", callback);
        },
        function(callback) {
          genreCreate("इतर", callback);
        },
        function(callback) {
          genreCreate("धार्मिक-अध्यात्मिक", callback);
        },
        function(callback) {
          genreCreate("कथासंग्रह", callback);
        },
        function(callback) {
          genreCreate("अनुवादित", callback);
        },
        function(callback) {
          genreCreate("प्रवासवर्णन", callback);
        },
        function(callback) {
          genreCreate("वैचारिक", callback);
        },
*/
      ],
        // optional callback
        cb);
}


function createBooks(cb) {
    async.parallel(
      [
        function(callback) {
          Author
             .find({first_name:'जयवंत', family_name: 'दळवी'})
             .then((author1) => {
                bookCreate('स्वगत', 'Please update, if you have read it.', 'AB-M-27', author1[0].id, null,150, callback);
              })
          },
          function(callback) {
            Author
               .find({first_name:'जयवंत', family_name: 'दळवी'})
               .then((author1) => {
                  bookCreate('पुरुष ', 'Please update, if you have read it.', 'DM-M-04', author1[0].id, null,80, callback);
              })
            },
          function(callback) {
                  Author
                    .find({first_name:'जयवंत', family_name: 'दळवी'})
                    .then((author1) => {
                        bookCreate('बाकी शिल्लक', 'Please update, if you have read it.', 'LL-M-50', author1[0].id, null,200, callback);
                    })
                  },
          function(callback) {
                  Author
                    .find({first_name:'जयवंत', family_name: 'दळवी'})
                    .then((author1) => {
                        bookCreate('परममित्र', 'Please update, if you have read it.', 'LL-M-111', author1[0].id, null,200, callback);
                    })
                  },
          function(callback) {
                  Author
                    .find({first_name:'जयवंत', family_name: 'दळवी'})
                    .then((author1) => {
                        bookCreate('पू.ल.एक साठवण', 'Please update, if you have read it.', 'LL-M-132', author1[0].id, null,300, callback);
                    })
                  },
          function(callback) {
                  Author
                    .find({first_name:'जयवंत', family_name: 'दळवी'})
                    .then((author1) => {
                        bookCreate('महानंदा', 'Please update, if you have read it.', 'NL-M-18', author1[0].id, null,100, callback);
                    })
                  },
          function(callback) {
                  Author
                    .find({first_name:'जयवंत', family_name: 'दळवी'})
                    .then((author1) => {
                        bookCreate('सारे प्रवासी घडीचे ', 'Please update, if you have read it.', 'LL-M-15', author1[0].id, null,150, callback);
                    })
                  },
          function(callback) {
                  Author
                    .find({first_name:'जयवंत', family_name: 'दळवी'})
                    .then((author1) => {
                        bookCreate('आणखी ठणठणपाळ ', 'Please update, if you have read it.', 'LL-M-131', author1[0].id, null,220, callback);
                    })
                  },
    
  

  
      ],
        // optional callback
        cb);
}


function createBookInstances(cb) {
    async.parallel([
        function(callback) {
          bookInstanceCreate(books[0], 'London Gollancz, 2014.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[1], ' Gollancz, 2011.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceCreate(books[2], ' Gollancz, 2015.', false, false, callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[3], 'New York Tom Doherty Associates, 2016.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Available', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Maintenance', callback)
        },
        function(callback) {
          bookInstanceCreate(books[4], 'New York, NY Tom Doherty Associates, LLC, 2015.', false, 'Loaned', callback)
        },
        function(callback) {
          bookInstanceCreate(books[0], 'Imprint XXX2', false, false, callback)
        },
        function(callback) {
          bookInstanceCreate(books[1], 'Imprint XXX3', false, false, callback)
        }
        ],
        // Optional callback
        cb);
}



async.series([
    // createGenreAuthors,
    createBooks,
    // createBookInstances
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+err);
    }
    else {
        console.log('BOOKInstances: '+bookinstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});




