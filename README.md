# VideoHelp-AI-FE
Transform any product page URL into stunning video advertisements with the power of AI. Create professional marketing videos in seconds.
VidCraft AI - URL to Video Generator
Transform any product page URL into stunning video advertisements using AI-powered technology.

🚀 Features
AI-Powered Video Generation: Convert product URLs into compelling video ads
Glassmorphism Design: Modern, elegant UI with beautiful glass effects
Real-time Progress Tracking: Watch your video being created step by step
Multiple Format Support: Works with Amazon, Shopify, and other e-commerce platforms
Instant Download: Get your generated video immediately
Responsive Design: Works perfectly on desktop and mobile devices
📋 Prerequisites
Before you begin, ensure you have the following installed:

Node.js (version 16.0 or higher)
npm (comes with Node.js)
Backend API running on port 8000 (see Backend Setup section)
🛠️ Installation
Clone the repository


git clone <repository-url>
cd vidcraft-ai
Install dependencies


npm install
Set up environment variables


cp .env.example .env.local
Update .env.local with your backend API URL:


BACKEND_API_URL=http://localhost:8000
Start the development server


npm run dev
Open your browser
Navigate to http://localhost:3000

🔧 Backend Setup
The frontend requires a backend API running on port 8000. Your backend should have the following endpoint:


@app.post("/generate-video/")
def generate_video(req: URLRequest):
    try:
        # 1. Scrape product info
        product_data = scrape_product_data(req.url)

        # 2. Normalize image field
        if "image" in product_data:
            product_data["images"] = [product_data["image"]]

        # 3. Generate script
        script, benefits = generate_ad_script(product_data)

        # 4. Create video
        filename = f"video_{uuid.uuid4()}.mp4"
        video_path = create_ad_video(product_data, script, benefits, filename)

        # 5. Return video file as downloadable response
        return FileResponse(
            path=video_path,
            media_type="video/mp4",
            filename=filename
        )

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
📁 Project Structure

vidcraft-ai/
├── app/
│   ├── api/
│   │   └── generate-video/
│   │       └── route.ts          # API route handler
│   ├── components/
│   │   ├── BackgroundEffects.tsx # Animated background
│   │   ├── Footer.tsx            # Footer component
│   │   ├── Header.tsx            # Header component
│   │   ├── SeeItInAction.tsx     # Video showcase section
│   │   ├── URLInput.tsx          # URL input form
│   │   ├── VideoGenerator.tsx    # Video generation progress
│   │   └── VideoPreview.tsx      # Video preview and download
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── public/
│   └── videos/                   # Placeholder videos
│       ├── video1.mp4
│       ├── video2.mp4
│       ├── video3.mp4
│       └── video4.mp4
├── .env.example                  # Environment variables template
├── .env.local                    # Local environment variables
├── next.config.js                # Next.js configuration
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
🎨 Design System
The application uses a glassmorphism design with:

Glass Cards: Semi-transparent cards with backdrop blur
Gradient Backgrounds: Animated gradient backgrounds
Floating Orbs: Animated background elements
Smooth Animations: Framer Motion powered animations
Responsive Layout: Mobile-first responsive design
🔄 Available Scripts
npm run dev - Start development server
npm run build - Build for production
npm run start - Start production server
npm run lint - Run ESLint
🌐 Environment Variables
Variable	Description	Default
BACKEND_API_URL	Backend API endpoint	http://localhost:8000
📱 Usage
Enter a Product URL: Paste any product page URL (Amazon, Shopify, etc.)
Generate Video: Click "Generate Video" to start the AI processing
Watch Progress: Monitor the real-time progress as your video is created
Download & Share: Once complete, download your video or share it directly
