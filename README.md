# SnapFolio

 -> API Endpoints <-

    authenticate : PASSPORTJS
        - INPUT : USERNAME, PASSWORD
        - Strategy : Local, [Facebook]

    - POST /signup (name, age, username, password)
    - POST /login 
    - GET /login
    - GET /SignUp

 
----------------------------------------------
    Add media to your profile

    - POST /uploadPhoto - (upload photo, caption, tags, location)
    - GET /photos - (retrieve all photos)
    - GET /photos?{photoid} - (retrive single photo)
    - POST /photo?{photoid} - (update details of photo)
    - GET /delete/photo?{photoid} - (delete photo)

-----------------------------------------------
    User Profile

    - GET /users/{userId} - Get a user's profile and photo gallery.
    - POST update/users/{userId} - Update user profile information.
    - GET /users/{userId}/followers - List followers of a user.
    - GET /users/{userId}/following - List users a user is following.
    - POST /users/{userId}/follow - Follow a user.
    - POST /users/{userId}/unfollow - Unfollow a user.

------------------------------------------------
    Likes

    - POST /photos/{photoid}/likes - ( Like a photo)
    - GET  /photos/likes?{photoId} - (get likes of a photo)

-------------------------------------------------
    Search

    - GET /search?={user,tag,location} - (search photos)


    - GET /home :
        - latest 20 posts of users i follow


    - GET /trending : 
        - Top 20 posts 