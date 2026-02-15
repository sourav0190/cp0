1️⃣ Title & Value Proposition
Flavor Twin (Foodoscope)

Flavor Twin is a computational gastronomy platform that maps dishes using 10-Dimensional Flavor Vectors, enabling users to:

🔎 Discover similar dishes across cuisines

🌎 Translate flavors between cultures

🧠 Explore scientifically validated ingredient pairings

⚡ Analyze food through vector intelligence

Tagline:

The Google Maps for Flavor.

2️⃣ Key Features (Expanded & Technical)
🍜 1. Flavor Twin Engine

Uses Cosine Similarity on a structured 10-Dimensional Flavor Vector:

Dimension	Description
Sweet	Natural sugar profile
Sour	Acidic intensity
Salty	Sodium depth
Bitter	Alkaloid presence
Umami	Glutamate richness
Fat	Lipid density
Heat	Capsaicin index
Aroma	Volatile compound strength
Texture	Crunch/Softness scale
Complexity	Ingredient entropy score
How it Works:

Convert dish → vector

Normalize

Compute cosine similarity

Rank nearest neighbors

Result:

Mexican Tacos ↔ Indian Kathi Roll (Flavor Twin match score: 0.87)

🌍 2. Food Translator

Cross-Cuisine Mapping Logic:

Example:

Mexican Taco → Indian Kathi Roll
Japanese Ramen → Indian Thukpa
Italian Bruschetta → Indian Papdi Chaat


Mechanism:

Compare vectors

Replace culturally equivalent ingredients

Maintain flavor integrity

🔬 3. Flavor Parallels (Scientific Pairing Engine)

Powered by data from:

IIIT Delhi FlavorDB Research

FlavorDB

Uses shared volatile compound analysis to suggest pairings:

Example:

Strawberry + Basil

Chocolate + Chili

Mango + Black Pepper

🧠 4. Intelligence Console (Developer Mode)

Built for:

Debugging flavor vectors

Viewing similarity heatmaps

Comparing raw vector distances

Monitoring API latency

Perfect for:

Hackathon demos

Research presentations

ML model testing

3️⃣ Tech Stack (Professional Format)
Frontend

React

Vite

Tailwind CSS

Framer Motion

Data Sources

RecipeDB (API)

FlavorDB (Scraped + API)

Local JSON Vector Universe

Core Logic

Cosine Similarity

Vector Normalization

Multi-dimensional Distance Ranking

Ingredient Compound Matching

Optional Future ML

KNN clustering

Embedding projection (t-SNE)

Graph-based flavor network

4️⃣ Setup & Installation
🔧 Prerequisites

Node.js ≥ 18

npm or yarn

📦 Installation
git clone https://github.com/yourusername/flavor-twin.git
cd flavor-twin
npm install

🚀 Run Development Server
npm run dev


Open:

http://localhost:5173

🔐 Environment Variables

Create .env file:

VITE_FOODOSCOPE_API_KEY=your_api_key_here

5️⃣ API Reference (Brief & Clean)
Foodoscope API
https://api.foodoscope.com

FlavorDB Research API
https://cosylab.iiitd.edu.in/flavordb

Sample Endpoint
GET /dish/vector/:dishName


Response:

{
  "sweet": 0.3,
  "sour": 0.1,
  "umami": 0.8,
  ...
}

6️⃣ Architecture Overview (Add This — Makes It Premium)
User Input → Vectorization Engine → Similarity Calculator → Ranked Output
                         ↓
                  FlavorDB Pairing Layer

7️⃣ Use Cases

🍽️ Travelers exploring local cuisine

🧑‍🍳 Chefs creating fusion menus

📊 Food researchers

🌎 Cultural exploration tools

🏆 Hackathon innovation demos


