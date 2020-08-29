const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "contasena",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      
      const rows = await pool.query("SELECT idUsuario AS id, usuario, contasena FROM taUsuarios WHERE usuario = ?", [
        username
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.contasena
        );
        //console.log(user);
        if (validPassword) {
          done(null, user, req.flash("success", "Bienvenido " + user.usuario));
        } else {
          done(null, false, req.flash("message", "Contrañena Incorrecta"));
        }
      } else {
        return done(null, false, req.flash("message", "El Usuario no Existe."));
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "usuario",
      passwordField: "contasena",
      passReqToCallback: true
    },
    async (req, username, password, done) => {

      let newUser = {
        usuario : username,
        contasena : password
      };

      newUser.contasena = await helpers.encryptPassword(password);
      // Saving in the Database
      const result = await pool.query("INSERT INTO taUsuarios  SET ? ", newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM taUsuarios WHERE idUsuario = ?", [id]);
  done(null, rows[0]);
});