// import passport from "passport";
// import {Strategy as GoogleStrategy} from 'passport-google-oauth20';
//
// passport.serializeUser((user, done) => {
//     // @ts-ignore
//     done(null, user.id);
// });
//
// passport.deserializeUser((id, done) => {
//     console.log(`deserialize ${id}`);
//
//     // @ts-ignore
//     done(null, id);
// });
//
// passport.use(new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID || "",
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//         callbackURL: "https://localhost:8081/auth/google/callback"
//     },
//     async function(accessToken, refreshToken, profile, done) {
//         console.log(profile);
//         done(null, profile);
//     }
// ));