# IC Dugout

IC Dugout is a central place for all Lady Blue related content. See upcoming games, view current scores, and look at stats in one centeralized place!

## Technologies Used
Typescript (Typechecking)

NextJS (Front and Backend Server)

Jest (Testing)

Vercel (Deployment)

## Available routes and features
### / (home)
This is a home page, complete with an action shot and a link to the schedule
### /schedule
A live updating schedule, showing all games coming up (or live!) on the lady blues schedule
### /score
A (WIP) page that displays individual game details, allowing users to look at the details of any game
### /stats
A page which displays the record and stats of the lady blues. Although currently lacking on stats, it has all completed games present

## API documentation and dependencies
### NCAA API
This application uses a community managed NCAA Api, documented here https://ncaa-api.henrygd.me/openapi
### Webscraper
Currently, the website is scraping illinoiscollegeatheletics.com for schedule information due to shortcomings on the other API. It is unknown of this is a permanent solution or not

## Instructions
Accessing this application is simple! Just visit the link below!

https://vercel.com/lukes-projects-28faa35c/ic-dugout/ALtM6S5F4p4gPT6Hda3a1TKduUQS

## Known Issues
The following are known issues that I plan on addressing for the final project
- The “Score” page is hardcoded to only one score, this is an issue with integrating the webscraper and the NCAA Api
- The games on schedule and stats are not clickable for the same reason
- The hero looks a little wonky on desktop
## Future plans
- More stats on stats page
- Live updates on scores page, if possible
- Improved stylings, particularly with navigation
