Tarot Calculator App
This is a Tarot Calculator App built with React. The app allows multiple participants to answer a series of questions, calculate scores based on their answers, and sort participants into different Tarot categories based on their scores.

Features
Multiple participant support
Configurable Tarot affinities
Randomize and clear responses
Score calculation and error calculation
Displaying Tarot icons with different affinity levels
Dynamic participant naming
Detailed results summary
Installation
Clone the repository:
bash
Copy code
git clone https://github.com/shardic-er/TarotCalculator.git
cd TarotCalculator
Install the dependencies:
bash
Copy code
npm install
Run the app:
bash
Copy code
npm start
Deployment
To deploy the app to GitHub Pages:

Ensure the homepage field in package.json is set to "https://<your-username>.github.io/TarotCalculator"

Build and deploy the app:

bash
Copy code
npm run deploy
Usage
Main Components
ParticipantsTabs: The main component that handles multiple participants, their responses, and the results.
Questionnaire: Handles the display and interaction of the questions and their answer options.
ParticipantsResultsTable: Displays the results summary for all participants.
DisplayImpression: Displays the Tarot icons with their affinity levels.
Configuration
Tarot Affinities
Tarot affinities can be configured dynamically through checkboxes available below the participant's name input field. The affinities available are:

ANTI (-5)
NONE (0)
SLIGHT (1)
MODERATE (3)
STRONG (7)
Dynamic Participant Names
Participants can be given dynamic names using the input field provided. These names are reflected across the app, including the results summary.

Controls
Submit: Submits the current responses for a participant.
Randomize: Randomizes the responses for a participant.
Clear: Clears the responses for a participant.
Score All: Scores all participants based on their current responses.
Randomize All: Randomizes the responses for all participants.
Sort: Sorts participants into Tarot categories based on their scores.
Project Structure
src/
components/
participants_tabs/
questionare/
participants_results_table/
display_impression/
results_table/
common/
interfaces.ts
enum.ts
data/
question_data.ts
catagory_data.ts
icons/ (Contains SVG icons for each Tarot category)
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/fooBar)
Commit your changes (git commit -am 'Add some fooBar')
Push to the branch (git push origin feature/fooBar)
Create a new Pull Request
License

This project is licensed under the MIT License.

