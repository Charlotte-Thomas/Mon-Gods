# Project 3: A MERN Stack App

by Charlotte Thomas, Awal Yusuf, Cuong Tran and [Abi James](https://github.com/ajames14)

[Link to final project](https://git.heroku.com/project-3-swell.git)

## Overview

For our third project on the General Assembly Software Engineering bootcamp, we were tasked with building a full-stack application, using our own front-end and back-end. This was a group project and we had 7 days to deliver our application. 

### The Final Product 

We decided to create a surfing website, "Swell", focused on providing information and advice on the best places to surf globally. We wanted to create a "tripadvisor" for surfing and make our website a social network, as well as informational. 

Swell gives users the ability to:
 
- Search for surf destinations around the world, filtering by country, difficulty, user rating or by selecting pins on a world map.
- Find out essential information on each surf spot, such as location, a description, the type of wave, difficulty, the weather and surf conditions and the average user rating. Each surf spot also has a comments section where registered users can leave comments and advice for other surfers. 
- Create a profile. Once a user had registered, they can add surf spots to their favourites list, comment on surf destinations, and even upload new surf spots to the database (with approval - see below). They can view their favourites and pending uploads via their profile page, where they can also upload or change their profile picture. 
- Lastly, a registered user can upload a surf spot to share with other surfers, however, to control the quality of these, the administators of the site (us!) have to approve these before they are added to the database and displayed. We can see these when we login as the admin, and have a button to approve. 


## Brief 

The project brief:

- Work in a team, using git to code collaboratively.
- Build a full-stack application by making your own backend and your own front-end
- Use an Express API to serve your data from a Mongo database
- Consume your API with a separate front-end built with React
- Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
- Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which you can cut
- Have a visually impressive design.
- Be deployed online so it's publicly accessible.

## Technologies Used

**Front End**: 

- React.js
- SCSS
- Axios
- Bulma
- ReactRouter
- Reach Lazy Hero
- Moment
- Mapbox
- Stormglass

**Back End**

- Node.js
- Express
- Bcrypt
- JsonWebToken
- MongoDB
- Mongoose
- Insomnia


## Approach Taken 

### Building the Back-End

Once we had decided on the features and theme of our website, we started by building the back-end together. We did this as a team so that all members could gain experience using mongo and express and have a full understanding of how the back-end was programmed, to make it easier when building the front-end. 

Firstly, we created seeds for our database with 50+ surf spots and an admin user and built the schemas. We had 4 schemas in total:

- User Schema: for registration, login and user favourites.
- Spot Schema: for displaying and creating new surf spots.
- Comment Schema: for user comments.
- Rating Schema: for user ratings.

We set up our routing logic, controller functions and body parser middleware to better handle the body of api requests and responses. We also set up a secure route function using JsonWebToken, so that only registered and logged in users can post/put/delete. 

Within our User model, we also used Bcrypt to encrypt a user's password before the user is saved to the database, increasing the security of our API:

```
userSchema
  .pre('save',  function hashPassword(next) { 
    if (this.isModified('password')) { 
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8)) 
    }
    next() 
  })
```


### The Front-End

For the front-end, we split the functionality logic amongst oursevlves, each choosing different components to work on. Despite splitting the work, we still helped each other whenever a team member needed a fresh perspective or was struggling on a piece of logic. It was a combination of solo, group and pair programming.

#### Components: 

**Homepage**

![Homepage](/frontend/src/images/readme-images/Homepage.png)

The homepage has two sections, a hero page with a "Start Searching" button linking to the second section, the search page, which has a search bar and a map with markers and popups for the different spots in our database. The search bar allows you to search destination by country, linking to the country's page, and each popup links you to the individual destination spots. 

Here we used MapBox for the maps and Lazy Hero for the hero styling. 

![Map](/frontend/src/images/readme-images/Map.png)

**Spots By Country**

Once the user has clicked on a country they are interested in, the country page provides an overview of the spots in the country and allows the user to filter by level, user rating and provides a general search bar.

![Country Page](/frontend/src/images/readme-images/Country-page.png)

![Country Page 2](/frontend/src/images/readme-images/Country-page-2.png)

**Single Surf Spot Page**

Each surfing destination has its own page were we pull key information from our seed data to display on the page. In order to do this, we made use of React Hooks, fetching the data to be rendered using 'use effect': 

```
 useEffect(() => {
  fetch(`/api/spots/${props.match.params.id}`)
   .then(resp => resp.json())
   .then(resp =>
​    setData(resp)  )
   .then(createRating())
   .then(axios.get('/api/profile', {
​    headers: { Authorization: `Bearer ${Auth.getToken()}` }
   })
​    .then((resp) => {
​     setName(resp.data.username)
​    }))
  return () => console.log('Unmounting component')
 }, [rating])
 let response = {}
```

We display a mini surf map which we created as a component in our app and embedded it to be rendered  into our single page. The map takes in a longitude and latitude which was seeded in our data in order to display the markers on our map. 

Another component displayed is our weather forecast chart which also takes in a longittude and latitude from our seeded data. We use the stormglass API for our chart and chose a single source for our data. We use hooks in our components so we can pass a long and lat when rendering in our single page. 

This page also included the comments section were registered users can post comments and delete their own previous comments. A user also rates the spot here, and can see the average user rating displayed by the wave images. 

>>> INSERT SCREENSHOTS

**Share A Spot**

Here, registered users are allowed to upload a new surfing spot they might have discovered and not yet on our website. This helps increase the number of destinations on our website and make users feel part of the building process of the website. 


![Upload-spot](/frontend/src/images/readme-images/Upload-spot.png)


**Profile Page**

We also have a profile page were users can upload a photo, see all their favorite surfing spots and view surf spots they have created, and those still pending approval.

![Profile-1](/frontend/src/images/readme-images/Profile-1.png)
![Profile-2](/frontend/src/images/readme-images/Profile-2.png)

**Bugs**

- .....


## Challenges

- Mapbox: Working with mapbox posed a bit of a challenge due to data conversation. Mapbox is data strict and fetching our data from our api required a lot of refactoring in order to suit the data format especially for the longtitude and lattitude. Next time, we would rather use a GeoJson file and insert our data into it than fetching directly from our API. 
- ... ADD MORE

## Wins

- Rating and Comments: Calculating and displaying the ratings for the individual surf spots was a big win. Creating the logic for the comments section, including setting up authorization for posting and deleting posts.
- Mapbox: getting the surf spots to display on the large and small maps using our seed data. 
- Weather Conditions: Using the Stormglass API and displaying the data using circular charts was also an achievement. 


## Future Features

We were happy with the overall funcionality of our website, however, there were a few things that we would have added. In particular:

- When a user adds a new spot, provide functionality so that they can upload a beach/spot name to identify the location, rather than te longitude and latitude (as this is a bit cumbersome or users). 
- We would have expanded the seed database to include more spots around the world. 



