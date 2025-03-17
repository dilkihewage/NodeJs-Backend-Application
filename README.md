# Node.js Weather Notification API

## Objective
This Node.js API stores users' emails and locations, fetches weather data every 3 hours, and sends hourly weather reports to users via email.

## Features
- Store and update user details (email & location)
- Fetch weather data from OpenWeatherMap API
- Store weather data in MongoDB
- Retrieve weather data for a given day
- Send automated weather reports via email every 3 hours
- Generate weather descriptions using OpenAI/Gemini API
- Convert coordinates to city names using Google Cloud
- Deployable on Vercel, AWS, or other cloud platforms

## Tech Stack
- **Node.js** (Backend)
- **Express.js** (Web Framework)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **OpenWeatherMap API** (Weather Data)
- **Nodemailer** (Email Service)
- **OpenAI/Gemini API** (Weather Description Generation)
- **Google Cloud API** (Geocoding)
- **Postman** (API Testing)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB (local or cloud-based, e.g., MongoDB Atlas)

### Clone Repository
```sh
git clone https://github.com/your-repo/weather-api.git
cd weather-api
```

### Install Dependencies
```sh
npm install
```

### Configure Environment Variables
Create a `.env` file and add:
```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweathermap_api_key
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
OPENAI_API_KEY=your_openai_api_key
```

### Start the Server
```sh
npm start
```

## API Endpoints
| Method | Endpoint            | Description |
|--------|--------------------|-------------|
| POST   | /users             | Add a new user (email & location) |
| PATCH  | /users/:id         | Update user's location |
| GET    | /weather/:date     | Get weather data for a specific day |

## Automating Weather Reports
The server runs a cron job that:
- Fetches weather data every 3 hours
- Generates a text summary using OpenAI/Gemini API
- Sends an email report to each user

## Deployment Guide
### Deploy on Vercel
1. Install Vercel CLI:
   ```sh
   npm install -g vercel
   ```
2. Deploy:
   ```sh
   vercel
   ```

### Deploy on AWS
#### Services Used:
- **EC2** (for hosting the server)
- **S3** (for storing logs, if needed)
- **SES** (for sending emails)
- **Lambda + CloudWatch** (optional for scheduled tasks)

#### Steps:
1. Create an EC2 instance and SSH into it.
2. Install Node.js and MongoDB.
3. Clone the repository.
4. Install dependencies and configure `.env`.
5. Run the application using **PM2**:
   ```sh
   pm2 start server.js --name weather-api
   ```
6. Configure an AWS SES account for sending emails.

## Testing with Postman
Import the provided Postman API collection to test endpoints.

## License
This project is open-source under the MIT License.

