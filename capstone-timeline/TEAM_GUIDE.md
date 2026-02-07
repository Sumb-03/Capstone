# 👥 Team Members Guide

Complete guide for adding and managing team member profiles.

## Overview

The Team Members feature automatically loads profiles from the `public/team/` folder. No code changes needed - just add folders with member information!

## Features

- 📁 **Auto-Loading** - Members load automatically from folders
- 🖼️ **Profile Photos** - Avatar images with fallbacks
- 📝 **Rich Profiles** - Name, role, bio, skills, contact info
- 🗺️ **Location-Based** - Organized by city
- 🔗 **Social Links** - LinkedIn and email integration
- 📱 **Responsive** - Beautiful cards on all devices
- 🎨 **Modal Details** - Click to see full profile

## Quick Start

### Method 1: Use the Template (Easiest!)

1. **Copy the template folder**:
   ```
   Copy: public/team/_TEMPLATE/
   Paste as: public/team/[Member Name]/
   ```

2. **Edit info.json** with member details

3. **Replace avatar.jpg** with member photo

4. **Done!** Refresh the website to see the new member

### Method 2:Create from Scratch

1. **Create folder** in `public/team/`:
   ```
   public/team/John Doe/
   ```

2. **Create info.json**:
   ```json
   {
     "name": "John Doe",
     "role": "Software Engineer",
     "city": "Lisbon",
     "bio": "Passionate developer with 5+ years of experience...",
     "skills": ["React", "TypeScript", "Node.js"],
     "education": "Bachelor's in Computer Science, University of Lisbon",
     "hobbies": ["Photography", "Hiking", "Gaming"],
     "interests": ["AI/ML", "Cloud Architecture", "Open Source"],
     "funFact": "Once built an app that got 10k users in a week",
     "quote": "Innovation distinguishes between a leader and a follower",
     "linkedin": "https://linkedin.com/in/johndoe",
     "email": "john.doe@example.com"
   }
   ```

3. **Add avatar image**:
   - Name it `avatar.jpg` or `avatar.png`
   - Place in the same folder

## Field Reference

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `name` | string | ✅ Yes | Full name | "Jane Smith" |
| `role` | string | ✅ Yes | Job title | "Full Stack Developer" |
| `city` | string | ✅ Yes | City location | "Porto" |
| `bio` | string | ✅ Yes | Short biography (200-500 chars) | "Enthusiastic engineer..." |
| `skills` | string[] | ✅ Yes | Array of skills | ["Python", "Django"] || `education` | string | ❌ No | Degree and school | "Bachelor's in CS, IST" |
| `hobbies` | string[] | ❌ No | Personal hobbies | ["Photography", "Hiking"] |
| `interests` | string[] | ❌ No | Professional interests | ["AI/ML", "DevOps"] |
| `funFact` | string | ❌ No | Fun fact about yourself | "Can juggle 5 balls" |
| `quote` | string | ❌ No | Personal motto/quote | "Stay hungry, stay foolish" || `linkedin` | string | ❌ No | LinkedIn profile URL | "https://linkedin.com/..." |
| `email` | string | ❌ No | Email address | "jane@example.com" |

## Folder Structure

```
public/team/
├── _TEMPLATE/              # Copy this for new members
│   ├── info.json          # Template info file
│   └── avatar.jpg         # Placeholder photo
│
├── John Doe/              # Example member
│   ├── info.json         # John's details
│   └── avatar.jpg        # John's photo
│
├── Jane Smith/            # Another member
│   ├── info.json
│   └── avatar.png        # PNG also works!
│
└── [Your Team Member]/    # Add more members
    ├── info.json
    └── avatar.jpg
```

## info.json Example

### Complete Profile

```json
{
  "name": "Maria Silva",
  "role": "Senior DevOps Engineer",
  "city": "Lisbon",
  "bio": "Cloud infrastructure specialist with a passion for automation and scalability. 7 years of experience building robust CI/CD pipelines and managing Kubernetes clusters.",
  "skills": [
    "Docker",
    "Kubernetes",
    "AWS",
    "Terraform",
    "Jenkins",
    "Python"
  ],
  "education": "Master's in Computer Engineering, Instituto Superior Técnico",
  "hobbies": ["Mountain Biking", "Photography", "Traveling"],
  "interests": ["Cloud Native", "Site Reliability Engineering", "Automation"],
  "funFact": "Visited 25 countries and coded in airports around the world",
  "quote": "Automate everything you do more than twice",
  "linkedin": "https://linkedin.com/in/mariasilva",
  "email": "maria.silva@example.com"
}
```

### Minimal Profile

```json
{
  "name": "Carlos Mendes",
  "role": "Junior Developer",
  "city": "Porto",
  "bio": "Recent graduate eager to learn and grow in software development.",
  "skills": ["Java", "Spring Boot", "SQL"]
}
```

## Avatar Guidelines

### Image Specifications

- **Format**: JPG or PNG
- **Dimensions**: 400x400px or larger (square)
- **File Size**: Under 500KB (compress if larger)
- **Aspect Ratio**: 1:1 (square) - will be cropped if not
- **Quality**: Clear, well-lit professional photo

### Best Practices

✅ **Good Photos**:
- Headshot with clear face
- Professional attire
- Good lighting
- Neutral or clean background
- Smiling or approachable expression

❌ **Avoid**:
- Group photos
- Blurry or low-quality images
- Extreme angles
- Distracting backgrounds
- Very dark or overexposed photos

### Photo Tips

1. **Use a phone camera** - Modern phones have great cameras
2. **Natural lighting** - Stand near a window
3. **Simple background** - White wall or clean space
4. **Eye level** - Camera at eye level
5. **Crop square** - Use online tools to crop to square

## Personal Information Fields

These fields help introduce yourself during presentations and let people get to know you better!

### Education

Your academic background and qualifications.

**Examples:**
- "Bachelor's in Computer Science, University of Porto, 2023"
- "Master's in Software Engineering, Instituto Superior Técnico"
- "Self-taught Developer with online certifications (AWS, Google Cloud)"
- "Bachelor's in Information Systems, University of Minho (Expected 2026)"

**Tips:**
- Include degree, field of study, and institution
- Add graduation year or "Expected" for ongoing studies
- You can mention relevant certifications
- Keep it concise (one line preferred)

### Hobbies

Your personal interests and activities outside of work.

**Examples:**
- ["Photography", "Hiking", "Playing Guitar"]
- ["Gaming", "Cooking", "Reading Sci-Fi"]
- ["Rock Climbing", "Board Games", "Podcasting"]
- ["Soccer", "Film Making", "Blogging"]

**Tips:**
- List 2-5 hobbies
- Mix physical, creative, and intellectual activities
- Be specific: "Playing Guitar" not just "Music"
- Show personality - these are conversation starters!
- Keep each hobby to 1-3 words

**Good Hobbies Categories:**
- **Sports**: Soccer, Basketball, Swimming, Yoga, Running
- **Creative**: Photography, Drawing, Music, Writing, Cooking
- **Tech**: Gaming, 3D Printing, Robotics, Electronics
- **Outdoors**: Hiking, Camping, Cycling, Surfing
- **Social**: Board Games, Dancing, Volunteering

### Interests

Professional or intellectual interests that relate to your field or aspirations.

**Examples:**
- ["AI/ML", "Cloud Architecture", "Open Source"]
- ["UX Design", "DevOps", "Sustainable Tech"]
- ["Blockchain", "Cybersecurity", "Edge Computing"]
- ["Data Science", "IoT", "AR/VR Development"]

**Tips:**
- List 2-5 interests
- Keep them professional/career-related
- Show areas you want to explore or specialize in
- Use industry-standard terminology
- These show your growth mindset

**Popular Tech Interests:**
- Artificial Intelligence / Machine Learning
- Cloud Native / Microservices
- DevOps / Site Reliability Engineering
- Mobile Development
- Web3 / Blockchain
- Cybersecurity
- Data Science / Big Data
- IoT / Embedded Systems
- AR/VR / Metaverse
- Sustainable Tech / Green Computing

### Fun Fact

A memorable, interesting, or surprising fact about you.

**Great Examples:**
- "Once debugged code while traveling across 5 countries in a month"
- "Can solve a Rubik's cube in under 2 minutes"
- "Built my first website at age 12 for my school"
- "Speak 4 languages: Portuguese, English, Spanish, and Python"
- "Completed a half-marathon while listening to coding podcasts"
- "Published an npm package that has 10k+ downloads"

**Tips:**
- Keep it short (one sentence)
- Make it memorable and unique to you
- Can be tech-related OR personal
- Show personality and humor when appropriate
- Avoid controversial topics
- Make it conversation-worthy

**Categories for Fun Facts:**
- 🎯 **Achievements**: "Youngest AWS certified professional in my region"
- 🌍 **Travel**: "Visited 30 countries, coded in 15 different airports"
- 🎮 **Skills**: "Can type 120 words per minute"
- 📊 **Quirky Stats**: "Written over 100,000 lines of code"
- 🎨 **Hidden Talents**: "Can draw pixel art animations"
- 🏆 **Accomplishments**: "Won 3 hackathons in university"

### Quote

Your personal motto, favorite quote, or philosophy.

**Inspiring Examples:**
- "Stay hungry, stay foolish" - Steve Jobs
- "Code is poetry written in logic"
- "First, solve the problem. Then, write the code" - John Johnson
- "The best way to predict the future is to invent it"
- "Make it work, make it right, make it fast"
- "Innovation distinguishes between a leader and a follower"

**Tips:**
- Keep it under 15 words
- Can be original or from someone famous
- Should reflect your values or approach
- Tech-related quotes work great
- Avoid clichés unless they truly resonate
- Make it authentic to you

**Quote Categories:**
- 💻 **Coding Philosophy**: "Clean code always looks like it was written by someone who cares"
- 🚀 **Innovation**: "The only way to do great work is to love what you do"
- 📚 **Learning**: "Live as if you were to die tomorrow. Learn as if you were to live forever"
- 💯 **Excellence**: "Strive for progress, not perfection"
- 🤝 **Teamwork**: "Alone we can do so little; together we can do so much"
- 🎯 **Action**: "Done is better than perfect"

## Skills List

### Recommended Skills

**Technical Skills:**
- Programming Languages: JavaScript, Python, Java, C++, etc.
- Frameworks: React, Django, Spring Boot, Next.js, etc.
- Tools: Docker, Git, Kubernetes, Jenkins, etc.
- Databases: MySQL, PostgreSQL, MongoDB, Redis, etc.
- Cloud: AWS, Azure, GCP, Heroku, etc.

**Soft Skills:**
- Leadership, Communication, Teamwork
- Problem Solving, Critical Thinking
- Agile, Scrum, Project Management

### Tips

- List 3-7 skills (most relevant first)
- Use standard names (React not React.js)
- Include both technical and soft skills
- Match skills to role when possible

## City Organization

Members are grouped by city on the map. Use consistent city names:

**Portugal Cities:**
- Lisbon
- Porto
- Braga
- Coimbra
- Faro
- Évora
- Aveiro

Match these to location pins on the Portugal map!

## Troubleshooting

### Member Not Showing

1. ✅ Check folder name (correct casing)
2. ✅ Verify `info.json` is valid JSON (use jsonlint.com)
3. ✅ Ensure all required fields are filled
4. ✅ Reload the browser (Ctrl+Shift+R)

### Avatar Not Loading

1. ✅ Filename must be exactly `avatar.jpg` or `avatar.png`
2. ✅ Place in member's folder (not subfolder)
3. ✅ Check image is not corrupted
4. ✅ Try different image format (JPG ↔ PNG)

### JSON Validation Error

1. Check for:
   - Missing commas
   - Missing quotes around strings
   - Trailing commas (last item shouldn't have comma)
   - Mismatched brackets

2. Validate at: [jsonlint.com](https://jsonlint.com)

### Skills Not Displaying

- Ensure skills is an array: `["skill1", "skill2"]`
- Use quotes around each skill
- Separate with commas

## Advanced Customization

### Change Member Card Layout

**File**: `src/components/members/Members.tsx`

Adjust the grid:
```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
// Change lg:grid-cols-3 to show more/fewer columns
```

### Customize Modal

Edit the modal styling in the same file to change:
- Colors
- Layout
- Font sizes
- Spacing

### Add Custom Fields

1. Add fields to `info.json`
2. Update TypeScript interface in `src/components/members/Members.tsx`
3. Display in component template

## Tips & Best Practices

### Writing Great Bios

✅ **Good Bio**:
"Full-stack developer with 5+ years building scalable web applications. Passionate about clean code, test-driven development, and mentoring junior developers."

❌ **Too Short**:
"Developer."

❌ **Too Long**:
"I started programming when I was 12 years old and built my first website using HTML... [500 words continue]"

### Ideal Bio Length

- **Words**: 20-50 words
- **Characters**: 150-300 characters
- **Sentences**: 2-3 sentences

### Bio Template

```
[Role/Title] with [X years] of experience in [specialization].
[Key achievement or passion].
[Additional skill or interest].
```

Example:
```
Senior DevOps Engineer with 7 years of experience in cloud infrastructure.
Passionate about automation and building reliable CI/CD pipelines.
AWS certified and active open-source contributor.
```

## FAQs

**Q: How many team members can I add?**
A: Unlimited! The system scales automatically.

**Q: Can I use photos from LinkedIn?**
A: Yes, but ensure you have permission and the image is high quality.

**Q: What if someone doesn't have LinkedIn?**
A: It's optional - just omit the `linkedin` field.

**Q: Can I add custom social links (Twitter, GitHub)?**
A: Yes! You'll need to modify the Members component to add these fields.

**Q: How do I remove a member?**
A: Simply delete their folder from `public/team/`.

**Q: Can I have members in multiple cities?**
A: Each member should have one primary city. Create duplicate profiles if needed.

---

**Ready to add your team?** Start with the `_TEMPLATE` folder and customize! 🎉

For more help, see:
- [CUSTOMIZATION_GUIDE.md](CUSTOMIZATION_GUIDE.md)
- [README.md](README.md)
