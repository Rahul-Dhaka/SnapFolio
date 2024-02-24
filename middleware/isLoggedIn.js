module.exports.isLoggedIn = (req, res, next) => {
    if (req.session && req.session.user) {
        // User is logged in
        next();
    } else {
        // User is not logged in
        res.redirect('/login'); // Redirect to the login page or handle as needed
    }
};