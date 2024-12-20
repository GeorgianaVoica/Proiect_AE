Aplicația dezvoltata este un sistem de gestionare a unui magazin online similar cu Tesco, care permite utilizatorilor să cumpere o gamă variată de produse, inclusiv mobilă, parfumuri, machiaje și alimente. 
Utilizatorii pot naviga prin produse, adăuga articole în coș, plasa comenzi și alege modalitatea de plată. Aplicația oferă un flux complet și reușește să prezinte caracteristicile esențiale ale unui destinate comerțului electronic.
Tehnologiile utilizate au fost:

1. Frontend:
•	React.js: Framework JavaScript pentru construirea interfeței utilizator (UI) a aplicației.
o	useState și useEffect pentru gestionarea stării și efectelor laterale.
o	React Router pentru navigarea între diferitele pagini ale aplicației.
o	Redux (sau context API) pentru gestionarea globală a stării aplicației, în special pentru coșul de cumpărături.
•	CSS:
o	Folosirea de CSS simplu pentru stilizarea aplicației.
•	Axios: Librărie pentru efectuarea cererilor HTTP către backend (server) pentru operații precum logarea, înregistrarea și plasarea comenzilor.
•	localStorage pentru persistenta cosului
2. Backend:
•	Node.js: Un mediu de execuție JavaScript pentru server, utilizat pentru a rula aplicația backend.
•	Express.js: Framework pentru construirea de aplicații web în Node.js, utilizat pentru a crea rutele serverului (pentru autentificare, gestionarea comenzilor, etc).
•	Sequelize.js: ORM (Object-Relational Mapping) pentru interacționarea cu baza de date SQL 
•	Baza de date: SQLite (pentru dezvoltare) 
•	JWT (JSON Web Token): Tehnologie pentru autentificare și autorizare pe server (gestionarea sesiunii utilizatorilor autentificați).
•	Bcrypt.js: Folosit pentru criptarea parolelor utilizatorilor (pentru siguranța datelor de login).
•	dotenv: Utilizat pentru gestionarea variabilelor de mediu (de exemplu pentru secretul JWT, parole și alte date sensibile).
•	CORS: Middleware pentru a gestiona permisiunile de cross-origin resource sharing, pentru a permite cereri din frontend către backend.
•	morgan: Middleware pentru logarea cererilor HTTP pentru debugging și monitorizarea serverului.

Pentru pornirea aplicației am instalat pachetele:
	Npm init
	Npm I dotenv
	Npm i install
	Server -> npm I express
	Client -> npm i
	npm install sqlite3 sequelize
	npm i bcrypt
	npm i jsonwebtoken
	npm start
	npm install react-router-dom
	npm install @reduxjs/toolkit react-redux
	npm i cors
	npm install axios

INSTRUCȚIUNI PORNIRE APLICAȚIE
Pentru partea de client:
- npm start (deoarece am folosit React)
- VITE_REACT_APP_API_URL=http://localhost:3000 (setare in .env)
-VITE_DUMMY_API_URL=https://dummyjson.com/products (setare in .env)
Pentru server:
-npm run dev (pentru a se reîncărca automat proiectul și pentru a nu mai rula de fiecare dată node index.js)
- PORT=5000 (setare in .env)
-BCRYPT_SALT =10 (setare in .env)
-JWT_SECRET=fjbwewehw8873us (setare in .env)


