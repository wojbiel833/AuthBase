const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const process = require("../nodemon.json");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.clientID,
      clientSecret: process.env.clientSecret,
      callbackURL: process.env.callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      done(null, profile);
      // console.log(profile);
    }
  )
);

// serialize user when saving to session
passport.serializeUser((user, serialize) => {
  serialize(null, user);
});

// deserialize user when reading from session
passport.deserializeUser((obj, deserialize) => {
  deserialize(null, obj);
});

// Gdy zaimportujemy plik, to jeśli jest w nim jakiś "luźny" kod (a więc nieschowany w funkcji czy obiekcie), zostanie on automatycznie skompilowany. To prawie tak samo, jak przy ładowaniu plików JS w HTML-u za pomocą tagu <script>. Wystarczyło dodać odpowiedni tag z dobrą ścieżką do pliku i po wejściu na stronę, kod wewnątrz niego automatycznie się kompilował.

// Node.js daje nam możliwość eksportowania funkcji czy obiektów i importowania ich potem pod odpowiednią nazwą, ale to tylko przydatna funkcjonalność, a nie wymóg.

// Pojawia się więc pytanie, dlaczego w takim razie tak chętnie korzystamy z idei eksportów? Odpowiedź jest prosta. Daje nam to możliwość czytelnego przypisania jakichś funkcjonalności (lub danych) do stałych i wykorzystania ich potem w dalszym kodzie, w miejscu, gdzie jest to nam potrzebne.

// Tymczasem w przypadku ładowania bez eksportu, wykonywanie tego "luźnego" kodu następuje od razu w miejscu, gdzie ten plik jest zaimportowany (więc w miejscu wywołania require). W większości sytuacji byłaby to ogromna wada, nie wspominając już o zwyczajnie gorszej czytelności.

// Zauważ, że gdy ktoś wejdzie do naszego server.js, nie jest w stanie od razu stwierdzić, do czego w ogóle jest nam potrzebny plik config/passport. Można to sprawdzić dopiero po wejściu do tego pliku. Często wolimy postawić więc na większą przejrzystość.

// Podsumowując, gdy używamy require wcale nie musimy korzystać z idei eksportów, lecz najczęściej będzie to zwyczajnie lepszym pomysłem – czytelniejszym i bardziej funkcjonalnym.
