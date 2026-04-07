# 🎯 Brand Experience Assessment - Deployment Guide

Your quiz is ready to go live! Follow these steps to deploy to Vercel and configure Formspree + Google Analytics.

## 📋 Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free)
2. A [Formspree account](https://formspree.io/register) (free)
3. A [Google Analytics account](https://analytics.google.com/) (free)

---

## 🚀 Step 1: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```

2. From your project directory, run:
   ```bash
   vercel
   ```

3. Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? Press Enter (or choose a custom name)
   - In which directory is your code located? `./`
   - Want to override settings? **N**

4. Your site will be deployed! 🎉

### Option B: Deploy via Vercel Dashboard

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure:
   - **Framework Preset**: Vite
   - **Build Command**: `pnpm build` or `npm run build`
   - **Output Directory**: `dist`
5. Click "Deploy"

---

## 📧 Step 2: Set Up Formspree

1. Go to [formspree.io](https://formspree.io) and sign up
2. Create a new form:
   - Click "New Form"
   - Give it a name: "Brand Assessment Quiz"
   - Copy your Form ID (looks like `xyzabc123`)

3. Update your code:
   - Open `src/app/components/LeadCapture.tsx`
   - Replace `YOUR_FORM_ID` with your actual Form ID:
     ```typescript
     const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
     ```
     Change to:
     ```typescript
     const response = await fetch("https://formspree.io/f/xyzabc123", {
     ```

4. Configure Formspree settings:
   - **Email notifications**: Set your email to receive submissions
   - **Auto-responder**: (Optional) Send a thank you email to quiz takers
   - **Spam filtering**: Enable reCAPTCHA if needed

5. Redeploy to Vercel:
   ```bash
   vercel --prod
   ```

---

## 📊 Step 3: Set Up Google Analytics

1. Go to [analytics.google.com](https://analytics.google.com/)
2. Create a new property:
   - Property name: "Brand Assessment Quiz"
   - Select your time zone
   - Choose "Web" as platform
   - Add your Vercel URL

3. Copy your Measurement ID (looks like `G-XXXXXXXXXX`)

4. Update your code:
   - Open `src/lib/analytics.ts`
   - Replace the Measurement ID:
     ```typescript
     export const GA_MEASUREMENT_ID = "G-XXXXXXXXXX";
     ```

5. Redeploy to Vercel:
   ```bash
   vercel --prod
   ```

---

## ✅ Step 4: Test Everything

### Test Formspree:
1. Visit your deployed site
2. Fill out the lead capture form
3. Check your email for the submission
4. Check Formspree dashboard for the entry

### Test Google Analytics:
1. Go to your GA dashboard
2. Open "Realtime" report
3. Visit your quiz on your site
4. You should see yourself as an active user

### Test Quiz Events:
- Start quiz → Should track `quiz_start`
- Submit lead form → Should track `lead_capture`
- Complete quiz → Should track `quiz_complete`
- Click CTA buttons → Should track `cta_click`

---

## 🎨 Optional: Custom Domain

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `quiz.sonderbyclaire.co.nz`)
4. Follow the DNS configuration instructions
5. Update Google Analytics with your custom domain

---

## 📝 What Gets Tracked?

### Formspree Captures:
- First name
- Email address
- Business type
- Consent checkbox status
- Timestamp

### Google Analytics Tracks:
- Quiz starts
- Lead captures (by business type)
- Quiz completions (with score)
- CTA button clicks
- Page views and session duration

---

## 🔐 Environment Variables (Optional)

For added security, you can use environment variables in Vercel:

1. In Vercel dashboard → Settings → Environment Variables
2. Add:
   - `VITE_FORMSPREE_ID` = your Formspree ID
   - `VITE_GA_MEASUREMENT_ID` = your GA Measurement ID

3. Update code to use:
   ```typescript
   const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
   const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
   ```

---

## 🎉 You're Live!

Your quiz is now deployed and ready to collect leads! Share your Vercel URL:
- On social media
- In your email signature
- On your website
- In your Instagram bio

### Next Steps:
- Set up email automation with Formspree
- Create a ConvertKit/Mailchimp integration
- Add Facebook Pixel for retargeting
- Set up conversion goals in GA

---

## 🆘 Troubleshooting

**Build fails on Vercel:**
- Check that all dependencies are in `package.json`
- Ensure image imports are correct
- Check the build logs for specific errors

**Formspree not receiving submissions:**
- Verify your Form ID is correct
- Check browser console for errors
- Ensure form is not blocked by ad blockers

**Google Analytics not tracking:**
- Wait 24-48 hours for data to appear in reports
- Use "Realtime" view for immediate verification
- Check that Measurement ID is correct
- Disable ad blockers when testing

---

Need help? Feel free to ask! 🙋‍♀️
