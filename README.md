# English Online Testing

EOT (English Online Testing) is an app for people who wants to take their knowledge of grammars and vocabularies into the test. Here they will face countless of questions that demand answer from easy to hard.

Basic functionality:
- Role based: User and Admin
- Create, delete, modify exam (admin only)
- Sign up
- Log in/out
- Modify profile
- Take exam
- See history

In app language: Vietnamese

### Application Structure: MVC
In projects folder, there are 3 sub folders with name following:
- lib: contains models, utility functions, shared code,... for both server and client app can use.
- server: connects to database, handles API and business logic
- user-app: displays user interface, sends request to server, receives response and reacts the view corresponding to the new data

### Technologies:
- Front-end: Angular 7
- Back-end: Node, Express, MongoDb
- Testing: Mocha and Chai
- UI/UX: Bootstrap 4 and Angular Material
- Languages: Typescript, HTML, CSS
