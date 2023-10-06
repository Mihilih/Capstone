## Distinctiveness and Complexity

-   Uses JavaScript to create activities for users

-   Uses speech synthesis

-   Completely mobile responsive

-   Allows users to comment under posts in the community section

-   Uses alert to notify the user of a change in the database

-   Renders the error page when an error occurs within the JavaScript code

-   Contains 7 Django models and 3 JavaScript files with 7 functions

## Files and Directories

-   `final`

  -   `static/final`

      -   `community.js` - JavaScript related to the community page

      -   `activities.js` - JavaScript related to the 3 activities

      -   `video.js` - JavaScript related to the videos page

      -   `styles.css` - CSS code

  -   `templates/final`

      -   `activity2.html` , `activity3.html` , `activity3.html` - the three activities

      -   `activitylist.html` - page with all the activities

      -   `article.html` - page with one article

      -   `articles.html` - page with all articles

      -   `community.html` - page with all user posts

      -   `error.html` - page that gets rendered when there's an error

      -   `index.html`- index page

      -   layout.html - layout of the web app

      -   `login.html` , `register.html` - log in and register

      -   `newarticle.html` , `newresources.html` , `newvideo.html` - forms for users to add more articles, resources, and videos

      -   `profile.html` - user profile with their points

      -   `resources.html` - page with all the resource

      -   `video.html` - page with all videos

  -   `admin.py` - contains 7 admin classes

  -   `models.py` - contains 7 models

  -   `requirements.txt` - contains 2 requirements

  -   `urls.py` - contains all the URLs of the web app

  -   `views.py` - contains all the application views

## How to Run

-   This is a web app for parents and teachers of children from age 5 to 10

 -   The 'activities' page renders 3 activities

      -   Activity 1

            -   users can type in up to 50 words they want their child to be tested on

            -   Then the child can listen to each word and type in what they hear

            -   If the child gets any questions wrong, the corrections will be displayed with the points

      -   Activity 2 

            -   Users can select what category they want their child to be tested on, how many questions they want the range of numbers, and whether or not the answers can be negative

            -   Then the child can solve the math problems displayed and submit

            -   Any corrections will be shown with the points

      -   Activity 3

            -   Users can select how many questions they want

            -   Then squares with colors will be displayed and the child can choose what colors they are from a list of colors

-   The 'videos' page renders a page with all videos. Users can clock on a title and the video will be displayed

    -   If users want to add a new video, they should click on the link at the bottom of the videos page and add all the required details to the form

-   The 'blog' page renders all the articles created by users. By clicking on 'read the article' users can read the whole article

    -   If users want to add a new article, they should click on the link at the button of the 'articles' page and add all the required details to the form. The link 'Convert your article into MarkDown' opens up a website that converts text content into MarkDown

-   The 'resources' page renders all the resources separated into 3 categories: teachers, parents, and students. By clicking on any link users will be taken to the specific resource

-   The 'community' page renders all the postscreated by users. Users can add posts using the form at the top of the page, edit their own posts and comment under any post using the buttons under each post

-   By clicking on the user name the user will be taken to their profile page that displays the total points they have

    -   If they obtain 100, 500, or 1000 marks they become bronze, silver, or gold students respectively

    -   The backgroud of the page changes accordingly
    
    -   If they obtain any of these marks when they’re doing an activity, they will be notified using an alert
    
-   By clicking on the logo “ScHooLSTeR’ users will be taken to the index page which displays the purpose of each page
