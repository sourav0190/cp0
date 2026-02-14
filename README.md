# Foodoscope: Molecular Recipe Orchestration 🧪🥘

This project was developed for a hackathon to provide a production-grade interface for the **Foodoscope API**. It utilizes a tri-endpoint orchestration strategy to bridge basic recipe searching with deep molecular insights and advanced nutritional profiles.

## Core Features (Live Tech Demo)
1.  **Recipe DNA Search**: Utilizes `recipe-bytitle` to identify recipe unique identifiers from a global database.
2.  **Molecular Deep-Dive**: Leverages `search-recipe` to unpack full ingredient lists and chemical/nutritional profiles for specific recipes.
3.  **Advanced Ingredient Discovery**: Pre-configured for `recipebyingredient` to allow complex discovery based on inclusive/exclusive ingredient filtering.

## Tech Stack
-   **Frontend**: React (Vite)
-   **Styling**: Custom Scientific Glassmorphism (Vanilla CSS)
-   **API Integration**: Production Gateway Orchestrator with Auth-Forwarding.
-   **Icons**: Lucide-React

## Production Credentials
The system is configured to work with `https://api.foodoscope.com` using secure environment variables for `ApiKey` and `Authorization` headers.

---
*Note: This repository has been archived. Core logic resides in the `src/services` orchestrator layer implemented during the sprint.*
