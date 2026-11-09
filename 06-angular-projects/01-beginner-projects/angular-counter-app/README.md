# Angular Counter App

A simple and responsive Counter Application built using modern Angular practices, TypeScript, and Angular Signals.

This project demonstrates Angular fundamentals including standalone components, property binding, event binding, reactive state management, and component-based architecture.

## Features

- Increment counter
- Decrement counter
- Reset counter
- Prevent negative counter values
- Disable decrement button when counter reaches zero
- Reactive UI using Angular Signals
- Standalone component architecture
- OnPush change detection
- Responsive user interface

## Tech Stack

- Angular
- TypeScript
- HTML5
- CSS3
- Angular Signals
- Jasmine / Karma (unit testing, depending on project configuration)

## Project Structure

```text
angular-counter-app/
│
├── public/
│
├── src/
│   └── app/
│       ├── features/
│       │   └── counter/
│       │       ├── counter.ts
│       │       ├── counter.html
│       │       ├── counter.css
│       │       └── counter.spec.ts
│       │
│       ├── app.ts
│       ├── app.html
│       └── app.css
│
├── .gitignore
├── angular.json
├── package.json
├── package-lock.json
├── README.md
└── tsconfig.json
```

## Prerequisites

Make sure the following tools are installed:

- Node.js (LTS)
- npm
- Angular CLI

Verify installation:

```bash
node -v
npm -v
ng version
```

## Installation

Clone the repository:

```bash
git clone https://github.com/<your-username>/angular-counter-app.git
```

Navigate to the project:

```bash
cd angular-counter-app
```

Install dependencies:

```bash
npm install
```

## Run Application

Start the Angular development server:

```bash
ng serve
```

Open the application:

```text
http://localhost:4200
```

## Build

Generate a production build:

```bash
ng build
```

## Unit Testing

Execute unit tests:

```bash
ng test
```

## Angular Concepts Covered

| Concept                | Implementation                         |
| ---------------------- | -------------------------------------- |
| Components             | Standalone Counter component           |
| Interpolation          | Display counter value                  |
| Property Binding       | Disable button based on counter value  |
| Event Binding          | Increment, decrement and reset actions |
| Signals                | Reactive state management              |
| Change Detection       | OnPush strategy                        |
| Component Architecture | Feature-based folder structure         |
| Unit Testing           | Component behavior validation          |

## Learning Objectives

The primary objective of this project is to understand Angular fundamentals and establish a foundation for developing scalable Angular applications.

## Future Enhancements

- Custom increment/decrement step values
- Configurable minimum and maximum limits
- Persist counter value using localStorage
- Add dark mode
- Add counter history

## Author

Your Name

## License

This project is intended for learning and educational purposes.
