# IC Dugout

IC Dugout is a central place for all Lady Blue related content. See upcoming games, view current scores, and look at stats in one centeralized place!

## Technologies Used
Typescript (Typechecking)

NextJS (Front and Backend Server)

Jest (Testing)

Vercel (Deployment)

## Design Patterns
### Lazy Initialization
This project utilizies the power of Next.js by allowing lazy initaliztion on almost every component. Everything is rendered on demand, except for some select components that benifit from...

### Server Side Rendering
This complements lazy initalization by allowing static webpages to be precompiled before they are sent, improving loading times and leading to an improved user experience

## Available routes and features
### / (home)
This is a home page, complete with an action shot and a link to the schedule
### /schedule
A live updating schedule, showing all games coming up (or live!) on the lady blues schedule
### /score
A (WIP) page that displays individual game details, allowing users to look at the details of any game
### /stats
A page which displays the record and stats of the lady blues. Although currently lacking on stats, it has all completed games present
### /login
A page to log in to an account
### /register
A page to register an account
### /member
An exclusive members only page that contains an inside scoop of some player

## API documentation and dependencies
### NCAA API
This application uses a community managed NCAA Api, documented here https://ncaa-api.henrygd.me/openapi
### Webscraper
Currently, the website is scraping illinoiscollegeatheletics.com for schedule information due to shortcomings on the other API. It is unknown of this is a permanent solution or not

## Instructions
Accessing this application is simple! Just visit the link below!

https://vercel.com/lukes-projects-28faa35c/ic-dugout/ALtM6S5F4p4gPT6Hda3a1TKduUQS

If you want to access the exclusive member page, you will need to login (or register!) to be able to access the content. Click the login button at the top right to get started

## Known Issues
The following are known issues that I plan on addressing for the final project
- The Score and Stats page are a little slow to load. This is an issue with Vercel not supporting caching
## Future plans
- More pages with more detail
- Expanded caching strategies for faster loading times
- Additional styling improvements
