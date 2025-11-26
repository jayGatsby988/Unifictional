# Logo Setup Instructions

## Add Your Logo

Please save your Unifictional logo image as:
```
/public/unifictional-logo.png
```

### Requirements:
- **File name:** `unifictional-logo.png` (exactly this name)
- **Location:** Save it in the `public` folder at the root of your project
- **Format:** PNG with transparent background (recommended)
- **Size:** At least 500x500px for best quality

### The logo will appear in:
1. ✅ Loading screen animation (center, large, with glow effects)
2. ✅ Navigation bar (top-left, with your company name)
3. ✅ Favicon (browser tab icon - coming soon)

### Current Setup:
- The code is ready and configured
- Just add your logo file to `/public/unifictional-logo.png`
- The website will automatically use it everywhere

---

**Note:** If you want to use a different file name or format, update these files:
- `components/LoadingAnimation.tsx` (line with `Image src="/unifictional-logo.png"`)
- `components/Navbar.tsx` (line with `Image src="/unifictional-logo.png"`)

