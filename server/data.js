
const schema =
" DROP TABLE IF EXISTS Users cascade;" +
" DROP TABLE IF EXISTS Asanas cascade;" +
" DROP TABLE IF EXISTS Routines cascade;" +
" DROP TABLE IF EXISTS UserAsanas cascade;" +

" CREATE TABLE Users (" +
    " ID SERIAL PRIMARY KEY," +
    " UserName VARCHAR(40) NOT NULL," +
    " Email VARCHAR(50) NOT NULL," +
    " Pwd VARCHAR(50) NOT NULL " +
" );" +

" CREATE TABLE Asanas (" +
    " ID SERIAL PRIMARY KEY," +
    " Name VARCHAR(100)," +
    " Sanskrit VARCHAR(100)," +
    " English VARCHAR(100)," +
    " Type VARCHAR(50)," +
    " ImgURL VARCHAR" +
" );" +

" CREATE TABLE Routines (" +
    " ID SERIAL PRIMARY KEY," +
    " Name VARCHAR(30)," +
    " Description VARCHAR(100)," +
    " UserID integer" +
" );" +

" CREATE TABLE UserAsanas (" +
    " ID SERIAL PRIMARY KEY," +
    " UserID integer," +
    " AsanaID integer," +
    " RoutineID integer" +
" );";
const seed = 
" INSERT INTO" +
"  Asanas" +
" VALUES " +
" ( default, 'Adho Mukha Shvanasana', 'अधोमुखश्वानासन', 'Downward-Facing Dog', 'Standing', 'https://upload.wikimedia.org/wikipedia/commons/7/76/Ado-muka-shvanasana.jpg')," +
" ( default, 'Adho Mukha Vrikshasana', 'अधोमुखवृक्षासन', 'Downward-Facing Tree, Yoga Handstand', 'Balancing', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Rocket-yoga-13_handstand_%28cropped%29.jpg/40px-Rocket-yoga-13_handstand_%28cropped%29.jpg')," +
" ( default, 'Akarna Dhanurasana', 'आकर्णधनुरासन', 'Shooting bow, Archer, Bow and arrow', 'Sitting', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Akarna_Dhanurasana.jpg/110px-Akarna_Dhanurasana.jpg')," +
" ( default, 'Anantasana', 'अनन्तासन', 'Ananta''s pose, Vishnu''s Couch pose', 'Reclining', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Anantasana_wfs.jpg/110px-Anantasana_wfs.jpg')," +
" ( default, 'Anjaneyasana', 'अञ्जनेयासन', 'Crescent Moon', 'Standing', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Ardha_urdhwa_bhujangasana.jpg/110px-Ardha_urdhwa_bhujangasana.jpg')," +
" ( default, 'Ardha Chandrasana', 'अर्धचन्द्रासन', 'Half moon', 'Standing', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ardha-Chandrasana_Yoga-Asana_Nina-Mel.jpg/110px-Ardha-Chandrasana_Yoga-Asana_Nina-Mel.jpg')," +
" ( default, 'Ashtanga Namaskara', 'अष्टाङ्ग नमस्कार', 'Eight-Limbed Salutation Caterpillar', 'Reclining', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Ashtanga_Namaskara_%28cropped%29.JPG/110px-Ashtanga_Namaskara_%28cropped%29.JPG')," +
" ( default, 'Astavakrasana', 'अष्टावक्रासन', 'Aṣṭāvakra''s pose, Eight-angled', 'Balancing', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Astavakrasana.jpg/110px-Astavakrasana.jpg')," +
" ( default, 'Baddha Konasana, Bhadrasana', 'बद्धकोणासन', 'Bound angle, Cobbler''s pose', 'Sitting', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Baddha_konasana.jpg/110px-Baddha_konasana.jpg')," +
" ( default, 'Bakasana, Kakāsana', 'बकासन, ककासन', 'Crane (arms straight), Crow (arms bent)', 'Balancing', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bakasana_Yoga-Asana_Nina-Mel.jpg/110px-Bakasana_Yoga-Asana_Nina-Mel.jpg')," +
" ( default, 'Balasana', 'बालासन', 'Child', 'Sitting', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Balasana.JPG/110px-Balasana.JPG')," +
" ( default, 'Bhairavasana Ankushasana', 'भैरवासन अण्कुशासन', 'Formidable', 'Reclining', 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ankusasana_from_Sritattvanidhi_%28cropped%29.jpg/110px-Ankusasana_from_Sritattvanidhi_%28cropped%29.jpg')," +
" ( default, 'Bharadvajasana', 'भरद्वाजासन', 'Bharadvaja''s twist', 'Twist', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Bharadvajasana1_%28cropped%29.JPG/90px-Bharadvajasana1_%28cropped%29.JPG');" +



" INSERT INTO" +
" Users" +
" VALUES " +
" ( default, 'clara', 'clara@gmail.com', 'psw');" +

" INSERT INTO" +
" Routines" +
" VALUES " +
" ( default, 'test 1', 'test routine', 1);" +

" INSERT INTO" +
" UserAsanas" +
" VALUES " +
" ( default, 1, 3, 1 )," + 
" ( default, 1, 4, 1 )," + 
" ( default, 1, 5, 1 );";



module.exports = {
    schema: schema,
    seed: seed
};