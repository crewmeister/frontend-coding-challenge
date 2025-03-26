<p align="center">
  <img src="https://crewmeister.com/images/logo_crewmeister_without_text.svg" />
</p>

# 🚀 Crewmeister coding challenge - Frontend (Flutter)

Hello and thanks in participating in the crewmeister coding challenge. This coding exercise will help us get a better feeling about your coding process.

If you have any questions, we're happy to help you. Reach the devs at challenge@crewmeister.com.

## Context

At Crewmeister we like to work closely with our clients, listening to their demands and developing solutions for their problems. One of the most requested features is a way for company owners to manage sickness and vacations of employees.

We decided to implement this feature for our clients and we are calling it the Absence Manager.

## Product Requirements

- [ ] I want to see a list of absences including the names of the employees.
- [ ] I want to see the first 10 absences, with the ability to paginate.
- [ ] I want to see a total number of absences.
- [ ] For each absence I want to see:
  - [ ] Member name
  - [ ] Type of absence
  - [ ] Period
  - [ ] Member note (when available)
  - [ ] Status (can be 'Requested', 'Confirmed' or 'Rejected')
  - [ ] Admitter note (when available)
- [ ] I want to filter absences by type.
- [ ] I want to filter absences by date.
- [ ] I want to see a loading state until the list is available.
- [ ] I want to see an error state if the list is unavailable.
- [ ] I want to see an empty state if there are no results.
- [ ] (Bonus) I can generate an iCal file and import it into outlook.

## Your Mission

Create the Flutter application that satisfies all must-have requirements above, plus any nice-to-have requirements you wish to include.

We provided a couple of JSON files with the mock data necessary to implement the screens, you can use the files straight into the app using the mock methods provided in this repository or create a small separate API (bonus), it's your choice.

We encourage you to use your favorite tools and packages to build a solid Flutter application.

Optional: build the project and deploy (ie make it available as a static project) on Github Pages, otherwise please provide detailed instructions on how to start the project locally.

## Tech Requirements

- Flutter
- Tests: flutter_test library
- Code Linter
- Using a state management approach (BLoC, Redux etc) is a plus.

## Instructions

- Clone this repo.
- The challenge is on!
- Build a performant, clean and well-structured solution.
- Commit early and often. We want to be able to check your progress.
- Include a README with instructions on how to run your project.
- Please complete your working solution within 7 days of receiving this challenge.
- Whenever you're done please deliver the project following the instructions below.

We'll review your submission as soon as possible. Key-points we're going to review:

- Naming (files, functions, widgets, ...).
- Tests.
- Code structure, readability, performance and consistency.
- function and widget lengths.
- Commits + commit messages.
- Clean code.
- Good documentation and README instructions.

An essential part of the challenge is also coming up with your own solutions and making reasonable assumptions about the implementation of the acceptance criteria.

## Project delivery instructions

To submit the project for evaluation please follow the steps below:

- Create a **public** repo on your personal Github.
- Add the new repo as a _remote_ on your local repo.
- Push your code to your new remote repo.
- Provide the link to your GitHub repository in the Greenhouse submission form.
- Submit your completed project via the Greenhouse link in the email received from the Recruitment Manager.


## That's it!

Happy coding!

<img src="https://user-images.githubusercontent.com/5693916/30273942-84252588-96fb-11e7-9420-5516b92cb1f7.gif" data-canonical-src="https://user-images.githubusercontent.com/5693916/30273942-84252588-96fb-11e7-9420-5516b92cb1f7.gif" width="150" height="150" />

## Setup, Running, Tesing and Deployment Guides

### Client Application
Follow `absence-manager-client/README.md`

### API
Follow `api/README.md`