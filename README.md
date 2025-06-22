# ANTIFRAGILE Stadium Website

This is the source code for [antifragilestadium.com](https://www.antifragilestadium.com)

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy the environment variables template:
```bash
cp .env.local.example .env.local
```

3. Add your Sanity credentials to `.env.local`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset
SANITY_API_READ_TOKEN=your_read_token
SANITY_API_WRITE_TOKEN=your_write_token
```

4. Run the development server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the site and [http://localhost:3000/studio](http://localhost:3000/studio) to access the CMS.
