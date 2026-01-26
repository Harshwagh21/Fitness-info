# Built-Different Fitness Project - Complete Implementation Plan

## Project Overview
A modern fitness documentation and tools platform built with Next.js, Fumadocs, Shadcn UI, and Aceternity UI. Features include:
- Documentation sidebar with Goals, Knowledge, and Training sections
- Fitness calculators (BMI, Body Fat, FFMI)
- Modern UI with dark mode support
- No backend required (all calculations client-side)

---

## Phase 1: Project Setup & Verification ✅

### 1.1 Verify Current Setup
- [x] Fumadocs is installed and configured
- [x] Shadcn UI components are installed (button, card, input, label, select, slider, tabs)
- [x] Next.js App Router structure exists
- [x] TypeScript is configured

### 1.2 Install Missing Dependencies
- [x] Verify Tailwind CSS dark mode is configured ✅ (Already configured in global.css with `.dark` class - Fumadocs handles theme switching)
- [x] Check if all required Shadcn components are available ✅ (Added separator and badge components)
- [ ] Install Aceternity UI components (Note: Aceternity UI is not an npm package - components are copied from aceternity.com. We'll add hero effects in Phase 5.1)

**Commands:**
```bash
# Verify dependencies
pnpm list fumadocs-ui fumadocs-core fumadocs-mdx

# Add any missing Shadcn components
pnpm dlx shadcn@latest add separator badge
```

---

## Phase 2: Content Structure Setup (Sidebar Navigation)

### 2.1 Create Documentation Content Files
Create MDX files in `content/docs/` for the sidebar structure:

**File Structure:**
```
content/docs/
├── index.mdx (Home/Landing)
├── goals/
│   ├── index.mdx
│   ├── lean-bulk.mdx
│   └── cutting.mdx
├── knowledge/
│   ├── index.mdx
│   └── cardio/
│       ├── index.mdx
│       ├── step-count.mdx
│       └── zone-2-heart-rate.mdx
└── training/
    ├── index.mdx
    ├── bench-100kg.mdx
    ├── bench-200kg.mdx
    └── programs.mdx
```

### 2.2 Configure Sidebar Navigation
- [ ] Update `source.config.ts` if needed for custom ordering
- [ ] Create `meta.json` files for folder organization
- [ ] Ensure proper frontmatter in each MDX file

**Key Points:**
- Use `index.mdx` files for section landing pages
- Use frontmatter `title` and `description` for each page
- Organize with folders to create dropdown/collapsible sections

---

## Phase 3: Tools Section Setup

### 3.1 Create Tools Layout
- [ ] Create `app/tools/layout.tsx` that reuses Fumadocs DocsLayout
- [ ] Configure sidebar to show tools navigation
- [ ] Add navigation links in main layout config

**Implementation:**
- Reuse `DocsLayout` component from Fumadocs
- Create a separate navigation tree for tools OR reuse docs tree
- Ensure mobile responsiveness

### 3.2 Create Tools Landing Page
- [ ] Create `app/tools/page.tsx` with tool cards
- [ ] Design card grid layout using Shadcn Card components
- [ ] Add links to individual calculator pages
- [ ] Add descriptions and icons for each tool

**Tools to Include:**
1. BMI Calculator
2. Body Fat Calculator
3. FFMI Calculator (Fat-Free Mass Index)

---

## Phase 4: Calculator Implementations

### 4.1 BMI Calculator
**File:** `app/tools/bmi-calculator/page.tsx`

**Features:**
- Weight input (kg)
- Height input (cm or ft/in)
- Real-time calculation
- BMI category display (Underweight, Normal, Overweight, Obese)
- Visual indicator (color-coded)
- Result interpretation

**Formulas:**
- BMI = weight (kg) / height (m)²
- Categories: <18.5 (Underweight), 18.5-24.9 (Normal), 25-29.9 (Overweight), ≥30 (Obese)

### 4.2 Body Fat Calculator
**File:** `app/tools/body-fat-calculator/page.tsx`

**Features:**
- Multiple calculation methods (Navy Method, BMI-based, etc.)
- Input fields: Age, Gender, Height, Weight, Neck, Waist, Hip (for Navy method)
- Body fat percentage result
- Category display (Essential, Athlete, Fitness, Average, Obese)
- Visual progress indicator

**Formulas:**
- Navy Method (most accurate): Uses body measurements
- BMI-based method: Alternative simpler calculation

### 4.3 FFMI Calculator
**File:** `app/tools/ffmi-calculator/page.tsx`

**Features:**
- Weight, Height, Body Fat % inputs
- FFMI calculation
- Adjusted FFMI (for height normalization)
- Comparison to natural limits
- Visual representation

**Formulas:**
- FFMI = (Weight × (1 - Body Fat % / 100)) / Height (m)²
- Adjusted FFMI = FFMI + 6.1 × (1.8 - Height (m))

---

## Phase 5: UI/UX Enhancements

### 5.1 Landing Page (Home)
**File:** `app/(home)/page.tsx`

**Features:**
- Hero section with Aceternity UI effects (spotlight, grid background)
- Feature highlights (Docs, Tools, Calculators)
- Call-to-action buttons
- Modern gradient backgrounds
- Smooth animations

**Components:**
- Hero section with title and description
- Feature cards grid
- Navigation links to Docs and Tools

### 5.2 Navigation Configuration
**File:** `lib/layout.shared.tsx`

**Updates:**
- Add navigation links for "Documentation" and "Tools"
- Configure active states
- Add logo/branding
- Dark mode toggle (Fumadocs built-in)

### 5.3 Calculator UI Polish
**Enhancements:**
- Gradient card backgrounds
- Smooth input transitions
- Loading states (if needed)
- Error handling and validation
- Responsive design (mobile-first)
- Accessibility (ARIA labels, keyboard navigation)

### 5.4 Dark Mode
- [ ] Verify Tailwind dark mode configuration
- [ ] Test all components in dark mode
- [ ] Ensure proper contrast ratios
- [ ] Test theme switching

---

## Phase 6: Content Creation

### 6.1 Goals Section Content
- [ ] Write content for "Lean Bulk" page
- [ ] Write content for "Cutting" page
- [ ] Add images/examples if needed
- [ ] Include actionable tips and guidelines

### 6.2 Knowledge Section Content
- [ ] Write "Cardio" overview page
- [ ] Write "Step Count" guide
- [ ] Write "Zone 2 Heart Rate" guide
- [ ] Include formulas, targets, and best practices

### 6.3 Training Section Content
- [ ] Write "Bench 100kg" program/guide
- [ ] Write "Bench 200kg" program/guide
- [ ] Write "Programs" overview
- [ ] Include progression plans, form tips, etc.

---

## Phase 7: Testing & Quality Assurance

### 7.1 Calculator Testing
- [ ] Test BMI calculator with edge cases (0 values, negative, very large numbers)
- [ ] Test Body Fat calculator with all methods
- [ ] Test FFMI calculator accuracy
- [ ] Verify input validation
- [ ] Test responsive design on mobile devices

### 7.2 Navigation Testing
- [ ] Test sidebar navigation between Docs and Tools
- [ ] Test mobile menu functionality
- [ ] Test deep linking to specific pages
- [ ] Verify active states highlight correctly

### 7.3 Content Testing
- [ ] Verify all MDX files render correctly
- [ ] Check markdown formatting
- [ ] Test code blocks (if any)
- [ ] Verify images load (if any)

### 7.4 Performance Testing
- [ ] Check page load times
- [ ] Verify no console errors
- [ ] Test with slow network (if possible)
- [ ] Check Lighthouse scores

---

## Phase 8: Deployment Preparation

### 8.1 Build Verification
- [ ] Run `pnpm build` successfully
- [ ] Fix any TypeScript errors
- [ ] Fix any linting errors
- [ ] Verify all routes work in production build

### 8.2 Environment Setup
- [ ] Prepare for Vercel deployment (or chosen platform)
- [ ] Set up environment variables (if needed)
- [ ] Configure domain (if applicable)

### 8.3 Documentation
- [ ] Update README.md with project description
- [ ] Add deployment instructions
- [ ] Document any special configurations

---

## Phase 9: Deployment

### 9.1 Vercel Deployment
- [ ] Connect GitHub repository
- [ ] Configure build settings
- [ ] Deploy to production
- [ ] Verify live site functionality

### 9.2 Post-Deployment
- [ ] Test all features on live site
- [ ] Check analytics (if set up)
- [ ] Monitor for errors
- [ ] Gather user feedback

---

## Technical Implementation Details

### File Structure (Final)
```
app/
├── (home)/
│   ├── layout.tsx
│   └── page.tsx (Landing page with Aceternity UI)
├── docs/
│   ├── [[...slug]]/
│   │   └── page.tsx
│   └── layout.tsx
├── tools/
│   ├── layout.tsx (Reuses DocsLayout)
│   ├── page.tsx (Tools dashboard)
│   ├── bmi-calculator/
│   │   └── page.tsx
│   ├── body-fat-calculator/
│   │   └── page.tsx
│   └── ffmi-calculator/
│       └── page.tsx
├── layout.tsx (Root layout)
└── global.css

content/docs/
├── index.mdx
├── goals/
│   ├── index.mdx
│   ├── lean-bulk.mdx
│   └── cutting.mdx
├── knowledge/
│   ├── index.mdx
│   └── cardio/
│       ├── index.mdx
│       ├── step-count.mdx
│       └── zone-2-heart-rate.mdx
└── training/
    ├── index.mdx
    ├── bench-100kg.mdx
    ├── bench-200kg.mdx
    └── programs.mdx

components/
└── ui/ (Shadcn components)

lib/
├── source.ts
├── layout.shared.tsx
└── utils.ts
```

### Key Technologies
- **Next.js 16** (App Router)
- **Fumadocs** (Documentation framework)
- **Shadcn UI** (Component library)
- **Tailwind CSS** (Styling)
- **TypeScript** (Type safety)
- **MDX** (Content format)

### Design Principles
- Mobile-first responsive design
- Dark mode support
- Accessible (WCAG guidelines)
- Fast performance (client-side calculations)
- Clean, modern UI
- Reusable components

---

## Next Steps (Start Here)

1. **Begin with Phase 2**: Create the content structure (MDX files)
2. **Then Phase 3**: Set up the Tools layout
3. **Then Phase 4**: Build calculators one by one
4. **Then Phase 5**: Polish the UI

**Recommended Order:**
1. Content structure (sidebar navigation)
2. Tools layout setup
3. BMI Calculator (simplest)
4. Body Fat Calculator
5. FFMI Calculator
6. Landing page enhancements
7. Testing and deployment

---

## Notes
- All calculators run client-side (no backend needed)
- Use Shadcn components for consistency
- Follow user rules: functions under 20 lines, descriptive names, efficient code
- Write tests before implementation (TDD approach)
- Reuse code to avoid duplication






