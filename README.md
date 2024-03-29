
# Virtual Art Gallery - ArtVista

After the pandemic, art galleries are struggling with declining interest and engagement. We developed a virtual gallery which allows users to view an art gallery from wherever they are. Additionally, it allows budding artists to generate an audience as the gallery will be open to all participants. Furthermore, users will be able to leave comments on art pieces, and will be able to ‘like’ art that they found particularly engaging/inspiring etc. which will then be featured.

## Demo

https://artvista-o532.onrender.com/

**Stakeholders** - Artists, users, Existing curators, Journalists 

**MVP Reqs**: Upload page, User Page, Authentication, Home Page, Art List Page, individual art page with details + comments, featured art page 
**Stretch Goals:** AI Image generation (in its own section), tips for artists (monetary), ability to find similar art pieces using image recognition (this will be a slog to code), Buy art pieces 


## Tech Stack

**Client:** React.js, HTML, CSS
 
**Server:** Node.js, Express, Google Cloud Service, SQL

**Testing**: Vitest, Jest

## Run Locally

Clone the project

```bash
  git clone github.com:olliebalabil/ArtVista.git
```

Go to the project directory

```bash
  cd ArtVista
```
### Set up database
In a .env file, add your DB_URL variable. You must also make adjustments for your Google Cloud Storage bucket.
- Change the necessary, url's, keyFilenames, projectIds and bucketNames in server/models/Art.js and server/models/Users.js.
- Create a service_account_key.json file in the server folder.
```bash
  npm run setup-db
```
### Running Server
To run server, run the following command

cd in the server folder:

```bash
  npm install
  npm run dev
```

### Running Client
To run client, run the following command

cd in the client folder:

```bash
  npm install
  npm run dev
```

### Running Tests

To run tests, run the following command

cd in the client folder:

```bash
  npm run test
```

cd in the server folder:

```bash
  npm run test
```


## Authors

- [@JamesThreadgill97](https://github.com/JamesThreadgill97)
- [@KWhitfieldHull](https://github.com/KWhitfieldHull)
- [@BeeVanZyl](https://www.github.com/BeeVanZyl)
- [@olliebalabil](https://www.github.com/olliebalabil)
- [@Karinahrens](https://www.github.com/Karinahrens)


