# Farcaster Cast Data Downloader

This project is a React-based web application that allows users to retrieve their Farcaster cast data by entering their username. The application queries the Dune Analytics API using the provided username, retrieves the cast data, and converts the result into a CSV file that can be downloaded.

## Features
- User inputs a Farcaster username through a form.
- The backend executes a Dune Analytics query to retrieve the cast data associated with the username.
- The results are converted into CSV format.
- The CSV file is automatically downloaded to the user's device.

## Technologies Used
- **Frontend**: React (with functional components and hooks)
- **Backend**: Next.js API route (`query.js`)
- **API Calls**: Axios for sending HTTP requests to both the Dune API and the custom backend.
- **Dune API**: Uses Dune’s free API key for query execution and fetching results.

## Getting Started

### Prerequisites
- Node.js and npm (or yarn) installed.
- Dune Analytics API Key (Free tier is acceptable).

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/farcaster-cast-data-downloader.git
   cd farcaster-cast-data-downloader

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root directory and add your Dune API key:

   ```
   DUNE_API_KEY=your_dune_api_key_here
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser and navigate to `http://localhost:3000`**

## Usage

1. Enter a Farcaster username in the input field.
2. Click the "Get Results" button.
3. Wait for the query to process (this may take a few seconds).
4. Once complete, the CSV file will automatically download to your device.

## Project Structure

- `pages/index.js`: The main React component for the frontend.
- `pages/api/query.js`: The Next.js API route that handles the Dune API interaction.
- `README.md`: This file, containing project documentation.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to Dune Analytics for providing the API that makes this project possible.
- Shoutout to the Farcaster community for inspiring this tool.


