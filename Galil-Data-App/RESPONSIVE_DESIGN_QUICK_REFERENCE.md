# 🎯 Quick Mobile Responsive Reference

## Responsive Patterns Used in This Project

### 1. Container Width Pattern
```tsx
// ✅ GOOD - Responsive width
<div className="w-full px-4 lg:px-0 mx-auto lg:max-w-[85%]">
  Content
</div>

// ❌ BAD - Fixed width
<div className="max-w-[85%]">
  Content
</div>
```

### 2. Padding/Spacing Pattern
```tsx
// ✅ GOOD - Responsive spacing
<div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
  Content
</div>

// ❌ BAD - Fixed spacing
<div className="py-10 px-8">
  Content
</div>
```

### 3. Width Pattern
```tsx
// ✅ GOOD - Responsive width
<div className="w-full sm:w-[210px]">
  Content
</div>

// ❌ BAD - Fixed width
<div className="w-[210px]">
  Content
</div>
```

### 4. Grid Pattern
```tsx
// ✅ GOOD - Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* Items */}
</div>

// ❌ BAD - Fixed grid
<div className="grid grid-cols-4 gap-4">
  {/* Items - breaks on mobile */}
</div>
```

### 5. Typography Pattern
```tsx
// ✅ GOOD - Responsive text
<div className="text-lg sm:text-2xl gap-4 sm:gap-10">
  Navigation
</div>

// ❌ BAD - Fixed text size
<div className="text-2xl gap-10">
  Navigation
</div>
```

## Breakpoint Quick Reference

| Breakpoint | Screen Size | CSS | Usage |
|-----------|-----------|-----|-------|
| None | 320px - 640px | `.w-full` | Mobile |
| `sm:` | 640px - 768px | `sm:w-1/2` | Small tablet |
| `md:` | 768px - 1024px | `md:w-2/3` | Tablet |
| `lg:` | 1024px - 1280px | `lg:w-3/4` | Small desktop |
| `xl:` | 1280px+ | `xl:w-4/5` | Large desktop |

## Common Patterns in This Project

### Fixed Width Dropdown (Mobile Full-Width)
```tsx
<div className="w-full sm:w-[210px]">
  {/* Used in: FilterDropdownBuilder */}
</div>
```

### Responsive Container (Full Width on Mobile)
```tsx
<div className="w-full px-4 lg:px-0 mx-auto lg:max-w-[85%]">
  {/* Used in: DataExplorer Page */}
</div>
```

### Responsive Grid (Stack on Mobile)
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto]">
  {/* Used in: TopFilterBar */}
</div>
```

### Responsive Padding
```tsx
<div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
  {/* Used in: LifeIndex Page */}
</div>
```

### Responsive Window (Chatbot Example)
```tsx
<div className="w-[90vw] sm:w-[70vw] lg:w-150">
  {/* Used in: Chatbot Component */}
</div>
```

### Responsive Navigation
```tsx
<div className="gap-4 sm:gap-10 text-lg sm:text-2xl">
  {/* Used in: Navbar */}
</div>
```

## Mobile-First Development Checklist

When creating new components:

- [ ] **Mobile First**: Start with mobile styles (no prefix)
- [ ] **Add Breakpoints**: Use `sm:`, `md:`, `lg:` for larger screens
- [ ] **Test at 320px**: Minimum mobile width
- [ ] **No Fixed Widths**: Use `w-full` + responsive alternatives
- [ ] **Touch Targets**: 44px minimum height/width
- [ ] **Text Size**: 16px minimum on mobile
- [ ] **Padding/Margins**: Responsive scales (4, 6, 8 -> sm/lg)
- [ ] **Grids**: Stack to 1 column on mobile
- [ ] **Images**: Use responsive sizing
- [ ] **Verify**: Test at 320px, 768px, 1024px, 1280px

## Common Tailwind Classes

### Responsive Width
```css
w-full              /* Full width */
w-screen            /* Full viewport width */
sm:w-1/2            /* 50% on tablets */
lg:w-3/4            /* 75% on desktop */
w-[210px] sm:w-full /* Custom breakpoint */
```

### Responsive Padding
```css
p-4                 /* 16px all sides (mobile) */
sm:p-6              /* 24px on tablets */
lg:p-8              /* 32px on desktop */
px-4 py-6           /* Different horizontal/vertical */
```

### Responsive Grid
```css
grid-cols-1         /* 1 column (mobile) */
sm:grid-cols-2      /* 2 columns (tablet) */
lg:grid-cols-4      /* 4 columns (desktop) */
gap-4 sm:gap-6      /* Responsive gap */
```

### Responsive Text
```css
text-sm             /* 14px (mobile) */
text-base           /* 16px (mobile) */
text-lg             /* 18px (mobile) */
sm:text-2xl         /* 24px (tablet+) */
```

## Files Following Best Practices ✅

- `app/page.tsx` - Home page with responsive button
- `app/authorities/page.tsx` - Responsive grid layout
- `components/authorities/MapTab.tsx` - Responsive map/table
- `components/dataexplorer/TopFilterBar.tsx` - Responsive filter grid
- `components/navbar.tsx` - Responsive navigation
- `components/chatbot.tsx` - Responsive window size
- `components/authorities/FilterDropdownBuilder.tsx` - Responsive dropdown

## Quick Testing Commands

```bash
# Start development server
npm run dev

# Open DevTools
F12

# Toggle responsive design mode
Ctrl+Shift+M (Chrome/Firefox)
Cmd+Shift+M (Mac)

# Test at specific widths in DevTools:
# - 320px (iPhone SE)
# - 375px (iPhone 6/7/8/X)
# - 425px (Galaxy S21)
# - 768px (iPad)
# - 1024px (iPad Pro)
# - 1280px (Desktop)
```

## Common Mistakes to Avoid ❌

```tsx
// ❌ Fixed width - breaks on mobile
<div className="w-[800px]"> ... </div>

// ❌ Excessive padding - too crowded on mobile
<div className="px-8 py-10"> ... </div>

// ❌ Multi-column grid - doesn't fit on mobile
<div className="grid grid-cols-4"> ... </div>

// ❌ Large text - unreadable on mobile
<div className="text-4xl"> ... </div>

// ❌ No gap adjustment - too spread out on desktop
<div className="flex gap-1"> ... </div>

// ❌ Absolute positioning - hides content on mobile
<div className="absolute w-full"> ... </div>
```

## Correct Approaches ✅

```tsx
// ✅ Responsive width
<div className="w-full sm:w-[800px]"> ... </div>

// ✅ Responsive padding
<div className="px-4 sm:px-8 py-6 sm:py-10"> ... </div>

// ✅ Responsive grid
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"> ... </div>

// ✅ Responsive text
<div className="text-2xl sm:text-4xl"> ... </div>

// ✅ Responsive gap
<div className="flex gap-2 sm:gap-4"> ... </div>

// ✅ Responsive positioning
<div className="w-full sm:absolute"> ... </div>
```

---

**Reference for**: Galil Data App
**Updated**: 2024
**Approach**: Mobile-First Responsive Design
